````markdown
# Events

Respond to spreadsheet user actions and lifecycle events using event handlers in the Spreadsheet Editor.

## Minimal Code

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);

    // === Cell Editing Events ===
    const cellEdit = (args) => {
      console.log(`Editing cell: ${args.address}, Value: ${args.value}`);
    };

    const cellEdited = (args) => {
      console.log(`Cell edited: ${args.address}, New value: ${args.value}`);
    };

    const cellSave = (args) => {
      console.log(`Cell saved: ${args.address}`);
    };

    // === Selection Events ===
    const select = (args) => {
      console.log(`Selected range: ${args.range}`);
    };

    const beforeSelect = (args) => {
      if (args.range === 'A1') {
        args.cancel = true;  // Prevent selecting A1
      }
    };

    // === Data Events ===
    const beforeDataBound = (args) => {
      console.log('Data binding starting...');
    };

    const dataBound = (args) => {
      console.log('Data bound successfully');
    };

    // === Formatting Events ===
    const beforeCellFormat = (args) => {
      console.log(`Formatting cells: ${args.range}`);
    };

    // === Save/Open Events ===
    const beforeSave = (args) => {
      console.log('Before saving spreadsheet');
    };

    const saveComplete = (args) => {
      console.log('Spreadsheet saved successfully');
    };

    const beforeOpen = (args) => {
      console.log('Before opening file');
    };

    const openComplete = (args) => {
      console.log('File opened successfully');
    };

    // === Lifecycle Events ===
    const created = () => {
      console.log('Spreadsheet created');
    };
    
    return (<SpreadsheetComponent ref={spreadsheetRef} cellEdit={cellEdit} cellEdited={cellEdited} cellSave={cellSave} select={select} beforeSelect={beforeSelect} beforeDataBound={beforeDataBound} dataBound={dataBound} beforeCellFormat={beforeCellFormat} beforeSave={beforeSave} saveComplete={saveComplete} beforeOpen={beforeOpen} openComplete={openComplete} created={created}>
                    <SheetsDirective>
                        <SheetDirective name="Sheet1">
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;
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

```jsx
const created = () => {
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

```tsx
const dataBound = (args: any): void => {
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

```tsx
const cellEdit = (args: CellEditEventArgs): void => {
  console.log(`Editing ${args.address}: ${args.value}`);
}
```

### `cellEditing`
Fires **every keystroke** while editing a cell.

**Args** (`CellEditEventArgs`):
- `address` (string) — cell address
- `value` (any) — current input value

```tsx
const cellEditing = (args: CellEditEventArgs): void => {
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

```tsx
const cellEdited = (args: CellEditEventArgs): void => {
  console.log(`Cell edited: ${args.address} = ${args.value}`);
}
```

### `cellSave`
Fires **before a cell is saved** to the grid. Can modify or cancel.

**Args** (`CellSaveEventArgs`):
- `address` (string) — cell address
- `value` (any) — value to save
- `cancel` (boolean) — set `true` to prevent save

```tsx
const beforeCellSave = (args: CellEditEventArgs): void => {
  if (args.value === '') {
    args.cancel = true;  // Don't allow empty save
  }
}
```

### `cellSave` (Event emitted after save)
Different from `beforeCellSave` — fires after cell is saved.

```tsx
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

```tsx
const beforeSelect = (args: BeforeSelectEventArgs): void => {
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

```tsx
const select = (args: SelectEventArgs): void => {
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

```tsx
const beforeCellFormat = (args: BeforeCellFormatArgs): void => {
  // Prevent red background
  if (args.style.backgroundColor === '#FF0000') {
    args.cancel = true;
    console.log('Red background not allowed');
  }
}
```

### `beforeConditionalFormat`
Fires **before** conditional formatting is applied.

```tsx
const beforeConditionalFormat = (args: ConditionalFormatEventArgs): void => {
  console.log('Applying conditional format to', args.range);
}
```

### `dataSourceChanged`
Fires when data source changes (add/edit/delete row).

**Args** (`DataSourceChangedEventArgs`):
- `action` (string) — `'Add'`, `'Update'`, `'Delete'`
- `data` (any) — changed data

```tsx
const dataSourceChanged = (args: DataSourceChangedEventArgs): void => {
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

```tsx
const beforeSave = (args: BeforeSaveEventArgs): void => {
  console.log(`Saving as ${args.saveType}...`);
  
  // Custom pre-save logic (validation, cleanup)
  args.cancel = false;  // Allow save to proceed
}
```

### `openComplete`
Fires **after** file is opened.

```tsx
const openComplete = (args: any): void => {
  console.log('File opened');
}
```

### `openFailure`
Fires if file opening fails.

**Args** (`OpenFailureArgs`):
- `error` (string) — error message

```tsx
const openFailure = (args: OpenFailureArgs): void => {
  console.error('Failed to open:', args.error);
}
```

## Context Menu Events

### `contextMenuBeforeOpen`
Fires **before** context menu opens.

```tsx
const contextMenuBeforeOpen = (args: BeforeOpenCloseMenuEventArgs): void => {
  console.log('Context menu opening');
  // Customize menu items here
}
```

### `contextMenuItemSelect`
Fires when context menu item is clicked.

**Args** (`MenuSelectEventArgs`):
- `text` (string) — clicked item text

```tsx
const contextMenuItemSelect = (args: MenuSelectEventArgs): void => {
  if (args.text === 'Copy') {
    console.log('Copy selected');
  }
}
```

### `contextMenuBeforeClose`
Fires **before** context menu closes.

```tsx
const contextMenuBeforeClose = (args: BeforeOpenCloseMenuEventArgs): void => {
  console.log('Context menu closing');
}
```

## File Menu Events

### `fileMenuBeforeOpen`
Fires **before** File menu opens.

```tsx
const fileMenuBeforeOpen = (args: BeforeOpenCloseMenuEventArgs): void => {
  console.log('File menu opening');
}
```

### `fileMenuItemSelect`
Fires when File menu item is clicked.

```tsx
const fileMenuItemSelect = (args: MenuSelectEventArgs): void => {
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

```tsx
const actionBegin = (args: any): void => {
  if (args.action === 'sort') {
    console.log('Sorting starting...');
  }
}
```

### `actionComplete`
Fires **after** actions complete.

**Args** (`SortEventArgs` | `CellSaveEventArgs` | various):

```tsx
const actionComplete = (args: any): void => {
  console.log('Action completed');
}
```

## Sort/Filter Events

### `beforeSort`
Fires **before** sorting.

**Args** (`BeforeSortEventArgs`):
- `range` (string) — sort range
- `sortOptions` (SortOptions)

```tsx
const beforeSort = (args: BeforeSortEventArgs): void => {
  console.log(`Sorting ${args.range}...`);
}
```

### `sortComplete`
Fires **after** sorting completes.

```tsx
const sortComplete = (args: SortEventArgs): void => {
  console.log('Sort completed');
}
```

## Dialog Events

### `dialogBeforeOpen`
Fires **before** dialog opens (Format Cells, Insert, etc.).

**Args** (`DialogBeforeOpenEventArgs`):
- `dialogName` (string) — dialog type
- `cancel` (boolean) — prevent opening

```tsx
const dialogBeforeOpen = (args: DialogBeforeOpenEventArgs): void => {
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

```tsx
const queryCellInfo = (args: CellInfoEventArgs): void => {
  // Avoid heavy operations here — called for many cells
  if (args.rowIndex === 0) {
    args.cell.style = { fontWeight: 'bold' };  // Bold header
  }
}
```

### `beforeCellRender`
Fires **before** cell is appended to DOM.

```tsx
const beforeCellRender = (args: CellRenderEventArgs): void => {
  // Customize cell rendering
}
```

### `beforeCellUpdate`
Fires **before** cell properties change.

```tsx
const beforeCellUpdate = (args: BeforeCellUpdateArgs): void => {
  console.log('Cell updating');
}
```

## Notes

- `queryCellInfo` is called frequently — avoid heavy operations
- Setting `args.cancel = true` prevents default action but doesn't show error
