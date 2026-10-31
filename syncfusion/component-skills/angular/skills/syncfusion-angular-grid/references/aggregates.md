# Aggregates

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Basic Aggregates](#basic-aggregates)
- [Footer Aggregates](#footer-aggregates)
- [Custom Aggregates](#custom-aggregates)
- [Group Aggregates](#group-aggregates)

## When to Use This Skill

Use this skill when you need to:
- **Display summary statistics** — Show sum, average, count, min, max for numeric columns
- **Financial reporting** — Display totals, subtotals, and aggregate calculations for financial data
- **Group summaries** — Show aggregates at group level with expandable group rows
- **Footer summaries** — Display aggregate totals at the bottom of the grid
- **Custom aggregation** — Implement custom aggregate functions beyond built-in ones
- **Multi-level aggregation** — Combine aggregates across multiple grouping levels
- **Analytics display** — Present statistical summaries alongside detailed data
- **Budget tracking** — Calculate running totals, spend summaries, and variance calculations

## Overview

Aggregates display summary information (sum, average, count, etc.) for numeric columns. Use them for financial data, statistics, and analytics.

## Basic Aggregates

Display aggregate summary rows:

```typescript
import { Component } from '@angular/core';
import { AggregateColumnsModel, AggregateRowsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-aggregates-grid',
  template: `
    <ejs-grid [dataSource]="data" [allowPaging]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Quantity" headerText="Quantity" type="number" width="100"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
      
      <e-aggregates>
        <e-aggregate>
          <e-columns>
            <e-column field="Quantity" type="Sum" footerTemplate="Total: ${Sum}"></e-column>
            <e-column field="Freight" type="Sum" footerTemplate="Total: ${Sum}"></e-column>
          </e-columns>
        </e-aggregate>
      </e-aggregates>
    </ejs-grid>
  `
})
export class AggregatesGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', Quantity: 5, Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Quantity: 10, Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Quantity: 8, Freight: 65.83 }
  ];
}
```

## Footer Aggregates

Display aggregate values in footer rows:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-aggregate-grid',
  template: `
    <ejs-grid [dataSource]="data" [allowPaging]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Quantity" headerText="Quantity" type="number" width="100"></e-column>
        <e-column field="UnitPrice" headerText="Unit Price" type="number" format="C2" width="120"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
      
      <e-aggregates>
        <e-aggregate>
          <e-columns>
            <e-column field="Quantity" type="Sum" footerTemplate="Sum: ${Sum}"></e-column>
            <e-column field="Quantity" type="Average" footerTemplate="Avg: ${Average}"></e-column>
            <e-column field="Freight" type="Sum" footerTemplate="Total: ${Sum}"></e-column>
          </e-columns>
        </e-aggregate>
      </e-aggregates>
    </ejs-grid>
  `
})
export class FooterAggregateGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', Quantity: 5, UnitPrice: 10, Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Quantity: 10, UnitPrice: 15, Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Quantity: 8, UnitPrice: 12, Freight: 65.83 }
  ];
}
```

## Custom Aggregates

Create custom aggregate functions:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-aggregate-grid',
  template: `
    <ejs-grid [dataSource]="data" [allowPaging]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Quantity" headerText="Quantity" type="number" width="100"></e-column>
        <e-column field="UnitPrice" headerText="Unit Price" type="number" format="C2" width="120"></e-column>
      </e-columns>
      
      <e-aggregates>
        <e-aggregate>
          <e-columns>
            <e-column field="Quantity" type="Custom" 
                      footerTemplate="Median: ${Custom}" customAggregate="medianValue">
            </e-column>
          </e-columns>
        </e-aggregate>
      </e-aggregates>
    </ejs-grid>
  `
})
export class CustomAggregateGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', Quantity: 5, UnitPrice: 10 },
    { OrderID: 10249, CustomerName: 'TOMSP', Quantity: 10, UnitPrice: 15 },
    { OrderID: 10250, CustomerName: 'HANAR', Quantity: 8, UnitPrice: 12 },
    { OrderID: 10251, CustomerName: 'VICTE', Quantity: 12, UnitPrice: 20 }
  ];

  // Custom aggregate: Median value
  medianValue(data: any[]): number {
    const values = data
      .map((item: any) => item.Quantity)
      .sort((a, b) => a - b);
    const mid = Math.floor(values.length / 2);
    return values.length % 2 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
  }
}
```

## Group Aggregates

Display aggregates within grouped rows:

```typescript
import { Component } from '@angular/core';
import { GroupSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-group-aggregate-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [allowGrouping]="true"
              [groupSettings]="groupSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
        <e-column field="Quantity" headerText="Quantity" type="number" width="100"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
      
      <e-aggregates>
        <e-aggregate>
          <e-columns>
            <e-column field="Quantity" type="Sum" groupFooterTemplate="Total: ${Sum}"></e-column>
            <e-column field="Freight" type="Sum" groupFooterTemplate="Total: ${Sum}"></e-column>
          </e-columns>
        </e-aggregate>
      </e-aggregates>
    </ejs-grid>
  `
})
export class GroupAggregateGridComponent {
  groupSettings: GroupSettingsModel = {
    columns: ['ShipCity']
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims', Quantity: 5, Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'München', Quantity: 10, Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', ShipCity: 'Rio de Janeiro', Quantity: 8, Freight: 65.83 },
    { OrderID: 10251, CustomerName: 'VICTE', ShipCity: 'Rio de Janeiro', Quantity: 12, Freight: 41.34 }
  ];
}
```

> Template prop determines where the aggregate appears in the group:
> - `groupFooterTemplate` → rendered in the **footer row** of each group (below group rows)
> - `groupCaptionTemplate` → rendered in the **caption row** of each group (at the top of the group)
> - `footerTemplate` → rendered in the **overall grid footer** (not per group — do not use this for group summaries)
