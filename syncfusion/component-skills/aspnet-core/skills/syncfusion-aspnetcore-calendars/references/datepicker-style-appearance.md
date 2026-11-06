# DatePicker — Style and Appearance

## Table of Contents
- [CSS Class Customization](#css-class-customization)
- [CSS Class Reference](#css-class-reference)
- [Customizing the Wrapper Element](#customizing-the-wrapper-element)
- [Customizing the Calendar Icon](#customizing-the-calendar-icon)
- [Customizing Individual Day Cells](#customizing-individual-day-cells)
- [Full Screen Mode on Mobile](#full-screen-mode-on-mobile)
- [Float Label](#float-label)

---

## CSS Class Customization

Use the `cssClass` property to attach a custom CSS class to the DatePicker root element. This allows scoped style overrides that do not affect other DatePicker instances on the page.

```cshtml
<ejs-datepicker id="datepicker" cssClass="custom-datepicker"></ejs-datepicker>
```

```css
/* Custom border color */
.custom-datepicker.e-date-wrapper {
    border-color: #0078d4;
}

/* Custom icon color */
.custom-datepicker .e-input-group-icon.e-date-icon {
    color: #0078d4;
}
```

---

## CSS Class Reference

| CSS Class | Applied To |
|---|---|
| `e-date-wrapper` | DatePicker wrapper element |
| `e-datepicker` | DatePicker input element |
| `e-float-text` | Floating label text |
| `e-date-icon` | Calendar toggle icon |
| `e-popup-wrapper` | Calendar popup wrapper |
| `e-calendar` | Calendar element inside popup |
| `e-header` | Calendar header |
| `e-title` | Calendar title (month/year text) |
| `e-icon-container` | Prev/next navigation icon container |
| `e-prev` | Previous navigation icon |
| `e-next` | Next navigation icon |
| `e-weekend` | Weekend day cells |
| `e-other-month` | Day cells from adjacent months |
| `e-day` | Individual day cells |
| `e-selected` | Currently selected date cell |
| `e-disabled` | Disabled date cells |

---

## Customizing the Wrapper Element

```css
/* Increase height and font size */
.e-input-group input.e-input,
.e-input-group.e-control-wrapper input.e-input {
    height: 40px;
    font-size: 16px;
}
```

---

## Customizing the Calendar Icon

```css
/* Change icon background and size */
.e-input-group .e-input-group-icon:last-child,
.e-input-group.e-control-wrapper .e-input-group-icon:last-child {
    font-size: 14px;
    background-color: #f0f0f0;
    color: #333;
}
```

---

## Customizing Individual Day Cells

Use the `renderDayCell` event to dynamically style or disable specific day cells (e.g., disable weekends):

```cshtml
<ejs-datepicker id="datepicker"
    renderDayCell="onRenderDayCell"
    placeholder="Select a weekday">
</ejs-datepicker>
```

```javascript
function onRenderDayCell(args) {
    // Disable Saturdays (6) and Sundays (0)
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
        args.isDisabled = true;
        args.element.classList.add('e-disabled');
    }
}
```

You can also apply custom CSS classes to individual cells:

```javascript
function onRenderDayCell(args) {
    // Highlight the 15th of every month
    if (args.date.getDate() === 15) {
        args.element.classList.add('highlight-day');
    }
}
```

```css
.highlight-day {
    background-color: #e6f7ff;
    font-weight: bold;
}
```

---

## Full Screen Mode on Mobile

Enable full-screen popup mode on mobile and tablet devices for better usability:

```cshtml
<ejs-datepicker id="datepicker" fullScreenMode="true"></ejs-datepicker>
```

When `fullScreenMode` is `true`, the calendar popup extends to fill the entire screen on mobile devices in both portrait and landscape orientations. This property is effective only on mobile/tablet devices.

---

## Float Label

Use `floatLabelType` to control placeholder label behavior:

| Value | Behavior |
|---|---|
| `Never` (default) | Label stays as placeholder, never floats |
| `Auto` | Floats above input when focused or value is set |
| `Always` | Always floats above the input |

```cshtml
<ejs-datepicker id="datepicker"
    placeholder="Select a date"
    floatLabelType="Auto">
</ejs-datepicker>
```
