# Syncfusion Angular Chart API Reference Guide

This document provides a comprehensive overview of the Syncfusion Angular Chart API documentation. All API documentation is available online at the official Syncfusion documentation site.

**Base URL:** https://ej2.syncfusion.com/angular/documentation/api/chart/

---

## ⚠️ API Accuracy Standards (Skill Development Requirements)

### **4 Key Areas to Ensure Accurate API Documentation**

This section outlines the quality standards for maintaining accurate API references in skill files. Following these practices ensures developers can rely on documentation for correct implementation.

---

### **1. Use Authoritative API Documentation**

**Why This Matters:**
API property names are critical — a single character difference breaks functionality. Syncfusion APIs use precise naming conventions that must be followed exactly.

**Problem Example:**
```typescript
// ❌ WRONG - Property doesn't exist
public legend = { visible: true };
<ejs-chart [legend]="legend">
```

**Solution:**
```typescript
// ✅ CORRECT - Verified against official Syncfusion API
public legendSettings: LegendSettingsModel = { visible: true };
<ejs-chart [legendSettings]="legendSettings">
```

**Your Checklist Before Documenting Any Property:**
- [ ] Verify property name against official Syncfusion docs: https://ej2.syncfusion.com/angular/documentation/api/chart/
- [ ] Check TypeScript interface definitions in `@syncfusion/ej2-angular-charts` package
- [ ] Confirm property type (object, string, boolean, enum, Model interface)
- [ ] Test in IDE with IntelliSense — TypeScript should recognize the property
- [ ] Verify the property exists in your installed version (check package.json version)
- [ ] Check release notes for version-specific changes or deprecations

**Common Naming Pitfalls:**
| ❌ WRONG | ✅ CORRECT | Why |
|-----------|-----------|-----|
| `[legend]` | `[legendSettings]` | Syncfusion uses `Settings` suffix for configuration objects |
| `[tooltip]` alone | `[tooltip]` + `[tooltipRender]` | Some properties require event handlers for full functionality |
| `marker="{ ... }"` | `[marker]="markerSettings"` on `<e-series>` | Marker settings are per-series, not global |
| `series.marker` | Use `<e-marker>` directive inside `<e-series>` | Different binding patterns for nested configs |

---

### **2. Document API Property Names Explicitly**

**Why This Matters:**
Developers need clear documentation showing:
- The exact property name to use in templates
- What type of value the property expects
- Where to find the property (in component or series)
- Link to official documentation for details

**Poor Documentation (Before):**
```typescript
public legend = {
  visible: true,
  position: 'Top',
  alignment: 'Center'
};
```
**Problems:** No context, unclear property name, no type info, no documentation link

**Improved Documentation (After):**
```typescript
/**
 * Legend configuration for the Chart component
 * 
 * ⚠️ API PROPERTY NAME: legendSettings (NOT "legend")
 * TypeScript Interface: LegendSettingsModel
 * Template Binding: [legendSettings]="legendSettings"
 * Official Docs: https://ej2.syncfusion.com/angular/documentation/api/chart/legendSettingsModel
 * 
 * @property visible - Show/hide legend (default: true)
 *   Type: boolean
 *   Values: true | false
 * 
 * @property position - Legend placement on chart
 *   Type: LegendPosition (enum)
 *   Values: 'Top' | 'Bottom' | 'Left' | 'Right' | 'Custom'
 *   Default: 'Top'
 * 
 * @property alignment - Legend horizontal/vertical alignment
 *   Type: Alignment (enum)
 *   Values: 'Near' | 'Center' | 'Far'
 *   Default: 'Center'
 * 
 * Example:
 * ```typescript
 * public legendSettings: LegendSettingsModel = {
 *   visible: true,
 *   position: 'Bottom',
 *   alignment: 'Center'
 * };
 * ```
 * 
 * Template:
 * ```html
 * <ejs-chart [legendSettings]="legendSettings">
 * </ejs-chart>
 * ```
 */
public legendSettings: LegendSettingsModel = {
  visible: true,
  position: 'Top',
  alignment: 'Center'
};
```

**Documentation Template for Any Property:**
```markdown
### [Property Name]

**API Property Name:** `[propertyName]`  
**Type:** `InterfaceNameModel`  
**Default:** `value`  
**Official Docs:** [Link to Syncfusion API]  

**Parameters:**
| Property | Type | Values | Default | Description |
|----------|------|--------|---------|-------------|
| subProp1 | type | enum values | default | Purpose |

**Code Example:**
```typescript
public propertyName: InterfaceNameModel = { ... };
```

**Template Usage:**
```html
<ejs-chart [propertyName]="propertyName">
</ejs-chart>
```

**Common Issues:**
- ❌ [Issue]
- ✅ [Solution]
```

---

### **3. Add TypeScript Interfaces for Type Safety**

**Why This Matters:**
TypeScript strict mode requires proper type definitions. Vague typing leads to:
- IDE autocomplete not working
- TypeScript compilation errors
- Runtime surprises
- Code that's hard to maintain

**Without Type Safety (Problem):**
```typescript
export class App implements OnInit {
  public legend = { ... };  // Could be any object — no type checking
  public tooltip = { ... }; // IDE has no idea what properties are valid
  
  ngOnInit() {
    this.legend.visiblexxx = true; // Typo! TypeScript won't catch this
  }
}
```

**With Type Safety (Solution):**
```typescript
import { 
  ChartModule, 
  LegendSettingsModel,
  TooltipSettingsModel,
  AxisModel,
  SeriesModel
} from '@syncfusion/ej2-angular-charts';

export class App implements OnInit {
  // TypeScript knows exactly what properties are allowed
  public legendSettings: LegendSettingsModel = {
    visible: true,
    position: 'Bottom'
  };
  
  public tooltip: TooltipSettingsModel = {
    enable: true,
    format: '${point.x}: ${point.y}'
  };
  
  ngOnInit() {
    // ✅ IDE autocomplete suggests valid properties
    this.legendSettings.visible = false;
    
    // ❌ TypeScript catches typos immediately
    // this.legendSettings.visiblexxx = true; 
    // Error: Property 'visiblexxx' does not exist on type 'LegendSettingsModel'
  }
}
```

**Benefits of Type Safety:**
- ✅ IDE IntelliSense shows available properties
- ✅ TypeScript compiler catches errors at development time (not runtime)
- ✅ Self-documents expected structure
- ✅ Refactoring tools work correctly
- ✅ Reduces debugging time
- ✅ Code is easier to understand

**How to Find TypeScript Interfaces:**
1. Install Syncfusion package: `npm install @syncfusion/ej2-angular-charts`
2. Look in `node_modules/@syncfusion/ej2-angular-charts/src/chart/` for `.d.ts` files
3. Or check official TypeScript definitions: https://ej2.syncfusion.com/angular/documentation/api/chart/

**Import Statement Template:**
```typescript
import { 
  ChartModule,           // Main module
  LegendSettingsModel,   // Legend config interface
  TooltipSettingsModel,  // Tooltip config interface
  AxisModel,             // Axis config interface
  SeriesModel,           // Series config interface
  // Add other needed interfaces...
} from '@syncfusion/ej2-angular-charts';
```

---

### **4. Create Property Mapping Reference with Naming Conventions**

**Why This Matters:**
Developers often don't know:
- What the exact component property name is
- How it's referenced in templates
- If it's singular or plural
- If it uses "Settings" suffix or not
- Where it's configured (chart, series, or elsewhere)

**Create a Property Mapping Table in Documentation:**

| Component | Template Binding | Component Property | Type | Status | Note |
|-----------|------------------|-------------------|------|--------|------|
| Chart | `[legendSettings]` | `legendSettings` | `LegendSettingsModel` | ✅ Correct | NOT `[legend]` |
| Chart | `[tooltipRender]` | `tooltipRender` | `EventEmitter` | ✅ Correct | Use `(tooltipRender)=` for events |
| Chart | `[title]` | `title` | `string` | ✅ Correct | Simple string, not an object |
| Axis | `[primary​XAxis]` | `primaryXAxis` | `AxisModel` | ✅ Correct | Singular "Axis" not "Axes" |
| Series | `[marker]` | `marker` | `MarkerSettingsModel` | ✅ Correct | On `<e-series>`, not on `<ejs-chart>` |

**API Property Naming Conventions:**

| Pattern | Examples | When Used |
|---------|----------|-----------|
| `xxxSettings` | `legendSettings`, `tooltipSettings`, `zoomSettings` | Configuration objects |
| `xxxModel` | `LegendSettingsModel`, `ChartAreaModel` | TypeScript interface type names |
| `xxx` | `title`, `width`, `height` | Simple string/number/boolean properties |
| Primary + Feature | `primaryXAxis`, `primaryYAxis` | Main axis (vs secondary axis) |
| Directive | `<e-series>`, `<e-axis>` | Child elements in template |

---



## API Documentation Overview

**Total APIs:** 200+ interfaces, classes, enums, and event interfaces  
**Categories:**
- **Interfaces/Models:** 100+ configuration interfaces
- **Classes:** 30+ implementation classes
- **Enumerations:** 50+ enum types
- **Event Interfaces:** 40+ event argument interfaces
- **Utility Types:** 20+ helper types

---

## 📋 Component Property Mapping Reference

**Use this table to find exact property names and verify correct API usage.**

### Top-Level Chart Component Properties

| Feature | Template Binding | Component Property | Type | Correct Usage | ❌ Common Mistake |
|---------|------------------|-------------------|------|----------------|--------------------|
| **Legend** | `[legendSettings]` | `legendSettings` | `LegendSettingsModel` | ✅ `[legendSettings]="legendSettings"` | ❌ `[legend]="legend"` |
| **Tooltip** | `[tooltip]` | `tooltip` | `TooltipSettingsModel` | ✅ `[tooltip]="tooltip"` | ❌ `[tooltips]="tooltip"` |
| **Primary X-Axis** | `[primaryXAxis]` | `primaryXAxis` | `AxisModel` | ✅ `[primaryXAxis]="xAxis"` | ❌ `[xAxis]="xAxis"` |
| **Primary Y-Axis** | `[primaryYAxis]` | `primaryYAxis` | `AxisModel` | ✅ `[primaryYAxis]="yAxis"` | ❌ `[yAxis]="yAxis"` |
| **Title** | `[title]` | `title` | `string` | ✅ `[title]="'Chart Title'"` | ❌ `[chartTitle]="...` |
| **Chart Area** | `[chartArea]` | `chartArea` | `ChartAreaModel` | ✅ `[chartArea]="chartArea"` | ❌ `[area]="area"` |
| **Margin** | Configure via `chartArea.border` | — | — | ✅ Use `chartArea` property | ❌ Separate `[margin]` |
| **Theme** | `[theme]` | `theme` | `ChartTheme` (enum) | ✅ `[theme]="'Tailwind'"` | ❌ `[style]="...` |
| **Background** | `[background]` | `background` | `string` | ✅ `[background]="'white'"` | ❌ Use CSS instead |
| **Border** | `[border]` | `border` | `BorderModel` | ✅ `[border]="border"` | ✅ Both work |

### Series Configuration (inside `<e-series>` directive)

| Feature | Template Usage | Property | Type | Example |
|---------|-----------------|----------|------|---------|
| **Data Source** | `[dataSource]="data"` | `dataSource` | `Object[]` | Chart data array |
| **Type** | `type="Line"` | `type` | `ChartSeriesType` | Line, Column, Area, etc. |
| **X-Axis Field** | `xName="x"` | `xName` | `string` | Data field name for X |
| **Y-Axis Field** | `yName="y"` | `yName` | `string` | Data field name for Y |
| **Marker** | `<e-marker>` directive inside | Nested element | — | Use child directive, not property |
| **Data Labels** | `<e-data-label>` directive | Nested element | — | Use child directive |

### Common API Naming Rules

| Rule | Pattern | Examples | Note |
|------|---------|----------|------|
| **Settings Suffix** | `[xxxSettings]` | `legendSettings`, `tooltipSettings`, `zoomSettings` | Configuration objects use "Settings" |
| **Type Interfaces** | `xxxSettingsModel` | `LegendSettingsModel`, `TooltipSettingsModel` | TypeScript interfaces end with "Model" |
| **Boolean Flags** | `[enabled]` or `[visible]` | `[enabled]="true"`, `[visible]="true"` | Enables/shows feature |
| **Primary Axes** | `primary[Feature]Axis` | `primaryXAxis`, `primaryYAxis` | Main axis (vs secondary) |
| **Enumerations** | String values | `type="Line"`, `position="Top"` | Use string values, not objects |
| **Events** | `(eventName)=` | `(tooltipRender)=`, `(pointRender)=` | Event bindings use parentheses |

### Quick API Lookup by Feature

**Looking for a specific feature?** Use these mappings:

| I Want To... | Use This Property | Type | Where |
|--------------|-------------------|------|-------|
| Show legend | `[legendSettings]` | `LegendSettingsModel` | Chart level |
| Position legend | `legendSettings.position` | `LegendPosition` (enum) | In legendSettings object |
| Legend shape | `legendSettings.shape` | `LegendShape` (enum) | In legendSettings object |
| Show tooltip | `[tooltip]` | `TooltipSettingsModel` | Chart level |
| Tooltip format | `tooltip.format` | `string` | In tooltip object |
| Configure X-axis | `[primaryXAxis]` | `AxisModel` | Chart level |
| Configure Y-axis | `[primaryYAxis]` | `AxisModel` | Chart level |
| Axis labels | `primaryXAxis.labelFormat` | `string` | In axis object |
| Data points | Inside `<e-series>` with `[dataSource]` | `Object[]` | Series level |
| Point markers | `<e-marker>` child element | `MarkerSettingsModel` | Inside series |
| Data labels | `<e-data-label>` child element | `DataLabelSettingsModel` | Inside series |

---



## Core Configuration APIs

### Primary Interfaces

| API | Properties | Description | Documentation Link |
|-----|------------|-------------|-------------------|
| **Chart** | 40+ | Main chart component with title, width, height, axes, series, theme, tooltip, legend, zoom, and all 40+ events | [Chart API](https://ej2.syncfusion.com/angular/documentation/api/chart/chart) |
| **Axis** | 50+ | Complete axis configuration: valueType, minimum, maximum, interval, labels, gridlines, ticks, crossing, formatting | [Axis API](https://ej2.syncfusion.com/angular/documentation/api/chart/axis) |
| **AxisModel** | 50+ | Axis model interface | [AxisModel API](https://ej2.syncfusion.com/angular/documentation/api/chart/axisModel) |
| **Series** | 60+ | Series configuration: type, dataSource, xName, yName, marker, animation, colors, borders, financial fields | [Series API](https://ej2.syncfusion.com/angular/documentation/api/chart/series) |
| **SeriesModel** | - | Series model interface | [SeriesModel API](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesModel) |

## Chart Elements APIs

### Legend

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| LegendSettingsModel | Complete legend configuration interface | [LegendSettingsModel API](https://ej2.syncfusion.com/angular/documentation/api/chart/legendSettingsModel) |
| LegendSettings | Legend settings class | [LegendSettings API](https://ej2.syncfusion.com/angular/documentation/api/chart/legendSettings) |
| LegendPosition | Position enum (Top, Bottom, Left, Right, Custom) | [LegendPosition API](https://ej2.syncfusion.com/angular/documentation/api/chart/legendPosition) |
| LegendShape | Icon shape enum (Circle, Rectangle, Triangle, Diamond, etc.) | [LegendShape API](https://ej2.syncfusion.com/angular/documentation/api/chart/legendShape) |
| LegendMode | Rendering mode (Series, Point, Range, Gradient) | [LegendMode API](https://ej2.syncfusion.com/angular/documentation/api/chart/#legendmode) |

### Markers

| API | Description | Documentation Link |
|-----|-------------|----------|
| MarkerSettingsModel | Complete marker configuration interface | [markerSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettingsModel) |
| MarkerSettings | Marker settings class | [markerSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/markerSettings) |
| ChartShape | Marker shape enum (Circle, Rectangle, Diamond, Triangle, Pentagon, Cross, Plus, etc.) | [chartShape](https://ej2.syncfusion.com/angular/documentation/api/chart/chartShape) |

### Data Labels

| API | Description | Documentation Link |
|-----|-------------|----------|
| DataLabelSettingsModel | Data label configuration interface | [dataLabelSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/dataLabelSettingsModel) |
| DataLabelSettings | Data label settings class | [dataLabelSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/dataLabelSettings) |
| DataLabelIntersectAction | Overlap handling (`None`, `Hide`, `Rotate90`, `RelocateVertically`, `RelocateHorizontally`) | [dataLabelIntersectAction](https://ej2.syncfusion.com/angular/documentation/api/chart/dataLabelIntersectAction) |
| SmartLabelSettingsModel | Configures the background, border, pointer, connector line, and anchor offset for relocated data labels. Applies when `labelIntersectAction` is `RelocateVertically` or `RelocateHorizontally`. | [SmartLabelSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/SmartLabelSettingsModel) |
| LabelPosition | Label position enum | [labelPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/labelPosition) |
| Alignment | Text alignment enum | [alignment](https://ej2.syncfusion.com/angular/documentation/api/chart/alignment) |
| TextAlignment | Text alignment options | [textAlignment](https://ej2.syncfusion.com/angular/documentation/api/chart/textAlignment) |
| TextOverflow | Text overflow behavior | [textOverflow](https://ej2.syncfusion.com/angular/documentation/api/chart/textOverflow) |
| TextWrap | Text wrapping options | [textWrap](https://ej2.syncfusion.com/angular/documentation/api/chart/textWrap) |


### SmartLabelSettings
| Property | Type | Default | Description |
|---|---|---|---|
| `background` | `string` | `null` | Background color of the relocated data label. |
| `pointerShape` | `'Arrow' \| 'None'` | `'Arrow'` | Pointer displayed at the point end of the connector. |
| `border` | `BorderModel` | `{}` | Border of the relocated data label. |
| `connectorLineStyle` | `ConnectorLineStyleModel` | `{}` | Color, width, and dash array of the connector line. |
| `offset` | `number` | `0.5` | Anchor position within the point region for vertical relocation. Horizontal relocation uses an effective offset of `0`. |

### Tooltip

| API | Description | Documentation Link |
|-----|-------------|----------|
| TooltipSettingsModel | Complete tooltip configuration interface | [tooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/tooltipSettingsModel) |
| TooltipSettings | Tooltip settings class | [tooltipSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/tooltipSettings) |
| TooltipPosition | Tooltip position enum | [tooltipPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/tooltipPosition) |
| FadeOutMode | Tooltip fade-out behavior | [fadeOutMode](https://ej2.syncfusion.com/angular/documentation/api/chart/fadeOutMode) |

### Annotations

| API | Description | Documentation Link |
|-----|-------------|----------|
| ChartAnnotationSettingsModel | Annotation configuration interface | [chartAnnotationSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartAnnotationSettingsModel) |
| ChartAnnotationSettings | Annotation settings class | [chartAnnotationSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/chartAnnotationSettings) |
| AnnotationDirective | Annotation directive for declaring annotations | [annotationDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/annotationDirective) |
| Anchor | Anchor point enum (Chart, Series, Point) | [anchor](https://ej2.syncfusion.com/angular/documentation/api/chart/anchor) |
| Position | Positioning enum | [position](https://ej2.syncfusion.com/angular/documentation/api/chart/position) |

### Trendlines

| API | Description | Documentation Link |
|-----|-------------|----------|
| TrendlineModel | Trendline configuration interface | [trendlineModel](https://ej2.syncfusion.com/angular/documentation/api/chart/trendlineModel) |
| Trendline | Trendline class | [trendline](https://ej2.syncfusion.com/angular/documentation/api/chart/trendline) |
| TrendlineDirective | Trendline directive | [trendlineDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/trendlineDirective) |
| TrendlineTypes | Types enum (Linear, Exponential, Polynomial, Power, Logarithmic, MovingAverage) | [trendlineTypes](https://ej2.syncfusion.com/angular/documentation/api/chart/trendlineTypes) |

### Technical Indicators

| API | Description | Documentation Link |
|-----|-------------|----------|
| TechnicalIndicatorModel | Indicator configuration interface | [technicalIndicatorModel](https://ej2.syncfusion.com/angular/documentation/api/chart/technicalIndicatorModel) |
| TechnicalIndicator | Indicator class | [technicalIndicator](https://ej2.syncfusion.com/angular/documentation/api/chart/technicalIndicator) |
| IndicatorDirective | Indicator directive | [indicatorDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/indicatorDirective) |
| TechnicalIndicators | Indicator types enum (SMA, EMA, TMA, Momentum, ATR, RSI, Stochastic, BollingerBands, MACD, etc.) | [technicalIndicators](https://ej2.syncfusion.com/angular/documentation/api/chart/technicalIndicators) |
| MacdType | MACD type enum | [macdType](https://ej2.syncfusion.com/angular/documentation/api/chart/macdType) |

### Striplines

| API | Description | Documentation Link |
|-----|-------------|----------|
| StripLineSettingsModel | Stripline configuration interface | [stripLineSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/stripLineSettingsModel) |
| StripLineSettings | Stripline settings class | [stripLineSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/stripLineSettings) |
| StripLine | Stripline class | [stripLine](https://ej2.syncfusion.com/angular/documentation/api/chart/stripLine) |
| StripLineDirective | Stripline directive | [stripLineDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/stripLineDirective) |

## Interactive Feature APIs

### Zooming and Panning

| API | Description | Documentation Link |
|-----|-------------|----------|
| ZoomSettingsModel | Complete zoom configuration interface | [zoomSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomSettingsModel) |
| ZoomSettings | Zoom settings class | [zoomSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomSettings) |
| ZoomMode | Zoom mode enum (X, Y, XY) | [zoomMode](https://ej2.syncfusion.com/angular/documentation/api/chart/zoomMode) |
| ToolbarItems | Zoom toolbar items enum | [toolbarItems](https://ej2.syncfusion.com/angular/documentation/api/chart/toolbarItems) |
| ToolbarPosition | Toolbar position | [toolbarPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/toolbarPosition) |
| ScrollbarSettingsModel | Scrollbar configuration interface | [scrollbarSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/scrollbarSettingsModel) |
| ScrollbarSettings | Scrollbar settings class | [scrollbarSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/scrollbarSettings) |
| ScrollbarPosition | Scrollbar position enum | [scrollbarPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/scrollbarPosition) |
| ScrollbarSettingsRangeModel | Scrollbar range model | [scrollbarSettingsRangeModel](https://ej2.syncfusion.com/angular/documentation/api/chart/scrollbarSettingsRangeModel) |

### Crosshair

| API | Description | Documentation Link |
|-----|-------------|----------|
| CrosshairSettingsModel | Crosshair configuration interface | [crosshairSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/crosshairSettingsModel) |
| CrosshairSettings | Crosshair settings class | [crosshairSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/crosshairSettings) |
| Crosshair | Crosshair class | [crosshair](https://ej2.syncfusion.com/angular/documentation/api/chart/crosshair) |
| CrosshairTooltipModel | Crosshair tooltip configuration | [crosshairTooltipModel](https://ej2.syncfusion.com/angular/documentation/api/chart/crosshairTooltipModel) |
| CrosshairTooltip | Crosshair tooltip class | [crosshairTooltip](https://ej2.syncfusion.com/angular/documentation/api/chart/crosshairTooltip) |
| LineType | Line type enum | [lineType](https://ej2.syncfusion.com/angular/documentation/api/chart/lineType) |

### Selection and Highlighting

| API | Description | Documentation Link |
|-----|-------------|----------|
| SelectionMode | Selection mode enum (None, Point, Series, Cluster, DragXY, DragX, DragY, Lasso) | [selectionMode](https://ej2.syncfusion.com/angular/documentation/api/chart/selectionMode) |
| SelectionPattern | Selection pattern enum (None, Dots, DiagonalForward, Crosshatch, Pacman, etc.) | [selectionPattern](https://ej2.syncfusion.com/angular/documentation/api/chart/selectionPattern) |
| HighlightMode | Highlight mode enum (None, Point, Series, Cluster) | [highlightMode](https://ej2.syncfusion.com/angular/documentation/api/chart/highlightMode) |
| Highlight | Highlight settings | [highlight](https://ej2.syncfusion.com/angular/documentation/api/chart/highlight) |
| Selection | Selection settings | [selection](https://ej2.syncfusion.com/angular/documentation/api/chart/selection) |
| SelectedDataIndexDirective | Selected data index directive | [selectedDataIndexDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/selectedDataIndexDirective) |

### Data Editing

| API | Description | Documentation Link |
|-----|-------------|----------|
| DragSettingsModel | Drag configuration interface | [dragSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/dragSettingsModel) |
| DragSettings | Drag settings class | [dragSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/dragSettings) |

## Axis Configuration APIs

### Axis Properties

| API | Description | Documentation Link |
|-----|-------------|----------|
| AxisModel | Complete axis configuration (50+ properties) | [axisModel](https://ej2.syncfusion.com/angular/documentation/api/chart/axisModel) |
| Axis | Axis class | [axis](https://ej2.syncfusion.com/angular/documentation/api/chart/axis) |
| AxisDirective | Axis directive for multiple axes | [axisDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/axisDirective) |
| ValueType | Axis value type enum (Double, DateTime, DateTimeCategory, Category, Logarithmic) | [valueType](https://ej2.syncfusion.com/angular/documentation/api/chart/valueType) |
| IntervalType | DateTime interval enum (Years, Months, Days, Hours, Minutes, Seconds, Auto) | [intervalType](https://ej2.syncfusion.com/angular/documentation/api/chart/intervalType) |
| SkeletonType | DateTime skeleton types | [skeletonType](https://ej2.syncfusion.com/angular/documentation/api/chart/skeletonType) |
| ChartRangePadding | Axis padding modes (None, Normal, Additional, Round, Auto) | [chartRangePadding](https://ej2.syncfusion.com/angular/documentation/api/chart/chartRangePadding) |
| AxisPosition | Axis position enum (Inside, Outside) | [axisPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/axisPosition) |
| EdgeLabelPlacement | Edge label placement (None, Hide, Shift) | [edgeLabelPlacement](https://ej2.syncfusion.com/angular/documentation/api/chart/edgeLabelPlacement) |

### Axis Labels

| API | Description | Documentation Link |
|-----|-------------|----------|
| LabelIntersectAction | Label overlap handling (None, Hide, Trim, Wrap, MultipleRows, Rotate45, Rotate90, `Rotate45WithTrim`, `Rotate90WithTrim`) | [labelIntersectAction](https://ej2.syncfusion.com/angular/documentation/api/chart/labelIntersectAction) |
| LabelPlacement | Label placement relative to ticks (BetweenTicks, OnTicks) | [labelPlacement](https://ej2.syncfusion.com/angular/documentation/api/chart/labelPlacement) |
| LabelPosition | Label position enum | [labelPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/labelPosition) |
| LabelOverflow | Label overflow behavior | [labelOverflow](https://ej2.syncfusion.com/angular/documentation/api/chart/labelOverflow) |
| LabelBorderModel | Label border configuration | [labelBorderModel](https://ej2.syncfusion.com/angular/documentation/api/chart/labelBorderModel) |
| LabelBorder | Label border class | [labelBorder](https://ej2.syncfusion.com/angular/documentation/api/chart/labelBorder) |

### Gridlines and Tick Lines

| API | Description | Documentation Link |
|-----|-------------|----------|
| MajorGridLinesModel | Major gridline configuration | [majorGridLinesModel](https://ej2.syncfusion.com/angular/documentation/api/chart/majorGridLinesModel) |
| MajorGridLines | Major gridlines class | [majorGridLines](https://ej2.syncfusion.com/angular/documentation/api/chart/majorGridLines) |
| MinorGridLinesModel | Minor gridline configuration | [minorGridLinesModel](https://ej2.syncfusion.com/angular/documentation/api/chart/minorGridLinesModel) |
| MinorGridLines | Minor gridlines class | [minorGridLines](https://ej2.syncfusion.com/angular/documentation/api/chart/minorGridLines) |
| MajorTickLinesModel | Major tick line configuration | [majorTickLinesModel](https://ej2.syncfusion.com/angular/documentation/api/chart/majorTickLinesModel) |
| MajorTickLines | Major tick lines class | [majorTickLines](https://ej2.syncfusion.com/angular/documentation/api/chart/majorTickLines) |
| MinorTickLinesModel | Minor tick line configuration | [minorTickLinesModel](https://ej2.syncfusion.com/angular/documentation/api/chart/minorTickLinesModel) |
| MinorTickLines | Minor tick lines class | [minorTickLines](https://ej2.syncfusion.com/angular/documentation/api/chart/minorTickLines) |
| AxisLineModel | Axis line configuration | [axisLineModel](https://ej2.syncfusion.com/angular/documentation/api/chart/axisLineModel) |
| AxisLine | Axis line class | [axisLine](https://ej2.syncfusion.com/angular/documentation/api/chart/axisLine) |

### Multi-Level Labels

| API | Description | Documentation Link |
|-----|-------------|----------|
| MultiLevelLabelsModel | Multi-level label configuration | [multiLevelLabelsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/multiLevelLabelsModel) |
| MultiLevelLabels | Multi-level labels class | [multiLevelLabels](https://ej2.syncfusion.com/angular/documentation/api/chart/multiLevelLabels) |
| MultiLevelLabelDirective | Multi-level label directive | [multiLevelLabelDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/multiLevelLabelDirective) |
| MultiLevelCategoriesModel | Multi-level categories configuration | [multiLevelCategoriesModel](https://ej2.syncfusion.com/angular/documentation/api/chart/multiLevelCategoriesModel) |
| MultiLevelCategories | Multi-level categories class | [multiLevelCategories](https://ej2.syncfusion.com/angular/documentation/api/chart/multiLevelCategories) |

## Series Configuration APIs

### Series Types

| API | Description | Documentation Link |
|-----|-------------|----------|
| ChartSeriesType | All series types enum (Line, Column, Bar, Area, Spline, Scatter, Bubble, Candle, Hilo, Histogram, BoxAndWhisker, Pareto, Polar, Radar, Waterfall, StackingLine, StackingColumn, StackingArea, and 10+ more) | [chartSeriesType](https://ej2.syncfusion.com/angular/documentation/api/chart/chartSeriesType) |
| ChartDrawType | Draw types for Polar/Radar (Line, Column, Area, Scatter, Spline, StackingArea, StackingColumn, RangeColumn) | [chartDrawType](https://ej2.syncfusion.com/angular/documentation/api/chart/chartDrawType) |

### Series Styling

| API | Description | Documentation Link |
|-----|-------------|----------|
| BorderModel | Border configuration | [borderModel](https://ej2.syncfusion.com/angular/documentation/api/chart/borderModel) |
| Border | Border class | [border](https://ej2.syncfusion.com/angular/documentation/api/chart/border) |
| BorderType | Border type enum | [borderType](https://ej2.syncfusion.com/angular/documentation/api/chart/borderType) |
| CornerRadiusModel | Corner radius configuration | [cornerRadiusModel](https://ej2.syncfusion.com/angular/documentation/api/chart/cornerRadiusModel) |
| CornerRadius | Corner radius class | [cornerRadius](https://ej2.syncfusion.com/angular/documentation/api/chart/cornerRadius) |
| ConnectorModel | Connector line configuration | [connectorModel](https://ej2.syncfusion.com/angular/documentation/api/chart/connectorModel) |
| Connector | Connector class | [connector](https://ej2.syncfusion.com/angular/documentation/api/chart/connector) |

### Financial Series

| API | Description | Documentation Link |
|-----|-------------|----------|
| FinancialDataFields | OHLC data field interface | [financialDataFields](https://ej2.syncfusion.com/angular/documentation/api/chart/financialDataFields) |

### Specialized Series

| API | Description | Documentation Link |
|-----|-------------|----------|
| SplineType | Spline interpolation types (Natural, Monotonic, Cardinal, Clamped) | [splineType](https://ej2.syncfusion.com/angular/documentation/api/chart/splineType) |
| BoxPlotMode | Box plot calculation modes (Normal, Exclusive, Inclusive) | [boxPlotMode](https://ej2.syncfusion.com/angular/documentation/api/chart/boxPlotMode) |
| ParetoOptionsModel | Pareto line configuration | [paretoOptionsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/paretoOptionsModel) |
| ParetoOptions | Pareto options class | [paretoOptions](https://ej2.syncfusion.com/angular/documentation/api/chart/paretoOptions) |
| StepPosition | Step line position (Left, Center, Right) | [stepPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/stepPosition) |

### Empty Points and Error Bars

| API | Description | Documentation Link |
|-----|-------------|----------|
| EmptyPointSettingsModel | Empty point configuration | [emptyPointSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/emptyPointSettingsModel) |
| EmptyPointSettings | Empty point settings class | [emptyPointSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/emptyPointSettings) |
| EmptyPointMode | Empty point modes (Gap, Zero, Average, Drop) | [emptyPointMode](https://ej2.syncfusion.com/angular/documentation/api/chart/emptyPointMode) |
| ErrorBarSettingsModel | Error bar configuration | [errorBarSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/errorBarSettingsModel) |
| ErrorBarSettings | Error bar settings class | [errorBarSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/errorBarSettings) |
| ErrorBarType | Error bar types (Fixed, Percentage, StandardDeviation, StandardError, Custom) | [errorBarType](https://ej2.syncfusion.com/angular/documentation/api/chart/errorBarType) |
| ErrorBarMode | Error bar modes (Vertical, Horizontal, Both) | [errorBarMode](https://ej2.syncfusion.com/angular/documentation/api/chart/errorBarMode) |
| ErrorBarDirection | Error bar direction (Both, Plus, Minus) | [errorBarDirection](https://ej2.syncfusion.com/angular/documentation/api/chart/errorBarDirection) |
| ErrorBarCapSettingsModel | Error bar cap configuration | [errorBarCapSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/errorBarCapSettingsModel) |
| ErrorBarCapSettings | Error bar cap settings class | [errorBarCapSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/errorBarCapSettings) |

### Color Mapping

| API | Description | Documentation Link |
|-----|-------------|----------|
| RangeColorSettingModel | Range color mapping configuration | [rangeColorSettingModel](https://ej2.syncfusion.com/angular/documentation/api/chart/rangeColorSettingModel) |
| RangeColorSetting | Range color setting class | [rangeColorSetting](https://ej2.syncfusion.com/angular/documentation/api/chart/rangeColorSetting) |
| RangeColorSettingDirective | Range color setting directive | [rangeColorSettingDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/rangeColorSettingDirective) |

## Chart Layout APIs

### Chart Area

| API | Description | Documentation Link |
|-----|-------------|----------|
| ChartAreaModel | Chart area configuration | [chartAreaModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartAreaModel) |
| ChartArea | Chart area class | [chartArea](https://ej2.syncfusion.com/angular/documentation/api/chart/chartArea) |
| MarginModel | Margin configuration | [marginModel](https://ej2.syncfusion.com/angular/documentation/api/chart/marginModel) |
| Margin | Margin class | [margin](https://ej2.syncfusion.com/angular/documentation/api/chart/margin) |
| ContainerPaddingModel | Container padding configuration | [containerPaddingModel](https://ej2.syncfusion.com/angular/documentation/api/chart/containerPaddingModel) |
| ContainerPadding | Container padding class | [containerPadding](https://ej2.syncfusion.com/angular/documentation/api/chart/containerPadding) |

### Rows and Columns

| API | Description | Documentation Link |
|-----|-------------|----------|
| RowModel | Row definition for multiple panes | [rowModel](https://ej2.syncfusion.com/angular/documentation/api/chart/rowModel) |
| Row | Row class | [row](https://ej2.syncfusion.com/angular/documentation/api/chart/row) |
| RowDirective | Row directive | [rowDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/rowDirective) |
| ColumnModel | Column definition for multiple panes | [columnModel](https://ej2.syncfusion.com/angular/documentation/api/chart/columnModel) |
| Column | Column class | [column](https://ej2.syncfusion.com/angular/documentation/api/chart/column) |
| ColumnDirective | Column directive | [columnDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/columnDirective) |

### Title and Styling

| API | Description | Documentation Link |
|-----|-------------|----------|
| TitleSettingsModel | Title configuration | [titleSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/titleSettingsModel) |
| TitleSettings | Title settings class | [titleSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/titleSettings) |
| TitleStyleSettingsModel | Title style configuration | [titleStyleSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/titleStyleSettingsModel) |
| TitleStyleSettings | Title style settings class | [titleStyleSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/titleStyleSettings) |
| TitlePosition | Title position enum | [titlePosition](https://ej2.syncfusion.com/angular/documentation/api/chart/titlePosition) |
| TitleBorderModel | Title border configuration | [titleBorderModel](https://ej2.syncfusion.com/angular/documentation/api/chart/titleBorderModel) |
| TitleBorder | Title border class | [titleBorder](https://ej2.syncfusion.com/angular/documentation/api/chart/titleBorder) |

### Theme and Appearance

| API | Description | Documentation Link |
|-----|-------------|----------|
| ChartTheme | Theme enum (Material, Bootstrap, Fabric, Bootstrap4, Tailwind, TailwindDark, Bootstrap5, Bootstrap5Dark, Fluent, FluentDark, Material3, Material3Dark, and more) | [chartTheme](https://ej2.syncfusion.com/angular/documentation/api/chart/chartTheme) |
| FontModel | Font configuration | [fontModel](https://ej2.syncfusion.com/angular/documentation/api/chart/fontModel) |
| Font | Font class | [font](https://ej2.syncfusion.com/angular/documentation/api/chart/font) |
| LocationModel | Location/position configuration | [locationModel](https://ej2.syncfusion.com/angular/documentation/api/chart/locationModel) |
| Documentation Link | Location class | [location](https://ej2.syncfusion.com/angular/documentation/api/chart/location) |
| OffsetModel | Offset configuration | [offsetModel](https://ej2.syncfusion.com/angular/documentation/api/chart/offsetModel) |
| Offset | Offset class | [offset](https://ej2.syncfusion.com/angular/documentation/api/chart/offset) |

## Animation and Performance APIs

| API | Description | Documentation Link |
|-----|-------------|----------|
| AnimationModel | Animation configuration | [animationModel](https://ej2.syncfusion.com/angular/documentation/api/chart/animationModel) |
| Animation | Animation class | [animation](https://ej2.syncfusion.com/angular/documentation/api/chart/animation) |

## Export and Print APIs

| API | Description | Documentation Link |
|-----|-------------|----------|
| ExportType | Export format enum (PNG, JPEG, SVG, PDF, XLSX, CSV) | [exportType](https://ej2.syncfusion.com/angular/documentation/api/chart/exportType) |
| Export | Export utility class | [export](https://ej2.syncfusion.com/angular/documentation/api/chart/export) |
| PrintUtils | Print utility functions | [printUtils](https://ej2.syncfusion.com/angular/documentation/api/chart/printUtils) |
| Units | Size units enum | [units](https://ej2.syncfusion.com/angular/documentation/api/chart/units) |

## Event Interfaces

### Lifecycle Events

| Event Interface | Description | Documentation Link |
|-----------------|-------------|----------|
| ILoadedEventArgs | Chart load events (load, loaded) | [iLoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iLoadedEventArgs) |
| IChartEventArgs | Base chart event arguments | [iChartEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iChartEventArgs) |
| IAnimationCompleteEventArgs | Animation complete event | [iAnimationCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iAnimationCompleteEventArgs) |

### Rendering Events

| Event Interface | Description | Documentation Link |
|-----------------|-------------|----------|
| IPointRenderEventArgs | Point rendering event | [iPointRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iPointRenderEventArgs) |
| ISeriesRenderEventArgs | Series rendering event | [iSeriesRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iSeriesRenderEventArgs) |
| IAxisLabelRenderEventArgs | Axis label rendering event | [iAxisLabelRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iAxisLabelRenderEventArgs) |
| IAxisMultiLabelRenderEventArgs | Multi-level axis label rendering | [iAxisMultiLabelRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iAxisMultiLabelRenderEventArgs) |
| ILegendRenderEventArgs | Legend rendering event | [iLegendRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iLegendRenderEventArgs) |
| ITextRenderEventArgs | Text rendering event (data labels) | [iTextRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iTextRenderEventArgs) |
| IAnnotationRenderEventArgs | Annotation rendering event | [iAnnotationRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iAnnotationRenderEventArgs) |

### Interaction Events

| Event Interface | Description | Documentation Link |
|-----------------|-------------|----------|
| IMouseEventArgs | Mouse events (click, move, down, up, leave) | [iMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iMouseEventArgs) |
| IPointEventArgs | Point events (click, doubleClick, move) | [iPointEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iPointEventArgs) |
| ITooltipRenderEventArgs | Tooltip rendering event | [iTooltipRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iTooltipRenderEventArgs) |
| ISharedTooltipRenderEventArgs | Shared tooltip rendering | [iSharedTooltipRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iSharedTooltipRenderEventArgs) |
| ILegendClickEventArgs | Legend click event | [iLegendClickEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iLegendClickEventArgs) |
| IAxisLabelClickEventArgs | Axis label click event | [iAxisLabelClickEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iAxisLabelClickEventArgs) |
| IMultiLevelLabelClickEventArgs | Multi-level label click | [iMultiLevelLabelClickEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iMultiLevelLabelClickEventArgs) |

### Feature Events

| Event Interface | Description | Documentation Link |
|-----------------|-------------|----------|
| IZoomingEventArgs | During zoom operation | [iZoomingEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iZoomingEventArgs) |
| IZoomCompleteEventArgs | After zoom completes | [iZoomCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iZoomCompleteEventArgs) |
| IScrollEventArgs | Scrollbar events (start, end, changed) | [iScrollEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iScrollEventArgs) |
| ISelectionCompleteEventArgs | After selection completes | [iSelectionCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iSelectionCompleteEventArgs) |
| IDragCompleteEventArgs | Drag operation complete | [iDragCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iDragCompleteEventArgs) |
| IDataEditingEventArgs | Data editing event | [iDataEditingEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iDataEditingEventArgs) |

### Export and Print Events

| Event Interface | Description | Documentation Link |
|-----------------|-------------|----------|
| IExportEventArgs | Export events (beforeExport, afterExport) | [iExportEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iExportEventArgs) |
| IPrintEventArgs | Print events (beforePrint) | [iPrintEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iPrintEventArgs) |
| IPDFArgs | PDF export arguments | [iPDFArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iPDFArgs) |

### Resize Events

| Event Interface | Description | Documentation Link |
|-----------------|-------------|----------|
| IResizeEventArgs | Resize events (resized) | [iResizeEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iResizeEventArgs) |
| IBeforeResizeEventArgs | Before resize event | [iBeforeResizeEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iBeforeResizeEventArgs) |

### Data Events

| Event Interface | Description | Documentation Link |
|-----------------|-------------|----------|
| IAxisRangeCalculatedEventArgs | After axis range calculation | [iAxisRangeCalculatedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/chart/iAxisRangeCalculatedEventArgs) |

## Utility and Helper APIs

### Points and Data

| API | Description | Documentation Link |
|-----|-------------|----------|
| Points | Points data structure | [points](https://ej2.syncfusion.com/angular/documentation/api/chart/points) |
| Indexes | Index collection | [indexes](https://ej2.syncfusion.com/angular/documentation/api/chart/indexes) |
| IndexesModel | Index model | [indexesModel](https://ej2.syncfusion.com/angular/documentation/api/chart/indexesModel) |

### Stock Chart Specific

| API | Description | Documentation Link |
|-----|-------------|----------|
| StockTooltipSettingsModel | Stock tooltip configuration | [stockTooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/stockTooltipSettingsModel) |
| StockTooltipSettings | Stock tooltip settings class | [stockTooltipSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/stockTooltipSettings) |
| PeriodSelectorSettingsModel | Period selector configuration | [periodSelectorSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/periodSelectorSettingsModel) |
| PeriodSelectorSettings | Period selector settings class | [periodSelectorSettings](https://ej2.syncfusion.com/angular/documentation/api/chart/periodSelectorSettings) |
| PeriodSelectorPosition | Period selector position enum | [periodSelectorPosition](https://ej2.syncfusion.com/angular/documentation/api/chart/periodSelectorPosition) |
| PeriodsModel | Periods configuration | [periodsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/periodsModel) |
| Periods | Periods class | [periods](https://ej2.syncfusion.com/angular/documentation/api/chart/periods) |

### Accessibility

| API | Description | Documentation Link |
|-----|-------------|----------|
| AccessibilityModel | Accessibility configuration | [accessibilityModel](https://ej2.syncfusion.com/angular/documentation/api/chart/accessibilityModel) |
| Accessibility | Accessibility class | [accessibility](https://ej2.syncfusion.com/angular/documentation/api/chart/accessibility) |
| SeriesAccessibilityModel | Series accessibility configuration | [seriesAccessibilityModel](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesAccessibilityModel) |
| SeriesAccessibility | Series accessibility class | [seriesAccessibility](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesAccessibility) |

### Miscellaneous

| API | Description | Documentation Link |
|-----|-------------|----------|
| CenterLabelModel | Center label configuration (for pie/donut) | [centerLabelModel](https://ej2.syncfusion.com/angular/documentation/api/chart/centerLabelModel) |
| CenterLabel | Center label class | [centerLabel](https://ej2.syncfusion.com/angular/documentation/api/chart/centerLabel) |
| SeriesBase | Base series class | [seriesBase](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesBase) |
| SeriesBaseModel | Base series model | [seriesBaseModel](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesBaseModel) |
| CategoryDirective | Category directive | [categoryDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/categoryDirective) |
| SegmentDirective | Segment directive for multi-colored series | [segmentDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/segment) |
| ChartSegmentModel | Chart segment model | [chartSegmentModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartSegmentModel) |
| ChartSegment | Chart segment class | [chartSegment](https://ej2.syncfusion.com/angular/documentation/api/chart/chartSegment) |
| RegionModel | Region configuration | [regions](https://ej2.syncfusion.com/angular/documentation/api/chart/regions) |
| FlagType | Flag type enum | [flagType](https://ej2.syncfusion.com/angular/documentation/api/chart/flagType) |
| SizeType | Size type enum | [sizeType](https://ej2.syncfusion.com/angular/documentation/api/chart/sizeType) |
| ShapeType | Shape type enum | [shapeType](https://ej2.syncfusion.com/angular/documentation/api/chart/shapeType) |
| zIndex | Z-index configuration | [zIndex](https://ej2.syncfusion.com/angular/documentation/api/chart/zIndex) |
| StaticFunctions | Static utility functions | [staticFunctions](https://ej2.syncfusion.com/angular/documentation/api/chart/staticFunctions) |
| Overview | API overview | [overview](https://ej2.syncfusion.com/angular/documentation/api/chart/overview) |
| Summary | API summary | [summary](https://ej2.syncfusion.com/angular/documentation/api/chart/summary) |

## How to Navigate the API Documentation

### Quick Start Path

1. **Start with Core APIs:**
   - Read [ChartModel](https://ej2.syncfusion.com/angular/documentation/api/chart/chartModel) - Main chart configuration with all 40+ properties and events
   - Review [AxisModel](https://ej2.syncfusion.com/angular/documentation/api/chart/axisModel) - Axis configuration with 50+ properties
   - Explore [SeriesDirective](https://ej2.syncfusion.com/angular/documentation/api/chart/seriesDirective) - Series configuration with 60+ properties

2. **Feature-Specific APIs:**
   - Look up specific feature models as needed (Legend, Tooltip, Zoom, Marker, DataLabel)
   - Reference event interfaces when implementing event handlers
   - Check enumerations for valid values (ChartSeriesType, ValueType, ChartTheme, etc.)

3. **Advanced Usage:**
   - Review specialized APIs for financial charts, technical indicators, annotations
   - Check utility models for styling, animation, borders, fonts
   - Explore export/print utilities for sharing capabilities

### Finding Specific APIs

**By Feature:**
- Legend: LegendSettingsModel, LegendPosition, LegendShape
- Tooltip: TooltipSettingsModel, TooltipPosition
- Zoom: ZoomSettingsModel, ZoomMode, ToolbarItems
- Selection: SelectionMode, SelectionPattern, HighlightMode
- Series Types: ChartSeriesType, ChartDrawType
- Axes: AxisModel, ValueType, IntervalType, LabelIntersectAction

**By Task:**
- Styling: BorderModel, FontModel, MarginModel, CornerRadiusModel
- Data Binding: FinancialDataFields, EmptyPointSettingsModel
- Interaction: IMouseEventArgs, IPointEventArgs, ITooltipRenderEventArgs
- Export: ExportType, IExportEventArgs, IPrintEventArgs
- Layout: ChartAreaModel, RowModel, ColumnModel, TitleSettingsModel

### API Documentation Structure

Each API file contains:
- **Property Descriptions:** Type, default value, description
- **Enumeration Values:** All available options
- **Usage Examples:** Common patterns
- **Related APIs:** Cross-references to related interfaces/classes

### Complete API File List

**Location:** All 200+ API files are in the `chart/` directory
**Organization:** Alphabetical by API name with Model suffix for interfaces

**Categories:**
- **Configuration Models:** xxxModel.md (100+ files)
- **Implementation Classes:** xxx.md without Model suffix (30+ files)
- **Enumerations:** Enum types (50+ files)
- **Event Interfaces:** Ixxx.md files (40+ files)
- **Directives:** xxxDirective.md (15+ files)
- **Utilities:** Helper and utility classes (20+ files)

---

## 📊 Legend Shape Types - Comprehensive Reference

**API Reference:** [LegendShape](https://ej2.syncfusion.com/angular/documentation/api/chart/legendShape) (Enum)

### Available Legend Shapes

| Shape Type | Description | Visual Representation | Usage Example |
|------------|-------------|----------------------|---------------|
| **Circle** | Renders a circular icon | ● | Default for Line, Area, Scatter charts |
| **Rectangle** | Renders a rectangular icon | ■ | Default for Column, Bar charts |
| **Triangle** | Renders a triangular icon | ▲ | Used with triangular markers |
| **InvertedTriangle** | Renders an inverted triangle-shaped icon | ▼ | Alternative triangle variant |
| **Diamond** | Renders a diamond-shaped icon | ◆ | Used with diamond markers |
| **Pentagon** | Renders a pentagon-shaped icon | ⬟ | Used with pentagon markers |
| **Cross** | Renders a cross-shaped icon | ✕ | Used with cross markers |
| **HorizontalLine** | Renders a horizontal line icon | ─ | Line-based visualization |
| **VerticalLine** | Renders a vertical line icon | \| | Line-based visualization |
| **Image** | Renders a custom image for the legend icon | 🖼️ | Custom branding, requires `imageUrl` property |
| **SeriesType** | Uses the default icon shape based on the series type | Auto | Automatic detection (default behavior) |

### Implementation Patterns

#### ✅ Global Legend Shape (All Series)

```typescript
import { LegendSettingsModel } from '@syncfusion/ej2-angular-charts';

public legendSettings: LegendSettingsModel = {
  visible: true,
  shape: 'Circle'  // Type: LegendShape enum
};
```

```html
<ejs-chart [legendSettings]="legendSettings">
  <!-- All series will use Circle shape for legend icons -->
</ejs-chart>
```

#### ✅ Per-Series Legend Shape Override

```html
<ejs-chart [legendSettings]="legendSettings">
  <e-series-collection>
    <!-- Series 1: Circle shape -->
    <e-series 
      [dataSource]="data1" 
      type="Line" 
      xName="x" 
      yName="y" 
      name="Sales"
      legendShape="Circle">
    </e-series>
    
    <!-- Series 2: Rectangle shape -->
    <e-series 
      [dataSource]="data2" 
      type="Column" 
      xName="x" 
      yName="y" 
      name="Revenue"
      legendShape="Rectangle">
    </e-series>
    
    <!-- Series 3: Diamond shape -->
    <e-series 
      [dataSource]="data3" 
      type="Scatter" 
      xName="x" 
      yName="y" 
      name="Customers"
      legendShape="Diamond">
    </e-series>
  </e-series-collection>
</ejs-chart>
```

#### ✅ Custom Image Legend Shape

```typescript
public legendSettings: LegendSettingsModel = {
  visible: true,
  shape: 'Image'  // Image shape requires imageUrl on series
};
```

```html
<ejs-chart [legendSettings]="legendSettings">
  <e-series-collection>
    <e-series 
      [dataSource]="data" 
      type="Line" 
      xName="x" 
      yName="y" 
      name="Product A"
      legendShape="Image"
      imageUrl="assets/product-a-icon.png">
    </e-series>
  </e-series-collection>
</ejs-chart>
```

#### ✅ SeriesType (Automatic - Default Behavior)

```typescript
public legendSettings: LegendSettingsModel = {
  visible: true,
  shape: 'SeriesType'  // Shape matches chart series type (default)
};
```

**SeriesType Shape Mapping:**

| Series Type | Default Legend Shape |
|-------------|---------------------|
| Line, Area, Scatter | Circle |
| Column, Bar, StackingColumn, StackingBar | Rectangle |
| Pie, Doughnut | Circle |
| Bubble | Circle |
| Candle, HiLo, OHLC | Rectangle |
| Waterfall, BoxPlot | Rectangle |

### Shape Sizing and Styling

```typescript
public legendSettings: LegendSettingsModel = {
  visible: true,
  shape: 'Pentagon',
  shapeWidth: 20,      // Width in pixels
  shapeHeight: 20,     // Height in pixels
  shapePadding: 8,     // Padding around shape
  
  // Shape styling
  border: {
    width: 1,
    color: '#333'
  },
  
  // Only applies when shape is Image
  imageUrl: 'assets/custom-icon.png'
};
```

### Chart WebMCP properties

| Property | Type | Default | Description |
|---|---|---|---|
| `enableWebMcp` | `boolean` | `false` | Enables automatic Chart WebMCP tool registration after rendering. |
| `webMcpSettings` | `ChartWebMcpSettingsModel` | `null` | Configures the registration prefix, selected tools, custom tools, and permitted model contexts. |

### `ChartWebMcpSettingsModel`

| Property | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | `null` | Prefix for registered tool names. The stable Chart element ID is used when null or empty. |
| `tools` | `string[] \| WebMcpTool[]` | `null` | Built-in allowlist or custom tool definitions. Omit to register all built-in tools. An empty array clears earlier registrations. |
| `exposedTo` | `string[]` | `null` | Model contexts or origins that may access the registered tools. |

### Chart WebMCP method

| Method | Parameters | Returns | Description |
|---|---|---|---|
| `getWebMcpTools` | `tools?: string[]` | `WebMcpTool[]` | Returns executable copies of all or selected built-in tool definitions. It is not required for automatic registration. |

### Chart WebMCP event

| Event | Type | Description |
|---|---|---|
| `beforeWebMcpToolExecute` | `WebMcpToolExecuteEventArgs` | Fires before tool execution. The handler can cancel execution, control confirmation, or return a cancellation response. |

### `WebMcpToolExecuteEventArgs`

| Property | Type | Description |
|---|---|---|
| `toolName` | `string` | Registered tool name. The configured prefix can be included. |
| `input` | `Object` | JSON-safe tool input. |
| `cancel` | `boolean` | Set to `true` to stop execution. |
| `showConfirmationDialog` | `boolean` | Controls confirmation before execution. |
| `cancellationResponse` | `string \| WebMcpToolResponse` | Optional response returned when execution is cancelled. |

### Common Shape Selection Patterns

#### Mixed Shapes per Series Type

```html
<ejs-chart [legendSettings]="{ visible: true }">
  <e-series-collection>
    <!-- Line series: Circle shape -->
    <e-series type="Line" legendShape="Circle" name="Trend"></e-series>
    
    <!-- Column series: Rectangle shape -->
    <e-series type="Column" legendShape="Rectangle" name="Value"></e-series>
    
    <!-- Scatter series: Diamond shape -->
    <e-series type="Scatter" legendShape="Diamond" name="Points"></e-series>
  </e-series-collection>
</ejs-chart>
```

#### Custom Icons per Department

```html
<ejs-chart [legendSettings]="{ visible: true, shape: 'Image' }">
  <e-series-collection>
    <e-series 
      type="Column" 
      name="Sales Dept"
      legendShape="Image"
      imageUrl="assets/icons/sales.svg">
    </e-series>
    <e-series 
      type="Column" 
      name="Marketing Dept"
      legendShape="Image"
      imageUrl="assets/icons/marketing.svg">
    </e-series>
  </e-series-collection>
</ejs-chart>
```

#### Dynamic Shape Selection

```typescript
import { LegendShape } from '@syncfusion/ej2-angular-charts';

public getShapeForSeries(seriesType: string): LegendShape {
  const shapeMap: Record<string, LegendShape> = {
    'Line': 'Circle',
    'Column': 'Rectangle',
    'Scatter': 'Diamond',
    'Area': 'Triangle',
    'Bar': 'Rectangle'
  };
  return shapeMap[seriesType] || 'SeriesType';
}
```

### API Property Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `shape` | LegendShape (enum) | SeriesType | Legend icon shape |
| `shapeWidth` | number | 15 | Width of shape in pixels |
| `shapeHeight` | number | 15 | Height of shape in pixels |
| `shapePadding` | number | 5 | Padding between shape and text |
| `imageUrl` | string | - | Image URL (required when shape='Image') |

### TypeScript Type Safety

```typescript
import { 
  LegendSettingsModel, 
  LegendShape 
} from '@syncfusion/ej2-angular-charts';

// Type-safe shape selection
const validShapes: LegendShape[] = [
  'Circle',
  'Rectangle', 
  'Triangle',
  'InvertedTriangle',
  'Diamond',
  'Pentagon',
  'Cross',
  'HorizontalLine',
  'VerticalLine',
  'Image',
  'SeriesType'
];

// Component property with full type coverage
public legendSettings: LegendSettingsModel = {
  visible: true,
  shape: 'Circle' as LegendShape,
  shapeWidth: 15,
  shapeHeight: 15,
  shapePadding: 5
};
```

### Official Documentation

**For the complete legend shape specification, see:**
- [LegendShape Enum](https://ej2.syncfusion.com/angular/documentation/api/chart/legendShape)
- [LegendSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/chart/legendSettingsModel)
- [Legend Implementation Guide](./chart-elements.md#legend-shape-and-style)

## Integration with Reference Guides

All 10 reference guides link to relevant API documentation:

1. **getting-started.md** → ChartModel, AxisModel, SeriesDirective, TooltipSettingsModel, LegendSettingsModel
2. **series-types.md** → ChartSeriesType, SeriesDirective, Series properties (columnWidth, bearFillColor, binInterval, etc.)
3. **axes-and-layout.md** → AxisModel, ValueType, IntervalType, LabelIntersectAction, ChartRangePadding
4. **chart-elements.md** → Legend, Marker, DataLabel, Tooltip, Annotation, Trendline, TechnicalIndicator, StripLine APIs
5. **interactive-features.md** → ZoomSettingsModel, TooltipSettingsModel, CrosshairSettingsModel, SelectionMode
6. **data-binding.md** → Series.dataSource, EmptyPointSettingsModel, FinancialDataFields
7. **customization.md** → ChartTheme, BorderModel, FontModel, AnimationModel
8. **accessibility.md** → AccessibilityModel, SeriesAccessibilityModel
9. **advanced-features.md** → All 40+ event interfaces, ExportType, IExportEventArgs
10. **common-patterns.md** → Practical combinations of multiple APIs

---

## 🧪 QA Checklist Before Publishing Skill Documentation

**Use this checklist before finalizing any skill file or code example:**

### Property Verification
- [ ] Property name matches official Syncfusion documentation (checked against https://ej2.syncfusion.com/angular/documentation/api/chart/)
- [ ] Property is for correct component (Chart vs Series vs Axis level)
- [ ] Type annotation includes correct `Model` interface (e.g., `LegendSettingsModel`)
- [ ] Template binding matches property name exactly
- [ ] No typos or case-sensitivity issues (camelCase is standard)

### Code Example Validation
- [ ] Code compiles without TypeScript errors
- [ ] Component renders without console errors
- [ ] All property bindings work as documented
- [ ] Event handlers (if any) fire correctly
- [ ] Example matches actual Syncfusion behavior

### Documentation Quality
- [ ] Property purpose is clearly explained
- [ ] Type information is explicit and correct
- [ ] Default values are documented
- [ ] Enum values are listed (for typed enums)
- [ ] Common mistakes are highlighted
- [ ] Link to official API documentation is provided
- [ ] Example code is tested and working

### API References
- [ ] Syncfusion version number is specified (e.g., v33.2.5)
- [ ] API links point to correct official documentation
- [ ] Links are not outdated or deprecated
- [ ] Version-specific changes are noted

### Naming Conventions
- [ ] `Settings` suffix used for configuration objects
- [ ] `Model` suffix used in TypeScript interface names
- [ ] Property names match official casing (camelCase)
- [ ] No local naming variations (stick to official names)

### Accessibility & Compatibility
- [ ] WCAG 2.1 AA compliance mentioned where relevant
- [ ] Browser compatibility noted
- [ ] Known limitations documented
- [ ] Migration path from older versions provided (if applicable)

---

## 🔗 Quick Reference Links

**Official Syncfusion Resources:**
- [Angular Chart Documentation](https://ej2.syncfusion.com/angular/documentation/chart/chart-types/)
- [Angular Chart API Reference](https://ej2.syncfusion.com/angular/documentation/api/chart/)
- [Angular Chart Examples](https://ej2.syncfusion.com/angular/demos/#/material/chart/line)
- [TypeScript Definitions](https://www.npmjs.com/package/@syncfusion/ej2-angular-charts)

**Validation Tools:**
- TypeScript Language Server (built into VS Code)
- IDE IntelliSense (suggests valid properties)
- npm package type definitions (inspect .d.ts files)

**Skill Development Standards:**
- [Skill Development Guide](./skill-development-guide.md) - Best practices for creating skill files
- [Chart Elements Reference](./chart-elements.md) - Detailed feature guide
- [Getting Started Guide](./getting-started.md) - First-time implementation

---

**For the most up-to-date and comprehensive API documentation, always refer to the individual API files in the chart/ directory and the official Syncfusion documentation site.**

---

## 📌 Summary: The 4 Key Areas Applied

This enhanced API Reference now demonstrates all 4 key improvement areas:

1. **✅ Use Authoritative API Documentation**
   - Links to official Syncfusion docs for every property
   - Checklists ensure verification against official sources
   - Common pitfalls highlighted with correct alternatives

2. **✅ Document API Property Names Explicitly**
   - Property mapping tables show exact names
   - Clear distinction between what's wrong and what's correct
   - Template binding examples for each property
   - Type information always included

3. **✅ Add TypeScript Interfaces for Type Safety**
   - Every property includes type annotation
   - Import statements show correct interfaces
   - IDE autocomplete examples provided
   - Type safety benefits explained

4. **✅ Create Property Mapping Reference**
   - Comprehensive mapping tables organized by feature
   - Quick lookup by task/feature
   - Common mistakes clearly marked with ❌
   - Correct usage marked with ✅

**Result:** Developers and skill contributors now have a reliable reference that catches and prevents the `[legend]` vs `[legendSettings]` type of mistakes before they cause build failures.
