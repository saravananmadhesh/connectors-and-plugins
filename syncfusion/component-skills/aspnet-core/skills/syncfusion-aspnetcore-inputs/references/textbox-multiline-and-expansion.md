# TextBox Multiline and Expansion — ASP.NET Core

This reference covers multiline textbox modes, auto-expanding inputs, and comparison with TextArea component.

## Table of Contents
- [Multiline TextBox Overview](#multiline-textbox-overview)
- [Multiline Mode Configuration](#multiline-mode-configuration)
- [Auto-Expanding TextBox](#auto-expanding-textbox)
- [TextBox vs TextArea](#textbox-vs-textarea)
- [Examples](#examples)

---

## Multiline TextBox Overview

Multiline TextBox allows users to input multiple lines of text within a single component. It differs from TextArea in features and typical use cases.

**When to Use Multiline TextBox:**
- Short multiline inputs (2-5 lines)
- Simple message composition
- Comments with limited space
- Search/input fields that need line breaks

**When to Use TextArea Instead:**
- Large text blocks (>100 lines)
- Rich formatting needs
- Character limits or counters
- Advanced resize options
- Complete form integration

---

## Multiline Mode Configuration

### Basic Multiline TextBox

**Razor View (CSHTML):**
```html
<ejs-textbox id="message" 
             placeholder="Enter your message"
             multiline="true"
             rows="4"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>
```

**Output:**
```
Message
┌────────────────────────────────────┐
│ This is a multiline input field   │
│ You can press Enter to create      │
│ multiple lines of text            │
│                                    │
└────────────────────────────────────┘
```

### Multiline with Column Width

**Razor View (CSHTML):**
```html
<ejs-textbox id="feedback" 
             placeholder="Your feedback"
             multiline="true"
             rows="3"
             cols="40"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>
```

### Multiline with Max Length

**Razor View (CSHTML):**
```html
<ejs-textbox id="comment" 
             placeholder="Add a comment (max 500 chars)"
             multiline="true"
             rows="4"
             maxLength="500"
             floatLabelType="Auto"
             input="showCharCount"
             type="text">
</ejs-textbox>

<small id="charCount" class="form-text text-muted">0 / 500</small>

<script>
    function showCharCount(args) {
        const value = args.value || '';
        document.getElementById('charCount').textContent = value.length + ' / 500';
    }
</script>
```

---

## Auto-Expanding TextBox

Create a textbox that automatically expands as user types:

**Razor View (CSHTML):**
```html
<ejs-textbox id="expandable" 
             placeholder="Type to expand..."
             multiline="true"
             rows="2"
             input="expandTextbox"
             floatLabelType="Auto"
             cssClass="auto-expand"
             type="text">
</ejs-textbox>

<script>
    function expandTextbox(args) {
        const element = document.getElementById('expandable');
        const lineCount = (args.value || '').split('\n').length;
        
        // Expand by 1 row per line, minimum 2 rows
        const rows = Math.max(2, lineCount);
        element.setAttribute('rows', rows);
    }
</script>
```

**CSS (wwwroot/css/custom.css):**
```css
.auto-expand {
    resize: none;
    overflow: hidden;
    word-wrap: break-word;
    transition: height 0.1s ease-out;
}
```

---

## TextBox vs TextArea

### Quick Comparison

| Feature | TextBox (Multiline) | TextArea |
|---------|-------------------|----------|
| **Lines** | 1-10 lines typical | Many lines (100+) |
| **Resize** | Non-resizable | Resizable both directions |
| **Max Length** | Basic support | Full support with counter |
| **Adornments** | Yes (icons, buttons) | Limited |
| **Floating Label** | Yes | Yes |
| **Auto-expand** | Manual scripting | Built-in property |
| **Character Counter** | Manual scripting | Built-in property |
| **Rich Formatting** | No | No (use RichTextEditor for this) |
| **Performance** | Lightweight | Standard |

### When to Choose TextBox (Multiline)

**Use Cases:**
- Quick message/comment input
- Form fields with occasional line breaks
- Lightweight components
- Need for icons/adornments
- Search bar with line breaks

**Example:**
```html
<!-- Good use of multiline TextBox -->
<ejs-textbox id="message" 
             placeholder="Quick message"
             multiline="true"
             rows="3"
             type="text">
</ejs-textbox>
```

### When to Choose TextArea

**Use Cases:**
- Blog post composition
- Document editing
- Large text blocks
- Need for resize control
- Character counting/limits
- Advanced form features

**Example:**
```html
<!-- Better to use TextArea -->
<ejs-textarea id="article" 
              placeholder="Article content"
              rows="10"
              maxLength="50000"
              floatLabelType="Auto"
              showCharCount="true">
</ejs-textarea>
```

---

## Examples

### Quick Message Composer (Multiline TextBox)

**Razor View (CSHTML):**
```html
<div class="message-composer card p-3" style="max-width: 400px;">
    <h5 class="card-title">New Message</h5>

    <form asp-action="SendMessage" method="post">
        <div class="form-group mb-3">
            <label for="recipient" class="form-label">To</label>
            <ejs-textbox id="recipient" 
                         placeholder="recipient@example.com"
                         floatLabelType="Auto"
                         type="email">
            </ejs-textbox>
        </div>

        <div class="form-group mb-3">
            <label for="subject" class="form-label">Subject</label>
            <ejs-textbox id="subject" 
                         placeholder="Message subject"
                         floatLabelType="Auto"
                         type="text">
            </ejs-textbox>
        </div>

        <div class="form-group mb-3">
            <label for="body" class="form-label">Message</label>
            <ejs-textbox id="body" 
                         placeholder="Type your message..."
                         multiline="true"
                         rows="4"
                         input="expandMessage"
                         floatLabelType="Auto"
                         type="text">
            </ejs-textbox>
        </div>

        <div class="d-flex gap-2">
            <button type="submit" class="btn btn-primary flex-grow-1">Send</button>
            <button type="reset" class="btn btn-outline-secondary">Clear</button>
        </div>
    </form>
</div>

<script>
    function expandMessage(args) {
        const element = document.getElementById('body');
        const lineCount = (args.value || '').split('\n').length;
        const newRows = Math.min(10, Math.max(4, lineCount));
        element.setAttribute('rows', newRows);
    }
</script>
```

### Comment Box with Features

**Razor View (CSHTML):**
```html
<div class="comment-box">
    <h5>Leave a Comment</h5>

    <form asp-action="AddComment" method="post">
        <!-- Author Name -->
        <div class="form-group mb-3">
            <label for="authorName" class="form-label">Name</label>
            <ejs-textbox id="authorName" 
                         placeholder="Your name"
                         floatLabelType="Auto"
                         type="text">
            </ejs-textbox>
        </div>

        <!-- Author Email -->
        <div class="form-group mb-3">
            <label for="authorEmail" class="form-label">Email</label>
            <ejs-textbox id="authorEmail" 
                         placeholder="your@email.com"
                         floatLabelType="Auto"
                         type="email">
            </ejs-textbox>
        </div>

        <!-- Comment (Multiline with auto-expand) -->
        <div class="form-group mb-2">
            <label for="commentText" class="form-label">Comment</label>
            <ejs-textbox id="commentText" 
                         placeholder="Share your thoughts..."
                         multiline="true"
                         rows="3"
                         maxLength="1000"
                         input="handleCommentInput"
                         floatLabelType="Auto"
                         type="text">
            </ejs-textbox>
        </div>

        <!-- Character Counter -->
        <div class="d-flex justify-content-between align-items-center mb-3">
            <small id="charCounter" class="text-muted">0 / 1000</small>
            <small class="text-muted" id="expandHint">Shift+Enter for new line</small>
        </div>

        <button type="submit" class="btn btn-primary w-100">
            Post Comment
        </button>
    </form>
</div>

<style>
    .comment-box {
        max-width: 500px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    .comment-box label {
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
</style>

<script>
    function handleCommentInput(args) {
        const text = args.value || '';
        const lineCount = text.split('\n').length;
        
        // Update character counter
        document.getElementById('charCounter').textContent = text.length + ' / 1000';
        
        // Auto-expand: add 1 row per line, capped at 15 rows
        const rows = Math.min(15, Math.max(3, lineCount));
        document.getElementById('commentText').setAttribute('rows', rows);
    }
</script>
```

### Before/After: Converting HTML Textarea to Multiline TextBox

**Before: HTML Textarea (Simple)**
```html
<textarea placeholder="Your message" rows="4"></textarea>
```

**After: Multiline TextBox (Enhanced)**
```html
<ejs-textbox id="message" 
             placeholder="Your message"
             multiline="true"
             rows="4"
             input="expandMessage"
             floatLabelType="Auto"
             maxLength="1000"
             type="text">
</ejs-textbox>

<small id="msgCount" class="text-muted">0 / 1000</small>

<script>
    function expandMessage(args) {
        const text = args.value || '';
        document.getElementById('msgCount').textContent = text.length + ' / 1000';
        
        const lineCount = text.split('\n').length;
        const rows = Math.min(10, Math.max(4, lineCount));
        document.getElementById('message').setAttribute('rows', rows);
    }
</script>
```

**Benefits:**
- ✅ Auto-expanding as user types
- ✅ Character counter
- ✅ Floating label
- ✅ Better styling
- ✅ ASP.NET Core model binding support

---

## See Also

- `textbox-getting-started.md` — Quick start guide
- `textbox-features-and-groups.md` — Features overview
- `textarea-resize.md` — TextArea resize options
- `textarea-rows-columns-sizing.md` — TextArea sizing
- `textbox-api.md` — Complete API reference
