# Bullet Chart API Reference (Syncfusion Angular)

This file summarizes the most-used properties, methods, and events for the Syncfusion Angular `BulletChart` component. The content below is aligned with the official API documentation for `@syncfusion/ej2-angular-charts` (`BulletChart`).

## Table of Contents

- [Component Import](#component-import)
- [Tag](#tag)
- [Key Properties (Selected)](#key-properties-selected)
- [Methods](#methods)
- [Events (selected)](#events-selected)
- [Example Usage (Angular Standalone Component)](#example-usage-angular-standalone-component)
- [Where to Find the Official API](#where-to-find-the-official-api)

## Component import

```typescript
import { BulletChartModule, BulletTooltipService } from '@syncfusion/ej2-angular-charts';
```

## Tag

- `<ejs-bulletchart>` (standalone component with `BulletChartModule`)

## Key Properties (selected)

- `[dataSource: Object[]](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#datasource)` — Array of data objects.
  - `[valueField: string](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#valuefield)` — Field name in data for actual/feature measure.
- `[targetField: string](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#targetfield)` — Field name in data for target/comparative measure.
- `[categoryField?: string](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#categoryfield)` — Optional field for category labels.
- `ranges: [RangeModel[]](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/rangemodel)` — Array of range objects (each with `end`, `color`, `opacity`).
- `[minimum?: number](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#minimum)` — Chart minimum value.
- `[maximum?: number](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#maximum)` — Chart maximum value.
- `[interval?: number](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#interval)` — Axis interval value.
- `[labelFormat?: string](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#labelformat)` — Axis label format (e.g., `n0`, `c0`, `p0`).
- `[enableGroupSeparator?: boolean](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#enablegroupseparator)` — Use group separators in numbers.
- `majorTickLines?: [MajorTickLinesSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/majorticklinessettingsmodel)` — Major tick appearance.
- `minorTickLines?: [MinorTickLinesSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/minorticklinessettingsmodel)` — Minor tick appearance.
- `[minorTicksPerInterval?: number](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#minorticksperinterval)` — Minor ticks per interval (default commonly 4).
- `[labelPosition?: LabelsPlacement](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#labelposition)` — `'Inside' | 'Outside'`.
- `[opposedPosition?: boolean](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#opposedposition)` — Place axis on opposite side.
- `[orientation?: OrientationType](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#orientation)` — `'Horizontal' | 'Vertical'`.
- `[type?: FeatureType](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#type)` — `'Rect' | 'Dot'` (value bar shape).
- `[targetTypes?: TargetType[]](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#targettypes)` — Allowed target marker types: `Rect`, `Circle`, `Cross`.
- `[targetWidth?: number](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#targetwidth)` — Width of the target marker (px).
- `[targetColor?: string](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#targetcolor)` — Fill color for target marker.
- `[valueFill?: string](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#valuefill)` — Fill color for value bar.
- `[valueHeight?: number](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#valueheight)` — Height/thickness of value bar (px).
- `valueBorder?: [BorderModel](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/bordermodel)` — Border for value bar (`color`, `width`).
- `dataLabel?: [BulletDataLabelModel](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/bulletdatalabelmodel)` — Data label config (`enable`, `format`, `labelStyle`).
- `tooltip?: [BulletTooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/bullettooltipsettingsmodel)` — Tooltip enable and styling.
- `[title?: string](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#title)` — Chart title.
- `[subtitle?: string](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#subtitle)` — Chart subtitle.
- `titlePosition?: TextPosition` — e.g., `Top`.
- `titleStyle?: [BulletLabelStyleModel](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/bulletlabelstylemodel)` — Style for title text.
- `subtitleStyle?: [BulletLabelStyleModel](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/bulletlabelstylemodel)` — Style for subtitle.
- `theme?: [ChartTheme](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/charttheme)` — Theme string (Material, Fabric, Bootstrap, Tailwind, Highcontrast, etc.).
- `[width?: string | number](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#width)` — Width in px or `%`.
- `[height?: string | number](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#height)` — Height in px or `%`.
- `[enableRtl?: boolean](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#enablertl)` — Right-to-left rendering.
- `[enablePersistence?: boolean](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#enablepersistence)` — Persist state across reloads.
- `[locale?: string](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#locale)` — Locale code for localization.
- `[tabIndex?: number](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#tabindex)` — Tab index for keyboard navigation.
- `animation?: [AnimationModel](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/animationmodel)` — Animation configuration for feature bar.
- `margin?: [MarginModel](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/marginmodel)` — Chart margin configuration.
- `legendSettings?: [BulletChartLegendSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/bulletchartlegendsettingsmodel)` — Legend configuration.
- `bulletChartLegendModule?: [BulletChartLegend](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/bulletchartlegend)` — Module injection for legend features.
- `bulletTooltipModule?: [BulletTooltip](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/bullettooltip)` — Module injection for tooltip features.

> Note: For full type definitions and default values, consult the official API docs linked above.

## Methods

- `createSvg(): void` — Method to create the SVG element for rendering. (see: https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#createsvg)
- `destroy(): void` — Destroys the component and removes handlers. (see: https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#destroy)
- `export(type: ExportType, fileName?: string, orientation?: PdfPageOrientation, controls?: any[], width?: number, height?: number, isVertical?: boolean): void` — Export chart as image/PDF. (see: https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#export)
- `print(id?: string | string[] | Element): void` — Print the chart using DOM element or id. (see: https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#print)
- `refresh(): void` — Refresh the chart after data or configuration updates (available on component instance). (see: https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#refresh)

## Events (selected)

- `load` — Fired before the chart is rendered; can be used to set theme or initial state. (args type: [IBulletLoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/ibulletloadedeventargs))
- `loaded` — Fired after the chart has finished rendering. (args type: [IBulletLoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/ibulletloadedeventargs))
- `beforePrint` — Triggered before printing begins. (args type: `IPrintEventArgs`, see the API events section: https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#events)
- `bulletChartMouseClick` — Fired when the chart is clicked (mouse event payload with data info). (args type: [IBulletMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/ibulletmouseeventargs))
- `tooltipRender` — Fired before a tooltip is displayed; allows customizing tooltip content. (args type: [IBulletchartTooltipEventArgs](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/ibulletcharttooltipeventargs))
- `legendRender` — Fired when legend elements are being rendered (if legend used). (args type: [IBulletLegendRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/ibulletlegendrendereventargs))

Event payloads generally include information about the `data`, `series` (if applicable), and DOM event details. See official docs for full event arg types: https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default#events

## Example usage (Angular standalone component)

```typescript
import { Component, OnInit } from '@angular/core';
import { BulletChartModule, BulletTooltipService } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [BulletChartModule],
  standalone: true,
  providers: [BulletTooltipService],
  template: `
    <ejs-bulletchart
      id="bullet"
      [dataSource]="data"
      valueField="value"
      targetField="target"
      [ranges]="ranges"
      [tooltip]="{ enable: true }"
      (load)="onLoad($event)"
      (loaded)="onLoaded($event)">
    </ejs-bulletchart>
  `
})
export class ExampleComponent implements OnInit {
  public data: any[] = [];
  public ranges: any[] = [];

  ngOnInit(): void {
    this.data = [ { value: 100, target: 80 } ];
    this.ranges = [ { end: 50, color: '#ffe0b2' }, { end: 100, color: '#c8e6c9' } ];
  }

  onLoad(args: any) { /* set theme or defaults */ }
  onLoaded(args: any) { /* e.g., analytics */ }
}
```

## Where to find the Base API

- Official online docs (index page):
  https://ej2.syncfusion.com/angular/documentation/api/bullet-chart/index-default

---

If you want, I can also:
- Expand the `api-reference.md` with full type signatures and default values (longer), or
- Inject a short API summary into other `references/*.md` pages where relevant (e.g., `visual-elements.md` or `axes-and-ranges.md`).
