# Getting Started with Sankey

This guide covers installation, setup, and creating your first Sankey diagram in Angular.

## Table of Contents
- [Getting Started with Sankey](#getting-started-with-sankey)
- [Installation](#installation)
  - [Alternative Installation](#alternative-installation)
- [Angular 19+ Standalone Setup](#angular-19-standalone-setup)
- [Basic Sankey Component](#basic-sankey-component)
- [Module Injection (Tooltips & Legend)](#module-injection-tooltips--legend)
- [Data Structure](#data-structure)
- [Running Your First Example](#running-your-first-example)
- [Common Issues](#common-issues)

## Installation

Install the Syncfusion Angular Charts package using Angular CLI:

```bash
ng add @syncfusion/ej2-angular-charts
```

This command automatically:
- Adds `@syncfusion/ej2-angular-charts` and peer dependencies to `package.json`
- Configures Angular module imports

### Alternative Installation

For specific version or ngcc compatibility:

```bash
# Standard Ivy package (Angular 16+)
npm install @syncfusion/ej2-angular-charts

# ngcc package (Angular 15 and below only)
npm add @syncfusion/ej2-angular-charts@32.1.19-ngcc
```

## Angular 19+ Standalone Setup

Modern Angular (19+) uses standalone components by default. Here's the basic setup:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [SankeyAllModule],
  standalone: true,
  selector: 'app-sankey-container',
  template: `<ejs-sankey id="sankey-container"></ejs-sankey>`,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }
```

Then in `main.ts`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

## Basic Sankey Component

Create a minimal Sankey with data binding:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [SankeyAllModule],
  standalone: true,
  selector: 'app-sankey-demo',
  template: `
    <ejs-sankey 
      id="sankey" 
      width="100%"
      height="420px">
          <e-sankey-nodes>
            <e-sankey-node id="Oil" [label]="{ text: 'Oil' }"></e-sankey-node>
            <e-sankey-node id="Coal" [label]="{ text: 'Coal' }"></e-sankey-node>
            <e-sankey-node id="Gas Car" [label]="{ text: 'Gas Car' }"></e-sankey-node>
            <e-sankey-node id="Luxury Car" [label]="{ text: 'Luxury Car' }"></e-sankey-node>
            <e-sankey-node id="Power Plant" [label]="{ text: 'Power Plant' }"></e-sankey-node>
          </e-sankey-nodes>
          <e-sankey-links>
            <e-sankey-link sourceId="Oil" targetId="Gas Car" [value]="50"></e-sankey-link>
            <e-sankey-link sourceId="Oil" targetId="Luxury Car" [value]="20"> </e-sankey-link>
            <e-sankey-link sourceId="Coal" targetId="Power Plant" [value]="45"></e-sankey-link>
          </e-sankey-links>

    </ejs-sankey>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
```

## Module Injection (Tooltips & Legend)

To enable tooltips and legend features, inject the required services:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { 
  SankeyAllModule, 
  SankeyTooltipService, 
  SankeyLegendService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [SankeyAllModule],
  standalone: true,
  providers: [SankeyTooltipService, SankeyLegendService],
  selector: 'app-sankey-demo',
  template: `
  <ejs-sankey>
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
  </ejs-sankey>`,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
```

## Data Structure

Sankey charts consists of links connecting nodes:
  - Nodes represent the categories, and links represent the flow between them.

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
  selector: 'app-container',
  template: `
    <div class="control-pane">
      <div class="control-section" id="sankey-container">

        <ejs-sankey
          width="90%"
          height="420px"
          title="Energy Flow Diagram">

           <!-- nodes -->
          <e-sankey-nodes>
            <e-sankey-node id="Energy Input" [label]="{ text: 'Energy Input' }"></e-sankey-node>
            <e-sankey-node id="Generation" [label]="{ text: 'Generation' }"></e-sankey-node>
            <e-sankey-node id="Distribution" [label]="{ text: 'Distribution' }"></e-sankey-node>
            <e-sankey-node id="Consumption" [label]="{ text: 'Consumption' }"></e-sankey-node>
          </e-sankey-nodes>

          <!-- links -->
          <e-sankey-links>
            <e-sankey-link sourceId="Energy Input" targetId="Generation" [value]="500"></e-sankey-link>
            <e-sankey-link sourceId="Generation" targetId="Distribution" [value]="450"></e-sankey-link>
            <e-sankey-link sourceId="Distribution" targetId="Consumption" [value]="400"></e-sankey-link>
          </e-sankey-links>

        </ejs-sankey>

      </div>
    </div>
  `
})
export class AppComponent {}
```

## Running Your First Example

1. Create component file with code above
2. Update `index.html` to include the component selector
3. Run development server:

```bash
ng serve
```

4. Open `http://localhost:4200` in browser

You should see a Sankey diagram with nodes and flowing links between them.

## Common Issues

**Issue:** Diagram not rendering
- **Solution:** Ensure `ViewEncapsulation.None` is set to load default styles

**Issue:** Nodes not appearing
- **Solution:** Ensure every sourceId and targetId in <e-sankey-link> exactly matches a node id

**Issue:** Tooltip not showing
- **Solution:** Inject `SankeyTooltipService` in providers array

**Issue:** Legend not visible
- **Solution:** Inject `SankeyLegendService` and set `legendSettings.visible = true`

