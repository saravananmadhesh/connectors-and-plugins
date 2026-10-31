# User Interaction - Tooltips and Track Lines

## Table of Contents
- [Overview](#overview)
- [Module Injection for Interactivity](#module-injection-for-interactivity)
  - [Basic Module Injection](#basic-module-injection)
  - [Conditional Module Injection](#conditional-module-injection)
  - [Verify Module Injection](#verify-module-injection)
- [Tooltip Configuration](#tooltip-configuration)
  - [Enable Basic Tooltip](#enable-basic-tooltip)
  - [Tooltip with Format](#tooltip-with-format)
  - [Format String Patterns](#format-string-patterns)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
- [Tooltip Customization](#tooltip-customization)
  - [Customize Tooltip Appearance](#customize-tooltip-appearance)
  - [Tooltip Style Properties](#tooltip-style-properties)
- [Tooltip Templates](#tooltip-templates)
  - [Vue Template for Tooltip](#vue-template-for-tooltip)
  - [Enhanced Template with Styling](#enhanced-template-with-styling)
- [Track Lines](#track-lines)
  - [Enable Basic Track Line](#enable-basic-track-line)
- [Track Line Customization](#track-line-customgle-interactive-features)
  - [Pattern 3: Performance Optimization for Many Sparklines](#pattern-3-performance-optimization-for-many-sparklines)
  - [Pattern 4: Responsive Tooltip](#pattern-4-responsive-tooltip)
- [Troubleshooting](#troubleshooting)
  - [Issue: Tooltip Not Appearing](#issue-tooltip-not-appearing)
  - [Issue: Track Line Not Visible](#issue-track-line-not-visible)
  - [Issue: Tooltip Text Cutoff](#issue-tooltip-text-cutoff)
  - [Issue: Multiple Sparklines, Each Needs Different Tooltips](#issue-multiple-sparklines-each-needs-different-tooltips)

---

## Overview

Sparkline supports two main interactive features:

1. **Tooltips:** Display data point details on hover
2. **Track Lines:** Visual indicator line that follows mouse movement

Both features require the `SparklineTooltip` module to be injected via the `provide` option.

---

## Module Injection for Interactivity

### Basic Module Injection

All interactive features require injecting the `SparklineTooltip` module:

```vue
<template>
<div class="control_wrapper">
<div>
    <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource'  :tooltipSettings='tooltipSettings'></ejs-sparkline>
</div>
</div>
</template>
<script>
import { SparklineComponent, SparklineTooltip } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      dataSource: [5, 3, 4, 6, 8, 7, 9]
    }
  },
  provide: {
    sparkline: [SparklineTooltip]  // ← Required for tooltips/track lines
  }
}
</script>
```

### Conditional Module Injection

Load modules based on features needed:

```vue
<template>
<div class="control_wrapper">
<div>
    <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource'  :tooltipSettings='tooltipSettings'></ejs-sparkline>
</div>
</div>
</template>
<script>
import { SparklineComponent, SparklineTooltip } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      enableInteractivity: true,
      dataSource: [5, 3, 4, 6, 8, 7, 9]
    }
  },
  provide: function() {
    return {
      sparkline: this.enableInteractivity ? [SparklineTooltip] : []
    }
  }
}
</script>
```

### Verify Module Injection

Check browser console for injection errors. Without proper injection, tooltips won't appear.

---

## Tooltip Configuration

### Enable Basic Tooltip

Display tooltip on hover:

```vue
<template>
  <div>
    <ejs-sparkline 
      id="sparkline"
      :dataSource='data'
      :tooltipSettings='tooltipSettings'
      :height='height'
      :width='width'>
    </ejs-sparkline>
  </div>
</template>

<script>
import { SparklineComponent, SparklineTooltip } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      height: '100px',
      width: '300px',
      data: [5, 3, 4, 6, 8, 7, 9],
      tooltipSettings: {
        visible: true
      }
    }
  },
  provide: {
    sparkline: [SparklineTooltip]
  }
}
</script>
```

### Tooltip with Format

Display formatted data in tooltip:

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' :axisSettings='axisSettings' :valueType='valueType' fill= 'blue' xName='x' yName='y' :tooltipSettings='tooltipSettings' :height='height' :width='width'></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent,SparklineTooltip } from "@syncfusion/ej2-vue-charts";
export default {
    components: {
        'ejs-sparkline': SparklineComponent
      },
  data: function() {
    return {
    height: '200px',
    width: '500px',
    axisSettings: {
        minX: -1, maxX: 7, maxY: 8, minY: -1
    },
    valueType: 'Category',
    dataSource:   [{x: 'Mon', y: 3 },{x: 'Tue', y: 5 },{x: 'Wed', y: 2 },{x: 'Thu', y: 4 },{x: 'Fri', y: 6 }],
    // To enable tooltip for sparkline
    tooltipSettings: {
        visible: true,
        format: '${x} : ${y}',
        fill: '#033e96',
        textStyle: {
            color: 'white'
        },
    }
    }
  },
provide:{
    sparkline:[SparklineTooltip]
}
}
</script>
<style>
.spark {
    width: 100%;
    height: 100%;
}
</style>
```

### Format String Patterns

Use property names in `${}` placeholders:

```javascript
// For object array with xName/yName
format: '${xName} : ${yName}'         // Generic x, y
format: '${month} : $${sales}'        // Month and sales with $
format: 'Date: ${date}, Value: ${value}'

// For simple arrays
format: '${x} : ${y}'                 // x=index, y=value
format: 'Point ${x}: ${y}'
```

---

### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip placeholders. This allows you to control how x and y values are displayed without using additional events.

A format specifier is applied by adding a colon (`:`) followed by the required format.

For example:

```javascript
tooltipSettings: {
    visible: true,
    format: '${x:MMM yyyy} : ${y:n2}'
}
```

In the above example, `x` is displayed in month-year format when it contains DateTime values, and `y` is displayed with two decimal places.

Inline formatting can be applied to the following tooltip placeholders:

- `${x}` or `${x:MMM yyyy}` - Specifies the x-value of the data point.
- `${y}` or `${y:n2}` - Specifies the y-value of the data point.

> **Important:** Formatting is applied only when the resolved value supports the specified format. DateTime formatting applies to DateTime values, and number formatting applies to numeric values.

The following format types are supported:

**DateTime formats:**

- `MMM yyyy` - Displays the abbreviated month and four-digit year.
- `MM:yy` - Displays the two-digit month and year.
- `dd MMM` - Displays the two-digit day and abbreviated month.

**Number formats:**

- `n2` - Number with two decimal places.
- `n0` - Number without decimal places.
- `c2` - Currency format.
- `p1` - Percentage format.
- `e1` - Exponential notation.

If the specified format does not match the resolved value type, the original value is displayed.

## Tooltip Customization

### Customize Tooltip Appearance

Modify tooltip styling:

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' :axisSettings='axisSettings' :valueType='valueType' fill= 'blue' xName='x' yName='y' :tooltipSettings='tooltipSettings' :height='height' :width='width'></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent,SparklineTooltip } from "@syncfusion/ej2-vue-charts";

export default {
    components: {
        'ejs-sparkline': SparklineComponent
      },
  data: function() {
    return {
    height: '200px',
    width: '500px',
    axisSettings: {
        minX: -1, maxX: 7, maxY: 8, minY: -1
    },
    valueType: 'Category',
    dataSource:   [{x: 'Mon', y: 3 },{x: 'Tue', y: 5 },{x: 'Wed', y: 2 },{x: 'Thu', y: 4 },{x: 'Fri', y: 6 }],
    // To enable tooltip for sparkline
    tooltipSettings: {
        visible: true,
        format: '${x} : ${y}',
        fill: '#033e96',           // Tooltip background color
        textStyle: {
          color: 'white',          // Text color
          fontFamily: 'Arial',
          fontSize: '12px',
          fontStyle: 'italic'
        },
        border: {
          color: '#000',
          width: 5
        }
    }
    }
  },
provide:{
    sparkline:[SparklineTooltip]
}
}
</script>
<style>
.spark {
    width: 100%;
    height: 100%;
}
</style>
```

### Tooltip Style Properties

| Property | Type | Purpose | Example |
|----------|------|---------|---------|
| `fill` | String | Background color | `'#033e96'` |
| `textStyle.color` | String | Text color | `'white'` |
| `textStyle.fontFamily` | String | Font | `'Arial'` |
| `textStyle.fontSize` | String | Font size | `'14px'` |
| `textStyle.fontStyle` | String | Font style | `'italic'` |
| `textStyle.fontWeight` | String | Font weight | `'bold'` |
| `border.color` | String | Border color | `'#000'` |
| `border.width` | Number | Border width | `2` |

---

## Tooltip Templates

### Vue Template for Tooltip

Use Vue component templates for custom tooltip content:

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' :axisSettings='axisSettings'  valueType= 'Category' fill= '#033e96' xName='x' yName='y' :tooltipSettings='tooltipSettings' :height='height' :width='width'></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { SparklinePlugin,SparklineTooltip } from "@syncfusion/ej2-vue-charts";

var contentTemplate = function() {
  return { template: contentVue };
};
var contentVue = Vue.component("contentTemplate", {
  template: '<div style="border-radius: 5px; background: #008cff;color: #FFFFFF !important;font-size: 16px;font-style: italic;padding: 8px;"> : </div>',
  data() {
    return {
      data: {}
    };
  }
});

Vue.use(SparklinePlugin);

export default {
  data: function() {
    return {
    height: '200px',
    width: '500px',
    axisSettings: {
        minX: -1, maxX: 7, maxY: 8, minY: -1
    },
    dataSource:   [{x: 'Mon', y: 3 },{x: 'Tue', y: 5 },{x: 'Wed', y: 2 },{x: 'Thu', y: 4 },{x: 'Fri', y: 6 },],
    // To enable tooltip template for sparkline with fill color, border radius and padding customization
    tooltipSettings: {
        visible: true,
        template: contentTemplate
    }
    }
  },
provide:{
    sparkline:[SparklineTooltip]
}
}
</script>
<style>
.spark {
    width: 100%;
    height: 100%;
}
</style>
```

### Enhanced Template with Styling

```vue
<script>
const tooltipTemplate = function() {
  return { template: enhancedTooltip };
};

const enhancedTooltip = Vue.component('enhancedTooltip', {
  template: `
    <div class="custom-tooltip">
      <strong>{{data.x}}</strong><br>
      Value: <span class="value">{{data.y}}</span><br>
      <small>{{getStatus(data.y)}}</small>
    </div>
  `,
  data() {
    return { data: {} };
  },
  methods: {
    getStatus: function(value) {
      if (value > 4) return '📈 Above average';
      if (value < 3) return '📉 Below average';
      return '➡️ Average';
    }
  }
});

export default {
  // ... component config
}
</script>

<style scoped>
.custom-tooltip {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  min-width: 150px;
}

.custom-tooltip .value {
  font-size: 18px;
  font-weight: bold;
}
</style>
```

---

## Track Lines

### Enable Basic Track Line

Display a vertical line following mouse movement:

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' fill= '#033e96' :axisSettings='axisSettings' :tooltipSettings='tooltipSettings' :height='height' :width='width'></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent,SparklineTooltip } from "@syncfusion/ej2-vue-charts";
export default {
    components: {
        'ejs-sparkline': SparklineComponent
      },
  data: function() {
    return {
    height: '200px',
    width: '500px',
    axisSettings: {
        minX: -1, maxX: 46, maxY: 10, minY: -1
    },
    dataSource:   [5, 3, 4, 6, 8, 7, 9, 1, 3, 5, 3, 4, 6, 8, 7, 9, 1, 3, 5, 2, 4, 6, 7, 9, 5, 8, 3, 6, 1, 7, 4, 2, 5, 2, 4, 6, 7, 9, 5, 8, 3, 6, 1, 7, 4, 2],
    // To enable tooltip template for sparkline with fill color, border radius and padding customization
    tooltipSettings: {
        trackLineSettings: {
            visible: true,
            color: '#033e96',
            width: 1
        }
    }
    }
  },
provide:{
    sparkline:[SparklineTooltip]
}
}
</script>
<style>
.spark {
    width: 100%;
    height: 100%;
}
</style>
```

---

## Track Line Customization

### Customize Track Line Style

Modify track line appearance:

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' fill= '#033e96' :axisSettings='axisSettings' :tooltipSettings='tooltipSettings' :height='height' :width='width'></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent,SparklineTooltip } from "@syncfusion/ej2-vue-charts";
export default {
    components: {
        'ejs-sparkline': SparklineComponent
      },
  data: function() {
    return {
    height: '200px',
    width: '500px',
    axisSettings: {
        minX: -1, maxX: 46, maxY: 10, minY: -1
    },
    dataSource:   [5, 3, 4, 6, 8, 7, 9, 1, 3, 5, 3, 4, 6, 8, 7, 9, 1, 3, 5, 2, 4, 6, 7, 9, 5, 8, 3, 6, 1, 7, 4, 2, 5, 2, 4, 6, 7, 9, 5, 8, 3, 6, 1, 7, 4, 2],
    // To enable tooltip template for sparkline with fill color, border radius and padding customization
    tooltipSettings: {
        trackLineSettings: {
            visible: true,
            color: '#ffcd04',
            width: 2
        }
    }
    }
  },
provide:{
    sparkline:[SparklineTooltip]
}
}
</script>
<style>
.spark {
    width: 100%;
    height: 100%;
}
</style>
```

### Track Line Properties

| Property | Type | Purpose | Example |
|----------|------|---------|---------|
| `visible` | Boolean | Show/hide track line | `true` |
| `color` | String | Line color | `'#033e96'` |
| `width` | Number | Line thickness (px) | `2` |

---

## Combined Tooltip and Track Line

### Tooltip + Track Line Together

Display both features simultaneously:

```vue
<template>
  <div>
    <ejs-sparkline 
      id="sparkline"
      :dataSource='data'
      xName='x'
      yName='y'
      :axisSettings='axisSettings'
      valueType='Category'
      fill='blue'
      :tooltipSettings='tooltipSettings'
      :height='height'
      :width='width'>
    </ejs-sparkline>
  </div>
</template>

<script>
import { SparklineComponent, SparklineTooltip } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      height: '200px',
      width: '500px',
      axisSettings: {
        minX: -1,
        maxX: 7,
        maxY: 8,
        minY: -1
      },
      valueType: 'Category',
      data: [
        { x: 'Mon', y: 3 },
        { x: 'Tue', y: 5 },
        { x: 'Wed', y: 2 },
        { x: 'Thu', y: 4 },
        { x: 'Fri', y: 6 }
      ],
      tooltipSettings: {
        visible: true,
        format: '${x} : ${y}',
        fill: '#033e96',
        textStyle: { color: 'white' },
        trackLineSettings: {
          visible: true,
          color: '#033e96',
          width: 1
        }
      }
    }
  },
  provide: {
    sparkline: [SparklineTooltip]
  }
}
</script>
```

---

## Interaction Best Practices

### Pattern 1: Dashboard with Multiple Interactive Sparklines

```vue
<template>
<div class="dashboard">
  <div class="metric" v-for="metric in metrics" :key="metric.id">
    <h4>{{ metric.name }}</h4>
    <ejs-sparkline 
      :id="'spark-' + metric.id"
      :dataSource='metric.data'
      xName='period'
      yName='value'
      :tooltipSettings='tooltipSettings'
      height='80px'
      width='100%'>
    </ejs-sparkline>
  </div>
</div>
</template>

<script>
import { SparklineComponent,SparklineTooltip } from "@syncfusion/ej2-vue-charts";
export default {
    components: {
        'ejs-sparkline': SparklineComponent
      },
data: function() {
  return {
    tooltipSettings: {
      visible: true,
      format: '${period} : ${value}',
      fill: '#333',
      textStyle: { color: 'white' }
    },
    metrics: [
      {
        id: 1,
        name: 'Sales',
        data: [
          { period: 'Q1', value: 50000 },
          { period: 'Q2', value: 65000 },
          { period: 'Q3', value: 58000 }
        ]
      },
      {
        id: 2,
        name: 'Traffic',
        data: [
          { period: 'Q1', value: 15000 },
          { period: 'Q2', value: 18000 },
          { period: 'Q3', value: 16000 }
        ]
      }
    ]
  }
},
provide: {
  sparkline: [SparklineTooltip]
}
}
</script>
```

### Pattern 2: Toggle Interactive Features

```vue
<template>
  <div>
    <div class="controls">
      <label>
        <input type="checkbox" v-model="enableTooltip"> Tooltip
      </label>
      <label>
        <input type="checkbox" v-model="enableTrackLine"> Track Line
      </label>
    </div>
    
    <ejs-sparkline 
      id="sparkline"
      :dataSource='data'
      :tooltipSettings='computedTooltipSettings'
      :height='height'
      :width='width'>
    </ejs-sparkline>
  </div>
</template>

<script>
import { SparklineComponent,SparklineTooltip } from "@syncfusion/ej2-vue-charts";
export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      enableTooltip: true,
      enableTrackLine: false,
      height: '100px',
      width: '300px',
      data: [5, 3, 4, 6, 8, 7, 9]
    }
  },
  computed: {
    computedTooltipSettings: function() {
      return {
        visible: this.enableTooltip,
        format: '${x} : ${y}',
        trackLineSettings: {
          visible: this.enableTrackLine
        }
      }
    }
  },
  provide: {
    sparkline: [SparklineTooltip]
  }
}
</script>
```

### Pattern 3: Performance Optimization for Many Sparklines

Minimize tooltip overhead for large dashboards:

```vue
<template>
  <div>    
    <ejs-sparkline 
      id="sparkline"
      :dataSource='data'
      :tooltipSettings='computedTooltipSettings'
      :height='height'
      :width='width'>
    </ejs-sparkline>
  </div>
</template>
<script>
import { SparklineComponent,SparklineTooltip } from "@syncfusion/ej2-vue-charts";
export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      height: '100px',
      width: '300px',
      data: [5, 3, 4, 6, 8, 7, 9]
      // Lighter tooltip for performance
      tooltipSettings: {
        visible: true,
        format: '${x}',  // Minimal format
        fill: '#333'
        // No track line for performance
      }
    }
  }
}
</script>
```

### Pattern 4: Responsive Tooltip

Change tooltip settings based on screen size:

```vue
<template>
  <div>    
    <ejs-sparkline 
      id="sparkline"
      :dataSource='data'
      :tooltipSettings='computedTooltipSettings'
      :height='height'
      :width='width'>
    </ejs-sparkline>
  </div>
</template>
<script>
import { SparklineComponent,SparklineTooltip } from "@syncfusion/ej2-vue-charts";
export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      isMobile: window.innerWidth < 768
    }
  },
  computed: {
    adaptiveTooltipSettings: function() {
      return {
        visible: true,
        format: this.isMobile ? '${x}' : '${x} : ${y}',
        fill: this.isMobile ? '#666' : '#333',
        textStyle: {
          fontSize: this.isMobile ? '10px' : '12px'
        },
        trackLineSettings: {
          visible: !this.isMobile  // Track line only on desktop
        }
      }
    }
  },
  mounted: function() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }
}
</script>
```

---

## Troubleshooting

### Issue: Tooltip Not Appearing
- **Solution:** Verify `SparklineTooltip` is injected in `provide`
- Check `tooltipSettings.visible` is `true`
- Ensure data is properly bound to sparkline

### Issue: Track Line Not Visible
- **Solution:** Enable track line: `trackLineSettings.visible = true`
- Verify module injection includes `SparklineTooltip`
- Check `width` property (try wider line like 2-3px)

### Issue: Tooltip Text Cutoff
- **Solution:** Increase `width` and `height` of sparkline
- Use shorter format string or multi-line template
- Adjust tooltip positioning via CSS

### Issue: Multiple Sparklines, Each Needs Different Tooltips
- **Solution:** Use computed properties to customize per sparkline
- Create reusable tooltip configuration functions
- Data-bind tooltip settings to reactive properties
