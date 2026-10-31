# Charts

Insert and delete charts in the Spreadsheet Editor.

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet: Spreadsheet = new Spreadsheet({
  allowChart: true,
  sheets: [{
    ranges: [{
      dataSource: [
        { Month: 'Jan', Sales: 35 },
        { Month: 'Feb', Sales: 40 },
        { Month: 'Mar', Sales: 50 }
      ]
    }]
  }]
});

spreadsheet.appendTo('#spreadsheet');

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
// Select a chart from the active sheet.
// - Pass a chart ID to select a specific chart.
// - Pass no argument to select the chart in the active cell.
// - If the active cell has no chart, the first chart in the active sheet is selected.
spreadsheet.selectChart();
spreadsheet.selectChart('chart1');

// === Deselect Chart ===
// Remove selection from the active chart.
spreadsheet.deselectChart();

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

- **Best Practice**: Include headers in data range (first row = series names)
- **Best Practice**: Place chart on separate sheet for visibility
- **Chart Types**: Column (default), Line, Pie, Doughnut, Area, Scatter, Bubble, Stock
- **Data Format**: Data must be numeric (text labels for categories)
- **Series**: Can have 1 or more series per chart
- **Legends**: Shows series names; can be positioned around chart
- **Styling**: Colors, fonts, borders customizable via Chart Properties
- **Performance**: Large data ranges (100k+ points) render slowly
- **Gotcha**: Pie charts only support single series
- **Gotcha**: Scatter charts require numeric X and Y values (not text)

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

## Notes
- Best Practice: Include headers in data range
- Chart Types: Column, Line, Pie, Area, Scatter
- Data: Must be numeric
- Pie charts: Single series only
- Gotcha: Scatter requires numeric X and Y
