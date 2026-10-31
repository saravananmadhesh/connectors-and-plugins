# DigitalGauge Migration Mapping

## Control

- Xamarin: SfDigitalGauge
- MAUI: SfDigitalGauge

## Initialize control Mapping

- using Syncfusion.SfGauge.XForms; ... SfDigitalGauge digitalGauge = new SfDigitalGauge(); this.Content = digitalGauge; -> using Syncfusion.Maui.Gauges; ... SfDigitalGauge digitalGauge = new SfDigitalGauge(); this.Content = digitalGauge;

## Properties Mapping

- Value -> Text
- SegmentStrokeWidth -> StrokeWidth
- DisabledSegmentColor -> DisabledSegmentStroke
- CharacterStrokeColor -> CharacterStroke
- CharacterWidth -> CharacterWidth
- DisabledSegmentAlpha -> DisabledSegmentAlpha
- CharacterHeight -> CharacterHeight
- CharacterSpacing -> CharacterSpacing
- SfDigitalGauge digital = new SfDigitalGauge(); digital.HeightRequest = 100; digital.WidthRequest = 340; digital.Value = "SYNCFUSION"; digital.CharacterHeight = 90; digital.CharacterWidth = 25; digital.HorizontalOptions = LayoutOptions.Center; digital.VerticalOptions = LayoutOptions.Center; digital.SegmentStrokeWidth = 4; digital.CharacterType = CharacterType.SegmentSeven; digital.DisabledSegmentAlpha = 25; digital.CharacterStrokeColor = Color.FromRgb(20, 108, 237); digital.DisabledSegmentColor = Color.Gray; -> SfDigitalGauge digital = new SfDigitalGauge(); digital.HeightRequest = 100; digital.WidthRequest = 300; this.BackgroundColor = Color.White; digital.Text = "1 2 3 4 5"; digital.CharacterHeight = 90; digital.CharacterWidth = 25; digital.HorizontalOptions = LayoutOptions.Center; digital.VerticalOptions = LayoutOptions.Center; digital.StrokeWidth = 5; digital.CharacterType = CharacterType.SevenSegment; digital.DisabledSegmentAlpha = 25; digital.CharacterStroke = Color.FromRgb(20, 108, 237); digital.DisabledSegmentStroke = Color.LightSkyBlue;

## Enums Mapping

- CharacterType -> DigitalGaugeCharacterType

## Character Types Mapping

- SegmentSeven -> SevenSegment
- SegmentFourteen -> FourteenSegment
- SegmentSixteen -> SixteenSegment
- EightCrossEightDotMatrix' /td> 'EightCrossEightDotMatrix -> The dot matrix segment type is capable of displaying numbers, alphabet, and special characters efficiently.
- SfDigitalGauge digital = new SfDigitalGauge(); digital.HeightRequest = 100; digital.WidthRequest = 340; digital.Value = "SYNCFUSION"; digital.CharacterHeight = 90; digital.CharacterWidth = 25; digital.HorizontalOptions = LayoutOptions.Center; digital.VerticalOptions = LayoutOptions.Center; digital.SegmentStrokeWidth = 4; digital.CharacterType = CharacterType.SegmentSeven; digital.DisabledSegmentAlpha = 25; digital.CharacterStrokeColor = Color.FromRgb(20, 108, 237); digital.DisabledSegmentColor = Color.Gray; -> SfDigitalGauge digital = new SfDigitalGauge(); digital.HeightRequest = 100; digital.WidthRequest = 300; this.BackgroundColor = Color.White; digital.Text = "1 2 3 4 5"; digital.CharacterHeight = 90; digital.CharacterWidth = 25; digital.HorizontalOptions = LayoutOptions.Center; digital.VerticalOptions = LayoutOptions.Center; digital.StrokeWidth = 5; digital.CharacterType = CharacterType.SevenSegment; digital.DisabledSegmentAlpha = 25; digital.CharacterStroke = Color.FromRgb(20, 108, 237); digital.DisabledSegmentStroke = Color.LightSkyBlue;

## Events Mapping

- ValueChanged -> TextChanged

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
