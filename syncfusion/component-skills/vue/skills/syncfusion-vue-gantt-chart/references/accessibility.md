````markdown
# Accessibility in Syncfusion Vue Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
- [High Contrast Theme](#high-contrast-theme)
- [Screen Reader Support](#screen-reader-support)
- [Focus Management](#focus-management)

---

## Overview

The Syncfusion Vue Gantt Chart is built to comply with **WCAG 2.1 Level AA** accessibility standards. It supports full keyboard navigation, ARIA roles/attributes, and high contrast themes to serve users who rely on assistive technologies.

---

## Keyboard Navigation

All Gantt interactions are operable via keyboard without requiring a mouse.

### Grid (Left Panel) Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next focusable element |
| `Shift + Tab` | Move focus to the previous focusable element |
| `Arrow Up / Down` | Move focus between rows |
| `Arrow Left / Right` | Move focus between cells (in cell selection mode) |
| `Enter` | Open the edit dialog or begin cell editing |
| `Escape` | Cancel the current edit or close the dialog |
| `Delete` | Delete the selected row (when `allowDeleting: true`) |
| `Ctrl + Home` | Move focus to the first row |
| `Ctrl + End` | Move focus to the last row |
| `Space` | Toggle row selection |
| `Shift + Click / Shift + Arrow` | Extend multi-row selection |
| `Ctrl + Click` | Add/remove row from multi-row selection |
| `F2` | Start editing the focused cell (Cell edit mode) |

### Toolbar Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move between toolbar items |
| `Enter / Space` | Activate the focused toolbar item |
| `Escape` | Move focus out of the toolbar back to the grid |

### Context Menu

| Key | Action |
|-----|--------|
| `Shift + F10` | Open context menu on the focused row |
| `Arrow Up / Down` | Navigate context menu items |
| `Enter` | Execute the focused menu item |
| `Escape` | Close the context menu |

---

## ARIA Attributes

The Gantt chart renders semantic ARIA roles and attributes for assistive technologies:

| Element | ARIA role / attribute |
|---------|----------------------|
| Grid panel | `role="treegrid"` |
| Row | `role="row"`, `aria-expanded` (parent rows), `aria-level` (hierarchy depth) |
| Cell | `role="gridcell"`, `aria-selected`, `aria-colindex` |
| Column header | `role="columnheader"`, `aria-sort` (when sorted) |
| Toolbar | `role="toolbar"` |
| Toolbar item | `role="button"`, `aria-label`, `aria-disabled` |
| Dialog | `role="dialog"`, `aria-labelledby`, `aria-modal="true"` |
| Taskbar | `aria-label` with task name, start/end date |
| Timeline | `role="presentation"` |

---

## High Contrast Theme

Use the `highcontrast` theme for users with visual impairments requiring higher color contrast ratios.

```css
/* In App.vue <style> or main.css — replace tailwind3 with highcontrast */
@import "../node_modules/@syncfusion/ej2-base/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-calendars/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-layouts/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-grids/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-treegrid/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-vue-gantt/styles/highcontrast.css";
```

> The high contrast theme meets WCAG 2.1 Level AA contrast ratio requirements (4.5:1 for normal text, 3:1 for large text). A `highcontrast-light` variant is also available.

---

## Screen Reader Support

The Gantt Chart supports screen readers (NVDA, JAWS, VoiceOver) through:

- Descriptive `aria-label` on taskbars: announces task name, start date, end date, and progress
- Row announcements on navigation: announces row index, task name, and expand/collapse state
- Dialog field labels: all form inputs in add/edit dialogs have associated `<label>` elements
- Error messages: validation errors are announced via `aria-live` regions

### Customizing Taskbar aria-label

Override the default taskbar label via `queryTaskbarInfo`:

```vue
<ejs-gantt @queryTaskbarInfo="onQueryTaskbarInfo" ...></ejs-gantt>

<script setup>
function onQueryTaskbarInfo(args) {
  // Custom aria-label for screen reader announcement
  args.taskbarAriaLabel =
    `${args.data.TaskName}: ${args.data.Progress}% complete, ` +
    `starts ${args.data.StartDate.toDateString()}, ` +
    `ends ${args.data.EndDate.toDateString()}`;
}
</script>
```

---

## Focus Management

- On initial load, focus is placed on the first row of the grid
- After a dialog closes (add/edit/delete confirm), focus returns to the triggering row
- After a toolbar action, focus returns to the toolbar button
- `autoFocusTasks: true` — scrolls the chart pane to bring the selected row's taskbar into view, keeping visual and keyboard focus in sync

```vue
<ejs-gantt :autoFocusTasks="true" ...></ejs-gantt>
```
````
