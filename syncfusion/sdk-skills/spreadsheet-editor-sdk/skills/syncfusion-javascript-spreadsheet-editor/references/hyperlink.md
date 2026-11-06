# Hyperlinks

Insert and remove hyperlinks in the Spreadsheet Editor using `addHyperlink()` and `removeHyperlink()`.

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet: Spreadsheet = new Spreadsheet({
  allowHyperlink: true,
  sheets: [{ name: 'Links' }]
});

spreadsheet.appendTo('#spreadsheet');

// === URL Hyperlink (string shorthand) ===
spreadsheet.addHyperlink('https://www.syncfusion.com', 'A1');

// === URL Hyperlink with display text ===
spreadsheet.addHyperlink('https://www.syncfusion.com', 'A2', 'Syncfusion');

// === URL Hyperlink (HyperlinkModel) ===
spreadsheet.addHyperlink(
  { address: 'https://www.syncfusion.com', target: '_blank' },
  'A3'
);

// === Email Hyperlink ===
spreadsheet.addHyperlink(
  { address: 'mailto:support@syncfusion.com' },
  'B1'
);

// === Internal Cell Reference ===
spreadsheet.addHyperlink(
  { address: 'Sheet2!A1', target: '_self' },
  'C1'
);

// === Remove Hyperlink ===
spreadsheet.removeHyperlink('A1');
spreadsheet.removeHyperlink('A1:C5');

=== Change Target Attribute via Event ===
const spreadsheet: Spreadsheet = new Spreadsheet({
  allowHyperlink: true,
  sheets: [{ name: 'Links' }],
  beforeHyperlinkClick: (args) => {
    args.target = '_blank';    // Override target before navigation
  }
});
```

## Placeholders

### addHyperlink(hyperlink, cellAddress, displayText?)

| Placeholder | Description | Example |
|---|---|---|
| `hyperlink` | Plain URL string or `HyperlinkModel` object | `'https://example.com'`, `{ address: '...', target: '_blank' }` |
| `address` | `HyperlinkModel.address` — URL, mailto, or internal cell reference | `'https://example.com'`, `'mailto:user@example.com'`, `'Sheet2!A1'` |
| `target` | `HyperlinkModel.target` — where to open the link | `'_blank'`, `'_self'`, `'_parent'`, `'_top'` |
| `cellAddress` | Target cell to insert hyperlink into | `'A1'`, `'B2'` |
| `displayText` | Optional display text shown in cell instead of URL | `'Syncfusion'`, `'Click Here'` |

### beforeHyperlinkClick Event

| Placeholder | Description | Example |
|---|---|---|
| `args.target` | Override the target attribute before link navigation fires | `'_blank'`, `'_self'` |
| `args.address` | The hyperlink address being navigated to | `'https://example.com'` |
| `args.cancel` | Set `true` to cancel the hyperlink navigation | `true`, `false` |

### removeHyperlink(range)

| Placeholder | Description | Example |
|---|---|---|
| `range` | Cell or range to remove hyperlink from | `'A1'`, `'A1:C5'` |

## Notes

- `hyperlink` param accepts a plain URL string or a `HyperlinkModel` object
- **Email**: Format `address` as `mailto:user@example.com`
- **Internal**: Format `address` as `SheetName!CellAddress` (e.g., `'Sheet2!A1'`)
- **Target**: Use `'_blank'` to open in new tab; `'_self'` for same tab (default)
- **Change Target**: Use `beforeHyperlinkClick` event to dynamically override `args.target` at runtime
- **Edit**: Call `addHyperlink()` again on same cell to replace existing hyperlink
- **Gotcha**: `allowHyperlink: true` must be set at initialization
- **⚠️ SECURITY**: When adding hyperlinks programmatically, validate and sanitize all URL inputs to prevent malicious links. Never add hyperlinks from untrusted or user-provided sources without proper validation.