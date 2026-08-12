# Car Black Box (Event Data Recorder)

An embedded C firmware project implementing a Car Black Box (Event Data Recorder) on the Microchip PIC16F877A microcontroller. The system continuously monitors vehicle state (speed and gear position) alongside real-time timestamps from an external RTC, logging critical events into external non-volatile EEPROM memory.

### Technical Details
- **I2C Protocol Implementation:** Programmed low-level I2C communication drivers to interface with a DS1307 Real-Time Clock (RTC) for live timestamping and an AT24C04 external EEPROM for event record persistence.
- **Event-Driven Circular Buffer:** Engineered a 12-byte binary log structure stored in EEPROM as a 10-slot circular buffer to preserve the latest vehicle events (timestamp, gear state, speed) across power cycles.
- **On-Screen Menu System:** Designed an interactive menu navigation architecture rendered on a 16x2 Character LCD (CLCD), allowing users to browse logs, adjust RTC hours/minutes/seconds, and reset log history using a Matrix Keypad.
- **UART Serial Telemetry:** Implemented EUSART hardware serial output at 9600 Baud to export saved vehicle log entries to a host PC terminal for diagnostics.

## Repository
[github.com/k0-R0/car_blackbox →](https://github.com/k0-R0/car_blackbox)

## Getting Started

### System Hardware Architecture
- **Microcontroller:** Microchip PIC16F877A (20 MHz External Crystal)
- **RTC & EEPROM:** DS1307 RTC & AT24C04 EEPROM on shared hardware I2C bus (`RC3`/SCL, `RC4`/SDA)
- **Display Module:** 16x2 Character LCD (`PORTD` for data, `RC0`-`RC2` for RS/RW/EN control)
- **Input Peripherals:** Potentiometer ADC (`RA4`/AN4) for speed control & Matrix Keypad (`PORTB`) for gear shifts and menu control
- **Serial Interface:** EUSART module (`RC6`/TX, `RC7`/RX) at 9600 Baud 8N1

### Controls & Navigation
| Key | Dashboard Mode | Menu Mode | Set Time Mode |
| --- | --- | --- | --- |
| **MK_SW1** | Gear Up (`GN` → `G1` → ... → `G5`) | Scroll Up / Previous Option | Increment Active Field |
| **MK_SW2** | Gear Down (`G5` → ... → `G1` → `GN`) | Scroll Down / Next Option | Select Field (`Sec` → `Min` → `Hr`) |
| **MK_SW3** | Trigger Collision (`C`) | — | — |
| **MK_SW11** | — | Enter / Confirm Selection | Save Time to DS1307 RTC |
| **MK_SW12** | Enter Main Menu | Back to Dashboard | Cancel / Return to Menu |

## Data Logging & Memory Format
Each event record consumes **12 bytes** of external EEPROM memory:

| Bytes | Data Field | Description |
| --- | --- | --- |
| `0..7` | Timestamp | `HH:MM:SS` real-time clock reading |
| `8..9` | Gear Position | `GN`, `G1`-`G5`, `GR`, or `C` (Collision) |
| `10..11` | Vehicle Speed | `00` to `99` km/h potentiometer readout |

- **Circular Buffer:** 10 event slots allocated across EEPROM addresses `0` to `119`.
- **Event Counter:** 32-bit unsigned integer stored at addresses `120` to `123`.
