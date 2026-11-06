# Sheet Protection & Cell Locking

Protect sheets, lock/unlock cells, restrict edits, and control user permissions in the Spreadsheet Editor.

## Minimal Vue Code

```vue
<template>
<div class="control-section">
<button class='e-btn' @click="applyProtection">Apply Unprotection</button>
  <ejs-spreadsheet ref="spreadsheet">
    <e-sheets>
      <e-sheet
        name="Secure Data"
        :isProtected="true"
        password="MyPassword123"
        :protectSettings="protectSettings"
      >
        <e-rows>
          <e-row>
            <e-cells>
              <e-cell value="Admin Name" :isLocked="false" />
              <e-cell value="John" />
            </e-cells>
          </e-row>

          <e-row>
            <e-cells>
              <e-cell value="Salary" :isLocked="true" />
              <e-cell value="50000" />
            </e-cells>
          </e-row>
        </e-rows>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</div>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective,
RowsDirective,
RowDirective,
CellsDirective,
CellDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective,
  "e-rows": RowsDirective,
  "e-row": RowDirective,
  "e-cells": CellsDirective,
  "e-cell": CellDirective
},

data: () => ({
  protectSettings: {
    selectCells: true,
    formatCells: false,
    formatRows: false,
    formatColumns: false,
    insertLink: false
  }
}),

methods: {
  applyProtection() {
    const spreadsheet = this.$refs.spreadsheet;

    // === Protect Sheet (by name) ===
    spreadsheet.protectSheet(
      "Secure Data",
      this.protectSettings,
      "MyPassword123"
    );

    // === Protect sheet by index ===
    spreadsheet.protectSheet(0, this.protectSettings, "MyPassword123");

    // === Protect without password ===
    spreadsheet.protectSheet("Secure Data", this.protectSettings);

    // === Unprotect sheet (name or index) ===
    spreadsheet.unprotectSheet("Secure Data");
    spreadsheet.unprotectSheet(0);

    // === Lock & Unlock specific cells ===
    spreadsheet.lockCells("B2:B10", true);   // Lock Salary column
    spreadsheet.lockCells("A2:A10", false);  // Unlock Name column

    // === Check protection state ===
    console.log("Sheet Protected:", spreadsheet.ej2Instances.getActiveSheet().isProtected);
  }
}
};
</script>

```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[PASSWORD]` | Protection password | `'MyPassword123'`, `'Secure@2024'` |
| `[CELL_RANGE]` | Cells to lock/unlock | `'B2:B10'`, `'A1:D5'` |
| `[EDIT_RANGES]` | Ranges users can edit | `['A2:A10', 'C2:C10']` |

## Protection Options Reference (`ProtectSettingsModel`)

```vue
{
  selectCells: boolean,    // Allow users to select cells (default: false)
  formatCells: boolean,    // Allow cell formatting changes (default: false)
  formatRows: boolean,     // Allow row height changes (default: false)
  formatColumns: boolean,  // Allow column width changes (default: false)
  insertLink: boolean      // Allow inserting hyperlinks (default: false)
}
```

> **Note**: `insertRows`, `insertColumns`, `deleteRows`, `deleteColumns`, `allowEditRanges` are **not** valid `ProtectSettingsModel` fields. Use `lockCells()` to allow specific ranges to remain editable.

## Cell Locking

### Lock Cells (use `lockCells`, not `cellFormat`)
```vue
// Lock a range
spreadsheet.lockCells('[CELL_RANGE]', true);

// Unlock a range
spreadsheet.lockCells('[CELL_RANGE]', false);
```

**Important**: Cell lock state only takes effect when the sheet is protected. All cells are locked by default.

## Sheet Protection

### Protect Sheet
```vue
// Signature: protectSheet(sheet?, protectSettings?, password?)
spreadsheet.protectSheet(
  '[SHEET_NAME_OR_INDEX]',  // Sheet name (string) or index (number)
  {
    selectCells: true,
    formatCells: false,
    formatRows: false,
    formatColumns: false,
    insertLink: false
  },
  '[PASSWORD]'              // Optional — omit if no password
);
```

### Unprotect Sheet
```vue
// Signature: unprotectSheet(sheet?)
spreadsheet.unprotectSheet('[SHEET_NAME_OR_INDEX]');
```

### Check Protection State
```vue
const isActiveSheetProtected = spreadsheet.ej2Instances.getActiveSheet().isProtected;
```

## Notes

- **Best Practice**: Set cell lock states BEFORE protecting the sheet
- **Best Practice**: Use `allowEditRanges` to mark cells users can modify in a protected sheet
- **Best Practice**: Passwords are case-sensitive; store securely (never hardcode in production)
- **Best Practice**: Always set `selectCells: true` to allow users to at least view data
- **Security**: Passwords are not encrypted by default in Syncfusion; use HTTPS in production
- **Compliance**: Some orgs require audit logs for unprotect actions; implement separately if needed

## Example: Protect Budget Sheet (Admin values only)

```vue
<template>
<div class="control-section">
  <ejs-spreadsheet ref="spreadsheet" :allowEditing="true" :created="onCreated">
    <e-sheets>
      <e-sheet name="Budget">
        <e-rows>
          <e-row>
            <e-cells>
              <e-cell value="Department" />
              <e-cell value="Budget" />
              <e-cell value="Actual" />
            </e-cells>
          </e-row>

          <e-row>
            <e-cells>
              <e-cell value="Sales" />
              <e-cell value="50000" />
              <e-cell value="0" />
            </e-cells>
          </e-row>

          <e-row>
            <e-cells>
              <e-cell value="IT" />
              <e-cell value="30000" />
              <e-cell value="0" />
            </e-cells>
          </e-row>
        </e-rows>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</div>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective,
RowsDirective,
RowDirective,
CellsDirective,
CellDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective,
  "e-rows": RowsDirective,
  "e-row": RowDirective,
  "e-cells": CellsDirective,
  "e-cell": CellDirective
},

methods: {
  onCreated() {
    const spreadsheet = this.$refs.spreadsheet;
    // === Lock Budget column ===
    spreadsheet.lockCells("B2:B10", true);
    // === Unlock Actual column ===
    spreadsheet.lockCells("C2:C10", false);
    // === Protect sheet with permissions ===
    spreadsheet.protectSheet("Budget", {
      selectCells: true,
      formatCells: false,
      formatRows: false,
      formatColumns: false,
      insertLink: false
    }, "BudgetProtect2024");
  }
}
};
</script>
```

