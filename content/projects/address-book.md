# Address Book

A CLI-based contact manager written in C, featuring file-backed serialization and dynamic memory management. The application focuses on robust data serialization, memory safety, and input sanitization to maintain database integrity across user sessions.

### Technical Details
- **Data Persistence:** Implemented custom file I/O routines to serialize struct arrays into CSV format, ensuring reliable persistence and parsing of contact information on application startup.
- **Dynamic Memory Allocation:** Manages an array of contact structures dynamically, dynamically scaling the storage limit to optimize memory footprint.
- **Input Validation & Buffer Security:** Implemented validation checks on user input to enforce formatting (e.g., telephone digits and email syntax) and used bounded input functions to prevent buffer overflow vulnerabilities.

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

## Menu Structure
The application uses a terminal-based menu loop. Once launched, the following features are available:

1. **Add Contact:** Prompts for contact details and runs validation before saving.
2. **Search Contact:** Filters database entries by name, phone, or email.
3. **Edit Contact:** Modifies fields of an existing contact structure in place.
4. **Delete Contact:** Frees or shifts elements in the structure array to remove a record.
5. **List Contacts:** Renders the active database in a formatted text table.
6. **Exit:** Serializes the current array state to `contacts.csv` and terminates cleanly.

## Cheatsheet
| Feature | Implementation Detail |
| --- | --- |
| **Persistence** | Data is serialized to `contacts.csv` for long-term storage. |
| **Validation** | Regex-like checks for valid email formats and phone digits. |
| **Rendering** | Custom table renderer for clean CLI output. |
| **Sorting** | Internal sort engine for organizing contacts by name. |
