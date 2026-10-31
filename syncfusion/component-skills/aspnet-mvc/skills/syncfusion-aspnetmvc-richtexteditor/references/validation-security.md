# Validation and Security

## Table of Contents
- [MaxLength and Character Count](#maxlength-and-character-count)
- [Form Validation Integration](#form-validation-integration)
- [XHTML Validation](#xhtml-validation)
- [Prevent Cross-Site Scripting (XSS)](#prevent-cross-site-scripting-xss)
- [Read-Only Mode](#read-only-mode)
- [Disabling the Editor](#disabling-the-editor)

---

## MaxLength and Character Count

Restrict the maximum number of characters a user can type and display a live counter:

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .MaxLength(1000)
    .ShowCharCount(true)
    .Value(ViewBag.value)
    .Render())
```

- The counter shows `current / max` at the bottom right of the editor
- Once `MaxLength` is reached, the editor stops accepting input (toolbar items that would add text are disabled)
- `MaxLength` counts text characters, not HTML tag characters

---

## Form Validation Integration

Integrate the RTE with ASP.NET MVC form validation so the editor field is treated as a required element.

**Basic required-field validation:**

```cshtml
@using (Html.BeginForm("Save", "Home", FormMethod.Post, new { id = "articleForm" }))
{
    @(Html.EJS().RichTextEditor("editor")
        .Value(ViewBag.value)
        .Change("syncHiddenField")
        .Render())

    <input type="hidden" id="hiddenContent" name="Content" required />
    <span id="validationMsg" class="text-danger" style="display:none">Content is required.</span>
    <button type="button" onclick="validateAndSubmit()">Submit</button>
}

<script>
    function syncHiddenField() {
        var rteObj = document.getElementById('editor').ej2_instances[0];
        document.getElementById('hiddenContent').value = rteObj.value;
    }

    function validateAndSubmit() {
        var rteObj = document.getElementById('editor').ej2_instances[0];
        var content = rteObj.getText().trim();

        if (!content || content.length === 0) {
            document.getElementById('validationMsg').style.display = 'block';
            return;
        }

        document.getElementById('validationMsg').style.display = 'none';
        document.getElementById('hiddenContent').value = rteObj.value;
        document.getElementById('articleForm').submit();
    }
</script>
```

**Using Syncfusion FormValidator:**

```javascript
var formObj = new ej.inputs.FormValidator('#articleForm', {
    rules: {
        Content: { required: true }
    },
    customPlacement: function (element, error) {
        element.parentElement.appendChild(error);
    }
});
```

---

## XHTML Validation

Enable XHTML validation to ensure the editor output conforms to XHTML standards (self-closing tags, lowercase elements, quoted attributes):

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .EnableXhtml(true)
    .Value(ViewBag.value)
    .Render())
```

When `EnableXhtml` is `true`, the editor output is normalized to valid XHTML — useful when the content will be processed by XML parsers or stored in XHTML-strict systems.

---

## Prevent Cross-Site Scripting (XSS)

The RTE includes built-in XSS prevention. Enable it to sanitize pasted or programmatically inserted HTML and strip dangerous tags like `<script>`, `<iframe>`, event handlers (`onclick`, `onerror`), and `javascript:` URLs:

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .EnableHtmlSanitizer(true)
    .Value(ViewBag.value)
    .Render())
```

> `EnableHtmlSanitizer` is `true` by default. Only set it to `false` if you have a trusted server-side sanitizer handling content before storage, since turning it off allows raw HTML injection.

**Server-side sanitization** (recommended for user-generated content):

Even with client-side sanitization, always sanitize on the server before persisting:

```csharp
using AngleSharp.Html.Parser;

[HttpPost]
public ActionResult Save(string content)
{
    // Use a library like HtmlSanitizer or AngleSharp to sanitize
    var sanitized = HtmlSanitizer.Sanitize(content);
    // Save sanitized to DB
    return RedirectToAction("Index");
}
```

---

## Read-Only Mode

Render the editor in read-only mode so users can view but not edit the content:

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .ReadOnly(true)
    .Value(ViewBag.value)
    .Render())
```

**Toggle read-only programmatically:**

```javascript
var rteObj = document.getElementById('editor').ej2_instances[0];

// Enable read-only
rteObj.readonly = true;

// Disable read-only (allow editing)
rteObj.readonly = false;
```

---

## Disabling the Editor

Disable the entire editor (grays it out and blocks all interaction):

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .Enabled(false)
    .Value(ViewBag.value)
    .Render())
```

**Toggle enabled state programmatically:**

```javascript
var rteObj = document.getElementById('editor').ej2_instances[0];

// Disable
rteObj.enabled = false;

// Re-enable
rteObj.enabled = true;
```

> **Read-only vs Disabled:**
> - `ReadOnly` — user sees formatted content, can select/copy text, toolbar is hidden/inactive
> - `Disabled` — editor is grayed out, cannot receive focus, used for form states (e.g., conditional field)
