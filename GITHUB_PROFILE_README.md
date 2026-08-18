# Prayush B Menon (k0r05)

Embedded Systems, Linux & Firmware Engineer. Former SDET transitioning to low-level systems programming, bare-metal development, and firmware engineering.

### About

I'm focused on low-level development in C and C++ on Linux. Most of my work involves microcontroller bring-up, interfacing hardware peripherals over CAN, I2C, SPI, and UART, and writing systems-level utilities (such as custom shells, lexical tokenizers, and arbitrary-precision math engines).

#### Languages
![C](https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=white) ![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white) ![Bash](https://img.shields.io/badge/Bash-4EAA25?style=for-the-badge&logo=gnu-bash&logoColor=white)

#### Systems & Tools
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black) ![Neovim](https://img.shields.io/badge/Neovim-57A143?style=for-the-badge&logo=neovim&logoColor=white) ![CMake](https://img.shields.io/badge/CMake-064F8C?style=for-the-badge&logo=cmake&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GDB](https://img.shields.io/badge/GDB-808080?style=for-the-badge&logo=gnu&logoColor=white)

#### Hardware & Protocols
`PIC18F4580` `PIC16F877A` `CAN Bus` `UART` `I2C` `SPI` `ADC` `CLCD` `MPLAB X / XC8`

---

### Projects

#### 🐚 [Minishell](https://github.com/k0-R0/Minishell)
A lightweight Unix command-line shell written in C.
- Built an execution pipeline supporting arbitrary-depth command chaining (`cmd1 | cmd2 | ... | cmdN`) with `fork()`, `execvp()`, `pipe()`, and `dup2()`.
- Implemented POSIX signal handlers (`SIGINT`, `SIGTSTP`, `SIGCHLD`) with linked-list job control to manage foreground/background processes (`jobs`, `fg`, `bg`).
- Added built-ins (`cd`, `pwd`, `exit`), dynamic prompt updates via `PS1`, and environment variable lookups (`$$`, `$?`, `$SHELL`).

#### 📦 [Car Black Box](https://github.com/k0-R0/car_blackbox)
Event Data Recorder firmware for the PIC16F877A microcontroller.
- Logs vehicle speed, RTC time, and gear transitions into external EEPROM over I2C in a 10-slot circular buffer.
- Features an on-screen menu system via a 16x2 Character LCD and Matrix Keypad to view logs, set time, and reset data.
- Exports event logs over UART at 9600 Baud for terminal diagnostics.

#### 🖼️ [Steganography](https://github.com/k0-R0/Steganography)
A security tool that embeds encrypted messages into 24-bit BMP images.
- Uses Least Significant Bit (LSB) substitution to store secret data in image pixels without degrading visual quality or breaking header structures.
- Implements custom encode/decode pipelines with password-based validation.

#### 🔍 [Lexical Analyzer](https://github.com/k0-R0/Lexical-Analyzer)
A stream-based C11 tokenizer for C source files.
- Strips comments (`//`, `/* */`) and preprocessor directives on the fly using character lookahead (`fgetc`/`ungetc`).
- Uses $O(\log N)$ binary search over sorted lookup tables to categorize keywords, operators, symbols, strings, and numeric constants.
- Tracks delimiter balance (`()`, `{}`, `[]`) and flags syntax errors like unterminated literals or malformed identifiers.

#### 🏎️ [PIC18 Automotive CAN Node Simulator](https://github.com/k0-R0/Car_Dashboard)
A distributed automotive ECU simulator built with PIC18 microcontrollers communicating over CAN.
- Transmitter nodes sample analog speed/RPM potentiometers (via ADC) and digital switch states (gears/indicators).
- Transmits metrics over the CAN bus to a central receiver node (ECU3) driving a Character LCD dashboard.

#### 🧮 [Arbitrary Precision Calculator (APC)](https://github.com/k0-R0/APC)
An arbitrary-precision calculator written in C to compute arithmetic on numbers of infinite length.
- Digit representation using doubly linked lists with bidirectional traversal for addition, subtraction, multiplication, and division.
- Implemented state-machine memory management to clean up intermediate operands and avoid leaks.

#### 🎵 [MP3 Tag Editor](https://github.com/k0-R0/MP3_TagReader)
A CLI utility to parse and modify MP3 metadata.
- Reads and parses raw ID3v2 binary headers and frame tags directly from the file stream.

#### ⚡ [NvChad Neovim Config](https://github.com/k0-R0/NvChad-nvim)
My personal keyboard-driven development environment for C/C++ development on Linux, configured with `clangd`, `Mason`, `Telescope`, and `Conform`.

#### 📁 [Address Book](https://github.com/k0-R0/Address-Book)
A terminal contact manager with dynamic memory allocation, field validation, and CSV file persistence.

---

### Connect

- **Portfolio:** [k0-r0.github.io](https://k0-r0.github.io/)
- **LinkedIn:** [linkedin.com/in/prayush-b-menon-14a17b220](https://www.linkedin.com/in/prayush-b-menon-14a17b220/)
- **LeetCode:** [leetcode.com/k0r05](https://leetcode.com/k0r05)
- **Email:** [bmenonprayush@gmail.com](mailto:bmenonprayush@gmail.com)
