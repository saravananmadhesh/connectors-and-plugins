# LinearProgressBar Migration Mapping

## Control

- Xamarin: Not explicitly specified in guide
- MAUI: Not explicitly specified in guide

## Initialize control Mapping

- ... ... using Syncfusion.XForms.ProgressBar; ... SfLinearProgressBar linearProgressBar = new SfLinearProgressBar(); ... -> ... ... using Syncfusion.Maui.ProgressBar; ... SfLinearProgressBar linearProgressBar = new SfLinearProgressBar(); ...

## Properties Mapping

- Progress -> Progress
- SecondaryProgress -> SecondaryProgress
- IsIndeterminate -> IsIndeterminate
- Minimum -> Minimum
- Maximum -> Maximum
- ProgressColor -> *ProgressFill
- SecondaryProgressColor -> *SecondaryProgressFill
- TrackColor -> *TrackFill
- SegmentCount -> SegmentCount
- GapWidth -> *SegmentGapWidth
- RangeColors -> *GradientStops
- AnimationDuration -> AnimationDuration
- SecondaryAnimationDuration -> SecondaryAnimationDuration
- IndeterminateAnimationDuration -> IndeterminateAnimationDuration
- EasingEffect -> *AnimationEasing
- IndeterminateEasingEffect -> *IndeterminateAnimationEasing
- IndeterminateIndicatorWidth -> *IndeterminateIndicatorWidthFactor
- TrackHeight -> Divided into '*TrackHeight' , '*ProgressHeight' and '*SecondaryProgressHeight
- CornerRadius -> Divided into '*TrackCornerRadius' , '*ProgressCornerRadius' and '*SecondaryProgressCornerRadius
- ValueChanged -> *ProgressChanged
- ProgressCompleted -> ProgressCompleted

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
