# Sizing and Dimensions in Circular Gauge

## Table of Contents

- [Overview](#overview)
- [Pixel-Based Sizing](#pixel-based-sizing)
  - [Setting Fixed Width and Height](#setting-fixed-width-and-height)
  - [Common Fixed Sizes](#common-fixed-sizes)
  - [Square Aspect Ratio](#square-aspect-ratio)
- [Percentage-Based Sizing](#percentage-based-sizing)
  - [Responsive Percentage Sizing](#responsive-percentage-sizing)
  - [Partial Percentage Sizing](#partial-percentage-sizing)
- [Default Dimensions](#default-dimensions)
  - [When No Size is Specified](#when-no-size-is-specified)
  - [Explicit Default Override](#explicit-default-override)
- [Container Responsive Design](#container-responsive-design)
  - [Using Div Container](#using-div-container)
  - [Maintaining Square Aspect Ratio](#maintaining-square-aspect-ratio)
  - [Padding Box Trick](#padding-box-trick)
- [Mobile Responsive Sizing](#mobile-responsive-sizing)
  - [Responsive Breakpoints](#responsive-breakpoints)
  - [Bootstrap Grid](#bootstrap-grid)
- [Dashboard Layout Examples](#dashboard-layout-examples)
  - [Single Large Gauge](#single-large-gauge)
  - [2x2 Grid Layout](#2x2-grid-layout)
  - [Responsive 1-2-4 Columns](#responsive-1-2-4-columns)
- [Min/Max Sizing](#minmax-sizing)
  - [Constrain Gauge Size](#constrain-gauge-size)
- [Complete Responsive Example](#complete-responsive-example)
- [Troubleshooting](#troubleshooting)

## Overview

Gauge dimensions control how much space the Circular Gauge occupies on the page.

You can size a Circular Gauge by using:

- Fixed pixel values.
- Percentage values.
- Parent container dimensions.
- CSS Grid or Bootstrap-style layouts.
- Responsive CSS breakpoints.
- Min/max container constraints.

For best visual results, Circular Gauges are commonly displayed in a square or near-square container.

## Pixel-Based Sizing

### Setting Fixed Width and Height

Use fixed pixel values when the gauge should always render with the same size.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Fixed Size Gauge";

        public double PointerValue { get; set; } = 65;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Fixed Size Gauge";
}

<h1>Fixed Size Circular Gauge</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="400px"
                    height="400px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Benefits:

- Predictable layout.
- Useful in fixed dashboards.
- Does not resize based on parent container changes.

Limitations:

- Less mobile-friendly.
- May overflow small screens.
- May look too small on large screens.

### Common Fixed Sizes

```html
<ejs-circulargauge id="smallGauge"
                    width="300px"
                    height="300px">
</ejs-circulargauge>

<ejs-circulargauge id="mediumGauge"
                    width="500px"
                    height="500px">
</ejs-circulargauge>

<ejs-circulargauge id="largeGauge"
                    width="800px"
                    height="800px">
</ejs-circulargauge>
```

Recommended usage:

- `300px x 300px`: Small dashboard widget.
- `500px x 500px`: Medium display gauge.
- `800px x 800px`: Large panel gauge.

### Square Aspect Ratio

Circular Gauges usually look best when width and height are equal.

Recommended:

```html
<ejs-circulargauge id="gauge"
                    width="400px"
                    height="400px">
</ejs-circulargauge>
```

Avoid non-square sizing unless the design intentionally needs it:

```html
<ejs-circulargauge id="gauge"
                    width="600px"
                    height="400px">
</ejs-circulargauge>
```

## Percentage-Based Sizing

### Responsive Percentage Sizing

Use percentage sizing when the gauge should scale with its parent container.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Responsive Gauge";

        public double PointerValue { get; set; } = 65;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Responsive Gauge";
}

<h1>Responsive Percentage Gauge</h1>

<div style="width: 600px; height: 600px;">
    <ejs-circulargauge id="gauge"
                        title="@Model.GaugeTitle"
                        width="100%"
                        height="100%">
        <e-circulargauge-axes>
            <e-circulargauge-axis startAngle="240"
                                  endAngle="120"
                                  minimum="0"
                                  maximum="100">
                <e-circulargauge-pointers>
                    <e-circulargauge-pointer type="Needle"
                                             value="@Model.PointerValue">
                    </e-circulargauge-pointer>
                </e-circulargauge-pointers>
            </e-circulargauge-axis>
        </e-circulargauge-axes>
    </ejs-circulargauge>
</div>
```

Important:

- `width="100%"` and `height="100%"` make the gauge fill the parent.
- The parent container must have a defined height.
- If the parent does not have a height, `height="100%"` may not render as expected.

### Partial Percentage Sizing

```html
<ejs-circulargauge id="gauge"
                    width="80%"
                    height="80%">
</ejs-circulargauge>
```

```html
<ejs-circulargauge id="gauge"
                    width="50%"
                    height="50%">
</ejs-circulargauge>
```

Use partial percentage sizing when the gauge should occupy only part of its parent container.

## Default Dimensions

### When No Size is Specified

If `width` and `height` are not specified, the Circular Gauge uses its default sizing behavior.

```html
<ejs-circulargauge id="gauge">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="65">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Default behavior:

- Width uses the available container width.
- Height defaults to a fixed component height.
- Useful for simple quick-start examples.

### Explicit Default Override

Avoid setting empty width or height values like this:

```html
<ejs-circulargauge id="gauge"
                    width=""
                    height="">
</ejs-circulargauge>
```

Instead, either omit the properties completely or set explicit values.

Recommended:

```html
<ejs-circulargauge id="gauge">
</ejs-circulargauge>
```

or:

```html
<ejs-circulargauge id="gauge"
                    width="100%"
                    height="450px">
</ejs-circulargauge>
```

## Container Responsive Design

### Using Div Container

Control the gauge size through a parent container.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Container Responsive Gauge";

        public double PointerValue { get; set; } = 65;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Container Responsive Gauge";
}

<h1>Container Responsive Gauge</h1>

<div style="width: 100%; max-width: 600px; height: 600px; margin: 0 auto;">
    <ejs-circulargauge id="gauge"
                        title="@Model.GaugeTitle"
                        width="100%"
                        height="100%">
        <e-circulargauge-axes>
            <e-circulargauge-axis startAngle="240"
                                  endAngle="120"
                                  minimum="0"
                                  maximum="100">
                <e-circulargauge-pointers>
                    <e-circulargauge-pointer type="Needle"
                                             value="@Model.PointerValue">
                    </e-circulargauge-pointer>
                </e-circulargauge-pointers>
            </e-circulargauge-axis>
        </e-circulargauge-axes>
    </ejs-circulargauge>
</div>
```

### Maintaining Square Aspect Ratio

Use `aspect-ratio: 1 / 1` on the parent container.

```html
<div style="width: 100%; max-width: 600px; aspect-ratio: 1 / 1; margin: 0 auto;">
    <ejs-circulargauge id="gauge"
                        width="100%"
                        height="100%">
    </ejs-circulargauge>
</div>
```

This keeps the gauge square while allowing the width to be responsive.

### Padding Box Trick

For older browser compatibility, use a padding-based aspect ratio container.

```html
<div style="width: 100%; max-width: 600px; padding-bottom: 100%; position: relative; margin: 0 auto;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
        <ejs-circulargauge id="gauge"
                            width="100%"
                            height="100%">
        </ejs-circulargauge>
    </div>
</div>
```

## Mobile Responsive Sizing

### Responsive Breakpoints

Use media queries when the gauge container needs different sizes on mobile, tablet, and desktop.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Mobile Responsive Gauge";

        public double PointerValue { get; set; } = 65;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Mobile Responsive Gauge";
}

<h1>Mobile Responsive Gauge</h1>

<style>
    .gauge-container {
        width: 100%;
        aspect-ratio: 1 / 1;
        margin: 0 auto;
    }

    /* Mobile: full width */
    @@media (max-width: 480px) {
        .gauge-container {
            max-width: 100%;
        }
    }

    /* Tablet: wider responsive layout */
    @@media (min-width: 481px) and (max-width: 768px) {
        .gauge-container {
            max-width: 90%;
        }
    }

    /* Desktop: constrained layout */
    @@media (min-width: 769px) {
        .gauge-container {
            max-width: 600px;
        }
    }
</style>

<div class="gauge-container">
    <ejs-circulargauge id="gauge"
                        title="@Model.GaugeTitle"
                        width="100%"
                        height="100%">
        <e-circulargauge-axes>
            <e-circulargauge-axis startAngle="240"
                                  endAngle="120"
                                  minimum="0"
                                  maximum="100">
                <e-circulargauge-pointers>
                    <e-circulargauge-pointer type="Needle"
                                             value="@Model.PointerValue">
                    </e-circulargauge-pointer>
                </e-circulargauge-pointers>
            </e-circulargauge-axis>
        </e-circulargauge-axes>
    </ejs-circulargauge>
</div>
```

Important correction:

```css
/* Mobile: full width */
```

Do not write CSS comments like this:

```css
/* Mobile: full width -->
```

### Bootstrap Grid

If Bootstrap is already available in the project, place the gauge inside Bootstrap columns.

```html
<div class="row">
    <div class="col-md-6">
        <div style="aspect-ratio: 1 / 1;">
            <ejs-circulargauge id="gauge1"
                                width="100%"
                                height="100%">
            </ejs-circulargauge>
        </div>
    </div>
    <div class="col-md-6">
        <div style="aspect-ratio: 1 / 1;">
            <ejs-circulargauge id="gauge2"
                                width="100%"
                                height="100%">
            </ejs-circulargauge>
        </div>
    </div>
</div>
```

If Bootstrap is not already included, use CSS Grid instead.

## Dashboard Layout Examples

### Single Large Gauge

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Main Metric";

        public double PointerValue { get; set; } = 72;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Single Large Gauge";
}

<h1>Single Large Gauge</h1>

<div style="width: 100%; max-width: 800px; aspect-ratio: 1 / 1; margin: 20px auto;">
    <ejs-circulargauge id="mainGauge"
                        title="@Model.GaugeTitle"
                        width="100%"
                        height="100%">
        <e-circulargauge-axes>
            <e-circulargauge-axis startAngle="240"
                                  endAngle="120"
                                  minimum="0"
                                  maximum="100">
                <e-circulargauge-pointers>
                    <e-circulargauge-pointer type="Needle"
                                             value="@Model.PointerValue">
                    </e-circulargauge-pointer>
                </e-circulargauge-pointers>
            </e-circulargauge-axis>
        </e-circulargauge-axes>
    </ejs-circulargauge>
</div>
```

### 2x2 Grid Layout

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public double CpuValue { get; set; } = 72;

        public double MemoryValue { get; set; } = 64;

        public double NetworkValue { get; set; } = 48;

        public double DiskValue { get; set; } = 82;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "2x2 Gauge Grid";
}

<h1>2x2 Gauge Grid</h1>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div style="aspect-ratio: 1 / 1;">
        <ejs-circulargauge id="cpuGauge" title="CPU" width="100%" height="100%">
            <e-circulargauge-axes>
                <e-circulargauge-axis minimum="0" maximum="100">
                    <e-circulargauge-pointers>
                        <e-circulargauge-pointer value="@Model.CpuValue"></e-circulargauge-pointer>
                    </e-circulargauge-pointers>
                </e-circulargauge-axis>
            </e-circulargauge-axes>
        </ejs-circulargauge>
    </div>

    <div style="aspect-ratio: 1 / 1;">
        <ejs-circulargauge id="memoryGauge" title="Memory" width="100%" height="100%">
            <e-circulargauge-axes>
                <e-circulargauge-axis minimum="0" maximum="100">
                    <e-circulargauge-pointers>
                        <e-circulargauge-pointer value="@Model.MemoryValue"></e-circulargauge-pointer>
                    </e-circulargauge-pointers>
                </e-circulargauge-axis>
            </e-circulargauge-axes>
        </ejs-circulargauge>
    </div>

    <div style="aspect-ratio: 1 / 1;">
        <ejs-circulargauge id="networkGauge" title="Network" width="100%" height="100%">
            <e-circulargauge-axes>
                <e-circulargauge-axis minimum="0" maximum="100">
                    <e-circulargauge-pointers>
                        <e-circulargauge-pointer value="@Model.NetworkValue"></e-circulargauge-pointer>
                    </e-circulargauge-pointers>
                </e-circulargauge-axis>
            </e-circulargauge-axes>
        </ejs-circulargauge>
    </div>

    <div style="aspect-ratio: 1 / 1;">
        <ejs-circulargauge id="diskGauge" title="Disk" width="100%" height="100%">
            <e-circulargauge-axes>
                <e-circulargauge-axis minimum="0" maximum="100">
                    <e-circulargauge-pointers>
                        <e-circulargauge-pointer value="@Model.DiskValue"></e-circulargauge-pointer>
                    </e-circulargauge-pointers>
                </e-circulargauge-axis>
            </e-circulargauge-axes>
        </ejs-circulargauge>
    </div>
</div>
```

### Responsive 1-2-4 Columns

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public double GaugeOneValue { get; set; } = 72;

        public double GaugeTwoValue { get; set; } = 64;

        public double GaugeThreeValue { get; set; } = 48;

        public double GaugeFourValue { get; set; } = 82;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Responsive Gauge Grid";
}

<h1>Responsive Gauge Grid</h1>

<style>
    .gauge-grid {
        display: grid;
        gap: 20px;
    }

    .gauge-grid-item {
        aspect-ratio: 1 / 1;
    }

    /* Mobile: 1 column */
    @@media (max-width: 600px) {
        .gauge-grid {
            grid-template-columns: 1fr;
        }
    }

    /* Tablet: 2 columns */
    @@media (min-width: 601px) and (max-width: 1200px) {
        .gauge-grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    /* Desktop: 4 columns */
    @@media (min-width: 1201px) {
        .gauge-grid {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
</style>

<div class="gauge-grid">
    <div class="gauge-grid-item">
        <ejs-circulargauge id="g1" title="Gauge 1" width="100%" height="100%">
            <e-circulargauge-axes>
                <e-circulargauge-axis minimum="0" maximum="100">
                    <e-circulargauge-pointers>
                        <e-circulargauge-pointer value="@Model.GaugeOneValue"></e-circulargauge-pointer>
                    </e-circulargauge-pointers>
                </e-circulargauge-axis>
            </e-circulargauge-axes>
        </ejs-circulargauge>
    </div>

    <div class="gauge-grid-item">
        <ejs-circulargauge id="g2" title="Gauge 2" width="100%" height="100%">
            <e-circulargauge-axes>
                <e-circulargauge-axis minimum="0" maximum="100">
                    <e-circulargauge-pointers>
                        <e-circulargauge-pointer value="@Model.GaugeTwoValue"></e-circulargauge-pointer>
                    </e-circulargauge-pointers>
                </e-circulargauge-axis>
            </e-circulargauge-axes>
        </ejs-circulargauge>
    </div>

    <div class="gauge-grid-item">
        <ejs-circulargauge id="g3" title="Gauge 3" width="100%" height="100%">
            <e-circulargauge-axes>
                <e-circulargauge-axis minimum="0" maximum="100">
                    <e-circulargauge-pointers>
                        <e-circulargauge-pointer value="@Model.GaugeThreeValue"></e-circulargauge-pointer>
                    </e-circulargauge-pointers>
                </e-circulargauge-axis>
            </e-circulargauge-axes>
        </ejs-circulargauge>
    </div>

    <div class="gauge-grid-item">
        <ejs-circulargauge id="g4" title="Gauge 4" width="100%" height="100%">
            <e-circulargauge-axes>
                <e-circulargauge-axis minimum="0" maximum="100">
                    <e-circulargauge-pointers>
                        <e-circulargauge-pointer value="@Model.GaugeFourValue"></e-circulargauge-pointer>
                    </e-circulargauge-pointers>
                </e-circulargauge-axis>
            </e-circulargauge-axes>
        </ejs-circulargauge>
    </div>
</div>
```

## Min/Max Sizing

### Constrain Gauge Size

Use `min-width`, `max-width`, and `aspect-ratio` on the parent container.

```html
<div style="width: 100%; min-width: 300px; max-width: 600px; aspect-ratio: 1 / 1; margin: 0 auto;">
    <ejs-circulargauge id="gauge"
                        width="100%"
                        height="100%">
    </ejs-circulargauge>
</div>
```

This pattern:

- Prevents the gauge from becoming too small.
- Prevents the gauge from growing too large.
- Keeps the gauge square.
- Allows responsive scaling between the min and max width.

## Complete Responsive Example

This example creates a responsive dashboard with four Circular Gauges.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public double CpuUsage { get; set; } = 72;

        public double MemoryUsage { get; set; } = 64;

        public double NetworkTraffic { get; set; } = 48;

        public double DiskUsage { get; set; } = 82;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "System Dashboard";
}

<h1>System Dashboard</h1>

<style>
    .dashboard {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
    }

    .gauge-card {
        aspect-ratio: 1 / 1;
    }

    .gauge-container {
        width: 100%;
        height: 100%;
    }
</style>

<div class="dashboard">
    <div class="gauge-card">
        <div class="gauge-container">
            <ejs-circulargauge id="cpu"
                                title="CPU Usage"
                                width="100%"
                                height="100%">
                <e-circulargauge-axes>
                    <e-circulargauge-axis minimum="0" maximum="100">
                        <e-circulargauge-pointers>
                            <e-circulargauge-pointer value="@Model.CpuUsage"></e-circulargauge-pointer>
                        </e-circulargauge-pointers>
                    </e-circulargauge-axis>
                </e-circulargauge-axes>
            </ejs-circulargauge>
        </div>
    </div>

    <div class="gauge-card">
        <div class="gauge-container">
            <ejs-circulargauge id="memory"
                                title="Memory Usage"
                                width="100%"
                                height="100%">
                <e-circulargauge-axes>
                    <e-circulargauge-axis minimum="0" maximum="100">
                        <e-circulargauge-pointers>
                            <e-circulargauge-pointer value="@Model.MemoryUsage"></e-circulargauge-pointer>
                        </e-circulargauge-pointers>
                    </e-circulargauge-axis>
                </e-circulargauge-axes>
            </ejs-circulargauge>
        </div>
    </div>

    <div class="gauge-card">
        <div class="gauge-container">
            <ejs-circulargauge id="network"
                                title="Network Traffic"
                                width="100%"
                                height="100%">
                <e-circulargauge-axes>
                    <e-circulargauge-axis minimum="0" maximum="100">
                        <e-circulargauge-pointers>
                            <e-circulargauge-pointer value="@Model.NetworkTraffic"></e-circulargauge-pointer>
                        </e-circulargauge-pointers>
                    </e-circulargauge-axis>
                </e-circulargauge-axes>
            </ejs-circulargauge>
        </div>
    </div>

    <div class="gauge-card">
        <div class="gauge-container">
            <ejs-circulargauge id="disk"
                                title="Disk Usage"
                                width="100%"
                                height="100%">
                <e-circulargauge-axes>
                    <e-circulargauge-axis minimum="0" maximum="100">
                        <e-circulargauge-pointers>
                            <e-circulargauge-pointer value="@Model.DiskUsage"></e-circulargauge-pointer>
                        </e-circulargauge-pointers>
                    </e-circulargauge-axis>
                </e-circulargauge-axes>
            </ejs-circulargauge>
        </div>
    </div>
</div>
```

## Troubleshooting

If the gauge looks stretched:

1. Use a square parent container.

```html
<div style="aspect-ratio: 1 / 1;">
    <ejs-circulargauge width="100%" height="100%">
    </ejs-circulargauge>
</div>
```

2. Use equal pixel width and height if fixed sizing is needed.

```html
<ejs-circulargauge width="400px" height="400px">
</ejs-circulargauge>
```

If the gauge is too small on mobile:

1. Avoid fixed pixel-only sizing.
2. Use `width="100%"`.
3. Use a responsive parent container.
4. Use `max-width` instead of fixed width.

If percentage height is not working:

1. Confirm that the parent container has a fixed height or aspect ratio.

```html
<div style="width: 100%; max-width: 600px; aspect-ratio: 1 / 1;">
    <ejs-circulargauge width="100%" height="100%">
    </ejs-circulargauge>
</div>
```

2. Avoid using `height="100%"` inside a parent that does not have a calculated height.

If gauges are not aligned in a grid:

1. Use equal grid columns.
2. Use `aspect-ratio: 1 / 1` on each grid item.
3. Use consistent `width="100%"` and `height="100%"` on every gauge.

If responsiveness is not working:

1. Confirm that media queries are valid.
2. Confirm that CSS comments are valid.
3. Confirm that the layout is not constrained by fixed pixel widths.
4. Confirm the browser viewport meta tag exists in `_Layout.cshtml`.

Recommended viewport tag in `Pages/Shared/_Layout.cshtml`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

