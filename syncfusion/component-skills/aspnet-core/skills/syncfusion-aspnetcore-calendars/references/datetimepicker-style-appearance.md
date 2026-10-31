# DateTimePicker – Style and Appearance

## Table of Contents
- [CSS Class Customization](#1-css-class-customization)
- [Customizing the Wrapper Element](#2-customizing-the-wrapper-element)
- [Customizing the Icons](#3-customizing-the-icons)
- [Customizing the Time Popup](#4-customizing-the-time-popup)
- [Customizing the Calendar Popup](#5-customizing-the-calendar-popup)
- [Day Cell Customization (renderDayCell)](#6-day-cell-customization-renderdaycell)
- [Full Screen Mode (Mobile)](#7-full-screen-mode-mobile)
- [Float Label Type](#8-float-label-type)

---

## 1. CSS Class Customization

Use `cssClass` to apply a scoped CSS class to the DateTimePicker wrapper, enabling targeted style overrides without affecting other instances:

```cshtml
<ejs-datetimepicker id="datetimepicker" cssClass="custom-datetimepicker"></ejs-datetimepicker>
```

```css
.custom-datetimepicker .e-input-group input.e-input {
    font-size: 16px;
    color: #333;
}
```

---

## 2. Customizing the Wrapper Element

Target `.e-input-group` to change height, font size, and background of the input wrapper:

```css
/* Height and font size */
.e-input-group input.e-input,
.e-input-group.e-control-wrapper input.e-input {
    font-size: 20px;
    height: 40px;
}
```

---

## 3. Customizing the Icons

Target `.e-datetime-wrapper` icon elements to change the calendar and clock icon appearance:

```css
/* Background color and font size for both date and time icons */
.e-datetime-wrapper .e-input-group-icon.e-date-icon,
.e-datetime-wrapper .e-input-group-icon.e-time-icon {
    font-size: 16px;
    background-color: blanchedalmond;
}
```

---

## 4. Customizing the Time Popup

Control the height and styling of the time popup list:

```css
/* Time popup height */
.e-datetimepicker.e-popup {
    height: 100px;
}
```

---

## 5. Customizing the Calendar Popup

The calendar popup inside the DateTimePicker uses the same CSS structure as the standalone Calendar component. Refer to the Calendar's style-appearance documentation for calendar-specific CSS class targets such as day cells, week headers, and navigation buttons.

---

## 6. Day Cell Customization (renderDayCell)

Use the `renderDayCell` event to customize or disable individual day cells on render. The event fires for each day cell in the calendar popup.

**Example — Disable weekends:**

```cshtml
<ejs-datetimepicker id="datetimepicker"
    renderDayCell="disableWeekends">
</ejs-datetimepicker>

<script>
    function disableWeekends(args) {
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }
</script>
```

---

## 7. Full Screen Mode (Mobile)

Enable `fullScreenMode` to display the calendar and time popup in full-screen on mobile devices (both portrait and landscape):

```cshtml
<ejs-datetimepicker id="datetimepicker" fullScreenMode="true"></ejs-datetimepicker>
```

> This feature is exclusive to mobile and tablet devices.

---

## 8. Float Label Type

Use `floatLabelType` to control the floating label behavior when a placeholder is set:

| Value | Behavior |
|---|---|
| `Never` (default) | Label never floats |
| `Always` | Label always floats above the input |
| `Auto` | Label floats above after focus or value entry |

```cshtml
<ejs-datetimepicker id="datetimepicker"
    placeholder="Select date and time"
    floatLabelType="Auto">
</ejs-datetimepicker>
```

---

## CSS Class Reference

| CSS Target | Description |
|---|---|
| `.e-datetime-wrapper` | Root wrapper element |
| `.e-input-group input.e-input` | Input field |
| `.e-input-group-icon.e-date-icon` | Calendar icon button |
| `.e-input-group-icon.e-time-icon` | Clock icon button |
| `.e-datetimepicker.e-popup` | Time popup container |
| `.e-list-item` | Time popup list items |
| `.e-list-item.e-active` | Selected time item |
| `.e-list-item:hover` | Hovered time item |

---

## API Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `cssClass` | `string` | `null` | Custom CSS class for the wrapper |
| `floatLabelType` | `FloatLabelType` | `Never` | Floating label behavior |
| `fullScreenMode` | `bool` | `false` | Full screen popup on mobile |
| `renderDayCell` | `string` | `null` | Event for customizing day cells |
