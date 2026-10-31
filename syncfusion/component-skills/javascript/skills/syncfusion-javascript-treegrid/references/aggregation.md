# Aggregation & Summaries

## When to Use This Reference

**Read this file when you need to:**
- Display summary calculations (sum, average, count) in footer rows
- Show totals per group level or for entire dataset
- Implement min/max values across datasets
- Create custom aggregate functions for domain-specific calculations
- Display aggregates with custom formatting or templates

## Table of Contents
- [Aggregate Types](#aggregate-types)
- [Footer Aggregates](#footer-aggregates)
- [Child Aggregates](#child-aggregates)
- [Custom Aggregates](#custom-aggregates)

## Aggregate Types

Specify aggregate functions to calculate summary data. Built-in types: `Sum`, `Average`, `Min`, `Max`, `Count`, `TrueCount`, `FalseCount`.

```typescript
import { TreeGrid, Aggregate } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Aggregate);

let treeGridObj = new TreeGrid({
    dataSource: summaryData,
    childMapping: 'subtasks',
    height: 260,
    columns: [
        { field: 'category', headerText: 'Category', width: 160 },
        { field: 'units', headerText: 'Total Units', type: 'number', width: 130, textAlign: 'Right' },
        { field: 'unitPrice', headerText: 'Unit Price($)', type: 'number', format: 'C2', width: 110, textAlign: 'Right' },
        { field: 'price', headerText: 'Price($)', type: 'number', format: 'C2', width: 160, textAlign: 'Right' }
    ],
    aggregates: [{
        columns: [
            { type: 'Sum', field: 'units', columnName: 'units' },
            { type: 'Average', field: 'price', columnName: 'price' },
            { type: 'Min', field: 'unitPrice', columnName: 'unitPrice' },
            { type: 'Max', field: 'price', columnName: 'price' }
        ]
    }]
});

treeGridObj.appendTo('#TreeGrid');
```

**Aggregate Types:**
- `Sum` - Total of numeric values
- `Average` - Mean of numeric values
- `Min` - Minimum value
- `Max` - Maximum value
- `Count` - Total record count
- `TrueCount` - Count of true values (boolean)
- `FalseCount` - Count of false values (boolean)

## Footer Aggregates

Display aggregate values in footer row using `footerTemplate`. Access aggregate via type name: `${Sum}`, `${Average}`, `${Min}`, etc.

```typescript
let treeGridObj = new TreeGrid({
    dataSource: summaryData,
    childMapping: 'subtasks',
    height: 260,
    columns: [
        { field: 'category', headerText: 'Category', width: 160 },
        { field: 'units', headerText: 'Total Units', type: 'number', width: 130, textAlign: 'Right' },
        { field: 'price', headerText: 'Price($)', type: 'number', format: 'C2', width: 160, textAlign: 'Right' }
    ],
    aggregates: [{
        columns: [
            { type: 'Sum', field: 'units', columnName: 'units', footerTemplate: 'Total Units: ${Sum}' },
            { type: 'Max', field: 'price', columnName: 'price', footerTemplate: 'Max Price: ${Max}' }
        ]
    }]
});

treeGridObj.appendTo('#TreeGrid');
```

### Format Aggregate Values

Use `format` property to format aggregate output (C2 for currency, N2 for numbers):

```typescript
aggregates: [{
    columns: [
        { type: 'Sum', field: 'price', columnName: 'price', format: 'C2', 
          footerTemplate: 'Total: ${Sum}' }
    ]
}]
```

## Child Aggregates

Calculate aggregate for child rows and display in parent footer. Use `showChildSummary: true`:

```typescript
let treeGridObj = new TreeGrid({
    dataSource: summaryData,
    childMapping: 'children',
    height: 260,
    columns: [
        { field: 'FreightID', headerText: 'Freight ID', width: 130 },
        { field: 'FreightName', headerText: 'Freight Name', width: 195 },
        { field: 'UnitWeight', headerText: 'Weight Per Unit', type: 'number', width: 130, textAlign: 'Right' },
        { field: 'TotalUnits', headerText: 'Total Units', type: 'number', width: 125, textAlign: 'Right' }
    ],
    aggregates: [{
        showChildSummary: true,
        columns: [
            { type: 'Max', field: 'UnitWeight', columnName: 'UnitWeight', footerTemplate: 'Maximum: ${Max}' },
            { type: 'Min', field: 'TotalUnits', columnName: 'TotalUnits', footerTemplate: 'Minimum: ${Min}' }
        ]
    }]
});

treeGridObj.appendTo('#TreeGrid');
```

## Custom Aggregates

Implement custom aggregation functions with `type: 'Custom'` and `customAggregate` callback:

```typescript
import { getObject, CustomSummaryType } from '@syncfusion/ej2-grids';

let customAggregateFn: CustomSummaryType = (data: Object): number => {
    let sampleData: Object[] = getObject('result', data);
    let countLength: number = 0;
    sampleData.filter((item: Object) => {
        let categoryValue: string = getObject('category', item);
        if (categoryValue === 'Frozen seafood') {
            countLength++;
        }
    });
    return countLength;
};

let treeGridObj = new TreeGrid({
    dataSource: summaryData,
    childMapping: 'subtasks',
    height: 245,
    columns: [
        { field: 'category', headerText: 'Category', width: 200 },
        { field: 'units', headerText: 'Total Units', type: 'number', width: 130, textAlign: 'Right' },
        { field: 'price', headerText: 'Price($)', type: 'number', format: 'C', width: 110, textAlign: 'Right' }
    ],
    aggregates: [{
        showChildSummary: false,
        columns: [{
            type: 'Custom',
            customAggregate: customAggregateFn,
            columnName: 'category',
            footerTemplate: 'Count of Frozen seafood : ${Custom}'
        }]
    }]
});

treeGridObj.appendTo('#TreeGrid');
```

Access custom aggregate value using `${Custom}` in template.
