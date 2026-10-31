---
name: Aggregates
description: 'Aggregates in Syncfusion Angular TreeGrid - sum, average, minimum, maximum, count calculations, footer templates, and child aggregates.'
---

# Aggregates

Aggregates calculate summary statistics like sum, average, minimum, and maximum.

## When to Use

Use aggregates when you need to:
- **Summary statistics** — Calculate sum, average, min, max
- **Group totals** — Show subtotals for grouped data
- **Footer summaries** — Display totals in footer rows
- **Bottom summaries** — Show aggregate for entire dataset
- **Custom calculations** — Create custom aggregate functions
- **Child aggregates** — Calculate aggregates for child records

## Table of Contents
- [Aggregate Types](#aggregate-types)
- [Configure Aggregates](#configure-aggregates)
- [Aggregate Templates](#aggregate-templates)

## Aggregate Types

### Sum Aggregate

```typescript
import { Component } from '@angular/core';
import { AggregateService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [aggregates]='aggregateRows'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='Duration' headerText='Duration' width='100'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [AggregateService]
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';

  public aggregateRows: AggregateRowModel[] = [{
    columns: [
      {
        field: 'Duration',
        type: 'Sum',
        footerTemplate: 'Total: ${Sum}'
      }
    ]
  }];
}
```

### Average Aggregate

```typescript
public aggregateRows: AggregateRowModel[] = [{
  columns: [{
    field: 'Duration',
    type: 'Average',
    footerTemplate: 'Average: ${Average}'
  }]
}];
```

### Min/Max Aggregate

```typescript
public aggregateRows: AggregateRowModel[] = [{
  columns: [
    {
      field: 'Duration',
      type: 'Min',
      footerTemplate: 'Minimum: ${Min}'
    },
    {
      field: 'Duration',
      type: 'Max',
      footerTemplate: 'Maximum: ${Max}'
    }
  ]
}];
```

### Count Aggregate

```typescript
public aggregateRows: AggregateRowModel[] = [{
  columns: [{
    field: 'TaskID',
    type: 'Count',
    footerTemplate: 'Total Records: ${Count}'
  }]
}];
```

## Configure Aggregates

### Multiple Aggregates

```typescript
public aggregateRows: AggregateRowModel[] = [{
  columns: [
    {
      field: 'Duration',
      type: 'Sum',
      footerTemplate: 'Total: ${Sum}'
    },
    {
      field: 'Duration',
      type: 'Average',
      footerTemplate: 'Avg: ${Average}'
    }
  ]
}];
```

## Aggregate Templates

### Custom Footer Template

```typescript
public aggregateRows: AggregateRowModel[] = [{
  columns: [{
    field: 'Duration',
    type: 'Sum',
    footerTemplate: '<div style="color: blue;"><b>Total Duration: ${Sum} days</b></div>'
  }]
}];
```
