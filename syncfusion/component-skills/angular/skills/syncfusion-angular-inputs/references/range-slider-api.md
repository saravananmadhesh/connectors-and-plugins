# Syncfusion Angular Range Slider – API Reference

> **Source:** [https://ej2.syncfusion.com/angular/documentation/api/slider/index-default](https://ej2.syncfusion.com/angular/documentation/api/slider/index-default)
> 
> All code snippets in this skill use **only** the APIs listed here. Do not reference any property, event, or method that is not documented on this page.

## Table of Contents
- [Component Selector](#component-selector)
- [Properties](#properties)
  - [colorRange](#colorrange)
  - [cssClass](#cssclass)
  - [customValues](#customvalues)
  - [enableAnimation](#enableanimation)
  - [enableHtmlSanitizer](#enablehtmlsanitizer)
  - [enablePersistence](#enablepersistence)
  - [enableRtl](#enablertl)
  - [enabled](#enabled)
  - [limits](#limits)
  - [locale](#locale)
  - [max](#max)
  - [min](#min)
  - [orientation](#orientation)
  - [readonly](#readonly)
  - [showButtons](#showbuttons)
  - [step](#step)
  - [ticks](#ticks)
  - [tooltip](#tooltip)
  - [type](#type)
  - [value](#value)
  - [width](#width)
- [Methods](#methods)
  - [destroy](#destroy)
  - [reposition](#reposition)
- [Events](#events)
  - [change](#change)
  - [changed](#changed)
  - [created](#created)
  - [renderedTicks](#renderedticks)
  - [renderingTicks](#renderingticks)
  - [tooltipChange](#tooltipchange)
- [Data Models](#data-models)
  - [TicksDataModel](#ticksdatamodel)
  - [TooltipDataModel](#tooltipdatamodel)
  - [LimitDataModel](#limitdatamodel)
  - [ColorRangeDataModel](#colorrangedatamodel)

---

## Component Selector

```html
<ejs-slider [value]="value"></ejs-slider>
```

Import from `@syncfusion/ej2-angular-inputs`:

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
```

---

## Properties

### colorRange

**Type:** `ColorRangeDataModel[]`  
**Default:** `[]`

Specifies colors to apply to the slider bar based on value ranges. Each item in the array defines a `start`, `end`, and `color`.

```typescript
public colorRange: ColorRangeDataModel[] = [
  { start: 0,  end: 25,  color: '#ff0000' },
  { start: 25, end: 50,  color: '#ffff00' },
  { start: 50, end: 75,  color: '#00ff00' },
  { start: 75, end: 100, color: '#0000ff' }
];
```

```html
<ejs-slider [value]="30" [colorRange]="colorRange"></ejs-slider>
```

See [ColorRangeDataModel](#colorrangedatamodel) for property details.

---

### cssClass

**Type:** `string`  
**Default:** `''`

Custom CSS class(es) to add to the slider host element. Use to scope overrides without `::ng-deep`.

```typescript
public cssClass: string = 'my-slider';
```

```html
<ejs-slider [value]="50" cssClass="my-slider"></ejs-slider>
```

```css
.my-slider {
  border: 1px solid #ccc;
}
```

---

### customValues

**Type:** `string[] | number[]`  
**Default:** `null`

Array of discrete slider values. When set, `min`, `max`, and `step` are ignored; the slider snaps to items in this array.

```typescript
public customValues: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
```

```html
<ejs-slider [customValues]="customValues" [value]="'Wed'"></ejs-slider>
```

Useful for MS Word–style sliders with non-linear steps (e.g., 10, 100, 500).

---

### enableAnimation

**Type:** `boolean`  
**Default:** `true`

Enables or disables the animation when the slider thumb moves.

```html
<ejs-slider [value]="30" [enableAnimation]="false"></ejs-slider>
```

---

### enableHtmlSanitizer

**Type:** `boolean`  
**Default:** `true`

When `true`, sanitizes untrusted HTML before rendering it in the Slider (e.g., tooltip content). Set to `false` only when you fully control the HTML content.

```html
<ejs-slider [value]="30" [enableHtmlSanitizer]="true"></ejs-slider>
```

---

### enablePersistence

**Type:** `boolean`  
**Default:** `false`

Persists the slider's `value` in browser localStorage so it survives page reloads.

```html
<ejs-slider id="persistent-slider" [value]="50" [enablePersistence]="true"></ejs-slider>
```

---

### enableRtl

**Type:** `boolean`  
**Default:** `false`

Renders the slider in right-to-left direction (for Arabic, Hebrew, etc.). For horizontal sliders this reverses the value ordering.

```typescript
public enableRtl: boolean = true;
```

```html
<ejs-slider [value]="30" [enableRtl]="enableRtl"></ejs-slider>
```

> **Tip:** As an alternative for reversed horizontal sliders, you can also swap `min` and `max` values (set `min` to the higher value and `max` to the lower). See [Reversible Slider](#).

---

### enabled

**Type:** `boolean`  
**Default:** `true`

Enables (`true`) or disables (`false`) the slider. A disabled slider is non-interactive and visually dimmed.

```html
<ejs-slider [value]="30" [enabled]="false"></ejs-slider>
```

To toggle programmatically:

```typescript
@ViewChild('slider') sliderObj: SliderComponent;

disableSlider() {
  this.sliderObj.enabled = false;
}
```

---

### limits

**Type:** `LimitDataModel`  
**Default:** `{ enabled: false }`

Restricts the thumb(s) to specific boundaries within the slider range. The limited zone is visually darkened. Must set `enabled: true` to activate.

```typescript
public limits: LimitDataModel = {
  enabled: true,
  minStart: 10,
  minEnd: 40
};
```

```html
<ejs-slider type="MinRange" [value]="20" [limits]="limits"></ejs-slider>
```

See [LimitDataModel](#limitdatamodel) for all options.

---

### locale

**Type:** `string`  
**Default:** `''` (uses global culture `'en-US'`)

Overrides the locale used for formatting values (e.g., currency symbols, number separators).

```html
<ejs-slider [value]="30" locale="de-DE" [ticks]="{ format: 'C2' }"></ejs-slider>
```

---

### max

**Type:** `number`  
**Default:** `100`

The maximum value of the slider range.

```html
<ejs-slider [value]="50" [min]="0" [max]="200"></ejs-slider>
```

---

### min

**Type:** `number`  
**Default:** `0`

The minimum value of the slider range.

```html
<ejs-slider [value]="50" [min]="100" [max]="1000"></ejs-slider>
```

---

### orientation

**Type:** `SliderOrientation` (`'Horizontal'` | `'Vertical'`)  
**Default:** `'Horizontal'`

Controls the slider's rendering direction. Vertical sliders require an explicit `height`.

```typescript
public orientation: string = 'Vertical';
```

```html
<ejs-slider [value]="30" [orientation]="orientation" style="height: 300px"></ejs-slider>
```

---

### readonly

**Type:** `boolean`  
**Default:** `false`

Renders the slider in read-only mode. Values are displayed but the user cannot interact with the component.

```html
<ejs-slider [value]="50" [readonly]="true"></ejs-slider>
```

---

### showButtons

**Type:** `boolean`  
**Default:** `false`

Shows increment (+) and decrement (−) buttons beside the slider. For Range sliders, the first handle changes by default; move keyboard focus to the other handle to change it.

> After enabling slider buttons, pressing `Tab` moves focus to the handle, not the button.

```html
<ejs-slider [value]="30" [showButtons]="true"></ejs-slider>
```

---

### step

**Type:** `number`  
**Default:** `1`

The increment/decrement amount for each value change (drag, arrow key, or button click).

```html
<ejs-slider [value]="50" [step]="5" [min]="0" [max]="100"></ejs-slider>
```

---

### ticks

**Type:** `TicksDataModel`  
**Default:** `{ placement: 'before' }`

Configures tick marks on the slider track. See [TicksDataModel](#ticksdatamodel).

```typescript
public ticks: TicksDataModel = {
  placement: 'Before',
  largeStep: 20,
  smallStep: 5,
  showSmallTicks: true
};
```

```html
<ejs-slider [value]="30" [ticks]="ticks"></ejs-slider>
```

---

### tooltip

**Type:** `TooltipDataModel`  
**Default:** `{ placement: 'Before', isVisible: false, showOn: 'Focus', format: null }`

Configures the tooltip that shows the current value. See [TooltipDataModel](#tooltipdatamodel).

```typescript
public tooltip: TooltipDataModel = {
  placement: 'After',
  isVisible: true,
  showOn: 'Always'
};
```

```html
<ejs-slider [value]="30" [tooltip]="tooltip"></ejs-slider>
```

---

### type

**Type:** `SliderType` (`'Default'` | `'MinRange'` | `'Range'`)  
**Default:** `'Default'`

Determines the slider mode:

| Value | Description | Handles |
|-------|-------------|---------|
| `'Default'` | Selects a single value | 1 |
| `'MinRange'` | Shows selection from `min` to current thumb | 1 |
| `'Range'` | Selects a range between two thumbs | 2 |

```typescript
public rangeType: string = 'Range';
public rangeValue: number[] = [30, 70];
```

```html
<ejs-slider [type]="rangeType" [value]="rangeValue"></ejs-slider>
```

> For `Range` type, `value` must be a `number[]` with exactly two elements.

---

### value

**Type:** `number | number[]`  
**Default:** `null`

The current slider value.

- **Default / MinRange:** use a single `number`
- **Range:** use `number[]` with exactly two elements `[start, end]`

```html
<!-- Default / MinRange -->
<ejs-slider [value]="30"></ejs-slider>

<!-- Range -->
<ejs-slider type="Range" [value]="[20, 80]"></ejs-slider>
```

---

### width

**Type:** `number | string`  
**Default:** `null`

Sets the slider width. Accepts pixel values (`300`) or CSS strings (`'50%'`, `'300px'`).

```html
<ejs-slider [value]="30" [width]="400"></ejs-slider>
<ejs-slider [value]="30" width="80%"></ejs-slider>
```

---

## Methods

### destroy

```typescript
sliderObj.destroy(): void
```

Removes the component from the DOM and detaches all event listeners, attributes, and classes.

```typescript
@ViewChild('slider') sliderObj: SliderComponent;

ngOnDestroy() {
  this.sliderObj.destroy();
}
```

---

### reposition

```typescript
sliderObj.reposition(): void
```

Recalculates and re-renders the slider dimensions. Call this when revealing a previously hidden slider (e.g., inside a tab or `display: none` container).

```typescript
@ViewChild('slider') sliderObj: SliderComponent;

showSlider() {
  this.isVisible = true;
  // Let Angular render the container, then reposition
  setTimeout(() => {
    this.sliderObj.reposition();
  }, 0);
}
```

---

## Events

### change

**Type:** `EmitType<SliderChangeEventArgs>`

Fires **while** the user drags the slider thumb (continuous; fires on every position change during drag).

```html
<ejs-slider [value]="30" (change)="onSliderChange($event)"></ejs-slider>
```

```typescript
onSliderChange(args: SliderChangeEventArgs) {
  console.log('Current value:', args.value);
}
```

**`SliderChangeEventArgs` properties:**
- `value` — The new slider value (`number` or `number[]` for Range type)
- `previousValue` — The previous value before the change
- `action` — The interaction type (e.g., `'drag'`, `'key'`)
- `isInteracted` — `true` when triggered by user interaction

---

### changed

**Type:** `EmitType<SliderChangeEventArgs>`

Fires **once** when the user finishes dragging (on mouse/touch up). Use this for expensive operations (API calls, heavy calculations) to avoid firing on every drag step.

```html
<ejs-slider [value]="30" (changed)="onSliderChanged($event)"></ejs-slider>
```

```typescript
onSliderChanged(args: SliderChangeEventArgs) {
  // Fires once, after drag completes
  this.fetchProductsByPriceRange(args.value);
}
```

> **`change` vs `changed`:** Use `change` for real-time feedback (live preview), and `changed` for final committed values (form submission, API calls).

---

### created

**Type:** `EmitType<Object>`

Fires once when the Slider is successfully initialized and rendered.

```html
<ejs-slider [value]="30" (created)="onSliderCreated($event)"></ejs-slider>
```

```typescript
onSliderCreated(args: Object) {
  console.log('Slider initialized');
}
```

---

### renderedTicks

**Type:** `EmitType<SliderTickRenderedEventArgs>`

Fires **after** all tick elements have been rendered. Use this to post-process tick DOM elements (e.g., hide specific ticks, apply custom classes).

```html
<ejs-slider
  [value]="30"
  [ticks]="{ placement: 'Both', largeStep: 20, smallStep: 5 }"
  (renderedTicks)="onRenderedTicks($event)">
</ejs-slider>
```

```typescript
onRenderedTicks(args: SliderTickRenderedEventArgs) {
  // Access rendered tick elements
  const largeTicks = args.ticksWrapper.getElementsByClassName('e-large');
  const labels = ['Very Poor', 'Poor', 'Average', 'Good', 'Very Good', 'Excellent'];
  for (let i = 0; i < largeTicks.length; i++) {
    const tickBoth = largeTicks[i].querySelectorAll('.e-tick-both')[1] as HTMLElement;
    if (tickBoth) tickBoth.innerText = labels[i];
  }
}
```

**`SliderTickRenderedEventArgs` properties:**
- `ticksWrapper` — The DOM element wrapping all ticks

---

### renderingTicks

**Type:** `EmitType<SliderTickEventArgs>`

Fires **during** rendering of each individual tick element. Use this to customize tick label text.

```html
<ejs-slider
  [value]="0"
  [min]="0"
  [max]="6"
  [ticks]="{ placement: 'After', largeStep: 1 }"
  (renderingTicks)="onRenderingTicks($event)">
</ejs-slider>
```

```typescript
onRenderingTicks(args: SliderTickEventArgs) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  args.text = days[args.value as number] ?? String(args.value);
}
```

**`SliderTickEventArgs` properties:**
- `value` — The numeric value of this tick
- `text` — The label text to display (assign to customize)

---

### tooltipChange

**Type:** `EmitType<SliderTooltipEventArgs>`

Fires when the tooltip content is about to be shown. Use this to format or replace the tooltip text.

```html
<ejs-slider
  [value]="0"
  [tooltip]="{ isVisible: true, placement: 'Before' }"
  (tooltipChange)="onTooltipChange($event)">
</ejs-slider>
```

```typescript
onTooltipChange(args: SliderTooltipEventArgs) {
  const totalMs = Number(args.text);
  args.text = new Date(totalMs).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
```

**`SliderTooltipEventArgs` properties:**
- `text` — The tooltip display text (assign to customize)
- `value` — The current slider value

---

## Data Models

### TicksDataModel

Configuration for tick marks on the slider track.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `placement` | `'Before'` \| `'After'` \| `'Both'` \| `'None'` | `'before'` | Tick position relative to the track |
| `largeStep` | `number` | — | Distance between major (large) ticks |
| `smallStep` | `number` | — | Distance between minor (small) ticks |
| `showSmallTicks` | `boolean` | `false` | Show or hide minor ticks |
| `format` | `string` | — | Internationalization format string (e.g., `'P0'`, `'C2'`, `'N2'`) |

**Placement values:**
- `'Before'` — Above (horizontal) or left (vertical) of the track
- `'After'` — Below (horizontal) or right (vertical) of the track
- `'Both'` — Both sides of the track
- `'None'` — No ticks displayed

**Format strings (Internationalization):**
- `'N'` / `'N2'` — Numeric (e.g., `1,234.56`)
- `'P'` / `'P0'` — Percentage (e.g., `50%`)
- `'C'` / `'C2'` — Currency (e.g., `$1,234.56`)

```typescript
public ticks: TicksDataModel = {
  placement: 'After',
  largeStep: 20,
  smallStep: 5,
  showSmallTicks: true,
  format: 'P0'
};
```

---

### TooltipDataModel

Configuration for the slider tooltip.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isVisible` | `boolean` | `false` | Show or hide the tooltip |
| `placement` | `'Before'` \| `'After'` | `'Before'` | Tooltip position relative to the slider |
| `showOn` | `'Always'` \| `'Hover'` \| `'Focus'` \| `'Auto'` | `'Focus'` | When the tooltip is shown |
| `format` | `string` | `null` | Internationalization format string for the tooltip value |
| `cssClass` | `string` | — | Custom CSS class(es) for the tooltip element |

**`showOn` values:**
- `'Always'` — Tooltip is always visible
- `'Hover'` — Show on mouse hover (desktop) / tap-hold (touch)
- `'Focus'` — Show when the handle has keyboard focus
- `'Auto'` — Automatically determines based on device type

```typescript
public tooltip: TooltipDataModel = {
  isVisible: true,
  placement: 'After',
  showOn: 'Always',
  format: 'C2'
};
```

---

### LimitDataModel

Restricts thumb movement to specific boundaries within the slider range.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enabled` | `boolean` | `false` | **Must be `true`** to activate limits |
| `minStart` | `number` | — | Minimum allowed position of the first (start) handle |
| `minEnd` | `number` | — | Maximum allowed position of the first (start) handle |
| `maxStart` | `number` | — | Minimum allowed position of the second (end) handle |
| `maxEnd` | `number` | — | Maximum allowed position of the second (end) handle |
| `startHandleFixed` | `boolean` | — | Locks the first handle (prevents movement) |
| `endHandleFixed` | `boolean` | — | Locks the second handle (prevents movement) |

> **Default / MinRange sliders:** Only `minStart`, `minEnd`, and `startHandleFixed` apply (one handle).  
> **Range sliders:** All properties apply (two handles).

```typescript
// Restrict first handle between 10–40, second handle between 60–90
public limits: LimitDataModel = {
  enabled: true,
  minStart: 10,
  minEnd: 40,
  maxStart: 60,
  maxEnd: 90
};

// Lock both handles
public lockedLimits: LimitDataModel = {
  enabled: true,
  startHandleFixed: true,
  endHandleFixed: true
};
```

---

### ColorRangeDataModel

Defines a color segment to apply to the slider track.

| Property | Type | Description |
|----------|------|-------------|
| `start` | `number` | Starting value of this color segment |
| `end` | `number` | Ending value of this color segment |
| `color` | `string` | CSS color value (hex, rgb, named, etc.) |

```typescript
public colorRange: ColorRangeDataModel[] = [
  { start: 0,  end: 33,  color: '#28a745' },  // green: low range
  { start: 33, end: 66,  color: '#ffc107' },  // yellow: mid range
  { start: 66, end: 100, color: '#dc3545' }   // red: high range
];
```

```html
<ejs-slider [value]="50" [colorRange]="colorRange"></ejs-slider>
```

---

## Common API Usage Patterns

### Default Slider with Tooltip and Ticks

```typescript
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [SliderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-slider
      id="default-slider"
      [value]="sliderValue"
      [min]="0"
      [max]="100"
      [step]="5"
      [showButtons]="true"
      [ticks]="ticks"
      [tooltip]="tooltip"
      (change)="onChange($event)"
      (changed)="onChanged($event)">
    </ejs-slider>
  `
})
export class App {
  sliderValue = 40;

  ticks = {
    placement: 'After',
    largeStep: 20,
    smallStep: 5,
    showSmallTicks: true
  };

  tooltip = {
    isVisible: true,
    placement: 'Before',
    showOn: 'Always'
  };

  onChange(args: any) {
    // Fires during drag — good for live preview
    console.log('Dragging:', args.value);
  }

  onChanged(args: any) {
    // Fires on release — good for API calls
    this.sliderValue = args.value;
  }
}
```

### Range Slider with Limits

```typescript
@Component({
  template: `
    <ejs-slider
      type="Range"
      [value]="[20, 80]"
      [min]="0"
      [max]="100"
      [limits]="limits"
      [tooltip]="{ isVisible: true, showOn: 'Always' }"
      (changed)="onChanged($event)">
    </ejs-slider>
  `
})
export class App {
  limits = {
    enabled: true,
    minStart: 10,
    minEnd: 50,
    maxStart: 50,
    maxEnd: 90
  };

  onChanged(args: any) {
    console.log('Range:', args.value); // [number, number]
  }
}
```

### Custom Value Formatting (Date)

```typescript
@Component({
  template: `
    <ejs-slider
      [min]="minDate"
      [max]="maxDate"
      [value]="currentDate"
      [step]="86400000"
      [ticks]="{ placement: 'After', largeStep: 7 * 86400000 }"
      [tooltip]="{ isVisible: true }"
      (renderingTicks)="onRenderingTicks($event)"
      (tooltipChange)="onTooltipChange($event)">
    </ejs-slider>
  `
})
export class App {
  minDate = new Date('2026-01-01').getTime();
  maxDate = new Date('2026-12-31').getTime();
  currentDate = new Date('2026-06-15').getTime();

  onRenderingTicks(args: any) {
    args.text = new Date(args.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  onTooltipChange(args: any) {
    args.text = new Date(Number(args.text)).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }
}
```

### Revealing a Hidden Slider (reposition)

```typescript
@Component({
  template: `
    <button (click)="show()">Show Slider</button>
    <div [style.display]="visible ? 'block' : 'none'">
      <ejs-slider #slider id="hidden-slider" [value]="50"></ejs-slider>
    </div>
  `
})
export class App {
  @ViewChild('slider') sliderObj!: SliderComponent;
  visible = false;

  show() {
    this.visible = true;
    setTimeout(() => {
      this.sliderObj.reposition();
    }, 0);
  }
}
```

---

## EJ1 → EJ2 Migration Quick Reference

| EJ1 API | EJ2 Equivalent |
|---------|---------------|
| `maxValue` | `max` |
| `minValue` | `min` |
| `incrementStep` + `largeStep` + `smallStep` + `showSmallTicks` | `ticks` object |
| `sliderType` | `type` |
| `showTooltip` | `tooltip` object |
| `enableRTL` | `enableRtl` |
| `disable()` method | `enabled = false` property |
| `enable()` method | `enabled = true` property |
| `setValue(value)` method | `value` property |
| `getValue()` method | `value` property |
| `slide` event | `change` event |
| `start` event | `created` event |
| `stop` event | `changed` event |
| N/A | `customValues` |
| N/A | `limits` |
| N/A | `destroy()` method |
| N/A | `renderedTicks` event |
