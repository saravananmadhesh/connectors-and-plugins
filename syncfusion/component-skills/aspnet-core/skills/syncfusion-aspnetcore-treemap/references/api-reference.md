# TreeMap API Reference

Complete API reference for the Syncfusion ASP.NET Core TreeMap (`Syncfusion.EJ2.TreeMap.TreeMap`) component.

- **Official API Documentation:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html
- **Namespace:** `Syncfusion.EJ2.TreeMap`
- **Assembly:** `Syncfusion.EJ2.dll`

**Assembly:** Syncfusion.EJ2.dll

This document provides a comprehensive API reference for the Syncfusion ASP.NET Core TreeMap component, including all classes, properties, events, enumerations, and configuration options.

---

## Table of Contents

- [Main Classes](#main-classes)
- [TreeMap Class](#treemap-class)
- [Supporting Configuration Classes](#supporting-configuration-classes)
- [Enumerations](#enumerations)
- [Event Arguments](#event-arguments)
- [Usage Examples](#usage-examples)

---

## Main Classes

The TreeMap component consists of the following primary classes:

| Class | API Reference | Purpose |
|-------|---------------|---------|
| [`TreeMap`](#treemap-class) | [TreeMap](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html) | Main component for rendering hierarchical visualizations |
| [`TreeMapBorder`](#treemapborder-class) | [TreeMapBorder](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapBorder.html) | Customizes the border of the TreeMap |
| [`TreeMapLeafItemSettings`](#treemapleafitemsettings-class) | [TreeMapLeafItemSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html) | Configures leaf item appearance and behavior |
| [`TreeMapLevel`](#treemaplevel-class) | [TreeMapLevel](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html) | Defines hierarchical levels for grouping |
| [`TreeMapLegendSettings`](#treemaplegends-settings-class) | [TreeMapLegendSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html) | Configures legend display and behavior |
| [`TreeMapCommonTitleSettings`](#treemapcommontitlesettings-class) | [TreeMapCommonTitleSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapCommonTitleSettings.html) | Configures common title settings for legend |
| [`LegendSettingsTextStyleLegendSettings`](#legendsettingstextstylelegendsettings-class) | [LegendSettingsTextStyleLegendSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsTextStyleLegendSettings.html) | Legend title text styling |
| [`TreeMapTitleSettings`](#treemaptitlesettings-class) | [TreeMapTitleSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTitleSettings.html) | Configures title display and formatting |
| [`TreeMapTooltipSettings`](#treemaptooltipsettings-class) | [TreeMapTooltipSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTooltipSettings.html) | Configures tooltip display and formatting |
| [`TreeMapHighlightSettings`](#treemaphighlightsettings-class) | [TreeMapHighlightSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapHighlightSettings.html) | Configures highlight behavior on hover |
| [`TreeMapSelectionSettings`](#treemapselectionsettings-class) | [TreeMapSelectionSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapSelectionSettings.html) | Configures selection behavior on click |
| [`TreeMapColorMapping`](#treemapcolormapping-class) | [TreeMapColorMapping](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapColorMapping.html) | Defines color mapping rules |
| [`TreeMapMargin`](#treemapmargin-class) | [TreeMapMargin](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapMargin.html) | Configures margin spacing |
| [`TreeMapFont`](#treemapfont-class) | [TreeMapFont](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapFont.html) | Configures font properties |
| [`TreeMapInitialDrillSettings`](#treemapinitialdrillsettings-class) | [TreeMapInitialDrillSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapInitialDrillSettings.html) | Configures initial drill-down state |

---

## TreeMap Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html)
**API Reference:** [`TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html)
Main component for rendering hierarchical TreeMap visualizations with interactive features.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`AllowImageExport`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_AllowImageExport) | bool | false | Enables and disables the export to image functionality in treemap |
| [`AllowPdfExport`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_AllowPdfExport) | bool | false | Enables and disables the export to pdf functionality in treemap |
| [`AllowPrint`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_AllowPrint) | bool | false | Enables and disables the print functionality in treemap |
| [`Background`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Background) | string | null | Sets and gets the background color of the treemap |
| [`BeforePrint`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_BeforePrint) | string | null | Triggers before the print gets started |
| [`Border`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Border) | [`TreeMapBorder`](#treemapborder-class) | null | Sets and gets the options for customizing the color and width of the treemap border |
| [`BreadcrumbConnector`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_BreadcrumbConnector) | string | " - " | Specifies the symbol to show connection between the two words in the header of the treemap during drill down |
| [`Click`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Click) | string | null | Triggers after clicking on the treemap |
| [`ColorValuePath`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_ColorValuePath) | string | null | Sets and gets the value path from the data source, based on it color is filled in treemap |
| [`DataSource`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_DataSource) | object | null | Sets and gets the data source for the treemap |
| [`Description`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Description) | string | null | Sets and gets the description for treemap |
| [`DoubleClick`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_DoubleClick) | string | null | Triggers after double clicking on the treemap |
| [`DrillDownView`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_DrillDownView) | bool | false | Enables or disables the initial drill in the treemap |
| [`DrillEnd`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_DrillEnd) | string | null | Triggers after drill down functionality gets completed in the treemap |
| [`DrillStart`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_DrillStart) | string | null | Triggers on performing drill down functionality in the treemap |
| [`EnableBreadcrumb`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_EnableBreadcrumb) | bool | false | Enables or disables the connection text in the header of the treemap when drill down is enabled |
| [`EnableDrillDown`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_EnableDrillDown) | bool | false | Enables or disables the drill down functionality in treemap |
| [`EnableHtmlSanitizer`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_EnableHtmlSanitizer) | bool | false | Specifies whether to enable the rendering of untrusted HTML values in the TreeMap |
| [`EnablePersistence`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_EnablePersistence) | bool | false | Enable or disable persisting component's state between page reloads |
| [`EnableRtl`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_EnableRtl) | bool | false | Enable or disable rendering component in right to left direction |
| [`EqualColorValuePath`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_EqualColorValuePath) | string | "" | Sets and gets the value path from the data source, based on it color is filled in treemap (used when equal color mapping is set) |
| [`Format`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Format) | string | null | Sets and gets format for the texts in the treemap |
| [`Height`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Height) | string | null | Sets and gets the height of the treemap |
| [`HighlightSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_HighlightSettings) | [`TreeMapHighlightSettings`](#treemaphighlightsettings-class) | null | Sets and gets the options to customize the highlight functionality of the treemap |
| [`HtmlAttributes`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_HtmlAttributes) | object | null | Allows additional HTML attributes such as title, name, etc |
| [`InitialDrillDown`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_InitialDrillDown) | [`TreeMapInitialDrillSettings`](#treemapinitialdrillsettings-class) | null | Specifies the options for customizing the initial drill down in treemap |
| [`ItemClick`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_ItemClick) | string | null | Triggers after clicking an item in the treemap |
| [`ItemHighlight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_ItemHighlight) | string | null | Triggers after highlighting on the treemap item |
| [`ItemMove`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_ItemMove) | string | null | Triggers after mouse hover on the treemap item |
| [`ItemRendering`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_ItemRendering) | string | null | Triggers before item rendering in the treemap |
| [`ItemSelected`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_ItemSelected) | string | null | Triggers after selecting a treemap item |
| [`LayoutType`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_LayoutType) | [`LayoutMode`](#layoutmode-enumeration) | LayoutMode.Squarified | Specifies the rendering type for the layout of the treemap |
| [`LeafItemSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_LeafItemSettings) | [`TreeMapLeafItemSettings`](#treemapleafitemsettings-class) | null | Sets and gets the options for customizing the leaf item of the treemap |
| [`LegendItemRendering`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_LegendItemRendering) | string | null | Triggers before rendering each legend item in the treemap |
| [`LegendRendering`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_LegendRendering) | string | null | Triggers before rendering the legend items in the treemap |
| [`LegendSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_LegendSettings) | [`TreeMapLegendSettings`](#treemaplegends-settings-class) | null | Sets and gets the options for customizing the legend of the treemap |
| [`Levels`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Levels) | List<[`TreeMapLevel`](#treemaplevel-class)> | null | Sets and gets the options to configure and customize the levels of treemap items |
| [`Load`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Load) | string | null | Triggers before the treemap is rendered |
| [`Loaded`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Loaded) | string | null | Triggers after treemap is rendered |
| [`Locale`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Locale) | string | "" | Overrides the global culture and localization value for this component |
| [`Margin`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Margin) | [`TreeMapMargin`](#treemapmargin-class) | null | Sets and gets the options for customizing the margin in the treemap |
| [`MouseMove`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_MouseMove) | string | null | Triggers after mouse hover on the treemap |
| [`Palette`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Palette) | string[] | null | Sets and gets a set of colors to apply in the treemap items |
| [`Query`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Query) | string | null | Sets and gets the query to select particular data from the shape data |
| [`RangeColorValuePath`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_RangeColorValuePath) | string | "" | Sets and gets the value path from the data source, based on it color is filled in treemap (used when range color mapping is set) |
| [`RenderDirection`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_RenderDirection) | [`RenderingMode`](#renderingmode-enumeration) | RenderingMode.TopLeftBottomRight | Specifies the rendering direction of layout of the treemap items |
| [`Resize`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Resize) | string | null | Triggers to notify the resize of the treemap when the window is resized |
| [`RightClick`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_RightClick) | string | null | Triggers after right clicking on the treemap |
| [`SelectionSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_SelectionSettings) | [`TreeMapSelectionSettings`](#treemapselectionsettings-class) | null | Sets and gets the options for customizing the selection functionality of the treemap |
| [`TabIndex`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_TabIndex) | double | 0 | Sets and gets the tab index value for treemap |
| [`Theme`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Theme) | [`TreeMapTheme`](#treemaptheme-enumeration) | TreeMapTheme.Material | Sets and gets the theme styles supported for treemap |
| [`TitleSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_TitleSettings) | [`TreeMapTitleSettings`](#treemaptitlesettings-class) | null | Sets and gets the options for customizing the title of the treemap |
| [`TooltipRendering`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_TooltipRendering) | string | null | Triggers on rendering of the tooltip in the treemap |
| [`TooltipSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_TooltipSettings) | [`TreeMapTooltipSettings`](#treemaptooltipsettings-class) | null | Sets and gets the options for customizing the tooltip of the treemap |
| [`UseGroupingSeparator`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_UseGroupingSeparator) | bool | false | Enables or disables the visibility state of the separator for grouping |
| [`WeightValuePath`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_WeightValuePath) | string | null | Sets and gets the value path of the weight from the data source, based on which the treemap item is rendered |
| [`Width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Width) | string | null | Sets and gets the width of the treemap |

### Methods

| Method | Description |
|--------|-------------|
| `Export(type, fileName)` | Exports the TreeMap to specified format (Image, PDF, SVG) |
| `Print()` | Prints the TreeMap |
| `Refresh()` | Refreshes the TreeMap component |

---

## TreeMapBorder Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapBorder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapBorder.html)

Customizes the border properties of the TreeMap.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapBorder.html#Syncfusion_EJ2_TreeMap_TreeMapBorder_Color) | string | "#808080" | Sets and gets the border color |
| [`Width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapBorder.html#Syncfusion_EJ2_TreeMap_TreeMapBorder_Width) | double | 0 | Defines the width of the border in the treemap |

---

## TreeMapLeafItemSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapLeafItemSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html)

Configures appearance and behavior of leaf items in the TreeMap.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`AutoFill`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_AutoFill) | bool | false | Enables or disables automatic filling of colors from the palette in the leaf items |
| [`Border`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_Border) | [`TreeMapBorder`](#treemapborder-class) | null | Sets and gets the border properties of leaf items |
| [`ColorMapping`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_ColorMapping) | List<[`TreeMapColorMapping`](#treemapcolormapping-class)> | null | Sets and gets the color mapping for leaf items |
| [`Fill`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_Fill) | string | null | Sets and gets the fill color of leaf items |
| [`Gap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_Gap) | double | 0 | Sets and gets the gap between the leaf items |
| [`InterSectAction`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_InterSectAction) | [`LabelAlignment`](#labelalignment-enumeration) | LabelAlignment.Trim | Sets and gets the actions to perform when labels intersect with other labels |
| [`LabelFormat`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_LabelFormat) | string | null | Sets and gets the string to format the label text of leaf item |
| [`LabelPath`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_LabelPath) | string | null | Sets and gets the label field from the data source |
| [`LabelPosition`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_LabelPosition) | [`LabelPosition`](#labelposition-enumeration) | LabelPosition.TopLeft | Sets and gets the position of the label within leaf items |
| [`LabelStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_LabelStyle) | [`TreeMapFont`](#treemapfont-class) | null | Sets and gets the label style |
| [`LabelTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_LabelTemplate) | string | null | Sets and gets the label template of leaf item |
| [`Opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_Opacity) | double | 1 | Sets and gets the opacity of leaf item |
| [`Padding`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_Padding) | double | 10 | Sets and gets the padding of leaf item |
| [`ShowLabels`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_ShowLabels) | bool | true | Shows or hides the labels in the treemap |
| [`TemplatePosition`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLeafItemSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLeafItemSettings_TemplatePosition) | [`LabelPosition`](#labelposition-enumeration) | LabelPosition.Center | Sets and gets the template position |

---

## TreeMapLevel Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapLevel`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html)

Defines hierarchical levels for grouping data in the TreeMap.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`AutoFill`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_AutoFill) | bool | false | Enables or disables automatic filling of colors from the palette |
| [`Border`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_Border) | [`TreeMapBorder`](#treemapborder-class) | null | Sets and gets the border properties |
| [`ColorMapping`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_ColorMapping) | List<[`TreeMapColorMapping`](#treemapcolormapping-class)> | null | Sets and gets the color mapping options for the level |
| [`Fill`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_Fill) | string | null | Sets and gets the fill color |
| [`GroupGap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_GroupGap) | double | 0 | Sets and gets the gap between the level leaf items |
| [`GroupPadding`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_GroupPadding) | double | 10 | Sets and gets the padding of level leaf items |
| [`GroupPath`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_GroupPath) | string | null | Sets and gets the property from the data source used for grouping |
| [`HeaderAlignment`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_HeaderAlignment) | [`Alignment`](#alignment-enumeration) | Alignment.Near | Sets and gets the alignment of the header |
| [`HeaderFormat`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_HeaderFormat) | string | null | Sets and gets the header format string |
| [`HeaderHeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_HeaderHeight) | double | 20 | Sets and gets the header height |
| [`HeaderStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_HeaderStyle) | [`TreeMapFont`](#treemapfont-class) | null | Sets and gets the header style |
| [`HeaderTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_HeaderTemplate) | string | null | Sets and gets the template for headers |
| [`Opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_Opacity) | double | 1 | Sets and gets the opacity in the level leaf item |
| [`ShowHeader`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_ShowHeader) | bool | true | Shows or hides the header in level leaf item |
| [`TemplatePosition`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLevel.html#Syncfusion_EJ2_TreeMap_TreeMapLevel_TemplatePosition) | [`LabelPosition`](#labelposition-enumeration) | LabelPosition.TopLeft | Sets and gets the template position |

---

## TreeMapLegendSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapLegendSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html)

Configures legend display and behavior.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Alignment`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_Alignment) | [`Alignment`](#alignment-enumeration) | Alignment.Center | Sets and gets the alignment of legend |
| [`Background`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_Background) | string | "transparent" | Sets and gets the background color of legend |
| [`Border`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_Border) | [`TreeMapBorder`](#treemapborder-class) | null | Sets and gets the border of legend |
| [`Fill`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_Fill) | string | null | Sets and gets the fill color of legend |
| [`Height`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_Height) | string | "" | Sets and gets the height of the legend |
| [`ImageUrl`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_ImageUrl) | string | null | Sets and gets the URL path of the legend shapes |
| [`InvertedPointer`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_InvertedPointer) | bool | false | Enables or disables the pointer for interactive legend |
| [`LabelDisplayMode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_LabelDisplayMode) | [`LabelIntersectAction`](#labelintersectaction-enumeration) | LabelIntersectAction.None | Sets and gets the action when labels intersect |
| [`LabelPosition`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_LabelPosition) | [`LabelPlacement`](#labelplacement-enumeration) | LabelPlacement.After | Sets and gets the label position for interactive legend |
| [`Location`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_Location) | object | null | Sets and gets the location to place the legend in a custom location |
| [`Mode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_Mode) | [`LegendMode`](#legendmode-enumeration) | LegendMode.Default | Sets and gets the rendering mode of the legend |
| [`Opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_Opacity) | double | 1 | Sets and gets the opacity of the legend |
| [`Orientation`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_Orientation) | [`LegendOrientation`](#legendorientation-enumeration) | LegendOrientation.None | Sets and gets the orientation of the legend |
| [`Position`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_Position) | [`LegendPosition`](#legendposition-enumeration) | LegendPosition.Bottom | Sets and gets the position of the legend |
| [`RemoveDuplicateLegend`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_RemoveDuplicateLegend) | bool | false | Enables or disables removal of duplicate legend items |
| [`Shape`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_Shape) | [`LegendShape`](#legendshape-enumeration) | LegendShape.Circle | Sets and gets the shape of legend items |
| [`ShapeBorder`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_ShapeBorder) | [`TreeMapBorder`](#treemapborder-class) | null | Sets and gets the border of the legend shape |
| [`ShapeHeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_ShapeHeight) | double | 15 | Sets and gets the height of the shapes of legend |
| [`ShapePadding`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_ShapePadding) | double | 10 | Sets and gets the shape padding of legend |
| [`ShapeWidth`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_ShapeWidth) | double | 15 | Sets and gets the width of the shapes in legend |
| [`ShowLegendPath`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_ShowLegendPath) | string | null | Sets and gets the value path for the visibility state of legend item |
| [`TextStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_TextStyle) | [`TreeMapFont`](#treemapfont-class) | null | Sets and gets the text style of legend |
| [`Title`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_Title) | [`TreeMapCommonTitleSettings`](#treemapcommontitlesettings-class) | null | Sets and gets the title for the legend |
| [`TitleStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_TitleStyle) | [`TreeMapFont`](#treemapfont-class) | null | Sets and gets the title style of legend |
| [`ValuePath`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_ValuePath) | string | null | Sets and gets the value path from the data source for legend |
| [`Visible`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_Visible) | bool | false | Sets and gets the visibility of the legend |
| [`Width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapLegendSettings.html#Syncfusion_EJ2_TreeMap_TreeMapLegendSettings_Width) | string | "" | Sets and gets the width of the legend |

---

## TreeMapCommonTitleSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapCommonTitleSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapCommonTitleSettings.html)

Configures common title settings for legend and other components.

###Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Description`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapCommonTitleSettings.html) | string | "" | Sets and gets the description of the title for accessibility |
| [`Text`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapCommonTitleSettings.html) | string | "" | Sets and gets the title text |

### Usage Example

```csharp
// In PageModel
LegendSettings = new TreeMapLegendSettings
{
    Visible = true,
    Position = LegendPosition.Bottom,
    Title = new TreeMapCommonTitleSettings
    {
        Text = "Stock Status"
    }
};
```

---

## LegendSettingsTextStyleLegendSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LegendSettingsTextStyleLegendSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsTextStyleLegendSettings.html)

Inherits from [`TreeMapFont`](#treemapfont-class). Used specifically for legend title text styling.

### Properties

Inherits all properties from `TreeMapFont`:
- `Color`, `FontFamily`, `FontStyle`, `FontWeight`, `Opacity`, `Size`

---

## TreeMapTitleSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapTitleSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTitleSettings.html)

Configures title display and formatting.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Alignment`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTitleSettings.html#Syncfusion_EJ2_TreeMap_TreeMapTitleSettings_Alignment) | [`Alignment`](#alignment-enumeration) | Alignment.Center | Sets and gets the alignment of the title |
| [`Description`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTitleSettings.html#Syncfusion_EJ2_TreeMap_TreeMapTitleSettings_Description) | string | null | Sets and gets the description of the title |
| [`SubtitleSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTitleSettings.html#Syncfusion_EJ2_TreeMap_TreeMapTitleSettings_SubtitleSettings) | [`TreeMapSubTitleSettings`](#treemapsubtitlesettings-class) | null | Sets and gets the subtitle settings |
| [`Text`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTitleSettings.html#Syncfusion_EJ2_TreeMap_TreeMapTitleSettings_Text) | string | null | Sets and gets the title text |
| [`TextStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTitleSettings.html#Syncfusion_EJ2_TreeMap_TreeMapTitleSettings_TextStyle) | [`TitleSettingsTextStyleTitleSettings`](#titlesettingstextstyletitlesettings-class) | null | Sets and gets the text style of the title |

---

## TreeMapTooltipSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapTooltipSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTooltipSettings.html)

Configures tooltip display and formatting.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Border`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTooltipSettings.html#Syncfusion_EJ2_TreeMap_TreeMapTooltipSettings_Border) | [`TooltipSettingsBorderTooltipSettings`](#tooltipsettingsbordertooltipsettings-class) | null | Sets and gets the border of tooltip |
| [`Fill`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTooltipSettings.html#Syncfusion_EJ2_TreeMap_TreeMapTooltipSettings_Fill) | string | null | Sets and gets the fill color of tooltip |
| [`Format`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTooltipSettings.html#Syncfusion_EJ2_TreeMap_TreeMapTooltipSettings_Format) | string | null | Sets and gets the format of tooltip |
| [`Opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTooltipSettings.html#Syncfusion_EJ2_TreeMap_TreeMapTooltipSettings_Opacity) | double | 1 | Sets and gets the opacity of tooltip |
| [`TextStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTooltipSettings.html#Syncfusion_EJ2_TreeMap_TreeMapTooltipSettings_TextStyle) | [`TooltipSettingsTextStyleTooltipSettings`](#tooltipsettingstextstyletooltipsettings-class) | null | Sets and gets the text style of tooltip |
| [`Visible`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTooltipSettings.html#Syncfusion_EJ2_TreeMap_TreeMapTooltipSettings_Visible) | bool | false | Sets and gets the visibility of tooltip |

---

## TreeMapHighlightSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapHighlightSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapHighlightSettings.html)

Configures highlight behavior on hover.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Border`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapHighlightSettings.html#Syncfusion_EJ2_TreeMap_TreeMapHighlightSettings_Border) | [`HighlightSettingsBorderHighlightSettings`](#highlightsettingsborderhighlightsettings-class) | null | Sets and gets the border of highlighted items |
| [`Fill`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapHighlightSettings.html#Syncfusion_EJ2_TreeMap_TreeMapHighlightSettings_Fill) | string | null | Sets and gets the fill color of highlighted items |
| [`Mode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapHighlightSettings.html#Syncfusion_EJ2_TreeMap_TreeMapHighlightSettings_Mode) | [`HighLightMode`](#highlightmode-enumeration) | HighLightMode.Child | Sets and gets the elements to be highlighted |
| [`Opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapHighlightSettings.html#Syncfusion_EJ2_TreeMap_TreeMapHighlightSettings_Opacity) | double | 1 | Sets and gets the opacity of highlighted items |

---

## TreeMapSelectionSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapSelectionSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapSelectionSettings.html)

Configures selection behavior on click.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Border`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapSelectionSettings.html#Syncfusion_EJ2_TreeMap_TreeMapSelectionSettings_Border) | [`SelectionSettingsBorderSelectionSettings`](#selectionsettingsborderselectionsettings-class) | null | Sets and gets the border of selected items |
| [`Fill`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapSelectionSettings.html#Syncfusion_EJ2_TreeMap_TreeMapSelectionSettings_Fill) | string | null | Sets and gets the fill color of selected items |
| [`Mode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapSelectionSettings.html#Syncfusion_EJ2_TreeMap_TreeMapSelectionSettings_Mode) | [`SelectionMode`](#selectionmode-enumeration) | SelectionMode.Child | Sets and gets the elements to be selected |
| [`Opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapSelectionSettings.html#Syncfusion_EJ2_TreeMap_TreeMapSelectionSettings_Opacity) | double | 1 | Sets and gets the opacity of selected items |

---

## TreeMapColorMapping Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapColorMapping`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapColorMapping.html)

Defines color mapping rules for items.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapColorMapping.html#Syncfusion_EJ2_TreeMap_TreeMapColorMapping_Color) | string | null | Sets and gets the color to apply for matching items |
| [`From`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapColorMapping.html#Syncfusion_EJ2_TreeMap_TreeMapColorMapping_From) | double | 0 | Sets and gets the start value for range mapping |
| [`Label`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapColorMapping.html#Syncfusion_EJ2_TreeMap_TreeMapColorMapping_Label) | string | null | Sets and gets the label for the mapping |
| [`MaxOpacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapColorMapping.html#Syncfusion_EJ2_TreeMap_TreeMapColorMapping_MaxOpacity) | double | 1 | Sets and gets the maximum opacity for desaturation mapping |
| [`MinOpacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapColorMapping.html#Syncfusion_EJ2_TreeMap_TreeMapColorMapping_MinOpacity) | double | 0 | Sets and gets the minimum opacity for desaturation mapping |
| [`To`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapColorMapping.html#Syncfusion_EJ2_TreeMap_TreeMapColorMapping_To) | double | 0 | Sets and gets the end value for range mapping |
| [`Value`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapColorMapping.html#Syncfusion_EJ2_TreeMap_TreeMapColorMapping_Value) | string | null | Sets and gets the value to match for equal mapping |

---

## TreeMapMargin Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapMargin`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapMargin.html)

Configures margin spacing around the TreeMap.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Bottom`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapMargin.html#Syncfusion_EJ2_TreeMap_TreeMapMargin_Bottom) | double | 0 | Sets and gets the bottom margin |
| [`Left`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapMargin.html#Syncfusion_EJ2_TreeMap_TreeMapMargin_Left) | double | 0 | Sets and gets the left margin |
| [`Right`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapMargin.html#Syncfusion_EJ2_TreeMap_TreeMapMargin_Right) | double | 0 | Sets and gets the right margin |
| [`Top`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapMargin.html#Syncfusion_EJ2_TreeMap_TreeMapMargin_Top) | double | 0 | Sets and gets the top margin |

---

## TreeMapFont Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapFont`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapFont.html)

Configures font properties.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapFont.html#Syncfusion_EJ2_TreeMap_TreeMapFont_Color) | string | null | Sets and gets the font color |
| [`ContentTemplate`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapFont.html#Syncfusion_EJ2_TreeMap_TreeMapFont_ContentTemplate) | string | null | Sets and gets the content template for font |
| [`FontFamily`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapFont.html#Syncfusion_EJ2_TreeMap_TreeMapFont_FontFamily) | string | null | Sets and gets the font family |
| [`FontStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapFont.html#Syncfusion_EJ2_TreeMap_TreeMapFont_FontStyle) | string | null | Sets and gets the font style |
| [`FontWeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapFont.html#Syncfusion_EJ2_TreeMap_TreeMapFont_FontWeight) | string | null | Sets and gets the font weight |
| [`Opacity`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapFont.html#Syncfusion_EJ2_TreeMap_TreeMapFont_Opacity) | double | 1 | Sets and gets the font opacity |
| [`Size`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapFont.html#Syncfusion_EJ2_TreeMap_TreeMapFont_Size) | string | null | Sets and gets the font size |

---

## TreeMapInitialDrillSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapInitialDrillSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapInitialDrillSettings.html)

Configures the initial drill-down state.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`GroupIndex`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapInitialDrillSettings.html#Syncfusion_EJ2_TreeMap_TreeMapInitialDrillSettings_GroupIndex) | double | 0 | Sets and gets the group index for initial drill |
| [`GroupName`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapInitialDrillSettings.html#Syncfusion_EJ2_TreeMap_TreeMapInitialDrillSettings_GroupName) | string | null | Sets and gets the group name for initial drill |

---

## Supporting Border and Style Classes

### LeafItemSettingsBorderLeafItemSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LeafItemSettingsBorderLeafItemSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LeafItemSettingsBorderLeafItemSettings.html)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LeafItemSettingsBorderLeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettingsBorderLeafItemSettings_Color) | string | null | Sets and gets the border color |
| [`Width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LeafItemSettingsBorderLeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettingsBorderLeafItemSettings_Width) | double | 0 | Sets and gets the border width |

### LeafItemSettingsLabelStyleLeafItemSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LeafItemSettingsLabelStyleLeafItemSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LeafItemSettingsLabelStyleLeafItemSettings.html)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LeafItemSettingsLabelStyleLeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettingsLabelStyleLeafItemSettings_Color) | string | null | Sets and gets the text color |
| [`FontFamily`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LeafItemSettingsLabelStyleLeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettingsLabelStyleLeafItemSettings_FontFamily) | string | null | Sets and gets the font family |
| [`FontSize`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LeafItemSettingsLabelStyleLeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettingsLabelStyleLeafItemSettings_FontSize) | string | null | Sets and gets the font size |
| [`FontStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LeafItemSettingsLabelStyleLeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettingsLabelStyleLeafItemSettings_FontStyle) | string | null | Sets and gets the font style |
| [`FontWeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LeafItemSettingsLabelStyleLeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettingsLabelStyleLeafItemSettings_FontWeight) | string | null | Sets and gets the font weight |

### LegendSettingsBorderLegendSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LegendSettingsBorderLegendSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsBorderLegendSettings.html)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsBorderLegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettingsBorderLegendSettings_Color) | string | null | Sets and gets the border color |
| [`Width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsBorderLegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettingsBorderLegendSettings_Width) | double | 0 | Sets and gets the border width |

### LegendSettingsTextStyleLegendSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LegendSettingsTextStyleLegendSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsTextStyleLegendSettings.html)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsTextStyleLegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettingsTextStyleLegendSettings_Color) | string | null | Sets and gets the text color |
| [`FontFamily`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsTextStyleLegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettingsTextStyleLegendSettings_FontFamily) | string | null | Sets and gets the font family |
| [`FontSize`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsTextStyleLegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettingsTextStyleLegendSettings_FontSize) | string | null | Sets and gets the font size |
| [`FontStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsTextStyleLegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettingsTextStyleLegendSettings_FontStyle) | string | null | Sets and gets the font style |
| [`FontWeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsTextStyleLegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettingsTextStyleLegendSettings_FontWeight) | string | null | Sets and gets the font weight |

### LegendSettingsTitleStyleLegendSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LegendSettingsTitleStyleLegendSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsTitleStyleLegendSettings.html)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsTitleStyleLegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettingsTitleStyleLegendSettings_Color) | string | null | Sets and gets the text color |
| [`FontFamily`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsTitleStyleLegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettingsTitleStyleLegendSettings_FontFamily) | string | null | Sets and gets the font family |
| [`FontSize`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsTitleStyleLegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettingsTitleStyleLegendSettings_FontSize) | string | null | Sets and gets the font size |
| [`FontStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsTitleStyleLegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettingsTitleStyleLegendSettings_FontStyle) | string | null | Sets and gets the font style |
| [`FontWeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendSettingsTitleStyleLegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettingsTitleStyleLegendSettings_FontWeight) | string | null | Sets and gets the font weight |

### TitleSettingsTextStyleTitleSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TitleSettingsTextStyleTitleSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TitleSettingsTextStyleTitleSettings.html)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TitleSettingsTextStyleTitleSettings.html#Syncfusion_EJ2_TreeMap_TitleSettingsTextStyleTitleSettings_Color) | string | null | Sets and gets the text color |
| [`FontFamily`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TitleSettingsTextStyleTitleSettings.html#Syncfusion_EJ2_TreeMap_TitleSettingsTextStyleTitleSettings_FontFamily) | string | null | Sets and gets the font family |
| [`FontSize`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TitleSettingsTextStyleTitleSettings.html#Syncfusion_EJ2_TreeMap_TitleSettingsTextStyleTitleSettings_FontSize) | string | null | Sets and gets the font size |
| [`FontStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TitleSettingsTextStyleTitleSettings.html#Syncfusion_EJ2_TreeMap_TitleSettingsTextStyleTitleSettings_FontStyle) | string | null | Sets and gets the font style |
| [`FontWeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TitleSettingsTextStyleTitleSettings.html#Syncfusion_EJ2_TreeMap_TitleSettingsTextStyleTitleSettings_FontWeight) | string | null | Sets and gets the font weight |

### TooltipSettingsBorderTooltipSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TooltipSettingsBorderTooltipSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TooltipSettingsBorderTooltipSettings.html)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TooltipSettingsBorderTooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettingsBorderTooltipSettings_Color) | string | null | Sets and gets the border color |
| [`Width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TooltipSettingsBorderTooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettingsBorderTooltipSettings_Width) | double | 0 | Sets and gets the border width |

### TooltipSettingsTextStyleTooltipSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TooltipSettingsTextStyleTooltipSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TooltipSettingsTextStyleTooltipSettings.html)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TooltipSettingsTextStyleTooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettingsTextStyleTooltipSettings_Color) | string | null | Sets and gets the text color |
| [`FontFamily`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TooltipSettingsTextStyleTooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettingsTextStyleTooltipSettings_FontFamily) | string | null | Sets and gets the font family |
| [`FontSize`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TooltipSettingsTextStyleTooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettingsTextStyleTooltipSettings_FontSize) | string | null | Sets and gets the font size |
| [`FontStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TooltipSettingsTextStyleTooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettingsTextStyleTooltipSettings_FontStyle) | string | null | Sets and gets the font style |
| [`FontWeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TooltipSettingsTextStyleTooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettingsTextStyleTooltipSettings_FontWeight) | string | null | Sets and gets the font weight |

### HighlightSettingsBorderHighlightSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`HighlightSettingsBorderHighlightSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.HighlightSettingsBorderHighlightSettings.html)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.HighlightSettingsBorderHighlightSettings.html#Syncfusion_EJ2_TreeMap_HighlightSettingsBorderHighlightSettings_Color) | string | null | Sets and gets the border color |
| [`Width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.HighlightSettingsBorderHighlightSettings.html#Syncfusion_EJ2_TreeMap_HighlightSettingsBorderHighlightSettings_Width) | double | 0 | Sets and gets the border width |

### SelectionSettingsBorderSelectionSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`SelectionSettingsBorderSelectionSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.SelectionSettingsBorderSelectionSettings.html)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.SelectionSettingsBorderSelectionSettings.html#Syncfusion_EJ2_TreeMap_SelectionSettingsBorderSelectionSettings_Color) | string | null | Sets and gets the border color |
| [`Width`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.SelectionSettingsBorderSelectionSettings.html#Syncfusion_EJ2_TreeMap_SelectionSettingsBorderSelectionSettings_Width) | double | 0 | Sets and gets the border width |

### TreeMapSubTitleSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapSubTitleSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapSubTitleSettings.html)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Alignment`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapSubTitleSettings.html#Syncfusion_EJ2_TreeMap_TreeMapSubTitleSettings_Alignment) | [`Alignment`](#alignment-enumeration) | Alignment.Center | Sets and gets the subtitle alignment |
| [`Description`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapSubTitleSettings.html#Syncfusion_EJ2_TreeMap_TreeMapSubTitleSettings_Description) | string | null | Sets and gets the subtitle description |
| [`Text`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapSubTitleSettings.html#Syncfusion_EJ2_TreeMap_TreeMapSubTitleSettings_Text) | string | null | Sets and gets the subtitle text |
| [`TextStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapSubTitleSettings.html#Syncfusion_EJ2_TreeMap_TreeMapSubTitleSettings_TextStyle) | [`SubTitleSettingsTextStyleSubtitleSettings`](#subtitlesettingstextstylesubtitlesettings-class) | null | Sets and gets the subtitle text style |

### SubTitleSettingsTextStyleSubtitleSettings Class

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`SubTitleSettingsTextStyleSubtitleSettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.SubTitleSettingsTextStyleSubtitleSettings.html)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [`Color`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.SubTitleSettingsTextStyleSubtitleSettings.html#Syncfusion_EJ2_TreeMap_SubTitleSettingsTextStyleSubtitleSettings_Color) | string | null | Sets and gets the text color |
| [`FontFamily`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.SubTitleSettingsTextStyleSubtitleSettings.html#Syncfusion_EJ2_TreeMap_SubTitleSettingsTextStyleSubtitleSettings_FontFamily) | string | null | Sets and gets the font family |
| [`FontSize`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.SubTitleSettingsTextStyleSubtitleSettings.html#Syncfusion_EJ2_TreeMap_SubTitleSettingsTextStyleSubtitleSettings_FontSize) | string | null | Sets and gets the font size |
| [`FontStyle`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.SubTitleSettingsTextStyleSubtitleSettings.html#Syncfusion_EJ2_TreeMap_SubTitleSettingsTextStyleSubtitleSettings_FontStyle) | string | null | Sets and gets the font style |
| [`FontWeight`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.SubTitleSettingsTextStyleSubtitleSettings.html#Syncfusion_EJ2_TreeMap_SubTitleSettingsTextStyleSubtitleSettings_FontWeight) | string | null | Sets and gets the font weight |

---

## Enumerations

### LayoutMode Enumeration

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LayoutMode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LayoutMode.html)

Specifies the layout rendering mode of the treemap.

| Value | Description |
|-------|-------------|
| `Squarified` | Rectangle items are arranged as squares |
| `SliceAndDiceVertical` | Items are arranged in vertical slices |
| `SliceAndDiceHorizontal` | Items are arranged in horizontal slices |
| `SliceAndDiceAuto` | Items are automatically arranged in either vertical or horizontal slices |

### RenderingMode Enumeration

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`RenderingMode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.RenderingMode.html)

Defines the rendering directions to render the treemap items.

| Value | Description |
|-------|-------------|
| `TopLeftBottomRight` | Rendering from top-left to bottom-right |
| `BottomRightTopLeft` | Rendering from bottom-right to top-left |
| `BottomLeftTopRight` | Rendering from bottom-left to top-right |
| `TopRightBottomLeft` | Rendering from top-right to bottom-left |

### LegendMode Enumeration

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LegendMode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendMode.html)

Defines the modes for rendering the legend.

| Value | Description |
|-------|-------------|
| `Default` | Default legend mode |
| `Interactive` | Interactive legend mode with click events |

### LegendOrientation Enumeration

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LegendOrientation`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendOrientation.html)

Specifies the orientation of the legend in the treemap.

| Value | Description |
|-------|-------------|
| `Vertical` | Vertical legend orientation |
| `Horizontal` | Horizontal legend orientation |

### LegendPosition Enumeration

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LegendPosition`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendPosition.html)

Defines the position of the legend in the treemap.

| Value | Description |
|-------|-------------|
| `Top` | Legend positioned at the top |
| `Bottom` | Legend positioned at the bottom |
| `Left` | Legend positioned at the left |
| `Right` | Legend positioned at the right |
| `TopLeft` | Legend positioned at the top-left |
| `TopRight` | Legend positioned at the top-right |
| `BottomLeft` | Legend positioned at the bottom-left |
| `BottomRight` | Legend positioned at the bottom-right |

### LegendShape Enumeration

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LegendShape`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LegendShape.html)

Defines the shape of legend item in the treemap.

| Value | Description |
|-------|-------------|
| `Rectangle` | Rectangle shape |
| `Circle` | Circle shape |
| `Cross` | Cross shape |
| `Diamond` | Diamond shape |
| `Star` | Star shape |
| `Triangle` | Triangle shape |
| `InvertedTriangle` | Inverted triangle shape |

### Alignment Enumeration

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`Alignment`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.Alignment.html)

Specifies the alignment of the elements in the treemap.

| Value | Description |
|-------|-------------|
| `Near` | Align near |
| `Center` | Center alignment |
| `Far` | Align far |

### LabelPosition Enumeration

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LabelPosition`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LabelPosition.html)

Defines the position of the label in treemap leaf node.

| Value | Description |
|-------|-------------|
| `TopLeft` | Top-left position |
| `TopCenter` | Top-center position |
| `TopRight` | Top-right position |
| `CenterLeft` | Center-left position |
| `Center` | Center position |
| `CenterRight` | Center-right position |
| `BottomLeft` | Bottom-left position |
| `BottomCenter` | Bottom-center position |
| `BottomRight` | Bottom-right position |

### LabelAlignment Enumeration

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LabelAlignment`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LabelAlignment.html)

Defines the action of the label to be placed within the defined margins.

| Value | Description |
|-------|-------------|
| `Near` | Align label near |
| `Center` | Center label alignment |
| `Far` | Align label far |

### LabelPlacement Enumeration

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LabelPlacement`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LabelPlacement.html)

Defines the placement type of the label.

| Value | Description |
|-------|-------------|
| `Inside` | Label placed inside |
| `Outside` | Label placed outside |

### LabelIntersectAction Enumeration

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`LabelIntersectAction`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.LabelIntersectAction.html)

Defines the action to perform when the labels intersect each other.

| Value | Description |
|-------|-------------|
| `None` | No action performed |
| `Hide` | Hide the intersecting labels |
| `Trim` | Trim the intersecting labels |
| `Rotate45` | Rotate labels by 45 degrees |
| `WrapByWord` | Wrap labels by word |

### HighLightMode Enumeration

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`HighLightMode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.HighLightMode.html)

Specifies the element which must be highlighted when mouse over is performed in treemap.

| Value | Description |
|-------|-------------|
| `Child` | Highlight child items |
| `Parent` | Highlight parent items |
| `All` | Highlight all items |

### SelectionMode Enumeration

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`SelectionMode`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.SelectionMode.html)

Specifies the element which must be selected when click event is performed in treemap.

| Value | Description |
|-------|-------------|
| `Child` | Select child items |
| `Parent` | Select parent items |
| `All` | Select all items |

### TreeMapTheme Enumeration

**Namespace:** [`Syncfusion.EJ2.TreeMap`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)

**API Reference:** [`TreeMapTheme`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.TreeMapTheme.html)

Defines the theme supported for treemap.

| Value | Description |
|-------|-------------|
| `Material` | Material theme |
| `MaterialDark` | Material dark theme |
| `Fabric` | Fabric theme |
| `FabricDark` | Fabric dark theme |
| `Bootstrap` | Bootstrap theme |
| `BootstrapDark` | Bootstrap dark theme |
| `HighContrast` | High contrast theme |
| `BootstrapV4` | Bootstrap v4 theme |
| `BootstrapV4Dark` | Bootstrap v4 dark theme |
| `TailwindDark` | Tailwind dark theme |
| `Fluent` | Fluent theme |
| `FluentDark` | Fluent dark theme |

---

## Usage Examples

### Example 1: Basic TreeMap with Hierarchical Data

```csharp
@page
@using Syncfusion.EJ2.TreeMap

@{
    List<TreeMapData> data = new List<TreeMapData>
    {
        new TreeMapData { Name = "Electronics", Category = "Tech", Sales = 5000 },
        new TreeMapData { Name = "Furniture", Category = "Home", Sales = 3000 },
        new TreeMapData { Name = "Appliances", Category = "Home", Sales = 4000 }
    };

    ViewBag.data = data;
}

<ejs-treemap id="treemap"
             dataSource="ViewBag.data"
             weightValuePath="Sales"
             layoutType="@Syncfusion.EJ2.TreeMap.LayoutMode.Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
    <e-treemap-levels>
        <e-treemap-level groupPath="Category"
                         headerFormat="${Category}"
                         fill="#336699">
        </e-treemap-level>
    </e-treemap-levels>
</ejs-treemap>

@functions {
    public class TreeMapData
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public double Sales { get; set; }
    }
}
```

### Example 2: TreeMap with Color Mapping

```csharp
@page
@using Syncfusion.EJ2.TreeMap

@{
    List<SalesData> salesData = new List<SalesData>
    {
        new SalesData { Name = "Electronics", Category = "Tech", Sales = 4500 },
        new SalesData { Name = "Furniture", Category = "Home", Sales = 8500 },
        new SalesData { Name = "Appliances", Category = "Home", Sales = 12500 }
    };

    ViewBag.salesData = salesData;
}

<ejs-treemap id="treemap"
             dataSource="ViewBag.salesData"
             weightValuePath="Sales"
             rangeColorValuePath="Sales"
             layoutType="@Syncfusion.EJ2.TreeMap.LayoutMode.Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
        <e-leafitemsettings-colormappings>
            <e-leafitemsettings-colormapping From="0"
                                                     To="5000"
                                                     Color=@("#66BB6A")>
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping From="5000"
                                                     To="10000"
                                                     Color=@("#FDD835")>
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping From="10000"
                                                     To="15000"
                                                     Color=@("#EF5350")>
            </e-leafitemsettings-colormapping>
        </e-leafitemsettings-colormappings>
    </e-treemap-leafitemsettings>
</ejs-treemap>

@functions {
    public class SalesData
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public double Sales { get; set; }
    }
}
```

### Example 3: TreeMap with Drill-Down and Legend

```csharp
@page
@using Syncfusion.EJ2.TreeMap

@{
    List<DrillData> drillData = new List<DrillData>
    {
        new DrillData { Continent = "Asia", Country = "India", Sales = 5000 },
        new DrillData { Continent = "Asia", Country = "Japan", Sales = 4000 },
        new DrillData { Continent = "Europe", Country = "Germany", Sales = 6000 },
        new DrillData { Continent = "Europe", Country = "France", Sales = 5500 }
    };
}

<ejs-treemap id="treemap"
             dataSource="@drillData"
             weightValuePath="Sales"
             enableDrillDown="true"
             enableBreadcrumb="false"
             layoutType="@Syncfusion.EJ2.TreeMap.LayoutMode.Squarified">

    <e-treemap-leafitemsettings labelPath="Country">
    </e-treemap-leafitemsettings>

    <e-treemap-levels>
        <e-treemap-level groupPath="Continent"
                         headerFormat="${Continent}">
        </e-treemap-level>
    </e-treemap-levels>

    <e-treemap-titlesettings text="Hierarchical Drill-Down TreeMap">
    </e-treemap-titlesettings>

</ejs-treemap>

@functions {
    public class DrillData
    {
        public string Continent { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public double Sales { get; set; }
    }
}
```

---

## Related References

- [Official Syncfusion TreeMap Documentation](https://www.syncfusion.com/aspnet-core-components/treemap)
- [TreeMap API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.TreeMap.html)
- [TreeMap Tutorials](https://www.syncfusion.com/aspnet-core-ui-controls/treemap)
