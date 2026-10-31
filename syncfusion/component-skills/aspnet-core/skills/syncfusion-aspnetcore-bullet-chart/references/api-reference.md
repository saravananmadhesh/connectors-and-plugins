# Syncfusion BulletChart API Reference

Complete API reference for the Syncfusion ASP.NET Core Chart (`Syncfusion.EJ2.Charts.BulletChart`) component.

- **Official API Documentation:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll`

## Overview

The BulletChart component displays actual performance against target benchmarks in a compact, visually efficient format. It combines multiple data elements (value bar, target marker, ranges) to provide immediate performance insights. Commonly used in KPI dashboards, performance tracking, and comparative visualizations.

---

## BulletChart Class

Main component class for creating bullet chart controls with horizontal or vertical orientation.

**Reference:** [Official BulletChart Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html)

### Constructor

```csharp
public BulletChart()
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Animation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Animation) | `BulletChartAnimation` | null | Animation settings for chart rendering |
| [Border](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Border) | `BulletChartContainerBorder` | null | Chart border configuration |
| [CategoryField](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_CategoryField) | `string` | null | Field name for category labels |
| [CategoryLabelStyle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_CategoryLabelStyle) | `BulletChartBulletLabelStyle` | null | Font styling for category labels |
| [DataLabel](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_DataLabel) | `BulletChartBulletDataLabel` | null | Data label configuration |
| [DataSource](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_DataSource) | `object` | null | Data collection for chart |
| [EnableGroupSeparator](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_EnableGroupSeparator) | `bool` | false | Enable thousands separator in labels |
| [EnablePersistence](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_EnablePersistence) | `bool` | false | Persist component state across reloads |
| [EnableRtl](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_EnableRtl) | `bool` | false | Enable right-to-left rendering |
| [Height](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Height) | `string` | null | Chart height in pixels or percentage |
| [LabelFormat](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_LabelFormat) | `string` | "" | Format string for axis labels |
| [LabelPosition](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_LabelPosition) | `LabelsPlacement` | LabelsPlacement.Outside | Axis label placement |
| [LabelStyle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_LabelStyle) | `BulletChartBulletLabelStyle` | null | Font styling for axis labels |
| [LegendSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_LegendSettings) | `BulletChartBulletChartLegendSettings` | null | Legend configuration |
| [Locale](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Locale) | `string` | null | Locale for number formatting |
| [MajorTickLines](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_MajorTickLines) | `BulletChartMajorTickLines` | null | Major tick line configuration |
| [Margin](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Margin) | `BulletChartMargin` | null | Chart margin configuration |
| [Maximum](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Maximum) | `double` | Double.NaN | Maximum value of the scale |
| [Minimum](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Minimum) | `double` | Double.NaN | Minimum value of the scale |
| [MinorTickLines](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_MinorTickLines) | `BulletChartMinorTickLines` | null | Minor tick line configuration |
| [MinorTicksPerInterval](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_MinorTicksPerInterval) | `double` | 4 | Minor ticks per major tick interval |
| [OpposedPosition](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_OpposedPosition) | `bool` | false | Render axis on opposite side |
| [Orientation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Orientation) | `OrientationType` | OrientationType.Horizontal | Chart orientation |
| [Query](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Query) | `string` | null | Query string for data filtering |
| [Ranges](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Ranges) | `List<BulletChartRange>` | null | Qualitative range definitions |
| [SubTitle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Subtitle) | `string` | "" | Subtitle text for the chart |
| [SubTitleStyle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_SubtitleStyle) | `BulletChartBulletLabelStyle` | null | Font styling for subtitle |
| [TabIndex](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_TabIndex) | `double` | 1 | Tab index for keyboard navigation |
| [TargetColor](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_TargetColor) | `string` | "#191919" | Color of the target marker |
| [TargetField](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_TargetField) | `string` | "" | Field name mapping to target values |
| [TargetTypes](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_TargetTypes) | `object` | null | Target marker shape types |
| [TargetWidth](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_TargetWidth) | `double` | 5 | Width of the target marker |
| [Theme](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Theme) | `ChartTheme` | ChartTheme.Material | Chart theme |
| [TickPosition](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_TickPosition) | `TickPosition` | TickPosition.Outside | Tick mark placement |
| [Title](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Title) | `string` | "" | Chart title text |
| [TitlePosition](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_TitlePosition) | `TextPosition` | TextPosition.Top | Title position |
| [TitleStyle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_TitleStyle) | `BulletChartBulletLabelStyle` | null | Font styling for title |
| [Tooltip](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Tooltip) | `BulletChartBulletTooltipSettings` | null | Tooltip configuration |
| [Type](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Type) | `FeatureType` | FeatureType.Rect | Feature bar shape type |
| [Interval](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Interval) | `double` | Double.NaN | Interval between axis tick marks |
| [ValueBorder](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_ValueBorder) | `BulletChartValueBorder` | null | Border configuration for value bar |
| [ValueField](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_ValueField) | `string` | "" | Field name mapping to value data |
| [ValueFill](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_ValueFill) | `string` | null | Fill color for the value bar |
| [ValueHeight](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_ValueHeight) | `double` | 6 | Height/thickness of the value bar |
| [Width](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html#Syncfusion_EJ2_Charts_BulletChart_Width) | `string` | null | Chart width in pixels or percentage |

### Events

| Event | Type | Description |
|-------|------|-------------|
| Load | `string` | Triggered before the bullet chart loads |
| Loaded | `string` | Triggered after the bullet chart renders |
| TooltipRender | `string` | Triggered before a tooltip is rendered |
| LegendRender | `string` | Triggered before the legend is rendered |
| BeforePrint | `string` | Triggered before the chart is printed |
| BulletChartMouseClick | `string` | Triggered when the chart is clicked |

---

## BulletChartRange Class

Represents a qualitative range (background zone) in the bullet chart.

**Reference:** [Official BulletChartRange Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartRange.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartRange.html#Syncfusion_EJ2_Charts_BulletChartRange_Color) | `string` | null | Range background color |
| [End](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartRange.html#Syncfusion_EJ2_Charts_BulletChartRange_End) | `double` | 0 | End value of the range |
| [Opacity](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartRange.html#Syncfusion_EJ2_Charts_BulletChartRange_Opacity) | `double` | 1 | Range opacity (0-1) |
| [Name](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartRange.html#Syncfusion_EJ2_Charts_BulletChartRange_Name) | `string` | null | Range name for legend |

---

## BulletChartAnimation Class

Represents animation configuration for the bullet chart.

**Reference:** [Official BulletChartAnimation Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartAnimation.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Delay](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartAnimation.html#Syncfusion_EJ2_Charts_BulletChartAnimation_Delay) | `double` | 0 | Animation delay in milliseconds |
| [Duration](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartAnimation.html#Syncfusion_EJ2_Charts_BulletChartAnimation_Duration) | `double` | 1000 | Animation duration in milliseconds |
| [Enable](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartAnimation.html#Syncfusion_EJ2_Charts_BulletChartAnimation_Enable) | `bool` | false | Enable animation |

---

## BulletChartBulletLabelStyle Class

Represents label styling configuration.

**Reference:** [Official BulletChartBulletLabelStyle Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletLabelStyle.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletLabelStyle.html#Syncfusion_EJ2_Charts_BulletChartBulletLabelStyle_Color) | `string` | null | Label text color |
| [FontFamily](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletLabelStyle.html#Syncfusion_EJ2_Charts_BulletChartBulletLabelStyle_FontFamily) | `string` | null | Font family name |
| [FontSize](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletLabelStyle.html#Syncfusion_EJ2_Charts_BulletChartBulletLabelStyle_FontSize) | `string` | null | Font size with unit |
| [FontStyle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletLabelStyle.html#Syncfusion_EJ2_Charts_BulletChartBulletLabelStyle_FontStyle) | `string` | null | Font style (Normal, Italic, Oblique) |
| [FontWeight](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletLabelStyle.html#Syncfusion_EJ2_Charts_BulletChartBulletLabelStyle_FontWeight) | `string` | null | Font weight (Normal, Bold, 600, 700) |
| [Opacity](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletLabelStyle.html#Syncfusion_EJ2_Charts_BulletChartBulletLabelStyle_Opacity) | `double` | 1 | Label opacity (0-1) |

---

## BulletChartBulletDataLabel Class

Represents data label configuration for values.

**Reference:** [Official BulletChartBulletDataLabel Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletDataLabel.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Enable](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletDataLabel.html#Syncfusion_EJ2_Charts_BulletChartBulletDataLabel_Enable) | `bool` | false | Display data labels |
| [Format](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletDataLabel.html#Syncfusion_EJ2_Charts_BulletChartBulletDataLabel_Format) | `string` | null | Label format string |
| [LabelStyle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletDataLabel.html#Syncfusion_EJ2_Charts_BulletChartBulletDataLabel_LabelStyle) | `BulletChartBulletLabelStyle` | null | Font styling for data labels |

---

## BulletChartContainerBorder Class

Represents border configuration for the chart container.

**Reference:** [Official BulletChartContainerBorder Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartContainerBorder.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartContainerBorder.html#Syncfusion_EJ2_Charts_BulletChartContainerBorder_Color) | `string` | null | Border color |
| [Width](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartContainerBorder.html#Syncfusion_EJ2_Charts_BulletChartContainerBorder_Width) | `double` | 0 | Border width in pixels |

---

## BulletChartValueBorder Class

Represents border configuration for the value bar.

**Reference:** [Official BulletChartValueBorder Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartValueBorder.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartValueBorder.html#Syncfusion_EJ2_Charts_BulletChartValueBorder_Color) | `string` | null | Value bar border color |
| [Width](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartValueBorder.html#Syncfusion_EJ2_Charts_BulletChartValueBorder_Width) | `double` | 0 | Value bar border width |

---

## BulletChartMargin Class

Represents margin configuration for chart spacing.

**Reference:** [Official BulletChartMargin Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartMargin.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Bottom](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartMargin.html#Syncfusion_EJ2_Charts_BulletChartMargin_Bottom) | `double` | 10 | Bottom margin in pixels |
| [Left](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartMargin.html#Syncfusion_EJ2_Charts_BulletChartMargin_Left) | `double` | 10 | Left margin in pixels |
| [Right](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartMargin.html#Syncfusion_EJ2_Charts_BulletChartMargin_Right) | `double` | 10 | Right margin in pixels |
| [Top](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartMargin.html#Syncfusion_EJ2_Charts_BulletChartMargin_Top) | `double` | 10 | Top margin in pixels |

---

## BulletChartMajorTickLines Class

Represents major tick line configuration.

**Reference:** [Official BulletChartMajorTickLines Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartMajorTickLines.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartMajorTickLines.html#Syncfusion_EJ2_Charts_BulletChartMajorTickLines_Color) | `string` | null | Tick line color |
| [Height](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartMajorTickLines.html#Syncfusion_EJ2_Charts_BulletChartMajorTickLines_Height) | `double` | 15 | Tick line height in pixels |
| [Width](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartMajorTickLines.html#Syncfusion_EJ2_Charts_BulletChartMajorTickLines_Width) | `double` | 1 | Tick line width in pixels |

---

## BulletChartMinorTickLines Class

Represents minor tick line configuration.

**Reference:** [Official BulletChartMinorTickLines Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartMinorTickLines.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartMinorTickLines.html#Syncfusion_EJ2_Charts_BulletChartMinorTickLines_Color) | `string` | null | Minor tick line color |
| [Height](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartMinorTickLines.html#Syncfusion_EJ2_Charts_BulletChartMinorTickLines_Height) | `double` | 7 | Minor tick line height in pixels |
| [Width](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartMinorTickLines.html#Syncfusion_EJ2_Charts_BulletChartMinorTickLines_Width) | `double` | 0 | Minor tick line width in pixels |

---

## BulletChartBulletTooltipSettings Class

Represents tooltip configuration for the bullet chart.

**Reference:** [Official BulletChartBulletTooltipSettings Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletTooltipSettings.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Enable](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletTooltipSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletTooltipSettings_Enable) | `bool` | true | Enable tooltip functionality |
| [Format](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletTooltipSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletTooltipSettings_Format) | `string` | null | Tooltip format string |
| [TextStyle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletTooltipSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletTooltipSettings_TextStyle) | `BulletChartBulletLabelStyle` | null | Font styling for tooltip text |
| [Fill](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletTooltipSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletTooltipSettings_Fill) | `string` | null | Tooltip background color |
| [ShowAtMousePosition](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletTooltipSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletTooltipSettings_ShowAtMousePosition) | `bool` | false | Show tooltip at mouse position |

---

## BulletChartBulletChartLegendSettings Class

Represents legend configuration for the bullet chart.

**Reference:** [Official BulletChartBulletChartLegendSettings Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletChartLegendSettings.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Alignment](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletChartLegendSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletChartLegendSettings_Alignment) | `Alignment` | Alignment.Center | Legend alignment |
| [Border](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletChartLegendSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletChartLegendSettings_Border) | `BulletChartContainerBorder` | null | Legend border configuration |
| [Description](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletChartLegendSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletChartLegendSettings_Description) | `string` | null | Legend description |
| [Fill](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletChartLegendSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletChartLegendSettings_Fill) | `string` | null | Legend background color |
| [LabelPosition](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletChartLegendSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletChartLegendSettings_LabelPosition) | `LabelPosition` | LabelPosition.After | Legend label position |
| [Margin](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletChartLegendSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletChartLegendSettings_Margin) | `BulletChartMargin` | null | Legend margin configuration |
| [Mode](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletChartLegendSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletChartLegendSettings_Mode) | `LegendMode` | LegendMode.Default | Legend mode |
| [OpposedPosition](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletChartLegendSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletChartLegendSettings_OpposedPosition) | `bool` | false | Position legend on opposite side |
| [Position](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletChartLegendSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletChartLegendSettings_Position) | `LegendPosition` | LegendPosition.Bottom | Legend position |
| [TextStyle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletChartLegendSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletChartLegendSettings_TextStyle) | `BulletChartBulletLabelStyle` | null | Legend text styling |
| [Visible](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartBulletChartLegendSettings.html#Syncfusion_EJ2_Charts_BulletChartBulletChartLegendSettings_Visible) | `bool` | true | Show/hide legend |

---

## Supporting Classes

### BulletChartRanges

Collection class for managing bullet chart ranges.

**Reference:** [Official BulletChartRanges Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartRanges.html)

---

## Enumerations

### OrientationType Enum

Defines the orientation of the bullet chart.

**Reference:** [Official OrientationType Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.OrientationType.html)

| Value | Description |
|-------|-------------|
| `Horizontal` | Horizontal orientation (left to right) |
| `Vertical` | Vertical orientation (top to bottom) |

---

### FeatureType Enum

Defines the shape of the feature/value bar.

**Reference:** [Official FeatureType Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.FeatureType.html)

| Value | Description |
|-------|-------------|
| `Rect` | Rectangular feature bar (default) |
| `Dot` | Circular/dot feature marker |

---

### LabelsPlacement Enum

Defines label placement strategy.

**Reference:** [Official LabelsPlacement Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.LabelsPlacement.html)

| Value | Description |
|-------|-------------|
| `Inside` | Labels inside the axis |
| `Outside` | Labels outside the axis (default) |

---

### TickPosition Enum

Defines tick mark placement.

**Reference:** [Official TickPosition Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.TickPosition.html)

| Value | Description |
|-------|-------------|
| `Inside` | Tick marks inside the axis |
| `Outside` | Tick marks outside the axis (default) |

---

### TextPosition Enum

Defines text/title position.

**Reference:** [Official TextPosition Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.TextPosition.html)

| Value | Description |
|-------|-------------|
| `Top` | Position at the top |
| `Bottom` | Position at the bottom |
| `Left` | Position on the left |
| `Right` | Position on the right |

---

### ChartTheme Enum

Defines theme styles for the bullet chart.

**Reference:** [Official ChartTheme Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartTheme.html)

| Value | Description |
|-------|-------------|
| `Bootstrap` | Bootstrap design theme |
| `Bootstrap4` | Bootstrap 4 design theme |
| `Bootstrap5` | Bootstrap 5 design theme |
| `Bootstrap5Dark` | Bootstrap 5 dark design theme |
| `BootstrapDark` | Bootstrap dark design theme |
| `Fabric` | Fabric design theme |
| `FabricDark` | Fabric dark design theme |
| `Fluent` | Microsoft Fluent design theme |
| `Fluent2` | Microsoft Fluent 2 design theme |
| `Fluent2Dark` | Microsoft Fluent 2 dark design theme |
| `Fluent2HighContrast` | Microsoft Fluent 2 high contrast theme |
| `FluentDark` | Microsoft Fluent dark design theme |
| `HighContrast` | High contrast theme for accessibility |
| `HighContrastLight` | High contrast light theme |
| `Material` | Material design theme (default) |
| `Material3` | Material Design 3 theme |
| `Material3Dark` | Material Design 3 dark theme |
| `MaterialDark` | Material dark design theme |
| `Tailwind` | Tailwind CSS design theme |
| `Tailwind3` | Tailwind CSS 3 design theme |
| `Tailwind3Dark` | Tailwind CSS 3 dark design theme |
| `TailwindDark` | Tailwind CSS dark design theme |

---

### LegendPosition Enum

Defines legend position relative to the chart.

**Reference:** [Official LegendPosition Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.LegendPosition.html)

| Value | Description |
|-------|-------------|
| `Top` | Legend at the top |
| `Bottom` | Legend at the bottom |
| `Left` | Legend on the left |
| `Right` | Legend on the right |
| `Custom` | Custom position |

---

### Alignment Enum

Defines alignment options for legend and other elements.

**Reference:** [Official Alignment Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Alignment.html)

| Value | Description |
|-------|-------------|
| `Near` | Align to near edge |
| `Center` | Align to center |
| `Far` | Align to far edge |

---

### LabelPosition Enum

Defines label position relative to legend elements.

**Reference:** [Official LabelPosition Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.LabelPosition.html)

| Value | Description |
|-------|-------------|
| `Before` | Label before the element |
| `After` | Label after the element |

---

### LegendMode Enum

Defines legend rendering mode.

**Reference:** [Official LegendMode Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.LegendMode.html)

| Value | Description |
|-------|-------------|
| `Default` | Default legend mode |
| `Range` | Range-based legend |
| `Gradient` | Gradient-based legend |

---

## Event Arguments

### BulletChartLoadedEventArgs

Triggered after the bullet chart rendering completes.

**Reference:** [Official BulletChartLoadedEventArgs Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartLoadedEventArgs.html)

```csharp
public class BulletChartLoadedEventArgs
{
    public string Name { get; set; }
    public object Args { get; set; }
}
```

### BulletChartEventArgs

Base event arguments class for bullet chart events.

**Reference:** [Official BulletChartEventArgs Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChartEventArgs.html)

```csharp
public class BulletChartEventArgs
{
    public string Name { get; set; }
    public object Args { get; set; }
}
```

### TooltipRenderEventArgs

Triggered before a tooltip is rendered.

**Reference:** [Official TooltipRenderEventArgs Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.TooltipRenderEventArgs.html)

```csharp
public class TooltipRenderEventArgs
{
    public string Content { get; set; }
    public double X { get; set; }
    public double Y { get; set; }
    public bool Cancel { get; set; }
}
```

### LegendRenderEventArgs

Triggered before the legend is rendered.

**Reference:** [Official LegendRenderEventArgs Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.LegendRenderEventArgs.html)

```csharp
public class LegendRenderEventArgs
{
    public string Fill { get; set; }
    public string Shape { get; set; }
    public string Text { get; set; }
}
```

---

## See Also

- [Syncfusion BulletChart Official Documentation](https://help.syncfusion.com/aspnetcore-js2/bullet-chart/getting-started)
- [BulletChart API Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.BulletChart.html)
- [Getting Started Guide](../references/getting-started.md)
- [Data Binding Guide](../references/data-binding.md)
- [Customization Guide](../references/customization.md)
