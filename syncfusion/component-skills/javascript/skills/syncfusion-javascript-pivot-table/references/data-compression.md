# Data Compression in Pivot View

## Overview

Data compression reduces the size of raw input data by removing duplicate records before pivot calculations. When you have large datasets with many repeated values, compression can dramatically improve performance. For example, 1 million records with 400,000 duplicates can be compressed to 600,000 unique records, resulting in 3-5x faster processing.

## When to Use

Use data compression when you have:
- Large datasets with many repeated values
- JSON data sources with duplicated records
- Need to improve pivot calculation speed
- Memory constraints on client-side
- Multiple fields with low cardinality
- Database exports with redundant data

**Note:** Data compression works best when you have 30% or more duplicate records.

## Requirements

- **Applicable to:** Relational data sources only (JSON, CSV, local arrays)
- **Limitation:** Not supported with OLAP data sources
- **Compatible with:** Virtual scrolling, paging, and other optimizations

## Basic Setup

Enable data compression by setting `allowDataCompression` to `true`:

```typescript
import { PivotView, VirtualScroll, IDataSet } from '@syncfusion/ej2-pivotview';

let data: Function = (count: number) => {
    let result: Object[] = [];
    let dt: number = 0;
    for (let i: number = 1; i < (count + 1); i++) {
        dt++;
        result.push({
            ProductID: 'PRO-' + (i % 1000),  // Repeats every 1000 records
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
        dataSource: data(1000000) as IDataSet[],
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
    allowDataCompression: true,  // Enable compression
    enableVirtualization: true    // Works well with virtualization
});

pivotTableObj.appendTo('#PivotTable');
```

## How Compression Works

**Process:**
1. During initial rendering, all raw data is analyzed
2. Duplicate records are identified and merged
3. Compression time: ~1-2 seconds for 1 million records
4. Subsequent operations use compressed data (much faster)
5. Performance improvement: 3-10x for operations on compressed data

**Example:**
```
Before Compression:  1,000,000 records → Processing time: 10 seconds
After Compression:  → 600,000 unique records → Processing time: 1-3 seconds
```

## Advanced Compression Example

Combine compression with virtual scrolling and other optimizations:

```typescript
import { PivotView, VirtualScroll, IDataSet } from '@syncfusion/ej2-pivotview';

// Generate large dataset with repetition
let createLargeDataSet: Function = (recordCount: number) => {
    let result: Object[] = [];
    let products = ['Laptop', 'Desktop', 'Phone', 'Tablet'];
    let regions = ['North', 'South', 'East', 'West'];
    let salesPersons = ['John', 'Jane', 'Mike', 'Sarah', 'Tom'];
    
    for (let i = 0; i < recordCount; i++) {
        // Deliberately create repeating patterns
        result.push({
            Product: products[i % products.length],
            Region: regions[i % regions.length],
            SalesPerson: salesPersons[i % salesPersons.length],
            Year: 2020 + (i % 5),
            Quarter: 'Q' + ((i % 4) + 1),
            Amount: Math.random() * 10000,
            Quantity: Math.floor(Math.random() * 100) + 1,
        });
    }
    return result;
};

PivotView.Inject(VirtualScroll);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: createLargeDataSet(5000000) as IDataSet[],
        enableSorting: false,
        expandAll: false,  // Don't expand for compressed data
        rows: [
            { name: 'Product' },
            { name: 'Region' }
        ],
        columns: [
            { name: 'Year' },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Quantity', caption: 'Units' },
            { name: 'Amount', caption: 'Sales Amount' }
        ],
        filters: []
    },
    width: '100%',
    height: 500,
    
    // Enable optimizations
    allowDataCompression: true,
    enableVirtualization: true,
    
    virtualScrollSettings: {
        allowSinglePage: true  // Further optimize virtual scrolling
    },
    
    gridSettings: {
        columnWidth: 100,
        rowHeight: 30
    }
});

pivotTableObj.appendTo('#PivotTable');
```

## Compression Workflow

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeDataSet as IDataSet[],
        rows: [{ name: 'Product' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Amount' }]
    },
    allowDataCompression: true,
    
    // Monitor compression process
    dataBound: () => {
        console.log('Data compression complete');
        console.log('Original records:', pivot.dataSourceSettings.dataSource.length);
    },
    
    // Track when data is initially loaded
    load: () => {
        console.log('Starting to load and compress data...');
    }
});
```

## Limitations of Data Compression

### Unsupported Aggregation Types

When compression is enabled, the following aggregation types are NOT fully supported:

- **Average** - Converted to Sum
- **PopulationStDev** - Converted to Sum
- **SampleStDev** - Converted to Sum
- **PopulationVar** - Converted to Sum
- **SampleVar** - Converted to Sum
- **DistinctCount** - Functions as Count

```typescript
// These aggregations will be converted
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: compressedData,
        values: [
            { name: 'Amount', aggregationType: 'Average' }  // Will be converted to Sum
        ]
    },
    allowDataCompression: true  // When enabled, conversion happens automatically
});
```

### Calculated Fields Behavior

Calculated fields maintain default aggregation types:

```typescript
// Calculated field behavior with compression
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: data as IDataSet[],
        values: [
            { name: 'TotalSales', type: 'CalculatedField' }  // Uses default aggregation
        ]
    },
    allowDataCompression: true
});
```

## Performance Comparison

### Scenario: 1 Million Records with 40% Duplicates

| Operation | Without Compression | With Compression | Improvement |
|-----------|-------------------|-----------------|-------------|
| Initial Load | 8-10 seconds | 2-3 seconds | 3-5x faster |
| Drill-Down | 1-2 seconds | 0.2-0.5 seconds | 5-10x faster |
| Sort Field | 2-3 seconds | 0.3-0.8 seconds | 4-8x faster |
| Add Filter | 1.5-2 seconds | 0.2-0.4 seconds | 5-8x faster |
| Memory Usage | 200-300 MB | 60-100 MB | 60-70% reduction |

## Best Practices

1. **Check duplication ratio first** - Compression is most effective with 30%+ duplicate data
2. **Monitor initial compression** - First operation takes longer due to compression
3. **Combine optimizations** - Use with virtual scrolling for best results
4. **Avoid unsupported aggregations** - Stick to Sum, Count, Min, Max
5. **Test with real data** - Performance gains vary based on data patterns
6. **Use consistent data types** - Ensure field values match expected types
7. **Monitor memory** - Verify compression reduces memory usage
8. **Document decisions** - Note if compression is enabled in production

## Common Patterns

### Pattern 1: Maximum Performance with Large Data

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: veryLargeData(10000000) as IDataSet[],
        enableSorting: false,  // Disable sorting for compression
        expandAll: false       // Don't expand all rows
    },
    allowDataCompression: true,
    enableVirtualization: true,
    virtualScrollSettings: {
        allowSinglePage: true
    }
});
```

### Pattern 2: Balanced Performance with Features

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeData(1000000) as IDataSet[],
        enableSorting: true     // Enable sorting
    },
    allowDataCompression: true,
    enableVirtualization: true
});
```

### Pattern 3: Compression with Drill Capability

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: mediumData(500000) as IDataSet[],
        expandAll: false  // Users can drill manually
    },
    allowDataCompression: true,
    showGroupingBar: true,
    showFieldList: true
});
```

## Troubleshooting

### Compression Doesn't Improve Performance

**Problem:** Data compression enabled but no noticeable improvement
- Check if dataset actually has high duplication rate
- Verify compression ratio is at least 30%
- Check browser console for errors
- Ensure other optimizations aren't interfering

### Results Look Different After Compression

**Problem:** Aggregation values changed with compression enabled
- Check if using unsupported aggregation types (Average, StdDev, Var)
- Verify DistinctCount is being used (converts to Count)
- Consider using supported aggregations (Sum, Min, Max, Count)

### Memory Still High

**Problem:** Memory reduction from compression is minimal
- Check actual compression ratio (may be low with unique data)
- Try combining with paging or virtual scrolling
- Reduce number of fields in pivot
- Use server-side processing for very large data

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowDataCompression` | boolean | false | Enables/disables data compression |

## See Also

- [Syncfusion Performance Best Practices](https://ej2.syncfusion.com/javascript/documentation/pivotview/performance-tips/)
