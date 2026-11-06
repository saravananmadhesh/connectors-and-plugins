# TreeMap Migration Mapping

## Control

- Xamarin: TreeMap
- MAUI: TreeMap (SfTreeMap)

## Initialize Control Mapping

- using Syncfusion.SfTreeMap.XForms; ... SfTreeMap treeMap = new SfTreeMap(); this.Content = treeMap; -> using Syncfusion.Maui.TreeMap; ... SfTreeMap treeMap = new SfTreeMap(); this.Content = treeMap;

## Classes Mapping

- LeafItemSettings -> TreeMapLeafItemSettings
- LegendSettings -> TreeMapLegendSettings
- ColorMapping -> TreeMapBrushSettings
- UniColorMapping -> TreeMapUniformBrushSettings
- DesaturationColorMapping -> TreeMapDesaturationBrushSettings
- PaletteColorMapping -> TreeMapPaletteBrushSettings
- RangeColorMapping -> TreeMapRangeBrushSettings
- Range -> TreeMapRangeBrush
- TooltipSetting -> TreeMapToolTipSettings
- TreeMapLevel -> TreeMapLevel
- Nil -> TreeMapItemInfo
- Style -> TreeMapTextStyle

## Properties Mapping

- DataSource -> DataSource
- WeightValuePath -> PrimaryValuePath
- ColorValuePath -> RangeColorValuePath
- HightlightColor -> SelectedItemStroke
- HightlightBorderWidth -> SelectedItemStrokeWidth
- LayoutType -> LayoutType
- ItemTemplate -> LeafItemTemplate
- LeafItemSettings -> LeafItemSettings
- LeafItemColorMapping -> LeafItemBrushSettings
- LegendSettings -> LegendSettings
- Levels -> Levels
- SelectedItems -> SelectedItems
- SelectionMode -> SelectionMode
- ShowTooltip -> ShowToolTip
- TooltipSettings -> ToolTipSettings
- TooltipTemplate -> ToolTipTemplate
- Nil -> GroupItemBrushSettings
- Nil -> Item
- Nil -> GroupLevel
- Nil -> Background
- Nil -> PrimaryValueText
- BorderColor -> Stroke
- BorderWidth -> StrokeWidth
- Gap -> Spacing
- LabelPath -> LabelPath
- LabelStyle -> TextStyle
- OverflowMode -> TextFormatOption
- ShowLegend -> ShowLegend
- IconSize -> IconSize
- LegendIcon -> IconType
- LegendPosition -> Placement
- Size -> Size
- Color -> Brush
- From -> From
- To -> To
- Colors -> Brushes
- LegendLabel -> LegendLabel
- BackgroundColor -> Background
- Duration -> Duration
- TextColor -> TextColor (From TextStyle of ToolTipSettings class)
- StrokeColor -> Stroke
- LabelPath -> GroupPath
- GroupBackground -> Background
- GroupBorderColor -> Stroke
- GroupBorderThickness -> StrokeWidth
- GroupGap -> Spacing
- HeaderStyle -> TextStyle
- HeaderHeight -> HeaderHeight
- Color -> TextColor
- FontSize -> FontSize
- FontFamily -> FontFamily
- FontAttributes -> FontAttributes

## Enums Mapping

- LabelOverflowMode -> TextFormatOption
- LayoutTypes -> LayoutType
- LegendPositions -> LegendPlacement
- LegendIcons -> LegendIconType
- SelectionMode -> SelectionMode

## Events Mapping

- ItemSelected -> SelectionChanged

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
