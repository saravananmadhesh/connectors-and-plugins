# Circular-Charts Migration Mapping

## Control

- Xamarin: SfChart
- MAUI: SfCircularChart

## API Mapping

- ColorModel, CustomBrushes -> PaletteBrushes
- ChartBehaviors -> TooltipBehavior, SelectionBehavior, ZoomPanBehavior
- Color -> Fill
- ColorModel -> PaletteBrushes
- DataMarker -> ShowDataLabels, DataLabelSettings
- DockPosition -> Placement
- IsVisible -> IsVisible
- ItemTemplate -> ItemTemplate
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
