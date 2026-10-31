# Ribbon Customization

Customize the ribbon toolbar by adding, removing, or modifying ribbon tabs, toolbar items, and file menu items in the Spreadsheet Editor.

## Minimal Vue Code

```vue
<template>
<!-- Spreadsheet with custom Ribbon, Toolbar, File Menu and bound data -->
<ejs-spreadsheet ref="spreadsheet" :created="onCreated" :fileMenuBeforeOpen="fileMenuBeforeOpen">
  <e-sheets>
    <e-sheet name="Sheet1">
      <e-ranges>
        <e-range :dataSource="data" />
      </e-ranges>
    </e-sheet>
  </e-sheets>
</ejs-spreadsheet>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective,
RangesDirective,
RangeDirective,
getRangeIndexes,
getCell
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective,
  "e-ranges": RangesDirective,
  "e-range": RangeDirective
},

data: () => ({
  // ↳ 10‑row datasource for demo
  data: [
    { Name: "Alice", Dept: "HR", Salary: 52000 }, { Name: "Bob", Dept: "IT", Salary: 68000 },
    { Name: "Charlie", Dept: "Finance", Salary: 74000 }, { Name: "Diana", Dept: "Sales", Salary: 60000 },
    { Name: "Edward", Dept: "Support", Salary: 45000 }, { Name: "Fiona", Dept: "Design", Salary: 70000 },
    { Name: "George", Dept: "Logistics", Salary: 48000 }, { Name: "Hannah", Dept: "IT", Salary: 82000 },
    { Name: "Ian", Dept: "Marketing", Salary: 55000 }, { Name: "Julia", Dept: "Sales", Salary: 63000 }
  ]
}),

methods: {
  onCreated() {
    const spreadsheet = this.$refs.spreadsheet;

    // --- Add a custom ribbon tab ---
    spreadsheet.addRibbonTabs(
      [{ header: { text: "Custom" }, content: [{ text: "Custom Button" }] }],
      "Data"
    );

    // --- Add custom toolbar button in Home tab ---
    spreadsheet.addToolbarItems(
      "Home",
      [
        { type: "Separator" },
        { text: "Convert", tooltipText: "Convert to Uppercase" }
      ],
      15
    );

    // --- Add custom File menu item ---
    spreadsheet.addFileMenuItems([{ text: "Print Preview" }], "Save As", false);

    // --- Hide certain ribbon tabs ---
    spreadsheet.hideRibbonTabs(["Formulas", "Insert"], true);

    // --- Hide toolbar items (indexes) ---
    spreadsheet.hideToolbarItems("Home", [0, 1, 2, 4], true);

    // --- Enable specific ribbon tabs ---
    spreadsheet.enableRibbonTabs(["Home", "Insert"], true);

    // --- Disable some toolbar items by index ---
    spreadsheet.enableToolbarItems("Home", [11, 13], false);

    // --- Register click handler for Convert button ---
    setTimeout(() => {
      const btn = document.querySelector('[title="Convert to Uppercase"]');
      if (!btn) return;

      btn.addEventListener("click", () => {
        const sheet = spreadsheet.ej2Instances.getActiveSheet();
        const range = sheet.selectedRange;
        if (!range) return;

        // Convert "A2:C5" → index values
        const [r1, c1, r2, c2] = getRangeIndexes(range);

        // Loop through selected cells
        for (let r = r1; r <= r2; r++)
          for (let c = c1; c <= c2; c++) {
            const cell = getCell(r, c, sheet);
            if (cell?.value && typeof cell.value === "string") {
              spreadsheet.updateCell(
                { value: cell.value.toUpperCase() },
                `${String.fromCharCode(65 + c)}${r + 1}` // Convert column index back to A,B,C,...
              );
            }
          }
      });
    });
  },

  fileMenuBeforeOpen() {
    // Disable "New" in File menu
    this.$refs.spreadsheet.enableFileMenuItems(["New"], false);
  }
}
};
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

```vue
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

```vue
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

```vue
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

```vue
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

```vue
spreadsheet.hideToolbarItems('Home', [0, 1, 2], true);    // Hide first 3 items
spreadsheet.hideToolbarItems('Insert', [5], false);       // Show item at index 5
```

### `enableRibbonTabs(tabs, enable?)`
Enables or disables ribbon tabs.

**Parameters**:
- `tabs` (string[]) — tab names
- `enable` (boolean) — `true` to enable, `false` to disable (default: `true`)

**Returns**: void

```vue
spreadsheet.enableRibbonTabs(['Data'], false);  // Disable Data tab
```

### `enableToolbarItems(tab, items, enable?)`
Enables or disables toolbar items.

**Parameters**:
- `tab` (string) — tab name
- `items` (string[] | number[]) — item unique IDs or indices
- `enable` (boolean) — `true` to enable, `false` to disable (default: `true`)

**Returns**: void

```vue
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

```vue
spreadsheet.hideFileMenuItems(['PDF Document'], true);
```

### `enableFileMenuItems(items, enable?)`
Enables or disables file menu items.

**Parameters**:
- `items` (string[]) — menu item texts
- `enable` (boolean) — `true` to enable, `false` to disable (default: `true`)
- `isUniqueId` (boolean, optional) — if using unique IDs (default: `false`)

**Returns**: void

```vue
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

```vue
<template>
<ejs-spreadsheet ref="spreadsheet" :created="onCreated">
  <e-sheets>
    <e-sheet name="Sales Report">
      <e-ranges>
        <e-range :dataSource="salesData" startCell="A1" />
      </e-ranges>
    </e-sheet>
  </e-sheets>
</ejs-spreadsheet>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective,
RangesDirective,
RangeDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective,
  "e-ranges": RangesDirective,
  "e-range": RangeDirective
},

data() {
  return {
    salesData: [
      { Product: "Laptop", Q1: 1200, Q2: 1500, Q3: 1300, Q4: 1400 },
      { Product: "Mouse", Q1: 300, Q2: 350, Q3: 400, Q4: 420 },
      { Product: "Keyboard", Q1: 500, Q2: 550, Q3: 600, Q4: 650 },
      { Product: "Monitor", Q1: 800, Q2: 820, Q3: 830, Q4: 900 },
      { Product: "Tablet", Q1: 700, Q2: 750, Q3: 730, Q4: 760 },
      { Product: "Phone", Q1: 1000, Q2: 1100, Q3: 1050, Q4: 1200 },
      { Product: "Printer", Q1: 200, Q2: 250, Q3: 260, Q4: 300 },
      { Product: "Scanner", Q1: 450, Q2: 470, Q3: 490, Q4: 500 },
      { Product: "Desk", Q1: 900, Q2: 920, Q3: 910, Q4: 930 },
      { Product: "Chair", Q1: 350, Q2: 360, Q3: 370, Q4: 380 }
    ]
  };
},

methods: {
  onCreated() {
    const spreadsheet = this.$refs.spreadsheet;

    // === Add Custom Toolbar Button ===
    spreadsheet.addToolbarItems("Home", [
      {
        text: "Sum Selection",
        tooltipText: "Sum selected cells",
        id: "sum-button"
      }
    ]);

    // === Attach Button Click Handler ===
    setTimeout(() => {
      const btn = document.getElementById("sum-button");
      if (!btn) return;

      btn.addEventListener("click", () => {
        const sheet = spreadsheet.ej2Instances.getActiveSheet();
        const range = sheet.selectedRange;
        if (!range) return;

        // Parse selected range start (A2, B5 etc.)
        const [startCell] = range.split(":");
        const [col, row] = startCell.match(/[A-Z]+|[0-9]+/g);

        const rowNum = parseInt(row);

        // Insert SUM formula just below the selection
        spreadsheet.updateCell(
          { formula: `=SUM(${range})` },
          `F2`
        );
      });
    }, 100);
  }
}
};
</script>

```

## Simplified UI: Hide Advanced Features

```vue
<template>
<ejs-spreadsheet
  ref="spreadsheet"
  :created="onCreated"
  :fileMenuBeforeOpen="onFileMenuBeforeOpen"
>
  <e-sheets>
    <e-sheet name="Sheet1" />
  </e-sheets>
</ejs-spreadsheet>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective
},

methods: {
  onCreated() {
    const spreadsheet = this.$refs.spreadsheet;
    // Hide specified ribbon tabs
    spreadsheet.hideRibbonTabs(["Formulas", "Data", "View"], true);
  },

  onFileMenuBeforeOpen(args) {
    const spreadsheet = this.$refs.spreadsheet;
    // Disable "Print"
    spreadsheet.enableFileMenuItems(["Print"], false);
  }
}
};
</script>
```

## Read-Only Mode: Disable All Edits

```vue
<template>
<ejs-spreadsheet
  ref="spreadsheet"
  :allowEditing="false"
  :created="onCreated"
>
  <e-sheets>
    <e-sheet name="Sheet1"></e-sheet>
  </e-sheets>
</ejs-spreadsheet>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective
},

methods: {
  onCreated() {
    const spreadsheet = this.$refs.spreadsheet;

    // Hide tabs: Home, Insert, Data
    spreadsheet.hideRibbonTabs(["Home", "Insert", "Data"], true);

    // Keep only View tab enabled
    spreadsheet.enableRibbonTabs(["View"], true);
  }
}
};
</script>
```

## Ribbon Item Model

```ts
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

## Notes

- **Best Practice**: Add custom tabs for domain-specific operations
- **Best Practice**: Use separators to group related items visually
- **Best Practice**: Provide clear, concise tooltips for all buttons
- **Best Practice**: Hide tabs instead of disabling if permanent (cleaner UI)
- **Performance**: Many custom items may slow ribbon rendering; limit customizations
