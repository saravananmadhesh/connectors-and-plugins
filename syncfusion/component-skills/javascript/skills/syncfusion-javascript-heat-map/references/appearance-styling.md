# Appearance and Styling in Syncfusion HeatMap

- #cell-customization
  - #cell-borders-and-corner-radius
  - #cell-highlighting
  - #cell-labels
  - #conditional-cell-styling
- #color-palettes
  - #gradient-palette
  - #fixed-palette
  - #custom-domain-palettes
- #title-and-label-styling
  - #heatmap-title
  - #axis-labels
  - #axis-titles
- #background-margins-and-spacing
- #themes
- #css-customization
- #responsive-design
  - #responsive-container
  - #resize-handling
  - #mobile-layout
- #accessibility-considerations
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Cell Customization

Use `cellSettings` to control the appearance and behavior of HeatMap cells.

Common cell settings include:

```text
border
showLabel
textStyle
tileType
bubbleType
isInversedBubbleSize
enableCellHighlight
format
```

Choose cell styling according to:

- Dataset size.
- Available HeatMap dimensions.
- Whether cell values are displayed.
- Required contrast.
- Rendering mode.
- Pointer and touch interaction.
- Accessibility requirements.

## Cell Borders and Corner Radius

Use `cellSettings.border` to configure cell boundaries.

```typescript
cellSettings: {
    border: {
        width: 2,
        color: '#ffffff',
        radius: 4
    }
}
```

Property responsibilities:

```text
width  -> Controls the cell-border thickness.
color  -> Controls the cell-border color.
radius -> Controls the cell-corner radius.
```

### TypeScript

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';

const data: number[][] = [
    [73, 39, 26],
    [93, 58, 53],
    [99, 28, 22]
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        dataSource: data,

        cellSettings: {
            border: {
                width: 2,
                color: '#ffffff',
                radius: 4
            }
        }
    });

heatmap.appendTo('#heatmap');
```

### JavaScript

```javascript
var data = [
    [73, 39, 26],
    [93, 58, 53],
    [99, 28, 22]
];

var heatmap =
    new ej.heatmap.HeatMap({
        width: '100%',
        height: '450px',

        dataSource: data,

        cellSettings: {
            border: {
                width: 2,
                color: '#ffffff',
                radius: 4
            }
        }
    });

heatmap.appendTo('#heatmap');
```

Use a moderate corner radius. A large radius can make small cells difficult to interpret.

Use cell borders to separate adjacent values, especially when neighboring cells use similar colors.

Do not use thick borders merely to improve touch accessibility. Border width changes appearance but does not necessarily increase the interactive target area.

## Cell Highlighting

Use `enableCellHighlight` to enable cell highlighting during pointer interaction.

```typescript
cellSettings: {
    enableCellHighlight: true
}
```

Complete configuration:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ],

        cellSettings: {
            enableCellHighlight: true,

            border: {
                width: 1,
                color: '#ffffff'
            }
        }
    });

heatmap.appendTo('#heatmap');
```

Do not use:

```typescript
enableCellHighlighting: true
```

Use:

```typescript
enableCellHighlight: true
```

Cell highlighting provides temporary visual feedback. It is not the same as persistent cell selection.

```text
Highlighting -> Temporary pointer feedback.
Selection    -> Maintained selection state.
```

## Cell Labels

Set `showLabel` to `true` to display values inside cells.

```typescript
cellSettings: {
    showLabel: true
}
```

Customize cell-label text through `textStyle`.

```typescript
cellSettings: {
    showLabel: true,

    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '600',
        size: '12px',
        color: '#ffffff'
    }
}
```

### Complete Cell-Label Example

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ],

        cellSettings: {
            showLabel: true,

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '600',
                size: '12px',
                color: '#ffffff'
            },

            border: {
                width: 1,
                color: '#ffffff'
            }
        }
    });

heatmap.appendTo('#heatmap');
```

Use cell labels when:

- Exact values are important.
- The number of cells is manageable.
- Every cell has sufficient room.
- Labels maintain readable contrast.
- Users should not depend solely on tooltips.

Hide cell labels when:

- The matrix contains many small cells.
- Text would overlap.
- Tooltips or another data view provide exact values.
- The HeatMap is intended primarily for pattern recognition.

## Cell Label Format

Use `format` when a unit or value format must be applied to cell labels.

```typescript
cellSettings: {
    showLabel: true,
    format: '{value}%'
}
```

Example:

```typescript
cellSettings: {
    showLabel: true,
    format: '${value}',

    textStyle: {
        fontFamily: 'Segoe UI',
        size: '12px',
        color: '#ffffff'
    }
}
```

Verify the supported format syntax in the installed HeatMap version before using advanced numeric formats.

## Conditional Cell Styling

Use `cellRender` to customize cells according to their values.

```typescript
import {
    HeatMap,
    ICellEventArgs
} from '@syncfusion/ej2-heatmap';

const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ],

        cellSettings: {
            showLabel: true,

            border: {
                width: 1,
                color: '#ffffff'
            }
        },

        cellRender: (
            args: ICellEventArgs
        ): void => {
            const value: number =
                Number(args.value);

            if (!Number.isFinite(value)) {
                args.displayText =
                    'No data';

                return;
            }

            if (value >= 80) {
                args.cellColor =
                    '#107c10';
            } else if (value < 30) {
                args.cellColor =
                    '#b10e1e';
            }

            args.displayText =
                value.toFixed(0);
        }
    });

heatmap.appendTo('#heatmap');
```

Keep `cellRender` lightweight because it runs for every rendered cell.

Avoid:

- Network requests.
- Large DOM queries.
- Expensive calculations.
- Repeated data aggregation.
- Recreating objects unnecessarily.

## Color Palettes

Use `paletteSettings` to map HeatMap values to colors.

The primary palette types are:

```text
Gradient
Fixed
```

```text
Gradient -> Smoothly interpolates colors across values.
Fixed    -> Assigns colors according to explicit value boundaries.
```

Choose a palette according to the data:

```text
Continuous measurements -> Gradient
Business status ranges  -> Fixed
Values around a midpoint -> Diverging gradient
```

## Gradient Palette

Use a Gradient palette for continuous values.

```typescript
paletteSettings: {
    type: 'Gradient',

    palette: [
        {
            value: 0,
            color: '#fff4cc'
        },
        {
            value: 50,
            color: '#5b9bd5'
        },
        {
            value: 100,
            color: '#17365d'
        }
    ]
}
```

Providing explicit values makes the intended color stops clear.

### TypeScript

```typescript
import {
    HeatMap,
    Legend
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Legend);

const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [10, 30, 50],
            [70, 90, 100]
        ],

        paletteSettings: {
            type: 'Gradient',

            palette: [
                {
                    value: 0,
                    color: '#fff4cc'
                },
                {
                    value: 50,
                    color: '#5b9bd5'
                },
                {
                    value: 100,
                    color: '#17365d'
                }
            ]
        },

        legendSettings: {
            visible: true,
            position: 'Bottom'
        }
    });

heatmap.appendTo('#heatmap');
```

### JavaScript

```javascript
var heatmap =
    new ej.heatmap.HeatMap({
        dataSource: [
            [10, 30, 50],
            [70, 90, 100]
        ],

        paletteSettings: {
            type: 'Gradient',

            palette: [
                {
                    value: 0,
                    color: '#fff4cc'
                },
                {
                    value: 50,
                    color: '#5b9bd5'
                },
                {
                    value: 100,
                    color: '#17365d'
                }
            ]
        },

        legendSettings: {
            visible: true,
            position: 'Bottom'
        }
    });

heatmap.appendTo('#heatmap');
```

## Fixed Palette

Use a Fixed palette when explicit value zones must use specific colors.

```typescript
paletteSettings: {
    type: 'Fixed',

    palette: [
        {
            value: 0,
            color: '#dbeafe',
            label: 'Low'
        },
        {
            value: 40,
            color: '#fef3c7',
            label: 'Moderate'
        },
        {
            value: 70,
            color: '#fecaca',
            label: 'High'
        }
    ]
}
```

### Complete Fixed-Palette Example

```typescript
import {
    HeatMap,
    Legend
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Legend);

const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [15, 42, 78],
            [25, 65, 91]
        ],

        paletteSettings: {
            type: 'Fixed',

            palette: [
                {
                    value: 0,
                    color: '#dbeafe',
                    label: 'Low'
                },
                {
                    value: 40,
                    color: '#fef3c7',
                    label: 'Moderate'
                },
                {
                    value: 70,
                    color: '#fecaca',
                    label: 'High'
                }
            ]
        },

        legendSettings: {
            visible: true,
            position: 'Bottom'
        }
    });

heatmap.appendTo('#heatmap');
```

Use a legend or supporting text to explain each fixed range.

## Custom Domain Palettes

The following are custom palette examples. They are not built-in named HeatMap palettes.

### Cool Palette

```typescript
const coolPalette = [
    {
        value: 0,
        color: '#e0f2fe'
    },
    {
        value: 50,
        color: '#0284c7'
    },
    {
        value: 100,
        color: '#0c4a6e'
    }
];
```

### Warm Palette

```typescript
const warmPalette = [
    {
        value: 0,
        color: '#fff7ed'
    },
    {
        value: 50,
        color: '#f97316'
    },
    {
        value: 100,
        color: '#7c2d12'
    }
];
```

### Diverging Palette

Use a diverging palette when values have a meaningful midpoint.

```typescript
const divergingPalette = [
    {
        value: -50,
        color: '#2166ac'
    },
    {
        value: 0,
        color: '#f7f7f7'
    },
    {
        value: 50,
        color: '#b2182b'
    }
];
```

Use a diverging palette for:

- Negative and positive values.
- Loss and profit.
- Below and above target.
- Temperature anomalies.
- Variance from a baseline.

Do not use red and green alone to communicate negative and positive states. Users with color-vision deficiencies may not distinguish them reliably.

Use:

- A legend.
- Cell values.
- Tooltips.
- Textual status labels.
- A visible midpoint description.
- Colors with distinguishable lightness.

### Temperature Palette

```typescript
const temperaturePalette = [
    {
        value: 0,
        color: '#075985',
        label: 'Cold'
    },
    {
        value: 25,
        color: '#facc15',
        label: 'Mild'
    },
    {
        value: 50,
        color: '#c2410c',
        label: 'Hot'
    }
];
```

## Title and Label Styling

## HeatMap Title

Use `titleSettings` to configure the HeatMap title.

```typescript
titleSettings: {
    text: 'Sales Performance Dashboard',
    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '600',
        size: '18px',
        color: '#1a1a1a'
    }
}
```

When supported by the installed version, use the validated title-alignment property.

```typescript
titleSettings: {
    text: 'Sales Performance Dashboard',
    textStyle: {
        fontFamily: 'Segoe UI',
        fontWeight: '600',
        size: '18px',
        color: '#1a1a1a'
    }
}
```

Do not add an unverified nested subtitle configuration.

Avoid:

```typescript
titleSettings: {
    text: 'Main title',

    subtitle: {
        text: 'Subtitle'
    }
}
```

If a subtitle is required, use semantic HTML outside the HeatMap.

```html
<header class="heatmap-header">
    <h2>Sales Performance Dashboard</h2>
    <p>Quarter 1 through Quarter 4, 2023</p>
</header>

<div id="heatmap"></div>
```

## Axis Labels

Use `xAxis.textStyle` and `yAxis.textStyle`.

```typescript
xAxis: {
    labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr'
    ],

    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Normal',
        size: '13px',
        color: '#333333'
    }
}
```

```typescript
yAxis: {
    labels: [
        'Product A',
        'Product B',
        'Product C'
    ],

    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '600',
        size: '12px',
        color: '#555555'
    }
}
```

Do not use:

```typescript
xAxis: {
    labelStyle: {
        size: '14px'
    }
}
```

Use:

```typescript
xAxis: {
    textStyle: {
        size: '14px'
    }
}
```

## Axis Titles

Use the HeatMap axis-title model.

```typescript
xAxis: {
    labels: [
        'Q1',
        'Q2',
        'Q3',
        'Q4'
    ],

    title: {
        text: 'Quarter',

        textStyle: {
            fontFamily: 'Segoe UI',
            fontWeight: '600',
            size: '14px',
            color: '#333333'
        }
    }
}
```

```typescript
yAxis: {
    labels: [
        'Alice',
        'Bob',
        'Charlie'
    ],

    title: {
        text: 'Employee',

        textStyle: {
            fontFamily: 'Segoe UI',
            fontWeight: '600',
            size: '14px',
            color: '#333333'
        }
    }
}
```

## Background, Margins, and Spacing

When supported by the installed HeatMap model, set the component background through `background`.

```typescript
background: '#f9f9f9'
```

Example:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',
        background: '#f9f9f9',

        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ]
    });

heatmap.appendTo('#heatmap');
```

Use the HeatMap margin model when custom plot spacing is required.

```typescript
margin: {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20
}
```

Complete example:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',
        background: '#f9f9f9',

        margin: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
        },

        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ]
    });

heatmap.appendTo('#heatmap');
```

Excessive margins reduce the space available to HeatMap cells.

Adjust margins carefully when:

- Axis labels are long.
- Axis titles are visible.
- A legend is positioned at the side.
- The HeatMap appears inside a small container.
- Mobile layouts are required.

## Themes

Set the theme through the HeatMap-level `theme` property.

```typescript
theme: 'Material'
```

Common theme families can include:

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
Material or Material3 -> General modern applications.
Fabric                 -> Applications using the older Fabric style.
Fluent or Fluent2      -> Microsoft-aligned applications.
Bootstrap              -> Bootstrap-oriented applications.
Tailwind               -> Tailwind-oriented applications.
HighContrast           -> High-contrast presentation.
Dark variants          -> Applications with dark backgrounds.
```

Fabric and Fluent are separate theme families. Do not describe Fabric as the Fluent theme.

### Theme Example

```typescript
const heatmap: HeatMap =
    new HeatMap({
        theme: 'Fluent2',

        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ]
    });

heatmap.appendTo('#heatmap');
```

Explicit color settings can override theme defaults.

```typescript
const heatmap: HeatMap =
    new HeatMap({
        theme: 'Material',

        cellSettings: {
            textStyle: {
                color: '#ffffff'
            }
        }
    });
```

## CSS Customization

Use CSS primarily for:

- The outer HeatMap container.
- Surrounding headings and descriptions.
- Toolbar buttons.
- Responsive layout.
- Visible status text.
- Print layout.

Avoid depending on undocumented generated selectors such as:

```css
.e-heatmap-cell {
    border-radius: 6px;
}

.e-heatmap-title {
    color: blue;
}

.e-heatmap-label {
    font-size: 14px;
}
```

Generated SVG or Canvas structures are implementation details and may change between versions or rendering modes.

Prefer public configuration:

```typescript
cellSettings: {
    border: {
        radius: 6
    },

    textStyle: {
        size: '14px'
    }
}
```

Prefer:

```typescript
titleSettings: {
    textStyle: {
        color: '#1976d2'
    }
}
```

Prefer:

```typescript
xAxis: {
    textStyle: {
        size: '13px'
    }
}
```

## Responsive Design

## Responsive Container

Use a wrapper with a measurable width and height.

HTML:

```html
<div class="heatmap-wrapper">
    <div id="heatmap"></div>
</div>
```

CSS:

```css
.heatmap-wrapper {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    box-sizing: border-box;
}

#heatmap {
    width: 100%;
    min-height: 450px;
}
```

HeatMap configuration:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',
        dataSource: data
    });

heatmap.appendTo('#heatmap');
```

Avoid:

```css
#heatmap {
    height: auto;
}
```

An automatically calculated height may not provide the component with a measurable rendering area.

Use an explicit height or minimum height:

```css
#heatmap {
    min-height: 450px;
}
```

### Responsive Breakpoints

```css
@media (max-width: 768px) {
    #heatmap {
        min-height: 380px;
    }
}

@media (max-width: 480px) {
    #heatmap {
        min-height: 320px;
    }
}
```

At smaller widths, consider:

- Rotating X-axis labels.
- Shortening category names.
- Reducing label font size.
- Hiding cell labels when cells become too small.
- Moving the legend.
- Increasing component height.
- Displaying exact values through tooltips.

## Resize Handling

When the HeatMap does not automatically reflect a surrounding layout change, update its dimensions and refresh it after the layout settles.

Use string dimensions:

```typescript
heatmap.width = '100%';
heatmap.height = '450px';
```

Do not assign unverified numeric dimensions:

```typescript
heatmap.width = containerWidth;
heatmap.height = containerHeight;
```

Preferred resize handler:

```typescript
let resizeTimer: number | undefined;

const resizeHandler = (): void => {
    if (resizeTimer !== undefined) {
        window.clearTimeout(
            resizeTimer
        );
    }

    resizeTimer = window.setTimeout(
        (): void => {
            const host:
                HTMLElement | null =
                    document.getElementById(
                        'heatmap'
                    );

            if (!host) {
                return;
            }

            const width: number =
                host.clientWidth;

            const height: number =
                Math.max(
                    Math.round(
                        width * 0.55
                    ),
                    320
                );

            heatmap.width =
                '100%';

            heatmap.height =
                height + 'px';

            heatmap.refresh();
        },
        150
    );
};

window.addEventListener(
    'resize',
    resizeHandler
);

resizeHandler();
```

Remove the listener when the view is destroyed:

```typescript
window.removeEventListener(
    'resize',
    resizeHandler
);

heatmap.destroy();
```

## Mobile Layout

Use label rotation to reduce overlap.

```typescript
xAxis: {
    labelRotation: 45,
    labelIntersectAction: 'None'
}
```

Use the exact `labelIntersectAction` value supported by the installed HeatMap version.

Do not assume `Wrap` is supported without validating the current axis model.

Cell borders do not enlarge touch targets. For important mobile actions:

- Provide a separate details panel.
- Use tooltips carefully.
- Provide keyboard-accessible and touch-accessible buttons.
- Avoid essential double-click behavior.
- Keep labels readable.
- Provide sufficient overall HeatMap dimensions.

## Accessibility Considerations

### Color Contrast

Verify contrast between:

- Cell text and cell background.
- Axis labels and page background.
- Title and component background.
- Legend labels and legend background.
- Tooltip text and tooltip fill.
- Focus indicators and surrounding content.

Do not claim WCAG AAA compliance solely because a high-contrast palette is used. Compliance depends on the full application and measured contrast ratios.

### Do Not Use Color Alone

A palette should not be the only way users understand values.

Also provide:

- Cell labels.
- Tooltips.
- A legend.
- Visible axis labels.
- Textual status.
- A data table when appropriate.
- An accessible description.

### Color-Vision Deficiency

Avoid red and green as the only visual distinction.

Prefer:

- Blue and orange combinations.
- Different lightness levels.
- Explicit text labels.
- Numeric cell labels.
- Named legend ranges.
- Tooltips containing status text.

Do not claim pattern or texture support unless the application explicitly implements and validates it.

### Readable Labels

Use a reasonable minimum font size, but determine the exact value through testing.

```typescript
xAxis: {
    textStyle: {
        size: '12px',
        color: '#333333'
    }
}
```

Ensure that important text remains readable under:

- Browser zoom.
- High-contrast mode.
- Mobile display.
- Dark themes.
- RTL layouts.
- Long localized labels.

## Complete TypeScript Example

### Required HTML

```html
<header class="heatmap-header">
    <h2>Employee Performance</h2>

    <p>
        Quarterly scores from 0 to 100.
        Exact values are displayed in each cell.
    </p>
</header>

<div class="heatmap-wrapper">
    <div id="heatmap"></div>
</div>
```

### Required CSS

```css
.heatmap-header {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto 12px;
    box-sizing: border-box;
}

.heatmap-header h2 {
    margin: 0 0 4px;
    color: #1a1a1a;
    font-family: "Segoe UI", sans-serif;
    font-size: 20px;
}

.heatmap-header p {
    margin: 0;
    color: #444444;
    font-family: "Segoe UI", sans-serif;
    font-size: 14px;
}

.heatmap-wrapper {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    box-sizing: border-box;
}

#heatmap {
    width: 100%;
    min-height: 460px;
}

@media (max-width: 768px) {
    #heatmap {
        min-height: 400px;
    }
}

@media (max-width: 480px) {
    #heatmap {
        min-height: 340px;
    }
}
```

### TypeScript

```typescript
import {
    HeatMap,
    Legend,
    Tooltip,
    ITooltipEventArgs
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(
    Legend,
    Tooltip
);

const performanceData: number[][] = [
    [73, 39, 26, 39],
    [93, 58, 53, 38],
    [99, 28, 22, 44],
    [64, 76, 81, 69]
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '460px',
        theme: 'Material',
        background: '#f9f9f9',

        dataSource:
            performanceData,

        titleSettings: {
            text:
                'Quarterly Performance Scores',

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '600',
                size: '18px',
                color: '#1a1a1a'
            }
        },

        xAxis: {
            valueType: 'Category',

            labels: [
                'Quarter 1',
                'Quarter 2',
                'Quarter 3',
                'Quarter 4'
            ],

            labelRotation: 45,
            labelIntersectAction:
                'None',

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: 'Normal',
                size: '12px',
                color: '#333333'
            },

            title: {
                text: 'Quarter',

                textStyle: {
                    fontFamily:
                        'Segoe UI',
                    fontWeight: '600',
                    size: '14px',
                    color: '#333333'
                }
            }
        },

        yAxis: {
            valueType: 'Category',

            labels: [
                'Alice',
                'Bob',
                'Charlie',
                'Diana'
            ],

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: 'Normal',
                size: '12px',
                color: '#333333'
            },

            title: {
                text: 'Employee',

                textStyle: {
                    fontFamily:
                        'Segoe UI',
                    fontWeight: '600',
                    size: '14px',
                    color: '#333333'
                }
            }
        },

        cellSettings: {
            showLabel: true,
            enableCellHighlight: true,
            format: '{value}',

            border: {
                width: 1,
                color: '#ffffff',
                radius: 3
            },

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '600',
                size: '12px',
                color: '#ffffff'
            }
        },

        paletteSettings: {
            type: 'Gradient',

            palette: [
                {
                    value: 0,
                    color: '#fff4cc'
                },
                {
                    value: 50,
                    color: '#5b9bd5'
                },
                {
                    value: 100,
                    color: '#17365d'
                }
            ]
        },

        legendSettings: {
            visible: true,
            position: 'Bottom',
            showLabel: true,
            labelFormat: '{value}'
        },

        showTooltip: true,

        tooltipRender: (
            args: ITooltipEventArgs
        ): void => {
            const value: number =
                Number(args.value);

            let status: string =
                'No data';

            if (Number.isFinite(value)) {
                if (value >= 80) {
                    status =
                        'High performance';
                } else if (value >= 50) {
                    status =
                        'Moderate performance';
                } else {
                    status =
                        'Needs attention';
                }
            }

            args.content = [
                'Employee: ' +
                String(args.yLabel),
                'Quarter: ' +
                String(args.xLabel),
                'Score: ' +
                (
                    Number.isFinite(value)
                        ? value.toFixed(0)
                        : 'No data'
                ),
                'Status: ' +
                status
            ];
        }
    });

heatmap.appendTo('#heatmap');
```

## Complete JavaScript Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>HeatMap Appearance and Styling</title>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"
        type="text/javascript"
    ></script>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"
        type="text/javascript"
    ></script>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"
        type="text/javascript"
    ></script>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-heatmap/dist/global/ej2-heatmap.min.js"
        type="text/javascript"
    ></script>

    <style>
        .heatmap-header {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto 12px;
            box-sizing: border-box;
        }

        .heatmap-header h2 {
            margin: 0 0 4px;
            color: #1a1a1a;
            font-family: "Segoe UI", sans-serif;
            font-size: 20px;
        }

        .heatmap-header p {
            margin: 0;
            color: #444444;
            font-family: "Segoe UI", sans-serif;
            font-size: 14px;
        }

        .heatmap-wrapper {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            box-sizing: border-box;
        }

        #heatmap {
            width: 100%;
            min-height: 460px;
        }

        @media (max-width: 768px) {
            #heatmap {
                min-height: 400px;
            }
        }

        @media (max-width: 480px) {
            #heatmap {
                min-height: 340px;
            }
        }
    </style>
</head>
<body>
    <header class="heatmap-header">
        <h2>Employee Performance</h2>

        <p>
            Quarterly scores from 0 to 100.
            Exact values are displayed in each cell.
        </p>
    </header>

    <div class="heatmap-wrapper">
        <div id="heatmap"></div>
    </div>

    <script>
        var performanceData = [
            [73, 39, 26, 39],
            [93, 58, 53, 38],
            [99, 28, 22, 44],
            [64, 76, 81, 69]
        ];

        var heatmap =
            new ej.heatmap.HeatMap({
                width: '100%',
                height: '460px',
                theme: 'Material',
                background: '#f9f9f9',

                dataSource:
                    performanceData,

                titleSettings: {
                    text:
                        'Quarterly Performance Scores',

                    textStyle: {
                        fontFamily:
                            'Segoe UI',
                        fontStyle:
                            'Normal',
                        fontWeight: '600',
                        size: '18px',
                        color: '#1a1a1a'
                    }
                },

                xAxis: {
                    valueType:
                        'Category',

                    labels: [
                        'Quarter 1',
                        'Quarter 2',
                        'Quarter 3',
                        'Quarter 4'
                    ],

                    labelRotation: 45,
                    labelIntersectAction:
                        'None',

                    textStyle: {
                        fontFamily:
                            'Segoe UI',
                        fontStyle:
                            'Normal',
                        fontWeight:
                            'Normal',
                        size: '12px',
                        color: '#333333'
                    },

                    title: {
                        text: 'Quarter',

                        textStyle: {
                            fontFamily:
                                'Segoe UI',
                            fontWeight:
                                '600',
                            size: '14px',
                            color:
                                '#333333'
                        }
                    }
                },

                yAxis: {
                    valueType:
                        'Category',

                    labels: [
                        'Alice',
                        'Bob',
                        'Charlie',
                        'Diana'
                    ],

                    textStyle: {
                        fontFamily:
                            'Segoe UI',
                        fontStyle:
                            'Normal',
                        fontWeight:
                            'Normal',
                        size: '12px',
                        color: '#333333'
                    },

                    title: {
                        text: 'Employee',

                        textStyle: {
                            fontFamily:
                                'Segoe UI',
                            fontWeight:
                                '600',
                            size: '14px',
                            color:
                                '#333333'
                        }
                    }
                },

                cellSettings: {
                    showLabel: true,
                    enableCellHighlight: true,
                    format: '{value}',

                    border: {
                        width: 1,
                        color: '#ffffff',
                        radius: 3
                    },

                    textStyle: {
                        fontFamily:
                            'Segoe UI',
                        fontStyle:
                            'Normal',
                        fontWeight:
                            '600',
                        size: '12px',
                        color: '#ffffff'
                    }
                },

                paletteSettings: {
                    type: 'Gradient',

                    palette: [
                        {
                            value: 0,
                            color: '#fff4cc'
                        },
                        {
                            value: 50,
                            color: '#5b9bd5'
                        },
                        {
                            value: 100,
                            color: '#17365d'
                        }
                    ]
                },

                legendSettings: {
                    visible: true,
                    position: 'Bottom',
                    showLabel: true,
                    labelFormat: '{value}'
                },

                showTooltip: true,

                tooltipRender:
                    function (args) {
                        var value =
                            Number(
                                args.value
                            );

                        var status =
                            'No data';

                        if (
                            Number.isFinite(
                                value
                            )
                        ) {
                            if (value >= 80) {
                                status =
                                    'High performance';
                            } else if (
                                value >= 50
                            ) {
                                status =
                                    'Moderate performance';
                            } else {
                                status =
                                    'Needs attention';
                            }
                        }

                        args.content = [
                            'Employee: ' +
                            String(
                                args.yLabel
                            ),
                            'Quarter: ' +
                            String(
                                args.xLabel
                            ),
                            'Score: ' +
                            (
                                Number.isFinite(
                                    value
                                )
                                    ? value
                                        .toFixed(0)
                                    : 'No data'
                            ),
                            'Status: ' +
                            status
                        ];
                    }
            });

        heatmap.appendTo('#heatmap');
    </script>
</body>
</html>
```

## Runtime Validation Checklist

```text
✅ HeatMap is imported in TypeScript.
✅ Legend is imported and injected when the legend is visible.
✅ Tooltip is imported and injected when tooltips are enabled.
✅ Every injected module is imported.
✅ Global JavaScript does not call HeatMap.Inject.
✅ All CDN scripts use the same EJ2 version.
✅ CDN scripts load in dependency order.
✅ Each CDN URL ends with .min.js.
✅ No malformed .min.jsscript URL exists.
✅ The HeatMap host element exists.
✅ heatmap.appendTo('#heatmap') is called.
✅ The appendTo selector matches the host ID.
✅ The HeatMap has measurable width and height.
✅ cellSettings.border controls cell boundaries.
✅ Border radius uses a value supported by the installed version.
✅ Cell highlighting uses enableCellHighlight.
✅ Cell labels use showLabel.
✅ Cell-label styling uses cellSettings.textStyle.
✅ Gradient palettes use ordered color stops.
✅ Fixed palettes use explicit value boundaries.
✅ Custom palettes are not described as built-in palettes.
✅ Palette values cover the intended data range.
✅ Legend is visible when users need color interpretation.
✅ HeatMap title styling uses titleSettings.textStyle.
✅ Axis-label styling uses xAxis.textStyle and yAxis.textStyle.
✅ Axis titles use the HeatMap title model.
✅ Cell borders use cellSettings.border.
✅ Generated SVG or Canvas selectors are not styled directly.
✅ Theme names are supported by the installed EJ2 version.
✅ Fabric and Fluent are treated as separate theme families.
✅ Responsive containers provide a measurable height.
✅ HeatMap width and height use strings.
✅ Resize handling is debounced.
✅ Resize listeners are removed during cleanup.
✅ Tooltips are enabled through showTooltip.
✅ Tooltip event values are validated before numeric formatting.
✅ Important information is not communicated through color alone.
✅ Cell text maintains sufficient contrast.
✅ Exact values remain available through labels or tooltips.
✅ Executable HTML uses actual angle brackets.
✅ No encoded tags replace executable HTML.
✅ No editor-generated anchor elements appear in CDN URLs.
✅ No strong, br, data-lexical-text, or editor-generated classes remain.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Constructor Selector Pattern

Avoid:

```typescript
const heatmap =
    new HeatMap({
        dataSource: data
    }, '#heatmap');
```

Preferred:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: data
    });

heatmap.appendTo('#heatmap');
```

### Incorrect Highlight Property

Avoid:

```typescript
cellSettings: {
    enableCellHighlighting: true
}
```

Use:

```typescript
cellSettings: {
    enableCellHighlight: true
}
```

### Unsupported Axis Label Style

Avoid:

```typescript
xAxis: {
    labelStyle: {
        size: '14px'
    }
}
```

Use:

```typescript
xAxis: {
    textStyle: {
        size: '14px'
    }
}
```

### Unverified Subtitle

Avoid:

```typescript
titleSettings: {
    text: 'Main title',

    subtitle: {
        text: 'Subtitle'
    }
}
```

Use semantic HTML:

```html
<header>
    <h2>Main title</h2>
    <p>Subtitle</p>
</header>
```

### Custom Palettes Described as Built-In

Do not describe the following variable as a built-in HeatMap palette:

```typescript
const warmPalette = [
    {
        color: '#fff3e0'
    },
    {
        color: '#e65100'
    }
];
```

It is an application-defined custom palette.

### Gradient Stops Without Values

Avoid ambiguous gradient stops:

```typescript
paletteSettings: {
    type: 'Gradient',

    palette: [
        {
            color: '#ffe5cc'
        },
        {
            color: '#19547b'
        }
    ]
}
```

Preferred:

```typescript
paletteSettings: {
    type: 'Gradient',

    palette: [
        {
            value: 0,
            color: '#ffe5cc'
        },
        {
            value: 100,
            color: '#19547b'
        }
    ]
}
```

### Red and Green as the Only Status Indicator

Avoid using only:

```text
Red -> Failure
Green -> Success
```

Also provide:

- Numeric cell values.
- Legend labels.
- Tooltip status text.
- Supporting descriptions.
- Distinct lightness levels.

### Undocumented CSS Selectors

Avoid:

```css
.e-heatmap-cell {
    border-radius: 6px;
}

.e-heatmap-title {
    color: blue;
}
```

Prefer public properties:

```typescript
cellSettings: {
    border: {
        radius: 6
    }
}
```

```typescript
titleSettings: {
    textStyle: {
        color: '#0066cc'
    }
}
```

### Automatic Height

Avoid:

```css
#heatmap {
    height: auto;
}
```

Use:

```css
#heatmap {
    min-height: 450px;
}
```

and:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px'
    });
```

### Numeric Width and Height Assignment

Avoid:

```typescript
heatmap.width =
    containerWidth;

heatmap.height =
    containerHeight;
```

Use strings:

```typescript
heatmap.width =
    '100%';

heatmap.height =
    containerHeight + 'px';
```

### Excessive Resize Refreshing

Avoid:

```typescript
window.addEventListener(
    'resize',
    (): void => {
        heatmap.refresh();
    }
);
```

Use a debounce:

```typescript
let resizeTimer: number | undefined;

const resizeHandler = (): void => {
    if (resizeTimer !== undefined) {
        window.clearTimeout(
            resizeTimer
        );
    }

    resizeTimer = window.setTimeout(
        (): void => {
            heatmap.refresh();
        },
        150
    );
};
```

### Touch Target Assumption

Do not claim that this improves touch-target size:

```typescript
cellSettings: {
    border: {
        width: 3
    }
}
```

A border changes the visual boundary. Use an appropriately sized HeatMap and accessible external controls for touch interaction.

### Tooltip Module Without Tooltip Enablement

Avoid:

```typescript
HeatMap.Inject(
    Tooltip
);
```

without enabling the tooltip when tooltip interaction is intended.

Use:

```typescript
HeatMap.Inject(
    Tooltip
);

const heatmap: HeatMap =
    new HeatMap({
        showTooltip: true
    });
```

### WCAG Compliance Claim

Do not claim that a palette automatically provides WCAG AAA compliance.

Instead:

- Measure contrast.
- Test keyboard behavior.
- Test browser zoom.
- Test high-contrast mode.
- Test screen-reader output.
- Provide non-color alternatives.
- Validate the complete application.

### Pattern Support Assumption

Do not claim that HeatMap palettes provide texture or pattern fills unless the feature is explicitly implemented and supported by the installed version.

### Malformed CDN Link

Do not use an anchor element around a CDN URL.

Do not use a URL ending with:

```text
.min.jsscript
```

Use:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-heatmap/dist/global/ej2-heatmap.min.js"
    type="text/javascript"
></script>
```

### Encoded Executable HTML

Do not use:

```html
&lt;div id="heatmap"&gt;&lt;/div&gt;
```

Use:

```html
<div id="heatmap"></div>
```

### Editor-Generated Markup

Do not place the following inside executable HTML, TypeScript, JavaScript, CSS, imports, templates, or CDN URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```