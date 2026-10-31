# Bullet List and Ordered List

The `listExtension` provides built-in support for unordered bullet lists (`<ul>`) and list items (`<li>`). The same extension also provides built-in support for numbered lists (`<ol>`) and list items (`<li>`).

## Table of Contents

- [Register the extension](#register-the-extension)
- [Bullet list node attributes](#bullet-list-node-attributes)
- [Ordered list node attributes](#ordered-list-node-attributes)
- [Configure the extension](#configure-the-extension)
- [Commands](#commands)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [Input rules](#input-rules)
- [API references](#api-references)
  - [ListExtensionOptions](#listextensionoptions)
  - [ListKeymapExtensionOptions](#listkeymapextensionoptions)
  - [SetBulletListTypePayload](#setbulletlisttypepayload)
  - [SetOrderedListTypePayload](#setorderedlisttypepayload)
  - [ToggleBulletListPayload](#togglebulletlistpayload)
  - [ToggleOrderedListPayload](#toggleorderedlistpayload)
  - [ToggleListTypePayload](#togglelisttypepayload)

## Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, listExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [listExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

> The editor automatically registers `listKeymapExtension` whenever `listExtension` or `taskListExtension` is registered, so list navigation keys (<kbd>Tab</kbd>, <kbd>Shift</kbd> + <kbd>Tab</kbd>, <kbd>Enter</kbd>, and <kbd>Backspace</kbd>) are enabled without an extra import.

## Bullet list node attributes

| Attribute | Description |
|-----------|-------------|
| `listStyleType` | Bullet style applied to the list (`disc`, `circle`, or `square`). Rendered as an inline `list-style-type` CSS style. Defaults to `disc`. |

## Ordered list node attributes

| Attribute | Description |
|-----------|-------------|
| `order` | Starting number of the list, rendered as the HTML `start` attribute on `<ol>`. Defaults to `1`. |
| `listStyleType` | Numbering style format (`decimal`, `lower-alpha`, `upper-alpha`, `lower-roman`, `upper-roman`). Rendered as inline `list-style-type` CSS. Defaults to `decimal`. |

## Configure the extension

The `list` extension supports custom HTML attributes for both the list container (`<ul>` or `<ol>`) and its items (`<li>`):

| Option | Description | Default |
|--------|-------------|---------|
| `htmlAttributes` | Custom HTML attributes applied to the outer list element. | `{}` |
| `itemHtmlAttributes` | Custom HTML attributes applied to every child `<li>` element. | `{}` |

```ts
import { HeadlessEditor, listExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        listExtension.configure({
            htmlAttributes: { class: 'custom-list' },
            itemHtmlAttributes: { class: 'custom-list-item' }
        })
    ]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Commands

| Command | Description |
|---------|-------------|
| `toggleBulletList({ listStyleType?, keepMarks? })` | Toggles the bullet list format on the current block or selection. Accepts an optional `listStyleType` (`disc`, `circle`, `square`) to toggle directly into that style or switch an existing list's style, and `keepMarks` to retain active formatting marks. |
| `setBulletListType({ listStyleType })` | Changes the bullet style (`disc`, `circle`, `square`) of the current bullet list. |
| `toggleOrderedList({ listStyleType?, keepMarks? })` | Toggles the ordered list format on the current block or selection. Accepts an optional `listStyleType` (`decimal`, `lower-alpha`, `upper-alpha`, `lower-roman`, `upper-roman`) to toggle directly into that numbering style or update an existing list's style, and `keepMarks` to retain active formatting marks. |
| `setOrderedListType({ listStyleType })` | Sets the numbering format (`decimal`, `lower-alpha`, `upper-alpha`, `lower-roman`, `upper-roman`) for the active list. |
| `indentListItem()` | Indents the active list item to create a nested sub-list. |
| `outdentListItem()` | Outdents the active list item to the parent list level or converts it back to a standard block. |

```ts
// Toggle default bullet list (disc)
editor.commands.toggleBulletList();

// Toggle bullet list with a specific style (e.g., circle)
editor.commands.toggleBulletList({ listStyleType: 'circle' });

// Toggle default ordered list (decimal)
editor.commands.toggleOrderedList();

// Toggle ordered list with a specific numbering format (e.g., lower-alpha)
editor.commands.toggleOrderedList({ listStyleType: 'lower-alpha' });

// Set numbering style on an existing list
editor.commands.setOrderedListType({ listStyleType: 'lower-roman' });
```

## Keyboard shortcuts

| Action | Windows | Mac |
|--------|---------|-----|
| Toggle Bullet List | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>8</kbd> | <kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>8</kbd> |
| Toggle Ordered List | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>9</kbd> | <kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>9</kbd> |
| Indent Item | <kbd>Tab</kbd> | <kbd>Tab</kbd> |
| Outdent Item | <kbd>Shift</kbd> + <kbd>Tab</kbd> | <kbd>Shift</kbd> + <kbd>Tab</kbd> |

## Input rules

* Type `-`, `*`, or `+` followed by a space at the start of a line to convert the block into a bullet list.
* Type `1.` followed by a space at the start of a line to convert the block into an ordered list starting at number 1.

## API references

This section documents the list-related public API surface — extension options, command payloads, and other types specific to this node.

### ListExtensionOptions

`ListExtensionOptions` — options accepted by the List extension.

| Property | Type | Description |
|----------|------|-------------|
| `htmlAttributes` | `Readonly<Record<string, string>>` | HTML attributes applied to the list container elements (`<ul>`, `<ol>`). |
| `itemHtmlAttributes` | `Readonly<Record<string, string>>` | HTML attributes applied to list item elements (`<li>`). |

### ListKeymapExtensionOptions

`ListKeymapExtensionOptions` — options accepted by the List Keymap extension.

| Property | Type | Description |
|----------|------|-------------|
| `htmlAttributes` | `Readonly<Record<string, string>>` | HTML attributes applied to the rendered DOM element (class, data-*, etc.). |

### SetBulletListTypePayload

`SetBulletListTypePayload` — payload for the `setBulletListType` command.

| Property | Type | Description |
|----------|------|-------------|
| `listStyleType` | `string` | CSS `list-style-type` value to apply (e.g. `'disc'`, `'circle'`). |

### SetOrderedListTypePayload

`SetOrderedListTypePayload` — payload for the `setOrderedListType` command.

| Property | Type | Description |
|----------|------|-------------|
| `listStyleType` | `string` | CSS `list-style-type` value to apply (e.g. `'decimal'`, `'lower-roman'`). |

### ToggleBulletListPayload

`ToggleBulletListPayload` — payload for the `toggleBulletList` command.

| Property | Type | Description |
|----------|------|-------------|
| `keepMarks` | `boolean` | When `true`, active marks are preserved on the new list item. |
| `listStyleType` | `string` | CSS `list-style-type` value for the bullet list container (e.g. `'disc'`, `'circle'`, `'square'`). When omitted, `'disc'` is used. When the selection is already inside a `bulletList` using a different style, the list is updated to this style instead of lifted. |

### ToggleOrderedListPayload

`ToggleOrderedListPayload` — payload for the `toggleOrderedList` command.

| Property | Type | Description |
|----------|------|-------------|
| `keepMarks` | `boolean` | When `true`, active marks are preserved on the new list item. |
| `listStyleType` | `string` | CSS `list-style-type` value for the ordered list container (e.g. `'decimal'`, `'lower-alpha'`, `'upper-roman'`). When omitted, `'decimal'` is used. When the selection is already inside an `orderedList` using a different style, the list is updated to this style instead of lifted. |

### ToggleListTypePayload

`ToggleListTypePayload` — payload for the `toggleListType` command.

| Property | Type | Description |
|----------|------|-------------|
| `checked` | `boolean` | Checked state applied to task items when toggling into a task list. When omitted, the existing default behavior (unchecked on wrap, preserved on conversion) is unchanged. Task lists ignore `listStyleType`. |
| `keepMarks` | `boolean` | When `true`, active marks are preserved on the new list item after toggling. |
| `listStyleType` | `string` | CSS `list-style-type` value for the target list container. Applies to bullet and ordered lists only. When omitted, the target type's default style (`disc` / `decimal`) is used to build fresh list attrs; when the selection already sits in a list of the same type and the current style differs, the list is updated instead of lifted. |
