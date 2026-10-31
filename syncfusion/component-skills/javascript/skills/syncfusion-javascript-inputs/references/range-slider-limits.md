# Limits — Syncfusion TypeScript Range Slider

## Table of Contents
- [Overview](#overview)
- [LimitDataModel Properties](#limitdatamodel-properties)
- [Default and MinRange Slider Limits](#default-and-minrange-slider-limits)
- [Range Slider Limits](#range-slider-limits)
- [Handle Lock](#handle-lock)
- [Customizing Limit Appearance](#customizing-limit-appearance)

---

## Overview

The `limits` property restricts how far the slider handles can move. The limited (restricted) area is visually darkened to differentiate it from the allowed area. This is useful when certain values are off-limits for business or process reasons.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 0, max: 100,
    value: 30,
    limits: { enabled: true, minStart: 10, minEnd: 40 },
    tooltip: { isVisible: true }
});
slider.appendTo('#slider');
```

---

## LimitDataModel Properties

All properties are optional. `enabled` must be `true` for limits to take effect.

| Property | Type | Description |
|---|---|---|
| `enabled` | boolean | Enable or disable the limits feature |
| `minStart` | number | Minimum boundary for the first handle |
| `minEnd` | number | Maximum boundary for the first handle |
| `maxStart` | number | Minimum boundary for the second handle (Range only) |
| `maxEnd` | number | Maximum boundary for the second handle (Range only) |
| `startHandleFixed` | boolean | Lock the first handle in place |
| `endHandleFixed` | boolean | Lock the second handle in place (Range only) |

---

## Default and MinRange Slider Limits

For single-handle sliders, only `minStart`, `minEnd`, and `startHandleFixed` apply:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 0,
    max: 100,
    value: 30,
    type: 'MinRange',
    limits: { enabled: true, minStart: 10, minEnd: 40 },
    tooltip: { isVisible: true }
});
slider.appendTo('#slider');
```

In this example the handle can only move between 10 and 40. The areas outside this range appear darkened.

---

## Range Slider Limits

In a Range Slider, both handles can be independently restricted:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 0,
    max: 100,
    type: 'Range',
    value: [30, 70],
    limits: {
        enabled: true,
        minStart: 10,   // first handle min
        minEnd: 40,     // first handle max
        maxStart: 60,   // second handle min
        maxEnd: 90      // second handle max
    },
    tooltip: { isVisible: true }
});
slider.appendTo('#slider');
```

Full example with ticks and tooltip:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 0, max: 100,
    value: [30, 70],
    step: 1,
    type: 'Range',
    ticks: { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true },
    limits: { enabled: true, minStart: 10, minEnd: 40, maxStart: 60, maxEnd: 90 },
    tooltip: { isVisible: true, placement: 'Before', showOn: 'Focus' }
});
slider.appendTo('#range');
```

---

## Handle Lock

Lock handles completely so they cannot be moved by the user:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

// Lock both handles
let slider: Slider = new Slider({
    min: 0,
    max: 100,
    type: 'Range',
    value: [30, 70],
    limits: {
        enabled: true,
        startHandleFixed: true,
        endHandleFixed: true
    },
    tooltip: { isVisible: true }
});
slider.appendTo('#slider');
```

Lock only the first handle:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 0, max: 100,
    type: 'Range',
    value: [25, 75],
    limits: { enabled: true, startHandleFixed: true },
    tooltip: { isVisible: true }
});
slider.appendTo('#slider');
```

---

## Customizing Limit Appearance

Override the default darkened limit bar color with CSS:

```css
/* Custom limit bar color */
.e-slider-container.e-horizontal .e-limits {
    background-color: rgba(69, 100, 233, 0.46);
}
```

With ticks for MinRange example:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let minRangeSlider: Slider = new Slider({
    min: 0, max: 100,
    value: 30,
    step: 1,
    type: 'MinRange',
    ticks: { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true },
    limits: { enabled: true, minStart: 10, minEnd: 40 },
    tooltip: { isVisible: true, placement: 'Before', showOn: 'Focus' }
});
minRangeSlider.appendTo('#minrange');
```
