# Legend and Series Management

Learn how to configure legends to display series information and allow users to toggle series visibility.

## Table of Contents
- [Basic Legend Setup](#basic-legend-setup)
  - [Enable Legend](#enable-legend)
- [Legend Positioning](#legend-positioning)
  - [Legend Positioning](#position-options)
  - [Examples by Position](#examples-by-position)
- [Legend Alignment](#legend-alignment)
- [Legend Customization](#legend-customization)
  - [Legend Size and Padding](#legend-size-and-padding)
  - [Legend Item Size](#legend-item-size)
  - [Custom Font and Color](#custom-font-and-color)
  - [Background and Border](#background-and-border)
- [Series Icon Shapes](#series-icon-shapes)
  - [Default Shapes](#default-shapes)
  - [Custom Shape Per Series](#custom-shape-per-series)
- [Interactive Legend: Toggle Series](#interactive-legend-toggle-series)
  - [Enable Click to Toggle](#enable-click-to-toggle)
  - [Default Visibility Control](#default-visibility-control)
  - [Programmatic Toggle](#programmatic-toggle)
- [Legend with Multiple Series](#legend-with-multiple-series)
  - [Organizing Many Series](#organizing-many-series)
  - [Wrapping Legend Items](#wrapping-legend-items)
- [Common Legend Patterns](#common-legend-patterns)
  - [Pattern 1: Simple Legend Below Chart](#pattern-1-simple-legend-below-chart)
  - [Pattern 2: Compact Right-Side Legend](#pattern-2-compact-right-side-legend)
  - [Pattern 3: Top Legend with Toggle](#pattern-3-top-legend-with-toggle)
  - [Pattern 4: Custom Positioned Legend (Overlay)](#pattern-4-custom-positioned-legend-overlay)
- [Troubleshooting](#troubleshooting)

## Basic Legend Setup

### Enable Legend

```typescript
<ejs-stockchart [legendSettings]='{ visible: true }'>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle' xName='x' 
            high='high' low='low' open='open' close='close' 
            name='Stock A'>
        </e-stockchart-series>
        <e-stockchart-series type='Line' xName='x' yName='ma20' 
            name='MA 20'>
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**Key Properties:**
- `visible`: Show/hide legend (true/false)
- `name`: Series label displayed in legend
- Each series can have different colors and styles shown in legend

## Legend Positioning

### Position Options

```typescript
[legendSettings]='{ 
    position: "Top"  // Top, Bottom, Right, Left, Custom
}'
```

**Positions:**
- `'Top'`: Above the chart
- `'Bottom'`: Below the chart (default)
- `'Right'`: Right side of chart
- `'Left'`: Left side of chart
- `'Custom'`: Manual x/y coordinates

### Examples by Position

**Top Position:**
```typescript
[legendSettings]='{ 
    position: "Top",
    alignment: "Center"
}'
```

**Right Position:**
```typescript
[legendSettings]='{ 
    position: "Right",
    alignment: "Far"  // Align to bottom of right side
}'
```

**Custom Position:**
```typescript
[legendSettings]='{ 
    position: "Custom",
    location: { x: 50, y: 20 }  // 50px from left, 20px from top
}'
```

## Legend Alignment

Align legend within its position:

```typescript
[legendSettings]='{ 
    alignment: "Near"  // Near, Center, Far
}'
```

**For Top/Bottom Positioning:**
- `'Near'`: Left side
- `'Center'`: Middle (default)
- `'Far'`: Right side

**For Left/Right Positioning:**
- `'Near'`: Top
- `'Center'`: Middle (default)
- `'Far'`: Bottom

## Legend Customization

### Legend Size and Padding

```typescript
[legendSettings]='{ 
    visible: true,
    width: "400px",    // Specific width
    height: "60px",    // Specific height
    padding: 15        // Space around legend
}'
```

### Legend Item Size

```typescript
[legendSettings]='{ 
    shapeWidth: 12,    // Icon width
    shapeHeight: 12
}'
```

### Custom Font and Color

```typescript
<ejs-stockchart [legendSettings]='{ 
    visible: true,
    textStyle: { 
        color: "#333333",
        fontFamily: "Arial",
        size: "14px"
    }
}'>
</ejs-stockchart>
```

### Background and Border

```typescript
[legendSettings]='{ 
    background: "white",
    border: { 
        color: "#CCCCCC",
        width: 1
    }
}'
```

## Series Icon Shapes

### Default Shapes

```typescript
<e-stockchart-series type='Candle' xName='x' high='high' low='low' open='open' close='close'
    name='Stock A'
    legendShape='SeriesType'>  // Uses series type as shape
</e-stockchart-series>
```

**Shape Options:**
- `'SeriesType'`: Uses the series rendering type icon (default)
- `'Circle'`: Circle icon
- `'Rectangle'`: Square icon
- `'VerticalLine'`: Vertical line
- `'Triangle'`: Triangle
- `'Diamond'`: Diamond
- `'Cross'`: Cross/X shape

### Custom Shape Per Series

```typescript
<e-stockchart-series-collection>
    <e-stockchart-series type='Candle' xName='x' 
        high='high' low='low' open='open' close='close'
        name='Price' legendShape='SeriesType'>
    </e-stockchart-series>
    <e-stockchart-series type='Line' xName='x' yName='ma20'
        name='MA 20' legendShape='Circle'>
    </e-stockchart-series>
    <e-stockchart-series type='Line' xName='x' yName='ma50'
        name='MA 50' legendShape='Triangle'>
    </e-stockchart-series>
</e-stockchart-series-collection>
```

## Interactive Legend: Toggle Series

### Enable Click to Toggle

```typescript
<ejs-stockchart [legendSettings]='{ 
    visible: true,
    toggleVisibility: true
}'>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle' xName='x' 
            high='high' low='low' open='open' close='close'
            name='Stock A' [visible]='true'>
        </e-stockchart-series>
        <e-stockchart-series type='Line' xName='x' yName='ma20'
            name='MA 20' [visible]='true'>
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**User Interaction:** Click legend item → series appears/disappears

### Default Visibility Control

```typescript
<e-stockchart-series type='Line' xName='x' yName='volume'
    name='Volume' [visible]='false'>  <!-- Hidden by default -->
</e-stockchart-series>
```

### Programmatic Toggle

```typescript
export class StockChartComponent {
    @ViewChild('chart') chart: StockChartComponent;

    toggleSeries(index: number) {
        const series = this.chart.series[index];
        series.visible = !series.visible;
        this.chart.refresh();
    }
}
```

Template:
```typescript
<button (click)="toggleSeries(1)">Toggle MA 20</button>
```

## Legend with Multiple Series

### Organizing Many Series

When you have 5+ series (price + 3 indicators + volume), legends help organize:

```typescript
<ejs-stockchart [legendSettings]='{ 
    visible: true,
    position: "Right",
    width: "200px"
}'>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle' name='Stock Price'></e-stockchart-series>
        <e-stockchart-series type='Line' name='MA 20' yAxisName='secondary'></e-stockchart-series>
        <e-stockchart-series type='Line' name='MA 50' yAxisName='secondary'></e-stockchart-series>
        <e-stockchart-series type='Line' name='EMA 12' yAxisName='secondary'></e-stockchart-series>
        <e-stockchart-series type='Column' name='Volume' yAxisName='secondary'></e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

### Wrapping Legend Items

For many items in limited space:

```typescript
[legendSettings]='{ 
    width: "250px"
}'
```

## Common Legend Patterns

### Pattern 1: Simple Legend Below Chart

```typescript
[legendSettings]='{ 
    position: "Bottom",
    alignment: "Center",
    visible: true
}'
```

### Pattern 2: Compact Right-Side Legend

```typescript
[legendSettings]='{ 
    position: "Right",
    alignment: "Center",
    width: "150px",
    shapeWidth: 10,
    shapeHeight: 10
}'
```

### Pattern 3: Top Legend with Toggle

```typescript
[legendSettings]='{ 
    position: "Top",
    visible: true,
    toggleVisibility: true,
    textStyle: { size: "12px" }
}'
```

### Pattern 4: Custom Positioned Legend (Overlay)

```typescript
[legendSettings]='{ 
    position: "Custom",
    location: { x: 85, y: 10 },
    background: "rgba(255, 255, 255, 0.9)",
    border: { color: "#CCCCCC", width: 1 }
}'
```

## Troubleshooting

**Issue: Legend not showing**
- Verify `visible: true`
- Ensure series have `name` property set
- Check browser console for errors

**Issue: Legend items overlap chart**
- Use `position: "Right"` or `"Left"` instead of overlaying
- Or use `location` to move custom positioned legend

**Issue: Legend items too cramped**
- Increase `width` for horizontal legends
- Use `mode: "Vertical"` to stack items
- Reduce `padding` or `shapeWidth`

**Issue: Series toggle doesn't work**
- Enable `toggleSeriesVisibility: true`
- Verify clicking legend item (not just hovering)
- Check browser console for JavaScript errors
