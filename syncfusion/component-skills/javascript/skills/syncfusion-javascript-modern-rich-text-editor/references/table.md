# Tables in Syncfusion JavaScript Modern Rich Text Editor

The Modern Rich Text Editor provides comprehensive table functionality that allows users to create, edit, and format tables within editor content. Tables can be inserted through multiple methods, and offer extensive configuration options for rows, columns, headers, cell formatting, and alignment. This reference document describes all supported table actions and configurable properties.

## Table of contents

- [Supported actions](#supported-actions)
- [Properties](#properties)
- [Quick toolbar items](#quick-toolbar-items)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [Configuration example](#configuration-example)
- [API references](#api-references)

## Supported actions

### Table insertion

#### Insert Table (toolbar and slash command)

Insert a new table into the editor content.

Access methods:

- Toolbar button: **Table**
- Slash command: **/table**
- Keyboard shortcut: **Ctrl+Shift+E**

Interactive Table Popup Grid:

- Displays a **3×10 grid** for quick table selection.
- Hover over cells to preview table dimensions (e.g., "3 x 2").
- Click to insert table with selected rows and columns.
- Includes "Insert Table" button to open detailed dialog.

Insert Table Dialog:

- Allows custom specification of rows and columns.
- Row range: 1–100.
- Column range: 1–50.
- Optional header row configuration.

### Row operations

#### Insert Row Before

Insert a new row above the current row in the table. Access via Quick Toolbar → **Row** dropdown menu.

#### Insert Row After

Insert a new row below the current row in the table. Access via Quick Toolbar → **Row** dropdown menu.

#### Delete Row

Remove the current row from the table. Access via Quick Toolbar → **Row** dropdown menu.

### Column operations

#### Insert Column Before

Insert a new column to the left of the current column. Access via Quick Toolbar → **Column** dropdown menu.

#### Insert Column After

Insert a new column to the right of the current column. Access via Quick Toolbar → **Column** dropdown menu.

#### Delete Column

Remove the current column from the table. Access via Quick Toolbar → **Column** dropdown menu.

### Header management

#### Toggle Header Row

Enable or disable the table header row, which applies distinct formatting to the first row. Access via Quick Toolbar → **Header** button.

### Cell formatting

#### Cell Background Color

Set or modify the background color of selected table cells. Access via Quick Toolbar → **CellBackgroundColor** (color picker).

#### Horizontal Alignment

Set the text alignment within cells: **Left**, **Center**, **Right**, or **Justify**. Access via Quick Toolbar → **Align** dropdown menu.

#### Vertical Alignment

Set the vertical alignment of cell content: **Top**, **Middle**, or **Bottom**. Access via Quick Toolbar → **VerticalAlign** dropdown menu.

### Table deletion

#### Delete Table

Remove the entire table from the editor content. Access via Quick Toolbar → **Remove** button.

## Properties

### TableSettings

Use the `tableSettings` property to configure the default behavior and interaction settings of the Modern Rich Text Editor.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `resize` | `boolean` | `true` | Enables or disables table resize drag handles. |

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        items: ['Table']
    },
    tableSettings: {
        resize: false
    },
    placeholder: 'Type something ...'
});

editor.appendTo('#editor');
```

## Quick toolbar items

The Quick Toolbar appears when a table is selected, providing quick access to common table operations. Configure which items appear in the Quick Toolbar using the `quickToolbarSettings` property.

Available table items:

- `Header` — Toggle header row button.
- `Row` — Dropdown menu (Insert Row Before, Insert Row After, Delete Row).
- `Column` — Dropdown menu (Insert Column Before, Insert Column After, Delete Column).
- `CellBackgroundColor` — Color picker for cell background.
- `Align` — Dropdown for horizontal alignment (Left, Center, Right, Justify).
- `VerticalAlign` — Dropdown for vertical alignment (Top, Middle, Bottom).
- `Remove` — Delete table button.

Default configuration:

```ts
['Header', 'Remove', '|', 'Row', 'Column', '|', 'CellBackgroundColor', 'Align', 'VerticalAlign']
```

## Keyboard shortcuts

Quick keyboard access for common table operations:

| Shortcut | Action |
| --- | --- |
| **Ctrl+Shift+E** | Open Insert Table popup/dialog |
| **Arrow Keys** | Navigate within table grid selector (when popup is open) |
| **Enter** | Insert table with selected dimensions (when popup is open) |
| **Escape** | Close table popup or dialog |

## Configuration example

The following example demonstrates how to enable table support and perform common table operations such as inserting rows, columns, formatting cells, and managing table content in the Modern Rich Text Editor.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        items: ['Table']
    },
    tableSettings: {
        resize: false
    },
    placeholder: 'Type something ...'
});

editor.appendTo('#editor');
```


## API references

Table configuration types, sourced from the Syncfusion EJ2 TypeScript API reference for `@syncfusion/ej2-richtexteditor-ui`.

### `TableSettings`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/tablesettings>

Configures the table insertion behavior of the Rich Text Editor.

#### Properties

- `resize` — `boolean` — Enables table resize drag handles when new tables are inserted into the editor.
  - **Defaults to `true`.**

### `TableSettingsModel`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/tablesettingsmodel>

Interface for the class `TableSettings`.

#### Properties

- `resize` — `boolean` — Enables table resize drag handles when new tables are inserted into the editor.


### `TableQuickToolbarItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/tablequicktoolbaritem>

Built-in items exposed by the Table Quick Toolbar.

#### Enum members

- `Row`
- `Column`
- `Header`
- `CellBackgroundColor`
- `VerticalAlign`
- `Align`
- `Remove`
- `|`
- `CustomToolbarItem`
