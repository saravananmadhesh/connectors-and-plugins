# TextBox Accessibility and Migration — ASP.NET Core

This reference covers WCAG 2.2 compliance, accessibility best practices, migration from HTML inputs, and screen reader support.

## Table of Contents
- [Accessibility Overview](#accessibility-overview)
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Color Contrast](#color-contrast)
- [Migrating from HTML Inputs](#migrating-from-html-inputs)
- [Examples](#examples)

---

## Accessibility Overview

Accessibility ensures TextBox components are usable by everyone, including users with disabilities.

**Key Principles:**
- Perceivable — Content is visible and understandable
- Operable — Can be used with keyboard and assistive devices
- Understandable — Clear labels and error messages
- Robust — Works with assistive technologies

---

## WCAG 2.2 Compliance

### Level A - Basic Compliance

**Minimal Requirements:**
- Proper label associations
- Keyboard accessibility
- Basic color contrast (4.5:1 for text)

### Level AA - Recommended Compliance

**Industry Standard:**
- Enhanced contrast (4.5:1 for normal text, 3:1 for large text)
- Clear focus indicators
- Meaningful error messages
- Form validation feedback

### Level AAA - Enhanced Compliance

**Highest Standard:**
- Enhanced color contrast (7:1 for normal, 4.5:1 for large)
- Extended keyboard support
- Multiple ways to find content
- Sign language for audio content

---

## ARIA Attributes

### Label Association

Always associate TextBox with a label:

**Razor View (CSHTML):**
```html
<!-- Method 1: Using asp-for binding -->
<label asp-for="Email" class="form-label">Email Address</label>
<ejs-textbox asp-for="Email" 
             placeholder="your@email.com"
             type="email">
</ejs-textbox>

<!-- Method 2: Using aria-label -->
<ejs-textbox id="search" 
             aria-label="Search products"
             placeholder="Search..."
             type="text">
</ejs-textbox>

<!-- Method 3: Using aria-labelledby -->
<span id="email-label">Email Address</span>
<ejs-textbox id="email" 
             aria-labelledby="email-label"
             placeholder="your@email.com"
             type="email">
</ejs-textbox>
```

### Description with aria-describedby

Provide additional context for complex inputs:

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="password" class="form-label">Password</label>
    <ejs-textbox id="password" 
                 aria-describedby="password-hint"
                 placeholder="Password"
                 type="password">
    </ejs-textbox>
    <small id="password-hint" class="form-text text-muted">
        Minimum 8 characters. Include uppercase, lowercase, number, and special character.
    </small>
</div>
```

### Required Field Indication

Mark required fields properly:

**Razor View (CSHTML):**
```html
<label for="name" class="form-label">
    Name <span aria-label="required">*</span>
</label>
<ejs-textbox id="name" 
             aria-required="true"
             placeholder="Full Name"
             type="text">
</ejs-textbox>
```

### Error Messages with aria-live

Announce validation errors to screen readers:

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="email" class="form-label">Email</label>
    <ejs-textbox id="email" 
                 aria-describedby="email-error"
                 placeholder="Email"
                 change="validateEmail"
                 type="email">
    </ejs-textbox>
    <div id="email-error" aria-live="polite" role="alert" class="text-danger mt-2"></div>
</div>

<script>
    function validateEmail(args) {
        const errorDiv = document.getElementById('email-error');
        const email = args.value || '';
        
        if (!email) {
            errorDiv.textContent = '';
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorDiv.textContent = 'Please enter a valid email address.';
        } else {
            errorDiv.textContent = '';
        }
    }
</script>
```

---

## Keyboard Navigation

### Focus Management

TextBox should receive focus with Tab key and be focusable:

**Razor View (CSHTML):**
```html
<!-- Default: Tab focus order -->
<form>
    <ejs-textbox id="first" placeholder="First field" type="text"></ejs-textbox>
    <ejs-textbox id="second" placeholder="Second field" type="text"></ejs-textbox>
    <ejs-textbox id="third" placeholder="Third field" type="text"></ejs-textbox>
</form>

<!-- Custom tab order if needed (not recommended) -->
<ejs-textbox id="priority" 
             placeholder="Priority field"
             tabindex="1"
             type="text">
</ejs-textbox>
```

### Keyboard Shortcuts

Support common keyboard shortcuts:

**Razor View (CSHTML):**
```html
<ejs-textbox id="search" 
             placeholder="Press / to search"
             keydown="handleKeyboardShortcut"
             type="text">
</ejs-textbox>

<script>
    function handleKeyboardShortcut(args) {
        // Ctrl+Enter to submit
        if (args.ctrlKey && args.key === 'Enter') {
            console.log('Submitting:', args.value);
            // Submit form
        }
        
        // Escape to clear
        if (args.key === 'Escape') {
            args.value = '';
        }
    }
</script>
```

### Visible Focus Indicator

Ensure focus is clearly visible:

**CSS (wwwroot/css/accessibility.css):**
```css
/* High contrast focus indicator */
ejs-textbox:focus,
ejs-textbox:focus-visible {
    outline: 3px solid #4A90E2;
    outline-offset: 2px;
    border-color: #2E5C8A;
}

/* Focus indicator for textbox input -->
.e-input:focus {
    border: 2px solid #4A90E2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.25);
}
```

---

## Screen Reader Support

### Providing Context

Make form sections understandable to screen readers:

**Razor View (CSHTML):**
```html
<fieldset>
    <legend>Personal Information</legend>
    
    <div class="form-group">
        <label for="firstName">First Name</label>
        <ejs-textbox id="firstName" type="text"></ejs-textbox>
    </div>
    
    <div class="form-group">
        <label for="lastName">Last Name</label>
        <ejs-textbox id="lastName" type="text"></ejs-textbox>
    </div>
</fieldset>

<fieldset>
    <legend>Contact Information</legend>
    
    <div class="form-group">
        <label for="email">Email</label>
        <ejs-textbox id="email" type="email"></ejs-textbox>
    </div>
</fieldset>
```

### Help Text for Complex Fields

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="creditCard">Credit Card Number</label>
    <ejs-textbox id="creditCard" 
                 aria-describedby="cc-help"
                 placeholder="1234 5678 9012 3456"
                 type="text">
    </ejs-textbox>
    <p id="cc-help" class="form-text">
        Enter 16-digit card number without spaces or dashes.
        Visa, Mastercard, and American Express accepted.
    </p>
</div>
```

---

## Color Contrast

### Text Contrast Requirements

**WCAG AA Standard:** 4.5:1 for normal text

**Razor View (CSHTML):**
```html
<!-- Good contrast: Dark text on light background -->
<ejs-textbox id="good" 
             placeholder="Good contrast"
             cssClass="high-contrast"
             type="text">
</ejs-textbox>

<!-- Avoid: Light text on light background -->
<!-- ❌ DON'T DO THIS -->
<!-- <ejs-textbox placeholder="Bad contrast" style="color: #ccc; background: #fff;"></ejs-textbox> -->
```

**CSS:**
```css
.high-contrast {
    color: #333333;  /* Dark text */
    background-color: #FFFFFF;  /* Light background */
    border: 2px solid #000000;  /* High contrast border */
}

.high-contrast::placeholder {
    color: #666666;  /* Visible placeholder text */
    opacity: 1;
}

.high-contrast:focus {
    border-color: #0066CC;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.25);
}
```

---

## Migrating from HTML Inputs

### Before: HTML Input

**HTML:**
```html
<!-- Basic HTML input -->
<input type="text" id="name" placeholder="Name">

<!-- HTML input with validation -->
<input type="email" id="email" required>
```

### After: Syncfusion TextBox

**ASP.NET Core (CSHTML):**
```html
<!-- Syncfusion TextBox with accessibility -->
<label for="name" class="form-label">Name</label>
<ejs-textbox id="name" 
             placeholder="Full Name"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>

<!-- Syncfusion TextBox with email validation -->
<label for="email" class="form-label">Email</label>
<ejs-textbox id="email" 
             placeholder="your@email.com"
             floatLabelType="Auto"
             type="email">
</ejs-textbox>
```

### Migration Benefits

- **Better UX:** Floating labels, icons, animations
- **Accessibility:** Built-in ARIA support
- **Validation:** Client + server-side validation
- **Consistency:** Matches modern design patterns
- **Responsive:** Mobile-friendly out-of-the-box

---

## Examples

### Accessible Login Form

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "Login";
}

<div class="container mt-5">
    <div class="card" style="max-width: 400px; margin: 0 auto;">
        <div class="card-body">
            <h1 class="card-title">Sign In</h1>

            <form asp-action="Login" method="post" novalidate>
                <fieldset>
                    <legend class="visually-hidden">Login Credentials</legend>

                    <!-- Username -->
                    <div class="form-group mb-3">
                        <label for="username" class="form-label">Username</label>
                        <ejs-textbox id="username" 
                                     placeholder="Enter username"
                                     aria-required="true"
                                     type="text">
                        </ejs-textbox>
                    </div>

                    <!-- Password -->
                    <div class="form-group mb-4">
                        <label for="password" class="form-label">Password</label>
                        <ejs-textbox id="password" 
                                     placeholder="Enter password"
                                     aria-describedby="password-hint"
                                     aria-required="true"
                                     type="password">
                        </ejs-textbox>
                        <p id="password-hint" class="form-text text-muted">
                            Your password is encrypted for security.
                        </p>
                    </div>
                </fieldset>

                <button type="submit" class="btn btn-primary w-100">
                    Sign In
                </button>

                <div class="text-center mt-3">
                    <a href="/forgot-password" class="text-decoration-none">
                        Forgot password?
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

    .form-label {
        font-weight: 600;
        color: #333;
        margin-bottom: 0.5rem;
    }

    ejs-textbox:focus,
    ejs-textbox:focus-visible {
        outline: 3px solid #4A90E2;
    }
</style>
```

### Accessible Survey Form

**Razor View (CSHTML):**
```html
@model SurveyModel

<div class="container mt-5">
    <form asp-action="SubmitSurvey" method="post" novalidate>
        <h1>Customer Satisfaction Survey</h1>

        <fieldset>
            <legend>Your Information</legend>

            <div class="form-group mb-3">
                <label for="name" class="form-label">
                    Name <span aria-label="required">*</span>
                </label>
                <ejs-textbox asp-for="Name" 
                             aria-required="true"
                             floatLabelType="Auto"
                             type="text">
                </ejs-textbox>
                <span asp-validation-for="Name" role="alert" class="text-danger"></span>
            </div>

            <div class="form-group mb-3">
                <label for="email" class="form-label">
                    Email <span aria-label="required">*</span>
                </label>
                <ejs-textbox asp-for="Email" 
                             aria-required="true"
                             floatLabelType="Auto"
                             type="email">
                </ejs-textbox>
                <span asp-validation-for="Email" role="alert" class="text-danger"></span>
            </div>
        </fieldset>

        <fieldset>
            <legend>Your Feedback</legend>

            <div class="form-group mb-3">
                <label for="comments" class="form-label">Comments</label>
                <ejs-textarea asp-for="Comments" 
                              aria-describedby="comment-hint"
                              placeholder="Please share your feedback"
                              rows="5"
                              floatLabelType="Auto">
                </ejs-textarea>
                <p id="comment-hint" class="form-text text-muted">
                    Please be specific about your experience.
                </p>
            </div>
        </fieldset>

        <button type="submit" class="btn btn-primary">
            Submit Survey
        </button>
    </form>
</div>
```

---

## Accessibility Testing Checklist

- ✅ All inputs have associated labels
- ✅ Focus indicators are clearly visible
- ✅ Color contrast meets WCAG AA standard
- ✅ Error messages are descriptive
- ✅ Form can be completed with keyboard only
- ✅ Form sections use fieldset/legend
- ✅ aria-required for required fields
- ✅ aria-describedby for help text
- ✅ aria-live for dynamic error messages
- ✅ Tested with screen reader (NVDA, JAWS, VoiceOver)

---

## See Also

- `textbox-getting-started.md` — Quick start guide
- `textbox-features-and-groups.md` — Features overview
- `textbox-validation-and-states.md` — Validation patterns
- `textbox-api.md` — Complete API reference
