# Data Labels Configuration

## Table of Contents
- [Enable Data Labels](#enable-data-labels)
  - [Basic Data Labels](#basic-data-labels)
  - [Hiding Data Labels](#hiding-data-labels)
- [Positioning](#positioning)
  - [Inside Positioning](#inside-positioning)
  - [Outside Positioning](#outside-positioning)
- [Label Formatting](#label-formatting)
  - [Number Formatting](#number-formatting)
  - [Using Text Mapping](#using-text-mapping)
- [Smart Labels](#smart-labels)
  - [Enable Smart Labels](#enable-smart-labels)
  - [How Smart Labels Work](#how-smart-labels-work)
- [Connector Lines](#connector-lines)
  - [Basic Connector Line](#basic-connector-line)
  - [Curved Connector Lines](#curved-connector-lines)
  - [Complete Example with Connectors](#complete-example-with-connectors)
  - [Connector Properties](#connector-properties)
- [Template-Based Labels](#template-based-labels)
  - [Basic Template](#basic-template)
  - [Template with Icon and Styling](#template-with-icon-and-styling)
  - [Template Placeholders](#template-placeholders)
- [Display Percentages](#display-percentages)
  - [Using Format](#using-format)
  - [Using textRender Event](#using-textrender-event)
  - [Using Template](#using-template)
- [Label Rotation](#label-rotation)
  - [Enable Rotation](#enable-rotation)
  - [Example: Rotated Outside Labels](#example-rotated-outside-labels)
- [Text Wrapping](#text-wrapping)
  - [Enable Text Wrapping](#enable-text-wrapping)
  - [Wrap Options](#wrap-options)
  - [Example: Wrapped Labels](#example-wrapped-labels)
- [Events and Rendering](#events-and-rendering)
  - [textRender Event](#textrender-event)
  - [Event Arguments](#event-arguments)
- [Complete Example: Advanced Data Labels](#complete-example-advanced-data-labels)
- [Next Steps](#next-steps)
  - [Configure legend](#configure-legend)
  - [Add interactivity](#add-interactivity)
  - [Ensure accessibility](#ensure-accessibility)

---

## Enable Data Labels

Data labels display information about each data point on the chart.

### Basic Data Labels

```vue
<template>
  <ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        :dataLabel="dataLabel">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries, AccumulationDataLabel } from "@syncfusion/ej2-vue-charts"

export default {
  name: "App",
  components: {
    'ejs-accumulationchart': AccumulationChartComponent,
    'e-accumulation-series-collection': AccumulationSeriesCollectionDirective,
    'e-accumulation-series': AccumulationSeriesDirective
  },
  data() {
    return {
      seriesData: [
        { x: 'Jan', y: 35, text: 'January: 35' },
        { x: 'Feb', y: 28, text: 'February: 28' },
        { x: 'Mar', y: 34, text: 'March: 34' },
        { x: 'Apr', y: 32, text: 'April: 32' }
      ],
      dataLabel: {
        visible: true,
        name: 'text'  // Maps to 'text' property in data
      }
    }
  },
  provide: {
    accumulationchart: [PieSeries, AccumulationDataLabel]
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

**Key Points:**
- Import `AccumulationDataLabel` module
- Add to `provide` option
- `visible: true` enables labels
- `name` property specifies which data field to display

### Hiding Data Labels

```vue
dataLabel: {
  visible: false  // Disable labels
}
```

---

## Positioning

Control where labels appear relative to data points.

### Inside Positioning

Labels display inside chart slices:

```vue
dataLabel: {
  visible: true,
  position: 'Inside',
  name: 'text'
}
```

**Use case:** Abundant space in large slices

### Outside Positioning

Labels display outside chart with connector lines:

```vue
dataLabel: {
  visible: true,
  position: 'Outside',
  name: 'text',
  connectorStyle: {
    type: 'Line',
    length: '50px'
  }
}
```

---

## Label Formatting

Format label content using format strings and custom functions.

### Number Formatting

```vue
dataLabel: {
  visible: true,
  format: 'n2'  // 2 decimal places
}
```

**Format Codes:**
| Code | Example | Description |
|------|---------|-------------|
| `n1` | 1000.0 | Number with 1 decimal |
| `n2` | 1000.00 | Number with 2 decimals |
| `n3` | 1000.000 | Number with 3 decimals |
| `p1` | 1.0% | Percentage with 1 decimal |
| `p2` | 1.00% | Percentage with 2 decimals |
| `c1` | $1000.0 | Currency with 1 decimal |
| `c2` | $1000.00 | Currency with 2 decimals |

### Using Text Mapping

```vue
<template>
  <ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        :dataLabel="dataLabel">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37, label: 'Chrome: 37M users' },
        { x: 'Firefox', y: 28, label: 'Firefox: 28M users' },
        { x: 'Safari', y: 19, label: 'Safari: 19M users' }
      ],
      dataLabel: {
        visible: true,
        name: 'label'  // Display custom label field
      }
    }
  }
}
</script>
```

---

## Smart Labels

Automatically arrange labels to prevent overlapping.

### Enable Smart Labels

```vue
<template>
  <ejs-accumulationchart id="container" enableSmartLabels="true">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        :dataLabel="dataLabel">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'A', y: 10 },
        { x: 'B', y: 12 },
        { x: 'C', y: 8 },
        { x: 'D', y: 9 },
        { x: 'E', y: 11 }
      ],
      dataLabel: {
        visible: true,
        position: 'Outside'
      }
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

**How Smart Labels Work:**
- Detects label overlap
- Automatically repositions labels
- Adds connector lines if needed
- Optimizes for readability

---

## Connector Lines

Connect outside labels to their data points with connector lines.

### Basic Connector Line

```vue
dataLabel: {
  visible: true,
  position: 'Outside',
  connectorStyle: {
    type: 'Line',
    length: '50px',
    width: 2,
    color: '#333'
  }
}
```

### Curved Connector Lines

```vue
connectorStyle: {
  type: 'Curve',  // Smooth curves
  length: '50px',
  width: 2,
  color: '#ff6ea6',
  dashArray: '5,3'  // Dashed line
}
```

### Complete Example with Connectors

```vue
<template>
  <ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        :dataLabel="dataLabel">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37, text: 'Chrome' },
        { x: 'Firefox', y: 28, text: 'Firefox' },
        { x: 'Safari', y: 19, text: 'Safari' },
        { x: 'Others', y: 16, text: 'Others' }
      ],
      dataLabel: {
        visible: true,
        position: 'Outside',
        name: 'text',
        connectorStyle: {
          type: 'Curve',
          length: '40px',
          width: 2,
          color: '#f4429e'
        }
      }
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

**Connector Properties:**
- `type`: 'Line' or 'Curve'
- `length`: Connector extension (pixels)
- `width`: Line width
- `color`: Line color
- `dashArray`: Pattern (e.g., '5,3' for dashed)

---

## Template-Based Labels

Use HTML templates for rich, customizable labels.

### Basic Template

```vue
<template>
  <ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        :dataLabel="dataLabel">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37 },
        { x: 'Firefox', y: 28 },
        { x: 'Safari', y: 19 }
      ],
      dataLabel: {
        visible: true,
        template: '<div style="font-weight:bold;color:#333">${point.x}: ${point.y}%</div>'
      }
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

### Template with Icon and Styling

```vue
dataLabel: {
  visible: true,
  position: 'Outside',
  template: `
    <div style="display:flex;align-items:center;gap:8px;padding:4px;background:#f0f0f0;border-radius:4px;">
      <span style="font-weight:bold;">\${point.x}</span>
      <span style="color:#666;">\${point.y}M</span>
    </div>
  `
}
```

**Template Placeholders:**
- `${point.x}` - Category name
- `${point.y}` - Value
- `${point.percentage}` - Percentage
- Custom data properties accessible via `${point.propertyName}`

---

## Display Percentages

Show percentage values instead of raw numbers.

### Using Format

```vue
dataLabel: {
  visible: true,
  format: 'p0'  // Percentage with no decimals
}
```

### Using textRender Event

```vue
<template>
  <ejs-accumulationchart id="container" :textRender="onTextRender">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        :dataLabel="dataLabel">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37 },
        { x: 'Firefox', y: 28 },
        { x: 'Safari', y: 19 },
        { x: 'Others', y: 16 }
      ],
      dataLabel: {
        visible: true
      }
    }
  },
  methods: {
    onTextRender: function (args) {
      args.text = args.point.percentage.toFixed(1) + '%'
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

### Using Template

```vue
dataLabel: {
  visible: true,
  template: '<div>${point.percentage}%</div>'
}
```

---

## Label Rotation

Rotate labels to match data point angles.

### Enable Rotation

```vue
dataLabel: {
  visible: true,
  position: 'Outside',
  angle: 45,
  enableRotation: true
}
```

**Properties:**
- `angle`: Rotation degrees (0-360)
- `enableRotation`: Enable/disable rotation

### Example: Rotated Outside Labels

```vue
<script>
export default {
  data() {
    return {
      dataLabel: {
        visible: true,
        position: 'Outside',
        enableRotation: true,
        angle: 50
      }
    }
  }
}
</script>
```

---

## Text Wrapping

Wrap long labels to multiple lines.

### Enable Text Wrapping

```vue
dataLabel: {
  visible: true,
  position: 'Inside',
  name: 'text',
  textWrap: 'Wrap',
  maxWidth: 80  // Max width in pixels
}
```

**Wrap Options:**
- `'Wrap'` - Specifies to break a word once it is too long to fit on a line by itself
- `'Normal'` - Specifies to break words only at allowed break points
- `'AnyWhere'` - Specifies to break a word at any point if there are no otherwise-acceptable break points in the line

### Example: Wrapped Labels

```vue
<template>
  <ejs-accumulationchart id="container" enableSmartLabels="true">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="category" 
        yName="value"
        startAngle="270"
        endAngle="90"
        innerRadius="40%"
        :dataLabel="dataLabel">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { category: 'Very Long Category Name A', value: 25 },
        { category: 'Very Long Category Name B', value: 30 },
        { category: 'Very Long Category Name C', value: 45 }
      ],
      dataLabel: {
        visible: true,
        position: 'Inside',
        maxWidth: 60,
        textWrap: 'Wrap',
        name: 'category',
        enableRotation: true
      }
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

---

## Events and Rendering

Customize labels dynamically using events.

### textRender Event

Called before each label renders, allowing customization:

```vue
<template>
  <ejs-accumulationchart id="container" :textRender="onTextRender">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        :dataLabel="dataLabel">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'January', y: 15 },
        { x: 'February', y: 18 },
        { x: 'March', y: 35 }
      ],
      dataLabel: {
        visible: true,
        name: 'x'
      }
    }
  },
  methods: {
    onTextRender: function (args) {
      // Change text color for values > 20
      if (Number(args.point.y) > 20) {
        args.color = 'red'
        args.text = args.text.toUpperCase()
      }
      
      // Add prefix/suffix
      args.text = args.text + ' (' + args.point.y + ')'
    }
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

### Event Arguments

```vue
args.text           // Label text (modifiable)
args.color          // Label color (modifiable)
args.border         // Border configuration (modifiable)
args.point          // Data point object
args.point.x        // Category name
args.point.y        // Value
args.point.percentage  // Percentage (0-100)
```

---

## Complete Example: Advanced Data Labels

```vue
<template>
  <ejs-accumulationchart id="container" enableSmartLabels="true" :textRender="onTextRender">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="browserData" 
        xName="browser" 
        yName="users"
        :radius="radius"
        innerRadius="20%"
        :dataLabel="dataLabel">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries, AccumulationDataLabel } from "@syncfusion/ej2-vue-charts"

export default {
  name: "App",
  components: {
    'ejs-accumulationchart': AccumulationChartComponent,
    'e-accumulation-series-collection': AccumulationSeriesCollectionDirective,
    'e-accumulation-series': AccumulationSeriesDirective
  },
  data() {
    return {
      browserData: [
        { browser: 'Chrome', users: 45, color: '#498fff' },
        { browser: 'Firefox', users: 32, color: '#ffa060' },
        { browser: 'Safari', users: 18, color: '#ff68b6' },
        { browser: 'Edge', users: 5, color: '#81e2a1' }
      ],
      radius: '70%',
      dataLabel: {
        visible: true,
        position: 'Outside',
        connectorStyle: {
          type: 'Curve',
          length: '40px',
          width: 2
        }
      }
    }
  },
  methods: {
    onTextRender: function (args) {
      args.text = args.point.x + ': ' + args.point.y + 'M'
      
      if (Number(args.point.y) > 30) {
        args.color = '#333'
        args.border = { width: 1, color: '#498fff' }
      }
    }
  },
  provide: {
    accumulationchart: [PieSeries, AccumulationDataLabel]
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

---

## Next Steps

- Configure legend in [legend-configuration.md](./legend-configuration.md)
- Add interactivity in [advanced-features.md](./advanced-features.md)
- Ensure accessibility in [accessibility.md](./accessibility.md)
