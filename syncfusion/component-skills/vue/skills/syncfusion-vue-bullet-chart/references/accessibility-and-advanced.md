# Accessibility & Advanced Features

## Table of Contents
- [Accessibility Standards](#accessibility-standards)
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [ARIA Attributes](#aria-attributes)
- [Color Contrast](#color-contrast)
- [RTL Layout](#rtl-layout)
- [Print Functionality](#print-functionality)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Accessibility Standards

The Syncfusion Bullet Chart component follows major accessibility standards:

### Supported Standards

| Standard | Support | Details |
|----------|---------|---------|
| **WCAG 2.2** | ✅ Full | Levels A, AA, AAA compliant |
| **Section 508** | ✅ Full | US federal accessibility law |
| **ADA** | ✅ Full | Americans with Disabilities Act |
| **Screen Reader** | ✅ Full | JAWS, NVDA, VoiceOver compatible |
| **Keyboard Navigation** | ✅ Full | All features accessible via keyboard |

### Compliance Checklist

```
✅ WCAG 2.2 Support
✅ Section 508 Support
✅ Screen Reader Support
✅ Right-To-Left Support
✅ Color Contrast (WCAG AA)
✅ Mobile Device Support
✅ Keyboard Navigation Support
✅ Accessibility Checker Validation
✅ Axe-core Validation
```

## WCAG 2.2 Compliance

Ensure charts meet Web Content Accessibility Guidelines 2.2:

### Level A Compliance (Minimum)

**1. Perceivable - Users must perceive the information**

```vue
<!-- ✅ Provide text alternatives -->
<template>
  <div>
    <h2>Sales Performance Chart</h2>  <!-- Descriptive heading -->
    <p>Shows actual vs target sales for Q1 2024</p>  <!-- Description -->
    
    <ejs-bulletchart
      title="Q1 Sales"
      :dataSource="data"
    ></ejs-bulletchart>
    
    <!-- Text alternative for data -->
    <table class="data-table">
      <tr><th>Actual</th><th>Target</th><th>Status</th></tr>
      <tr><td>$450K</td><td>$400K</td><td>Exceeded</td></tr>
    </table>
  </div>
</template>
```

**2. Operable - Users must operate the interface**

```vue
<!-- ✅ Keyboard accessible -->
<template>
  <ejs-bulletchart
    id="mainChart"
    tabindex="0"  <!-- Makes chart focusable -->
    :dataSource="data"
  ></ejs-bulletchart>
</template>

<!-- Users can now:
  - Tab to chart
  - Use Tab/Shift+Tab for navigation
  - Ctrl+P to print
-->
```

**3. Understandable - Information must be clear**

```vue
<!-- ✅ Clear, descriptive labels -->
<template>
  <ejs-bulletchart
    title="Revenue Performance"  <!-- Clear title -->
    subtitle="(in thousands USD)"  <!-- Context -->
    :dataSource="data"
    labelFormat="${value}K"  <!-- Clear value format -->
  ></ejs-bulletchart>
</template>
```

**4. Robust - Compatible with assistive technology**

```vue
<!-- ✅ Use semantic HTML and standard practices -->
<template>
  <div role="region" aria-label="Sales performance chart">
    <ejs-bulletchart
      aria-label="Sales actual vs target comparison"
      :dataSource="data"
    ></ejs-bulletchart>
  </div>
</template>
```

### Level AA Compliance (Recommended)

Includes Level A + enhanced requirements:

```vue
<!-- ✅ Sufficient color contrast (4.5:1 minimum) -->
<template>
  <ejs-bulletchart
    :titleStyle="{
      color: '#0D1B2A',      <!-- Dark color for contrast -->
      size: '18px'           <!-- Large enough to read -->
    }"
    :dataSource="data"
  >
    <e-bullet-range-collection>
      <!-- Colors have 4.5:1+ contrast with background -->
      <e-bullet-range end="35" color="#D32F2F"></e-bullet-range>  <!-- Red -->
      <e-bullet-range end="50" color="#F57C00"></e-bullet-range>  <!-- Orange -->
      <e-bullet-range end="100" color="#388E3C"></e-bullet-range> <!-- Green -->
    </e-bullet-range-collection>
  </ejs-bulletchart>
</template>
```

## Keyboard Navigation

Enable full keyboard access without mouse:

### Supported Keyboard Shortcuts

| Key Combination | Action |
|-----------------|--------|
| <kbd>Tab</kbd> | Move focus to next element |
| <kbd>Shift + Tab</kbd> | Move focus to previous element |
| <kbd>Ctrl + P</kbd> | Print the chart |

### Make Chart Focusable

```vue
<template>
  <ejs-bulletchart
    tabindex="0"  <!-- Make keyboard accessible -->
    :dataSource="data"
  ></ejs-bulletchart>
</template>
```

### Keyboard Navigation Example

```vue
<template>
  <div>
    <!-- Navigation controls -->
    <nav>
      <button @click="focusChart">Focus Chart</button>
      <button @click="printChart">Print Chart</button>
    </nav>

    <!-- Chart with keyboard support -->
    <ejs-bulletchart
      ref="chartRef"
      id="mainChart"
      tabindex="0"
      :dataSource="data"
      @focus="onChartFocus"
      @blur="onChartBlur"
    ></ejs-bulletchart>

    <!-- Status indicator -->
    <p v-if="isChartFocused" role="status">
      Chart is focused. Press Ctrl+P to print or Tab to move focus.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const chartRef = ref(null)
const isChartFocused = ref(false)
const data = ref([{ value: 270, target: 250 }])

const focusChart = () => {
  document.getElementById('mainChart')?.focus()
}

const printChart = () => {
  chartRef.value?.print()
}

const onChartFocus = () => {
  isChartFocused.value = true
}

const onChartBlur = () => {
  isChartFocused.value = false
}
</script>
```

### Testing Keyboard Navigation

1. Click chart to focus
2. Press <kbd>Tab</kbd> → Should move to next focusable element
3. Press <kbd>Shift + Tab</kbd> → Should return to chart
4. Focus chart and press <kbd>Ctrl + P</kbd> → Should open print dialog

## Screen Reader Support

Ensure screen readers can interpret charts:

### Add Semantic Structure

```vue
<template>
  <div role="region" aria-label="Sales performance metrics">
    <h2>Sales Performance Dashboard</h2>
    
    <section aria-labelledby="salesChart">
      <h3 id="salesChart">Q1 Sales Performance</h3>
      <p>Comparison of actual sales ($450K) vs target ($400K)</p>
      
      <ejs-bulletchart
        :dataSource="data"
        title="Q1 Sales"
        aria-describedby="chartDescription"
      ></ejs-bulletchart>
      
      <p id="chartDescription">
        The chart shows actual sales performance against target. 
        Actual: $450K (green bar), Target: $400K (black line).
        Status: Exceeded target by $50K.
      </p>
    </section>
  </div>
</template>

<script setup>
const data = ref([{ value: 450, target: 400 }])
</script>
```

### Provide Text Alternative

```vue
<template>
  <div>
    <!-- Visual chart -->
    <ejs-bulletchart
      :dataSource="data"
      title="Q1 2024 Revenue"
    ></ejs-bulletchart>

    <!-- Text table alternative (for screen readers) -->
    <table class="sr-only">  <!-- Visible to screen readers only -->
      <caption>Q1 2024 Revenue Performance</caption>
      <thead>
        <tr><th>Metric</th><th>Value</th></tr>
      </thead>
      <tbody>
        <tr><td>Actual Revenue</td><td>$450,000</td></tr>
        <tr><td>Target Revenue</td><td>$400,000</td></tr>
        <tr><td>Variance</td><td>+$50,000 (12.5% above target)</td></tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>

<script setup>
const data = ref([{ value: 450, target: 400 }])
</script>
```

## ARIA Attributes

Use ARIA (Accessible Rich Internet Applications) attributes:

### Common ARIA Attributes

```vue
<template>
  <ejs-bulletchart
    aria-label="Sales actual vs target comparison"
    <!-- Describes purpose for screen readers -->
    
    aria-describedby="chartInfo"
    <!-- Links to detailed description -->
    
    role="region"
    <!-- Identifies as important region -->
  ></ejs-bulletchart>

  <div id="chartInfo">
    <h3>Chart Information</h3>
    <p>Actual sales: $450K, Target: $400K, Status: Exceeding target</p>
  </div>
</template>
```

### Comprehensive ARIA Example

```vue
<template>
  <div 
    role="region"
    aria-label="Performance Dashboard"
    aria-live="polite"
    aria-atomic="false"
  >
    <h2>Department Performance</h2>

    <div v-for="dept in departments" :key="dept.id">
      <ejs-bulletchart
        :id="`chart-${dept.id}`"
        :aria-label="`${dept.name} performance chart`"
        :aria-describedby="`desc-${dept.id}`"
        :dataSource="[dept]"
        valueField="actual"
        targetField="target"
      ></ejs-bulletchart>
      
      <p :id="`desc-${dept.id}`">
        {{ dept.name }}: Actual {{ dept.actual }}%, Target {{ dept.target }}%,
        Status: {{ dept.actual >= dept.target ? 'Met' : 'Below' }} target
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const departments = ref([
  { id: 1, name: 'Engineering', actual: 92, target: 90 },
  { id: 2, name: 'QA', actual: 78, target: 85 },
  { id: 3, name: 'Sales', actual: 88, target: 80 }
])
</script>
```

## Color Contrast

Ensure sufficient color contrast for readability:

### WCAG Contrast Requirements

| Criterion | Minimum Ratio | Examples |
|-----------|----------------|----------|
| **AA - Normal text** | 4.5:1 | Black text on white: 21:1 ✅ |
| **AA - Large text** | 3:1 | Large text needs less contrast |
| **AAA - Normal text** | 7:1 | Enhanced contrast |

### Test Color Contrast

Use tools:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Oracle](http://colororacle.org/) - Colorblind simulator
- Browser DevTools - Built-in accessibility checker

### Color Combinations to Avoid

❌ **Poor Contrast:**
```vue
<!-- Text too light on light background -->
<span style="color: #CCCCCC; background: #FFFFFF">Text</span>  <!-- 1.1:1 ❌ -->

<!-- Red on green (problematic for colorblind) -->
<div style="color: red; background: green">Text</div>  <!-- 2.5:1 but colorblind issue -->
```

✅ **Good Contrast:**
```vue
<!-- Dark text on light background -->
<span style="color: #0D1B2A; background: #FFFFFF">Text</span>  <!-- 15.3:1 ✅ -->

<!-- Blue and yellow (universally accessible) -->
<div style="color: #0066CC; background: #FFFF00">Text</div>  <!-- 11:1 ✅ -->
```

### Accessible Bullet Chart Colors

```vue
<template>
  <ejs-bulletchart
    :titleStyle="{ color: '#0D1B2A' }"  <!-- Very dark blue: 15:1 on white -->
  >
    <e-bullet-range-collection>
      <!-- WCAG AA compliant colors -->
      <e-bullet-range end="35" color="#D32F2F"></e-bullet-range>   <!-- Red: 5.2:1 -->
      <e-bullet-range end="50" color="#F57C00"></e-bullet-range>   <!-- Orange: 4.5:1 -->
      <e-bullet-range end="100" color="#1976D2"></e-bullet-range>  <!-- Blue: 6.3:1 -->
    </e-bullet-range-collection>
  </ejs-bulletchart>
</template>
```

## RTL Layout

Support right-to-left languages (Arabic, Hebrew, Farsi):

### Enable RTL

```vue
<template>
  <div dir="rtl" class="rtl-container">
    <ejs-bulletchart
      :dataSource="data"
      :enableRtl="true"
    ></ejs-bulletchart>
  </div>
</template>

<style scoped>
.rtl-container {
  direction: rtl;
  text-align: right;
}
</style>

<script setup>
const data = ref([{ value: 85, target: 80 }])
</script>
```

## Print Functionality

Enable printing with good formatting:

### Print Settings

```vue
<template>
  <div>
    <button @click="printChart" class="print-button">
      🖨️ Print Chart
    </button>

    <ejs-bulletchart
      ref="chartRef"
      :dataSource="data"
      :animation="{ enable: false }"  <!-- Disable animation for print -->
    ></ejs-bulletchart>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const chartRef = ref(null)
const data = ref([{ value: 270, target: 250 }])

const printChart = () => {
  if (chartRef.value) {
    chartRef.value.print()
  }
}
</script>

<style>
@media print {
  .print-button {
    display: none;  /* Hide button in print */
  }

  /* Ensure good printing quality */
  svg {
    max-width: 100%;
  }
}
</style>
```

## Performance Optimization

Optimize chart rendering for large datasets:

### Lazy Loading Charts

```vue
<template>
  <div>
    <div v-for="metric in visibleMetrics" :key="metric.id">
      <ejs-bulletchart
        :dataSource="[metric]"
        :animation="{ enable: false }"
      ></ejs-bulletchart>
    </div>

    <button @click="loadMore" v-if="hasMore">
      Load More Charts
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const metrics = ref([/* 100+ metrics */])
const displayCount = ref(10)

const visibleMetrics = computed(() => metrics.value.slice(0, displayCount.value))
const hasMore = computed(() => displayCount.value < metrics.value.length)

const loadMore = () => {
  displayCount.value += 10
}
</script>
```

### Disable Animations for Performance

```vue
<template>
  <ejs-bulletchart
    :dataSource="data"
    :animation="{ enable: false }"  <!-- Disable for many charts -->
  ></ejs-bulletchart>
</template>
```

### Virtual Scrolling for Dashboards

```vue
<template>
  <virtual-scroller
    :items="metrics"
    :item-height="150"
    class="chart-list"
  >
    <template #default="{ item }">
      <div class="chart-container">
        <ejs-bulletchart
          :dataSource="[item]"
          height="120px"
        ></ejs-bulletchart>
      </div>
    </template>
  </virtual-scroller>
</template>
```

## Troubleshooting

### Issue 1: Keyboard Focus Not Working

**Problem:** Chart doesn't respond to Tab key

**Solution:**
```vue
<ejs-bulletchart
  tabindex="0"  <!-- Must add this -->
  :dataSource="data"
></ejs-bulletchart>
```

### Issue 2: Screen Reader Doesn't Describe Chart

**Problem:** Screen reader doesn't read chart information

**Solutions:**
1. Add aria-label
2. Add descriptive text near chart
3. Provide text table alternative

```vue
<template>
  <section aria-labelledby="chartTitle">
    <h2 id="chartTitle">Sales Performance</h2>
    
    <ejs-bulletchart
      aria-label="Sales actual vs target"
      :dataSource="data"
    ></ejs-bulletchart>
    
    <p>Details: Actual $450K vs Target $400K</p>
  </section>
</template>
```

### Issue 3: Color Contrast Fails Accessibility Check

**Problem:** WAVE or Axe-core reports contrast failure

**Solution:** Use contrast checker and adjust colors:
```vue
<e-bullet-range>
  <!-- ❌ Bad: #CCCCCC on white background (1.1:1) -->
  <!-- ✅ Good: #0D1B2A on white background (15.3:1) -->
  <e-bullet-range end="50" color="#0D1B2A"></e-bullet-range>
</e-bullet-range>
```

### Issue 4: Print Output Looks Bad

**Problem:** Printed chart is cut off or has wrong size

**Solutions:**
1. Use fixed dimensions in print media
2. Disable animations before print
3. Add page breaks for multiple charts

```vue
<style>
@media print {
  .chart-container {
    page-break-inside: avoid;  /* Don't cut chart across pages -->
    width: 100%;
    height: auto;
  }
}
</style>
```

## Accessibility Checklist

Before deploying to production:

```
✅ Keyboard Navigation
  □ Tab key works
  □ Shift+Tab works  
  □ Ctrl+P prints

✅ Screen Reader
  □ Title is readable
  □ Tooltip works with reader
  □ Description provided

✅ Color & Contrast
  □ Contrast ≥ 4.5:1 (AA)
  □ Not color-dependent alone
  □ Tested with colorblind simulator

✅ ARIA
  □ aria-label set
  □ aria-describedby links to description
  □ role="region" added

✅ Mobile/Touch
  □ Touch targets ≥ 44x44px
  □ Touch alternatives for hover

✅ Performance
  □ Animations smooth
  □ No lag on large datasets
  □ Print works correctly
```

---

**Congratulations!** You've completed the Bullet Chart implementation guide. You can now:
- ✅ Create accessible bullet charts
- ✅ Configure data binding
- ✅ Customize appearance
- ✅ Enable interactive features
- ✅ Follow WCAG standards

**For support:** Refer to [Syncfusion Bullet Chart Documentation](https://ej2.syncfusion.com/vue/documentation/bullet-chart/getting-started) or review other reference files.
