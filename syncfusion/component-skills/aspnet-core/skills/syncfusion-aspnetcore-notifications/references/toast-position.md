# Position & Layout — Syncfusion ASP.NET Core Toast

## Table of Contents
- [Overview](#overview)
- [Predefined Positions](#predefined-positions)
- [Custom Positions](#custom-positions)
- [Full-Width Toast](#full-width-toast)
- [Multiple Toasts in Different Positions](#multiple-toasts-in-different-positions)
- [Target-Relative Positioning](#target-relative-positioning)

---

## Overview

Toast position is configured using the `<e-toast-position>` child tag inside `<ejs-toast>`. The `X` property controls horizontal placement and `Y` controls vertical placement.

```cshtml
<ejs-toast id="element" title="Alert" content="Your message.">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
</ejs-toast>
```

> **Important:** In a multi-toast scenario, the position of already-visible toasts will **not** update dynamically. New position values take effect only after existing toasts are removed.

---

## Predefined Positions

### X Values
| Value | Description |
|-------|-------------|
| `Left` | Align to the left edge of the target |
| `Center` | Center horizontally |
| `Right` | Align to the right edge of the target |

### Y Values
| Value | Description |
|-------|-------------|
| `Top` | Align to the top edge of the target |
| `Bottom` | Align to the bottom edge of the target |

### Common Combinations

```cshtml
@* Top Left *@
<e-toast-position X="Left" Y="Top"></e-toast-position>

@* Top Center *@
<e-toast-position X="Center" Y="Top"></e-toast-position>

@* Top Right *@
<e-toast-position X="Right" Y="Top"></e-toast-position>

@* Bottom Left *@
<e-toast-position X="Left" Y="Bottom"></e-toast-position>

@* Bottom Center *@
<e-toast-position X="Center" Y="Bottom"></e-toast-position>

@* Bottom Right (default-style) *@
<e-toast-position X="Right" Y="Bottom"></e-toast-position>
```

---

## Custom Positions

Custom `X` and `Y` values accept pixel numbers or percentage strings. The values are applied as CSS `left`/`top` offsets relative to the `target` container.

```cshtml
<ejs-toast id="element" title="Custom Position" content="Toast at 20%, 30%.">
    <e-toast-position X="20%" Y="30%"></e-toast-position>
</ejs-toast>
```

Setting via JavaScript (e.g., on user input):

```javascript
var toast = document.getElementById('element').ej2_instances[0];
toast.hide('All');
toast.position.X = parseInt(document.getElementById('xPos').value, 10);
toast.position.Y = parseInt(document.getElementById('yPos').value, 10);
setTimeout(function () { toast.show(); }, 200);
```

---

## Full-Width Toast

Set `width="100%"` to span the toast across the full width of the viewport. In this mode, the X position has no effect—only `Y` (Top or Bottom) applies.

```cshtml
<ejs-toast id="element"
           title="System Maintenance"
           content="Scheduled downtime at midnight."
           width="100%">
    <e-toast-position X="Center" Y="Top"></e-toast-position>
</ejs-toast>

<script>
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show();
    }, 500);
</script>
```

---

## Multiple Toasts in Different Positions

To show toasts at different positions simultaneously, create **separate `<ejs-toast>` instances** — one per position. Position properties cannot change dynamically for already-visible toasts.

```cshtml
<ejs-toast id="toast_right"
           title="Warning !"
           content="There was a problem with your network connection."
           click="onClickClose">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
</ejs-toast>

<ejs-toast id="toast_left"
           title="Success !"
           content="Your message has been sent successfully."
           click="onClickClose">
    <e-toast-position X="Left" Y="Bottom"></e-toast-position>
</ejs-toast>

<ejs-button id="showRight" content="Show Right Toast" cssClass="e-btn"></ejs-button>
<ejs-button id="showLeft"  content="Show Left Toast"  cssClass="e-btn"></ejs-button>

<script>
    setTimeout(function () {
        document.getElementById('toast_right').ej2_instances[0].target = document.body;
        document.getElementById('toast_right').ej2_instances[0].show();
        document.getElementById('toast_left').ej2_instances[0].target = document.body;
        document.getElementById('toast_left').ej2_instances[0].show();
    }, 200);

    document.getElementById('showRight').addEventListener('click', function () {
        document.getElementById('toast_right').ej2_instances[0].show();
    });
    document.getElementById('showLeft').addEventListener('click', function () {
        document.getElementById('toast_left').ej2_instances[0].show();
    });

    function onClickClose(e) {
        e.clickToClose = true;
    }
</script>
```

---

## Target-Relative Positioning

When `target` is set to a specific container element (not `document.body`), the toast position is calculated relative to that container.

```cshtml
<div id="toast_container" style="position:relative; width:600px; height:300px; border:1px solid #ccc;">
    <p>Toast will appear inside this container</p>
</div>

<ejs-toast id="element" title="Info" content="Inside container.">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
</ejs-toast>

<script>
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.getElementById('toast_container');
        toast.show();
    }, 500);
</script>
```

> The target container should have `position: relative` (or `absolute`/`fixed`) for correct placement.
