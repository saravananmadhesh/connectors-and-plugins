# Action Buttons — Syncfusion ASP.NET Core Toast

## Table of Contents
- [Overview](#overview)
- [Basic Action Buttons](#basic-action-buttons)
- [Button Click Handler](#button-click-handler)
- [Dismiss Toast from Button Click](#dismiss-toast-from-button-click)
- [Multiple Buttons](#multiple-buttons)
- [Complete Example](#complete-example)

---

## Overview

The Toast component supports adding action buttons using the `<e-toast-buttonmodelprops>` child tag. Each button is defined with `<e-toast-buttonmodelprop>` and accepts a Syncfusion Button `model` (object with `content`, `cssClass`, etc.) and an optional `click` event handler name.

This is useful for confirmation toasts ("Accept / Dismiss"), undo actions, or any toast requiring user response.

---

## Basic Action Buttons

Define button models in the controller (ViewBag) and bind them in the view:

```csharp
// Controller
public IActionResult Index()
{
    ViewBag.AcceptBtn  = new { content = "Accept" };
    ViewBag.DismissBtn = new { content = "Dismiss" };
    return View();
}
```

```cshtml
@* View *@
<ejs-toast id="element" extendedTimeout="20000" width="300" height="150">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
    <e-toast-buttonmodelprops>
        <e-toast-buttonmodelprop model="ViewBag.AcceptBtn"  click="onAccept"></e-toast-buttonmodelprop>
        <e-toast-buttonmodelprop model="ViewBag.DismissBtn"></e-toast-buttonmodelprop>
    </e-toast-buttonmodelprops>
    <e-content-template>
        <p>
            <img alt="User" class="toast-img"
                 src="https://ej2.syncfusion.com/demos/src/toast/resource/laura.png" />
            <span class="name">Anjolie Stokes</span>
        </p>
        <div class="content"><p>Thanks for the update!</p></div>
    </e-content-template>
</ejs-toast>

<ejs-button id="showBtn" content="Show Toast" cssClass="e-btn"></ejs-button>

<script>
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show();
    }, 1000);

    document.getElementById('showBtn').addEventListener('click', function () {
        document.getElementById('element').ej2_instances[0].show();
    });

    function onAccept(e) {
        var toastEle = ej.base.closest(e.target, '.e-toast');
        document.getElementById('element').ej2_instances[0].hide(toastEle);
    }
</script>

<style>
    .toast-img { width: 40px; height: 40px; }
    .name      { padding-left: 20px; font-size: 17px; font-weight: 500; }
    .content   { padding-left: 60px; font-size: 12px; }
</style>
```

---

## Button Click Handler

Each `<e-toast-buttonmodelprop>` accepts a `click` attribute referencing a global JavaScript function name. The click callback receives the event object `e` with `e.target` pointing to the clicked button element.

```javascript
function onAccept(e) {
    console.log('Accept clicked', e.target);
}
```

---

## Dismiss Toast from Button Click

To close the specific toast when a button is clicked, use `ej.base.closest()` to find the parent `.e-toast` element and call `hide()` on the toast instance:

```javascript
function onDismiss(e) {
    var toastEle = ej.base.closest(e.target, '.e-toast');
    document.getElementById('element').ej2_instances[0].hide(toastEle);
}
```

To close **all** toasts:

```javascript
document.getElementById('element').ej2_instances[0].hide('All');
```

---

## Multiple Buttons

Add as many `<e-toast-buttonmodelprop>` entries as needed. Each can have its own model and click handler.

```csharp
// Controller
ViewBag.IgnoreBtn = new { content = "Ignore",  cssClass = "e-outline" };
ViewBag.ReplyBtn  = new { content = "Reply",   cssClass = "e-primary"  };
ViewBag.DeleteBtn = new { content = "Delete",  cssClass = "e-danger"   };
```

```cshtml
<e-toast-buttonmodelprops>
    <e-toast-buttonmodelprop model="ViewBag.ReplyBtn"  click="onReply"></e-toast-buttonmodelprop>
    <e-toast-buttonmodelprop model="ViewBag.IgnoreBtn" click="onIgnore"></e-toast-buttonmodelprop>
    <e-toast-buttonmodelprop model="ViewBag.DeleteBtn" click="onDelete"></e-toast-buttonmodelprop>
</e-toast-buttonmodelprops>
```

---

## Complete Example

A notification toast with Accept and Dismiss buttons:

```csharp
// HomeController.cs
public IActionResult Index()
{
    ViewBag.ToastButtons1 = new { content = "Accept",  cssClass = "e-primary" };
    ViewBag.ToastButtons2 = new { content = "Dismiss", cssClass = "e-outline" };
    return View();
}
```

```cshtml
@* Index.cshtml *@
<div style="width:400px; margin:0 auto;">
    <ejs-toast id="element" extendedTimeout="20000" width="300" height="150">
        <e-toast-position X="Right" Y="Bottom"></e-toast-position>
        <e-toast-buttonmodelprops>
            <e-toast-buttonmodelprop click="btnClick" model="ViewBag.ToastButtons1">
            </e-toast-buttonmodelprop>
            <e-toast-buttonmodelprop model="ViewBag.ToastButtons2">
            </e-toast-buttonmodelprop>
        </e-toast-buttonmodelprops>
        <e-content-template>
            <p>
                <img alt="Laura" class="toast-img"
                     src="https://ej2.syncfusion.com/demos/src/toast/resource/laura.png" />
                <span class="name">Anjolie Stokes</span>
            </p>
            <div class="content"><p>Thanks for update!</p></div>
        </e-content-template>
    </ejs-toast>
    <ejs-button id="show_toast" content="Show Toast" cssClass="e-btn"></ejs-button>
</div>

<script type="text/javascript">
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show();
    }, 1000);

    document.getElementById('show_toast').addEventListener('click', function () {
        document.getElementById('element').ej2_instances[0].show();
    });

    function btnClick(e) {
        var toastEle = ej.base.closest(e.target, '.e-toast');
        document.getElementById('element').ej2_instances[0].hide(toastEle);
    }
</script>

<style>
    .toast-img { width: 40px; height: 40px; }
    .name      { padding-left: 20px; font-size: 17px; font-weight: 500; }
    .content   { padding-left: 60px; font-size: 12px; }
</style>
```

---

## Key Notes

- `model` on `<e-toast-buttonmodelprop>` accepts any Syncfusion Button model properties (`content`, `cssClass`, `disabled`, `iconCss`, etc.).
- The `click` attribute is a string matching a **global JavaScript function name** — not an inline expression.
- Button models defined in the controller via `ViewBag` must be serializable objects.
- `extendedTimeout` is useful with action buttons so the toast stays visible long enough for user interaction.
