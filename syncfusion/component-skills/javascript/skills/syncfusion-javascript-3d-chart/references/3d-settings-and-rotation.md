# 3D Settings & Rotation

## Table of Contents

- [3D Chart Initialization](#3d-chart-initialization)
  - [Basic 3D Chart](#basic-3d-chart)
  - [Chart Dimensions](#chart-dimensions)
  - [Wall Color](#wall-color)
- [Rotation Configuration](#rotation-configuration)
  - [Rotation Angle](#rotation-angle)
  - [Tilt Angle](#tilt-angle)
  - [Interactive Rotation](#interactive-rotation)
- [Depth and Perspective](#depth-and-perspective)
  - [Depth Configuration](#depth-configuration)
  - [Balanced Perspective](#balanced-perspective)
- [Programmatic View Updates](#programmatic-view-updates)
  - [Update Rotation and Tilt](#update-rotation-and-tilt)
  - [Reset the Chart View](#reset-the-chart-view)
  - [Preset View Controls](#preset-view-controls)
- [User Interaction](#user-interaction)
  - [Mouse and Touch Rotation](#mouse-and-touch-rotation)
  - [Accessible View Controls](#accessible-view-controls)
- [Practical Examples](#practical-examples)
  - [Interactive 3D Column Chart](#interactive-3d-column-chart)
  - [Enhanced 3D Perspective](#enhanced-3d-perspective)
  - [Subtle Static 3D Chart](#subtle-static-3d-chart)
  - [Dynamic View Reset](#dynamic-view-reset)
  - [Multi-Series 3D Chart](#multi-series-3d-chart)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
  - [Chart Is Not Displayed](#chart-is-not-displayed)
  - [Chart Does Not Look Three-Dimensional](#chart-does-not-look-three-dimensional)
  - [Interactive Rotation Is Not Working](#interactive-rotation-is-not-working)
  - [Programmatic Rotation Is Not Updating](#programmatic-rotation-is-not-updating)
  - [Chart Appears Distorted](#chart-appears-distorted)
  - [Labels Are Hidden After Rotation](#labels-are-hidden-after-rotation)
  - [Reset Button Is Not Working](#reset-button-is-not-working)
  - [Touch Rotation Interferes with Page Scrolling](#touch-rotation-interferes-with-page-scrolling)
- [Next Steps](#next-steps)


Learn how to configure the rotation, tilt, depth, dimensions, wall color, and interactive view of the EJ2 3D Chart.

The EJ2 JavaScript 3D Chart supports rotation, tilt, depth, responsive layouts, and interactive exploration.

## 3D Chart Initialization
## 3D Chart Initialization

The EJ2 3D Chart is created using the `Chart3D` class. The module required by each configured series type and axis type must be injected before creating the chart.

For a 3D Column Chart with a Category axis:

- Import and inject `ColumnSeries3D`.
- Import and inject `Category3D`.
- Map the data fields through `xName` and `yName`.
- Call `appendTo` after creating the chart instance.

### Basic 3D Chart

**TypeScript:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D
);

interface SalesData {
  month: string;
  sales: number;
}

const chartData: SalesData[] = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 }
];

const chart: Chart3D = new Chart3D({
  title: 'Monthly Sales',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 50,
    interval: 10,
    title: 'Sales'
  },
  wallColor: 'transparent',
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

**JavaScript:**

```javascript
ej.charts.Chart3D.Inject(
  ej.charts.ColumnSeries3D,
  ej.charts.Category3D
);

var chartData = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 }
];

var chart = new ej.charts.Chart3D({
  title: 'Monthly Sales',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 50,
    interval: 10,
    title: 'Sales'
  },
  wallColor: 'transparent',
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

### Chart Dimensions

The chart requires a container with a valid width and height.

```html
<div id="chart"></div>
```

```css
#chart {
  width: 100%;
  min-height: 450px;
}
```

The chart can also be given explicit dimensions through its `width` and `height` properties.

```typescript
const chart: Chart3D = new Chart3D({
  width: '100%',
  height: '450px',
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Use percentage-based width and a stable height for responsive layouts.

### Wall Color

Use `wallColor` to customize the walls of the 3D plotting area.

```typescript
const chart: Chart3D = new Chart3D({
  wallColor: '#F1F3F5',
  primaryXAxis: {
    valueType: 'Category'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Use `transparent` when a neutral wall appearance is required.

```typescript
const chart: Chart3D = new Chart3D({
  wallColor: 'transparent',
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

## Rotation Configuration

The 3D Chart view is controlled by:

- `rotation`
- `tilt`
- `depth`
- `enableRotation`

The Syncfusion 3D Chart supports interactive rotation and tilt for exploring chart data from different perspectives.

### Rotation Angle

The `rotation` property controls the horizontal viewing angle.

```typescript
const chart: Chart3D = new Chart3D({
  rotation: 7,
  tilt: 10,
  depth: 100,
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Common starting values include:

- `0`: A direct view with no initial horizontal rotation.
- `7`: A slight rotation that exposes the 3D depth.
- `15`: A moderate horizontal perspective.
- `22`: A stronger perspective.
- `45`: A pronounced diagonal view.
- `90`: A side-oriented view that can reduce value readability.

Use moderate rotation values for data comparison. Extreme values can cause columns, labels, or axes to overlap visually.

### Tilt Angle

The `tilt` property controls the vertical viewing angle.

```typescript
const chart: Chart3D = new Chart3D({
  rotation: 7,
  tilt: 10,
  depth: 100,
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Common starting values include:

- `0`: No initial vertical tilt.
- `5`: A subtle tilt.
- `10`: A balanced top-down view.
- `15`: A more pronounced perspective.
- `30`: A strong top-down view.

Negative tilt values can produce a bottom-up viewing angle. Use them carefully because axes and data points can become difficult to compare.

### Interactive Rotation

Set `enableRotation` to `true` to allow users to rotate the chart through supported pointer or touch interaction.

```typescript
const chart: Chart3D = new Chart3D({
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

When interactive rotation is not required, set `enableRotation` to `false`.

```typescript
const chart: Chart3D = new Chart3D({
  enableRotation: false,
  rotation: 7,
  tilt: 10,
  depth: 100,
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

The `rotation` and `tilt` properties define the initial view. Enabling interactive rotation allows the user to change that view after the chart is rendered.

## Depth and Perspective

The `depth` property controls the apparent depth of the 3D plotting area.

Depth works together with `rotation` and `tilt` to determine how strongly the chart appears three-dimensional.

### Depth Configuration

```typescript
const chart: Chart3D = new Chart3D({
  rotation: 15,
  tilt: 10,
  depth: 120,
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Typical depth ranges include:

- `50` to `80`: A subtle 3D effect.
- `90` to `120`: A balanced 3D perspective.
- `130` to `180`: A pronounced 3D effect.
- Values above `200`: A strong effect that may reduce readability.

The most appropriate value depends on:

- Chart dimensions.
- Number of categories.
- Number of series.
- Rotation angle.
- Tilt angle.
- Label size.
- Legend position.
- Data-label visibility.

### Balanced Perspective

The following configuration provides a balanced default view:

```typescript
const chart: Chart3D = new Chart3D({
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

For stronger depth without excessive distortion:

```typescript
const chart: Chart3D = new Chart3D({
  enableRotation: true,
  rotation: 15,
  tilt: 12,
  depth: 130,
  wallColor: '#F5F5F5',
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Avoid combining a very high depth with extreme rotation and tilt values.

## Programmatic View Updates

The `rotation`, `tilt`, and `depth` properties can be updated after the chart is created.

Call `refresh()` after assigning the updated values.

### Update Rotation and Tilt

**TypeScript:**

```typescript
chart.rotation = 45;
chart.tilt = 15;
chart.depth = 120;
chart.refresh();
```

**JavaScript:**

```javascript
chart.rotation = 45;
chart.tilt = 15;
chart.depth = 120;
chart.refresh();
```

Apply all view changes before calling `refresh()` so that the chart rerenders only once.

```typescript
function updateChartView(
  rotation: number,
  tilt: number,
  depth: number
): void {
  chart.rotation = rotation;
  chart.tilt = tilt;
  chart.depth = depth;
  chart.refresh();
}

updateChartView(22, 15, 130);
```

### Reset the Chart View

Store the default settings in constants and reuse them for chart initialization and reset behavior.

```typescript
const defaultRotation: number = 7;
const defaultTilt: number = 10;
const defaultDepth: number = 100;

const chart: Chart3D = new Chart3D({
  enableRotation: true,
  rotation: defaultRotation,
  tilt: defaultTilt,
  depth: defaultDepth,
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');

const resetButton: HTMLButtonElement | null =
  document.getElementById(
    'reset-view'
  ) as HTMLButtonElement | null;

resetButton?.addEventListener('click', () => {
  chart.rotation = defaultRotation;
  chart.tilt = defaultTilt;
  chart.depth = defaultDepth;
  chart.refresh();
});
```

Use a native button for the reset action:

```html
<button id="reset-view" type="button">
  Reset 3D view
</button>
```

### Preset View Controls

Applications can provide preset view buttons for users who cannot or do not want to rotate the chart through dragging.

```html
<div
  class="view-controls"
  role="group"
  aria-label="3D chart view controls"
>
  <button id="front-view" type="button">
    Front view
  </button>

  <button id="perspective-view" type="button">
    Perspective view
  </button>

  <button id="top-view" type="button">
    Top view
  </button>

  <button id="reset-view" type="button">
    Reset view
  </button>
</div>
```

```typescript
interface ViewPreset {
  rotation: number;
  tilt: number;
  depth: number;
}

const viewPresets: Record<string, ViewPreset> = {
  'front-view': {
    rotation: 0,
    tilt: 0,
    depth: 80
  },
  'perspective-view': {
    rotation: 15,
    tilt: 10,
    depth: 120
  },
  'top-view': {
    rotation: 7,
    tilt: 30,
    depth: 100
  },
  'reset-view': {
    rotation: 7,
    tilt: 10,
    depth: 100
  }
};

Object.entries(viewPresets).forEach(
  ([[
Source: chartData,
Name: 'month',
Name: 'sales',
: 'Column'
To('#chart');

Button: HTMLButtonElement | null =
.getElementById(
reset-view'
 as HTMLButtonElement | null;

?.addEventListener('click', ()tener('click', () => {
      chart.rotation = preset.rotation;
      chart.tilt = preset.tilt;
      chart.depth = preset.depth;
      chart.refresh();
    });
  }
);
```

## User Interaction

Interactive rotation helps users inspect overlapping points and understand the spatial arrangement of multiple series.

However, rotation should supplement the chart rather than become the only way to understand it.

### Mouse and Touch Rotation

Enable interactive rotation with `enableRotation`.

```typescript
const chart: Chart3D = new Chart3D({
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Ensure that:

- The chart container is not covered by another element.
- CSS does not apply `pointer-events: none`.
- The chart has sufficient width and height.
- The page does not prevent the required pointer or touch events.
- The user can reset the chart to a predictable view.
- Labels remain readable after rotation.

### Accessible View Controls

Drag-based rotation may not be convenient for every user. Provide native buttons for common views when interactive rotation is an important part of the experience.

```html
<section aria-labelledby="chart-heading">
  <h2 id="chart-heading">
    Monthly Sales
  </h2>

  <p id="chart-description">
    Use the view controls to change the perspective of the
    three-dimensional sales chart.
  </p>

  <div
    id="chart"
    role="region"
    aria-label="Three-dimensional monthly sales chart"
    aria-describedby="chart-description"
  ></div>

  <div
    class="view-controls"
    role="group"
    aria-label="Chart view controls"
  >
    <button id="rotate-left" type="button">
      Rotate left
    </button>

    <button id="rotate-right" type="button">
      Rotate right
    </button>

    <button id="tilt-up" type="button">
      Tilt up
    </button>

    <button id="tilt-down" type="button">
      Tilt down
    </button>

    <button id="reset-view" type="button">
      Reset view
    </button>
  </div>
</section>
```

```typescript
const rotationStep: number = 5;
const tiltStep: number = 5;

const rotateLeftButton: HTMLButtonElement | null =
  document.getElementById(
    'rotate-left'
  ) as HTMLButtonElement | null;

const rotateRightButton: HTMLButtonElement | null =
  document.getElementById(
    'rotate-right'
  ) as HTMLButtonElement | null;

const tiltUpButton: HTMLButtonElement | null =
  document.getElementById(
    'tilt-up'
  ) as HTMLButtonElement | null;

const tiltDownButton: HTMLButtonElement | null =
  document.getElementById(
    'tilt-down'
  ) as HTMLButtonElement | null;

const resetButton: HTMLButtonElement | null =
  document.getElementById(
    'reset-view'
  ) as HTMLButtonElement | null;

rotateLeftButton?.addEventListener('click', () => {
  chart.rotation -= rotationStep;
  chart.refresh();
});

rotateRightButton?.addEventListener('click', () => {
  chart.rotation += rotationStep;
  chart.refresh();
});

tiltUpButton?.addEventListener('click', () => {
  chart.tilt += tiltStep;
  chart.refresh();
});

tiltDownButton?.addEventListener('click', () => {
  chart.tilt -= tiltStep;
  chart.refresh();
});

resetButton?.addEventListener('click', () => {
  chart.rotation = 7;
  chart.tilt = 10;
  chart.depth = 100;
  chart.refresh();
});
```

Programmatic controls should use reasonable limits to prevent unreadable views.

```typescript
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

rotateRightButton?.addEventListener('click', () => {
  chart.rotation = clamp(
    chart.rotation + rotationStep,
    -180,
    180
  );

  chart.refresh();
});

tiltUpButton?.addEventListener('click', () => {
  chart.tilt = clamp(
    chart.tilt + tiltStep,
    -45,
    45
  );

  chart.refresh();
});
```

## Practical Examples

### Interactive 3D Column Chart

The following complete TypeScript example includes interactive rotation, tooltip support, data labels, and accessible view controls.

**index.ts:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  DataLabel3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  DataLabel3D,
  Tooltip3D
);

interface SalesData {
  month: string;
  sales: number;
}

const chart[
Source: chartData,
Name: 'month',
Name: 'sales',
: 'Column'
To('#chart')es: 28 },
  { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 }
];

const defaultRotation: number = 7;
const defaultTilt: number = 10;
const defaultDepth: number = 100;
const rotationStep: number = 5;
const tiltStep: number = 5;

const chart: Chart3D = new Chart3D({
  title: 'Sales Data in 3D',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 50,
    interval: 10,
    title: 'Sales'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${point.x}</b><br>' +
      'Sales: ${point.y}'
  },
  enableRotation: true,
  rotation: defaultRotation,
  tilt: defaultTilt,
  depth: defaultDepth,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      dataLabel: {
        visible: true,
        position: 'Top'
      }
    }
  ]
});

chart.appendTo('#chart');

const rotationValue: HTMLElement | null =
  document.getElementById('rotation-value');

const tiltValue: HTMLElement | null =
  document.getElementById('tilt-value');

function updateViewStatus(): void {
  if (rotationValue) {
    rotationValue.textContent =
      String(chart.rotation);
  }

  if (tiltValue) {
    tiltValue.textContent =
      String(chart.tilt);
  }
}

function refreshChartView(): void {
  chart.refresh();
  updateViewStatus();
}

const rotateLeftButton: HTMLButtonElement | null =
  document.getElementById(
    'rotate-left'
  ) as HTMLButtonElement | null;

const rotateRightButton: HTMLButtonElement | null =
  document.getElementById(
    'rotate-right'
  ) as HTMLButtonElement | null;

const tiltUpButton: HTMLButtonElement | null =
  document.getElementById(
    'tilt-up'
  ) as HTMLButtonElement | null;

const tiltDownButton: HTMLButtonElement | null =
  document.getElementById(
    'tilt-down'
  ) as HTMLButtonElement | null;

const resetButton: HTMLButtonElement | null =
  document.getElementById(
    'reset-view'
  ) as HTMLButtonElement | null;

rotateLeftButton?.addEventListener('click', () => {
  chart.rotation -= rotationStep;
  refreshChartView();
});

rotateRightButton?.addEventListener('click', () => {
  chart.rotation += rotationStep;
  refreshChartView();
});

tiltUpButton?.addEventListener('click', () => {
  chart.tilt += tiltStep;
  refreshChartView();
});

tiltDownButton?.addEventListener('click', () => {
  chart.tilt -= tiltStep;
  refreshChartView();
});

resetButton?.addEventListener('click', () => {
  chart.rotation = defaultRotation;
  chart.tilt = defaultTilt;
  chart.depth = defaultDepth;
  refreshChartView();
});

updateViewStatus();

window.addEventListener('beforeunload', () => {
  chart.destroy();
});
```

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >
  <title>Interactive 3D Chart</title>
</head>
<body>
  <main>
    <section aria-labelledby="chart-heading">
      <h1 id="chart-heading">
        Sales Data in 3D
      </h1>

      <p id="chart-description">
        Rotate or tilt the chart using pointer interaction or
        the provided view controls.
      </p>

      <div
        id="chart"
        role="region"
        aria-label="Three-dimensional monthly sales chart"
        aria-describedby="chart-description"
      ></div>

      <div
        class="view-controls"
        role="group"
        aria-label="3D chart view controls"
      >
        <button id="rotate-left" type="button">
          Rotate left
        </button>

        <button id="rotate-right" type="button">
          Rotate right
        </button>

        <button id="tilt-up" type="button">
          Tilt up
        </button>

        <button id="tilt-down" type="button">
          Tilt down
        </button>

        <button id="reset-view" type="button">
          Reset view
        </button>
      </div>

      <p aria-live="polite">
        Rotation:
        <span id="rotation-value">7</span>
        degrees. Tilt:
        <span id="tilt-value">10</span>
        degrees.
      </p>
    </section>
  </main>
<script src="index.js"></script>
</body>
</html>
```

**styles.css:**

```css
#chart {
  width: 100%;
  min-height: 450px;
}

.view-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.view-controls button {
  min-height: 40px;
  padding: 8px 16px;
}

.view-controls button:focus-visible {
  outline: 3px solid #0F6CBD;
  outline-offset: 2px;
}
```

### Enhanced 3D Perspective

Use moderate rotation, tilt, and depth values to make the 3D structure prominent without excessively distorting the data.

```typescript
const chart: Chart3D = new Chart3D({
  title: 'Enhanced 3D Perspective',
  enableRotation: true,
  rotation: 22,
  tilt: 15,
  depth: 150,
  wallColor: '#F3F4F6',
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Subtle Static 3D Chart

Use lower rotation, tilt, and depth values for a restrained appearance.

```typescript
const chart: Chart3D = new Chart3D({
  title: 'Subtle 3D View',
  enableRotation: false,
  rotation: 5,
  tilt: 2,
  depth: 60,
  wallColor: 'transparent',
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Dynamic View Reset

```typescript
const defaultView = {
  rotation: 7,
  tilt: 10,
  depth: 100
};

const chart: Chart3D = new Chart3D({
  enableRotation: true,
  rotation: defaultView.rotation,
  tilt: defaultView.tilt,
  depth: defaultView.depth,
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');

const resetButton: HTMLButtonElement | null =
  document.getElementById(
    'reset-view'
  ) as HTMLButtonElement | null;

resetButton?.addEventListener('click', () => {
  chart.rotation = defaultView.rotation;
  chart.tilt = defaultView.tilt;
  chart.depth = defaultView.depth;
  chart.refresh();
});
```

### Multi-Series 3D Chart

Inject `Legend3D` when the legend is displayed.

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  Legend3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  Legend3D,
  Tooltip3D
);

interface BusinessData {
  category: string;
  sales: number;
  revenue: number;
}

const chart[
Source: chartData,
Name: 'month',
Name: 'sales',
: 'Column'
To('#chart')e: 42
  },
  {
    category: 'Q2',
    sales: 40,
    revenue: 48
  },
  {
    category: 'Q3',
    sales: 45,
    revenue: 55
  },
  {
    category: 'Q4',
    sales: 52,
    revenue: 63
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Business Performance',
  enableRotation: true,
  rotation: 15,
  tilt: 8,
  depth: 110,
  wallColor: 'transparent',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Quarter'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 70,
    interval: 10,
    title: 'Amount'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y}'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    },
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue'
    }
  ]
});

chart.appendTo('#chart');
```

## Best Practices

- Begin with `rotation: 7`, `tilt: 10`, and `depth: 100`.
- Use moderate view angles for charts intended for precise comparison.
- Keep `enableRotation` disabled when a fixed reporting view is required.
- Enable rotation when spatial exploration adds value.
- Provide a reset control when users can modify the chart view.
- Provide native button controls when rotation is important to the workflow.
- Avoid relying exclusively on pointer dragging.
- Use descriptive button labels such as `Rotate left` and `Reset view`.
- Keep labels readable at the initial view.
- Test data labels and tooltips at multiple angles.
- Limit the number of categories and series.
- Use `wallColor: 'transparent'` or a subtle wall color.
- Avoid excessive depth with limited container dimensions.
- Apply all programmatic view changes before calling `refresh()`.
- Destroy the chart when it is permanently removed.
- Remove application-owned event listeners during cleanup.
- Test rotation with a mouse, touch input, and keyboard-accessible controls.
- Ensure that interactive rotation does not prevent page scrolling on touch devices.
- Provide a text summary or data table when essential information must remain accessible.

## Troubleshooting

### Chart Is Not Displayed

- Confirm that `Chart3D` is imported from `@syncfusion/ej2-charts`.
- Confirm that the required series module is imported and injected.
- Inject `ColumnSeries3D` when `type` is `Column`.
- Inject `BarSeries3D` when `type` is `Bar`.
- Inject `Category3D` when `primaryXAxis.valueType` is `Category`.
- Confirm that the target element exists before calling `appendTo`.
- Ensure that the chart container has a valid width and height.
- Ensure that `dataSource`, `xName`, and `yName` are correctly configured.
- Check the browser console for runtime or module errors.

### Chart Does Not Look Three-Dimensional

- Set `depth` to a value greater than zero.
- Use a moderate `rotation` value.
- Use a moderate `tilt` value.
- Set a visible `wallColor` if the wall structure should be emphasized.
- Ensure that the chart container is large enough to display the perspective.
- Avoid a combination of zero rotation, zero tilt, and very low depth when a pronounced effect is required.

### Interactive Rotation Is Not Working

- Set `enableRotation` to `true`.
- Ensure that another element is not covering the chart.
- Ensure that CSS does not apply `pointer-events: none`.
- Confirm that the chart is visible and fully rendered.
- Verify that application event handlers do not cancel the required pointer events.
- Test with a supported modern browser.
- Check the browser console for errors.

### Programmatic Rotation Is Not Updating

- Assign a new value to `chart.rotation`.
- Assign a new value to `chart.tilt` when required.
- Assign a new value to `chart.depth` when required.
- Call `chart.refresh()` after completing all changes.
- Confirm that the chart instance has not been destroyed.
- Avoid creating a second local variable that hides the active chart instance.

### Chart Appears Distorted

- Reduce `depth`.
- Reduce the rotation angle.
- Reduce the tilt angle.
- Increase the chart dimensions.
- Reduce the number of visible series.
- Reduce the number of visible categories.
- Move the legend outside the most crowded area.
- Disable unnecessary data labels.
- Use a balanced configuration such as `rotation: 7`, `tilt: 10`, and `depth: 100`.

### Labels Are Hidden After Rotation

- Reset the chart to a more readable view.
- Reduce rotation and tilt.
- Increase the chart dimensions.
- Reduce the axis-label font size.
- Rotate long category labels through `primaryXAxis.labelRotation`.
- Move data labels to `Middle` when `Top` labels are clipped.
- Provide a reset control.

### Reset Button Is Not Working

- Confirm that the button element exists.
- Use a native `<button type="button">`.
- Register the handler after the button is available in the DOM.
- Assign the default `rotation`, `tilt`, and `depth`.
- Call `chart.refresh()` after applying the defaults.
- Check the browser console for errors.

### Touch Rotation Interferes with Page Scrolling

- Verify whether interactive rotation is essential on small screens.
- Disable rotation for layouts where page scrolling is more important.
- Provide preset view buttons as an alternative.
- Avoid placing a large interactive chart where users must begin vertical page scrolling.
- Test the behavior on the target touch devices.

## Next Steps

- **Chart types:** See `chart-types-3d.md`.
- **Styling:** See `appearance-and-styling.md`.
- **Interactions:** See `interaction-features-3d.md`.
- **Accessibility and export:** See `accessibility-export.md`.
- **Axes:** See `axes-customization-3d.md`.
- **Data handling:** See `data-and-performance.md`.
