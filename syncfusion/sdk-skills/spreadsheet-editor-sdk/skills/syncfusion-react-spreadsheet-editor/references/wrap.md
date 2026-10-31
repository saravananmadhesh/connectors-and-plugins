# Wrap Text API Reference

## Overview

The `wrap()` method is used to wrap or unwrap the text content of cells in the Spreadsheet. When text wrapping is enabled, long text content will display as multiple lines within a single cell without expanding the column width.

**API Documentation**: https://ej2.syncfusion.com/react/documentation/api/spreadsheet/index-default#wrap

## Method Signature

```typesjsxcript
wrap(address: string, wrap: boolean): void
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `address` | string | Address of the cell to be wrapped. Supports single cell references (e.g., 'B5') or ranges (e.g., 'A1:D10', 'C:C') |
| `wrap` | boolean | Set `true` to enable text wrapping; set `false` to disable text wrapping |

## Return Value

`void` - This method does not return a value.

## Basic Examples

### Wrap a Single Cell

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);
    
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current;
      // Enable text wrapping on cell B5
      spreadsheet.wrap('B5', true);

      // Disable text wrapping on cell B5
      spreadsheet.wrap('B5', false);

      // Enable wrapping on range A1:D10
      spreadsheet.wrap('A1:D10', true);

      // Disable wrapping on range C1:C10
      spreadsheet.wrap('C1:C10', false);

      // Enable wrapping on entire column C
      spreadsheet.wrap('C:C', true);
    };
    return (<SpreadsheetComponent ref={spreadsheetRef} allowWrap={true} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective>
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;

```

### Wrap a Range of Cells

```jsx
// Enable wrapping on range A1:D10
spreadsheet.wrap('A1:D10', true);

// Disable wrapping on range C1:C10
spreadsheet.wrap('C1:C10', false);
```

### Wrap an Entire Column

```jsx
// Enable wrapping on entire column C
spreadsheet.wrap('C:C', true);

// Enable wrapping on entire column A
spreadsheet.wrap('A:A', true);
```

## Interactive Example

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);
    
    const applyWrap = () => {
      const spreadsheet = spreadsheetRef.current;
      // To wrap the cell's text content with the specified address
      spreadsheet.wrap('[CELL_ADDRESS]', true);
    };

    const removeWrap = () => {
      const spreadsheet = spreadsheetRef.current;
      // To wrap the cell's text content with the specified address
      spreadsheet.wrap('[CELL_ADDRESS]', false);
    };

    return (<div className='control-section spreadsheet-control'>
                <button className='e-btn' onClick={applyWrap}>Apply wrap</button>
                <button className='e-btn' onClick={removeWrap}>Remove wrap</button>
                <SpreadsheetComponent ref={spreadsheetRef} allowWrap={true}>
                    <SheetsDirective>
                        <SheetDirective>
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>
            </div>);
}
export default Default;

```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[CELL_ADDRESS]` | Address of the cell to wrap | `'B5'`, `'A1:D10'`, `'C:C'` |
| `[ENABLE]` | Wrap boolean value | `true`, `false` |

## Common Pitfalls to Avoid

- **Don't wrap very narrow columns** - Text becomes difficult to read
- **Combine wrapping with row height adjustment** - Wrapped text may be cut off without adequate row height

## Notes

- Text wrapping preserves formatting when copying cells
- Wrapped content expands automatically during print
- Works with all cell alignments and formatting
