# Getting Started with Syncfusion Vue Rich Text Editor

## Installation

```bash
npm install @syncfusion/ej2-vue-richtexteditor
```

## CSS Imports

Install the theme package that matches your application. This example uses `Tailwind 3`:

```bash
npm install @syncfusion/ej2-tailwind3-theme
```

Add the following stylesheet in `src/App.vue`

```css
@import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/rich-text-editor/index.css';
```

Replace `tailwind3` with your preferred theme name (`material3`, `bootstrap5`, `fabric`, `fluent2`, etc) install the corresponding package, and use the same theme name in the CSS import path.

## Module Injection Reference

The Rich Text Editor uses a modular system — inject only what you need to keep bundle size lean.

| Feature | Module | Use Case |
|---------|--------|----------|
| HTML editing | `HtmlEditor` | Default WYSIWYG mode |
| Markdown editing | `MarkdownEditor` | Markdown mode (`editorMode="Markdown"`) |
| Toolbar | `Toolbar` | Any toolbar rendering |
| Hyperlinks | `Link` | Insert/edit links |
| Images | `Image` | Insert images |
| Audio | `Audio` | Insert audio files |
| Video | `Video` | Insert video files |
| Tables | `Table` | Insert/edit tables |
| Quick toolbars | `QuickToolbar` | Context toolbars for images, links, tables |
| Paste cleanup | `PasteCleanup` | Clean up pasted content from Word/browsers |
| Slash menu | `SlashMenu` | `/` command palette |
| Emoji picker | `EmojiPicker` | Insert emojis via toolbar |
| AI Assistant | `AIAssistantService` | AI-powered content tools |
| Character count | `Count` | Display character/word count |
| Resize | `Resize` | Resizable editor grip |

Always pass modules as an array to `provide('richtexteditor', [...])`.

## Basic HTML Editor Setup

### Composition API

```vue
<template>
  <div>
    <ejs-richtexteditor :value="value" :toolbarSettings="toolbarSettings" />
  </div>
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const value = '<p>Start editing here...</p>';
const toolbarSettings = {
  items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments',
    'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|',
    'SourceCode', 'Undo', 'Redo']
};
provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar]);
</script>

<style>
@import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/rich-text-editor/index.css';
</style>
```

### Options API

```vue
<template>
  <div>
    <ejs-richtexteditor :value="value" :toolbarSettings="toolbarSettings" />
  </div>
</template>

<script>
import {
  RichTextEditorComponent,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

export default {
  name: 'App',
  components: { 'ejs-richtexteditor': RichTextEditorComponent },
  data() {
    return {
      value: '<p>Start editing here...</p>',
      toolbarSettings: {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats',
          'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'Undo', 'Redo']
      }
    };
  },
  provide: {
    richtexteditor: [Toolbar, Link, Image, HtmlEditor, QuickToolbar]
  }
};
</script>
```

## Basic Markdown Editor Setup

```vue
<template>
  <ejs-richtexteditor
    editorMode="Markdown"
    :value="value"
    :toolbarSettings="toolbarSettings"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, MarkdownEditor
} from '@syncfusion/ej2-vue-richtexteditor';

const value = '**Hello** from the Markdown editor!';
const toolbarSettings = {
  items: ['Bold', 'Italic', 'StrikeThrough', '|',
    'Formats', 'OrderedList', 'UnorderedList', '|',
    'CreateLink', 'Image', '|', 'Undo', 'Redo']
};
provide('richtexteditor', [Toolbar, Link, Image, MarkdownEditor]);
</script>
```

## Run the Application

```bash
npm run dev
```

## Common Setup Gotchas

- **Styles not applying**: Ensure all 8 CSS imports are present and in the correct order. Missing `ej2-navigations` or `ej2-popups` often causes invisible toolbars.
- **Blank editor / no toolbar**: Check that `Toolbar` and `HtmlEditor` (or `MarkdownEditor`) are both injected.
- **"provide is not a function" error**: You are likely importing `provide` from `'vue'` correctly — ensure you're using Vue 3.
- **Options API injection**: Use `provide: { richtexteditor: [...] }` as a component option, not inside `setup()`.
