# Accessibility – ASP.NET Core TimePicker

## Table of Contents
- [Overview](#overview)
- [Accessibility Compliance Summary](#accessibility-compliance-summary)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [Programmatic Focus Example](#programmatic-focus-example)
- [Ensuring Accessibility](#ensuring-accessibility)

---

## Overview

The Syncfusion ASP.NET Core TimePicker is built with accessibility as a core requirement. It follows established web accessibility standards and guidelines to ensure usability for people with disabilities, including those using screen readers, keyboard-only navigation, or assistive technologies.

The TimePicker component complies with:
- **[ADA (Americans with Disabilities Act)](https://www.ada.gov/)**
- **[Section 508](https://www.section508.gov/)**
- **[WCAG 2.2](https://www.w3.org/TR/WCAG22/) – Level AA**
- **[WAI-ARIA Practices](http://www.w3.org/WAI/PF/aria-practices)**

---

## Accessibility Compliance Summary

| Criteria | Support Level |
|----------|--------------|
| WCAG 2.2 | AA |
| Section 508 | Full |
| Screen Reader Support | Full |
| Right-To-Left Support | Full |
| Color Contrast | Full |
| Mobile Device Support | Full |
| Keyboard Navigation | Full |
| Accessibility Checker Validation | Full |

---

## WAI-ARIA Attributes

The TimePicker implements the following WAI-ARIA attributes:

| Attribute | Description |
|-----------|-------------|
| `aria-haspopup` | Indicates the input opens a popup list |
| `aria-selected` | Indicates the currently selected time value |
| `aria-disabled` | Indicates the disabled state of the component |
| `aria-expanded` | Indicates whether the popup is currently open or closed |
| `aria-autocomplete` | Indicates whether input completion suggestions are provided |
| `aria-owns` | Establishes the parent/child relationship between the input and popup |
| `aria-activedescendant` | Tracks the currently active item in the popup list |
| `role` | The input plays the `combobox` role; the popup plays the `listbox` role |

---

## Keyboard Interaction

The TimePicker supports comprehensive keyboard navigation:

| Key | Action |
|-----|--------|
| `Up Arrow` | Navigate to and select the previous time item in the popup |
| `Down Arrow` | Navigate to and select the next time item in the popup |
| `Left Arrow` | Move the cursor left in the input |
| `Right Arrow` | Move the cursor right in the input |
| `Home` | Navigate to and select the first item in the popup |
| `End` | Navigate to and select the last item in the popup |
| `Enter` | Select the focused item and close the popup |
| `Alt + Up Arrow` | Close the popup |
| `Alt + Down Arrow` | Open the popup |
| `Esc` | Close the popup without selecting |

---

## Programmatic Focus Example

You can programmatically focus the TimePicker using a keyboard shortcut. The example below uses `Alt + T` to focus the control:

```cshtml
<script>
    document.onkeyup = function (e) {
        var timepicker = document.getElementById('timepicker').ej2_instances[0];
        if (e.altKey && e.keyCode === 84 /* t */) {
            // Press Alt+T to focus the TimePicker
            timepicker.focusIn(e);
        }
    };
</script>

<ejs-timepicker id="timepicker" placeholder="Select a time"></ejs-timepicker>
```

---

## Ensuring Accessibility

The TimePicker component's accessibility compliance is verified using:
- **[accessibility-checker](https://www.npmjs.com/package/accessibility-checker)** — automated accessibility rule validation
- **[axe-core](https://www.npmjs.com/package/axe-core)** — open-source accessibility testing engine

These tools run during automated testing to ensure WCAG and Section 508 requirements are met.

You can verify accessibility compliance interactively at the [Syncfusion accessibility sample](https://ej2.syncfusion.com/accessibility/time-picker.html).
