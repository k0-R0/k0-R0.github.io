# APC: Arbitrary Precision Calculator

Standard data types like `long long` are insufficient for calculations involving massive numbers. I built this calculator in C to handle arithmetic on numbers of any length. This project served as a deep dive into manual memory management and doubly linked list manipulation.

I used a doubly linked list where each node stores a single digit. This structure allows for efficient traversal from both ends, which is necessary for performing arithmetic operations from the least significant digit while maintaining pointers for more significant digits.

### Implementation Challenges
Since standard operators do not work on linked lists, I implemented the arithmetic logic manually. This involved simulating the standard "paper-and-pencil" method for addition, subtraction, and multiplication across nodes. 

Division was the most complex operation to implement. It required managing multiple list traversals and handling the logic for comparing large numbers to determine how many times one value fits into another.

### Memory Safety
Memory integrity was a priority because every number is a collection of dynamically allocated nodes. I used an enum-based state machine to track operation status and implemented a centralized cleanup function to ensure all nodes are freed. The system handles errors, such as division by zero, without leaking memory.

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
