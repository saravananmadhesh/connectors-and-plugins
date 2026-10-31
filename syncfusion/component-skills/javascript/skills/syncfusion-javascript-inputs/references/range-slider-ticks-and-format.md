# Ticks and Formatting — Syncfusion TypeScript Range Slider

## Table of Contents
- [Ticks Configuration](#ticks-configuration)
- [Tick Placement](#tick-placement)
- [Small and Large Steps](#small-and-large-steps)
- [Min and Max Values](#min-and-max-values)
- [Format API](#format-api)
- [Custom Formatting via Events](#custom-formatting-via-events)

---

## Ticks Configuration

The `ticks` property accepts a `TicksDataModel` object to control tick rendering:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    tooltip: { placement: 'Before', isVisible: true, showOn: 'Always' },
    ticks: { placement: 'After', largeStep: 20, smallStep: 10, showSmallTicks: true }
});
slider.appendTo('#slider');
```

### TicksDataModel properties

| Property | Type | Default | Description |
|---|---|---|---|
| `placement` | string | `'before'` | Position of ticks: `Before`, `After`, `Both`, `None` |
| `largeStep` | number | — | Distance between major ticks |
| `smallStep` | number | — | Distance between minor ticks |
| `showSmallTicks` | boolean | false | Show/hide minor ticks |
| `format` | string | — | Format string for tick values (uses internationalization) |

---

## Tick Placement

| Option | Description |
|---|---|
| `Before` | Ticks above (horizontal) or left (vertical) of the track |
| `After` | Ticks below (horizontal) or right (vertical) of the track |
| `Both` | Ticks on both sides of the track |
| `None` | No ticks rendered |

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

// Ticks on both sides
let slider: Slider = new Slider({
    value: 30,
    ticks: { placement: 'Both', largeStep: 20, smallStep: 10, showSmallTicks: true }
});
slider.appendTo('#slider');
```

---

## Small and Large Steps

- `largeStep` defines the interval between **major** ticks (labeled, larger marks)
- `smallStep` defines the interval between **minor** ticks (smaller marks, visible when `showSmallTicks: true`)
- `step` (on the Slider itself) defines the drag/key increment — set it equal to `smallStep` for consistent behavior

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    step: 10,
    ticks: {
        placement: 'After',
        largeStep: 20,
        smallStep: 10,
        showSmallTicks: true
    },
    tooltip: { placement: 'Before', isVisible: true, showOn: 'Always' }
});
slider.appendTo('#slider');
```

---

## Min and Max Values

Set custom min and max to define the slider's range:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 100,
    max: 1000,
    value: 400,
    ticks: { placement: 'After', largeStep: 200, smallStep: 100, showSmallTicks: true },
    tooltip: { placement: 'Before', isVisible: true, showOn: 'Always' }
});
slider.appendTo('#slider');
```

> Tick `largeStep` and `smallStep` should be set relative to the min–max range for meaningful spacing.

---

## Format API

Use the `format` property on `ticks` and `tooltip` to apply predefined formatting using Syncfusion Internationalization:

### Currency format (C)

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 0, max: 100, step: 1, value: 30,
    tooltip: { isVisible: true, format: 'C2' },
    ticks: { placement: 'After', format: 'C2', largeStep: 20, smallStep: 10, showSmallTicks: true }
});
slider.appendTo('#slider');
```

### Percentage format (P)

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 0, max: 1, value: 0.3, step: 0.01,
    ticks: { placement: 'After', largeStep: 0.2, smallStep: 0.1, showSmallTicks: true, format: 'P0' },
    tooltip: { placement: 'Before', isVisible: true, showOn: 'Always', format: 'P0' }
});
slider.appendTo('#slider');
```

### Custom format specifiers

Append units or control decimal places using `#` specifiers:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

// Kilometer with 2 decimal specifiers
let kmSlider: Slider = new Slider({
    min: 0, max: 100, step: 1, value: 30,
    tooltip: { isVisible: true, format: '##.## Km' },
    ticks: { placement: 'After', format: '##.## Km', largeStep: 20, smallStep: 10, showSmallTicks: true }
});
kmSlider.appendTo('#km-slider');

// Leading zeros (e.g., 030)
let leadingZeroSlider: Slider = new Slider({
    min: 0, max: 100, step: 1, value: 30,
    tooltip: { isVisible: true, format: '00##' },
    ticks: { placement: 'After', format: '00##', largeStep: 20, smallStep: 10, showSmallTicks: true }
});
leadingZeroSlider.appendTo('#zero-slider');
```

---

## Custom Formatting via Events

Use `renderingTicks` and `tooltipChange` events for fully custom label content (e.g., weekday names, dates, times).

### Display weekday names on ticks

```typescript
import { Slider, SliderTickEventArgs, SliderTooltipEventArgs } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 0,
    max: 6,
    value: 2,
    ticks: { placement: 'After', largeStep: 1 },
    renderingTicks: (args: SliderTickEventArgs) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        args.text = days[parseFloat(args.value as any)];
    },
    tooltipChange: (args: SliderTooltipEventArgs) => {
        args.text = 'Day ' + (Number(args.value) + 1).toString();
    },
    tooltip: { placement: 'Before', isVisible: true }
});
slider.appendTo('#slider');
```

### Custom tick classes via renderingTicks

```typescript
import { Slider, SliderTickEventArgs } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 0, max: 100,
    value: 30,
    step: 5,
    type: 'MinRange',
    ticks: { placement: 'Before', largeStep: 20 },
    renderingTicks: (args: SliderTickEventArgs) => {
        if (args.tickElement.classList.contains('e-large')) {
            args.tickElement.classList.add('e-custom');
        }
    }
});
slider.appendTo('#slider');
```

### Custom tick text via renderedTicks

```typescript
import { Slider, SliderTickRenderedEventArgs } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 0, max: 100,
    value: 30,
    type: 'MinRange',
    ticks: { placement: 'Both', largeStep: 20, smallStep: 5 },
    renderedTicks: (args: SliderTickRenderedEventArgs) => {
        const li: any = args.ticksWrapper.getElementsByClassName('e-large');
        const labels = ['Very Poor', 'Poor', 'Average', 'Good', 'Very Good', 'Excellent'];
        for (let i = 0; i < li.length; ++i) {
            (li[i].querySelectorAll('.e-tick-both')[1] as HTMLElement).innerText = labels[i];
        }
    }
});
slider.appendTo('#slider');
```
