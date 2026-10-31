# Markers and Data Labels

## Table of Contents

- [Markers Overview](#markers-overview)
  - [Basic Marker Display](#basic-marker-display)
  - [Marker Characteristics](#marker-characteristics)
- [Marker Configuration](#marker-configuration)
  - [Basic Marker Properties](#basic-marker-properties)
  - [Marker Shapes](#marker-shapes)
  - [Multiple Markers per Series](#multiple-markers-per-series)
  - [Marker Opacity and Border](#marker-opacity-and-border)
- [Data Labels Overview](#data-labels-overview)
  - [Enable Data Labels](#enable-data-labels)
  - [Label Content](#label-content)
- [Label Styling](#label-styling)
  - [Font and Color](#font-and-color)
  - [Border and Background](#border-and-background)
  - [Combined Styling](#combined-styling)
- [Common Patterns](#common-patterns)
  - [Pattern 1: Highlight Key Points](#pattern-1-highlight-key-points)
  - [Pattern 2: Impedance and Admittance Comparison](#pattern-2-impedance-and-admittance-comparison)
  - [Pattern 3: Dense Data with Smart Labels](#pattern-3-dense-data-with-smart-labels)
  - [Pattern 4: Minimal Display](#pattern-4-minimal-display)
- [Edge Cases and Gotchas](#edge-cases-and-gotchas)
  - [Overlapping Labels](#overlapping-labels)
  - [Performance](#performance)

## Markers Overview

Markers are visual indicators at each data point on the smith chart. They help identify individual points and emphasize important values.

### Basic Marker Display

Enable markers on all data points:

```typescript
export class AppComponent {
  series = [{
    points: [...],
    marker: {
      visible: true
    }
  }]
}
```

### Marker Characteristics

- **Shape** - Circle (default), Square, Triangle, Diamond
- **Fill** - Fill color for each marker
- **Height** - Height in pixels
- **Width** - Width in pixels
- **Border** - Optional outline
- **Opacity** - Transparency level
- **Visible** - Visibility of the marker

## Marker Configuration

### Basic Marker Properties

```typescript
marker = {
  visible: true,
  width: 10,           // Marker width in pixels
  height: 10,          // Marker height in pixels
  fill: '#0066CC',     // Marker fill color
  border: {
    color: '#000000',  // Border color
    width: 1           // Border width in pixels
  },
  opacity: 1           // Transparency 0-1
}
```

### Marker Shapes

Available marker shapes:

```typescript
// Circle (default)
marker = { shape: 'Circle' }

// Square
marker = { shape: 'Rectangle' }

// Triangle
marker = { shape: 'Triangle' }

// Diamond
marker = { shape: 'Diamond' }
```

### Multiple Markers per Series

Apply markers to different series with different styles:

```typescript
export class AppComponent {
  series = [
    {
      points: [...],
      marker: {
        visible: true,
        fill: '#0066CC',
        width: 8,
        height: 8
      }
    },
    {
      points: [...],
      marker: {
        visible: true,
        fill: '#FF6633',
        shape: 'Rectangle',
        width: 10,
        height: 10
      }
    }
  ]
}
```

### Marker Opacity and Border

Combine opacity with borders for emphasis:

```typescript
marker = {
  visible: true,
  fill: '#CCCCFF',
  opacity: 0.6,
  border: {
    color: '#0066CC',
    width: 2
  }
}
```

## Data Labels Overview

Data labels display numeric values directly on or near the marker points. They provide precise information without requiring tooltips.

### Enable Data Labels

Display labels for all data points:

```typescript
export class AppComponent {
  series = [{
    points: [...],
    marker: {
      dataLabel: {
        visible: true
      }
    }
  }]
}
```
**IMPORTANT:** `dataLabel` must be **nested INSIDE the `marker`** object, NOT at the series level.

```typescript
// ✓ CORRECT - dataLabel inside marker
 marker: {
   visible: true,
   dataLabel: { visible: true }
 }
 
 // ✗ WRONG - dataLabel at series level
 series: [{
   dataLabel: { visible: true },
   marker: { visible: true }
 }]
```

## Label Styling

### Font and Color

Customize label text appearance:

```typescript
marker ={
  dataLabel : {
    visible: true,
    textStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      size: '12px',
      fontWeight: 'Bold',
      opacity: 1
    }
  }
}
```

**Available properties:**
- `color` - Text color (hex or named)
- `fontFamily` - Font name
- `size` - Text size (px, em, etc.)
- `fontWeight` - Normal, Bold, Bolder
- `opacity` - Transparency 0-1
- `fontStyle` - Font style for text

### Border and Background

Add visual emphasis with borders:

```typescript
marker = {
  dataLabel: {
    visible: true,
    border: {
      color: '#CCCCCC',
      width: 1
    },
    fill: '#FFFFFF'  // Background color
  }
}
```

### Combined Styling

```typescript
marker = {
  dataLabel : {
    visible: true,
    fill: '#FFFFCC',
    textStyle: {
      color: '#000000',
      size: '11px',
      fontWeight: 'Bold'
    },
    border: {
      color: '#FF6633',
      width: 1
    }
  }
}
```

## Common Patterns

### Pattern 1: Highlight Key Points

Show markers and labels for important measurements:

```typescript
export class AppComponent {
  series = [{
    points: [
      { resistance: 0.16, reactance: 0.24 },
      { resistance: 0.36, reactance: 0.36 },
      { resistance: 0.56, reactance: 0.16 }
    ],
    marker: {
      visible: true,
      fill: '#0066CC',
      width: 8,
      dataLabel: {
        visible: true,
      }
    },
  }]
}
```

### Pattern 2: Impedance and Admittance Comparison

Different markers for different render types:

```typescript
@Component({
imports: [
         SmithchartModule
    ],
standalone: true,
    selector: 'app-container',
    template: `
<!-- Impedance Smith Chart -->
<ejs-smithchart renderType="Impedance" [series]="impedanceSeries"></ejs-smithchart>

<!-- Admittance Smith Chart -->
<ejs-smithchart renderType="Admittance" [series]="admittanceSeries"></ejs-smithchart>
`
})
export class AppComponent {
  impedanceSeries = [
    {
      name: 'Impedance View',
      points: [
        { resistance: 0.3, reactance: 0.2 },
        { resistance: 0.5, reactance: 0.1 },
        { resistance: 0.7, reactance: -0.1 }
      ],
      marker: {
        visible: true,
        fill: '#0066CC',
        dataLabel: { visible: true }
      }
    }
  ];

  admittanceSeries = [
    {
      name: 'Admittance View',
      points: [
        { resistance: 0.3, reactance: 0.2 },
        { resistance: 0.5, reactance: 0.1 },
        { resistance: 0.7, reactance: -0.1 }
      ],
      marker: {
        visible: true,
        fill: '#FF6633',
        shape: 'Rectangle',
        dataLabel: { visible: true }
      }
    }
  ];
}
```

### Pattern 3: Dense Data with Smart Labels

Show all values without visual clutter:

```typescript
export class AppComponent {
  series = [{
    points: generateDenseData(),  // Many points
    marker: {
      visible: true,
      width: 5,
      height: 5,
      opacity: 0.7,
      dataLabel: {
        visible: true,
      }
    },
    enableSmartLabels: true
  }]
}
```

### Pattern 4: Minimal Display

Hide markers but show labels:

```typescript
export class AppComponent {
  series = [{
    points: [...],
    marker: {
      visible: false,  // No markers
      dataLabel: {
        visible: true,
      }
    },
  }]
}
```

## Edge Cases and Gotchas

### Overlapping Labels

**Problem:** Many points with labels create visual clutter

**Solution 1: Smart Labels**
```typescript
enableSmartLabels: true
```

### Performance

**Problem:** Many labels impact rendering performance

**Solution 1: Disable Markers**
```typescript
marker: { visible: false }
```

**Solution 2: Reduce Data Points**
Aggregate or sample data before display:
```typescript
const sampledData = data.filter((d, i) => i % 5 === 0)
```

## Common Mistakes

### Mistake 1: Putting dataLabel at Series Level

**WRONG:**
```typescript
series = [{
  points: [...],
  dataLabel: { visible: true },    // ✗ Wrong place!
  marker: { visible: true }
}]
```

**CORRECT:**
```typescript
series = [{
  points: [...],
  marker: {
    visible: true,
    dataLabel: { visible: true }   // ✓ Inside marker
  }
}]
```

### Mistake 2: Binding dataLabel Separately in Template

**WRONG HTML:**
```html
<e-series [dataLabel]="s.dataLabel" [marker]="s.marker"></e-series>
<!-- ✗ This binds dataLabel at series level -->
```

**CORRECT HTML:**
```html
<e-series [marker]="s.marker"></e-series>
<!-- ✓ Just bind marker, dataLabel is already inside -->
```

### Mistake 3: Missing `dataLabel` Object in TypeScript

**WRONG:**
```typescript
marker: {
  visible: true,
  dataLabel: true  // ✗ Should be an object
}
```

**CORRECT:**
```typescript
marker: {
  visible: true,
  dataLabel: { visible: true }  // ✓ Object with visible property
}
```
