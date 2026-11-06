````markdown
# Events

Respond to spreadsheet user actions and lifecycle events using event handlers in the Spreadsheet Editor.

## Minimal Code

```typescript
import { Spreadsheet, CellEditEventArgs, SaveCompleteEventArgs } from '@syncfusion/ej2-spreadsheet';

const spreadsheet: Spreadsheet = new Spreadsheet({
  sheets: [{ name: 'Sheet1' }],

  // === Cell Editing Events ===
  cellEdit: (args: CellEditEventArgs): void => {
    console.log(`Editing cell: ${args.address}, Value: ${args.value}`);
  },

  cellEdited: (args: CellEditEventArgs): void => {
    console.log(`Cell edited: ${args.address}, New value: ${args.value}`);
  },

  cellSave: (args: CellSaveEventArgs): void => {
    console.log(`Cell saved: ${args.address}`);
  },

  // === Selection Events ===
  select: (args: SelectEventArgs): void => {
    console.log(`Selected range: ${args.range}`);
  },

  beforeSelect: (args: BeforeSelectEventArgs): void => {
    if (args.range === 'A1') {
      args.cancel = true;  // Prevent selecting A1
    }
  },

  // === Data Events ===
  beforeDataBound: (args: any): void => {
    console.log('Data binding starting...');
  },

  dataBound: (args: any): void => {
    console.log('Data bound successfully');
  },

  // === Formatting Events ===
  beforeCellFormat: (args: BeforeCellFormatArgs): void => {
    console.log(`Formatting cells: ${args.range}`);
  },

  // === Save/Open Events ===
  beforeSave: (args: BeforeSaveEventArgs): void => {
    console.log('Before saving spreadsheet');
  },

  saveComplete: (args: SaveCompleteEventArgs): void => {
    console.log('Spreadsheet saved successfully');
  },

  beforeOpen: (args: BeforeOpenEventArgs): void => {
    console.log('Before opening file');
  },

  openComplete: (args: any): void => {
    console.log('File opened successfully');
  },

  // === Lifecycle Events ===
  created: (): void => {
    console.log('Spreadsheet created');
  }
});

spreadsheet.appendTo('#spreadsheet');
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

```typescript
created: (): void => {
  console.log('Spreadsheet initialized');
  
  // Safe to perform initial setup here
  spreadsheet.addDefinedName({
    name: 'DataRange',
    refersTo: '=Sheet1!A1:D100'
  });
}
```

### `dataBound`
Fires when data is loaded into a sheet.

```typescript
dataBound: (args: any): void => {
  console.log('Data loaded, rows:', spreadsheet.sheets[0].rows?.length);
}
```

## Cell Editing Events

### `cellEdit`
Fires **when user starts editing** a cell.

**Args** (`CellEditEventArgs`):
- `address` (string) — cell address
- `value` (any) — current cell value
- `oldValue` (any) — previous value

```typescript
cellEdit: (args: CellEditEventArgs): void => {
  console.log(`Editing ${args.address}: ${args.value}`);
}
```

### `cellEditing`
Fires **every keystroke** while editing a cell.

**Args** (`CellEditEventArgs`):
- `address` (string) — cell address
- `value` (any) — current input value

```typescript
cellEditing: (args: CellEditEventArgs): void => {
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

```typescript
cellEdited: (args: CellEditEventArgs): void => {
  console.log(`Cell edited: ${args.address} = ${args.value}`);
}
```

### `cellSave`
Fires **before a cell is saved** to the grid. Can modify or cancel.

**Args** (`CellSaveEventArgs`):
- `address` (string) — cell address
- `value` (any) — value to save
- `cancel` (boolean) — set `true` to prevent save

```typescript
beforeCellSave: (args: CellEditEventArgs): void => {
  if (args.value === '') {
    args.cancel = true;  // Don't allow empty save
  }
}
```

### `cellSave` (Event emitted after save)
Different from `beforeCellSave` — fires after cell is saved.

```typescript
cellSave: (args: CellSaveEventArgs): void => {
  console.log(`Cell saved: ${args.address}`);
}
```

## Selection Events

### `beforeSelect`
Fires **before** a cell/range is selected. Can prevent selection.

**Args** (`BeforeSelectEventArgs`):
- `range` (string) — range about to be selected
- `cancel` (boolean) — set `true` to block selection

```typescript
beforeSelect: (args: BeforeSelectEventArgs): void => {
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

```typescript
select: (args: SelectEventArgs): void => {
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

```typescript
beforeCellFormat: (args: BeforeCellFormatArgs): void => {
  // Prevent red background
  if (args.style.backgroundColor === '#FF0000') {
    args.cancel = true;
    console.log('Red background not allowed');
  }
}
```

### `beforeConditionalFormat`
Fires **before** conditional formatting is applied.

```typescript
beforeConditionalFormat: (args: ConditionalFormatEventArgs): void => {
  console.log('Applying conditional format to', args.range);
}
```

## Data Events

### `beforeDataBound`
Fires **before** data is loaded into sheet.

```typescript
beforeDataBound: (args: any): void => {
  console.log('Data loading...');
}
```

### `dataBound`
Fires **after** data is loaded.

```typescript
dataBound: (args: any): void => {
  const sheet = spreadsheet.getActiveSheet();
  console.log('Rows loaded:', sheet.rows?.length);
}
```

### `dataSourceChanged`
Fires when data source changes (add/edit/delete row).

**Args** (`DataSourceChangedEventArgs`):
- `action` (string) — `'Add'`, `'Update'`, `'Delete'`
- `data` (any) — changed data

```typescript
dataSourceChanged: (args: DataSourceChangedEventArgs): void => {
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

```typescript
beforeSave: (args: BeforeSaveEventArgs): void => {
  console.log(`Saving as ${args.saveType}...`);
  
  // Custom pre-save logic (validation, cleanup)
  args.cancel = false;  // Allow save to proceed
}
```

### `saveComplete`
Fires **after** spreadsheet is successfully saved.

**Args** (`SaveCompleteEventArgs`):
- `type` (string) — save type
- `isSucceed` (boolean) — success flag

```typescript
saveComplete: (args: SaveCompleteEventArgs): void => {
  if (args.isSucceed) {
    console.log('File saved successfully');
    alert('Saved!');
  } else {
    console.error('Save failed');
  }
}
```

### `beforeOpen`
Fires **before** opening an Excel file.

**Args** (`BeforeOpenEventArgs`):
- `file` (File) — file object

```typescript
beforeOpen: (args: BeforeOpenEventArgs): void => {
  console.log('Opening file...');
}
```

### `openComplete`
Fires **after** file is opened.

```typescript
openComplete: (args: any): void => {
  console.log('File opened');
}
```

### `openFailure`
Fires if file opening fails.

**Args** (`OpenFailureArgs`):
- `error` (string) — error message

```typescript
openFailure: (args: OpenFailureArgs): void => {
  console.error('Failed to open:', args.error);
}
```

## Context Menu Events

### `contextMenuBeforeOpen`
Fires **before** context menu opens.

```typescript
contextMenuBeforeOpen: (args: BeforeOpenCloseMenuEventArgs): void => {
  console.log('Context menu opening');
  // Customize menu items here
}
```

### `contextMenuItemSelect`
Fires when context menu item is clicked.

**Args** (`MenuSelectEventArgs`):
- `text` (string) — clicked item text

```typescript
contextMenuItemSelect: (args: MenuSelectEventArgs): void => {
  if (args.text === 'Copy') {
    console.log('Copy selected');
  }
}
```

### `contextMenuBeforeClose`
Fires **before** context menu closes.

```typescript
contextMenuBeforeClose: (args: BeforeOpenCloseMenuEventArgs): void => {
  console.log('Context menu closing');
}
```

## File Menu Events

### `fileMenuBeforeOpen`
Fires **before** File menu opens.

```typescript
fileMenuBeforeOpen: (args: BeforeOpenCloseMenuEventArgs): void => {
  console.log('File menu opening');
}
```

### `fileMenuItemSelect`
Fires when File menu item is clicked.

```typescript
fileMenuItemSelect: (args: MenuSelectEventArgs): void => {
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

```typescript
actionBegin: (args: any): void => {
  if (args.action === 'sort') {
    console.log('Sorting starting...');
  }
}
```

### `actionComplete`
Fires **after** actions complete.

**Args** (`SortEventArgs` | `CellSaveEventArgs` | various):

```typescript
actionComplete: (args: any): void => {
  console.log('Action completed');
}
```

## Hyperlink Events

### `beforeHyperlinkClick`
Fires **before** hyperlink is clicked.

**Args** (`BeforeHyperlinkArgs`):
- `url` (string) — hyperlink URL
- `cancel` (boolean) — prevent navigation

```typescript
beforeHyperlinkClick: (args: BeforeHyperlinkArgs): void => {
  if (args.url.includes('external')) {
    console.log('Opening external link');
  }
}
```

### `afterHyperlinkClick`
Fires **after** hyperlink is clicked.

**Args** (`AfterHyperlinkArgs`):

```typescript
afterHyperlinkClick: (args: AfterHyperlinkArgs): void => {
  console.log('Hyperlink opened');
}
```

## Sort/Filter Events

### `beforeSort`
Fires **before** sorting.

**Args** (`BeforeSortEventArgs`):
- `range` (string) — sort range
- `sortOptions` (SortOptions)

```typescript
beforeSort: (args: BeforeSortEventArgs): void => {
  console.log(`Sorting ${args.range}...`);
}
```

### `sortComplete`
Fires **after** sorting completes.

```typescript
sortComplete: (args: SortEventArgs): void => {
  console.log('Sort completed');
}
```

## Dialog Events

### `dialogBeforeOpen`
Fires **before** dialog opens (Format Cells, Insert, etc.).

**Args** (`DialogBeforeOpenEventArgs`):
- `dialogName` (string) — dialog type
- `cancel` (boolean) — prevent opening

```typescript
dialogBeforeOpen: (args: DialogBeforeOpenEventArgs): void => {
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

```typescript
queryCellInfo: (args: CellInfoEventArgs): void => {
  // Avoid heavy operations here — called for many cells
  if (args.rowIndex === 0) {
    args.cell.style = { fontWeight: 'bold' };  // Bold header
  }
}
```

### `beforeCellRender`
Fires **before** cell is appended to DOM.

```typescript
beforeCellRender: (args: CellRenderEventArgs): void => {
  // Customize cell rendering
}
```

### `beforeCellUpdate`
Fires **before** cell properties change.

```typescript
beforeCellUpdate: (args: BeforeCellUpdateArgs): void => {
  console.log('Cell updating');
}
```

## Event Handler Registration Methods

### During Initialization
```typescript
const spreadsheet: Spreadsheet = new Spreadsheet({
  cellEdit: (args) => { /* ... */ },
  cellSave: (args) => { /* ... */ },
  select: (args) => { /* ... */ },
  sheets: [{ name: 'Sheet1' }]
});
```

### After Initialization (using `addEventListener`)
```typescript
spreadsheet.addEventListener('cellSave', (args) => {
  console.log('Cell saved');
});
```

### Programmatically with Property Assignment (Not Recommended)
```typescript
spreadsheet.cellEdit = (args) => { /* ... */ };
```

## Event Handler Best Practices

```typescript
const spreadsheet: Spreadsheet = new Spreadsheet({
  sheets: [{ name: 'Data' }],

  // === Validate input before save ===
  beforeCellSave: (args: CellEditEventArgs): void => {
    if (args.address.startsWith('B') && isNaN(args.value)) {
      args.cancel = true;
      console.warn('Column B requires numeric values');
    }
  },

  // === Track changes ===
  cellSave: (args: CellSaveEventArgs): void => {
    const change = {
      address: args.address,
      value: args.value,
      timestamp: new Date()
    };
    console.log('Cell changed:', change);
  },

  // === Prevent accidental actions ===
  beforeSelect: (args: BeforeSelectEventArgs): void => {
    if (args.range.includes('ProtectedRange')) {
      args.cancel = true;
      console.log('Cannot select protected cells');
    }
  },

  // === Monitor data changes ===
  dataBound: (): void => {
    console.log('Data reloaded');
  }
});

spreadsheet.appendTo('#spreadsheet');
```

## Notes

- **Best Practice**: Keep event handlers lightweight to avoid UI lag
- **Best Practice**: Use `beforeXXX` events for validation and prevention
- **Best Practice**: Use `XXXComplete` or `afterXXX` events for post-action tasks
- **Gotcha**: `queryCellInfo` is called frequently — avoid heavy operations
- **Gotcha**: Setting `args.cancel = true` prevents default action but doesn't show error
- **Gotcha**: Event handlers are called during programmatic changes too (e.g., `updateCell()`)
- **Performance**: Cell editing/rendering events fire many times; debounce if needed
