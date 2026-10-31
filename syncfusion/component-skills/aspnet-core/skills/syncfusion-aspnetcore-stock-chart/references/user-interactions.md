# User Interactions

## Table of Contents
- [Crosshair](#crosshair)
    - [Enable Crosshair](#enable-crosshair)
    - [Crosshair Line Configuration](#crosshair-line-configuration)
    - [Crosshair Customization](#crosshair-customization)
    - [Crosshair Tooltip](#crosshair-tooltip)
    - [Snap to Data Points](#snap-to-data-points)
    - [Crosshair Label Customization](#crosshair-label-customization)
- [Trackball](#trackball)
    - [Enable Trackball](#enable-trackball)
    - [Trackball Behavior](#trackball-behavior)
    - [Trackball with Multiple Series](#trackball-with-multiple-series)
- [Tooltip](#tooltip)
    - [Enable Tooltip](#enable-tooltip)
    - [Tooltip Customization](#tooltip-customization)
    - [Shared Tooltip (Trackball)](#shared-tooltip-trackball)
    - [Custom Tooltip Format](#custom-tooltip-format)
    - [Inline Tooltip Formatting](#inline-tooltip-formatting)
- [Selection](#selection)
    - [Point Selection](#point-selection)
    - [Series Selection](#series-selection)
    - [Selection Styling](#selection-styling)
- [Zoom & Pan](#zoom--pan)
    - [Enable Zoom](#enable-zoom)
    - [Zoom Toolbar](#zoom-toolbar)
    - [Enable Pan](#enable-pan)
- [Interaction Configuration](#interaction-configuration)
    - [Complete Interaction Setup](#complete-interaction-setup)
    - [Disable Specific Interactions](#disable-specific-interactions)
    - [Performance Tip](#performance-tip)

## Crosshair

Crosshairs display vertical and horizontal lines at the mouse position to help users read values from both axes.

### Enable Crosshair

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-crosshairsettings enable="true" lineType="Vertical">
    </e-stockchart-crosshairsettings>
</ejs-stockchart>
```

### Crosshair Line Configuration

**Line Type Options:**
- **Vertical**: Only vertical line
- **Horizontal**: Only horizontal line
- **Both**: Both vertical and horizontal lines (default)

```cshtml
<e-stockchart-crosshairsettings 
    enable="true" 
    lineType="Both">
</e-stockchart-crosshairsettings>
```

### Crosshair Customization

Customize line appearance:

```cshtml
<e-stockchart-crosshairsettings enable="true" lineType="Both">
    <e-crosshairsettings-line color="red" width="2" dashArray="5,5">
    </e-crosshairsettings-line>
</e-stockchart-crosshairsettings>
```

**Line Properties:**
- **color**: Line color (hex or named color)
- **width**: Line thickness in pixels
- **dashArray**: Dash pattern (e.g., "5,5" for dashed)

### Crosshair Tooltip

Display axis values in tooltip labels:

```cshtml
<e-stockchart-primaryxaxis valueType="DateTime">
    <e-crosshairtooltip enable="true">
    </e-crosshairtooltip>
</e-stockchart-primaryxaxis>

<e-stockchart-primaryyaxis>
    <e-crosshairtooltip enable="true">
    </e-crosshairtooltip>
</e-stockchart-primaryyaxis>
```

### Snap to Data Points

Align crosshair with nearest data point instead of exact mouse position:

```cshtml
<e-stockchart-crosshairsettings 
    enable="true" 
    snapToData="true">
</e-stockchart-crosshairsettings>
```

**Use case:** Precise value reading at actual data points

### Crosshair Label Customization

Customize crosshair label appearance:

```cshtml
<e-stockchart-crosshairsettings enable="true" lineType="Both">    
</e-stockchart-crosshairsettings>
<e-crosshairtooltip 
        enable="true" 
        fill="lightblue">
</e-crosshairtooltip>
```

### Crosshair API Properties

**API Property:** `crosshair`

**Type:** `StockChartCrosshairSettings`

**Default:** `null`

**Description:** Configures the crosshair feature that displays reference lines at mouse position.

**Key Properties:**
- `enabled`: Enable/disable crosshair (bool, default: false)
- `lineType`: Line type - Vertical, Horizontal, Both (default: Both)
- `snapToData`: Snap to nearest data point (bool, default: false)

**Sub-Properties (line):**
- `color`: Line color
- `width`: Line thickness
- `dashArray`: Dash pattern (e.g., "5,5")

## Trackball

Trackball highlights the closest data point to the mouse and displays information about it across all series.

### Enable Trackball

Enable trackball by setting crosshair and tooltip properties:

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-crosshairsettings enable="true">
    </e-stockchart-crosshairsettings>
    
    <e-stockchart-tooltipsettings enable="true" shared="true">
    </e-stockchart-tooltipsettings>
</ejs-stockchart>
```

**Important:** Set `shared="true"` on tooltip for trackball mode

### Trackball Behavior

- Automatically finds the nearest data point
- Shows marker at closest point
- Displays information for all series at that point
- Updates as user moves mouse

### Trackball with Multiple Series

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-crosshairsettings enable="true">
    </e-stockchart-crosshairsettings>
    
    <e-stockchart-tooltipsettings enable="true" shared="true">
        <e-stocktooltipsettings-textstyle color="white"></e-stocktooltipsettings-textstyle>
    </e-stockchart-tooltipsettings>
    
    <e-stockchart-series-collection>
        <e-stockchart-series 
            name="AAPL"
            dataSource="appleData" 
            xName="x" 
            yName="close" 
            type="Candle">
        </e-stockchart-series>
        
        <e-stockchart-series 
            name="MSFT"
            dataSource="microsoftData" 
            xName="x" 
            yName="close" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

Trackball shows values from both series at the closest data point.

## Tooltip

Tooltips display data point information on hover.

### Enable Tooltip

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-tooltipsettings enable="true">
    </e-stockchart-tooltipsettings>
</ejs-stockchart>
```

### Tooltip Customization

Customize tooltip appearance and behavior:

```cshtml
<e-stockchart-tooltipsettings 
    enable="true" 
    fill="lightyellow"
    duration="1000">
    <e-stocktooltipsettings-textstyle 
        color="black" 
        size="13px"
        fontFamily="Verdana">
    </e-stocktooltipsettings-textstyle>
</e-stockchart-tooltipsettings>
```

**Tooltip Properties:**
- **enabled**: Turn on/off
- **visible**: Show by default (without hover)
- **fill**: Background color
- **duration**: Display duration in milliseconds

### Shared Tooltip (Trackball)

Display single tooltip for all series:

```cshtml
<e-stockchart-tooltipsettings enable="true" shared="true">
</e-stockchart-tooltipsettings>
```

**Use case:** Compare values across multiple series at same data point

### Custom Tooltip Format

Define tooltip content format:

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-tooltipsettings enable="true" format="<b>${series.name}</b><br/>Date: ${point.x}<br/>Close: ${point.close}"></e-stockchart-tooltipsettings>
</ejs-stockchart>
```

Available template variables:
- ${seriesName}: Series name
- ${point.x}: X-axis value
- ${point.close}: Close price
- ${point.open}: Open price
- ${point.high}: High price
- ${point.low}: Low price
- ${point.volume}: Volume

### Inline Tooltip Formatting

Tooltip values can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows Stock Chart values to be formatted without using additional events.

Apply a format specifier by adding a colon (`:`) after the tooltip token, followed by the required format.

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-tooltipsettings
        enable="true"
        format="<b>${series.name}</b><br/>Date: ${point.x:MMM yyyy}<br/>Open: ${point.open:n2}<br/>High: ${point.high:n2}<br/>Low: ${point.low:n2}<br/>Close: ${point.close:n2}<br/>Volume: ${point.volume:n0}">
    </e-stockchart-tooltipsettings>

    <e-stockchart-primaryxaxis valueType="DateTime">
    </e-stockchart-primaryxaxis>

    <e-stockchart-series-collection>
        <e-stockchart-series
            name="AAPL"
            dataSource="stockData"
            xName="x"
            open="open"
            high="high"
            low="low"
            close="close"
            volume="volume"
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

In the above example:

- `${point.x:MMM yyyy}` displays the date using an abbreviated month and four-digit year.
- `${point.open:n2}` displays the opening price with two decimal places.
- `${point.high:n2}` displays the highest price with two decimal places.
- `${point.low:n2}` displays the lowest price with two decimal places.
- `${point.close:n2}` displays the closing price with two decimal places.
- `${point.volume:n0}` displays the volume without decimal places.

Inline formatting can be applied to the following tooltip tokens:

- `${point.x}` or `${point.x:MMM yyyy}`: Specifies the X-value, such as a DateTime or category value.
- `${point.y}` or `${point.y:n2}`: Specifies the numeric Y-value for series such as `Line`, `Spline`, and `Area`.
- `${point.open}` or `${point.open:n2}`: Specifies the opening price.
- `${point.high}` or `${point.high:n2}`: Specifies the highest price.
- `${point.low}` or `${point.low:n2}`: Specifies the lowest price.
- `${point.close}` or `${point.close:n2}`: Specifies the closing price.
- `${point.volume}` or `${point.volume:n0}`: Specifies the trading volume.
- `${series.name}`: Specifies the name assigned to the series.
- `${series.type}`: Specifies the rendering type of the series.
- `${series.opacity}` or `${series.opacity:n1}`: Specifies the opacity applied to the series.

> **Important:** The availability of point-specific tokens depends on the fields configured in the data source and the Stock Chart series type. The `${series.name}` and `${series.type}` tokens return string values, so DateTime or number formatting is not applied to them.

The following format types are supported:

**DateTime formats:**

- `MMM yyyy`: Displays the abbreviated month and four-digit year.
- `MM:yy`: Displays the two-digit month and year.
- `dd MMM`: Displays the two-digit day and abbreviated month.

**Number formats:**

- `n2`: Displays a number with two decimal places.
- `n0`: Displays a number without decimal places.
- `c2`: Displays the value in currency format with two decimal places.
- `p1`: Displays the value in percentage format with one decimal place.
- `e1`: Displays the value in exponential notation with one decimal place.

If the specified format does not match the resolved value type, the original value is displayed.

### Tooltip API Properties

**API Property:** `tooltip`

**Type:** `StockChartStockTooltipSettings`

**Default:** `null`

**Description:** Configures the tooltip that displays data point information on hover.

**Key Properties:**
- `enabled`: Enable/disable tooltip (bool, default: false)
- `visible`: Show tooltip without hover (bool, default: false)
- `shared`: Share tooltip across series (trackball mode) (bool, default: false)
- `fill`: Background color
- `opacity`: Opacity (0.0 to 1.0)
- `format`: Custom format string
- `duration`: Display duration in milliseconds
- `header`: Tooltip header text
- `enableAnimation`: Enable tooltip animation (bool, default: true)

**Sub-Properties (textStyle):**
- `color`: Text color
- `size`: Font size
- `fontFamily`: Font family
- `fontWeight`: Font weight
- `fontStyle`: Font style

## Selection

Enable users to select data points by clicking or dragging.

### Point Selection

```cshtml
<ejs-stockchart id="stockChart" selectionMode="Point">
</ejs-stockchart>
```

**Selection Modes:**
- **Point**: Individual data point selection
- **Series**: Entire series selection
- **Cluster**: Group of points selection

### Series Selection

```cshtml
<ejs-stockchart id="stockChart" selectionMode="Series">
</ejs-stockchart>
```

### Selection Styling

Customize selection appearance:

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="stockData" 
            xName="x" 
            yName="close" 
            type="Candle"
            selectionStyle="red"
            opacity="0.8">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

### Selection API Properties

**API Property:** `selectionMode`

**Type:** `SelectionMode` enum

**Default:** `SelectionMode.None`

**Description:** Specifies whether series or data point has to be selected.

**Available Values:**
- `None`: Disables selection
- `Point`: Selects individual data points
- `Series`: Selects entire series
- `Cluster`: Selects a cluster of points
- `DragXY`: Selects points by dragging (both axes)
- `DragX`: Selects points by dragging (horizontal axis only)
- `DragY`: Selects points by dragging (vertical axis only)

**API Property:** `isMultiSelect`

**Type:** `bool`

**Default:** `false`

**Description:** Enables multiple point/series selection. Requires `selectionMode` to be Point, Series, or Cluster.

**API Property:** `isSelect`

**Type:** `bool`

**Default:** `false`

**Description:** Enables the selection feature for the chart.

**API Property:** `selectedDataIndexes`

**Type:** `List<StockChartStockChartSelectedDataIndex>`

**Default:** `null`

**Description:** Specifies point indexes to pre-select while loading the chart. Requires appropriate `selectionMode`.

### Pre-select Data Points

```cshtml
<ejs-stockchart id="stockChart"
    selectionMode="Point"
    isMultiSelect="true">
    <e-stockchart-stockchartselecteddataindexes>
        <e-stockchart-stockchartselecteddataindex series="0" point="5"></e-stockchart-stockchartselecteddataindex>
        <e-stockchart-stockchartselecteddataindex series="0" point="10"></e-stockchart-stockchartselecteddataindex>
    </e-stockchart-stockchartselecteddataindexes>
</ejs-stockchart>
```

## Zoom & Pan

Enable users to zoom in/out and pan through data.

### Enable Zoom

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-zoomsettings enableSelectionZooming="true" mode="XY">
    </e-stockchart-zoomsettings>
</ejs-stockchart>
```

**Zoom Modes:**
- **X**: Horizontal zoom only
- **Y**: Vertical zoom only
- **XY**: Both axes (default)

### Zoom Toolbar

Built-in toolbar for zoom controls:

```cshtml
<e-stockchart-zoomsettings enableSelectionZooming="true"
                           mode="X"
                           toolbarItems="ViewBag.toolBarItems">
</e-stockchart-zoomsettings>
public IActionResult Index()
{
    ViewBag.toolBarItems = new string[] { "Zoom", "ZoomIn", "ZoomOut", "Pan", "Reset" };
    return View();
}
```

**Toolbar Items:**
- Zoom: Zoom mode
- ZoomIn: Zoom in button
- ZoomOut: Zoom out button
- Reset: Reset zoom
- Pan: Pan mode

### Enable Pan

```cshtml
<e-stockchart-zoomsettings 
    enableSelectionZooming="true" 
    enablePan="true" 
    mode="X">
</e-stockchart-zoomsettings>
```

### Zoom Settings API

**API Property:** `zoomSettings`

**Type:** `StockChartZoomSettings`

**Default:** `null`

**Description:** Configures zoom and pan features for the Stock Chart.

**Key Properties:**
- `enable`: Enable/disable zoom (bool, default: false)
- `mode`: Zoom mode - X, Y, or XY (default: XY)
- `enablePan`: Enable pan after zooming (bool, default: true)
- `enableMouseWheelZooming`: Zoom using mouse wheel (bool, default: false)
- `enablePinchZooming`: Zoom using pinch gesture on touch devices (bool, default: true)
- `enableSelectionZooming`: Zoom by selecting an area (bool, default: true)
- `toolbarItems`: Array of toolbar buttons to show

### Complete Zoom Configuration

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-zoomsettings 
        enableSelectionZooming="true"
        mode="X"
        enablePan="true"
        enableMouseWheelZooming="true"
        enablePinchZooming="true"
        enableSelectionZooming="true"
        toolbarItems='new string[] { "Zoom", "ZoomIn", "ZoomOut", "Pan", "Reset" }'>
    </e-stockchart-zoomsettings>
</ejs-stockchart>
```

### Mouse Wheel Zooming

```cshtml
<e-stockchart-zoomsettings 
    enableMouseWheelZooming="true">
</e-stockchart-zoomsettings>
```

Allows zooming with mouse scroll wheel without clicking zoom button.

### Pinch Zooming

```cshtml
<e-stockchart-zoomsettings 
    enablePinchZooming="true">
</e-stockchart-zoomsettings>
```

Enables pinch-to-zoom gesture on touch-enabled devices.

## Interaction Configuration

### Complete Interaction Setup

```cshtml
<ejs-stockchart id="stockChart" selectionMode="Point">
    <!-- Crosshair for precise reading -->
    <e-stockchart-crosshairsettings 
        enable="true" 
        lineType="Both"
        snapToData="true">
        <e-crosshairsettings-line color="red" width="1">
        </e-crosshairsettings-line>
    </e-stockchart-crosshairsettings>
    
    <!-- Tooltip for data information -->
    <e-stockchart-tooltipsettings 
        enable="true" 
        shared="true"
        fill="lightyellow">
        <e-stocktooltipsettings-textstyle color="black">
        </e-stocktooltipsettings-textstyle>
    </e-stockchart-tooltipsettings>
    
    <!-- Zoom and pan for navigation -->
    <e-stockchart-zoomsettings
        enableSelectionZooming="true" 
        enablePan="true" 
        mode="X"
        toolbarItems='new string[] { "Zoom", "ZoomIn", "ZoomOut", "Pan", "Reset" }'>
    </e-stockchart-zoomsettings>   
    
    <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="stockData" 
            xName="x" 
            yName="close" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

This configuration provides:
- Precise value reading (crosshair + tooltip)
- Easy navigation (zoom + pan)
- Data selection capabilities
- Professional user experience

### Disable Specific Interactions

```cshtml
<!-- Disable zoom -->
<e-stockchart-zoomsettings enableSelectionZooming="false">
</e-stockchart-zoomsettings>

<!-- Disable tooltip -->
<e-stockchart-tooltipsettings enable="false">
</e-stockchart-tooltipsettings>

<!-- Disable crosshair -->
<e-stockchart-crosshairsettings enable="false">
</e-stockchart-crosshairsettings>
```

### Performance Tip

For very large datasets, disable unnecessary interactions to improve performance:

```cshtml
<!-- Minimal configuration for large data -->
<ejs-stockchart id="stockChart">
    <e-stockchart-tooltipsettings enable="false">
    </e-stockchart-tooltipsettings>
    
    <e-stockchart-zoomsettings enableSelectionZooming="false">
    </e-stockchart-zoomsettings>
    
    <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="largeDataset" 
            xName="x" 
            yName="close" 
            type="Line">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```
