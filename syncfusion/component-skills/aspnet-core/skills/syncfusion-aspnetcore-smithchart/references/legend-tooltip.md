# Legend and Tooltip Configuration in Smith Chart

## Table of Contents
- [Legend Overview](#legend-overview)
  - [Enabling Legend](#enabling-legend)
- [Legend Position and Alignment](#legend-position-and-alignment)
  - [Position Options](#position-options)
  - [Position Examples](#position-examples)
  - [Custom Legend Position](#custom-legend-position)
  - [Legend Alignment](#legend-alignment)
- [Legend Customization](#legend-customization)
  - [Legend Shape](#legend-shape)
  - [Legend Size](#legend-size)
  - [Legend Padding](#legend-padding)
  - [Toggle Visibility](#toggle-visibility)
- [Tooltip Configuration](#tooltip-configuration)
  - [Enabling Tooltips](#enabling-tooltips)
  - [Tooltip Customization](#tooltip-customization)
  - [Tooltip Properties](#tooltip-properties)
- [Combined Usage Examples](#combined-usage-examples)
  - [Example 1: Standard Interactive Chart](#example-1-standard-interactive-chart)
  - [Example 2: Compact Dashboard](#example-2-compact-dashboard)
  - [Example 3: Publication Quality](#example-3-publication-quality)
  - [Example 4: Advanced Comparison](#example-4-advanced-comparison)
- [Practical Scenarios](#practical-scenarios)
  - [Scenario 1: Mobile-Friendly Legend](#scenario-1-mobile-friendly-legend)
  - [Scenario 2: Dense Multi-Series Chart](#scenario-2-dense-multi-series-chart)
  - [Scenario 3: Emphasis on Data, Minimal UI](#scenario-3-emphasis-on-data-minimal-ui)
- [Best Practices](#best-practices)

## Legend Overview

The legend is a key that identifies each series in the Smith Chart. It displays series names with colored symbols and allows users to toggle series visibility by clicking legend items.

### Enabling Legend

Enable the legend using the `legendsettings` element:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-legendsettings visible="true">
    </e-smithchart-legendsettings>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="Data1" name="Series 1" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="Data2" name="Series 2" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

By default, legend is disabled (`visible="false"`). Set `visible="true"` to display it.

## Legend Position and Alignment

### Position Options

Place the legend in different locations around the Smith Chart:

```cshtml
<e-smithchart-legendsettings visible="true" position="Bottom">
</e-smithchart-legendsettings>
```

Available positions:
- `Bottom` - Below the chart (default, ideal for horizontal layouts)
- `Top` - Above the chart
- `Right` - Right side of the chart
- `Left` - Left side of the chart
- `Custom` - User-defined location using coordinates

### Position Examples

**Bottom Position (default):**
```cshtml
<e-smithchart-legendsettings visible="true" position="Bottom">
</e-smithchart-legendsettings>
```

**Top Position:**
```cshtml
<e-smithchart-legendsettings visible="true" position="Top">
</e-smithchart-legendsettings>
```

**Right Position:**
```cshtml
<e-smithchart-legendsettings visible="true" position="Right">
</e-smithchart-legendsettings>
```

**Left Position:**
```cshtml
<e-smithchart-legendsettings visible="true" position="Left">
</e-smithchart-legendsettings>
```

### Custom Legend Position

Place the legend anywhere using x and y coordinates:

```cshtml
<e-smithchart-legendsettings visible="true" position="Custom">
    <e-smithchartlegendsettings-location x="100" y="100">
    </e-smithchartlegendsettings-location>
</e-smithchart-legendsettings>
```

The x and y coordinates are measured from the top-left corner of the chart in pixels. Use this for:
- Avoiding data points
- Placing legend in empty space
- Multi-panel layouts

### Legend Alignment

Align the legend within its position area:

```cshtml
<e-smithchart-legendsettings visible="true" position="Bottom" alignment="Far">
</e-smithchart-legendsettings>
```

Options:
- `Near` - Align to the start/left of the position area
- `Center` - Center alignment (default)
- `Far` - Align to the end/right of the position area

Examples:
```cshtml
<!-- Left-aligned at bottom -->
<e-smithchart-legendsettings visible="true" position="Bottom" alignment="Near">
</e-smithchart-legendsettings>

<!-- Right-aligned at bottom -->
<e-smithchart-legendsettings visible="true" position="Bottom" alignment="Far">
</e-smithchart-legendsettings>

<!-- Centered at right -->
<e-smithchart-legendsettings visible="true" position="Right" alignment="Center">
</e-smithchart-legendsettings>
```

## Legend Customization

### Legend Shape

Customize the symbol shape displayed next to each series name:

```cshtml
<e-smithchart-legendsettings visible="true" shape="Rectangle">
</e-smithchart-legendsettings>
```

Available shapes:
- `Circle` - Round symbol (default)
- `Rectangle` - Square symbol
- `Triangle` - Triangular symbol
- `Diamond` - Diamond-shaped symbol
- `Pentagon` - Five-sided symbol
- `Plus` - Plus sign symbol
- `InvertedTriangle` - Inverted triangle

Choose shapes that match your series markers or application style.

### Legend Size

Control the overall legend dimensions:

```cshtml
<e-smithchart-legendsettings visible="true" width="300" height="100">
</e-smithchart-legendsettings>
```

- `width` - Legend width in pixels (default: auto)
- `height` - Legend height in pixels (default: auto)

Useful when:
- Space is limited
- You want to force legend to specific dimensions
- Creating fixed-size layouts

### Legend Padding

Control spacing between legend items and between symbol and text:

```cshtml
<e-smithchart-legendsettings visible="true" itemPadding="10" shapePadding="5">
</e-smithchart-legendsettings>
```

- `itemPadding` - Space between legend items (pixels)
- `shapePadding` - Space between symbol and text (pixels)

Examples:
```cshtml
<!-- Compact legend -->
<e-smithchart-legendsettings visible="true" itemPadding="5" shapePadding="3">
</e-smithchart-legendsettings>

<!-- Spacious legend -->
<e-smithchart-legendsettings visible="true" itemPadding="20" shapePadding="10">
</e-smithchart-legendsettings>
```

### Toggle Visibility

Allow users to click legend items to show/hide series:

```cshtml
<e-smithchart-legendsettings visible="true" toggleVisibility="true">
</e-smithchart-legendsettings>
```

- `toggleVisibility="true"` - Users can click to toggle (default)
- `toggleVisibility="false"` - Legend is display-only

This is essential for:
- Comparing multiple series
- Reducing visual clutter
- Interactive data exploration

## Tooltip Configuration

Tooltips display detailed information about data points when hovering over them.

### Enabling Tooltips

Enable tooltips using the `tooltipsettings` element:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line" resistance="resistance" reactance="reactance">
        <e-smithchartseries-tooltip visible="true">
        </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

By default, tooltips are disabled. Set `visible="true"` to enable them.

### Tooltip Customization

Tooltips can be customized for each series or globally:

**Global tooltip (applies to all series):**
```cshtml
<e-smithchartseries-tooltip visible="true" fill="white" opacity="0.9">
</e-smithchartseries-tooltip>
```

**Series-specific tooltip:**
```cshtml
<e-smithchart-smithchartseries dataSource="Data1" name="Series 1" resistance="resistance" reactance="reactance">
    <e-smithchartseries-tooltip visible="true" fill="lightblue">
    </e-smithchartseries-tooltip>
</e-smithchart-smithchartseries>
```

### Tooltip Properties

- `fill` - Tooltip background color
- `opacity` - Transparency (0 to 1)
- `visible` - Show/hide tooltip

## Combined Usage Examples

### Example 1: Standard Interactive Chart

Legend at bottom with toggle visibility and basic tooltips:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-title text="Smith Chart Analysis">
    </e-smithchart-title>
    <e-smithchart-legendsettings visible="true" position="Bottom" toggleVisibility="true">
    </e-smithchart-legendsettings>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="TransmissionLine1" name="Line A" fill="blue" resistance="resistance" reactance="reactance">
        <e-smithchartseries-tooltip visible="true">
        </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="TransmissionLine2" name="Line B" fill="red" resistance="resistance" reactance="reactance">
        <e-smithchartseries-tooltip visible="true">
        </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="TransmissionLine3" name="Line C" fill="green" resistance="resistance" reactance="reactance">
        <e-smithchartseries-tooltip visible="true">
        </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Example 2: Compact Dashboard

Minimal legend at right, subtle tooltips:

```cshtml
<ejs-smithchart id="dashboard">
    <e-smithchart-legendsettings visible="true" position="Right" alignment="Center" 
                      itemPadding="8" shapePadding="4" toggleVisibility="true">
    </e-smithchart-legendsettings>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="Status1" name="Status 1" fill="darkblue" resistance="resistance" reactance="reactance">
            <e-smithchartseries-tooltip visible="true" fill="lightyellow" opacity="0.8">
            </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="Status2" name="Status 2" fill="darkgreen" resistance="resistance" reactance="reactance">
            <e-smithchartseries-tooltip visible="true" fill="lightyellow" opacity="0.8">
            </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Example 3: Publication Quality

Legend at top with custom shapes, no toggle for consistency:

```cshtml
<ejs-smithchart id="publication">
    <e-smithchart-title text="RF Circuit Analysis">
    </e-smithchart-title>
    <e-smithchart-legendsettings visible="true" position="Top" alignment="Far" 
                      shape="Rectangle" toggleVisibility="false">
    </e-smithchart-legendsettings>
    <e-smithchartseries-tooltip visible="true" fill="white" opacity="1.0">
    </e-smithchartseries-tooltip>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="Measurement" name="Measured" fill="navy" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="Simulation" name="Simulated" fill="lightblue" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="Reference" name="Reference" fill="gray" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Example 4: Advanced Comparison

Custom legend position to avoid data, series-specific tooltips:

```cshtml
<ejs-smithchart id="comparison">
    <e-smithchart-title text="Load Condition Comparison">
    </e-smithchart-title>
    <e-smithchart-legendsettings visible="true" position="Custom" shape="Diamond" 
                      width="250" itemPadding="12" toggleVisibility="true">
        <e-smithchartlegendsettings-location x="50" y="50">
        </e-smithchartlegendsettings-location>
    </e-smithchart-legendsettings>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="HighQ" name="High Q Load" fill="purple" resistance="resistance" reactance="reactance">
            <e-smithchartseries-tooltip visible="true" fill="lavender">
            </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="LowQ" name="Low Q Load" fill="orange" resistance="resistance" reactance="reactance">
            <e-smithchartseries-tooltip visible="true" fill="lightyellow">
            </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

## Practical Scenarios

### Scenario 1: Mobile-Friendly Legend

Compact legend for small screens:

```cshtml
<ejs-smithchart id="mobile-chart" width="100%" height="300px">
    <e-smithchart-legendsettings visible="true" position="Bottom" alignment="Near" 
                      itemPadding="5" shapePadding="2" toggleVisibility="true">
    </e-smithchart-legendsettings>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="Data1" name="Measurement 1" resistance="resistance" reactance="reactance">
        <e-smithchartseries-tooltip visible="true">
        </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Scenario 2: Dense Multi-Series Chart

Many series with clear legend separation:

```cshtml
<ejs-smithchart id="dense">
    <e-smithchart-legendsettings visible="true" position="Right" alignment="Center" 
                      width="200" itemPadding="15" toggleVisibility="true">
    </e-smithchart-legendsettings>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="Freq100MHz" name="100 MHz" resistance="resistance" reactance="reactance">
        <e-smithchartseries-tooltip visible="true" fill="white" opacity="0.95">
        </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="Freq500MHz" name="500 MHz" resistance="resistance" reactance="reactance">
        <e-smithchartseries-tooltip visible="true" fill="green" opacity="0.95">
        </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="Freq1GHz" name="1 GHz" resistance="resistance" reactance="reactance">
        <e-smithchartseries-tooltip visible="true" fill="red" opacity="0.95">
        </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="Freq5GHz" name="5 GHz" resistance="resistance" reactance="reactance">
        <e-smithchartseries-tooltip visible="true" fill="yellow" opacity="0.95">
        </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Scenario 3: Emphasis on Data, Minimal UI

Legend and tooltips in corners, non-intrusive:

```cshtml
<ejs-smithchart id="data-focused">
    <e-smithchart-legendsettings visible="true" position="Custom" alignment="Far" 
                      itemPadding="8" toggleVisibility="true">
        <e-smithchartlegendsettings-location x="10" y="10">
        </e-smithchartlegendsettings-location>
    </e-smithchart-legendsettings>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="Analysis" name="Circuit Analysis" fill="darkblue" resistance="resistance" reactance="reactance">
        <e-smithchartseries-tooltip visible="true" fill="white" opacity="0.85">
        </e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

## Best Practices

1. **Legend Position** - Bottom or right for most layouts; top for special emphasis
2. **Series Naming** - Use clear, descriptive names (e.g., "50Ω Reference" not "S1")
3. **Toggle Visibility** - Enable for interactive exploration, disable for static presentations
4. **Tooltip Visibility** - Enable for all but extremely simple single-smithchart-smithchartseries charts
5. **Shape Consistency** - Match legend shapes to series markers when possible
6. **Testing** - Verify legend and tooltips work on target devices (mouse/touch)
7. **Accessibility** - Ensure legend text is readable; test color contrast

Proper legend and tooltip configuration significantly improves Smith Chart usability and professional appearance.
