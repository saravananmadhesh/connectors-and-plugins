# Legend and Interaction

## Table of Contents

- [Legend Overview](#legend-overview)
  - [Legend Purpose](#legend-purpose)
- [Enabling Legends](#enabling-legends)
  - [Basic Legend Display](#basic-legend-display)
  - [Legend with Series Names](#legend-with-series-names)
- [Legend Positioning](#legend-positioning)
  - [Position Property](#position-property)
  - [Top Position](#top-position)
  - [Right Position](#right-position)
  - [Custom Position](#custom-position)
- [Legend Alignment](#legend-alignment)
  - [Alignment Property](#alignment-property)
  - [Examples](#examples)
- [Legend Customization](#legend-customization)
  - [Legend Shape](#legend-shape)
  - [Shape Examples](#shape-examples)
  - [Legend Size](#legend-size)
  - [Legend Padding and Margin](#legend-padding-and-margin)
  - [Legend Border](#legend-border)
- [Series Visibility Toggle](#series-visibility-toggle)
  - [Click to Toggle](#click-to-toggle)
  - [Control toggle visibility](#control-toggle-visibility)
  - [Programmatic Visibility Control](#programmatic-visibility-control)
  - [Show/Hide All Series](#showhide-all-series)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Multi-Series with Legend](#pattern-1-multi-series-with-legend)
  - [Pattern 2: Right-Side Legend](#pattern-2-right-side-legend)
  - [Pattern 3: Interactive Series Control](#pattern-3-interactive-series-control)
  - [Pattern 4: Legend with Custom Position](#pattern-4-legend-with-custom-position)
  - [Pattern 5: Impedance vs Admittance Display](#pattern-5-impedance-vs-admittance-display)
- [User Interaction Patterns](#user-interaction-patterns)
  - [Series Selection](#series-selection)
- [Troubleshooting](#troubleshooting)

## Legend Overview

A legend identifies series by displaying their names and visual indicators (shapes and colors). It helps users understand what each series represents in the smith chart.

### Legend Purpose

- **Series identification** - Name and color mapping
- **User interaction** - Click to toggle series visibility
- **Visual clarity** - Distinguishes between multiple series
- **Professional presentation** - Required for multi-series charts

## Enabling Legends

### Basic Legend Display

Enable the legend with default settings:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { SmithchartModule, SmithchartLegendService } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SmithchartModule],
  providers: [SmithchartLegendService],
  encapsulation: ViewEncapsulation.None,
  template: `
     <ejs-smithchart [legendSettings]="legendSettings" id="container">
      <e-seriesCollection>
        <e-series [dataSource]='seriesdata1' name='Transmission1' reactance='reactance' resistance='resistance'> </e-series>
    </e-seriesCollection>
    </ejs-smithchart>
  `
})
export class AppComponent {
  legendSettings = {
    visible: true
  }
  public seriesdata1: object[] = [
    { resistance: 10, reactance: 25 }, { resistance: 8, reactance: 6 },
    { resistance: 6, reactance: 4.5 }, { resistance: 4.5, reactance: 2 },
    { resistance: 3.5, reactance: 1.6 }, { resistance: 2.5, reactance: 1.3 },
    { resistance: 2, reactance: 1.2 }, { resistance: 1.5, reactance: 1 },
    { resistance: 1, reactance: 0.8 }, { resistance: 0.5, reactance: 0.4 },
    { resistance: 0.3, reactance: 0.2 }, { resistance: 0, reactance: 0.15 },
  ];
}
```

### Legend with Series Names

Each series must have a `name` property to appear in the legend:

```typescript
export class AppComponent {
  series = [
    {
      points: [...],
      name: 'Device A'
    },
    {
      points: [...],
      name: 'Device B'
    }
  ]

  legendSettings = { visible: true }
}
```

## Legend Positioning

### Position Property

Place the legend at different locations:

```typescript
legendSettings = {
  visible: true,
  position: 'Bottom'  // Default
}
```

**Available positions:**
- `'Top'` - Above the chart
- `'Bottom'` - Below the chart (default)
- `'Left'` - Left side of the chart
- `'Right'` - Right side of the chart
- `'Custom'` - Custom X/Y coordinates

### Top Position

```typescript
legendSettings = {
  visible: true,
  position: 'Top'
}
```

**Use case:** Limited vertical space or wide charts

### Right Position

```typescript
legendSettings = {
  visible: true,
  position: 'Right'
}
```

**Use case:** Preserve horizontal chart space

### Custom Position

Place the legend anywhere on the chart:

```typescript
legendSettings = {
  visible: true,
  position: 'Custom',
  location: {
    x: 200,  // Pixels from left
    y: 100   // Pixels from top
  }
}
```

## Legend Alignment

### Alignment Property

Control legend alignment within its position:

```typescript
legendSettings = {
  visible: true,
  position: 'Top',
  alignment: 'Center'  // Default
}
```

**Available alignments:**
- `'Near'` - Align to start of position (top-left for top position)
- `'Center'` - Center within position (default)
- `'Far'` - Align to end of position (top-right for top position)

### Examples

**Near Alignment (Top-Left):**
```typescript
legendSettings = {
  visible: true,
  position: 'Top',
  alignment: 'Near'
}
```

**Far Alignment (Bottom-Right):**
```typescript
legendSettings = {
  visible: true,
  position: 'Bottom',
  alignment: 'Far'
}
```

## Legend Customization

### Legend Shape

Change the visual indicator shape:

```typescript
legendSettings = {
  visible: true,
  shape: 'Circle'  // Default
}
```

**Available shapes:**
- `'Circle'` - Circle indicator (default)
- `'Rectangle'` - Square/rectangular indicator
- `'Triangle'` - Triangle indicator
- `'Diamond'` - Diamond indicator
- `'Cross'` - Cross indicator

### Shape Examples

```typescript
// Rectangular legend items
legendSettings = { shape: 'Rectangle' }

// Triangle indicators
legendSettings = { shape: 'Triangle' }

// Diamond indicators
legendSettings = { shape: 'Diamond' }
```

### Legend Size

Control legend dimensions:

```typescript
legendSettings = {
  visible: true,
  width: 300,   // Width (default: auto)
  height: 50    // Height (default: auto)
}
```

**Sizing notes:**
- Percentage-based sizing (e.g., '50%') supported
- 'auto' for automatic sizing
- Horizontal legend: width is primary constraint
- Vertical legend: height is primary constraint

### Legend Padding and Margin

Control spacing around legend:

```typescript
legendSettings = {
  visible: true,
  itemPadding: 5,      // spacing between legend item
  shapePadding: 10    // Padding between the legend shape and text
}
```

### Legend Border

Add border around legend:

```typescript
legendSettings = {
  visible: true,
  border: {
    color: '#CCCCCC',
    width: 1
  }
}
```

## Series Visibility Toggle

### Click to Toggle

By default, clicking a legend item hides/shows the series:

```typescript
export class AppComponent {
  series = [
    { points: [...], name: 'Series 1' },
    { points: [...], name: 'Series 2' }
  ]

  legendSettings = { visible: true, toggleVisibility: true }

  // User clicks legend item → series visibility toggles automatically
}
```

### Control toggle visibility
```typescript
export class AppComponent {
  series = [
    { points: [...], name: 'Series 1' },
    { points: [...], name: 'Series 2' }
  ]

  legendSettings = { visible: true, toggleVisibility: false }
}
``` 

### Programmatic Visibility Control

Manually control series visibility:

```typescript
export class AppComponent {
  series = [
    {
      points: [...],
      name: 'Series 1',
      visibility: 'visible'   // Visible
    },
    {
      points: [...],
      name: 'Series 2',
      visibility: 'hidden'  // Hidden
    }
  ]

  toggleSeries(seriesName: string): void {
    this.series = this.series.map(s => {
      if (s.name === seriesName) {
        return {
          ...s,
          visibility: s.visibility === 'visible' ? 'hidden' : 'visible'
        };
      }
      return s;
    });
  }
}
```

### Show/Hide All Series

```typescript
showAllSeries() {
  this.series = this.series.map(s => ({
    ...s,
    visibility: 'visible'
  }));
}

hideAllSeries() {
  this.series = this.series.map(s => ({
    ...s,
    visibility: 'hidden'
  }));
}
```

## Common Patterns

### Pattern 1: Multi-Series with Legend

Compare multiple devices with clear identification:

```typescript
export class AppComponent {
  series = [
    {
      points: [{ resistance: 10, reactance: 10 }, ...],
      fill: '#0066CC',
      name: 'Device A'
    },
    {
      points: [{ resistance: 15, reactance: 12 }, ...],
      fill: '#FF6633',
      name: 'Device B'
    },
    {
      points: [{ resistance: 8, reactance: 8 }, ...],
      fill: '#00CC66',
      name: 'Device C'
    }
  ]

  legendSettings = {
    visible: true,
    position: 'Bottom',
    shape: 'Rectangle'
  }
}
```

### Pattern 2: Right-Side Legend

Preserve horizontal chart space:

```typescript
legendSettings = {
  visible: true,
  position: 'Right',
  alignment: 'Center'
}
```

**HTML template:**
```html
<div style="display: flex;">
  <div style="flex: 1;">
    <ejs-smithchart [legendSettings]="legendSettings"></ejs-smithchart>
  </div>
</div>
```

### Pattern 3: Interactive Series Control

Enable/disable series visibility with buttons:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { SmithchartModule, SmithchartLegendService } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SmithchartModule],
  providers: [SmithchartLegendService],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="toolbar">
      <button (click)="toggleDevice(0)">Toggle Device 1</button>
      <button (click)="toggleDevice(1)">Toggle Device 2</button>
      <button (click)="toggleDevice(2)">Toggle Device 3</button>
    </div>

    <ejs-smithchart
      [series]="series"
      [legendSettings]="legendSettings"
      style="display:block;height:400px">
    </ejs-smithchart>
  `,
  styles: [`
    .toolbar {
      margin-bottom: 10px;
    }
    button {
      margin-right: 8px;
    }
  `]
})
export class AppComponent {

  legendSettings = {
    visible: true
  };

  series = [
    {
      name: 'Line 1',
      visibility: 'visible',
      marker: { visible: true },
      points: [
        { resistance: 0.2, reactance: 0.2 },
        { resistance: 0.4, reactance: 0.3 }
      ]
    },
    {
      name: 'Line 2',
      visibility: 'visible',
      marker: { visible: true },
      points: [
        { resistance: 0.3, reactance: 0.25 },
        { resistance: 0.5, reactance: 0.15 }
      ]
    },
    {
      name: 'Line 3',
      visibility: 'hidden',   // Initially hidden
      marker: { visible: true },
      points: [
        { resistance: 0.4, reactance: 0.2 },
        { resistance: 0.6, reactance: 0.1 }
      ]
    }
  ];

  toggleDevice(index: number): void {
    this.series = this.series.map((s, i) => {
      if (i === index) {
        return {
          ...s,
          visibility: s.visibility === 'visible' ? 'hidden' : 'visible'
        };
      }
      return s;
    });
  }
}
```

### Pattern 4: Legend with Custom Position

Place legend in upper-right corner:

```typescript
legendSettings = {
  visible: true,
  position: 'Custom',
  location: { x: 350, y: 30 },
  alignment: 'Far'
}
```

### Pattern 5: Impedance vs Admittance Display

Distinguish render types in legend:

```typescript
@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SmithchartModule],
  providers: [SmithchartLegendService],
  encapsulation: ViewEncapsulation.None,
  template: `
<!-- Impedance Smith Chart -->
<ejs-smithchart
  renderType="Impedance"
  [series]="impedanceSeries"
  [legendSettings]="legendSettings">
</ejs-smithchart>

<!-- Admittance Smith Chart -->
<ejs-smithchart
  renderType="Admittance"
  [series]="admittanceSeries"
  [legendSettings]="legendSettings">
</ejs-smithchart>
  `,
})
export class AppComponent {
  
  impedanceSeries = [
    {
      name: 'Impedance View',
      fill: '#0066CC',
      marker: { visible: true },
      points: [
        { resistance: 0.3, reactance: 0.2 },
        { resistance: 0.5, reactance: 0.1 },
        { resistance: 0.7, reactance: -0.1 }
      ]
    }
  ];
  admittanceSeries = [
    {
      name: 'Admittance View',
      fill: '#FF6633',
      marker: { visible: true },
      points: [
        { resistance: 0.3, reactance: 0.2 },
        { resistance: 0.5, reactance: 0.1 },
        { resistance: 0.7, reactance: -0.1 }
      ]
    }
  ];
  legendSettings = {
    visible: true,
    shape: 'Rectangle'
  }
}
```

## User Interaction Patterns

### Series Selection

Track which series are currently visible:

```typescript
export class AppComponent {
  selectedSeries = new Set<string>();

  onLegendClick(seriesName: string) {
    if (this.selectedSeries.has(seriesName)) {
      this.selectedSeries.delete(seriesName);
    } else {
      this.selectedSeries.add(seriesName);
    }
  }
}
```

## Troubleshooting

**Issue:** Legend doesn't appear
- **Check:** `legendSettings.visible = true`
- **Check:** Each series has `name` property
- **Check:** At least one series is visible

**Issue:** Legend items for hidden series
- **Note:** This is expected behavior - hidden series can be toggled via legend click

**Issue:** Legend overlaps chart
- **Solution:** Use `position: 'Top'`, `'Bottom'`, `'Left'`, or `'Right'`
- **Solution:** Use `Custom` position with appropriate x/y values

**Issue:** Legend text truncated
- **Solution:** Adjust `width` property
- **Solution:** Shorten series names


