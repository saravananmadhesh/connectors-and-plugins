# Ribbon Customization

Customize the ribbon toolbar by adding, removing, or modifying ribbon tabs, toolbar items, and file menu items in the Spreadsheet Editor.

## Minimal Code

```cshtml
@using Syncfusion.EJ2

@Html.EJS().Spreadsheet("spreadsheet").Created("onCreated").FileMenuBeforeOpen("fileMenuBeforeOpen").SelectionSettings(sel => { sel.Mode("Multiple"); }).Sheets(sheet =>
{
    sheet.Name("Sheet1").Add();
}).Render()

<script>
    function onCreated() {
        // Get Spreadsheet instance from DOM (or use `this` if inline)
        var spreadsheet = document.getElementById('spreadsheet').ej2_instances[0];
        window.spreadsheet = spreadsheet; // optional global reference

        // === Add custom ribbon tab ===
        spreadsheet.addRibbonTabs([{
            header: { text: 'Custom' },
            content: [{
                text: 'Custom Button',
                tooltipText: 'Click for custom action'
            }]
        }], 'Data'); // Insert before 'Data' tab

        // === Add toolbar items to existing tab ===
        spreadsheet.addToolbarItems('Home', [{
            type: 'Separator'
        }, {
            text: 'Convert',
            tooltipText: 'Convert to uppercase'
        }], 15); // Add at position 15

        // === Add file menu items ===
        spreadsheet.addFileMenuItems([{
            text: 'Print Preview'
        }], 'Save As', false); // Insert before 'Save As'

        // === Hide ribbon tabs ===
        spreadsheet.hideRibbonTabs(['Formulas', 'Insert'], true);

        // === Show/Hide toolbar items ===
        spreadsheet.hideToolbarItems('Home', [0, 1, 2, 4], true);

        // === Enable/Disable ribbon tabs ===
        spreadsheet.enableRibbonTabs(['Home', 'Insert'], true);

        // === Enable/Disable toolbar items ===
        spreadsheet.enableToolbarItems('Home', [11, 13], false);

        // Attach click handler to custom toolbar button after render
        setTimeout(function () {
            var customButton = document.querySelector('[title="Convert to uppercase"]');
            if (customButton) {
                customButton.addEventListener('click', function () {
                    var sheet = spreadsheet.getActiveSheet();
                    var range = sheet.selectedRange;
                    // Implement convert-to-uppercase logic using spreadsheet.updateCell / getCell
                });
            }
        });
    }

    function fileMenuBeforeOpen(args) {
        var spreadsheet = document.getElementById('spreadsheet').ej2_instances[0];
        if (!spreadsheet) return;

        // === Hide file menu items ===
        spreadsheet.hideFileMenuItems(['PDF Document'], true);

        // === Enable/Disable file menu items ===
        spreadsheet.enableFileMenuItems(['New'], false, false);
    }
</script>
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

```cshtml
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

```cshtml
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

```cshtml
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

```cshtml
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

```cshtml
spreadsheet.hideToolbarItems('Home', [0, 1, 2], true);    // Hide first 3 items
spreadsheet.hideToolbarItems('Insert', [5], false);       // Show item at index 5
```

### `enableRibbonTabs(tabs, enable?)`
Enables or disables ribbon tabs.

**Parameters**:
- `tabs` (string[]) — tab names
- `enable` (boolean) — `true` to enable, `false` to disable (default: `true`)

**Returns**: void

```cshtml
spreadsheet.enableRibbonTabs(['Data'], false);  // Disable Data tab
```

### `enableToolbarItems(tab, items, enable?)`
Enables or disables toolbar items.

**Parameters**:
- `tab` (string) — tab name
- `items` (string[] | number[]) — item unique IDs or indices
- `enable` (boolean) — `true` to enable, `false` to disable (default: `true`)

**Returns**: void

```cshtml
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

```cshtml
spreadsheet.hideFileMenuItems(['PDF Document'], true);
```

### `enableFileMenuItems(items, enable?)`
Enables or disables file menu items.

**Parameters**:
- `items` (string[]) — menu item texts
- `enable` (boolean) — `true` to enable, `false` to disable (default: `true`)
- `isUniqueId` (boolean, optional) — if using unique IDs (default: `false`)

**Returns**: void

```cshtml
spreadsheet.enableFileMenuItems(['New'], false);  // Disable 'New'
```

## Toolbar Item Types

| Type | Example | Usage |
|------|---------|-------|
| `'Button'` | `{ text: 'Bold' }` | Regular clickable button |
| `'Separator'` | `{ type: 'Separator' }` | Visual divider line |
| `'DropDown'` | `{ text: 'Format', items: [...] }` | Dropdown menu |

## Common Ribbon Tabs

| Tab Name | Purpose |
|----------|---------|
| `'Home'` | Font, alignment, fill, borders, styles |
| `'Insert'` | Charts, images, hyperlinks, shapes |
| `'Data'` | Sort, filter, validation, consolidate |
| `'View'` | Freeze panes, split, zoom, gridlines |
| `'Formulas'` | Function library, named ranges |

## Advanced: Custom Button with Click Handler

```cshtml
@using Syncfusion.EJ2

@Html.EJS().Spreadsheet("spreadsheet")
    .Created("createdHandler")
    .SelectionSettings(sel => { sel.Mode("Multiple"); })
    .Sheets(sheet =>
    {
        sheet.Name("Sheet1").Add();
    })
    .Render()

<script>
    // selectionSettings declared as a JS var (parity with the ASP.NET MVC sample)
    var selectionSettings = { mode: 'Multiple' };

    function createdHandler() {
        // 'this' is the Spreadsheet instance
        var spreadsheet = this;

        // Add custom button
        spreadsheet.addToolbarItems('Home', [{
            text: 'Sum Selection',
            tooltipText: 'Sum selected cells',
            id: 'sum-button'
        }]);

        // Attach click handler
        setTimeout(function () {
            var btn = document.getElementById('sum-button');
            if (btn) {
                btn.addEventListener('click', function () {
                    var sheet = spreadsheet.getActiveSheet();
                    var range = sheet.selectedRange;

                    if (range) {
                        // Parse start cell of range (e.g., "A1" from "A1:B2")
                        var parts = range.split(':')[0].match(/[A-Z]+|[0-9]+/g);
                        var colLetters = parts[0];
                        var rowIndex = parseInt(parts[1], 10) - 1;

                        // Place SUM formula in column A at the next row after startRow
                        spreadsheet.updateCell(
                            { formula: '=SUM(' + range + ')' },
                            'A' + (rowIndex + 2)
                        );
                    }
                });
            }
        }, 100);
    }
</script>
```

## Simplified UI: Hide Advanced Features

```cshtml
@Html.EJS().Spreadsheet("spreadsheet")
    .Created("onCreated")
    .FileMenuBeforeOpen("fileMenuBeforeOpen")
    .Sheets(sheet =>
    {
        sheet.Name("Sheet1").Add();
    })
    .Render()

<script>
    function onCreated() {
        var spreadsheet = document.getElementById('spreadsheet').ej2_instances[0];
        spreadsheet.hideRibbonTabs(['Formulas', 'Data', 'View'], true);
    }
    function fileMenuBeforeOpen() {
        var spreadsheet = document.getElementById('spreadsheet').ej2_instances[0];
        // Disable advanced features
        spreadsheet.enableFileMenuItems(['Print'], true, false);
        spreadsheet.hideFileMenuItems(['PDF Document'], true);
    }
</script>

```

## Read-Only Mode: Disable All Edits

```cshtml
@Html.EJS().Spreadsheet("spreadsheet")
    .Created("onCreated")
    .AllowEditing(false)
    .Sheets(sheet =>
    {
        sheet.Name("Sheet1").Add();
    })
    .Render()

<script>
    function onCreated() {
        var spreadsheet = document.getElementById('spreadsheet').ej2_instances[0];
        spreadsheet.hideRibbonTabs(['Home', 'Insert', 'Data'], true);
        spreadsheet.enableRibbonTabs(['View'], true);
    }
</script>

```

## Ribbon Item Model

```cshtml
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

