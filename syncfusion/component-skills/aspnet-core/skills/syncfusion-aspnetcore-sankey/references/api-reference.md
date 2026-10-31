# Sankey Chart API Reference

Complete API reference for the Syncfusion ASP.NET Core Sankey Chart ([`Syncfusion.EJ2.Charts.Sankey`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html)) component.

- **Base API Documentation:** [Sankey](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html)
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll`

## Table of Contents
- [Constructor](#constructor)
- [Configuration Properties](#configuration-properties)
  - [Dimensions](#dimensions)
  - [Title and Subtitle](#title-and-subtitle)
  - [Title--subtitle-style-properties-sankeysankeytitlestyle](#title--subtitle-style-properties-sankeysankeytitlestyle)
  - [Subtitle-style-class-sankeysubtitlestylesankey](#subtitle-style-class-sankeysubtitlestylesankey)
  - [Theme and Appearance](#theme-and-appearance)
  - [Layout](#layout)
  - [Margin-properties-sankeymargin](#margin-properties-sankeymargin)
  - [Border-properties-sankeyborder](#border-properties-sankeyborder)
  - [Localization](#localization)
- [Data Properties](#data-properties)
- [Display Properties](#display-properties)
  - [Node Styling](#node-styling)
  - [Link Styling](#link-styling)
- [Node and Link Properties](#node-and-link-properties)
  - [Node-settings-sankeychartnodesettings](#node-settings-sankeychartnodesettings)
  - [Link-settings-sankeychartlinksettings](#link-settings-sankeychartlinksettings)
  - [sankeynode-properties](#sankeynode-properties)
  - [sankeychartdatalabel-properties](#sankeychartdatalabel-properties)
  - [sankeylink-properties](#sankeylink-properties)
- [Labels and Legend Properties](#labels-and-legend-properties)
  - [Label Settings](#label-settings)
  - [sankeychartlabelsettings-properties](#sankeychartlabelsettings-properties)
  - [Legend Settings](#legend-settings)
  - [sankeychartlegendsettings-common-properties](#sankeychartlegendsettings-common-properties)
  - [sankeylocation-properties](#sankeylocation-properties)
  - [sankeylegendborder-inherited-properties](#sankeylegendborder-inherited-properties)
  - [sankeylegendmargin-inherited-properties](#sankeylegendmargin-inherited-properties)
  - [sankeyfont-properties](#sankeyfont-properties)
  - [sankeylegendtitlestyle-inherited-properties](#sankeylegendtitlestyle-inherited-properties)
- [Appearance and Styling Properties](#appearance-and-styling-properties)
  - [Animation](#animation)
  - [Tooltip](#tooltip)
  - [sankeycharttooltipsettings-common-properties](#sankeycharttooltipsettings-common-properties)
  - [sankeytooltiptextstyle-properties](#sankeytooltiptextstyle-properties)
  - [Container-padding-sankeycontainerpadding](#container-padding-sankeycontainerpadding)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

- **[Sankey()](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html)**
Creates a new instance of the Sankey Chart component.

---

## Configuration Properties

### Dimensions
- **[`width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Width)** (string): Width of the sankey diagram as a CSS value (for example, `"100%"` or `"500px"`).
- **[`height`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Height)** (string): Height of the sankey diagram as a CSS value (for example, `"420px"` or `"100%"`).

### Title and Subtitle
- **[`title`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Title)** (string): Title displayed at the top of the sankey diagram.
- **[`subTitle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_SubTitle)** (string): Subtitle displayed below the main title.
- **[`titleStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_TitleStyle)** ([`SankeySankeyTitleStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html)): Title appearance customization.
- **[`subTitleStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_SubTitleStyle)** ([`SankeySankeyTitleStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html)): Subtitle appearance customization.

### Title / Subtitle Style Properties (`SankeySankeyTitleStyle`)
- **[`color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_Color)** (string): Title text color.
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_ContentTemplate)** (MvcTemplate<object>): Template content for the title style object.
- **[`fontFamily`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_FontFamily)** (string): Font family for the title text.
- **[`fontStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_FontStyle)** (string): Font style for the title text.
- **[`fontWeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_FontWeight)** (string): Font weight for the title text.
- **[`opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_Opacity)** (double): Title text opacity.
- **[`size`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_Size)** (string): Font size for the title text.
- **[`textAlignment`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_TextAlignment)** (Alignment): Alignment of the title text.

### Subtitle Style Class (`SankeySubTitleStyleSankey`)
- **[`SankeySubTitleStyleSankey`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySubTitleStyleSankey.html)** inherits all properties from [`SankeySankeyTitleStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html): [`color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_Color), [`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_ContentTemplate), [`fontFamily`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_FontFamily), [`fontStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_FontStyle), [`fontWeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_FontWeight), [`opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_Opacity), [`size`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_Size), and [`textAlignment`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html#Syncfusion_EJ2_Charts_SankeySankeyTitleStyle_TextAlignment).

### Theme and Appearance
- **[`theme`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Theme)** (ChartTheme): Visual theme for the sankey diagram.
- **[`background`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Background)** (string): Background color of the sankey diagram.
- **[`backgroundImage`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_BackgroundImage)** (string): Background image URL of the sankey diagram.

### Layout
- **[`margin`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Margin)** ([`SankeyMargin`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyMargin.html)): Margin configuration around the chart.
- **[`border`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Border)** ([`SankeyBorder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyBorder.html)): Border configuration for the outer container.
- **[`orientation`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Orientation)** (Orientation): Direction of the sankey diagram (`Horizontal` or `Vertical`).

### Margin Properties (`SankeyMargin`)
- **[`left`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyMargin.html#Syncfusion_EJ2_Charts_SankeyMargin_Left)** (double): Left margin in pixels.
- **[`right`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyMargin.html#Syncfusion_EJ2_Charts_SankeyMargin_Right)** (double): Right margin in pixels.
- **[`top`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyMargin.html#Syncfusion_EJ2_Charts_SankeyMargin_Top)** (double): Top margin in pixels.
- **[`bottom`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyMargin.html#Syncfusion_EJ2_Charts_SankeyMargin_Bottom)** (double): Bottom margin in pixels.
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyMargin.html#Syncfusion_EJ2_Charts_SankeyMargin_ContentTemplate)** (MvcTemplate<object>): Template content for the margin object.

### Border Properties (`SankeyBorder`)
- **[`color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyBorder.html#Syncfusion_EJ2_Charts_SankeyBorder_Color)** (string): Border color.
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyBorder.html#Syncfusion_EJ2_Charts_SankeyBorder_ContentTemplate)** (MvcTemplate<object>): Template content for the border object.
- **[`dashArray`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyBorder.html#Syncfusion_EJ2_Charts_SankeyBorder_DashArray)** (string): Dash pattern for the border stroke.
- **[`width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyBorder.html#Syncfusion_EJ2_Charts_SankeyBorder_Width)** (double): Border width in pixels.

### Localization
- **[`locale`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Locale)** (string): Overrides the global culture and localization value for this component.

---

## Data Properties

- **[`nodes`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Nodes)** (List<[`SankeyNode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyNode.html)>): Collection of nodes representing entities in the diagram.
- **[`links`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Links)** (List<[`SankeyLink`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLink.html)>): Collection of links representing flows between nodes.

---

## Display Properties

### Node Styling
- **[`nodeStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_NodeStyle)** ([`SankeyChartNodeSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettings.html)): Global node appearance configuration.

### Link Styling
- **[`linkStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LinkStyle)** ([`SankeyChartLinkSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html)): Link appearance configuration.

---

## Node and Link Properties

### Node Settings (`SankeyChartNodeSettings`)
- **[`fill`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettings.html#Syncfusion_EJ2_Charts_SankeyChartNodeSettings_Fill)** (string): Node fill color.
- **[`stroke`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettings.html#Syncfusion_EJ2_Charts_SankeyChartNodeSettings_Stroke)** (string): Node border color.
- **[`strokeWidth`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettings.html#Syncfusion_EJ2_Charts_SankeyChartNodeSettings_StrokeWidth)** (double): Node border width in pixels.
- **[`width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettings.html#Syncfusion_EJ2_Charts_SankeyChartNodeSettings_Width)** (double): Node width in pixels.
- **[`padding`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettings.html#Syncfusion_EJ2_Charts_SankeyChartNodeSettings_Padding)** (double): Padding around the node content.
- **[`opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettings.html#Syncfusion_EJ2_Charts_SankeyChartNodeSettings_Opacity)** (double): Node opacity.
- **[`highlightOpacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettings.html#Syncfusion_EJ2_Charts_SankeyChartNodeSettings_HighlightOpacity)** (double): Node opacity when highlighted.
- **[`inactiveOpacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettings.html#Syncfusion_EJ2_Charts_SankeyChartNodeSettings_InactiveOpacity)** (double): Node opacity when inactive.
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettings.html#Syncfusion_EJ2_Charts_SankeyChartNodeSettings_ContentTemplate)** (MvcTemplate<object>): Template content for the node settings object.

### Link Settings (`SankeyChartLinkSettings`)
- **[`opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html#Syncfusion_EJ2_Charts_SankeyChartLinkSettings_Opacity)** (double): Link opacity.
- **[`highlightOpacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html#Syncfusion_EJ2_Charts_SankeyChartLinkSettings_HighlightOpacity)** (double): Link opacity when highlighted.
- **[`inactiveOpacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html#Syncfusion_EJ2_Charts_SankeyChartLinkSettings_InactiveOpacity)** (double): Link opacity when inactive.
- **[`colorType`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html#Syncfusion_EJ2_Charts_SankeyChartLinkSettings_ColorType)** (ColorType): Link color application mode (`Source`, `Target`, `Blend`).
- **[`curvature`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html#Syncfusion_EJ2_Charts_SankeyChartLinkSettings_Curvature)** (double): Curvature factor of the link path.
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html#Syncfusion_EJ2_Charts_SankeyChartLinkSettings_ContentTemplate)** (MvcTemplate<object>): Template content for the link settings object.

### SankeyNode Properties
- **[`Id`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyNode.html#Syncfusion_EJ2_Charts_SankeyNode_Id)** (string): Unique string identifier for the node.
- **[`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyNode.html#Syncfusion_EJ2_Charts_SankeyNode_Color)** (string): Color applied to the node.
- **[`Label`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyNode.html#Syncfusion_EJ2_Charts_SankeyNode_Label)** ([`SankeyChartDataLabel`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartDataLabel.html)): Data label configuration for the node.
- **[`Offset`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyNode.html#Syncfusion_EJ2_Charts_SankeyNode_Offset)** (double): Custom offset position for the node relative to its computed layout position.

### SankeyChartDataLabel Properties
- **[`Text`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartDataLabel.html#Syncfusion_EJ2_Charts_SankeyChartDataLabel_Text)** (string): Label text.
- **[`Padding`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartDataLabel.html#Syncfusion_EJ2_Charts_SankeyChartDataLabel_Padding)** (double): Space around the label text.
- **[`ContentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartDataLabel.html#Syncfusion_EJ2_Charts_SankeyChartDataLabel_ContentTemplate)** (MvcTemplate<object>): Template content for the data label object.

### SankeyLink Properties
- **[`SourceId`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLink.html#Syncfusion_EJ2_Charts_SankeyLink_SourceId)** (string): Unique identifier of the source node.
- **[`TargetId`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLink.html#Syncfusion_EJ2_Charts_SankeyLink_TargetId)** (string): Unique identifier of the target node.
- **[`Value`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLink.html#Syncfusion_EJ2_Charts_SankeyLink_Value)** (double): Link weight/value that determines link thickness.

---

## Labels and Legend Properties

### Label Settings
- **[`labelSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LabelSettings)** ([`SankeyChartLabelSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html)): Label configuration for sankey node labels.

### SankeyChartLabelSettings Properties
- **[`visible`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_Visible)** (bool): Show or hide labels.
- **[`fontFamily`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_FontFamily)** (string): Font family for labels.
- **[`fontSize`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_FontSize)** (string): Font size for labels.
- **[`fontStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_FontStyle)** (string): Font style for labels.
- **[`fontWeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_FontWeight)** (string): Font weight for labels.
- **[`color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_Color)** (string): Label text color.
- **[`padding`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_Padding)** (double): Space around label text.
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_ContentTemplate)** (MvcTemplate<object>): Template content for the label settings object.

### Legend Settings
- **[`legendSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LegendSettings)** ([`SankeyChartLegendSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html)): Legend configuration for the sankey diagram.

### SankeyChartLegendSettings Common Properties
- **[`visible`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Visible)** (bool): Show or hide the legend.
- **[`position`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Position)** (LegendPosition): Legend position (`Auto`, `Top`, `Bottom`, `Left`, `Right`, `Custom`).
- **[`background`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Background)** (string): Legend background color.
- **[`border`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Border)** ([`SankeyLegendBorder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLegendBorder.html)): Legend border configuration.
- **[`opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Opacity)** (double): Legend container opacity.
- **[`padding`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Padding)** (double): Padding around the legend container.
- **[`itemPadding`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_ItemPadding)** (double): Padding between legend items.
- **[`shapeWidth`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_ShapeWidth)** (double): Legend shape width.
- **[`shapeHeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_ShapeHeight)** (double): Legend shape height.
- **[`shapePadding`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_ShapePadding)** (double): Padding between legend shape and text.
- **[`location`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Location)** ([`SankeyLocation`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLocation.html)): Custom legend location when `position="Custom"`.
- **[`margin`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Margin)** ([`SankeyLegendMargin`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLegendMargin.html)): Legend margin settings.
- **[`textStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_TextStyle)** ([`SankeyFont`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html)): Legend text styling.
- **[`title`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Title)** (string): Legend title text.
- **[`titleStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_TitleStyle)** ([`SankeyLegendTitleStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLegendTitleStyle.html)): Legend title text style.
- **[`width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Width)** (string): Legend width.
- **[`height`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Height)** (string): Legend height.
- **[`enableHighlight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_EnableHighlight)** (bool): Enables or disables legend highlighting.
- **[`reverse`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Reverse)** (bool): Displays legend items in reverse order.
- **[`isInversed`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_IsInversed)** (bool): Inverts legend layout.

### SankeyLocation Properties
- **[`x`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLocation.html#Syncfusion_EJ2_Charts_SankeyLocation_X)** (double): X coordinate position for custom legend/tooltip placement.
- **[`y`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLocation.html#Syncfusion_EJ2_Charts_SankeyLocation_Y)** (double): Y coordinate position for custom legend/tooltip placement.
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLocation.html#Syncfusion_EJ2_Charts_SankeyLocation_ContentTemplate)** (MvcTemplate<object>): Template content for the location object.

### SankeyLegendBorder Inherited Properties
- **[`SankeyLegendBorder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLegendBorder.html)** inherits the border members from [`SankeyBorder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyBorder.html): [`color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyBorder.html#Syncfusion_EJ2_Charts_SankeyBorder_Color), [`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyBorder.html#Syncfusion_EJ2_Charts_SankeyBorder_ContentTemplate), [`dashArray`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyBorder.html#Syncfusion_EJ2_Charts_SankeyBorder_DashArray), and [`width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyBorder.html#Syncfusion_EJ2_Charts_SankeyBorder_Width).

### SankeyLegendMargin Inherited Properties
- **[`SankeyLegendMargin`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLegendMargin.html)** inherits the margin members from [`SankeyMargin`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyMargin.html): [`left`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyMargin.html#Syncfusion_EJ2_Charts_SankeyMargin_Left), [`right`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyMargin.html#Syncfusion_EJ2_Charts_SankeyMargin_Right), [`top`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyMargin.html#Syncfusion_EJ2_Charts_SankeyMargin_Top), [`bottom`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyMargin.html#Syncfusion_EJ2_Charts_SankeyMargin_Bottom), and [`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyMargin.html#Syncfusion_EJ2_Charts_SankeyMargin_ContentTemplate).

### SankeyFont Properties
- **[`color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_Color)** (string): Text color.
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_ContentTemplate)** (MvcTemplate<object>): Template content for the font object.
- **[`fontFamily`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_FontFamily)** (string): Font family.
- **[`fontStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_FontStyle)** (string): Font style.
- **[`fontWeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_FontWeight)** (string): Font weight.
- **[`opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_Opacity)** (double): Text opacity.
- **[`size`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_Size)** (string): Text size.
- **[`textAlignment`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_TextAlignment)** (Alignment): Text alignment.
- **[`textOverflow`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_TextOverflow)** (TextOverflow): Text overflow behavior.

### SankeyLegendTitleStyle Inherited Properties
- **[`SankeyLegendTitleStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLegendTitleStyle.html)** inherits all properties from [`SankeyFont`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html): [`color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_Color), [`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_ContentTemplate), [`fontFamily`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_FontFamily), [`fontStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_FontStyle), [`fontWeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_FontWeight), [`opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_Opacity), [`size`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_Size), [`textAlignment`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_TextAlignment), and [`textOverflow`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html#Syncfusion_EJ2_Charts_SankeyFont_TextOverflow).

---

## Appearance and Styling Properties

### Animation
- **[`animation`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Animation)** (object): Options for customizing animation.

### Tooltip
- **[`tooltip`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Tooltip)** ([`SankeyChartTooltipSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html)): Tooltip configuration for displaying details on hover.

### SankeyChartTooltipSettings Common Properties
- **[`enable`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_Enable)** (bool): Enables or disables the tooltip.
- **[`format`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_Format)** (string): Tooltip content format string.
- **[`border`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_Border)** ([`SankeyBorder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyBorder.html)): Tooltip border configuration.
- **[`opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_Opacity)** (double): Tooltip opacity.
- **[`textStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_TextStyle)** ([`SankeyTooltipTextStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyTooltipTextStyle.html)): Tooltip text styling.
- **[`enableAnimation`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_EnableAnimation)** (bool): Enables tooltip animation.
- **[`fadeOutDuration`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_FadeOutDuration)** (double): Tooltip fade-out duration.
- **[`fadeOutMode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_FadeOutMode)** ([`SankeyTooltipFadeOutMode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyTooltipFadeOutMode.html)): Tooltip fade-out interaction mode.
- **[`showTooltipOnDrag`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_ShowTooltipOnDrag)** (bool): Displays tooltip while dragging.
- **[`description`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_Description)** (string): Accessibility description for the tooltip.

### SankeyTooltipTextStyle Properties
- **[`color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyTooltipTextStyle.html#Syncfusion_EJ2_Charts_SankeyTooltipTextStyle_Color)** (string): Tooltip text color.
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyTooltipTextStyle.html#Syncfusion_EJ2_Charts_SankeyTooltipTextStyle_ContentTemplate)** (MvcTemplate<object>): Template content for the tooltip text style object.
- **[`fontFamily`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyTooltipTextStyle.html#Syncfusion_EJ2_Charts_SankeyTooltipTextStyle_FontFamily)** (string): Tooltip font family.
- **[`fontSize`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyTooltipTextStyle.html#Syncfusion_EJ2_Charts_SankeyTooltipTextStyle_FontSize)** (string): Tooltip font size.
- **[`fontStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyTooltipTextStyle.html#Syncfusion_EJ2_Charts_SankeyTooltipTextStyle_FontStyle)** (string): Tooltip font style.
- **[`fontWeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyTooltipTextStyle.html#Syncfusion_EJ2_Charts_SankeyTooltipTextStyle_FontWeight)** (string): Tooltip font weight.

### Container Padding (`SankeyContainerPadding`)
- **[`left`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyContainerPadding.html#Syncfusion_EJ2_Charts_SankeyContainerPadding_Left)** (double): Left padding in pixels.
- **[`right`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyContainerPadding.html#Syncfusion_EJ2_Charts_SankeyContainerPadding_Right)** (double): Right padding in pixels.
- **[`top`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyContainerPadding.html#Syncfusion_EJ2_Charts_SankeyContainerPadding_Top)** (double): Top padding in pixels.
- **[`bottom`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyContainerPadding.html#Syncfusion_EJ2_Charts_SankeyContainerPadding_Bottom)** (double): Bottom padding in pixels.
- **[`contentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyContainerPadding.html#Syncfusion_EJ2_Charts_SankeyContainerPadding_ContentTemplate)** (MvcTemplate<object>): Template content for the container padding object.

---

## Interactivity Properties

### HTML Attributes
- **[`htmlAttributes`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_HtmlAttributes)** (object): Additional HTML attributes in key-value format.

### Focus Border
- **[`focusBorderColor`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_FocusBorderColor)** (string): Focus border color.
- **[`focusBorderWidth`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_FocusBorderWidth)** (double): Focus border width.
- **[`focusBorderMargin`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_FocusBorderMargin)** (double): Focus border margin.

---

## Export and Print Properties

### Export Configuration
- **[`enableExport`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_EnableExport)** (bool): Enables export functionality.
- **[`allowExport`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_AllowExport)** (bool): Enables export in specific scenarios.

---

## Accessibility Properties

### Internationalization and Localization
- **[`enableRtl`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_EnableRtl)** (bool): Enables right-to-left rendering.
- **[`enablePersistence`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_EnablePersistence)** (bool): Persists component state between page reloads.

### Accessibility Features
- **[`accessibility`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Accessibility)** (object): Accessibility configuration.

---

## Event Properties

### Lifecycle Events
- **[`load`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Load)** (string): Triggers before the sankey loads.
- **[`loaded`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Loaded)** (string): Triggers after the sankey has fully loaded.

### Node Interaction Events
- **[`nodeClick`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_NodeClick)** (string): Triggers when a node is clicked.
- **[`nodeEnter`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_NodeEnter)** (string): Triggers when the mouse enters a node.
- **[`nodeLeave`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_NodeLeave)** (string): Triggers when the mouse leaves a node.

### Link Interaction Events
- **[`linkClick`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LinkClick)** (string): Triggers when a link is clicked.
- **[`linkEnter`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LinkEnter)** (string): Triggers when the mouse enters a link.
- **[`linkLeave`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LinkLeave)** (string): Triggers when the mouse leaves a link.

### Rendering Events
- **[`nodeRendering`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_NodeRendering)** (string): Triggers before a node is rendered.
- **[`linkRendering`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LinkRendering)** (string): Triggers before a link is rendered.
- **[`labelRendering`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LabelRendering)** (string): Triggers before a label is rendered.

### Legend Events
- **[`legendItemRendering`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LegendItemRendering)** (string): Triggers before a legend item is rendered.
- **[`legendItemHover`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LegendItemHover)** (string): Triggers when the mouse hovers over a legend item.

### Tooltip Events
- **[`tooltipRendering`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_TooltipRendering)** (string): Triggers before a tooltip is rendered.

### Resize and Export Events
- **[`sizeChanged`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_SizeChanged)** (string): Triggers when the chart size changes.
- **[`beforePrint`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_BeforePrint)** (string): Triggers before the print operation starts.
- **[`beforeExport`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_BeforeExport)** (string): Triggers before the export process begins.
- **[`afterExport`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_AfterExport)** (string): Triggers after export completes.
- **[`exportCompleted`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_ExportCompleted)** (string): Triggers after chart export is completed.

---

## Related Settings Classes

### Main Component
- **[`Sankey`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html)**

### Border and Margin
- **[`SankeyBorder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyBorder.html)**
- **[`SankeyBorderBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyBorderBuilder.html)**
- **[`SankeyMargin`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyMargin.html)**
- **[`SankeyMarginBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyMarginBuilder.html)**
- **[`SankeyContainerPadding`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyContainerPadding.html)**
- **[`SankeyContainerPaddingBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyContainerPaddingBuilder.html)**

### Node and Link Types
- **[`SankeyNode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyNode.html)**
- **[`SankeyNodeBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyNodeBuilder.html)**
- **[`SankeyLink`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLink.html)**
- **[`SankeyLinkBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLinkBuilder.html)**
- **[`SankeySankeyNodesCollection`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyNodesCollection.html)**
- **[`SankeySankeyLinksCollection`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyLinksCollection.html)**

### Node / Link Settings
- **[`SankeyChartNodeSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettings.html)**
- **[`SankeyChartNodeSettingsBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettingsBuilder.html)**
- **[`SankeyChartLinkSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html)**
- **[`SankeyChartLinkSettingsBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettingsBuilder.html)**

### Labels
- **[`SankeyChartDataLabel`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartDataLabel.html)**
- **[`SankeyChartDataLabelBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartDataLabelBuilder.html)**
- **[`SankeyChartLabelSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html)**
- **[`SankeyChartLabelSettingsBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettingsBuilder.html)**

### Legend
- **[`SankeyChartLegendSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html)**
- **[`SankeyChartLegendSettingsBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettingsBuilder.html)**
- **[`SankeyLegendBorder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLegendBorder.html)**
- **[`SankeyLegendMargin`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLegendMargin.html)**
- **[`SankeyLegendTitleStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLegendTitleStyle.html)**
- **[`SankeyLocation`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLocation.html)**
- **[`SankeyLocationBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLocationBuilder.html)**

### Tooltip
- **[`SankeyChartTooltipSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html)**
- **[`SankeyChartTooltipSettingsBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettingsBuilder.html)**
- **[`SankeyTooltipTextStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyTooltipTextStyle.html)**
- **[`SankeyTooltipTextStyleBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyTooltipTextStyleBuilder.html)**
- **[`SankeyTooltipFadeOutMode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyTooltipFadeOutMode.html)**

### Fonts and Title Styles
- **[`SankeyFont`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFont.html)**
- **[`SankeyFontBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyFontBuilder.html)**
- **[`SankeySankeyTitleStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html)**
- **[`SankeySankeyTitleStyleBuilder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyleBuilder.html)**
- **[`SankeySubTitleStyleSankey`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeySubTitleStyleSankey.html)**

---

## Common Usage Patterns

- **With Legend and Labels:** Set [`labelSettings.visible`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_Visible) = `true` and [`legendSettings.visible`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Visible) = `true`
- **Vertical Flow:** Set [`orientation`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Orientation) = `Orientation.Vertical`
- **Blend Color:** Set [`linkStyle.colorType`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html#Syncfusion_EJ2_Charts_SankeyChartLinkSettings_ColorType) = `ColorType.Blend`
- **Interactive Highlighting:** Set [`nodeStyle.highlightOpacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettings.html#Syncfusion_EJ2_Charts_SankeyChartNodeSettings_HighlightOpacity), [`nodeStyle.inactiveOpacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettings.html#Syncfusion_EJ2_Charts_SankeyChartNodeSettings_InactiveOpacity), [`linkStyle.highlightOpacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html#Syncfusion_EJ2_Charts_SankeyChartLinkSettings_HighlightOpacity), and [`linkStyle.inactiveOpacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html#Syncfusion_EJ2_Charts_SankeyChartLinkSettings_InactiveOpacity)
- **Responsive Layout:** Set [`width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Width) = `"100%"` and use percentage or pixel [`height`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Height) as needed
- **RTL Localization:** Set [`enableRtl`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_EnableRtl) = `true` and configure [`locale`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Locale)
- **Dark Theme:** Set [`theme`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Theme) to a dark `ChartTheme` value
- **Export Ready:** Set [`enableExport`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_EnableExport) = `true` and handle export events if required

---

### Basic Sankey
```cshtml
<ejs-sankey id="sankey" width="100%" height="420px" title="Sankey Chart">
    <e-sankey-nodes>
        @foreach (var node in ViewBag.Nodes)
        {
            <e-sankey-node id="@node.Id"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in ViewBag.Links)
        {
            <e-sankey-link sourceId="@link.SourceId"
                           targetId="@link.TargetId"
                           value="@link.Value">
            </e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

---

### Basic Sankey with Horizontal Orientation
```cshtml
<ejs-sankey id="sankey" width="100%" height="420px">
    <e-sankey-nodes>
        @foreach (var node in ViewBag.nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in ViewBag.links)
        {
            <e-sankey-link sourceId="@link.SourceId" 
                           targetId="@link.TargetId" 
                           value="@link.Value">
            </e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

### Sankey with Custom Node and Link Styling
```cshtml
<ejs-sankey id="styledSankey" width="100%" height="420px">
    <!-- Global Node Styles -->
    <e-sankey-nodesettings fill="#3DB6E6" width="20" padding="10">
    </e-sankey-nodesettings>

    <!-- Global Link Styles -->
    <e-sankey-linksettings opacity="0.4" colorType="Blend">
    </e-sankey-linksettings>

    <!-- Node Definitions -->
    <e-sankey-nodes>
        @foreach (var node in ViewBag.nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <!-- Link Definitions -->
    <e-sankey-links>
        @foreach (var link in ViewBag.links)
        {
            <e-sankey-link sourceId="@link.SourceId" 
                           targetId="@link.TargetId" 
                           value="@link.Value">
            </e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

```

### Vertical Sankey with Period Selector
```cshtml
@using Syncfusion.EJ2;

<ejs-sankey id="verticalSankey" 
            orientation="Vertical" 
            width="100%" 
            height="600px">
            
    <!-- Label Settings -->
    <e-sankey-labelsettings visible="true">
    </e-sankey-labelsettings>
    
    <!-- Legend Settings -->
    <e-sankey-legendsettings visible="true" position="Top">
    </e-sankey-legendsettings>

    <!-- Node Definitions -->
    <e-sankey-nodes>
        @foreach (var node in ViewBag.nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <!-- Link Definitions -->
    <e-sankey-links>
        @foreach (var link in ViewBag.links)
        {
            <e-sankey-link sourceId="@link.SourceId" 
                           targetId="@link.TargetId" 
                           value="@link.Value">
            </e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

### Sankey with Legend and Tooltip
```cshtml
@using Syncfusion.EJ2;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.Charts;
public class IndexModel : PageModel
{
    public List<SankeyNode> Nodes { get; set; }
    public List<SankeyLink> Links { get; set; }
public void OnGet()
{
    Nodes = new List<SankeyNode>
    {
        new SankeyNode { Id = "Generation", Label = new SankeyChartDataLabel { Text = "Energy Input" } },
        new SankeyNode { Id = "Distribution", Label = new SankeyChartDataLabel { Text = "Distribution" } },
        new SankeyNode { Id = "Consumption", Label = new SankeyChartDataLabel { Text = "Consumption" } }
    };

    Links = new List<SankeyLink>
    {
        new SankeyLink { SourceId = "Generation", TargetId = "Distribution", Value = 500 },
        new SankeyLink { SourceId = "Distribution", TargetId = "Consumption", Value = 450 }
    };

    // Use plural keys to match your HTML loops
    ViewData["Nodes"] = Nodes;
    ViewData["Links"] = Links;
    ViewData["TooltipFontFamily"] = "Arial";
    ViewData["TooltipFontStyle"] = "normal";
    ViewData["TooltipFontWeight"] = "500";
    ViewData["TooltipFontSize"] = "14px";
    ViewData["TooltipColor"] = "#000";
    ViewData["TooltipFill"] = "#F3F3F3";
}

}
@page
@model IndexModel
@using Syncfusion.EJ2;
@* Add the button above the chart *@
<ejs-sankey id="interactiveSankey" width="100%" height="420px">
    
    <!-- Tooltip Settings -->    <e-sankey-tooltipsettings enable="true" fill="@ViewBag.TooltipFill">
        <e-sankeytooltipsettings-textstyle
            fontFamily="@ViewBag.TooltipFontFamily"
            fontStyle="@ViewBag.TooltipFontStyle"
            fontWeight="@ViewBag.TooltipFontWeight"
            fontSize="@ViewBag.TooltipFontSize"
            color="@ViewBag.TooltipColor">
        </e-sankeytooltipsettings-textstyle>
    </e-sankey-tooltipsettings>
    
    <!-- Legend Settings -->
    <e-sankey-legendsettings visible="true" position="Bottom">
    </e-sankey-legendsettings>

    <!-- Node Definitions -->
    <e-sankey-nodes>
        @foreach (var node in ViewBag.nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <!-- Link Definitions -->
    <e-sankey-links>
        @foreach (var link in ViewBag.links)
        {
            <e-sankey-link sourceId="@link.SourceId" 
                           targetId="@link.TargetId" 
                           value="@link.Value">
            </e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

### Sankey with RTL Support
```cshtml
<ejs-sankey id="rtlSankey" 
            enableRtl="true" 
            width="100%" 
            height="420px">
    <e-sankey-nodes>
        @foreach (var node in ViewBag.nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in ViewBag.links)
        {
            <e-sankey-link sourceId="@link.SourceId" 
                           targetId="@link.TargetId" 
                           value="@link.Value">
            </e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

---

## Common Property Combinations

- **With Legend and Labels:** Set `labelSettings.visible = true` + `legendSettings.visible = true`
- **Vertical Flow:** Set `orientation = Orientation.Vertical`
- **Blend Color:** Set `linkStyle.colorType = "Blend"` for gradient link colors
- **Interactive Highlighting:** Set `nodeStyle.hoverOpacity` and `linkStyle.hoverOpacity`
- **Responsive Layout:** Set `width = "100%"` and `height = "100%"` for responsive sizing
- **RTL Localization:** Set `enableRtl = true` + `locale` to RTL language
- **Dark Theme:** Set `theme = ChartTheme.MaterialDark` or similar dark theme
- **Export Ready:** Set `enableExport = true` + handle `beforeExport` and `afterExport` events

---

## Data Structure Examples

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.Charts;
using System.Collections.Generic;

public class IndexModel : PageModel
{
    public void OnGet()
    {
        List<SankeyNode> nodes = new List<SankeyNode>
        {
            new SankeyNode { Id = "A" , Fill = "#3DB6E6", Label = new SankeyChartDataLabel { Text = "Source" } },
            new SankeyNode { Id = "B" , Fill = "#FFA500" , Label = new SankeyChartDataLabel { Text = "Process" }},
            new SankeyNode { Id = "C" , Fill = "#6ECF00", Label = new SankeyChartDataLabel { Text = "Target" }  }
        };

        List<SankeyLink> links = new List<SankeyLink>
        {
            new SankeyLink { SourceId = "A", TargetId = "B", Value = 100 },
            new SankeyLink { SourceId = "B", TargetId = "C", Value = 80 }
        };

        // FIX: Use ViewData instead of ViewBag here
        ViewData["SankeyNodes"] = nodes;
        ViewData["SankeyLinks"] = links;
    }
}
```

### Node Structure
```csharp
List<SankeyNode> nodes = new List<SankeyNode>
{
    new SankeyNode { Id = "A" , Label = new SankeyChartDataLabel { Text = "Source" } },
    new SankeyNode { Id = "B" , Label = new SankeyChartDataLabel { Text = "Process" }},
    new SankeyNode { Id = "C" , Label = new SankeyChartDataLabel { Text = "Target" }  }
};
```
```csharp
Nodes = new List<SankeyNode>
{
    // IDs are "Generation", "Distribution", "Consumption"
    new SankeyNode { Id = "Generation", Label = new SankeyChartDataLabel { Text = "Energy Input" } },
    new SankeyNode { Id = "Distribution", Label = new SankeyChartDataLabel { Text = "Distribution" } },
    new SankeyNode { Id = "Consumption", Label = new SankeyChartDataLabel { Text = "Consumption" } }
};
```

### Link Structure
```csharp
List<SankeyLink> links = new List<SankeyLink>
{
    new SankeyLink { SourceId = "A", TargetId = "B", Value = 100 },
    new SankeyLink { SourceId = "B", TargetId = "C", Value = 80 }
};
```
```csharp
Links = new List<SankeyLink>
{
    // Mapping Source/Target to the IDs defined above
    new SankeyLink { SourceId = "Generation", TargetId = "Distribution", Value = 500 },
    new SankeyLink { SourceId = "Distribution", TargetId = "Consumption", Value = 450 }
};
```

---

## Notes

- Node IDs must be unique strings within the [`nodes`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Nodes) collection.
- Link [`value`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyLink.html#Syncfusion_EJ2_Charts_SankeyLink_Value) determines the visual thickness of the connection.
- [`Source`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html#Syncfusion_EJ2_Charts_SankeyChartLinkSettings_ColorType), [`Target`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html#Syncfusion_EJ2_Charts_SankeyChartLinkSettings_ColorType), and [`Blend`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html#Syncfusion_EJ2_Charts_SankeyChartLinkSettings_ColorType) control how link colors are derived from connected nodes.
- [`orientation`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Orientation) affects the flow direction: Horizontal (left-to-right) or Vertical (top-to-bottom).
- [`Offset`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyNode.html#Syncfusion_EJ2_Charts_SankeyNode_Offset) is a node-level property used to shift an individual node relative to its computed layout position.
- Global appearance is configured through [`nodeStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_NodeStyle) and [`linkStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LinkStyle), while per-node customization is done through [`SankeyNode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyNode.html).
- Label text for individual nodes is configured through [`SankeyChartDataLabel`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SankeyChartDataLabel.html).
- RTL support requires [`enableRtl`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_EnableRtl) = `true` and an appropriate [`locale`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Locale) if needed.
- For complete property signatures and latest details, refer to the [Base API page](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sankey.html).