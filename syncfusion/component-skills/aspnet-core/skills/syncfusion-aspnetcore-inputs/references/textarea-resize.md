# TextArea Resize Modes — ASP.NET Core

This reference covers controlling how users can resize the TextArea to accommodate varying content and interface preferences.

## Table of Contents
- [Overview](#overview)
- [Resize Modes](#resize-modes)
- [Both Mode](#both-mode)
- [Vertical Mode](#vertical-mode)
- [Horizontal Mode](#horizontal-mode)
- [None Mode](#none-mode)
- [Examples](#examples)

---

## Overview

The `resizeMode` property offers flexible control over resizing behavior. Users can adjust the TextArea dimensions to accommodate their preferences.

**Available Modes:**
- `Both` (default) — Resize height and width
- `Vertical` — Resize height only
- `Horizontal` — Resize width only
- `None` — Disable resizing

---

## Resize Modes

### Both Mode (Default)

Users can resize the TextArea both vertically (height) and horizontally (width).

**Razor View (CSHTML):**
```html
<ejs-textarea id="resizable" 
              placeholder="Drag the corner to resize"
              resizeMode="Both"
              rows="5"
              cols="40">
</ejs-textarea>
```

**Behavior:**
- Resize handle appears in the bottom-right corner
- Dragging adjusts both dimensions
- Default browser textarea behavior

**Visual:**
```
┌──────────────────────────────────────┐
│                                      │
│         TextArea Content             │
│                                      │
└──────────────────────────────────────┘ ↘ (resize corner)
```

---

## Vertical Mode

Allow only vertical (height) resizing. Users can increase or decrease the number of visible lines.

**Razor View (CSHTML):**
```html
<ejs-textarea id="vertical-only" 
              placeholder="Resize vertically only"
              resizeMode="Vertical"
              rows="4"
              cols="50">
</ejs-textarea>
```

**Best For:**
- Form fields where width should remain consistent
- Responsive layouts with fixed container widths
- Better layout control

**Behavior:**
- Resize handle only on vertical axis
- Height can be increased/decreased
- Width remains fixed

**Visual:**
```
┌────────────────────────────────────┐
│                                    │
│      TextArea Content              │
│                                    │
└────────────────────────────────────┘
                                     ↕ (vertical resize)
```

---

## Horizontal Mode

Allow only horizontal (width) resizing. Users can adjust the visible width.

**Razor View (CSHTML):**
```html
<ejs-textarea id="horizontal-only" 
              placeholder="Resize horizontally only"
              resizeMode="Horizontal"
              rows="5"
              cols="40">
</ejs-textarea>
```

**Best For:**
- Scenarios requiring fixed height but variable width
- Code editors or specialized inputs
- Accommodating longer lines without vertical expansion

**Behavior:**
- Resize handle only on horizontal axis
- Width can be adjusted
- Height remains fixed

---

## None Mode

Disable resizing entirely. The TextArea maintains fixed dimensions.

**Razor View (CSHTML):**
```html
<ejs-textarea id="fixed-size" 
              placeholder="Fixed size - no resizing"
              resizeMode="None"
              rows="4"
              cols="40">
</ejs-textarea>
```

**Best For:**
- Design-critical layouts
- Mobile-first responsive layouts
- Controlled form experiences

**Behavior:**
- No resize handle visible
- Dimensions stay constant
- User cannot resize

---

## Examples

### Different Resize Modes Side-by-Side

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "TextArea Resize Modes";
}

<div class="container mt-5">
    <h2>TextArea Resize Mode Examples</h2>

    <div class="row">
        <!-- Both Mode -->
        <div class="col-md-6 mb-4">
            <h5>Both Mode (Default)</h5>
            <p class="text-muted">Drag corner to resize height & width</p>
            
            <ejs-textarea id="both-mode" 
                          placeholder="Resize both directions"
                          resizeMode="Both"
                          rows="4"
                          cols="35">
            </ejs-textarea>
        </div>

        <!-- Vertical Mode -->
        <div class="col-md-6 mb-4">
            <h5>Vertical Mode</h5>
            <p class="text-muted">Drag bottom edge to resize height only</p>
            
            <ejs-textarea id="vertical-mode" 
                          placeholder="Resize height only"
                          resizeMode="Vertical"
                          rows="4"
                          cols="35">
            </ejs-textarea>
        </div>
    </div>

    <div class="row">
        <!-- Horizontal Mode -->
        <div class="col-md-6 mb-4">
            <h5>Horizontal Mode</h5>
            <p class="text-muted">Drag right edge to resize width only</p>
            
            <ejs-textarea id="horizontal-mode" 
                          placeholder="Resize width only"
                          resizeMode="Horizontal"
                          rows="4"
                          cols="35">
            </ejs-textarea>
        </div>

        <!-- None Mode -->
        <div class="col-md-6 mb-4">
            <h5>None Mode</h5>
            <p class="text-muted">Fixed size - no resizing allowed</p>
            
            <ejs-textarea id="none-mode" 
                          placeholder="Fixed size - cannot resize"
                          resizeMode="None"
                          rows="4"
                          cols="35">
            </ejs-textarea>
        </div>
    </div>
</div>

<style>
    ej2-textarea {
        display: block;
        margin-bottom: 10px;
    }
</style>
```

### Responsive Resize Modes

**Razor View (CSHTML):**
```html
<div class="container-fluid">
    <!-- Mobile: Fixed size -->
    <div class="d-md-none">
        <h5>Mobile - Fixed Size</h5>
        <ejs-textarea id="mobile-textarea" 
                      placeholder="Mobile friendly"
                      resizeMode="None"
                      rows="3"
                      cols="35">
        </ejs-textarea>
    </div>

    <!-- Tablet: Vertical resize only -->
    <div class="d-none d-md-block d-lg-none">
        <h5>Tablet - Vertical Resize</h5>
        <ejs-textarea id="tablet-textarea" 
                      placeholder="Tablet optimized"
                      resizeMode="Vertical"
                      rows="4"
                      cols="50">
        </ejs-textarea>
    </div>

    <!-- Desktop: Full resize -->
    <div class="d-none d-lg-block">
        <h5>Desktop - Full Resize</h5>
        <ejs-textarea id="desktop-textarea" 
                      placeholder="Desktop - resize both directions"
                      resizeMode="Both"
                      rows="5"
                      cols="70">
        </ejs-textarea>
    </div>
</div>
```

### Form with Mixed Resize Modes

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "Mixed Resize Modes Form";
}

<div class="container mt-5">
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">Feedback Form</h3>

            <form asp-action="SubmitFeedback" method="post">
                <!-- Quick Feedback - Fixed Size -->
                <div class="form-group mb-3">
                    <label for="quick" class="form-label">Quick Feedback (Fixed)</label>
                    <p class="small text-muted">Concise feedback - fixed size</p>
                    
                    <ejs-textarea id="quick" 
                                  name="quickFeedback"
                                  placeholder="Brief feedback..."
                                  resizeMode="None"
                                  rows="2"
                                  maxLength="200">
                    </ejs-textarea>
                    
                    <small class="form-text text-muted">
                        Max 200 characters - fixed size
                    </small>
                </div>

                <!-- Detailed Feedback - Vertical Only -->
                <div class="form-group mb-3">
                    <label for="detailed" class="form-label">Detailed Feedback (Vertical Resize)</label>
                    <p class="small text-muted">Expand vertically as needed</p>
                    
                    <ejs-textarea id="detailed" 
                                  name="detailedFeedback"
                                  placeholder="Provide details..."
                                  resizeMode="Vertical"
                                  rows="4"
                                  cols="80"
                                  maxLength="1000">
                    </ejs-textarea>
                    
                    <small class="form-text text-muted">
                        Max 1000 characters - resize height only
                    </small>
                </div>

                <!-- Suggestions - Full Resize -->
                <div class="form-group mb-3">
                    <label for="suggestions" class="form-label">Suggestions (Full Resize)</label>
                    <p class="small text-muted">Resize as needed</p>
                    
                    <ejs-textarea id="suggestions" 
                                  name="suggestions"
                                  placeholder="Share your suggestions..."
                                  resizeMode="Both"
                                  rows="5"
                                  cols="80"
                                  maxLength="2000">
                    </ejs-textarea>
                    
                    <small class="form-text text-muted">
                        Max 2000 characters - resize freely
                    </small>
                </div>

                <button type="submit" class="btn btn-primary">Submit Feedback</button>
            </form>
        </div>
    </div>
</div>

<style>
    .form-group label {
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .form-group .small.text-muted {
        display: block;
        margin-bottom: 0.5rem;
        font-style: italic;
    }
</style>
```

---

## See Also

- `textarea-getting-started.md` — Quick start guide
- `textarea-rows-columns-sizing.md` — Row/column sizing
- `textarea-styling-appearance.md` — Styling options
- `textarea-api.md` — Complete API reference
