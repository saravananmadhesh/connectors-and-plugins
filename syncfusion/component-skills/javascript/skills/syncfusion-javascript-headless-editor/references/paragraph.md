# Paragraph

The `paragraphExtension` registers the `paragraph` block node, which is the default block type used for standard body text.

## Table of Contents

- [Register the extension](#register-the-extension)
- [Node attributes](#node-attributes)
- [Configure the extension](#configure-the-extension)
- [Commands](#commands)
- [Keyboard shortcut](#keyboard-shortcut)

## Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, paragraphExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [paragraphExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Node attributes

| Attribute | Description |
|-----------|-------------|
| `align` | Text alignment of the paragraph (`left`, `center`, `right`, or `justify`). No alignment is applied by default. Managed through the Text Alignment extension's commands. |
| `indent` | Indent level of the paragraph, rendered as `margin-left` in steps of 20px. Defaults to `0` (no indent). Managed through the Indent and Outdent extension's commands. |

## Configure the extension

The `paragraph` extension exposes an `htmlAttributes` option that adds custom HTML attributes to every rendered `<p>` element. Use `.configure()` to set it:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `htmlAttributes` | `Record<string, string>` | `{}` | Custom HTML attributes applied to the rendered `<p>` element. |

```ts
import { HeadlessEditor, paragraphExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        paragraphExtension.configure({
            htmlAttributes: { class: 'my-custom-class' }
        })
    ]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Commands

| Command | Description |
|---------|-------------|
| `setParagraph()` | Converts the current block into a paragraph. If the source block had `align` or `indent` attributes, they are preserved on the resulting paragraph. |

```ts
editor.commands.setParagraph();
```

## Keyboard shortcut

| Action | Windows | Mac |
|--------|---------|-----|
| Convert to Paragraph | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>P</kbd> | <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>P</kbd> |
