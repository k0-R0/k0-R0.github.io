# Multithreaded TFTP: Concurrent UDP Server & Client

A multithreaded implementation of the Trivial File Transfer Protocol (TFTP) in C using UDP/IP sockets, POSIX threads (`pthreads`), and counting semaphores (`sem_t`) for thread pool concurrency control. Designed around a Master-Dispatcher / Worker Thread architecture with ephemeral port isolation to serve parallel client file requests efficiently.

### Technical Details
- **Master Dispatcher & Detached Worker Model:** The primary server listener loop binds to port `8080` to receive client requests (`CONNECT`, `GET`, `PUT`, `MODE`, `QUIT`) and dispatches dedicated worker threads (`PTHREAD_CREATE_DETACHED`) to handle individual file transfers asynchronously without blocking subsequent requests.
- **Counting Semaphore Concurrency Limit:** Employs a POSIX counting semaphore (`sem_init`, `sem_trywait`, `sem_post`) initialized to 10 permits. If 10 active transfers are executing concurrently, non-blocking permit checks immediately respond with an overload acknowledgment packet (`"Server is busy, please try again later"`) without stalling the listener thread.
- **Ephemeral Port Isolation & TID Multiplexing:** Each worker thread allocates a separate ephemeral UDP socket (`AF_INET`, `SOCK_DGRAM`) to communicate with its client. This mirrors standard TFTP Transfer Identifier (TID) isolation and eliminates packet collisions or race conditions on the main listener socket.
- **Framed Packet Protocol & Flow Control:** Implements custom binary network structures (`cmd_packet`, `ack_packet`, `data_packet`) operating over lock-step stop-and-wait acknowledgment flow control with error detection and retry mechanisms.
- **Multiple Transfer Modes & Batch Processing:** Supports standard 512-byte binary transfers (`MODE_OCTET`), fine-grained single-byte transfers (`MODE_BYTE`), and text stream conversion converting newline terminators `\n` $\leftrightarrow$ `\n\r` (`MODE_MAIL`). Supports multi-file batch downloading and uploading (`get/put file1 file2 file3`) through tokenized argument parsing.

## Repository
[github.com/k0-R0/TFTP →](https://github.com/k0-R0/TFTP)

## Build & Run

```bash
# Clone the repository
git clone https://github.com/k0-R0/TFTP
cd TFTP

# Build both server and client binaries
make all

# Start the TFTP server (listens on 127.0.0.1:8080)
./build/bin/tftp_server

# In a separate terminal, start the interactive TFTP client
./build/bin/tftp_client
```

## Architecture & Concurrency Model

```
+-------------+          1. Request (GET / PUT)          +--------------------+
|             | ---------------------------------------> |                    |
| TFTP Client |                                          | TFTP Server (Main) |
|             | <======================================+ +--------------------+
+-------------+       3. File Data Transfer            |           |
                                                       |           | 2. Dispatches
                                                       v           v
                                                +------------------------+
                                                |     Worker Threads     |
                                                | (Thread 1, Thread 2..) |
                                                +------------------------+
                                                           |
                                                           | Reads / Writes
                                                           v
                                                +------------------------+
                                                |      File Storage      |
                                                +------------------------+
```

### Concurrency Flow
1. **Master Dispatcher:** Listens on port `8080`. Upon receiving a `GET` or `PUT` request, it invokes `sem_trywait(&thread_sem)` without blocking.
2. **Permit Availability:** If a worker permit is available, the server allocates a `FileContext`, creates a detached thread with `pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_DETACHED)`, and immediately returns to listening.
3. **Saturation Handling:** If all 10 worker threads are active, `sem_trywait` returns non-zero, triggering an immediate negative acknowledgment (`ack = 0`, `"Server is busy , please try again later"`).
4. **Port Isolation:** Inside the worker thread, a new UDP socket is opened (`socket(AF_INET, SOCK_DGRAM, 0)`) so data packets and ACKs flow over an isolated ephemeral port, keeping the main listener socket unburdened.
5. **Thread Cleanup:** Upon transfer completion or failure, the worker thread closes its private socket descriptor, frees the `FileContext` heap memory, and posts back to the counting semaphore (`sem_post(&thread_sem)`).

## Packet Protocol Cheatsheet

| Packet Type | Struct Name | Key Fields | Purpose |
| --- | --- | --- | --- |
| **Command** | `cmd_packet` | `opcode`, `data[512]` | Sent by client to issue operations (`CONNECT`, `GET`, `PUT`, `MODE`, `QUIT`) |
| **Acknowledgment** | `ack_packet` | `opcode`, `block_num`, `ack_op`, `ack`, `message[128]` | Confirms command receipt, block ACKs (`ack=1`), or error notices (`ack=0`) |
| **Data Block** | `data_packet` | `opcode`, `block_num`, `data_len`, `data[512]` | Carries payload blocks sequentially with lock-step sequence numbering |

## Client CLI Commands

| Command | Syntax / Example | Description |
| --- | --- | --- |
| `connect` | `connect 127.0.0.1` | Validates target IP address and sends initial connection handshake packet |
| `get` | `get file1.txt [file2.bin ...]` | Batch downloads one or more files from `server_downloads/` to `client_downloads/` |
| `put` | `put file1.txt [file2.bin ...]` | Batch uploads one or more files from client directory to server storage |
| `mode` | `mode <octet \| byte \| mail>` | Sets transfer mode (binary 512-byte blocks, byte-by-byte, or CRLF converted mail) |
| `help` | `help` | Displays interactive client menu and command usage syntax |
| `quit` | `quit` | Gracefully closes the session and exits the client shell |
