# Syncfusion ASP.NET MVC TreeMap API Reference

## Table of Contents
- [Component Properties](#component-properties)
- [Leaf Item Settings](#leaf-item-settings)
- [Levels Configuration](#levels-configuration)
- [Color Mapping](#color-mapping)
- [Legend Settings](#legend-settings)
- [Selection and Highlight Settings](#selection-and-highlight-settings)
- [Tooltip Settings](#tooltip-settings)
- [Title Settings](#title-settings)
- [Events](#events)
- [Methods](#methods)

## Component Properties

### Core Configuration Properties

**DataSource** — Collection of data objects to visualize

**Reference:** [TreeMap.DataSource](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_DataSource)

- **Type:** IEnumerable<object>
- **Default:** null
- **Description:** Gets or sets the collection of data items to be displayed in the TreeMap. Data can be flat or hierarchical.
- **Example:**
  ```razor
  .DataSource(new List<object> { new { Name = "Item", Value = 100 } })
  ```

**WeightValuePath** — Property name for rectangle area calculation

**Reference:** [TreeMap.WeightValuePath](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_WeightValuePath)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the property name to be calculated for determining the area of each rectangle.
- **Example:**
  ```razor
  .WeightValuePath("Value")
  ```

**LayoutType** — Layout algorithm for arranging rectangles

**Reference:** [TreeMap.LayoutType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_LayoutType)

- **Type:** TreemapLayoutType enum
- **Default:** TreemapLayoutType.Squarified
- **Values:** Squarified, Horizontal, Vertical, Auto
- **Description:** Gets or sets the layout type for arranging the items in the TreeMap.
- **Example:**
  ```razor
  .LayoutType(TreemapLayoutType.Squarified)
  .LayoutType(TreemapLayoutType.Horizontal)
  ```

**Height** — Height of the TreeMap container

**Reference:** [TreeMap.Height](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Height)

- **Type:** string
- **Default:** "100%"
- **Description:** Gets or sets the height of the TreeMap container.
- **Example:**
  ```razor
  .Height("500px")
  .Height("600")
  ```

**Width** — Width of the TreeMap container

**Reference:** [TreeMap.Width](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Width)

- **Type:** string
- **Default:** "100%"
- **Description:** Gets or sets the width of the TreeMap container.
- **Example:**
  ```razor
  .Width("800px")
  .Width("100%")
  ```

**Padding** — Internal padding around items

**Reference:** [TreeMap.Padding](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Padding)

- **Type:** int
- **Default:** 0
- **Description:** Gets or sets the padding between rectangles in pixels.
- **Example:**
  ```razor
  .Padding(10)
  ```

**GroupPadding** — Padding for group items

**Reference:** [TreeMap.GroupPadding](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_GroupPadding)

- **Type:** int
- **Default:** 0
- **Description:** Gets or sets the padding for group rectangles.
- **Example:**
  ```razor
  .GroupPadding(5)
  ```

**Background** — Background color

**Reference:** [TreeMap.Background](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Background)

- **Type:** string
- **Default:** "white"
- **Description:** Gets or sets the background color (hex or named color).
- **Example:**
  ```razor
  .Background("#f0f0f0")
  .Background("white")
  ```

**Border** — Border configuration

**Reference:** [TreeMap.Border](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Border)

- **Type:** TreeMapBorder
- **Properties:**
  - **Color** — Hex or named color (default: "white")
  - **Width** — Thickness in pixels (default: 0)
- **Example:**
  ```razor
  .Border(border => border.Color("#999").Width(2))
  ```

**RangeColorValuePath** — Property for range-based color mapping

**Reference:** [TreeMap.RangeColorValuePath](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_RangeColorValuePath)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the property name to be used for range color mapping.
- **Example:**
  ```razor
  .RangeColorValuePath("Revenue")
  ```

**EqualColorValuePath** — Property for equal-value color mapping

**Reference:** [TreeMap.EqualColorValuePath](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_EqualColorValuePath)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the property name to be used for equal color mapping.
- **Example:**
  ```razor
  .EqualColorValuePath("Category")
  ```

**Theme** — Visual theme

**Reference:** [TreeMap.Theme](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Theme)

- **Type:** string
- **Default:** "Material"
- **Values:** "Material", "Highcontrast"
- **Description:** Gets or sets the theme for the TreeMap.
- **Example:**
  ```razor
  .Theme("Material")
  ```

**Locale** — Language locale

**Reference:** [TreeMap.Locale](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Locale)

- **Type:** string
- **Default:** "en"
- **Description:** Gets or sets the locale for localization.
- **Example:**
  ```razor
  .Locale("en")
  .Locale("fr")
  .Locale("ar")
  ```

**EnableRtl** — Right-to-left text direction

**Reference:** [TreeMap.EnableRtl](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_EnableRtl)

- **Type:** bool
- **Default:** false
- **Description:** Gets or sets whether to render the TreeMap in right-to-left direction.
- **Example:**
  ```razor
  .EnableRtl(true)
  ```

**EnableDrillDown** — Enable drill-down navigation

**Reference:** [TreeMap.EnableDrillDown](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_EnableDrillDown)

- **Type:** bool
- **Default:** true (when multiple levels exist)
- **Description:** Gets or sets whether drill-down is enabled for hierarchical data.
- **Example:**
  ```razor
  .EnableDrillDown(true)
  ```

**IdPath** — Unique item identifier property

**Reference:** [TreeMap.IdPath](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_IdPath)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the property name for unique item identification.
- **Example:**
  ```razor
  .IdPath("ItemId")
  ```

**ParentIdPath** — Parent identifier property (for hierarchical data)

**Reference:** [TreeMap.ParentIdPath](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_ParentIdPath)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the property name for parent identification in hierarchical structures.
- **Example:**
  ```razor
  .ParentIdPath("ParentId")
  ```

**Palette** — Color palette array

**Reference:** [TreeMap.Palette](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Palette)

- **Type:** string[]
- **Default:** Material palette colors
- **Description:** Gets or sets the color palette for auto-filling colors.
- **Example:**
  ```razor
  .Palette(new string[] { "#C33764", "#AB3566", "#F3165D" })
  ```

## Leaf Item Settings

### LeafItemSettings Configuration

**Reference:** [LeafItemSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html)

**LabelPath** — Property to display as label

**Reference:** [LeafItemSettings.LabelPath](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettings_LabelPath)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the property name to be displayed as the label.
- **Example:**
  ```razor
  .LeafItemSettings(leaf => leaf.LabelPath("Name"))
  ```

**LabelFormat** — Custom label format

**Reference:** [LeafItemSettings.LabelFormat](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettings_LabelFormat)

- **Type:** string
- **Default:** null
- **Description:** Format string using ${PropertyName} syntax.
- **Example:**
  ```razor
  .LeafItemSettings(leaf => 
      leaf.LabelFormat("${Name}: ${Value}")
  )
  ```

**LabelPosition** — Label placement within rectangle

**Reference:** [LeafItemSettings.LabelPosition](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettings_LabelPosition)

- **Type:** LabelPosition enum
- **Default:** LabelPosition.Center
- **Values:** TopLeft, TopCenter, TopRight, MiddleLeft, Center, MiddleRight, BottomLeft, BottomCenter, BottomRight
- **Example:**
  ```razor
  .LeafItemSettings(leaf => leaf.LabelPosition(LabelPosition.Center))
  ```

**LabelTemplate** — Custom HTML template for labels

**Reference:** [LeafItemSettings.LabelTemplate](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettings_LabelTemplate)

- **Type:** string
- **Default:** null
- **Description:** HTML template for rendering labels.
- **Example:**
  ```razor
  .LeafItemSettings(leaf => 
      leaf.LabelTemplate("<div>${Name}</div>")
  )
  ```

**TemplatePosition** — Position for label template

**Reference:** [LeafItemSettings.TemplatePosition](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettings_TemplatePosition)

- **Type:** LabelPosition enum
- **Default:** LabelPosition.Center
- **Example:**
  ```razor
  .LeafItemSettings(leaf => leaf.TemplatePosition(LabelPosition.TopCenter))
  ```

**Gap** — Spacing around items

**Reference:** [LeafItemSettings.Gap](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettings_Gap)

- **Type:** int
- **Default:** 0
- **Description:** Gets or sets the gap/spacing between leaf items in pixels.
- **Example:**
  ```razor
  .LeafItemSettings(leaf => leaf.Gap(5))
  ```

**Visible** — Label visibility

**Reference:** [LeafItemSettings.Visible](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettings_Visible)

- **Type:** bool
- **Default:** true
- **Description:** Gets or sets whether labels are visible.
- **Example:**
  ```razor
  .LeafItemSettings(leaf => leaf.Visible(true))
  ```

**ShowLabels** — Show/hide labels

**Reference:** [LeafItemSettings.ShowLabels](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettings_ShowLabels)

- **Type:** bool
- **Default:** true
- **Description:** Gets or sets whether to show labels on leaf items.
- **Example:**
  ```razor
  .LeafItemSettings(leaf => leaf.ShowLabels(true))
  ```

**Fill** — Item background color

**Reference:** [LeafItemSettings.Fill](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettings_Fill)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the background color for leaf items.
- **Example:**
  ```razor
  .LeafItemSettings(leaf => leaf.Fill("LightBlue"))
  ```

**AutoFill** — Auto-assign colors

**Reference:** [LeafItemSettings.AutoFill](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettings_AutoFill)

- **Type:** bool
- **Default:** false
- **Description:** Gets or sets whether colors are auto-assigned based on palette.
- **Example:**
  ```razor
  .LeafItemSettings(leaf => leaf.AutoFill(true))
  ```

**Padding** — Item padding

**Reference:** [LeafItemSettings.Padding](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettings_Padding)

- **Type:** int
- **Default:** 0
- **Description:** Gets or sets the padding for leaf items.
- **Example:**
  ```razor
  .LeafItemSettings(leaf => leaf.Padding(5))
  ```

**Opacity** — Item opacity

**Reference:** [LeafItemSettings.Opacity](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettings_Opacity)

- **Type:** decimal
- **Default:** 1.0
- **Description:** Gets or sets the opacity level (0.0 to 1.0).
- **Example:**
  ```razor
  .LeafItemSettings(leaf => leaf.Opacity(0.8m))
  ```

**Border** — Item border configuration

**Reference:** [LeafItemSettings.Border](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettings_Border)

- **Type:** TreeMapBorder
- **Properties:**
  - **Color** — Border color (default: white)
  - **Width** — Border width (default: 0)
- **Example:**
  ```razor
  .LeafItemSettings(leaf => 
      leaf.Border(border => border.Color("Navy").Width(1))
  )
  ```

**TextStyle** — Font customization

**Reference:** [LeafItemSettings.TextStyle](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LeafItemSettings.html#Syncfusion_EJ2_TreeMap_LeafItemSettings_TextStyle)

- **Type:** TreeMapFont
- **Properties:**
  - **FontFamily** — Font name (default: "Segoe UI")
  - **FontSize** — Size with unit (default: "12px")
  - **FontWeight** — bold, normal, etc. (default: "normal")
  - **Color** — Text color (default: "#000000")
  - **Opacity** — Text opacity (default: 1.0)
- **Example:**
  ```razor
  .LeafItemSettings(leaf => 
      leaf.TextStyle(style => 
          style.FontSize("14px")
               .FontWeight("bold")
               .Color("#333333")
      )
  )
  ```

## Levels Configuration

### Levels Property

**Reference:** [TreeMapLevels](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html)

**GroupPath** — Property name for grouping

**Reference:** [TreeMapLevels.GroupPath](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_GroupPath)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the property name to group items at this level.
- **Example:**
  ```razor
  .Levels(levels => levels.GroupPath("Category").Add())
  ```

**GroupIdPath** — Group identifier property

**Reference:** [TreeMapLevels.GroupIdPath](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_GroupIdPath)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the property name for group identification.
- **Example:**
  ```razor
  .Levels(levels => 
      levels.GroupPath("Category")
            .GroupIdPath("CategoryId")
            .Add()
  )
  ```

**GroupColorValuePath** — Color mapping property for groups

**Reference:** [TreeMapLevels.GroupColorValuePath](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_GroupColorValuePath)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the property for color determination.
- **Example:**
  ```razor
  .Levels(levels => 
      levels.GroupColorValuePath("Performance").Add()
  )
  ```

**Fill** — Level background color

**Reference:** [TreeMapLevels.Fill](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_Fill)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the background color for this level.
- **Example:**
  ```razor
  .Levels(levels => levels.Fill("#f0f0f0").Add())
  ```

**HeaderHeight** — Header height

**Reference:** [TreeMapLevels.HeaderHeight](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_HeaderHeight)

- **Type:** int
- **Default:** 20
- **Description:** Gets or sets the height of group headers in pixels.
- **Example:**
  ```razor
  .Levels(levels => levels.HeaderHeight(25).Add())
  ```

**HeaderTemplate** — Custom header template

**Reference:** [TreeMapLevels.HeaderTemplate](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_HeaderTemplate)

- **Type:** string
- **Default:** null
- **Description:** HTML template for group headers.
- **Example:**
  ```razor
  .Levels(levels => 
      levels.HeaderTemplate("<div>${Name}</div>").Add()
  )
  ```

**HeaderFormat** — Header text format

**Reference:** [TreeMapLevels.HeaderFormat](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_HeaderFormat)

- **Type:** string
- **Default:** null
- **Description:** Format string for header text using ${PropertyName}.
- **Example:**
  ```razor
  .Levels(levels => 
      levels.HeaderFormat("${Category}").Add()
  )
  ```

**HeaderAlignment** — Header text alignment

**Reference:** [TreeMapLevels.HeaderAlignment](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_HeaderAlignment)

- **Type:** Alignment enum
- **Values:** Left, Center, Right
- **Example:**
  ```razor
  .Levels(levels => 
      levels.HeaderAlignment(Alignment.Center).Add()
  )
  ```

**HeaderStyle** — Header font configuration

**Reference:** [TreeMapLevels.HeaderStyle](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_HeaderStyle)

- **Type:** TreeMapFont
- **Properties:** FontSize, FontWeight, Color, Opacity
- **Example:**
  ```razor
  .Levels(levels => 
      levels.HeaderStyle(style =>
          style.FontSize("16px")
               .FontWeight("bold")
      ).Add()
  )
  ```

**ShowHeader** — Show/hide header

**Reference:** [TreeMapLevels.ShowHeader](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_ShowHeader)

- **Type:** bool
- **Default:** true
- **Description:** Gets or sets whether to show the group header.
- **Example:**
  ```razor
  .Levels(levels => levels.ShowHeader(true).Add())
  ```

**Border** — Border configuration

**Reference:** [TreeMapLevels.Border](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_Border)

- **Type:** TreeMapBorder
- **Example:**
  ```razor
  .Levels(levels => 
      levels.Border(b => b.Color("#999").Width(1)).Add()
  )
  ```

**GroupGap** — Gap between groups

**Reference:** [TreeMapLevels.GroupGap](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_GroupGap)

- **Type:** int
- **Default:** 0
- **Description:** Gets or sets the gap between group items.
- **Example:**
  ```razor
  .Levels(levels => levels.GroupGap(2).Add())
  ```

**GroupPadding** — Padding for groups

**Reference:** [TreeMapLevels.GroupPadding](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_GroupPadding)

- **Type:** int
- **Default:** 0
- **Description:** Gets or sets the padding inside group containers.
- **Example:**
  ```razor
  .Levels(levels => levels.GroupPadding(5).Add())
  ```

**AutoFill** — Auto-assign colors

**Reference:** [TreeMapLevels.AutoFill](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_AutoFill)

- **Type:** bool
- **Default:** false
- **Description:** Gets or sets whether to auto-assign colors from palette.
- **Example:**
  ```razor
  .Levels(levels => levels.AutoFill(true).Add())
  ```

**Opacity** — Level opacity

**Reference:** [TreeMapLevels.Opacity](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_Opacity)

- **Type:** decimal
- **Default:** 1.0
- **Description:** Gets or sets the opacity for this level.
- **Example:**
  ```razor
  .Levels(levels => levels.Opacity(0.9m).Add())
  ```

**TemplatePosition** — Template position

**Reference:** [TreeMapLevels.TemplatePosition](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMapLevels.html#Syncfusion_EJ2_TreeMap_TreeMapLevels_TemplatePosition)

- **Type:** LabelPosition enum
- **Example:**
  ```razor
  .Levels(levels => 
      levels.TemplatePosition(LabelPosition.TopCenter).Add()
  )
  ```

## Color Mapping

### ColorMapping Configuration

**Reference:** [ColorMapping](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.ColorMapping.html)

**From** — Range start value

**Reference:** [ColorMapping.From](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.ColorMapping.html#Syncfusion_EJ2_TreeMap_ColorMapping_From)

- **Type:** double
- **Default:** null
- **Description:** Gets or sets the minimum value for the range.
- **Example:**
  ```razor
  .ColorMapping(colors => colors.From(0).To(100).Color("Red").Add())
  ```

**To** — Range end value

**Reference:** [ColorMapping.To](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.ColorMapping.html#Syncfusion_EJ2_TreeMap_ColorMapping_To)

- **Type:** double
- **Default:** null
- **Description:** Gets or sets the maximum value for the range.
- **Example:**
  ```razor
  .ColorMapping(colors => colors.From(100).To(200).Color("Green").Add())
  ```

**Value** — Exact value to match (for equal mapping)

**Reference:** [ColorMapping.Value](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.ColorMapping.html#Syncfusion_EJ2_TreeMap_ColorMapping_Value)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the exact value to match for equal color mapping.
- **Example:**
  ```razor
  .ColorMapping(colors => colors.Value("Active").Color("Green").Add())
  ```

**Color** — Color to apply

**Reference:** [ColorMapping.Color](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.ColorMapping.html#Syncfusion_EJ2_TreeMap_ColorMapping_Color)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the color (hex or named color).
- **Example:**
  ```razor
  .ColorMapping(colors => colors.Color("Red").Add())
  .ColorMapping(colors => colors.Color("#FF0000").Add())
  ```

**MinOpacity** — Minimum opacity (for desaturation)

**Reference:** [ColorMapping.MinOpacity](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.ColorMapping.html#Syncfusion_EJ2_TreeMap_ColorMapping_MinOpacity)

- **Type:** decimal
- **Default:** 0.0
- **Description:** Gets or sets the minimum opacity for desaturation mapping.
- **Example:**
  ```razor
  .ColorMapping(colors => 
      colors.Color("Blue").MinOpacity(0.2m).MaxOpacity(1.0m).Add()
  )
  ```

**MaxOpacity** — Maximum opacity (for desaturation)

**Reference:** [ColorMapping.MaxOpacity](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.ColorMapping.html#Syncfusion_EJ2_TreeMap_ColorMapping_MaxOpacity)

- **Type:** decimal
- **Default:** 1.0
- **Description:** Gets or sets the maximum opacity for desaturation mapping.
- **Example:**
  ```razor
  .ColorMapping(colors => 
      colors.Color("Blue").MinOpacity(0.2m).MaxOpacity(1.0m).Add()
  )
  ```

## Legend Settings

### LegendSettings Configuration

**Reference:** [LegendSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html)

**Visible** — Legend visibility

**Reference:** [LegendSettings.Visible](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_Visible)

- **Type:** bool
- **Default:** true
- **Description:** Gets or sets whether the legend is displayed.
- **Example:**
  ```razor
  .LegendSettings(legend => legend.Visible(true))
  ```

**Position** — Legend position

**Reference:** [LegendSettings.Position](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_Position)

- **Type:** LegendPosition enum
- **Values:** Top, Bottom, Left, Right, Float
- **Default:** LegendPosition.Bottom
- **Example:**
  ```razor
  .LegendSettings(legend => legend.Position(LegendPosition.Right))
  ```

**Orientation** — Legend layout direction

**Reference:** [LegendSettings.Orientation](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_Orientation)

- **Type:** LegendOrientation enum
- **Values:** Horizontal, Vertical
- **Default:** LegendOrientation.Horizontal
- **Example:**
  ```razor
  .LegendSettings(legend => 
      legend.Orientation(LegendOrientation.Vertical)
  )
  ```

**Width** — Legend width

**Reference:** [LegendSettings.Width](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_Width)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the width (e.g., "200px", "50%").
- **Example:**
  ```razor
  .LegendSettings(legend => legend.Width("300px"))
  ```

**Height** — Legend height

**Reference:** [LegendSettings.Height](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_Height)

- **Type:** string
- **Default:** null
- **Description:** Gets or sets the height.
- **Example:**
  ```razor
  .LegendSettings(legend => legend.Height("100px"))
  ```

**Alignment** — Legend alignment

**Reference:** [LegendSettings.Alignment](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_Alignment)

- **Type:** Alignment enum
- **Values:** Left, Center, Right
- **Example:**
  ```razor
  .LegendSettings(legend => legend.Alignment(Alignment.Center))
  ```

**Mode** — Legend interaction mode

**Reference:** [LegendSettings.Mode](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_Mode)

- **Type:** LegendMode enum
- **Values:** Default, Interactive
- **Example:**
  ```razor
  .LegendSettings(legend => legend.Mode(LegendMode.Interactive))
  ```

**Title** — Legend title

**Reference:** [LegendSettings.Title](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_Title)

- **Type:** string
- **Default:** null
- **Example:**
  ```razor
  .LegendSettings(legend => legend.Title("Legend"))
  ```

**TextStyle** — Legend text font

**Reference:** [LegendSettings.TextStyle](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_TextStyle)

- **Type:** TreeMapFont
- **Example:**
  ```razor
  .LegendSettings(legend =>
      legend.TextStyle(style => 
          style.FontSize("12px").Color("#666")
      )
  )
  ```

**TitleStyle** — Title font

**Reference:** [LegendSettings.TitleStyle](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_TitleStyle)

- **Type:** TreeMapFont
- **Example:**
  ```razor
  .LegendSettings(legend =>
      legend.TitleStyle(style =>
          style.FontSize("14px").FontWeight("bold")
      )
  )
  ```

**ShapeHeight** — Legend icon height

**Reference:** [LegendSettings.ShapeHeight](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_ShapeHeight)

- **Type:** string
- **Default:** "15px"
- **Example:**
  ```razor
  .LegendSettings(legend => legend.ShapeHeight("20px"))
  ```

**ShapeWidth** — Legend icon width

**Reference:** [LegendSettings.ShapeWidth](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_ShapeWidth)

- **Type:** string
- **Default:** "15px"
- **Example:**
  ```razor
  .LegendSettings(legend => legend.ShapeWidth("20px"))
  ```

**Shape** — Legend icon shape

**Reference:** [LegendSettings.Shape](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_Shape)

- **Type:** LegendIconType enum
- **Values:** Circle, Rectangle, Triangle, Diamond
- **Default:** LegendIconType.Rectangle
- **Example:**
  ```razor
  .LegendSettings(legend => legend.Shape(LegendIconType.Circle))
  ```

**ShapeBorder** — Icon border configuration

**Reference:** [LegendSettings.ShapeBorder](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_ShapeBorder)

- **Type:** TreeMapBorder
- **Example:**
  ```razor
  .LegendSettings(legend =>
      legend.ShapeBorder(border => 
          border.Color("Black").Width(1)
      )
  )
  ```

**ShapePadding** — Icon padding

**Reference:** [LegendSettings.ShapePadding](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_ShapePadding)

- **Type:** int
- **Default:** 0
- **Example:**
  ```razor
  .LegendSettings(legend => legend.ShapePadding(10))
  ```

**LabelDisplayMode** — Label display mode

**Reference:** [LegendSettings.LabelDisplayMode](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.LegendSettings.html#Syncfusion_EJ2_TreeMap_LegendSettings_LabelDisplayMode)

- **Type:** LabelDisplayMode enum
- **Values:** All, Trim
- **Example:**
  ```razor
  .LegendSettings(legend => 
      legend.LabelDisplayMode(LabelDisplayMode.All)
  )
  ```

## Selection and Highlight Settings

### SelectionSettings Configuration

**Reference:** [SelectionSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.SelectionSettings.html)

**Enable** — Enable selection

**Reference:** [SelectionSettings.Enable](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.SelectionSettings.html#Syncfusion_EJ2_TreeMap_SelectionSettings_Enable)

- **Type:** bool
- **Default:** false
- **Example:**
  ```razor
  .SelectionSettings(selection => selection.Enable(true))
  ```

**Fill** — Selection color

**Reference:** [SelectionSettings.Fill](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.SelectionSettings.html#Syncfusion_EJ2_TreeMap_SelectionSettings_Fill)

- **Type:** string
- **Default:** null
- **Example:**
  ```razor
  .SelectionSettings(selection => selection.Fill("Blue"))
  ```

**Opacity** — Selection opacity

**Reference:** [SelectionSettings.Opacity](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.SelectionSettings.html#Syncfusion_EJ2_TreeMap_SelectionSettings_Opacity)

- **Type:** decimal
- **Default:** 1.0
- **Example:**
  ```razor
  .SelectionSettings(selection => selection.Opacity(0.7m))
  ```

**Border** — Selection border

**Reference:** [SelectionSettings.Border](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.SelectionSettings.html#Syncfusion_EJ2_TreeMap_SelectionSettings_Border)

- **Type:** TreeMapBorder
- **Example:**
  ```razor
  .SelectionSettings(selection =>
      selection.Border(b => b.Color("Navy").Width(2))
  )
  ```

### HighlightSettings Configuration

**Reference:** [HighlightSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.HighlightSettings.html)

**Enable** — Enable highlighting

**Reference:** [HighlightSettings.Enable](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.HighlightSettings.html#Syncfusion_EJ2_TreeMap_HighlightSettings_Enable)

- **Type:** bool
- **Default:** false
- **Example:**
  ```razor
  .HighlightSettings(highlight => highlight.Enable(true))
  ```

**Fill** — Highlight color

**Reference:** [HighlightSettings.Fill](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.HighlightSettings.html#Syncfusion_EJ2_TreeMap_HighlightSettings_Fill)

- **Type:** string
- **Default:** null
- **Example:**
  ```razor
  .HighlightSettings(highlight => highlight.Fill("Yellow"))
  ```

**Opacity** — Highlight opacity

**Reference:** [HighlightSettings.Opacity](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.HighlightSettings.html#Syncfusion_EJ2_TreeMap_HighlightSettings_Opacity)

- **Type:** decimal
- **Default:** 1.0
- **Example:**
  ```razor
  .HighlightSettings(highlight => highlight.Opacity(0.8m))
  ```

**Border** — Highlight border

**Reference:** [HighlightSettings.Border](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.HighlightSettings.html#Syncfusion_EJ2_TreeMap_HighlightSettings_Border)

- **Type:** TreeMapBorder
- **Example:**
  ```razor
  .HighlightSettings(highlight =>
      highlight.Border(b => b.Color("Orange").Width(1))
  )
  ```

## Tooltip Settings

### TooltipSettings Configuration

**Reference:** [TooltipSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TooltipSettings.html)

**Visible** — Tooltip visibility

**Reference:** [TooltipSettings.Visible](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettings_Visible)

- **Type:** bool
- **Default:** false
- **Example:**
  ```razor
  .Tooltip(tooltip => tooltip.Visible(true))
  ```

**Format** — Tooltip content format

**Reference:** [TooltipSettings.Format](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettings_Format)

- **Type:** string
- **Default:** null
- **Description:** Use ${PropertyName} syntax.
- **Example:**
  ```razor
  .Tooltip(tooltip => 
      tooltip.Format("<b>${Name}</b><br/>Value: ${Value}")
  )
  ```

**Template** — Custom HTML template

**Reference:** [TooltipSettings.Template](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettings_Template)

- **Type:** string
- **Default:** null
- **Example:**
  ```razor
  .Tooltip(tooltip => 
      tooltip.Template("<div class='tooltip'>${Name}</div>")
  )
  ```

**Fill** — Tooltip background color

**Reference:** [TooltipSettings.Fill](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettings_Fill)

- **Type:** string
- **Default:** "Black"
- **Example:**
  ```razor
  .Tooltip(tooltip => tooltip.Fill("#333333"))
  ```

**Opacity** — Tooltip opacity

**Reference:** [TooltipSettings.Opacity](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettings_Opacity)

- **Type:** decimal
- **Default:** 1.0
- **Example:**
  ```razor
  .Tooltip(tooltip => tooltip.Opacity(0.9m))
  ```

**Border** — Tooltip border

**Reference:** [TooltipSettings.Border](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettings_Border)

- **Type:** TreeMapBorder
- **Example:**
  ```razor
  .Tooltip(tooltip =>
      tooltip.Border(b => b.Color("White").Width(1))
  )
  ```

**TextStyle** — Tooltip text font

**Reference:** [TooltipSettings.TextStyle](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettings_TextStyle)

- **Type:** TreeMapFont
- **Example:**
  ```razor
  .Tooltip(tooltip =>
      tooltip.TextStyle(style =>
          style.FontSize("12px").Color("White")
      )
  )
  ```

**BorderWidth** — Border thickness

**Reference:** [TooltipSettings.BorderWidth](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettings_BorderWidth)

- **Type:** int
- **Default:** 0
- **Example:**
  ```razor
  .Tooltip(tooltip => tooltip.BorderWidth(1))
  ```

**BorderColor** — Border color

**Reference:** [TooltipSettings.BorderColor](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TooltipSettings.html#Syncfusion_EJ2_TreeMap_TooltipSettings_BorderColor)

- **Type:** string
- **Default:** "#000000"
- **Example:**
  ```razor
  .Tooltip(tooltip => tooltip.BorderColor("#cccccc"))
  ```

## Title Settings

### TitleSettings Configuration

**Reference:** [TitleSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TitleSettings.html)

**Text** — Title text

**Reference:** [TitleSettings.Text](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TitleSettings.html#Syncfusion_EJ2_TreeMap_TitleSettings_Text)

- **Type:** string
- **Default:** null
- **Example:**
  ```razor
  .TitleSettings(title => title.Text("TreeMap Title"))
  ```

**TextAlignment** — Title alignment

**Reference:** [TitleSettings.TextAlignment](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TitleSettings.html#Syncfusion_EJ2_TreeMap_TitleSettings_TextAlignment)

- **Type:** Alignment enum
- **Values:** Left, Center, Right
- **Example:**
  ```razor
  .TitleSettings(title => 
      title.TextAlignment(Alignment.Center)
  )
  ```

**TextStyle** — Title font

**Reference:** [TitleSettings.TextStyle](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TitleSettings.html#Syncfusion_EJ2_TreeMap_TitleSettings_TextStyle)

- **Type:** TreeMapFont
- **Example:**
  ```razor
  .TitleSettings(title =>
      title.TextStyle(style =>
          style.FontSize("18px").FontWeight("bold")
      )
  )
  ```

**Subtitle** — Subtitle text

**Reference:** [TitleSettings.Subtitle](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TitleSettings.html#Syncfusion_EJ2_TreeMap_TitleSettings_Subtitle)

- **Type:** string
- **Default:** null
- **Example:**
  ```razor
  .TitleSettings(title => 
      title.Subtitle("2024 Annual Report")
  )
  ```

**SubtitleStyle** — Subtitle font

**Reference:** [TitleSettings.SubtitleStyle](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TitleSettings.html#Syncfusion_EJ2_TreeMap_TitleSettings_SubtitleStyle)

- **Type:** TreeMapFont
- **Example:**
  ```razor
  .TitleSettings(title =>
      title.SubtitleStyle(style =>
          style.FontSize("12px").Color("#666")
      )
  )
  ```

## Events

**Reference:** [TreeMap Events](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#events)

### ItemClick Event

**Reference:** [TreeMap.ItemClick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_ItemClick)

Fires when a tree map item is clicked.

```razor
@Html.EJS().TreeMap("treemap")
    .ItemClick("onItemClick")
    .Render();

<script>
    function onItemClick(args) {
        // args.item - clicked data item
        // args.name - property name
        // args.value - property value
    }
</script>
```

### DrillStart Event

**Reference:** [TreeMap.DrillStart](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_DrillStart)

Fires when drill-down starts.

```razor
.DrillStart("onDrillStart")

function onDrillStart(args) {
    // args.item - drill item data
}
```

### DrillEnd Event

**Reference:** [TreeMap.DrillEnd](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_DrillEnd)

Fires when drill-down completes.

```razor
.DrillEnd("onDrillEnd")

function onDrillEnd(args) {
    // Drill completed
}
```

### ItemSelected Event

**Reference:** [TreeMap.ItemSelected](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_ItemSelected)

Fires when an item is selected.

```razor
.ItemSelected("onItemSelected")

function onItemSelected(args) {
    // args.item - selected item data
}
```

### Loaded Event

**Reference:** [TreeMap.Loaded](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Loaded)

Fires when TreeMap is fully loaded.

```razor
.Loaded("onLoaded")

function onLoaded(args) {
    // TreeMap initialization complete
}
```

### BeforePrint Event

**Reference:** [TreeMap.BeforePrint](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_BeforePrint)

Fires before printing.

```razor
.BeforePrint("onBeforePrint")

function onBeforePrint(args) {
    // Prepare before print
}
```

### TooltipRender Event

**Reference:** [TreeMap.TooltipRender](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_TooltipRender)

Fires when tooltip is rendered.

```razor
.TooltipRender("onTooltipRender")

function onTooltipRender(args) {
    // args.tooltip - tooltip information
}
```

## Methods

**Reference:** [TreeMap Methods](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#methods)

### Export Method

**Reference:** [TreeMap.export()](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Export)

Export TreeMap to file.

```javascript
var treemap = document.getElementById('treemap').ej2_instances[0];
treemap.export('PDF', 'TreeMap.pdf');    // Export to PDF
treemap.export('PNG', 'TreeMap.png');    // Export to PNG
treemap.export('JPEG', 'TreeMap.jpg');   // Export to JPEG
treemap.export('SVG', 'TreeMap.svg');    // Export to SVG
```

### Print Method

**Reference:** [TreeMap.print()](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Print)

Print the TreeMap.

```javascript
var treemap = document.getElementById('treemap').ej2_instances[0];
treemap.print();
```

### Refresh Method

**Reference:** [TreeMap.refresh()](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Refresh)

Refresh the TreeMap rendering.

```javascript
var treemap = document.getElementById('treemap').ej2_instances[0];
treemap.refresh();
```

### Destroy Method

**Reference:** [TreeMap.destroy()](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_Destroy)

Destroy the TreeMap instance.

```javascript
var treemap = document.getElementById('treemap').ej2_instances[0];
treemap.destroy();
```

### ResizeOnTreeMap Method

**Reference:** [TreeMap.resizeOnTreeMap()](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_ResizeOnTreeMap)

Handle resize for responsive behavior.

```javascript
var treemap = document.getElementById('treemap').ej2_instances[0];
treemap.resizeOnTreeMap();
```

### GetModuleName Method

**Reference:** [TreeMap.getModuleName()](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_GetModuleName)

Get the module name.

```javascript
var treemap = document.getElementById('treemap').ej2_instances[0];
var moduleName = treemap.getModuleName();
```

### AppendTo Method

**Reference:** [TreeMap.appendTo()](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html#Syncfusion_EJ2_TreeMap_TreeMap_AppendTo)

Render TreeMap in a container.

```javascript
var treemap = new ej.treemap.TreeMap({
    dataSource: data,
    weightValuePath: 'value'
});
treemap.appendTo('#container');
```

---

## Additional Resources

- **Official Documentation:** [Syncfusion ASP.NET MVC TreeMap](https://www.syncfusion.com/aspnet-mvc-controls/treemap)
- **API Reference Home:** [TreeMap API Documentation](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.TreeMap.TreeMap.html)
- **Getting Started Guide:** [TreeMap Setup](https://www.syncfusion.com/documentation/aspnet-mvc/treemap/getting-started/)
- **Demo Applications:** [TreeMap Demos](https://www.syncfusion.com/aspnet-mvc-demos/treemap)
- **Sample Code Repository:** [GitHub - Syncfusion ASP.NET MVC Samples](https://github.com/SyncfusionExamples/ej2-aspnetmvc-samples)

**Note:** All property names are case-sensitive. For more detailed information and examples, refer to the individual reference files in this skill.

