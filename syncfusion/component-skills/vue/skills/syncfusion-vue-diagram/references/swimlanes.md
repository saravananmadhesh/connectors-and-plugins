# Swimlanes in Syncfusion Vue Diagram

## Table of Contents
- [Overview](#overview)
- [Swimlane Structure](#swimlane-structure)
- [Creating Lanes](#creating-lanes)
- [Phases](#phases)
- [Swimlane Children](#swimlane-children)
- [Swimlane Palette](#swimlane-palette)
- [Swimlane Interaction](#swimlane-interaction)

## Overview

Swimlanes organize diagram elements into horizontal or vertical lanes, typically representing different actors, departments, or processes. They are commonly used in BPMN and process diagrams to show responsibilities and handoffs.

## Swimlane Structure

### Basic Swimlane Node

```javascript
const nodes = [
  {
    id: 'swimlane1',
    offsetX: 300,
    offsetY: 200,
    width: 600,
    height: 200,
    shape: {
      type: 'SwimLane',
      orientation: 'Horizontal', // 'Horizontal' or 'Vertical'
      header: {
        annotation: { content: 'Department' },
        width: 50,
        height: 200
      },
      lanes: [
        {
          id: 'lane1',
          height: 100,
          header: { annotation: { content: 'Finance' }, width: 50 }
        },
        {
          id: 'lane2',
          height: 100,
          header: { annotation: { content: 'Operations' }, width: 50 }
        }
      ]
    }
  }
];
```

### Vertical Swimlane

```javascript
const verticalSwimLane = {
  id: 'swimlane-vertical',
  width: 200,
  height: 600,
  shape: {
    type: 'SwimLane',
    orientation: 'Vertical',             // Top-to-bottom swim lane
    header: {
      width: 200,
      height: 50,
      annotation: { content: 'Process Flow' }
    }
  },
  lanes: [
    { id: 'vlane1', width: 200, height: 150, header: { annotation: { content: 'Step 1' } } },
    { id: 'vlane2', width: 200, height: 150, header: { annotation: { content: 'Step 2' } } },
    { id: 'vlane3', width: 200, height: 150, header: { annotation: { content: 'Step 3' } } }
  ]
};
```

## Creating Lanes

### Horizontal Lanes

```javascript
const nodes = [
  {
    id: 'process',
    offsetX: 400,
    offsetY: 200,
    width: 800,
    height: 300,
    shape: {
      type: 'SwimLane',
      orientation: 'Horizontal',
      header: {
        annotation: { content: 'Workflow' },
        width: 50,
        height: 300
      },
      lanes: [
        {
          id: 'management',
          height: 100,
          header: { annotation: { content: 'Management', style: { bold: true } }, width: 50 }
        },
        {
          id: 'coordination',
          height: 100,
          header: { annotation: { content: 'Coordination' }, width: 50 }
        },
        {
          id: 'execution',
          height: 100,
          header: { annotation: { content: 'Execution' }, width: 50 }
        }
      ]
    }
  }
];
```

### Lane Properties

```javascript
const lane = {
  id: 'lane1',
  height: 100,
  header: {
    annotation: { content: 'Lane Name', style: { fontSize: 12, bold: true } },
    width: 50,
    height: 100
  },
  style: {
    fill: '#f5f5f5', // Lane background
    stroke: '#cccccc',
    strokeWidth: 1
  }
};
```

## Phases

Phases divide lanes into time-based or process-based sections:

```javascript
const nodes = [
  {
    id: 'swimlane',
    offsetX: 400,
    offsetY: 200,
    width: 800,
    height: 200,
    shape: {
      type: 'SwimLane',
      orientation: 'Horizontal',
      lanes: [
        {
          id: 'lane1',
          height: 200,
          header: { annotation: { content: 'Employee' }, width: 50 }
        }
      ],
      phases: [
        { id: 'phase1', offset: 250, header: { annotation: { content: 'Planning' } } },
        { id: 'phase2', offset: 500, header: { annotation: { content: 'Execution' } } },
        { id: 'phase3', offset: 750, header: { annotation: { content: 'Review' } } }
      ],
      phaseSize: 20
    }
  }
];
```

### Phase Configuration

```javascript
const phase = {
  id: 'dataPhase',
  offset: 300,
  header: {
    annotation: { content: 'Data Collection', style: { fontSize: 11, bold: true } },
    width: 50
  },
  style: {
    fill: 'none',
    stroke: '#999999',
    strokeWidth: 2
  }
};
```

## Swimlane Children

Add nodes and connectors to swimlanes:

```javascript
const swimlaneWithContent = {
  id: 'swimlane',
  width: 800,
  height: 200,
  shape: { type: 'SwimLane', orientation: 'Horizontal' },
  
  // Child nodes within the swimlane
  children: ['node1', 'node2', 'node3']
};

const childNodes = [
  {
    id: 'node1',
    width: 100,
    height: 60,
    offsetX: 150,
    offsetY: 100,
    shape: { type: 'Flow', shape: 'Process' },
    annotations: [{ content: 'Start' }]
  },
  {
    id: 'node2',
    width: 100,
    height: 60,
    offsetX: 350,
    offsetY: 100,
    shape: { type: 'Flow', shape: 'Process' }
  },
  {
    id: 'node3',
    width: 100,
    height: 60,
    offsetX: 550,
    offsetY: 100,
    shape: { type: 'Flow', shape: 'Process' }
  }
];

const connectors = [
  { id: 'c1', sourceID: 'node1', targetID: 'node2' },
  { id: 'c2', sourceID: 'node2', targetID: 'node3' }
];
```

### Add Nodes to Swimlane Programmatically

```javascript
const swimlaneNode = diagram.nodes.find(n => n.id === 'swimlane');
swimlaneNode.children.push('newNode');

diagram.add({
  id: 'newNode',
  offsetX: 400,
  offsetY: 100,
  width: 100,
  height: 60,
  shape: { type: 'Flow', shape: 'Process' }
});

diagram.refresh();
```

## Swimlane Palette

### Symbol Palette Setup

```vue
<template>
  <ejs-symbol-palette 
    id="symbolPalette"
    :palettes="palettes"
    :width="width"
    :height="height"
  ></ejs-symbol-palette>
</template>

<script setup>
import { SymbolPaletteComponent as EjsSymbolPalette } from '@syncfusion/ej2-vue-diagrams';

const palettes = [
  {
    name: 'Swimlanes',
    symbols: [
      {
        id: 'swimlane',
        shape: {
          type: 'SwimLane',
          orientation: 'Horizontal',
          header: { annotation: { content: 'Horizontal' } },
          lanes: [
            { id: 'lane1', height: 60, header: { annotation: { content: 'Lane' } } }
          ],
          phases: [
            { id: 'phase1', offset: 60, header: { annotation: { content: 'Phase' } } }
          ],
          phaseSize: 20
        },
        width: 300,
        height: 150
      },
      {
        id: 'vswimlane',
        shape: {
          type: 'SwimLane',
          orientation: 'Vertical',
          header: { annotation: { content: 'Vertical' } },
          lanes: [
            { id: 'vlane1', height: 60, header: { annotation: { content: 'Lane' } } }
          ],
          phases: [
            { id: 'vphase1', offset: 60, header: { annotation: { content: 'Phase' } } }
          ],
          phaseSize: 20
        },
        width: 150,
        height: 300
      }
    ]
  }
];
</script>
```

## Swimlane Interaction

### Resize Swimlane

```javascript
// Programmatically resize
const swimlane = diagram.nodes.find(n => n.id === 'swimlane1');
swimlane.width = 1000;
swimlane.height = 400;
diagram.refresh();
```

### Move Nodes Between Lanes

```javascript
// Drag node from one lane to another
const node = diagram.nodes.find(n => n.id === 'node1');
node.offsetY = 300;  // Move to different lane
diagram.refresh();
```

### Lock Lanes

```javascript
import { NodeConstraints } from '@syncfusion/ej2-vue-diagrams';
const swimlane = diagram.nodes.find(n => n.id === 'swimlane');
swimlane.constraints = NodeConstraints.Default & ~NodeConstraints.Resize;
```

### Swimlane Events

```javascript
diagram.swimlaneResized = (args) => {
  console.log('Swimlane resized:', args.source);
};

diagram.swimlaneChildAdded = (args) => {
  console.log('Child added to swimlane:', args.node);
};

diagram.swimlaneChildRemoved = (args) => {
  console.log('Child removed from swimlane:', args.node);
};
```

### Dynamic Swimlane Management

```javascript
// Add phase to swimlane
const phase = {
  id: 'newPhase',
  width: 200,
  header: { annotation: { content: 'New Phase' } }
};
swimlane.phases.push(phase);
diagram.refresh();

// Remove phase
swimlane.phases = swimlane.phases.filter(p => p.id !== 'phaseToRemove');
diagram.refresh();
```

Swimlanes effectively organize complex process diagrams by showing parallel activities and responsibilities across different actors or departments.
