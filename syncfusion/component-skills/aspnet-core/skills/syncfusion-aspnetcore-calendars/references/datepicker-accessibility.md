# DatePicker — Accessibility

## Table of Contents
- [Compliance Summary](#compliance-summary)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation — Input](#keyboard-navigation--input)
- [Keyboard Navigation — Calendar Popup](#keyboard-navigation--calendar-popup)
- [Screen Reader Support](#screen-reader-support)
- [RTL and Color Contrast](#rtl-and-color-contrast)
- [Accessible DatePicker Example](#accessible-datepicker-example)

---

## Compliance Summary

| Accessibility Criteria | Support Level |
|---|---|
| WCAG 2.2 | AA |
| Section 508 | Partial |
| Screen Reader Support | Full |
| Right-To-Left Support | Full |
| Color Contrast | Full |
| Mobile Device Support | Full |
| Keyboard Navigation | Full |
| Accessibility Checker Validation | Full |

---

## WAI-ARIA Attributes

The DatePicker applies the following ARIA attributes to the input element:

| Attribute | Description |
|---|---|
| `aria-expanded` | Indicates whether the calendar popup is open (`true`) or closed (`false`) |
| `aria-disabled` | Indicates the disabled state of the DatePicker |
| `aria-activedescendant` | Points to the currently focused date cell in the calendar popup |

These attributes are managed automatically — no manual configuration is needed.

---

## Keyboard Navigation — Input

Use these keys to control the calendar popup from the input field:

| Key | Action |
|---|---|
| `Alt + Down Arrow` | Open the calendar popup |
| `Alt + Up Arrow` | Close the calendar popup |
| `Esc` | Close the calendar popup |

---

## Keyboard Navigation — Calendar Popup

Once the popup is open, use these keys to navigate the calendar:

| Key | Action |
|---|---|
| `Up Arrow` | Focus the same day in the previous week |
| `Down Arrow` | Focus the same day in the next week |
| `Left Arrow` | Focus the previous date |
| `Right Arrow` | Focus the next date |
| `Home` | Focus the first date in the current month |
| `End` | Focus the last date in the current month |
| `Page Up` | Focus the same date in the previous month |
| `Page Down` | Focus the same date in the next month |
| `Shift + Page Up` | Focus the same date in the previous year |
| `Shift + Page Down` | Focus the same date in the next year |
| `Enter` | Select the currently focused date |
| `Ctrl + Up Arrow` | Navigate up a view level (e.g., month → year → decade) |
| `Ctrl + Down Arrow` | Navigate down a view level (e.g., decade → year → month) |
| `Ctrl + Home` | Focus the first date of the current year |
| `Ctrl + End` | Focus the last date of the current year |

> **Tip:** Use `Alt+T` to set focus to the DatePicker input.

---

## Screen Reader Support

- When the calendar popup opens, screen readers announce the focused date.
- `aria-activedescendant` keeps screen readers aware of the currently highlighted cell as the user navigates.
- The "Today" button, navigation arrows, and month/year title are all accessible via keyboard and announced by screen readers.

---

## RTL and Color Contrast

- Enable RTL for Arabic, Hebrew, and other right-to-left languages with `enableRtl="true"`.
- The component ships with sufficient color contrast ratios for WCAG 2.2 AA compliance across all built-in themes.

---

## Accessible DatePicker Example

```cshtml
<ejs-datepicker id="datepicker"
    placeholder="Select a date"
    floatLabelType="Auto"
    showClearButton="true"
    enableRtl="false">
</ejs-datepicker>
```

For RTL (Arabic):

```cshtml
<ejs-datepicker id="datepicker"
    locale="ar"
    enableRtl="true"
    placeholder="اختر تاريخاً">
</ejs-datepicker>
```
