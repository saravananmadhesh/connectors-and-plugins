# TextArea Floating Labels — ASP.NET Core

This reference covers the floating label functionality that automatically animates placeholder text above the TextArea.

## Table of Contents
- [Overview](#overview)
- [Float Label Types](#float-label-types)
- [Auto Floating Label](#auto-floating-label)
- [Always Floating Label](#always-floating-label)
- [Never Floating Label](#never-floating-label)
- [Combined Features](#combined-features)
- [Examples](#examples)

---

## Overview

The floating label functionality enhances UX by displaying placeholder text that automatically floats above the TextArea when the user interacts with it. This provides a clean, modern interface that maintains context while the user types.

Use the `floatLabelType` property to control this behavior with three options: `Auto`, `Always`, and `Never`.

---

## Float Label Types

### Auto Floating Label

The placeholder text floats above the TextArea when it receives focus or when the user begins typing. The label returns to its initial placeholder position when focus is lost and the TextArea is empty.

**Best for:** General form fields where you want minimal visual clutter until interaction begins.

**Razor View (CSHTML):**
```html
<div class="form-group">
    <ejs-textarea id="comments" 
                  placeholder="Enter your comments"
                  floatLabelType="Auto"
                  rows="4">
    </ejs-textarea>
</div>
```

**Behavior:**
- Initial state: Placeholder visible inside the TextArea
- On focus: Placeholder floats above the field
- While typing: Placeholder stays floating
- On blur with empty field: Placeholder returns to original position
- On blur with content: Placeholder remains floating

**Visual Progression:**
```
Step 1 (Initial):
[Enter your comments                  ]

Step 2 (On Focus):
Enter your comments
[                                    ]

Step 3 (While Typing):
Enter your comments
[User's text here...                 ]
```

---

### Always Floating Label

The placeholder text always remains floating above the TextArea, regardless of focus or content state.

**Best for:** Forms where you want persistent labels for accessibility and clarity.

**Razor View (CSHTML):**
```html
<div class="form-group">
    <ejs-textarea id="feedback" 
                  placeholder="Your feedback"
                  floatLabelType="Always"
                  rows="4">
    </ejs-textarea>
</div>
```

**Behavior:**
- The label is always visible above the TextArea
- Never returns to placeholder position
- Provides consistent visual layout

**Visual:**
```
Your feedback
[User can always see this label      ]
```

---

### Never Floating Label

The placeholder text never floats. It remains in its default position inside the TextArea and disappears when the user starts typing.

**Best for:** Compact interfaces where visual space is limited or when using alternative labeling methods.

**Razor View (CSHTML):**
```html
<div class="form-group">
    <ejs-textarea id="note" 
                  placeholder="Enter note"
                  floatLabelType="Never"
                  rows="4">
    </ejs-textarea>
</div>
```

**Behavior:**
- Placeholder remains inside the TextArea
- Never floats above the field
- Disappears when user types

---

## Combined Features

### Floating Label with Max Length

**Razor View (CSHTML):**
```html
<div class="form-group">
    <ejs-textarea id="bio" 
                  placeholder="Your bio"
                  floatLabelType="Auto"
                  maxLength="200"
                  rows="4">
    </ejs-textarea>
    <small class="form-text text-muted">
        <span id="bio-count">0</span>/200 characters
    </small>
</div>

<script>
    const bioTextarea = document.getElementById('bio').ej2_instances[0];
    bioTextarea.input = (args) => {
        document.getElementById('bio-count').textContent = (args.value || '').length;
    };
</script>
```

### Floating Label with Validation States

**Razor View (CSHTML):**
```html
<div class="form-group">
    <ejs-textarea id="feedback" 
                  placeholder="Your feedback"
                  floatLabelType="Always"
                  rows="4"
                  valueChanged="onFeedbackChanged">
    </ejs-textarea>
    <div id="feedback-status" role="alert" aria-live="polite"></div>
</div>

<script>
    const feedbackTextarea = document.getElementById('feedback').ej2_instances[0];

    function onFeedbackChanged(args) {
        const status = document.getElementById('feedback-status');
        const value = args.value || '';

        if (value.length < 10) {
            feedbackTextarea.cssClass = 'e-warning';
            status.textContent = '⚠️ Please enter at least 10 characters';
            status.className = 'alert alert-warning mt-2';
        } else if (value.length < 50) {
            feedbackTextarea.cssClass = 'e-info';
            status.textContent = '✓ Feedback received';
            status.className = 'alert alert-info mt-2';
        } else {
            feedbackTextarea.cssClass = 'e-success';
            status.textContent = '✓ Great feedback!';
            status.className = 'alert alert-success mt-2';
        }
    }
</script>
```

### Floating Label with Adornments

**Razor View (CSHTML):**
```html
<div class="form-group">
    <ejs-textarea id="rich-textarea" 
                  placeholder="Your message"
                  floatLabelType="Auto"
                  rows="5"
                  adornmentFlow="Horizontal"
                  prependTemplate="<span class='icon'>✉️</span>"
                  appendTemplate="<button class='send-btn'>Send</button>">
    </ejs-textarea>
</div>
```

---

## Examples

### Complete Form with Different Float Label Types

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "Floating Label Examples";
}

<div class="container mt-5">
    <h2>TextArea Floating Label Types</h2>

    <form asp-action="SubmitForm" method="post">
        <div class="row">
            <!-- Auto Floating Label -->
            <div class="col-md-6 mb-4">
                <h5>Auto Floating Label</h5>
                <div class="form-group">
                    <ejs-textarea id="auto-float" 
                                  placeholder="Enter your comments"
                                  floatLabelType="Auto"
                                  rows="4"
                                  name="comments">
                    </ejs-textarea>
                    <small class="form-text text-muted">
                        Label floats when focused or filled
                    </small>
                </div>
            </div>

            <!-- Always Floating Label -->
            <div class="col-md-6 mb-4">
                <h5>Always Floating Label</h5>
                <div class="form-group">
                    <ejs-textarea id="always-float" 
                                  placeholder="Your feedback"
                                  floatLabelType="Always"
                                  rows="4"
                                  name="feedback">
                    </ejs-textarea>
                    <small class="form-text text-muted">
                        Label is always visible
                    </small>
                </div>
            </div>
        </div>

        <div class="row">
            <!-- Never Floating Label -->
            <div class="col-md-6 mb-4">
                <h5>Never Floating Label</h5>
                <div class="form-group">
                    <ejs-textarea id="never-float" 
                                  placeholder="Enter a note"
                                  floatLabelType="Never"
                                  rows="4"
                                  name="note">
                    </ejs-textarea>
                    <small class="form-text text-muted">
                        Label is never floating
                    </small>
                </div>
            </div>

            <!-- Auto with Advanced Features -->
            <div class="col-md-6 mb-4">
                <h5>Auto + Validation</h5>
                <div class="form-group">
                    <ejs-textarea id="auto-validate" 
                                  placeholder="Your message"
                                  floatLabelType="Auto"
                                  rows="4"
                                  maxLength="300"
                                  input="onMessageInput"
                                  name="message">
                    </ejs-textarea>
                    <div class="mt-2">
                        <small id="msg-info" class="form-text text-muted">
                            <span id="msg-count">0</span>/300 characters
                        </small>
                    </div>
                </div>
            </div>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>

<script>
    function onMessageInput(args) {
        const count = (args.value || '').length;
        document.getElementById('msg-count').textContent = count;
    }
</script>

<style>
    .form-group {
        margin-bottom: 1rem;
    }
    
    .form-control:focus {
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    }
</style>
```

### Responsive Survey Form

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">Customer Satisfaction Survey</h3>

            <form asp-action="SubmitSurvey" method="post">
                <div class="form-group mb-4">
                    <label class="form-label">How would you rate our service?</label>
                    <ejs-textarea id="service-rating" 
                                  placeholder="Please share your thoughts"
                                  floatLabelType="Auto"
                                  rows="3"
                                  name="serviceRating">
                    </ejs-textarea>
                </div>

                <div class="form-group mb-4">
                    <label class="form-label">What could we improve?</label>
                    <ejs-textarea id="improvements" 
                                  placeholder="Your suggestions"
                                  floatLabelType="Always"
                                  rows="4"
                                  maxLength="500"
                                  input="onSuggestions"
                                  name="suggestions">
                    </ejs-textarea>
                    <small class="form-text text-muted mt-2">
                        <span id="suggest-count">0</span>/500 characters
                    </small>
                </div>

                <div class="form-group mb-4">
                    <label class="form-label">Additional comments</label>
                    <ejs-textarea id="additional" 
                                  placeholder="Any other feedback?"
                                  floatLabelType="Auto"
                                  rows="3"
                                  name="additionalComments">
                    </ejs-textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-lg w-100">
                    Submit Survey
                </button>
            </form>
        </div>
    </div>
</div>

<script>
    function onSuggestions(args) {
        document.getElementById('suggest-count').textContent = (args.value || '').length;
    }
</script>

<style>
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
- `textarea-adornments.md` — Adding adornments
- `textarea-styling-appearance.md` — Styling options
- `textarea-form-support.md` — Form integration
