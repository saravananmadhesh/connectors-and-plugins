# Appearance and Customization

## Table of Contents

- [Themes](#themes)
- [Chart Dimensions](#chart-dimensions)
  - [Width and Height](#width-and-height)
  - [Responsive](#responsive)
- [Background and Border](#background-and-border)
  - [Chart Background](#chart-background)
  - [Chart Border](#chart-border)
  - [Chart Area](#chart-area)
- [Colors and Gradients](#colors-and-gradients)
  - [Gradient Fill](#gradient-fill)
- [Chart Title](#chart-title)
  - [Basic Title](#basic-title)
  - [Title Customization](#title-customization)
  - [Subtitle](#subtitle)
- [Print and Export](#print-and-export)
  - [Print](#print)
  - [Export to Image](#export-to-image)
  - [Export to PDF](#export-to-pdf)

## Themes

Built-in professional themes.

```cshtml
<ejs-chart id="chart" theme="Material">
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" xName="X" yName="Y">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

**Available themes:**
- `Material` - Material Design
- `MaterialDark` - Material Dark
- `Fabric` - Microsoft Fabric
- `FabricDark` - Fabric Dark
- `Bootstrap5` - Bootstrap 5
- `Bootstrap5Dark` - Bootstrap 5 Dark
- `Bootstrap4` - Bootstrap 4
- `Bootstrap` - Bootstrap 3
- `BootstrapDark` - Bootstrap Dark
- `Highcontrast` - High Contrast
- `HighcontrastLight` - High Contrast Light
- `Tailwind` - Tailwind CSS
- `TailwindDark` - Tailwind Dark
- `Fluent` - Microsoft Fluent
- `FluentDark` - Fluent Dark

## Chart Dimensions

### Width and Height

```cshtml
<ejs-chart id="chart" width="90%" height="400px">
</ejs-chart>
```

**Units:** Percentage (%), Pixels (px)

### Responsive

```cshtml
<ejs-chart id="chart" width="100%" height="100%">
</ejs-chart>
```

Chart automatically resizes with container.

## Background and Border

### Chart Background

```cshtml
<ejs-chart id="chart" background="#F0F0F0">
</ejs-chart>
```

### Chart Border

```cshtml
<ejs-chart id="chart">
    <e-chart-border width="2" color="#333"></e-chart-border>
</ejs-chart>
```

### Chart Area

```cshtml
<ejs-chart id="chart">
    <e-chart-chartarea>
        <e-chartarea-border width="1" color="#DDD"></e-chartarea-border>
    </e-chart-chartarea>
</ejs-chart>
```

## Colors and Gradients

### Gradient Fill

```cshtml
<e-series fill="url(#gradient1)">
</e-series>

<svg style="height: 0">
    <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#FF6384;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#36A2EB;stop-opacity:1" />
        </linearGradient>
    </defs>
</svg>
```

## Chart Title

### Basic Title

```cshtml
<ejs-chart id="chart" title="Sales Analysis">
</ejs-chart>
```

### Title Customization

```cshtml
<ejs-chart id="chart">
    <e-chart-titlestyle size="24px" 
                       fontWeight="Bold" 
                       color="#333" 
                       fontFamily="Arial"
                       textAlignment="@Syncfusion.EJ2.Charts.Alignment.Center">
    </e-chart-titlestyle>
</ejs-chart>
```

### Subtitle

```cshtml
<ejs-chart id="chart" 
           title="Sales Analysis" 
           subTitle="Q1 2023">
    <e-chart-subtitlestyle size="14px" 
                          color="#666">
    </e-chart-subtitlestyle>
</ejs-chart>
```

## Print and Export

### Print

```cshtml
<button onclick="printChart()">Print</button>

<ejs-chart id="chart">
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" xName="X" yName="Y">
        </e-series>
    </e-series-collection>
</ejs-chart>

<script>
    function printChart() {
        var chart = document.getElementById('chart').ej2_instances[0];
        chart.print();
    }
</script>
```

### Export to Image

```cshtml
<button onclick="exportChart()">Export PNG</button>

<script>
    function exportChart() {
        var chart = document.getElementById('chart').ej2_instances[0];
        chart.export('PNG', 'Chart');
    }
</script>
```

**Export formats:** PNG, JPEG, SVG, PDF

### Export to PDF

```javascript
chart.export('PDF', 'ChartReport');
```

This covers comprehensive appearance customization for professional chart presentation.
