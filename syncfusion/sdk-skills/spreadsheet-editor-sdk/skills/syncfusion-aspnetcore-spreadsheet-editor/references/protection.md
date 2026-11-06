# Sheet Protection & Cell Locking

Protect sheets, lock/unlock cells, restrict edits, and control user permissions in the Spreadsheet Editor.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@{
    // Protect settings object
    var protectSettings = new SpreadsheetProtectSettings
    {
        SelectCells = true,
        FormatCells = false,
        FormatRows = false,
        FormatColumns = false,
        InsertLink = false
    };
}

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" created="onCreated">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Secure Data"
                                     isProtected="true"
                                     password="MyPassword123"
                                     protectSettings="protectSettings">
                    <e-spreadsheet-rows>
                        <e-spreadsheet-row>
                            <e-spreadsheet-cells>
                                <e-spreadsheet-cell value="Admin Name" isLocked="false"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="John"></e-spreadsheet-cell>
                            </e-spreadsheet-cells>
                        </e-spreadsheet-row>
                        <e-spreadsheet-row>
                            <e-spreadsheet-cells>
                                <e-spreadsheet-cell value="Salary" isLocked="true"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="50000"></e-spreadsheet-cell>
                            </e-spreadsheet-cells>
                        </e-spreadsheet-row>
                    </e-spreadsheet-rows>
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // === Protect Sheet — sheet name/index is FIRST parameter ===
        var protectSettings = {
            selectCells: true,
            formatCells: false,
            formatRows: false,
            formatColumns: false,
            insertLink: false
        };

        spreadsheet.protectSheet('Secure Data', protectSettings, 'MyPassword123');
        spreadsheet.protectSheet(0, protectSettings, 'MyPassword123');
        spreadsheet.protectSheet('Secure Data', protectSettings);

        // === Unprotect Sheet — sheet name/index, with optional password ===
        spreadsheet.unprotectSheet('Secure Data');
        spreadsheet.unprotectSheet(0);

        // === Lock/Unlock Cells ===
        spreadsheet.lockCells('B2:B10', true);   // Lock salary column
        spreadsheet.lockCells('A2:A10', false);  // Unlock name column

        // === Check if Active Sheet is Protected ===
        var isProtected = spreadsheet.getActiveSheet().isProtected;
        console.log('Sheet Protected:', isProtected);
    }
</script>

```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[PASSWORD]` | Protection password | `'MyPassword123'`, `'Secure@2024'` |
| `[CELL_RANGE]` | Cells to lock/unlock | `'B2:B10'`, `'A1:D5'` |
| `[EDIT_RANGES]` | Ranges users can edit | `['A2:A10', 'C2:C10']` |

## Protection Options Reference (`ProtectSettingsModel`)

```cshtml
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
```cshtml
// Lock a range
spreadsheet.lockCells('[CELL_RANGE]', true);

// Unlock a range
spreadsheet.lockCells('[CELL_RANGE]', false);
```

**Important**: Cell lock state only takes effect when the sheet is protected. All cells are locked by default.

## Sheet Protection

### Protect Sheet
```cshtml
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
```cshtml
// Signature: unprotectSheet(sheet?)
spreadsheet.unprotectSheet('[SHEET_NAME_OR_INDEX]');
```

### Check Protection State
```cshtml
@using Syncfusion.EJ2.Spreadsheet

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" created="onCreated">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Budget">
                    <e-spreadsheet-rows>
                        <e-spreadsheet-row>
                            <e-spreadsheet-cells>
                                <e-spreadsheet-cell value="Department"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="Budget"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="Actual"></e-spreadsheet-cell>
                            </e-spreadsheet-cells>
                        </e-spreadsheet-row>
                        <e-spreadsheet-row>
                            <e-spreadsheet-cells>
                                <e-spreadsheet-cell value="Sales"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="50000"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="0"></e-spreadsheet-cell>
                            </e-spreadsheet-cells>
                        </e-spreadsheet-row>
                        <e-spreadsheet-row>
                            <e-spreadsheet-cells>
                                <e-spreadsheet-cell value="IT"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="30000"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="0"></e-spreadsheet-cell>
                            </e-spreadsheet-cells>
                        </e-spreadsheet-row>
                    </e-spreadsheet-rows>
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // Lock budget column, unlock actual column for edits
        spreadsheet.lockCells('B2:B10', true);
        spreadsheet.lockCells('C2:C10', false);

        // Protect with password
        spreadsheet.protectSheet('Budget', {
            SelectCells: true,
            FormatCells: false,
            FormatRows: false,
            FormatColumns: false,
            InsertLink: false
        }, 'BudgetProtect2024');
    }
</script>

```

