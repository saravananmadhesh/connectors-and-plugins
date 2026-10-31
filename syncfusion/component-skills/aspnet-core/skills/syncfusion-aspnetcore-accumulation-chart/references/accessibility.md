# Accessibility

This guide covers implementing accessibility features in Syncfusion ASP.NET Core Accumulation Charts to ensure WCAG 2.2 compliance and support for users with disabilities.

## Table of Contents

- [Accessibility Standards](#accessibility-standards)
- [Keyboard Navigation](#keyboard-navigation)
  - [Supported Keyboard Shortcuts](#supported-keyboard-shortcuts)
  - [Example: Keyboard Navigation](#example-keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
  - [ARIA Roles Used](#aria-roles-used)
  - [ARIA Attributes Used](#aria-attributes-used)
  - [Automatic ARIA Support](#automatic-aria-support)
- [Basic Accessible Chart Setup](#basic-accessible-chart-setup)
  - [Minimal Accessible Chart](#minimal-accessible-chart)
- [Chart Accessibility Configuration](#chart-accessibility-configuration)
  - [AccumulationChart Accessibility Properties](#accumulationchart-accessibility-properties)
  - [Accessibility Properties Reference](#accessibility-properties-reference)
- [Series Accessibility Configuration](#series-accessibility-configuration)
  - [Series-Level Accessibility](#series-level-accessibility)
- [Legend Accessibility Configuration](#legend-accessibility-configuration)
  - [Legend with Accessibility](#legend-with-accessibility)
- [Screen Reader Support](#screen-reader-support)
  - [Screen Reader-Friendly Setup](#screen-reader-friendly-setup)
- [Focus Management](#focus-management)
  - [Custom Focus Configuration](#custom-focus-configuration)
  - [Focus Border Customization](#focus-border-customization)
- [Color Contrast and Themes](#color-contrast-and-themes)
  - [High Contrast Theme](#high-contrast-theme)
  - [Available Accessible Themes](#available-accessible-themes)
  - [Custom Color Palette for Accessibility](#custom-color-palette-for-accessibility)
- [Testing Accessibility](#testing-accessibility)
  - [Automated Testing](#automated-testing)
  - [Manual Testing Checklist](#manual-testing-checklist)
  - [Chrome DevTools Lighthouse Audit](#chrome-devtools-lighthouse-audit)
  - [Keyboard Navigation Testing](#keyboard-navigation-testing)
- [Troubleshooting](#troubleshooting)
  - [Common Accessibility Issues and Solutions](#common-accessibility-issues-and-solutions)
- [Accessibility Resources](#accessibility-resources)
- [Summary](#summary)

## Accessibility Standards

The Accumulation Chart component meets multiple accessibility standards:

| Standard | Support Level | Details |
|----------|---|----------|
| **WCAG 2.2** | Level AA | Web Content Accessibility Guidelines Level AA compliant |
| **Section 508** | Full | US federal accessibility standard |
| **ADA** | Compliant | Americans with Disabilities Act accessibility requirements |
| **Screen Reader Support** | Full | NVDA, JAWS, and other screen readers supported |
| **Keyboard Navigation** | Full | Complete keyboard-only operation support |
| **RTL Support** | Full | Right-to-left language support included |
| **Color Contrast** | Full | WCAG AA color contrast ratio compliance |
| **Mobile Device Support** | Full | Touch and mobile accessibility |

**Key Compliance Tools:**
- accessibility-checker: Automated accessibility validation
- axe-core: Automated accessibility testing
- Chrome DevTools: Lighthouse accessibility audit

## Keyboard Navigation

Navigate and interact with charts entirely using keyboard shortcuts.

### Supported Keyboard Shortcuts

| Keyboard Shortcut | Action | When Active |
|-------------------|--------|-----------|
| **Alt + J** | Focus accumulation chart element | From any page element |
| **Tab** | Move focus to next element | Within chart |
| **Shift + Tab** | Move focus to previous element | Within chart |
| **Down Arrow** | Focus to left data point | When focused on point |
| **Up Arrow** | Focus to right data point | When focused on point |
| **Left Arrow** | Focus to legend left | When focused on legend |
| **Right Arrow** | Focus to legend right | When focused on legend |
| **Enter / Space** | Toggle series visibility | When legend is focused |
| **Ctrl + P** | Print the chart | When chart is active |

### Example: Keyboard Navigation

```cshtml
@{
    List<AccessibleChartData> chartData = new List<AccessibleChartData>
    {
        new AccessibleChartData { Category = "Product A", Value = 35 },
        new AccessibleChartData { Category = "Product B", Value = 28 },
        new AccessibleChartData { Category = "Product C", Value = 22 },
        new AccessibleChartData { Category = "Product D", Value = 15 }
    };
}

<div>
    <h2>Keyboard Navigable Chart</h2>
    
    <!-- This chart supports full keyboard navigation -->
    <ejs-accumulationchart id="keyboardChart" title="Product Distribution">
        <e-accumulation-series-collection>
            <e-accumulation-series dataSource="@chartData" 
                                  xName="Category" 
                                  yName="Value"
                                  type="Pie">
                <e-accumulationseries-datalabel visible="true" position="Outside">
                </e-accumulationseries-datalabel>
            </e-accumulation-series>
        </e-accumulation-series-collection>
        <e-accumulationchart-legendsettings visible="true" position="Bottom">
        </e-accumulationchart-legendsettings>
    </ejs-accumulationchart>
    
    <p><strong>Instructions:</strong> Press Use Alt+J to focus the chart, then use arrow keys to navigate.</p>
</div>
```

**Testing Keyboard Navigation:**
1. Press Alt+J to focus the chart (visual focus indicator appears)
2. Press Tab to move through chart elements (data points, legend, tooltips)
3. Use arrow keys to navigate data points
4. Press Enter/Space to interact (toggle series, expand details)
5. Press Ctrl+P to print

## ARIA Attributes

The component uses WAI-ARIA attributes to communicate with assistive technologies.

### ARIA Roles Used

| Role | Element | Purpose |
|------|---------|---------|
| `img` | Chart container | Identifies chart as a graphical image |
| `button` | Legend items | Identifies legend items as interactive controls |
| `region` | Chart area | Identifies chart region for screen readers |

### ARIA Attributes Used

| Attribute | Used For | Example |
|-----------|----------|---------|
| `aria-label` | Element descriptive text | `aria-label="Browser market share pie chart"` |
| `aria-hidden` | Hide decorative elements | `aria-hidden="true"` for visual dividers |
| `aria-pressed` | Toggle state of legend | `aria-pressed="true"` when series visible |

### Automatic ARIA Support

The component automatically applies ARIA attributes based on configuration:

```cshtml
<ejs-accumulationchart id="ariaChart" 
                       title="Market Share Analysis"
                       description="This pie chart shows browser market share distribution">
    <!-- Automatically gets:
         - aria-label: "Market Share Analysis"
         - role: "img"
         - aria-describedby: description content
    -->
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

## Basic Accessible Chart Setup

Create a chart with accessibility enabled by default.

### Minimal Accessible Chart

```cshtml
@{
    List<SalesData> sales = new List<SalesData>
    {
        new SalesData { Region = "North", Sales = 45 },
        new SalesData { Region = "South", Sales = 38 },
        new SalesData { Region = "East", Sales = 22 },
        new SalesData { Region = "West", Sales = 15 }
    };
}

<!-- Accessible pie chart with legend for screen reader users -->
<ejs-accumulationchart id="accessibleChart" 
                       title="Regional Sales Distribution"
                       description="Pie chart showing sales distribution across four regions">
    
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@sales" 
                              xName="Region" 
                              yName="Sales"
                              type="Pie">
            <!-- Data labels help all users understand values -->
            <e-accumulationseries-datalabel visible="true" 
                                          position="Outside" 
                                          name="text">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
    
    <!-- Legend provides accessible data reference -->
    <e-accumulationchart-legendsettings visible="true" position="Bottom">
    </e-accumulationchart-legendsettings>
    
    <!-- Tooltips provide additional context on hover/focus -->
    <e-accumulationchart-tooltipsettings enable="true" 
                                        format="${point.x}: ${point.y}%">
    </e-accumulationchart-tooltipsettings>
</ejs-accumulationchart>

@Html.Hidden("screenReaderText", "Use Alt+J to focus the chart. Use arrow keys to navigate data points. Press Enter to activate legend items.")
```

```csharp
public class SalesData
{
    public string Region { get; set; }
    public double Sales { get; set; }
}
```

**Why this is accessible:**
- `title` + `description` give context to screen readers
- Data labels make values visible to all users
- Legend provides accessible alternative to visual inference
- Tooltips provide supplementary information
- Default keyboard navigation support enabled

## Chart Accessibility Configuration

Customize accessibility properties at the chart level.

### AccumulationChart Accessibility Properties

```cshtml
<ejs-accumulationchart id="configuredChart"
                       title="Company Revenue Analysis"
                       focusBorderColor="#0078d4"
                       focusBorderWidth="2"
                       focusBorderMargin="5">
    
    <e-accumulationchart-accessibility 
        accessibilityDescription="Annual revenue breakdown by business unit. Navigate using keyboard arrow keys."
        accessibilityRole="img"
        focusable="true"
        tabIndex="0">
    </e-accumulationchart-accessibility>
    
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Unit" 
                              yName="Revenue">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Accessibility Properties Reference

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `AccessibilityDescription` | string | Text description for screen readers | `"Sales by region chart"` |
| `AccessibilityRole` | string | ARIA role assignment | `"img"` or `"presentation"` |
| `ContentTemplate` | Razor / HTML content | inject descriptive or instructional content (visible or screen‑reader‑only) | `Screen‑reader text block or instructions` |
| `Focusable` | boolean | Allow keyboard focus | `true` |
| `TabIndex` | number | Keyboard tab order | `0` or `-1` |
| `FocusBorderColor` | string | Focus indicator color | `"#0078d4"` (blue) |
| `FocusBorderWidth` | number | Focus border thickness (px) | `2` |
| `FocusBorderMargin` | number | Space around focus border (px) | `5` |

## Series Accessibility Configuration

Make data series accessible to keyboard and screen reader users.

### Series-Level Accessibility

```cshtml
<ejs-accumulationchart id="seriesAccessChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              type="Pie"
                              innerRadius="40%">
            
            <!-- Series accessibility configuration -->
            <e-accumulationseries-accessibility
                accessibilityDescription="Revenue distribution: Click legend items to toggle visibility"
                accessibilityRole="img"
                focusable="true"
                tabIndex="0">
            </e-accumulationseries-accessibility>
            
            <!-- Data labels for all users -->
            <e-accumulationseries-datalabel visible="true" 
                                          position="Outside">
            </e-accumulationseries-datalabel>
            
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

## Legend Accessibility Configuration

Ensure legend elements are accessible via keyboard and screen readers.

### Legend with Accessibility

```cshtml
<ejs-accumulationchart id="legendAccessChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
    
    <!-- Accessible legend configuration -->
    <e-accumulationchart-legendsettings visible="true" position="Right">
        <e-legendsettings-accessibility
            accessibilityDescription="Click legend items to toggle series visibility"
            accessibilityRole="region"
            focusable="true"
            tabIndex="0">
        </e-legendsettings-accessibility>
    </e-accumulationchart-legendsettings>
</ejs-accumulationchart>

<!-- Help text for users -->
<p><em>Legend: Use Tab key to navigate to legend items. Press Enter or Space to toggle series visibility.</em></p>
```

## Screen Reader Support

Optimize charts for screen reader users.

### Screen Reader-Friendly Setup

```cshtml
@{
    List<ProductData> products = new List<ProductData>
    {
        new ProductData { Name = "Laptops", Quantity = 45, Percentage = 45 },
        new ProductData { Name = "Tablets", Quantity = 28, Percentage = 28 },
        new ProductData { Name = "Phones", Quantity = 17, Percentage = 17 },
        new ProductData { Name = "Accessories", Quantity = 10, Percentage = 10 }
    };
}

<!-- Chart with full screen reader support -->
<div id="chartContainer" role="region" aria-label="Product Sales Distribution">
    <h2 id="chartTitle">Product Sales by Category (Pie Chart)</h2>
    
    <ejs-accumulationchart id="srChart" 
                           title="Product Sales by Category"
                           aria-labelledby="chartTitle">
        
        <e-accumulation-series-collection>
            <e-accumulation-series dataSource="@products" 
                                  xName="Name" 
                                  yName="Quantity">
                <!-- Show both percentage and absolute value -->
                <e-accumulationseries-datalabel visible="true" 
                                              position="Outside"
                                              format="n1">
                </e-accumulationseries-datalabel>
            </e-accumulation-series>
        </e-accumulation-series-collection>
        
        <e-accumulationchart-legendsettings visible="true" position="Bottom">
        </e-accumulationchart-legendsettings>
    </ejs-accumulationchart>
    
    <!-- Accessible data table alternative for screen readers -->
    <div style="margin-top: 20px;">
        <h3>Data Table (for screen readers)</h3>
        <table border="1" style="border-collapse: collapse; width: 100%;">
            <thead>
                <tr>
                    <th>Product Category</th>
                    <th>Units Sold</th>
                    <th>Percentage</th>
                </tr>
            </thead>
            <tbody>
                @foreach(var product in products)
                {
                    <tr>
                        <td>@product.Name</td>
                        <td>@product.Quantity</td>
                        <td>@product.Percentage%</td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
</div>
```

```csharp
public class ProductData
{
    public string Name { get; set; }
    public double Quantity { get; set; }
    public double Percentage { get; set; }
}
```

**Why this helps screen reader users:**
- Chart title identifies the visualization
- Data labels read aloud actual values
- Legend provides accessible alternative
- Data table provides structural data for assistive tech
- Region role helps navigate page sections

## Focus Management

Control which elements can receive keyboard focus.

### Custom Focus Configuration

```cshtml
<!-- Make chart focusable in tab order -->
<ejs-accumulationchart id="focusableChart" 
                       tabIndex="0"
                       focusBorderColor="#ff6b6b"
                       focusBorderWidth="3"
                       focusBorderMargin="3">
    
    <e-accumulationchart-accessibility focusable="true" tabIndex="0">
    </e-accumulationchart-accessibility>
    
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Focus Border Customization

```csharp
// Properties for focus indicator
focusBorderColor="#0078d4"      // Blue focus border
focusBorderWidth="2"            // 2px thick
focusBorderMargin="5"           // 5px space from chart edge
```

## Color Contrast and Themes

Ensure sufficient color contrast for users with visual impairments.

### High Contrast Theme

```cshtml
<!-- High contrast theme for visibility -->
<head>
    <!-- High Contrast CSS Theme -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/27.1.48/highcontrast.css" />
</head>

<ejs-accumulationchart id="hcChart" theme="HighContrast">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Available Accessible Themes

| Theme | Best For | Contrast Level |
|-------|----------|-----------------|
| `HighContrast` | Users with low vision | WCAG AAA |
| `Material` | General use | WCAG AA |
| `Bootstrap5` | Bootstrap projects | WCAG AA |
| `Fluent` | Modern applications | WCAG AA |

### Custom Color Palette for Accessibility

```cshtml
@{
    // Use accessible color combinations
    List<string> accessibleColors = new List<string>
    {
        "#1f77b4",  // Blue (good contrast on white)
        "#ff7f0e",  // Orange (visible for colorblind)
        "#2ca02c",  // Green
        "#d62728",  // Red
        "#9467bd",  // Purple
        "#8c564b",  // Brown
        "#e377c2",  // Pink
        "#7f7f7f"   // Gray
    };
}

<ejs-accumulationchart id="customColorChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              palettes="@accessibleColors.ToArray()">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Recommendation:** Avoid using only red/green combinations, as users with color blindness cannot distinguish them.

## Testing Accessibility

Validate chart accessibility using automated tools and manual testing.

### Automated Testing

**Using accessibility-checker npm package:**

```bash
npm install accessibility-checker
```

**Using axe-core for browser testing:**

```bash
npm install axe-core

# Test in browser DevTools console:
axe.run()  // Returns accessibility violations
```

### Manual Testing Checklist

- [ ] **Keyboard Navigation:** Navigate entire chart using only keyboard
- [ ] **Screen Reader:** Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] **Focus Indicators:** Clear visual focus when using keyboard
- [ ] **Color Contrast:** Check all text meets WCAG AA (4.5:1 ratio)
- [ ] **Data Labels:** All chart data visible via labels or legend
- [ ] **Mobile:** Works on mobile with screen reader
- [ ] **Zoom:** Readable at 200% zoom level
- [ ] **No Color Alone:** Don't use color as only means of identification

### Chrome DevTools Lighthouse Audit

```
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Accessibility"
4. Click "Generate report"
5. Review violations and fix
```

### Keyboard Navigation Testing

```
1. Press Alt+J to focus chart
2. Tab through elements
3. Verify focus indicator visible
4. Test all interactive elements
5. Check enter/space functionality
```

## Troubleshooting

### Common Accessibility Issues and Solutions

**Problem: Chart not focusable via Tab key**

```csharp
// Solution: Set focusable="true" and tabIndex
<e-accumulationchart-accessibility focusable="true" tabIndex="0">
</e-accumulationchart-accessibility>
```

**Problem: Screen reader not announcing chart title**

```cshtml
<!-- Solution: Add clear title and description -->
<ejs-accumulationchart title="Sales Report"
                       description="Pie chart showing quarterly sales by region">
</ejs-accumulationchart>
```

**Problem: Low contrast between colors**

```csharp
// Solution: Use high contrast theme
<ejs-accumulationchart theme="HighContrast">
</ejs-accumulationchart>
```

**Problem: Focus border not visible**

```csharp
// Solution: Customize focus border
focusBorderColor="#ff0000"      // Bright red
focusBorderWidth="3"            // Thicker border
focusBorderMargin="5"           // More spacing
```

## Accessibility Resources

- [W3C WAI-ARIA Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [Section 508 Standards](https://www.section508.gov/)
- [Syncfusion Accessibility Documentation](https://ej2.syncfusion.com/aspnetcore/documentation/common/accessibility)
- [accessibility-checker Tool](https://www.npmjs.com/package/accessibility-checker)
- [axe DevTools for Testing](https://www.deque.com/axe/devtools/)

## Summary

Key points for accessible accumulation charts:

1. **Enable keyboard navigation** - Alt+J to focus, arrow keys to navigate
2. **Provide descriptions** - Use title, description, and ARIA labels
3. **Use data labels and legends** - Don't rely on color alone
4. **Test with screen readers** - Verify announcements and navigation
5. **Ensure color contrast** - Meet WCAG AA or AAA standards
6. **Check focus indicators** - Visible when using Tab key
7. **Provide alternatives** - Include data tables for complex charts
8. **Test with real users** - Get feedback from users with disabilities

By implementing these accessibility features, you ensure your accumulation charts are usable by everyone, regardless of ability or technology used.
