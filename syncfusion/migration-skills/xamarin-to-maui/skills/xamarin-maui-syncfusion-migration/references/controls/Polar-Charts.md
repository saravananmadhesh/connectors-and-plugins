# Polar-Charts Migration Mapping

## Control

- Xamarin: SfChart
- MAUI: SfPolarChart

## API Mapping

- Title -> Title
- Legend -> Legend
- Series -> Series
- PrimaryAxis -> PrimaryAxis
- SecondaryAxis -> SecondaryAxis
- ColorModel, CustomBrushes -> PaletteBrushes
- ChartBehaviors -> TooltipBehavior
- VisibleMinimum -> VisibleMinimum
- VisibleMaximum -> VisibleMaximum
- VisibleLabels -> VisibleLabels
- LabelClicked -> Upcoming
- TickPosition -> TickPosition
- MaximumLabels -> Upcoming
- LabelsIntersectAction -> Upcoming
- Color -> Fill
- DataMarker -> ShowDataLabels, DataLabelSettings
- IsClosed -> IsClosed
- ToggleSeriesVisibility -> ToggleSeriesVisibility
- DockPosition -> Placement
- IsVisible -> IsVisible
- ItemTemplate -> ItemTemplate
- Title -> Upcoming
- OverflowMode -> Upcoming
- MaxWidth -> Upcoming
- Orientation -> Upcoming
- IsIconVisible -> Upcoming
- ItemMargin -> Upcoming
- IconWidth -> Upcoming
- IconTree -> Upcoming
- OffsetX -> Upcoming
- OffsetY -> Upcoming

## Limitations Mapping

- LabelRotation -> This feature supports for secondary axis only.
- AxisLineStyle -> This feature supports for secondary axis only.
- AxisLineOffset -> This feature supports for secondary axis only.
- CrossesAt -> This feature is currently not supported for Polar charts.
- RenderNextToCrossingValue -> This feature is currently not supported for Polar charts.
- CrossAxisName -> This feature is currently not supported for Polar charts.
- Axis Title -> This feature supports for secondary axis only.
- EdgeLabelsDrawingMode -> This feature supports for secondary axis only.
- EnableAutoIntervalOnZooming -> This feature is currently not supported for Polar charts.
- LabelPlacement -> This feature is currently not supported for Primary axis.
- ArrangeByIndex -> This feature is currently not supported for Primary axis.
- AutoScrollingDeltaType -> This feature is currently not supported for DateTime axis.
- SelectionBehavior(Upcoming) -> This feature is currently not supported for Polar Charts.
- AutoScrollingDelta -> This feature is currently not supported for Polar Charts.
- AutoScrollingMode -> This feature is currently not supported for Polar Charts.
- ZoomPosition -> This feature is currently not supported for Polar Charts.
- ZoomFactor -> This feature is currently not supported for Polar Charts.
- ShowTrackballLabel -> This feature is not supported for Polar Charts.
- TrackballLabelStyle -> This feature is not supported for Polar Charts.

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
