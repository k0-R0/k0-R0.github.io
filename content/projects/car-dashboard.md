# PIC18 Automotive CAN Node Simulator

An automotive network simulator built using PIC18 microcontrollers. It simulates a distributed vehicle system where sensor data (speed, RPM, gears, indicators) is read by transmitter nodes and shared over a Controller Area Network (CAN) bus to a central display node (ECU3).

### Technical Details
- **Controller Area Network (CAN):** Implemented multi-node communication using the PIC18 microcontroller's internal CAN module to transmit speed, RPM, gears, and indicator states.
- **Sensor Acquisition:** Configured onboard ADC modules to read analog values from potentiometers (simulating speed and RPM) and digital I/O for switches (simulating gears and indicators).
- **Central Dashboard ECU:** Programmed a receiver node (ECU3) to parse incoming CAN messages and display live vehicle diagnostics on a Character LCD (CLCD) display.

## Repository
[github.com/k0-R0/Car_Dashboard →](https://github.com/k0-R0/Car_Dashboard)

## Getting Started

### Flashing the ECUs
Open and flash the following projects in MPLAB X IDE (using the XC8 compiler) to their respective development boards:
- Flash `ECU1.X` to Board 1 (Speed & Gear Transmitter).
- Flash `ECU2.X` to Board 2 (RPM & Indicator Transmitter).
- Flash `ECU3.X` to Board 3 (Dashboard Receiver & Display).

### Wiring and Bus Termination
- Connect the CAN terminals across all three boards using twisted-pair wiring.
- Enable exactly two 120Ω termination resistors (or jumpers) at the physical ends of the CAN bus to stabilize communication.

## Node Summary
| Node | Inputs | Processing / Protocol | Outputs |
| --- | --- | --- | --- |
| **ECU 1** | Speed Potentiometer, Gear Switches | ADC, Digital Read, CAN Tx | CAN Bus message |
| **ECU 2** | RPM Potentiometer, Indicator Switches | ADC, Digital Read, CAN Tx | CAN Bus message |
| **ECU 3** | CAN Bus Rx | CAN Msg Parsing, CLCD driver | Dashboard LCD UI |
