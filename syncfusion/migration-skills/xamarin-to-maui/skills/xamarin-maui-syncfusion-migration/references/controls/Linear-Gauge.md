# Linear-Gauge Migration Mapping

## Control

- Xamarin: SfLinearGauge
- MAUI: SfLinearGauge

## Initialize control Mapping

- using Syncfusion.SfGauge.XForms; ... SfLinearGauge linearGauge = new SfLinearGauge(); this.Content = linearGauge; -> using Syncfusion.Maui.Gauges; ... SfLinearGauge linearGauge = new SfLinearGauge(); this.Content = linearGauge;

## Scale Mapping

- MinimumValue -> Minimum
- MaximumValue -> Maximum
- ScalePosition -> IsInversed
- OpposedPosition -> IsMirrored
- MajorTickSettings -> MajorTickStyle
- MinorTickSettings -> MinorTickStyle
- MaximumLabels -> MaximumLabelsCount
- SfLinearGauge linearGauge = new SfLinearGauge(); LinearScale linearScale = new LinearScale(); linearScale.ScaleBarSize = 20; linearScale.CornerRadiusType = CornerRadiusType.Both; linearScale.CornerRadius = 10; linearScale.ScaleBarSize = 20; linearScale.ScaleBarColor = Color.Blue; linearScale.MinimumValue = 0; linearScale.MaximumValue = 100; linearScale.Interval = 10; linearScale.OpposedPosition = true; linearScale.ScalePosition = ScalePosition.BackWard; linearGauge.Scales.Add(linearScale); this.Content = linearGauge; -> SfLinearGauge gauge = new SfLinearGauge(); gauge.IsInversed = true; gauge.IsMirrored = true; gauge.Minimum = 0; gauge.Maximum = 100; gauge.Interval = 10; gauge.LineStyle.Thickness = 20; gauge.LineStyle.Fill = new SolidColorBrush(Colors.Blue); gauge.LineStyle.CornerStyle = CornerStyle.BothCurve; this.Content = gauge;

## Range Mapping

- Color -> Fill
- Offset -> Position
- SfLinearGauge linearGauge = new SfLinearGauge(); LinearScale linearScale = new LinearScale(); LinearRange linearRange = new LinearRange(); linearRange.StartValue = 0; linearRange.EndValue = 33; linearRange.Offset = -40; linearRange.Color = Color.FromHex("#ffF45656"); linearScale.Ranges.Add(linearRange); linearScale.Ranges.Add(linearRange2); linearGauge.Scales.Add(linearScale); this.Content = linearGauge; -> SfLinearGauge gauge = new SfLinearGauge(); gauge.Ranges.Add(new LinearRange() { StartValue = 0, EndValue = 33, Fill = new SolidColorBrush(Color.FromArgb("ffF45656")), Position = GaugeElementPosition.Outside }); this.Content = gauge;

## Pointers Mapping

- BarPointer -> BarPointer
- SymbolPointer -> Divided into 'LinearShapePointer' and 'LinearContentPointer
- CornerRadiusType -> CornerStyle
- Color -> Fill
- Thickness -> PointerSize
- SfLinearGauge linearGauge = new SfLinearGauge(); LinearScale linearScale = new LinearScale(); BarPointer barPointer = new BarPointer(); barPointer.Value = 75; barPointer.Color = Color.FromHex("#36d1dc"); linearScale.Pointers.Add(barPointer); linearGauge.Scales.Add(linearScale); this.Content = linearGauge; -> SfLinearGauge gauge = new SfLinearGauge(); gauge.BarPointers.Add(new BarPointer { Value =75, PointerSize=10, Fill = Color.FromHex("#36d1dc"), }); this.Content = gauge;
- MarkerShape -> ShapeType' in 'LinearShapePointer' class
- Color -> Fill' in 'LinearShapePointer
- SfLinearGauge linearGauge = new SfLinearGauge(); SymbolPointer symbolPointer = new SymbolPointer(); symbolPointer.Value = 30; symbolPointer.Color = Color.FromHex("#5b86e5"); linearScale.Pointers.Add(symbolPointer); linearGauge.Scales.Add(linearScale); this.Content = linearGauge; -> SfLinearGauge gauge = new SfLinearGauge(); gauge.MinorTicksPerInterval = 0; gauge.Interval = 10; gauge.MarkerPointers.Add(new LinearShapePointer { Value = 30, Fill = Color.FromHex("#5b86e5"), ShapeType = ShapeType.Triangle, Position = GaugeElementPosition.Inside }); this.Content = gauge;
- - -> Content

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
