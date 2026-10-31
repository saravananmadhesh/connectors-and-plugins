# Ribbon Customization

Customize ribbon tabs, toolbar items, and file menu using `addRibbonTabs()`, `addToolbarItems()`, and related methods.

## Minimal Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: 
  `<ejs-spreadsheet #spreadsheet (created)="onCreated()">
    <e-sheets>
      <e-sheet name="Sheet1"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  onCreated(): void {

    // Add custom ribbon tab (insert before 'Data' tab)
    this.spreadsheet.addRibbonTabs([{
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
    }], 'Data');

    // Add toolbar items to existing tab at index 15
    this.spreadsheet.addToolbarItems('Home', [{
      text: 'Convert',
      tooltipText: 'Convert to uppercase'
    }, {
      type: 'Separator'
    }], 15);

    // Hide / show ribbon tabs
    this.spreadsheet.hideRibbonTabs(['Formulas', 'View'], true);  // hide
    this.spreadsheet.hideRibbonTabs(['Formulas'], false);         // show

    // Enable / disable ribbon tabs
    this.spreadsheet.enableRibbonTabs(['Data'], false);           // disable
    this.spreadsheet.enableRibbonTabs(['Data'], true);            // enable

    // Hide / show toolbar items by index
    this.spreadsheet.hideToolbarItems('Home', [0, 1, 2], true);   // hide
    this.spreadsheet.hideToolbarItems('Home', [0, 1, 2], false);  // show

    // Enable / disable toolbar items by index or ID
    this.spreadsheet.enableToolbarItems('Home', [0, 1], false);                    // by index
    this.spreadsheet.enableToolbarItems('Home', ['spreadsheet_bold'], false);      // by ID

    // Add file menu item (insert before 'Save As')
    this.spreadsheet.addFileMenuItems([{
      text: 'Print Preview'
    }], 'Save As', false);

    // Hide / enable file menu items
    this.spreadsheet.hideFileMenuItems(['PDF Document'], true);
    this.spreadsheet.enableFileMenuItems(['New'], false);
  }
}
```

## API Reference

### addRibbonTabs(items, insertBefore?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `items` | `RibbonItemModel[]` | Array of tab definitions | `[{ header: { text: 'Tools' }, content: [...] }]` |
| `insertBefore` | `string` | Tab name to insert before | `'Data'`, `'View'` |

### addToolbarItems(tab, items, index?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `tab` | `string` | Ribbon tab name | `'Home'`, `'Insert'` |
| `items` | `ItemModel[]` | Array of toolbar items | `[{ text: 'Convert', tooltipText: '...' }]` |
| `index` | `number` | Position to insert at | `0`, `15` |

### hideRibbonTabs(tabs, hide?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `tabs` | `string[]` | Tab names | `['Formulas', 'View']` |
| `hide` | `boolean` | `true` to hide, `false` to show | `true`, `false` |

### enableRibbonTabs(tabs, enable?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `tabs` | `string[]` | Tab names | `['Data']` |
| `enable` | `boolean` | `true` to enable, `false` to disable | `true`, `false` |

### hideToolbarItems(tab, indexes, hide?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `tab` | `string` | Ribbon tab name | `'Home'` |
| `indexes` | `number[]` | Item positions | `[0, 1, 2]` |
| `hide` | `boolean` | `true` to hide, `false` to show | `true`, `false` |

### enableToolbarItems(tab, items, enable?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `tab` | `string` | Ribbon tab name | `'Home'` |
| `items` | `number[] \| string[]` | Indexes or item IDs | `[0, 1]`, `['spreadsheet_bold']` |
| `enable` | `boolean` | `true` to enable, `false` to disable | `true`, `false` |

### addFileMenuItems(items, text, insertAfter?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `items` | `MenuItemModel[]` | Menu items to add | `[{ text: 'Print Preview' }]` |
| `text` | `string` | Reference menu item | `'Save As'`, `'New'` |
| `insertAfter` | `boolean` | `false` = before, `true` = after | `false`, `true` |

### hideFileMenuItems(items, hide?, isUniqueId?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `items` | `string[]` | Menu item labels or IDs | `['PDF Document']` |
| `hide` | `boolean` | `true` to hide, `false` to show | `true`, `false` |
| `isUniqueId` | `boolean` | `true` if passing element IDs | `true`, `false` |

### enableFileMenuItems(items, enable?, isUniqueId?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `items` | `string[]` | Menu item labels or IDs | `['New']` |
| `enable` | `boolean` | `true` to enable, `false` to disable | `true`, `false` |
| `isUniqueId` | `boolean` | `true` if passing element IDs | `true`, `false` |

## Models

```typescript
interface RibbonItemModel {
  header?: { text: string };              // Tab label
  content?: ItemModel[];                  // Items inside tab
}

interface ItemModel {
  type?: 'Button' | 'Separator' | 'DropDown';
  text?: string;                          // Button label
  tooltipText?: string;                   // Hover tooltip
  id?: string;                            // Unique ID for reference
}

interface MenuItemModel {
  text: string;                           // Menu item label
  items?: MenuItemModel[];                // Submenu items
  separator?: boolean;                    // Separator line
}
```

## Notes

- All ribbon methods must be called inside the `(created)` event
- `hideRibbonTabs` is preferred over `enableRibbonTabs` for permanent removal — cleaner UI
- `enableToolbarItems` accepts either item index (`number[]`) or item ID (`string[]`)
- Built-in tab names: `'Home'`, `'Insert'`, `'Formulas'`, `'Data'`, `'View'`