# Editor Value and Content

## Table of Contents
- [Setting Initial Value](#setting-initial-value)
- [Getting Value Programmatically](#getting-value-programmatically)
- [Two-Way Binding](#two-way-binding)
- [Placeholder Text](#placeholder-text)
- [Change and Input Events](#change-and-input-events)
- [Character Count and Max Length](#character-count-and-max-length)
- [Read-Only Mode](#read-only-mode)
- [ExecCommand API](#execcommand-api)
- [Selection API](#selection-api)

## Setting Initial Value

Use the `:value` prop to set content. For HTML mode, pass a valid HTML string. For Markdown mode, pass a Markdown string.

```vue
<template>
  <ejs-richtexteditor :value="initialContent" />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const initialContent = `<p>Welcome to the <b>Rich Text Editor</b>!</p>
<ul><li>Feature 1</li><li>Feature 2</li></ul>`;
provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar]);
</script>
```

For templates with complex HTML, use `valueTemplate` instead:

```vue
<template>
  <ejs-richtexteditor :valueTemplate="'myTemplate'">
    <template v-slot:myTemplate>
      <p>Initial <b>rich</b> content here.</p>
    </template>
  </ejs-richtexteditor>
</template>
```

## Getting Value Programmatically

```vue
<template>
  <div>
    <ejs-richtexteditor ref="rteRef" :value="content" />
    <button @click="getValue">Get Value</button>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const rteRef = ref(null);
const content = ref('<p>Edit me</p>');

const getValue = () => {
  const rte = rteRef.value.ej2Instances;

  const html = rte.getHtml();     // Returns HTML string (HTML mode)
  const text = rte.getText();     // Returns plain text, tags stripped
  const value = rte.value;        // Same as getHtml() for HTML mode

  console.log('HTML:', html);
  console.log('Text:', text);
};
provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar]);
</script>
```

For Markdown mode, get the raw Markdown:

```vue
<script setup>
const getMarkdown = () => {
  const textArea = rteRef.value.ej2Instances.contentModule.getEditPanel();
  const markdown = textArea.value; // Raw Markdown string
  console.log(markdown);
};
</script>
```

## Two-Way Binding

```vue
<template>
  <ejs-richtexteditor v-model:value="content" />
  <p>Current value: <span v-html="content"></span></p>
</template>

<script setup>
import { ref, provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, HtmlEditor
} from '@syncfusion/ej2-vue-richtexteditor';

const content = ref('<p>Edit this content</p>');
provide('richtexteditor', [Toolbar, HtmlEditor]);
</script>
```

## Placeholder Text

Show hint text when the editor is empty using the `placeholder` prop.

```vue
<template>
  <ejs-richtexteditor placeholder="Start typing your content here..." />
</template>
```

Customize placeholder styling with CSS:

```css
.e-richtexteditor .e-rte-placeholder {
  font-family: monospace;
  color: #aaa;
  font-style: italic;
}
```

## Change and Input Events

```vue
<template>
  <ejs-richtexteditor
    :value="content"
    :change="onChange"
    :input="onInput"
    :blur="onBlur"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, HtmlEditor
} from '@syncfusion/ej2-vue-richtexteditor';

const content = '<p>Type here</p>';

// Fires when editor loses focus and value has changed
const onChange = (args) => {
  console.log('Changed value:', args.value);
};

// Fires on every keystroke / content change
const onInput = (args) => {
  console.log('Input event:', args.value);
};

// Fires when editor loses focus
const onBlur = (args) => {
  console.log('Blur — final value:', args.value);
};
provide('richtexteditor', [Toolbar, HtmlEditor]);
</script>
```

## Character Count and Max Length

Inject `Count` to display a character count indicator. Use `:maxLength` to enforce a limit.

```vue
<template>
  <ejs-richtexteditor :maxLength="500" :showCharCount="true" />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, HtmlEditor, Count
} from '@syncfusion/ej2-vue-richtexteditor';

provide('richtexteditor', [Toolbar, HtmlEditor, Count]);
</script>
```

## Read-Only Mode

```vue
<template>
  <ejs-richtexteditor :value="content" :readonly="true" />
</template>
```

Toggle read-only dynamically:

```vue
<script setup>
import { ref } from 'vue';
const rteRef = ref(null);

const setReadOnly = (isReadOnly) => {
  rteRef.value.ej2Instances.readonly = isReadOnly;
  rteRef.value.dataBind();
};
</script>
```

## ExecCommand API

Execute formatting commands programmatically without user interaction:

```vue
<script setup>
import { ref } from 'vue';
const rteRef = ref(null);

// Apply bold to current selection
const applyBold = () => {
  rteRef.value.ej2Instances.executeCommand('bold');
};

// Insert content at cursor
const insertText = () => {
  rteRef.value.ej2Instances.executeCommand('insertText', 'Inserted text');
};

// Insert HTML at cursor
const insertHTML = () => {
  rteRef.value.ej2Instances.executeCommand('insertHTML', '<b>Bold inserted</b>');
};
</script>
```

## Selection API

```vue
<script setup>
import { ref } from 'vue';
const rteRef = ref(null);

// Get selected text
const getSelection = () => {
  const rte = rteRef.value.ej2Instances;
  const selectedText = rte.getSelectedHtml(); // Selected HTML
  console.log(selectedText);
};

// Set cursor at a specific range
const setCursorPosition = () => {
  const rte = rteRef.value.ej2Instances;
  const range = rte.formatter.editorManager.nodeSelection.getRange(document);
  // Manipulate range as needed
};
</script>
```
