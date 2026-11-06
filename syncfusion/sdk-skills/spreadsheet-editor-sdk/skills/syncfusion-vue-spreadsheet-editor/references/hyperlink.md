# Hyperlinks

Insert, edit, and remove hyperlinks in the Spreadsheet Editor.

## Minimal Code

```vue
<template>
<div class="control-section">
  <ejs-spreadsheet
    ref="spreadsheet"
    :allowHyperlink="true"
    :created="onCreated"
  >
    <e-sheets>
      <e-sheet name="Links"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</div>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective
},

methods: {
  onCreated() {
    const spreadsheet = this.$refs.spreadsheet;
    // Insert hyperlink with display text
    spreadsheet.addHyperlink("https://www.github.com", "B2", "github");
    // === Edit Hyperlink (replace URL + text) ===
    spreadsheet.addHyperlink("https://www.microsoft.com", "A1", "Microsoft");
    // === Remove Hyperlink ===
    spreadsheet.removeHyperlink("B2");
  }
}
};
</script>
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[CELL_RANGE]` | Cell to add hyperlink | `'A1'`, `'B5:B20'` |
| `[LINK_URL]` | URL or mailto address | `'https://example.com'`, `'mailto:john@example.com'` |
| `[LINK_TEXT]` | Display text for link | `'Click Here'`, `'Visit Site'` |
| `[TOOLTIP]` | Hover tooltip | `'Go to external site'` |
| `[INTERNAL_RANGE]` | Internal sheet reference | `'Sheet2!A1:D10'` |

## Notes

- **Best Practice**: Use descriptive link text (not 'Click Here')
- **Best Practice**: Add tooltips for clarification
- **URL Types**: External (http/https), Email (mailto), Internal (Sheet!Cell)
- **Display Text**: Can differ from actual URL
- **Email Links**: Format as `mailto:email@domain.com?subject=Subject`
- **Internal Links**: Format as `SheetName!CellRange`
- **Styling**: Links show in blue and underlined (CSS customizable)
- **Editing**: Click cell, then Edit > Hyperlink (or Ctrl+K)

## Placeholders
| Placeholder | Description | Example |
|---|---|---|
| [CELL_RANGE] | Cell to add link | 'A1' |
| [LINK_URL] | URL or mailto | 'https://example.com' |
| [LINK_TEXT] | Display text | 'Click Here' |
| [TOOLTIP] | Hover tooltip | 'Go to external site' |
| [INTERNAL_RANGE] | Internal reference | 'Sheet2!A1:D10' |

## Notes
- Best Practice: Use descriptive link text
- Best Practice: Add tooltips for clarification
- Email Links: Format as 'mailto:email@example.com'
- Internal Links: Format as 'SheetName!CellRange'
- Styling: Shows blue and underlined
- **⚠️ SECURITY**: When adding hyperlinks programmatically, validate and sanitize all URL inputs to prevent malicious links. Never add hyperlinks from untrusted or user-provided sources without proper validation.
