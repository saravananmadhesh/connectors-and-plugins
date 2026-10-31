# Layouts in Syncfusion Vue Diagram

## Table of Contents
- [Overview](#overview)
- [Hierarchical Layout](#hierarchical-layout)
- [Organizational Chart](#organizational-chart)
- [Mindmap Layout](#mindmap-layout)
- [Radial Tree](#radial-tree-layout)
- [Flowchart Layout](#flowchart-layout)
- [Complex Hierarchical](#complex-hierarchical)
- [Layout Configuration](#layout-configuration)
- [Layout Events](#layout-events)

## Overview

Automatic layouts automatically position nodes based on relationships. Syncfusion provides multiple layout algorithms optimized for different diagram types and data structures.

## Hierarchical Layout

Arranges nodes in hierarchical levels based on parent-child relationships.

### Basic Hierarchical

```javascript
const layout = {
  type: 'HierarchicalTree',
  orientation: 'TopToBottom',          // TopToBottom, BottomToTop, LeftToRight, RightToLeft
  horizontalSpacing: 50,                // Space between nodes horizontally
  verticalSpacing: 50                   // Space between nodes vertically
};

diagram.layout = layout;
diagram.doLayout();
```

### Setup Hierarchical with Data

```javascript
const nodes = [
  { id: 'node1', width: 100, height: 60 },
  { id: 'node2', width: 100, height: 60 },
  { id: 'node3', width: 100, height: 60 }
];

const connectors = [
  { id: 'c1', sourceID: 'node1', targetID: 'node2' },
  { id: 'c2', sourceID: 'node1', targetID: 'node3' }
];

const layout = {
  type: 'HierarchicalTree',
  orientation: 'TopToBottom',
  enableAnimation: true,
  margin: { top: 20, bottom: 20, left: 20, right: 20 }
};

diagram.layout = layout;
diagram.doLayout();
```

## Organizational Chart

Specialized layout for org hierarchies:

```javascript
const layout = {
  type: 'OrganizationalChart',
  orientation: 'TopToBottom',
  horizontalSpacing: 100,
  verticalSpacing: 100
};

diagram.layout = layout;
diagram.doLayout();
```

### Org Chart from Data

```javascript
const dataSettings = {
  id: 'id',
  parentId: 'manager',
  dataSource: [
    { id: '1', name: 'CEO', manager: null },
    { id: '2', name: 'Manager', manager: '1' },
    { id: '3', name: 'Employee 1', manager: '2' },
    { id: '4', name: 'Employee 2', manager: '2' }
  ]
};

diagram.dataSourceSettings = dataSettings;
diagram.layout = { type: 'OrganizationalChart' };
diagram.doLayout();
```

## Mindmap Layout

Hierarchical layout with branches spreading from center:

```javascript
const layout = {
  type: 'MindMap',
  horizontalSpacing: 30,
  verticalSpacing: 30,
  enableAnimation: true
};

diagram.layout = layout;
diagram.doLayout();
```

### Mindmap Setup

```javascript
const nodes = [
  // Root node
  { id: 'root', width: 100, height: 60, annotations: [{ content: 'Central Idea' }] },
  
  // Branch nodes
  { id: 'branch1', width: 80, height: 50 },
  { id: 'branch2', width: 80, height: 50 },
  { id: 'subbranch1', width: 70, height: 40 }
];

const connectors = [
  { id: 'c1', sourceID: 'root', targetID: 'branch1' },
  { id: 'c2', sourceID: 'root', targetID: 'branch2' },
  { id: 'c3', sourceID: 'branch1', targetID: 'subbranch1' }
];

const layout = {
  type: 'MindMap',
  orientation: 'Horizontal'
};

diagram.layout = layout;
diagram.doLayout();
```

## Radial Tree Layout

Spreads nodes radially from center:

```javascript
const layout = {
  type: 'RadialTree',
  root: 'root',
  horizontalSpacing: 50,
  verticalSpacing: 50
};

diagram.layout = layout;
diagram.doLayout();
```

## Flowchart Layout

Optimized for flowchart diagrams:

```javascript
const layout = {
  type: 'FlowChart',
  orientation: 'TopToBottom',
  horizontalSpacing: 50,
  verticalSpacing: 50
};

diagram.layout = layout;
diagram.doLayout();
```

## Complex Hierarchical

For deeply nested or complex hierarchies:

```javascript
const layout = {
  type: 'ComplexHierarchicalTree',
  orientation: 'TopToBottom',
  enableAnimation: true,
  horizontalSpacing: 50,
  verticalSpacing: 50
};

diagram.layout = layout;
diagram.doLayout();
```

## Layout Configuration

### Common Layout Options

```javascript
const layoutConfig = {
  type: 'HierarchicalTree',
  orientation: 'TopToBottom',              // Direction
  horizontalSpacing: 50,                   // Horizontal gap
  verticalSpacing: 60,                     // Vertical gap
  enableAnimation: true,                   // Animate layout
  margin: {                                // Padding around layout
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
  },
  getLayoutInfo: (tree) => {
    // Customize per-node layout
    if (!tree.hasSubTree) {
      tree.orientation = 'vertical';
      tree.type = 'alternate';
    }
  }
};
```

### Margin and Padding

```javascript
const layout = {
  type: 'HierarchicalTree',
  margin: { top: 30, left: 30, right: 30, bottom: 30 },
  horizontalSpacing: 50,
  verticalSpacing: 60
};
```

### Orientation Options

```javascript
// All available orientations:
const orientations = [
  'TopToBottom',    // Default: top to bottom
  'BottomToTop',    // Reverse vertical
  'LeftToRight',    // Left to right
  'RightToLeft'     // Right to left (mirror)
];

const layout = {
  type: 'HierarchicalTree',
  orientation: 'LeftToRight'
};
```

## Layout Events

### Layout Changes

```javascript
diagram.layoutUpdated = (args) => {
  if (args.state === 'Started') {
    console.log('Layout started rendering');
  } else if (args.state === 'Completed') {
    console.log('Layout rendering completed');
  }
};
```

### Node Arrangement

```javascript
const layout = {
  type: 'HierarchicalTree',
  getLayoutInfo: (tree) => {
    if (!tree.hasSubTree) {
      tree.orientation = 'vertical';
      tree.type = 'alternate';
    }
  }
};
```

### Programmatic Layout Application

```javascript
// Apply layout
diagram.layout = {
  type: 'HierarchicalTree',
  orientation: 'TopToBottom'
};

// Start layout
diagram.doLayout();

// Refresh diagram
diagram.refresh();
```

### Change Layout Dynamically

```javascript
// Switch from hierarchical to flowchart
const switchLayout = () => {
  diagram.layout = {
    type: 'FlowChart',
    orientation: 'LeftToRight'
  };
  diagram.doLayout();
};
```

## Complete Layout Example

```vue
<template>
  <div>
    <button @click="applyHierarchical">Hierarchical</button>
    <button @click="applyOrgChart">Org Chart</button>
    <ejs-diagram 
      ref="diagramRef"
      :nodes="nodes"
      :connectors="connectors"
      :layout="layout"
    ></ejs-diagram>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DiagramComponent as EjsDiagram } from '@syncfusion/ej2-vue-diagrams';

const diagramRef = ref();
const layout = ref({ type: 'HierarchicalTree', orientation: 'TopToBottom' });

const nodes = [
  { id: 'node1', width: 100, height: 60 },
  { id: 'node2', width: 100, height: 60 },
  { id: 'node3', width: 100, height: 60 }
];

const connectors = [
  { id: 'c1', sourceID: 'node1', targetID: 'node2' },
  { id: 'c2', sourceID: 'node1', targetID: 'node3' }
];

const applyHierarchical = () => {
  layout.value = { type: 'HierarchicalTree', orientation: 'TopToBottom' };
  diagramRef.value.doLayout();
};

const applyOrgChart = () => {
  layout.value = { type: 'OrganizationalChart', orientation: 'TopToBottom' };
  diagramRef.value.doLayout();
};
</script>
```

Layouts automatically arrange complex diagrams, saving time and ensuring readable, organized visualizations.
