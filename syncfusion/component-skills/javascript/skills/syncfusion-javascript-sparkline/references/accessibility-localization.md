# Accessibility and Localization

## Overview

The EJ2 Sparkline includes built-in accessibility support based on WAI-ARIA patterns. Its rendered output uses accessibility attributes such as `role="img"`, `aria-label`, and `aria-hidden`. The documented keyboard shortcut is `Ctrl + P`, which prints the Sparkline.

A complete accessible implementation should combine the component’s built-in behavior with:

- A clear visible caption
- A meaningful text description
- A data-table alternative when exact values are important
- Sufficient color contrast
- Markers or labels in addition to color
- Announcements for dynamic updates
- Native keyboard-accessible controls
- Correct `valueType` configuration
- Locale-aware surrounding text and number formatting
- `enableRtl` for right-to-left rendering

Do not make the Sparkline focusable merely to simulate unsupported point-by-point keyboard navigation. If users need keyboard-accessible access to exact values, provide native controls, a table, or another structured text alternative.

## Table of Contents

- #wcag-oriented-implementation
- #color-and-non-color-cues
- #text-alternatives
- #keyboard-navigation
- #aria-support
- #screen-reader-support
- #dynamic-update-announcements
- #rtl-support
- #localization
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## WCAG-Oriented Implementation

Syncfusion documents Sparkline support for accessibility standards and evaluation criteria including WCAG 2.2, Section 508, screen readers, right-to-left rendering, color contrast, mobile devices, keyboard navigation, and automated accessibility validation.

Application-level accessibility still requires validation because compliance depends on:

- The surrounding page structure
- Text alternatives
- Color choices
- Custom interaction
- Dynamic updates
- Browser and assistive-technology combinations
- Application-specific success criteria

### High-Contrast Rendering

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '120px',
        type: 'Column',
        valueType: 'Numeric',
        dataSource: [
            35,
            28,
            34,
            32,
            40,
            42
        ],
        fill: '#005A9C',
        highPointColor: '#166534',
        lowPointColor: '#B91C1C',
        containerArea: {
            background: '#FFFFFF',
            border: {
                color: '#475569',
                width: 1
            }
        }
    });

sparkline.appendTo('#sparkline');
```

Color contrast must be evaluated in the final application theme rather than assumed from a color name or hexadecimal value.

## Color and Non-Color Cues

Do not rely only on color to communicate high, low, negative, start, or end points.

Use markers and data labels in addition to special-point colors:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        valueType: 'Numeric',
        dataSource: [
            35,
            28,
            34,
            32,
            40,
            42
        ],
        fill: '#005A9C',
        lineWidth: 2,
        highPointColor: '#166534',
        lowPointColor: '#B91C1C',
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 8,
            fill: '#FFFFFF',
            border: {
                color: '#111827',
                width: 2
            }
        },
        dataLabelSettings: {
            visible: [
                'High',
                'Low'
            ],
            format: '${y}',
            fill: '#FFFFFF',
            border: {
                color: '#475569',
                width: 1
            },
            textStyle: {
                color: '#111827',
                size: '12px',
                fontFamily: 'Segoe UI',
                fontWeight: '600'
            }
        }
    });
```

Data-label visibility must be an array containing values such as `All`, `Start`, `End`, `High`, `Low`, or `Negative`.

Incorrect:

```typescript
dataLabelSettings: {
    visible: true
}
```

Correct:

```typescript
dataLabelSettings: {
    visible: [
        'High',
        'Low'
    ]
}
```

Also, `highPointColor` and `lowPointColor` belong to the Sparkline root configuration, not `markerSettings`.

Incorrect:

```typescript
markerSettings: {
    highPointColor: '#166534',
    lowPointColor: '#B91C1C'
}
```

Correct:

```typescript
highPointColor: '#166534',
lowPointColor: '#B91C1C'
```

## Text Alternatives

A Sparkline should have a concise description of its meaning, not just a generic label such as “chart.”

Use semantic HTML:

```html
<figure aria-labelledby="sparkline-caption">
    <figcaption id="sparkline-caption">
        Monthly sales trend
    </figcaption>

    <p id="sparkline-description">
        Sales decreased from 35 in January to 28 in
        February, then increased to a high of 42 in June.
    </p>

    <div
        id="sparkline"
        aria-describedby="sparkline-description"
    ></div>
</figure>
```

A good description should communicate:

- What the data represents
- The covered period
- The overall trend
- Important high or low values
- Any significant negative, neutral, or anomalous points

Do not manually overwrite component-generated ARIA attributes unless the replacement has been validated after rendering.

## Keyboard Navigation

Syncfusion documents `Ctrl + P` as the supported Sparkline keyboard shortcut for printing.

Do not document unsupported keyboard behaviors such as:

- Arrow keys moving between points
- Enter displaying a point tooltip
- Space selecting a column
- Home and End navigating to the first and last points

unless those interactions are implemented and tested by the application.

### Avoid Unnecessary Focus

A static Sparkline generally does not require:

```html
tabindex="0"
```

Adding it creates an extra tab stop without necessarily providing an action.

Avoid:

```html
<div
    id="sparkline"
    tabindex="0"
    role="img"
></div>
```

unless the focused element has a meaningful, documented keyboard interaction.

### Use Native Controls for Actions

```html
<button
    id="show-data"
    type="button"
    aria-expanded="false"
    aria-controls="sparkline-data"
>
    Show sales data
</button>
```

```typescript
const showDataButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#show-data'
        );

const dataPanel:
    HTMLElement | null =
        document.querySelector(
            '#sparkline-data'
        );

if (
    showDataButton &&
    dataPanel
) {
    showDataButton.addEventListener(
        'click',
        (): void => {
            const expanded: boolean =
                showDataButton
                    .getAttribute(
                        'aria-expanded'
                    ) === 'true';

            showDataButton.setAttribute(
                'aria-expanded',
                String(!expanded)
            );

            dataPanel.hidden =
                expanded;
        }
    );
}
```

Native buttons already support keyboard activation and focus behavior.

## ARIA Support

Sparkline uses WAI-ARIA patterns including the image role and attributes such as `aria-label` and `aria-hidden`.

A support-safe pattern is to provide semantic surrounding content:

```html
<section aria-labelledby="sales-heading">
    <h2 id="sales-heading">
        Monthly sales
    </h2>

    <p id="sales-summary">
        Sales increased overall from January to June.
    </p>

    <div
        id="sparkline"
        aria-describedby="sales-summary"
    ></div>
</section>
```

If the final rendered element needs an application-specific label, apply it after the component has rendered:

```typescript
const sparklineElement:
    HTMLElement | null =
        document.querySelector(
            '#sparkline'
        );

if (sparklineElement) {
    sparklineElement.setAttribute(
        'aria-label',
        'Monthly sales from January through June'
    );
}
```

Do not add `role="application"` to a Sparkline. That role changes how assistive technologies interpret keyboard input and is unnecessary for an image-like visualization.

## Screen Reader Support

Tooltips must not be the only way to access data. Hover content may not be available consistently to keyboard-only users or screen-reader users.

Provide a data table when exact values matter:

```html
<details id="sparkline-data">
    <summary>
        View monthly sales data
    </summary>

    <table>
        <caption>
            Monthly sales from January through June
        </caption>

        <thead>
            <tr>
                <th scope="col">
                    Month
                </th>
                <th scope="col">
                    Sales
                </th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <th scope="row">
                    January
                </th>
                <td>35</td>
            </tr>
            <tr>
                <th scope="row">
                    February
                </th>
                <td>28</td>
            </tr>
            <tr>
                <th scope="row">
                    March
                </th>
                <td>34</td>
            </tr>
            <tr>
                <th scope="row">
                    April
                </th>
                <td>32</td>
            </tr>
            <tr>
                <th scope="row">
                    May
                </th>
                <td>40</td>
            </tr>
            <tr>
                <th scope="row">
                    June
                </th>
                <td>42</td>
            </tr>
        </tbody>
    </table>
</details>
```

Do not hide essential descriptive text with:

```css
display: none;
```

Content hidden with `display: none` is generally unavailable to assistive technologies.

Use a visually hidden utility when content should remain available to screen readers:

```css
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

## Dynamic Update Announcements

Use a polite live region for important data updates:

```html
<p
    id="sparkline-status"
    class="visually-hidden"
    role="status"
    aria-live="polite"
    aria-atomic="true"
></p>
```

Update the existing Sparkline instance:

```typescript
const updateSparklineData = (
    newData: SalesData[]
): void => {
    sparkline.dataSource =
        newData;

    sparkline.dataBind();

    const status:
        HTMLElement | null =
            document.querySelector(
                '#sparkline-status'
            );

    if (status) {
        const values: number[] =
            newData.map(
                (
                    item: SalesData
                ): number => {
                    return item.sales;
                }
            );

        const minimum: number =
            Math.min(...values);

        const maximum: number =
            Math.max(...values);

        status.textContent =
            `Monthly sales updated. ` +
            `${newData.length} values are displayed. ` +
            `The minimum is ${minimum} and ` +
            `the maximum is ${maximum}.`;
    }
};
```

Avoid announcing every rapid update. Batch frequent updates and announce only meaningful changes.

## RTL Support

Use the Sparkline `enableRtl` property for component-level right-to-left rendering:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        enableRtl: true,
        type: 'Column',
        valueType: 'Category',
        dataSource: arabicData,
        xName: 'month',
        yName: 'sales'
    });
```

Use an HTML direction attribute when the complete surrounding section is right-to-left:

```html
<section
    lang="ar"
    dir="rtl"
    aria-labelledby="sales-heading"
>
    <h2 id="sales-heading">
        المبيعات الشهرية
    </h2>

    <div id="sparkline"></div>
</section>
```

Category data requires:

```typescript
valueType: 'Category'
```

Complete Arabic datasource:

```typescript
interface ArabicSalesData {
    month: string;
    sales: number;
}

const arabicData:
    ArabicSalesData[] = [
        {
            month: 'يناير',
            sales: 35
        },
        {
            month: 'فبراير',
            sales: 28
        },
        {
            month: 'مارس',
            sales: 34
        }
    ];
```

Do not rely only on:

```css
direction: rtl;
```

Use `enableRtl` for the Sparkline and `dir="rtl"` for the surrounding document structure.

## Localization

### Localized Data

Sparkline category text comes from the datasource. Translate those category values through the application’s localization system:

```typescript
interface LocalizedSalesData {
    label: string;
    value: number;
}

const salesByLanguage:
    Record<
        string,
        LocalizedSalesData[]
    > = {
        en: [
            {
                label: 'January',
                value: 35
            },
            {
                label: 'February',
                value: 28
            },
            {
                label: 'March',
                value: 34
            }
        ],
        fr: [
            {
                label: 'Janvier',
                value: 35
            },
            {
                label: 'Février',
                value: 28
            },
            {
                label: 'Mars',
                value: 34
            }
        ],
        es: [
            {
                label: 'Enero',
                value: 35
            },
            {
                label: 'Febrero',
                value: 28
            },
            {
                label: 'Marzo',
                value: 34
            }
        ]
    };
```

Use `valueType: 'Category'`:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        valueType: 'Category',
        dataSource:
            salesByLanguage.en,
        xName: 'label',
        yName: 'value'
    });
```

### Changing Language at Runtime

Update the existing component instead of creating another instance on the same element:

```typescript
const applyLanguage = (
    language: string
): void => {
    const localizedData:
        LocalizedSalesData[] =
            salesByLanguage[
                language
            ] ||
            salesByLanguage.en;

    sparkline.dataSource =
        localizedData;

    sparkline.enableRtl =
        language === 'ar' ||
        language === 'he';

    sparkline.dataBind();
};
```

### Locale-Aware Number Formatting

Use `Intl.NumberFormat` for surrounding text and accessible summaries:

```typescript
const formatNumber = (
    value: number,
    locale: string
): string => {
    return new Intl.NumberFormat(
        locale
    ).format(value);
};
```

Currency:

```typescript
const formatCurrency = (
    value: number,
    locale: string,
    currency: string
): string => {
    return new Intl.NumberFormat(
        locale,
        {
            style: 'currency',
            currency
        }
    ).format(value);
};
```

Example:

```typescript
const formattedSales: string =
    formatCurrency(
        35000,
        'en-IN',
        'INR'
    );
```

### Locale-Aware Date Formatting

```typescript
const formatDate = (
    date: Date,
    locale: string
): string => {
    return new Intl.DateTimeFormat(
        locale,
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    ).format(date);
};
```

DateTime Sparkline configuration:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        valueType: 'DateTime',
        dataSource: [
            {
                date:
                    new Date(
                        2025,
                        0,
                        1
                    ),
                value: 100
            },
            {
                date:
                    new Date(
                        2025,
                        0,
                        15
                    ),
                value: 125
            }
        ],
        xName: 'date',
        yName: 'value'
    });
```

### EJ2 Locale Resources

Syncfusion provides locale resources through `@syncfusion/ej2-locale`, and global EJ2 culture can be set using `setCulture`. Locale resources can be loaded through `L10n.load` when a component contains localizable UI strings.

TypeScript global culture setup:

```typescript
import {
    setCulture
} from '@syncfusion/ej2-base';

setCulture('fr-FR');
```

Sparkline itself contains little built-in textual UI, so translated category labels, captions, summaries, table content, and number formatting often remain application responsibilities.

## Complete TypeScript Example

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Accessible Sparkline</title>

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            color: #111827;
            font-family: "Segoe UI", sans-serif;
        }

        .sparkline-card {
            width: 100%;
            max-width: 560px;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #CBD5E1;
            border-radius: 12px;
            background: #FFFFFF;
        }

        .sparkline-card h1 {
            margin: 0 0 6px;
            font-size: 22px;
        }

        .sparkline-summary {
            margin: 0 0 16px;
            color: #334155;
        }

        .sparkline-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .sparkline-toolbar button {
            padding: 8px 12px;
            border: 1px solid #64748B;
            border-radius: 6px;
            background: #FFFFFF;
            color: #111827;
            cursor: pointer;
        }

        .sparkline-toolbar button:focus-visible,
        details summary:focus-visible {
            outline: 3px solid #2563EB;
            outline-offset: 2px;
        }

        #sparkline {
            width: 100%;
            height: 180px;
        }

        table {
            width: 100%;
            margin-top: 12px;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 8px;
            border: 1px solid #CBD5E1;
            text-align: start;
        }

        th {
            background: #F1F5F9;
        }

        .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    </style>
</head>
<body>
    <main class="sparkline-card">
        <figure
            aria-labelledby="sparkline-caption"
        >
            <figcaption
                id="sparkline-caption"
            >
                <h1>
                    Monthly Sales Performance
                </h1>
            </figcaption>

            <p
                id="sparkline-description"
                class="sparkline-summary"
            >
                Sales declined in February and then
                increased to the highest value in June.
            </p>

            <div class="sparkline-toolbar">
                <button
                    id="update-data"
                    type="button"
                >
                    Update Sales
                </button>

                <button
                    id="toggle-rtl"
                    type="button"
                >
                    Enable RTL
                </button>
            </div>

            <div
                id="sparkline"
                aria-describedby="sparkline-description"
            ></div>

            <p
                id="sparkline-status"
                class="visually-hidden"
                role="status"
                aria-live="polite"
                aria-atomic="true"
            ></p>

            <details>
                <summary>
                    View monthly sales data
                </summary>

                <table>
                    <caption>
                        Monthly sales values
                    </caption>

                    <thead>
                        <tr>
                            <th scope="col">
                                Month
                            </th>
                            <th scope="col">
                                Sales
                            </th>
                        </tr>
                    </thead>

                    <tbody id="sales-table-body">
                    </tbody>
                </table>
            </details>
        </figure>
    </main>

   <script scr="index.js"></script>
</body>
</html>
```

### index.ts

```typescript
import {
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

interface SalesData {
    month: string;
    sales: number;
}

Sparkline.Inject(
    SparklineTooltip
);

const initialSalesData: SalesData[] = [
    {
        month: 'January',
        sales: 35
    },
    {
        month: 'February',
        sales: 28
    },
    {
        month: 'March',
        sales: 34
    },
    {
        month: 'April',
        sales: 32
    },
    {
        month: 'May',
        sales: 40
    },
    {
        month: 'June',
        sales: 42
    }
];

const updatedSalesData: SalesData[] = [
    {
        month: 'January',
        sales: 38
    },
    {
        month: 'February',
        sales: 31
    },
    {
        month: 'March',
        sales: 36
    },
    {
        month: 'April',
        sales: 39
    },
    {
        month: 'May',
        sales: 44
    },
    {
        month: 'June',
        sales: 47
    }
];

const sparklineElement:
    HTMLElement | null =
        document.querySelector(
            '#sparkline'
        );

if (!sparklineElement) {
    throw new Error(
        'The Sparkline container was not found.'
    );
}

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '180px',
        type: 'Column',
        valueType: 'Category',
        dataSource:
            initialSalesData,
        xName: 'month',
        yName: 'sales',
        fill: '#005A9C',
        highPointColor: '#166534',
        lowPointColor: '#B91C1C',
        containerArea: {
            background: '#FFFFFF',
            border: {
                color: '#64748B',
                width: 1
            }
        },
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 8,
            fill: '#FFFFFF',
            border: {
                color: '#111827',
                width: 2
            }
        },
        dataLabelSettings: {
            visible: [
                'High',
                'Low'
            ],
            format: '${y}',
            fill: '#FFFFFF',
            border: {
                color: '#475569',
                width: 1
            },
            textStyle: {
                color: '#111827',
                size: '12px',
                fontFamily: 'Segoe UI',
                fontWeight: '600'
            }
        },
        tooltipSettings: {
            visible: true,
            format: '${x} : ${y}',
            fill: '#111827',
            border: {
                color: '#374151',
                width: 1
            },
            textStyle: {
                color: '#FFFFFF',
                size: '12px',
                fontFamily: 'Segoe UI',
                fontWeight: '500'
            },
            trackLineSettings: {
                visible: true,
                color: '#475569',
                width: 1
            }
        },
        padding: {
            left: 12,
            right: 12,
            top: 24,
            bottom: 12
        }
    });

sparkline.appendTo(
    sparklineElement
);

sparklineElement.setAttribute(
    'aria-label',
    'Monthly sales from January through June'
);

const renderTable = (
    data: SalesData[]
): void => {
    const body:
        HTMLTableSectionElement | null =
            document.querySelector(
                '#sales-table-body'
            );

    if (!body) {
        return;
    }

    body.replaceChildren();

    data.forEach(
        (
            item: SalesData
        ): void => {
            const row:
                HTMLTableRowElement =
                    document.createElement(
                        'tr'
                    );

            const monthCell:
                HTMLTableCellElement =
                    document.createElement(
                        'th'
                    );

            monthCell.scope = 'row';
            monthCell.textContent =
                item.month;

            const salesCell:
                HTMLTableCellElement =
                    document.createElement(
                        'td'
                    );

            salesCell.textContent =
                new Intl.NumberFormat(
                    'en-US'
                ).format(item.sales);

            row.append(
                monthCell,
                salesCell
            );

            body.append(row);
        }
    );
};

renderTable(initialSalesData);

const updateButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#update-data'
        );

if (updateButton) {
    updateButton.addEventListener(
        'click',
        (): void => {
            sparkline.dataSource =
                updatedSalesData;

            sparkline.dataBind();

            renderTable(
                updatedSalesData
            );

            const status:
                HTMLElement | null =
                    document.querySelector(
                        '#sparkline-status'
                    );

            if (status) {
                status.textContent =
                    'Monthly sales updated. ' +
                    'The minimum value is 31 and ' +
                    'the maximum value is 47.';
            }
        }
    );
}

const rtlButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#toggle-rtl'
        );

if (rtlButton) {
    rtlButton.addEventListener(
        'click',
        (): void => {
            sparkline.enableRtl =
                !sparkline.enableRtl;

            rtlButton.textContent =
                sparkline.enableRtl
                    ? 'Disable RTL'
                    : 'Enable RTL';

            sparkline.dataBind();
        }
    );
}
```

## Complete JavaScript Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Accessible Sparkline</title>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            color: #111827;
            font-family: "Segoe UI", sans-serif;
        }

        .sparkline-card {
            width: 100%;
            max-width: 560px;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #CBD5E1;
            border-radius: 12px;
            background: #FFFFFF;
        }

        #sparkline {
            width: 100%;
            height: 180px;
        }

        table {
            width: 100%;
            margin-top: 12px;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 8px;
            border: 1px solid #CBD5E1;
            text-align: start;
        }

        .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    </style>
</head>
<body>
    <main class="sparkline-card">
        <figure
            aria-labelledby="sparkline-caption"
        >
            <figcaption
                id="sparkline-caption"
            >
                <h1>
                    Monthly Sales Performance
                </h1>
            </figcaption>

            <p id="sparkline-description">
                Sales declined in February and then
                increased to the highest value in June.
            </p>

            <button
                id="update-data"
                type="button"
            >
                Update Sales
            </button>

            <div
                id="sparkline"
                aria-describedby="sparkline-description"
            ></div>

            <p
                id="sparkline-status"
                class="visually-hidden"
                role="status"
                aria-live="polite"
                aria-atomic="true"
            ></p>

            <details>
                <summary>
                    View monthly sales data
                </summary>

                <table>
                    <caption>
                        Monthly sales values
                    </caption>

                    <thead>
                        <tr>
                            <th scope="col">
                                Month
                            </th>
                            <th scope="col">
                                Sales
                            </th>
                        </tr>
                    </thead>

                    <tbody id="sales-table-body">
                    </tbody>
                </table>
            </details>
        </figure>
    </main>

    <script>
        var initialSalesData = [
            {
                month: 'January',
                sales: 35
            },
            {
                month: 'February',
                sales: 28
            },
            {
                month: 'March',
                sales: 34
            },
            {
                month: 'April',
                sales: 32
            },
            {
                month: 'May',
                sales: 40
            },
            {
                month: 'June',
                sales: 42
            }
        ];

        var updatedSalesData = [
            {
                month: 'January',
                sales: 38
            },
            {
                month: 'February',
                sales: 31
            },
            {
                month: 'March',
                sales: 36
            },
            {
                month: 'April',
                sales: 39
            },
            {
                month: 'May',
                sales: 44
            },
            {
                month: 'June',
                sales: 47
            }
        ];

        var sparkline =
            new ej.charts.Sparkline({
                width: '100%',
                height: '180px',
                type: 'Column',
                valueType: 'Category',
                dataSource:
                    initialSalesData,
                xName: 'month',
                yName: 'sales',
                fill: '#005A9C',
                highPointColor: '#166534',
                lowPointColor: '#B91C1C',
                containerArea: {
                    background: '#FFFFFF',
                    border: {
                        color: '#64748B',
                        width: 1
                    }
                },
                markerSettings: {
                    visible: [
                        'High',
                        'Low'
                    ],
                    size: 8,
                    fill: '#FFFFFF',
                    border: {
                        color: '#111827',
                        width: 2
                    }
                },
                dataLabelSettings: {
                    visible: [
                        'High',
                        'Low'
                    ],
                    format: '${y}',
                    fill: '#FFFFFF',
                    border: {
                        color: '#475569',
                        width: 1
                    },
                    textStyle: {
                        color: '#111827',
                        size: '12px',
                        fontFamily:
                            'Segoe UI',
                        fontWeight: '600'
                    }
                },
                tooltipSettings: {
                    visible: true,
                    format: '${x} : ${y}',
                    fill: '#111827',
                    border: {
                        color: '#374151',
                        width: 1
                    },
                    textStyle: {
                        color: '#FFFFFF',
                        size: '12px',
                        fontFamily:
                            'Segoe UI',
                        fontWeight: '500'
                    },
                    trackLineSettings: {
                        visible: true,
                        color: '#475569',
                        width: 1
                    }
                },
                padding: {
                    left: 12,
                    right: 12,
                    top: 24,
                    bottom: 12
                }
            });

        sparkline.appendTo('#sparkline');

        var sparklineElement =
            document.getElementById(
                'sparkline'
            );

        sparklineElement.setAttribute(
            'aria-label',
            'Monthly sales from January through June'
        );

        function renderTable(data) {
            var body =
                document.getElementById(
                    'sales-table-body'
                );

            body.replaceChildren();

            data.forEach(
                function (item) {
                    var row =
                        document.createElement(
                            'tr'
                        );

                    var monthCell =
                        document.createElement(
                            'th'
                        );

                    monthCell.scope =
                        'row';

                    monthCell.textContent =
                        item.month;

                    var salesCell =
                        document.createElement(
                            'td'
                        );

                    salesCell.textContent =
                        new Intl.NumberFormat(
                            'en-US'
                        ).format(
                            item.sales
                        );

                    row.append(
                        monthCell,
                        salesCell
                    );

                    body.append(row);
                }
            );
        }

        renderTable(
            initialSalesData
        );

        document
            .getElementById(
                'update-data'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline.dataSource =
                        updatedSalesData;

                    sparkline.dataBind();

                    renderTable(
                        updatedSalesData
                    );

                    document
                        .getElementById(
                            'sparkline-status'
                        )
                        .textContent =
                            'Monthly sales updated. ' +
                            'The minimum value is 31 ' +
                            'and the maximum value is 47.';
                }
            );
    </script>
</body>
</html>
```

## Best Practices

### Do

- Provide a visible caption and concise trend summary.
- Provide a data table when users need exact values.
- Use color together with markers, labels, or text.
- Keep native buttons for user actions.
- Use a polite live region for meaningful updates.
- Use `enableRtl` and the HTML `dir` attribute for RTL layouts.
- Use `valueType: 'Category'` for localized string categories.
- Use `valueType: 'DateTime'` for JavaScript date values.
- Use `Intl.NumberFormat` and `Intl.DateTimeFormat` for surrounding text.
- Test with keyboard-only navigation and supported screen readers.
- Validate contrast in the final application theme.
- Use `dataBind()` after standard property changes.

### Do Not

- Make a static Sparkline focusable without a useful interaction.
- Invent Enter or arrow-key point navigation.
- Make tooltips the only source of exact data.
- Hide essential descriptions using `display: none`.
- Use `role="application"`.
- Rely only on red and green.
- place special-point colors inside `markerSettings`.
- Use Boolean data-label visibility.
- Use a root-level `trackball` property.
- Use a root-level `tooltip` property.
- recreate the Sparkline whenever the language changes.

## Combined Mistakes and Future References

### Incorrect Special-Point Color Placement

Incorrect:

```typescript
markerSettings: {
    visible: [
        'High',
        'Low'
    ],
    highPointColor: '#166534',
    lowPointColor: '#B91C1C'
}
```

Correct:

```typescript
highPointColor: '#166534',
lowPointColor: '#B91C1C',
markerSettings: {
    visible: [
        'High',
        'Low'
    ]
}
```

### Boolean Data-Label Visibility

Incorrect:

```typescript
dataLabelSettings: {
    visible: true
}
```

Correct:

```typescript
dataLabelSettings: {
    visible: [
        'High',
        'Low'
    ]
}
```

### Incorrect Tooltip Property

Incorrect:

```typescript
tooltip: {
    enable: true
}
```

Correct:

```typescript
tooltipSettings: {
    visible: true
}
```

### Incorrect Trackball Property

Incorrect:

```typescript
trackball: {
    enable: true
}
```

Correct:

```typescript
tooltipSettings: {
    visible: true,
    trackLineSettings: {
        visible: true
    }
}
```

### Missing Tooltip Module

Correct TypeScript setup:

```typescript
import {
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

Sparkline.Inject(
    SparklineTooltip
);
```

### Unsupported Enter Interaction

Do not imply that this exposes Sparkline point details:

```typescript
container.addEventListener(
    'keydown',
    (
        event: KeyboardEvent
    ): void => {
        if (event.key === 'Enter') {
            console.log(
                'Show tooltip'
            );
        }
    }
);
```

Use an actual button that opens a table or details region.

### Unnecessary tabindex

Avoid:

```html
<div
    id="sparkline"
    tabindex="0"
></div>
```

unless a real keyboard operation is associated with the focusable element.

### Hidden Screen-Reader Description

Avoid:

```html
<p style="display: none;">
    Sparkline description
</p>
```

Use a visually hidden class if the description should remain available to assistive technology.

### Missing Category valueType

Incorrect:

```typescript
dataSource: localizedData,
xName: 'label',
yName: 'value'
```

Correct:

```typescript
valueType: 'Category',
dataSource: localizedData,
xName: 'label',
yName: 'value'
```

### Missing DateTime valueType

Incorrect:

```typescript
dataSource: dateData,
xName: 'date',
yName: 'value'
```

Correct:

```typescript
valueType: 'DateTime',
dataSource: dateData,
xName: 'date',
yName: 'value'
```

### Updating Without dataBind

Incomplete:

```typescript
sparkline.dataSource =
    newData;
```

Correct:

```typescript
sparkline.dataSource =
    newData;

sparkline.dataBind();
```

### Recreating for Every Language

Avoid repeatedly calling:

```typescript
new Sparkline(...)
```

on the same element.

Update the existing instance:

```typescript
sparkline.dataSource =
    localizedData;

sparkline.enableRtl =
    isRtlLanguage;

sparkline.dataBind();
```

### Runtime-Safety Checklist

Before returning a Sparkline accessibility and localization example, verify:

1. `Sparkline` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.Sparkline`.
3. Tooltip usage imports and injects `SparklineTooltip`.
4. Tooltip configuration uses `tooltipSettings`.
5. Tracker-line configuration uses `trackLineSettings`.
6. Data-label visibility is an array.
7. Special-point colors are root Sparkline properties.
8. Category data uses `valueType: 'Category'`.
9. DateTime data uses `valueType: 'DateTime'`.
10. `xName` and `yName` match the datasource.
11. A meaningful visible caption is present.
12. A concise text summary is present.
13. Exact values are available through a table when required.
14. Essential descriptions are not hidden with `display: none`.
15. Static visualizations do not create unnecessary tab stops.
16. Native controls are used for actions.
17. Dynamic changes are announced only when meaningful.
18. The live region uses `role="status"` or `aria-live="polite"`.
19. RTL rendering uses `enableRtl`.
20. The surrounding RTL document uses `dir="rtl"`.
21. Localized category text comes from the datasource.
22. Number and date summaries use appropriate locale formatting.
23. Ordinary updates call `dataBind()`.
24. The host element exists before `appendTo()`.
25. The host has sufficient width and height.
26. Color contrast is tested in the final application.
27. Tooltip access is not the only way to obtain exact values.
28. The example is tested with keyboard and assistive technology.
29. TypeScript and JavaScript samples are complete and runnable.
30. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.