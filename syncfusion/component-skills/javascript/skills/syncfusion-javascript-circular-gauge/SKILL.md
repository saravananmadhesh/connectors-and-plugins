---
name: syncfusion-javascript-circular-gauge
description: Guide to implementing Syncfusion Circular Gauge in TypeScript and JavaScript. Immediately use this skill when user needs to visualize numeric values on a circular scale, configure axes and pointers, add ranges and annotations, customize gauge appearance, implement animations, handle user interactions with tooltips and legends, export gauges to images, or optimize performance. Works with TypeScript (module-based) and JavaScript (CDN/ES5).
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Syncfusion Circular Gauge (TypeScript & JavaScript)

The Syncfusion Essential JS 2 Circular Gauge visualizes numeric values on a circular scale. It is suitable for dashboards, monitoring systems, KPI displays, progress indicators, speedometers, temperature monitors, and other measurement-oriented applications.

This skill covers complete implementations for:

- TypeScript applications using npm and module imports.
- JavaScript applications using versioned CDN or local global scripts.
- Needle, RangeBar, and Marker pointers.
- Ranges, axes, labels, ticks, annotations, legends, and tooltips.
- Dynamic pointer updates and drag interactions.
- Styling, themes, gradients, responsive layouts, accessibility, export, and printing.

The Circular Gauge package provides axes, ranges, ticks, labels, pointers, annotations, legends, tooltips, drag interaction, globalization, accessibility, export, and print support.

## Platform Support

### TypeScript

Use TypeScript when the application uses:

- The `@syncfusion/ej2-circulargauge` npm package.
- TypeScript compilation.
- Webpack, Vite, or another module bundler.
- Strongly typed configuration.
- Explicit feature-module injection.
- IDE IntelliSense and compile-time validation.

Install the package:

```bash
npm install @syncfusion/ej2-circulargauge
```

The package uses dependencies such as `@syncfusion/ej2-base`, `@syncfusion/ej2-svg-base`, and `@syncfusion/ej2-pdf-export`. Compatible transitive dependency versions are installed through the package manager. Keep Syncfusion package versions consistent to avoid dependency conflicts.

### JavaScript

Use global JavaScript when the application uses:

- Versioned CDN scripts.
- Locally stored EJ2 global scripts.
- Traditional HTML and JavaScript files.
- The global `ej` namespace.
- No TypeScript compilation or build step.

The global Circular Gauge constructor is:

```javascript
ej.circulargauge.CircularGauge
```

### JavaScript Language Level

The JavaScript examples use ES5-compatible syntax where practical:

```text
var instead of const or let
Traditional functions instead of arrow functions
No optional chaining
No object spread
No JavaScript module imports
```

Use TypeScript or modern JavaScript when the application build process transpiles newer syntax.

## When to Use This Skill

Use this skill when the task requires:

- Creating a basic Circular Gauge.
- Building speedometer or meter-style visualizations.
- Displaying KPI values.
- Creating a progress or completion gauge.
- Configuring axis limits, angles, directions, and radii.
- Customizing major ticks, minor ticks, and labels.
- Adding Needle, RangeBar, or Marker pointers.
- Displaying multiple pointers or axes.
- Defining normal, warning, and critical ranges.
- Adding text, HTML, image, or status annotations.
- Enabling pointer and range tooltips.
- Showing range legends.
- Enabling pointer or range dragging.
- Updating pointer values dynamically.
- Applying themes, gradients, colors, and fonts.
- Supporting responsive layouts.
- Supporting RTL languages and localized numbers.
- Improving screen-reader and visual accessibility.
- Exporting to PNG, JPEG, SVG, or PDF.
- Printing the rendered gauge.
- Migrating an EJ1 Circular Gauge to EJ2.
- Optimizing multiple or frequently updated gauges.

## Implementation Rules

### Rule 1: Use Complete Examples

A runnable TypeScript example should include:

```text
Imports
Feature-module injection
Gauge configuration
Gauge host element
appendTo call
Required CSS when applicable
```

A runnable JavaScript example should include:

```text
Versioned script references
Gauge host element
Gauge configuration
appendTo call
Required CSS when applicable
```

### Rule 2: Use Explicit DOM Attachment

Create the gauge and then call `appendTo`.

Preferred TypeScript:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Preferred JavaScript:

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Rule 3: Ensure the Host Exists

Required HTML:

```html
<div id="gauge"></div>
```

Required attachment:

```typescript
gauge.appendTo('#gauge');
```

The host ID and selector must match exactly.

### Rule 4: Inject Every Enabled TypeScript Feature

Feature-to-module mapping:

```text
Annotations  -> Annotations
Tooltips     -> GaugeTooltip
Legend       -> Legend
Gradients    -> Gradient
Image export -> ImageExport
PDF export   -> PdfExport
Print        -> Print
```

Example:

```typescript
import {
    CircularGauge,
    Annotations,
    GaugeTooltip,
    Legend,
    Gradient,
    ImageExport,
    PdfExport,
    Print
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    Annotations,
    GaugeTooltip,
    Legend,
    Gradient,
    ImageExport,
    PdfExport,
    Print
);
```

Do not inject unused feature modules.

### Rule 5: Keep Imports and Injection Synchronized

Every injected module must be imported.

Incorrect:

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    Annotations
);
```

Correct:

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    Annotations
);
```

### Rule 6: Keep Values Inside the Axis Range

For this axis:

```typescript
minimum: 0,
maximum: 100
```

use pointer values such as:

```typescript
value: 65
```

Validate or clamp external values:

```typescript
const safeValue: number =
    Math.min(
        100,
        Math.max(0, requestedValue)
    );
```

### Rule 7: Prefer Public Update Methods

Update a pointer with:

```typescript
gauge.setPointerValue(
    axisIndex,
    pointerIndex,
    value
);
```

Update an annotation with:

```typescript
gauge.setAnnotationValue(
    axisIndex,
    annotationIndex,
    content
);
```

Avoid rebuilding the entire gauge for a simple value update.

### Rule 8: Use Valid Nested Models

Needle tail:

```typescript
needleTail: {
    length: '20%',
    color: '#0066cc'
}
```

Cap border:

```typescript
cap: {
    radius: 8,
    color: '#0066cc',

    border: {
        width: 2,
        color: '#333333'
    }
}
```

Gauge border:

```typescript
border: {
    width: 1,
    color: '#dddddd'
}
```

Tooltip border:

```typescript
tooltip: {
    border: {
        width: 1,
        color: '#ffffff'
    }
}
```

### Rule 9: Use Valid Dragging APIs

Gauge-level pointer dragging:

```typescript
enablePointerDrag: true
```

Gauge-level range dragging:

```typescript
enableRangeDrag: true
```

Use the drag lifecycle:

```text
dragStart
dragMove
dragEnd
```

Do not use:

```typescript
allowDragging: true
```

### Rule 10: Avoid Encoded or Editor-Generated Code

Executable HTML must use actual tags:

```html
<div id="gauge"></div>
```

Do not use:

```html
<div id="gauge"></div>
```

Do not place rich-text editor markup inside code:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```

## Navigation Guide

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)

Use this reference for:

- Package installation.
- TypeScript project setup.
- JavaScript CDN setup.
- Local script setup.
- Gauge host creation.
- Basic axis and pointer configuration.
- Module injection.
- Development-server guidance.
- Initialization troubleshooting.

### Axes Configuration

📄 **Read:** [references/axes-configuration.md](references/axes-configuration.md)

Use this reference for:

- Axis minimum and maximum.
- Start and end angles.
- Clockwise and anticlockwise direction.
- Axis radius.
- Axis-line width, color, and offset.
- Axis background.
- Major and minor ticks.
- Axis labels and formatting.
- Ranges.
- Multiple axes.
- Conditional label rendering.

### Pointers Configuration

📄 **Read:** [references/pointers-configuration.md](references/pointers-configuration.md)

Use this reference for:

- Needle pointers.
- RangeBar pointers.
- Marker pointers.
- Needle cap and tail customization.
- Marker shapes and image markers.
- RangeBar rounded corners.
- Pointer gradients.
- Pointer animations.
- Pointer dragging.
- Multiple pointers.
- Runtime pointer updates.

### Annotations

📄 **Read:** [references/annotations.md](references/annotations.md)

Use this reference for:

- Annotation module injection.
- Plain-text content.
- HTML content.
- Element-selector templates.
- Image annotations.
- Annotation positioning.
- Text styling.
- Multiple annotations.
- Dynamic annotation updates.
- Annotation render events.
- Annotation accessibility.
- Annotation export considerations.

### Styling & Appearance

📄 **Read:** [references/styling-appearance.md](references/styling-appearance.md)

Use this reference for:

- Axis, pointer, range, and tick colors.
- Gauge and axis backgrounds.
- Borders.
- Built-in themes.
- Title and label fonts.
- Linear and radial gradients.
- Gauge positioning.
- Responsive dimensions.
- Resize handling.
- High-contrast presentation.

### Events & Interactions

📄 **Read:** [references/events-interactions.md](references/events-interactions.md)

Use this reference for:

- Gauge mouse events.
- Pointer and range dragging.
- Drag start, move, and end.
- Pointer, range, and annotation tooltips.
- Tooltip templates and styling.
- Range legends.
- Legend rendering.
- Animation completion.
- Programmatic pointer updates.
- Live-data updates.

### Export & Print

📄 **Read:** [references/export-print.md](references/export-print.md)

Use this reference for:

- Image export.
- PNG, JPEG, and SVG formats.
- PDF export.
- Portrait and landscape orientation.
- Browser printing.
- Required export modules.
- Export feature-enablement properties.
- Export timing.
- File-name sanitization.
- Annotation export limitations.

### Accessibility & Advanced

📄 **Read:** [references/accessibility-advanced.md](references/accessibility-advanced.md)

Use this reference for:

- WCAG 2.2 guidance.
- Color contrast.
- Non-color status communication.
- Screen-reader support.
- Gauge descriptions.
- Dynamic live regions.
- Keyboard-accessible external controls.
- RTL layout.
- Axis direction.
- Internationalized labels and tooltips.
- EJ1-to-EJ2 migration.
- Performance and cleanup practices.

## TypeScript Quick Start

### Required HTML

```html
<div id="gauge"></div>
```

### TypeScript

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    Annotations
);

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',
        title: 'Speed Monitor',

        axes: [{
            minimum: 0,
            maximum: 120,
            startAngle: 230,
            endAngle: 130,
            radius: '88%',

            lineStyle: {
                width: 8,
                color: '#e0e0e0'
            },

            majorTicks: {
                interval: 20,
                width: 2,
                height: 10,
                position: 'Inside',
                color: '#333333'
            },

            minorTicks: {
                interval: 5,
                width: 1,
                height: 5,
                position: 'Inside',
                color: '#777777'
            },

            labelStyle: {
                position: 'Inside',
                format: '{value}',

                font: {
                    fontFamily: 'Segoe UI',
                    size: '12px',
                    color: '#333333'
                }
            },

            ranges: [
                {
                    start: 0,
                    end: 40,
                    color: '#107c10',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 40,
                    end: 80,
                    color: '#ffb900',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 80,
                    end: 120,
                    color: '#d13438',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                }
            ],

            pointers: [{
                value: 65,
                type: 'Needle',
                radius: '75%',
                pointerWidth: 8,
                color: '#0066cc',

                cap: {
                    radius: 8,
                    color: '#0066cc',

                    border: {
                        width: 2,
                        color: '#333333'
                    }
                },

                needleTail: {
                    length: '20%',
                    color: '#0066cc'
                },

                animation: {
                    enable: true,
                    duration: 800
                }
            }],

            annotations: [{
                angle: 180,
                radius: '30%',
                zIndex: '1',

                content:
                    '<div style="' +
                    'font-family:Segoe UI;' +
                    'font-size:24px;' +
                    'font-weight:600;' +
                    'color:#333333;' +
                    '">' +
                    '65 km/h' +
                    '</div>',

                description:
                    'Current speed is 65 kilometers per hour'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

## JavaScript Quick Start

### CDN Rule

Use either:

```text
The consolidated EJ2 bundle
```

or:

```text
The individual Circular Gauge package scripts
```

Do not combine both approaches.

### Consolidated Bundle

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Complete JavaScript Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Syncfusion Circular Gauge</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
</head>
<body>
    <div id="gauge"></div>

    <script>
        var gauge =
            new ej.circulargauge.CircularGauge({
                width: '100%',
                height: '450px',
                title: 'Speed Monitor',

                axes: [{
                    minimum: 0,
                    maximum: 120,
                    startAngle: 230,
                    endAngle: 130,
                    radius: '88%',

                    lineStyle: {
                        width: 8,
                        color: '#e0e0e0'
                    },

                    majorTicks: {
                        interval: 20,
                        width: 2,
                        height: 10,
                        position: 'Inside',
                        color: '#333333'
                    },

                    minorTicks: {
                        interval: 5,
                        width: 1,
                        height: 5,
                        position: 'Inside',
                        color: '#777777'
                    },

                    labelStyle: {
                        position: 'Inside',
                        format: '{value}',

                        font: {
                            fontFamily: 'Segoe UI',
                            size: '12px',
                            color: '#333333'
                        }
                    },

                    ranges: [
                        {
                            start: 0,
                            end: 40,
                            color: '#107c10',
                            radius: '95%',
                            startWidth: 10,
                            endWidth: 10
                        },
                        {
                            start: 40,
                            end: 80,
                            color: '#ffb900',
                            radius: '95%',
                            startWidth: 10,
                            endWidth: 10
                        },
                        {
                            start: 80,
                            end: 120,
                            color: '#d13438',
                            radius: '95%',
                            startWidth: 10,
                            endWidth: 10
                        }
                    ],

                    pointers: [{
                        value: 65,
                        type: 'Needle',
                        radius: '75%',
                        pointerWidth: 8,
                        color: '#0066cc',

                        cap: {
                            radius: 8,
                            color: '#0066cc',

                            border: {
                                width: 2,
                                color: '#333333'
                            }
                        },

                        needleTail: {
                            length: '20%',
                            color: '#0066cc'
                        },

                        animation: {
                            enable: true,
                            duration: 800
                        }
                    }],

                    annotations: [{
                        angle: 180,
                        radius: '30%',
                        zIndex: '1',

                        content:
                            '<div style="' +
                            'font-family:Segoe UI;' +
                            'font-size:24px;' +
                            'font-weight:600;' +
                            'color:#333333;' +
                            '">' +
                            '65 km/h' +
                            '</div>',

                        description:
                            'Current speed is 65 ' +
                            'kilometers per hour'
                    }]
                }]
            });

        gauge.appendTo('#gauge');
    </script>
</body>
</html>
```

## Common Patterns

### Pattern 1: Simple KPI Gauge

Use:

- One axis.
- One pointer.
- Two or three status ranges.
- One visible value annotation.
- A textual status outside the gauge.

Recommended for:

```text
Performance indicators
Temperature values
Utilization
Completion percentage
Capacity
```

### Pattern 2: Editable Gauge

Use:

```typescript
enablePointerDrag: true
```

Handle the final value through:

```typescript
dragEnd: (
    args: PointerDragEventArgs
): void => {
    saveValue(args.currentValue);
}
```

Also provide keyboard-accessible native controls.

Recommended for:

```text
User input
Settings
Threshold adjustment
Interactive dashboards
```

Do not rely solely on pointer dragging.

### Pattern 3: Live Monitoring

Update the pointer through:

```typescript
gauge.setPointerValue(
    0,
    0,
    newValue
);
```

Update related content in the same operation:

```typescript
gauge.setAnnotationValue(
    0,
    0,
    createAnnotation(newValue)
);
```

Recommended for:

```text
Sensor data
CPU usage
Memory usage
Network throughput
Vehicle speed
System health
```

Clear timers or subscriptions when the view is destroyed.

### Pattern 4: Multi-Pointer Gauge

Use different pointer types, radii, and colors.

```typescript
pointers: [
    {
        value: 65,
        type: 'Needle',
        radius: '70%',
        color: '#0066cc'
    },
    {
        value: 80,
        type: 'RangeBar',
        radius: '85%',
        pointerWidth: 12,
        color: '#107c10'
    },
    {
        value: 90,
        type: 'Marker',
        markerShape: 'Triangle',
        radius: '100%',
        color: '#d13438'
    }
]
```

Recommended for:

```text
Actual versus target
Current value and threshold
Several related measurements
```

### Pattern 5: Report-Ready Gauge

Inject:

```typescript
CircularGauge.Inject(
    ImageExport,
    PdfExport,
    Print
);
```

Enable:

```typescript
allowImageExport: true,
allowPdfExport: true,
allowPrint: true
```

Export:

```typescript
gauge.export(
    'PNG',
    'performance-gauge'
);
```

```typescript
gauge.export(
    'PDF',
    'performance-gauge',
    'Landscape'
);
```

Print:

```typescript
gauge.print();
```

### Pattern 6: Accessible Gauge

Include:

- A meaningful title.
- A gauge description.
- Textual current value.
- Textual range status.
- A dedicated live region.
- Native keyboard-accessible controls.
- Adequate contrast.
- Non-color status indicators.
- Reduced-motion handling.

Do not claim built-in arrow-key navigation unless it has been explicitly implemented and tested.

## Key Properties

### Gauge-Level Properties

```text
axes               -> Axis collection.
width               -> Gauge width.
height              -> Gauge height.
title               -> Visible gauge title.
titleStyle          -> Title appearance.
description         -> Assistive-technology description.
background          -> Gauge background.
border              -> Gauge border.
centerX             -> Horizontal center position.
centerY             -> Vertical center position.
theme               -> Built-in theme.
locale              -> Active locale.
enableRtl           -> RTL layout.
enablePointerDrag   -> Pointer dragging.
enableRangeDrag     -> Range dragging.
animationDuration   -> General animation duration.
tooltip             -> Tooltip settings.
legendSettings      -> Range legend settings.
allowImageExport    -> Image-export enablement.
allowPdfExport      -> PDF-export enablement.
allowPrint          -> Print enablement.
```

### Axis Properties

```text
minimum        -> Lowest axis value.
maximum        -> Highest axis value.
startAngle     -> Axis start angle.
endAngle       -> Axis end angle.
direction      -> ClockWise or AntiClockWise.
radius         -> Axis radius.
background     -> Axis background.
lineStyle      -> Axis-line appearance.
majorTicks     -> Major-tick settings.
minorTicks     -> Minor-tick settings.
labelStyle     -> Axis-label settings.
ranges         -> Range collection.
pointers       -> Pointer collection.
annotations    -> Annotation collection.
```

### Pointer Properties

```text
value                 -> Current pointer value.
type                  -> Needle, RangeBar, or Marker.
radius                -> Pointer radius.
pointerWidth          -> Needle or RangeBar width.
color                 -> Pointer color.
border                -> Pointer border.
cap                   -> Needle-cap settings.
needleTail            -> Needle-tail settings.
needleStartWidth      -> Needle starting width.
needleEndWidth        -> Needle ending width.
markerShape           -> Marker shape.
markerWidth           -> Marker width.
markerHeight          -> Marker height.
imageUrl              -> Image-marker URL.
roundedCornerRadius   -> RangeBar corner radius.
animation             -> Pointer animation.
linearGradient        -> Linear-gradient settings.
radialGradient        -> Radial-gradient settings.
```

### Range Properties

```text
start                -> Range start value.
end                  -> Range end value.
color                -> Range color.
radius               -> Range radius.
startWidth           -> Range starting width.
endWidth             -> Range ending width.
position             -> Inside, Outside, or Cross.
roundedCornerRadius  -> Range corner radius.
legendText           -> Range legend text.
border               -> Range border.
linearGradient       -> Linear-gradient settings.
radialGradient       -> Radial-gradient settings.
```

### Annotation Properties

```text
angle       -> Angular position.
radius      -> Distance from the axis center.
content     -> Text, HTML, function, or element ID.
zIndex      -> Stacking order as a string.
autoAngle   -> Automatic rotation.
description -> Accessible description.
textStyle   -> Plain-text appearance.
```

### Tooltip Properties

```text
enable                  -> Tooltip visibility.
type                    -> Pointer, Range, or Annotation.
format                  -> Pointer-value format.
template                -> HTML template.
fill                    -> Tooltip background.
border                  -> Tooltip border.
textStyle               -> Tooltip text appearance.
showAtMousePosition     -> Pointer tooltip mouse positioning.
rangeSettings           -> Range-tooltip settings.
annotationSettings      -> Annotation-tooltip settings.
enableAnimation         -> Tooltip animation.
```

## Important Events

```text
load
loaded
animationComplete
annotationRender
axisLabelRender
dragStart
dragMove
dragEnd
gaugeMouseMove
gaugeMouseClick
gaugeMouseLeave
legendRender
tooltipRender
beforePrint
beforeExport
afterExport
resized
```

Use configuration properties for static behavior and events for conditional runtime behavior.

Example:

```text
Use labelStyle.format for one static label format.
Use axisLabelRender for conditional label text.
```

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-circulargauge is installed for TypeScript.
✅ CircularGauge is imported.
✅ Every enabled TypeScript feature has a matching injected module.
✅ Every injected module is imported.
✅ The global EJ2 script loads before JavaScript application code.
✅ The HTML gauge host exists.
✅ The appendTo selector matches the host ID.
✅ The gauge has measurable width and height.
✅ At least one axis exists.
✅ Axis minimum is less than axis maximum.
✅ Pointer values remain within the corresponding axis range.
✅ Range values remain within the corresponding axis range.
✅ Range start is less than range end.
✅ Needle pointers use needleTail instead of tail.
✅ Cap borders use cap.border.
✅ Gauge borders use the border model.
✅ Tooltip borders use the border model.
✅ Range legends use legendText.
✅ Tooltips use GaugeTooltip in TypeScript.
✅ Annotations use Annotations in TypeScript.
✅ Gradients use Gradient in TypeScript.
✅ Export features include both injection and enablement properties.
✅ Pointer dragging uses enablePointerDrag.
✅ Range dragging uses enableRangeDrag.
✅ Programmatic pointer updates use setPointerValue.
✅ Dynamic annotation updates use setAnnotationValue when available.
✅ High-frequency events avoid expensive operations.
✅ Native controls are available when keyboard value editing is required.
✅ Color is not the only source of status information.
✅ Dynamic values are available in text.
✅ RTL layout and axis direction are configured separately.
✅ Locale data is loaded when required.
✅ Export behavior is tested when HTML annotations are present.
✅ Timers, event listeners, and gauge instances are cleaned up.
✅ Executable code contains no HTML entities or editor-generated markup.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Incorrect Drag Property

Incorrect:

```typescript
allowDragging: true
```

Correct:

```typescript
enablePointerDrag: true
```

### Incorrect Tooltip Module

Incorrect:

```typescript
import {
    Tooltip
} from '@syncfusion/ej2-circulargauge';
```

Correct:

```typescript
import {
    GaugeTooltip
} from '@syncfusion/ej2-circulargauge';
```

### Incorrect Needle Tail

Incorrect:

```typescript
tail: {
    length: '20%'
}
```

Correct:

```typescript
needleTail: {
    length: '20%'
}
```

### Incorrect Cap Border

Incorrect:

```typescript
cap: {
    borderWidth: 2,
    borderColor: '#333333'
}
```

Correct:

```typescript
cap: {
    border: {
        width: 2,
        color: '#333333'
    }
}
```

### Incorrect Gauge Border

Incorrect:

```typescript
borderWidth: 1,
borderColor: '#dddddd'
```

Correct:

```typescript
border: {
    width: 1,
    color: '#dddddd'
}
```

### Incorrect Range Legend Text

Incorrect:

```typescript
ranges: [{
    name: 'Normal'
}]
```

Correct:

```typescript
ranges: [{
    legendText: 'Normal'
}]
```

### Missing Export Enablement

Incorrect:

```typescript
CircularGauge.Inject(
    ImageExport
);
```

without:

```typescript
allowImageExport: true
```

Correct:

```typescript
CircularGauge.Inject(
    ImageExport
);

const gauge: CircularGauge =
    new CircularGauge({
        allowImageExport: true
    });
```

### Incorrect Image Export Dimensions

Avoid treating export arguments as arbitrary pixel dimensions:

```typescript
gauge.export(
    'PNG',
    'gauge',
    'Landscape',
    800,
    600
);
```

Use:

```typescript
gauge.export(
    'PNG',
    'gauge'
);
```

Render the gauge at a validated larger size before raster export, or use SVG for scalable output.

### Unsupported Value Change Event

Avoid:

```typescript
gauge.valueChange = (args) => {
    console.log(args.value);
};
```

Use:

```text
dragMove or dragEnd for pointer dragging.
setPointerValue for programmatic updates.
Application state updates in the same method that changes the gauge.
```

### Incorrect Keyboard Claims

Do not claim:

```text
Arrow keys change pointer values automatically.
Enter confirms pointer changes.
Every gauge element participates in Tab navigation.
```

Provide native buttons or inputs when keyboard editing is required.

### Incorrect Annotation Font Properties

Incorrect:

```typescript
annotations: [{
    fontFamily: 'Segoe UI',
    fontSize: '16px',
    fontColor: '#333333'
}]
```

Correct:

```typescript
annotations: [{
    textStyle: {
        fontFamily: 'Segoe UI',
        size: '16px',
        color: '#333333'
    }
}]
```

### Incorrect Annotation Z-Index

Avoid:

```typescript
zIndex: 1
```

Use:

```typescript
zIndex: '1'
```

### Combined and Individual CDN Scripts

Do not load the consolidated EJ2 script together with individual package scripts.

Use either:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

or:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"
></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"
></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-circulargauge/dist/global/ej2-circulargauge.min.js"></script>
```

Load `ej2-pdf-export` before `ej2-circulargauge` when individual scripts are used with PDF export.

### Constructor Selector Pattern

Avoid:

```typescript
const gauge =
    new CircularGauge({
        axes: []
    }, '#gauge');
```

Preferred:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        axes: []
    });

gauge.appendTo('#gauge');
```

### Encoded Executable HTML

Incorrect:

```html
<div id="gauge"></div>
```

Correct:

```html
<div id="gauge"></div>
```

### Missing Cleanup

When removing the view:

```typescript
window.clearInterval(
    intervalId
);

window.removeEventListener(
    'resize',
    resizeHandler
);

gauge.destroy();
```

### Editor-Generated Markup

Do not place the following inside executable TypeScript, JavaScript, HTML, CSS, templates, imports, commands, or CDN URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```