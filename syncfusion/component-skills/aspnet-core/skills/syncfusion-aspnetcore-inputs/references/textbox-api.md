# TextBox API Reference for ASP.NET Core

Complete API reference for the TextBox TagHelper in ASP.NET Core using Syncfusion.EJ2.AspNet.Core.

**Namespace:** `Syncfusion.EJ2.Inputs`
**Assembly:** `Syncfusion.AspNetCore.Inputs.dll`
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `TextBox`

## TagHelper Syntax

```html
<ejs-textbox id="textBox" property="value">
</ejs-textbox>
```

---

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [Methods](#methods)
- [Examples](#examples)

---

## Properties

### appendTemplate

**Type:** `string`  
**Default:** `null`

Specifies the HTML template string for custom elements to append to the TextBox input. Supports icons, buttons, or any valid HTML. Updates dynamically on property change.

```html
<ejs-textbox id="textBox" append-template="<span class='e-icons e-suffix'></span>">
</ejs-textbox>
```

---

### autocomplete

**Type:** `string`  
**Default:** `"on"`

Specifies whether the browser is allowed to automatically enter or select a value for the textbox. By default, autocomplete is enabled for the textbox. Possible values are:

- `on` - Specifies that autocomplete is enabled.
- `off` - Specifies that autocomplete is disabled.

```html
<ejs-textbox id="textBox" autocomplete="off">
</ejs-textbox>
```

---

### blur

**Type:** `string` (event callback)  
**Default:** `null`

Triggers when the TextBox has focus-out. See [Events](#events) for usage.

---

### change

**Type:** `string` (event callback)  
**Default:** `null`

Triggers when the content of the TextBox has changed and gets focus-out. See [Events](#events) for usage.

---

### created

**Type:** `string` (event callback)  
**Default:** `null`

Triggers when the TextBox component is created. See [Events](#events) for usage.

---

### cssClass

**Type:** `string`  
**Default:** `""`

Specifies the CSS class value that is appended to the wrapper of the TextBox. Predefined classes: `e-small`, `e-bigger`, `e-error`, `e-warning`, `e-success`.

```html
<!-- Small TextBox -->
<ejs-textbox id="small" cssClass="e-small">
</ejs-textbox>

<!-- Large TextBox -->
<ejs-textbox id="large" cssClass="e-bigger">
</ejs-textbox>

<!-- Error state -->
<ejs-textbox id="error" cssClass="e-error">
</ejs-textbox>

<!-- Success state -->
<ejs-textbox id="success" cssClass="e-success">
</ejs-textbox>

<!-- Warning state -->
<ejs-textbox id="warning" cssClass="e-warning">
</ejs-textbox>
```

---

### destroyed

**Type:** `string` (event callback)  
**Default:** `null`

Triggers when the TextBox component is destroyed. See [Events](#events) for usage.

---

### enabled

**Type:** `bool`  
**Default:** `true`

Specifies a Boolean value that indicates whether the TextBox allows the user to interact with it.

```html
<!-- Enabled (default) -->
<ejs-textbox id="textBox" enabled="true">
</ejs-textbox>

<!-- Disabled -->
<ejs-textbox id="textBox" enabled="false">
</ejs-textbox>
```

**When `enabled="false"`:**
- Appears grayed out
- No user input allowed
- Cannot receive focus
- Read-only appearance

---

### enablePersistence

**Type:** `bool`  
**Default:** `false`

Enable or disable persisting the TextBox state between page reloads. If enabled, the `value` state will be persisted.

```html
<ejs-textbox id="textBox" enablePersistence="true">
</ejs-textbox>
```

---

### enableRtl

**Type:** `bool`  
**Default:** `false`

Enable or disable rendering the component in right-to-left direction.

```html
<ejs-textbox id="textBox" enableRtl="true">
</ejs-textbox>
```

---

### floatLabelType

**Type:** `FloatLabelType`  
**Default:** `FloatLabelType.Never`

Specifies the floating label behavior of the TextBox so that the placeholder text floats above the TextBox based on the configured value. Possible values are:

- `Never` - The placeholder text should not float ever.
- `Always` - The placeholder text floats above the TextBox always.
- `Auto` - The placeholder text floats above the TextBox while focusing or entering a value in the TextBox.

```html
<!-- Auto floating label (floats on focus or when filled) -->
<ejs-textbox id="username" placeholder="Username" floatLabelType="Auto">
</ejs-textbox>

<!-- Always floating label -->
<ejs-textbox id="email" placeholder="Email" floatLabelType="Always">
</ejs-textbox>

<!-- No floating label (default) -->
<ejs-textbox id="search" placeholder="Search" floatLabelType="Never">
</ejs-textbox>
```

---

### focus

**Type:** `string` (event callback)  
**Default:** `null`

Triggers when the TextBox gets focus. See [Events](#events) for usage.

---

### for

**Type:** `ModelExpression` (override)  
**Default:** `null`

Model expression used to bind the TextBox to a model property in Razor Pages / MVC scenarios.

```html
<ejs-textbox for="Email"></ejs-textbox>
```

---

### htmlAttributes

**Type:** `object`  
**Default:** `null`

You can add the additional HTML attributes such as `disabled`, `value`, `maxlength`, `minlength`, `pattern`, `autofocus`, `tabindex`, `aria-*`, `data-*`, etc., to the element. If you configured both a property and the equivalent HTML attribute, the component considers the property value.

> **Note:** HTML attributes like `maxlength`, `minlength`, `pattern`, `tabindex`, and `autofocus` are not first-class TextBox properties — pass them via `htmlAttributes` or directly on the Tag Helper.

---

### input

**Type:** `string` (event callback)  
**Default:** `null`

Triggers each time the value of the TextBox has changed. See [Events](#events) for usage.

---

### locale

**Type:** `string`  
**Default:** `""`

Overrides the global culture and localization value for this component. The default global culture is `en-US`.

```html
<ejs-textbox id="textBox" locale="fr-FR">
</ejs-textbox>
```

---

### multiline

**Type:** `bool`  
**Default:** `false`

Specifies a Boolean value that enables or disables the multiline mode on the TextBox. The TextBox changes from a single line to multiline when this mode is enabled.

```html
<ejs-textbox id="comments" multiline="true" placeholder="Type your comments...">
</ejs-textbox>
```

---

### placeholder

**Type:** `string`  
**Default:** `null`

Specifies the text that is shown as a hint/placeholder until the user focuses or enters a value in the TextBox. The property depends on the `floatLabelType` property.

```html
<ejs-textbox id="textBox" placeholder="Enter your name">
</ejs-textbox>
```

---

### prependTemplate

**Type:** `string`  
**Default:** `null`

Specifies the HTML template string for custom elements to prepend to the TextBox input. Supports icons, buttons, or any valid HTML. Updates dynamically on property change.

```html
<ejs-textbox id="textBox" prependTemplate="<span class='e-icons e-prefix'></span>">
</ejs-textbox>
```

---

### readonly

**Type:** `bool`  
**Default:** `false`

Specifies the boolean value that indicates whether the TextBox allows the user to change the text.

```html
<!-- Read-only -->
<ejs-textbox id="textBox" readonly="true" value="This text cannot be edited">
</ejs-textbox>
```

**When `readonly="true"`:**
- Text can be selected and copied
- No editing allowed
- Can receive focus
- Useful for displaying non-editable content

---

### showClearButton

**Type:** `bool`  
**Default:** `false`

Specifies a Boolean value that indicates whether the clear button is displayed in the TextBox.

```html
<ejs-textbox id="textBox" showClearButton="true">
</ejs-textbox>
```

---

### type

**Type:** `string`  
**Default:** `"text"`

Specifies the behavior of the TextBox such as `text`, `password`, `email`, etc.

```html
<!-- Text input (default) -->
<ejs-textbox id="username" type="text" placeholder="Username">
</ejs-textbox>

<!-- Email input -->
<ejs-textbox id="email" type="email" placeholder="Enter email">
</ejs-textbox>

<!-- Password input -->
<ejs-textbox id="password" type="password" placeholder="Enter password">
</ejs-textbox>

<!-- URL input -->
<ejs-textbox id="website" type="url" placeholder="https://example.com">
</ejs-textbox>

<!-- Telephone input -->
<ejs-textbox id="phone" type="tel" placeholder="(123) 456-7890">
</ejs-textbox>
```

---

### value

**Type:** `string`  
**Default:** `null`

Sets the content of the TextBox.

```html
<ejs-textbox id="textBox" value="Hello World">
</ejs-textbox>
```

---

### width

**Type:** `string`  
**Default:** `null`

Specifies the width of the TextBox component. Accepts values in CSS-valid units (`200px`, `50%`, `auto`, etc.).

```html
<ejs-textbox id="textBox" width="300px">
</ejs-textbox>

<ejs-textbox id="textBox" width="100%">
</ejs-textbox>
```

---

## Events

Events are handled through the `<e-events>` child element:

### change

Triggers when the content of the TextBox has changed and gets focus-out.

```html
<ejs-textbox id="textBox">
    <e-events change="onChange"></e-events>
</ejs-textbox>

<script>
function onChange(args) {
    console.log('TextBox value changed');
    console.log('New value:', args.value);
}
</script>
```

---

### focus

Triggers when the TextBox gets focus.

```html
<ejs-textbox id="textBox">
    <e-events focus="onFocus"></e-events>
</ejs-textbox>

<script>
function onFocus(args) {
    console.log('TextBox focused');
}
</script>
```

---

### blur

Triggers when the TextBox has focus-out.

```html
<ejs-textbox id="textBox">
    <e-events blur="onBlur"></e-events>
</ejs-textbox>

<script>
function onBlur(args) {
    console.log('TextBox blurred');
    console.log('Current value:', args.value);
}
</script>
```

---

### input

Triggers each time the value of the TextBox has changed (on every keystroke / paste).

```html
<ejs-textbox id="textBox">
    <e-events input="onInput"></e-events>
</ejs-textbox>

<script>
function onInput(args) {
    console.log('User input detected');
    console.log('Current value:', args.value);
}
</script>
```

---

### created

Triggers when the TextBox component is created.

```html
<ejs-textbox id="textBox">
    <e-events created="onCreated"></e-events>
</ejs-textbox>

<script>
function onCreated() {
    console.log('TextBox component ready');
}
</script>
```

---

### destroyed

Triggers when the TextBox component is destroyed.

```html
<ejs-textbox id="textBox">
    <e-events destroyed="onDestroyed"></e-events>
</ejs-textbox>

<script>
function onDestroyed() {
    console.log('TextBox component destroyed');
}
</script>
```

---

## Methods

Methods are accessed from the client-side instance via `ej2_instances[0]` after the component is rendered.

| Method | Description |
| --- | --- |
| `focusIn()` | Sets focus to the TextBox element. |
| `focusOut()` | Removes focus from the TextBox element. |
| `getText()` | Returns the current text content of the TextBox. |
| `setText(value)` | Sets the text content of the TextBox. |
| `destroy()` | Destroys the component and detaches event handlers. |

```html
<script>
    const textbox = document.getElementById('textBox').ej2_instances[0];
    textbox.focusIn();
    textbox.setText('Hello, world!');
    console.log('Current text:', textbox.getText());
</script>
```

---

## Complete Example

```html
<!-- Views/Home/Index.cshtml -->
<div style="padding: 20px; max-width: 500px;">
    <h2>Contact Form</h2>

    <form id="contactForm">
        <div style="margin-bottom: 20px;">
            <label for="fullName">Full Name <span style="color: red;">*</span>:</label>
            <ejs-textbox id="fullName"
                placeholder="Enter your full name"
                width="100%"
                floatLabelType="Auto"
                maxlength="100">
                <e-events created="onNameCreated" blur="validateName"></e-events>
            </ejs-textbox>
            <small id="nameError" style="color: red;"></small>
        </div>

        <div style="margin-bottom: 20px;">
            <label for="email">Email <span style="color: red;">*</span>:</label>
            <ejs-textbox id="email"
                type="email"
                placeholder="Enter your email"
                width="100%"
                showClearButton="true"
                floatLabelType="Auto">
                <e-events created="onEmailCreated" change="onEmailChange" blur="validateEmail"></e-events>
            </ejs-textbox>
            <small id="emailError" style="color: red;"></small>
        </div>

        <div style="margin-bottom: 20px;">
            <label for="phone">Phone Number:</label>
            <ejs-textbox id="phone"
                type="tel"
                placeholder="(123) 456-7890"
                width="100%"
                floatLabelType="Auto">
            </ejs-textbox>
        </div>

        <div style="margin-bottom: 20px;">
            <label for="website">Website:</label>
            <ejs-textbox id="website"
                type="url"
                placeholder="https://example.com"
                width="100%"
                floatLabelType="Auto">
            </ejs-textbox>
        </div>

        <button type="submit" style="padding: 10px 20px;">Submit</button>
    </form>
</div>

@section scripts {
    <ejs-scripts></ejs-scripts>
    <script>
        function onNameCreated() {
            console.log('Name TextBox ready');
        }

        function onEmailCreated() {
            console.log('Email TextBox ready');
        }

        function onEmailChange(args) {
            console.log('Email changed:', args.value);
        }

        function validateName(args) {
            const name = (args.value || '').trim();
            const errorDiv = document.getElementById('nameError');

            if (name.length === 0) {
                errorDiv.textContent = 'Name is required';
            } else if (name.length < 2) {
                errorDiv.textContent = 'Name must be at least 2 characters';
            } else {
                errorDiv.textContent = '';
            }
        }

        function validateEmail(args) {
            const email = (args.value || '').trim();
            const errorDiv = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email.length === 0) {
                errorDiv.textContent = 'Email is required';
            } else if (!emailRegex.test(email)) {
                errorDiv.textContent = 'Invalid email format';
            } else {
                errorDiv.textContent = '';
            }
        }

        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const fullName = document.getElementById('fullName').ej2_instances[0].value;
            const email = document.getElementById('email').ej2_instances[0].value;
            const phone = document.getElementById('phone').ej2_instances[0].value;
            const website = document.getElementById('website').ej2_instances[0].value;

            console.log('Form submitted:', { fullName, email, phone, website });
        });
    </script>
}
```

---

## Related Topics
- [Getting Started](textbox-getting-started.md)
- [Events](textbox-events.md)
- [Form Support](textbox-form-support.md)
- [Style and Customization](textbox-style-and-customization.md)
