# Ribbon Customization

Customize the ribbon toolbar by adding, removing, or modifying ribbon tabs, toolbar items, and file menu items in the Spreadsheet Editor.

## Minimal Code

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RowsDirective, RowDirective, CellsDirective, CellDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current; 
      // === Add custom ribbon tab ===
      spreadsheet.addRibbonTabs([{
        header: { text: 'Custom' },
        content: [{
          text: 'Custom Button',
          tooltipText: 'Click for custom action'
        }]
      }], 'Data');  // Insert before 'Data' tab

      // === Add toolbar items to existing tab ===
      spreadsheet.addToolbarItems('Home', [{
        type: 'Separator'
      }, {
        text: 'Convert',
        tooltipText: 'Convert to uppercase'
      }], 15);  // Add at position 15

      // === Add file menu items ===
      spreadsheet.addFileMenuItems([{
        text: 'Print Preview'
      }], 'Save As', false);  // Insert before 'Save As'

      // === Hide ribbon tabs ===
      spreadsheet.hideRibbonTabs(['Formulas', 'Insert'], true);

      // === Show/Hide toolbar items ===
      spreadsheet.hideToolbarItems('Home', [0, 1, 2, 4], true);

      // === Enable/Disable ribbon tabs ===
      spreadsheet.enableRibbonTabs(['Home', 'Insert'], true);

      // === Enable/Disable toolbar items ===
      spreadsheet.enableToolbarItems('Home', [11, 13], false);

      setTimeout(() => {
        const customButton = document.querySelector('[title="Convert to uppercase"]');
        if (customButton) {
          customButton.addEventListener('click', () => {
            const sheet = spreadsheet.getActiveSheet();
            const range = sheet.selectedRange;
            // Convert selected cells to uppercase...
          });
        }
      })
    };

    const fileMenuBeforeOpen = (args) => {
        // === Hide file menu items ===
        spreadsheet.hideFileMenuItems(['PDF Document'], true);

        // === Enable/Disable file menu items ===
        spreadsheet.enableFileMenuItems(['New'], false, false);
    };
    return (<div className='control-pane'>
            <div className='control-section spreadsheet-control'>
                <SpreadsheetComponent ref={spreadsheetRef} created={onCreated} fileMenuBeforeOpen={fileMenuBeforeOpen}>
                    <SheetsDirective>
                        <SheetDirective name="Sheet1">
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>
            </div>
        </div>);
}
export default Default;

```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[TAB_NAME]` | Ribbon tab name | `'Home'`, `'Insert'`, `'Data'`, `'View'` |
| `[ITEM_TEXT]` | Toolbar item label | `'Bold'`, `'Italic'`, `'Custom'` |
| `[POSITION]` | Index for insertion | `0`, `5`, `15` |
| `[ICON_ID]` | Icon class or ID (optional) | `'e-icons e-bold'` |
| `[TOOLTIP]` | Hover text | `'Make text bold'`, `'Custom action'` |

## Key Methods

### `addRibbonTabs(items, insertBefore?)`
Adds custom ribbon tabs to the spreadsheet.

**Parameters**:
- `items` (RibbonItemModel[]) — array of ribbon tab definitions
- `insertBefore` (string, optional) — tab name before which to insert (default: append at end)

**Returns**: void

```jsx
spreadsheet.addRibbonTabs([{
  header: { text: 'Tools' },
  content: [{
    text: 'Analyze',
    tooltipText: 'Data Analysis'
  }, {
    type: 'Separator'
  }, {
    text: 'Export',
    tooltipText: 'Export Data'
  }]
}], 'Data');  // Insert before 'Data' tab
```

### `addToolbarItems(tab, items, index?)`
Adds toolbar items to an existing ribbon tab.

**Parameters**:
- `tab` (string) — tab name (`'Home'`, `'Insert'`, `'Data'`, `'View'`)
- `items` (ItemModel[]) — toolbar items to add
- `index` (number, optional) — position in toolbar (default: append)

**Returns**: void

```jsx
spreadsheet.addToolbarItems('Home', [{
  type: 'Button',
  text: 'Uppercase',
  tooltipText: 'Convert to uppercase'
}, {
  type: 'Separator'
}], 10);  // Insert at position 10
```

### `addFileMenuItems(items, text, insertAfter?, isUniqueId?)`
Adds items to the File menu.

**Parameters**:
- `items` (MenuItemModel[]) — menu items
- `text` (string) — existing menu item before/after which to insert
- `insertAfter` (boolean, optional) — `true` to insert after, `false` to insert before (default: `true`)
- `isUniqueId` (boolean, optional) — `true` if the given file menu items text is a unique id. (default: `true`)

**Returns**: void

```jsx
spreadsheet.addFileMenuItems([{
  text: 'Recent Files'
}, {
  text: 'Templates'
}], 'New', false);  // Insert before 'New'
```

### `hideRibbonTabs(tabs, hide?)`
Shows or hides ribbon tabs.

**Parameters**:
- `tabs` (string[]) — tab names to hide/show
- `hide` (boolean) — `true` to hide, `false` to show (default: `true`)

**Returns**: void

```jsx
spreadsheet.hideRibbonTabs(['Formulas', 'View'], true);   // Hide
spreadsheet.hideRibbonTabs(['Formulas'], false);          // Show
```

### `hideToolbarItems(tab, indexes, hide?)`
Shows or hides toolbar items in a specific tab.

**Parameters**:
- `tab` (string) — tab name
- `indexes` (number[]) — toolbar item indices
- `hide` (boolean) — `true` to hide, `false` to show (default: `true`)

**Returns**: void

```jsx
spreadsheet.hideToolbarItems('Home', [0, 1, 2], true);    // Hide first 3 items
spreadsheet.hideToolbarItems('Insert', [5], false);       // Show item at index 5
```

### `enableRibbonTabs(tabs, enable?)`
Enables or disables ribbon tabs.

**Parameters**:
- `tabs` (string[]) — tab names
- `enable` (boolean) — `true` to enable, `false` to disable (default: `true`)

**Returns**: void

```jsx
spreadsheet.enableRibbonTabs(['Data'], false);  // Disable Data tab
```

### `enableToolbarItems(tab, items, enable?)`
Enables or disables toolbar items.

**Parameters**:
- `tab` (string) — tab name
- `items` (string[] | number[]) — item unique IDs or indices
- `enable` (boolean) — `true` to enable, `false` to disable (default: `true`)

**Returns**: void

```jsx
spreadsheet.enableToolbarItems('Home', [0, 1, 2], false);  // Disable items by index
spreadsheet.enableToolbarItems('Home', ['spreadsheet_bold'], false);  // Disable by ID
```

### `hideFileMenuItems(items, hide?, isUniqueId?)`
Shows or hides file menu items.

**Parameters**:
- `items` (string[]) — menu item texts to hide/show
- `hide` (boolean) — `true` to hide, `false` to show (default: `true`)
- `isUniqueId` (boolean, optional) — if item names are unique IDs (default: `false`)

**Returns**: void

```jsx
spreadsheet.hideFileMenuItems(['PDF Document'], true);
```

### `enableFileMenuItems(items, enable?)`
Enables or disables file menu items.

**Parameters**:
- `items` (string[]) — menu item texts
- `enable` (boolean) — `true` to enable, `false` to disable (default: `true`)
- `isUniqueId` (boolean, optional) — if using unique IDs (default: `false`)

**Returns**: void

```jsx
spreadsheet.enableFileMenuItems(['New'], false);  // Disable 'New'
```

## Common Ribbon Tabs

| Tab Name | Purpose |
|----------|---------|
| `'Home'` | Font, alignment, fill, borders, styles |
| `'Insert'` | Charts, images, hyperlinks, shapes |
| `'Data'` | Sort, filter, validation, consolidate |
| `'View'` | Freeze panes, split, zoom, gridlines |
| `'Formulas'` | Function library, named ranges |

## Advanced: Custom Button with Click Handler

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current; 
      // Add custom button
      spreadsheet.addToolbarItems('Home', [{
        text: 'Sum Selection',
        tooltipText: 'Sum selected cells',
        id: 'sum-button'
      }]);

      // Attach click handler
      setTimeout(() => {
        const btn = document.getElementById('sum-button');
        if (btn) {
          btn.addEventListener('click', () => {
            const sheet = spreadsheet.getActiveSheet();
            const range = sheet.selectedRange;
            
            if (range) {
              // Place SUM formula in next row
              const [startRow, startCol] = range.split(':')[0].match(/[A-Z]+|[0-9]+/g)!.map((c, i) => 
                i === 0 ? c.charCodeAt(0) - 65 : parseInt(c) - 1
              );
              
              spreadsheet.updateCell(
                { formula: `=SUM(${range})` },
                `A${startRow + 2}`
              );
            }
          });
        }
      }, 100);
    }
    return (<SpreadsheetComponent ref={spreadsheetRef} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective name="Sheet1">
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;

```

## Ribbon Item Model

```tsx
interface RibbonItemModel {
  header?: { text: string };     // Tab header
  content?: ItemModel[];         // Toolbar items in tab
}

interface ItemModel {
  type?: 'Button' | 'Separator' | 'DropDown';
  text?: string;                 // Button label
  tooltipText?: string;          // Hover tooltip
  id?: string;                   // Unique ID for reference
  icon?: string;                 // Icon class (e.g., 'e-icons e-bold')
  items?: MenuItemModel[];        // Dropdown items
}

interface MenuItemModel {
  text: string;                  // Menu item label
  items?: MenuItemModel[];        // Submenu items
  separator?: boolean;           // Separator line
}
```

