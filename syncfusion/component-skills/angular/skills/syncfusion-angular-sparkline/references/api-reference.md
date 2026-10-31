# Sparkline API Reference (Syncfusion Angular)

This file summarizes selected properties, methods, and events for the `Sparkline` component and links to official API anchors for complex models and event argument types.

## Official docs
- Index: https://ej2.syncfusion.com/angular/documentation/api/sparkline/index-default

## Component import

```ts
import { SparklineModule, SparklineTooltipService } from '@syncfusion/ej2-angular-charts';
```

## Tag

- `<ejs-sparkline>`

## Selected Properties (with links)

- `dataSource: Object[] | DataManager` — Data for the sparkline.
- `type?: [SparklineType](https://ej2.syncfusion.com/angular/documentation/api/sparkline/sparklinetype)` — `Line | Column | Area | Pie | WinLoss`.
- `xName?: string` — Field name for X values.
- `yName?: string` — Field name for Y values.
- `valueType?: [SparklineValueType](https://ej2.syncfusion.com/angular/documentation/api/sparkline/sparklinevaluetype)` — `Numeric | DateTime`.
- `height?: string` — Height of the container.
- `width?: string` — Width of the container.
- `fill?: string` — Series fill color (default `#00bdae`).
- `lineWidth?: number` — Line width for line type (default `1`).
- `markerSettings?: [SparklineMarkerSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/sparkline/sparklinemarkersettingsmodel)` — Marker configuration.
- `dataLabelSettings?: [SparklineDataLabelSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/sparkline/sparklinedatalabelsettingsmodel)` — Data label configuration.
- `tooltipSettings?: [SparklineTooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/sparkline/sparklinetooltipsettingsmodel)` — Tooltip config.
- `rangeBandSettings?: [RangeBandSettingsModel[]](https://ej2.syncfusion.com/angular/documentation/api/sparkline/rangebandsettingsmodel)` — Range bands.
- `axisSettings?: [AxisSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/sparkline/axissettingsmodel)` — Axis customization.
- `palette?: string[]` — Palette for column and pie types.
- `useGroupingSeparator?: boolean` — Enable group separators.
- `format?: string` — Internationalization format.
- `theme?: [SparklineTheme](https://ej2.syncfusion.com/angular/documentation/api/sparkline/sparklinetheme)` — Theme.
- `enableRtl?: boolean` — RTL support.
- `enablePersistence?: boolean` — Persist component state.

> For full property list and defaults, see the official API index.

## Methods

- `destroy(): void` — Destroy the component. (see: https://ej2.syncfusion.com/angular/documentation/api/sparkline/index-default#destroy)
- `getModuleName(): string` — Get component name. (see: https://ej2.syncfusion.com/angular/documentation/api/sparkline/index-default#getmodulename)
- `renderSparkline(): void` — Render sparkline elements. (see: https://ej2.syncfusion.com/angular/documentation/api/sparkline/index-default#rendersparkline)

## Events (selected)

- `load` — [ISparklineLoadEventArgs](https://ej2.syncfusion.com/angular/documentation/api/sparkline/isparklineloadeventargs)
- `loaded` — [ISparklineLoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/sparkline/isparklineloadedeventargs)
- `axisRendering` — [IAxisRenderingEventArgs](https://ej2.syncfusion.com/angular/documentation/api/sparkline/iaxisrenderingeventargs)
- `markerRendering` — [IMarkerRenderingEventArgs](https://ej2.syncfusion.com/angular/documentation/api/sparkline/imarkerrenderingeventargs)
- `dataLabelRendering` — [IDataLabelRenderingEventArgs](https://ej2.syncfusion.com/angular/documentation/api/sparkline/idatalabelrenderingeventargs)
- `pointRendering` — [ISparklinePointEventArgs](https://ej2.syncfusion.com/angular/documentation/api/sparkline/isparklinepointeventargs)
- `pointRegionMouseClick` — [IPointRegionEventArgs](https://ej2.syncfusion.com/angular/documentation/api/sparkline/ipointregioneventargs)
- `pointRegionMouseMove` — [IPointRegionEventArgs](https://ej2.syncfusion.com/angular/documentation/api/sparkline/ipointregioneventargs)
- `sparklineMouseClick` — [ISparklineMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/sparkline/isparklinemouseeventargs)
- `sparklineMouseMove` — [ISparklineMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/sparkline/isparklinemouseeventargs)
- `tooltipInitialize` — [ITooltipRenderingEventArgs](https://ej2.syncfusion.com/angular/documentation/api/sparkline/itooltiprenderingeventargs)
- `resize` — [ISparklineResizeEventArgs](https://ej2.syncfusion.com/angular/documentation/api/sparkline/isparklineresizeeventargs)

## Example (Angular standalone)

```ts
import { Component } from '@angular/core';
import { SparklineModule, SparklineTooltipService } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [SparklineModule],
  providers: [SparklineTooltipService],
  standalone: true,
  template: `\
    <ejs-sparkline [dataSource]="data" xName="x" yName="y" type="Line" [tooltipSettings]="{ visible: true }">\
    </ejs-sparkline>`
})
export class ExampleComponent {
  public data = [ { x: 'Jan', y: 2 }, { x: 'Feb', y: 6 } ];
}
```

---

If you'd like, I can expand this with full signatures/defaults or add these inline anchors into the other reference pages (`advanced-features.md`, etc.).