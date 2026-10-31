# API Reference

Complete API reference for the **Syncfusion RangeNavigator** component based on the class.
**Component:** Syncfusion Range Navigator for ASP.NET MVC  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Base API Documentation:** [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html)

> **Default value rule used below**
> - If the API text explicitly provides a default value, it is shown exactly.
> - If the API text does **not** explicitly provide a default value, the default is shown as `-`.

---

## Table of Contents

- [RangeNavigator Class](#rangenavigator-class)
  - [Constructor](#constructor)
- [RangeNavigator Properties](#rangenavigator-properties)
- [RangeNavigatorAnimation Class](#rangenavigatoranimation-class)
  - [Constructor](#constructor-1)
  - [Properties](#properties)
- [RangeNavigatorAnimationBuilder Class](#rangenavigatoranimationbuilder-class)
  - [Constructors](#constructors)
  - [Methods](#methods)
- [RangeNavigatorRangenavigatorSeries Class](#rangenavigatorrangenavigatorseries-class)
  - [Constructor](#constructor-2)
  - [Properties](#properties-1)
- [RangeNavigatorRangeTooltipSettings Class](#rangenavigatorrangetooltipsettings-class)
  - [Constructor](#constructor-3)
  - [Properties](#properties-2)
- [RangeNavigatorPeriodSelectorSettings Class](#rangenavigatorperiodselectorsettings-class)
  - [Constructor](#constructor-4)
  - [Properties](#properties-3)
- [RangeNavigatorStyleSettings Class](#rangenavigatorstylesettings-class)
  - [Constructor](#constructor-5)
  - [Properties](#properties-4)
- [RangeNavigatorThumbSettings Class](#rangenavigatorthumbsettings-class)
  - [Constructor](#constructor-6)
  - [Properties](#properties-5)
- [RangeNavigatorFont Class](#rangenavigatorfont-class)
  - [Constructor](#constructor-7)
  - [Properties](#properties-6)
- [RangeNavigatorMargin Class](#rangenavigatormargin-class)
  - [Constructor](#constructor-8)
  - [Properties](#properties-7)
- [RangeNavigatorBorder Class](#rangenavigatorborder-class)
  - [Constructor](#constructor-9)
  - [Properties](#properties-8)
- [RangeNavigatorMajorTickLines Class](#rangenavigatormajorticklines-class)
  - [Constructor](#constructor-10)
  - [Properties](#properties-9)
- [RangeNavigatorMajorGridLines Class](#rangenavigatormajorgridlines-class)
  - [Constructor](#constructor-11)
  - [Properties](#properties-10)
- [Enumerations](#enumerations)
  - [RangeValueType](#rangevaluetype)
  - [RangeIntervalType](#rangeintervaltype)
  - [RangeLabelIntersectAction](#rangelabelintersectaction)
  - [NavigatorPlacement](#navigatorplacement)
  - [RangeNavigatorType](#rangenavigatortype)
  - [ThumbType](#thumbtype)
  - [PeriodSelectorPosition](#periodselectorposition)
  - [TooltipDisplayMode](#tooltipdisplaymode)
  - [AxisPosition](#axisposition)
  - [LabelAlignment](#labelalignment)
  - [ChartTheme](#charttheme)
  - [SkeletonType](#skeletontype)
  - [Alignment](#alignment)
  - [TextOverflow](#textoverflow)
- [Events](#events)
  - [RangeNavigator Events](#rangenavigator-events)
  - [Event Categories](#event-categories)
    - [Lifecycle Events](#lifecycle-events)
    - [Resize Events](#resize-events)
    - [Interaction Events](#interaction-events)
    - [Rendering Events](#rendering-events)
    - [Print Event](#print-event)
  - [Event Usage Example](#event-usage-example)
- [Methods](#methods-1)
  - [RangeNavigator Client-Side Methods](#rangenavigator-client-side-methods)
  - [RangeNavigatorAnimationBuilder Methods](#rangenavigatoranimationbuilder-methods)
  - [Method Usage Example](#method-usage-example)
  - [Builder Usage Example](#builder-usage-example)

## RangeNavigator Class

**Class:** `RangeNavigator`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `RangeNavigator`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

### Constructor

| Name | Description | Link |
|------|-------------|------|
| `RangeNavigator()` | Creates a new `RangeNavigator` instance. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html) |

---

## RangeNavigator Properties

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `AllowIntervalData` | `bool` | `null` | Allows data to be selected for a particular interval when the corresponding label is clicked. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_AllowIntervalData) |
| `AllowSnapping` | `bool` | `false` | Enables snapping for the Range Navigator sliders. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_AllowSnapping) |
| `AnimationDuration` | `double` | `500` | Duration of the animation. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_AnimationDuration) |
| `Background` | `string` | `null` | Background color of the chart. Accepts valid CSS color strings such as hex and rgba values. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Background) |
| `BeforePrint` | `string` | `null` | Triggers before printing starts. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_BeforePrint) |
| `BeforeResize` | `string` | `null` | Triggers before window resize. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_BeforeResize) |
| `Changed` | `string` | `null` | Triggers after the slider value changes. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Changed) |
| `DataSource` | `object` | `null` | Defines the data source for the Range Navigator. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_DataSource) |
| `DisableRangeSelector` | `bool` | `false` | Renders the period selector without the Range Navigator. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_DisableRangeSelector) |
| `EnableDeferredUpdate` | `bool` | `false` | Enables deferred update for the Range Navigator. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_EnableDeferredUpdate) |
| `EnableGrouping` | `bool` | `false` | Enables grouping for labels. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_EnableGrouping) |
| `EnablePersistence` | `bool` | `false` | Enables or disables persisting component state between page reloads. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_EnablePersistence) |
| `EnableRtl` | `bool` | `false` | Enables or disables right-to-left rendering. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_EnableRtl) |
| `GroupBy` | `RangeIntervalType` | `RangeIntervalType.Auto` | Grouping interval used for the axis. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_GroupBy) |
| `Height` | `string` | `null` | Height of the chart. Accepts values like `100px` or `100%`. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Height) |
| `HtmlAttributes` | `object` | `-` | Additional HTML attributes such as `title`, `name`, and other key-value pairs. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_HtmlAttributes) |
| `Interval` | `double` | `Double.NaN` | Interval value for the axis. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Interval) |
| `IntervalType` | `RangeIntervalType` | `RangeIntervalType.Auto` | Interval type for the DateTime axis. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_IntervalType) |
| `LabelFormat` | `string` | `""` | Formats axis labels using global format strings or placeholders such as `{value}°C`. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelFormat) |
| `LabelIntersectAction` | `RangeLabelIntersectAction` | `RangeLabelIntersectAction.Hide` | Specifies how intersecting axis labels are handled. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelIntersectAction) |
| `LabelPlacement` | `NavigatorPlacement` | `NavigatorPlacement.Auto` | Placement of labels relative to ticks. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelPlacement) |
| `LabelPosition` | `AxisPosition` | `AxisPosition.Outside` | Position of labels for the axis. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelPosition) |
| `LabelRender` | `string` | `null` | Triggers before label rendering. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelRender) |
| `LabelStyle` | `RangeNavigatorFont` | `null` | Label style configuration for the axis labels. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelStyle) |
| `Load` | `string` | `null` | Triggers before the Range Navigator renders. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Load) |
| `Loaded` | `string` | `null` | Triggers after the Range Navigator renders. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Loaded) |
| `Locale` | `string` | `""` | Overrides the global culture and localization value for the component. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Locale) |
| `LogBase` | `double` | `10` | Base value used for logarithmic axes. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LogBase) |
| `MajorGridLines` | `RangeNavigatorMajorGridLines` | `null` | Configuration for major grid lines. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_MajorGridLines) |
| `MajorTickLines` | `RangeNavigatorMajorTickLines` | `null` | Configuration for major tick lines. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_MajorTickLines) |
| `Margin` | `RangeNavigatorMargin` | `null` | Margin settings for the Range Navigator. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Margin) |
| `Maximum` | `string` | `null` | Maximum value for the axis. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Maximum) |
| `Minimum` | `string` | `null` | Minimum value for the axis. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Minimum) |
| `NavigatorBorder` | `RangeNavigatorBorder` | `null` | Options for customizing the color and width of the chart border. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_NavigatorBorder) |
| `NavigatorStyleSettings` | `RangeNavigatorStyleSettings` | `null` | Style settings for the navigator. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_NavigatorStyleSettings) |
| `PeriodSelectorSettings` | `RangeNavigatorPeriodSelectorSettings` | `null` | Settings for the period selector. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_PeriodSelectorSettings) |
| `Query` | `string` | `null` | Query used for the data source. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Query) |
| `Resized` | `string` | `null` | Triggers after the Range Navigator is resized. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Resized) |
| `SecondaryLabelAlignment` | `LabelAlignment` | `LabelAlignment.Middle` | Alignment for secondary axis labels. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_SecondaryLabelAlignment) |
| `SelectorRender` | `string` | `null` | Triggers before the range selector renders. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_SelectorRender) |
| `Series` | `List<RangeNavigatorRangenavigatorSeries>` | `null` | Configuration collection for series in the Range Navigator. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Series) |
| `Skeleton` | `string` | `""` | Skeleton format used for DateTime processing. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Skeleton) |
| `SkeletonType` | `SkeletonType` | `SkeletonType.DateTime` | Type of skeleton format used in DateTime processing. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_SkeletonType) |
| `Theme` | `ChartTheme` | `ChartTheme.Material` | Theme used by the Range Navigator. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Theme) |
| `TickPosition` | `AxisPosition` | `AxisPosition.Outside` | Tick position for the axis. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_TickPosition) |
| `Tooltip` | `RangeNavigatorRangeTooltipSettings` | `null` | Tooltip customization settings. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Tooltip) |
| `TooltipRender` | `string` | `null` | Triggers before the series tooltip renders. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_TooltipRender) |
| `UseGroupingSeparator` | `bool` | `false` | Specifies whether grouping separators should be used for numeric values. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_UseGroupingSeparator) |
| `Value` | `object` | `null` | Selected range for the Range Navigator. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Value) |
| `ValueType` | `RangeValueType` | `RangeValueType.Double` | Specifies the axis data type such as `Double`, `DateTime`, `Logarithmic`, or `DateTimeCategory`. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_ValueType) |
| `Width` | `string` | `null` | Width of the Range Navigator. Accepts values like `100px` or `100%`. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Width) |
| `XName` | `string` | `null` | X field name for the Range Navigator. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_XName) |
| `YName` | `string` | `null` | Y field name for the Range Navigator. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_YName) |

---

## RangeNavigatorAnimation Class

**Class:** `RangeNavigatorAnimation`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `RangeNavigatorAnimation`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

### Constructor

| Name | Description | Link |
|------|-------------|------|
| `RangeNavigatorAnimation()` | Creates a new `RangeNavigatorAnimation` instance. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimation.html) |

### Properties

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `ContentTemplate` | `MvcTemplate<object>` | `-` | Gets or sets the content template. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimation.html#Syncfusion_EJ2_Charts_RangeNavigatorAnimation_ContentTemplate) |
| `Delay` | `double` | `0` | Delay before series animation starts, in milliseconds. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimation.html#Syncfusion_EJ2_Charts_RangeNavigatorAnimation_Delay) |
| `Duration` | `double` | `1000` | Duration of the animation in milliseconds. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimation.html#Syncfusion_EJ2_Charts_RangeNavigatorAnimation_Duration) |
| `Enable` | `bool` | `true` | Enables animation on initial series load. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimation.html#Syncfusion_EJ2_Charts_RangeNavigatorAnimation_Enable) |

---

## RangeNavigatorAnimationBuilder Class

**Class:** `RangeNavigatorAnimationBuilder`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.ControlBuilder` → `RangeNavigatorAnimationBuilder`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

### Constructors

| Name | Type | Description | Link |
|------|------|-------------|------|
| `RangeNavigatorAnimationBuilder()` | Creates a new builder instance. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimationBuilder.html) |
| `RangeNavigatorAnimationBuilder(RangeNavigatorAnimation model)` | Creates a builder instance using an existing `RangeNavigatorAnimation` model. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimationBuilder.html) |

### Methods

| Name | Description | Link |
|------|-------------|------|
| `Delay(double value)` | Sets animation delay in milliseconds. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimationBuilder.html#Syncfusion_EJ2_Charts_RangeNavigatorAnimationBuilder_Delay_System_Double_) |
| `Duration(double value)` | Sets animation duration in milliseconds. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimationBuilder.html#Syncfusion_EJ2_Charts_RangeNavigatorAnimationBuilder_Duration_System_Double_) |
| `Enable(bool value)` | Enables or disables animation. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimationBuilder.html#Syncfusion_EJ2_Charts_RangeNavigatorAnimationBuilder_Enable_System_Boolean_) |

---

## RangeNavigatorRangenavigatorSeries Class

**Class:** `RangeNavigatorRangenavigatorSeries`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `RangeNavigatorRangenavigatorSeries`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

### Constructor

| Name | Description | Link |
|------|-------------|------|
| `RangeNavigatorRangenavigatorSeries()` | Creates a new `RangeNavigatorRangenavigatorSeries` instance. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html) |

### Properties

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `Animation` | `RangeNavigatorAnimation` | `null` | Options for customizing animation for the series. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_Animation) |
| `Border` | `RangeNavigatorBorder` | `null` | Options for customizing the color and width of the series border. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_Border) |
| `DashArray` | `string` | `"0"` | Defines the pattern of dashes and gaps used to stroke lines in line-type series. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_DashArray) |
| `DataSource` | `object` | `null` | Defines the data source for a series. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_DataSource) |
| `Fill` | `string` | `-` | Fill color used for the series. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_Fill) |
| `Opacity` | `double` | `1` | Opacity for the series background. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_Opacity) |
| `Query` | `string` | `null` | Defines the query for the data source. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_Query) |
| `Type` | `RangeNavigatorType` | `RangeNavigatorType.Line` | Defines the series type of the Range Navigator. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_Type) |
| `Width` | `double` | `1` | Stroke width for the series. Applicable to line-type series and signal lines in technical indicators. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_Width) |
| `XName` | `string` | `null` | Defines the x field name for the series. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_XName) |
| `YName` | `string` | `null` | Defines the y field name for the series. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangenavigatorSeries.html#Syncfusion_EJ2_Charts_RangeNavigatorRangenavigatorSeries_YName) |

---

## RangeNavigatorRangeTooltipSettings Class

**Class:** `RangeNavigatorRangeTooltipSettings`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `RangeNavigatorRangeTooltipSettings`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

### Constructor

| Name | Description | Link |
|------|-------------|------|
| `RangeNavigatorRangeTooltipSettings()` | Creates a new `RangeNavigatorRangeTooltipSettings` instance. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html) |

### Properties

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `Border` | `RangeNavigatorBorder` | `null` | Options to customize tooltip borders. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_Border) |
| `ContentTemplate` | `MvcTemplate<object>` | `-` | Gets or sets the content template. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_ContentTemplate) |
| `DisplayMode` | `TooltipDisplayMode` | `TooltipDisplayMode.OnDemand` | Defines the display mode for the tooltip. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_DisplayMode) |
| `Enable` | `bool` | `false` | Enables or disables tooltip visibility. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_Enable) |
| `Fill` | `string` | `null` | Fill color of the tooltip. Accepts valid CSS color strings such as hex and rgba. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_Fill) |
| `Format` | `string` | `null` | Formats the tooltip content. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_Format) |
| `Opacity` | `double` | `Double.NaN` | Opacity applied to the tooltip fill. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_Opacity) |
| `Template` | `string` | `null` | Custom template used to format tooltip content. Use `${value}` to display the corresponding data point. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_Template) |
| `TextStyle` | `RangeNavigatorFont` | `null` | Options to customize tooltip text. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorRangeTooltipSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorRangeTooltipSettings_TextStyle) |

---

## RangeNavigatorPeriodSelectorSettings Class

**Class:** `RangeNavigatorPeriodSelectorSettings`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `RangeNavigatorPeriodSelectorSettings`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

### Constructor

| Name | Description | Link |
|------|-------------|------|
| `RangeNavigatorPeriodSelectorSettings()` | Creates a new `RangeNavigatorPeriodSelectorSettings` instance. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriodSelectorSettings.html) |

### Properties

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `ContentTemplate` | `MvcTemplate<object>` | `-` | Gets or sets the content template. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriodSelectorSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorPeriodSelectorSettings_ContentTemplate) |
| `Height` | `double` | `43` | Height of the period selector. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriodSelectorSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorPeriodSelectorSettings_Height) |
| `Periods` | `List<RangeNavigatorPeriod>` | `null` | Specifies the attributes of each period item. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriodSelectorSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorPeriodSelectorSettings_Periods) |
| `Position` | `PeriodSelectorPosition` | `PeriodSelectorPosition.Bottom` | Vertical position of the period selector. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorPeriodSelectorSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorPeriodSelectorSettings_Position) |

---

## RangeNavigatorStyleSettings Class

**Class:** `RangeNavigatorStyleSettings`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `RangeNavigatorStyleSettings`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

### Constructor

| Name | Description | Link |
|------|-------------|------|
| `RangeNavigatorStyleSettings()` | Creates a new `RangeNavigatorStyleSettings` instance. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorStyleSettings.html) |

### Properties

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `ContentTemplate` | `MvcTemplate<object>` | `-` | Gets or sets the content template. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorStyleSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorStyleSettings_ContentTemplate) |
| `SelectedRegionColor` | `string` | `null` | Color of the selected region. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorStyleSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorStyleSettings_SelectedRegionColor) |
| `Thumb` | `RangeNavigatorThumbSettings` | `null` | Thumb settings. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorStyleSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorStyleSettings_Thumb) |
| `UnselectedRegionColor` | `string` | `null` | Color of the unselected region. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorStyleSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorStyleSettings_UnselectedRegionColor) |

---

## RangeNavigatorThumbSettings Class

**Class:** `RangeNavigatorThumbSettings`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `RangeNavigatorThumbSettings`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

### Constructor

| Name | Description | Link |
|------|-------------|------|
| `RangeNavigatorThumbSettings()` | Creates a new `RangeNavigatorThumbSettings` instance. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorThumbSettings.html) |

### Properties

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `Border` | `RangeNavigatorBorder` | `null` | Border settings for the thumb. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorThumbSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorThumbSettings_Border) |
| `ContentTemplate` | `MvcTemplate<object>` | `-` | Gets or sets the content template. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorThumbSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorThumbSettings_ContentTemplate) |
| `Fill` | `string` | `null` | Fill color for the thumb. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorThumbSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorThumbSettings_Fill) |
| `Height` | `double` | `Double.NaN` | Height of the thumb. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorThumbSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorThumbSettings_Height) |
| `Type` | `ThumbType` | `ThumbType.Circle` | Shape type of the thumb. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorThumbSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorThumbSettings_Type) |
| `Width` | `double` | `Double.NaN` | Width of the thumb. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorThumbSettings.html#Syncfusion_EJ2_Charts_RangeNavigatorThumbSettings_Width) |

---

## RangeNavigatorFont Class

**Class:** `RangeNavigatorFont`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `RangeNavigatorFont`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

### Constructor

| Name | Description | Link |
|------|-------------|------|
| `RangeNavigatorFont()` | Creates a new `RangeNavigatorFont` instance. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html) |

### Properties

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `Color` | `string` | `""` | Specifies the color of the text. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_Color) |
| `ContentTemplate` | `MvcTemplate<object>` | `-` | Gets or sets the content template. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_ContentTemplate) |
| `FontFamily` | `string` | `null` | Specifies the font family for the text. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_FontFamily) |
| `FontStyle` | `string` | `"Normal"` | Specifies the font style of the text. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_FontStyle) |
| `FontWeight` | `string` | `"Normal"` | Specifies the font weight of the text. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_FontWeight) |
| `Opacity` | `double` | `1` | Specifies the opacity level for the text. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_Opacity) |
| `Size` | `string` | `"16px"` | Specifies the size of the text. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_Size) |
| `TextAlignment` | `Alignment` | `Alignment.Center` | Specifies the alignment of the text. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_TextAlignment) |
| `TextOverflow` | `TextOverflow` | `TextOverflow.Wrap` | Specifies how overflowing chart title text is handled. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorFont.html#Syncfusion_EJ2_Charts_RangeNavigatorFont_TextOverflow) |

---

## RangeNavigatorMargin Class

**Class:** `RangeNavigatorMargin`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `RangeNavigatorMargin`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

### Constructor

| Name | Description | Link |
|------|-------------|------|
| `RangeNavigatorMargin()` | Creates a new `RangeNavigatorMargin` instance. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMargin.html) |

### Properties

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `Bottom` | `double` | `10` | Bottom margin of the chart in pixels. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMargin.html#Syncfusion_EJ2_Charts_RangeNavigatorMargin_Bottom) |
| `ContentTemplate` | `MvcTemplate<object>` | `-` | Gets or sets the content template. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMargin.html#Syncfusion_EJ2_Charts_RangeNavigatorMargin_ContentTemplate) |
| `Left` | `double` | `10` | Left margin of the chart in pixels. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMargin.html#Syncfusion_EJ2_Charts_RangeNavigatorMargin_Left) |
| `Right` | `double` | `10` | Right margin of the chart in pixels. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMargin.html#Syncfusion_EJ2_Charts_RangeNavigatorMargin_Right) |
| `Top` | `double` | `10` | Top margin of the chart in pixels. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMargin.html#Syncfusion_EJ2_Charts_RangeNavigatorMargin_Top) |

---

## RangeNavigatorBorder Class

**Class:** `RangeNavigatorBorder`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `RangeNavigatorBorder`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

### Constructor

| Name | Description | Link |
|------|-------------|------|
| `RangeNavigatorBorder()` | Creates a new `RangeNavigatorBorder` instance. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorBorder.html) |

### Properties

| Name | Description | Link |
|------|-------------|------|
| `Color` | `string` | `""` | Specifies the border color. Accepts valid CSS color strings such as hex or RGBA. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorBorder.html#Syncfusion_EJ2_Charts_RangeNavigatorBorder_Color) |
| `ContentTemplate` | `MvcTemplate<object>` | `-` | Gets or sets the content template. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorBorder.html#Syncfusion_EJ2_Charts_RangeNavigatorBorder_ContentTemplate) |
| `DashArray` | `string` | `""` | Sets the dash pattern for the border stroke. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorBorder.html#Syncfusion_EJ2_Charts_RangeNavigatorBorder_DashArray) |
| `Width` | `double` | `1` | Width of the border in pixels. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorBorder.html#Syncfusion_EJ2_Charts_RangeNavigatorBorder_Width) |

---

## RangeNavigatorMajorTickLines Class

**Class:** `RangeNavigatorMajorTickLines`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `RangeNavigatorMajorTickLines`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

### Constructor

| Name | Description | Link |
|------|-------------|------|
| `RangeNavigatorMajorTickLines()` | Creates a new `RangeNavigatorMajorTickLines` instance. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorTickLines.html) |

### Properties

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `Color` | `string` | `null` | Specifies the color of the major tick line. Accepts hex and rgba values as valid CSS color strings. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorTickLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorTickLines_Color) |
| `ContentTemplate` | `MvcTemplate<object>` | `-` | Gets or sets the content template. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorTickLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorTickLines_ContentTemplate) |
| `Height` | `double` | `5` | Height of the major tick lines in pixels. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorTickLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorTickLines_Height) |
| `Width` | `double` | `1` | Width of the major tick lines in pixels. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorTickLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorTickLines_Width) |

---

## RangeNavigatorMajorGridLines Class

**Class:** `RangeNavigatorMajorGridLines`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `RangeNavigatorMajorGridLines`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

### Constructor

| Name | Description | Link |
|------|-------------|------|
| `RangeNavigatorMajorGridLines()` | Creates a new `RangeNavigatorMajorGridLines` instance. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorGridLines.html) |

### Properties

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `Color` | `string` | `null` | Specifies the color of the major grid line. Accepts hex and rgba values as valid CSS color strings. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorGridLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorGridLines_Color) |
| `ContentTemplate` | `MvcTemplate<object>` | `-` | Gets or sets the content template. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorGridLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorGridLines_ContentTemplate) |
| `DashArray` | `string` | `""` | Dash pattern used for the major grid lines. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorGridLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorGridLines_DashArray) |
| `Width` | `double` | `1` | Width of the major grid lines in pixels. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorMajorGridLines.html#Syncfusion_EJ2_Charts_RangeNavigatorMajorGridLines_Width) |

---
## Enumerations

Reference enumeration types used throughout the RangeNavigator API. See official documentation for complete definitions.

### [RangeValueType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeValueType.html)

Controls the data type for the range navigator axis:

```csharp
public enum RangeValueType
{
    Double,              // Numeric axis (default)
    DateTime,            // DateTime axis
    Logarithmic,         // Logarithmic axis
    DateTimeCategory     // DateTime category axis
}
```

**Reference**: [RangeValueType Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeValueType.html)

### [RangeIntervalType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeIntervalType.html)

Defines interval types for DateTime axis:

```csharp
public enum RangeIntervalType
{
    Years,       // Year intervals
    Months,      // Month intervals
    Days,        // Day intervals
    Hours,       // Hour intervals
    Minutes,     // Minute intervals
    Seconds,     // Second intervals
    Auto         // Automatic interval selection
}
```

**Reference**: [RangeIntervalType Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeIntervalType.html)

### [RangeLabelIntersectAction](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeLabelIntersectAction.html)

Defines the action taken when axis labels intersect:

```csharp
public enum RangeLabelIntersectAction
{
    None,        // Show all labels
    Hide         // Hide overlapping labels
}
```

**Reference**: [RangeLabelIntersectAction Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeLabelIntersectAction.html)

### [NavigatorPlacement](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.NavigatorPlacement.html)

Defines label placement options:

```csharp
public enum NavigatorPlacement
{
    betweenTicks,    // Render label between ticks
    onTicks,         // Render label on ticks
    auto             // Automatic placement
}
```

**Reference**: [NavigatorPlacement Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.NavigatorPlacement.html)

### [RangeNavigatorType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorType.html)

Defines series visualization types:

```csharp
public enum RangeNavigatorType
{
    Line,           // Line series
    Area,           // Area series
    StepLine,       // Step line series
    SplineArea      // Spline area series
}
```

**Reference**: [RangeNavigatorType Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorType.html)

### [ThumbType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ThumbType.html)

Defines thumb slider shapes:

```csharp
public enum ThumbType
{
    Rectangle,   // Rectangular thumb
    Circle       // Circular thumb
}
```

**Reference**: [ThumbType Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ThumbType.html)

### [PeriodSelectorPosition](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.PeriodSelectorPosition.html)

Defines period selector placement:

```csharp
public enum PeriodSelectorPosition
{
    Top,         // Period selector above range navigator
    Bottom       // Period selector below range navigator
}
```

**Reference**: [PeriodSelectorPosition Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.PeriodSelectorPosition.html)

### [TooltipDisplayMode](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.TooltipDisplayMode.html)

Defines tooltip display behavior:

```csharp
public enum TooltipDisplayMode
{
    Float,       // Floating tooltip
    Fixed,       // Fixed tooltip
    OnDemand     // Show tooltip on demand
}
```

**Reference**: [TooltipDisplayMode Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.TooltipDisplayMode.html)

### [AxisPosition](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.AxisPosition.html)

Defines position options for axis elements:

```csharp
public enum AxisPosition
{
    Inside,      // Inside the chart area
    Outside      // Outside the chart area
}
```

**Reference**: [AxisPosition Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.AxisPosition.html)

### [LabelAlignment](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.LabelAlignment.html)

Defines label alignment options:

```csharp
public enum LabelAlignment
{
    Far,         // Align far
    Middle,      // Align middle
    Near         // Align near
}
```

**Reference**: [LabelAlignment Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.LabelAlignment.html)

### [ChartTheme](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartTheme.html)

Defines built-in visual themes used by the chart components:

```csharp
public enum ChartTheme
{
    Material,
    Fabric,
    Bootstrap,
    HighContrastLight,
    MaterialDark,
    FabricDark,
    HighContrast,
    BootstrapDark,
    Bootstrap4,
    Tailwind,
    TailwindDark,
    Bootstrap5,
    Bootstrap5Dark,
    Fluent,
    FluentDark,
    Material3,
    Material3Dark,
    Fluent2,
    Fluent2Dark,
    Fluent2HighContrast
}
```

**Reference**: [ChartTheme Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartTheme.html)

### [SkeletonType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SkeletonType.html)

Defines skeleton formatting types used for DateTime processing:

```csharp
public enum SkeletonType
{
    DateTime,
    Date,
    Time
}
```

**Reference**: [SkeletonType Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SkeletonType.html)

### [Alignment](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Alignment.html)

Defines text alignment options used in font and label styling:

```csharp
public enum Alignment
{
    Near,
    Center,
    Far
}
```

**Reference**: [Alignment Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Alignment.html)

### [TextOverflow](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.TextOverflow.html)

Defines how text should behave when it exceeds the available space:

```csharp
public enum TextOverflow
{
    None,
    Wrap,
    Trim
}
```

**Reference**: [TextOverflow Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.TextOverflow.html)

## Events

Reference event members available on the `RangeNavigator` component.

> In ASP.NET MVC, these event members are configured as **JavaScript handler name strings**, so the type is shown as `string`.

### RangeNavigator Events

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `BeforePrint` | `string` | `null` | Triggers before printing starts. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_BeforePrint) |
| `BeforeResize` | `string` | `null` | Triggers before window resize. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_BeforeResize) |
| `Changed` | `string` | `null` | Triggers after the slider value changes. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Changed) |
| `LabelRender` | `string` | `null` | Triggers before label rendering. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelRender) |
| `Load` | `string` | `null` | Triggers before the Range Navigator renders. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Load) |
| `Loaded` | `string` | `null` | Triggers after the Range Navigator renders. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Loaded) |
| `Resized` | `string` | `null` | Triggers after the Range Navigator is resized. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Resized) |
| `SelectorRender` | `string` | `null` | Triggers before the range navigator selector renders. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_SelectorRender) |
| `TooltipRender` | `string` | `null` | Triggers before the series tooltip is rendered. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_TooltipRender) |

### Event Categories

#### Lifecycle Events

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `Load` | `string` | `null` | Triggers before the Range Navigator renders. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Load) |
| `Loaded` | `string` | `null` | Triggers after the Range Navigator renders. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Loaded) |

#### Resize Events

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `BeforeResize` | `string` | `null` | Triggers before window resize. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_BeforeResize) |
| `Resized` | `string` | `null` | Triggers after the Range Navigator is resized. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Resized) |

#### Interaction Events

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `Changed` | `string` | `null` | Triggers after the slider value changes. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_Changed) |
| `TooltipRender` | `string` | `null` | Triggers before the series tooltip is rendered. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_TooltipRender) |

#### Rendering Events

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `LabelRender` | `string` | `null` | Triggers before label rendering. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_LabelRender) |
| `SelectorRender` | `string` | `null` | Triggers before the range navigator selector renders. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_SelectorRender) |

#### Print Event

| Name | Type | Default | Description | Link |
|------|------|---------|-------------|------|
| `BeforePrint` | `string` | `null` | Triggers before printing starts. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigator.html#Syncfusion_EJ2_Charts_RangeNavigator_BeforePrint) |

### Event Usage Example

```csharp
// Controller
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class RangeNavigatorController : Controller
    {
        public ActionResult EventExample()
        {
            var data = new List<RangeNavigatorData>
            {
                new RangeNavigatorData { x = new DateTime(2020, 01, 01), y = 21 },
                new RangeNavigatorData { x = new DateTime(2020, 02, 01), y = 24 },
                new RangeNavigatorData { x = new DateTime(2020, 03, 01), y = 36 },
                new RangeNavigatorData { x = new DateTime(2020, 04, 01), y = 38 },
                new RangeNavigatorData { x = new DateTime(2020, 05, 01), y = 54 },
                new RangeNavigatorData { x = new DateTime(2020, 06, 01), y = 48 }
            };

            return View(data);
        }
    }

    public class RangeNavigatorData
    {
        public DateTime x { get; set; }
        public double y { get; set; }
    }
}
```

```cshtml
@model List<WebApplication1.Controllers.RangeNavigatorData>
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

<div style="margin-bottom: 12px;">
    <button type="button" onclick="printRangeNavigator()">Print</button>
</div>

@Html.EJS().RangeNavigator("rangeNavigator").Width("100%").Height("120px").ValueType(RangeValueType.DateTime).XName("x").YName("y").DataSource(Model).Series(
    series =>
    {
        series.XName("x")
              .YName("y")
              .Type(RangeNavigatorType.Area)
              .DataSource(Model)
              .Add();
    }).Tooltip(t => t.Enable(true)
    ).Load("onLoad").Loaded("onLoaded").Changed("onChanged").LabelRender("onLabelRender").SelectorRender("onSelectorRender").TooltipRender("onTooltipRender").BeforeResize("onBeforeResize").Resized("onResized").BeforePrint("onBeforePrint").Render()

<script>
    function getRangeNavigatorInstance() {
        var element = document.getElementById("rangeNavigator");
        return element && element.ej2_instances ? element.ej2_instances[0] : null;
    }

    function printRangeNavigator() {
        var rangeNavigator = getRangeNavigatorInstance();
        if (!rangeNavigator) {
            return;
        }

        rangeNavigator.print();
    }

    function onLoad(args) {
        console.log("Range Navigator is about to render", args);
    }

    function onLoaded(args) {
        console.log("Range Navigator rendered", args);
    }

    function onChanged(args) {
        console.log("Selected range changed", args);
    }

    function onLabelRender(args) {
        console.log("Label rendering", args);
    }

    function onSelectorRender(args) {
        console.log("Selector rendering", args);
    }

    function onTooltipRender(args) {
        console.log("Tooltip rendering", args);
    }

    function onBeforeResize(args) {
        console.log("Before resize", args);
    }

    function onResized(args) {
        console.log("After resize", args);
    }

    function onBeforePrint(args) {
        console.log("Before print", args);
    }
</script>
```


## Methods

Reference public methods available across the RangeNavigator API surface.

> For component instance methods, the `Default` value is always `-`.
> For builder methods, the `Default` value is also `-` because they are fluent method calls, not properties.

### RangeNavigator Client-Side Methods

| Name | Description | Link |
|------|-------------|------|
| `print()` | Prints the rendered RangeNavigator directly from the browser. | [Link](https://ej2.syncfusion.com/aspnetmvc/documentation/range-navigator/export) |
| `export(type, fileName, orientation)` | Exports the RangeNavigator in supported formats such as `PNG`, `JPEG`, `SVG`, or `PDF`. The `orientation` argument is used for PDF export. | [Link](https://ej2.syncfusion.com/aspnetmvc/documentation/range-navigator/export) |
| `refresh()` | Refreshes and re-renders the RangeNavigator using the current configuration and data. | - |
| `destroy()` | Destroys the RangeNavigator instance and removes its behavior from the page. | - |

### RangeNavigatorAnimationBuilder Methods

| Name | Description | Link |
|------|-------------|------|
| `Delay(double value)` | Sets animation delay in milliseconds. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimationBuilder.html#Syncfusion_EJ2_Charts_RangeNavigatorAnimationBuilder_Delay_System_Double_) |
| `Duration(double value)` | Sets animation duration in milliseconds. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimationBuilder.html#Syncfusion_EJ2_Charts_RangeNavigatorAnimationBuilder_Duration_System_Double_) |
| `Enable(bool value)` | Enables or disables animation. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.RangeNavigatorAnimationBuilder.html#Syncfusion_EJ2_Charts_RangeNavigatorAnimationBuilder_Enable_System_Boolean_) |

### Method Usage Example

```csharp
// Controller
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class RangeNavigatorController : Controller
    {
        public ActionResult MethodsDemo()
        {
            var data = new List<RangeData>
            {
                new RangeData { x = new DateTime(2020, 01, 01), y = 21 },
                new RangeData { x = new DateTime(2020, 02, 01), y = 24 },
                new RangeData { x = new DateTime(2020, 03, 01), y = 36 },
                new RangeData { x = new DateTime(2020, 04, 01), y = 38 },
                new RangeData { x = new DateTime(2020, 05, 01), y = 54 }
            };

            return View(data);
        }
    }

    public class RangeData
    {
        public DateTime x { get; set; }
        public double y { get; set; }
    }
}
```

```cshtml
@model List<WebApplication1.Controllers.RangeData>
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

<div style="margin-bottom: 12px;">
    <button type="button" onclick="printRangeNavigator()">Print</button>
    <button type="button" onclick="exportRangeNavigator('PNG')">Export PNG</button>
    <button type="button" onclick="exportRangeNavigator('PDF')">Export PDF</button>
    <button type="button" onclick="refreshRangeNavigator()">Refresh</button>
    <button type="button" onclick="destroyRangeNavigator()">Destroy</button>
</div>

@Html.EJS().RangeNavigator("rangeNavigator").ValueType(RangeValueType.DateTime).XName("x").YName("y").DataSource(Model).Series(series =>
    {
        series.XName("x")
              .YName("y")
              .Type(RangeNavigatorType.Area)
              .DataSource(Model)
              .Animation(animation => animation
                  .Enable(true)
                  .Duration(1000)
                  .Delay(0))
              .Add();
    }).Tooltip(t => t.Enable(true)).Render()

@Html.EJS().ScriptManager()

<script>
    function getRangeNavigatorInstance() {
        var element = document.getElementById("rangeNavigator");
        return element && element.ej2_instances ? element.ej2_instances[0] : null;
    }

    function printRangeNavigator() {
        var rangeNavigator = getRangeNavigatorInstance();
        if (!rangeNavigator) {
            return;
        }

        rangeNavigator.print();
    }

    function exportRangeNavigator(format) {
        var rangeNavigator = getRangeNavigatorInstance();
        if (!rangeNavigator) {
            return;
        }

        if (format === "PDF") {
            rangeNavigator.export("PDF", "range-navigator", "Portrait");
        } else {
            rangeNavigator.export(format, "range-navigator");
        }
    }

    function refreshRangeNavigator() {
        var rangeNavigator = getRangeNavigatorInstance();
        if (!rangeNavigator) {
            return;
        }

        rangeNavigator.refresh();
    }

    function destroyRangeNavigator() {
        var rangeNavigator = getRangeNavigatorInstance();
        if (!rangeNavigator) {
            return;
        }

        rangeNavigator.destroy();
    }
</script>
```

### Builder Usage Example

```cshtml
@model List<WebApplication1.Controllers.RangeData>
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

@Html.EJS().RangeNavigator("rangeNavigator")
    .ValueType(RangeValueType.DateTime)
    .XName("x")
    .YName("y")
    .DataSource(Model)
    .Series(series =>
    {
        series.XName("x")
              .YName("y")
              .Type(RangeNavigatorType.Area)
              .DataSource(Model)
              .Animation(animation => animation
                  .Enable(true)
                  .Duration(1000)
                  .Delay(0))
              .Add();
    })
    .Render()
```
