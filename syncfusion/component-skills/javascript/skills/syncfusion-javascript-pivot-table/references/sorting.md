# Sorting in Syncfusion TypeScript Pivot View

## Overview

The Pivot Table component provides comprehensive sorting capabilities for organizing data in ascending or descending order. Sorting can be applied to both row and column headers, including member sorting, alphanumeric sorting, custom sorting, and value sorting.

**Key Features:**
- Member sorting (ascending/descending)
- Alphanumeric sorting for numeric values stored as strings
- Custom sorting with user-defined order
- Value sorting based on aggregated values
- Multiple axis sorting support

## Member Sorting

Member sorting arranges row and column headers in ascending or descending order.

### Enable Sorting
```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        enableSorting: true,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }]
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Configure Sort Settings
```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        enableSorting: true,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }],
        sortSettings: [
            { name: 'Country', order: 'Descending' },
            { name: 'Year', order: 'Ascending' }
        ]
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## Alphanumeric Sorting

When numeric values are stored as strings, alphanumeric sorting ensures proper numerical order.

### Example: Alphanumeric Sorting
```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        enableSorting: true,
        rows: [{ name: 'ProductID', dataType: 'number' }], // Treat as number
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }]
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## TypeScript Code Examples

### Basic Sorting Setup
```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        sortSettings: [
            { name: 'Country', order: 'Ascending' },
            { name: 'Products', order: 'Descending' }
        ]
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Custom Sorting
```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        enableSorting: true,
        rows: [{ 
            name: 'Country',
            membersOrder: ['United Kingdom', 'France', 'Germany', 'United States']
        }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }]
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Value Sorting
```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        enableSorting: true,
        enableValueSorting: true,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        valueSortSettings: {
            headerText: 'FY 2015##Q1##Units Sold',
            headerDelimiter: '##',
            sortOrder: 'Descending'
        }
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Sorting Events
```typescript
import { PivotView, IDataSet, HeadersSortEventArgs } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        enableSorting: true,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }]
    },
    onHeadersSort: (args: HeadersSortEventArgs) => {
        console.log('Sorting field:', args.fieldName);
        console.log('Sort direction:', args.sortOrder);
        // args.cancel = true; // Cancel sorting if needed
    },
    actionBegin: (args) => {
        if (args.actionName === 'Sort field') {
            console.log('Sorting started');
        }
    },
    actionComplete: (args) => {
        if (args.actionName === 'Field sorted') {
            console.log('Sorting completed');
        }
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## Configuration Options

### SortSettings Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Field name to sort |
| `order` | string | 'Ascending' or 'Descending' |
| `membersOrder` | string[] | Custom order for members |

### Row/Column Field Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Field name |
| `dataType` | string | 'number', 'string', 'date' for alphanumeric sorting |
| `membersOrder` | string[] | Custom sort order |

### Value Sort Settings

| Property | Type | Description |
|----------|------|-------------|
| `headerText` | string | Column header path to sort by |
| `headerDelimiter` | string | Delimiter for header hierarchy |
| `sortOrder` | string | 'Ascending' or 'Descending' |

## Common Patterns

### Multiple Field Sorting
```typescript
sortSettings: [
    { name: 'Country', order: 'Ascending' },
    { name: 'Products', order: 'Descending' },
    { name: 'Year', order: 'Ascending' }
]
```

### Dynamic Sorting
```typescript
// Change sort order programmatically
let existingSort = pivotTableObj.dataSourceSettings.sortSettings.find(s => s.name === 'Country');
if (existingSort) {
    existingSort.order = existingSort.order === 'Ascending' ? 'Descending' : 'Ascending';
} else {
    pivotTableObj.dataSourceSettings.sortSettings.push({ name: 'Country', order: 'Ascending' });
}
pivotTableObj.refresh();
```

### Clear Sorting
```typescript
// Clear all sorting
pivotTableObj.dataSourceSettings.sortSettings = [];
pivotTableObj.refresh();

// Clear specific field sorting
pivotTableObj.dataSourceSettings.sortSettings = 
    pivotTableObj.dataSourceSettings.sortSettings.filter(s => s.name !== 'Country');
pivotTableObj.refresh();
```

## Troubleshooting

### Issue: Sorting not working
**Solution:** Ensure `enableSorting` is set to `true` in dataSourceSettings.

```typescript
dataSourceSettings: {
    enableSorting: true,
    // Other settings...
}
```

### Issue: Numeric values sorting incorrectly
**Solution:** Set the dataType property to 'number' for alphanumeric sorting.

```typescript
rows: [
    { name: 'ProductID', dataType: 'number' }
]
```

### Issue: Custom sort order not applied
**Solution:** Ensure membersOrder array contains all expected values.

```typescript
rows: [{
    name: 'Quarter',
    membersOrder: ['Q1', 'Q2', 'Q3', 'Q4'] // Complete list
}]
```

### Issue: Value sorting not working
**Solution:** Verify headerText matches the exact column header hierarchy.

```typescript
valueSortSettings: {
    headerText: 'FY 2015##Q1##Units Sold', // Must match exactly
    headerDelimiter: '##',
    sortOrder: 'Descending'
}
```

### Issue: Sort order reverting after refresh
**Solution:** Ensure sortSettings are properly configured in dataSourceSettings, not just set dynamically.

```typescript
dataSourceSettings: {
    sortSettings: [
        { name: 'Country', order: 'Ascending' }
    ],
    // Other settings...
}
```

## Events

### onHeadersSort
Triggered when clicking column headers to sort.

```typescript
onHeadersSort: (args: HeadersSortEventArgs) => {
    // args.fieldName - Field being sorted
    // args.sortOrder - 'Ascending' or 'Descending'
    // args.cancel - Set to true to cancel sorting
}
```

### actionBegin / actionComplete / actionFailure
General action events for sorting operations.

```typescript
actionBegin: (args) => {
    if (args.actionName === 'Sort field') {
        // Sorting started
    }
},
actionComplete: (args) => {
    if (args.actionName === 'Field sorted') {
        // Sorting completed
    }
},
actionFailure: (args) => {
    console.error('Sort failed:', args);
}
```
