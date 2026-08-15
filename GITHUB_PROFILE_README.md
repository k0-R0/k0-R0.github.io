# Hi there, I'm Prayush B Menon (k0r05) 👋

```c
#include <stdio.h>

int main(void) {
    printf("Embedded, Linux & Firmware Engineer\n");
    return 0;
}
```

### 🛠️ About Me

I am an **Embedded Systems, Linux & Firmware Engineer** with 3 years of background as an SDET, currently focused on low-level C/C++ development and bare-metal programming. After 7 months of intensive full-time embedded training at **Emertxe**, I specialize in hardware protocols, microcontroller bring-up, and systems software.

- ⚙️ **Currently Focusing On:** Low-level C/C++ systems programming, Linux device drivers, and firmware development.
- 🔌 **Hardware Experience:** Hands-on with **PIC18F4580**, configuring protocols directly from datasheets (**CAN**, **UART**, **I2C**, **SPI**).
- 💻 **Development Environment:** Fedora Linux, using a keyboard-driven **Neovim** (NvChad) setup, **CMake**, and **GDB**.
- 🎯 **Open To:** Embedded Engineer, Linux Engineer, and Firmware Engineer roles.

---

### 🧰 Tech Stack & Skills

| Category | Technologies / Tools |
| :--- | :--- |
| **Languages** | ![C](https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=white) ![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white) ![Bash](https://img.shields.io/badge/Bash-4EAA25?style=for-the-badge&logo=gnu-bash&logoColor=white) |
| **Hardware & Protocols** | `PIC18F4580` `CAN Bus` `UART` `I2C` `SPI` `ADC` |
| **Systems & Tools** | ![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black) ![Neovim](https://img.shields.io/badge/Neovim-57A143?style=for-the-badge&logo=neovim&logoColor=white) ![CMake](https://img.shields.io/badge/CMake-064F8C?style=for-the-badge&logo=cmake&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GDB](https://img.shields.io/badge/GDB-808080?style=for-the-badge&logo=gnu&logoColor=white) |

---

### 🚀 Featured Projects

#### 🏎️ [PIC18 Automotive CAN Node Simulator](https://github.com/k0-R0/Car_Dashboard)
*Distributed ECU automotive network simulator using PIC18 microcontrollers.*
- Configured onboard ADC to capture speed & RPM, switch inputs for gear & indicators.
- Transmitted real-time sensor metrics over **CAN protocol** between multiple ECU nodes to a central CLCD dashboard ECU.
- **Tech Stack:** `C`, `PIC18F4580`, `CAN Protocol`, `MPLAB X / XC8`

#### 📦 [Car Black Box (Event Data Recorder)](https://github.com/k0-R0/car_blackbox)
*Embedded C Event Data Recorder firmware built on PIC16F877A microcontroller.*
- Recorded real-time speed, RTC timestamps, and gear transitions into external EEPROM over **I2C protocol** in a circular log buffer.
- Built interactive CLCD menu for viewing/clearing logs and adjusting time, with log data telemetry over **UART**.
- **Tech Stack:** `C`, `PIC16F877A`, `I2C`, `UART`, `MPLAB X / XC8`

#### 🐚 [Minishell (Custom Linux Shell)](https://github.com/k0-R0/Minishell)
*A lightweight Unix command-line shell implemented in C featuring process management and job control.*
- Engineered arbitrary-depth command pipelining using `fork()`, `execvp()`, `pipe()`, and `dup2()`.
- Implemented POSIX signal handling (`SIGINT`, `SIGTSTP`, `SIGCHLD`) with dynamic linked-list background job control (`jobs`, `fg`, `bg`).
- Built shell built-ins (`cd`, `pwd`, `exit`), dynamic prompt customization (`PS1`), and environment inspection (`$$`, `$?`, `$SHELL`).
- **Tech Stack:** `C`, `Linux Systems Programming`, `POSIX API`, `Process Management`

#### 🧮 [Arbitrary Precision Calculator (APC)](https://github.com/k0-R0/APC)
*C calculator bypassing 64-bit hardware limits to execute math on numbers of infinite length.*
- Implemented doubly linked lists representing digits for dynamic positional arithmetic (add, subtract, multiply, divide).
- Designed an enum state-machine memory manager to prevent leaks across multi-step operations and error states.
- **Tech Stack:** `C`, `Data Structures`, `Algorithms`, `Makefile`

#### 🎵 [MP3 Tag Editor](https://github.com/k0-R0/MP3_TagReader)
*Binary parser and metadata editor for MP3 audio files.*
- Wrote a custom file stream parser to read and modify ID3v2 metadata tags directly from binary data.
- **Tech Stack:** `C`, `File I/O`, `Binary Parsing`

#### 🖼️ [Steganography Tool](https://github.com/k0-R0/Steganography)
*Security tool that hides encrypted data inside BMP images.*
- Utilized Least Significant Bit (LSB) substitution to embed secret payloads without corrupting image headers or visual quality.
- **Tech Stack:** `C`, `Bit Manipulation`, `Image Processing`

#### ⚡ [NvChad Neovim Config](https://github.com/k0-R0/NvChad-nvim)
*Keyboard-driven development environment for Linux systems programming.*
- Tailored NvChad base with `clangd`, `Mason`, `Telescope`, and `Conform` for zero-mouse latency C/C++ editing.
- **Tech Stack:** `Lua`, `Neovim`, `Linux`

#### 📁 [Address Book CLI](https://github.com/k0-R0/Address-Book)
*CLI contact manager with dynamic memory allocation and CSV file persistence.*
- **Tech Stack:** `C`, `Data Structures`, `CSV Serialization`

---

### 📊 GitHub Stats & LeetCode

<div align="center">
  <a href="https://leetcode.com/k0r05">
    <img src="https://leetcode-stats-api.herokuapp.com/k0r05" alt="LeetCode Stats" height="150" />
  </a>
</div>

---

### 📫 Connect With Me

- 🌐 **Portfolio:** [k0-r0.github.io](https://k0-r0.github.io/)
- 💼 **LinkedIn:** [linkedin.com/in/prayush-menon](https://linkedin.com/in/prayush-menon)
- 🧩 **LeetCode:** [leetcode.com/k0r05](https://leetcode.com/k0r05)
- ✉️ **Email:** [bmenonprayush@gmail.com](mailto:bmenonprayush@gmail.com)
