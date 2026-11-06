# Toast Types & Styling — Syncfusion ASP.NET Core Toast

## Table of Contents
- [Predefined Toast Types via cssClass](#predefined-toast-types-via-cssclass)
- [Toast Icon](#toast-icon)
- [CSS Customization](#css-customization)
- [ToastUtility — Predefined Types](#toastutility--predefined-types)
- [ToastUtility — Full ToastModel](#toastutility--full-toastmodel)
- [Prevent Swipe-Close on Mobile](#prevent-swipe-close-on-mobile)

---

## Predefined Toast Types via cssClass

Use the `cssClass` property to apply one of four predefined semantic styles:

| cssClass | Style | Use Case |
|---|---|---|
| `e-toast-success` | Green (positive) | Operation completed successfully |
| `e-toast-info` | Blue (informational) | General information |
| `e-toast-warning` | Orange/yellow (caution) | Potential issue or warning |
| `e-toast-danger` | Red (negative) | Error or destructive action |

```cshtml
<ejs-toast id="element">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
</ejs-toast>

<ejs-button id="showTypes" content="Show Typed Toasts" cssClass="e-btn"></ejs-button>

<script>
    var toasts = [
        { title: 'Warning !',     content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning' },
        { title: 'Success !',     content: 'Your message has been sent successfully.',           cssClass: 'e-toast-success' },
        { title: 'Error !',       content: 'A problem has been occurred while submitting data.', cssClass: 'e-toast-danger'  },
        { title: 'Information !', content: 'Please read the comments carefully.',                cssClass: 'e-toast-info'    }
    ];
    var toastFlag = 0;

    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show(toasts[toastFlag++]);
    }, 200);

    document.getElementById('showTypes').addEventListener('click', function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.show(toasts[toastFlag]);
        if (++toastFlag === toasts.length) { toastFlag = 0; }
    });
</script>
```

You can also set `cssClass` directly on the tag:

```cshtml
<ejs-toast id="success_toast"
           title="Success !"
           content="Your file was uploaded."
           cssClass="e-toast-success">
    <e-toast-position X="Right" Y="Top"></e-toast-position>
</ejs-toast>
```

---

## Toast Icon

Use the `icon` property to define a CSS class for an icon displayed in the top-left corner of the toast. This can be any EJ2 icon class or a custom CSS class.

```cshtml
<ejs-toast id="element"
           title="Matt sent you a friend request"
           content="You have a new friend request yet to accept"
           icon="e-laura">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
</ejs-toast>
```

```css
.e-toast-icon.e-laura.e-icons {
    border-radius: 50%;
    background-image: url('https://ej2.syncfusion.com/demos/src/toast/resource/laura.png');
    background-repeat: no-repeat;
    background-size: cover;
    height: 50px !important;
    width: 100px !important;
    background-size: 50px 50px;
    margin: 0;
}
```

Default value: `null`

---

## CSS Customization

Use the following CSS selectors to override the default toast appearance.

### Customize Title

```css
.e-toast-container .e-toast .e-toast-message .e-toast-title {
    color: red;
    font-size: 18px;
    font-weight: bold;
}
```

### Customize Content

```css
.e-toast-container .e-toast .e-toast-message .e-toast-content {
    color: aqua;
    font-size: 13px;
    font-weight: normal;
}
```

### Customize Icon Color

```css
.e-toast-container .e-toast .e-toast-icon {
    color: yellow;
}
```

### Customize Background

```css
.e-toast-container .e-toast {
    background-color: navy;
}
```

### Scope to a Specific Toast

Add a custom CSS class via `cssClass` and target it specifically:

```cshtml
<ejs-toast id="element" cssClass="my-custom-toast" title="Custom" content="Custom styled toast.">
</ejs-toast>
```

```css
.my-custom-toast.e-toast {
    background-color: #2c3e50;
    border-left: 4px solid #3498db;
}
.my-custom-toast .e-toast-title {
    color: #ecf0f1;
}
.my-custom-toast .e-toast-content {
    color: #bdc3c7;
}
```

---

## ToastUtility — Predefined Types

`ToastUtility.show()` renders a toast without any container element in the DOM — the simplest way to show a quick notification.

**Syntax:**
```javascript
ejs.notifications.ToastUtility.show(content, type, timeOut);
```

```javascript
// Information toast
ejs.notifications.ToastUtility.show('Please read the comments carefully', 'Information', 5000);

// Success toast
ejs.notifications.ToastUtility.show('Your message has been sent successfully', 'Success', 5000);

// Warning toast
ejs.notifications.ToastUtility.show('There was a problem with your network connection', 'Warning', 5000);

// Error toast
ejs.notifications.ToastUtility.show('A problem occurred while submitting the data', 'Error', 5000);
```

**Full button example:**

```cshtml
<div style="width:400px; margin:0 auto;">
    <ejs-button id="info_btn"    content="Info Toast"    cssClass="e-btn e-info"></ejs-button>
    <ejs-button id="success_btn" content="Success Toast" cssClass="e-btn e-success"></ejs-button>
    <ejs-button id="warning_btn" content="Warning Toast" cssClass="e-btn e-warning"></ejs-button>
    <ejs-button id="danger_btn"  content="Danger Toast"  cssClass="e-btn e-danger"></ejs-button>
    <ejs-button id="hide_btn"    content="Hide All"      cssClass="e-btn"></ejs-button>
</div>

<script>
    var toastObj;
    document.getElementById('info_btn').addEventListener('click', function () {
        toastObj = ejs.notifications.ToastUtility.show('Please read the comments carefully', 'Information', 20000);
    });
    document.getElementById('success_btn').addEventListener('click', function () {
        toastObj = ejs.notifications.ToastUtility.show('Your message has been sent successfully', 'Success', 20000);
    });
    document.getElementById('warning_btn').addEventListener('click', function () {
        toastObj = ejs.notifications.ToastUtility.show('There was a problem with your network connection', 'Warning', 20000);
    });
    document.getElementById('danger_btn').addEventListener('click', function () {
        toastObj = ejs.notifications.ToastUtility.show('A problem occurred while submitting the data', 'Error', 20000);
    });
    document.getElementById('hide_btn').addEventListener('click', function () {
        toastObj.hide('All');
    });
</script>
```

---

## ToastUtility — Full ToastModel

Pass a full ToastModel object to `ToastUtility.show()` for complete control over all properties, including events, position, and buttons:

```javascript
var toastObj = ej.notifications.ToastUtility.show({
    title: 'Upload Complete',
    content: 'Toast is shown using the utility function with ToastModel.',
    timeOut: 20000,
    position: { X: 'Right', Y: 'Bottom' },
    showCloseButton: true,
    click: function () {
        console.log('Toast clicked');
    },
    buttons: [{
        model: { content: 'Close' },
        click: function () {
            toastObj.hide();
        }
    }]
});
```

> `ej.notifications.ToastUtility.show()` returns the toast instance, which you can use to call `hide()` later.

---

## Prevent Swipe-Close on Mobile

On mobile devices, users can swipe a toast to dismiss it. To prevent this, use the `beforeClose` event and cancel it when the close type is `"swipe"`:

```cshtml
<ejs-toast id="element"
           title="Matt sent you a friend request"
           content="You have a new friend request yet to accept"
           beforeClose="onBeforeClose">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
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

    function onBeforeClose(args) {
        if (args.type === 'swipe') {
            args.cancel = true;
        }
    }
</script>
```

The `beforeClose` event fires before the toast hides. `args.type` can be `"swipe"`, `"timeout"`, `"closeButton"`, or `"click"`. Setting `args.cancel = true` prevents the close.
