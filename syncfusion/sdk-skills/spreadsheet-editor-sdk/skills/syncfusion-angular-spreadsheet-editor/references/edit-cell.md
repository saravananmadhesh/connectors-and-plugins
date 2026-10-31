# Cell Editing

Edit cell values, start/end edit mode, and update cells programmatically in the Spreadsheet component in Angular.

## Table of Contents

- [Minimal Code](#minimal-code)
- [API Methods](#api-methods)
  - [startEdit()](#startedit)
  - [endEdit()](#endedit)
  - [closeEdit()](#closeedit)
  - [updateCell()](#updatecell)
  - [getActiveCell()](#getactivecell)
- [Usage Examples](#usage-examples)
  - [Update Cell Value](#update-cell-value)
  - [Update Cell with Formula](#update-cell-with-formula)
  - [Start and End Edit Mode](#start-and-end-edit-mode)
  - [Discard Edit Changes](#discard-edit-changes)
  - [Get Active Cell and Update](#get-active-cell-and-update)
  - [Bulk Cell Update](#bulk-cell-update)
- [Placeholders](#placeholders)
- [Notes](#notes)

---

## Minimal Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
    <button (click)="onStartEdit()">Start Edit</button>
    <button (click)="onEndEdit()">End Edit</button>
    <button (click)="onUpdateCell()">Update Cell</button>

    <ejs-spreadsheet #spreadsheet (created)="onCreated()">
      <e-sheets>
        <e-sheet name="Data">
          <e-rows>
            <e-row>
              <e-cells>
                <e-cell value="Name"></e-cell>
                <e-cell value="Price"></e-cell>
              </e-cells>
            </e-row>
            <e-row>
              <e-cells>
                <e-cell value="Widget"></e-cell>
                <e-cell [value]="100"></e-cell>
              </e-cells>
            </e-row>
          </e-rows>
        </e-sheet>
      </e-sheets>
    </ejs-spreadsheet>
  `
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  onCreated(): void {
    // Update cell value directly
    this.spreadsheet.updateCell({ value: 'Widget A' }, 'A2');
    this.spreadsheet.updateCell({ value: '150' }, 'B2');

    // Update cell with formula
    this.spreadsheet.updateCell({ value: '=SUM(B2:B10)' }, 'B11');
  }

  onStartEdit(): void {
    this.spreadsheet.startEdit();
  }

  onEndEdit(): void {
    this.spreadsheet.endEdit();
  }

  onUpdateCell(): void {
    this.spreadsheet.updateCell({ value: 'New Value' }, 'A2');
  }
}
```

---

## API Methods

### `startEdit()`

Activates edit mode on the current active cell, allowing user text input.

```typescript
this.spreadsheet.startEdit();
```

---

### `endEdit()`

Closes edit mode, validates input, and applies changes to the cell.

```typescript
this.spreadsheet.endEdit();
```

---

### `closeEdit()`

Closes the currently active edit cell **without** applying changes.

```typescript
this.spreadsheet.closeEdit();
```

---

### `updateCell()`

Directly updates a cell value without entering edit mode.

```typescript
this.spreadsheet.updateCell(
  { value: '[VALUE]' },   // Cell value, number, or formula
  '[RANGE]'               // Target cell address e.g. 'A1'
);
```

---

### `getActiveCell()`

Returns the address of the currently selected cell (e.g., `'A1'`).

```typescript
const activeCell = this.spreadsheet.getActiveCell();
console.log('Active Cell:', activeCell);
```

---

## Usage Examples

### Update Cell Value

```typescript

// Update with string value
this.spreadsheet.updateCell({ value: '[TEXT_VALUE]' }, '[RANGE]');

// Update with number value
this.spreadsheet.updateCell({ value: [NUMBER_VALUE] }, '[RANGE]');
```

---

### Update Cell with Formula

```typescript

// Sum formula
this.spreadsheet.updateCell({ value: '=SUM([RANGE])' }, '[TARGET_CELL]');

// Average formula
this.spreadsheet.updateCell({ value: '=AVERAGE([RANGE])' }, '[TARGET_CELL]');

// Custom formula
this.spreadsheet.updateCell({ value: '=[FORMULA]' }, '[TARGET_CELL]');
```

---

### Start and End Edit Mode

```typescript

// Always end edit before programmatic cell changes
endAndUpdate(): void {
  this.spreadsheet.endEdit();
  this.spreadsheet.updateCell({ value: '[VALUE]' }, '[RANGE]');
}

// Activate edit on active cell for user interaction
activateEdit(): void {
  this.spreadsheet.startEdit();
}
```

---

### Discard Edit Changes

```typescript

// Discard any in-progress edits
discardEdit(): void {
  this.spreadsheet.closeEdit();   // Changes are NOT saved
}
```

---

### Get Active Cell and Update

```typescript

updateActiveCell(newValue: string): void {
  const activeCell = this.spreadsheet.getActiveCell();
  console.log('Updating cell:', activeCell);

  this.spreadsheet.updateCell({ value: newValue }, activeCell);
}
```

---

### Bulk Cell Update

```typescript

bulkUpdate(): void {
  // End any active edit first
  this.spreadsheet.endEdit();

  const updates: Array<{ value: any; cell: string }> = [
    { value: '[VALUE_1]', cell: '[CELL_1]' },
    { value: '[VALUE_2]', cell: '[CELL_2]' },
    { value: '[VALUE_3]', cell: '[CELL_3]' }
  ];

  updates.forEach(item => {
    this.spreadsheet.updateCell({ value: item.value }, item.cell);
  });
}
```

---

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[VALUE]` | Cell value (string, number, or formula) | `'Text'`, `100`, `'=SUM(A1:A5)'` |
| `[TEXT_VALUE]` | String value for a cell | `'Product Name'`, `'Active'` |
| `[NUMBER_VALUE]` | Numeric value for a cell | `100`, `3.14`, `0` |
| `[FORMULA]` | Formula expression (without `=`) | `'SUM(B2:B10)'`, `'AVERAGE(C1:C5)'` |
| `[RANGE]` | Target cell address or range | `'A1'`, `'B2'`, `'A2:A5'` |
| `[TARGET_CELL]` | Cell where formula result is placed | `'B11'`, `'D5'` |
| `[CELL_1]` ... | Individual cell addresses for bulk update | `'A1'`, `'B2'`, `'C3'` |
| `[VALUE_1]` ... | Individual values for bulk update | `'Alpha'`, `200`, `'=A1+B1'` |

---

## Notes

- **Use `@ViewChild`** — Access the `SpreadsheetComponent` instance via `@ViewChild` to call cell editing methods
- **Best Practice** — Use `updateCell()` for direct value changes; use `startEdit()` for user-interactive editing
- **Best Practice** — Always call `endEdit()` before programmatically changing cells to avoid data conflicts
- **Gotcha** — Formulas must start with `=`; missing `=` treats the value as plain text
- **Gotcha** — Edit mode changes don't apply until `endEdit()` is called or the user confirms with Enter
- **Gotcha** — `closeEdit()` discards changes; use `endEdit()` to save