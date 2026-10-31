# Range Navigator API Reference (Syncfusion Angular)

This file summarizes the main properties, methods, and events for the Syncfusion Angular `RangeNavigator` component and links to the official API anchors for complex models and event arg types.

## Table of Contents

- [Component import](#component-import)
- [Tag](#tag)
- [Key Properties](#key-properties)
- [Methods](#methods)
- [Events](#events)
- [Example usage ](#example-usage)
- [Official API](#official-api)

## Component import

```typescript
import { RangeNavigatorModule, AreaSeriesService, DateTimeService, RangeTooltipService, PeriodSelectorService } from '@syncfusion/ej2-angular-charts';
```

## Tag

- `<ejs-rangenavigator>` (use via `RangeNavigatorModule`)

## Key Properties (selected)

- `dataSource: Object | DataManager` — Chart data source (array or DataManager).
- `valueType: [RangeValueType](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#valuetype)` — `Double`, `DateTime`, `Logarithmic`, `DateTimeCategory`.
- `value: number[] | Date[]` — Selected range values (array of two values).
- `minimum?: number | Date` — Axis minimum value.
- `maximum?: number | Date` — Axis maximum value.
- `interval?: number` — Axis interval value.
- `intervalType?: [RangeIntervalType](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/rangeintervaltype)` — Interval type for date axes.
- `groupBy?: [RangeIntervalType](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#groupby)` — Auto grouping for labels.
- `labelFormat?: [string](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#labelformat)` — Label format string (e.g., `MMM dd, yyyy`, `n0`).
- `labelIntersectAction?: [RangeLabelIntersectAction](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/rangelabelintersectaction)` — Label collision handling.
- `labelPlacement?: [NavigatorPlacement](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/navigatorplacement)` — Label placement on ticks.
- `labelStyle?: [FontModel](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/fontmodel)` — Axis label styling.
- `majorGridLines?: [MajorGridLinesModel](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#majorgridlines)` — Major grid lines.
- `majorTickLines?: [MajorTickLinesModel](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#majorticklines)` — Major tick lines.
- `navigatorStyleSettings?: [StyleSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/stylesettingsmodel)` — Navigator style customizations.
- `navigatorBorder?: [BorderModel](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/bordermodel)` — Border customization.
- `series?: [RangeNavigatorSeriesModel[]](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/rangenavigatorseriesmodel)` — Series collection configuration.
- `tooltip?: [RangeTooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/rangetooltipsettingsmodel)` — Tooltip settings.
- `periodSelectorSettings?: [PeriodSelectorSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/periodselectorsettingsmodel)` — Period selector configuration.
- `skeleton?: [string](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#skeleton)` — Date skeleton format (e.g., 'yMd', 'yMMM').
- `skeletonType?: [SkeletonType](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/skeletontype)` — Skeleton type (DateTime by default).
- `enableGrouping?: [boolean](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#enablegrouping)` — Enable multi-level axis labels for better label organization.
- `enableDeferredUpdate?: [boolean](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#enabledeferredupdate)` — Enable deferred update for smooth thumb dragging (updates on mouseup).
- `allowSnapping?: [boolean](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#allowsnapping)` — Enable snapping to nearest data point when dragging thumbs.
- `enableRtl?: [boolean](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#enablertl)` — Right-to-left rendering.
- `enablePersistence?: [boolean](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#enablepersistence)` — Persist state across reloads.
- `theme?: [ChartTheme](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/charttheme)` — Theme selection.
- `height?: string` — Chart height (px or `%`).
- `width?: string` — Chart width (px or `%`).
- `locale?: string` — Locale code for localization.
- `margin?: [MarginModel](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/marginmodel)` — Margin settings for the component.

> For full property lists and default values, see the Base API: https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default

## Methods

- `createSecondaryElement(): void` — Creates secondary range elements. (see: https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#createsecondaryelement)
- `destroy(): void` — Destroys the component and removes handlers. (see: https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#destroy)
- `export(type: ExportType, fileName?: string, orientation?: PdfPageOrientation, controls?: any[], width?: number, height?: number, isVertical?: boolean): void` — Export as image/PDF. (see: https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#export)
- `getModuleName(): string` — Returns module name. (see: https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#getmodulename)
- `onPropertyChanged(newProp: RangeNavigatorModel): void` — Internal property-change handler. (see: https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#onpropertychanged)
- `preRender(): void` — Initialization entry point. (see: https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#prerender)
- `print(id?: string | string[] | Element): void` — Print the chart. (see: https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#print)
- `render(): void` — Render the component. (see: https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#render)
- `renderChart(resize?: boolean): void` — Render internal chart (optionally resized). (see: https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#renderchart)

## Events (selected)

- `beforePrint` — Fires before printing starts. (args type: `IPrintEventArgs`, docs: https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default#events)
- `beforeResize` — Fires before window resize. (args type: [IRangeBeforeResizeEventArgs](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/irangebeforeresizeeventargs))
- `changed` — Fires after slider value changes. (args type: [IChangedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/ichangedeventargs))
- `labelRender` — Fires before axis label rendering. (args type: [ILabelRenderEventsArgs](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/ilabelrendereventsargs))
- `load` — Fired before the Range Navigator renders. (args type: [IRangeLoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/irangeloadedeventargs))
- `loaded` — Fired after the Range Navigator renders. (args type: [IRangeLoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/irangeloadedeventargs))
- `resized` — Fires after navigator resized. (args type: [IResizeRangeNavigatorEventArgs](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/iresizerangenavigatoreventargs))
- `selectorRender` — Fires before selector rendering. (args type: [IRangeSelectorRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/irangeselectorrendereventargs))
- `tooltipRender` — Fires before tooltip display. (args type: [IRangeTooltipRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/range-navigator/irangetooltiprendereventargs))

Event payloads typically include `start`/`end` or `value` arrays and related DOM/event details. See the official events list for full arg definitions.

## Example usage (Angular standalone component)

```typescript
import { Component, OnInit } from '@angular/core';
import { RangeNavigatorModule, AreaSeriesService, DateTimeService, RangeTooltipService } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [RangeNavigatorModule],
  providers: [AreaSeriesService, DateTimeService, RangeTooltipService],
  standalone: true,
  template: `
    <ejs-rangenavigator
      id="rn"
      [dataSource]="data"
      valueType="DateTime"
      [tooltip]="{ enable: true }"
      (changed)="onChanged($event)"
      (load)="onLoad($event)">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series [dataSource]="data" xName="date" yName="value" type="Area"></e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class ExampleComponent implements OnInit {
  public data: any[] = [];

  ngOnInit(): void {
    this.data = [ { date: new Date(2023,0,1), value: 21 }, { date: new Date(2023,1,1), value: 24 } ];
  }

  onChanged(args: any) { console.log('range changed', args); }
  onLoad(args: any) { console.log('range navigator load', args); }
}
```

## Base API

- Index: https://ej2.syncfusion.com/angular/documentation/api/range-navigator/index-default
