# Internationalization and Localization in Circular Gauge

## Table of Contents

- [Number Formatting](#number-formatting)
  - [Basic Number Formatting](#basic-number-formatting)
  - [Number Format Examples](#number-format-examples)
- [Currency Formatting](#currency-formatting)
  - [Basic Currency Format](#basic-currency-format)
  - [Default Currency](#default-currency)
  - [Currency Format Examples](#currency-format-examples)
  - [Globalization to EUR](#globalization-to-eur)
- [Percentage Formatting](#percentage-formatting)
  - [Percentage Scale](#percentage-scale)
  - [Percentage Use Cases](#percentage-use-cases)
- [Right-to-Left RTL Support](#right-to-left-rtl-support)
  - [Enabling RTL](#enabling-rtl)
  - [RTL Axis Direction](#rtl-axis-direction)
  - [Complete RTL Gauge](#complete-rtl-gauge)
- [Locale-Specific Display](#locale-specific-display)
  - [Custom Format with Units](#custom-format-with-units)
  - [Multi-Language Gauge](#multi-language-gauge)
  - [Locale-Aware Ranges](#locale-aware-ranges)
- [Tooltip Localization](#tooltip-localization)
  - [Localized Tooltip Format](#localized-tooltip-format)
  - [Tooltip in Different Languages](#tooltip-in-different-languages)
- [Complete Example: Multi-Language Dashboard](#complete-example-multi-language-dashboard)
- [Troubleshooting](#troubleshooting)

## Number Formatting

### Basic Number Formatting

Use `e-axis-labelstyle` inside `e-circulargauge-axis` to format axis labels.

Do not use `e-circulargauge-labelstyle` for this ASP.NET Core Circular Gauge axis label style structure.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Number Formatting";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 65;

        public string LabelFormat { get; set; } = "n0";

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
    ViewData["Title"] = "Number Formatting";
}

<h1>Number Formatting</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-axis-labelstyle format="@Model.LabelFormat">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Common number formats:

- `n0`: Number with 0 decimal places.
- `n1`: Number with 1 decimal place.
- `n2`: Number with 2 decimal places.
- `n3`: Number with 3 decimal places.

### Number Format Examples

```html
<e-axis-labelstyle format="n0">
</e-axis-labelstyle>

<e-axis-labelstyle format="n1">
</e-axis-labelstyle>

<e-axis-labelstyle format="n2">
</e-axis-labelstyle>
```

## Currency Formatting

### Basic Currency Format

Use currency format strings such as `c0`, `c1`, and `c2`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Currency Formatting";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 1000;

        public double PointerValue { get; set; } = 650;

        public string CurrencyLabelFormat { get; set; } = "c0";

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
    ViewData["Title"] = "Currency Formatting";
}

<h1>Currency Formatting</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-axis-labelstyle format="@Model.CurrencyLabelFormat">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Default Currency

Currency output depends on the active culture and currency configuration.

Common examples:

- `c0`: Currency with 0 decimal places.
- `c1`: Currency with 1 decimal place.
- `c2`: Currency with 2 decimal places.

### Currency Format Examples

```html
<e-axis-labelstyle format="c0">
</e-axis-labelstyle>

<e-axis-labelstyle format="c2">
</e-axis-labelstyle>
```

### Globalization to EUR

To display Euro currency, set the culture and currency code on the client side before or during component initialization.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Euro Currency Gauge";

        public string Locale { get; set; } = "de-DE";

        public string CurrencyCode { get; set; } = "EUR";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 1000;

        public double PointerValue { get; set; } = 650;

        public string CurrencyLabelFormat { get; set; } = "c2";

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
    ViewData["Title"] = "Euro Currency Gauge";
}

<h1>Euro Currency Gauge</h1>

<script>
    ej.base.setCulture('@Model.Locale');
    ej.base.setCurrencyCode('@Model.CurrencyCode');
</script>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    locale="@Model.Locale"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-axis-labelstyle format="@Model.CurrencyLabelFormat">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

If a non-default culture does not format as expected, ensure the required culture data is available in the application.

## Percentage Formatting

### Basic Percentage Format

For true percentage formatting with `p0`, `p1`, or `p2`, use a decimal axis scale such as `0` to `1`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Percentage Formatting";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 1;

        public double PointerValue { get; set; } = 0.75;

        public string PercentageLabelFormat { get; set; } = "p0";

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
    ViewData["Title"] = "Percentage Formatting";
}

<h1>Percentage Formatting</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-axis-labelstyle format="@Model.PercentageLabelFormat">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Percentage format examples:

- `p0`: `0.75` displays as `75%`.
- `p1`: `0.756` displays as `75.6%`.
- `p2`: `0.7562` displays as `75.62%`.

### Percentage Scale

If your axis values are already from `0` to `100`, use custom formatting with `{value}%` instead of `p0`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Percentage Scale";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 75;

        public string PercentageLabelFormat { get; set; } = "{value}%";

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
    ViewData["Title"] = "Percentage Scale";
}

<h1>Percentage Scale</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-axis-labelstyle format="@Model.PercentageLabelFormat">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Percentage Use Cases

Use percentage formatting for:

- Progress gauges.
- Completion indicators.
- Resource utilization dashboards.
- CPU, memory, disk, or network usage.
- SLA and KPI visualizations.

## Right-to-Left RTL Support

### Enabling RTL

Use `enableRtl="true"` on the root `ejs-circulargauge` tag for right-to-left rendering.
When this property is enabled, elements such as the tooltip and legend will be rendered from right to left
Meanwhile, the axis can be rendered from right to left by setting the direction property to AntiClockWise.
File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "مقياس الأداء";

        public double PointerValue { get; set; } = 65;

        public bool EnableRtl { get; set; } = true;

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
    ViewData["Title"] = "RTL Gauge";
}

<h1>RTL Circular Gauge</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    enableRtl="@Model.EnableRtl">
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

### RTL Axis Direction

For an RTL-style gauge scale direction, set the axis `direction` to `AntiClockWise`.

```html
<e-circulargauge-axis startAngle="240"
                      endAngle="120"
                      minimum="0"
                      maximum="100"
                      direction="AntiClockWise">
</e-circulargauge-axis>
```

Direction options:

- `ClockWise`
- `AntiClockWise`

### Complete RTL Gauge

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "مقياس الأداء";

        public double PointerValue { get; set; } = 75;

        public string LabelFormat { get; set; } = "n0";

        public bool EnableRtl { get; set; } = true;

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
    ViewData["Title"] = "Complete RTL Gauge";
}

<h1>Complete RTL Gauge</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    enableRtl="@Model.EnableRtl">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100"
                              direction="AntiClockWise"
                              radius="90%">
            <e-axis-labelstyle format="@Model.LabelFormat">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Locale-Specific Display

### Custom Format with Units

Use `{value}` when adding custom units to labels.

```html
<e-axis-labelstyle format="{value}°F">
</e-axis-labelstyle>

<e-axis-labelstyle format="{value} km">
</e-axis-labelstyle>

<e-axis-labelstyle format="{value} km/h">
</e-axis-labelstyle>
```

### Multi-Language Gauge

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Temperature Control";

        public double MinimumValue { get; set; } = -40;

        public double MaximumValue { get; set; } = 50;

        public double PointerValue { get; set; } = 20;

        public string TemperatureLabelFormat { get; set; } = "{value}°C";

        public string AnnotationContent { get; set; } = "<div>Temperature</div>";

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
    ViewData["Title"] = "Multi-Language Gauge";
}

<h1>Multi-Language Gauge</h1>

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
            <e-axis-labelstyle format="@Model.TemperatureLabelFormat">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>

            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.AnnotationContent"
                                             angle="270"
                                             radius="130%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Locale-Aware Ranges

Use ranges to reflect meaningful regional or domain-specific zones.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Temperature Zones";

        public double MinimumValue { get; set; } = -40;

        public double MaximumValue { get; set; } = 50;

        public double PointerValue { get; set; } = 20;

        public string TemperatureLabelFormat { get; set; } = "{value}°C";

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
    ViewData["Title"] = "Temperature Zones";
}

<h1>Temperature Zones</h1>

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
                <e-circulargauge-range start="-40"
                                       end="0"
                                       color="#3498DB">
                </e-circulargauge-range>

                <e-circulargauge-range start="0"
                                       end="30"
                                       color="#2ECC71">
                </e-circulargauge-range>

                <e-circulargauge-range start="30"
                                       end="50"
                                       color="#E74C3C">
                </e-circulargauge-range>
            </e-circulargauge-ranges>

            <e-axis-labelstyle format="@Model.TemperatureLabelFormat">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Tooltip Localization

### Localized Tooltip Format

Use `e-circulargauge-tooltip`, not `e-circulargauge-tooltipsettings`.

For pointer tooltip text, use `${value}` in the tooltip format.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Localized Tooltip";

        public double PointerValue { get; set; } = 65;

        public string[] TooltipTypes { get; set; } = { "Pointer" };

        public string TooltipFormat { get; set; } = "Value: ${value}";

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
    ViewData["Title"] = "Localized Tooltip";
}

<h1>Localized Tooltip</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-tooltip enable="true"
                              type="@Model.TooltipTypes"
                              format="@Model.TooltipFormat">
    </e-circulargauge-tooltip>

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

### Tooltip in Different Languages

Use a tooltip template selector when tooltip content needs formatted localized HTML.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Localized Tooltip Template";

        public double PointerValue { get; set; } = 65;

        public string[] TooltipTypes { get; set; } = { "Pointer" };

        public string TooltipTemplateSelector { get; set; } = "#localizedTooltipTemplate";

        public string TooltipTitle { get; set; } = "Current Value";

        public string TooltipUnit { get; set; } = "Units";

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
    ViewData["Title"] = "Localized Tooltip Template";
}

<h1>Localized Tooltip Template</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-tooltip enable="true"
                              type="@Model.TooltipTypes"
                              template="@Model.TooltipTemplateSelector">
    </e-circulargauge-tooltip>

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

<script id="localizedTooltipTemplate" type="text/x-template">
    <div style="background:#333;color:white;padding:8px;border-radius:4px;text-align:center;">
        <strong>@Model.TooltipTitle</strong>
        <div style="font-size:18px;">${value}</div>
        <div>@Model.TooltipUnit</div>
    </div>
</script>
```

Example localized tooltip text values in `Index.cshtml.cs`:

```csharp
public string TooltipTitle { get; set; } = "Aktueller Wert";
public string TooltipUnit { get; set; } = "Einheiten";
```

```csharp
public string TooltipTitle { get; set; } = "Valor Actual";
public string TooltipUnit { get; set; } = "Unidades";
```

```csharp
public string TooltipTitle { get; set; } = "القيمة الحالية";
public string TooltipUnit { get; set; } = "وحدات";
```

## Complete Example: Multi-Language Dashboard

This example combines:

- Locale property.
- RTL support.
- Axis label formatting.
- Localized tooltip template.
- Localized annotation content.
- Ranges.
- Pointer value from `Index.cshtml.cs`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string Locale { get; set; } = "en-US";

        public bool EnableRtl { get; set; } = false;

        public string GaugeTitle { get; set; } = "System Monitor";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 65;

        public string LabelFormat { get; set; } = "n1";

        public string[] TooltipTypes { get; set; } = { "Pointer" };

        public string TooltipTemplateSelector { get; set; } = "#gaugeTooltipTemplate";

        public string TooltipTitle { get; set; } = "Current Value";

        public string TooltipUnit { get; set; } = "Units";

        public string AnnotationContent { get; set; } =
            "<div style='text-align:center;'>" +
            "<div style='font-size:24px;font-weight:bold;'>65</div>" +
            "<div style='font-size:12px;color:#666;'>Units</div>" +
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
    ViewData["Title"] = "Multi-Language Dashboard";
}

<h1>Multi-Language Dashboard</h1>

<script>
    ej.base.setCulture('@Model.Locale');
</script>

<ejs-circulargauge id="multiLangGauge"
                    title="@Model.GaugeTitle"
                    locale="@Model.Locale"
                    enableRtl="@Model.EnableRtl"
                    width="100%"
                    height="450px">
    <e-circulargauge-tooltip enable="true"
                              type="@Model.TooltipTypes"
                              template="@Model.TooltipTemplateSelector">
    </e-circulargauge-tooltip>

    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue"
                              radius="90%">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0"
                                       end="33"
                                       color="#2ECC71">
                </e-circulargauge-range>
                <e-circulargauge-range start="33"
                                       end="66"
                                       color="#F39C12">
                </e-circulargauge-range>
                <e-circulargauge-range start="66"
                                       end="100"
                                       color="#E74C3C">
                </e-circulargauge-range>
            </e-circulargauge-ranges>

            <e-axis-labelstyle format="@Model.LabelFormat">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
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

<script id="gaugeTooltipTemplate" type="text/x-template">
    <div style="background:#333;color:white;padding:8px;border-radius:4px;text-align:center;">
        <strong>@Model.TooltipTitle</strong>
        <div style="font-size:18px;">${value}</div>
        <div>@Model.TooltipUnit</div>
    </div>
</script>
```

## Troubleshooting

If label format is not applying:

1. Use `e-axis-labelstyle`, not `e-circulargauge-labelstyle`.

```html
<e-axis-labelstyle format="n2">
</e-axis-labelstyle>
```

2. Confirm that the label style is inside `e-circulargauge-axis`.

3. Confirm the format string is valid.

If percentage format is incorrect:

1. Use `p0`, `p1`, or `p2` only when the axis scale is decimal, such as `0` to `1`.

```html
<e-circulargauge-axis minimum="0" maximum="1">
    <e-axis-labelstyle format="p0">
    </e-axis-labelstyle>
</e-circulargauge-axis>
```

2. If the axis scale is `0` to `100`, use `{value}%`.

```html
<e-axis-labelstyle format="{value}%">
</e-axis-labelstyle>
```

If RTL is not rendering as expected:

1. Set `enableRtl="true"` on `ejs-circulargauge`.

```html
<ejs-circulargauge enableRtl="true">
</ejs-circulargauge>
```

2. For axis direction, use `direction="AntiClockWise"`.

```html
<e-circulargauge-axis direction="AntiClockWise">
</e-circulargauge-axis>
```

If tooltip localization is not working:

1. Use `e-circulargauge-tooltip`, not `e-circulargauge-tooltipsettings`.

```html
<e-circulargauge-tooltip enable="true">
</e-circulargauge-tooltip>
```

2. For pointer tooltip format, use `${value}`.

```html
<e-circulargauge-tooltip enable="true"
                          format="Value: ${value}">
</e-circulargauge-tooltip>
```

3. Use a template selector for localized HTML tooltip content.

```html
<e-circulargauge-tooltip enable="true"
                          template="#localizedTooltipTemplate">
</e-circulargauge-tooltip>
```

If annotations are not positioned as expected:

1. Place `e-circulargauge-annotations` inside the target `e-circulargauge-axis`.

```html
<e-circulargauge-axis>
    <e-circulargauge-annotations>
        <e-circulargauge-annotation content="<div>Text</div>"
                                     angle="180"
                                     radius="35%">
        </e-circulargauge-annotation>
    </e-circulargauge-annotations>
</e-circulargauge-axis>
```

If currency format does not use the expected symbol:

1. Set the culture.

```html
<script>
    ej.base.setCulture('de-DE');
</script>
```

2. Set the currency code.

```html
<script>
    ej.base.setCurrencyCode('EUR');
</script>
```

3. Set the gauge locale.

```html
<ejs-circulargauge locale="de-DE">
</ejs-circulargauge>
```
