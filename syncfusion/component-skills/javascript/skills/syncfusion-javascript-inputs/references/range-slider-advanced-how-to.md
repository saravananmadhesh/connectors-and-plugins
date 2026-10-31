# Advanced How-To — Syncfusion TypeScript Range Slider

## Table of Contents
- [Date Format Slider](#date-format-slider)
- [Time Format Slider](#time-format-slider)
- [Custom Numeric Formatting](#custom-numeric-formatting)
- [Reversible Slider](#reversible-slider)
- [Show Slider from Hidden State](#show-slider-from-hidden-state)
- [Form Validation with FormValidator](#form-validation-with-formvalidator)

---

## Date Format Slider

Use JavaScript date milliseconds as slider values to create a date picker slider. Format ticks and tooltip using `renderingTicks` and `tooltipChange` events:

```typescript
import { Slider, SliderTickEventArgs, SliderTooltipEventArgs } from '@syncfusion/ej2-inputs';

let dateSlider: Slider = new Slider({
    // Use getTime() to convert dates to milliseconds
    min: new Date("2013-06-13").getTime(),
    value: new Date("2013-06-15").getTime(),
    max: new Date("2013-06-21").getTime(),
    step: 86400000,  // 1 day in milliseconds
    tooltipChange: (args: SliderTooltipEventArgs) => {
        const ms = Number(args.text);
        const fmt: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
        args.text = new Date(ms).toLocaleDateString("en-us", fmt);
    },
    tooltip: { placement: 'Before', isVisible: true },
    renderingTicks: (args: SliderTickEventArgs) => {
        const ms = Number(args.value);
        const fmt: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
        args.text = new Date(ms).toLocaleDateString("en-us", fmt);
    },
    ticks: {
        placement: 'After',
        largeStep: 2 * 86400000  // every 2 days
    },
    showButtons: true
});
dateSlider.appendTo('#slider');
```

---

## Time Format Slider

Format slider values as time strings using `renderingTicks` and `tooltipChange`:

```typescript
import { Slider, SliderTickEventArgs, SliderTooltipEventArgs } from '@syncfusion/ej2-inputs';

let timeSlider: Slider = new Slider({
    min: new Date(2013, 6, 13, 11).getTime(),
    max: new Date(2013, 6, 13, 17).getTime(),
    value: new Date(2013, 6, 13, 13).getTime(),
    step: 3600000,  // 1 hour in milliseconds
    tooltipChange: (args: SliderTooltipEventArgs) => {
        const ms = Number(args.text);
        const fmt: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
        args.text = new Date(ms).toLocaleTimeString("en-us", fmt);
    },
    tooltip: { placement: 'Before', isVisible: true },
    renderingTicks: (args: SliderTickEventArgs) => {
        const ms = Number(args.value);
        const fmt: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
        args.text = new Date(ms).toLocaleTimeString("en-us", fmt);
    },
    ticks: {
        placement: 'After',
        largeStep: 2 * 3600000  // every 2 hours
    },
    showButtons: true
});
timeSlider.appendTo('#slider');
```

---

## Custom Numeric Formatting

### Kilometer with decimal specifiers

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let kmSlider: Slider = new Slider({
    min: 0, max: 100, step: 1, value: 30,
    tooltip: { isVisible: true, format: '##.## Km' },
    ticks: { placement: 'After', format: '##.## Km', largeStep: 20, smallStep: 10, showSmallTicks: true }
});
kmSlider.appendTo('#slider');
```

### Decimal values with trailing zeros

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let decimalSlider: Slider = new Slider({
    min: 0.1, max: 0.2, step: 0.01, value: 0.13,
    tooltip: { isVisible: true, format: '##.#00' },
    ticks: { placement: 'After', format: '##.#00', largeStep: 0.02, smallStep: 0.01, showSmallTicks: true }
});
decimalSlider.appendTo('#slider1');
```

### Leading zeros

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let leadingZeroSlider: Slider = new Slider({
    min: 0, max: 100, step: 1, value: 30,
    tooltip: { isVisible: true, format: '00##' },
    ticks: { placement: 'After', format: '00##', largeStep: 20, smallStep: 10, showSmallTicks: true }
});
leadingZeroSlider.appendTo('#slider2');
```

---

## Reversible Slider

Render slider values in descending order (high to low):

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

// Vertical reversible range slider
let reversibleSlider: Slider = new Slider({
    type: 'Range',
    orientation: 'Vertical',
    min: 100,   // swap: set min to high value
    max: 0,     // swap: set max to low value
    value: [30, 70],
    ticks: { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true },
    tooltip: { placement: 'Before', isVisible: true, showOn: 'Always' }
});
reversibleSlider.appendTo('#slider');
```

> For a **horizontal** reversible slider, use `enableRtl: true` instead of swapping min/max.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

// Horizontal reversible slider using RTL
let rtlReversibleSlider: Slider = new Slider({
    value: 30,
    enableRtl: true
});
rtlReversibleSlider.appendTo('#slider');
```

---

## Show Slider from Hidden State

When a slider is rendered inside a hidden element (`display: none`), it cannot calculate its dimensions. Call `refresh()` after making it visible:

```typescript
import { Slider, SliderTooltipEventArgs, SliderTickEventArgs } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

// Render the button
let button: Button = new Button({ content: 'Show Slider' });
button.appendTo('#element');

// Initialize slider in hidden container
let sliderObj: Slider = new Slider({
    min: new Date(2013, 6, 13, 11).getTime(),
    max: new Date(2013, 6, 13, 17).getTime(),
    step: 3600000,
    showButtons: true,
    value: new Date(2013, 6, 13, 13).getTime(),
    tooltipChange: tooltipChangeHandler,
    tooltip: { placement: 'Before', isVisible: true },
    renderingTicks: renderingTicksHandler,
    ticks: {
        placement: 'After',
        largeStep: 2 * 3600000,
        smallStep: 3600000,
        showSmallTicks: true
    },
    type: 'MinRange'
});
sliderObj.appendTo('#slider');

function tooltipChangeHandler(args: SliderTooltipEventArgs): void {
    const fmt: { [key: string]: string } = { hour: '2-digit', minute: '2-digit' };
    args.text = new Date(Number(args.text)).toLocaleTimeString('en-us', fmt);
}

function renderingTicksHandler(args: SliderTickEventArgs): void {
    const fmt: { [key: string]: string } = { hour: '2-digit', minute: '2-digit' };
    args.text = new Date(Number(args.value)).toLocaleTimeString('en-us', fmt);
}

// On button click: show container and call refresh()
document.querySelector('#element')?.addEventListener('click', () => {
    const container = document.getElementById("case");
    const sliderEl = document.getElementById("slider");
    if (container) container.style.display = "block";
    // Must call refresh() to re-render in now-visible dimensions
    if (sliderEl && (sliderEl as any).ej2_instances?.[0]) {
        (sliderEl as any).ej2_instances[0].refresh();
    }
});
```

> Always call `refresh()` after showing a hidden slider. Without it, the slider track and handles will render at incorrect positions.

---

## Form Validation with FormValidator

Validate slider values inside a form using Syncfusion `FormValidator`:

### Basic setup

```typescript
import { Slider } from '@syncfusion/ej2-inputs';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    type: 'MinRange',
    value: 30,
    ticks: { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true },
    changed: onChanged
});
slider.appendTo('#min-slider');

const minOptions: FormValidatorModel = {
    rules: {
        'min-slider': {
            validateHidden: true,
            min: [40, "You must select value greater than or equal to 40"]
        }
    }
};

let formObj: FormValidator = new FormValidator("#formMinId", minOptions);

function onChanged(args: any) {
    formObj.validate();
}
```

### FormValidator rules for sliders

| Rule | Description | Example |
|---|---|---|
| `max` | Value must be ≤ max | `max: [40, "Must be ≤ 40"]` |
| `min` | Value must be ≥ min | `min: [6, "Must be ≥ 6"]` |
| `regex` | Value must match pattern | `regex: [/40/, "Must equal 40"]` |
| `range` | Value must be between range | `range: [40, 80, "Must be 40–80"]` |

> Set `validateHidden: true` because the slider uses a hidden input internally.

### Custom range validation for Range Slider

```typescript
import { Slider } from '@syncfusion/ej2-inputs';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';

let rangeSlider: Slider = new Slider({
    type: 'Range',
    value: [30, 70],
    ticks: { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true },
    changed: onRangeChanged
});
rangeSlider.appendTo('#custom-slider');

const customOptions: FormValidatorModel = {
    rules: {
        'custom-slider': {
            validateHidden: true,
            range: [validateRange, "You must select values between 40 and 80"]
        }
    }
};

let formCustomObj: FormValidator = new FormValidator("#formCustomId", customOptions);

function onRangeChanged(args: any) {
    formCustomObj.validate();
}

function validateRange(args: any): boolean {
    return (rangeSlider.value as number[])[0] >= 40 && (rangeSlider.value as number[])[1] <= 80;
}
```

> Form validation can be done using either the slider element's **ID** or its **name** attribute. Specify the correct key in the `rules` object to match.
