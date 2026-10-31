# Dimensions and Sizing in Smith Chart

## Table of Contents
- [Overview](#overview)
- [Container-Based Sizing](#container-based-sizing)
  - [HTML Container Setup](#html-container-setup)
  - [Chart Configuration](#chart-configuration)
  - [Advantages](#advantages)
  - [Common Container Dimensions](#common-container-dimensions)
- [Pixel-Based Fixed Sizing](#pixel-based-fixed-sizing)
  - [Characteristics](#characteristics)
  - [Example Sizes](#example-sizes)
  - [Considerations](#considerations)
- [Percentage-Based Responsive Sizing](#percentage-based-responsive-sizing)
  - [Advantages](#advantages)
  - [Responsive Layout Examples](#responsive-layout-examples)
- [Complete Responsive Example](#complete-responsive-example)
- [Combination Approach: Responsive with Constraints](#combination-approach-responsive-with-constraints)
- [Design Recommendations](#design-recommendations)
  - [Desktop/Laptop (1920×1080 and larger)](#desktoplaptop-19201080-and-larger)
  - [Tablet (768×1024)](#tablet-7681024)
  - [Mobile (320×480 and larger)](#mobile-320480-and-larger)
  - [Multi-Monitor Setups](#multi-monitor-setups)
- [Performance Considerations](#performance-considerations)
- [Sizing for Different Contexts](#sizing-for-different-contexts)
  - [Dashboard Widget](#dashboard-widget)
  - [Main Analysis View](#main-analysis-view)
  - [Embedded Report](#embedded-report)
  - [Full-Page Application](#full-page-application)

## Overview

Smith Chart sizing determines how the visualization adapts to its display environment. You have three primary approaches: container-based sizing, pixel-based fixed dimensions, or percentage-based responsive sizing. Each approach serves different layout requirements.

## Container-Based Sizing

With container-based sizing, the Smith Chart automatically adapts to its parent container's dimensions. This is ideal for responsive applications where the container changes size.

### HTML Container Setup

First, define a container `<div>` with explicit width and height:

```html
<div id="container">
    <div id="smithchart" style="width:650px; height:350px;"></div>
</div>
```

### Chart Configuration

The Smith Chart will automatically fill this container:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Advantages
- Simplest approach for fixed layouts
- Works well with grid systems
- Predictable dimensions for design
- Easy CSS integration

### Common Container Dimensions
- **Standard Dashboard** - 650px × 350px
- **Large Display** - 900px × 500px
- **Mobile Optimized** - 400px × 300px
- **Wide Screen** - 1200px × 600px

## Pixel-Based Fixed Sizing

Use the `width` and `height` properties to set explicit pixel dimensions:

```cshtml
<ejs-smithchart id="smithchart" width="650px" height="350px">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Characteristics
- Renders at exactly the specified size
- Ignores container size
- Useful for fixed-size applications
- Dimensions specified directly on component

### Example Sizes
```cshtml
<!-- Small chart for sidebar widget -->
<ejs-smithchart id="widget-chart" width="300px" height="250px">
</ejs-smithchart>

<!-- Standard chart for main content -->
<ejs-smithchart id="main-chart" width="650px" height="350px">
</ejs-smithchart>

<!-- Large chart for detailed analysis -->
<ejs-smithchart id="analysis-chart" width="900px" height="500px">
</ejs-smithchart>
```

### Considerations
- Define clear boundaries for your application
- Plan for different screen sizes upfront
- May need multiple charts for different breakpoints

## Percentage-Based Responsive Sizing

Use percentages to make Smith Charts adapt to container size automatically:

```cshtml
<ejs-smithchart id="smithchart" width="100%" height="100%">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

Combined with CSS for the container:

```html
<div id="container" style="width: 100%; height: 500px;">
    <!-- Smith Chart will fill this container -->
</div>
```

```cshtml
<ejs-smithchart id="smithchart" width="100%" height="100%">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Advantages
- Fully responsive to container changes
- Works seamlessly with flexbox/grid layouts
- Adapts to mobile, tablet, and desktop
- Future-proof for different screen sizes

### Responsive Layout Examples

**Flexbox Container:**
```html
<div style="display: flex; flex-direction: column; height: 100vh;">
    <header>Technical Analysis</header>
    <div style="flex: 1; overflow: hidden;">
        <!-- Smith Chart fills remaining space -->
    </div>
</div>
```

**CSS Grid:**
```html
<div style="display: grid; grid-template-columns: 1fr 2fr; gap: 20px; height: 500px;">
    <div><!-- Sidebar controls --></div>
    <div>
        <!-- Smith Chart fills grid cell -->
    </div>
</div>
```

**Bootstrap Container:**
```html
<div class="container-fluid">
    <div class="row" style="height: 500px;">
        <div class="col-md-3"><!-- Controls --></div>
        <div class="col-md-9" style="overflow: hidden;">
            <!-- Smith Chart fills column -->
        </div>
    </div>
</div>
```

## Complete Responsive Example

```html
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 10px;
            font-family: Arial, sans-serif;
        }

        .smith-container {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            height: 600px;
            border: 1px solid #ddd;
            border-radius: 4px;
            overflow: hidden;
        }

        @media (max-width: 768px) {
            .smith-container {
                height: 400px;
            }
        }

        @media (max-width: 480px) {
            .smith-container {
                height: 300px;
            }
        }
    </style>
</head>
<body>
    <div class="smith-container">
        <!-- Smith Chart will fill this container responsively -->
    </div>
</body>
</html>
```

```cshtml
<ejs-smithchart id="smithchart" width="100%" height="100%">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

## Combination Approach: Responsive with Constraints

Use percentages with CSS for sophisticated sizing control:

```html
<div class="chart-wrapper">
    <div class="chart-container"></div>
</div>
```

```css
.chart-wrapper {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

.chart-container {
    width: 100%;
    aspect-ratio: 16 / 9;  /* Maintains aspect ratio */
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

```cshtml
<ejs-smithchart id="smithchart" width="100%" height="100%">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

## Design Recommendations

### Desktop/Laptop (1920×1080 and larger)
- **Recommended:** 900px × 500px (fixed) or 100% (responsive)
- Use larger dimensions for detailed analysis
- Multiple series remain readable

### Tablet (768×1024)
- **Recommended:** 100% width, 400-500px height
- Percentage-based sizing for adaptation
- Portrait: full width, landscape: may use side panels

### Mobile (320×480 and larger)
- **Recommended:** 100% width, 300-350px height
- Stack vertically
- Ensure legends and labels remain readable
- Consider touch-friendly marker sizes

### Multi-Monitor Setups
- **Recommended:** 100% width with max-width constraint
- Adapt to available space
- Maintain readability on ultrawide displays

## Performance Considerations

1. **Rendering Performance** - Larger dimensions require more rendering power; test on target devices
2. **Data Points** - More space allows more detail; adjust data density accordingly
3. **Responsiveness** - Percentage-based sizing adds slight overhead; minimal impact for most applications
4. **Mobile** - Smaller screens should render faster; keep mobile dimensions reasonable

## Sizing for Different Contexts

### Dashboard Widget
```cshtml
<ejs-smithchart id="widget" width="350px" height="300px">
</ejs-smithchart>
```

### Main Analysis View
```cshtml
<ejs-smithchart id="main" width="100%" height="600px">
</ejs-smithchart>
```

### Embedded Report
```cshtml
<ejs-smithchart id="report" width="600px" height="400px">
</ejs-smithchart>
```

### Full-Page Application
```cshtml
<ejs-smithchart id="fullpage" width="100%" height="100%">
</ejs-smithchart>
```

Choose the sizing approach that best matches your application's layout requirements and responsiveness needs. Percentage-based sizing provides the most flexibility for modern web applications.
