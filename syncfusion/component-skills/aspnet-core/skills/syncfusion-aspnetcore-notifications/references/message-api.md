# API Reference — Syncfusion ASP.NET Core Message

> **Source:** [https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Notifications.Message.html](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Notifications.Message.html)  
> **Namespace:** `Syncfusion.EJ2.Notifications`  
> **Assembly:** `Syncfusion.EJ2.dll`

## Table of Contents
- [Class Message — Properties](#class-message--properties)
- [Events](#events)
- [Tag Helper Syntax Reference](#tag-helper-syntax-reference)
- [Severity and Variant Enums](#severity-and-variant-enums)

---

## Class Message — Properties

### Closed
Triggers when the Message component is closed successfully.

- **Type:** `string` (JavaScript function name)
- **Default:** `null`
- **Tag attribute:** `closed`

### Content
Specifies the content to be displayed in the Message component. It can be a paragraph, a list, or any other HTML element.

- **Type:** `string`
- **Default:** `null`
- **Tag attribute:** `content`

### ContentTemplate
To get or set value for ContentTemplate.

- **Type:** `MvcTemplate<object>`
- **Tag:** `<e-content-template>`

### Created
Triggers when the Message component is created successfully.

- **Type:** `string` (JavaScript function name)
- **Default:** `null`
- **Tag attribute:** `created`

### CssClass
Specifies the CSS class or multiple classes separated by space that can be appended to the root element of the Message component to customize the message.

- **Type:** `string`
- **Default:** `""`
- **Tag attribute:** `cssClass`

### Destroyed
Triggers when the Message component is destroyed successfully.

- **Type:** `string` (JavaScript function name)
- **Default:** `null`
- **Tag attribute:** `destroyed`

### EnablePersistence
Enable or disable persisting component's state between page reloads.

- **Type:** `bool`
- **Default:** `false`
- **Tag attribute:** `enablePersistence`

### EnableRtl
Enable or disable rendering component in right to left direction.

- **Type:** `bool`
- **Default:** `false`
- **Tag attribute:** `enableRtl`

### HtmlAttributes
Allows additional HTML attributes such as title, name, etc., and accepts n number of attributes in a key-value pair format.

- **Type:** `object`
- **Tag attribute:** `html-attributes`

### Locale
Overrides the global culture and localization value for this component. Default global culture is `'en-US'`.

- **Type:** `string`
- **Default:** `""`
- **Tag attribute:** `locale`

### Severity
Specifies the severity of the message, which is used to define the appearance (icons and colors) of the message. The available severity messages are Normal, Success, Info, Warning, and Error.

- **Type:** `Severity` (enum)
- **Default:** `Severity.Normal`
- **Tag attribute:** `severity`
- **Values:** `"Normal"` | `"Success"` | `"Info"` | `"Warning"` | `"Error"`

### ShowCloseIcon
Shows or hides the close icon in the Message component. An end user can click the close icon to hide the message. The `closed` event is triggered when the message is closed.

- **Type:** `bool`
- **Default:** `false`
- **Tag attribute:** `showCloseIcon`

### ShowIcon
Shows or hides the severity icon in the Message component. When set to true, the severity icon is displayed at the left edge of the Message component. This icon will be distinctive based on the severity property.

- **Type:** `bool`
- **Default:** `true`
- **Tag attribute:** `showIcon`

### Variant
Specifies the variant from predefined appearance variants to display the content of the Message component. The available variants are Text, Outlined, and Filled.

- **Type:** `Variant` (enum)
- **Default:** `Variant.Text`
- **Tag attribute:** `variant`
- **Values:** `"Text"` | `"Outlined"` | `"Filled"`

### Visible
Shows or hides the visibility of the Message component. When set to false, the Message component will be hidden.

- **Type:** `bool`
- **Default:** `true`
- **Tag attribute:** `visible`

---

## Events

### closed
Fires when the Message component is closed (dismissed) by the user via the close icon.

```cshtml
<ejs-message id="msg_dismiss"
             content="Dismissible message"
             showCloseIcon="true"
             closed="onMessageClosed">
</ejs-message>

<script>
    function onMessageClosed(args) {
        console.log('Message closed', args);
        document.getElementById('msg_dismiss').ej2_instances[0].visible = false;
    }
</script>
```

### created
Fires when the Message component has been successfully created and mounted.

```cshtml
<ejs-message id="msg_created"
             content="Hello"
             created="onMessageCreated">
</ejs-message>

<script>
    function onMessageCreated() {
        console.log('Message created');
    }
</script>
```

### destroyed
Fires when the Message component is destroyed via the `destroy()` method.

```cshtml
<ejs-message id="msg_destroyed"
             content="Hello"
             destroyed="onMessageDestroyed">
</ejs-message>

<script>
    function onMessageDestroyed() {
        console.log('Message destroyed');
    }
</script>
```

---

## Tag Helper Syntax Reference

| C# Property | Tag Helper Attribute | Element / Form |
|---|---|---|
| `Content` | `content` | Plain text or selector string |
| `ContentTemplate` | — | `<e-content-template>` child element |
| `CssClass` | `cssClass` | `string` |
| `Severity` | `severity` | `Severity` enum |
| `Variant` | `variant` | `Variant` enum |
| `ShowIcon` | `showIcon` | `bool` |
| `ShowCloseIcon` | `showCloseIcon` | `bool` |
| `Visible` | `visible` | `bool` |
| `EnableRtl` | `enableRtl` | `bool` |
| `EnablePersistence` | `enablePersistence` | `bool` |
| `Locale` | `locale` | `string` |
| `HtmlAttributes` | `html-attributes` | `object` |
| `Closed` | `closed` | JS function name |
| `Created` | `created` | JS function name |
| `Destroyed` | `destroyed` | JS function name |

---

## Severity and Variant Enums

### Severity Enum

```csharp
public enum Severity
{
    Normal  = 0,
    Success = 1,
    Info    = 2,
    Warning = 3,
    Error   = 4
}
```

### Variant Enum

```csharp
public enum Variant
{
    Text     = 0,
    Outlined = 1,
    Filled   = 2
}
```
