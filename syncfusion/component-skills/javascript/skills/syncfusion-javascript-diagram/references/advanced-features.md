# Advanced Features

## Table of Contents

- [Overview](#overview)
- [Serialization & Persistence](#serialization--persistence)
- [Undo & Redo](#undo--redo)
- [Export & Print](#export--print)
- [Virtualization](#virtualization)
- [Custom Commands](#custom-commands)
- [Visio Format Support](#visio-format-support)

## Overview

Advanced Diagram features for production applications:
- **Serialization** - Save and load diagram state
- **Undo/Redo** - User action history
- **Export** - Save as image or PDF
- **Virtualization** - Handle large diagrams
- **Custom Commands** - Custom menu actions
- **Visio** - Import Microsoft Visio files

## Serialization & Persistence

### Save Diagram as JSON

```ts
import { Diagram, NodeModel, ConnectorModel } from '@syncfusion/ej2-diagrams';

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  nodes: [/* ... */],
  connectors: [/* ... */]
});

diagram.appendTo('#diagram');

// Save diagram to JSON
let diagramData = diagram.saveDiagram();
localStorage.setItem('myDiagram', diagramData);
console.log(diagramData);
```

### Load Diagram from JSON

```ts
// Retrieve saved diagram
let savedJson = localStorage.getItem('myDiagram');

if (savedJson) {
  // Load the saved diagram
  diagram.loadDiagram(savedJson);
}
```

## Undo & Redo

### Automatic Undo/Redo Stack

```ts
import { Diagram, UndoRedo } from '@syncfusion/ej2-diagrams';
Diagram.Inject(UndoRedo);

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  
  // History settings
  historyManager: {
    stackLimit: 100  // Number of undo/redo steps to keep
  }
});

diagram.appendTo('#diagram');

// User actions are automatically tracked:
// - Node creation/deletion
// - Connector creation/deletion
// - Property changes
// - Drag operations
```

### Manual Undo/Redo

```ts
// Undo last action
diagram.undo();

// Redo after undo
diagram.redo();

// Clear history
diagram.clearHistory();

// Check if can undo/redo
if (diagram.historyManager.canUndo) {
  diagram.undo();
}

if (diagram.historyManager.canRedo) {
  diagram.redo();
}
```

### Undo/Redo Buttons

```html
<button id="undoBtn">Undo</button>
<button id="redoBtn">Redo</button>
<div id="diagram"></div>
```

```ts
import { Diagram, UndoRedo } from '@syncfusion/ej2-diagrams';
Diagram.Inject(UndoRedo);

let diagram = new Diagram({
  width: '100%',
  height: '600px'
});

diagram.appendTo('#diagram');

document.getElementById('undoBtn').onclick = () => {
  if (diagram.historyManager.canUndo) {
    diagram.undo();
  }
};

document.getElementById('redoBtn').onclick = () => {
  if (diagram.historyManager.canRedo) {
    diagram.redo();
  }
};
```

### Custom History Entry

```ts
// Start custom action for history
diagram.historyManager.startGroupAction();

// Make multiple changes
diagram.add({ id: 'node1', offsetX: 100, offsetY: 100 });
diagram.add({ id: 'node2', offsetX: 200, offsetY: 100 });
diagram.add({ id: 'connector1', sourceID: 'node1', targetID: 'node2' });

// End custom action - all treated as single undo step
diagram.historyManager.endGroupAction();
```

## Export & Print

### Export as Image

```ts
import { Diagram, PrintAndExport, IExportOptions } from '@syncfusion/ej2-diagrams';
Diagram.Inject(PrintAndExport);

let diagram = new Diagram({
  width: '100%',
  height: '600px'
});

diagram.appendTo('#diagram');

let exportOptions: IExportOptions = {};
//Sets the export format as PNG
exportOptions.format = 'PNG';
exportOptions.fileName = 'diagram';
diagram.exportDiagram(exportOptions);


// Export as JPG
exportOptions.format = 'JPG';
diagram.exportDiagram(exportOptions);

// Export as SVG
exportOptions.format = 'SVG';
diagram.exportDiagram(exportOptions);

```

### Export with Options

```ts
// Custom export settings
let exportOptions: IExportOptions = {};
exportOptions = {
  format: 'PNG',
  fileName: 'my-diagram',
  region: 'Content',        // 'Content' | 'PageSettings'
  margin: { top: 20, left: 20, right: 20, bottom: 20 },
  multiplePage: true,
  pageOrientation: 'Portrait',   // 'Portrait' | 'Landscape'
};

diagram.exportDiagram(exportOptions);
```

### Export Button

```html
<button id="exportBtn">Export as PNG</button>
<div id="diagram"></div>
```

```ts
import { Diagram, PrintAndExport, IExportOptions } from '@syncfusion/ej2-diagrams';
Diagram.Inject(PrintAndExport);

let diagram = new Diagram({
  width: '100%',
  height: '600px'
});

diagram.appendTo('#diagram');

document.getElementById('exportBtn').onclick = () => {
  let exportOptions: IExportOptions = {};
  //By default exported in PNG format
  diagram.exportDiagram(exportOptions);
};
```

### Print Diagram

```ts
import { Diagram, PrintAndExport, IPrintOptions } from '@syncfusion/ej2-diagrams';
Diagram.Inject(PrintAndExport);

let diagram = new Diagram({
  width: '100%',
  height: '600px'
});

diagram.appendTo('#diagram');

// Print dialog
let printOptions: IPrintOptions = {};
diagram.print(printOptions);

// Print with options
printOptions = {
  region: 'Content',
  margin: { top: 20, left: 20, right: 20, bottom: 20 },
  pageOrientation: 'Landscape',
  multiplePage: true        // Multi-page print
};

diagram.print(printOptions);
```

## Virtualization

### Enable for Large Diagrams

```ts
import { Diagram, DiagramConstraints } from '@syncfusion/ej2-diagrams';

let diagram = new Diagram({
  width: '100%',
  height: '800px',
  
  // Enable virtualization for large diagrams (1000+ nodes)
  constraints: DiagramConstraints.Default | DiagramConstraints.Virtualization,
});

diagram.appendTo('#diagram');
```

### Performance Tips

```ts
import { Diagram, HierarchicalTree, NodeModel, ConnectorModel, DiagramConstraints } from '@syncfusion/ej2-diagrams';
Diagram.Inject(HierarchicalTree);

// Large diagram setup - custom method to render large nodes
let largeDiagramData = generateLargeDataset(5000);  // 5000 nodes

let diagram = new Diagram({
  width: '100%',
  height: '800px',
  
  //Enables Virtualization
  constraints: DiagramConstraints.Default | DiagramConstraints.Virtualization,
  
  // Use data binding for efficient rendering
  dataSourceSettings: {
    id: 'Name',
    parentId: 'ReportingPerson',
    dataManager: largeDiagramData
  },
  getNodeDefaults: (node: NodeModel) => {
    node.height = 40;
    node.width = 100;
    return node;
  },

  getConnectorDefaults:(connector: ConnectorModel) =>  {
    connector.type = 'Orthogonal';
    return connector;
  },
  
  // Auto-layout for organization
  layout: {
    type: 'HierarchicalTree'
  }
});

// For very large diagrams, consider server-side rendering
```

## Custom Commands

### Create Custom Toolbar

```ts
import { Diagram, Keys, KeyModifiers } from '@syncfusion/ej2-diagrams';

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  
  // Define custom commands
  commandManager: {
    commands: [
      {
        name: 'clone',
        canExecute: function () {
          let execute: boolean = diagram.selectedItems.nodes.length > 0;
          return execute;
        },
        execute: function () {
          diagram.copy();
          diagram.paste();
        },
        gesture: {
          //Press G to clone node
          key: Keys.G,
          keyModifiers: null,
        },
      },
      {
        name: 'DeleteAll',
        canExecute: function () {
          let execute: boolean = diagram.nodes.length + diagram.connectors.length > 0;
          return execute;
        },
        execute: function () {
          diagram.clear();
        },
        gesture: {
          //Press Shift+Del of Alt+Del to delete all
          key: Keys.Del,
          keyModifiers: KeyModifiers.Shift | KeyModifiers.Alt,
        },
      },
    ]
  }
});

diagram.appendTo('#diagram');

```

### Context Menu with Custom Commands

```ts
import {
    Diagram,
    DiagramContextMenu,
    BpmnDiagrams
  } from '@syncfusion/ej2-diagrams';
  import { MenuEventArgs } from '@syncfusion/ej2-navigations';
  Diagram.Inject(DiagramContextMenu, BpmnDiagrams);

let diagram = new Diagram({
  contextMenuSettings: {
    show: true,
    items: [
      {
        text: 'Clone',
        id: 'clone',
        target: '.e-elementcontent',
        // Sets the css icons for the item
        iconCss: 'e-icons e-copy',
      },
      { text: 'Add Note', id: 'addNote' },
      { text: 'Convert to BPMN', id: 'convertBPMN' }
    ]
  },
  
  contextMenuClick: (args: MenuEventArgs) => {
    if (args.id === 'clone') {
      diagram.copy();
      diagram.paste();
    }
    if (args.id === 'addNote') {
      // Add text annotation
      let selectedNode = diagram.selectedItems.nodes[0];
      if (selectedNode) {
        selectedNode.annotations.push({
          content: 'New note: ',
          style: { fontSize: 10, color: '#666' }
        });
        diagram.dataBind();
      }
    }
    
    if (args.id === 'convertBPMN') {
      // Convert node to BPMN shape
      let selectedNode = diagram.selectedItems.nodes[0];
      if (selectedNode) {
        selectedNode.shape = {
          type: 'Bpmn',
          shape: 'Activity',        // Activity, Event, Gateway, etc.
          activity: { activity: 'Task' } // optional details
        }
        diagram.dataBind();
      }
    }
  }
});
```

## Visio Format Support

### Load Visio Files

```html
<input type="file" id="importVisio" accept=".vsdx,application/vnd.visio"/>
<div id="diagram"></div>
```

```ts
import { Diagram, ImportAndExportVisio } from '@syncfusion/ej2-diagrams';
Diagram.Inject(ImportAndExportVisio);

let diagram = new Diagram({
  width: '100%',
  height: '600px'
});

diagram.appendTo('#diagram');

// Handle VSDX file input change: import into diagram, set size, and reset input
const vsdxInput: HTMLInputElement = document.getElementById(
    'importVisio'
) as HTMLInputElement;

vsdxInput.addEventListener('change', async (event) => {
    const file = (event.target as any).files[0];
    if (!file) return;
    await diagram.importFromVisio(file);
    diagram.width = '100%';
    diagram.height = '700px';
    vsdxInput.value = '';
});

```

## Complete Example: Full-Featured Diagram App

```ts
import { Diagram, DataBinding, HierarchicalTree, LayoutAnimation, IExportOptions, PrintAndExport, IPrintOptions } from '@syncfusion/ej2-diagrams';

Diagram.Inject(DataBinding, HierarchicalTree, LayoutAnimation, PrintAndExport);

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  
  // Data binding
  dataSourceSettings: {
    dataSource: employeeData,
    id: 'id',
    parentId: 'parentId'
  },
  
  // Layout
  layout: {
    type: 'HierarchicalTree',
    orientation: 'TopToBottom',
    enableAnimation: true,
  },
  
  // History/Undo-Redo
  historyManager: {
    stackLimit: 50
  },
});

diagram.appendTo('#diagram');

// Save button
document.getElementById('saveBtn').onclick = () => {
  let diagramJson = diagram.saveDiagram();
  localStorage.setItem('diagram', diagramJson);
  alert('Diagram saved!');
};

// Load button
document.getElementById('loadBtn').onclick = () => {
  let saved = localStorage.getItem('diagram');
  if (saved) {
    diagram.loadDiagram(saved);
  }
};

// Export button
document.getElementById('exportBtn').onclick = () => {
  let exportOptions: IExportOptions = {};
  exportOptions = {
    format: 'PNG',
    fileName: 'my-diagram',
    region: 'Content',        // 'Content' | 'PageSettings'
    margin: { top: 20, left: 20, right: 20, bottom: 20 },
    multiplePage: true,
    pageOrientation: 'Portrait',   // 'Portrait' | 'Landscape'
  };
  diagram.exportDiagram(exportOptions);
};

// Undo button
document.getElementById('undoBtn').onclick = () => {
  diagram.undo();
};

// Redo button
document.getElementById('redoBtn').onclick = () => {
  diagram.redo();
};

// Print button
document.getElementById('printBtn').onclick = () => {
  let printOptions: IPrintOptions = {};
  // Print with options
  printOptions = {
    region: 'Content',
    margin: { top: 20, left: 20, right: 20, bottom: 20 },
    pageOrientation: 'Landscape',
    multiplePage: true        // Multi-page print
  };
  diagram.print(printOptions);
};
```

## Performance Best Practices

1. **Use Virtualization** for 1000+ nodes
2. **Lazy Load Data** from server
3. **Batch Updates** with history grouping
4. **Dispose Unused** diagram instances
5. **Optimize Rendering** by reducing node count
6. **Cache Frequently Used** data

## Next Steps

- **Complete Examples:** Review the Getting Started guide again
- **API Reference:** Check Syncfusion official docs for complete API
- **Integration:** Combine with your backend services
