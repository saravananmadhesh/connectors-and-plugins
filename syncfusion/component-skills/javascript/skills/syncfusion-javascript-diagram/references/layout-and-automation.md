# Layout & Automation

## Table of Contents

- [Overview](#overview)
- [Automatic Layout Types](#automatic-layout-types)
- [HierarchicalTree Layout](#hierarchicaltree-layout)
- [Layout Configuration](#layout-configuration)
- [FlowChart Layout](#flowchart-layout)
- [OrganizationalChart Layout](#organizationalchart-layout)
- [Manual Layout Control](#manual-layout-control)
- [Spacing & Orientation](#spacing--orientation)

## Overview

Automatic layout algorithms position nodes on the diagram based on:
- **Hierarchy Type** - How data is structured (tree, flowchart, org chart)
- **Orientation** - Direction of flow (top-to-bottom, left-to-right)
- **Spacing** - Distance between nodes
- **Alignment** - How nodes are aligned

## Automatic Layout Types

Syncfusion Diagram supports multiple layout types:

### HierarchicalTree
Best for organizational charts, family trees, and data hierarchies:
```ts
layout: {
  type: 'HierarchicalTree'
}
```

### Flowchart
Best for process flows and flowcharts:
```ts
layout: {
  type: 'Flowchart'
}
```

### OrganizationalChart
Specialized for org charts with subtree distribution and custom arrangements:
```ts
layout: {
  type: 'OrganizationalChart'
}
```

### ComplexHierarchicalTree
For diagrams where nodes can have multiple parents:
```ts
layout: {
  type: 'ComplexHierarchicalTree'
}
```

### MindMap
For mind mapping diagrams with central concept:
```ts
layout: {
  type: 'MindMap',
  orientation: 'Horizontal'
}
```

### RadialTree
For radial tree structures with concentric circles:
```ts
layout: {
  type: 'RadialTree'
}
```

### SymmetricalLayout
For force-directed layouts using spring algorithms:
```ts
layout: {
  type: 'SymmetricalLayout',
  springLength: 80,
  springFactor: 0.8,
  maxIteration: 500
}
```

## HierarchicalTree Layout

### Basic Configuration

```ts
import { Diagram, HierarchicalTree } from '@syncfusion/ej2-diagrams';

Diagram.Inject(HierarchicalTree);

let diagram = new Diagram({
  layout: {
    type: 'HierarchicalTree',
    orientation: 'TopToBottom',      // Direction of tree
    horizontalSpacing: 100,           // Space between nodes horizontally
    verticalSpacing: 80               // Space between nodes vertically
  }
});
```

### Orientation Options

```ts
// Orientation values
type Orientation = 'TopToBottom' | 'BottomToTop' | 'LeftToRight' | 'RightToLeft';

// Top to Bottom (default)
layout: {
  type: 'HierarchicalTree',
  orientation: 'TopToBottom'
  // Parent at top, children below
}

// Bottom to Top
layout: {
  type: 'HierarchicalTree',
  orientation: 'BottomToTop'
  // Parent at bottom, children above
}

// Left to Right
layout: {
  type: 'HierarchicalTree',
  orientation: 'LeftToRight'
  // Parent on left, children to right
}

// Right to Left
layout: {
  type: 'HierarchicalTree',
  orientation: 'RightToLeft'
  // Parent on right, children to left
}
```

### Advanced Configuration

```ts
let diagram = new Diagram({
  layout: {
    type: 'HierarchicalTree',
    orientation: 'TopToBottom',
    horizontalSpacing: 100,
    verticalSpacing: 100,
    
    // Margin from canvas edge
    margin: { top: 50, left: 50 },
    
    // Fixed node position (single node ID)
    fixedNode: 'node1'
  }
});
```

## FlowChart Layout

### Use Case

Automatically arranges flowchart diagrams:

```ts
import { Diagram, FlowchartLayout, DataBinding } from '@syncfusion/ej2-diagrams';

Diagram.Inject(FlowchartLayout, DataBinding);

let flowchartData = [
  { id: 'start', label: 'Start', parentId: '' },
  { id: 'input', label: 'Input', parentId: 'start' },
  { id: 'process', label: 'Process', parentId: 'input' },
  { id: 'decision', label: 'Decision', parentId: 'process' },
  { id: 'output', label: 'Output', parentId: 'decision' },
  { id: 'end', label: 'End', parentId: 'output' }
];

let diagram = new Diagram({
  layout: {
    type: 'Flowchart',
    orientation: 'TopToBottom',
    horizontalSpacing: 120,
    verticalSpacing: 100
  },
  
  dataSourceSettings: {
    dataSource: flowchartData,
    id: 'id',
    parentId: 'parentId'
  }
});

diagram.appendTo('#diagram');
```

## OrganizationalChart Layout

### Specialized Organization Chart

```ts
import { Diagram, HierarchicalTree, Node, TreeInfo, DataBinding } from '@syncfusion/ej2-diagrams';

Diagram.Inject(HierarchicalTree, DataBinding);

let orgData = [
  { id: 'ceo', name: 'CEO', parentId: '' },
  { id: 'cto', name: 'CTO', parentId: 'ceo' },
  { id: 'cfo', name: 'CFO', parentId: 'ceo' },
  { id: 'dev1', name: 'Dev Lead 1', parentId: 'cto' },
  { id: 'dev2', name: 'Dev Lead 2', parentId: 'cto' },
  { id: 'acc', name: 'Accountant', parentId: 'cfo' }
];

let diagram = new Diagram({
  layout: {
    type: 'OrganizationalChart',
    horizontalSpacing: 150,
    verticalSpacing: 100,
    
    // Customize layout using getLayoutInfo
    getLayoutInfo: (node: Node, options: TreeInfo) => {
      if (!options.hasSubTree) {
        options.type = 'Center';
        options.orientation = 'Horizontal';
      }
    }
  },
  
  dataSourceSettings: {
    dataSource: orgData,
    id: 'id',
    parentId: 'parentId'
  }
});

diagram.appendTo('#diagram');
```

## Layout Configuration

### Complete Layout Options

```ts
let diagram = new Diagram({
  layout: {
    // Type of layout
    type: 'HierarchicalTree',          // 'HierarchicalTree' | 'OrganizationalChart' | 'Flowchart'
    
    // Direction
    orientation: 'TopToBottom',        // 'TopToBottom' | 'BottomToTop' | 'LeftToRight' | 'RightToLeft'
    
    // Node spacing
    horizontalSpacing: 100,            // Pixels between nodes horizontally
    verticalSpacing: 80,               // Pixels between nodes vertically
    
    // Canvas position
    margin: {
      top: 50,
      left: 50,
      bottom: 50,
      right: 50
    },
    
    // Root node for layout
    root: 'root',                      // Starting node ID
    
    // Prevent moving a specific node
    fixedNode: 'fixed_node1',          // Single node ID
    
    // Enable animation during layout
    enableAnimation: true
  }
});

// Apply layout after loading data
diagram.doLayout();
```

## Manual Layout Control

### Apply Layout After Diagram Creation

```ts
let diagram = new Diagram({
  // Initial configuration without layout
});

diagram.appendTo('#diagram');

// Apply layout after user interaction
document.getElementById('applyLayoutBtn').onclick = () => {
  diagram.layout = {
    type: 'HierarchicalTree',
    orientation: 'TopToBottom'
  };
  
  diagram.doLayout();
};
```

### Reset to Manual Positioning

```ts
// Disable auto layout
diagram.layout = null;

// Now nodes stay where user positions them
```

### Trigger Layout Update

```ts
// After adding or removing nodes
diagram.add(newNode);
diagram.doLayout();  // Refresh layout

// Manual node rearrangement
node.offsetX = 300;
node.offsetY = 200;
diagram.dataBind();
```

## Spacing & Orientation

### Adjusting Node Spacing

```ts
let diagram = new Diagram({
  layout: {
    type: 'HierarchicalTree',
    horizontalSpacing: 150,      // Increase horizontal gaps
    verticalSpacing: 120,        // Increase vertical gaps
    margin: { top: 100, left: 100 }  // Add margins from edges
  }
});
```

### Compact vs Spread Layouts

```ts
// Compact (minimal spacing)
layout: {
  type: 'HierarchicalTree',
  horizontalSpacing: 50,
  verticalSpacing: 50
}

// Spread out (maximum spacing)
layout: {
  type: 'HierarchicalTree',
  horizontalSpacing: 200,
  verticalSpacing: 150
}
```

### Orientation Quick Reference

| Orientation | Parent | Children | Use Case |
|---|---|---|---|
| `TopToBottom` | Top | Below | Standard org charts |
| `BottomToTop` | Bottom | Above | Reverse hierarchies |
| `LeftToRight` | Left | Right | Wide displays |
| `RightToLeft` | Right | Left | RTL languages |

## Complete Example: Auto-Arranged Org Chart

```ts
import { Diagram, DataBinding, HierarchicalTree, LayoutAnimation, NodeModel, ConnectorModel } from '@syncfusion/ej2-diagrams';

Diagram.Inject(DataBinding, HierarchicalTree, LayoutAnimation);

let companyData = [
  { id: '1', name: 'John CEO', parentId: '' },
  { id: '2', name: 'Alice VP Sales', parentId: '1' },
  { id: '3', name: 'Bob VP Tech', parentId: '1' },
  { id: '4', name: 'Charlie Sales', parentId: '2' },
  { id: '5', name: 'Diana Sales', parentId: '2' },
  { id: '6', name: 'Eve Dev', parentId: '3' },
  { id: '7', name: 'Frank Dev', parentId: '3' },
  { id: '8', name: 'Grace QA', parentId: '3' }
];

let diagram = new Diagram({
  width: '100%',
  height: '800px',
  
  // Data binding
  dataSourceSettings: {
    dataSource: companyData,
    id: 'id',
    parentId: 'parentId'
  },
  
  // Node styling
  getNodeDefaults: (obj: NodeModel) => {
    obj.width = 120;
    obj.height = 60;
    obj.style = {
      fill: '#6BA5D7',
      strokeColor: '#0066CC'
    };
    obj.shape = {
      type: 'Basic',
      shape: 'Rectangle'
    };
    obj.annotations = [{ content: (obj.data as any).name }];
    return obj;
  },
  
  // Connector styling
  getConnectorDefaults: (connector: ConnectorModel) => {
    connector.style = { strokeColor: '#0066CC' };
    connector.targetDecorator.shape = 'None';
    return connector;
  },
  
  // Auto layout configuration
  layout: {
    type: 'HierarchicalTree',
    orientation: 'TopToBottom',
    horizontalSpacing: 100,
    verticalSpacing: 80,
    enableAnimation: true
  }
});

diagram.appendTo('#org-chart');

// Button to change orientation
document.getElementById('changeOrientationBtn').onclick = () => {
  diagram.layout.orientation = 'LeftToRight';
  diagram.doLayout();
};
```

## Troubleshooting Layout Issues

### Issue: Nodes Overlap
**Solution:** Increase spacing values:
```ts
layout: {
  horizontalSpacing: 150,  // Increase from 100
  verticalSpacing: 120     // Increase from 80
}
```

### Issue: Diagram Too Large
**Solution:** Decrease spacing to make it more compact:
```ts
layout: {
  horizontalSpacing: 50,
  verticalSpacing: 40
}
```

### Issue: Layout Not Applying
**Solution:** Ensure layout algorithm modules are injected:
```ts
Diagram.Inject(HierarchicalTree);
```

## Next Steps

- **Add Interactivity:** [interaction-and-tools.md](interaction-and-tools.md)
- **Export Diagram:** [advanced-features.md](advanced-features.md)
- **Customize Styling:** [styling-and-appearance.md](styling-and-appearance.md)
