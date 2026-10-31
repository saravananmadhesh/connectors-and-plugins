# Appearance and Styling in HeatMap

## Table of Contents
- [Title Settings](#title-settings)
  - [Adding a Title](#adding-a-title)
  - [Title Style Properties](#title-style-properties)
  - [Multi-line Titles](#multi-line-titles)
- [Cell Customization](#cell-customization)
  - [Basic Cell Settings](#basic-cell-settings)
  - [Cell Content Options](#cell-content-options)
- [Cell Border Styling](#cell-border-styling)
  - [Border Properties](#border-properties)
  - [Border Styling Examples](#border-styling-examples)
- [Cell Labels](#cell-labels)
  - [Displaying Values](#displaying-values)
  - [Label Visibility Options](#label-visibility-options)
- [Rendering Modes](#rendering-modes)
  - [SVG vs Canvas Rendering](#svg-vs-canvas-rendering)
  - [Automatic Mode Detection](#automatic-mode-detection)
  - [Performance Considerations](#performance-considerations)
  - [Complete Styling Example](#complete-styling-example)

## Title Settings

### Adding a Title

Include a title on the HeatMap using the `titleSettings` property:

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap" 
      :dataSource='dataSource' 
      :xAxis='xAxis' 
      :yAxis='yAxis'
      :titleSettings='titleSettings'>
    </ejs-heatmap>
  </div>
</template>

<script>
import { HeatMapComponent } from '@syncfusion/ej2-vue-heatmap';

export default {
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function () {
    return {
      titleSettings: {
        text: 'Sales Revenue per Employee (in 1000 US$)',
        textStyle: {
          size: '15px',
          fontWeight: '500',
          fontStyle: 'Normal',
          fontFamily: 'Segoe UI'
        }
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
  }
}
</script>
```

### Title Style Properties

```javascript
titleSettings: {
  text: 'Your Title Here',
  textStyle: {
    size: '15px',           // Font size
    fontWeight: '500',      // Font weight (normal, bold, 500, 700)
    fontStyle: 'Normal',    // Text style (Normal, Italic, Oblique)
    fontFamily: 'Segoe UI', // Font family
    color: '#000000'        // Text color (optional)
  },
  alignment: 'Center'       // Alignment (Left, Center, Right)
}
```

### Multi-line Titles

For longer titles, wrap text across lines:

```javascript
titleSettings: {
  text: 'Sales Revenue per Employee\n(in 1000 US$)\nYear 2024',
  textStyle: {
    size: '16px',
    fontWeight: '600'
  }
}
```

## Cell Customization

### Basic Cell Settings

Customize cell appearance using `cellSettings`:

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap" 
      :dataSource='dataSource' 
      :xAxis='xAxis' 
      :yAxis='yAxis'
      :cellSettings='cellSettings'>
    </ejs-heatmap>
  </div>
</template>

<script>
import { HeatMapComponent } from '@syncfusion/ej2-vue-heatmap';

export default {
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function () {
    return {
      cellSettings: {
        showLabel: true,   // Display values in cells
        border: {
          width: 1,
          radius: 4,
          color: 'white'
        }
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
  }
}
</script>
```

### Cell Content Options

Control what displays in cells:

```javascript
cellSettings: {
  showLabel: true,    // Show cell values
  border: {
    width: 1,
    radius: 4,
    color: 'white'
  }
}
```

Setting `showLabel: true` displays numerical values inside each cell.

## Cell Border Styling

### Border Properties

Customize borders around cells:

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap" 
      :titleSettings='titleSettings'
      :cellSettings='cellSettings' 
      :xAxis='xAxis'
      :yAxis='yAxis'
      :dataSource='dataSource'>
    </ejs-heatmap>
  </div>
</template>

<script>
import { HeatMapComponent } from '@syncfusion/ej2-vue-heatmap';

export default {
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function () {
    return {
      titleSettings: {
        text: 'Employee Sales Data'
      },
      cellSettings: {
        border: {
          width: 1,       // Border line width in pixels
          radius: 4,      // Corner radius for rounded borders
          color: 'white'  // Border line color
        }
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
  }
}
</script>
```

### Border Styling Examples

**Subtle borders:**
```javascript
border: {
  width: 0.5,
  radius: 0,
  color: '#e0e0e0'
}
```

**Bold borders:**
```javascript
border: {
  width: 2,
  radius: 6,
  color: '#333333'
}
```

**Rounded cells:**
```javascript
border: {
  width: 1,
  radius: 8,
  color: '#ffffff'
}
```

## Cell Labels

### Displaying Values

Enable cell labels to show numerical values:

```vue
<script>
import { HeatMapComponent } from '@syncfusion/ej2-vue-heatmap';

export default {
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function() {
    return {
      cellSettings: {
        showLabel: true
      },
      xAxis: {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael'],
      },
      yAxis: {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
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
  }
}
</script>
```

With `showLabel: true`, each cell displays its numerical value overlaid on the color.

### Label Visibility Options

**Show labels:**
```javascript
cellSettings: {
  showLabel: true
}
```

**Hide labels (color only):**
```javascript
cellSettings: {
  showLabel: false
}
```

## Rendering Modes

### SVG vs Canvas Rendering

The HeatMap automatically chooses rendering mode based on data size:

| Mode | Use When | Advantages |
|------|----------|------------|
| **SVG** | Smaller datasets (< 1000 cells) | Better interactivity, scalable |
| **Canvas** | Large datasets (1000+ cells) | Better performance, memory efficient |

### Automatic Mode Detection

```vue
<template>
  <ejs-heatmap id="heatmap" :dataSource='dataSource'></ejs-heatmap>
</template>

<script>
// SVG automatically used for small datasets
const smallData = Array(10).fill(0).map(() => Array(10).fill(Math.random() * 100));

// Canvas automatically used for large datasets  
const largeData = Array(100).fill(0).map(() => Array(100).fill(Math.random() * 100));
</script>
```

The HeatMap component intelligently selects SVG for interactivity with smaller data and Canvas for performance with larger datasets.

### Performance Considerations

**Small datasets (SVG):**
- Better interactivity and precision
- Suitable for dashboards with detailed information
- Example: 10×10 to 50×50 grids

**Large datasets (Canvas):**
- Better performance and lower memory usage
- Suitable for big-data visualizations
- Example: 100×100 to 1000×1000+ grids

### Complete Styling Example

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap"
      :dataSource='dataSource'
      :xAxis='xAxis'
      :yAxis='yAxis'
      :titleSettings='titleSettings'
      :cellSettings='cellSettings'
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
      titleSettings: {
        text: 'Sales Performance Matrix',
        textStyle: {
          size: '18px',
          fontWeight: '600',
          fontFamily: 'Arial'
        }
      },
      cellSettings: {
        showLabel: true,
        border: {
          width: 1,
          radius: 4,
          color: '#ffffff'
        }
      },
      xAxis: {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael'],
        labelStyle: {
          size: '12px',
          fontWeight: '500'
        }
      },
      yAxis: {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        labelStyle: {
          size: '12px',
          fontWeight: '500'
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

This example combines title, cell, axis, and legend styling for a complete professional appearance.
