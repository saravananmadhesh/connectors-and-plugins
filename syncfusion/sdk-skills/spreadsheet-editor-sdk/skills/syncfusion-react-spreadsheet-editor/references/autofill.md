# Autofill

Automatically fill cell ranges with patterns, series, or copied values using the autofill feature.

## Minimal Code

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RowsDirective, RowDirective, CellsDirective, CellDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);
    const autoFillSettings = {fillType: 'FillSeries', showFillOptions: true};
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current; 
      // Fill down (copy first row to second row)
      spreadsheet.autoFill('A2:C2', 'A1:C1', 'Down', 'CopyCells');

      // Fill series (extend 1,2,3 pattern to 1,2,3,4,5)
      spreadsheet.autoFill('D1:F1', 'A1:C1', 'Right', 'FillSeries');

      // Fill right (copy A column pattern to B, C columns)
      spreadsheet.autoFill('B1:C5', 'A1:A5', 'Right', 'FillSeries');
    }
    return (<SpreadsheetComponent ref={spreadsheetRef} allowAutoFill={true} autoFillSettings={autoFillSettings} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective name="Sheet1">
                          <RowsDirective>
                                  <RowDirective>
                                      <CellsDirective>
                                          <CellDirective value="1" ></CellDirective>
                                          <CellDirective value="2" ></CellDirective>
                                          <CellDirective value="3" ></CellDirective>
                                      </CellsDirective>
                                  </RowDirective>
                              </RowsDirective>
                            </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;

// Render into DOM
const root = createRoot(document.getElementById('sample')); // div element with id "sample" must exists in HTML
root.render(<Default />);

```

## Type Definitions

### AutoFillDirection
```tsx
type AutoFillDirection = 'Down' | 'Right' | 'Up' | 'Left';
```

### AutoFillType
```tsx
type AutoFillType = 'FillSeries' | 'CopyCells' | 'FillFormattingOnly' | 'FillWithoutFormatting';
```

## Autofill Settings

### `autoFillSettings` Configuration

Configure autofill behavior using the `autoFillSettings` property.

**Type:** `AutoFillSettingsModel`

**Properties:**
```jsx
autoFillSettings: {
  fillType: 'FillSeries' | 'CopyCells' | 'FillFormattingOnly' | 'FillWithoutFormatting',
  showFillOptions: boolean
}
```

**Parameters:**
- `fillType` — Type of fill to use by default (see Fill Types below)
- `showFillOptions` — Show/hide fill options menu when user drags fill handle

## Autofill Method

### `autoFill()`

Automatically fill a range with pattern, series, or copied content.

**Signature:**
```jsx
autoFill(
  fillRange: string,              // Range to fill INTO
  dataRange?: string,             // Source data range (optional, defaults to adjacent cells)
  direction?: AutoFillDirection,  // Direction: 'Down', 'Right', 'Up', 'Left' (optional)
  fillType?: AutoFillType         // Fill type (optional)
): void
```

**Parameters:**
- `fillRange` — Target range that gets filled
- `dataRange` — Source range with pattern/data (if not provided, uses adjacent cells)
- `direction` — Direction of fill (`'Down'` default for vertical, `'Right'` for horizontal)
- `fillType` — Type of fill (see Fill Types below)

## Autofill from User Interaction

Users can autofill by dragging the fill handle (small square at cell corner) in the spreadsheet UI.

### Handling Autofill Events

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);
    const actionBeginHandler = (args) => { 
      if (args.action === 'autofill') {
        console.log('User autofilling...');
        args.cancel = true;  // Cancel autofill
      }
    };
    const actionCompleteHandler = (args) => { 
      if (args.action === 'autofill') {
        console.log('Autofill completed');
      }
    };
    return (<SpreadsheetComponent ref={spreadsheetRef} actionBegin={actionBeginHandler} actionComplete={actionCompleteHandler}>
                    <SheetsDirective>
                        <SheetDirective name="Sheet1">
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;
```

## Notes

- Use FillSeries for numeric/date patterns
- Use CopyCells for exact duplication
- Preview autofill result before applying to large ranges
- CopyCells with formulas adjusts relative references automatically
- Absolute references (e.g., $A$1) do NOT adjust when autofilled
