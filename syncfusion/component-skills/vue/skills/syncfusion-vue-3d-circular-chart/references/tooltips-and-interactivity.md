# Tooltips & Interactivity

## Table of Contents
- [Tooltips Basics](#tooltips-basics)
- [Tooltip Customization](#tooltip-customization)
- [Custom Tooltip Templates](#custom-tooltip-templates)
- [Point Selection & Events](#point-selection--events)
- [Point Render Customization](#point-render-customization)

## Tooltips Basics

### Enabling Tooltips

Tooltips display information when hovering over pie segments. Enable them via the `tooltip` property:

```vue
<template>
  <div id="app">
    <ejs-circularchart3d id="container" :tilt="-45" :tooltip="tooltip">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D, CircularChartTooltip3D } from '@syncfusion/ej2-vue-charts';

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
      ],
      tooltip: { enable: true }  // Enable tooltips
    };
  },
  provide: {
    circularchart3d: [PieSeries3D, CircularChartTooltip3D]  // ⚠️ REQUIRED!
  }
};
</script>

<style>
#container { height: 350px; }
</style>
```

**Important:** Always provide `CircularChartTooltip3D` module when using tooltips.

### Default Tooltip Behavior

By default, the tooltip shows:
- **Format:** "Category: Value" (e.g., "Jan: 13")
- **Appearance:** Light background with dark text
- **Trigger:** Mouse hover
- **Delay:** Shows after ~500ms of hovering

## Tooltip Customization

### Custom Tooltip Format

The `format` property uses placeholders to customize tooltip content:

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45" :tooltip="tooltip">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  data() {
    return {
      data: [...],
      tooltip: {
        enable: true,
        format: '${point.x}: ${point.y} units'
      }
    };
  }
};
</script>
```

#### Inline tooltip formatting

The tooltip content can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows you to control how point and series values are displayed without using additional events.

A format specifier can be applied to a tooltip token by adding a colon (`:`) followed by the required format.

For example:

```vue
<template>
  <div id="app">
    <ejs-circularchart3d
      id="container"
      :tilt="-45"
      :tooltip="tooltip">
      <e-circularchart3d-series-collection>
        <e-circularchart3d-series
          :dataSource="data"
          xName="x"
          yName="y"
          name="Sales"
          :opacity="0.8">
        </e-circularchart3d-series>
      </e-circularchart3d-series-collection>
    </ejs-circularchart3d>
  </div>
</template>

<script>
import {
  CircularChart3DComponent,
  CircularChart3DSeriesCollectionDirective,
  CircularChart3DSeriesDirective,
  PieSeries3D,
  CircularChartTooltip3D
} from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-circularchart3d': CircularChart3DComponent,
    'e-circularchart3d-series-collection':
      CircularChart3DSeriesCollectionDirective,
    'e-circularchart3d-series':
      CircularChart3DSeriesDirective
  },
  data() {
    return {
      data: [
        { x: 'Jan', y: 13 },
        { x: 'Feb', y: 13 },
        { x: 'Mar', y: 17 },
        { x: 'Apr', y: 13.5 }
      ],
      tooltip: {
        enable: true,
        format:
          '${series.name}<br>' +
          '${point.x}: ${point.y:n2}<br>' +
          'Share: ${point.percentage:n1}%<br>' +
          'Opacity: ${series.opacity}'
      }
    };
  },
  provide: {
    circularchart3d: [
      PieSeries3D,
      CircularChartTooltip3D
    ]
  }
};
</script>

<style>
#container {
  height: 350px;
}
</style>
```

In the above example, `point.y` is displayed with two decimal places, `point.percentage` is displayed with one decimal place, and `series.opacity` displays the opacity value applied to the series.

Inline formatting can be applied to the following tooltip tokens:

- `point.x`: Specifies the x-value of the data point, such as a DateTime or category value.
- `point.y`: Specifies the numeric y-value of the data point.
- `point.percentage`: Specifies the percentage contribution of the point to the total.
- `series.opacity`: Specifies the opacity applied to the series. This value controls the visual transparency of the series and can be customized in the series configuration.

> **Important:** The availability of point-specific tokens depends on the values configured in the data source and the Circular 3D Chart series type. Tokens that resolve to string values, such as `series.name`, do not support DateTime or number formatting.

The following format types are supported:

**DateTime formats:**

- `MMM yyyy`: Displays the abbreviated month and four-digit year.
- `MM:yy`: Displays the two-digit month and year.
- `dd MMM`: Displays the two-digit day and abbreviated month.

**Number formats:**

- `n2`: Displays a number with two decimal places.
- `n0`: Displays a number without decimal places.
- `c2`: Displays the value in currency format with two decimal places.
- `p1`: Displays the value in percentage format with one decimal place.
- `e1`: Displays the value in exponential notation with one decimal place.

If the specified format does not match the resolved value type, the original value is displayed.

### Tooltip Format Placeholders

| Placeholder | Value | Example |
|-------------|-------|---------|
| `${point.x}` | X value (category) | "Jan" |
| `${point.y}` | Y value (numeric) | "13" |
| `${point.percentage}` | Percentage of total | "25.5%" |
| `${series.name}` | Series name | "Sales" (if set) |
| `${point.text}` | Custom text field | From data.text |

### Header & Footer

```vue
<template>
  <ejs-circularchart3d id="container" :tooltip="tooltip">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  data() {
    return {
      tooltip: {
        enable: true,
        header: 'Sales Data',
        format: '${point.x}: ${point.y}',
        footer: 'Click to see details'
      }
    };
  }
};
</script>
```

### Tooltip Styling

```javascript
tooltip: {
  enable: true,
  format: '${point.x}: ${point.y}',
  textStyle: {
    color: '#fff',      // Text color
    fontFamily: 'Arial',
    size: '14px',
    fontWeight: 'bold'
  },
  areaBorder: {
    color: '#333',      // Border color
    width: 2
  },
  background: '#333'    // Background color
}
```

### Tooltip Position

```javascript
tooltip: {
  enable: true,
  position: 'Top'  // Top, Bottom, Left, Right, Center
}
```

## Custom Tooltip Templates

### HTML-Based Templates

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45" :tooltip="tooltip">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  data() {
    return {
      data: [...],
      tooltip: {
        enable: true,
        template: '<div style="padding:10px;"><strong>${point.x}</strong><br/>Sales: ${point.y}<br/>Share: ${point.percentage}%</div>'
      }
    };
  }
};
</script>
```

### Rich Tooltip with Images

```javascript
tooltip: {
  enable: true,
  template: `
    <div style="padding:10px; background:#fff; border:1px solid #ccc; border-radius:5px;">
      <div style="display:flex; gap:10px;">
        <img src="icon-${point.x}.png" style="width:40px; height:40px;"/>
        <div>
          <strong style="font-size:14px;">${point.x}</strong><br/>
          <span style="color:#666;">Value: ${point.y}</span><br/>
          <span style="color:#0066cc; font-weight:bold;">${point.percentage}% of total</span>
        </div>
      </div>
    </div>
  `
}
```

### Dynamic Tooltip Templates

```vue
<template>
  <ejs-circularchart3d id="container" :tooltip="tooltip">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { x: 'Q1', y: 35, trend: 'up' },
        { x: 'Q2', y: 28, trend: 'down' },
        { x: 'Q3', y: 34, trend: 'up' },
        { x: 'Q4', y: 46, trend: 'up' }
      ],
      tooltip: {
        enable: true,
        template: this.getTooltipTemplate
      }
    };
  },
  methods: {
    getTooltipTemplate(args) {
      const point = args.point;
      const icon = point.trend === 'up' ? '📈' : '📉';
      return `
        <div style="padding:10px;">
          <strong>${point.x} ${icon}</strong><br/>
          Value: ${point.y}<br/>
          <span style="color:${point.trend === 'up' ? 'green' : 'red'};">
            Trend: ${point.trend}
          </span>
        </div>
      `;
    }
  }
};
</script>
```

## Point Selection & Events

### Responding to Point Clicks

Use the `pointRender` event to react to user interactions:

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45" :pointRender="onPointRender">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
import { CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, PieSeries3D } from '@syncfusion/ej2-vue-charts';

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
      ],
      selectedPoints: new Set()
    };
  },
  methods: {
    onPointRender(args) {
      // Called for each point during rendering
      console.log('Point rendered:', args.point.x, args.point.y);
      
      // Track selected points
      if (this.selectedPoints.has(args.point.x)) {
        args.fill = '#FFD700';  // Highlight selected
      }
    }
  },
  provide: {
    circularchart3d: [PieSeries3D]
  }
};
</script>
```

### Chart Click Events

```vue
<template>
  <ejs-circularchart3d id="container" @pointRender="onPointRender" @chartMouseClick="onChartClick">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  methods: {
    onChartClick(args) {
      if (args.point) {
        console.log('Clicked on:', args.point.x);
        this.$emit('segmentSelected', args.point);
      } else {
        console.log('Clicked on background');
      }
    }
  }
};
</script>
```

## Point Render Customization

### Highlight Specific Points

```vue
<template>
  <ejs-circularchart3d id="container" :tilt="-45" :pointRender="onPointRender">
    <e-circularchart3d-series-collection>
      <e-circularchart3d-series :dataSource="data" xName="x" yName="y"></e-circularchart3d-series>
    </e-circularchart3d-series-collection>
  </ejs-circularchart3d>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { x: 'Jan', y: 13 },
        { x: 'Feb', y: 13 },
        { x: 'Mar', y: 17 },      // Highest value - highlight
        { x: 'Apr', y: 13.5 }
      ]
    };
  },
  methods: {
    onPointRender(args) {
      // Highlight highest value
      if (args.point.y === 17) {
        args.fill = '#FFD700';     // Gold
        args.border = { width: 2, color: '#FF6B6B' };
      }
      
      // Color code by range
      else if (args.point.y > 13) {
        args.fill = '#4CAF50';     // Green - high
      } else {
        args.fill = '#FFC107';     // Amber - normal
      }
    }
  }
};
</script>
```

### Dynamic Borders & Effects

```javascript
onPointRender(args) {
  // Add 3D effect with borders
  args.border = {
    width: 2,
    color: 'rgba(0,0,0,0.3)'
  };
  
  // Add shadow effect (via fill opacity)
  if (args.point.y < 15) {
    args.fill = 'rgba(100,150,255,0.8)';  // Semi-transparent
  }
}
```

### Pattern-Based Customization

```javascript
onPointRender(args) {
  const value = args.point.y;
  
  // Apply different styles based on value ranges
  if (value > 16) {
    args.fill = '#2E7D32';  // Dark green (highest)
    args.border = { width: 3, color: '#66BB6A' };
  } else if (value > 13) {
    args.fill = '#558B2F';  // Light green (high)
    args.border = { width: 2, color: '#9CCC65' };
  } else {
    args.fill = '#F57C00';  // Orange (normal)
    args.border = { width: 1, color: '#FFA726' };
  }
}
```

### Conditional Styling with Data Properties

```javascript
// Data with additional properties
data: [
  { x: 'Jan', y: 13, status: 'success' },
  { x: 'Feb', y: 13, status: 'warning' },
  { x: 'Mar', y: 17, status: 'success' },
  { x: 'Apr', y: 8, status: 'error' }
]

// Use in pointRender
onPointRender(args) {
  const statusColors = {
    'success': '#4CAF50',
    'warning': '#FFC107',
    'error': '#F44336'
  };
  
  args.fill = statusColors[args.point.status] || '#999';
}
```

## Interactive Features Summary

| Feature | Property/Event | Code |
|---------|---|---|
| Show tooltips | `tooltip.enable` | `:tooltip="{ enable: true }"` |
| Tooltip format | `tooltip.format` | `format: '${point.x}: ${point.y}'` |
| Tooltip styling | `tooltip.textStyle` | `textStyle: { color: '#fff' }` |
| Custom template | `tooltip.template` | `template: '<div>...</div>'` |
| Point customization | `pointRender` event | `@pointRender="onPointRender"` |
| Click handling | `chartMouseClick` | `@chartMouseClick="onClick"` |
| Highlight points | In `pointRender` | `args.fill = '#color'` |
| Add borders | In `pointRender` | `args.border = { width: 2 }` |

## Best Practices

1. **Always provide modules:** Don't forget `CircularChartTooltip3D` when using tooltips
2. **Keep templates light:** Heavy HTML in templates can slow down rendering
3. **Test on mobile:** Tooltips work differently on touch devices; consider adding click events
4. **Accessibility:** Use `textStyle` to ensure sufficient contrast for readability
5. **Performance:** Avoid expensive computations in `pointRender` (called during every render)

## Next Steps

- **Advanced features:** See [references/advanced-features.md](../advanced-features.md)
- **Data formatting:** See [references/data-labels.md](../data-labels.md)
