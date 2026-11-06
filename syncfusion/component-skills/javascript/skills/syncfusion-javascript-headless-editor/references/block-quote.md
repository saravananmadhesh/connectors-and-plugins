# Block Quote

The `blockquoteExtension` registers the `blockquote` block container node, which renders quoted content inside a semantic `<blockquote>` tag.

## Table of Contents

- [Register the extension](#register-the-extension)
- [Configure the extension](#configure-the-extension)
- [Commands](#commands)
- [Keyboard shortcut](#keyboard-shortcut)
- [Input rules](#input-rules)

## Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, blockquoteExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [blockquoteExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Configure the extension

The `blockquote` extension exposes an `htmlAttributes` option that adds custom HTML attributes to every rendered `<blockquote>` element. Use `.configure()` to set it:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `htmlAttributes` | `Record<string, string>` | `{}` | Custom HTML attributes applied to the rendered `<blockquote>` element. |

```ts
import { HeadlessEditor, blockquoteExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        blockquoteExtension.configure({
            htmlAttributes: { class: 'custom-quote' }
        })
    ]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Commands

| Command | Description |
|---------|-------------|
| `toggleBlockQuote()` | Toggles the block quote wrapper on the current block or selection. If the selection is already inside a block quote, it unwraps the content back to regular blocks. |

```ts
editor.commands.toggleBlockQuote();
```

## Keyboard shortcut

| Action | Windows | Mac |
|--------|---------|-----|
| Toggle Block Quote | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Q</kbd> | <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>Q</kbd> |

## Input rules

Type `>` followed by a space at the start of an empty line to wrap the current block in a block quote.
