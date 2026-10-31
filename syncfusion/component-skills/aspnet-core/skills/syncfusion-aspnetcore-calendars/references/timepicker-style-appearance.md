# Style and Appearance – ASP.NET Core TimePicker

## Table of Contents
- [Overview](#overview)
- [CSS Class Customization](#css-class-customization)
- [Available CSS Class Targets](#available-css-class-targets)
- [Customizing the Wrapper Element](#customizing-the-wrapper-element)
- [Customizing the TimePicker Icon](#customizing-the-timepicker-icon)
- [Customizing the Popup](#customizing-the-popup)
- [Customizing Popup List Items](#customizing-popup-list-items)
- [Full Custom Style Example](#full-custom-style-example)
- [Full Screen Mode on Mobile](#full-screen-mode-on-mobile)

---

## Overview

The TimePicker appearance can be customized through:
1. The `CssClass` property — applies a custom class to the root element for scoped overrides
2. Direct CSS targeting using the component's well-defined CSS class structure
3. The `FullScreenMode` property for mobile popup behavior

---

## CSS Class Customization

Use the `CssClass` property to scope custom styles to a specific TimePicker instance:

```cshtml
<ejs-timepicker id="timepicker"
    placeholder="Select a time"
    cssClass="e-custom-style">
</ejs-timepicker>
```

Then define your styles with the custom class as a scope prefix.

---

## Available CSS Class Targets

| Class | Applied To |
|-------|-----------|
| `.e-time-wrapper` | TimePicker wrapper element |
| `.e-timepicker` | Input element and popup element |
| `.e-time-wrapper.e-timepicker` | Input element only |
| `.e-input-group-icon.e-time-icon` | Popup open button icon |
| `.e-float-text` | Floating label text element |
| `.e-popup` | Popup element |
| `.e-timepicker.e-popup` | TimePicker popup element only |
| `.e-list-parent` | Popup UL element |
| `.e-timepicker.e-list-parent` | TimePicker popup UL element only |
| `.e-list-item` | Popup list items (LI elements) |
| `.e-hover` | List item on hover state |
| `.e-active` | Currently active/selected list item |

---

## Customizing the Wrapper Element

```css
/* Height and font size of the input */
.e-input-group input.e-input,
.e-input-group.e-control-wrapper input.e-input {
    font-size: 20px;
    height: 40px;
}
```

---

## Customizing the TimePicker Icon

```css
/* Background color and size of the clock icon button */
.e-time-wrapper .e-time-icon.e-icons,
.e-control-wrapper.e-time-wrapper .e-time-icon.e-icons {
    font-size: 20px;
    background-color: beige;
}
```

---

## Customizing the Popup

```css
/* Popup container height */
.e-timepicker.e-popup {
    height: 100px;
}
```

---

## Customizing Popup List Items

```css
/* Popup list item background and font size */
.e-timepicker.e-popup .e-list-parent.e-ul li.e-list-item {
    background-color: beige;
    font-size: 20px;
}
```

---

## Full Custom Style Example

Using `CssClass="e-custom-style"`:

```cshtml
<ejs-timepicker id="timepicker"
    placeholder="Select a time"
    cssClass="e-custom-style">
</ejs-timepicker>

<style>
    /* Input text color */
    .e-time-wrapper.e-custom-style #element {
        display: block;
        color: blue;
    }

    /* Floating label and popup button text color */
    .e-time-wrapper.e-custom-style .e-float-text.e-label-bottom,
    .e-time-wrapper.e-custom-style .e-input-group-icon.e-time-icon.e-icons {
        color: blue;
    }

    /* Input selection highlight */
    .e-time-wrapper.e-custom-style.e-input-group::before,
    .e-time-wrapper.e-custom-style.e-input-group::after,
    .e-time-wrapper.e-custom-style.e-input-group .e-timepicker::selection {
        background: blue;
    }

    /* Popup list background */
    .e-timepicker.e-popup.e-custom-style .e-list-parent.e-ul,
    .e-timepicker.e-popup.e-custom-style .e-list-parent.e-ul .e-list-item {
        background-color: #c0ebff;
    }

    /* List item hover color */
    .e-timepicker.e-popup.e-custom-style .e-list-parent.e-ul .e-list-item.e-hover,
    .e-timepicker.e-popup.e-custom-style .e-list-parent.e-ul .e-list-item.e-active.e-hover {
        background-color: blue;
        color: #fff;
    }

    /* Active list item color */
    .e-timepicker.e-popup.e-custom-style .e-list-parent.e-ul .e-list-item.e-active {
        color: #333;
        background-color: #fff;
    }
</style>
```

---

## Full Screen Mode on Mobile

The `FullScreenMode` property extends the popup to fill the entire screen on mobile and tablet devices. It works in both landscape and portrait orientations and improves visibility and touch interaction on small screens.

```cshtml
<ejs-timepicker id="timepicker" fullScreenMode="true"></ejs-timepicker>
```

> This feature only takes effect on mobile and tablet devices. On desktop browsers, it has no visible impact.
