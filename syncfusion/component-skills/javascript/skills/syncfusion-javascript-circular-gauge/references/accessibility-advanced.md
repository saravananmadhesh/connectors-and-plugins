# Accessibility & Advanced

- #accessibility-overview
- #wcag-compliance
  - #color-contrast
  - #do-not-rely-on-color-alone
  - #accessible-descriptions
- #keyboard-support
  - #built-in-keyboard-navigation
  - #accessible-external-controls
  - #pointer-dragging
- #wai-aria-and-screen-readers
  - #built-in-aria-support
  - #accessible-page-structure
  - #dynamic-value-announcements
  - #annotation-accessibility
- #rtl-support
  - #enable-rtl
  - #axis-direction
  - #rtl-with-tooltip-and-legend
- #internationalization
  - #culture-and-currency
  - #number-formatting
  - #locale-data
- #ej1-to-ej2-migration
  - #initialization
  - #axis-migration
  - #pointer-migration
  - #annotation-migration
  - #event-migration
- #performance-guidance
  - #multiple-gauges
  - #pointer-updates
  - #animation
  - #high-frequency-events
  - #resource-cleanup
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Accessibility Overview

The Syncfusion Circular Gauge follows commonly used accessibility standards and guidelines, including:

```text
WCAG 2.2
Section 508
WAI-ARIA patterns
Screen-reader support
Right-to-left support
Color-contrast requirements
Mobile-device support
```

The Circular Gauge supplies accessible names and roles for supported elements such as the title, axis labels, legend items, text pointers, and annotations. Built-in keyboard navigation is listed as not applicable, so keyboard-adjustable gauge behavior should not be claimed unless it is implemented separately with accessible controls.

Accessibility must be evaluated as part of the full application. A gauge can provide accessible markup but still be difficult to use when:

- Text contrast is insufficient.
- Status is communicated only through color.
- Important values are available only through pointer interaction.
- Dynamic values are not announced.
- Custom annotations lack descriptions.
- External buttons do not have accessible names.
- RTL content is not localized.
- The page lacks a textual data alternative.

## WCAG Compliance

### Color Contrast

Use sufficient contrast between text and its background.

Recommended light-background label styling:

```typescript
labelStyle: {
    font: {
        fontFamily: 'Segoe UI',
        fontWeight: 'Normal',
        size: '14px',
        color: '#1a1a1a'
    }
}
```

Avoid low-contrast combinations:

```typescript
labelStyle: {
    font: {
        color: '#cccccc'
    }
}
```

when the gauge background is white or light gray.

Common WCAG contrast targets are:

```text
Normal text       -> At least 4.5:1
Large text        -> At least 3:1
Meaningful graphics and UI boundaries -> At least 3:1
```

Validate contrast between:

- Axis labels and gauge background.
- Title text and gauge background.
- Annotation text and annotation background.
- Legend text and legend background.
- Tooltip text and tooltip fill.
- Pointer and surrounding gauge elements.
- Focus indicators and adjacent colors.

The Circular Gauge documentation identifies color contrast as part of its accessibility support, but application-specific custom colors still require validation.

### Do Not Rely on Color Alone

Ranges commonly use green, yellow, and red, but color must not be the only method used to explain their meaning.

Use range legend text:

```typescript
ranges: [
    {
        start: 0,
        end: 40,
        legendText: 'Normal',
        color: '#107c10'
    },
    {
        start: 40,
        end: 70,
        legendText: 'Moderate',
        color: '#ffb900'
    },
    {
        start: 70,
        end: 100,
        legendText: 'Critical',
        color: '#d13438'
    }
]
```

Also provide one or more of the following:

```text
A visible gauge title
A visible value
A textual status
Range legend items
An annotation
A tooltip
An accessible description
A data summary outside the gauge
```

Example status:

```html
<p id="gauge-summary">
    Current performance is 65 percent.
    The status is Moderate.
</p>
```

This approach ensures that users do not need to distinguish colors to understand the gauge.

### Accessible Descriptions

Use the gauge-level `description` property to provide information for assistive technology.

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        description:
            'Performance gauge from 0 to 100. ' +
            'The current value is 65 percent, ' +
            'which is in the moderate range.',

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Keep the description:

- Concise.
- Meaningful.
- Consistent with the visible data.
- Updated when its value changes.
- Free of purely visual instructions such as “the red needle.”

## Keyboard Support

### Built-In Keyboard Navigation

Do not claim that the Circular Gauge provides general keyboard navigation through arrow keys, Enter, or Space.

The current accessibility documentation identifies keyboard navigation support as not applicable.

Avoid statements such as:

```text
Tab focuses every gauge element.
Arrow keys change the pointer value.
Enter confirms the value.
Space toggles the selected range.
```

unless those interactions are implemented and tested by the application.

### Accessible External Controls

When users must update a value without a mouse, provide native HTML controls.

Example:

```html
<div class="gauge-actions">
    <button id="decreaseButton" type="button">
        Decrease value
    </button>

    <button id="increaseButton" type="button">
        Increase value
    </button>
</div>

<div id="gauge"></div>

<p id="gauge-status" aria-live="polite">
    Current value: 65 percent.
</p>
```

Native buttons support:

```text
Tab and Shift+Tab for navigation
Enter and Space for activation
Visible focus indication
Screen-reader naming
```

TypeScript:

```typescript
let currentValue: number = 65;

const updateValue = (
    requestedValue: number
): void => {
    currentValue = Math.min(
        100,
        Math.max(0, requestedValue)
    );

    gauge.setPointerValue(
        0,
        0,
        currentValue
    );

    const status: HTMLElement | null =
        document.getElementById(
            'gauge-status'
        );

    if (status) {
        status.textContent =
            'Current value: ' +
            currentValue.toFixed(0) +
            ' percent.';
    }
};

document
    .getElementById('decreaseButton')
    ?.addEventListener('click', (): void => {
        updateValue(currentValue - 5);
    });

document
    .getElementById('increaseButton')
    ?.addEventListener('click', (): void => {
        updateValue(currentValue + 5);
    });
```

### Pointer Dragging

Pointer drag is enabled through:

```typescript
enablePointerDrag: true
```

Pointer dragging is a pointer-based interaction. It does not automatically create complete keyboard-adjustable slider behavior.

Use dragging as an optional enhancement:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        enablePointerDrag: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

When pointer dragging is enabled, also provide accessible buttons, a number input, or another native input for users who cannot perform drag gestures.

## WAI-ARIA and Screen Readers

### Built-In ARIA Support

Circular Gauge uses WAI-ARIA patterns for supported elements.

The documented behavior includes:

```text
role="region" on supported gauge elements
aria-label for accessible element names
```

Screen readers can read supported elements including:

- Axis labels.
- The gauge title.
- Legend item labels.
- Text pointers.
- Annotations.

Avoid overwriting component-generated roles or labels unless a tested application requirement makes it necessary.

### Accessible Page Structure

Wrap the visualization in semantic page content.

```html
<section
    aria-labelledby="performance-heading"
    aria-describedby="performance-description"
>
    <h2 id="performance-heading">
        Performance Monitor
    </h2>

    <p id="performance-description">
        The gauge displays performance from 0 to 100 percent.
        Values below 40 are normal, values from 40 to 70 are
        moderate, and values above 70 are critical.
    </p>

    <div id="gauge"></div>

    <p id="gauge-status" aria-live="polite">
        Current performance is 65 percent.
        Status is Moderate.
    </p>
</section>
```

This pattern provides:

- A visible heading.
- A persistent description.
- A dynamic status area.
- Context that does not depend on SVG interpretation.
- Information that remains available without hovering.

### Dynamic Value Announcements

Use a separate live region for dynamic values.

```html
<p
    id="gauge-status"
    aria-live="polite"
    aria-atomic="true"
>
    Current performance is 65 percent.
</p>
```

Update it when application code changes the pointer:

```typescript
const announceValue = (
    value: number
): void => {
    const status: HTMLElement | null =
        document.getElementById(
            'gauge-status'
        );

    if (status) {
        status.textContent =
            'Current performance is ' +
            value.toFixed(0) +
            ' percent.';
    }
};
```

Programmatic update:

```typescript
const value: number = 85;

gauge.setPointerValue(
    0,
    0,
    value
);

announceValue(value);
```

Do not rely on an unsupported `valueChange` event for programmatic updates. Update the pointer, accessible description, annotation, and live-region text in the same application operation.

### Annotation Accessibility

Use the annotation `description` property.

```typescript
annotations: [{
    angle: 180,
    radius: '30%',
    zIndex: '1',

    content:
        '<div class="gauge-value">' +
        '65%' +
        '</div>',

    description:
        'Current performance is 65 percent'
}]
```

The Circular Gauge accessibility documentation lists annotations among the elements that can be read by screen-reading software.

For dynamic annotations, update visible and accessible content together.

## RTL Support

### Enable RTL

Set `enableRtl` to `true`.

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        enableRtl: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

RTL mode affects supporting elements such as tooltips and legends. To reverse the numeric progression of the axis itself, configure the axis direction separately.

### Axis Direction

Use `AntiClockWise` when the axis values should progress in the opposite direction.

```typescript
axes: [{
    minimum: 0,
    maximum: 100,
    startAngle: 210,
    endAngle: 150,
    direction: 'AntiClockWise'
}]
```

Do not assume that:

```typescript
enableRtl: true
```

automatically reverses the axis scale.

The responsibilities are different:

```text
enableRtl       -> RTL layout for supporting gauge elements.
direction       -> Clockwise or anticlockwise axis progression.
```

### RTL with Tooltip and Legend

The correct tooltip feature module is `GaugeTooltip`.

```typescript
import {
    CircularGauge,
    GaugeTooltip,
    Legend
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    GaugeTooltip,
    Legend
);
```

Configuration:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        enableRtl: true,

        tooltip: {
            enable: true,
            type: [
                'Pointer',
                'Range'
            ]
        },

        legendSettings: {
            visible: true,
            position: 'Bottom',
            alignment: 'Center'
        },

        axes: [{
            minimum: 0,
            maximum: 100,
            direction: 'AntiClockWise',

            ranges: [
                {
                    start: 0,
                    end: 40,
                    legendText: 'طبيعي',
                    color: '#107c10'
                },
                {
                    start: 40,
                    end: 70,
                    legendText: 'متوسط',
                    color: '#ffb900'
                },
                {
                    start: 70,
                    end: 100,
                    legendText: 'حرج',
                    color: '#d13438'
                }
            ],

            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Use matching document metadata:

```html
<html lang="ar" dir="rtl">
```

For Hebrew:

```html
<html lang="he" dir="rtl">
```

Do not apply mathematical angle compensation such as:

```typescript
const angle =
    enableRtl
        ? 360 - baseAngle
        : baseAngle;
```

unless visual testing demonstrates that the specific annotation requires it. Annotation geometry does not automatically need manual RTL inversion.

## Internationalization

### Supported Content

Circular Gauge internationalization applies to:

- Axis labels.
- Tooltip values.

### Culture and Currency

Import culture helpers from `@syncfusion/ej2-base`.

```typescript
import {
    setCulture,
    setCurrencyCode
} from '@syncfusion/ej2-base';
```

Set the culture and currency before creating the gauge:

```typescript
setCulture('de');
setCurrencyCode('EUR');
```

Create the gauge:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        locale: 'de',

        axes: [{
            minimum: 0,
            maximum: 1000,

            labelStyle: {
                format: 'c'
            },

            pointers: [{
                value: 650
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Syncfusion documents culture and currency configuration through the EJ2 internationalization utilities, with `labelStyle.format` used for numeric formatting.

### Number Formatting

Currency:

```typescript
labelStyle: {
    format: 'c'
}
```

Number with two decimal places:

```typescript
labelStyle: {
    format: 'n2'
}
```

Percentage formatting:

```typescript
labelStyle: {
    format: 'p1'
}
```

Static unit suffix:

```typescript
labelStyle: {
    format: '{value} km/h'
}
```

Do not manually promise exact locale output without validating:

- Loaded CLDR data.
- Active EJ2 culture.
- Browser environment.
- Number format.
- Currency code.

### Locale Data

Some cultures require CLDR data to be loaded before localized formatting is available.

Example structure:

```typescript
import {
    loadCldr,
    setCulture,
    setCurrencyCode
} from '@syncfusion/ej2-base';

import * as numberingSystems from
    'cldr-data/supplemental/numberingSystems.json';

import * as gregorian from
    'cldr-data/main/de/ca-gregorian.json';

import * as numbers from
    'cldr-data/main/de/numbers.json';

import * as timeZoneNames from
    'cldr-data/main/de/timeZoneNames.json';

import * as currencies from
    'cldr-data/main/de/currencies.json';

loadCldr(
    numberingSystems,
    gregorian,
    numbers,
    timeZoneNames,
    currencies
);

setCulture('de');
setCurrencyCode('EUR');
```

Load only the locale data required by the application.

## EJ1 to EJ2 Migration

EJ1 and EJ2 use different packages, initialization patterns, property structures, and feature models.

Do not perform migration through property-name replacement alone. Validate each EJ1 behavior against the current EJ2 API.

Syncfusion provides a detailed migration reference covering gauge dimensions, axes, lines, direction, radius, angles, labels, pointers, ranges, annotations, and other features.

### Initialization

EJ1:

```javascript
$('#gauge').ejCircularGauge({
    // EJ1 configuration
});
```

EJ2:

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge =
    new CircularGauge({
        // EJ2 configuration
    });

gauge.appendTo('#gauge');
```

### Axis Migration

EJ1 commonly uses `scales`.

```javascript
scales: [{
    radius: 150,
    direction: 'counterclockwise'
}]
```

EJ2 uses `axes`.

```typescript
axes: [{
    radius: '150',
    direction: 'AntiClockWise'
}]
```

The migration reference maps EJ1 `scales` behaviors to EJ2 `axes` configuration and maps the EJ1 counterclockwise direction to EJ2 `AntiClockWise`.

### Axis-Line Migration

EJ1:

```javascript
scales: [{
    showScaleBar: true,
    size: 6,
    backgroundColor: 'red'
}]
```

EJ2:

```typescript
axes: [{
    lineStyle: {
        width: 6,
        color: 'red'
    }
}]
```

Use:

```text
axes[].lineStyle.width
axes[].lineStyle.color
```

The official migration reference maps EJ1 scale-bar width and color to EJ2 axis-line settings.

### Angle Migration

EJ1 uses properties such as `startAngle` and `sweepAngle`.

EJ2 uses:

```typescript
axes: [{
    startAngle: 200,
    endAngle: 150
}]
```

Do not copy an EJ1 `sweepAngle` directly into EJ2 `endAngle`. Calculate and validate the intended start/end geometry.

### Pointer Migration

EJ2 pointer configuration is nested inside the axis:

```typescript
axes: [{
    pointers: [{
        value: 65,
        type: 'Needle',

        cap: {
            radius: 8
        },

        needleTail: {
            length: '20%'
        },

        animation: {
            enable: true,
            duration: 800
        }
    }]
}]
```

Use:

```text
cap        -> Needle cap configuration
needleTail -> Needle-tail configuration
animation  -> Pointer animation configuration
```

### Annotation Migration

EJ2 annotations require the `Annotations` module in TypeScript.

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);
```

Configuration:

```typescript
axes: [{
    annotations: [{
        angle: 180,
        radius: '30%',
        zIndex: '1',

        content:
            '<div>Current value: 65</div>',

        description:
            'Current value is 65'
    }]
}]
```

Do not assume that every EJ1 indicator maps directly to an EJ2 annotation. Determine whether the EJ1 element represents:

- A range.
- A pointer.
- A marker.
- An annotation.
- A custom HTML element.

### Event Migration

Do not apply a broad rule such as:

```text
EJ1 change -> EJ2 valueChange
```

Circular Gauge programmatic pointer updates should use:

```typescript
gauge.setPointerValue(
    axisIndex,
    pointerIndex,
    value
);
```

Pointer dragging should use:

```text
dragStart
dragMove
dragEnd
```

Mouse interaction can use:

```text
gaugeMouseMove
gaugeMouseClick
gaugeMouseLeave
```

Validate every migrated event against the current Circular Gauge event model.

## Performance Guidance

### Multiple Gauges

Create gauges only when their containers are needed.

```typescript
const gauges:
    Record<string, CircularGauge> = {};

const createGauge = (
    id: string,
    value: number
): CircularGauge => {
    if (gauges[id]) {
        return gauges[id];
    }

    const gauge: CircularGauge =
        new CircularGauge({
            width: '100%',
            height: '300px',

            axes: [{
                minimum: 0,
                maximum: 100,

                pointers: [{
                    value,
                    type: 'Needle',

                    animation: {
                        enable: false
                    }
                }]
            }]
        });

    gauge.appendTo('#' + id);
    gauges[id] = gauge;

    return gauge;
};
```

Do not use an array indexed by an arbitrary string:

```typescript
const gauges = [];
gauges[id] = gauge;
```

Use a typed record or `Map`.

### Pointer Updates

Use `setPointerValue` instead of rebuilding or refreshing the whole gauge.

Preferred:

```typescript
gauge.setPointerValue(
    0,
    0,
    newValue
);
```

Avoid:

```typescript
gauge.axes[0]
    .pointers[0]
    .value = newValue;

gauge.refresh();
```

for a simple pointer update when the public pointer-update method is available.

### Animation

Disable pointer animation when:

- Many gauges render simultaneously.
- Values update several times per second.
- The application is running on low-powered hardware.
- Stable snapshots are required.
- Users prefer reduced motion.

```typescript
pointers: [{
    value: 65,
    type: 'Needle',

    animation: {
        enable: false
    }
}]
```

Respect reduced-motion preferences at the application level:

```typescript
const reduceMotion: boolean =
    window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

const gauge: CircularGauge =
    new CircularGauge({
        axes: [{
            pointers: [{
                value: 65,

                animation: {
                    enable: !reduceMotion,
                    duration:
                        reduceMotion
                            ? 0
                            : 800
                }
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### High-Frequency Events

Avoid expensive processing in:

```text
dragMove
gaugeMouseMove
resize
```

Prefer:

- Updating lightweight text only.
- Deferring network calls until `dragEnd`.
- Debouncing resize operations.
- Throttling external dashboard synchronization.

Example:

```typescript
dragEnd: (
    args: PointerDragEventArgs
): void => {
    saveValue(args.currentValue);
}
```

### Batch Updates

Do not use undocumented APIs such as:

```typescript
gauge.beginUpdate();
gauge.endUpdate();
```

unless they are explicitly available in the installed Circular Gauge API.

For several pointer updates:

```typescript
gauge.setPointerValue(
    0,
    0,
    value1
);

gauge.setPointerValue(
    0,
    1,
    value2
);

gauge.setPointerValue(
    0,
    2,
    value3
);
```

If several structural properties must change, update the models and perform one validated `refresh()` after all assignments.

### Resource Cleanup

Destroy a gauge when its host view is removed.

```typescript
gauge.destroy();
```

Clear timers:

```typescript
window.clearInterval(
    intervalId
);
```

Remove custom listeners:

```typescript
window.removeEventListener(
    'resize',
    resizeHandler
);
```

This prevents:

- Duplicate updates.
- Detached DOM references.
- Unnecessary timer execution.
- Memory leaks in single-page applications.

## Complete TypeScript Example

### Required HTML

```html
<main>
    <section
        aria-labelledby="gauge-heading"
        aria-describedby="gauge-description"
    >
        <h1 id="gauge-heading">
            Performance Monitor
        </h1>

        <p id="gauge-description">
            Performance is measured from 0 to 100 percent.
            Values below 40 are normal, values from 40 to 70
            are moderate, and values above 70 are critical.
        </p>

        <div class="gauge-actions">
            <button id="decreaseButton" type="button">
                Decrease performance
            </button>

            <button id="increaseButton" type="button">
                Increase performance
            </button>
        </div>

        <div id="gauge"></div>

        <p
            id="gauge-status"
            aria-live="polite"
            aria-atomic="true"
        >
            Current performance is 65 percent.
            Status is Moderate.
        </p>
    </section>
</main>
```

### Required CSS

```css
.gauge-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
}

.gauge-actions button {
    padding: 8px 14px;
    color: #1a1a1a;
    background: #ffffff;
    border: 1px solid #666666;
    border-radius: 4px;
    cursor: pointer;
}

.gauge-actions button:focus-visible {
    outline: 3px solid #005a9c;
    outline-offset: 2px;
}

#gauge {
    width: 100%;
    min-height: 450px;
}
```

### TypeScript

```typescript
import {
    CircularGauge,
    Annotations,
    GaugeTooltip,
    Legend,
    PointerDragEventArgs
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    Annotations,
    GaugeTooltip,
    Legend
);

const minimum: number = 0;
const maximum: number = 100;

let currentValue: number = 65;

const clamp = (
    value: number
): number => {
    return Math.min(
        maximum,
        Math.max(minimum, value)
    );
};

const getStatus = (
    value: number
): string => {
    if (value > 70) {
        return 'Critical';
    }

    if (value >= 40) {
        return 'Moderate';
    }

    return 'Normal';
};

const getAnnotationContent = (
    value: number
): string => {
    return (
        '<div style="' +
        'min-width:100px;' +
        'padding:8px 12px;' +
        'color:#1a1a1a;' +
        'background:#ffffff;' +
        'border:1px solid #666666;' +
        'border-radius:6px;' +
        'font-family:Segoe UI;' +
        'text-align:center;' +
        '">' +
        '<span style="' +
        'display:block;' +
        'font-size:12px;' +
        '">' +
        'Performance' +
        '</span>' +
        '<strong style="' +
        'display:block;' +
        'font-size:26px;' +
        '">' +
        value.toFixed(0) +
        '%' +
        '</strong>' +
        '<span style="' +
        'display:block;' +
        'font-size:12px;' +
        '">' +
        getStatus(value) +
        '</span>' +
        '</div>'
    );
};

const statusElement: HTMLElement | null =
    document.getElementById(
        'gauge-status'
    );

const updateAccessibleStatus = (
    value: number
): void => {
    const status: string =
        getStatus(value);

    if (statusElement) {
        statusElement.textContent =
            'Current performance is ' +
            value.toFixed(0) +
            ' percent. Status is ' +
            status +
            '.';
    }

    gauge.description =
        'Performance gauge from 0 to 100. ' +
        'The current value is ' +
        value.toFixed(0) +
        ' percent. Status is ' +
        status +
        '.';
};

const reduceMotion: boolean =
    window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',
        title: 'Performance Gauge',
        description:
            'Performance gauge from 0 to 100. ' +
            'The current value is 65 percent. ' +
            'Status is Moderate.',
        enablePointerDrag: true,
        enableRtl: false,
        locale: 'en-US',

        titleStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Bold',
            size: '18px',
            color: '#1a1a1a'
        },

        tooltip: {
            enable: true,
            type: [
                'Pointer',
                'Range'
            ],
            fill: '#1a1a1a',

            border: {
                width: 1,
                color: '#ffffff'
            },

            textStyle: {
                fontFamily: 'Segoe UI',
                size: '12px',
                color: '#ffffff'
            }
        },

        legendSettings: {
            visible: true,
            position: 'Bottom',
            alignment: 'Center',

            textStyle: {
                fontFamily: 'Segoe UI',
                size: '12px',
                color: '#1a1a1a'
            }
        },

        axes: [{
            minimum,
            maximum,
            startAngle: 230,
            endAngle: 130,
            direction: 'ClockWise',
            radius: '88%',

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
                color: '#666666'
            },

            labelStyle: {
                position: 'Inside',
                format: '{value}%',

                font: {
                    fontFamily: 'Segoe UI',
                    size: '12px',
                    color: '#1a1a1a'
                }
            },

            ranges: [
                {
                    start: 0,
                    end: 40,
                    legendText: 'Normal',
                    color: '#107c10',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 40,
                    end: 70,
                    legendText: 'Moderate',
                    color: '#b35c00',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 70,
                    end: 100,
                    legendText: 'Critical',
                    color: '#b10e1e',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                }
            ],

            pointers: [{
                value: currentValue,
                type: 'Needle',
                radius: '75%',
                pointerWidth: 8,
                color: '#005a9c',

                cap: {
                    radius: 9,
                    color: '#005a9c',

                    border: {
                        width: 2,
                        color: '#1a1a1a'
                    }
                },

                needleTail: {
                    length: '20%',
                    color: '#005a9c'
                },

                animation: {
                    enable: !reduceMotion,
                    duration:
                        reduceMotion
                            ? 0
                            : 800
                }
            }],

            annotations: [{
                angle: 180,
                radius: '30%',
                zIndex: '1',
                autoAngle: false,
                content:
                    getAnnotationContent(
                        currentValue
                    ),
                description:
                    'Current performance is ' +
                    '65 percent. ' +
                    'Status is Moderate.'
            }]
        }],

        dragMove: (
            args: PointerDragEventArgs
        ): void => {
            currentValue =
                clamp(args.currentValue);

            gauge.setAnnotationValue(
                0,
                0,
                getAnnotationContent(
                    currentValue
                )
            );

            updateAccessibleStatus(
                currentValue
            );
        }
    });

gauge.appendTo('#gauge');

const updateGauge = (
    requestedValue: number
): void => {
    currentValue =
        clamp(requestedValue);

    gauge.setPointerValue(
        0,
        0,
        currentValue
    );

    gauge.setAnnotationValue(
        0,
        0,
        getAnnotationContent(
            currentValue
        )
    );

    updateAccessibleStatus(
        currentValue
    );
};

document
    .getElementById('decreaseButton')
    ?.addEventListener('click', (): void => {
        updateGauge(
            currentValue - 5
        );
    });

document
    .getElementById('increaseButton')
    ?.addEventListener('click', (): void => {
        updateGauge(
            currentValue + 5
        );
    });
```

## Complete JavaScript Example

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Accessible Circular Gauge</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        .gauge-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 12px;
        }

        .gauge-actions button {
            padding: 8px 14px;
            color: #1a1a1a;
            background: #ffffff;
            border: 1px solid #666666;
            border-radius: 4px;
            cursor: pointer;
        }

        .gauge-actions button:focus-visible {
            outline: 3px solid #005a9c;
            outline-offset: 2px;
        }

        #gauge {
            width: 100%;
            min-height: 450px;
        }
    </style>
</head>
<body>
    <main>
        <section
            aria-labelledby="gauge-heading"
            aria-describedby="gauge-description"
        >
            <h1 id="gauge-heading">
                Performance Monitor
            </h1>

            <p id="gauge-description">
                Performance is measured from 0 to 100 percent.
                Values below 40 are normal, values from 40 to
                70 are moderate, and values above 70 are critical.
            </p>

            <div class="gauge-actions">
                <button
                    id="decreaseButton"
                    type="button"
                >
                    Decrease performance
                </button>

                <button
                    id="increaseButton"
                    type="button"
                >
                    Increase performance
                </button>
            </div>

            <div id="gauge"></div>

            <p
                id="gauge-status"
                aria-live="polite"
                aria-atomic="true"
            >
                Current performance is 65 percent.
                Status is Moderate.
            </p>
        </section>
    </main>

    <script>
        var minimum = 0;
        var maximum = 100;
        var currentValue = 65;

        function clamp(value) {
            return Math.min(
                maximum,
                Math.max(minimum, value)
            );
        }

        function getStatus(value) {
            if (value > 70) {
                return 'Critical';
            }

            if (value >= 40) {
                return 'Moderate';
            }

            return 'Normal';
        }

        function getAnnotationContent(value) {
            return (
                '<div style="' +
                'min-width:100px;' +
                'padding:8px 12px;' +
                'color:#1a1a1a;' +
                'background:#ffffff;' +
                'border:1px solid #666666;' +
                'border-radius:6px;' +
                'font-family:Segoe UI;' +
                'text-align:center;' +
                '">' +
                '<span style="' +
                'display:block;' +
                'font-size:12px;' +
                '">' +
                'Performance' +
                '</span>' +
                '<strong style="' +
                'display:block;' +
                'font-size:26px;' +
                '">' +
                value.toFixed(0) +
                '%' +
                '</strong>' +
                '<span style="' +
                'display:block;' +
                'font-size:12px;' +
                '">' +
                getStatus(value) +
                '</span>' +
                '</div>'
            );
        }

        var statusElement =
            document.getElementById(
                'gauge-status'
            );

        function updateAccessibleStatus(value) {
            var status =
                getStatus(value);

            if (statusElement) {
                statusElement.textContent =
                    'Current performance is ' +
                    value.toFixed(0) +
                    ' percent. Status is ' +
                    status +
                    '.';
            }

            gauge.description =
                'Performance gauge from 0 to 100. ' +
                'The current value is ' +
                value.toFixed(0) +
                ' percent. Status is ' +
                status +
                '.';
        }

        var reduceMotion =
            window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches;

        var gauge =
            new ej.circulargauge.CircularGauge({
                width: '100%',
                height: '450px',
                title: 'Performance Gauge',
                description:
                    'Performance gauge from 0 to 100. ' +
                    'The current value is 65 percent. ' +
                    'Status is Moderate.',
                enablePointerDrag: true,
                enableRtl: false,
                locale: 'en-US',

                titleStyle: {
                    fontFamily: 'Segoe UI',
                    fontStyle: 'Normal',
                    fontWeight: 'Bold',
                    size: '18px',
                    color: '#1a1a1a'
                },

                tooltip: {
                    enable: true,
                    type: [
                        'Pointer',
                        'Range'
                    ],
                    fill: '#1a1a1a',

                    border: {
                        width: 1,
                        color: '#ffffff'
                    },

                    textStyle: {
                        fontFamily: 'Segoe UI',
                        size: '12px',
                        color: '#ffffff'
                    }
                },

                legendSettings: {
                    visible: true,
                    position: 'Bottom',
                    alignment: 'Center',

                    textStyle: {
                        fontFamily: 'Segoe UI',
                        size: '12px',
                        color: '#1a1a1a'
                    }
                },

                axes: [{
                    minimum: minimum,
                    maximum: maximum,
                    startAngle: 230,
                    endAngle: 130,
                    direction: 'ClockWise',
                    radius: '88%',

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
                        color: '#666666'
                    },

                    labelStyle: {
                        position: 'Inside',
                        format: '{value}%',

                        font: {
                            fontFamily: 'Segoe UI',
                            size: '12px',
                            color: '#1a1a1a'
                        }
                    },

                    ranges: [
                        {
                            start: 0,
                            end: 40,
                            legendText: 'Normal',
                            color: '#107c10',
                            radius: '95%',
                            startWidth: 10,
                            endWidth: 10
                        },
                        {
                            start: 40,
                            end: 70,
                            legendText: 'Moderate',
                            color: '#b35c00',
                            radius: '95%',
                            startWidth: 10,
                            endWidth: 10
                        },
                        {
                            start: 70,
                            end: 100,
                            legendText: 'Critical',
                            color: '#b10e1e',
                            radius: '95%',
                            startWidth: 10,
                            endWidth: 10
                        }
                    ],

                    pointers: [{
                        value: currentValue,
                        type: 'Needle',
                        radius: '75%',
                        pointerWidth: 8,
                        color: '#005a9c',

                        cap: {
                            radius: 9,
                            color: '#005a9c',

                            border: {
                                width: 2,
                                color: '#1a1a1a'
                            }
                        },

                        needleTail: {
                            length: '20%',
                            color: '#005a9c'
                        },

                        animation: {
                            enable: !reduceMotion,
                            duration:
                                reduceMotion
                                    ? 0
                                    : 800
                        }
                    }],

                    annotations: [{
                        angle: 180,
                        radius: '30%',
                        zIndex: '1',
                        autoAngle: false,
                        content:
                            getAnnotationContent(
                                currentValue
                            ),
                        description:
                            'Current performance is ' +
                            '65 percent. ' +
                            'Status is Moderate.'
                    }]
                }],

                dragMove: function (args) {
                    currentValue =
                        clamp(
                            args.currentValue
                        );

                    gauge.setAnnotationValue(
                        0,
                        0,
                        getAnnotationContent(
                            currentValue
                        )
                    );

                    updateAccessibleStatus(
                        currentValue
                    );
                }
            });

        gauge.appendTo('#gauge');

        function updateGauge(requestedValue) {
            currentValue =
                clamp(requestedValue);

            gauge.setPointerValue(
                0,
                0,
                currentValue
            );

            gauge.setAnnotationValue(
                0,
                0,
                getAnnotationContent(
                    currentValue
                )
            );

            updateAccessibleStatus(
                currentValue
            );
        }

        var decreaseButton =
            document.getElementById(
                'decreaseButton'
            );

        var increaseButton =
            document.getElementById(
                'increaseButton'
            );

        if (decreaseButton) {
            decreaseButton.addEventListener(
                'click',
                function () {
                    updateGauge(
                        currentValue - 5
                    );
                }
            );
        }

        if (increaseButton) {
            increaseButton.addEventListener(
                'click',
                function () {
                    updateGauge(
                        currentValue + 5
                    );
                }
            );
        }
    </script>
</body>
</html>
```

## Runtime Validation Checklist

```text
✅ CircularGauge is imported in TypeScript.
✅ Annotations is imported and injected when annotations are used.
✅ GaugeTooltip is imported and injected when tooltips are enabled.
✅ Legend is imported and injected when the legend is visible.
✅ The global EJ2 script loads before JavaScript application code.
✅ The HTML host element exists.
✅ gauge.appendTo('#gauge') is called.
✅ The gauge contains a meaningful title.
✅ The gauge-level description explains its purpose and current state.
✅ Important values are available as text outside the gauge.
✅ Dynamic values are announced through an aria-live region.
✅ Color is not the only method used to communicate range status.
✅ Text and graphics meet the required contrast targets.
✅ Native controls provide keyboard-accessible value updates.
✅ Pointer dragging is not treated as complete keyboard navigation.
✅ enablePointerDrag is used instead of allowDragging.
✅ The application does not claim built-in arrow-key navigation.
✅ Annotation descriptions are provided for meaningful content.
✅ enableRtl controls RTL layout.
✅ axis.direction controls clockwise or anticlockwise progression.
✅ GaugeTooltip is used instead of a generic Tooltip module.
✅ Locale-specific formatting is tested with required CLDR data.
✅ EJ1 properties are mapped individually to current EJ2 APIs.
✅ setPointerValue is used for efficient pointer updates.
✅ High-frequency event handlers avoid expensive work.
✅ Reduced-motion preferences are considered.
✅ Timers and component instances are cleaned up when no longer needed.
✅ No editor-generated markup exists inside executable code.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Incorrect WCAG Version

Avoid limiting the statement to:

```text
Circular Gauge follows WCAG 2.1.
```

The current accessibility documentation identifies WCAG 2.2 support.

### Incorrect Keyboard Navigation Claim

Incorrect:

```text
Tab focuses the gauge.
Arrow keys change the pointer.
Enter confirms the value.
```

The accessibility documentation lists keyboard navigation as not applicable.

Provide native controls instead:

```html
<button id="decreaseButton" type="button">
    Decrease
</button>

<button id="increaseButton" type="button">
    Increase
</button>
```

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

### Misusing `role="application"`

Avoid:

```html
<div
    id="gauge"
    role="application"
></div>
```

`role="application"` can change screen-reader interaction behavior and should not be added to a non-application graphic without a strong, tested requirement.

Prefer semantic surrounding content and the component's built-in ARIA behavior.

### Invalid ARIA Slider Attributes

Avoid placing slider-specific properties on a generic gauge container:

```html
<div
    id="gauge"
    role="application"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow="65"
></div>
```

These properties are normally associated with a widget role that supports a value, such as `slider` or `progressbar`.

For a display-only gauge, provide:

- A gauge description.
- A textual current value.
- A status message.
- A live region for updates.

### Live Region on the Entire Gauge

Avoid:

```html
<div
    id="gauge"
    aria-live="polite"
></div>
```

A gauge refresh can update many generated SVG nodes and produce excessive announcements.

Use a small dedicated live region:

```html
<p
    id="gauge-status"
    aria-live="polite"
    aria-atomic="true"
>
    Current value: 65 percent.
</p>
```

### Unsupported Value Change Event

Avoid:

```typescript
gauge.valueChange = (args) => {
    // Update accessibility state
};
```

For programmatic updates, update all related state in the same application method.

For dragging, use:

```text
dragMove
dragEnd
```

### Incorrect Range Legend Property

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

### RTL Does Not Reverse the Axis Automatically

Incorrect assumption:

```typescript
enableRtl: true
```

automatically makes axis values progress anticlockwise.

Correct:

```typescript
enableRtl: true,

axes: [{
    direction: 'AntiClockWise'
}]
```

Syncfusion documents RTL layout and axis direction as separate configurations.

### Unnecessary RTL Annotation Compensation

Avoid:

```typescript
const angle =
    enableRtl
        ? 360 - baseAngle
        : baseAngle;
```

unless the rendered annotation position has been tested and requires that adjustment.

### Locale Alone May Be Insufficient

Avoid assuming that this always loads all localization data:

```typescript
locale: 'de'
```

For full number and currency formatting, configure the culture, currency, and required CLDR data.

### Unsafe Migration Assumptions

Avoid a simplified migration table that implies every EJ1 property has one direct EJ2 equivalent.

Migration must consider:

```text
Initialization model
Axis structure
Pointer model
Range model
Annotation model
Event model
Module injection
Sizing units
Rendering behavior
```

Use the official migration reference for detailed property mappings.

### Incorrect EJ1 Event Migration

Avoid:

```text
EJ1 change -> EJ2 valueChange
```

Use current EJ2 APIs according to the interaction:

```text
Programmatic pointer update -> setPointerValue
Pointer drag                -> dragStart, dragMove, dragEnd
Mouse interaction           -> gaugeMouseMove, gaugeMouseClick
```

### Undocumented Batch APIs

Avoid:

```typescript
gauge.beginUpdate();
gauge.endUpdate();
```

unless the installed Circular Gauge type definitions explicitly expose those methods.

### Array Used as a String-Keyed Map

Avoid:

```typescript
const gauges = [];
gauges[id] = gauge;
```

Prefer:

```typescript
const gauges:
    Record<string, CircularGauge> = {};
```

or:

```typescript
const gauges:
    Map<string, CircularGauge> =
        new Map();
```

### Recreating the Gauge for Pointer Updates

Avoid destroying and recreating the gauge for every value change.

Use:

```typescript
gauge.setPointerValue(
    0,
    0,
    value
);
```

### High-Frequency Full Refresh

Avoid:

```typescript
dragMove: (args) => {
    gauge.axes[0]
        .pointers[0]
        .value =
            args.currentValue;

    gauge.refresh();
}
```

The pointer is already moving during drag. Update only lightweight external content or an annotation when required.

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

### Encoded Executable HTML

Incorrect:

```html
<div id="gauge"></div>
```

Correct:

```html
<div id="gauge"></div>
```

### Unversioned or Corrupted CDN URL

Incorrect:

```html
  <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

Correct versioned URL:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Editor-Generated Markup

Do not place the following inside executable TypeScript, JavaScript, HTML, CSS, imports, templates, commands, or CDN URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```