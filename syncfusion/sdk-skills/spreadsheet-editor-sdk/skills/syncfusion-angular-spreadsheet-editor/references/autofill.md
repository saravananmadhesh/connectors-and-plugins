# Autofill

Automatically fill cell ranges with patterns, series, or copied values.

## Minimal Angular Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent, AutoFillSettingsModel } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `<ejs-spreadsheet #spreadsheet [allowAutoFill]="true" [autoFillSettings]="autoFillSettings" (created)="created()"></ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  public autoFillSettings: AutoFillSettingsModel = {
    fillType: 'FillSeries',
    showFillOptions: true
  };

  created(): void {
    this.spreadsheet.autoFill('A2:A10', 'A1', 'Down', 'FillSeries');
  }
}
```

---

## Type Definitions

```typescript
type AutoFillDirection = 'Down' | 'Right' | 'Up' | 'Left';
type AutoFillType = 'FillSeries' | 'CopyCells' | 'FillFormattingOnly' | 'FillWithoutFormatting';
```

---

## Autofill Method

```typescript
this.spreadsheet.autoFill(
  fillRange: string,              // Range to fill INTO
  dataRange?: string,             // Source data range
  direction?: AutoFillDirection,  // 'Down' | 'Right' | 'Up' | 'Left'
  fillType?: AutoFillType         // Fill type
): void
```

---

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[FILL_RANGE]` | Range to fill into | `'A2:A10'`, `'B1:E1'`, `'Sheet1!C2:C5'` |
| `[DATA_RANGE]` | Source data range to copy/extend | `'A1'`, `'A1:C1'`, `'Sheet1!B2'` |
| `[DIRECTION]` | Direction to fill | `'Down'`, `'Right'`, `'Up'`, `'Left'` |
| `[FILL_TYPE]` | Type of fill operation | `'FillSeries'`, `'CopyCells'`, `'FillWithoutFormatting'`, `'FillFormattingOnly'` |

---

## Fill Types

| Type | Description |
|---|---|
| `FillSeries` | Continue numeric/date patterns (1,2,3 → 4,5,6) |
| `CopyCells` | Duplicate values and formatting |
| `FillWithoutFormatting` | Copy values only |
| `FillFormattingOnly` | Copy formatting only |

---

## Common Patterns

```typescript
// Numeric series — fill right from A1
created(): void {
  this.spreadsheet.autoFill('B1:E1', 'A1:A1', 'Right', 'FillSeries');
}

// Copy cells with formatting — fill down from A1
created(): void {
  this.spreadsheet.autoFill('A2:A5', 'A1:A1', 'Down', 'CopyCells');
}

// Formula autofill — adjusts relative references automatically
created(): void {
  this.spreadsheet.autoFill('A2:A10', 'A1:A1', 'Down', 'CopyCells');
}
```

---

## Template Binding Example

Bind `autoFillSettings` and toggle `allowAutoFill` dynamically:

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
    <ejs-spreadsheet #spreadsheet
      [allowAutoFill]="isAutoFillEnabled"
      [autoFillSettings]="autoFillSettings"
      (created)="created()">
    </ejs-spreadsheet>
    <button (click)="toggleAutoFill()">Toggle Autofill</button>
  `
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  public isAutoFillEnabled: boolean = true;

  public autoFillSettings: AutoFillSettingsModel = {
    fillType: 'FillSeries',
    showFillOptions: true
  };

  toggleAutoFill(): void {
    this.isAutoFillEnabled = !this.isAutoFillEnabled;
  }

  created(): void {
    this.spreadsheet.autoFill('A2:A10', 'A1', 'Down', 'FillSeries');
  }
}
```

---

## Notes

- Always access `SpreadsheetComponent` via `@ViewChild` — never use `new Spreadsheet()` in Angular.
- All `autoFill()` calls must be placed inside the `created()` event handler to ensure the component is fully initialized.
- `FillSeries` requires a minimum of 1–2 source cells for pattern detection.
- `CopyCells` with formulas auto-adjusts **relative** references.
- **Absolute references** (`$A$1`) do **not** adjust when autofilled.
- Avoid autofilling 10,000+ cells at once — may cause performance lag.
- Import `SpreadsheetAllModule` in the `imports` array of the standalone component.