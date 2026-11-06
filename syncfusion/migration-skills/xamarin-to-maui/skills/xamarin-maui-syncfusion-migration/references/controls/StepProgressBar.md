# StepProgressBar Migration Mapping

## Control

- Xamarin: Not explicitly specified in guide
- MAUI: Not explicitly specified in guide

## Namespaces Mapping

- Syncfusion.XForms.ProgressBar -> Syncfusion.Maui.ProgressBar

## Initialize control Mapping

- using Syncfusion.XForms.ProgressBar; ... SfStepProgressBar sfStepProgressBar = new SfStepProgressBar (); this.Content = sfStepProgressBar ; -> using Syncfusion.Maui.ProgressBar; ... SfStepProgressBar stepProgressBar = new SfStepProgressBar(); this.Content = stepProgressBar ;

## Classes Mapping

- SfStepProgressBar -> SfStepProgressBar
- StepView -> StepProgressBarItem
- IStepStyle -> StepSettings
- StepTappedEventArgs -> StepTappedEventArgs
- StatusChangedEventArgs -> StepStatusChangedEventArgs

## Properties Mapping

- CompletedStepStyle -> CompletedStepSettings
- InProgressStepStyle -> InProgressStepSettings
- NotStartedStepStyle -> NotStartedStepSettings
- Orientation -> Orientation
- ProgressAnimationDuration -> ProgressAnimationDuration
- TitleAlignment -> LabelPosition
- TitleSpace -> LabelSpacing
- LayoutOption -> Nil
- MarkerSize -> StepSize
- MarkerStrokeWidth -> StepStrokeWidth
- FontAttributes -> FontAttributes(From TextStyle property of StepSettings class)
- FontColor -> TextColor(From TextStyle property of StepSettings class)
- FontFamily -> FontFamily(From TextStyle property of StepSettings class)
- FontSize -> FontSize(From TextStyle property of StepSettings class)
- GapWidth -> Nil
- MarkerContentFillColor -> ContentFillColor
- MarkerContentSize -> StepContentSize(From SfStepProgressBar class)
- MarkerContentType -> ContentType
- MarkerFillColor -> Background
- MarkerShapeType -> ShapeType
- MarkerStrokeColor -> Stroke
- ProgressLineColor -> ProgressColor
- TrackColor -> ProgressBarBackground
- ImageSource -> ImageSource
- PrimaryText -> PrimaryText
- SecondaryText -> SecondaryText
- PrimaryFormattedText -> PrimaryFormattedText
- SecondaryFormattedText -> SecondaryFormattedText
- ProgressValue -> ActiveStepProgressValue
- Status -> Nil

## Enums Mapping

- StepTitleAlignment -> LabelPosition
- StepContentType -> StepContentType
- StepOrientation -> StepProgressBarOrientation
- StepShapeType -> StepShapeType
- StepStatus -> StepStatus
- StepLayoutOptions -> Nil

## Events Mapping

- StepTapped -> StepTapped
- StatusChanged -> StepStatusChanged

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
