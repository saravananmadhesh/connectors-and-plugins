# Lists in Syncfusion JavaScript Modern Rich Text Editor

The List feature in the Rich Text Editor enables users to create and format different types of lists for organizing and presenting content. Lists provide structured ways to display information and improve content readability. The Rich Text Editor supports three primary list types: numbered (NumberFormat), bulleted (BulletFormat), and checklist items. This page also lists the keyboard shortcuts for list operations.

> List format items are configured in the toolbar item configuration. Refer to the [toolbar.md](toolbar.md) for toolbar setup instructions.

## Table of contents

- [List types overview](#list-types-overview)
- [Configuring list items in toolbar](#configuring-list-items-in-toolbar)
- [Common commands](#common-commands)
- [NumberFormat list](#numberformat-list)
- [BulletFormat list](#bulletformat-list)
- [Checklist](#checklist)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [API references](#api-references)

## List types overview

The Rich Text Editor provides three distinct list types, each designed for different content organization needs:

| List Type | Purpose | Use Case |
| --- | --- | --- |
| **NumberFormat List** | Ordered lists with numeric formatting | Step-by-step instructions, sequences, ranked items |
| **BulletFormat List** | Unordered lists with bullet markers | Key points, feature lists, general items |
| **Checklist** | Interactive checkbox items | Task lists, requirements, verification items |

## Configuring list items in toolbar

To configure which list format options appear in the toolbar, use the toolbar item configuration. List items are configured through the `listSettings` property when setting up toolbar items.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor = new RichTextEditorUI({
    toolbarSettings: {
        items: [
            'NumberFormatList',  // Displays configured number formats
            'BulletFormatList',  // Displays configured bullet styles
            'Checklist'          // Displays checklist button
        ]
    },
    listSettings: {
        numberFormatListItems: [
            { text: 'Decimal', listType: 'decimal' },
            { text: 'Roman', listType: 'upper-roman' }
        ],
        bulletFormatListItems: [
            { text: 'Disc', listType: 'disc' },
            { text: 'Circle', listType: 'circle' }
        ],
        checklistType: 'Square'
    }
});
```

## Common commands

All list operations use the following commands:

- `numberedList` — Create a numbered list.
- `bulletList` — Create a bulleted list.
- `toggleTaskList` — Create a checklist.
- `setListStyle` — Change the current list style.

```ts
// Create a bullet list
editor.commands().bulletList().apply();

// Change to Roman numerals
editor.commands().numberedList().options({ listType: 'upper-alpha' }).apply();

// Toggle checklist
editor.commands().toggleTaskList().apply();
```

## NumberFormat list

The NumberFormat List feature enables users to create and manage ordered lists with numeric markers. Numbered lists are essential for presenting sequential information, step-by-step instructions, ranked items, and any content that requires a specific order.

### Supported number formats

The Rich Text Editor supports the following numbering formats for ordered lists:

Available numbering formats:

- `'decimal'` — Standard numeric (1, 2, 3, ...)
- `'lower-alpha'` — Lowercase alphabetic (a, b, c, ...)
- `'upper-alpha'` — Uppercase alphabetic (A, B, C, ...)
- `'lower-roman'` — Lowercase Roman numerals (i, ii, iii, ...)
- `'upper-roman'` — Uppercase Roman numerals (I, II, III, ...)
- `'lower-greek'` — Lowercase Greek letters (α, β, γ, ...)

Default formats:

By default, the Rich Text Editor provides six standard number formats accessible from the toolbar dropdown:

- Number
- Lower Greek
- Lower Roman
- Upper Alpha
- Lower Alpha
- Upper Roman

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        items: ['NumberFormatList']
    },
    placeholder: 'Type something ...'
});

editor.appendTo('#editor');
```

### Custom number list items

You can customize which number formats are available in the toolbar by modifying the `numberFormatListItems` property. This allows you to define a subset of supported formats or add custom ones tailored to your application's needs.

Property: `listSettings.numberFormatListItems`

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        items: ['NumberFormatList']
    },
    listSettings: {
        numberFormatListItems: [
            { text: 'Decimal', listType: 'decimal' },
            { text: 'Roman', listType: 'upper-roman' },
            { text: 'Alpha', listType: 'upper-alpha' }
        ]
    },
    placeholder: 'Type something ...'
});

editor.appendTo('#editor');
```

### NumberFormat commands

Create numbered list:

- **Command:** `numberedList`
- **Description:** Inserts a numbered list at the current cursor position or applies numbering to selected content.
- **Options:**
  - `listType` (optional) — Specify the numbering format (e.g., `'decimal'`, `'lower-roman'`, `'upper-alpha'`).

```ts
// Insert a numbered list with default decimal format
editor.commands().numberedList().apply();
```

Change number format:

- **Command:** `setListStyle`
- **Description:** Changes the numbering format of an existing numbered list without creating a new list.
- **Options:**
  - `listType` (required) — The new numbering format to apply.
- **Available formats:**
  - `'decimal'` — Standard numbering (1, 2, 3, ...)
  - `'lower-alpha'` — Lowercase letters (a, b, c, ...)
  - `'upper-alpha'` — Uppercase letters (A, B, C, ...)
  - `'lower-roman'` — Lowercase Roman numerals (i, ii, iii, ...)
  - `'upper-roman'` — Uppercase Roman numerals (I, II, III, ...)
  - `'lower-greek'` — Greek letters (α, β, γ, ...)

```ts
// Change current list to Uppercase letters
editor.commands().numberedList().options({ listType: 'upper-alpha' }).apply();
```

## BulletFormat list

The BulletFormat List feature enables users to create and manage unordered lists with bullet markers. Bulleted lists are ideal for presenting key points, feature lists, and any content that does not require a specific order.

### Supported bullet styles

The Rich Text Editor supports the following bullet styles for unordered lists:

Available bullet styles:

- `'disc'` — Filled circle bullet (●)
- `'circle'` — Hollow circle bullet (○)
- `'square'` — Square bullet (■)

Default styles:

By default, the Rich Text Editor provides three standard bullet styles accessible from the toolbar dropdown:

- Disc
- Circle
- Square

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        items: ['BulletFormatList']
    },
    placeholder: 'Type something ...'
});

editor.appendTo('#editor');
```

### Custom bullet list items

You can customize which bullet styles are available in the toolbar by modifying the `bulletFormatListItems` property. This allows you to define a subset of supported styles or add custom ones tailored to your application's needs.

Property: `listSettings.bulletFormatListItems`

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        items: ['BulletFormatList']
    },
    listSettings: {
        bulletFormatListItems: [
            { text: 'Thumbs-Up', listType: '\u{1F44D}' }
        ]
    },
    placeholder: 'Type something ...'
});

editor.appendTo('#editor');
```

### BulletFormat commands

Create bulleted list:

- **Command:** `bulletList`
- **Description:** Inserts a bulleted list at the current cursor position or applies bullet formatting to selected content.
- **Options:**
  - `listType` (optional) — Specify the bullet style (e.g., `'disc'`, `'circle'`, `'square'`).

```ts
// Insert a bulleted list with default disc bullets
this.parent.commands().numberedList().apply();
```

Change bullet style:

- **Command:** `setListStyle`
- **Description:** Changes the bullet style of an existing bulleted list without creating a new list.
- **Options:**
  - `listType` (required) — The new bullet style to apply.
- **Available styles:**
  - `'disc'` — Filled circle bullet (●)
  - `'circle'` — Hollow circle bullet (○)
  - `'square'` — Square bullet (■)

```ts
// Change to disc bullets
editor.commands().bulletList().options({ listType: 'square' }).apply();
```

## Checklist

The Checklist feature enables users to create and manage interactive checkbox lists within the Rich Text Editor. Checklists are ideal for task management, requirements tracking, and scenarios where items need to be marked as complete or incomplete.

### Checkbox shape

The `checklistType` property defines the visual shape of checkboxes in checklist items.

Property name: `listSettings.checklistType`

Available shapes:

- `'Square'` — Square-shaped checkbox (□ / ☑) — **default**
- `'Circle'` — Circular checkbox (○ / ◉)

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

// Create a Rich Text Editor with default square checkboxes
const editor = new RichTextEditorUI({
    toolbarSettings: {
        items: ['Checklist']
    },
});

// Use circular checkboxes
const editor = new RichTextEditorUI({
    listSettings: {
        checklistType: 'Circle'
    }
});

// Change checkbox shape at runtime
editor.listSettings.checklistType = 'Square';
```

### Checklist commands

Create checklist:

- **Command:** `taskList`
- **Description:** Inserts a checklist at the current cursor position or applies checklist formatting to the selected content. If the selected content is already formatted as a checklist, executing the same command again removes the checklist formatting and reverts it to a normal paragraph.

```ts
// Insert a checklist with default settings
editor.commands().toggleTaskList().apply();
```

## Keyboard shortcuts

The Modern Rich Text Editor provides the following built-in keyboard shortcuts for list operations and indentation.

| Action | Windows / Linux | macOS | Description |
| --- | --- | --- | --- |
| Ordered List | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd> | <kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>O</kbd> | Inserts or toggles a numbered list. |
| Unordered List | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>O</kbd> | <kbd>⌘</kbd> + <kbd>Option</kbd> + <kbd>O</kbd> | Inserts or toggles a bulleted list. |
| Checklist | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>7</kbd> | <kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>7</kbd> | Inserts or toggles an interactive checklist. |
| Indent | <kbd>Tab</kbd> | <kbd>Tab</kbd> | Increases the indentation level of a list item or text. |
| Outdent | <kbd>Shift</kbd> + <kbd>Tab</kbd> | <kbd>Shift</kbd> + <kbd>Tab</kbd> | Decreases the indentation level of a list item or text. |

To override or remap a shortcut, use the `keyBindings` property on `toolbarSettings` — see [toolbar.md](toolbar.md) → *Configuring keyboard shortcuts*.


## API references

API types that back the list surface, sourced from the Syncfusion EJ2 TypeScript API reference for `@syncfusion/ej2-richtexteditor-ui`.

### `ListCommandBuilder`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/listcommandbuilder>

Builder for list commands (`numberedList`, `bulletList`).

#### Methods

- `apply` — Execute the list command with set options. Returns `void`.
- `options(opts)` — Set list options.

  | Parameter | Type | Description |
  | --- | --- | --- |
  | `opts` | `Partial<...>` | The list command options |

  Returns `this`.

### `ListStyleCommandBuilder`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/liststylecommandbuilder>

Builder for list style command.

#### Methods

- `apply` — Execute the list style command with set options. Returns `void`.
- `listType(styleType)` — Set the list style type.

  | Parameter | Type | Description |
  | --- | --- | --- |
  | `styleType` | `string` | The list style type to set |

  Returns `this`.

### `ChecklistCommandBuilder`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/checklistcommandbuilder>

Builder for checklist command.

#### Methods

- `apply` — Execute the checklist command. Returns `void`.


### `CustomFormatListItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/customformatlistitem>

Custom dropdown item.

> Note: the same API URL (`customformatlistitem`) is also cited by the API-reference batch under the "CustomFormatListItem (duplicate link)" entry. Both refer to the same type; the body above is the authoritative source.

#### Properties

- `listType` — `string` — Custom CSS list-style-type value.
- `text` — `string` — Text displayed in dropdown.

### `ListSettings`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/listsettings>

#### Properties

- `bulletFormatListItems` — `BulletFormatListItem[]` — Defines the items displayed in the `BulletFormatList` dropdown.
  - Defaults to `BulletFormatLists`.
- `numberFormatListItems` — `NumberFormatListItem[]` — Defines the items displayed in the `NumberFormatList` dropdown.
  - Defaults to `NumberFormatLists`.


### `BulletFormatList`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/bulletformatlist>

Reusable definition of a bulleted (unordered) list style. Mirrors the CSS `list-style-type` value of the same name and is the canonical mapping consumed by the toolbar layer when rendering a "Bullet List" dropdown.

#### Properties

- `command` — `string` — Editor command name dispatched when the entry is selected.
- `id` — `string` — Stable identifier used by the toolbar renderer.
- `listType` — `BulletListType` — Underlying list-style type passed to the headless editor.
- `text` — `string` — Display label shown in the toolbar dropdown.

### `NumberFormatList`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/numberformatlist>

Reusable definition of a numbered (ordered) list style. Mirrors the CSS `list-style-type` value of the same name and is the canonical mapping consumed by the toolbar layer when rendering a "Numbered List" dropdown.

#### Properties

- `command` — `string` — Editor command name dispatched when the entry is selected.
- `id` — `string` — Stable identifier used by the toolbar renderer.
- `listType` — `NumberListType` — Underlying list-style type passed to the headless editor.
- `text` — `string` — Display label shown in the toolbar dropdown.

### `BulletFormatListItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/bulletformatlistitem>

Union of `BulletListType` and `CustomFormatListItem`.

### `NumberFormatListItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/numberformatlistitem>

Union of `NumberListType` and `CustomFormatListItem`.

### `ListSettingsModel`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/listsettingsmodel>

Interface for the class `ListSettings`.

#### Properties

- `bulletFormatListItems` — `BulletFormatListItem[]` — Defines the items displayed in the BulletFormatList dropdown.
- `numberFormatListItems` — `NumberFormatListItem[]` — Defines the items displayed in the NumberFormatList dropdown.
