# Stock Chart API Reference

Complete API reference for the Syncfusion ASP.NET Core Stock Chart (`Syncfusion.EJ2.Charts.StockChart`) component.

- **Official API Documentation:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll`

## Table of Contents
1. [Constructor](#constructor)
2. [Configuration Properties](#configuration-properties)
3. [Data Properties](#data-properties)
4. [Display Properties](#display-properties)
5. [Axes Properties](#axes-properties)
6. [Series Properties](#series-properties)
7. [Technical Indicators Properties](#technical-indicators-properties)
8. [Stock Events Properties](#stock-events-properties)
9. [Navigation Properties](#navigation-properties)
10. [Interactivity Properties](#interactivity-properties)
11. [Customization Properties](#customization-properties)
12. [Accessibility Properties](#accessibility-properties)
13. [Event Properties](#event-properties)

---

## Constructor

### StockChart()
Creates a new instance of the Stock Chart component.

---

## Configuration Properties

### Dimensions
- **`width`** (string): [Width of the stock chart (e.g., '100%', '500px'). If specified as '100%', renders to full width. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Width)
- **`height`** (string): [Height of the stock chart (e.g., '420px', '100%'). If specified as '100%', renders to full height. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Height)

### Title
- **`title`** (string): [Title displayed at the top of the stock chart. Default: ""](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Title)
- **`titleStyle`** (StockChartTitleStyle): [Title appearance customization (fontFamily, size, fontStyle, fontWeight, color, opacity, textAlignment, textOverflow). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_TitleStyle)

### Theme and Appearance
- **`theme`** (ChartTheme): [Visual theme for the stock chart. Default: ChartTheme.Material](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Theme)
- **`background`** (string): [Background color of the stock chart (hex or rgba CSS color). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Background)

### Layout
- **`margin`** (StockChartChartMargin): [Margin configuration (left, right, top, bottom). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Margin)
- **`border`** (StockChartChartBorder): [Border configuration for the chart (color, width, dashArray). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Border)
- **`chartArea`** (StockChartChartArea): [Chart area configuration (background, border, backgroundImage, margin, opacity, width). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_ChartArea)

### Localization
- **`locale`** (string): [Overrides the global culture and localization value for this component. Default global culture is 'en-US'. Default: ""](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Locale)

---

## Data Properties

- **`dataSource`** (object): [Data source for the stock chart. Can be JSON array or DataManager instance. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_DataSource)

---

## Display Properties

### Chart Orientation
- **`isTransposed`** (bool): [Specifies whether the stock chart should be rendered in transposed manner (rotated 90 degrees). Default: false](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_IsTransposed)

### Multiple Plot Areas
- **`rows`** (List&lt;StockChartStockChartRow&gt;): [Collection of rows to split stock chart into multiple plotting areas horizontally. Each object represents a plotting area. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Rows)

### Annotations
- **`annotations`** (List&lt;StockChartAnnotationSettings&gt;): [Collection of annotations (text, shapes, images) to highlight data regions. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Annotations)

---

## Axes Properties

### Primary Axes
- **`primaryXAxis`** (StockChartPrimaryXAxis): [Primary X-axis configuration for horizontal axis. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PrimaryXAxis)
- **`primaryYAxis`** (StockChartPrimaryYAxis): [Primary Y-axis configuration for vertical axis. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PrimaryYAxis)

### Secondary Axes
- **`axes`** (List&lt;StockChartStockChartAxis&gt;): [Collection of secondary axes for multi-axis charts. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Axes)

---

## Series Properties

- **`series`** (List&lt;StockChartStockChartSeries&gt;): [Collection of series for stock chart visualization. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Series)
- **`seriesType`** (object): [Specifies the types of series available in the financial chart. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SeriesType)

### Series Types
Series types available: Line, Candle, HollowCandle, Spline, Hilo, HiloOpenClose

---

## Technical Indicators Properties

- **`indicators`** (List&lt;StockChartStockChartIndicator&gt;): [Collection of technical indicators for financial analysis. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Indicators)
- **`indicatorType`** (object): [Specifies the types of indicators available in the financial chart. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_IndicatorType)

### Supported Indicators
AccumulationDistribution, ATR, EMA, SMA, TMA, Momentum, MACD, RSI, Stochastic, BollingerBand

---

## Stock Events Properties

- **`stockEvents`** (List&lt;StockChartStockEvent&gt;): [Collection of stock events for chart annotations. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockEvents)

---

## Navigation Properties

### Range Selector
- **`enableSelector`** (bool): [Enable range navigator to be rendered in financial chart. Default: true](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnableSelector)
- **`enableCustomRange`** (bool): [Enable custom range selection. Default: true](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnableCustomRange)

### Period Selector
- **`enablePeriodSelector`** (bool): [Enable period selector buttons in financial chart. Default: true](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnablePeriodSelector)
- **`periods`** (List&lt;StockChartStockChartPeriod&gt;): [Collection of period options for quick range selection. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Periods)

---

## Interactivity Properties

### Legend
- **`legendSettings`** (StockChartStockChartLegendSettings): [Legend configuration (alignment, position, visible, toggleVisibility, background, border, location, and related options). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_LegendSettings)

### Tooltip
- **`tooltip`** (StockChartStockTooltipSettings): [Tooltip configuration (enable, format, fill, border, header, duration, enableAnimation, enableMarker, enableTextWrap, fadeOutDuration, fadeOutMode, opacity). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Tooltip)

### Crosshair
- **`crosshair`** (StockChartCrosshairSettings): [Crosshair configuration (enable, dashArray, horizontalLineColor, verticalLineColor, line, lineType, opacity). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Crosshair)

### Selection
- **`selectionMode`** (SelectionMode): [Selection mode: None, Series, Point, Cluster, DragXY, DragX, DragY, Lasso. Default: SelectionMode.None](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SelectionMode)
- **`isMultiSelect`** (bool): [Allow multiple point/series selection. Default: false](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_IsMultiSelect)
- **`selectedDataIndexes`** (List&lt;StockChartStockChartSelectedDataIndex&gt;): [Initially selected data points (series and point index). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SelectedDataIndexes)

### Zoom and Scroll
- **`zoomSettings`** (StockChartZoomSettings): [Zoom configuration (enableSelectionZooming, enableMouseWheelZooming, enablePinchZooming, enableDeferredZooming, enablePan, enableScrollbar, mode, showToolbar, toolbarItems). Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_ZoomSettings)

---

## Customization Properties

### Export
- **`exportType`** (object): [Specifies the available export formats in the financial chart. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_ExportType)

---

## Accessibility Properties

### Internationalization and Localization
- **`enableRtl`** (bool): [Enable right-to-left rendering for RTL languages. Default: false](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnableRtl)
- **`enablePersistence`** (bool): [Persist component state between page reloads. Default: false](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnablePersistence)

### HTML Attributes
- **`htmlAttributes`** (object): [Additional HTML attributes such as title, name, etc., in key-value pair format. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_HtmlAttributes)

### No Data Template
- **`noDataTemplate`** (object): [Template to display when stock chart has no data. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_NoDataTemplate)

---

## Event Properties

### Lifecycle Events
- **`load`** (string): [Triggers before the stock chart is rendered. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Load)
- **`loaded`** (string): [Triggers after the stock chart rendering is complete. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Loaded)

### Series Events
- **`seriesRender`** (string): [Triggers before the series is rendered. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SeriesRender)
- **`pointClick`** (string): [Triggers on point click. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PointClick)
- **`pointMove`** (string): [Triggers on point move/hover. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PointMove)

### Axis Events
- **`axisLabelRender`** (string): [Triggers before each axis label is rendered. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_AxisLabelRender)

### Legend Events
- **`legendClick`** (string): [Triggers after click on legend. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_LegendClick)
- **`legendRender`** (string): [Triggers before the legend is rendered. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_LegendRender)

### Tooltip Events
- **`tooltipRender`** (string): [Triggers before the tooltip for series is rendered. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_TooltipRender)
- **`crosshairLabelRender`** (string): [Triggers before the crosshair tooltip is rendered. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_CrosshairLabelRender)

### Chart Interaction Events
- **`stockChartMouseClick`** (string): [Triggers on clicking the stock chart. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseClick)
- **`stockChartMouseDown`** (string): [Triggers on mouse down. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseDown)
- **`stockChartMouseUp`** (string): [Triggers on mouse up. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseUp)
- **`stockChartMouseMove`** (string): [Triggers on hovering the stock chart. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseMove)
- **`stockChartMouseLeave`** (string): [Triggers when cursor leaves the chart. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseLeave)

### Zoom and Navigation Events
- **`onZooming`** (string): [Triggers after the zoom selection is completed. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_OnZooming)
- **`rangeChange`** (string): [Triggers when the range is changed. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_RangeChange)

### Rendering Events
- **`selectorRender`** (string): [Triggers before rendering the selector. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SelectorRender)
- **`stockEventRender`** (string): [Triggers before the stock event is rendered. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockEventRender)

### Export Events
- **`beforeExport`** (string): [Triggers before the export process begins. Default: null](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_BeforeExport)

---

## Related Settings Classes

### StockChartChartMargin
- **`left`** (double): [Left margin](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartMargin.html#Syncfusion_EJ2_Charts_StockChartMargin_Left)
- **`right`** (double): [Right margin](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartMargin.html#Syncfusion_EJ2_Charts_StockChartMargin_Right)
- **`top`** (double): [Top margin](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartMargin.html#Syncfusion_EJ2_Charts_StockChartMargin_Top)
- **`bottom`** (double): [Bottom margin](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartMargin.html#Syncfusion_EJ2_Charts_StockChartMargin_Bottom)

### StockChartChartBorder
- **`color`**: [Border color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_Color)
- **`width`** (double): [Border width](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_Width)
- **`dashArray`**: [Border dash pattern](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_DashArray)

### StockChartChartArea
- **`border`**: [Border configuration for chart area](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Border)
- **`background`**: [Chart area background color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Background)
- **`backgroundImage`**: [Chart area background image](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_BackgroundImage)
- **`margin`**: [Chart area margin options](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Margin)
- **`opacity`** (double): [Chart area background opacity](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Opacity)
- **`width`** (string): [Chart area width](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Width)

### StockChartFont  
- **`fontFamily`**: [Font name/family](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_FontFamily)
- **`size`**: [Font size](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_Size)
- **`fontStyle`**: [Font style (Normal, Italic, Oblique)](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_FontStyle)
- **`fontWeight`**: [Font weight (Normal, Bold, Lighter, etc.)](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_FontWeight)
- **`color`**: [Text color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_Color)
- **`opacity`** (double): [Text opacity](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_Opacity)
- **`textAlignment`**: [Text alignment](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_TextAlignment)
- **`textOverflow`**: [Text overflow behavior](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_TextOverflow)

### StockChartCrosshairSettings
- **`enable`** (bool): [Enable or disable crosshair](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html#Syncfusion_EJ2_Charts_StockChartCrosshairSettings_Enable)
- **`dashArray`**: [Crosshair dash pattern](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html#Syncfusion_EJ2_Charts_StockChartCrosshairSettings_DashArray)
- **`horizontalLineColor`**: [Crosshair horizontal line color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html#Syncfusion_EJ2_Charts_StockChartCrosshairSettings_HorizontalLineColor)
- **`verticalLineColor`**: [Crosshair vertical line color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html#Syncfusion_EJ2_Charts_StockChartCrosshairSettings_VerticalLineColor)
- **`line`**: [Crosshair line configuration](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html#Syncfusion_EJ2_Charts_StockChartCrosshairSettings_Line)
- **`lineType`**: [Line type: Both, Horizontal, Vertical, None](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html#Syncfusion_EJ2_Charts_StockChartCrosshairSettings_LineType)
- **`opacity`** (double): [Crosshair opacity](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html#Syncfusion_EJ2_Charts_StockChartCrosshairSettings_Opacity)

### StockChartStockChartLegendSettings
- **`visible`** (bool): [Show or hide legend](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Visible)
- **`position`**: [Legend position](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Position)
- **`alignment`**: [Legend alignment](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Alignment)
- **`toggleVisibility`** (bool): [Enable legend item visibility toggle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_ToggleVisibility)
- **`background`**: [Legend background color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Background)
- **`border`**: [Legend border options](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Border)
- **`containerPadding`**: [Legend container padding](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_ContainerPadding)
- **`description`**: [Legend description](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Description)
- **`enablePages`** (bool): [Enable paged legend](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_EnablePages)
- **`height`** (string): [Legend height](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Height)
- **`isInversed`** (bool): [Reverse legend order](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_IsInversed)
- **`itemPadding`** (double): [Padding between legend items](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_ItemPadding)
- **`location`**: [Custom legend location](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Location)

### StockChartStockTooltipSettings
- **`enable`** (bool): [Enable or disable tooltip](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Enable)
- **`format`**: [Tooltip content format string](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Format)
- **`fill`**: [Tooltip background color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Fill)
- **`border`**: [Tooltip border configuration](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Border)
- **`duration`** (double): [Tooltip animation duration](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Duration)
- **`enableAnimation`** (bool): [Enable tooltip animation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_EnableAnimation)
- **`enableMarker`** (bool): [Show tooltip marker](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_EnableMarker)
- **`enableTextWrap`** (bool): [Wrap long tooltip text](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_EnableTextWrap)
- **`fadeOutDuration`** (double): [Tooltip fade-out duration](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_FadeOutDuration)
- **`fadeOutMode`**: [Tooltip fade-out mode](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_FadeOutMode)
- **`header`**: [Tooltip header](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Header)
- **`opacity`** (double): [Tooltip opacity](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Opacity)

### StockChartZoomSettings
- **`enableSelectionZooming`** (bool): [Enable selection-based zooming](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings_EnableSelectionZooming)
- **`enableMouseWheelZooming`** (bool): [Enable mouse wheel zooming](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings_EnableMouseWheelZooming)
- **`enablePinchZooming`** (bool): [Enable pinch zooming for touch devices](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings_EnablePinchZooming)
- **`enableDeferredZooming`** (bool): [Perform zooming on mouse up](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings_EnableDeferredZooming)
- **`enablePan`** (bool): [Enable panning](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings_EnablePan)
- **`enableScrollbar`** (bool): [Enable scrollbar on axis](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings_EnableScrollbar)
- **`mode`**: [Zoom mode](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings_Mode)
- **`showToolbar`** (bool): [Show zoom toolbar initially](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings_ShowToolbar)
- **`toolbarItems`**: [Zoom toolbar items](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings_ToolbarItems)

---

## Common Usage Patterns

### Basic Stock Chart with Candlestick Series
```cshtml
<ejs-stockchart id="stockChart" width="100%" height="420px">
    <e-stockchart-primaryxaxis valueType="DateTime">
    </e-stockchart-primaryxaxis>
    <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="@ViewBag.Data" 
            xName="x" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

### Stock Chart with Technical Indicator
```cshtml
<ejs-stockchart id="stockChart" width="100%" height="420px">
    <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="@ViewBag.Data" 
            xName="x" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
    <e-stockchart-indicators>
        <e-stockchart-indicator 
            type="Ema" 
            field="Close" 
            period="14">
        </e-stockchart-indicator>
    </e-stockchart-indicators>
</ejs-stockchart>
```

### Stock Chart with Period Selector and Legend
```cshtml
<ejs-stockchart id="stockChart" 
    width="100%" 
    height="420px" 
    enablePeriodSelector="true">
    <e-stockchart-legendsettings 
        visible="true" 
        position="Bottom" 
        alignment="Center">
    </e-stockchart-legendsettings>
    <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="@ViewBag.Data" 
            xName="x" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

### Stock Chart with Tooltip and Crosshair
```cshtml
<ejs-stockchart id="stockChart" width="100%" height="420px">
    <e-stockchart-tooltipsettings enable="true">
    </e-stockchart-tooltipsettings>
    <e-stockchart-crosshairsettings enable="true" lineType="Vertical">
    </e-stockchart-crosshairsettings>
    <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="@ViewBag.Data" 
            xName="x" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

### Stock Chart with Stock Events
```cshtml
<ejs-stockchart id="stockChart" width="100%" height="420px">
    <e-stockchart-stockevents>
        <e-stockchart-stockevent 
            date="2023-01-15" 
            text="Event" 
            type="Square"
            background="#ff0000">
        </e-stockchart-stockevent>
    </e-stockchart-stockevents>
    <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="@ViewBag.Data" 
            xName="x" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

---

## Common Property Combinations

- **With Period Selector:** Set `enablePeriodSelector = true` + define `periods` collection
- **DateTime Scale:** Set `primaryXAxis.valueType = DateTime` + use DateTime data
- **Zoom and Scroll:** Set `zoomSettings.enableSelectionZooming = true` + `zoomSettings.enableMouseWheelZooming = true`
- **Crosshair with Tooltip:** Set `crosshair.enable = true` + `tooltip.enable = true`
- **Multi-Series Display:** Add multiple series to `series` collection
- **Technical Analysis:** Add indicators to `indicators` collection
- **Stock Events Annotation:** Add events to `stockEvents` collection
- **Legend Control:** Set `legendSettings.visible = true` + `legendSettings.position`
- **Range Selection:** Set `enableSelector = true` for range navigator

---

## Data Structure

### OHLC Data Format
```csharp
var stockData = new object[]
{
    new { x = new DateTime(2023, 1, 1), open = 150, high = 155, low = 145, close = 152, volume = 1000000 },
    new { x = new DateTime(2023, 1, 2), open = 152, high = 158, low = 151, close = 156, volume = 1200000 }
};
```

---

## Notes

- OHLC (Open, High, Low, Close) data is essential for candlestick and OHLC series types
- DateTime axis is recommended for financial data visualization
- Technical indicators require specific fields from the data source (typically 'close')
- Period selector provides quick range selection for predefined time intervals
- Range navigator enables custom range selection with visual feedback
- Stock events are typically marked at specific dates for annotation
- Theme must be set during initialization; changing at runtime requires component refresh
- RTL support requires both `enableRtl = true` and proper locale setting
- For complete method signatures and examples, see the official documentation linked at the top