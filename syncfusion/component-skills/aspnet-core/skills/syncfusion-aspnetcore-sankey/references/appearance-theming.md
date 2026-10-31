# Appearance and Theming

## Table of Contents

- [Chart Dimensions](#chart-dimensions)
  - [Fixed Dimensions (Pixels)](#fixed-dimensions-pixels)
  - [Percentage-Based Dimensions](#percentage-based-dimensions)
  - [Common Size Configurations](#common-size-configurations)
- [Responsive Sizing](#responsive-sizing)
  - [Container-Based Responsive Layout](#container-based-responsive-layout)
  - [Full-Width Responsive](#full-width-responsive)
  - [Aspect Ratio Responsive](#aspect-ratio-responsive)
- [Background Customization](#background-customization)
  - [Solid Color Background](#solid-color-background)
  - [White Background](#white-background)
  - [Transparent Background](#transparent-background)
  - [Gradient Background (CSS)](#gradient-background-css)
- [Border Customization](#border-customization)
  - [Basic Border](#basic-border)
  - [Colored Border](#colored-border)
  - [Dashed Border](#dashed-border)
  - [No Border](#no-border)
- [Margin Configuration](#margin-configuration)
  - [Basic Margins](#basic-margins)
  - [Different Margins](#different-margins)
  - [Compact Margins](#compact-margins)
  - [Generous Margins](#generous-margins)
- [Built-in Themes](#built-in-themes)
  - [Available Themes](#available-themes)
  - [Material Theme (Default)](#material-theme-default)
  - [Bootstrap Theme](#bootstrap-theme)
  - [Fabric Theme](#fabric-theme)
  - [Tailwind Theme](#tailwind-theme)
  - [High Contrast Theme](#high-contrast-theme)
- [Complete Example](#complete-example)
  - [Full Customization](#full-customization)
- [Best Practices](#best-practices)
  - [Responsive Design](#responsive-design)
  - [Theme Selection](#theme-selection)
  - [Visual Hierarchy](#visual-hierarchy)
  - [Accessibility](#accessibility)

## Chart Dimensions

Control the size of the Sankey Chart using the `Width` and `Height` properties. You can specify dimensions in pixels (px) or percentages (%) to create fixed or responsive layouts.

### Fixed Dimensions (Pixels)

Specify exact pixel sizes for fixed layouts:

```html
<ejs-sankey id="fixedSizeSankey" 
    width="800px" 
    height="500px">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>

</ejs-sankey>

```

**Result:** Chart displays at exactly 800 pixels wide and 500 pixels tall.

### Percentage-Based Dimensions

Use percentages for responsive layouts that adapt to container size:

```html
<div style="height: 500px; width: 100%;"> @* Parent container needed for 100% height *@
    <ejs-sankey id="responsiveSizeSankey" 
        width="100%" 
        height="100%">
        
        <e-sankey-nodes>
            @foreach (var node in Model.Nodes)
            {
                <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
            }
        </e-sankey-nodes>

        <e-sankey-links>
            @foreach (var link in Model.Links)
            {
                <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
            }
        </e-sankey-links>

    </ejs-sankey>
</div>
```

**Result:** Chart fills 100% of parent container width and height.

### Common Size Configurations

**Small Chart:**
```html
<ejs-sankey width="400px" height="300px">
```

**Medium Chart:**
```html
<ejs-sankey width="700px" height="420px">
```

**Large Chart:**
```html
<ejs-sankey width="1000px" height="600px">
```

## Responsive Sizing

Use percentage-based dimensions for responsive layouts that adapt to container sizes. This is recommended for applications that need to work across different device sizes and screen orientations:

### Container-Based Responsive Layout

```html
<div style="width: 80%; margin: 0 auto;">
    <ejs-sankey id="responsiveSankey" 
        width="100%" 
        height="500px">
        
        <e-sankey-nodes>
            @foreach (var node in Model.Nodes)
            {
                <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
            }
        </e-sankey-nodes>

        <e-sankey-links>
            @foreach (var link in Model.Links)
            {
                <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
            }
        </e-sankey-links>

    </ejs-sankey>
</div>
```

The chart scales to 80% of viewport width and maintains 500px height.

### Full-Width Responsive

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;

@* Added id="sankey" to fix the querySelector error *@
<ejs-sankey id="fullWidthSankey" 
    width="100%" 
    height="100%">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>


```

Chart fills 100% of viewport width and height.

### Aspect Ratio Responsive

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;

@* Added id="sankey" to fix the querySelector error *@
<div style="position: relative; width: 100%; padding-bottom: 66.67%;">
<ejs-sankey id="fullWidthSankey" 
    width="100%" 
    height="100%">
    
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
</div>
```

Maintains 3:2 aspect ratio responsively.

## Background Customization

Customize the background of the Sankey Chart with solid colors or background images to match your application's theme:

### Solid Color Background

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;

<ejs-sankey id="bgColorSankey" 
    width="100%" 
    height="420px"
    background="solid black"
    theme="MaterialDark">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

```

**Result:** Chart displays with light gray background.

### White Background

```html
<ejs-sankey background="#FFFFFF">
```

### Transparent Background

```html
<ejs-sankey background="transparent">
```

### Gradient Background (CSS)

```html
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
<ejs-sankey id="bgColorSankey" 
    width="100%" 
    height="420px"
    background="transparent"
    theme="MaterialDark">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
</div>
```

Chart renders on gradient background.

## Border Customization

Customize the border of the Sankey Chart container:

### Basic Border

```html
<ejs-sankey id="borderSankey" 
    width="100%" 
    height="420px">
    
    <e-sankey-border color="#000000" width="2"></e-sankey-border>

    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

**Result:** Chart displays with 2px black border.

### Colored Border

```html
<e-sankey-border color="#1976D2" width="3"></e-sankey-border>
```

Blue border with 3px width.

### Dashed Border

```html
<e-sankey-border 
    color="#FF6B6B" 
    width="2"
    dashArray="5,5">
</e-sankey-border>
```

Red dashed border (5px dash, 5px gap).

### No Border

```html
<e-sankey-border width="0"></e-sankey-border>
```

## Margin Configuration

Control the spacing around the chart content using margins:

### Basic Margins

```html
<ejs-sankey id="marginSankey" 
    width="100%" 
    height="420px">
    
    @* Use this tag instead of the margin attribute to fix the error *@
    <e-sankey-margin top="20" bottom="20" left="20" right="20"></e-sankey-margin>
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

```

**Result:** 20px margin on all sides.

### Different Margins

```html
<ejs-sankey id="marginSankey" 
    width="100%" 
    height="420px">
    
    @* Use this tag instead of the margin attribute to fix the error *@
    <e-sankey-margin top="30" bottom="10" left="40" right="20"></e-sankey-margin>
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

- Top: 30px (for title space)
- Bottom: 10px
- Left: 40px (for axis labels)
- Right: 20px

### Compact Margins

```html
    <e-sankey-margin top="5" bottom="5" left="5" right="5"></e-sankey-margin>
```

### Generous Margins

```html
    <e-sankey-margin top="40" bottom="30" left="50" right="40"></e-sankey-margin>
```

## Built-in Themes

The Sankey Chart provides multiple built-in themes to customize the visual appearance. Apply a theme using the `Theme` property. Themes control default colors, fonts, and styling for the entire chart.

### Available Themes

- **Material** - Default Material Design theme
- **Bootstrap** - Bootstrap color scheme
- **Fabric** - Microsoft Fabric design system
- **Bootstrap4** - Bootstrap 4 theme
- **Tailwind** - Tailwind CSS colors
- **Highcontrast** - High contrast for accessibility

### Material Theme (Default)

```html
<ejs-sankey id="materialThemeSankey" 
    width="100%" 
    height="420px"
    theme="Material">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

Modern Material Design colors and styling.

### Bootstrap Theme

```html
<ejs-sankey theme="Bootstrap">
```

Bootstrap-compatible color scheme.

### Fabric Theme

```html
<ejs-sankey theme="Fabric">
```

Microsoft Fabric design system styling.

### Tailwind Theme

```html
<ejs-sankey theme="Tailwind">
```

Tailwind CSS color palette.

### High Contrast Theme

```html
<ejs-sankey theme="HighContrast">
```

High contrast colors for accessibility - uses black/white with high saturation colors.

## Complete Example

### Full Customization

```html
<ejs-sankey id="customSankey" 
    width="100%" 
    height="600px"
    background="#FAFAFA"
    theme="Tailwind">
    
    @* Fixed margin error by using the dedicated tag *@
    <e-sankey-margin top="30" bottom="20" left="20" right="20"></e-sankey-margin>

    <e-sankey-border 
        color="#E0E0E0" 
        width="1">
    </e-sankey-border>
    
    <e-sankey-nodesettings 
        width="22" 
        padding="12">
    </e-sankey-nodesettings>
    
    <e-sankey-linksettings 
        opacity="0.4" 
        curvature="0.55">
    </e-sankey-linksettings>

    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

```

**Features:**
- Responsive width, fixed 600px height
- Light gray background
- Tailwind theme
- 30px top margin for title space
- Subtle border
- Custom node and link settings

## Best Practices

### Responsive Design

1. Use percentages (%) for flexible layouts
2. Set minimum widths for charts to prevent distortion
3. Test on multiple screen sizes (mobile, tablet, desktop)
4. Adjust margins based on available space
5. Use viewport meta tags for mobile optimization

### Theme Selection

1. **Material** - Modern, balanced, default choice
2. **Bootstrap** - For Bootstrap-based applications
3. **Tailwind** - For Tailwind CSS projects
4. **Highcontrast** - For accessibility requirements
5. **Fabric** - For Microsoft ecosystem applications

### Visual Hierarchy

1. Use generous margins (20-40px) for prominent charts
2. Use compact margins (5-10px) for embedded charts
3. Add borders to separate from background
4. Match theme to application design system
5. Maintain consistent styling across multiple charts

### Accessibility

- Use HighContrast theme for WCAG compliance
- Ensure sufficient contrast ratios
- Test with high DPI displays
- Support RTL layouts
- Test with zoom levels (100%, 125%, 150%)
