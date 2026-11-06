# Slider API Reference

Complete API surface for the Syncfusion EJ2 TypeScript Range Slider component (`@syncfusion/ej2-inputs`).

Source: https://ej2.syncfusion.com/documentation/api/slider/index-default

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Event Argument Interfaces](#event-argument-interfaces)
- [Sub-Model Interfaces](#sub-model-interfaces)
- [Type Definitions](#type-definitions)

---

## Properties

### colorRange
**Type:** `ColorRangeDataModel[]`  
**Default:** `null`

Specifies color bands on the slider track based on value ranges. Each entry defines a `start`, `end`, and `color`.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    colorRange: [
        { start: 0, end: 30, color: '#00e400' },
        { start: 30, end: 70, color: '#ffff00' },
        { start: 70, end: 100, color: '#ff0000' }
    ]
});
sliderObj.appendTo('#slider');
```

---

### cssClass
**Type:** `string`  
**Default:** `''`

Specifies custom CSS class names added to the slider wrapper element. Use to apply user-defined themes or styles.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    cssClass: 'custom-slider'
});
sliderObj.appendTo('#default');
```

---

### customValues
**Type:** `string[] | number[]`  
**Default:** `null`

Specifies an explicit array of values for the slider. When set, `min`, `max`, and `step` properties are ignored and the slider snaps to the provided values only.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    customValues: [10, 20, 40, 80, 100]
});
sliderObj.appendTo('#slider');
```

---

### enableAnimation
**Type:** `boolean`  
**Default:** `true`

Enables or disables the animation for slider handle movement.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    enableAnimation: false
});
sliderObj.appendTo('#slider');
```

---

### enableHtmlSanitizer
**Type:** `boolean`  
**Default:** `true`

Specifies whether to sanitize untrusted HTML values in the Slider component before rendering. When `true`, suspected XSS strings are stripped.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    enableHtmlSanitizer: true
});
sliderObj.appendTo('#slider');
```

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Enables or disables persisting the slider's state (current `value`) between page reloads using browser storage.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    enablePersistence: true
});
sliderObj.appendTo('#slider');
```

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Enables or disables rendering the component in right-to-left (RTL) direction. Also produces a reversed (descending) effect for horizontal sliders.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    enableRtl: true
});
sliderObj.appendTo('#slider');
```

---

### enabled
**Type:** `boolean`  
**Default:** `true`

Enables or disables the slider. A disabled slider is visible but not interactive.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    enabled: false
});
sliderObj.appendTo('#slider');
```

---

### limits
**Type:** `LimitDataModel`  
**Default:** `{ enabled: false }`

Restricts slider handle movement within a specified range. The restricted zone is visually darkened. See [LimitDataModel](#limitdatamodel) for all sub-properties.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    min: 0, max: 100,
    value: 30,
    type: 'MinRange',
    limits: { enabled: true, minStart: 10, minEnd: 40 },
    tooltip: { isVisible: true }
});
sliderObj.appendTo('#slider');
```

---

### locale
**Type:** `string`  
**Default:** `''`

Overrides the global culture and localization value for this component. Default global culture is `'en-US'`. Use with `L10n.load()` to provide translated button labels.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
    'de-DE': {
        'slider': {
            incrementTitle: 'Erhöhen, ansteigen',
            decrementTitle: 'verringern'
        }
    }
});

let sliderObj: Slider = new Slider({
    value: [30, 70],
    type: 'Range',
    locale: 'de-DE',
    showButtons: true
});
sliderObj.appendTo('#slider');
```

---

### max
**Type:** `number`  
**Default:** `100`

Gets or sets the maximum value of the slider. The handle cannot be dragged beyond this value.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    min: 100,
    max: 1000,
    value: 400,
    ticks: { placement: 'After', largeStep: 200, smallStep: 100, showSmallTicks: true },
    tooltip: { isVisible: true, placement: 'Before', showOn: 'Always' }
});
sliderObj.appendTo('#slider');
```

---

### min
**Type:** `number`  
**Default:** `0`

Gets or sets the minimum value of the slider. The handle cannot be dragged below this value.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    min: 100,
    max: 1000,
    value: 400
});
sliderObj.appendTo('#slider');
```

---

### orientation
**Type:** `SliderOrientation`  
**Default:** `'Horizontal'`

Specifies whether to render the slider horizontally or vertically.

- `'Horizontal'` — default layout.
- `'Vertical'` — rotates the slider 90°; requires the container to have sufficient height.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    orientation: 'Vertical',
    value: 30
});
sliderObj.appendTo('#slider');
```

---

### readonly
**Type:** `boolean`  
**Default:** `false`

Specifies whether to render the slider in read-only mode. When `true`, the slider displays its value but cannot be interacted with by the user.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    readonly: true
});
sliderObj.appendTo('#slider');
```

---

### showButtons
**Type:** `boolean`  
**Default:** `false`

Specifies whether to show increment and decrement buttons on each side of the slider. In a Range Slider, buttons change the first handle by default; focus a handle first to change a specific one.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    type: 'MinRange',
    showButtons: true,
    tooltip: { placement: 'After', isVisible: true, showOn: 'Always' }
});
sliderObj.appendTo('#slider');
```

---

### step
**Type:** `number`  
**Default:** `1`

Specifies the step value for each value change when dragging the handle, pressing arrow keys, or clicking increment/decrement buttons.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    step: 10,
    ticks: { placement: 'After', largeStep: 20, smallStep: 10, showSmallTicks: true },
    tooltip: { placement: 'Before', isVisible: true, showOn: 'Always' }
});
sliderObj.appendTo('#slider');
```

---

### ticks
**Type:** `TicksDataModel`  
**Default:** `{ placement: 'before' }`

Specifies tick mark options: placement position, large/small step intervals, visibility of small ticks, and value formatting. See [TicksDataModel](#ticksdatamodel) for all sub-properties.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    ticks: { placement: 'After', largeStep: 20, smallStep: 10, showSmallTicks: true }
});
sliderObj.appendTo('#slider');
```

---

### tooltip
**Type:** `TooltipDataModel`  
**Default:** `{ placement: 'Before', isVisible: false, showOn: 'Focus', format: null }`

Specifies tooltip visibility, position, display trigger, and content formatting. See [TooltipDataModel](#tooltipdatamodel) for all sub-properties.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    tooltip: { placement: 'Before', isVisible: true, showOn: 'Always' }
});
sliderObj.appendTo('#slider');
```

---

### type
**Type:** `SliderType`  
**Default:** `'Default'`

Defines the type of slider:

- `'Default'` — single handle, no range fill.
- `'MinRange'` — single handle with a filled track from `min` to the handle.
- `'Range'` — two handles with a filled track between them; `value` must be a two-element array.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

// Default
let defaultObj: Slider = new Slider({ value: 30 });
defaultObj.appendTo('#default');

// MinRange
let minRangeObj: Slider = new Slider({ value: 30, type: 'MinRange' });
minRangeObj.appendTo('#minrange');

// Range
let rangeObj: Slider = new Slider({ value: [30, 70], type: 'Range' });
rangeObj.appendTo('#range');
```

---

### value
**Type:** `number | number[]`  
**Default:** `null`

The current value of the slider. Use a `number` for `Default` and `MinRange` types; use a two-element `number[]` for the `Range` type.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

// Single value
let sliderObj: Slider = new Slider({ value: 30 });
sliderObj.appendTo('#slider');

// Range value
let rangeObj: Slider = new Slider({ value: [20, 80], type: 'Range' });
rangeObj.appendTo('#range');
```

---

### width
**Type:** `number | string`  
**Default:** `null`

Specifies the width of the slider component. Accepts a number (pixels) or a string (e.g., `'300px'`, `'100%'`).

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    width: '400px'
});
sliderObj.appendTo('#slider');
```

---

## Methods

### addEventListener
Adds a handler to the given event listener.

**Signature:** `addEventListener(eventName: string, handler: Function): void`

```typescript
sliderObj.addEventListener('change', (args) => { console.log(args.value); });
```

---

### appendTo
Appends the control within the given HTML element.

**Signature:** `appendTo(selector?: string | HTMLElement): void`

```typescript
sliderObj.appendTo('#slider');
sliderObj.appendTo(document.getElementById('slider'));
```

---

### dataBind
Applies all pending property changes immediately to the component.

**Signature:** `dataBind(): void`

```typescript
sliderObj.value = 50;
sliderObj.dataBind();
```

---

### destroy
Removes the component from the DOM and detaches all related event handlers. Restores the original element.

**Signature:** `destroy(): void`

```typescript
sliderObj.destroy();
```

---

### getRootElement
Returns the root element of the component.

**Signature:** `getRootElement(): HTMLElement`

```typescript
let root: HTMLElement = sliderObj.getRootElement();
```

---

### refresh
Applies all pending property changes and re-renders the component. Call this after showing a slider that was previously in a hidden container (`display: none`).

**Signature:** `refresh(): void`

```typescript
// After making a hidden container visible:
document.getElementById('container').style.display = 'block';
sliderObj.refresh();
```

---

### removeEventListener
Removes a handler from the given event listener.

**Signature:** `removeEventListener(eventName: string, handler: Function): void`

```typescript
sliderObj.removeEventListener('change', myHandler);
```

---

### reposition
Repositions the slider handles and track. Use after a layout change that may affect the slider's dimensions.

**Signature:** `reposition(): void`

```typescript
sliderObj.reposition();
```

---

### Inject
Dynamically injects required modules to the component.

**Signature:** `static Inject(...moduleList: Function[]): void`

---

## Events

### change
**Type:** `EmitType<SliderChangeEventArgs>`

Fires continuously while the slider thumb is being dragged. Use for real-time updates (e.g., live preview).

```typescript
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    change: (args: SliderChangeEventArgs) => {
        console.log('While dragging:', args.value);
    }
});
sliderObj.appendTo('#slider');
```

---

### changed
**Type:** `EmitType<SliderChangeEventArgs>`

Fires once when the drag is completed (thumb released). Use for final value submission or API calls.

```typescript
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    changed: (args: SliderChangeEventArgs) => {
        console.log('Final value:', args.value);
    }
});
sliderObj.appendTo('#slider');
```

---

### created
**Type:** `EmitType<Object>`

Triggers when the Slider component is successfully created and rendered.

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    created: () => {
        console.log('Slider is ready');
    }
});
sliderObj.appendTo('#slider');
```

---

### renderedTicks
**Type:** `EmitType<SliderTickRenderedEventArgs>`

Triggers after all tick elements are rendered. Use to assign custom labels or text to major ticks via `args.ticksWrapper`.

```typescript
import { Slider, SliderTickRenderedEventArgs } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    min: 0, max: 100,
    value: 30,
    type: 'MinRange',
    ticks: { placement: 'Both', largeStep: 20, smallStep: 5 },
    renderedTicks: (args: SliderTickRenderedEventArgs) => {
        let li: any = args.ticksWrapper.getElementsByClassName('e-large');
        let labels: string[] = ['Very Poor', 'Poor', 'Average', 'Good', 'Very Good', 'Excellent'];
        for (let i: number = 0; i < li.length; ++i) {
            (li[i].querySelectorAll('.e-tick-both')[1] as HTMLElement).innerText = labels[i];
        }
    }
});
sliderObj.appendTo('#slider');
```

---

### renderingTicks
**Type:** `EmitType<SliderTickEventArgs>`

Triggers for each tick element during rendering. Use to customize individual tick text, add CSS classes, or format tick values (e.g., dates, weekday names).

```typescript
import { Slider, SliderTickEventArgs } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    min: 0, max: 6,
    value: 2,
    ticks: { placement: 'After', largeStep: 1 },
    renderingTicks: (args: SliderTickEventArgs) => {
        let days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        args.text = days[parseFloat(args.value as any)];
    }
});
sliderObj.appendTo('#slider');
```

---

### tooltipChange
**Type:** `EmitType<SliderTooltipEventArgs>`

Triggers when the tooltip value changes (during drag or on focus). Use to format the tooltip text with custom content such as dates, times, or units.

```typescript
import { Slider, SliderTooltipEventArgs } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    min: new Date('2013-06-13').getTime(),
    value: new Date('2013-06-15').getTime(),
    max: new Date('2013-06-21').getTime(),
    step: 86400000,
    tooltip: { placement: 'Before', isVisible: true },
    tooltipChange: (args: SliderTooltipEventArgs) => {
        let fmt: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        args.text = new Date(Number(args.text)).toLocaleDateString('en-us', fmt);
    }
});
sliderObj.appendTo('#slider');
```

---

## Event Argument Interfaces

### SliderChangeEventArgs
Provided in `change` and `changed` events.

| Property | Type | Description |
|---|---|---|
| `value` | `number \| number[]` | Current slider value (or range array for `Range` type) |
| `previousValue` | `number \| number[]` | Value before the change |
| `action` | `string` | Action that triggered the change (e.g., `'drag'`, `'click'`) |
| `isInteracted` | `boolean` | `true` if caused by user interaction |

---

### SliderTickEventArgs
Provided in the `renderingTicks` event.

| Property | Type | Description |
|---|---|---|
| `value` | `number \| string` | Numeric value of the current tick being rendered |
| `text` | `string` | Display text of the tick — override this to customize the label |
| `tickElement` | `HTMLElement` | The tick DOM element — add CSS classes here for custom styling |

---

### SliderTickRenderedEventArgs
Provided in the `renderedTicks` event.

| Property | Type | Description |
|---|---|---|
| `ticksWrapper` | `HTMLElement` | The wrapper element containing all rendered tick elements |

---

### SliderTooltipEventArgs
Provided in the `tooltipChange` event.

| Property | Type | Description |
|---|---|---|
| `value` | `number \| string` | Current slider value |
| `text` | `string` | Tooltip display text — override this to customize the tooltip content |

---

## Sub-Model Interfaces

### TicksDataModel
Used with the `ticks` property.

| Property | Type | Default | Description |
|---|---|---|---|
| `placement` | `Placement` | `'before'` | Tick position: `'Before'`, `'After'`, `'Both'`, `'None'` |
| `largeStep` | `number` | — | Interval between major (large) ticks |
| `smallStep` | `number` | — | Interval between minor (small) ticks |
| `showSmallTicks` | `boolean` | `false` | Show or hide minor ticks |
| `format` | `string` | — | Internationalization format string (e.g., `'C2'`, `'P0'`, `'##.## Km'`) |

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    ticks: { placement: 'After', largeStep: 20, smallStep: 10, showSmallTicks: true, format: 'C2' }
});
sliderObj.appendTo('#slider');
```

---

### TooltipDataModel
Used with the `tooltip` property.

| Property | Type | Default | Description |
|---|---|---|---|
| `isVisible` | `boolean` | `false` | Show or hide the tooltip |
| `placement` | `TooltipPlacement` | `'Before'` | Position: `'Before'` (above/left) or `'After'` (below/right) |
| `showOn` | `TooltipShowOn` | `'Focus'` | Trigger: `'Auto'`, `'Always'`, `'Hover'`, `'Focus'`, `'Click'` |
| `format` | `string` | `null` | Internationalization format string for tooltip content |
| `cssClass` | `string` | — | Custom CSS class applied to the tooltip element |

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    value: 30,
    tooltip: { isVisible: true, placement: 'Before', showOn: 'Always', format: 'C2' }
});
sliderObj.appendTo('#slider');
```

---

### LimitDataModel
Used with the `limits` property.

| Property | Type | Description |
|---|---|---|
| `enabled` | `boolean` | Enable or disable the limits feature |
| `minStart` | `number` | Minimum boundary for the first handle |
| `minEnd` | `number` | Maximum boundary for the first handle |
| `maxStart` | `number` | Minimum boundary for the second handle (`Range` type only) |
| `maxEnd` | `number` | Maximum boundary for the second handle (`Range` type only) |
| `startHandleFixed` | `boolean` | Lock the first handle so it cannot be moved |
| `endHandleFixed` | `boolean` | Lock the second handle so it cannot be moved (`Range` type only) |

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let sliderObj: Slider = new Slider({
    min: 0, max: 100,
    value: [25, 75],
    type: 'Range',
    limits: { enabled: true, minStart: 10, minEnd: 40, maxStart: 60, maxEnd: 90 },
    tooltip: { isVisible: true }
});
sliderObj.appendTo('#slider');
```

---

## Type Definitions

### SliderType
```typescript
type SliderType = 'Default' | 'MinRange' | 'Range';
```

### SliderOrientation
```typescript
type SliderOrientation = 'Horizontal' | 'Vertical';
```

### TooltipPlacement
```typescript
type TooltipPlacement = 'Before' | 'After';
```

### TooltipShowOn
```typescript
type TooltipShowOn = 'Auto' | 'Always' | 'Hover' | 'Focus' | 'Click';
```

### Placement (Ticks)
```typescript
type Placement = 'Before' | 'After' | 'Both' | 'None';
```
