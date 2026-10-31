# Advanced Features

This reference covers advanced Sankey capabilities including orientation, RTL support, export, accessibility, performance optimization, and responsive design patterns.

## Table of Contents

- [Orientation](#orientation)
  - [Horizontal Orientation](#horizontal-orientation)
  - [Vertical Orientation](#vertical-orientation)
  - [Switching Orientations Dynamically](#switching-orientations-dynamically)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
  - [Enable RTL Mode](#enable-rtl-mode)
  - [RTL with Arabic Content](#rtl-with-arabic-content)
  - [Dynamic RTL Toggle](#dynamic-rtl-toggle)
- [Print and Export](#print-and-export)
  - [Export to PNG](#export-to-png)
  - [Export to Multiple Formats](#export-to-multiple-formats)
  - [Print Diagram](#print-diagram)
  - [Export with Custom Dimensions](#export-with-custom-dimensions)
- [Responsive Design](#responsive-design)
  - [Mobile-Optimized Layouts](#mobile-optimized-layouts)
  - [Responsive Height Calculation](#responsive-height-calculation)
- [Accessibility](#accessibility)
  - [WCAG Compliance](#wcag-compliance)
  - [Keyboard Navigation](#keyboard-navigation)
  - [Color Contrast and Text Alternatives](#color-contrast-and-text-alternatives)
  - [Screen Reader Support](#screen-reader-support)
- [Performance Optimization](#performance-optimization)
  - [Data Virtualization](#data-virtualization)
  - [Optimize Rendering Events](#optimize-rendering-events)
  - [Reduce Visual Complexity](#reduce-visual-complexity)
  - [Loading ON Demand Implementation](#loading-on-demand-implementation)
- [Edge Cases and Troubleshooting](#edge-cases-and-troubleshooting)
  - [Empty Data](#empty-data)
  - [Circular References](#circular-references)
  - [Missing Node References](#missing-node-references)
  - [Layout Issues](#layout-issues)

## Orientation

The Sankey diagram supports both horizontal and vertical flow orientations.

### Horizontal Orientation

Nodes flow from left to right Links flow horizontally between nodes. (Default):

```typescript
@Component({
  template: `
    <ejs-sankey
      orientation="Horizontal">
    </ejs-sankey>
  `
})
export class AppComponent {
}
```

### Vertical Orientation

Nodes flow from top to bottom:

```typescript
@Component({
  template: `
    <ejs-sankey
      orientation="Vertical">
    </ejs-sankey>
  `
})
export class AppComponent {

}
```

### Switching Orientations Dynamically

```typescript
@Component({
// app.component.ts
import { Component ,ViewChild} from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import {SankeyComponent,
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
  <div>
    <div class="controls">
      <button (click)="setOrientation('Horizontal')">Horizontal</button>
      <button (click)="setOrientation('Vertical')">Vertical</button>
    </div>
    
  <ejs-sankey
    width="90%"
    height="450px"
    [orientation]="currentOrientation"
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
`,
styles: [`
  .controls {
    margin-bottom: 20px;
  }

  button {
    padding: 8px 16px;
    margin-right: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background: #0056b3;
  }
`]
})
export class AppComponent {
  // Initial state
  public currentOrientation: string = 'Horizontal';
  
  // Reference to the Sankey component
  @ViewChild('sankey') public sankey?: any;

  public setOrientation(orientation: string): void {
    // Valid values are 'Horizontal' or 'Vertical'
    this.currentOrientation = orientation;
    
    // Refresh the component to recalculate the layout
    if (this.sankey) {
      this.sankey.refresh();
    }
  }
}

```

## Right-to-Left (RTL) Support

The Sankey component supports right-to-left rendering for multilingual applications.

### Enable RTL Mode

```typescript
@Component({
  template: `
    <ejs-sankey
      enableRtl="true">
    </ejs-sankey>
  `
})
export class AppComponent {
}
```

### RTL with Arabic Content

```typescript
// app.component.ts
import { Component ,ViewChild} from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import {SankeyComponent,
  SankeyTooltipService,
  SankeyLegendService,
  SankeyExportService
} from '@syncfusion/ej2-angular-charts';
@Component({
  selector: 'app-container',
  standalone: true,
  imports: [SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div class="sankey-wrapper">
      <ejs-sankey 
        id="sankey-rtl"
        [nodes]="arabicNodes"
        [links]="arabicLinks"
        [enableRtl]="true"
        width="100%"
        height="400px">
      </ejs-sankey>
    </div>
  `,
  styles: [`
    .sankey-wrapper {
      direction: rtl; /* Sets text direction for the container */
      font-family: Arial, sans-serif;
    }
  `]
})
export class AppComponent {
  // Use 'nodes' and 'links' properties directly
  public arabicNodes = [
    { id: 'النفط' },
    { id: 'الشمس' },
    { id: 'الشبكة' }
  ];

  public arabicLinks = [
    { sourceId: 'النفط', targetId: 'الشبكة', value: 300 },
    { sourceId: 'الشمس', targetId: 'الشبكة', value: 100 }
  ];
}

```

### Dynamic RTL Toggle

```typescript
import { Component, ViewChild } from '@angular/core';
import { 
  SankeyAllModule, 
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
    <div [class.rtl-mode]="isRtl" style="padding: 20px; font-family: sans-serif;">
      <div style="margin-bottom: 20px;">
        <button (click)="toggleRtl()">
          Switch to {{ isRtl ? 'LTR' : 'RTL' }}
        </button>
      </div>
             
      <ejs-sankey 
        #sankey 
        id="sankey-container"
        width="100%" 
        height="500px"
        [enableRtl]="isRtl"
        [tooltip]="{ enable: true }">
        
        <!-- Manual Node Definition -->
        <e-sankey-nodes>
          <e-sankey-node id="Agricultural Waste"></e-sankey-node>
          <e-sankey-node id="Biomass Residues"></e-sankey-node>
          <e-sankey-node id="Bio-conversion"></e-sankey-node>
          <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
          <e-sankey-node id="Electricity"></e-sankey-node>
          <e-sankey-node id="Heat"></e-sankey-node>
        </e-sankey-nodes>

        <!-- Manual Link Definition -->
        <e-sankey-links>
          <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
          <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
          <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
          <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
          <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
        </e-sankey-links>

      </ejs-sankey>
    </div>
  `,
  styles: [`
    .rtl-mode {
      direction: rtl;
    }
    button {
      padding: 10px 15px;
      cursor: pointer;
      background: #0078d4;
      color: white;
      border: none;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  isRtl = false;
  @ViewChild('sankey') sankey: any;

  toggleRtl() {
    this.isRtl = !this.isRtl;
    
    // Update document direction for label alignment
    document.documentElement.dir = this.isRtl ? 'rtl' : 'ltr';

    // Refresh the component to apply RTL mirroring
    setTimeout(() => {
      if (this.sankey) {
        this.sankey.refresh();
      }
    });
  }
}

```

## Print and Export

Export diagrams to multiple formats.

### Export to PNG

```typescript
import { Component, ViewChild } from '@angular/core';
import { 
  SankeyAllModule, 
  SankeyTooltipService, 
  SankeyExportService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [SankeyAllModule],
  providers: [SankeyTooltipService, SankeyExportService],
  template: `
    <div style="padding: 20px;">
      <button (click)="exportToPng()" style="margin-bottom: 10px; cursor: pointer;">
        Export PNG
      </button>
      
      <ejs-sankey 
        #sankey
        id="sankey-container"
        width="100%"
        height="450px">
        
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
  // This matches the #sankey reference in the template
  @ViewChild('sankey') sankey: any;

  exportToPng() {
    if (this.sankey) {
      // Arguments: Type ('PNG'), FileName, Orientation, AllowDownload
      this.sankey.export('PNG', 'sankey-diagram');
    }
  }
}

```

### Export to Multiple Formats

```typescript
import { Component, ViewChild } from '@angular/core';
import { SankeyAllModule, SankeyComponent } from '@syncfusion/ej2-angular-charts';
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
        <button (click)="exportPNG()" style="margin-right: 5px;">Export PNG</button>
        <button (click)="exportPDF()" style="margin-right: 5px;">Export PDF</button>
        <button (click)="exportSVG()" style="margin-bottom: 10px;">Export SVG</button>

        <ejs-sankey
          #sankeyChart
          id="sankey-container"
          width="90%"
          height="450px">
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
  @ViewChild('sankeyChart') sankeyChart?: any;

  exportPNG() {
    if (this.sankeyChart) {
      this.sankeyChart.export('PNG', 'Sankey');
    }
  }

  exportPDF() {
    if (this.sankeyChart) {
      this.sankeyChart.export('PDF', 'Sankey');
    }
  }

  exportSVG() {
    if (this.sankeyChart) {
      this.sankeyChart.export('SVG', 'Sankey');
    }
  }
}
```

### Print Diagram

```typescript
import { Component, ViewChild } from '@angular/core';
import { 
  SankeyAllModule, 
  SankeyTooltipService, 
  SankeyExportService // Required for the .print() method
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  providers: [SankeyTooltipService, SankeyExportService],
  template: `
    <div style="padding: 20px;">
      <button (click)="printDiagram()" style="margin-bottom: 10px; cursor: pointer;">
        Print Diagram
      </button>
      
      <!-- Template reference #sankey matches @ViewChild -->
      <ejs-sankey 
        #sankey
        id="sankey-container"
        width="100%"
        height="450px">
        
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
  `,
  styles: [`
    @media print {
      /* Hide the button when printing */
      button {
        display: none;
      }

      /* Ensure the Sankey container takes full page width */
      #sankey-container {
        width: 100% !important;
        height: auto !important;
      }
    }
  `]
})
export class AppComponent {
  @ViewChild('sankey') sankey: any;

  printDiagram() {
    if (this.sankey) {
      // Triggers the browser's print dialog for the component
      this.sankey.print();
    }
  }
}

```

### Export with Custom Dimensions

```typescript
import { Component, ViewChild } from '@angular/core';
import { 
  SankeyAllModule, 
  SankeyTooltipService, 
  SankeyExportService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  providers: [SankeyTooltipService, SankeyExportService],
  template: `
    <div style="padding: 20px;">
      <button (click)="exportCustom('PNG')" style="margin-right: 5px;">Export PNG (Custom Size)</button>
      <button (click)="exportCustom('PDF')" style="margin-bottom: 10px;">Export PDF (Custom Size)</button>
      
      <ejs-sankey 
        #sankey
        id="sankey-container"
        width="100%"
        height="450px">
        
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
  @ViewChild('sankey') sankey: any;

  exportCustom(format: string) {
    if (this.sankey) {
      // Export with width and height parameters for custom dimensions
      // Supported formats: 'PNG', 'PDF', 'SVG', 'JPEG'
      this.sankey.export(format, `Sankey-${format}`);
    }
  }
}

```

## Responsive Design

### Mobile-Optimized Layouts

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SankeyAllModule, 
  SankeyTooltipService 
} from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [CommonModule, SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div class="sankey-responsive">
      <ejs-sankey 
        #sankey
        id="sankey-container"
        [width]="chartWidth"
        [height]="chartHeight"
        [orientation]="chartOrientation"
        [labelSettings]="labelSettings"
        [tooltip]="{ enable: true }">
        
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
  `,
  styles: [`
    .sankey-responsive {
      width: 100%;
      overflow-x: auto;
    }

    @media (max-width: 768px) {
      .sankey-responsive {
        padding: 10px;
      }
    }

    @media (max-width: 480px) {
      .sankey-responsive {
        padding: 5px;
      }
    }
  `]
})
export class AppComponent {
  // Responsive properties based on device type
  get chartWidth(): string {
    return Browser.isDevice ? '100%' : '90%';
  }

  get chartHeight(): string {
    if (Browser.isDevice) {
      return window.innerHeight > 800 ? '600px' : '400px';
    }
    return '450px';
  }

  get chartOrientation(): string {
    // Use vertical orientation on small screens, horizontal otherwise
    return Browser.isDevice ? 'Vertical' : 'Horizontal';
  }

  get labelSettings(): any {
    return {
      visible: !Browser.isDevice // Hide labels on mobile for better space usage
    };
  }
}

```

### Responsive Height Calculation

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SankeyAllModule, 
  SankeyTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [CommonModule, SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div class="container" [style.height.px]="containerHeight">
      <ejs-sankey 
        #sankey
        id="sankey-container"
        width="100%"
        [height]="chartHeight"
        [tooltip]="{ enable: true }">
        
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
  `,
  styles: [`
    .container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class AppComponent implements OnInit {
  chartHeight: string = '450px';
  containerHeight: number = 450;

  ngOnInit() {
    this.calculateResponsiveHeight();
    window.addEventListener('resize', () => this.calculateResponsiveHeight());
  }

  calculateResponsiveHeight() {
    const viewportHeight = window.innerHeight;
    const headerHeight = 60; // Estimated header height
    const paddingHeight = 40;
    
    const calculatedHeight = Math.max(
      400, // Minimum height
      viewportHeight - headerHeight - paddingHeight
    );
    
    this.chartHeight = `${calculatedHeight}px`;
    this.containerHeight = calculatedHeight;
  }
}

```

## Accessibility

Implement accessibility features for compliance and usability.

### WCAG Compliance

```typescript
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SankeyAllModule, 
  SankeyTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [CommonModule, SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>Energy Flow Diagram</h2>
      <p>This diagram shows energy distribution from sources to consumers.</p>
      
      <ejs-sankey 
        #sankey
        height="400px"
        [tooltip]="tooltipSettings"
        ariaLabel="Energy flow Sankey diagram">
        
        <!-- Manual Node Definition -->
        <e-sankey-nodes>
          <e-sankey-node id="Coal" label="Coal"></e-sankey-node>
          <e-sankey-node id="Solar" label="Solar"></e-sankey-node>
          <e-sankey-node id="Grid" label="Power Grid"></e-sankey-node>
        </e-sankey-nodes>

        <!-- Manual Link Definition -->
        <e-sankey-links>
          <e-sankey-link sourceId="Coal" targetId="Grid" [value]="300"></e-sankey-link>
          <e-sankey-link sourceId="Solar" targetId="Grid" [value]="100"></e-sankey-link>
        </e-sankey-links>

      </ejs-sankey>

      <details style="margin-top: 20px;">
        <summary style="cursor: pointer; font-weight: bold;">View Data Table</summary>
        <table border="1" style="width: 100%; margin-top: 10px; border-collapse: collapse;">
          <thead>
            <tr style="background: #f4f4f4;">
              <th>Source</th>
              <th>Target</th>
              <th>Value (MW)</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let link of links">
              <td>{{ link.sourceId }}</td>
              <td>{{ link.targetId }}</td>
              <td>{{ link.value }}</td>
            </tr>
          </tbody>
        </table>
      </details>
    </div>
  `
})
export class AppComponent {
  // We keep this array purely to drive the HTML data table
  links = [
    { sourceId: 'Coal', targetId: 'Grid', value: 300 },
    { sourceId: 'Solar', targetId: 'Grid', value: 100 }
  ];

  public tooltipSettings: object = {
    enable: true,
    format: '${sourceId} to ${targetId}: <b>${value} MW</b>'
  };
}

```

### Keyboard Navigation

```typescript
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SankeyAllModule, 
  SankeyTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [CommonModule, SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>Keyboard Navigable Sankey</h2>
      <p>Use <b>Left/Right Arrows</b> to navigate and <b>Enter</b> to select.</p>
      
      <ejs-sankey 
        #sankey
        id="sankey-container"
        height="400px"
        tabindex="0"
        (keyDown)="onKeyDown($event)"
        [tooltip]="{ enable: true }">
        
        <e-sankey-nodes>
          <e-sankey-node id="Coal" label="Coal"></e-sankey-node>
          <e-sankey-node id="Solar" label="Solar"></e-sankey-node>
          <e-sankey-node id="Grid" label="Power Grid"></e-sankey-node>
        </e-sankey-nodes>

        <e-sankey-links>
          <e-sankey-link sourceId="Coal" targetId="Grid" [value]="300"></e-sankey-link>
          <e-sankey-link sourceId="Solar" targetId="Grid" [value]="100"></e-sankey-link>
        </e-sankey-links>
      </ejs-sankey>

    </div>
  `
})
export class AppComponent {
  @ViewChild('sankey') sankey: any;

  // List of IDs matching the manual nodes above
  nodeIds = ['Coal', 'Solar', 'Grid'];
  selectedNodeIndex = 0;

  onKeyDown(event: any) {
    // Syncfusion sends the event object; extract the keyboard event
    const key = event.args?.event?.key || event.key;

    switch (key) {
      case 'ArrowRight':
        this.navigateNode(1);
        break;
      case 'ArrowLeft':
        this.navigateNode(-1);
        break;
    }
  }

  navigateNode(direction: number) {
    const nodeCount = this.nodeIds.length;
    this.selectedNodeIndex = (this.selectedNodeIndex + direction + nodeCount) % nodeCount;
    
    // Optional: Log the current focus for accessibility
    console.log('Focused Node:', this.nodeIds[this.selectedNodeIndex]);
  }
}
```

### Color Contrast and Text Alternatives

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SankeyAllModule, 
  SankeyTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [CommonModule, SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div class="sankey-wrapper">
      <h2>Accessible Energy Flow</h2>
      
      <ejs-sankey 
        #sankey
        id="sankey-container"
        height="450px"
        theme="HighContrast"
        [tooltip]="tooltipSettings"
        ariaLabel="High contrast energy flow diagram showing Coal and Solar distribution">
        
        <e-sankey-nodes>
          <!-- Manual Nodes with WCAG compliant colors -->
          <e-sankey-node id="Coal" label="Coal" color="#000000"></e-sankey-node>
          <e-sankey-node id="Solar" label="Solar" color="#D4AF37"></e-sankey-node>
          <e-sankey-node id="Grid" label="Power Grid" color="#005A9C"></e-sankey-node>
        </e-sankey-nodes>

        <e-sankey-links>
          <e-sankey-link sourceId="Coal" targetId="Grid" [value]="300"></e-sankey-link>
          <e-sankey-link sourceId="Solar" targetId="Grid" [value]="100"></e-sankey-link>
        </e-sankey-links>

      </ejs-sankey>
    </div>
  `,
  styles: [`
    .sankey-wrapper {
      padding: 20px;
      background: #FFFFFF; /* Ensure high contrast against the page */
    }

    /* Target internal Syncfusion labels for better readability */
    :host ::ng-deep .e-sankey-label {
      font-size: 14px !important;
      font-weight: 600 !important;
      fill: #000000 !important; /* Ensure text is legible */
    }
  `]
})
export class AppComponent {
  public tooltipSettings: object = {
    enable: true,
    // Use manual link property names for the format
    format: 'Source: <b>\${sourceId}</b><br/>Target: <b>\${targetId}</b><br/>Value: <b>\${value} MW</b>'
  };
}

```

### Screen Reader Support

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SankeyAllModule, 
  SankeyTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [CommonModule, SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div class="accessible-sankey">
      <h2 id="sankey-title">Energy Flow Analysis</h2>
      <p id="sankey-description">
        This diagram visualizes energy distribution from renewable and non-renewable sources 
        to residential, commercial, industrial, and transportation sectors.
      </p>
      
      <ejs-sankey 
        #sankey
        id="sankey-container"
        height="450px"
        [ariaLabel]="'Energy flow Sankey diagram: ' + ariaDescription"
        [tooltip]="tooltipSettings"
        role="img"
        aria-describedby="sankey-description">
        
        <e-sankey-nodes>
          <e-sankey-node id="Solar" label="Solar" ariaLabel="Solar energy source"></e-sankey-node>
          <e-sankey-node id="Nuclear" label="Nuclear" ariaLabel="Nuclear energy source"></e-sankey-node>
          <e-sankey-node id="Grid" label="Power Grid" ariaLabel="Central power distribution grid"></e-sankey-node>
          <e-sankey-node id="Residential" label="Residential" ariaLabel="Residential consumption sector"></e-sankey-node>
          <e-sankey-node id="Commercial" label="Commercial" ariaLabel="Commercial consumption sector"></e-sankey-node>
        </e-sankey-nodes>

        <e-sankey-links>
          <e-sankey-link sourceId="Solar" targetId="Grid" [value]="454" ariaLabel="Solar to Grid: 454 units"></e-sankey-link>
          <e-sankey-link sourceId="Nuclear" targetId="Grid" [value]="185" ariaLabel="Nuclear to Grid: 185 units"></e-sankey-link>
          <e-sankey-link sourceId="Grid" targetId="Residential" [value]="300" ariaLabel="Grid to Residential: 300 units"></e-sankey-link>
          <e-sankey-link sourceId="Grid" targetId="Commercial" [value]="339" ariaLabel="Grid to Commercial: 339 units"></e-sankey-link>
        </e-sankey-links>
      </ejs-sankey>

      <!-- Data Table Alternative for Screen Readers -->
      <details style="margin-top: 30px;">
        <summary style="cursor: pointer; font-weight: bold; padding: 10px; background: #f5f5f5; border-radius: 4px;">
          View Energy Flow Data Table (for screen readers)
        </summary>
        <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
          <thead>
            <tr style="background: #e8e8e8;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">From (Source)</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">To (Target)</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Flow Value (Units)</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let link of energyData">
              <td style="border: 1px solid #ddd; padding: 8px;">{{ link.sourceId }}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">{{ link.targetId }}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">{{ link.value }}</td>
            </tr>
          </tbody>
        </table>
      </details>
    </div>
  `,
  styles: [`
    .accessible-sankey {
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    h2 {
      color: #333;
      margin-bottom: 10px;
    }

    p {
      color: #666;
      margin-bottom: 20px;
      line-height: 1.6;
    }
  `]
})
export class AppComponent {
  energyData = [
    { sourceId: 'Solar', targetId: 'Grid', value: 454 },
    { sourceId: 'Nuclear', targetId: 'Grid', value: 185 },
    { sourceId: 'Grid', targetId: 'Residential', value: 300 },
    { sourceId: 'Grid', targetId: 'Commercial', value: 339 }
  ];

  ariaDescription = 'Shows energy sources (Solar, Nuclear) flowing to grid and distribution sectors';

  tooltipSettings = {
    enable: true,
    format: 'Energy Flow: <b>${sourceId}</b> to <b>${targetId}</b> = <b>${value} units</b>'
  };
}

```

## Performance Optimization

Optimize diagrams with many nodes and links.

### Data Virtualization

For large datasets, implement pagination or lazy loading. This reduces DOM elements and improves rendering performance:

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SankeyAllModule, 
  SankeyTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [CommonModule, SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>Lazy Loading Sankey</h2>
      <p>Loaded <b>{{ displayedLinks.length }}</b> links. Use the button to simulate "scrolling" or pagination.</p>
      
      <button (click)="loadNextPage()" style="margin-bottom: 10px;">Load More Links</button>

      <ejs-sankey 
        #sankey
        id="sankey-container"
        height="500px"
        [tooltip]="{ enable: true }">
        
        <!-- Nodes are generated based on the current links -->
        <e-sankey-nodes>
          <e-sankey-node *ngFor="let node of displayedNodes" [id]="node" [label]="node"></e-sankey-node>
        </e-sankey-nodes>

        <!-- Links are incrementally added -->
        <e-sankey-links>
          <e-sankey-link 
            *ngFor="let link of displayedLinks" 
            [sourceId]="link.sourceId" 
            [targetId]="link.targetId" 
            [value]="link.value">
          </e-sankey-link>
        </e-sankey-links>

      </ejs-sankey>
    </div>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('sankey') sankey: any;

  allLinks: any[] = [];         // Your "Big Data" source
  displayedLinks: any[] = [];   // Links currently in the DOM
  displayedNodes: string[] = []; // Unique nodes derived from links
  
  pageSize = 5;
  currentPage = 0;

  ngOnInit() {
    // 1. Generate dummy "Large" dataset
    for (let i = 1; i <= 50; i++) {
      this.allLinks.push({ 
        sourceId: `Source ${i}`, 
        targetId: 'Central Hub', 
        value: Math.floor(Math.random() * 100) + 10 
      });
    }
    // 2. Initial load
    this.loadNextPage();
  }

  loadNextPage() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    
    if (start < this.allLinks.length) {
      // 1. Get the next batch of links
      const newLinks = this.allLinks.slice(start, end);
      
      // 2. Append to displayed links
      this.displayedLinks = [...this.displayedLinks, ...newLinks];

      // 3. Update unique nodes list (Sankey needs all IDs defined in <e-sankey-nodes>)
      const nodes = new Set(this.displayedNodes);
      newLinks.forEach(link => {
        nodes.add(link.sourceId);
        nodes.add(link.targetId);
      });
      this.displayedNodes = Array.from(nodes);

      // 4. Increment page counter
      this.currentPage++;

      // 5. Force Syncfusion to refresh the layout
      if (this.sankey) {
        this.sankey.refresh();
      }
    } else {
      console.log('All links have been loaded.');
    }
  }
}
```

For large datasets, implement pagination or lazy loading:

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SankeyAllModule, 
  SankeyTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [CommonModule, SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>Lazy Loading Sankey</h2>
      <p>Loaded <b>{{ displayedLinks.length }}</b> links. Use the button to simulate "scrolling" or pagination.</p>
      
      <button (click)="loadNextPage()" style="margin-bottom: 10px;">Load More Links</button>

      <ejs-sankey 
        #sankey
        id="sankey-container"
        height="500px"
        [tooltip]="{ enable: true }">
        
        <!-- Nodes are generated based on the current links -->
        <e-sankey-nodes>
          <e-sankey-node *ngFor="let node of displayedNodes" [id]="node" [label]="node"></e-sankey-node>
        </e-sankey-nodes>

        <!-- Links are incrementally added -->
        <e-sankey-links>
          <e-sankey-link 
            *ngFor="let link of displayedLinks" 
            [sourceId]="link.sourceId" 
            [targetId]="link.targetId" 
            [value]="link.value">
          </e-sankey-link>
        </e-sankey-links>

      </ejs-sankey>
    </div>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('sankey') sankey: any;

  allLinks: any[] = [];         // Your "Big Data" source
  displayedLinks: any[] = [];   // Links currently in the DOM
  displayedNodes: string[] = []; // Unique nodes derived from links
  
  pageSize = 5;
  currentPage = 0;

  ngOnInit() {
    // 1. Generate dummy "Large" dataset
    for (let i = 1; i <= 50; i++) {
      this.allLinks.push({ 
        sourceId: `Source ${i}`, 
        targetId: 'Central Hub', 
        value: Math.floor(Math.random() * 100) + 10 
      });
    }
    // 2. Initial load
    this.loadNextPage();
  }

  loadNextPage() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    
    if (start < this.allLinks.length) {
      // Add new links to the view
      const newBatch = this.allLinks.slice(start, end);
      this.displayedLinks = [...this.displayedLinks, ...newBatch];
      
      // Update nodes list to include any new sources/targets
      const nodes = new Set(this.displayedNodes);
      newBatch.forEach(l => {
        nodes.add(l.sourceId);
        nodes.add(l.targetId);
      });
      this.displayedNodes = Array.from(nodes);

      this.currentPage++;

      // 3. Force Syncfusion to re-calculate layout
      setTimeout(() => {
        if (this.sankey) this.sankey.refresh();
      });
    }
  }
}

```

### Optimize Rendering Events

Minimize expensive operations in rendering events:

```typescript
// Inefficient: Expensive calculations on every render
onNodeRendering = (args: any) => {
  const expensiveCalculation = this.heavyComputation(args.node);
  args.node.color = expensiveCalculation;
};

// Efficient: Precompute and cache values
private colorCache = new Map();

ngOnInit() {
  this.precomputeColors();
}

precomputeColors() {
  for (const node of this.nodes) {
    this.colorCache.set(node.id, this.computeColor(node));
  }
}

onNodeRendering = (args: any) => {
  args.node.color = this.colorCache.get(args.node.id);
};
```

### Reduce Visual Complexity

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { 
  SankeyAllModule, 
  SankeyTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [CommonModule, FormsModule, SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <div class="controls" style="margin-bottom: 20px; padding: 10px; background: #f9f9f9; border-radius: 5px;">
        <label style="cursor: pointer; font-weight: bold;">
          <input type="checkbox" [(ngModel)]="showDetails">
          Enable Detailed View (Higher Complexity)
        </label>
      </div>
      
      <ejs-sankey 
        #sankey
        id="sankey-container"
        height="450px"
        [nodeStyle]="nodeStyle" 
        [linkStyle]="linkStyle"
        [tooltip]="{ enable: true }">
        
        <e-sankey-nodes>
          <e-sankey-node id="Coal" label="Coal Source"></e-sankey-node>
          <e-sankey-node id="Solar" label="Solar Source"></e-sankey-node>
          <e-sankey-node id="Grid" label="Power Grid"></e-sankey-node>
        </e-sankey-nodes>

        <e-sankey-links>
          <e-sankey-link sourceId="Coal" targetId="Grid" [value]="300"></e-sankey-link>
          <e-sankey-link sourceId="Solar" targetId="Grid" [value]="100"></e-sankey-link>
        </e-sankey-links>
      </ejs-sankey>
    </div>
  `
})
export class AppComponent {
  showDetails = false;

  // Use 'nodeStyle' to match the component's input property
  get nodeStyle() {
    return {
      width: this.showDetails ? 30 : 10,
      padding: this.showDetails ? 20 : 5,
      opacity: this.showDetails ? 1 : 0.6
    };
  }

  // Use 'linkStyle' to match the component's input property
  get linkStyle() {
    return {
      opacity: this.showDetails ? 0.6 : 0.2,
      // colorType can be 'Source', 'Target', or 'Blend'
      colorType: this.showDetails ? 'Blend' : 'Source'
    };
  }
}

```

### Loading ON Demand Implementation

Implement loading for on-demand data fetching:

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SankeyAllModule, 
  SankeyTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [CommonModule, SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>On-Demand Data Loading</h2>
      <p>Current load: <b>{{ loadedItems }}/{{ totalItems }}</b> items</p>
      
      <button 
        (click)="loadMoreData()" 
        [disabled]="isLoading || loadedItems >= totalItems"
        style="margin-bottom: 10px; padding: 8px 16px; cursor: pointer;">
        {{ isLoading ? 'Loading...' : 'Load More Data' }}
      </button>

      <ejs-sankey 
        #sankey
        id="sankey-container"
        height="500px"
        [tooltip]="{ enable: true }">
        
        <e-sankey-nodes>
          <e-sankey-node *ngFor="let node of displayedNodes" 
            [id]="node.id" 
            [label]="node.label">
          </e-sankey-node>
        </e-sankey-nodes>

        <e-sankey-links>
          <e-sankey-link 
            *ngFor="let link of displayedLinks" 
            [sourceId]="link.sourceId" 
            [targetId]="link.targetId" 
            [value]="link.value">
          </e-sankey-link>
        </e-sankey-links>
      </ejs-sankey>
    </div>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('sankey') sankey: any;

  displayedLinks: any[] = [];
  displayedNodes: any[] = [];
  isLoading = false;
  
  totalItems = 100;
  loadedItems = 0;
  pageSize = 10;

  ngOnInit() {
    // Initial load
    this.loadMoreData();
  }

  loadMoreData() {
    if (this.isLoading || this.loadedItems >= this.totalItems) return;

    this.isLoading = true;

    // Simulate API call delay
    setTimeout(() => {
      const startIndex = this.loadedItems;
      const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);

      // Simulate fetching data from server
      for (let i = startIndex; i < endIndex; i++) {
        const sourceId = `Factory_${Math.floor(i / 3) + 1}`;
        const targetId = `District_${(i % 3) + 1}`;
        
        this.displayedLinks.push({
          sourceId,
          targetId,
          value: Math.floor(Math.random() * 100) + 50
        });

        // Add unique nodes
        if (!this.displayedNodes.find(n => n.id === sourceId)) {
          this.displayedNodes.push({ id: sourceId, label: sourceId });
        }
        if (!this.displayedNodes.find(n => n.id === targetId)) {
          this.displayedNodes.push({ id: targetId, label: targetId });
        }
      }

      this.loadedItems = endIndex;
      this.isLoading = false;

      // Refresh the component to recalculate layout
      setTimeout(() => {
        if (this.sankey) this.sankey.refresh();
      });
    }, 500); // Simulate network delay
  }
}

```

## Edge Cases and Troubleshooting

### Empty Data

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SankeyAllModule, 
  SankeyTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [CommonModule, SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>Energy Distribution</h2>
      
      <!-- Logic to switch between the Chart and the No Data template -->
      <div *ngIf="links && links.length > 0; else noData">
        <ejs-sankey 
          #sankey
          id="sankey-container"
          height="400px"
          [tooltip]="{ enable: true }">
          
          <e-sankey-nodes>
            <e-sankey-node *ngFor="let node of nodes" [id]="node.id" [label]="node.label"></e-sankey-node>
          </e-sankey-nodes>

          <e-sankey-links>
            <e-sankey-link 
              *ngFor="let link of links" 
              [sourceId]="link.sourceId" 
              [targetId]="link.targetId" 
              [value]="link.value">
            </e-sankey-link>
          </e-sankey-links>
        </ejs-sankey>
      </div>

      <!-- No Data Template -->
      <ng-template #noData>
        <div class="alert" style="padding: 40px; text-align: center; background: #fff3f3; border: 1px solid #ffc1c1; border-radius: 8px;">
          <p style="color: #d8000c; font-weight: bold; margin: 0;">
            ⚠️ No data available to display the Energy Flow diagram.
          </p>
          <button (click)="loadDemoData()" style="margin-top: 15px; cursor: pointer;">
            Load Demo Data
          </button>
        </div>
      </ng-template>
    </div>
  `
})
export class AppComponent {
  // Initially empty to trigger the 'noData' template
  nodes: any[] = [];
  links: any[] = [];

  loadDemoData() {
    this.nodes = [
      { id: 'Coal', label: 'Coal' },
      { id: 'Grid', label: 'Power Grid' }
    ];
    this.links = [
      { sourceId: 'Coal', targetId: 'Grid', value: 300 }
    ];
  }
}

```

### Circular References

Ensure data doesn't create circular flows:

```typescript
validateData(links: any[]): boolean {
  const visited = new Set<string>();
  const stack = new Set<string>();

  // Use the specific property names from your manual links
  const hasCycle = (nodeId: string): boolean => {
    if (stack.has(nodeId)) return true; // Cycle detected
    if (visited.has(nodeId)) return false;

    visited.add(nodeId);
    stack.add(nodeId);

    // Filter based on 'sourceId' and map to 'targetId'
    const connected = links
      .filter(link => link.sourceId === nodeId)
      .map(link => link.targetId);

    for (const target of connected) {
      if (hasCycle(target)) return true;
    }

    stack.delete(nodeId);
    return false;
  };

  // Build a unique set of all node IDs involved
  const allNodes = new Set([
    ...links.map(l => l.sourceId),
    ...links.map(l => l.targetId)
  ]);

  for (const node of allNodes) {
    if (!visited.has(node)) {
      if (hasCycle(node)) return false; // Found a circular path
    }
  }

  return true; // Data is safe for Sankey
}
```

### Missing Node References

```typescript
validateNodeReferences(links: any[], nodes: any[]): void {
  // 1. Create a Set of all valid node IDs
  const nodeIds = new Set(nodes.map(n => n.id));
  
  // 2. Iterate through links using manual property names
  links.forEach(link => {
    if (!nodeIds.has(link.sourceId)) {
      console.warn(`⚠️ Rendering Error: Missing source node [${link.sourceId}]. Please add <e-sankey-node id="${link.sourceId}">.`);
    }
    if (!nodeIds.has(link.targetId)) {
      console.warn(`⚠️ Rendering Error: Missing target node [${link.targetId}]. Please add <e-sankey-node id="${link.targetId}">.`);
    }
  });
}

```

### Layout Issues

```typescript
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  SankeyAllModule, 
  SankeyTooltipService 
} from '@syncfusion/ej2-angular-charts';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [CommonModule, SankeyAllModule, FormsModule],
  providers: [SankeyTooltipService],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <div style="margin-bottom: 20px;">
        <label style="margin-right: 20px;">
          <strong>Node Width:</strong>
          <input type="range" min="5" max="50" [(ngModel)]="nodeWidth" (change)="updateLayout()">
          {{ nodeWidth }}px
        </label>

        <label style="margin-right: 20px;">
          <strong>Node Padding:</strong>
          <input type="range" min="0" max="50" [(ngModel)]="nodePadding" (change)="updateLayout()">
          {{ nodePadding }}px
        </label>

        <label>
          <strong>Node Offset:</strong>
          <input type="range" min="-100" max="100" [(ngModel)]="nodeOffset" (change)="updateLayout()">
          {{ nodeOffset }}px
        </label>
      </div>

      <ejs-sankey 
        #sankey
        id="sankey-container"
        height="500px"
        [nodeStyle]="currentNodeStyle"
        [tooltip]="{ enable: true }">
        
        <e-sankey-nodes>
          <e-sankey-node id="Agricultural Waste" [offset]="nodeOffset"></e-sankey-node>
          <e-sankey-node id="Biomass Residues" [offset]="nodeOffset"></e-sankey-node>
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

      <div style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
        <strong>Layout Troubleshooting Tips:</strong>
        <ul>
          <li>Use <code>offset</code> property to manually position nodes vertically or horizontally</li>
          <li>Adjust node width and padding to control node dimensions and spacing</li>
          <li>For overlapping nodes, increase padding or adjust offset values</li>
          <li>Call <code>sankey.refresh()</code> after dynamic property changes to recalculate layout</li>
          <li>Use responsive width/height properties for mobile devices</li>
        </ul>
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild('sankey') sankey: any;

  nodeWidth = 20;
  nodePadding = 10;
  nodeOffset = 0;

  get currentNodeStyle() {
    return {
      width: this.nodeWidth,
      padding: this.nodePadding
    };
  }

  updateLayout() {
    if (this.sankey) {
      this.sankey.refresh();
    }
  }
}

```

**Common Layout Issues and Solutions:**

| Issue | Cause | Solution |
|-------|-------|----------|
| Nodes overlapping | Insufficient padding or poor positioning | Increase `padding` property or use `offset` to manually adjust positions |
| Labels cut off | Limited width for node | Increase component width or use `labelSettings.visible = false` on mobile |
| Horizontal scrolling on mobile | Fixed width is too large | Use responsive width: `width="100%"` and set max-width |
| Uneven node spacing | Default layout algorithm | Use `offset` property for manual positioning of specific nodes |
| Links appear too crowded | Many nodes in small area | Increase component height or use vertical orientation on mobile |
| Text too small to read | Limited viewport space | Implement responsive font sizes or zoom controls |
