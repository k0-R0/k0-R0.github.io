# Neovim: Speed and Efficiency

I use Neovim on Fedora because it removes the friction between thinking and writing code. Once the muscle memory for the home row is established, navigating through a project becomes significantly faster. It’s not about being a purist; it’s about having a setup that stays out of the way and allows for rapid editing.

## My Config (NvChad)

I use a customized NvChad setup to handle the initial boilerplate while keeping the editor fast. It provides a solid foundation for my C/C++ development environment.

### Setup

1.  **Clone my config:**
    ```bash
    git clone https://github.com/k0-R0/NvChad-nvim ~/.config/nvim
    ```
2.  **Initialize:**
    ```bash
    nvim
    ```
3.  **Automatic Install:**
    On the first run, NvChad installs `lazy.nvim` and syncs the plugins. I typically run `:MasonInstallAll` to ensure all LSPs and formatters are ready for my workflow.

## The Plugin Stack

- **Mason & Conform:** Manages language servers and formatting. I use `clangd` for C++ and Conform to maintain consistent indentation.
- **Telescope:** A fuzzy finder for jumping to files or searching strings across a project.
- **Nvim-Tree:** A visual sidebar used when I need to quickly reference the project structure.
- **Which-Key:** Displays available keybindings, helping to maintain flow without memorizing every shortcut.
- **Mini.nvim Suite:** Includes `mini.indentscope` for visualizing code blocks and `mini.pairs` for handling parentheses.
- **Render-markdown:** Provides live rendering for headers and tables in markdown files.
- **Neoscroll:** Adds smooth scrolling to help track jumps within a file.
- **Vim-be-good:** A tool I used to build the initial muscle memory for efficient movement.

## Movement and Workflow

I use relative line numbers to move between lines without extra calculation. The goal is to be fast enough that the workflow feels seamless.

### Movement

| Key | Action | Why? |
| --- | --- | --- |
| `h` `j` `k` `l` | Left, Down, Up, Right | Keeps hands on the home row. |
| `w` / `b` | Next / Previous word | Basic navigation for speed. |
| `e` | End of word | Useful for jumping to the end of a variable. |
| `gg` / `G` | Top / Bottom of file | Quick jumps through the entire buffer. |
| `Ctrl + d` / `Ctrl + u` | Half-page down / up | Keeps the cursor centered to reduce eye strain. |
| `%` | Jump between brackets | Navigates through nested C code blocks. |
| `f` / `t` + `<char>` | Find / To character | Precise horizontal movement. |

### Editing

| Shortcut | Action |
| --- | --- |
| `ciw` | Change inside word. |
| `di(` | Delete inside parentheses. |
| `yib` | Yank inside block. |
| `yyp` | Duplicate the current line. |
| `ddp` | Swap current line with the one below. |
| `gcc` | Toggle comment. |
| `u` | Undo. |
| `.` | Repeat last edit. |
| `:%s/old/new/g` | Global Replace. |
| `:'<,'>s/old/new/g` | Visual Replace on selected block. |

### The "Star + Dot" Workflow
For changing multiple specific occurrences:
1. `*` to search for next matches.
2. `ciw` to change the first one.
3. `n` to jump to the next match.
4. `.` to repeat the change.

### Navigation & Macros

| Shortcut | Action |
| --- | --- |
| `<leader>ff` | Find Files. |
| `<leader>fw` | Live Grep. |
| `gd` | Go to Definition. |
| `<leader>th` | Cycle Themes. |
| `Ctrl + n` | Toggle Nvim-Tree. |
| `qa` ... `q` | Record Macro to register 'a'. |
| `20@a` | Run Macro 20 times. |

## Repository
[My NvChad Config](https://github.com/k0-R0/NvChad-nvim) is where I keep my environment settings.
