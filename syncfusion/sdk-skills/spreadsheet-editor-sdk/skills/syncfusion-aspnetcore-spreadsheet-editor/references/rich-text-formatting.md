# Rich Text Formatting

Apply different styles to specific portions of text within a single cell using the `richText` property via the `updateCell` method, allowing each text segment to have its own font, color, decoration, or script formatting.

## Controller Setup (`RichTextController.cs`)

When passing initial data or placeholders from the controller:

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MySpreadsheetApp.Controllers
{
    public class RichTextController : Controller
    {
        public IActionResult Index()
        {
            List<object> data = new List<object>()
            {
                new { Text = "Plain Text" },
                new { Text = "Annual Sales Report 2026 (Draft)" },
                new { Text = "Customer Loyalty Program" },
                new { Text = "Mineral Water H2O" },
                new { Text = "Premium Membership valid until 31st Dec 2026" }
            };

            ViewBag.DefaultData = data;
            return View();
        }
    }
}
```

---

## Minimal Code (`Index.cshtml`)

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

<ejs-spreadsheet id="spreadsheet" allowCellFormatting="true" created="onCreated" showFormulaBar="false">
    <e-spreadsheet-sheets>
        <e-spreadsheet-sheet name="Report">
            <e-spreadsheet-columns>
                <e-spreadsheet-column width="300"></e-spreadsheet-column>
            </e-spreadsheet-columns>
            <e-spreadsheet-ranges>
                <e-spreadsheet-range dataSource="ViewBag.DefaultData"></e-spreadsheet-range>
            </e-spreadsheet-ranges>
        </e-spreadsheet-sheet>
    </e-spreadsheet-sheets>
</ejs-spreadsheet>

<script>
    function onCreated() {
        // Apply rich text formatting dynamically using updateCell
        this.updateCell({
            value: 'Annual Sales Report 2026 Highlights (Draft)',
            richText: [
                { text: 'Annual Sales Report ', style: { fontWeight: 'bold' } },
                { text: '2026', style: { color: '#0078D4' } },
                { text: ' Highlights', style: { textDecoration: 'underline' } },
                { text: ' (Draft)', style: { fontStyle: 'italic' } }
            ]
        }, 'A2');

        this.updateCell({
            value: 'Mineral Water H2O',
            richText: [
                { text: 'Mineral Water H' },
                { text: '2', style: { verticalAlign: 'sub' } },
                { text: 'O' }
            ]
        }, 'A4');

        this.updateCell({
            value: 'Premium Membership valid until 31st Dec 2026',
            richText: [
                { text: 'Premium Membership ', style: { fontWeight: 'bold', color: '#2E7D32' } },
                { text: 'valid until ', style: { fontStyle: 'italic' } },
                { text: '31', style: { textDecoration: 'underline' } },
                { text: 'st', style: { verticalAlign: 'super' } },
                { text: ' Dec 2026' }
            ]
        }, 'A5');
    }
</script>
```

---

## API Reference

### `updateCell(cell, address?)` Method

Use `updateCell` on the Spreadsheet instance to apply rich text formatting to an existing cell or target address.

```javascript
// Inside the created event handler:
this.updateCell(
    {
        value: '[PLAIN_TEXT_VALUE]',
        richText: [
            { text: '[SEGMENT_TEXT]', style: { /* CellStyleModel */ } }
        ]
    },
    '[CELL_ADDRESS]'
);

// Or via the component instance from anywhere:
var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
spreadsheet.updateCell(cellObj, 'A1');
```

---

### RichText Segment Structure

Each item in the `richText` array defines a text segment and an optional style object:

| Property | Type | Description |
|---|---|---|
| `text` | `string` | The text content of the segment. |
| `style` | `CellStyleModel` | Formatting options applied to this segment. |

---

### Segment Style Properties (`CellStyleModel`)

| Property | Type | Description | Example |
|---|---|---|---|
| `fontFamily` | `string` | Typeface of the text segment | `'Calibri'`, `'Arial'`, `'Georgia'` |
| `fontSize` | `string` | Font size with units | `'11pt'`, `'14pt'` |
| `fontWeight` | `string` | Font weight | `'bold'`, `'normal'` |
| `fontStyle` | `string` | Font style | `'italic'`, `'normal'` |
| `textDecoration` | `string` | Text decoration style | `'underline'`, `'line-through'` |
| `color` | `string` | Text foreground color | `'#0078D4'`, `'#2E7D32'` |
| `verticalAlign` | `string` | Script position / vertical alignment | `'sub'`, `'super'`, `'top'`, `'middle'`, `'bottom'` |

---

### VerticalAlign Options (Segment-Level)

| Value | Description |
|---|---|
| `'sub'` | Renders the segment text as subscript (e.g., `2` in H₂O) |
| `'super'` | Renders the segment text as superscript (e.g., `st` in 31st) |
| `'top'` | Aligns the segment text to the top of the cell line |
| `'middle'` | Aligns the segment text to the middle of the cell line |
| `'bottom'` | Aligns the segment text to the bottom of the cell line |

---

### Documentation Link

Refer to the following documentation link for more information about rich text formatting in Spreadsheet:

https://helpstaging.syncfusion.com/document-processing/excel/spreadsheet/asp-net-core/rich-text-formatting

---

## Notes

- Build the `richText` array as an ordered sequence of `{ text, style }` segments representing the full text display.
- Omit `style` on any segment that should inherit the cell's standard base formatting.
- Always provide a matching plain `value` property on the cell alongside `richText` so exports, clipboard, and operations that do not support rich text still retain the text.
- `updateCell()` is the supported method to programmatically set and update `richText` at runtime.
- Inside client-side event handlers such as `created`, `this` references the Spreadsheet component instance directly.