# Chart API Reference

Complete API reference for the Syncfusion ASP.NET Core Chart (`Syncfusion.EJ2.Charts.Chart`) component.

- **Official API Documentation:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart.html
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll`

## Table of Contents

- [Constructor](#constructor)
  - [Chart](#chart)
- [Configuration Properties](#configuration-properties)
  - [Basic Chart Configuration](#basic-chart-configuration)
  - [Theme and Appearance](#theme-and-appearance)
  - [Title and Subtitle Styling](#title-and-subtitle-styling)
  - [Chart Area](#chart-area)
- [Data Binding Properties](#data-binding-properties)
- [Display Properties](#display-properties)
  - [Axes Configuration](#axes-configuration)
  - [Panes Multiple Chart Areas](#panes-multiple-chart-areas)
  - [Axis Labels](#axis-labels)
  - [Legend](#legend)
  - [Data Labels](#data-labels)
  - [Tooltips](#tooltips)
  - [Markers and Shapes](#markers-and-shapes)
- [Interactivity Properties](#interactivity-properties)
  - [Selection](#selection)
  - [Highlighting](#highlighting)
  - [Crosshair](#crosshair)
  - [Zooming and Scrolling](#zooming-and-scrolling)
  - [Animation](#animation)
- [Advanced Feature Properties](#advanced-feature-properties)
- [WebMCP](#webmcp)
  - [Annotations](#annotations)
  - [Indicators Technical Analysis](#indicators-technical-analysis)
  - [Trendlines and Error Bars](#trendlines-and-error-bars)
  - [Strip Lines](#strip-lines)
  - [Stack Labels](#stack-labels)
  - [Range Color Settings](#range-color-settings)
- [Accessibility Properties](#accessibility-properties)
  - [Keyboard and Screen Reader Support](#keyboard-and-screen-reader-support)
  - [Focus Management](#focus-management)
  - [Persistence](#persistence)
- [Event Properties](#event-properties)
  - [Lifecycle Events](#lifecycle-events)
- [WebMCP Events](#webmcp-events)
  - [Series and Point Events](#series-and-point-events)
  - [Annotation Events](#annotation-events)
  - [Axis Events](#axis-events)
  - [Tooltip Events](#tooltip-events)
  - [Selection Events](#selection-events)
  - [Data Label Event](#data-label-event)
  - [Legend Event](#legend-event)
  - [Chart Interaction Events](#chart-interaction-events)
  - [Zoom and Scroll Events](#zoom-and-scroll-events)
  - [Animation Events](#animation-events)
  - [Export Events](#export-events)
  - [No Data Template](#no-data-template)
- [Series-Level Properties](#series-level-properties)
  - [Data Binding](#data-binding)
  - [Series Type and Appearance](#series-type-and-appearance)
  - [Data Point Customization](#data-point-customization)
  - [Interactivity](#interactivity)
  - [Advanced Series Options](#advanced-series-options)
- [Axis-Level Properties ChartAxis](#axis-level-properties-chartaxis)
  - [Axis Type and Range](#axis-type-and-range)
  - [Labels and Title](#labels-and-title)
  - [Customization](#customization)
- [Common Usage Patterns](#common-usage-patterns)
  - [Access Properties via Tag Helpers](#access-properties-via-tag-helpers)
  - [Common Property Combinations](#common-property-combinations)
- [Notes](#notes)

---

## Constructor

### Chart()
Creates a new instance of the Chart component.

---

## Configuration Properties

### Basic Chart Configuration
- **`title`** (string): [Chart title text displayed at the top](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchortitle)
- **`subTitle`** (string): [Subtitle displayed below the main title](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorsubtitle)
- **`description`** (string): [Accessibility description for the chart](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchordescription)
- **`width`** (string): [Chart width (e.g., '100%', '500px'). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorwidth)
- **`height`** (string): [Chart height (e.g., '400px', '100%'). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorheight)
- **`tabIndex`** (double): [Tab index for keyboard navigation. Default: 1](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchortabindex)

### Theme and Appearance
- **`theme`** (ChartTheme): [Visual theme for the chart. Supports: Material, MaterialDark, Fabric, FabricDark, Bootstrap, Bootstrap4, BootstrapDark, HighContrastLight, HighContrast, Tailwind, TailwindDark, Bootstrap5, Bootstrap5Dark, Fluent, FluentDark, Fluent2, Fluent2Dark, Fluent2HighContrast, Material3, Material3Dark. Default: ChartTheme.Material](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchortheme)
- **`background`** (string): [Background color (hex or rgba CSS color). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorbackground)
- **`backgroundImage`** (string): [Background image URL. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorbackgroundimage)
- **`palettes`** (string[]): [Custom color palette for series. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorpalettes)
- **`border`** (ChartBorder): [Border configuration (color, width). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorborder)
- **`margin`** (ChartMargin): [Chart margins (left, right, top, bottom). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchormargin)

### Title and Subtitle Styling
- **`titleStyle`** (ChartTitleSettings): [Title appearance customization (fontFamily, size, fontStyle, fontWeight, color). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchortitlestyle)
- **`subTitleStyle`** (ChartTitleSettings): [Subtitle appearance customization. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorsubtitlestyle)

### Chart Area
- **`chartArea`** (ChartArea): [Chart area border and background configuration. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorchartarea)

---

## Data Binding Properties

- **`dataSource`** (object): [Data source for the chart. Can be JSON array or DataManager instance. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchordatasource)
- **`series`** (List\<ChartSeries\>): [Collection of chart series. Each series represents a data set to visualize. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorseries)
- **`enableDataVirtualization`** (bool): [Enables data virtualization for large datasets. Default: false](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorenabledatavirtualization)

---

## Display Properties

### Axes Configuration
- **`primaryXAxis`** (ChartAxis): [Primary X-axis configuration. Includes valueType (Category, Numeric, DateTime, Logarithmic), range, interval, title. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorprimaryxaxis)
- **`primaryYAxis`** (ChartAxis): [Primary Y-axis configuration. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorprimaryyaxis)
- **`axes`** (List\<ChartAxis\>): [Collection of secondary axes for multi-axis charts. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchoraxes)

### Panes (Multiple Chart Areas)
- **`rows`** (List\<ChartRow\>): [Split chart into horizontal sections. Each row is a separate pane. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorrows)
- **`columns`** (List\<ChartColumn\>): [Split chart into vertical sections. Each column is a separate pane. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorcolumns)

### Axis Labels
- **`axisLabelRender`**: [Event before axis label rendering (see Events section)](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchoraxislabelrender)

### Legend
- **`legendSettings`** (ChartLegendSettings): [Legend configuration (position, alignment, visible, toggleVisibility, background, border, margin, padding). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorlegendsettings)

### Data Labels
- **`dataLabel`**: Not a direct property; use `e-series-datalabel` within series configuration

### Tooltips
- **`tooltip`** (ChartTooltipSettings): [Tooltip configuration (enable, format, fill, border, theme, template). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchortooltip)

### Markers and Shapes
- **`selectedDataIndexes`** (List\<ChartSelectedDataIndex\>): [Initially selected data points (series and point index). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorselectedtindexes)

---

## Interactivity Properties

### Selection
- **`selectionMode`** (SelectionMode): [Selection mode: None, Series, Point, Cluster, DragXY, DragX, DragY, Lasso. Default: SelectionMode.None](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorselectionmode)
- **`isMultiSelect`** (bool): [Allow multiple point/series selection. Default: false](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchormultiselect)
- **`selectionPattern`** (SelectionPattern): [Visual pattern for selected items: None, Chessboard, Dots, DiagonalForward, Crosshatch, Pacman, DiagonalBackward, Grid, Turquoise, Star, Triangle, Circle, Tile, HorizontalDash, VerticalDash, Rectangle, Box, VerticalStripe, HorizontalStripe, Bubble. Default: SelectionPattern.None](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorselectionpattern)
- **`allowMultiSelection`** (bool): [Enable multi-drag selection (requires DragX/Y/XY mode). Default: false](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorallowmultiselection)

### Highlighting
- **`highlightMode`** (HighlightMode): [Highlight mode: None, Series, Point, Cluster. Default: HighlightMode.None](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorhighlightmode)
- **`highlightColor`** (string): [Highlight color (hex or rgba). Default: ""](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorhighlightcolor)
- **`highlightPattern`** (SelectionPattern): [Visual pattern for highlighted items (same options as selectionPattern). Default: SelectionPattern.None](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorhighlightpattern)

### Crosshair
- **`crosshair`** (ChartCrosshairSettings): [Crosshair configuration (enable, fill, color, width, dashArray, lineType). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorcrosshair)

### Zooming and Scrolling
- **`zoomSettings`** (ChartZoomSettings): [Zoom configuration (enableSelectionZooming, enablePinchZooming, enableMouseWheelZooming, enableDeferredZooming, toolbarItems, mode). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorzoomsettings)

### Animation
- **`enableAnimation`** (bool): [Enable animation for chart elements. Default: true](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorenableanimation)
- **`enableAutoIntervalOnBothAxis`** (bool): [Auto-calculate axis intervals after zoom. Default: false](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorenableautointervalonbothaxis)

---

## WebMCP

### EnableWebMcp

Enables WebMCP integration for the Chart.

- **Chart property:** `EnableWebMcp`
- **Type:** `bool`
- **Default:** `false`
- **Tag Helper attribute:** `enableWebMcp`
- **Builder method:** `ChartBuilder.EnableWebMcp(bool enableWebMcp = true)`

### WebMcpSettings

Configures WebMCP tool registration for the Chart.

- **Chart property:** `WebMcpSettings`
- **Type:** `ChartWebMcpSettings`
- **Tag Helper attribute:** `webMcpSettings`
- **Builder method:** `ChartBuilder.WebMcpSettings(...)`

#### ChartWebMcpSettings

| Property | Type | Default | Description |
|---|---|---|---|
| `Name` | `string` | `null` | Prefix applied to registered tool names. If null or empty, the Chart element ID is used. |
| `Tools` | `object` or tool-name collection | `null` | Built-in tool allowlist or custom tool definitions. Omit to register all built-in tools. An explicit empty collection clears prior registrations. |
| `ExposedTo` | `string[]` | `null` | Model contexts or origins allowed to access the registered tools. |

Tag Helper:

```cshtml
@{
    var webMcpSettings = new ChartWebMcpSettings
    {
        Name = "salesChart",
        Tools = new[]
        {
            "inspectChart",
            "getSeriesData",
            "getChartAxes"
        },
        ExposedTo = new[] { "assistant" }
    };
}

<ejs-chart id="salesChart"
           enableWebMcp="true"
           webMcpSettings="webMcpSettings">
</ejs-chart>
```

Fluent builder:

```csharp
@Html.EJS().Chart("salesChart")
    .EnableWebMcp(true)
    .WebMcpSettings(settings => settings
        .Name("salesChart")
        .Tools(new[] { "inspectChart", "getSeriesData", "getChartAxes" })
        .ExposedTo(new[] { "assistant" }))
    .Render()
```

When all built-in tools are required, omit `Tools`:

```csharp
var webMcpSettings = new ChartWebMcpSettings
{
    Name = "salesChart"
};
```

## Advanced Feature Properties

### Annotations
- **`annotations`** (List\<ChartAnnotation\>): [Collection of annotations (text, shapes, images) to highlight data regions. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorannotations)

### Indicators (Technical Analysis)
- **`indicators`** (List\<ChartIndicator\>): [Technical indicators like SMA, EMA, RSI, MACD, etc. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorindicators)

### Trendlines and Error Bars
- Referenced through series configuration (`e-series-trendline`, `e-series-errorbar`)

### Strip Lines
- Referenced through axis configuration (`e-axis-striplines`)

### Stack Labels
- **`stackLabels`** (ChartStackLabelSettings): [Stack label configuration for stacked charts (enabled, format, fill, border). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorstacklabels)

### Range Color Settings
- **`rangeColorSettings`** (List\<ChartRangeColorSetting\>): [Rules for applying colors based on value ranges. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorrangecolorsettings)

---

## Accessibility Properties

### Keyboard and Screen Reader Support
- **`accessibility`** (ChartBaseAccessibility): [Accessibility configuration. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchoraccessibility)
- **`enableHtmlSanitizer`** (bool): [Sanitize untrusted HTML values. Default: false](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorenablehtmlsanitizer)
- **`enableRtl`** (bool): [Enable right-to-left rendering for RTL languages. Default: false](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorenablertl)
- **`locale`** (string): [Locale for internationalization (e.g., 'en-US', 'de-DE'). Default: ""](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorlocale)
- **`useGroupingSeparator`** (bool): [Use thousands separators in numbers. Default: false](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorusegroupingseparator)

### Focus Management
- **`focusBorderColor`** (string): [Focus border color. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorfocusbordercolor)
- **`focusBorderWidth`** (double): [Focus border width. Default: 1.5](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorfocusborderwidth)
- **`focusBorderMargin`** (double): [Focus border margin. Default: 0](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorfocusbordermargin)

### Persistence
- **`enablePersistence`** (bool): [Persist component state between page reloads. Default: false](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorenablepersistence)

---

## Event Properties

### WebMCP Events

#### BeforeWebMcpToolExecute

Triggers before a WebMCP tool begins execution. Use it to inspect, modify, cancel, or control confirmation before the operation takes effect.

- **Chart property:** `BeforeWebMcpToolExecute`
- **Type:** `string`
- **Default:** `null`
- **Tag Helper attribute:** `beforeWebMcpToolExecute`
- **Builder method:** `ChartBuilder.BeforeWebMcpToolExecute(string beforeWebMcpToolExecute)`

```cshtml
<ejs-chart id="salesChart"
           enableWebMcp="true"
           webMcpSettings="webMcpSettings"
           beforeWebMcpToolExecute="beforeWebMcpToolExecute">
</ejs-chart>

<script>
    function beforeWebMcpToolExecute(args) {
        if (args.toolName.endsWith('_printChart')) {
            args.cancel = true;
            args.cancellationResponse = 'Printing is disabled in this sample.';
        }
    }
</script>
```

```csharp
@Html.EJS().Chart("salesChart")
    .EnableWebMcp(true)
    .WebMcpSettings(settings => settings.Name("salesChart"))
    .BeforeWebMcpToolExecute("beforeWebMcpToolExecute")
    .Render()
```

### Lifecycle Events
- **`load`** (string): [Before chart loads; allows customization before rendering](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorload)
- **`loaded`** (string): [After chart fully loads and renders](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorloaded)
- **`beforeResize`** (string): [Before chart is resized](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorbeforeresize)
- **`resized`** (string): [After chart is resized](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorresized)
- **`beforePrint`** (string): [Before printing process starts](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorbeforeprint)

### Series and Point Events
- **`seriesRender`** (string): [Before series is rendered](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorseriesrender)
- **`pointRender`** (string): [Before each data point is rendered](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorpointrender)
- **`pointMove`** (string): [When data point is hovered](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorpointmove)
- **`pointClick`** (string): [When data point is clicked](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorpointclick)
- **`pointDoubleClick`** (string): [When data point is double-clicked](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorpointdoubleclick)

### Annotation Events
- **`annotationRender`** (string): [Before annotation is rendered](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorannotationrender)

### Axis Events
- **`axisLabelClick`** (string): [When X-axis label is clicked](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchoraxislabelclick)
- **`axisLabelRender`** (string): [Before each axis label is rendered](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchoraxislabelrender)
- **`axisMultiLabelRender`** (string): [Before multi-level axis label is rendered](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchoraxismultilabelrender)
- **`axisRangeCalculated`** (string): [Before axis range is calculated and rendered](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchoraxisrangecalculated)

### Tooltip Events
- **`tooltipRender`** (string): [Before tooltip for series is rendered](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchortooltiprender)
- **`sharedTooltipRender`** (string): [Before shared tooltip is rendered](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorsharedtooltiprender)
- **`crosshairLabelRender`** (string): [Before crosshair label is rendered](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorcrosshairlabelrender)

### Selection Events
- **`selectionComplete`** (string): [After selection is completed](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorselectioncomplete)
- **`drag`** (string): [When point is being dragged](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchordrag)
- **`dragStart`** (string): [When point drag operation starts](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchordragstart)
- **`dragEnd`** (string): [When point drag operation ends](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchordragend)
- **`dragComplete`** (string): [After drag selection is completed](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchordragcomplete)

### Data Label Event
- **`textRender`** (string): [Before data label for series is rendered](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchortextrender)

### Legend Event
- **`legendClick`** (string): [After legend item is clicked](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorlegendclick)
- **`legendRender`** (string): [Before legend is rendered](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorlegendrender)
- **`multiLevelLabelClick`** (string): [After multi-level label is clicked](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchormultilevelLabelclick)

### Chart Interaction Events
- **`chartMouseClick`** (string): [When chart is clicked](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchormouseclick)
- **`chartDoubleClick`** (string): [When chart is double-clicked](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchordoubleclick)
- **`chartMouseMove`** (string): [When hovering over chart](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchormousemove)
- **`chartMouseDown`** (string): [On mouse down](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchormousedown)
- **`chartMouseUp`** (string): [On mouse up](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchormouseup)
- **`chartMouseLeave`** (string): [When cursor leaves chart](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorleave)

### Zoom and Scroll Events
- **`onZooming`** (string): [When zoom selection started](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchoronzooming)
- **`zoomComplete`** (string): [After zoom selection is completed](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorzoomcomplete)
- **`scrollStart`** (string): [When scroll action starts](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorscrollstart)
- **`scrollChanged`** (string): [When scroll position changes](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorscrollchanged)
- **`scrollEnd`** (string): [After scroll action ends](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorscrollend)

### Animation Events
- **`animationComplete`** (string): [After animation for series is completed](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchoranimationcomplete)

### Export Events
- **`beforeExport`** (string): [Before export process begins](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorbeforeexport)
- **`afterExport`** (string): [After export is completed](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchorafterexport)

### No Data Template
- **`noDataTemplate`** (object): [Template to display when chart has no data](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.chart.html#anchoronodatatemplate)

---

## Series-Level Properties

Each series in the `series` collection has its own configuration:

### Data Binding
- **`dataSource`**: [Series-specific data source](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartSeries.html#anchordatasource)
- **`xName`**: [Property name for X values](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartSeries.html#anchorxname)
- **`yName`**: [Property name for Y values](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartSeries.html#anchoryname)
- **`name`**: [Series name for legend and tooltips](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartSeries.html#anchorname)

### Series Type and Appearance
- **`type`** (ChartSeriesType): [Chart type (Line, Column, Bar, Area, Pie, Doughnut, Scatter, Bubble, Candlestick, OHLC, HiLo, HiLoOpenClose, Waterfall, Pareto, Histogram, BoxAndWhisker, Polar, Radar, StackingColumn, StackingBar, StackingArea, etc.)](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartSeries.html#anchortype)
- **`fill`**: [Series color (hex or rgba)](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartSeries.html#anchorfill)
- **`width`**: [Line/border width for series](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartSeries.html#anchorwidth)

### Data Point Customization
- **`marker`**: [Data point markers (visible, height, width, shape, fill, border)](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartSeriesMarker.html)
- **`dataLabel`**: [Data labels (visible, position, format, template)](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartSeriesDataLabel.html)
- **`emptyPointSettings`**: [Configuration for empty/null data points](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartEmptyPointSettings.html)

### Interactivity
- **`cornerRadius`**: [Corner radius for column/bar charts](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartSeries.html#anchorcornerradius)
- **`isRectSeries`**: [Rectangle-based series type indicator](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartSeries.html#anchorisrectseries)

### Advanced Series Options
- **`trendlines`**: [Array of trendline configurations](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartTrendline.html)
- **`errorBar`**: [Error bar configuration](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartErrorBar.html)
- **`segmentAxis`**: [Axis for segment-based charts](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartSeries.html#anchorsegmentaxis)
- **`segments`**: [Array of segment configurations](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartSegment.html)

---

## Axis-Level Properties (ChartAxis)

### Axis Type and Range
- **`valueType`** (AxisValueType): [Category, Numeric, DateTime, Logarithmic](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartAxis.html#anchorvaluetype)
- **`minimum`**: [Minimum axis value](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartAxis.html#anchorminimum)
- **`maximum`**: [Maximum axis value](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartAxis.html#anchormaximum)
- **`interval`**: [Label interval](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartAxis.html#anchorinterval)
- **`majorGridLines`**: [Grid line configuration](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartAxis.html#anchormajorgridlines)
- **`minorGridLines`**: [Minor grid line configuration](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartAxis.html#anchorminorgridlines)

### Labels and Title
- **`title`**: [Axis title](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartAxis.html#anchortitle)
- **`labelFormat`**: [Format string for labels](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartAxis.html#anchorlabelformat)
- **`isInversed`**: [Invert axis direction](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartAxis.html#anchorinversed)
- **`desiredIntervals`**: [Desired number of intervals](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartAxis.html#anchordesiredintervals)

### Customization
- **`axisBorder`**: [Axis border configuration](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartAxis.html#anchoraxisborder)
- **`labelStyle`**: [Label appearance (font, color)](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartAxis.html#anchorlabelstyle)
- **`titleStyle`**: [Title appearance](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartAxis.html#anchortitlestyle)
- **`stripLines`**: [Array of strip line configurations](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartAxis.html#anchorstriplines)

---

## Common Usage Patterns

### Access Properties via Tag Helpers
```cshtml
<ejs-chart title="My Chart" width="100%" theme="@Syncfusion.EJ2.Charts.ChartTheme.Fluent2">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis></e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@Data" xName="Month" yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Common Property Combinations
- **Zooming Chart:** Set `zoomSettings.enableSelectionZooming = true` + `zoomSettings.enableMouseWheelZooming = true`
- **Crosshair with Tooltip:** Set `crosshair.enable = true` + `tooltip.enable = true`
- **Multi-Series Selection:** Set `selectionMode = SelectionMode.Point` + `isMultiSelect = true`
- **Animated Chart:** Set `enableAnimation = true` + configure animation in series/axes

---

## Notes

- All dates should use ISO 8601 format (YYYY-MM-DD) when binding DateTime values
- Large datasets benefit from `enableDataVirtualization = true`
- Use `DataManager` for remote data with OData services
- Theme must be set during initialization; changing at runtime requires component refresh
- Export functionality requires `enableExport = true`
- For complete method signatures and examples, see the official documentation linked at the top
