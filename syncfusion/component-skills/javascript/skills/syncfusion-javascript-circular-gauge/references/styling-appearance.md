# Styling & Appearance

- #color-schemes
  - #axis-line-color
  - #pointer-colors
  - #range-colors
  - #tick-colors
- #themes
  - #built-in-themes
  - #runtime-theme-switching
- #font-customization
  - #axis-label-font
  - #title-font
- #borders-and-backgrounds
  - #gauge-background
  - #gauge-border
  - #axis-background
  - #pointer-border
- #gradients
  - #required-gradient-module
  - #pointer-linear-gradient
  - #range-linear-gradient
  - #radial-gradient
- #gauge-position
- #responsive-design
  - #responsive-container
  - #resize-handling
  - #responsive-fonts
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Color Schemes

### Purpose

Circular Gauge colors can be configured independently for:

```text
Gauge background
Gauge border
Axis line
Major ticks
Minor ticks
Axis labels
Pointers
Pointer caps
Needle tails
Ranges
Title
Annotations
```

Use explicit colors when:

- The gauge must match application branding.
- Ranges represent business states.
- Pointer values require visual emphasis.
- The selected built-in theme does not provide the required colors.
- Higher contrast is required.

Do not rely only on color to communicate status. Combine colors with labels, titles, annotations, pointer values, or accessible descriptions.

### Axis Line Color

Use `axes[].lineStyle.color` to set the axis-line color.

```typescript
axes: [{
    lineStyle: {
        width: 8,
        color: '#ff6347'
    }
}]
```

Property behavior:

```text
width -> Controls axis-line thickness.
color -> Controls axis-line color.
```

#### Complete TypeScript Axis-Line Example

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',

    axes: [{
        minimum: 0,
        maximum: 100,
        startAngle: 230,
        endAngle: 130,

        lineStyle: {
            width: 8,
            color: '#ff6347'
        },

        pointers: [{
            value: 65,
            type: 'Needle'
        }]
    }]
});

gauge.appendTo('#gauge');
```

#### Complete JavaScript Axis-Line Example

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,

            lineStyle: {
                width: 8,
                color: '#ff6347'
            },

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Pointer Colors

Use `color` to set the pointer color.

For a needle pointer, configure the needle, cap, and tail independently.

```typescript
pointers: [{
    value: 65,
    type: 'Needle',
    color: '#0066cc',

    cap: {
        radius: 10,
        color: '#ff6347',

        border: {
            width: 2,
            color: '#333333'
        }
    },

    needleTail: {
        length: '25%',
        color: '#0066cc',

        border: {
            width: 1,
            color: '#333333'
        }
    }
}]
```

Use:

```text
color       -> Needle body color.
cap.color   -> Center-cap color.
needleTail.color -> Needle-tail color.
border      -> Pointer border.
cap.border  -> Cap border.
needleTail.border -> Tail border.
```

Do not use:

```typescript
tail: {
    color: '#0066cc'
}
```

Use:

```typescript
needleTail: {
    color: '#0066cc'
}
```

Do not configure cap borders with direct `borderColor` and `borderWidth` properties.

Incorrect:

```typescript
cap: {
    color: '#ff6347',
    borderWidth: 2,
    borderColor: '#333333'
}
```

Correct:

```typescript
cap: {
    color: '#ff6347',

    border: {
        width: 2,
        color: '#333333'
    }
}
```

### Range Colors

Use `axes[].ranges` to divide the gauge scale into visually meaningful sections.

```typescript
ranges: [
    {
        start: 0,
        end: 40,
        color: '#107c10',
        startWidth: 10,
        endWidth: 10
    },
    {
        start: 40,
        end: 70,
        color: '#ffb900',
        startWidth: 10,
        endWidth: 10
    },
    {
        start: 70,
        end: 100,
        color: '#d13438',
        startWidth: 10,
        endWidth: 10
    }
]
```

Example interpretation:

```text
0 to 40   -> Normal
40 to 70  -> Warning
70 to 100 -> Critical
```

Ensure every range:

- Uses values within the axis minimum and maximum.
- Has a start value lower than its end value.
- Does not overlap unintentionally.
- Uses a readable width.
- Is explained through labels, a title, an annotation, or surrounding content.

### Tick Colors

Use `majorTicks.color` and `minorTicks.color`.

```typescript
majorTicks: {
    interval: 10,
    width: 2,
    height: 10,
    color: '#333333',
    position: 'Inside'
}
```

```typescript
minorTicks: {
    interval: 2,
    width: 1,
    height: 5,
    color: '#777777',
    position: 'Inside'
}
```

Use stronger contrast for major ticks and lower visual emphasis for minor ticks.

## Themes

### Purpose

Use the gauge-level `theme` property to apply a built-in visual theme.

```typescript
theme: 'Material'
```

A theme supplies default colors and styles for gauge elements. Explicit properties can override the selected theme.

### Built-In Themes

Common theme families include:

```text
Material
MaterialDark
Material3
Material3Dark
Fabric
FabricDark
Bootstrap
Bootstrap4
Bootstrap5
Bootstrap5Dark
Fluent
FluentDark
Fluent2
Fluent2Dark
HighContrast
Tailwind
TailwindDark
Tailwind3
Tailwind3Dark
```

Use a theme supported by the installed Essential JS 2 version.

Theme guidance:

```text
Material or Material3 -> Modern general applications.
Fabric                 -> Applications using the older Fabric design language.
Fluent or Fluent2      -> Microsoft-aligned interfaces.
Bootstrap              -> Bootstrap-based applications.
Tailwind               -> Tailwind-oriented interfaces.
HighContrast           -> High-contrast presentation.
Dark variants          -> Applications with dark backgrounds.
```

### Complete TypeScript Theme Example

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',
    theme: 'Material',
    title: 'System Performance',

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

### Complete JavaScript Theme Example

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',
        theme: 'Material',
        title: 'System Performance',

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

### Runtime Theme Switching

Update `theme` and call `refresh()`.

Required HTML:

```html
<button id="materialButton" type="button">
    Material
</button>

<button id="highContrastButton" type="button">
    High Contrast
</button>

<div id="gauge"></div>
```

TypeScript:

```typescript
document
    .getElementById('materialButton')
    ?.addEventListener('click', (): void => {
        gauge.theme = 'Material';
        gauge.refresh();
    });

document
    .getElementById('highContrastButton')
    ?.addEventListener('click', (): void => {
        gauge.theme = 'HighContrast';
        gauge.refresh();
    });
```

JavaScript:

```javascript
var materialButton =
    document.getElementById('materialButton');

var highContrastButton =
    document.getElementById(
        'highContrastButton'
    );

if (materialButton) {
    materialButton.addEventListener(
        'click',
        function () {
            gauge.theme = 'Material';
            gauge.refresh();
        }
    );
}

if (highContrastButton) {
    highContrastButton.addEventListener(
        'click',
        function () {
            gauge.theme = 'HighContrast';
            gauge.refresh();
        }
    );
}
```

## Font Customization

### Axis Label Font

Use `axes[].labelStyle.font`.

```typescript
axes: [{
    labelStyle: {
        position: 'Inside',

        font: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Normal',
            size: '14px',
            color: '#333333'
        }
    }
}]
```

The font properties have the following responsibilities:

```text
fontFamily -> Sets the typeface.
fontStyle  -> Sets Normal, Italic, or Oblique styling.
fontWeight -> Sets text thickness.
size       -> Sets the font size.
color      -> Sets the text color.
opacity    -> Sets text transparency when supported.
```

### Axis Label Format

Use `{value}` to include the axis value in custom label text.

```typescript
labelStyle: {
    position: 'Inside',
    format: '{value}°C'
}
```

Example output:

```text
-20°C
-10°C
0°C
10°C
20°C
```

### Automatic Label Angles

Use `autoAngle` when labels should follow their circular positions.

```typescript
labelStyle: {
    position: 'Inside',
    autoAngle: true
}
```

Use automatic angles only after checking readability. Rotated labels can become difficult to scan on small gauges.

### Title Font

Use the gauge-level `title` and `titleStyle` properties.

```typescript
title: 'Temperature Monitor',

titleStyle: {
    fontFamily: 'Segoe UI',
    fontStyle: 'Normal',
    fontWeight: 'Bold',
    size: '20px',
    color: '#1a1a1a'
}
```

The Circular Gauge title and title style are first-class gauge properties.

### Complete Font Example

```typescript
const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',

    title: 'Temperature Monitor',

    titleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Bold',
        size: '20px',
        color: '#1a1a1a'
    },

    axes: [{
        minimum: -20,
        maximum: 50,

        labelStyle: {
            position: 'Inside',
            format: '{value}°C',
            autoAngle: false,

            font: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: 'Normal',
                size: '13px',
                color: '#333333'
            }
        },

        pointers: [{
            value: 18,
            type: 'Needle'
        }]
    }]
});

gauge.appendTo('#gauge');
```

## Borders and Backgrounds

### Gauge Background

Use the gauge-level `background` property.

```typescript
background: '#f9f9f9'
```

The value can be a valid CSS color:

```typescript
background: '#ffffff'
```

```typescript
background: 'rgb(255, 255, 255)'
```

```typescript
background: 'rgba(255, 255, 255, 0.9)'
```

The gauge API exposes `background` as the gauge background color.

### Gauge Border

Use the gauge-level `border` object.

```typescript
border: {
    width: 1,
    color: '#e0e0e0'
}
```

Do not use undocumented direct properties:

```typescript
borderWidth: 1,
borderColor: '#e0e0e0'
```

Correct:

```typescript
border: {
    width: 1,
    color: '#e0e0e0'
}
```

The gauge API exposes a `border` model rather than separate top-level border-width and border-color properties.

### Axis Background

Use the axis-level `background` property.

```typescript
axes: [{
    background: 'rgba(100, 100, 100, 0.2)'
}]
```

Do not define the same `background` property twice in one object.

Incorrect:

```typescript
axes: [{
    background: '#f5f5f5',
    background: 'rgba(100, 100, 100, 0.2)'
}]
```

Correct:

```typescript
axes: [{
    background: 'rgba(100, 100, 100, 0.2)'
}]
```

### Pointer Border

Use the pointer-level `border` object.

```typescript
pointers: [{
    value: 65,
    type: 'Needle',

    border: {
        width: 2,
        color: '#333333'
    }
}]
```

### Range Border

Use the range-level `border` object when a range requires a boundary.

```typescript
ranges: [{
    start: 0,
    end: 40,
    color: '#107c10',

    border: {
        width: 1,
        color: '#064e06'
    }
}]
```

## Gradients

### Purpose

Gradients can be applied to supported Circular Gauge elements, including pointers and ranges.

Use gradients when:

- A range must show a continuous transition.
- A progress arc requires branded styling.
- A single state spans several visual levels.
- The gradient improves meaning rather than adding decoration only.

### Required Gradient Module

TypeScript applications must import and inject `Gradient`.

```typescript
import {
    CircularGauge,
    Gradient
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Gradient);
```

Do not generate gradient configuration before validating that `Gradient` has been imported and injected.

### Pointer Linear Gradient

```typescript
pointers: [{
    value: 75,
    type: 'RangeBar',
    radius: '80%',
    pointerWidth: 20,

    linearGradient: {
        startValue: '0%',
        endValue: '100%',

        colorStop: [
            {
                color: '#d13438',
                offset: '0%'
            },
            {
                color: '#ffb900',
                offset: '50%'
            },
            {
                color: '#107c10',
                offset: '100%'
            }
        ]
    }
}]
```

Use string values for gradient positions:

```text
startValue -> '0%'
endValue   -> '100%'
```

### Complete TypeScript Pointer Gradient

```typescript
import {
    CircularGauge,
    Gradient
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Gradient);

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',

    axes: [{
        minimum: 0,
        maximum: 100,

        pointers: [{
            value: 75,
            type: 'RangeBar',
            radius: '80%',
            pointerWidth: 20,
            roundedCornerRadius: 10,

            linearGradient: {
                startValue: '0%',
                endValue: '100%',

                colorStop: [
                    {
                        color: '#d13438',
                        offset: '0%'
                    },
                    {
                        color: '#ffb900',
                        offset: '50%'
                    },
                    {
                        color: '#107c10',
                        offset: '100%'
                    }
                ]
            }
        }]
    }]
});

gauge.appendTo('#gauge');
```

### Complete JavaScript Pointer Gradient

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 75,
                type: 'RangeBar',
                radius: '80%',
                pointerWidth: 20,
                roundedCornerRadius: 10,

                linearGradient: {
                    startValue: '0%',
                    endValue: '100%',

                    colorStop: [
                        {
                            color: '#d13438',
                            offset: '0%'
                        },
                        {
                            color: '#ffb900',
                            offset: '50%'
                        },
                        {
                            color: '#107c10',
                            offset: '100%'
                        }
                    ]
                }
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Range Linear Gradient

```typescript
ranges: [{
    start: 0,
    end: 100,
    startWidth: 12,
    endWidth: 12,

    linearGradient: {
        startValue: '0%',
        endValue: '100%',

        colorStop: [
            {
                color: '#0066cc',
                offset: '0%'
            },
            {
                color: '#107c10',
                offset: '100%'
            }
        ]
    }
}]
```

### Complete TypeScript Range Gradient

```typescript
import {
    CircularGauge,
    Gradient
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Gradient);

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',

    axes: [{
        minimum: 0,
        maximum: 100,

        ranges: [{
            start: 0,
            end: 100,
            radius: '90%',
            startWidth: 12,
            endWidth: 12,

            linearGradient: {
                startValue: '0%',
                endValue: '100%',

                colorStop: [
                    {
                        color: '#0066cc',
                        offset: '0%'
                    },
                    {
                        color: '#ffb900',
                        offset: '50%'
                    },
                    {
                        color: '#d13438',
                        offset: '100%'
                    }
                ]
            }
        }],

        pointers: [{
            value: 65,
            type: 'Needle'
        }]
    }]
});

gauge.appendTo('#gauge');
```

### Complete JavaScript Range Gradient

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 100,

            ranges: [{
                start: 0,
                end: 100,
                radius: '90%',
                startWidth: 12,
                endWidth: 12,

                linearGradient: {
                    startValue: '0%',
                    endValue: '100%',

                    colorStop: [
                        {
                            color: '#0066cc',
                            offset: '0%'
                        },
                        {
                            color: '#ffb900',
                            offset: '50%'
                        },
                        {
                            color: '#d13438',
                            offset: '100%'
                        }
                    ]
                }
            }],

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Radial Gradient

Use `radialGradient` when the color should transition outward from a center point.

```typescript
pointers: [{
    value: 65,
    type: 'RangeBar',
    pointerWidth: 20,

    radialGradient: {
        radius: '50%',
        innerPosition: {
            x: '50%',
            y: '50%'
        },
        outerPosition: {
            x: '50%',
            y: '50%'
        },

        colorStop: [
            {
                color: '#ffffff',
                offset: '0%'
            },
            {
                color: '#0066cc',
                offset: '100%'
            }
        ]
    }
}]
```

Use radial gradients only after validating the supported model for the target element and the installed EJ2 version.

## Gauge Position

### Purpose

Use `centerX` and `centerY` to position the Circular Gauge inside its container.

The default center is approximately:

```text
centerX -> 50%
centerY -> 50%
```

The properties accept percentage or pixel values.

Example:

```typescript
const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',
    centerX: '50%',
    centerY: '55%',

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

Use custom positioning when:

- A semi-circular gauge needs vertical adjustment.
- A title consumes upper container space.
- An annotation occupies the gauge center.
- Several gauges share a custom layout.

## Responsive Design

### Responsive Container

Use a percentage width with an explicit or CSS-controlled height.

```typescript
const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',

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

HTML:

```html
<div class="gauge-wrapper">
    <div id="gauge"></div>
</div>
```

CSS:

```css
.gauge-wrapper {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    box-sizing: border-box;
}

#gauge {
    width: 100%;
    min-height: 320px;
}
```

Media queries:

```css
@media (max-width: 768px) {
    .gauge-wrapper {
        max-width: 480px;
    }
}

@media (max-width: 480px) {
    .gauge-wrapper {
        max-width: 100%;
    }

    #gauge {
        min-height: 280px;
    }
}
```

Do not reduce only the container width without assessing:

- Gauge height.
- Axis radius.
- Tick length.
- Label font size.
- Title size.
- Pointer dimensions.
- Annotation size.

### Resize Handling

Circular Gauge can respond to container and window changes. If the surrounding layout changes without producing the expected result, refresh the gauge after the layout settles.

```typescript
let resizeTimer: number | undefined;

window.addEventListener('resize', (): void => {
    if (resizeTimer !== undefined) {
        window.clearTimeout(resizeTimer);
    }

    resizeTimer = window.setTimeout(
        (): void => {
            gauge.refresh();
        },
        150
    );
});
```

JavaScript:

```javascript
var resizeTimer;

window.addEventListener(
    'resize',
    function () {
        window.clearTimeout(resizeTimer);

        resizeTimer = window.setTimeout(
            function () {
                gauge.refresh();
            },
            150
        );
    }
);
```

Debouncing prevents repeated refresh calls during continuous resizing.

### Responsive Fonts

Read the container width before creating the gauge.

TypeScript:

```typescript
const gaugeElement: HTMLElement | null =
    document.getElementById('gauge');

const containerWidth: number =
    gaugeElement?.offsetWidth ?? 0;

const titleSize: string =
    containerWidth >= 600
        ? '18px'
        : '15px';

const labelSize: string =
    containerWidth >= 600
        ? '13px'
        : '11px';
```

Use the calculated values:

```typescript
const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',

    titleStyle: {
        size: titleSize
    },

    axes: [{
        labelStyle: {
            font: {
                size: labelSize
            }
        },

        pointers: [{
            value: 65
        }]
    }]
});

gauge.appendTo('#gauge');
```

When font sizes must change after resize, update the properties and refresh the gauge.

## Complete TypeScript Example

### Required HTML

```html
<div class="gauge-wrapper">
    <div id="gauge"></div>
</div>
```

### Required CSS

```css
.gauge-wrapper {
    width: 100%;
    max-width: 760px;
    margin: 0 auto;
    padding: 16px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 8px;
    box-sizing: border-box;
}

#gauge {
    width: 100%;
    min-height: 450px;
}

@media (max-width: 600px) {
    .gauge-wrapper {
        padding: 8px;
    }

    #gauge {
        min-height: 360px;
    }
}
```

### TypeScript

```typescript
import {
    CircularGauge,
    Gradient
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Gradient);

const gaugeElement: HTMLElement | null =
    document.getElementById('gauge');

const containerWidth: number =
    gaugeElement?.offsetWidth ?? 0;

const titleSize: string =
    containerWidth >= 600
        ? '18px'
        : '15px';

const labelSize: string =
    containerWidth >= 600
        ? '13px'
        : '11px';

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',
    theme: 'Material',
    title: 'Temperature Monitor',
    background: '#f9f9f9',

    border: {
        width: 1,
        color: '#e0e0e0'
    },

    centerX: '50%',
    centerY: '52%',

    titleStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Bold',
        size: titleSize,
        color: '#1a1a1a'
    },

    axes: [{
        minimum: -20,
        maximum: 50,
        startAngle: 230,
        endAngle: 130,
        radius: '88%',
        background: 'rgba(0, 0, 0, 0.02)',

        lineStyle: {
            width: 8,
            color: '#e0e0e0'
        },

        majorTicks: {
            interval: 10,
            width: 2,
            height: 10,
            color: '#555555',
            position: 'Inside'
        },

        minorTicks: {
            interval: 5,
            width: 1,
            height: 5,
            color: '#999999',
            position: 'Inside'
        },

        labelStyle: {
            position: 'Inside',
            autoAngle: false,
            format: '{value}°C',

            font: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: 'Normal',
                size: labelSize,
                color: '#333333'
            }
        },

        ranges: [
            {
                start: -20,
                end: 0,
                radius: '93%',
                startWidth: 10,
                endWidth: 10,

                linearGradient: {
                    startValue: '0%',
                    endValue: '100%',

                    colorStop: [
                        {
                            color: '#1e90ff',
                            offset: '0%'
                        },
                        {
                            color: '#4169e1',
                            offset: '100%'
                        }
                    ]
                }
            },
            {
                start: 0,
                end: 25,
                radius: '93%',
                startWidth: 10,
                endWidth: 10,
                color: '#107c10'
            },
            {
                start: 25,
                end: 50,
                radius: '93%',
                startWidth: 10,
                endWidth: 10,

                linearGradient: {
                    startValue: '0%',
                    endValue: '100%',

                    colorStop: [
                        {
                            color: '#ffb900',
                            offset: '0%'
                        },
                        {
                            color: '#d13438',
                            offset: '100%'
                        }
                    ]
                }
            }
        ],

        pointers: [{
            value: 18,
            type: 'Needle',
            radius: '78%',
            pointerWidth: 8,
            needleStartWidth: 2,
            needleEndWidth: 8,
            color: '#d13438',

            border: {
                width: 1,
                color: '#333333'
            },

            cap: {
                radius: 10,
                color: '#0066cc',

                border: {
                    width: 2,
                    color: '#333333'
                }
            },

            needleTail: {
                length: '20%',
                color: '#d13438',

                border: {
                    width: 1,
                    color: '#333333'
                }
            },

            animation: {
                enable: true,
                duration: 1000
            }
        }]
    }]
});

gauge.appendTo('#gauge');

let resizeTimer: number | undefined;

window.addEventListener('resize', (): void => {
    if (resizeTimer !== undefined) {
        window.clearTimeout(resizeTimer);
    }

    resizeTimer = window.setTimeout(
        (): void => {
            gauge.refresh();
        },
        150
    );
});
```

### Expected Behavior

```text
1. The gauge uses a responsive width.
2. The container limits the maximum layout width.
3. The title and labels use responsive font sizes.
4. The gauge has a light background and border.
5. The scale displays values from -20°C to 50°C.
6. Blue, green, and warm ranges indicate temperature zones.
7. Gradient ranges use the injected Gradient module.
8. The needle points to 18°C.
9. The cap and tail use valid nested border models.
10. The gauge refreshes after debounced window resize events.
```

## Complete JavaScript Example

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Circular Gauge Styling</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        .gauge-wrapper {
            width: 100%;
            max-width: 760px;
            margin: 0 auto;
            padding: 16px;
            background: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            box-sizing: border-box;
        }

        #gauge {
            width: 100%;
            min-height: 450px;
        }

        @media (max-width: 600px) {
            .gauge-wrapper {
                padding: 8px;
            }

            #gauge {
                min-height: 360px;
            }
        }
    </style>
</head>
<body>
    <div class="gauge-wrapper">
        <div id="gauge"></div>
    </div>

    <script src="index.js"></script>
</body>
</html>
```

### JavaScript

```javascript
var gaugeElement =
    document.getElementById('gauge');

var containerWidth =
    gaugeElement
        ? gaugeElement.offsetWidth
        : 0;

var titleSize =
    containerWidth >= 600
        ? '18px'
        : '15px';

var labelSize =
    containerWidth >= 600
        ? '13px'
        : '11px';

var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',
        theme: 'Material',
        title: 'Temperature Monitor',
        background: '#f9f9f9',

        border: {
            width: 1,
            color: '#e0e0e0'
        },

        centerX: '50%',
        centerY: '52%',

        titleStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Bold',
            size: titleSize,
            color: '#1a1a1a'
        },

        axes: [{
            minimum: -20,
            maximum: 50,
            startAngle: 230,
            endAngle: 130,
            radius: '88%',
            background:
                'rgba(0, 0, 0, 0.02)',

            lineStyle: {
                width: 8,
                color: '#e0e0e0'
            },

            majorTicks: {
                interval: 10,
                width: 2,
                height: 10,
                color: '#555555',
                position: 'Inside'
            },

            minorTicks: {
                interval: 5,
                width: 1,
                height: 5,
                color: '#999999',
                position: 'Inside'
            },

            labelStyle: {
                position: 'Inside',
                autoAngle: false,
                format: '{value}°C',

                font: {
                    fontFamily: 'Segoe UI',
                    fontStyle: 'Normal',
                    fontWeight: 'Normal',
                    size: labelSize,
                    color: '#333333'
                }
            },

            ranges: [
                {
                    start: -20,
                    end: 0,
                    radius: '93%',
                    startWidth: 10,
                    endWidth: 10,

                    linearGradient: {
                        startValue: '0%',
                        endValue: '100%',

                        colorStop: [
                            {
                                color: '#1e90ff',
                                offset: '0%'
                            },
                            {
                                color: '#4169e1',
                                offset: '100%'
                            }
                        ]
                    }
                },
                {
                    start: 0,
                    end: 25,
                    radius: '93%',
                    startWidth: 10,
                    endWidth: 10,
                    color: '#107c10'
                },
                {
                    start: 25,
                    end: 50,
                    radius: '93%',
                    startWidth: 10,
                    endWidth: 10,

                    linearGradient: {
                        startValue: '0%',
                        endValue: '100%',

                        colorStop: [
                            {
                                color: '#ffb900',
                                offset: '0%'
                            },
                            {
                                color: '#d13438',
                                offset: '100%'
                            }
                        ]
                    }
                }
            ],

            pointers: [{
                value: 18,
                type: 'Needle',
                radius: '78%',
                pointerWidth: 8,
                needleStartWidth: 2,
                needleEndWidth: 8,
                color: '#d13438',

                border: {
                    width: 1,
                    color: '#333333'
                },

                cap: {
                    radius: 10,
                    color: '#0066cc',

                    border: {
                        width: 2,
                        color: '#333333'
                    }
                },

                needleTail: {
                    length: '20%',
                    color: '#d13438',

                    border: {
                        width: 1,
                        color: '#333333'
                    }
                },

                animation: {
                    enable: true,
                    duration: 1000
                }
            }]
        }]
    });

gauge.appendTo('#gauge');

var resizeTimer;

window.addEventListener(
    'resize',
    function () {
        window.clearTimeout(resizeTimer);

        resizeTimer = window.setTimeout(
            function () {
                gauge.refresh();
            },
            150
        );
    }
);
```

## Runtime Validation Checklist

```text
✅ CircularGauge is imported in TypeScript.
✅ Gradient is imported and injected when gradients are used.
✅ The JavaScript EJ2 script loads before index.js.
✅ The gauge host element exists.
✅ gauge.appendTo('#gauge') is called.
✅ Gauge background uses the background property.
✅ Gauge boundary uses the border object.
✅ Axis line styling uses lineStyle.
✅ Axis background is declared only once.
✅ Pointer colors use pointer.color.
✅ Needle tails use needleTail.
✅ Cap borders use cap.border.
✅ Pointer borders use pointer.border.
✅ Range values remain within the axis scale.
✅ Gradient startValue and endValue use valid strings.
✅ Gradient color stops contain valid colors and offsets.
✅ The selected theme exists in the installed EJ2 version.
✅ Label format uses the {value} placeholder.
✅ Gauge width uses a measurable parent container.
✅ Gauge height remains sufficient at smaller breakpoints.
✅ Resize refresh calls are debounced.
✅ Text colors have sufficient contrast.
✅ Color is not the only method used to explain ranges.
✅ TypeScript and JavaScript implementations provide equivalent behavior.
```

## Combined Mistakes and Future References

### Incorrect Pointer Tail

Incorrect:

```typescript
tail: {
    color: '#0066cc'
}
```

Correct:

```typescript
needleTail: {
    color: '#0066cc',
    length: '20%'
}
```

### Incorrect Cap Border

Incorrect:

```typescript
cap: {
    color: '#ff6347',
    borderColor: '#333333',
    borderWidth: 2
}
```

Correct:

```typescript
cap: {
    color: '#ff6347',

    border: {
        width: 2,
        color: '#333333'
    }
}
```

### Incorrect Gauge Border

Incorrect:

```typescript
const gauge = new CircularGauge({
    borderWidth: 1,
    borderColor: '#e0e0e0'
});
```

Correct:

```typescript
const gauge = new CircularGauge({
    border: {
        width: 1,
        color: '#e0e0e0'
    }
});
```

### Duplicate Axis Background

Incorrect:

```typescript
axes: [{
    background: '#f5f5f5',
    background: 'rgba(0, 0, 0, 0.02)'
}]
```

Correct:

```typescript
axes: [{
    background: 'rgba(0, 0, 0, 0.02)'
}]
```

### Missing Gradient Module

Incorrect TypeScript:

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge = new CircularGauge({
    axes: [{
        ranges: [{
            linearGradient: {
                colorStop: []
            }
        }]
    }]
});
```

Correct:

```typescript
import {
    CircularGauge,
    Gradient
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Gradient);
```

### Incorrect Gradient Position Types

Avoid:

```typescript
linearGradient: {
    startValue: 0,
    endValue: 100
}
```

Preferred:

```typescript
linearGradient: {
    startValue: '0%',
    endValue: '100%'
}
```

### Unsupported Theme

If a theme produces a TypeScript error, verify that it exists in the installed EJ2 version.

Do not bypass the error with an unsafe type assertion before checking the installed package.

### Theme and Explicit Styling

Explicit properties can override theme defaults.

For example:

```typescript
theme: 'Material',

axes: [{
    lineStyle: {
        color: '#ff6347'
    }
}]
```

The configured line color takes precedence for that element.

### Invalid Color Property

Incorrect:

```typescript
pointers: [{
    pointerColor: '#ff6347'
}]
```

Correct:

```typescript
pointers: [{
    color: '#ff6347'
}]
```

### Missing Gauge Size

A responsive width alone does not guarantee sufficient gauge height.

Avoid:

```typescript
width: '100%'
```

without a measurable container height.

Prefer:

```typescript
width: '100%',
height: '450px'
```

### Excessive Resize Refreshing

Avoid:

```typescript
window.addEventListener('resize', () => {
    gauge.refresh();
});
```

This can call `refresh()` repeatedly during continuous resizing.

Use a debounce:

```typescript
let resizeTimer: number | undefined;

window.addEventListener('resize', (): void => {
    if (resizeTimer !== undefined) {
        window.clearTimeout(resizeTimer);
    }

    resizeTimer = window.setTimeout(
        (): void => {
            gauge.refresh();
        },
        150
    );
});
```

### Responsive Font Measurement Before DOM Availability

Do not read the host width before the element exists.

Safe pattern:

```typescript
const gaugeElement: HTMLElement | null =
    document.getElementById('gauge');

const containerWidth: number =
    gaugeElement?.offsetWidth ?? 0;
```

Ensure the script runs after:

```html
<div id="gauge"></div>
```

### Low Contrast

Avoid similar foreground and background colors.

Incorrect:

```typescript
labelStyle: {
    font: {
        color: '#999999'
    }
}
```

on a light gray background.

Prefer a higher-contrast color:

```typescript
labelStyle: {
    font: {
        color: '#333333'
    }
}
```

### Color-Only Range Meaning

Do not communicate status only through:

```text
Green
Yellow
Red
```

Also provide:

- Axis labels.
- A gauge title.
- An annotation.
- Supporting text.
- A legend when range legends are enabled.
- An accessible description.

### Constructor Selector Pattern

Avoid:

```typescript
const gauge = new CircularGauge({
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

### Editor-Generated Markup

Do not place `<a>`, `<strong>`, `<br>`, or editor metadata inside executable TypeScript, JavaScript, HTML, CSS, imports, or CDN URLs.