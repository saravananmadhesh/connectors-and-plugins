# Kanban Customization and Troubleshooting

## Table of Contents
- [CSS Classes Reference](#css-classes-reference)
- [Fixed Header with Scrollable Content](#fixed-header-with-scrollable-content)
- [Column Validation (min/max Card Count)](#column-validation-minmax-card-count)
- [Swimlane Constraint Validation](#swimlane-constraint-validation)
- [Validation Tooltip](#validation-tooltip)
- [Accessibility and WAI-ARIA](#accessibility-and-wai-aria)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Theme Customization](#theme-customization)

## CSS Classes Reference

Apply custom styles by targeting these stable CSS classes:

| CSS Class | Description |
|---|---|
| `.e-kanban` | Root element of the Kanban component |
| `.e-kanban-header` | Header row containing column titles |
| `.e-header-cells` | Individual column header cell |
| `.e-header-wrap` | Inner wrapper inside each header cell |
| `.e-kanban-content` | Scrollable content area below the header |
| `.e-content-row` | A row within the content area (one per swimlane + one for columns) |
| `.e-content-cells` | Individual column cell within a content row |
| `.e-card` | Individual card element |
| `.e-card-header` | Card header area |
| `.e-card-header-title` | Text inside the card header |
| `.e-card-content` | Card body content area |
| `.e-card-tags` | Tags area on a card |
| `.e-card-footer` | Card footer area |
| `.e-swimlane-row` | Swimlane header row |
| `.e-swimlane-header` | Inner content of a swimlane header |
| `.e-swimlane-text` | Text label inside a swimlane header |
| `.e-item-count` | Card count badge on column/swimlane headers |

Example — change card background color for cards in the "Done" column:

```css
/* Target cards inside the Close column */
.e-kanban .e-content-cells[data-key="Close"] .e-card {
  background-color: #e8f5e9;
  border-left: 3px solid #4caf50;
}
```

## Fixed Header with Scrollable Content

Make column headers sticky so they remain visible while scrolling through many cards:

```css
/* 1. Constrain the content area height */
.e-kanban .e-kanban-content {
  height: 500px;
  overflow-y: auto;
}

/* 2. Stick the header to the top of the kanban container */
.e-kanban .e-kanban-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #fff;
}
```

Apply this CSS globally or scope it with a custom `cssClass` prop on the board:

```vue
<ejs-kanban cssClass="fixed-header-board" ...>
```

```css
.fixed-header-board .e-kanban-content { height: 500px; overflow-y: auto; }
.fixed-header-board .e-kanban-header  { position: sticky; top: 0; z-index: 10; background: #fff; }
```

## Column Validation (min/max Card Count)

Enforce WIP (Work In Progress) limits by setting `minCount` and `maxCount` on individual columns. The Kanban shows a visual indicator when the limit is violated:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData" :cardSettings="cardSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"       :minCount="5"></e-column>
      <e-column headerText="In Progress" keyField="InProgress" :maxCount="3"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>
```

| Property | Behavior |
|---|---|
| `minCount` | Column header turns red when card count falls below this value |
| `maxCount` | Column header turns red when card count exceeds this value |

Both can be set on the same column. The violation indicator is visual only — cards can still be moved unless you add logic in the `dragStop` event.

## Swimlane Constraint Validation

By default, `minCount`/`maxCount` constraints apply per column across the entire board (`constraintType: 'Column'`). Change to `'Swimlane'` to enforce the limit within each swimlane row independently:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :swimlaneSettings="swimlaneSettings">
    <e-columns>
      <!-- max 2 in-progress cards per assignee (swimlane row) -->
      <e-column headerText="In Progress" keyField="InProgress" :maxCount="2"
        constraintType="Swimlane">
      </e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
const swimlaneSettings = { keyField: 'Assignee' };
</script>
```

`constraintType` values:
- `'Column'` (default) — constraint applies to total cards in the column
- `'Swimlane'` — constraint applies separately within each swimlane row

## Validation Tooltip

Show a tooltip explaining the constraint violation when the user hovers the column header indicator:

```vue
<e-column headerText="In Progress" keyField="InProgress"
  :maxCount="3" :enableTooltip="true">
</e-column>
```

The tooltip text is automatically generated (e.g. "Maximum card limit reached").

## Accessibility and WAI-ARIA

The Kanban component follows WAI-ARIA patterns. Key ARIA attributes used:

| Element | Attribute | Description |
|---|---|---|
| Column header | `aria-label` | Column name and card count |
| Column header | `aria-expanded` | `"true"` when column is expanded |
| Card | `aria-label` | Card header field value |
| Card | `aria-selected` | `"true"` when card is selected |
| Card (dragging) | `aria-grabbed` | `"true"` while the card is being dragged |
| Swimlane header | `aria-label` | Swimlane text and item count |
| Swimlane header | `aria-expanded` | `"true"` when the swimlane row is expanded |

These attributes are set and maintained automatically — no manual configuration needed.

### Screen Reader Behavior

- Column and swimlane headers announce their label and current card count
- Selected cards announce their header field value
- Drag state is communicated via `aria-grabbed`

## Keyboard Shortcuts

Full keyboard navigation is supported without any configuration:

| Key | Action |
|---|---|
| `Tab` | Move focus to the next card or interactive element |
| `Shift + Tab` | Move focus to the previous card or interactive element |
| `Arrow Keys` | Move focus between cards within a column |
| `Home` | Move focus to the first card in the current column |
| `End` | Move focus to the last card in the current column |
| `Ctrl + Enter` | Open the card details dialog for the focused card |
| `Ctrl + Space` | Begin a keyboard drag of the focused card |
| `Shift + Arrow Keys` | Move a card being keyboard-dragged to adjacent column (left/right) or position (up/down) |
| `Space` | Drop the card at the current keyboard-drag position |
| `ESC` | Cancel the keyboard drag and return the card to its original position |
| `Delete` | Delete the focused card (after confirmation dialog) |

Keyboard drag-and-drop (`Ctrl + Space` → `Shift + Arrows` → `Space`) gives full card-moving capability without a mouse.

## Theme Customization

Use Syncfusion Theme Studio to generate a custom theme with your brand colors:

- **Theme Studio URL**: [https://ej2.syncfusion.com/themestudio/](https://ej2.syncfusion.com/themestudio/)

Steps:
1. Open Theme Studio, select the **Tailwind** (or other) base theme
2. Choose "Kanban" from the component list
3. Adjust colors for header, card, swimlane, etc.
4. Export the CSS file and replace the import in your app:

```js
// Replace the default import in main.js / main.ts
import '../node_modules/@syncfusion/ej2/tailwind3.css'; // default
// with your generated file, e.g.:
import './my-custom-theme.css';
```

### SCSS Variable Overrides

If you use the SCSS distribution, override variables before importing:

```scss
$primary: #6200ea;
$kanban-card-bg: #f3e5f5;
@import '@syncfusion/ej2/scss/kanban';
```

Available SCSS variables are listed in the Syncfusion SCSS documentation for each theme.
