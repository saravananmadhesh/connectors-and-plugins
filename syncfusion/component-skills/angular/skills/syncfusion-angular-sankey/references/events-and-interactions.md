# Events and Interactions

This reference covers Sankey diagram events for handling user interactions, lifecycle events, and custom behaviors.

## Table of Contents

- [Event Overview](#event-overview)
- [Lifecycle Events](#lifecycle-events)
  - [Load Event](#load-event)
  - [Loaded Event](#loaded-event)
- [Rendering Events](#rendering-events)
  - [Node Rendering](#node-rendering)
  - [Link Rendering](#link-rendering)
  - [Label Rendering](#label-rendering)
  - [Legend Item Rendering](#legend-item-rendering)
- [Node Interaction Events](#node-interaction-events)
  - [Node Click](#node-click)
  - [Node Enter](#node-enter)
  - [Node Leave](#node-leave)
- [Link Interaction Events](#link-interaction-events)
  - [Link Click](#link-click)
  - [Link Enter](#link-enter)
  - [Link Leave](#link-leave)
- [UI Events](#ui-events)
  - [Size Changed](#size-changed)
  - [Tooltip Rendering](#tooltip-rendering)
- [Export and Print Events](#export-and-print-events)
  - [Before Export](#before-export)
  - [After Export](#after-export)
  - [Before Print](#before-print)
- [Interactive Example: Node Selection](#interactive-example-node-selection)
- [Common Event Patterns](#common-event-patterns)
  - [Pattern: Highlight Related Links](#pattern-highlight-related-links)
  - [Pattern: Track User Interactions](#pattern-track-user-interactions)


## Event Overview

The Sankey component exposes events at different lifecycle stages and for user interactions:

| Event Type | Events | Purpose |
|-----------|--------|---------|
| **Lifecycle** | load, loaded | Component initialization and completion |
| **Rendering** | nodeRendering, linkRendering, labelRendering, legendItemRendering | Dynamic styling during render |
| **Interaction** | nodeClick, nodeEnter, nodeLeave, linkClick, linkEnter, linkLeave | User interaction handling |
| **UI** | sizeChanged, tooltipRendering | UI changes and tooltip display |
| **Export** | beforeExport, afterExport, exportCompleted, beforePrint | Export and print events |

## Lifecycle Events

### Load Event

Fires before the Sankey renders. Use for configuration adjustments:

```typescript
import { Component } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import { 
  SankeyTooltipService, 
  SankeyLegendService, 
  SankeyExportService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [SankeyAllModule],
  providers: [
    SankeyTooltipService, 
    SankeyLegendService, 
    SankeyExportService
  ],
  standalone: true,
  selector: 'app-container', // Changed to standard app-root or your preferred selector
  template: `
    <div class="control-pane">
      <div class="control-section" id="sankey-container">
         <ejs-sankey 
          width="90%" 
          height="420px" 
          title="Sankey Chart" 
          (load)="onLoad($event)">
           <e-sankey-nodes>
            <e-sankey-node id="A"></e-sankey-node>
            <e-sankey-node id="B"></e-sankey-node>
            <e-sankey-node id="C"></e-sankey-node>
          </e-sankey-nodes>
           <e-sankey-links>
            <e-sankey-link sourceId="A" targetId="B" [value]="100"></e-sankey-link>
            <e-sankey-link sourceId="B" targetId="C" [value]="80"></e-sankey-link>
          </e-sankey-links>
         </ejs-sankey>
       </div>
    </div>
  `
})
export class AppComponent {
  // Method must be inside the class
  onLoad = (args: any) => {
    console.log('Sankey loading...');
  };
}
```

### Loaded Event

Fires after the Sankey has fully rendered:

```typescript
import { Component } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import { 
  SankeyTooltipService, 
  SankeyLegendService, 
  SankeyExportService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [SankeyAllModule],
  providers: [
    SankeyTooltipService, 
    SankeyLegendService, 
    SankeyExportService
  ],
  standalone: true,
  selector: 'app-container', // Changed to standard app-root or your preferred selector
  template: `
    <div class="control-pane">
      <div class="control-section" id="sankey-container">
         <ejs-sankey 
          width="90%" 
          height="420px" 
          title="Sankey Chart"
          (loaded)="onLoaded($event)">
           <e-sankey-nodes>
            <e-sankey-node id="A"></e-sankey-node>
            <e-sankey-node id="B"></e-sankey-node>
            <e-sankey-node id="C"></e-sankey-node>
          </e-sankey-nodes>
           <e-sankey-links>
            <e-sankey-link sourceId="A" targetId="B" [value]="100"></e-sankey-link>
            <e-sankey-link sourceId="B" targetId="C" [value]="80"></e-sankey-link>
          </e-sankey-links>
         </ejs-sankey>
       </div>
    </div>
  `
})
export class AppComponent {
  onLoaded = (args: any) => {
    // Post-render initialization
    console.log('Sankey loaded and rendered');
    // Perform actions after diagram is visible
  };
}

```

## Rendering Events

Use rendering events to customize elements dynamically based on data values, conditions, or business logic. This is the most powerful approach for data-driven styling.

### Node Rendering

Fires before each node is rendered:

```typescript
import { Component } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import { 
  SankeyTooltipService, 
  SankeyLegendService, 
  SankeyExportService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [SankeyAllModule],
  providers: [
    SankeyTooltipService, 
    SankeyLegendService, 
    SankeyExportService
  ],
  standalone: true,
  selector: 'app-container', // Changed to standard app-root or your preferred selector
  template: `
    <div class="control-pane">
      <div class="control-section" id="sankey-container">
         <ejs-sankey 
          width="90%" 
          height="420px" 
          title="Sankey Chart"
          (nodeRendering)="onNodeRendering($event)">
           <e-sankey-nodes>
            <e-sankey-node id="A"></e-sankey-node>
            <e-sankey-node id="B"></e-sankey-node>
            <e-sankey-node id="C"></e-sankey-node>
          </e-sankey-nodes>
           <e-sankey-links>
            <e-sankey-link sourceId="A" targetId="B" [value]="100"></e-sankey-link>
            <e-sankey-link sourceId="B" targetId="C" [value]="80"></e-sankey-link>
          </e-sankey-links>
         </ejs-sankey>
       </div>
    </div>
  `
})
export class AppComponent {
  onNodeRendering = (args: any) => {
    console.log('Sankey on Node rendering');
    if (args.node.id === 'A') {
      args.fill = '#FF6B6B';
    } else if (args.node.id === 'B') {
      args.fill = '#4ECDC4';
    }
  };
}
```

### Link Rendering

Fires before each link is rendered:

```typescript
// app.component.ts
// app.component.ts
import { Component } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import {
  SankeyTooltipService,
  SankeyLegendService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  providers: [SankeyTooltipService, SankeyLegendService],
  template: `
    <div class="control-pane">
      <div class="control-section" id="sankey-container">

        <ejs-sankey
          width="90%"
          height="450px"
          [tooltip]="tooltip"
          [legendSettings]="legendSettings"
          (linkRendering)="onLinkRendering($event)">

          <e-sankey-nodes>
            <e-sankey-node id="Agricultural Waste"></e-sankey-node>
            <e-sankey-node id="Biomass Residues"></e-sankey-node>
            <e-sankey-node id="Bio-conversion"></e-sankey-node>
            <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
            <e-sankey-node id="Electricity"></e-sankey-node>
            <e-sankey-node id="Heat"></e-sankey-node>
          </e-sankey-nodes>

          <e-sankey-links>
            <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
            <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
          </e-sankey-links>

        </ejs-sankey>

      </div>
    </div>
  `
})
export class AppComponent {

  public tooltip = {
    enable: true
  };

  public legendSettings = {
    visible: true
  };

  onLinkRendering(args:any): void {
    if (args.link.sourceId === 'Bio-conversion' && args.link.targetId === 'Heat') {
      args.fill = '#FF6B6B';
    } else {
      args.fill = '#211cb4';
    }
  }
}
```

### Label Rendering

Fires before labels are rendered:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import {
  SankeyTooltipService,
  SankeyLegendService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  providers: [SankeyTooltipService, SankeyLegendService],
  template: `
    <div class="control-pane">
      <div class="control-section" id="sankey-container">

        <ejs-sankey
          width="90%"
          height="450px"
          [tooltip]="tooltip"
          [legendSettings]="legendSettings"
          (labelRendering)="onLabelRendering($event)">

          <e-sankey-nodes>
            <e-sankey-node id="Agricultural Waste"></e-sankey-node>
            <e-sankey-node id="Biomass Residues"></e-sankey-node>
            <e-sankey-node id="Bio-conversion"></e-sankey-node>
            <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
            <e-sankey-node id="Electricity"></e-sankey-node>
            <e-sankey-node id="Heat"></e-sankey-node>
          </e-sankey-nodes>

          <e-sankey-links>
            <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
            <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
          </e-sankey-links>

        </ejs-sankey>

      </div>
    </div>
  `
})
export class AppComponent {

  public tooltip = {
    enable: true
  };

  public legendSettings = {
    visible: true
  };

  onLabelRendering = (args: any) => {
    // Customize label text or styling
    if (args.text.length > 20) {
      args.text = args.text.substring(0, 17) + '...';
    }
  };
}
```

### Legend Item Rendering

Fires before legend items are rendered:

```typescript
import { Component, OnInit } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import { SankeyLegendService } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [SankeyAllModule],
    providers: [SankeyLegendService],
    standalone: true,
    selector: 'app-container',
    template: `
    <div class="control-pane">
      <div class="control-section" id="sankey-container">

        <ejs-sankey width="90%" height="450px" [legendSettings]="legendSettings" (legendItemRendering)="onLegendItemRendering($event)">

          <e-sankey-nodes>
            <e-sankey-node id="Agricultural Waste"></e-sankey-node>
            <e-sankey-node id="Biomass Residues"></e-sankey-node>
            <e-sankey-node id="Bio-conversion"></e-sankey-node>
            <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
            <e-sankey-node id="Electricity"></e-sankey-node>
            <e-sankey-node id="Heat"></e-sankey-node>
          </e-sankey-nodes>

          <e-sankey-links>
            <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
            <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
          </e-sankey-links>

        </ejs-sankey>

      </div>
    </div>
    `
})
export class AppComponent implements OnInit {
    public legendSettings?: Object;

    ngOnInit(): void {
        this.legendSettings = { visible: true, position: 'Bottom' };
    }

    onLegendItemRendering(args: any): void {
        args.text = args.text.toUpperCase();
        args.fill = '#333';
    }
}
```

## Node Interaction Events

Handle user interactions with nodes:

### Node Click

Fires when a node is clicked:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this for *ngIf
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import { SankeyLegendService } from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    // Add CommonModule here so *ngIf works
    imports: [SankeyAllModule, CommonModule], 
    providers: [SankeyLegendService],
    template: `
    <div class="control-pane">
      <div class="control-section" id="sankey-container">
        <ejs-sankey 
          width="90%" 
          height="450px" 
          [legendSettings]="legendSettings" 
          (nodeClick)="onNodeClick($event)">

          <e-sankey-nodes>
            <e-sankey-node id="Agricultural Waste"></e-sankey-node>
            <e-sankey-node id="Biomass Residues"></e-sankey-node>
            <e-sankey-node id="Bio-conversion"></e-sankey-node>
            <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
            <e-sankey-node id="Electricity"></e-sankey-node>
            <e-sankey-node id="Heat"></e-sankey-node>
          </e-sankey-nodes>

          <e-sankey-links>
            <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
            <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
          </e-sankey-links>
        </ejs-sankey>

        <!-- Details Section -->
<!-- Details Section -->
<div *ngIf="selectedNode" class="details" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;">
  <h3>Node ID: {{ selectedNode.id }}</h3>
</div>

      </div>
    </div>
    `
})
export class AppComponent implements OnInit {
    public legendSettings?: Object;
    public selectedNode: any = null;

    ngOnInit(): void {
        this.legendSettings = { visible: true, position: 'Bottom' };
    }

    onNodeClick = (args: any) => {
      // Syncfusion events sometimes run outside Angular zone, 
      // but standard property assignment usually works fine here.
      this.selectedNode = args.node;
      if(this.selectedNode.id)
      console.log('Node Selected:', this.selectedNode.id);
    };
}
```

### Node Enter

Fires when mouse enters a node (hover):

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this for *ngIf
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import { SankeyLegendService } from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    // Add CommonModule here so *ngIf works
    imports: [SankeyAllModule, CommonModule], 
    providers: [SankeyLegendService],
    template: `
    <div class="control-pane">
      <div class="control-section" id="sankey-container">
        <ejs-sankey 
          width="90%" 
          height="450px" 
          [legendSettings]="legendSettings" 
          (nodeEnter)="onNodeEnter($event)">

          <e-sankey-nodes>
            <e-sankey-node id="Agricultural Waste"></e-sankey-node>
            <e-sankey-node id="Biomass Residues"></e-sankey-node>
            <e-sankey-node id="Bio-conversion"></e-sankey-node>
            <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
            <e-sankey-node id="Electricity"></e-sankey-node>
            <e-sankey-node id="Heat"></e-sankey-node>
          </e-sankey-nodes>

          <e-sankey-links>
            <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
            <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
          </e-sankey-links>
        </ejs-sankey>

        <!-- Details Section -->
<!-- Details Section -->
<div *ngIf="selectedNode" class="details" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;">
  <h3>Node ID: {{ selectedNode.id }}</h3>
</div>

      </div>
    </div>
    `
})
export class AppComponent implements OnInit {
    public legendSettings?: Object;
    public selectedNode: any = null;

    ngOnInit(): void {
        this.legendSettings = { visible: true, position: 'Bottom' };
    }

    onNodeEnter(args: any): void {
      this.selectedNode=args.node
      console.log('Node hovered:', args.node);
    }
}
```

### Node Leave

Fires when mouse leaves a node:

```typescript
@Component({
  template: `
    <ejs-sankey 
        <ejs-sankey 
          width="90%" 
          height="450px" 
          (nodeLeave)="onNodeLeave($event)">
    </ejs-sankey>
  `
})
export class AppComponent implements OnInit {

    ngOnInit(): void {
        this.legendSettings = { visible: true, position: 'Bottom' };
    }

    onNodeLeave(args: any): void {
      this.selectedNode=args.node
      console.log('Node hovered:', args.node);
    }
}

```

## Link Interaction Events

Handle interactions with flow links:

### Link Click

Fires when a link is clicked:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this for *ngIf
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import { SankeyLegendService } from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    // Add CommonModule here so *ngIf works
    imports: [SankeyAllModule, CommonModule], 
    providers: [SankeyLegendService],
    template: `
    <div class="control-pane">
      <div class="control-section" id="sankey-container">
        <ejs-sankey 
          width="90%" 
          height="450px"
          (linkClick)="onLinkClick($event)">

          <e-sankey-nodes>
            <e-sankey-node id="Agricultural Waste"></e-sankey-node>
            <e-sankey-node id="Biomass Residues"></e-sankey-node>
            <e-sankey-node id="Bio-conversion"></e-sankey-node>
            <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
            <e-sankey-node id="Electricity"></e-sankey-node>
            <e-sankey-node id="Heat"></e-sankey-node>
          </e-sankey-nodes>

          <e-sankey-links>
            <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
            <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
          </e-sankey-links>
        </ejs-sankey>

        <!-- Details Section -->
<!-- Details Section -->
<div *ngIf="selectedLink" class="details" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;">
  <h3>Value: {{ selectedLink.value}}</h3>
</div>

      </div>
    </div>
    `
})
export class AppComponent {
    public selectedLink: any = null;
    onLinkClick = (args: any) => {
      console.log('Value:', args.link.value);
      
      // Perform action
      this.selectedLink = args.link;
    };
}

```

### Link Enter

Fires when mouse enters a link:

```typescript
@Component({
  template: `
    <ejs-sankey 
      (linkEnter)="onLinkEnter($event)">
    </ejs-sankey>
  `
})
export class AppComponent {
  onLinkEnter = (args: any) => {
    console.log('Value:', args.link.value);
  };
}
```

### Link Leave

Fires when mouse leaves a link:

```typescript
@Component({
  template: `
    <ejs-sankey 
      (linkLeave)="onLinkLeave($event)">
    </ejs-sankey>
  `
})
export class AppComponent {
  onLinkLeave = (args: any) => {
    console.log('Value:', args.link.value);
  };
}
```

## UI Events

### Size Changed

Fires when diagram size changes (window resize):

```typescript


@Component({
  template: `
    <ejs-sankey 
      width="100%"
      (sizeChanged)="onSizeChanged($event)">
    </ejs-sankey>
  `
})
export class AppComponent {
onSizeChanged = (args: any) => {
  console.log('New size:', args.currentSize.width, args.currentSize.height);
  // Adjust dependent components if needed
};
}
```

### Tooltip Rendering

Fires before tooltip is displayed:

```typescript
import { Component } from '@angular/core';
import { SankeyAllModule} from '@syncfusion/ej2-angular-charts';
import {
  SankeyTooltipService,
  SankeyLegendService,
  SankeyExportService
} from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [SankeyAllModule],
  providers: [
    SankeyTooltipService,
    SankeyLegendService,
    SankeyExportService
  ],
  standalone: true,
  selector: 'app-container',
  template: `
  <div class="control-pane">
      <div class="control-section"  id="sankey-container">
      <ejs-sankey
    width="90%"
    height="450px"
    [tooltip]="{ enable: true }"
    (tooltipRendering)="onTooltipRender($event)">

    <e-sankey-nodes>
      <e-sankey-node id="Agricultural Waste"></e-sankey-node>
      <e-sankey-node id="Biomass Residues"></e-sankey-node>
      <e-sankey-node id="Bio-conversion"></e-sankey-node>
      <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
      <e-sankey-node id="Electricity"></e-sankey-node>
      <e-sankey-node id="Heat"></e-sankey-node>
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
      <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
      <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
      <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
      <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
    </e-sankey-links>

  </ejs-sankey>
      </div>
    </div>`
})
export class AppComponent {

 onTooltipRender(args: any): void {
    if (args.link) {
      args.text = `Flow: ${args.link.sourceId} → ${args.link.targetId} (${args.link.value})`;
    } else if (args.node) {
      args.text = `Node: ${args.node.id}`;
    }
  }
}
```

## Export and Print Events

### Before Export

Fires before export starts:

```typescript
// app.component.ts
import { Component, ViewChild } from '@angular/core';
import { 
  SankeyAllModule, 
  SankeyComponent,
  SankeyTooltipService, 
  SankeyLegendService, 
  SankeyExportService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  providers: [
    SankeyTooltipService,
    SankeyLegendService,
    SankeyExportService
  ],
  template: `
  <div class="control-pane">
      <div class="control-section" id="sankey-container">
        <button (click)="exportChart()" style="margin-bottom: 10px;">
          Export PNG
        </button>

        <!-- Added #sankeyChart here -->
        <ejs-sankey
          #sankeyChart
          width="90%"
          height="450px"
          [tooltip]="tooltip"
          [legendSettings]="legendSettings"
          (beforeExport)="beforeExport($event)"
        >
          <e-sankey-nodes>
            <e-sankey-node id="Agricultural Waste"></e-sankey-node>
            <e-sankey-node id="Biomass Residues"></e-sankey-node>
            <e-sankey-node id="Bio-conversion"></e-sankey-node>
            <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
            <e-sankey-node id="Electricity"></e-sankey-node>
            <e-sankey-node id="Heat"></e-sankey-node>
          </e-sankey-nodes>

          <e-sankey-links>
            <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
            <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
          </e-sankey-links>
        </ejs-sankey>
      </div>
    </div>
  `,
  styles: [`
    .control-pane { padding: 20px; }
    .control-section { max-width: 1400px; margin: 0 auto; }
    button { padding: 8px 16px; cursor: pointer; background: #0078d4; color: white; border: none; border-radius: 4px; }
  `]
})
export class AppComponent {
  // This decorator now correctly finds the component in the template
  @ViewChild('sankeyChart') sankeyChart!: any;

  public tooltip = { enable: true };
  public legendSettings = { visible: true };

  beforeExport(args: any): void {
    // You can modify args.fileName or args.width here before the export starts
    args.cancel = false; 
  }

  exportChart(): void {
    if (this.sankeyChart) {
      this.sankeyChart.export('PNG', 'Sankey');
    }
  }
}
```

### After Export

Fires after export completes:

```typescript
import { Component, ViewChild } from '@angular/core';
import { 
  SankeyAllModule, 
  SankeyComponent,
  SankeyTooltipService, 
  SankeyExportService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  providers: [SankeyTooltipService, SankeyExportService],
  template: `
    <div class="control-pane" style="padding: 20px;">
      <button (click)="exportChart()" style="margin-bottom: 10px;">
        Export PNG
      </button>

      <ejs-sankey
        #sankeyChart
        width="90%"
        height="450px"
        (afterExport)="onAfterExport($event)"
      >
        <e-sankey-nodes>
          <e-sankey-node id="Agricultural Waste"></e-sankey-node>
          <e-sankey-node id="Biomass Residues"></e-sankey-node>
          <e-sankey-node id="Bio-conversion"></e-sankey-node>
          <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
          <e-sankey-node id="Electricity"></e-sankey-node>
          <e-sankey-node id="Heat"></e-sankey-node>
        </e-sankey-nodes>

        <e-sankey-links>
          <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
          <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
          <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
          <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
          <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
        </e-sankey-links>
      </ejs-sankey>
    </div>
  `
})
export class AppComponent {
  @ViewChild('sankeyChart') sankeyChart!: any;

  // This fires once the browser has finished the export process
  onAfterExport = (args: any) => {
    console.log('Export completed', args);
  };

  exportChart(): void {
    if (this.sankeyChart) {
      this.sankeyChart.export('PNG', 'Sankey_Diagram');
    }
  }
}
```

### Before Print

Fires before print dialog opens:

```typescript
import { Component, ViewChild } from '@angular/core';
import { 
  SankeyAllModule, 
  SankeyComponent,
  SankeyExportService,
  SankeyTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  providers: [
    SankeyTooltipService,
    SankeyExportService // Required for printing events to fire
  ],
  template: `
    <div style="padding: 20px;">
      <button (click)="printDiagram()" style="margin-bottom: 10px;">
        Print Diagram
      </button>

      <ejs-sankey
        #sankeyChart
        width="90%"
        height="450px"
        (beforePrint)="onBeforePrint($event)"
      >
        <e-sankey-nodes>
          <e-sankey-node id="Agricultural Waste"></e-sankey-node>
          <e-sankey-node id="Biomass Residues"></e-sankey-node>
          <e-sankey-node id="Bio-conversion"></e-sankey-node>
          <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
          <e-sankey-node id="Electricity"></e-sankey-node>
          <e-sankey-node id="Heat"></e-sankey-node>
        </e-sankey-nodes>

        <e-sankey-links>
          <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
          <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
          <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
          <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
          <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
        </e-sankey-links>
      </ejs-sankey>
    </div>
  `
})
export class AppComponent {
  @ViewChild('sankeyChart') sankeyChart!: any;

  // This fires before the browser's print dialog appears
  onBeforePrint = (args: any) => {
    console.log('Print initiated', args);
    // You can modify args.cancel = true here if you want to block printing
  };

  printDiagram(): void {
    if (this.sankeyChart) {
      this.sankeyChart.print();
    }
  }
}
```

## Interactive Example: Node Selection

```typescript
import { Component } from '@angular/core';
import { SankeyAllModule, SankeyTooltipService } from '@syncfusion/ej2-angular-charts';
import { CommonModule } from '@angular/common';

@Component({
  imports: [SankeyAllModule, CommonModule], // Added CommonModule for *ngIf
  providers: [SankeyTooltipService],
  standalone: true,
  selector: 'app-container',
  template: `
    <div class="container">
      <ejs-sankey 
        (nodeClick)="onNodeClick($event)"
        (nodeEnter)="onNodeEnter($event)"
        (nodeLeave)="onNodeLeave($event)">
        <e-sankey-nodes>
            <e-sankey-node id="Agricultural Waste"></e-sankey-node>
            <e-sankey-node id="Biomass Residues"></e-sankey-node>
            <e-sankey-node id="Bio-conversion"></e-sankey-node>
            <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
            <e-sankey-node id="Electricity"></e-sankey-node>
            <e-sankey-node id="Heat"></e-sankey-node>
        </e-sankey-nodes>
        <e-sankey-links>
            <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
            <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
        </e-sankey-links>
      </ejs-sankey>

      <div *ngIf="selectedNode" class="sidebar">
        <h3>{{ selectedNode.id }}</h3>
        <p><strong>Status:</strong> Currently Selected</p>
      </div>
    </div>
  `
})
export class AppComponent {
  public selectedNode: any = null;
  onNodeClick = (args: any) => {
    this.selectedNode = args.node
    this.selectedNode.color="black";
  };

  onNodeEnter = (args: any) => {
    this.selectedNode.color="green";
  };

  onNodeLeave = (args: any) => {
    this.selectedNode.color="red";
  };

  clearSelection() {
    this.selectedNode = null;
  }
}
```

## Common Event Patterns

### Pattern: Highlight Related Links

```typescript
import { Component, ViewChild } from '@angular/core';
import { SankeyAllModule, SankeyTooltipService, SankeyComponent } from '@syncfusion/ej2-angular-charts';
import { CommonModule } from '@angular/common';

@Component({
  imports: [SankeyAllModule, CommonModule],
  providers: [SankeyTooltipService],
  standalone: true,
  selector: 'app-container',
  template: `
    <div class="container">
      <!-- Added #sankey reference -->
      <ejs-sankey #sankey 
        (nodeClick)="onNodeClick($event)">
        <e-sankey-nodes>
            <e-sankey-node id="Agricultural Waste"></e-sankey-node>
            <e-sankey-node id="Biomass Residues"></e-sankey-node>
            <e-sankey-node id="Bio-conversion"></e-sankey-node>
            <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
            <e-sankey-node id="Electricity"></e-sankey-node>
            <e-sankey-node id="Heat"></e-sankey-node>
        </e-sankey-nodes>
        <e-sankey-links>
            <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
            <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
        </e-sankey-links>
      </ejs-sankey>

      <div *ngIf="selectedNode" class="sidebar">
        <h3>{{ selectedNode.id }}</h3>
        <p><strong>Status:</strong> Currently Selected</p>
        <p><strong>Connected Links:</strong> {{ highlightedLinks.length }}</p>
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild('sankey') public sankey?: SankeyComponent;
  public selectedNode: any = null;
  public highlightedLinks: any[] = [];

  onNodeClick(args: any) {
    this.selectedNode = args.node;
    const nodeId = args.node.id;

    // Filter from the component's links collection
    if (this.sankey) {
      this.highlightedLinks = (this.sankey as any).links.filter(
        (link: any) => link.sourceId === nodeId || link.targetId === nodeId
      );
    }
  }
}
```

### Pattern: Track User Interactions

```typescript
import { Component, ViewChild } from '@angular/core';
import { SankeyAllModule, SankeyTooltipService, SankeyComponent } from '@syncfusion/ej2-angular-charts';
import { CommonModule } from '@angular/common';

@Component({
  imports: [SankeyAllModule, CommonModule],
  providers: [SankeyTooltipService],
  standalone: true,
  selector: 'app-container',
  template: `
    <div class="container">
      <!-- Added #sankey reference -->
      <ejs-sankey
        (nodeClick)="onNodeClick($event)"
  (linkClick)="onLinkClick($event)">>
        <e-sankey-nodes>
            <e-sankey-node id="Agricultural Waste"></e-sankey-node>
            <e-sankey-node id="Biomass Residues"></e-sankey-node>
            <e-sankey-node id="Bio-conversion"></e-sankey-node>
            <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
            <e-sankey-node id="Electricity"></e-sankey-node>
            <e-sankey-node id="Heat"></e-sankey-node>
        </e-sankey-nodes>
        <e-sankey-links>
            <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
            <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
        </e-sankey-links>
      </ejs-sankey>

      <div *ngIf="selectedNode" class="sidebar">
        <h3>{{ selectedNode.id }}</h3>
        <p><strong>Status:</strong> Currently Selected</p>
        <p><strong>Connected Links:</strong> {{ highlightedLinks.length }}</p>
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild('sankey') public sankey?: SankeyComponent;
  public selectedNode: any = null;
  public highlightedLinks: any[] = [];

  
  interactionLog: any[] = [];
  
  // Triggered when a node is clicked
  onNodeClick = (args: any) => {
    this.interactionLog.push({
      type: 'nodeClick',
      nodeId: args.node.id, // Unique identifier of the node
      timestamp: new Date()
    });
    console.log('Node Interaction Logged:', args.node.id);
  };
  
  // Triggered when a link is clicked
  onLinkClick = (args: any) => {
    this.interactionLog.push({
      type: 'linkClick',
      source: args.link.sourceId, // ID of the source node
      target: args.link.targetId, // ID of the target node
      value: args.link.value,      // Weight/Value of the flow
      timestamp: new Date()
    });
    console.log('Link Interaction Logged:', `${args.link.sourceId} -> ${args.link.targetId}`);
  };
}