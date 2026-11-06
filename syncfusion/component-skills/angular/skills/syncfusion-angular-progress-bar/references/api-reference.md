# Progress Bar API Reference (Syncfusion Angular)

## Table of Contents
- [Component import](#component-import)
- [Tag](#tag)
- [Key Properties](#key-properties)
- [Methods](#methods)
- [Events](#events)
- [Example](#example-angular-standalone-component)
- [Official API](#official-api)

This file summarizes the primary properties, methods, and events for the Syncfusion Angular `ProgressBar` component. Links point to the official API anchors for complex models and event argument types.

## Component import

```typescript
import { ProgressBarModule, ProgressTooltipService, ProgressAnnotationService } from '@syncfusion/ej2-angular-progressbar';
```

## Tag

- `<ejs-progressbar>` (use via `ProgressBarModule`)

## Key Properties 

- `value: number` — Current progress value.
- `minimum?: number` — Minimum progress value (defaults to 0).
- `maximum?: number` — Maximum progress value (defaults to 100).
- `type?: [ProgressType](https://ej2.syncfusion.com/angular/documentation/api/progressbar/progresstype)` — `Linear`, `Circular`, `SemiCircular`.
- `isIndeterminate?: boolean` — Indeterminate progress mode.
- `secondaryProgress?: number` — Buffer/secondary progress value.
- `progressColor?: string` — Primary progress color.
- `secondaryProgressColor?: string` — Secondary progress color.
- `trackColor?: string` — Track/background color.
- `width?: string` — Width of the progress bar (px or `%`).
- `height?: string` — Height of the progress bar (px or `%`).
- `radius?: string` — Track radius for circular bars.
- `innerRadius?: string` — Inner radius for circular bars.
- `startAngle?: number` — Start angle for circular progress.
- `endAngle?: number` — End angle for circular progress.
- `segmentCount?: number` — Number of segments in segmented progress.
- `segmentColor?: string[]` — Array of colors for segments.
- `gapWidth?: number` — Gap width between segments.
- `cornerRadius?: [CornerType](https://ej2.syncfusion.com/angular/documentation/api/progressbar/cornertype)` — Corner style (e.g., `Auto`).
- `animation?: [AnimationModel](https://ej2.syncfusion.com/angular/documentation/api/progressbar/animationmodel)` — Animation settings.
- `labelStyle?: [FontModel](https://ej2.syncfusion.com/angular/documentation/api/progressbar/fontmodel)` — Label styling.
- `labelOnTrack?: boolean` — Show label on track (defaults to true).
- `showProgressValue?: boolean` — Display the numeric progress value.
- `rangeColors?: [RangeColorModel[]](https://ej2.syncfusion.com/angular/documentation/api/progressbar/rangecolormodel)` — Color ranges for value segments.
- `isStriped?: boolean` — Striped effect on progress bar.
- `isGradient?: boolean` — Gradient effect for progress.
- `progressThickness?: number` — Thickness of the progress indicator.
- `secondaryProgressThickness?: number` — Thickness for secondary progress.
- `trackThickness?: number` — Thickness for the track.
- `enableRtl?: boolean` — Right-to-left rendering.
- `enablePersistence?: boolean` — Persist state across reloads.
- `locale?: string` — Locale code for localization.
- `theme?: [ProgressTheme](https://ej2.syncfusion.com/angular/documentation/api/progressbar/progresstheme)` — Theme selection.
- `annotations?: [ProgressAnnotationSettingsModel[]](https://ej2.syncfusion.com/angular/documentation/api/progressbar/progressannotationsettingsmodel)` — Annotation configuration.
- `progressAnnotationModule?: [ProgressAnnotation](https://ej2.syncfusion.com/angular/documentation/api/progressbar/progressannotation)` — Module injection for annotations.
- `progressTooltipModule?: [ProgressTooltip](https://ej2.syncfusion.com/angular/documentation/api/progressbar/progresstooltip)` — Module injection for tooltip support.

> For the full list and defaults, consult the official API: https://ej2.syncfusion.com/angular/documentation/api/progressbar/index-default

## Methods

- `destroy(): void` — Destroy the component and free resources. (see: https://ej2.syncfusion.com/angular/documentation/api/progressbar/index-default#destroy)

## Events

- `load` — Fired before the progress bar is rendered. (args type: [ILoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/progressbar/iloadedeventargs))
- `loaded` — Fired after the progress bar has rendered. (args type: [ILoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/progressbar/iloadedeventargs))
- `animationComplete` — Fired after animation completes. (args type: [IProgressValueEventArgs](https://ej2.syncfusion.com/angular/documentation/api/progressbar/iprogressvalueeventargs))
- `progressCompleted` — Fired after the progress value reaches completion. (args type: [IProgressValueEventArgs](https://ej2.syncfusion.com/angular/documentation/api/progressbar/iprogresseventargs))
- `valueChanged` — Fired when the `value` changes. (args type: [IProgressValueEventArgs](https://ej2.syncfusion.com/angular/documentation/api/progressbar/iprogresseventargs))
- `textRender` — Fired before the progress label renders. (args type: [ITextRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/progressbar/itextrendereventargs))
- `tooltipRender` — Fired before a tooltip is shown. (args type: [ITooltipRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/progressbar/itooltiprendereventargs))
- `mouseClick`, `mouseDown`, `mouseUp`, `mouseMove`, `mouseLeave` — Mouse interaction events. 

## Example (Angular standalone component)

```typescript
import { Component, OnInit } from '@angular/core';
import { ProgressBarModule, ProgressTooltipService } from '@syncfusion/ej2-angular-progressbar';

@Component({
  imports: [ProgressBarModule],
  providers: [ProgressTooltipService],
  selector:'my-app',
  standalone: true,
  template: `
    <ejs-progressbar
      id="progress"
      [value]="value"
      [secondaryProgress]="secondary"
      [type]="'Linear'"
      [width]="'100%'"
      height="6"
      (progressCompleted)="onComplete($event)"
      (valueChanged)="onValueChanged($event)">
    </ejs-progressbar>
  `
})
export class ExampleComponent implements OnInit {
  public value = 45;
  public secondary = 70;

  ngOnInit(): void {}

  onComplete(args: any) { console.log('completed', args); }
  onValueChanged(args: any) { console.log('value changed', args); }
}
```

## Official API

- Index: https://ej2.syncfusion.com/angular/documentation/api/progressbar/index-default

---

If you want, I can:
- inject inline API links into the other `references/*.md` pages, or
- expand this `api-reference.md` with full parameter lists and default values.
