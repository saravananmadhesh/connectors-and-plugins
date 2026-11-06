# Serialization & Export

## Overview

Serialization saves and loads diagram data as JSON. Export converts diagrams to image formats. These features enable persistence and sharing of diagram designs.

**Key Concepts:**
- **Serialization** - Save/load JSON state
- **Export** - Convert to image (PNG, JPEG, SVG)
- **Print** - Print diagram on paper
- **Visio** - Import/export Visio files
- **Data Binding** - Populate from external sources
- **Mermaid Syntax** - Import/export diagrams using Mermaid format
- **Unsaved Changes Detection** - Use `isModified` to track unsaved changes.

## Serializing Diagrams

### Save Diagram to JSON

```ts
import { Diagram } from '@syncfusion/ej2-diagrams';

let diagram = new Diagram({
  nodes: [
    { id: 'node1', offsetX: 250, offsetY: 250, width: 100, height: 60, 
      annotations: [{ content: 'Node 1' }] }
  ],
  connectors: []
});

diagram.appendTo('#diagram');

// Save Diagram to JSON string
let savedData: string = diagram.saveDiagram();
```

### Load Diagram from JSON

```ts
// Load Diagram from stored JSON string
diagram.loadDiagram(savedData);
```

### Detect Unsaved Changes

The `isModified` property returns `true` whenever the diagram has unsaved changes — node/connector edits, property updates, or undo/redo actions. Use it to show save indicators or warn before discarding changes.

```ts
// Check whether the diagram has unsaved changes.
if (diagram.isModified) {
    const confirmed = confirm('There are unsaved changes. Discard them?');
    if (!confirmed) {
        // User wants to keep the diagram
        return;
    }
}
```

> **Note:** Transient interactions such as zooming, panning, or selecting elements do not affect the `isModified` state.

### Save/Load diagram from local storage

```ts
// Save Diagram to JSON string
let savedData: string = diagram.saveDiagram();


// Store the serialized string in local storage
localStorage.setItem('fileName', savedData);

// Retrieve the saved string from local storage
savedData = localStorage.getItem('fileName');
if (savedData) {
  diagram.loadDiagram(savedData);
}
```

### Complete Save/Load Example

```ts

import { Diagram } from '@syncfusion/ej2-diagrams';

let diagram = new Diagram({
  nodes: [
    { id: 'node1', offsetX: 250, offsetY: 250, width: 100, height: 60, 
      annotations: [{ content: 'Node 1' }] }
  ],
  connectors: []
});

diagram.appendTo('#diagram');

let savedData: string;
// Save diagram
function saveDiagram(): void {
  savedData = diagram.saveDiagram();
}
  
// Load diagram
function loadDiagram(): void {
  diagram.loadDiagram(savedData);
}
```

## Exporting Diagrams

### Export to Image

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

### Export Options

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

### Export on Button Click

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
  //By default exported in JPG format
  diagram.exportDiagram(exportOptions);
};
```

## Printing Diagrams

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
```

### Print with Custom Settings

```html
<button id="print">Print</button>
<div id="diagram"></div>
```

```ts
import { Diagram, PrintAndExport, IPrintOptions } from '@syncfusion/ej2-diagrams';
Diagram.Inject(PrintAndExport);

let diagram = new Diagram({
  width: '100%',
  height: '600px'
});

diagram.appendTo('#diagram');

document.getElementById('print').onclick = () => {
  // Print dialog
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

## Visio File Support

### Import Visio File

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

### Export to Visio


```html
<button id="exportVSDX">ExportVSDX</button>
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

// Export VSDX
document.getElementById('exportVSDX').onclick = () => {
  diagram.exportToVisio();
};
```

## Importing and Exporting with Mermaid Syntax

The Diagram control supports saving and loading diagrams using Mermaid syntax format. Mermaid is a Markdown-inspired syntax that automatically generates diagrams. With this functionality, you can easily create mind maps, flowcharts, and UML sequence diagrams from Mermaid syntax data, simplifying the visualization of complex ideas and processes.

### Save Diagram as Mermaid Syntax

You can export your diagram to Mermaid syntax format using the `saveDiagramAsMermaid()` method:

```ts
import { Diagram, FlowchartLayout, DataBinding } from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data'
Diagram.Inject(FlowchartLayout, DataBinding);

let flowchartData = [
    { id: 'start', label: 'Start', parentId: '' },
    { id: 'input', label: 'Input', parentId: 'start' },
    { id: 'end', label: 'End', parentId: 'input' }
  ];

let diagram: Diagram = new Diagram({
  width: '100%',
  height: '600px',
  layout:{ type: 'Flowchart' },
  dataSourceSettings: {
    dataManager: new DataManager(flowchartData),
    id: 'id', parentId: 'parentId'
  }
});

diagram.appendTo('#element');

// Returns the serialized Mermaid string of the Diagram
let mermaidData = diagram.saveDiagramAsMermaid();
console.log(mermaidData);
```

### Load Flowchart from Mermaid

```ts
import { Diagram, FlowchartLayout, DataBinding } from '@syncfusion/ej2-diagrams';
Diagram.Inject(FlowchartLayout, DataBinding);

let diagram: Diagram = new Diagram({
  width: '100%',
  height: '600px',
  layout:{ type: 'Flowchart' }
});

diagram.appendTo('#element');

let mermaidFlowchartData: string = `flowchart TD
    A[Start] --> B(Process)
    B --> C{Decision}
    C -->|Yes| D[Action]
    C -->|No| E[End]`;

diagram.loadDiagramFromMermaid(mermaidFlowchartData);
```

### Load MindMap from Mermaid

```ts
import { Diagram, MindMap, DataBinding } from '@syncfusion/ej2-diagrams';
Diagram.Inject(MindMap, DataBinding);

let diagram: Diagram = new Diagram({
  width: '100%',
  height: '600px',
  layout:{ type: 'MindMap' }
});

diagram.appendTo('#element');

let mermaidMindmapData: string = `mindmap
  root((Central Idea))
    Branch 1
      Sub-branch 1.1
      Sub-branch 1.2
    Branch 2
      Sub-branch 2.1`;

diagram.loadDiagramFromMermaid(mermaidMindmapData);
```

## Undo/Redo History

### Enable UndoRedo

```ts
import { Diagram, UndoRedo } from '@syncfusion/ej2-diagrams';

Diagram.Inject(UndoRedo);

let diagram = new Diagram({
  width: '100%',
  height: '600px',
  nodes: [
    { id: 'node1', offsetX: 250, offsetY: 250, width: 100, height: 60 }
  ]
});

// History is automatically tracked
```

### Undo/Redo Control

```html
<button id="undoBtn">Undo</button>
<button id="redoBtn">Redo</button>
<button id="clearBtn">Clear</button>
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
document.getElementById('clearBtn').onclick = () => {
  diagram.clearHistory();
};
```

## Data Binding

### Bind from Local Data

```ts
import {
    Diagram, NodeModel, Node, Connector, DataBinding, HierarchicalTree, TreeInfo, DiagramTools
} from '@syncfusion/ej2-diagrams';
import { DataManager, Query } from '@syncfusion/ej2-data';
Diagram.Inject(DataBinding, HierarchicalTree);
//Initializes data source
let data: object[] = [
  { Name: "Steve-Ceo" },
  { Name: "Kevin-Manager", ReportingPerson: "Steve-Ceo" },
  { Name: "Peter-Manager", ReportingPerson: "Steve-Ceo" },
  { Name: "John- Manager", ReportingPerson: "Peter-Manager" },
  { Name: "Mary-CSE ", ReportingPerson: "Peter-Manager" },
  { Name: "Jim-CSE ", ReportingPerson: "Kevin-Manager" },
  { Name: "Martin-CSE", ReportingPerson: "Kevin-Manager" }
];
let items: DataManager = new DataManager(data as JSON[], new Query().take(7));
let diagram: Diagram = new Diagram({
    width: '100%', height: '550px',
    layout: { type: 'HierarchicalTree' },
    dataSourceSettings: { id: 'Name', parentId: 'ReportingPerson', dataSource: items },
    getNodeDefaults: (node: Node) => {
      node.shape = { type: 'Text', content: (node.data as { Name: 'string' }).Name };
      node.width = 100; node.height = 40;
      (node.shape as TextModel).margin = { left: 5, right: 5, top: 5, bottom: 5 };
      return node;
    },
    getConnectorDefaults: (connector: ConnectorModel, diagram: Diagram) => {
      connector.type = 'Orthogonal';
      return connector;
    }
});
diagram.appendTo('#element');
```

### Bind from Remote data

```ts
import {
    Diagram, NodeModel, Node, Connector, DataBinding, HierarchicalTree, TreeInfo, DiagramTools
} from '@syncfusion/ej2-diagrams';
import { DataManager, Query } from '@syncfusion/ej2-data';
Diagram.Inject(DataBinding, HierarchicalTree);
let diagram: Diagram = new Diagram({
    width: '100%', height: 490,
    layout: {
        type: 'HierarchicalTree', margin: { left: 0, right: 0, top: 100, bottom: 0 },
        verticalSpacing: 40,
        getLayoutInfo: (node: Node, options: TreeInfo) => {
            if (options.level === 3) {
                node.style.fill = '#3c418d';
            }
            if (options.level === 2) {
                node.style.fill = '#108d8d';
                options.type = 'Center';
                options.orientation = 'Horizontal';
            }
            if (options.level === 1) {
                node.style.fill = '#822b86';
            }
        }
    },
    getNodeDefaults: (obj: Node) => {
        obj.width = 80; obj.height = 40;
        obj.shape = { type: 'Basic', shape: 'Rectangle' };
        obj.style = { fill: '#048785', strokeColor: 'Transparent' };
    },
    getConnectorDefaults: (connector: Connector) => {
        connector.type = 'Orthogonal';
        connector.style.strokeColor = '#048785';
        connector.targetDecorator.shape = 'None';
    },
    //Configures data source
    dataSourceSettings: {
        id: 'Id', parentId: 'ParentId',
        dataManager: new DataManager(
            { url: 'url', crossDomain: true },
        ),
        //binds the external data with node
        doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
          nodeModel.annotations = [{ content: data['Label'], style: { color: 'white' } }];
        }
    },
    tool: DiagramTools.ZoomPan,
    snapSettings: { constraints: 0 }
});
diagram.appendTo('#element');
export interface DataInfo {
    [key: string]: string;
}
```

## Complete Example: Diagram Persistence

```ts
import { Diagram, UndoRedo } from '@syncfusion/ej2-diagrams';
Diagram.Inject(UndoRedo);

let diagram = new Diagram({
  width: '100%', height: '500px',
  nodes: [
    { id: 'start', offsetX: 250, offsetY: 150, width: 80, height: 60,
      shape: { type: 'Flow', shape: 'Terminator' }, annotations: [{ content: 'Start' }] },
    { id: 'process', offsetX: 250, offsetY: 280, width: 100, height: 60,
      shape: { type: 'Flow', shape: 'Process' }, annotations: [{ content: 'Process' }] },
    { id: 'end', offsetX: 250, offsetY: 410, width: 80, height: 60,
      shape: { type: 'Flow', shape: 'Terminator' }, annotations: [{ content: 'End' }] }
  ],
  connectors: [
    { id: 'c1', sourceID: 'start', targetID: 'process', targetDecorator: { shape: 'Arrow' } },
    { id: 'c2', sourceID: 'process', targetID: 'end', targetDecorator: { shape: 'Arrow' } }
  ]
});
diagram.appendTo('#diagram');

let savedData: string;
// Save diagram
function saveDiagram(): void {
  savedData = diagram.saveDiagram();
}
  
// Load diagram
function loadDiagram(): void {
  diagram.loadDiagram(savedData);
}

function exportDiagram(): void {
  let exportOptions: IExportOptions = {format: 'PNG', fileName: 'diagram'};
  diagram.exportDiagram(exportOptions);
}

function printDiagram(): void {
  let printOptions: IPrintOptions = {pageOrientation: 'Landscape', region: 'Content'};
  diagram.print(printOptions);
};
```

## Next Steps

- **Diagram Settings:** [diagram-settings.md](diagram-settings.md)
- **Advanced Features:** [advanced-features.md](advanced-features.md)
- **Getting Started:** [getting-started.md](getting-started.md)
