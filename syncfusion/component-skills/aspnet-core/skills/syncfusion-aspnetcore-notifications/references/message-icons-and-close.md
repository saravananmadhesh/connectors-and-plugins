# Message Icons and Close Icon

## Table of Contents
- [Severity Icons](#severity-icons)
- [Disabling Severity Icons](#disabling-severity-icons)
- [Custom Severity Icons](#custom-severity-icons)
- [Close Icon](#close-icon)
- [Controlling Visibility with `visible`](#controlling-visibility-with-visible)

---

## Severity Icons

By default, `showIcon` is `true`, meaning each message displays a severity-specific icon on its left edge. The icon changes automatically based on the `severity` attribute:

```cshtml
@* ~/Pages/Index.cshtml *@
<ejs-message id="m1" content="Editing is restricted"></ejs-message>
<ejs-message id="m2" content="Please read the comments carefully" severity="Info"></ejs-message>
<ejs-message id="m3" content="Your message has been sent successfully" severity="Success"></ejs-message>
<ejs-message id="m4" content="There was a problem with your network connection" severity="Warning"></ejs-message>
<ejs-message id="m5" content="A problem occurred while submitting your data" severity="Error"></ejs-message>
```

---

## Disabling Severity Icons

Set `showIcon="false"` to hide the severity icon for a cleaner, text-only appearance:

```cshtml
@* ~/Pages/Index.cshtml *@
<ejs-message id="m1" content="Editing is restricted" showIcon="false"></ejs-message>
<ejs-message id="m2" content="Please read the comments carefully" severity="Info" showIcon="false"></ejs-message>
<ejs-message id="m3" content="Your message has been sent successfully" severity="Success" showIcon="false"></ejs-message>
<ejs-message id="m4" content="There was a problem with your network connection" severity="Warning" showIcon="false"></ejs-message>
<ejs-message id="m5" content="A problem occurred while submitting your data" severity="Error" showIcon="false"></ejs-message>
```

---

## Custom Severity Icons

Override the default severity icon by using the `cssClass` attribute to apply a custom CSS class, then target the `.e-msg-icon` selector in your stylesheet:

```cshtml
<ejs-message id="msg_icon" cssClass="custom"
             content="Essential JS 2 is a modern JavaScript UI Controls library.">
</ejs-message>
```

```css
/* wwwroot/css/site.css — override the icon for messages with cssClass="custom" */
.custom .e-msg-icon::before {
  content: '\e704'; /* your custom icon font character */
  font-family: 'e-icons';
}
```

This allows you to replace default icons with custom icon fonts or images that match your design system.

---

## Close Icon

The close icon lets users dismiss messages interactively. It is hidden by default. Enable it with `showCloseIcon="true"`:

```cshtml
@* ~/Pages/Index.cshtml *@
<ejs-message id="msg_dismiss"
             content="Your session will expire in 5 minutes"
             severity="Warning"
             showCloseIcon="true"
             visible="true"
             closed="onMessageClosed">
</ejs-message>
```

```javascript
<script>
    function onMessageClosed() {
        // Hide the message after the close icon is clicked
        var msg = document.getElementById('msg_dismiss').ej2_instances[0];
        msg.visible = false;
    }
</script>
```

The `closed` event fires when the user clicks the close icon (or presses Enter/Space while focused on it). Use it to update state so the message doesn't reappear on the next render.

### Restore a Dismissed Message

```cshtml
@* ~/Pages/Index.cshtml *@
<ejs-button id="showBtn" content="Show Message" cssClass="e-btn" click="onShowClick"></ejs-button>

<ejs-message id="msg_restore"
             content="Editing is restricted"
             showCloseIcon="true"
             visible="true"
             closed="onMessageClosed">
</ejs-message>

<script>
    function onMessageClosed() {
        var msg = document.getElementById('msg_restore').ej2_instances[0];
        msg.visible = false;
    }
    function onShowClick() {
        var msg = document.getElementById('msg_restore').ej2_instances[0];
        msg.visible = true;
    }
</script>
```

---

## Controlling Visibility with `visible`

The `visible` attribute shows or hides the entire message without removing it from the DOM. This is useful for toggling messages in response to application state:

```cshtml
<ejs-message id="msg_status"
             content="Operation complete"
             severity="Success"
             visible="@(isOperationDone)">
</ejs-message>
```

- `visible="true"` (default) — message is displayed
- `visible="false"` — message is hidden (but still rendered in the DOM)

### Full Example: Multiple Dismissible Messages

```cshtml
@* ~/Pages/Index.cshtml *@
<ejs-message id="msg_info"
             content="Please read the comments carefully"
             severity="Info"
             showCloseIcon="true"
             visible="true"
             closed="onInfoClosed">
</ejs-message>

<ejs-message id="msg_error"
             content="A problem occurred while submitting your data"
             severity="Error"
             showCloseIcon="true"
             visible="true"
             closed="onErrorClosed">
</ejs-message>

<ejs-button id="resetBtn" content="Reset Messages" cssClass="e-btn" click="onReset"></ejs-button>

<script>
    function onInfoClosed()  { document.getElementById('msg_info').ej2_instances[0].visible = false; }
    function onErrorClosed() { document.getElementById('msg_error').ej2_instances[0].visible = false; }
    function onReset() {
        document.getElementById('msg_info').ej2_instances[0].visible = true;
        document.getElementById('msg_error').ej2_instances[0].visible = true;
    }
</script>
```
