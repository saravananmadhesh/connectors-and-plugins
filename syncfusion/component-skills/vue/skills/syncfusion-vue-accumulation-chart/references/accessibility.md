# Accessibility and Keyboard Support

## Table of Contents
- [WCAG and Section 508 Compliance](#wcag-and-section-508-compliance)
  - [Accessibility Status](#accessibility-status)
  - [Compliance Summary](#compliance-summary)
- [Keyboard Navigation](#keyboard-navigation)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
  - [Keyboard Navigation Example](#keyboard-navigation-example)
  - [Tab Order Considerations](#tab-order-considerations)
- [Screen Reader Support](#screen-reader-support)
  - [Screen Reader Friendly Setup](#screen-reader-friendly-setup)
  - [Screen Reader Announcements](#screen-reader-announcements)
- [ARIA Attributes](#aria-attributes)
  - [Supported Roles and Attributes](#supported-roles-and-attributes)
  - [Example: ARIA-Enhanced Chart](#example-aria-enhanced-chart)
- [Right-to-Left Support](#right-to-left-support)
  - [Enable RTL Mode](#enable-rtl-mode)
  - [RTL Considerations](#rtl-considerations)
- [Color Contrast](#color-contrast)
  - [Color Contrast Standards](#color-contrast-standards)
  - [Best Practices](#best-practices)
  - [Test Color Contrast](#test-color-contrast)
  - [High Contrast Theme Example](#high-contrast-theme-example)
- [Mobile Device Accessibility](#mobile-device-accessibility)
  - [Touch-Friendly Implementation](#touch-friendly-implementation)
  - [Touch Gesture Support](#touch-gesture-support)
- [Complete Accessible Chart Example](#complete-accessible-chart-example)
  - [Keyboard Instructions](#keyboard-instructions)
  - [Accessible Data Table](#accessible-data-table)
- [Validation and Testing](#validation-and-testing)
  - [Automated Testing Tools](#automated-testing-tools)
  - [Manual Testing Checklist](#manual-testing-checklist)
- [Resources](#resources)
- [Next Steps](#next-steps)

---

## WCAG and Section 508 Compliance

The Syncfusion Accumulation Chart component complies with:
- **WCAG 2.2** Level AA standards
- **Section 508** accessibility requirements
- **ADA** (Americans with Disabilities Act) guidelines

### Accessibility Status

| Criteria | Support |
|----------|---------|
| WCAG 2.2 | ✅ Full Support |
| Section 508 | ✅ Full Support |
| Screen Reader | ✅ Full Support |
| Right-to-Left | ✅ Full Support |
| Keyboard Navigation | ✅ Full Support |
| Color Contrast | ✅ Full Support |
| Mobile Accessibility | ✅ Full Support |

---

## Keyboard Navigation

Navigate and interact with charts using keyboard only.

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt + J` | Focus chart container |
| `Tab` | Move to next element |
| `Shift + Tab` | Move to previous element |
| `↓` / `←` | Focus left/previous data point |
| `↑` / `→` | Focus right/next data point |
| `Enter` / `Space` | Toggle series visibility (legend) |
| `Ctrl + P` | Print chart |

### Keyboard Navigation Example

```vue
<template>
  <div>
    <h2>Press Alt + J to focus chart</h2>
    <ejs-accumulationchart id="container" :accessibility="accessibility">
      <e-accumulation-series-collection>
        <e-accumulation-series 
          :dataSource="seriesData" 
          xName="x" 
          yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </div>
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
      accessibility: {
        tabIndex: 0
      }
    }
  }
}
</script>

<style>
#container {
  height: 400px;
  outline: 1px solid #ccc;
}

#container:focus {
  outline: 2px solid #0066cc;
}
</style>
```

### Tab Order Considerations

Ensure logical tab order through chart elements:

```vue
// Good: Elements in reading order
// Chart with Tooltips → Legend items → Controls

// Avoid: Random tab order that confuses navigation
```

---

## Screen Reader Support

Charts are fully compatible with screen readers like NVDA, JAWS, and VoiceOver.

### Screen Reader Friendly Setup

```vue
<template>
  <div role="region" aria-label="Browser Market Share Chart">
    <!-- Chart title -->
    <h2 id="chart-title">Browser Distribution by Market Share</h2>
    
    <!-- Chart -->
    <ejs-accumulationchart 
      id="container"
      :accessibility="accessibility">
      <e-accumulation-series-collection>
        <e-accumulation-series 
          :dataSource="seriesData" 
          xName="x" 
          yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
    
    <!-- Accessible data table as alternative -->
    <div id="chart-description" class="sr-only">
      <h3>Data Table</h3>
      <table>
        <thead>
          <tr>
            <th>Browser</th>
            <th>Market Share (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in seriesData" :key="item.x">
            <td>{{ item.x }}</td>
            <td>{{ item.y }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
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
      accessibility: {
        accessibilityDescription: 'chart-description'
      }
    }
  }
}
</script>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

### Screen Reader Announcements

The chart announces:
- Chart type and title
- Number of data series
- Each data point (category and value)
- Legend items
- User interactions

---

## ARIA Attributes

The component uses WAI-ARIA attributes for accessibility.

### Supported ARIA Roles and Attributes

| Role/Attribute | Purpose |
|---|---|
| `role="region"` | Identifies chart as important section |
| `role="button"` | Legend items and interactive elements |
| `aria-label` | Text alternative for elements |
| `aria-hidden` | Hides decorative elements |
| `aria-pressed` | Toggle state for legend items |

### Example: ARIA-Enhanced Chart

```vue
<template>
  <div role="region" aria-live="polite">
    <h2 id="title">Sales Distribution</h2>
    
    <ejs-accumulationchart 
      id="chart"
      role="img"
      :accessibility="accessibility">
      <e-accumulation-series-collection>
        <e-accumulation-series 
          :dataSource="seriesData" 
          xName="x" 
          yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
    
    <p id="description">
      Pie chart showing sales distribution across 4 regions.
      Press Alt+J to focus and use arrow keys to navigate.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'Region A', y: 35 },
        { x: 'Region B', y: 28 },
        { x: 'Region C', y: 22 },
        { x: 'Region D', y: 15 }
      ],
      accessibility: {
        accessibilityDescription: 'description'
      }
    }
  }
}
</script>
```

---

## Right-to-Left Support

Full RTL language support for Arabic, Hebrew, Persian, etc.

### Enable RTL Mode

```vue
<template>
  <!-- Method 1: HTML attribute -->
  <div dir="rtl">
    <ejs-accumulationchart id="container" enableRtl="true">
      <e-accumulation-series-collection>
        <e-accumulation-series 
          :dataSource="seriesData" 
          xName="x" 
          yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seriesData: [
        { x: 'الفئة أ', y: 30 },
        { x: 'الفئة ب', y: 25 },
        { x: 'الفئة ج', y: 45 }
      ]
    }
  }
}
</script>
```

### RTL Considerations

In RTL mode:
- Chart renders right-to-left
- Legend items flow from right to left
- Angles and rotations adjust automatically
- Text alignment reverses
- All interactions work identically

---

## Color Contrast

Ensure sufficient contrast between chart elements and backgrounds.

### Color Contrast Standards

**WCAG AA Compliance:**
- Text vs background: Minimum 4.5:1 ratio
- Graphical elements: Minimum 3:1 ratio

### Best Practices

```vue
// Good color combinations with sufficient contrast
const accessibleColors = [
  '#000000', // Black on white
  '#003399', // Dark blue on light background
  '#CC0000', // Dark red on light background
  '#006600', // Dark green on light background
  '#FFCC00', // Yellow on dark background
  '#FFFFFF'  // White on dark background
]

// Avoid
const poorContrast = [
  '#FFFF00', // Yellow on white (low contrast)
  '#CCCCCC', // Light gray on white (low contrast)
  '#AAAAAA'  // Gray on light background
]
```

### Test Color Contrast

Use tools like:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessible Colors](https://accessible-colors.com/)
- Browser DevTools (Accessibility tab)

### High Contrast Theme Example

```vue
<template>
  <ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
      <e-accumulation-series 
        :dataSource="highContrastData" 
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
      highContrastData: [
        { x: 'Chrome', y: 37, color: '#000000' },     // Black
        { x: 'Firefox', y: 28, color: '#FFFF00' },    // Yellow
        { x: 'Safari', y: 19, color: '#FFFFFF' },     // White
        { x: 'Others', y: 16, color: '#00FF00' }      // Green
      ]
    }
  }
}
</script>

<style>
#container {
  height: 400px;
  background: #000000;  /* Dark background */
}
</style>
```

---

## Mobile Device Accessibility

Charts work on mobile and touch devices with full accessibility.

### Touch-Friendly Implementation

```vue
<template>
  <div class="mobile-chart">
    <!-- Larger touch targets -->
    <button class="touch-button" @click="updateData">Update Data</button>
    <button class="touch-button" @click="toggleLegend">Toggle Legend</button>
    
    <ejs-accumulationchart 
      id="container"
      ref="chart"
      :tooltip="tooltip"
      :pointClick="onPointClick">
      <e-accumulation-series-collection>
        <e-accumulation-series 
          :dataSource="seriesData" 
          xName="x" 
          yName="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
    
    <p role="status" aria-live="polite">{{ statusMessage }}</p>
  </div>
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
      tooltip: {
        enable: true
      },
      statusMessage: ''
    }
  },
  methods: {
    onPointClick(args) {
      this.statusMessage = `Selected: ${args.point.x} with value ${args.point.y}`
    },
    updateData() {
      this.statusMessage = 'Data updated'
    },
    toggleLegend() {
      this.statusMessage = 'Legend toggled'
    }
  }
}
</script>

<style>
.mobile-chart {
  padding: 10px;
}

.touch-button {
  padding: 15px 20px;  /* Larger touch target (minimum 48x48px) */
  margin: 5px;
  font-size: 16px;
  background: #498fff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  touch-action: manipulation;
}

.touch-button:active {
  background: #3a6fd9;
  transform: scale(0.98);
}

#container {
  height: 400px;
  width: 100%;
  max-width: 600px;
}

/* Ensure text is readable on mobile */
@media (max-width: 768px) {
  #container {
    height: 300px;
  }
  
  .touch-button {
    width: 100%;
    font-size: 18px;
  }
}
</style>
```

### Touch Gesture Support

- **Tap:** Click on data points or legend items
- **Swipe:** Navigate through paged legends
- **Pinch:** Zoom (if implemented)
- **Long press:** Access context menu

---

## Complete Accessible Chart Example

```vue
<template>
  <div role="region" aria-label="Accessible Chart Example">
    <!-- Chart title -->
    <h2 id="chart-title">Browser Market Share Distribution</h2>
    
    <!-- Description for screen readers -->
    <p id="chart-description" class="sr-only">
      Interactive pie chart showing market share by browser.
      Use keyboard arrow keys to navigate data points.
      Press Enter to toggle series visibility.
    </p>
    
    <!-- Accessible chart -->
    <ejs-accumulationchart 
      id="container"
      dir="ltr"
      tabindex="0"
      role="img"
      :accessibility="accessibility"
      :tooltip="tooltip">
      <e-accumulation-series-collection>
        <e-accumulation-series 
          :dataSource="seriesData" 
          xName="x" 
          yName="y"
          :dataLabel="dataLabel">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
    
    <!-- Keyboard instructions -->
    <div class="instructions">
      <h3>Keyboard Navigation:</h3>
      <ul>
        <li><kbd>Alt + J</kbd> - Focus chart</li>
        <li><kbd>Arrow Keys</kbd> - Navigate data points</li>
        <li><kbd>Enter/Space</kbd> - Toggle series</li>
      </ul>
    </div>
    
  </div>
</template>

<script>
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries, AccumulationDataLabel, AccumulationTooltip } from "@syncfusion/ej2-vue-charts"

export default {
  name: "AccessibleChart",
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
      dataLabel: {
        visible: true,
        position: 'Outside'
      },
      tooltip: {
        enable: true,
        format: '<b>${point.x}</b><br/>Market Share: ${point.y}%'
      },
      accessibility: {
        accessibilityDescription: 'chart-description'
      }
    }
  },
  provide: {
    accumulationchart: [PieSeries, AccumulationDataLabel, AccumulationTooltip]
  }
}
</script>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

#container {
  height: 400px;
  margin: 20px 0;
  border: 1px solid #ddd;
}

.instructions {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
  margin: 20px 0;
}

kbd {
  background: #f0f0f0;
  border: 1px solid #ccc;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}
</style>
```

---

## Validation and Testing

### Automated Testing Tools

- **axe DevTools** - Accessibility audit
- **WAVE** - Web accessibility evaluation
- **Lighthouse** - Chrome DevTools audit
- **Screen Reader Testing** - NVDA, JAWS, VoiceOver

### Manual Testing Checklist

- [ ] Keyboard navigation works completely
- [ ] Screen reader announces all content
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets are at least 48x48px
- [ ] Focus indicators visible
- [ ] Error messages clear and descriptive
- [ ] Responsive on mobile devices

---

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Section 508 Standards](https://www.section508.gov/)
- [Syncfusion Accessibility](https://www.syncfusion.com/products/features/accessible-components)

---

## Next Steps

- Review all references in main skill
- Implement accessibility in your charts
- Test with real assistive technologies
