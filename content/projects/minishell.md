# Minishell: Custom Linux Command-Line Shell

A lightweight, custom Unix command-line shell implemented in C. The project models fundamental operating system concepts including a Read-Eval-Print Loop (REPL), child process lifecycle management via POSIX system calls, arbitrary-depth command pipelining, signal-safe job control, and built-in command execution.

### Technical Details
- **Process Management & Multi-Piping:** Engineered an n-command execution pipeline using `fork()`, `execvp()`, `pipe()`, and `dup2()`. Dynamically manages file descriptors across child processes using baton-passing fd synchronization without leaving dangling descriptors.
- **Signal Handling & Job Control:** Configured POSIX signal handling for `SIGINT` (Ctrl+C), `SIGTSTP` (Ctrl+Z), and `SIGCHLD` (`WNOHANG`). Maintains a dynamic linked-list job stack of suspended processes with foreground (`fg`) and background (`bg`) resumption using `kill(..., SIGCONT)` and `waitpid(..., WUNTRACED)`.
- **Built-in Commands & Environment:** Implemented essential shell built-ins (`pwd`, `cd`, `exit`, `jobs`, `fg`, `bg`), dynamic prompt customization (`PS1=<custom_prompt>`), and special variable expansions (`$$` for shell PID, `$?` for exit status via `WEXITSTATUS`, `$SHELL`).
- **Tokenizer & Fast Command Resolution:** Built a custom whitespace and token parser that extracts command segments and pipeline delimiters, coupled with a binary search algorithm for rapid command type classification (Built-in vs External).

## Repository
[github.com/k0-R0/Minishell →](https://github.com/k0-R0/Minishell)

## Build & Run

```bash
# Clone the repository
git clone https://github.com/k0-R0/Minishell
cd Minishell

# Build with Makefile
make

# Launch the shell
./minishell
```

## Architecture & Pipeline Execution

When executing piped commands (e.g. `cat /etc/passwd | grep root | wc -l`), Minishell establishes synchronized unidirectional data channels across children:

- **First Child:** Standard input is left unchanged; standard output is redirected to the write-end of the first pipe (`dup2(fd[1], STDOUT_FILENO)`).
- **Intermediate Children:** Standard input is redirected from the previous pipe's read-end (`dup2(prev_pipe_rd, STDIN_FILENO)`), and standard output is redirected to the next pipe's write-end (`dup2(fd[1], STDOUT_FILENO)`).
- **Final Child:** Standard input is redirected from the previous pipe's read-end (`dup2(prev_pipe_rd, STDIN_FILENO)`), and standard output outputs to the terminal console.
- **Parent Process:** Closes unused pipe descriptors systematically after each fork to prevent deadlocks and waits for all pipeline children to terminate.

## Command & Job Control Cheatsheet

| Command / Signal | Behavior | Implementation Detail |
| --- | --- | --- |
| `pwd` | Displays current working directory | Calls `getcwd()` |
| `cd <path>` | Changes working directory | Calls `chdir()` with whitespace-trimmed argument |
| `PS1=<prompt>` | Modifies dynamic shell prompt | Custom prompt buffer formatting with ANSI color codes |
| `echo $$` | Prints shell process PID | Formatted output of `getpid()` |
| `echo $?` | Prints last command exit status | Evaluated from status word using `WEXITSTATUS(status)` |
| `echo $SHELL` | Prints default shell environment | Fetched via `getenv("SHELL")` |
| `Ctrl + C` (`SIGINT`) | Interrupts active foreground task | Signal handler protects parent shell and preserves prompt |
| `Ctrl + Z` (`SIGTSTP`) | Suspends active foreground task | Stops child and pushes node `(pid, name)` onto `g_job_list` |
| `jobs` | Lists suspended background processes | Recursive linked-list traversal printing active jobs |
| `fg` | Resumes job in foreground | Sends `SIGCONT` and synchronously waits via `waitpid(..., WUNTRACED)` |
| `bg` | Resumes job in background | Sends `SIGCONT` and removes job from stopped stack |
| `exit` | Terminates Minishell | Clean process exit via `exit(0)` |
