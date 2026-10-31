# Data Labels, Tooltips, and Accessibility

## Table of Contents
- [Overview](#overview)
- [Data Labels](#data-labels)
  - [Enabling Data Labels](#enabling-data-labels)
  - [Data Label Properties](#data-label-properties)
- [Data Label Customization](#data-label-customization)
  - [Label Styling](#label-styling)
  - [Label Font Properties](#label-font-properties)
  - [Complete Label Customization Example](#complete-label-customization-example)
  - [Label Format](#label-format)
- [Tooltips](#tooltips)
  - [Enabling Tooltips](#enabling-tooltips)
  - [Default Tooltip Content](#default-tooltip-content)
  - [Tooltip Properties](#tooltip-properties)
  - [Tooltip Background Color](#tooltip-background-color)
  - [Tooltip Text Styling](#tooltip-text-styling)
  - [Custom Tooltip Template](#custom-tooltip-template)
  - [Complete Tooltip Example](#complete-tooltip-example)
- [Accessibility](#accessibility)
  - [WCAG Compliance](#wcag-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
  - [Semantic Markup](#semantic-markup)
  - [Adding ARIA Labels](#adding-aria-labels)
  - [Custom ARIA Labels](#custom-aria-labels)
- [Keyboard Navigation](#keyboard-navigation)
  - [Supported Keyboard Shortcuts](#supported-keyboard-shortcuts)
  - [Keyboard Interaction Example](#keyboard-interaction-example)
- [Creating Accessible Charts](#creating-accessible-charts)
  - [1. Use Descriptive Titles](#1-use-descriptive-titles)
  - [2. Include Data Labels](#2-include-data-labels)
  - [3. Use Color Safely](#3-use-color-safely)
  - [4. Provide Text Alternatives](#4-provide-text-alternatives)
  - [5. Enable High Contrast](#5-enable-high-contrast)
- [Accessibility Checklist](#accessibility-checklist)
  - [Before Publishing](#before-publishing)
  - [Testing Tools](#testing-tools)
- [Complete Accessible Chart Example](#complete-accessible-chart-example)
- [Troubleshooting](#troubleshooting)
  - [Screen Reader Not Reading Chart](#screen-reader-not-reading-chart)
  - [Tooltips Not Accessible via Keyboard](#tooltips-not-accessible-via-keyboard)
  - [Colors Too Similar](#colors-too-similar)
  
## Overview

This reference covers how to display data on the chart through labels and tooltips, and how to ensure your Bullet Chart is accessible to all users.

---

## Data Labels

### Enabling Data Labels

Display actual bar values directly on the chart:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target">
    <e-bulletchart-datalabel enable="true"></e-bulletchart-datalabel>
</ejs-bulletchart>
```

### Data Label Properties

| Property | Type | Purpose |
|----------|------|---------|
| `enable` | boolean | Show/hide data labels |
| `LabelStyle` | BulletChartBulletLabelStyle | Options to customize the data label text |

---

## Data Label Customization

### Label Styling

Customize font and appearance:

```cshtml
<e-bulletchart-datalabel enable="true">
    <e-bulletchart-datalabel-labelstyle 
        size="12" 
        color="#333333" 
        fontFamily="Arial" 
        fontWeight="bold">
    </e-bulletchart-datalabel-labelstyle>
</e-bulletchart-datalabel>
```

### Label Font Properties

| Property | Type | Example | Purpose |
|----------|------|---------|---------|
| `size` | string | "12px" | Font size |
| `color` | string | "#333333" | Text color |
| `fontFamily` | string | "Arial" | Font face |
| `fontWeight` | string | "bold", "600" | Font weight |
| `fontStyle` | string | "italic" | Font style |

### Complete Label Customization Example

```cshtml
<e-bulletchart-datalabel enable="true">
    <e-bulletchart-datalabel-labelstyle  
        size="14" 
        color="#0066cc" 
        fontFamily="Segoe UI" 
        fontWeight="bold"
        fontStyle="normal">
    </e-bulletchart-datalabel-labelstyle>
</e-bulletchart-datalabel>
```

### Label Format

Format label values like currency or percentages:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    labelFormat = "c2">
</ejs-bulletchart>
```

---

## Tooltips

### Enabling Tooltips

Show additional information on hover:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target">
    <e-bulletchart-tooltipsettings enable="true"></e-bulletchart-tooltipsettings>
</ejs-bulletchart>
```

### Default Tooltip Content

By default, tooltips display:
- **Value** - The actual bar value
- **Target** - The target value

### Tooltip Properties

| Property | Type | Purpose |
|----------|------|---------|
| `enable` | boolean | Enable/disable tooltips |
| `fill` | string | Background color |
| `Template` | string | The default value of tooltip template. |
| `textStyle` | object | Font styling |

### Tooltip Background Color

```cshtml
<e-bulletchart-tooltipsettings 
    enable="true" 
    fill="#f0f0f0">
</e-bulletchart-tooltipsettings>
```

### Tooltip Text Styling

Customize tooltip font:

```cshtml
<e-bulletchart-tooltipsettings enable="true">
    <e-bulletchart-tooltipsettings-textstyle
        color="#333333" 
        fontFamily="Arial" 
        size="12">
    </e-bulletchart-tooltipsettings-textstyle>
</e-bulletchart-tooltipsettings>
```

### Custom Tooltip Template

Display custom HTML in tooltips using placeholders:

```cshtml
<e-bulletchart-tooltipsettings enable="true" 
    template="<div>Actual: ${value}<br/>Target: ${target}</div>">
</e-bulletchart-tooltipsettings>
```

**Available Placeholders:**
- `${value}` - Actual value
- `${target}` - Target value

### Complete Tooltip Example

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    categoryField="Category">
    
    <e-bulletchart-tooltipsettings enable="true" fill="#ffffff">
        <e-bulletchart-tooltipsettings-textstyle color="#000000" fontFamily="Arial" size="12"></e-bulletchart-tooltipsettings-textstyle>
    </e-bulletchart-tooltipsettings>
    
</ejs-bulletchart>
```

---

## Accessibility

### WCAG Compliance

The Bullet Chart follows Web Content Accessibility Guidelines:

| Standard | Compliance | Coverage |
|----------|-----------|----------|
| WCAG 2.2 | AA | Full support |
| Section 508 | Full | All features |
| Screen Readers | Yes | Content + labels |
| Keyboard Navigation | Yes | Tab/Shift+Tab |
| Color Contrast | Yes | Meets WCAG AA |

---

## WAI-ARIA Attributes

### Semantic Markup

The Bullet Chart includes ARIA attributes for screen readers:

**Standard ARIA Attributes:**
- `role="img"` - Chart identified as image
- `role="button"` - Interactive elements
- `aria-label` - Descriptive labels
- `aria-pressed` - State indicators

### Adding ARIA Labels

Enhance chart accessibility with descriptions:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    title="Sales Performance"
    subtitle="Q4 2024 Results">
</ejs-bulletchart>
```

The title and subtitle are used for ARIA labeling.

### Custom ARIA Labels

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    aria-label="Sales performance comparison with quarterly targets">
</ejs-bulletchart>
```

---

## Keyboard Navigation

### Supported Keyboard Shortcuts

| Key Combination | Action |
|-----------------|--------|
| <kbd>Tab</kbd> | Move focus to next element |
| <kbd>Shift + Tab</kbd> | Move focus to previous element |
| <kbd>Ctrl + P</kbd> | Print the chart |

### Keyboard Interaction Example

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target">
</ejs-bulletchart>

<script>
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'p') {
            var chart = document.getElementById('container').ej2_instances[0];
            chart.print();
        }
    });
</script>
```

---

## Creating Accessible Charts

### 1. Use Descriptive Titles

```cshtml
<ejs-bulletchart id="container" 
    title="Sales Performance vs. Quota"
    subtitle="Q4 2024 Results by Region">
</ejs-bulletchart>
```

### 2. Include Data Labels

Make values readable without tooltips:

```cshtml
<ejs-bulletchart id="container">
    <e-bulletchart-datalabel enable="true"></e-bulletchart-datalabel>
</ejs-bulletchart>
```

### 3. Use Color Safely

Ensure charts are understandable without color:

```csharp
// Data structure with labels for each range
public class AccessibleRange
{
    public double End { get; set; }
    public string Label { get; set; }  // "Poor", "Fair", "Good"
    public string Color { get; set; }
}
```

### 4. Provide Text Alternatives

```cshtml
<!-- Chart for sighted users -->
<div id="chartContainer" style="height: 300px;">
    <ejs-bulletchart id="container" 
        dataSource="@Model.ChartData" 
        valueField="Value" 
        targetField="Target">
    </ejs-bulletchart>
</div>

<!-- Text summary for screen readers -->
<div id="chartSummary" class="sr-only">
    <h3>Sales Performance Summary</h3>
    <ul>
        @foreach(var item in Model.ChartData)
        {
            <li>@item.Category: @item.Value vs. target @item.Target</li>
        }
    </ul>
</div>
```

### 5. Enable High Contrast

Support high-contrast mode:

```css
@media (prefers-contrast: more) {
    /* Increase color contrast in high contrast mode */
    .ej2-bulletchart {
        background-color: #ffffff;
        color: #000000;
    }
}
```

---

## Accessibility Checklist

### Before Publishing

- [ ] Chart has descriptive title and subtitle
- [ ] Data labels are enabled for key values
- [ ] Color is not the only way to distinguish information
- [ ] Keyboard navigation is tested (Tab, Shift+Tab)
- [ ] Screen reader reads chart title and data correctly
- [ ] Tooltips provide additional context
- [ ] Contrast ratio meets WCAG AA standards (4.5:1)
- [ ] Chart works without JavaScript (fallback text available)

### Testing Tools

Use these tools to validate accessibility:

- **WAVE**: Web Accessibility Evaluation Tool
- **Axe DevTools**: Automated accessibility testing
- **Screen Readers**: NVDA (Windows), JAWS (Windows), VoiceOver (Mac)
- **Lighthouse**: Chrome DevTools built-in accessibility audit

---

## Complete Accessible Chart Example

```cshtml
<div class="chart-container">
    <h2>Quarterly Sales Performance</h2>
    
    <ejs-bulletchart id="container" 
        dataSource="@Model.ChartData" 
        valueField="Value" 
        targetField="Target"
        categoryField="Category"
        title="Sales vs. Target"
        subtitle="Comparison of actual sales to quarterly targets">
        
        <!-- Enable data labels for accessibility -->
        <e-bulletchart-datalabel enable="true">
            <e-bulletchart-datalabel-labelstyle  size="12" color="#000000" fontWeight="bold"></e-bulletchart-datalabel-labelstyle>
        </e-bulletchart-datalabel>
        
        <!-- Configure tooltips -->
        <e-bulletchart-tooltipsettings enable="true" fill="#ffffff">
            <e-bulletchart-tooltipsettings-textstyle color="#000000" size="12"></e-bulletchart-tooltipsettings-textstyle>
        </e-bulletchart-tooltipsettings>
        
        <!-- Accessible ranges with clear colors -->
        <e-bullet-range-collection>
            <e-bullet-range end="50" color="#ff0000"></e-bullet-range>   <!-- Red: Below Target -->
            <e-bullet-range end="100" color="#ffcc00"></e-bullet-range>  <!-- Yellow: On Track -->
            <e-bullet-range end="150" color="#00cc00"></e-bullet-range>  <!-- Green: Exceeds Target -->
        </e-bullet-range-collection>
    </ejs-bulletchart>
</div>

<!-- Text summary for screen readers -->
<div class="sr-only">
    <h3>Sales Performance Summary</h3>
    <p>The chart above shows quarterly sales performance compared to targets.</p>
    <ul>
        @foreach(var item in Model.ChartData)
        {
            <li>@item.Category: Sales of @item.Value against target @item.Target</li>
        }
    </ul>
</div>
```

---

## Troubleshooting

### Screen Reader Not Reading Chart

**Issue:** Chart content not accessible to screen readers.

**Solution:** Add proper ARIA labels and titles:
```cshtml
<ejs-bulletchart id="container" 
    title="Sales Performance"
    aria-label="Quarterly sales data with targets">
</ejs-bulletchart>
```

### Tooltips Not Accessible via Keyboard

**Issue:** Tooltips only appear on hover, inaccessible to keyboard users.

**Solution:** Enable data labels as alternative:
```cshtml
<e-bulletchart-datalabel enable="true"></e-bulletchart-datalabel>
<e-bulletchart-tooltipsettings enable="true"></e-bulletchart-tooltipsettings>
```

### Colors Too Similar

**Issue:** Chart colors fail contrast ratio test.

**Solution:** Use more distinct colors:
```cshtml
<!-- Before: Similar shades -->
<e-bullet-range end="50" color="#4444ff"></e-bullet-range>
<e-bullet-range end="100" color="#5555ff"></e-bullet-range>

<!-- After: Better contrast -->
<e-bullet-range end="50" color="#0000ff"></e-bullet-range>
<e-bullet-range end="100" color="#ffff00"></e-bullet-range>
```
