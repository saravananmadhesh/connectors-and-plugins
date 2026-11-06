# Adding and Customizing Circular Gauge Ranges

## Table of Contents

- [Overview](#overview)
- [Creating Ranges](#creating-ranges)
  - [Basic Range](#basic-range)
  - [Complete Range Example](#complete-range-example)
- [Range Customization](#range-customization)
  - [Width Customization](#width-customization)
  - [Tapered Ranges](#tapered-ranges)
  - [Range Border](#range-border)
- [Range Positioning](#range-positioning)
  - [Radius in Pixels](#radius-in-pixels)
  - [Radius in Percentage](#radius-in-percentage)
  - [Layered Ranges](#layered-ranges)
- [Dragging Ranges](#dragging-ranges)
  - [Enable Global Range Drag](#enable-global-range-drag)
  - [Drag Interaction](#drag-interaction)
- [Multiple Ranges](#multiple-ranges)
  - [Creating Multiple Ranges](#creating-multiple-ranges)
  - [Overlapping Ranges](#overlapping-ranges)
- [Rounded Corners](#rounded-corners)
  - [Applying Rounded Corners](#applying-rounded-corners)
  - [Rounded Corner Variations](#rounded-corner-variations)
- [Gradient Colors](#gradient-colors)
  - [Linear Gradient](#linear-gradient)
  - [Radial Gradient](#radial-gradient)
  - [Gradient Use Cases](#gradient-use-cases)
- [Range Color with Tick/Label](#range-color-with-ticklabel)
  - [Inherit Range Color](#inherit-range-color)
- [Complete Example: Multi-Zone Gauge](#complete-example-multi-zone-gauge)
- [Troubleshooting](#troubleshooting)
- [Combined Mistakes and Future References](#combined-mistakes-and-future-references)

## Overview

Ranges are colored intervals on the Circular Gauge axis that categorize value zones. They help users quickly identify whether a value is normal, warning, or critical.

Common range mapping:

- Green range: Good or normal values.
- Yellow range: Warning or caution values.
- Red range: Danger or critical values.

Ranges are useful in dashboards, monitoring pages, CPU meters, temperature indicators, speedometers, and threshold-based visualizations.

## Creating Ranges

### Basic Range

Add `e-circulargauge-ranges` inside `e-circulargauge-axis`, then add one or more `e-circulargauge-range` tags.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Basic Range";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double RangeStart { get; set; } = 0;

        public double RangeEnd { get; set; } = 30;

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
    ViewData["Title"] = "Basic Range";
}

<h1>Basic Circular Gauge Range</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="@Model.RangeStart"
                                       end="@Model.RangeEnd"
                                       color="#2ECC71">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Range properties:

- `start` defines the beginning value of the range.
- `end` defines the ending value of the range.
- `color` defines the range fill color.

### Complete Range Example

Create a traffic-light-style gauge with green, yellow, and red ranges.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "System Status";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 65;

        public double GoodRangeStart { get; set; } = 0;

        public double GoodRangeEnd { get; set; } = 35;

        public double WarningRangeStart { get; set; } = 35;

        public double WarningRangeEnd { get; set; } = 70;

        public double CriticalRangeStart { get; set; } = 70;

        public double CriticalRangeEnd { get; set; } = 100;

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
    ViewData["Title"] = "Complete Range Example";
}

<h1>Complete Range Example</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue"
                              radius="90%">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="@Model.GoodRangeStart"
                                       end="@Model.GoodRangeEnd"
                                       color="#2ECC71">
                </e-circulargauge-range>

                <e-circulargauge-range start="@Model.WarningRangeStart"
                                       end="@Model.WarningRangeEnd"
                                       color="#F39C12">
                </e-circulargauge-range>

                <e-circulargauge-range start="@Model.CriticalRangeStart"
                                       end="@Model.CriticalRangeEnd"
                                       color="#E74C3C">
                </e-circulargauge-range>
            </e-circulargauge-ranges>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Range Customization

### Width Customization

Use `startWidth` and `endWidth` to control range thickness.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Range Width Customization";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double RangeStart { get; set; } = 0;

        public double RangeEnd { get; set; } = 35;

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
    ViewData["Title"] = "Range Width Customization";
}

<h1>Range Width Customization</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="@Model.RangeStart"
                                       end="@Model.RangeEnd"
                                       color="#2ECC71"
                                       startWidth="10"
                                       endWidth="20">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Width properties:

- `startWidth` controls the thickness at the range start.
- `endWidth` controls the thickness at the range end.
- Equal values create a uniform range band.
- Different values create a tapered effect.

### Tapered Ranges

Use different `startWidth` and `endWidth` values to create tapered ranges.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Tapered Ranges";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

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
    ViewData["Title"] = "Tapered Ranges";
}

<h1>Tapered Ranges</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0"
                                       end="35"
                                       color="#2ECC71"
                                       startWidth="20"
                                       endWidth="5">
                </e-circulargauge-range>

                <e-circulargauge-range start="40"
                                       end="75"
                                       color="#F39C12"
                                       startWidth="5"
                                       endWidth="20">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Tapering examples:

- `startWidth="20"` and `endWidth="5"` creates a range that narrows toward the end.
- `startWidth="5"` and `endWidth="20"` creates a range that widens toward the end.

### Range Border

The `e-circulargauge-range-border` child tag is not the correct ASP.NET Core EJ2 Circular Gauge range structure. Avoid this pattern:

```html
<e-circulargauge-range-border width="2" color="#27AE60">
</e-circulargauge-range-border>
```

If you need a border-like visual effect, use layered ranges. Place a slightly wider range behind the main range.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Border-Like Range Effect";

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
    ViewData["Title"] = "Border-Like Range Effect";
}

<h1>Border-Like Range Effect</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0"
                                       end="35"
                                       color="#27AE60"
                                       radius="90%"
                                       startWidth="18"
                                       endWidth="18">
                </e-circulargauge-range>

                <e-circulargauge-range start="0"
                                       end="35"
                                       color="#2ECC71"
                                       radius="90%"
                                       startWidth="12"
                                       endWidth="12">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

This creates the visual appearance of a bordered range by rendering a wider darker range behind a narrower main range.

## Range Positioning

### Radius in Pixels

Use `radius` with a pixel value to place the range at a fixed distance from the gauge center.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Range Radius in Pixels";

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
    ViewData["Title"] = "Range Radius in Pixels";
}

<h1>Range Radius in Pixels</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0"
                                       end="35"
                                       color="#2ECC71"
                                       radius="180">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Radius in Percentage

Use `radius` with a percentage value to position the range relative to the axis radius.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Range Radius in Percentage";

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
    ViewData["Title"] = "Range Radius in Percentage";
}

<h1>Range Radius in Percentage</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120"
                              radius="90%">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0"
                                       end="35"
                                       color="#2ECC71"
                                       radius="90%">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Layered Ranges

Use different `radius`, `startWidth`, and `endWidth` values to create layered ranges.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Layered Ranges";

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
    ViewData["Title"] = "Layered Ranges";
}

<h1>Layered Ranges</h1>

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
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0"
                                       end="35"
                                       color="#2ECC71"
                                       radius="90%"
                                       startWidth="10"
                                       endWidth="10">
                </e-circulargauge-range>

                <e-circulargauge-range start="0"
                                       end="35"
                                       color="#F39C12"
                                       radius="75%"
                                       startWidth="10"
                                       endWidth="10">
                </e-circulargauge-range>

                <e-circulargauge-range start="0"
                                       end="35"
                                       color="#E74C3C"
                                       radius="60%"
                                       startWidth="10"
                                       endWidth="10">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Dragging Ranges

### Enable Global Range Drag

Set `enableRangeDrag="true"` on the root `ejs-circulargauge` tag to allow range dragging.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Draggable Range";

        public double RangeStart { get; set; } = 20;

        public double RangeEnd { get; set; } = 60;

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
    ViewData["Title"] = "Draggable Range";
}

<h1>Draggable Range</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    enableRangeDrag="true">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="@Model.RangeStart"
                                       end="@Model.RangeEnd"
                                       color="#2ECC71"
                                       startWidth="12"
                                       endWidth="12">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Drag Interaction

When range dragging is enabled:

1. The user clicks or taps a range.
2. The user drags the range along the gauge axis.
3. The range position updates interactively.
4. The range remains constrained by the axis minimum and maximum.
5. The user releases the pointer to finalize the range position.

Range dragging is useful for threshold adjustment, alarm zone configuration, and interactive dashboard controls.

## Multiple Ranges

### Creating Multiple Ranges

Add multiple `e-circulargauge-range` tags inside `e-circulargauge-ranges`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Multiple Ranges";

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
    ViewData["Title"] = "Multiple Ranges";
}

<h1>Multiple Ranges</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0" end="20" color="#27AE60"></e-circulargauge-range>
                <e-circulargauge-range start="20" end="40" color="#2ECC71"></e-circulargauge-range>
                <e-circulargauge-range start="40" end="60" color="#F39C12"></e-circulargauge-range>
                <e-circulargauge-range start="60" end="80" color="#E67E22"></e-circulargauge-range>
                <e-circulargauge-range start="80" end="100" color="#E74C3C"></e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Best practices:

- Use 3 to 5 ranges for readability.
- Use a meaningful color sequence.
- Keep ranges within the axis minimum and maximum.
- Avoid overlapping ranges unless the visual effect is intentional.

### Overlapping Ranges

Use different `radius`, `startWidth`, and `endWidth` values when ranges overlap intentionally.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Overlapping Ranges";

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
    ViewData["Title"] = "Overlapping Ranges";
}

<h1>Overlapping Ranges</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0"
                                       end="100"
                                       color="#ECF0F1"
                                       radius="85%"
                                       startWidth="15"
                                       endWidth="15">
                </e-circulargauge-range>

                <e-circulargauge-range start="20"
                                       end="80"
                                       color="#2ECC71"
                                       radius="90%"
                                       startWidth="10"
                                       endWidth="10">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Rounded Corners

### Applying Rounded Corners

Use `roundedCornerRadius` to smooth the start and end edges of the range.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Rounded Range";

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
    ViewData["Title"] = "Rounded Range";
}

<h1>Rounded Range</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0"
                                       end="35"
                                       color="#2ECC71"
                                       startWidth="15"
                                       endWidth="15"
                                       roundedCornerRadius="5">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Rounded Corner Variations

Use smaller or larger `roundedCornerRadius` values depending on the visual style.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Rounded Corner Variations";

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
    ViewData["Title"] = "Rounded Corner Variations";
}

<h1>Rounded Corner Variations</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0"
                                       end="30"
                                       color="#2ECC71"
                                       startWidth="12"
                                       endWidth="12"
                                       roundedCornerRadius="2">
                </e-circulargauge-range>

                <e-circulargauge-range start="35"
                                       end="65"
                                       color="#F39C12"
                                       startWidth="12"
                                       endWidth="12"
                                       roundedCornerRadius="5">
                </e-circulargauge-range>

                <e-circulargauge-range start="70"
                                       end="100"
                                       color="#E74C3C"
                                       startWidth="12"
                                       endWidth="12"
                                       roundedCornerRadius="10">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Gradient Colors

### Linear Gradient

Do not use nested tags like `e-linear-gradient` and `e-color-stops` inside `e-circulargauge-range`. Configure a `CircularGaugeLinearGradient` object in `Index.cshtml.cs` and bind it using the `linearGradient` property.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.CircularGauge;
using System.Collections.Generic;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Linear Gradient Range";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double RangeStart { get; set; } = 0;

        public double RangeEnd { get; set; } = 100;

        public CircularGaugeLinearGradient RangeLinearGradient { get; set; } = new CircularGaugeLinearGradient
        {
            StartValue = "0",
            EndValue = "100",
            ColorStop = new List<CircularGaugeColorStop>
            {
                new CircularGaugeColorStop
                {
                    Color = "#FF5733",
                    Offset = "0%"
                },
                new CircularGaugeColorStop
                {
                    Color = "#FFC300",
                    Offset = "50%"
                },
                new CircularGaugeColorStop
                {
                    Color = "#28A745",
                    Offset = "100%"
                }
            }
        };

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
    ViewData["Title"] = "Linear Gradient Range";
}

<h1>Linear Gradient Range</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="@Model.RangeStart"
                                       end="@Model.RangeEnd"
                                       startWidth="10"
                                       endWidth="20"
                                       linearGradient="@Model.RangeLinearGradient">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

**Linear Gradient Properties:**
- `startValue`: Gradient start position (axis value)
- `endValue`: Gradient end position (axis value)
- `colorStop`: Array of color positions with offset percentages

### Radial Gradient

Do not use nested radial gradient tags inside `e-circulargauge-range`. Configure a `CircularGaugeRadialGradient` object in `Index.cshtml.cs` and bind it using the `radialGradient` property.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.CircularGauge;
using System.Collections.Generic;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Radial Gradient Range";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double RangeStart { get; set; } = 0;

        public double RangeEnd { get; set; } = 100;

        public CircularGaugeRadialGradient RangeRadialGradient { get; set; } = new CircularGaugeRadialGradient
        {
            Radius = "65%",
            InnerPosition = new CircularGaugeGradientPosition
            {
                X = "50%",
                Y = "50%"
            },
            OuterPosition = new CircularGaugeGradientPosition
            {
                X = "50%",
                Y = "50%"
            },
            ColorStop = new List<CircularGaugeColorStop>
            {
                new CircularGaugeColorStop
                {
                    Color = "#FF5733",
                    Offset = "0%"
                },
                new CircularGaugeColorStop
                {
                    Color = "#28A745",
                    Offset = "100%"
                }
            }
        };

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
    ViewData["Title"] = "Radial Gradient Range";
}

<h1>Radial Gradient Range</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="@Model.RangeStart"
                                       end="@Model.RangeEnd"
                                       startWidth="10"
                                       endWidth="20"
                                       radialGradient="@Model.RangeRadialGradient">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

**Radial Gradient Properties:**
- `innerPosition`: Inner circle position (%)
- `outerPosition`: Outer circle position (%)
- `colorStop`: Color positions with offset

### Gradient Use Cases

Use gradients when a single range needs a gradual transition instead of one static color.

Common use cases:

- Heat maps from low to high values.
- Critical zones with increasing severity.
- Performance ranges from poor to good.
- Professional dashboard visuals with smooth color transitions.

If both `linearGradient` and `radialGradient` are configured on the same range, the linear gradient takes priority.

## Range Color with Tick/Label

### Inherit Range Color

Use `useRangeColor="true"` in axis label style, major ticks, and minor ticks when ticks and labels should follow the corresponding range color.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Range Color for Axis";

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
    ViewData["Title"] = "Range Color for Axis";
}

<h1>Range Color with Tick and Label</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0" end="35" color="#2ECC71"></e-circulargauge-range>
                <e-circulargauge-range start="35" end="70" color="#F39C12"></e-circulargauge-range>
                <e-circulargauge-range start="70" end="100" color="#E74C3C"></e-circulargauge-range>
            </e-circulargauge-ranges>

            <e-axis-majorticks useRangeColor="true"
                               interval="10"
                               height="8">
            </e-axis-majorticks>

            <e-axis-minorticks useRangeColor="true">
            </e-axis-minorticks>

            <e-axis-labelstyle useRangeColor="true"
                               format="{value}%">
            </e-axis-labelstyle>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Correct ASP.NET Core child tags used here:

- `e-axis-majorticks`
- `e-axis-minorticks`
- `e-axis-labelstyle`

## Complete Example: Multi-Zone Gauge

This complete example combines:

- Multiple ranges.
- Rounded corners.
- Different range widths.
- Linear gradient for the critical range.
- Range color inheritance for ticks and labels.
- Pointer animation.
- Range dragging.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.CircularGauge;
using System.Collections.Generic;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "CPU Usage";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 62;

        public double OptimalStart { get; set; } = 0;

        public double OptimalEnd { get; set; } = 30;

        public double AcceptableStart { get; set; } = 30;

        public double AcceptableEnd { get; set; } = 70;

        public double CriticalStart { get; set; } = 70;

        public double CriticalEnd { get; set; } = 100;

        public CircularGaugeLinearGradient CriticalLinearGradient { get; set; } = new CircularGaugeLinearGradient
        {
            StartValue = "70",
            EndValue = "100",
            ColorStop = new List<CircularGaugeColorStop>
            {
                new CircularGaugeColorStop
                {
                    Color = "#E67E22",
                    Offset = "0%"
                },
                new CircularGaugeColorStop
                {
                    Color = "#E74C3C",
                    Offset = "100%"
                }
            }
        };

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
    ViewData["Title"] = "Multi-Zone Gauge";
}

<h1>Multi-Zone Gauge</h1>

<ejs-circulargauge id="complexGauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    enableRangeDrag="true">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue"
                              radius="90%">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="@Model.OptimalStart"
                                       end="@Model.OptimalEnd"
                                       color="#27AE60"
                                       startWidth="15"
                                       endWidth="25"
                                       roundedCornerRadius="5">
                </e-circulargauge-range>

                <e-circulargauge-range start="@Model.AcceptableStart"
                                       end="@Model.AcceptableEnd"
                                       color="#F39C12"
                                       startWidth="15"
                                       endWidth="25"
                                       roundedCornerRadius="5">
                </e-circulargauge-range>

                <e-circulargauge-range start="@Model.CriticalStart"
                                       end="@Model.CriticalEnd"
                                       startWidth="15"
                                       endWidth="25"
                                       roundedCornerRadius="5"
                                       linearGradient="@Model.CriticalLinearGradient">
                </e-circulargauge-range>
            </e-circulargauge-ranges>

            <e-axis-majorticks useRangeColor="true"
                               interval="10"
                               height="8">
            </e-axis-majorticks>

            <e-axis-labelstyle useRangeColor="true"
                               format="{value}%">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue"
                                         color="#2C3E50"
                                         pointerWidth="4">
                    <e-pointer-animation enable="true"
                                         duration="1000">
                    </e-pointer-animation>
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Troubleshooting

If ranges are not visible:

1. Confirm that range `start` and `end` values are inside the axis `minimum` and `maximum`.

```html
<e-circulargauge-axis minimum="0" maximum="100">
    <e-circulargauge-ranges>
        <e-circulargauge-range start="20"
                               end="60"
                               color="#2ECC71">
        </e-circulargauge-range>
    </e-circulargauge-ranges>
</e-circulargauge-axis>
```

2. Confirm that the range has a visible `color`.

```html
<e-circulargauge-range start="0"
                       end="35"
                       color="#2ECC71">
</e-circulargauge-range>
```

3. Confirm that the range `radius` is not too small or outside the visible gauge area.

```html
<e-circulargauge-range start="0"
                       end="35"
                       radius="90%"
                       color="#2ECC71">
</e-circulargauge-range>
```

If dragging is not working:

1. Confirm that `enableRangeDrag="true"` is set on the root Circular Gauge.

```html
<ejs-circulargauge enableRangeDrag="true">
</ejs-circulargauge>
```

2. Confirm that the range has valid `start` and `end` values.

```html
<e-circulargauge-range start="20"
                       end="60"
                       color="#2ECC71">
</e-circulargauge-range>
```

3. Check the browser console for JavaScript errors.

If linear gradient is not showing:

1. Do not use unsupported nested tags like this:

```html
<e-linear-gradient startValue="0" endValue="100">
    <e-color-stops color="#FF5733" offset="0%"></e-color-stops>
</e-linear-gradient>
```

2. Configure `CircularGaugeLinearGradient` in `Index.cshtml.cs`.

```csharp
public CircularGaugeLinearGradient RangeLinearGradient { get; set; } = new CircularGaugeLinearGradient
{
    StartValue = "0",
    EndValue = "100",
    ColorStop = new List<CircularGaugeColorStop>
    {
        new CircularGaugeColorStop { Color = "#FF5733", Offset = "0%" },
        new CircularGaugeColorStop { Color = "#FFC300", Offset = "50%" },
        new CircularGaugeColorStop { Color = "#28A745", Offset = "100%" }
    }
};
```

3. Bind it to the range.

```html
<e-circulargauge-range start="0"
                       end="100"
                       linearGradient="@Model.RangeLinearGradient">
</e-circulargauge-range>
```

If radial gradient is not showing:

1. Do not use unsupported nested radial gradient tags inside `e-circulargauge-range`.

2. Configure `CircularGaugeRadialGradient` in `Index.cshtml.cs`.

```csharp
public CircularGaugeRadialGradient RangeRadialGradient { get; set; } = new CircularGaugeRadialGradient
{
    Radius = "65%",
    InnerPosition = new CircularGaugeGradientPosition
    {
        X = "50%",
        Y = "50%"
    },
    OuterPosition = new CircularGaugeGradientPosition
    {
        X = "50%",
        Y = "50%"
    },
    ColorStop = new List<CircularGaugeColorStop>
    {
        new CircularGaugeColorStop { Color = "#FF5733", Offset = "0%" },
        new CircularGaugeColorStop { Color = "#28A745", Offset = "100%" }
    }
};
```

3. Bind it to the range.

```html
<e-circulargauge-range start="0"
                       end="100"
                       radialGradient="@Model.RangeRadialGradient">
</e-circulargauge-range>
```

If tick or label colors are not inheriting range colors:

1. Use `e-axis-majorticks`, `e-axis-minorticks`, and `e-axis-labelstyle`.

```html
<e-axis-majorticks useRangeColor="true"></e-axis-majorticks>
<e-axis-minorticks useRangeColor="true"></e-axis-minorticks>
<e-axis-labelstyle useRangeColor="true"></e-axis-labelstyle>
```

2. Do not use `e-circulargauge-majorticks` or `e-circulargauge-labelstyle` for this ASP.NET Core Circular Gauge axis structure.

If pointer animation is not applied:

1. Use `e-pointer-animation` inside `e-circulargauge-pointer`.

```html
<e-circulargauge-pointer value="62">
    <e-pointer-animation enable="true"
                         duration="1000">
    </e-pointer-animation>
</e-circulargauge-pointer>
```

2. Do not use `e-circulargauge-pointer-animation` in this ASP.NET Core tag-helper structure.

