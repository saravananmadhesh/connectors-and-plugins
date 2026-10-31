# Task List

The `taskListExtension` registers the `taskList` container and `taskItem` nodes for rendering checkable to-do lists.

## Table of Contents

- [Register the extension](#register-the-extension)
- [Node attributes](#node-attributes)
- [Configure the extension](#configure-the-extension)
- [Commands](#commands)
- [Input rules](#input-rules)
- [API references](#api-references)
  - [TaskListExtensionOptions](#tasklistextensionoptions)
  - [ToggleTaskCheckedPayload](#toggletaskcheckedpayload)
  - [ToggleTaskListPayload](#toggletasklistpayload)

## Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, taskListExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [taskListExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

> The editor automatically registers `listKeymapExtension` whenever `listExtension` or `taskListExtension` is registered, so list navigation keys (<kbd>Tab</kbd>, <kbd>Shift</kbd> + <kbd>Tab</kbd>, <kbd>Enter</kbd>, and <kbd>Backspace</kbd>) are enabled without an extra import.

## Node attributes

| Attribute | Description |
|-----------|-------------|
| `checked` | Boolean state of the task item checkbox (`true` or `false`). Defaults to `false`. |

## Configure the extension

The `task-list` extension supports configuring container attributes, item attributes, and nested list structure:

| Option | Description | Default Value |
|--------|-------------|---------------|
| `nested` | When `true`, allows nested blocks (sub-lists, quotes) inside task items. When `false`, restricts items to paragraphs only. | `true` |
| `htmlAttributes` | Custom HTML attributes applied to the `<ul data-type="taskList">` element. | `{}` |
| `itemHtmlAttributes` | Custom HTML attributes applied to each `<li data-type="taskItem">` element. | `{}` |

```ts
import { HeadlessEditor, taskListExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        taskListExtension.configure({
            nested: true,
            htmlAttributes: { class: 'custom-task-list' }
        })
    ]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Commands

| Command | Description |
|---------|-------------|
| `toggleTaskList({ keepMarks?, checked? })` | Toggles the task list container on the current selection. Accepts an optional `keepMarks` to retain active formatting marks, and `checked` to set the initial checked state of the new task items. |
| `toggleTaskChecked({ pos? })` | Toggles the checked state of the active task item or the task item at the given document position. |

```ts
// Toggle task list on selection
editor.commands.toggleTaskList();

// Toggle task list and seed new items as checked
editor.commands.toggleTaskList({ checked: true });
```

## Input rules

Type `[]` or `[ ]` followed by a space at the start of a line to create a task list with an unchecked item.

## API references

This section documents the task-list-related public API surface — extension options, command payloads, and other types specific to this node.

### TaskListExtensionOptions

`TaskListExtensionOptions` — options for the task list extension. Defines the HTML attributes applied to task list container and item elements, along with the nested content policy for task items.

| Property | Type | Description |
|----------|------|-------------|
| `htmlAttributes` | `Readonly<Record<string, string>>` | HTML attributes applied to the `<ul data-type="taskList">` container element. |
| `itemHtmlAttributes` | `Readonly<Record<string, string>>` | HTML attributes applied to task item `<li>` elements. |
| `nested` | `boolean` | When `true`, task items allow nested block content (lists, blockquotes, etc.) after the leading paragraph. When `false`, content is restricted to `paragraph+`. |

### ToggleTaskCheckedPayload

`ToggleTaskCheckedPayload` — payload for `toggleTaskChecked` — `pos` bypasses selection-based lookup.

| Property | Type | Description |
|----------|------|-------------|
| `pos` | `number` | Absolute document position of the `taskItem` node. When provided, selection is ignored. |

### ToggleTaskListPayload

`ToggleTaskListPayload` — payload for the `toggleTaskList` command.

| Property | Type | Description |
|----------|------|-------------|
| `checked` | `boolean` | Checked state applied to the task items created when toggling into a task list. When omitted, the existing default behavior (unchecked on wrap, preserved on conversion) is unchanged. |
| `keepMarks` | `boolean` | When `true`, active marks are preserved on the new task item. |
