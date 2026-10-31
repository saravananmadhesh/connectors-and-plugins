# Kanban Accessibility

## Overview

The Syncfusion Vue Kanban component is built to meet WAI-ARIA specifications. It applies ARIA
roles, states, and properties so assistive technologies (screen readers, keyboard navigation)
work correctly with every part of the board.

## Accessibility Compliance Summary

| Accessibility Criteria | Support |
|---|---|
| WCAG 2.2 | ✅ Full |
| Section 508 | ✅ Full |
| Screen Reader | ✅ Full |
| Right-To-Left (RTL) | ✅ Full |
| Color Contrast | ⚠️ Intermediate |
| Mobile Device | ✅ Full |
| Keyboard Navigation | ✅ Full |
| Accessibility Checker Validation | ⚠️ Intermediate |
| Axe-core Validation | ✅ Full |

> ⚠️ **Intermediate** means some edge cases may not fully satisfy the criterion. Core functionality passes.

---

## WAI-ARIA Attributes

| Attribute | Purpose |
|---|---|
| `aria-label` | Provides a descriptive label for Kanban elements consumed by assistive technology. |
| `aria-expanded` | Indicates whether a collapsible column or swimlane row is expanded or collapsed. |
| `aria-selected` | Set on cards; defaults to `false`, changes to `true` when the card is selected. |
| `aria-grabbed` | Set to `true` when a card is actively being dragged; `false` when eligible but not grabbed. |
| `aria-describedby` | Associates a column body with its column header for screen-reader context. |
| `aria-roledescription` | Provides an alternative role description for card elements (e.g. "Kanban card"). |

---

## Keyboard Shortcuts

All keyboard shortcuts work when `allowKeyboard: true` (the default).

| Key | Action |
|---|---|
| `Home` | Select the first card in the board. |
| `End` | Select the last card in the board. |
| `Arrow Up` | Move selection to the card above. |
| `Arrow Down` | Move selection to the card below. |
| `Arrow Right` | Move column focus to the right. |
| `Arrow Left` | Move column focus to the left. |
| `Tab` | Navigate to the next Kanban column. |
| `Shift + Tab` | Navigate to the previous Kanban column (reverse tab order). |
| `Enter` | Open the selected card (edit dialog). |
| `Space` | Open the card edit dialog based on current column selection. |
| `Delete` | Delete the selected card(s). |
| `Ctrl + Enter` | Add the card to multi-selection. |
| `Ctrl + Space` | Add the card to multi-selection. |
| `Shift + Arrow Up` | Extend multi-selection upwards. |
| `Shift + Arrow Down` | Extend multi-selection downwards. |
| `Esc` | Close dialog / cancel in-progress edit. |

### Disabling Keyboard Interaction

To turn off keyboard support entirely:

```vue
<ejs-kanban :allowKeyboard="false" keyField="Status" :dataSource="kanbanData"
  :cardSettings="cardSettings">
  ...
</ejs-kanban>
```

---

## Screen Reader Support

The Kanban announces:
- Column names and card counts when navigating columns.
- Card header and content text when a card is focused.
- Selection state changes (`aria-selected`).
- Drag state when a card is grabbed (`aria-grabbed`).

---

## RTL (Right-To-Left) Support

Enable RTL layout for Arabic, Hebrew, and other right-to-left languages:

```vue
<ejs-kanban keyField="Status" :dataSource="kanbanData"
  locale="ar" :enableRtl="true" :cardSettings="cardSettings">
  ...
</ejs-kanban>
```

Combine with `L10n.load()` to translate all board UI strings.

---

## Ensuring Accessibility in Your App

- Use a unique, descriptive `id` on `<ejs-kanban>` so `aria-describedby` references resolve correctly.
- Set meaningful `headerText` on each `<e-column>` — this becomes the accessible label for the column.
- When using a custom card template, include visible text for card content so screen readers can announce it.
- Avoid disabling `allowKeyboard` unless your application provides an alternative interaction path.
- Test with [axe-core](https://www.npmjs.com/package/axe-core) or browser accessibility tools (Accessibility Insights, WAVE) after customization.
