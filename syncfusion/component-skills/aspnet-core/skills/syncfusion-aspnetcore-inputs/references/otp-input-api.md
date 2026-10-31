# OTP Input API Reference — ASP.NET Core

> **Source:** [https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.inputs.otpinput.html#properties](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.inputs.otpinput.html#properties)  
> **Namespace:** `Syncfusion.EJ2.Inputs`  
> **Assembly:** `Syncfusion.AspNetCore.Inputs.dll`  
> **Tag Helper:** `<ejs-otpinput>`

## Table of Contents
- [Component](#component)
- [Properties](#properties)
- [Events](#events)
- [Methods](#methods)
- [Examples](#examples)

---

## Component

**TagHelper Import:**
```html
@addTagHelper *, Syncfusion.EJ2
```

**Basic Usage:**
```html
<ejs-otpinput id="otpinput" length="4" type="Number"></ejs-otpinput>
```

---

## Properties

| Property | Tag Helper Attr | Type | Default | Description |
|----------|-----------------|------|---------|-------------|
| `AriaLabels` | `ariaLabels` | `string[]` | `null` | Defines the ARIA-label attribute for each input field in the Otp (One-Time Password) input component. Each string in the array corresponds to the ARIA-label attribute for each input field |
| `AutoFocus` | `autoFocus` | `bool` | `false` | Specifies whether the OTP input field should automatically receive focus when the component is rendered |
| `Blur` | `blur` | `string` (JS function) | `null` | Event triggers when the Otp input is focused out |
| `Created` | `created` | `string` (JS function) | `null` | Event triggers after the creation of the Otp Input |
| `CssClass` | `cssClass` | `string` | `""` | Defines one or more CSS classes that can be used to customize the appearance of the Otp input component |
| `Disabled` | `disabled` | `bool` | `false` | Specifies whether the Otp input component is disabled. When `true`, the component is disabled and user input is not allowed |
| `EnablePersistence` | `enablePersistence` | `bool` | `false` | Enable or disable persisting component's state between page reloads |
| `EnableRtl` | `enableRtl` | `bool` | `false` | Enable or disable rendering component in right to left direction |
| `Focus` | `focus` | `string` (JS function) | `null` | Event triggers when the Otp input is focused |
| `HtmlAttributes` | `htmlAttributes` | `object` | `null` | Specifies additional HTML attributes to be applied to the Otp input component |
| `Input` | `input` | `string` (JS function) | `null` | Event triggers each time when the value of each Otp input is changed |
| `Length` | `length` | `double` | `4` | Specifies the length of the Otp (One-Time Password) to be entered by the user. Determines the number of input fields in the Otp Input |
| `Locale` | `locale` | `string` | `""` | Overrides the global culture and localization value. Default global culture is `'en-US'` |
| `Placeholder` | `placeholder` | `string` | `""` | Specifies the text that is shown as a hint/placeholder until the user focuses on or enters a value. If a single text is provided, it will be used for all input fields; otherwise, each text letter will be used for each field |
| `Separator` | `separator` | `string` | `""` | Specifies the separator used to separate each input field. The separator is displayed between each input field |
| `StylingMode` | `stylingMode` | `OtpInputStyle` | `OtpInputStyle.Outlined` | Specifies the style variant for the input fields in the Otp Input component |
| `TextTransform` | `textTransform` | `TextTransform` | `TextTransform.None` | Specifies the case transformation for the OTP input text |
| `Type` | `type` | `OtpInputType` | `OtpInputType.Number` | Specifies the input type of the Otp |
| `Value` | `value` | `string` | `""` | Specifies the value of the Otp (One-Time Password) input. This can be a string or a number, representing the Otp value entered by the user |
| `ValueChanged` | `valueChanged` | `string` (JS function) | `null` | Event triggers after the value is changed and the Otp input is focused out |

---

## Events

> The official `Syncfusion.EJ2.Inputs.OtpInput` page documents events as tag-helper string properties. Use the property name as a tag helper attribute with a JavaScript function name as the value.

| Event | Tag Helper Attr | Description |
|-------|-----------------|-------------|
| `Blur` | `blur` | Triggers when the Otp input is focused out |
| `Created` | `created` | Triggers after the creation of the Otp Input |
| `Focus` | `focus` | Triggers when the Otp input is focused |
| `Input` | `input` | Triggers each time when the value of each Otp input is changed |
| `ValueChanged` | `valueChanged` | Triggers after the value is changed and the Otp input is focused out |

### Event Usage Example

```html
<ejs-otpinput id="otpinput"
              created="onOtpCreated"
              focus="onOtpFocus"
              blur="onOtpBlur"
              input="onOtpInput"
              valueChanged="onOtpValueChanged">
</ejs-otpinput>

<script>
    function onOtpCreated() {
        console.log('OTP Input is ready');
    }
    function onOtpFocus(args) {
        console.log('OTP Input focused');
    }
    function onOtpBlur(args) {
        console.log('OTP Input blurred');
    }
    function onOtpInput(args) {
        console.log('Current OTP value:', args.value);
    }
    function onOtpValueChanged(args) {
        console.log('Complete OTP value:', args.value);
        // Submit verification
    }
</script>
```

---

## Methods

> The official `Syncfusion.EJ2.Inputs.OtpInput` API page does not document a public Methods section. Component instance methods can be invoked via the underlying EJ2 widget reference (e.g. `document.getElementById('id').ej2_instances[0]`). For guaranteed behavior, prefer the documented properties and events above.

---

## Examples

### Basic Implementation

```html
<ejs-otpinput id="otp" length="6" type="Number" placeholder="0" autoFocus="true"
              input="onOtpInput" valueChanged="onOtpValueChanged">
</ejs-otpinput>

<script>
    const otpComponent = document.getElementById('otp').ej2_instances[0];
    const verifyBtn = document.getElementById('verify-btn');

    function onOtpInput(args) {
        console.log('Current value:', args.value);
    }

    function onOtpValueChanged(args) {
        console.log('OTP Complete:', args.value);
        if (args.value && args.value.length === 6) {
            verifyBtn.disabled = false;
        }
    }
</script>
```

### With Separator and StylingMode

```html
<ejs-otpinput id="otp-styled" length="6" type="Number" separator="-"
              stylingMode="Outlined" cssClass="e-success">
</ejs-otpinput>
```

### With Per-Field Placeholder and ARIA Labels

```html
<ejs-otpinput id="otp-a11y" length="6" type="Number"
              placeholder="012345"
              ariaLabels="@(new[] { "Digit 1", "Digit 2", "Digit 3", "Digit 4", "Digit 5", "Digit 6" })">
</ejs-otpinput>
```

---

## See Also

- `otp-input-getting-started.md` — Quick start guide
- `otp-input-configuration.md` — Configuration options
- `otp-input-accessibility.md` — Accessibility features
- `otp-input-events.md` — Event handling patterns
