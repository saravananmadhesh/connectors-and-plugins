# Context Menu Customization

Customize the right-click context menu by adding, removing, or enabling/disabling items for different contexts.

## Key Methods

| Method | Signature | Returns |
|---|---|---|
| `addContextMenuItems` | `addContextMenuItems(items: MenuItemModel[], text: string, insertAfter?: boolean, isUniqueId?: boolean)` | `void` |
| `removeContextMenuItems` | `removeContextMenuItems(items: string[], isUniqueId?: boolean)` | `void` |
| `enableContextMenuItems` | `enableContextMenuItems(items: string[], enable: boolean, isUniqueId?: boolean)` | `void` |

## Events

| Event | Args | Description |
|---|---|---|
| `contextMenuBeforeOpen` | `BeforeOpenCloseMenuEventArgs` | Fires before menu opens; set `args.cancel = true` to prevent |
| `contextMenuItemSelect` | `MenuSelectEventArgs` | Fires when a menu item is clicked |
| `contextMenuBeforeClose` | `BeforeOpenCloseMenuEventArgs` | Fires before menu closes |

## Minimal Code

```typescript
import { Spreadsheet, BeforeOpenCloseMenuEventArgs, MenuSelectEventArgs } from '@syncfusion/ej2-spreadsheet';
import { closest } from '@syncfusion/ej2-base';

const spreadsheet = new Spreadsheet({
  sheets: [{ name: 'Sheet1' }],

  contextMenuBeforeOpen: (args: BeforeOpenCloseMenuEventArgs): void => {
    if (closest(args.event.target as Element, '.e-sheet-content')) {
      // Cell right-click
      spreadsheet.addContextMenuItems([{ text: 'Analyze' }], 'Paste', true);
      spreadsheet.removeContextMenuItems(['Cut']);
      spreadsheet.enableContextMenuItems(['Paste'], false);

    } else if (closest(args.event.target as Element, '.e-colhdr-table')) {
      // Column header right-click
      spreadsheet.addContextMenuItems([{ text: 'Custom Col Option' }], 'Delete Column', false);

    } else if (closest(args.event.target as Element, '.e-rowhdr-table')) {
      // Row header right-click
      spreadsheet.addContextMenuItems([{ text: 'Custom Row Option' }], 'Delete Row', true);
    }
  },

  contextMenuItemSelect: (args: MenuSelectEventArgs): void => {
    switch (args.item.text) {
      case 'Analyze':
        // custom logic
        break;
    }
  }
});

spreadsheet.appendTo('#spreadsheet');
```

## MenuItemModel Structure

```typescript
interface MenuItemModel {
  text: string;             // Menu item label
  id?: string;              // Optional unique ID
  items?: MenuItemModel[];  // Submenu items
  separator?: boolean;      // Separator line
}
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[MENU_TEXT]` | New menu item label | `'Analyze'`, `'Custom Option'` |
| `[BEFORE_TEXT]` | Existing item to insert before/after | `'Paste'`, `'Delete'` |
| `[TARGET]` | Right-click context selector | `'.e-sheet-content'`, `'.e-colhdr-table'`, `'.e-rowhdr-table'` |

## Built-In Menu Items

| Context | Default Items |
|---|---|
| **Cell** | Cut, Copy, Paste, Paste Special, Format Cells, Insert Comment, Delete Comment, Clear Contents, Clear All, Hyperlink, Merge Cells, Unmerge Cells |
| **Column** | Insert Column Before, Insert Column After, Delete Column, Column Width, Optimal Width, Hide, Unhide |
| **Row** | Insert Above, Insert Below, Delete Row, Row Height, Optimal Height, Hide, Unhide |
| **Sheet Tab** | Insert, Delete, Rename, Move or Copy, Protect Sheet, Hide, Unhide |

## Notes

- Use `closest()` in `contextMenuBeforeOpen` to detect right-click context
- Custom items persist per open — re-add/remove in `contextMenuBeforeOpen` as needed
- `args.cancel = true` in `contextMenuBeforeOpen` prevents the menu from showing