# Data Binding

## Overview

**Data Binding** renders diagrams from structured data (JSON, arrays, databases) instead of manually defining each node.

### Use Cases

- **Organizational charts** from employee data
- **Dependency graphs** from project data
- **Process diagrams** from workflow definitions

---

## DataManager Setup

### Basic DataSourceSettings

```typescript
let dataSource = [
      { id: 'node1', parentId: null, label: 'Node 1' },
      { id: 'node2', parentId: 'node1', label: 'Node 2' },
      { id: 'node3', parentId: 'node1', label: 'Node 3' }
    ]
@Component({
  template: `
    <ejs-diagram 
      width="1000px" height="600px"
      [dataSourceSettings]="dataSourceSettings"
      [getNodeDefaults]="getNodeDefaults"
      [getConnectorDefaults]="getConnectorDefaults">
    </ejs-diagram>
  `
})

export class DataBoundDiagramComponent {
  dataSourceSettings = {
    id: 'id',              // Property name for node ID
    parentId: 'parentId',  // Property name for parent relationship
    dataSource: new DataManager(dataSource)
  };

  getNodeDefaults = (node: NodeModel): NodeModel => {
  node.width = 100;
  node.height = 80;
  node.shape = { type: 'Flow', shape: 'Process' };
  node.annotations = [{ content: (node as any).label }];
  return node;
};

getConnectorDefaults = (connector: ConnectorModel): ConnectorModel => {
  connector.type = 'Orthogonal';
  return connector;
};

}
```

---

## Data Mapping

### Property Mapping

```typescript
dataSourceSettings = {
  id: 'id',                    // Node ID field
  parentId: 'parentId',        // Parent ID field
  dataSource: new DataManager(employeeData),
  
}
```

### Custom Mapping

```typescript
let dataSource = [
  { nodeId: 'emp1', managerId: null, name: 'CEO' },
  { nodeId: 'emp2', managerId: 'emp1', name: 'Manager' }
],

let dataSourceSettings = {
  id: 'nodeId',              // Maps to nodeId field
  parentId: 'managerId',     // Maps to managerId field
  dataSource: new DataManager(dataSource)
}
```

---

## Node Template

### setNodeTemplate

Define how data renders as nodes:

```typescript
setNodeTemplate = (node: NodeModel): Container => {

    // Create an outer StackPanel as container to contain image and text elements
    let container = new StackPanel();
    container.width = 200;
    container.height = 60;
    container.cornerRadius = 10;
    container.style.fill = 'skyblue';
    container.horizontalAlignment = 'Left';
    container.orientation = 'Horizontal';
    container.id = (node.data as any).Name + '_StackContainer';

    // Create an inner image element to displaying image
    let innerContent = new ImageElement();
    innerContent.id = (node.data as any).Name + '_innerContent';
    innerContent.width = 40;
    innerContent.height = 40;
    innerContent.margin.left = 20;
    innerContent.style.fill = 'lightgrey';

    // Create a inner text element for displaying employee details
    let text = new TextElement();
     text.content = 'Name: ' + (node.data as any).Name;
    text.margin = { left: 10, top: 5 };
    text.id = (node.data as any).Name + '_textContent';
    text.style.fill = 'green';
    text.style.color = 'white';
    if ((node.data as any).Name === 'Steve-Ceo') {
      text.style.fill = 'black';
      text.style.color = 'white';
    }

    // Add inner image and text element to the outer StackPanel
    container.children = [innerContent, text];
    return container;
};

// In template
<ejs-diagram [setNodeTemplate]="setNodeTemplate"></ejs-diagram>
```

---

## Organizational Chart from Data

### Data Structure

```typescript
employees = [
  { id: 'ceo', parentId: null, name: 'John Smith', role: 'CEO', dept: 'Executive' },
  { id: 'cto', parentId: 'ceo', name: 'Sarah Johnson', role: 'CTO', dept: 'Engineering' },
  { id: 'dev1', parentId: 'cto', name: 'Mike Davis', role: 'Developer', dept: 'Engineering' },
  { id: 'dev2', parentId: 'cto', name: 'Lisa Brown', role: 'Developer', dept: 'Engineering' },
  { id: 'hr', parentId: 'ceo', name: 'Amy Wilson', role: 'HR Manager', dept: 'HR' }
];
```

### Org-Chart Component

```typescript
import { HierarchicalTreeService, DataBindingService } from '@syncfusion/ej2-angular-diagrams';

@Component({
  selector: 'app-org-chart',
  providers: [HierarchicalTreeService, DataBindingService]
  template: `
    <ejs-diagram 
      [layout]="layout"
      [dataSourceSettings]="dataSourceSettings"
      [getNodeDefaults]="getNodeDefaults">
    </ejs-diagram>
  `,
})
export class OrgChartComponent {
  layout = {
    type: 'OrganizationalChart',
    horizontalSpacing: 100,
    verticalSpacing: 80
  };

  dataSourceSettings = {
    id: 'id',
    parentId: 'parentId',
    dataSource: new DataManager(employees)
  };

  getNodeDefaults = (node: NodeModel): NodeModel => {
    const data: any = node.data || {};
    node.width = 150;
    node.height = 80;
    node.shape = { type: 'Flow', shape: 'Process' };
    node.style = {
      fill: this.getColorByDept(data.dept),
      strokeColor: '#333333'
    };
    node.annotations = [
      { content: data.name, style: { fontSize: 12, bold: true } },
      { content: data.role, offset: { x: 0.5, y: 0.6 }, style: { fontSize: 10 } }
    ];
    return node;
  };

  getColorByDept = (dept: string): string => {
    const colors: Record<string, string> = {
      Executive: '#FFD700',
      Engineering: '#90EE90',
      HR: '#FFB6C1'
    };
    return colors[dept] || '#CCCCCC';
  };
}
```

---

## Remote Data Source

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { Diagram, NodeModel, DiagramTools, SnapSettingsModel, SnapConstraints } from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { DataBindingService, DiagramComponent, DiagramModule, HierarchicalTreeService } from '@syncfusion/ej2-angular-diagrams';

@Component({
    imports: [
        DiagramModule
    ],
    providers: [HierarchicalTreeService, DataBindingService],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-diagram #diagram id="diagram" width="100%" height="580px" [snapSettings]='snapSettings' [getConnectorDefaults]='connDefaults' [getNodeDefaults]='nodeDefaults' [tool]='tool' [layout]='layout' [dataSourceSettings]='data1' >
</ejs-diagram>`,
    encapsulation: ViewEncapsulation.None
})

export class AppComponent {

    public diagram?: DiagramComponent;

    public nodeDefaults(node: NodeModel): NodeModel {
        node.width = 80;
        node.height = 40;
        node.shape = { type: 'Basic', shape: 'Rectangle' };
        node.style = { fill: '#048785', strokeColor: 'Transparent' };
        return node;
    };

    public data1: Object = {
        id: 'Id', parentId: 'ParentId',
        dataSource: new DataManager(
            { url: 'https://services.syncfusion.com/js/production/api/RemoteData', crossDomain: true },

        ),
        //binds the external data with node
        doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
            nodeModel.annotations = [{
                /* tslint:disable:no-string-literal */
                content: data['Label'],
                style: { color: 'white' }
            }];
        }
    };

    public connDefaults(connector: any): void {
        connector.type = 'Orthogonal';
        connector.style.strokeColor = '#048785';
        connector.targetDecorator.shape = 'None';
    };

    public tool: DiagramTools = DiagramTools.ZoomPan;
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

    public layout: Object = {
        type: 'HierarchicalTree', margin: { left: 0, right: 0, top: 100, bottom: 0 },
        verticalSpacing: 40,
    };
}
export interface DataInfo {
    [key: string]: string;
}
```

---

## Dynamic Data Updates

### Refresh Diagram with New Data

```typescript
updateDataSource = (newData: any[]) => {
  this.dataSourceSettings.dataSource = new DataManager(newData);
  this.diagram.dataBind();
  this.diagram.doLayout();
};

// Usage
updateDataSource(updatedEmployeeList);
```

## Troubleshooting Data Binding

### ❌ Nodes Not Rendering from Data

**Problem:** Data array defined but nodes don't appear.

**Solution:** Ensure `dataSourceSettings` is configured and property names match data:

```typescript
// ❌ WRONG - Missing dataSourceSettings
template: `<ejs-diagram [nodes]="employeeData"></ejs-diagram>`

// ✅ CORRECT - Use dataSourceSettings
template: `
  <ejs-diagram 
    [dataSourceSettings]="dataSourceSettings"
    [getNodeDefaults]="getNodeDefaults">
  </ejs-diagram>
`

dataSourceSettings = {
  id: 'EmployeeID',           // ← Must match your data field name
  parentId: 'ReportingTo',    // ← Must match your data field name
  dataSource: new DataManager(employees)
};
```

### ❌ Data Context Lost in Template

**Problem:** `setNodeTemplate` can't access data properties.

**Solution:** Properly destructure and pass data through node object:

```typescript
// ❌ WRONG - Data not accessible
setNodeTemplate = (node: any): NodeModel => ({
  id: node.id,
  annotations: [{ content: node.name }]  // This is undefined!
})

// ✅ CORRECT - Access data via the full node object
setNodeTemplate = (node: any): NodeModel => {
  const data = node.data || node;  // Data may be nested
  return {
    id: data.EmployeeID,
    width: 120,
    height: 80,
    annotations: [{
      content: `${data.EmployeeName}\n${data.Department}`
    }]
  };
}
```

### ❌ Hierarchical Layout Not Working

**Problem:** Nodes arranged randomly instead of hierarchical tree.

**Solution:** Set layout in diagram component:

```typescript
// ❌ WRONG - No layout specified
<ejs-diagram [dataSourceSettings]="dataSourceSettings"></ejs-diagram>

// ✅ CORRECT - Specify hierarchical layout
<ejs-diagram 
  [dataSourceSettings]="dataSourceSettings"
  [layout]="layout">
</ejs-diagram>

layout = {
  type: 'HierarchicalTree',     // ← Activates tree layout
  orientation: 'TopToBottom',   // or LeftToRight, etc.
  verticalSpacing: 60,
  horizontalSpacing: 60
};
```

### ❌ Parent Nodes Missing

**Problem:** Root/top-level nodes don't appear as containers.

**Solution:** Ensure root nodes have `null` or empty `parentId`:

```typescript
dataSource: [
  { EmployeeID: 'emp1', ReportingTo: null, name: 'CEO' },      // ← null parentId
  { EmployeeID: 'emp2', ReportingTo: 'emp1', name: 'Manager' }, // ← Children
  { EmployeeID: 'emp3', ReportingTo: 'emp1', name: 'Manager' }  // ← Children
]
```

### ⚠️ Data Binding Best Practices

1. **Match property names exactly** - `'id'` field in settings must match data field name
2. **Use `getNodeDefaults`** for consistent styling across all data-bound nodes
3. **Test with small dataset first** - generate org chart from 3-5 nodes before scaling
4. **Verify parent-child relationships** - circular references or invalid IDs break layout
5. **Use `setNodeTemplate`** only for rendering customization - don't add/remove nodes here
6. **Reload data carefully** - call `diagram.doLayout()` after updating `dataSourceSettings.dataSource`

---

**→ Next: Add interactivity with [interaction and tools](interaction-and-tools.md)**
