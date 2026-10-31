# Advanced Features

## Paste Cleanup and Sanitization

### Set Denied Tags

Remove specific HTML tags from pasted content:

```razor
@{
    var deniedTags = new string[] { "script", "iframe", "form", "input" };
}

<ejs-blockeditor id="block-editor">
    <e-blockeditor-pastesettings deniedTags="@deniedTags">
    </e-blockeditor-pastesettings>
</ejs-blockeditor>
```

### Keep Format Option

Control whether pasted content preserves its formatting:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-pastesettings keepFormat="true">
    </e-blockeditor-pastesettings>
</ejs-blockeditor>
```

### Plain Text Mode

Paste content as plain text only, removing all HTML and formatting:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-pastesettings plainText="true">
    </e-blockeditor-pastesettings>
</ejs-blockeditor>
```

### Paste Events

Handle paste operations with events:

```razor
<ejs-blockeditor id="block-editor" 
                 beforePasteCleanup="beforePaste"
                 afterPasteCleanup="afterPaste">
</ejs-blockeditor>

<script>
    function beforePaste(args) {
        console.log('Before paste:', args.content);
        // Validate or modify content before pasting
        if (args.content.includes('<script>')) {
            args.cancel = true;  // Cancel paste if script found
        }
    }
    
    function afterPaste(args) {
        console.log('After paste:', args.content);
        // Post-paste processing
    }
</script>
```

### Complete Paste Cleanup Example

```csharp
public IActionResult Index()
{
    var deniedTags = new string[] { "script", "iframe" };
    
    var pasteSettings = new PasteCleanupSettings
    {
        DeniedTags = deniedTags,
        KeepFormat = true,
        PlainText = false
    };
    
    ViewBag.PasteSettings = pasteSettings;
    return View();
}
```

## Undo and Redo Functionality

### Configure Undo/Redo Stack

Set the maximum number of undo/redo actions (default is 30):

```razor
<ejs-blockeditor id="block-editor" 
                 undoRedoStack="20"
                 blocks="@ViewBag.BlocksData">
</ejs-blockeditor>
```

### Keyboard Shortcuts for Undo/Redo

| Action | Windows | Mac |
|--------|---------|-----|
| Undo | Ctrl+Z | ⌘+Z |
| Redo | Ctrl+Y or Ctrl+Shift+Z | ⌘+Y or ⌘+⇧+Z |

### Programmatic Undo/Redo

```javascript
// Access the block editor instance
var blockEditorObj = ej.base.getInstance(
    document.getElementById('block-editor'),
    ejs.blockeditor.BlockEditor
);

// Perform undo
blockEditorObj.undo();

// Perform redo
blockEditorObj.redo();

// Clear undo stack
blockEditorObj.clearUndoStack();
```

### Example with Undo/Redo Controls

```razor
<div id='blockeditor-container'>
    <div id="controls">
        <button onclick="undoBtn()">↶ Undo</button>
        <button onclick="redoBtn()">↷ Redo</button>
    </div>
    
    <ejs-blockeditor id="block-editor" 
                     undoRedoStack="50"
                     blocks="@ViewBag.BlocksData">
    </ejs-blockeditor>
</div>

<script>
    var blockEditorObj;
    
    function undoBtn() {
        blockEditorObj.undo();
    }
    
    function redoBtn() {
        blockEditorObj.redo();
    }
</script>
```

## Keyboard Shortcuts Customization

### Default Shortcuts

| Action | Windows | Mac |
|--------|---------|-----|
| Bold | Ctrl+B | ⌘+B |
| Italic | Ctrl+I | ⌘+I |
| Underline | Ctrl+U | ⌘+U |
| Create Bullet List | Ctrl+Shift+8 | ⌘+⇧+8 |
| Create Numbered List | Ctrl+Shift+9 | ⌘+⇧+9 |
| Create Heading 1 | Ctrl+Alt+1 | ⌘+⌥+1 |
| Create Code Block | Ctrl+Alt+K | ⌘+⌥+K |
| Duplicate Block | Ctrl+D | ⌘+D |
| Delete Block | Ctrl+Shift+D | ⌘+⇧+D |
| Indent | Tab or Ctrl+] | Tab or ⌘+] |
| Outdent | Shift+Tab or Ctrl+[ | ⇧+Tab or ⌘+[ |

### Custom Keyboard Configuration

```csharp
public IActionResult Index()
{
    var keyConfig = new 
    { 
        bold = "alt+b",
        italic = "alt+i",
        underline = "alt+u",
        strikethrough = "alt+s",
        link = "alt+l",
        undo = "ctrl+z",
        redo = "ctrl+y"
    };
    
    ViewBag.KeyConfig = keyConfig;
    return View();
}
```

```razor
<ejs-blockeditor id="block-editor" keyConfig="@ViewBag.KeyConfig">
</ejs-blockeditor>
```

## Read-Only Mode

Enable read-only mode to prevent editing while allowing viewing:

```razor
<ejs-blockeditor id="block-editor" 
                 readOnly="true"
                 blocks="@ViewBag.BlocksData">
</ejs-blockeditor>
```

### Toggle Read-Only Programmatically

```javascript
var blockEditorObj = ej.base.getInstance(
    document.getElementById('block-editor'),
    ejs.blockeditor.BlockEditor
);

// Enable read-only
blockEditorObj.readOnly = true;

// Disable read-only
blockEditorObj.readOnly = false;
```

### Complete Read-Only Example

```razor
<div id='blockeditor-container'>
    <div id="controls">
        <label>
            <input type="checkbox" id="readonlyToggle" onchange="toggleReadonly()" />
            Read-Only Mode
        </label>
    </div>
    
    <ejs-blockeditor id="block-editor" 
                     readOnly="false"
                     blocks="@ViewBag.BlocksData">
    </ejs-blockeditor>
</div>

<script>
    var blockEditorObj;
    
    function toggleReadonly() {
        var checkbox = document.getElementById('readonlyToggle');
        blockEditorObj = ej.base.getInstance(
            document.getElementById('block-editor'),
            ejs.blockeditor.BlockEditor
        );
        blockEditorObj.readOnly = checkbox.checked;
    }
</script>
```

## XSS Protection and HTML Sanitizer

### Enable HTML Sanitizer

The Block Editor provides built-in HTML sanitization to prevent XSS (Cross-Site Scripting) attacks. The `enableHtmlSanitizer` property controls this security feature and is **enabled by default** (`true`).

```razor
<ejs-blockeditor id="block-editor" 
                 enableHtmlSanitizer="true">
</ejs-blockeditor>
```

**Default Behavior (enableHtmlSanitizer="true"):**
- Automatically removes potentially harmful HTML tags and attributes
- Strips JavaScript event handlers (onclick, onload, onerror, etc.)
- Removes script, iframe, embed, and object tags
- Sanitizes content on paste and import operations
- Protects against XSS injection attacks

**When to Disable (enableHtmlSanitizer="false"):**
- When you have server-side sanitization and trust the content source
- When you need to preserve specific HTML that would be stripped
- When working with trusted, pre-sanitized content only

⚠️ **Security Warning:** Disabling the HTML sanitizer can expose your application to XSS vulnerabilities. Only disable if you have alternative security measures in place.

```razor
<!-- ⚠️ Use with caution - only for trusted content -->
<ejs-blockeditor id="block-editor" 
                 enableHtmlSanitizer="false">
</ejs-blockeditor>
```

### Automatic XSS Protection

When `enableHtmlSanitizer` is enabled (default), dangerous content is automatically sanitized:

```csharp
// Example: Dangerous content is automatically sanitized
var unsafeHtml = "<p>Safe content <script>alert('XSS')</script></p>";

// The script tag will be removed automatically
var sanitized = blockEditor.parseHtmlToBlocks(unsafeHtml);
// Result: <p>Safe content </p>
```

**Sanitization Examples:**

| Input HTML | Output (Sanitized) | Reason |
|------------|-------------------|---------|
| `<script>alert('XSS')</script>` | *(removed)* | JavaScript execution |
| `<iframe src="evil.com">` | *(removed)* | Frame injection |
| `<img onerror="alert('XSS')">` | `<img>` | Event handler removed |
| `<a href="javascript:alert()">` | `<a href="#">` | JavaScript protocol blocked |
| `<style>body{display:none}</style>` | *(removed)* | Style-based attacks |

### Configure Denied Tags for Additional Security

Use `deniedTags` in combination with `enableHtmlSanitizer` for layered security:

```razor
@{
    var deniedTags = new string[] 
    { 
        "script",      // Prevent JavaScript injection
        "iframe",      // Prevent frame-based attacks
        "form",        // Prevent form hijacking
        "input",       // Prevent form manipulation
        "embed",       // Prevent plugin execution
        "object",      // Prevent object loading
        "style",       // Prevent style-based attacks
        "link",        // Prevent external resource loading
        "meta"         // Prevent meta tag injection
    };
}

<ejs-blockeditor id="block-editor" 
                 enableHtmlSanitizer="true">
    <e-blockeditor-pastesettings deniedTags="@deniedTags">
    </e-blockeditor-pastesettings>
</ejs-blockeditor>
```

### HTML Encoding

For additional security, use `enableHtmlEncode` to encode HTML special characters:

```razor
<ejs-blockeditor id="block-editor" 
                 enableHtmlSanitizer="true"
                 enableHtmlEncode="true">
</ejs-blockeditor>
```

When `enableHtmlEncode` is `true`:
- `<` becomes `&lt;`
- `>` becomes `&gt;`
- `&` becomes `&amp;`
- `"` becomes `&quot;`
- `'` becomes `&#39;`

**Use Case:** Enable HTML encoding when you want to display HTML code as text rather than rendered HTML.

```razor
<!-- Example: Display HTML code as text -->
<ejs-blockeditor id="code-display-editor" 
                 enableHtmlEncode="true"
                 readOnly="true">
</ejs-blockeditor>
```

### Complete Security Configuration Example

```csharp
public IActionResult SecureEditor()
{
    // Configure security settings
    var deniedTags = new string[] 
    {
        "script", "iframe", "form", "input", "embed",
        "object", "style", "link", "meta"
    };
    
    ViewBag.DeniedTags = deniedTags;
    
    return View();
}
```

**View:**

```razor
@{
    var deniedTags = ViewBag.DeniedTags as string[];
}

<div id="secure-editor-container">
    <h3>Secure Block Editor</h3>
    <p>This editor has XSS protection enabled with strict content filtering.</p>
    
    <ejs-blockeditor id="secure-editor" 
                     enableHtmlSanitizer="true"
                     enableHtmlEncode="false"
                     height="400px">
        <e-blockeditor-pastesettings 
            deniedTags="@deniedTags"
            keepFormat="true">
        </e-blockeditor-pastesettings>
    </ejs-blockeditor>
</div>

<style>
    #secure-editor-container {
        margin: 20px auto;
        max-width: 900px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
</style>
```

### Testing XSS Protection

Test the sanitizer with potentially harmful content:

```razor
<ejs-blockeditor id="test-editor" 
                 enableHtmlSanitizer="true"
                 created="testXSSProtection">
</ejs-blockeditor>

<script>
    function testXSSProtection() {
        var blockEditorObj = ej.base.getInstance(
            document.getElementById('test-editor'),
            ejs.blockeditor.BlockEditor
        );
        
        // Test 1: Script injection
        var testHtml1 = '<p>Safe text <script>alert("XSS")</script></p>';
        var result1 = blockEditorObj.parseHtmlToBlocks(testHtml1);
        console.log('Test 1 - Script removed:', !result1.includes('<script>'));
        
        // Test 2: Event handler injection
        var testHtml2 = '<img src="x" onerror="alert(\'XSS\')">';
        var result2 = blockEditorObj.parseHtmlToBlocks(testHtml2);
        console.log('Test 2 - Event handler removed:', !result2.includes('onerror'));
        
        // Test 3: JavaScript protocol
        var testHtml3 = '<a href="javascript:alert(\'XSS\')">Click</a>';
        var result3 = blockEditorObj.parseHtmlToBlocks(testHtml3);
        console.log('Test 3 - JavaScript protocol blocked:', !result3.includes('javascript:'));
        
        console.log('XSS Protection: All tests passed ✓');
    }
</script>
```

### Best Practices for Security

1. **Always keep `enableHtmlSanitizer` enabled** unless you have a specific, well-understood reason to disable it
2. **Use `deniedTags`** to block additional tags specific to your security requirements
4. **Validate file uploads** using `beforeFileUpload` event
5. **Implement server-side validation** as a second layer of defense
6. **Sanitize data before storage** even with client-side protection
7. **Use Content Security Policy (CSP) headers** on your web server
8. **Regularly update** the Syncfusion BlockEditor package for security patches

## RTL (Right-to-Left) Support

Enable RTL layout for languages like Arabic, Hebrew, or Persian:

```razor
<ejs-blockeditor id="block-editor" 
                 enableRtl="true"
                 blocks="@ViewBag.BlocksData">
</ejs-blockeditor>
```

### CSS for RTL

```css
.e-rtl .e-blockeditor {
    direction: rtl;
    text-align: right;
}

.e-rtl .e-block {
    margin-left: auto;
    margin-right: 0;
}

.e-rtl .e-block.indent-1 {
    margin-left: auto;
    margin-right: 30px;
}
```

## Globalization and Localization

### Set Locale

```razor
<!-- German locale -->
<ejs-blockeditor id="block-editor" 
                 locale="de"
                 blocks="@ViewBag.BlocksData">
</ejs-blockeditor>

<!-- Spanish locale -->
<ejs-blockeditor id="block-editor" 
                 locale="es"
                 blocks="@ViewBag.BlocksData">
</ejs-blockeditor>

<!-- French locale -->
<ejs-blockeditor id="block-editor" 
                 locale="fr"
                 blocks="@ViewBag.BlocksData">
</ejs-blockeditor>
```

### Supported Locales

Common supported locales include:
- `en` - English (default)
- `de` - German
- `es` - Spanish
- `fr` - French
- `ja` - Japanese
- `zh` - Chinese
- `ar` - Arabic
- `hi` - Hindi
- And many others...

### Default Localization Keys

| Key | Default Text (en) |
|-----|-------------------|
| `paragraph` | Write something or '/' for commands. |
| `heading1` | Heading 1 |
| `heading2` | Heading 2 |
| `bulletList` | Add item |
| `numberedList` | Add item |
| `checklist` | Todo |
| `callout` | Write a callout |
| `insertLink` | Insert Link |
| `linkText` | Text |
| `codeCopyTooltip` | Copy code |

### Localization Example

```razor
@using Syncfusion.EJ2.BlockEditor

<ejs-blockeditor id="block-editor" 
                 locale="de"
                 blocks="@ViewBag.BlocksData">
</ejs-blockeditor>

<style>
    #blockeditor-container {
        margin: 20px auto;
    }
</style>
```

**Controller:**
```csharp
public IActionResult Index()
{
    var blocks = new List<BlockModel>
    {
        new BlockModel
        {
            id = "h1",
            blockType = "Heading",
            properties = new { level = 1 },
            content = new List<object>
            {
                new { contentType = "Text", content = "Mehrsprachige Unterstützung" }
            }
        }
    };
    
    ViewBag.BlocksData = blocks;
    return View();
}
```

## Advanced Features Complete Example

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    <div id="controls">
        <h3>Advanced Features</h3>
        <div>
            <label>
                <input type="checkbox" id="readonlyToggle" onchange="toggleReadonly()" />
                Read-Only Mode
            </label>
        </div>
        <div>
            <button onclick="undoBtn()">Undo</button>
            <button onclick="redoBtn()">Redo</button>
        </div>
        <div>
            <select id="localeSelect" onchange="changeLocale()">
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
            </select>
        </div>
        <div>
            <label>
                <input type="checkbox" id="rtlToggle" onchange="toggleRtl()" />
                RTL Mode
            </label>
        </div>
    </div>
    
    <ejs-blockeditor id="block-editor" 
                     readOnly="false"
                     locale="en"
                     enableRtl="false"
                     undoRedoStack="50"
                     blocks="@ViewBag.BlocksData">
        <e-blockeditor-pastesettings 
            deniedTags="@(new string[] { "script", "iframe", "form" })"
            keepFormat="true">
        </e-blockeditor-pastesettings>
    </ejs-blockeditor>
</div>

<style>
    #blockeditor-container {
        margin: 20px auto;
        max-width: 900px;
    }
    
    #controls {
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 5px;
        margin-bottom: 20px;
    }
    
    #controls > div {
        margin-bottom: 10px;
    }
    
    button, select {
        padding: 8px 16px;
        margin-right: 10px;
        background-color: #007acc;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    button:hover, select:hover {
        background-color: #005a9e;
    }
</style>

<script>
    var blockEditorObj;
    
    function undoBtn() {
        blockEditorObj = ej.base.getInstance(
            document.getElementById('block-editor'),
            ejs.blockeditor.BlockEditor
        );
        blockEditorObj.undo();
    }
    
    function redoBtn() {
        blockEditorObj.redo();
    }
    
    function toggleReadonly() {
        var checkbox = document.getElementById('readonlyToggle');
        blockEditorObj.readOnly = checkbox.checked;
    }
    
    function changeLocale() {
        var select = document.getElementById('localeSelect');
        blockEditorObj.locale = select.value;
    }
    
    function toggleRtl() {
        var checkbox = document.getElementById('rtlToggle');
        blockEditorObj.enableRtl = checkbox.checked;
    }
</script>
```

Advanced features enable you to create robust, secure, and user-friendly Block Editor instances with comprehensive content handling, internationalization, and accessibility support.
