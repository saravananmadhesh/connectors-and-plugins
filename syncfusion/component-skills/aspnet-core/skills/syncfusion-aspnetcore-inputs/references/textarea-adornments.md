# TextArea Adornments — ASP.NET Core

This reference covers adding prepend and append templates to TextArea, controlling adornment flow and orientation.

## Table of Contents
- [Overview](#overview)
- [Prepend Template](#prepend-template)
- [Append Template](#append-template)
- [Adornment Flow](#adornment-flow)
- [Adornment Orientation](#adornment-orientation)
- [Common Use Cases](#common-use-cases)
- [Examples](#examples)

---

## Overview

Adornments allow you to add custom elements (icons, text, buttons, or complex HTML) before or after the TextArea. Using Tag Helper properties, you can create flexible, visually rich layouts.

**Common Use Cases:**
- Edit icons before the textarea
- Character count or send buttons after
- Formatting action buttons
- Status indicators
- Validation messages

---

## Prepend Template

Add custom content before the TextArea using the `prependTemplate` property.

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="feedback">Feedback</label>
    
    <ejs-textarea id="feedback" 
                  placeholder="Enter your feedback"
                  prependTemplate="<span class='e-input-group-icon'>📝</span>">
    </ejs-textarea>
</div>
```

**Using Complex HTML:**
```html
<ejs-textarea id="notes" 
              placeholder="Enter notes"
              prependTemplate="<div class='prepend-content'>
                  <span class='label'>Notes:</span>
              </div>">
</ejs-textarea>
```

**With Icon Font:**
```html
<ejs-textarea id="message" 
              placeholder="Type message"
              prependTemplate="<span class='e-icons e-message-icon'>✉</span>">
</ejs-textarea>
```

---

## Append Template

Add custom content after the TextArea using the `appendTemplate` property.

**Action Button:**
```html
<ejs-textarea id="message" 
              placeholder="Type message"
              appendTemplate="<button class='send-btn' onclick='sendMessage()'>
                  Send →
              </button>">
</ejs-textarea>
```

**Character Counter:**
```html
<ejs-textarea id="comment" 
              placeholder="Leave a comment"
              maxLength="500"
              appendTemplate="<div class='char-counter'>
                  <span id='charCount'>0</span>/500
              </div>">
</ejs-textarea>

<script>
    const textarea = document.getElementById('comment').ej2_instances[0];
    textarea.input = (args) => {
        document.getElementById('charCount').textContent = (args.value || '').length;
    };
</script>
```

**Multiple Action Buttons:**
```html
<ejs-textarea id="feedback" 
              placeholder="Provide feedback"
              appendTemplate="<div class='action-buttons'>
                  <button class='btn-clear'>Clear</button>
                  <button class='btn-submit'>Submit</button>
              </div>">
</ejs-textarea>
```

---

## Adornment Flow

The `adornmentFlow` property controls how adornments are positioned relative to the TextArea.

### Horizontal Flow (Default)

Prepend appears on the left, append appears on the right.

**Razor View (CSHTML):**
```html
<ejs-textarea id="horizontal" 
              placeholder="Message"
              adornmentFlow="Horizontal"
              prependTemplate="<span class='icon'>📝</span>"
              appendTemplate="<button class='send'>Send</button>">
</ejs-textarea>
```

**Layout:**
```
┌─────────────────────────────────────────┐
│ 📝 │  TextArea Content        │ Send   │
└─────────────────────────────────────────┘
```

### Vertical Flow

Prepend appears above, append appears below.

**Razor View (CSHTML):**
```html
<ejs-textarea id="vertical" 
              placeholder="Message"
              adornmentFlow="Vertical"
              prependTemplate="<div class='header'>📝 Message</div>"
              appendTemplate="<div class='footer'>
                  <button class='send'>Send</button>
              </div>">
</ejs-textarea>
```

**Layout:**
```
┌──────────────────────────┐
│  📝 Message              │
├──────────────────────────┤
│  TextArea Content        │
├──────────────────────────┤
│       Send Button        │
└──────────────────────────┘
```

---

## Adornment Orientation

The `adornmentOrientation` property controls how multiple items are arranged within each adornment section.

### Horizontal Orientation

Items arranged in a row.

**Razor View (CSHTML):**
```html
<ejs-textarea id="horiz-items" 
              adornmentOrientation="Horizontal"
              prependTemplate="<span class='icon'>✎</span><span class='label'>Edit</span>"
              appendTemplate="<button>Submit</button><button>Cancel</button>">
</ejs-textarea>
```

**Display:**
```
✎ Edit  │  TextArea  │  Submit  Cancel
```

### Vertical Orientation

Items stacked on top of each other.

**Razor View (CSHTML):**
```html
<ejs-textarea id="vert-items" 
              adornmentOrientation="Vertical"
              prependTemplate="<div>✎ Edit</div><div>Format</div>"
              appendTemplate="<div>Save</div><div>Cancel</div>">
</ejs-textarea>
```

**Display:**
```
✎ Edit
Format

[  TextArea  ]

Save
Cancel
```

---

## Common Use Cases

### Comment Box with Send Button

**Razor View (CSHTML):**
```html
<div class="comment-box">
    <ejs-textarea id="comment" 
                  placeholder="Add a comment..."
                  rows="3"
                  adornmentFlow="Horizontal"
                  prependTemplate="<span class='e-avatar'>👤</span>"
                  appendTemplate="<button class='btn-post' onclick='postComment()'>
                      Post
                  </button>">
    </ejs-textarea>
</div>

<style>
    .comment-box {
        margin: 10px 0;
    }
    
    .e-avatar {
        font-size: 24px;
        margin: 0 10px;
    }
    
    .btn-post {
        padding: 8px 16px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
```

### Feedback Form with Icon and Counter

**Razor View (CSHTML):**
```html
<div class="feedback-form">
    <label>Tell us what you think</label>
    
    <ejs-textarea id="feedback" 
                  placeholder="Your feedback"
                  maxLength="500"
                  rows="5"
                  adornmentFlow="Horizontal"
                  prependTemplate="<span class='feedback-icon'>💬</span>"
                  appendTemplate="<div class='counter'>
                      <span id='feedback-count'>0</span>/500
                  </div>">
    </ejs-textarea>
</div>

<script>
    const feedbackTextarea = document.getElementById('feedback').ej2_instances[0];
    feedbackTextarea.input = (args) => {
        document.getElementById('feedback-count').textContent = (args.value || '').length;
    };
</script>

<style>
    .feedback-icon {
        font-size: 20px;
        margin-right: 10px;
    }
    
    .counter {
        font-size: 12px;
        color: #666;
        margin-left: 10px;
    }
</style>
```

### Rich Message Composer

**Razor View (CSHTML):**
```html
<div class="message-composer">
    <ejs-textarea id="message" 
                  placeholder="Write a message..."
                  rows="4"
                  adornmentFlow="Vertical"
                  prependTemplate="<div class='composer-header'>
                      <span class='to-label'>To: User Name</span>
                  </div>"
                  appendTemplate="<div class='composer-footer'>
                      <button class='attach'>📎 Attach</button>
                      <button class='send'>✉️ Send</button>
                      <button class='save'>💾 Save Draft</button>
                  </div>">
    </ejs-textarea>
</div>

<style>
    .composer-header {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        background: #f9f9f9;
    }
    
    .to-label {
        font-weight: bold;
        color: #333;
    }
    
    .composer-footer {
        display: flex;
        gap: 10px;
        padding: 10px;
        border-top: 1px solid #ddd;
        background: #f9f9f9;
    }
    
    .composer-footer button {
        padding: 6px 12px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
</style>
```

---

## Examples

### Complete Adornment Example

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "TextArea Adornments Demo";
}

<div class="container mt-5">
    <h2>TextArea Adornments Examples</h2>

    <div class="row">
        <!-- Example 1: Simple Horizontal -->
        <div class="col-md-6 mb-4">
            <h5>Feedback with Icon</h5>
            <ejs-textarea id="feedback-demo" 
                          placeholder="Share your feedback"
                          rows="4"
                          adornmentFlow="Horizontal"
                          prependTemplate="<span class='icon'>💭</span>"
                          appendTemplate="<button class='btn-submit'>Send</button>">
            </ejs-textarea>
        </div>

        <!-- Example 2: Vertical Flow -->
        <div class="col-md-6 mb-4">
            <h5>Vertical Adornments</h5>
            <ejs-textarea id="vert-demo" 
                          placeholder="Enter content"
                          rows="4"
                          adornmentFlow="Vertical"
                          prependTemplate="<div class='badge'>Required</div>"
                          appendTemplate="<div class='actions'>
                              <button>Save</button>
                              <button>Cancel</button>
                          </div>">
            </ejs-textarea>
        </div>
    </div>

    <div class="row">
        <!-- Example 3: Message Composer -->
        <div class="col-md-12 mb-4">
            <h5>Message Composer</h5>
            <ejs-textarea id="message-demo" 
                          placeholder="Type your message..."
                          rows="5"
                          maxLength="500"
                          adornmentFlow="Horizontal"
                          prependTemplate="<span class='composer-icon'>✉️</span>"
                          appendTemplate="<div class='composer-actions'>
                              <span class='char-info'>
                                  <span id='msg-count'>0</span>/500
                              </span>
                              <button class='btn-send'>Send Message</button>
                          </div>">
            </ejs-textarea>
        </div>
    </div>
</div>

<style>
    .icon {
        font-size: 24px;
        margin: 0 10px;
    }
    
    .btn-submit {
        padding: 8px 16px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    .badge {
        background: #dc3545;
        color: white;
        padding: 4px 8px;
        border-radius: 3px;
        font-size: 12px;
        margin-bottom: 10px;
    }
    
    .actions {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        margin-top: 10px;
    }
    
    .actions button {
        padding: 6px 12px;
        border: 1px solid #ccc;
        background: white;
        border-radius: 3px;
        cursor: pointer;
    }
    
    .composer-icon {
        font-size: 20px;
        margin-right: 10px;
    }
    
    .composer-actions {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: flex-end;
        margin-left: 10px;
    }
    
    .char-info {
        font-size: 12px;
        color: #666;
    }
    
    .btn-send {
        padding: 8px 16px;
        background: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>

<script>
    const messageTextarea = document.getElementById('message-demo').ej2_instances[0];
    messageTextarea.input = (args) => {
        document.getElementById('msg-count').textContent = (args.value || '').length;
    };
</script>
```

---

## See Also

- `textarea-getting-started.md` — Quick start guide
- `textarea-floating-label.md` — Floating label functionality
- `textarea-styling-appearance.md` — Styling options
- `textarea-form-support.md` — Form integration
