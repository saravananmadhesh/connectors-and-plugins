# TreeMap API Reference

Base URL: [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/)

Complete API reference for the **Syncfusion Angular TreeMap** component.

**Component:** Syncfusion Angular TreeMap  
**Selector:** `ejs-treemap`  
**Package:** `@syncfusion/ej2-angular-treemap`

> **Default value rule used below**
> - If the API explicitly provides a default value, it is shown exactly.
> - If the API does **not** explicitly provide a default value, the default is shown as `-`.

---

## Table of Contents

- [TreeMapComponent Class](#treemapcomponent-class)
- [TreeMapComponent Properties](#treemapcomponent-properties)
- [Nested Model Classes](#nested-model-classes)
  - [LevelSettingsModel Class](#levelsettingsmodel-class)
  - [LeafItemSettingsModel Class](#leafitemsettingsmodel-class)
  - [LegendSettingsModel Class](#legendsettingsmodel-class)
  - [TooltipSettingsModel Class](#tooltipsettingsmodel-class)
  - [SelectionSettingsModel Class](#selectionsettingsmodel-class)
  - [HighlightSettingsModel Class](#highlightsettingsmodel-class)
  - [ColorMappingModel Class](#colormappingmodel-class)
  - [CommonTitleSettingsModel Class](#commontitlesettingsmodel-class)
  - [TitleSettingsModel Class](#titlesettingsmodel-class)
  - [SubTitleSettingsModel Class](#subtitlesettingsmodel-class)
  - [InitialDrillSettingsModel Class](#initialdrillsettingsmodel-class)
  - [TreeMapAjax Class](#treemapajax-class)
- [Support Types](#support-types)
  - [BorderModel Class](#bordermodel-class)
  - [FontModel Class](#fontmodel-class)
  - [MarginModel Class](#marginmodel-class)
  - [Location Class](#location-class)
- [Methods](#methods)
  - [TreeMapComponent Methods](#treemapcomponent-methods)
- [Events](#events)
  - [TreeMapComponent Events](#treemapcomponent-events)
  - [Event Args Interfaces](#event-args-interfaces)
- [Enumerations](#enumerations)
  - [Alignment](#alignment)
  - [ExportType](#exporttype)
  - [LayoutMode](#layoutmode)
  - [SelectionMode](#selectionmode)
  - [LegendPosition](#legendposition)
  - [LabelPlacement](#labelplacement)
  - [TreeMapTheme](#treemaptheme)
  - [Other Enum Pages](#other-enum-pages)
- [Angular Directive Pages](#angular-directive-pages)
- [Standalone API Item Pages](#standalone-api-item-pages)

---

## TreeMapComponent Class

**Class:** `TreeMapComponent`  
**Selector:** `ejs-treemap`  
**Package:** `@syncfusion/ej2-angular-treemap`

Represents the Angular TreeMap component used to visualize both hierarchical and flat data using nested rectangles.

**Class page:**  
[Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/)

---

## TreeMapComponent Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `allowImageExport` | `boolean` | `false` | Enables or disables image export for the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#allowimageexport) |
| `allowPdfExport` | `boolean` | `false` | Enables or disables PDF export for the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#allowpdfexport) |
| `allowPrint` | `boolean` | `false` | Enables or disables printing support for the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#allowprint) |
| `background` | `string` | `null` | Sets the background color of the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#background) |
| `border` | `BorderModel` | `-` | Configures the border color and width of the TreeMap container. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#border) |
| `breadcrumbConnector` | `string` | `' - '` | Specifies the connector text shown in the header when drill-down is enabled. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#breadcrumbconnector) |
| `colorValuePath` | `string` | `null` | Specifies the data field used to assign item colors directly. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#colorvaluepath) |
| `dataSource` | `Object[] \| DataManager \| TreeMapAjax` | `null` | Defines the data source for the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#datasource) |
| `description` | `string` | `null` | Provides accessibility description text for the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#description) |
| `drillDownView` | `boolean` | `false` | Enables or disables the initial drill-down view. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#drilldownview) |
| `enableBreadcrumb` | `boolean` | `false` | Enables or disables breadcrumb text in the header during drill-down. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#enablebreadcrumb) |
| `enableDrillDown` | `boolean` | `false` | Enables or disables drill-down functionality. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#enabledrilldown) |
| `enableHtmlSanitizer` | `boolean` | `false` | Sanitizes untrusted HTML values before rendering. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#enablehtmlsanitizer) |
| `enablePersistence` | `boolean` | `false` | Enables or disables state persistence across page reloads. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#enablepersistence) |
| `enableRtl` | `boolean` | `false` | Enables or disables right-to-left rendering. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#enablertl) |
| `equalColorValuePath` | `string` | `''` | Specifies the field used when equal color mapping is applied. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#equalcolorvaluepath) |
| `format` | `string` | `null` | Applies global numeric formatting such as `C`, `N1`, or `P`. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#format) |
| `height` | `string` | `null` | Specifies the height of the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#height) |
| `highlightSettings` | `HighlightSettingsModel` | `-` | Configures highlight appearance and behavior for hovered items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#highlightsettings) |
| `initialDrillDown` | `InitialDrillSettingsModel` | `-` | Configures the initial drill-down item and group. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#initialdrilldown) |
| `layoutType` | `LayoutMode` | `'Squarified'` | Specifies the layout algorithm used to render TreeMap items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#layouttype) |
| `leafItemSettings` | `LeafItemSettingsModel` | `-` | Configures leaf labels, templates, padding, borders, and color mapping. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#leafitemsettings) |
| `legendSettings` | `LegendSettingsModel` | `-` | Configures legend visibility, position, appearance, and mode. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#legendsettings) |
| `levels` | `LevelSettingsModel[]` | `-` | Configures grouped hierarchy levels in the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#levels) |
| `locale` | `string` | `''` | Overrides the global culture and localization value for the component. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#locale) |
| `margin` | `MarginModel` | `-` | Configures the margin around the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#margin) |
| `palette` | `string[]` | `[]` | Specifies the palette colors applied to TreeMap items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#palette) |
| `query` | `Query` | `null` | Specifies the query used to select particular data when using a data manager source. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#query) |
| `rangeColorValuePath` | `string` | `''` | Specifies the field used for range-based color mapping. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#rangecolorvaluepath) |
| `renderDirection` | `RenderingMode` | `TopLeftBottomRight` | Specifies the rendering direction of TreeMap item layout. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#renderdirection) |
| `selectionSettings` | `SelectionSettingsModel` | `-` | Configures selection appearance and selection behavior. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#selectionsettings) |
| `tabIndex` | `number` | `0` | Controls focus order of the TreeMap container. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#tabindex) |
| `theme` | `TreeMapTheme` | `Material` | Specifies the built-in theme applied to the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#theme) |
| `titleSettings` | `TitleSettingsModel` | `-` | Configures the title text and title styling. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#titlesettings) |
| `tooltipSettings` | `TooltipSettingsModel` | `-` | Configures tooltip visibility, formatting, and template rendering. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#tooltipsettings) |
| `useGroupingSeparator` | `boolean` | `false` | Enables grouping separators for formatted numeric values. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#usegroupingseparator) |
| `weightValuePath` | `string` | `null` | Specifies the numeric field used to determine item size. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#weightvaluepath) |
| `width` | `string` | `null` | Specifies the width of the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#width) |

---

## Nested Model Classes

## LevelSettingsModel Class

**Class:** `LevelSettingsModel`  
**Description:** Configures grouped hierarchy levels in the TreeMap.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `autoFill` | `boolean` | `false` | Automatically fills level items using the TreeMap palette. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#autofill) |
| `border` | `BorderModel` | `-` | Configures the border color and width of level items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#border) |
| `colorMapping` | `ColorMappingModel[]` | `-` | Configures color mapping rules for level items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#colormapping) |
| `fill` | `string` | `null` | Sets the fill color of the level item. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#fill) |
| `groupGap` | `number` | `0` | Specifies the gap between grouped level items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#groupgap) |
| `groupPadding` | `number` | `10` | Specifies padding inside grouped level items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#grouppadding) |
| `groupPath` | `string` | `null` | Specifies the field used to group items at this level. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#grouppath) |
| `headerAlignment` | `Alignment` | `'Near'` | Aligns the header text inside the group header area. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#headeralignment) |
| `headerFormat` | `string` | `null` | Formats the header text using field placeholders. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#headerformat) |
| `headerHeight` | `number` | `20` | Specifies the height of the group header. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#headerheight) |
| `headerStyle` | `FontModel` | `-` | Configures header text styling. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#headerstyle) |
| `headerTemplate` | `string \| Function` | `null` | Renders a custom template for the group header. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#headertemplate) |
| `opacity` | `number` | `1` | Specifies the opacity of level items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#opacity) |
| `showHeader` | `boolean` | `true` | Shows or hides the group header. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#showheader) |
| `templatePosition` | `LabelPosition` | `'TopLeft'` | Places the header template content inside the level item. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/levelsettingsmodel#templateposition) |

---

## LeafItemSettingsModel Class

**Class:** `LeafItemSettingsModel`  
**Description:** Configures leaf node appearance, labels, templates, color mapping, and spacing.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `autoFill` | `boolean` | `false` | Automatically fills leaf items using the TreeMap palette. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#autofill) |
| `border` | `BorderModel` | `-` | Configures the border of leaf items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#border) |
| `colorMapping` | `ColorMappingModel[]` | `-` | Configures color mapping rules for leaf items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#colormapping) |
| `fill` | `string` | `null` | Sets the fill color of leaf items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#fill) |
| `gap` | `number` | `0` | Specifies the gap between leaf items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#gap) |
| `interSectAction` | `LabelIntersectAction` | `'Trim'` | Controls how labels behave when they do not fit. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#intersectaction) |
| `labelFormat` | `string` | `null` | Formats label text using field placeholders. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#labelformat) |
| `labelPath` | `string` | `null` | Specifies the field used as the leaf label text. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#labelpath) |
| `labelPosition` | `LabelPosition` | `'TopLeft'` | Positions the label inside the leaf item. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#labelposition) |
| `labelStyle` | `FontModel` | `-` | Configures the style of the label text. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#labelstyle) |
| `labelTemplate` | `string \| Function` | `null` | Renders a custom label template. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#labeltemplate) |
| `opacity` | `number` | `1` | Specifies the opacity of leaf items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#opacity) |
| `padding` | `number` | `10` | Specifies padding inside each leaf item. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#padding) |
| `showLabels` | `boolean` | `true` | Shows or hides leaf labels. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#showlabels) |
| `templatePosition` | `LabelPosition` | `'Center'` | Positions the label template content inside the leaf item. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/leafitemsettingsmodel#templateposition) |

---

## LegendSettingsModel Class

**Class:** `LegendSettingsModel`  
**Description:** Configures legend layout, style, mode, and rendering behavior.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `alignment` | `Alignment` | `'Center'` | Aligns legend items within the legend area. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#alignment) |
| `background` | `string` | `'transparent'` | Specifies the background color of the legend. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#background) |
| `border` | `BorderModel` | `-` | Configures the border of the legend container. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#border) |
| `fill` | `string` | `null` | Specifies the fill color of the legend shape. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#fill) |
| `height` | `string` | `''` | Specifies the height of the legend. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#height) |
| `imageUrl` | `string` | `null` | Specifies the image path when the legend shape is rendered as an image. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#imageurl) |
| `invertedPointer` | `boolean` | `false` | Enables or disables the inverted pointer for interactive legends. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#invertedpointer) |
| `labelDisplayMode` | `LabelIntersectAction` | `'None'` | Controls legend label behavior when labels overlap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#labeldisplaymode) |
| `labelPosition` | `LabelPlacement` | `'After'` | Specifies legend label placement relative to the legend shape. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#labelposition) |
| `location` | `Location` | `-` | Places the legend at a custom location. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#location) |
| `mode` | `LegendMode` | `'Default'` | Sets the legend mode to default or interactive. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#mode) |
| `opacity` | `number` | `1` | Specifies the opacity of the legend. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#opacity) |
| `orientation` | `LegendOrientation` | `'None'` | Specifies legend orientation. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#orientation) |
| `position` | `LegendPosition` | `'Bottom'` | Specifies where the legend is placed. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#position) |
| `removeDuplicateLegend` | `boolean` | `false` | Removes duplicate legend items when enabled. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#removeduplicatelegend) |
| `shape` | `LegendShape` | `'Circle'` | Specifies the legend shape. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#shape) |
| `shapeBorder` | `BorderModel` | `-` | Configures the border of the legend shape. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#shapeborder) |
| `shapeHeight` | `number` | `15` | Specifies the height of legend shapes. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#shapeheight) |
| `shapePadding` | `number` | `10` | Specifies spacing between shape and text. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#shapepadding) |
| `shapeWidth` | `number` | `15` | Specifies the width of legend shapes. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#shapewidth) |
| `showLegendPath` | `string` | `null` | Specifies the field controlling legend item visibility. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#showlegendpath) |
| `textStyle` | `FontModel` | `-` | Configures legend text style. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#textstyle) |
| `title` | `CommonTitleSettingsModel` | `-` | Configures the legend title. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#title) |
| `titleStyle` | `FontModel` | `-` | Configures the legend title text style. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#titlestyle) |
| `valuePath` | `string` | `null` | Specifies the field used to render legend values. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#valuepath) |
| `visible` | `boolean` | `-` | Shows or hides the legend. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#visible) |
| `width` | `string` | `-` | Specifies the width of the legend. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendsettingsmodel#width) |

---

## TooltipSettingsModel Class

**Class:** `TooltipSettingsModel`  
**Description:** Configures tooltip appearance, visibility, formatting, and template rendering.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/tooltipsettingsmodel)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `border` | `BorderModel` | `-` | Configures the border color and width of the tooltip. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/tooltipsettingsmodel#border) |
| `fill` | `string` | `null` | Specifies the tooltip background color. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/tooltipsettingsmodel#fill) |
| `format` | `string` | `null` | Formats tooltip text using field placeholders. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/tooltipsettingsmodel#format) |
| `opacity` | `number` | `0.75` | Specifies tooltip opacity. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/tooltipsettingsmodel#opacity) |
| `template` | `string \| Function` | `''` | Renders custom tooltip content. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/tooltipsettingsmodel#template) |
| `textStyle` | `FontModel` | `-` | Configures tooltip text style. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/tooltipsettingsmodel#textstyle) |
| `visible` | `boolean` | `false` | Shows or hides the tooltip. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/tooltipsettingsmodel#visible) |

---

## SelectionSettingsModel Class

**Class:** `SelectionSettingsModel`  
**Description:** Configures selection behavior and visual style for selected items.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/selectionsettingsmodel)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `border` | `BorderModel` | `-` | Configures the border of selected items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/selectionsettingsmodel#border) |
| `enable` | `boolean` | `false` | Enables or disables selection. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/selectionsettingsmodel#enable) |
| `fill` | `string` | `null` | Sets the fill color of selected items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/selectionsettingsmodel#fill) |
| `mode` | `SelectionMode` | `'Item'` | Specifies which element type is selected when the user interacts with the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/selectionsettingsmodel#mode) |
| `opacity` | `string` | `'0.5'` | Specifies the opacity of the selection overlay. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/selectionsettingsmodel#opacity) |

---

## HighlightSettingsModel Class

**Class:** `HighlightSettingsModel`  
**Description:** Configures hover highlight behavior and visual style.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/highlightsettingsmodel)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `border` | `BorderModel` | `-` | Configures the border of highlighted items. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/highlightsettingsmodel#border) |
| `enable` | `boolean` | `false` | Enables or disables item highlight on hover. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/highlightsettingsmodel#enable) |
| `fill` | `string` | `'#808080'` | Sets the highlight fill color. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/highlightsettingsmodel#fill) |
| `mode` | `HighLightMode` | `'Item'` | Specifies which element type is highlighted. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/highlightsettingsmodel#mode) |
| `opacity` | `string` | `'0.5'` | Specifies the opacity of the highlight overlay. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/highlightsettingsmodel#opacity) |

---

## ColorMappingModel Class

**Class:** `ColorMappingModel`  
**Description:** Configures TreeMap color mapping rules for leaf items or grouped level items.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/colormappingmodel)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `color` | `string \| string[]` | `-` | Sets the color for the color-mapping in TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/colormappingmodel#color) |
| `from` | `number` | `-` | Sets the value from which the range of color mapping starts. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/colormappingmodel#from) |
| `label` | `string` | `-` | Sets the legend label text when the legend is rendered based on color mapping. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/colormappingmodel#label) |
| `maxOpacity` | `number` | `-` | Sets the maximum opacity for the color-mapping. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/colormappingmodel#maxopacity) |
| `minOpacity` | `number` | `-` | Sets the minimum opacity for the color-mapping. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/colormappingmodel#minopacity) |
| `showLegend` | `boolean` | `-` | Enables or disables legend visibility for the color mapping. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/colormappingmodel#showlegend) |
| `to` | `number` | `-` | Sets the value to which the range of color mapping ends. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/colormappingmodel#to) |
| `value` | `string \| number` | `-` | Sets the discrete value for equal color-mapping from the data source. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/colormappingmodel#value) |

---

## CommonTitleSettingsModel Class

**Class:** `CommonTitleSettingsModel`  
**Description:** Shared title model used by TreeMap title-related configurations.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/commontitlesettingsmodel)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `description` | `string` | `-` | Defines the accessibility description for the title. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/commontitlesettingsmodel#description) |
| `text` | `string` | `-` | Sets the title text. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/commontitlesettingsmodel#text) |

---

## TitleSettingsModel Class

**Class:** `TitleSettingsModel`  
**Description:** Configures the TreeMap title.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/titlesettingsmodel)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `alignment` | `Alignment` | `-` | Sets the text position of the title text in the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/titlesettingsmodel#alignment) |
| `description` | `string` | `-` | Defines the accessibility description of the title. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/titlesettingsmodel#description) |
| `subtitleSettings` | `SubTitleSettingsModel` | `-` | Configures the subtitle for the TreeMap title. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/titlesettingsmodel#subtitlesettings) |
| `text` | `string` | `-` | Sets the title text. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/titlesettingsmodel#text) |
| `textStyle` | `FontModel` | `-` | Configures the title text style. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/titlesettingsmodel#textstyle) |

---

## SubTitleSettingsModel Class

**Class:** `SubTitleSettingsModel`  
**Description:** Configures the TreeMap subtitle.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/subtitlesettingsmodel)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `alignment` | `Alignment` | `-` | Sets the alignment of the subtitle text in the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/subtitlesettingsmodel#alignment) |
| `description` | `string` | `-` | Defines the accessibility description of the subtitle. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/subtitlesettingsmodel#description) |
| `text` | `string` | `-` | Sets the subtitle text. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/subtitlesettingsmodel#text) |
| `textStyle` | `FontModel` | `-` | Configures the subtitle text style. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/subtitlesettingsmodel#textstyle) |

---

## InitialDrillSettingsModel Class

**Class:** `InitialDrillSettingsModel`  
**Description:** Configures the initial drill-down target rendered on first load.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/initialdrillsettingsmodel)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `groupIndex` | `number` | `-` | Sets the initial rendering level index in the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/initialdrillsettingsmodel#groupindex) |
| `groupName` | `string` | `-` | Sets the initial rendering level name in the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/initialdrillsettingsmodel#groupname) |

---

## TreeMapAjax Class

**Class:** `TreeMapAjax`  
**Description:** Specifies the data to be received through Ajax request for TreeMap.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapajax)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `async` | `boolean` | `-` | Specifies whether the request is asynchronous. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapajax#async) |
| `contentType` | `string` | `-` | Defines the content type of the request. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapajax#contenttype) |
| `dataOptions` | `string \| any` | `-` | Defines the data options for the TreeMap request. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapajax#dataoptions) |
| `sendData` | `string \| any` | `-` | Defines the data to be sent through the request. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapajax#senddata) |
| `type` | `string` | `-` | Defines the type of data/request. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapajax#type) |

---

## Support Types

## BorderModel Class

**Class:** `BorderModel`  
**Description:** Reusable border model used across TreeMap API objects.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/bordermodel)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `color` | `string` | `-` | Sets the border color. Accepts valid CSS colors including hex and rgba strings. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/bordermodel#color) |
| `width` | `number` | `-` | Defines the width of the border in the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/bordermodel#width) |

---

## FontModel Class

**Class:** `FontModel`  
**Description:** Reusable text style model used across TreeMap title, legend, tooltip, label, and header settings.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/fontmodel)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `color` | `string` | `-` | Sets the text color. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/fontmodel#color) |
| `fontFamily` | `string` | `-` | Sets the font family. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/fontmodel#fontfamily) |
| `fontStyle` | `string` | `-` | Sets the font style. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/fontmodel#fontstyle) |
| `fontWeight` | `string` | `-` | Sets the font weight. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/fontmodel#fontweight) |
| `opacity` | `number` | `-` | Sets the text opacity. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/fontmodel#opacity) |
| `size` | `string` | `-` | Sets the font size. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/fontmodel#size) |

---

## MarginModel Class

**Class:** `MarginModel`  
**Description:** Reusable margin model used by the TreeMap container.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/marginmodel)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `bottom` | `number` | `-` | Sets the bottom margin for the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/marginmodel#bottom) |
| `left` | `number` | `-` | Sets the left margin for the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/marginmodel#left) |
| `right` | `number` | `-` | Sets the right margin for the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/marginmodel#right) |
| `top` | `number` | `-` | Sets the top margin for the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/marginmodel#top) |

---

## Location Class

**Class:** `Location`  
**Description:** Specifies X/Y location parameters used by custom legend positioning.  
**Class page:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/location)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `x` | `number` | `-` | Defines the horizontal position. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/location#x) |
| `y` | `number` | `-` | Defines the vertical position. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/location#y) |

---

## Methods

## TreeMapComponent Methods

| Name | Return Type | Description | Direct Link |
|------|-------------|-------------|-------------|
| `destroy()` | `void` | Destroys the TreeMap instance and removes its behavior. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#destroy) |
| `doubleClickOnTreeMap(e)` | `void` | Handles the double-click event in the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#doubleclickontreemap) |
| `export(type, fileName, orientation?, allowDownload?)` | `Promise` | Exports the TreeMap to image or PDF formats. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#export) |
| `print(id?)` | `void` | Prints the rendered TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#print) |
| `selectItem(levelOrder: string[], isSelected?: boolean)` | `void` | Programmatically selects or deselects a TreeMap item or group. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/#selectitem) |

## Method Usage Example

```typescript
import { Component, ViewChild, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapComponent as SyncTreeMapComponent,
  PrintService,
  ImageExportService,
  PdfExportService,
  TreeMapSelectionService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [PrintService, ImageExportService, PdfExportService, TreeMapSelectionService],
  template: `
    &lt;div class="toolbar"&gt;
      &lt;button type="button" (click)="selectLaptop()"&gt;Select Laptop&lt;/button&gt;
      &lt;button type="button" (click)="exportPNG()"&gt;Export PNG&lt;/button&gt;
      &lt;button type="button" (click)="exportPDF()"&gt;Export PDF&lt;/button&gt;
      &lt;button type="button" (click)="printTreeMap()"&gt;Print&lt;/button&gt;
      &lt;button type="button" (click)="destroyTreeMap()"&gt;Destroy&lt;/button&gt;
    &lt;/div&gt;

    &lt;ejs-treemap
      #treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Sales"
      [allowPrint]="true"
      [allowImageExport]="true"
      [allowPdfExport]="true"
      [selectionSettings]="selectionSettings"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings"&gt;
    &lt;/ejs-treemap&gt;
  `,
  styles: [`
    .toolbar {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }

    #treemap-container {
      display: block;
      width: 100%;
      height: 520px;
    }
  `]
})
export class TreeMapComponent {
  @ViewChild('treemap')
  public treemap?: SyncTreeMapComponent;

  public data = signal([
    { Category: 'Electronics', Product: 'Laptop', Sales: 15000 },
    { Category: 'Electronics', Product: 'Phone', Sales: 12000 },
    { Category: 'Furniture', Product: 'Chair', Sales: 8000 }
  ]);

  public levels = [
    { groupPath: 'Category' }
  ];

  public selectionSettings = {
    enable: true,
    mode: 'Item',
    fill: '#dbeafe',
    border: { color: '#2563eb', width: 1 }
  };

  public leafItemSettings = {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };

  public selectLaptop(): void {
    this.treemap?.selectItem(['Electronics', 'Laptop'], true);
  }

  public exportPNG(): void {
    this.treemap?.export('PNG', 'treemap');
  }

  public exportPDF(): void {
    this.treemap?.export('PDF', 'treemap');
  }

  public printTreeMap(): void {
    this.treemap?.print();
  }

  public destroyTreeMap(): void {
    this.treemap?.destroy();
  }
}
```

---

## Events

## TreeMapComponent Events

| Name | Type | Description | Direct Link |
|------|------|-------------|-------------|
| `beforePrint` | `EmitType&lt;IPrintEventArgs&gt;` | Triggers before printing starts. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#beforeprint) |
| `click` | `EmitType&lt;IItemClickEventArgs&gt;` | Triggers after clicking on the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#click) |
| `doubleClick` | `EmitType&lt;IDoubleClickEventArgs&gt;` | Triggers after double-clicking on the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#doubleclick) |
| `drillEnd` | `EmitType&lt;IDrillEndEventArgs&gt;` | Triggers after drill-down completes. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#drillend) |
| `drillStart` | `EmitType&lt;IDrillStartEventArgs&gt;` | Triggers when drill-down starts. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#drillstart) |
| `itemClick` | `EmitType&lt;IItemClickEventArgs&gt;` | Triggers after clicking a TreeMap item. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#itemclick) |
| `itemHighlight` | `EmitType&lt;IItemHighlightEventArgs&gt;` | Triggers after highlighting an item. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#itemhighlight) |
| `itemMove` | `EmitType&lt;IItemMoveEventArgs&gt;` | Triggers after moving the pointer over an item. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#itemmove) |
| `itemRendering` | `EmitType&lt;IItemRenderingEventArgs&gt;` | Triggers before each item is rendered. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#itemrendering) |
| `itemSelected` | `EmitType&lt;IItemSelectedEventArgs&gt;` | Triggers after selecting a TreeMap item. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#itemselected) |
| `legendItemRendering` | `EmitType&lt;ILegendItemRenderingEventArgs&gt;` | Triggers before each legend item is rendered. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#legenditemrendering) |
| `legendRendering` | `EmitType&lt;ILegendRenderingEventArgs&gt;` | Triggers before the legend is rendered. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#legendrendering) |
| `load` | `EmitType&lt;ILoadEventArgs&gt;` | Triggers before the TreeMap is rendered. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#load) |
| `loaded` | `EmitType&lt;ILoadedEventArgs&gt;` | Triggers after the TreeMap is rendered. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#loaded) |
| `mouseMove` | `EmitType&lt;IMouseMoveEventArgs&gt;` | Triggers after moving the pointer over the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#mousemove) |
| `resize` | `EmitType&lt;IResizeEventArgs&gt;` | Triggers when the TreeMap is resized. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#resize) |
| `rightClick` | `EmitType&lt;IMouseMoveEventArgs&gt;` | Triggers after right-clicking on the TreeMap. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#rightclick) |
| `tooltipRendering` | `EmitType&lt;ITreeMapTooltipRenderEventArgs&gt;` | Triggers while the tooltip is being rendered. | [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemapmodel/#tooltiprendering) |

---

## Event Args Interfaces

> These are the dedicated API item pages for TreeMap event-args interfaces.

- `IClickEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/iclickeventargs)
- `IDoubleClickEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/idoubleclickeventargs)
- `IDrillEndEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/idrillendeventargs)
- `IDrillStartEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/idrillstarteventargs)
- `IItemClickEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/iitemclickeventargs)
- `IItemHighlightEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/iitemhighlighteventargs)
- `IItemMoveEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/iitemmoveeventargs)
- `IItemRenderingEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/iitemrenderingeventargs)
- `IItemSelectedEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/iitemselectedeventargs)
- `ILegendItemRenderingEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/ilegenditemrenderingeventargs)
- `ILegendRenderingEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/ilegendrenderingeventargs)
- `ILoadedEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/iloadedeventargs)
- `ILoadEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/iloadeventargs)
- `IMouseMoveEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/imousemoveeventargs)
- `IPrintEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/iprinteventargs)
- `IResizeEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/iresizeeventargs)
- `IRightClickEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/irightclickeventargs)
- `ITreeMapTooltipRenderEventArgs` — [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/itreemaptooltiprendereventargs)


## Event Usage Example

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapTooltipService,
  TreeMapLegendService,
  TreeMapSelectionService,
  TreeMapHighlightService,
  IItemClickEventArgs,
  IItemRenderingEventArgs,
  IDoubleClickEventArgs,
  IDrillStartEventArgs,
  IDrillEndEventArgs,
  IItemSelectedEventArgs,
  ILegendRenderingEventArgs,
  ILegendItemRenderingEventArgs,
  ILoadedEventArgs,
  ILoadEventArgs,
  IMouseMoveEventArgs,
  IResizeEventArgs,
  ITreeMapTooltipRenderEventArgs
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [
    TreeMapTooltipService,
    TreeMapLegendService,
    TreeMapSelectionService,
    TreeMapHighlightService
  ],
  template: `
    &lt;ejs-treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Sales"
      equalColorValuePath="Category"
      [enableDrillDown]="true"
      [legendSettings]="legendSettings"
      [tooltipSettings]="tooltipSettings"
      [selectionSettings]="selectionSettings"
      [highlightSettings]="highlightSettings"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings"
      (load)="onLoad($event)"
      (loaded)="onLoaded($event)"
      (itemRendering)="onItemRendering($event)"
      (click)="onClick($event)"
      (itemClick)="onItemClick($event)"
      (doubleClick)="onDoubleClick($event)"
      (drillStart)="onDrillStart($event)"
      (drillEnd)="onDrillEnd($event)"
      (itemSelected)="onItemSelected($event)"
      (legendRendering)="onLegendRendering($event)"
      (legendItemRendering)="onLegendItemRendering($event)"
      (mouseMove)="onMouseMove($event)"
      (itemMove)="onItemMove($event)"
      (itemHighlight)="onItemHighlight($event)"
      (rightClick)="onRightClick($event)"
      (tooltipRendering)="onTooltipRendering($event)"
      (resize)="onResize($event)"&gt;
    &lt;/ejs-treemap&gt;

    &lt;div class="event-log"&gt;
      &lt;h3&gt;Last Event&lt;/h3&gt;
      &lt;p&gt;{{ lastEvent() }}&lt;/p&gt;
    &lt;/div&gt;
  `,
  styles: [`
    #treemap-container {
      display: block;
      width: 100%;
      height: 520px;
    }

    .event-log {
      margin-top: 12px;
      padding: 12px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: #f9fafb;
    }
  `]
})
export class TreeMapComponent {
  public data = signal([
    { Category: 'Electronics', Product: 'Laptop', Sales: 15000 },
    { Category: 'Electronics', Product: 'Phone', Sales: 12000 },
    { Category: 'Furniture', Product: 'Chair', Sales: 8000 },
    { Category: 'Clothing', Product: 'Shirt', Sales: 5000 }
  ]);

  public levels = [{ groupPath: 'Category' }];

  public leafItemSettings = {
    labelPath: 'Product',
    colorMapping: [
      { value: 'Electronics', color: '#2563eb', label: 'Electronics' },
      { value: 'Furniture', color: '#16a34a', label: 'Furniture' },
      { value: 'Clothing', color: '#ea580c', label: 'Clothing' }
    ]
  };

  public legendSettings = {
    visible: true
  };

  public tooltipSettings = {
    visible: true,
    format: '${Product}: ${Sales}'
  };

  public selectionSettings = {
    enable: true,
    mode: 'Item',
    fill: '#dbeafe',
    border: { color: '#2563eb', width: 1 }
  };

  public highlightSettings = {
    enable: true,
    fill: '#fde68a',
    border: { color: '#d97706', width: 1 }
  };

  public lastEvent = signal('No event yet.');

  public onLoad(args: ILoadEventArgs): void {
    this.lastEvent.set('load');
    console.log('load', args);
  }

  public onLoaded(args: ILoadedEventArgs): void {
    this.lastEvent.set('loaded');
    console.log('loaded', args);
  }

  public onItemRendering(args: IItemRenderingEventArgs): void {
    this.lastEvent.set('itemRendering');
    console.log('itemRendering', args);
  }

  public onClick(args: IItemClickEventArgs): void {
    this.lastEvent.set('click');
    console.log('click', args);
  }

  public onItemClick(args: IItemClickEventArgs): void {
    this.lastEvent.set('itemClick');
    console.log('itemClick', args);
  }

  public onDoubleClick(args: IDoubleClickEventArgs): void {
    this.lastEvent.set('doubleClick');
    console.log('doubleClick', args);
  }

  public onDrillStart(args: IDrillStartEventArgs): void {
    this.lastEvent.set('drillStart');
    console.log('drillStart', args);
  }

  public onDrillEnd(args: IDrillEndEventArgs): void {
    this.lastEvent.set('drillEnd');
    console.log('drillEnd', args);
  }

  public onItemSelected(args: IItemSelectedEventArgs): void {
    this.lastEvent.set('itemSelected');
    console.log('itemSelected', args);
  }

  public onLegendRendering(args: ILegendRenderingEventArgs): void {
    this.lastEvent.set('legendRendering');
    console.log('legendRendering', args);
  }

  public onLegendItemRendering(args: ILegendItemRenderingEventArgs): void {
    this.lastEvent.set('legendItemRendering');
    console.log('legendItemRendering', args);
  }

  public onMouseMove(args: IMouseMoveEventArgs): void {
    this.lastEvent.set('mouseMove');
    console.log('mouseMove', args);
  }

  public onItemMove(args: any): void {
    this.lastEvent.set('itemMove');
    console.log('itemMove', args);
  }

  public onItemHighlight(args: any): void {
    this.lastEvent.set('itemHighlight');
    console.log('itemHighlight', args);
  }

  public onRightClick(args: IMouseMoveEventArgs): void {
    this.lastEvent.set('rightClick');
    console.log('rightClick', args);
  }

  public onTooltipRendering(args: ITreeMapTooltipRenderEventArgs): void {
    this.lastEvent.set('tooltipRendering');
    console.log('tooltipRendering', args);
  }

  public onResize(args: IResizeEventArgs): void {
    this.lastEvent.set('resize');
    console.log('resize', args);
  }
}

---

## Enumerations

### Alignment

Specifies the alignment of the elements in the TreeMap.

```ts
export type Alignment =
  | 'Near'
  | 'Center'
  | 'Far';
```

**Common values:**
- `Near`
- `Center`
- `Far`

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/alignment)

---

### ExportType

Specifies the export type for the TreeMap.

```ts
export type ExportType =
  | 'PNG'
  | 'JPEG'
  | 'SVG'
  | 'PDF';
```

**Common values:**
- `PNG`
- `JPEG`
- `SVG`
- `PDF`

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/exporttype)

---

### HighLightMode

Specifies the element that must be highlighted when mouse over is performed in the TreeMap.

```ts
export type HighLightMode =
  | 'Item'
  | 'Child'
  | 'Parent'
  | 'All';
```

**Common values:**
- `Item` — highlights the hovered item
- `Child` — highlights child items
- `Parent` — highlights the parent group
- `All` — highlights the full related hierarchy

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/highlightmode)

---

### LabelAlignment

Defines the action of the label to be placed within the defined margins.

```ts
export type LabelAlignment =
  | 'Trim'
  | 'Hide'
  | 'WrapByWord'
  | 'Wrap';
```

**Common values:**
- `Trim` — trims the label if it exceeds the available bounds
- `Hide` — hides the label if it exceeds the available bounds
- `WrapByWord` — wraps the label by words
- `Wrap` — wraps the label

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/labelalignment)

---

### LabelIntersectAction

Defines the action to perform when labels intersect each other in the TreeMap.

```ts
export type LabelIntersectAction =
  | 'None'
  | 'Trim'
  | 'Hide';
```

**Common values:**
- `None` — shows all labels without applying collision handling
- `Trim` — trims labels when they intersect
- `Hide` — hides labels when they intersect

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/labelintersectaction)

---

### LabelPlacement

Defines the placement type of the label.

```ts
export type LabelPlacement =
  | 'Before'
  | 'After';
```

**Common values:**
- `Before`
- `After`

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/labelplacement)

---

### LabelPosition

Defines the position of the label in the TreeMap leaf node.

```ts
export type LabelPosition =
  | 'TopLeft'
  | 'TopCenter'
  | 'TopRight'
  | 'CenterLeft'
  | 'Center'
  | 'CenterRight'
  | 'BottomLeft'
  | 'BottomCenter'
  | 'BottomRight';
```

**Common values:**
- `TopLeft`
- `TopCenter`
- `TopRight`
- `CenterLeft`
- `Center`
- `CenterRight`
- `BottomLeft`
- `BottomCenter`
- `BottomRight`

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/labelposition)

---

### LayoutMode

Specifies the layout rendering mode of the TreeMap.

```ts
export type LayoutMode =
  | 'Squarified'
  | 'SliceAndDiceHorizontal'
  | 'SliceAndDiceVertical'
  | 'SliceAndDiceAuto';
```

**Common values:**
- `Squarified` — default balanced layout
- `SliceAndDiceHorizontal` — slices items horizontally
- `SliceAndDiceVertical` — slices items vertically
- `SliceAndDiceAuto` — automatically chooses slice direction

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/layoutmode)

---

### LegendMode

Defines the modes for rendering the legend.

```ts
export type LegendMode =
  | 'Default'
  | 'Interactive';
```

**Common values:**
- `Default` — standard legend rendering
- `Interactive` — interactive legend rendering

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendmode)

---

### LegendOrientation

Specifies the orientation of the legend in the TreeMap.

```ts
export type LegendOrientation =
  | 'None'
  | 'Horizontal'
  | 'Vertical';
```

**Common values:**
- `None`
- `Horizontal`
- `Vertical`

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendorientation)

---

### LegendPosition

Controls where the legend is placed relative to the TreeMap.

```ts
export type LegendPosition =
  | 'Top'
  | 'Bottom'
  | 'Left'
  | 'Right'
  | 'Float';
```

**Common values:**
- `Top`
- `Bottom`
- `Left`
- `Right`
- `Float`

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendposition)

---

### LegendShape

Defines the shape of the legend item in the TreeMap.

```ts
export type LegendShape =
  | 'Circle'
  | 'Rectangle'
  | 'Triangle'
  | 'Diamond'
  | 'Cross'
  | 'Star'
  | 'HorizontalLine'
  | 'VerticalLine'
  | 'Pentagon'
  | 'InvertedTriangle'
  | 'Image';
```

**Common values:**
- `Circle`
- `Rectangle`
- `Triangle`
- `Diamond`
- `Cross`
- `Star`
- `HorizontalLine`
- `VerticalLine`
- `Pentagon`
- `InvertedTriangle`
- `Image`

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/legendshape)

---

### RenderingMode

Defines the rendering directions used to render TreeMap items.

```ts
export type RenderingMode =
  | 'TopRightBottomLeft'
  | 'BottomLeftTopRight'
  | 'BottomRightTopLeft'
  | 'TopLeftBottomRight';
```

**Common values:**
- `TopRightBottomLeft`
- `BottomLeftTopRight`
- `BottomRightTopLeft`
- `TopLeftBottomRight`

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/renderingmode)

---

### SelectionMode

Specifies which TreeMap element is selected when the user interacts with the component.

```ts
export type SelectionMode =
  | 'Item'
  | 'Child'
  | 'Parent'
  | 'All';
```

**Common values:**
- `Item` — selects the clicked item
- `Child` — selects child items
- `Parent` — selects the parent group
- `All` — selects the full related hierarchy

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/selectionmode)

---

### TreeMapTheme

Defines the built-in theme supported for TreeMap.

```ts
export type TreeMapTheme =
  | 'Material'
  | 'Fabric'
  | 'HighContrastLight'
  | 'Bootstrap'
  | 'MaterialDark'
  | 'FabricDark'
  | 'HighContrast'
  | 'BootstrapDark'
  | 'Bootstrap4'
  | 'Tailwind'
  | 'TailwindDark'
  | 'Tailwind3'
  | 'Tailwind3Dark'
  | 'Bootstrap5'
  | 'Bootstrap5Dark'
  | 'Fluent'
  | 'FluentDark'
  | 'Material3'
  | 'Material3Dark'
  | 'Fluent2'
  | 'Fluent2Dark'
  | 'Fluent2HighContrast';
```

**Common values:**
- `Material`
- `Fabric`
- `HighContrastLight`
- `Bootstrap`
- `MaterialDark`
- `FabricDark`
- `HighContrast`
- `BootstrapDark`
- `Bootstrap4`
- `Tailwind`
- `TailwindDark`
- `Tailwind3`
- `Tailwind3Dark`
- `Bootstrap5`
- `Bootstrap5Dark`
- `Fluent`
- `FluentDark`
- `Material3`
- `Material3Dark`
- `Fluent2`
- `Fluent2Dark`
- `Fluent2HighContrast`

**Reference:** [Link](https://ej2.syncfusion.com/angular/documentation/api/treemap/treemaptheme)