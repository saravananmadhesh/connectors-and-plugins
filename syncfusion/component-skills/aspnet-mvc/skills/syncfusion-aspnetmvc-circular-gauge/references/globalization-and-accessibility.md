# Globalization and Accessibility

## Table of Contents
- [RTL Support](#rtl-support)
- [Internationalization](#internationalization)
- [Accessibility Features](#accessibility-features)
- [WCAG Compliance](#wcag-compliance)

## RTL Support

### Enable Right-to-Left Layout

```csharp
@Html.EJS().CircularGauge("gauge")
    .EnableRTL = true
    .Title("الأداء")  // Arabic title
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100
        });
    })
    .Render();
```

### RTL Direction

When RTL enabled:
- Gauge axis rotates counter-clockwise
- Legend appears on left instead of right
- Text alignment reverses automatically
- Labels and annotations flip

### RTL with Custom Direction

```csharp
@Html.EJS().CircularGauge("gauge")
    .EnableRTL = true
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            Direction = GaugeDirection.ClockWise  // Explicit direction
        });
    })
    .Render();
```

### RTL Content

```csharp
@Html.EJS().CircularGauge("gauge")
    .EnableRTL = true
    .Title("أداء النظام")
    .Annotations(annotations =>
    {
        annotations.Add(new CircularGaugeAnnotation
        {
            Content = "<div style='direction:rtl;'>القيمة الحالية: 65</div>",
            Angle = 180,
            Radius = "40%"
        });
    })
    .Render();
```

### RTL in HTML

Set RTL at document level:

```html
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <title>Syncfusion Circular Gauge</title>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
</head>
<body>
    @Html.EJS().CircularGauge("gauge")
        .Axes(axes =>
        {
            axes.Add(new CircularGaugeAxis { Minimum = 0, Maximum = 100 });
        })
        .Render();
</body>
</html>
```

## Internationalization

### Language Support

Syncfusion supports multiple languages through localization:

```csharp
@Html.EJS().CircularGauge("gauge")
    .Locale = "ar"  // Arabic
    .Title("مقياس الأداء")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis { Minimum = 0, Maximum = 100 });
    })
    .Render();
```

### Supported Locales

```
ar    - Arabic
cs    - Czech
de    - German
el    - Greek
en    - English
es    - Spanish
fr    - French
he    - Hebrew
hu    - Hungarian
it    - Italian
ja    - Japanese
ko    - Korean
nl    - Dutch
pl    - Polish
pt    - Portuguese
pt-br - Brazilian Portuguese
ro    - Romanian
ru    - Russian
sv    - Swedish
tr    - Turkish
zh    - Chinese (Simplified)
zh-hk - Chinese (Traditional)
```

### Custom Locale Strings

```javascript
<script>
    // Define custom locale
    ej.circulargauge.Locale['custom'] = {
        'criticalZone': 'منطقة حرجة',
        'normalZone': 'منطقة عادية',
        'goodZone': 'منطقة جيدة'
    };
</script>

@Html.EJS().CircularGauge("gauge")
    .Locale = "custom"
    .Render();
```

### Date/Number Formatting by Locale

```csharp
// French locale (uses comma for decimals)
@Html.EJS().CircularGauge("gauge")
    .Locale = "fr"
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            LabelStyle = new CircularGaugeLabel
            {
                Format = "n2"  // Format respects locale
            }
        });
    })
    .Render();
```

### Bi-directional Text Support

```csharp
@Html.EJS().CircularGauge("gauge")
    .EnableRTL = true
    .Title("أداء: Performance")  // Mixed RTL and LTR
    .Annotations(annotations =>
    {
        annotations.Add(new CircularGaugeAnnotation
        {
            Content = @"<div style='unicode-bidi:bidi-override;direction:rtl;'>
                            ערך: Value 65
                        </div>",
            Angle = 180,
            Radius = "40%"
        });
    })
    .Render();
```

## Accessibility Features

### ARIA Attributes

Gauge includes built-in ARIA support:

```csharp
@Html.EJS().CircularGauge("gauge")
    .Title("System Performance")
    .AriaLabel("Circular gauge showing system performance from 0 to 100")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            Ranges = new List<CircularGaugeRange>
            {
                new CircularGaugeRange { Start = 0, End = 30, Color = "#FF0000" },
                new CircularGaugeRange { Start = 30, End = 70, Color = "#FFAA00" },
                new CircularGaugeRange { Start = 70, End = 100, Color = "#00AA00" }
            }
        });
    })
    .Render();
```

### Keyboard Navigation

```html
<!-- Keyboard support for interactive features -->
<div style="margin-top: 20px;">
    <h3>Keyboard Navigation</h3>
    <ul>
        <li><kbd>Arrow Keys</kbd> - Adjust pointer value</li>
        <li><kbd>Tab</kbd> - Move focus to interactive elements</li>
        <li><kbd>Enter</kbd> - Activate focused element</li>
        <li><kbd>Esc</kbd> - Cancel interaction</li>
    </ul>
</div>

@Html.EJS().CircularGauge("gauge")
    .EnablePointerDrag = true
    .TabIndex = 0
    .Render();
```

### High Contrast Mode

Enable high contrast theme for visibility:

```html
<!-- High contrast CSS -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/highcontrast.css" />

@Html.EJS().CircularGauge("gauge")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis { Minimum = 0, Maximum = 100 });
    })
    .Render();
```

### Screen Reader Support

Gauges include semantic structure for screen readers:

```html
<div role="group" aria-labelledby="gaugeTitle">
    @Html.EJS().CircularGauge("performanceGauge")
        .Title("System Performance")
        .Axes(axes =>
        {
            axes.Add(new CircularGaugeAxis
            {
                Minimum = 0,
                Maximum = 100
            });
        })
        .Render();
</div>
```

### Semantic HTML

```html
<section aria-label="Performance Metrics">
    @Html.EJS().CircularGauge("gauge1")
        .Title("CPU Usage")
        .Render()
    
    @Html.EJS().CircularGauge("gauge2")
        .Title("Memory Usage")
        .Render()
    
    @Html.EJS().CircularGauge("gauge3")
        .Title("Disk Usage")
        .Render()
</section>
```

## WCAG Compliance

### Color Contrast

Ensure adequate color contrast for visibility:

**Good Contrast:**
```csharp
Background = "#FFFFFF"      // White
Text/Axis = "#000000"       // Black (21:1 ratio)
```

**Accessible Range Colors:**
```csharp
new CircularGaugeRange
{
    Start = 0,
    End = 33,
    Color = "#0000AA"        // Dark blue (AA compliant)
},
new CircularGaugeRange
{
    Start = 33,
    End = 66,
    Color = "#AA6600"        // Dark orange (AA compliant)
},
new CircularGaugeRange
{
    Start = 66,
    End = 100,
    Color = "#00AA00"        // Dark green (AA compliant)
}
```

### Font Size Guidelines

```csharp
// Minimum readable size (14px for body text)
LabelStyle = new CircularGaugeLabel
{
    FontSize = "14px"  // At least 14px
}

// Title larger (18px+)
.TitleStyle(ts => ts
    .FontSize = "20px"  // Large, prominent
)
```

### Color Alone Not Sufficient

Don't use only color to convey information - add patterns or labels:

```csharp
new CircularGaugeRange
{
    Start = 0,
    End = 30,
    Color = "#FF0000",
    LegendText = "⚠ Critical"  // Add symbol/text
},
new CircularGaugeRange
{
    Start = 30,
    End = 70,
    Color = "#FFAA00",
    LegendText = "⚡ Warning"   // Add symbol/text
},
new CircularGaugeRange
{
    Start = 70,
    End = 100,
    Color = "#00AA00",
    LegendText = "✓ Healthy"    // Add symbol/text
}
```

### Focus Indicators

Ensure focus is visible for keyboard users:

```css
/* CSS for focus visibility */
.e-circulargauge:focus {
    outline: 3px solid #4A90E2;
    outline-offset: 2px;
}
```

## Complete Accessible Example

```csharp
@Html.EJS().CircularGauge("accessibleGauge")
    .Title("نظام الأداء - System Performance")
    .EnableRTL = true
    .Locale = "ar"
    .AriaLabel = "مقياس الأداء من 0 إلى 100"
    .TabIndex = 0
    .Legend(legend => legend
        .Visible = true
        .LabelStyle(ls => ls
            .FontSize = "14px"
            .Color = "#000000"
        )
    )
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            LabelStyle = new CircularGaugeLabel
            {
                FontSize = "14px",
                Color = "#000000"
            },
            Ranges = new List<CircularGaugeRange>
            {
                new CircularGaugeRange
                {
                    Start = 0,
                    End = 30,
                    Color = "#0000AA",
                    LegendText = "⚠ حرج - Critical"
                },
                new CircularGaugeRange
                {
                    Start = 30,
                    End = 70,
                    Color = "#AA6600",
                    LegendText = "⚡ تحذير - Warning"
                },
                new CircularGaugeRange
                {
                    Start = 70,
                    End = 100,
                    Color = "#00AA00",
                    LegendText = "✓ صحي - Healthy"
                }
            }
        });
    })
    .Pointers(pointers =>
    {
        pointers.Add(new CircularGaugePointer
        {
            Value = 72,
            Type = GaugePointerType.Needle,
            Color = "#000000"
        });
    })
    .Render();

<div role="region" aria-live="polite" aria-label="Current Value">
    <p>القيمة الحالية - Current Value: <strong>72</strong></p>
    <p>الحالة - Status: <strong style="color: green;">✓ صحي - Healthy</strong></p>
</div>
```

**Accessibility Features Included:**
- ✓ RTL support for Arabic/Hebrew/Farsi
- ✓ High contrast colors (AA compliant)
- ✓ Large readable fonts (14px+)
- ✓ ARIA labels for screen readers
- ✓ Keyboard navigation enabled
- ✓ Semantic HTML structure
- ✓ Legend with text labels (not color-only)
- ✓ Live region updates

This ensures your gauge is usable by:
- Keyboard-only users
- Screen reader users
- Users with low vision
- Users with color blindness
- International audiences
