# Address Book

A command-line contact manager written in C. It uses file-backed storage and has a basic search feature—nothing too fancy, just some good practice with file I/O and CLI structures.

The idea was to build a way to add, list, and edit contacts that actually sticks around after you close the terminal. I kept the scope small so I could focus on how C handles memory and files without getting lost in too many features.

### Some of the things I worked on:
- Structuring data so saving and loading from the disk doesn't break everything.
- Being careful with how strings and file paths are handled.
- Keeping the CLI prompts simple and clear.

## Repository
[github.com/k0-R0/Address-Book →](https://github.com/k0-R0/Address-Book)

## Config
```bash
# Example build command
gcc -o address_book main.c contacts.c -Iinclude
```

## Cheatsheet
| Command | What it does |
| --- | --- |
| `./address_book --add` | Add a new contact |
| `./address_book --list` | List all contacts |
| `./address_book --search [name]` | Search for a contact |
