# Print, Export, and Advanced Features

## Table of Contents
- [Print Functionality](#print-functionality)
  - [Basic Printing](#basic-printing)
  - [Print Settings Configuration](#print-settings-configuration)
  - [Print Multiple Gauges](#print-multiple-gauges)
- [Export to Images](#export-to-images)
  - [Export to PNG](#export-to-png)
  - [Export to SVG](#export-to-svg)
  - [Export with Custom Filename](#export-with-custom-filename)
  - [Export Multiple Gauges to Single Document](#export-multiple-gauges-to-single-document)
- [Export Formats](#export-formats)
  - [Available Export Options](#available-export-options)
  - [Format Comparison](#format-comparison)
  - [Export Quality Settings](#export-quality-settings)
- [RTL Support](#rtl-support)
  - [Enabling RTL](#enabling-rtl)
  - [RTL Layout Impact](#rtl-layout-impact)
  - [Multi-Language with RTL](#multi-language-with-rtl)
- [Accessibility Features](#accessibility-features)
  - [ARIA Attributes](#aria-attributes)
  - [Keyboard Navigation](#keyboard-navigation)
  - [High Contrast Mode](#high-contrast-mode)
  - [Screen Reader Support](#screen-reader-support)
  - [WCAG 2.1 Compliance](#wcag-21-compliance)
- [Internationalization](#internationalization)
  - [Language Configuration](#language-configuration)
  - [Locale-Specific Formatting](#locale-specific-formatting)
  - [Number Formatting by Locale](#number-formatting-by-locale)
- [Advanced Configuration](#advanced-configuration)
  - [Gauge Serialization](#gauge-serialization)
  - [Dynamic Gauge Recreation](#dynamic-gauge-recreation)
  - [Gauge Refresh and Update](#gauge-refresh-and-update)
  - [Browser Compatibility](#browser-compatibility)
  - [Performance Optimization](#performance-optimization)
  - [Memory Management](#memory-management)


## Print Functionality

Print the gauge as part of a document or standalone.

### Basic Printing

```vue
<template>
  <div>
    <button @click="printGauge">Print Gauge</button>
    <ejs-circulargauge 
      id="container"
      ref="gauge"
      :axes="axes"
    ></ejs-circulargauge>
  </div>
</template>

<script>
export default {
  methods: {
    printGauge() {
      this.$refs.gauge.print();
    }
  }
}
</script>
```

### Print Settings Configuration

```javascript
printSettings: {
  type: 'SVG',                    // 'SVG' or 'PDF'
  orientation: 'Portrait',        // 'Portrait' or 'Landscape'
  mode: 'Print',                  // Print mode
  width: '8.5in',                 // Page width
  height: '11in'                  // Page height
}
```

### Print Multiple Gauges

```vue
<template>
  <div>
    <button @click="printAll">Print All Gauges</button>
    
    <h2>CPU Usage</h2>
    <ejs-circulargauge 
      ref="cpuGauge"
      :axes="cpuAxis"
    ></ejs-circulargauge>
    
    <h2>Memory Usage</h2>
    <ejs-circulargauge 
      ref="memoryGauge"
      :axes="memoryAxis"
    ></ejs-circulargauge>
  </div>
</template>

<script>
export default {
  methods: {
    printAll() {
      // Print each gauge sequentially
      this.$refs.cpuGauge.print();
      setTimeout(() => {
        this.$refs.memoryGauge.print();
      }, 500);
    }
  }
}
</script>
```

## Export to Images

Export gauges as image files for reports or sharing.

### Export to PNG

```vue
<template>
  <div>
    <button @click="exportPNG">Export as PNG</button>
    <ejs-circulargauge 
      id="container"
      ref="gauge"
      :axes="axes"
    ></ejs-circulargauge>
  </div>
</template>

<script>
export default {
  methods: {
    exportPNG() {
      this.$refs.gauge.export('PNG', 'gauge.png');
    }
  }
}
</script>
```

### Export to SVG

```javascript
methods: {
  exportSVG() {
    this.$refs.gauge.export('SVG', 'gauge.svg');
  }
}
```

### Export with Custom Filename

```javascript
methods: {
  exportGauge() {
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `gauge-report-${timestamp}.png`;
    this.$refs.gauge.export('PNG', filename);
  }
}
```

### Export Multiple Gauges to Single Document

```vue
<template>
  <div>
    <button @click="exportReport">Export Report</button>
    <ejs-circulargauge ref="gauge1" :axes="axes1"></ejs-circulargauge>
    <ejs-circulargauge ref="gauge2" :axes="axes2"></ejs-circulargauge>
  </div>
</template>

<script>
export default {
  methods: {
    async exportReport() {
      // Export first gauge
      await this.$refs.gauge1.export('PNG', 'gauge1.png');
      
      // Export second gauge
      await this.$refs.gauge2.export('PNG', 'gauge2.png');
      
      // Combine images into PDF (requires PDF library)
      // Use a library like jsPDF or PDFKit
    }
  }
}
</script>
```

## Export Formats

### Available Export Options

```javascript
// PNG - Raster format (most common)
gauge.export('PNG', 'gauge.png');

// SVG - Vector format (scalable)
gauge.export('SVG', 'gauge.svg');

// PDF - Document format
// Note: Requires additional configuration
gauge.export('PDF', 'gauge.pdf');
```

### Format Comparison

| Format | Use Case | Pros | Cons |
|--------|----------|------|------|
| PNG | Reports, web | Universal, simple | Raster, fixed size |
| SVG | Web, printing | Scalable, editable | Larger file, browser support |
| PDF | Documents, archival | Portable, professional | Requires library |

### Export Quality Settings

```javascript
// High quality (larger file)
gauge.export('PNG', 'gauge-hq.png', 2);

// Standard quality
gauge.export('PNG', 'gauge.png', 1);

// Lower quality (smaller file)
gauge.export('PNG', 'gauge-low.png', 0.5);
```

## RTL Support

Support right-to-left languages (Arabic, Hebrew, etc.).

### Enabling RTL

```vue
<template>
  <ejs-circulargauge 
    :enableRtl="true"
    :axes="axes"
  ></ejs-circulargauge>
</template>

<script>
export default {
  data() {
    return {
      enableRtl: true,
      axes: [{
        minimum: 0,
        maximum: 100
      }]
    };
  }
}
</script>
```

### RTL Layout Impact

- Legend position reverses (Right becomes Left, etc.)
- Text alignment adjusts (RTL text alignment)
- Pointer movement direction adapts
- Label positioning mirrors

### Multi-Language with RTL

```javascript
data() {
  return {
    currentLanguage: 'en',
    enableRtl: false,
    axes: [{
      minimum: 0,
      maximum: 100,
      annotation: [
        {
          content: this.getLocalizedText('status')
        }
      ]
    }]
  };
},

methods: {
  switchLanguage(lang) {
    this.currentLanguage = lang;
    this.enableRtl = ['ar', 'he', 'fa'].includes(lang);
  },
  
  getLocalizedText(key) {
    const texts = {
      en: { status: 'System Status' },
      ar: { status: 'حالة النظام' },
      he: { status: 'מצב המערכת' }
    };
    return texts[this.currentLanguage][key];
  }
}
```

## Accessibility Features

Make gauges usable for all users, including those with disabilities.

### ARIA Attributes

```vue
<template>
  <ejs-circulargauge 
    id="container"
    role="img"
    :aria-label="`System Status Gauge showing ${value}%`"
    :axes="axes"
  ></ejs-circulargauge>
</template>
```

### Keyboard Navigation

```javascript
// The gauge automatically supports:
// - Tab navigation
// - Arrow keys for pointer movement (when dragging enabled)
// - Enter to activate
// - Escape to cancel

pointers: [{
  enableDrag: true,  // Enables keyboard navigation
  value: 65
}]
```

### High Contrast Mode

```javascript
// High contrast theme for accessibility
import '@syncfusion/ej2-vue-circulargauge/styles/highcontrast.css'

// Or apply custom high-contrast colors
axes: [{
  lineStyle: {
    color: '#000000',
    width: 3
  },
  
  ranges: [
    { start: 0, end: 50, color: '#0000FF' },   // Blue
    { start: 50, end: 100, color: '#FFFFFF' }  // White
  ],
  
  pointers: [{
    color: '#FFFF00',  // Yellow
    border: {
      color: '#000000',
      width: 3
    }
  }]
}]
```

### Screen Reader Support

The gauge automatically provides:
- Role and label information
- Live region updates when values change
- Semantic structure
- Alternative text for images/icons

### WCAG 2.1 Compliance

```vue
<!-- Provide accessible alternative -->
<div id="gauge-data" style="display: none;">
  <h2>System Performance Gauge Data</h2>
  <p>CPU Usage: 72%</p>
  <p>Status: Healthy</p>
  <p>Measurement Range: 0% to 100%</p>
</div>

<ejs-circulargauge 
  role="img"
  aria-labelledby="gauge-data"
  :axes="axes"
></ejs-circulargauge>
```

## Internationalization

Support multiple languages and locales.

### Language Configuration

```javascript
import { registerLocale } from '@syncfusion/ej2-base';

// Register language
registerLocale('ar', {
  'gauge': {
    'rangeFromat': '{value}%',
    'tooltip': 'القيمة: {value}'
  }
});

// Apply language
<ejs-circulargauge locale="ar" :axes="axes"></ejs-circulargauge>
```

### Locale-Specific Formatting

```vue
<template>
  <select v-model="locale" @change="switchLocale">
    <option value="en">English</option>
    <option value="de">German</option>
    <option value="fr">French</option>
    <option value="es">Spanish</option>
    <option value="ar">Arabic</option>
  </select>
  
  <ejs-circulargauge 
    :locale="locale"
    :axes="axes"
  ></ejs-circulargauge>
</template>

<script>
export default {
  data() {
    return {
      locale: 'en'
    };
  }
}
</script>
```

### Number Formatting by Locale

```javascript
// Different locales format numbers differently
// en-US: 1,234.56 (comma separator, period decimal)
// de-DE: 1.234,56 (period separator, comma decimal)
// fr-FR: 1 234,56 (space separator, comma decimal)

// Configure via locale
<ejs-circulargauge 
  locale="de-DE"
  :axes="axes"
></ejs-circulargauge>
```

## Advanced Configuration

### Gauge Serialization

```javascript
methods: {
  // Export gauge configuration
  exportConfig() {
    const config = this.$refs.gauge.getProperties();
    console.log(JSON.stringify(config));
  },
  
  // Save configuration to server
  saveConfig() {
    const config = this.$refs.gauge.getProperties();
    fetch('/api/save-gauge-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
  }
}
```

### Dynamic Gauge Recreation

```vue
<template>
  <div>
    <button @click="loadConfigPreset">Load Preset</button>
    <ejs-circulargauge 
      :key="gaugeKey"
      :axes="currentAxes"
    ></ejs-circulargauge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gaugeKey: 0,
      currentAxes: []
    };
  },
  
  methods: {
    loadConfigPreset() {
      const presets = {
        performance: [{
          minimum: 0,
          maximum: 100,
          ranges: [
            { start: 0, end: 50, color: '#27AE60' },
            { start: 50, end: 100, color: '#E74C3C' }
          ]
        }],
        temperature: [{
          minimum: -10,
          maximum: 50,
          ranges: [
            { start: -10, end: 15, color: '#3498DB' },
            { start: 15, end: 25, color: '#F39C12' },
            { start: 25, end: 50, color: '#E74C3C' }
          ]
        }]
      };
      
      this.currentAxes = presets.performance;
      this.gaugeKey++; // Force re-render
    }
  }
}
</script>
```

### Gauge Refresh and Update

```vue
<template>
  <button @click="refreshGauge">Refresh</button>
</template>

<script>
export default {
  methods: {
    refreshGauge() {
      // Method 1: Force update
      this.$forceUpdate();
      
      // Method 2: Redraw specific axis
      this.$refs.gauge.axes[0].pointers[0].value = 75;
      this.$refs.gauge.redraw();
    }
  }
}
</script>
```

### Browser Compatibility

The circular gauge works in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE 11 (with polyfills)

### Performance Optimization

```javascript
// For gauges with frequent updates
enableAnimation: false,  // Disable if performance is critical

// Limit pointer updates
pointers: [{
  value: 65,
  animation: {
    duration: 100  // Reduce animation duration
  }
}]

// Use requestAnimationFrame for smooth updates
methods: {
  updateGaugeValue(value) {
    requestAnimationFrame(() => {
      this.axes[0].pointers[0].value = value;
      this.$forceUpdate();
    });
  }
}
```

### Memory Management

```javascript
methods: {
  // Cleanup when component is destroyed
  beforeDestroy() {
    // Clear intervals
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    
    // Unbind events
    if (this.$refs.gauge) {
      this.$refs.gauge.destroy();
    }
  }
}
```

