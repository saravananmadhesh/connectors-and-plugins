# Data Validation in Spreadsheet Editor (ASP.NET MVC)

Apply rules to restrict or validate the type of data entered into cells (e.g., whole numbers, lists, dates, custom formulas).

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@Html.EJS().Spreadsheet("spreadsheet").AllowDataValidation(true).Created("onCreated").Sheets(sheet =>
    {
        sheet.Name("Orders").Add();
    }).Render()

@section Scripts {
<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // === Example 1: Whole number between 1 and 100 ===
        spreadsheet.addDataValidation(
            {
                type: 'WholeNumber',
                operator: 'Between',
                value1: '1',
                value2: '100',
                ignoreBlank: true,
                inCellDropDown: false
            },
            'B2:B50'
        );

        // === Example 2: List of allowed values ===
        spreadsheet.addDataValidation(
            {
                type: 'List',
                value1: 'Pending,Shipped,Delivered',
                inCellDropDown: true
            },
            'C2:C50'
        );

        // === Example 3: Date after 01-Jan-2024 ===
        spreadsheet.addDataValidation(
            {
                type: 'Date',
                operator: 'GreaterThan',
                value1: '01/01/2024'
            },
            'D2:D50'
        );

        // === Example 4: Custom formula ===
        spreadsheet.addDataValidation(
            {
                type: 'Custom',
                value1: '=AND(ISNUMBER(A2),A2>0)'
            },
            'A2:A50'
        );

        // === Example 5: Remove data validation ===
        spreadsheet.removeDataValidation('B2:B50');

        // === Example 6: Add invalid highlight ===
        spreadsheet.addInvalidHighlight('B2:B50');

        // === Example 7: Remove invalid highlight ===
        spreadsheet.removeInvalidHighlight('B2:B50');
    }
</script>
}
```

## Placeholders
| Placeholder | Description | Example |
|---|---|---|
| [RANGE] | Cell range to validate | 'B2:B100' |
| [CRITERIA] | Validation rule type | 'List', 'Whole', 'Decimal' |
| [VALUE1] | First constraint | 100 or ['A','B','C'] |
| [VALUE2] | Second constraint | 500 |
| [METHOD] | Data validation method | 'addDataValidation', 'removeDataValidation' |
| [HIGHLIGHT_METHOD] | Highlight method | 'addInvalidHighlight', 'removeInvalidHighlight' |

## Notes
- Best Practice: Always provide error messages
- Criteria Types: List, Whole, Decimal, Date, Time, Custom
- Validation: Client-side, doesn't prevent paste
