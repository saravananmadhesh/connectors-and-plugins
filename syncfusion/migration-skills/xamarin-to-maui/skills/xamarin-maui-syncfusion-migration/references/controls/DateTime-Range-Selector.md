# DateTime-Range-Selector Migration Mapping

## Control

- Xamarin: Not explicitly specified in guide
- MAUI: Not explicitly specified in guide

## Namespaces Mapping

- Syncfusion.RangeNavigator.XForms -> Syncfusion.Maui.Sliders

## Properties Mapping

- ViewRangeStart -> RangeStart
- ViewRangeEnd -> RangeEnd
- Intervals -> IntervalType
- OverlayColor -> InactiveRegionFill
- LeftThumbStyle -> ThumbStyle
- LeftTooltipStyle -> Tooltip
- ThumbStyle.Width -> SliderThumbStyle.Radius
- ThumbStyle.BackgroundColor -> SliderThumbStyle.Fill
- ThumbStyle.BorderColor -> SliderThumbStyle.Stroke
- ThumbStyle.BorderWidth -> SliderThumbStyle.StrokeThickness
- ScaleStyle.TickLineColor -> SliderTickStyle.ActiveFill
- SliderTickStyle.InactiveFill -> Gets or sets the brush for the inactive ticks.
- ScaleStyle.TickLineWidth -> SliderTickStyle.ActiveSize
- SliderTickStyle.InactiveSize -> Gets or sets the size for the inactive ticks.
- ScaleStyle.IsVisible -> ShowLabels
- ScaleStyle.LabelTextColor -> SliderLabelStyle.InactiveTextColor
- ScaleStyle.SelectedLabelTextColor -> SliderLabelStyle.ActiveTextColor
- ScaleStyle.LabelFontFamily -> SliderLabelStyle.InactiveFontFamily
- ScaleStyle.SelectedLabelFontFamily -> SliderLabelStyle.ActiveFontFamily
- ScaleStyle.LabelFontAttribute -> SliderLabelStyle.InactiveFontAttributes
- ScaleStyle.SelectedLabelFontAttribute -> SliderLabelStyle.ActiveFontAttributes
- ScaleStyle.LabelFontSize -> SliderLabelStyle.InactiveFontSize
- ScaleStyle.SelectedLabelFontSize -> SliderLabelStyle.ActiveFontSize
- TooltipStyle.BackgroundColor -> SliderTooltip.Fill
- TooltipStyle.TextColor -> SliderTooltip.TextColor
- TooltipStyle.BorderColor -> SliderTooltip.Stroke
- TooltipStyle.BorderWidth -> SliderTooltip.StrokeThickness
- TooltipStyle.FontSize -> SliderTooltip.FontSize
- TooltipStyle.FontFamily -> SliderTooltip.FontFamily
- TooltipStyle.FontAttributes -> SliderTooltip.FontAttributes

## Events Mapping

- MinorScaleLabelsCreated -> LabelCreated
- RangeChanged -> ValueChanged

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
