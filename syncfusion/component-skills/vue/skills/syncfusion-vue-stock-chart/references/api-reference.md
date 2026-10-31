# stock-chart API Reference

Complete API documentation for the Syncfusion Vue 3 Stock Chart component, including properties, events, methods, models, and usage examples.

# Syncfusion Vue Stock Chart API Reference

Comprehensive API reference for the Syncfusion Vue Stock Chart ([`ejs-stockchart`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/)) component, using the official Syncfusion Vue Stock Chart API index as the definitive source for the component surface area and the official model pages for nested object members. Props are documented with their JavaScript/Vue option name (camelCase) and, where relevant, the equivalent SFC binding form such as `:primary-x-axis`, `:tooltip`, or `:zoom-settings`. 

- **Base API Documentation:** [Stock Chart API Index](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/) 
- **Library Version:** EJ2 Vue API docs (page dated 16 Mar 2026) 
- **Component Tag:** `<ejs-stockchart>` 

## Table of Contents
- [component-props-properties](#component-props-properties)
  - [data-and-series](#data-and-series)
  - [axes-configuration](#axes-configuration)
  - [interactivity-tooltip-zoom-and-selection](#interactivity-tooltip-zoom-and-selection)
  - [appearance-theme-and-layout](#appearance-theme-and-layout)
  - [runtime-and-instance-members](#runtime-and-instance-members)
- [nested-object-models-deep-dive](#nested-object-models-deep-dive)
  - [tooltipsettings](#tooltipsettings)
  - [crosshairsettings](#crosshairsettings)
  - [stockseriesmodel](#stockseriesmodel)
  - [stockchartaxismodel](#stockchartaxismodel)
  - [periodsmodel](#periodsmodel)
  - [periodselectorsettingsmodel](#periodselectorsettingsmodel)
  - [zoomsettingsmodel](#zoomsettingsmodel)
- [component-methods](#component-methods)
- [events-bindings](#events-bindings)
- [common-usage-patterns](#common-usage-patterns)
- [implementation-notes-for-vue](#implementation-notes-for-vue)

---

## Component Props (Properties)

### Data and Series

- **[`dataSource`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#datasource)** (`Object | DataManager`; Vue prop `:data-source`): Supplies the root data collection for the stock chart when you want to bind shared data at the component level. 
- **[`seriesType`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#seriestype)** (`ChartSeriesType[]`; Vue prop `:series-type`): Provides the list of series types exposed through the built-in period selector series switcher. 
- **[`indicators`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#indicators)** (`StockChartIndicatorModel[]`; Vue prop `:indicators`): Adds one or more technical indicators that analyze the stock data overlaid on or associated with the main series. 
- **[`indicatorType`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#indicatortype)** (`TechnicalIndicators[]`; Vue prop `:indicator-type`): Exposes the indicator types available from the built-in UI selector for interactive financial analysis. 
- **[`trendlineType`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#trendlinetype)** (`TrendlineTypes[]`; Vue prop `:trendline-type`): Exposes the trendline types available from the built-in selector so users can add predictive overlays interactively. 
- **[`stockEvents`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#stockevents)** (`StockEventsSettingsModel[]`; Vue prop `:stock-events` or stock event directives): Configures market-event markers such as flags, pins, and signs along the stock timeline. (https://ej2.syncfusion.com/vue/documentation/stock-chart/stock-events)
- **[`annotations`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#annotations)** (`StockChartAnnotationSettingsModel[]`; Vue prop `:annotations`): Places arbitrary annotation content over the stock chart surface at configured coordinates. 
- **[`periods`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#periods)** (`PeriodsModel[]`; Vue prop `:periods` or period directives): Defines the preset period-selector buttons used to jump to common date ranges.

### Axes Configuration

- **[`primaryXAxis`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#primaryxaxis)** (`StockChartAxisModel`; Vue prop `:primary-x-axis`): Configures the main horizontal axis that typically carries the time scale for the stock chart.
- **[`primaryYAxis`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#primaryyaxis)** (`StockChartAxisModel`; Vue prop `:primary-y-axis`): Configures the main vertical value axis used by the stock series. 
- **[`axes`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#axes)** (`StockChartAxisModel[]`; Vue prop `:axes` or axis directives): Adds secondary axes when the chart needs extra scales for volume, comparison series, or alternate units. 
- **[`rows`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#rows)** (`StockChartRowModel[]`; Vue prop `:rows`): Splits the stock chart into multiple horizontal plotting rows so separate panes can host price, volume, or indicator visuals. 

### Interactivity, Tooltip, Zoom, and Selection

- **[`tooltip`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#tooltip)** (`StockTooltipSettingsModel`; Vue prop `:tooltip`): Controls point tooltip display, formatting, templating, and shared hover behavior for the stock chart. 
- **[`crosshair`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#crosshair)** (`CrosshairSettingsModel`; Vue prop `:crosshair`): Enables and customizes crosshair guide lines that follow the pointer across the chart. 
- **[`zoomSettings`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#zoomsettings)** (`ZoomSettingsModel`; Vue prop `:zoom-settings`): Turns on selection, wheel, pinch, pan, and toolbar-based zooming interactions.
- **[`enableSelector`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#enableselector)** (`boolean`; Vue prop `:enable-selector`): Toggles the built-in range navigator selector at the bottom of the stock chart. 
- **[`enablePeriodSelector`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#enableperiodselector)** (`boolean`; Vue prop `:enable-period-selector`): Toggles the built-in period-selector toolbar used to choose predefined date ranges. 
- **[`enableCustomRange`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#enablecustomrange)** (`boolean`; Vue prop `:enable-custom-range`): Enables custom date-range picking in the stock chart’s range/period UI. 
- **[`selectionMode`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#selectionmode)** (`SelectionMode`; Vue prop `:selection-mode`): Specifies whether the chart selects points, series, clusters, or drag regions during interaction. 
- **[`selectedDataIndexes`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#selecteddataindexes)** (`StockChartIndexesModel[]`; Vue prop `:selected-data-indexes`): Preselects one or more series/point combinations when the chart loads. 
- **[`isMultiSelect`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#ismultiselect)** (`boolean`; Vue prop `:is-multi-select`): Allows multiple points or series to remain selected when the selection mode supports it. 
- **[`isSelect`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#isselect)** (`boolean`; Vue prop `:is-select`): Enables chart selection behavior as exposed by the API index for stock chart interaction. 

### Appearance, Theme, and Layout

- **[`title`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#title)** (`string`; Vue prop `title`): Sets the main heading text shown above the stock chart. 
- **[`titleStyle`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#titlestyle)** (`StockChartFontModel`; Vue prop `:title-style`): Customizes the font used to render the chart title. 
- **[`background`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#background)** (`string`; Vue prop `background`): Sets the overall component background color with any valid CSS color string. 
- **[`border`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#border)** (`StockChartBorderModel`; Vue prop `:border`): Configures the outer border color and width for the stock chart container. 
- **[`chartArea`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#chartarea)** (`StockChartAreaModel`; Vue prop `:chart-area`): Configures the inner plotting area background and border. 
- **[`legendSettings`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#legendsettings)** (`StockChartLegendSettingsModel`; Vue prop `:legend-settings`): Controls how the stock chart legend is rendered and interacted with. 
- **[`margin`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#margin)** (`StockMarginModel`; Vue prop `:margin`): Adjusts the top, right, bottom, and left spacing around the stock chart. 
- **[`theme`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#theme)** (`ChartTheme`; Vue prop `theme`): Applies one of Syncfusion’s predefined visual themes to the stock chart. 
- **[`width`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#width)** (`string`; Vue prop `width`): Sets the component width using pixel or percentage sizing. 
- **[`height`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#height)** (`string`; Vue prop `height`): Sets the component height using pixel or percentage sizing. 
- **[`locale`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#locale)** (`string`; Vue prop `locale`): Overrides the global culture used for localized text and formatting in the stock chart. 
- **[`enableRtl`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#enablertl)** (`boolean`; Vue prop `:enable-rtl`): Renders the component in right-to-left mode for RTL locales. 
- **[`enablePersistence`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#enablepersistence)** (`boolean`; Vue prop `:enable-persistence`): Persists component state such as user interactions between page reloads. 
- **[`exportType`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#exporttype)** (`ExportType[]`; Vue prop `:export-type`): Declares the export formats exposed by the stock chart’s built-in export UI. 
- **[`noDataTemplate`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#nodatatemplate)** (`string | Function`; Vue prop `:no-data-template`): Supplies custom markup or a template function shown when the chart has no data to render. 
- **[`isTransposed`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#istransposed)** (`boolean`; Vue prop `:is-transposed`): Renders the stock chart in transposed orientation when your analysis layout needs swapped axes. 

### Runtime and Instance Members

- **[`mainObject`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#mainobject)** (`Element`): Exposes the main SVG element on the EJ2 instance and is primarily useful for runtime inspection rather than template binding. 
- **[`stockLegendModule`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#stocklegendmodule)** (`StockLegend`): Exposes the legend module instance used internally by the stock chart for legend behavior. 
- **[`zoomChange`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#zoomchange)** (`boolean`, private): Appears in the API index as a private state flag indicating zoom-change tracking within the stock chart internals. 

---

## Nested Object Models (Deep-Dive)

### [`TooltipSettings`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel)

Use this model with the root `tooltip` prop as `:tooltip="{ ... }"` in Vue templates to control shared hover content, formatting, and visual styling. 

- **[`enable`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#enable)** (`boolean`): Toggles tooltip rendering for data points in the stock chart. 
- **[`shared`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#shared)** (`boolean`): Shows a single combined tooltip for all visible series at the same index. 
- **[`format`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#format)** (`string`): Formats the body content of the tooltip using Syncfusion placeholder tokens. 
- **[`header`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#header)** (`string`): Customizes the tooltip header text, which defaults to the series name in the stock-chart model page. 
- **[`template`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#template)** (`string | Function`): Uses custom markup or a render function for fully custom tooltip content. 
- **[`enableMarker`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#enablemarker)** (`boolean`): Shows or hides the marker symbol inside the tooltip. 
- **[`enableAnimation`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#enableanimation)** (`boolean`): Animates the tooltip as it moves from one point to another. 
- **[`duration`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#duration)** (`number`): Specifies the tooltip animation duration in milliseconds. 
- **[`fadeOutDuration`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#fadeoutduration)** (`number`): Controls how long the tooltip takes to fade out when hidden. 
- **[`fadeOutMode`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#fadeoutmode)** (`FadeOutMode`): Chooses the fade-out behavior used when the tooltip disappears. 
- **[`fill`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#fill)** (`string`): Sets the tooltip background fill color. 
- **[`opacity`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#opacity)** (`number`): Sets the overall tooltip opacity. 
- **[`showHeaderLine`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#showheaderline)** (`boolean`): Controls whether the divider line under the tooltip header is shown. 
- **[`showNearestPoint`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#shownearestpoint)** (`boolean`): Controls whether nearest points are included in shared-tooltips. 
- **[`showNearestTooltip`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#shownearesttooltip)** (`boolean`): Enables or disables nearest-point tooltips at the cursor. 
- **[`enableTextWrap`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#enabletextwrap)** (`boolean`): Wraps long tooltip text to fit the available space. 
- **[`enableHighlight`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#enablehighlight)** (`boolean`): Highlights the hovered series while dimming others for focus. 
- **[`location`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#location)** (`LocationModel`): Fixes the tooltip to a specific relative position when you do not want it to follow the cursor. 
- **[`border`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#border)** (`BorderModel`): Configures the tooltip border color and width. 
  - **`border.color`**: Sets the tooltip outline color through the nested border model. 
  - **`border.width`**: Sets the tooltip outline thickness through the nested border model. 
- **[`textStyle`](https://ej2.syncfusion.com/documentation/api/stock-chart/tooltipsettingsmodel#textstyle)** (`FontModel`): Controls tooltip text font family, size, style, weight, and color. 
  - **`textStyle.fontFamily`**: Sets the tooltip text font family. 
  - **`textStyle.size`**: Sets the tooltip text size. 
  - **`textStyle.fontStyle`**: Sets the tooltip text style such as normal or italic. 
  - **`textStyle.fontWeight`**: Sets the tooltip text weight. 
  - **`textStyle.color`**: Sets the tooltip text color. 

### [`CrosshairSettings`](https://ej2.syncfusion.com/documentation/api/chart/crosshairsettingsmodel)

Use this model with the root `crosshair` prop as `:crosshair="{ ... }"` in Vue templates to turn on pointer-following crosshair guide lines. 

- **[`enable`](https://ej2.syncfusion.com/documentation/api/chart/crosshairsettingsmodel#enable)** (`boolean`): Shows or hides the crosshair. 
- **[`lineType`](https://ej2.syncfusion.com/documentation/api/chart/crosshairsettingsmodel#linetype)** (`LineType`): Chooses whether the crosshair draws horizontal, vertical, both, or no lines. 
- **[`dashArray`](https://ej2.syncfusion.com/documentation/api/chart/crosshairsettingsmodel#dasharray)** (`string`): Sets the dash pattern used to stroke the crosshair line. 
- **[`opacity`](https://ej2.syncfusion.com/documentation/api/chart/crosshairsettingsmodel#opacity)** (`number`): Controls the transparency of the crosshair lines. 
- **[`snapToData`](https://ej2.syncfusion.com/documentation/api/chart/crosshairsettingsmodel#snaptodata)** (`boolean`): Snaps the horizontal crosshair to the nearest data point instead of the exact cursor position. 
- **[`highlightCategory`](https://ej2.syncfusion.com/documentation/api/chart/crosshairsettingsmodel#highlightcategory)** (`boolean`): Highlights the full category region when hovering category axes. 
- **[`horizontalLineColor`](https://ej2.syncfusion.com/documentation/api/chart/crosshairsettingsmodel#horizontallinecolor)** (`string`): Sets the horizontal crosshair line color. 
- **[`verticalLineColor`](https://ej2.syncfusion.com/documentation/api/chart/crosshairsettingsmodel#verticallinecolor)** (`string`): Sets the vertical crosshair line color. 
- **[`line`](https://ej2.syncfusion.com/documentation/api/chart/crosshairsettingsmodel#line)** (`BorderModel`): Configures the nested line appearance including its width and color. 
  - **`line.color`**: Sets the crosshair line color via the nested border model. 
  - **`line.width`**: Sets the crosshair line width via the nested border model. 

### [`StockSeriesModel`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel)

Use this model for each `<e-stockchart-series>` directive or `series` array entry to define what data fields are plotted and how the series is styled. he individual series. 
- **[`xName`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#xname)** (`string`): Maps the data field used as the series X value, typically a date field in stock charts. 
- **[`yName`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#yname)** (`string`): Maps the primary Y field for non-OHLC series. 
- **[`open`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#open)** (`string`): Maps the data field that supplies the open value for financial series. 
- **[`high`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#high)** (`string`): Maps the data field that supplies the high value for financial series and indicators. 
- **[`low`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#low)** (`string`): Maps the data field that supplies the low value for financial series. 
- **[`close`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#close)** (`string`): Maps the data field that supplies the close value for financial series and indicators. 
- **[`volume`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#volume)** (`string`): Maps the data field used for volume-aware rendering and analysis scenarios. 
- **[`name`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#name)** (`string`): Sets the display name used for legend entries and tooltips. 
- **[`fill`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#fill)** (`string`): Sets the fill color for the series or signal line color for technical indicators. 
- **[`border`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#border)** (`BorderModel`): Configures series border appearance and is specifically relevant to bar/column visuals. 
- **[`animation`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#animation)** (`AnimationModel`): Controls how the series animates when it first renders. 
- **[`dashArray`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#dasharray)** (`string`): Applies dashed strokes to line-based series. 
- **[`columnSpacing`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#columnspacing)** (`number`): Sets the gap between adjacent column points. 
- **[`columnWidth`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#columnwidth)** (`number`): Sets the rendered width of column-based series points. 
- **[`cornerRadius`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#cornerradius)** (`CornerRadiusModel`): Rounds the corners of column points. 
- **[`emptyPointSettings`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#emptypointsettings)** (`EmptyPointSettingsModel`): Controls how empty or missing points are displayed. 
- **[`enableTooltip`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#enabletooltip)** (`boolean`): Shows a tooltip for this series when the global tooltip is enabled. 
- **[`enableSolidCandles`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#enablesolidcandles)** (`boolean`): Toggles solid candle rendering for candle series. 
- **[`bullFillColor`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#bullfillcolor)** (`string`): Sets the candle or point color used when the opening price is higher than the closing price. 
- **[`bearFillColor`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#bearfillcolor)** (`string`): Sets the candle or point color used when the opening price is lower than the closing price. 
- **[`cardinalSplineTension`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#cardinalsplinetension)** (`number`): Sets the tension used for cardinal spline interpolation. 
- **[`lastValueLabel`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#lastvaluelabel)** (`LastValueLabelSettingsModel`): Configures an optional label that displays the series’ most recent value. 
- **[`legendShape`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#legendshape)** (`LegendShape`): Chooses the legend marker shape for the series. 
- **[`legendImageUrl`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockseriesmodel#legendimageurl)** (`string`): Supplies a custom image URL when the legend shape is set to image. 

### [`StockChartAxisModel`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel)

Use this model for `primaryXAxis`, `primaryYAxis`, or entries inside `axes` to define time/value scaling, labels, crossings, and axis-level tooltip behavior. 

- **[`crossesAt`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#crossesat)** (`Object`): Sets the value where the axis line intersects the opposite axis. is[`crossesInAxis`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#crossesinaxis)** (`string`): Names the opposite axis that this axis should cross. 
- **[`crosshairTooltip`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#crosshairtooltip)** (`CrosshairTooltipModel`): Configures the label shown on the axis(https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel)
- **[`description`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#description)** (`string`): Adds an accessibility description for the axis and its rendered element. 
- **[`desiredIntervals`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#desiredintervals)** (`number`): Requests an approximate interval count for automatic axis interval calculation. 
- **[`edgeLabelPlacement`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#edgelabelplacement)** (`EdgeLabelPlacement`): Controls how the first and last labels behave at the edges of the axis. 
- **[`enableAutoIntervalOnZooming`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#enableautointervalonzooming)** (`boolean`): Recalculates axis intervals automatically after zooming. 
- **[`enableTrim`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#enabletrim)** (`boolean`): Trims axis labels when space is constrained. 
- **[`interval`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#interval)** (`number`): Sets a fixed interval between axis labels and ticks. 
- **[`intervalType`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#intervaltype)** (`IntervalType`): Sets the datetime unit used for axis intervals, such as years, months, days, or hours. 
- **[`isInversed`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#isinversed)** (`boolean`): Renders the axis in inverse direction. 
- **[`labelFormat`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#labelformat)** (`string`): Formats axis labels using standard numeric/date formats or custom placeholder text. 
- **[`labelIntersectAction`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#labelintersectaction)** (`LabelIntersectAction`): Chooses whether intersecting labels are hidden or rotated. 
- **[`labelPlacement`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#labelplacement)** (`LabelPlacement`): Positions category labels on ticks or between ticks. 
- **[`labelPosition`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#labelposition)** (`AxisPosition`): Places labels inside or outside the axis line. 
- **[`labelRotation`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#labelrotation)** (`number`): Rotates the axis labels by the specified angle. 
- **[`labelStyle`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#labelstyle)** (`FontModel`): Controls the font used by axis labels. 
- **[`lineStyle`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#linestyle)** (`AxisLineModel`): Configures the axis line appearance. 
- **[`logBase`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#logbase)** (`number`): Sets the logarithmic base when the axis uses logarithmic scaling. 
- **[`majorGridLines`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#majorgridlines)** (`MajorGridLinesModel`): Configures the appearance of the major grid lines aligned to the axis interval. 
- **[`coefficient`](https://ej2.syncfusion.com/documentation/api/stock-chart/stockchartaxismodel#coefficient)** (`number`): Sets the polar/radar radius coefficient when the axis model is reused in those contexts. 

### [`PeriodsModel`](https://ej2.syncfusion.com/documentation/api/stock-chart/periodsmodel)

Use this model for each predefined range button in the stock chart’s period-selector UI. 

- **[`interval`](https://ej2.syncfusion.com/documentation/api/stock-chart/periodsmodel#interval)** (`number`): Sets the numeric span associated with the button. 
- **[`intervalType`](https://ej2.syncfusion.com/documentation/api/stock-chart/periodsmodel#intervaltype)** (`RangeIntervalType`): Sets the unit used by the button, such as years, months, weeks, days, hours, or minutes. layed on the button. 
- **[`selected`](https://ej2.syncfusion.com/documentation/api/stock-chart/periodsmodel#selected)** (`boolean`): Marks the default active period when the chart first loads. 

### [`PeriodSelectorSettingsModel`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/periodselectorsettingsmodel)

This companion model documents the stock chart’s period-selector settings when you need to reason about the nested period-selector configuration surface exposed by Syncfusion’s API [PeriodSelectorSettingsModel`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/periodselectorsettingsmodel)

- **[`height`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/periodselectorsettingsmodel#height)** (`number`): Sets the rendered height of the period selector. 
- **[`periods`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/periodselectorsettingsmodel#periods)** (`PeriodsModel[]`): Supplies the individual period button definitions. 
- **[`position`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/periodselectorsettingsmodel#position)** (`PeriodSelectorPosition`): Chooses the vertical placement of the period selector. 

### [`ZoomSettingsModel`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel)

Use this shared chart model with the root `zoomSettings` prop as `:zoom-settings="{ ... }"` to configure zoom, pan, and toolbar behavior in the stock chart. 

- **[`enableSelectionZooming`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel#enableselectionzooming)** (`boolean`): Enables rubber-band selection zooming inside the plot area. 
- **[`enableMouseWheelZooming`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel#enablemousewheelzooming)** (`boolean`): Enables mouse-wheel zooming. 
- **[`enablePinchZooming`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel#enablepinchzooming)** (`boolean`): Enables pinch zooming on touch devices. 
- **[`enablePan`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel#enablepan)** (`boolean`): Enables panning interaction without requiring the zoom toolbar to trigger pan mode. 
- **[`enableDeferredZooming`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel#enabledeferredzooming)** (`boolean`): Delays applying the zoom until mouse release after a selection interaction. 
- **[`enableAnimation`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel#enableanimation)** (`boolean`): Animates the chart during zoom transitions. 
- **[`enableScrollbar`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel#enablescrollbar)** (`boolean`): Shows a scrollbar on the axis for zoomed navigation. 
- **[`mode`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel#mode)** (`ZoomMode`): Restricts zooming to the X axis, Y axis, or both axes. 
- **[`showToolbar`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel#showtoolbar)** (`boolean`): Forces the zoom toolbar to render from the initial load. 
- **[`toolbarItems`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel#toolbaritems)** (`ToolbarItems[]`): Selects which zoom toolbar actions, such as Zoom, ZoomIn, ZoomOut, Pan, and Reset, are available. 
- **[`toolbarPosition`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel#toolbarposition)** (`ToolbarPositionModel`): Customizes where the zoom toolbar is placed relative to the chart. 
- **[`accessibility`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel#accessibility)** (`AccessibilityModel`): Improves accessibility for zoom toolkit elements. 

---

## Component Methods

These methods are called from the EJ2 instance, for example `this.$refs.stockchart.ej2Instances.rangeChanged(...)`, where `stockchart` is your Vue ref name. 

- **[`chartModuleInjection()`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#chartmoduleinjection)**: Injects the required chart modules into the stock chart component instance. 
- **[`destroy()`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#destroy)**: Disposes the stock chart instance and releases its rendered resources. 
- **[`getModuleName()`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#getmodulename)**: Returns the registered component module name string for the stock chart instance. 
- **[`rangeChanged(updatedStart, updatedEnd)`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#rangechanged)**: Programmatically changes the visible range of the stock chart to the provided start and end values. 
- **[`renderPeriodSelector()`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#renderperiodselector)**: Renders or re-renders the stock chart period selector UI. 
- **[`stockChartDataManagerSuccess()`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#stockchartdatamanagersuccess)**: Handles the internal success path after DataManager-driven data retrieval completes. 

---

## Events (@-Bindings)

Bind these in Vue templates using event listeners such as `@load="onLoad"` or `@pointClick="onPointClick"`. 

- **[`@axisLabelRender`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#axislabelrender)**: Fires before each axis label is rendered so you can customize the label text or style via `IAxisLabelRenderEventArgs`. 
- **[`@beforeExport`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#beforeexport)**: Fires before export begins so you can customize export settings through `IExportEventArgs`. 
- **[`@crosshairLabelRender`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#crosshairlabelrender)**: Fires before the crosshair tooltip label for the series is rendered and exposes `ICrosshairLabelRenderEventArgs`. 
- **[`@legendClick`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#legendclick)**: Fires after a legend item is clicked and exposes `IStockLegendClickEventArgs`. 
- **[`@legendRender`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#legendrender)**: Fires before a legend item is rendered so you can customize it with `IStockLegendRenderEventArgs`. 
- **[`@load`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#load)**: Fires before the stock chart and range navigator render and exposes `IStockChartEventArgs`. 
- **[`@loaded`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#loaded)**: Fires after the stock chart and range navigator finish rendering and exposes `IStockChartEventArgs`. 
- **[`@onZooming`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#onzooming)**: Fires after zoom selection is completed and exposes `IZoomingEventArgs`. 
- **[`@pointClick`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#pointclick)**: Fires when a data point is clicked and exposes `IPointEventArgs`. 
- **[`@pointMove`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#pointmove)**: Fires when the pointer moves across a data point and exposes `IPointEventArgs`. 
- **[`@rangeChange`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#rangechange)**: Fires whenever the selected visible range changes and exposes `IRangeChangeEventArgs`. 
- **[`@selectorRender`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#selectorrender)**: Fires before the selector is rendered and exposes `IRangeSelectorRenderEventArgs`. 
- **[`@seriesRender`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#seriesrender)**: Fires before a series is rendered and exposes `ISeriesRenderEventArgs`. 
- **[`@stockChartMouseClick`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#stockchartmouseclick)**: Fires when the user clicks inside the stock chart area and exposes `IMouseEventArgs`. 
- **[`@stockChartMouseDown`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#stockchartmousedown)**: Fires when the mouse button is pressed over the stock chart and exposes `IMouseEventArgs`. 
- **[`@stockChartMouseLeave`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#stockchartmouseleave)**: Fires when the pointer leaves the stock chart and exposes `IMouseEventArgs`. 
- **[`@stockChartMouseMove`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#stockchartmousemove)**: Fires while the pointer moves over the stock chart and exposes `IMouseEventArgs`. 
- **[`@stockChartMouseUp`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#stockchartmouseup)**: Fires when the mouse button is released over the stock chart and exposes `IMouseEventArgs`. 
- **[`@stockEventRender`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#stockeventrender)**: Fires before a stock-event marker is rendered and exposes `IStockEventRenderArgs`. 
- **[`@tooltipRender`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#tooltiprender)**: Fires before the series tooltip is rendered and exposes `ITooltipRenderEventArgs`. 

---

## Common Usage Patterns

- Combine [`series`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#series), [`primaryXAxis`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#primaryxaxis), and [`primaryYAxis`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#primaryyaxis) for the standard single-pane financial chart layout. 
- Pair [`tooltip`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#tooltip) with [`crosshair`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#crosshair) to create an interactive hover experience that shows precise values and guide lines. 
- Use [`periods`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#periods), [`enablePeriodSelector`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#enableperiodselector), and [`enableCustomRange`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#enablecustomrange) to provide quick date presets plus custom date picking. 
- Turn on [`zoomSettings`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#zoomsettings) with `enableSelectionZooming`, `enableMouseWheelZooming`, and `enablePinchZooming` for desktop-and-touch analysis workflows. 
- Add [`rows`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#rows) plus extra [`axes`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#axes) to split price and volume into separate panes. 
- Use [`stockEvents`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#stockevents) alongside a visible main [`series`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#series) to annotate earnings, market opens, or other timeline events. 
- Combine [`indicators`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#indicators), [`indicatorType`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#indicatortype), and [`trendlineType`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#trendlinetype) to expose built-in technical analysis overlays from the stock chart UI. 
- Use [`exportType`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#exporttype) with [`@beforeExport`](https://ej2.syncfusion.com/vue/documentation/api/stock-chart/#beforeexport) when you need built-in export options plus last-moment export customization. 

---

## Implementation Notes for Vue

- Register the component from `@syncfusion/ej2-vue-charts` using `StockChartComponent` and use child directives such as `StockChartSeriesCollectionDirective` and `StockChartSeriesDirective` when defining nested series declaratively in Vue. 
- Bind complex configuration objects like `tooltip`, `crosshair`, `primaryXAxis`, and `zoomSettings` as reactive Vue objects in camelCase while using kebab-case in template bindings such as `:primary-x-axis` and `:zoom-settings`. 
- Access imperative APIs through a Vue ref and call methods on `this.$refs.yourRef.ej2Instances` only after the component has rendered, typically in `mounted()` or after `nextTick()`. 
- When using remote data with `DataManager`, prefer changing bound props reactively and let the EJ2 instance re-render rather than mutating unrelated internal state directly. 
- For event-driven customization, wire Vue listeners like `@tooltipRender`, `@seriesRender`, or `@axisLabelRender` and mutate the provided event args instead of trying to patch DOM output after render. 
