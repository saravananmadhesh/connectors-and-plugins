# MarkdownConverter.toHtml() API

The `toHtml` method is the core API of the Syncfusion Markdown Converter. It converts a Markdown string into clean, semantic HTML.

## Method Signature

```js
MarkdownConverter.toHtml(markdownContent, options)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `markdownContent` | `string` | ✓ | The Markdown text to convert |
| `options` | `MarkdownConverterOptions` | ✗ | Optional configuration (see configurable-options.md) |

**Returns:** `string` — the converted HTML markup.

## Import

```js
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
```

## Basic Usage

```js
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';

const markdownContent = '# Hello World\nThis is **Markdown** text.';
const htmlOutput = MarkdownConverter.toHtml(markdownContent);
console.log(htmlOutput);
// Output: <h1>Hello World</h1><p>This is <strong>Markdown</strong> text.</p>
```

## Supported Markdown Elements

`toHtml` handles all common Markdown syntax out of the box:

| Markdown Syntax | HTML Output |
|-----------------|-------------|
| `# Heading 1` | `<h1>Heading 1</h1>` |
| `## Heading 2` | `<h2>Heading 2</h2>` |
| `**bold**` | `<strong>bold</strong>` |
| `*italic*` or `_italic_` | `<em>italic</em>` |
| `~~strikethrough~~` | `<del>strikethrough</del>` |
| `[link](url)` | `<a href="url">link</a>` |
| `![alt](src)` | `<img alt="alt" src="src">` |
| `` `inline code` `` | `<code>inline code</code>` |
| `> blockquote` | `<blockquote>blockquote</blockquote>` |
| `- item` or `+ item` | `<ul><li>item</li></ul>` |
| `1. item` | `<ol><li>item</li></ol>` |
| `---` | `<hr>` |
| GFM tables | `<table>...</table>` |
| Fenced code blocks (` ``` `) | `<pre><code>...</code></pre>` |

> **GitHub Flavored Markdown (GFM)** is enabled by default, which adds support for tables, strikethrough, and task lists. Disable it by passing `{ gfm: false }` in options.

## Using the Return Value in Vue

### Binding to innerHTML via ref

The most common usage is setting the `innerHTML` of a preview element directly from a component method:

```vue
<!-- src/App.vue -->
<template>
  <textarea @input="onInput"></textarea>
  <div ref="previewEl"></div>
</template>

<script>
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';

export default {
  methods: {
    onInput(event) {
      const markdown = event.target.value;
      const html = MarkdownConverter.toHtml(markdown);
      this.$refs.previewEl.innerHTML = html;
    }
  }
};
</script>
```

### Binding via reactive data with v-html

Use Vue's `v-html` directive to reactively render converted HTML:

```vue
<template>
  <textarea @input="onInput"></textarea>
  <div v-html="previewHtml"></div>
</template>

<script>
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';

export default {
  data() {
    return {
      previewHtml: ''
    };
  },
  methods: {
    onInput(event) {
      this.previewHtml = MarkdownConverter.toHtml(event.target.value);
    }
  }
};
</script>
```

> **Security note:** When binding converted HTML via `v-html`, ensure the content is from a trusted source. For user-generated content from unknown sources, sanitize the HTML output before binding.

### Composition API with ref

```vue
<template>
  <textarea @input="onInput"></textarea>
  <div v-html="previewHtml"></div>
</template>

<script setup>
import { ref } from 'vue';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';

const previewHtml = ref('');

function onInput(event) {
  previewHtml.value = MarkdownConverter.toHtml(event.target.value);
}
</script>
```

### Direct DOM Manipulation

When working with the Rich Text Editor, direct DOM assignment is typical:

```js
const rteObj = this.$refs.rteInstance.ej2Instances;
const previewEl = document.getElementById('html-preview');
previewEl.innerHTML = MarkdownConverter.toHtml(rteObj.contentModule.getEditPanel().value);
```

## Edge Cases

- **Empty string:** `toHtml('')` returns an empty string — no error thrown.
- **Invalid Markdown:** By default, the converter attempts best-effort conversion. Pass `{ silence: true }` to suppress any errors on malformed input.
- **Large content:** For large documents, pass `{ async: true }` to avoid blocking the main thread.
- **Custom list syntax:** If using `MarkdownFormatter` with custom list tags (e.g., `'+ '` for unordered), the `toHtml` output reflects those custom tags correctly.
