# Wrap Text

Wrap or unwrap cell text using `wrap()`.

## Minimal Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  // Wrap single cell
  wrapCell(): void {
    this.spreadsheet.wrap('B5', true);   // enable
    this.spreadsheet.wrap('B5', false);  // disable
  }

  // Wrap range
  wrapRange(): void {
    this.spreadsheet.wrap('A1:D10', true);
  }

  // Wrap entire column
  wrapColumn(): void {
    this.spreadsheet.wrap('C:C', true);
  }
}
```

## API Reference

### wrap(address, wrap?)

| Parameter | Type | Default | Description |
|---|---|---|---|
| `address` | `string` | — | Cell, range, or column to wrap | `'B5'`, `'A1:D10'`, `'C:C'` |
| `wrap` | `boolean` | `true` | `true` to enable wrapping; `false` to disable |

## Notes

- Address is case-insensitive — `'b5'` and `'B5'` are equivalent
- Applies immediately without requiring a refresh
- Text wrapping is preserved when copying cells