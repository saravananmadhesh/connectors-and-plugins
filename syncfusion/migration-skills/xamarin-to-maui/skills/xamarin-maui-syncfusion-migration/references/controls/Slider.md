# Slider Migration Mapping

## Control

- Xamarin: SfRangeSlider
- MAUI: SfSlider

## Namespaces Mapping

- Syncfusion.SfRangeSlider.XForms -> Syncfusion.Maui.Sliders

## Properties Mapping

- TrackColor -> SliderTrackStyle.InactiveFill
- TrackSelectionColor -> SliderTrackStyle.ActiveFill
- TrackThickness -> SliderTrackStyle.InactiveSize
- TrackSelectionThickness -> SliderTrackStyle.ActiveSize
- ThumbSize -> SliderThumbStyle.Radius
- KnobColor -> SliderThumbStyle.Fill
- ThumbBorderColor -> SliderThumbStyle.Stroke
- ThumbBorderThickness -> SliderThumbStyle.StrokeThickness
- TickColor -> SliderTickStyle.InactiveFill
- SliderTickStyle.ActiveFill -> Gets or sets the brush for the active ticks in the SfSlider.
- AllowDragRange -> ShowLabels
- LabelColor -> SliderLabelStyle.InactiveTextColor
- SliderLabelStyle.ActiveTextColor -> Gets or sets the color for the active labels in the SfSlider.
- FontFamily -> SliderLabelStyle.InactiveFontFamily
- SliderLabelStyle.ActiveFontFamily -> Gets or sets the font family for the active labels in the SfSlider.
- FontAttribute -> SliderLabelStyle.InactiveFontAttributes
- SliderLabelStyle.ActiveFontAttributes -> Gets or sets the font attributes for the active labels in the SfSlider.
- FontSize -> SliderLabelStyle.InactiveFontSize
- SliderLabelStyle.ActiveFontSize -> Gets or sets the size for the active fonts in the SfSlider.
- LabelFormat -> NumberFormat
- TooltipBackgroundColor -> SliderTooltip.Fill
- TooltipTextColor -> SliderTooltip.TextColor
- TooltipPrecision -> SliderTooltip.NumberFormat
- SnapsTo -> StepSize

## Events Mapping

- DragStarted -> ValueChangeStart
- DragCompleted -> ValueChangeEnd

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
