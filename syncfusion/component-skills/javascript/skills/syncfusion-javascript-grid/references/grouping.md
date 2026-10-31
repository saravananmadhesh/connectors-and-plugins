---
name: grouping
description: 'Grouping in Syncfusion Grid: basic, multi-level, caption templates, lazy-load.'
---

# Grouping

## Table of Contents
- [Basic Grouping](#basic-grouping)
- [Group Caption Template](#group-caption-template)
- [Multi-Level Grouping](#multi-level-grouping)
- [Lazy-Load Grouping](#lazy-load-grouping)
- [Grouping with Aggregates](#grouping-with-aggregates)

## When to Use This Reference

- Organize grid data by one or more columns
- Display aggregates per group or group level
- Implement multi-level and hierarchical grouping
- Use lazy-load grouping for large datasets
- Customize group captions and summary displays

## Basic Grouping

### Enable Grouping

```ts
import { Grid, Group, Page, Sort } from '@syncfusion/ej2-grids';

Grid.Inject(Group, Page, Sort);

const data = [
  { OrderID: 10248, CustomerName: 'VINET', City: 'Reims', Freight: 32.38 },
  { OrderID: 10249, CustomerName: 'TOMSP', City: 'München', Freight: 11.61 },
  { OrderID: 10250, CustomerName: 'HANAR', City: 'Rio de Janeiro', Freight: 65.83 },
  { OrderID: 10251, CustomerName: 'VINET', City: 'Reims', Freight: 41.34 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'City', headerText: 'City', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  allowGrouping: true,
  groupSettings: {
    columns: ['City']
  }
});

grid.appendTo('#grid');
```

### Remove Grouping

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'City', headerText: 'City', width: 150 }
  ],
  allowGrouping: true,
  groupSettings: {
    columns: ['City']
  }
});

grid.appendTo('#grid');

// Remove group
grid.ungroupColumn('City');
```

## Group Caption Template

### Customize Group Caption

```ts
import { Grid, Group } from '@syncfusion/ej2-grids';

Grid.Inject(Group);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    {
      field: 'City',
      headerText: 'City',
      width: 150,
      groupCaptionTemplate: '<div>${City} (${count})</div>'
    },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  allowGrouping: true,
  groupSettings: {
    columns: ['City'],
    captionTemplate: '${key} - Total Orders: ${count}'
  }
});

grid.appendTo('#grid');
```

## Multi-Level Grouping

### Group By Multiple Columns

```ts
import { Grid, Group, Aggregate } from '@syncfusion/ej2-grids';

Grid.Inject(Group, Aggregate);

const data = [
  { OrderID: 10248, CustomerName: 'VINET', City: 'Reims', Country: 'France', Freight: 32.38 },
  { OrderID: 10249, CustomerName: 'TOMSP', City: 'München', Country: 'Germany', Freight: 11.61 },
  { OrderID: 10250, CustomerName: 'HANAR', City: 'Rio de Janeiro', Country: 'Brazil', Freight: 65.83 },
  { OrderID: 10251, CustomerName: 'VINET', City: 'Reims', Country: 'France', Freight: 41.34 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'City', headerText: 'City', width: 150 },
    { field: 'Country', headerText: 'Country', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  allowGrouping: true,
  groupSettings: {
    columns: ['Country', 'City']
  }
});

grid.appendTo('#grid');
```

### Programmatic Multi-Level Grouping

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'City', headerText: 'City', width: 150 },
    { field: 'Country', headerText: 'Country', width: 150 }
  ],
  allowGrouping: true
});

grid.appendTo('#grid');

// Add grouping
grid.groupModule.groupColumn('Country');
grid.groupModule.groupColumn('City');

// Remove grouping
grid.ungroupColumn('Country');
```

## Lazy-Load Grouping

### Enable Lazy Load

```ts
import { Grid, Group, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Group, Page);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'City', headerText: 'City', width: 150 }
  ],
  allowGrouping: true,
  groupSettings: {
    columns: ['City'],
    lazyLoadGroupCollapse: true
  },
  pageSettings: { pageSize: 10 }
});

grid.appendTo('#grid');
```

## Grouping with Aggregates

### Add Aggregates to Grouped Data

```ts
import { Grid, Group, Aggregate } from '@syncfusion/ej2-grids';

Grid.Inject(Group, Aggregate);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'City', headerText: 'City', width: 150, allowGrouping: true },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 120 }
  ],
  allowGrouping: true,
  groupSettings: {
    columns: ['City']
  },
  aggregates: [
    {
      columns: [
        { field: 'Freight', type: 'Sum', footerTemplate: 'Total: ${Sum}', groupFooterTemplate: 'Group Total: ${Sum}' },
        { field: 'Freight', type: 'Average', footerTemplate: 'Average: ${Average}' }
      ]
    }
  ]
});

grid.appendTo('#grid');
```

