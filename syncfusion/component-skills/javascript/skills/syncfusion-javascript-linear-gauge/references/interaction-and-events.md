# Linear Gauge Interaction and Events in TypeScript and JavaScript

Handle user interactions with the Syncfusion Essential JS 2 Linear Gauge, including mouse events, pointer dragging, form controls, dynamic value updates, validation, snapping, and real-time feedback.

## Table of Contents

- #prerequisites
- #event-types
  - #gauge-events
  - #event-lifecycle
- #drag-interactions
  - #enable-pointer-dragging
  - #handle-drag-start
  - #handle-drag-move
  - #handle-drag-end
- #mouse-events
  - #handle-mouse-down
  - #handle-mouse-move
  - #handle-mouse-up
- #value-change-events
- #form-integration
  - #synchronize-with-a-range-input
  - #synchronize-with-a-number-input
- #dynamic-value-updates
  - #update-a-pointer-programmatically
  - #real-time-value-simulation
  - #update-from-an-external-api
- #advanced-interactions
  - #value-validation
  - #snap-to-an-interval
  - #multiple-interaction-modes
  - #multiple-pointers
- #practical-examples
  - #temperature-control
  - #volume-control
  - #speed-monitor-with-alerts
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #troubleshooting

## Prerequisites

Install the Essential JS 2 Linear Gauge package.

```bash
npm install @syncfusion/ej2-lineargauge
```

For TypeScript applications, import `LinearGauge` and the event argument interfaces required by the application.

```typescript
import {
  LinearGauge,
  IMouseEventArgs,
  IPointerDragEventArgs,
  IValueChangeEventArgs
} from '@syncfusion/ej2-lineargauge';
```

Add a host element for the gauge.

```html
<div id="gauge-container"></div>
```

Give the host a visible size.

```css
#gauge-container {
  display: block;
  width: 100%;
  height: 360px;
}
```

Create and append the gauge.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '100%',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 50
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

For JavaScript applications using the EJ2 global namespace:

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  width: '100%',
  height: '100%',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 50
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Event Types

Linear Gauge events are configured as callback properties on the `LinearGauge` object.

```typescript
const gauge: LinearGauge = new LinearGauge({
  gaugeMouseDown: (
    args: IMouseEventArgs
  ): void => {
    console.log('Mouse down:', args);
  },

  gaugeMouseMove: (
    args: IMouseEventArgs
  ): void => {
    console.log('Mouse move:', args);
  },

  gaugeMouseUp: (
    args: IMouseEventArgs
  ): void => {
    console.log('Mouse up:', args);
  },

  dragStart: (
    args: IPointerDragEventArgs
  ): void => {
    console.log('Drag started:', args);
  },

  dragMove: (
    args: IPointerDragEventArgs
  ): void => {
    console.log('Pointer moved:', args);
  },

  dragEnd: (
    args: IPointerDragEventArgs
  ): void => {
    console.log('Drag ended:', args);
  },

  valueChange: (
    args: IValueChangeEventArgs
  ): void => {
    console.log('Value changed:', args);
  }
});
```

## Gauge Events

Common interaction-related events include:

- `gaugeMouseDown`: Triggered when a mouse or pointer press occurs in the gauge.
- `gaugeMouseMove`: Triggered when the pointer moves over the gauge.
- `gaugeMouseUp`: Triggered when the pointer is released.
- `dragStart`: Triggered when pointer dragging begins.
- `dragMove`: Triggered while a draggable pointer is moved.
- `dragEnd`: Triggered near the completion of pointer dragging.
- `valueChange`: Triggered when a pointer value changes.
- `animationComplete`: Triggered after pointer animation completes.
- `resize`: Triggered when the gauge responds to a resize.

Other rendering-related events include:

- `load`
- `loaded`
- `axisLabelRender`
- `annotationRender`
- `tooltipRender`
- `beforePrint`

## Event Lifecycle

A typical draggable-pointer interaction follows this order:

1. The user presses the pointer.
2. `gaugeMouseDown` is triggered.
3. `dragStart` is triggered when dragging begins.
4. `dragMove` is triggered while the pointer moves.
5. `valueChange` can report pointer-value changes.
6. `dragEnd` is triggered when dragging finishes.
7. `gaugeMouseUp` is triggered when the pointer is released.

The exact event sequence can depend on the interaction target and input method.

Use:

- `dragMove` for live visual feedback.
- `dragEnd` for committing a final value.
- `valueChange` for observing pointer-value changes.
- `gaugeMouseDown` for general pointer-position or target inspection.

## Drag Interactions

Set `enableDrag` to `true` on a pointer to make it draggable.

Dragging is available for pointer types that support pointer movement.

## Enable Pointer Dragging

### TypeScript

```typescript
import {
  LinearGauge,
  IPointerDragEventArgs
} from '@syncfusion/ej2-lineargauge';

const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '320px',
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 50,
          type: 'Marker',
          markerType: 'Circle',
          color: '#2563eb',
          height: 24,
          width: 24,
          enableDrag: true,
          description:
            'Drag to change the gauge value'
        }
      ]
    }
  ],

  dragStart: (
    args: IPointerDragEventArgs
  ): void => {
    console.log(
      'Pointer dragging started:',
      args
    );
  },

  dragMove: (
    args: IPointerDragEventArgs
  ): void => {
    console.log(
      'Pointer is moving:',
      args.currentValue
    );
  },

  dragEnd: (
    args: IPointerDragEventArgs
  ): void => {
    console.log(
      'Final pointer value:',
      args.currentValue
    );
  }
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  width: '100%',
  height: '320px',
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 50,
          type: 'Marker',
          markerType: 'Circle',
          color: '#2563eb',
          height: 24,
          width: 24,
          enableDrag: true,
          description:
            'Drag to change the gauge value'
        }
      ]
    }
  ],

  dragStart: function (args) {
    console.log(
      'Pointer dragging started:',
      args
    );
  },

  dragMove: function (args) {
    console.log(
      'Pointer is moving:',
      args.currentValue
    );
  },

  dragEnd: function (args) {
    console.log(
      'Final pointer value:',
      args.currentValue
    );
  }
});

gauge.appendTo('#gauge-container');
```

## Handle Drag Start

Use `dragStart` to initialize application state or provide interaction feedback.

### TypeScript

```typescript
function handleDragStart(
  args: IPointerDragEventArgs
): void {
  console.log(
    'Drag started at:',
    args.currentValue
  );

  updateStatus(
    'Pointer dragging started.'
  );
}

const gauge: LinearGauge = new LinearGauge({
  dragStart: handleDragStart,

  axes: [
    {
      pointers: [
        {
          value: 50,
          enableDrag: true
        }
      ]
    }
  ]
});
```

### JavaScript

```javascript
function handleDragStart(args) {
  console.log(
    'Drag started at:',
    args.currentValue
  );

  updateStatus(
    'Pointer dragging started.'
  );
}

var gauge = new ej.lineargauge.LinearGauge({
  dragStart: handleDragStart,

  axes: [
    {
      pointers: [
        {
          value: 50,
          enableDrag: true
        }
      ]
    }
  ]
});
```

## Handle Drag Move

Use `dragMove` for live feedback while the pointer moves.

Avoid expensive network requests during every `dragMove` event.

### TypeScript

```typescript
function handleDragMove(
  args: IPointerDragEventArgs
): void {
  const value: number =
    Math.round(args.currentValue);

  updateDisplayedValue(value);
}
```

### JavaScript

```javascript
function handleDragMove(args) {
  var value =
    Math.round(args.currentValue);

  updateDisplayedValue(value);
}
```

## Handle Drag End

Use `dragEnd` to validate, snap, save, or submit the final value.

### TypeScript

```typescript
function handleDragEnd(
  args: IPointerDragEventArgs
): void {
  const value: number =
    Math.round(args.currentValue);

  console.log(
    'Committed value:',
    value
  );

  updateStatus(
    `Gauge value set to ${value}.`
  );
}
```

### JavaScript

```javascript
function handleDragEnd(args) {
  var value =
    Math.round(args.currentValue);

  console.log(
    'Committed value:',
    value
  );

  updateStatus(
    'Gauge value set to ' +
    value +
    '.'
  );
}
```

## Mouse Events

General mouse events are useful when the application needs information about pointer presses or movement anywhere in the Linear Gauge.

## Handle Mouse Down

### TypeScript

```typescript
import {
  LinearGauge,
  IMouseEventArgs
} from '@syncfusion/ej2-lineargauge';

const gauge: LinearGauge = new LinearGauge({
  gaugeMouseDown: (
    args: IMouseEventArgs
  ): void => {
    console.log(
      'Gauge mouse down:',
      args
    );
  },

  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  gaugeMouseDown: function (args) {
    console.log(
      'Gauge mouse down:',
      args
    );
  },

  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');
```

Use the event argument object rather than the undeclared global `event` variable.

### Correct

```typescript
function handleMouseDown(
  args: IMouseEventArgs
): void {
  console.log(args);
}
```

### Avoid

```typescript
function handleMouseDown(
  args: IMouseEventArgs
): void {
  console.log(event);
}
```

## Handle Mouse Move

```typescript
const gauge: LinearGauge = new LinearGauge({
  gaugeMouseMove: (
    args: IMouseEventArgs
  ): void => {
    console.log(
      'Mouse moved over gauge:',
      args
    );
  }
});
```

Mouse-move events can fire frequently. Avoid performing expensive operations directly inside the callback.

## Handle Mouse Up

```typescript
const gauge: LinearGauge = new LinearGauge({
  gaugeMouseUp: (
    args: IMouseEventArgs
  ): void => {
    console.log(
      'Mouse released:',
      args
    );
  }
});
```

## Value Change Events

Use `valueChange` to react when a pointer value changes.

### TypeScript

```typescript
import {
  LinearGauge,
  IValueChangeEventArgs
} from '@syncfusion/ej2-lineargauge';

const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 50,
          type: 'Marker',
          markerType: 'Circle',
          enableDrag: true,
          height: 24,
          width: 24
        }
      ]
    }
  ],

  valueChange: (
    args: IValueChangeEventArgs
  ): void => {
    console.log(
      'Pointer value changed:',
      args.value
    );

    updateDisplayedValue(
      Math.round(args.value)
    );
  }
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 50,
          type: 'Marker',
          markerType: 'Circle',
          enableDrag: true,
          height: 24,
          width: 24
        }
      ]
    }
  ],

  valueChange: function (args) {
    console.log(
      'Pointer value changed:',
      args.value
    );

    updateDisplayedValue(
      Math.round(args.value)
    );
  }
});

gauge.appendTo('#gauge-container');
```

Use `valueChange` to:

- Update visible text.
- Synchronize a native form control.
- Update application state.
- Announce a final or live value.
- Run local validation.

Debounce or defer server updates when the event can fire repeatedly during dragging.

## Form Integration

The Linear Gauge is a visualization rather than a native form input.

Use a native `<input>` as the form control and synchronize it with the pointer.

This provides:

- Keyboard input
- Native validation
- Form submission support
- Accessible names
- Focus behavior
- Mobile-friendly input controls

## Synchronize with a Range Input

### HTML

```html
<label for="gauge-value">
  System utilization:
  <output id="gauge-output">
    50%
  </output>
</label>

<input
  id="gauge-value"
  name="gaugeValue"
  type="range"
  min="0"
  max="100"
  step="5"
  value="50"
/>

<div id="gauge-container"></div>
```

### TypeScript

```typescript
import {
  LinearGauge,
  IValueChangeEventArgs
} from '@syncfusion/ej2-lineargauge';

const valueInput:
  HTMLInputElement | null =
    document.querySelector<HTMLInputElement>(
      '#gauge-value'
    );

const valueOutput:
  HTMLOutputElement | null =
    document.querySelector<HTMLOutputElement>(
      '#gauge-output'
    );

function displayValue(
  value: number
): void {
  if (valueOutput) {
    valueOutput.value = `${value}%`;
  }

  if (valueInput) {
    valueInput.value =
      value.toString();
  }
}

const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 50,
          type: 'Marker',
          markerType: 'Circle',
          color: '#2563eb',
          height: 24,
          width: 24,
          enableDrag: true
        }
      ]
    }
  ],

  valueChange: (
    args: IValueChangeEventArgs
  ): void => {
    displayValue(
      Math.round(args.value)
    );
  }
});

gauge.appendTo('#gauge-container');

function updateGaugeFromInput():
  void {
  if (!valueInput) {
    return;
  }

  const value: number =
    Number(valueInput.value);

  gauge.setPointerValue(
    0,
    0,
    value
  );

  displayValue(value);
}

valueInput?.addEventListener(
  'input',
  updateGaugeFromInput
);
```

### JavaScript

```javascript
var valueInput =
  document.getElementById(
    'gauge-value'
  );

var valueOutput =
  document.getElementById(
    'gauge-output'
  );

function displayValue(value) {
  if (valueOutput) {
    valueOutput.value =
      value + '%';
  }

  if (valueInput) {
    valueInput.value =
      String(value);
  }
}

var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 50,
          type: 'Marker',
          markerType: 'Circle',
          color: '#2563eb',
          height: 24,
          width: 24,
          enableDrag: true
        }
      ]
    }
  ],

  valueChange: function (args) {
    displayValue(
      Math.round(args.value)
    );
  }
});

gauge.appendTo('#gauge-container');

function updateGaugeFromInput() {
  if (!valueInput) {
    return;
  }

  var value =
    Number(valueInput.value);

  gauge.setPointerValue(
    0,
    0,
    value
  );

  displayValue(value);
}

if (valueInput) {
  valueInput.addEventListener(
    'input',
    updateGaugeFromInput
  );
}
```

## Synchronize with a Number Input

### HTML

```html
<label for="numeric-value">
  Gauge value
</label>

<input
  id="numeric-value"
  name="numericValue"
  type="number"
  min="0"
  max="100"
  step="5"
  value="50"
/>

<button id="apply-value" type="button">
  Apply Value
</button>
```

### TypeScript

```typescript
const numberInput:
  HTMLInputElement | null =
    document.querySelector<HTMLInputElement>(
      '#numeric-value'
    );

const applyButton:
  HTMLElement | null =
    document.getElementById(
      'apply-value'
    );

function clamp(
  value: number,
  minimum: number,
  maximum: number
): number {
  return Math.min(
    maximum,
    Math.max(minimum, value)
  );
}

function applyNumericValue():
  void {
  if (!numberInput) {
    return;
  }

  const requestedValue: number =
    Number(numberInput.value);

  if (!Number.isFinite(requestedValue)) {
    updateStatus(
      'Enter a valid numeric value.'
    );

    return;
  }

  const axis = gauge.axes[0];

  const safeValue: number =
    clamp(
      requestedValue,
      axis.minimum,
      axis.maximum
    );

  numberInput.value =
    safeValue.toString();

  gauge.setPointerValue(
    0,
    0,
    safeValue
  );

  updateStatus(
    `Gauge value updated to ${safeValue}.`
  );
}

applyButton?.addEventListener(
  'click',
  applyNumericValue
);
```

## Dynamic Value Updates

Use `setPointerValue()` to update an existing pointer without rebuilding the complete gauge.

```typescript
gauge.setPointerValue(
  axisIndex,
  pointerIndex,
  value
);
```

The arguments are:

1. Axis index
2. Pointer index
3. New value

## Update a Pointer Programmatically

### TypeScript

```typescript
function setGaugeValue(
  requestedValue: number
): void {
  const axisIndex: number = 0;
  const pointerIndex: number = 0;
  const axis = gauge.axes[axisIndex];

  const safeValue: number =
    Math.min(
      axis.maximum,
      Math.max(
        axis.minimum,
        requestedValue
      )
    );

  gauge.setPointerValue(
    axisIndex,
    pointerIndex,
    safeValue
  );
}
```

### JavaScript

```javascript
function setGaugeValue(
  requestedValue
) {
  var axisIndex = 0;
  var pointerIndex = 0;
  var axis = gauge.axes[axisIndex];

  var safeValue =
    Math.min(
      axis.maximum,
      Math.max(
        axis.minimum,
        requestedValue
      )
    );

  gauge.setPointerValue(
    axisIndex,
    pointerIndex,
    safeValue
  );
}
```

Use `refresh()` when changing:

- Minimum or maximum values
- Ranges
- Tick intervals
- Labels
- Axis direction
- Axis position
- Gauge annotations

Use `setPointerValue()` when only a pointer value changes.

## Real-Time Value Simulation

The following example simulates changing data.

### TypeScript

```typescript
let simulatedValue: number = 50;
let simulationTimer: number | null = null;

function startSimulation(): void {
  if (simulationTimer !== null) {
    return;
  }

  simulationTimer =
    window.setInterval(
      (): void => {
        const change: number =
          (Math.random() - 0.5) * 10;

        simulatedValue =
          Math.min(
            100,
            Math.max(
              0,
              simulatedValue + change
            )
          );

        gauge.setPointerValue(
          0,
          0,
          simulatedValue
        );

        updateDisplayedValue(
          Math.round(simulatedValue)
        );
      },
      500
    );
}

function stopSimulation(): void {
  if (simulationTimer === null) {
    return;
  }

  window.clearInterval(
    simulationTimer
  );

  simulationTimer = null;
}
```

### JavaScript

```javascript
var simulatedValue = 50;
var simulationTimer = null;

function startSimulation() {
  if (simulationTimer !== null) {
    return;
  }

  simulationTimer =
    window.setInterval(
      function () {
        var change =
          (Math.random() - 0.5) * 10;

        simulatedValue =
          Math.min(
            100,
            Math.max(
              0,
              simulatedValue + change
            )
          );

        gauge.setPointerValue(
          0,
          0,
          simulatedValue
        );

        updateDisplayedValue(
          Math.round(simulatedValue)
        );
      },
      500
    );
}

function stopSimulation() {
  if (simulationTimer === null) {
    return;
  }

  window.clearInterval(
    simulationTimer
  );

  simulationTimer = null;
}
```

Clear intervals when the gauge is destroyed.

```typescript
window.addEventListener(
  'beforeunload',
  (): void => {
    stopSimulation();
    gauge.destroy();
  },
  {
    once: true
  }
);
```

## Update from an External API

Do not simulate an API response in production documentation. Replace the URL with a real application endpoint.

### TypeScript

```typescript
interface GaugeApiResponse {
  value: number;
}

let pollingTimer: number | null = null;
let activeRequest:
  AbortController | null = null;

async function loadGaugeValue():
  Promise<void> {
  activeRequest?.abort();

  activeRequest =
    new AbortController();

  try {
    const response: Response =
      await fetch(
        '/api/system-health',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          },
          signal:
            activeRequest.signal
        }
      );

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status}`
      );
    }

    const result:
      GaugeApiResponse =
        await response.json();

    if (!Number.isFinite(result.value)) {
      throw new Error(
        'The API returned an invalid gauge value.'
      );
    }

    setGaugeValue(result.value);

    updateStatus(
      `Gauge updated to ${result.value}.`
    );
  } catch (error: unknown) {
    if (
      error instanceof DOMException &&
      error.name === 'AbortError'
    ) {
      return;
    }

    console.error(
      'Unable to load gauge value:',
      error
    );

    updateStatus(
      'The latest gauge value could not be loaded.'
    );
  }
}

function startPolling(): void {
  void loadGaugeValue();

  pollingTimer =
    window.setInterval(
      (): void => {
        void loadGaugeValue();
      },
      5000
    );
}

function stopPolling(): void {
  if (pollingTimer !== null) {
    window.clearInterval(
      pollingTimer
    );

    pollingTimer = null;
  }

  activeRequest?.abort();
  activeRequest = null;
}
```

### JavaScript

```javascript
var pollingTimer = null;
var activeRequest = null;

async function loadGaugeValue() {
  if (activeRequest) {
    activeRequest.abort();
  }

  activeRequest =
    new AbortController();

  try {
    var response =
      await fetch(
        '/api/system-health',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          },
          signal:
            activeRequest.signal
        }
      );

    if (!response.ok) {
      throw new Error(
        'Request failed: ' +
        response.status
      );
    }

    var result =
      await response.json();

    if (
      !Number.isFinite(result.value)
    ) {
      throw new Error(
        'The API returned an invalid gauge value.'
      );
    }

    setGaugeValue(result.value);

    updateStatus(
      'Gauge updated to ' +
      result.value +
      '.'
    );
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === 'AbortError'
    ) {
      return;
    }

    console.error(
      'Unable to load gauge value:',
      error
    );

    updateStatus(
      'The latest gauge value could not be loaded.'
    );
  }
}

function startPolling() {
  void loadGaugeValue();

  pollingTimer =
    window.setInterval(
      function () {
        void loadGaugeValue();
      },
      5000
    );
}

function stopPolling() {
  if (pollingTimer !== null) {
    window.clearInterval(
      pollingTimer
    );

    pollingTimer = null;
  }

  if (activeRequest) {
    activeRequest.abort();
  }

  activeRequest = null;
}
```

Avoid starting another polling request while an earlier request is still active.

## Advanced Interactions

## Value Validation

Validate a value before committing it to application state.

### TypeScript

```typescript
const minimumValue: number = 0;
const maximumValue: number = 100;

function validateValue(
  value: number
): boolean {
  return (
    Number.isFinite(value) &&
    value >= minimumValue &&
    value <= maximumValue
  );
}

function handleValidatedDragEnd(
  args: IPointerDragEventArgs
): void {
  const value: number =
    args.currentValue;

  if (!validateValue(value)) {
    updateStatus(
      'The selected value is outside the supported range.'
    );

    return;
  }

  updateStatus(
    `Accepted value: ${Math.round(value)}.`
  );
}
```

A draggable pointer is normally constrained by the axis, but application-specific validation can still be applied.

## Snap to an Interval

Snap the final value to the nearest interval.

### TypeScript

```typescript
const snapInterval: number = 5;

function snapValue(
  value: number,
  interval: number,
  minimum: number,
  maximum: number
): number {
  const snappedValue: number =
    Math.round(
      value / interval
    ) * interval;

  return Math.min(
    maximum,
    Math.max(minimum, snappedValue)
  );
}

function handleSnappedDragEnd(
  args: IPointerDragEventArgs
): void {
  const axisIndex: number = 0;
  const pointerIndex: number = 0;
  const axis = gauge.axes[axisIndex];

  const snappedValue: number =
    snapValue(
      args.currentValue,
      snapInterval,
      axis.minimum,
      axis.maximum
    );

  gauge.setPointerValue(
    axisIndex,
    pointerIndex,
    snappedValue
  );

  updateDisplayedValue(
    snappedValue
  );

  updateStatus(
    `Value snapped to ${snappedValue}.`
  );
}
```

### JavaScript

```javascript
var snapInterval = 5;

function snapValue(
  value,
  interval,
  minimum,
  maximum
) {
  var snappedValue =
    Math.round(
      value / interval
    ) * interval;

  return Math.min(
    maximum,
    Math.max(minimum, snappedValue)
  );
}

function handleSnappedDragEnd(
  args
) {
  var axisIndex = 0;
  var pointerIndex = 0;
  var axis = gauge.axes[axisIndex];

  var snappedValue =
    snapValue(
      args.currentValue,
      snapInterval,
      axis.minimum,
      axis.maximum
    );

  gauge.setPointerValue(
    axisIndex,
    pointerIndex,
    snappedValue
  );

  updateDisplayedValue(
    snappedValue
  );

  updateStatus(
    'Value snapped to ' +
    snappedValue +
    '.'
  );
}
```

Use `args.currentValue`, not the undeclared global `event.currentValue`.

## Multiple Interaction Modes

An application can control whether values are changed through dragging, form inputs, or application actions.

### TypeScript

```typescript
type InteractionMode =
  'drag' |
  'input' |
  'readonly';

let interactionMode:
  InteractionMode = 'drag';

function setInteractionMode(
  mode: InteractionMode
): void {
  interactionMode = mode;

  gauge.axes[0]
    .pointers[0]
    .enableDrag =
      mode === 'drag';

  gauge.refresh();

  updateStatus(
    `Interaction mode: ${mode}.`
  );
}

function handleModeDragEnd(
  args: IPointerDragEventArgs
): void {
  if (
    interactionMode !== 'drag'
  ) {
    return;
  }

  setGaugeValue(
    args.currentValue
  );
}

function updateFromInput(
  value: number
): void {
  if (
    interactionMode !== 'input'
  ) {
    return;
  }

  setGaugeValue(value);
}
```

### JavaScript

```javascript
var interactionMode = 'drag';

function setInteractionMode(mode) {
  interactionMode = mode;

  gauge.axes[0]
    .pointers[0]
    .enableDrag =
      mode === 'drag';

  gauge.refresh();

  updateStatus(
    'Interaction mode: ' +
    mode +
    '.'
  );
}

function handleModeDragEnd(args) {
  if (
    interactionMode !== 'drag'
  ) {
    return;
  }

  setGaugeValue(
    args.currentValue
  );
}

function updateFromInput(value) {
  if (
    interactionMode !== 'input'
  ) {
    return;
  }

  setGaugeValue(value);
}
```

Do not implement click-to-value conversion by assuming that `gaugeMouseDown` always exposes a calculated scale value.

Use dragging or a native form input for reliable value editing.

## Multiple Pointers

Use the pointer index to update a particular pointer.

```typescript
const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 50,
          type: 'Bar',
          color: '#2563eb',
          width: 12
        },
        {
          value: 75,
          type: 'Marker',
          markerType: 'Diamond',
          color: '#dc2626',
          height: 18,
          width: 18
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

Update the first pointer.

```typescript
gauge.setPointerValue(
  0,
  0,
  60
);
```

Update the second pointer.

```typescript
gauge.setPointerValue(
  0,
  1,
  80
);
```

## Practical Examples

## Temperature Control

Use a draggable pointer or native range input to select a target temperature.

### TypeScript

```typescript
import {
  LinearGauge,
  IPointerDragEventArgs
} from '@syncfusion/ej2-lineargauge';

let targetTemperature: number = 22;

async function sendTemperatureToDevice(
  temperature: number
): Promise<void> {
  console.log(
    `Setting device temperature to ${temperature}°C`
  );

  /*
  Replace this block with an actual,
  authorized device API request.
  */
}

const gauge: LinearGauge = new LinearGauge({
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 16,
      maximum: 30,

      majorTicks: {
        interval: 2,
        position: 'Outside'
      },

      minorTicks: {
        interval: 1,
        position: 'Outside'
      },

      labelStyle: {
        format: '{value}°C',
        position: 'Outside'
      },

      pointers: [
        {
          value: targetTemperature,
          type: 'Marker',
          markerType: 'Circle',
          color: '#2563eb',
          height: 26,
          width: 26,
          enableDrag: true,
          description:
            'Drag to select the target temperature'
        }
      ]
    }
  ],

  dragEnd: (
    args: IPointerDragEventArgs
  ): void => {
    targetTemperature =
      Math.round(args.currentValue);

    gauge.setPointerValue(
      0,
      0,
      targetTemperature
    );

    updateStatus(
      `Target temperature: ${targetTemperature}°C.`
    );

    void sendTemperatureToDevice(
      targetTemperature
    );
  }
});

gauge.appendTo('#gauge-container');
```

## Volume Control

### TypeScript

```typescript
let volume: number = 50;

function updateAudioLevel(
  level: number
): void {
  const normalizedValue: number =
    level / 100;

  console.log(
    'Normalized audio level:',
    normalizedValue
  );

  /*
  Apply normalizedValue to the authorized
  audio source used by the application.
  */
}

const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      labelStyle: {
        format: '{value}%'
      },

      pointers: [
        {
          value: volume,
          type: 'Marker',
          markerType: 'Circle',
          height: 28,
          width: 28,
          color: '#7c3aed',
          enableDrag: true,
          description:
            'Drag to change the volume'
        }
      ]
    }
  ],

  dragMove: (
    args: IPointerDragEventArgs
  ): void => {
    volume =
      Math.round(args.currentValue);

    updateDisplayedValue(volume);
  },

  dragEnd: (
    args: IPointerDragEventArgs
  ): void => {
    volume =
      Math.round(args.currentValue);

    updateAudioLevel(volume);

    updateStatus(
      `Volume set to ${volume} percent.`
    );
  }
});

gauge.appendTo('#gauge-container');
```

## Speed Monitor with Alerts

A speed monitor normally receives values from an external data source rather than from pointer dragging.

### TypeScript

```typescript
const maximumSpeed: number = 120;
const alertThreshold: number = 80;

let currentSpeed: number = 60;

function updateSpeed(
  newSpeed: number
): void {
  currentSpeed =
    Math.min(
      maximumSpeed,
      Math.max(0, newSpeed)
    );

  gauge.setPointerValue(
    0,
    0,
    currentSpeed
  );

  const status:
    HTMLElement | null =
      document.getElementById(
        'speed-status'
      );

  if (currentSpeed > alertThreshold) {
    if (status) {
      status.textContent =
        `Warning: speed is ${currentSpeed} km/h.`;
    }
  } else if (status) {
    status.textContent =
      `Current speed: ${currentSpeed} km/h.`;
  }
}
```

Provide a visible and screen-reader-accessible warning instead of relying only on color.

```html
<p
  id="speed-status"
  role="status"
  aria-live="polite"
>
  Current speed: 60 km/h.
</p>
```

## Complete TypeScript Example

The following example includes:

- A draggable marker pointer
- `gaugeMouseDown`, `gaugeMouseUp`, and pointer drag events
- Value-change tracking
- Snap-to-five behavior
- Native range and number inputs
- Start and stop simulation controls
- Live application status
- Value validation
- Proper interval and event cleanup
- Reduced-motion support

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>
    Interactive Linear Gauge
  </title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 20px;
      background: #f8fafc;
      color: #111827;
      font-family:
        Arial,
        Helvetica,
        sans-serif;
    }

    main {
      width: min(100%, 1050px);
      margin: 0 auto;
    }

    h1 {
      margin: 0 0 8px;
      font-size: clamp(
        22px,
        4vw,
        32px
      );
    }

    .description {
      max-width: 75ch;
      margin: 0 0 18px;
      line-height: 1.5;
    }

    .controls {
      display: grid;
      grid-template-columns:
        repeat(
          auto-fit,
          minmax(180px, 1fr)
        );
      gap: 14px;
      margin-bottom: 16px;
      padding: 16px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      background: #ffffff;
    }

    .field {
      display: grid;
      gap: 7px;
    }

    .field label {
      font-weight: 700;
    }

    .field input {
      width: 100%;
      min-height: 42px;
    }

    .field input[type="number"] {
      padding: 8px 10px;
      border: 1px solid #64748b;
      border-radius: 6px;
      font: inherit;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      align-items: end;
      gap: 8px;
    }

    .actions button {
      min-height: 42px;
      padding: 8px 14px;
      border: 2px solid #1d4ed8;
      border-radius: 6px;
      background: #ffffff;
      color: #1e3a8a;
      font: inherit;
      font-weight: 700;
      cursor: pointer;
    }

    .actions button:hover {
      background: #dbeafe;
    }

    .actions button:focus-visible,
    .field input:focus-visible {
      outline: 3px solid #f59e0b;
      outline-offset: 2px;
    }

    .gauge-card {
      padding: 16px;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      background: #ffffff;
    }

    #gauge-container {
      width: 100%;
      height: 300px;
    }

    .status-panel {
      display: grid;
      gap: 6px;
      margin-top: 12px;
      padding: 12px;
      border: 1px solid #94a3b8;
      border-radius: 8px;
      background: #f8fafc;
    }

    .status-panel p {
      margin: 0;
    }

    @media (min-width: 768px) {
      #gauge-container {
        height: 380px;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>Interactive System Utilization Gauge</h1>

    <p class="description">
      Drag the gauge pointer, use the range
      control, enter a numeric value, or start
      the live-value simulation. Final dragged
      values are snapped to increments of five.
    </p>

    <section
      class="controls"
      aria-label="Gauge value controls"
    >
      <div class="field">
        <label for="range-value">
          Utilization:
          <output id="range-output">
            50%
          </output>
        </label>

        <input
          id="range-value"
          name="utilization"
          type="range"
          min="0"
          max="100"
          step="5"
          value="50"
        />
      </div>

      <div class="field">
        <label for="number-value">
          Numeric value
        </label>

        <input
          id="number-value"
          type="number"
          min="0"
          max="100"
          step="5"
          value="50"
        />
      </div>

      <div class="actions">
        <button id="apply-value" type="button">
          Apply Value
        </button>

        <button id="start-simulation" type="button">
          Start Simulation
        </button>

        <button id="stop-simulation" type="button">
          Stop Simulation
        </button>
      </div>
    </section>

    <section
      class="gauge-card"
      aria-label="Interactive utilization gauge"
    >
      <div id="gauge-container"></div>

      <div
        class="status-panel"
        aria-label="Gauge interaction status"
      >
        <p>
          <strong>Current value:</strong>
          <span id="current-value">
            50%
          </span>
        </p>

        <p
          id="interaction-status"
          role="status"
          aria-live="polite"
        >
          Ready for interaction.
        </p>
      </div>
    </section>
  </main>
</body>
</html>
```

### index.ts

```typescript
import {
  LinearGauge,
  IMouseEventArgs,
  IPointerDragEventArgs,
  IValueChangeEventArgs
} from '@syncfusion/ej2-lineargauge';

const minimumValue: number = 0;
const maximumValue: number = 100;
const snapInterval: number = 5;

let currentValue: number = 50;
let simulationTimer: number | null = null;

const reduceMotion: boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

const rangeInput:
  HTMLInputElement | null =
    document.querySelector<HTMLInputElement>(
      '#range-value'
    );

const numberInput:
  HTMLInputElement | null =
    document.querySelector<HTMLInputElement>(
      '#number-value'
    );

const rangeOutput:
  HTMLOutputElement | null =
    document.querySelector<HTMLOutputElement>(
      '#range-output'
    );

const currentValueElement:
  HTMLElement | null =
    document.getElementById(
      'current-value'
    );

const interactionStatus:
  HTMLElement | null =
    document.getElementById(
      'interaction-status'
    );

function clamp(
  value: number,
  minimum: number,
  maximum: number
): number {
  return Math.min(
    maximum,
    Math.max(minimum, value)
  );
}

function snapValue(
  value: number
): number {
  const snappedValue: number =
    Math.round(
      value / snapInterval
    ) * snapInterval;

  return clamp(
    snappedValue,
    minimumValue,
    maximumValue
  );
}

function updateStatus(
  message: string
): void {
  if (interactionStatus) {
    interactionStatus.textContent =
      message;
  }
}

function synchronizeControls(
  value: number
): void {
  const roundedValue: number =
    Math.round(value);

  if (rangeInput) {
    rangeInput.value =
      roundedValue.toString();
  }

  if (numberInput) {
    numberInput.value =
      roundedValue.toString();
  }

  if (rangeOutput) {
    rangeOutput.value =
      `${roundedValue}%`;
  }

  if (currentValueElement) {
    currentValueElement.textContent =
      `${roundedValue}%`;
  }
}

function setApplicationValue(
  requestedValue: number,
  statusMessage?: string
): void {
  if (!Number.isFinite(requestedValue)) {
    updateStatus(
      'Enter a valid numeric value.'
    );

    return;
  }

  currentValue =
    clamp(
      requestedValue,
      minimumValue,
      maximumValue
    );

  gauge.setPointerValue(
    0,
    0,
    currentValue
  );

  gauge.axes[0]
    .pointers[0]
    .description =
      `Current system utilization is ${Math.round(
        currentValue
      )} percent`;

  synchronizeControls(
    currentValue
  );

  if (statusMessage) {
    updateStatus(statusMessage);
  }
}

const gauge: LinearGauge =
  new LinearGauge({
    width: '100%',
    height: '100%',
    orientation: 'Horizontal',
    background: '#ffffff',

    title:
      'System Utilization',

    titleStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '19px',
      fontWeight: '700'
    },

    animationDuration:
      reduceMotion ? 0 : 700,

    margin: {
      left: 25,
      right: 25,
      top: 25,
      bottom: 35
    },

    container: {
      width: 26,
      height: 0,
      type: 'RoundedRectangle',
      backgroundColor: '#e2e8f0',
      roundedCornerRadius: 8,
      border: {
        color: '#94a3b8',
        width: 1
      }
    },

    axes: [
      {
        minimum: minimumValue,
        maximum: maximumValue,
        showLastLabel: true,

        line: {
          width: 2,
          color: '#475569'
        },

        majorTicks: {
          interval: 20,
          position: 'Outside',
          height: 11,
          width: 2,
          color: '#334155'
        },

        minorTicks: {
          interval: 5,
          position: 'Outside',
          height: 6,
          width: 1,
          color: '#64748b'
        },

        labelStyle: {
          format: '{value}%',
          position: 'Outside',
          offset: 9,

          font: {
            family: 'Arial',
            size: '13px',
            color: '#334155',
            fontWeight: '600'
          }
        },

        ranges: [
          {
            start: 0,
            end: 40,
            color: '#166534',
            position: 'Inside',
            startWidth: 14,
            endWidth: 14
          },
          {
            start: 40,
            end: 70,
            color: '#854d0e',
            position: 'Inside',
            startWidth: 14,
            endWidth: 14
          },
          {
            start: 70,
            end: 100,
            color: '#991b1b',
            position: 'Inside',
            startWidth: 14,
            endWidth: 14
          }
        ],

        pointers: [
          {
            value: currentValue,
            type: 'Marker',
            markerType: 'Circle',
            color: '#2563eb',
            height: 28,
            width: 28,
            position: 'Cross',
            enableDrag: true,
            animationDuration:
              reduceMotion ? 0 : 500,
            description:
              'Current system utilization is 50 percent',
            border: {
              color: '#1e3a8a',
              width: 2
            }
          }
        ]
      }
    ],

    gaugeMouseDown: (
      args: IMouseEventArgs
    ): void => {
      console.log(
        'Gauge mouse down:',
        args
      );

      updateStatus(
        'Pointer interaction started.'
      );
    },

    gaugeMouseUp: (
      args: IMouseEventArgs
    ): void => {
      console.log(
        'Gauge mouse up:',
        args
      );
    },

    dragStart: (
      args: IPointerDragEventArgs
    ): void => {
      stopSimulation();

      updateStatus(
        `Dragging started near ${Math.round(
          args.currentValue
        )} percent.`
      );
    },

    dragMove: (
      args: IPointerDragEventArgs
    ): void => {
      currentValue =
        clamp(
          args.currentValue,
          minimumValue,
          maximumValue
        );

      synchronizeControls(
        currentValue
      );
    },

    dragEnd: (
      args: IPointerDragEventArgs
    ): void => {
      const snappedValue: number =
        snapValue(
          args.currentValue
        );

      setApplicationValue(
        snappedValue,
        `Value snapped to ${snappedValue} percent.`
      );
    },

    valueChange: (
      args: IValueChangeEventArgs
    ): void => {
      currentValue =
        clamp(
          args.value,
          minimumValue,
          maximumValue
        );

      synchronizeControls(
        currentValue
      );
    }
  });

gauge.appendTo('#gauge-container');

function updateFromRange(): void {
  if (!rangeInput) {
    return;
  }

  stopSimulation();

  const value: number =
    Number(rangeInput.value);

  setApplicationValue(
    value,
    `Value updated to ${value} percent from the range control.`
  );
}

function applyNumericValue(): void {
  if (!numberInput) {
    return;
  }

  stopSimulation();

  const requestedValue: number =
    Number(numberInput.value);

  if (!Number.isFinite(requestedValue)) {
    updateStatus(
      'Enter a valid numeric value.'
    );

    return;
  }

  const snappedValue: number =
    snapValue(requestedValue);

  setApplicationValue(
    snappedValue,
    `Numeric value applied at ${snappedValue} percent.`
  );
}

function startSimulation(): void {
  if (simulationTimer !== null) {
    updateStatus(
      'Simulation is already running.'
    );

    return;
  }

  updateStatus(
    'Live-value simulation started.'
  );

  simulationTimer =
    window.setInterval(
      (): void => {
        const change: number =
          (Math.random() - 0.5) * 12;

        const simulatedValue: number =
          clamp(
            currentValue + change,
            minimumValue,
            maximumValue
          );

        setApplicationValue(
          simulatedValue
        );
      },
      750
    );
}

function stopSimulation(): void {
  if (simulationTimer === null) {
    return;
  }

  window.clearInterval(
    simulationTimer
  );

  simulationTimer = null;

  updateStatus(
    'Live-value simulation stopped.'
  );
}

const applyButton:
  HTMLElement | null =
    document.getElementById(
      'apply-value'
    );

const startButton:
  HTMLElement | null =
    document.getElementById(
      'start-simulation'
    );

const stopButton:
  HTMLElement | null =
    document.getElementById(
      'stop-simulation'
    );

rangeInput?.addEventListener(
  'input',
  updateFromRange
);

applyButton?.addEventListener(
  'click',
  applyNumericValue
);

startButton?.addEventListener(
  'click',
  startSimulation
);

stopButton?.addEventListener(
  'click',
  stopSimulation
);

function cleanUp(): void {
  stopSimulation();

  rangeInput?.removeEventListener(
    'input',
    updateFromRange
  );

  applyButton?.removeEventListener(
    'click',
    applyNumericValue
  );

  startButton?.removeEventListener(
    'click',
    startSimulation
  );

  stopButton?.removeEventListener(
    'click',
    stopSimulation
  );

  gauge.destroy();
}

window.addEventListener(
  'beforeunload',
  cleanUp,
  {
    once: true
  }
);

synchronizeControls(
  currentValue
);
```

## Complete JavaScript Example

Use the same `index.html` from the complete TypeScript example.

Ensure that the EJ2 Linear Gauge global script is loaded before `index.js`.

### index.js

```javascript
var minimumValue = 0;
var maximumValue = 100;
var snapInterval = 5;

var currentValue = 50;
var simulationTimer = null;

var reduceMotion =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

var rangeInput =
  document.getElementById(
    'range-value'
  );

var numberInput =
  document.getElementById(
    'number-value'
  );

var rangeOutput =
  document.getElementById(
    'range-output'
  );

var currentValueElement =
  document.getElementById(
    'current-value'
  );

var interactionStatus =
  document.getElementById(
    'interaction-status'
  );

function clamp(
  value,
  minimum,
  maximum
) {
  return Math.min(
    maximum,
    Math.max(minimum, value)
  );
}

function snapValue(value) {
  var snappedValue =
    Math.round(
      value / snapInterval
    ) * snapInterval;

  return clamp(
    snappedValue,
    minimumValue,
    maximumValue
  );
}

function updateStatus(message) {
  if (interactionStatus) {
    interactionStatus.textContent =
      message;
  }
}

function synchronizeControls(value) {
  var roundedValue =
    Math.round(value);

  if (rangeInput) {
    rangeInput.value =
      String(roundedValue);
  }

  if (numberInput) {
    numberInput.value =
      String(roundedValue);
  }

  if (rangeOutput) {
    rangeOutput.value =
      roundedValue + '%';
  }

  if (currentValueElement) {
    currentValueElement.textContent =
      roundedValue + '%';
  }
}

function setApplicationValue(
  requestedValue,
  statusMessage
) {
  if (
    !Number.isFinite(requestedValue)
  ) {
    updateStatus(
      'Enter a valid numeric value.'
    );

    return;
  }

  currentValue =
    clamp(
      requestedValue,
      minimumValue,
      maximumValue
    );

  gauge.setPointerValue(
    0,
    0,
    currentValue
  );

  gauge.axes[0]
    .pointers[0]
    .description =
      'Current system utilization is ' +
      Math.round(currentValue) +
      ' percent';

  synchronizeControls(
    currentValue
  );

  if (statusMessage) {
    updateStatus(statusMessage);
  }
}

var gauge =
  new ej.lineargauge.LinearGauge({
    width: '100%',
    height: '100%',
    orientation: 'Horizontal',
    background: '#ffffff',

    title:
      'System Utilization',

    titleStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '19px',
      fontWeight: '700'
    },

    animationDuration:
      reduceMotion ? 0 : 700,

    margin: {
      left: 25,
      right: 25,
      top: 25,
      bottom: 35
    },

    container: {
      width: 26,
      height: 0,
      type: 'RoundedRectangle',
      backgroundColor: '#e2e8f0',
      roundedCornerRadius: 8,
      border: {
        color: '#94a3b8',
        width: 1
      }
    },

    axes: [
      {
        minimum: minimumValue,
        maximum: maximumValue,
        showLastLabel: true,

        line: {
          width: 2,
          color: '#475569'
        },

        majorTicks: {
          interval: 20,
          position: 'Outside',
          height: 11,
          width: 2,
          color: '#334155'
        },

        minorTicks: {
          interval: 5,
          position: 'Outside',
          height: 6,
          width: 1,
          color: '#64748b'
        },

        labelStyle: {
          format: '{value}%',
          position: 'Outside',
          offset: 9,

          font: {
            family: 'Arial',
            size: '13px',
            color: '#334155',
            fontWeight: '600'
          }
        },

        ranges: [
          {
            start: 0,
            end: 40,
            color: '#166534',
            position: 'Inside',
            startWidth: 14,
            endWidth: 14
          },
          {
            start: 40,
            end: 70,
            color: '#854d0e',
            position: 'Inside',
            startWidth: 14,
            endWidth: 14
          },
          {
            start: 70,
            end: 100,
            color: '#991b1b',
            position: 'Inside',
            startWidth: 14,
            endWidth: 14
          }
        ],

        pointers: [
          {
            value: currentValue,
            type: 'Marker',
            markerType: 'Circle',
            color: '#2563eb',
            height: 28,
            width: 28,
            position: 'Cross',
            enableDrag: true,
            animationDuration:
              reduceMotion ? 0 : 500,
            description:
              'Current system utilization is 50 percent',
            border: {
              color: '#1e3a8a',
              width: 2
            }
          }
        ]
      }
    ],

    gaugeMouseDown: function (args) {
      console.log(
        'Gauge mouse down:',
        args
      );

      updateStatus(
        'Pointer interaction started.'
      );
    },

    gaugeMouseUp: function (args) {
      console.log(
        'Gauge mouse up:',
        args
      );
    },

    dragStart: function (args) {
      stopSimulation();

      updateStatus(
        'Dragging started near ' +
        Math.round(
          args.currentValue
        ) +
        ' percent.'
      );
    },

    dragMove: function (args) {
      currentValue =
        clamp(
          args.currentValue,
          minimumValue,
          maximumValue
        );

      synchronizeControls(
        currentValue
      );
    },

    dragEnd: function (args) {
      var snappedValue =
        snapValue(
          args.currentValue
        );

      setApplicationValue(
        snappedValue,
        'Value snapped to ' +
        snappedValue +
        ' percent.'
      );
    },

    valueChange: function (args) {
      currentValue =
        clamp(
          args.value,
          minimumValue,
          maximumValue
        );

      synchronizeControls(
        currentValue
      );
    }
  });

gauge.appendTo('#gauge-container');

function updateFromRange() {
  if (!rangeInput) {
    return;
  }

  stopSimulation();

  var value =
    Number(rangeInput.value);

  setApplicationValue(
    value,
    'Value updated to ' +
    value +
    ' percent from the range control.'
  );
}

function applyNumericValue() {
  if (!numberInput) {
    return;
  }

  stopSimulation();

  var requestedValue =
    Number(numberInput.value);

  if (
    !Number.isFinite(
      requestedValue
    )
  ) {
    updateStatus(
      'Enter a valid numeric value.'
    );

    return;
  }

  var snappedValue =
    snapValue(requestedValue);

  setApplicationValue(
    snappedValue,
    'Numeric value applied at ' +
    snappedValue +
    ' percent.'
  );
}

function startSimulation() {
  if (
    simulationTimer !== null
  ) {
    updateStatus(
      'Simulation is already running.'
    );

    return;
  }

  updateStatus(
    'Live-value simulation started.'
  );

  simulationTimer =
    window.setInterval(
      function () {
        var change =
          (Math.random() - 0.5) * 12;

        var simulatedValue =
          clamp(
            currentValue + change,
            minimumValue,
            maximumValue
          );

        setApplicationValue(
          simulatedValue
        );
      },
      750
    );
}

function stopSimulation() {
  if (
    simulationTimer === null
  ) {
    return;
  }

  window.clearInterval(
    simulationTimer
  );

  simulationTimer = null;

  updateStatus(
    'Live-value simulation stopped.'
  );
}

var applyButton =
  document.getElementById(
    'apply-value'
  );

var startButton =
  document.getElementById(
    'start-simulation'
  );

var stopButton =
  document.getElementById(
    'stop-simulation'
  );

if (rangeInput) {
  rangeInput.addEventListener(
    'input',
    updateFromRange
  );
}

if (applyButton) {
  applyButton.addEventListener(
    'click',
    applyNumericValue
  );
}

if (startButton) {
  startButton.addEventListener(
    'click',
    startSimulation
  );
}

if (stopButton) {
  stopButton.addEventListener(
    'click',
    stopSimulation
  );
}

function cleanUp() {
  stopSimulation();

  if (rangeInput) {
    rangeInput.removeEventListener(
      'input',
      updateFromRange
    );
  }

  if (applyButton) {
    applyButton.removeEventListener(
      'click',
      applyNumericValue
    );
  }

  if (startButton) {
    startButton.removeEventListener(
      'click',
      startSimulation
    );
  }

  if (stopButton) {
    stopButton.removeEventListener(
      'click',
      stopSimulation
    );
  }

  gauge.destroy();
}

window.addEventListener(
  'beforeunload',
  cleanUp,
  {
    once: true
  }
);

synchronizeControls(
  currentValue
);
```

## Best Practices

### Enable Dragging Explicitly

```typescript
pointers: [
  {
    value: 50,
    enableDrag: true
  }
]
```

Dragging is disabled unless `enableDrag` is set to `true`.

### Use a Marker with a Suitable Touch Target

```typescript
pointers: [
  {
    value: 50,
    type: 'Marker',
    markerType: 'Circle',
    height: 28,
    width: 28,
    enableDrag: true
  }
]
```

A visibly larger pointer is easier to acquire with touch input.

### Use dragMove for Feedback

```typescript
dragMove: (
  args: IPointerDragEventArgs
): void => {
  updateDisplayedValue(
    Math.round(args.currentValue)
  );
}
```

Avoid sending a server request for every drag movement.

### Use dragEnd for Committing Values

```typescript
dragEnd: (
  args: IPointerDragEventArgs
): void => {
  saveValue(args.currentValue);
}
```

Use this event for operations such as:

- Validation
- Snapping
- Persistence
- Device updates
- Analytics
- Application commands

### Use the Event Arguments

Correct:

```typescript
dragEnd: (
  args: IPointerDragEventArgs
): void => {
  const value: number =
    args.currentValue;
}
```

Avoid:

```typescript
dragEnd: (
  args: IPointerDragEventArgs
): void => {
  const value: number =
    event.currentValue;
}
```

The global `event` object is unreliable and does not provide the typed Linear Gauge event data.

### Clamp External Values

```typescript
const safeValue: number =
  Math.min(
    axis.maximum,
    Math.max(
      axis.minimum,
      externalValue
    )
  );
```

Do not assume that API values always remain within the configured scale.

### Use setPointerValue for Pointer Updates

```typescript
gauge.setPointerValue(
  0,
  0,
  newValue
);
```

Do not refresh the complete gauge for every pointer-only update unless other configuration has changed.

### Use Native Form Controls

Use a range input when users need keyboard-accessible value editing.

```html
<input
  type="range"
  min="0"
  max="100"
  step="5"
/>
```

Use a number input when precise value entry is required.

```html
<input
  type="number"
  min="0"
  max="100"
  step="5"
/>
```

### Keep the Gauge and Form Control Synchronized

Update the form control when dragging changes the pointer.

Update the pointer when the form control changes.

Provide one shared value-update function to avoid inconsistent state.

### Respect Reduced Motion

```typescript
const reduceMotion: boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

pointers: [
  {
    animationDuration:
      reduceMotion ? 0 : 500
  }
]
```

### Clean Up Timers and Event Listeners

```typescript
window.clearInterval(
  simulationTimer
);

input.removeEventListener(
  'input',
  handleInput
);

gauge.destroy();
```

### Provide Visible Status Feedback

```html
<p
  role="status"
  aria-live="polite"
>
  Value updated to 65 percent.
</p>
```

Do not rely only on pointer position or color.

## Troubleshooting

### Pointer Cannot Be Dragged

Confirm that `enableDrag` is `true`.

```typescript
pointers: [
  {
    value: 50,
    enableDrag: true
  }
]
```

Also verify that:

- The pointer is visible.
- Its value is within the axis range.
- The pointer has a usable size.
- Another element is not covering the gauge.
- The gauge is not disabled by application logic.

### Drag Events Do Not Fire

Configure the events on the `LinearGauge` object.

```typescript
const gauge: LinearGauge =
  new LinearGauge({
    dragStart: (
      args: IPointerDragEventArgs
    ): void => {
      console.log(args);
    },

    dragMove: (
      args: IPointerDragEventArgs
    ): void => {
      console.log(args);
    },

    dragEnd: (
      args: IPointerDragEventArgs
    ): void => {
      console.log(args);
    }
  });
```

Do not use Angular event-binding syntax in pure TypeScript or JavaScript.

```html
<!-- Angular syntax. Do not use here. -->
<ejs-lineargauge
  (dragEnd)="dragEnd($event)"
></ejs-lineargauge>
```

### currentValue Is Undefined

Use a pointer drag event argument.

```typescript
dragEnd: (
  args: IPointerDragEventArgs
): void => {
  console.log(
    args.currentValue
  );
}
```

Do not read `event.currentValue`.

Also confirm that the callback is attached to `dragStart`, `dragMove`, or `dragEnd`, not to an unrelated mouse event.

### valueChange Does Not Fire

Confirm that:

- A pointer exists.
- The pointer value is changing.
- Dragging is enabled for user-driven changes.
- The event name uses the correct casing.
- The callback is configured on the Linear Gauge.

```typescript
valueChange: (
  args: IValueChangeEventArgs
): void => {
  console.log(args.value);
}
```

### Programmatic Update Does Not Move the Pointer

Use valid axis and pointer indexes.

```typescript
gauge.setPointerValue(
  0,
  0,
  75
);
```

Confirm that:

- Axis `0` exists.
- Pointer `0` exists.
- The new value is within the axis limits.

### Pointer Moves Outside the Expected Range

Clamp the value.

```typescript
const safeValue: number =
  Math.min(
    axis.maximum,
    Math.max(
      axis.minimum,
      requestedValue
    )
  );
```

### Snapped Value Is Not Shown

After calculating the snapped value, update the pointer.

```typescript
const snappedValue: number =
  Math.round(value / 5) * 5;

gauge.setPointerValue(
  0,
  0,
  snappedValue
);
```

Also update the corresponding input and visible text.

### Native Input and Pointer Become Unsynchronized

Use one function to update all state.

```typescript
function setValue(
  value: number
): void {
  gauge.setPointerValue(
    0,
    0,
    value
  );

  rangeInput.value =
    value.toString();

  output.value =
    `${value}%`;
}
```

Call the same function from input, drag, and API-update flows.

### Simulation Starts More Than Once

Check whether an interval already exists.

```typescript
if (
  simulationTimer !== null
) {
  return;
}
```

Clear the interval before starting another simulation.

### Simulation Continues After Leaving the Page

Clear the timer and destroy the gauge.

```typescript
window.addEventListener(
  'beforeunload',
  (): void => {
    stopSimulation();
    gauge.destroy();
  },
  {
    once: true
  }
);
```

### API Polling Creates Overlapping Requests

Use `AbortController`, wait for the current request, or use a recursive timeout rather than creating uncontrolled overlapping requests.

```typescript
activeRequest?.abort();

activeRequest =
  new AbortController();
```

Stop polling when the gauge is destroyed.

### API Returns an Invalid Value

Validate the response.

```typescript
if (
  !Number.isFinite(result.value)
) {
  throw new Error(
    'Invalid gauge value.'
  );
}
```

Clamp the accepted value to the axis range.

### Click Does Not Change the Gauge Value

The general `gaugeMouseDown` event should not be assumed to provide a ready-to-use scale value for every target and orientation.

For reliable value editing, use:

- A draggable pointer
- A native range input
- A native number input
- Application buttons

### Gauge Refreshes Too Often

Use `setPointerValue()` for pointer-only changes.

```typescript
gauge.setPointerValue(
  0,
  0,
  value
);
```

Reserve `refresh()` for broader configuration changes.

### Screen Reader Does Not Announce Updates

Provide a live status element.

```html
<p
  id="interaction-status"
  role="status"
  aria-live="polite"
>
  Ready for interaction.
</p>
```

Update its text after meaningful changes.

```typescript
updateStatus(
  'Value updated to 65 percent.'
);
```

### Keyboard Users Cannot Change the Gauge

Dragging alone is not a complete keyboard interaction.

Provide a native input.

```html
<input
  id="gauge-value"
  type="range"
  min="0"
  max="100"
  step="5"
/>
```

Synchronize it with `setPointerValue()`.

### Gauge Is Not Visible

Confirm that the host exists.

```html
<div id="gauge-container"></div>
```

Give it a visible size.

```css
#gauge-container {
  width: 100%;
  height: 360px;
}
```

Append the gauge after the host is available.

```typescript
gauge.appendTo(
  '#gauge-container'
);
```

Also verify that the correct package or global script is loaded and that no earlier JavaScript error stopped initialization.