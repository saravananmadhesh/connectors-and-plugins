# Appearance and Sizing

## Table of Contents

- [Component Dimensions](#component-dimensions)
  - [Fixed Dimensions](#fixed-dimensions)
  - [Percentage-Based Sizing](#percentage-based-sizing)
- [Responsive Sizing](#responsive-sizing)
- [Background and Border](#background-and-border)
  - [Background Color](#background-color)
  - [Background Image](#background-image)
  - [Border Customization](#border-customization)
  - [Border Properties](#border-properties)
  - [Examples](#examples)
- [Margins](#margins)
  - [Margin Properties](#margin-properties)
  - [Use Cases](#use-cases)
- [Themes](#themes)
  - [Dynamic Theme Switching](#dynamic-theme-switching)
- [Global Styling](#global-styling)
  - [Global Node Styling](#global-node-styling)
  - [Global Link Styling](#global-link-styling)
- [Complete Styling Example](#complete-styling-example)

## Component Dimensions

Set the Sankey diagram size using `width` and `height` properties. These accept CSS values (pixels or percentages).

### Fixed Dimensions

Set specific pixel dimensions for consistent sizing:

```typescript
@Component({
  template: `
    <ejs-sankey 
      width="800px"
      height="500px">
    </ejs-sankey>
  `
})
export class AppComponent {
}
```

| Value | Result |
|-------|--------|
| `'800px'` | 800 pixels wide |
| `'500px'` | 500 pixels high |
| `null` | Default size (usually 100% width, auto height) |

### Percentage-Based Sizing

Use percentages for responsive layouts:

```typescript
@Component({
  template: `
    <div class="container">
      <ejs-sankey 
        width="100%"
        height="100%">
      </ejs-sankey>
    </div>
  `,
  styles: [`
    .container {
      width: 100%;
      height: 600px;
    }
  `]
})
export class AppComponent {
}
```

## Responsive Sizing

Use percentage dimensions with CSS media queries for responsive layouts:

```typescript
import { Component, OnInit } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

@Component({
    imports: [
        SankeyAllModule
    ],
    standalone: true,
    selector: 'app-container',
    template: `
    <div className="control-pane">
      <div className="control-section" id="sankey-container">

        <ejs-sankey
          width="90%"
          [height]="sankeyHeight"
          [margin]="sankeyMargin">

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
    public sankeyHeight: string = '450px';
    public sankeyMargin?: Object;

    ngOnInit(): void {
        this.sankeyHeight = Browser.isDevice ? '600px' : '450px';

        this.sankeyMargin = {
            left: Browser.isDevice ? 10 : 40,
            right: Browser.isDevice ? 10 : 40,
            top: 20,
            bottom: 20
        };
    }
}
```

## Background and Border

Customize the diagram's background and border appearance.

### Background Color

```typescript
@Component({
  template: `
    <ejs-sankey 
      background="#F5F5F5">
    </ejs-sankey>
  `
})
export class AppComponent {
}
```

### Background Image

```typescript
@Component({
  template: `
    <ejs-sankey 
      [dataSource]="data"
      backgroundImage="url('assets/pattern.png')">
    </ejs-sankey>
  `
})
export class AppComponent {
}
```

### Border Customization

Configure the diagram border:

```typescript
@Component({
  template: `
    <ejs-sankey 
      [border]="borderSettings">
    </ejs-sankey>
  `
})
export class AppComponent {

  borderSettings = {
    color: '#1F4E78',      // Border color
    width: 2,              // Border width in pixels
    dashArray: '5,5'       // Dashed pattern: 5px dash, 5px gap
  };
}
```

### Border Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `color` | string | '' | Border color (hex, RGB, or named) |
| `width` | number | 1 | Border width in pixels |
| `dashArray` | string | '' | Dash pattern ('5,5' for dashed) |

### Examples

```typescript
// Solid border
border = { color: '#000', width: 2 };

// Dashed border
border = { color: '#999', width: 1, dashArray: '3,3' };

// Dotted border
border = { color: '#CCC', width: 1, dashArray: '1,2' };

// Thick border
border = { color: '#FF0000', width: 4 };
```

## Margins

Control spacing around diagram content using margins:

```typescript
@Component({
  template: `
    <ejs-sankey 
      [margin]="marginSettings">
    </ejs-sankey>
  `
})
export class AppComponent {

  marginSettings = {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20
  };
}
```

### Margin Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `left` | number | 10 | Left margin in pixels |
| `right` | number | 10 | Right margin in pixels |
| `top` | number | 10 | Top margin in pixels |
| `bottom` | number | 10 | Bottom margin in pixels |

### Use Cases

```typescript
// Large margins for spacious layout
margins = { left: 50, right: 50, top: 50, bottom: 50 };

// Minimal margins for compact layout
margins = { left: 5, right: 5, top: 5, bottom: 5 };

// Asymmetric margins for specific positioning
margins = { left: 30, right: 10, top: 40, bottom: 20 };
```

## Themes

Apply built-in themes to the diagram:

```typescript
@Component({
  template: `
    <ejs-sankey 
      [theme]="selectedTheme">
    </ejs-sankey>
  `
})
export class AppComponent {
  selectedTheme = 'Material';
}
```

### Dynamic Theme Switching

```typescript
@Component({
  template: `
    <div>
      <select
        [(ngModel)]="selectedTheme"
        (ngModelChange)="onThemeChange($event)">

        <option value="Material">Material</option>
        <option value="Bootstrap">Bootstrap</option>
        <option value="Tailwind">Tailwind</option>
        <option value="HighContrast">High Contrast</option>
      </select>

      <ejs-sankey
        #sankey
        [theme]="selectedTheme">

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
  selectedTheme = 'Tailwind';

  @ViewChild('sankey') sankey!: any;

  onThemeChange(theme: string) {
    this.selectedTheme = theme;
    this.sankey.refresh();
  }
}
```

## Global Styling

Configure appearance for all nodes and links at once.

### Global Node Styling

```typescript
@Component({
  template: `
    <ejs-sankey 
      [nodeStyle]="nodeSettings">
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

### Global Link Styling

```typescript
@Component({
  template: `
    <ejs-sankey 
      [linkStyle]="linkSettings">
    </ejs-sankey>
  `
})
export class AppComponent {

  linkSettings = {
    opacity: 0.5,
    curvature: 0.7,
    highlightOpacity: 1,
    inactiveOpacity: 0.2
  };
}
```

## Complete Styling Example

```typescript
@Component({
  template: `
    <ejs-sankey 
      width="100%"
      height="600px"
      background="#F8F9FA"
      [border]="borderSettings"
      [margin]="marginSettings"
      [theme]="'Material'"
      [nodeStyle]="nodeSettings"
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
  `,
  
})
export class AppComponent {

  borderSettings = {
    color: '#1F4E78',
    width: 2
  };

  marginSettings = {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20
  };

  nodeSettings = {
    width: 25,
    padding: 15,
    fill: '#4472C4',
    stroke: '#1F4E78',
    strokeWidth: 2
  };

  linkSettings = {
    opacity: 0.5,
    curvature: 0.7
  };
}
```
