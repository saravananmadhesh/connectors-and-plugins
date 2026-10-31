# DateTimePicker – Accessibility

## Table of Contents
- [Accessibility Compliance](#1-accessibility-compliance)
- [WAI-ARIA Attributes](#2-wai-aria-attributes)
- [Keyboard Navigation – Input](#3-keyboard-navigation--input)
- [Keyboard Navigation – Calendar Popup](#4-keyboard-navigation--calendar-popup)
- [Keyboard Navigation – Time Popup](#5-keyboard-navigation--time-popup)
- [Screen Reader Support](#6-screen-reader-support)
- [RTL Support](#7-rtl-support)

---

## 1. Accessibility Compliance

The DateTimePicker follows established accessibility guidelines:

| Accessibility Criteria | Support Level |
|---|---|
| WCAG 2.2 | AA |
| Section 508 | Partial |
| Screen Reader | Full |
| Right-to-Left (RTL) | Full |
| Color Contrast | Full |
| Mobile Device | Full |
| Keyboard Navigation | Full |
| Accessibility Checker Validation | Full |

---

## 2. WAI-ARIA Attributes

The DateTimePicker applies WAI-ARIA attributes to the input element for assistive technology support:

| Attribute | Description |
|---|---|
| `aria-expanded` | Indicates whether the popup is open or closed |
| `aria-disabled` | Indicates the disabled state of the component |
| `aria-activedescendant` | Identifies the currently active child element in the popup |

These attributes are managed automatically by the component.

---

## 3. Keyboard Navigation – Input

Before opening the popup, use these keys on the input element:

| Key | Action |
|---|---|
| `Alt + Down Arrow` | Open the calendar or time popup |
| `Alt + Down Arrow` (twice) | Toggle between calendar and time popups |

---

## 4. Keyboard Navigation – Calendar Popup

Once the calendar popup is open:

| Key | Action |
|---|---|
| `Up Arrow` | Focus the date in the previous week |
| `Down Arrow` | Focus the date in the next week |
| `Left Arrow` | Focus the previous date |
| `Right Arrow` | Focus the next date |
| `Home` | Focus the first date of the month |
| `End` | Focus the last date of the month |
| `Page Up` | Focus the same date in the previous month |
| `Page Down` | Focus the same date in the next month |
| `Enter` | Select the currently focused date |
| `Shift + Page Up` | Focus the same date in the previous year |
| `Shift + Page Down` | Focus the same date in the next year |
| `Ctrl + Up Arrow` | Navigate to a higher calendar view (month → year → decade) |
| `Ctrl + Down Arrow` | Navigate to a lower calendar view (decade → year → month) |
| `Ctrl + Home` | Focus the first date of the current year |
| `Ctrl + End` | Focus the last date of the current year |

---

## 5. Keyboard Navigation – Time Popup

Once the time popup is open:

| Key | Action |
|---|---|
| `Up Arrow` | Navigate and select the previous time item |
| `Down Arrow` | Navigate and select the next time item |
| `Left Arrow` | Move cursor in the input |
| `Right Arrow` | Move cursor in the input |
| `Home` | Navigate to the first time item |
| `End` | Navigate to the last time item |
| `Enter` | Select the focused time item |
| `Esc` | Close the time popup |
| `Tab` | Move focus to the next element |

---

## 6. Screen Reader Support

The DateTimePicker provides full screen reader support through WAI-ARIA attributes. Screen readers announce:
- Current selected date and time value
- Popup open/close state via `aria-expanded`
- Disabled state via `aria-disabled`
- Active popup item via `aria-activedescendant`

---

## 7. RTL Support

Enable RTL for right-to-left language support (Arabic, Hebrew):

```cshtml
<ejs-datetimepicker id="datetimepicker"
    locale="ar"
    enableRtl="true"
    placeholder="حدد تاريخًا ووقتًا">
</ejs-datetimepicker>
```

---

## API Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `enableRtl` | `bool` | `false` | Right-to-left rendering |
| `enabled` | `bool` | `true` | Enable/disable (sets aria-disabled) |
| `htmlAttributes` | `object` | `null` | Additional HTML attributes including ARIA |
