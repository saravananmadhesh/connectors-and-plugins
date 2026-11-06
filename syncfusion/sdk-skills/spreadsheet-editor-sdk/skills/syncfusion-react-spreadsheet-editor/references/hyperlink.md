# Hyperlinks

Insert, edit, and remove hyperlinks in the Spreadsheet Editor.

## Minimal Code

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);

    //Bind created event to perform the action during initial load.
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current; 
      // === Insert Hyperlink ===
      spreadsheet.addHyperlink('https://www.syncfusion.com', 'A1');

      // Insert hyperlink with display text
      spreadsheet.addHyperlink('https://www.github.com', 'B2', 'github');

      // === Edit Hyperlink ===
      // Replace hyperlink in a cell
      spreadsheet.addHyperlink('https://www.microsoft.com', 'A1', 'Microsoft');

      // === Remove Hyperlink ===
      spreadsheet.removeHyperlink('B2');
    }
    return (<SpreadsheetComponent ref={spreadsheetRef} allowHyperlink={true} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective name="Links">
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;
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
- **Gotcha**: Spaces in URLs should be encoded as %20
- **Gotcha**: PDF exports may not preserve hyperlink interactivity

## Placeholders
| Placeholder | Description | Example |
|---|---|---|
| [CELL_RANGE] | Cell to add link | 'A1' |
| [LINK_URL] | URL or mailto | 'https://example.com' |
| [LINK_TEXT] | Display text | 'Click Here' |
| [TOOLTIP] | Hover tooltip | 'Go to external site' |
| [INTERNAL_RANGE] | Internal reference | 'Sheet2!A1:D10' |

## Notes
- Use descriptive link text
- Styling: Shows blue and underlined
- **⚠️ SECURITY**: When adding hyperlinks programmatically, validate and sanitize all URL inputs to prevent malicious links. Never add hyperlinks from untrusted or user-provided sources without proper validation.