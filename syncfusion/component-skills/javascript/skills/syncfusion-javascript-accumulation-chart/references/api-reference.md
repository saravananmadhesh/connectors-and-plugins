````markdown
# API Reference - Accumulation Chart

## Table of Contents
- [Main Control](#main-control)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Interfaces & Models](#interfaces--models)
- [Modules & Injection](#modules--injection)
- [Enums & Constants](#enums--constants)

## Main Control

### AccumulationChart

**Path:** `@syncfusion/ej2-charts`

The main AccumulationChart control class. Represents the AccumulationChart control for creating pie, doughnut, funnel, and pyramid visualizations.

```typescript
import { AccumulationChart } from '@syncfusion/ej2-charts';

const chart = new AccumulationChart(options, elementId);
```

**Reference:** [API Documentation](https://ej2.syncfusion.com/documentation/api/accumulation-chart/)

---

## Properties

### Data Properties

| Property | Type | Default | Description | Link |
|----------|------|---------|-------------|------|
| `dataSource` | `Object \| DataManager` | `''` | Data source for accumulation chart | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#datasource) |
| `series` | `AccumulationSeriesModel[]` | - | Series configuration array | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accumulationseriesmodel/) |
| `xName` | `string` | - | X-axis field name (series-level) | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accumulationseriesmodel/#xname) |
| `yName` | `string` | - | Y-axis field name (series-level) | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accumulationseriesmodel/#yname) |

### Display Properties

| Property | Type | Default | Description | Link |
|----------|------|---------|-------------|------|
| `title` | `string` | `null` | Chart title text | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#title) |
| `titleStyle` | `TitleStyleSettingsModel` | - | Title styling options | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/titlestylesettingsmodel/) |
| `subTitle` | `string` | `null` | Chart subtitle text | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#subtitle) |
| `subTitleStyle` | `TitleStyleSettingsModel` | - | Subtitle styling options | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/titlestylesettingsmodel/) |
| `height` | `string` | `null` | Chart height (px or %) | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#height) |
| `width` | `string` | `null` | Chart width (px or %) | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#width) |
| `background` | `string` | `null` | Chart background color | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#background) |
| `backgroundImage` | `string` | `null` | Chart background image URL | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#backgroundimage) |
| `border` | `BorderModel` | - | Chart border options | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/bordermodel/) |
| `margin` | `MarginModel` | - | Chart margins | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/marginmodel/) |

### Legend Properties

| Property | Type | Default | Description | Link |
|----------|------|---------|-------------|------|
| `legendSettings` | `LegendSettingsModel` | - | Legend configuration | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/legendsettingsmodel/) |

### Interaction Properties

| Property | Type | Default | Description | Link |
|----------|------|---------|-------------|------|
| `tooltip` | `TooltipSettingsModel` | - | Tooltip configuration | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/tooltipsettingsmodel/) |
| `selectionMode` | `AccumulationSelectionMode` | `'None'` | Selection mode (Point, Series, None) | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accumulationselectionmode/) |
| `selectionPattern` | `SelectionPattern` | `'None'` | Selection pattern style | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/selectionpattern/) |
| `highlightMode` | `AccumulationHighlightMode` | `'None'` | Highlight mode on hover | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accumulationhighlightmode/) |
| `highlightPattern` | `SelectionPattern` | `'None'` | Highlight pattern style | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/selectionpattern/) |
| `highlightColor` | `string` | `''` | Highlight color on hover | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#highlightcolor) |
| `selectedDataIndexes` | `IndexesModel[]` | `[]` | Pre-selected data points | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/indexesmodel/) |
| `isMultiSelect` | `boolean` | `false` | Enable multi-point selection | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#ismultiselect) |

### Pie/Doughnut Properties

| Property | Type | Default | Description | Link |
|----------|------|---------|-------------|------|
| `center` | `PieCenterModel` | - | Pie chart center position | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/piecentermodel/) |
| `centerLabel` | `CenterLabelModel` | - | Center label for doughnut | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/centerlabelmodel/) |

### Animation & Behavior

| Property | Type | Default | Description | Link |
|----------|------|---------|-------------|------|
| `enableAnimation` | `boolean` | `true` | Enable chart animations | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#enableanimation) |
| `enableSmartLabels` | `boolean` | `true` | Enable smart label positioning | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#enablesmartlabels) |
| `enableBorderOnMouseMove` | `boolean` | `true` | Show border on mouse move | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#enableborderonmousemove) |

### Export & Print Properties

| Property | Type | Default | Description | Link |
|----------|------|---------|-------------|------|
| `enableExport` | `boolean` | `true` | Enable export functionality | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#enableexport) |

### Theme & Localization

| Property | Type | Default | Description | Link |
|----------|------|---------|-------------|------|
| `theme` | `AccumulationTheme` | `'Material'` | Chart theme (Material, Bootstrap, Fluent, etc.) | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accumulationtheme/) |
| `locale` | `string` | `'en-US'` | Localization culture code | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#locale) |
| `enableRtl` | `boolean` | `false` | Enable right-to-left rendering | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#enablertl) |

### Accessibility & Features

| Property | Type | Default | Description | Link |
|----------|------|---------|-------------|------|
| `accessibility` | `AccessibilityModel` | - | Accessibility configuration | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accessibilitymodel/) |
| `annotations` | `AccumulationAnnotationSettingsModel[]` | - | Annotations array | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accumulationannotationsettingsmodel/) |
| `enableHtmlSanitizer` | `boolean` | `false` | Sanitize HTML content | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#enablehtmlsanitizer) |
| `enablePersistence` | `boolean` | `false` | Persist state on reload | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#enablepersistence) |
| `noDataTemplate` | `string \| Function` | `null` | Template for empty data | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#nodatatemplate) |

### Additional Properties

| Property | Type | Default | Description | Link |
|----------|------|---------|-------------|------|
| `useGroupingSeparator` | `boolean` | `false` | Use thousand separators | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#usegroupingseparator) |
| `resizeRedraw` | `boolean` | - | Redraw on resize | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/) |

---

## Methods

### Core Control Methods

| Method | Parameters | Returns | Description | Link |
|--------|-----------|---------|-------------|------|
| `appendTo()` | `selector?: string \| HTMLElement` | `void` | Append control to element | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#appendto) |
| `refresh()` | - | `void` | Refresh and redraw chart | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#refresh) |
| `dataBind()` | - | `void` | Apply pending property changes | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#databind) |
| `getRootElement()` | - | `HTMLElement` | Get root element | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#getrootelement) |

### Export & Print Methods

| Method | Parameters | Returns | Description | Link |
|--------|-----------|---------|-------------|------|
| `export()` | `type: ExportType`, `fileName: string` | `void` | Export chart to PNG/SVG/PDF | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#export) |
| `print()` | `id?: string[] \| string \| Element` | `void` | Print chart | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#print) |

### Data & Calculation Methods

| Method | Parameters | Returns | Description | Link |
|--------|-----------|---------|-------------|------|
| `calculateBounds()` | - | `void` | Calculate chart bounds | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#calculatebounds) |
| `setAnnotationValue()` | `annotationIndex: number`, `content: string` | `void` | Set annotation content | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#setannotationvalue) |

### Event Handling Methods

| Method | Parameters | Returns | Description | Link |
|--------|-----------|---------|-------------|------|
| `addEventListener()` | `eventName: string`, `handler: Function` | `void` | Add event listener | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#addeventlistener) |
| `removeEventListener()` | `eventName: string`, `handler: Function` | `void` | Remove event listener | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#removeeventlistener) |

### Module Injection

| Method | Parameters | Returns | Description | Link |
|--------|-----------|---------|-------------|------|
| `Inject()` | `moduleList: Function[]` | `void` | Inject required modules | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#inject) |

---

## Events

### Lifecycle Events

| Event | Type | Description | Link |
|-------|------|-------------|------|
| `load` | `EmitType<IAccLoadedEventArgs>` | Triggers before chart load | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#load) |
| `loaded` | `EmitType<IAccLoadedEventArgs>` | Triggers after chart load | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#loaded) |
| `beforeResize` | `EmitType<IAccBeforeResizeEventArgs>` | Triggers before resize | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#beforeresize) |
| `resized` | `EmitType<IAccResizeEventArgs>` | Triggers after resize | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#resized) |

### Rendering Events

| Event | Type | Description | Link |
|-------|------|-------------|------|
| `seriesRender` | `EmitType<IAccSeriesRenderEventArgs>` | Triggers before series render | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#seriesrender) |
| `pointRender` | `EmitType<IAccPointRenderEventArgs>` | Triggers before each point render | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#pointrender) |
| `textRender` | `EmitType<IAccTextRenderEventArgs>` | Triggers before text label render | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#textrender) |
| `annotationRender` | `EmitType<IAnnotationRenderEventArgs>` | Triggers before annotation render | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#annotationrender) |
| `animationComplete` | `EmitType<IAccAnimationCompleteEventArgs>` | Triggers when animation completes | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#animationcomplete) |

### Legend Events

| Event | Type | Description | Link |
|-------|------|-------------|------|
| `legendRender` | `EmitType<ILegendRenderEventArgs>` | Triggers before legend render | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#legendrender) |
| `legendClick` | `EmitType<IAccLegendClickEventArgs>` | Triggers on legend click | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#legendclick) |

### Interaction Events

| Event | Type | Description | Link |
|-------|------|-------------|------|
| `chartMouseClick` | `EmitType<IMouseEventArgs>` | Triggers on chart click | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#chartmouseclick) |
| `chartDoubleClick` | `EmitType<IMouseEventArgs>` | Triggers on double click | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#chartdoubleclick) |
| `chartMouseDown` | `EmitType<IMouseEventArgs>` | Triggers on mouse down | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#chartmousedown) |
| `chartMouseUp` | `EmitType<IMouseEventArgs>` | Triggers on mouse up | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#chartmouseup) |
| `chartMouseMove` | `EmitType<IMouseEventArgs>` | Triggers on mouse move | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#chartmousemove) |
| `chartMouseLeave` | `EmitType<IMouseEventArgs>` | Triggers on mouse leave | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#chartmouseleave) |

### Point & Selection Events

| Event | Type | Description | Link |
|-------|------|-------------|------|
| `pointClick` | `EmitType<IPointEventArgs>` | Triggers on point click | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#pointclick) |
| `pointMove` | `EmitType<IPointEventArgs>` | Triggers on point move | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#pointmove) |
| `selectionComplete` | `EmitType<IAccSelectionCompleteEventArgs>` | Triggers when selection completes | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#selectioncomplete) |

### Tooltip & Export Events

| Event | Type | Description | Link |
|-------|------|-------------|------|
| `tooltipRender` | `EmitType<ITooltipRenderEventArgs>` | Triggers before tooltip render | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#tooltiprender) |
| `beforeExport` | `EmitType<IExportEventArgs>` | Triggers before export | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#beforeexport) |
| `afterExport` | `EmitType<IAfterExportEventArgs>` | Triggers after export | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#afterexport) |
| `beforePrint` | `EmitType<IPrintEventArgs>` | Triggers before print | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/#beforeprint) |

---

## Interfaces & Models

### Core Series Model

| Interface | Description | Link |
|-----------|-------------|------|
| `AccumulationSeriesModel` | Series configuration model for accumulation charts | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accumulationseriesmodel/) |

### Styling & Appearance Models

| Interface | Description | Link |
|-----------|-------------|------|
| `BorderModel` | Border configuration | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/bordermodel/) |
| `MarginModel` | Margin configuration | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/marginmodel/) |
| `TitleStyleSettingsModel` | Title styling configuration | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/titlestylesettingsmodel/) |
| `LegendSettingsModel` | Legend configuration | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/legendsettingsmodel/) |
| `TooltipSettingsModel` | Tooltip configuration | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/tooltipsettingsmodel/) |

### Pie/Doughnut Models

| Interface | Description | Link |
|-----------|-------------|------|
| `PieCenterModel` | Pie chart center position configuration | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/piecentermodel/) |
| `CenterLabelModel` | Center label configuration for doughnut | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/centerlabelmodel/) |

### Data Point & Selection Models

| Interface | Description | Link |
|-----------|-------------|------|
| `IndexesModel` | Index configuration for selected points | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/indexesmodel/) |
| `AccumulationAnnotationSettingsModel` | Annotation configuration | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accumulationannotationsettingsmodel/) |
| `AccessibilityModel` | Accessibility configuration | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accessibilitymodel/) |

### Event Argument Interfaces

| Interface | Description | Link |
|-----------|-------------|------|
| `IAccLoadedEventArgs` | Event args for loaded event | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/iaccloadedeventargs/) |
| `IAccPointRenderEventArgs` | Event args for point render | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/iaccpointrendereventargs/) |
| `IAccSeriesRenderEventArgs` | Event args for series render | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/iaccseriesrendereventargs/) |
| `IAccTextRenderEventArgs` | Event args for text render | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/iacctextrendereventargs/) |
| `IExportEventArgs` | Event args for export | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/iexporteventargs/) |
| `IAccSelectionCompleteEventArgs` | Event args for selection | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/iaccselectioncompleteeventargs/) |
| `IAccAnimationCompleteEventArgs` | Event args for animation complete | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/iaccanimationcompleteeventargs/) |
| `IAccBeforeResizeEventArgs` | Event args for before resize | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/iaccbeforeresizeeventargs/) |
| `IAccResizeEventArgs` | Event args for resize complete | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/iaccresizeeventargs/) |
| `IAccLegendClickEventArgs` | Event args for legend click | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/iacclegendclickeventargs/) |
| `IAnnotationRenderEventArgs` | Event args for annotation render | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/iannotationrendereventargs/) |

---

## Modules & Injection

### Required Modules

To use AccumulationChart features, inject the corresponding modules using `AccumulationChart.Inject()`:

| Module | Import Path | Used For | Link |
|--------|--------------|----------|------|
| `PieSeries` | `@syncfusion/ej2-charts` | Pie charts | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/) |
| `DoughnutSeries` | `@syncfusion/ej2-charts` | Doughnut charts | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/) |
| `FunnelSeries` | `@syncfusion/ej2-charts` | Funnel charts | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/) |
| `PyramidSeries` | `@syncfusion/ej2-charts` | Pyramid charts | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/) |
| `AccumulationDataLabel` | `@syncfusion/ej2-charts` | Data labels | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/) |
| `AccumulationLegend` | `@syncfusion/ej2-charts` | Legend | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/) |
| `Tooltip` | `@syncfusion/ej2-charts` | Tooltips | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/) |
| `AccumulationSelection` | `@syncfusion/ej2-charts` | Selection | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/) |
| `AccumulationHighlight` | `@syncfusion/ej2-charts` | Highlight on hover | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/) |
| `AccumulationAnnotation` | `@syncfusion/ej2-charts` | Annotations | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/) |
| `Export` | `@syncfusion/ej2-charts` | Export functionality | [Docs](https://ej2.syncfusion.com/documentation/api/accumulation-chart/) |

### Module Injection Example

```typescript
import { 
  AccumulationChart, 
  PieSeries, 
  AccumulationDataLabel,
  AccumulationLegend, 
  Tooltip,
  AccumulationSelection,
  AccumulationAnnotation,
  Export
} from '@syncfusion/ej2-charts';

// Inject modules
AccumulationChart.Inject(
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  Tooltip,
  AccumulationSelection,
  AccumulationAnnotation,
  Export
);
```

---

## Enums & Constants

### AccumulationSelectionMode

Selection mode for data points:
- `'None'` - No selection
- `'Point'` - Select individual points
- `'Series'` - Select entire series

[Link](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accumulationselectionmode/)

### AccumulationHighlightMode

Highlight mode on hover:
- `'None'` - No highlight
- `'Point'` - Highlight individual points

[Link](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accumulationhighlightmode/)

### SelectionPattern

Pattern for selection and highlighting:
- `'None'`
- `'Chessboard'`
- `'Dots'`
- `'DiagonalForward'`
- `'DiagonalBackward'`
- `'Crosshatch'`
- `'Pacman'`
- `'Grid'`
- `'Turquoise'`
- `'Star'`
- `'Triangle'`
- `'Circle'`
- `'Tile'`
- `'HorizontalDash'`
- `'VerticalDash'`
- `'Rectangle'`
- `'Box'`
- `'VerticalStripe'`
- `'HorizontalStripe'`
- `'Bubble'`

[Link](https://ej2.syncfusion.com/documentation/api/accumulation-chart/selectionpattern/)

### AccumulationTheme

Available themes:
- `'Material'` (default)
- `'Bootstrap'`
- `'Bootstrap4'`
- `'Bootstrap5'`
- `'BootstrapDark'`
- `'Bootstrap5Dark'`
- `'Fabric'`
- `'FabricDark'`
- `'HighContrast'`
- `'HighContrastLight'`
- `'Fluent'`
- `'FluentDark'`
- `'Fluent2'`
- `'Fluent2Dark'`
- `'Fluent2HighContrast'`
- `'Tailwind'`
- `'TailwindDark'`
- `'Material3'`
- `'Material3Dark'`
- `'MaterialDark'`

[Link](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accumulationtheme/)

### ExportType

Export format types:
- `'PNG'` - Export as PNG image
- `'SVG'` - Export as SVG
- `'PDF'` - Export as PDF
- `'XLSX'` - Export as Excel
- `'CSV'` - Export as CSV

### AccumulationChartType (Series Type)

Chart types:
- `'Pie'` - Pie chart
- `'Doughnut'` - Doughnut chart
- `'Funnel'` - Funnel chart
- `'Pyramid'` - Pyramid chart

---

## Quick Reference Links

**Official API Documentation:**
- [AccumulationChart Main API](https://ej2.syncfusion.com/documentation/api/accumulation-chart/)
- [Full API Documentation](https://ej2.syncfusion.com/documentation/api/accumulation-chart/index-default)

**GitHub Repository:**
- [Syncfusion EJ2 Charts - GitHub](https://github.com/syncfusion/ej2-charts)

**NPM Package:**
- [@syncfusion/ej2-charts - NPM](https://www.npmjs.com/package/@syncfusion/ej2-charts)

---

## Common API Patterns

### Pattern 1: Initialize with Modules
```typescript
import { AccumulationChart, PieSeries, AccumulationDataLabel } from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PieSeries, AccumulationDataLabel);

const chart = new AccumulationChart({
  series: [{ dataSource: data, xName: 'x', yName: 'y', type: 'Pie' }]
}, '#chart');
```

### Pattern 2: Access Properties & Methods
```typescript
// Get property
const currentTheme = chart.theme;

// Set property
chart.title = 'New Title';
chart.refresh();

// Call method
chart.export('PNG', 'chart.png');
```

### Pattern 3: Handle Events
```typescript
const chart = new AccumulationChart({
  series: [{ dataSource: data, xName: 'x', yName: 'y', type: 'Pie' }],
  loaded: (args) => { console.log('Chart loaded'); },
  pointClick: (args) => { console.log('Point clicked'); }
}, '#chart');
```

---

## Related References

- [Accumulation Series API](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accumulationseriesmodel/)
- [Legend Settings API](https://ej2.syncfusion.com/documentation/api/accumulation-chart/legendsettingsmodel/)
- [Tooltip Settings API](https://ej2.syncfusion.com/documentation/api/accumulation-chart/tooltipsettingsmodel/)
- [Data Label API](https://ej2.syncfusion.com/documentation/api/accumulation-chart/accumulationdatalabel/)
- [Center Label API](https://ej2.syncfusion.com/documentation/api/accumulation-chart/centerlabelmodel/)

````
