# Heading

The `headingExtension` registers the `heading` block node, which renders semantic HTML headings (`<h1>` through `<h6>`).

## Table of Contents

- [Register the extension](#register-the-extension)
- [Node attributes](#node-attributes)
- [Configure the extension](#configure-the-extension)
- [Commands](#commands)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [Input rules](#input-rules)
- [API references](#api-references)
  - [SetHeadingPayload](#setheadingpayload)

## Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, headingExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [headingExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Node attributes

| Attribute | Description |
|-----------|-------------|
| `level` | Heading level from `1` to `6`, mapping to HTML tags `<h1>` through `<h6>`. Defaults to `1`. |
| `align` | Text alignment of the heading (`left`, `center`, `right`, or `justify`). No alignment is applied by default. Managed through the Text Alignment extension's commands. |
| `indent` | Indent level of the heading, rendered as `margin-left` in steps of 20px. Defaults to `0` (no indent). Managed through the Indent and Outdent extension's commands. |

## Configure the extension

The `heading` extension exposes an `htmlAttributes` option that adds custom HTML attributes to every rendered `<h1>` through `<h6>` element. Use `.configure()` to set it:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `htmlAttributes` | `Record<string, string>` | `{}` | Custom HTML attributes applied to the rendered heading element. |

```ts
import { HeadlessEditor, headingExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        headingExtension.configure({
            htmlAttributes: { class: 'custom-heading' }
        })
    ]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Commands

| Command | Description |
|---------|-------------|
| `setHeading({ level })` | Converts the current block into a heading at the specified level (`1` to `6`). Existing block attributes like `align` and `indent` are preserved. |

```ts
// Convert the current block to an <h2>
editor.commands.setHeading({ level: 2 });
```

## Keyboard shortcuts

| Action | Windows | Mac |
|--------|---------|-----|
| Heading 1 | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>1</kbd> | <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>1</kbd> |
| Heading 2 | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>2</kbd> | <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>2</kbd> |
| Heading 3 | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>3</kbd> | <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>3</kbd> |
| Heading 4 | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>4</kbd> | <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>4</kbd> |
| Heading 5 | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>5</kbd> | <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>5</kbd> |
| Heading 6 | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>6</kbd> | <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>6</kbd> |

## Input rules

Type `#` to `######` followed by a space at the start of a line to convert the block into the corresponding heading level:

* `# ` creates an `<h1>`
* `## ` creates an `<h2>`
* `### ` creates an `<h3>`
* `#### ` creates an `<h4>`
* `##### ` creates an `<h5>`
* `###### ` creates an `<h6>`

## API references

This section documents the heading-related public API surface — extension options, command payloads, and other types specific to this node.

### SetHeadingPayload

`SetHeadingPayload` — payload for the `setHeading` command. Converts the current paragraph or block element to a semantic heading at the specified level (1-6). Preserves existing block-level formatting such as text alignment and indentation across the transformation. If no block is selected or the selection spans multiple blocks, the command applies the heading level to the block containing the selection anchor.

| Property | Type | Description |
|----------|------|-------------|
| `level` | `number` | The heading level to apply: 1 (`h1`), 2 (`h2`), 3 (`h3`), 4 (`h4`), 5 (`h5`), or 6 (`h6`). Determines the semantic heading rank in the resulting DOM. All values 1-6 map to standard HTML heading elements. |
