---
name: syncfusion-javascript-linear-gauge
description: Create and customize Syncfusion TypeScript and JavaScript Linear Gauge components for displaying measurements and metrics. Use this skill when user needs to implement a linear gauge, display scalar values in a linear scale, create measurement interfaces, configure ranges and pointers, add annotations, handle user interactions, or customize gauge appearance. Covers installation, configuration, events, accessibility, printing, and internationalization.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Syncfusion EJ2 Linear Gauge in TypeScript and JavaScript

The Syncfusion Essential JS 2 Linear Gauge visualizes measurements and metrics on a linear scale. It can display horizontal or vertical scales with axes, ranges, pointers, labels, annotations, tooltips, animations, and interactive pointer dragging.

## When to Use This Skill

Use this skill when working with the Syncfusion EJ2 Linear Gauge in pure TypeScript or JavaScript.

Typical use cases include:

- **Creating a gauge**: Display a scalar value on a linear scale.
- **Building measurement interfaces**: Show temperature, pressure, speed, capacity, utilization, or other metrics.
- **Configuring axes**: Define minimum and maximum values, tick intervals, labels, and scale direction.
- **Adding ranges**: Define colored zones for normal, warning, and critical values.
- **Configuring pointers**: Display current, target, average, or threshold values.
- **Customizing appearance**: Modify colors, fonts, backgrounds, borders, gradients, and animations.
- **Handling interactions**: Respond to mouse, drag, value-change, load, and rendering events.
- **Adding annotations**: Place text or trusted HTML content at specific gauge or axis positions.
- **Updating values dynamically**: Use `setPointerValue()` for live data and programmatic updates.
- **Exporting and printing**: Generate PNG, JPEG, SVG, or PDF output and print the gauge.
- **Internationalization**: Apply culture-aware number and currency formatting.
- **Accessibility**: Provide meaningful titles, pointer descriptions, visible values, and accessible controls.
- **Responsive layouts**: Render gauges inside flexible dashboard, mobile, and fullscreen layouts.
- **Migrating from EJ1**: Replace jQuery-based EJ1 Linear Gauge code with the EJ2 object model.

## Documentation and Navigation Guide

Choose the reference that matches the task.

### API Reference

**Read:** references/api-reference.md

Use this reference when you need:

- Linear Gauge classes and models
- Properties, methods, and events
- Axis, range, pointer, tick, label, annotation, and container models
- Event argument interfaces
- Optional feature modules
- Direct API definitions

### Getting Started

**Read:** references/getting-started.md

Use this reference for:

- Installing `@syncfusion/ej2-lineargauge`
- Importing `LinearGauge`
- Creating the host element
- Initializing the first gauge
- Understanding the basic configuration structure
- Creating TypeScript and global JavaScript applications

### Configuring Axes and Scales

**Read:** references/axis-and-scales.md

Use this reference for:

- Axis minimum and maximum values
- Inversed axes
- Opposed positioning
- Axis-line customization
- Major and minor tick marks
- Label formatting and positioning
- Multiple axes
- Dynamic scale updates
- Conditional label rendering

### Adding Ranges and Pointers

**Read:** references/ranges-and-pointers.md

Use this reference for:

- Creating and styling ranges
- Range positions, offsets, widths, and borders
- Linear and radial range gradients
- Bar and marker pointers
- Image and text pointers
- Pointer borders, opacity, and placement
- Pointer animations
- Drag-enabled pointers
- Multiple pointers on one axis
- Dynamic pointer and range updates

### Customization and Appearance

**Read:** [references/customization-nd-appearance.md

Use this reference for:

- Gauge-area background, border, and margin
- Internal container styling
- Normal, RoundedRectangle, and Thermometer containers
- Built-in themes
- Semantic color schemes
- Font and label customization
- Dashed axis lines
- Range and pointer borders
- Solid and gradient backgrounds
- Image and text pointers
- Conditional labels through `axisLabelRender`
- Additional content through annotations

### Interaction and Events

**Read:** references/interaction-and-events.md

Use this reference for:

- `gaugeMouseDown`
- `gaugeMouseMove`
- `gaugeMouseUp`
- `dragStart`
- `dragMove`
- `dragEnd`
- `valueChange`
- Draggable pointers
- Form integration
- Native range and number inputs
- Value validation
- Snap-to-interval behavior
- Real-time updates
- API polling
- Timer and event cleanup

### Advanced Features

**Read:** references/advanced-features.md

Use this reference for:

- Printing
- PNG, JPEG, SVG, and PDF export
- Base64 export
- Custom export file names
- Annotations
- Complete-gauge animation
- Pointer animation
- Reduced-motion handling
- Internationalization
- Currency and number formatting
- Scale-direction considerations
- Accessibility
- Migrating from Essential JavaScript 1 to EJ2

### Responsive Design and Dimensions

**Read:** references/dimensions-and-responsive.md

Use this reference for:

- Gauge-level width and height
- Internal container dimensions
- Percentage-based dimensions
- Fixed dimensions
- CSS media queries
- `ResizeObserver`
- Mobile-friendly dimensions
- Responsive labels, ticks, ranges, and pointers
- Multi-gauge layouts
- Fullscreen rendering
- Vertical gauges
- Resize cleanup

## Required Package

Use the pure TypeScript and JavaScript Linear Gauge package.

```bash
npm install @syncfusion/ej2-lineargauge
```

Import the Linear Gauge in TypeScript.

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';
```

For applications using the complete EJ2 global JavaScript bundle, initialize the component through:

```javascript
ej.lineargauge.LinearGauge
```

Do not use Angular wrapper packages or Angular component modules in pure TypeScript and JavaScript examples.

```typescript
// Do not use in pure TypeScript.
import {
  LinearGaugeModule,
  LinearGaugeAllModule
} from '@syncfusion/ej2-angular-lineargauge';
```

## Optional Feature Modules

Some Linear Gauge features require module injection in TypeScript.

```typescript
import {
  Annotations,
  GaugeTooltip,
  Gradient,
  ImageExport,
  LinearGauge,
  PdfExport,
  Print
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(
  Annotations,
  GaugeTooltip,
  Gradient,
  ImageExport,
  PdfExport,
  Print
);
```

Inject only the modules required by the application.

Use the following module mapping:

```text
Annotations       -> Annotations
Tooltips          -> GaugeTooltip
Gradients         -> Gradient
Image export      -> ImageExport
PDF export        -> PdfExport
Printing          -> Print
```

Global JavaScript bundles may already include these features, depending on how the scripts are packaged.

## Quick Start

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

  <title>Syncfusion EJ2 Linear Gauge</title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 24px;
      background: #f8fafc;
      color: #111827;
      font-family: Arial, Helvetica, sans-serif;
    }

    main {
      width: min(100%, 1000px);
      margin: 0 auto;
    }

    h1 {
      margin: 0 0 8px;
      font-size: 26px;
    }

    .description {
      margin: 0 0 16px;
      line-height: 1.5;
    }

    .gauge-card {
      padding: 16px;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      background: #ffffff;
    }

    #gauge-container {
      display: block;
      width: 100%;
      height: 340px;
    }
  </style>
</head>
<body>
  <main>
    <h1>System Utilization</h1>

    <p class="description">
      The Linear Gauge shows the current system
      utilization on a scale from 0 to 100.
    </p>

    <section
      class="gauge-card"
      aria-label="System utilization gauge"
    >
      <div id="gauge-container"></div>
    </section>
  </main>
</body>
</html>
```

### index.ts

```typescript
import {
  LinearGauge
} from '@syncfusion/ej2-lineargauge';

const gauge: LinearGauge =
  new LinearGauge({
    width: '100%',
    height: '100%',
    orientation: 'Horizontal',

    title: 'Current Utilization',

    titleStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '18px',
      fontWeight: '700'
    },

    container: {
      width: 28,
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
        minimum: 0,
        maximum: 100,
        showLastLabel: true,

        majorTicks: {
          interval: 20,
          position: 'Outside',
          height: 10,
          width: 2,
          color: '#334155'
        },

        minorTicks: {
          interval: 5,
          position: 'Outside',
          height: 5,
          width: 1,
          color: '#64748b'
        },

        labelStyle: {
          format: '{value}%',
          position: 'Outside',
          offset: 8,

          font: {
            fontFamily: 'Arial',
            size: '13px',
            color: '#334155',
            fontWeight: '600'
          }
        },

        ranges: [
          {
            start: 0,
            end: 30,
            color: '#166534',
            position: 'Inside',
            startWidth: 15,
            endWidth: 15
          },
          {
            start: 30,
            end: 70,
            color: '#854d0e',
            position: 'Inside',
            startWidth: 15,
            endWidth: 15
          },
          {
            start: 70,
            end: 100,
            color: '#991b1b',
            position: 'Inside',
            startWidth: 15,
            endWidth: 15
          }
        ],

        pointers: [
          {
            value: 45,
            type: 'Bar',
            color: '#1e293b',
            width: 11,
            position: 'Cross',
            roundedCornerRadius: 4,
            animationDuration: 700,
            description:
              'Current system utilization is 45 percent'
          }
        ]
      }
    ]
  });

gauge.appendTo('#gauge-container');
```

### index.js

```javascript
var gauge =
  new ej.lineargauge.LinearGauge({
    width: '100%',
    height: '100%',
    orientation: 'Horizontal',

    title: 'Current Utilization',

    titleStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '18px',
      fontWeight: '700'
    },

    container: {
      width: 28,
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
        minimum: 0,
        maximum: 100,
        showLastLabel: true,

        majorTicks: {
          interval: 20,
          position: 'Outside',
          height: 10,
          width: 2,
          color: '#334155'
        },

        minorTicks: {
          interval: 5,
          position: 'Outside',
          height: 5,
          width: 1,
          color: '#64748b'
        },

        labelStyle: {
          format: '{value}%',
          position: 'Outside',
          offset: 8,

          font: {
            fontFamily: 'Arial',
            size: '13px',
            color: '#334155',
            fontWeight: '600'
          }
        },

        ranges: [
          {
            start: 0,
            end: 30,
            color: '#166534',
            position: 'Inside',
            startWidth: 15,
            endWidth: 15
          },
          {
            start: 30,
            end: 70,
            color: '#854d0e',
            position: 'Inside',
            startWidth: 15,
            endWidth: 15
          },
          {
            start: 70,
            end: 100,
            color: '#991b1b',
            position: 'Inside',
            startWidth: 15,
            endWidth: 15
          }
        ],

        pointers: [
          {
            value: 45,
            type: 'Bar',
            color: '#1e293b',
            width: 11,
            position: 'Cross',
            roundedCornerRadius: 4,
            animationDuration: 700,
            description:
              'Current system utilization is 45 percent'
          }
        ]
      }
    ]
  });

gauge.appendTo('#gauge-container');
```

## Common Patterns

### Pattern 1: Temperature Gauge

Use a vertical gauge with a Thermometer container when the data represents temperature.

```typescript
import {
  LinearGauge
} from '@syncfusion/ej2-lineargauge';

const currentTemperature: number = 24;

const gauge: LinearGauge =
  new LinearGauge({
    width: '100%',
    height: '500px',
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
        minimum: 0,
        maximum: 50,

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
            start: 0,
            end: 15,
            color: '#2563eb',
            startWidth: 12,
            endWidth: 12
          },
          {
            start: 15,
            end: 30,
            color: '#166534',
            startWidth: 12,
            endWidth: 12
          },
          {
            start: 30,
            end: 50,
            color: '#991b1b',
            startWidth: 12,
            endWidth: 12
          }
        ],

        pointers: [
          {
            value: currentTemperature,
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

gauge.appendTo('#gauge-container');
```

### Pattern 2: Interactive Gauge

Use a marker pointer with `enableDrag: true`.

Configure drag events on the `LinearGauge` object, not on the pointer.

```typescript
import {
  LinearGauge,
  IPointerDragEventArgs
} from '@syncfusion/ej2-lineargauge';

let gaugeValue: number = 50;

const gauge: LinearGauge =
  new LinearGauge({
    axes: [
      {
        minimum: 0,
        maximum: 100,

        pointers: [
          {
            value: gaugeValue,
            type: 'Marker',
            markerType: 'Circle',
            height: 28,
            width: 28,
            color: '#2563eb',
            enableDrag: true,
            description:
              'Drag to change the gauge value'
          }
        ]
      }
    ],

    dragMove: (
      args: IPointerDragEventArgs
    ): void => {
      gaugeValue =
        Math.round(args.currentValue);

      console.log(
        'Current drag value:',
        gaugeValue
      );
    },

    dragEnd: (
      args: IPointerDragEventArgs
    ): void => {
      gaugeValue =
        Math.round(args.currentValue);

      gauge.setPointerValue(
        0,
        0,
        gaugeValue
      );

      console.log(
        'Gauge value changed to:',
        gaugeValue
      );
    }
  });

gauge.appendTo('#gauge-container');
```

Always use `args.currentValue`.

```typescript
dragEnd: (
  args: IPointerDragEventArgs
): void => {
  const value: number =
    args.currentValue;
}
```

Do not use an undeclared global event.

```typescript
// Avoid.
const value = event.currentValue;
```

### Pattern 3: Multiple Pointers

Use multiple pointer objects to compare current, target, and average values.

```typescript
import {
  LinearGauge
} from '@syncfusion/ej2-lineargauge';

const actualValue: number = 65;
const targetValue: number = 80;
const averageValue: number = 70;

const gauge: LinearGauge =
  new LinearGauge({
    axes: [
      {
        minimum: 0,
        maximum: 100,

        pointers: [
          {
            value: actualValue,
            type: 'Bar',
            color: '#2563eb',
            width: 13,
            description:
              'Actual value is 65 percent'
          },
          {
            value: targetValue,
            type: 'Marker',
            markerType: 'Circle',
            color: '#c2410c',
            height: 18,
            width: 18,
            position: 'Outside',
            placement: 'Near',
            offset: 8,
            description:
              'Target value is 80 percent'
          },
          {
            value: averageValue,
            type: 'Marker',
            markerType: 'Triangle',
            color: '#15803d',
            height: 18,
            width: 18,
            position: 'Outside',
            placement: 'Far',
            offset: 8,
            description:
              'Average value is 70 percent'
          }
        ]
      }
    ]
  });

gauge.appendTo('#gauge-container');
```

### Pattern 4: Dynamic Value Update

Use `setPointerValue()` when only a pointer value changes.

```typescript
function updateGaugeValue(
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

Use `refresh()` when changing:

- Axis limits
- Tick intervals
- Ranges
- Labels
- Annotations
- Container settings
- Layout or orientation

### Pattern 5: Export and Print

Inject the required modules.

```typescript
import {
  ImageExport,
  LinearGauge,
  PdfExport,
  Print
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(
  ImageExport,
  PdfExport,
  Print
);
```

Enable the matching features.

```typescript
const gauge: LinearGauge =
  new LinearGauge({
    allowImageExport: true,
    allowPdfExport: true,
    allowPrint: true
  });
```

Export image formats.

```typescript
gauge.export(
  'PNG',
  'linear-gauge'
);

gauge.export(
  'JPEG',
  'linear-gauge'
);

gauge.export(
  'SVG',
  'linear-gauge'
);
```

Export PDF.

```typescript
gauge.export(
  'PDF',
  'linear-gauge'
);
```

Print the gauge.

```typescript
gauge.print();
```

The `print()` method does not export PNG or PDF. It opens the browser print flow.

## Key Properties and Methods

### Gauge-Level Properties

- `width`: Controls the complete gauge width using CSS-compatible dimensions.
- `height`: Controls the complete gauge height using CSS-compatible dimensions.
- `orientation`: Specifies `Horizontal` or `Vertical`.
- `background`: Specifies the gauge-area background.
- `border`: Customizes the gauge-area boundary.
- `margin`: Controls spacing around gauge content.
- `container`: Customizes the internal graphical container.
- `axes`: Configures one or more axes.
- `annotations`: Configures annotation content.
- `title`: Specifies the gauge title.
- `titleStyle`: Customizes title text.
- `animationDuration`: Configures complete-gauge animation.
- `allowPrint`: Enables printing.
- `allowImageExport`: Enables PNG, JPEG, and SVG export.
- `allowPdfExport`: Enables PDF export.
- `description`: Supplies information for assistive technology.
- `locale`: Sets the component locale.
- `theme`: Applies a supported built-in theme.

### Internal Container Properties

- `container.width`: Controls internal container thickness using a number.
- `container.height`: Controls internal container length using a number.
- `container.type`: Specifies `Normal`, `RoundedRectangle`, or `Thermometer`.
- `container.offset`: Moves the internal container relative to the axis.
- `container.backgroundColor`: Specifies the internal container background.
- `container.border`: Customizes the internal container border.
- `container.roundedCornerRadius`: Rounds a `RoundedRectangle` container.

Do not use internal container dimensions to size the complete component.

```typescript
const gauge: LinearGauge =
  new LinearGauge({
    width: '100%',
    height: '350px',

    container: {
      width: 30,
      height: 0
    }
  });
```

### Axis Properties

- `axes[].minimum`: Specifies the minimum scale value.
- `axes[].maximum`: Specifies the maximum scale value.
- `axes[].isInversed`: Reverses scale direction.
- `axes[].opposedPosition`: Places the axis on the opposite side.
- `axes[].showLastLabel`: Shows or hides the final label.
- `axes[].line`: Customizes the axis line.
- `axes[].majorTicks`: Configures major ticks.
- `axes[].minorTicks`: Configures minor ticks.
- `axes[].labelStyle`: Configures axis labels.
- `axes[].ranges`: Configures value regions.
- `axes[].pointers`: Configures value indicators.

### Range Properties

- `ranges[].start`: Specifies the range start.
- `ranges[].end`: Specifies the range end.
- `ranges[].color`: Specifies a solid range color.
- `ranges[].startWidth`: Specifies thickness at the range start.
- `ranges[].endWidth`: Specifies thickness at the range end.
- `ranges[].offset`: Moves the range relative to the axis.
- `ranges[].position`: Specifies `Inside`, `Outside`, `Cross`, or `Auto`.
- `ranges[].border`: Customizes the range border.
- `ranges[].linearGradient`: Applies a linear gradient.
- `ranges[].radialGradient`: Applies a radial gradient.

### Pointer Properties

- `pointers[].value`: Specifies the pointer value.
- `pointers[].type`: Specifies `Bar` or `Marker`.
- `pointers[].color`: Specifies the pointer color.
- `pointers[].width`: Specifies pointer width.
- `pointers[].height`: Specifies marker height.
- `pointers[].markerType`: Specifies the marker shape.
- `pointers[].position`: Positions the pointer relative to the axis.
- `pointers[].placement`: Positions a marker within its selected side.
- `pointers[].offset`: Moves the pointer relative to the axis.
- `pointers[].border`: Customizes the pointer border.
- `pointers[].opacity`: Specifies pointer opacity.
- `pointers[].animationDuration`: Configures pointer animation.
- `pointers[].enableDrag`: Enables pointer dragging.
- `pointers[].description`: Provides an accessible pointer description.
- `pointers[].roundedCornerRadius`: Rounds a bar pointer.
- `pointers[].imageUrl`: Specifies an image marker.
- `pointers[].text`: Specifies text-marker content.
- `pointers[].textStyle`: Customizes a text pointer.

### Important Methods

Update a pointer:

```typescript
gauge.setPointerValue(
  axisIndex,
  pointerIndex,
  value
);
```

Re-render after model or layout changes:

```typescript
gauge.refresh();
```

Export the gauge:

```typescript
gauge.export(
  type,
  fileName,
  orientation,
  allowDownload
);
```

Print the gauge:

```typescript
gauge.print();
```

Destroy the gauge:

```typescript
gauge.destroy();
```

## Important Implementation Rules

### Use Pure EJ2 Initialization

```typescript
const gauge: LinearGauge =
  new LinearGauge({
    axes: []
  });

gauge.appendTo('#gauge-container');
```

Do not use Angular decorators, Angular bindings, or Angular wrapper components in TypeScript and JavaScript references.

### Size the Correct Element

Use gauge-level dimensions for the complete component.

```typescript
width: '100%',
height: '350px'
```

Use numeric internal container dimensions.

```typescript
container: {
  width: 30,
  height: 0
}
```

### Configure Events on the Gauge

```typescript
const gauge: LinearGauge =
  new LinearGauge({
    dragEnd: (
      args: IPointerDragEventArgs
    ): void => {
      console.log(args.currentValue);
    }
  });
```

Do not configure `dragEnd` inside a pointer object.

### Use Valid Marker Names

```typescript
markerType: 'InvertedTriangle'
```

Do not use:

```typescript
markerType: 'Inverted Triangle'
```

### Inject Optional Modules

For gradients:

```typescript
LinearGauge.Inject(Gradient);
```

For annotations:

```typescript
LinearGauge.Inject(Annotations);
```

For tooltips:

```typescript
LinearGauge.Inject(GaugeTooltip);
```

For printing and export:

```typescript
LinearGauge.Inject(
  Print,
  ImageExport,
  PdfExport
);
```

### Use Supported Gradient Configuration

Do not use CSS gradient strings for range or pointer colors.

```typescript
// Avoid.
color:
  'linear-gradient(to right, #2563eb, #16a34a)'
```

Use `linearGradient` or `radialGradient` and inject `Gradient`.

### Use Native Inputs for Accessible Editing

A gauge is a visualization. Use a native form control when users must edit its value by keyboard.

```html
<label for="gauge-value">
  Utilization
</label>

<input
  id="gauge-value"
  type="range"
  min="0"
  max="100"
  step="5"
  value="50"
/>
```

Update the pointer using:

```typescript
gauge.setPointerValue(
  0,
  0,
  Number(input.value)
);
```

### Clean Up Resources

Remove application listeners, clear timers, and destroy the gauge.

```typescript
window.clearInterval(timer);

input.removeEventListener(
  'input',
  handleInput
);

gauge.destroy();
```

## Validation Checklist

Before returning or publishing a Linear Gauge example, verify the following:

- [ ] The package is `@syncfusion/ej2-lineargauge`.
- [ ] The example contains no Angular-only imports or syntax.
- [ ] The gauge host exists before `appendTo()` is called.
- [ ] The gauge host has a nonzero width and height.
- [ ] Gauge-level `width` and `height` use CSS-compatible strings.
- [ ] Internal `container.width` and `container.height` use numbers.
- [ ] At least one valid axis exists.
- [ ] Axis minimum is less than axis maximum.
- [ ] Pointer values are within axis limits.
- [ ] Range start and end values are within axis limits.
- [ ] Range widths are greater than zero when ranges must be visible.
- [ ] Marker pointers define both `height` and `width`.
- [ ] Marker names use valid values such as `InvertedTriangle`.
- [ ] Drag events read `args.currentValue`.
- [ ] Dynamic pointer updates use `setPointerValue()`.
- [ ] Broader model changes call `refresh()`.
- [ ] Optional feature modules are imported and injected.
- [ ] Image export enables `allowImageExport`.
- [ ] PDF export enables `allowPdfExport`.
- [ ] Printing enables `allowPrint`.
- [ ] `print()` is not described as an export method.
- [ ] Gradients use the `Gradient` module and gradient models.
- [ ] Annotation HTML is trusted or sanitized.
- [ ] Essential information is not communicated only through color.
- [ ] Important pointer values have descriptions or visible text.
- [ ] Editable values have keyboard-accessible native controls.
- [ ] Reduced-motion preferences are respected where appropriate.
- [ ] Timers and listeners are cleaned up.
- [ ] The gauge instance is destroyed when no longer needed.

## Common Mistakes

### Incorrect Package

```typescript
// Incorrect for pure TypeScript.
import {
  LinearGaugeAllModule
} from '@syncfusion/ej2-angular-gauges';
```

Use:

```typescript
import {
  LinearGauge
} from '@syncfusion/ej2-lineargauge';
```

### Incorrect Component Dimensions

```typescript
// Incorrect use of the internal container.
container: {
  width: '100%',
  height: '350px'
}
```

Use:

```typescript
width: '100%',
height: '350px',

container: {
  width: 30,
  height: 0
}
```

### Incorrect Event Value

```typescript
// Incorrect.
dragEnd: (
  args: IPointerDragEventArgs
): void => {
  console.log(event.currentValue);
}
```

Use:

```typescript
dragEnd: (
  args: IPointerDragEventArgs
): void => {
  console.log(args.currentValue);
}
```

### Incorrect Marker Type

```typescript
// Incorrect.
markerType: 'Inverted Triangle'
```

Use:

```typescript
markerType: 'InvertedTriangle'
```

### Incorrect Gradient

```typescript
// Incorrect.
color:
  'linear-gradient(to right, red, green)'
```

Use the `Gradient` module and `linearGradient`.

### Incorrect Print Description

```typescript
// Prints the gauge.
gauge.print();
```

Use `export()` for files:

```typescript
gauge.export(
  'PNG',
  'linear-gauge'
);
```

### Unnecessary Full Refresh

Avoid refreshing the complete gauge for pointer-only updates.

```typescript
gauge.axes[0].pointers[0].value =
  newValue;

gauge.refresh();
```

Prefer:

```typescript
gauge.setPointerValue(
  0,
  0,
  newValue
);
```

## Expected Output Style

When responding to Linear Gauge implementation requests:

1. Identify whether the user needs TypeScript, global JavaScript, or both.
2. Use `@syncfusion/ej2-lineargauge` for pure TypeScript.
3. Return complete and runnable examples.
4. Include the required HTML host and sizing CSS.
5. Include every required feature-module import and injection.
6. Explain the purpose of every injected module.
7. Keep pointer values and ranges inside axis limits.
8. Use `setPointerValue()` for pointer-only updates.
9. Use `refresh()` for broader configuration changes.
10. Include cleanup for timers and event listeners.
11. Correct unsupported Angular syntax rather than reproducing it.
12. Include accessibility considerations for interactive or status-oriented gauges.
13. Validate APIs and property names against the installed EJ2 package version.
14. Do not claim support for unverified methods, events, formats, or templates.