# Localization, Accessibility, and Sizing

## Table of Contents
- [Localization](#localization)
  - [Overview](#overview)
  - [Setting Locale](#setting-locale)
  - [Common Locales](#common-locales)
  - [Locale-Specific Tooltip Formatting](#locale-specific-tooltip-formatting)
  - [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Accessibility Standards](#accessibility-standards)
  - [Compliance Standards](#compliance-standards)
  - [ARIA Attributes](#aria-attributes)
  - [Adding Descriptive Labels](#adding-descriptive-labels)
  - [Keyboard Navigation](#keyboard-navigation)
  - [Screen Reader Support](#screen-reader-support)
  - [Accessible Implementation Example](#accessible-implementation-example)
- [Sizing and Responsive Layout](#sizing-and-responsive-layout)
  - [Sparkline Dimensions](#sparkline-dimensions)
  - [Pixel-Based Sizing](#pixel-based-sizing)
  - [Percentage-Based Sizing](#percentage-based-sizing)
  - [Container-Based Sizing](#container-based-sizing)
  - [Common Size Configurations](#common-size-configurations)
  - [Responsive Design with CSS](#responsive-design-with-css)
  - [Grid Integration Sizing](#grid-integration-sizing)
- [Best Practices](#best-practices)
  - [Localization Best Practices](#localization-best-practices)
  - [Accessibility Best Practices](#accessibility-best-practices)
  - [Sizing Best Practices](#sizing-best-practices)
  - [Complete Accessible, Localized, and Responsive Example](#complete-accessible-localized-and-responsive-example)

## Localization

### Overview

Localization allows sparklines to display content in different languages and cultures. This includes tooltip formatting, number formatting, and date representations.

### Setting Locale

Configure the culture/locale for number and date formatting:

```csharp
// Controller
public class LocalizationData
{
    public string Month { get; set; }
    public double Sales { get; set; }
}
```

```cshtml
<!-- English (US) locale -->
@Html.EJS().Sparkline("usChart")
    .XName("Month")
    .YName("Sales")
    .Locale("en-US")
    .TooltipSettings(ts => ts
        .Visible(true)
        .Format("${xval}: ${yval}")
    )
    .DataSource(Model)
    .Render()
```

### Common Locales

| Locale | Region | Format Example |
|--------|--------|----------------|
| `en-US` | United States | 1,234.56 |
| `de-DE` | Germany | 1.234,56 |
| `fr-FR` | France | 1 234,56 |
| `en-GB` | United Kingdom | 1,234.56 |
| `ja-JP` | Japan | 1,234.56 |
| `es-ES` | Spain | 1.234,56 |
| `pt-BR` | Brazil | 1.234,56 |
| `ar-SA` | Saudi Arabia (RTL) | 1,234.56 |

### Locale-Specific Tooltip Formatting

Tooltips automatically adjust number formatting based on locale:

```cshtml
<!-- German locale: uses comma as decimal separator -->
@Html.EJS().Sparkline("deChart")
    .XName("Month")
    .YName("Amount")
    .Locale("de-DE")
    .TooltipSettings(ts => ts
        .Visible(true)
        .Format("${xval}: ${yval}€")  // Displays as "Januar: 1.234,56€"
    )
    .DataSource(Model)
    .Render()

<!-- French locale: uses space as thousands separator -->
@Html.EJS().Sparkline("frChart")
    .XName("Month")
    .YName("Amount")
    .Locale("fr-FR")
    .TooltipSettings(ts => ts
        .Visible(true)
        .Format("${xval}: ${yval}€")  // Displays as "Janvier: 1 234,56€"
    )
    .DataSource(Model)
    .Render()
```

### Right-to-Left (RTL) Support

Some cultures require RTL text direction:

```cshtml
<!-- Arabic locale with RTL support -->
@Html.EJS().Sparkline("arChart")
    .XName("شهر")  // Arabic month
    .YName("مبيعات")  // Arabic sales
    .Locale("ar-SA")
    .EnableRtl(true)
    .TooltipSettings(ts => ts
        .Visible(true)
        .Format("${xval}: ${yval}"
    )
    .DataSource(Model)
    .Render()
```

## Accessibility Standards

### Compliance Standards

The Sparkline component complies with multiple accessibility standards:

| Standard | Level | Support |
|----------|-------|---------|
| **WCAG 2.2** | AA | ✓ Full support |
| **Section 508** | - | ✓ Partial support |
| **Screen Readers** | - | ✓ Partial support |
| **Keyboard Navigation** | - | ✓ Partial support |
| **Right-to-Left (RTL)** | - | ✓ Full support |
| **Color Contrast** | WCAG AA | ✓ Full support |
| **Mobile Devices** | - | ✓ Full support |

### ARIA Attributes

The sparkline component uses standard ARIA attributes for accessibility:

| ARIA Attribute | Purpose | Example |
|---|---|---|
| **img** | Identifies chart as an image | Assistive technology recognition |
| **aria-label** | Descriptive label | Identifies chart purpose |
| **aria-hidden** | Hides decorative elements | Prevents clutter for screen readers |

### Adding Descriptive Labels

Always provide context for sparklines:

```cshtml
<!-- Descriptive ARIA label -->
@Html.EJS().Sparkline("accessibleChart")
    .XName("Month")
    .YName("Revenue")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .TooltipSettings(ts => ts
        .Visible(true)
        .Format("${xval}: $${yval}K")
    )
    .DataSource(Model)
    .Render()
```

### Keyboard Navigation

Supported keyboard shortcuts:

| Keyboard | Action |
|----------|--------|
| **Ctrl + P** | Print sparkline |
| **Tab** | Navigate to sparkline (when interactive) |
| **Enter** | Activate/interact (if applicable) |

### Screen Reader Support

Best practices for screen reader users:

1. **Provide Context**: Surround sparklines with descriptive text
2. **Use ARIA Labels**: Include meaningful descriptions
3. **Show Data**: Provide numeric data table as alternative
4. **Use Meaningful Colors**: Don't rely solely on color

### Accessible Implementation Example

```cshtml
<div role="region" aria-label="Sales Performance">
    <h3>Monthly Sales Trend</h3>
    
    <!-- Sparkline visualization -->
    @Html.EJS().Sparkline("accessibleSparkline")
        .XName("Month")
        .YName("Sales")
        .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
        .DataLabelSettings(dl => dl
            .Visible(new string[] { "High", "Low" })
            .Format("$${yval}K")
        )
        .TooltipSettings(ts => ts
            .Visible(true)
            .Format("${xval}: $${yval}K")
        )
        .DataSource(Model)
        .Render()
    
    <!-- Alternative data table for accessibility -->
    <table role="table" aria-label="Sales data for accessibility">
        <thead>
            <tr>
                <th>Month</th>
                <th>Sales</th>
            </tr>
        </thead>
        <tbody>
            @foreach(var item in Model)
            {
                <tr>
                    <td>@item.Month</td>
                    <td>$@item.Sales.ToString("N0")K</td>
                </tr>
            }
        </tbody>
    </table>
</div>
```

## Sizing and Responsive Layout

### Sparkline Dimensions

Set sparkline width and height in multiple ways:

### Pixel-Based Sizing

Specify exact dimensions:

```cshtml
@Html.EJS().Sparkline("fixedSizeChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .Width("150")      // 150 pixels
    .Height("80")      // 80 pixels
    .DataSource(Model)
    .Render()
```

### Percentage-Based Sizing

Size relative to container:

```cshtml
<div style="width: 300px; height: 200px;">
    @Html.EJS().Sparkline("responsiveChart")
        .XName("xval")
        .YName("yval")
        .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
        .Width("100%")       // Full container width
        .Height("100%")      // Full container height
        .DataSource(Model)
        .Render()
</div>
```

### Container-Based Sizing

Let sparkline adapt to container dimensions:

```cshtml
<div class="sparkline-container">
    @Html.EJS().Sparkline("containerChart")
        .XName("xval")
        .YName("yval")
        .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
        .DataSource(Model)
        .Render()
</div>

<style>
    .sparkline-container {
        width: 100%;      /* Adapts to parent width */
        height: 150px;    /* Fixed height */
    }
</style>
```

### Common Size Configurations

| Use Case | Width | Height | Notes |
|----------|-------|--------|-------|
| Dashboard Tile | 100% | 120px | Compact, readable |
| Table Column | 80px | 60px | Very compact |
| Inline Report | 200px | 100px | Moderate detail |
| Standalone Chart | 400px | 250px | Large with details |

### Responsive Design with CSS

Create responsive sparklines that adapt to screen size:

```html
<style>
    @media (max-width: 768px) {
        .sparkline-container {
            height: 80px;     /* Smaller on mobile */
        }
    }
    
    @media (min-width: 1200px) {
        .sparkline-container {
            height: 150px;    /* Larger on desktop */
        }
    }
</style>

<div class="sparkline-container">
    @Html.EJS().Sparkline("responsiveChart")
        .XName("xval")
        .YName("yval")
        .Width("100%")
        .Height("100px")
        .DataSource(Model)
        .Render()
</div>
```

### Grid Integration Sizing

Sparklines embedded in data tables:

```cshtml
<!-- Sparkline in table cell -->
<table class="data-table">
    <tr>
        <td>Product A</td>
        <td>
            @Html.EJS().Sparkline("gridSparkline1")
                .XName("Month")
                .YName("Sales")
                .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
                .Width("100")      <!-- Small, fixed size for tables -->
                .Height("50")
                .DataSource(productAData)
                .Render()
        </td>
        <td>$50,000</td>
    </tr>
</table>
```

## Best Practices

### Localization Best Practices

1. **Test with Real Data**: Verify formatting with actual localized numbers
2. **Consider Context**: Some locales have specific number/date conventions
3. **Document Locales**: Inform users which locales are supported
4. **Include Fallback**: Default to en-US if locale unavailable
5. **Currency Symbols**: Include in format strings for clarity

### Accessibility Best Practices

1. **Always Include Labels**: Use ARIA labels and surrounding text
2. **Provide Alternatives**: Offer data tables or numeric display alongside sparklines
3. **Test with Screen Readers**: Verify readability with NVDA, JAWS, etc.
4. **Sufficient Contrast**: Ensure colors meet WCAG AA standards
5. **Keyboard Access**: Ensure all interactive features work with keyboard
6. **Size Appropriately**: Large enough to read but compact when needed
7. **Meaningful Colors**: Use colors that make sense (green=good, red=bad)
8. **Documentation**: Provide usage instructions for complex sparklines

### Sizing Best Practices

1. **Match Context**: Size should match its purpose (compact for dashboard, larger for reports)
2. **Maintain Readability**: Don't make too small; ensure legibility
3. **Test Responsiveness**: Verify appearance on all target devices
4. **Consistent Proportions**: Use consistent width-to-height ratios
5. **Performance**: Very large sparklines may impact rendering
6. **Scaling Fonts**: Use relative sizing for responsive text
7. **Margins**: Include appropriate padding around sparklines
8. **Mobile Testing**: Test touch interaction on mobile devices

### Complete Accessible, Localized, and Responsive Example

```cshtml
<div class="sparkline-section">
    <div role="region" aria-label="Sales Performance Dashboard">
        <h2>Monthly Sales Trend</h2>
        
        <div class="sparkline-container">
            @Html.EJS().Sparkline("completeSparline")
                .XName("Month")
                .YName("Sales")
                .Type(Syncfusion.EJ2.Charts.SparklineType.Area)
                .Locale("en-US")              <!-- Localization -->
                .Width("100%")                <!-- Responsive sizing -->
                .Height("120")
                .Fill("rgba(33, 150, 243, 0.5)")
                .TooltipSettings(ts => ts
                    .Visible(true)
                    .Format("${xval}: $${yval}K")
                )
                .DataLabelSettings(dl => dl
                    .Visible(new string[] { "High", "Low" })
                    .Format("$${yval}K")
                )
                .DataSource(Model)
                .Render()
        </div>
        
        <!-- Alternative data for accessibility -->
        <details>
            <summary>View as Data Table</summary>
            <table>
                <thead>
                    <tr><th>Month</th><th>Sales</th></tr>
                </thead>
                <tbody>
                    @foreach(var item in Model) {
                        <tr><td>@item.Month</td><td>$@item.Sales.ToString("N0")K</td></tr>
                    }
                </tbody>
            </table>
        </details>
    </div>
</div>

<style>
    .sparkline-container {
        width: 100%;
    }
    
    @media (max-width: 768px) {
        .sparkline-container {
            height: 80px;
        }
    }
    
    @media (min-width: 1200px) {
        .sparkline-container {
            height: 150px;
        }
    }
</style>
```
