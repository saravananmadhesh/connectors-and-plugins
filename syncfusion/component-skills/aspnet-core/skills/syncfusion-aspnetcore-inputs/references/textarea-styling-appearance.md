# TextArea Styling and Appearance — ASP.NET Core

This reference covers size classes, styling modes, custom CSS, and validation states.

## Table of Contents
- [Size Classes](#size-classes)
- [Filled and Outline Modes](#filled-and-outline-modes)
- [Custom CSS](#custom-css)
- [Disabled and Read-Only States](#disabled-and-read-only-states)
- [Validation States](#validation-states)
- [Examples](#examples)

---

## Size Classes

Apply size variations using CSS classes to adjust the TextArea appearance.

### Small TextArea

Add the `e-small` class for a compact textarea:

**Razor View (CSHTML):**
```html
<ejs-textarea id="small" 
              placeholder="Small textarea"
              cssClass="e-small"
              rows="2">
</ejs-textarea>
```

**Visual:** Reduced font size and padding for compact layouts

### Bigger TextArea

Add the `e-bigger` class for an enlarged textarea:

**Razor View (CSHTML):**
```html
<ejs-textarea id="bigger" 
              placeholder="Bigger textarea"
              cssClass="e-bigger"
              rows="4">
</ejs-textarea>
```

**Visual:** Larger font size and padding for prominent layouts

### Normal TextArea (Default)

No class needed - default size applies automatically.

---

## Filled and Outline Modes

Syncfusion TextArea supports different appearance modes.

### Outline Mode

The outline style displays a border around the textarea:

**Razor View (CSHTML):**
```html
<ejs-textarea id="outlined" 
              placeholder="Outlined"
              floatLabelType="Auto"
              cssClass="e-outline">
</ejs-textarea>
```

**Appearance:** Border visible on all sides, minimal fill

### Filled Mode

The filled style displays a background color:

**Razor View (CSHTML):**
```html
<ejs-textarea id="filled" 
              placeholder="Filled"
              floatLabelType="Auto"
              cssClass="e-filled">
</ejs-textarea>
```

**Appearance:** Light background fill, no visible border

### Combining Size and Mode

```html
<ejs-textarea id="small-outline" 
              placeholder="Small outline"
              cssClass="e-small e-outline"
              floatLabelType="Auto">
</ejs-textarea>

<ejs-textarea id="big-filled" 
              placeholder="Bigger filled"
              cssClass="e-bigger e-filled"
              floatLabelType="Auto">
</ejs-textarea>
```

---

## Custom CSS

Create custom styles for specialized appearance:

**CSS (wwwroot/css/custom-textarea.css):**
```css
/* Custom color theme */
.textarea-custom {
    border-color: #6200EE !important;
    color: #6200EE;
}

.textarea-custom:focus {
    border-color: #3700B3 !important;
    background-color: #F3E5F5;
    box-shadow: 0 0 0 3px rgba(98, 0, 238, 0.1);
}

/* Custom size - compact */
.textarea-compact {
    font-size: 12px;
    padding: 6px 8px;
}

.textarea-compact ~ label {
    font-size: 12px;
}

/* Custom size - large */
.textarea-large {
    font-size: 18px;
    padding: 12px 16px;
}

.textarea-large ~ label {
    font-size: 16px;
}

/* Rounded corners */
.textarea-rounded {
    border-radius: 12px;
    overflow: hidden;
}

/* Gradient border */
.textarea-gradient {
    position: relative;
    border: 2px solid transparent;
    background-image: 
        linear-gradient(white, white),
        linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
}
```

**Razor View (CSHTML):**
```html
<link rel="stylesheet" href="~/css/custom-textarea.css" />

<ejs-textarea id="custom" 
              placeholder="Custom styled"
              cssClass="textarea-custom"
              rows="4">
</ejs-textarea>

<ejs-textarea id="compact" 
              placeholder="Compact"
              cssClass="textarea-compact"
              rows="2">
</ejs-textarea>

<ejs-textarea id="large" 
              placeholder="Large"
              cssClass="textarea-large"
              rows="4">
</ejs-textarea>

<ejs-textarea id="rounded" 
              placeholder="Rounded"
              cssClass="textarea-rounded"
              rows="3">
</ejs-textarea>
```

---

## Disabled and Read-Only States

### Disabled State

Disable the TextArea to prevent user interaction:

**Razor View (CSHTML):**
```html
<ejs-textarea id="disabled" 
              placeholder="This is disabled"
              value="Content here"
              disabled="true"
              rows="4">
</ejs-textarea>
```

**Appearance:** Grayed out, no user interaction allowed

### Read-Only State

Allow viewing but prevent editing:

**Razor View (CSHTML):**
```html
<ejs-textarea id="readonly" 
              placeholder="Read-only content"
              value="This content cannot be edited"
              readOnly="true"
              rows="4">
</ejs-textarea>
```

**Appearance:** Normal appearance but text cannot be modified

---

## Validation States

### Error State

Apply error styling using CSS classes:

**Razor View (CSHTML):**
```html
<ejs-textarea id="error" 
              placeholder="This field has an error"
              cssClass="e-error"
              rows="3">
</ejs-textarea>

<small class="text-danger">❌ This field is required</small>
```

**CSS for error state:**
```css
.e-error {
    border-color: #dc3545 !important;
}

.e-error:focus {
    border-color: #c82333 !important;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, .25);
}
```

### Warning State

```html
<ejs-textarea id="warning" 
              placeholder="Warning"
              cssClass="e-warning"
              rows="3">
</ejs-textarea>

<small class="text-warning">⚠️ Approaching character limit</small>
```

### Success State

```html
<ejs-textarea id="success" 
              placeholder="Valid input"
              cssClass="e-success"
              value="Valid"
              rows="3">
</ejs-textarea>

<small class="text-success">✓ Input is valid</small>
```

---

## Examples

### Complete Styling Example

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "TextArea Styling Examples";
}

<div class="container mt-5">
    <h2>TextArea Styling and Appearance Examples</h2>

    <div class="row">
        <!-- Size Variations -->
        <div class="col-md-6 mb-4">
            <h5>Size Variations</h5>
            
            <div class="mb-3">
                <label>Small</label>
                <ejs-textarea id="size-small" 
                              placeholder="Small textarea"
                              cssClass="e-small"
                              rows="2">
                </ejs-textarea>
            </div>

            <div class="mb-3">
                <label>Normal</label>
                <ejs-textarea id="size-normal" 
                              placeholder="Normal textarea"
                              rows="2">
                </ejs-textarea>
            </div>

            <div class="mb-3">
                <label>Bigger</label>
                <ejs-textarea id="size-bigger" 
                              placeholder="Bigger textarea"
                              cssClass="e-bigger"
                              rows="2">
                </ejs-textarea>
            </div>
        </div>

        <!-- Display Modes -->
        <div class="col-md-6 mb-4">
            <h5>Display Modes</h5>
            
            <div class="mb-3">
                <label>Outline (Default)</label>
                <ejs-textarea id="mode-outline" 
                              placeholder="Outline mode"
                              cssClass="e-outline"
                              floatLabelType="Auto"
                              rows="2">
                </ejs-textarea>
            </div>

            <div class="mb-3">
                <label>Filled</label>
                <ejs-textarea id="mode-filled" 
                              placeholder="Filled mode"
                              cssClass="e-filled"
                              floatLabelType="Auto"
                              rows="2">
                </ejs-textarea>
            </div>
        </div>
    </div>

    <div class="row">
        <!-- States -->
        <div class="col-md-12 mb-4">
            <h5>States</h5>
            
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label>Normal</label>
                    <ejs-textarea id="state-normal" 
                                  placeholder="Normal state"
                                  rows="2">
                    </ejs-textarea>
                </div>

                <div class="col-md-4 mb-3">
                    <label>Read-Only</label>
                    <ejs-textarea id="state-readonly" 
                                  placeholder="Read-only"
                                  value="Cannot edit this"
                                  readOnly="true"
                                  rows="2">
                    </ejs-textarea>
                </div>

                <div class="col-md-4 mb-3">
                    <label>Disabled</label>
                    <ejs-textarea id="state-disabled" 
                                  placeholder="Disabled"
                                  value="Disabled"
                                  disabled="true"
                                  rows="2">
                    </ejs-textarea>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <!-- Validation States -->
        <div class="col-md-12">
            <h5>Validation States</h5>
            
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label>Success</label>
                    <ejs-textarea id="valid" 
                                  placeholder="Valid"
                                  cssClass="e-success"
                                  value="Valid content"
                                  rows="2">
                    </ejs-textarea>
                    <small class="text-success">✓ Valid</small>
                </div>

                <div class="col-md-4 mb-3">
                    <label>Warning</label>
                    <ejs-textarea id="warn" 
                                  placeholder="Warning"
                                  cssClass="e-warning"
                                  rows="2">
                    </ejs-textarea>
                    <small class="text-warning">⚠️ Check this</small>
                </div>

                <div class="col-md-4 mb-3">
                    <label>Error</label>
                    <ejs-textarea id="error" 
                                  placeholder="Error"
                                  cssClass="e-error"
                                  rows="2">
                    </ejs-textarea>
                    <small class="text-danger">❌ Required field</small>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    label {
        font-weight: 600;
        margin-bottom: 0.5rem;
        display: block;
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

### Form with Styling Examples

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "Styled Feedback Form";
}

<div class="container mt-5">
    <div class="card shadow-lg">
        <div class="card-body">
            <h3 class="card-title mb-4">Customer Feedback</h3>

            <form asp-action="SubmitFeedback" method="post">
                <!-- Name (Normal) -->
                <div class="form-group mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" id="name" name="name" class="form-control" />
                </div>

                <!-- Quick Feedback (Small) -->
                <div class="form-group mb-3">
                    <label for="quick-feedback" class="form-label">Quick Feedback (Optional)</label>
                    <ejs-textarea id="quick-feedback" 
                                  name="quickFeedback"
                                  placeholder="1-2 sentences"
                                  cssClass="e-small"
                                  rows="2">
                    </ejs-textarea>
                </div>

                <!-- Detailed Feedback (Normal, Filled) -->
                <div class="form-group mb-3">
                    <label for="detailed" class="form-label">Detailed Feedback</label>
                    <ejs-textarea id="detailed" 
                                  name="detailedFeedback"
                                  placeholder="Share your thoughts in detail"
                                  cssClass="e-filled"
                                  floatLabelType="Auto"
                                  rows="5"
                                  maxLength="1000">
                    </ejs-textarea>
                    <small class="form-text text-muted">Max 1000 characters</small>
                </div>

                <!-- Suggestions (Bigger, Outline) -->
                <div class="form-group mb-4">
                    <label for="suggestions" class="form-label">Suggestions for Improvement</label>
                    <ejs-textarea id="suggestions" 
                                  name="suggestions"
                                  placeholder="How can we improve?"
                                  cssClass="e-bigger e-outline"
                                  floatLabelType="Always"
                                  rows="4">
                    </ejs-textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-lg">Submit Feedback</button>
            </form>
        </div>
    </div>
</div>

<style>
    .card {
        border: none;
        border-radius: 8px;
    }
    
    .form-label {
        font-weight: 600;
        color: #333;
        margin-bottom: 0.5rem;
    }
</style>
```

---

## See Also

- `textarea-getting-started.md` — Quick start guide
- `textarea-api.md` — Complete API reference
- `textarea-rows-columns-sizing.md` — Size control
- `textarea-floating-label.md` — Floating labels
