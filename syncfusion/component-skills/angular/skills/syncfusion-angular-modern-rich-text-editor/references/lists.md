# Lists

## Table of Contents
- [Overview](#overview)
- [List Types Overview](#list-types-overview)
- [Configuring List Items in Toolbar](#configuring-list-items-in-toolbar)
- [Common Commands](#common-commands)
- [NumberFormat List](#numberformat-list)
  - [Supported Number Formats](#supported-number-formats)
  - [Default Formats](#default-formats)
  - [Custom List Items (`numberFormatListItems`)](#custom-list-items-numberformatlistitems)
  - [Commands Support](#commands-support-1)
- [BulletFormat List](#bulletformat-list)
  - [Supported Bullet Styles](#supported-bullet-styles)
  - [Default Styles](#default-styles)
- [Checklist](#checklist)
  - [Checkbox Shape (`checklistType`)](#checkbox-shape-checklisttype)
  - [Commands Support](#commands-support-2)
- [Keyboard shortcuts (lists & indentation)](#keyboard-shortcuts-lists--indentation)
- [API Reference](#api-reference)
  - [BulletFormatList](#bulletformatlist)
  - [BulletFormatListItem](#bulletformatlistitem)
  - [NumberFormatList](#numberformatlist)
  - [NumberFormatListItem](#numberformatlistitem)
  - [CustomFormatListItem](#customformatlistitem)
  - [ListCommandBuilder](#listcommandbuilder)
  - [ListStyleCommandBuilder](#liststylecommandbuilder)
  - [ChecklistCommandBuilder](#checklistcommandbuilder)
  - [ListSettings](#listsettings)
  - [ListSettingsModel](#listsettingsmodel)

---

## Overview

The List feature in the Rich Text Editor enables users to create and format different types of lists for organizing and presenting content. Lists provide structured ways to display information and improve content readability. The Rich Text Editor supports three primary list types: numbered (NumberFormat), bulleted (BulletFormat), and checklist items.

**Note:** List format items are configured in the toolbar item configuration. Refer to the [Toolbar](toolbar.md) reference for toolbar setup instructions.

## List Types Overview

The Rich Text Editor provides three distinct list types, each designed for different content organization needs:

| List Type | Purpose | Use Case |
| --- | --- | --- |
| **NumberFormat List** | Ordered lists with numeric formatting | Step-by-step instructions, sequences, ranked items |
| **BulletFormat List** | Unordered lists with bullet markers | Key points, feature lists, general items |
| **Checklist** | Interactive checkbox items | Task lists, requirements, verification items |

## Configuring List Items in Toolbar

To configure which list format options appear in the toolbar, use the toolbar item configuration. List items are configured through the [`listSettings`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/listSettings) property when setting up toolbar items.

```ts
public toolbar: object = {
    items: [
        'NumberFormatList',  // Displays configured number formats
        'BulletFormatList',  // Displays configured bullet styles
        'Checklist'          // Displays checklist button
    ]
};
public listSettings: object = {
    numberFormatListItems: [
        { text: 'Decimal', listType: 'decimal' },
        { text: 'Roman', listType: 'upper-roman' }
    ],
    bulletFormatListItems: [
        { text: 'Disc', listType: 'disc' },
        { text: 'Circle', listType: 'circle' }
    ],
    checklistType: 'Square'
};
```

```html
<ejs-richtexteditor-ui
    [toolbarSettings]="toolbar"
    [listSettings]="listSettings">
</ejs-richtexteditor-ui>
```

## Common Commands

All list operations use the following commands:
- **`numberedList`** - Create a numbered list
- **`bulletList`** - Create a bulleted list
- **`toggleTaskList`** - Create a checklist
- **`setListStyle`** - Change the current list style

```ts
// Create a bullet list
this.rteObj.commands().bulletList().apply();

// Change to Roman numerals
this.rteObj.commands().numberedList().options({ listType: 'upper-alpha' }).apply();

// Toggle checklist
this.rteObj.commands().toggleTaskList().apply();
```

## NumberFormat List

The NumberFormat List feature enables users to create and manage ordered lists with numeric markers. Numbered lists are essential for presenting sequential information, step-by-step instructions, ranked items, and any content that requires a specific order.

### Supported Number Formats

The Rich Text Editor supports the following numbering formats for ordered lists:

**Available Numbering Formats:**
- `'decimal'` - Standard numeric (1, 2, 3, ...)
- `'lower-alpha'` - Lowercase alphabetic (a, b, c, ...)
- `'upper-alpha'` - Uppercase alphabetic (A, B, C, ...)
- `'lower-roman'` - Lowercase Roman numerals (i, ii, iii, ...)
- `'upper-roman'` - Uppercase Roman numerals (I, II, III, ...)
- `'lower-greek'` - Lowercase Greek letters (α, β, γ, ...)

### Default Formats

By default, the Rich Text Editor provides six standard number formats accessible from the toolbar dropdown:
- Number
- Lower Greek
- Lower Roman
- Upper Alpha
- Lower Alpha
- Upper Roman

The following example demonstrates how to add the number format list in toolbar of the Angular Modern Rich Text Editor.

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
        items: ['NumberFormatList']
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings">
</ejs-richtexteditor-ui>
```

### Custom List Items (`numberFormatListItems`)

You can customize which number formats are available in the toolbar by modifying the [`numberFormatListItems`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/listSettings#numberFormatListItems) property. This allows you to define a subset of supported formats or add custom ones tailored to your application's needs.

**Property:** `listSettings.numberFormatListItems`

The following example demonstrates how to customize the number format list in the Angular Modern Rich Text Editor.

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
        items: ['NumberFormatList']
    };
    public listSettings: object = {
        numberFormatListItems: [
            { text: 'Decimal', listType: 'decimal' },
            { text: 'Roman', listType: 'upper-roman' },
            { text: 'Alpha', listType: 'upper-alpha' }
        ]
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings"
    [listSettings]="listSettings">
</ejs-richtexteditor-ui>
```

### Commands Support

Commands provide programmatic control over NumberFormat List operations. Use these commands to create, modify, and manage numbered lists within the editor.

#### Create Numbered List

**Command:** `numberedList`

**Description:** Inserts a numbered list at the current cursor position or applies numbering to selected content.

**Options:**
- `listType` (optional) - Specify the numbering format (e.g., `'decimal'`, `'lower-roman'`, `'upper-alpha'`)

**Example:**

```ts
// Insert a numbered list with default decimal format
this.rteObj.commands().numberedList().apply();
```

#### Change Number Format

**Command:** `setListStyle`

**Description:** Changes the numbering format of an existing numbered list without creating a new list.

**Options:**
- `listType` (required) - The new numbering format to apply

**Available Formats:**
- `'decimal'` - Standard numbering (1, 2, 3, ...)
- `'lower-alpha'` - Lowercase letters (a, b, c, ...)
- `'upper-alpha'` - Uppercase letters (A, B, C, ...)
- `'lower-roman'` - Lowercase Roman numerals (i, ii, iii, ...)
- `'upper-roman'` - Uppercase Roman numerals (I, II, III, ...)
- `'lower-greek'` - Greek letters (α, β, γ, ...)

**Example:**

```ts
// Change current list to Uppercase letters
this.rteObj.commands().numberedList().options({ listType: 'upper-alpha' }).apply();
```

## BulletFormat List

The BulletFormat List feature enables users to create and manage unordered lists with bullet markers. Bulleted lists are ideal for presenting key points, feature lists, and any content that does not require a specific order.

### Supported Bullet Styles

The Rich Text Editor supports the following bullet styles for unordered lists:

**Available Bullet Styles:**
- `'disc'` - Filled circle bullet (●)
- `'circle'` - Hollow circle bullet (○)
- `'square'` - Square bullet (■)

### Default Styles

By default, the Rich Text Editor provides three standard bullet styles accessible from the toolbar dropdown:
- Disc
- Circle
- Square

The following example demonstrates how to add the bullet format list in toolbar of the Angular Modern Rich Text Editor.

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
        items: ['BulletFormatList']
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings">
</ejs-richtexteditor-ui>
```

## Checklist

The Checklist feature enables users to create and manage interactive checkbox lists within the Rich Text Editor. Checklists are ideal for task management, requirements tracking, and scenarios where items need to be marked as complete or incomplete.

### Checkbox Shape (`checklistType`)

The `checklistType` property defines the visual shape of checkboxes in checklist items.

**Property Name:** `listSettings.checklistType`

**Available Shapes:**
- `'Square'` - Square-shaped checkbox (□ / ☑) — **default**
- `'Circle'` - Circular checkbox (○ / ◉)

```ts
// Create a Rich Text Editor with default square checkboxes
public toolbarSettings: object = {
    items: ['Checklist']
};

// Use circular checkboxes
public listSettings: object = {
    checklistType: 'Circle'
};

// Change checkbox shape at runtime
this.rteObj.listSettings.checklistType = 'Square';
```

### Commands Support

Commands provide programmatic control over Checklist operations. Use these commands to create, modify, and manage checklists within the editor.

#### Create Checklist

**Command:** `taskList`

**Description:** Inserts a checklist at the current cursor position or applies checklist formatting to the selected content. If the selected content is already formatted as a checklist, executing the same command again removes the checklist formatting and reverts it to a normal paragraph.

```ts
this.rteObj.commands().toggleTaskList().apply();
```

## Keyboard shortcuts (lists & indentation)

| Action | Windows / Linux | macOS | Description |
| :--- | :--- | :--- | :--- |
| **Ordered List** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd> | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd> | Inserts or toggles a numbered list. |
| **Unordered List** | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>O</kbd> | <kbd>⌘</kbd> + <kbd>Option</kbd> + <kbd>O</kbd> | Inserts or toggles a bulleted list. |
| **Checklist** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>7</kbd> | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>7</kbd> | Inserts or toggles an interactive checklist. |
| **Indent** | <kbd>Tab</kbd> | <kbd>Tab</kbd> | Increases the indentation level of a list item or text. |
| **Outdent** | <kbd>Shift</kbd> + <kbd>Tab</kbd> | <kbd>Shift</kbd> + <kbd>Tab</kbd> | Decreases the indentation level of a list item or text. |
---

## API Reference

### BulletFormatList

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/bulletformatlist>

Reusable definition of a bulleted (unordered) list style. Mirrors the CSS `list-style-type` value of the same name and is the canonical mapping consumed by the toolbar layer when rendering a "Bullet List" dropdown.

#### Properties

- `command: string` — Editor command name dispatched when the entry is selected.
- `id: string` — Stable identifier used by the toolbar renderer.
- `listType: BulletListType` — Underlying list-style type passed to the headless editor.
- `text: string` — Display label shown in the toolbar dropdown.

---

### BulletFormatListItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/bulletformatlistitem>

Members:

- `BulletListType`
- `CustomFormatListItem`

---

### NumberFormatList

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/numberformatlist>

Reusable definition of a numbered (ordered) list style. Mirrors the CSS `list-style-type` value of the same name and is the canonical mapping consumed by the toolbar layer when rendering a "Numbered List" dropdown.

#### Properties

- `command: string` — Editor command name dispatched when the entry is selected.
- `id: string` — Stable identifier used by the toolbar renderer.
- `listType: NumberListType` — Underlying list-style type passed to the headless editor.
- `text: string` — Display label shown in the toolbar dropdown.

---

### NumberFormatListItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/numberformatlistitem>

Members:

- `NumberListType`
- `CustomFormatListItem`

---

### CustomFormatListItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/customformatlistitem>

Custom dropdown item.

#### Properties

- `listType: string` — Custom CSS `list-style-type` value.
- `text: string` — Text displayed in dropdown.

---

### ListCommandBuilder

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/listcommandbuilder>

Builder for list commands (`numberedList`, `bulletList`).

#### Methods

- `options(opts: Partial): this` — Set list options. Parameter `opts`: the list command options. Returns `this`.
- `apply(): void` — Execute the list command with set options. Returns `void`.

---

### ListStyleCommandBuilder

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/liststylecommandbuilder>

Builder for list style command.

#### Methods

- `listType(styleType: string): this` — Set the list style type. Parameter `styleType`: the list style type to set. Returns `this`.
- `apply(): void` — Execute the list style command with set options. Returns `void`.

---

### ChecklistCommandBuilder

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/checklistcommandbuilder>

Builder for checklist command.

#### Methods

- `apply(): void` — Execute the checklist command. Returns `void`.

---

### ListSettings

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/listsettings>

#### Properties

- `bulletFormatListItems: BulletFormatListItem[]` — Defines the items displayed in the `BulletFormatList` dropdown. Defaults to `BulletFormatLists`.
- `numberFormatListItems: NumberFormatListItem[]` — Defines the items displayed in the `NumberFormatList` dropdown. Defaults to `NumberFormatLists`.

---

### ListSettingsModel

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/listsettingsmodel>

Interface for a class `ListSettings`.

#### Properties

- `bulletFormatListItems: BulletFormatListItem[]` — Defines the items displayed in the `BulletFormatList` dropdown.
- `numberFormatListItems: NumberFormatListItem[]` — Defines the items displayed in the `NumberFormatList` dropdown.
