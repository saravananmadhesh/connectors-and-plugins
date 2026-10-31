---
name: Data-binding
description: 'Data binding in Syncfusion Angular TreeGrid - local data arrays, remote data sources, ORM integration, custom adaptors, and dynamic data assignment.'
---

# Data Binding

Data binding connects the TreeGrid to various data sources including local arrays, remote APIs, and ORMs.

## When to Use

Use data binding when you need to:
- **Load local data** — Bind TreeGrid to in-memory arrays or objects
- **Fetch remote data** — Load data from REST APIs or OData services
- **Server-side operations** — Perform filtering, sorting, paging on backend
- **Dynamic data updates** — Refresh or update TreeGrid data programmatically
- **ORM integration** — Connect to Entity Framework or other ORMs
- **Real-time data** — Fetch live data from APIs
- **Hierarchical data** — Bind parent-child relationships from various sources

## Table of Contents
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [ORM Integration](#orm-integration)
- [Error Handling](#error-handling)
- [Change Detection Optimization](#change-detection-optimization)

## Local Data Binding

### Bind Local Array

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='taskData'
      [childMapping]='childMapping'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='150'></e-column>
        <e-column field='Duration' headerText='Duration' width='100'></e-column>
      </e-columns>
    </ejs-treegrid>
  `
})
export class AppComponent {
  public childMapping: string = 'subtasks';
  
  public taskData: Object[] = [
    {
      TaskID: 1,
      TaskName: 'Planning',
      Duration: 8,
      subtasks: [
        { TaskID: 2, TaskName: 'Scope', Duration: 4 },
        { TaskID: 3, TaskName: 'Budget', Duration: 4 }
      ]
    }
  ];
}
```

### Dynamic Data Assignment

```typescript
setDataSource(data: Object[]) {
  this.treegrid.dataSource = data;
  this.treegrid.refresh();
}
```

## Remote Data Binding

### UrlAdaptor

```typescript
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

export class AppComponent {
  public dataManager = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor()
  });
}
```

### With DataManager

```typescript
<ejs-treegrid 
  [dataSource]='dataManager'
  idMapping='TaskID'
  parentIdMapping='ParentItem'
  hasChildMapping='isParent' 
  [allowPaging]='true'
  [pageSettings]='{ pageSize: 10 }'>
  <!-- columns -->
</ejs-treegrid>
```

## ORM Integration

### Entity Framework Core

```typescript
public dataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});
```

## Error Handling

### Handle Data Binding Errors

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { TreeGridComponent, DataManager, UrlAdaptor } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <div *ngIf='errorMessage' class='error-message'>
      {{ errorMessage }}
    </div>
    <ejs-treegrid 
      #treegrid
      [dataSource]='dataManager'
      (actionFailure)='onActionFailure($event)'>
    </ejs-treegrid>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  
  public dataManager: DataManager = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor()
  });
  
  public errorMessage: string = '';

  ngOnInit(): void {
  }

  onActionFailure(args: any): void {
    if (args.error) {
      this.errorMessage = args.error.statusText || 'Data loading failed';
      console.error('Data Error:', args.error);
    }
  }
}
```

## Change Detection Optimization

### Use OnPush Strategy for Large Datasets

```typescript
import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='dataManager'
      [childMapping]='childMapping'
      [allowVirtualization]='true'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  @Input() dataSource: string = 'url';
  
  public dataManager!: DataManager;
  public childMapping: string = 'Children';

  ngOnInit(): void {
    this.dataManager = new DataManager({
      url: this.dataSource,
      adaptor: new UrlAdaptor(),
      // Enable caching to reduce API calls
      enableCaching: true
    });
  }
}
```
