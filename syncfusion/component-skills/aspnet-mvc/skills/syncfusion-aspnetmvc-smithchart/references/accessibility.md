# Accessibility in Smith Chart

## Table of Contents
- [Overview](#overview)
- [Accessibility Standards Compliance](#accessibility-standards-compliance)
  - [WCAG 2.2 Compliance](#wcag-22-compliance)
  - [Section 508 Compliance](#section-508-compliance)
  - [Compliance Summary Table](#compliance-summary-table)
- [WAI-ARIA Attributes](#wai-aria-attributes)
  - [ARIA Roles](#aria-roles)
  - [ARIA Attributes](#aria-attributes)
  - [Implementation Example](#implementation-example)
- [Keyboard Navigation](#keyboard-navigation)
  - [Supported Keyboard Shortcuts](#supported-keyboard-shortcuts)
  - [Focus Management](#focus-management)
  - [Keyboard Navigation Example](#keyboard-navigation-example)
  - [Enabling Print Keyboard Shortcut](#enabling-print-keyboard-shortcut)
- [Screen Reader Support](#screen-reader-support)
  - [Screen Reader Features](#screen-reader-features)
  - [Enhancing Screen Reader Experience](#enhancing-screen-reader-experience)
  - [Descriptive Series Names](#descriptive-series-names)
- [Color Contrast](#color-contrast)
  - [Contrast Requirements](#contrast-requirements)
  - [High-Contrast Configuration](#high-contrast-configuration)
  - [Colorblind-Friendly Palettes](#colorblind-friendly-palettes)
  - [Testing Contrast](#testing-contrast)
- [Mobile Device Support](#mobile-device-support)
  - [Touch Interaction](#touch-interaction)
  - [Mobile-Optimized Example](#mobile-optimized-example)
  - [Touch Target Size](#touch-target-size)
- [Implementation Guidelines](#implementation-guidelines)
  - [Complete Accessible Implementation](#complete-accessible-implementation)
- [Testing Accessibility](#testing-accessibility)
  - [Automated Testing Tools](#automated-testing-tools)
  - [Manual Testing Checklist](#manual-testing-checklist)
  - [Accessibility Sample](#accessibility-sample)
- [Best Practices](#best-practices)
  - [1. Provide Alternative Content](#1-provide-alternative-content)
  - [2. Use Semantic HTML](#2-use-semantic-html)
  - [3. Descriptive Labels](#3-descriptive-labels)
  - [4. High Contrast Mode Support](#4-high-contrast-mode-support)
  - [5. Reduced Motion Support](#5-reduced-motion-support)
  - [6. Focus Management](#6-focus-management)
  - [7. Error Handling](#7-error-handling)
- [Additional Resources](#additional-resources)

## Overview

The Syncfusion Smith Chart component follows accessibility guidelines to ensure usability for all users, including those with disabilities. The component supports screen readers, keyboard navigation, and meets international accessibility standards.

**Accessibility Goals:**
- Make charts usable by keyboard-only users
- Provide screen reader compatibility
- Ensure sufficient color contrast
- Support mobile accessibility features
- Comply with WCAG 2.2, Section 508, and ADA standards

## Accessibility Standards Compliance

The Smith Chart component follows multiple accessibility standards:

### WCAG 2.2 Compliance

**Level:** AA Support

The component meets WCAG 2.2 Level AA requirements including:
- Perceivable content
- Operable user interface
- Understandable information
- Robust implementation

### Section 508 Compliance

**Support:** Partial (Intermediate)

The component provides:
- Keyboard accessibility
- Screen reader compatibility
- Alternative text support
- Sufficient color contrast

**Note:** Some advanced interactive features may have limited Section 508 support.

### Compliance Summary Table

| Accessibility Criteria | Compatibility |
|------------------------|---------------|
| WCAG 2.2 Support | AA Level |
| Section 508 Support | Partial |
| Screen Reader Support | Partial |
| Color Contrast | Full |
| Mobile Device Support | Full |
| Keyboard Navigation Support | Partial |
| Accessibility Checker Validation | Full |

**Legend:**
- **Full** - All features meet requirements
- **Partial** - Some features meet requirements
- **Limited** - Minimal accessibility support

## WAI-ARIA Attributes

The Smith Chart uses WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications) attributes to enhance accessibility.

### ARIA Roles

**img (role)**
- Applied to the chart SVG element
- Identifies the chart as an image to assistive technologies

**region (role)**
- Applied to chart container areas
- Defines distinct regions within the chart

### ARIA Attributes

**aria-label (attribute)**
- Provides accessible names for chart elements
- Used for series, markers, and interactive elements

**Example:**
```html
<svg role="img" aria-label="Smith Chart showing transmission line impedance">
    <!-- Chart content -->
</svg>
```

**aria-hidden (attribute)**
- Hides decorative elements from screen readers
- Applied to non-essential visual elements

### Implementation Example

The Smith Chart automatically applies ARIA attributes:

```cshtml
@Html.EJS().Smithchart("accessibleChart")
    .Title(t => t.Text("Antenna Impedance Measurement"))
    .Series(series =>
    {
        series.Points(ViewBag.Data)
              .Name("Measured Impedance")  // Used for aria-label
              .Add();
    })
    .Render()
```

**Rendered output includes:**
- `role="img"` on SVG element
- `aria-label="Measured Impedance"` on series
- `aria-hidden="true"` on decorative gridlines

## Keyboard Navigation

The Smith Chart supports keyboard interaction for users who cannot use a mouse.

### Supported Keyboard Shortcuts

| Key Combination | Action |
|-----------------|--------|
| <kbd>Tab</kbd> | Move focus to next element in chart |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Move focus to previous element |
| <kbd>Ctrl</kbd> + <kbd>P</kbd> | Print the Smith Chart |

### Focus Management

**Focusable Elements:**
- Legend items (when toggle visibility enabled)
- Interactive markers
- Chart container

**Focus Indicators:**
- Visual outline on focused elements
- High-contrast focus styles
- Clear indication of current focus

### Keyboard Navigation Example

```cshtml
@Html.EJS().Smithchart("keyboardChart")
    .Width("900px")
    .Height("700px")
    .Title(t => t.Text("Keyboard-Accessible Smith Chart"))
    .Series(series =>
    {
        series.Points(ViewBag.Series1).Name("Configuration A").Add();
        series.Points(ViewBag.Series2).Name("Configuration B").Add();
        series.Points(ViewBag.Series3).Name("Configuration C").Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .ToggleVisibility(true))  // Enables keyboard interaction with legend
    .Render()

<div style="margin-top: 15px; padding: 10px; background: #f8f9fa;">
    <h4>Keyboard Instructions:</h4>
    <ul>
        <li>Press <kbd>Tab</kbd> to navigate through legend items</li>
        <li>Press <kbd>Enter</kbd> or <kbd>Space</kbd> to toggle series visibility</li>
        <li>Press <kbd>Ctrl + P</kbd> to print the chart</li>
    </ul>
</div>
```

### Enabling Print Keyboard Shortcut

```html
<script>
    document.addEventListener('keydown', function(event) {
        // Ctrl+P shortcut for print
        if (event.ctrlKey && event.key === 'p') {
            event.preventDefault();
            var chart = document.getElementById('keyboardChart').ej2_instances[0];
            if (chart) {
                chart.print();
            }
        }
    });
</script>
```

## Screen Reader Support

**Support Level:** Partial (Intermediate)

The Smith Chart provides basic screen reader compatibility through ARIA attributes.

### Screen Reader Features

**Announced Content:**
- Chart title and subtitle
- Series names
- Legend items
- Interactive element states

**Not Announced:**
- Individual data point values (limitation)
- Gridline details
- Axis labels (limitation)

### Enhancing Screen Reader Experience

Provide alternative text descriptions and data tables for comprehensive accessibility:

```cshtml
@Html.EJS().Smithchart("accessibleChart")
    .Title(t => t.Text("Antenna Impedance: 2.4-2.5 GHz"))
    .Series(series =>
    {
        series.Points(ViewBag.ImpedanceData)
              .Name("Measured S11 Parameters")
              .Add();
    })
    .Render()

<!-- Screen reader accessible description -->
<div class="sr-only" aria-live="polite">
    Smith Chart showing antenna impedance measurements from 2.4 to 2.5 GHz.
    The chart contains @ViewBag.ImpedanceData.Length data points 
    representing resistance and reactance values.
</div>

<!-- Accessible data table alternative -->
<details style="margin-top: 20px;">
    <summary>View Data Table (Screen Reader Accessible)</summary>
    <table class="table table-striped" role="table" aria-label="Impedance measurement data">
        <caption>Antenna Impedance Measurements</caption>
        <thead>
            <tr>
                <th scope="col">Point #</th>
                <th scope="col">Resistance (normalized)</th>
                <th scope="col">Reactance (normalized)</th>
                <th scope="col">Frequency</th>
            </tr>
        </thead>
        <tbody>
            @for (int i = 0; i < ViewBag.ImpedanceData.Length; i++)
            {
                var point = ViewBag.ImpedanceData[i];
                <tr>
                    <td>@(i + 1)</td>
                    <td>@point.resistance</td>
                    <td>@point.reactance</td>
                    <td>@(2.4 + i * 0.02) GHz</td>
                </tr>
            }
        </tbody>
    </table>
</details>

<style>
    /* Screen reader only class */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
</style>
```

### Descriptive Series Names

Use clear, descriptive series names for screen reader users:

**❌ Poor:**
```cshtml
.Name("Series1")
.Name("Data")
.Name("Line")
```

**✅ Good:**
```cshtml
.Name("50 Ohm Transmission Line Impedance")
.Name("Antenna Input Impedance at 2.4 GHz")
.Name("Filter Response: Butterworth 5th Order")
```

## Color Contrast

**Support Level:** Full

The Smith Chart meets WCAG 2.2 color contrast requirements when properly configured.

### Contrast Requirements

**WCAG 2.2 Standards:**
- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text (18pt+):** Minimum 3:1 contrast ratio
- **Graphical objects:** Minimum 3:1 contrast ratio

### High-Contrast Configuration

**Example: Accessible Color Scheme**

```cshtml
@Html.EJS().Smithchart("highContrastChart")
    .Width("900px")
    .Height("700px")
    .Background("#ffffff")  // White background
    .Title(t => t
        .Text("High-Contrast Smith Chart")
        .TextStyle(new { color = "#000000" }))  // Black text (21:1 ratio)
    .HorizontalAxis(h => h
        .LabelStyle(ls => ls.Color("#000000"))  // Black labels
        .MajorGridLines(mg => mg.Opacity(0.8)))
    .RadialAxis(r => r
        .LabelStyle(ls => ls.Color("#000000"))
        .MajorGridLines(mg => mg.Opacity(0.8)))
    .Series(series =>
    {
        series.Name("Primary Data")
              .Fill("#0000FF")  // Blue (8.6:1 ratio)
              .Width(3)
              .Marker(m => m
                  .Visible(true)
                  .Fill("#0000FF")
                  .Border(b => b.Width(2).Color("#ffffff")))
              .Points(ViewBag.Data1)
              .Add();
        
        series.Name("Secondary Data")
              .Fill("#FF0000")  // Red (5.3:1 ratio)
              .Width(3)
              .Marker(m => m
                  .Visible(true)
                  .Shape(Syncfusion.EJ2.Charts.Shape.Diamond)
                  .Fill("#FF0000")
                  .Border(b => b.Width(2).Color("#ffffff")))
              .Points(ViewBag.Data2)              
              .Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .TextStyle(new { color = "#000000" }))
    .Render()
```

### Colorblind-Friendly Palettes

**Use distinct colors that work for colorblind users:**

```csharp
// Controller: Define colorblind-safe palette
public ActionResult ColorblindFriendly()
{
    ViewBag.SafeColors = new[]
    {
        "#0173B2",  // Blue
        "#DE8F05",  // Orange
        "#029E73",  // Green
        "#CC78BC",  // Purple
        "#CA9161",  // Brown
        "#949494"   // Gray
    };
    
    // Data...
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("colorblindChart")
    .Series(series =>
    {
        series.Points(ViewBag.Data1).Name("Series A").Fill("#0173B2").Add();
        series.Points(ViewBag.Data2).Name("Series B").Fill("#DE8F05").Add();
        series.Points(ViewBag.Data3).Name("Series C").Fill("#029E73").Add();
    })
    .Render()
```

### Testing Contrast

**Tools for testing:**
- Chrome DevTools Accessibility Audit
- WAVE Browser Extension
- WebAIM Contrast Checker
- Accessibility Insights

## Mobile Device Support

**Support Level:** Full

The Smith Chart provides complete mobile device accessibility.

### Touch Interaction

**Supported Gestures:**
- **Tap** - Activate tooltips, interact with legend
- **Pinch-to-zoom** - Zoom chart (if enabled)
- **Swipe** - Scroll page containing chart
- **Long press** - Context menu (browser dependent)

### Mobile-Optimized Example

```cshtml
@{
    bool isMobile = Request.Browser.IsMobileDevice;
}

@Html.EJS().Smithchart("mobileChart")
    .Width(isMobile ? "100%" : "900px")
    .Height(isMobile ? "500px" : "700px")
    .Title(t => t
        .Text("Mobile-Accessible Chart")
        .TextStyle(new { size = isMobile ? "16px" : "18px" }))
    .Series(series =>
    {
        series.Marker(m => m
                  .Visible(true)
                  .Width(isMobile ? 12 : 10)     // Larger markers for touch
                  .Height(isMobile ? 12 : 10))
              .Points(ViewBag.Data)
              .Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .ItemPadding(isMobile ? 20 : 15))  // More spacing for touch
    .Render()
```

### Touch Target Size

**WCAG guideline:** Minimum 44×44px touch targets

```cshtml
.Marker(m => m
    .Width(12)      // Marker size
    .Height(12)
    // Touch area automatically expanded by browser to ~44px
)

.LegendSettings(legend => legend
    .ItemPadding(20)  // Adequate spacing for touch
    .ShapePadding(10))
```

## Implementation Guidelines

### Complete Accessible Implementation

**Controller:**
```csharp
public class AccessibleChartController : Controller
{
    public ActionResult Index()
    {
        ViewBag.ImpedanceData = new[]
        {
            new { resistance = 0.85, reactance = 0.15, frequency = 2.40 },
            new { resistance = 0.90, reactance = 0.10, frequency = 2.42 },
            new { resistance = 0.95, reactance = 0.05, frequency = 2.44 },
            new { resistance = 1.00, reactance = 0.02, frequency = 2.46 },
            new { resistance = 1.05, reactance = 0.06, frequency = 2.48 },
            new { resistance = 1.10, reactance = 0.12, frequency = 2.50 }
        };
        
        return View();
    }
}
```

**View:**
```cshtml
@{
    ViewBag.Title = "Accessible Smith Chart Example";
}

<main role="main" class="container" style="margin-top: 30px;">
    <header>
        <h1>Antenna Impedance Analysis</h1>
        <p>Interactive Smith Chart with full accessibility support</p>
    </header>
    
    <section aria-labelledby="chart-section">
        <h2 id="chart-section">Impedance Measurements</h2>
        
        @Html.EJS().Smithchart("accessibleSmithChart")
            .Width("900px")
            .Height("700px")
            .Background("#ffffff")
            .Title(t => t
                .Text("Antenna S11: 2.4-2.5 GHz")
                .TextStyle(new {
                    size = "18px",
                    color = "#000000",
                    fontWeight = "bold"}))
            .HorizontalAxis(h => h
                .LabelStyle(ls => ls.Color("#000000").Size("12px")))
            .RadialAxis(r => r
                .LabelStyle(ls => ls.Color("#000000").Size("12px")))
            .Series(series =>
            {
                series.Name("Measured Antenna Impedance")
                      .Fill("#0173B2")
                      .Width(3)
                      .Marker(m => m
                          .Visible(true)
                          .Width(12)
                          .Height(12)
                          .Fill("#0173B2")
                          .Border(b => b.Width(2).Color("#ffffff")))
                      .Points(ViewBag.ImpedanceData)
                      .Add();
            })
            .LegendSettings(legend => legend
                .Visible(true)
                .Position("Bottom")
                .ToggleVisibility(true)
                .TextStyle(new { color = "#000000"}))
            .Render()
    </section>
    
    <!-- Keyboard instructions -->
    <aside aria-label="Keyboard shortcuts" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
        <h3>Keyboard Navigation</h3>
        <ul>
            <li><kbd>Tab</kbd> / <kbd>Shift+Tab</kbd> - Navigate through interactive elements</li>
            <li><kbd>Enter</kbd> / <kbd>Space</kbd> - Toggle series visibility in legend</li>
            <li><kbd>Ctrl+P</kbd> - Print chart</li>
        </ul>
    </aside>
    
    <!-- Accessible data table -->
    <details style="margin-top: 20px;">
        <summary><strong>View Accessible Data Table</strong></summary>
        <table class="table table-bordered" role="table" aria-label="Antenna impedance measurement data">
            <caption>Detailed impedance measurements from 2.4 to 2.5 GHz</caption>
            <thead>
                <tr>
                    <th scope="col">Measurement #</th>
                    <th scope="col">Frequency (GHz)</th>
                    <th scope="col">Resistance (normalized)</th>
                    <th scope="col">Reactance (normalized)</th>
                    <th scope="col">VSWR</th>
                </tr>
            </thead>
            <tbody>
                @for (int i = 0; i < ViewBag.ImpedanceData.Length; i++)
                {
                    var point = ViewBag.ImpedanceData[i];
                    var vswr = (1 + Math.Sqrt(Math.Pow(point.resistance - 1, 2) + Math.Pow(point.reactance, 2))) /
                               (1 - Math.Sqrt(Math.Pow(point.resistance - 1, 2) + Math.Pow(point.reactance, 2)));
                    <tr>
                        <td>@(i + 1)</td>
                        <td>@point.frequency</td>
                        <td>@point.resistance</td>
                        <td>@point.reactance</td>
                        <td>@vswr.ToString("F2")</td>
                    </tr>
                }
            </tbody>
        </table>
    </details>
</main>

<script>
    // Enable Ctrl+P print shortcut
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'p') {
            event.preventDefault();
            var chart = document.getElementById('accessibleSmithChart').ej2_instances[0];
            if (chart) {
                chart.print();
            }
        }
    });
</script>
```

## Testing Accessibility

### Automated Testing Tools

**1. Accessibility Checker (npm package)**
```bash
npm install accessibility-checker
```

**2. axe-core**
```bash
npm install axe-core
```

**3. Browser Tools**
- Chrome DevTools Lighthouse
- Firefox Accessibility Inspector
- Edge Accessibility Insights

### Manual Testing Checklist

**Visual Testing:**
- [ ] Sufficient color contrast (use contrast checker)
- [ ] Visible focus indicators on interactive elements
- [ ] Text remains readable when zoomed to 200%
- [ ] Chart scales properly on different screen sizes

**Keyboard Testing:**
- [ ] All interactive elements reachable via Tab key
- [ ] Focus order is logical
- [ ] Enter/Space activates interactive elements
- [ ] No keyboard traps

**Screen Reader Testing:**
- [ ] Chart title announced correctly
- [ ] Series names announced
- [ ] Legend items identified
- [ ] Alternative text provided for complex data

**Mobile Testing:**
- [ ] Touch targets minimum 44×44px
- [ ] Pinch-to-zoom works (if enabled)
- [ ] Tooltips activate on tap
- [ ] No horizontal scrolling required

### Accessibility Sample

View live accessibility demonstration:
- [Syncfusion Smith Chart Accessibility Sample](https://ej2.syncfusion.com/accessibility/smith-chart.html)

## Best Practices

### 1. Provide Alternative Content

Always offer tabular data as alternative:

```cshtml
<figure>
    @Html.EJS().Smithchart("chart").Series(series => series.Points(ViewBag.Data).Add()).Render()
    <figcaption>
        <details>
            <summary>View data table</summary>
            <table><!-- Data table --></table>
        </details>
    </figcaption>
</figure>
```

### 2. Use Semantic HTML

```html
<main>
    <section aria-labelledby="analysis">
        <h2 id="analysis">Circuit Analysis</h2>
        <!-- Chart here -->
    </section>
</main>
```

### 3. Descriptive Labels

**Use clear, descriptive text:**
- Chart titles
- Series names
- Legend labels
- Axis descriptions

### 4. High Contrast Mode Support

Test with Windows High Contrast Mode or similar:

```cshtml
/* Add high contrast media query support */
<style>
    @media (prefers-contrast: high) {
        /* High contrast styles */
        .smithchart {
            border: 2px solid currentColor;
        }
    }
</style>
```

### 5. Reduced Motion Support

Respect user preferences for reduced motion:

```cshtml
<style>
    @media (prefers-reduced-motion: reduce) {
        /* Disable animations for users who prefer reduced motion */
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
</style>
```

### 6. Focus Management

Ensure visible focus indicators:

```css
.e-smithchart .e-legend-item:focus,
.e-smithchart [tabindex]:focus {
    outline: 2px solid #0078D4;
    outline-offset: 2px;
}
```

### 7. Error Handling

Provide accessible error messages:

```cshtml
@if (ViewBag.DataError != null)
{
    <div role="alert" class="alert alert-danger">
        <strong>Error:</strong> @ViewBag.DataError
    </div>
}
```

## Additional Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [Section 508 Standards](https://www.section508.gov/)
- [Syncfusion Accessibility Documentation](../common/accessibility)
- [WebAIM Resources](https://webaim.org/)
- [A11Y Project](https://www.a11yproject.com/)

**Remember:** Accessibility is an ongoing process. Regularly test with real users who rely on assistive technologies for the best results.
