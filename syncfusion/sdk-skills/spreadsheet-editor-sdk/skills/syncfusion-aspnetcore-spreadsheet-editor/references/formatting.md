# Cell Formatting

Apply visual styles to cells (fonts, colors, alignment, borders, wrapping) in the Spreadsheet Editor.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" created="onCreated">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1">
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // === Font & Background ===
        spreadsheet.cellFormat(
            { fontFamily: 'Arial', fontSize: '12pt', fontWeight: 'bold', color: '#0000FF', backgroundColor: '#E6F7FF' },
            'A1:D1'
        );

        // === Alignment ===
        spreadsheet.cellFormat(
            { textAlign: 'center', verticalAlign: 'middle' },
            'A2:D20'
        );

        // === Borders using cellFormat ===
        spreadsheet.cellFormat(
            { border: '1px solid #000000' },
            'B2:D10'
        );

        // === Borders using setBorder (specific types) ===
        spreadsheet.setBorder({ border: '2px solid #000000' }, 'B2:D10', 'Outer');
        spreadsheet.setBorder({ border: '1px dashed #666666' }, 'B2:D10', 'Inner');
        spreadsheet.setBorder({ border: '1px solid #FF0000' }, 'B2:D10', 'All');
        spreadsheet.setBorder({ border: '2px solid #00FF00' }, 'B2:D10', 'Left');
        spreadsheet.setBorder({ border: '2px solid #00FF00' }, 'B2:D10', 'Right');
        spreadsheet.setBorder({ border: '2px solid #00FF00' }, 'B2:D10', 'Top');
        spreadsheet.setBorder({ border: '2px solid #00FF00' }, 'B2:D10', 'Bottom');

        // === Clear Formatting ===
        // Use the clear() method with type 'Clear Formats'
        spreadsheet.clear({ type: 'Clear Formats', range: 'A2:D20' });
        // Clear formatting from active selection (no range needed if range is selected)
        spreadsheet.clear({ type: 'Clear Formats', range: 'A1:Z100' });
    }
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

```cshtml
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

```cshtml
fontFamily: 'Arial'              // Font name
fontSize: '12pt'                 // Size with unit (pt, px, em)
fontWeight: 'bold'               // 'bold', 'normal', '500', '700', etc.
fontStyle: 'italic'              // 'italic', 'normal', 'oblique'
textDecoration: 'underline'      // 'underline', 'line-through', 'none'
color: '#0000FF'                 // Text color (hex)
```

### Background & Fill

```cshtml
backgroundColor: '#E6F7FF'       // Background color (hex)
```

### Alignment

```cshtml
textAlign: 'center'              // 'left', 'center', 'right', 'justify'
verticalAlign: 'middle'          // 'top', 'middle', 'bottom'
textIndent: '8pt'                // Indent from left
```

### Borders

```cshtml
border: '1px solid #000000'      // CSS-style border
```

### Text Direction

```cshtml
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

## Clear Formatting

```cshtml
// Clear formatting from a specific range
spreadsheet.clear({ type: 'Clear Formats', range: 'A2:D20' });

// Clear all content, formats, and hyperlinks
spreadsheet.clear({ type: 'Clear All', range: 'A2:D20' });

// Clear only cell values (keep formatting)
spreadsheet.clear({ type: 'Clear Contents', range: 'A2:D20' });
```

Removes applied styles (fonts, colors, borders, alignment) from the specified range using the `clear()` method with type.
