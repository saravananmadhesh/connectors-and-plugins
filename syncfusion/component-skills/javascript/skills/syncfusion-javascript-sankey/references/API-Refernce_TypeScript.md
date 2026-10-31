# Sankey API Reference (TypeScript)

Complete API reference for the Syncfusion TypeScript Sankey ([`Syncfusion.EJ2.Charts.Sankey`](https://ej2.syncfusion.com/documentation/api/sankey/)) component.

- **Base API Documentation:** [Sankey](https://ej2.syncfusion.com/documentation/api/sankey/)
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll`

- [Constructor](#constructor)
- [Data Properties](#data-properties)
- [Layout and Sizing Properties](#layout-and-sizing-properties)
- [Title and Subtitle Properties](#title-and-subtitle-properties)
- [Visual Styling Properties](#visual-styling-properties)
- [Node and Link Configuration](#node-and-link-configuration)
- [Legend and Tooltip Properties](#legend-and-tooltip-properties)
- [Accessibility and Persistence Properties](#accessibility-and-persistence-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [Sankey()](https://ej2.syncfusion.com/documentation/api/sankey/)
Creates a new instance of the Sankey diagram component.

---

## Data Properties

- **[`nodes`](https://ej2.syncfusion.com/documentation/api/sankey/#nodes)** (SankeyNodeModel[]): Collection of Sankey nodes that represent entities in the diagram. Each node defines properties such as name, color, and position. **Default:** []
- **[`links`](https://ej2.syncfusion.com/documentation/api/sankey/#links)** (SankeyLinkModel[]): Collection of Sankey links that represent the flow between nodes. Each link defines properties such as source, target, and value. **Default:** []
- **[`nodeLayoutMap`](https://ej2.syncfusion.com/documentation/api/sankey/#nodelayoutmap)** ({ [key: string]: SankeyNodeLayout }): Stores the computed Sankey node layout map keyed by node id.

---

## Layout and Sizing Properties

- **[`height`](https://ej2.syncfusion.com/documentation/api/sankey/#height)** (string): The height of the sankey diagram as a string, accepting values like '100px' or '100%'. If specified as '100%', the component renders to the full height of its parent element. **Default:** null
- **[`width`](https://ej2.syncfusion.com/documentation/api/sankey/#width)** (string): The width of the sankey diagram as a string, accepting values like '100px' or '100%'. If specified as '100%', the component renders to the full width of its parent element. **Default:** null
- **[`orientation`](https://ej2.syncfusion.com/documentation/api/sankey/#orientation)** (Orientation): Defines the orientation of the Sankey diagram. The options are: Horizontal (renders nodes left to right) or Vertical (renders nodes top to bottom). **Default:** 'Horizontal'
- **[`margin`](https://ej2.syncfusion.com/documentation/api/sankey/marginmodel)** (MarginModel): Options to configure the margins around the component.

---

## Title and Subtitle Properties

- **[`title`](https://ej2.syncfusion.com/documentation/api/sankey/#title)** (string): The title displayed at the top of the sankey diagram. **Default:** ''
- **[`titleStyle`](https://ej2.syncfusion.com/documentation/api/sankey/sankeytitlestylemodel)** (SankeyTitleStyleModel): Options to customize the appearance of the title text.
- **[`subTitle`](https://ej2.syncfusion.com/documentation/api/sankey/#subtitle)** (string): The subtitle displayed below the main title. **Default:** ''
- **[`subTitleStyle`](https://ej2.syncfusion.com/documentation/api/sankey/sankeytitlestylemodel)** (SankeyTitleStyleModel): Options to customize the appearance of the subtitle text.

---

## Visual Styling Properties

- **[`theme`](https://ej2.syncfusion.com/documentation/api/sankey/#theme)** (ChartTheme): Defines the theme of the component. **Default:** 'Material'
- **[`background`](https://ej2.syncfusion.com/documentation/api/sankey/#background)** (string): Background color of the sankey diagram. Accepts valid CSS color values. **Default:** null
- **[`backgroundImage`](https://ej2.syncfusion.com/documentation/api/sankey/#backgroundimage)** (string): Background image URL of the sankey diagram. **Default:** null
- **[`border`](https://ej2.syncfusion.com/documentation/api/sankey/bordermodel)** (BorderModel): Options to configure the outer border of the component.

---

## Node and Link Configuration

- **[`nodeStyle`](https://ej2.syncfusion.com/documentation/api/sankey/sankeynodesettingsmodel)** (SankeyNodeSettingsModel): Node style configuration for the sankey diagram. Customize node appearance, size, opacity, and text alignment.
- **[`linkStyle`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylinksettingsmodel)** (SankeyLinkSettingsModel): Link style configuration for the sankey diagram. Customize link color, opacity, and hover behavior.
- **[`labelSettings`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylabelsettingsmodel)** (SankeyLabelSettingsModel): Customize labels using labelSettings to improve clarity and alignment with application design.

---

## Legend and Tooltip Properties

- **[`legendSettings`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylegendsettingsmodel)** (SankeyLegendSettingsModel): Legend configuration for the sankey diagram.
- **[`tooltip`](https://ej2.syncfusion.com/documentation/api/sankey/sankeytooltipsettingsmodel)** (SankeyTooltipSettingsModel): Tooltip configuration for displaying details on hover.

---

## Accessibility and Persistence Properties

- **[`accessibility`](https://ej2.syncfusion.com/documentation/api/sankey/accessibilitymodel)** (AccessibilityModel): Accessibility options for the component.
- **[`animation`](https://ej2.syncfusion.com/documentation/api/sankey/animationmodel)** (AnimationModel): Options for customizing the animation.
- **[`enableRtl`](https://ej2.syncfusion.com/documentation/api/sankey/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false
- **[`enablePersistence`](https://ej2.syncfusion.com/documentation/api/sankey/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`locale`](https://ej2.syncfusion.com/documentation/api/sankey/#locale)** (string): Overrides the global culture and localization value for this component. Default global culture is 'en-US'. **Default:** ''
- **[`allowExport`](https://ej2.syncfusion.com/documentation/api/sankey/#allowexport)** (boolean): Enables export in specific scenarios. **Default:** false
- **[`enableExport`](https://ej2.syncfusion.com/documentation/api/sankey/#enableexport)** (boolean): When set to true, enables export of the diagram into supported formats. **Default:** true
- **[`focusBorderColor`](https://ej2.syncfusion.com/documentation/api/sankey/#focusbordercolor)** (string): Customize the focus border color. If not specified, the element will use the default focus border color. **Default:** null
- **[`focusBorderMargin`](https://ej2.syncfusion.com/documentation/api/sankey/#focusbordermargin)** (number): Customize the focus border margin. If not specified, the element will use the default focus border margin. **Default:** 0
- **[`focusBorderWidth`](https://ej2.syncfusion.com/documentation/api/sankey/#focusborderwidth)** (number): Customize the focus border width. If not specified, the element will use the default focus border width. **Default:** 1.5

---

## Methods

### [addEventListener()](https://ej2.syncfusion.com/documentation/api/sankey/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/documentation/api/sankey/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/documentation/api/sankey/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [getRootElement()](https://ej2.syncfusion.com/documentation/api/sankey/#getrootelement)
Returns the root element of the component.

**Returns:** HTMLElement

### [refresh()](https://ej2.syncfusion.com/documentation/api/sankey/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/documentation/api/sankey/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/documentation/api/sankey/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [afterExport](https://ej2.syncfusion.com/documentation/api/sankey/iafterexporteventargs)
Triggers after the export completed.

### [beforeExport](https://ej2.syncfusion.com/documentation/api/sankey/sankeyexporteventargs)
Triggers before the export gets started.

### [beforePrint](https://ej2.syncfusion.com/documentation/api/sankey/sankeyprinteventargs)
Triggers before the print gets started.

### [exportCompleted](https://ej2.syncfusion.com/documentation/api/sankey/sankeyexportedeventargs)
Triggers after the chart export is completed.

### [labelRendering](https://ej2.syncfusion.com/documentation/api/sankey/sankeylabelrendereventargs)
Triggers before a label is rendered. Allows customization of label text and style.

### [legendItemHover](https://ej2.syncfusion.com/documentation/api/sankey/sankeylegenditemhovereventargs)
Triggers when the mouse hovers over a legend item.

### [legendItemRendering](https://ej2.syncfusion.com/documentation/api/sankey/sankeylegendrendereventargs)
Triggers before a legend item is rendered. Allows customization of legend text and shape color.

### [linkClick](https://ej2.syncfusion.com/documentation/api/sankey/sankeylinkeventargs)
Triggers when a link is clicked.

### [linkEnter](https://ej2.syncfusion.com/documentation/api/sankey/sankeylinkeventargs)
Triggers when the mouse enters a link.

### [linkLeave](https://ej2.syncfusion.com/documentation/api/sankey/sankeylinkeventargs)
Triggers when the mouse leaves a link.

### [linkRendering](https://ej2.syncfusion.com/documentation/api/sankey/sankeylinkrendereventargs)
Triggers before a link is rendered. Allows customization of link appearance.

### [load](https://ej2.syncfusion.com/documentation/api/sankey/sankeyloadedeventargs)
Triggers before the sankey loads. This event allows for customization and configuration before the sankey is rendered.

### [loaded](https://ej2.syncfusion.com/documentation/api/sankey/sankeyloadedeventargs)
Triggers after the sankey has fully loaded.

### [nodeClick](https://ej2.syncfusion.com/documentation/api/sankey/sankeynodeeventargs)
Triggers when a node is clicked.

### [nodeEnter](https://ej2.syncfusion.com/documentation/api/sankey/sankeynodeeventargs)
Triggers when the mouse enters a node.

### [nodeLeave](https://ej2.syncfusion.com/documentation/api/sankey/sankeynodeeventargs)
Triggers when the mouse leaves a node.

### [nodeRendering](https://ej2.syncfusion.com/documentation/api/sankey/sankeynoderendereventargs)
Triggers before a node is rendered. Allows customization of node appearance.

### [sizeChanged](https://ej2.syncfusion.com/documentation/api/sankey/sankeysizechangedeventargs)
Triggers when the chart size changes.

### [tooltipRendering](https://ej2.syncfusion.com/documentation/api/sankey/sankeytooltiprendereventargs)
Triggers before a tooltip is rendered. Allows customization of tooltip text.

---

## Related Settings Classes

### Data Models
- **[`SankeyNodeModel`](https://ej2.syncfusion.com/documentation/api/sankey/sankeynodemodel)** - Node configuration model for Sankey diagram
- **[`SankeyLinkModel`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylinkmodel)** - Link configuration model for Sankey diagram

### Visual Settings
- **[`SankeyNodeSettingsModel`](https://ej2.syncfusion.com/documentation/api/sankey/sankeynodesettingsmodel)** - Node styling and appearance configuration
- **[`SankeyLinkSettingsModel`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylinksettingsmodel)** - Link styling and appearance configuration
- **[`BorderModel`](https://ej2.syncfusion.com/documentation/api/sankey/bordermodel)** - Border customization configuration
- **[`MarginModel`](https://ej2.syncfusion.com/documentation/api/sankey/marginmodel)** - Margin configuration

### Text and Labels
- **[`SankeyLabelSettingsModel`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylabelsettingsmodel)** - Label settings for nodes and links
- **[`SankeyTitleStyleModel`](https://ej2.syncfusion.com/documentation/api/sankey/sankeytitlestylemodel)** - Title and subtitle styling configuration

### Legend and Tooltip
- **[`SankeyLegendSettingsModel`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylegendsettingsmodel)** - Legend configuration
- **[`SankeyTooltipSettingsModel`](https://ej2.syncfusion.com/documentation/api/sankey/sankeytooltipsettingsmodel)** - Tooltip settings configuration

### Advanced Settings
- **[`AccessibilityModel`](https://ej2.syncfusion.com/documentation/api/sankey/accessibilitymodel)** - Accessibility options
- **[`AnimationModel`](https://ej2.syncfusion.com/documentation/api/sankey/animationmodel)** - Animation customization options

### Event Arguments
- **[`IAfterExportEventArgs`](https://ej2.syncfusion.com/documentation/api/sankey/iafterexporteventargs)** - After export event arguments
- **[`SankeyExportEventArgs`](https://ej2.syncfusion.com/documentation/api/sankey/sankeyexporteventargs)** - Before export event arguments
- **[`SankeyPrintEventArgs`](https://ej2.syncfusion.com/documentation/api/sankey/sankeyprinteventargs)** - Before print event arguments
- **[`SankeyExportedEventArgs`](https://ej2.syncfusion.com/documentation/api/sankey/sankeyexportedeventargs)** - Export completed event arguments
- **[`SankeyLabelRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylabelrendereventargs)** - Label rendering event arguments
- **[`SankeyLegendItemHoverEventArgs`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylegenditemhovereventargs)** - Legend item hover event arguments
- **[`SankeyLegendRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylegendrendereventargs)** - Legend rendering event arguments
- **[`SankeyLinkEventArgs`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylinkeventargs)** - Link interaction event arguments
- **[`SankeyLinkRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylinkrendereventargs)** - Link rendering event arguments
- **[`SankeyLoadedEventArgs`](https://ej2.syncfusion.com/documentation/api/sankey/sankeyloadedeventargs)** - Load and loaded event arguments
- **[`SankeyNodeEventArgs`](https://ej2.syncfusion.com/documentation/api/sankey/sankeynodeeventargs)** - Node interaction event arguments
- **[`SankeyNodeRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/sankey/sankeynoderendereventargs)** - Node rendering event arguments
- **[`SankeySizeChangedEventArgs`](https://ej2.syncfusion.com/documentation/api/sankey/sankeysizechangedeventargs)** - Size changed event arguments
- **[`SankeyTooltipRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/sankey/sankeytooltiprendereventargs)** - Tooltip rendering event arguments

### Enumerations
- **[`ChartTheme`](https://ej2.syncfusion.com/documentation/api/sankey/charttheme)** - Theme enumeration (Material, Bootstrap, Fabric, etc.)
- **[`Orientation`](https://ej2.syncfusion.com/documentation/api/sankey/#orientation)** - Orientation enumeration (Horizontal, Vertical)

---

## Common Usage Patterns

- Define nodes using [`nodes`](https://ej2.syncfusion.com/documentation/api/sankey/#nodes) property with unique IDs, labels, and colors to represent entities in the flow diagram.
- Configure links using [`links`](https://ej2.syncfusion.com/documentation/api/sankey/#links) property to define source, target, and flow value between nodes.
- Set diagram orientation using [`orientation`](https://ej2.syncfusion.com/documentation/api/sankey/#orientation) property to display flows either Horizontal or Vertical.
- Customize node appearance using [`nodeStyle`](https://ej2.syncfusion.com/documentation/api/sankey/sankeynodesettingsmodel) to modify colors, sizes, and text alignment.
- Customize link appearance using [`linkStyle`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylinksettingsmodel) to modify colors, opacity, and hover effects.
- Configure labels with [`labelSettings`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylabelsettingsmodel) to control label visibility and alignment on nodes and links.
- Handle node interactions using [`nodeClick`](https://ej2.syncfusion.com/documentation/api/sankey/sankeynodeeventargs), [`nodeEnter`](https://ej2.syncfusion.com/documentation/api/sankey/sankeynodeeventargs), and [`nodeLeave`](https://ej2.syncfusion.com/documentation/api/sankey/sankeynodeeventargs) events.
- Handle link interactions using [`linkClick`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylinkeventargs), [`linkEnter`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylinkeventargs), and [`linkLeave`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylinkeventargs) events.
- Enable tooltips using [`tooltip`](https://ej2.syncfusion.com/documentation/api/sankey/sankeytooltipsettingsmodel) property with tooltipRendering event for custom tooltip content.
- Configure legend using [`legendSettings`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylegendsettingsmodel) to display diagram legend with proper positioning and styling.

---

## Notes

- The Sankey component visualizes flow quantities between entities, making it ideal for analyzing energy, data, or material flows.
- Node IDs must be unique within the diagram to ensure proper link connectivity and flow visualization.
- Link values represent the magnitude of flow between source and target nodes and should be positive numbers.
- The [`orientation`](https://ej2.syncfusion.com/documentation/api/sankey/#orientation) property determines the flow direction: **'Horizontal'** for left-to-right flows, **'Vertical'** for top-to-bottom flows.
- Use the [`theme`](https://ej2.syncfusion.com/documentation/api/sankey/#theme) property to apply predefined color schemes: **'Material'** is the default theme.
- The [`enableExport`](https://ej2.syncfusion.com/documentation/api/sankey/#enableexport) property controls whether the diagram can be exported (**true**) or not (**false**).
- RTL support via [`enableRtl`](https://ej2.syncfusion.com/documentation/api/sankey/#enablertl) property ensures proper layout for right-to-left language locales.
- Use [`nodeRendering`](https://ej2.syncfusion.com/documentation/api/sankey/sankeynoderendereventargs), [`linkRendering`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylinkrendereventargs), and [`labelRendering`](https://ej2.syncfusion.com/documentation/api/sankey/sankeylabelrendereventargs) events for dynamic customization before rendering.
- Responsive design is supported through percentage-based [`width`](https://ej2.syncfusion.com/documentation/api/sankey/#width) and [`height`](https://ej2.syncfusion.com/documentation/api/sankey/#height) values like '100%' to fit parent containers.
