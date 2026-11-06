# Cell Formatting

Apply visual styles to cells in the Spreadsheet Editor using JavaScript-style properties; only the properties listed below are supported.

## Table of Contents

- [Minimal Code](#minimal-code)
- [Placeholders](#placeholders)
  - [setBorder(style, range?, type?, isUndoRedo?)](#setborderstyle-range-type-isundoredo)
- [Vague Parameters Explained](#vague-parameters-explained)
  - [Border Format Syntax](#border-format-syntax)
    - [Width Values](#width-values)
    - [Style Values](#style-values)
    - [Color Values (Hex Format)](#color-values-hex-format)
    - [Complete Examples](#complete-examples)
    - [Examples by Type](#examples-by-type)
- [Style Properties Reference](#style-properties-reference)
  - [Font Properties](#font-properties)
  - [Background & Fill](#background--fill)
  - [Alignment](#alignment)
  - [Borders](#borders)
  - [Text Direction](#text-direction)
- [Notes](#notes)

## Minimal Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
  <ejs-spreadsheet #spreadsheet [allowCellFormatting]="true">
    <e-sheets>
      <e-sheet name="Report"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>

  <button (click)="applyFormatting()">Apply Formatting</button>
  <button (click)="applyBorders()">Apply Borders</button>
  `
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  applyFormatting(): void {
    // === Font & Background ===
    this.spreadsheet.cellFormat(
      { fontFamily: 'Arial', fontSize: '12pt', fontWeight: 'bold', color: '#0000FF', backgroundColor: '#E6F7FF' },
      'A1:D1'
    );

    // === Alignment ===
    this.spreadsheet.cellFormat(
      { textAlign: 'center', verticalAlign: 'middle' },
      'A2:D20'
    );

    // === Borders using cellFormat ===
    this.spreadsheet.cellFormat(
      { border: '1px solid #000000' },
      'B2:D10'
    );
  }

  applyBorders(): void {
    // === Borders using setBorder (specific types) ===
    this.spreadsheet.setBorder({ border: '2px solid #000000' }, 'B2:D10', 'Outer');
    this.spreadsheet.setBorder({ border: '1px dashed #666666' }, 'B2:D10', 'Inner');
    this.spreadsheet.setBorder({ border: '1px solid #FF0000' }, 'B2:D10', 'All');
    this.spreadsheet.setBorder({ border: '2px solid #00FF00' }, 'B2:D10', 'Left');
    this.spreadsheet.setBorder({ border: '2px solid #00FF00' }, 'B2:D10', 'Right');
    this.spreadsheet.setBorder({ border: '2px solid #00FF00' }, 'B2:D10', 'Top');
    this.spreadsheet.setBorder({ border: '2px solid #00FF00' }, 'B2:D10', 'Bottom');
  }
}
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `fontFamily` | `fontFamily` — font name | `'Arial'`, `'Times New Roman'`, `'Verdana'` |
| `fontSize` | `fontSize` — font size with unit | `'12pt'`, `'14px'`, `'1.2em'` |
| `fontWeight` | `fontWeight` — font weight | `'bold'`, `'normal'`, `'500'`, `'700'` |
| `fontStyle` | `fontStyle` — font style | `'italic'`, `'normal'`, `'oblique'` |
| `textDecoration` | `textDecoration` — text decoration | `'underline'`, `'line-through'`, `'none'` |
| `color` | `color` — text color hex | `'#0000FF'`, `'#FF0000'` |
| `backgroundColor` | `backgroundColor` — background color hex | `'#E6F7FF'`, `'#FFFF00'` |
| `textAlign` | `textAlign` — horizontal alignment | `'left'`, `'center'`, `'right'`, `'justify'` |
| `verticalAlign` | `verticalAlign` — vertical alignment | `'top'`, `'middle'`, `'bottom'` |
| `textIndent` | `textIndent` — indent from left | `'8pt'`, `'4px'` |
| `textOrientation` | `textOrientation` — rotation in degrees | `0`, `90`, `180`, `270` |
| `border` | `border` — CSS-style border | `'1px solid #000000'` |
| `range` | Target cell range for `cellFormat(style, range)` | `'A1:D1'`, `'B2:D10'` |

### setBorder(style, range?, type?, isUndoRedo?)

| Placeholder | Description | Example |
|---|---|---|
| `border` | `border` — CSS-style border value | `'1px solid #000000'`, `'2px dashed #FF0000'` |
| `range` | Optional target cell range — defaults to active cell if omitted | `'B2:D10'`, `'A1:E5'` |
| `type` | `BorderType` — which edges to apply border to | `'Outer'`, `'Inner'`, `'Horizontal'`, `'Vertical'` |
| `isUndoRedo` | Whether the action is part of undo/redo operation | `true`, `false` |

## Vague Parameters Explained

### Border Format Syntax

The `border` property accepts CSS-style border definitions in the format: `[width] [style] [color]`

#### Width Values
```typescript
'1px'                 // 1 pixel (thin line)
'2px'                 // 2 pixels (medium line)
'3px'                 // 3 pixels (thick line)
'4px'                 // 4 pixels (extra thick)
'5px'                 // 5 pixels (very thick)
```

#### Style Values
```typescript
'solid'               // Solid continuous line: ———————
'dashed'              // Dashed line: - - - - - -
'dotted'              // Dotted line: · · · · · ·
'double'              // Double line: ═════════
```

#### Color Values (Hex Format)
```typescript
'#000000'             // Black
'#FFFFFF'             // White
'#FF0000'             // Red
'#00FF00'             // Green
'#0000FF'             // Blue
'#FFFF00'             // Yellow
'#FF00FF'             // Magenta
'#00FFFF'             // Cyan
'#808080'             // Gray
'#FFA500'             // Orange
```

#### Complete Examples
```typescript
'1px solid #000000'   // Thin solid black line
'2px dashed #FF0000'  // Medium dashed red line
'3px dotted #0000FF'  // Thick dotted blue line
'1px solid #666666'   // Thin solid gray line
'2px double #000000'  // Medium double black line
```

#### Examples by Type

```typescript
// Outer border (box around the range)
this.spreadsheet.setBorder(
  { border: '2px solid #000000' },
  'B2:D10',
  'Outer'
);
// Result: Box outline only

// Inner borders (grid inside the range)
this.spreadsheet.setBorder(
  { border: '1px dashed #999999' },
  'B2:D10',
  'Inner'
);
// Result: Grid lines between cells (no outer box)

// All borders (complete grid)
this.spreadsheet.setBorder(
  { border: '1px solid #000000' },
  'B2:D10',
  'All'
);
// Result: Outer box + inner grid

// Single side
this.spreadsheet.setBorder(
  { border: '3px solid #FF0000' },
  'A1:E1',
  'Bottom'
);
// Result: Red line under header row
```

## Style Properties Reference

### Font Properties

```typescript
fontFamily: 'Arial'              // Font name
fontSize: '12pt'                 // Size with unit (pt, px, em)
fontWeight: 'bold'               // 'bold', 'normal', '500', '700', etc.
fontStyle: 'italic'              // 'italic', 'normal', 'oblique'
textDecoration: 'underline'      // 'underline', 'line-through', 'none'
color: '#0000FF'                 // Text color (hex)
```

### Background & Fill

```typescript
backgroundColor: '#E6F7FF'       // Background color (hex)
```

### Alignment

```typescript
textAlign: 'center'              // 'left', 'center', 'right', 'justify'
verticalAlign: 'middle'          // 'top', 'middle', 'bottom'
textIndent: '8pt'                // Indent from left
```

### Borders

```typescript
border: '1px solid #000000'      // CSS-style border
```

### Text Direction

```typescript
textOrientation: 90              // Degrees (0, 90, 180, 270)
```

## Notes

- **Best Practice**: Use `cellFormat()` for simple formatting; use `setBorder()` for precise border control
- **Best Practice**: Apply formatting to headers (row 1) separately for consistency
- **Best Practice**: Use consistent font families across sheets (Arial, Verdana, Calibri)
- **Gotcha**: `setBorder()` with `'Outer'` only adds border to range perimeter, not internal lines
- **Gotcha**: `backgroundColor` uses hex format, not CSS color names (use `'#FF0000'` not `'red'`)
- **Gotcha**: Border styles may not be visible if color matches cell background
- **Gotcha**: Long text automatically overflows into adjacent empty cells when the content width exceeds the current cell width.
- **Gotcha**: Text overflow is automatically refreshed when cell values, formatting, column widths, or rich text content change.
- **Performance**: Formatting many cells (100k+) can be slow; apply in batches
- **Angular Tip**: Use `@ViewChild` to access spreadsheet instance after view initialization