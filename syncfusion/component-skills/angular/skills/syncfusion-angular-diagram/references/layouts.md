# Layouts

## Table of Contents
- [Overview](#overview)
- [Hierarchical Tree](#hierarchical-tree)
- [Organizational Chart](#organizational-chart)
- [Mindmap Layout](#mindmap-layout)
- [Radial Tree](#radial-tree)
- [Flowchart Layout](#flowchart-layout)
- [Complex Hierarchical Tree](#complex-hierarchical-tree)
- [Configuration and Customization](#configuration-and-customization)
- [Layout Events](#layout-events)

## Overview

**Layouts** automatically position nodes and connectors based on hierarchical or structural relationships.

### Layout Types

| Layout | Use Case |
|--------|----------|
| **HierarchicalTree** | Tree hierarchies (org-charts, family trees) |
| **OrganizationalChart** | Organizational structures with swimlanes |
| **MindMap** | Brainstorming and idea mapping |
| **RadialTree** | Nodes arranged in circular pattern |
| **Flowchart** | Sequential processes with swimlanes |
| **ComplexHierarchicalTree** | Multiple roots or complex trees |

---

## Hierarchical Tree

### Purpose

Arranges nodes in top-to-bottom, bottom-to-top, left-to-right, or right-to-left hierarchies.

### Enable Module

```typescript
import { Diagram, HierarchicalTree } from '@syncfusion/ej2-angular-diagrams';

Diagram.Inject(HierarchicalTree);
```

### Basic Configuration

```typescript
layout: {
  type: 'HierarchicalTree',
  orientation: 'TopToBottom',  // TopToBottom, BottomToTop, LeftToRight, RightToLeft
  horizontalSpacing: 50,
  verticalSpacing: 50
}
```

### Orientations

```typescript
orientation: 'TopToBottom'    // Root at top, children below
orientation: 'BottomToTop'    // Root at bottom, children above
orientation: 'LeftToRight'    // Root at left, children to right
orientation: 'RightToLeft'    // Root at right, children to left
```

### Spacing Configuration

```typescript
layout: {
  type: 'HierarchicalTree',
  orientation: 'TopToBottom',
  horizontalSpacing: 80,       // Space between siblings
  verticalSpacing: 60,         // Space between levels
  margin: {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10
  }
}
```

---

## Organizational Chart

### Purpose

Specialized hierarchical layout for organizational structures with swimlanes showing reporting relationships.

### Enable Module

```typescript
import { Diagram, HierarchicalTree } from '@syncfusion/ej2-angular-diagrams';

Diagram.Inject(HierarchicalTree);
```

### Configuration

```typescript
layout: {
  type: 'OrganizationalChart',
  horizontalSpacing: 100,
  verticalSpacing: 80
}
```

### Org-Chart Example

```typescript
// Parent/child relationship via parentId
let item = [
    { id: 'ceo', parentId: null, name: 'CEO' },
    { id: 'cto', parentId: 'ceo', name: 'CTO' },
    { id: 'dev1', parentId: 'cto', name: 'Developer 1' },
    { id: 'dev2', parentId: 'cto', name: 'Developer 2' }
  ]
let dataSourceSettings = {
  id: 'id',
  parentId: 'parentId',
  dataManager: new DataManager(item)
}
```

---
*Note*: For organizational charts, set `layout.type` to `OrganizationalChart`. This layout is built on top of the `HierarchicalTree` module, so you must still inject the `HierarchicalTree` module for it to work correctly.
 

## Mindmap Layout

### Purpose

Arranges nodes radially around a central topic with branches representing sub-topics.

### Enable Module

```typescript
import { Diagram, MindMap } from '@syncfusion/ej2-angular-diagrams';

Diagram.Inject(MindMap);
```

### Configuration

```typescript
layout: {
  type: 'MindMap',
  horizontalSpacing: 50,
  verticalSpacing: 50
}
```

### Structure

```typescript
// Central node (root)
nodes: [
  {
    id: 'central',
    shape: { type: 'Basic', shape: 'Ellipse' },
    annotations: [{ content: 'Main Topic' }]
  },
  // Child nodes (first level branches)
  {
    id: 'branch1',
    shape: { type: 'Basic', shape: 'Rectangle' }
  },
  // Grandchild nodes (second level branches)
  {
    id: 'subbranch1',
    shape: { type: 'Basic', shape: 'Rectangle' }
  }
]

// Connectors link parent → child relationship
connectors: [
  { id: 'conn1', sourceID: 'central', targetID: 'branch1' },
  { id: 'conn2', sourceID: 'branch1', targetID: 'subbranch1' }
]
```

---

## Radial Tree

### Purpose

Arranges nodes in concentric circles around a central node.

### Enable Module

```typescript
import { Diagram, RadialTree } from '@syncfusion/ej2-angular-diagrams';

Diagram.Inject(RadialTree);
```

### Configuration

```typescript
layout: {
  type: 'RadialTree',
  horizontalSpacing: 50,
  verticalSpacing: 50
}
```

---

## Flowchart Layout

### Purpose

Arranges nodes left-to-right or top-to-bottom for sequential processes.

### Enable Module

```typescript
import { Diagram, FlowchartLayout} from '@syncfusion/ej2-angular-diagrams';
Diagram.Inject(FlowchartLayout);
// No separate module needed, but swimlanes recommended
```

### Configuration

```typescript
layout: {
  type: 'Flowchart',
  orientation: 'TopToBottom',
  horizontalSpacing: 60,
  verticalSpacing: 60
}
```

---

## Complex Hierarchical Tree

### Purpose

Handles multiple root nodes or non-standard hierarchies (e.g., dependency graphs).

### Enable Module

```typescript
import { Diagram, ComplexHierarchicalTree } from '@syncfusion/ej2-angular-diagrams';

Diagram.Inject(ComplexHierarchicalTree);
```

### Configuration

```typescript
layout: {
  type: 'ComplexHierarchicalTree',
  orientation: 'TopToBottom',
  horizontalSpacing: 80,
  verticalSpacing: 80
}
```

### Multiple Roots

```typescript
// Multiple nodes with no parent
nodes: [
  { id: 'root1', ... },
  { id: 'root2', ... },
  { id: 'child1', parentId: 'root1', ... },
  { id: 'child2', parentId: 'root2', ... }
]
```

---

## Configuration and Customization

### DoLayout

Trigger layout calculation:

```typescript
// Define layout
diagram.layout = {
  type: 'HierarchicalTree',
  orientation: 'TopToBottom',
  horizontalSpacing: 50,
  verticalSpacing: 50
};

// Apply to nodes
diagram.doLayout();
```

---

## Layout Events

### Layout Completed

```typescript
diagram.layoutUpdated((args) => {
  if (args.state === 'Completed') {
    console.log('Layout rendering completed');
  }
});
```

### Node Positioning Changed

```typescript
diagram.positionChange((args) => {
  if (args.state === 'Completed') {
    console.log('Node repositioned:', args.element);
  }
});
```

---

## Example: Org-Chart

```typescript
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent,Diagram, HierarchicalTree,ConnectorModel,NodeModel } from '@syncfusion/ej2-angular-diagrams';
import { DataManager, Query } from '@syncfusion/ej2-data';

Diagram.Inject(HierarchicalTree);
@Component({
  imports: [ DiagramModule ],
  selector: 'app-org-chart',
  template: `
    <ejs-diagram #diagram 
      [layout]="layout"
      [dataSourceSettings]="dataSourceSettings"
      [getNodeDefaults]="getNodeDefaults"
      [getConnectorDefaults]="getConnectorDefaults">
    </ejs-diagram>
  `,
  providers: [HierarchicalTreeService]
})
export class OrgChartComponent {
  layout = {
    type: 'OrganizationalChart',
    horizontalSpacing: 100,
    verticalSpacing: 80
  };
  data  = [
    { id: 'ceo', parentId: null, name: 'CEO' },
    { id: 'cto', parentId: 'ceo', name: 'CTO' },
    { id: 'dev1', parentId: 'cto', name: 'Developer 1' }
  ];
  dataSourceSettings = {
    id: 'id',
    parentId: 'parentId',
    dataManager: new DataManager(data)
  };

  getNodeDefaults = (node:NodeModel) => ({
    node.width = 75;
    node.height = 40;
    node.shape: { type: 'Flow', shape: 'Process' }
    return node;
  });

  getConnectorDefaults = (connector:ConnectorModel) => ({
     connector.type = 'Orthogonal';
     return connector;
  });
}
```

---

**→ Next: Structure diagrams with [swimlanes](swimlanes.md)**
