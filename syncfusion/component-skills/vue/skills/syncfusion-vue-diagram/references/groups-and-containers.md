# Groups and Containers in Syncfusion Vue Diagram

## Overview

Groups and containers organize related nodes within your diagram. Groups are logical collections of nodes that can be manipulated together. Containers provide boundaries and layout regions for nested content.

## Grouping Nodes

### Create a Group

```javascript
const group = {
  id: 'group1',
  children: ['node1', 'node2', 'node3'],  // IDs of nodes to group
  width: 300,
  height: 200,
  offsetX: 150,
  offsetY: 100
};

// Individual nodes
const nodes = [
  { id: 'node1', width: 60, height: 60, offsetX: 50, offsetY: 50 },
  { id: 'node2', width: 60, height: 60, offsetX: 150, offsetY: 50 },
  { id: 'node3', width: 60, height: 60, offsetX: 100, offsetY: 150 }
];
```

### Group with Visual Representation

```javascript
const styledGroup = {
  id: 'container',
  children: ['node1', 'node2'],
  width: 300,
  height: 200,
  offsetX: 150,
  offsetY: 100,
  style: {
    fill: '#f9f9f9',
    strokeColor: '#cccccc',    // FIXED: stroke → strokeColor
    strokeWidth: 2,
    strokeDashArray: '5,5'     // Dashed border
  },
  annotations: [
    {
      content: 'Group Label',
      offset: { x: 0, y: 0 },
      margin: { left: 10, top: 10 }
    }
  ]
};
```

## Group Operations

### Add Nodes to Group

```javascript
// Individual nodes
const nodes = [
  { id: 'node1', width: 60, height: 60, offsetX: 50, offsetY: 50 },
  { id: 'node2', width: 60, height: 60, offsetX: 150, offsetY: 50 },
];

// Multiple nodes
diagram.selectAll();
diagram.group();
diagram.dataBind();
```

### Remove Nodes from Group

```javascript
// Step 1: Create two nodes
const nodes = [
  { id: 'node1', width: 80, height: 50, offsetX: 100, offsetY: 100 },
  { id: 'node2', width: 80, height: 50, offsetX: 250, offsetY: 100 }
];

// Step 2: Add nodes to the diagram
diagram.add(nodes[0]);
diagram.add(nodes[1]);

// Step 3: Group the two nodes
diagram.select([nodes[0], nodes[1]]);
const group = diagram.group();   // returns the created group node

// Step 4: Ungroup them
diagram.unGroup(group);

```

### Programmatic Group Management

```javascript
// Create group from selected nodes
const selectedNodes = diagram.selectedItems.nodes;
if (selectedNodes.length > 1) {
  const groupId = 'group-' + Date.now();
  diagram.add({
    id: groupId,
    children: selectedNodes.map(n => n.id),
    width: 300,
    height: 200
  });
}

// Select group
const group = diagram.nodes.find(n => n.id === 'group1');
diagram.select([group]);

// Ungroup (use EJ2 API instead of manually clearing children)
diagram.unGroup(group);
```

## Container Nodes

Containers are specialized groups with layout capabilities:

```javascript
const container = {
  id: 'container1',
  width: 400,
  height: 300,
  offsetX: 200,
  offsetY: 150,

  // FIXED: Containers must use shape: { type: 'Container', ... }
  shape: {
    type: 'Container',          // Required for container behavior
  },


  style: {
    fill: '#e8e8e8',
    strokeColor: '#333333',     // FIXED: stroke → strokeColor
    strokeWidth: 2
  }
};
```

### Add Container with children

```javascript
let nodes = [
  // First rectangle node
  {
    id: 'node1',
    // Margin from the left and top
    margin: { left: 50, top: 30 },
    width: 100, height: 100,
    style: { fill: 'white', strokeColor: '#2546BB', strokeWidth: 1 },
    shape: { type: 'Basic', shape: 'Rectangle', cornerRadius: 4 },
    annotations: [{ content: 'Node 1'}]
  },
  // Second rectangle node
  {
    id: 'node2',
    // Margin from the left and top
    margin: { left: 200, top: 130 },
    width: 100, height: 100,
    style: { fill: 'white', strokeColor: '#2546BB', strokeWidth: 1 },
    shape: { type: 'Basic', shape: 'Rectangle', cornerRadius: 4 },
    annotations: [{ content: 'Node 2'}]
  },
  // Container node configuration to contain node1 and node2
  {
    id: 'container',
    width: 350, height: 280, // Width and height of the container
    offsetX: 250, offsetY: 250, // Position of the container
    shape: {
      // Define the type as a container
      type: 'Container',
      // Includes node1 and node2 as children
      children: ['node1', 'node2'],
    },
    // Style properties for the container
    style: { fill: '#E9EEFF', strokeColor: '#2546BB', strokeWidth: 1 }
  },
];
```

## Setting a Header


```javascript
let nodes: NodeModel[] = [
  {
    id: 'node1',
    margin: { left: 50, top: 30 },
    width: 100, height: 100,
    style: { fill: '#357BD2', strokeColor: 'white' },
    annotations: [{ content: 'Node 1', style: { color: 'white', fontFamily: 'Arial'} }],
  },
  {
    id: 'node2',
    margin: { left: 200, top: 130 },
    width: 100, height: 100,
    style: { fill: '#357BD2', strokeColor: 'white' },
    annotations: [{ content: 'Node 2', style: { color: 'white', fontFamily: 'Arial'} }],
  },
  // Container Node
  {
    id: 'container',
    // Container Size
    width: 350, height: 300,
    // Container Position
    offsetX: 250, offsetY: 250,
    // Define Shape
    shape: {
      // Set type as Container
      type: 'Container',
      // Define header for container
      header: {
        annotation: {
          content: 'Container Title',
          // Style of container title text
          style: { fontSize: 18, bold: true, color: 'white' },
        },
        // Height of container header
        height: 40,
        // Style of container header
        style: { fill: '#3c63ac', strokeColor: '#30518f' },
      },
      // children of container
      children: ['node1', 'node2'],
    },
    // style of container
    style: { fill: 'white', strokeColor: '#30518f', strokeDashArray: '4 4' },
  },
];
```

## Container Constraints

### Prevent Node Resizing in Container

```javascript
const restrictedContainer = {
  id: 'container',
  shape: {
      type: 'Container',
      // children of container
      children: ['node1', 'node2'],
    },
  width: 300,
  height: 200,
  constraints: NodeConstraints.Default & ~NodeConstraints.Resize
};
```

### Lock Container Position

```javascript
const lockedContainer = {
  id: 'container',
  shape: {
      type: 'Container',
      // children of container
      children: ['node1', 'node2'],
    },
  width: 300,
  height: 200,
  constraints: NodeConstraints.Default & ~NodeConstraints.Drag
};
```

## Group/Container Events

### Selection

```javascript
diagram.selectionChange = (args) => {
  if (args.source.children && args.source.children.length > 0) {
    console.log('Group/Container selected:', args.source.id);
  }
};
```



Groups and containers provide powerful organizational tools for managing complex diagrams with nested hierarchies and logical grouping.
