# SunburstChart Migration Mapping

## Control

- Xamarin: SfSunburstChart
- MAUI: SfSunburstChart

## Namespaces Mapping

- Syncfusion.SfSunburstChart.XForms -> Syncfusion.Maui.SunburstChart

## API Mapping

- Title -> Title
- Legend -> Legend
- Levels -> Levels
- StrokeColor -> Stroke
- SunburstChartDataLabel.ShowLabel -> SfSunburstChart.ShowLabels
- SunburstTooltipSettings.ShowTooltip -> SfSunburstChart.EnableTooltip
- SunburstTooltipSettings.TooltipTemplate -> SfSunburstChart.TooltipTemplate
- DataLabel -> DataLabelSettings
- TooltipSettings -> TooltipSettings
- ColorModel, CustomBrushes, Palette -> PaletteBrushes
- IsVisible -> IsVisible
- LegendPosition -> Placement
- LabelStyle -> Upcoming
- IconType -> Upcoming
- ItemMargin -> Upcoming
- IconHeight -> Upcoming
- ItemWidth -> Upcoming

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
