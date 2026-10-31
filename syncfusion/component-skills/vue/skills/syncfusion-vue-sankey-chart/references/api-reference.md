# Sankey Chart API Reference

Complete API reference for the Syncfusion Vue 3 Sankey Chart component ([`SankeyComponent`](https://ej2.syncfusion.com/vue/documentation/api/sankey/)) from the `@syncfusion/ej2-vue-charts` package.

- **Vue Documentation:** [Sankey](https://ej2.syncfusion.com/vue/documentation/sankey/)
- **Package:** `@syncfusion/ej2-vue-charts`
- **Component Name:** `SankeyComponent`
- **Base Component:** Vue 3 / Vue 2 compatible component

## Table of Contents

- [Component Registration](#component-registration)
  - [Vue 3 (Composition API)](#vue-3-composition-api)
  - [Vue 3 (Options API)](#vue-3-options-api)
- [Configuration Properties](#configuration-properties)
  - [Dimensions and Layout](#dimensions-and-layout)
    - [width](#width)
    - [height](#height)
    - [margin](#margin)
    - [orientation](#orientation)
    - [enableRtl](#enablertl)
  - [Title and Subtitle](#title-and-subtitle)
    - [title](#title)
    - [subTitle](#subtitle)
    - [titleStyle](#titlestyle)
    - [subTitleStyle](#subtitlestyle)
  - [Data Properties](#data-properties)
    - [nodes](#nodes)
    - [links](#links)
    - [nodeLayoutMap](#nodelayoutmap)
  - [Node Styling](#node-styling)
    - [nodeStyle](#nodestyle)
  - [Link Styling](#link-styling)
    - [linkStyle](#linkstyle)
  - [Labels and Legends](#labels-and-legends)
    - [labelSettings](#labelsettings)
    - [legendSettings](#legendsettings)
  - [Tooltips](#tooltips)
    - [tooltip](#tooltip)
  - [Theme and Appearance](#theme-and-appearance)
    - [theme](#theme)
    - [background](#background)
    - [backgroundImage](#backgroundimage)
    - [border](#border)
  - [Advanced Properties](#advanced-properties)
    - [animation](#animation)
    - [locale](#locale)
    - [enablePersistence](#enablepersistence)
    - [isRespike](#isrespike)
- [Data Models](#data-models)
  - [SankeyNode Properties](#sankeynode-properties)
    - [id](#id)
    - [label](#label)
    - [color](#color)
    - [offset](#offset)
  - [SankeyLink Properties](#sankeylink-properties)
    - [sourceId](#sourceid)
    - [targetId](#targetid)
    - [value](#value)
    - [color](#color-1)
  - [Node Settings](#node-settings)
  - [Link Settings](#link-settings)
  - [Label Settings](#label-settings)
  - [Legend Settings](#legend-settings)
  - [Tooltip Settings](#tooltip-settings)
  - [Supporting Models](#supporting-models)
    - [BorderModel](#bordermodel)
    - [MarginModel](#marginmodel)
    - [LocationModel](#locationmodel)
    - [AnimationModel](#animationmodel)
    - [FontModel](#fontmodel)
    - [LabelModel](#labelmodel)
- [Events](#events)
  - [@nodeClick](#nodeclick)
  - [@linkClick](#linkclick)
  - [@nodeMouseMove](#nodemousemove)
  - [@linkMouseMove](#linkmousemove)
  - [@nodeMouseEnter](#nodemouseenter)
  - [@nodeMouseLeave](#nodemouseleave)
  - [@linkMouseEnter](#linkmouseenter)
  - [@linkMouseLeave](#linkmouseleave)
  - [@loaded](#loaded)
  - [@load](#load)
  - [@beforePrint](#beforeprint)
  - [@afterPrint](#afterprint)
  - [@beforeExport](#beforeexport)
  - [@afterExport](#afterexport)
  - [@sizeChanged](#sizechanged)
  - [@tooltipInitialize](#tooltipinitialize)
  - [@legendItemClick](#legenditemclick)
- [Methods](#methods)
  - [export(type: string, fileName: string)](#exporttype-string-filename-string)
  - [print()](#print)
  - [refresh()](#refresh)
  - [setTheme(theme: string)](#setthemetheme-string)
- [Enums](#enums)
  - [Orientation](#orientation)
  - [ColorType](#colortype)
  - [LegendPosition](#legendposition)
  - [ChartTheme](#charttheme)
  - [Alignment](#alignment)
  - [FadeOutMode](#fadeoutmode)
- [Child Directives](#child-directives)
  - [e-sankey-nodes-collection (Vue 2) / ESankeyNodesCollection (Vue 3)](#e-sankey-nodes-collection-vue-2--esankeynodescollection-vue-3)
  - [e-sankey-node (Vue 2) / ESankeyNode (Vue 3)](#e-sankey-node-vue-2--esankeynode-vue-3)
  - [e-sankey-links-collection (Vue 2) / ESankeyLinksCollection (Vue 3)](#e-sankey-links-collection-vue-2--esankeylinkscollection-vue-3)
  - [e-sankey-link (Vue 2) / ESankeyLink (Vue 3)](#e-sankey-link-vue-2--esankeylink-vue-3)
- [Module Registration](#module-registration)
  - [Available Modules](#available-modules)
  - [Registration Example](#registration-example)
- [Common Usage Patterns](#common-usage-patterns)
  - [Basic Sankey Chart](#basic-sankey-chart)
  - [With Styling and Tooltip](#with-styling-and-tooltip)
  - [With Events](#with-events)
  - [With Legend and RTL](#with-legend-and-rtl)
- [Additional Resources](#additional-resources)
- [Notes](#notes)

---

## Component Registration

### Vue 3 (Composition API)

```typescript
import { ref, provide } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip,
  SankeyLegend,
  SankeyExport
} from '@syncfusion/ej2-vue-charts';

// In setup function:
provide('sankey', [SankeyTooltip, SankeyLegend, SankeyExport]);
```

### Vue 3 (Options API)

```typescript
import {
  SankeyComponent,
  SankeyNodesCollectionDirective,
  SankeyNodeDirective,
  SankeyLinksCollectionDirective,
  SankeyLinkDirective,
  SankeyTooltip,
  SankeyLegend,
  SankeyExport
} from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-sankey': SankeyComponent,
    'e-sankey-nodes-collection': SankeyNodesCollectionDirective,
    'e-sankey-node': SankeyNodeDirective,
    'e-sankey-links-collection': SankeyLinksCollectionDirective,
    'e-sankey-link': SankeyLinkDirective
  },
  provide: {
    sankey: [SankeyTooltip, SankeyLegend, SankeyExport]
  }
};
```

---

## Configuration Properties

### Dimensions and Layout

#### [`width`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#width)
- **Type:** `string`
- **Default:** `'100%'`
- **Description:** Width of the Sankey chart as a CSS value. Can be pixel value (`'500px'`) or percentage (`'100%'`).

#### [`height`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#height)
- **Type:** `string`
- **Default:** `'420px'`
- **Description:** Height of the Sankey chart as a CSS value. Can be pixel value (`'500px'`) or percentage (`'100%'`).

#### [`margin`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#margin)
- **Type:** `MarginModel`
- **Default:** `{ left: 0, right: 0, top: 0, bottom: 0 }`
- **Description:** Margin configuration around the chart container.
- **Properties:**
  - [`left`](https://ej2.syncfusion.com/vue/documentation/api/marginmodel/#left) (number): Left margin in pixels
  - [`right`](https://ej2.syncfusion.com/vue/documentation/api/marginmodel/#right) (number): Right margin in pixels
  - [`top`](https://ej2.syncfusion.com/vue/documentation/api/marginmodel/#top) (number): Top margin in pixels
  - [`bottom`](https://ej2.syncfusion.com/vue/documentation/api/marginmodel/#bottom) (number): Bottom margin in pixels

#### [`orientation`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#orientation)
- **Type:** `'Horizontal' | 'Vertical'`
- **Default:** `'Horizontal'`
- **Description:** Specifies the direction of the flow. `Horizontal` displays nodes from left to right, `Vertical` displays from top to bottom.

#### [`enableRtl`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#enablertl)
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enables right-to-left layout for RTL languages.

---

### Title and Subtitle

#### [`title`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#title)
- **Type:** `string`
- **Default:** `''`
- **Description:** Title displayed at the top of the Sankey diagram.

#### [`subTitle`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#subtitle)
- **Type:** `string`
- **Default:** `''`
- **Description:** Subtitle displayed below the main title.

#### [`titleStyle`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#titlestyle)
- **Type:** `SankeyTitleStyleModel`
- **Default:** `{ fontFamily: 'Segoe UI', size: '16px', color: '#424242', fontWeight: 'Normal', fontStyle: 'Normal', opacity: 1, textAlignment: 'Center' }`
- **Description:** Styling options for the title.
- **Properties:**
  - [`fontFamily`](https://ej2.syncfusion.com/vue/documentation/api/sankeytitlestylemodel/#fontfamily) (string): Title font family
  - [`size`](https://ej2.syncfusion.com/vue/documentation/api/sankeytitlestylemodel/#size) (string): Title font size
  - [`color`](https://ej2.syncfusion.com/vue/documentation/api/sankeytitlestylemodel/#color) (string): Title text color
  - [`fontWeight`](https://ej2.syncfusion.com/vue/documentation/api/sankeytitlestylemodel/#fontweight) (string): Title font weight
  - [`fontStyle`](https://ej2.syncfusion.com/vue/documentation/api/sankeytitlestylemodel/#fontstyle) (string): Title font style (Normal, Italic, Oblique)
  - [`opacity`](https://ej2.syncfusion.com/vue/documentation/api/sankeytitlestylemodel/#opacity) (number): Title text opacity (0-1)
  - [`textAlignment`](https://ej2.syncfusion.com/vue/documentation/api/sankeytitlestylemodel/#textalignment) (string): Title alignment (Left, Center, Right)

#### [`subTitleStyle`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#subtitlestyle)
- **Type:** `SankeyTitleStyleModel`
- **Default:** `{ fontFamily: 'Segoe UI', size: '14px', color: '#9C9C9C', fontWeight: 'Normal', fontStyle: 'Normal', opacity: 1, textAlignment: 'Center' }`
- **Description:** Styling options for the subtitle.

---

### Data Properties

#### [`nodes`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#nodes)
- **Type:** `SankeyNodeModel[]`
- **Default:** `[]`
- **Description:** Collection of nodes representing entities or stages in the flow diagram.
- **Example:**
  ```typescript
  nodes: [
    { id: 'Node1', label: { text: 'Source' } },
    { id: 'Node2', label: { text: 'Destination' } }
  ]
  ```

#### [`links`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#links)
- **Type:** `SankeyLinkModel[]`
- **Default:** `[]`
- **Description:** Collection of links representing flows between nodes.
- **Example:**
  ```typescript
  links: [
    { sourceId: 'Node1', targetId: 'Node2', value: 100 }
  ]
  ```

#### [`nodeLayoutMap`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#nodelayoutmap)
- **Type:** `{}` (Object)
- **Default:** `null`
- **Description:** Optional pre-computed layout positions for nodes. If not provided, the layout is automatically calculated.

---

### Node Styling

#### [`nodeStyle`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#nodestyle)
- **Type:** `SankeyNodeSettingsModel`
- **Default:** Global node styling configuration
- **Description:** Global styling options applied to all nodes unless overridden per node.
- **Properties:**
  - [`width`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodesettingsmodel/#width) (number): Node width in pixels (default: 40)
  - [`padding`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodesettingsmodel/#padding) (number): Space between nodes (default: 35)
  - [`fill`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodesettingsmodel/#fill) (string): Node fill color (default: automatic)
  - [`stroke`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodesettingsmodel/#stroke) (string): Node border color (default: '')
  - [`strokeWidth`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodesettingsmodel/#strokewidth) (number): Node border width in pixels (default: 0)
  - [`opacity`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodesettingsmodel/#opacity) (number): Node opacity (default: 1)
  - [`highlightOpacity`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodesettingsmodel/#highlightopacity) (number): Node opacity when highlighted (default: 1)
  - [`inactiveOpacity`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodesettingsmodel/#inactiveopacity) (number): Node opacity when inactive (default: 0.3)

---

### Link Styling

#### [`linkStyle`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#linkstyle)
- **Type:** `SankeyLinkSettingsModel`
- **Default:** Global link styling configuration
- **Description:** Global styling options applied to all links.
- **Properties:**
  - [`opacity`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinksettingsmodel/#opacity) (number): Link opacity (default: 0.5)
  - [`highlightOpacity`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinksettingsmodel/#highlightopacity) (number): Link opacity when highlighted (default: 1)
  - [`inactiveOpacity`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinksettingsmodel/#inactiveopacity) (number): Link opacity when inactive (default: 0.2)
  - [`colorType`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinksettingsmodel/#colortype) (string): Link color mode - `'Source'`, `'Target'`, or `'Blend'` (default: 'Blend')
  - [`curvature`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinksettingsmodel/#curvature) (number): Bezier curve factor for links (0-1, default: 0.5)

---

### Labels and Legends

#### [`labelSettings`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#labelsettings)
- **Type:** `SankeyLabelSettingsModel`
- **Default:** Label configuration
- **Description:** Configuration for node labels displayed on the chart.
- **Properties:**
  - [`visible`](https://ej2.syncfusion.com/vue/documentation/api/sankeylabelsettingsmodel/#visible) (boolean): Show/hide labels (default: true)
  - [`fontFamily`](https://ej2.syncfusion.com/vue/documentation/api/sankeylabelsettingsmodel/#fontfamily) (string): Label font family (default: 'Segoe UI')
  - [`fontSize`](https://ej2.syncfusion.com/vue/documentation/api/sankeylabelsettingsmodel/#fontsize) (string): Label font size (default: '12px')
  - [`fontStyle`](https://ej2.syncfusion.com/vue/documentation/api/sankeylabelsettingsmodel/#fontstyle) (string): Label font style (default: 'Normal')
  - [`fontWeight`](https://ej2.syncfusion.com/vue/documentation/api/sankeylabelsettingsmodel/#fontweight) (string): Label font weight (default: 'Normal')
  - [`color`](https://ej2.syncfusion.com/vue/documentation/api/sankeylabelsettingsmodel/#color) (string): Label text color (default: '#424242')
  - [`padding`](https://ej2.syncfusion.com/vue/documentation/api/sankeylabelsettingsmodel/#padding) (number): Space around label text (default: 5)

#### [`legendSettings`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#legendsettings)
- **Type:** `SankeyLegendSettingsModel`
- **Default:** Legend configuration
- **Description:** Configuration for the legend display.
- **Properties:**
  - [`visible`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#visible) (boolean): Show/hide legend (default: false)
  - [`position`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#position) (string): Legend position - `'Top'`, `'Bottom'`, `'Left'`, `'Right'`, `'Auto'`, `'Custom'` (default: 'Auto')
  - [`background`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#background) (string): Legend background color (default: 'white')
  - [`padding`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#padding) (number): Padding inside legend (default: 5)
  - [`itemPadding`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#itempadding) (number): Padding between legend items (default: 5)
  - [`shapeWidth`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#shapewidth) (number): Legend shape width (default: 15)
  - [`shapeHeight`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#shapeheight) (number): Legend shape height (default: 15)
  - [`shapePadding`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#shapepadding) (number): Padding between shape and text (default: 5)
  - [`border`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#border) (BorderModel): Legend border configuration
  - [`opacity`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#opacity) (number): Legend opacity (default: 1)
  - [`textStyle`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#textstyle) (FontModel): Legend text font styling
  - [`title`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#title) (string): Legend title (default: '')
  - [`titleStyle`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#titlestyle) (FontModel): Legend title styling
  - [`width`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#width) (string): Legend width
  - [`height`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#height) (string): Legend height
  - [`enableHighlight`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#enablehighlight) (boolean): Enable legend item highlighting (default: true)
  - [`reverse`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#reverse) (boolean): Display legend items in reverse order (default: false)
  - [`location`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#location) (LocationModel): Custom legend location when position is 'Custom'
  - [`margin`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#margin) (MarginModel): Legend margin

---

### Tooltips

#### [`tooltip`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#tooltip)
- **Type:** `SankeyTooltipSettingsModel`
- **Default:** Tooltip configuration
- **Description:** Configuration for tooltip display on hover.
- **Properties:**
  - [`enable`](https://ej2.syncfusion.com/vue/documentation/api/sankeytooltipsettingsmodel/#enable) (boolean): Enable/disable tooltip (default: false)
  - [`format`](https://ej2.syncfusion.com/vue/documentation/api/sankeytooltipsettingsmodel/#format) (string): Tooltip content format string (default: '${sourceId} - ${targetId}: ${value}')
  - [`border`](https://ej2.syncfusion.com/vue/documentation/api/sankeytooltipsettingsmodel/#border) (BorderModel): Tooltip border configuration
  - [`opacity`](https://ej2.syncfusion.com/vue/documentation/api/sankeytooltipsettingsmodel/#opacity) (number): Tooltip opacity (default: 0.9)
  - [`textStyle`](https://ej2.syncfusion.com/vue/documentation/api/sankeytooltipsettingsmodel/#textstyle) (FontModel): Tooltip text styling
  - [`enableAnimation`](https://ej2.syncfusion.com/vue/documentation/api/sankeytooltipsettingsmodel/#enableanimation) (boolean): Enable tooltip animation (default: true)
  - [`fadeOutDuration`](https://ej2.syncfusion.com/vue/documentation/api/sankeytooltipsettingsmodel/#fadeoutduration) (number): Fade out duration in milliseconds (default: 1000)
  - [`fadeOutMode`](https://ej2.syncfusion.com/vue/documentation/api/sankeytooltipsettingsmodel/#fadeoutmode) (string): Fade out mode - `'Click'`, `'FocusOut'`, `'MouseMove'`, `'Delay'` (default: 'Delay')

---

### Theme and Appearance

#### [`theme`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#theme)
- **Type:** `string`
- **Default:** `'Material'`
- **Description:** Color theme for the chart. Options: `'Material'`, `'Bootstrap'`, `'Bootstrap4'`, `'Fabric'`, `'HighContrast'`, `'HighContrastLight'`, `'Tailwind'`, `'Bootstrap5'`.

#### [`background`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#background)
- **Type:** `string`
- **Default:** `'white'`
- **Description:** Background color of the chart container.

#### [`backgroundImage`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#backgroundimage)
- **Type:** `string`
- **Default:** `''`
- **Description:** URL of the background image for the chart.

#### [`border`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#border)
- **Type:** `BorderModel`
- **Default:** No border
- **Description:** Border configuration for the chart container.
- **Properties:**
  - [`color`](https://ej2.syncfusion.com/vue/documentation/api/bordermodel/#color) (string): Border color
  - [`width`](https://ej2.syncfusion.com/vue/documentation/api/bordermodel/#width) (number): Border width in pixels
  - [`dashArray`](https://ej2.syncfusion.com/vue/documentation/api/bordermodel/#dasharray) (string): Dash pattern (e.g., '2,2' for dashed border)

---

### Advanced Properties

#### [`animation`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#animation)
- **Type:** `AnimationModel`
- **Default:** `{ enable: true, duration: 400 }`
- **Description:** Configuration for chart rendering animation.
- **Properties:**
  - [`enable`](https://ej2.syncfusion.com/vue/documentation/api/animationmodel/#enable) (boolean): Enable/disable animation (default: true)
  - [`duration`](https://ej2.syncfusion.com/vue/documentation/api/animationmodel/#duration) (number): Animation duration in milliseconds (default: 400)

#### [`locale`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#locale)
- **Type:** `string`
- **Default:** `'en-US'`
- **Description:** Localization culture identifier for the component.

#### [`enablePersistence`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#enablepersistence)
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable state persistence across page reloads.

#### [`isRespike`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#isrespike)
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Controls whether the component should respect layout space requirements.

---

## Data Models

### SankeyNode Properties

Represents a node in the Sankey diagram.

```typescript
interface SankeyNodeModel {
  id: string;              // Unique node identifier (required)
  label?: LabelModel;      // Node label configuration
  color?: string;          // Node fill color
  offset?: number;         // Manual vertical offset for the node
}
```

#### [`id`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodemodel/#id)
- **Type:** `string`
- **Required:** `true`
- **Description:** Unique identifier for the node. Used in link `sourceId` and `targetId` references.

#### [`label`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodemodel/#label)
- **Type:** `LabelModel`
- **Description:** Label configuration for the node.
- **Properties:**
  - [`text`](https://ej2.syncfusion.com/vue/documentation/api/labelmodel/#text) (string): Label display text
  - [`fontFamily`](https://ej2.syncfusion.com/vue/documentation/api/labelmodel/#fontfamily) (string): Font family for the label
  - [`fontSize`](https://ej2.syncfusion.com/vue/documentation/api/labelmodel/#fontsize) (string): Font size for the label
  - [`color`](https://ej2.syncfusion.com/vue/documentation/api/labelmodel/#color) (string): Text color
  - [`fontStyle`](https://ej2.syncfusion.com/vue/documentation/api/labelmodel/#fontstyle) (string): Font style
  - [`fontWeight`](https://ej2.syncfusion.com/vue/documentation/api/labelmodel/#fontweight) (string): Font weight
  - [`alignment`](https://ej2.syncfusion.com/vue/documentation/api/labelmodel/#alignment) (string): Label alignment (Left, Center, Right)
  - [`padding`](https://ej2.syncfusion.com/vue/documentation/api/labelmodel/#padding) (number): Padding around label text

#### [`color`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodemodel/#color)
- **Type:** `string`
- **Description:** Fill color for the node. Overrides global `nodeStyle.fill`.

#### [`offset`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodemodel/#offset)
- **Type:** `number`
- **Description:** Manual vertical position adjustment for the node in pixels. Positive values move down, negative values move up.

---

### SankeyLink Properties

Represents a link/flow between two nodes.

```typescript
interface SankeyLinkModel {
  sourceId: string;        // Source node ID (required)
  targetId: string;        // Target node ID (required)
  value: number;           // Flow magnitude/weight (required)
  color?: string;          // Link color override
}
```

#### [`sourceId`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinkmodel/#sourceid)
- **Type:** `string`
- **Required:** `true`
- **Description:** Identifier of the source node. Must match an existing node ID.

#### [`targetId`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinkmodel/#targetid)
- **Type:** `string`
- **Required:** `true`
- **Description:** Identifier of the target node. Must match an existing node ID.

#### [`value`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinkmodel/#value)
- **Type:** `number`
- **Required:** `true`
- **Description:** Numeric value representing the flow magnitude. Determines link width. Must be positive.

#### [`color`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinkmodel/#color)
- **Type:** `string`
- **Description:** Fill color for this link. Overrides the global link color calculated from `linkStyle.colorType`.

---

### Node Settings

#### `SankeyNodeSettingsModel`

Global styling configuration applied to all nodes.

```typescript
interface SankeyNodeSettingsModel {
  width?: number;              // Node width in pixels (default: 40)
  padding?: number;            // Space between nodes (default: 35)
  fill?: string;               // Node fill color
  stroke?: string;             // Node border color
  strokeWidth?: number;        // Node border width in pixels
  opacity?: number;            // Node opacity 0-1
  highlightOpacity?: number;   // Opacity when highlighted
  inactiveOpacity?: number;    // Opacity when inactive
}
```

---

### Link Settings

#### `SankeyLinkSettingsModel`

Global styling configuration applied to all links.

```typescript
interface SankeyLinkSettingsModel {
  opacity?: number;            // Link opacity 0-1 (default: 0.5)
  highlightOpacity?: number;   // Opacity when highlighted (default: 1)
  inactiveOpacity?: number;    // Opacity when inactive (default: 0.2)
  colorType?: string;          // 'Source' | 'Target' | 'Blend'
  curvature?: number;          // Bezier curve factor 0-1 (default: 0.5)
}
```

---

### Label Settings

#### `SankeyLabelSettingsModel`

Configuration for node labels.

```typescript
interface SankeyLabelSettingsModel {
  visible?: boolean;           // Show/hide labels
  fontFamily?: string;         // Font family
  fontSize?: string;           // Font size
  fontStyle?: string;          // Font style
  fontWeight?: string;         // Font weight
  color?: string;              // Text color
  padding?: number;            // Padding around text
}
```

---

### Legend Settings

#### `SankeyLegendSettingsModel`

Configuration for the legend.

```typescript
interface SankeyLegendSettingsModel {
  visible?: boolean;           // Show/hide legend
  position?: string;           // Position: 'Top' | 'Bottom' | 'Left' | 'Right' | 'Auto' | 'Custom'
  background?: string;         // Background color
  border?: BorderModel;        // Border configuration
  opacity?: number;            // Legend opacity
  padding?: number;            // Internal padding
  itemPadding?: number;        // Padding between items
  shapeWidth?: number;         // Legend shape width
  shapeHeight?: number;        // Legend shape height
  shapePadding?: number;       // Padding between shape and text
  textStyle?: FontModel;       // Text styling
  title?: string;              // Legend title
  titleStyle?: FontModel;      // Title styling
  width?: string;              // Legend width
  height?: string;             // Legend height
  enableHighlight?: boolean;   // Enable highlighting on legend click
  reverse?: boolean;           // Reverse item order
  location?: LocationModel;    // Custom location when position='Custom'
  margin?: MarginModel;        // Legend margin
}
```

---

### Tooltip Settings

#### `SankeyTooltipSettingsModel`

Configuration for tooltip display.

```typescript
interface SankeyTooltipSettingsModel {
  enable?: boolean;            // Enable/disable tooltip
  format?: string;             // Tooltip format string
  border?: BorderModel;        // Border configuration
  opacity?: number;            // Tooltip opacity
  textStyle?: FontModel;       // Text styling
  enableAnimation?: boolean;   // Enable animation
  fadeOutDuration?: number;    // Fade out duration in ms
  fadeOutMode?: string;        // Fade mode: 'Click' | 'FocusOut' | 'MouseMove' | 'Delay'
}
```

---

### Supporting Models

#### [`BorderModel`](https://ej2.syncfusion.com/vue/documentation/api/bordermodel/)

```typescript
interface BorderModel {
  color?: string;              // Border color
  width?: number;              // Border width in pixels
  dashArray?: string;          // Dash pattern (e.g., '2,2')
}
```

#### [`MarginModel`](https://ej2.syncfusion.com/vue/documentation/api/marginmodel/)

```typescript
interface MarginModel {
  left?: number;               // Left margin in pixels
  right?: number;              // Right margin in pixels
  top?: number;                // Top margin in pixels
  bottom?: number;             // Bottom margin in pixels
}
```

#### [`LocationModel`](https://ej2.syncfusion.com/vue/documentation/api/locationmodel/)

```typescript
interface LocationModel {
  x?: number;                  // X coordinate in pixels
  y?: number;                  // Y coordinate in pixels
}
```

#### [`AnimationModel`](https://ej2.syncfusion.com/vue/documentation/api/animationmodel/)

```typescript
interface AnimationModel {
  enable?: boolean;            // Enable/disable animation
  duration?: number;           // Animation duration in milliseconds
}
```

#### [`FontModel`](https://ej2.syncfusion.com/vue/documentation/api/fontmodel/)

```typescript
interface FontModel {
  fontFamily?: string;         // Font family name
  fontSize?: string;           // Font size
  fontStyle?: string;          // Font style (Normal, Italic, Oblique)
  fontWeight?: string;         // Font weight (Normal, Bold, lighter, etc.)
  color?: string;              // Text color
  opacity?: number;            // Text opacity 0-1
  textAlignment?: string;      // Alignment (Left, Center, Right)
  textOverflow?: string;       // Overflow handling (Trim, Wrap)
}
```

#### [`LabelModel`](https://ej2.syncfusion.com/vue/documentation/api/labelmodel/)

```typescript
interface LabelModel {
  text?: string;               // Label text
  fontFamily?: string;         // Font family
  fontSize?: string;           // Font size
  color?: string;              // Text color
  fontStyle?: string;          // Font style
  fontWeight?: string;         // Font weight
  alignment?: string;          // Alignment
  padding?: number;            // Padding
}
```

---

## Events

Events can be subscribed using `@` directive in Vue templates or by binding methods to event properties.

### [`@nodeClick`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#nodeclick)
- **Trigger:** When a node is clicked
- **Parameter:** 
  ```typescript
  {
    nodeId: string;           // ID of clicked node
    nodeValue: number;        // Total value of node
    data: SankeyNodeModel;    // Node model
  }
  ```

### [`@linkClick`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#linkclick)
- **Trigger:** When a link is clicked
- **Parameter:**
  ```typescript
  {
    sourceId: string;         // Source node ID
    targetId: string;         // Target node ID
    value: number;            // Link value
    data: SankeyLinkModel;    // Link model
  }
  ```

### [`@nodeMouseMove`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#nodemousemove)
- **Trigger:** When mouse moves over a node
- **Parameter:** Node interaction data

### [`@linkMouseMove`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#linkmousemove)
- **Trigger:** When mouse moves over a link
- **Parameter:** Link interaction data

### [`@nodeMouseEnter`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#nodemouseenter)
- **Trigger:** When mouse enters a node
- **Parameter:** Node data

### [`@nodeMouseLeave`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#nodemouseleave)
- **Trigger:** When mouse leaves a node
- **Parameter:** Node data

### [`@linkMouseEnter`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#linkmouseenter)
- **Trigger:** When mouse enters a link
- **Parameter:** Link data

### [`@linkMouseLeave`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#linkmouseleave)
- **Trigger:** When mouse leaves a link
- **Parameter:** Link data

### [`@loaded`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#loaded)
- **Trigger:** After the chart is fully rendered
- **Parameter:** Chart instance

### [`@load`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#load)
- **Trigger:** Before the chart is rendered
- **Parameter:** Chart loading event data

### [`@beforePrint`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#beforeprint)
- **Trigger:** Before print operation
- **Parameter:** Print event data

### [`@afterPrint`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#afterprint)
- **Trigger:** After print operation
- **Parameter:** Print event data

### [`@beforeExport`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#beforeexport)
- **Trigger:** Before export operation
- **Parameter:** Export event data

### [`@afterExport`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#afterexport)
- **Trigger:** After export operation
- **Parameter:** Export event data

### [`@sizeChanged`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#sizechanged)
- **Trigger:** When chart size changes
- **Parameter:** Size change event data

### [`@tooltipInitialize`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#tooltipinitialized)
- **Trigger:** When tooltip is initialized
- **Parameter:** Tooltip initialization data

### [`@legendItemClick`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#legenditemclick)
- **Trigger:** When a legend item is clicked
- **Parameter:** Legend item click data

---

## Methods

### [`export(type: string, fileName: string)`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#export)
- **Description:** Exports the chart in specified format.
- **Parameters:**
  - `type` (string): Export format - `'PDF'`, `'PNG'`, `'SVG'`, `'JPEG'`
  - `fileName` (string): Output file name
- **Returns:** `void`

### [`print()`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#print)
- **Description:** Prints the chart.
- **Returns:** `void`

### [`refresh()`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#refresh)
- **Description:** Refreshes the chart rendering.
- **Returns:** `void`

### [`setTheme(theme: string)`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#settheme)
- **Description:** Changes the chart theme dynamically.
- **Parameters:**
  - `theme` (string): Theme name
- **Returns:** `void`

---

## Enums

### [`Orientation`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#orientation)
```typescript
enum Orientation {
  Horizontal = 'Horizontal',
  Vertical = 'Vertical'
}
```

### [`ColorType`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinksettingsmodel/#colortype)
```typescript
enum ColorType {
  Source = 'Source',
  Target = 'Target',
  Blend = 'Blend'
}
```

### [`LegendPosition`](https://ej2.syncfusion.com/vue/documentation/api/sankeylegendsettingsmodel/#position)
```typescript
enum LegendPosition {
  Top = 'Top',
  Bottom = 'Bottom',
  Left = 'Left',
  Right = 'Right',
  Auto = 'Auto',
  Custom = 'Custom'
}
```

### [`ChartTheme`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#theme)
```typescript
enum ChartTheme {
  Material = 'Material',
  Bootstrap = 'Bootstrap',
  Bootstrap4 = 'Bootstrap4',
  Fabric = 'Fabric',
  HighContrast = 'HighContrast',
  HighContrastLight = 'HighContrastLight',
  Tailwind = 'Tailwind',
  Bootstrap5 = 'Bootstrap5'
}
```

### [`Alignment`](https://ej2.syncfusion.com/vue/documentation/api/sankeytitlestylemodel/#textalignment)
```typescript
enum Alignment {
  Left = 'Left',
  Center = 'Center',
  Right = 'Right'
}
```

### [`FadeOutMode`](https://ej2.syncfusion.com/vue/documentation/api/sankeytooltipsettingsmodel/#fadeoutmode)
```typescript
enum FadeOutMode {
  Click = 'Click',
  FocusOut = 'FocusOut',
  MouseMove = 'MouseMove',
  Delay = 'Delay'
}
```

---

## Child Directives

### [`e-sankey-nodes-collection`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#nodes) (Vue 2) / [`ESankeyNodesCollection`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#nodes) (Vue 3)

Collection directive for nodes. Contains `e-sankey-node` directives.

```vue
<e-sankey-nodes-collection>
  <e-sankey-node id="Node1" />
  <e-sankey-node id="Node2" />
</e-sankey-nodes-collection>
```

### [`e-sankey-node`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodemodel/) (Vue 2) / [`ESankeyNode`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodemodel/) (Vue 3)

Individual node directive with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| [`id`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodemodel/#id) | string | Unique node identifier (required) |
| [`label`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodemodel/#label) | LabelModel | Node label configuration |
| [`color`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodemodel/#color) | string | Node fill color |
| [`offset`](https://ej2.syncfusion.com/vue/documentation/api/sankeynodemodel/#offset) | number | Manual vertical offset |

### [`e-sankey-links-collection`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#links) (Vue 2) / [`ESankeyLinksCollection`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#links) (Vue 3)

Collection directive for links. Contains `e-sankey-link` directives.

```vue
<e-sankey-links-collection>
  <e-sankey-link sourceId="Node1" targetId="Node2" :value="100" />
</e-sankey-links-collection>
```

### [`e-sankey-link`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinkmodel/) (Vue 2) / [`ESankeyLink`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinkmodel/) (Vue 3)

Individual link directive with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| [`sourceId`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinkmodel/#sourceid) | string | Source node ID (required) |
| [`targetId`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinkmodel/#targetid) | string | Target node ID (required) |
| [`value`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinkmodel/#value) | number | Flow magnitude (required) |
| [`color`](https://ej2.syncfusion.com/vue/documentation/api/sankeylinkmodel/#color) | string | Link color override |

---

## Module Registration

Modules must be registered in the `provide` option for features to be available.

### Available Modules

| Module | Feature |
|--------|---------|
| [`SankeyTooltip`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#tooltip) | Tooltip display on hover |
| [`SankeyLegend`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#legendsettings) | Legend display and interaction |
| [`SankeyExport`](https://ej2.syncfusion.com/vue/documentation/api/sankey/#export) | Export to PDF, PNG, SVG, JPEG |

### Registration Example

```typescript
// Vue 3 Composition API
import { provide } from 'vue';
import { SankeyTooltip, SankeyLegend, SankeyExport } from '@syncfusion/ej2-vue-charts';

provide('sankey', [SankeyTooltip, SankeyLegend, SankeyExport]);
```

```typescript
// Vue 3 Options API
import { SankeyTooltip, SankeyLegend, SankeyExport } from '@syncfusion/ej2-vue-charts';

export default {
  provide: {
    sankey: [SankeyTooltip, SankeyLegend, SankeyExport]
  }
};
```

---

## Common Usage Patterns

### Basic Sankey Chart

```vue
<template>
  <ejs-sankey width="100%" height="420px">
    <e-sankey-nodes-collection>
      <e-sankey-node id="Source" :label="{ text: 'Source' }" />
      <e-sankey-node id="Target" :label="{ text: 'Target' }" />
    </e-sankey-nodes-collection>

    <e-sankey-links-collection>
      <e-sankey-link sourceId="Source" targetId="Target" :value="100" />
    </e-sankey-links-collection>
  </ejs-sankey>
</template>

<script setup>
import { provide } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';

provide('sankey', [SankeyTooltip, SankeyLegend]);
</script>
```

### With Styling and Tooltip

```vue
<template>
  <ejs-sankey
    width="100%"
    height="500px"
    :title="'Energy Flow'"
    :tooltip="{ enable: true }"
    :linkStyle="{ opacity: 0.6, curvature: 0.55, colorType: 'Source' }"
    :nodeStyle="{ width: 40, padding: 35 }"
  >
    <e-sankey-nodes-collection>
      <e-sankey-node id="Solar" :label="{ text: 'Solar' }" />
      <e-sankey-node id="Wind" :label="{ text: 'Wind' }" />
      <e-sankey-node id="Grid" :label="{ text: 'Grid' }" />
    </e-sankey-nodes-collection>

    <e-sankey-links-collection>
      <e-sankey-link sourceId="Solar" targetId="Grid" :value="300" />
      <e-sankey-link sourceId="Wind" targetId="Grid" :value="200" />
    </e-sankey-links-collection>
  </ejs-sankey>
</template>

<script setup>
import { ref, provide } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';

provide('sankey', [SankeyTooltip, SankeyLegend]);
</script>
```

### With Events

```vue
<template>
  <ejs-sankey
    width="100%"
    height="420px"
    @nodeClick="onNodeClick"
    @linkClick="onLinkClick"
  >
    <!-- nodes and links -->
  </ejs-sankey>
</template>

<script setup>
function onNodeClick(args) {
  console.log('Node clicked:', args.nodeId);
}

function onLinkClick(args) {
  console.log('Link clicked:', args.sourceId, '->', args.targetId);
}
</script>
```

### With Legend and RTL

```vue
<template>
  <ejs-sankey
    width="100%"
    height="420px"
    :enableRtl="true"
    :legendSettings="{ visible: true, position: 'Bottom' }"
  >
    <!-- nodes and links -->
  </ejs-sankey>
</template>

<script setup>
import { ref } from 'vue';

const legendSettings = ref({
  visible: true,
  position: 'Bottom',
  enableHighlight: true,
  itemPadding: 8
});
</script>
```

---

## Additional Resources

- **Official Documentation:** [Syncfusion Vue Sankey Chart](https://ej2.syncfusion.com/vue/documentation/sankey/)
- **API Reference:** [SankeyComponent API](https://ej2.syncfusion.com/vue/documentation/api/sankey/)
- **GitHub Examples:** [Syncfusion Vue Samples](https://github.com/syncfusion/ej2-vue-samples)
- **Syncfusion Support:** [support@syncfusion.com](mailto:support@syncfusion.com)

---

## Notes

- All node IDs must be unique within the diagram.
- Link `sourceId` and `targetId` must reference existing node IDs.
- Link `value` must be a positive numeric value.
- For best rendering performance, keep the number of nodes under 1000 and links under 5000.
- The chart is responsive by default with `width="100%"`, but explicit height is recommended.
- RTL layout is automatically applied when `enableRtl` is set to `true`.
- Custom node offsets allow manual positioning adjustments after automatic layout calculation.
