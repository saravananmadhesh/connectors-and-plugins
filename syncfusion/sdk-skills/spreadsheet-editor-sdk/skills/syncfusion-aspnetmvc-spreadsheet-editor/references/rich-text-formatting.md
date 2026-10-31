# Rich Text Formatting

Apply rich text formatting within cells, including font styles, colors, sub/superscript, and more in ASP.NET MVC applications.

## Minimal Code

```csharp
@{
    ViewBag.Title = "Rich Text Formatting";
}

@using Syncfusion.EJ2.Spreadsheet;
@using Syncfusion.EJ2.Spreadsheet.Helpers;

@(Html.EJS().Spreadsheet("spreadsheet")
    .AllowEditing(true)
    .Created("onCreated")
    .Sheets(sheet =>
    {
        sheet.Name("Report")
            .Rows(row =>
            {
                row.Cells(cell =>
                {
                    cell.Value("Annual Sales Report 2026 Highlights (Draft)").Add();
                }).Add();
            }).Add();
    })
    .Render()
)

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
        
        // Apply rich text formatting to a cell
        spreadsheet.updateCell({
            richText: [
                { text: 'Annual Sales Report ', style: { fontWeight: 'bold' } },
                { text: '2026', style: { color: '#0078D4' } },
                { text: ' Highlights', style: { textDecoration: 'underline' } },
                { text: ' (Draft)', style: { fontStyle: 'italic' } }
            ]
        }, 'A1');
        
        // Apply rich text formatting with different styles
        spreadsheet.updateCell({
            richText: [
                { text: 'Premium Membership ', style: { fontWeight: 'bold', color: '#2E7D32' } },
                { text: 'valid until ', style: { fontStyle: 'italic' } },
                { text: '31', style: { textDecoration: 'underline' } },
                { text: 'st', style: { verticalAlign: 'super' } },
                { text: ' Dec 2026' }
            ]
        }, 'A2');
        
        // Mixed font family/size per segment
        spreadsheet.updateCell({
            richText: [
                { text: 'Calibri segment ', style: { fontFamily: 'Calibri', fontSize: '11pt' } },
                { text: 'Arial segment ', style: { fontFamily: 'Arial', fontSize: '14pt' } },
                { text: 'Georgia segment', style: { fontFamily: 'Georgia', fontSize: '16pt' } }
            ]
        }, 'A3');
        
        // Subscript and superscript segments
        spreadsheet.updateCell({
            richText: [
                { text: 'H' },
                { text: '2', style: { verticalAlign: 'sub' } },
                { text: 'O and x' },
                { text: '2', style: { verticalAlign: 'super' } }
            ]
        }, 'A4');
    }
</script>
```

## Controller Implementation

```csharp
public class SpreadsheetController : Controller
{
    public ActionResult RichTextFormatting()
    {
        return View();
    }
}
```

## Rich Text Properties

### RichTextSpanModel

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

## Vertical Alignment Values

| Value | Description |
|---|---|
| `'bottom'` | Aligns the segment text to the bottom of the cell |
| `'middle'` | Aligns the segment text to the middle of the cell |
| `'top'` | Aligns the segment text to the top of the cell |
| `'sub'` | Renders the segment as subscript (e.g., the `2` in `H₂O`) |
| `'super'` | Renders the segment as superscript (e.g., the `st` in `31st`) |

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `richText` | Array of text segments applied to a single cell | `[{ text: '...', style: { ... } }]` |
| `text` | Content of an individual rich text segment | `'Annual Sales Report '`, `'2026'` |
| `style` | `CellStyleModel` — formatting applied to that segment only | `{ fontWeight: 'bold', color: '#0078D4' }` |
| `range` | Target cell address for `updateCell(cell, range)` | `'A1'`, `'B2'` |

## Example Patterns

### Example 1: Product Description with Rich Text

```csharp
@(Html.EJS().Spreadsheet("spreadsheet")
    .Created("formatProductDescription")
    .Sheets(sheet =>
    {
        sheet.Name("Products")
            .Rows(row =>
            {
                row.Cells(cell =>
                {
                    cell.Value("Product Details").Add();
                }).Add();
            }).Add();
    })
    .Render()
)

<script>
    function formatProductDescription() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
        
        // Format product name with emphasis
        spreadsheet.updateCell({
            richText: [
                { text: 'Premium ', style: { fontWeight: 'bold', color: '#1E3A8A' } },
                { text: 'Wireless Headphones', style: { fontSize: '14pt' } },
                { text: ' - ', style: { color: '#6B7280' } },
                { text: 'Limited Edition', style: { fontStyle: 'italic', color: '#DC2626' } }
            ]
        }, 'A2');
        
        // Format price with superscript for currency
        spreadsheet.updateCell({
            richText: [
                { text: '$', style: { verticalAlign: 'super', fontSize: '10pt' } },
                { text: '199', style: { fontSize: '16pt', fontWeight: 'bold' } },
                { text: '.99', style: { verticalAlign: 'super', fontSize: '10pt' } }
            ]
        }, 'B2');
    }
</script>
```

### Example 2: Chemical Formulas

```javascript
// In the created event handler
spreadsheet.updateCell({
    richText: [
        { text: 'H' },
        { text: '2', style: { verticalAlign: 'sub' } },
        { text: 'O' },
        { text: ' (Water)' }
    ]
}, 'A5');

spreadsheet.updateCell({
    richText: [
        { text: 'CO' },
        { text: '2', style: { verticalAlign: 'sub' } },
        { text: ' (Carbon Dioxide)' }
    ]
}, 'A6');
```

## Notes

- Build the `richText` array as a sequence of `{ text, style }` segments in display order; omit `style` on a segment to inherit the cell's default formatting.
- Keep a plain `value` on the cell alongside `richText` so exports/consumers that don't read rich text still get the raw text.
- `richText` styles only support `CellStyleModel` properties — `fontFamily`, `fontSize`, `fontWeight`, `fontStyle`, `textDecoration`, `color`, and `verticalAlign` (`'bottom'` | `'middle'` | `'top'` | `'sub'` | `'super'`) are the documented segment-level options.
- `'top'`, `'middle'`, and `'bottom'` control the vertical position of the segment within the cell, while `'sub'` and `'super'` control the script position (subscript/superscript) of the segment's text.
- Use `updateCell()` to change `richText` programmatically; setting it only at initialization won't reflect later runtime changes.
- Rich text formatting is preserved when exporting to Excel format.