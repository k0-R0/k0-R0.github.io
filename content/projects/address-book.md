# Address Book

A CLI contact manager developed in C to practice structured data handling and file persistence. This project focuses on the fundamental mechanics of reading from and writing to the disk while managing dynamic data in memory.

The core objective was to implement a system that reliably stores contact information across sessions. I focused on building a clean interface between the in-memory data structures and the file-backed storage to ensure data integrity.

### Implementation Details
- **Data Persistence:** Implemented custom file I/O logic to serialize and deserialize contact structs, ensuring that data is correctly preserved on the disk.
- **Memory Management:** Managed dynamic allocation for contact lists to handle varying numbers of entries without wasting system resources.
- **Input Validation:** Focused on handling edge cases in user input to prevent buffer overflows and ensure stable operation during CLI interactions.

## Repository
[github.com/k0-R0/Address-Book →](https://github.com/k0-R0/Address-Book)

## Build & Run
```bash
# Clone and build
git clone https://github.com/k0-R0/Address-Book
cd Address-Book
make

# Run the application
./address_book
```

## Menu Options
The application is entirely menu-driven. Once launched, you can navigate through the following options:

1. **Add Contact:** Prompts for name, phone, and email with built-in validation.
2. **Search Contact:** Search by name, phone number, or email address.
3. **Edit Contact:** Modify details of an existing entry.
4. **Delete Contact:** Remove a contact from the book.
5. **List Contacts:** Displays all stored contacts in a formatted table.
6. **Exit:** Saves changes to `contacts.csv` and closes the application.

## Cheatsheet
| Feature | Implementation Detail |
| --- | --- |
| **Persistence** | Data is serialized to `contacts.csv` for long-term storage. |
| **Validation** | Regex-like checks for valid email formats and phone digits. |
| **Rendering** | Custom table renderer for clean CLI output. |
| **Sorting** | Internal sort engine for organizing contacts by name. |
