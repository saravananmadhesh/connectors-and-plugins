# Style and Appearance – ASP.NET Core Calendar

## Table of Contents
- [Using cssClass for Scoped Customization](#using-cssclass-for-scoped-customization)
- [Customizing Background Color and Border](#customizing-background-color-and-border)
- [Customizing Date Cell Hover State](#customizing-date-cell-hover-state)
- [Adding Border to the Date Cell Grid](#adding-border-to-the-date-cell-grid)
- [Customizing the Calendar Title](#customizing-the-calendar-title)
- [Customizing Previous and Next Icons](#customizing-previous-and-next-icons)
- [Customizing the Today Footer Button](#customizing-the-today-footer-button)
- [Customizing the Selected Date Cell](#customizing-the-selected-date-cell)
- [Customizing the Content Header (Day Names Row)](#customizing-the-content-header-day-names-row)
- [Show Dates of Other Months](#show-dates-of-other-months)
- [CSS Class Reference](#css-class-reference)

---

## Using cssClass for Scoped Customization

Apply a root CSS class with `cssClass` to scope all customizations to a single Calendar instance:

```cshtml
<ejs-calendar id="calendar" cssClass="my-calendar"></ejs-calendar>
```

Then prefix all custom rules with `.my-calendar`:

```css
.my-calendar .e-header {
    background-color: #1565C0;
}
```

---

## Customizing Background Color and Border

```css
/* Customize Calendar background and outer border */
.e-calendar {
    background-color: peachpuff;
    border: 3px solid red;
}
```

---

## Customizing Date Cell Hover State

```css
/* Background color, text color, and border on hover/focus */
.e-calendar .e-content td:hover span.e-day,
.e-calendar .e-content td:focus span.e-day,
.e-bigger.e-small .e-calendar .e-content td:hover span.e-day,
.e-bigger.e-small .e-calendar .e-content td:focus span.e-day {
    background-color: red;
    border: 2px solid;
    color: #212529;
}
```

---

## Adding Border to the Date Cell Grid

```css
/* Add border to each date cell */
.e-calendar .e-content span.e-day,
.e-bigger.e-small .e-calendar .e-content span.e-day {
    border: 1px solid;
}
```

---

## Customizing the Calendar Title

```css
/* Change title color and font size */
.e-calendar .e-header .e-title,
.e-bigger.e-small .e-calendar .e-header .e-title {
    color: black;
    font-size: 20px;
}
```

---

## Customizing Previous and Next Icons

```css
/* Change navigation icon color and add border */
.e-calendar .e-header span,
.e-bigger.e-small .e-calendar .e-header span {
    border: 1px solid;
    color: chocolate;
}
```

---

## Customizing the Today Footer Button

```css
/* Change Today button background, border, and text color */
.e-calendar .e-btn.e-today.e-flat.e-primary,
.e-calendar .e-css.e-btn.e-today.e-flat.e-primary {
    background-color: red;
    border-color: black;
    color: black;
}
```

---

## Customizing the Selected Date Cell

```css
/* Customize the selected and today-focused cell */
.e-calendar .e-content td.e-focused-date.e-today span.e-day {
    background-color: maroon;
    color: #fff;
}
```

---

## Customizing the Content Header (Day Names Row)

```css
/* Change the background of the day-names header row */
.e-calendar .e-content thead,
.e-bigger.e-small .e-calendar .e-content thead {
    background: aquamarine;
}
```

---

## Show Dates of Other Months

By default, days belonging to adjacent months are hidden in the current month view. Use CSS to make them visible:

```css
.e-calendar .e-content tr.e-month-hide,
.e-calendar .e-content td.e-other-month > span.e-day {
    display: block;
}

.e-calendar .e-content td.e-month-hide,
.e-calendar .e-content td.e-other-month {
    pointer-events: auto;
    touch-action: auto;
}
```

With this CSS, the full grid is populated with dates from the previous and next month as well.

---

## CSS Class Reference

| CSS Class | Applied To |
|-----------|-----------|
| `.e-calendar` | Root Calendar wrapper element |
| `.e-header` | Header section (title + nav icons) |
| `.e-title` | Month/year title text |
| `.e-icon-container` | Previous and next icon container |
| `.e-prev` | Previous (left arrow) icon |
| `.e-next` | Next (right arrow) icon |
| `.e-content thead` | Day-names row (Sun, Mon, ...) |
| `.e-content td` | Individual day cell |
| `.e-day` | Day number span inside a cell |
| `.e-weekend` | Weekend day cells |
| `.e-other-month` | Days from adjacent months |
| `.e-selected` | Currently selected date cell |
| `.e-disabled` | Disabled date cells |
| `.e-focused-date` | Keyboard-focused date cell |
| `.e-today` | Today's date cell |
| `.e-footer-container` | Footer area with Today button |
| `.e-btn.e-today` | Today button element |
