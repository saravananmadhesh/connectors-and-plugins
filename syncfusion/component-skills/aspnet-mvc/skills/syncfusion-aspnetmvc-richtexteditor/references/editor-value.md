# Editor Value and State

This document covers how to work with the Rich Text Editor's content value, retrieve it, and manage editor state.

> **Related Documentation:**
> - For complete property reference including `Value`, `SaveInterval`, `MaxLength`, and `ShowCharCount`, see [properties.md](properties.md)
> - For complete method reference including `getHtml()`, `getText()`, `getCharCount()`, and `selectRange()`, see [methods.md](methods.md)
> - For event handling including `Change` and `Created` events, see [events.md](events.md)

## Table of Contents
- [Setting Initial Content](#setting-initial-content)
- [Getting the Editor Value](#getting-the-editor-value)
- [Auto-Save with SaveInterval](#auto-save-with-saveinterval)
- [Updating Value on Form Submit](#updating-value-on-form-submit)
- [Setting Cursor Position](#setting-cursor-position)
- [Character Count](#character-count)

---

## Setting Initial Content

Pass initial HTML (or Markdown) content via `Value` using `ViewBag`:

```cshtml
@(Html.EJS().RichTextEditor("editor").Value(ViewBag.value).Render())
```

```csharp
public ActionResult Index()
{
    ViewBag.value = @"<p>Welcome to the <b>Rich Text Editor</b>.</p>
    <ul><li>Feature 1</li><li>Feature 2</li></ul>";
    return View();
}
```

For empty initial content, just omit `Value` or pass an empty string.

---

## Getting the Editor Value

**From the client side (JavaScript):**

```javascript
var rteObj = document.getElementById('editor').ej2_instances[0];

// Get the full HTML content
var htmlContent = rteObj.getHtml();

// Get the text content (no HTML tags)
var textContent = rteObj.getText();

// Get the current value property
var value = rteObj.value;
```

**On form submit — hidden field pattern:**

Bind the editor value to a hidden input so it submits with the form:

```cshtml
<form method="post" action="/Home/Save">
    @(Html.EJS().RichTextEditor("editor")
        .Value(ViewBag.value)
        .Change("syncValue")
        .Render())

    <input type="hidden" id="editorContent" name="Content" value="@ViewBag.value" />
    <button type="submit">Save</button>
</form>

<script>
    function syncValue() {
        var rteObj = document.getElementById('editor').ej2_instances[0];
        document.getElementById('editorContent').value = rteObj.value;
    }
</script>
```

```csharp
[HttpPost]
public ActionResult Save(string Content)
{
    // Content holds the HTML from the editor
    // Save to database
    return RedirectToAction("Index");
}
```

---

## Auto-Save with SaveInterval

The editor fires the `Change` event whenever content changes. Use `SaveInterval` to debounce and auto-save at a set interval (in milliseconds):

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .SaveInterval(5000)
    .Value(ViewBag.value)
    .Change("autoSave")
    .Render())

<script>
    function autoSave() {
        var rteObj = document.getElementById('editor').ej2_instances[0];
        var content = rteObj.value;

        fetch('/Home/AutoSave', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: content })
        });
    }
</script>
```

```csharp
[HttpPost]
public ActionResult AutoSave(string content)
{
    // Save draft to DB or session
    return Json(new { success = true });
}
```

---

## Updating Value on Form Submit

A reliable pattern for form submission — update the hidden field on submit rather than on every change:

```cshtml
<form id="saveForm" method="post" action="/Home/Save">
    @(Html.EJS().RichTextEditor("editor").Value(ViewBag.value).Render())
    <input type="hidden" id="hiddenContent" name="Content" />
    <button type="button" onclick="submitForm()">Save</button>
</form>

<script>
    function submitForm() {
        var rteObj = document.getElementById('editor').ej2_instances[0];
        document.getElementById('hiddenContent').value = rteObj.value;
        document.getElementById('saveForm').submit();
    }
</script>
```

---

## Setting Cursor Position

Place the cursor at a specific position programmatically using `setRange`:

```javascript
var rteObj = document.getElementById('editor').ej2_instances[0];

// Focus the editor first
rteObj.focusIn();

// Create a range and set it
var range = document.createRange();
var editPanel = rteObj.contentModule.getEditPanel();

// Place cursor at the start of the editor
range.setStart(editPanel, 0);
range.collapse(true);

var selection = window.getSelection();
selection.removeAllRanges();
selection.addRange(range);
```

**Place cursor at the end:**

```javascript
rteObj.focusIn();
var range = document.createRange();
range.selectNodeContents(rteObj.contentModule.getEditPanel());
range.collapse(false); // collapse to end
var sel = window.getSelection();
sel.removeAllRanges();
sel.addRange(range);
```

---

## Character Count

Display a character counter below the editor to show current length against the max:

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .ShowCharCount(true)
    .MaxLength(500)
    .Value(ViewBag.value)
    .Render())
```

- `ShowCharCount(true)` — displays `n / MaxLength` at the bottom
- `MaxLength` — hard limit; the editor stops accepting input when reached

> `MaxLength` counts the characters of the text content (not HTML tags). In Markdown mode, it counts raw Markdown characters.
