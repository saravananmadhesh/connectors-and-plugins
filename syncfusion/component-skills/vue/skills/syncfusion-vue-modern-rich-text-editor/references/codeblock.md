# Code Block in Vue Modern Rich Text Editor

## Table of Contents

- [Overview](#overview)
- [Commands Support](#commands-support)
- [Basic Configuration](#basic-configuration)
- [Language Selection](#language-selection)
- [Example](#example)
- [API References](#api-references)

---

## Overview

A code block inserts a `<pre>` element at the current selection and tags it with a language identifier for syntax highlighting. Code blocks are ideal for displaying code snippets with proper formatting and highlighting.

The Modern Rich Text Editor exposes the code block through:
- **Toolbar:** `CodeBlock` built-in toolbar identifier
- **Keyboard Shortcut:** `Ctrl+Shift+B` (Windows/Linux) / `⌘ ⇧ B` (macOS)
- **Commands:** `codeBlock` command builder

**Note:** There is no dedicated slash-command entry for code blocks; users reach it through the toolbar or programmatic commands.

---

## Commands Support

The `codeBlock` command accepts a `CodeBlockCommand` payload with a `language` property:

```ts
{ language: string }
```

The `language` value is the language identifier applied to the code block — this enables syntax highlighting and proper formatting.

Common language identifiers include:
- `"javascript"` / `"js"` — JavaScript
- `"typescript"` / `"ts"` — TypeScript
- `"html"` — HTML
- `"css"` — CSS
- `"python"` — Python
- `"java"` — Java
- `"cpp"` / `"c++"` — C++
- `"csharp"` / `"cs"` — C#
- `"plaintext"` / `""` — Plain text (no highlighting)

| Command | Payload | Toolbar Item | Keyboard Shortcut |
|---------|---------|--------------|------------------|
| `codeBlock` | `CodeBlockCommand` (`{ language: string }`) | `CodeBlock` | `Ctrl+Shift+B` / `⌘ ⇧ B` |

---

## Basic Configuration

Add the `CodeBlock` toolbar item next to other block-format buttons:

```ts
const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', '|',
    'Formats', 'Alignment', '|',
    'CodeBlock', 'Quote', 'HorizontalLine', '|',
    'Undo', 'Redo'
  ]
};
```

---

## Language Selection

Code blocks can be inserted with specific language identifiers for syntax highlighting. When users insert a code block, they can specify the language:

```ts
// Programmatic insertion with language
editor.value.ej2Instances.commands().codeBlock().language('javascript').apply();
```

Common language choices:

| Language | Identifier |
|----------|-----------|
| JavaScript | `javascript` or `js` |
| TypeScript | `typescript` or `ts` |
| Python | `python` or `py` |
| HTML | `html` |
| CSS | `css` |
| SQL | `sql` |
| JSON | `json` |
| XML | `xml` |
| Bash/Shell | `bash` or `sh` |

---

## Example

Complete example with code block support:

```html
<template>
  <ejs-richtexteditor-ui
    ref="editor"
    :toolbarSettings="toolbarSettings"
    placeholder="Insert code snippets..."
    @change="onContentChange">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { ref, provide } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', '|',
    'Formats', 'Alignment', '|',
    'CodeBlock', 'Quote', 'HorizontalLine', '|',
    'Undo', 'Redo'
  ]
};

const onContentChange = (args) => {
  console.log('Content changed');
};
</script>
```

**User Interaction:**

**Via Toolbar:**
1. Place cursor where you want to insert code
2. Click the `CodeBlock` toolbar button
3. A code block is inserted with default language
4. Type or paste your code into the block

**Via Keyboard Shortcut:**
1. Place cursor where you want to insert code
2. Press `Ctrl+Shift+B` (Windows/Linux) or `⌘ ⇧ B` (macOS)
3. A code block is inserted

**Programmatic Insertion:**
```ts
const insertJavaScriptCode = () => {
  editor.value.ej2Instances.commands()
    .codeBlock()
    .language('javascript')
    .apply();
};
```

The inserted code block provides:
- Syntax highlighting based on the specified language
- Proper formatting and indentation
- Monospace font for better readability
- Visual distinction from regular text

---

## Keyboard Shortcuts

### Insert Code Block

**Windows/Linux:** <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>
**macOS:** <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>

Converts the current block into a preformatted code snippet.

---

## API References

### CodeBlockCommandBuilder

Insert code blocks with syntax highlighting.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/codeblockcommandbuilder`

**Usage Example:**

```typescript
editor.value?.executeCommand({
  command: 'CodeBlock',
  value: {
    language: 'javascript',
    code: 'console.log("Hello World");'
  }
});
```

---

## Related Documentation

- [Collapsible](collapsible.md)
- [Formatting](formatting.md)
- [Block Quote](block-quote.md)
- [Getting Started](getting-started.md)

