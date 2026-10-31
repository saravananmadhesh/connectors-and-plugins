# Clipboard Operations

Copy, cut, and paste cells with values, formatting, and formulas in the Syncfusion Angular Spreadsheet.

---

## Table of Contents

- [Minimal Angular Code](#minimal-angular-code)
- [API Reference](#api-reference)
- [Paste Types](#paste-types)
- [Clipboard Operations](#clipboard-operations)
  - [Copy](#copy)
  - [Cut](#cut)
  - [Paste](#paste)
- [Common Patterns](#common-patterns)
  - [Copy and Paste Values Only](#copy-and-paste-values-only)
  - [Cut and Move Cells](#cut-and-move-cells)
  - [Paste Formatting Only](#paste-formatting-only)
- [Template Button Binding Example](#template-button-binding-example)
- [Placeholders](#placeholders)
- [Notes](#notes)

---

## Minimal Angular Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet
    #spreadsheet
    (created)="created()">
    <e-sheets>
      <e-sheet>
        <e-ranges>
          <e-range [dataSource]="data"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  public data: object[] = [
    { Item: 'Pen',   Price: 10, Qty: 5 },
    { Item: 'Book',  Price: 25, Qty: 3 },
    { Item: 'Ruler', Price: 15, Qty: 8 }
  ];

  created(): void {
    // Copy range A1:C4 and paste values only to E1
    this.spreadsheet.copy('A1:C4').then(() => {
      this.spreadsheet.paste('E1', 'Values');
    });
  }
}
```

---

## API Reference

| Method | Signature | Returns |
|---|---|---|
| `copy` | `copy(address?: string)` | `Promise<Object>` |
| `cut` | `cut(address?: string)` | `Promise<Object>` |
| `paste` | `paste(address?: string, type?: PasteSpecialType)` | `void` |

---

## Paste Types

| Type | Description |
|---|---|
| `'All'` | Values + formatting (default) |
| `'Values'` | Cell values only; formulas become static values |
| `'Formats'` | Formatting only; data unchanged |

---

## Clipboard Operations

### Copy
```typescript
// Copy selected range
created(): void {
  this.spreadsheet.copy();
}

// Copy specific range
created(): void {
  this.spreadsheet.copy('A1:B2');
}
```

### Cut
```typescript
// Cut selected range
created(): void {
  this.spreadsheet.cut();
}

// Cut specific range
created(): void {
  this.spreadsheet.cut('A1:B2');
}
```

### Paste
```typescript
// Paste All to active cell (default)
created(): void {
  this.spreadsheet.paste();
}

// Paste All to specific cell
created(): void {
  this.spreadsheet.paste('D1');
}

// Paste values only
created(): void {
  this.spreadsheet.paste('D1', 'Values');
}

// Paste formatting only
created(): void {
  this.spreadsheet.paste('D1', 'Formats');
}
```

---

## Common Patterns

### Copy and Paste Values Only
```typescript
created(): void {
  this.spreadsheet.copy('A1:D10').then(() => {
    this.spreadsheet.paste('F1', 'Values');
  });
}
```

### Cut and Move Cells
```typescript
created(): void {
  this.spreadsheet.cut('A1:C5').then(() => {
    this.spreadsheet.paste('G1'); // Source cells cleared after paste
  });
}
```

### Paste Formatting Only
```typescript
created(): void {
  this.spreadsheet.copy('A1:D1').then(() => {
    this.spreadsheet.paste('A2', 'Formats'); // Data in A2 unchanged; formatting applied
  });
}
```

---

## Template Button Binding Example

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
    <ejs-spreadsheet
    #spreadsheet
    (created)="created()">
    <e-sheets>
      <e-sheet>
        <e-ranges>
          <e-range [dataSource]="data"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>

  <button (click)="copyRange()">Copy</button>
  <button (click)="cutRange()">Cut</button>
  <button (click)="pasteValues()">Paste Values</button>
  <button (click)="pasteFormats()">Paste Formats</button>
  <button (click)="pasteAll()">Paste All</button>
  `
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  public data: object[] = [
    { Item: 'Pen',   Price: 10, Qty: 5 },
    { Item: 'Book',  Price: 25, Qty: 3 },
    { Item: 'Ruler', Price: 15, Qty: 8 }
  ];

  created(): void {
    // Initialization logic if needed
  }

  copyRange(): void {
    this.spreadsheet.copy('A1:C4');
  }

  cutRange(): void {
    this.spreadsheet.cut('A1:C4');
  }

  pasteValues(): void {
    this.spreadsheet.paste('E1', 'Values');
  }

  pasteFormats(): void {
    this.spreadsheet.paste('E1', 'Formats');
  }

  pasteAll(): void {
    this.spreadsheet.paste('E1', 'All');
  }
}
```

---

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[SOURCE_RANGE]` | Cell or range to copy/cut | `'A1'`, `'A1:D10'`, `'Sheet1!B2'` |
| `[DEST_CELL]` | Paste destination cell | `'D1'`, `'E5'`, `'Sheet2!A1'` |
| `[PASTE_TYPE]` | Type of paste operation | `'All'`, `'Values'`, `'Formats'` |

---

## Notes

- Always access `SpreadsheetComponent` via `@ViewChild` — never use `new Spreadsheet()` in Angular.
- `copy()` and `cut()` return a **Promise** — always chain `paste()` inside `.then()` to ensure correct execution order.
- All clipboard operations placed inside `created()` must use `.then()` chaining for `copy()`/`cut()` before calling `paste()`.
- Use `#spreadsheet` template reference variable on `<ejs-spreadsheet>` to match `@ViewChild('spreadsheet')`.
- `cut()` + `paste()` clears source cells after paste; use `copy()` to preserve the original data.
- **Relative formula references** update automatically on paste; **absolute references** (`$A$1`) remain fixed.
- Keyboard shortcuts still work in Angular: `Ctrl+C` copy, `Ctrl+X` cut, `Ctrl+V` paste, `Esc` cancel clipboard mode.
- Import `SpreadsheetAllModule` in the `imports` array of the standalone component.