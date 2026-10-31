# Charts

Insert and delete charts in the Spreadsheet Editor.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@{
    var dataSource = new[] {
        new { Month = "Jan", Sales = 35 },
        new { Month = "Feb", Sales = 40 },
        new { Month = "Mar", Sales = 50 }
    };
}

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" allowChart="true" created="onCreated">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1">
                    <e-spreadsheet-ranges>
                        <e-spreadsheet-range dataSource="dataSource"></e-spreadsheet-range>
                    </e-spreadsheet-ranges>
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // === Insert Chart ===
        spreadsheet.insertChart([{
            type: 'Column',       // Chart type: "Column" | "Line" | "Pie" | "Bar" | "Area" | "Doughnut"
            range: 'A1:B4',       // Data range
            id: 'chart1',         // Unique chart ID
            theme: 'Material',    // Optional theme
            isSeriesInRows: false // Series orientation
        }]);

        // === Delete Chart ===
        spreadsheet.deleteChart('chart1');

        // === Select Chart ===
        spreadsheet.selectChart();
        spreadsheet.selectChart('chart1');

        // === Deselect Chart ===
        spreadsheet.deselectChart();
    }
</script>
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[CHART_TYPE]` | Chart type | `'Column'`, `'Line'`, `'Pie'`, `'Area'`, `'Scatter'` |
| `[DATA_RANGE]` | Data source for chart | `'A1:D20'` |
| `[SERIES_NAME]` | Series name field | `'B1'` (header cell) |
| `[CATEGORY_FIELD]` | Category/X-axis field | `'A:A'` (column) |
| `[VALUE_FIELD]` | Value/Y-axis field | `'B:B'` (column) |
| `[CHART_TITLE]` | Chart title | `'Sales by Quarter'` |
| `[LEGEND_POSITION]` | Legend placement | `'Top'`, `'Bottom'`, `'Left'`, `'Right'` |

## Notes

- Include headers in data range (first row = series names)
- **Chart Types**: Column (default), Line, Pie, Doughnut, Area, Scatter, Bubble, Stock
- **Data Format**: Data must be numeric (text labels for categories)
- **Legends**: Shows series names; can be positioned around chart
- Pie charts only support single series
- Scatter charts require numeric X and Y values (not text)

## Placeholders
| Placeholder | Description | Example |
|---|---|---|
| [CHART_TYPE] | Chart type | 'Column', 'Line', 'Pie' |
| [DATA_RANGE] | Data source | 'A1:D20' |
| [SERIES_NAME] | Series field | 'B1' |
| [CATEGORY_FIELD] | Category field | 'A:A' |
| [VALUE_FIELD] | Value field | 'B:B' |
| [CHART_TITLE] | Chart title | 'Sales by Quarter' |
| [LEGEND_POSITION] | Legend placement | 'Top', 'Bottom' |

