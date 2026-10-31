# Styling & Appearance

## Table of Contents

- [Overview](#overview)
- [CSS Theming](#css-theming)
- [Node Styling](#node-styling)
- [Connector Styling](#connector-styling)
- [Text & Labels](#text--labels)
- [Conditional Styling](#conditional-styling)
- [Themes & Colors](#themes--colors)
- [Accessibility](#accessibility)

## Overview

Diagram styling includes:
- **Global Theme** - Overall color scheme (Material, Bootstrap, etc.)
- **Element Styles** - Individual node and connector appearance
- **Typography** - Fonts, sizes, weights for text
- **Accessibility** - Color contrast, ARIA attributes

## CSS Theming

### Import Theme Styles

```css
/* src/styles/styles.css */

/* Choose ONE theme */

/* Material Design (recommended) */
@import '@syncfusion/ej2-diagrams/styles/material.css';

/* Bootstrap Theme */
/* @import '@syncfusion/ej2-diagrams/styles/bootstrap.css'; */

/* Fabric/Fluent Theme */
/* @import '@syncfusion/ej2-diagrams/styles/fabric.css'; */

/* Bootstrap 4 Theme */
/* @import '@syncfusion/ej2-diagrams/styles/bootstrap4.css'; */

/* High Contrast Theme */
/* @import '@syncfusion/ej2-diagrams/styles/highcontrast.css'; */
```

### Theme Options

| Theme | Best For | Appearance |
|-------|----------|-----------|
| Material | Modern web apps | Clean, minimal |
| Bootstrap | Bootstrap projects | Professional |
| Fabric | Office integration | Modern soft |
| Bootstrap4 | Bootstrap 4 projects | Bold, structured |
| HighContrast | Accessibility | Bold borders, large text |

## Node Styling

### Basic Node Styling

```ts
let node = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  
  style: {
    fill: '#6BA5D7',              // Background color
    strokeColor: '#003366',       // Border color
    strokeWidth: 2,               // Border width
    opacity: 0.8,                 // Transparency (0-1)
    dashArray: '5,5',             // Dashed pattern
    // Removed: textOverflow — not a valid property of style
  },

  // Correct place for textOverflow (inside annotations)
  annotations: [
    {
      content: 'Node Text',
      style: {
        textOverflow: 'Wrap'       // Valid only here
      }
    }
  ]
};
``
```

### Gradient Fill

```ts
let gradientNode = {
  id: 'gradient',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,

  style: {
    // Gradient must be defined using the gradient object
    gradient: {
      type: 'Linear',          // 'Linear' | 'Radial'
      x1: 0,                    // Start point
      y1: 0,
      x2: 100,                  // End point
      y2: 100,
      stops: [
        { color: '#6BA5D7', offset: 0 },
        { color: '#003366', offset: 1 }
      ]
    },
    strokeColor: '#003366',
    strokeWidth: 2
  }
};
``
```

### Shadow Effect

```ts
let shadowNode = {
  id: 'shadow',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  
  style: {
    fill: '#6BA5D7',
    shadow: {
      angle: 45,
      blur: 10,
      opacity: 0.3,
      distance: 5
      // Removed: color (not supported in EJ2 ShadowModel)
    }
  }
};
```

### Styled Node Collection

```ts
let styledNodes = [
  {
    id: 'start',
    offsetX: 100,
    offsetY: 100,
    width: 100,
    height: 60,
    shape: { type: 'Basic', shape: 'Ellipse' },   // FIXED
    style: { fill: '#90EE90' }    // Green for start
  },
  {
    id: 'process',
    offsetX: 250,
    offsetY: 100,
    width: 100,
    height: 60,
    shape: { type: 'Basic', shape: 'Rectangle' }, // FIXED
    style: { fill: '#6BA5D7' }    // Blue for process
  },
  {
    id: 'end',
    offsetX: 400,
    offsetY: 100,
    width: 100,
    height: 60,
    shape: { type: 'Basic', shape: 'Ellipse' },   // FIXED
    style: { fill: '#FF6B6B' }    // Red for end
  }
];
```

## Connector Styling

### Basic Connector Styling

```ts
let styledConnector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',

  // Optional but recommended for clarity
  type: 'Straight',

  style: {
    strokeColor: '#6BA5D7',       // Line color
    strokeWidth: 2,               // Line thickness
    dashArray: '5,5',             // Pattern: 5px dash, 5px gap
    opacity: 0.8
  },
  
  targetDecorator: {
    shape: 'Arrow',               // Valid decorator
    width: 10,
    height: 10,
    style: {
      fill: '#6BA5D7',
      strokeColor: '#003366'
    }
  }
};
```

### Dash Patterns

```ts
// Solid line (default)
style: { dashArray: '' }

// Dashed line
style: { dashArray: '5,5' }

// Dotted line
style: { dashArray: '2,2' }

// Dash‑dot combination
style: { dashArray: '5,5,2,5' }

// Dash‑dot‑dot
style: { dashArray: '5,5,2,5,2,5' }
```

## Text & Labels

### Node Label Styling

```ts
let labeledNode = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  
  style: {
    fill: '#6BA5D7',
    strokeColor: 'white'
  },
  
  annotations: [
    {
      content: 'Process',
      
      // Annotation text style
      style: {
        color: 'white',           // Text color
        fontSize: 14,             // Font size in pixels
        fontFamily: 'Arial',      // Font family
        bold: true,               // Bold text
        italic: false,            // Italic text

        // Text wrapping & overflow
        textWrapping: 'Wrap',     // 'Wrap' | 'NoWrap' | 'WrapWithOverflow'
        textOverflow: 'Wrap',     // 'Wrap' | 'Clip' | 'Ellipsis'

        // Alignment & decoration
        textAlign: 'Center',      // 'Left' | 'Center' | 'Right'
        textDecoration: 'None'    // 'None' | 'Underline' | 'Overline' | 'LineThrough'
      },
      
      offset: { x: 0.5, y: 0.5 }  // Position in node (0-1 scale)
    }
  ]
};
```

### Connector Label Styling

```ts
let labeledConnector = {
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  
  style: { strokeColor: '#6BA5D7' },
  
  annotations: [
    {
      content: 'Flow',
      
      style: {
        color: '#000',
        fontSize: 12,
        bold: true,
        fontFamily: 'Arial'
      },
      
      offset: 0.5,                 // 0 = start, 1 = end
      // FIXED: 'Top' is invalid — EJ2 uses 'Before' | 'Center' | 'After'
      alignment: 'Center'          // Recommended default
    }
  ]
};
```

### Font Family Options

```ts
// Common web‑safe fonts
const fontFamilies = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Verdana',
  'Comic Sans MS',
  'Trebuchet MS'
];

// Use them in annotation style
style: { fontFamily: 'Verdana' }   // Valid in TextStyleModel
```

## Conditional Styling

### Style Based on State

```ts
import { Diagram, NodeModel } from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';

let diagram = new Diagram({
  // Style nodes based on data
  getNodeDefaults: (obj: NodeModel) => {
    // Base style
    let style = {
      fill: '#6BA5D7',
      strokeColor: 'white'
    };

    // Conditional styling based on custom data
    if ((obj as any).urgency === 'high') {
      style.fill = '#FF6B6B';   // Red
      style['strokeWidth'] = 3; // Emphasize high priority
    } else if ((obj as any).urgency === 'medium') {
      style.fill = '#FFD700';   // Yellow
    }
    // 'low' urgency keeps the default blue fill

    obj.style = style;
    return obj;
  },
  
  dataSourceSettings: {
    // Bind data source
    dataSource: new DataManager([
      { id: '1', label: 'High Priority', urgency: 'high' },
      { id: '2', label: 'Medium Priority', urgency: 'medium' },
      { id: '3', label: 'Low Priority', urgency: 'low' }
    ]),
    id: 'id'
  }
});
```

### Style on Selection

```ts
import { Diagram, ISelectionChangeEventArgs, NodeModel } from '@syncfusion/ej2-diagrams';

let diagram = new Diagram({
  selectionChange: (args: ISelectionChangeEventArgs) => {
    // Ensure there is at least one selected node
    if (args.newValue && args.newValue.nodes && args.newValue.nodes.length > 0) {
      let selectedNode = args.newValue.nodes[0] as NodeModel;
      
      // Highlight selected node
      selectedNode.style.strokeWidth = 4;
      selectedNode.style.strokeColor = '#FF6B6B';
      diagram.refresh();
    }
  }
});
```

## Themes & Colors

### Color Palette

```ts
// Professional color palette
const colors = {
  primary: '#6BA5D7',      // Main brand color
  success: '#90EE90',      // Green for success
  warning: '#FFD700',      // Yellow for warning
  danger: '#FF6B6B',       // Red for danger
  info: '#00BFFF',         // Cyan for info
  
  neutralLight: '#F5F5F5', // Light gray
  neutral: '#808080',      // Medium gray
  neutralDark: '#333333'   // Dark gray
};
```

### Multi-Color Diagram

```ts
let coloredNodes = [
  { id: 'success', offsetX: 100, offsetY: 100, style: { fill: colors.success } },
  { id: 'warning', offsetX: 250, offsetY: 100, style: { fill: colors.warning } },
  { id: 'danger', offsetX: 400, offsetY: 100, style: { fill: colors.danger } },
  { id: 'info', offsetX: 550, offsetY: 100, style: { fill: colors.info } }
];
```

### Dark Theme

```ts
// Dark mode styling
let darkThemeNodes = [
  {
    id: 'dark1',
    offsetX: 100,
    offsetY: 100,
    width: 100,
    height: 60,
    style: {
      fill: '#333333',        // Dark background
      strokeColor: '#00FF00'  // Bright accent
      // Removed: textOverflow (not valid here)
    },
    annotations: [
      {
        content: 'Dark Mode',
        style: {
          color: '#FFFFFF',    // White text
          textOverflow: 'Wrap' // Correct placement
        }
      }
    ]
  }
];
```

## Accessibility

### Color Contrast

```ts
// WCAG AA compliant (at least 4.5:1 contrast)
let accessibleNode = {
  id: 'accessible',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 100,
  
  style: {
    fill: '#003366',             // Dark blue background
    strokeColor: '#FFFFFF',      // White border
    strokeWidth: 2
  },
  
  annotations: [{
    content: 'Accessible',
    style: {
      color: '#FFFFFF',          // White text (high contrast)
      fontSize: 14,
      bold: true
    }
  }]
};
```

### ARIA Attributes

```ts
let accessibleConnector = {
  id: 'accessible_connector',
  sourceID: 'node1',
  targetID: 'node2',
  
  style: {
    strokeColor: '#000000',
    strokeWidth: 2
  }
};
```

## Complete Example: Styled Flowchart

```ts
import { Diagram } from '@syncfusion/ej2-diagrams';

let styledFlowchart = [
  // Start
  {
    id: 'start',
    offsetX: 100,
    offsetY: 100,
    width: 100,
    height: 60,
    shape: { type: 'Basic', shape: 'Ellipse' },  // FIXED
    style: { fill: '#90EE90', strokeColor: '#006400', strokeWidth: 2 },
    annotations: [{ content: 'Start', style: { color: '#000', bold: true } }]
  },
  // Process
  {
    id: 'process',
    offsetX: 100,
    offsetY: 200,
    width: 100,
    height: 60,
    shape: { type: 'Basic', shape: 'Rectangle' }, // FIXED
    style: { fill: '#6BA5D7', strokeColor: '#003366', strokeWidth: 2 },
    annotations: [{ content: 'Process', style: { color: '#fff', bold: true } }]
  },
  // End
  {
    id: 'end',
    offsetX: 100,
    offsetY: 300,
    width: 100,
    height: 60,
    shape: { type: 'Basic', shape: 'Ellipse' },
    style: { fill: '#FF6B6B', strokeColor: '#8B0000', strokeWidth: 2 },
    annotations: [{ content: 'End', style: { color: '#fff', bold: true } }]
  }
];

let styledConnectors = [
  {
    id: 'c1',
    sourceID: 'start',
    targetID: 'process',
    type: 'Straight', // Optional but explicit
    style: { strokeColor: '#003366', strokeWidth: 2 },
    targetDecorator: { shape: 'Arrow', style: { fill: '#003366' } }
  },
  {
    id: 'c2',
    sourceID: 'process',
    targetID: 'end',
    type: 'Straight', // Optional but explicit
    style: { strokeColor: '#003366', strokeWidth: 2 },
    targetDecorator: { shape: 'Arrow', style: { fill: '#003366' } }
  }
];

let diagram = new Diagram({
  width: '100%',
  height: '500px',
  nodes: styledFlowchart,
  connectors: styledConnectors
});

diagram.appendTo('#diagram');
```

## Next Steps

- **Add Interactivity:** [interaction-and-tools.md](interaction-and-tools.md)
- **Advanced Features:** [advanced-features.md](advanced-features.md)
- **Export Diagrams:** [advanced-features.md](advanced-features.md#export)
