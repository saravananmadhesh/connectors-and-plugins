# Serialization and Export

## Overview

**Serialization** saves diagram data to JSON. **Export** converts diagrams to images, PDF, or other formats.

---

## JSON Serialization

### Save Diagram to JSON

```typescript
// Save complete diagram
const diagramData = diagram.saveDiagram();
console.log(diagramData);

// Save to file
const blob = new Blob([diagramData], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'diagram.json';
link.click();
```

### Load Diagram from JSON

```typescript
// Load from variable
diagram.loadDiagram(diagramData);

// Load from file
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = JSON.parse(e.target.result);
    diagram.loadDiagram(data);
  };
  reader.readAsText(file);
});
```

### Serialized Data Structure

```json
{
  "nodes": [
    {
      "id": "node1",
      "offsetX": 100,
      "offsetY": 100,
      "width": 100,
      "height": 100,
      "shape": { "type": "Flow", "shape": "Process" }
    }
  ],
  "connectors": [
    {
      "id": "connector1",
      "sourceID": "node1",
      "targetID": "node2"
    }
  ]
}
```

### Selective Save

```typescript
// Save only nodes
const nodes = diagram.nodes;

// Save only connectors
const connectors = diagram.connectors;

// Save custom properties
const data = {
  nodes: diagram.nodes,
  connectors: diagram.connectors,
  customProperty: 'value'
};
```

## Mermaid Syntax Support

The Diagram component supports importing and exporting diagrams using Mermaid syntax for flowcharts, mind maps, and UML sequence diagrams.

### Save as Mermaid Syntax

```typescript
// Export diagram to Mermaid format
const mermaidData = this.diagram.saveDiagramAsMermaid();
console.log(mermaidData);
```

### Load from Mermaid Syntax (Flowchart)

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { Diagram, FlowchartLayout } from '@syncfusion/ej2-diagrams';

Diagram.Inject(FlowchartLayout);

@Component({
  imports: [DiagramModule],
  providers: [],
  standalone: true,
  selector: "app-container",
  template: `
  <button (click)="loadMermaidFlowchart()">Load Mermaid Flowchart</button>
  <ejs-diagram #diagram id="diagram" width="100%" height="600px" [layout]="layout"> </ejs-diagram>`,
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  @ViewChild("diagram")
  public diagram!: DiagramComponent;

  layout = { type: 'Flowchart' };
  public loadMermaidFlowchart() {
    const mermaidFlowchartData = `flowchart TD
        A[Start] --> B(Process)
        B -.- C{Decision}
        C --Yes--> D[Plan 1]
        C ==>|No| E[Plan 2]
        style A fill:#90EE90,stroke:#333,stroke-width:2px;
        style B fill:#4682B4,stroke:#333,stroke-width:2px;
        style C fill:#FFD700,stroke:#333,stroke-width:2px;
        style D fill:#FF6347,stroke:#333,stroke-width:2px;
        style E fill:#FF6347,stroke:#333,stroke-width:2px;`;

    this.diagram.loadDiagramFromMermaid(mermaidFlowchartData);
  }
}
```

**Supported Mermaid Diagram Types:**
- Flowcharts with Flowchart layout
- Mind maps with MindMap layout
- UML sequence diagrams

---

## Detect Unsaved Changes

The `isModified` property returns `true` whenever the diagram has unsaved changes — node/connector edits, property updates, or undo/redo actions. Use it to show save indicators or warn before discarding changes.

```typescript
// Check for unsaved changes
if (this.diagram.isModified) {
  const confirmed = confirm('You have unsaved changes. Discard them?');
  if (!confirmed) return;
}
```

## Image Export

### Export to PNG

```typescript
// Export entire diagram
diagram.exportDiagram({format: 'PNG', fileName: 'diagram'});

// Export selected area
diagram.exportDiagram({format: 'PNG', fileName: 'diagram', region: 'PageSettings'});
```

### Export to SVG

```typescript
diagram.exportDiagram({format: 'SVG', fileName: 'diagram'});
```

### Export to JPG

```typescript
diagram.exportDiagram({format: 'JPG', fileName: 'diagram'});
```

### Export Options

```typescript
const options = {
  format: 'PNG',          // PNG, SVG, JPG
  fileName: 'diagram',
  orientation: 'Portrait',  // Portrait, Landscape
  scale: 1.0,
  region: 'Content',    // Content, PageSettings
  multiplePage: false
};

diagram.exportDiagram(options);
```

### Export with Custom Size

```typescript
diagram.pageSettings = {
  width: 1920,
  height: 1080,
  orientation: 'Landscape'
};

diagram.exportDiagram({format: 'PNG', fileName: 'large-diagram.png'});
```

---

## Print Diagram

### Print to Printer

```typescript
diagram.print({region:'Content'});
```

### Print with Options

```typescript
diagram.printSettings = {
  pageOrientation: 'Portrait',
  multiplePage: false,
  region: 'Content'
};

diagram.print(pageOrientation);
```

---

## Visio File Import

### Import Visio (.vsdx)

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  Diagram,
  ImportAndExportVisio,
  BpmnDiagrams,
  DiagramModule,
  DiagramComponent,
} from '@syncfusion/ej2-angular-diagrams';
import {
  UploaderModule,
  UploaderComponent,
  FileInfo,
} from '@syncfusion/ej2-angular-inputs';

// Inject required modules
Diagram.Inject(ImportAndExportVisio, BpmnDiagrams);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DiagramModule, UploaderModule],
  styleUrls: ['app.component.css'],
  template: `
    <ejs-uploader
      #defaultupload
      id="fileupload"
      [asyncSettings]="asyncSettings"
      [multiple]="false"
      [allowedExtensions]="'.vsdx'"
      (success)="onUploadSuccess($event)"
    >
    </ejs-uploader>

    <ejs-diagram
      #diagram
      id="diagram"
      width="100%"
      height="600px"
    >
    </ejs-diagram>
  `,
})
export class AppComponent {
  @ViewChild('diagram', { static: true })
  public diagram!: DiagramComponent;

  @ViewChild('defaultupload', { static: true })
  public uploadObject!: UploaderComponent;

  public asyncSettings: object = {
    saveUrl:
      'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
    removeUrl:
      'https://services.syncfusion.com/angular/production/api/FileUploader/Remove',
  };
  public async onUploadSuccess(args: any): Promise<void> {
    if (args.operation === 'upload') {
      const fileObj: FileInfo = args.file;
      const rawFile: File = fileObj.rawFile as File;
      if (this.diagram) {
        await this.diagram.importFromVisio(rawFile);
        this.diagram.width = '100%';
        this.diagram.height = '700px';
      }
      if (this.uploadObject) {
        this.uploadObject.clearAll();
      }
    }
  }
}

```

---

## EJ1 Migration Serialization

### Migrate from EJ1 Format

```typescript
// EJ1 format
const ej1Data = {
  nodes: [
    {
      name: 'node1',
      offsetX: 100,
      offsetY: 100
    }
  ]
};

// Convert to EJ2 format
const ej2Data = {
  nodes: [
    {
      id: ej1Data.nodes[0].name,
      offsetX: ej1Data.nodes[0].offsetX,
      offsetY: ej1Data.nodes[0].offsetY
    }
  ]
};

diagram.loadDiagram(ej2Data);
```

### Key Property Changes

| EJ1 | EJ2 |
|-----|-----|
| `name` | `id` |
| N/A | `width`, `height` |
| `labels` | `annotations` |
| `fromNode` | `sourceID` |
| `toNode` | `targetID` |

---

## Custom Serialization

### Custom Save Handler

```typescript
const customSave = () => {
  const data = diagram.saveDiagram();
  
  // Add custom properties
  data.customMetadata = {
    version: '1.0',
    author: 'John Doe',
    created: new Date().toISOString()
  };
  
  return data;
};
```

### Custom Load Handler

```typescript
const customLoad = (jsonData) => {
  const data = JSON.parse(jsonData);
  
  // Read custom metadata
  console.log('Version:', data.customMetadata.version);
  
  // Load diagram
  diagram.loadDiagram(data);
};
```

---

**→ Next: Configure [diagram settings](diagram-settings.md) for appearance and behavior**
