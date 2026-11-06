# Rich Text Formatting

Apply rich text formatting within cells, including font styles, colors, sub/superscript, and more.

## Minimal Code

```vue
<template>
  <div class="control-section">
    <ejs-spreadsheet 
      ref="spreadsheet" 
      :allowEditing="true"
      :created="onCreated"
    >
      <e-sheets>
        <e-sheet>
          <e-columns>
            <e-column :width="120"></e-column>
            <e-column :width="150"></e-column>
            <e-column :width="120"></e-column>
          </e-columns>
          <e-rows>
            <e-row>
              <e-cells>
                <e-cell value="Product"></e-cell>
                <e-cell value="Description"></e-cell>
                <e-cell value="Price"></e-cell>
              </e-cells>
            </e-row>
            <e-row>
              <e-cells>
                <e-cell value="Laptop"></e-cell>
                <e-cell :value="richTextValue"></e-cell>
                <e-cell value="1200"></e-cell>
              </e-cells>
            </e-row>
            <e-row>
              <e-cells>
                <e-cell value="Mouse"></e-cell>
                <e-cell :value="richTextValue2"></e-cell>
                <e-cell value="25"></e-cell>
              </e-cells>
            </e-row>
          </e-rows>
        </e-sheet>
      </e-sheets>
    </ejs-spreadsheet>
  </div>
</template>

<script>
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RowsDirective, RowDirective, CellsDirective, CellDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-spreadsheet';

export default {
  components: {
    'ejs-spreadsheet': SpreadsheetComponent,
    'e-sheets': SheetsDirective,
    'e-sheet': SheetDirective,
    'e-rows': RowsDirective,
    'e-row': RowDirective,
    'e-cells': CellsDirective,
    'e-cell': CellDirective,
    'e-columns': ColumnsDirective,
    'e-column': ColumnDirective
  },
  
  data() {
    return {
      richTextValue: {
        richText: [
          { text: 'High-performance ', style: { bold: true, color: '#0000ff' } },
          { text: 'laptop', style: { bold: true, color: '#0000ff', underline: true } },
          { text: ' with ', style: { italic: true } },
          { text: '16GB RAM', style: { bold: true, color: '#ff0000' } }
        ]
      },
      richTextValue2: {
        richText: [
          { text: 'Ergonomic ', style: { bold: true, color: '#008000' } },
          { text: 'wireless', style: { italic: true, color: '#008000' } },
          { text: ' mouse', style: { bold: true, color: '#008000' } },
          { text: ' with ', style: {} },
          { text: 'H₂O', style: { subscript: true } },
          { text: ' resistance', style: {} }
        ]
      }
    };
  },
  
  methods: {
    onCreated() {
      const spreadsheet = this.$refs.spreadsheet;
      
      // Apply rich text formatting to a cell programmatically
      spreadsheet.updateCell({
        richText: [
          { text: 'Special ', style: { bold: true, color: '#ff0000' } },
          { text: 'Offer', style: { bold: true, color: '#ff0000', underline: true } },
          { text: ': Limited time only!', style: { italic: true } }
        ]
      }, 'C4');
      
      // Apply rich text formatting with different font sizes
      spreadsheet.updateCell({
        richText: [
          { text: 'H', style: { fontSize: 16, bold: true } },
          { text: '2', style: { fontSize: 12, bold: true, subscript: true } },
          { text: 'O', style: { fontSize: 16, bold: true } },
          { text: ' Molecule', style: { fontSize: 14 } }
        ]
      }, 'B4');
    }
  }
};
</script>
```

## Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `[TEXT]` | Text content for rich text element | `'High-performance'`, `'laptop'` |
| `[STYLE]` | Style object for rich text element | `{ bold: true, color: '#0000ff' }` |
| `[CELL_ADDRESS]` | Cell address to apply formatting | `'A1'`, `'B2'` |

## Rich Text Style Properties

Interface for styling rich text elements within cells.

| Property | Description | Type | Example |
|----------|-------------|------|---------|
| `bold` | Bold text | `boolean` | `true` |
| `italic` | Italic text | `boolean` | `true` |
| `underline` | Underlined text | `boolean` | `true` |
| `strikethrough` | Strikethrough text | `boolean` | `true` |
| `color` | Text color | `string` | `'#ff0000'` |
| `fontSize` | Font size in pixels | `number` | `14` |
| `fontFamily` | Font family | `string` | `'Arial'` |
| `subscript` | Subscript text | `boolean` | `true` |
| `superscript` | Superscript text | `boolean` | `true` |

## Notes

- Rich text formatting allows applying different styles to different parts of text within a single cell
- Each rich text element can have its own style properties
- Rich text can be applied both declaratively in the template and programmatically using `updateCell`
- Subscript and superscript cannot be used simultaneously on the same text element
- Font sizes are specified in pixels
- Color values should be in hex format
- Rich text formatting is preserved when exporting to Excel format