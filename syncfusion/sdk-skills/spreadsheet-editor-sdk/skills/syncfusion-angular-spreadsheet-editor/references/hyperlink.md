# Hyperlinks

Insert and remove hyperlinks via `addHyperlink()` and `removeHyperlink()`.

## Minimal Angular Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { BeforeHyperlinkClickEventArgs } from '@syncfusion/ej2-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet [allowHyperlink]="true"
    (beforeHyperlinkClick)="onBeforeHyperlinkClick($event)">
    <e-sheets>
      <e-sheet name="Links"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  // URL hyperlink (string shorthand)
  addUrl(): void {
    this.spreadsheet.addHyperlink('https://www.syncfusion.com', 'A1');
  }

  // URL hyperlink with display text
  addUrlWithText(): void {
    this.spreadsheet.addHyperlink('https://www.syncfusion.com', 'A2', 'Syncfusion');
  }

  // URL hyperlink (HyperlinkModel)
  addUrlModel(): void {
    this.spreadsheet.addHyperlink(
      { address: 'https://www.syncfusion.com' },
      'A3'
    );
  }

  // Email hyperlink
  addEmail(): void {
    this.spreadsheet.addHyperlink(
      { address: 'mailto:support@syncfusion.com' },
      'B1'
    );
  }

  // Internal cell reference
  addInternal(): void {
    this.spreadsheet.addHyperlink(
      { address: 'Sheet2!A1' },
      'C1'
    );
  }

  // Remove hyperlink
  remove(): void {
    this.spreadsheet.removeHyperlink('A1');
    this.spreadsheet.removeHyperlink('A1:C5');
  }

  // Override target before navigation
  onBeforeHyperlinkClick(args: BeforeHyperlinkClickEventArgs): void {
    args.target = '_blank';   // open in new tab
    // args.cancel = true;    // cancel navigation
  }
}
```

## API Reference

### addHyperlink(hyperlink, cellAddress, displayText?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `hyperlink` | `string \| HyperlinkModel` | URL string or HyperlinkModel object | `'https://example.com'` |
| `cellAddress` | `string` | Target cell to insert hyperlink | `'A1'`, `'B2'` |
| `displayText` | `string` | Optional display text shown in cell | `'Click Here'` |

### HyperlinkModel

| Property | Type | Description | Example |
|---|---|---|---|
| `address` | `string` | URL, mailto, or internal cell reference | `'https://example.com'`, `'mailto:user@example.com'`, `'Sheet2!A1'` |

### removeHyperlink(range)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `range` | `string` | Cell or range to remove hyperlink from | `'A1'`, `'A1:C5'` |

### beforeHyperlinkClick Event

| Argument | Type | Description | Example |
|---|---|---|---|
| `args.target` | `string` | Override target before navigation | `'_blank'`, `'_self'` |
| `args.address` | `string` | Hyperlink address being navigated | `'https://example.com'` |
| `args.cancel` | `boolean` | Set `true` to cancel navigation | `true` |

## Notes

- `[allowHyperlink]="true"` must be set at initialization
- `hyperlink` param accepts a plain URL string or a `HyperlinkModel` object
- Call `addHyperlink()` on the same cell again to replace an existing hyperlink
- **Email**: prefix address with `mailto:`
- **Internal**: format address as `SheetName!CellAddress`
- **⚠️ SECURITY**: When adding hyperlinks programmatically, validate and sanitize all URL inputs to prevent malicious links. Never add hyperlinks from untrusted or user-provided sources without proper validation.