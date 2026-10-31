# Performance Optimization in Pivot View

## Table of Contents
1. [Overview](#overview)
2. [Virtual Scrolling](#virtual-scrolling)
3. [Paging](#paging)
4. [Data Compression](#data-compression)
5. [Defer Layout Update](#defer-layout-update)
6. [Common Patterns](#common-patterns)
7. [Troubleshooting](#troubleshooting)

## Overview

The Pivot View component provides several performance optimization features to handle large datasets efficiently. These features prevent performance degradation and ensure smooth user experience when working with substantial amounts of data.

**Key Optimization Features:**
- **Virtual Scrolling**: Render only visible rows and columns
- **Paging**: Divide data into manageable pages
- **Data Compression**: Optimize data storage and transfer
- **Defer Layout Update**: Batch multiple operations

**Important:** Virtual scrolling and paging cannot be used simultaneously.

## Virtual Scrolling

Virtual scrolling renders only the rows and columns visible in the current viewport, dynamically refreshing content during scrolling. This prevents performance issues with large datasets.

### Enabling Virtual Scrolling

```typescript
import { PivotView, VirtualScroll, IDataSet } from '@syncfusion/ej2-pivotview';

PivotView.Inject(VirtualScroll);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeDataset as IDataSet[],
        enableSorting: false,
        expandAll: true,
        formatSettings: [{ name: 'Price', format: 'C0' }],
        rows: [{ name: 'ProductID' }],
        columns: [{ name: 'Year' }],
        values: [
            { name: 'Price', caption: 'Unit Price' },
            { name: 'Sold', caption: 'Unit Sold' }
        ]
    },
    width: '100%',
    height: 350,
    enableVirtualization: true
});
pivotTableObj.appendTo('#PivotTable');
```

**Requirements:**
- Set `height` and `width` properties (defaults: 300px and 800px)
- Inject `VirtualScroll` module

### Single Page Mode

Optimize performance further by rendering only the current view page:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeDataset as IDataSet[],
        rows: [{ name: 'ProductID' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Price' }]
    },
    width: '100%',
    height: 350,
    enableVirtualization: true,
    virtualScrollSettings: {
        allowSinglePage: true
    }
});
pivotTableObj.appendTo('#PivotTable');
```

**Benefits:**
- Reduced computational load
- Faster initial rendering
- Better performance during drill operations, sorting, filtering

## Paging

Paging divides data into manageable pages, allowing users to navigate through rows and columns page by page.

### Enabling Paging

```typescript
import { PivotView, Pager } from '@syncfusion/ej2-pivotview';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

PivotView.Inject(Pager);

let remoteData: DataManager = new DataManager({
    url: 'https://bi.syncfusion.com/northwindservice/api/orders',
    adaptor: new WebApiAdaptor,
    crossDomain: true
});

let pivotObj: PivotView = new PivotView({
    dataSourceSettings: {
        type: 'JSON',
        dataSource: remoteData,
        expandAll: true,
        columns: [{ name: 'ProductName', caption: 'Product Name' }],
        rows: [
            { name: 'ShipCountry', caption: 'Ship Country' },
            { name: 'ShipCity', caption: 'Ship City' }
        ],
        formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
        values: [
            { name: 'Quantity' },
            { name: 'UnitPrice', caption: 'Unit Price' }
        ]
    },
    width: '100%',
    height: 350,
    enablePaging: true,
    pageSettings: {
        rowPageSize: 10,
        columnPageSize: 5,
        currentColumnPage: 1,
        currentRowPage: 1
    },
    pagerSettings: {
        position: 'Bottom',
        enableCompactView: false,
        showColumnPager: true,
        showRowPager: true,
        columnPageSizes: [5, 10, 20, 50, 100],
        rowPageSizes: [10, 50, 100, 200],
        showColumnPageSize: true,
        showRowPageSize: true
    },
    gridSettings: { columnWidth: 120 }
});
pivotObj.appendTo('#PivotTable');
```

### Page Settings Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `currentRowPage` | number | Current row page number | 1 |
| `currentColumnPage` | number | Current column page number | 1 |
| `rowPageSize` | number | Records per row page | 10 |
| `columnPageSize` | number | Records per column page | 5 |

### Pager Settings Properties

| Property | Type | Description |
|----------|------|-------------|
| `position` | string | Pager position: 'Top' or 'Bottom' |
| `enableCompactView` | boolean | Compact pager display |
| `showColumnPager` | boolean | Show column pager |
| `showRowPager` | boolean | Show row pager |
| `columnPageSizes` | number[] | Available column page sizes |
| `rowPageSizes` | number[] | Available row page sizes |

## Data Compression

Data compression optimizes raw data processing by compressing input data based on uniqueness. When large volumes of raw data contain duplicate records, compression reduces the data footprint, significantly improving pivot table performance during initial rendering and subsequent operations.

### Enabling Data Compression

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeDataset as IDataSet[],
        enableSorting: false,
        expandAll: false,
        rows: [{ name: 'ProductID' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sales', caption: 'Sales Amount' }],
        formatSettings: [{ name: 'Sales', format: 'C0' }]
    },
    allowDataCompression: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Key Points:**
- Use `allowDataCompression: true` as a top-level property
- Only works with relational (local) data sources
- Compresses raw data based on uniqueness of records
- Example: 1 million raw records compressing to 1,000 unique records can reduce render time from 10+ seconds to ~3 seconds

### Limitations with Data Compression

Certain aggregation types are automatically converted when data compression is enabled:

| Original Aggregation | Converted To | Note |
|---------------------|--------------|------|
| Average | Sum | Not supported with compression |
| PopulationStDev | Sum | Standard deviation not supported |
| SampleStDev | Sum | Sample deviation not supported |
| PopulationVar | Sum | Population variance not supported |
| SampleVar | Sum | Sample variance not supported |
| DistinctCount | Count | Functions as regular count |

**Important:** When using calculated fields with data compression, existing field aggregation types are fixed and cannot be changed for calculation purposes.

## Defer Layout Update

Defer layout update allows batching multiple field operations before updating the pivot table, reducing unnecessary renders and improving performance.

### Enabling Defer Update

```typescript
import { PivotView, IDataSet, FieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

PivotView.Inject(FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        allowLabelFilter: true,
        allowValueFilter: true,
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
        formatSettings: [{ name: 'Amount', format: 'C0' }]
    },
    allowDeferLayoutUpdate: true,
    showFieldList: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**How It Works:**
1. User performs multiple operations in Field List
2. Pivot table doesn't update immediately
3. User clicks "Apply" button
4. All changes apply at once

**Benefits:**
- Reduced rendering cycles
- Better performance with complex operations
- Smoother user experience

## Common Patterns

### Pattern 1: Large Dataset with Virtual Scrolling

```typescript
// Optimized configuration for datasets > 10,000 rows
import { PivotView, VirtualScroll } from '@syncfusion/ej2-pivotview';

PivotView.Inject(VirtualScroll);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeDataset as IDataSet[],
        enableSorting: false,
        expandAll: false,
        rows: [{ name: 'ProductID' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sales', type: 'Sum' }]
    },
    width: '100%',
    height: 600,
    enableVirtualization: true,
    virtualScrollSettings: {
        allowSinglePage: true
    },
    gridSettings: {
        columnWidth: 120
    }
});
pivotTableObj.appendTo('#PivotTable');
```

### Pattern 2: Large Local Dataset with Data Compression

```typescript
// Optimal for large local datasets with duplicate records
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeLocalData as IDataSet[],
        expandAll: false,
        enableSorting: false,
        rows: [{ name: 'ProductID' }, { name: 'Region' }],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sales', caption: 'Total Sales' }],
        formatSettings: [{ name: 'Sales', format: 'C0' }]
    },
    allowDataCompression: true,
    width: '100%',
    height: 400
});
pivotTableObj.appendTo('#PivotTable');
```

### Pattern 3: Complex Field Operations with Defer Update

```typescript
// Optimize multiple field manipulations
import { PivotView, FieldList } from '@syncfusion/ej2-pivotview';

PivotView.Inject(FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: complexData as IDataSet[],
        expandAll: false,
        rows: [{ name: 'Category' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sales' }]
    },
    allowDeferLayoutUpdate: true,
    showFieldList: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Pattern 4: Balanced Performance Configuration

```typescript
// General-purpose optimized setup
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        rows: [{ name: 'Product' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sales', type: 'Sum' }]
    },
    width: '100%',
    height: 450,
    enableVirtualization: true,
    allowDeferLayoutUpdate: true,
    showFieldList: true,
    gridSettings: {
        columnWidth: 120,
        rowHeight: 36
    }
});
pivotTableObj.appendTo('#PivotTable');
```

## Performance Best Practices

### Data Source Optimization

1. **Limit Initial Data**: Don't set `expandAll: true` for large datasets
2. **Disable Unnecessary Sorting**: Set `enableSorting: false` if not needed
3. **Filter Early**: Apply filters at data source level
4. **Use Aggregated Data**: Pre-aggregate data when possible

### Component Configuration

1. **Set Explicit Dimensions**: Always define height and width
2. **Disable Unused Features**: Don't inject unused modules
3. **Optimize Format Settings**: Use simple format codes
4. **Limit Drill Members**: Specify only necessary drilled members

### Runtime Optimization

1. **Batch Operations**: Use defer update for multiple changes
2. **Lazy Load**: Load data on demand
3. **Minimize Recalculations**: Avoid frequent dataSourceSettings updates
4. **Use Events Wisely**: Limit expensive operations in event handlers

## Troubleshooting

### Virtual Scrolling Performance Issues

**Issue:** Virtual scrolling is slow or stutters.

**Solution:**
- Enable single page mode: `virtualScrollSettings.allowSinglePage: true`
- Reduce column width for fewer columns in viewport
- Disable sorting if not needed
- Set `expandAll: false`
- Use simpler format patterns

### Paging Not Improving Performance

**Issue:** Paging enabled but performance unchanged.

**Solution:**
- Verify page sizes are reasonable (10-50 rows)
- Check that data is actually paginated at source
- Ensure virtual scrolling is disabled
- Inject Pager module correctly
- Review `pageSettings` configuration

### Defer Update Not Working

**Issue:** Pivot table updates immediately despite defer update enabled.

**Solution:**
- Verify `allowDeferLayoutUpdate: true` is set
- Ensure operations are performed through Field List
- Inject FieldList module
- Check that "Apply" button is visible in Field List
- Operations outside Field List bypass defer update

### Data Compression Not Reducing Load Time

**Issue:** Compression enabled but no performance improvement.

**Solution:**
- Verify `allowDataCompression: true` is set as a top-level property (not in dataSourceSettings)
- Data compression only works with relational (local) data sources—not remote data
- Compression is most effective with datasets containing many duplicate records
- Test with larger datasets (compression benefit scales with data size and uniqueness patterns)
- Check that unsupported aggregation types (Average, PopulationStDev, etc.) are not required
- Ensure data source has sufficient duplicate values to compress effectively

### Memory Issues with Large Datasets

**Issue:** Browser crashes or freezes with large data.

**Solution:**
- Use virtual scrolling with single page mode
- Enable paging instead of virtual scrolling
- Reduce `expandAll` to false
- Apply filters to limit data
- Consider server-side pivot engine for very large datasets
- Increase page size limits cautiously
