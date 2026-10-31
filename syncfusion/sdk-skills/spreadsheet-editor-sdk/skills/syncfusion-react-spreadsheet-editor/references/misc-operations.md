# Miscellaneous Sheet Operations — Syncfusion React Spreadsheet

This guide covers Autofill, clearing content/formatting, sheet management (insert / move / delete), navigation, and clipboard operations in the **Syncfusion React Spreadsheet**.

## Minimal React Example

```jsx
import * as React from "react";
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  RowsDirective,
  RowDirective,
  CellsDirective,
  CellDirective
} from "@syncfusion/ej2-react-spreadsheet";

export default function App() {
  const spreadsheetRef = React.useRef(null);

  const onCreated = () => {
    const spreadsheet = ssRef.current;
    if (!spreadsheet) return;

    // Autofill
    spreadsheet.autoFill("A1:C5", "A1:C1");

    // Clear contents
    spreadsheet.clear({ type: "Clear Contents", range: "A1:D10" });

    // Select range
    spreadsheet.selectRange("A1:D10");
  };

  return (
    <SpreadsheetComponent ref={spreadsheetRef} allowAutoFill={true} created={onCreated}> 
      <SheetsDirective>
        <SheetDirective name="Sheet1">
          <RowsDirective>
            <RowDirective>
              <CellsDirective>
                <CellDirective value="1" />
                <CellDirective value="2" />
                <CellDirective value="3" />
              </CellsDirective>
            </RowDirective>
          </RowsDirective>
        </SheetDirective>
      </SheetsDirective>
    </SpreadsheetComponent>
  );
}
```

## 1. Autofill

```jsx
spreadsheet.autoFill("A1:C5", "A1:C1");
spreadsheet.autoFill("A1:A10", "A1:A3", "Down", "FillSeries");
spreadsheet.autoFill("A1:F1", "A1:C1", "Right", "CopyCells");
```

## 2. Clear Operations

```jsx
spreadsheet.clear({ type: "Clear Contents", range: "A1:D10" });
spreadsheet.clear({ type: "Clear Formats", range: "A1:D10" });
spreadsheet.clear({ type: "Clear Hyperlinks", range: "A1:D10" });
spreadsheet.clear({ type: "Clear All", range: "A1:D10" });
```

## 3. Insert Sheet

```jsx
// spreadsheet.insertSheet(startSheet?: number | SheetModel[], endSheet?: number)
spreadsheet.insertSheet([{ name: "New Sheet" }]);
spreadsheet.insertSheet([{ name: "Report" }], 1);
```

## 4. Move Sheet

```jsx
// spreadsheet.moveSheet(position, sheetIndexes);
spreadsheet.moveSheet(2);
spreadsheet.moveSheet(0, [1, 2]);
```

## 5. Delete Sheet

```jsx
// spreadsheet.delete(startIndex, endIndex, model => ("Row" | "Column" | "Sheet"));
spreadsheet.delete(1, 1, "Sheet");
spreadsheet.delete(0, 1, "Sheet");
```

## 6. Duplicate Sheet

```jsx
spreadsheet.duplicateSheet();
spreadsheet.duplicateSheet(0);
```

## 7. Navigation: Go To Cell

```jsx
// spreadsheet.goTo("range address");
spreadsheet.goTo("Z100");
spreadsheet.goTo("C5");
spreadsheet.goTo("Sheet2!A1");
```

## 8. Active Sheet Info

```jsx
const activeSheetIdx = spreadsheet.activeSheetIndex;
const sheet = spreadsheet.getActiveSheet();
console.log(sheet.name);
```

## 9. Select Range

```jsx
// spreadsheet.selectRange(range address);
spreadsheet.selectRange("A1:D10");
```

## Autofill Fill Types

| Fill Type | Description |
|----------|-------------|
| CopyCells | Repeat pattern |
| FillSeries | Continue numeric/date series |
| FillFormattingOnly | Extend formatting only |
| FillWithoutFormatting | Extend data without formatting |

## Clear Types

| Clear Type | Removes |
|------------|---------|
| Clear Contents | Values |
| Clear Formats | Formatting |
| Clear Hyperlinks | Hyperlinks only |
| Clear All | Everything |

