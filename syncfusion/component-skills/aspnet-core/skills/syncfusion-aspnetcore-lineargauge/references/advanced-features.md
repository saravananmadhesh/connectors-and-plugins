# Advanced Features

## Table of Contents
- [Accessibility (WCAG)](#accessibility-wcag)
  - [WCAG Compliance Features](#wcag-compliance-features)
  - [ARIA Label Configuration](#aria-label-configuration)
  - [Screen Reader Optimization](#screen-reader-optimization)
  - [WCAG Testing](#wcag-testing)
- [Internationalization (i18n)](#internationalization-i18n)
  - [Locale Configuration](#locale-configuration)
  - [Custom Locale Strings](#custom-locale-strings)
  - [Number Format Configuration](#number-format-configuration)
- [Print and Export](#print-and-export)
  - [Print Gauge](#print-gauge)
  - [Export to Image](#export-to-image)
  - [Export to SVG](#export-to-svg)
  - [PDF Export](#pdf-export)
- [API Methods](#api-methods)
  - [Set Pointer Value](#set-pointer-value)
  - [Refresh Gauge](#refresh-gauge)
  - [Destroy Gauge](#destroy-gauge)
  - [setAnnotationValue](#setannotationvalue)
  - [API Method Examples](#api-method-examples)
- [RTL Support](#rtl-support)
- [Performance Optimization](#performance-optimization)
  - [Disable Animation](#disable-animation)
  - [Lazy Loading](#lazy-loading)
  - [Batch Updates](#batch-updates)
- [Edge Cases](#edge-cases)
  - [Handling Invalid Values](#handling-invalid-values)
  - [Empty or Null Data](#empty-or-null-data)
  - [Multiple Axes Handling](#multiple-axes-handling)
  - [Resource Cleanup](#resource-cleanup)

## Accessibility (WCAG)

The Linear Gauge complies with WCAG 2.2 AA standards for accessibility.

### WCAG Compliance Features

The gauge includes:
- **Screen Reader Support** - ARIA labels for title, axis labels, pointers, annotations
- **Keyboard Navigation** - Pointer values readable by screen readers
- **Color Contrast** - 4.5:1 contrast ratio for text
- **Mobile Device Support** - Touch-friendly interactions
- **WAI-ARIA Attributes** - Semantic markup

### ARIA Label Configuration

```cshtml
<section aria-label="Server Performance Gauge">
    <ejs-lineargauge id="gauge"
                     title="Server Performance"
                     description="Server performance measured on a scale from 0 to 100">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100">
                <e-lineargauge-pointers>
                    <e-lineargauge-pointer value="75" type="Bar"></e-lineargauge-pointer>
                </e-lineargauge-pointers>
            </e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>
</section>
```

### Screen Reader Optimization

```cshtml
<!-- Semantic HTML wrapper for screen readers -->
<section role="region" aria-label="Gauge Dashboard">
    <h2>System Metrics</h2>
    
    <article role="region" aria-labelledby="gauge-title">
        <h3 id="gauge-title">CPU Usage</h3>
        <ejs-lineargauge id="cpu-gauge" aria-describedby="cpu-description">
            <e-lineargauge-axes>
                <e-lineargauge-axis minimum="0" maximum="100">
                </e-lineargauge-axis>
            </e-lineargauge-axes>
        </ejs-lineargauge>
        <p id="cpu-description">Current CPU usage measured on a scale from 0 to 100 percent</p>
    </article>
</section>
```

### WCAG Testing

```cshtml
<script>
    // Test gauge accessibility
    var gauge = document.getElementById('gauge').ej2_instances[0];
    
    // Check ARIA labels
    console.log('ARIA labels present:', !!gauge.element.getAttribute('aria-label'));
    
    // Check color contrast
    // Use tools like axe-core or accessibility-checker
    // npm install axe-core
    // axe.run(function(error, results) {
    //     console.log('Accessibility violations:', results.violations);
    // });
</script>
```

## Internationalization (i18n)

Support multiple languages and regional formats.

### Locale Configuration

```cshtml
<ejs-lineargauge id="gauge" locale="de" title="Temperaturanzeige">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Supported Locales:**
- de (German)
- fr (French)
- es (Spanish)
- ja (Japanese)
- pt-BR (Portuguese Brazil)
- zh-CN (Chinese Simplified)
- zh-TW (Chinese Traditional)
- ru (Russian)
- ar (Arabic)
- And 200+ more

### Custom Locale Strings

```cshtml
<script>
    // Define custom locale strings
    var customLocale = {
        'de': {
            'LinerGaugeAnnotationDisplayText': 'Beschriftung',
            'LinerGaugeAxisLabel': 'Achsenbeschriftung',
            'LinerGaugeAxisTitle': 'Achsentitel'
        }
    };
    
    // Register custom locale
    ej.base.extend(ej.lineargauge.locale, customLocale);
    
    var gauge = new ej.lineargauge.LinearGauge({
        locale: 'de'
    });
</script>
```

### Number Format Configuration

```cshtml
<ejs-lineargauge id="gauge">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <!-- Format numbers with German locale (comma as decimal separator) -->
            <e-axis-labelstyle format="{value}°C"></e-axis-labelstyle>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Format Codes:**
- `n2` - Two decimal places with locale separators
- `n1` - One decimal places
- `c1` - The currency symbol is appended to number and number is rounded to 1 decimal place
- `c2` - The currency symbol is appended to number and number is rounded to 1 decimal place
- `p1` - percentage with 1 decimal place
- `p2` - percentage with 2 decimal place
- `p3` - percentage with 3 decimal place

## Print and Export

Output gauge images and print layouts.

### Print Gauge

```cshtml
<div id="container">
    <button id="print">Print</button>
        <ejs-lineargauge id="gauge" load="gaugeLoad" allowPrint="true" orientation="Horizontal">
            <e-lineargauge-axes>
                <e-lineargauge-axis minimum="0" maximum="120">
                </e-lineargauge-axis>
            </e-lineargauge-axes>
      </ejs-lineargauge>
</div>
<script>
    window.gaugeLoad = function (args) {
        window.gauge = args.gauge;
    }
    window.onload = function () {
        document.getElementById("print").onclick = () => {
            window.gauge.print();
        };
    };
</script>
```

**Print Features:**
- Renders gauge as image
- Opens print dialog
- Supports color and black/white printing
- Respects CSS media queries

### Export to Image

To use the image export functionality, set the `AllowImageExport` property as `true`.

```cshtml
<div id="container">
    <button id="export">Export</button>
        <ejs-lineargauge id="gauge" load="gaugeLoad" allowImageExport="true" orientation="Horizontal">
            <e-lineargauge-axes>
                <e-lineargauge-axis minimum="0" maximum="120">
                </e-lineargauge-axis>
            </e-lineargauge-axes>
      </ejs-lineargauge>
</div>
<script>
    window.gaugeLoad = function (args) {
        window.gauge = args.gauge;
    }
    window.onload = function () {
        document.getElementById("export").onclick = () => {
            window.gauge.export('PNG', 'LinearGauge');
        };
    };
</script>
```

**Export Formats:**
- PNG (default)
- JPEG
- PDF
- SVG

**Export Example with Options:**

```cshtml
<script>
    window.gaugeLoad = function (args) {
        window.gauge = args.gauge;
    }
    window.onload = function () {
        document.getElementById("export").onclick = () => {
            window.gauge.export('PDF', 'LinearGauge', 'Portrait', true); // type, fileName, orientation, allowDownload
        };
    };
</script>
```

### Export to SVG

```cshtml
<button id="export">Export</button>

<script>
    window.gaugeLoad = function (args) {
        window.gauge = args.gauge;
    }
    window.onload = function () {
        document.getElementById("export").onclick = () => {
            window.gauge.export('SVG', 'LinearGauge');
        };
    };
</script>
```
### PDF Export

To use the PDF export functionality, set the `AllowPdfExport` property as `true`. 

```cshtml
<div id="container">
    <button id="export">Export</button>
        <ejs-lineargauge id="gauge" load="gaugeLoad" allowPdfExport="true" orientation="Horizontal">
            <e-lineargauge-axes>
                <e-lineargauge-axis minimum="0" maximum="120">
                </e-lineargauge-axis>
            </e-lineargauge-axes>
      </ejs-lineargauge>
</div>
<script>
    window.gaugeLoad = function (args) {
        window.gauge = args.gauge;
    }
    window.onload = function () {
        document.getElementById("export").onclick = () => {
            window.gauge.export('PDF', 'LinearGauge', 0);
        };
    };
</script>
```

## API Methods

Essential methods for programmatic control.

### Set Pointer Value

```cshtml
<script>
    var gauge = document.getElementById('gauge').ej2_instances[0];
    gauge.setPointerValue(0, 0, 75); // Set first pointer to value 75
</script>
```

### Refresh Gauge

```cshtml
<script>
    var gauge = document.getElementById('gauge').ej2_instances[0];
    gauge.refresh(); // Redraw gauge
</script>
```

### Destroy Gauge

```cshtml
<script>
    var gauge = document.getElementById('gauge').ej2_instances[0];
    gauge.destroy(); // Clean up and remove
</script>
```

### setAnnotationValue

```cshtml
<script>
    var linearObj = document.getElementById('linear').ej2_instances[0];
    linearObj.setAnnotationValue(0, '50', 50);
</script>
```
### API Method Examples

```cshtml
<button id="btn">Click</button>
<ejs-lineargauge id="linear">
    <e-lineargauge-annotations>
        <e-lineargauge-annotation Content="10" ZIndex="1" AxisValue="0"></e-lineargauge-annotation>
    </e-lineargauge-annotations>
    <e-lineargauge-axes>
        <e-lineargauge-axis>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer Value="10"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<script>
document.getElementById("btn").onclick = function() {
    var linearObj = document.getElementById('linear').ej2_instances[0];
    linearObj.setAnnotationValue(0, '50', 50);
};
</script>
```

## RTL Support

The Linear Gauge supports right-to-left rendering through the `enableRtl` property.

```cshtml
<ejs-lineargauge id="gauge"
                 locale="ar"
                 enableRtl="true">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

## Performance Optimization

Optimize gauge rendering for large dashboards.

### Disable Animation

```cshtml
<e-lineargauge-pointers>
    <e-lineargauge-pointer value="75" 
                            type="Bar"
                            animationDuration="0">
    </e-lineargauge-pointer>
</e-lineargauge-pointers>
```

**When to disable animation:**
- Multiple gauges on same page
- Real-time updates (frequent updates)
- Low-power devices or mobile
- Print layouts

### Lazy Loading

```cshtml
<script>
    // Only initialize visible gauges
    var observerOptions = {
        threshold: 0.1
    };
    
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !entry.target.initialized) {
                // Initialize gauge only when visible
                var gauge = new ej.lineargauge.LinearGauge({
                    // config
                }, entry.target);
                entry.target.initialized = true;
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.lazy-gauge').forEach(function(el) {
        observer.observe(el);
    });
</script>
```

### Batch Updates

```cshtml
<script>
    var gauge = document.getElementById('gauge').ej2_instances[0];
    
    // Update multiple pointers
    gauge.setPointerValue(0, 0, 50);
    gauge.setPointerValue(0, 1, 75);
    gauge.setPointerValue(0, 2, 90);
    
    // Single refresh after all updates
    gauge.refresh();
</script>
```

## Edge Cases

### Handling Invalid Values

```cshtml
<script>
    var gauge = document.getElementById('gauge').ej2_instances[0];
    
    // Safely set pointer value with validation
    function safeSetPointerValue(pointerIndex, value) {
        // Get axis bounds
        var axis = gauge.axes[0];
        var min = axis.minimum;
        var max = axis.maximum;
        
        // Clamp value to valid range
        var clampedValue = Math.max(min, Math.min(max, value));
        
        if (clampedValue !== value) {
            console.warn('Value ' + value + ' out of range [' + min + ', ' + max + '], using ' + clampedValue);
        }
        
        gauge.setPointerValue(0, pointerIndex, clampedValue);
    }
    
    safeSetPointerValue(0, 150); // Will clamp to max value
</script>
```

### Empty or Null Data

```cshtml
<script>
    var gauge = document.getElementById('gauge').ej2_instances[0];
    
    // Handle null/undefined values
    function updateGaugeValue(value) {
        if (value === null || value === undefined) {
            console.warn('No value provided, using default');
            value = gauge.axes[0].minimum;
        }
        
        gauge.setPointerValue(0, 0, value);
    }
    
    updateGaugeValue(null); // Falls back to minimum
</script>
```

### Multiple Axes Handling

```cshtml
<ejs-lineargauge id="multi-axis-gauge">
    <e-lineargauge-axes>
        <!-- First axis: 0-100 -->
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="50" type="Bar"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
        
        <!-- Second axis: 0-1000 -->
        <e-lineargauge-axis minimum="0" maximum="1000" OpposedPosition="true">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="500" type="Marker"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<script>
    var gauge = document.getElementById('multi-axis-gauge').ej2_instances[0];
    
    // Update specific axis pointer
    gauge.setPointerValue(0, 0, 75); // First axis
    gauge.setPointerValue(1, 0, 750); // Second axis
</script>
```

### Resource Cleanup

```cshtml
<script>
    var gauge = document.getElementById('gauge').ej2_instances[0];
    
    window.addEventListener('beforeunload', function() {
        // Clean up resources
        gauge.destroy();
        console.log('Gauge destroyed and resources freed');
    });
</script>
```
