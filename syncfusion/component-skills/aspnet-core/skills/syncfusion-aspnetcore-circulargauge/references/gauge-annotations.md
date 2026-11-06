# Annotations and Custom Content in Circular Gauge

## Table of Contents

- [Overview](#overview)
- [Adding Text Annotations](#adding-text-annotations)
  - [Basic Text Annotation](#basic-text-annotation)
  - [Styled Text Annotation](#styled-text-annotation)
  - [Multiple Text Annotations](#multiple-text-annotations)
- [Positioning Annotations](#positioning-annotations)
  - [Understanding Position](#understanding-position)
  - [Angle Reference](#angle-reference)
  - [Common Positions](#common-positions)
  - [Fixed vs Percentage Positioning](#fixed-vs-percentage-positioning)
  - [Positioning Around Gauge](#positioning-around-gauge)
- [Image Annotations](#image-annotations)
  - [Adding Images](#adding-images)
  - [Branded Annotations](#branded-annotations)- [Overview](#overview)
  - [Icon with Text](#icon-with-text)
- [Sub-Gauges](#sub-gauges)
  - [Creating a Sub-Gauge](#creating-a-sub-gauge)
  - [Sub-Gauge Use Cases](#sub-gauge-use-cases)
- [Multiple Annotations](#multiple-annotations)
  - [Dashboard with Multiple Annotations](#dashboard-with-multiple-annotations)
  - [Annotation Layout Strategies](#annotation-layout-strategies)
  - [Complete Example: Diagnostic Dashboard](#complete-example-diagnostic-dashboard)
- [Styling Annotations](#styling-annotations)
  - [CSS in Content](#css-in-content)
  - [Responsive Annotations](#responsive-annotations)
- [Troubleshooting](#troubleshooting)
- [Combined Mistakes and Future References](#combined-mistakes-and-future-references)

## Overview

Annotations allow custom content to be placed on a Circular Gauge. Annotation content can include text, HTML, icons, images, status indicators, and custom value displays.

Common uses include:

- Displaying current values.
- Showing units such as `km/h`, `%`, `RPM`, or `°C`.
- Adding status text.
- Adding icons or logos.
- Showing last-updated information.
- Creating dashboard-style custom content.

In the ASP.NET Core Circular Gauge tag-helper structure used here, annotations should be placed **inside the target `e-circulargauge-axis`**.

Correct structure:

```html
<e-circulargauge-axis>
    <e-circulargauge-annotations>
        <e-circulargauge-annotation content="<div>Value</div>"
                                     angle="180"
                                     radius="35%">
        </e-circulargauge-annotation>
    </e-circulargauge-annotations>
</e-circulargauge-axis>
```

## Adding Text Annotations

### Basic Text Annotation

Use the `content`, `angle`, and `radius` properties to place text on the gauge.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Speed Monitor";

        public double PointerValue { get; set; } = 78;

        public string SpeedAnnotationContent { get; set; } =
            "<div style='font-size:20px;color:#333;'>78 km/h</div>";

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
    ViewData["Title"] = "Basic Text Annotation";
}

<h1>Basic Text Annotation</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="120"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>

            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.SpeedAnnotationContent"
                                             angle="180"
                                             radius="70%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Annotation properties:

- `content`: HTML string rendered as annotation content.
- `angle`: Direction from the gauge center.
- `radius`: Distance from the gauge center.

### Styled Text Annotation

Use inline HTML styles or CSS classes to style the annotation content.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Styled Annotation";

        public double PointerValue { get; set; } = 75;

        public string StyledAnnotationContent { get; set; } =
            "<div style='font-size:24px;font-weight:bold;color:#E74C3C;'>Speed</div>";

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
    ViewData["Title"] = "Styled Text Annotation";
}

<h1>Styled Text Annotation</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>

            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.StyledAnnotationContent"
                                             angle="90"
                                             radius="50%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Multiple Text Annotations

Add multiple `e-circulargauge-annotation` tags inside `e-circulargauge-annotations`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Dashboard";

        public double PointerValue { get; set; } = 78;

        public string UnitAnnotationContent { get; set; } =
            "<div style='font-size:16px;color:#666;'>km/h</div>";

        public string ValueAnnotationContent { get; set; } =
            "<div style='font-size:28px;color:#333;font-weight:bold;'>78</div>";

        public string StatusAnnotationContent { get; set; } =
            "<div style='font-size:14px;color:#27AE60;'>Optimal</div>";

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
    ViewData["Title"] = "Multiple Text Annotations";
}

<h1>Multiple Text Annotations</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="120">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>

            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.UnitAnnotationContent"
                                             angle="180"
                                             radius="35%">
                </e-circulargauge-annotation>

                <e-circulargauge-annotation content="@Model.ValueAnnotationContent"
                                             angle="180"
                                             radius="45%">
                </e-circulargauge-annotation>

                <e-circulargauge-annotation content="@Model.StatusAnnotationContent"
                                             angle="270"
                                             radius="55%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Positioning Annotations

### Understanding Position

Annotations are positioned by combining:

- `angle`: Direction from the gauge center.
- `radius`: Distance from the gauge center.

The `radius` can be a percentage or a pixel value.

Examples:

```html
<e-circulargauge-annotation angle="180"
                             radius="50%">
</e-circulargauge-annotation>
```

```html
<e-circulargauge-annotation angle="180"
                             radius="120">
</e-circulargauge-annotation>
```

### Angle Reference

Angle reference:

```text
        270° Top
           |
180° Left -+- 0° Right
           |
        90° Bottom
```

### Common Positions

```html
<!-- Center -->
<e-circulargauge-annotation angle="180"
                             radius="0">
</e-circulargauge-annotation>

<!-- Top center -->
<e-circulargauge-annotation angle="270"
                             radius="50%">
</e-circulargauge-annotation>

<!-- Bottom center -->
<e-circulargauge-annotation angle="90"
                             radius="50%">
</e-circulargauge-annotation>

<!-- Right side -->
<e-circulargauge-annotation angle="0"
                             radius="50%">
</e-circulargauge-annotation>

<!-- Left side -->
<e-circulargauge-annotation angle="180"
                             radius="50%">
</e-circulargauge-annotation>
```

### Fixed vs Percentage Positioning

Percentage-based positioning is better for responsive layouts.

```html
<e-circulargauge-annotation angle="90"
                             radius="70%">
</e-circulargauge-annotation>
```

Pixel-based positioning is better for fixed-size gauges.

```html
<e-circulargauge-annotation angle="90"
                             radius="150">
</e-circulargauge-annotation>
```

### Positioning Around Gauge

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Annotation Positions";

        public double PointerValue { get; set; } = 65;

        public string TopContent { get; set; } = "<div>Top</div>";

        public string RightContent { get; set; } = "<div>Right</div>";

        public string BottomContent { get; set; } = "<div>Bottom</div>";

        public string LeftContent { get; set; } = "<div>Left</div>";

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
    ViewData["Title"] = "Annotation Positions";
}

<h1>Annotation Positions</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>

            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.TopContent"
                                             angle="270"
                                             radius="120%">
                </e-circulargauge-annotation>

                <e-circulargauge-annotation content="@Model.RightContent"
                                             angle="0"
                                             radius="120%">
                </e-circulargauge-annotation>

                <e-circulargauge-annotation content="@Model.BottomContent"
                                             angle="90"
                                             radius="120%">
                </e-circulargauge-annotation>

                <e-circulargauge-annotation content="@Model.LeftContent"
                                             angle="180"
                                             radius="120%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Image Annotations

### Adding Images

Use an `img` element in the annotation content.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Image Annotation";

        public double PointerValue { get; set; } = 65;

        public string ImageAnnotationContent { get; set; } =
            "<img src='https://ej2.syncfusion.com/demos/src/circular-gauge/images/triangle.png' width='50' height='50' alt='Gauge icon' />";

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
    ViewData["Title"] = "Image Annotation";
}

<h1>Image Annotation</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>

            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.ImageAnnotationContent"
                                             angle="0"
                                             radius="70%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Image considerations:

- Use accessible URLs.
- Set explicit `width` and `height`.
- Add `alt` text.
- External images may be affected by network or CORS restrictions.

### Branded Annotations

Use an image annotation for logos or brand marks.

```csharp
public string LogoAnnotationContent { get; set; } =
    "<img src='https://example.com/logo.png' width='40' height='40' alt='Company Logo' />";
```

```html
<e-circulargauge-annotation content="@Model.LogoAnnotationContent"
                             angle="270"
                             radius="50%">
</e-circulargauge-annotation>
```

### Icon with Text

Combine image and text inside a single annotation.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Icon with Text";

        public double PointerValue { get; set; } = 75;

        public string IconTextContent { get; set; } =
            "<div style='text-align:center;'>" +
            "<img src='https://ej2.syncfusion.com/demos/src/circular-gauge/images/triangle.png' width='30' height='30' alt='Alert icon' />" +
            "<br />Alert" +
            "</div>";

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
    ViewData["Title"] = "Icon with Text";
}

<h1>Icon with Text</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>

            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.IconTextContent"
                                             angle="45"
                                             radius="80%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Sub-Gauges

### Creating a Sub-Gauge

Do not embed Syncfusion Razor tag helpers directly inside an annotation `content` string. Razor tag helpers inside a string will not be compiled as real components.

Avoid this pattern:

```html
<e-circulargauge-annotation content="<ejs-circulargauge id='subGauge'></ejs-circulargauge>">
</e-circulargauge-annotation>
```

Instead, use a normal HTML placeholder in the annotation content and initialize the sub-gauge with JavaScript after the parent gauge renders.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Parent Gauge";

        public double ParentPointerValue { get; set; } = 70;

        public string SubGaugePlaceholder { get; set; } =
            "<div id='subGaugeContainer' style='width:180px;height:180px;'></div>";

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
    ViewData["Title"] = "Sub-Gauge Annotation";
}

<h1>Sub-Gauge Annotation</h1>

<ejs-circulargauge id="parentGauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="500px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100"
                              radius="90%">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.ParentPointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>

            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.SubGaugePlaceholder"
                                             angle="180"
                                             radius="40%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>

<script>
    window.addEventListener('load', function () {
        if (typeof ej !== 'undefined' && ej.circulargauge) {
            var subGauge = new ej.circulargauge.CircularGauge({
                width: '180px',
                height: '180px',
                axes: [{
                    startAngle: 240,
                    endAngle: 120,
                    minimum: 0,
                    maximum: 100,
                    radius: '90%',
                    pointers: [{
                        type: 'Needle',
                        value: 50
                    }]
                }]
            });

            subGauge.appendTo('#subGaugeContainer');
        }
    });
</script>
```

### Sub-Gauge Use Cases

Sub-gauges are useful for:

- Showing summary and detail together.
- Comparing related metrics.
- Building nested dashboard widgets.
- Creating composite monitoring interfaces.

Use sub-gauges carefully because too many nested gauges can make the dashboard visually crowded.

## Multiple Annotations

### Dashboard with Multiple Annotations

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "System Monitor";

        public double PointerValue { get; set; } = 75;

        public string TitleAnnotationContent { get; set; } =
            "<div style='font-size:18px;font-weight:bold;'>CPU Usage</div>";

        public string CurrentValueContent { get; set; } =
            "<div style='font-size:32px;color:#E74C3C;font-weight:bold;'>75%</div>";

        public string UnitContent { get; set; } =
            "<div style='font-size:14px;color:#666;'>Percent</div>";

        public string StatusIconContent { get; set; } =
            "<div style='display:inline-block;width:18px;height:18px;background:#F39C12;border-radius:50%;'></div>";

        public string StatusTextContent { get; set; } =
            "<div style='color:#F39C12;'>Warning</div>";

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
    ViewData["Title"] = "Dashboard Annotations";
}

<h1>Dashboard with Multiple Annotations</h1>

<ejs-circulargauge id="dashboard"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="500px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100"
                              radius="90%">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue"
                                         color="#E74C3C">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>

            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.TitleAnnotationContent"
                                             angle="270"
                                             radius="130%">
                </e-circulargauge-annotation>

                <e-circulargauge-annotation content="@Model.CurrentValueContent"
                                             angle="180"
                                             radius="40%">
                </e-circulargauge-annotation>

                <e-circulargauge-annotation content="@Model.UnitContent"
                                             angle="180"
                                             radius="20%">
                </e-circulargauge-annotation>

                <e-circulargauge-annotation content="@Model.StatusIconContent"
                                             angle="90"
                                             radius="130%">
                </e-circulargauge-annotation>

                <e-circulargauge-annotation content="@Model.StatusTextContent"
                                             angle="90"
                                             radius="110%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Annotation Layout Strategies

#### Central Display

Use the center region for:

- Current value.
- Unit text.
- Main status.

#### Peripheral Labels

Use the outer gauge area for:

- Status messages.
- Warnings.
- Extra information.
- Icons.

#### Ring Layout

Use the same `radius` with different `angle` values to place annotations around the gauge.

Example:

```html
<e-circulargauge-annotation angle="0" radius="110%" content="<div>Right</div>"></e-circulargauge-annotation>
<e-circulargauge-annotation angle="90" radius="110%" content="<div>Bottom</div>"></e-circulargauge-annotation>
<e-circulargauge-annotation angle="180" radius="110%" content="<div>Left</div>"></e-circulargauge-annotation>
<e-circulargauge-annotation angle="270" radius="110%" content="<div>Top</div>"></e-circulargauge-annotation>
```

### Complete Example: Diagnostic Dashboard

This example combines:

- Ranges.
- Needle pointer.
- Pointer animation.
- Multiple annotations.
- Value display.
- Status indicator.
- Last-updated text.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Engine Monitor";

        public double PointerValue { get; set; } = 180;

        public string RpmAnnotationContent { get; set; } =
            "<div style='text-align:center;'>" +
            "<div style='font-size:36px;font-weight:bold;color:#2C3E50;'>1800</div>" +
            "<div style='font-size:12px;color:#7F8C8D;'>RPM</div>" +
            "</div>";

        public string StatusAnnotationContent { get; set; } =
            "<div style='text-align:center;'>" +
            "<div style='display:inline-block;width:16px;height:16px;background:#F39C12;border-radius:50%;'></div>" +
            "<div style='font-size:12px;color:#F39C12;margin-top:4px;'>Caution</div>" +
            "</div>";

        public string LastUpdatedContent { get; set; } =
            "<div style='font-size:10px;color:#95A5A6;'>Last updated: 2 seconds ago</div>";

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
    ViewData["Title"] = "Diagnostic Dashboard";
}

<h1>Diagnostic Dashboard</h1>

<ejs-circulargauge id="diagnosticGauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="500px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="300"
                              radius="90%">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0"
                                       end="100"
                                       color="#2ECC71">
                </e-circulargauge-range>
                <e-circulargauge-range start="100"
                                       end="200"
                                       color="#F39C12">
                </e-circulargauge-range>
                <e-circulargauge-range start="200"
                                       end="300"
                                       color="#E74C3C">
                </e-circulargauge-range>
            </e-circulargauge-ranges>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue"
                                         color="#2C3E50">
                    <e-pointer-animation enable="true"
                                         duration="1500">
                    </e-pointer-animation>
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>

            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.RpmAnnotationContent"
                                             angle="180"
                                             radius="35%">
                </e-circulargauge-annotation>

                <e-circulargauge-annotation content="@Model.StatusAnnotationContent"
                                             angle="90"
                                             radius="130%">
                </e-circulargauge-annotation>

                <e-circulargauge-annotation content="@Model.LastUpdatedContent"
                                             angle="270"
                                             radius="15%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Styling Annotations

### CSS in Content

Avoid placing a `<style>` tag inside the annotation `content` string. It can be harder to maintain and may cause inconsistent rendering.

Instead, define CSS in the page and use a CSS class in the annotation content.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Styled Annotation";

        public double PointerValue { get; set; } = 65;

        public string StyledContent { get; set; } =
            "<div class='custom-annotation'>Styled Annotation</div>";

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
    ViewData["Title"] = "Styled Annotation";
}

<h1>Styled Annotation</h1>

<style>
    .custom-annotation {
        background: #f5f5f5;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        color: #333333;
        font-weight: 600;
    }
</style>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>

            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.StyledContent"
                                             angle="180"
                                             radius="50%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Responsive Annotations

Use relative units such as `clamp`, `vw`, or percentage-based layouts for responsive annotation text.

```csharp
public string ResponsiveAnnotationContent { get; set; } =
    "<div style='font-size:clamp(14px,2vw,24px);font-weight:bold;'>Responsive Text</div>";
```

```html
<e-circulargauge-annotation content="@Model.ResponsiveAnnotationContent"
                             angle="180"
                             radius="50%">
</e-circulargauge-annotation>
```

## Troubleshooting

If an annotation is not visible:

1. Confirm that annotations are inside `e-circulargauge-axis`.

```html
<e-circulargauge-axis>
    <e-circulargauge-annotations>
        <e-circulargauge-annotation content="<div>Visible</div>"
                                     angle="180"
                                     radius="50%">
        </e-circulargauge-annotation>
    </e-circulargauge-annotations>
</e-circulargauge-axis>
```

2. Confirm that `content` is not empty.

```csharp
public string AnnotationContent { get; set; } = "<div>Value</div>";
```

3. Confirm that the annotation radius is inside or near the visible gauge area.

```html
<e-circulargauge-annotation radius="50%">
</e-circulargauge-annotation>
```

4. Check browser developer tools to verify that the annotation HTML is rendered.

If annotations are overlapping:

1. Use different `angle` values.
2. Use different `radius` values.
3. Reduce font size or content size.
4. Increase gauge width or height.

If image annotations are not loading:

1. Verify the image URL is accessible in the browser.
2. Use an absolute URL if needed.
3. Set explicit image width and height.
4. Check CORS restrictions for external images.
5. Add `alt` text.

If annotation HTML is displayed as plain text:

1. Ensure the content string contains normal HTML, not encoded HTML.

Incorrect:

```csharp
public string AnnotationContent { get; set; } = "&lt;div&gt;Speed&lt;/div&gt;";
```

Correct:

```csharp
public string AnnotationContent { get; set; } = "<div>Speed</div>";
```

If pointer animation inside an annotation-related example is not working:

Use `e-pointer-animation`.

```html
<e-pointer-animation enable="true"
                     duration="1500">
</e-pointer-animation>
```

Do not use:

```html
<e-circulargauge-pointer-animation>
</e-circulargauge-pointer-animation>
```

If a sub-gauge does not render:

1. Do not place Syncfusion tag helpers as raw strings inside annotation content.
2. Use a placeholder `div`.
3. Initialize the nested gauge using JavaScript after the parent gauge is loaded.
4. Make sure the placeholder has a width and height.

