# Customization

## Table of Contents
- [Custom Toolbar Tools](#custom-toolbar-tools)
- [Built-In Toolbar Items Reference](#built-in-toolbar-items-reference)
- [CSS Customization](#css-customization)
- [Enter / Shift+Enter Key Behaviour](#enter--shiftenter-key-behaviour)
- [execCommand API](#execcommand-api)
- [CodeMirror Integration](#codemirror-integration)
- [Toolbar Item Enable / Disable](#toolbar-item-enable--disable)

---

## Custom Toolbar Tools

### Template-Based Custom Button

Add a custom button to the toolbar using the `template` property of a toolbar item:

```csharp
// Controller
public IActionResult Index()
{
    ViewBag.items = new object[] {
        "Bold", "Italic", "Underline", "|",
        new
        {
            tooltipText = "Insert Date",
            template = "<button id='insertDateBtn' class='e-tbar-btn e-control'>Insert Date</button>"
        },
        "|", "Undo", "Redo"
    };
    return View();
}
```

```razor
<ejs-richtexteditor id="editor" created="onCreated">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
<script>
    function onCreated() {
        var rte = document.getElementById('editor').ej2_instances[0];
        document.getElementById('insertDateBtn').addEventListener('click', function () {
            rte.executeCommand('insertText', new Date().toLocaleDateString());
        });
    }
</script>
```

### Custom Tool with Dropdown

```csharp
new
{
    tooltipText = "Special Characters",
    template = "<button id='specialCharBtn' class='e-tbar-btn e-control'>Ω</button>"
}
```

```javascript
function onCreated() {
    var rte = document.getElementById('editor').ej2_instances[0];
    document.getElementById('specialCharBtn').addEventListener('click', function () {
        rte.focusIn();
        rte.executeCommand('insertHTML', '<span>©</span>');
    });
}
```

---

## Built-In Toolbar Items Reference

### HTML Mode Items

| Item | Description |
|------|-------------|
| `Bold` | Bold text |
| `Italic` | Italic text |
| `Underline` | Underline text |
| `StrikeThrough` | Strikethrough text |
| `InlineCode` | Inline code style |
| `SubScript` | Subscript |
| `SuperScript` | Superscript |
| `LowerCase` | Converts to lowercase |
| `UpperCase` | Converts to uppercase |
| `FontName` | Font family picker |
| `FontSize` | Font size picker |
| `FontColor` | Font colour picker |
| `BackgroundColor` | Background colour picker |
| `Formats` | Paragraph format (Heading 1–4, Paragraph, Pre, Blockquote) |
| `Alignments` | Text alignment (Left, Center, Right, Justify) |
| `OrderedList` | Ordered (numbered) list |
| `UnorderedList` | Unordered (bullet) list |
| `Indent` | Increase indent |
| `Outdent` | Decrease indent |
| `CreateLink` | Insert/edit hyperlink |
| `Image` | Insert image |
| `Video` | Insert video |
| `Audio` | Insert audio |
| `CreateTable` | Insert table |
| `RemoveFormat` | Clear all formatting |
| `FormatPainter` | Copy format from selection |
| `ClearFormat` | Remove inline formatting |
| `SourceCode` | Toggle HTML source view |
| `FullScreen` | Toggle fullscreen mode |
| `Undo` | Undo last action |
| `Redo` | Redo last undone action |
| `Print` | Print editor content |
| `EmojiPicker` | Open emoji picker |
| `SlashMenu` | Open slash command menu |
| `AICommands` | Open AI predefined commands panel |
| `AIQuery` | Open AI query input (Alt+Enter) |
| `ImportWord` | Import .docx file |
| `ExportWord` | Export to .docx |
| `ExportPdf` | Export to PDF |

### Separator

Use `"|"` between items in the toolbar items array to add a visual separator.

### Markdown Mode Items

| Item | Description |
|------|-------------|
| `Bold` | `**Bold**` syntax |
| `Italic` | `_Italic_` syntax |
| `StrikeThrough` | `~~Strike~~` syntax |
| `OrderedList` | `1. item` syntax |
| `UnorderedList` | `- item` syntax |
| `SuperScript` | Superscript tag |
| `SubScript` | Subscript tag |
| `Header1`–`Header6` | `# Heading` syntax |
| `Blockquote` | `> Quote` syntax |
| `CreateLink` | Insert Markdown link |
| `Image` | Insert Markdown image |
| `CreateTable` | Insert Markdown table |
| `Undo` | Undo |
| `Redo` | Redo |
| `Preview` | Toggle Markdown preview (requires Marked.js) |

---

## CSS Customization

### Editor Container

```css
/* Adjust the overall editor border and shadow */
.e-richtexteditor {
    border: 1px solid #0078d4;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### Toolbar

```css
/* Style the toolbar background */
.e-richtexteditor .e-rte-toolbar {
    background-color: #f0f4ff;
}
```

### Content Area

```css
/* Style the editable area */
.e-richtexteditor .e-rte-content .e-content {
    font-family: 'Georgia', serif;
    font-size: 14px;
    line-height: 1.8;
    padding: 16px;
}
```

### Character Count

```css
/* Style the character count display */
.e-richtexteditor .e-rte-character-count {
    font-size: 11px;
    color: #666;
}
```

### Placeholder Text

```css
.e-richtexteditor .e-rte-placeholder {
    color: #aaaaaa;
    font-style: italic;
}
```

### Fixed Height (No Resize)

```css
.e-richtexteditor .e-rte-content {
    height: 300px;
    overflow-y: auto;
}
```

---

## Enter / Shift+Enter Key Behaviour

Control what element is inserted when the user presses Enter or Shift+Enter:

```razor
<ejs-richtexteditor id="editor" enterKey="DIV" shiftEnterKey="BR">
</ejs-richtexteditor>
```

| Property | Options | Default | Description |
|----------|---------|---------|-------------|
| `enterKey` | `P`, `DIV`, `BR` | `P` | Element created on pressing Enter |
| `shiftEnterKey` | `P`, `DIV`, `BR` | `BR` | Element created on pressing Shift+Enter |

---

## execCommand API

Use `executeCommand` to programmatically apply formatting or insert content:

```javascript
var rte = document.getElementById('editor').ej2_instances[0];

// Apply formatting
rte.executeCommand('bold');
rte.executeCommand('italic');
rte.executeCommand('underline');

// Insert text at the cursor position
rte.executeCommand('insertText', 'Inserted text');

// Insert HTML at the cursor position
rte.executeCommand('insertHTML', '<span style="color:red">Red text</span>');

// Set font size
rte.executeCommand('fontSize', '18pt');

// Set font name
rte.executeCommand('fontName', 'Arial');

// Set heading
rte.executeCommand('formatBlock', 'h2');
```

### Common `executeCommand` Values

| Command | Value | Description |
|---------|-------|-------------|
| `bold` | — | Toggle bold |
| `italic` | — | Toggle italic |
| `underline` | — | Toggle underline |
| `insertText` | `string` | Insert text at cursor |
| `insertHTML` | `HTML string` | Insert HTML at cursor |
| `fontSize` | e.g. `'14pt'` | Set font size |
| `fontName` | e.g. `'Arial'` | Set font family |
| `formatBlock` | `'h1'`–`'h6'`, `'p'`, `'pre'` | Apply block format |
| `justifyLeft` | — | Align left |
| `justifyCenter` | — | Align centre |
| `createLink` | URL string | Insert a link |
| `removeFormat` | — | Clear inline formatting |

---

## CodeMirror Integration

Enhance the SourceCode view with syntax-highlighted HTML editing via CodeMirror 5:

**1. Install CodeMirror:**

```bash
npm install codemirror@5
```

Or add CDN links:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/xml/xml.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/htmlmixed/htmlmixed.min.js"></script>
```

**2. Wire CodeMirror to the SourceCode view:**

```razor
<ejs-richtexteditor id="editor" actionComplete="onActionComplete">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
<script>
    var codeMirrorObj;

    function onActionComplete(args) {
        if (args.requestType === 'SourceCode') {
            var textArea = document.getElementById('editor').querySelector('.e-rte-srctextarea');
            if (textArea && !codeMirrorObj) {
                codeMirrorObj = CodeMirror.fromTextArea(textArea, {
                    mode: 'htmlmixed',
                    lineNumbers: true,
                    theme: 'default'
                });
                codeMirrorObj.on('change', function () {
                    textArea.value = codeMirrorObj.getValue();
                });
            }
        } else if (args.requestType === 'Preview') {
            if (codeMirrorObj) {
                codeMirrorObj.toTextArea();
                codeMirrorObj = null;
            }
        }
    }
</script>
```

---

## Toolbar Item Enable / Disable

Enable or disable specific toolbar items at runtime:

```javascript
var rte = document.getElementById('editor').ej2_instances[0];

// Disable the Bold toolbar item
rte.disableToolbarItem(['Bold']);

// Enable the Bold toolbar item
rte.enableToolbarItem(['Bold']);
```

Use this to restrict formatting options based on user role or context (e.g., disable font options in a constrained input).
