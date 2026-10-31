# OTP Input Configuration & Appearance — ASP.NET Core

This reference covers configuration options for appearance, input types, styling modes, and state management.

## Table of Contents
- [Input Types](#input-types)
- [Styling Modes](#styling-modes)
- [Placeholder Text](#placeholder-text)
- [Separator Character](#separator-character)
- [Disabled State](#disabled-state)
- [CSS Class Customization](#css-class-customization)
- [Examples](#examples)

---

## Input Types

The `Type` property controls what characters are accepted in each OTP field.

### Number (Default)

Accepts only digits. Best for standard numeric OTP codes.

**Razor View (CSHTML):**
```html
<h4>Numeric OTP (Default)</h4>
<ejs-otpinput id="numeric-otp" 
              length="6"
              type="number"
              value="123456">
</ejs-otpinput>
<small>Accepts: 0-9 only</small>
```

### Text

Accepts letters and digits. Use when OTP codes are alphanumeric.

**Razor View (CSHTML):**
```html
<h4>Alphanumeric OTP</h4>
<ejs-otpinput id="text-otp" 
              length="6"
              type="text"
              value="e3c7a2">
</ejs-otpinput>
<small>Accepts: A-Z, a-z, 0-9</small>
```

### Password

Masks entered characters for security. Use in sensitive authentication flows.

**Razor View (CSHTML):**
```html
<h4>Password/Hidden OTP</h4>
<ejs-otpinput id="password-otp" 
              length="6"
              type="password"
              value="123456">
</ejs-otpinput>
<small>Characters are masked (●●●●●●) for security</small>
```

**Decision Guide:**
- User types a numeric PIN → `Type="number"`
- User types an alphanumeric code → `Type="text"`
- Security-sensitive input that should be hidden → `Type="password"`

---

## Styling Modes

The `StylingMode` property controls the visual border/fill style of input fields.

### Outlined (Default)

Full border around each input field.

**Razor View (CSHTML):**
```html
<h4>Outlined Style (Default)</h4>
<ejs-otpinput id="outlined-otp" 
              length="4"
              stylingMode="outlined">
</ejs-otpinput>
```

**Appearance:** Clear borders around each field

### Filled

Input fields have a filled background with no visible border.

**Razor View (CSHTML):**
```html
<h4>Filled Style</h4>
<ejs-otpinput id="filled-otp" 
              length="4"
              stylingMode="filled">
</ejs-otpinput>
```

**Appearance:** Fields have background color, no border

### Underlined

Only a bottom border is shown — matches Material Design style forms.

**Razor View (CSHTML):**
```html
<h4>Underlined Style</h4>
<ejs-otpinput id="underlined-otp" 
              length="4"
              stylingMode="underlined">
</ejs-otpinput>
```

**Appearance:** Minimal design, only bottom border visible

**Decision Guide:**
- Match your form design system
- Outlined: Works universally, most familiar
- Underlined: Material Design aesthetic
- Filled: Modern card-based layouts

---

## Placeholder Text

The `Placeholder` property shows hint characters in each empty input field.

### Single Character Placeholder

All input fields display the same placeholder character:

**Razor View (CSHTML):**
```html
<ejs-otpinput id="placeholder-single" 
              length="4"
              placeholder="x">
</ejs-otpinput>
```

**Display:** x x x x (before user input)

### Per-Field Placeholder

Each input field displays a different character mapped by position:

**Razor View (CSHTML):**
```html
<ejs-otpinput id="placeholder-multi" 
              length="4"
              placeholder="0123">
</ejs-otpinput>
```

**Display:** 0 1 2 3 (before user input)

---

## Separator Character

The `Separator` property adds a character between OTP fields for visual clarity.

**Razor View (CSHTML):**
```html
<!-- No separator (default) -->
<ejs-otpinput id="no-sep" 
              length="6"
              type="number">
</ejs-otpinput>

<!-- Dash separator -->
<ejs-otpinput id="dash-sep" 
              length="6"
              type="number"
              separator="-">
</ejs-otpinput>

<!-- Space separator -->
<ejs-otpinput id="space-sep" 
              length="6"
              type="number"
              separator=" ">
</ejs-otpinput>
```

**Examples:**
- No separator: 123456
- Dash: 123-456
- Space: 123 456

---

## Disabled State

Disable the OTP input to prevent user interaction:

**Razor View (CSHTML):**
```html
<h4>Disabled OTP Input</h4>
<ejs-otpinput id="disabled-otp" 
              length="6"
              type="number"
              value="123456"
              disabled="true">
</ejs-otpinput>
<small>Component is non-interactive and displayed with reduced opacity</small>
```

**Appearance:** Grayed out, no user interaction allowed

---

## CSS Class Customization

Apply CSS classes for validation states and custom styling:

**Razor View (CSHTML):**
```html
<!-- Success state -->
<ejs-otpinput id="success-otp" 
              length="6"
              type="number"
              cssClass="e-success"
              value="123456">
</ejs-otpinput>

<!-- Warning state -->
<ejs-otpinput id="warning-otp" 
              length="6"
              type="number"
              cssClass="e-warning"
              value="">
</ejs-otpinput>

<!-- Error state -->
<ejs-otpinput id="error-otp" 
              length="6"
              type="number"
              cssClass="e-error"
              value="">
</ejs-otpinput>
```

**Predefined CSS Classes:**
- `e-success` → Green borders (valid)
- `e-warning` → Orange borders (caution)
- `e-error` → Red borders (invalid)

**Custom CSS:**

```css
/* wwwroot/css/otp-custom.css */

/* Custom size - compact */
.otp-small .e-otpinput {
  font-size: 14px;
  width: 32px;
  height: 32px;
}

/* Custom size - large */
.otp-large .e-otpinput {
  font-size: 18px;
  width: 50px;
  height: 50px;
}

/* Custom color theme */
.otp-custom .e-otpinput {
  border-color: #6200EE;
  color: #6200EE;
}

.otp-custom .e-otpinput:focus {
  border-color: #3700B3;
  background-color: #F3E5F5;
}
```

**Razor View with Custom CSS:**

```html
<link rel="stylesheet" href="~/css/otp-custom.css" />

<div class="otp-small">
    <ejs-otpinput id="small-otp" length="4" type="number"></ejs-otpinput>
</div>

<div class="otp-large">
    <ejs-otpinput id="large-otp" length="4" type="number"></ejs-otpinput>
</div>

<div class="otp-custom">
    <ejs-otpinput id="custom-otp" length="4" type="number"></ejs-otpinput>
</div>
```

---

## Examples

### Complete OTP Configuration Example

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "OTP Configuration Demo";
}

<div class="container mt-5">
    <h2>OTP Input Configuration Examples</h2>

    <div class="row">
        <!-- Numeric OTP -->
        <div class="col-md-6 mb-4">
            <h5>Numeric OTP (Outlined)</h5>
            <ejs-otpinput id="numeric-demo" 
                          length="6"
                          type="number"
                          stylingMode="outlined"
                          placeholder="0">
            </ejs-otpinput>
        </div>

        <!-- Alphanumeric OTP -->
        <div class="col-md-6 mb-4">
            <h5>Alphanumeric OTP (Filled)</h5>
            <ejs-otpinput id="alpha-demo" 
                          length="6"
                          type="text"
                          stylingMode="filled"
                          placeholder="x">
            </ejs-otpinput>
        </div>
    </div>

    <div class="row">
        <!-- With Separator -->
        <div class="col-md-6 mb-4">
            <h5>With Dash Separator</h5>
            <ejs-otpinput id="sep-demo" 
                          length="6"
                          type="number"
                          separator="-"
                          stylingMode="underlined">
            </ejs-otpinput>
        </div>

        <!-- Password Style -->
        <div class="col-md-6 mb-4">
            <h5>Password/Hidden</h5>
            <ejs-otpinput id="password-demo" 
                          length="6"
                          type="password"
                          stylingMode="outlined">
            </ejs-otpinput>
        </div>
    </div>

    <!-- Disabled State -->
    <div class="row">
        <div class="col-md-6 mb-4">
            <h5>Disabled State</h5>
            <ejs-otpinput id="disabled-demo" 
                          length="4"
                          type="number"
                          value="1234"
                          disabled="true">
            </ejs-otpinput>
        </div>

        <!-- Validation States -->
        <div class="col-md-6 mb-4">
            <h5>Success State</h5>
            <ejs-otpinput id="success-demo" 
                          length="4"
                          type="number"
                          value="1234"
                          cssClass="e-success">
            </ejs-otpinput>
        </div>
    </div>
</div>
```

### Interactive OTP Form

**Razor View (CSHTML):**
```html
<form method="post" class="otp-form">
    <div class="form-group mb-4">
        <label for="otp-input" class="form-label">Verification Code</label>
        
        <ejs-otpinput id="otp-input" 
                      length="6"
                      type="number"
                      placeholder="0"
                      separator="-"
                      autoFocus="true">
        </ejs-otpinput>
        
        <small class="form-text text-muted">
            Enter the 6-digit code sent to your phone
        </small>
    </div>

    <button type="submit" class="btn btn-primary w-100">Verify Code</button>
    
    <button type="button" class="btn btn-link w-100 mt-2" onclick="resendCode()">
        Didn't receive code? Resend
    </button>
</form>

<script>
    function resendCode() {
        const otpComponent = document.getElementById('otp-input').ej2_instances[0];
        // Clear the OTP
        otpComponent.value = '';
        // Focus first field
        otpComponent.focusIn();
        alert('Code resent to your phone');
    }
</script>
```

---

## See Also

- `otp-input-getting-started.md` — Quick start guide
- `otp-input-accessibility.md` — Accessibility features
- `otp-input-api.md` — Complete API reference
- `otp-input-events.md` — Event handling
