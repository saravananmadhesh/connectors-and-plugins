# Cartesian-Charts Migration Mapping

## Control

- Xamarin: SfChart
- MAUI: SfCartesianChart

## API Mapping

- Title -> Title
- Legend -> Legend
- Series -> Series
- PrimaryAxis -> XAxes
- SecondaryAxis -> YAxes
- SideBySideSeriesPlacement -> EnableSideBySideSeriesPlacement
- ColorModel, CustomBrushes -> PaletteBrushes
- ChartBehaviors -> TooltipBehavior, SelectionBehavior, ZoomPanBehavior
- AutoScrollingDelta -> AutoScrollingDelta
- AutoScrollingMode -> AutoScrollingMode
- AutoScrollingDeltaType -> AutoScrollingDeltaType
- LabelRotationAngle -> LabelRotation
- OpposedPosition -> CrossesAt
- - -> CrossAxisName
- PlotOffset -> PlotOffsetStart, PlotOffsetEnd
- ShowTrackballInfo -> ShowTrackballLabel
- LabelExtent -> LabelExtent
- VisibleMinimum -> VisibleMinimum
- VisibleMaximum -> VisibleMaximum
- VisibleLabels -> VisibleLabels
- LabelClicked -> Upcoming
- TickPosition -> TickPosition
- MaximumLabels -> Upcoming
- LabelsIntersectAction -> LabelsIntersectAction
- TrackballLabelTemplate -> TrackballLabelTemplate
- Color -> Fill
- DataMarker -> ShowDataLabels, DataLabelSettings
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
- IconHeight -> Upcoming
- OffsetX -> Upcoming
- OffsetY -> Upcoming

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
