# Context Menu Customization

Customize the right-click context menu by adding, removing, or enabling/disabling items for different contexts in the Syncfusion Angular Spreadsheet.

---

## Table of Contents

- [Minimal Angular Code](#minimal-angular-code)
- [API Reference](#api-reference)
- [Events](#events)
- [Context Menu Operations](#context-menu-operations)
  - [Add Context Menu Items](#add-context-menu-items)
  - [Remove Context Menu Items](#remove-context-menu-items)
  - [Enable or Disable Context Menu Items](#enable-or-disable-context-menu-items)
- [Context Detection Patterns](#context-detection-patterns)
- [MenuItemModel Structure](#menuitemmodel-structure)
- [Template Button Binding Example](#template-button-binding-example)
- [Built-in Menu Items](#built-in-menu-items)
- [Placeholders](#placeholders)
- [Notes](#notes)

---

## Minimal Angular Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent, BeforeOpenCloseMenuEventArgs, MenuSelectEventArgs } from '@syncfusion/ej2-angular-spreadsheet';
import { closest } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet
    #spreadsheet
    (created)="created()"
    (contextMenuBeforeOpen)="contextMenuBeforeOpen($event)"
    (contextMenuItemSelect)="contextMenuItemSelect($event)">
    <e-sheets>
      <e-sheet name="Sheet1">
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  created(): void {
    // Initialization logic if needed
  }

  contextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    if (closest(args.event.target as Element, '.e-sheet-content')) {
      // Cell right-click — add custom item after 'Paste'
      this.spreadsheet.addContextMenuItems(
        [{ text: 'Analyze' }],
        'Paste',
        true   // true = insert after, false = insert before
      );
    }
  }

  contextMenuItemSelect(args: MenuSelectEventArgs): void {
    switch (args.item.text) {
      case 'Analyze':
        console.log('Analyze clicked');
        // Add custom logic here
        break;
    }
  }
}
```

---

## API Reference

| Method | Signature | Description |
|---|---|---|
| `addContextMenuItems` | `addContextMenuItems(items: MenuItemModel[], text: string, insertAfter?: boolean, isUniqueId?: boolean)` | Add custom items to the context menu |
| `removeContextMenuItems` | `removeContextMenuItems(items: string[], isUniqueId?: boolean)` | Remove items from the context menu |
| `enableContextMenuItems` | `enableContextMenuItems(items: string[], enable: boolean, isUniqueId?: boolean)` | Enable or disable context menu items |

---

## Events

| Event | Args | Description |
|---|---|---|
| `contextMenuBeforeOpen` | `BeforeOpenCloseMenuEventArgs` | Fires before menu opens; set `args.cancel = true` to prevent |
| `contextMenuItemSelect` | `MenuSelectEventArgs` | Fires when a menu item is clicked |
| `contextMenuBeforeClose` | `BeforeOpenCloseMenuEventArgs` | Fires before menu closes |

---

## Context Menu Operations

### Add Context Menu Items
```typescript
contextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
  // Add single item after 'Paste'
  this.spreadsheet.addContextMenuItems(
    [{ text: 'Analyze' }],
    'Paste',
    true  // Insert after
  );

  // Add multiple items with separator
  this.spreadsheet.addContextMenuItems(
    [
      { text: 'Custom Option 1' },
      { separator: true },
      { text: 'Custom Option 2' }
    ],
    'Copy',
    false  // Insert before
  );

  // Add item with submenu
  this.spreadsheet.addContextMenuItems(
    [
      {
        text: 'Export As',
        items: [
          { text: 'Export to PDF' },
          { text: 'Export to CSV' }
        ]
      }
    ],
    'Paste',
    true
  );
}
```

### Remove Context Menu Items
```typescript
contextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
  // Remove single item
  this.spreadsheet.removeContextMenuItems(['Cut']);

  // Remove multiple items
  this.spreadsheet.removeContextMenuItems(['Cut', 'Copy', 'Paste']);
}
```

### Enable or Disable Context Menu Items
```typescript
contextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
  // Disable Paste
  this.spreadsheet.enableContextMenuItems(['Paste'], false);

  // Re-enable Paste
  this.spreadsheet.enableContextMenuItems(['Paste'], true);

  // Disable multiple items
  this.spreadsheet.enableContextMenuItems(['Cut', 'Copy'], false);
}
```

---

## Context Detection Patterns

Use `closest()` inside `contextMenuBeforeOpen` to detect which area was right-clicked and apply context-specific customizations.

```typescript
import { closest } from '@syncfusion/ej2-base';

contextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {

  if (closest(args.event.target as Element, '.e-sheet-content')) {
    // --- Cell right-click ---
    this.spreadsheet.addContextMenuItems(
      [{ text: 'Analyze Cell' }], 'Paste', true
    );
    this.spreadsheet.removeContextMenuItems(['Cut']);
    this.spreadsheet.enableContextMenuItems(['Paste'], false);

  } else if (closest(args.event.target as Element, '.e-colhdr-table')) {
    // --- Column header right-click ---
    this.spreadsheet.addContextMenuItems(
      [{ text: 'Custom Column Option' }], 'Delete Column', false
    );

  } else if (closest(args.event.target as Element, '.e-rowhdr-table')) {
    // --- Row header right-click ---
    this.spreadsheet.addContextMenuItems(
      [{ text: 'Custom Row Option' }], 'Delete Row', true
    );

  } else if (closest(args.event.target as Element, '.e-sheet-tab')) {
    // --- Sheet tab right-click ---
    this.spreadsheet.addContextMenuItems(
      [{ text: 'Duplicate Sheet' }], 'Rename', true
    );
  }
}
```

### Prevent Menu from Opening
```typescript
contextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
  // Completely suppress the context menu
  args.cancel = true;
}
```

---

## MenuItemModel Structure

```typescript
interface MenuItemModel {
  text: string;             // Menu item label
  id?: string;              // Optional unique ID (used with isUniqueId)
  items?: MenuItemModel[];  // Submenu items
  separator?: boolean;      // Render as separator line
  iconCss?: string;         // CSS class for icon (optional)
}
```

---

## Template Button Binding Example

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  SpreadsheetAllModule,
  SpreadsheetComponent,
  BeforeOpenCloseMenuEventArgs,
  MenuSelectEventArgs
} from '@syncfusion/ej2-angular-spreadsheet';
import { closest } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet
    #spreadsheet
    (created)="created()"
    (contextMenuBeforeOpen)="contextMenuBeforeOpen($event)"
    (contextMenuItemSelect)="contextMenuItemSelect($event)">
    <e-sheets>
      <e-sheet name="Sheet1">
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  public data: object[] = [
    { Item: 'Pen',   Price: 10, Qty: 5 },
    { Item: 'Book',  Price: 25, Qty: 3 },
    { Item: 'Ruler', Price: 15, Qty: 8 }
  ];

  created(): void {
    // Initialization logic if needed
  }

  contextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    if (closest(args.event.target as Element, '.e-sheet-content')) {
      this.spreadsheet.addContextMenuItems(
        [
          { text: 'Analyze' },
          { separator: true },
          { text: 'Export As', items: [
              { text: 'Export to PDF' },
              { text: 'Export to CSV' }
            ]
          }
        ],
        'Paste',
        true
      );
      this.spreadsheet.removeContextMenuItems(['Cut']);
      this.spreadsheet.enableContextMenuItems(['Paste'], false);

    } else if (closest(args.event.target as Element, '.e-colhdr-table')) {
      this.spreadsheet.addContextMenuItems(
        [{ text: 'Custom Column Option' }], 'Delete Column', false
      );

    } else if (closest(args.event.target as Element, '.e-rowhdr-table')) {
      this.spreadsheet.addContextMenuItems(
        [{ text: 'Custom Row Option' }], 'Delete Row', true
      );
    }
  }

  contextMenuItemSelect(args: MenuSelectEventArgs): void {
    switch (args.item.text) {
      case 'Analyze':
        console.log('Analyze triggered');
        break;
      case 'Export to PDF':
        console.log('Export to PDF triggered');
        break;
      case 'Export to CSV':
        console.log('Export to CSV triggered');
        break;
      case 'Custom Column Option':
        console.log('Custom Column Option triggered');
        break;
      case 'Custom Row Option':
        console.log('Custom Row Option triggered');
        break;
    }
  }

  contextMenuBeforeClose(args: BeforeOpenCloseMenuEventArgs): void {
    console.log('Context menu closing');
  }
}
```

---

## Built-in Menu Items

| Context | Default Items |
|---|---|
| **Cell** | Cut, Copy, Paste, Paste Special, Format Cells, Insert Comment, Delete Comment, Clear Contents, Clear All, Hyperlink, Merge Cells, Unmerge Cells |
| **Column** | Insert Column Before, Insert Column After, Delete Column, Column Width, Optimal Width, Hide, Unhide |
| **Row** | Insert Above, Insert Below, Delete Row, Row Height, Optimal Height, Hide, Unhide |
| **Sheet Tab** | Insert, Delete, Rename, Move or Copy, Protect Sheet, Hide, Unhide |

---

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[MENU_TEXT]` | New menu item label | `'Analyze'`, `'Custom Option'` |
| `[BEFORE_TEXT]` | Existing item to insert before/after | `'Paste'`, `'Delete Column'` |
| `[TARGET]` | Right-click context selector | `'.e-sheet-content'`, `'.e-colhdr-table'`, `'.e-rowhdr-table'`, `'.e-sheet-tab'` |
| `[ITEM_ID]` | Unique ID for menu item | `'custom-analyze'`, `'custom-export'` |

---

## Notes

- Always access `SpreadsheetComponent` via `@ViewChild` — never use `new Spreadsheet()` in Angular.
- Bind context menu events in the template: `(contextMenuBeforeOpen)`, `(contextMenuItemSelect)`, `(contextMenuBeforeClose)`.
- Use `#spreadsheet` template reference variable on `<ejs-spreadsheet>` to match `@ViewChild('spreadsheet')`.
- Always import `closest` from `@syncfusion/ej2-base` — do **not** use `document.querySelector` for context detection.
- Custom menu items added in `contextMenuBeforeOpen` **persist per open** — they stack on re-open; handle removal carefully.
- Use `removeContextMenuItems()` inside `contextMenuBeforeOpen` before re-adding to avoid duplicates.
- `args.cancel = true` inside `contextMenuBeforeOpen` completely prevents the menu from showing.
- Use `id` in `MenuItemModel` with `isUniqueId: true` for reliable item targeting when item labels may repeat.
- Import `SpreadsheetAllModule` in the `imports` array of the standalone component.