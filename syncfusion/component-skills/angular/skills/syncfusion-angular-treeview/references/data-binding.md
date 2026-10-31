# Data Binding in TreeView

## Table of Contents
- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
- [Hierarchical vs Self-Referential](#hierarchical-vs-self-referential)
- [Remote Data (DataManager)](#remote-data-datamanager)
- [Load On Demand (Lazy Loading)](#load-on-demand-lazy-loading)
- [Dynamic Data Updates](#dynamic-data-updates)
- [Events](#events)

---

## Overview

TreeView supports binding to multiple data source types:
- **Local arrays** - Static JavaScript object arrays
- **Hierarchical data** - Nested objects with child arrays
- **Self-referential data** - Flat arrays with parent-child IDs
- **Remote data** - DataManager with OData, Web API, or URLs
- **Dynamic loading** - Load on demand for performance

### Field Mapping Options

The `fields` property configures how TreeView maps your data to UI elements:

```typescript
treeFields = {
  dataSource: dataArray,           // Data array or DataManager
  id: 'id',                         // Unique identifier field
  text: 'name',                     // Display text field
  child: 'children',               // Child array field (hierarchical only)
  parentID: 'parentId',            // Parent reference field (self-referential only)
  hasChildren: 'hasChild',         // Boolean indicating child existence
  expanded: 'isExpanded',          // Boolean for initial expand state
  selected: 'isSelected',          // Boolean for initial selection
  isChecked: 'checked',            // Boolean for initial checkbox state
  iconCss: 'icon',                 // CSS class for custom icon
  imageUrl: 'imageUrl',            // Image URL for node
  tooltip: 'tooltipText',          // Tooltip text
  htmlAttribute: 'htmlAttr',       // HTML attributes to apply
  linkAttribute: 'linkAttr',       // Link-related attributes
  imageAttribute: 'imgAttr',       // Image attributes
  tableName: null,                 // For multi-table datasources
  query: null                      // OData query parameter
};
```

**Field Selection Guide:**
- Use `child` for hierarchical (nested) data
- Use `parentID` for flat (self-referential) data
- Combine `id` and `parentID` with `hasChildren` for efficiency
- Map `isChecked`, `selected`, `expanded` for initial states
- Use custom fields for icons, images, and attributes

## Local Data Binding

### Hierarchical Data

Nested data structure with `child` arrays:

```typescript
import { Component } from '@angular/core';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hierarchical-data',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <ejs-treeview [fields]="treeFields"></ejs-treeview>
  `
})
export class HierarchicalDataComponent {
  treeFields = {
    dataSource: [
      {
        code: 'AF',
        name: 'Africa',
        countries: [
          { code: 'NGA', name: 'Nigeria' },
          { code: 'EGY', name: 'Egypt' },
          { code: 'ZAF', name: 'South Africa' }
        ]
      },
      {
        code: 'AS',
        name: 'Asia',
        expanded: true,
        countries: [
          { code: 'CHN', name: 'China' },
          { code: 'IND', name: 'India' },
          { code: 'JPN', name: 'Japan' }
        ]
      }
    ],
    id: 'code',
    text: 'name',
    child: 'countries'
  };
}
```

### Self-Referential Data

Flat array with parentID relationships:

```typescript
export class SelfReferentialDataComponent {
  treeFields = {
    dataSource: [
      { id: 1, name: 'Parent 1', hasChild: true, expanded: true },
      { id: 2, pid: 1, name: 'Child 1' },
      { id: 3, pid: 1, name: 'Child 2' },
      { id: 4, pid: 1, name: 'Child 3' },
      { id: 5, name: 'Parent 2', hasChild: true },
      { id: 6, pid: 5, name: 'Child 2.1' },
      { id: 7, pid: 5, name: 'Child 2.2' }
    ],
    id: 'id',
    parentID: 'pid',
    text: 'name',
    hasChildren: 'hasChild',
    expanded: 'expanded'
  };
}
```

## Hierarchical vs Self-Referential

| Aspect | Hierarchical | Self-Referential |
|--------|-------------|------------------|
| Data structure | Nested objects | Flat array |
| Use case | Org charts, categories | Databases, APIs |
| Performance | Fast for small data | Better for large data |
| Field mapping | Uses `child` property | Uses `parentID` property |
| Parent reference | Implicit in nesting | Explicit parentID field |

**Choose hierarchical** for tightly-coupled data structures you control.

**Choose self-referential** for database results or when parent-child is determined at runtime.

## Remote Data (DataManager)

### OData Service

```typescript
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

export class RemoteDataComponent {
  treeFields = {
    dataSource: new DataManager({
      url: 'url',
      adaptor: new ODataAdaptor(),
      crossDomain: true
    }),
    id: 'EmployeeID',
    text: 'FirstName',
    parentID: 'ReportsTo',
    hasChildren: true
  };
}
```

### Web API (RESTful Service)

```typescript
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

export class WebApiComponent {
  treeFields = {
    dataSource: new DataManager({
      url: '/api/employees',
      adaptor: new UrlAdaptor(),
      crossDomain: true,
      headers: [
        { Authorization: 'Bearer token_here' }  // For authentication
      ]
    }),
    id: 'id',
    parentID: 'parentId',
    text: 'name',
    hasChildren: 'hasChildren'
  };
}
```

### JSON URL

```typescript
export class JsonUrlComponent {
  treeFields = {
    dataSource: new DataManager({
      url: 'assets/data/tree-data.json'
    }),
    id: 'id',
    text: 'name',
    child: 'children'
  };
}
```

### GraphQL Data Source

```typescript
import { DataManager, GraphQLAdaptor } from '@syncfusion/ej2-data';

export class GraphQLComponent {
  treeFields = {
    dataSource: new DataManager({
      url: 'url',
      adaptor: new GraphQLAdaptor(),
      query: `query GetEmployees {
        employees {
          id
          name
          manager_id
          children {
            id
            name
          }
        }
      }`
    }),
    id: 'id',
    text: 'name',
    parentID: 'manager_id'
  };
}
```

### Custom Data Adapter

```typescript
import { DataManager, Adaptor } from '@syncfusion/ej2-data';

class CustomAdaptor extends Adaptor {
  processQuery(dm: DataManager, query: any): Promise<any> {
    // Custom data fetching logic
    return fetch(`/api/data?skip=${query.skip}&take=${query.take}`)
      .then(res => res.json());
  }
}

export class CustomDataComponent {
  treeFields = {
    dataSource: new DataManager({
      adaptor: new CustomAdaptor()
    }),
    id: 'id',
    text: 'name'
  };
}
```

## Load On Demand (Lazy Loading)

By default, TreeView loads only first-level nodes initially. Child nodes load when parent expands:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewModule, TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-lazy-loading',
  standalone: true,
  imports: [TreeViewModule],
  template: `
    <ejs-treeview 
      #treeview
      [fields]="treeFields"
      [loadOnDemand]="true"
      (nodeExpanding)="onNodeExpanding($event)">
    </ejs-treeview>
  `
})
export class LazyLoadingComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  treeFields = {
    dataSource: [
      { id: 1, name: 'Parent 1', hasChild: true },
      { id: 2, name: 'Parent 2', hasChild: true }
    ],
    id: 'id',
    text: 'name',
    parentID: 'pid'
  };

  onNodeExpanding(event: any): void {
    // Load child nodes dynamically
    if (event.nodeData.id === 1) {
      const childNodes = [
        { id: 3, pid: 1, name: 'Child 1.1' },
        { id: 4, pid: 1, name: 'Child 1.2' }
      ];
      this.treeViewComponent?.addNodes(childNodes, event.nodeData.id);
    }
  }
}
```

To disable lazy loading and render entire tree at once:

```typescript
loadOnDemand = false;  // Load all nodes upfront
```

**Note**: Disabling lazy loading may impact performance with large datasets.

## Dynamic Data Updates

### Adding Nodes

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  template: `
    <ejs-treeview #treeview [fields]="treeFields"></ejs-treeview>
    <button (click)="addNewNode()">Add Node</button>
  `
})
export class AddNodeComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  treeFields = { /* ... */ };

  addNewNode(): void {
    const newNode = { id: 10, name: 'New Node', pid: 1 };
    this.treeViewComponent?.addNodes([newNode]);
  }
}
```

### Updating Nodes

```typescript
updateNodeData(): void {
  const updatedNode = { id: 2, name: 'Updated Name', pid: 1 };
  this.treeViewComponent?.updateNode([updatedNode]);
}
```

### Removing Nodes

```typescript
removeNode(): void {
  this.treeViewComponent?.removeNodes(['2']);  // Pass node IDs to remove
}
```

### Moving Nodes

```typescript
moveNodeToParent(): void {
  const nodeIds = ['3', '4'];      // Nodes to move
  const targetParent = '2';        // New parent node ID
  this.treeViewComponent?.moveNodes(nodeIds, targetParent);
}
```

## Events

### dataBound Event

Triggered when data source is fully loaded:

```typescript
<ejs-treeview 
  [fields]="treeFields"
  (dataBound)="onDataBound($event)">
</ejs-treeview>

onDataBound(event: any): void {
  console.log('Tree data loaded successfully');
  console.log('Total nodes:', this.treeViewComponent?.getTreeData().length);
}
```

### nodeExpanding Event

Triggered before node expansion (useful for lazy loading):

```typescript
(nodeExpanding)="onNodeExpanding($event)"

onNodeExpanding(event: any): void {
  console.log('Expanding node:', event.nodeData.name);
}
```

### dataSourceChanged Event

Triggered after data modifications (add, remove, update):

```typescript
(dataSourceChanged)="onDataSourceChanged($event)"

onDataSourceChanged(event: any): void {
  console.log('Data source updated');
}
```

---

**Best Practices:**
- Use hierarchical data for UI-controlled relationships
- Use self-referential for database-driven trees
- Enable lazy loading for trees with 1000+ nodes
- Use DataManager for real-time remote data
- Handle nodeExpanding event for dynamic child loading
