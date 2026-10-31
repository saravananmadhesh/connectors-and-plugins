## Formula Bar

The **Formula Bar** simplifies editing or entering cell data. Formula bar toggled by `ShowFormulaBar` (default true).

### PROPERTY
```csharp
ShowFormulaBar="true(Default)/false"
CalculationMode="Automatic(Default)/Manual"
ShowAggregate="true(Default)/false"
```

### BUTTON
<!-- Refer the below button for creating button and update the API public method calling. -->
<button @onclick="#MethodName">#Button Name</button>

### API METHODS
```csharp
// Triggers recalculation of formulas.
// Overloads: CalculateAsync(), CalculateAsync(string sheetName), CalculateAsync(int sheetIndex)
await SpreadsheetRef.CalculateAsync(); // Recalculate entire workbook
await SpreadsheetRef.CalculateAsync(SHEETNAME); // Recalculate Sheet1
await SpreadsheetRef.CalculateAsync(SHEETINDEX); // Recalculate sheet at index 0

// Adds or removes named ranges (defined names) in the workbook.
await SpreadsheetRef.AddDefinedNameAsync(NAME, RANGE, SCOPE)
await SpreadsheetRef.RemoveDefinedNameAsync(NAME)
```
### API Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `#MethodName` | Name of the method calling when clicking the button | - |
| `#Button Name` | Provide a meaning full name to button which binds to API method | - |
| `SHEETNAME` | The name of the worksheet to recalculate (case-insensitive) | "Sheet1" |
| `SHEETINDEX` | Zero-based index of the worksheet to recalculate | 0 |
| `RANGE` | A1-style range or sheet-qualified range to target; omit to use current selection | "Sheet1!A1:A10" |
| `NAME` | Defined name (named range) to create or remove; follow naming rules (alphanumeric, underscores) | "CompanyName" |
| `SCOPE` | Optional scope for the defined name (`Workbook` or sheet name); omit for workbook scope | "Sheet1" |



### Notes
- **ShowFormulaBar** is enabled by default; include `ShowFormulaBar="false"` only when you want to **hide** formula bar for the spreadsheet.
- There is no events and api method available for formula bar.
- **ShowAggregate**: default `true`; set `ShowAggregate="false"` to hide footer aggregate values (sum, average, count) and disable related UI.
- **CalculationMode**: default "Automatic". Set `CalculationMode="Manual"` to require explicit recalculation (Formulas → "Calculate Sheet"/"Calculate Workbook" or via API).
- **Important:** API methods should **NOT** be called inside `OnInitialized` or `OnParametersSet` lifecycle methods. Even if you call them, they will not work properly. Call API methods in response to user interactions (like button clicks) or in other appropriate lifecycle methods after the component is fully rendered.
---

### Calculation Mode

**Automatic Mode** - Formulas recalculate instantly when any dependent cell changes.
- Access via the **Formulas** tab in the Ribbon toolbar.
- Select **Calculation Options** → **Automatic**.

**Manual Mode** - Formulas recalculate only when explicitly triggered.
- **Calculate Sheet:** Recalculates formulas for the active sheet only.
- **Calculate Workbook:** Recalculates formulas across all sheets in the workbook.
- Access via the **Formulas** tab in the Ribbon toolbar.

### Named Ranges

**Create Named Range:**
- Select the desired range of cells and enter a name in the **Name Box**.
- Or, select the range and click the **Name Manager** button in the **Formulas** tab.

**Edit Named Range:**
- Open the **Name Manager** dialog.
- Select the Named Range and click the **Edit** icon.
- Modify the name, range, or scope as needed.
- Click **Update Range** → **OK** to save.

**Delete Named Range:**
- Open the **Name Manager** dialog.
- Select the Named Range and click the **Delete** icon.
- Click **OK** to confirm.

### Aggregates

Aggregates are instant statistical summaries of selected cell ranges displayed in the footer. Controlled by `ShowAggregate` property (default true).

*   **Sum** - Total of the selected numeric values
*   **Average** - Mean of the selected numeric values
*   **Count** - Number of cells containing values
*   **Min** - Minimum value in the selected range
*   **Max** - Maximum value in the selected range

### Limitations

- Deleting a Named Range used in formulas may cause formula errors.
- Named Ranges can be defined only for cells or ranges that contain values.

---

### Documentation link
[Blazor Spreadsheet Formulas](https://help.syncfusion.com/document-processing/excel/spreadsheet/blazor/formulas)

