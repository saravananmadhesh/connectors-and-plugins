# Aggregates in JavaScript Grid

## Table of Contents
- [Overview](#overview)
- [Setup and Configuration](#setup-and-configuration)
- [Aggregate Types](#aggregate-types)
- [Footer Aggregates](#footer-aggregates)
- [Group Aggregates](#group-aggregates)
- [Caption Aggregates](#caption-aggregates)
- [Custom Aggregates](#custom-aggregates)
- [Reactive Updates](#reactive-updates)

## When to Use This Reference

- Display summary calculations (sum, average, count) in footer rows
- Show totals per group level or for entire dataset
- Implement min/max values across datasets
- Create custom aggregate functions for domain-specific calculations
- Display aggregates with custom formatting or templates

## Overview

Aggregates provide summary calculations (Sum, Average, Count, Min, Max) that can be displayed in footer rows, group footers, or group captions. This is useful for displaying total quantities, average values, and other summary statistics.

## Setup and Configuration

### Enable Aggregate Module

```ts
import { Grid, Aggregate, Inject } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: data,
});
Inject(Aggregate)(grid);
```

### Using Configuration Object

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'Freight', headerText: 'Freight', format: 'C2', width: 100 }
  ],
  aggregates: [{
    columns: [{
      field: 'Freight',
      type: 'Sum'
    }]
  }]
});
```

## Aggregate Types

### Supported Aggregate Functions

| Type | Description | Example |
|------|-------------|---------|
| `Sum` | Total of all values | `type: 'Sum'` |
| `Average` | Mean value | `type: 'Average'` |
| `Count` | Number of records | `type: 'Count'` |
| `Min` | Minimum value | `type: 'Min'` |
| `Max` | Maximum value | `type: 'Max'` |
| `TrueCount` | Count of true values | `type: 'TrueCount'` |
| `FalseCount` | Count of false values | `type: 'FalseCount'` |

## Footer Aggregates

Display summary values in grid footer:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'Freight', headerText: 'Freight', format: 'C2', width: 100 }
  ],
  aggregates: [{
    columns: [
      {
        field: 'Freight',
        type: 'Sum',
        format: 'C2',
        footerTemplate: 'Total: ${Sum}'
      },
      {
        field: 'Freight',
        type: 'Average',
        format: 'C2',
        footerTemplate: 'Average: ${Average}'
      }
    ]
  }]
});
```

### Multiple Aggregates in Footer

```ts
const grid = new Grid({
  aggregates: [{
    columns: [
      {
        field: 'Freight',
        type: 'Sum',
        footerTemplate: 'Sum: ${Sum}'
      },
      {
        field: 'Freight',
        type: 'Average',
        footerTemplate: 'Avg: ${Average}'
      },
      {
        field: 'Freight',
        type: 'Max',
        footerTemplate: 'Max: ${Max}'
      },
      {
        field: 'OrderID',
        type: 'Count',
        footerTemplate: 'Count: ${Count}'
      }
    ]
  }]
});
```

## Group Aggregates

Display summary values for each group:

```ts
const grid = new Grid({
  dataSource: data,
  allowGrouping: true,
  groupSettings: { columns: ['ShipCountry'] },
  aggregates: [{
    columns: [{
      field: 'Freight',
      type: 'Sum',
      format: 'C2',
      groupFooterTemplate: 'Group Total: ${Sum}'
    }]
  }]
});
```

> Template prop determines where the aggregate appears in the group:
> - `groupFooterTemplate` → rendered in the **footer row** of each group (below group rows)
> - `groupCaptionTemplate` → rendered in the **caption row** of each group (at the top of the group)
> - `footerTemplate` → rendered in the **overall grid footer** (not per group — do not use this for group summaries)

### Group Footer with Formatting

```ts
const grid = new Grid({
  aggregates: [{
    columns: [{
      field: 'Freight',
      type: 'Sum',
      format: 'C2',
      groupFooterTemplate: '<strong>Group Sum: ${Sum}</strong>'
    }]
  }]
});
```

## Caption Aggregates

Display summaries in group caption row:

```ts
const grid = new Grid({
  dataSource: data,
  allowGrouping: true,
  groupSettings: { columns: ['ShipCountry'] },
  aggregates: [{
    columns: [{
      field: 'Freight',
      type: 'Sum',
      format: 'C2',
      groupCaptionTemplate: 'Total Freight: ${Sum}'
    }]
  }]
});
```

### Custom Group Caption Format

```ts
const grid = new Grid({
  aggregates: [{
    columns: [{
      field: 'OrderID',
      type: 'Count',
      groupCaptionTemplate: '${ShipCountry} - ${Count} items'
    }]
  }]
});
```

## Custom Aggregates

Create custom aggregate calculations:

```ts
const customAggregate = (args) => {
  const total = args.reduce((acc, item) => acc + item.Freight, 0);
  return (total / args.length) * 1.1; // 10% markup
};

const grid = new Grid({
  aggregates: [{
    columns: [{
      field: 'Freight',
      customAggregate: customAggregate,
      footerTemplate: 'Custom: ${customAggregate}'
    }]
  }]
});
```

### Complex Custom Aggregate

```ts
const calculateMedian = (field, records) => {
  const values = records.map(r => r[field]).sort((a, b) => a - b);
  const mid = Math.floor(values.length / 2);
  return values.length % 2 !== 0
    ? values[mid]
    : (values[mid - 1] + values[mid]) / 2;
};
```

## Reactive Updates

### Update Aggregates on Data Change

```ts
const grid = new Grid({
  dataSource: data,
  aggregates: [{
    columns: [{
      field: 'Freight',
      type: 'Sum'
    }]
  }]
});

// Adding new row - aggregates automatically recalculate
grid.addRecord({ OrderID: 10251, Freight: 100, ShipCountry: 'France' });
```

### Using Aggregate Configuration Object

```ts
const aggregates = [
  {
    columns: [
      {
        field: 'Freight',
        type: 'Sum',
        format: 'C2',
        footerTemplate: 'Sum: ${Sum}'
      },
      {
        field: 'Freight',
        type: 'Average',
        format: 'C2',
        footerTemplate: 'Avg: ${Average}'
      }
    ]
  }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID' },
    { field: 'Freight', headerText: 'Freight', format: 'C2' }
  ],
  aggregates: aggregates
});
```
