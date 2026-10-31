# Charts

Insert and delete charts in the Spreadsheet Editor.

## Minimal Code

```vue
<template>
  <div class="control-section">
    <div id="spreadsheet-chart-section">
      <ejs-spreadsheet ref="spreadsheet" :created="created" :allowChart="true">
        <e-sheets>
          <e-sheet :name="Sheet1">
            <e-ranges>
              <e-range :dataSource="dataSource"></e-range>
            </e-ranges>
          </e-sheet>
        </e-sheets>
      </ejs-spreadsheet>
    </div>
  </div>
</template>

<script>
import {
  SpreadsheetComponent,
  SheetDirective,
  SheetsDirective,
  RangesDirective,
  RangeDirective,
} from '@syncfusion/ej2-vue-spreadsheet';

export default {
  components: {
    'ejs-spreadsheet': SpreadsheetComponent,
    'e-sheet': SheetDirective,
    'e-sheets': SheetsDirective,
    'e-ranges': RangesDirective,
    'e-range': RangeDirective,
  },

  data() {
    return {
      dataSource: [
        { Month: 'Jan', Sales: 35 },
        { Month: 'Feb', Sales: 40 },
        { Month: 'Mar', Sales: 50 },
      ],
    };
  },

  methods: {
    created: function () {
      const spreadsheet = this.$refs.spreadsheet;
      // === Insert Chart ===
      spreadsheet.insertChart([
        {
          type: 'Column',
          range: 'A1:B3',
          id: 'chart1',
          theme: 'Material',
          isSeriesInRows: false,
        },
      ]);
      // === Select Chart ===
      spreadsheet.selectChart(); // select active cell chart
      spreadsheet.selectChart('chart1'); // select chart by ID

      // === Deselect Chart ===
      spreadsheet.deselectChart();

      // === Delete Chart ===
      // spreadsheet.deleteChart("chart1");
    },
  },
};
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

- **Best Practice**: Include headers in data range (first row = series names)
- **Best Practice**: Place chart on separate sheet for visibility
- **Chart Types**: Column (default), Line, Pie, Doughnut, Area, Scatter, Bubble, Stock
- **Data Format**: Data must be numeric (text labels for categories)
- **Series**: Can have 1 or more series per chart
- **Legends**: Shows series names; can be positioned around chart
- **Styling**: Colors, fonts, borders customizable via Chart Properties
- **Performance**: Large data ranges (100k+ points) render slowly


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
