# Advanced Features and Accessibility

## Table of Contents
- [Module Injection](#module-injection)
  - [Understanding Module Architecture](#understanding-module-architecture)
  - [Available Modules](#available-modules)
  - [Conditional Module Injection](#conditional-module-injection)
  - [Module Injection Benefits](#module-injection-benefits)
- [Localization](#localization)
  - [Supported Locales](#supported-locales)
  - [Change Locale](#change-locale)
  - [Locale for Date Formatting](#locale-for-date-formatting)
  - [Numeric Locale Formatting](#numeric-locale-formatting)
- [Accessibility Features](#accessibility-features)
  - [ARIA Attributes](#aria-attributes)
  - [Accessibility Standards Met](#accessibility-standards-met)
  - [Color Contrast](#color-contrast)
- [WCAG Compliance](#wcag-compliance)
  - [WCAG 2.2 Support Status](#wcag-22-support-status)
  - [Improving WCAG Compliance](#improving-wcag-compliance)
- [Keyboard Navigation](#keyboard-navigation)
  - [Supported Keyboard Shortcuts](#supported-keyboard-shortcuts)
  - [Keyboard Navigation Example](#keyboard-navigation-example)
  - [Tab Order](#tab-order)
- [Right-to-Left Support](#right-to-left-support)
  - [Enable RTL Layout](#enable-rtl-layout)
  - [RTL Behavior](#rtl-behavior)
  - [Language-Based RTL](#language-based-rtl)
- [Print Functionality](#print-functionality)
  - [Print Sparkline](#print-sparkline)
  - [Print Styles](#print-styles)
- [Performance Optimization](#performance-optimization)
  - [Large Datasets](#large-datasets)
  - [Multiple Sparklines](#multiple-sparklines)
  - [Data Update Strategy](#data-update-strategy)
  - [Debounce Real-time Updates](#debounce-real-time-updates)
  - [Module Injection Performance](#module-injection-performance)
- [Best Practices Summary](#best-practices-summary)
  - [Accessibility Best Practices](#accessibility-best-practices)
  - [Localization Best Practices](#localization-best-practices)
  - [Performance Best Practices](#performance-best-practices)
- [Troubleshooting](#troubleshooting)
  - [Issue: Print Quality Poor](#issue-print-quality-poor)
  - [Issue: RTL Not Working](#issue-rtl-not-working)
  - [Issue: Keyboard Shortcuts Not Responding](#issue-keyboard-shortcuts-not-responding)
  - [Issue: Performance Degradation with Real-time Data](#issue-performance-degradation-with-real-time-data)
  - [Issue: Accessibility Issues with Screen Readers](#issue-accessibility-issues-with-screen-readers)

---

## Module Injection

### Understanding Module Architecture

Sparkline uses a modular architecture where features can be optionally injected:

```vue


<template>
    <div class="control_wrapper">
    <div>
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' xName='xval' yName='yval' :type='type' :tooltipSettings='tooltipSettings' :height='height' :width='width'></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent, SparklineTooltip } from "@syncfusion/ej2-vue-charts";

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
    height: '100px',
    width: '70%',
    dataSource: [
            { x: 0, xval: '2005', yval: 20090440 },
            { x: 1, xval: '2006', yval: 20264080 },
            { x: 2, xval: '2007', yval: 20434180 },
            { x: 3, xval: '2008', yval: 21007310 },
            { x: 4, xval: '2009', yval: 21262640 },
            { x: 5, xval: '2010', yval: 21515750 },
            { x: 6, xval: '2011', yval: 21766710 },
            { x: 7, xval: '2012', yval: 22015580 },
            { x: 8, xval: '2013', yval: 22262500 },
            { x: 9, xval: '2014', yval: 22507620 },
        ],
    // Assign the 'area' as type of Sparkline
    type:'Area',
     // To enable the tooltip for Sparkline
    tooltipSettings: {
        visible: true,
        format: '${xval} : ${yval}'
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
    border: 1px solid rgb(209, 209, 209);
    border-radius: 2px;
    width: 100%;
    height: 100%;
}
</style>



```

### Available Modules

Currently available module:
- **SparklineTooltip:** Enables tooltips, track lines, and interactive features

### Conditional Module Injection

Load modules only when needed:

```vue


<template>
    <div class="control_wrapper">
    <div>
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' xName='xval' yName='yval' :type='type' :tooltipSettings='tooltipSettings' :height='height' :width='width'></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent, SparklineTooltip } from "@syncfusion/ej2-vue-charts";

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
    height: '100px',
    width: '70%',
    dataSource: [
            { x: 0, xval: '2005', yval: 20090440 },
            { x: 1, xval: '2006', yval: 20264080 },
            { x: 2, xval: '2007', yval: 20434180 },
            { x: 3, xval: '2008', yval: 21007310 },
            { x: 4, xval: '2009', yval: 21262640 },
            { x: 5, xval: '2010', yval: 21515750 },
            { x: 6, xval: '2011', yval: 21766710 },
            { x: 7, xval: '2012', yval: 22015580 },
            { x: 8, xval: '2013', yval: 22262500 },
            { x: 9, xval: '2014', yval: 22507620 },
        ],
    // Assign the 'area' as type of Sparkline
    type:'Area',
     // To enable the tooltip for Sparkline
    tooltipSettings: {
        visible: true,
        format: '${xval} : ${yval}'
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
    border: 1px solid rgb(209, 209, 209);
    border-radius: 2px;
    width: 100%;
    height: 100%;
}
</style>



```

### Module Injection Benefits

- **Performance:** Only load required code
- **Bundle Size:** Reduce application size
- **Flexibility:** Enable features conditionally
- **Best Practice:** Load modules dynamically based on features

---

## Localization

### Supported Locales

Sparkline supports internationalization (i18n) for:
- Tooltip text formatting
- Number formatting
- Date formatting
- RTL languages

### Change Locale

```vue


<template>
<div>
  <div class="locale-selector">
    <button @click="changeLocale('en')">English</button>
    <button @click="changeLocale('de')">Deutsch</button>
    <button @click="changeLocale('fr')">Français</button>
    <button @click="changeLocale('ar')">العربية</button>
  </div>
  
  <ejs-sparkline 
    id="sparkline"
    :dataSource='data'
    locale='en'
    :tooltipSettings='tooltipSettings'
    :height='height'
    :width='width'>
  </ejs-sparkline>
</div>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent, SparklineTooltip } from "@syncfusion/ej2-vue-charts";

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
provide:{
    sparkline:[SparklineTooltip]
},
methods: {
  changeLocale: function(locale) {
    // Sync locale across app
    this.$i18n.locale = locale;
    // Update sparkline locale if needed
    document.getElementById('sparkline').locale = locale;
  }
}
}
</script>
<style>
.spark {
    border: 1px solid rgb(209, 209, 209);
    border-radius: 2px;
    width: 100%;
    height: 100%;
}
</style>
```

### Locale for Date Formatting

Format dates according to locale:

```vue
<template>
<ejs-sparkline 
  :dataSource='dateData'
  xName='date'
  yName='value'
  locale='de'
  :height='height'
  :width='width'>
</ejs-sparkline>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent, SparklineTooltip } from "@syncfusion/ej2-vue-charts";

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      height: '100px',
      width: '350px',
      dateData: [
        { date: new Date(2022, 0, 1), value: 25000 },
        { date: new Date(2022, 1, 1), value: 32000 },
        { date: new Date(2022, 2, 1), value: 28000 }
      ]
    }
  },
provide:{
    sparkline:[SparklineTooltip]
},
}
</script>
<style>
.spark {
    border: 1px solid rgb(209, 209, 209);
    border-radius: 2px;
    width: 100%;
    height: 100%;
}
</style>



```

### Numeric Locale Formatting

Number display follows locale conventions:

```javascript
// English: 1,234.56
// German: 1.234,56
// French: 1 234,56
// Arabic: ١٬٢٣٤٫٥٦
```

---

## Accessibility Features

### ARIA Attributes

Sparkline uses WAI-ARIA attributes for accessibility:

```html
<ejs-sparkline 
  role="img"
  aria-label="Sales trend sparkline showing data from 2022"
  aria-hidden="false">
</ejs-sparkline>
```

### Accessibility Standards Met

Sparkline follows these standards:
- **WCAG 2.2:** Partial support
- **Section 508:** Partial support
- **ADA Compliance:** Partial support
- **Axe-core Validation:** Full support
- **Accessibility Checker:** Full support

### Color Contrast

Ensure sufficient color contrast for visibility:

```vue
<template>
<ejs-sparkline 
  :dataSource='data'
  :containerArea='containerArea'
  fill='#000066'
  :height='height'
  :width='width'>
</ejs-sparkline>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent, SparklineTooltip } from "@syncfusion/ej2-vue-charts";

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      height: '100px',
      width: '300px',
      data: [3, 6, 4, 1, 3, 2, 5],
      containerArea: {
        background: '#ffffff'  // White background with dark line = good contrast
      }
    }
  },
provide:{
    sparkline:[SparklineTooltip]
},
}
</script>
```

---

## WCAG Compliance

### WCAG 2.2 Support Status

| Criterion | Status | Notes |
|-----------|--------|-------|
| Perceivable | Partial | Depends on color scheme and contrast |
| Operable | Partial | Keyboard support (Ctrl+P for print) |
| Understandable | Partial | Tooltips and labels aid understanding |
| Robust | Full | Valid HTML/SVG, proper ARIA |

### Improving WCAG Compliance

1. **Add descriptive labels:**
```vue
<label for="sales-sparkline">Sales trend chart</label>
<ejs-sparkline 
  id="sales-sparkline"
  :dataSource='data'>
</ejs-sparkline>
```

2. **Enable data labels:**
```javascript
dataLabelSettings: { visible: ['All'] }  // Helps screen readers
```

3. **Use semantic HTML:**
```vue
<figure>
  <ejs-sparkline :dataSource='data'></ejs-sparkline>
  <figcaption>Monthly sales trend 2022</figcaption>
</figure>
```

4. **Provide alternative text:**
```vue
<ejs-sparkline 
  :dataSource='data'
  aria-label="Sales data: Jan 100, Feb 120, Mar 110">
</ejs-sparkline>
```

---

## Keyboard Navigation

### Supported Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Ctrl + P** | Print the sparkline |
| **Tab** | Navigate to sparkline (focus) |
| **Shift + Tab** | Navigate back |

### Keyboard Navigation Example

```vue
<template>
<div>
  <p>Press Ctrl+P on focused sparkline to print</p>
  <ejs-sparkline 
    id="sparkline"
    tabindex="0"
    :dataSource='data'
    :height='height'
    :width='width'>
  </ejs-sparkline>
</div>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent, SparklineTooltip } from "@syncfusion/ej2-vue-charts";

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
        height: '100px',
        width: '300px',
        data: [3, 6, 4, 1, 3, 2, 5]
    }
  },
provide:{
    sparkline:[SparklineTooltip]
},
mounted: function() {
  const sparkline = document.getElementById('sparkline');
  
  // Listen for Ctrl+P on sparkline
  sparkline.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      window.print();
    }
  });
}
}
</script>
```

### Tab Order

Ensure sparkline is included in tab order:

```vue
<template>
  <div>
    <button>Previous</button>
    <ejs-sparkline 
      tabindex="0"
      :dataSource='data'>
    </ejs-sparkline>
    <button>Next</button>
  </div>
</template>
```

---

## Right-to-Left Support

### Enable RTL Layout

Sparkline supports RTL languages (Arabic, Hebrew, etc.):

```vue
<template>
    <div class="control_wrapper">
    <div class="spark">
        <ejs-sparkline id="sparkline" align="center" :dataSource='dataSource' :enableRtl='enableRtl' :height='height' :width='width'></ejs-sparkline>
    </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent, SparklineTooltip } from "@syncfusion/ej2-vue-charts";
export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
    height: '150px',
    width: '150px',
    enableRtl: true,
    dataSource: [30000, 60000, 40000, 10000, 30000, 20000, 50000]
    }
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

### RTL Behavior

When RTL is enabled:
- Sparkline axes flip horizontally
- Margins adjust for text direction
- Labels align to right side

### Language-Based RTL

```vue
<script>
export default {
  computed: {
    direction: function() {
      const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
      return rtlLanguages.includes(this.currentLanguage) ? 'rtl' : 'ltr';
    }
  }
}
</script>
```

---

## Print Functionality

### Print Sparkline

Users can print sparklines using Ctrl+P:

```vue
<template>
<div>
  <button @click="printSparkline">Print Chart</button>
  <ejs-sparkline 
    id="sparkline"
    :dataSource='data'
    :height='height'
    :width='width'>
  </ejs-sparkline>
</div>
</template>
<script>
import Vue from 'vue';
import { SparklineComponent, SparklineTooltip } from "@syncfusion/ej2-vue-charts";
export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      height: '200px',
      width: '350px',
      data: [3, 6, 4, 1, 3, 2, 5]
    }
  },
  methods: {
    printSparkline: function() {
      window.print();
    }
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

### Print Styles

Customize print appearance:

```vue
<style>
@media print {
  .no-print {
    display: none;
  }
  
  #sparkline {
    width: 100% !important;
    height: auto !important;
    page-break-inside: avoid;
  }
}
</style>
```

---

## Performance Optimization

### Large Datasets

Handle large data volumes efficiently:

```vue
<script>
export default {
  methods: {
    // Limit data points for large datasets
    limitDataPoints: function(data, maxPoints) {
      if (data.length <= maxPoints) return data;
      
      const step = Math.ceil(data.length / maxPoints);
      return data.filter((_, index) => index % step === 0);
    },
    
    // Downsample data
    downsampleData: function(data, factor) {
      return data.filter((_, i) => i % factor === 0);
    }
  },
  computed: {
    optimizedData: function() {
      return this.limitDataPoints(this.allData, 50);  // Max 50 points
    }
  }
}
</script>
```

### Multiple Sparklines

Optimize dashboard with many sparklines:

```vue
<template>
  <div class="sparkline-grid">
    <div 
      class="sparkline-cell" 
      v-for="metric in metrics" 
      :key="metric.id">
      <ejs-sparkline 
        :dataSource='metric.data'
        height='50px'
        width='100px'
        :tooltipSettings='minimalTooltip'>
      </ejs-sparkline>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      // Minimal tooltip settings for performance
      minimalTooltip: {
        visible: false  // Disable tooltips in grid for speed
      },
      metrics: [
        // ... many metrics
      ]
    }
  }
}
</script>
```

### Data Update Strategy

Optimize reactive data updates:

```vue
<script>
export default {
  methods: {
    // Batch updates instead of individual changes
    batchUpdateData: function(updates) {
      this.data = [...updates];  // Single assignment
    },
    
    // Use Object.freeze for read-only data
    loadStaticData: function() {
      this.staticData = Object.freeze([3, 6, 4, 1, 3, 2, 5]);
    },
    
    // Cache computed data
    getCachedProcessedData: function() {
      if (!this._processedDataCache) {
        this._processedDataCache = this.processData(this.rawData);
      }
      return this._processedDataCache;
    }
  }
}
</script>
```

### Debounce Real-time Updates

```vue
<script>
export default {
  methods: {
    debounce: function(func, wait) {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    },
    
    handleRealtimeData: function() {
      return this.debounce(() => {
        // Update sparkline
        this.$forceUpdate();
      }, 500);  // Wait 500ms before updating
    }
  }
}
</script>
```

### Module Injection Performance

Only inject needed modules:

```vue
<script>
export default {
  data: function() {
    return {
      needsInteractivity: false
    }
  },
  provide: function() {
    // Don't inject module if not needed
    return {
      sparkline: this.needsInteractivity ? [SparklineTooltip] : []
    }
  }
}
</script>
```

---

## Best Practices Summary

### Accessibility Best Practices

✅ **DO:**
- Use data labels for visibility: `visible: ['All']` or `['Start', 'End']`
- Provide `aria-label` with descriptive text
- Maintain sufficient color contrast
- Enable keyboard navigation
- Include `<figure>` and `<figcaption>` for context

❌ **DON'T:**
- Rely on color alone to convey information
- Create unnavigable sparklines
- Use insufficient contrast
- Disable keyboard support

### Localization Best Practices

✅ **DO:**
- Set locale for date/number formatting
- Support RTL languages
- Provide translations for labels
- Test with multiple locales

❌ **DON'T:**
- Hard-code English text
- Assume LTR layout
- Ignore locale-specific formatting

### Performance Best Practices

✅ **DO:**
- Limit data points (max 50-100 for real-time)
- Use data downsampling for large datasets
- Inject modules conditionally
- Batch data updates
- Debounce real-time updates

❌ **DON'T:**
- Display thousands of data points
- Update sparkline on every data change
- Inject unused modules
- Create sparklines with minimal styling needs

---

## Troubleshooting

### Issue: Print Quality Poor
- **Solution:** Increase sparkline dimensions before printing
- Use CSS media queries for print-specific sizes

### Issue: RTL Not Working
- **Solution:** Set `dir="rtl"` on parent container
- Verify language locale is set

### Issue: Keyboard Shortcuts Not Responding
- **Solution:** Ensure sparkline has focus (tabindex="0")
- Check browser keyboard shortcut settings

### Issue: Performance Degradation with Real-time Data
- **Solution:** Implement data downsampling
- Add debouncing to update events
- Limit visible data points

### Issue: Accessibility Issues with Screen Readers
- **Solution:** Enable data labels
- Add ARIA descriptions
- Use semantic HTML wrapper
- Test with screen reader software (NVDA, JAWS)
