# Ribbon Customization

Customize ribbon tabs, toolbar items, and file menu in the Spreadsheet.

## Table of Contents

- [Minimal Code](#minimal-code)
- [Placeholders](#placeholders)
- [API Reference](#api-reference)
  - [addRibbonTabs](#addribbontabs)
  - [addToolbarItems](#addtoolbaritems)
  - [hideRibbonTabs](#hideribbontabs)
  - [enableRibbonTabs](#enableribbontabs)
  - [hideToolbarItems](#hidetoolbaritems)
  - [enableToolbarItems](#enabletoolbaritems)
  - [addFileMenuItems](#addfilemenuitems)
  - [hideFileMenuItems](#hidefilemenuitems)
  - [enableFileMenuItems](#enablefilemenuitems)
- [Models](#models)
- [Notes](#notes)

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet: Spreadsheet = new Spreadsheet({
  sheets: [{ name: 'Sheet1' }],
  created: (): void => {

    // Add custom ribbon tab
    spreadsheet.addRibbonTabs([{
      header: { text: 'Tools' },
      content: [{
        text: 'Analyze',
        tooltipText: 'Run analysis'
      }, {
        type: 'Separator'
      }, {
        text: 'Export',
        tooltipText: 'Export data'
      }]
    }], 'Data');  // Insert before 'Data' tab

    // Add toolbar items to existing tab
    spreadsheet.addToolbarItems('Home', [{
      text: 'Convert',
      tooltipText: 'Convert to uppercase'
    }, {
      type: 'Separator'
    }], 15);

    // Hide/show ribbon tabs
    spreadsheet.hideRibbonTabs(['Formulas', 'View'], true);   // hide
    spreadsheet.hideRibbonTabs(['Formulas'], false);          // show

    // Enable/disable ribbon tabs
    spreadsheet.enableRibbonTabs(['Data'], false);            // disable
    spreadsheet.enableRibbonTabs(['Data'], true);             // enable

    // Hide/show toolbar items by index
    spreadsheet.hideToolbarItems('Home', [0, 1, 2], true);    // hide
    spreadsheet.hideToolbarItems('Home', [0, 1, 2], false);   // show

    // Enable/disable toolbar items
    spreadsheet.enableToolbarItems('Home', [0, 1], false);    // disable by index
    spreadsheet.enableToolbarItems('Home', ['spreadsheet_bold'], false); // disable by ID

    // Add file menu items
    spreadsheet.addFileMenuItems([{
      text: 'Print Preview'
    }], 'Save As', false);  // Insert before 'Save As'

    // Hide/enable file menu items
    spreadsheet.hideFileMenuItems(['PDF Document'], true);
    spreadsheet.enableFileMenuItems(['New'], false);
  }
});

spreadsheet.appendTo('#spreadsheet');
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[TAB_NAME]` | Ribbon tab name | `'Home'`, `'Insert'`, `'Data'`, `'View'`, `'Formulas'` |
| `[ITEM_TEXT]` | Toolbar item label | `'Bold'`, `'Convert'`, `'Analyze'` |
| `[TOOLTIP]` | Hover text | `'Run analysis'`, `'Export data'` |
| `[POSITION]` | Index for insertion | `0`, `5`, `15` |
| `[INSERT_BEFORE]` | Tab name to insert before | `'Data'`, `'View'` |
| `[MENU_TEXT]` | File menu item label | `'Save As'`, `'New'`, `'Print'` |

## API Reference

### addRibbonTabs
```typescript
// addRibbonTabs(items: RibbonItemModel[], insertBefore?: string): void
spreadsheet.addRibbonTabs([{ header: { text: '[TAB_NAME]' }, content: [...] }], '[INSERT_BEFORE]');
```

### addToolbarItems
```typescript
// addToolbarItems(tab: string, items: ItemModel[], index?: number): void
spreadsheet.addToolbarItems('[TAB_NAME]', [{ text: '[ITEM_TEXT]', tooltipText: '[TOOLTIP]' }], [POSITION]);
```

### hideRibbonTabs
```typescript
// hideRibbonTabs(tabs: string[], hide?: boolean): void
spreadsheet.hideRibbonTabs(['[TAB_NAME]'], true);   // hide
spreadsheet.hideRibbonTabs(['[TAB_NAME]'], false);  // show
```

### enableRibbonTabs
```typescript
// enableRibbonTabs(tabs: string[], enable?: boolean): void
spreadsheet.enableRibbonTabs(['[TAB_NAME]'], false);  // disable
spreadsheet.enableRibbonTabs(['[TAB_NAME]'], true);   // enable
```

### hideToolbarItems
```typescript
// hideToolbarItems(tab: string, indexes: number[], hide?: boolean): void
spreadsheet.hideToolbarItems('[TAB_NAME]', [[POSITION]], true);   // hide
spreadsheet.hideToolbarItems('[TAB_NAME]', [[POSITION]], false);  // show
```

### enableToolbarItems
```typescript
// enableToolbarItems(tab: string, items: string[] | number[], enable?: boolean): void
spreadsheet.enableToolbarItems('[TAB_NAME]', [[POSITION]], false);      // by index
spreadsheet.enableToolbarItems('[TAB_NAME]', ['[ITEM_ID]'], false);     // by ID
```

### addFileMenuItems
```typescript
// addFileMenuItems(items: MenuItemModel[], text: string, insertAfter?: boolean): void
spreadsheet.addFileMenuItems([{ text: '[ITEM_TEXT]' }], '[MENU_TEXT]', false);  // before
spreadsheet.addFileMenuItems([{ text: '[ITEM_TEXT]' }], '[MENU_TEXT]', true);   // after
```

### hideFileMenuItems
```typescript
// hideFileMenuItems(items: string[], hide?: boolean, isUniqueId?: boolean): void
spreadsheet.hideFileMenuItems(['[MENU_TEXT]'], true);   // hide
spreadsheet.hideFileMenuItems(['[MENU_TEXT]'], false);  // show
```

### enableFileMenuItems
```typescript
// enableFileMenuItems(items: string[], enable?: boolean, isUniqueId?: boolean): void
spreadsheet.enableFileMenuItems(['[MENU_TEXT]'], false);  // disable
spreadsheet.enableFileMenuItems(['[MENU_TEXT]'], true);   // enable
```

## Models

```typescript
interface RibbonItemModel {
  header?: { text: string };    // Tab header label
  content?: ItemModel[];        // Toolbar items inside tab
}

interface ItemModel {
  type?: 'Button' | 'Separator' | 'DropDown';
  text?: string;                // Button label
  tooltipText?: string;         // Hover tooltip
  id?: string;                  // Unique ID for reference
}

interface MenuItemModel {
  text: string;                 // Menu item label
  items?: MenuItemModel[];      // Submenu items
  separator?: boolean;          // Separator line
}
```

## Notes

- All ribbon methods must be called inside the `created` event
- `hideRibbonTabs` is preferred over `enableRibbonTabs` for permanent removal (cleaner UI)
- `enableToolbarItems` accepts either item index (`number[]`) or item ID (`string[]`)