# HeatMap API Reference (TypeScript)

Complete API reference for the Syncfusion TypeScript HeatMap ([`Syncfusion.EJ2.HeatMap`](https://ej2.syncfusion.com/documentation/api/heatmap/)) component.

- **Base API Documentation:** [HeatMap](https://ej2.syncfusion.com/documentation/api/heatmap/)
- **Namespace:** `Syncfusion.EJ2.HeatMap`
- **Assembly:** `Syncfusion.EJ2.dll`

- [Constructor](#constructor)
- [Core Configuration Properties](#core-configuration-properties)
- [Layout and Sizing Properties](#layout-and-sizing-properties)
- [Axis Configuration Properties](#axis-configuration-properties)
- [Cell and Palette Properties](#cell-and-palette-properties)
- [Legend and Tooltip Properties](#legend-and-tooltip-properties)
- [Data and Selection Properties](#data-and-selection-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [HeatMap()](https://ej2.syncfusion.com/documentation/api/heatmap/)
Creates a new instance of the HeatMap component.

---

## Core Configuration Properties

- **[`titleSettings`](https://ej2.syncfusion.com/documentation/api/heatmap/titlemodel)** (TitleModel): Sets and gets the options to customize the title of the heatmap.
- **[`theme`](https://ej2.syncfusion.com/documentation/api/heatmap/heatmaptheme)** (HeatMapTheme): Sets and gets the theme styles supported for heatmap. When the theme is set, the styles associated with the theme will be set in the heatmap. **Default:** 'Material'
- **[`backgroundColor`](https://ej2.syncfusion.com/documentation/api/heatmap/#backgroundcolor)** (string): Specifies the background color of the entire heatmap. **Default:** null
- **[`locale`](https://ej2.syncfusion.com/documentation/api/heatmap/#locale)** (string): Overrides the global culture and localization value for this component. Default global culture is 'en-US'. **Default:** ''
- **[`enableHtmlSanitizer`](https://ej2.syncfusion.com/documentation/api/heatmap/#enablehtmlsanitizer)** (boolean): Specifies whether to enable the rendering of untrusted HTML values in the HeatMap. If set to true, the component will sanitize any suspected untrusted strings and scripts before rendering them. **Default:** false
- **[`enablePersistence`](https://ej2.syncfusion.com/documentation/api/heatmap/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`enableRtl`](https://ej2.syncfusion.com/documentation/api/heatmap/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false

---

## Layout and Sizing Properties

- **[`height`](https://ej2.syncfusion.com/documentation/api/heatmap/#height)** (string): Sets and gets the height of the heatmap. The height of the heatmap accepts pixel or percentage values given in string format. **Default:** null
- **[`width`](https://ej2.syncfusion.com/documentation/api/heatmap/#width)** (string): Sets and gets the width of the heatmap. The width of the heatmap accepts pixel or percentage values given in string format. If specified as '100%', heatmap renders to the full width of its parent element. **Default:** null
- **[`margin`](https://ej2.syncfusion.com/documentation/api/heatmap/marginmodel)** (MarginModel): Sets and gets the options to customize left, right, top and bottom margins of the heatmap.

---

## Axis Configuration Properties

- **[`xAxis`](https://ej2.syncfusion.com/documentation/api/heatmap/axismodel)** (AxisModel): Sets and gets the options to configure the horizontal axis.
- **[`yAxis`](https://ej2.syncfusion.com/documentation/api/heatmap/axismodel)** (AxisModel): Sets and gets the options to configure the vertical axis.

---

## Cell and Palette Properties

- **[`cellSettings`](https://ej2.syncfusion.com/documentation/api/heatmap/cellsettingsmodel)** (CellSettingsModel): Sets and gets the options to customize the heatmap cells.
- **[`paletteSettings`](https://ej2.syncfusion.com/documentation/api/heatmap/palettesettingsmodel)** (PaletteSettingsModel): Sets and gets the options for customizing the cell color of the heatmap.
- **[`renderingMode`](https://ej2.syncfusion.com/documentation/api/heatmap/drawtype)** (DrawType): Specifies the rendering mode of heatmap. Available modes: SVG (rendered using SVG element), Canvas (rendered using Canvas element), Auto (automatically switches based on number of records). **Default:** SVG

---

## Data and Selection Properties

- **[`dataSource`](https://ej2.syncfusion.com/documentation/api/heatmap/#datasource)** (Object): Sets and gets the data to visualize in the heatmap. **Default:** null
- **[`dataSourceSettings`](https://ej2.syncfusion.com/documentation/api/heatmap/datamodel)** (DataModel): Sets and gets the options to customize the data mapping for the data in the heatmap.
- **[`allowSelection`](https://ej2.syncfusion.com/documentation/api/heatmap/#allowselection)** (boolean): Enable or disable the selection of cells in heatmap. **Default:** false
- **[`enableMultiSelect`](https://ej2.syncfusion.com/documentation/api/heatmap/#enablemultiselect)** (boolean): Enable or disable the multiple selection of cells in heatmap. **Default:** true

---

## Legend and Tooltip Properties

- **[`legendSettings`](https://ej2.syncfusion.com/documentation/api/heatmap/legendsettingsmodel)** (LegendSettingsModel): Sets and gets the options for customizing the legend of the heatmap.
- **[`tooltipSettings`](https://ej2.syncfusion.com/documentation/api/heatmap/tooltipsettingsmodel)** (TooltipSettingsModel): Sets and gets the options for customizing the tooltip of the heatmap.
- **[`showTooltip`](https://ej2.syncfusion.com/documentation/api/heatmap/#showtooltip)** (boolean): Enable or disable the visibility of the tooltip for heatmap. **Default:** true

---

## Methods

### [addEventListener()](https://ej2.syncfusion.com/documentation/api/heatmap/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/documentation/api/heatmap/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [clearSelection()](https://ej2.syncfusion.com/documentation/api/heatmap/#clearselection)
This method is used to clear the cell selection in the heatmap.

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/documentation/api/heatmap/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [destroy()](https://ej2.syncfusion.com/documentation/api/heatmap/#destroy)
This method destroys the heatmap. This method removes the events associated with the heatmap and disposes the objects created for rendering and updating the heatmap.

**Returns:** void

### [export()](https://ej2.syncfusion.com/documentation/api/heatmap/#export)
This method is used to perform the export functionality for the heatmap.

**Parameters:**
- `type` (ExportType): Specifies the type of the exported file
- `fileName` (string): Specifies the file name for the exported file
- `orientation` (optional) (PdfPageOrientation): Specifies the orientation for the exported PDF document

**Returns:** void

### [getRootElement()](https://ej2.syncfusion.com/documentation/api/heatmap/#getrootelement)
Returns the root element of the component.

**Returns:** HTMLElement

### [print()](https://ej2.syncfusion.com/documentation/api/heatmap/#print)
This method is used to print the rendered heatmap.

**Returns:** void

### [refresh()](https://ej2.syncfusion.com/documentation/api/heatmap/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/documentation/api/heatmap/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/documentation/api/heatmap/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [cellClick](https://ej2.syncfusion.com/documentation/api/heatmap/icellclickeventargs)
Triggers when clicking on the heatmap cell.

### [cellDoubleClick](https://ej2.syncfusion.com/documentation/api/heatmap/icellclickeventargs)
Triggers when performing the double click operation on the cells in the HeatMap.

### [cellRender](https://ej2.syncfusion.com/documentation/api/heatmap/icelleventargs)
Triggers before each heatmap cell renders.

### [cellSelected](https://ej2.syncfusion.com/documentation/api/heatmap/iselectedeventargs)
Triggers when heatmap cell gets selected.

### [created](https://ej2.syncfusion.com/documentation/api/heatmap/)
Triggers after heatmap is completely rendered.

### [legendRender](https://ej2.syncfusion.com/documentation/api/heatmap/ilegendrendereventargs)
Triggers before the legend is rendered.

### [load](https://ej2.syncfusion.com/documentation/api/heatmap/iloadedeventargs)
Triggers before heatmap gets loaded.

### [loaded](https://ej2.syncfusion.com/documentation/api/heatmap/iloadedeventargs)
Triggers after heatmap is loaded.

### [resized](https://ej2.syncfusion.com/documentation/api/heatmap/iresizeeventargs)
Triggers to notify the resize of the heatmap when the window is resized.

### [tooltipRender](https://ej2.syncfusion.com/documentation/api/heatmap/itooltipeventargs)
Triggers before the tooltip of the heatmap is rendered on the heatmap cell.

---

## Related Settings Classes

### Axes and Data Mapping
- **[`AxisModel`](https://ej2.syncfusion.com/documentation/api/heatmap/axismodel)** - Represents the axis configuration (X and Y axes)
- **[`DataModel`](https://ej2.syncfusion.com/documentation/api/heatmap/datamodel)** - Represents the data source mapping configuration

### Visual and Styling
- **[`CellSettingsModel`](https://ej2.syncfusion.com/documentation/api/heatmap/cellsettingsmodel)** - Cell customization configuration
- **[`PaletteSettingsModel`](https://ej2.syncfusion.com/documentation/api/heatmap/palettesettingsmodel)** - Color palette configuration
- **[`TitleModel`](https://ej2.syncfusion.com/documentation/api/heatmap/titlemodel)** - Title styling configuration
- **[`MarginModel`](https://ej2.syncfusion.com/documentation/api/heatmap/marginmodel)** - Margin configuration

### Legend and Tooltip
- **[`LegendSettingsModel`](https://ej2.syncfusion.com/documentation/api/heatmap/legendsettingsmodel)** - Legend settings configuration
- **[`TooltipSettingsModel`](https://ej2.syncfusion.com/documentation/api/heatmap/tooltipsettingsmodel)** - Tooltip settings configuration

### Event Arguments
- **[`ICellClickEventArgs`](https://ej2.syncfusion.com/documentation/api/heatmap/icellclickeventargs)** - Cell click event arguments
- **[`ICellEventArgs`](https://ej2.syncfusion.com/documentation/api/heatmap/icelleventargs)** - Cell render event arguments
- **[`ISelectedEventArgs`](https://ej2.syncfusion.com/documentation/api/heatmap/iselectedeventargs)** - Cell selected event arguments
- **[`ILegendRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/heatmap/ilegendrendereventargs)** - Legend render event arguments
- **[`ILoadedEventArgs`](https://ej2.syncfusion.com/documentation/api/heatmap/iloadedeventargs)** - Loaded event arguments
- **[`IResizeEventArgs`](https://ej2.syncfusion.com/documentation/api/heatmap/iresizeeventargs)** - Resize event arguments
- **[`ITooltipEventArgs`](https://ej2.syncfusion.com/documentation/api/heatmap/itooltipeventargs)** - Tooltip render event arguments

### Enumeration
- **[`DrawType`](https://ej2.syncfusion.com/documentation/api/heatmap/drawtype)** - Available rendering modes for heatmap
- **[`HeatMapTheme`](https://ej2.syncfusion.com/documentation/api/heatmap/heatmaptheme)** - Available theme enumeration

---

## Common Usage Patterns

- Configure heatmap dimensions using [`height`](https://ej2.syncfusion.com/documentation/api/heatmap/#height) and [`width`](https://ej2.syncfusion.com/documentation/api/heatmap/#width) properties to set display area.
- Bind data using [`dataSource`](https://ej2.syncfusion.com/documentation/api/heatmap/#datasource) property with proper [`dataSourceSettings`](https://ej2.syncfusion.com/documentation/api/heatmap/datamodel) mapping configuration.
- Configure axis labels and formatting using [`xAxis`](https://ej2.syncfusion.com/documentation/api/heatmap/axismodel) and [`yAxis`](https://ej2.syncfusion.com/documentation/api/heatmap/axismodel) properties.
- Customize cell appearance using [`cellSettings`](https://ej2.syncfusion.com/documentation/api/heatmap/cellsettingsmodel) for borders, labels, and formatting options.
- Control color representation with [`paletteSettings`](https://ej2.syncfusion.com/documentation/api/heatmap/palettesettingsmodel) to define color gradients and ranges.
- Enable interactive features using [`allowSelection`](https://ej2.syncfusion.com/documentation/api/heatmap/#allowselection) and [`enableMultiSelect`](https://ej2.syncfusion.com/documentation/api/heatmap/#enablemultiselect) properties.
- Configure legend display using [`legendSettings`](https://ej2.syncfusion.com/documentation/api/heatmap/legendsettingsmodel) property for color range visualization.
- Handle cell interactions via events like [`cellClick`](https://ej2.syncfusion.com/documentation/api/heatmap/icellclickeventargs), [`cellRender`](https://ej2.syncfusion.com/documentation/api/heatmap/icelleventargs), and [`cellSelected`](https://ej2.syncfusion.com/documentation/api/heatmap/iselectedeventargs).
- Export the heatmap using the [`export()`](https://ej2.syncfusion.com/documentation/api/heatmap/#export) method to PNG, JPEG, or PDF formats.

---

## Notes

- The HeatMap component requires data to be provided through the [`dataSource`](https://ej2.syncfusion.com/documentation/api/heatmap/#datasource) property.
- Proper data mapping must be configured through [`dataSourceSettings`](https://ej2.syncfusion.com/documentation/api/heatmap/datamodel) for the heatmap to correctly interpret the data structure.
- The [`renderingMode`](https://ej2.syncfusion.com/documentation/api/heatmap/drawtype) property controls performance; Auto mode automatically selects SVG or Canvas based on data size.
- Use [`cellSettings`](https://ej2.syncfusion.com/documentation/api/heatmap/cellsettingsmodel) to apply consistent formatting and display options across all cells.
- The [`paletteSettings`](https://ej2.syncfusion.com/documentation/api/heatmap/palettesettingsmodel) property can define both gradient-based and discrete color mapping strategies.
- Selection features require [`allowSelection`](https://ej2.syncfusion.com/documentation/api/heatmap/#allowselection) to be enabled; use [`enableMultiSelect`](https://ej2.syncfusion.com/documentation/api/heatmap/#enablemultiselect) for multi-cell selection capability.
- Event handlers can be attached using the [`addEventListener()`](https://ej2.syncfusion.com/documentation/api/heatmap/#addeventlistener) method for real-time interaction handling.
- The [`clearSelection()`](https://ej2.syncfusion.com/documentation/api/heatmap/#clearselection) method programmatically clears all selected cells.
