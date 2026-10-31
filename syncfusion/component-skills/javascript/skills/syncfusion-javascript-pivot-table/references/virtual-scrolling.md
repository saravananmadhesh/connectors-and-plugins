# Virtual Scrolling in Pivot View

## Overview

Virtual scrolling is a performance optimization technique that renders only the rows and columns currently visible in the viewport, rather than the entire dataset. As users scroll, the rendered content is dynamically updated. This dramatically improves performance and memory usage when working with large datasets, enabling smooth interaction even with millions of records.

## When to Use

Use virtual scrolling when you need to:
- Display very large datasets (thousands to millions of rows/columns)
- Minimize initial load time for complex pivot reports
- Reduce memory consumption on client-side
- Maintain smooth scrolling experience with minimal latency
- Process data without a server component
- Render dynamic hierarchical data efficiently

**Note:** Virtual scrolling and paging are mutually exclusive. Use only one feature at a time.

## Basic Setup

Enable virtual scrolling by setting `enableVirtualization` to `true` and injecting the `VirtualScroll` module:

```typescript
import { PivotView, VirtualScroll, IDataSet } from '@syncfusion/ej2-pivotview';

let data: Function = (count: number) => {
    let result: Object[] = [];
    let dt: number = 0;
    for (let i: number = 1; i < (count + 1); i++) {
        dt++;
        let round: string = i.toString().padStart(5, '0');
        result.push({
            ProductID: 'PRO-' + round,
            Year: "FY " + (dt + 2013),
            Price: Math.round(Math.random() * 5000) + 5000,
            Sold: Math.round(Math.random() * 80) + 10,
        });
        if (dt / 4 == 1) {
            dt = 0;
        }
    }
    return result;
};

PivotView.Inject(VirtualScroll);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: data(1000) as IDataSet[],
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

**Important Requirements:**
- `height` property is required - defaults to 300px if not specified
- `width` property is required - defaults to 800px if not specified
- Both properties should be set in pixels or percentage

## Virtual Scrolling with Single Page Mode

By default, virtual scrolling renders the current viewport plus adjacent pages (previous and next) for smooth scrolling transitions. For even better performance with very large datasets, enable single page mode to render only the current viewport:

```typescript
import { PivotView, VirtualScroll, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(VirtualScroll);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData(1000) as IDataSet[],
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
    enableVirtualization: true,
    virtualScrollSettings: {
        allowSinglePage: true  // Render only current viewport
    }
});

pivotTableObj.appendTo('#PivotTable');
```

**Benefits of Single Page Mode:**
- Significantly faster rendering for very large datasets
- Improved performance during drill-up, drill-down, sorting, and filtering
- Reduced memory footprint
- Better initial load performance

## Virtual Scrolling with Static Field List

When using a stand-alone field list alongside virtual scrolling, manual synchronization is required:

```typescript
import { PivotView, VirtualScroll, PivotFieldList, IDataSet } from '@syncfusion/ej2-pivotview';

let data: Function = (count: number) => {
    let result: Object[] = [];
    let dt: number = 0;
    for (let i: number = 1; i < (count + 1); i++) {
        dt++;
        result.push({
            ProductID: 'PRO-' + i.toString().padStart(5, '0'),
            Year: "FY " + (dt + 2013),
            Price: Math.round(Math.random() * 5000) + 5000,
            Sold: Math.round(Math.random() * 80) + 10,
        });
        if (dt / 4 == 1) {
            dt = 0;
        }
    }
    return result;
};

PivotView.Inject(VirtualScroll);

let pivotObj: PivotView = new PivotView({
    enginePopulated: () => {
        if (fieldListObj) {
            fieldListObj.update(pivotObj);
        }
    },
    enableVirtualization: true,
    height: 350
});
pivotObj.appendTo('#PivotTable');

let fieldListObj: PivotFieldList = new PivotFieldList({
    dataSourceSettings: {
        dataSource: data(1000) as IDataSet[],
        rows: [{ name: 'ProductID' }],
        columns: [{ name: 'Year' }],
        values: [
            { name: 'Price', caption: 'Unit Price' },
            { name: 'Sold', caption: 'Unit Sold' }
        ]
    },
    renderMode: 'Fixed',
    load: (): void => {
        // Connect field list to pivot table
        fieldListObj.pivotGridModule = pivotObj;
        pivotObj.dataSourceSettings = fieldListObj.dataSourceSettings;
        // Generate page settings based on pivot table size
        pivotObj.updatePageSettings(true);
        // Assign page settings to field list
        fieldListObj.pageSettings = pivotObj.pageSettings;
    },
    enginePopulated: (): void => {
        fieldListObj.updateView(pivotObj);
    }
});
fieldListObj.appendTo('#Static_FieldList');
```

## Advanced Example: Large Dataset Handling

Optimize virtual scrolling for very large datasets:

```typescript
import { PivotView, VirtualScroll, IDataSet } from '@syncfusion/ej2-pivotview';

// Generate 1 million records
let largeDataSet: Function = (count: number) => {
    let result: Object[] = [];
    let products = ['Laptop', 'Desktop', 'Phone', 'Tablet'];
    let regions = ['North', 'South', 'East', 'West'];
    
    for (let i = 0; i < count; i++) {
        result.push({
            ProductID: products[i % products.length],
            Region: regions[i % regions.length],
            Year: 2020 + (i % 4),
            Quarter: 'Q' + ((i % 4) + 1),
            Price: Math.random() * 5000 + 1000,
            Sold: Math.random() * 1000 + 100,
        });
    }
    return result;
};

PivotView.Inject(VirtualScroll);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeDataSet(1000000) as IDataSet[],
        enableSorting: false,
        expandAll: false,  // Don't expand all for large datasets
        rows: [{ name: 'ProductID' }, { name: 'Region' }],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Price', caption: 'Unit Price' }
        ]
    },
    width: '100%',
    height: 500,
    enableVirtualization: true,
    virtualScrollSettings: {
        allowSinglePage: true
    },
    // Optimize grid settings
    gridSettings: {
        columnWidth: 100,  // Fixed width in pixels
        rowHeight: 30      // Consistent row height
    }
});

pivotTableObj.appendTo('#PivotTable');
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableVirtualization` | boolean | false | Enables/disables virtual scrolling |
| `virtualScrollSettings` | VirtualScrollSettings | — | Configuration for virtual scrolling behavior |

### VirtualScrollSettings Object

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowSinglePage` | boolean | false | Renders only current viewport (not adjacent pages) |

### Grid Settings for Virtual Scrolling

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columnWidth` | number | 100 | Fixed column width in pixels (not percentage) |
| `rowHeight` | number | auto | Fixed row height for consistent rendering |

## Common Patterns

### Pattern 1: High-Performance Large Dataset

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeData(10000000) as IDataSet[],
        enableSorting: false,
        expandAll: false
    },
    enableVirtualization: true,
    virtualScrollSettings: {
        allowSinglePage: true
    },
    gridSettings: {
        columnWidth: 100
    },
    height: 600,
    width: '100%'
});
```

### Pattern 2: Balanced Performance with Drill-Down

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: mediumData(100000) as IDataSet[],
        expandAll: false  // Users can drill-down manually
    },
    enableVirtualization: true,
    virtualScrollSettings: {
        allowSinglePage: false  // Render adjacent pages for smooth drilling
    }
});
```

### Pattern 3: Virtual Scrolling with Formatting

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: data(500000) as IDataSet[],
        formatSettings: [
            { name: 'Price', format: 'C2' },
            { name: 'Quantity', format: 'N0' }
        ]
    },
    enableVirtualization: true,
    virtualScrollSettings: {
        allowSinglePage: true
    }
});
```

## Limitations of Virtual Scrolling

**Important Limitations:**

1. **Column Width** - Must be fixed in pixels; percentage values are not supported
2. **Row Customization Features NOT Recommended:**
   - Auto-fit columns
   - Dynamic column resizing
   - Text wrapping
   - Dynamic row height changes
   
3. **Date Operations** - May impact performance:
   - Date formatting with sorting
   - Complex groupings with dates

4. **OLAP Limitations:**
   - Subtotals and grand totals only display when measures are at last position
   - May not display summary totals in other configurations

5. **Data Volume Impact:**
   - Loading adjacent pages increases with viewport size
   - Very large pivots may still experience lag

## Troubleshooting

### Virtual Scrolling Not Working

**Problem:** Virtualization doesn't activate or content jumps during scroll
- Ensure `height` and `width` properties are set
- Check that `enableVirtualization` is true
- Verify `VirtualScroll` module is injected
- Confirm data source has sufficient records (typically 1000+)

### Performance Still Slow

**Problem:** Virtual scrolling is enabled but performance remains poor
- Enable `allowSinglePage: true` for better performance
- Set fixed `columnWidth` instead of auto
- Disable sorting with `enableSorting: false`
- Consider using data compression with virtual scrolling

### Memory Usage High

**Problem:** Client-side memory consumption is still high despite virtualization
- Enable single page mode
- Use paging instead of virtual scrolling
- Reduce number of columns in report
- Apply data compression (see data-compression.md)

## Best Practices

1. **Set fixed dimensions** - Always define `height` and `width` in pixels
2. **Use fixed column widths** - Set `columnWidth` in grid settings
3. **Enable single page mode for large datasets** - Use `allowSinglePage: true`
4. **Disable sorting for very large data** - Set `enableSorting: false`
5. **Test with target dataset size** - Verify performance with actual data volumes
6. **Monitor memory usage** - Watch browser memory during user interactions
7. **Combine with other optimizations** - Use data compression, defer updates, or paging
8. **Avoid dynamic sizing** - Don't dynamically change heights/widths during runtime

## Performance Comparison

| Approach | Dataset Size | Initial Load | Scrolling Speed | Memory Usage |
|----------|--------------|--------------|-----------------|--------------|
| No Virtualization | 10K | Fast | Good | High |
| Virtual Scrolling | 100K | Fast | Good | Medium |
| Virtual + Single Page | 1M+ | Fast | Excellent | Low |
| Paging | 1M+ | Instant | Good | Very Low |
