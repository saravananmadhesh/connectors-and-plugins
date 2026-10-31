# Scrolling & Virtualization

Configure scrolling behavior and virtualization for large datasets using `scrollSettings` and `goTo()`.

## Minimal Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { ScrollSettingsModel } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet [scrollSettings]="scrollSettings">
    <e-sheets>
      <e-sheet name="Sheet1" [frozenRows]="1" [frozenColumns]="1">
        <e-ranges>
          <e-range [dataSource]="data"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  data: object[] = [...]; // large dataset

  scrollSettings: ScrollSettingsModel = {
    isFinite: false,
    enableVirtualization: true
  };

  // Navigate to a specific cell
  navigate(): void {
    this.spreadsheet.goTo('A500000');          // same sheet
    this.spreadsheet.goTo('Sheet2!B1000');     // another sheet
  }
}
```

## API Reference

### scrollSettings

| Property | Type | Default | Description |
|---|---|---|---|
| `isFinite` | `boolean` | `false` | `true` bounds scrolling to data range; `false` allows infinite scrolling |
| `enableVirtualization` | `boolean` | `true` | Renders only visible cells for large datasets |

### goTo(cellAddress)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `cellAddress` | `string` | Cell address in A1 notation | `'A100'`, `'Sheet2!B50'` |

### Sheet-level Scroll Properties

| Property | Type | Description |
|---|---|---|
| `[frozenRows]` | `number` | Number of rows to freeze from top |
| `[frozenColumns]` | `number` | Number of columns to freeze from left |

## Notes

- `enableVirtualization: true` is recommended for datasets > 10,000 rows
- `isFinite: false` allows scrolling beyond the data range
- Container must have an explicit height set for virtualization to work correctly
- Frozen rows/columns stay fixed during scroll; virtual scrolling applies only to non-frozen area