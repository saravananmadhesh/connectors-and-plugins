# Timeout & Lifecycle — Syncfusion ASP.NET Core Toast

## Table of Contents
- [timeOut — Auto Dismiss](#timeout--auto-dismiss)
- [extendedTimeout — Hover Delay](#extendedtimeout--hover-delay)
- [Static Toast (No Auto-Dismiss)](#static-toast-no-auto-dismiss)
- [Close Toast on Click / Tap](#close-toast-on-click--tap)
- [Restrict Maximum Visible Toasts](#restrict-maximum-visible-toasts)
- [Prevent Duplicate Toasts](#prevent-duplicate-toasts)

---

## timeOut — Auto Dismiss

The `timeOut` property specifies how long (in milliseconds) the toast remains visible before automatically hiding.

```cshtml
<ejs-toast id="element"
           title="Notification"
           content="This toast disappears after 3 seconds."
           timeOut="3000">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
</ejs-toast>

<script>
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show();
    }, 500);
</script>
```

Default value: `5000` (5 seconds)

You can also pass `timeOut` per-show call:

```javascript
document.getElementById('showBtn').addEventListener('click', function () {
    var toast = document.getElementById('element').ej2_instances[0];
    var customTimeout = parseInt(document.getElementById('timeoutInput').value);
    toast.show({ timeOut: customTimeout });
});
```

---

## extendedTimeout — Hover Delay

The `extendedTimeout` property controls how long the toast stays visible **after the user hovers over it**. This resets the dismiss timer while the user interacts.

```cshtml
<ejs-toast id="element"
           title="Hover Me"
           content="Toast stays longer when hovered."
           timeOut="3000"
           extendedTimeout="10000">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
</ejs-toast>
```

Default value: `1000` (1 second after hover ends)

---

## Static Toast (No Auto-Dismiss)

Set `timeOut="0"` to prevent the toast from auto-dismissing. The user must manually close it (via close button or click event).

```cshtml
<ejs-toast id="element"
           title="Action Required"
           content="Please confirm your email address."
           timeOut="0"
           showCloseButton="true">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
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

## Close Toast on Click / Tap

Use the `click` event to allow users to close the toast by clicking on it. Set `e.clickToClose = true` inside the handler.

```cshtml
<ejs-toast id="element"
           title="Click to Close"
           content="Click anywhere on this toast to dismiss it."
           timeOut="0"
           click="onToastClick">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
</ejs-toast>

<ejs-button id="showBtn" content="Show Toast" cssClass="e-btn"></ejs-button>

<script>
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show();
    }, 200);

    document.getElementById('showBtn').addEventListener('click', function () {
        document.getElementById('element').ej2_instances[0].show();
    });

    function onToastClick(e) {
        e.clickToClose = true;
    }
</script>
```

---

## Restrict Maximum Visible Toasts

Use the `beforeOpen` event to cancel new toasts when the visible count reaches a limit:

```cshtml
<ejs-toast id="element"
           title="Sample Title"
           content="Sample content."
           beforeOpen="onBeforeOpen">
    <e-toast-position X="Center" Y="Top"></e-toast-position>
</ejs-toast>

<ejs-button id="showBtn" content="Show Toast" cssClass="e-btn"></ejs-button>

<script>
    var toasts = [
        { title: 'Warning !',     content: 'Network connection issue.'    },
        { title: 'Success !',     content: 'Message sent successfully.'   },
        { title: 'Error !',       content: 'Problem submitting data.'      },
        { title: 'Information !', content: 'Please read the comments.'    }
    ];
    var maxCount = 3;
    var toastFlag = 0;

    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show(toasts[toastFlag]);
        ++toastFlag;
    }, 1000);

    function onBeforeOpen(e) {
        var toast = document.getElementById('element').ej2_instances[0];
        e.cancel = (toast.element.childElementCount >= maxCount);
    }

    document.getElementById('showBtn').addEventListener('click', function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.show(toasts[toastFlag]);
        if (++toastFlag === toasts.length) { toastFlag = 0; }
    });
</script>
```

The `beforeOpen` event fires before the toast is rendered. Setting `e.cancel = true` aborts the display.

---

## Prevent Duplicate Toasts

Track open toasts and cancel duplicates via the `beforeOpen` event. Use the `close` event to reset the tracking state:

```cshtml
<ejs-toast id="element"
           title="Sample Title"
           content="Sample content."
           beforeOpen="onBeforeOpen"
           close="onClose"
           created="onCreate">
    <e-toast-position X="Center" Y="Top"></e-toast-position>
</ejs-toast>

<ejs-button id="showBtn" content="Show Toast" cssClass="e-btn"></ejs-button>

<script>
    var toasts = [
        { title: 'Warning !', content: 'Network connection issue.',   isOpen: false },
        { title: 'Success !', content: 'Message sent successfully.',  isOpen: false },
        { title: 'Error !',   content: 'Problem submitting data.',    isOpen: false }
    ];
    var toastFlag = 0;

    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show(toasts[toastFlag]);
        ++toastFlag;
    }, 1000);

    function onBeforeOpen(e) {
        if (isDuplicate(e)) { e.cancel = true; }
    }

    function isDuplicate(e) {
        for (var i = 0; i < toasts.length; i++) {
            if (toasts[i].title === e.options.title && !toasts[i].isOpen) {
                toasts[i].isOpen = true;
                return false;  // Not a duplicate — allow it
            }
        }
        return true;  // Duplicate — cancel it
    }

    function onClose(e) {
        for (var i = 0; i < toasts.length; i++) {
            if (toasts[i].title === e.options.title) {
                toasts[i].isOpen = false;
            }
        }
    }

    function onCreate() {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.show(toasts[toastFlag]);
        ++toastFlag;
    }

    document.getElementById('showBtn').addEventListener('click', function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.show(toasts[toastFlag]);
        if (++toastFlag === toasts.length) { toastFlag = 0; }
    });
</script>
```

---

## Property / Event Quick Reference

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `timeOut` | double | 5000 | Auto-dismiss delay in milliseconds; `0` = no auto-dismiss |
| `extendedTimeout` | double | 1000 | Display time after hover interaction ends |
| `beforeOpen` | event | — | Fires before toast renders; set `e.cancel = true` to abort |
| `open` | event | — | Fires after toast is shown |
| `close` | event | — | Fires after toast is hidden |
| `click` | event | — | Fires on toast click; set `e.clickToClose = true` to close |
