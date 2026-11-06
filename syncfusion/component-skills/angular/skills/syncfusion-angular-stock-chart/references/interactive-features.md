# Interactive Features

## Table of Contents
- [Overview](#overview)
- [Range Selector](#range-selector)
  - [Basic Range Selector](#basic-range-selector)
- [Period Selector](#period-selector)
  - [Basic Period Selector](#basic-period-selector)
  - [Period Selector with Custom Buttons](#period-selector-with-custom-buttons)
- [Tooltips](#tooltips)
  - [Enable Tooltips](#enable-tooltips)
  - [Custom Tooltip Format](#custom-tooltip-format)
  - [Tooltip Styling](#tooltip-styling)
  - [Shared Tooltip (All Series at Once)](#shared-tooltip-all-series-at-once)
- [Crosshair](#crosshair)
  - [Enable Crosshair](#enable-crosshair)
  - [Crosshair with Custom Styling](#crosshair-with-custom-styling)
  - [Crosshair + Tooltip Integration](#crosshair--tooltip-integration)
- [Data Labels](#data-labels)
  - [Enable Data Labels](#enable-data-labels)
  - [Data Label Format](#data-label-format)
  - [Formatted Data Labels](#formatted-data-labels)
- [User Interactions](#user-interactions)
  - [Zooming](#zooming)
  - [Panning](#panning)
- [Events](#events)
  - [onChartMouseMove](#onchartmousemove)
  - [onSeriesRender](#onseriesrender)
  - [onTooltipRender](#ontooltiprender)
- [Complete Interactive Example](#complete-interactive-example)


## Overview

Interactive features allow users to explore financial data effectively. Stock Chart provides:
- **Range Selector:** Date range selection buttons
- **Period Selector:** Quick timeframe shortcuts (1M, 3M, 1Y, All)
- **Tooltips:** Value display on hover
- **Crosshair:** Precise value inspection
- **Data Labels:** Display values on chart
- **Events:** Respond to user actions

---

## Range Selector

Range Selector displays buttons to select date ranges, common in stock chart applications.

### Basic Range Selector

```typescript
<ejs-stockchart>
    <e-stockchart-series-collection>
        <e-stockchart-series [dataSource]='chartData'  type='Candle' xName='x' 
            high='high' low='low' open='open' close='close'>
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**Result:** Buttons showing "1M", "3M", "6M", "1Y", "All" above the chart. Clicking each filters data to that range.

## Period Selector

Period Selector provides quick buttons for common time periods (alternative to Range Selector or used together).

### Basic Period Selector

```typescript
<ejs-stockchart [periods]='periods'>
</ejs-stockchart>

this.periods = [
            { intervalType: 'Minutes', interval: 1, text: '1m' },
            { intervalType: 'Minutes', interval: 30, text: '30m' },
            { intervalType: 'Hours', interval: 1, text: '1H' },
            { intervalType: 'Hours', interval: 12, text: '12H', selected: true },
            { intervalType: 'Auto', text: '1D' }
];
```

### Period Selector with Custom Buttons

```typescript
<ejs-stockchart [periods]='periods'>
this.periods = [
        { text: "1M", interval: 1, intervalType: "Months" },
        { text: "3M", interval: 3, intervalType: "Months" },
        { text: "6M", interval: 6, intervalType: "Months" },
        { text: "1Y", interval: 1, intervalType: "Years" }
    ]'
```

## Tooltips

Tooltips display detailed information when users hover over data points in the Stock Chart.

### Enable Tooltips

```typescript
<ejs-stockchart [tooltip]="{ enable: true }">
    <e-stockchart-series-collection>
        <e-stockchart-series
            type="Candle"
            xName="x"
            high="high"
            low="low"
            open="open"
            close="close"
            name="Stock A">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**User Interaction:** Hover over a candle to display a tooltip containing the corresponding OHLC values.

### Custom Tooltip Format

The tooltip content can be customized using supported point and series tokens in the `format` property.

```typescript
public tooltipConfig: Object = {
    enable: true,
    format: '<b>${point.x}</b><br/>' +
        'Open: ${point.open} | High: ${point.high}<br/>' +
        'Low: ${point.low} | Close: ${point.close}'
};
```

```html
<ejs-stockchart [tooltip]="tooltipConfig">
    <e-stockchart-series-collection>
        <e-stockchart-series
            type="Candle"
            xName="x"
            high="high"
            low="low"
            open="open"
            close="close"
            name="Stock A">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**Supported tokens include:**

- `${point.x}`: Displays the DateTime or category value of the stock-chart point.
- `${point.y}`: Displays the numeric y-value of the point for series such as Line, Spline, or Area.
- `${point.open}`: Displays the opening price.
- `${point.high}`: Displays the highest price.
- `${point.low}`: Displays the lowest price.
- `${point.close}`: Displays the closing price.
- `${point.volume}`: Displays the volume value when volume data is available.
- `${series.name}`: Displays the name assigned to the stock-chart series.
- `${series.type}`: Displays the rendering type of the stock-chart series.
- `${series.opacity}`: Displays the opacity configured for the series.

### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows point and series values to be formatted without using additional events.

Add a colon (`:`) followed by the required format specifier to a supported tooltip token.

```typescript
public tooltipConfig: Object = {
    enable: true,
    format: '${series.name} (${series.type})<br>' +
        '${point.x:MMM yyyy}<br>' +
        'Open: ${point.open:n2} | High: ${point.high:n2}<br>' +
        'Low: ${point.low:n2} | Close: ${point.close:n2}<br>' +
        'Volume: ${point.volume:n0}<br>' +
        'Opacity: ${series.opacity:n2}'
};
```

```html
<ejs-stockchart [tooltip]="tooltipConfig">
    <e-stockchart-series-collection>
        <e-stockchart-series
            [dataSource]="stockData"
            type="Candle"
            xName="x"
            high="high"
            low="low"
            open="open"
            close="close"
            volume="volume"
            name="Stock A">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

In this example:

- `${point.x:MMM yyyy}` formats the point's DateTime value as an abbreviated month and four-digit year.
- `${point.open:n2}` formats the opening price with two decimal places.
- `${point.high:n2}` formats the highest price with two decimal places.
- `${point.low:n2}` formats the lowest price with two decimal places.
- `${point.close:n2}` formats the closing price with two decimal places.
- `${point.volume:n0}` formats the volume without decimal places.
- `${series.opacity:n2}` formats the series opacity with two decimal places.
- `${series.name}` and `${series.type}` display their resolved string values.

Inline formatting can be applied to the following tooltip tokens:

- `point.x`: Specifies the DateTime or category value of the stock-chart point.
- `point.y`: Specifies the numeric y-value used by series such as Line, Spline, or Area.
- `point.open`: Specifies the opening price of an OHLC point.
- `point.high`: Specifies the highest price of an OHLC point.
- `point.low`: Specifies the lowest price of an OHLC point.
- `point.close`: Specifies the closing price of an OHLC point.
- `point.volume`: Specifies the volume associated with the stock-chart point.
- `series.name`: Specifies the name assigned to the stock-chart series.
- `series.type`: Specifies the rendering type of the stock-chart series.
- `series.opacity`: Specifies the opacity applied to the stock-chart series.

> The availability of point-specific tokens depends on the series type and data-source configuration. For example, `point.open`, `point.high`, `point.low`, and `point.close` require the corresponding OHLC field mappings. The `point.volume` token requires a mapped volume value. The `series.name` and `series.type` tokens return string values, so DateTime or number formatting is not applied to these tokens.

Supported DateTime format specifiers include:

- `MMM yyyy`: Abbreviated month and four-digit year.
- `MM:yy`: Two-digit month and two-digit year.
- `dd MMM`: Two-digit day and abbreviated month.

Supported number format specifiers include:

- `n2`: Number with two decimal places.
- `n0`: Number without decimal places.
- `c2`: Currency with two decimal places.
- `p1`: Percentage with one decimal place.
- `e1`: Exponential notation with one decimal place.

```typescript
public tooltipConfig: Object = {
    enable: true,
    format: 'Date: ${point.x:dd MMM}<br>' +
        'Open: ${point.open:c2}<br>' +
        'High: ${point.high:c2}<br>' +
        'Low: ${point.low:c2}<br>' +
        'Close: ${point.close:c2}<br>' +
        'Volume: ${point.volume:n0}'
};
```

If a format specifier does not match the resolved value type, the original value is displayed.

Do not use Angular pipes inside the tooltip `format` string. Use a supported inline format specifier, such as `${point.close:n2}`, or handle specialized formatting through the `tooltipRender` event.

### Tooltip Styling

The tooltip appearance can be customized using the `textStyle`, `opacity`, and `border` properties.

```typescript
public tooltipConfig: Object = {
    enable: true,
    textStyle: {
        color: '#FFFFFF',
        fontFamily: 'Arial',
        size: '13px'
    },
    opacity: 0.95,
    border: {
        color: '#333333',
        width: 1
    }
};
```

```html
<ejs-stockchart [tooltip]="tooltipConfig">
    <e-stockchart-series-collection>
        <e-stockchart-series
            [dataSource]="stockData"
            type="Candle"
            xName="x"
            high="high"
            low="low"
            open="open"
            close="close">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

### Shared Tooltip (All Series at Once)

Enable the `shared` property to display values from all applicable series in a single tooltip.

```typescript
public tooltipConfig: Object = {
    enable: true,
    shared: true
};
```

```html
<ejs-stockchart [tooltip]="tooltipConfig">
    <e-stockchart-series-collection>
        <e-stockchart-series
            [dataSource]="stockData"
            type="Candle"
            xName="x"
            high="high"
            low="low"
            open="open"
            close="close"
            name="Stock A">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

When shared tooltip mode is enabled, the Stock Chart displays the values of all applicable series for the hovered x-axis position.

---

## Crosshair

Crosshair helps users pinpoint exact values by showing lines on both axes.

### Enable Crosshair

```typescript
<ejs-stockchart [crosshair]='{ 
    enable: true,
    lineType: "Both"  // Vertical, Horizontal, Both
}'>
</ejs-stockchart>
```

### Crosshair with Custom Styling

```typescript
[crosshair]='{ 
    enable: true,
            lineType: "Both",
            line: { 
                width: 1, 
                color: "#FF0000",
                dashArray: "0"
    }
}'
```

### Crosshair + Tooltip Integration

```typescript
<ejs-stockchart 
    [crosshair]='{ 
        enable: true, 
        lineType: "Vertical",
        line: { width: 1, color: "#0099FF" }
    }'
    [tooltip]='{ 
        enable: true,
        format: 'High: ${point.high}<br/>Low: ${point.low}<br/>Close: ${point.close}'
    }'>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle' xName='x' 
            high='high' low='low' open='open' close='close'>
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**User Interaction:** Move mouse over chart → crosshair appears with tooltip showing precise OHLC values

---

## Data Labels

Display values directly on chart elements (candles, lines, columns).

### Enable Data Labels

```typescript
<e-stockchart-series type='Candle' xName='x' 
    high='high' low='low' open='open' close='close'
    [dataLabel]='{ visible: true }'>
</e-stockchart-series>
```

### Data Label Format

```typescript
[dataLabel]='{ 
    visible: true,
    position: "Middle"  // Top, Middle, Bottom
}'
```

### Formatted Data Labels

```typescript
[dataLabel]='{ 
    visible: true,
    format: "${point.close}",
    position: "Top",
    font: { 
        color: "#333333",
        size: "12px"
    }
}'
```

**When to Use Data Labels:**
- Small datasets (< 50 points)
- Highlighting specific values
- Printed or shared reports
- **Avoid:** Large datasets (100+ points cause visual clutter)

---

## User Interactions

### Zooming

Enable users to zoom into specific time ranges:

```typescript
<ejs-stockchart [zoomSettings]='{ 
        enableSelectionZooming: true,
        enablePan: true,
        mode: "XY",
        enableScrollbar: true
}'>
</ejs-stockchart>
```

**User Interactions:**
- **Drag to zoom:** Select area with mouse, release to zoom
- **Pan after zoom:** Drag to move around zoomed area
- **Scrollbar:** Slide scrollbar to navigate

### Panning

Allow users to scroll horizontally through time:

```typescript
[zoomSettings]='{ 
    enablePan: true,
    enableScrollbar: true
}'
```

---

## Events

Respond to user interactions with events:

### onChartMouseMove

Track mouse position over chart:

```typescript
<ejs-stockchart (mouseMove)='onChartMouseMove($event)'>
</ejs-stockchart>
```

```typescript
onChartMouseMove(args: any) {
    console.log('Mouse position:', args);
}
```

### onSeriesRender

Access series when rendering:

```typescript
<ejs-stockchart>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle' (seriesRender)='seriesRender($event)'>
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

```typescript
seriesRender(args: ISeriesRenderEventArgs): void {
    if (args.series.index  === 1) {
        argsseries.fill = '#00FF00';
    } 
}
```

### onTooltipRender

Customize tooltip content dynamically:

```typescript
<ejs-stockchart (tooltipRender)='onTooltipRender($event)'>
</ejs-stockchart>
```

```typescript
onTooltipRender(args: ITooltipRenderEventArgs): void {
    // Customize tooltip before displaying
    if (args.data.pointIndex % 2 === 0) {
        args.text = 'Custom: ' + args.text;
    }
}
```

---

## Complete Interactive Example

Combining all interactive features:

```typescript
<ejs-stockchart 
    id='stockchart'
    [dataSource]='data'
    [periods]='periods'
    [crosshair]='{ enable: true, lineType: "Vertical" }'
    [tooltip]='{ 
        enable: true,
        format: '<b>Date:</b> ${point.x}<br/><b>O:</b> ${point.open} <b>H:</b> ${point.high}<br/><b>L:</b> ${point.low} <b>C:</b> ${point.close}'
    }'
    [zoomSettings]='{ 
        enableSelectionZooming: true,
        mode: "XY",
        enableScrollbar: true
    }'>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle' xName='x' 
            high='high' low='low' open='open' close='close'
            name='AAPL'>
        </e-stockchart-series>  
    </e-stockchart-series-collection>
</ejs-stockchart>

this.periods = [
            { intervalType: 'Minutes', interval: 1, text: '1m' },
            { intervalType: 'Minutes', interval: 30, text: '30m' },
            { intervalType: 'Hours', interval: 1, text: '1H' },
            { intervalType: 'Hours', interval: 12, text: '12H', selected: true },
            { intervalType: 'Auto', text: '1D' }
];
```

**User Experience:**
1. See last year of data
2. Click "1M" to zoom to recent month
3. Hover over candle → crosshair + tooltip appear
4. Drag to zoom into specific period
5. Use scrollbar to pan through data
