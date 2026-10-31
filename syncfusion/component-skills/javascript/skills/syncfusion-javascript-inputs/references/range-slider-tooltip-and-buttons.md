# Tooltip and Buttons — Syncfusion TypeScript Range Slider

## Table of Contents
- [Tooltip Configuration](#tooltip-configuration)
- [Tooltip Placement](#tooltip-placement)
- [ShowOn Modes](#showon-modes)
- [Tooltip Formatting](#tooltip-formatting)
- [Tooltip CSS Class](#tooltip-css-class)
- [Increment / Decrement Buttons](#increment--decrement-buttons)
- [Localization](#localization)

---

## Tooltip Configuration

The `tooltip` property accepts a `TooltipDataModel` object to control tooltip visibility and behavior:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    type: 'MinRange',
    tooltip: {
        placement: 'After',
        isVisible: true,
        showOn: 'Always'
    }
});
slider.appendTo('#slider');
```

### TooltipDataModel properties

| Property | Type | Default | Description |
|---|---|---|---|
| `isVisible` | boolean | `false` | Show or hide the tooltip |
| `placement` | string | `'Before'` | Position: `Before` or `After` |
| `showOn` | string | `'Focus'` | Display mode: `Auto`, `Always`, `Hover`, `Focus`, `Click` |
| `format` | string | `null` | Format string for tooltip content |
| `cssClass` | string | — | Custom CSS class applied to the tooltip element |

---

## Tooltip Placement

| Value | Description |
|---|---|
| `Before` | Above the horizontal track, or left of the vertical track |
| `After` | Below the horizontal track, or right of the vertical track |

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

// Tooltip above the track
let slider: Slider = new Slider({
    value: 30,
    tooltip: { isVisible: true, placement: 'Before' }
});
slider.appendTo('#slider');
```

---

## ShowOn Modes

Controls when the tooltip appears:

| Value | Behavior |
|---|---|
| `Auto` | Shows on hover in desktop, tap-hold on touch |
| `Always` | Tooltip is always visible |
| `Hover` | Appears on mouse hover |
| `Focus` | Appears when the handle is focused |
| `Click` | Appears on click/tap |

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

// Always-visible tooltip
let slider: Slider = new Slider({
    value: 30,
    tooltip: { isVisible: true, placement: 'Before', showOn: 'Always' }
});
slider.appendTo('#slider');

// Focus-only tooltip
let focusSlider: Slider = new Slider({
    value: 30,
    tooltip: { isVisible: true, placement: 'After', showOn: 'Focus' }
});
focusSlider.appendTo('#focus-slider');
```

---

## Tooltip Formatting

Use the `format` property on the `tooltip` for internationalization-based formatting, or use the `tooltipChange` event for fully custom content.

### Format API

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 0, max: 100, step: 1, value: 30,
    tooltip: { isVisible: true, format: 'C2' }  // Currency with 2 decimals
});
slider.appendTo('#slider');
```

### Custom tooltip content via tooltipChange event

```typescript
import { Slider, SliderTooltipEventArgs } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 0, max: 6, value: 2,
    tooltip: { placement: 'Before', isVisible: true },
    tooltipChange: (args: SliderTooltipEventArgs) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        args.text = days[Number(args.value)];
    }
});
slider.appendTo('#slider');
```

---

## Tooltip CSS Class

Apply a custom CSS class to the tooltip for styling:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    tooltip: {
        isVisible: true,
        placement: 'Before',
        cssClass: 'e-tooltip-customization'
    }
});
slider.appendTo('#slider');
```

---

## Increment / Decrement Buttons

The `showButtons` property adds +/- buttons on each end of the slider:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    type: 'MinRange',
    showButtons: true,
    tooltip: { placement: 'After', isVisible: true, showOn: 'Always' }
});
slider.appendTo('#slider');
```

**Range Slider behavior with buttons:**
- By default, clicking the button changes the **first** handle's value.
- Tab to focus a specific handle, then use buttons to change that handle.
- After enabling buttons, pressing `Tab` moves focus to the handle, not the button.

---

## Localization

Customize the button labels (used by screen readers and tooltips on increment/decrement buttons) using `L10n`:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';
import { L10n } from '@syncfusion/ej2-base';

// Load German (Deutsch) translations
L10n.load({
    'de-DE': {
        'slider': {
            incrementTitle: 'Erhöhen, ansteigen',
            decrementTitle: 'verringern'
        }
    }
});

let slider: Slider = new Slider({
    value: [30, 70],
    type: 'Range',
    locale: 'de-DE',
    showButtons: true
});
slider.appendTo('#slider');
```

Locale keywords used by the Range Slider:

| Key | Default Text |
|---|---|
| `incrementTitle` | Increase |
| `decrementTitle` | Decrease |
