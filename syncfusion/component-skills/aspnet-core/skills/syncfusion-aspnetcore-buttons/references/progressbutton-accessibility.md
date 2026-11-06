# Accessibility – ASP.NET Core ProgressButton

## Semantic HTML & ARIA

Progress buttons require proper ARIA attributes for screen reader support:

```cshtml
<ejs-progressbutton 
    id="pb"
    content="Submit"
    enableProgress="true"
    htmlAttributes="@new { 
        aria_label = 'Submit form',
        aria_busy = 'false'
    }">
</ejs-progressbutton>
```

---

## Progress Status Communication

Update ARIA attributes to communicate progress state:

```cshtml
<ejs-progressbutton 
    id="pb"
    content="Downloading"
    enableProgress="true"
    progress="50"
    htmlAttributes="@new { 
        aria_label = 'Downloading file (50% complete)',
        aria_valuenow = '50',
        aria_valuemin = '0',
        aria_valuemax = '100',
        aria_busy = 'true',
        role = 'progressbar'
    }">
</ejs-progressbutton>
```

---

## Keyboard Navigation

Progress buttons support:
- **Tab** — Navigate to button
- **Enter/Space** — Activate button action
- **Screen reader announces** — Progress updates during operation

---

## Disabled State

```cshtml
<ejs-progressbutton 
    id="pb"
    content="Processing"
    disabled="true"
    htmlAttributes="@new { 
        aria_label = 'Processing (disabled)',
        aria_disabled = 'true'
    }">
</ejs-progressbutton>
```

---

## Start/End Messages

Provide clear messaging about what operation is happening:

```cshtml
<ejs-progressbutton 
    id="uploadBtn"
    content="Upload File"
    enableProgress="true"
    htmlAttributes="@new { 
        aria_label = 'Upload file - click to start'
    }">
</ejs-progressbutton>

<script>
function startUpload() {
    var btn = document.getElementById('uploadBtn');
    btn.setAttribute('aria-label', 'Uploading file in progress');
    btn.setAttribute('aria-busy', 'true');
    
    // Simulate upload
    setTimeout(function() {
        btn.setAttribute('aria-label', 'File uploaded successfully');
        btn.setAttribute('aria-busy', 'false');
    }, 3000);
}
</script>
```

---

## Complete Accessible Example

```cshtml
<form>
    <div class="form-group">
        <label for="email">Email Address:</label>
        <input type="email" id="email" required />
    </div>
    
    <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" required></textarea>
    </div>
    
    <ejs-progressbutton 
        id="submitBtn"
        content="Send Message"
        enableProgress="true"
        progressText="Sending..."
        onclick="sendMessage()"
        htmlAttributes="@new { 
            aria_label = 'Send message - click to submit form',
            type = 'button'
        }">
    </ejs-progressbutton>
    
    <div id="status" aria-live="polite" aria-atomic="true"></div>
</form>

<style>
    .form-group {
        margin-bottom: 16px;
    }
    
    label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
    }
    
    input, textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    
    .e-progressbutton:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
    }
</style>

<script>
function sendMessage() {
    var btn = document.getElementById('submitBtn');
    var status = document.getElementById('status');
    
    // Update ARIA attributes
    btn.setAttribute('aria-busy', 'true');
    btn.setAttribute('aria-label', 'Sending message...');
    
    status.textContent = 'Sending your message...';
    
    // Simulate sending
    setTimeout(function() {
        btn.setAttribute('aria-busy', 'false');
        btn.setAttribute('aria-label', 'Message sent successfully');
        status.textContent = 'Your message has been sent!';
    }, 3000);
}
</script>
```

---

## aria-live Region for Updates

```cshtml
<div aria-live="polite" aria-atomic="true" id="uploadStatus"></div>

<ejs-progressbutton 
    id="pb"
    content="Upload"
    enableProgress="true"
    onclick="startUpload()"
    htmlAttributes="@new { 
        aria_label = 'Upload file'
    }">
</ejs-progressbutton>

<script>
function startUpload() {
    var status = document.getElementById('uploadStatus');
    status.textContent = '0% - Upload starting';
    
    // Update progress and status
    for (let i = 0; i <= 100; i += 25) {
        setTimeout(function() {
            status.textContent = i + '% - Upload in progress';
        }, (i / 100) * 3000);
    }
}
</script>
```

---

## See Also

- [ProgressButton Getting Started](progressbutton-getting-started.md)
- [ProgressButton Spinner and Progress](progressbutton-spinner-and-progress.md)
- [ProgressButton Style and Appearance](progressbutton-style-and-appearance.md)
