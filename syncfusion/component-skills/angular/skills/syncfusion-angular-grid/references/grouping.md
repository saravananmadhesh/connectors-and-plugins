# Grouping

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Enable Grouping](#enable-grouping)
- [Group Configuration](#group-configuration)
- [Caption Templates](#caption-templates)
- [Lazy-Load Grouping](#lazy-load-grouping)

## When to Use This Skill

Use this skill when you need to:
- **Organize data by category** — Group rows based on column values
- **Multi-level grouping** — Group by multiple columns for hierarchical view
- **Collapsible group rows** — Allow expanding/collapsing groups
- **Group aggregates** — Show summary calculations per group
- **Group templates** — Customize group header content
- **Lazy-load groups** — Load grouped data on demand for performance
- **Data analysis** — Organize and summarize data by categories

## Overview

Grouping organizes rows into collapsible groups based on column values. This makes it easier to analyze and understand data hierarchies.

## Enable Grouping

Enable grouping with group buttons:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-grouping-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [allowGrouping]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GroupingGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'München', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', ShipCity: 'Rio de Janeiro', Freight: 65.83 },
    { OrderID: 10251, CustomerName: 'VICTE', ShipCity: 'Rio de Janeiro', Freight: 41.34 }
  ];
}
```

## Group Configuration

Pre-configure grouping on specific columns:

```typescript
import { Component } from '@angular/core';
import { GroupSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-group-config-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [allowGrouping]="true"
              [groupSettings]="groupSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GroupConfigGridComponent {
  groupSettings: GroupSettingsModel = {
    columns: ['ShipCity'],  // Group by city
    enableDropArea: true,   // Show drop area
    captionTemplate: '<strong>${key}</strong> Count: ${count}'
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'München', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', ShipCity: 'Rio de Janeiro', Freight: 65.83 },
    { OrderID: 10251, CustomerName: 'VICTE', ShipCity: 'Rio de Janeiro', Freight: 41.34 }
  ];
}
```

## Caption Templates

Customize group header appearance:

```typescript
import { Component } from '@angular/core';
import { GroupSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-caption-template-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [allowGrouping]="true"
              [groupSettings]="groupSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
      
      <ng-template #captionTemplate let-data>
        <div style="padding: 8px; background-color: #e8f4f8; font-weight: bold;">
          📍 {{ data.key }} &nbsp; ({{ data.count }} orders)
        </div>
      </ng-template>
    </ejs-grid>
  `
})
export class CaptionTemplateGridComponent {
  groupSettings: GroupSettingsModel = {
    columns: ['ShipCity']
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'München', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', ShipCity: 'Rio de Janeiro', Freight: 65.83 },
    { OrderID: 10251, CustomerName: 'VICTE', ShipCity: 'Rio de Janeiro', Freight: 41.34 }
  ];
}
```

## Lazy-Load Grouping

Load group data on demand for better performance:

```typescript
import { Component } from '@angular/core';
import { GroupSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-lazyload-group-grid',
  template: `
    <ejs-grid [dataSource]="dataManager" 
              [allowGrouping]="true"
              [allowPaging]="true"
              [groupSettings]="groupSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class LazyLoadGroupGridComponent {
  dataManager = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  });

  groupSettings: GroupSettingsModel = {
    columns: ['ShipCity'],
    lazyLoadGrouping: true,
    enableDropArea: true
  };
}
```
