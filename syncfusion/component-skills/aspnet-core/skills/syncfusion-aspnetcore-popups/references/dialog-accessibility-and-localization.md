# Accessibility & Localization — Dialog (ASP.NET Core)

## Table of Contents
- [Accessibility Basics](#accessibility-basics)
- [WCAG Compliance](#wcag-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
- [Screen Reader Support](#screen-reader-support)
- [Localization](#localization)
- [RTL Support](#rtl-support)

## Accessibility Basics

The Dialog component follows WCAG 2.1 Level AA guidelines. Ensure your content and implementation are accessible to all users.

### Semantic HTML

Use proper semantic elements within dialog content:

```csharp
<ejs-dialog id="a11yDialog" 
    header="Accessible Content" 
    width="500px">
    <e-content-template>
        <h2 id="dialogTitle">Important Information</h2>
        <p>This uses semantic HTML with proper headings and structure.</p>
        <section>
            <h3>Section Title</h3>
            <p>Content organized with proper hierarchy.</p>
        </section>
    </e-content-template>
</ejs-dialog>
```

### Focus Management

Ensure focus is properly managed when dialog opens/closes:

```csharp
@{
    var submitBtn = new ButtonModel { content = "Submit", isPrimary = true, cssClass = "e-flat" };
}
<ejs-dialog id="focusDialog" 
    header="Focus Management" 
    width="500px"
    open="onDialogOpen"
    close="onDialogClose">
    <e-content-template>
        <form>
            <label>First Name:</label>
            <input type="text" id="firstName" class="form-control" />
            
            <label>Last Name:</label>
            <input type="text" id="lastName" class="form-control" />
        </form>
    </e-content-template>
    <e-dialog-buttons>
        <e-dialog-dialogbutton buttonModel="submitBtn" click="onSubmit"></e-dialog-dialogbutton>
    </e-dialog-buttons>
</ejs-dialog>

<script>
    var previouslyFocusedElement;

    function onDialogOpen(args) {
        // Store previously focused element
        previouslyFocusedElement = document.activeElement;
        
        // Set focus to first input
        document.getElementById('firstName').focus();
    }

    function onDialogClose(args) {
        // Restore focus to previously focused element
        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    }
</script>
```

## WCAG Compliance

### Color Contrast

Ensure sufficient color contrast for text:

```csharp
<style>
    /* ✓ WCAG AA: 7.5:1 contrast ratio */
    .dialog-text {
        color: #1a1a1a;
        background-color: #ffffff;
    }
    
    /* ✗ WCAG AA FAIL: Insufficient contrast */
    .dialog-text-bad {
        color: #cccccc;
        background-color: #ffffff;
    }
</style>

<ejs-dialog id="contrastDialog" header="Color Contrast" width="500px">
    <e-content-template>
        <p class="dialog-text">This text has sufficient contrast (7.5:1) ✓</p>
    </e-content-template>
</ejs-dialog>
```

### Text Sizing

Allow users to resize text without losing functionality:

```csharp
<ejs-dialog id="textSizeDialog" 
    header="Resizable Text" 
    width="500px"
    enableResize="true">
    <e-content-template>
        <p style="font-size: 1.2em; line-height: 1.5;">
            Text should be clearly readable. Users should be able to increase 
            text size without losing content or functionality.
        </p>
    </e-content-template>
</ejs-dialog>
```

### Non-Text Content

Provide alternatives for images and icons:

```csharp
<ejs-dialog id="altContentDialog" header="Alternative Content" width="500px">
    <e-content-template>
        <div style="padding: 20px;">
            <img src="success-icon.png" alt="Success: Task completed successfully" />
            
            <svg role="img" aria-label="Warning icon">
                <circle cx="50" cy="50" r="40" />
            </svg>
            
            <p aria-label="Status indicator: Processing 75% complete">
                ⏳ 75%
            </p>
        </div>
    </e-content-template>
</ejs-dialog>
```

## Keyboard Navigation

### Tab Order

Maintain logical tab order in dialog content:

```csharp
<ejs-dialog id="tabOrderDialog" 
    header="Tab Order Example" 
    width="500px">
    <e-content-template>
        <form>
            <!-- Tab order: 1 -->
            <button class="e-btn" onclick="onFirstButton()">First Button (Tab 1)</button>
            
            <!-- Tab order: 2 -->
            <input type="text" placeholder="Text field (Tab 2)" />
            
            <!-- Tab order: 3 -->
            <button class="e-btn" onclick="onSecondButton()">Second Button (Tab 3)</button>
            
            <!-- Tab order: 4 -->
            <a href="#" onclick="return false;">Link (Tab 4)</a>
        </form>
    </e-content-template>
</ejs-dialog>
```

### Escape Key Handling

The dialog supports closing with the Escape key via the `close-on-escape` property (default: `true`):

```csharp
<!-- Default: Escape key closes the dialog -->
<ejs-dialog id="escapeDialog" 
    header="Press Escape to Close" 
    closeOnEscape="true"
    width="500px"
    visible="false">
    <e-content-template>
        <p>Press the <strong>Escape</strong> key to close this dialog.</p>
    </e-content-template>
</ejs-dialog>

<!-- Disable Escape key closing -->
<ejs-dialog id="noEscapeDialog" 
    header="Escape Disabled" 
    closeOnEscape="false"
    width="500px"
    visible="false">
    <e-content-template>
        <p>Pressing Escape will NOT close this dialog.</p>
    </e-content-template>
</ejs-dialog>
```

### Enter Key Handling

Allow Enter key to submit primary action:

```csharp
@{
    var submitBtn = new ButtonModel { content = "Submit", isPrimary = true, cssClass = "e-flat" };
}
<ejs-dialog id="enterDialog" 
    header="Press Enter to Submit" 
    width="500px">
    <e-content-template>
        <form onkeypress="handleFormKeypress(event)">
            <input type="text" id="inputField" placeholder="Type something..." />
        </form>
    </e-content-template>
    <e-dialog-buttons>
        <e-dialog-dialogbutton buttonModel="submitBtn" click="onSubmit"></e-dialog-dialogbutton>
    </e-dialog-buttons>
</ejs-dialog>

<script>
    function handleFormKeypress(event) {
        if (event.key === 'Enter') {
            onSubmit();
        }
    }

    function onSubmit() {
        console.log('Form submitted');
        // Process form
    }
</script>
```

## ARIA Attributes

### Dialog Accessibility via HtmlAttributes

Use the `html-attributes` property to add ARIA attributes to the dialog:

```csharp
@{
    var ariaAttrs = new Dictionary<string, object> {
        { "aria-labelledby", "dialogTitle" },
        { "aria-describedby", "dialogDescription" }
    };
}
<ejs-dialog id="ariaDialog" 
    header="ARIA Role" 
    width="500px"
    htmlAttributes="@ariaAttrs"
    visible="false">
    <e-content-template>
        <h2 id="dialogTitle">Dialog Title</h2>
        <p id="dialogDescription">This is the dialog description for screen readers.</p>
    </e-content-template>
</ejs-dialog>
```

> **Note:** The Syncfusion Dialog already renders with `role="dialog"` by default. Use `html-attributes` to pass any extra ARIA attributes.

### Alert Dialog

Mark critical information dialogs using `html-attributes`:

```csharp
@{
    var alertAttrs = new Dictionary<string, object> { { "aria-live", "assertive" } };
}
<ejs-dialog id="alertDialog" 
    header="Alert" 
    width="400px"
    isModal="true"
    htmlAttributes="alertAttrs">
    <e-content-template>
        <p>This is an important alert message.</p>
    </e-content-template>
    <e-dialog-buttons>
        <e-dialog-dialogbutton content="OK" isPrimary="true" click="onOk"></e-dialog-dialogbutton>
    </e-dialog-buttons>
</ejs-dialog>
```

### Button Labels

Provide descriptive labels for all buttons:

   var cancelBtn = new ButtonModel { content = "Cancel Changes", cssClass = "e-flat" };
}
<e-dialog-buttons>
    <e-dialog-dialogbutton buttonModel="saveBtn" click="onSave"></e-dialog-dialogbutton>
    <e-dialog-dialogbutton buttonModel="cancelBtn" click="onCancel"></e-dialog-dialogbutton>
</e-dialog-buttons>
```
content="Save Changes" isPrimary="true" click="onSave"></e-dialog-dialogbutton>
    <e-dialog-dialogbutton content="Cancel Changes

### Descriptive Content

```csharp
<ejs-dialog id="screenReaderDialog" 
    header="Screen Reader Support" 
    width="500px">
    <e-content-template>
        <div>
            <!-- ✗ Bad: Vague icon -->
            <span>📧</span>
            
            <!-- ✓ Good: Descriptive label -->
            <p aria-label="You have 3 new email messages">
                📧 <strong>3 messages</strong>
            </p>
            
            <!-- ✓ Good: Semantic structure -->
            <form>
                <label for="emailInput">Email Address:</label>
                <input id="emailInput" type="email" />
                
                <label for="messageInput">Message:</label>
                <textarea id="messageInput"></textarea>
            </form>
        </div>
    </e-content-template>
</ejs-dialog>
```

### Live Regions

Announce dynamic content to screen readers:

```csharp
<ejs-dialog id="liveRegionDialog" header="Live Updates" width="500px">
    <e-content-template>
        <div aria-live="polite" aria-atomic="true" id="statusRegion">
            <p>Status: Initializing...</p>
        </div>
        <button class="e-btn" onclick="updateStatus()">Update Status</button>
    </e-content-template>
</ejs-dialog>

<script>
    function updateStatus() {
        var statusRegion = document.getElementById('statusRegion');
        statusRegion.textContent = 'Status: Processing complete!';
        // Screen reader will announce this change
    }
</script>
```

## Localization

### Multi-Language Support

Configure Dialog for different languages:

```csharp
@{
    string language = ViewData["Language"] as string ?? "en";
}

<ejs-dialog id="multiLangDialog" 
    header="@GetLocalizedText(language, "header")" 
    width="500px"
    visible="false">
    <e-dialog-buttons>
        <e-dialog-dialogbutton content="@GetLocalizedText(language, "ok")" isPrimary="true"></e-dialog-dialogbutton>
        <e-dialog-dialogbutton content="@GetLocalizedText(language, "cancel")"></e-dialog-dialogbutton>
    </e-dialog-buttons>
    <e-content-template>
        <p>@GetLocalizedText(language, "content")</p>
    </e-content-template>
</ejs-dialog>

@{
    string GetLocalizedText(string lang, string key) {
        var translations = new Dictionary<string, Dictionary<string, string>>
        {
            ["en"] = new() 
            { 
                ["header"] = "Welcome",
                ["ok"] = "OK",
                ["cancel"] = "Cancel",
                ["content"] = "This is English content"
            },
            ["es"] = new() 
            { 
                ["header"] = "Bienvenido",
                ["ok"] = "Aceptar",
                ["cancel"] = "Cancelar",
                ["content"] = "Este es contenido en español"
            },
            ["fr"] = new() 
            { 
                ["header"] = "Bienvenue",
                ["ok"] = "OK",
                ["cancel"] = "Annuler",
                ["content"] = "Ceci est du contenu en français"
            }
        };
        
        return translations[lang][key];
    }
}
```

### Date/Time Localization

Display dates and times in user's locale:

```csharp
<ejs-dialog id="dateLocaleDialog" header="Localized Dates" width="500px">
    <e-content-template>
        <p>@DateTime.Now.ToString("G", System.Globalization.CultureInfo.CurrentCulture)</p>
        <!-- Output varies by locale:
             en-US: 3/19/2026 2:45:30 PM
             de-DE: 19.03.2026 14:45:30
             fr-FR: 19/03/2026 14:45:30
        -->
    </e-content-template>
</ejs-dialog>
```

## RTL Support

### Enable RTL Mode

For right-to-left languages (Arabic, Hebrew):

```csharp
<ejs-dialog id="rtlDialog" 
    header="محاورة" 
    width="500px"
    enableRtl="true"
    visible="false">
    <e-content-template>
        <p dir="rtl">هذا محتوى باللغة العربية.</p>
    </e-content-template>
    <e-dialog-buttons>
        <e-dialog-dialogbutton content="موافق" isPrimary="true"></e-dialog-dialogbutton>
        <e-dialog-dialogbutton content="إلغاء"></e-dialog-dialogbutton>
    </e-dialog-buttons>
</ejs-dialog>
```

### RTL CSS

```csharp
<style>
    [dir="rtl"] .e-dialog {
        text-align: right;
        direction: rtl;
    }
    
    [dir="rtl"] .e-dialog-buttons {
        flex-direction: row-reverse;
    }
</style>
```

### Dynamic RTL Toggle

```csharp
<script>
    function toggleRTL() {
        var dialog = document.getElementById('rtlDialog').ej2_instances[0];
        var isRTL = dialog.enableRtl;
        dialog.enableRtl = !isRTL;
        
        // Update document direction
        document.documentElement.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
    }
</script>
```

## Accessibility Checklist

- [ ] Dialog has `role="dialog"` or `role="alertdialog"`
- [ ] Dialog is labeled with `aria-labelledby` and optionally `aria-describedby`
- [ ] Focus is managed on open/close
- [ ] All buttons have descriptive labels
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Color contrast ratio meets WCAG AA (4.5:1)
- [ ] Text is resizable without losing functionality
- [ ] All images have alt text
- [ ] Content is in semantic HTML
- [ ] Live regions announce dynamic updates

