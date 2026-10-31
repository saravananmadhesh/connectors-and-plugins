# DateRangePicker — Style and Appearance

## Table of Contents
- [CSS Customization via cssClass](#css-customization-via-cssclass)
- [Customizing the Wrapper Element](#customizing-the-wrapper-element)
- [Customizing the Icon Element](#customizing-the-icon-element)
- [Customizing the Popup Range Header](#customizing-the-popup-range-header)
- [Customizing the Popup Calendar Content](#customizing-the-popup-calendar-content)
- [Customizing Navigation Icons](#customizing-navigation-icons)
- [Customizing Day Cell Hover State](#customizing-day-cell-hover-state)
- [Customizing Footer Buttons](#customizing-footer-buttons)
- [Customizing the Footer Element](#customizing-the-footer-element)
- [Customizing Selected Date Cell](#customizing-selected-date-cell)
- [Float Label Type](#float-label-type)
- [Full Screen Mode (Mobile)](#full-screen-mode-mobile)
- [CSS Class Reference Table](#css-class-reference-table)

---

## CSS Customization via cssClass

Apply `cssClass` to scope all CSS overrides to a single DateRangePicker instance, preventing unintended style leaks.

```cshtml
<ejs-daterangepicker id="daterangepicker"
    cssClass="my-custom-range"
    placeholder="Select a Range">
</ejs-daterangepicker>
```

Then scope your CSS:

```css
.my-custom-range.e-date-range-wrapper input.e-input {
    font-size: 16px;
    color: #333;
}
```

---

## Customizing the Wrapper Element

Change the height and font size of the DateRangePicker input wrapper:

```css
/* Height and font size of the input */
.e-input-group input.e-input,
.e-input-group.e-control-wrapper input.e-input {
    font-size: 20px;
    height: 40px;
}
```

---

## Customizing the Icon Element

Change the background color and size of the calendar range icon:

```css
/* Background color and font size of the range icon */
.e-input-group .e-input-group-icon:last-child,
.e-input-group.e-control-wrapper .e-input-group-icon:last-child {
    background-color: darkgray;
    font-size: 14px;
}
```

---

## Customizing the Popup Range Header

The range header shows the selected start and end labels at the top of the popup:

```css
/* Background and height of the range header */
.e-daterangepicker.e-popup .e-range-header {
    background: beige;
    height: 80px;
}

/* Color and font size of start/end labels */
.e-daterangepicker.e-popup .e-range-header .e-start-label,
.e-daterangepicker.e-popup .e-range-header .e-end-label {
    color: brown;
    font-size: 30px;
}
```

---

## Customizing the Popup Calendar Content

Change the background of the calendar area inside the popup:

```css
/* Background color of the calendar */
.e-daterangepicker.e-popup .e-calendar {
    background-color: brown;
}

/* Color and font size of the calendar month/year title */
.e-daterangepicker.e-popup .e-calendar .e-header .e-title {
    color: beige;
    font-size: 20px;
}
```

---

## Customizing Navigation Icons

Change the size of the previous/next navigation arrows in the calendar header:

```css
/* Font size of previous and next icons */
.e-calendar .e-header .e-prev,
.e-calendar .e-header .e-next,
.e-bigger.e-small .e-calendar .e-header .e-prev,
.e-bigger.e-small .e-calendar .e-header .e-next {
    font-size: 20px;
}
```

---

## Customizing Day Cell Hover State

Change the appearance of day cells when hovered:

```css
/* Background color and border on hover */
.e-calendar .e-content td:hover span.e-day {
    background-color: beige;
    border: 1px solid black;
}
```

---

## Customizing Footer Buttons

**Apply button (disabled state):**

```css
.e-daterangepicker.e-popup .e-footer .e-btn.e-apply.e-flat.e-primary:disabled,
.e-daterangepicker.e-popup .e-footer .e-css.e-btn.e-apply.e-flat.e-primary:disabled {
    background-color: brown;
    border-color: black;
}
```

**Cancel button:**

```css
.e-daterangepicker.e-popup .e-footer .e-btn.e-flat,
.e-daterangepicker.e-popup .e-footer .e-css.e-btn.e-flat {
    background-color: beige;
    border-color: black;
    color: maroon;
}
```

---

## Customizing the Footer Element

Change the footer container background and height:

```css
.e-daterangepicker.e-popup .e-footer {
    background-color: beige;
    height: 50px;
}
```

---

## Customizing Selected Date Cell

Style the focused/today date cell in the calendar:

```css
.e-calendar .e-content td.e-focused-date.e-today span.e-day {
    background: lightgrey;
    border: 1px solid black;
}
```

---

## Float Label Type

Control the floating label behavior using `floatLabelType`:

| Value | Behavior |
|---|---|
| `Never` (default) | Label never floats; acts as placeholder only |
| `Auto` | Label floats above input when focused or a value is entered |
| `Always` | Label always floats above the input |

```cshtml
<ejs-daterangepicker id="daterangepicker"
    floatLabelType="Auto"
    placeholder="Select a Range">
</ejs-daterangepicker>
```

---

## Full Screen Mode (Mobile)

On mobile and tablet devices, `fullScreenMode="true"` expands the calendar and presets popup to fill the entire screen for better usability.

```cshtml
<ejs-daterangepicker id="daterangepicker"
    fullScreenMode="true"
    placeholder="Select a Range">
</ejs-daterangepicker>
```

> **Note:** This feature is exclusively for mobile and tablet devices in both landscape and portrait orientations. It has no visible effect on desktop browsers.

---

## CSS Class Reference Table

| CSS Class | Applied To |
|---|---|
| `e-date-range-wrapper` | DateRangePicker wrapper element |
| `e-range-icon` | DateRangePicker calendar icon |
| `e-popup` | DateRangePicker popup wrapper |
| `e-calendar` | Both calendar elements inside the popup |
| `e-right-calendar` | Right calendar element |
| `e-left-calendar` | Left calendar element |
| `e-range-header` | Range header area (start/end labels) |
| `e-start-label` | Start date label in the popup header |
| `e-end-calendar` | End date label in the popup header |
| `e-day-span` | Day span details label in the popup |
| `e-footer` | Footer element in the popup |
| `e-apply` | Apply button in the popup footer |
| `e-cancel` | Cancel button in the popup footer |
| `e-header` | Calendar header bar |
| `e-title` | Calendar title (month/year text) |
| `e-icon-container` | Previous and next icon container |
| `e-prev` | Previous navigation icon |
| `e-next` | Next navigation icon |
| `e-weekend` | Weekend date cells |
| `e-other-month` | Other month date cells |
| `e-day` | Each individual day cell |
| `e-selected` | Selected date cells |
| `e-disabled` | Disabled date cells |
