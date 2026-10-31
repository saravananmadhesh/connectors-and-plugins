# Rich Text Editor Integration

## Table of Contents
- [Overview](#overview)
- [Splitter-Based Side-by-Side Layout](#splitter-based-side-by-side-layout)
- [Rich Text Editor in Markdown Mode](#rich-text-editor-in-markdown-mode)
- [Live Preview with updateValue()](#live-preview-with-updatevalue)
- [Toolbar Configuration](#toolbar-configuration)
- [Custom Markdown Formatter](#custom-markdown-formatter)
- [Custom Preview Toggle Button](#custom-preview-toggle-button)
- [Device and Orientation Handling](#device-and-orientation-handling)
- [Full Working Example](#full-working-example)

---

## Overview

The Syncfusion Markdown Converter is designed to work alongside the Syncfusion Rich Text Editor (`ejs-richtexteditor`) in Markdown editing mode. The typical integration pattern:

1. Set the Rich Text Editor's `editorMode` to `'Markdown'`
2. Listen for editor changes (`change`, `actionComplete`, or `keyup`)
3. Call `MarkdownConverter.toHtml()` with the current textarea value
4. Inject the resulting HTML into a preview container

---

## Splitter-Based Side-by-Side Layout

Use the Syncfusion Splitter (`ejs-splitter`) to display the editor and HTML preview side by side. Install the layouts package if not already present:

```bash
npm install @syncfusion/ej2-vue-layouts
```

**Template structure:**

```vue
<ejs-splitter
  id="splitter-rte-markdown-preview"
  ref="splitterInstance"
  height="450px"
  width="100%"
  @resizing="resizing"
  @created="updateOrientation">
  <e-panes>
    <!-- Left pane: Markdown editor -->
    <e-pane size="50%" :resizable="true" cssClass="pane1" min="40%">
      <template #content>
        <ejs-richtexteditor
          id="markdown"
          ref="rteInstance"
          :value="value"
          height="447px"
          :toolbarSettings="tools"
          :editorMode="mode"
          @created="onCreate"
          @change="onChange"
          @actionComplete="updateValue">
        </ejs-richtexteditor>
      </template>
    </e-pane>

    <!-- Right pane: HTML preview -->
    <e-pane cssClass="pane2" min="40%">
      <template #content>
        <div class="heading right">
          <h6 class="title"><b>Markdown Preview</b></h6>
          <div class="splitter-default-content source-code pane2"
               style="padding: 20px;"></div>
        </div>
      </template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

**Key splitter behaviors:**
- `@resizing="resizing"` — calls `rteObj.refreshUI()` so the editor reflows on drag
- `@created="updateOrientation"` — switches splitter to vertical on mobile devices
- `min="40%"` — prevents panes from collapsing entirely

---

## Rich Text Editor in Markdown Mode

Set `editorMode` to `'Markdown'` to switch the Rich Text Editor from WYSIWYG mode to plain-text Markdown editing:

```js
data() {
  return {
    mode: 'Markdown'
  };
}
```

In the template:
```vue
<ejs-richtexteditor :editorMode="mode" ...></ejs-richtexteditor>
```

In Markdown mode, the editor's content panel is a plain `<textarea>`. Access it via:
```js
const rteObj = this.$refs.rteInstance.ej2Instances;
const textarea = rteObj.contentModule.getEditPanel();
```

---

## Live Preview with updateValue()

The `updateValue()` method reads the current textarea content and pushes the converted HTML into the preview container. Call it from `onChange` and `actionComplete` events to keep the preview in sync:

```js
data() {
  return {
    srcArea: null
  };
},
methods: {
  onCreate() {
    // Wait for the editor to fully initialize before accessing the DOM
    setTimeout(() => {
      const rteObj = this.$refs.rteInstance.ej2Instances;
      rteObj.refreshUI();
      this.textArea = rteObj.contentModule.getEditPanel();
      this.srcArea = document.querySelector('.source-code');
      this.updateValue(); // Render initial content
    }, 0);
  },
  onChange() {
    this.updateValue();
  },
  updateValue() {
    const rteObj = this.$refs.rteInstance.ej2Instances;
    const textarea = rteObj.contentModule.getEditPanel();
    this.srcArea.innerHTML = MarkdownConverter.toHtml(textarea.value);
  }
}
```

> **Why `setTimeout(..., 0)`?** The editor's `contentModule` and DOM elements are not ready synchronously inside the `created` event. A zero-delay timeout defers execution until after the current event loop cycle, guaranteeing the editor is fully rendered.

---

## Toolbar Configuration

Configure the toolbar via `toolbarSettings.items`. For Markdown mode, use standard formatting items plus any custom toolbar buttons:

```js
data() {
  return {
    tools: {
      enableFloating: false,
      items: [
        'Bold', 'Italic', 'StrikeThrough', '|',
        'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', '|',
        'CreateLink', 'Image', 'CreateTable', '|',
        'Undo', 'Redo'
      ]
    }
  };
}
```

- `enableFloating: false` — disables floating toolbar behavior, which works better in a fixed splitter layout
- `'Formats'` — applies Markdown heading levels (H1–H6)
- `'Blockquote'` — wraps selected text in `> ` syntax
- `'CreateTable'` — inserts a GFM table template

---

## Custom Markdown Formatter

`MarkdownFormatter` lets you redefine the Markdown syntax that toolbar buttons produce. This is useful when you want non-standard Markdown (e.g., `__bold__` instead of `**bold**`):

```js
import { MarkdownFormatter } from '@syncfusion/ej2-vue-richtexteditor';

data() {
  return {
    formatter: new MarkdownFormatter({
      listTags: {
        'OL': '1., 2., 3.',  // Numbered list prefix
        'UL': '+ '            // Unordered list uses + instead of -
      },
      formatTags: {
        'Blockquote': '> '
      },
      selectionTags: {
        'Bold': '__',    // Double underscore instead of **
        'Italic': '_'    // Single underscore instead of *
      }
    })
  };
}
```

Pass it to the editor:
```vue
<ejs-richtexteditor :formatter="formatter" ...></ejs-richtexteditor>
```

> `MarkdownConverter.toHtml()` correctly handles the custom syntax produced by `MarkdownFormatter` — no extra configuration needed.

---

## Custom Preview Toggle Button

To add a **Preview** toggle button to the toolbar (shows/hides the HTML preview in the same editor area):

**Toolbar item definition:**
```js
{
  tooltipText: 'Preview',
  template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
    '<span class="e-btn-icon e-icons e-md-preview"></span></button>'
}
```

**Toggle logic:**
```js
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
      // Switch back to editor
      this.mdsource.classList.remove('e-active');
      this.textArea.style.display = 'block';
      htmlPreview.style.display = 'none';
    } else {
      // Switch to preview
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
}
```

---

## Device and Orientation Handling

On mobile devices, the horizontal splitter layout is too narrow. Switch to vertical orientation on device detection:

```js
import { Browser } from '@syncfusion/ej2-base';

methods: {
  updateOrientation() {
    if (Browser.isDevice) {
      this.$refs.splitterInstance.ej2Instances.orientation = 'Vertical';
      document.body.querySelector('.heading').style.width = 'auto';
    }
  }
}
```

Also call `rteObj.refreshUI()` on splitter resize to keep the editor correctly sized:

```js
methods: {
  resizing() {
    this.$refs.rteInstance.ej2Instances.refreshUI();
  }
}
```

---

## Full Working Example

Complete Vue SFC using Splitter + Rich Text Editor + live Markdown preview:

```vue
<!-- src/App.vue -->
<template>
  <div class="sample-container markdown-preview">
    <ejs-splitter
      id="splitter-rte-markdown-preview"
      ref="splitterInstance"
      height="450px"
      width="100%"
      @resizing="resizing"
      @created="updateOrientation">
      <e-panes>
        <e-pane size="50%" :resizable="true" cssClass="pane1" min="40%">
          <template #content>
            <div class="content">
              <ejs-richtexteditor
                id="markdown"
                ref="rteInstance"
                :value="value"
                height="447px"
                :toolbarSettings="tools"
                saveInterval="10"
                :editorMode="mode"
                @created="onCreate"
                @change="onChange"
                @actionComplete="updateValue">
              </ejs-richtexteditor>
            </div>
          </template>
        </e-pane>
        <e-pane cssClass="pane2" min="40%">
          <template #content>
            <div class="heading right">
              <h6 class="title"><b>Markdown Preview</b></h6>
              <div class="splitter-default-content source-code pane2"
                   style="padding: 20px;"></div>
            </div>
          </template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  </div>
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
import { SplitterComponent, PanesDirective, PaneDirective } from '@syncfusion/ej2-vue-layouts';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import { Browser } from '@syncfusion/ej2-base';

export default {
  components: {
    'ejs-richtexteditor': RichTextEditorComponent,
    'ejs-splitter': SplitterComponent,
    'e-panes': PanesDirective,
    'e-pane': PaneDirective
  },
  data() {
    return {
      srcArea: null,
      textArea: null,
      mode: 'Markdown',
      tools: {
        enableFloating: false,
        items: [
          'Bold', 'Italic', 'StrikeThrough', '|',
          'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', '|',
          'CreateLink', 'Image', 'CreateTable', '|',
          'Undo', 'Redo'
        ]
      },
      value:
        'In Rich Text Editor, you click the toolbar buttons to format the words and the changes are visible immediately. ' +
        'Markdown is not like that. When you format the word in Markdown format, you need to add Markdown syntax to the word ' +
        'to indicate which words and phrases should look different from each other. ' +
        'Rich Text Editor supports markdown editing when the editorMode set as **markdown** and using both ' +
        '*keyboard interaction* and *toolbar action*, you can apply the formatting to text.'
    };
  },
  methods: {
    resizing() {
      this.$refs.rteInstance.ej2Instances.refreshUI();
    },
    updateOrientation() {
      if (Browser.isDevice) {
        this.$refs.splitterInstance.ej2Instances.orientation = 'Vertical';
        document.body.querySelector('.heading').style.width = 'auto';
      }
    },
    onCreate() {
      setTimeout(() => {
        const rteObj = this.$refs.rteInstance.ej2Instances;
        rteObj.refreshUI();
        this.textArea = rteObj.contentModule.getEditPanel();
        this.srcArea = document.querySelector('.source-code');
        this.updateValue();
      }, 0);
    },
    onChange() {
      this.updateValue();
    },
    updateValue() {
      const rteObj = this.$refs.rteInstance.ej2Instances;
      const textarea = rteObj.contentModule.getEditPanel();
      this.srcArea.innerHTML = MarkdownConverter.toHtml(textarea.value);
    }
  },
  provide: {
    richtexteditor: [Toolbar, Link, Image, MarkdownEditor, Table]
  }
};
</script>
```
