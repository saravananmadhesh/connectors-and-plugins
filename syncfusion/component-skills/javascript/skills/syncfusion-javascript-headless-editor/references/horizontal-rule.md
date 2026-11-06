# Horizontal Rule

The `horizontalRuleExtension` registers the `horizontalRule` leaf node for visual dividers rendered as semantic `<hr>` elements.

## Table of Contents

- [Register the extension](#register-the-extension)
- [Configure the extension](#configure-the-extension)
- [Commands](#commands)
- [Input rules](#input-rules)

## Register the extension

```ts
import { HeadlessEditor, horizontalRuleExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [horizontalRuleExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Configure the extension

The `horizontalRule` extension exposes an `htmlAttributes` option that adds custom HTML attributes to rendered `<hr>` elements. It defaults to an empty object.

```ts
import { HeadlessEditor, horizontalRuleExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        horizontalRuleExtension.configure({
            htmlAttributes: { class: 'custom-divider' }
        })
    ]
});
```

## Commands

| Command | Description |
|---------|-------------|
| `setHorizontalRule()` | Inserts a horizontal rule at the current cursor position. When the current block is empty, the empty block is replaced with the rule. Otherwise, the rule is inserted below the target block at the cursor position. |

```ts
editor.commands.setHorizontalRule();
```

## Input rules

Type any of the following sequences on an empty line to insert a horizontal rule:

* `---` (three hyphens)
* `***` (three asterisks)
* `___` (three underscores)
