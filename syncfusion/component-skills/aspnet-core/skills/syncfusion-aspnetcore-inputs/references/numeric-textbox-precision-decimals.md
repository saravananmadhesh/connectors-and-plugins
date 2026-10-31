# Precision & Decimals — ASP.NET Core NumericTextBox

This guide covers decimal places, precision control, rounding behavior, and edge cases in ASP.NET Core.

## Table of Contents
- [Overview](#overview)
- [Decimals Property](#decimals-property)
- [ValidateDecimalOnType Property](#validatedecimalontype-property)
- [Trailing Zeros](#trailing-zeros)
- [Rounding Behavior](#rounding-behavior)
- [Precision Edge Cases](#precision-edge-cases)
- [Practical Examples](#practical-examples)

---

## Overview

The NumericTextBox provides fine-grained control over decimal precision through several properties:

- **Decimals**: Maximum number of decimal places allowed
- **ValidateDecimalOnType**: Real-time validation while typing
- **Trailing zeros**: Display or hide zeros after the decimal point
- **Rounding**: Automatic control of rounding behavior
- **Edge cases**: Handle floating-point precision issues

---

## Decimals Property

The `Decimals` property controls the maximum number of decimal places allowed in the input.

### No Decimals (Integer Only)

**Razor View (CSHTML):**
```html
<h4>Quantity (Integers Only)</h4>
<ejs-numerictextbox id="quantity" 
                    value="10"
                    decimals="0"
                    placeholder="Only whole numbers">
</ejs-numerictextbox>
<small>Input of 42.99 → Stored as 42</small>
```

**Use cases:**
- Quantity fields
- Item counts
- Age or years

### Single Decimal Place

**Razor View (CSHTML):**
```html
<h4>Rating (One Decimal)</h4>
<ejs-numerictextbox id="rating" 
                    value="4.5"
                    decimals="1"
                    min="0"
                    max="5"
                    placeholder="0.0 to 5.0">
</ejs-numerictextbox>
<small>Input of 3.567 → Displays as 3.5</small>
```

**Use cases:**
- Star ratings (0.5 increments)
- Temperature readings (20.5°C)
- Single precision measurements

### Two Decimal Places (Default for Currency)

**Razor View (CSHTML):**
```html
<h4>Price (Two Decimals)</h4>
<ejs-numerictextbox id="price" 
                    value="99.99"
                    decimals="2"
                    format="c2"
                    min="0"
                    placeholder="$0.00">
</ejs-numerictextbox>
<small>Input of 3.567 → Displays as 3.57</small>
```

**Use cases:**
- Currency/money ($99.99)
- Prices
- Financial calculations

### Three or More Decimals

**Razor View (CSHTML):**
```html
<h4>Scientific Value (Three Decimals)</h4>
<ejs-numerictextbox id="scientific" 
                    value="3.14159"
                    decimals="3"
                    placeholder="0.000">
</ejs-numerictextbox>
<small>Input of 3.14159 → Stored as 3.142</small>
```

**Use cases:**
- Scientific measurements
- Precise calculations
- Exchange rates

---

## ValidateDecimalOnType Property

The `ValidateDecimalOnType` property controls whether decimals are validated in real-time (while typing) or on blur (when leaving the field).

### ValidateDecimalOnType = true (Strict)

When `true`, decimal validation happens as you type. Additional decimals beyond the limit are rejected immediately.

**Razor View (CSHTML):**
```html
<h4>Strict Validation (Real-Time)</h4>
<ejs-numerictextbox id="strict-decimal" 
                    value="10.00"
                    decimals="2"
                    validateDecimalOnType="true"
                    placeholder="Strict decimal validation">
</ejs-numerictextbox>
<small>User types: 3.567 → Only 3.56 can be entered (7 is rejected during typing)</small>
```

**Behavior:**
- User cannot type more decimals than allowed
- Keystroke is blocked if it exceeds the decimal limit
- Input is constrained during typing

**Best for:**
- Financial inputs where precision is critical
- Fields where incorrect values cause problems immediately
- Real-time validation preferred

### ValidateDecimalOnType = false (Loose)

When `false`, decimal validation happens only on blur (when the field loses focus).

**Razor View (CSHTML):**
```html
<h4>Loose Validation (On Blur)</h4>
<ejs-numerictextbox id="loose-decimal" 
                    value="10.00"
                    decimals="2"
                    validateDecimalOnType="false"
                    placeholder="Validation on blur">
</ejs-numerictextbox>
<small>User types: 3.567 → While typing: 3.567 displays | On blur: Rounds to 3.57</small>
```

**Behavior:**
- User can type more decimals than allowed
- Value is corrected when field loses focus
- Better for copy-paste operations

**Best for:**
- User-friendly interfaces where typing shouldn't be restricted
- Scientific input where users may paste values
- Copy-paste operations need to work smoothly

---

## Trailing Zeros

### Displaying Trailing Zeros

Control whether trailing zeros display after the decimal point using the `Format` property combined with precision settings.

**Without Trailing Zeros (Default):**

**Razor View (CSHTML):**
```html
<ejs-numerictextbox id="no-trailing" 
                    value="99"
                    decimals="2"
                    placeholder="Displays: 99 (not 99.00)">
</ejs-numerictextbox>
```

**With Trailing Zeros:**

```html
<ejs-numerictextbox id="with-trailing" 
                    value="99"
                    decimals="2"
                    format="n2"
                    placeholder="Displays: 99.00">
</ejs-numerictextbox>
```

---

## Rounding Behavior

The NumericTextBox automatically rounds values based on the `Decimals` setting and `ValidateDecimalOnType` mode.

### Standard Rounding (Banker's Rounding)

**Razor View (CSHTML):**
```html
<h4>Rounding Examples</h4>

<!-- 3.145 rounds to 3.14 or 3.15 depending on banker's rounding -->
<ejs-numerictextbox id="rounding" 
                    value="3.145"
                    decimals="2"
                    validateDecimalOnType="true">
</ejs-numerictextbox>
```

**Rules:**
- Standard: 3.145 → 3.14 (round half to even)
- 3.155 → 3.16
- 3.165 → 3.16
- 3.175 → 3.18

---

## Precision Edge Cases

### Floating-Point Precision Issues

**Problem:** JavaScript's floating-point arithmetic can introduce precision errors.

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004 (not 0.3!)
```

**Solution:** Use ASP.NET Core server-side validation for critical calculations.

**Controller (Controllers/CalculationController.cs):**
```csharp
using Microsoft.AspNetCore.Mvc;
using System;

namespace AspNetCoreApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculationController : ControllerBase
    {
        [HttpPost("calculate")]
        public IActionResult Calculate([FromBody] decimal value1, [FromBody] decimal value2)
        {
            // Use decimal type for precise financial calculations
            decimal result = value1 + value2; // Will be exactly correct
            return Ok(new { result });
        }
    }
}
```

---

## Practical Examples

### Dynamic Decimals Selection

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="precision-select">Select Precision (decimal places):</label>
    <select id="precision-select" onchange="changePrecision(this.value)">
        <option value="0">0 (Integer)</option>
        <option value="1">1</option>
        <option value="2" selected>2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    </select>
</div>

<div class="form-group">
    <label for="dynamic-value">Value:</label>
    <ejs-numerictextbox id="dynamic-value" 
                        value="10"
                        decimals="2">
    </ejs-numerictextbox>
</div>

<p id="current-value">Current value: 10.00</p>
```

**JavaScript (wwwroot/js/app.js):**
```javascript
function changePrecision(precision) {
  const numericObj = document.getElementById('dynamic-value').ej2_instances[0];
  numericObj.decimals = parseInt(precision);
  
  // Update display
  const precisionStr = parseInt(precision) > 0 
    ? numericObj.value.toFixed(precision) 
    : Math.floor(numericObj.value);
  document.getElementById('current-value').textContent = 
    `Current value: ${precisionStr}`;
}
```

### Currency Input with Validation

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="amount">Order Amount (USD)</label>
    <ejs-numerictextbox id="amount" 
                        value="0"
                        decimals="2"
                        format="c2"
                        min="0.01"
                        max="999999.99"
                        validateDecimalOnType="true"
                        placeholder="$0.00">
    </ejs-numerictextbox>
    <small>Minimum: $0.01 | Maximum: $999,999.99</small>
</div>
```

### Measurement Input

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="temperature">Temperature (°C)</label>
    <ejs-numerictextbox id="temperature" 
                        value="20.5"
                        decimals="1"
                        min="-50"
                        max="50"
                        step="0.5"
                        placeholder="-50.0 to 50.0">
    </ejs-numerictextbox>
</div>
```

---

## See Also

- `numeric-textbox-api.md` — Complete API reference
- `numeric-textbox-formats-and-validation.md` — Format patterns
- `numeric-textbox-adornments-and-styling.md` — Styling options
