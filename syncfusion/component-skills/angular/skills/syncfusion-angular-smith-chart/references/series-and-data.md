# Series and Data Management

## Table of Contents

- [Series Concepts](#series-concepts)
- [Data Formats](#data-formats)
  - [Points Format](#points-format)
  - [DataSource Format](#datasource-format)
  - [Dynamic Data Binding](#dynamic-data-binding)
- [Impedance vs Admittance](#impedance-vs-admittance)
  - [Impedance (Default)](#impedance-default)
  - [Admittance](#admittance)
- [Single Series](#single-series)
  - [Basic Single Series](#basic-single-series)
  - [With Styling](#with-styling)
- [Multiple Series](#multiple-series)
  - [Side-by-Side Comparison](#side-by-side-comparison)
  - [Series Array with Different Data Sources](#series-array-with-different-data-sources)
- [Series Customization](#series-customization)
  - [Fill Color](#fill-color)
  - [Line Width and Opacity](#line-width-and-opacity)
  - [Series Visibility](#series-visibility)
  - [Series Name](#series-name)
- [Data Label Management](#data-label-management)
  - [Enable Data Labels](#enable-data-labels)
  - [Smart Labels (Prevent Overlap)](#smart-labels-prevent-overlap)
  - [Label Styling](#label-styling)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Multiple Series Comparison](#pattern-1-multiple-series-comparison)
  - [Pattern 2: Impedance with Smart Labels](#pattern-2-impedance-with-smart-labels)
  - [Pattern 3: Dynamic Series Update](#pattern-3-dynamic-series-update)
- [Troubleshooting](#troubleshooting)

## Series Concepts

A series in a smith chart represents a single transmission line or impedance curve. Each series consists of:

- **Points array** - Collection of (resistance, reactance) data points
- **Visual properties** - Color (fill), line width, opacity
- **Markers** - Visual indicators at each data point
- **Data labels** - Text labels showing values
- **Name** - Series identifier for legends

Multiple series allow comparison of different transmission lines or network parameters.

## Data Formats

### Points Format

Define data inline as an array of objects with `resistance` and `reactance` properties:

```typescript
series = [{
  points: [
      { resistance: 0.1, reactance: 0.1 },
      { resistance: 0.3, reactance: 0.2 },
      { resistance: 0.5, reactance: 0.16 },
      { resistance: 0.7, reactance: -0.1 }
  ]
}]
```

Each point represents a location on the smith chart grid.

### DataSource Format

Bind data from an external array with property name mappings:

```typescript

import { Component } from '@angular/core';
import { SmithchartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [ SmithchartModule ],
    standalone: true,
    selector: 'app-container',
    template: `<ejs-smithchart style='display: block;' id='container' height='350px'  [series]="series>
    </ejs-smithchart>`
})
export class AppComponent {
  transmissionData = [
    { impedance_r: 10, impedance_x: 10 },
    { impedance_r: 20, impedance_x: 15 },
    { impedance_r: 30, impedance_x: 5 }
  ]
  
  series = [{
    dataSource: this.transmissionData,
    resistance: 'impedance_r',
    reactance: 'impedance_x'
  }]
}
```

Use `resistance` and `reactance` properties to map your data field names.

### Dynamic Data Binding

Update series data dynamically:

```typescript
export class AppComponent {
  series = [{
    points: [
      { resistance: 10, reactance: 10 }
    ]
  }]

  addDataPoint() {
    this.series[0].points.push({ resistance: 25, reactance: 12 })
  }

  loadFromAPI() {
    // Fetch data from your backend
    this.transmissionService.getData().subscribe(data => {
      this.series = [
        {
          name: 'Updated',
          points: data,
          marker: { visible: true }
        }
      ];
    })
  }
}
```

## Impedance vs Admittance

The `renderType` property determines how data is interpreted:

### Impedance (Default)

Plots resistance and reactance directly on the smith chart:

```typescript
<ejs-smithchart renderType="Impedance">
  <e-seriesCollection>
    <e-series
      [points]="points"
      [marker]="marker">
    </e-series>
  </e-seriesCollection>
</ejs-smithchart>
```

- **Horizontal axis** - Resistance values
- **Vertical axis** - Reactance values
- **Use case** - Standard impedance matching analysis

### Admittance

Transforms impedance data to admittance (inverse of impedance) for analysis:

```typescript
<ejs-smithchart renderType="Admittance">
  <e-seriesCollection>
    <e-series
      [points]="points"
      [marker]="marker">
    </e-series>
  </e-seriesCollection>
</ejs-smithchart>
```

- **Use case** - Admittance network analysis
- **Transform** - Y = 1/Z (automatic conversion)

## Single Series

### Basic Single Series

```typescript
series = [{
    points: [
      { resistance: 0.1, reactance: 0.1 },
      { resistance: 0.3, reactance: 0.2 },
      { resistance: 0.5, reactance: 0.16 },
      { resistance: 0.7, reactance: -0.1 }
    ],

}]
```

### With Styling

```typescript
series = [{
  points: [...],
  fill: '#0066CC',           // Series line color
  width: 3,                  // Line width in pixels
  opacity: 0.8,              // Transparency (0-1)
  visibility: 'visible',          // Show/hide series
  name: 'Transmission Line 1' // Legend name
}]
```

## Multiple Series

### Side-by-Side Comparison

Display multiple transmission lines for comparison:

```typescript
export class AppComponent {
  series = [
    {
      points: [
        { resistance: 0.2, reactance: 0.2 },
        { resistance: 0.4, reactance: 0.3 },
        { resistance: 0.9, reactance: 0.1 }
      ],
      fill: '#0066CC',
      name: 'Line A'
    },
    {
      points: [
        { resistance: 0.16, reactance: 0.24 },
        { resistance: 0.36, reactance: 0.36 },
        { resistance: 0.56, reactance: 0.16 }
      ],
      fill: '#FF6633',
      name: 'Line B'
    },
    {
      points: [
        { resistance: 0.24, reactance: 0.16 },
        { resistance: 0.44, reactance: 0.24 },
        { resistance: 0.64, reactance: 0.04 }
      ],
      fill: '#00CC66',
      name: 'Line C'
    }
  ]
}
```

### Series Array with Different Data Sources

```typescript
export class AppComponent {
  measurementData = [...]
  simulationData = [...]
  
  series = [
    {
      dataSource: this.measurementData,
      resistance: 'measured_r',
      reactance: 'measured_x',
      fill: '#0066CC',
      name: 'Measured'
    },
    {
      dataSource: this.simulationData,
      resistance: 'simulated_r',
      reactance: 'simulated_x',
      fill: '#FF6633',
      name: 'Simulated'
    }
  ]
}
```

## Series Customization

### Fill Color

Set series line color:

```typescript
series = [{
  points: [...],
  fill: '#0066CC'  // Hex color code
}]
```

### Line Width and Opacity

Control line appearance:

```typescript
series = [{
  points: [...],
  width: 2.5,      // Line width in pixels (default: 2)
  opacity: 0.7     // Transparency 0-1 (default: 1)
}]
```

### Series Visibility

Toggle series display:

```typescript
series = [{
  points: [...],
  visibility: 'hidden'  // Hide this series initially
}]
```

Hidden series still appear in legends but aren't displayed on the chart.

### Series Name

Set series name for legends:

```typescript
series = [{
  points: [...],
  name: 'RF Transmission Line'
}]
```

Use meaningful names for easy identification in legends.

## Data Label Management

### Enable Data Labels

Display value labels at each data point:

```typescript
export class AppComponent {
  series = [{
    points: [...],
    marker:{ dataLabel:{ visible:true } }
  }]
}
```

### Smart Labels (Prevent Overlap)

Enable smart label positioning to avoid overlapping:

```typescript
series = [{
  points: [...],
  enableSmartLabels: true,
  marker: { dataLabel: { visible:true }}
}]
```

The chart automatically repositions labels to prevent overlap.

### Label Styling

Customize label appearance:
 
```typescript
marker:{
  dataLabel : {
    visible: true,
    fill: '#000000',
    textStyle: {
    color: '#FFFFFF',
    fontFamily: 'Arial',
    size: '12px'
  },
  border: {
    color: '#999999',
    width: 1
  }
}
}
```

## Common Patterns

### Pattern 1: Multiple Series Comparison

```typescript
export class AppComponent {
  series = [
    { points: [...], fill: '#0066CC', name: 'Device 1' },
    { points: [...], fill: '#FF6633', name: 'Device 2' },
    { points: [...], fill: '#00CC66', name: 'Device 3' }
  ]
}
```

### Pattern 2: Impedance with Smart Labels

```typescript
<ejs-smithchart renderType="Impedance">
  <e-seriesCollection>
    <e-series
      [points]="points"
      [marker]="marker"
      [enableSmartLabels]="true">
    </e-series>
  </e-seriesCollection>
</ejs-smithchart>
```

### Pattern 3: Dynamic Series Update

```typescript
export class AppComponent {
  series = [{ points: [] }]

  loadMeasurement(deviceId: string) {
    this.api.getMeasurement(deviceId).subscribe(data => {
      this.series = [
        {
          name: data.name,
          points: data.points,           
          marker: { visible: true }      
        }
      ];
    })
  }
}
```

## Troubleshooting

**Issue:** Data points not appearing
- **Check:** Ensure `resistance` and `reactance` properties exist in data
- **Check:** Verify values are within reasonable range (-∞ to +∞)

**Issue:** Series not showing in legend
- **Check:** Set `name` property on each series
- **Check:** Verify `legendSettings.visible = true`


