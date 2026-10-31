# CircularProgressBar Migration Mapping

## Control

- Xamarin: Not explicitly specified in guide
- MAUI: Not explicitly specified in guide

## Initialize control Mapping

- ... ... using Syncfusion.XForms.ProgressBar; ... SfCircularProgressBar circularProgressBar = new SfCircularProgressBar(); ... -> ... ... using Syncfusion.Maui.ProgressBar; ... SfCircularProgressBar circularProgressBar = new SfCircularProgressBar(); ...

## Properties Mapping

- Progress -> Progress
- IsIndeterminate -> IsIndeterminate
- Minimum -> Minimum
- Maximum -> Maximum
- StartAngle -> StartAngle
- EndAngle -> EndAngle
- Content -> Content
- ProgressColor -> *ProgressFill
- TrackColor -> *TrackFill
- RangeColors -> *GradientStops
- SegmentCount -> SegmentCount
- GapWidth -> *SegmentGapWidth
- AnimationDuration -> AnimationDuration
- IndeterminateAnimationDuration -> IndeterminateAnimationDuration
- EasingEffect -> *AnimationEasing
- IndeterminateEasingEffect -> *IndeterminateAnimationEasing
- IndeterminateIndicatorWidth -> *IndeterminateIndicatorWidthFactor
- IndicatorInnerRadius -> *ProgressThickness
- IndicatorOuterRadius -> *ProgressRadiusFactor
- TrackInnerRadius -> *TrackThickness
- TrackOuterRadius -> *TrackRadiusFactor
- - -> ThicknessUnit
- - -> ProgressCornerStyle
- - -> TrackCornerStyle
- ShowProgressValue -> -
- ValueChanged -> *ProgressChanged
- ProgressCompleted -> ProgressCompleted

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
