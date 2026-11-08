

An interactive, responsive web tool that converts temperature values between **Celsius**, **Fahrenheit**, and **Kelvin** with real-time input validation, physics-accurate Absolute Zero boundary checking, simultaneous multi-unit output, and step-by-step mathematical explanations.

s

- **Real-Time Input Validation**:

  - Rejects non-numeric characters and malformed inputs with visual feedback and error messaging.
  - Highlights input fields with accessible state attributes (`aria-invalid`, `role="alert"`).
- **Absolute Zero Boundary Protection**:

  - Physics-compliant edge case handling preventing sub-absolute-zero entries:
    - **Celsius**: $\ge -273.15^\circ\text{C}$
    - **Fahrenheit**: $\ge -459.67^\circ\text{F}$
    - **Kelvin**: $\ge 0\text{ K}$
- **Unit Selector & Simultaneous Conversion**:
  - Dropdown selector for input unit (`Celsius`, `Fahrenheit`, `Kelvin`).
  - Displays all 3 units concurrently in dedicated result cards, with the current input unit subtly highlighted.
- **Convert & Reset Actions**:
  - Dedicated **Convert** button triggering full calculations.
  - Instant conversion upon pressing <kbd>Enter</kbd> or typing in real time.
  - Dedicated **Reset** button returning the interface to initial defaults.
  - Quick-clear `✕` button inside the input field.
- **Quick Preset Chips**:
  - Instant buttons for common thermal benchmarks:
    - *Absolute Zero* ($-273.15^\circ\text{C}$)
    - *Freezing Point* ($0^\circ\text{C}$)
    - *Room Temperature* ($21^\circ\text{C}$)
    - *Body Temperature* ($37^\circ\text{C}$)
    - *Boiling Point* ($100^\circ\text{C}$)
- **Thermal State Gauge & Formula Breakdown**:
  - Sensation/thermal state indicator showing whether the temperature is freezing, room temperature, hot, or cryogenic.
  - Step-by-step breakdown of the exact mathematical formulas calculated.
- **One-Click Clipboard Copy**:
  - Copy any converted temperature value directly to the clipboard with visual confirmation.
- **Clean Centered UI**:
  - Centered layout built with CSS3 flexbox and grid, smooth gradients, glassmorphism, responsive cards, and clean typography.



| From | To Celsius | To Fahrenheit | To Kelvin |
| :--- | :--- | :--- | :--- |
| **Celsius ($C$)** | — | $(C \times \frac{9}{5}) + 32$ | $C + 273.15$ |
| **Fahrenheit ($F$)** | $(F - 32) \times \frac{5}{9}$ | — | $(F - 32) \times \frac{5}{9} + 273.15$ |
| **Kelvin ($K$)** | $K - 273.15$ | $(K - 273.15) \times \frac{9}{5} + 32$ | — |


```
Temperature Converter/
├── index.html     # Semantic HTML5 layout and form controls
├── style.css      # Modern responsive styling, glassmorphism, layout
├── script.js      # Vanilla JavaScript logic, validation, and conversions
└── README.md      # Documentation & feature overview
```



1. Open `index.html` in any modern web browser (Google Chrome, Firefox, Microsoft Edge, Safari).
2. Enter any temperature value, choose an input unit, and click **Convert** (or press Enter).

