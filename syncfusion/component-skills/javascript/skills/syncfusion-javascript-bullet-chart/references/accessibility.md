# Accessibility

## Table of Contents

- [Accessibility](#accessibility)
  - [Overview](#overview)
  - [Accessibility Compliance](#accessibility-compliance)
  - [WAI-ARIA Support](#wai-aria-support)
    - [Generated Semantics](#generated-semantics)
    - [Host Description](#host-description)
    - [Visible Title and Summary](#visible-title-and-summary)
  - [Keyboard Support](#keyboard-support)
    - [Built-In Keyboard Commands](#built-in-keyboard-commands)
    - [Keyboard Focus](#keyboard-focus)
    - [Application-Owned Controls](#application-owned-controls)
    - [Custom Keyboard Handling](#custom-keyboard-handling)
  - [Screen Reader Support](#screen-reader-support)
    - [Persistent Text Alternative](#persistent-text-alternative)
    - [Semantic Data Table](#semantic-data-table)
    - [Dynamic Update Announcements](#dynamic-update-announcements)
    - [Tooltip Support](#tooltip-support)
    - [Data Label Support](#data-label-support)
  - [Color and Contrast](#color-and-contrast)
    - [High-Contrast Theme](#high-contrast-theme)
    - [Custom Accessible Colors](#custom-accessible-colors)
    - [Range and Marker Contrast](#range-and-marker-contrast)
    - [Avoid Color-Only Communication](#avoid-color-only-communication)
    - [Readable Text](#readable-text)
  - [Accessible Chart Patterns](#accessible-chart-patterns)
    - [Semantic Figure](#semantic-figure)
    - [Description List](#description-list)
    - [Data Table Alternative](#data-table-alternative)
    - [Accessible Status Information](#accessible-status-information)
  - [Right-to-Left Accessibility](#right-to-left-accessibility)
    - [RTL Chart](#rtl-chart)
    - [RTL Document Structure](#rtl-document-structure)
    - [Dynamic Language Switching](#dynamic-language-switching)
  - [Accessibility Testing](#accessibility-testing)
    - [Automated Testing](#automated-testing)
    - [Keyboard Testing](#keyboard-testing)
    - [Screen Reader Testing](#screen-reader-testing)
    - [Contrast Testing](#contrast-testing)
    - [Zoom and Reflow Testing](#zoom-and-reflow-testing)
  - [Complete TypeScript Example](#complete-typescript-example)
  - [Complete JavaScript Example](#complete-javascript-example)
  - [Best Practices](#best-practices)
  - [Troubleshooting](#troubleshooting)
    - [Bullet Chart Is Not Announced](#bullet-chart-is-not-announced)
    - [Keyboard Focus Does Not Reach the Chart](#keyboard-focus-does-not-reach-the-chart)
    - [Arrow Keys Do Not Navigate Data Points](#arrow-keys-do-not-navigate-data-points)
    - [Enter or Space Does Not Select a Point](#enter-or-space-does-not-select-a-point)
    - [Tooltip Is Not Announced Reliably](#tooltip-is-not-announced-reliably)
    - [Data Labels Are Missing](#data-labels-are-missing)
    - [Data Label Template Does Not Work](#data-label-template-does-not-work)
    - [Custom Palette Does Not Work](#custom-palette-does-not-work)
    - [Conditional Point Styling Does Not Work](#conditional-point-styling-does-not-work)
    - [Accessibility Check Method Is Missing](#accessibility-check-method-is-missing)
    - [RTL Text Is Incorrect](#rtl-text-is-incorrect)
  - [Related Topics](#related-topics)


## Overview

The EJ2 Bullet Chart supports accessibility through generated WAI-ARIA semantics, keyboard focus, printing through keyboard interaction, right-to-left rendering, readable labels, accessible themes, and application-level text alternatives.

Syncfusion documents the Bullet Chart against accessibility guidelines and standards including ADA, Section 508, WCAG 2.2, WAI-ARIA, screen-reader support, keyboard navigation, color contrast, mobile-device support, Accessibility Checker validation, and axe-core validation.

An accessible Bullet Chart implementation should include:

- A meaningful visible heading.
- A concise text summary.
- Valid actual and target values.
- A logical keyboard focus order.
- Visible focus styling on application-owned controls.
- Sufficient color contrast.
- Information that is not communicated through color alone.
- A semantic data table when users need every value.
- Live announcements for important dynamic updates.
- Correct language and direction for RTL content.
- Testing with keyboard, screen readers, zoom, and automated tools.

Built-in component accessibility does not make the complete application automatically conformant. The surrounding content, controls, status messages, colors, and workflows must also be tested.

## Accessibility Compliance

Syncfusion documents the following accessibility areas for Bullet Chart:

| Accessibility criterion | Documented support |
|---|---|
| WCAG 2.2 | Supported |
| Section 508 | Supported |
| Screen readers | Supported |
| Keyboard navigation | Supported |
| Right-to-left rendering | Supported |
| Color contrast | Supported |
| Mobile devices | Supported |
| Accessibility Checker validation | Supported |
| axe-core validation | Supported |

The exact compatibility indicators should be checked against the documentation for the installed EJ2 version rather than described as unconditional application-wide conformance.

Applications must still validate:

- Custom colors.
- Custom HTML tooltip content.
- Visible focus indicators.
- Text alternatives.
- Data tables.
- Dynamic updates.
- Browser zoom and reflow.
- Product-specific keyboard workflows.
- Localization and RTL output.

## WAI-ARIA Support

The Bullet Chart uses WAI-ARIA patterns including:

- `img` role.
- `button` role.
- `aria-label`.
- `aria-pressed`.

### Generated Semantics

The Bullet Chart generates its own accessible SVG content and ARIA information.

Do not assume that Bullet Chart supports regular Cartesian Chart accessibility properties such as:

```typescript
accessibility: {
  accessibilityDescription:
    'Performance Chart',
  accessibilityRole:
    'img'
}
```

The standard Bullet Chart model does not expose the same documented `accessibility` object used by the regular Cartesian `Chart`.

Also, do not use unsupported Bullet Chart properties such as:

```typescript
ariaLabel
```

```typescript
description
```

Provide descriptions through semantic HTML around the Bullet Chart.

### Host Description

Associate the Bullet Chart host with visible descriptive content.

```html
<section
  aria-labelledby="sales-heading"
>
  <h1 id="sales-heading">
    Sales Performance
  </h1>

  <p id="sales-description">
    Actual sales are 55 units against a target of
    75 units. The remaining gap is 20 units.
  </p>

  <div
    id="bullet-chart"
    aria-describedby="sales-description"
  ></div>
</section>
```

Use `aria-describedby` to connect the host with a concise text alternative.

Avoid adding a conflicting manual `role="img"` to the host when the generated Bullet Chart content already provides image semantics.

### Visible Title and Summary

Use a visible heading in addition to the internal Bullet Chart title.

```html
<h1 id="performance-heading">
  Quarterly Sales Performance
</h1>

<p id="performance-summary">
  The North Region achieved 85 million against a target
  of 90 million. The South Region achieved 72 million
  against a target of 85 million.
</p>

<div
  id="bullet-chart"
  aria-labelledby="performance-heading"
  aria-describedby="performance-summary"
></div>
```

Configure the internal title when useful:

```typescript
title: 'Quarterly Sales Performance',
subtitle:
  'Actual revenue compared with target'
```

The visible HTML heading provides page structure, while the Bullet Chart title provides context inside the visualization.

## Keyboard Support

### Built-In Keyboard Commands

Syncfusion documents the following Bullet Chart keyboard interactions:

| Key | Action |
|---|---|
| `Tab` | Moves focus to the next element in the Bullet Chart |
| `Shift + Tab` | Moves focus to the previous element in the Bullet Chart |
| `Ctrl + P` | Prints the Bullet Chart |

These are the documented Bullet Chart keyboard commands.

Do not copy the larger regular Cartesian Chart keyboard command list into Bullet Chart documentation.

The following are not documented as built-in Bullet Chart commands:

- Arrow-key navigation between data points.
- `Enter` or `Space` point selection.
- `Escape` to close a point tooltip.
- Point or series selection through the keyboard.
- Zooming or panning shortcuts.

### Keyboard Focus

Use the Bullet Chart `tabIndex` property to place the component in the natural tab order.

```typescript
import {
  BulletChart
} from '@syncfusion/ej2-charts';

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 55,
        target: 75,
        category: 'Sales'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20,
    tabIndex: 0
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Use:

```typescript
tabIndex: 0
```

Do not use:

```typescript
allowKeyboardInteraction: true
```

The Bullet Chart model exposes `tabIndex`; it does not expose a documented `allowKeyboardInteraction` property.

Avoid positive tab-index values such as:

```typescript
tabIndex: 4
```

A positive value creates a separate tab sequence that is difficult to maintain.

### Application-Owned Controls

Use native HTML controls for updates, filtering, drill-down, printing, export, theme switching, and language switching.

```html
<div
  class="chart-actions"
  role="group"
  aria-label="Performance Chart actions"
>
  <button
    id="update-performance"
    type="button"
  >
    Update performance
  </button>

  <button
    id="print-chart"
    type="button"
  >
    Print Chart
  </button>
</div>
```

Native buttons provide:

- Keyboard activation.
- Focus behavior.
- Button semantics.
- Disabled-state support.
- Compatibility with assistive technologies.

```typescript
const printButton:
  HTMLButtonElement | null =
  document.getElementById(
    'print-chart'
  ) as HTMLButtonElement | null;

const printChart = (): void => {
  bulletChart.print();
};

printButton?.addEventListener(
  'click',
  printChart
);
```

### Custom Keyboard Handling

Do not add custom `keydown` or `keyup` properties to the Bullet Chart configuration.

Unsupported:

```typescript
const bulletChart =
  new BulletChart({
    keyDown: (args) => {
      console.log(args);
    },
    keyUp: (args) => {
      console.log(args);
    }
  });
```

When an application-owned control needs a custom shortcut, attach the listener to that control or a clearly scoped container.

```typescript
const chartActions:
  HTMLElement | null =
  document.getElementById(
    'chart-actions'
  );

const handleActionKeyDown =
  (
    event: KeyboardEvent
  ): void => {
    if (
      event.altKey &&
      event.key.toLowerCase() === 'u'
    ) {
      event.preventDefault();

      updatePerformance();
    }
  };

chartActions?.addEventListener(
  'keydown',
  handleActionKeyDown
);
```

Do not override standard browser or assistive-technology shortcuts without a validated requirement.

## Screen Reader Support

### Persistent Text Alternative

Provide meaningful text that remains available without hover or focus.

```html
<p id="performance-summary">
  Revenue is 85 million against a target of 90 million,
  which is 94.4 percent of the target.
</p>

<div
  id="bullet-chart"
  aria-describedby="performance-summary"
></div>
```

The summary should explain:

- The metric.
- The unit.
- The actual value.
- The target value.
- The most important comparison or difference.

Do not place every value in a long `aria-label` when a visible paragraph or table would be easier to read and maintain.

### Semantic Data Table

Use a real data table when users need complete values.

```html
<table>
  <caption id="performance-table-caption">
    Regional sales performance represented in the Bullet Chart
  </caption>

  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Actual</th>
      <th scope="col">Target</th>
      <th scope="col">Achievement</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <th scope="row">North</th>
      <td>85 million</td>
      <td>90 million</td>
      <td>94.4 percent</td>
    </tr>

    <tr>
      <th scope="row">South</th>
      <td>72 million</td>
      <td>85 million</td>
      <td>84.7 percent</td>
    </tr>
  </tbody>
</table>
```

Do not use:

```html
<table role="presentation">
```

A data table conveys meaningful relationships and must retain table semantics.

Use:

- `<caption>`
- `<thead>`
- `<tbody>`
- `<th scope="col">`
- `<th scope="row">`

Associate the table with the Bullet Chart when appropriate:

```html
<div
  id="bullet-chart"
  aria-describedby="performance-summary performance-table-caption"
></div>
```

### Dynamic Update Announcements

Use a persistent ARIA live region.

```html
<p
  id="bullet-chart-status"
  class="visually-hidden"
  aria-live="polite"
  aria-atomic="true"
></p>
```

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

```typescript
const liveRegion:
  HTMLElement | null =
  document.getElementById(
    'bullet-chart-status'
  );

function announceUpdate(
  message: string
): void {
  if (!liveRegion) {
    return;
  }

  liveRegion.textContent = '';

  window.setTimeout(
    (): void => {
      liveRegion.textContent =
        message;
    },
    50
  );
}
```

After updating the Bullet Chart:

```typescript
bulletChart.dataSource = [
  {
    value: 72,
    target: 85,
    category: 'Sales'
  }
];

bulletChart.refresh();

announceUpdate(
  'Sales performance was updated. ' +
  'The actual value is 72 and the target is 85.'
);
```

Announce meaningful state changes only. Do not announce every animation frame, pointer movement, or render callback.

### Tooltip Support

Import and inject `BulletTooltip`.

```typescript
import {
  BulletChart,
  BulletTooltip
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  BulletTooltip
);
```

Enable the tooltip:

```typescript
tooltip: {
  enable: true,
  template:
    '<div class="bullet-tooltip">' +
    '<strong>Actual:</strong> ${value}<br>' +
    '<strong>Target:</strong> ${target}' +
    '</div>'
}
```

The Bullet Chart tooltip uses `template`, not the regular Cartesian Chart `format` property.

Do not use:

```typescript
tooltip: {
  format:
    'Actual: ${value}, Target: ${target}'
}
```

Do not attempt calculations inside the template:

```typescript
'${(value / target) * 100}'
```

Calculate achievement values in application code and include them in persistent text or a semantic table.

Tooltips supplement the accessible experience. They are not a replacement for a visible summary or table.

### Data Label Support

Enable actual-value labels through `dataLabel.enable`.

```typescript
dataLabel: {
  enable: true,
  labelStyle: {
    color: '#242424',
    size: '14px',
    fontFamily:
      'Segoe UI, sans-serif',
    fontStyle: 'Normal',
    fontWeight: '600',
    opacity: 1
  }
}
```

Use:

```typescript
dataLabel: {
  enable: true
}
```

Do not use:

```typescript
dataLabel: {
  visible: true
}
```

The Bullet Chart data-label API supports `enable` and `labelStyle`. It does not expose documented `template`, `position`, `border`, or `margin` properties.

Data labels display the actual value. They do not automatically create a combined category, actual, target, and achievement description.

## Color and Contrast

### High-Contrast Theme

Use the built-in `HighContrast` theme when it suits the application.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    theme: 'HighContrast',
    dataSource: [
      {
        value: 55,
        target: 75,
        category: 'Sales'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

A theme can help establish accessible defaults, but custom colors and surrounding content still require testing.

Do not use `HighContrast` merely as a generic dark theme. Use an appropriate standard dark theme when high-contrast behavior is not required.

### Custom Accessible Colors

Bullet Chart does not expose a regular Cartesian Chart `palette` property.

Do not use:

```typescript
palette: [
  '#000000',
  '#FFFFFF'
]
```

Customize supported elements directly:

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    valueFill: '#005A9C',
    targetColor: '#242424',
    targetWidth: 6,
    ranges: [
      {
        end: 60,
        color: '#D13438',
        opacity: 0.12
      },
      {
        end: 80,
        color: '#C19C00',
        opacity: 0.12
      },
      {
        end: 100,
        color: '#107C10',
        opacity: 0.12
      }
    ],
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Use:

- `valueFill` for the actual bar.
- `targetColor` for target markers.
- `ranges[].color` and `ranges[].opacity` for qualitative zones.
- `labelStyle` for numeric labels.
- `categoryLabelStyle` for categories.
- `titleStyle` and `subtitleStyle` for headings.

### Range and Marker Contrast

Qualitative ranges should remain visually subordinate to actual and target measures.

```typescript
ranges: [
  {
    end: 60,
    color: '#D13438',
    opacity: 0.12,
    name: 'Below target'
  },
  {
    end: 80,
    color: '#C19C00',
    opacity: 0.12,
    name: 'Approaching target'
  },
  {
    end: 100,
    color: '#107C10',
    opacity: 0.12,
    name: 'Target achieved'
  }
],
valueFill: '#005A9C',
targetColor: '#242424'
```

Check contrast between:

- Actual bars and qualitative ranges.
- Target markers and actual bars.
- Target markers and range backgrounds.
- Numeric labels and backgrounds.
- Category labels and backgrounds.
- Focus indicators and adjacent colors.
- Tooltip text and tooltip fill.

### Avoid Color-Only Communication

Do not use color as the only performance indicator.

Supplement color with:

- Range names.
- Legend shapes.
- Actual and target values.
- Visible status text.
- Data labels.
- A semantic data table.
- A concise summary.

Example:

```html
<ul aria-label="Performance range definitions">
  <li>
    Below target: 0 through 60
  </li>
  <li>
    Approaching target: above 60 through 80
  </li>
  <li>
    Target achieved: above 80 through 100
  </li>
</ul>
```

The standard Bullet Chart does not expose a documented pattern-fill API for ranges or feature bars. Do not claim that arbitrary visual patterns can be applied through a `pointRender` event.

### Readable Text

Use the supported text-style properties.

```typescript
labelStyle: {
  color: '#242424',
  size: '14px',
  fontFamily:
    'Segoe UI, sans-serif',
  fontStyle: 'Normal',
  fontWeight: '400',
  opacity: 1
},
categoryLabelStyle: {
  color: '#242424',
  size: '14px',
  fontFamily:
    'Segoe UI, sans-serif',
  fontStyle: 'Normal',
  fontWeight: '600',
  opacity: 1
},
titleStyle: {
  color: '#1A1A1A',
  size: '18px',
  fontFamily:
    'Segoe UI, sans-serif',
  fontStyle: 'Normal',
  fontWeight: '600',
  opacity: 1
}
```

Use:

```typescript
labelStyle
```

Do not use:

```typescript
axisLabelStyle
```

Use:

```typescript
size: '18px'
```

Do not use:

```typescript
fontSize: '18px'
```

The Bullet Chart category-label model does not expose a documented `margin` property.

## Accessible Chart Patterns

### Semantic Figure

```html
<figure
  aria-labelledby="sales-chart-heading"
  aria-describedby="sales-chart-summary"
>
  <h2 id="sales-chart-heading">
    Quarter 1 Sales Performance
  </h2>

  <div id="bullet-chart"></div>

  <figcaption id="sales-chart-summary">
    The North Region achieved 85 million against a
    target of 90 million. The South Region achieved
    72 million against a target of 85 million.
  </figcaption>
</figure>
```

Use a figure when the visualization and caption form a meaningful self-contained unit.

### Description List

Use a description list for a small number of metrics.

```html
<dl>
  <div>
    <dt>North Region actual</dt>
    <dd>85 million</dd>
  </div>

  <div>
    <dt>North Region target</dt>
    <dd>90 million</dd>
  </div>

  <div>
    <dt>North Region achievement</dt>
    <dd>94.4 percent</dd>
  </div>
</dl>
```

### Data Table Alternative

```html
<table>
  <caption>
    Quarter 1 regional sales performance
  </caption>

  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Actual sales</th>
      <th scope="col">Target sales</th>
      <th scope="col">Achievement</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <th scope="row">North</th>
      <td>85 million</td>
      <td>90 million</td>
      <td>94.4 percent</td>
    </tr>

    <tr>
      <th scope="row">South</th>
      <td>72 million</td>
      <td>85 million</td>
      <td>84.7 percent</td>
    </tr>
  </tbody>
</table>
```

Do not hide the only complete data alternative from assistive technologies.

### Accessible Status Information

Prepare status text from the same data bound to the Bullet Chart.

```typescript
interface PerformanceData {
  value: number;
  target: number;
  category: string;
  status: string;
}

function createPerformanceData(
  value: number,
  target: number,
  category: string
): PerformanceData {
  const achievement: number =
    target > 0
      ? value / target * 100
      : 0;

  const status: string =
    value >= target
      ? 'Target achieved'
      : (
          `${(
            target - value
          ).toFixed(1)} units ` +
          'below target'
        );

  return {
    value,
    target,
    category,
    status:
      `${status}. Achievement is ` +
      `${achievement.toFixed(1)} percent.`
  };
}
```

Display the status outside the Chart:

```html
<p id="performance-status"></p>
```

```typescript
const performanceStatus:
  HTMLElement | null =
  document.getElementById(
    'performance-status'
  );

if (performanceStatus) {
  performanceStatus.textContent =
    chartData
      .map(
        (
          item:
            PerformanceData
        ): string =>
          `${item.category}: ` +
          `${item.status}`
      )
      .join(' ');
}
```

Do not depend on an unverified Bullet Chart `pointRender` event to assign labels or borders conditionally.

For conditional actual-bar colors, map `valueFill` to a data-source color field.

## Right-to-Left Accessibility

### RTL Chart

```typescript
const arabicData = [
  {
    value: 85,
    target: 90,
    category: 'المبيعات'
  },
  {
    value: 72,
    target: 85,
    category: 'الأرباح'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    title: 'أداء الأعمال',
    subtitle:
      'مقارنة القيم الفعلية بالقيم المستهدفة',
    dataSource: arabicData,
    categoryField: 'category',
    valueField: 'value',
    targetField: 'target',
    enableRtl: true,
    minimum: 0,
    maximum: 100,
    interval: 20,
    categoryLabelStyle: {
      fontFamily:
        'Arial, sans-serif',
      size: '14px',
      color: '#242424',
      fontWeight: '600'
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Use a broadly available font that supports the target script. Do not depend on `Arial Unicode MS`, which may not be installed.

### RTL Document Structure

```html
<section
  lang="ar"
  dir="rtl"
  aria-labelledby="performance-heading"
>
  <h1 id="performance-heading">
    أداء الأعمال
  </h1>

  <p id="performance-summary">
    يعرض المخطط مقارنة الأداء الفعلي بالأهداف المحددة.
  </p>

  <div
    id="bullet-chart"
    aria-describedby="performance-summary"
  ></div>
</section>
```

Use:

- `lang="ar"` for Arabic.
- `lang="he"` for Hebrew.
- `dir="rtl"` for right-to-left content.
- `enableRtl: true` for the Bullet Chart.

### Dynamic Language Switching

```typescript
type SupportedLanguage =
  | 'en'
  | 'ar';

const localizedData = {
  en: [
    {
      value: 85,
      target: 90,
      category: 'Sales'
    },
    {
      value: 72,
      target: 85,
      category: 'Profit'
    }
  ],
  ar: [
    {
      value: 85,
      target: 90,
      category: 'المبيعات'
    },
    {
      value: 72,
      target: 85,
      category: 'الأرباح'
    }
  ]
};

function setLanguage(
  language: SupportedLanguage
): void {
  const isRtl: boolean =
    language === 'ar';

  document.documentElement.lang =
    language;

  document.documentElement.dir =
    isRtl
      ? 'rtl'
      : 'ltr';

  bulletChart.enableRtl =
    isRtl;

  bulletChart.title =
    isRtl
      ? 'أداء الأعمال'
      : 'Business Performance';

  bulletChart.subtitle =
    isRtl
      ? 'القيم الفعلية مقارنة بالأهداف'
      : 'Actual values compared with targets';

  bulletChart.dataSource =
    localizedData[language];

  bulletChart.refresh();
}
```

Also update visible summaries, tables, button labels, and live-region messages.

## Accessibility Testing

### Automated Testing

Use automated testing tools such as:

- axe-core.
- Accessibility Insights.
- Browser accessibility checkers.
- Lighthouse accessibility audits.
- HTML validators.

Syncfusion documents Accessibility Checker and axe-core validation for Bullet Chart.

Automated tools cannot validate all requirements. They do not fully determine:

- Whether the text alternative accurately communicates the visualization.
- Whether threshold names are meaningful.
- Whether the keyboard workflow is understandable.
- Whether the reading order is logical.
- Whether dynamic announcements are useful.
- Whether color distinctions are understandable.

The Bullet Chart does not expose a documented:

```typescript
bulletChart.checkAccessibility()
```

Do not use:

```typescript
if (
  bulletChart.checkAccessibility
) {
  bulletChart.checkAccessibility();
}
```

Run accessibility tools against the rendered application instead.

### Keyboard Testing

Test the complete page using only the keyboard.

Verify that:

1. The focus order follows the visual and logical order.
2. The Bullet Chart can participate in the tab sequence.
3. Application-owned buttons can be activated with `Enter` and `Space`.
4. Focus indicators remain visible.
5. Print and update actions do not trap focus.
6. Dynamic content does not unexpectedly move focus.
7. There are no positive tab-index values.
8. Standard browser shortcuts remain available.

### Screen Reader Testing

Test with combinations relevant to the supported browser matrix, such as:

- NVDA with Firefox or Chrome.
- JAWS with Chrome or Edge.
- VoiceOver with Safari.
- TalkBack with Chrome on Android.

Confirm that:

- The visible heading is announced.
- The summary is discoverable.
- The data table has correct row and column relationships.
- Buttons have meaningful names.
- Dynamic updates are announced once.
- RTL content is pronounced in the correct language.
- The reading order is logical.

### Contrast Testing

Measure contrast rather than assuming that named colors are accessible.

Common WCAG targets include:

- At least 4.5:1 for normal text.
- At least 3:1 for large text.
- At least 3:1 for meaningful graphical elements and focus indicators against adjacent colors.

Test:

- Labels.
- Titles.
- Tooltips.
- Target markers.
- Actual bars.
- Range boundaries where meaningful.
- Buttons.
- Focus indicators.

### Zoom and Reflow Testing

Test at:

- 200 percent browser zoom.
- 400 percent browser zoom where required.
- Narrow mobile widths.
- Landscape and portrait modes.
- Increased operating-system text scale.

Ensure that:

- Category labels remain understandable.
- Tables remain usable.
- Controls do not overlap.
- Important content is not clipped.
- Horizontal scrolling is limited to content that genuinely requires it.

## Complete TypeScript Example

```typescript
import {
  BulletChart,
  BulletTooltip
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  BulletTooltip
);

interface PerformanceData {
  value: number;
  target: number;
  category: string;
  status: string;
  color: string;
}

function createPerformanceData(
  value: number,
  target: number,
  category: string
): PerformanceData {
  const validTarget: boolean =
    Number.isFinite(target) &&
    target > 0;

  const achievement: number =
    validTarget
      ? value / target * 100
      : 0;

  let status: string;
  let color: string;

  if (!validTarget) {
    status =
      'Target is unavailable.';
    color =
      '#808080';
  } else if (value >= target) {
    status =
      `Target achieved at ` +
      `${achievement.toFixed(1)} percent.`;
    color =
      '#005A9C';
  } else if (achievement >= 80) {
    status =
      `Approaching target at ` +
      `${achievement.toFixed(1)} percent.`;
    color =
      '#7A5500';
  } else {
    status =
      `Below target at ` +
      `${achievement.toFixed(1)} percent.`;
    color =
      '#A4262C';
  }

  return {
    value,
    target,
    category,
    status,
    color
  };
}

let chartData:
  PerformanceData[] = [
    createPerformanceData(
      85,
      90,
      'North Region'
    ),
    createPerformanceData(
      72,
      85,
      'South Region'
    )
  ];

const summaryElement:
  HTMLElement | null =
  document.getElementById(
    'performance-summary'
  );

const liveRegion:
  HTMLElement | null =
  document.getElementById(
    'bullet-chart-status'
  );

const tableBody:
  HTMLTableSectionElement | null =
  document.getElementById(
    'performance-table-body'
  ) as HTMLTableSectionElement | null;

function getSummary(
  data:
    PerformanceData[]
): string {
  return data
    .map(
      (
        item:
          PerformanceData
      ): string =>
        `${item.category} has an actual value ` +
        `of ${item.value} against a target of ` +
        `${item.target}. ${item.status}`
    )
    .join(' ');
}

function updateSummaryAndTable(
  data:
    PerformanceData[]
): void {
  if (summaryElement) {
    summaryElement.textContent =
      getSummary(data);
  }

  if (!tableBody) {
    return;
  }

  tableBody.replaceChildren();

  data.forEach(
    (
      item:
        PerformanceData
    ): void => {
      const row:
        HTMLTableRowElement =
        document.createElement(
          'tr'
        );

      const categoryCell:
        HTMLTableCellElement =
        document.createElement(
          'th'
        );

      categoryCell.scope =
        'row';

      categoryCell.textContent =
        item.category;

      const actualCell:
        HTMLTableCellElement =
        document.createElement(
          'td'
        );

      actualCell.textContent =
        String(item.value);

      const targetCell:
        HTMLTableCellElement =
        document.createElement(
          'td'
        );

      targetCell.textContent =
        String(item.target);

      const statusCell:
        HTMLTableCellElement =
        document.createElement(
          'td'
        );

      statusCell.textContent =
        item.status;

      row.append(
        categoryCell,
        actualCell,
        targetCell,
        statusCell
      );

      tableBody.appendChild(
        row
      );
    }
  );
}

function announceUpdate(
  message: string
): void {
  if (!liveRegion) {
    return;
  }

  liveRegion.textContent = '';

  window.setTimeout(
    (): void => {
      liveRegion.textContent =
        message;
    },
    50
  );
}

const bulletChart: BulletChart =
  new BulletChart({
    title:
      'Regional Sales Performance',
    subtitle:
      'Actual values compared with targets',
    dataSource:
      chartData,
    valueField:
      'value',
    targetField:
      'target',
    categoryField:
      'category',
    valueFill:
      'color',
    targetColor:
      '#242424',
    targetWidth:
      6,
    minimum:
      0,
    maximum:
      100,
    interval:
      20,
    labelFormat:
      '{value}',
    tabIndex:
      0,
    width:
      '100%',
    height:
      '420px',
    titleStyle: {
      color:
        '#1A1A1A',
      size:
        '18px',
      fontFamily:
        'Segoe UI, sans-serif',
      fontStyle:
        'Normal',
      fontWeight:
        '600',
      opacity:
        1
    },
    subtitleStyle: {
      color:
        '#404040',
      size:
        '13px',
      fontFamily:
        'Segoe UI, sans-serif',
      fontStyle:
        'Normal',
      fontWeight:
        '400',
      opacity:
        1
    },
    labelStyle: {
      color:
        '#242424',
      size:
        '13px',
      fontFamily:
        'Segoe UI, sans-serif',
      fontStyle:
        'Normal',
      fontWeight:
        '400',
      opacity:
        1
    },
    categoryLabelStyle: {
      color:
        '#242424',
      size:
        '14px',
      fontFamily:
        'Segoe UI, sans-serif',
      fontStyle:
        'Normal',
      fontWeight:
        '600',
      opacity:
        1,
      maximumTitleWidth:
        160,
      enableTrim:
        true,
      textOverflow:
        'Trim'
    },
    dataLabel: {
      enable:
        true,
      labelStyle: {
        color:
          '#242424',
        size:
          '13px',
        fontFamily:
          'Segoe UI, sans-serif',
        fontStyle:
          'Normal',
        fontWeight:
          '600',
        opacity:
          1
      }
    },
    ranges: [
      {
        end:
          60,
        color:
          '#A4262C',
        opacity:
          0.1,
        name:
          'Below target'
      },
      {
        end:
          80,
        color:
          '#7A5500',
        opacity:
          0.1,
        name:
          'Approaching target'
      },
      {
        end:
          100,
        color:
          '#005A9C',
        opacity:
          0.1,
        name:
          'Target achieved'
      }
    ],
    tooltip: {
      enable:
        true,
      fill:
        '#242424',
      border: {
        color:
          '#FFFFFF',
        width:
          1
      },
      textStyle: {
        color:
          '#FFFFFF',
        size:
          '13px',
        fontFamily:
          'Segoe UI, sans-serif',
        fontWeight:
          '400'
      },
      template:
        '<div class="bullet-tooltip">' +
        '<strong>Actual:</strong> ${value}<br>' +
        '<strong>Target:</strong> ${target}' +
        '</div>'
    },
    animation: {
      enable:
        !window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches,
      duration:
        window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches
          ? 0
          : 600,
      delay:
        0
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);

updateSummaryAndTable(
  chartData
);

const updateButton:
  HTMLButtonElement | null =
  document.getElementById(
    'update-performance'
  ) as HTMLButtonElement | null;

const printButton:
  HTMLButtonElement | null =
  document.getElementById(
    'print-chart'
  ) as HTMLButtonElement | null;

const updatePerformance =
  (): void => {
    chartData = [
      createPerformanceData(
        92,
        90,
        'North Region'
      ),
      createPerformanceData(
        80,
        85,
        'South Region'
      )
    ];

    bulletChart.dataSource =
      chartData;

    bulletChart.refresh();

    updateSummaryAndTable(
      chartData
    );

    announceUpdate(
      'Regional sales performance was updated. ' +
      getSummary(chartData)
    );
  };

const printChart =
  (): void => {
    bulletChart.print([
      'performance-heading',
      'performance-summary',
      'bullet-chart',
      'performance-table'
    ]);
  };

updateButton?.addEventListener(
  'click',
  updatePerformance
);

printButton?.addEventListener(
  'click',
  printChart
);

window.addEventListener(
  'beforeunload',
  (): void => {
    updateButton
      ?.removeEventListener(
        'click',
        updatePerformance
      );

    printButton
      ?.removeEventListener(
        'click',
        printChart
      );

    bulletChart.destroy();
  }
);
```

**HTML:**

```html
<section
  aria-labelledby="performance-heading"
>
  <h1 id="performance-heading">
    Regional Sales Performance
  </h1>

  <p id="performance-summary">
    The Bullet Chart compares regional actual values
    with their assigned targets.
  </p>

  <div
    id="bullet-chart"
    aria-describedby="performance-summary performance-table-caption"
  ></div>

  <div
    id="chart-actions"
    class="chart-actions"
    role="group"
    aria-label="Performance Chart actions"
  >
    <button
      id="update-performance"
      type="button"
    >
      Update performance
    </button>

    <button
      id="print-chart"
      type="button"
    >
      Print report
    </button>
  </div>

  <p
    id="bullet-chart-status"
    class="visually-hidden"
    aria-live="polite"
    aria-atomic="true"
  ></p>

  <table id="performance-table">
    <caption id="performance-table-caption">
      Regional sales values represented in the Bullet Chart
    </caption>

    <thead>
      <tr>
        <th scope="col">Region</th>
        <th scope="col">Actual</th>
        <th scope="col">Target</th>
        <th scope="col">Status</th>
      </tr>
    </thead>

    <tbody id="performance-table-body"></tbody>
  </table>
</section>
```

**CSS:**

```css
#bullet-chart {
  width: 100%;
  min-height: 420px;
}

.bullet-tooltip {
  min-width: 130px;
  padding: 8px 10px;
}

.chart-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.chart-actions button {
  min-height: 40px;
  padding: 8px 16px;
}

.chart-actions button:focus-visible {
  outline: 3px solid #0F6CBD;
  outline-offset: 2px;
}

table {
  width: 100%;
  margin-top: 16px;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #808080;
  text-align: left;
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

@media print {
  .chart-actions {
    display: none;
  }

  #bullet-chart,
  #performance-table {
    break-inside: avoid;
    page-break-inside: avoid;
  }
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

  <title>
    Accessible Bullet Chart
  </title>

  <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

  <style>
    #bullet-chart {
      width: 100%;
      min-height: 420px;
    }

    .bullet-tooltip {
      min-width: 130px;
      padding: 8px 10px;
    }

    .chart-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }

    .chart-actions button {
      min-height: 40px;
      padding: 8px 16px;
    }

    .chart-actions button:focus-visible {
      outline: 3px solid #0F6CBD;
      outline-offset: 2px;
    }

    table {
      width: 100%;
      margin-top: 16px;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 8px;
      border: 1px solid #808080;
      text-align: left;
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

    @media print {
      .chart-actions {
        display: none;
      }

      #bullet-chart,
      #performance-table {
        break-inside: avoid;
        page-break-inside: avoid;
      }
    }
  </style>
</head>

<body>
  <section
    aria-labelledby="performance-heading"
  >
    <h1 id="performance-heading">
      Regional Sales Performance
    </h1>

    <p id="performance-summary">
      The Bullet Chart compares regional actual values
      with their assigned targets.
    </p>

    <div
      id="bullet-chart"
      aria-describedby="performance-summary performance-table-caption"
    ></div>

    <div
      class="chart-actions"
      role="group"
      aria-label="Performance Chart actions"
    >
      <button
        id="update-performance"
        type="button"
      >
        Update performance
      </button>

      <button
        id="print-chart"
        type="button"
      >
        Print report
      </button>
    </div>

    <p
      id="bullet-chart-status"
      class="visually-hidden"
      aria-live="polite"
      aria-atomic="true"
    ></p>

    <table id="performance-table">
      <caption id="performance-table-caption">
        Regional sales values represented in the Bullet Chart
      </caption>

      <thead>
        <tr>
          <th scope="col">Region</th>
          <th scope="col">Actual</th>
          <th scope="col">Target</th>
          <th scope="col">Status</th>
        </tr>
      </thead>

      <tbody id="performance-table-body"></tbody>
    </table>
  </section>

  <script>
    ej.charts.BulletChart.Inject(
      ej.charts.BulletTooltip
    );

    function createPerformanceData(
      value,
      target,
      category
    ) {
      var validTarget =
        Number.isFinite(target) &&
        target > 0;

      var achievement =
        validTarget
          ? value / target * 100
          : 0;

      var status;
      var color;

      if (!validTarget) {
        status =
          'Target is unavailable.';
        color =
          '#808080';
      } else if (value >= target) {
        status =
          'Target achieved at ' +
          achievement.toFixed(1) +
          ' percent.';
        color =
          '#005A9C';
      } else if (achievement >= 80) {
        status =
          'Approaching target at ' +
          achievement.toFixed(1) +
          ' percent.';
        color =
          '#7A5500';
      } else {
        status =
          'Below target at ' +
          achievement.toFixed(1) +
          ' percent.';
        color =
          '#A4262C';
      }

      return {
        value: value,
        target: target,
        category: category,
        status: status,
        color: color
      };
    }

    var chartData = [
      createPerformanceData(
        85,
        90,
        'North Region'
      ),
      createPerformanceData(
        72,
        85,
        'South Region'
      )
    ];

    var summaryElement =
      document.getElementById(
        'performance-summary'
      );

    var liveRegion =
      document.getElementById(
        'bullet-chart-status'
      );

    var tableBody =
      document.getElementById(
        'performance-table-body'
      );

    function getSummary(data) {
      return data
        .map(function (item) {
          return (
            item.category +
            ' has an actual value of ' +
            item.value +
            ' against a target of ' +
            item.target +
            '. ' +
            item.status
          );
        })
        .join(' ');
    }

    function updateSummaryAndTable(
      data
    ) {
      if (summaryElement) {
        summaryElement.textContent =
          getSummary(data);
      }

      if (!tableBody) {
        return;
      }

      tableBody.replaceChildren();

      data.forEach(function (item) {
        var row =
          document.createElement(
            'tr'
          );

        var categoryCell =
          document.createElement(
            'th'
          );

        categoryCell.scope =
          'row';

        categoryCell.textContent =
          item.category;

        var actualCell =
          document.createElement(
            'td'
          );

        actualCell.textContent =
          String(item.value);

        var targetCell =
          document.createElement(
            'td'
          );

        targetCell.textContent =
          String(item.target);

        var statusCell =
          document.createElement(
            'td'
          );

        statusCell.textContent =
          item.status;

        row.append(
          categoryCell,
          actualCell,
          targetCell,
          statusCell
        );

        tableBody.appendChild(
          row
        );
      });
    }

    function announceUpdate(
      message
    ) {
      if (!liveRegion) {
        return;
      }

      liveRegion.textContent = '';

      window.setTimeout(
        function () {
          liveRegion.textContent =
            message;
        },
        50
      );
    }

    var prefersReducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    var bulletChart =
      new ej.charts.BulletChart({
        title:
          'Regional Sales Performance',
        subtitle:
          'Actual values compared with targets',
        dataSource:
          chartData,
        valueField:
          'value',
        targetField:
          'target',
        categoryField:
          'category',
        valueFill:
          'color',
        targetColor:
          '#242424',
        targetWidth:
          6,
        minimum:
          0,
        maximum:
          100,
        interval:
          20,
        labelFormat:
          '{value}',
        tabIndex:
          0,
        width:
          '100%',
        height:
          '420px',
        titleStyle: {
          color:
            '#1A1A1A',
          size:
            '18px',
          fontFamily:
            'Segoe UI, sans-serif',
          fontStyle:
            'Normal',
          fontWeight:
            '600',
          opacity:
            1
        },
        labelStyle: {
          color:
            '#242424',
          size:
            '13px',
          fontFamily:
            'Segoe UI, sans-serif',
          fontWeight:
            '400',
          opacity:
            1
        },
        categoryLabelStyle: {
          color:
            '#242424',
          size:
            '14px',
          fontFamily:
            'Segoe UI, sans-serif',
          fontWeight:
            '600',
          opacity:
            1
        },
        dataLabel: {
          enable:
            true,
          labelStyle: {
            color:
              '#242424',
            size:
              '13px',
            fontFamily:
              'Segoe UI, sans-serif',
            fontWeight:
              '600',
            opacity:
              1
          }
        },
        ranges: [
          {
            end:
              60,
            color:
              '#A4262C',
            opacity:
              0.1,
            name:
              'Below target'
          },
          {
            end:
              80,
            color:
              '#7A5500',
            opacity:
              0.1,
            name:
              'Approaching target'
          },
          {
            end:
              100,
            color:
              '#005A9C',
            opacity:
              0.1,
            name:
              'Target achieved'
          }
        ],
        tooltip: {
          enable:
            true,
          fill:
            '#242424',
          border: {
            color:
              '#FFFFFF',
            width:
              1
          },
          textStyle: {
            color:
              '#FFFFFF',
            size:
              '13px'
          },
          template:
            '<div class="bullet-tooltip">' +
            '<strong>Actual:</strong> ${value}<br>' +
            '<strong>Target:</strong> ${target}' +
            '</div>'
        },
        animation: {
          enable:
            !prefersReducedMotion,
          duration:
            prefersReducedMotion
              ? 0
              : 600,
          delay:
            0
        }
      });

    bulletChart.appendTo(
      '#bullet-chart'
    );

    updateSummaryAndTable(
      chartData
    );

    var updateButton =
      document.getElementById(
        'update-performance'
      );

    var printButton =
      document.getElementById(
        'print-chart'
      );

    function updatePerformance() {
      chartData = [
        createPerformanceData(
          92,
          90,
          'North Region'
        ),
        createPerformanceData(
          80,
          85,
          'South Region'
        )
      ];

      bulletChart.dataSource =
        chartData;

      bulletChart.refresh();

      updateSummaryAndTable(
        chartData
      );

      announceUpdate(
        'Regional sales performance was updated. ' +
        getSummary(chartData)
      );
    }

    function printChart() {
      bulletChart.print([
        'performance-heading',
        'performance-summary',
        'bullet-chart',
        'performance-table'
      ]);
    }

    if (updateButton) {
      updateButton.addEventListener(
        'click',
        updatePerformance
      );
    }

    if (printButton) {
      printButton.addEventListener(
        'click',
        printChart
      );
    }

    window.addEventListener(
      'beforeunload',
      function () {
        bulletChart.destroy();
      }
    );
  </script>
</body>
</html>
```

## Best Practices

1. **Provide a visible heading:** Identify the metric and reporting context.
2. **Provide a persistent summary:** Include actual values, targets, units, and meaningful comparisons.
3. **Use a semantic table:** Provide complete values when users need detailed access.
4. **Preserve generated semantics:** Avoid conflicting manual roles on the Bullet Chart host.
5. **Use `tabIndex`:** Place the Bullet Chart in the natural focus order.
6. **Use native buttons:** Add application actions through semantic controls.
7. **Preserve browser shortcuts:** Do not override standard print or assistive-technology commands unnecessarily.
8. **Use documented keyboard behavior:** Do not claim unsupported point navigation or selection.
9. **Use accessible colors:** Measure text, graphic, marker, and focus-indicator contrast.
10. **Avoid color-only meaning:** Supplement range and bar colors with text, names, values, and tables.
11. **Use supported label APIs:** Use `dataLabel.enable`, `dataLabel.labelStyle`, `labelStyle`, and `categoryLabelStyle`.
12. **Use tooltip templates correctly:** Use `${value}` and `${target}`.
13. **Do not rely only on tooltips:** Keep essential information persistently available.
14. **Announce meaningful updates:** Use a persistent polite live region.
15. **Respect reduced motion:** Disable animation when requested.
16. **Configure RTL comprehensively:** Set `enableRtl`, `lang`, and `dir`, and localize visible content.
17. **Test manually:** Use keyboard, screen readers, browser zoom, reflow, and high-contrast settings.
18. **Use automated tools appropriately:** Treat automated results as one part of accessibility testing.
19. **Keep data synchronized:** Update the Chart, summary, table, and live message together.
20. **Clean up resources:** Remove listeners and destroy the Bullet Chart when it is removed.

## Troubleshooting

### Bullet Chart Is Not Announced

- Provide a visible heading.
- Add a concise description through `aria-describedby`.
- Ensure that the Chart is not inside `aria-hidden="true"`.
- Avoid conflicting roles on the host.
- Test with the target browser and screen reader.
- Provide a semantic table when every value is required.

### Keyboard Focus Does Not Reach the Chart

- Set `tabIndex: 0`.
- Ensure that the Chart is visible.
- Ensure that no overlay blocks interaction.
- Avoid positive tab-index values.
- Check the natural DOM order.
- Do not use an unsupported `allowKeyboardInteraction` property.

### Arrow Keys Do Not Navigate Data Points

Bullet Chart documentation does not list arrow-key data-point navigation as a built-in command.

The documented keyboard behavior includes:

- `Tab`
- `Shift + Tab`
- `Ctrl + P` 

Use native application controls when category navigation or drill-down is required.

### Enter or Space Does Not Select a Point

The Bullet Chart does not use the regular Cartesian Chart selection model.

Do not use:

```typescript
selectionMode
```

```typescript
pointClick
```

```typescript
allowKeyboardInteraction
```

Use an accessible button, list, selector, or table for application selection.

### Tooltip Is Not Announced Reliably

- Do not use the tooltip as the only data alternative.
- Provide a visible summary.
- Provide a semantic table.
- Use the supported Bullet Chart tooltip `template`.
- Keep tooltip content concise.
- Do not calculate expressions inside the template.

### Data Labels Are Missing

Use:

```typescript
dataLabel: {
  enable: true
}
```

Do not use:

```typescript
dataLabel: {
  visible: true
}
```

### Data Label Template Does Not Work

The Bullet Chart data-label model does not expose a documented `template` property.

Use:

- `labelFormat` for actual-value formatting.
- `dataLabel.labelStyle` for appearance.
- A tooltip for actual and target values.
- Application-owned text for calculated content.

### Custom Palette Does Not Work

Bullet Chart does not expose a regular Cartesian Chart `palette` property.

Use:

- `valueFill`
- `targetColor`
- `ranges[].color`
- `titleStyle`
- `subtitleStyle`
- `labelStyle`
- `categoryLabelStyle`

### Conditional Point Styling Does Not Work

Do not depend on an unverified Bullet Chart `pointRender` event.

Add a color field to the data:

```typescript
{
  value: 85,
  target: 90,
  category: 'Revenue',
  color: '#005A9C'
}
```

Map it:

```typescript
valueFill: 'color'
```

### Accessibility Check Method Is Missing

The Bullet Chart does not expose a documented:

```typescript
checkAccessibility()
```

Run axe-core, Accessibility Insights, Lighthouse, or another external checker against the rendered application.

### RTL Text Is Incorrect

- Set the correct `lang`.
- Set `dir="rtl"`.
- Set `enableRtl: true`.
- Use localized category data.
- Use a font that supports the required script.
- Localize summaries, tables, controls, and live-region messages.
- Refresh after changing the language or direction.

## Related Topics

- See `references/title-tooltip-and-interactivity.md` for title and tooltip configuration.
- See `references/customization-dimensions-and-export.md` for themes, orientation, dimensions, and printing.
- See `references/data-binding-and-labels.md` for data-label and category-label configuration.
- See `references/value-bar-and-comparative-bar.md` for actual and target styling.
- See `references/ranges-and-qualitative-scale.md` for accessible performance zones.
- See `references/axis-customization.md` for scale labels and tick configuration.
