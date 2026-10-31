# Styling & CSS Customization – Syncfusion ASP.NET Core AutoComplete

## Table of Contents
- [Overview](#overview)
- [Customizing the Wrapper Element](#customizing-the-wrapper-element)
- [Customizing the Dropdown Icon Color](#customizing-the-dropdown-icon-color)
- [Customizing the Focus Color](#customizing-the-focus-color)
- [Customizing Outline Theme Focus Color](#customizing-outline-theme-focus-color)
- [Customizing Disabled Text Color](#customizing-disabled-text-color)
- [Customizing Float Label Focus Color](#customizing-float-label-focus-color)
- [Customizing Placeholder Text Color](#customizing-placeholder-text-color)
- [Adding Mandatory Indicator to Float Label](#adding-mandatory-indicator-to-float-label)
- [Customizing Text Selection Color](#customizing-text-selection-color)
- [Customizing Hover and Active Item Background](#customizing-hover-and-active-item-background)
- [Customizing Popup Item Appearance](#customizing-popup-item-appearance)
- [Using cssClass](#using-cssclass)

---

## Overview

The AutoComplete uses standard CSS class-based customization. All styles can be overridden by targeting the specific CSS selectors below. Use the `cssClass` property to scope custom styles to a single instance.

---

## Customizing the Wrapper Element

Change font, color, and background of the input:

```css
.e-ddl.e-input-group.e-control-wrapper .e-input {
    font-size: 20px;
    font-family: emoji;
    color: #ab3243;
    background: #32a5ab;
}
```

---

## Customizing the Dropdown Icon Color

```css
.e-ddl.e-input-group .e-input-group-icon,
.e-ddl.e-input-group.e-control-wrapper .e-input-group-icon:hover {
    color: #bb233d;
    font-size: 13px;
}
```

---

## Customizing the Focus Color

Change the animated underline color when the input is focused:

```css
.e-ddl.e-input-group.e-control-wrapper.e-input-focus::before,
.e-ddl.e-input-group.e-control-wrapper.e-input-focus::after {
    background: #c000ff;
}
```

---

## Customizing Outline Theme Focus Color

For the outline-style input theme:

```css
.e-outline.e-input-group.e-input-focus:hover:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled):not(.e-float-icon-left),
.e-outline.e-input-group.e-control-wrapper.e-input-focus:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled) {
    border-color: #b1bd15;
    box-shadow: inset 1px 1px #b1bd15, inset -1px 0 #b1bd15, inset 0 -1px #b1bd15;
}
```

---

## Customizing Disabled Text Color

```css
.e-input-group.e-control-wrapper .e-input[disabled] {
    -webkit-text-fill-color: #0d9133;
}
```

---

## Customizing Float Label Focus Color

```css
.e-float-input.e-input-group:not(.e-float-icon-left) .e-float-line::before,
.e-float-input.e-control-wrapper.e-input-group:not(.e-float-icon-left) .e-float-line::after {
    background-color: #2319b8;
}

.e-ddl.e-input-group.e-control-wrapper.e-float-input.e-input-focus .e-float-text.e-label-top,
.e-float-input.e-control-wrapper:not(.e-error).e-input-focus input ~ label.e-float-text {
    color: #2319b8;
}
```

---

## Customizing Placeholder Text Color

```css
.e-ddl.e-input-group input.e-input::placeholder {
    color: red;
}
```

---

## Adding Mandatory Indicator to Float Label

Add a `*` after the float label to indicate a required field:

```css
.e-input-group.e-control-wrapper.e-float-input .e-float-text::after {
    content: "*";
    color: red;
}
```

---

## Customizing Text Selection Color

```css
.e-ddl.e-input-group input.e-input::selection {
    color: red;
    background: yellow;
}
```

---

## Customizing Hover and Active Item Background

Change the highlight color for hovered, focused, or selected items in the popup:

```css
.e-dropdownbase .e-list-item.e-item-focus,
.e-dropdownbase .e-list-item.e-active,
.e-dropdownbase .e-list-item.e-active.e-hover,
.e-dropdownbase .e-list-item.e-hover {
    background-color: #1f9c99;
    color: #2319b8;
}
```

---

## Customizing Popup Item Appearance

Change the default appearance of all popup list items:

```css
.e-dropdownbase .e-list-item,
.e-dropdownbase .e-list-item.e-item-focus {
    background-color: #29c2b8;
    color: #207cd9;
    font-family: emoji;
    min-height: 29px;
}
```

---

## Using cssClass

Use the `cssClass` property to apply custom CSS scoped to a specific AutoComplete instance:

```cshtml
<ejs-autocomplete id="sports"
    dataSource="sports"
    placeholder="Select a sport"
    cssClass="custom-autocomplete">
</ejs-autocomplete>
```

```css
.custom-autocomplete.e-ddl.e-input-group.e-control-wrapper .e-input {
    color: #ab3243;
    font-weight: bold;
}
```

> `cssClass` is added to the root element of the component, allowing you to scope all CSS selectors to avoid conflicts with other AutoComplete instances on the page.
