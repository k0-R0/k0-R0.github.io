# Lexical Analyzer in C

A stream-based Lexical Analyzer (Tokenizer) for C source code written in C11. The application parses raw C source files into structured lexical tokens, eliminates comments and preprocessor directives on the fly, tracks delimiter balance, and performs lexical syntax validations.

### Technical Details
- **Token Classification & Grammar Parsing:** Categorizes tokens into standard C Keywords, Identifiers, Operators (arithmetic, relational, logical, bitwise, member access), Symbols/Punctuators, String/Character Literals (with escape sequence handling), and Numeric/Floating-Point Constant Literals.
- **$O(\log N)$ Binary Search Validation:** Implements fast binary search lookup over sorted static tables of ANSI C keywords, multi-character operators (e.g., `++`, `->`, `==`, `<=`, `||`), and delimiter symbols.
- **Stream Ingestion & Comment Stripper:** Processes source files character-by-character using single-character lookahead (`fgetc`/`ungetc`) to strip single-line (`// ...`) and multi-line (`/* ... */`) comments alongside `#` preprocessor directives without loading entire files into memory.
- **Bracket Balance & Error Detection:** Uses a dedicated `BracketTracker` to maintain parity across parentheses `()`, curly braces `{}`, and square brackets `[]`, flagging mismatched delimiters, unterminated literal strings, and illegal identifier naming.

## Repository
[github.com/k0-R0/Lexical-Analyzer →](https://github.com/k0-R0/Lexical-Analyzer)

## Build & Run

```bash
# Clone the repository
git clone https://github.com/k0-R0/Lexical-Analyzer
cd Lexical-Analyzer

# Build with Makefile
make

# Run the analyzer on a C source file
./Lexical_Analyzer sample.c
```

## Token Classification Pipeline

```
[ Input File (.c) ]
        │
        ▼
┌──────────────────┐
│   tokenizer.c    │ ◄── File I/O stream, comment & preprocessor stripper
└─────────┬────────┘
          │ (character streams)
          ▼
┌──────────────────┐
│ token_handler.c  │ ◄── Token assembly & bracket balance tracking
└─────────┬────────┘
          │ (token lookups)
          ▼
┌──────────────────┐
│ validations.c    │ ◄── O(log N) Binary search for Keywords, Operators, Symbols
└─────────┬────────┘
          │
          ▼
[ Classified Tokens / Lexical Diagnostics ]
```

## Supported Token Types

| Token Category | Description | Examples |
| --- | --- | --- |
| `KEYWORD` | Reserved C language keywords | `int`, `return`, `if`, `while`, `struct`, `sizeof`, `volatile` |
| `IDENTIFIER` | User-defined variable and function names | `main`, `argc`, `argv`, `buffer_count` |
| `OPERATOR` | Unary, binary, logical, and member access operators | `+`, `-`, `*`, `/`, `++`, `--`, `==`, `!=`, `<=`, `->`, `.` |
| `SYMBOL` | Delimiters and statement punctuators | `(`, `)`, `{`, `}`, `[`, `]`, `,`, `;` |
| `STRING LITERAL` | String and char literals with escape sequences | `"Hello, World!\n"`, `'a'`, `'\0'` |
| `CONSTANT LITERAL` | Integer and decimal floating-point constants | `42`, `3.14`, `.5` |
