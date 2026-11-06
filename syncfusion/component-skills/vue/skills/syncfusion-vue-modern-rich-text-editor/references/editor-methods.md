# Editor Methods Reference

This reference covers all public methods exposed by the Modern Rich Text Editor component for programmatic control of the editor, content access, and toolbar management.

## Table of Contents

- [Overview](#overview)
- [Method Access via Component Ref](#method-access-via-component-ref)
- [Content Management Methods](#content-management-methods)
- [Focus Control Methods](#focus-control-methods)
- [Document Access Methods](#document-access-methods)
- [Toolbar Management Methods](#toolbar-management-methods)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Customizing Keyboard Shortcuts](#customizing-keyboard-shortcuts)
- [Complete Example](#complete-example)

---

## Overview

The Syncfusion Modern Rich Text Editor exposes a set of public methods on the component instance that let you programmatically interact with the editor. These methods enable you to:

- Read and persist content
- Control editor focus
- Access the underlying document model
- Update toolbar items dynamically
- Manage editor state

---

## Method Access via Component Ref

In Vue, every method is invoked on the editor component instance obtained through a template ref.

### Accessing the Editor Instance

Declare a ref named `editor` on the editor component:

```html
<template>
  <ejs-richtexteditor-ui ref="editor"></ejs-richtexteditor-ui>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

// Access the underlying EJ2 instance via editor.value.ej2Instances
// const content = editor.value.ej2Instances.getHtml();
</script>
```

### Accessing Methods

Methods are invoked on `editor.value.ej2Instances`:

```typescript
editor.value.ej2Instances.save();
editor.value.ej2Instances.focusIn();
const html = editor.value.ej2Instances.getHtml();
```

---

## Content Management Methods

### save()

Persists the current editor content into the component's `value` property. Calling `save()` ensures the editor's value is synchronized with any external bindings or properties.

```html
<template>
  <div>
    <ejs-richtexteditor-ui ref="editor"></ejs-richtexteditor-ui>
    <button @click="saveContent">Save Content</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const saveContent = () => {
  editor.value.ej2Instances.save();
  console.log('Content saved');
};
</script>
```

**Use cases:**
- Persist content before unloading the page
- Update component properties with current editor state
- Prepare content for transmission or storage

---

## Focus Control Methods

### focusIn()

Moves focus into the editor's editable area and triggers the editor's focus-in handling (same as if the user clicked inside the editor).

```html
<template>
  <div>
    <ejs-richtexteditor-ui ref="editor"></ejs-richtexteditor-ui>
    <button @click="focusEditor">Focus Editor</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const focusEditor = () => {
  editor.value.ej2Instances.focusIn();
  console.log('Editor focused');
};
</script>
```

**Use cases:**
- Move focus to editor after form validation
- Programmatically activate the editor for keyboard input
- Guide user interaction flow

### focusOut()

Removes focus from the editor's editable area and triggers the editor's focus-out handling (same as if the user clicked outside the editor).

```html
<template>
  <div>
    <ejs-richtexteditor-ui ref="editor"></ejs-richtexteditor-ui>
    <button @click="blurEditor">Blur Editor</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const blurEditor = () => {
  editor.value.ej2Instances.focusOut();
  console.log('Editor blurred');
};
</script>
```

**Use cases:**
- Close the editor when user submits a form
- Trigger content validation
- Move focus to the next field in a workflow

---

## Document Access Methods

### getDocument()

Returns the current editor's document (the underlying DOM document or document model).

```html
<template>
  <div>
    <ejs-richtexteditor-ui ref="editor"></ejs-richtexteditor-ui>
    <button @click="getEditorDocument">Get Document</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const getEditorDocument = () => {
  const document = editor.value.ej2Instances.getDocument();
  console.log('Editor document:', document);
};
</script>
```

**Use cases:**
- Access the underlying DOM for custom processing
- Query specific elements within the editor
- Perform advanced content manipulation

### getHtml()

Returns the current editor content as an HTML string.

```html
<template>
  <div>
    <ejs-richtexteditor-ui ref="editor"></ejs-richtexteditor-ui>
    <button @click="getHtmlContent">Get HTML</button>
    <div id="htmlOutput" style="margin-top: 15px; padding: 10px; background-color: #f0f0f0;"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const getHtmlContent = () => {
  const html = editor.value.ej2Instances.getHtml();
  const outputElement = document.getElementById('htmlOutput');
  if (outputElement) {
    outputElement.textContent = html;
  }
};
</script>
```

**Use cases:**
- Export content as HTML for storage or transmission
- Display formatted content in another location
- Validate HTML structure programmatically
- Prepare content for server submission

### getText()

Returns the current editor content as plain text (all formatting and HTML tags removed).

```html
<template>
  <div>
    <ejs-richtexteditor-ui ref="editor"></ejs-richtexteditor-ui>
    <button @click="getTextContent">Get Plain Text</button>
    <div id="textOutput" style="margin-top: 15px; padding: 10px; background-color: #f0f0f0;"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const getTextContent = () => {
  const text = editor.value.ej2Instances.getText();
  const outputElement = document.getElementById('textOutput');
  if (outputElement) {
    outputElement.textContent = text;
  }
};
</script>
```

**Use cases:**
- Extract plain text for search or indexing
- Display plain text preview of formatted content
- Calculate word or character count
- Prepare content for SMS or plain-text channels

### getText() Word Count Example

```typescript
const getWordCount = () => {
  const text = editor.value.ej2Instances.getText();
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  console.log('Word count:', words);
  return words;
};

const getCharacterCount = () => {
  const text = editor.value.ej2Instances.getText();
  const chars = text.length;
  console.log('Character count:', chars);
  return chars;
};
```

---

## Toolbar Management Methods

### updateToolbarItems()

Applies a batch of toolbar item updates (add, remove, reorder) to the editor's toolbar. The editor reconciles only what changed rather than re-rendering the entire toolbar, preserving focus and open dropdowns.

```html
<template>
  <div>
    <ejs-richtexteditor-ui ref="editor"></ejs-richtexteditor-ui>
    <button @click="addToolbarItem">Add Italic</button>
    <button @click="removeToolbarItem">Remove Strikethrough</button>
    <button @click="reorderToolbarItems">Reorder</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const addToolbarItem = () => {
  editor.value.updateToolbarItems([
    { action: 'add', item: 'Italic', index: 1 }
  ]);
};

const removeToolbarItem = () => {
  editor.value.updateToolbarItems([
    { action: 'remove', item: 'Strikethrough' }
  ]);
};

const reorderToolbarItems = () => {
  editor.value.updateToolbarItems([
    { action: 'add', item: 'Bold', index: 0 },
    { action: 'add', item: 'Italic', index: 1 },
    { action: 'add', item: 'Underline', index: 2 }
  ]);
};
</script>
```

### Update Actions

| Action | Purpose |
| --- | --- |
| `'add'` | Add an item to the toolbar at the specified index |
| `'remove'` | Remove an item from the toolbar by name |
| `'enableItems'` | Enable toolbar items (make them clickable) |
| `'disableItems'` | Disable toolbar items (make them inactive) |

### Update Parameters

```typescript
interface ToolbarItemUpdate {
  action: 'add' | 'remove' | 'enableItems' | 'disableItems';
  item?: string;              // Item name (e.g., 'Bold', 'Italic')
  index?: number;             // Index for 'add' action
  items?: string[];           // Array of items for bulk enable/disable
}
```

**Use cases:**
- Show/hide toolbar items based on user permissions
- Enable/disable items based on selection or content state
- Dynamically adjust available tools for different editing modes
- Reorder tools to match user preferences or workflows

---

## Keyboard Shortcuts

### History Control Shortcuts

| Action | Windows/Linux | macOS | Description |
| --- | --- | --- | --- |
| **Undo** | <kbd>Ctrl</kbd>+<kbd>Z</kbd> | <kbd>⌘</kbd>+<kbd>Z</kbd> | Reverts the previous editing action |
| **Redo** | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> | <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> | Reapplies the previously undone action |

These shortcuts provide quick access to undo/redo functionality without using the toolbar buttons or programmatic method calls.

---

## Complete Example

```html
<template>
  <div style="padding: 20px;">
    <h2>Editor Methods Demo</h2>
    
    <div style="margin-bottom: 15px; padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd;">
      <h4>Content Management</h4>
      <button @click="saveContent" style="margin-right: 10px;">Save Content</button>
      <button @click="getHtmlContent" style="margin-right: 10px;">Get HTML</button>
      <button @click="getTextContent" style="margin-right: 10px;">Get Text</button>
      <button @click="getWordCount">Get Word Count</button>
    </div>

    <div style="margin-bottom: 15px; padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd;">
      <h4>Focus Control</h4>
      <button @click="focusEditor" style="margin-right: 10px;">Focus Editor</button>
      <button @click="blurEditor">Blur Editor</button>
    </div>

    <div style="margin-bottom: 15px; padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd;">
      <h4>Toolbar Management</h4>
      <button @click="addToolbarItem" style="margin-right: 10px;">Add Italic</button>
      <button @click="removeToolbarItem" style="margin-right: 10px;">Remove Strikethrough</button>
      <button @click="toggleToolbarItems">Toggle Bold/Italic</button>
    </div>

    <ejs-richtexteditor-ui
      ref="editor"
      :toolbarSettings="toolbarSettings"
      placeholder="Type something...">
    </ejs-richtexteditor-ui>

    <div id="output" style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border: 1px solid #ddd; min-height: 100px;">
      <strong>Output:</strong>
      <pre id="outputContent" style="margin-top: 10px; font-size: 12px; white-space: pre-wrap;">Click buttons to see output here</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const toolbarSettings = {
  items: ['Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'Undo', 'Redo']
};

const log = (message) => {
  const outputElement = document.getElementById('outputContent');
  if (outputElement) {
    outputElement.textContent = message;
  }
};

const saveContent = () => {
  editor.value.ej2Instances.save();
  log('✓ Content saved');
};

const getHtmlContent = () => {
  const html = editor.value.ej2Instances.getHtml();
  log(`HTML Content:\n${html}`);
};

const getTextContent = () => {
  const text = editor.value.ej2Instances.getText();
  log(`Plain Text Content:\n${text}`);
};

const getWordCount = () => {
  const text = editor.value.ej2Instances.getText();
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  log(`Word Count: ${words}`);
};

const focusEditor = () => {
  editor.value.ej2Instances.focusIn();
  log('✓ Editor focused');
};

const blurEditor = () => {
  editor.value.ej2Instances.focusOut();
  log('✓ Editor blurred');
};

const addToolbarItem = () => {
  editor.value.updateToolbarItems([
    { action: 'add', item: 'Italic', index: 1 }
  ]);
  log('✓ Added Italic to toolbar');
};

const removeToolbarItem = () => {
  editor.value.updateToolbarItems([
    { action: 'remove', item: 'Strikethrough' }
  ]);
  log('✓ Removed Strikethrough from toolbar');
};

const toggleToolbarItems = () => {
  editor.value.updateToolbarItems([
    { action: 'disableItems', items: ['Bold', 'Italic'] }
  ]);
  setTimeout(() => {
    editor.value.updateToolbarItems([
      { action: 'enableItems', items: ['Bold', 'Italic'] }
    ]);
    log('✓ Toggled Bold/Italic disabled state');
  }, 2000);
};
</script>
```

---

## Customizing Keyboard Shortcuts

### Overview

The Modern Rich Text Editor allows you to override default keyboard shortcuts and define custom ones using the `keyBindings` property. All custom shortcuts are automatically updated in toolbar button tooltips to reflect your changes.

### Syntax Rules

When defining custom shortcuts, follow these conventions:

- Modifiers and key values are separated with a `+` symbol (e.g., `'ctrl+alt+k'`)
- Supported modifier tokens: `ctrl`, `shift`, `alt`, `meta`
- Key values should be written in lowercase (e.g., `'ctrl+b'`, not `'Ctrl+B'`)
- The editor automatically updates toolbar tooltips to match your custom bindings

### Available Shortcut Keys

| Category | Keys |
| --- | --- |
| **Modifiers** | `ctrl`, `shift`, `alt`, `meta` |
| **Letters** | `a`–`z` (lowercase) |
| **Numbers** | `0`–`9` |
| **Special** | `=`, `-`, `;`, `,`, `.`, `/`, `` ` ``, `[`, `]`, `\`, `'` |
| **Function** | `f1`–`f12` |
| **Navigation** | `enter`, `backspace`, `delete`, `tab`, `esc`, `pageup`, `pagedown`, `home`, `end`, `insert` |
| **Arrow** | `up`, `down`, `left`, `right` |

### Shortcut Command Names

| Command Name | Default Shortcut |
| --- | --- |
| `bold` | `ctrl+b` |
| `italic` | `ctrl+i` |
| `underline` | `ctrl+u` |
| `strikethrough` | `ctrl+shift+s` |
| `subscript` | `ctrl+=` |
| `superscript` | `ctrl+shift+=` |
| `link` | `ctrl+k` |
| `image` | `ctrl+shift+i` |
| `table` | `ctrl+shift+e` |
| `code-block` | `ctrl+shift+b` |
| `ordered-list` | `ctrl+shift+o` |
| `unordered-list` | `ctrl+alt+o` |
| `checklist` | `ctrl+shift+7` |
| `undo` | `ctrl+z` |
| `redo` | `ctrl+shift+z` |
| `clear-format` | `ctrl+shift+r` |

### Configuration Example

```html
<template>
  <div>
    <p style="margin-bottom: 15px; color: #666; font-size: 12px;">
      Custom Shortcuts:<br>
      • Link: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>K</kbd><br>
      • Image: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>I</kbd><br>
      • Code Block: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd>
    </p>
    <ejs-richtexteditor-ui
      :toolbarSettings="toolbarSettings"
      :keyBindings="keyBindings"
      placeholder="Type something... Try the custom keyboard shortcuts!">
    </ejs-richtexteditor-ui>
  </div>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
    'BulletList', 'NumberedList', 'Checklist', '|',
    'Link', 'Image', 'Table', 'CodeBlock', '|',
    'ClearFormat', '|',
    'Undo', 'Redo'
  ]
};

const keyBindings = {
  // Remap shortcuts to custom combinations
  link: 'ctrl+alt+k',           // Changed from ctrl+k
  image: 'ctrl+alt+i',          // Changed from ctrl+shift+i
  'code-block': 'ctrl+shift+c', // Changed from ctrl+shift+b
  table: 'ctrl+alt+t',          // Changed from ctrl+shift+e
  'bullet-list': 'ctrl+shift+comma', // New custom binding
  'ordered-list': 'ctrl+shift+period'  // New custom binding
};
</script>
```

### Accessibility Considerations

When customizing shortcuts, follow these best practices:

1. **Avoid conflicts** — Don't override OS-level or browser shortcuts (e.g., `ctrl+w`, `ctrl+t` in browsers)
2. **Be consistent** — Use patterns that match your users' mental models
3. **Document changes** — Provide in-app help or tooltips showing custom shortcuts
4. **Test across platforms** — Ensure shortcuts work on Windows, macOS, and Linux
5. **Preserve defaults** — Keep common shortcuts like `ctrl+c`, `ctrl+v`, `ctrl+z` unchanged

### Modifier Key Conventions

Default shortcuts use standard cross-platform modifier keys that automatically adapt to the user's platform:

| Platform | Primary Modifier | Secondary Modifier | Tertiary Modifier |
| :--- | :--- | :--- | :--- |
| **Windows / Linux** | <kbd>Ctrl</kbd> | <kbd>Shift</kbd> | <kbd>Alt</kbd> |
| **macOS** | <kbd>⌘ (Cmd)</kbd> | <kbd>⇧ (Shift)</kbd> | <kbd>⌥ (Option)</kbd> |

**Note:** In documentation and examples, we use the Windows/Linux notation. On macOS, automatically substitute <kbd>Ctrl</kbd> → <kbd>⌘</kbd>, <kbd>Alt</kbd> → <kbd>⌥</kbd>, and <kbd>Shift</kbd> remains the same.
