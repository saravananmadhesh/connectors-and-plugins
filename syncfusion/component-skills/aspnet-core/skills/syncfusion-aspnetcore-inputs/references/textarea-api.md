# TextArea API Reference for ASP.NET Core

Complete API reference for the TextArea TagHelper in ASP.NET Core using Syncfusion.EJ2.AspNet.Core.

**Namespace:** `Syncfusion.EJ2.Inputs`
**Assembly:** `Syncfusion.AspNetCore.Inputs.dll`
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `TextArea` (→ `SmartTextAreaTagHelper`)

## TagHelper Syntax

```html
<ejs-textarea id="textarea">
</ejs-textarea>
```

---

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [Methods](#methods)
- [Examples](#examples)

---

## Properties

### adornmentFlow

**Type:** `AdornmentsDirection`  
**Default:** `AdornmentsDirection.Horizontal`

Specifies the adornment direction of the TextArea. Controls the flow of the textarea and adornment sections (horizontal vs vertical).

```html
<ejs-textarea id="textarea" adornmentFlow="Vertical">
</ejs-textarea>
```

---

### adornmentOrientation

**Type:** `AdornmentsDirection`  
**Default:** `AdornmentsDirection.Horizontal`

Specifies the adornment orientation of the TextArea. Controls the direction of adornment items relative to each other within their region (horizontal vs vertical).

```html
<ejs-textarea id="textarea" adornmentOrientation="Vertical">
</ejs-textarea>
```

---

### appendTemplate

**Type:** `string`  
**Default:** `null`

Specifies the HTML template to append inside the TextArea wrapper. Accepts an HTML string or a function returning an HTML string. Updates dynamically when the property value changes.

```html
<ejs-textarea id="textarea" appendTemplate="<span class='e-icons e-suffix'></span>">
</ejs-textarea>
```

---

### blur

**Type:** `string` (event callback)  
**Default:** `null`

Triggers when the TextArea has focus-out. See [Events](#events) for usage.

---

### change

**Type:** `string` (event callback)  
**Default:** `null`

Triggers when the content of the TextArea has changed and gets focus-out. See [Events](#events) for usage.

---

### cols

**Type:** `int?` (Nullable<int>)  
**Default:** `null`

Specifies the visible width of the TextArea, measured in average character widths.

```html
<!-- 50 columns wide -->
<ejs-textarea id="textarea" cols="50">
</ejs-textarea>

<!-- 80 columns wide -->
<ejs-textarea id="textarea" cols="80">
</ejs-textarea>
```

---

### created

**Type:** `string` (event callback)  
**Default:** `null`

Triggers when the TextArea component is created. See [Events](#events) for usage.

---

### cssClass

**Type:** `string`  
**Default:** `""`

Specifies the CSS class value that is appended to the wrapper of the TextBox. Predefined classes: `e-small`, `e-bigger`, `e-error`, `e-warning`, `e-success`.

```html
<!-- Small TextArea -->
<ejs-textarea id="small" cssClass="e-small">
</ejs-textarea>

<!-- Large TextArea -->
<ejs-textarea id="large" cssClass="e-bigger">
</ejs-textarea>

<!-- Error state -->
<ejs-textarea id="error" cssClass="e-error">
</ejs-textarea>

<!-- Success state -->
<ejs-textarea id="success" cssClass="e-success">
</ejs-textarea>
```

---

### destroyed

**Type:** `string` (event callback)  
**Default:** `null`

Triggers when the TextArea component is destroyed. See [Events](#events) for usage.

---

### enabled

**Type:** `bool`  
**Default:** `true`

Specifies a Boolean value that indicates whether the TextArea allows the user to interact with it.

```html
<!-- Enabled (default) -->
<ejs-textarea id="textarea" enabled="true">
</ejs-textarea>

<!-- Disabled -->
<ejs-textarea id="textarea" enabled="false">
</ejs-textarea>
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

Enable or disable persisting the TextArea state between page reloads. If enabled, the `value` state will be persisted.

```html
<ejs-textarea id="textarea" enablePersistence="true">
</ejs-textarea>
```

---

### enableRtl

**Type:** `bool`  
**Default:** `false`

Enable or disable rendering the component in right-to-left direction.

```html
<ejs-textarea id="textarea" enableRtl="true">
</ejs-textarea>
```

---

### floatLabelType

**Type:** `FloatLabelType`  
**Default:** `FloatLabelType.Never`

Specifies the floating label behavior of the TextArea so that the placeholder text floats above the TextArea based on the configured value. Possible values are:

- `Never` - The placeholder text should not float ever.
- `Always` - The placeholder text floats above the TextArea always.
- `Auto` - The placeholder text floats above the TextArea while focusing or entering a value in the TextArea.

```html
<!-- Auto floating label (floats on focus or when filled) -->
<ejs-textarea id="textarea" placeholder="Comments" floatLabelType="Auto">
</ejs-textarea>

<!-- Always floating label -->
<ejs-textarea id="textarea" placeholder="Comments" floatLabelType="Always">
</ejs-textarea>

<!-- No floating label (default) -->
<ejs-textarea id="textarea" placeholder="Comments" floatLabelType="Never">
</ejs-textarea>
```

---

### focus

**Type:** `string` (event callback)  
**Default:** `null`

Triggers when the TextArea gets focus. See [Events](#events) for usage.

---

### for

**Type:** `ModelExpression` (override)  
**Default:** `null`

Model expression used to bind the TextArea to a model property in Razor Pages / MVC scenarios.

```html
<ejs-textarea for="Description"></ejs-textarea>
```

---

### htmlAttributes

**Type:** `object`  
**Default:** `null`

You can add the additional HTML attributes such as `disabled`, `value`, etc., to the element. If you configured both a property and the equivalent HTML attribute, the component considers the property value.

---

### input

**Type:** `string` (event callback)  
**Default:** `null`

Triggers each time the value of the TextArea has changed. See [Events](#events) for usage.

---

### locale

**Type:** `string`  
**Default:** `""`

Overrides the global culture and localization value for this component. The default global culture is `en-US`.

```html
<ejs-textarea id="textarea" locale="fr-FR">
</ejs-textarea>
```

---

### maxLength

**Type:** `int?` (Nullable<int>)  
**Default:** `null`

Specifies the maximum number of characters allowed in the TextArea.

```html
<!-- Maximum 500 characters -->
<ejs-textarea id="textarea" maxLength="500">
</ejs-textarea>

<!-- Maximum 1000 characters -->
<ejs-textarea id="textarea" maxLength="1000">
</ejs-textarea>
```

**Behavior:**
- Input is prevented when the limit is reached
- Pasted content is truncated to fit
- Existing content can be edited freely
- Use with a character counter for better UX

---

### placeholder

**Type:** `string`  
**Default:** `null`

Specifies the text that is shown as a hint/placeholder until the user focuses or enters a value in the TextArea. The property depends on the `floatLabelType` property.

```html
<ejs-textarea id="textarea" placeholder="Enter your comments">
</ejs-textarea>
```

---

### prependTemplate

**Type:** `string`  
**Default:** `null`

Specifies the HTML template to prepend inside the TextArea wrapper. Accepts an HTML string or a function returning an HTML string. Updates dynamically when the property value changes.

```html
<ejs-textarea id="textarea" prependTemplate="<span class='e-icons e-prefix'></span>">
</ejs-textarea>
```

---

### readonly

**Type:** `bool`  
**Default:** `false`

Specifies the boolean value that indicates whether the TextArea allows the user to change the text.

```html
<!-- Read-only -->
<ejs-textarea id="textarea" readonly="true" value="This text cannot be edited">
</ejs-textarea>
```

**When `readonly="true"`:**
- Text can be selected and copied
- No editing allowed
- Can receive focus
- Useful for displaying non-editable content

---

### resizeMode

**Type:** `Resize`  
**Default:** `Resize.Both`

Specifies the resize mode of the TextArea. Possible values are:

- `Vertical` - The textarea element can be resized vertically.
- `Horizontal` - The textarea element can be resized horizontally.
- `Both` - The textarea element can be resized both vertically and horizontally.
- `None` - The textarea element cannot be resized.

```html
<!-- Disable resizing -->
<ejs-textarea id="textarea" resizeMode="None">
</ejs-textarea>

<!-- Only vertical resize -->
<ejs-textarea id="textarea" resizeMode="Vertical">
</ejs-textarea>
```

---

### rows

**Type:** `int?` (Nullable<int>)  
**Default:** `null`

Specifies the visible height of the TextArea, measured in lines.

```html
<!-- 5 rows visible -->
<ejs-textarea id="textarea" rows="5">
</ejs-textarea>

<!-- 10 rows visible -->
<ejs-textarea id="textarea" rows="10">
</ejs-textarea>
```

---

### showClearButton

**Type:** `bool`  
**Default:** `false`

Specifies a Boolean value that indicates whether the clear button is displayed in the TextArea.

```html
<ejs-textarea id="textarea" showClearButton="true">
</ejs-textarea>
```

---

### value

**Type:** `string`  
**Default:** `null`

Sets the content of the TextArea.

```html
<ejs-textarea id="textarea" value="This is some text">
</ejs-textarea>
```

---

### width

**Type:** `string`  
**Default:** `null`

Specifies the width of the TextArea component. Accepts values in CSS-valid units (`200px`, `50%`, `auto`, etc.).

```html
<ejs-textarea id="textarea" width="500px">
</ejs-textarea>

<ejs-textarea id="textarea" width="100%">
</ejs-textarea>
```

---

## Events

### change

Triggers when the content of the TextArea has changed and gets focus-out.

```html
<ejs-textarea id="textarea" change="onChange">
</ejs-textarea>

<script>
function onChange(args) {
    console.log('TextArea value changed');
    console.log('New value:', args.value);
}
</script>
```

---

### focus

Triggers when the TextArea gets focus.

```html
<ejs-textarea id="textarea"focus="onFocus">
</ejs-textarea>

<script>
function onFocus(args) {
    console.log('TextArea focused');
}
</script>
```

---

### blur

Triggers when the TextArea has focus-out.

```html
<ejs-textarea id="textarea" blur="onBlur">
</ejs-textarea>

<script>
function onBlur(args) {
    console.log('TextArea blurred');
    console.log('Current value:', args.value);
}
</script>
```

---

### input

Triggers each time the value of the TextArea has changed (on every keystroke / paste).

```html
<ejs-textarea id="textarea" input="onInput">
</ejs-textarea>

<script>
function onInput(args) {
    console.log('User input detected');
    console.log('Current length:', args.value.length);
}
</script>
```

---

### created

Triggers when the TextArea component is created.

```html
<ejs-textarea id="textarea" created="onCreated">
</ejs-textarea>

<script>
function onCreated() {
    console.log('TextArea component ready');
}
</script>
```

---

### destroyed

Triggers when the TextArea component is destroyed.

```html
<ejs-textarea id="textarea" destroyed="onDestroyed">
</ejs-textarea>

<script>
function onDestroyed() {
    console.log('TextArea component destroyed');
}
</script>
```

---

## Methods

Methods are accessed from the client-side instance via `ej2_instances[0]` after the component is rendered.

| Method | Description |
| --- | --- |
| `focusIn()` | Sets focus to the TextArea element. |
| `focusOut()` | Removes focus from the TextArea element. |
| `getText()` | Returns the current text content of the TextArea. |
| `setText(value)` | Sets the text content of the TextArea. |
| `destroy()` | Destroys the component and detaches event handlers. |

```html
<script>
    const textarea = document.getElementById('textarea').ej2_instances[0];
    textarea.focusIn();
    textarea.setText('Hello, world!');
    console.log('Current text:', textarea.getText());
</script>
```

---

## Complete Example

```html
<!-- Views/Home/Index.cshtml -->
<div style="padding: 20px; max-width: 700px;">
    <h2>Customer Feedback Form</h2>

    <form id="feedbackForm">
        <div style="margin-bottom: 20px;">
            <label for="name">Name:</label>
            <input type="text" id="name" style="width: 100%; padding: 8px;" />
        </div>

        <div style="margin-bottom: 20px;">
            <label for="email">Email:</label>
            <input type="email" id="email" style="width: 100%; padding: 8px;" />
        </div>

        <div style="margin-bottom: 20px;">
            <label for="feedback">Your Feedback (max 500 characters):</label>
            <ejs-textarea id="feedback"
                placeholder="Please share your thoughts..."
                rows="6"
                maxLength="500"
                width="100%"
                showClearButton="true"
                resizeMode="Vertical"
                floatLabelType="Auto"
                created="onFeedbackCreated"
                change="onFeedbackChange"
                input="onFeedbackInput"
                focus="onFeedbackFocus"
                blur="onFeedbackBlur">
            </ejs-textarea>
            <small id="charCount" style="color: #666;">0 / 500 characters</small>
        </div>

        <button type="submit" style="padding: 10px 20px;">Submit Feedback</button>
    </form>
</div>

@section scripts {
    <ejs-scripts></ejs-scripts>
    <script>
        function onFeedbackCreated() {
            console.log('Feedback TextArea ready');
        }

        function onFeedbackChange(args) {
            const charCount = (args.value || '').length;
            document.getElementById('charCount').textContent = charCount + ' / 500 characters';
        }

        function onFeedbackInput(args) {
            console.log('Typing...', args.value.length, 'chars');
        }

        function onFeedbackFocus() {
            console.log('Feedback TextArea focused');
        }

        function onFeedbackBlur(args) {
            console.log('Feedback submitted:', args.value);
        }

        document.getElementById('feedbackForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const feedback = document.getElementById('feedback').ej2_instances[0].value;

            console.log('Form submitted:', { name, email, feedback });
        });
    </script>
}
```

---

## Related Topics
- [Getting Started](textarea-getting-started.md)
- [Events](textarea-events.md)
- [Max Length](textarea-max-length.md)
- [Floating Label](textarea-floating-label.md)
- [Form Support](textarea-form-support.md)
