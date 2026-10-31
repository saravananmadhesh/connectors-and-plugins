# Symbol Palette

## Overview

The Symbol Palette is a user interface component that displays predefined shapes and symbols. Users can drag shapes from the palette to the diagram, enabling intuitive diagram creation.

**Key Concepts:**
- **SymbolPaletteComponent** - Container for symbols
- **Palette Items** - Shapes and symbols available for dragging
- **Symbol Groups** - Organized categories
- **Drag-Drop** - Integrate with diagram for shape insertion
- **Customization** - Custom icons, labels, filtering

## Symbol Palette Setup

### Basic Palette Configuration

```ts
import { Diagram } from '@syncfusion/ej2-diagrams';
import { SymbolPalette } from '@syncfusion/ej2-diagrams';

let symbolPalette = new SymbolPalette({
  width: '350px',
  height: '600px',
  
  // Symbols to display
  palettes: [
    {
      id: 'basic',
      title: 'Basic Shapes',
      symbols: [
        { id: 'rectangle', shape: {
        type: 'Basic',
        shape: 'Rectangle',
      }, },
        { id: 'circle', shape: { type: 'Basic', shape: 'Circle' }},
        { id: 'diamond', shape: { type: 'Basic', shape: 'Diamond' } }
      ]
    }
  ]
});

symbolPalette.appendTo('#paletteContainer');
```

### Stretch the symbols into the palette

The `fit` property defines whether the symbol must be fitted inside the size defined by the symbol palette. For example, when you resize the rectangle symbol, the ratio of the rectangle size is maintained rather than changing into a square shape. The following code example shows how to customize the symbol size so symbols are stretched (fit) into the palette items.

```ts
import {
  Diagram,
  NodeModel,
  SymbolPalette,
  SymbolInfo
} from '@syncfusion/ej2-diagrams';
//Initialize the basicshapes for the symbol palette
export function getBasicShapes(): NodeModel[] {
  let basicShapes: NodeModel[] = [{
      id: 'Rectangle',
      shape: {
        type: 'Basic',
        shape: 'Rectangle'
      }
    },
    {
      id: 'Ellipse',
      shape: {
        type: 'Basic',
        shape: 'Ellipse'
      }
    },
    {
      id: 'Hexagon',
      shape: {
        type: 'Basic',
        shape: 'Hexagon'
      }
    },
  ];
  return basicShapes;
}
//Initializes the symbol palette
let palette: SymbolPalette = new SymbolPalette({
  expandMode: 'Multiple',
  palettes: [{
    id: 'basic',
    expanded: true,
    symbols: getBasicShapes(),
    title: 'Basic Shapes',
    iconCss: 'e-ddb-icons e-basic'
  }, ],
  symbolHeight: 80,
  symbolWidth: 80,
  enableAnimation: false,
  //Sets the size, appearance, and description of a symbol
  getSymbolInfo: function(symbol) {
    // Enables to fit the content into the specified palette item size
    return {
      fit: true
    } as SymbolInfo;
    // When it is set as false, the element is rendered with actual node size
  },
});
palette.appendTo('#element');
```

index.html

```html
<!-- Include a container for the palette -->
<div id="element"></div>
```

## Palette Items & Symbols
 
### Palette Dragging

```ts
/**
 * Defines whether the symbols can be dragged from palette or not
 *
 * @default true
 */
allowDrag?: boolean;
```

Set `allowDrag` to `false` to prevent dragging symbols out of the palette.

### Symbol Definition

```ts
// Basic palette symbol
let basicSymbol = {
  id: 'rect',
  shape: {
        type: 'Basic',
        shape: 'Rectangle',
      },,
  annotations: [ { content: 'Rectangle' }],
  width: 100,
  height: 60,
  style: {
    fill: '#6BA5D7',
    strokeColor: '#0066CC'
  }
};

// Connector symbol
let connectorSymbol = {
  id: 'straight',
  type: 'Straight',
  targetDecorator: { shape: 'Arrow' }
};

// Flowchart symbol
let flowchartSymbol = {
  id: 'decision',
   width: 100,
  height: 60,
  shape: { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' }, 
};
```

### Symbol Styles

```ts
let styledSymbols = [
  {
    id: 'success',
    shape: {
        type: 'Basic',
        shape: 'Rectangle',
      },,
    style: { fill: '#90EE90', strokeColor: '#00AA00' }
  },
  {
    id: 'warning',
    shape: {
        type: 'Basic',
        shape: 'Rectangle',
      },,
    style: { fill: '#FFD700', strokeColor: '#FF8C00' }
  },
  {
    id: 'error',
    shape: {
        type: 'Basic',
        shape: 'Rectangle',
      },,
    style: { fill: '#FF6B6B', strokeColor: '#CC0000' }
  }
];
```

## Palette Groups/Categories

### Multiple Palette Groups

```ts
let multiPalette = new SymbolPalette({
  palettes: [
    {
      id: 'flowchart',
      title: 'Flowchart',
      expanded: true,
        symbols: [
        { id: 'term', shape: { type: 'Flow', shape: 'Terminator' } },
        { id: 'proc', shape: { type: 'Flow', shape: 'Process' } },
        { id: 'dec', shape: { type: 'Flow', shape: 'Decision' } }
      ]
    },
    {
      id: 'basic',
      title: 'Basic Shapes',
      expanded: false,
      symbols: [
        { id: 'rect', shape: {
        type: 'Basic',
        shape: 'Rectangle',
      },},
        { id: 'circle', shape: { type: 'Basic', shape: 'Circle' }},
        { id: 'star', shape: { type: 'Basic', shape: 'Star' }}
      ]
    },
    {
      id: 'connectors',
      title: 'Connectors',
      expanded: false,
      symbols: [
        { id: 'straight', type: 'Straight'},
        { id: 'orthogonal', type: 'Orthogonal'},
        { id: 'bezier', type: 'Bezier'}
      ]
    }
  ]
});
```

### Expandable Groups

```ts
let expandablePalette = new SymbolPalette({
  palettes: [
    {
      id: 'advanced',
      title: 'Advanced Shapes',
      expanded: false, // Start collapsed
      symbols: [
        /* symbols */
      ]
    }
  ]
});
```

## Palette with Diagram Integration

### Complete Setup with Diagram

```ts
import { Diagram, SymbolPalette } from '@syncfusion/ej2-diagrams';

// Create diagram
let diagram = new Diagram({
  width: '100%',
  height: '700px',
  nodes: [
    // Initial nodes
  ]
});
// Append to containers
diagram.appendTo('#diagram');
// Create palette
let palette = new SymbolPalette({
  width: '350px',
  height: '700px',
  symbolWidth: 100,
  symbolHeight: 100,
  
      palettes: [
    {
      id: 'flowchart',
      title: 'Flowchart',
      symbols: [
        { id: 'process', shape: { type: 'Flow', shape: 'Process' }},
        { id: 'decision', shape: { type: 'Flow', shape: 'Decision' }}
      ]
    }
  ],
  
  // Link to diagram for drag-drop
  getNodeDefaults: (node) => {
    return node;
  }
});

palette.appendTo('#palette');
```

## Palette Interaction

### Drag & Drop Behavior

```ts
let diagram = new Diagram({
  // Handle symbol drag from palette
  dragEnter: (args) => {
    console.log('Dragging symbol:', args.element.id);
  },
  
  // Handle symbol drop
  drop: (args) => {
    console.log('Dropped symbol at:', args.position);
    // New node automatically created
  }
});
```

### Symbol Search

```ts
let searchablePalette = new SymbolPalette({
  // The enableSearch property of the palette is used to show or hide the search textbox in the palette
  enableSearch: true, 
  //The ignoreSymbolsOnSearch property allows you to specify which symbols should be excluded from search results
  //The plus symbol will be ignored while searching shapes
  ignoreSymbolsOnSearch: ['plus'],
  palettes: [
    {
      id: 'shapes',
      title: 'Shapes',
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
  ]
});
```

## Custom Palette Symbols

### Custom Shape Symbols

```ts
function template(obj) {
  if (obj.id == 'node1') {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#007BFF" /><path d="M6.5 7.5L17.5 16.5L12 21V3L17.5 7.5L6.5 16.5" fill="none" stroke="white" stroke-width="2" /></svg>';
  }
  return '<div style="height:100%; background:#e3daf1;font-family:Arial;padding-left:13px;"><div style="font-size:12px;font-weight:bold;margin-left:3px;padding-top: 16px;">📅Meeting</div><div style="font-size:10px;margin-left:5px;">Team Sync @4PM</div><div style="font-size:8px; color:#666;margin-left:5px;">Room 30</div></div>';
};

let customSymbolsPalette = [
  {
      id: 'basic', expanded: true, symbols: [
        {
          id: 'node1',
          width: 100,
          height: 100,
          style: { fill: '#6BA5D7', strokeColor: 'white' },
          shape: {
            type: 'Native',
            scale: 'Stretch',
            content: template.bind(this)
          }
        },
        {
          id: 'node2',
          width: 100,
          height: 100,
          style: { fill: '#6BA5D7', strokeColor: 'white' },
          shape: {
            type: 'HTML',
            content: template.bind(this)
          }
        }
      ], title: 'HTML and SVG Shapes'
    }
];
```

### Image Symbols

```ts
let imageSymbols = [
  {
    id: 'Image1',
    shape: {
        type: 'Image',
        source: 'https://ej2.syncfusion.com/demos/src/diagram/employees/image16.png'
    },
    width: 80,
    height: 80,
  },
  {
    id: 'Image2',
    width: 80,
    height: 80,
    shape: {
        type: 'Image',
        source: 'data:image/gif;base64,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'
    },
  }
];
```

## Palette UX Features

### Custom Palette Icons

```ts
// usign iconCss to set different Palette Icon
let palette: SymbolPalette = new SymbolPalette({
  expandMode: 'Multiple',
  palettes: [
    {
      id: 'basic',
      // Defines the height of the palette
      height: 150,
      // Defines whether the palette is expanded or not
      expanded: true,
      symbols: getBasicShapes(),
      // Defines the title of the palette
      title: 'Basic Shapes',
      // Defines the icon for the palette title
      iconCss: 'e-ddb-icons e-basic',
    },
  ],
});
palette.appendTo('#element');
```

### Symbol Preview

```ts
// symbol preview size of the palette items which applies while dragging
let previewPalette = new SymbolPalette({
  symbolPreview: { height: 150, width: 150 },  
  palettes: [
    /* palettes with preview */
  ]
});
```

### Palette Groups Collapsible

```ts
let collapsiblePalette = new SymbolPalette({
  // Controls how many palettes can be expanded at once
  // Usage: set `expandMode: 'Single'` to allow only one expanded palette.
  expandMode: "Multiple",
  palettes: [
    {
      id: 'group1',
      title: 'Group 1',
      expanded: true,        // Initially expanded
      symbols: [/* symbols */]
    },
    {
      id: 'group2',
      title: 'Group 2',
      expanded: false,       // Initially collapsed
      symbols: [/* symbols */]
    }
  ]
});
```

## Complete Example - Full Diagram Designer

```ts
import { Diagram, SymbolPalette } from '@syncfusion/ej2-diagrams';

// Palette setup
let palette = new SymbolPalette({
  width: '350px',
  height: '100%',
  symbolWidth: 100,
  symbolHeight: 100,
  enableSearch: true,
  
  palettes: [
    {
      id: 'flowchart',
      title: 'Flowchart',
      symbols: [
        { id: 'start', shape: { type: 'Flow', shape: 'Terminator' }, 
          annotations: [{ content: 'Start' }] },
        { id: 'process', shape: { type: 'Flow', shape: 'Process' }, 
          annotations: [{ content: 'Process' }] },
        { id: 'decision', shape: { type: 'Flow', shape: 'Decision' }, 
          annotations: [{ content: 'Decision' }] },
        { id: 'end', shape: { type: 'Flow', shape: 'Terminator' }, 
          annotations: [{ content: 'End' }] }
      ]
    },
    {
      id: 'basic',
      title: 'Basic Shapes',
      symbols: [
        { id: 'rectangle', shape: { type: 'Basic', shape: 'Rectangle' },  },
        { id: 'circle', shape: { type: 'Basic', shape: 'Circle' }, },
        { id: 'diamond', shape: { type: 'Basic', shape: 'Diamond' },  },
        { id: 'triangle', shape: { type: 'Basic', shape: 'Triangle' } }
      ]
    },
    {
      id: 'connectors',
      title: 'Connectors',
      symbols: [
        { id: 'straight', type: 'Straight', label: 'Straight',
          targetDecorator: { shape: 'Arrow' } },
        { id: 'orthogonal', type: 'Orthogonal', label: 'Orthogonal',
          targetDecorator: { shape: 'Arrow' } }
      ]
    }
  ]
});
diagram.appendTo('#diagram');
// Diagram setup
let diagram = new Diagram({
  width: '100%',
  height: '100%',
  nodes: [],
  connectors: []
});

palette.appendTo('#palette');
```

## Next Steps

- **Swimlanes:** [swimlanes.md](swimlanes.md)
- **Groups & Containers:** [groups-and-containers.md](groups-and-containers.md)
- **Interaction & Tools:** [interaction-and-tools.md](interaction-and-tools.md)
