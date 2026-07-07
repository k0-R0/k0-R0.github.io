# APC: Arbitrary Precision Calculator

This calculator is written in C to perform arithmetic operations on integers of arbitrary length, bypassing standard 64-bit hardware limits. The implementation relies on manual dynamic memory allocation and custom list manipulation.

Each operand is represented as a doubly linked list where each node stores a single digit. This representation enables bidirectional traversal, allowing operations to start from the least significant digit while maintaining pointers for carry and borrow operations.

### Implementation Details
- **Manual Arithmetic:** Because standard operators cannot be applied directly to pointer-based structures, the arithmetic algorithms (addition, subtraction, and multiplication) simulate positional notation arithmetic node-by-node.
- **Division Algorithm:** Division was implemented by performing repeated subtraction and list comparison, tracking quotient accumulation via temporary accumulator lists. This requires managing multiple concurrent list traversals and pointer positions.

### Memory Management & Safety
To prevent memory leaks across multi-step calculations, an enum-based state machine tracks the lifecycle of intermediate operand lists. A centralized cleanup routine ensures all allocated nodes are freed during both successful execution and error states (such as division by zero).

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
| `/` | Division | Performs zero-checks and handles division loops. |
