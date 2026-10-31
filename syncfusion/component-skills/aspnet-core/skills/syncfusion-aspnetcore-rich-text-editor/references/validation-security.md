# Validation and Security

## Table of Contents
- [Form Validation](#form-validation)
- [Read-Only Mode](#read-only-mode)
- [Disable the Editor](#disable-the-editor)
- [XSS Prevention](#xss-prevention)
- [Style Encapsulation](#style-encapsulation)
- [XHTML Validation](#xhtml-validation)

---

## Form Validation

Integrate the Rich Text Editor with ASP.NET Core form validation or the Syncfusion `FormValidator`.

### Required Field Validation

Use the `name` and `required` attributes to hook the editor into standard form validation. Provide a custom error message with `data-required-message` and specify the error container with `data-msg-containerid`:

```razor
<form id="rteForm" method="post">
    <div id="errorContainer"></div>
    <ejs-richtexteditor
        id="rteEditor"
        name="Content"
        required="true"
        data-required-message="Content is required."
        data-msg-containerid="errorContainer">
    </ejs-richtexteditor>
    <button type="button" onclick="submitForm()">Submit</button>
</form>
```

### FormValidator Integration

Use the Syncfusion `FormValidator` to programmatically validate on submit:

```razor
<form id="rteForm" method="post">
    <ejs-richtexteditor id="rteEditor" name="Content" change="updateFormValue">
    </ejs-richtexteditor>
    <input type="hidden" id="hiddenContent" name="Content" />
    <button type="button" onclick="validateAndSubmit()">Submit</button>
</form>
<script>
    var formValidator;

    window.onload = function () {
        formValidator = new ej.inputs.FormValidator('#rteForm', {
            rules: {
                Content: { required: [true, 'Content is required.'] }
            }
        });
    };

    function updateFormValue(args) {
        document.getElementById('hiddenContent').value = args.value;
    }

    function validateAndSubmit() {
        // Sync current RTE value to hidden input before validating
        var rte = document.getElementById('rteEditor').ej2_instances[0];
        document.getElementById('hiddenContent').value = rte.getHtml();
        if (formValidator.validate()) {
            document.getElementById('rteForm').submit();
        }
    }
</script>
```

### ASP.NET Core Model Binding

Accept the submitted HTML on the controller:

```csharp
[HttpPost]
public IActionResult Save([FromForm] string content)
{
    // Sanitize content before persisting
    ViewBag.savedContent = content;
    return View();
}
```

---

## Read-Only Mode

Render the editor as non-editable (users can see but not modify the content):

```razor
<ejs-richtexteditor id="editor" readonly="true" value="@ViewBag.value">
</ejs-richtexteditor>
```

Toggle read-only mode programmatically at runtime:

```javascript
var rte = document.getElementById('editor').ej2_instances[0];

// Enable read-only
rte.readonly = true;

// Disable read-only
rte.readonly = false;
```

In read-only mode:
- The toolbar is automatically disabled
- No cursor appears in the content area
- Content is still selectable and copyable

---

## Disable the Editor

Fully disable the editor (visually greyed out, no interaction possible):

```razor
<ejs-richtexteditor id="editor" enabled="false" value="@ViewBag.value">
</ejs-richtexteditor>
```

Toggle programmatically:

```javascript
var rte = document.getElementById('editor').ej2_instances[0];

rte.enabled = false; // disable
rte.enabled = true;  // re-enable
```

**Difference from `readonly`:** `enabled="false"` applies a disabled visual style and blocks all interactions, while `readonly` blocks editing but does not apply the disabled style.

---

## XSS Prevention

### Default Sanitizer

By default, `enableHtmlSanitizer` is `true`. The editor strips potentially dangerous tags (`<script>`, `<object>`, `<embed>`, etc.) and attributes (`onclick`, `onerror`, etc.) from content on paste or programmatic value set.

```razor
<!-- Default: sanitizer is on -->
<ejs-richtexteditor id="editor" enableHtmlSanitizer="true">
</ejs-richtexteditor>
```

> **Warning:** Do not disable `enableHtmlSanitizer` unless you apply server-side sanitization (e.g., HtmlSanitizer NuGet package or AntiXSS library).

### Custom Sanitizer via `beforeSanitizeHtml` Event

Use `beforeSanitizeHtml` to extend or override the default sanitizer. The event fires before any HTML is inserted into the editor:

```razor
<ejs-richtexteditor id="editor" beforeSanitizeHtml="onSanitize">
</ejs-richtexteditor>
<script>
    function onSanitize(args) {
        // Allow <iframe> tags by removing 'iframe' from the denied selectors
        args.selectors.tags = args.selectors.tags.filter(function (tag) {
            return tag !== 'iframe';
        });
    }
</script>
```

**Common `args` properties:**

| Property | Description |
|----------|-------------|
| `args.value` | The raw HTML string being sanitized |
| `args.selectors.tags` | Array of denied tag names (default includes `script`, `object`, `embed`, `iframe`, etc.) |
| `args.selectors.attributes` | Array of denied attribute names |
| `args.helper` | Function — call `args.helper(customHtml)` to replace sanitized output |
| `args.cancel` | Set `true` to skip the default sanitizer entirely (use with your own logic) |

### Custom Sanitizer Function

Replace the default sanitizer output entirely:

```javascript
function onSanitize(args) {
    // Use a custom library (e.g., DOMPurify) instead
    args.cancel = true;
    var clean = DOMPurify.sanitize(args.value, {
        ALLOWED_TAGS: ['p', 'b', 'i', 'ul', 'ol', 'li', 'br', 'a'],
        ALLOWED_ATTR: ['href', 'target']
    });
    args.helper(clean);
}
```

### Server-Side Validation

Always validate and sanitize HTML on the server before persisting:

```csharp
using Ganss.Xss;

[HttpPost]
public IActionResult Save([FromForm] string content)
{
    var sanitizer = new HtmlSanitizer();
    var safeHtml = sanitizer.Sanitize(content);
    // Persist safeHtml
    return Ok();
}
```

---

## Style Encapsulation

Prevent editor content styles from leaking to the page (or vice versa) by enabling IFrame mode:

```razor
<ejs-richtexteditor id="editor">
    <e-richtexteditor-iframesettings enable="true">
    </e-richtexteditor-iframesettings>
</ejs-richtexteditor>
```

In IFrame mode, the editor content lives inside a sandboxed `<iframe>` document, so global page CSS does not affect it and editor content CSS does not leak out. See `references/editor-modes.md` for full IFrame configuration.

---

## XHTML Validation

Ensure the editor output is valid XHTML by enabling strict XHTML validation:

```razor
<ejs-richtexteditor id="editor" showCharCount="true">
</ejs-richtexteditor>
```

The editor's built-in sanitizer normalises self-closing tags (e.g., `<br>` → `<br />`) and properly closes unclosed tags. For strict XHTML workflows, always sanitize the output on the server before serving as XHTML content.
