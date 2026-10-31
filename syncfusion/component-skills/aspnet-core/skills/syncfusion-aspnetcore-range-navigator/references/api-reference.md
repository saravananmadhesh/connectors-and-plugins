# Range Navigator API Reference

Complete API reference for the Syncfusion ASP.NET Core Range Navigator ([`Syncfusion.EJ2.Charts.RangeNavigator`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html)) component. 

- **Base API Documentation:** [Range Navigator](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html)
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll` 

## Table of Contents

- [Constructor](#constructor)
- [Core Component Properties](#core-component-properties)
  - [Data Binding and Selection](#data-binding-and-selection)
  - [Axis and Scale](#axis-and-scale)
  - [Labeling and Axis Presentation](#labeling-and-axis-presentation)
  - [Layout and Appearance](#layout-and-appearance)
  - [Interactivity, Period Selection, and Tooltip](#interactivity-period-selection-and-tooltip)
  - [Localization, HTML, and State](#localization-html-and-state)
  - [Events](#events)
- [Series Configuration Properties](#series-configuration-properties)
  - [RangeNavigatorRangenavigatorSeries](#rangenavigatorrangenavigatorseries)
- [Animation Settings Properties](#animation-settings-properties)
  - [RangeNavigatorAnimation](#rangenavigatoranimation)
- [Border Settings Properties](#border-settings-properties)
  - [RangeNavigatorBorder](#rangenavigatorborder)
  - [RangeNavigatorNavigatorBorderRangeNavigator](#rangenavigatornavigatorborderrangenavigator)
- [Font Settings Properties](#font-settings-properties)
  - [RangeNavigatorFont](#rangenavigatorfont)
- [Grid and Tick Line Properties](#grid-and-tick-line-properties)
  - [RangeNavigatorMajorGridLines](#rangenavigatormajorgridlines)
  - [RangeNavigatorMajorTickLines](#rangenavigatormajorticklines)
- [Margin Properties](#margin-properties)
  - [RangeNavigatorMargin](#rangenavigatormargin)
- [Period Selector Properties](#period-selector-properties)
  - [RangeNavigatorPeriod](#rangenavigatorperiod)
- [Tooltip Properties](#tooltip-properties)
  - [RangeNavigatorRangeTooltipSettings](#rangenavigatorrangetooltipsettings)
- [Style and Thumb Properties](#style-and-thumb-properties)
  - [RangeNavigatorStyleSettings](#rangenavigatorstylesettings)
- [Collection and Enum References](#collection-and-enum-references)
  - [Collections](#collections)
- [Related Settings Classes](#related-settings-classes)
  - [Primary Component and Series Classes](#primary-component-and-series-classes)
  - [Appearance and Layout Classes](#appearance-and-layout-classes)
  - [Period Selector and Tooltip Classes](#period-selector-and-tooltip-classes)
  - [Builder Classes](#builder-classes)
  - [Enum](#enum)
- [Common Usage Patterns](#common-usage-patterns)
  - [Basic RangeNavigator with DateTime Data](#basic-rangenavigator-with-datetime-data)
  - [RangeNavigator with Period Selector](#rangenavigator-with-period-selector)
  - [RangeNavigator with Tooltip](#rangenavigator-with-tooltip)
  - [Lightweight Range Selector (No Chart)](#lightweight-range-selector-no-chart)
  - [RangeNavigator with Custom Styling](#rangenavigator-with-custom-styling)
- [Common Property Combinations](#common-property-combinations)
- [Notes](#notes)

---

## Constructor

- **[RangeNavigator()](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html)**
Creates a new instance of the Range Navigator component. 

---

## Core Component Properties

### Data Binding and Selection
- **[`allowIntervalData`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_AllowIntervalData)** (`bool`): Allows users to select data for a specific interval by clicking the corresponding axis label. 
- **[`allowSnapping`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_AllowSnapping)** (`bool`): Snaps the slider handles to the nearest interval while the range is adjusted. 
- **[`dataSource`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_DataSource)** (`object`): Defines the data source used by the range navigator when binding directly. 
- **[`query`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Query)** (`string`): Applies a query to the bound data source before the navigator renders. 
- **[`series`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Series)** (`List<RangeNavigatorRangenavigatorSeries>`): Specifies the series collection rendered inside the range navigator.
- **[`valueType`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_ValueType)** (`RangeValueType`): Determines whether the navigator axis uses numeric, logarithmic, or date-based values. 
- **[`xName`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_XName)** (`string`): Identifies the field that provides x-values for direct data binding. 
- **[`yName`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_YName)** (`string`): Identifies the field that provides y-values for direct data binding. 

### Axis and Scale
- **[`groupBy`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_GroupBy)** (`RangeIntervalType`): Specifies how labels are grouped across the navigator axis. 
- **[`interval`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Interval)** (`double`): Sets the interval used to generate labels and ticks on the axis. 
- **[`intervalType`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_IntervalType)** (`RangeIntervalType`): Sets the time unit used when the axis is based on date-time values. 
- **[`logBase`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LogBase)** (`double`): Defines the logarithmic base used when the axis is in logarithmic mode. 
- **[`maximum`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Maximum)** (`string`): Sets the maximum value rendered on the axis. 
- **[`minimum`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Minimum)** (`string`): Sets the minimum value rendered on the axis. 

### Labeling and Axis Presentation
- **[`enableGrouping`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_EnableGrouping)** (`bool`): Enables grouped label rendering for supported axis types. 
- **[`labelFormat`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelFormat)** (`string`): Formats axis labels using a standard format string or placeholder pattern. 
- **[`labelIntersectAction`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelIntersectAction)** (`RangeLabelIntersectAction`): Controls how overlapping labels are handled during rendering. 
- **[`labelPlacement`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelPlacement)** (`NavigatorPlacement`): Determines whether labels are rendered on ticks, between ticks, or automatically placed. 
- **[`labelPosition`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelPosition)** (`AxisPosition`): Positions axis labels either inside or outside the navigator axis. 
- **[`labelStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelStyle)** (`RangeNavigatorFont`): Configures the font appearance used for axis labels. 
- **[`majorTickLines`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_MajorTickLines)** (`RangeNavigatorMajorTickLines`): Configures the major tick lines displayed along the axis. 
- **[`secondaryLabelAlignment`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_SecondaryLabelAlignment)** (`LabelAlignment`): Aligns secondary axis labels relative to their available space. 
- **[`skeleton`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Skeleton)** (`string`): Specifies the date-time skeleton used for label formatting. 
- **[`skeletonType`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_SkeletonType)** (`SkeletonType`): Specifies whether the skeleton is applied as date, time, or date-time formatting. 
- **[`tickPosition`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_TickPosition)** (`AxisPosition`): Positions tick marks either inside or outside the axis line. 

### Layout and Appearance
- **[`animationDuration`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_AnimationDuration)** (`double`): Sets the duration used for component-level animation. 
- **[`background`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Background)** (`string`): Sets the background color rendered behind the navigator. 
- **[`height`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Height)** (`string`): Sets the overall height of the range navigator. 
- **[`margin`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Margin)** (`RangeNavigatorMargin`): Defines the outer spacing around the navigator content. ** (`RangeNavigatorBorder`): Configures the border drawn around the navigator. 
- **[`navigatorStyleSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_NavigatorStyleSettings)** (`RangeNavigatorStyleSettings`): Customizes selected region, unselected region, and thumb styling.
- **[`theme`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Theme)** (`ChartTheme`): Applies a predefined visual theme to the component. 
- **[`width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Width)** (`string`): Sets the overall width of the range navigator. 

### Interactivity, Period Selection, and Tooltip
- **[`disableRangeSelector`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_DisableRangeSelector)** (`bool`): Renders the period selector without displaying the interactive range selector surface. 
- **[`enableDeferredUpdate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_EnableDeferredUpdate)** (`bool`): Delays range updates until the user finishes dragging the slider. 
- **[`periodSelectorSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_PeriodSelectorSettings)** (`RangeNavigatorPeriodSelectorSettings`): Configures the preset period selector shown with the navigator.
- **[`tooltip`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Tooltip)** (`RangeNavigatorRangeTooltipSettings`): Configures the tooltip used to display selected range values.

### Localization, HTML, and State
- **[`enablePersistence`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_EnablePersistence)** (`bool`): Persists component state across page reloads. 
- **[`enableRtl`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_EnableRtl)** (`bool`): Enables right-to-left layout and rendering behavior. 
- **[`htmlAttributes`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_HtmlAttributes)** (`object`): Adds arbitrary HTML attributes to the rendered root element. 
- **[`locale`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Locale)** (`string`): Overrides the global culture and localization for this instance. 
- **[`useGroupingSeparator`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_UseGroupingSeparator)** (`bool`): Displays grouping separators when numeric values are formatted. 

### Events
- **[`beforePrint`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_BeforePrint)** (`string`): Triggers before the component begins a print operation. 
- **[`beforeResize`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_BeforeResize)** (`string`): Triggers before the component processes a resize event. 
- **[`changed`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Changed)** (`string`): Triggers after the selected range has changed. 
- **[`labelRender`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelRender)** (`string`): Triggers before each axis label is rendered. 
- **[`load`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Load)** (`string`): Triggers before the range navigator starts rendering. 
- **[`loaded`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Loaded)** (`string`): Triggers after the range navigator has finished rendering. 
- **[`resized`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Resized)** (`string`): Triggers after the component has been resized. 
- **[`selectorRender`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_SelectorRender)** (`string`): Triggers before the selector UI is rendered. 
- **[`tooltipRender`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_TooltipRender)** (`string`): Triggers before tooltip content is rendered for the selected range. 

---

## Series Configuration Properties

### [`RangeNavigatorRangenavigatorSeries`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html)
- **[`animation`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_Animation)** (`RangeNavigatorAnimation`): Configures how the series animates when it is rendered. core-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_DashArray)** (`string`): Defines a dashed stroke pattern for line-type series. 
- **[`dataSource`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_DataSource)** (`object`): Defines the data source used by an individual series. 
- **[`fill`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_Fill)** (`string`): Sets the fill color applied to the series. 
- **[`opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_Opacity)** (`double`): Controls the opacity of the series rendering. 
- **[`query`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_Query)** (`string`): Applies a query to the series data source before binding. 
- **[`type`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_Type)** (`RangeNavigatorType`): Selects the rendering type used by the series. series. 
- **[`xName`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_XName)** (`string`): Identifies the field that provides x-values for the series. 
- **[`yName`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_YName)** (`string`): Identifies the field that provides y-values for the series. 

---

## Animation Settings Properties

### [`RangeNavigatorAnimation`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimation.html)
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimation.html#Syncfusion_EJ2_Charts_RangeNavigatorAnimation_ContentTemplate)** (`MvcTemplate<object>`): Provides an MVC template object for animation-related markup scenarios. 
- **[`delay`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimation.html#Syncfusion_EJ2_Charts_RangeNavigatorAnimation_Delay)** (`double`): Delays the start of series animation by the specified time. 
- **[`duration`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimation.html#Syncfusion_EJ2_Charts_RangeNavigatorAnimation_Duration)** (`double`): Sets the length of the series animation in milliseconds. 
- **[`enable`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimation.html#Syncfusion_EJ2_Charts_RangeNavigatorAnimation_Enable)** (`bool`): Enables animation for the series during initial rendering. 

---

## Border Settings Properties

### [`RangeNavigatorBorder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorBorder.html)
- **[`color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorBorder.html#Syncfusion_EJ2_Charts_RangeNavigatorBorder_Color)** (`string`): Sets the border color using a valid CSS color value. 
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorBorder.html#Syncfusion_EJ2_Charts_RangeNavigatorBorder_ContentTemplate)** (`MvcTemplate<object>`): Provides an MVC template object for border-related markup scenarios. 
- **[`dashArray`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorBorder.html#Syncfusion_EJ2_Charts_RangeNavigatorBorder_DashArray)** (`string`): Defines the dash pattern used to stroke the border. 
- **[`width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorBorder.html#Syncfusion_EJ2_Charts_RangeNavigatorBorder_Width)** (`double`): Sets the border width in pixels. 

### [`RangeNavigatorNavigatorBorderRangeNavigator`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorNavigatorBorderRangeNavigator.html)
- **Inherits `RangeNavigatorBorder`**: This specialized border class uses the same documented border members as `RangeNavigatorBorder` for navigator-specific border configuration. 

---

## Font Settings Properties

### [`RangeNavigatorFont`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html)
- **[`color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_Color)** (`string`): Sets the text color used by labels or tooltip text. 
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_ContentTemplate)** (`MvcTemplate<object>`): Provides an MVC template object for font-related markup scenarios. 
- **[`fontFamily`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_FontFamily)** (`string`): Specifies the font family used to render text. 
- **[`fontStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_FontStyle)** (`string`): Specifies the font style used to render text. 
- **[`fontWeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_FontWeight)** (`string`): Specifies the font weight used to render text. 
- **[`opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_Opacity)** (`double`): Controls the opacity of rendered text. 
- **[`size`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_Size)** (`string`): Sets the text size used for rendering. 
- **[`textAlignment`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_TextAlignment)** (`Alignment`): Sets the alignment used when text is rendered. 
- **[`textOverflow`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_TextOverflow)** (`TextOverflow`): Controls how overflowing text is wrapped or truncated. 

---

## Grid and Tick Line Properties

### [`RangeNavigatorMajorGridLines`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorGridLines.html)
- **[`color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorGridLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorGridLines_Color)** (`string`): Sets the color of the major grid lines. 
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorGridLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorGridLines_ContentTemplate)** (`MvcTemplate<object>`): Provides an MVC template object for major grid line markup scenarios. 
- **[`dashArray`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorGridLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorGridLines_DashArray)** (`string`): Defines the dash pattern applied to major grid lines. 
- **[`width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorGridLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorGridLines_Width)** (`double`): Sets the thickness of the major grid lines. 

### [`RangeNavigatorMajorTickLines`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorTickLines.html)
- **[`color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorTickLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorTickLines_Color)** (`string`): Sets the color of the major tick lines. 
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorTickLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorTickLines_ContentTemplate)** (`MvcTemplate<object>`): Provides an MVC template object for major tick line markup scenarios. 
- **[`height`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorTickLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorTickLines_Height)** (`double`): Sets the length of major tick lines in pixels. 
- **[`width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorTickLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorTickLines_Width)** (`double`): Sets the thickness of major tick lines in pixels. 

---

## Margin Properties

### [`RangeNavigatorMargin`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMargin.html)
- **[`bottom`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMargin.html#Syncfusion_EJ2_Charts_RangeNavigatorMargin_Bottom)** (`double`): Sets the bottom margin of the navigator in pixels. 
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMargin.html#Syncfusion_EJ2_Charts_RangeNavigatorMargin_ContentTemplate)** (`MvcTemplate<object>`): Provides an MVC template object for margin-related markup scenarios. 
- **[`left`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMargin.html#Syncfusion_EJ2_Charts_RangeNavigatorMargin_Left)** (`double`): Sets the left margin of the navigator in pixels. 
- **[`right`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMargin.html#Syncfusion_EJ2_Charts_RangeNavigatorMargin_Right)** (`double`): Sets the right margin of the navigator in pixels. 
- **[`top`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMargin.html#Syncfusion_EJ2_Charts_RangeNavigatorMargin_Top)** (`double`): Sets the top margin of the navigator in pixels. 

---

## Period Selector Properties

### [`RangeNavigatorPeriod`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriod.html)
- **[`interval`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriod.html#Syncfusion_EJ2_Charts_RangeNavigatorPeriod_Interval)** (`double`): Sets the interval count represented by the period button. d selector UI for quick range selection. 
- **[`height`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriodSelectorSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorPeriodSelectorSettings_Height)** (`double`): Sets the height of the period selector area. 
- **[`periods`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriodSelectorSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorPeriodSelectorSettings_Periods)** (`List<RangeNavigatorPeriod>`): Specifies the collection of predefined period buttons available to users.  [14](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriod.html)
- **[`position`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriodSelectorSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorPeriodSelectorSettings_Position)** (`PeriodSelectorPosition`): Controls whether the period selector is rendered above or below the navigator. 

---

## Tooltip Properties

### [`RangeNavigatorRangeTooltipSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html)
- **[`border`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_Border)** (`RangeNavigatorBorder`): Configures the tooltip border appearance.
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_ContentTemplate)** (`MvcTemplate<object>`): Provides an MVC template object for tooltip content markup scenarios.
- **[`displayMode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_DisplayMode)** (`TooltipDisplayMode`): Controls how the tooltip is shown while the range is selected.
- **[`enable`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_Enable)** (`bool`): Enables the tooltip for selected range values.
- **[`fill`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_Fill)** (`string`): Sets the background fill color of the tooltip.
- **[`format`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_Format)** (`string`): Formats the tooltip text shown for the selected range.
- **[`opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_Opacity)** (`double`): Sets the opacity of the tooltip background.
- **[`template`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_Template)** (`string`): Defines a custom template string for tooltip rendering.
- **[`textStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_TextStyle)** (`RangeNavigatorFont`): Configures the font styling used by tooltip text.

---

## Style and Thumb Properties

### [`RangeNavigatorStyleSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorStyleSettings.html)
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorStyleSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorStyleSettings_ContentTemplate)** (`MvcTemplate<object>`): Provides an MVC template object for navigator style markup scenarios.
- **[`selectedRegionColor`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorStyleSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorStyleSettings_SelectedRegionColor)** (`string`): Sets the color used for the selected region of the navigator.
- **[`thumb`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorStyleSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorStyleSettings_Thumb)** (`RangeNavigatorThumbSettings`): Configures the appearance of the range selector thumb handles. avigatorThumbSettings.** (`MvcTemplate<object>`): Provides an MVC template object for custom thumb content.
- **[`fill`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorThumbSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorThumbSettings_Fill)** (`string`): Sets the fill color of the thumb handle.
- **[`height`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorThumbSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorThumbSettings_Height)** (`double`): Sets the height of the thumb handle.
- **[`type`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorThumbSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorThumbSettings_Type)** (`ThumbType`): Selects the shape type used by the thumb handle.
- **[`width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorThumbSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorThumbSettings_Width)** (`double`): Sets the width of the thumb handle.

---

## Collection and Enum References

### Collections
- **[`RangeNavigatorPeriods`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriods.html)**: Represents the period collection container used with the period selector.
- **[`RangeNavigatorRangenavigatorSeriesCollection`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeriesCollection.html)**: Represents the series collection container used for nested series declarations.
  - **[`Line`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorType.html#Syncfusion_EJ2_Charts_RangeNavigatorType_Line)**: Renders the series as a line chart.
  - **[`Area`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorType.html#Syncfusion_EJ2_Charts_RangeNavigatorType_Area)**: Renders the series as a area chart.
  - **[`StepLine`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorType.html#Syncfusion_EJ2_Charts_RangeNavigatorType_StepLine)**: Renders the series as a step line chart.

---

## Related Settings Classes

### Primary Component and Series Classes
- **[`RangeNavigator`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html)**
- **[`RangeNavigatorRangenavigatorSeries`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html)**
- **[`RangeNavigatorRangenavigatorSeriesCollection`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeriesCollection.html)**
### Appearance and Layout Classes
- **[`RangeNavigatorAnimation`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimation.html)**
- **[`RangeNavigatorBorder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorBorder.html)**
- **[`RangeNavigatorFont`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html)**
- **[`RangeNavigatorMajorGridLines`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorGridLines.html)**
- **[`RangeNavigatorMajorTickLines`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorTickLines.html)**
- **[`RangeNavigatorMargin`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMargin.html)**
- **[`RangeNavigatorNavigatorBorderRangeNavigator`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorNavigatorBorderRangeNavigator.html)**
- **[`RangeNavigatorStyleSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorStyleSettings.html)**
- **[`RangeNavigatorThumbSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorThumbSettings.html)**

### Period Selector and Tooltip Classes
- **[`RangeNavigatorPeriod`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriod.html)**
- **[`RangeNavigatorPeriods`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriods.html)**
- **[`RangeNavigatorPeriodSelectorSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriodSelectorSettings.html)**
- **[`RangeNavigatorRangeTooltipSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html)**

### Builder Classes
- **[`RangeNavigatorAnimationBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimationBuilder.html)** 
- **[`RangeNavigatorBorderBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorBorderBuilder.html)**
- **[`RangeNavigatorFontBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorFontBuilder.html)**
- **[`RangeNavigatorMajorGridLinesBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorGridLinesBuilder.html)** 
- **[`RangeNavigatorMajorTickLinesBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorTickLinesBuilder.html)** 
- **[`RangeNavigatorMarginBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorMarginBuilder.html)** 
- **[`RangeNavigatorPeriodBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriodBuilder.html)** 
- **[`RangeNavigatorPeriodSelectorSettingsBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriodSelectorSettingsBuilder.html)**
- **[`RangeNavigatorRangenavigatorSeriesBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeriesBuilder.html)**
- **[`RangeNavigatorRangeTooltipSettingsBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettingsBuilder.html)**
- **[`RangeNavigatorStyleSettingsBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorStyleSettings.html)** 
- **[`RangeNavigatorThumbSettingsBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorThumbSettingsBuilder.html)** 

### Enum
- **[`RangeNavigatorType`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorType.html)**

---

## Common Usage Patterns

- Use [`series`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Series), [`series.xName`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_XName), [`series.yName`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_YName), and [`valueType`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_ValueType) together to build a date-based or numeric overview range selector.
- Combine [`allowSnapping`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_AllowSnapping), [`interval`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Interval), and [`intervalType`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_IntervalType) when the selected range must align to exact calendar or numeric boundaries.
- Use [`periodSelectorSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_PeriodSelectorSettings) with [`periodSelectorSettings.periods`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriodSelectorSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorPeriodSelectorSettings_Periods) and [`RangeNavigatorPeriod.text`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriod.html#Syncfusion_EJ2_Charts_RangeNavigatorPeriod_Text) to provide quick preset range buttons.
- Pair [`tooltip`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Tooltip), [`tooltip.format`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_Format), and [`tooltip.textStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_TextStyle) to display a readable textual summary of the current selection.
- Use [`navigatorStyleSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_NavigatorStyleSettings), [`navigatorStyleSettings.thumb`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorStyleSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorStyleSettings_Thumb), and [`thumb.fill`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorThumbSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorThumbSettings_Fill) to fully customize the selected region and drag handles.
- Combine [`minimum`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Minimum), [`maximum`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Maximum), and [`value`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Value) to create a lightweight selector even without a plotted series.
- Pair [`enableDeferredUpdate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_EnableDeferredUpdate) with the [`changed`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Changed) event to reduce repeated updates during drag interactions.
- Use [`labelFormat`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelFormat), [`skeleton`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Skeleton), and [`locale`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Locale) together when localized date labels must follow a specific format.

---


### Basic RangeNavigator with DateTime Data
```cshtml
<ejs-rangenavigator id="rangeNavigator" 
    valueType="DateTime" 
    width="100%" 
    height="150px">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@ViewBag.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

### RangeNavigator with Period Selector
```cshtml
<ejs-rangenavigator valueType="DateTime" width="100%" height="150px" id="periodSelector">
    <e-rangenavigator-periodselectorsettings enabled="true" position="Bottom">
        <e-periods>
            <e-period interval="1" intervalType="Days" text="1D"></e-period>
            <e-period interval="5" intervalType="Days" text="5D"></e-period>
            <e-period interval="1" intervalType="Months" text="1M"></e-period>
            <e-period interval="3" intervalType="Months" text="3M"></e-period>
        </e-periods>
    </e-rangenavigator-periodselectorsettings>
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@ViewBag.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

### RangeNavigator with Tooltip
```cshtml
<ejs-rangenavigator valueType="DateTime" id="renderTooltip">
    <e-rangenavigator-tooltip enable="true"></e-rangenavigator-tooltip>
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@ViewBag.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

### Lightweight Range Selector (No Chart)
```cshtml
<!-- Lightweight Range Selector (No Chart) -->
<!-- No series configuration = lightweight mode -->
<ejs-rangenavigator id="lightweightRange" 
    dataSource="@Model.Data"
    valueType="DateTime" 
    value="value" 
    xName="x" 
    yName="y"
    maximum="new DateTime(2018, 12, 31)">
</ejs-rangenavigator>
```

### RangeNavigator with Custom Styling
```cshtml
<ejs-rangenavigator valueType="DateTime" width="100%" height="150px" id="customStyling">
    <e-rangenavigator-navigatorstylesettings 
        selectedRegionColor="rgba(0, 123, 255, 0.3)" 
        unselectedRegionColor="rgba(200, 200, 200, 0.2)">
    </e-rangenavigator-navigatorstylesettings>
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@ViewBag.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

---

## Common Property Combinations

- **With Period Selector:** Set `periodSelectorSettings.enable = true` + define `periodSelectorSettings.periods`
- **Numeric Scale:** Set `valueType = RangeValueType.Double` + define `minimum` and `maximum`
- **Snapping:** Set `allowSnapping = true` + set `interval` and `intervalType`
- **Deferred Updates:** Set `enableDeferredUpdate = true` to update only on slider release
- **Lightweight Mode:** Use without series configuration
- **DateTime Scale:** Set `valueType = RangeValueType.DateTime` + use DateTime data in dataSource

---

## Notes

- All dates should use ISO 8601 format (`YYYY-MM-DD`) when binding `DateTime` values.
- The component supports both direct binding through [`dataSource`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_DataSource), [`xName`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_XName), and [`yName`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_YName) and series-based binding through [`series`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Series).
- Visual customization is split across general component properties like [`background`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Background) and nested appearance objects like [`navigatorStyleSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_NavigatorStyleSettings), [`thumb`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorStyleSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorStyleSettings_Thumb), and [`tooltip`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Tooltip).
- The reference list includes helper collection and builder types such as [`RangeNavigatorPeriods`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriods.html), [`RangeNavigatorRangenavigatorSeriesCollection`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeriesCollection.html), and the corresponding builder classes to support tag-helper and fluent configuration patterns.
