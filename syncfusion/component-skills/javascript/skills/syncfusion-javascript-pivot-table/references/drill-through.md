# Drill Through in Pivot View

## Overview

Drill through allows users to view the raw, unaggregated data behind any aggregated cell in the pivot table. This feature is essential for detailed data analysis and verification.

## Enabling Drill Through

To enable drill through, set `allowDrillThrough` to `true` and inject the `DrillThrough` module:

```typescript
import { PivotView, IDataSet, DrillThrough } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

PivotView.Inject(DrillThrough);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    allowDrillThrough: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## User Interaction

1. Double-click any aggregated cell in the pivot table
2. A new window opens showing the raw data in a data grid
3. The window displays the row header, column header, and measure name
4. Use the column chooser to include/exclude fields in the data grid
5. View, analyze, or export the detailed data

## Drill Through with Pivot Chart

Drill through also works with pivot charts. Click any data point in the chart to view its underlying raw data:

```typescript
import { PivotView, IDataSet, DrillThrough, PivotChart } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

PivotView.Inject(DrillThrough, PivotChart);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }]
    },
    displayOption: { view: 'Chart' },
    chartSettings: { chartSeries: { type: 'Column' } },
    allowDrillThrough: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## Maximum Rows in Drill Through (OLAP Only)

For OLAP data sources, configure the maximum number of rows returned during drill through operations:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        catalog: 'Adventure Works DW 2008 SE',
        cube: 'Adventure Works',
        providerType: 'SSAS',
        url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
        rows: [
            { name: '[Customer].[Customer Geography]', caption: 'Customer Geography' }
        ],
        columns: [
            { name: '[Product].[Product Categories]', caption: 'Product Categories' },
            { name: '[Measures]', caption: 'Measures' }
        ],
        values: [
            { name: '[Measures].[Customer Count]', caption: 'Customer Count' }
        ]
    },
    allowDrillThrough: true,
    maxRowsInDrillThrough: 10000,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Default:** 10,000 rows

## Common Patterns

### Pattern 1: Drill Through for Data Verification

```typescript
// Enable drill through with pivot chart for data exploration
PivotView.Inject(DrillThrough, PivotChart);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: transactionData as IDataSet[],
        columns: [{ name: 'Quarter' }],
        rows: [{ name: 'Region' }],
        values: [{ name: 'Revenue', type: 'Sum' }]
    },
    displayOption: { view: 'Both', primary: 'Table' },
    chartSettings: { chartSeries: { type: 'Column' } },
    allowDrillThrough: true,
    height: 400
});
```

## Troubleshooting

### Drill Through Not Working

**Issue:** Double-clicking cells doesn't open drill through window.

**Solution:**
- Set `allowDrillThrough: true`
- Inject DrillThrough module: `PivotView.Inject(DrillThrough)`
- Ensure clicking aggregated value cells (not headers)
- For OLAP, verify data source connection is active

### Drill Through Shows Too Many Rows

**Issue:** Drill through window displays excessive rows for OLAP.

**Solution:**
- Set `maxRowsInDrillThrough` to a lower value:
  ```typescript
  maxRowsInDrillThrough: 5000
  ```
- Filter data at source level
- Apply filters in pivot table before drill through
- Consider server-side paging for drill through results
