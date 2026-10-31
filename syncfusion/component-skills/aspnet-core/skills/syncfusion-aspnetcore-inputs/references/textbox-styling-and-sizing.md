# TextBox Styling and Sizing — ASP.NET Core

This reference covers size classes, CSS styling, appearance modes, and custom themes for TextBox components.

## Table of Contents
- [Size Classes](#size-classes)
- [Filled and Outline Modes](#filled-and-outline-modes)
- [Custom CSS](#custom-css)
- [Disabled and Read-Only States](#disabled-and-read-only-states)
- [Color Variants](#color-variants)
- [Examples](#examples)

---

## Size Classes

Apply predefined size variations using CSS classes.

### Small TextBox

Compact textbox for dense layouts:

**Razor View (CSHTML):**
```html
<ejs-textbox id="small" 
             placeholder="Small textbox"
             cssClass="e-small"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>
```

**Appearance:** Reduced padding and font size

### Normal TextBox (Default)

Standard size for most use cases:

**Razor View (CSHTML):**
```html
<ejs-textbox id="normal" 
             placeholder="Normal textbox"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>
```

### Bigger TextBox

Larger textbox for prominence:

**Razor View (CSHTML):**
```html
<ejs-textbox id="bigger" 
             placeholder="Bigger textbox"
             cssClass="e-bigger"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>
```

**Appearance:** Increased padding and font size (better for mobile or accessibility)

---

## Filled and Outline Modes

### Outline Mode (Default)

Border style with no background fill:

**Razor View (CSHTML):**
```html
<ejs-textbox id="outline" 
             placeholder="Outlined style"
             cssClass="e-outline"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>
```

**Appearance:** Visible border, clean look

### Filled Mode

Light background with subtle border:

**Razor View (CSHTML):**
```html
<ejs-textbox id="filled" 
             placeholder="Filled style"
             cssClass="e-filled"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>
```

**Appearance:** Light background fill, minimal border

### Combining Size and Mode

**Razor View (CSHTML):**
```html
<!-- Small + Filled -->
<ejs-textbox id="small-filled" 
             placeholder="Small filled"
             cssClass="e-small e-filled"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>

<!-- Bigger + Outline -->
<ejs-textbox id="big-outline" 
             placeholder="Bigger outline"
             cssClass="e-bigger e-outline"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>
```

---

## Custom CSS

Create custom styles for specialized appearance.

**CSS (wwwroot/css/custom-textbox.css):**
```css
/* Custom color theme - Purple */
.textbox-purple {
    border-color: #6200EE !important;
    color: #6200EE;
}

.textbox-purple:focus {
    border-color: #3700B3 !important;
    background-color: #F3E5F5;
    box-shadow: 0 0 0 3px rgba(98, 0, 238, 0.1);
}

/* Rounded corners */
.textbox-rounded {
    border-radius: 8px;
    overflow: hidden;
}

.textbox-rounded:focus {
    border-radius: 8px;
}

/* Gradient border effect */
.textbox-gradient {
    position: relative;
    border: 2px solid transparent;
    background-image: 
        linear-gradient(white, white),
        linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
}

/* Large text size */
.textbox-lg {
    font-size: 18px;
    padding: 12px 16px;
}

/* Extra small for compact UI */
.textbox-xs {
    font-size: 12px;
    padding: 4px 8px;
}

/* Underline only style */
.textbox-underline {
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 0;
    padding: 8px 0;
    transition: border-color 0.3s;
}

.textbox-underline:focus {
    border-bottom-color: #2196F3;
    background-color: transparent;
}
```

**Razor View (CSHTML):**
```html
<link rel="stylesheet" href="~/css/custom-textbox.css" />

<ejs-textbox id="custom-purple" 
             placeholder="Custom purple theme"
             cssClass="textbox-purple"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>

<ejs-textbox id="custom-rounded" 
             placeholder="Rounded corners"
             cssClass="textbox-rounded"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>

<ejs-textbox id="custom-gradient" 
             placeholder="Gradient border"
             cssClass="textbox-gradient"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>

<ejs-textbox id="custom-lg" 
             placeholder="Large text"
             cssClass="textbox-lg"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>

<ejs-textbox id="custom-underline" 
             placeholder="Underline style"
             cssClass="textbox-underline"
             floatLabelType="Never"
             type="text">
</ejs-textbox>
```

---

## Disabled and Read-Only States

### Disabled State

Prevent all user interaction:

**Razor View (CSHTML):**
```html
<ejs-textbox id="disabled" 
             placeholder="This is disabled"
             value="Disabled content"
             enabled="false"
             type="text">
</ejs-textbox>
```

**Appearance:** Grayed out, no cursor interaction

### Read-Only State

Allow viewing but prevent editing:

**Razor View (CSHTML):**
```html
<ejs-textbox id="readonly" 
             placeholder="Read-only content"
             value="This content cannot be edited"
             readOnly="true"
             type="text">
</ejs-textbox>
```

**Appearance:** Normal appearance but text cannot be modified

---

## Color Variants

### Success State (Green)

For valid input:

**Razor View (CSHTML):**
```html
<ejs-textbox id="success" 
             placeholder="Valid input"
             value="Valid"
             cssClass="e-success"
             type="text">
</ejs-textbox>
<small class="text-success">✓ Valid</small>
```

### Warning State (Yellow)

For caution or review needed:

**Razor View (CSHTML):**
```html
<ejs-textbox id="warning" 
             placeholder="Warning"
             cssClass="e-warning"
             type="text">
</ejs-textbox>
<small class="text-warning">⚠️ Check this</small>
```

### Error State (Red)

For invalid input:

**Razor View (CSHTML):**
```html
<ejs-textbox id="error" 
             placeholder="Error state"
             cssClass="e-error"
             type="text">
</ejs-textbox>
<small class="text-danger">❌ Required field</small>
```

**CSS:**
```css
.e-error {
    border-color: #dc3545 !important;
}

.e-error:focus {
    border-color: #c82333 !important;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, .25);
}
```

---

## Examples

### Size and Style Showcase

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "TextBox Styling Examples";
}

<div class="container mt-5">
    <h2>TextBox Size and Style Variations</h2>

    <!-- Size Variations -->
    <h4 class="mt-4">Sizes</h4>
    <div class="row">
        <div class="col-md-4 mb-3">
            <label>Small</label>
            <ejs-textbox id="size-small" 
                         placeholder="Small textbox"
                         cssClass="e-small"
                         floatLabelType="Auto"
                         type="text">
            </ejs-textbox>
        </div>

        <div class="col-md-4 mb-3">
            <label>Normal (Default)</label>
            <ejs-textbox id="size-normal" 
                         placeholder="Normal textbox"
                         floatLabelType="Auto"
                         type="text">
            </ejs-textbox>
        </div>

        <div class="col-md-4 mb-3">
            <label>Bigger</label>
            <ejs-textbox id="size-bigger" 
                         placeholder="Bigger textbox"
                         cssClass="e-bigger"
                         floatLabelType="Auto"
                         type="text">
            </ejs-textbox>
        </div>
    </div>

    <!-- Display Modes -->
    <h4 class="mt-4">Display Modes</h4>
    <div class="row">
        <div class="col-md-6 mb-3">
            <label>Outline (Default)</label>
            <ejs-textbox id="mode-outline" 
                         placeholder="Outline mode"
                         cssClass="e-outline"
                         floatLabelType="Auto"
                         type="text">
            </ejs-textbox>
        </div>

        <div class="col-md-6 mb-3">
            <label>Filled</label>
            <ejs-textbox id="mode-filled" 
                         placeholder="Filled mode"
                         cssClass="e-filled"
                         floatLabelType="Auto"
                         type="text">
            </ejs-textbox>
        </div>
    </div>

    <!-- States -->
    <h4 class="mt-4">States</h4>
    <div class="row">
        <div class="col-md-4 mb-3">
            <label>Success</label>
            <ejs-textbox id="state-success" 
                         placeholder="Valid"
                         cssClass="e-success"
                         value="Valid input"
                         type="text">
            </ejs-textbox>
            <small class="text-success">✓ Valid</small>
        </div>

        <div class="col-md-4 mb-3">
            <label>Warning</label>
            <ejs-textbox id="state-warning" 
                         placeholder="Warning"
                         cssClass="e-warning"
                         type="text">
            </ejs-textbox>
            <small class="text-warning">⚠️ Check this</small>
        </div>

        <div class="col-md-4 mb-3">
            <label>Error</label>
            <ejs-textbox id="state-error" 
                         placeholder="Error"
                         cssClass="e-error"
                         type="text">
            </ejs-textbox>
            <small class="text-danger">❌ Error</small>
        </div>
    </div>

    <!-- Special States -->
    <h4 class="mt-4">Special States</h4>
    <div class="row">
        <div class="col-md-6 mb-3">
            <label>Read-Only</label>
            <ejs-textbox id="readonly" 
                         placeholder="Read-only"
                         value="Cannot edit this"
                         readOnly="true"
                         type="text">
            </ejs-textbox>
        </div>

        <div class="col-md-6 mb-3">
            <label>Disabled</label>
            <ejs-textbox id="disabled" 
                         placeholder="Disabled"
                         value="Disabled"
                         enabled="false"
                         type="text">
            </ejs-textbox>
        </div>
    </div>
</div>

<style>
    label {
        font-weight: 600;
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .e-success {
        border-color: #28a745 !important;
    }
    
    .e-warning {
        border-color: #ffc107 !important;
    }
    
    .e-error {
        border-color: #dc3545 !important;
    }
</style>
```

---

## See Also

- `textbox-getting-started.md` — Quick start guide
- `textbox-features-and-groups.md` — Features overview
- `textbox-api.md` — Complete API reference
