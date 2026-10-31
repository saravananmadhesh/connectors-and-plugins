# Series Types

## Table of Contents
- [Overview](#overview)
- [Line Series](#line-series)
  - [Basic Implementation](#basic-implementation)
  - [With Markers and Smooth Line](#with-markers-and-smooth-line)
  - [Customizing Line Appearance](#customizing-line-appearance)
- [Spline Series](#spline-series)
  - [Basic Implementation](#basic-implementation-1)
  - [Smooth Trend with Tension Control](#smooth-trend-with-tension-control)
  - [With Markers](#with-markers)
  - [When to Use Spline vs Line](#when-to-use-spline-vs-line)
- [Area Series](#area-series)
  - [Basic Implementation](#basic-implementation-2)
  - [Stacked Areas (Multiple Series)](#stacked-areas-multiple-series)
  - [Customizing Area Fill](#customizing-area-fill)
- [HiLo Series](#hilo-series)
  - [Basic Implementation](#basic-implementation-3)
  - [Use Cases](#use-cases)
- [HiLoOpenClose Series](#hiloopenclose-series)
  - [Basic Implementation](#basic-implementation-4)
  - [Visual Representation](#visual-representation)
- [Hollow Candle Series](#hollow-candle-series)
  - [Basic Implementation](#basic-implementation-5)
  - [Visual Difference from Candle](#visual-difference-from-candle)
  - [Use Cases](#use-cases-1)
- [Candle Series](#candle-series)
  - [Basic Implementation](#basic-implementation-6)
  - [Candle Visual Breakdown](#candle-visual-breakdown)
  - [Default Candle Colors](#default-candle-colors)
  - [Customizing Candle Colors](#customizing-candle-colors)
  - [Reading Candle Charts](#reading-candle-charts)
- [Switching Series Dynamically](#switching-series-dynamically)
- [Series Colors and Customization](#series-colors-and-customization)
  - [Individual Series Color](#individual-series-color)
  - [Series-Specific Properties](#series-specific-properties)

---

## Overview

Stock Chart supports 7 major series types for rendering financial data. Each type visualizes price movements differently and works best with specific use cases.

| Series Type | Best For | Shows |
|---|---|---|
| **Candle** | OHLC data, price trends | Open, High, Low, Close as candles |
| **HiLo** | Price range only | High and Low as bars |
| **HiLoOpenClose** | OHLC without volume | Open, High, Low, Close as bars |
| **Line** | Simple trends, moving averages | Price movement as lines |
| **Spline** | Smooth trends | Price movement as smooth curves |
| **Area** | Volume trends, cumulative values | Filled area under price curve |
| **Hollow Candle** | OHLC with hollow candles | Same as Candle but without fill |

---

## Line Series

**Use When:** Tracking simple price trends, displaying moving averages, or showing data with fewer visual details.

### Basic Implementation

```typescript
<ejs-stockchart id='chart-container' [dataSource]='data'>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Line' xName='x' yName='close'>
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**Key Properties:**
- `type`: 'Line'
- `yName`: Data field to plot on y-axis (typically closing price)
- `xName`: Date field for x-axis
- `marker`: Optional markers at data points

### With Markers and Smooth Line

```typescript
<e-stockchart-series type='Line' xName='x' yName='close'
    [marker]='{ visible: true, shape: "Circle", width: 4, height: 4 }'>
</e-stockchart-series>
```

### Customizing Line Appearance

```typescript
<e-stockchart-series type='Line' xName='x' yName='close'
    width='2' [marker]='{ visible: true }'
    dashArray='5'>
</e-stockchart-series>
```

**Properties:**
- `width`: Line thickness (default: 2)
- `dashArray`: Dashed line pattern ('5', '5,5', etc.)
- `marker.visible`: Show/hide data point markers
- `marker.shape`: Circle, Rectangle, Triangle, Diamond, etc.

---

## Spline Series

**Use When:** You want smooth interpolated curves between price points, creating visually appealing trends without breaking at data points.

### Basic Implementation

```typescript
<e-stockchart-series type='Spline' xName='x' yName='close'>
</e-stockchart-series>
```

Spline automatically calculates smooth curves between points using interpolation algorithms.

### Smooth Trend with Tension Control

```typescript
<e-stockchart-series type='Spline' xName='x' yName='close'
    splineType='Natural'>
</e-stockchart-series>
```

**Spline Types:**
- `'Natural'`: Default smooth curve (recommended for most cases)
- `'Monotonic'`: Smooth but prevents crossing axis unexpectedly
- `'Cardinal'`: Uses tension property for curve tightness
- `'Clamped'`: More pronounced curves at endpoints

### With Markers

```typescript
<e-stockchart-series type='Spline' xName='x' yName='close'
    splineType='Cardinal'
    [marker]='{ visible: true, shape: "Circle", width: 5, height: 5 }'>
</e-stockchart-series>
```

**When to Use Spline vs Line:**
- **Line:** Stock data (OHLC), when data points are important
- **Spline:** Technical indicators, trends, smooth visualizations

---

## Area Series

**Use When:** Showing volume trends, cumulative data, or emphasizing area under the curve.

### Basic Implementation

```typescript
<e-stockchart-series type='Area' xName='x' yName='close'>
</e-stockchart-series>
```

### Stacked Areas (Multiple Series)

```typescript
<e-stockchart-series-collection>
    <e-stockchart-series type='Area' xName='x' yName='close1' name='Stock A'>
    </e-stockchart-series>
    <e-stockchart-series type='Area' xName='x' yName='close2' name='Stock B'>
    </e-stockchart-series>
</e-stockchart-series-collection>
```

### Customizing Area Fill

```typescript
<e-stockchart-series type='Area' xName='x' yName='close'
    fill='rgba(100, 150, 200, 0.3)'>
</e-stockchart-series>
```

**Properties:**
- `interior`: Fill color and opacity
- `opacity`: Transparency level (0-1)
- `border.color`: Line color around area

---

## HiLo Series

**Use When:** Displaying price range (High and Low) without showing open/close values.

### Basic Implementation

```typescript
<e-stockchart-series type='Hilo' xName='x' high='high' low='low'>
</e-stockchart-series>
```

**Data Format:**
```typescript
{ x: new Date(2023, 0, 1), high: 105, low: 95 }
```

### Use Cases
- Showing price range with minimal visual clutter
- Comparing multiple instruments' ranges
- Focus on extreme values without OHLC details

---

## HiLoOpenClose Series

**Use When:** Displaying complete OHLC data with high/low as vertical lines and open/close as horizontal ticks (bar-style, without volume indication).

### Basic Implementation

```typescript
<e-stockchart-series type='HiloOpenClose' xName='x' 
    high='high' low='low' open='open' close='close'>
</e-stockchart-series>
```

### Visual Representation
- **Vertical Line:** High to Low range
- **Left Tick:** Opening price
- **Right Tick:** Closing price
- **Color:** Green if close > open, red if close < open

---

## Hollow Candle Series

**Use When:** Displaying OHLC data with transparent (hollow) candles instead of filled candles. Often used to show sessions or alternative time periods.

### Basic Implementation

```typescript
<e-stockchart-series type='Candle' xName='x' 
    high='high' low='low' open='open' close='close'
    enableSolidCandles='false'>
</e-stockchart-series>
```

**Visual Difference from Candle:**
- Candle: Filled rectangles (solid candles)
- Hollow Candle: Outlined rectangles (transparent bodies)

### Use Cases
- Showing intra-session vs end-of-day
- Comparing two periods with different visuals
- Alternative rendering preference

---

## Candle Series

**Use When:** Displaying traditional OHLC candlestick data. Most common for stock charts.

### Basic Implementation

```typescript
<e-stockchart-series type='Candle' xName='x' 
    high='high' low='low' open='open' close='close'>
</e-stockchart-series>
```

### Candle Visual Breakdown

**Anatomy of a Candle:**
- **Body (Rectangle):** Open to Close range
  - **Green/Up candle:** Close > Open (bullish)
  - **Red/Down candle:** Close < Open (bearish)
- **Wicks (Lines):** High and Low extremes
  - **Upper wick:** From Close (or Open) to High
  - **Lower wick:** From Open (or Close) to Low

### Default Candle Colors

```typescript
// Green candle (up): Close > Open
// Red candle (down): Close < Open
```

### Customizing Candle Colors

```typescript
<e-stockchart-series type='Candle' xName='x' 
    high='high' low='low' open='open' close='close'
    bearFillColor='#FF6B6B' bullFillColor='#51CF66'>
</e-stockchart-series>
```

**Properties:**
- `bearFillColor`: Color when close < open (default: red)
- `bullFillColor`: Color when close > open (default: green)
- `enableSolidCandles`: Use filled candles (true) or hollow (false)

### Reading Candle Charts

**Up Candle (Green):**
- **Body:** Shows opening and closing prices
- **Upper wick:** Distance to highest price
- **Lower wick:** Usually small (floor support)
- **Interpretation:** Buyers in control, bullish

**Down Candle (Red):**
- **Body:** Shows opening and closing prices
- **Lower wick:** Distance to lowest price
- **Upper wick:** Usually small (ceiling resistance)
- **Interpretation:** Sellers in control, bearish

---

## Switching Series Dynamically

Allow users to switch between series types via buttons or dropdown:

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { StockChartComponent } from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-stock',
    template: `
        <div>
            <button (click)="changeSeries('Candle')">Candlestick</button>
            <button (click)="changeSeries('Line')">Line</button>
            <button (click)="changeSeries('Area')">Area</button>
        </div>
        <ejs-stockchart #chart [dataSource]='data'>
            <e-stockchart-series-collection>
                <e-stockchart-series [type]='seriesType' xName='x' 
                    yName='close' high='high' low='low' open='open' close='close'>
                </e-stockchart-series>
            </e-stockchart-series-collection>
        </ejs-stockchart>
    `,
    encapsulation: ViewEncapsulation.None
})
export class StockChartComponent {
    @ViewChild('chart') chart: StockChartComponent;
    
    seriesType = 'Candle';
    data = [...]; // Your data

    changeSeries(type: string) {
        this.seriesType = type;
        // Chart re-renders with new series type
    }
}
```

**Performance Note:** Changing series type on large datasets (10k+ points) may cause lag. Consider debouncing or showing loading indicator.

---

## Series Colors and Customization


### Individual Series Color

```typescript
<e-stockchart-series type='Line' xName='x' yName='close'
    fill='#4ECDC4'>
</e-stockchart-series>
```

### Series-Specific Properties

```typescript
<e-stockchart-series type='Candle' xName='x' 
    high='high' low='low' open='open' close='close'
    width='2'
    bearFillColor='#FF0000'
    bullFillColor='#00FF00'
    [border]='borderConfig'
   >
</e-stockchart-series>
export class StockChartComponent {
    public borderConfig: any = {
    width: 2
  };
}
```

**Properties Across Series:**
- `fill`: Main color
- `width`: Line/border thickness
- `opacity`: Transparency (0-1)
- `dashArray`: Dashed pattern for lines
- `border`: Line border properties
