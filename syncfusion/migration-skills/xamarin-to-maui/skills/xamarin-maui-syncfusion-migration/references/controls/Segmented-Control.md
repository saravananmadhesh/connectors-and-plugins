# Segmented-Control Migration Mapping

## Control

- Xamarin: Not explicitly specified in guide
- MAUI: Not explicitly specified in guide

## Initialize Control Mapping

- using Syncfusion.XForms.Buttons; ... SfSegmentedControl segmentedControl = new SfSegmentedControl(); this.Content = segmentedControl; -> using Syncfusion.Maui.Buttons; … SfSegmentedControl segmentedControl = new SfSegmentedControl(); this.Content = segmentedControl;

## Classes Mapping

- SfSegmentedControl -> SfSegmentedControl
- SfSegmentItem -> SfSegmentItem
- SelectionIndicatorSettings -> SelectionIndicatorSettings
- Nil -> SegmentTextStyle

## Properties Mapping

- ItemsSource -> ItemsSource
- SelectedIndex -> SelectedIndex
- SegmentHeight -> SegmentHeight
- SegmentWidth -> SegmentWidth
- VisibleSegmentsCount -> VisibleSegmentsCount
- SelectionIndicatorSettings -> SelectionIndicatorSettings
- DisabledTextColor -> DisabledSegmentTextColor
- Nil -> DisabledSegmentBackground
- FontColor -> TextStyle
- SegmentBackgroundColor -> SegmentBackground
- BorderColor -> Stroke
- BorderThickness -> StrokeThickness
- CornerRadius -> CornerRadius
- SegmentCornerRadius -> SegmentCornerRadius
- AutoScrollSelectedItem -> AutoScrollToSelectedSegment
- Nil -> SegmentTemplate
- Nil -> ShowSeparator
- BackgroundColor -> Background
- Nil -> Width
- IconFont -> ImageSource
- SelectionTextColor -> SelectedSegmentTextColor
- SelectionBackgroundColor -> SelectedSegmentBackground
- FontIconFontSize -> ImageSize
- IsEnabled -> IsEnabled
- Text -> Text
- Color -> Background
- Nil -> TextColor
- Nil -> Stroke
- Position -> SelectionIndicatorPlacement
- FontColor -> TextColor
- FontSize -> FontSize
- FontFamily -> FontFamily
- FontAttributes -> FontAttributes

## Enums Mapping

- SelectionIndicatorPosition -> SelectionIndicatorPlacement

## Events Mapping

- SelectionChanged -> SelectionChanged

## Methods Mapping

- ScrollTo -> ScrollTo
- Nil -> SetSegmentEnabled

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
