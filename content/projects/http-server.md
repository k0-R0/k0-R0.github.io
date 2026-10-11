# Concurrent HTTP/1.1 Server in C

A lightweight, concurrent HTTP/1.1 web server implemented in C using standard POSIX stream sockets, a thread-safe circular connection queue, and a worker thread pool. Designed around a Producer-Consumer architecture with counting semaphores and mutual exclusion locks to serve simultaneous client connections, dynamic route dispatching, custom header parsing, and disk-backed static and dynamic file transfers with MIME type detection.

### Technical Details
- **Producer-Consumer Thread Pool Architecture:** The main server thread accepts client TCP connections on port `4221` and enqueues descriptors into a thread-safe ring buffer (`queue[64]`). A fixed pool of 8 detached worker threads (`PTHREAD_CREATE_DETACHED`) sleeps on a POSIX counting semaphore (`sem_t queue_items`), eliminating CPU spin and waking up instantly to service requests concurrently.
- **Thread-Safe Ring Buffer & Synchronization:** Implemented a bounded circular FIFO queue guarded by a mutual exclusion lock (`pthread_mutex_t queue_lock`) and coordinated via counting semaphores. Decouples connection reception from request execution, allowing high-throughput request buffering during load spikes.
- **HTTP/1.1 Protocol Engine & Request Parsing:** Parses raw incoming socket streams into an `HttpRequest` data structure capturing HTTP method (`GET`, `POST`), target resource path, HTTP protocol version, and a raw request pointer for subsequent zero-copy header inspections.
- **Header Parsing & Dynamic Route Dispatch:** Implements safe string extraction helpers (`get_header_value`) to parse incoming headers (`User-Agent`, `Content-Length`) using substring lookahead and CRLF bounding. Dispatches routes dynamically, including parameter extraction on endpoints like `/echo/{str}`.
- **Disk-Backed File I/O & MIME Resolution:** Features static file retrieval (`GET /files/{filename}`) with automatic extension-based MIME type mapping (`text/plain`, `text/html`, `image/png`, `image/jpeg`, `image/gif`, `image/svg+xml`) and `Content-Disposition: inline` for direct browser rendering. Supports persistent file uploads (`POST /files/{filename}`) that parse `Content-Length` and write payloads with `O_CREAT | O_TRUNC`, responding with `201 Created`.
- **Zero Socket & Resource Leaking:** Strict descriptor ownership model ensures worker threads flush responses and close client descriptors (`close(client_fd)`) across all execution branches (success, 404, malformed requests, or client disconnects).

## Repository
[github.com/k0-R0/HTTP_Server →](https://github.com/k0-R0/HTTP_Server)

## Build & Run

```bash
# Clone the repository
git clone https://github.com/k0-R0/HTTP_Server
cd HTTP_Server

# Compile with Makefile (optimized release build)
make

# Or compile with debug symbols for GDB / Valgrind
make debug

# Launch server with default configuration (listens on 127.0.0.1:4221)
./build/server

# Or specify a storage directory for file operations (GET and POST /files/...)
./build/server --directory ./temp
```

## Architecture & Concurrency Model

```
                  ┌────────────────────────┐
                  │      Main Thread       │
                  │  socket, bind, listen  │
                  └───────────┬────────────┘
                              │ accept() loop
                              ▼
                  ┌────────────────────────┐
                  │ Thread-Safe Ring Buffer│
                  │  [ client_fd queue ]   │
                  │   mutex + semaphore    │
                  └───────────┬────────────┘
                              │ workers pop
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
  │  Worker #1  │      │  Worker #2  │      │  Worker #N  │
  │ handle/recv │      │ handle/recv │      │ handle/recv │
  │    close    │      │    close    │      │    close    │
  └─────────────┘      └─────────────┘      └─────────────┘
```

### Concurrency Flow
1. **Main Listener Thread:** Binds to `127.0.0.1:4221` with `SO_REUSEADDR` and a listen backlog of 128. Runs an infinite `accept()` loop.
2. **Buffer Enqueueing:** When a new connection arrives, the listener acquires `queue_lock`, pushes `client_fd` into the circular buffer, unlocks `queue_lock`, and signals `sem_post(&queue_items)`. The main thread immediately unblocks to accept the next incoming connection without stalling.
3. **Worker Processing:** Idle worker threads sleep on `sem_wait(&queue_items)` with 0% CPU consumption. When signaled, a worker acquires `queue_lock`, pops a descriptor via `queue_pop()`, unlocks the mutex, and calls `handle_client(client_fd)`.
4. **Lifecycle & Cleanup:** The worker reads the request buffer, parses the HTTP command line and headers, routes to the appropriate handler, transmits the HTTP response frame (status line, headers, body), and closes `client_fd`.

## Endpoints Cheatsheet

| Method | Endpoint | Description | Response Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Server homepage check | `200 OK` |
| `GET` | `/echo/{str}` | Extracts dynamic path parameter and returns as plain text | `200 OK` |
| `GET` | `/user-agent` | Extracts caller's `User-Agent` header and echoes it back | `200 OK` / `404` |
| `GET` | `/files/{filename}` | Reads file from base directory with resolved MIME type (`image/png`, `text/html`, etc.) | `200 OK` / `404` |
| `POST` | `/files/{filename}` | Writes payload bytes up to `Content-Length` into target directory | `201 Created` |
| `*` | *All other routes* | Default 404 handler | `404 Not Found` |

## Testing & Verification

### CLI / cURL Testing

```bash
# 1. Echo Endpoint
curl -v http://localhost:4221/echo/hello
# Status: 200 OK
# Content-Type: text/plain
# Body: hello

# 2. User-Agent Inspection
curl -v -H "User-Agent: my-test-agent/1.0" http://localhost:4221/user-agent
# Status: 200 OK
# Body: my-test-agent/1.0

# 3. File Upload (POST)
curl -v -d "Hello from curl" http://localhost:4221/files/sample.txt
# Status: 201 Created

# 4. File Retrieval (GET)
curl -v http://localhost:4221/files/sample.txt
# Status: 200 OK
# Body: Hello from curl
```

### Concurrency Stress Test

Send 8 parallel requests simultaneously in the background to verify non-blocking concurrent execution:

```bash
curl -s http://localhost:4221/echo/1 & \
curl -s http://localhost:4221/echo/2 & \
curl -s http://localhost:4221/echo/3 & \
curl -s http://localhost:4221/echo/4 & \
curl -s http://localhost:4221/echo/5 & \
curl -s http://localhost:4221/echo/6 & \
curl -s http://localhost:4221/echo/7 & \
curl -s http://localhost:4221/echo/8 & \
wait
```
All requests execute concurrently across worker threads and complete without serialization or blocking.
