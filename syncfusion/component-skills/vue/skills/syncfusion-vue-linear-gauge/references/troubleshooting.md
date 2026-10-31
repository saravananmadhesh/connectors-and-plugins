# Troubleshooting

## Table of Contents
- [Installation Issues](#installation-issues)
  - [Module Not Found Error](#module-not-found-error)
  - [License Key Warning](#license-key-warning)
  - [Version Conflicts](#version-conflicts)
- [Rendering Problems](#rendering-problems)
  - [Gauge Not Displaying](#gauge-not-displaying)
  - [Blank or Empty Gauge](#blank-or-empty-gauge)
  - [Partially Rendered Gauge](#partially-rendered-gauge)
- [Data Binding Issues](#data-binding-issues)
  - [Pointer Not Updating When Data Changes](#pointer-not-updating-when-data-changes)
  - [Reactive Data Binding Not Working](#reactive-data-binding-not-working)
  - [Data Out of Range](#data-out-of-range)
- [Styling Issues](#styling-issues)
  - [Pointer Color Not Applying](#pointer-color-not-applying)
  - [Labels Not Visible](#labels-not-visible)
  - [Custom CSS Not Applied](#custom-css-not-applied)
- [Event Handling Problems](#event-handling-problems)
  - [Events Not Firing](#events-not-firing)
  - [Drag Events Not Working](#drag-events-not-working)
  - [Tooltip Not Showing](#tooltip-not-showing)
- [Performance Issues](#performance-issues)
  - [Gauge Runs Slowly with Real-Time Updates](#gauge-runs-slowly-with-real-time-updates)
  - [Many Gauges on Same Page Slow Down Rendering](#many-gauges-on-same-page-slow-down-rendering)
- [Browser Issues](#browser-issues)
  - [Gauge Not Rendering in IE11](#gauge-not-rendering-in-ie11)
  - [Different Appearance in Different Browsers](#different-appearance-in-different-browsers)
  - [Mobile/Touch Issues](#mobiletouch-issues)
- [Known Limitations](#known-limitations)
  - [Limitation 1: Maximum Pointer Count](#limitation-1-maximum-pointer-count)
  - [Limitation 2: Animation Performance](#limitation-2-animation-performance)
  - [Limitation 3: Large Scale Ranges](#limitation-3-large-scale-ranges)
  - [Limitation 4: Custom Shapes](#limitation-4-custom-shapes)
  - [Limitation 5: Z-Index Stacking](#limitation-5-z-index-stacking)
- [Getting More Help](#getting-more-help)
  - [Check Documentation](#check-documentation)
  - [Enable Debug Mode](#enable-debug-mode)
  - [Common Debug Checks](#common-debug-checks)
  - [Create Minimal Reproduction](#create-minimal-reproduction)

## Installation Issues

### Module Not Found Error

**Problem:** `Cannot find module '@syncfusion/ej2-vue-gauges'`

**Solution:**
```bash
# Install the package
npm install @syncfusion/ej2-vue-gauges

# Verify installation
npm list @syncfusion/ej2-vue-gauges

# Clear node_modules and reinstall if needed
rm -rf node_modules package-lock.json
npm install
```

### License Key Warning

**Problem:** Console warning about license key

**Solution:** Add Syncfusion license key in your main.js:

```javascript
// main.js
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('YOUR_LICENSE_KEY');
```

### Version Conflicts

**Problem:** Dependency conflicts with other packages

**Solution:** Use compatible versions:

```bash
# Check for dependency conflicts
npm audit

# Update to compatible version
npm install @syncfusion/ej2-vue-gauges@latest

# Or specify exact version
npm install @syncfusion/ej2-vue-gauges@20.0.0
```

## Rendering Problems

### Gauge Not Displaying

**Problem:** Component renders but gauge is invisible

**Solutions:**

1. Verify container has dimensions:
```css
.gauge-container {
  width: 400px;
  height: 200px;
}
```

2. Check browser console for errors

### Blank or Empty Gauge

**Problem:** Gauge renders but shows no content

**Check:**
```javascript
// Verify axes exist
axes: [{
  minimum: 0,
  maximum: 100
}]

// Verify pointers have values
pointers: [{
  value: 50,      // Must be between minimum and maximum
  type: 'Marker'
}]
```

### Partially Rendered Gauge

**Problem:** Only parts of gauge display

**Solution:** Ensure axes and pointers are properly configured:

```javascript
// Complete minimal example
axes: [{
  minimum: 0,
  maximum: 100,
  line: { width: 2 },
  majorTicks: { interval: 10 },
  pointers: [{
    value: 50,
    type: 'Marker'
  }]
}]
```

## Data Binding Issues

### Pointer Not Updating When Data Changes

**Problem:** Pointer value doesn't change when component data updates

**Incorrect Approach:**
```javascript
// This alone won't work
this.axes[0].pointers[0].value = 75;
```

**Correct Approach:**
```javascript
// Use setPointerValue method
const gauge = document.getElementById('linearGauge').ej2_instances[0];
gauge.setPointerValue(0, 0, 75);
```

### Reactive Data Binding Not Working

**Problem:** Changes to data don't reflect in gauge

**Solution:** Use watch or manual updates:

```vue
<script>
export default {
  data() {
    return {
      pointerValue: 50
    };
  },
  watch: {
    pointerValue(newVal) {
      // Manual update required
      const gauge = document.getElementById('linearGauge').ej2_instances[0];
      gauge.setPointerValue(0, 0, newVal);
    }
  }
};
</script>
```

### Data Out of Range

**Problem:** Pointer disappears when value exceeds axis bounds

**Solution:** Ensure pointer value is within axis range:

```javascript
// Axis range
minimum: 0,
maximum: 100,

// Pointer value must be between 0-100
value: 50  // ✓ Valid
value: 150 // ✗ Outside range - won't display
```

**Safe Update:**
```javascript
updatePointer(newValue) {
  // Clamp value to axis range
  const min = this.axes[0].minimum;
  const max = this.axes[0].maximum;
  const clampedValue = Math.max(min, Math.min(max, newValue));
  
  const gauge = document.getElementById('linearGauge').ej2_instances[0];
  gauge.setPointerValue(0, 0, clampedValue);
}
```

## Styling Issues

### Pointer Color Not Applying

**Problem:** Custom color doesn't appear

**Solution:** Ensure color format is valid:

```javascript
// Valid formats
color: '#FF0000'           // Hex
color: 'red'               // Named color
color: 'rgb(255, 0, 0)'   // RGB

// Invalid formats won't work
color: 'FF0000'           // Missing #
color: '#GGGGGG'          // Invalid hex
```

### Labels Not Visible

**Problem:** Axis labels don't appear

**Solutions:**
1. Check font color vs background:
```javascript
labelStyle: {
  color: '#000000',  // Ensure contrast
  font: { size: '12px' }
}
```

2. Ensure label offset is adequate:
```javascript
labelStyle: {
  offset: 15         // Distance from axis
}
```

3. Check if labels are clipped:
```css
.gauge-container {
  width: 400px;
  height: 300px;  /* Increase height */
}
```

### Custom CSS Not Applied

**Problem:** Custom CSS rules don't affect gauge

**Solution:** Use proper selectors and specificity:

```css
/* Correct way - target gauge element */
#linearGauge .e-axis-line {
  stroke: red;
}

/* Might not work if selector is too weak */
.e-axis-line {
  stroke: red;
}

/* Use !important if needed */
.e-lineargauge .e-axis-line {
  stroke: red !important;
}
```

## Event Handling Problems

### Events Not Firing

**Problem:** Event handlers not called

**Solution:** Verify event binding:

```vue
<!-- Correct event name -->
<ejs-lineargauge @pointerValueChange="onValueChange"></ejs-lineargauge>

<!-- Check method exists -->
methods: {
  onValueChange(args) {
    console.log('Value changed to:', args.value);
  }
}
```

### Drag Events Not Working

**Problem:** Pointer drag doesn't trigger events

**Solution:** Enable pointer drag and verify settings:

```javascript
<ejs-lineargauge :enablePointerDrag="true"></ejs-lineargauge>

// Verify drag settings
dragSettings: {
  enable: true,
  minValue: 0,
  maxValue: 100
}
```

### Tooltip Not Showing

**Problem:** Tooltips don't appear on hover

**Solution:** Enable and configure tooltip:

```javascript
<ejs-lineargauge :tooltip="tooltipSettings"></ejs-lineargauge>

tooltipSettings: {
  enable: true,
  showAtMousePosition: false
}
```

## Performance Issues

### Gauge Runs Slowly with Real-Time Updates

**Problem:** High CPU usage or janky animations

**Solutions:**

1. Disable animation:
```javascript
pointers: [{
  animationDuration: 0  // Remove animation overhead
}]
```

2. Reduce update frequency:
```javascript
// Update every 500ms instead of every 100ms
setInterval(updateGauge, 500);
```

3. Simplify configuration:
```javascript
// Remove unnecessary elements
minorTicks: null,  // Disable if not needed
majorTicks: { interval: 50 }  // Larger intervals
```

### Many Gauges on Same Page Slow Down Rendering

**Problem:** Multiple gauges cause lag

**Solution:** Use virtual scrolling or lazy loading:

```vue
<template>
  <div class="gauge-list">
    <ejs-lineargauge 
      v-for="gauge in visibleGauges"
      :key="gauge.id"
      :axes="gauge.axes"
    ></ejs-lineargauge>
  </div>
</template>

<script>
export default {
  computed: {
    visibleGauges() {
      // Return only currently visible gauges
      return this.gauges.slice(this.startIndex, this.endIndex);
    }
  }
};
</script>
```

## Browser Issues

### Gauge Not Rendering in IE11

**Problem:** Blank area or error in Internet Explorer

**Solution:** Add polyfills:

```javascript
// main.js - before Syncfusion imports
import '@syncfusion/ej2-base/dist/ej2-base.min';

// Or use individual polyfills
import 'core-js/stable';
```

### Different Appearance in Different Browsers

**Problem:** Gauge looks different in Chrome vs Firefox

**Solution:** Test with different themes and ensure CSS compatibility:

```css
/* Use vendor prefixes */
.e-lineargauge .e-axis-line {
  -webkit-stroke: red;
  stroke: red;
}
```

### Mobile/Touch Issues

**Problem:** Pointer drag doesn't work on mobile

**Solution:** Ensure touch is enabled:

```javascript
<ejs-lineargauge 
  :enablePointerDrag="true"
  @pointerValueChange="onValueChange"
></ejs-lineargauge>

// Test on actual mobile device or browser dev tools touch simulation
```

## Known Limitations

### Limitation 1: Maximum Pointer Count

**Description:** Performance degrades with 10+ pointers on same axis

**Workaround:** Use fewer pointers or split across multiple axes

### Limitation 2: Animation Performance

**Description:** Complex animations with many elements can be slow

**Workaround:** Disable animation or reduce pointer/range count

### Limitation 3: Large Scale Ranges

**Description:** Axis ranges exceeding 1 million show precision issues

**Workaround:** Scale values or use scientific notation

### Limitation 4: Custom Shapes

**Description:** Only predefined marker shapes supported (no custom SVG)

**Workaround:** Use markerType: 'Image' with SVG or PNG files

### Limitation 5: Z-Index Stacking

**Description:** Z-index limited to 0-10 for gauge elements

**Workaround:** Use CSS stacking context or avoid overlapping annotations

## Getting More Help

### Check Documentation
- Official Syncfusion documentation
- Vue component guide
- API reference

### Enable Debug Mode

```javascript
// Console logging for debugging
export default {
  methods: {
    debugGauge() {
      const gauge = document.getElementById('linearGauge').ej2_instances[0];
      console.log('Gauge instance:', gauge);
      console.log('Axes:', gauge.axes);
      console.log('Pointers:', gauge.axes[0].pointers);
    }
  }
};
```

### Common Debug Checks

```javascript
// Verify gauge instance exists
const gauge = document.getElementById('linearGauge').ej2_instances[0];
if (!gauge) console.error('Gauge not initialized');

// Check pointer values
console.log('Current pointer value:', gauge.axes[0].pointers[0].value);

// Verify CSS loaded
console.log('Theme CSS:', document.styleSheets.length);

// Check for console errors
// Open browser DevTools → Console tab
```

### Create Minimal Reproduction

If issue persists:

1. Create minimal example with just problematic feature
2. Remove all unrelated code
3. Share complete code snippet
4. Include console errors and expected vs actual behavior
