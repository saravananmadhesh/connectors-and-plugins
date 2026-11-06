# Axis Customization

## Table of Contents
- [Overview](#overview)
- [Primary and Secondary Axes](#primary-and-secondary-axes)
  - [Primary X-Axis (DateTime)](#primary-x-axis-datetime)
  - [Primary Y-Axis (Numeric Price)](#primary-y-axis-numeric-price)
  - [Secondary Y-Axis (Volume, Indicators)](#secondary-y-axis-volume-indicators)
- [Axis Types](#axis-types)
  - [DateTime Axis (Recommended for Stock Charts)](#datetime-axis-recommended-for-stock-charts)
  - [Numeric Axis](#numeric-axis)
  - [Category Axis](#category-axis)
  - [Logarithmic Axis](#logarithmic-axis)
- [Axis Labels and Formatting](#axis-labels-and-formatting)
  - [Custom Label Formatting](#custom-label-formatting)
  - [Hiding/Showing Labels](#hidingshowing-labels)
  - [Label Angle](#label-angle)
- [Axis Title](#axis-title)
  - [Adding Axis Titles](#adding-axis-titles)
  - [Title Positioning](#title-positioning)
- [Axis Ranges and Scaling](#axis-ranges-and-scaling)
  - [Fixed Range (Manual Scaling)](#fixed-range-manual-scaling)
  - [Auto Range (Default)](#auto-range-default)
  - [Interval Configuration](#interval-configuration)
- [Crosshair Configuration](#crosshair-configuration)
  - [Basic Crosshair](#basic-crosshair)
  - [Crosshair Types](#crosshair-types)
  - [Crosshair with Tooltip Integration](#crosshair-with-tooltip-integration)
  - [Customizing Crosshair Style](#customizing-crosshair-style)
- [Zooming and Panning](#zooming-and-panning)
  - [Enable Zooming](#enable-zooming)
  - [Range Zooming](#range-zooming)
- [Common Axis Patterns](#common-axis-patterns)
  - [Pattern 1: Stock Price Display with Currency](#pattern-1-stock-price-display-with-currency)
  - [Pattern 2: DateTime with Monthly Labels](#pattern-2-datetime-with-monthly-labels)
  - [Pattern 3: Volume with Secondary Axis](#pattern-3-volume-with-secondary-axis)
  - [Pattern 4: Logarithmic for Wide Price Ranges](#pattern-4-logarithmic-for-wide-price-ranges)
---

## Overview

Stock Chart uses axes to map data to pixel coordinates. By default:
- **X-Axis (Primary):** DateTime axis for dates
- **Y-Axis (Primary):** Numeric axis for prices
- **Y-Axis (Secondary):** Optional secondary axis for volume or indicators

---

## Primary and Secondary Axes

### Primary X-Axis (DateTime)

Stock charts require a DateTime x-axis to properly handle date-based financial data:

```typescript
<ejs-stockchart [primaryXAxis]='{ 
    valueType: "DateTime", 
    edgelabelPlacement: "Shift" 
}'>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle' xName='x' high='high' low='low' open='open' close='close'>
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**Key Properties:**
- `valueType`: 'DateTime' (required for dates)
- `edgelabelPlacement`: 'Shift' (prevents edge labels from being cut off)
- `labelFormat`: Custom date format (e.g., 'dd MMM yyyy')

### Primary Y-Axis (Numeric Price)

```typescript
<ejs-stockchart [primaryYAxis]='{ 
    labelFormat: "{value}.00",
    minimum: 0,
    maximum: 200 
}'>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle' xName='x' high='high' low='low' open='open' close='close'>
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**Key Properties:**
- `labelFormat`: Number formatting ("${value}", "{value}%", etc.)
- `minimum`, `maximum`: Fixed value range
- `interval`: Spacing between major gridlines

### Secondary Y-Axis (Volume, Indicators)

Use a secondary axis for data with different scales (e.g., volume bars alongside price candles):

```typescript
<ejs-stockchart [primaryYAxis]='{ title: "Price"}'>
 <e-stockchart-axes>
            <e-stockchart-axis title='Volume' labelFormat= "{value}M">
            </e-stockchart-axis>
        </e-stockchart-axes>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle' xName='x' high='high' low='low' open='open' close='close'>
        </e-stockchart-series>
        <e-stockchart-series type='Column' xName='x' yName='volume' yAxisName='secondary'>
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**Use Cases:**
- Volume (separate scale, usually in millions)
- Technical indicators (RSI 0-100, MACD values)
- Multiple stocks with different price ranges

---

## Axis Types

### DateTime Axis (Recommended for Stock Charts)

Automatically handles date spacing, formatting, and zooming for financial data:

```typescript
[primaryXAxis]='{ 
    valueType: "DateTime",
    intervalType: "Days",
    interval: 1,
    labelFormat: "dd MMM"
}'
```

**Interval Types:**
- `'Years'`: Yearly intervals
- `'Months'`: Monthly intervals
- `'Days'`: Daily intervals (default for intraday data)
- `'Hours'`: Hourly intervals
- `'Minutes'`: Minute intervals

**Label Formats:**
- `'dd MMM'`: "01 Jan"
- `'MMM yyyy'`: "Jan 2023"
- `'dd MMM yyyy'`: "01 Jan 2023"
- `'hh:mm:ss'`: "09:30:00" (for intraday)

### Numeric Axis

For non-date x-axis (index-based, sequential):

```typescript
[primaryXAxis]='{ 
    valueType: "Double"
}'
```

### Category Axis

For text-based categories (rarely used in stock charts):

```typescript
[primaryXAxis]='{ 
    valueType: "Category"
}'
```

### Logarithmic Axis

For price comparison across wide ranges:

```typescript
[primaryYAxis]='{ 
    valueType: "Logarithmic",
    logBase: 10
}'
```

**When to Use:** Comparing stocks with vastly different prices (e.g., $10 vs $500 stock)

---

## Axis Labels and Formatting

### Custom Label Formatting

**Format Strings:**
- `{value}`: Numeric value
- `${value}`: Currency
- `{value}%`: Percentage
- `{value}M`: Millions (custom suffix)

```typescript
[primaryYAxis]='{ 
    labelFormat: "${value}.00"  // $100.00
}'

[primaryXAxis]='{ 
    labelFormat: "dd MMM yyyy"  // 01 Jan 2023
}'
```

### Hiding/Showing Labels

```typescript
[primaryXAxis]='{ 
    labelStyle: { color: "transparent" }  // Hide labels
}'
```

### Label Angle

```typescript
[primaryXAxis]='{ 
    labelIntersectAction: "Rotate45"  // Angle when labels overlap
}'
```

---

## Axis Title

### Adding Axis Titles

```typescript
<ejs-stockchart 
    [primaryXAxis]='{ 
        title: "Date"
    }' 
    [primaryYAxis]='{ 
        title: "Price ($)"
    }'>
</ejs-stockchart>
```

### Title Positioning

```typescript
titleStyle: { 
    textAlignment: 'Far'
}
```

---

## Axis Ranges and Scaling

### Fixed Range (Manual Scaling)

```typescript
<ejs-stockchart [primaryYAxis]='{ 
    minimum: 90,
    maximum: 150,
    interval: 10  // Gridline every 10 units
}'>
</ejs-stockchart>
```

**Use When:** You want consistent price range (e.g., comparing multiple stocks or time periods with same scale).

### Auto Range (Default)

```typescript
<ejs-stockchart [primaryYAxis]='{ 
    rangePadding: "Additional"  // Add 5% padding around min/max
}'>
</ejs-stockchart>
```

**rangePadding Options:**
- `'Additional'`: Add 5% above/below min/max (default)
- `'Normal'`: Add 3% padding
- `'None'`: Exact min/max from data

### Interval Configuration

```typescript
[primaryYAxis]='{ 
    interval: 25,  // Gridline every 25 units
    majorGridLines: { width: 1, color: "#E0E0E0" },
    minorTicksPerInterval: 4  // 4 minor ticks between majors
}'
```

---

## Crosshair Configuration

Crosshair helps users inspect precise values at any point on the chart:

### Basic Crosshair

```typescript
<ejs-stockchart [crosshair]='{ 
    enable: true,
    lineType: "Vertical",
    line: { width: 1, color: "#FF0000" }
}'>
</ejs-stockchart>
```

### Crosshair Types

```typescript
[crosshair]='{ 
    lineType: "Vertical"   // Vertical line only
    // OR
    lineType: "Horizontal" // Horizontal line only
    // OR
    lineType: "Both"       // Both vertical and horizontal
}'
```

### Crosshair with Tooltip Integration

```typescript
<ejs-stockchart 
    [crosshair]='{ enable: true, lineType: "Both" }'
    [tooltip]='{ enable: true }'>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle' xName='x' high='high' low='low' open='open' close='close'>
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**User Interaction:** Hover over chart → crosshair appears → tooltip shows exact values

### Customizing Crosshair Style

```typescript
[crosshair]='{ 
    enable: true,
    lineType: "Both",
    line: { 
        width: 2, 
        color: "#0099FF",
        dashArray: "5,5"  // Dashed line
    },
    lineStyle: "Dashed"
}'
```

---

## Zooming and Panning

### Enable Zooming

```typescript
<ejs-stockchart [zoomSettings]='{ 
    enableSelectionZooming: true,
    mode: "XY",
    toolbarItems: ["Pan", "Zoom", "Reset"]
}'>
</ejs-stockchart>
```

**Zoom Modes:**
- `'X'`: Zoom horizontally (time axis)
- `'Y'`: Zoom vertically (price axis)
- `'XY'`: Zoom both directions

**Zoom Interactions:**
- **Selection Zoom:** Drag to select area, zoom into it
- **Pan:** Drag after zoom to move around
- **Reset:** Return to original view

### Range Zooming

```typescript
<ejs-stockchart [zoomSettings]='{ 
    enableScrollbar: true,
    enablePan: true
}'>
</ejs-stockchart>
```


---

## Common Axis Patterns

### Pattern 1: Stock Price Display with Currency

```typescript
[primaryYAxis]='{ 
    labelFormat: "${value}.00",
    title: "Price",
    minimum: 0,
    rangePadding: "Additional"
}'
```

### Pattern 2: DateTime with Monthly Labels

```typescript
[primaryXAxis]='{ 
    valueType: "DateTime",
    intervalType: "Months",
    interval: 1,
    labelFormat: "MMM yyyy"
}'
```

### Pattern 3: Volume with Secondary Axis

```typescript
[primaryYAxis]='{ 
    title:  "Price ($)"
}' 
[secondaryYAxis]='{ 
    title: "Volume (M)"
}'
```

Then in series:
```typescript
<e-stockchart-series type='Column' xName='x' yName='volume' yAxisName='secondary'>
</e-stockchart-series>
```

### Pattern 4: Logarithmic for Wide Price Ranges

```typescript
[primaryYAxis]='{ 
    valueType: "Logarithmic",
    title: "Price (Log Scale)" 
}'
```

**Use:** Comparing $5 stock with $500 stock on same chart
