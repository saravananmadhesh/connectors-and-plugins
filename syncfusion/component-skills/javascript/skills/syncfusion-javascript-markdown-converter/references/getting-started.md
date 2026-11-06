# Getting Started

## Overview

The Syncfusion TypeScript Markdown Converter is a standalone utility for converting Markdown text into HTML. It is distributed as the `@syncfusion/ej2-markdown-converter` npm package and has no heavy dependencies — making it easy to drop into any TypeScript or JavaScript project.

---

## Installation

Install the package from npm:

```bash
npm install @syncfusion/ej2-markdown-converter
```

No additional peer dependencies are required for basic conversion. If you plan to use it with the Syncfusion Rich Text Editor, also install:

```bash
npm install @syncfusion/ej2-richtexteditor @syncfusion/ej2-base
```

---

## Import

Import `MarkdownConverter` into your TypeScript file:

```typescript
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
```

---

## Basic Conversion

Call the static `toHtml` method with a Markdown string:

```typescript
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';

const markdownContent = '# Hello World\nThis is **bold** and *italic* text.';
const htmlOutput = MarkdownConverter.toHtml(markdownContent);

console.log(htmlOutput);
// <h1>Hello World</h1>
// <p>This is <strong>bold</strong> and <em>italic</em> text.</p>
```

`toHtml` is a static method — no instantiation required.

---

## Rendering the Output

Assign the returned HTML string to a DOM element's `innerHTML`:

```typescript
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';

const markdown = '## Features\n- Fast\n- Lightweight\n- TypeScript-first';
const previewDiv = document.getElementById('preview') as HTMLElement;
previewDiv.innerHTML = MarkdownConverter.toHtml(markdown) as string;
```

---

## CSS and Theme Setup

The Markdown Converter itself does not require CSS. However, if you use it alongside the Syncfusion Rich Text Editor, add the required theme stylesheets:

```html
<link href="node_modules/@syncfusion/ej2-base/styles/material3.css" rel="stylesheet" />
<link href="node_modules/@syncfusion/ej2-richtexteditor/styles/material3.css" rel="stylesheet" />
```

Swap `material3` for your chosen theme (`bootstrap5`, `fluent2`, `tailwind3`, etc.).

---

## Troubleshooting

**Output is `null` or `undefined`**  
Ensure you cast the return value: `MarkdownConverter.toHtml(content) as string`. The return type is `string | null`.

**Package not found**  
Run `npm install @syncfusion/ej2-markdown-converter` and verify your `tsconfig.json` includes `"moduleResolution": "node"`.

**Invalid Markdown causes an error**  
Pass `{ silence: true }` as the second argument to suppress parse errors and skip invalid sections.
