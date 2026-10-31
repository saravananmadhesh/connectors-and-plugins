# Conditional Formatting

Apply rules to automatically format cells based on their values (e.g., highlight negatives in red, top 10% in green, data bars, color scales, icon sets) in the Syncfusion Angular Spreadsheet.

---

## Table of Contents

- [Minimal Angular Code](#minimal-angular-code)
- [API Reference](#api-reference)
- [Conditional Format Operations](#conditional-format-operations)
  - [Highlight Cell Rules](#highlight-cell-rules)
  - [Top Bottom Rules](#top-bottom-rules)
  - [Data Bar Rules](#data-bar-rules)
  - [Color Scale Rules](#color-scale-rules)
  - [Icon Set Rules](#icon-set-rules)
  - [Formula-based Conditional Format Rules](#formula-based-conditional-format-rules)
  - [Clear Conditional Formatting](#clear-conditional-formatting)
- [Template Button Binding Example](#template-button-binding-example)
- [Type Definitions](#type-definitions)
- [Color Format Values](#color-format-values)
- [FormatModel](#formatmodel)
- [Placeholders](#placeholders)
- [Notes](#notes)

---

## Minimal Angular Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet
    #spreadsheet
    [allowConditionalFormat]="true"
    (created)="created()">
    <e-sheets>
      <e-sheet name="Sales">
        <e-ranges>
          <e-range [dataSource]="salesData"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  public salesData: object[] = [
    { Month: 'Jan', Sales: 35, Target: 40, Growth: 12 },
    { Month: 'Feb', Sales: 40, Target: 35, Growth: -5 },
    { Month: 'Mar', Sales: 50, Target: 45, Growth: 20 }
  ];

  created(): void {
    // Apply blue data bar to Sales column
    this.spreadsheet.conditionalFormat({ type: 'BlueDataBar', range: 'B2:B4' });

    // Highlight cells greater than 40 in red
    this.spreadsheet.conditionalFormat({ type: 'GreaterThan', cFColor: 'RedFT', value: '40', range: 'B2:B4' });

    // Apply formula-based conditional format with preset color
    this.spreadsheet.conditionalFormat({ type: 'Formula', cFColor: 'GreenFT', value: '=B2>AVG(B2:B4)', range: 'B2:B4' });

    // Apply formula-based conditional format with custom style
    this.spreadsheet.conditionalFormat({
      type: 'Formula',
      value: '=C2>40',
      format: { style: { color: '#ffffff', backgroundColor: '#009999', fontWeight: 'bold' } },
      range: 'C2:C4'
    });
  }
}
```

---

## API Reference

| Method | Signature | Description |
|---|---|---|
| `conditionalFormat` | `conditionalFormat(conditionalFormat: ConditionalFormatModel)` | Apply a conditional formatting rule |
| `clearConditionalFormat` | `clearConditionalFormat(range?: string)` | Clear rules from a range or active sheet |

---

## Conditional Format Operations

### Highlight Cell Rules
```typescript
created(): void {
  // Greater Than
  this.spreadsheet.conditionalFormat({
    type: 'GreaterThan', cFColor: 'RedFT', value: '100', range: 'B2:B10'
  });

  // Less Than
  this.spreadsheet.conditionalFormat({
    type: 'LessThan', cFColor: 'YellowFT', value: '50', range: 'B2:B10'
  });

  // Between two values (comma-separated)
  this.spreadsheet.conditionalFormat({
    type: 'Between', cFColor: 'GreenFT', value: '50,100', range: 'B2:B10'
  });

  // Equal To
  this.spreadsheet.conditionalFormat({
    type: 'EqualTo', cFColor: 'RedFT', value: '0', range: 'C2:C10'
  });

  // Contains Text
  this.spreadsheet.conditionalFormat({
    type: 'ContainsText', cFColor: 'GreenFT', value: 'Pass', range: 'D2:D10'
  });

  // Duplicate Values
  this.spreadsheet.conditionalFormat({
    type: 'Duplicate', cFColor: 'RedFT', range: 'A2:A10'
  });

  // Unique Values
  this.spreadsheet.conditionalFormat({
    type: 'Unique', cFColor: 'GreenFT', range: 'A2:A10'
  });

  // Date Occur
  this.spreadsheet.conditionalFormat({
    type: 'DateOccur', cFColor: 'YellowFT', value: '10/15/2023', range: 'E2:E10'
  });
}
```

### Top Bottom Rules
```typescript
created(): void {
  // Top 10 items
  this.spreadsheet.conditionalFormat({
    type: 'Top10Items', cFColor: 'GreenFT', range: 'B2:B20'
  });

  // Bottom 10 items
  this.spreadsheet.conditionalFormat({
    type: 'Bottom10Items', cFColor: 'RedFT', range: 'B2:B20'
  });

  // Top 10 percentage
  this.spreadsheet.conditionalFormat({
    type: 'Top10Percentage', cFColor: 'GreenFT', range: 'B2:B20'
  });

  // Above Average
  this.spreadsheet.conditionalFormat({
    type: 'AboveAverage', cFColor: 'GreenFT', range: 'B2:B20'
  });

  // Below Average
  this.spreadsheet.conditionalFormat({
    type: 'BelowAverage', cFColor: 'RedFT', range: 'B2:B20'
  });
}
```

### Data Bar Rules
```typescript
created(): void {
  // Blue data bar
  this.spreadsheet.conditionalFormat({ type: 'BlueDataBar',      range: 'B2:B10' });

  // Green data bar
  this.spreadsheet.conditionalFormat({ type: 'GreenDataBar',     range: 'C2:C10' });

  // Red data bar
  this.spreadsheet.conditionalFormat({ type: 'RedDataBar',       range: 'D2:D10' });

  // Orange data bar
  this.spreadsheet.conditionalFormat({ type: 'OrangeDataBar',    range: 'E2:E10' });

  // Light Blue data bar
  this.spreadsheet.conditionalFormat({ type: 'LightBlueDataBar', range: 'F2:F10' });

  // Purple data bar
  this.spreadsheet.conditionalFormat({ type: 'PurpleDataBar',    range: 'G2:G10' });
}
```

### Color Scale Rules
```typescript
created(): void {
  // Red-Yellow-Green
  this.spreadsheet.conditionalFormat({ type: 'RYGColorScale', range: 'B2:B10' });

  // Green-Yellow-Red
  this.spreadsheet.conditionalFormat({ type: 'GYRColorScale', range: 'C2:C10' });

  // Blue-White-Red
  this.spreadsheet.conditionalFormat({ type: 'BWRColorScale', range: 'D2:D10' });

  // White-Red
  this.spreadsheet.conditionalFormat({ type: 'WRColorScale', range: 'E2:E10' });

  // Green-White
  this.spreadsheet.conditionalFormat({ type: 'GWColorScale', range: 'F2:F10' });
}
```

### Icon Set Rules
```typescript
created(): void {
  // Three Arrows
  this.spreadsheet.conditionalFormat({ type: 'ThreeArrows',        range: 'B2:B10' });

  // Three Traffic Lights
  this.spreadsheet.conditionalFormat({ type: 'ThreeTrafficLights1', range: 'C2:C10' });

  // Three Stars
  this.spreadsheet.conditionalFormat({ type: 'ThreeStars',          range: 'D2:D10' });

  // Five Arrows
  this.spreadsheet.conditionalFormat({ type: 'FiveArrows',          range: 'E2:E10' });

  // Five Rating
  this.spreadsheet.conditionalFormat({ type: 'FiveRating',          range: 'F2:F10' });

  // Four Red To Black
  this.spreadsheet.conditionalFormat({ type: 'FourRedToBlack',      range: 'G2:G10' });
}
```

### Formula-based Conditional Format Rules
```typescript
created(): void {
  // Highlight cells in H2:H9 greater than the average of the range
  this.spreadsheet.conditionalFormat({
    type: 'Formula', cFColor: 'GreenFT', value: '=H2>AVG(H2:H9)', range: 'H2:H9'
  });

  // Highlight cells in H6:H9 that exceed 5000
  this.spreadsheet.conditionalFormat({
    type: 'Formula', cFColor: 'RedT', value: '=H6>5000', range: 'H6:H9'
  });

  // Apply formula-based conditional format with a custom format instead of a preset cFColor
  this.spreadsheet.conditionalFormat({
    type: 'Formula',
    value: '=B2>700',
    format: { style: { color: '#ffffff', backgroundColor: '#009999', fontWeight: 'bold' } },
    range: 'B2:B30'
  });
}
```

Declarative usage in the sheet template:
```html
<e-conditionalformats>
  <e-conditionalformat type="Formula" cFColor="GreenFT" value="=H2>AVG(H2:H9)" range="H2:H9"></e-conditionalformat>
</e-conditionalformats>
```

### Clear Conditional Formatting
```typescript
// Clear rules from a specific range
clearRange(): void {
  this.spreadsheet.clearConditionalFormat('B2:B10');
}

// Clear rules using sheet name in the range
clearSheetRange(): void {
  this.spreadsheet.clearConditionalFormat('Sheet1!B2:B10');
}

// Clear ALL rules from the active sheet
clearAll(): void {
  this.spreadsheet.clearConditionalFormat();
}
```

---

## Template Button Binding Example

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
    <ejs-spreadsheet
    #spreadsheet
    [allowConditionalFormat]="true"
    (created)="created()">
    <e-sheets>
      <e-sheet name="Sales">
        <e-ranges>
          <e-range [dataSource]="salesData"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>

  <button (click)="applyDataBar()">Apply Data Bar</button>
  <button (click)="applyColorScale()">Apply Color Scale</button>
  <button (click)="applyIconSet()">Apply Icon Set</button>
  <button (click)="highlightGreaterThan()">Highlight > 40</button>
  <button (click)="clearFormatting()">Clear Formatting</button>
  `
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  public salesData: object[] = [
    { Month: 'Jan', Sales: 35, Target: 40, Growth: 12 },
    { Month: 'Feb', Sales: 40, Target: 35, Growth: -5 },
    { Month: 'Mar', Sales: 50, Target: 45, Growth: 20 }
  ];

  created(): void {
    // Initialization logic if needed
  }

  applyDataBar(): void {
    this.spreadsheet.conditionalFormat({ type: 'BlueDataBar', range: 'B2:B4' });
  }

  applyColorScale(): void {
    this.spreadsheet.conditionalFormat({ type: 'RYGColorScale', range: 'C2:C4' });
  }

  applyIconSet(): void {
    this.spreadsheet.conditionalFormat({ type: 'ThreeArrows', range: 'D2:D4' });
  }

  highlightGreaterThan(): void {
    this.spreadsheet.conditionalFormat({
      type: 'GreaterThan', cFColor: 'RedFT', value: '40', range: 'B2:B4'
    });
  }

  clearFormatting(): void {
    this.spreadsheet.clearConditionalFormat('B2:D4');
  }
}
```

---

## Type Definitions

### HighlightCell
```typescript
type HighlightCell = 'GreaterThan' | 'LessThan' | 'Between' | 'EqualTo' |
  'ContainsText' | 'DateOccur' | 'Duplicate' | 'Unique';
```

### TopBottom
```typescript
type TopBottom = 'Top10Items' | 'Bottom10Items' | 'Top10Percentage' |
  'Bottom10Percentage' | 'BelowAverage' | 'AboveAverage';
```

### DataBar
```typescript
type DataBar = 'BlueDataBar' | 'GreenDataBar' | 'RedDataBar' |
  'OrangeDataBar' | 'LightBlueDataBar' | 'PurpleDataBar';
```

### ColorScale
```typescript
type ColorScale = 'GYRColorScale' | 'RYGColorScale' | 'GWRColorScale' |
  'RWGColorScale' | 'BWRColorScale' | 'RWBColorScale' | 'WRColorScale' |
  'RWColorScale' | 'GWColorScale' | 'WGColorScale' | 'GYColorScale' | 'YGColorScale';
```

### IconSet
```typescript
type IconSet = 'ThreeArrows' | 'ThreeArrowsGray' | 'FourArrowsGray' |
  'FourArrows' | 'FiveArrowsGray' | 'FiveArrows' | 'ThreeTrafficLights1' |
  'ThreeTrafficLights2' | 'ThreeSigns' | 'FourTrafficLights' | 'FourRedToBlack' |
  'ThreeSymbols' | 'ThreeSymbols2' | 'ThreeFlags' | 'FourRating' | 'FiveQuarters' |
  'FiveRating' | 'ThreeTriangles' | 'ThreeStars' | 'FiveBoxes';
```

### Formula-based Conditional Format
```typescript
type Formula = 'Formula';
```

Formula-based conditional formatting applies custom formatting rules using an Excel formula. When the formula in `value` evaluates to `TRUE` for a cell, the formatting (`cFColor` or custom `format`) is applied to that cell. This enables advanced highlighting scenarios based on values from other cells or ranges in the worksheet, beyond the built-in Highlight Cell/Top Bottom conditions.

```typescript
// Highlight cells in B2:B30 whose value exceeds a fixed threshold
this.spreadsheet.conditionalFormat({ type: 'Formula', value: '=B2>700', cFColor: 'RedT', range: 'B2:B30' });

// Highlight cells in H6:H9 that exceed 5000, referencing the first cell of the range in the formula
this.spreadsheet.conditionalFormat({ type: 'Formula', value: '=H6>5000', cFColor: 'RedT', range: 'H6:H9' });
```

---

## Color Format Values

The `cFColor` property specifies the fill and text color using built-in Syncfusion styles.

| Value | Description |
|---|---|
| `'RedFT'` | Red fill and text |
| `'YellowFT'` | Yellow fill and text |
| `'GreenFT'` | Green fill and text |
| `'RedF'` | Red fill only |
| `'RedT'` | Red text only |

---

## FormatModel

| Property | Description | Example |
|---|---|---|
| `format` | Specifies the number format | `'$#,##0.00'` |
| `isLocked` | Specifies if the cell is locked | `true` / `false` |
| `style` | Specifies the cell style | `StyleModel` |

---

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[TYPE]` | Conditional formatting type | `'GreaterThan'`, `'BlueDataBar'`, `'ThreeStars'`, `'Formula'` |
| `[VALUE]` | Conditional formatting value | `'100'`, `'50,100'`, `'10/15/2023'` |
| `[CFCOLOR]` | Highlight color style | `'RedFT'`, `'GreenFT'`, `'YellowFT'` |
| `[FORMAT]` | Format model | `FormatModel` |
| `[RANGE]` | Target range | `'B2:B10'`, `'Sheet1!A1:A10'` |

---

## Notes

- Formula-based rules support both the preset `cFColor` styles and a custom `format` (cell style) object.
- Always access `SpreadsheetComponent` via `@ViewChild` — never use `new Spreadsheet()` in Angular.
- All `conditionalFormat()` and `clearConditionalFormat()` calls must be placed inside the `created()` event to ensure the component is fully initialized.
- Use `#spreadsheet` template reference variable on `<ejs-spreadsheet>` to match `@ViewChild('spreadsheet')`.
- Bind `[allowConditionalFormat]="true"` in the template to enable conditional formatting support.
- `DataBar`, `ColorScale`, and `IconSet` types do **not** require `cFColor` — they use built-in visual styles.
- `HighlightCell` and `TopBottom` types **require** `cFColor` to define the highlight color.
- For `Between` type, pass two comma-separated values in the `value` property: `'50,100'`.
- Multiple rules can be applied to the same range — they are evaluated in order of application.
- `clearConditionalFormat()` with no argument clears **all** rules from the active sheet.
- Rules are preserved when exporting to `.xlsx` format.
- Import `SpreadsheetAllModule` in the `imports` array of the standalone component.