# Symbol Palette in Syncfusion Vue Diagram

## Overview

The Symbol Palette component provides a library of predefined or custom shapes that users can drag-and-drop into diagrams. It simplifies diagram creation by offering a visual catalog of available elements.

## Basic Setup

### SymbolPaletteComponent

```vue
<template>
  <div style="display: flex;">
    <ejs-symbol-palette 
      id="symbolPalette"
      :palettes="palettes"
      :width="paletteWidth"
      :height="paletteHeight"
      :symbolMargin="symbolMargin"
      :symbolPreview="symbolPreview"
    ></ejs-symbol-palette>
    
    <ejs-diagram 
      id="diagram"
      :width="diagramWidth"
      :height="diagramHeight"
      :nodes="nodes"
    ></ejs-diagram>
  </div>
</template>

<script setup>
import { SymbolPaletteComponent as EjsSymbolPalette, DiagramComponent as EjsDiagram } from '@syncfusion/ej2-vue-diagrams';

const palettes = [
  {
    name: 'Basic Shapes',
    visible: true,
    symbols: [
      { id: 'rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
      { id: 'circle', shape: { type: 'Basic', shape: 'Ellipse' } }
    ]
  }
];

const paletteWidth = '25%';
const paletteHeight = '100%';
const diagramWidth = '75%';
const diagramHeight = '100%';
const symbolMargin = { left: 12, right: 12, top: 12, bottom: 12 };
const symbolPreview = { height: 100, width: 100 };
const nodes = [];
</script>
```
 
## Stretch the symbols into the palette (Vue)

The `fit` behavior ensures symbols are fitted inside the palette item size rather than rendered at their actual node size. In Vue you can pass a `getSymbolInfo` function to the component.

```vue
<ejs-symbol-palette
  :palettes="palettes"
  :symbolHeight="80"
  :symbolWidth="80"
  :getSymbolInfo="getSymbolInfo"
></ejs-symbol-palette>

<script setup>
const getSymbolInfo = (symbol) => {
  return { fit: true };
};
</script>
```

## Palette Items & Symbols (Vue)

### Palette Dragging (`allowDrag`)

```vue
<!-- Prevent dragging symbols out of the palette -->
<ejs-symbol-palette :allowDrag="false" :palettes="palettes"></ejs-symbol-palette>
```

### Symbol Definition (examples)

```js
// Basic palette symbol
const basicSymbol = {
  id: 'rect',
  shape: { type: 'Basic', shape: 'Rectangle' },
  annotations: [{ content: 'Rectangle' }],
  width: 100,
  height: 60,
  style: { fill: '#6BA5D7', strokeColor: '#0066CC' }
};

// Connector symbol
const connectorSymbol = { id: 'straight', type: 'Straight', targetDecorator: { shape: 'Arrow' } };

// Flowchart symbol
const flowchartSymbol = { id: 'decision', width: 100, height: 60, shape: { type: 'Flow', shape: 'Decision' } };
```

### Symbol Styles

```js
const styledSymbols = [
  { id: 'success', shape: { type: 'Basic', shape: 'Rectangle' }, style: { fill: '#90EE90', strokeColor: '#00AA00' } },
  { id: 'warning', shape: { type: 'Basic', shape: 'Rectangle' }, style: { fill: '#FFD700', strokeColor: '#FF8C00' } },
  { id: 'error', shape: { type: 'Basic', shape: 'Rectangle' }, style: { fill: '#FF6B6B', strokeColor: '#CC0000' } }
];
```

## Custom Shape Symbols (HTML / SVG) (Vue)

You can provide HTML or SVG content for palette symbols by passing a function that returns a string. In `script setup` export the function and use it in the symbol definition.

```vue
<script setup>
const template = (obj) => {
  if (obj.id === 'node1') {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="#007BFF"/></svg>';
  }
  return '<div style="padding:8px;font-family:Arial;"><div style="font-weight:bold">Meeting</div><div style="font-size:12px">Team Sync</div></div>';
};

const customSymbolsPalette = [
  {
    id: 'html',
    expanded: true,
    symbols: [
      { id: 'node1', width: 100, height: 60, shape: { type: 'Native', content: template } },
      { id: 'node2', width: 100, height: 60, shape: { type: 'HTML', content: template } }
    ],
    title: 'HTML and SVG Shapes'
  }
];
</script>
```

## Image Symbols (Vue)

```js
const imageSymbols = [
  { id: 'Image1', 
    shape: {
      type: 'Image',
      source: '[YOUR URL HERE]'
      scale: 'Stretch',
      align: 'None',
    }, 
    width: 80,
    height: 80
  },
  { id: 'Image2',
    shape: {
      type: 'Image', 
      source: 'data:image/gif;base64,...'
    },
    width: 80,
    height: 80 
  }
];
```

## Defining Palette Symbols

### Basic Shapes Palette

```javascript
const palettes = [
  {
    name: 'Basic Shapes',
    expanded: true,
    symbols: [
      {
        id: 'rectangle',
        shape: { type: 'Basic', shape: 'Rectangle' },
        width: 100,
        height: 60,
        style: { fill: '#6BA3D5' }
      },
      {
        id: 'circle',
        shape: { type: 'Basic', shape: 'Ellipse' },
        width: 100,
        height: 60,
        style: { fill: '#6BA3D5' }
      },
      {
        id: 'diamond',
        shape: { type: 'Basic', shape: 'Diamond' },
        width: 100,
        height: 60,
        style: { fill: '#6BA3D5' }
      }
    ]
  }
];
```

### Flow Shapes Palette

```javascript
const flowShapesPalette = {
  name: 'Flow Shapes',
  symbols: [
    { id: 'process', shape: { type: 'Flow', shape: 'Process' }, width: 100, height: 60 },
    { id: 'decision', shape: { type: 'Flow', shape: 'Decision' }, width: 100, height: 100 },
    { id: 'document', shape: { type: 'Flow', shape: 'Document' }, width: 100, height: 60 },
    { id: 'terminator', shape: { type: 'Flow', shape: 'Terminator' }, width: 100, height: 60 }
  ]
};
```

### BPMN Palette

```javascript
const bpmnPalette = {
  name: 'BPMN',
  symbols: [
    {
      id: 'bpmnTask',
      shape: { type: 'Bpmn', shape: 'Activity' },
      width: 100,
      height: 60
    },
    {
      id: 'bpmnStart',
      shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start' } },
      width: 50,
      height: 50
    },
    {
      id: 'bpmnGateway',
      shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Exclusive' } },
      width: 60,
      height: 60
    }
  ]
};
```

## Drag and Drop to Diagram

### Enable Drag-Drop

Drag-drop is enabled by default. When users drag symbols from the palette:

```javascript
diagram.dragEnter = (args) => {
  console.log('Symbol dragged to diagram:', args.source);
};

diagram.drop = (args) => {
  console.log('Symbol dropped and added:', args.node);
};
```

### Symbol with Default Properties

```javascript
const symbol = {
  id: 'draggedTask',
  shape: { type: 'Bpmn', shape: 'Activity' },
  width: 100,
  height: 60,
  style: { fill: '#6BA3D5', strokeColor: '#2E5090' },
  annotations: [{ content: 'New Task' }]
};
```

## Palette Customization

### Search Functionality

```javascript
const paletteConfig = {
  palettes: [
    {
      name: 'Shapes',
      symbols: [
       {
          id: 'rectangle',
          shape: {
            type: 'Basic',
            shape: 'Rectangle',
          },
        },
        {
          id: 'plus',
          shape: {
            type: 'Basic',
            shape: 'Plus',
          },
        },
        {
          id: 'triangle',
          shape: {
            type: 'Basic',
            shape: 'RightTriangle',
          },
        }
      ]
    }
  ],
  enableSearch: true,
  ignoreSymbolsOnSearch: ['plus'],
};
```

### Expandable/Collapsible Palettes

```javascript
const palettes = [
  {
    name: 'Basic Shapes',
    expanded: true,           // Initially expanded
    symbols: [...]
  },
  {
    name: 'Advanced',
    expanded: false,          // Initially collapsed
    symbols: [...]
  }
];
```

### Icon Customization

```javascript
let palettes = [{
    id: 'basic',
    expanded: true,
    symbols: getBasicShapes(),
    title: 'Basic Shapes',
    iconCss: 'e-ddb-icons e-basic'
  }
]
```

### Symbol Margins and Size

```vue
<ejs-symbol-palette 
  :symbolMargin="{ left: 15, right: 15, top: 15, bottom: 15 }"
  :symbolHeight="100"
  :symbolWidth="100"
  :symbolPreview="{ height: 150, width: 150 }"
></ejs-symbol-palette>
```

## Palette Events

### Symbol Selection

```javascript
diagram.paletteSelectionChange = (args) => {
  console.log('Symbol selected:', args.source);
};
```

### Palette Expansion

```javascript
diagram.paletteExpanding = (args) => {
  console.log('Palette expanded/collapsed:', args.palette);
};
```

### Drag Preview

```javascript
diagram.dragOver = (args) => {
  // Show preview while dragging over diagram
  console.log('Dragging:', args.source);
};

diagram.dragLeave = (args) => {
  // Hide preview when leaving diagram area
  console.log('Drag cancelled');
};
```

## Multiple Palettes

```javascript
const palettes = [
  {
    name: 'Basic Shapes',
    symbols: [
      { id: 'rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
      { id: 'circle', shape: { type: 'Basic', shape: 'Ellipse' } }
    ]
  },
  {
    name: 'Flow Chart',
    symbols: [
      { id: 'process', shape: { type: 'Flow', shape: 'Process' } },
      { id: 'decision', shape: { type: 'Flow', shape: 'Decision' } }
    ]
  },
  {
    name: 'BPMN Shapes',
    symbols: [
      { id: 'task', shape: { type: 'Bpmn', shape: 'Activity' } },
      { id: 'gateway', shape: { type: 'Bpmn', shape: 'Gateway' } }
    ]
  }
];
```

## Custom Palette Binding

### Data-driven Palette

```javascript
const shapes = [
  { id: 'shape1', name: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
  { id: 'shape2', name: 'Circle', shape: { type: 'Basic', shape: 'Ellipse' } }
];

const palettes = [
  {
    name: 'Dynamic Shapes',
    symbols: shapes.map(s => ({
      id: s.id,
      shape: s.shape,
      width: 100,
      height: 60
    }))
  }
];
```

### Update Palette Dynamically

```javascript
const updatePalette = () => {
  const symbolPalette = document.getElementById('symbolPalette').ej2_instances[0];
  
  // Add new symbol
  const newSymbol = {
    id: 'newShape',
    shape: { type: 'Basic', shape: 'Diamond' }
  };
  /**
   * parameter 1 - The ID of the palette where the new shape is to be added.
   * parameter 2 - node/connector to be added
   */
  symbolPalette.addPaletteItem('flow', newSymbol);
  symbolPalette.dataBind();
};
// Function to add  new palettes
function addPalette() {
    let newPaletteShapes = [
        {
            id: "rectangle" + randomId(),
            shape: { type: "Basic", shape: "Rectangle" },
        },
        {
            id: "plus" + randomId(),
            shape: { type: "Basic", shape: "Plus" },
        },
    ];

    let newPalette = [
        {
            id: "basic" + randomId(),
            symbols: newPaletteShapes,
            title: "New Shapes",
        },
    ];
    // Add the new palettes to the symbol palette
    symbolPaletteRef.value.ej2Instances.addPalettes(newPalette);
}
```

## Symbol Preview

### Preview on Drag

```vue
<ejs-symbol-palette 
   :symbolPreview="{
    height: 100,
    width: 100,
    offset: {
        x: 1,
        y: 0.5,
    }}"
></ejs-symbol-palette>
```

## Complete Palette Example

```vue
<template>
  <div style="display: flex; width: 100%; height: 100vh;">
    <ejs-symbol-palette 
      id="symbolPalette"
      :palettes="palettes"
      :width="25%"
      :height="100%"
      :symbolMargin="{ left: 12, right: 12, top: 12, bottom: 12 }"
      :enableSearch="true"
      :searchBox="true"
    ></ejs-symbol-palette>
    
    <ejs-diagram 
      id="diagram"
      :width="75%"
      :height="100%"
      :nodes="diagramNodes"
    ></ejs-diagram>
  </div>
</template>

<script setup>
const palettes = [
  {
    name: 'Basic Shapes',
    expanded: true,
    symbols: [
      { id: 'rect', shape: { type: 'Basic', shape: 'Rectangle' }, width: 100, height: 60 },
      { id: 'circle', shape: { type: 'Basic', shape: 'Ellipse' }, width: 100, height: 60 },
      { id: 'diamond', shape: { type: 'Basic', shape: 'Diamond' }, width: 100, height: 100 }
    ]
  },
  {
    name: 'Flow Chart',
    expanded: false,
    symbols: [
      { id: 'process', shape: { type: 'Flow', shape: 'Process' }, width: 100, height: 60 },
      { id: 'decision', shape: { type: 'Flow', shape: 'Decision' }, width: 100, height: 100 }
    ]
  }
];

const diagramNodes = [];
</script>
```

The Symbol Palette dramatically improves user experience by providing an intuitive visual catalog of diagram elements, reducing learning curve and accelerating diagram creation.
