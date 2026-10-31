# Custom Functions

Add custom calculation functions to extend the built-in formula engine in the Spreadsheet.

## Table of Contents

- [Key Method](#key-method)
- [Setup](#setup)
- [Minimal Code](#minimal-code)
  - [Component Template](#component-template)
  - [Component Class](#component-class)
- [Placeholders](#placeholders)
- [Notes](#notes)

---

## Key Method

### `addCustomFunction(functionHandler, functionName?, formulaDescription?)`

| Parameter | Type | Required | Description |
|---|---|---|---|
| `functionHandler` | `string \| Function` | ✅ | Function handler name or function reference |
| `functionName` | `string` | ❌ | Formula name used in cells (uppercase) |
| `formulaDescription` | `string` | ❌ | Description shown in formula UI |

**Returns**: `void`

---

## Setup

Install the Syncfusion Spreadsheet package:

```bash
npm install @syncfusion/ej2-angular-spreadsheet
```

Import the module in `app.ts`:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `<ejs-spreadsheet #spreadsheet></ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;
}

```

---

## Minimal Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet (created)="onCreated()">
    <e-sheets>
      <e-sheet name="Sheet1"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet')
  spreadsheet!: SpreadsheetComponent;

  onCreated(): void {
    // Register custom functions
    this.spreadsheetObj.addCustomFunction(this.doubleHandler, 'DOUBLE', 'Multiplies value by 2');
    this.spreadsheetObj.addCustomFunction(this.fahrenheitHandler, 'FTOC', 'Fahrenheit to Celsius');
    this.spreadsheetObj.addCustomFunction(this.gradeHandler, 'GRADE', 'Returns letter grade');

    // Use in cells
    this.spreadsheet.updateCell({ value: '=DOUBLE(5)' }, 'A1');    // 10
    this.spreadsheet.updateCell({ value: '=FTOC(98.6)' }, 'A2');   // 37
    this.spreadsheet.updateCell({ value: '=GRADE(85)' }, 'A3');    // "B"
  }
  // Define function handlers
  doubleHandler(num: number): number {
    return num * 2;
  }
  fahrenheitHandler(f: number): number {
    return (f - 32) * (5 / 9);
  }
  gradeHandler(score: number): string {
    if (score >= 90) {
      return 'A';
    } else if (score >= 80) {
      return 'B';
    } else if (score >= 70) {
      return 'C';
    } else if (score >= 60) {
      return 'D';
    }
    return 'F';
  }
}

```

---

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[HANDLER_NAME]` | Function name in scope | `'doubleHandler'`, `'gradeHandler'` |
| `[FUNCTION_NAME]` | Formula name used in cells (uppercase) | `'DOUBLE'`, `'FTOC'`, `'GRADE'` |
| `[DESCRIPTION]` | User-friendly description | `'Multiplies value by 2'` |

---

## Notes

- Use `@ViewChild` to access the `SpreadsheetComponent` instance in Angular
- Register custom functions inside the `(created)` event binding to ensure the spreadsheet is fully initialized
- Handler functions must be defined.
- Function names must be **uppercase** and unique — cannot override built-ins like `SUM`, `AVERAGE`
- Custom functions do not persist across page reloads unless re-registered
- For better encapsulation, consider registering handlers in a dedicated service or `ngOnInit` lifecycle hook