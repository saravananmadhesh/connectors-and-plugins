# Funnel-Charts Migration Mapping

## Control

- Xamarin: SfChart
- MAUI: SfFunnelChart

## API Mapping

- ColorModel, CustomBrushes -> PaletteBrushes
- ChartBehaviors -> TooltipBehavior, SelectionBehavior
- Color -> -
- ColorModel -> PaletteBrushes
- SelectedDataPointColor -> SelectionBrush
- DataMarker -> ShowDataLabels, DataLabelSettings
- DockPosition -> Placement
- IsVisible -> IsVisible
- Title -> Upcoming
- ToggleSeriesVisibility -> ToggleSeriesVisibility
- OverflowMode -> Upcoming
- MaxWidth -> Upcoming
- Orientation -> Upcoming
- IsIconVisible -> Upcoming
- ItemMargin -> Upcoming
- IconWidth -> Upcoming
- IconHeight -> Upcoming
- OffsetX -> Upcoming
- OffsetY -> Upcoming

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
