# Spin Buttons & Step Control — ASP.NET Core NumericTextBox

This guide covers spinner arrows (up/down buttons), step increments, and keyboard navigation in ASP.NET Core.

## Table of Contents
- [Overview](#overview)
- [Enabling/Disabling Spin Buttons](#enablingdisabling-spin-buttons)
- [Step Property](#step-property)
- [Controlling Spinner Behavior](#controlling-spinner-behavior)
- [Keyboard Navigation](#keyboard-navigation)
- [Precision with Steps](#precision-with-steps)
- [Complete Examples](#complete-examples)

---

## Overview

The spinner buttons (up/down arrows) are interactive controls that allow users to increment and decrement values. They are highly customizable:

- **Show/Hide**: Control visibility with `ShowSpinButton`
- **Step size**: Set increment amount with `Step` property
- **Bounds**: Respect min/max ranges automatically
- **Keyboard**: Arrow Up/Down keys work when focused
- **Accessibility**: Full keyboard and screen reader support

---

## Enabling/Disabling Spin Buttons

### Show Spin Buttons (Default)

By default, NumericTextBox displays the spinner buttons on the right side.

**Razor View (CSHTML):**
```html
<h4>Spinner Buttons Visible</h4>
<ejs-numerictextbox id="with-spinner" 
                    value="10"
                    showSpinButton="true">
</ejs-numerictextbox>
<small>Visual: Up arrow (▲) and down arrow (▼) buttons appear on the right</small>
```

### Hide Spin Buttons

Create a text-only numeric input without spinner buttons for cleaner layouts.

**Razor View (CSHTML):**
```html
<h4>No Spinner Buttons</h4>
<ejs-numerictextbox id="no-spinner" 
                    value="10"
                    showSpinButton="false">
</ejs-numerictextbox>
<small>Users can still use keyboard arrows or type directly</small>
```

**Use cases:**
- Text fields where users prefer direct typing
- Mobile-optimized interfaces
- Accessibility-focused interfaces where keyboard is primary
- Space-constrained layouts

---

## Step Property

The `Step` property defines the increment amount when using spinner buttons or arrow keys.

### Default Step (1)

**Razor View (CSHTML):**
```html
<h4>Default Step = 1</h4>
<ejs-numerictextbox id="step1" 
                    value="10"
                    step="1">
</ejs-numerictextbox>
<small>Clicking up arrow: 10 → 11 → 12 → ...</small>
```

### Custom Step Values

**Razor View (CSHTML):**
```html
<!-- Step by 5 -->
<h4>Step = 5</h4>
<ejs-numerictextbox id="step5" 
                    value="0"
                    step="5">
</ejs-numerictextbox>
<small>Increments: 0 → 5 → 10 → 15 → ...</small>

<!-- Step by 10 -->
<h4>Step = 10</h4>
<ejs-numerictextbox id="step10" 
                    value="50"
                    step="10">
</ejs-numerictextbox>
<small>Increments: 50 → 60 → 70 → ...</small>

<!-- Step by 0.1 for decimals -->
<h4>Step = 0.1 (Decimals)</h4>
<ejs-numerictextbox id="step-decimal" 
                    value="1.0"
                    step="0.1"
                    decimals="1">
</ejs-numerictextbox>
<small>Increments: 1.0 → 1.1 → 1.2 → ...</small>
```

### Practical Examples

**Quantity Field (step by 1):**

```html
<div class="form-group">
    <label for="quantity">Quantity</label>
    <ejs-numerictextbox id="quantity" 
                        value="1"
                        step="1"
                        min="1"
                        max="100">
    </ejs-numerictextbox>
</div>
```

**Price Field (step by 0.01):**

```html
<div class="form-group">
    <label for="price">Price</label>
    <ejs-numerictextbox id="price" 
                        value="9.99"
                        step="0.01"
                        decimals="2"
                        format="c2"
                        min="0">
    </ejs-numerictextbox>
</div>
```

**Percentage Field (step by 5):**

```html
<div class="form-group">
    <label for="percentage">Discount %</label>
    <ejs-numerictextbox id="percentage" 
                        value="50"
                        step="5"
                        min="0"
                        max="100">
    </ejs-numerictextbox>
</div>
```

---

## Controlling Spinner Behavior

### Respecting Min/Max Bounds

Spinner buttons automatically respect min/max boundaries and prevent overflow.

**Razor View (CSHTML):**
```html
<h4>Bounded Spinner (0-100)</h4>
<ejs-numerictextbox id="bounded" 
                    value="98"
                    min="0"
                    max="100"
                    step="5"
                    strictMode="true">
</ejs-numerictextbox>
<small>At value 98, clicking up arrow increments to 100 (max). Next click has no effect.</small>
```

**Behavior:**
- At value 98, clicking up arrow increments to 100 (max)
- Next click doesn't go beyond 100
- At value 0 (min), down arrow has no effect

### Combining with StrictMode

With `StrictMode="false"`, out-of-range values are temporarily allowed.

**Razor View (CSHTML):**
```html
<h4>Non-Strict Mode (Allow Overflow)</h4>
<ejs-numerictextbox id="non-strict" 
                    value="95"
                    min="0"
                    max="100"
                    step="10"
                    strictMode="false">
</ejs-numerictextbox>
<small>Value 95 + step 10 = 105 (exceeds max, but allowed)</small>
```

**Behavior:**
- Value 95 + step 10 = 105 (exceeds max, but allowed)
- Useful for temporary overages or special logic

---

## Keyboard Navigation

NumericTextBox supports standard keyboard shortcuts for accessibility.

### Keyboard Shortcuts

| Key | Behavior |
|-----|----------|
| **Arrow Up** | Increments value by `Step` amount |
| **Arrow Down** | Decrements value by `Step` amount |
| **Ctrl + Up** | Jump to maximum value |
| **Ctrl + Down** | Jump to minimum value |
| **Tab** | Move focus to next element |
| **Shift + Tab** | Move focus to previous element |

### JavaScript Event Handling

**Razor View (CSHTML):**
```html
<h4>Keyboard Navigation Demo</h4>
<p>Click the input and use Arrow Up/Down keys</p>

<ejs-numerictextbox id="keyboard-demo" 
                    value="10"
                    step="1"
                    min="0"
                    max="20"
                    showSpinButton="true">
</ejs-numerictextbox>

<p id="key-feedback"></p>
```

**JavaScript (wwwroot/js/app.js):**
```javascript
const demoNumeric = document.getElementById('keyboard-demo').ej2_instances[0];
const feedback = document.getElementById('key-feedback');

demoNumeric.keyDown = (args) => {
  let action = '';
  
  if (args.key === 'ArrowUp') {
    action = `Incremented to ${demoNumeric.value}`;
  } else if (args.key === 'ArrowDown') {
    action = `Decremented to ${demoNumeric.value}`;
  }
  
  if (action) {
    feedback.textContent = action;
  }
};
```

---

## Precision with Steps

### Decimal Precision

Ensure steps maintain the decimal precision you specify.

**Razor View (CSHTML):**
```html
<h4>Decimal Precision with Steps</h4>

<ejs-numerictextbox id="decimal-step" 
                    value="1.50"
                    step="0.25"
                    decimals="2"
                    validateDecimalOnType="true">
</ejs-numerictextbox>
<small>Step by 0.25: 1.50 → 1.75 → 2.00 → 2.25 → ...</small>
```

---

## Complete Examples

### Product Quantity Selector

**Razor View (CSHTML):**
```html
<div class="product-selector">
    <h4>Select Quantity</h4>
    
    <div class="form-group">
        <label for="qty">Quantity</label>
        <ejs-numerictextbox id="qty" 
                            value="1"
                            step="1"
                            min="1"
                            max="999"
                            showSpinButton="true">
        </ejs-numerictextbox>
    </div>
    
    <div class="form-group">
        <label>Unit Price: $19.99</label>
        <input type="text" id="total-price" readonly value="$19.99" />
    </div>
    
    <button onclick="addToCart()">Add to Cart</button>
</div>
```

**JavaScript (wwwroot/js/cart.js):**
```javascript
function addToCart() {
  const qtyNumeric = document.getElementById('qty').ej2_instances[0];
  const quantity = qtyNumeric.value;
  const unitPrice = 19.99;
  const total = quantity * unitPrice;
  
  console.log(`Added ${quantity} items at $${total.toFixed(2)} total`);
}

// Update total when quantity changes
const qtyNumeric = document.getElementById('qty').ej2_instances[0];
qtyNumeric.change = (args) => {
  const total = args.value * 19.99;
  console.log(`New total: $${total.toFixed(2)}`);
};
```

### Temperature Control

**Razor View (CSHTML):**
```html
<div class="temperature-control">
    <h4>Room Temperature Control</h4>
    
    <div class="control-panel">
        <button onclick="decreaseTemp()">−</button>
        
        <ejs-numerictextbox id="temp" 
                            value="20"
                            step="0.5"
                            decimals="1"
                            min="16"
                            max="30"
                            showSpinButton="true">
        </ejs-numerictextbox>
        
        <button onclick="increaseTemp()">+</button>
    </div>
    
    <p id="temp-status">Current: 20°C</p>
</div>
```

**JavaScript (wwwroot/js/temperature.js):**
```javascript
const tempNumeric = document.getElementById('temp').ej2_instances[0];

function decreaseTemp() {
  tempNumeric.value = Math.max(tempNumeric.min, tempNumeric.value - 0.5);
  updateTempStatus();
}

function increaseTemp() {
  tempNumeric.value = Math.min(tempNumeric.max, tempNumeric.value + 0.5);
  updateTempStatus();
}

function updateTempStatus() {
  document.getElementById('temp-status').textContent = 
    `Current: ${tempNumeric.value}°C`;
}

// Listen for changes
tempNumeric.change = (args) => {
  updateTempStatus();
};
```

---

## See Also

- `numeric-textbox-api.md` — Complete API reference
- `numeric-textbox-precision-decimals.md` — Decimal handling
- `numeric-textbox-formats-and-validation.md` — Format patterns
