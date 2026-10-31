# Freeze Panes — Syncfusion React Spreadsheet

Freeze Panes keeps specific rows and columns visible while scrolling. React Spreadsheet supports freezing through:

- Sheet properties → `frozenRows`, `frozenColumns`  
- Programmatic API → `freezePanes(row, column)`

React Spreadsheet **does not support** freezing by sheet name or index (only active sheet can be frozen).

## Minimal React Example

```jsx
import * as React from "react";
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  ColumnsDirective,
  ColumnDirective
} from "@syncfusion/ej2-react-spreadsheet";

export default function App() {
  const spreadsheetRef = useRef(null);
  const onCreated = () => {
    onst spreadsheet = spreadsheetRef.current;
    if (!spreadsheet) return;

    // Freeze first 2 rows & 2 columns
    spreadsheet.freezePanes(2, 2);
  };

  return (
    <SpreadsheetComponent ref={spreadsheetRef} created={onCreated}>
      <SheetsDirective>
        <SheetDirective
          name="SalesData"
          frozenRows={2}
          frozenColumns={2}
        >
          <ColumnsDirective>
            <ColumnDirective width={180} />
            <ColumnDirective width={180} />
            <ColumnDirective width={180} />
            <ColumnDirective width={180} />
          </ColumnsDirective>
        </SheetDirective>
      </SheetsDirective>
    </SpreadsheetComponent>
  );
}
```

## 1. Freezing During Initialization

```jsx
<SheetDirective
  name="Data"
  frozenRows={2}         // Freeze first 2 rows
  frozenColumns={1}      // Freeze first column
/>
```

## 2. Programmatic Freeze (Active Sheet Only)

```jsx
spreadsheet.freezePanes(2, 2);   // Freeze 2 rows & 2 columns
spreadsheet.freezePanes(1, 1);   // Default Excel-like freeze
spreadsheet.freezePanes(0, 0);   // Unfreeze all
```

## 3. Update Freeze After Initialization

```jsx
const sheet = spreadsheet.sheets[0];
sheet.frozenRows = 1;
sheet.frozenColumns = 2;
spreadsheet.dataBind();
spreadsheet.refresh();
```

## 4. Get Freeze Settings

```jsx
const sheet = spreadsheet.sheets[0];
console.log(sheet.frozenRows, sheet.frozenColumns);
```

## 5. Common Freeze Scenarios

### Freeze Header Row Only
```jsx
<SheetDirective frozenRows={1} frozenColumns={0} />
```

### Freeze First Column Only
```jsx
<SheetDirective frozenRows={0} frozenColumns={1} />
```

### Freeze Header + First Column
```jsx
<SheetDirective frozenRows={1} frozenColumns={1} />
```

### Freeze Multiple Rows (Reports)
```jsx
spreadsheet.freezePanes(3, 1);    // 3 rows, 1 column
```

### Freeze First Two Columns
```jsx
spreadsheet.freezePanes(1, 2);
```

## 6. Unfreeze panes

```jsx
// spreadsheet.unfreezePanes(sheetIndex or sheetname);
spreadsheet.unfreezePanes(1); //Unfreeze the rows and columns in second sheet
spreadsheet.unfreezePanes(); //Unfreeze the rows and columns in active sheet
```

Or:
```jsx
spreadsheet.sheets[0].frozenRows = 0;
spreadsheet.sheets[0].frozenColumns = 0;
spreadsheet.dataBind();
spreadsheet.refresh();
```

## 7. UI Ribbon Freeze

React Spreadsheet UI includes:
- Freeze Panes
- Freeze Rows
- Freeze Columns


## 8. Limitations

- Freeze applies **only to active sheet** programmatically.
- Cannot freeze across merged cells.
- Must unfreeze fully before applying new freeze.
- Images/charts in frozen area may overlap when scrolling.

