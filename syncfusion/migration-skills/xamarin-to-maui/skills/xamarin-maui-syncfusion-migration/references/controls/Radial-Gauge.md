# Radial-Gauge Migration Mapping

## Control

- Xamarin: SfCircularGauge
- MAUI: SfRadialGauge

## Initialize control Mapping

- using Syncfusion.SfGauge.XForms; ... SfCircularGauge circularGauge = new SfCircularGauge (); this.Content = circularGauge; -> using Syncfusion.Maui.Gauges; … SfRadialGauge sfRadialGauge = new SfRadialGauge(); this.Content = sfRadialGauge;
- Scales -> Axes
- Scale -> RadialAxis

## Axis Mapping

- StartValue -> Minimum
- EndValue -> Maximum
- ShowRim -> ShowAxisLine
- SweepAngle -> EndAngle
- EnableAutoAngle -> CanRotateLabels
- MaximumLabels -> MaximumLabelsCount
- Direction -> IsInversed
- MajorTickSettings -> MajorTickStyle
- MinorTickSettings -> MinorTickStyle
- UseRangeColorForLabels -> UseRangeColorForAxis
- SfCircularGauge circularGauge = new SfCircularGauge(); ObservableCollection scales = new ObservableCollection(); Scale scale = new Scale(); scale.StartValue = 0; scale.EndValue = 12; scale.Interval = 1; scale.StartAngle = 270; scale.SweepAngle = 360; scale.ShowFirstLabel = false; scales.Add(scale); circularGauge.Scales = scales; this.Content = circularGauge; -> SfRadialGauge sfRadialGauge = new SfRadialGauge(); RadialAxis radialAxis = new RadialAxis(); radialAxis.Minimum = 0; radialAxis.Maximum = 12; radialAxis.Interval = 1; radialAxis.StartAngle = 270; radialAxis.EndAngle = 270; radialAxis.ShowFirstLabel = false; sfRadialGauge.Axes.Add(radialAxis); this.Content = sfRadialGauge;

## Range Mapping

- Range -> RadialRange
- Offset -> RangeOffset
- Color -> Fill
- SfCircularGauge circularGauge = new SfCircularGauge(); ObservableCollection scales = new ObservableCollection(); Scale scale = new Scale(); scales.Add(scale); Range range = new Range(); range.StartValue = 10; range.EndValue = 80; range.InnerStartOffset = 0.83; range.InnerEndOffset = 0.6; range.OuterStartOffset = 0.85; range.OuterEndOffset = 0.8; scale.Ranges.Add(range); circularGauge.Scales = scales; this.Content = circularGauge; -> SfRadialGauge sfRadialGauge = new SfRadialGauge(); RadialAxis radialAxis = new RadialAxis(); sfRadialGauge.Axes.Add(radialAxis); RadialRange gaugeRange = new RadialRange(); gaugeRange.StartValue = 10; gaugeRange.EndValue = 80; gaugeRange.OffsetUnit = SizeUnit.Factor; gaugeRange.RangeOffset = 0.3; gaugeRange.StartWidth = 5; gaugeRange.EndWidth = 30; radialAxis.Ranges.Add(gaugeRange); this.Content = sfRadialGauge;

## Pointers Mapping

- MarkerPointer -> Divided into 'ShapePointer' and 'ContentPointer
- NeedlePointer -> NeedlePointer
- RangePointer -> RangePointer
- MarkerHeight -> ShapeHeight' in 'ShapePointer' class
- MarkerWidth -> ShapeWidth' in 'ShapePointer' class
- MarkerShape -> ShapeType' in 'ShapePointer' class
- EnableDragging -> IsInteractive' in 'ShapePointer' class
- SfCircularGauge circularGauge = new SfCircularGauge(); ObservableCollection scales = new ObservableCollection(); Scale scale = new Scale(); scales.Add(scale); MarkerPointer markerPointer = new MarkerPointer(); markerPointer.Value = 70; markerPointer.Color = Color.Pink; markerPointer.MarkerHeight = 20; markerPointer.MarkerWidth = 20; markerPointer.EnableDragging = true; markerPointer.Offset = 1; scale.Pointers.Add(markerPointer); circularGauge.Scales = scales; this.Content = circularGauge; -> SfRadialGauge sfRadialGauge = new SfRadialGauge(); RadialAxis radialAxis = new RadialAxis(); sfRadialGauge.Axes.Add(radialAxis); ShapePointer markerPointer = new ShapePointer(); markerPointer.Value = 70; markerPointer.IsInteractive = true; markerPointer.Fill = new SolidColorBrush(Colors.Pink); markerPointer.Offset = -20; markerPointer.ShapeWidth = 20; markerPointer.ShapeHeight = 20; radialAxis.Pointers.Add(markerPointer); this.Content = sfRadialGauge;
- - -> Content
- KnobColor -> KnobFill
- KnobStrokeColor -> KnobStroke
- KnobStrokeWidth -> KnobStrokeThickness
- LengthFactor -> NeedleLength
- TailColor -> TailFill
- TailLengthFactor -> TailLength
- EnableDragging -> IsInteractive
- SfCircularGauge circularGauge = new SfCircularGauge(); ObservableCollection scales = new ObservableCollection (); Scale scale = new Scale(); NeedlePointer needlePointer = new NeedlePointer(); needlePointer.Value = 60; needlePointer.Color = Color.DeepSkyBlue; needlePointer.Thickness = 7; needlePointer.LengthFactor = 0.7; scale.Pointers.Add(needlePointer); scales.Add(scale); circularGauge.Scales = scales; this.Content = circularGauge; -> SfRadialGauge sfRadialGauge = new SfRadialGauge(); RadialAxis radialAxis = new RadialAxis(); sfRadialGauge.Axes.Add(radialAxis); NeedlePointer needlePointer = new NeedlePointer(); needlePointer.Value = 60; needlePointer.NeedleFill = new SolidColorBrush(Colors.DeepSkyBlue); needlePointer.NeedleLengthUnit = SizeUnit.Factor; needlePointer.NeedleLength = 0.7; needlePointer.NeedleStartWidth = 0.1; needlePointer.NeedleEndWidth = 10; radialAxis.Pointers.Add(needlePointer); this.Content = sfRadialGauge;
- Offset -> PointerOffset
- RangeCap -> CornerStyle
- Thickness -> PointerWidth
- SfCircularGauge circularGauge = new SfCircularGauge(); ObservableCollection scales = new ObservableCollection(); Scale scale = new Scale(); RangePointer rangePointer = new RangePointer(); rangePointer.Value = 50; rangePointer.RangeCap = RangeCap.Both; rangePointer.Offset = 0.7; rangePointer.Thickness = 30; scale.Pointers.Add(rangePointer); scales.Add(scale); circularGauge.Scales = scales; this.Content = circularGauge; -> SfRadialGauge sfRadialGauge = new SfRadialGauge(); RadialAxis radialAxis = new RadialAxis(); sfRadialGauge.Axes.Add(radialAxis); RangePointer rangePointer = new RangePointer(); rangePointer.Value = 30; rangePointer.CornerStyle = CornerStyle.BothCurve; rangePointer.OffsetUnit = SizeUnit.Factor; rangePointer.PointerOffset = 0.3; rangePointer.PointerWidth = 10; radialAxis.Pointers.Add(rangePointer); this.Content = sfRadialGauge;

## Annotation Mapping

- View -> Content
- Angle -> DirectionValue' and 'DirectionUnit' is Angle.
- Offset -> PositionFactor
- SfCircularGauge gauge = new SfCircularGauge(); ObservableCollection scales = new ObservableCollection(); Scale scale = new Scale(); scales.Add(scale); gauge.Scales = scales; GaugeAnnotation annotation = new GaugeAnnotation(); Label label = new Label(); label.Text = "128 GB"; label.FontSize = 20; annotation.View = label; gauge.Annotations.Add(annotation); this.Content = gauge; -> SfRadialGauge sfRadialGauge = new SfRadialGauge(); RadialAxis radialAxis = new RadialAxis(); sfRadialGauge.Axes.Add(radialAxis); GaugeAnnotation gaugeAnnotation = new GaugeAnnotation(); gaugeAnnotation.Content = new Label { Text = "128 GB", FontSize = 20 }; radialAxis.Annotations.Add(gaugeAnnotation); this.Content = sfRadialGauge;

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
