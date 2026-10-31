# Rich Text Formatting

Apply different styles to specific portions of text within a single cell using the `richText` property, so each text segment can have its own font, color, decoration, or script formatting.

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet: Spreadsheet = new Spreadsheet({
  allowCellFormatting: true,
  sheets: [{
    name: 'Report',
    rows: [
      {
        cells: [
          {
            value: 'Annual Sales Report 2026 Highlights (Draft)',
            richText: [
              { text: 'Annual Sales Report ', style: { fontWeight: 'bold' } },
              { text: '2026', style: { color: '#0078D4' } },
              { text: ' Highlights', style: { textDecoration: 'underline' } },
              { text: ' (Draft)', style: { fontStyle: 'italic' } }
            ]
          }
        ]
      }
    ]
  }]
});

spreadsheet.appendTo('#spreadsheet');

// Apply rich text formatting dynamically with updateCell 
spreadsheet.updateCell({
  richText: [
    { text: 'Premium Membership ', style: { fontWeight: 'bold', color: '#2E7D32' } },
    { text: 'valid until ', style: { fontStyle: 'italic' } },
    { text: '31', style: { textDecoration: 'underline' } },
    { text: 'st', style: { verticalAlign: 'super' } },
    { text: ' Dec 2026' }
  ]
}, 'A5');

// Mixed font family/size per segment 
spreadsheet.updateCell({
  richText: [
    { text: 'Calibri segment ', style: { fontFamily: 'Calibri', fontSize: '11pt' } },
    { text: 'Arial segment ', style: { fontFamily: 'Arial', fontSize: '14pt' } },
    { text: 'Georgia segment', style: { fontFamily: 'Georgia', fontSize: '16pt' } }
  ]
}, 'A6');

// Subscript and superscript segments 
spreadsheet.updateCell({
  richText: [
    { text: 'H' },
    { text: '2', style: { verticalAlign: 'sub' } },
    { text: 'O and x' },
    { text: '2', style: { verticalAlign: 'super' } }
  ]
}, 'A7');
```

## API Reference

### CellModel.richText

```typescript
// CellModel.richText?: RichTextSpanModel[]
cell: {
  value: '[TEXT]',
  richText: [
    { text: '[SEGMENT_TEXT]', style: { /* CellStyleModel */ } }
  ]
}
```

| Property | Description | Example |
|---|---|---|
| `text` | Content of the segment | `'Annual Sales Report '` |
| `style` | `CellStyleModel` applied only to this segment | `{ fontWeight: 'bold' }` |

### CellStyleModel (segment-level style properties)

| Property | Description | Example |
|---|---|---|
| `fontFamily` | Typeface of the segment | `'Calibri'`, `'Arial'`, `'Georgia'` |
| `fontSize` | Size with unit (pt, px, em) | `'11pt'`, `'14pt'` |
| `fontWeight` | Font weight | `'bold'`, `'normal'`, `'500'`, `'700'` |
| `fontStyle` | Font style | `'italic'`, `'normal'` |
| `textDecoration` | Text decoration | `'underline'`, `'line-through'`, `'none'` |
| `color` | Text color (hex) | `'#0078D4'`, `'#2E7D32'` |
| `verticalAlign` | Vertical alignment / script position of the segment | `'top'`, `'middle'`, `'bottom'`, `'sub'`, `'super'` |

### VerticalAlign

```typescript
type VerticalAlign = 'bottom' | 'middle' | 'top' | 'sub' | 'super';
```

| Value | Description |
|---|---|
| `'bottom'` | Aligns the segment text to the bottom of the cell |
| `'middle'` | Aligns the segment text to the middle of the cell |
| `'top'` | Aligns the segment text to the top of the cell |
| `'sub'` | Renders the segment as subscript (e.g., the `2` in `H₂O`) |
| `'super'` | Renders the segment as superscript (e.g., the `st` in `31st`) |

### updateCell(cell, address?)

```typescript
// updateCell(cell: CellModel, address?: string): void
spreadsheet.updateCell(
  { richText: [{ text: '[SEGMENT_TEXT]', style: { /* CellStyleModel */ } }] },
  '[RANGE]'
);
```

**Description**: Applies or replaces the `richText` segments on an existing cell at runtime.

## Notes

- Build the `richText` array as a sequence of `{ text, style }` segments in display order; omit `style` on a segment to inherit the cell's default formatting.
- Keep a plain `value` on the cell alongside `richText` so exports/consumers that don't read rich text still get the raw text.
- `richText` styles only support `CellStyleModel` properties — `fontFamily`, `fontSize`, `fontWeight`, `fontStyle`, `textDecoration`, `color`, and `verticalAlign` (`'bottom'` | `'middle'` | `'top'` | `'sub'` | `'super'`) are the documented segment-level options.
- `'top'`, `'middle'`, and `'bottom'` control the vertical position of the segment within the cell, while `'sub'` and `'super'` control the script position (subscript/superscript) of the segment's text.
- Use `updateCell()` to change `richText` programmatically; setting it only at initialization won't reflect later runtime changes.