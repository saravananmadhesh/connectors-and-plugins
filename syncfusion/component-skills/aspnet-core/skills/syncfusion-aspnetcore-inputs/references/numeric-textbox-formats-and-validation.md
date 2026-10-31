# NumericTextBox Formats & Validation in ASP.NET Core

This guide covers number formatting, range validation, and strict mode enforcement in ASP.NET Core.

## Table of Contents
- [Overview](#overview)
- [Standard Format Specifiers](#standard-format-specifiers)
- [Custom Number Formats](#custom-number-formats)
- [Currency Input](#currency-input)
- [Percentage Input](#percentage-input)
- [Range Validation](#range-validation)
- [Strict Mode Property](#strict-mode-property)
- [Examples & Use Cases](#examples--use-cases)

## Overview

NumericTextBox in ASP.NET Core provides powerful formatting and validation capabilities:

- **Format specifiers** - Control how numbers display (currency, percentage, scientific)
- **Custom formats** - Create application-specific number patterns
- **Min/Max validation** - Restrict input to a numeric range
- **Strict mode** - Enforce boundaries or allow out-of-range values
- **Decimal control** - Manage precision and decimal places

The `format` property controls display, while `min`, `max`, and `strictMode` control validation.

---

## Standard Format Specifiers

NumericTextBox in ASP.NET Core supports standard .NET number format specifiers:

### Number Format (n)

Displays the number with thousand separators and specified decimals.

```html
<!-- Number with 2 decimal places and thousand separators -->
<ejs-numerictextbox id="numericTextBox" value="1234.56" format="n2">
</ejs-numerictextbox>
<!-- Displays: 1,234.56 -->
```

**Specifier breakdown:**
- `n` = number format
- `2` = decimal places

**Examples:**
- `format="n0"` → 1,235 (no decimals, rounded)
- `format="n1"` → 1,234.6 (one decimal)
- `format="n2"` → 1,234.56 (two decimals)
- `format="n3"` → 1,234.567 (three decimals)

```html
<ejs-numerictextbox id="example1" value="1234.567" format="n0"></ejs-numerictextbox>
<ejs-numerictextbox id="example2" value="1234.567" format="n1"></ejs-numerictextbox>
<ejs-numerictextbox id="example3" value="1234.567" format="n2"></ejs-numerictextbox>
```

---

### Currency Format (c)

Displays the number with currency symbol and specified decimals.

```html
<!-- Currency with 2 decimal places -->
<ejs-numerictextbox id="currency" value="99.99" format="c2">
</ejs-numerictextbox>
<!-- Displays: $99.99 (locale-dependent) -->
```

**Note:** Currency symbol depends on your culture setting. For US English, `$` is used.

**Examples:**
- `format="c0"` → $100 (no decimals)
- `format="c2"` → $99.99 (two decimals)
- `format="c3"` → $99.999 (three decimals)

```html
<ejs-numerictextbox id="price" value="99.99" format="c2">
</ejs-numerictextbox>

<ejs-numerictextbox id="priceNoDecimals" value="100" format="c0">
</ejs-numerictextbox>
```

---

### Currency Format with Specific Currency

Use the `currency` attribute to specify a particular currency code:

```html
<!-- US Dollar -->
<ejs-numerictextbox id="usd" value="99.99" format="c2" currency="USD">
</ejs-numerictextbox>

<!-- Euro -->
<ejs-numerictextbox id="eur" value="99.99" format="c2" currency="EUR">
</ejs-numerictextbox>

<!-- British Pound -->
<ejs-numerictextbox id="gbp" value="99.99" format="c2" currency="GBP">
</ejs-numerictextbox>

<!-- Japanese Yen -->
<ejs-numerictextbox id="jpy" value="10000" format="c0" currency="JPY">
</ejs-numerictextbox>
```

---

### Percentage Format (p)

Displays the number as a percentage (multiplies by 100).

```html
<!-- Percentage format -->
<ejs-numerictextbox id="percentage" value="0.5" format="p">
</ejs-numerictextbox>
<!-- Displays: 50% -->
```

**Examples:**
- `format="p"` → 50% (no decimals, multiplies by 100)
- `format="p2"` → 50.00% (two decimals, multiplies by 100)
- `format="p1"` → 50.0% (one decimal, multiplies by 100)

```html
<ejs-numerictextbox id="completion" value="0.75" format="p">
</ejs-numerictextbox>
<!-- Displays: 75% -->

<ejs-numerictextbox id="discount" value="0.15" format="p2">
</ejs-numerictextbox>
<!-- Displays: 15.00% -->
```

---

### Scientific Format (e)

Displays the number in scientific notation.

```html
<ejs-numerictextbox id="scientific" value="1234.56" format="e2">
</ejs-numerictextbox>
<!-- Displays: 1.23E+03 -->
```

---

## Range Validation

Use `min` and `max` properties to restrict numeric input to a valid range:

```html
<!-- Age validation: 0-120 -->
<ejs-numerictextbox id="age" 
    placeholder="Enter age"
    min="0" 
    max="120"
    value="25"
    strictMode="true">
</ejs-numerictextbox>

<!-- Rating: 0-5 -->
<ejs-numerictextbox id="rating" 
    placeholder="Rating 0-5"
    min="0" 
    max="5"
    step="0.5"
    strictMode="true">
</ejs-numerictextbox>

<!-- Percentage: 0-100 -->
<ejs-numerictextbox id="percentage" 
    placeholder="Percentage"
    min="0" 
    max="100"
    format="p"
    strictMode="true">
</ejs-numerictextbox>
```

---

## Strict Mode Property

**strictMode="true"** (Default)

When enabled, values outside the min/max range are prevented from being entered. The input is immediately rejected if out of range.

```html
<!-- Strict validation: values must be 0-100 -->
<ejs-numerictextbox id="strict" 
    value="50" 
    min="0" 
    max="100"
    strictMode="true">
</ejs-numerictextbox>
```

**Behavior:**
- User cannot enter values outside the range
- Spinner buttons respect the boundaries
- Keyboard input is validated in real-time

---

**strictMode="false"**

When disabled, users can enter any value, but it's automatically corrected to fit within min/max when the control loses focus (blur event).

```html
<!-- Non-strict: values are corrected on blur -->
<ejs-numerictextbox id="nonstrict" 
    value="50" 
    min="0" 
    max="100"
    strictMode="false">
</ejs-numerictextbox>
```

**Behavior:**
- User can type any value temporarily
- On blur, if value < min, it becomes min
- On blur, if value > max, it becomes max
- Useful for lenient validation

---

## Decimal Precision

Use the `decimals` property to control the number of decimal places:

```html
<!-- 2 decimal places -->
<ejs-numerictextbox id="price" 
    value="10.5" 
    decimals="2">
</ejs-numerictextbox>

<!-- 3 decimal places -->
<ejs-numerictextbox id="measurement" 
    value="10.567" 
    decimals="3">
</ejs-numerictextbox>

<!-- No decimal places -->
<ejs-numerictextbox id="integer" 
    value="10" 
    decimals="0">
</ejs-numerictextbox>
```

---

## Examples & Use Cases

### Example 1: Product Price Input

```html
<!-- Product Price -->
<div style="margin-bottom: 20px;">
    <label for="productPrice">Product Price:</label>
    <ejs-numerictextbox id="productPrice"
        value="29.99"
        format="c2"
        currency="USD"
        min="0"
        max="99999.99"
        decimals="2"
        strictMode="true"
        placeholder="Enter price"
        change="onPriceChange">
    </ejs-numerictextbox>
</div>

<script>
function onPriceChange(args) {
    console.log('Price updated:', args.value);
}
</script>
```

### Example 2: Age Validation

```html
<!-- Age Input with Validation -->
<div style="margin-bottom: 20px;">
    <label for="age">Age:</label>
    <ejs-numerictextbox id="age"
        placeholder="Enter age (0-150)"
        min="0"
        max="150"
        decimals="0"
        strictMode="true"
        showSpinButton="true"
        change="onAgeChange">
    </ejs-numerictextbox>
</div>

<script>
function onAgeChange(args) {
    if (args.value >= 18) {
        console.log('Adult user');
    } else {
        console.log('Minor user');
    }
}
</script>
```

### Example 3: Percentage Input

```html
<!-- Discount Percentage -->
<div style="margin-bottom: 20px;">
    <label for="discount">Discount (%):</label>
    <ejs-numerictextbox id="discount"
        value="0.15"
        format="p2"
        min="0"
        max="1"
        step="0.05"
        strictMode="true">
    </ejs-numerictextbox>
</div>
```

### Example 4: Order Quantity

```html
<!-- Order Quantity -->
<div style="margin-bottom: 20px;">
    <label for="quantity">Quantity:</label>
    <ejs-numerictextbox id="quantity"
        value="1"
        min="1"
        max="999"
        step="1"
        decimals="0"
        strictMode="true"
        showSpinButton="true">
    </ejs-numerictextbox>
</div>
```

### Example 5: Rating Input

```html
<!-- Product Rating (0-5 stars) -->
<div style="margin-bottom: 20px;">
    <label for="rating">Rating (0-5):</label>
    <ejs-numerictextbox id="rating"
        min="0"
        max="5"
        step="0.5"
        decimals="1"
        strictMode="true"
        placeholder="Rate 0-5">
    </ejs-numerictextbox>
</div>
```

---

## Related Topics
- [Getting Started](numeric-textbox-getting-started.md)
- [API Reference](numeric-textbox-api.md)
- [Adornments & Styling](numeric-textbox-adornments-and-styling.md)
