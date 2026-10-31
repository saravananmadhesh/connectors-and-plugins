# Autofill

Automatically fill cell ranges with patterns, series, or copied values.

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet: Spreadsheet = new Spreadsheet({
  allowAutoFill: true,
  autoFillSettings: {
    fillType: 'FillSeries',
    showFillOptions: true
  },
  sheets: [{ name: 'Sheet1', rows: [{ cells: [{ value: '1' }, { value: '2' }, { value: '3' }] }] }],
  created: (): void => {
    spreadsheet.autoFill('A2:A10', 'A1', 'Down', 'FillSeries');
  }
});

spreadsheet.appendTo('#spreadsheet');
```

## Type Definitions

```typescript
type AutoFillDirection = 'Down' | 'Right' | 'Up' | 'Left';
type AutoFillType = 'FillSeries' | 'CopyCells' | 'FillFormattingOnly' | 'FillWithoutFormatting';
```

## Autofill Method

```typescript
autoFill(
  fillRange: string,              // Range to fill INTO
  dataRange?: string,             // Source data range
  direction?: AutoFillDirection,  // 'Down' | 'Right' | 'Up' | 'Left'
  fillType?: AutoFillType         // Fill type
): void
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[FILL_RANGE]` | Range to fill into | `'A2:A10'`, `'B1:E1'`, `'Sheet1!C2:C5'` |
| `[DATA_RANGE]` | Source data range to copy/extend | `'A1'`, `'A1:C1'`, `'Sheet1!B2'` |
| `[DIRECTION]` | Direction to fill | `'Down'`, `'Right'`, `'Up'`, `'Left'` |
| `[FILL_TYPE]` | Type of fill operation | `'FillSeries'`, `'CopyCells'`, `'FillWithoutFormatting'`, `'FillFormattingOnly'` |

## Fill Types
FillSeries: Continue numeric/date patterns (1,2,3 → 4,5,6)
CopyCells: Duplicate values and formatting
FillWithoutFormatting: Copy values only
FillFormattingOnly: Copy formatting only

## Common Patterns

```typescript
// Numeric series
spreadsheet.autoFill('B1:E1', 'A1:A1', 'Right', 'FillSeries');

// Copy with formatting
spreadsheet.autoFill('A2:A5', 'A1:A1', 'Down', 'CopyCells');

// Formula autofill (adjusts references)
spreadsheet.autoFill('A2:A10', 'A1:A1', 'Down', 'CopyCells');
```

## Notes

- FillSeries requires pattern detection (1-2 cells minimum)
- CopyCells with formulas auto-adjusts relative references
- Absolute references ($A$1) do NOT adjust when autofilled
- Preview before applying to large ranges (10,000+ cells may lag)