# APC: Big Math with Linked Lists

Standard data types like `long long` are fine until you need to calculate something massive. I built this calculator in C because I wanted to handle arithmetic on numbers larger than what fits in regular data types, and it was also a great exercise for practicing linked list manipulations.

I used a doubly linked list where each node holds a single digit. This structure was a good way to get comfortable with pointer manipulation and see how things work when you're traversing lists from both ends to perform math.

### Teaching a computer long math
Since I couldn't just use standard operators, I had to implement the algorithms manually. It's the same "paper-and-pencil" method we learned in school but done with nodes and pointers. Division was definitely the most difficult part to get right, especially handling the logic for how many times one large number fits into another while managing the lists.

### Keeping the heap clean
I was pretty cautious about memory leaks here because every number is a collection of dynamically allocated nodes. I used an enum to track the status of operations and made sure to have a single cleanup spot to free everything. Even if a calculation fails or hits a division-by-zero error, it shouldn't leave any garbage in memory.

## Repository
[github.com/k0-R0/APC →](https://github.com/k0-R0/APC)

## Build & Run
```bash
# Clone and build
git clone https://github.com/k0-R0/APC
cd APC
make

# Run the calculator
./build/bin/basic_calc
```

## Cheatsheet
| Operation | Key / Command | Note |
| --- | --- | --- |
| `+` | Addition | Handles numbers of any length. |
| `-` | Subtraction | Correctly handles negative results. |
| `x` | Multiplication | Handles carrying values across nodes. |
| `/` | Division | The most complex implementation. Includes zero-checks. |
