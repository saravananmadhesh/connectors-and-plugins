# Legend Configuration

## Table of Contents
- [Display Legend](#display-legend)
  - [Basic Legend](#basic-legend)
  - [Hide Legend](#hide-legend)
- [Position and Alignment](#position-and-alignment)
  - [Position Options](#position-options)
  - [Alignment within Position](#alignment-within-position)
  - [Example: Top-Left Legend](#example-top-left-legend)
- [Sizing and Dimensions](#sizing-and-dimensions)
  - [Legend Size](#legend-size)
  - [Item Icon Size](#item-icon-size)
  - [Complete Size Example](#complete-size-example)
- [Legend Shapes](#legend-shapes)
  - [Shape Options](#shape-options)
  - [Example: Custom Shape](#example-custom-shape)
- [Paging and Navigation](#paging-and-navigation)
  - [Automatic Paging](#automatic-paging)
  - [Arrow Navigation (No Page Numbers)](#arrow-navigation-no-page-numbers)
  - [Example: Paginated Legend](#example-paginated-legend)
- [Text Wrapping](#text-wrapping)
  - [Enable Text Wrapping](#enable-text-wrapping)
  - [Wrap Options](#wrap-options)
  - [Example: Wrapped Labels](#example-wrapped-labels)
- [Legend Titles](#legend-titles)
  - [Basic Title](#basic-title)
  - [Title Styling](#title-styling)
  - [Title Positions](#title-positions)
  - [Title Font Customization](#title-font-customization)
  - [Example: Styled Legend Title](#example-styled-legend-title)
- [Custom Templates](#custom-templates)
  - [Basic Template](#basic-template)
  - [Template with Icons](#template-with-icons)
  - [Template Variables](#template-variables)
- [Item Padding and Layout](#item-padding-and-layout)
  - [Item Padding](#item-padding)
  - [Layout Options](#layout-options)
  - [Maximum Columns (for Auto Layout)](#maximum-columns-for-auto-layout)
  - [Fixed Width Layout](#fixed-width-layout)
  - [Example: Customized Layout](#example-customized-layout)
- [Legend Reverse](#legend-reverse)
- [Complete Advanced Legend Example](#complete-advanced-legend-example)
- [Next Steps](#next-steps)
  - [Configure data labels](#configure-data-labels)
  - [Add interactivity](#add-interactivity)
  - [Ensure accessibility](#ensure-accessibility)

---

## Display Legend

Enable or disable the legend and control its visibility.

### Basic Legend

```vue
<template>
  <ejs-accumulationchart id="container" :legendSettings="legendSettings">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries, AccumulationLegend } from "@syncfusion/ej2-vue-charts"

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
        { x: 'Chrome', y: 37 },
        { x: 'Firefox', y: 28 },
        { x: 'Safari', y: 19 },
        { x: 'Others', y: 16 }
      ],
      legendSettings: {
        visible: true  // Enable legend
      }
    }
  },
  provide: {
    accumulationchart: [PieSeries, AccumulationLegend]
  }
}
</script>

<style>
#container {
  height: 400px;
}
</style>
```

### Hide Legend

```vue
legendSettings: {
  visible: false  // Disable legend
}
```

---

## Position and Alignment

Control where the legend appears on the chart.

### Position Options

Legends can be positioned in 4 locations:

```vue
// Top
legendSettings: { position: 'Top' }

// Bottom (default for landscape)
legendSettings: { position: 'Bottom' }

// Left
legendSettings: { position: 'Left' }

// Right
legendSettings: { position: 'Right' }

// Auto (default for portrait)
legendSettings: { position: 'Auto' }

// Custom
legendSettings: { position: 'Custom', location: { x: 50, y: 50 } }
```

### Alignment within Position

Combine position with alignment:

```vue
legendSettings: {
  position: 'Top',
  alignment: 'Near'    // Left/Top alignment
}

legendSettings: {
  position: 'Top',
  alignment: 'Center'  // Center alignment
}

legendSettings: {
  position: 'Top',
  alignment: 'Far'     // Right/Bottom alignment
}
```

### Example: Top-Left Legend

```vue
<template>
  <ejs-accumulationchart id="container" :legendSettings="legendSettings">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'A', y: 18 },
        { x: 'B', y: 22 },
        { x: 'C', y: 35 },
        { x: 'D', y: 25 }
      ],
      legendSettings: {
        visible: true,
        position: 'Top',
        alignment: 'Near'
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

## Sizing and Dimensions

Control legend size and item dimensions.

### Legend Size

```vue
legendSettings: {
  visible: true,
  width: '300px',    // Fixed width
  height: '100px'    // Fixed height
}
```

### Item Icon Size

```vue
legendSettings: {
  visible: true,
  shapeWidth: 15,    // Icon width
  shapeHeight: 15    // Icon height
}
```

### Complete Size Example

```vue
<template>
  <ejs-accumulationchart id="container" :legendSettings="legendSettings">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y">
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
        { x: 'Edge', y: 16 }
      ],
      legendSettings: {
        visible: true,
        position: 'Right',
        width: '200px',
        height: '150px',
        shapeWidth: 12,
        shapeHeight: 12
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

## Legend Shapes

Customize the shape of legend icons.

### Shape Options

```vue
legendSettings: {
  visible: true
}

// In series, set legendShape:
<e-accumulation-series 
  :dataSource="seriesData" 
  xName="x" 
  yName="y"
  legendShape="Rectangle">
</e-accumulation-series>
```

**Available Shapes:**
- `'SeriesType'` (default) - Match chart type
- `'Circle'` - Circle icons
- `'Rectangle'` - Square/rectangular icons
- `'Diamond'` - Diamond shape
- `'Triangle'` - Triangle shape
- `'InvertedTriangle'` - Upside-down triangle
- `'Cross'` - Plus sign
- `'Image'` - Image
- `'Pentagon'` - Pentagon
- `'VerticalLine'` - VerticalLine
- `'HorizontalLine'` - HorizontalLine
- `'TargetRect'` - TargetRect

### Example: Custom Shape

```vue
<template>
  <ejs-accumulationchart id="container" :legendSettings="legendSettings">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        legendShape="Rectangle">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Q1', y: 25 },
        { x: 'Q2', y: 30 },
        { x: 'Q3', y: 35 },
        { x: 'Q4', y: 40 }
      ],
      legendSettings: {
        visible: true,
        position: 'Bottom'
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

## Paging and Navigation

Handle many legend items with paging.

### Automatic Paging

```vue
legendSettings: {
  visible: true,
  width: '200px',
  height: '100px',
  enablePages: true
  // Paging enabled automatically when items exceed space
}
```

Paging appears automatically when legend items exceed available space.

### Arrow Navigation (No Page Numbers)

```vue
legendSettings: {
  visible: true,
  width: '200px',
  enablePages: false  // Show arrows instead of page numbers
}
```

### Example: Paginated Legend

```vue
<template>
  <ejs-accumulationchart id="container" :legendSettings="legendSettings">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Jan', y: 12 },
        { x: 'Feb', y: 15 },
        { x: 'Mar', y: 18 },
        { x: 'Apr', y: 14 },
        { x: 'May', y: 20 },
        { x: 'Jun', y: 25 },
        { x: 'Jul', y: 22 },
        { x: 'Aug', y: 19 }
      ],
      legendSettings: {
        visible: true,
        position: 'Bottom',
        width: '300px',
        height: '50px',
        enablePages: true
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

## Text Wrapping

Wrap long legend labels to multiple lines.

### Enable Text Wrapping

```vue
legendSettings: {
  visible: true,
  textWrap: 'Wrap',
  maximumLabelWidth: 100  // Max width before wrapping
}
```

**textWrap Options:**
- `'Wrap'` - Specifies to break a word once it is too long to fit on a line by itself
- `'Normal'` - Specifies to break words only at allowed break points
- `'AnyWhere'` - Specifies to break a word at any point if there are no otherwise-acceptable break points in the line

### Example: Wrapped Labels

```vue
<template>
  <ejs-accumulationchart id="container" :legendSettings="legendSettings">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Very Long Category Name One', y: 25 },
        { x: 'Another Long Category Name', y: 30 },
        { x: 'Third Long Category Label', y: 45 }
      ],
      legendSettings: {
        visible: true,
        position: 'Right',
        width: '120px',
        textWrap: 'Wrap',
        maximumLabelWidth: 100
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

## Legend Titles

Add and customize legend titles.

### Basic Title

```vue
legendSettings: {
  visible: true,
  title: 'Browsers'
}
```

### Title Styling

```vue
legendSettings: {
  visible: true,
  title: 'Sales by Region',
  titlePosition: 'Top',
  maximumTitleWidth: 150
}
```

**Title Positions:**
- `'Top'` - Above legend items
- `'Left'` - Left of legend items
- `'Right'` - Right of legend items

### Title Font Customization

```vue
legendSettings: {
  visible: true,
  title: 'Market Share',
  titleStyle: {
    fontFamily: 'Arial',
    fontStyle: 'italic',
    fontWeight: 'bold',
    size: '16px',
    color: '#333'
  }
}
```

### Example: Styled Legend Title

```vue
<template>
  <ejs-accumulationchart id="container" :legendSettings="legendSettings">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y">
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
      legendSettings: {
        visible: true,
        title: 'Browser Distribution',
        position: 'Bottom',
        titleStyle: {
          fontWeight: 'bold',
          size: '14px',
          color: '#333'
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

---

## Custom Templates

Create custom legend items with HTML templates.

### Basic Template

```vue
legendSettings: {
  visible: true,
  template: `
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-weight:bold;">\${point.x}</span>
      <span style="color:#666;">\${point.y}</span>
    </div>
  `
}
```

### Template with Icons

```vue
<template>
  <ejs-accumulationchart id="container" :legendSettings="legendSettings" :legendRender="onLegendRender">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        pointColorMapping="color">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Chrome', y: 37, color: '#498fff' },
        { x: 'Firefox', y: 28, color: '#ffa060' },
        { x: 'Safari', y: 19, color: '#ff68b6' },
        { x: 'Others', y: 16, color: '#81e2a1' }
      ],
      legendSettings: {
        visible: true,
        template: `
          <div style="display:flex;align-items:center;gap:8px;padding:4px;">
            <div style="width:16px;height:16px;background:;border-radius:2px;"></div>
            <div>
              <div style="font-weight:bold;">\${point.x}</div>
              <div style="font-size:12px;color:#999;">\${point.y}M users</div>
            </div>
          </div>
        `
      }
    }
  },
  methods: {
    onLegendRender(args) {
      const chartInstance = document.getElementById('container')?.ej2_instances?.[0];
      // Update template color dynamically
      if (chartInstance && chartInstance.series[0]) {
          const color = args.fill;
          args.template = args.template.replace(
            'color:;', 'color:' + color + ';'
        )
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

**Template Variables:**
- `${point.x}` - Category name
- `${point.y}` - Value
- `${point.percentage}` - Percentage

---

## Item Padding and Layout

Control spacing between legend items and overall layout.

### Item Padding

```vue
legendSettings: {
  visible: true,
  itemPadding: 15  // Space between items (pixels)
}
```

### Layout Options

```vue
legendSettings: {
  visible: true,
  layout: 'Vertical',    // Vertical stacking
  // OR
  layout: 'Horizontal',  // Horizontal flow
  // OR
  layout: 'Auto'         // Auto (default)
}
```

### Maximum Columns (for Auto Layout)

```vue
legendSettings: {
  visible: true,
  layout: 'Auto',
  maximumColumns: 3  // Max 3 columns before wrapping
}
```

### Fixed Width Layout

```vue
legendSettings: {
  visible: true,
  fixedWidth: true  // All items same width
}
```

### Example: Customized Layout

```vue
<template>
  <ejs-accumulationchart id="container" :legendSettings="legendSettings">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y">
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
        { x: 'Edge', y: 16 },
        { x: 'Opera', y: 10 },
        { x: 'Others', y: 6 }
      ],
      legendSettings: {
        visible: true,
        position: 'Bottom',
        layout: 'Auto',
        maximumColumns: 3,
        itemPadding: 20,
        fixedWidth: true
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

## Legend Reverse

Reverse the order of legend items.

```vue
legendSettings: {
  visible: true,
  reverse: true  // Reverse item order
}
```

---

## Complete Advanced Legend Example

```vue
<template>
  <ejs-accumulationchart id="container" :legendSettings="legendSettings">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="seriesData" 
        xName="x" 
        yName="y"
        pointColorMapping="color"
        legendShape="Rectangle">
      </e-accumulation-series>
    </e-accumulation-series-collection>
  </ejs-accumulationchart>
</template>

<script>
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries, AccumulationLegend } from "@syncfusion/ej2-vue-charts"

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
        { x: 'Chrome', y: 37, color: '#498fff' },
        { x: 'Firefox', y: 28, color: '#ffa060' },
        { x: 'Safari', y: 19, color: '#ff68b6' },
        { x: 'Edge', y: 16, color: '#81e2a1' }
      ],
      legendSettings: {
        visible: true,
        position: 'Bottom',
        alignment: 'Center',
        title: 'Browser Market Share',
        layout: 'Auto',
        maximumColumns: 2,
        itemPadding: 15,
        shapeWidth: 14,
        shapeHeight: 14,
        textWrap: 'Wrap',
        maximumLabelWidth: 100
      }
    }
  },
  provide: {
    accumulationchart: [PieSeries, AccumulationLegend]
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

- Configure data labels in [data-labels.md](./data-labels.md)
- Add interactivity in [advanced-features.md](./advanced-features.md)
- Ensure accessibility in [accessibility.md](./accessibility.md)
