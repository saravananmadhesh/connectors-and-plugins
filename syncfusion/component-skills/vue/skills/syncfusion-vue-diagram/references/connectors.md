# Connectors in Syncfusion Vue Diagram

## Table of Contents
- [Overview](#overview)
- [Connector Types](#connector-types)
- [Connecting Nodes](#connecting-nodes)
- [Connector Segments](#connector-segments)
- [Auto Routing](#auto-routing)
- [Avoid Overlap](#avoid-overlap)
- [Connector Customization](#connector-customization)
- [Connector Events](#connector-events)
- [getConnectorDefaults Pattern](#getconnectordefaults-pattern)

## Overview

Connectors are lines that link nodes together. They define relationships and flows between diagram elements. Syncfusion supports three main connector types with various customization options.

## Connector Types

### Straight Connector

Draws a direct straight line between source and target nodes:

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Straight'
};
```

### Orthogonal Connector

Routes the line horizontally and vertically, ideal for flowcharts:

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Orthogonal',
  segments: [
    { type: 'Orthogonal', direction: 'Right', length: 50 },
    { type: 'Orthogonal', direction: 'Bottom', length: 50 }
  ]
};
```

### Bezier Connector

Bezier connectors provide smooth curves with control points.

### Basic Bezier

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Bezier',
  segments: [
    { type: 'Bezier' }
  ]
};
```

## Connecting Nodes

### Basic Connection

```javascript
const connectors = [
  {
    id: 'connector1',
    sourceID: 'node1',           // Source node ID
    targetID: 'node2',           // Target node ID
    type: 'Orthogonal'
  }
];
```

### Connection with Ports

Connect to specific ports on nodes:

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  sourcePortID: 'port1',         // Source port ID
  targetID: 'node2',
  targetPortID: 'port2',         // Target port ID
  type: 'Orthogonal'
};
```

### Connection with Point

Connect from/to specific coordinates:

```javascript
const connector = {
  id: 'connector1',
  sourcePoint: { x: 100, y: 100 },     // Direct point
  targetPoint: { x: 300, y: 300 },
  type: 'Straight'
};
```

### Add Connectors Programmatically

```javascript
// Add single connector
diagram.add({
  id: 'newConnector',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Orthogonal'
});

// Add multiple connectors
const connectors = [
  { id: 'c1', sourceID: 'node1', targetID: 'node2', type: 'Orthogonal' },
  { id: 'c2', sourceID: 'node2', targetID: 'node3', type: 'Orthogonal' }
];
diagram.addElements(connectors);
```

## Connector Segments

Segments define the path the connector takes. They allow fine control over connector routing.

### Straight Segments

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Straight',
  segments: [
    {
      type: 'Straight', 
      sourcePoint: { x: 100, y: 100 },
      targetPoint: { x: 200, y: 200 }
    }
  ]
};
```

#### Straight Segment Editing

End point of each straight segment is represented by a thumb that enables to edit the segment.
Any number of new segments can be inserted into a straight line by clicking when Shift and Ctrl keys are pressed (Ctrl+Shift+Click).
Straight segments can be removed by clicking the segment end point when Ctrl and Shift keys are pressed (Ctrl+Shift+Click).

```vue
<template>
<div id="app">
<button @click="editSegment">editSegment</button>
    <ejs-diagram ref="diagram" :width='width' :height='height' :connectors='connectors'></ejs-diagram>
</div>
</template>
<script>
import { DiagramComponent,ConnectorConstraints,ConnectorEditing } from '@syncfusion/ej2-vue-diagrams';

let connectors = [{
id: "connector1",
constraints:
ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb,
// Defines the segment type of the connector
segments: [
      {
        type: 'Straight',
        // Defines the point of the segment
        point: {
          x: 100,
          y: 150,
        },
      },
    ],
type: 'Straight',
sourcePoint: { x: 150, y: 100 },
targetPoint: { x: 340, y: 200 },
}]
export default {
name: "App",
components: {
    "ejs-diagram": DiagramComponent
},
data() {
    return {
        width: "100%",
        height: "350px",
        connectors: connectors
    }
},

mounted: function () {
  const diagramInstance = this.$refs.diagram.ej2Instances;
  diagramInstance.select([diagramInstance.connectors[0]])
},
methods :{
  editSegment () {
    let diagramInstance = this.$refs.diagram.ej2Instances;
    let options = {};
    options.SegmentEditing = 'Toggle';
    options.point = { x: 220, y: 150 };
    options.connector = diagramInstance.connectors[0];
    options.hitPadding = diagramInstance.connectors[0].hitPadding;
    diagramInstance.editSegment(options);
  }
}, provide: {
  diagram: [ConnectorEditing]
}
}
</script>
<style>
  @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css";
</style>

```

### Orthogonal Segments

Orthogonal thumbs allow you to adjust the length of adjacent segments by clicking and dragging them.
When necessary, some segments are added or removed automatically, while dragging the segment.

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Orthogonal',
  segments: [
    { type: 'Orthogonal', direction: 'Right', length: 100 },
    { type: 'Orthogonal', direction: 'Down', length: 75 },
    { type: 'Orthogonal', direction: 'Right', length: 50 }
  ]
};
```

### Bezier Segments

Smooth curved line connecting nodes:

```javascript
const connector = {
  id: 'connector',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Bezier',
  segments: [
    { type: 'Bezier' }
  ]
};
```

#### Bezier with Control Points

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Bezier',
  segments: [
    {
      type: 'Bezier',
      point1: { x: 150, y: 150 },   // First control point
      point2: { x: 350, y: 150 }    // Second control point
    }
  ]
};
```

#### Bezier with Vector Points

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Bezier',
  segments: [
    {
      type: 'Bezier',
      vector1: { distance: 100, angle: 90 },   // First vector point
      vector2: { distance: 45, angle: 270 },   // Second vector point
    }
  ]
};
```

#### Allow segment reset

```javascript
let connector = {
  id: 'connector1',
  sourceID: 'Start',
  targetID: 'End',
  type: 'Bezier',
  segments: [
    {
      type: 'Bezier',
      point1: { x: 450, y: 150 },
      point2: { x: 250, y: 250 },
    },
  ],
  //Prevent segment reset whil moving source or target node.
  bezierSettings: { allowSegmentsReset: false },
  constraints : ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb
};
```

#### Bezier Control points - BezierSmoothness 

```javascript
let connector = {
  id: "connector1",
  targetDecorator: { shape: 'None' },
  // ID of the source and target nodes
  sourceID: 'Start',
  sourcePortID: 'StartPort',
  targetID: 'End',
  targetPortID: 'EndPort',
  type: 'Bezier',
  // Configuring settings for bezier interactions
  bezierSettings: {
  smoothness: BezierSmoothness.SymmetricAngle,  //SymmetricDistance | SymmetricAngle | Default | None
  },
  constraints : ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb
};
```

#### Show/Hide Bezier Control points  

```javascript
let connector = {
  id: "connector1",
  targetDecorator: { shape: 'None' },
  // ID of the source and target nodes
  sourceID: 'Start',
  sourcePortID: 'StartPort',
  targetID: 'End',
  targetPortID: 'EndPort',
  type: 'Bezier',
  // Configuring settings for bezier interactions
  bezierSettings: {
  controlPointsVisibility: ControlPointsVisibility.Source,  // None | Source | Target | Intermediate | All
  },
  constraints : ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb
};
```

#### Bezier Edit Orientation

Adjust how bezier handles are edited:

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Bezier',
  bezierSettings: {
    segmentEditOrientation: 'FreeForm',  //Bidirectional | FreeForm
  },
  constraints : ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb
};
```

### Multiple Segments

```vue
<template>
<div id="app">
    <ejs-diagram id="diagram" :width='width' :height='height' :connectors='connectors'></ejs-diagram>
</div>
</template>
<script>
import { DiagramComponent,ConnectorConstraints,ConnectorEditing } from '@syncfusion/ej2-vue-diagrams';

let connectors = [
{
  id: 'connector1',
  type: 'Orthogonal',
  // Defines multile segemnts for the connectors
  segments: [
    {
      type: 'Orthogonal',
      direction: 'Bottom',
      length: 150,
    },
    {
      type: 'Orthogonal',
      direction: 'Right',
      length: 150,
    },
    {
      type: 'Orthogonal',
      direction: 'Top',
      length: 100,
    },
    {
      type: 'Orthogonal',
      direction: 'Left',
      length: 100,
    },
  ],
  sourcePoint: {
    x: 300,
    y: 100,
  },
  targetPoint: {
    x: 350,
    y: 150,
  },
  constraints:
    ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb,
}, {
  id: 'connector2',
  type: 'Bezier',
  constraints:
    ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb,
  segments: [
    { point: { x: 150, y: 150 }, type: 'Bezier' },
    { point: { x: 250, y: 250 }, type: 'Bezier' },
  ],
  sourcePoint: { x: 100, y: 100 },
  targetPoint: { x: 300, y: 300 },
}, {
  id: 'connector3',
  type: 'Straight',
  constraints:
    ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb,
  segments: [
    { point: { x: 500, y: 200 }, type: 'Straight' },
    { point: { x: 600, y: 300 }, type: 'Straight' },
  ],
  sourcePoint: { x: 600, y: 100 },
  targetPoint: { x: 800, y: 300 },
  
},
]
export default {
name: "App",
components: {
"ejs-diagram": DiagramComponent
},
data() {
return {
    width: "100%",
    height: "350px",
    connectors: connectors
}
}, provide: {
diagram: [ConnectorEditing]
}
}
</script>

<style>
  @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css";
</style>
```

## Auto Routing

Segments automatically adjust based on node positions:

```vue
<template>
  <div id="app">
    <ejs-diagram id="diagram" :width='width' :height='height' :constraints='constraints' :nodes='nodes'
      :connectors='connectors' :getNodeDefaults='getNodeDefaults'></ejs-diagram>
  </div>
</template>

<script>
import { DiagramComponent, LineRouting, Diagram, DiagramConstraints } from '@syncfusion/ej2-vue-diagrams';

let nodes = [
  { id: 'shape1', offsetX: 100, offsetY: 100, width: 120, height: 50 },
  { id: 'shape2', offsetX: 300, offsetY: 300, width: 120, height: 50 },
  { id: 'shape3', offsetX: 150, offsetY: 200, width: 120, height: 50 }
];
let connectors = [
  { id: 'connector', sourceID: 'shape1', targetID: 'shape2', type: 'Orthogonal' }
];
function getNodeDefaults(obj) {
  obj = { style: { strokeColor: '#6BA5D7', fill: '#6BA5D7' } };
  return obj;
}
let constraints = DiagramConstraints.Default | DiagramConstraints.LineRouting;
export default {
  name: "App",
  components: {
    "ejs-diagram": DiagramComponent
  },
  data() {
    return {
      width: "100%",
      height: "350px",
      connectors: connectors,
      nodes: nodes,
      constraints: constraints,
      getNodeDefaults: (obj) => {
        obj = { style: { strokeColor: '#6BA5D7', fill: '#6BA5D7' } };
        return obj;
      },
    }
  },
  provide: {
    diagram: [LineRouting]
  }
}
</script>
```

## Avoid Overlap

Configure segments to avoid overlapping:

```vue
<template>
  <div id="app">
    <ejs-diagram id="diagram" :width='width' :height='height' :constraints='constraints' :nodes='nodes'
      :connectors='connectors' :getNodeDefaults='getNodeDefaults'></ejs-diagram>
  </div>
</template>

<script>
import { DiagramComponent, LineRouting, AvoidLineOverlapping, Diagram, DiagramConstraints, PortVisibility } from '@syncfusion/ej2-vue-diagrams';

let nodePorts = [
  { id: 'port1', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Visible, shape: 'Circle' },
  { id: 'port2', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Visible, shape: 'Circle' }
];
let nodes = [
  { id: 'shape1', offsetX: 100, offsetY: 100, width: 40, height: 50, ports: nodePorts },
  { id: 'shape2', offsetX: 100, offsetY: 200, width: 40, height: 50, ports: nodePorts },
  { id: 'shape3', offsetX: 200, offsetY: 150, width: 40, height: 50, ports: nodePorts },
  { id: 'shape4', offsetX: 200, offsetY: 250, width: 40, height: 50, ports: nodePorts },

];
let connectors = [
  { id: 'connector1', sourceID: 'shape1', targetID: 'shape3', sourcePortID: 'port2', targetPortID: 'port1', type: 'Orthogonal' },
  { id: 'connector2', sourceID: 'shape1', targetID: 'shape4', sourcePortID: 'port2', targetPortID: 'port1', type: 'Orthogonal' },
  { id: 'connector3', sourceID: 'shape2', targetID: 'shape3', sourcePortID: 'port2', targetPortID: 'port1', type: 'Orthogonal' },
  { id: 'connector4', sourceID: 'shape2', targetID: 'shape4', sourcePortID: 'port2', targetPortID: 'port1', type: 'Orthogonal' }
];
function getNodeDefaults(obj) {
  obj = { style: { strokeColor: '#6BA5D7', fill: '#6BA5D7' } };
  return obj;
}
let constraints = DiagramConstraints.Default | DiagramConstraints.LineRouting | DiagramConstraints.AvoidLineOverlapping;
export default {
  name: "App",
  components: {
    "ejs-diagram": DiagramComponent
  },
  data() {
    return {
      width: "100%",
      height: "350px",
      connectors: connectors,
      nodes: nodes,
      constraints: constraints,
      getNodeDefaults: (obj) => {
        obj = { style: { strokeColor: '#6BA5D7', fill: '#6BA5D7' } };
        return obj;
      },
    }
  },
  provide: {
    diagram: [LineRouting, AvoidLineOverlapping]
  }
}
</script>
```

## Connector Customization

### Styling

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Orthogonal',
  style: {
    strokeColor: '#FF0000',        // Line color
    strokeWidth: 2,                // Line thickness
    strokeDashArray: '5,5',        // Dashed pattern
    opacity: 0.8,
  }
};
```

### Arrow and Decorators

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  type: 'Orthogonal',
  sourceDecorator: {
    shape: 'Arrow',
    style: { fill: '#6BA3D5' }
  },
  targetDecorator: {
    shape: 'Arrow',
    style: { fill: '#6BA3D5' }
  }
};
```

### Labels/Annotations

```javascript
const connector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  annotations: [
    {
      content: 'Label Text',
      alignment: 'Center', // Center | After | Before
      offset: 0.5,
      style: { color: '#3ec423', fontSize: 12 }
    }
  ]
};
```

### CornerRadius and Bridging

```vue
<template>
  <div id="app">
    <ejs-diagram id="diagram" :width='width' :height='height' :connectors='connectors' :constraints='constraints' ></ejs-diagram>
  </div>
</template>
<script>
import { DiagramComponent, DiagramConstraints, ConnectorBridging } from '@syncfusion/ej2-vue-diagrams';

let connectors = [
  {
    id: 'connector1',
    type: 'Orthogonal',
    sourcePoint: { x: 100, y: 100 },
    targetPoint: { x: 300, y: 100 },
    cornerRadius: 15
  }, 
  {
    id: 'connector2',
    type: 'Straight',
    bridgeSpace: 20,
    sourcePoint: {
        x: 200,
        y: 130
    },
    targetPoint: {
        x: 400,
        y: 130
    }
},
{
    id: 'connector3',
    type: 'Straight',
    bridgeSpace: 20,
    sourcePoint: {
        x: 200,
        y: 170
    },
    targetPoint: {
        x: 400,
        y: 170
    }
}
]
export default {
    name: "App",
    components: {
        "ejs-diagram": DiagramComponent
    },
    data() {
        return {
            width: "100%",
            height: "350px",
            constraints: DiagramConstraints.Default | DiagramConstraints.Bridging,
            connectors: connectors,
        }
    },
    provide: {
        diagram: [ConnectorBridging]
    }
}
</script>
<style>
  @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css";
</style>
```

## Connector Events

```vue
<template>
<div id="app">
  <button @click="add">add</button>
  <button @click="remove">remove</button>
  <ejs-diagram id="diagram" :width='width' :height='height' :connectors='connectors' :nodes='nodes' 
    :click='click'
    :selectionChange='selectionChange'
    :positionChange='positionChange'
    :connectionChange ='connectionChange'
    :sourcePointChange='sourcePointChange'
    :targetPointChange='targetPointChange'
    :segmentCollectionChange='segmentCollectionChange'
    :segmentChange="segmentChange"
    :collectionChange='collectionChange'
    :created="onCreated"
  ></ejs-diagram>
</div>
</template>
<script>
import { DiagramComponent, Node, Connector, ConnectorEditing } from '@syncfusion/ej2-vue-diagrams';
let nodes = [
  {
    id: 'Start',
    width: 140,
    height: 50,
    offsetX: 300,
    offsetY: 50,
    annotations: [
      {
        content: 'Click node',
      },
    ],
    style: {
      fill: '#6BA5D7',
      strokeColor: 'white',
    },
  },
];
let connectors = [
{
  // Unique name for the connector
  id: 'connector1',
  sourceID: 'Start',
  targetPoint: { x: 300, y: 200 },
  type: 'Orthogonal',
  annotations: [
    {
      content: 'Click Connector',
    },
  ],
},
]
export default {
name: "App",
components: {
    "ejs-diagram": DiagramComponent
},
 data() {
    return {
        width: "100%",
        height: "350px",
        connectors: connectors,
        nodes:nodes,
        click: (args) => {
          let element = 'Diagram';
          if (args.actualObject instanceof Node) {
            element = 'Node';
          } else if (args.actualObject instanceof Connector) {
            element = 'Connector';
          }
          alert(element + ' Clicked');
        },
        selectionChange: (args) => {
          if (args.state === 'Changed') {
            console.log('selectionChange');
             //Customize
          }
        },
        positionChange: (args) => {
          if (args.state === 'Completed') {
            console.log('positionChange');
             //Customize
          }
        },
        connectionChange  : (args) => {
          if (args.state === 'Changed') {
            console.log('connectionChange ');
             //Customize
          }
        },
        sourcePointChange: (args) => {
          if (args.state === 'Completed') {
            console.log('sourcePointChange');
             //Customize
          }
        },
        targetPointChange: (args) => {
          if (args.state === 'Completed') {
            console.log('targetPointChange');
             //Customize
          }
        },
        segmentCollectionChange  : (args) => {
          if (args.type === 'Addition') {
            console.log('segmentCollectionChange');
          }
        },
        segmentChange: (args) => {
          console.log("segmentChange");
        },
        collectionChange: (args) => {
          console.log('collectionChange');
        },
        onCreated: (args) => {
          let con = this.$refs.diagram.ej2Instances.connectors[0];
          this.$refs.diagram.ej2Instances.select([con]);
        },
    }
  },
  methods: {
    add() {
      let connector = {
        type: 'Straight',
        sourcePoint: {
          x: 50,
          y: 200,
        },
        targetPoint: {
          x: 150,
          y: 300,
        },
      };
        this.$refs.diagram.ej2Instances.add(connector);
    },
    remove() {
        // remove connector from the diagram
        const diagramInstance = this.$refs.diagram.ej2Instances;
        let connector =
        diagramInstance.selectedItems.connectors.length > 0
          ? diagramInstance.selectedItems.connectors[0]
          : diagramInstance.connectors[0];
          diagramInstance.remove(connector);
    },
  },
  provide: {
    diagram: [ConnectorEditing],
  },
}
</script>
<style>
  @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css";
</style>
```

## getConnectorDefaults Pattern

Apply consistent defaults to all connectors:

```vue
<template>
<div id="app">
    <ejs-diagram id="diagram" :width='width' :height='height' :connectors='connectors' :getConnectorDefaults='getConnectorDefaults' ></ejs-diagram>
</div>
</template>
<script>
import { DiagramComponent } from '@syncfusion/ej2-vue-diagrams';

let connectors = [{
id: 'connector1',
sourcePoint: {
  x: 100,
  y: 100,
},
targetPoint: {
  x: 200,
  y: 200,
},
},
{
id: 'connector2',
sourcePoint: {
  x: 300,
  y: 100,
},
targetPoint: {
  x: 400,
  y: 200,
},
},]
export default {
name: "App",
components: {
    "ejs-diagram": DiagramComponent
},
 data() {
    return {
        width: "100%",
        height: "350px",
        connectors: connectors,
        getConnectorDefaults: (connector) => {
          connector.targetDecorator.style.fill = '#6BA5D7';
          connector.targetDecorator.style.strokeColor = '#6BA5D7';
          connector.style.strokeColor = 'red';
          connector.sourceDecorator.shape = 'Circle';
          return connector;
        }
    }
}
}
</script>

<style>
  @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css";
</style>
```

This ensures all connectors follow consistent styling without repeating code for each connector.
