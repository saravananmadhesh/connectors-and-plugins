# Data Binding in Syncfusion Vue Diagram

## Overview

Data binding enables rendering diagrams from structured data sources like JSON, databases, or remote APIs. This is powerful for creating diagrams from org charts, hierarchies, or dynamic data without manually creating each node.

## DataManager Setup

### Basic Data Source

```javascript

import { DataManager } from '@syncfusion/ej2-data';

const dataSettings = {
  id: 'id',
  parentId: 'parentId',
  dataManager: new DataManager([
    { id: 'root', name: 'Root Node' },
    { id: 'node1', name: 'Child 1', parentId: 'root' },
    { id: 'node2', name: 'Child 2', parentId: 'root' },
    { id: 'node3', name: 'Grandchild', parentId: 'node1' }
  ])
};

// apply to diagram:
diagram.dataSourceSettings = dataSettings;
```

## ID and Parent ID Mapping

### Flat Data Structure

```javascript
import { DataManager } from '@syncfusion/ej2-data';

const employees = [
  { empId: '1', empName: 'John', reportingTo: null },
  { empId: '2', empName: 'Jane', reportingTo: '1' },
  { empId: '3', empName: 'Bob',  reportingTo: '1' },
  { empId: '4', empName: 'Alice', reportingTo: '2' }
];

const dataSettings = {
  id: 'empId',                          // Node ID field
  parentId: 'reportingTo',              // Parent reference field
  dataSource: new DataManager(employees)
};
```

### Custom Field Mapping

```javascript
import { DataManager } from '@syncfusion/ej2-data';

const dataSettings = {
  id: 'id',
  parentId: 'parent',
  dataSource: new DataManager(dataArray),
  doBinding: (nodeModel, data) => {
    nodeModel.style = { fill: data.statusColor || '#6BA3D5' };
    nodeModel.annotations = [
      { content: data.name, style: { fontSize: 14, bold: true } },
      { content: data.description, offset: { x: 0.5, y: 0.8 }, style: { fontSize: 11 } }
    ];
  }
};
```

## Rendering Org Charts

### Simple Org Chart

```vue
<template>
  <ejs-diagram 
    id="diagram"
    :width="width"
    :height="height"
    :dataSourceSettings="dataSourceSettings"
    :layout="layout"
    :getNodeDefaults="getNodeDefaults"
  ></ejs-diagram>
</template>

<script setup>
import { DiagramComponent as EjsDiagram } from '@syncfusion/ej2-vue-diagrams';
import { DataManager } from '@syncfusion/ej2-data';

const width = '100%';
const height = '590px';

const dataSourceSettings = {
  id: 'id',
  parentId: 'manager',
  dataSource: new DataManager([
    { id: '1', name: 'CEO', manager: null },
    { id: '2', name: 'Manager', manager: '1' },
    { id: '3', name: 'Officer 1', manager: '2' },
    { id: '4', name: 'Officer 2', manager: '2' }
  ])
};

const layout = {
  type: 'OrganizationalChart',
  horizontalSpacing: 80,
  verticalSpacing: 80
};

const getNodeDefaults = (node) => {
  node.width = 100;
  node.height = 50;
  node.annotations = [{ content: node.data.name }];
  return node;
};
</script>
```

### Complex Org Chart

```javascript
import { DataManager } from '@syncfusion/ej2-data';
const employees = [
  { 
    id: '1', 
    name: 'John Smith', 
    title: 'CEO',
    manager: null,
    image: 'john.jpg'
  },
  { 
    id: '2', 
    name: 'Jane Doe', 
    title: 'Vice President',
    manager: '1',
    image: 'jane.jpg'
  },
  { 
    id: '3', 
    name: 'Bob Wilson', 
    title: 'Manager',
    manager: '2',
    image: 'bob.jpg'
  },
  { 
    id: '4', 
    name: 'Alice Johnson', 
    title: 'Developer',
    manager: '3',
    image: 'alice.jpg'
  }
];

const dataSettings = {
  id: 'id',
  parentId: 'manager',
  dataSource: new DataManager(employees)
};

const getNodeDefaults = (node) => {
  node.width = 120;
  node.height = 80;
  node.shape = { type: 'Image', source: node.data.image };
  node.annotations = [
    { content: node.data.name, offset: { x: 0.5, y: 0.7 } }
  ];
  return node;
};
```

## PostgreSQL Data Source

### Remote Data Binding

```vue
<template>
    <div id="app">
        <ejs-diagram id="diagram" :width='width' :height='height' :tool='tool' :getNodeDefaults='getNodeDefaults' :layout='layout'
            :snapSettings='snapSettings' :getConnectorDefaults='getConnectorDefaults' 
            :dataSourceSettings='dataSourceSettings'></ejs-diagram>
    </div>
</template>
<script>
import { DiagramComponent, DataBinding, HierarchicalTree, DiagramTools } from '@syncfusion/ej2-vue-diagrams';
import { DataManager } from "@syncfusion/ej2-data";

export default {
    name: "App",
    components: {
        "ejs-diagram": DiagramComponent
    },
    data() {
        return {
            width: "100%",
            height: "350px",
            layout: {
                type: 'HierarchicalTree', margin: { left: 0, right: 0, top: 100, bottom: 0 },
                verticalSpacing: 40,
                getLayoutInfo: (node, options) => {
                    if (options.level === 3) {
                        node.style.fill = '#3c418d';
                    }
                    if (options.level === 2) {
                        node.style.fill = '#108d8d';
                        options.type = 'Center';
                        options.orientation = 'Horizontal';
                    }
                    if (options.level === 1) {
                        node.style.fill = '#822b86';
                    }
                }
            },
            //Sets the default values of nodes
            getNodeDefaults: (obj) => {
                obj.width = 80;
                obj.height = 40;
                //Initialize shape
                obj.shape = { type: 'Basic', shape: 'Rectangle' };
                obj.style = { fill: '#048785', strokeColor: 'Transparent' };
            },
            //Sets the default values of connector
            getConnectorDefaults: (connector) => {
                connector.type = 'Orthogonal';
                connector.style.strokeColor = '#048785';
                connector.targetDecorator.shape = 'None';
            },
            dataSourceSettings: {
                id: "Id",
                parentId: "ParentId",
                dataSource: new DataManager(
                    {
                        url: "[YOUR URL HERE]",
                        crossDomain: true
                    },
                ),
                //binds the external data with node
                doBinding: (nodeModel, data, diagram) => {
                    nodeModel.annotations = [
                        {
                            /* tslint:disable:no-string-literal */
                            content: data["Label"],
                            style: { color: "white" }
                        }
                    ];
                }
            },
            //Disables all interactions except zoom/pan
            tool: DiagramTools.ZoomPan,
            snapSettings: { constraints: 0 }
        }
    },
    provide: {
        diagram: [DataBinding, HierarchicalTree]
    },
}
</script>
<style>
  @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css";
</style>
```

### Local Data Binding

```vue
<template>
    <div id="app">
        <ejs-diagram id="diagram" :width='width' :height='height' :tool='tool' :getNodeDefaults='getNodeDefaults'
            :snapSettings='snapSettings' :getConnectorDefaults='getConnectorDefaults' :layout='layout'
            :dataSourceSettings='dataSourceSettings'></ejs-diagram>
    </div>
</template>
<script>
import { DiagramComponent, Diagram, HierarchicalTree, DataBinding, DiagramTools } from '@syncfusion/ej2-vue-diagrams';
import { DataManager } from "@syncfusion/ej2-data";

let species = [{
    'Name': 'Species',
    'fillColor': '#3DD94A'
},
{
    'Name': 'Plants',
    'Category': 'Species'
},
{
    'Name': 'Fungi',
    'Category': 'Species'
},
{
    'Name': 'Lichens',
    'Category': 'Species'
},
{
    'Name': 'Animals',
    'Category': 'Species'
},
{
    'Name': 'Mosses',
    'Category': 'Plants'
},
{
    'Name': 'Ferns',
    'Category': 'Plants'
},
{
    'Name': 'Gymnosperms',
    'Category': 'Plants'
},
{
    'Name': 'Dicotyledens',
    'Category': 'Plants'
},
{
    'Name': 'Monocotyledens',
    'Category': 'Plants'
},
{
    'Name': 'Invertebrates',
    'Category': 'Animals'
},
{
    'Name': 'Vertebrates',
    'Category': 'Animals'
},
{
    'Name': 'Insects',
    'Category': 'Invertebrates'
},
{
    'Name': 'Molluscs',
    'Category': 'Invertebrates'
},
{
    'Name': 'Crustaceans',
    'Category': 'Invertebrates'
},
{
    'Name': 'Others',
    'Category': 'Invertebrates'
},
{
    'Name': 'Fish',
    'Category': 'Vertebrates'
},
{
    'Name': 'Amphibians',
    'Category': 'Vertebrates'
},
{
    'Name': 'Reptiles',
    'Category': 'Vertebrates'
},
{
    'Name': 'Birds',
    'Category': 'Vertebrates'
},
{
    'Name': 'Mammals',
    'Category': 'Vertebrates'
}];

export default {
    name: "App",
    components: {
        "ejs-diagram": DiagramComponent
    },
    data() {
        return {
            width: "100%",
            height: "350px",
            getNodeDefaults: (obj) => {
                //Initialize shape
                obj.shape = {
                    type: 'Basic',
                    shape: 'Rectangle'
                };
                obj.style = {
                    strokeWidth: 1
                };
                obj.width = 95;
                obj.height = 30;
            },
            getConnectorDefaults: (connector) => {
                connector.type = 'Orthogonal';
                connector.style.strokeColor = '#4d4d4d';
                connector.targetDecorator.shape = 'None';
            },
            snapSettings: {
                constraints: 0
            },
            tool: DiagramTools.ZoomPan,
            layout: {
                type: 'HierarchicalTree',
                horizontalSpacing: 15,
                verticalSpacing: 50,
                margin: {
                    top: 10,
                    left: 10,
                    right: 10,
                    bottom: 0
                },
            },
            dataSourceSettings: {
                id: 'Name',
                parentId: 'Category',
                dataManager: new DataManager(species),
                //binds the external data with node
                doBinding: (nodeModel, data, diagram) => {
                    nodeModel.annotations = [{
                        /* tslint:disable:no-string-literal */
                        content: data['Name'],
                        margin: {
                            top: 10,
                            left: 10,
                            right: 10,
                            bottom: 0
                        },
                        style: {
                            color: 'black'
                        }
                    }];
                    /* tslint:disable:no-string-literal */
                    nodeModel.style = {
                        fill: '#ffeec7',
                        strokeColor: '#f5d897',
                        strokeWidth: 1
                    };
                }
            },
        }
    },
    provide: {
        diagram: [DataBinding, HierarchicalTree]
    }
}
</script>
<style>
  @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css";
</style>
```

## Advanced Data Binding Patterns

### Pattern 1: Filtering and Searching

```javascript

import { DataManager } from '@syncfusion/ej2-data';

const filterByDepartment = (department) => {
  const filtered = allEmployees.filter(emp => emp.dept === department);

  diagram.dataSourceSettings = {
    id: 'id',
    parentId: 'manager',
    dataManager: new DataManager(filtered)
  };
  diagram.doLayout();
};

// Search & highlight
const searchNodes = (term) => {
  const ids = allEmployees
    .filter(emp => emp.name.toLowerCase().includes(term.toLowerCase()))
    .map(emp => emp.id);

  ids.forEach(id => {
    const node = diagram.getObject(id);
    if (node) {
        node.style.fill = '#FFFF99';
    }
  });
  diagram.refresh(); // or re-render via reactive state in Vue
};
```

### Pattern 2: Dynamic Data Updates

```javascript

import { DataManager } from '@syncfusion/ej2-data';

// Add new employee to diagram
const addEmployee = (newEmployee) => {
  const current = diagram.dataSourceSettings.dataManager.dataSource.json; // local array scenario
  const updated = [...current, newEmployee];

  diagram.dataSourceSettings = {
    id: 'id',
    parentId: 'manager',
    dataManager: new DataManager(updated)
  };
  diagram.doLayout();
};

// Update existing node data
const updateEmployee = (empId, updatedData) => {
  const index = allEmployees.findIndex(e => e.id === empId);
  if (index >= 0) {
    allEmployees[index] = { ...allEmployees[index], ...updatedData };
    const node = diagram.getObject(empId);
    if (node && updatedData.name) {
        node.annotations[0].content = updatedData.name;
    }
    diagram.refreshDiagram();
  }
};

// Remove employee
const removeEmployee = (empId) => {
  const updated = allEmployees.filter(e => e.id !== empId);
  diagram.dataSourceSettings = {
    id: 'id',
    parentId: 'manager',
    dataManager: new DataManager(updated)
  };
  diagram.doLayout();
};
```

### Pattern 3: Conditional Styling Based on Data

```javascript

const getNodeDefaults = (node) => {
  node.width = 140;
  node.height = 80;

  // Color by department
  const departmentColors = {
    Engineering: '#4169E1',
    Sales:       '#FF6347',
    Finance:     '#FFD700',
    HR:          '#32CD32'
  };

  node.style = {
    fill: departmentColors[node.data.dept] || '#6BA3D5',
    strokeColor: '#333'
  };

  // Show title below name
  node.annotations = [
    { content: node.data.name, style: { fontSize: 14, bold: true } },
    { content: node.data.title, offset: { x: 0.5, y: 0.8 }, style: { fontSize: 10 } }
  ];
  return node;
};

const getConnectorDefaults = (connector) => {
    // Different connector styles for different relationships
  connector.style = { strokeColor: '#666', strokeWidth: 2 };
  return connector;
};
```

### Pattern 4: Hierarchical Search (Find Path)

```javascript
// Find all ancestors of a node
const getAncestors = (nodeId) => {
  const ancestors = [];
  let currentId = nodeId;
  while (currentId) {
    const node = allEmployees.find(e => e.id === currentId);
    if (node && node.manager) {
      ancestors.push(node.manager);
      currentId = node.manager;
    } else { break; }
  }
  return ancestors;
};

// Find all descendants of a node
const getDescendants = (nodeId) => {
  const descendants = [];
  const findChildren = (parentId) => {
    const children = allEmployees.filter(e => e.manager === parentId);
    children.forEach(child => {
      descendants.push(child.id);
      findChildren(child.id);
    });
  };
  findChildren(nodeId);
  return descendants;
};

// Highlight chain of command (ancestors + node)
const highlightChainOfCommand = (nodeId) => {
  const chainIds = [nodeId, ...getAncestors(nodeId)];
  diagram.clearSelection();
  chainIds.forEach(id => {
    const node = diagram.getObject(id);
    if (node) {
      diagram.select([node]);
    }
  });
};
```

## setNodeTemplate

### Custom Node Rendering

```javascript
//Funtion to add the Template of the Node.
diagram.setNodeTemplate = (obj, diagram) => {
  
  // Create the outer container for the node content.
  let content = new StackPanel();
  content.id = obj.id + "_outerstack";
  content.orientation = "Horizontal";
  content.style.strokeColor = "gray";
  content.padding = { left: 5, right: 10, top: 5, bottom: 5 };

  // Create an image element for the employee image.
  let image = new ImageElement();
  image.width = 50;
  image.height = 50;
  image.style.strokeColor = "none";
  image.source = (obj.data).ImageUrl;
  image.id = obj.id + "_pic";

  // Create an inner stack panel for text elements (name and designation).
  let innerStack = new StackPanel();
  innerStack.style.strokeColor = "none";
  innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
  innerStack.id = obj.id + "_innerstack";

  // Create a text element for the employee name.
  let text = new TextElement();
  text.content = (obj.data).Name;
  text.style.color = "black";
  text.style.bold = true;
  text.style.strokeColor = "none";
  text.style.fill = "none";
  text.id = obj.id + "_text1";

  // Create a text element for the employee designation.
  let desigText = new TextElement();
  desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
  desigText.content = (obj.data).Designation;
  desigText.style.color = "black";
  desigText.style.strokeColor = "none";
  desigText.style.fill = "none";
  desigText.style.textWrapping = "Wrap";
  desigText.id = obj.id + "_desig";
  innerStack.children = [text, desigText];

  content.children = [image, innerStack];

  return content;
}
```

### Conditional Templates

```javascript
diagram.setNodeTemplate = (obj, diagram) => {
   // Create the outer container for the node content.
  let content = new StackPanel();
  content.id = obj.id + '_outerstack';
  content.orientation = 'Horizontal';
  content.style.strokeColor = 'gray';
  content.padding = { left: 5, right: 10, top: 5, bottom: 5 };
  // Background color by level
  if (obj.data.level === 1) {
    content.style.fill = '#FF6B6B'; // CEO - Red
  } else if (obj.data.level === 2) {
    content.style.fill = '#4ECDC4'; // Managers - Teal
  } else {
    content.style.fill = '#95E1D3'; // Staff - Green
  }
  // Create an image element for the employee image.
  let image = new ImageElement();
  image.width = 50;
  image.height = 50;
  image.style.strokeColor = 'none';
  image.source = obj.data.ImageUrl;
  image.id = obj.id + '_pic';

  content.children = [image];

  return content;
};
```
## Connector Generation

### Auto-connect Hierarchy

```javascript
diagram.dataSourceSettings = {
  id: 'id',
  parentId: 'manager',
  dataSource: new DataManager(employeeData)
};

// Connectors are automatically generated from parent-child relationships
// Each parent-child pair creates a connector
```

## Dynamic Data Updates

### Refresh from New Data

```javascript
import { DataManager } from '@syncfusion/ej2-data';

const updateDiagramData = (newData) => {
  diagram.dataSourceSettings.dataManager = new DataManager(newData);
  diagram.doLayout(); // if using automatic layout
};
```

### Add New Record

```javascript

import { DataManager } from '@syncfusion/ej2-data';

// Add
const addEmployee = (newEmployee) => {
  const current = diagram.dataSourceSettings.dataManager.dataSource.json; // local-array scenario
  diagram.dataSourceSettings.dataManager = new DataManager([...current, newEmployee]);
  diagram.doLayout();
};
```

### Remove Record

```javascript
// Remove
const removeEmployee = (employeeId) => {
  const current = diagram.dataSourceSettings.dataManager.dataSource.json;
  const filtered = current.filter(emp => emp.id !== employeeId);
  diagram.dataSourceSettings.dataManager = new DataManager(filtered);
  diagram.doLayout();
};
```

## Complete Data-Bound Example

```vue
<template>
  <ejs-diagram 
    id="diagram"
    :width="width"
    :height="height"
    :dataSourceSettings="dataSourceSettings"
    :layout="layout"
    :getNodeDefaults="getNodeDefaults"
    :getConnectorDefaults="getConnectorDefaults"
  ></ejs-diagram>
</template>

<script setup>
import { DiagramComponent as EjsDiagram } from '@syncfusion/ej2-vue-diagrams';

const width = '100%';
const height = '590px';

const dataSourceSettings = {
  id: 'Id',
  parentId: 'ReportingPerson',
  dataSource: [
    { Id: 1, Name: 'Steven Walker', ReportingPerson: null },
    { Id: 2, Name: 'Michael', ReportingPerson: 1 },
    { Id: 3, Name: 'Alex', ReportingPerson: 1 },
    { Id: 4, Name: 'Margaret', ReportingPerson: 2 }
  ]
};

const layout = {
  type: 'OrganizationalChart',
  horizontalSpacing: 50,
  verticalSpacing: 50
};

const getNodeDefaults = (node) => {
  node.width = 100;
  node.height = 60;
  node.style = { fill: '#6BA3D5', strokeWidth: 2 };
  node.annotations = [{
    content: node.data.Name,
    style: { color: '#ffffff', fontSize: 12 }
  }];
  return node;
};

const getConnectorDefaults = (connector) => {
  connector.type = 'Orthogonal';
  connector.style = { strokeColor: '#2E5090', strokeWidth: 2 };
  connector.targetDecorator = { shape: 'Arrow' };
  return connector;
};
</script>
```

Data binding transforms static diagrams into dynamic visualizations that automatically adapt to changing data, making Diagram perfect for org charts, hierarchies, and business process automation.
