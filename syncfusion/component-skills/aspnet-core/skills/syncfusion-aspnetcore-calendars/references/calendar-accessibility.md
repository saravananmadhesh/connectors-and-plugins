# Accessibility – ASP.NET Core Calendar

## Table of Contents
- [Compliance Summary](#compliance-summary)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [Screen Reader Support](#screen-reader-support)
- [RTL Support](#rtl-support)
- [Accessibility Example](#accessibility-example)

---

## Compliance Summary

The Calendar component follows these accessibility standards:

| Accessibility Criteria | Compliance |
|------------------------|-----------|
| WCAG 2.2 Support | **AA** |
| Section 508 Support | Intermediate |
| Screen Reader Support | ✅ Yes |
| Right-To-Left Support | ✅ Yes |
| Color Contrast | ✅ Yes |
| Mobile Device Support | ✅ Yes |
| Keyboard Navigation Support | ✅ Yes |
| Accessibility Checker Validation | ✅ Yes |

The Calendar adheres to [ADA](https://www.ada.gov/), [Section 508](https://www.section508.gov/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), and [WAI-ARIA](https://www.w3.org/TR/wai-aria/) specifications.

---

## WAI-ARIA Attributes

The Calendar provides built-in WAI-ARIA compliance through the following attributes:

| Attribute | Applied To | Description |
|-----------|-----------|-------------|
| `aria-label` | Prev/Next navigation buttons | Provides descriptive text for screen readers |
| `aria-selected` | Day cells | Indicates the currently selected date |
| `aria-disabled` | Disabled day cells | Marks dates that cannot be selected |
| `aria-activedescendant` | Calendar root | Points to the currently active day cell |
| `role="grid"` | Calendar content | Identifies the Calendar as a grid widget |
| `role="gridcell"` | Individual day cells | Identifies each focusable/selectable cell |

---

## Keyboard Interaction

The Calendar implements full keyboard navigation following [WAI-ARIA grid practices](https://www.w3.org/WAI/ARIA/apg/):

| Key | Action |
|-----|--------|
| `↑` (Up Arrow) | Focuses the same day in the previous week |
| `↓` (Down Arrow) | Focuses the same day in the next week |
| `←` (Left Arrow) | Focuses the previous day |
| `→` (Right Arrow) | Focuses the next day |
| `Home` | Focuses the first day of the current month |
| `End` | Focuses the last day of the current month |
| `Page Up` | Focuses the same date in the previous month |
| `Page Down` | Focuses the same date in the next month |
| `Enter` | Selects the currently focused date |
| `Shift + Page Up` | Focuses the same date in the previous year |
| `Shift + Page Down` | Focuses the same date in the next year |
| `Ctrl + ↑` | Moves to the inner level (month → year → decade) |
| `Ctrl + ↓` | Moves to the outer level (decade → year → month) |
| `Ctrl + Home` | Focuses the first date of the current year |
| `Ctrl + End` | Focuses the last date of the current year |

> **Tip:** To focus the Calendar control from outside, use `Alt + T`.

---

## Screen Reader Support

- The Calendar uses `role="grid"` on the calendar table and `role="gridcell"` on each day cell, which provides meaningful navigation cues to screen reader users.
- `aria-label` on the previous and next month buttons announces the action clearly.
- `aria-selected="true"` is applied to the selected date so screen readers announce it.
- `aria-activedescendant` dynamically updates as keyboard focus moves through cells.

---

## RTL Support

Enable RTL layout for right-to-left screen reader users with Arabic, Hebrew, or other RTL languages:

```cshtml
<ejs-calendar id="calendar" locale="ar" enableRtl="true"></ejs-calendar>
```

RTL mirrors the calendar layout: the navigation arrows swap sides, the header text aligns right, and cell traversal flows right-to-left.

---

## Accessibility Example

```cshtml
@* Fully accessible Calendar with ARIA, keyboard, and focus management *@
<ejs-calendar id="calendar"
    value="@DateTime.Now"
    showTodayButton="true">
</ejs-calendar>
```

No additional configuration is needed — the Calendar is accessible by default. Use `cssClass` only if you need to customize focus indicator colors to meet contrast requirements:

```css
/* Ensure sufficient focus contrast (WCAG 1.4.11) */
.e-calendar .e-content td.e-focused-date span.e-day {
    outline: 2px solid #005fcc;
    outline-offset: 2px;
}
```
