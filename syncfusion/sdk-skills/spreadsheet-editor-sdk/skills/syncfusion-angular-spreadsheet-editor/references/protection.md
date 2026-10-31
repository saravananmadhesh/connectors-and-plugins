# Sheet Protection & Cell Locking

Protect sheets and lock/unlock cells using `protectSheet()`, `unprotectSheet()`, and `lockCells()`.

## Minimal Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { ProtectSettingsModel } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1" [isProtected]="true" password="MyPassword123"
        [protectSettings]="protectSettings">
        <e-rows>
          <e-row>
            <e-cells>
              <e-cell value="Name" [isLocked]="false"></e-cell>
              <e-cell value="John"></e-cell>
            </e-cells>
          </e-row>
          <e-row>
            <e-cells>
              <e-cell value="Salary" [isLocked]="true"></e-cell>
              <e-cell [value]="50000"></e-cell>
            </e-cells>
          </e-row>
        </e-rows>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  // Init-time protect settings
  protectSettings: ProtectSettingsModel = {
    selectCells: true,
    formatCells: false,
    formatRows: false,
    formatColumns: false,
    insertLink: false
  };

  // Protect sheet
  protect(): void {
    this.spreadsheet.protectSheet('Sheet1', { selectCells: true }, 'MyPassword123');
    this.spreadsheet.protectSheet(0, { selectCells: true }); // by index
  }

  // Unprotect sheet
  unprotect(): void {
    this.spreadsheet.unprotectSheet('Sheet1');
    this.spreadsheet.unprotectSheet(0); // by index
  }

  // Lock cells
  lock(): void {
    this.spreadsheet.lockCells('B2:B10', true);  // lock
    this.spreadsheet.lockCells('A2:A10', false); // unlock
  }

  // Check protection state
  checkProtection(): void {
    const isProtected = this.spreadsheet.getActiveSheet().isProtected;
    console.log(isProtected);
  }
}
```

## API Reference

### protectSheet(sheet?, protectSettings?, password?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `sheet` | `string \| number` | Sheet name or index | `'Sheet1'`, `0` |
| `protectSettings` | `ProtectSettingsModel` | Protection options | `{ selectCells: true }` |
| `password` | `string` | Optional password | `'MyPassword123'` |

### unprotectSheet(sheet?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `sheet` | `string \| number` | Sheet name or index | `'Sheet1'`, `0` |

### lockCells(range?, isLocked?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `range` | `string` | Cell range to lock/unlock | `'B2:B10'` |
| `isLocked` | `boolean` | `true` to lock, `false` to unlock | `true`, `false` |

### ProtectSettingsModel

| Property | Type | Default | Description |
|---|---|---|---|
| `selectCells` | `boolean` | `false` | Allow selecting cells |
| `formatCells` | `boolean` | `false` | Allow formatting cells |
| `formatRows` | `boolean` | `false` | Allow resizing rows |
| `formatColumns` | `boolean` | `false` | Allow resizing columns |
| `insertLink` | `boolean` | `false` | Allow inserting hyperlinks |

## Notes

- Lock cells **before** protecting the sheet — lock state has no effect without protection
- All cells are locked by default; explicitly set `[isLocked]="false"` to allow editing
- Incorrect password on unprotect throws an error