# Data Labels & Formatting

## Table of Contents
- [Enabling Data Labels](#enabling-data-labels)
- [Positioning](#positioning)
- [Text Formatting](#text-formatting)
- [Label Templates](#label-templates)
- [Connector Lines](#connector-lines)
- [Custom Formatting with Events](#custom-formatting-with-events)

## Enabling Data Labels

### Basic Data Labels

Data labels display information directly on chart segments. Enable them by setting `visible: true` in the `dataLabel` property.

```vue
<template>
  <div id="app">
    <ejs-circularchart3d id="container" :tilt="-45">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series 
          :dataSource="data" 
          xName="x" 
          yName="y"
          :dataLabel="{ visible: true }">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D, CircularChartDataLabel3D } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-circularchart3d': CircularChart3DComponent,
    'e-circularchart3d-series-collection': CircularChart3DSeriesCollectionDirective,
    'e-circularchart3d-series': CircularChart3DSeriesDirective
  },
  data() {
    return {
      data: [
        { x: 'Jan', y: 13 },
        { x: 'Feb', y: 13.5 },
        { x: 'Mar', y: 7 },
        { x: 'Apr', y: 13.5 }
      ]
    };
  },
  provide: {
    circularchart3d: [PieSeries3D, CircularChartDataLabel3D]  // ⚠️ REQUIRED!
  }
};
</script>

<style>
#container { height: 350px; }
</style>
```

**Important:** Always provide `CircularChartDataLabel3D` module when using data labels.

### Default Label Behavior

By default, labels are positioned `Inside` the slices and display the `y` value:

```javascript
// Default configuration
dataLabel: { visible: true }
// Renders as: "13", "13.5", "7", "13.5" inside each slice
```

## Positioning

### Inside vs Outside

```vue
<!-- Labels inside slices (default) -->
<e-circularchart3d-series 
  :dataLabel="{ visible: true, position: 'Inside' }">
</e-circularchart3d-series>

<!-- Labels outside slices -->
<e-circularchart3d-series 
  :dataLabel="{ visible: true, position: 'Outside' }">
</e-circularchart3d-series>
```

### Comparison Example

```vue
<template>
  <div id="app">
    <div style="display: flex; gap: 20px;">
      <!-- Inside labels -->
      <div style="flex: 1;">
        <h3>Inside Labels</h3>
        <ejs-circularchart3d id="inside" :tilt="-45">
          <e-circularchart3d-series-collection>
            <e-circularchart3d-series 
              :dataSource="data" 
              xName="x" 
              yName="y"
              :dataLabel="{ visible: true, position: 'Inside' }">
            </e-circularchart3d-series>
          </e-circularchart3d-series-collection>
        </ejs-circularchart3d>
      </div>

      <!-- Outside labels -->
      <div style="flex: 1;">
        <h3>Outside Labels</h3>
        <ejs-circularchart3d id="outside" :tilt="-45">
          <e-circularchart3d-series-collection>
            <e-circularchart3d-series 
              :dataSource="data" 
              xName="x" 
              yName="y"
              :dataLabel="{ visible: true, position: 'Outside' }">
            </e-circularchart3d-series>
          </e-circularchart3d-series-collection>
        </ejs-circularchart3d>
      </div>
    </div>
  </div>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D, CircularChartDataLabel3D } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-circularchart3d': CircularChart3DComponent,
    'e-circularchart3d-series-collection': CircularChart3DSeriesCollectionDirective,
    'e-circularchart3d-series': CircularChart3DSeriesDirective
  },
  data() {
    return {
      data: [
        { x: 'Jan', y: 13 },
        { x: 'Feb', y: 13 },
        { x: 'Mar', y: 17 },
        { x: 'Apr', y: 13.5 }
      ]
    };
  },
  provide: {
    circularchart3d: [PieSeries3D, CircularChartDataLabel3D]
  }
};
</script>

<style>
#inside, #outside { height: 350px; }
</style>
```

## Text Formatting

### Format Properties

| Property | Purpose | Example |
|----------|---------|---------|
| `name` | Data field to display as label text | `name: 'text'` (display from data.text) |
| `format` | Number formatting | `format: 'n2'` (2 decimals) |

### Number Format Codes

The `format` property uses standard .NET number format codes:

| Format | Description | Example Input | Output |
|--------|-------------|-------|--------|
| `n1` | Number with 1 decimal | 1000 | 1000.0 |
| `n2` | Number with 2 decimals | 1000 | 1000.00 |
| `n3` | Number with 3 decimals | 1000 | 1000.000 |
| `p1` | Percentage with 1 decimal | 0.35 | 35.0% |
| `p2` | Percentage with 2 decimals | 0.35 | 35.00% |
| `c1` | Currency with 1 decimal | 1000 | $1000.0 |
| `c2` | Currency with 2 decimals | 1000 | $1000.00 |

### Format Examples

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45">
    <e-circularchart3d-series-collection>
      <!-- Display raw numbers -->
      <e-circularchart3d-series 
        :dataSource="data" 
        xName="x" 
        yName="y"
        :dataLabel="{ visible: true, format: 'n2' }">
      </e-circularchart3d-series>

      <!-- Display as percentage -->
      <e-circularchart3d-series 
        :dataSource="percentData" 
        xName="x" 
        yName="percentage"
        :dataLabel="{ visible: true, format: 'p1', position: 'Inside' }">
      </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { x: 'Jan', y: 13.456 },
        { x: 'Feb', y: 13.234 }
      ],
      percentData: [
        { x: 'Q1', percentage: 0.35 },
        { x: 'Q2', percentage: 0.65 }
      ]
    };
  }
};
</script>
```

### Map Custom Text Fields

Display custom text from data using the `name` property:

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series 
        :dataSource="data" 
        xName="x" 
        yName="y"
        :dataLabel="{ visible: true, name: 'text' }">
      </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { x: 'Jan', y: 3, text: 'January' },
        { x: 'Feb', y: 3.5, text: 'February' },
        { x: 'Mar', y: 7, text: 'March' },
        { x: 'Apr', y: 13.5, text: 'April' }
      ]
    };
  }
};
</script>
```

**Result:** Labels display "January", "February", "March", "April"

## Label Templates

### HTML-Based Templates

Customize label appearance using HTML templates with placeholders:

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series 
        :dataSource="data" 
        xName="x" 
        yName="y"
        :dataLabel="{ 
          visible: true, 
          template: '<div style=\"background:#bd18f9; border-radius:3px; padding:2px 5px;\"><span style=\"color:white;\">${point.percentage}%</span></div>'
        }">
      </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { x: 'Jan', y: 13 },
        { x: 'Feb', y: 13.5 },
        { x: 'Mar', y: 7 },
        { x: 'Apr', y: 13.5 }
      ]
    };
  }
};
</script>
```

### Template Placeholders

| Placeholder | Value | Example |
|------------|-------|---------|
| `${point.x}` | X value (category) | "Jan" |
| `${point.y}` | Y value (numeric) | "13" |
| `${point.percentage}` | Percentage of total | "25.5" |
| `${series.name}` | Series name | "Sales" (if set) |

### Complex Template Example

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series 
        :dataSource="data" 
        xName="x" 
        yName="y"
        :dataLabel="{ 
          visible: true, 
          position: 'Outside',
          template: `
            <div style="background:#fff; border:1px solid #ccc; border-radius:5px; padding:5px;">
              <strong>\${point.x}</strong><br/>
              Value: \${point.y}<br/>
              <span style="color:#ff6b6b;">\${point.percentage}%</span>
            </div>
          `
        }">
      </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>
```

## Connector Lines

### Connector Line Basics

When using `position: 'Outside'`, connector lines link labels to pie slices. Customize them with `connectorStyle`.

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series 
        :dataSource="data" 
        xName="x" 
        yName="y"
        :dataLabel="{
          visible: true,
          position: 'Outside',
          connectorStyle: {
            color: '#f4429e',
            width: 2,
            length: '50px',
            dashArray: '5,3'
          }
        }">
      </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { x: 'Jan', y: 13, text: 'Jan: 13' },
        { x: 'Feb', y: 13, text: 'Feb: 13' },
        { x: 'Mar', y: 17, text: 'Mar: 17' },
        { x: 'Apr', y: 13.5, text: 'Apr: 13.5' }
      ]
    };
  }
};
</script>
```

### Connector Properties

| Property | Purpose | Example |
|----------|---------|---------|
| `color` | Line color | `'#f4429e'` (pink) |
| `width` | Line thickness in pixels | `2` |
| `length` | Connector length | `'50px'` |
| `dashArray` | Dashed pattern | `'5,3'` (5px dash, 3px gap) |

### Connector Patterns

```javascript
// Solid line
connectorStyle: { width: 2, color: '#333' }

// Dashed line
connectorStyle: { width: 2, color: '#666', dashArray: '5,3' }

// Dotted line
connectorStyle: { width: 2, color: '#999', dashArray: '2,2' }

// Thick colored line
connectorStyle: { width: 4, color: '#ff0000' }
```

## Custom Formatting with Events

### textRender Event

The `textRender` event fires before each label is rendered, allowing runtime customization:

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45" :textRender="onTextRender">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series 
        :dataSource="data" 
        xName="x" 
        yName="y"
        :dataLabel="{ visible: true, position: 'Outside' }">
      </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D, CircularChartDataLabel3D } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-circularchart3d': CircularChart3DComponent,
    'e-circularchart3d-series-collection': CircularChart3DSeriesCollectionDirective,
    'e-circularchart3d-series': CircularChart3DSeriesDirective
  },
  data() {
    return {
      data: [
        { x: 'Jan', y: 13 },
        { x: 'Feb', y: 13 },
        { x: 'Mar', y: 17 },
        { x: 'Apr', y: 13.5 }
      ]
    };
  },
  methods: {
    onTextRender(args) {
      // Customize text color per label
      if (args.text.includes('Mar')) {
        args.color = 'red';
        args.border = { width: 1, color: 'red' };
      }
      // Convert to percentage
      args.text = args.point.percentage + '%';
    }
  },
  provide: {
    circularchart3d: [PieSeries3D, CircularChartDataLabel3D]
  }
};
</script>
```

### textRender Event Properties

| Property | Type | Purpose |
|----------|------|---------|
| `text` | String | Label text (read/write) |
| `color` | String | Text color (read/write) |
| `border` | Object | Border style (read/write) |
| `point` | Object | Data point info (percentage, x, y, etc.) |

### Common textRender Patterns

**Pattern 1: Display Percentages**
```javascript
onTextRender(args) {
  args.text = args.point.percentage.toFixed(1) + '%';
}
```

**Pattern 2: Color-Code by Value**
```javascript
onTextRender(args) {
  if (args.point.y > 20) {
    args.color = 'green';  // High value
  } else if (args.point.y > 10) {
    args.color = 'orange'; // Medium value
  } else {
    args.color = 'red';    // Low value
  }
}
```

**Pattern 3: Format with Units**
```javascript
onTextRender(args) {
  args.text = `${args.point.x}: $${args.point.y}K`;
}
```

## Summary Table

| Task | Property/Event | Code |
|------|---|---|
| Enable labels | `dataLabel.visible` | `:dataLabel="{ visible: true }"` |
| Position labels | `dataLabel.position` | `:dataLabel="{ position: 'Outside' }"` |
| Format numbers | `dataLabel.format` | `:dataLabel="{ format: 'n2' }"` |
| Custom text | `dataLabel.name` | `:dataLabel="{ name: 'text' }"` |
| HTML templates | `dataLabel.template` | `:dataLabel="{ template: '<div>...\${point.y}...</div>' }"` |
| Connector lines | `dataLabel.connectorStyle` | `:dataLabel="{ connectorStyle: { color: '#f4429e' } }"` |
| Runtime formatting | `textRender` event | `:textRender="onTextRender"` + method |
