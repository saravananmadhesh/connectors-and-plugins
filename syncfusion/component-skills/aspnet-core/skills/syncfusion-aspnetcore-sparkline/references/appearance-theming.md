# Appearance & Theming

## Table of Contents
- [Container Area Configuration](#container-area-configuration)
- [Border Styling](#border-styling)
- [Padding Control](#padding-control)
- [Background Customization](#background-customization)
- [Theme Selection](#theme-selection)
- [Sparkline Themes](#sparkline-themes)
    -[Material Theme (Default)](#material-theme-default)
    -[Fabric Theme](#fabric-theme)
    -[Bootstrap Theme](#bootstrap-theme)
    -[Highcontrast Theme](#highcontrast-theme)
- [Text Color Adaptation](#text-color-adaptation)

## Container Area Configuration

The container area is the outer region that holds the sparkline visualization. Customize its borders, background, and padding for refined appearance.

**Container properties:**
- `border` - Border color and width around the container
- `background` - Container background color
- `padding` - Space between container edge and sparkline chart

## Border Styling

Add a border around the sparkline container to define its boundaries.

**Example: Sparkline with border:**

```cshtml
<ejs-sparkline id="sparklineBorder" 
    type="Line"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval"
    height="80">
    <e-sparkline-containerarea>
        <e-sparkline-containerarea-border color="#1e7e34" width="2"></e-sparkline-containerarea-border>
    </e-sparkline-containerarea>
</ejs-sparkline>
```

**Border properties:**
- `color` - Border color (hex code or named color)
- `width` - Border thickness in pixels (1-5 recommended)

**Common border use cases:**
- Add 1px subtle border: `color="#cccccc" width="1"`
- Add 2px dark border: `color="#333333" width="2"`
- Add 3px accent border: `color="#007bff" width="3"`

## Padding Control

Padding adds space between the container edges and the sparkline chart. Default padding is 5 pixels on all sides.

**Example: Custom padding:**

```cshtml
<ejs-sparkline id="sparklinePadding" 
    type="Area"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval"
    height="80">
    <e-sparkline-containerarea>
    </e-sparkline-containerarea>
    <e-sparkline-padding left="10" right="10" top="15" bottom="15"></e-sparkline-padding>
</ejs-sparkline>
```

**Padding properties:**
- `left` - Left side padding (pixels)
- `right` - Right side padding (pixels)
- `top` - Top side padding (pixels)
- `bottom` - Bottom side padding (pixels)

**Padding guidelines:**
- Default (5px): Compact sparklines for dashboards
- Moderate (10-15px): Sparklines with labels or markers
- Large (20px+): Standalone sparklines with detailed customization

**Example: Set equal padding on all sides:**

```cshtml
<e-sparkline-padding left="20" right="20" top="20" bottom="20"></e-sparkline-padding>
```

## Background Customization

Customize the sparkline's background color. Default background is transparent.

**Example: Colored background:**

```cshtml
<ejs-sparkline id="sparklineBackground" 
    type="Column"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval"
    height="80">
    <e-sparkline-containerarea background="#f5f5f5"></e-sparkline-containerarea>
</ejs-sparkline>
```

**Common background colors:**
- `#f5f5f5` - Light gray (subtle background)
- `#ffffff` - White (clean appearance)
- `#e8f4f8` - Light blue (professional look)
- `#f0f8ff` - Alice blue (soft appearance)

**Use cases for background:**
- Add light background for definition in dashboard widgets
- Use white background for printed reports
- Add colored background for thematic consistency

## Theme Selection

Sparkline supports multiple built-in themes that adjust colors for different design contexts. Theme affects data label and track line colors based on light/dark requirements.

**Supported themes:**
- `Material` - Default; modern Material Design colors
- `Fabric` - Microsoft Fabric Design colors
- `Bootstrap` - Bootstrap framework colors
- `Highcontrast` - High contrast for accessibility

**Example: Apply theme:**

```cshtml
<ejs-sparkline id="sparklineTheme" 
    type="Line"
    theme="Material"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval"
    height="80">
</ejs-sparkline>
```

## Sparkline Themes

### Material Theme (Default)

Modern, clean design with balanced colors.

```cshtml
<ejs-sparkline id="materialSparkline" 
    type="Line"
    theme="Material"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval">
</ejs-sparkline>
```

**Characteristics:**
- Data labels: Black text on light background
- Track line: Dark colors
- Professional and modern appearance

### Fabric Theme

Microsoft Fabric Design with refined styling.

```cshtml
<ejs-sparkline id="fabricSparkline" 
    type="Line"
    theme="Fabric"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval">
</ejs-sparkline>
```

**Characteristics:**
- Data labels: Dark gray text
- Track line: Medium gray colors
- Corporate and professional look

### Bootstrap Theme

Bootstrap framework consistent styling.

```cshtml
<ejs-sparkline id="bootstrapSparkline" 
    type="Line"
    theme="Bootstrap"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval">
</ejs-sparkline>
```

**Characteristics:**
- Data labels: Bootstrap-compatible colors
- Track line: Standard Bootstrap colors
- Consistent with Bootstrap applications

### Highcontrast Theme

High contrast colors for accessibility and visibility in poor lighting or for visually impaired users.

```cshtml
<ejs-sparkline id="highcontrastSparkline" 
    type="Line"
    theme="Highcontrast"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval">
</ejs-sparkline>
```

**Characteristics:**
- Data labels: White text on dark background
- Track line: Bright contrasting colors
- Enhanced visibility in low-light conditions
- Accessible to users with color blindness

## Text Color Adaptation

Text color (data labels, tooltips) automatically adapts based on the selected theme. Light themes use dark text, dark themes use light text.

**Example: Material theme with light background (dark text):**

```cshtml
<ejs-sparkline id="lightSparkline" 
    theme="Material"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval">
    <e-sparkline-containerarea background="#ffffff"></e-sparkline-containerarea>
    <e-sparkline-datalabelsettings visible="All"></e-sparkline-datalabelsettings>
</ejs-sparkline>
```

**Output:** Dark text labels on light gray chart area for maximum readability.

**Example: Highcontrast theme with dark background (light text):**

```cshtml
<ejs-sparkline id="darkSparkline" 
    theme="Highcontrast"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval">
    <e-sparkline-containerarea background="#1a1a1a"></e-sparkline-containerarea>
    <e-sparkline-datalabelsettings visible="All"></e-sparkline-datalabelsettings>
</ejs-sparkline>
```

**Output:** Light text labels on dark chart area for high contrast visibility.

## Complete Styling Example

Combining all appearance features:

```cshtml
<ejs-sparkline id="styledSparkline" 
    type="Area"
    theme="Material"
    dataSource="ViewBag.SalesData"
    xName="Month" 
    yName="Revenue"
    height="120"
    width="100%">
    
    <!-- Container styling -->
    <e-sparkline-containerarea background="#f8f9fa">
        <e-sparkline-containerarea-border color="#dee2e6" width="1"></e-sparkline-containerarea-border>
    </e-sparkline-containerarea>
    <e-sparkline-padding left="15" right="15" top="10" bottom="10"></e-sparkline-padding>
    
    <!-- Markers -->
   <e-sparkline-markersettings size= 5, fill='white',visible= "ViewBag.sparkVisible"></e-sparkline-markersettings>
    
    <!-- Data labels -->
    <e-sparkline-datalabelsettings visible="End" format="${yval}K"></e-sparkline-datalabelsettings>
    
</ejs-sparkline>
```

## Theme Selection Guide

| Use Case | Recommended Theme | Background | Reason |
|---|---|---|---|
| Dashboard widget | Material | #f5f5f5 | Clean, modern, professional |
| Dark UI context | Highcontrast | #1a1a1a | Maximum contrast in dark mode |
| Corporate app | Fabric | #ffffff | Professional, refined appearance |
| Bootstrap app | Bootstrap | #f8f9fa | Consistent with framework |
| Printed report | Material | #ffffff | Clear, professional printing |
| Accessibility focus | Highcontrast | #1a1a1a | WCAG AA compliance, high visibility |
| Web dashboard | Material | #f5f5f5 | Universal, modern standard |

## Troubleshooting

**Text not visible in sparkline:**
- Check theme matches background color (light theme with light background = invisible text)
- Use Highcontrast theme with dark background for visibility
- Verify data label color in browser inspector

**Theme colors not applied:**
- Confirm theme property is correctly set: `theme="Material"`
- Clear browser cache and refresh
- Check that containerArea background doesn't override theme intention

**Border not showing:**
- Verify border width is set: `width="1"` or higher
- Check border color is visible against background
- Confirm containerborder element is properly closed
