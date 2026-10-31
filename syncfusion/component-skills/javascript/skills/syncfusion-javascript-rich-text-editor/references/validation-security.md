# Validation and Security

## Table of Contents
- [Form Integration](#form-integration)
- [XHTML Validation](#xhtml-validation)
- [HTML Sanitization (XSS)](#html-sanitization-xss)
- [Read-Only Mode](#read-only-mode)
- [Enabled / Disabled State](#enabled--disabled-state)

---

## Form Integration

The RTE can be used inside an HTML form. Initialize it on a `<textarea>` so the value is included in form submissions.

```html
<form id="myForm">
  <textarea id="editor" name="editorContent" required></textarea>
  <button type="submit">Submit</button>
</form>
```

```typescript
import { RichTextEditor, Toolbar, HtmlEditor, Count } from '@syncfusion/ej2-richtexteditor';
import { FormValidator } from '@syncfusion/ej2-inputs';
RichTextEditor.Inject(Toolbar, HtmlEditor, Count);

const editor = new RichTextEditor({
  showCharCount: true,
  maxLength: 1000,
  placeholder: 'Type here...'
});
editor.appendTo('#editor');

// Form validation
const formObj = new FormValidator('#myForm');

document.getElementById('myForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const value = editor.value;  // HTML or Markdown string
  const formData = new FormData(e.target as HTMLFormElement);
  console.log('Editor content:', value);
  // Send formData to server
});
```

### Validation rules

```typescript
const formObj = new FormValidator('#myForm', {
  rules: {
    editorContent: {
      required: true,
      minLength: 20,
      maxLength: 1000
    }
  }
});
```

---

## XHTML Validation

Enable continuous validation of the editor content against XHTML standards. Invalid elements and attributes are automatically removed.

```typescript
const editor = new RichTextEditor({
  enableXhtml: true
});
```

**What gets validated:**

| Check | Rule |
|-------|------|
| Tag case | All HTML tags must be lowercase |
| Attribute case | All attributes must be lowercase |
| Closing tags | All opening tags must have closing tags |
| Attribute quotes | Values must be quoted |
| Element validity | Only valid HTML elements allowed |
| Nesting | Inline elements cannot contain block elements |
| Root element | Content must have a single root element |

---

## HTML Sanitization (XSS)

The RTE includes built-in HTML sanitization to prevent cross-site scripting (XSS) attacks. Dangerous tags and attributes are filtered automatically.

```typescript
const editor = new RichTextEditor({
  enableHtmlSanitizer: true   // default: true — disable only if you fully trust the source
});
```

### Configure paste cleanup to block dangerous content

```typescript
const editor = new RichTextEditor({
  pasteCleanupSettings: {
    keepFormat: true,
    deniedTags: ['script', 'iframe', 'object', 'embed'],
    deniedAttrs: ['onclick', 'onload', 'onerror', 'onmouseover']
  }
});
```

---

## Read-Only Mode

Prevent all editing while still displaying formatted content:

```typescript
const editor = new RichTextEditor({
  readonly: true,
  value: '<p>This content cannot be edited.</p>'
});
```

Toggle read-only at runtime:

```typescript
editor.readonly = true;   // lock editor
editor.dataBind();

editor.readonly = false;  // unlock editor
editor.dataBind();
```

---

## Enabled / Disabled State

Completely disable the editor (prevents interactions and grays out UI):

```typescript
const editor = new RichTextEditor({
  enabled: false  // disables the editor
});
```

Toggle at runtime:

```typescript
editor.enabled = false;
editor.dataBind();

editor.enabled = true;
editor.dataBind();
```

| Property | Effect |
|----------|--------|
| `readonly: true` | Content visible; typing/toolbar disabled; no gray-out |
| `enabled: false` | Full component disabled; grayed out appearance |
