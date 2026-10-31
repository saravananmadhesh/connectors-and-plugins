# Table Configuration & Properties

## Table of Contents
- [Overview](#overview)
- [Supported Actions](#supported-actions)
  - [Table Insertion](#table-insertion)
    - [Insert Table (Toolbar & Slash Command)](#insert-table-toolbar--slash-command)
    - [Insert Table Dialog](#insert-table-dialog)
  - [Row Operations](#row-operations)
    - [Insert Row Before](#insert-row-before)
    - [Insert Row After](#insert-row-after)
    - [Delete Row](#delete-row)
  - [Column Operations](#column-operations)
    - [Insert Column Before](#insert-column-before)
    - [Insert Column After](#insert-column-after)
    - [Delete Column](#delete-column)
  - [Header Management](#header-management)
    - [Toggle Header Row](#toggle-header-row)
  - [Cell Formatting](#cell-formatting)
    - [Cell Background Color](#cell-background-color)
    - [Horizontal Alignment](#horizontal-alignment)
    - [Vertical Alignment](#vertical-alignment)
  - [Table Deletion](#table-deletion)
    - [Delete Table](#delete-table)
- [Properties](#properties)
  - [tableSettings](#tablesettings)
  - [Quick Toolbar Items](#quick-toolbar-items)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
- [API Reference](#api-reference)
  - [TableQuickToolbarItem](#tablequicktoolbaritem)
  - [TableSettings](#tablesettings)
  - [TableSettingsModel](#tablesettingsmodel)

---

## Overview

The Modern Rich Text Editor provides comprehensive table functionality that allows users to create, edit, and format tables within editor content. Tables can be inserted through multiple methods, and offer extensive configuration options for rows, columns, headers, cell formatting, and alignment. This reference document describes all supported table actions and configurable properties.

## Supported Actions

### Table Insertion

#### Insert Table (Toolbar & Slash Command)

Insert a new table into the editor content.

**Access Methods:**
- Toolbar button: **Table**
- Slash command: **/table**
- Keyboard shortcut: **Ctrl+Shift+E**

**Interactive Table Popup Grid:**
- Displays a **3×10 grid** for quick table selection
- Hover over cells to preview table dimensions (e.g., "3 x 2")
- Click to insert table with selected rows and columns
- Includes "Insert Table" button to open detailed dialog

#### Insert Table Dialog

- Allows custom specification of rows and columns
- Row range: 1–100
- Column range: 1–50
- Optional header row configuration

### Row Operations

#### Insert Row Before

Insert a new row above the current row in the table.

Access via Quick Toolbar → **Row** dropdown menu.

#### Insert Row After

Insert a new row below the current row in the table.

Access via Quick Toolbar → **Row** dropdown menu.

#### Delete Row

Remove the current row from the table.

Access via Quick Toolbar → **Row** dropdown menu.

### Column Operations

#### Insert Column Before

Insert a new column to the left of the current column.

Access via Quick Toolbar → **Column** dropdown menu.

#### Insert Column After

Insert a new column to the right of the current column.

Access via Quick Toolbar → **Column** dropdown menu.

#### Delete Column

Remove the current column from the table.

Access via Quick Toolbar → **Column** dropdown menu.

### Header Management

#### Toggle Header Row

Enable or disable the table header row, which applies distinct formatting to the first row.

Access via Quick Toolbar → **Header** button.

### Cell Formatting

#### Cell Background Color

Set or modify the background color of selected table cells.

Access via Quick Toolbar → **CellBackgroundColor** (color picker).

#### Horizontal Alignment

Set the text alignment within cells: **Left**, **Center**, **Right**, or **Justify**.

Access via Quick Toolbar → **Align** dropdown menu.

#### Vertical Alignment

Set the vertical alignment of cell content: **Top**, **Middle**, or **Bottom**.

Access via Quick Toolbar → **VerticalAlign** dropdown menu.

### Table Deletion

#### Delete Table

Remove the entire table from the editor content.

Access via Quick Toolbar → **Remove** button.

## Properties

### tableSettings

Use the [`tableSettings`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/tableSettings) property to configure the default behavior and interaction settings of the Modern Rich Text Editor.

**Available Properties**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `resize` | `boolean` | `true` | Enables or disables table resize drag handles. |

**Angular Configuration Example:**

```ts
public toolbarSettings: object = {
    items: ['Table']
};
public tableSettings: object = {
    resize: true
};
```

```html
<ejs-richtexteditor-ui
    [toolbarSettings]="toolbarSettings"
    [tableSettings]="tableSettings">
</ejs-richtexteditor-ui>
```

### Quick Toolbar Items

The Quick Toolbar appears when a table is selected, providing quick access to common table operations. Configure which items appear in the Quick Toolbar using the [`quickToolbarSettings`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/quickToolbarSettings#table) property.

**Available Table Items:**
- `Header` — Toggle header row button
- `Row` — Dropdown menu (Insert Row Before, Insert Row After, Delete Row)
- `Column` — Dropdown menu (Insert Column Before, Insert Column After, Delete Column)
- `CellBackgroundColor` — Color picker for cell background
- `Align` — Dropdown for horizontal alignment (Left, Center, Right, Justify)
- `VerticalAlign` — Dropdown for vertical alignment (Top, Middle, Bottom)
- `Remove` — Delete table button

**Default Configuration:**

```ts
public quickToolbarSettings: object = {
    table: ['Header', 'Remove', '|', 'Row', 'Column', '|', 'CellBackgroundColor', 'Align', 'VerticalAlign']
};
```

### Keyboard Shortcuts

Quick keyboard access for common table operations:

| Shortcut | Action |
|----------|--------|
| **Ctrl+Shift+E** | Open Insert Table popup/dialog |
| **Arrow Keys** | Navigate within table grid selector (when popup is open) |
| **Enter** | Insert table with selected dimensions (when popup is open) |
| **Escape** | Close table popup or dialog |

The following example demonstrates how to enable table support and perform common table operations such as inserting rows, columns, formatting cells, and managing table content in the Modern Rich Text Editor.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule, SlashCommandService } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    providers: [SlashCommandService],
    templateUrl: './app.component.html'
})
export class App {
    public placeholder: string = 'Type something ...';
    public toolbarSettings: object = {
        items: ['Table']
    };
    public tableSettings: object = {
        resize: false
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings"
    [tableSettings]="tableSettings">
</ejs-richtexteditor-ui>
```
---

## API Reference

### TableQuickToolbarItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/tablequicktoolbaritem>

Members:

- `Row`
- `Column`
- `Header`
- `CellBackgroundColor`
- `VerticalAlign`
- `Align`
- `Remove`
- `|`
- `CustomToolbarItem`

---

### TableSettings

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/tablesettings>

Configures the table insertion behavior of the Rich Text Editor.

#### Properties

- `resize: boolean` — Enables table resize drag handles when new tables are inserted into the editor. Defaults to `true`.

---

### TableSettingsModel

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/tablesettingsmodel>

Interface for a class `TableSettings`.

#### Properties

- `resize: boolean` — Enables table resize drag handles when new tables are inserted into the editor.
