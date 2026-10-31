# Legend and Tooltips in HeatMap

## Table of Contents
- [Legend Overview](#legend-overview)
- [Enabling Legend](#enabling-legend)
  - [Basic Legend Setup](#basic-legend-setup)
  - [Module Injection Requirement](#module-injection-requirement)
- [Legend Configuration](#legend-configuration)
  - [Full Legend Settings Example](#full-legend-settings-example)
  - [Legend Settings Properties](#legend-settings-properties)
- [Legend Positioning](#legend-positioning)
  - [Right Position](#right-position-default)
  - [Bottom Position](#bottom-position)
  - [Top Position](#top-position)
  - [Left Position](#left-position)
  - [Responsive Positioning](#responsive-positioning)
- [Tooltip Feature](#tooltip-feature)
  - [Tooltip Overview](#tooltip-overview)
  - [Enabling Tooltips](#enabling-tooltips)
- [Tooltip Customization](#tooltip-customization)
  - [Disabling Tooltips](#disabling-tooltips)
  - [Tooltip Module Requirement](#tooltip-module-requirement)
  - [Default Tooltip Content](#default-tooltip-content)
  - [Complete Legend and Tooltip Example](#complete-legend-and-tooltip-example)

## Legend Overview

A legend displays the color-to-value mapping for your HeatMap, helping users interpret the visualization. It shows:
- Color gradients or color steps
- Value ranges associated with each color
- Labels indicating what data ranges represent

The legend is essential for understanding what the colors in your HeatMap represent.

## Enabling Legend

### Basic Legend Setup

Enable the legend by setting `visible: true` in `legendSettings`:

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap" 
      :dataSource='dataSource'
      :xAxis='xAxis'
      :yAxis='yAxis'
      :legendSettings='legendSettings'>
    </ejs-heatmap>
  </div>
</template>

<script>
import { HeatMapComponent, Legend, Tooltip } from '@syncfusion/ej2-vue-heatmap';

export default {
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function () {
    return {
      legendSettings: {
        visible: true
      },
      xAxis: {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael']
      },
      yAxis: {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
      },
      dataSource: [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79]
      ]
    }
  },
  provide: {
    heatmap: [Legend, Tooltip]
  }
}
</script>
```

**Important:** You must inject the `Legend` module in the `provide` option for the legend to display.

### Module Injection Requirement

Without module injection, the legend won't render even if `visible: true`:

```javascript
// ✅ Correct
provide: {
  heatmap: [Legend, Tooltip]
}

// ❌ Incorrect - legend won't show
data() { return { } }
// No provide option
```

## Legend Configuration

### Full Legend Settings Example

```vue
<script>
import { HeatMapComponent, Legend, Tooltip } from '@syncfusion/ej2-vue-heatmap';

export default {
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function () {
    return {
      legendSettings: {
        visible: true,           // Show/hide legend
        position: 'Right',       // Position (Right, Bottom, Top, Left)
        showLabel: true,         // Show value labels in legend
        height: '150',           // Legend height in pixels
        width: '50',             // Legend width in pixels
        labelPosition: 'After'   // Label position (After, Before)
      },
      xAxis: {
        labels: ['A', 'B', 'C', 'D', 'E', 'F']
      },
      yAxis: {
        labels: ['1', '2', '3', '4', '5', '6']
      },
      dataSource: [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79]
      ]
    }
  },
  provide: {
    heatmap: [Legend, Tooltip]
  }
}
</script>
```

### Legend Settings Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `visible` | Boolean | false | Show/hide legend |
| `position` | String | 'Right' | Legend location (Right, Bottom, Top, Left) |
| `showLabel` | Boolean | true | Display value labels |
| `height` | String | 'auto' | Legend height in pixels |
| `width` | String | 'auto' | Legend width in pixels |
| `labelPosition` | String | 'After' | Label placement (After, Before) |

## Legend Positioning

### Right Position (Default)

```javascript
legendSettings: {
  visible: true,
  position: 'Right',
  height: '150'
}
```

Legend displays vertically on the right side of the HeatMap.

### Bottom Position

```javascript
legendSettings: {
  visible: true,
  position: 'Bottom',
  width: '300'
}
```

Legend displays horizontally below the HeatMap.

### Top Position

```javascript
legendSettings: {
  visible: true,
  position: 'Top',
  width: '300'
}
```

Legend displays horizontally above the HeatMap.

### Left Position

```javascript
legendSettings: {
  visible: true,
  position: 'Left',
  height: '150'
}
```

Legend displays vertically on the left side of the HeatMap.

### Responsive Positioning

```vue
<script>
export default {
  data: function () {
    return {
      legendSettings: {
        visible: true,
        position: this.isSmallScreen ? 'Bottom' : 'Right',
        height: this.isSmallScreen ? '100' : '150',
        width: this.isSmallScreen ? '200' : '50'
      }
    }
  },
  computed: {
    isSmallScreen: function() {
      return window.innerWidth < 768;
    }
  }
}
</script>
```

## Tooltip Feature

### Tooltip Overview

Tooltips display additional information when users hover over HeatMap cells:
- Current cell value
- Row and column labels
- Custom formatted information

Tooltips are useful when space constraints prevent showing all data directly.

### Enabling Tooltips

Enable tooltips by setting `showTooltip: true`:

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap" 
      :dataSource='dataSource'
      :xAxis='xAxis'
      :yAxis='yAxis'
      :titleSettings='titleSettings'
      :legendSettings='legendSettings'
      :cellSettings='cellSettings'
      :showTooltip='showTooltip'>
    </ejs-heatmap>
  </div>
</template>

<script>
import { HeatMapComponent, Tooltip, Legend } from '@syncfusion/ej2-vue-heatmap';

export default {
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function () {
    return {
      showTooltip: true,  // Enable tooltips
      titleSettings: {
        text: 'Sales Revenue per Employee'
      },
      cellSettings: {
        showLabel: true
      },
      xAxis: {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael']
      },
      yAxis: {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
      },
      legendSettings: {
        visible: true,
        position: 'Right'
      },
      dataSource: [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79]
      ]
    }
  },
  provide: {
    heatmap: [Tooltip, Legend]
  }
}
</script>
```

**Important:** You must inject the `Tooltip` module in the `provide` option.

## Tooltip Customization

### Disabling Tooltips

```javascript
showTooltip: false  // Disable tooltips
```

### Tooltip Module Requirement

The `Tooltip` module must be injected for tooltips to work:

```javascript
provide: {
  heatmap: [Tooltip, Legend]  // ✅ Correct
}

// ❌ Incorrect - tooltips won't show
provide: {
  heatmap: [Legend]  // Missing Tooltip
}
```

### Default Tooltip Content

By default, tooltips display:
- Row label (from yAxis labels)
- Column label (from xAxis labels)
- Cell value

```
Nancy, Mon, 73
```

### Complete Legend and Tooltip Example

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap"
      :dataSource='dataSource'
      :xAxis='xAxis'
      :yAxis='yAxis'
      :titleSettings='titleSettings'
      :cellSettings='cellSettings'
      :legendSettings='legendSettings'
      :showTooltip='showTooltip'>
    </ejs-heatmap>
  </div>
</template>

<script>
import { HeatMapComponent, Legend, Tooltip } from '@syncfusion/ej2-vue-heatmap';

export default {
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function () {
    return {
      showTooltip: true,
      titleSettings: {
        text: 'Employee Sales Performance (in 1000 US$)',
        textStyle: {
          size: '15px',
          fontWeight: '500'
        }
      },
      cellSettings: {
        showLabel: true,
        border: {
          width: 1,
          radius: 4,
          color: 'white'
        }
      },
      xAxis: {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael'],
        labelStyle: {
          size: '12px'
        }
      },
      yAxis: {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        labelStyle: {
          size: '12px'
        }
      },
      legendSettings: {
        visible: true,
        position: 'Right',
        showLabel: true,
        height: '150'
      },
      dataSource: [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79]
      ]
    }
  },
  provide: {
    heatmap: [Legend, Tooltip]
  }
}
</script>
```

This example combines:
- Legend on the right with value labels
- Tooltips on cell hover
- Cell labels showing values
- Professional title and formatting

The legend helps users interpret colors, while tooltips provide additional details on demand.
