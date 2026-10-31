# Nodes and Links

## Table of Contents

- [Overview](#overview)
- [Node Structure](#node-structure)
  - [Implicit Node Definition](#implicit-node-definition)
  - [Explicit Node Definition](#explicit-node-definition)
- [Node Customization](#node-customization)
  - [Global Node Style Properties](#global-node-style-properties)
  - [Configure Global Node Styles](#configure-global-node-styles)
- [Individual Node Styling](#individual-node-styling)
  - [Dynamic Styling with Rendering Events](#dynamic-styling-with-rendering-events)
- [Link Structure](#link-structure)
  - [Link Data Format](#link-data-format)
- [Link Styling](#link-styling)
  - [Global Link Style Properties](#global-link-style-properties)
  - [Configure Global Link Styles](#configure-global-link-styles)
  - [Link Color Type](#link-color-type)
  - [Link Value and Thickness](#link-value-and-thickness)
  - [Dynamic Link Styling with Events](#dynamic-link-styling-with-events)
- [Node Positioning](#node-positioning)
  - [Node Offset](#node-offset)
- [Common Patterns](#common-patterns)
  - [Pattern: Energy Flow Network](#pattern-energy-flow-network)
  - [Pattern: Product Distribution](#pattern-product-distribution)


## Overview

Nodes represent entities in your flow diagram, and links represent the connections between them. Understanding node and link configuration is essential for building meaningful Sankey diagrams.

## Node Structure

Nodes can be implicitly defined through link data or explicitly defined with configuration objects.

### Implicit Node Definition

When you define links with `sourceID` and `targetID`, nodes are automatically created:

```typescript
@Component({
  template: `
    <ejs-sankey>
      <e-sankey-links>
        <e-sankey-link sourceId="Coal" targetId="Grid" [value]="300"></e-sankey-link>
        <e-sankey-link sourceId="Solar" targetId="Grid" [value]="100"></e-sankey-link>
        <e-sankey-link sourceId="Wind" targetId="Grid" [value]="80"></e-sankey-link>
        <e-sankey-link sourceId="Grid" targetId="City" [value]="480"></e-sankey-link>
      </e-sankey-links>
    </ejs-sankey>
  `
})
export class AppComponent {
}
```

### Explicit Node Definition

For more control, explicitly define nodes:

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

## Node Customization

Configure global node appearance using `nodeSettings`:

### Global Node Style Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `width` | number | 20 | Node rectangle width in pixels |
| `padding` | number | 10 | Spacing between node and label |
| `fill` | string | null | Fill color (uses theme if not set) |
| `stroke` | string | '' | Border color |
| `strokeWidth` | number | 1 | Border width in pixels |
| `opacity` | number | 1 | Default opacity (0-1) |
| `highlightOpacity` | number | 1 | Opacity when highlighted |
| `inactiveOpacity` | number | 0.3 | Opacity when inactive |

### Configure Global Node Styles

```typescript
@Component({
  template: `
    <ejs-sankey 
      [nodeStyle]="nodeSettings">
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
  `
})
export class AppComponent {
  nodeSettings = {
    width: 25,
    padding: 15,
    fill: '#4472C4',
    stroke: '#1F4E78',
    strokeWidth: 2,
    opacity: 0.8,
    highlightOpacity: 1,
    inactiveOpacity: 0.4
  };
}
```

## Individual Node Styling

Override global styles for specific nodes by adding properties directly to node definitions:

```typescript
@Component({
  template: `
    <ejs-sankey 
      <e-sankey-nodes>
        <e-sankey-node id="Agricultural Waste" color="#f41212"></e-sankey-node>
        <e-sankey-node id="Biomass Residues"  color="#aed62c"></e-sankey-node>
        <e-sankey-node id="Bio-conversion"  color="#259bc3"></e-sankey-node>
        <e-sankey-node id="Liquid Biofuel" color="#0e11af"></e-sankey-node>
        <e-sankey-node id="Electricity" color="#7a0e92"></e-sankey-node>
        <e-sankey-node id="Heat" color="#c5b9bb"></e-sankey-node>
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
      <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
      <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
      <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
      <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
    </e-sankey-links>
    </ejs-sankey>
  `
})
export class AppComponent {
  nodeSettings = { dataSource: nodes };
}
```

### Dynamic Styling with Rendering Events

Use the `nodeRendering` event for dynamic per-node styling based on data:

```typescript
@Component({
  template: `
    <ejs-sankey 
      (nodeRendering)="onNodeRendering($event)">
    </ejs-sankey>
  `
})
export class AppComponent {
   onNodeRendering(args: SankeyNodeRenderEventArgs): void {
    const nodeId = args.node.id;
    if (nodeId === 'Bio-conversion') {
      args.node.color = '#FF6B6B';
    } else if (nodeId === 'Liquid Biofuel') {
      args.node.color = '#4ECDC4';
    } else if (nodeId === 'Electricity') {
      args.node.color = '#45B7D1';
    } else if (nodeId === 'Heat') {
      args.node.color = '#FFA07A';
    } else {
      args.node.color = '#98D8C8';
    }
  }
}
```

## Link Structure

Links define the connections between nodes and the flow values:

### Link Data Format

```typescript
@Component({
  template: `
    <ejs-sankey>
      <e-sankey-links>
        <e-sankey-link sourceId="Coal" targetId="Grid" [value]="300"></e-sankey-link>
        <e-sankey-link sourceId="Solar" targetId="Grid" [value]="100"></e-sankey-link>
        <e-sankey-link sourceId="Wind" targetId="Grid" [value]="80"></e-sankey-link>
        <e-sankey-link sourceId="Grid" targetId="City" [value]="480"></e-sankey-link>
      </e-sankey-links>
    </ejs-sankey>
  `
})
export class AppComponent {
}
```

**Key Rules:**
- Link `value` determines link width (proportional)
- Both `sourceID` and `targetID` must exist as node IDs
- Multiple links can connect the same pair of nodes (not recommended)
- Link values should represent quantities (positive numbers)

## Link Styling

Configure global link appearance using `linkSettings`:

### Global Link Style Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `opacity` | number | 0.4 | Link opacity (0-1) |
| `highlightOpacity` | number | 1 | Opacity when highlighted |
| `inactiveOpacity` | number | 0.2 | Opacity when inactive |
| `curvature` | number | 0.5 | Link curve smoothness (0-1) |
| `color` | string | null | Link color (uses source color if null) |

### Configure Global Link Styles

```typescript
@Component({
  template: `
    <ejs-sankey 
      [linkStyle]="linkSettings">
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
  `
})
export class AppComponent {
  linkSettings = {
    opacity: 0.5,
    highlightOpacity: 1,
    inactiveOpacity: 0.1,
    curvature: 0.7,
    color: '#6C757D'
  };
}
```
### Link Color Type

| Mode | Description |
|------|-------------|
| `Source` | Links inherit the color of their source node, useful for tracking the origin of flows |
| `Target` | Links inherit the color of their target node, useful for tracking the destination of flows |
| `Blend` | Links display a smooth gradient blend of source and target node colors (default and recommended for most cases) |

```typescript
@Component({
  template: `
    <div class="control-pane">
      <div class="control-section" id="sankey-container">

        <ejs-sankey
          width="90%"
          height="450px"
          [linkStyle]="linkStyle">

          <e-sankey-nodes>
            <e-sankey-node id="Agricultural Waste" color="#FF6B6B"></e-sankey-node>
            <e-sankey-node id="Biomass Residues" color="#FFA07A"></e-sankey-node>
            <e-sankey-node id="Bio-conversion" color="#4ECDC4"></e-sankey-node>
            <e-sankey-node id="Liquid Biofuel" color="#45B7D1"></e-sankey-node>
            <e-sankey-node id="Electricity" color="#FFA07A"></e-sankey-node>
            <e-sankey-node id="Heat" color="#98D8C8"></e-sankey-node>
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
  public linkStyle = {
    colorType: 'Blend'
  };
}
```

### Link Value and Thickness

The link thickness is determined by the value property in the link data. This quantitative value is automatically mapped to the visual thickness of the link:

| Value Comparison | Effect on Link Thickness | Description |
|------------------|--------------------------|-------------|
| Larger values | Thicker links | Higher flow values create visually thicker links, emphasizing major flows |
| Smaller values | Thinner links | Lower flow values create thinner links, indicating minor flows |
| Equal values | Equal thickness | Links with the same value are rendered with equal thickness |

```typescript
@Component({
  template: `
    <div class="control-pane">
      <div class="control-section" id="sankey-container">

        <ejs-sankey
          width="90%"
          height="450px"
          [nodeStyle]="nodeStyle">

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
  public nodeStyle = {
    fill: '#4472C4',
    stroke: '#143368',
    strokeWidth: 2,
    width: 20,
    opacity: 0.8
  };
}
```

### Dynamic Link Styling with Events

Use the `linkRendering` event for conditional styling:

```typescript
@Component({
  template: `
    <ejs-sankey 
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
  `
})
export class AppComponent {
  onLinkRendering(args: SankeyLinkRenderEventArgs): void {
    if (args.link.sourceId === 'Bio-conversion' && args.link.targetId === 'Heat') {
      args.fill = '#FF6B6B';
    } else {
      args.fill = '#211cb4';
    }
  }
}
```

## Node Positioning

Control node positions in the diagram using the `offset` property:

### Node Offset

The `offset` property adjusts node position vertically (horizontal orientation) or horizontally (vertical orientation):

  - Horizontal orientation → offset moves nodes vertically
  - Vertical orientation → offset moves nodes horizontally

```typescript

@Component({
  template: `
    <ejs-sankey 
      orientation="Horizontal">
      <e-sankey-nodes>
         <e-sankey-node id="Agricultural Waste" offset={-11}></e-sankey-node>
            <e-sankey-node id="Biomass Residues" offset={-20}></e-sankey-node>
            <e-sankey-node id="Bio-conversion" offset={-20}></e-sankey-node>
            <e-sankey-node id="Liquid Biofuel" offset={17}></e-sankey-node>
            <e-sankey-node id="Electricity" offset={8}></e-sankey-node>
            <e-sankey-node id="Heat" ></e-sankey-node>
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
        <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
        <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
        <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
        <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
      </e-sankey-links>
    </ejs-sankey>
  `
})
export class AppComponent {

}
```

**When to use offset:**
- Manually arrange nodes to avoid overlaps
- Create specific flow patterns
- Improve diagram readability
- Align nodes in specific layouts

## Common Patterns

### Pattern: Energy Flow Network

```typescript
@Component({
  template: `
    <ejs-sankey>
      <!-- Nodes -->
      <e-sankey-nodes>
        <e-sankey-node id="Coal" color="#f41212" [label]="label1"> </e-sankey-node>
        <e-sankey-node id="Grid" color="#aed62c" [label]="label2"> </e-sankey-node>
        <e-sankey-node id="Homes" color="#259bc3" [label]="label3"> </e-sankey-node>
      </e-sankey-nodes>

      <!-- Links -->
      <e-sankey-links>
        <e-sankey-link sourceId="Coal" targetId="Grid" [value]="300"></e-sankey-link>
      <e-sankey-link sourceId="Grid" targetId="Homes" [value]="300"> </e-sankey-link>
      </e-sankey-links>
    </ejs-sankey>
  `
})
export class AppComponent {

}

```

### Pattern: Product Distribution

```typescript
@Component({
  template: `
      <ejs-sankey width="100%" height="420px" title="Supply Chain Flow">
        <!-- Nodes -->
        <e-sankey-nodes>
          <e-sankey-node id="Factory" [label]="{ text: 'Factory' }" width="30"></e-sankey-node>
          <e-sankey-node id="Warehouse" [label]="{ text: 'Warehouse' }" width="25"></e-sankey-node>
          <e-sankey-node id="Store1" [label]="{ text: 'Store 1' }" width="15"></e-sankey-node>
          <e-sankey-node id="Store2" [label]="{ text: 'Store 2' }" width="15"></e-sankey-node>
       </e-sankey-nodes>
       <!-- Links -->
       <e-sankey-links>
          <e-sankey-link sourceId="Factory" targetId="Warehouse" [value]="1000"></e-sankey-link>
          <e-sankey-link sourceId="Warehouse" targetId="Store1" [value]="600"></e-sankey-link>
          <e-sankey-link sourceId="Warehouse" targetId="Store2" [value]="400"></e-sankey-link>
       </e-sankey-links>
      </ejs-sankey>
  `
})
export class AppComponent {

}
```
