# Neovim: Because life is too short to reach for a mouse

I’ve reached a point where if I have to move my hand away from the home row to click a button, I feel like I'm losing my edge. Normal editors feel sluggish and bloated. I use Neovim on Fedora because I value efficiency, and honestly, there's just something satisfying about being faster than the GUI. If you're still clicking through menus to find a file or format your code, you're missing out on the best dopamine hit in software engineering.

## My Config (NvChad)

I use a customized NvChad setup. It handles the boring boilerplate while staying incredibly fast. If you want to replicate my exact environment, you can pull my config directly.

### Setup

1.  **Clone my config:**
    ```bash
    git clone https://github.com/k0-R0/NvChad-nvim ~/.config/nvim
    ```
2.  **Fire it up:**
    ```bash
    nvim
    ```
3.  **Automatic Install:**
    The first time you open it, NvChad will pull in `lazy.nvim` and handle the plugin sync. Once that's done, I usually run `:MasonInstallAll` so all my LSPs and formatters are ready for C/C++ work immediately.

## The Plugin Stack

- **Mason & Conform:** This is how I manage my language servers and formatting without the headache. It handles `clangd` for my C++ code, and Conform ensures my indentation doesn't look like a mess the second I save a file.
- **Telescope:** This is the heart of my navigation. It's a fuzzy finder that lets me jump to any file or search for any string across the project in milliseconds.
- **Nvim-Tree:** For those rare moments I actually forget my project structure and need a visual sidebar. It's there when I need it, and hidden when I don't.
- **Which-Key:** A lifesaver for those "what was that shortcut again?" moments. It pops up a menu of my keybindings if I hesitate, keeping me from breaking my flow.
- **Mini.nvim Suite:** I use `mini.indentscope` to see exactly where my brackets start and end, and `mini.pairs` to handle the tedious job of closing parentheses. It's subtle but makes the editor feel much more "alive."
- **Render-markdown:** Writing READMEs in plain text is depressing. This plugin renders headers and tables directly in the buffer so I can actually see what I'm doing.
- **Neoscroll:** Smooth scrolling animations might seem like fluff, but they actually help my eyes track where I'm jumping in a file.
- **Vim-be-good:** ThePrimeagen is the one who actually sparked my interest in this Neovim rabbit hole. This plugin of his was essential for building the muscle memory I needed to stop being slow.

## The "Essential" Cheatsheet

I strictly use relative line numbers. It’s the only way to move efficiently without doing mental math.

### Movement (Home Row or Bust)

| Key | Action | Why? |
| --- | --- | --- |
| `h` `j` `k` `l` | Left, Down, Up, Right | The law of the land. Arrow keys are dead to me. |
| `w` / `b` | Next / Previous word | Jumping by words is the bare minimum for speed. |
| `e` | End of word | Perfect for jumping to the end of a variable to append. |
| `gg` / `G` | Top / Bottom of file | Because scrolling manually is for people with too much free time. |
| `Ctrl + d` / `Ctrl + u` | Half-page down / up | Keeps the cursor in the middle of the screen so I don't get neck strain. |
| `%` | Jump between brackets | How I navigate through deep C nesting without losing my mind. |
| `f` / `t` + `<char>` | Find / To character | Horizontal sniping. I can jump to a semicolon instantly. |

### Editing (The Fun Stuff)

| Shortcut | Action |
| --- | --- |
| `ciw` | Change inside word. Deletes the word and drops you in insert mode. |
| `di(` | Delete everything inside parentheses. Essential for refactoring function calls. |
| `yib` | Yank inside block. I use this to copy entire function bodies. |
| `yyp` | Duplicate the current line. Faster than copy-pasting. |
| `ddp` | Swap current line with the one below. Great for reordering logic. |
| `gcc` | Toggle comment. I also mapped this to `<leader> /` because I'm lazy. |
| `u` | Undo. For when I realize my "genius" idea was actually a bug. |
| `.` | Repeat last edit. The most powerful key in the editor. |
| `:%s/old/new/g` | Global Replace. Replaces every instance in the file. |
| `:'<,'>s/old/new/g` | Visual Replace. Run the substitute command on just the selected block. |

### The "Star + Dot" Workflow
When I want to change 3-4 occurrences of a variable but not *all* of them:
1. Place cursor on the word and hit `*` to search for next occurrences.
2. `ciw` on the first one to change it.
3. Hit `n` to jump to the next match.
4. Hit `.` to repeat the change.
5. Repeat `n` and `.` until I'm done. It's much safer than a global find-and-replace.

### Navigation & Macros

| Shortcut | Action |
| --- | --- |
| `<leader>ff` | Find Files. My go-to for opening anything. |
| `<leader>fw` | Live Grep. Searching for a string everywhere at once. |
| `gd` | Go to Definition. Jumps straight to the source of the symbol. |
| `<leader>th` | Cycle Themes. Because I need a different aesthetic every two hours. |
| `Ctrl + n` | Toggle Nvim-Tree. The sidebar for when I'm lost. |
| `qa` ... `q` | Record Macro. Record a sequence of keys to register 'a'. |
| `20@a` | Run Macro. Play back that sequence 20 times. Massive time saver. |

## Repository
[My NvChad Config](https://github.com/k0-R0/NvChad-nvim) — It's a work in progress, but it's home.
