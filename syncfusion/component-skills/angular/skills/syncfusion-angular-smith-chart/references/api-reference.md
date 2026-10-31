# Smith Chart API Reference (Syncfusion Angular)

## Table of Contents
- [Official Docs](#official-docs)
- [Component Import](#component-import)
- [Tag](#tag)
- [Selected Properties](#selected-properties-with-official-anchors)
- [Methods](#methods-anchors)
- [Events](#events-selected-with-arg-types)
- [Example](#example-angular-standalone)


Concise reference for the `Smithchart` Angular component. Links point to the official API anchors for detailed types and event argument definitions.

## Official docs
- Index: https://ej2.syncfusion.com/angular/documentation/api/smithchart/index-default

## Component import

```ts
import { SmithchartModule, SmithchartLegendService, TooltipRenderService } from '@syncfusion/ej2-angular-charts';
```

## Tag

- `<ejs-smithchart>`

## Selected Properties (with official anchors)

- `series: SmithchartSeriesModel[]` — Series collection. See: https://ej2.syncfusion.com/angular/documentation/api/smithchart/smithchartseriesmodel
- `renderType?: RenderType` — `Impedance | Admittance`. See: https://ej2.syncfusion.com/angular/documentation/api/smithchart/rendertype
- `horizontalAxis?: SmithchartAxisModel` — Horizontal axis settings. See: https://ej2.syncfusion.com/angular/documentation/api/smithchart/smithchartaxismodel
- `radialAxis?: SmithchartAxisModel` — Radial axis settings. See: https://ej2.syncfusion.com/angular/documentation/api/smithchart/smithchartaxismodel
- `legendSettings?: SmithchartLegendSettingsModel` — Legend options. See: https://ej2.syncfusion.com/angular/documentation/api/smithchart/smithchartlegendsettingsmodel
- `title?: TitleModel` — Title config. See: https://ej2.syncfusion.com/angular/documentation/api/smithchart/titlemodel
- `tooltip?: SmithChartTooltipSettingsModel` — Tooltip settings. See: https://ej2.syncfusion.com/angular/documentation/api/smithchart/ismithcharttooltipeventargs
- `theme?: SmithchartTheme` — Theme selection. See: https://ej2.syncfusion.com/angular/documentation/api/smithchart/smithcharttheme
- `background?: string` — Background color
- `border?: SmithchartBorderModel` — Border config. See: https://ej2.syncfusion.com/angular/documentation/api/smithchart/smithchartbordermodel
- `font?: SmithchartFontModel` — Font styles. See: https://ej2.syncfusion.com/angular/documentation/api/smithchart/smithchartfontmodel
- `width?: string` — Width in px or `%`
- `height?: string` — Height in px or `%`

## Methods (anchors)

- `destroy(): void` — Destroy component. https://ej2.syncfusion.com/angular/documentation/api/smithchart/index-default#destroy
- `export(type: SmithchartExportType, fileName?: string, orientation?: PdfPageOrientation): void` — Export. https://ej2.syncfusion.com/angular/documentation/api/smithchart/index-default#export
- `getModuleName(): string` — https://ej2.syncfusion.com/angular/documentation/api/smithchart/index-default#getmodulename
- `smithchartOnClick(e: PointerEvent): void` — Click handler. https://ej2.syncfusion.com/angular/documentation/api/smithchart/index-default#smithchartonclick
- `smithchartOnResize(): boolean` — Resize handler. https://ej2.syncfusion.com/angular/documentation/api/smithchart/index-default#smithchartonresize

## Events (selected with arg types)

- `animationComplete` — [ISmithchartAnimationCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/smithchart/ismithchartanimationcompleteeventargs)
- `axisLabelRender` — [ISmithchartAxisLabelRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/smithchart/ismithchartaxislabelrendereventargs)
- `beforePrint` — [ISmithchartPrintEventArgs](https://ej2.syncfusion.com/angular/documentation/api/smithchart/ismithchartprinteventargs)
- `legendRender` — [ISmithchartLegendRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/smithchart/ismithchartlegendrendereventargs)
- `load` / `loaded` — [ISmithchartLoadEventArgs](https://ej2.syncfusion.com/angular/documentation/api/smithchart/ismithchartloadeventargs) / [ISmithchartLoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/smithchart/ismithchartloadedeventargs)
- `seriesRender` — [ISmithchartSeriesRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/smithchart/ismithchartseriesrendereventargs)
- `textRender` — [ISmithchartTextRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/smithchart/ismithcharttextrendereventargs)
- `titleRender` — [ITitleRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/smithchart/ititlerendereventargs)
- `tooltipRender` — [ISmithChartTooltipEventArgs](https://ej2.syncfusion.com/angular/documentation/api/smithchart/ismithcharttooltipeventargs)

## Example (Angular standalone)

```ts
import { Component, ViewEncapsulation } from '@angular/core';
import {
  SmithchartModule,
  TooltipRenderService
} from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SmithchartModule],
  providers: [TooltipRenderService],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-smithchart
      [series]="series"
      (tooltipRender)="onTooltip($event)"
      style="display:block;height:350px">
    </ejs-smithchart>
  `
})
export class ExampleComponent {

  series = [
    {
      marker: { visible: true },
      tooltip: { visible: true },
      points: [
        { resistance: 0.4, reactance: 0.2 }
      ]
    }
  ];

  onTooltip(args: any): void {
    console.log(args);
  }
}
```