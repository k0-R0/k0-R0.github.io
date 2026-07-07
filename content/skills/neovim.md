# Neovim: Keyboard-Driven Development

Neovim serves as my primary development environment on Fedora. Configured for a mouse-free workflow, it minimizes navigation latency and keeps the focus directly on code design. Rather than relying on heavy IDEs, I maintain a lightweight editor optimized for low-level systems programming.

## Config & Integration

My setup uses a customized NvChad base to streamline plugin bootstrapping and optimize editor startup time, providing a responsive environment for C and C++ projects.

### Setup

1.  **Clone the config:**
    ```bash
    git clone https://github.com/k0-R0/NvChad-nvim ~/.config/nvim
    ```
2.  **Initialize:**
    ```bash
    nvim
    ```
3.  **Automatic Install:**
    On the first run, NvChad installs `lazy.nvim` and syncs the plugin packages. Running `:MasonInstallAll` ensures all configured LSPs, formatters, and diagnostics engines are installed.

## Plugin Ecosystem

- **Mason & Conform:** Automates language server configuration and styling. Integrates `clangd` for C/C++ index analysis and Conform for standard formatting.
- **Telescope:** Fuzzy finder for project navigation and project-wide text searching.
- **Nvim-Tree:** Directory sidebar for visualizing project structures.
- **Which-Key:** Contextual popup displaying active hotkey sequences.
- **Mini.nvim Suite:** Lightweight utilities for visualizing indent scopes and pairing delimiters.
- **Render-markdown:** Provides inline parser styling for documentation headers and tables.
- **Neoscroll:** Handles smooth physics-based buffer scrolling.
- **Vim-be-good:** Interactive trainer for mastering vim-motion precision.

## Motion & Keybindings

Relative line numbering combined with target-seeking vim motions allows for jumping between functions and scopes with minimal keystrokes.

### Motion Commands

| Key | Action | Context |
| --- | --- | --- |
| `h` `j` `k` `l` | Left, Down, Up, Right | Basic navigation on the home row. |
| `w` / `b` | Next / Previous word | Word-level jump. |
| `e` | End of word | Precision navigation to end of identifiers. |
| `gg` / `G` | Top / Bottom of file | Jump to the start or end of the active buffer. |
| `Ctrl + d` / `Ctrl + u` | Half-page down / up | Scrolling while keeping the viewport centered. |
| `%` | Jump between brackets | Jump between matching brackets or blocks. |
| `f` / `t` + `<char>` | Find / To character | Horizontal search and jump within current line. |

### Edit Shortcuts

| Shortcut | Action |
| --- | --- |
| `ciw` | Change inner word. |
| `di(` | Delete contents inside parentheses. |
| `yib` | Yank contents of current code block. |
| `yyp` | Duplicate the current line down. |
| `ddp` | Swap current line with the next line. |
| `gcc` | Toggle line comment. |
| `u` | Undo last operation. |
| `.` | Repeat last edit action. |
| `:%s/old/new/g` | Global find and replace. |
| `:'<,'>s/old/new/g` | Find and replace within visual selection. |

### Search & Repeat Loop
To batch-modify specific code pattern occurrences:
1. `*` to highlight and jump to the next matching symbol.
2. `ciw` to change the first instance.
3. `n` to jump to the next occurrence.
4. `.` to apply the change.

### Navigation & Command Controls

| Shortcut | Action |
| --- | --- |
| `<leader>ff` | Search files. |
| `<leader>fw` | Grep search. |
| `gd` | Go to Symbol Definition. |
| `<leader>th` | Cycle color themes. |
| `Ctrl + n` | Toggle directory tree. |
| `qa` ... `q` | Record keystrokes into macro register 'a'. |
| `20@a` | Playback macro register 'a' 20 times. |

## Configuration Repository
The custom configurations are hosted at [github.com/k0-R0/NvChad-nvim](https://github.com/k0-R0/NvChad-nvim).
