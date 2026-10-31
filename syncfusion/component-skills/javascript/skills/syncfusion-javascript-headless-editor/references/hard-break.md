# Hard Break

The `hardBreakExtension` registers the `hard_break` inline node, which inserts a semantic `<br>` line break within the current text flow without splitting the parent block.

## Table of Contents

- [Register the extension](#register-the-extension)
- [Commands](#commands)
- [Keyboard shortcut](#keyboard-shortcut)

## Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, hardBreakExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [hardBreakExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Commands

| Command | Description |
|---------|-------------|
| `setHardBreak()` | Inserts a hard break at the current cursor position. |

```ts
editor.commands.setHardBreak();
```

## Keyboard shortcut

| Action | Windows | Mac |
|--------|---------|-----|
| Insert Hard Break | <kbd>Shift</kbd> + <kbd>Enter</kbd> | <kbd>⇧</kbd> + <kbd>Enter</kbd> |
