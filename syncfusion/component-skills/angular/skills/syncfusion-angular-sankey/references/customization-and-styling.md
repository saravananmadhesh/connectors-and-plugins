# Customization and Styling

## Table of Contents

- [Overview](#overview)
- [Element-Level Customization](#element-level-customization)
  - [Per-Node Customization](#per-node-customization)
- [Color Palettes](#color-palettes)
  - [Predefined Color Palette](#predefined-color-palette)
  - [Gradient Colors](#gradient-colors)
- [Conditional Styling](#conditional-styling)
  - [Value-Based Node Styling](#value-based-node-styling)
  - [Link-Based Styling](#link-based-styling)
  - [Status-Based Styling](#status-based-styling)
- [Category-Based Styling](#category-based-styling)
  - [Category-Based Colors](#category-based-colors)
  - [Hierarchical Styling](#hierarchical-styling)
- [Advanced Patterns](#advanced-patterns)
  - [Interactive Styling with Hover Effects](#interactive-styling-with-hover-effects)
  - [Alternating Node Colors](#alternating-node-colors)
- [Performance Optimization](#performance-optimization)
  - [Use Global Styles Instead of Per-Item](#use-global-styles-instead-of-per-item)
  - [Cache Computed Values](#cache-computed-values)
  - [Minimize Event Handlers](#minimize-event-handlers)
- [Complete Customization Example](#complete-customization-example)

## Overview

The Sankey component provides multiple approaches to customize appearance:
- **Global Styling:** Apply consistent styles via `nodeStyle` and `linkStyle`
- **Element-Level Customization:** Override styles on individual nodes/links
- **Data-Driven Styling:** Apply dynamic, data-driven styling
- **Theme System:** Use or extend predefined themes

## Element-Level Customization

Customize specific nodes or links directly in data definitions.

### Per-Node Customization

```typescript

@Component({
  template: `
    <ejs-sankey>
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
  
}
```

## Color Palettes

Apply consistent colors using predefined palettes or custom color schemes.

### Predefined Color Palette

```typescript
@Component({
  template: `
    <ejs-sankey>
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
}
```

### Gradient Colors

Create gradient effects for visual hierarchy:

```typescript
import { Component } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';

function interpolateColor(start: string, end: string, factor: number): string {
  const parseHex = (hex: string) =>
    hex.replace('#', '').match(/.{2}/g)!.map(x => parseInt(x, 16));

  const [r1, g1, b1] = parseHex(start);
  const [r2, g2, b2] = parseHex(end);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `rgb(${r}, ${g}, ${b})`;
}

function generateGradientColors(
  start: string,
  end: string,
  steps: number
): string[] {
  return Array.from({ length: steps }, (_, i) =>
    interpolateColor(start, end, i / (steps - 1))
  );
}

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  template: `
    <ejs-sankey
      width="100%"
      height="420px"
      title="Gradient Node Colors">

      <e-sankey-nodes>
        <e-sankey-node id="Node0" [color]="colors[0]" [label]="{ text: 'Node 0' }"></e-sankey-node>
        <e-sankey-node id="Node1" [color]="colors[1]" [label]="{ text: 'Node 1' }"></e-sankey-node>
        <e-sankey-node id="Node2" [color]="colors[2]" [label]="{ text: 'Node 2' }"></e-sankey-node>
        <e-sankey-node id="Node3" [color]="colors[3]" [label]="{ text: 'Node 3' }"></e-sankey-node>
        <e-sankey-node id="Node4" [color]="colors[4]" [label]="{ text: 'Node 4' }"></e-sankey-node>
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link sourceId="Node0" targetId="Node1" [value]="50"></e-sankey-link>
        <e-sankey-link sourceId="Node1" targetId="Node2" [value]="40"></e-sankey-link>
        <e-sankey-link sourceId="Node2" targetId="Node3" [value]="30"></e-sankey-link>
        <e-sankey-link sourceId="Node3" targetId="Node4" [value]="20"></e-sankey-link>
      </e-sankey-links>

    </ejs-sankey>
  `
})
export class AppComponent {
  colors = generateGradientColors('#FF0000', '#00FF00', 3);
}
```

## Conditional Styling

Apply styles based on data values or conditions using rendering events.

### Value-Based Node Styling

```typescript
oimport { Component } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  template: `
    <ejs-sankey
      height="420px"
      title="Conditional Node Styling"
      (nodeRendering)="onNodeRendering($event)">

      <e-sankey-nodes>
        <e-sankey-node id="Source"></e-sankey-node>
        <e-sankey-node id="Process"></e-sankey-node>
        <e-sankey-node id="Output"></e-sankey-node>
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link sourceId="Source" targetId="Process" [value]="250"></e-sankey-link>
        <e-sankey-link sourceId="Process" targetId="Output" [value]="120"></e-sankey-link>
      </e-sankey-links>

    </ejs-sankey>
  `
})
export class AppComponent {

  nodeValueMap: Record<string, number> = {
    Source: 250,
    Process: 370,  
    Output: 120
  };

  onNodeRendering(args: any) {
    const value = this.nodeValueMap[args.node.id] || 0;

    if (value > 200) {
      args.node.color = '#00A651';
      args.node.width = 30;
    } else if (value > 100) {
      args.node.color = '#FFB81C';
      args.node.width = 20;
    } else {
      args.node.color = '#E81B23';
      args.node.width = 15;
    }
  }
}
```

### Link-Based Styling

```typescript
import { Component } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import { SankeyLinkRenderEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  template: `
    <ejs-sankey
      width="100%"
      height="420px"
      title="Conditional Link Styling"
      (linkRendering)="onLinkRendering($event)">

      <e-sankey-nodes>
        <e-sankey-node id="Source"></e-sankey-node>
        <e-sankey-node id="Process"></e-sankey-node>
        <e-sankey-node id="Output"></e-sankey-node>
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link sourceId="Source" targetId="Process" [value]="300"></e-sankey-link>
        <e-sankey-link sourceId="Process" targetId="Output" [value]="120"></e-sankey-link>
        <e-sankey-link sourceId="Source" targetId="Output" [value]="60"></e-sankey-link>
      </e-sankey-links>

    </ejs-sankey>
  `
})
export class AppComponent {

  onLinkRendering = (args: SankeyLinkRenderEventArgs) => {
    const maxValue = 1000; // choose your own reference value
    const ratio = args.link.value / maxValue;

    if (ratio > 0.3) {
      args.fill = 'rgba(0, 166, 81, 0.8)';   // Green
    } else if (ratio > 0.1) {
      args.fill = 'rgba(255, 184, 28, 0.6)'; // Yellow
    } else {
      args.fill = 'rgba(232, 27, 35, 0.4)';  // Red
    }
  };

}
```

### Status-Based Styling

```typescript


@Component({
  template: `
    <ejs-sankey 
      (nodeRendering)="onNodeRendering($event)">
    </ejs-sankey>
  `
})
export class AppComponent {
  nodeStatus: Record<string, 'active' | 'warning' | 'error'> = {
    Node1: 'active',
    Node2: 'warning',
    Node3: 'error'
  };

  onNodeRendering = (args: SankeyNodeRenderEventArgs) => {
  const status = this.nodeStatus[args.node.id];
  
  switch (status) {
    case 'active':
      args.node.color = '#00A651';
      args.node.opacity = 1;
      break;
    case 'warning':
      args.node.color = '#FFB81C';
      args.node.opacity = 0.8;
      break;
    case 'error':
      args.node.color = '#E81B23';
      args.node.opacity = 0.6;
      break;
    default:
      args.node.color = '#999';
  }
};
}
```

## Category-Based Styling

Apply consistent styling to nodes grouped by category.

### Category-Based Colors

```typescript
import { Component } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import { SankeyNodeRenderEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  template: `
    <ejs-sankey
      height="420px"
      title="Category-Based Node Styling"
      (nodeRendering)="onNodeRendering($event)">

      <!-- Nodes -->
      <e-sankey-nodes>
        <e-sankey-node id="Coal" [label]="{ text: 'Coal' }"></e-sankey-node>
        <e-sankey-node id="Oil" [label]="{ text: 'Oil' }"></e-sankey-node>
        <e-sankey-node id="Cars" [label]="{ text: 'Cars' }"></e-sankey-node>
        <e-sankey-node id="Factory" [label]="{ text: 'Factory' }"></e-sankey-node>
        <e-sankey-node id="Home" [label]="{ text: 'Home' }"></e-sankey-node>
      </e-sankey-nodes>

      <!-- Links -->
      <e-sankey-links>
        <e-sankey-link sourceId="Coal" targetId="Factory" [value]="200"></e-sankey-link>
        <e-sankey-link sourceId="Oil" targetId="Cars" [value]="150"></e-sankey-link>
        <e-sankey-link sourceId="Factory" targetId="Home" [value]="300"></e-sankey-link>
      </e-sankey-links>

    </ejs-sankey>
  `
})
export class AppComponent {

  // Category → color mapping
  categoryColors: Record<string, string> = {
    Energy: '#FF6B6B',
    Transport: '#4ECDC4',
    Industry: '#95E1D3',
    Residential: '#FFE66D'
  };

  // Node → category mapping
  nodeCategories: Record<string, string> = {
    Coal: 'Energy',
    Oil: 'Energy',
    Cars: 'Transport',
    Factory: 'Industry',
    Home: 'Residential'
  };

  // Apply category-based colors
  onNodeRendering(args: SankeyNodeRenderEventArgs) {
    const category = this.nodeCategories[args.node.id];
    args.node.color = this.categoryColors[category] || '#999';
  }
}
```

### Hierarchical Styling

```typescript

@Component({
  template: `
    <ejs-sankey
      height="420px"
      title="Hierarchy-Based Node Styling"
      (nodeRendering)="onNodeRendering($event)">

      <!-- Nodes -->
      <e-sankey-nodes>
        <e-sankey-node id="Source" [label]="{ text: 'Source' }"></e-sankey-node>
        <e-sankey-node id="Processor" [label]="{ text: 'Processor' }"></e-sankey-node>
        <e-sankey-node id="Distributor" [label]="{ text: 'Distributor' }"></e-sankey-node>
        <e-sankey-node id="Consumer" [label]="{ text: 'Consumer' }"></e-sankey-node>
      </e-sankey-nodes>

      <!-- Links -->
      <e-sankey-links>
        <e-sankey-link sourceId="Source" targetId="Processor" [value]="300"></e-sankey-link>
        <e-sankey-link sourceId="Processor" targetId="Distributor" [value]="200"></e-sankey-link>
        <e-sankey-link sourceId="Distributor" targetId="Consumer" [value]="150"></e-sankey-link>
      </e-sankey-links>

    </ejs-sankey>
  `
})
export class AppComponent {

  // Hierarchy level → color mapping
  hierarchyColors: Record<string, string> = {
    level0: '#1F77B4', // darkest
    level1: '#FF7F0E',
    level2: '#2CA02C',
    level3: '#D62728'  // lightest
  };

  // Node → hierarchy level
  nodeLevel: Record<string, string> = {
    Source: 'level0',
    Processor: 'level1',
    Distributor: 'level2',
    Consumer: 'level3'
  };

  // Apply hierarchy-based styling
  onNodeRendering(args: SankeyNodeRenderEventArgs) {
    const level = this.nodeLevel[args.node.id];

    // Color by hierarchy
    args.node.color = this.hierarchyColors[level] || '#999';

    // Width by hierarchy
    if (level === 'level0') {
      args.node.width = 30;
    } else if (level === 'level1') {
      args.node.width = 25;
    } else if (level === 'level2') {
      args.node.width = 20;
    } else {
      args.node.width = 15;
    }
  }
}
```

## Advanced Patterns

### Interactive Styling with Hover Effects

```typescript
@Component({
  template: `
    <ejs-sankey 
      (nodeEnter)="onNodeEnter($event)"
      (nodeLeave)="onNodeLeave($event)">
    </ejs-sankey>
  `
})
export class AppComponent {
  // Store original colors so we can restore them
  originalColors: Record<string, string> = {
    Source: 'pink',
    Process: 'violet',
    Output: 'orange'
  };

  // Hover in
  onNodeEnter(args: SankeyNodeEventArgs) {
    args.node.color = 'rgba(0, 0, 0, 0.85)'; // highlight color
  }

  // Hover out
  onNodeLeave(args: SankeyNodeEventArgs) {
    const nodeId = args.node.id;
    args.node.color = this.originalColors[nodeId] || '#999';
  }
}
```

### Alternating Node Colors

```typescript
@Component({
  template: `
    <ejs-sankey
      height="420px"
      title="Alternating Node Colors"
      (nodeRendering)="onNodeRendering($event)">

      <e-sankey-nodes>
        <e-sankey-node id="NodeA" [label]="{ text: 'Node A' }"></e-sankey-node>
        <e-sankey-node id="NodeB" [label]="{ text: 'Node B' }"></e-sankey-node>
        <e-sankey-node id="NodeC" [label]="{ text: 'Node C' }"></e-sankey-node>
        <e-sankey-node id="NodeD" [label]="{ text: 'Node D' }"></e-sankey-node>
        <e-sankey-node id="NodeE" [label]="{ text: 'Node E' }"></e-sankey-node>
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link sourceId="NodeA" targetId="NodeB" [value]="100"></e-sankey-link>
        <e-sankey-link sourceId="NodeB" targetId="NodeC" [value]="80"></e-sankey-link>
        <e-sankey-link sourceId="NodeC" targetId="NodeD" [value]="60"></e-sankey-link>
        <e-sankey-link sourceId="NodeD" targetId="NodeE" [value]="40"></e-sankey-link>
      </e-sankey-links>

    </ejs-sankey>
  `,
})
export class AppComponent {
  colors = ['orange', 'pink', 'yellow'];

  nodeOrder = ['NodeA', 'NodeB', 'NodeC', 'NodeD', 'NodeE'];

  onNodeRendering(args: SankeyNodeRenderEventArgs) {
    const index = this.nodeOrder.indexOf(args.node.id);
    if (index !== -1) {
      args.node.color = this.colors[index % this.colors.length];
    } else {
      args.node.color = '#999';
    }
  }
}
```

## Performance Optimization

For diagrams with many nodes and links, optimize rendering performance.

### Use Global Styles Instead of Per-Item

**Inefficient:**
```typescript
// Styling every node individually in rendering event
onNodeRendering = (args: any) => {
  args.node.fill = '#4472C4';
  args.node.stroke = '#1F4E78';
  args.node.strokeWidth = 2;
  // ... expensive calculations
};
```

**Efficient:**
```typescript
// 1. Efficient: Define global styles once
// Use nodeStyle and linkStyle to avoid "unknown property" errors
public nodeStyle = {
  fill: '#4472C4',
  stroke: '#1F4E78',
  strokeWidth: 2
};

public linkStyle = {
  opacity: 0.3,
  colorType: 'Blend'
};

// 2. Conditional: Only override specific nodes by their ID
// Since nodes have "novalue", we target the central hub ID instead
onNodeRendering = (args: any) => {
  if (args.node.id === 'Bio-conversion') {
    args.node.color = '#ED7D31';  // Override only for this special case
    args.node.width = 30;         // Highlight the hub physically
  }
};
```

### Cache Computed Values

```typescript
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { SankeyAllModule, SankeyTooltipService } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div style="padding: 20px;">
      <ejs-sankey 
        #sankey
        height="450px"
        (nodeRendering)="onNodeRendering($event)">
        
        <e-sankey-nodes>
          <e-sankey-node id="Coal" label="Coal"></e-sankey-node>
          <e-sankey-node id="Solar" label="Solar"></e-sankey-node>
          <e-sankey-node id="Grid" label="Power Grid"></e-sankey-node>
          <e-sankey-node id="City" label="City"></e-sankey-node>
        </e-sankey-nodes>

        <e-sankey-links>
          <e-sankey-link sourceId="Coal" targetId="Grid" [value]="300"></e-sankey-link>
          <e-sankey-link sourceId="Solar" targetId="Grid" [value]="100"></e-sankey-link>
          <e-sankey-link sourceId="Grid" targetId="City" [value]="400"></e-sankey-link>
        </e-sankey-links>
      </ejs-sankey>
    </div>
  `
})

export class AppComponent implements OnInit {
  // 1. Your manual link data
  private links = [
    { sourceId: 'Agricultural Waste', targetId: 'Bio-conversion', value: 84.152 },
    { sourceId: 'Biomass Residues', targetId: 'Bio-conversion', value: 24.152 },
    { sourceId: 'Bio-conversion', targetId: 'Liquid Biofuel', value: 10.597 }
  ];

  // 2. The Cache
  private colorCache = new Map<string, string>();

  ngOnInit() {
    this.precomputeNodeColors();
  }

  private precomputeNodeColors() {
    // Get unique node IDs from links
    const nodeIds = new Set([
      ...this.links.map(l => l.sourceId),
      ...this.links.map(l => l.targetId)
    ]);

    nodeIds.forEach(id => {
      // Calculate total flow for this ID since 'node' has no value
      const incoming = this.links.filter(l => l.targetId === id).reduce((sum, l) => sum + l.value, 0);
      const outgoing = this.links.filter(l => l.sourceId === id).reduce((sum, l) => sum + l.value, 0);
      const totalFlow = Math.max(incoming, outgoing);

      // Store computed color in cache
      this.colorCache.set(id, this.getColorByValue(totalFlow));
    });
  }

  private getColorByValue(value: number): string {
    if (value > 80) return '#00A651'; // High flow
    if (value > 20) return '#FFB81C'; // Medium flow
    return '#E81B23';                // Low flow
  }

  // 3. Rendering Event (Super Fast)
  onNodeRendering = (args: any) => {
    // Simply pull from the pre-populated cache
    if (this.colorCache.has(args.node.id)) {
      args.node.color = this.colorCache.get(args.node.id);
    }
  };
}

```

### Minimize Event Handlers

```typescript
// Good: Single optimized handler
import { Component } from '@angular/core';
import { SankeyAllModule, SankeyTooltipService } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div style="padding: 20px;">
      <ejs-sankey 
        #sankey
        height="450px"
        (nodeRendering)="onNodeRendering($event)">
        
        <e-sankey-nodes>
          <e-sankey-node id="Coal" label="Coal"></e-sankey-node>
          <e-sankey-node id="Solar" label="Solar"></e-sankey-node>
          <e-sankey-node id="Grid" label="Power Grid"></e-sankey-node>
          <e-sankey-node id="City" label="City"></e-sankey-node>
        </e-sankey-nodes>

        <e-sankey-links>
          <e-sankey-link sourceId="Coal" targetId="Grid" [value]="300"></e-sankey-link>
          <e-sankey-link sourceId="Solar" targetId="Grid" [value]="100"></e-sankey-link>
          <e-sankey-link sourceId="Grid" targetId="City" [value]="400"></e-sankey-link>
        </e-sankey-links>
      </ejs-sankey>
    </div>
  `
})
export class AppComponent {
  // Your manual link data
  links = [
    { sourceId: 'Coal', targetId: 'Grid', value: 300 },
    { sourceId: 'Solar', targetId: 'Grid', value: 100 },
    { sourceId: 'Grid', targetId: 'City', value: 400 }
  ];

  // Calculate node totals: Source flow + Destination flow
  getNodeValue(nodeId: string): number {
    const outgoing = this.links.filter(l => l.sourceId === nodeId).reduce((acc, l) => acc + l.value, 0);
    const incoming = this.links.filter(l => l.targetId === nodeId).reduce((acc, l) => acc + l.value, 0);
    return Math.max(outgoing, incoming); // Total flow through the node
  }

  onNodeRendering = (args: any) => {
    const totalFlow = this.getNodeValue(args.node.id);
    
    if (totalFlow > 200) {
      args.node.color = '#00A651'; // Solid green for high volume
      args.node.width = 35;
    } else {
      args.node.color = '#4472C4';
    }
  };
}


// Avoid: Multiple separate handlers that repeat work
```

## Complete Customization Example

```typescript
import { Component } from '@angular/core';
import { SankeyAllModule, SankeyTooltipService } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <div style="padding: 20px;">
      <ejs-sankey 
        #sankey
        height="450px"
        [nodeStyle]="nodeStyle"
        [linkStyle]="linkStyle"
        [tooltip]="tooltipSettings"
        (nodeRendering)="onNodeRendering($event)"
        (linkRendering)="onLinkRendering($event)"
        (nodeEnter)="onNodeEnter($event)"
        (nodeLeave)="onNodeLeave($event)">
        
        <e-sankey-nodes>
          <e-sankey-node id="Coal" label="Coal (Source)"></e-sankey-node>
          <e-sankey-node id="Solar" label="Solar (Source)"></e-sankey-node>
          <e-sankey-node id="Grid" label="Power Grid"></e-sankey-node>
          <e-sankey-node id="City" label="City Center"></e-sankey-node>
        </e-sankey-nodes>

        <e-sankey-links>
          <e-sankey-link sourceId="Coal" targetId="Grid" [value]="300"></e-sankey-link>
          <e-sankey-link sourceId="Solar" targetId="Grid" [value]="100"></e-sankey-link>
          <e-sankey-link sourceId="Grid" targetId="City" [value]="400"></e-sankey-link>
        </e-sankey-links>
      </ejs-sankey>
    </div>
  `,
  styles: [`
    /* Customizing the labels via CSS since they are SVG elements */
    :host ::ng-deep .e-sankey-label {
      font-weight: 600;
      font-size: 13px !important;
      fill: #333 !important;
    }

    /* Styling the tooltip container */
    :host ::ng-deep #sankey-container_toolTip {
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
  `]
})
export class AppComponent {
  // 1. Enhanced Global Style
  nodeStyle = {
    width: 30,
    padding: 20,
    fill: '#4472C4',
    opacity: 0.9,
    // Add rounded corners to nodes (if supported by the specific version)
    cornerRadius: 4 
  };

  linkStyle = {
    opacity: 0.3, 
    curvature: 0.5,
    // Links will blend from source node color to target node color
    colorType: 'Blend' 
  };

  tooltipSettings = {
    enable: true,
    format: '${sourceId} → ${targetId} : <b>${value} units</b>'
  };

  // 2. Data-Driven Node Customization
  onNodeRendering = (args: any) => {
    // Highlight "Grid" specially as a hub
    if (args.node.id === 'Grid') {
      args.node.color = '#7030A0'; // Purple hub
    } else if (args.node.id === 'City') {
      args.node.color = '#00A651'; // Solid Green for high volume
    } else {
      args.node.color = '#4472C4BB'; // Translucent Blue
    }
  };

  // 3. Link Curvature based on Flow
  onLinkRendering = (args: any) => {
    if (args.link.value > 300) {
      // Make high-value paths slightly straighter
      args.link.curvature = 0.3;
    }
  };

  // 4. Interactive Visual Feedback
  onNodeEnter = (args: any) => {
    // Darken node on hover
    args.node.color = '#222'; 
  };

  onNodeLeave = (args: any) => {
    // Trigger a redraw of the node style
    this.onNodeRendering(args);
  };
}
```

