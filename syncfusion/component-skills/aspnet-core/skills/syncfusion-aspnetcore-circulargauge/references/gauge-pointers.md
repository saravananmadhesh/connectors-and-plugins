# Working with Circular Gauge Pointers

## Table of Contents

- [Overview](#overview)
- [Pointer Types](#pointer-types)
  - [Basic Pointer Configuration](#basic-pointer-configuration)
- [Needle Pointers](#needle-pointers)
  - [Needle Anatomy](#needle-anatomy)
  - [Basic Needle Configuration](#basic-needle-configuration)
  - [Needle Customization](#needle-customization)
  - [Needle Length Examples](#needle-length-examples)
- [Range Bar Pointers](#range-bar-pointers)
  - [Range Bar Basics](#range-bar-basics)
  - [Range Bar Customization](#range-bar-customization)
  - [Rounded Corner Range Bar](#rounded-corner-range-bar)
- [Pointer Pointers](#marker-pointers)- [Pointer Types](#pointer-types)
  - [Marker Shapes](#marker-shapes)
  - [Marker Customization](#marker-customization)
  - [Custom Image Marker](#custom-image-marker)
- [Pointer Dragging](#pointer-dragging)
  - [Enable Global Drag](#enable-global-drag)
  - [Enable Drag Per Pointer](#enable-drag-per-pointer)
  - [Drag Interaction Workflow](#drag-interaction-workflow)
- [Multiple Pointers](#multiple-pointers)
- [Animation](#animation)
  - [Enable Pointer Animation](#enable-pointer-animation)
  - [Animation Timing](#animation-timing)
- [Gradient Colors](#gradient-colors)
  - [Linear Gradient](#linear-gradient)
  - [Radial Gradient](#radial-gradient)
- [Complete Example: Multi-Pointer Dashboard](#complete-example-multi-pointer-dashboard)
- [Troubleshooting](#troubleshooting)

## Overview

Pointers indicate values on a Circular Gauge axis. The pointer position is calculated from the pointer `value` and the axis `minimum` and `maximum`.

The Circular Gauge supports the following pointer types:

- `Needle`: Traditional speedometer-style pointer.
- `RangeBar`: Filled arc from axis minimum to the pointer value.
- `Marker`: Shape or image marker placed at the pointer value.

Pointers can be customized with color, radius, width, marker shape, cap, tail, border, animation, gradient, and drag behavior.

## Pointer Types

### Basic Pointer Configuration

Use `e-circulargauge-pointers` inside `e-circulargauge-axis`, then add one or more `e-circulargauge-pointer` tags.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Basic Pointer";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

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
    ViewData["Title"] = "Basic Pointer";
}

<h1>Basic Circular Gauge Pointer</h1>

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
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Pointer properties used:

- `type` defines the pointer type.
- `value` defines the value shown on the axis.
- `radius` defines the pointer distance from the gauge center.
- `color` defines the pointer color.

## Needle Pointers

### Needle Anatomy

A needle pointer can include:

- Needle body: Main pointing element.
- Cap: Circular center element.
- Needle tail: Optional extension behind the cap.
- Animation: Optional pointer movement animation.
- Border: Optional border around the pointer.

### Basic Needle Configuration

Use `type="Needle"` for a traditional gauge needle.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Needle Pointer";

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
    ViewData["Title"] = "Needle Pointer";
}

<h1>Needle Pointer</h1>

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
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                    <e-pointer-cap radius="8">
                    </e-pointer-cap>
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Correct cap tag:

```html
<e-pointer-cap>
</e-pointer-cap>
```

### Needle Customization

Use pointer width, radius, cap, cap border, and needle tail to customize the needle.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Customized Needle Pointer";

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
    ViewData["Title"] = "Customized Needle Pointer";
}

<h1>Customized Needle Pointer</h1>

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
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue"
                                         radius="80%"
                                         color="#FF5733"
                                         pointerWidth="4"
                                         needleStartWidth="4"
                                         needleEndWidth="4">
                    <e-pointer-cap radius="10"
                                   color="#FF5733">
                        <e-pointers-cap-border width="2"
                                      color="#333333">
                        </e-pointers-cap-border>
                    </e-pointer-cap>

                    <e-pointer-needletail length="25%"
                                          color="#FF5733">
                    </e-pointer-needletail>
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Correct child tags used:

- `e-pointer-cap`
- `e-pointers-cap-border`
- `e-pointer-needletail`

### Needle Length Examples

Use percentage radius for responsive layout and pixel radius for fixed layout.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Needle Length Examples";

        public double PercentageNeedleValue { get; set; } = 70;

        public double FixedNeedleValue { get; set; } = 45;

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
    ViewData["Title"] = "Needle Length Examples";
}

<h1>Needle Length Examples</h1>

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
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PercentageNeedleValue"
                                         radius="85%"
                                         color="#2ECC71">
                </e-circulargauge-pointer>

                <e-circulargauge-pointer type="Needle"
                                         value="@Model.FixedNeedleValue"
                                         radius="150"
                                         color="#3498DB">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Range Bar Pointers

### Range Bar Basics

A range bar pointer fills the circular axis from the axis minimum value to the pointer value. It is useful for progress, usage, capacity, or completion indicators.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Range Bar Pointer";

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
    ViewData["Title"] = "Range Bar Pointer";
}

<h1>Range Bar Pointer</h1>

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
                <e-circulargauge-pointer type="RangeBar"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Range Bar Customization

Use `pointerWidth`, `radius`, `color`, and `e-pointer-border` to customize the range bar.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Customized Range Bar";

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
    ViewData["Title"] = "Customized Range Bar";
}

<h1>Customized Range Bar Pointer</h1>

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
                <e-circulargauge-pointer type="RangeBar"
                                         value="@Model.PointerValue"
                                         color="#00A699"
                                         pointerWidth="15"
                                         radius="85%">
                    <e-pointer-border width="2"
                                      color="#333333">
                    </e-pointer-border>
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Correct pointer border tag:

```html
<e-pointer-border>
</e-pointer-border>
```

### Rounded Corner Range Bar

Use `roundedCornerRadius` with `type="RangeBar"` to create a smooth arc-style range bar.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Rounded Range Bar";

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
    ViewData["Title"] = "Rounded Range Bar";
}

<h1>Rounded Corner Range Bar</h1>

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
                <e-circulargauge-pointer type="RangeBar"
                                         value="@Model.PointerValue"
                                         radius="90%"
                                         pointerWidth="15"
                                         color="#4285F4"
                                         roundedCornerRadius="5">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Marker Pointers

### Marker Shapes

Marker pointers display a shape at the pointer value. Use `type="Marker"` and configure `markerShape`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Marker Pointer";

        public double PointerValue { get; set; } = 50;

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
    ViewData["Title"] = "Marker Pointer";
}

<h1>Marker Pointer</h1>

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
                <e-circulargauge-pointer type="Marker"
                                         value="@Model.PointerValue"
                                         markerShape="Circle"
                                         markerWidth="15"
                                         markerHeight="15"
                                         color="#FF6B6B">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Common marker shapes:

- `Circle`
- `Rectangle`
- `Triangle`
- `InvertedTriangle`
- `Diamond`
- `Image`

### Marker Customization

Use marker size, color, radius, and border for custom marker appearance.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Customized Marker Pointer";

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
    ViewData["Title"] = "Customized Marker Pointer";
}

<h1>Customized Marker Pointer</h1>

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
                <e-circulargauge-pointer type="Marker"
                                         value="@Model.PointerValue"
                                         markerShape="Diamond"
                                         markerWidth="20"
                                         markerHeight="20"
                                         color="#4285F4"
                                         radius="95%">
                    <e-pointer-border width="2"
                                      color="#333333">
                    </e-pointer-border>
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Custom Image Marker

Use `markerShape="Image"` and set `imageUrl`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Image Marker Pointer";

        public double PointerValue { get; set; } = 70;

        public string MarkerImageUrl { get; set; } = "Image url";

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
    ViewData["Title"] = "Image Marker Pointer";
}

<h1>Image Marker Pointer</h1>

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
                <e-circulargauge-pointer type="Marker"
                                         value="@Model.PointerValue"
                                         markerShape="Image"
                                         imageUrl="@Model.MarkerImageUrl"
                                         markerWidth="30"
                                         markerHeight="30"
                                         radius="90%">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Pointer Dragging

### Enable Global Drag

Set `enablePointerDrag="true"` on the root `ejs-circulargauge` tag to allow pointer dragging.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Draggable Pointer";

        public double PointerValue { get; set; } = 50;

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
    ViewData["Title"] = "Draggable Pointer";
}

<h1>Draggable Pointer</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    enablePointerDrag="true">
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

### Enable Drag Per Pointer

Use pointer-level `enableDrag` when only specific pointers should be draggable.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Selective Pointer Dragging";

        public double EditablePointerValue { get; set; } = 50;

        public double FixedPointerValue { get; set; } = 75;

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
    ViewData["Title"] = "Selective Pointer Dragging";
}

<h1>Selective Pointer Dragging</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    enablePointerDrag="true">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.EditablePointerValue"
                                         enableDrag="true">
                </e-circulargauge-pointer>

                <e-circulargauge-pointer type="Marker"
                                         value="@Model.FixedPointerValue"
                                         enableDrag="false"
                                         markerShape="Circle"
                                         markerWidth="14"
                                         markerHeight="14"
                                         color="#2ECC71">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Drag Interaction Workflow

When pointer dragging is enabled:

1. The user clicks or taps the pointer.
2. The pointer enters drag mode.
3. The pointer follows the circular axis.
4. The pointer value is constrained by the axis `minimum` and `maximum`.
5. The user releases the pointer to finalize the value.

Use cases:

- Volume controls.
- Brightness controls.
- Threshold configuration.
- Interactive training or demo gauges.
- Numeric value input through a visual scale.

## Multiple Pointers

Use multiple `e-circulargauge-pointer` tags inside the same `e-circulargauge-pointers` collection.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Multiple Pointers";

        public double CurrentValue { get; set; } = 60;

        public double ReferenceValue { get; set; } = 40;

        public double GoalValue { get; set; } = 85;

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
    ViewData["Title"] = "Multiple Pointers";
}

<h1>Multiple Pointers</h1>

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
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.CurrentValue"
                                         color="#FF5733">
                </e-circulargauge-pointer>

                <e-circulargauge-pointer type="Needle"
                                         value="@Model.ReferenceValue"
                                         color="#3498DB"
                                         radius="70%">
                </e-circulargauge-pointer>

                <e-circulargauge-pointer type="Marker"
                                         value="@Model.GoalValue"
                                         markerShape="Circle"
                                         markerWidth="14"
                                         markerHeight="14"
                                         color="#2ECC71"
                                         radius="90%">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Guidelines:

- Use different colors for different pointers.
- Use different pointer types when possible.
- Use different radii if pointers overlap.
- Limit pointer count for readability.

## Animation

### Enable Pointer Animation

Use `e-pointer-animation` inside `e-circulargauge-pointer`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Animated Pointer";

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
    ViewData["Title"] = "Animated Pointer";
}

<h1>Animated Pointer</h1>

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
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                    <e-pointer-animation enable="true"
                                         duration="1500">
                    </e-pointer-animation>
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Correct animation tag:

```html
<e-pointer-animation>
</e-pointer-animation>
```

### Animation Timing

Use shorter durations for quick dashboards and longer durations for presentation-style visuals.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Animation Timing";

        public double FastPointerValue { get; set; } = 45;

        public double SlowPointerValue { get; set; } = 80;

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
    ViewData["Title"] = "Animation Timing";
}

<h1>Animation Timing</h1>

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
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.FastPointerValue"
                                         color="#2ECC71">
                    <e-pointer-animation enable="true"
                                         duration="500">
                    </e-pointer-animation>
                </e-circulargauge-pointer>

                <e-circulargauge-pointer type="Needle"
                                         value="@Model.SlowPointerValue"
                                         color="#E74C3C"
                                         radius="70%">
                    <e-pointer-animation enable="true"
                                         duration="3000">
                    </e-pointer-animation>
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Gradient Colors

### Linear Gradient

Do not use nested pointer gradient tags inside `e-circulargauge-pointer`. Configure a `CircularGaugeLinearGradient` object in `Index.cshtml.cs` and bind it using `linearGradient`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.CircularGauge;
using System.Collections.Generic;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Pointer Linear Gradient";

        public double PointerValue { get; set; } = 70;

        public CircularGaugeLinearGradient PointerLinearGradient { get; set; } = new CircularGaugeLinearGradient
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
    ViewData["Title"] = "Pointer Linear Gradient";
}

<h1>Pointer Linear Gradient</h1>

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
                <e-circulargauge-pointer type="RangeBar"
                                         value="@Model.PointerValue"
                                         pointerWidth="15"
                                         radius="85%"
                                         linearGradient="@Model.PointerLinearGradient">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Radial Gradient

Configure radial gradient in `Index.cshtml.cs` using `CircularGaugeRadialGradient`, then bind it using `radialGradient`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.CircularGauge;
using System.Collections.Generic;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Pointer Radial Gradient";

        public double PointerValue { get; set; } = 75;

        public CircularGaugeRadialGradient PointerRadialGradient { get; set; } = new CircularGaugeRadialGradient
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
    ViewData["Title"] = "Pointer Radial Gradient";
}

<h1>Pointer Radial Gradient</h1>

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
                <e-circulargauge-pointer type="RangeBar"
                                         value="@Model.PointerValue"
                                         pointerWidth="15"
                                         radius="85%"
                                         radialGradient="@Model.PointerRadialGradient">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Complete Example: Multi-Pointer Dashboard

This example combines:

- Needle pointer.
- Marker pointer.
- RangeBar pointer.
- Pointer dragging.
- Pointer animation.
- Multiple pointer values from `Index.cshtml.cs`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Performance Metrics";

        public double CurrentValue { get; set; } = 75;

        public double TargetValue { get; set; } = 85;

        public double ProgressValue { get; set; } = 75;

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
    ViewData["Title"] = "Multi-Pointer Dashboard";
}

<h1>Multi-Pointer Dashboard</h1>

<ejs-circulargauge id="dashboard"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    enablePointerDrag="true">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100"
                              radius="90%">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.CurrentValue"
                                         color="#FF5733"
                                         enableDrag="true">
                    <e-pointer-animation enable="true"
                                         duration="1500">
                    </e-pointer-animation>
                </e-circulargauge-pointer>

                <e-circulargauge-pointer type="Marker"
                                         value="@Model.TargetValue"
                                         markerShape="Circle"
                                         color="#2ECC71"
                                         markerWidth="10"
                                         markerHeight="10"
                                         radius="90%"
                                         enableDrag="false">
                </e-circulargauge-pointer>

                <e-circulargauge-pointer type="RangeBar"
                                         value="@Model.ProgressValue"
                                         color="#3498DB"
                                         pointerWidth="10"
                                         radius="75%"
                                         enableDrag="false">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Troubleshooting

If the pointer is not visible:

1. Confirm that pointer `value` is inside the axis `minimum` and `maximum`.

```html
<e-circulargauge-axis minimum="0" maximum="100">
    <e-circulargauge-pointers>
        <e-circulargauge-pointer value="70">
        </e-circulargauge-pointer>
    </e-circulargauge-pointers>
</e-circulargauge-axis>
```

2. Confirm that the pointer color contrasts with the background.

```html
<e-circulargauge-pointer value="70"
                         color="#FF5733">
</e-circulargauge-pointer>
```

3. Increase `pointerWidth`, `markerWidth`, or `markerHeight` if the pointer is too small.

If dragging is not working:

1. Enable dragging on the root gauge.

```html
<ejs-circulargauge enablePointerDrag="true">
</ejs-circulargauge>
```

2. Enable dragging on the specific pointer if selective dragging is used.

```html
<e-circulargauge-pointer enableDrag="true">
</e-circulargauge-pointer>
```

3. Confirm that the pointer value is inside the axis range.

If animation is not playing:

1. Use `e-pointer-animation`.

```html
<e-pointer-animation enable="true"
                     duration="1500">
</e-pointer-animation>
```

2. Do not use `e-circulargauge-pointer-animation`.

3. Confirm that `duration` is greater than `0`.

If pointer cap is not rendering:

1. Use `e-pointer-cap` inside `e-circulargauge-pointer`.

```html
<e-pointer-cap radius="10">
</e-pointer-cap>
```

2. Do not use `e-circulargauge-pointer-cap`.

If pointer tail is not rendering:

1. Use `e-pointer-needletail`.

```html
<e-pointer-needletail length="25%">
</e-pointer-needletail>
```

2. Do not use `e-circulargauge-pointer-needletail`.

If pointer gradient is not rendering:

1. Do not use nested gradient tags inside `e-circulargauge-pointer`.

2. Configure the gradient object in `Index.cshtml.cs`.

```csharp
public CircularGaugeLinearGradient PointerLinearGradient { get; set; } = new CircularGaugeLinearGradient
{
    StartValue = "0",
    EndValue = "100",
    ColorStop = new List<CircularGaugeColorStop>
    {
        new CircularGaugeColorStop { Color = "#FF5733", Offset = "0%" },
        new CircularGaugeColorStop { Color = "#28A745", Offset = "100%" }
    }
};
```

3. Bind it to the pointer.

```html
<e-circulargauge-pointer linearGradient="@Model.PointerLinearGradient">
</e-circulargauge-pointer>
```
