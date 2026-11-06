# Maps Migration Mapping

## Control

- Xamarin: SfMaps
- MAUI: SfMaps

## Initialize control Mapping

- using Syncfusion.SfMaps.XForms; ... SfMaps map = new SfMaps(); ... -> using Syncfusion.Maui.Maps; … SfMaps map = new SfMaps(); ...
- Layers -> *Layer
- ShapeFileLayer -> *MapShapeLayer

## Adding layer Mapping

- BubbleMarkerSettings -> *BubbleSettings
- DataLabelSettings -> DataLabelSettings
- EnableSelection -> EnableSelection
- ItemsSource -> *DataSource
- ShapeIDPath -> *PrimaryValuePath
- ShapeIDTableField -> *ShapeDataField
- Uri -> *ShapesSource
- Markers -> Markers
- MarkerTemplate -> MarkerTemplate
- ShapeSelectionChanged -> *ShapeSelected
- ColorMappings' in 'ShapeSetting' class -> ColorMappings
- ShapeFill' in 'ShapeSetting' class -> ShapeFill
- ShapeStroke' in 'ShapeSetting' class -> ShapeStroke
- ShapeStrokeThickness' in 'ShapeSetting' class -> ShapeStrokeThickness
- SelectedShapeColor' in 'ShapeSetting' class -> *SelectedShapeFill
- SelectedShapeStroke' in 'ShapeSetting' class -> SelectedShapeStroke
- SelectedShapeStrokeThickness' in 'ShapeSetting' class -> SelectedShapeStrokeThickness
- ShapeColorValuePath' and 'ShapeValuePath' in 'ShapeSetting' class -> ShapeColorValuePath
- SfMaps maps = new SfMaps(); ShapeFileLayer layer = new ShapeFileLayer(); layer.Uri = "world.shp"; ShapeSetting shapeSetting = new ShapeSetting(); shapeSetting.ShapeFill = Color.FromRgb(181, 220, 255); shapeSetting.ShapeStroke = Color.FromRgb(21, 133, 237); layer.ShapeSettings = shapeSetting; maps.Layers.Add(layer); -> public MainPage() { InitializeComponent(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" layer.ShapeFill = Color.FromRgb(181, 220, 255); layer.ShapeStroke = Color.FromRgb(21, 133, 237); SfMaps maps = new SfMaps(); maps.Layer = layer; this.Content = maps; }
- LayerType' , 'BingMapKey' , 'BingMapStyle' , and 'RequestTileUri -> Can achieve all this using 'UrlTemplate' and 'GetBingUrl()
- GeoCoordinates -> *Center
- CanCacheTiles -> CanCacheTiles
- Radius -> Radius
- DistanceType -> DistanceType
- LatLngBounds -> LatLngBounds
- DeleteTilesFromCache() -> DeleteTilesFromCache()
- ZoomLevelChanging -> ZoomLevelChanging
- SfMaps maps = new SfMaps(); ImageryLayer layer = new ImageryLayer(); layer.GeoCoordinates = new Point(38.909804, -77.043442); layer.Radius = 5; layer.DistanceType = DistanceType.KiloMeter; MapMarker marker = new MapMarker(); marker.Latitude = "38.909804"; marker.Longitude = "-77.043442"; layer.Markers.Add(marker); maps.Layers.Add(layer); this.Content = maps; -> public MainPage() { InitializeComponent(); SfMaps map = new SfMaps(); MapTileLayer tileLayer = new MapTileLayer(); tileLayer.UrlTemplate = " tileLayer.Radius = 5; tileLayer.DistanceType = MapDistanceType.Kilometer; tileLayer.Center = new MapLatLng(38.909804, -77.043442); MapZoomPanBehavior zoomPanBehavior = new MapZoomPanBehavior(); tileLayer.ZoomPanBehavior = zoomPanBehavior; MapMarker mapMarker = new MapMarker(); mapMarker.Latitude = 38.909804; mapMarker.Longitude = -77.043442; MapMarkerCollection mapMarkers = new MapMarkerCollection(); mapMarkers.Add(mapMarker); tileLayer.Markers = mapMarkers; map.Layer = tileLayer; this.Content = map; }
- SfMaps maps = new SfMaps(); ImageryLayer layer = new ImageryLayer(); layer.LayerType = LayerType.Bing; layer.BingMapKey = "Your bing map key"; maps.Layers.Add(layer); this.Content = maps; -> public MainPage() { InitializeComponent(); SfMaps map = new SfMaps(); MapTileLayer tileLayer = new MapTileLayer(); this.GenerateBing(tileLayer); map.Layer = tileLayer; this.Content = map; } private async Task GenerateBing(MapTileLayer tileLayer) { tileLayer.UrlTemplate = await MapTileLayer.GetBingUrl(" + "?name=bingName"; }

## Bubble settings Mapping

- ColorMappings -> ColorMappings
- ColorValuePath -> ColorValuePath
- Fill -> Fill
- MaxSize -> MaxSize
- MinSize -> MinSize
- Opacity -> Opacity
- ValuePath -> *SizeValuePath
- ShowBubbles -> ShowBubbles' in 'MapShapeLayer' class
- ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); ShapeFileLayer layer = new ShapeFileLayer(); layer.Uri = "world.shp"; layer.ShapeIDPath="State" layer.ShapeIDTableField="name" layer.DataSource = viewModel.Data; BubbleMarkerSetting bubbleSetting = new BubbleMarkerSetting() { ShowBubbles = true, ValuePath = "index", ColorValuePath = "Population", SizeValuePath = "Population", }; layer.BubbleMarkerSettings = bubbleSetting; maps.Layers.Add(layer); -> public MainPage() { InitializeComponent(); ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" layer.DataSource = viewModel.Data; layer.PrimaryValuePath = "State"; layer.ShapeDataField = "name"; layer.ShowBubbles = true; layer.ShowBubbleTooltip = true; MapBubbleSettings bubbleSetting = new MapBubbleSettings() { ColorValuePath = "Population", SizeValuePath = "Population", }; layer.BubbleSettings = bubbleSetting; maps.Layer = layer; this.Content = maps; }

## Data label settings Mapping

- SmartLabelMode -> *OverflowMode
- TextColor' , 'FontSize' , 'FontFamily' , and 'FontAttributes -> *DataLabelStyle
- ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); ShapeFileLayer layer = new ShapeFileLayer(); layer.Uri = "world.shp"; layer.ShapeIDPath="State" layer.ShapeIDTableField="name" layer.DataSource = viewModel.Data; layer.ShowMapItems = true; DataLabelSetting dataLabelSetting = new DataLabelSetting(); dataLabelSetting.SmartLabelMode = IntersectAction.Trim; layer.DataLabelSettings = dataLabelSetting; maps.Layers.Add(layer); -> public MainPage() { InitializeComponent(); ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" layer.DataSource = viewModel.Data; layer.PrimaryValuePath = "State"; layer.ShapeDataField = "name"; layer.ShowDataLabels = true; layer.DataLabelSettings = new MapDataLabelSettings() { DataLabelPath = "State", OverflowMode = MapLabelOverflowMode.Trim, DataLabelStyle = new MapLabelStyle() { FontSize = 12 }, }; maps.Layer = layer; this.Content = maps; }

## Color mappings Mapping

- Color -> Color
- LegendLabel -> *Text
- EqualColorMapping -> EqualColorMapping
- RangeColorMapping -> RangeColorMapping
- Value -> Value
- From -> From
- To -> To
- ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); ShapeFileLayer layer = new ShapeFileLayer(); layer.Uri = "world.shp"; layer.ShapeIDPath="State" layer.ShapeIDTableField="name" layer.DataSource = viewModel.Data; EqualColorMapping colorMapping = new EqualColorMapping(); colorMapping.Color = Colors.Blue; colorMapping.Value = "100"; colorMapping.Text = "100"; RangeColorMapping colorMapping1 = new RangeColorMapping(); colorMapping1.Color = Colors.Green; colorMapping1.From = 0; colorMapping1.To = 99; colorMapping1.Text = "0-99"; ShapeSetting shapeSetting = new ShapeSetting(); shapeSetting.ShapeValuePath = "Count"; shapeSetting.ShapeColorValuePath = "Count"; shapeSetting.ColorMappings.Add(colorMapping); shapeSetting.ColorMappings.Add(colorMapping1); layer.ShapeSettings = shapeSetting; maps.Layers.Add(layer); -> public MainPage() { InitializeComponent(); ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" layer.DataSource = viewModel.Data; layer.PrimaryValuePath = "State"; layer.ShapeDataField = "name"; layer.ShapeColorValuePath = "Count"; EqualColorMapping colorMapping = new EqualColorMapping(); colorMapping.Color = Colors.Blue; colorMapping.Value = "100"; colorMapping.Text = "100"; RangeColorMapping colorMapping1 = new RangeColorMapping(); colorMapping1.Color = Colors.Green; colorMapping1.From = 0; colorMapping1.To = 99; colorMapping1.Text = "0-99"; layer.ColorMappings.Add(colorMapping); layer.ColorMappings.Add(colorMapping1); maps.Layer = layer; this.Content = maps; }

## Markers Mapping

- Latitude -> Latitude
- Longitude -> Longitude
- IconColor' in 'MapMarkerSetting -> *IconFill
- IconSize' in 'MapMarkerSetting -> Divided into '*IconHeight' and '*IconWidth
- MarkerIcon' in 'MapMarkerSetting -> *IconType
- HorizontalAlignment' in 'MapMarkerSetting -> HorizontalAlignment
- VerticalAlignment' in 'MapMarkerSetting -> VerticalAlignment
- SfMaps maps = new SfMaps(); ShapeFileLayer layer = new ShapeFileLayer(); layer.Uri = "world.shp"; MapMarker mapMarker = new MapMarker(); mapMarker.Latitude = 20.5595; mapMarker.Longitude = 22.9375; layer.Markers.Add(marker); MapMarkerSetting mapMarkerSetting = new MapMarkerSetting(); mapMarkerSetting.IconColor = Colors.Red; layer.MarkerSettings = mapMarkerSetting; maps.Layers.Add(layer); -> public MainPage() { InitializeComponent(); SfMaps maps = new SfMaps(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" MapMarker mapMarker = new MapMarker(); mapMarker.Latitude = 20.5595; mapMarker.Longitude = 22.9375; mapMarker.IconFill = Colors.Red; maps.Layer = layer; this.Content = maps; }

## Legend Mapping

- LegendType' in 'MapLegendSetting -> *SourceType
- TextColor' , 'FontSize' , 'FontFamily' , and 'FontAttributes' in 'MapLegendSetting -> *TextStyle
- IconSize' in 'MapLegendSetting -> IconSize
- LegendIcon' in 'MapLegendSetting -> *IconType
- ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); ShapeFileLayer layer = new ShapeFileLayer(); layer.Uri = "world.shp"; layer.ShapeIDPath="State" layer.ShapeIDTableField="name" layer.DataSource = viewModel.Data; EqualColorMapping colorMapping = new EqualColorMapping(); colorMapping.Color = Colors.Blue; colorMapping.Value = "100"; colorMapping.Text = "100"; ShapeSetting shapeSetting = new ShapeSetting(); shapeSetting.ShapeValuePath = "Count"; shapeSetting.ShapeColorValuePath = "Count"; MapLegendSetting legendSetting = new MapLegendSetting(); legendSetting.ShowLegend = true; legendSetting.LegendType = LegendType.Layers; layer.LegendSettings = legendSetting; shapeSetting.ColorMappings.Add(colorMapping); layer.ShapeSettings = shapeSetting; maps.Layers.Add(layer); -> public MainPage() { InitializeComponent(); ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" layer.DataSource = viewModel.Data; layer.PrimaryValuePath = "State"; layer.ShapeDataField = "name"; layer.ShapeColorValuePath = "Count"; EqualColorMapping colorMapping = new EqualColorMapping(); colorMapping.Color = Colors.Blue; colorMapping.Value = "100"; colorMapping.Text = "100"; layer.ColorMappings.Add(colorMapping); MapLegend legendSet = new MapLegend(); legendSet.SourceType = LegendSourceType.Shape; legendSet.Placement = Syncfusion.Maui.Core.LegendPlacement.Top; legendSet.IconSize = new Size(20, 20); legendSet.IconType = Syncfusion.Maui.Core.ShapeType.Diamond; MapLabelStyle mapLabelStyle = new MapLabelStyle(); mapLabelStyle.FontSize = 16; legendSet.TextStyle = mapLabelStyle; layer.Legend = legendSet; maps.Layer = layer; this.Content = maps; }

## Tooltip Mapping

- TooltipSetting -> *MapTooltipSettings
- ShowTooltip' in 'TooltipSetting -> Divided into '*ShowShapeTooltip' , '*ShowBubbleTooltip' and '*ShowMarkerTooltip
- TooltipSetting' in 'ShapeFileLayer -> *ShapeTooltipSettings
- TooltipSetting' in 'BubbleMarkerSetting -> *BubbleTooltipSettings
- TooltipSetting' in 'MapMarkerSetting -> *MarkerTooltipSettings
- BackgroundColor -> *Background
- Margin -> *Padding
- TextColor' , 'FontSize' , 'FontFamily' and 'FontAttributes -> *TextStyle
- ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); ShapeFileLayer layer = new ShapeFileLayer(); layer.Uri = "world.shp"; layer.ShapeIDPath="State" layer.ShapeIDTableField="name" layer.DataSource = viewModel.Data; shapeFileLayer.TooltipSettings.ShowTooltip = true; shapeFileLayer.TooltipSettings.ValuePath = "Count"; layer.ShapeSettings = shapeSetting; maps.Layers.Add(layer); -> public ToolTip() { InitializeComponent(); ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" layer.PrimaryValuePath = "Continent"; layer.ShapeDataField = "continent"; layer.DataSource = viewModel.Data; layer.ShowShapeTooltip = true; layer.ShapeTooltipSettings = new MapTooltipSettings() { Background = Color.FromArgb("#002080"), Padding = new Thickness(2), TextStyle = new MapLabelStyle() { FontSize = 14, TextColor = Colors.White, FontAttributes = FontAttributes.Bold } }; SfMaps maps = new SfMaps(); maps.Layer = layer; this.Content = maps; }

## Shape sublayer Mapping

- BubbleMarkerSettings -> *BubbleSettings
- DataLabelSettings -> DataLabelSettings
- ItemsSource -> *DataSource
- ShapeIDPath -> *PrimaryValuePath
- ShapeIDTableField -> *ShapeDataField
- Uri -> *ShapesSource
- ColorMappings' in 'ShapeSetting' class -> ColorMappings
- ShapeFill' in 'ShapeSetting' class -> ShapeFill
- ShapeStroke' in 'ShapeSetting' class -> ShapeStroke
- ShapeStrokeThickness' in 'ShapeSetting' class -> ShapeStrokeThickness
- ShapeColorValuePath' and 'ShapeValuePath' in 'ShapeSetting' class -> ShapeColorValuePath
- SfMaps map = new SfMaps(); map.BackgroundColor = Color.White; ShapeFileLayer layer = new ShapeFileLayer(); layer.Uri = "world1.shp"; ShapeFileLayer subShapeLayer = new ShapeFileLayer(); subShapeLayer.Uri = "usa_state.shp"; ShapeSetting shapeSetting = new ShapeSetting(); shapeSetting.ShapeFill = Color.FromRgb(181, 220, 255); shapeSetting.ShapeStroke = Color.FromRgb(21, 133, 237); subShapeLayer.ShapeSettings = shapeSetting; layer.Sublayers.Add(subShapeLayer); map.Layers.Add(layer); this.Content = map; -> public MainPage() { InitializeComponent(); SfMaps maps = new SfMaps(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" MapShapeSublayer sublayer = new MapShapeSublayer(); sublayer.ShapesSource = MapSource.FromUri(new Uri(" sublayer.ShapeFill = Color.FromRgb(81, 220, 255); sublayer.ShapeStroke = Color.FromRgb(21, 133, 237); sublayer.ShapeStrokeThickness = 1; layer.Sublayers.Add(sublayer); maps.Layer = layer; this.Content = maps; }
- ColorMappings -> ColorMappings
- ColorValuePath -> ColorValuePath
- Fill -> Fill
- MaxSize -> MaxSize
- MinSize -> MinSize
- Opacity -> Opacity
- ValuePath -> *SizeValuePath
- ShowBubbles -> ShowBubbles
- ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); ShapeFileLayer layer = new ShapeFileLayer(); layer.Uri = "world1.shp"; ShapeFileLayer subShapeLayer = new ShapeFileLayer(); subShapeLayer.Uri = "usa_state.shp"; subShapeLayer.ShapeIDTableField = "STATE_NAME"; subShapeLayer.ShapeIDPath = "Name"; subShapeLayer.ItemsSource = viewModel.DataSource; BubbleMarkerSetting bubbleSetting = new BubbleMarkerSetting() { ShowBubbles = true, ValuePath = "index", Fill = Color.Orange, Opacity = 0.8 }; subShapeLayer.BubbleMarkerSettings = bubbleSetting; layer.Sublayers.Add(subShapeLayer); maps.Layers.Add(layer); this.Content = maps; -> public MainPage() { InitializeComponent(); ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" MapShapeSublayer sublayer = new MapShapeSublayer(); sublayer.ShapesSource = MapSource.FromUri(new Uri(" sublayer.DataSource = viewModel.Data; sublayer.PrimaryValuePath = "State"; sublayer.ShapeDataField = "name"; sublayer.ShowBubbles = true; MapBubbleSettings bubbleSetting = new MapBubbleSettings() { ColorValuePath = "Size", SizeValuePath = "Size", }; sublayer.BubbleSettings = bubbleSetting; layer.Sublayers.Add(sublayer); maps.Layer = layer; this.Content = maps; }
- SmartLabelMode -> *OverflowMode
- TextColor' , 'FontSize' , 'FontFamily' , and 'FontAttributes -> *DataLabelStyle
- ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); ShapeFileLayer layer = new ShapeFileLayer(); layer.Uri = "world1.shp"; ShapeFileLayer subShapeLayer = new ShapeFileLayer(); subShapeLayer.Uri = "usa_state.shp"; subShapeLayer.ShapeIDTableField = "STATE_NAME"; subShapeLayer.ShapeIDPath = "Name"; subShapeLayer.ItemsSource = viewModel.DataSource; subShapeLayer.ShapeSettings.ShapeValuePath = "Name"; DataLabelSetting dataLabelSetting = new DataLabelSetting(); dataLabelSetting.SmartLabelMode = IntersectAction.None; dataLabelSetting.TextColor = Color.Blue; subShapeLayer.DataLabelSettings = dataLabelSetting; layer.Sublayers.Add(subShapeLayer); maps.Layers.Add(layer); this.Content = maps; -> public MainPage() { InitializeComponent(); ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" MapShapeSublayer sublayer = new MapShapeSublayer(); sublayer.ShapesSource = MapSource.FromUri(new Uri(" sublayer.DataSource = viewModel.Data; sublayer.PrimaryValuePath = "State"; sublayer.ShapeDataField = "name"; sublayer.ShowDataLabels = true; sublayer.DataLabelSettings = new MapDataLabelSettings() { DataLabelPath = "State", DataLabelStyle = new MapLabelStyle() { FontSize = 6, }, }; layer.Sublayers.Add(sublayer); maps.Layer = layer; this.Content = maps; }
- Color -> Color
- EqualColorMapping -> EqualColorMapping
- RangeColorMapping -> RangeColorMapping
- Value -> Value
- From -> From
- To -> To
- ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); ShapeFileLayer layer = new ShapeFileLayer(); layer.Uri = "world1.shp"; ShapeFileLayer subShapeLayer = new ShapeFileLayer(); subShapeLayer.Uri = "usa_state.shp"; subShapeLayer.ShapeIDPath="Name" subShapeLayer.ShapeIDTableField="STATE_NAME" subShapeLayer.DataSource = viewModel.DataSource; EqualColorMapping colorMapping = new EqualColorMapping(); colorMapping.Color = Colors.Blue; colorMapping.Value = "100"; colorMapping.LegendLabel = "100"; RangeColorMapping colorMapping1 = new RangeColorMapping(); colorMapping1.Color = Colors.Green; colorMapping1.From = 0; colorMapping1.To = 99; colorMapping1.LegendLabel = "0-99"; ShapeSetting shapeSetting = new ShapeSetting(); shapeSetting.ShapeValuePath = "Count"; shapeSetting.ShapeColorValuePath = "Count"; shapeSetting.ColorMappings.Add(colorMapping); shapeSetting.ColorMappings.Add(colorMapping1); subShapeLayer.ShapeSettings = shapeSetting; layer.Sublayers.Add(subShapeLayer); maps.Layers.Add(layer); this.Content = maps; -> public MainPage() { InitializeComponent(); ViewModel viewModel = new ViewModel(); this.BindingContext = viewModel; SfMaps maps = new SfMaps(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" MapShapeSublayer sublayer = new MapShapeSublayer(); sublayer.ShapesSource = MapSource.FromUri(new Uri(" sublayer.DataSource = viewModel.Data; sublayer.PrimaryValuePath = "State"; sublayer.ShapeDataField = "name"; sublayer.ShapeColorValuePath = "Count"; EqualColorMapping colorMapping = new EqualColorMapping(); colorMapping.Color = Colors.Blue; colorMapping.Value = "100"; colorMapping.Text = "100"; RangeColorMapping colorMapping1 = new RangeColorMapping(); colorMapping1.Color = Colors.Green; colorMapping1.From = 0; colorMapping1.To = 99; colorMapping1.Text = "0-99"; sublayer.ColorMappings.Add(colorMapping); sublayer.ColorMappings.Add(colorMapping1); layer.Sublayers.Add(sublayer); maps.Layer = layer; this.Content = maps; }

## Vector layer Mapping

- ShapeType -> *MapPolygon
- Points -> Points
- ShapeFill' in 'ShapeSetting' class -> *Fill
- ShapeStroke' in 'ShapeSetting' class -> *Stroke
- ShapeStrokeThickness' in 'ShapeSetting' class -> *StrokeThickness
- 39.6737 -100.5 61.35 18.131 -32.259 145.4214 SfMaps maps = new SfMaps(); ShapeFileLayer layer = new ShapeFileLayer(); layer.Uri = "world.shp"; ShapeFileLayer subLayer = new ShapeFileLayer(); subLayer.ShapeType = ShapeType.Polygon; subLayer.Points.Add(new Point(39.6737,-100.5)); subLayer.Points.Add(new Point(61.35, 18.131)); subLayer.Points.Add(new Point(-32.259, 145.4214)); ShapeSetting subLayerSetting = new ShapeSetting(); subLayerSetting.ShapeStrokeThickness = 4; subLayerSetting.ShapeFill = Color.Blue; subLayerSetting.ShapeStroke = Color.DarkBlue; subLayer.ShapeSettings = subLayerSetting; layer.Sublayers.Add(subLayer); maps.Layers.Add(layer); -> public MainPage() { InitializeComponent(); SfMaps maps = new SfMaps(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" MapPolygonLayer mapPolygonLayer = new MapPolygonLayer(); MapPolygon polygon1 = new MapPolygon(); polygon1.Points = new ObservableCollection() { new MapLatLng(37.6173, 55.7558), new MapLatLng(87.1216, 53.7596), new MapLatLng(105.3188, 61.5240) }; polygon1.Fill = Colors.Blue; polygon1.Stroke = Colors.DarkBlue; polygon1.StrokeThickness = 4; mapPolygonLayer.Polygons.Add(polygon1); layer.Sublayers.Add(mapPolygonLayer); maps.Layer = layer; this.Content = maps; }
- ShapeType -> *MapPolyline
- - -> StrokeDashArray
- - -> AnimationEasing' in 'MapPolylineLayer' class
- - -> AnimationDuration' in 'MapPolylineLayer' class
- 39.6737 -100.5 61.35 18.131 -32.259 145.4214 SfMaps maps = new SfMaps(); ShapeFileLayer layer = new ShapeFileLayer(); layer.Uri = "world.shp"; ShapeFileLayer subLayer = new ShapeFileLayer(); subLayer.Points.Add(new Point(39.6737,-100.5)); subLayer.Points.Add(new Point(61.35, 18.131)); subLayer.Points.Add(new Point(-32.259, 145.4214)); subLayer.ShapeType = ShapeType.Polyline; ShapeSetting subLayerSetting = new ShapeSetting(); subLayerSetting.ShapeStrokeThickness = 3; subLayerSetting.ShapeStroke = Color.Blue; subLayer.ShapeSettings = subLayerSetting; layer.Sublayers.Add(subLayer); maps.Layers.Add(layer); -> public MainPage() { InitializeComponent(); SfMaps maps = new SfMaps(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" MapPolylineLayer mapPolylineLayer = new MapPolylineLayer(); mapPolylineLayer.AnimationDuration = 3000; mapPolylineLayer.AnimationEasing = Easing.Linear; MapPolyline polyline = new MapPolyline(); polyline.Points = new ObservableCollection() { new MapLatLng(80.2707, 13.0827), new MapLatLng(79.6117, 13.1746), new MapLatLng(79.5037, 13.6373), new MapLatLng(78.8242, 14.4673), }; polyline.Stroke = Colors.Blue; mapPolylineLayer.Polylines.Add(polyline); layer.Sublayers.Add(mapPolylineLayer); maps.Layer = layer; this.Content = maps; }
- - -> MapLine
- - -> From
- - -> To
- - -> Stroke
- - -> StrokeThickness
- - -> StrokeLineCap
- - -> AnimationEasing' in 'MapLineLayer' class
- - -> AnimationDuration' in 'MapLineLayer' class
- - -> public MainPage() { InitializeComponent(); SfMaps maps = new SfMaps(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" MapLineLayer mapLineLayer = new MapLineLayer(); mapLineLayer.AnimationDuration = 3000; mapLineLayer.AnimationEasing = Easing.Linear; MapLine line1 = new MapLine(); line1.From = new MapLatLng(77.1025, 28.7041); line1.To = new MapLatLng(-106.3468, 56.1304); line1.Stroke = Color.FromRgb(61, 155, 242); line1.StrokeThickness = 2; line1.StrokeLineCap = LineCap.Round; layer.Sublayers.Add(mapLineLayer); maps.Layer = layer; this.Content = maps; }
- - -> MapArc
- - -> HeightFactor
- - -> ControlPointFactor
- - -> public MainPage() { InitializeComponent(); SfMaps maps = new SfMaps(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" MapArcLayer mapArcLayer = new MapArcLayer(); MapArc arc = new MapArc(); arc.From = new MapLatLng(77.1025, 28.7041); arc.To = new MapLatLng(-106.3468, 56.1304); arc.Stroke = Color.FromRgb(61, 155, 242); arc.StrokeThickness = 2; arc.ControlPointFactor = 0.5; arc.HeightFactor = 0.2; layer.Sublayers.Add(mapArcLayer); maps.Layer = layer; this.Content = maps; }
- - -> MapCircle
- - -> Center
- - -> Radius
- - -> Fill
- - -> AnimationEasing' in 'MapCircleLayer' class
- - -> AnimationDuration' in 'MapCircleLayer' class
- - -> public MainPage() { InitializeComponent(); SfMaps maps = new SfMaps(); MapShapeLayer layer = new MapShapeLayer(); layer.ShapesSource = MapSource.FromUri(new Uri(" MapCircleLayer circleLayer = new MapCircleLayer(); circleLayer.AnimationDuration = 3000; circleLayer.AnimationEasing = Easing.Linear; MapCircle circle1 = new MapCircle(); circle1.Center = new MapLatLng(74.1240, 15.2993); circle1.Radius = 10; circle1.Fill = Colors.LightGreen; circle1.Stroke = Colors.Green; circle1.StrokeThickness = 3; circleLayer.Circles.Add(circle1); maps.Layer = layer; this.Content = maps; }

## Zooming and Panning Mapping

- ZoomLevel -> ZoomLevel' in 'MapZoomPanBehavior' class
- MinZoom -> *MinZoomLevel' in 'MapZoomPanBehavior' class
- MaxZoom -> *MaxZoomLevel' in 'MapZoomPanBehavior' class
- EnableZooming -> EnableZooming' in 'MapZoomPanBehavior' class
- EnablePanning -> EnablePanning' in 'MapZoomPanBehavior' class
- - -> EnableDoubleTapZooming' in 'MapZoomPanBehavior' class
- - -> EnableCenterAnimation' in 'MapTileLayer' class
- - -> EnableZoomingAnimation' in 'MapLayer' class
- SfMaps maps = new SfMaps(); ImageryLayer layer = new ImageryLayer(); maps.Layers.Add(layer); maps.EnablePanning = true; maps.EnableZooming = true; maps.MinZoom = 3; maps.MaxZoom = 10; maps.ZoomLevel = 5; -> public MainPage() { InitializeComponent(); SfMaps map = new SfMaps(); MapTileLayer tileLayer = new MapTileLayer(); tileLayer.UrlTemplate = " MapZoomPanBehavior zoomPanBehavior = new MapZoomPanBehavior(); zoomPanBehavior.ZoomLevel = 5; zoomPanBehavior.MinZoomLevel = 3; zoomPanBehavior.MaxZoomLevel = 10; zoomPanBehavior.EnablePanning = true; zoomPanBehavior.EnableZooming = true; tileLayer.ZoomPanBehavior = zoomPanBehavior; map.Layer = tileLayer; this.Content = map; }

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
