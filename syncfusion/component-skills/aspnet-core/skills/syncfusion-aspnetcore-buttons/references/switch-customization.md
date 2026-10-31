# Switch Customization & Appearance

## Table of Contents
- [CSS Classes Reference](#css-classes-reference)
- [Customize Switch Bar and Handle Shape](#customize-switch-bar-and-handle-shape)
- [Customize Switch Colors](#customize-switch-colors)
- [iOS-Style Switch](#ios-style-switch)
- [Ripple Effect for Switch Labels](#ripple-effect-for-switch-labels)
- [Style and Appearance Overview](#style-and-appearance-overview)
- [Theme Studio](#theme-studio)

---

## CSS Classes Reference

Use these CSS classes to override the default Switch appearance. Target them via your custom CSS class applied through the `cssClass` property.

| CSS Class | Purpose |
|---|---|
| `.e-switch-wrapper .e-switch-inner` | Customize the bar in **off** mode |
| `.e-switch-wrapper .e-switch-handle` | Customize the handle in **off** mode |
| `.e-switch-wrapper:not(.e-switch-disabled):hover .e-switch-handle:not(.e-switch-active)` | Handle in **off** mode on hover |
| `.e-switch-wrapper:not(.e-switch-disabled):hover .e-switch-inner:not(.e-switch-active)` | Bar in **off** mode on hover |
| `.e-switch-wrapper .e-switch-handle.e-switch-active` | Handle in **on** mode |
| `.e-switch-wrapper .e-switch-on` | Bar in **on** mode |
| `.e-switch-wrapper:hover .e-switch-handle.e-switch-active` | Handle in **on** mode on hover |
| `.e-switch-wrapper:hover .e-switch-inner.e-switch-active .e-switch-on` | Bar in **on** mode on hover |

Apply custom CSS by setting a class name via `cssClass` and scoping your styles to that class.

---

## Customize Switch Bar and Handle Shape

Change the shape of the switch bar and handle (e.g., from round to square) by targeting the relevant CSS classes through a custom `cssClass`.

**Tag Helper:**
```cshtml
<ejs-switch id="switch1" cssClass="square"></ejs-switch>

<style>
    /* Square Switch */
    .e-switch-wrapper.square .e-switch-inner,
    .e-switch-wrapper.square .e-switch-handle {
        border-radius: 0;
    }
</style>
```

**Custom size and shape example:**
```cshtml
<ejs-switch id="switch2" cssClass="custom-switch"></ejs-switch>

<style>
    .e-switch-wrapper.custom-switch {
        width: 50px;
        height: 24px;
    }
    .e-switch-wrapper.custom-switch .e-switch-handle {
        width: 20px;
        height: 16px;
    }
    .e-switch-wrapper.custom-switch .e-switch-inner,
    .e-switch-wrapper.custom-switch .e-switch-handle {
        border-radius: 0;
    }
    .e-switch-wrapper.custom-switch .e-switch-handle.e-switch-active {
        left: 42px;
    }
</style>
```

**Handle with ON/OFF text overlay:**
```cshtml
<ejs-switch id="switch3" cssClass="handle-text"></ejs-switch>

<style>
    .e-switch-wrapper.handle-text {
        width: 58px;
        height: 24px;
    }
    .e-switch-wrapper.handle-text .e-switch-handle {
        width: 26px;
        height: 20px;
        left: 2px;
        background-color: #fff;
    }
    .e-switch-wrapper.handle-text .e-switch-inner,
    .e-switch-wrapper.handle-text .e-switch-handle {
        border-radius: 0;
    }
    .e-switch-wrapper.handle-text .e-switch-handle.e-switch-active {
        left: 46px;
    }
    .e-switch-wrapper.handle-text .e-switch-inner.e-switch-active,
    .e-switch-wrapper.handle-text:hover .e-switch-inner.e-switch-active .e-switch-on {
        background-color: #4d841d;
        border-color: #4d841d;
    }
    .e-switch-wrapper.handle-text .e-switch-inner,
    .e-switch-wrapper.handle-text .e-switch-off {
        background-color: #e3165b;
        border-color: #e3165b;
    }
    .e-switch-wrapper.handle-text .e-switch-inner:before {
        content: "OFF";
        color: #e3165b;
        left: 3px;
        font-size: 10px;
        position: absolute;
        line-height: 21px;
        z-index: 1;
    }
    .e-switch-wrapper.handle-text .e-switch-inner:after {
        content: "ON";
        right: 5px;
        color: #fff;
        font-size: 10px;
        position: absolute;
        line-height: 21px;
        z-index: 1;
    }
</style>
```

---

## Customize Switch Colors

Override bar and handle colors using custom CSS scoped to a `cssClass`.

**Custom bar color (red off / green on):**
```cshtml
<ejs-switch id="switch1" cssClass="bar-color"></ejs-switch>

<style>
    .e-switch-wrapper.bar-color .e-switch-inner.e-switch-active,
    .e-switch-wrapper.bar-color:hover .e-switch-inner.e-switch-active .e-switch-on {
        background-color: #4d841d;
        border-color: #4d841d;
    }
    .e-switch-wrapper.bar-color .e-switch-inner,
    .e-switch-wrapper.bar-color .e-switch-off {
        background-color: #e3165b;
        border-color: #e3165b;
    }
    .e-switch-wrapper.bar-color .e-switch-handle {
        background-color: #fff;
    }
</style>
```

**Custom handle color:**
```cshtml
<ejs-switch id="switch2" cssClass="handle-color"></ejs-switch>

<style>
    .e-switch-wrapper.handle-color .e-switch-handle {
        background-color: #e3165b;
    }
    .e-switch-wrapper.handle-color .e-switch-handle.e-switch-active {
        background-color: #4d841d;
    }
    .e-switch-wrapper.handle-color .e-switch-inner.e-switch-active,
    .e-switch-wrapper.handle-color:hover .e-switch-inner.e-switch-active .e-switch-on {
        background-color: #fff;
        border-color: #ccc;
    }
    .e-switch-wrapper.handle-color .e-switch-inner,
    .e-switch-wrapper.handle-color .e-switch-off {
        background-color: #fff;
        border-color: #ccc;
    }
</style>
```

---

## iOS-Style Switch

Approximate an iOS-style toggle switch with a custom `cssClass`:

```cshtml
<ejs-switch id="switch3" cssClass="custom-iOS"></ejs-switch>

<style>
    .e-switch-wrapper.custom-iOS .e-switch-inner.e-switch-active,
    .e-switch-wrapper.custom-iOS:hover .e-switch-inner.e-switch-active .e-switch-on {
        background-color: #3df865;
        border-color: #3df665;
    }
    .e-switch-wrapper.custom-iOS {
        width: 42px;
        height: 24px;
    }
    .e-switch-wrapper.custom-iOS .e-switch-handle {
        width: 20px;
        height: 20px;
    }
    .e-switch-wrapper.custom-iOS .e-switch-handle.e-switch-active {
        margin-left: -22px;
    }
</style>
```

---

## Ripple Effect for Switch Labels

By default, labels associated with the Switch do not have a ripple effect. You can enable ripple for a label by using the `rippleMouseHandler` method from `ejs.buttons` and `ej.base.enableRipple`.

**Tag Helper:**
```cshtml
<div id='container'>
    <table class='size'>
        <tr>
            <td><label for='switch1'>USB Tethering</label></td>
            <td>
                <ejs-switch id="switch1"></ejs-switch>
            </td>
        </tr>
    </table>
</div>

<script>
    ej.base.enableRipple(true);

    document.querySelector('label').addEventListener('mouseup', rippleHandler);
    document.querySelector('label').addEventListener('mousedown', rippleHandler);

    function rippleHandler(e) {
        var rippleSpan = this.parentElement.nextElementSibling.querySelector('.e-ripple-container');
        if (rippleSpan) {
            ejs.buttons.rippleMouseHandler(e, rippleSpan);
        }
    }
</script>

<style>
    .size td {
        padding: 10px;
        font-family: "Roboto", "Segoe UI", sans-serif;
        font-size: 13px;
    }
    .size td label {
        cursor: pointer;
        user-select: none;
    }
</style>
```

> `rippleMouseHandler` is a utility method in `ejs.buttons` that manually triggers the ripple animation on the Switch element when the label is clicked.

---

## Style and Appearance Overview

The Switch can be visually customized by:
1. **`cssClass` property** — Attach a custom CSS class to scope your overrides.
2. **CSS pseudo-elements** — Use `:before` / `:after` on `.e-switch-inner` for text overlays.
3. **Theme Studio** — Generate a custom theme at https://ej2.syncfusion.com/themestudio/

---

## Theme Studio

Use Syncfusion Theme Studio to create a globally consistent custom theme for all EJ2 components including the Switch:

- URL: https://ej2.syncfusion.com/themestudio/?theme=material
- Download the generated CSS and replace the CDN reference in `_Layout.cshtml`.
