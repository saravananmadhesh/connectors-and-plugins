# TextArea Accessibility — ASP.NET Core

This reference covers WCAG 2.2 compliance, screen reader support, keyboard navigation, and high-contrast modes.

## Table of Contents
- [Overview](#overview)
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [Screen Reader Support](#screen-reader-support)
- [Keyboard Navigation](#keyboard-navigation)
- [High Contrast Modes](#high-contrast-modes)
- [ARIA Attributes](#aria-attributes)
- [Examples](#examples)

---

## Overview

Accessible TextArea components ensure all users, including those with disabilities, can interact with forms effectively.

**Key Principles:**
- Perceivable: Readable labels and clear instructions
- Operable: Keyboard navigable and accessible
- Understandable: Clear language and error messages
- Robust: Compatible with assistive technologies

---

## WCAG 2.2 Compliance

### Level A Compliance

**Perceivable — Text Alternatives:**
- All TextAreas must have associated labels
- Error messages must be clearly labeled

**Operable — Keyboard Accessible:**
- Must be accessible via Tab key
- Must not trap keyboard focus

**Understandable — Readable:**
- Language must be clear and concise
- Instructions must be explicit

**Robust — Compatible:**
- Must work with screen readers
- Must use valid HTML

### Level AA Compliance (Recommended)

**Color Contrast:**
- Text contrast ratio of at least 4.5:1 for normal text
- 3:1 for large text (18pt+)

**Visual Indicators:**
- Focus states must be visible
- Error states must be distinguishable beyond color

**Label Association:**
- Labels must be programmatically associated with inputs

---

## Screen Reader Support

### Proper Label Association

**Razor View (CSHTML):**
```html
<label for="feedback">Your Feedback</label>
<ejs-textarea id="feedback" 
              placeholder="Share your thoughts"
              rows="5">
</ejs-textarea>
```

**Why:** Screen readers announce "Your Feedback, edit text" when focused

### Using `aria-label`

When a visible label isn't available:

**Razor View (CSHTML):**
```html
<ejs-textarea id="search-description" 
              placeholder="Search">
</ejs-textarea>
```

### Using `aria-labelledby`

Connect to a heading or other element:

**Razor View (CSHTML):**
```html
<h2 id="form-title">Contact Form</h2>

<ejs-textarea id="message" 
              placeholder="Your message"
              rows="5">
</ejs-textarea>
```

### Required Field Indication

**Razor View (CSHTML):**
```html
<label for="required-field">
    Feedback
    <span aria-label="required">*</span>
</label>

<ejs-textarea id="required-field" 
              placeholder="Please provide feedback"
              rows="4">
</ejs-textarea>
```

### Validation Error Announcements

**Razor View (CSHTML):**
```html
<label for="email-content">Email Content</label>
<ejs-textarea id="email-content" 
              rows="5">
</ejs-textarea>

<span id="email-error" role="alert" class="text-danger" 
      style="display: none;">
    Email content is required and must be at least 10 characters
</span>
```

---

## Keyboard Navigation

### Tab Navigation

Users should be able to navigate to TextArea using Tab:

**Razor View (CSHTML):**
```html
<input type="text" placeholder="Field 1" />
<ejs-textarea id="textarea" placeholder="Field 2 - Tab here"></ejs-textarea>
<button>Submit</button>
<!-- Tab order: Input → TextArea → Button -->
```

### Focus Management

Ensure focus is visible:

**CSS:**
```css
/* Ensure focus is visible */
ej2-textarea:focus-within {
    outline: 3px solid #4A90E2;
    outline-offset: 2px;
}

/* High contrast mode */
@media (prefers-contrast: more) {
    ej2-textarea:focus-within {
        outline-width: 4px;
        outline-color: #000;
    }
}
```

### Keyboard Interactions

| Key | Action |
|-----|--------|
| Tab | Move to textarea |
| Shift+Tab | Move back from textarea |
| Enter | New line (within textarea) |
| Ctrl+A | Select all text |
| Ctrl+C | Copy |
| Ctrl+V | Paste |
| Ctrl+Z | Undo |
| Ctrl+Y | Redo |

---

## High Contrast Modes

### Supporting System Preferences

**CSS:**
```css
/* Respect user's color preferences */
@media (prefers-contrast: more) {
    ej2-textarea {
        border-width: 2px;
        border-color: #000;
    }
    
    ej2-textarea:focus {
        outline: 3px solid #000;
    }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
    ej2-textarea {
        transition: none;
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    ej2-textarea {
        background-color: #1e1e1e;
        color: #e0e0e0;
        border-color: #404040;
    }
}
```

### Explicit High Contrast Class

**Razor View (CSHTML):**
```html
<ejs-textarea id="textarea" 
              cssClass="high-contrast"
              placeholder="High contrast mode"
              rows="4">
</ejs-textarea>

<style>
    .high-contrast {
        border: 3px solid #000 !important;
        background-color: #fff !important;
        color: #000 !important;
        font-size: 16px;
    }
</style>
```

---

## ARIA Attributes

### Common ARIA Attributes

**Razor View (CSHTML):**
```html
<!-- aria-label: Provide accessible name -->
<ejs-textarea aria-label="Product feedback"></ejs-textarea>

<!-- aria-describedby: Link to description element -->
<ejs-textarea aria-describedby="feedback-hint"></ejs-textarea>
<span id="feedback-hint">Describe your experience</span>

<!-- aria-invalid: Mark as invalid -->
<ejs-textarea aria-invalid="true"></ejs-textarea>

<!-- aria-live: Announce dynamic changes -->
<ejs-textarea aria-live="polite"></ejs-textarea>
```

---

## Examples

### Fully Accessible Form

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "Accessible Feedback Form";
}

<div class="container mt-5">
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">Customer Feedback Form</h1>
            
            <p class="text-muted mb-4">
                All fields marked with <span aria-label="required">*</span> are required.
            </p>

            <form asp-action="SubmitFeedback" method="post" novalidate>
                <!-- Name -->
                <div class="form-group mb-3">
                    <label for="name" class="form-label">
                        Name
                        <span aria-label="required">*</span>
                    </label>
                    <input type="text" id="name" name="name" 
                           class="form-control"
                           required/>
                    <small id="name-help" class="form-text text-muted">
                        Enter your full name
                    </small>
                </div>

                <!-- Email -->
                <div class="form-group mb-3">
                    <label for="email" class="form-label">
                        Email
                        <span aria-label="required">*</span>
                    </label>
                    <input type="email" id="email" name="email" 
                           class="form-control"
                           required/>
                    <small id="email-help" class="form-text text-muted">
                        We'll never share your email
                    </small>
                </div>

                <!-- Subject -->
                <div class="form-group mb-3">
                    <label for="subject" class="form-label">
                        Feedback Subject
                        <span aria-label="required">*</span>
                    </label>
                    <ejs-textarea id="subject" 
                                  name="subject"
                                  class="form-control"
                                  aria-describedby="subject-help"
                                  placeholder="Briefly describe your feedback"
                                  rows="2"
                                  maxLength="100">
                    </ejs-textarea>
                    <small id="subject-help" class="form-text text-muted">
                        Max 100 characters
                    </small>
                </div>

                <!-- Detailed Feedback -->
                <div class="form-group mb-3">
                    <label for="feedback" class="form-label">
                        Detailed Feedback
                        <span aria-label="required">*</span>
                    </label>
                    <ejs-textarea id="feedback" 
                                  name="feedback"
                                  class="form-control"
                                  placeholder="Please share your detailed feedback"
                                  rows="5"
                                  maxLength="1000">
                    </ejs-textarea>
                    <small id="feedback-help" class="form-text text-muted">
                        Max 1000 characters
                    </small>
                </div>

                <!-- Validation Summary -->
                <div asp-validation-summary="All" 
                     class="alert alert-danger"
                     role="alert">
                </div>

                <!-- Submit -->
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary btn-lg">
                        Submit Feedback
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    /* Ensure focus is visible */
    ej2-textarea:focus-within,
    input:focus {
        outline: 3px solid #4A90E2;
        outline-offset: 2px;
    }

    /* High contrast mode */
    @media (prefers-contrast: more) {
        ej2-textarea:focus-within,
        input:focus {
            outline-width: 4px;
            outline-color: #000;
        }
        
        .form-control {
            border-width: 2px;
        }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation: none !important;
            transition: none !important;
        }
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
        .card {
            background-color: #1e1e1e;
            color: #e0e0e0;
            border-color: #404040;
        }
    }
</style>
```

### Dynamic Error Announcement

**Razor View (CSHTML):**
```html
<form id="accessibleForm">
    <div class="form-group mb-3">
        <label for="message">Message</label>
        <ejs-textarea id="message" 
                      placeholder="Your message"
                      rows="4">
        </ejs-textarea>
        <div id="message-error" role="alert" 
             style="display: none;" 
             class="alert alert-danger mt-2">
        </div>
    </div>

    <button type="submit" class="btn btn-primary">Send</button>
</form>

<script>
    const form = document.getElementById('accessibleForm');
    const textarea = document.getElementById('message').ej2_instances[0];
    const errorDiv = document.getElementById('message-error');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const value = textarea.value;
        
        if (!value || value.trim() === '') {
            textarea.element.setAttribute('aria-invalid', 'true');
            errorDiv.textContent = 'Message is required';
            errorDiv.style.display = 'block';
            textarea.focusIn();
        } else if (value.length < 10) {
            textarea.element.setAttribute('aria-invalid', 'true');
            errorDiv.textContent = 'Message must be at least 10 characters';
            errorDiv.style.display = 'block';
            textarea.focusIn();
        } else {
            textarea.element.setAttribute('aria-invalid', 'false');
            errorDiv.style.display = 'none';
            form.submit();
        }
    });
</script>
```

---

## See Also

- `textarea-getting-started.md` — Quick start guide
- `textarea-form-support.md` — Form integration
- `textarea-floating-label.md` — Label best practices
- WCAG 2.2: https://www.w3.org/WAI/WCAG22/quickref/
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
