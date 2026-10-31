# Treemap API Reference (JavaScript)

Complete API reference for the Syncfusion JavaScript Treemap ([`@syncfusion/ej2-treemap.TreeMap`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/)) component.

- **Base API Documentation:** [TreeMap](https://ej2.syncfusion.com/javascript/documentation/api/treemap/)
- **Module:** `@syncfusion/ej2-treemap`
- **Package:** `@syncfusion/ej2-treemap`

- [Constructor](#constructor)
- [Data Source Properties](#data-source-properties)
- [Layout Configuration Properties](#layout-configuration-properties)
- [Color and Visual Properties](#color-and-visual-properties)
- [Levels and Item Configuration Properties](#levels-and-item-configuration-properties)
- [Tooltip and Legend Properties](#tooltip-and-legend-properties)
- [Selection and Highlight Properties](#selection-and-highlight-properties)
- [Drill Down Properties](#drill-down-properties)
- [Export and Print Properties](#export-and-print-properties)
- [Accessibility Properties](#accessibility-properties)
- [Internationalization Properties](#internationalization-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [TreeMap()](https://ej2.syncfusion.com/javascript/documentation/api/treemap/)
Creates a new instance of the Treemap component.

---

## Data Source Properties

- **[`dataSource`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#datasource)** (DataManager | TreeMapAjax | Object[]): Sets and gets the data source for the treemap. **Default:** null
- **[`query`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#query)** (Query): Sets and gets the query to select particular data from the shape data. This property is applicable only when the data source is created by data manager. **Default:** null
- **[`weightValuePath`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#weightvaluepath)** (string): Sets and gets the value path of the weight from the data source, based on which the treemap item is rendered. **Default:** null
- **[`colorValuePath`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#colorvaluepath)** (string): Sets and gets the value path from the data source, based on it color is filled in treemap. **Default:** null
- **[`equalColorValuePath`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#equalcolorvaluepath)** (string): Sets and gets the value path from the data source, based on it color is filled in treemap. This property is used when equal color mapping is set in the treemap. **Default:** ''
- **[`rangeColorValuePath`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#rangecolorvaluepath)** (string): Sets and gets the value path from the data source, based on it color is filled in treemap. This property is used when range color mapping is set in the treemap. **Default:** ''
- **[`palette`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#palette)** (string[]): Sets and gets a set of colors to apply in the treemap items. **Default:** []

---

## Layout Configuration Properties

- **[`layoutType`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#layouttype)** (LayoutMode): Specifies the rendering type for the layout of the treemap. **Default:** 'Squarified'
- **[`renderDirection`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#renderdirection)** (RenderingMode): Specifies the rendering direction of layout of the treemap items. **Default:** TopLeftBottomRight
- **[`height`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#height)** (string): Sets and gets the height of the treemap. **Default:** null
- **[`width`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#width)** (string): Sets and gets the width of the treemap. **Default:** null
- **[`margin`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/marginmodel)** (MarginModel): Sets and gets the options for customizing the margin in the treemap.
- **[`background`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#background)** (string): Sets and gets the background color of the treemap. **Default:** null
- **[`border`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/bordermodel)** (BorderModel): Sets and gets the options for customizing the color and width of the treemap border.

---

## Color and Visual Properties

- **[`theme`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#theme)** (TreeMapTheme): Sets and gets the theme styles supported for treemap. When the theme is set, the styles associated with the theme will be set in the treemap. **Default:** Material

---

## Levels and Item Configuration Properties

- **[`levels`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/levelsettingsmodel)** (LevelSettingsModel[]): Sets and gets the options to configure and customize the levels of treemap items.
- **[`leafItemSettings`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/leafitemsettingsmodel)** (LeafItemSettingsModel): Sets and gets the options for customizing the leaf item of the treemap.

---

## Tooltip and Legend Properties

- **[`titleSettings`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/titlesettingsmodel)** (TitleSettingsModel): Sets and gets the options for customizing the title of the treemap.
- **[`tooltipSettings`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/tooltipsettingsmodel)** (TooltipSettingsModel): Sets and gets the options for customizing the tooltip of the treemap.
- **[`legendSettings`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/legendsettingsmodel)** (LegendSettingsModel): Sets and gets the options for customizing the legend of the treemap.

---

## Selection and Highlight Properties

- **[`selectionSettings`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/selectionsettingsmodel)** (SelectionSettingsModel): Sets and gets the options for customizing the selection functionality of the treemap.
- **[`highlightSettings`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/highlightsettingsmodel)** (HighlightSettingsModel): Sets and gets the options to customize the highlight functionality of the treemap.

---

## Drill Down Properties

- **[`enableDrillDown`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#enabledrilldown)** (boolean): Enables or disables the drill down functionality in treemap. **Default:** false
- **[`drillDownView`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#drilldownview)** (boolean): Enables or disables the initial drill in the treemap. **Default:** false
- **[`enableBreadcrumb`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#enablebreadcrumb)** (boolean): Enables or disables the connection text in the header of the treemap when drill down is enabled. **Default:** false
- **[`breadcrumbConnector`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#breadcrumbconnector)** (string): Specifies the symbol to show connection between the two words in the header of the treemap during drill down. **Default:** ' - '
- **[`initialDrillDown`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/initialdrillsettingsmodel)** (InitialDrillSettingsModel): Specifies the options for customizing the initial drill down in treemap.

---

## Export and Print Properties

- **[`allowImageExport`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#allowimageexport)** (boolean): Enables and disables the export to image functionality in treemap. **Default:** false
- **[`allowPdfExport`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#allowpdfexport)** (boolean): Enables and disables the export to pdf functionality in treemap. **Default:** false
- **[`allowPrint`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#allowprint)** (boolean): Enables and disables the print functionality in treemap. **Default:** false

---

## Accessibility Properties

- **[`enableRtl`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false
- **[`enablePersistence`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`enableHtmlSanitizer`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#enablehtmlsanitizer)** (boolean): Specifies whether to enable the rendering of untrusted HTML values in the TreeMap. If `enableHtmlSanitizer` is set to true, the component will sanitize any suspected untrusted strings and scripts before rendering them. **Default:** false
- **[`tabIndex`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#tabindex)** (number): Sets and gets the tab index value for treemap. **Default:** 0
- **[`description`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#description)** (string): Sets and gets the description for treemap. **Default:** null

---

## Internationalization Properties

- **[`locale`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#locale)** (string): Overrides the global culture and localization value for this component. Default global culture is 'en-US'. **Default:** ''
- **[`format`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#format)** (string): Sets and gets format for the texts in the treemap. This property accepts any global string format like 'C', 'N1', 'P' etc. **Default:** null
- **[`useGroupingSeparator`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#usegroupingseparator)** (boolean): Enables or disables the visibility state of the separator for grouping. **Default:** false

---

## Methods

### [addEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [destroy()](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#destroy)
This method destroys the treemap. This method removes the events associated with the treemap and disposes the objects created for rendering and updating the treemap.

**Returns:** void

### [doubleClickOnTreeMap()](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#doubleclickontreemap)
This method handles the double click event in the treemap.

**Parameters:**
- `e` (PointerEvent): Specifies the pointer event of mouse click

**Returns:** void

### [export()](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#export)
This method is used to perform the export functionality for the rendered treemap.

**Parameters:**
- `type` (ExportType): Specifies the extension type of the exported document
- `fileName` (string): Specifies file name for exporting the rendered TreeMap
- `orientation` (optional) (PdfPageOrientation): Specifies the orientation of the PDF document
- `allowDownload` (optional) (boolean): Specifies whether the exported file should be downloaded or not

**Returns:** Promise

### [getRootElement()](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#getrootelement)
Returns the root element of the component.

**Returns:** HTMLElement

### [print()](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#print)
This method is used to perform the print functionality in treemap.

**Parameters:**
- `id` (optional) (string[] | string | Element): Specifies the element to print the treemap

**Returns:** void

### [refresh()](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [selectItem()](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#selectitem)
This method is used to select or remove the selection of treemap item based on the provided selection settings.

**Parameters:**
- `levelOrder` (string[]): Specifies the order of the level
- `isSelected` (optional) (boolean): Specifies whether the treemap item should be selected or the selection should be removed

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [beforePrint](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iprinteventargs)
Triggers before the print gets started.

### [click](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iitemclickeventargs)
Triggers after clicking on the treemap.

### [doubleClick](https://ej2.syncfusion.com/javascript/documentation/api/treemap/idoubleclickeventargs)
Triggers after double clicking on the treemap.

### [drillEnd](https://ej2.syncfusion.com/javascript/documentation/api/treemap/idrillendeventargs)
Triggers after drill down functionality gets completed in the treemap.

### [drillStart](https://ej2.syncfusion.com/javascript/documentation/api/treemap/idrillstarteventargs)
Triggers on performing drill down functionality in the treemap.

### [itemClick](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iitemclickeventargs)
Triggers after clicking an item in the treemap.

### [itemHighlight](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iitemhighlighteventargs)
Triggers after highlighting on the treemap item.

### [itemMove](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iitemmoveeventargs)
Triggers after mouse hover on the treemap item.

### [itemRendering](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iitemrenderingeventargs)
Triggers before item rendering in the treemap.

### [itemSelected](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iitemselectedeventargs)
Triggers after selecting a treemap item.

### [legendItemRendering](https://ej2.syncfusion.com/javascript/documentation/api/treemap/ilegenditemrenderingeventargs)
Triggers before rendering each legend item in the treemap.

### [legendRendering](https://ej2.syncfusion.com/javascript/documentation/api/treemap/ilegendrenderingeventargs)
Triggers before rendering the legend items in the treemap.

### [load](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iloadeventargs)
Triggers before the treemap is rendered.

### [loaded](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iloadedeventargs)
Triggers after treemap is rendered.

### [mouseMove](https://ej2.syncfusion.com/javascript/documentation/api/treemap/imousemoveeventargs)
Triggers after mouse hover on the treemap.

### [resize](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iresizeeventargs)
Triggers to notify the resize of the treemap when the window is resized.

### [rightClick](https://ej2.syncfusion.com/javascript/documentation/api/treemap/imousemoveeventargs)
Triggers after right clicking on the treemap.

### [tooltipRendering](https://ej2.syncfusion.com/javascript/documentation/api/treemap/itreemaptooltiprendereventargs)
Triggers on rendering of the tooltip in the treemap.

---

## Related Settings Classes

### Layout and Visual
- **[`LayoutMode`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/layoutmode)** - Layout type enumeration (Squarified, SliceAndDiceHorizontal, SliceAndDiceVertical, Strip, StripHorizontal, StripVertical)
- **[`RenderingMode`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/renderingmode)** - Rendering direction enumeration (TopLeftBottomRight, TopRightBottomLeft, etc.)
- **[`MarginModel`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/marginmodel)** - Margin configuration
- **[`BorderModel`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/bordermodel)** - Border customization

### Levels and Items
- **[`LevelSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/levelsettingsmodel)** - Level configuration for hierarchical treemaps
- **[`LeafItemSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/leafitemsettingsmodel)** - Leaf node configuration

### Title and Tooltip
- **[`TitleSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/titlesettingsmodel)** - Title configuration
- **[`TooltipSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/tooltipsettingsmodel)** - Tooltip configuration

### Legend
- **[`LegendSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/legendsettingsmodel)** - Legend configuration

### Selection and Highlighting
- **[`SelectionSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/selectionsettingsmodel)** - Selection behavior configuration
- **[`HighlightSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/highlightsettingsmodel)** - Highlight effect configuration

### Drill Down
- **[`InitialDrillSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/initialdrillsettingsmodel)** - Initial drill down configuration

### Data
- **[`TreeMapAjax`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/treemapajax)** - AJAX data adapter for remote data sources

### Event Arguments
- **[`IPrintEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iprinteventargs)** - Print event arguments
- **[`IItemClickEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iitemclickeventargs)** - Item click event arguments
- **[`IDoubleClickEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/idoubleclickeventargs)** - Double click event arguments
- **[`IDrillEndEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/idrillendeventargs)** - Drill end event arguments
- **[`IDrillStartEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/idrillstarteventargs)** - Drill start event arguments
- **[`IItemHighlightEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iitemhighlighteventargs)** - Item highlight event arguments
- **[`IItemMoveEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iitemmoveeventargs)** - Item move event arguments
- **[`IItemRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iitemrenderingeventargs)** - Item rendering event arguments
- **[`IItemSelectedEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iitemselectedeventargs)** - Item selected event arguments
- **[`ILegendItemRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/ilegenditemrenderingeventargs)** - Legend item rendering event arguments
- **[`ILegendRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/ilegendrenderingeventargs)** - Legend rendering event arguments
- **[`ILoadEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iloadeventargs)** - Load event arguments
- **[`ILoadedEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iloadedeventargs)** - Loaded event arguments
- **[`IMouseMoveEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/imousemoveeventargs)** - Mouse move event arguments
- **[`IResizeEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/iresizeeventargs)** - Resize event arguments
- **[`ITreeMapTooltipRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/itreemaptooltiprendereventargs)** - Tooltip render event arguments

### Enumerations
- **[`TreeMapTheme`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/treemaptheme)** - Theme enumeration (Material, Bootstrap, Fabric, etc.)
- **[`ExportType`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/exporttype)** - Export type enumeration (PNG, JPEG, SVG, PDF)

---

## Common Usage Patterns

- Configure data source using [`dataSource`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#datasource) property with hierarchical or flat data.
- Set weight mapping using [`weightValuePath`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#weightvaluepath) property to determine item sizes.
- Configure layout algorithm using [`layoutType`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#layouttype) property (Squarified, SliceAndDiceHorizontal, etc.).
- Set rendering direction using [`renderDirection`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#renderdirection) property for layout orientation.
- Apply color schemes using [`palette`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#palette) property or [`colorValuePath`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#colorvaluepath).
- Configure hierarchical levels using [`levels`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/levelsettingsmodel) property for multi-level treemaps.
- Enable drill down using [`enableDrillDown`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#enabledrilldown) property with [`enableBreadcrumb`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#enablebreadcrumb) for navigation.
- Set initial drill down view using [`drillDownView`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#drilldownview) and [`initialDrillDown`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/initialdrillsettingsmodel) properties.
- Add tooltips using [`tooltipSettings`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/tooltipsettingsmodel) property for item details on hover.
- Export treemap using [`export()`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#export) method to image or PDF formats, or print via [`print()`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#print) method.

---

## Notes

- The Treemap component visualizes hierarchical and flat data as nested rectangles where area represents value.
- The [`layoutType`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#layouttype) property determines the algorithm: **Squarified** (default, balanced), SliceAndDice (directional), Strip (linear).
- The [`weightValuePath`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#weightvaluepath) is mandatory for size mapping; the [`colorValuePath`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#colorvaluepath) is optional for color mapping.
- The [`palette`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#palette) property applies predefined colors to items when no [`colorValuePath`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#colorvaluepath) is specified.
- Use [`equalColorValuePath`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#equalcolorvaluepath) with equal color mapping or [`rangeColorValuePath`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#rangecolorvaluepath) with range color mapping.
- The [`theme`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#theme) property supports predefined color schemes: **Material** is the default theme.
- The [`breadcrumbConnector`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#breadcrumbconnector) property defines the separator (**' - '** by default) for breadcrumb navigation during drill down.
- The [`enableHtmlSanitizer`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#enablehtmlsanitizer) property protects against XSS when rendering untrusted HTML content.
- Drill down events ([drillStart](https://ej2.syncfusion.com/javascript/documentation/api/treemap/idrillstarteventargs), [drillEnd](https://ej2.syncfusion.com/javascript/documentation/api/treemap/idrillendeventargs)) provide hooks for custom navigation logic.
- Use [`selectItem()`](https://ej2.syncfusion.com/javascript/documentation/api/treemap/#selectitem) method to programmatically select or deselect treemap items by level order.
