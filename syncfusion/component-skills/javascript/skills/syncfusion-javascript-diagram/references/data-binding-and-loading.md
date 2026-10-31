# Data Binding & Loading

## Table of Contents

- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [DataSourceSettings](#datasourcesettings)
- [Parent-Child Relationships](#parent-child-relationships)
- [Automatic Diagram Generation](#automatic-diagram-generation)
- [Dynamic Data Updates](#dynamic-data-updates)

## Overview

Diagram supports loading and building structures from external data sources. Instead of manually creating nodes and connectors, you can:
- Bind to JSON arrays
- Load from remote APIs
- Automatically generate diagrams from hierarchical data
- Update diagrams when data changes

**Key Concepts:**
- **DataSourceSettings** - Configuration for data mapping
- **ID Field** - Unique identifier for each data item
- **ParentID Field** - Links items to create hierarchy
- **Root Node** - Starting point for hierarchy

## Local Data Binding

### Simple Array of Objects

```ts
import { Diagram, DataBinding, HierarchicalTree } from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
// Must inject modules for data binding
Diagram.Inject(DataBinding, HierarchicalTree);

// Sample data
let data = [
  { id: '1', label: 'Start', parentId: '' },
  { id: '2', label: 'Process', parentId: '1' },
  { id: '3', label: 'Decision', parentId: '2' },
  { id: '4', label: 'End', parentId: '3' }
];

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  dataSourceSettings: {
    id: 'id',           // Field name for node ID
    parentId: 'parentId', // Field name for parent relationship
    dataManager: new DataManager(data)
  }
});

diagram.appendTo('#diagram');
```

### Result
The diagram automatically creates nodes and connectors based on parent-child relationships.

## Remote Data Binding

### Loading from API

```ts
import { DataBinding } from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
Diagram.Inject(DataBinding);

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  dataSourceSettings: {
    id: 'Id',
    parentId: 'ParentId',
    // Load from remote URL
    dataManager: new DataManager({
      url: 'url',
       headers: [{ Authorization: `Bearer ${getSecureToken()}` }],
      crossDomain: true
    })
  }
});

diagram.appendTo('#diagram');
```

### Handling Remote Delays

```ts
import { DataManager, HttpAdaptor } from '@syncfusion/ej2-data';

let dataManager = new DataManager({
  url: 'url',
  adaptor: new HttpAdaptor(),
   headers: [{ Authorization: `Bearer ${getSecureToken()}` }],
  offline: false
});

// Handle data loaded event
let diagram = new Diagram({
  created: () => {
    console.log('Diagram created, loading remote data...');
  },
  dataSourceSettings: {
    dataSource: dataManager,
    id: 'id',
    parentId: 'parentId'
  }
});
```

## DataSourceSettings

### Complete Configuration

```ts
import { DataManager } from '@syncfusion/ej2-data';

let diagram = new Diagram({
  dataSourceSettings: {
    // Data source (array or DataManager)
    dataManager: new DataManager(employeeData),
    
    // Field names (map data fields to diagram properties)
    id: 'EmployeeID',           // Node ID field
    parentId: 'ParentEmployeeID', // Parent relationship field
    
    // Starting node ID (root of tree)
    root: 'CEO'
  },
  
  // Default node configuration
  getNodeDefaults: (node: NodeModel) => {
    node.width = 100;
    node.height = 60;
    node.style = { fill: '#6BA5D7' };
    node.shape = { type: 'Basic', shape: 'Rectangle' };
  }

});
```

## Parent-Child Relationships

### Simple Hierarchy

Data structure example:
```
Employee (id: E1, parentId: null)
├── Manager1 (id: M1, parentId: E1)
│   ├── Staff1 (id: S1, parentId: M1)
│   └── Staff2 (id: S2, parentId: M1)
└── Manager2 (id: M2, parentId: E1)
    └── Staff3 (id: S3, parentId: M2)
```

Data array:
```ts
let employees = [
  { id: 'E1', name: 'CEO', parentId: null },
  { id: 'M1', name: 'Manager1', parentId: 'E1' },
  { id: 'M2', name: 'Manager2', parentId: 'E1' },
  { id: 'S1', name: 'Staff1', parentId: 'M1' },
  { id: 'S2', name: 'Staff2', parentId: 'M1' },
  { id: 'S3', name: 'Staff3', parentId: 'M2' }
];
```

### Root Node Definition

```ts
import { DataManager } from '@syncfusion/ej2-data';

let diagram = new Diagram({
  dataSourceSettings: {
    dataManager: new DataManager(employees),
    id: 'id',
    parentId: 'parentId',
    root: 'E1'  // Start diagram from CEO
  }
});
```

## Automatic Diagram Generation

### With Hierarchical Layout

```ts
import { Diagram, DataBinding, HierarchicalTree, LayoutAnimation } from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';

Diagram.Inject(DataBinding, HierarchicalTree, LayoutAnimation);

let orgChartData = [
  { id: '1', name: 'John Doe', designation: 'CEO', parentId: '' },
  { id: '2', name: 'Alice Smith', designation: 'VP Sales', parentId: '1' },
  { id: '3', name: 'Bob Johnson', designation: 'VP Engineering', parentId: '1' },
  { id: '4', name: 'Eve Wilson', designation: 'Sales Manager', parentId: '2' },
  { id: '5', name: 'Charlie Brown', designation: 'Tech Lead', parentId: '3' }
];

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  
  // Data binding configuration
  dataSourceSettings: {
    dataManager: new DataManager(orgChartData),
    id: 'id',
    parentId: 'parentId',
  },
  
  // Node template
  getNodeDefaults: (node: NodeModel) => {
    node.width = 150;
    node.height = 60;
    node.shape = { type: 'Basic', shape: 'Rectangle' };
    node.style = { fill: '#6BA5D7', strokeWidth: 2 };
  },

  // Connector template
  getConnectorDefaults: (connector: ConnectorModel) => {
    connector.style = { strokeColor: '#6BA5D7' };
    connector.targetDecorator = { shape: 'Arrow' };
    return connector;
  }
  
  // Automatic layout
  layout: {
    type: 'HierarchicalTree',
    orientation: 'TopToBottom',
    horizontalSpacing: 100,
    verticalSpacing: 100
  }
});

diagram.appendTo('#diagram');
```

### Result
Nodes and connectors are automatically created and positioned based on:
1. Data hierarchy (parentId relationships)
2. Node template configuration
3. Layout algorithm (HierarchicalTree)

## Complete Example: Organization Chart

```ts
import { Diagram, DataBinding, HierarchicalTree, LayoutAnimation } from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';

Diagram.Inject(DataBinding, HierarchicalTree, LayoutAnimation);

// Organization hierarchy data
let orgData = [
  { id: '1', name: 'John', title: 'CEO', parentId: '' },
  { id: '2', name: 'Alice', title: 'VP Sales', parentId: '1' },
  { id: '3', name: 'Bob', title: 'VP Tech', parentId: '1' },
  { id: '4', name: 'David', title: 'Sales Lead', parentId: '2' },
  { id: '5', name: 'Emma', title: 'Sales Rep', parentId: '2' },
  { id: '6', name: 'Frank', title: 'DevOps', parentId: '3' }
];

let diagram = new Diagram({
  width: '100%',
  height: '800px',
  
  dataSourceSettings: {
    dataManager: new DataManager(orgData),
    id: 'id',
    parentId: 'parentId',
  },
  
  /* Node defaults */
  getNodeDefaults: (node: NodeModel) => {
    node.width = 140;
    node.height = 60;
    node.style = { fill: '#6BA5D7', strokeColor: '#0066CC', strokeWidth: 2 };
    node.shape = { type: 'Basic', shape: 'Rectangle' };
  },

  /* Connector defaults */
  getConnectorDefaults: (connector: ConnectorModel) => {
    connector.type = 'Orthogonal';
    connector.style = { strokeColor: '#0066CC', strokeWidth: 1.5 };
    connector.targetDecorator = { shape: 'None' };
  }
  
  layout: {
    type: 'HierarchicalTree',
    orientation: 'TopToBottom',
    horizontalSpacing: 80,
    verticalSpacing: 60
  }
});

diagram.appendTo('#org-chart');
```

## Common Patterns

### Pattern 1: Filter Data Before Binding
```ts
import { DataManager } from '@syncfusion/ej2-data';

let allData = [/* ... */];
let filteredData = allData.filter(item => item.active === true);

let diagram = new Diagram({
  dataSourceSettings: {
    dataManager: new DataManager(filteredData),
    id: 'id',
    parentId: 'parentId'
  }
});
```

### Pattern 2: Transform Data
```ts
import { DataManager } from '@syncfusion/ej2-data';

let rawData = [/* ... */];
let transformedData = rawData.map(item => ({
  id: item.employee_id,
  name: item.employee_name.toUpperCase(),
  parentId: item.manager_id
}));

let diagram = new Diagram({
  dataSourceSettings: {
    dataManager: new DataManager(transformedData),
    id: 'id',
    parentId: 'parentId'
  }
});
```

## Next Steps

- **Apply Layout:** [layout-and-automation.md](layout-and-automation.md)
- **Handle Interactions:** [interaction-and-tools.md](interaction-and-tools.md)
- **Customize Appearance:** [styling-and-appearance.md](styling-and-appearance.md)
