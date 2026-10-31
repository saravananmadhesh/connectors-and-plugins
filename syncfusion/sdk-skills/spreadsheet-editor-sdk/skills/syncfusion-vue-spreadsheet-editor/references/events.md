# Events

Respond to spreadsheet user actions and lifecycle events using event handlers in the Spreadsheet Editor.

## Minimal Vue Example

```vue
<template>
<div class="control-pane">
  <div class="control-section spreadsheet-control">
    <ejs-spreadsheet
      ref="spreadsheet"
      :cellEdit="cellEdit"
      :cellEdited="cellEdited"
      :cellSave="cellSave"
      :select="select"
      :beforeSelect="beforeSelect"
      :beforeDataBound="beforeDataBound"
      :dataBound="dataBound"
      :beforeCellFormat="beforeCellFormat"
      :beforeSave="beforeSave"
      :saveComplete="saveComplete"
      :beforeOpen="beforeOpen"
      :openComplete="openComplete"
      :created="created"
      openUrl="https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/open"
      saveUrl="https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/save"
    >
      <e-sheets>
        <e-sheet name="Sheet1"></e-sheet>
      </e-sheets>
    </ejs-spreadsheet>
  </div>
</div>
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
  // === Cell Editing Events ===
  cellEdit(args) {
    console.log(`Editing cell: ${args.address}, Value: ${args.value}`);
  },
  cellEdited(args) {
    console.log(`Cell edited: ${args.address}, New value: ${args.value}`);
  },
  cellSave(args) {
    console.log(`Cell saved: ${args.address}`);
  },
  // === Selection Events ===
  select(args) {
    console.log(`Selected range: ${args.range}`);
  },
  beforeSelect(args) {
    if (args.range === 'A1') {
      args.cancel = true; // Prevent selecting A1
    }
  },
  // === Data Events ===
  beforeDataBound(args) {
    console.log('Data binding starting...');
  },
  dataBound(args) {
    console.log('Data bound successfully');
  },
  // === Formatting Events ===
  beforeCellFormat(args) {
    console.log(`Formatting cells: ${args.range}`);
  },
  // === Save/Open Events ===
  beforeSave(args) {
    console.log('Before saving spreadsheet');
    args.isFullPost = false;
    args.needBlobData = true;
  },
  saveComplete(args) {
    console.log('Spreadsheet saved successfully');
    console.log('Blob Data:', args.blobData);
  },
  beforeOpen(args) {
    console.log('Before opening file');
  },
  openComplete(args) {
    console.log('File opened successfully');
  },
  // === Lifecycle Events ===
  created() {
    console.log('Spreadsheet created');
  }
}
};
</script>
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[RANGE]` | Cell or range address | `'A1'`, `'B2:D5'` |
| `[VALUE]` | Cell value | `42`, `'Text'`, `=SUM(...)` |
| `[ACTION]` | Action type | `'cellEdit'`, `'save'`, `'sort'` |

## Lifecycle Events

### `created`
Fires when the Spreadsheet component is fully created and ready.

```vue
created() {
  console.log('Spreadsheet initialized');
  // Safe to perform initial setup here
  this.$refs.spreadsheet.addDefinedName({
    name: 'DataRange',
    refersTo: '=Sheet1!A1:D100'
  });
}
```

### `dataBound`
Fires when data is loaded into a sheet.

```vue
dataBound(args) {
  console.log('Data loaded, rows:', this.$refs.spreadsheet.sheets[0].rows?.length);
}
```

## Cell Editing Events

### `cellEdit`
Fires **when user starts editing** a cell.

**Args** (`CellEditEventArgs`):
- `address` (string) — cell address
- `value` (any) — current cell value
- `oldValue` (any) — previous value

```vue
cellEdit(args) {
  console.log(`Editing ${args.address}: ${args.value}`);
}
```

### `cellEditing`
Fires **every keystroke** while editing a cell.

**Args** (`CellEditEventArgs`):
- `address` (string) — cell address
- `value` (any) — current input value

```vue
cellEditing(args) {
  // Allow only numeric input
  if (!/^\d*\.?\d*$/.test(args.value)) {
    args.cancel = true;  // Reject non-numeric
  }
}
```

### `cellEdited`
Fires **after user finishes editing** a cell (before save).

**Args** (`CellEditEventArgs`):
- `address` (string) — cell address
- `value` (any) — new value
- `oldValue` (any) — previous value

```vue
cellEdited(args) {
  console.log(`Cell edited: ${args.address} = ${args.value}`);
}
```

### `cellSave`
Fires **before a cell is saved** to the grid. Can modify or cancel.

**Args** (`CellSaveEventArgs`):
- `address` (string) — cell address
- `value` (any) — value to save
- `cancel` (boolean) — set `true` to prevent save

```vue
beforeCellSave(args) {
  if (args.value === '') {
    args.cancel = true;  // Don't allow empty save
  }
}
```

### `cellSave` (Event emitted after save)
Different from `beforeCellSave` — fires after cell is saved.

```vue
cellSave(args) {
  console.log(`Cell saved: ${args.address}`);
}
```

## Selection Events

### `beforeSelect`
Fires **before** a cell/range is selected. Can prevent selection.

**Args** (`BeforeSelectEventArgs`):
- `range` (string) — range about to be selected
- `cancel` (boolean) — set `true` to block selection

```vue
beforeSelect(args) {
  // Prevent selecting header row
  if (args.range === 'A1:Z1') {
    args.cancel = true;
    console.log('Header row cannot be selected');
  }
}
```

### `select`
Fires **after** a cell/range is selected.

**Args** (`SelectEventArgs`):
- `range` (string) — selected range

```vue
select(args) {
  console.log(`Selected: ${args.range}`);
  // Update UI with range info
  document.getElementById('status').textContent = `Range: ${args.range}`;
}
```

## Formatting Events

### `beforeCellFormat`
Fires **before** formatting is applied to cells.

**Args** (`BeforeCellFormatArgs`):
- `style` (CellStyleModel) — formatting to apply
- `range` (string) — target range
- `cancel` (boolean) — set `true` to prevent formatting

```vue
beforeCellFormat(args) {
  // Prevent red background
  if (args.style.backgroundColor === '#FF0000') {
    args.cancel = true;
    console.log('Red background not allowed');
  }
}
```

### `beforeConditionalFormat`
Fires **before** conditional formatting is applied.

```vue
beforeConditionalFormat(args) {
  console.log('Applying conditional format to', args.range);
}
```

## Data Events

### `beforeDataBound`
Fires **before** data is loaded into sheet.

```vue
beforeDataBound(args) {
  console.log('Data loading...');
}
```

### `dataBound`
Fires **after** data is loaded.

```vue
dataBound(args) {
  const sheet = this.$refs.spreadsheet.getActiveSheet();
  console.log('Rows loaded:', sheet.rows?.length);
}
```

### `dataSourceChanged`
Fires when data source changes (add/edit/delete row).

**Args** (`DataSourceChangedEventArgs`):
- `action` (string) — `'Add'`, `'Update'`, `'Delete'`
- `data` (any) — changed data

```vue
dataSourceChanged(args) {
  if (args.action === 'Add') {
    console.log('Row added:', args.data);
  }
}
```

## Save/Open Events

### `beforeSave`
Fires **before** spreadsheet is saved.

**Args** (`BeforeSaveEventArgs`):
- `url` (string) — save endpoint
- `saveType` (string) — `'Xlsx'`, `'Csv'`, `'Pdf'`

```vue
beforeSave(args) {
  console.log(`Saving as ${args.saveType}...`);
  // Custom pre-save logic (validation, cleanup)
  args.isFullPost = false;
  args.needBlobData = true;
  args.cancel = false;  // Allow save to proceed
}
```

### `saveComplete`
Fires **after** spreadsheet is successfully saved.

**Args** (`SaveCompleteEventArgs`):
- `type` (string) — save type
- `isSucceed` (boolean) — success flag

```vue
saveComplete(args) {
  if (args.isSucceed) {
    console.log('File saved successfully');
    alert('Saved!');
  } else {
    console.error('Save failed');
  }
  console.log('Blob Data:', args.blobData);
}
```

### `beforeOpen`
Fires **before** opening an Excel file.

**Args** (`BeforeOpenEventArgs`):
- `file` (File) — file object

```vue
beforeOpen(args) {
  console.log('Opening file...');
}
```

### `openComplete`
Fires **after** file is opened.

```vue
openComplete(args) {
  console.log('File opened');
}
```

### `openFailure`
Fires if file opening fails.

**Args** (`OpenFailureArgs`):
- `error` (string) — error message

```vue
openFailure(args) {
  console.error('Failed to open:', args.error);
}
```

## Context Menu Events

### `contextMenuBeforeOpen`
Fires **before** context menu opens.

```vue
contextMenuBeforeOpen(args) {
  console.log('Context menu opening');
  // Customize menu items here
}
```

### `contextMenuItemSelect`
Fires when context menu item is clicked.

**Args** (`MenuSelectEventArgs`):
- `text` (string) — clicked item text

```vue
contextMenuItemSelect(args) {
  if (args.text === 'Copy') {
    console.log('Copy selected');
  }
}
```

### `contextMenuBeforeClose`
Fires **before** context menu closes.

```vue
contextMenuBeforeClose(args) {
  console.log('Context menu closing');
}
```

## File Menu Events

### `fileMenuBeforeOpen`
Fires **before** File menu opens.

```vue
fileMenuBeforeOpen(args) {
  console.log('File menu opening');
}
```

### `fileMenuItemSelect`
Fires when File menu item is clicked.

```vue
fileMenuItemSelect(args) {
  if (args.text === 'Save') {
    console.log('Save clicked');
  }
}
```

## Action Events

### `actionBegin`
Fires **before** actions start (sort, filter, format, etc.).

**Args** (`BeforeCellFormatArgs` | various):
- `action` (string) — action type
- `cancel` (boolean) — prevent action

```vue
actionBegin(args) {
  if (args.action === 'sort') {
    console.log('Sorting starting...');
  }
}
```

### `actionComplete`
Fires **after** actions complete.

**Args** (`SortEventArgs` | `CellSaveEventArgs` | various):

```vue
actionComplete(args) {
  console.log('Action completed');
}
```

## Hyperlink Events

### `beforeHyperlinkClick`
Fires **before** hyperlink is clicked.

**Args** (`BeforeHyperlinkArgs`):
- `url` (string) — hyperlink URL
- `cancel` (boolean) — prevent navigation

```vue
beforeHyperlinkClick(args) {
  if (args.url.includes('external')) {
    console.log('Opening external link');
  }
}
```

### `afterHyperlinkClick`
Fires **after** hyperlink is clicked.

**Args** (`AfterHyperlinkArgs`):

```vue
afterHyperlinkClick(args) {
  console.log('Hyperlink opened');
}
```

## Sort/Filter Events

### `beforeSort`
Fires **before** sorting.

**Args** (`BeforeSortEventArgs`):
- `range` (string) — sort range
- `sortOptions` (SortOptions)

```vue
beforeSort(args) {
  console.log(`Sorting ${args.range}...`);
}
```

### `sortComplete`
Fires **after** sorting completes.

```vue
sortComplete(args) {
  console.log('Sort completed');
}
```

## Dialog Events

### `dialogBeforeOpen`
Fires **before** dialog opens (Format Cells, Insert, etc.).

**Args** (`DialogBeforeOpenEventArgs`):
- `dialogName` (string) — dialog type
- `cancel` (boolean) — prevent opening

```vue
dialogBeforeOpen(args) {
  if (args.dialogName === 'insert') {
    console.log('Insert dialog opening');
  }
}
```

## Query Cell Events

### `queryCellInfo`
Fires for **every cell access** during rendering. Performance-sensitive!

**Args** (`CellInfoEventArgs`):
- `cell` (CellModel) — cell object
- `rowIndex` (number) — row index
- `colIndex` (number) — column index

```vue
queryCellInfo(args) {
  // Avoid heavy operations here — called for many cells
  if (args.rowIndex === 0) {
    args.cell.style = { fontWeight: 'bold' };  // Bold header
  }
}
```

### `beforeCellRender`
Fires **before** cell is appended to DOM.

```vue
beforeCellRender(args) {
  // Customize cell rendering
}
```

### `beforeCellUpdate`
Fires **before** cell properties change.

```vue
beforeCellUpdate(args) {
  console.log('Cell updating');
}
```

## Event Handler Registration Methods

### During Initialization

```vue
<template>
  <div class="control-pane">
    <div class="control-section spreadsheet-control">
      <ejs-spreadsheet
        ref="spreadsheet"
        :cellEdit="cellEdit"
        :cellSave="cellSave"
        :select="select"
      >
        <e-sheets>
          <e-sheet name="Sheet1"></e-sheet>
        </e-sheets>
      </ejs-spreadsheet>
    </div>
  </div>
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
    cellEdit(args) {
      /* ... */
    },
    cellSave(args) {
      /* ... */
    },
    select(args) {
      /* ... */
    }
  }
};
</script>
```

### Programmatically with Property Assignment (Not Recommended)
```vue
spreadsheet.cellEdit = (args) => { /* ... */ };
```

## Event Handler Best Practices

```vue
<template>
  <div class="control-pane">
    <div class="control-section spreadsheet-control">
      <ejs-spreadsheet
        ref="spreadsheet"
        :cellSave="cellSave"
        :beforeSelect="beforeSelect"
        :dataBound="dataBound"
        :beforeCellSave="beforeCellSave"
      >
        <e-sheets>
          <e-sheet name="Sheet1"></e-sheet>
        </e-sheets>
      </ejs-spreadsheet>
    </div>
  </div>
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
    beforeCellSave(args) {
      if (args.address.startsWith('B') && isNaN(args.value)) {
        args.cancel = true;
        console.warn('Column B requires numeric values');
      }
    },
    cellSave(args) {
      const change = {
        address: args.address,
        value: args.value,
        timestamp: new Date()
      };
      console.log('Cell changed:', change);
    },
    beforeSelect(args) {
      if (args.range.includes('A1')) {
        args.cancel = true;
        console.log('Cannot select protected cells');
      }
    },
    dataBound() {
      console.log('Data loaded or Spreadsheet refreshed');
    }
  }
};
</script>
```

## Notes

- **Best Practice**: Keep event handlers lightweight to avoid UI lag
- **Best Practice**: Use `beforeXXX` events for validation and prevention
- **Best Practice**: Use `XXXComplete` or `afterXXX` events for post-action tasks
- **Performance**: Cell editing/rendering events fire many times; debounce if needed
