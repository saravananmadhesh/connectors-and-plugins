# Getting Started

## Installation & Dependencies

The Syncfusion Angular Diagram component requires the following packages:

```bash
npm install @syncfusion/ej2-angular-core
npm install @syncfusion/ej2-angular-diagrams
```

### Package Dependencies

```
@syncfusion/ej2-angular-diagrams
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
├── @syncfusion/ej2-navigations
├── @syncfusion/ej2-inputs
├── @syncfusion/ej2-popups
├── @syncfusion/ej2-buttons
├── @syncfusion/ej2-lists
└── @syncfusion/ej2-splitbuttons
```

## Theme Setup

### Step 1: Import CSS Theme

The Diagram component needs Syncfusion® theme styles to display correctly. Syncfusion® theme packages include ready-to-use styles for supported control.

To add the styles, install the Tailwind 3 theme package using the following command:

```bash
npm install @syncfusion/ej2-tailwind3-theme
```

Add the following import to the **styles.css** file:

```css
  @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css";
```

For the list of available themes, refer to the [Themes](https://ej2.syncfusion.com/angular/documentation/appearance/overview) documentation.

N> Syncfusion® provides multiple built-in themes. If the application uses a different theme, replace **@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css** with the corresponding stylesheet from the desired theme package. For example, to use the Material 3 theme, import **@syncfusion/ej2-material3-theme/styles/diagram/index.css**.

## Basic Setup

### Using Standalone Components (Angular 14+)

```typescript
import { Component } from '@angular/core';
import { DiagramComponent,DiagramModule } from '@syncfusion/ej2-angular-diagrams';

@Component({
  selector: 'app-diagram',
  template: '<ejs-diagram #diagram></ejs-diagram>',
  standalone: true,
  imports: [DiagramModule],
})
export class AppComponent {}
```

### Using NgModule (Angular <14)

```typescript
import { NgModule } from '@angular/core';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';

@NgModule({
  imports: [DiagramModule],
  declarations: [AppComponent]
})
export class AppModule {}
```

## Module Injection (Inject Directive)

Syncfusion uses **opt-in feature loading** via the Inject directive:

```typescript
import { Component } from '@angular/core';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import { Diagram, BpmnDiagrams, SymbolPalette, HierarchicalTree } from '@syncfusion/ej2-diagrams';

Diagram.Inject(BpmnDiagrams, HierarchicalTree);

@Component({
  selector: 'app-root',
  template: `<ejs-diagram #diagram id="diagram"width="100%" height="600px"></ejs-diagram>`,
  standalone: true,
  styleUrls: ['app.component.css'],
  imports: [DiagramModule]
})
export class AppComponent {}

```

**Why Inject?**
- Small bundle (only inject what you use)
- Clear feature dependencies in code
- Prevents unused code inclusion

### Common Feature Modules

| Module | Purpose |
|--------|---------|
| `BpmnDiagrams` | BPMN shapes and notation |
| `HierarchicalTree` | Hierarchical auto-layout |
| `OrganizationalChart` | Org-chart layout |
| `MindMap` | Mindmap layout |
| `RadialTree` | Radial layout |
| `ComplexHierarchicalTree` | Complex hierarchical layout |
| `DataBinding` | Bind external data sources to diagram elements |
| `Snapping` | Enables grid snapping and alignment support |
| `PrintAndExport` | Print and export diagram (PNG, SVG, JPG) |
| `SymmetricLayout` | Symmetric/force-directed graph layout |
| `ConnectorBridging` | Renders bridge arcs when connectors overlap |
| `UndoRedo` | Enables undo and redo operations |
| `DiagramCollaboration` | Real-time diagram collaboration support |
| `LayoutAnimation` | Animates layout transitions |
| `DiagramContextMenu` | Adds right-click context menu support |
| `LineRouting` | Automatic routing of connectors |
| `AvoidLineOverlapping` | Prevents connector overlaps |
| `ConnectorEditing` | Allows interactive editing of connectors |
| `LineDistribution` | Distributes connectors evenly |
| `Ej1Serialization` | Supports EJ1 diagram data serialization |
| `FlowchartLayout` | Provides flowchart layout arrangement |
| `ImportAndExportVisio` | Import/export Microsoft Visio diagrams |


## Basic Diagram Component

### Minimal Example

```typescript
import { Component } from '@angular/core';
import {
  Diagram,
  DiagramComponent,
  DiagramModule,
  UndoRedo,
} from '@syncfusion/ej2-angular-diagrams';

Diagram.Inject(UndoRedo);

@Component({
  selector: 'app-root',
  template: `
    <ejs-diagram #diagram
      [width]="'100%'"
      [height]="'600px'"
      [nodes]="nodes"
      [connectors]="connectors">
    </ejs-diagram>
  `,
  standalone: true,
  imports: [DiagramModule],
})
export class AppComponent {
  nodes = [
    { id: 'node1', width: 100, height: 100, offsetX: 100, offsetY: 100 },
    { id: 'node2', width: 100, height: 100, offsetX: 300, offsetY: 100 },
  ];

  connectors = [{ id: 'connector1', sourceID: 'node1', targetID: 'node2' }];
}
```

## Using the Diagram Component in Templates

Add the diagram component to your Angular templates:

```html
<ejs-diagram #diagram
  id="diagram"
  [width]="'100%'"
  [height]="'600px'"
  [nodes]="nodes"
  [connectors]="connectors">
</ejs-diagram>
```

## CSS Imports Summary

```typescript
// main.ts
import '@syncfusion/ej2-base';
import '@syncfusion/ej2-angular-theme-default/styles/material.css';
```

## Verification

To verify setup is working:

```typescript
@Component({
  selector: 'app-test',
  template: `
    <ejs-diagram #diagram 
      [width]="'400px'" 
      [height]="'300px'"
      [nodes]="[{ id: 'test', offsetX: 100, offsetY: 100, width: 80, height: 80 }]">
    </ejs-diagram>
  `,
  standalone: true,
  imports: [DiagramModule],
})
export class TestComponent {}
```

If a white diagram canvas appears, setup is successful. Now proceed to [nodes.md](nodes.md) to add content.
