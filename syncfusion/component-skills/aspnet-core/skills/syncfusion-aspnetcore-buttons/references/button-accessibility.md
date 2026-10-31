# Accessibility – ASP.NET Core Button

Comprehensive guide for implementing accessible Syncfusion buttons compliant with WCAG 2.2 and Section 508.

---

## Compliance Standards

The Syncfusion Button component supports:
- **WCAG 2.2 Level AA** compliance
- **Section 508** (U.S. Rehabilitation Act)
- **WAI-ARIA 1.2** specifications

---

## Semantic HTML

Always use proper HTML button elements. Avoid using divs or spans styled as buttons:

**✓ CORRECT:**
```cshtml
<ejs-button id="saveBtn" content="Save"></ejs-button>
```

**✗ INCORRECT:**
```cshtml
<div id="fakeBtn" class="e-btn" onclick="save()">Save</div>
```

---

## Button Text and Labels

### Descriptive Button Text

Use clear, action-oriented button text. Avoid generic labels like "Click here" or "Submit":

**✓ CORRECT:**
```cshtml
<ejs-button id="submitBtn" content="Submit Form"></ejs-button>
<ejs-button id="deleteBtn" cssClass="e-danger" content="Delete User Account"></ejs-button>
<ejs-button id="continueBtn" content="Continue to Payment"></ejs-button>
```

**✗ INCORRECT:**
```cshtml
<ejs-button id="btn1" content="Click Here"></ejs-button>
<ejs-button id="btn2" content="OK"></ejs-button>
<ejs-button id="btn3" content="Go"></ejs-button>
```

### Icon-Only Buttons

Always provide text labels for icon-only buttons via `aria-label`:

**✓ CORRECT:**
```cshtml
<ejs-button 
    id="addBtn" 
    cssClass="e-round e-small" 
    iconCss="e-icons e-plus-icon"
    htmlAttributes="@new { aria_label = 'Add new item' }">
</ejs-button>
```

**✗ INCORRECT:**
```cshtml
<!-- No label or aria-label -->
<ejs-button id="addBtn" cssClass="e-round" iconCss="e-icons e-plus-icon"></ejs-button>
```

---

## WAI-ARIA Attributes

### aria-label

For icon-only or when button text doesn't fully convey the action:

```cshtml
<ejs-button 
    id="closeBtn" 
    cssClass="e-small" 
    iconCss="e-icons e-close-icon"
    htmlAttributes="@new { aria_label = 'Close dialog' }">
</ejs-button>
```

### aria-disabled

When disabling a button, ensure screen readers understand it's disabled:

```cshtml
<ejs-button 
    id="submitBtn" 
    disabled="true"
    htmlAttributes="@new { aria_disabled = 'true' }"
    content="Submit">
</ejs-button>
```

**Note:** Syncfusion sets `aria-disabled` automatically when `disabled="true"`.

### aria-pressed (Toggle Buttons)

For toggle buttons, indicate the current state:

```cshtml
<ejs-button 
    id="toggleBtn" 
    isToggle="true" 
    cssClass="e-flat"
    htmlAttributes="@new { aria_pressed = 'false' }"
    content="Toggle Feature">
</ejs-button>

<script>
    const toggleBtn = ej2_instances['toggleBtn'][0];
    toggleBtn.addEventListener('click', function() {
        const isPressed = toggleBtn.element.getAttribute('aria-pressed') === 'true';
        toggleBtn.element.setAttribute('aria-pressed', !isPressed);
    });
</script>
```

---

## Keyboard Navigation

### Tab Order

Buttons should appear in a logical tab order. Use HTML structure or `tabindex` if needed:

```cshtml
<!-- Natural tab order (left-to-right, top-to-bottom) -->
<form method="post">
    <div>
        <input type="text" id="username" />
    </div>
    <div>
        <ejs-button id="submitBtn" type="submit" content="Submit"></ejs-button>
        <ejs-button id="cancelBtn" tabindex="0" content="Cancel"></ejs-button>
    </div>
</form>
```

### Keyboard Support

Syncfusion buttons support:
- **Enter key** — Activates the button
- **Space key** — Activates the button
- **Tab key** — Navigates to the button
- **Shift+Tab** — Navigates backward

**Example:**
```cshtml
<ejs-button id="actionBtn" onclick="performAction()" content="Perform Action"></ejs-button>

<script>
    const actionBtn = ej2_instances['actionBtn'][0];
    
    // Keyboard support is automatic
    // Press Tab to focus, then Enter or Space to activate
</script>
```

---

## Focus Management

### Visual Focus Indicator

Ensure buttons have visible focus indicators:

**CSS:**
```css
.e-btn:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
}
```

### Focus Events

Manage focus for complex interactions:

```cshtml
<ejs-button id="focusBtn" onfocus="handleFocus()" onblur="handleBlur()" content="Focus Me">
</ejs-button>

<script>
    function handleFocus() {
        console.log('Button has focus');
        // Show additional information
    }

    function handleBlur() {
        console.log('Button lost focus');
        // Clean up
    }
</script>
```

---

## Color Contrast

Syncfusion buttons meet WCAG AA contrast ratios. However, verify custom styling:

**✓ CORRECT (WCAG AA):**
- Text on button: 4.5:1 contrast ratio minimum

**✗ INCORRECT:**
```css
.custom-btn {
    background-color: #cccccc; /* Light gray */
    color: #bbbbbb; /* Lighter gray — insufficient contrast */
}
```

**✓ CORRECT:**
```css
.custom-btn {
    background-color: #0066cc; /* Dark blue */
    color: #ffffff; /* White — 8.59:1 contrast */
}
```

---

## Form Context

### Submit Buttons

Always use `type="submit"` for form submission:

```cshtml
<form method="post" id="myForm">
    <input type="text" name="username" />
    <ejs-button id="submitBtn" type="submit" content="Submit"></ejs-button>
</form>
```

### Reset Buttons

Use `type="reset"` to clear form fields:

```cshtml
<ejs-button id="resetBtn" type="reset" content="Reset Form"></ejs-button>
```

### Button Role

Syncfusion buttons automatically set `role="button"`:

```html
<!-- Rendered HTML -->
<button role="button" id="submitBtn" class="e-btn e-primary">Submit</button>
```

---

## Error States and Validation

### Error Communication

For buttons that trigger validation, communicate errors to screen readers:

```cshtml
<div id="errorAlert" role="alert" aria-live="polite" style="display:none;">
    Please fill in all required fields.
</div>

<form>
    <input id="emailInput" type="email" required />
    <ejs-button id="submitBtn" type="submit" onclick="validateForm()" content="Submit"></ejs-button>
</form>

<script>
    function validateForm() {
        const email = document.getElementById('emailInput').value;
        const errorAlert = document.getElementById('errorAlert');
        
        if (!email) {
            errorAlert.style.display = 'block';
            errorAlert.textContent = 'Email is required.';
        }
    }
</script>
```

---

## Disabled Buttons

**✓ CORRECT:**
```cshtml
<ejs-button id="submitBtn" disabled="@(!Model.IsFormValid)" content="Submit"></ejs-button>
```

Disabled buttons:
- Cannot receive focus via Tab
- Are skipped in tab order
- Show visual indication (grayed out)
- Have `aria-disabled="true"` automatically set

---

## Icon Button Best Practices

### Icon + Text (Recommended)

```cshtml
<ejs-button id="saveBtn" iconCss="e-icons e-save-icon" content="Save"></ejs-button>
```

Screen readers announce: "Save, button"

### Icon-Only with aria-label

```cshtml
<ejs-button 
    id="saveBtn" 
    cssClass="e-small" 
    iconCss="e-icons e-save-icon"
    htmlAttributes="@new { aria_label = 'Save changes' }">
</ejs-button>
```

Screen readers announce: "Save changes, button"

---

## Testing for Accessibility

### Screen Reader Testing

Use NVDA (Windows) or VoiceOver (Mac) to test:

1. Tab through buttons
2. Verify button text is announced
3. Confirm disabled state is announced
4. Check icon-only buttons have `aria-label`

### Keyboard Testing

1. Tab to each button
2. Press Enter/Space to activate
3. Verify focus indicators are visible
4. Test form submission with keyboard only

### Contrast Testing

Use tools like:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)

---

## Complete Accessible Example

```cshtml
@{
    ViewData["Title"] = "Accessible Button Form";
}

<main>
    <h1>User Registration</h1>
    
    <form method="post" id="registrationForm" novalidate>
        <fieldset>
            <legend>Enter Your Details</legend>
            
            <div class="form-group">
                <label for="username">Username <span aria-label="required">*</span></label>
                <input 
                    id="username" 
                    type="text" 
                    name="username" 
                    required 
                    aria-required="true"
                    aria-describedby="usernameHelp" />
                <small id="usernameHelp">Username must be 6+ characters</small>
            </div>

            <div class="form-group">
                <label for="email">Email <span aria-label="required">*</span></label>
                <input 
                    id="email" 
                    type="email" 
                    name="email" 
                    required 
                    aria-required="true" />
            </div>

            <div id="formAlert" role="alert" aria-live="polite" style="display:none;">
                Please fix the errors above.
            </div>

            <div class="button-group">
                <ejs-button 
                    id="submitBtn" 
                    type="submit" 
                    cssClass="e-primary"
                    htmlAttributes="@new { aria_label = 'Submit registration form' }"
                    content="Register">
                </ejs-button>
                
                <ejs-button 
                    id="resetBtn" 
                    type="reset" 
                    cssClass="e-flat"
                    htmlAttributes="@new { aria_label = 'Clear all fields' }"
                    content="Clear">
                </ejs-button>
                
                <ejs-button 
                    id="cancelBtn" 
                    type="button" 
                    cssClass="e-outline"
                    onclick="goBack()"
                    htmlAttributes="@new { aria_label = 'Cancel and go back' }"
                    content="Cancel">
                </ejs-button>
            </div>
        </fieldset>
    </form>
</main>

<script>
    function goBack() {
        window.history.back();
    }
</script>

<style>
    main {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
    }

    input:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
    }

    small {
        display: block;
        margin-top: 5px;
        color: #666;
    }

    .button-group {
        margin-top: 30px;
        display: flex;
        gap: 10px;
    }

    .e-btn:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
    }
</style>
```

---

## See Also

- [Button Getting Started](button-getting-started.md)
- [Button API Reference](button-api.md)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
