# Legend Customization

## Table of Contents
- [Enabling Legends](#enabling-legends)
- [Legend Positioning](#legend-positioning)
    - [Available Positions](#available-positions)
- [Legend Alignment](#legend-alignment)
    - [Alignment Options](#alignment-options)
- [Legend Size & Appearance](#legend-size--appearance)
    - [Custom Width and Height](#custom-width-and-height)
    - [Legend Icon Shape](#legend-icon-shape)
- [Legend Item Customization](#legend-item-customization)
    - [Item Size](#item-size)
    - [Item Spacing](#item-spacing)
- [Legend Title](#legend-title)
    - [Title Position Options](#title-position-options)
    - [Title Font Customization](#title-font-customization)
- [Legend Templates](#legend-templates)
- [Hiding Legend Items](#hiding-legend-items)
    - [Skip Legend for Specific Series](#skip-legend-for-specific-series)
    - [Toggle Visibility](#toggle-visibility)
    - [Disable Toggle Interaction](#disable-toggle-interaction)
-[Complete Legend Example](#complete-legend-example)

## Enabling Legends

Legends provide information about the series rendered in the Stock Chart. Enable legends using the `legendSettings` property.

**Basic legend enablement:**

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-legendsettings visible="true">
    </e-stockchart-legendsettings>
    
    <e-stockchart-series-collection>
        <e-stockchart-series 
            name="Stock Price"
            dataSource="stockData" 
            xName="x" 
            yName="close" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

**Important:** Set the `name` property on each series to display meaningful labels in the legend.

### Legend API Properties

**API Property:** `legendSettings`

**Type:** `StockChartStockChartLegendSettings`

**Default:** `null`

**Description:** Configures the legend appearance, position, and behavior.

**Key Properties:**
- `visible`: Show/hide legend (bool, default: true)
- `position`: Legend position - Top, Bottom, Left, Right, Custom (default: Bottom)
- `alignment`: Horizontal alignment - Near, Center, Far (default: Center)
- `width`: Legend width (string or number)
- `height`: Legend height (string or number)
- `x`: X-coordinate for Custom position
- `y`: Y-coordinate for Custom position
- `toggleVisibility`: Enable click to toggle series visibility (bool, default: true)
- `title`: Legend title text
- `titlePosition`: Title position - Top, Left, Right
- `shapeWidth`: Icon shape width (number, default: 10)
- `shapeHeight`: Icon shape height (number, default: 10)

## Legend Positioning

Control where the legend appears relative to the chart using the `position` property.

### Available Positions

**Bottom (Default):**
```cshtml
<e-stockchart-legendsettings visible="true" position="Bottom">
</e-stockchart-legendsettings>
```

**Top:**
```cshtml
<e-stockchart-legendsettings visible="true" position="Top">
</e-stockchart-legendsettings>
```

**Left:**
```cshtml
<e-stockchart-legendsettings visible="true" position="Left">
</e-stockchart-legendsettings>
```

**Right:**
```cshtml
<e-stockchart-legendsettings visible="true" position="Right">
</e-stockchart-legendsettings>
```

**Custom Position:**
For arbitrary positioning, use Custom position with x and y coordinates:

```cshtml
<e-stockchart-legendsettings visible="true" position="Custom">
    <e-stockchartlegendsettings-location x="100" y="50"></e-stockchartlegendsettings-location>
</e-stockchart-legendsettings>
```

The x and y values represent pixel offsets from the top-left corner of the chart.

## Legend Alignment

When legend is positioned horizontally (Top/Bottom), align it relative to the chart using the `alignment` property.

### Alignment Options

**Center (Default):**
```cshtml
<e-stockchart-legendsettings 
    visible="true" 
    position="Bottom" 
    alignment="Center">
</e-stockchart-legendsettings>
```

**Near (Left side):**
```cshtml
<e-stockchart-legendsettings 
    visible="true" 
    position="Bottom" 
    alignment="Near">
</e-stockchart-legendsettings>
```

**Far (Right side):**
```cshtml
<e-stockchart-legendsettings 
    visible="true" 
    position="Bottom" 
    alignment="Far">
</e-stockchart-legendsettings>
```

## Legend Size & Appearance

### Custom Width and Height

Control legend dimensions with `width` and `height` properties:

```cshtml
<e-stockchart-legendsettings 
    visible="true" 
    position="Right" 
    width="200" 
    height="300">
</e-stockchart-legendsettings>
```

By default:
- Horizontal position (Top/Bottom): Legend takes 20-25% of chart height
- Vertical position (Left/Right): Legend takes 20-25% of chart width

### Legend Icon Shape

Customize the shape of legend icons using the series `legendShape` property:

```cshtml
<e-stockchart-series 
    name="Stock Price"
    dataSource="stockData" 
    type="Candle"
    legendShape="Circle">
</e-stockchart-series>
```

Available shapes: Circle, Rectangle, Diamond, Triangle, Cross, Plus, HorizontalLine, VerticalLine, Pentagon, InvertedTriangle, SeriesType (default)

## Legend Item Customization

### Item Size

Customize individual legend item icon size:

```cshtml
<e-stockchart-legendsettings 
    visible="true" 
    shapeWidth="15" 
    shapeHeight="15">
</e-stockchart-legendsettings>
```

This adjusts the size of legend icons independently from the text.

### Item Spacing

Control spacing between legend items through CSS:

```css
.e-legend-item {
    margin-right: 20px;  /* Space between items */
    margin-bottom: 10px; /* Space between rows */
}
```

## Legend Title

Add a title to the legend and customize its appearance:

```cshtml
<e-stockchart-legendsettings visible="true" 
    title="Market Data"
    titlePosition="Top">
    <e-stockchartlegendsettings-titlestyle
        color="#000000" 
        size="16px" 
        fontWeight="Bold"
        fontFamily="Arial">
    </e-stockchartlegendsettings-titlestyle>
</e-stockchart-legendsettings>
```

### Title Position Options

- **Top**: Title appears above legend items
- **Left**: Title appears to the left of legend items
- **Right**: Title appears to the right of legend items

### Title Font Customization

Customize title font properties:

```cshtml
<e-stockchartlegendsettings-titlestyle
    color="#333333" 
    size="14px" 
    fontWeight="Normal"
    fontStyle="Italic"
    fontFamily="Verdana"
    opacity="0.8">
</e-stockchartlegendsettings-titlestyle>
```

## Legend Templates

Create custom legend item templates for branded styling or enhanced content:

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-legendsettings visible="true">
        <e-content-template>
            <span style="color: #0066ff; font-weight: bold;">${name}</span>
        </e-content-template>
    </e-stockchart-legendsettings>
</ejs-stockchart>
```

Template supports:
- HTML markup for rich content
- Data-binding: ${name}, ${color}, ${index}
- CSS styling for custom appearance
- Icons and images

**Note:** Legend interactions (click to toggle series visibility) remain enabled unless explicitly disabled.

## Hiding Legend Items

### Skip Legend for Specific Series

Prevent a series from appearing in the legend by setting an empty name:

```cshtml
<e-stockchart-series 
    name=""
    dataSource="stockData" 
    xName="x" 
    yName="close" 
    type="Candle">
</e-stockchart-series>
```

### Toggle Visibility

Use legend click to toggle series visibility. This is enabled by default:

```cshtml
<e-stockchart-legendsettings 
    visible="true" 
    toggleVisibility="true">
</e-stockchart-legendsettings>
```

Users can click legend items to show/hide the corresponding series in the chart.

### Disable Toggle Interaction

If you want legend items clickable but not to toggle visibility:

```cshtml
<e-stockchart-legendsettings 
    visible="true" 
    toggleVisibility="false">
</e-stockchart-legendsettings>
```

## Complete Legend Example

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-legendsettings 
        visible="true" 
        position="Bottom" 
        alignment="Center"
        width="100%"
        height="60"
        toggleVisibility="true"
        title="Stock Indicators"
        titlePosition="Top">
        <e-stockchartlegendsettings-titlestyle 
            color="#0066cc" 
            size="14px" 
            fontWeight="Bold">
        </e-stockchartlegendsettings-titlestyle>
    </e-stockchart-legendsettings>
    
    <e-stockchart-series-collection>
        <e-stockchart-series 
            name="AAPL"
            dataSource="appleData" 
            xName="x" 
            yName="close" 
            type="Candle"
            legendShape="Circle">
        </e-stockchart-series>
        
        <e-stockchart-series 
            name="MSFT"
            dataSource="microsoftData" 
            xName="x" 
            yName="close" 
            type="Candle"
            legendShape="Circle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

This creates a fully customized legend with:
- Bottom alignment
- Custom title
- Toggle visibility on click
- Two series with meaningful names
- Consistent icon shapes
