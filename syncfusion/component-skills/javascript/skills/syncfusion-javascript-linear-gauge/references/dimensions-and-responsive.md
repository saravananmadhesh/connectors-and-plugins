# Linear Gauge Dimensions and Responsive Design in TypeScript and JavaScript

Configure Linear Gauge sizing for different screen sizes and container layouts. This guide explains fixed dimensions, percentage sizing, responsive behavior, mobile optimization, ResizeObserver usage, multi-gauge layouts, fullscreen rendering, and vertical gauge sizing.

## Table of Contents

- #prerequisites
- #understanding-linear-gauge-dimensions
- #fixed-dimensions
  - #fixed-dimensions-in-typescript
  - #fixed-dimensions-in-javascript
- #percentage-based-sizing
- #responsive-design
  - #responsive-width
  - #responsive-height
  - #css-media-queries
  - #resizeobserver
  - #window-resize-fallback
- #dimension-properties
  - #gauge-level-dimensions
  - #internal-container-dimensions
  - #element-sizing
- #mobile-optimization
  - #mobile-first-configuration
  - #responsive-label-and-tick-sizing
  - #touch-friendly-pointers
- #multi-gauge-layouts
  - #stacked-gauges
  - #responsive-gauge-grid
- #practical-examples
  - #responsive-dashboard
  - #fullscreen-gauge
  - #vertical-linear-gauge
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #troubleshooting

## Prerequisites

Install the Essential JS 2 Linear Gauge package.

```bash
npm install @syncfusion/ej2-lineargauge
```

For TypeScript, import the `LinearGauge` class.

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';
```

Add a target element to the HTML page.

```html
<div id="gauge-container"></div>
```

Create and append the gauge.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '300px',
  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');
```

For JavaScript applications using the EJ2 global namespace:

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  width: '100%',
  height: '300px',
  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Understanding Linear Gauge Dimensions

The Linear Gauge has two different dimension systems.

### Gauge-Level Dimensions

Use the top-level `width` and `height` properties to control the complete component.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '300px'
});
```

These properties accept CSS-compatible dimensions such as:

- `500px`
- `100%`
- `50%`
- `80vw`
- `60vh`

### Internal Container Dimensions

Use the `container` property to customize the internal graphical container that surrounds the gauge axis.

```typescript
container: {
  width: 30,
  height: 200,
  type: 'RoundedRectangle'
}
```

The internal container properties use numeric pixel values.

Do not use the internal `container.width` and `container.height` properties to control the overall component size.

### Correct Usage

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '300px',

  container: {
    width: 30,
    height: 0,
    type: 'RoundedRectangle'
  }
});
```

In this example:

- `width: '100%'` controls the complete gauge width.
- `height: '300px'` controls the complete gauge height.
- `container.width: 30` controls the thickness of the internal gauge container.
- `container.height: 0` allows the gauge to determine the internal container length.

## Fixed Dimensions

Use pixel dimensions when the gauge must render at a predictable size.

## Fixed Dimensions in TypeScript

### index.html

```html
<div class="fixed-gauge-wrapper">
  <div id="fixed-gauge"></div>
</div>
```

### styles.css

```css
.fixed-gauge-wrapper {
  overflow: auto;
}
```

### index.ts

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

const gauge: LinearGauge = new LinearGauge({
  width: '500px',
  height: '250px',
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      majorTicks: {
        interval: 20
      },

      minorTicks: {
        interval: 5
      },

      pointers: [
        {
          value: 65,
          type: 'Bar',
          color: '#2563eb',
          width: 15
        }
      ]
    }
  ]
});

gauge.appendTo('#fixed-gauge');
```

## Fixed Dimensions in JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  width: '500px',
  height: '250px',
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      majorTicks: {
        interval: 20
      },

      minorTicks: {
        interval: 5
      },

      pointers: [
        {
          value: 65,
          type: 'Bar',
          color: '#2563eb',
          width: 15
        }
      ]
    }
  ]
});

gauge.appendTo('#fixed-gauge');
```

Fixed dimensions are appropriate when:

- The gauge is displayed in a fixed-size panel.
- The surrounding layout does not resize.
- Exported or printed output must maintain a known size.
- The design requires consistent dimensions.

Avoid fixed widths larger than the available mobile viewport unless horizontal scrolling is intentional.

## Percentage-Based Sizing

Set the gauge width to `100%` to match the width of its parent.

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '300px',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 72,
          type: 'Bar',
          color: '#2563eb',
          width: 15
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  width: '100%',
  height: '300px',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 72,
          type: 'Bar',
          color: '#2563eb',
          width: 15
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

Define the parent width through CSS.

```css
.gauge-panel {
  width: min(100%, 1000px);
  margin: 0 auto;
}

#gauge-container {
  width: 100%;
}
```

```html
<div class="gauge-panel">
  <div id="gauge-container"></div>
</div>
```

A percentage height requires a parent element with a defined height.

```css
.gauge-panel {
  width: 100%;
  height: 500px;
}

#gauge-container {
  width: 100%;
  height: 100%;
}
```

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '100%'
});
```

Without a defined parent height, percentage height may not resolve as expected.

## Responsive Design

Responsive Linear Gauge design normally combines:

1. Percentage-based gauge width.
2. A responsive parent layout.
3. CSS media queries.
4. ResizeObserver when internal settings must change.
5. A gauge refresh after layout changes.

## Responsive Width

Use `width: '100%'` to make the gauge follow its parent width.

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '280px',

  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 60
        }
      ]
    }
  ]
});

gauge.appendTo('#responsive-gauge');
```

### CSS

```css
.responsive-gauge-card {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
}

#responsive-gauge {
  width: 100%;
}
```

## Responsive Height

Use CSS custom properties to control gauge height at different breakpoints.

```css
.responsive-gauge-card {
  --gauge-height: 220px;
}

#responsive-gauge {
  width: 100%;
  height: var(--gauge-height);
}

@media (min-width: 576px) {
  .responsive-gauge-card {
    --gauge-height: 260px;
  }
}

@media (min-width: 992px) {
  .responsive-gauge-card {
    --gauge-height: 320px;
  }
}
```

The gauge can use the container dimensions.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '100%'
});
```

Ensure the host element receives a resolved height from CSS.

## CSS Media Queries

Use media queries for layout and host-element dimensions.

```css
#gauge-container {
  width: 100%;
  height: 220px;
}

@media (min-width: 576px) {
  #gauge-container {
    height: 260px;
  }
}

@media (min-width: 992px) {
  #gauge-container {
    height: 320px;
  }
}
```

Pure TypeScript and JavaScript applications do not require Angular-specific selectors such as `::ng-deep`.

Avoid:

```css
/* Angular-specific. Do not use in pure TypeScript. */
::ng-deep .e-gauge {
  height: 200px;
}
```

Prefer styling the application-owned host element.

```css
#gauge-container {
  width: 100%;
  height: 300px;
}
```

## ResizeObserver

Use `ResizeObserver` when the gauge must respond to changes in its parent container rather than only changes in the browser viewport.

This is useful when:

- A sidebar is expanded or collapsed.
- A dashboard panel is resized.
- A grid column changes width.
- The gauge enters or exits fullscreen.
- A parent component changes layout.

### TypeScript

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

const host: HTMLElement | null =
  document.getElementById('gauge-container');

if (!host) {
  throw new Error(
    'The Linear Gauge host element was not found.'
  );
}

const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '100%',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 65,
          type: 'Bar',
          width: 15,
          color: '#2563eb'
        }
      ]
    }
  ]
});

gauge.appendTo(host);

let animationFrameId = 0;

const resizeObserver: ResizeObserver =
  new ResizeObserver((): void => {
    window.cancelAnimationFrame(animationFrameId);

    animationFrameId =
      window.requestAnimationFrame((): void => {
        gauge.refresh();
      });
  });

resizeObserver.observe(host);

window.addEventListener(
  'beforeunload',
  (): void => {
    resizeObserver.disconnect();
    window.cancelAnimationFrame(animationFrameId);
    gauge.destroy();
  }
);
```

### JavaScript

```javascript
var host =
  document.getElementById('gauge-container');

if (!host) {
  throw new Error(
    'The Linear Gauge host element was not found.'
  );
}

var gauge = new ej.lineargauge.LinearGauge({
  width: '100%',
  height: '100%',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 65,
          type: 'Bar',
          width: 15,
          color: '#2563eb'
        }
      ]
    }
  ]
});

gauge.appendTo(host);

var animationFrameId = 0;

var resizeObserver =
  new ResizeObserver(function () {
    window.cancelAnimationFrame(
      animationFrameId
    );

    animationFrameId =
      window.requestAnimationFrame(
        function () {
          gauge.refresh();
        }
      );
  });

resizeObserver.observe(host);

window.addEventListener(
  'beforeunload',
  function () {
    resizeObserver.disconnect();

    window.cancelAnimationFrame(
      animationFrameId
    );

    gauge.destroy();
  }
);
```

Using `requestAnimationFrame` prevents several resize notifications from causing unnecessary immediate refresh operations.

## Window Resize Fallback

Use a window resize listener when `ResizeObserver` is unavailable.

### TypeScript

```typescript
let resizeTimer: number | undefined;

function handleResize(): void {
  window.clearTimeout(resizeTimer);

  resizeTimer = window.setTimeout(
    (): void => {
      gauge.refresh();
    },
    150
  );
}

window.addEventListener(
  'resize',
  handleResize
);

window.addEventListener(
  'beforeunload',
  (): void => {
    window.removeEventListener(
      'resize',
      handleResize
    );

    window.clearTimeout(resizeTimer);
    gauge.destroy();
  }
);
```

### JavaScript

```javascript
var resizeTimer;

function handleResize() {
  window.clearTimeout(resizeTimer);

  resizeTimer = window.setTimeout(
    function () {
      gauge.refresh();
    },
    150
  );
}

window.addEventListener(
  'resize',
  handleResize
);

window.addEventListener(
  'beforeunload',
  function () {
    window.removeEventListener(
      'resize',
      handleResize
    );

    window.clearTimeout(resizeTimer);
    gauge.destroy();
  }
);
```

Always pass the same function reference to `addEventListener` and `removeEventListener`.

Avoid this pattern:

```typescript
window.addEventListener(
  'resize',
  (): void => gauge.refresh()
);

window.removeEventListener(
  'resize',
  (): void => gauge.refresh()
);
```

The two arrow functions are different function instances, so the listener is not removed.

## Dimension Properties

## Gauge-Level Dimensions

The gauge-level dimensions control the complete SVG component.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '300px'
});
```

Common values include:

```typescript
width: '650px'
```

```typescript
width: '100%'
```

```typescript
height: '350px'
```

```typescript
height: '100%'
```

When no explicit dimensions are supplied, ensure the default size is suitable for the application layout.

## Internal Container Dimensions

The internal `container` settings control the visual gauge container.

```typescript
container: {
  width: 30,
  height: 0,
  type: 'RoundedRectangle',
  backgroundColor: '#e2e8f0',
  roundedCornerRadius: 8,
  border: {
    color: '#64748b',
    width: 1
  }
}
```

Use numeric values:

```typescript
container: {
  width: 30,
  height: 200
}
```

Avoid CSS strings:

```typescript
// Avoid for internal container dimensions.
container: {
  width: '100%',
  height: '200px'
}
```

Use the top-level gauge dimensions for CSS-formatted values.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '300px'
});
```

## Element Sizing

Labels, ticks, ranges, and pointers may need different dimensions at different screen sizes.

### TypeScript Configuration Function

```typescript
import {
  AxisModel
} from '@syncfusion/ej2-lineargauge';

function createAxis(
  compact: boolean
): AxisModel {
  const labelSize: string =
    compact ? '10px' : '14px';

  const majorTickHeight: number =
    compact ? 7 : 12;

  const minorTickHeight: number =
    compact ? 4 : 7;

  const pointerWidth: number =
    compact ? 12 : 18;

  const rangeWidth: number =
    compact ? 10 : 16;

  return {
    minimum: 0,
    maximum: 100,

    majorTicks: {
      interval: 20,
      height: majorTickHeight,
      width: 2
    },

    minorTicks: {
      interval: 5,
      height: minorTickHeight,
      width: 1
    },

    labelStyle: {
      format: '{value}%',
      font: {
        size: labelSize,
        fontFamily: 'Arial',
        color: '#334155'
      }
    },

    ranges: [
      {
        start: 0,
        end: 40,
        color: '#16a34a',
        startWidth: rangeWidth,
        endWidth: rangeWidth
      },
      {
        start: 40,
        end: 70,
        color: '#ca8a04',
        startWidth: rangeWidth,
        endWidth: rangeWidth
      },
      {
        start: 70,
        end: 100,
        color: '#dc2626',
        startWidth: rangeWidth,
        endWidth: rangeWidth
      }
    ],

    pointers: [
      {
        value: 65,
        type: 'Bar',
        width: pointerWidth,
        color: '#1e293b'
      }
    ]
  };
}
```

Use the function when creating the gauge.

```typescript
const compact: boolean =
  window.matchMedia(
    '(max-width: 575px)'
  ).matches;

const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: compact ? '220px' : '320px',
  axes: [
    createAxis(compact)
  ]
});
```

## Mobile Optimization

A mobile-first gauge should:

- Use `width: '100%'`.
- Start with compact labels and ticks.
- Avoid fixed desktop widths.
- Use a sufficient host height.
- Limit the number of visible labels.
- Use touch-friendly controls.
- Keep pointer and range styling readable.
- Avoid user-agent-based device detection.

## Mobile-First Configuration

Use `matchMedia` instead of inspecting `navigator.userAgent`.

### TypeScript

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

const mobileQuery: MediaQueryList =
  window.matchMedia(
    '(max-width: 575px)'
  );

function createGauge(
  compact: boolean
): LinearGauge {
  return new LinearGauge({
    width: '100%',
    height: compact
      ? '220px'
      : '320px',

    orientation: 'Horizontal',

    margin: {
      left: compact ? 15 : 30,
      right: compact ? 15 : 30,
      top: compact ? 15 : 25,
      bottom: compact ? 15 : 25
    },

    axes: [
      {
        minimum: 0,
        maximum: 100,

        majorTicks: {
          interval: compact ? 25 : 20,
          height: compact ? 7 : 11
        },

        minorTicks: {
          interval: compact ? 5 : 2,
          height: compact ? 4 : 6
        },

        labelStyle: {
          format: '{value}%',
          font: {
            size: compact
              ? '10px'
              : '14px',
            color: '#334155'
          }
        },

        pointers: [
          {
            value: 65,
            type: 'Bar',
            width: compact ? 12 : 18,
            color: '#2563eb'
          }
        ]
      }
    ]
  });
}

let gauge: LinearGauge =
  createGauge(mobileQuery.matches);

gauge.appendTo('#gauge-container');
```

## Responsive Label and Tick Sizing

When the breakpoint changes, update the gauge configuration and refresh it.

### TypeScript

```typescript
function applyResponsiveSettings(
  compact: boolean
): void {
  gauge.height = compact
    ? '220px'
    : '320px';

  const axis = gauge.axes[0];

  axis.majorTicks.interval =
    compact ? 25 : 20;

  axis.majorTicks.height =
    compact ? 7 : 11;

  axis.minorTicks.height =
    compact ? 4 : 6;

  axis.labelStyle.font.size =
    compact ? '10px' : '14px';

  axis.pointers[0].width =
    compact ? 12 : 18;

  gauge.refresh();
}

function handleBreakpointChange(
  event: MediaQueryListEvent
): void {
  applyResponsiveSettings(
    event.matches
  );
}

mobileQuery.addEventListener(
  'change',
  handleBreakpointChange
);
```

### JavaScript

```javascript
function applyResponsiveSettings(
  compact
) {
  gauge.height = compact
    ? '220px'
    : '320px';

  var axis = gauge.axes[0];

  axis.majorTicks.interval =
    compact ? 25 : 20;

  axis.majorTicks.height =
    compact ? 7 : 11;

  axis.minorTicks.height =
    compact ? 4 : 6;

  axis.labelStyle.font.size =
    compact ? '10px' : '14px';

  axis.pointers[0].width =
    compact ? 12 : 18;

  gauge.refresh();
}

function handleBreakpointChange(event) {
  applyResponsiveSettings(
    event.matches
  );
}

mobileQuery.addEventListener(
  'change',
  handleBreakpointChange
);
```

Remove the listener when the gauge is no longer required.

```typescript
mobileQuery.removeEventListener(
  'change',
  handleBreakpointChange
);

gauge.destroy();
```

## Touch-Friendly Pointers

When pointer dragging is enabled, provide a marker large enough to acquire with touch input.

### TypeScript

```typescript
pointers: [
  {
    value: 65,
    type: 'Marker',
    markerType: 'Circle',
    color: '#2563eb',
    height: 28,
    width: 28,
    enableDrag: true,
    description:
      'Drag to change the system-health value'
  }
]
```

### JavaScript

```javascript
pointers: [
  {
    value: 65,
    type: 'Marker',
    markerType: 'Circle',
    color: '#2563eb',
    height: 28,
    width: 28,
    enableDrag: true,
    description:
      'Drag to change the system-health value'
  }
]
```

A bar pointer’s width controls visual thickness but does not automatically provide a complete accessible touch interaction.

Use normal application buttons or inputs when precise keyboard-accessible value editing is required.

## Multi-Gauge Layouts

Use application-owned CSS Grid or Flexbox containers to arrange multiple gauges.

Each gauge must have:

- A unique host element.
- Its own `LinearGauge` instance.
- A defined or inherited height.
- Sufficient space for labels and ticks.

## Stacked Gauges

### HTML

```html
<div class="gauge-stack">
  <section class="gauge-card">
    <h2>CPU Usage</h2>
    <div id="cpu-gauge"></div>
  </section>

  <section class="gauge-card">
    <h2>Memory Usage</h2>
    <div id="memory-gauge"></div>
  </section>

  <section class="gauge-card">
    <h2>Storage Usage</h2>
    <div id="storage-gauge"></div>
  </section>
</div>
```

### CSS

```css
.gauge-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.gauge-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: #ffffff;
}

.gauge-card h2 {
  margin: 0 0 8px;
  font-size: 18px;
}

#cpu-gauge,
#memory-gauge,
#storage-gauge {
  width: 100%;
  height: 220px;
}
```

### TypeScript

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

function createUsageGauge(
  selector: string,
  value: number,
  color: string
): LinearGauge {
  const gauge: LinearGauge =
    new LinearGauge({
      width: '100%',
      height: '100%',
      orientation: 'Horizontal',

      axes: [
        {
          minimum: 0,
          maximum: 100,

          labelStyle: {
            format: '{value}%'
          },

          pointers: [
            {
              value: value,
              type: 'Bar',
              color: color,
              width: 15
            }
          ]
        }
      ]
    });

  gauge.appendTo(selector);
  return gauge;
}

const cpuGauge: LinearGauge =
  createUsageGauge(
    '#cpu-gauge',
    68,
    '#2563eb'
  );

const memoryGauge: LinearGauge =
  createUsageGauge(
    '#memory-gauge',
    74,
    '#7c3aed'
  );

const storageGauge: LinearGauge =
  createUsageGauge(
    '#storage-gauge',
    52,
    '#0f766e'
  );
```

## Responsive Gauge Grid

### HTML

```html
<div class="gauge-grid">
  <section class="gauge-card">
    <h2>CPU Usage</h2>
    <div id="cpu-gauge"></div>
  </section>

  <section class="gauge-card">
    <h2>Memory Usage</h2>
    <div id="memory-gauge"></div>
  </section>

  <section class="gauge-card">
    <h2>Storage Usage</h2>
    <div id="storage-gauge"></div>
  </section>
</div>
```

### CSS

```css
.gauge-grid {
  display: grid;
  grid-template-columns:
    repeat(
      auto-fit,
      minmax(min(100%, 300px), 1fr)
    );
  gap: 20px;
}

.gauge-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: #ffffff;
}

.gauge-card > div {
  width: 100%;
  height: 220px;
}

@media (min-width: 992px) {
  .gauge-card > div {
    height: 260px;
  }
}
```

The `min-width: 0` declaration allows grid items to shrink without overflowing their tracks.

## Practical Examples

## Responsive Dashboard

The following pattern observes each gauge card and refreshes its gauge when the card size changes.

### HTML

```html
<div class="dashboard-grid">
  <section class="dashboard-card">
    <h2>CPU</h2>
    <div id="dashboard-cpu"></div>
  </section>

  <section class="dashboard-card">
    <h2>Memory</h2>
    <div id="dashboard-memory"></div>
  </section>

  <section class="dashboard-card">
    <h2>Network</h2>
    <div id="dashboard-network"></div>
  </section>
</div>
```

### CSS

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.dashboard-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: #ffffff;
}

.dashboard-card > div {
  width: 100%;
  height: 210px;
}

@media (min-width: 576px) {
  .dashboard-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 992px) {
  .dashboard-grid {
    grid-template-columns:
      repeat(3, minmax(0, 1fr));
  }

  .dashboard-card > div {
    height: 250px;
  }
}
```

### TypeScript

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

interface GaugeDefinition {
  selector: string;
  value: number;
  color: string;
}

const gaugeDefinitions: GaugeDefinition[] = [
  {
    selector: '#dashboard-cpu',
    value: 68,
    color: '#2563eb'
  },
  {
    selector: '#dashboard-memory',
    value: 74,
    color: '#7c3aed'
  },
  {
    selector: '#dashboard-network',
    value: 45,
    color: '#0f766e'
  }
];

const gauges: LinearGauge[] =
  gaugeDefinitions.map(
    (
      definition: GaugeDefinition
    ): LinearGauge => {
      const gauge: LinearGauge =
        new LinearGauge({
          width: '100%',
          height: '100%',

          axes: [
            {
              minimum: 0,
              maximum: 100,

              majorTicks: {
                interval: 25
              },

              labelStyle: {
                format: '{value}%'
              },

              pointers: [
                {
                  value: definition.value,
                  type: 'Bar',
                  color: definition.color,
                  width: 14
                }
              ]
            }
          ]
        });

      gauge.appendTo(
        definition.selector
      );

      return gauge;
    }
  );

const dashboard: HTMLElement | null =
  document.querySelector(
    '.dashboard-grid'
  );

let frameId = 0;

const observer: ResizeObserver =
  new ResizeObserver((): void => {
    window.cancelAnimationFrame(frameId);

    frameId =
      window.requestAnimationFrame(
        (): void => {
          gauges.forEach(
            (gauge: LinearGauge): void => {
              gauge.refresh();
            }
          );
        }
      );
  });

if (dashboard) {
  observer.observe(dashboard);
}
```

## Fullscreen Gauge

Use the Fullscreen API on an application-owned panel.

### HTML

```html
<section
  id="fullscreen-panel"
  class="fullscreen-panel"
>
  <div class="fullscreen-toolbar">
    <h2>System Health</h2>

    <button
      id="toggle-fullscreen"
      type="button"
    >
      Enter fullscreen
    </button>
  </div>

  <div id="fullscreen-gauge"></div>
</section>
```

### CSS

```css
.fullscreen-panel {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  background: #ffffff;
}

.fullscreen-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

#fullscreen-gauge {
  width: 100%;
  height: 320px;
}

.fullscreen-panel:fullscreen {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 24px;
}

.fullscreen-panel:fullscreen
#fullscreen-gauge {
  flex: 1;
  min-height: 0;
}
```

### TypeScript

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

const panel: HTMLElement | null =
  document.getElementById(
    'fullscreen-panel'
  );

const button: HTMLButtonElement | null =
  document.querySelector<HTMLButtonElement>(
    '#toggle-fullscreen'
  );

if (!panel || !button) {
  throw new Error(
    'Fullscreen gauge elements were not found.'
  );
}

const gauge: LinearGauge =
  new LinearGauge({
    width: '100%',
    height: '100%',

    axes: [
      {
        minimum: 0,
        maximum: 100,

        pointers: [
          {
            value: 72,
            type: 'Bar',
            width: 18,
            color: '#2563eb'
          }
        ]
      }
    ]
  });

gauge.appendTo('#fullscreen-gauge');

async function toggleFullscreen():
  Promise<void> {
  if (!document.fullscreenElement) {
    await panel.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
}

button.addEventListener(
  'click',
  (): void => {
    void toggleFullscreen();
  }
);

document.addEventListener(
  'fullscreenchange',
  (): void => {
    const isFullscreen: boolean =
      document.fullscreenElement === panel;

    button.textContent = isFullscreen
      ? 'Exit fullscreen'
      : 'Enter fullscreen';

    window.requestAnimationFrame(
      (): void => {
        gauge.refresh();
      }
    );
  }
);
```

### JavaScript

```javascript
var panel =
  document.getElementById(
    'fullscreen-panel'
  );

var button =
  document.getElementById(
    'toggle-fullscreen'
  );

if (!panel || !button) {
  throw new Error(
    'Fullscreen gauge elements were not found.'
  );
}

var gauge =
  new ej.lineargauge.LinearGauge({
    width: '100%',
    height: '100%',

    axes: [
      {
        minimum: 0,
        maximum: 100,

        pointers: [
          {
            value: 72,
            type: 'Bar',
            width: 18,
            color: '#2563eb'
          }
        ]
      }
    ]
  });

gauge.appendTo('#fullscreen-gauge');

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    await panel.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
}

button.addEventListener(
  'click',
  function () {
    void toggleFullscreen();
  }
);

document.addEventListener(
  'fullscreenchange',
  function () {
    var isFullscreen =
      document.fullscreenElement === panel;

    button.textContent = isFullscreen
      ? 'Exit fullscreen'
      : 'Enter fullscreen';

    window.requestAnimationFrame(
      function () {
        gauge.refresh();
      }
    );
  }
);
```

## Vertical Linear Gauge

Vertical gauges are useful for values that naturally progress from bottom to top, such as temperature, fluid level, altitude, or capacity.

### HTML

```html
<div class="vertical-gauge-card">
  <h2>Temperature</h2>
  <div id="vertical-gauge"></div>
</div>
```

### CSS

```css
.vertical-gauge-card {
  width: min(100%, 360px);
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
  text-align: center;
}

#vertical-gauge {
  width: 100%;
  height: clamp(360px, 70vh, 650px);
}
```

### TypeScript

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

const gauge: LinearGauge =
  new LinearGauge({
    width: '100%',
    height: '100%',
    orientation: 'Vertical',

    container: {
      type: 'Thermometer',
      width: 30,
      backgroundColor: '#e2e8f0',
      border: {
        color: '#64748b',
        width: 1
      }
    },

    axes: [
      {
        minimum: -20,
        maximum: 50,
        isInversed: false,

        majorTicks: {
          interval: 10,
          position: 'Outside'
        },

        minorTicks: {
          interval: 2,
          position: 'Outside'
        },

        labelStyle: {
          format: '{value}°C',
          position: 'Outside'
        },

        ranges: [
          {
            start: -20,
            end: 10,
            color: '#2563eb',
            startWidth: 12,
            endWidth: 12
          },
          {
            start: 10,
            end: 30,
            color: '#16a34a',
            startWidth: 12,
            endWidth: 12
          },
          {
            start: 30,
            end: 50,
            color: '#dc2626',
            startWidth: 12,
            endWidth: 12
          }
        ],

        pointers: [
          {
            value: 24,
            type: 'Bar',
            width: 16,
            color: '#b91c1c',
            roundedCornerRadius: 4,
            description:
              'Current temperature is 24 degrees Celsius'
          }
        ]
      }
    ]
  });

gauge.appendTo('#vertical-gauge');
```

### JavaScript

```javascript
var gauge =
  new ej.lineargauge.LinearGauge({
    width: '100%',
    height: '100%',
    orientation: 'Vertical',

    container: {
      type: 'Thermometer',
      width: 30,
      backgroundColor: '#e2e8f0',
      border: {
        color: '#64748b',
        width: 1
      }
    },

    axes: [
      {
        minimum: -20,
        maximum: 50,
        isInversed: false,

        majorTicks: {
          interval: 10,
          position: 'Outside'
        },

        minorTicks: {
          interval: 2,
          position: 'Outside'
        },

        labelStyle: {
          format: '{value}°C',
          position: 'Outside'
        },

        ranges: [
          {
            start: -20,
            end: 10,
            color: '#2563eb',
            startWidth: 12,
            endWidth: 12
          },
          {
            start: 10,
            end: 30,
            color: '#16a34a',
            startWidth: 12,
            endWidth: 12
          },
          {
            start: 30,
            end: 50,
            color: '#dc2626',
            startWidth: 12,
            endWidth: 12
          }
        ],

        pointers: [
          {
            value: 24,
            type: 'Bar',
            width: 16,
            color: '#b91c1c',
            roundedCornerRadius: 4,
            description:
              'Current temperature is 24 degrees Celsius'
          }
        ]
      }
    ]
  });

gauge.appendTo('#vertical-gauge');
```

## Complete TypeScript Example

The following example provides:

- Responsive parent sizing
- Mobile-first CSS
- Gauge-level percentage dimensions
- Responsive labels, ticks, ranges, and pointer sizes
- ResizeObserver support
- A fullscreen action
- A live dimension display
- Proper event cleanup
- Accessible application controls

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
    Responsive Linear Gauge
  </title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 16px;
      background: #f8fafc;
      color: #111827;
      font-family:
        Arial,
        Helvetica,
        sans-serif;
    }

    main {
      width: min(100%, 1100px);
      margin: 0 auto;
    }

    h1 {
      margin: 0 0 8px;
      font-size: clamp(22px, 4vw, 32px);
    }

    .description {
      max-width: 75ch;
      margin: 0 0 16px;
      line-height: 1.5;
    }

    .gauge-card {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-width: 0;
      padding: 16px;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      background: #ffffff;
    }

    .gauge-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }

    .gauge-toolbar h2 {
      margin: 0;
      font-size: 18px;
    }

    .gauge-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .gauge-actions button {
      min-height: 42px;
      padding: 8px 14px;
      border: 2px solid #1d4ed8;
      border-radius: 6px;
      background: #ffffff;
      color: #1e3a8a;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    .gauge-actions button:hover {
      background: #dbeafe;
    }

    .gauge-actions button:focus-visible {
      outline: 3px solid #f59e0b;
      outline-offset: 2px;
    }

    .dimension-status {
      margin: 8px 0 0;
      color: #475569;
      font-size: 14px;
    }

    #gauge-container {
      width: 100%;
      height: 220px;
      min-width: 0;
    }

    @media (min-width: 576px) {
      body {
        padding: 24px;
      }

      .gauge-card {
        padding: 20px;
      }

      #gauge-container {
        height: 280px;
      }
    }

    @media (min-width: 992px) {
      #gauge-container {
        height: 340px;
      }
    }

    .gauge-card:fullscreen {
      width: 100vw;
      height: 100vh;
      padding: 24px;
      border: 0;
      border-radius: 0;
    }

    .gauge-card:fullscreen
    #gauge-container {
      flex: 1;
      min-height: 0;
      height: auto;
    }
  </style>
</head>
<body>
  <main>
    <h1>Responsive System Health Gauge</h1>

    <p class="description">
      The Linear Gauge follows its parent width
      and adjusts label, tick, range, and pointer
      dimensions at the mobile breakpoint.
    </p>

    <section
      id="gauge-card"
      class="gauge-card"
      aria-labelledby="gauge-heading"
    >
      <div class="gauge-toolbar">
        <h2 id="gauge-heading">
          System health
        </h2>

        <div
          class="gauge-actions"
          role="group"
          aria-label="Gauge display actions"
        >
          <button
            id="fullscreen-button"
            type="button"
          >
            Enter fullscreen
          </button>
        </div>
      </div>

      <div id="gauge-container"></div>

      <p
        id="dimension-status"
        class="dimension-status"
        role="status"
        aria-live="polite"
      >
        Gauge dimensions are being measured.
      </p>
    </section>
  </main>
</body>
</html>
```

### index.ts

```typescript
import {
  LinearGauge,
  AxisModel
} from '@syncfusion/ej2-lineargauge';

const currentHealth: number = 65;

const gaugeHost: HTMLElement | null =
  document.getElementById(
    'gauge-container'
  );

const gaugeCard: HTMLElement | null =
  document.getElementById(
    'gauge-card'
  );

const dimensionStatus:
  HTMLElement | null =
    document.getElementById(
      'dimension-status'
    );

const fullscreenButton:
  HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>(
      '#fullscreen-button'
    );

if (
  !gaugeHost ||
  !gaugeCard ||
  !dimensionStatus ||
  !fullscreenButton
) {
  throw new Error(
    'One or more required gauge elements were not found.'
  );
}

const compactQuery: MediaQueryList =
  window.matchMedia(
    '(max-width: 575px)'
  );

function createAxis(
  compact: boolean
): AxisModel {
  const rangeWidth: number =
    compact ? 10 : 16;

  return {
    minimum: 0,
    maximum: 100,
    showLastLabel: true,

    line: {
      color: '#475569',
      width: compact ? 1 : 2
    },

    majorTicks: {
      interval: compact ? 25 : 20,
      position: 'Outside',
      color: '#334155',
      height: compact ? 7 : 12,
      width: 2,
      offset: 4
    },

    minorTicks: {
      interval: 5,
      position: 'Outside',
      color: '#64748b',
      height: compact ? 4 : 7,
      width: 1,
      offset: 4
    },

    labelStyle: {
      format: '{value}%',
      position: 'Outside',
      offset: compact ? 6 : 10,

      font: {
        fontFamily: 'Arial',
        size: compact
          ? '10px'
          : '14px',
        color: '#334155',
        fontWeight: '500'
      }
    },

    ranges: [
      {
        start: 0,
        end: 40,
        color: '#16a34a',
        position: 'Inside',
        startWidth: rangeWidth,
        endWidth: rangeWidth
      },
      {
        start: 40,
        end: 70,
        color: '#ca8a04',
        position: 'Inside',
        startWidth: rangeWidth,
        endWidth: rangeWidth
      },
      {
        start: 70,
        end: 100,
        color: '#dc2626',
        position: 'Inside',
        startWidth: rangeWidth,
        endWidth: rangeWidth
      }
    ],

    pointers: [
      {
        value: currentHealth,
        type: 'Bar',
        color: '#1e293b',
        width: compact ? 10 : 16,
        position: 'Cross',
        roundedCornerRadius: 4,
        animationDuration: 800,
        description:
          'System health is 65 percent'
      },
      {
        value: currentHealth,
        type: 'Marker',
        markerType: 'InvertedTriangle',
        color: '#111827',
        height: compact ? 14 : 20,
        width: compact ? 14 : 20,
        position: 'Outside',
        placement: 'Near',
        offset: compact ? 5 : 8,
        description:
          'Current system-health marker'
      }
    ]
  };
}

const gauge: LinearGauge =
  new LinearGauge({
    width: '100%',
    height: '100%',
    orientation: 'Horizontal',
    background: '#ffffff',

    title: 'Current System Health',

    titleStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: compactQuery.matches
        ? '15px'
        : '19px',
      fontWeight: '700'
    },

    margin: {
      left: compactQuery.matches
        ? 10
        : 30,
      right: compactQuery.matches
        ? 10
        : 30,
      top: compactQuery.matches
        ? 15
        : 25,
      bottom: compactQuery.matches
        ? 15
        : 25
    },

    container: {
      type: 'RoundedRectangle',
      width: compactQuery.matches
        ? 20
        : 30,
      height: 0,
      backgroundColor: '#e2e8f0',
      roundedCornerRadius: 8,
      border: {
        color: '#94a3b8',
        width: 1
      }
    },

    axes: [
      createAxis(
        compactQuery.matches
      )
    ]
  });

gauge.appendTo(gaugeHost);

function updateDimensionStatus(): void {
  const bounds: DOMRect =
    gaugeHost.getBoundingClientRect();

  dimensionStatus.textContent =
    `Gauge area: ${Math.round(
      bounds.width
    )} by ${Math.round(
      bounds.height
    )} pixels.`;
}

function applyResponsiveSettings(
  compact: boolean
): void {
  gauge.titleStyle.size =
    compact ? '15px' : '19px';

  gauge.margin.left =
    compact ? 10 : 30;

  gauge.margin.right =
    compact ? 10 : 30;

  gauge.margin.top =
    compact ? 15 : 25;

  gauge.margin.bottom =
    compact ? 15 : 25;

  gauge.container.width =
    compact ? 20 : 30;

  gauge.axes = [
    createAxis(compact)
  ];

  gauge.refresh();
  updateDimensionStatus();
}

function handleBreakpointChange(
  event: MediaQueryListEvent
): void {
  applyResponsiveSettings(
    event.matches
  );
}

compactQuery.addEventListener(
  'change',
  handleBreakpointChange
);

let resizeFrameId = 0;

const resizeObserver: ResizeObserver =
  new ResizeObserver((): void => {
    window.cancelAnimationFrame(
      resizeFrameId
    );

    resizeFrameId =
      window.requestAnimationFrame(
        (): void => {
          gauge.refresh();
          updateDimensionStatus();
        }
      );
  });

resizeObserver.observe(gaugeHost);

async function toggleFullscreen():
  Promise<void> {
  if (
    document.fullscreenElement !== gaugeCard
  ) {
    await gaugeCard.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
}

fullscreenButton.addEventListener(
  'click',
  (): void => {
    void toggleFullscreen();
  }
);

function handleFullscreenChange(): void {
  const isFullscreen: boolean =
    document.fullscreenElement === gaugeCard;

  fullscreenButton.textContent =
    isFullscreen
      ? 'Exit fullscreen'
      : 'Enter fullscreen';

  window.requestAnimationFrame(
    (): void => {
      gauge.refresh();
      updateDimensionStatus();
    }
  );
}

document.addEventListener(
  'fullscreenchange',
  handleFullscreenChange
);

function cleanUp(): void {
  resizeObserver.disconnect();

  window.cancelAnimationFrame(
    resizeFrameId
  );

  compactQuery.removeEventListener(
    'change',
    handleBreakpointChange
  );

  document.removeEventListener(
    'fullscreenchange',
    handleFullscreenChange
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

updateDimensionStatus();
```

## Complete JavaScript Example

Use the same `index.html` from the complete TypeScript example.

Ensure that the required EJ2 Linear Gauge scripts are loaded before `index.js`.

### index.js

```javascript
var currentHealth = 65;

var gaugeHost =
  document.getElementById(
    'gauge-container'
  );

var gaugeCard =
  document.getElementById(
    'gauge-card'
  );

var dimensionStatus =
  document.getElementById(
    'dimension-status'
  );

var fullscreenButton =
  document.getElementById(
    'fullscreen-button'
  );

if (
  !gaugeHost ||
  !gaugeCard ||
  !dimensionStatus ||
  !fullscreenButton
) {
  throw new Error(
    'One or more required gauge elements were not found.'
  );
}

var compactQuery =
  window.matchMedia(
    '(max-width: 575px)'
  );

function createAxis(compact) {
  var rangeWidth =
    compact ? 10 : 16;

  return {
    minimum: 0,
    maximum: 100,
    showLastLabel: true,

    line: {
      color: '#475569',
      width: compact ? 1 : 2
    },

    majorTicks: {
      interval: compact ? 25 : 20,
      position: 'Outside',
      color: '#334155',
      height: compact ? 7 : 12,
      width: 2,
      offset: 4
    },

    minorTicks: {
      interval: 5,
      position: 'Outside',
      color: '#64748b',
      height: compact ? 4 : 7,
      width: 1,
      offset: 4
    },

    labelStyle: {
      format: '{value}%',
      position: 'Outside',
      offset: compact ? 6 : 10,

      font: {
        fontFamily: 'Arial',
        size: compact
          ? '10px'
          : '14px',
        color: '#334155',
        fontWeight: '500'
      }
    },

    ranges: [
      {
        start: 0,
        end: 40,
        color: '#16a34a',
        position: 'Inside',
        startWidth: rangeWidth,
        endWidth: rangeWidth
      },
      {
        start: 40,
        end: 70,
        color: '#ca8a04',
        position: 'Inside',
        startWidth: rangeWidth,
        endWidth: rangeWidth
      },
      {
        start: 70,
        end: 100,
        color: '#dc2626',
        position: 'Inside',
        startWidth: rangeWidth,
        endWidth: rangeWidth
      }
    ],

    pointers: [
      {
        value: currentHealth,
        type: 'Bar',
        color: '#1e293b',
        width: compact ? 10 : 16,
        position: 'Cross',
        roundedCornerRadius: 4,
        animationDuration: 800,
        description:
          'System health is 65 percent'
      },
      {
        value: currentHealth,
        type: 'Marker',
        markerType: 'InvertedTriangle',
        color: '#111827',
        height: compact ? 14 : 20,
        width: compact ? 14 : 20,
        position: 'Outside',
        placement: 'Near',
        offset: compact ? 5 : 8,
        description:
          'Current system-health marker'
      }
    ]
  };
}

var gauge =
  new ej.lineargauge.LinearGauge({
    width: '100%',
    height: '100%',
    orientation: 'Horizontal',
    background: '#ffffff',

    title: 'Current System Health',

    titleStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: compactQuery.matches
        ? '15px'
        : '19px',
      fontWeight: '700'
    },

    margin: {
      left: compactQuery.matches
        ? 10
        : 30,
      right: compactQuery.matches
        ? 10
        : 30,
      top: compactQuery.matches
        ? 15
        : 25,
      bottom: compactQuery.matches
        ? 15
        : 25
    },

    container: {
      type: 'RoundedRectangle',
      width: compactQuery.matches
        ? 20
        : 30,
      height: 0,
      backgroundColor: '#e2e8f0',
      roundedCornerRadius: 8,
      border: {
        color: '#94a3b8',
        width: 1
      }
    },

    axes: [
      createAxis(
        compactQuery.matches
      )
    ]
  });

gauge.appendTo(gaugeHost);

function updateDimensionStatus() {
  var bounds =
    gaugeHost.getBoundingClientRect();

  dimensionStatus.textContent =
    'Gauge area: ' +
    Math.round(bounds.width) +
    ' by ' +
    Math.round(bounds.height) +
    ' pixels.';
}

function applyResponsiveSettings(
  compact
) {
  gauge.titleStyle.size =
    compact ? '15px' : '19px';

  gauge.margin.left =
    compact ? 10 : 30;

  gauge.margin.right =
    compact ? 10 : 30;

  gauge.margin.top =
    compact ? 15 : 25;

  gauge.margin.bottom =
    compact ? 15 : 25;

  gauge.container.width =
    compact ? 20 : 30;

  gauge.axes = [
    createAxis(compact)
  ];

  gauge.refresh();
  updateDimensionStatus();
}

function handleBreakpointChange(event) {
  applyResponsiveSettings(
    event.matches
  );
}

compactQuery.addEventListener(
  'change',
  handleBreakpointChange
);

var resizeFrameId = 0;

var resizeObserver =
  new ResizeObserver(function () {
    window.cancelAnimationFrame(
      resizeFrameId
    );

    resizeFrameId =
      window.requestAnimationFrame(
        function () {
          gauge.refresh();
          updateDimensionStatus();
        }
      );
  });

resizeObserver.observe(gaugeHost);

async function toggleFullscreen() {
  if (
    document.fullscreenElement !== gaugeCard
  ) {
    await gaugeCard.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
}

fullscreenButton.addEventListener(
  'click',
  function () {
    void toggleFullscreen();
  }
);

function handleFullscreenChange() {
  var isFullscreen =
    document.fullscreenElement ===
    gaugeCard;

  fullscreenButton.textContent =
    isFullscreen
      ? 'Exit fullscreen'
      : 'Enter fullscreen';

  window.requestAnimationFrame(
    function () {
      gauge.refresh();
      updateDimensionStatus();
    }
  );
}

document.addEventListener(
  'fullscreenchange',
  handleFullscreenChange
);

function cleanUp() {
  resizeObserver.disconnect();

  window.cancelAnimationFrame(
    resizeFrameId
  );

  compactQuery.removeEventListener(
    'change',
    handleBreakpointChange
  );

  document.removeEventListener(
    'fullscreenchange',
    handleFullscreenChange
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

updateDimensionStatus();
```

## Best Practices

### Use Gauge-Level Width and Height

Use the top-level properties for the full component.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '300px'
});
```

Do not use internal container dimensions for responsive component sizing.

```typescript
// Not intended to size the complete component.
container: {
  width: 100,
  height: 300
}
```

### Prefer Responsive Parent Layouts

Use CSS Grid or Flexbox for the dashboard layout.

```css
.gauge-grid {
  display: grid;
  grid-template-columns:
    repeat(
      auto-fit,
      minmax(min(100%, 300px), 1fr)
    );
  gap: 20px;
}
```

Let the gauge match its host.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '100%'
});
```

### Define the Parent Height

Percentage gauge height requires a resolved parent height.

```css
.gauge-host {
  height: 300px;
}
```

```typescript
const gauge: LinearGauge = new LinearGauge({
  height: '100%'
});
```

### Use ResizeObserver for Container Changes

A window resize event does not detect every layout change. Use `ResizeObserver` when parent containers can resize independently.

```typescript
const observer: ResizeObserver =
  new ResizeObserver((): void => {
    gauge.refresh();
  });

observer.observe(gaugeHost);
```

### Throttle Frequent Refreshes

Use `requestAnimationFrame` or a debounce timer.

```typescript
let frameId = 0;

const observer: ResizeObserver =
  new ResizeObserver((): void => {
    window.cancelAnimationFrame(frameId);

    frameId =
      window.requestAnimationFrame(
        (): void => {
          gauge.refresh();
        }
      );
  });
```

### Avoid User-Agent Detection

Avoid:

```typescript
const isMobile: boolean =
  /Android|iPhone|iPad/i.test(
    navigator.userAgent
  );
```

Prefer media queries.

```typescript
const compact: boolean =
  window.matchMedia(
    '(max-width: 575px)'
  ).matches;
```

Media queries respond to available layout space rather than assuming capabilities from the device name.

### Keep Mobile Labels Concise

```typescript
labelStyle: {
  format: '{value}%',
  font: {
    size: '10px'
  }
}
```

Increase the major-tick interval when labels overlap.

```typescript
majorTicks: {
  interval: 25
}
```

### Use Responsive CSS Instead of JavaScript Where Possible

Use CSS for:

- Grid columns
- Card width
- Host height
- Spacing
- Fullscreen layout
- Stacking behavior

Use JavaScript only when internal gauge properties such as label size, tick interval, or pointer width must change.

### Destroy Unused Gauge Instances

```typescript
resizeObserver.disconnect();
gauge.destroy();
```

Also remove event listeners created by the application.

## Troubleshooting

### Gauge Does Not Fill the Parent Width

Set the gauge width to `100%`.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%'
});
```

Ensure the parent has a usable width.

```css
.gauge-card {
  width: 100%;
}

#gauge-container {
  width: 100%;
}
```

In a CSS Grid or Flexbox layout, add `min-width: 0` to the item.

```css
.gauge-card {
  min-width: 0;
}
```

### Percentage Height Does Not Work

Define the parent height.

```css
.gauge-card {
  height: 400px;
}

#gauge-container {
  height: 100%;
}
```

Then configure the gauge.

```typescript
const gauge: LinearGauge = new LinearGauge({
  height: '100%'
});
```

A percentage height cannot resolve reliably when the parent height is `auto`.

### Gauge Does Not Resize After a Sidebar Changes

Observe the gauge host or dashboard panel.

```typescript
const observer: ResizeObserver =
  new ResizeObserver((): void => {
    gauge.refresh();
  });

observer.observe(gaugeHost);
```

A `window.resize` listener may not run when only an internal page panel changes size.

### Gauge Is Clipped on Mobile

Avoid fixed desktop widths.

```typescript
// Avoid on small screens.
width: '700px'
```

Use:

```typescript
width: '100%'
```

Also check the host for:

- Fixed width
- Large minimum width
- Excessive padding
- Hidden overflow
- Grid tracks that cannot shrink

### Labels Overlap on Small Screens

Reduce label size.

```typescript
labelStyle: {
  font: {
    size: '10px'
  }
}
```

Increase the major-tick interval.

```typescript
majorTicks: {
  interval: 25
}
```

Reduce minor-tick density.

```typescript
minorTicks: {
  interval: 5
}
```

Increase the host height if more vertical space is required.

### Pointer Is Too Small for Touch

Use a larger marker.

```typescript
pointers: [
  {
    value: 65,
    type: 'Marker',
    markerType: 'Circle',
    height: 28,
    width: 28,
    enableDrag: true
  }
]
```

For precise accessible input, provide an accompanying native range input or numeric control.

### Gauge Looks Distorted After Fullscreen Change

Refresh the gauge after the `fullscreenchange` event.

```typescript
document.addEventListener(
  'fullscreenchange',
  (): void => {
    window.requestAnimationFrame(
      (): void => {
        gauge.refresh();
      }
    );
  }
);
```

### Multiple Gauges Render in the Same Element

Each gauge requires a unique host.

```html
<div id="cpu-gauge"></div>
<div id="memory-gauge"></div>
```

Create separate instances.

```typescript
const cpuGauge: LinearGauge =
  new LinearGauge({
    width: '100%',
    height: '100%'
  });

cpuGauge.appendTo('#cpu-gauge');

const memoryGauge: LinearGauge =
  new LinearGauge({
    width: '100%',
    height: '100%'
  });

memoryGauge.appendTo(
  '#memory-gauge'
);
```

### Resize Handling Causes Poor Performance

Do not call `refresh()` repeatedly without throttling.

Use `requestAnimationFrame`.

```typescript
let frameId = 0;

const observer: ResizeObserver =
  new ResizeObserver((): void => {
    window.cancelAnimationFrame(frameId);

    frameId =
      window.requestAnimationFrame(
        (): void => gauge.refresh()
      );
  });
```

### Resize Listener Is Not Removed

Store the callback in a variable.

```typescript
function handleResize(): void {
  gauge.refresh();
}

window.addEventListener(
  'resize',
  handleResize
);

window.removeEventListener(
  'resize',
  handleResize
);
```

Do not create separate anonymous callback functions for registration and removal.

### Internal Container Dimensions Cause Type Errors

Use numbers for the internal container.

```typescript
container: {
  width: 30,
  height: 200
}
```

Do not use CSS dimension strings.

```typescript
// Incorrect for numeric container properties.
container: {
  width: '100%',
  height: '200px'
}
```

Use the gauge-level properties instead.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '200px'
});
```

### Vertical Gauge Is Too Short

Provide a taller host for vertical orientation.

```css
#vertical-gauge {
  width: 100%;
  height: clamp(360px, 70vh, 650px);
}
```

Configure the gauge to fill the host.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '100%',
  orientation: 'Vertical'
});
```

### Gauge Is Not Visible

Confirm that:

1. The target element exists.
2. The target has a nonzero width and height.
3. The gauge is appended after the target is available.
4. The package or required global script is loaded.
5. No earlier JavaScript error stopped initialization.

```html
<div id="gauge-container"></div>
```

```css
#gauge-container {
  width: 100%;
  height: 300px;
}
```

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '100%'
});

gauge.appendTo('#gauge-container');
```