# Cell Formatting

Apply visual styles to cells (fonts, colors, alignment, borders, wrapping) in the Spreadsheet Editor.

## Minimal Code

```vue
<template>
<div class="control-section">
  <ejs-spreadsheet ref="spreadsheet" :created="onCreated">
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range :dataSource="productData" />
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</div>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective,
RangesDirective,
RangeDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective,
  "e-ranges": RangesDirective,
  "e-range": RangeDirective
},

data: () => ({
  productData: [
    { Item: "Pen",        Qty: 10, Price: 5,   Total: "=B2*C2" },
    { Item: "Pencil",     Qty: 20, Price: 3,   Total: "=B3*C3" },
    { Item: "Notebook",   Qty: 5,  Price: 50,  Total: "=B4*C4" },
    { Item: "Eraser",     Qty: 15, Price: 2,   Total: "=B5*C5" },
    { Item: "Marker",     Qty: 8,  Price: 25,  Total: "=B6*C6" },
    { Item: "Sharpener",  Qty: 12, Price: 5,   Total: "=B7*C7" },
    { Item: "Highlighter",Qty: 6,  Price: 30,  Total: "=B8*C8" },
    { Item: "Glue",       Qty: 7,  Price: 15,  Total: "=B9*C9" },
    { Item: "Stapler",    Qty: 3,  Price: 70,  Total: "=B10*C10" },
    { Item: "Folders",    Qty: 9,  Price: 20,  Total: "=B11*C11" },
    { Item: "Files",      Qty: 14, Price: 18,  Total: "=B12*C12" },
    { Item: "Paper Pack", Qty: 4,  Price: 120, Total: "=B13*C13" },
    { Item: "Box",        Qty: 10, Price: 40,  Total: "=B14*C14" },
    { Item: "Tape",       Qty: 16, Price: 12,  Total: "=B15*C15" },
    { Item: "Scissors",   Qty: 2,  Price: 80,  Total: "=B16*C16" },
    { Item: "Ruler",      Qty: 5,  Price: 10,  Total: "=B17*C17" },
    { Item: "Binder",     Qty: 3,  Price: 55,  Total: "=B18*C18" },
    { Item: "Envelope",   Qty: 25, Price: 2,   Total: "=B19*C19" },
    { Item: "Clip Pack",  Qty: 30, Price: 1,   Total: "=B20*C20" },
    { Item: "Whiteboard", Qty: 1,  Price: 350, Total: "=B21*C21" }
  ]
}),

methods: {
  onCreated() {
    const s = this.$refs.spreadsheet;

    // === Font & Background ===
    s.cellFormat(
      { fontFamily: "Arial", fontSize: "12pt", fontWeight: "bold", color: "#0000FF", backgroundColor: "#E6F7FF" },
      "A1:D1"
    );

    // === Alignment ===
    s.cellFormat({ textAlign: "center", verticalAlign: "middle" }, "A2:D25");

    // === Borders using cellFormat ===
    s.cellFormat({ border: "1px solid #000" }, "B2:D10");

    // === Borders using setBorder ===
    s.setBorder({ border: "2px solid #000" }, "B2:D10", "Outer");
    s.setBorder({ border: "1px dashed #666" }, "B2:D10", "Inner");
    s.setBorder({ border: "1px solid #F00" }, "B2:D10", "All");
    s.setBorder({ border: "2px solid #0F0" }, "B2:D10", "Left");
    s.setBorder({ border: "2px solid #0F0" }, "B2:D10", "Right");
    s.setBorder({ border: "2px solid #0F0" }, "B2:D10", "Top");
    s.setBorder({ border: "2px solid #0F0" }, "B2:D10", "Bottom");

    // === Clear Formatting ===
    /*s.clear({ type: "Clear Formats", range: "A2:D25" });
    s.clear({ type: "Clear Formats", range: "A1:Z100" });*/
  }
}
};
</script>
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[FONT_FAMILY]` | Font name | `'Arial'`, `'Times New Roman'`, `'Verdana'` |
| `[FONT_SIZE]` | Font size with unit | `'12pt'`, `'14px'`, `'1.2em'` |
| `[FONT_WEIGHT]` | Font weight | `'bold'`, `'normal'`, `'500'`, `'700'` |
| `[COLOR]` | Text color hex code | `'#0000FF'` (blue), `'#FF0000'` (red) |
| `[BG_COLOR]` | Background color hex | `'#E6F7FF'`, `'#FFFF00'` (yellow) |
| `[TEXT_ALIGN]` | Horizontal alignment | `'left'`, `'center'`, `'right'`, `'justify'` |
| `[VERT_ALIGN]` | Vertical alignment | `'top'`, `'middle'`, `'bottom'` |
| `[BORDER_STYLE]` | Border format | `'1px solid #000000'` |
| `[BORDER_TYPE]` | Border location | `'Outer'`, `'Inner'`, `'All'`, `'Left'`, `'Right'`, `'Top'`, `'Bottom'` |
| `[RANGE]` | Cell range | `'A1:D1'`, `'B2:D10'` |

## Vague Parameters Explained

### Border Format Syntax

The `border` property accepts CSS-style border definitions in the format: `[width] [style] [color]`

#### Width Values
```vue
'1px'                 // 1 pixel (thin line)
'2px'                 // 2 pixels (medium line)
'3px'                 // 3 pixels (thick line)
'4px'                 // 4 pixels (extra thick)
'5px'                 // 5 pixels (very thick)
```

#### Style Values
```vue
'solid'               // Solid continuous line: ———————
'dashed'              // Dashed line: - - - - - -
'dotted'              // Dotted line: · · · · · ·
'double'              // Double line: ═════════
```

#### Color Values (Hex Format)
```vue
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
```vue
'1px solid #000000'   // Thin solid black line
'2px dashed #FF0000'  // Medium dashed red line
'3px dotted #0000FF'  // Thick dotted blue line
'1px solid #666666'   // Thin solid gray line
'2px double #000000'  // Medium double black line
```

### Border Type Values (for setBorder)

The second parameter of `setBorder()` specifies which edges get the border:

| Type | Applies To | Use Case |
|------|-----------|----------|
| `'Outer'` | Perimeter of range | Table border around entire selection |
| `'Inner'` | Between cells | Grid lines between cells |
| `'All'` | Outer + Inner | Complete grid (border + inner lines) |
| `'Left'` | Left edge only | Left column accent |
| `'Right'` | Right edge only | Right column accent |
| `'Top'` | Top edge only | Top row accent |
| `'Bottom'` | Bottom edge only | Bottom row accent |
| `'HorizontalLine'` | Horizontal lines | Separate rows |
| `'VerticalLine'` | Vertical lines | Separate columns |

#### Examples by Type

```vue
// Outer border (box around the range)
spreadsheet.setBorder(
  { border: '2px solid #000000' },
  'B2:D10',
  'Outer'
);
// Result: Box outline only

// Inner borders (grid inside the range)
spreadsheet.setBorder(
  { border: '1px dashed #999999' },
  'B2:D10',
  'Inner'
);
// Result: Grid lines between cells (no outer box)

// All borders (complete grid)
spreadsheet.setBorder(
  { border: '1px solid #000000' },
  'B2:D10',
  'All'
);
// Result: Outer box + inner grid

// Single side
spreadsheet.setBorder(
  { border: '3px solid #FF0000' },
  'A1:E1',
  'Bottom'
);
// Result: Red line under header row
```

## Style Properties Reference

### Font Properties

```vue
fontFamily: 'Arial'              // Font name
fontSize: '12pt'                 // Size with unit (pt, px, em)
fontWeight: 'bold'               // 'bold', 'normal', '500', '700', etc.
fontStyle: 'italic'              // 'italic', 'normal', 'oblique'
textDecoration: 'underline'      // 'underline', 'line-through', 'none'
color: '#0000FF'                 // Text color (hex)
```

### Background & Fill

```vue
backgroundColor: '#E6F7FF'       // Background color (hex)
```

### Alignment

```vue
textAlign: 'center'              // 'left', 'center', 'right', 'justify'
verticalAlign: 'middle'          // 'top', 'middle', 'bottom'
textIndent: '8pt'                // Indent from left
```

### Borders

```vue
border: '1px solid #000000'      // CSS-style border
```

### Text Direction

```vue
textOrientation: 90              // Degrees (0, 90, 180, 270)
```

## Notes

- **Best Practice**: Use `cellFormat()` for simple formatting; use `setBorder()` for precise border control
- **Best Practice**: Apply formatting to headers (row 1) separately for consistency
- **Best Practice**: Use consistent font families across sheets (Arial, Verdana, Calibri)
- **Performance**: Formatting many cells (100k+) can be slow; apply in batches

## Clear Formatting

```vue
// Clear formatting from a specific range
spreadsheet.clear({ type: 'Clear Formats', range: 'A2:D20' });

// Clear all content, formats, and hyperlinks
spreadsheet.clear({ type: 'Clear All', range: 'A2:D20' });

// Clear only cell values (keep formatting)
spreadsheet.clear({ type: 'Clear Contents', range: 'A2:D20' });
```

Removes applied styles (fonts, colors, borders, alignment) from the specified range using the `clear()` method. There is no standalone `clearFormatting()` method in the API.

Note: Placeholders already included in Vague Parameters Explained sections above.

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
