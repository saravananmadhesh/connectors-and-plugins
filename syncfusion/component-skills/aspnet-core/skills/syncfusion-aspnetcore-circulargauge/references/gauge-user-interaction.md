# User Interactions: Tooltips and Drag

## Table of Contents

- [Tooltips Overview](#tooltips-overview)
- [Pointer Tooltips](#pointer-tooltips)
  - [Enabling Pointer Tooltips](#enabling-pointer-tooltips)
  - [Customizing Pointer Tooltip](#customizing-pointer-tooltip)
- [Range Tooltips](#range-tooltips)
  - [Enabling Range Tooltips](#enabling-range-tooltips)
  - [Customizing Range Tooltip](#customizing-range-tooltip)
- [Annotation Tooltips](#annotation-tooltips)
  - [Enabling Annotation Tooltips](#enabling-annotation-tooltips)
  - [Customizing Annotation Tooltip](#customizing-annotation-tooltip)
- [Custom Tooltip Templates](#custom-tooltip-templates)
  - [Using Template for Pointer](#using-template-for-pointer)
  - [Advanced Template](#advanced-template)
- [Tooltip Appearance Options](#tooltip-appearance-options)
  - [General Tooltip Configuration](#general-tooltip-configuration)
- [Pointer Dragging](#pointer-dragging)
  - [Enable Global Pointer Drag](#enable-global-pointer-drag)
  - [Drag Interaction Flow](#drag-interaction-flow)
  - [Selective Pointer Dragging](#selective-pointer-dragging)
  - [Drag Constraints](#drag-constraints)
- [Range Dragging](#range-dragging)
  - [Enable Range Drag](#enable-range-drag)
  - [Range Drag Workflow](#range-drag-workflow)
- [Complete Example: Interactive Dashboard](#complete-example-interactive-dashboard)
- [Combining Tooltips and Drag](#combining-tooltips-and-drag)
- [Use Cases](#use-cases)
  - [Setting Alarms](#setting-alarms)
  - [Volume Control](#volume-control)
  - [Threshold Configuration](#threshold-configuration)
  - [Interactive Monitoring](#interactive-monitoring)
- [Troubleshooting](#troubleshooting)
- [Combined Mistakes and Future References](#combined-mistakes-and-future-references)

## Tooltips Overview

Tooltips display contextual information when users hover over Circular Gauge elements. They improve usability by showing additional details without permanently occupying page space.

Tooltips can be used to show:

- Current pointer value.
- Range start and end values.
- Annotation-related information.
- Custom formatted messages.
- Unit-based values such as percentage, km/h, °C, or PSI.

In ASP.NET Core Circular Gauge, basic tooltip behavior can be configured through the `e-circulargauge-tooltip` tag.

```html
<e-circulargauge-tooltip enable="true">
</e-circulargauge-tooltip>
```

For nested tooltip configuration, such as range-specific tooltip formatting or annotation-specific tooltip formatting, use `CircularGaugeTooltipSettings` in `Index.cshtml.cs` and bind it to the `tooltip` property of the Circular Gauge.

## Pointer Tooltips

### Enabling Pointer Tooltips

Use pointer tooltips when you want to show the current pointer value on hover.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Pointer Tooltip";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 65;

        public string[] PointerTooltipTypes { get; set; } = { "Pointer" };

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
    ViewData["Title"] = "Pointer Tooltip";
}

<h1>Pointer Tooltip</h1>
<p>Hover over the pointer to view its current value.</p>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-tooltip enable="true"
                              type="@Model.PointerTooltipTypes">
    </e-circulargauge-tooltip>

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

Default pointer tooltip behavior:

- Displays when the pointer is hovered.
- Shows the pointer value.
- Positions near the pointer based on available gauge space.

### Customizing Pointer Tooltip

Use pointer tooltip settings to customize the tooltip background, animation, mouse position behavior, and value format.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Customized Pointer Tooltip";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 65;

        public string[] PointerTooltipTypes { get; set; } = { "Pointer" };

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
    ViewData["Title"] = "Customized Pointer Tooltip";
}

<h1>Customized Pointer Tooltip</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-tooltip enable="true"
                              type="@Model.PointerTooltipTypes"
                              fill="#1F1F1F"
                              format="Speed: ${value} km/h"
                              enableAnimation="true"
                              showAtMousePosition="false">
    </e-circulargauge-tooltip>

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

Common pointer tooltip options:

- `enable` enables or disables tooltip rendering.
- `type` specifies the target element type for tooltip rendering.
- `fill` sets the tooltip background color.
- `format` customizes the displayed pointer value.
- `enableAnimation` enables tooltip animation.
- `showAtMousePosition` controls whether the tooltip appears at the mouse position.

## Range Tooltips

### Enabling Range Tooltips

Use range tooltips when you want to show range information on hover.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Range Tooltip";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public string[] RangeTooltipTypes { get; set; } = { "Range" };

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
    ViewData["Title"] = "Range Tooltip";
}

<h1>Range Tooltip</h1>
<p>Hover over each range to view its start and end values.</p>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-tooltip enable="true"
                              type="@Model.RangeTooltipTypes">
    </e-circulargauge-tooltip>

    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0"
                                       end="35"
                                       color="#2ECC71">
                </e-circulargauge-range>
                <e-circulargauge-range start="35"
                                       end="70"
                                       color="#F39C12">
                </e-circulargauge-range>
                <e-circulargauge-range start="70"
                                       end="100"
                                       color="#E74C3C">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Default range tooltip behavior:

- Displays when the range is hovered.
- Shows the range start and end values.
- Helps users understand configured safe, warning, or danger zones.

### Customizing Range Tooltip

For range tooltips, do not place `format` directly on the root `e-circulargauge-tooltip` tag. The root tooltip `format` is for pointer tooltip content. Range-specific formatting must be configured through `RangeSettings` in `CircularGaugeTooltipSettings`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.CircularGauge;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Customized Range Tooltip";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public CircularGaugeTooltipSettings RangeTooltip { get; set; } = new CircularGaugeTooltipSettings
        {
            Enable = true,
            Type = new string[] { "Range" },
            RangeSettings = new CircularGaugeRangeTooltip
            {
                Format = "Range: {start} - {end}",
                Fill = "#1F1F1F",
                EnableAnimation = true,
                ShowAtMousePosition = false
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
    ViewData["Title"] = "Customized Range Tooltip";
}

<h1>Customized Range Tooltip</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    tooltip="@Model.RangeTooltip">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0"
                                       end="35"
                                       color="#2ECC71">
                </e-circulargauge-range>
                <e-circulargauge-range start="35"
                                       end="70"
                                       color="#F39C12">
                </e-circulargauge-range>
                <e-circulargauge-range start="70"
                                       end="100"
                                       color="#E74C3C">
                </e-circulargauge-range>
            </e-circulargauge-ranges>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Range tooltip options:

- `RangeSettings.Format` displays a custom message with `{start}` and `{end}` values.
- `RangeSettings.Fill` controls the range tooltip background color.
- `RangeSettings.EnableAnimation` controls range tooltip animation.
- `RangeSettings.ShowAtMousePosition` controls range tooltip positioning behavior.

## Annotation Tooltips

### Enabling Annotation Tooltips

Use annotation tooltips when annotations need hover-based contextual information.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Annotation Tooltip";

        public string[] AnnotationTooltipTypes { get; set; } = { "Annotation" };

        public string AnnotationContent { get; set; } = "<div>Important Info</div>";

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
    ViewData["Title"] = "Annotation Tooltip";
}

<h1>Annotation Tooltip</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-tooltip enable="true"
                              type="@Model.AnnotationTooltipTypes">
    </e-circulargauge-tooltip>

    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100">
            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.AnnotationContent"
                                             angle="180"
                                             radius="50%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Annotation tooltip behavior:

- Displays when the annotation is hovered.
- Can show annotation content or custom formatted text.
- Useful for showing status text, threshold descriptions, or dashboard notes.

### Customizing Annotation Tooltip

For annotation-specific tooltip customization, configure `AnnotationSettings` in `CircularGaugeTooltipSettings` and bind it through the Circular Gauge `tooltip` property.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.CircularGauge;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Customized Annotation Tooltip";

        public string AnnotationContent { get; set; } = "<div>System Status</div>";

        public CircularGaugeTooltipSettings AnnotationTooltip { get; set; } = new CircularGaugeTooltipSettings
        {
            Enable = true,
            Type = new string[] { "Annotation" },
            AnnotationSettings = new CircularGaugeAnnotationTooltip
            {
                Format = "Status: Active",
                Fill = "#1F1F1F",
                EnableAnimation = true,
                ShowAtMousePosition = false
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
    ViewData["Title"] = "Customized Annotation Tooltip";
}

<h1>Customized Annotation Tooltip</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    tooltip="@Model.AnnotationTooltip">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100">
            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.AnnotationContent"
                                             angle="180"
                                             radius="50%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Custom Tooltip Templates

### Using Template for Pointer

Use a tooltip template when the tooltip needs custom HTML content.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Pointer Tooltip Template";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 120;

        public double PointerValue { get; set; } = 70;

        public string[] PointerTooltipTypes { get; set; } = { "Pointer" };

        public string PointerTooltipTemplate { get; set; } = "#pointerTooltipTemplate";

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
    ViewData["Title"] = "Pointer Tooltip Template";
}

<h1>Pointer Tooltip Template</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-tooltip enable="true"
                              type="@Model.PointerTooltipTypes"
                              template="@Model.PointerTooltipTemplate">
    </e-circulargauge-tooltip>

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

<script id="pointerTooltipTemplate" type="text/x-template">
    <div style="background:#333;color:white;padding:8px;border-radius:4px;text-align:center;">
        <div>Current Value</div>
        <div style="font-size:18px;font-weight:bold;">${value}</div>
        <div>km/h</div>
    </div>
</script>
```

Template variables:

- `${value}` displays the current pointer value.
- `${tooltip}` displays the default tooltip content.

### Advanced Template

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Advanced Tooltip Template";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 120;

        public double PointerValue { get; set; } = 80;

        public string[] PointerTooltipTypes { get; set; } = { "Pointer" };

        public string AdvancedTooltipTemplate { get; set; } = "#advancedTooltipTemplate";

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
    ViewData["Title"] = "Advanced Tooltip Template";
}

<h1>Advanced Tooltip Template</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-tooltip enable="true"
                              type="@Model.PointerTooltipTypes"
                              template="@Model.AdvancedTooltipTemplate">
    </e-circulargauge-tooltip>

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

<script id="advancedTooltipTemplate" type="text/x-template">
    <div style="text-align:center;background:#333;color:white;padding:12px;border-radius:8px;">
        <div style="font-weight:bold;">Speed Indicator</div>
        <div style="font-size:24px;margin:8px 0;">${value}</div>
        <div style="font-size:11px;">km/h</div>
    </div>
</script>
```

## Tooltip Appearance Options

### General Tooltip Configuration

Use general tooltip settings when you need consistent pointer tooltip appearance.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Tooltip Appearance";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 55;

        public string[] PointerTooltipTypes { get; set; } = { "Pointer" };

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
    ViewData["Title"] = "Tooltip Appearance";
}

<h1>Tooltip Appearance Options</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-tooltip enable="true"
                              type="@Model.PointerTooltipTypes"
                              fill="#1F1F1F"
                              format="Value: ${value}"
                              enableAnimation="true"
                              showAtMousePosition="false">
    </e-circulargauge-tooltip>

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

Tooltip properties:

- `enable` toggles the tooltip.
- `type` defines whether the tooltip applies to pointers, ranges, annotations, or multiple element types.
- `fill` sets the pointer tooltip background color.
- `format` changes pointer tooltip text.
- `template` renders custom HTML tooltip content.
- `enableAnimation` enables smooth tooltip display.
- `showAtMousePosition` controls whether the tooltip follows the cursor.

## Pointer Dragging

### Enable Global Pointer Drag

Use pointer dragging when the user should be able to adjust the gauge value interactively.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Draggable Pointer";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

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
<p>Drag the pointer to change the gauge value.</p>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    enablePointerDrag="true">
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

### Drag Interaction Flow

1. The user clicks and holds the pointer.
2. The pointer enters drag mode.
3. The pointer follows the mouse movement along the circular axis.
4. The value remains constrained within the axis `minimum` and `maximum`.
5. The user releases the pointer to finalize the value.

### Selective Pointer Dragging

Use selective pointer dragging when one pointer should be draggable and another pointer should remain fixed.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Selective Pointer Dragging";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double EditablePointerValue { get; set; } = 50;

        public double ReferencePointerValue { get; set; } = 80;

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
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.EditablePointerValue"
                                         enableDrag="true">
                </e-circulargauge-pointer>
                <e-circulargauge-pointer type="Marker"
                                         value="@Model.ReferencePointerValue"
                                         enableDrag="false"
                                         markerShape="Circle">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Individual pointer-level `enableDrag` settings are useful when a gauge contains both an editable value pointer and a fixed reference pointer.

### Drag Constraints

Pointer dragging is constrained by the axis configuration:

- The pointer cannot move below the axis `minimum`.
- The pointer cannot move above the axis `maximum`.
- The pointer value is updated based on its position on the circular scale.
- The behavior is useful for constrained numeric input.

## Range Dragging

### Enable Range Drag

Use range dragging when users need to adjust value zones interactively.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Draggable Range";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

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
<p>Drag the range to adjust its position.</p>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    enableRangeDrag="true">
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

### Range Drag Workflow

1. The user selects the range band.
2. The user drags the range along the axis.
3. The range position updates interactively.
4. The range remains constrained within the axis minimum and maximum.
5. The user releases the mouse to finalize the adjustment.

Range dragging is useful for:

- Alarm threshold configuration.
- Safe operating range setup.
- Warning and danger zone adjustment.
- Visual configuration of monitoring dashboards.

## Complete Example: Interactive Dashboard

The following example combines:

- Pointer tooltip.
- Range tooltip.
- Annotation tooltip.
- Pointer dragging.
- Range dragging.
- Ranges for normal, warning, and danger zones.
- Axis label formatting.
- Pointer animation.
- A simple annotation inside the axis.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.CircularGauge;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Interactive System Monitor";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 65;

        public double NormalRangeStart { get; set; } = 0;

        public double NormalRangeEnd { get; set; } = 30;

        public double WarningRangeStart { get; set; } = 30;

        public double WarningRangeEnd { get; set; } = 70;

        public double DangerRangeStart { get; set; } = 70;

        public double DangerRangeEnd { get; set; } = 100;

        public string AnnotationContent { get; set; } = "<div>Drag pointer or ranges to adjust</div>";

        public CircularGaugeTooltipSettings DashboardTooltip { get; set; } = new CircularGaugeTooltipSettings
        {
            Enable = true,
            Type = new string[] { "Pointer", "Range", "Annotation" },
            Fill = "#1F1F1F",
            Format = "Value: ${value}%",
            EnableAnimation = true,
            ShowAtMousePosition = false,
            RangeSettings = new CircularGaugeRangeTooltip
            {
                Format = "Range: {start} - {end}",
                Fill = "#1F1F1F",
                EnableAnimation = true,
                ShowAtMousePosition = false
            },
            AnnotationSettings = new CircularGaugeAnnotationTooltip
            {
                Format = "Interactive gauge",
                Fill = "#1F1F1F",
                EnableAnimation = true
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
    ViewData["Title"] = "Interactive Dashboard";
}

<h1>Interactive Dashboard</h1>
<p>Use tooltips and drag interactions to inspect and adjust gauge values.</p>

<ejs-circulargauge id="interactiveGauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    enablePointerDrag="true"
                    enableRangeDrag="true"
                    tooltip="@Model.DashboardTooltip">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue"
                              radius="90%">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="@Model.NormalRangeStart"
                                       end="@Model.NormalRangeEnd"
                                       color="#2ECC71">
                </e-circulargauge-range>
                <e-circulargauge-range start="@Model.WarningRangeStart"
                                       end="@Model.WarningRangeEnd"
                                       color="#F39C12">
                </e-circulargauge-range>
                <e-circulargauge-range start="@Model.DangerRangeStart"
                                       end="@Model.DangerRangeEnd"
                                       color="#E74C3C">
                </e-circulargauge-range>
            </e-circulargauge-ranges>

            <e-axis-labelstyle format="{value}%">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue"
                                         enableDrag="true"
                                         color="#333333">
                    <e-pointer-animation enable="true"
                                         duration="1000">
                    </e-pointer-animation>
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>

            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.AnnotationContent"
                                             angle="270"
                                             radius="20%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Combining Tooltips and Drag

Use this approach when users should see the current value while dragging the pointer.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Tooltip While Dragging";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 50;

        public string[] PointerTooltipTypes { get; set; } = { "Pointer" };

        public string DragTooltipTemplate { get; set; } = "#dragTooltipTemplate";

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
    ViewData["Title"] = "Tooltip While Dragging";
}

<h1>Combining Tooltips and Drag</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    enablePointerDrag="true">
    <e-circulargauge-tooltip enable="true"
                              type="@Model.PointerTooltipTypes"
                              template="@Model.DragTooltipTemplate">
    </e-circulargauge-tooltip>

    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue"
                                         enableDrag="true">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>

<script id="dragTooltipTemplate" type="text/x-template">
    <div style="background:#333;color:white;padding:10px;border-radius:4px;">
        <strong>Value: ${value}</strong>
    </div>
</script>
```

Enhanced user experience:

- Tooltip shows the active value.
- User can inspect the value while interacting.
- Pointer remains constrained within the configured axis range.

## Use Cases

### Setting Alarms

Use draggable ranges to define alarm thresholds. Tooltips help users confirm the selected threshold range.

Example scenarios:

- Temperature warning range.
- Pressure danger zone.
- CPU usage threshold.
- Speed limit alert.

### Volume Control

Use a draggable pointer to let users select a numeric value. Tooltips can show the selected value in real time.

Example scenarios:

- Audio volume.
- Brightness level.
- Fan speed.
- Motor speed.

### Threshold Configuration

Use range dragging to configure minimum and maximum boundaries.

Example scenarios:

- Safe operating zones.
- SLA limit configuration.
- Quality score thresholds.
- Monitoring alert levels.

### Interactive Monitoring

Combine pointer tooltips, range tooltips, and drag support for dashboard-style experiences.

Example scenarios:

- Operations dashboards.
- IoT monitoring dashboards.
- System health dashboards.
- Industrial control panels.

## Troubleshooting

If the tooltip is not showing:

1. Confirm that tooltip is enabled by using the correct tooltip tag.

```html
<e-circulargauge-tooltip enable="true">
</e-circulargauge-tooltip>
```

2. Confirm that the tooltip `type` matches the element being hovered.

```csharp
public string[] PointerTooltipTypes { get; set; } = { "Pointer" };
```

3. Confirm that the pointer, range, or annotation is visible and has valid values.

4. Check the browser console for script errors.

If range tooltip format is not applied:

1. Do not place range tooltip format directly on the root `e-circulargauge-tooltip` tag.

```html
<e-circulargauge-tooltip format="Range: {start} - {end}">
</e-circulargauge-tooltip>
```

2. Use `CircularGaugeTooltipSettings.RangeSettings.Format` in `Index.cshtml.cs`.

```csharp
public CircularGaugeTooltipSettings RangeTooltip { get; set; } = new CircularGaugeTooltipSettings
{
    Enable = true,
    Type = new string[] { "Range" },
    RangeSettings = new CircularGaugeRangeTooltip
    {
        Format = "Range: {start} - {end}"
    }
};
```

3. Bind the tooltip object to the Circular Gauge.

```html
<ejs-circulargauge tooltip="@Model.RangeTooltip">
</ejs-circulargauge>
```

If pointer dragging is not working:

1. Confirm that pointer dragging is enabled on the Circular Gauge.

```html
<ejs-circulargauge enablePointerDrag="true">
</ejs-circulargauge>
```

2. Confirm that the pointer has a valid value inside the axis range.

```html
<e-circulargauge-axis minimum="0" maximum="100">
    <e-circulargauge-pointers>
        <e-circulargauge-pointer value="50">
        </e-circulargauge-pointer>
    </e-circulargauge-pointers>
</e-circulargauge-axis>
```

3. If pointer-level drag configuration is used, confirm that the pointer has `enableDrag="true"`.

```html
<e-circulargauge-pointer value="50" enableDrag="true">
</e-circulargauge-pointer>
```

If range dragging is not working:

1. Confirm that range dragging is enabled on the Circular Gauge.

```html
<ejs-circulargauge enableRangeDrag="true">
</ejs-circulargauge>
```

2. Confirm that the range `start` and `end` values are inside the axis range.

```html
<e-circulargauge-axis minimum="0" maximum="100">
    <e-circulargauge-ranges>
        <e-circulargauge-range start="20" end="60">
        </e-circulargauge-range>
    </e-circulargauge-ranges>
</e-circulargauge-axis>
```

If axis label formatting is not applied:

1. Use `e-axis-labelstyle` inside `e-circulargauge-axis`.

```html
<e-axis-labelstyle format="{value}%">
</e-axis-labelstyle>
```

2. Do not use `e-circulargauge-labelstyle` for this ASP.NET Core tag-helper structure.

If pointer animation is not applied:

1. Use `e-pointer-animation` inside `e-circulargauge-pointer`.

```html
<e-pointer-animation enable="true"
                     duration="1000">
</e-pointer-animation>
```

2. Do not use `e-circulargauge-pointer-animation` for this ASP.NET Core tag-helper structure.

If annotation is not rendering in the expected axis context:

1. Place `e-circulargauge-annotations` inside the target `e-circulargauge-axis`.

```html
<e-circulargauge-axis>
    <e-circulargauge-annotations>
        <e-circulargauge-annotation content="<div>Status</div>"
                                     angle="270"
                                     radius="20%">
        </e-circulargauge-annotation>
    </e-circulargauge-annotations>
</e-circulargauge-axis>
```

If the tooltip appears in the wrong location:

1. Use `showAtMousePosition="false"` for component-managed positioning.

```html
<e-circulargauge-tooltip enable="true"
                          showAtMousePosition="false">
</e-circulargauge-tooltip>
```

2. Confirm that the gauge container has sufficient width and height.

3. Confirm that the tooltip fill color and tooltip content provide enough visual contrast.