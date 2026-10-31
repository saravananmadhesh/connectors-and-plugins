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

@Html.EJS().Spreadsheet("spreadsheet").Created("onCreated").Sheets(sheet =>
    {
        sheet.Name("Secure Data")
            .IsProtected(true)
            .Password("MyPassword123")
            .ProtectSettings(protectSettings)
            .Rows(rows =>
            {
                rows.Cells(cells =>
                {
                    cells.Value("Admin Name").IsLocked(false).Add();
                    cells.Value("John").Add();
                }).Add();

                rows.Cells(cells =>
                {
                    cells.Value("Salary").IsLocked(true).Add();
                    cells.Value("50000").Add();
                }).Add();
            }).Add();
    }).Render()

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

@Html.EJS().Spreadsheet("spreadsheet")
    .Created("onCreated")
    .Sheets(sheet =>
    {
        sheet.Name("Budget")
            .Rows(rows =>
            {
                rows.Cells(cells =>
                {
                    cells.Value("Department").Add();
                    cells.Value("Budget").Add();
                    cells.Value("Actual").Add();
                }).Add();

                rows.Cells(cells =>
                {
                    cells.Value("Sales").Add();
                    cells.Value("50000").Add();
                    cells.Value("0").Add();
                }).Add();

                rows.Cells(cells =>
                {
                    cells.Value("IT").Add();
                    cells.Value("30000").Add();
                    cells.Value("0").Add();
                }).Add();
            })
            .Add();
    })
    .Render()

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

