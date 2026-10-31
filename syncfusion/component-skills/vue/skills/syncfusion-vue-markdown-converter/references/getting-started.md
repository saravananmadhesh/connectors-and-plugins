# Getting Started with Syncfusion Vue Markdown Converter

Step-by-step setup for adding the Syncfusion Markdown Converter to a Vue application.

## 1. Set Up Vue Environment

Create a new Vue application using Vite:

```bash
npm create vite@latest my-app -- --template vue
```

Navigate into the project:

```bash
cd my-app
```

Install dependencies:

```bash
npm install
```

## 2. Install Syncfusion Packages

Install both the Markdown Converter and the Rich Text Editor packages:

```bash
npm install @syncfusion/ej2-markdown-converter
npm install @syncfusion/ej2-vue-richtexteditor
```

The `ej2-markdown-converter` package provides the `MarkdownConverter` utility. The `ej2-vue-richtexteditor` package provides the `ejs-richtexteditor` component used to author Markdown content.

## 3. Add CSS References

Add the following imports to `src/main.js` (or `src/main.ts`). These load the material3 theme for all required Syncfusion sub-packages:

```js
import '@syncfusion/ej2-base/styles/material3.css';
import '@syncfusion/ej2-buttons/styles/material3.css';
import '@syncfusion/ej2-inputs/styles/material3.css';
import '@syncfusion/ej2-lists/styles/material3.css';
import '@syncfusion/ej2-navigations/styles/material3.css';
import '@syncfusion/ej2-popups/styles/material3.css';
import '@syncfusion/ej2-splitbuttons/styles/material3.css';
import '@syncfusion/ej2-richtexteditor/styles/material3.css';
import '@syncfusion/ej2-layouts/styles/material3.css';
```

> **Note:** `ej2-layouts` is only required if you are using the Splitter component for a side-by-side preview layout.

## 4. Module Injection

The Rich Text Editor in Markdown mode requires these modules to be injected via `provide` in your Vue component:

| Module | Purpose |
|--------|---------|
| `Toolbar` | Enables the editor toolbar |
| `Link` | Enables hyperlink support in Markdown |
| `Image` | Enables image insertion |
| `MarkdownEditor` | Activates Markdown editing mode |
| `Table` | Enables table insertion |

```js
import {
  Toolbar,
  Link,
  Image,
  MarkdownEditor,
  Table
} from '@syncfusion/ej2-vue-richtexteditor';

export default {
  provide: {
    richtexteditor: [Toolbar, Link, Image, MarkdownEditor, Table]
  }
}
```

For Composition API, use `provide()`:
```js
import { provide } from 'vue';
import { Toolbar, Link, Image, MarkdownEditor, Table } from '@syncfusion/ej2-vue-richtexteditor';

provide('richtexteditor', [Toolbar, Link, Image, MarkdownEditor, Table]);
```

## 5. Basic Component

A minimal working example using the Options API:

```vue
<!-- src/App.vue -->
<template>
  <ejs-richtexteditor
    id="mdCustom"
    ref="rteInstance"
    :toolbarSettings="tools"
    :editorMode="mode"
    :formatter="formatter"
    :value="value"
    @created="onCreate">
  </ejs-richtexteditor>
</template>

<script>
import {
  RichTextEditorComponent,
  Toolbar,
  Link,
  Image,
  MarkdownEditor,
  Table,
  MarkdownFormatter
} from '@syncfusion/ej2-vue-richtexteditor';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';

export default {
  components: {
    'ejs-richtexteditor': RichTextEditorComponent
  },
  data() {
    return {
      mode: 'Markdown',
      value: 'Type **Markdown** here and click Preview to see the HTML output.',
      formatter: new MarkdownFormatter({
        listTags: { 'OL': '1., 2., 3.', 'UL': '+ ' },
        formatTags: { 'Blockquote': '> ' },
        selectionTags: { 'Bold': '__', 'Italic': '_' }
      }),
      tools: {
        items: [
          'Bold', 'Italic', 'StrikeThrough', '|',
          'Formats', 'OrderedList', 'UnorderedList', '|',
          'CreateLink', 'Image', '|',
          {
            tooltipText: 'Preview',
            template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
              '<span class="e-btn-icon e-icons e-md-preview"></span></button>'
          },
          'Undo', 'Redo'
        ]
      }
    };
  },
  methods: {
    onCreate() {
      this.rteObj = this.$refs.rteInstance.ej2Instances;
      this.textArea = this.rteObj.contentModule.getEditPanel();
      this.mdsource = document.getElementById('preview-code');
      this.textArea.addEventListener('keyup', () => this.markDownConversion());
      this.mdsource.addEventListener('click', () => this.fullPreview());
    },
    markDownConversion() {
      if (this.mdsource.classList.contains('e-active')) {
        const id = this.rteObj.getID() + 'html-view';
        const htmlPreview = this.rteObj.element.querySelector('#' + id);
        htmlPreview.innerHTML = MarkdownConverter.toHtml(this.textArea.value);
      }
    },
    fullPreview() {
      const id = this.rteObj.getID() + 'html-preview';
      let htmlPreview = this.rteObj.element.querySelector('#' + id);
      if (this.mdsource.classList.contains('e-active')) {
        this.mdsource.classList.remove('e-active');
        this.textArea.style.display = 'block';
        htmlPreview.style.display = 'none';
      } else {
        this.mdsource.classList.add('e-active');
        if (!htmlPreview) {
          htmlPreview = document.createElement('div');
          htmlPreview.setAttribute('class', 'e-content e-pre-source');
          htmlPreview.id = id;
          this.textArea.parentNode.appendChild(htmlPreview);
        }
        this.textArea.style.display = 'none';
        htmlPreview.style.display = 'block';
        htmlPreview.innerHTML = MarkdownConverter.toHtml(this.textArea.value);
        this.mdsource.parentElement.title = 'Code View';
      }
    }
  },
  provide: {
    richtexteditor: [Toolbar, Link, Image, Table, MarkdownEditor]
  }
};
</script>
```

## 6. Run the Application

```bash
npm run dev
```

The browser opens with the Markdown Editor. Click **Preview** in the toolbar to see the real-time HTML output of your Markdown content.

## Common Setup Issues

- **Missing CSS:** If the editor renders unstyled, verify all CSS imports in `main.js` match the packages installed in `node_modules/@syncfusion`.
- **Module not found errors:** Ensure both `@syncfusion/ej2-markdown-converter` and `@syncfusion/ej2-vue-richtexteditor` are listed in `package.json` dependencies.
- **Modules not injected:** If the Markdown editor toolbar is missing, confirm all five modules are in the `provide` object of your component.
