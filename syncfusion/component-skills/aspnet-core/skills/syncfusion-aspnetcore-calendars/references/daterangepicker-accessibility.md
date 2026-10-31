# DateRangePicker — Accessibility

## Table of Contents
- [Accessibility Compliance](#accessibility-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction — Input Navigation](#keyboard-interaction--input-navigation)
- [Keyboard Interaction — Calendar Navigation](#keyboard-interaction--calendar-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Ensuring Accessibility](#ensuring-accessibility)

---

## Accessibility Compliance

The DateRangePicker component follows established accessibility guidelines and standards:

| Accessibility Criteria | Compatibility |
|---|---|
| WCAG 2.2 Support | **AA** |
| Section 508 Support | Partial |
| Screen Reader Support | ✅ Full |
| Right-To-Left Support | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device Support | ✅ Full |
| Keyboard Navigation Support | ✅ Full |
| Accessibility Checker Validation | ✅ Full |

---

## WAI-ARIA Attributes

The DateRangePicker implements WAI-ARIA specifications through attributes on the input element:

| Attribute | Description |
|---|---|
| `aria-expanded` | Indicates whether the calendar popup is currently open or closed |
| `aria-disabled` | Indicates the disabled state of the DateRangePicker |
| `aria-activedescendant` | References the currently focused date cell in the calendar |
| `role="grid"` | Applied to the calendar popup (contains a date grid) |
| `role="gridcell"` | Applied to each individual day cell within the calendar |

The calendar popup contains a grid role with grid cells for each day, providing structured navigation information to screen readers.

---

## Keyboard Interaction — Input Navigation

Use these keys to control the popup before or without opening it:

| Key | Action |
|---|---|
| `Alt + Down Arrow` | Opens the calendar popup |
| `Alt + Up Arrow` | Closes the calendar popup |
| `Esc` | Closes the calendar popup |

> **Tip:** To focus the DateRangePicker input from a page, use `Alt + T`.

---

## Keyboard Interaction — Calendar Navigation

Once the popup is open, use these keys to navigate the calendar:

| Key | Action |
|---|---|
| `Up Arrow` | Move focus to the same day in the previous week |
| `Down Arrow` | Move focus to the same day in the next week |
| `Left Arrow` | Move focus to the previous day |
| `Right Arrow` | Move focus to the next day |
| `Home` | Move focus to the first day of the current month |
| `End` | Move focus to the last day of the current month |
| `Page Up` | Move focus to the same date in the previous month |
| `Page Down` | Move focus to the same date in the next month |
| `Enter` | Select the currently focused date |
| `Shift + Page Up` | Move focus to the same date in the previous year |
| `Shift + Page Down` | Move focus to the same date in the next year |
| `Ctrl + Home` | Move focus to the first date of the current year |
| `Ctrl + End` | Move focus to the last date of the current year |
| `Alt + Right` | Move focus forward through the popup container elements |
| `Alt + Left` | Move focus backward through the popup container elements |

---

## Screen Reader Support

The DateRangePicker provides full screen reader support through:

- **Descriptive ARIA labels** on the input and popup elements
- **Grid role** on the calendar with `gridcell` roles for each day
- **`aria-expanded`** state announcements when the popup opens/closes
- **`aria-disabled`** announcements for disabled dates and the component itself
- **`aria-activedescendant`** updates as the user navigates day cells

When the user selects a date range, the screen reader announces the selected start and end dates.

---

## Ensuring Accessibility

The DateRangePicker's accessibility is verified using:

- **accessibility-checker** — Automated accessibility rule validation
- **axe-core** — Industry-standard accessibility testing engine

Both tools are run during automated testing to ensure WCAG 2.2 AA compliance is maintained across component updates.

**Basic accessible DateRangePicker:**

```cshtml
<ejs-daterangepicker id="daterangepicker"
    placeholder="Select a date range"
    aria-label="Date range selection">
</ejs-daterangepicker>
```

**Disabled DateRangePicker (accessible):**

```cshtml
<ejs-daterangepicker id="daterangepicker"
    enabled="false"
    placeholder="Date range unavailable">
</ejs-daterangepicker>
```
