# Editor Value (Get/Set/Save)

## Table of Contents
- [Set Initial Content](#set-initial-content)
- [Get Content](#get-content)
- [Change Event and Auto-Save](#change-event-and-auto-save)
- [Character Count and Max Length](#character-count-and-max-length)
- [Encoded HTML Output](#encoded-html-output)
- [Source Code Editing](#source-code-editing)
- [Placeholder Text](#placeholder-text)
- [Applying Content Styles Outside Editor](#applying-content-styles-outside-editor)

---

## Set Initial Content

### Using `value` property

```typescript
const editor = new RichTextEditor({
  value: '<p>Hello <strong>World</strong></p>'  // HTML for HTML mode
});
// For Markdown mode:
// value: '## Hello\n\n**World**'
```

### Using `valueTemplate`

When you want to render dynamic or complex content with a template:

```typescript
const editor = new RichTextEditor({
  valueTemplate: document.getElementById('rte-template')  // a script/template element
});
```

### Setting value programmatically after creation

```typescript
editor.value = '<p>New content set programmatically</p>';
editor.dataBind(); // required to apply the change
```

---

## Get Content

### `editor.value`

Returns the current HTML (or Markdown) string:

```typescript
const htmlContent = editor.value;
console.log(htmlContent); // '<p>Hello <strong>World</strong></p>'
```

### `editor.getHtml()`

Same as `editor.value` for HTML mode — returns the full HTML string:

```typescript
const html = editor.getHtml();
```

### `editor.getText()`

Returns plain text without HTML tags:

```typescript
const plainText = editor.getText();
```

### Get value in a form

On a `<textarea>`-based editor, the textarea's value is automatically synced — read it directly from the form:

```typescript
const form = document.getElementById('myForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const content = editor.value; // HTML or Markdown string
  submitToServer(content);
});
```

---

## Change Event and Auto-Save

### `change` event

Fires when the editor loses focus and content has changed since the last save:

```typescript
import { ChangeEventArgs } from '@syncfusion/ej2-richtexteditor';

const editor = new RichTextEditor({
  change: (args: ChangeEventArgs) => {
    console.log('Content changed:', args.value);
    saveToDatabase(args.value);
  }
});
```

### Auto-save on idle

Set `saveInterval` (milliseconds) to trigger `change` automatically after inactivity:

```typescript
const editor = new RichTextEditor({
  saveInterval: 3000,   // save every 3 seconds of idle time
  change: (args) => {
    localStorage.setItem('autosave-draft', args.value);
  }
});
```

---

## Character Count and Max Length

Requires injecting the `Count` module.

```typescript
import { RichTextEditor, Toolbar, HtmlEditor, Count } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor, Count);

const editor = new RichTextEditor({
  showCharCount: true,   // displays count at bottom-right
  maxLength: 2000        // optional: limit characters
});
editor.appendTo('#editor');
```

**Character count color indicators:**

| Threshold | Color | Meaning |
|-----------|-------|---------|
| < 70% of `maxLength` | Black | Normal |
| ≥ 70% | Orange | Warning — approaching limit |
| ≥ 90% | Red | Error — nearly at limit |

**Get count programmatically:**

```typescript
const count = editor.getCharCount();
console.log(`Characters used: ${count}`);
```

---

## Encoded HTML Output

When you need to store HTML in a way that won't be interpreted by the browser (e.g., displaying it as code):

```typescript
const editor = new RichTextEditor({
  enableHtmlEncode: true,
  value: '&lt;p&gt;Encoded content&lt;/p&gt;'
});
// editor.value returns HTML-encoded string
```

---

## Source Code Editing

Add the `SourceCode` toolbar item to let users directly edit raw HTML. The editor switches between the visual view and a code view:

```typescript
const editor = new RichTextEditor({
  toolbarSettings: {
    items: ['Bold', 'Italic', '|', 'SourceCode', 'Undo', 'Redo']
  }
});

// Programmatically toggle source view:
editor.showSourceCode(); // switches to/from code view
```

**Integrate CodeMirror for syntax highlighting in source view:**

```typescript
import CodeMirror from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';

// Listen for the actionComplete event
editor.actionComplete = (e) => {
  if (e.targetItem === 'SourceCode') {
    // render CodeMirror in the source view container
    const container = editor.element.querySelector('.e-rte-srctextarea');
    CodeMirror(container, {
      value: editor.value ?? '',
      lineNumbers: true,
      mode: 'text/html',
      lineWrapping: true
    });
  }
};
```

---

## Placeholder Text

Show a hint when the editor is empty:

```typescript
const editor = new RichTextEditor({
  placeholder: 'Start typing your content here...'
});
```

Style the placeholder:

```css
.e-richtexteditor .e-rte-placeholder {
  font-family: monospace;
  color: #aaa;
  font-style: italic;
}
```

---

## Applying Content Styles Outside Editor

When rendering editor content outside the RTE (e.g., in a preview pane), wrap it in a container with `e-rte-content` class and apply these styles:

```css
.e-rte-content p { margin: 0 0 10px; }
.e-rte-content li { margin-bottom: 10px; }
.e-rte-content h1 { font-size: 2.17em; font-weight: 400; margin: 10px 0; }
.e-rte-content h2 { font-size: 1.74em; font-weight: 400; margin: 10px 0; }
.e-rte-content h3 { font-size: 1.31em; font-weight: 400; margin: 10px 0; }
.e-rte-content blockquote { border-left: solid 2px #333; margin-left: 0; padding-left: 5px; }
.e-rte-content a { color: #2e2ef1; text-decoration: none; }
.e-rte-content a:hover { text-decoration: underline; }
.e-rte-content .e-rte-table { border-collapse: collapse; }
.e-rte-content .e-rte-table td,
.e-rte-content .e-rte-table th { border: 1px solid #bdbdbd; padding: 2px 5px; min-width: 20px; }
```

```html
<div class="e-rte-content">
  <!-- Paste editor.value here for server-side or client-side rendering -->
</div>
```
