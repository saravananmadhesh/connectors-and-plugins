# Configuring Circular Gauge Axes

## Table of Contents

- [Overview](#overview)
- [Axis Customization](#axis-customization)
  - [Customizing Axis Line](#customizing-axis-line)
  - [Axis Background](#axis-background)
- [Angles and Direction](#angles-and-direction)
  - [Understanding Angle Measurement](#understanding-angle-measurement)
  - [Setting Start and End Angles](#setting-start-and-end-angles)
  - [Gauge Sweep Direction](#gauge-sweep-direction)
  - [Example Configurations](#example-configurations)
- [Axis Radius](#axis-radius)
  - [Radius in Pixels](#radius-in-pixels)
  - [Radius in Percentage](#radius-in-percentage)
- [Ticks Configuration](#ticks-configuration)
  - [Major Ticks](#major-ticks)
  - [Minor Ticks](#minor-ticks)
  - [Tick Position](#tick-position)
- [Labels and Formatting](#labels-and-formatting)
  - [Basic Label Configuration](#basic-label-configuration)
  - [Label Position](#label-position)
  - [Auto Angle Labels](#auto-angle-labels)
  - [Label Format](#label-format)
  - [Smart Label Handling](#smart-label-handling)
  - #hide-intersecting-labels
- [Minimum and Maximum Values](#minimum-and-maximum-values)
- [Multiple Axes](#multiple-axes)
- [Complete Example: Temperature Gauge](#complete-example-temperature-gauge)
- [Troubleshooting](#troubleshooting)

## Overview

The axis is the foundation of a Circular Gauge. Each axis defines the scale, angles, direction, labels, ticks, ranges, pointers, and annotations for a gauge.

A Circular Gauge can contain one or more axes. Each axis can have its own:

- Minimum and maximum values.
- Start and end angles.
- Direction.
- Radius.
- Major and minor ticks.
- Label style and formatting.
- Ranges.
- Pointers.
- Annotations.

In ASP.NET Core Circular Gauge, axis-related child tags should use the correct axis-level tag helper names, such as:

```html
<e-axis-linestyle>
</e-axis-linestyle>

<e-axis-majorticks>
</e-axis-majorticks>

<e-axis-minorticks>
</e-axis-minorticks>

<e-axis-labelstyle>
</e-axis-labelstyle>
```

Do not use these older or incorrect tag names for this ASP.NET Core EJ2 axis structure:

```html
<e-circulargauge-majorticks>
</e-circulargauge-majorticks>

<e-circulargauge-minorticks>
</e-circulargauge-minorticks>

<e-circulargauge-labelstyle>
</e-circulargauge-labelstyle>
```

## Axis Customization

### Customizing Axis Line

Use `e-axis-linestyle` inside `e-circulargauge-axis` to customize the axis line.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Axis Line Customization";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

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
    ViewData["Title"] = "Axis Line Customization";
}

<h1>Axis Line Customization</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-axis-linestyle color="#FF6B6B"
                              width="3">
            </e-axis-linestyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Axis line properties:

- `color`: Axis line color.
- `width`: Axis line thickness.

### Axis Background

Use the axis `background` property to apply a background color to the axis area.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Axis Background";

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
    ViewData["Title"] = "Axis Background";
}

<h1>Axis Background</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100"
                              background="#F0F0F0">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Angles and Direction

### Understanding Angle Measurement

Circular Gauge angles are measured in degrees.

Common reference points:

- `0°`: Right side.
- `90°`: Bottom.
- `180°`: Left side.
- `270°`: Top.

The `startAngle` and `endAngle` properties control where the axis starts and ends.

### Setting Start and End Angles

Use `startAngle` and `endAngle` on `e-circulargauge-axis`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Full Circular Gauge";

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
    ViewData["Title"] = "Full Circular Gauge";
}

<h1>Full Circular Gauge</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="0"
                              endAngle="360"
                              minimum="0"
                              maximum="100">
            <e-axis-labelstyle hiddenLabel="Last">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

For a full 360-degree gauge, hiding the last label is useful because the first and last labels can overlap.

### Gauge Sweep Direction

Use the axis `direction` property to control clockwise or counter-clockwise rendering.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Axis Direction";

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
    ViewData["Title"] = "Axis Direction";
}

<h1>Axis Direction</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100"
                              direction="ClockWise">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Direction options:

- `ClockWise`
- `AntiClockWise`

### Example Configurations

Common angle configurations:

```html
<!-- Semi-circular gauge -->
<e-circulargauge-axis startAngle="180"
                      endAngle="0"
                      minimum="0"
                      maximum="100">
</e-circulargauge-axis>

<!-- Quarter circular gauge -->
<e-circulargauge-axis startAngle="0"
                      endAngle="90"
                      minimum="0"
                      maximum="100">
</e-circulargauge-axis>

<!-- Full circular gauge -->
<e-circulargauge-axis startAngle="0"
                      endAngle="360"
                      minimum="0"
                      maximum="100">
</e-circulargauge-axis>

<!-- RTL-style direction -->
<e-circulargauge-axis startAngle="0"
                      endAngle="360"
                      minimum="0"
                      maximum="100"
                      direction="AntiClockWise">
</e-circulargauge-axis>
```

## Axis Radius

Use `radius` to control the axis size inside the gauge area.

### Radius in Pixels

Use a numeric pixel value for fixed-size layouts.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Axis Radius in Pixels";

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
    ViewData["Title"] = "Axis Radius in Pixels";
}

<h1>Axis Radius in Pixels</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100"
                              radius="200">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Radius in Percentage

Use a percentage radius for responsive layouts.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Axis Radius in Percentage";

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
    ViewData["Title"] = "Axis Radius in Percentage";
}

<h1>Axis Radius in Percentage</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100"
                              radius="90%">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Ticks Configuration

### Major Ticks

Use `e-axis-majorticks` inside `e-circulargauge-axis`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Major Ticks";

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
    ViewData["Title"] = "Major Ticks";
}

<h1>Major Ticks</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-axis-majorticks interval="20"
                               height="10"
                               width="2"
                               color="#FF6B6B">
            </e-axis-majorticks>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Minor Ticks

Use `e-axis-minorticks` inside `e-circulargauge-axis`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Minor Ticks";

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
    ViewData["Title"] = "Minor Ticks";
}

<h1>Minor Ticks</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-axis-minorticks interval="5"
                               height="5"
                               width="1"
                               color="#C7C7C7">
            </e-axis-minorticks>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Tick Position

Use the `position` and `offset` properties on major or minor ticks.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Tick Position";

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
    ViewData["Title"] = "Tick Position";
}

<h1>Tick Position</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-axis-majorticks interval="20"
                               height="10"
                               width="2"
                               position="Outside"
                               offset="5"
                               color="#FF6B6B">
            </e-axis-majorticks>

            <e-axis-minorticks interval="5"
                               height="5"
                               width="1"
                               position="Inside"
                               offset="0"
                               color="#C7C7C7">
            </e-axis-minorticks>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Tick properties:

- `interval`: Distance between tick values.
- `height`: Tick length.
- `width`: Tick thickness.
- `color`: Tick color.
- `position`: `Inside` or `Outside`.
- `offset`: Distance from the axis line.

## Labels and Formatting

### Basic Label Configuration

Use `e-axis-labelstyle` inside `e-circulargauge-axis`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Axis Labels";

        public double PointerValue { get; set; } = 65.5;

        public string LabelFormat { get; set; } = "n1";

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
    ViewData["Title"] = "Axis Labels";
}

<h1>Axis Labels</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-axis-labelstyle format="@Model.LabelFormat"
                               offset="10">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Label Position

Use `position` and `offset` on `e-axis-labelstyle`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Label Position";

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
    ViewData["Title"] = "Label Position";
}

<h1>Label Position</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-axis-labelstyle position="Inside"
                               offset="5">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Label position options:

- `Inside`
- `Outside`

### Auto Angle Labels

Use `autoAngle="true"` to rotate labels along the axis angle.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Auto Angle Labels";

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
    ViewData["Title"] = "Auto Angle Labels";
}

<h1>Auto Angle Labels</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-axis-labelstyle autoAngle="true">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Label Format

Use standard numeric format strings or custom `{value}` formats.

```html
<!-- Number format -->
<e-axis-labelstyle format="n1">
</e-axis-labelstyle>

<!-- Currency format -->
<e-axis-labelstyle format="c2">
</e-axis-labelstyle>

<!-- Percentage for decimal axis such as 0 to 1 -->
<e-axis-labelstyle format="p1">
</e-axis-labelstyle>

<!-- Custom format with unit -->
<e-axis-labelstyle format="{value}°C">
</e-axis-labelstyle>
```

Common format codes:

- `n0`, `n1`, `n2`: Number format.
- `p0`, `p1`, `p2`: Percentage format.
- `c0`, `c1`, `c2`: Currency format.
- `{value}`: Custom value placeholder.

### Smart Label Handling

For full circular gauges, use `hiddenLabel="Last"` to prevent the first and last labels from overlapping.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Smart Label Handling";

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
    ViewData["Title"] = "Smart Label Handling";
}

<h1>Smart Label Handling</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="0"
                              endAngle="360"
                              minimum="0"
                              maximum="100">
            <e-axis-labelstyle hiddenLabel="Last">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Hidden label options:

- `First`
- `Last`

### Hide Intersecting Labels

Use `hideIntersectingLabel="true"` on the axis to automatically hide labels that overlap.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Hide Intersecting Labels";

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
    ViewData["Title"] = "Hide Intersecting Labels";
}

<h1>Hide Intersecting Labels</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100"
                              hideIntersectingLabel="true">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Minimum and Maximum Values

Use `minimum` and `maximum` to define the axis value range.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Speed Gauge";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 120;

        public double PointerValue { get; set; } = 70;

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
    ViewData["Title"] = "Speed Gauge";
}

<h1>Speed Gauge</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Range examples:

- Speed gauge: `minimum="0"` and `maximum="200"`.
- Temperature gauge: `minimum="-40"` and `maximum="50"`.
- Percentage gauge: `minimum="0"` and `maximum="100"`.
- Decimal gauge: `minimum="0"` and `maximum="10.5"`.

## Multiple Axes

Use multiple `e-circulargauge-axis` tags inside `e-circulargauge-axes`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Multiple Axes";

        public double OuterPointerValue { get; set; } = 60;

        public double InnerPointerValue { get; set; } = 80;

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
    ViewData["Title"] = "Multiple Axes";
}

<h1>Multiple Axes</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100"
                              radius="90%">
            <e-axis-linestyle color="#3498DB"
                              width="2">
            </e-axis-linestyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.OuterPointerValue"
                                         color="#3498DB">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>

        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="120"
                              radius="70%">
            <e-axis-linestyle color="#E74C3C"
                              width="2">
            </e-axis-linestyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.InnerPointerValue"
                                         color="#E74C3C">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Multiple-axis guidelines:

- Use different `radius` values to avoid overlap.
- Use different colors for visual distinction.
- Limit to 2 or 3 axes for readability.
- Each axis can have its own scale, ranges, labels, and pointers.

## Complete Example: Temperature Gauge

This example combines:

- Custom start and end angles.
- Negative and positive axis values.
- Major and minor ticks.
- Label formatting with degree symbol.
- Auto-angle labels.
- Pointer value from `Index.cshtml.cs`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Temperature (°C)";

        public double MinimumTemperature { get; set; } = -40;

        public double MaximumTemperature { get; set; } = 50;

        public double CurrentTemperature { get; set; } = 20;

        public string LabelFormat { get; set; } = "{value}°";

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
    ViewData["Title"] = "Temperature Gauge";
}

<h1>Temperature Gauge</h1>

<ejs-circulargauge id="tempGauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="200"
                              endAngle="160"
                              minimum="@Model.MinimumTemperature"
                              maximum="@Model.MaximumTemperature"
                              radius="90%">
            <e-axis-majorticks interval="10"
                               height="8"
                               width="1"
                               color="#666666">
            </e-axis-majorticks>

            <e-axis-minorticks interval="2"
                               height="4"
                               width="1"
                               color="#CCCCCC">
            </e-axis-minorticks>

            <e-axis-labelstyle format="@Model.LabelFormat"
                               offset="12"
                               autoAngle="true">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.CurrentTemperature">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Troubleshooting

If labels overlap:

1. Use `autoAngle="true"`.

```html
<e-axis-labelstyle autoAngle="true">
</e-axis-labelstyle>
```

2. Move labels outside.

```html
<e-axis-labelstyle position="Outside"
                   offset="10">
</e-axis-labelstyle>
```

3. Hide intersecting labels.

```html
<e-circulargauge-axis hideIntersectingLabel="true">
</e-circulargauge-axis>
```

4. For full circular gauges, hide the first or last label.

```html
<e-axis-labelstyle hiddenLabel="Last">
</e-axis-labelstyle>
```

If ticks are not visible:

1. Use the correct tick tags.

```html
<e-axis-majorticks>
</e-axis-majorticks>

<e-axis-minorticks>
</e-axis-minorticks>
```

2. Increase tick `height` and `width`.

```html
<e-axis-majorticks height="10"
                   width="2">
</e-axis-majorticks>
```

3. Check tick color contrast.

```html
<e-axis-majorticks color="#333333">
</e-axis-majorticks>
```

If the axis line is not visible:

1. Use `e-axis-linestyle`.

```html
<e-axis-linestyle width="3"
                  color="#FF6B6B">
</e-axis-linestyle>
```

2. Ensure line width is greater than `0`.

3. Use a visible color with sufficient contrast.

If the axis radius does not behave as expected:

1. Use percentage radius for responsive layouts.

```html
<e-circulargauge-axis radius="90%">
</e-circulargauge-axis>
```

2. Use pixel radius only for fixed layouts.

```html
<e-circulargauge-axis radius="200">
</e-circulargauge-axis>
```

If multiple axes overlap:

1. Assign different radius values.

```html
<e-circulargauge-axis radius="90%">
</e-circulargauge-axis>

<e-circulargauge-axis radius="70%">
</e-circulargauge-axis>
```

2. Use different colors for each axis.

3. Reduce label or tick size if space is limited.
