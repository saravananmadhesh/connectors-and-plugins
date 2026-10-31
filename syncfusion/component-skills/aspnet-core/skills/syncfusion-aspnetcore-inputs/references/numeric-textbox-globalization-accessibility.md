# Globalization & Accessibility — ASP.NET Core NumericTextBox

This reference covers internationalization (number formats, locales), right-to-left (RTL) support, and accessibility best practices for the Syncfusion NumericTextBox component in ASP.NET Core.

## Table of Contents
- [Number Formatting & Locales](#number-formatting--locales)
- [Currency & Locale-aware Formats](#currency--locale-aware-formats)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Keyboard Interaction](#keyboard-interaction)
- [Accessibility (ARIA & Screen Readers)](#accessibility-aria--screen-readers)
- [Color Contrast & Focus](#color-contrast--focus)
- [Examples](#examples)
- [Edge Cases & Troubleshooting](#edge-cases--troubleshooting)

---

## Number Formatting & Locales

Use the `Format` and `Locale` properties to control number display based on regional settings. Syncfusion automatically applies locale-specific grouping separators and decimal markers.

### Basic Locale Usage

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "Number Formatting";
}

<h4>Locale-Specific Number Display</h4>

<!-- English US: comma as thousands separator, period as decimal -->
<ejs-numerictextbox id="us-number" 
                    value="12345.67" 
                    format="n2"
                    locale="en-US">
</ejs-numerictextbox>

<!-- French: space as thousands separator, comma as decimal -->
<ejs-numerictextbox id="fr-number" 
                    value="12345.67" 
                    format="n2"
                    locale="fr-FR">
</ejs-numerictextbox>

<!-- German: period as thousands separator, comma as decimal -->
<ejs-numerictextbox id="de-number" 
                    value="12345.67" 
                    format="n2"
                    locale="de-DE">
</ejs-numerictextbox>
```

**JavaScript (wwwroot/js/app.js):**
```javascript
// If locale data needs to be loaded dynamically
ej.base.loadCldrData([
  'cldr/main/en-US/numbers.json',
  'cldr/main/fr-FR/numbers.json',
  'cldr/main/de-DE/numbers.json'
]);
```

## Currency & Locale-aware Formats

Combine `Format="c"` (currency) with `Locale` to display currency symbols and formatting in the correct regional style.

### Currency Examples

**Razor View (CSHTML):**
```html
<h4>Currency Display</h4>

<!-- US Dollar: $99.99 -->
<ejs-numerictextbox id="us-currency" 
                    value="99.99" 
                    format="c2"
                    locale="en-US">
</ejs-numerictextbox>

<!-- Euro (Germany): 99,99 € -->
<ejs-numerictextbox id="eur-currency" 
                    value="99.99" 
                    format="c2"
                    locale="de-DE">
</ejs-numerictextbox>

<!-- Indian Rupee: ₹ 99.99 -->
<ejs-numerictextbox id="inr-currency" 
                    value="99.99" 
                    format="c2"
                    locale="en-IN">
</ejs-numerictextbox>

<!-- Japanese Yen: ¥99 -->
<ejs-numerictextbox id="jpy-currency" 
                    value="99" 
                    format="c0"
                    locale="ja-JP">
</ejs-numerictextbox>
```

---

## Right-to-Left (RTL) Support

Enable RTL rendering for languages like Arabic, Hebrew, and Farsi using the `EnableRtl` property.

### Basic RTL Setup

**Razor View (CSHTML):**
```html
<!-- Arabic RTL Example -->
<ejs-numerictextbox id="ar-rtl" 
                    value="20" 
                    enableRtl="true"
                    locale="ar-AE"
                    placeholder="أدخل رقماً">
</ejs-numerictextbox>

<!-- Hebrew RTL Example -->
<ejs-numerictextbox id="he-rtl" 
                    value="20" 
                    enableRtl="true"
                    locale="he-IL"
                    placeholder="הכנס מספר">
</ejs-numerictextbox>
```

### RTL with Prefix/Suffix

When using prefixes or suffixes, RTL automatically adjusts their positioning:

```html
<!-- Currency displayed RTL -->
<ejs-numerictextbox id="rtl-currency" 
                    value="20" 
                    enableRtl="true"
                    format="c2"
                    locale="ar-AE"
                    prefix="ريال "
                    suffix=" سعودي">
</ejs-numerictextbox>
```

### RTL at Layout Level

You can also apply RTL at the document level:

```html
<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RTL Application</title>
</head>
<body>
    <div class="container">
        <ejs-numerictextbox id="default-rtl" 
                            value="20"
                            locale="ar-SA">
        </ejs-numerictextbox>
    </div>
</body>
</html>
```

---

## Keyboard Interaction

The NumericTextBox supports standard keyboard shortcuts for accessibility.

| Key | Behavior |
|-----|----------|
| **Arrow Up** | Increment value by `Step` amount |
| **Arrow Down** | Decrement value by `Step` amount |
| **Tab** | Move focus to next element |
| **Shift + Tab** | Move focus to previous element |
| **Ctrl + A** | Select all text |
| **Delete/Backspace** | Delete selected character(s) |

### Keyboard Event Example

**Razor View (CSHTML):**
```html
<ejs-numerictextbox id="kb-number" 
                    value="10"
                    min="0"
                    max="100"
                    step="5">
</ejs-numerictextbox>

<p id="feedback"></p>
```

**JavaScript (wwwroot/js/app.js):**
```javascript
const numericObj = document.getElementById('kb-number').ej2_instances[0];

numericObj.keyDown = (args) => {
  console.log(`Key pressed: ${args.key}`);
  document.getElementById('feedback').textContent = 
    `Value: ${numericObj.value}`;
};
```

---

## Accessibility (ARIA & Screen Readers)

Provide accessible labels and use ARIA attributes for screen reader support.

### Label and ARIA Attributes

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="price-input" id="price-label">Price (USD)</label>
    <ejs-numerictextbox id="price-input" 
                        value="0"
                        format="c2"
                        min="0"
                        max="10000"
                        htmlAttributes='new Dictionary<string, object> { 
                            { "aria-labelledby", "price-label" },
                            { "aria-describedby", "price-help" },
                            { "aria-required", "true" }
                        }'>
    </ejs-numerictextbox>
    <small id="price-help">Enter a value between $0 and $10,000</small>
</div>
```

### Error States with ARIA

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="quantity">Quantity (Required)</label>
    <ejs-numerictextbox id="quantity" 
                        value="0"
                        min="1"
                        htmlAttributes='new Dictionary<string, object> { 
                            { "aria-invalid", "false" },
                            { "aria-describedby", "quantity-error" }
                        }'>
    </ejs-numerictextbox>
    <div id="quantity-error" role="alert" style="display:none; color: red;">
        Quantity is required and must be at least 1
    </div>
</div>
```

**JavaScript (wwwroot/js/app.js):**
```javascript
const quantityInput = document.getElementById('quantity').ej2_instances[0];
const errorDiv = document.getElementById('quantity-error');
const inputElement = document.getElementById('quantity');

quantityInput.blur = () => {
  if (quantityInput.value == null || quantityInput.value < 1) {
    inputElement.setAttribute('aria-invalid', 'true');
    errorDiv.style.display = 'block';
  } else {
    inputElement.setAttribute('aria-invalid', 'false');
    errorDiv.style.display = 'none';
  }
};
```

---

## Color Contrast & Focus

Ensure sufficient color contrast and visible focus indicators for accessibility compliance.

### CSS for Accessibility

**wwwroot/css/accessibility.css:**
```css
/* Ensure visible focus for keyboard users */
.e-numerictextbox:focus,
.e-numerictextbox.e-focus {
  outline: 3px solid #2196F3;
  outline-offset: 2px;
}

/* High contrast for text */
.e-numerictextbox {
  background-color: #FFFFFF;
  color: #000000;
  /* Contrast ratio: 21:1 */
}

/* Error state with high contrast */
.e-numerictextbox.e-error {
  border-color: #D32F2F;
  background-color: #FFEBEE;
  color: #C62828;
}

/* Warning state */
.e-numerictextbox.e-warning {
  border-color: #F57F17;
  background-color: #FFF3E0;
}

/* Success state */
.e-numerictextbox.e-success {
  border-color: #388E3C;
  background-color: #E8F5E9;
  color: #1B5E20;
}
```

---

## Examples

### Complete Globalization Example

**Controller (Models/NumberFormattingViewModel.cs):**
```csharp
using System;

namespace AspNetCoreApp.Models
{
    public class NumberFormattingViewModel
    {
        public decimal USPrice { get; set; } = 1234.56m;
        public decimal EuroPrice { get; set; } = 1234.56m;
        public decimal JapanesePrice { get; set; } = 1234m;
    }
}
```

**Razor View (Views/Home/Formatting.cshtml):**
```html
@{
    ViewBag.Title = "Number Formatting & Localization";
}

<div class="container mt-4">
    <h2>Global Number Formatting</h2>

    <div class="row">
        <div class="col-md-6">
            <h4>US Format (en-US)</h4>
            <label>Price in Dollars</label>
            <ejs-numerictextbox id="us-price" 
                                value="1234.56" 
                                format="c2"
                                locale="en-US"
                                readonly="true">
            </ejs-numerictextbox>
            <small>Display: $1,234.56</small>
        </div>

        <div class="col-md-6">
            <h4>French Format (fr-FR)</h4>
            <label>Price in Euros</label>
            <ejs-numerictextbox id="fr-price" 
                                value="1234.56" 
                                format="c2"
                                locale="fr-FR"
                                readonly="true">
            </ejs-numerictextbox>
            <small>Display: 1 234,56 €</small>
        </div>
    </div>

    <hr />

    <h4>RTL Example (Arabic)</h4>
    <ejs-numerictextbox id="ar-price" 
                        value="1000" 
                        enableRtl="true"
                        locale="ar-AE"
                        format="c2"
                        min="0"
                        max="10000">
    </ejs-numerictextbox>
</div>
```

---

## Edge Cases & Troubleshooting

### Decimal Mismatch with Locale

**Problem:** User has a German keyboard (comma decimal separator) but the locale is en-US (period decimal separator).

**Solution:** Ensure locale matches the user's regional settings or provide explicit guidance in the UI.

```html
<ejs-numerictextbox id="amount" 
                    value="0"
                    format="n2"
                    locale="de-DE"
                    placeholder="Use comma (,) as decimal separator">
</ejs-numerictextbox>
<small>Your region requires a comma (,) for decimals</small>
```

### Formatting vs Raw Value

**Problem:** The displayed formatted value differs from the raw numeric value in code.

**Solution:** Always use the numeric `value` property for calculations, not the formatted display string.

```javascript
const numeric = document.getElementById('price').ej2_instances[0];

// Raw value for calculations
console.log(numeric.value); // 1234.56

// Formatted display (for UI only)
console.log(numeric.element.value); // "$1,234.56" or "1 234,56 €" depending on locale
```

### CSS Theme Overrides Breaking Focus

**Problem:** Custom CSS accidentally hides the focus outline.

**Solution:** Ensure focus styles are preserved:

```css
/* ✗ Don't do this - removes focus visibility */
.e-numerictextbox {
  outline: none;
}

/* ✓ Do this instead - keeps focus visible */
.e-numerictextbox:focus {
  outline: 3px solid #2196F3;
  outline-offset: 2px;
}
```

---

## See Also

- `numeric-textbox-api.md` — Complete API reference
- `numeric-textbox-formats-and-validation.md` — Format patterns and validation
- `numeric-textbox-getting-started.md` — Quick start guide
