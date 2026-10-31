# Slider Types and Core Configuration

## Table of Contents
- [Slider Types](#slider-types)
- [Default Slider](#default-slider)
- [MinRange Slider](#minrange-slider)
- [Range Slider](#range-slider)
- [Core Properties](#core-properties)
- [Reversible Slider](#reversible-slider)
- [RTL and Accessibility Properties](#rtl-and-accessibility-properties)

---

## Slider Types

The `type` property controls the slider variant:

| Type | Value Property | Behavior |
|---|---|---|
| `Default` | `number` | Single handle, no range shadow |
| `MinRange` | `number` | Single handle, shadow from start to handle |
| `Range` | `number[]` | Two handles, shadow between them |

> Both `Default` and `MinRange` select a single value. `MinRange` adds a filled track from min to the handle. Use `Range` to select a span of values.

---

## Default Slider

The simplest slider — single handle, no range highlight:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let defaultSlider: Slider = new Slider({
    value: 30
    // type: 'Default' is the default, no need to specify
});
defaultSlider.appendTo('#default');
```

---

## MinRange Slider

Shows a filled track from the minimum to the current handle position:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let minRangeSlider: Slider = new Slider({
    value: 30,
    type: 'MinRange'
});
minRangeSlider.appendTo('#minrange');
```

Use `MinRange` when the filled track visually communicates "selected amount" (e.g., volume, progress).

---

## Range Slider

Two handles to select a start and end value. The `value` property must be a two-element array:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let rangeSlider: Slider = new Slider({
    value: [30, 70],
    type: 'Range'
});
rangeSlider.appendTo('#range');
```

Use `Range` for price filters, date pickers, or any scenario requiring a minimum and maximum selection.

---

## Core Properties

### min and max

Set the allowed value range:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 100,
    max: 1000,
    value: 400,
    ticks: { placement: 'After', largeStep: 200, smallStep: 100, showSmallTicks: true },
    tooltip: { isVisible: true, placement: 'Before', showOn: 'Always' }
});
slider.appendTo('#slider');
```

- `min` defaults to `0`
- `max` defaults to `100`

### step

Controls how much the value changes per increment:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    step: 10,  // jumps in increments of 10
    ticks: { placement: 'After', largeStep: 20, smallStep: 10, showSmallTicks: true },
    tooltip: { isVisible: true, placement: 'Before', showOn: 'Always' }
});
slider.appendTo('#slider');
```

### enabled

Enable or disable the slider. A disabled slider is not interactive:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    enabled: false  // disabled state
});
slider.appendTo('#slider');
```

### readonly

Render slider with its value visible but non-interactive:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    readonly: true
});
slider.appendTo('#slider');
```

### cssClass

Apply custom CSS classes for styling:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    cssClass: 'custom-slider'
});
slider.appendTo('#slider');
```

### width

Set an explicit width for the slider container:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    width: '300px'
});
slider.appendTo('#slider');
```

### enableAnimation

Disable the smooth animation on value changes:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    enableAnimation: false
});
slider.appendTo('#slider');
```

### customValues

Specify an explicit array of values instead of using min/max/step:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    customValues: [10, 20, 40, 80, 100]
});
slider.appendTo('#slider');
```

`min`, `max`, and `step` are ignored when `customValues` is set.

---

## Reversible Slider

Create a slider with values displayed in reverse (descending) order by swapping `min` and `max`:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let reversibleSlider: Slider = new Slider({
    type: 'Range',
    orientation: 'Vertical',
    min: 100,   // set min to the higher value
    max: 0,     // set max to the lower value
    value: [30, 70],
    ticks: { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true },
    tooltip: { placement: 'Before', isVisible: true, showOn: 'Always' }
});
reversibleSlider.appendTo('#slider');
```

> For horizontal reversible sliders, use `enableRtl: true` instead of swapping min/max.

---

## RTL and Accessibility Properties

### enableRtl

Renders the slider in right-to-left direction. Also achieves a reversible effect for horizontal sliders:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let rtlSlider: Slider = new Slider({
    value: 30,
    enableRtl: true
});
rtlSlider.appendTo('#slider');
```

### enablePersistence

Persists the slider's current value between page reloads:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    enablePersistence: true
});
slider.appendTo('#slider');
```

### enableHtmlSanitizer

Sanitizes untrusted HTML strings in the component (enabled by default):

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    enableHtmlSanitizer: true  // default: true
});
slider.appendTo('#slider');
```
