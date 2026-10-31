# Gauge Appearance and Styling

## Table of Contents

- [Gauge Title](#gauge-title)
  - [Adding a Title](#adding-a-title)
  - [Customizing Title Style](#customizing-title-style)
  - [Title Positioning](#title-positioning)
- [Positioning the Gauge](#positioning-the-gauge)
  - [Understanding Center X and Y](#understanding-center-x-and-y)
  - [Pixel-Based Positioning](#pixel-based-positioning)
  - [Percentage-Based Positioning](#percentage-based-positioning)
  - [Responsive Positioning](#responsive-positioning)
  - [Fixed Positioning](#fixed-positioning)
- [Background and Borders](#background-and-borders)
  - [Adding Background Color](#adding-background-color)
  - [Adding Borders](#adding-borders)
  - [Combined Styling](#combined-styling)
  - [Shadow Effects](#shadow-effects)
- [Gauge Margins](#gauge-margins)
  - [Setting Margins](#setting-margins)
  - [Margin Properties](#margin-properties)
  - [Use Cases for Margins](#use-cases-for-margins)
- [Responsive Sizing](#responsive-sizing)
  - [Setting Width and Height](#setting-width-and-height)
  - [Container for Responsive Gauges](#container-for-responsive-gauges)
  - [Bootstrap Responsive Sizing](#bootstrap-responsive-sizing)
- [Semi and Quarter Gauges](#semi-and-quarter-gauges)
  - [Semi-Circular Gauge](#semi-circular-gauge)
  - [Positioning Semi-Gauge](#positioning-semi-gauge)
  - [Quarter-Circular Gauge](#quarter-circular-gauge)
  - [Radius Based on Angle](#radius-based-on-angle)
- [Complete Example: Styled Dashboard Gauge](#complete-example-styled-dashboard-gauge)
- [Troubleshooting](#troubleshooting)

## Gauge Title

### Adding a Title

Use the `title` property on the root `ejs-circulargauge` tag.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Speed Monitor";

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
    ViewData["Title"] = "Gauge Title";
}

<h1>Gauge Title</h1>

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
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Customizing Title Style

Use `e-circulargauge-titlestyle` to customize the built-in gauge title.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Speed Monitor";

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
    ViewData["Title"] = "Customized Gauge Title";
}

<h1>Customized Gauge Title</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-titlestyle fontFamily="Arial"
                                size="20px"
                                color="#333333"
                                fontWeight="600">
    </e-circulargauge-titlestyle>

    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Title style properties:

- `fontFamily`: Title font family.
- `size`: Title font size.
- `color`: Title text color.
- `fontWeight`: Title font weight.
- `fontStyle`: Title font style.

### Title Positioning

The built-in Circular Gauge title is rendered as part of the gauge layout. If you need full control over title positioning, use a normal HTML heading outside the gauge and omit the built-in `title`.

```html
<h2 style="text-align:left;">Speed Monitor</h2>

<ejs-circulargauge id="gauge"
                    width="100%"
                    height="450px">
</ejs-circulargauge>
```

Use this approach when you need:

- Left-aligned page title.
- Right-aligned page title.
- Custom spacing above or below the title.
- More complex title layouts with icons or badges.

## Positioning the Gauge

### Understanding Center X and Y

Use `centerX` and `centerY` to control where the Circular Gauge center is placed inside its container.

- `centerX`: Horizontal center position.
- `centerY`: Vertical center position.

Common values:

- `50%`: Center.
- `0%`: Left or top edge.
- `100%`: Right or bottom edge.
- Pixel values such as `200`: Fixed position.

### Pixel-Based Positioning

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Pixel Positioned Gauge";

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
    ViewData["Title"] = "Pixel Positioning";
}

<h1>Pixel-Based Positioning</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="500px"
                    height="500px"
                    centerX="250"
                    centerY="250">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Percentage-Based Positioning

Use percentage values for responsive positioning.

```html
<ejs-circulargauge id="gauge"
                    centerX="50%"
                    centerY="50%"
                    width="100%"
                    height="450px">
</ejs-circulargauge>
```

Other examples:

```html
<ejs-circulargauge id="topLeftGauge"
                    centerX="0%"
                    centerY="0%">
</ejs-circulargauge>

<ejs-circulargauge id="topRightGauge"
                    centerX="100%"
                    centerY="0%">
</ejs-circulargauge>

<ejs-circulargauge id="offCenterGauge"
                    centerX="30%"
                    centerY="70%">
</ejs-circulargauge>
```

### Responsive Positioning

Percentage-based positioning is recommended for responsive layouts.

```html
<div style="width:100%; max-width:600px; height:450px; margin:0 auto;">
    <ejs-circulargauge id="gauge"
                        width="100%"
                        height="100%"
                        centerX="50%"
                        centerY="50%">
    </ejs-circulargauge>
</div>
```

### Fixed Positioning

Pixel-based positioning is useful when the container size is fixed.

```html
<ejs-circulargauge id="gauge"
                    width="500px"
                    height="500px"
                    centerX="250"
                    centerY="250">
</ejs-circulargauge>
```

## Background and Borders

### Adding Background Color

Use the `background` property on the root gauge.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Gauge Background";

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
    ViewData["Title"] = "Gauge Background";
}

<h1>Gauge Background</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    background="#F5F5F5"
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
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Adding Borders

Use `e-circulargauge-border` inside `ejs-circulargauge`.

```html
<ejs-circulargauge id="gauge"
                    background="#F5F5F5"
                    width="100%"
                    height="450px">
    <e-circulargauge-border color="#CCCCCC"
                             width="2">
    </e-circulargauge-border>
</ejs-circulargauge>
```

Border properties:

- `width`: Border thickness.
- `color`: Border color.

### Combined Styling

```html
<ejs-circulargauge id="gauge"
                    background="white"
                    width="100%"
                    height="450px">
    <e-circulargauge-border color="#333333"
                             width="3">
    </e-circulargauge-border>
</ejs-circulargauge>
```

### Shadow Effects

Use a wrapper container for box shadows, rounded corners, and spacing.

```html
<div style="box-shadow:0 4px 8px rgba(0,0,0,0.2); border-radius:10px; padding:10px;">
    <ejs-circulargauge id="gauge"
                        background="white"
                        width="100%"
                        height="450px">
    </ejs-circulargauge>
</div>
```

## Gauge Margins

### Setting Margins

Use `e-circulargauge-margin` inside the root gauge.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Gauge Margins";

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
    ViewData["Title"] = "Gauge Margins";
}

<h1>Gauge Margins</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-margin left="20"
                             right="20"
                             top="20"
                             bottom="20">
    </e-circulargauge-margin>

    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Margin Properties

- `left`: Left margin in pixels.
- `right`: Right margin in pixels.
- `top`: Top margin in pixels.
- `bottom`: Bottom margin in pixels.

### Use Cases for Margins

#### Tight spacing

```html
<e-circulargauge-margin left="5"
                         right="5"
                         top="5"
                         bottom="5">
</e-circulargauge-margin>
```

#### Generous spacing

```html
<e-circulargauge-margin left="40"
                         right="40"
                         top="40"
                         bottom="40">
</e-circulargauge-margin>
```

#### Asymmetric spacing for annotations

```html
<e-circulargauge-margin left="10"
                         right="50"
                         top="10"
                         bottom="10">
</e-circulargauge-margin>
```

## Responsive Sizing

### Setting Width and Height

Pixel-based sizing:

```html
<ejs-circulargauge id="gauge"
                    width="400px"
                    height="400px">
</ejs-circulargauge>
```

Percentage-based sizing:

```html
<ejs-circulargauge id="gauge"
                    width="100%"
                    height="100%">
</ejs-circulargauge>
```

Important: if `height="100%"` is used, the parent container must have a real height or an aspect ratio.

### Container for Responsive Gauges

```html
<div style="width:100%; max-width:600px; aspect-ratio:1 / 1; margin:0 auto;">
    <ejs-circulargauge id="gauge"
                        width="100%"
                        height="100%">
    </ejs-circulargauge>
</div>
```

This keeps the gauge square and responsive.

### Bootstrap Responsive Sizing

Use Bootstrap only if it is already included in your app.

```html
<div class="row">
    <div class="col-md-6">
        <div style="aspect-ratio:1 / 1;">
            <ejs-circulargauge id="gauge1"
                                width="100%"
                                height="100%">
            </ejs-circulargauge>
        </div>
    </div>

    <div class="col-md-6">
        <div style="aspect-ratio:1 / 1;">
            <ejs-circulargauge id="gauge2"
                                width="100%"
                                height="100%">
            </ejs-circulargauge>
        </div>
    </div>
</div>
```

## Semi and Quarter Gauges

### Semi-Circular Gauge

Use `startAngle="180"` and `endAngle="0"` for a semi-circular gauge.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Temperature";

        public double PointerValue { get; set; } = 60;

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
    ViewData["Title"] = "Semi-Circular Gauge";
}

<h1>Semi-Circular Gauge</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="180"
                              endAngle="0"
                              minimum="0"
                              maximum="100"
                              radius="90%">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Positioning Semi-Gauge

For semi-circular gauges:

- Keep `centerX="50%"` for horizontal centering.
- Adjust `centerY` when the gauge has too much empty space.
- Use margins to prevent title, labels, or annotations from being clipped.

```html
<ejs-circulargauge id="gauge"
                    centerX="50%"
                    centerY="65%"
                    width="100%"
                    height="350px">
</ejs-circulargauge>
```

### Quarter-Circular Gauge

Use a 90-degree angle sweep.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Progress";

        public double PointerValue { get; set; } = 75;

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
    ViewData["Title"] = "Quarter-Circular Gauge";
}

<h1>Quarter-Circular Gauge</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    centerX="50%"
                    centerY="50%">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="0"
                              endAngle="90"
                              minimum="0"
                              maximum="100"
                              radius="90%">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Radius Based on Angle

For partial gauges, adjust `radius`, `centerX`, and `centerY` together so the visible arc fits well inside the container.

```html
<ejs-circulargauge id="gauge"
                    title="Semi-Gauge"
                    width="100%"
                    height="350px"
                    centerX="50%"
                    centerY="70%">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="180"
                              endAngle="0"
                              minimum="0"
                              maximum="100"
                              radius="100%">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="50">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Complete Example: Styled Dashboard Gauge

This example combines:

- Gauge title.
- Title styling.
- Background.
- Border.
- Margin.
- Center positioning.
- Ranges.
- Axis ticks.
- Axis labels.
- Pointer animation.
- Annotation.
- Responsive wrapper.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "System Performance";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 65;

        public string LabelFormat { get; set; } = "{value}%";

        public string AnnotationContent { get; set; } =
            "<div style='text-align:center;'>" +
            "<div style='font-size:28px;font-weight:bold;'>65</div>" +
            "<div style='font-size:12px;color:#666;'>Operational</div>" +
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
    ViewData["Title"] = "Styled Dashboard Gauge";
}

<h1>Styled Dashboard Gauge</h1>

<div style="width:100%; max-width:500px; margin:0 auto; padding:20px; box-shadow:0 4px 8px rgba(0,0,0,0.15); border-radius:10px;">
    <ejs-circulargauge id="dashboardGauge"
                        title="@Model.GaugeTitle"
                        width="100%"
                        height="500px"
                        background="white"
                        centerX="50%"
                        centerY="50%">
        <e-circulargauge-border color="#E0E0E0"
                                 width="1">
        </e-circulargauge-border>

        <e-circulargauge-titlestyle fontFamily="Segoe UI"
                                    size="18px"
                                    color="#333333"
                                    fontWeight="600">
        </e-circulargauge-titlestyle>

        <e-circulargauge-margin left="20"
                                 right="20"
                                 top="20"
                                 bottom="20">
        </e-circulargauge-margin>

        <e-circulargauge-axes>
            <e-circulargauge-axis startAngle="240"
                                  endAngle="120"
                                  minimum="@Model.MinimumValue"
                                  maximum="@Model.MaximumValue"
                                  radius="90%">
                <e-circulargauge-ranges>
                    <e-circulargauge-range start="0"
                                           end="30"
                                           color="#2ECC71">
                    </e-circulargauge-range>
                    <e-circulargauge-range start="30"
                                           end="70"
                                           color="#F39C12">
                    </e-circulargauge-range>
                    <e-circulargauge-range start="70"
                                           end="100"
                                           color="#E74C3C">
                    </e-circulargauge-range>
                </e-circulargauge-ranges>

                <e-axis-majorticks interval="10"
                                   height="8">
                </e-axis-majorticks>

                <e-axis-labelstyle format="@Model.LabelFormat">
                </e-axis-labelstyle>

                <e-circulargauge-pointers>
                    <e-circulargauge-pointer type="Needle"
                                             value="@Model.PointerValue"
                                             color="#333333">
                        <e-pointer-animation enable="true"
                                             duration="1500">
                        </e-pointer-animation>
                    </e-circulargauge-pointer>
                </e-circulargauge-pointers>

                <e-circulargauge-annotations>
                    <e-circulargauge-annotation content="@Model.AnnotationContent"
                                                 angle="180"
                                                 radius="35%">
                    </e-circulargauge-annotation>
                </e-circulargauge-annotations>
            </e-circulargauge-axis>
        </e-circulargauge-axes>
    </ejs-circulargauge>
</div>
```

## Troubleshooting

If the gauge is too small or too large:

1. Adjust `width` and `height`.

```html
<ejs-circulargauge width="100%"
                    height="450px">
</ejs-circulargauge>
```

2. Check the parent container size.

3. Use percentage sizing for responsive layouts.

```html
<div style="width:100%; max-width:600px; aspect-ratio:1 / 1;">
    <ejs-circulargauge width="100%"
                        height="100%">
    </ejs-circulargauge>
</div>
```

If the title is not visible:

1. Confirm that the root gauge has a `title`.

```html
<ejs-circulargauge title="Speed Monitor">
</ejs-circulargauge>
```

2. Confirm that title color contrasts with the background.

```html
<e-circulargauge-titlestyle color="#333333"
                            size="18px">
</e-circulargauge-titlestyle>
```

3. Use `size`, not `fontSize`.

If the gauge is cut off:

1. Increase the container height.
2. Reduce axis `radius`.
3. Adjust `centerX` and `centerY`.
4. Increase margins if labels or annotations are clipped.

```html
<e-circulargauge-axis radius="85%">
</e-circulargauge-axis>
```

If ticks or labels are not rendering:

1. Use `e-axis-majorticks`.

```html
<e-axis-majorticks interval="10"
                   height="8">
</e-axis-majorticks>
```

2. Use `e-axis-labelstyle`.

```html
<e-axis-labelstyle format="{value}%">
</e-axis-labelstyle>
```

If pointer animation is not working:

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

If annotation is not appearing as expected:

Place `e-circulargauge-annotations` inside the target `e-circulargauge-axis`.

```html
<e-circulargauge-axis>
    <e-circulargauge-annotations>
        <e-circulargauge-annotation content="<div>Status</div>"
                                     angle="180"
                                     radius="35%">
        </e-circulargauge-annotation>
    </e-circulargauge-annotations>
</e-circulargauge-axis>
```
