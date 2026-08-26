# Source2HTML: Event-Driven C Syntax Highlighter

An event-driven C source code syntax highlighter that parses C source files and converts them into syntax-highlighted HTML documents viewable in any modern web browser. The tool utilizes a modular finite state machine (FSM) to tokenize lexical elements and format them with semantic CSS styling.

### Technical Details
- **State-Event Parser Engine:** Implements a finite state machine (`s2html_event.c`) that streams source files character-by-character, transitioning across parser states (`PSTATE_IDLE`, `PSTATE_PREPROCESSOR_DIRECTIVE`, `PSTATE_RESERVE_KEYWORD`, `PSTATE_STRING`, `PSTATE_NUMERIC_CONSTANT`, `PSTATE_SINGLE_LINE_COMMENT`, `PSTATE_MULTI_LINE_COMMENT`).
- **Token Classification & Event Dispatch:** Emits structured parser events (`pevent_t`) classifying source elements into Data Keywords (`int`, `char`, `struct`), Non-Data Keywords (`if`, `while`, `return`), Preprocessor Directives (`#include`, `#define`), Header Files, Character/String Literals, and Numeric Constants.
- **HTML & CSS Formatting Pipeline:** Generates clean HTML boilerplate and wraps classified tokens in designated CSS `<span class="...">` tags (`s2html_conv.c`), automatically escaping reserved HTML entities (`<`, `>`, `&`).
- **Flexible CLI & Line Numbering:** Provides command-line options for custom output paths and optional formatted line numbering (`-n`).

## Repository
[github.com/k0-R0/Source-2-HTML →](https://github.com/k0-R0/Source-2-HTML)

## Build & Run

```bash
# Clone the repository
git clone https://github.com/k0-R0/Source-2-HTML
cd Source-2-HTML

# Compile with gcc
gcc -Wall -Wextra s2html_main.c s2html_conv.c s2html_event.c -o s2html

# 1. Convert source file to source.c.html (default output)
./s2html sample.c

# 2. Convert with custom output filename and line numbers
./s2html sample.c sample.html -n
```

## Architecture & Parsing Pipeline

```
[ Source File (.c) ]
        │
        ▼
┌──────────────────────┐
│   s2html_main.c      │ ◄── CLI argument parsing & conversion loop coordinator
└──────────┬───────────┘
           │ (character stream)
           ▼
┌──────────────────────┐
│   s2html_event.c     │ ◄── Finite State Machine (FSM) Tokenizer & Lexer
└──────────┬───────────┘
           │ (parser events: pevent_t)
           ▼
┌──────────────────────┐
│   s2html_conv.c      │ ◄── HTML markup, CSS span formatting & entity escaping
└──────────┬───────────┘
           │
           ▼
[ Highlighted HTML (.html) ]
```

## Supported Token Classifications

| Token Category | Parser Event Type | CSS Class | Examples |
| --- | --- | --- | --- |
| **Data Keywords** | `PEVENT_RESERVE_KEYWORD` (`RES_KEYWORD_DATA`) | `.reserved_key1` | `int`, `char`, `float`, `void`, `struct`, `const` |
| **Non-Data Keywords** | `PEVENT_RESERVE_KEYWORD` (`RES_KEYWORD_NON_DATA`) | `.reserved_key2` | `if`, `else`, `for`, `while`, `return`, `switch` |
| **Preprocessor** | `PEVENT_PREPROCESSOR_DIRECTIVE` | `.preprocess_dir` | `#include`, `#define`, `#ifdef`, `#ifndef`, `#endif` |
| **Header Files** | `PEVENT_HEADER_FILE` | `.header_file` | `<stdio.h>`, `"s2html_event.h"` |
| **Comments** | `PEVENT_SINGLE_LINE_COMMENT`, `PEVENT_MULTI_LINE_COMMENT` | `.comment` | `// comment`, `/* multi-line comment */` |
| **Strings** | `PEVENT_STRING` | `.string` | `"Hello, World!\n"` |
| **Numeric Constants** | `PEVENT_NUMERIC_CONSTANT` | `.numeric_constant` | `42`, `0xFF`, `3.14`, `100UL` |
| **ASCII Characters** | `PEVENT_ASCII_CHAR` | `.ascii_char` | `'a'`, `'\n'`, `'\\'` |
