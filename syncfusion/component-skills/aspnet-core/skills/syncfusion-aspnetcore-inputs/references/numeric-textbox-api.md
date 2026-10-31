# NumericTextBox API Reference for ASP.NET Core

> **Source:** [https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.inputs.numerictextbox.html#properties](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.inputs.numerictextbox.html#properties)  
> **Namespace:** `Syncfusion.EJ2.Inputs`  
> **Assembly:** `Syncfusion.AspNetCore.Inputs.dll`  
> **Tag Helper:** `<ejs-numerictextbox>`

## TagHelper Syntax

```html
<ejs-numerictextbox id="numericTextBox" property="value">
</ejs-numerictextbox>
```

---

## Properties

| Property | Tag Helper Attr | Type | Default | Description |
|----------|-----------------|------|---------|-------------|
| `AllowMouseWheel` | `allowMouseWheel` | `bool` | `true` | Gets or sets a value indicating whether the mouse wheel interaction is enabled for incrementing or decrementing the value |
| `AppendTemplate` | `appendTemplate` | `string` | `null` | Specifies the HTML template string for custom elements to append to the NumericTextBox input. Supports icons, buttons, or any valid HTML. Updates dynamically on property change |
| `Blur` | `blur` | `string` (JS function) | `null` | Triggers when the NumericTextBox loses focus |
| `Change` | `change` | `string` (JS function) | `null` | Triggers when the value of the NumericTextBox changes. Triggered on: changing value via keyboard then focusing out, scrolling within the input, using the spin buttons, or programmatic value changes |
| `Created` | `created` | `string` (JS function) | `null` | Triggers when the NumericTextBox component is created |
| `CssClass` | `cssClass` | `string` | `null` | Gets or Sets the CSS classes to root element of the NumericTextBox which helps to customize the complete UI styles |
| `Currency` | `currency` | `string` | `null` | Specifies the currency code to use in currency formatting. Possible values are the ISO 4217 currency codes, such as `USD`, `EUR` |
| `Decimals` | `decimals` | `double` | `Double.NaN` | Specifies the number precision applied to the textbox value when the NumericTextBox is focused |
| `Destroyed` | `destroyed` | `string` (JS function) | `null` | Triggers when the NumericTextBox component is destroyed |
| `Enabled` | `enabled` | `bool` | `true` | Sets a value that enables or disables the NumericTextBox control |
| `EnablePersistence` | `enablePersistence` | `bool` | `false` | Enable or disable persisting NumericTextBox state between page reloads. If enabled, the `value` state will be persisted |
| `EnableRtl` | `enableRtl` | `bool` | `false` | Enable or disable rendering component in right to left direction |
| `FloatLabelType` | `floatLabelType` | `FloatLabelType` | `FloatLabelType.Never` | Acts as a label and floats above the NumericTextBox. Possible values: `Never`, `Always`, `Auto` |
| `Focus` | `focus` | `string` (JS function) | `null` | Triggers when the NumericTextBox gets focus |
| `For` | `for` | `ModelExpression` | — | Overrides `Syncfusion.EJ2.EJTagHelper.For` |
| `Format` | `format` | `string` | `"n2"` | Specifies the number format that indicates the display format for the value of the NumericTextBox |
| `HtmlAttributes` | `htmlAttributes` | `object` | `null` | Add additional HTML attributes (e.g., disabled, value). If both property and equivalent HTML attribute are configured, the component considers the property value |
| `Locale` | `locale` | `string` | `""` | Overrides the global culture and localization value. Default global culture is `'en-US'` |
| `Max` | `max` | `object` | `null` | Specifies a maximum value that is allowed a user can enter |
| `Min` | `min` | `object` | `null` | Specifies a minimum value that is allowed a user can enter |
| `Placeholder` | `placeholder` | `string` | `null` | Gets or sets the string shown as a hint/placeholder when the NumericTextBox is empty |
| `PrependTemplate` | `prependTemplate` | `string` | `null` | Specifies the HTML template string for custom elements to prepend to the NumericTextBox input. Supports icons, buttons, or any valid HTML. Updates dynamically on property change |
| `Readonly` | `readonly` | `bool` | `false` | Sets a value that enables or disables the readonly state on the NumericTextBox. If `true`, NumericTextBox will not allow input |
| `ShowClearButton` | `showClearButton` | `bool` | `false` | Specifies whether to show or hide the clear icon |
| `ShowSpinButton` | `showSpinButton` | `bool` | `true` | Specifies whether the up and down spin buttons should be displayed in NumericTextBox |
| `Step` | `step` | `double` | `1` | Specifies the incremental or decremental step size for the NumericTextBox |
| `StrictMode` | `strictMode` | `bool` | `true` | Specifies a value that indicates whether the NumericTextBox control allows the value for the specified range. If `true`, the input value will be restricted between min and max |
| `ValidateDecimalOnType` | `validateDecimalOnType` | `bool` | `false` | Specifies whether the decimals length should be restricted during typing |
| `Value` | `value` | `object` | `null` | Sets the value of the NumericTextBox |
| `Width` | `width` | `string` | `null` | Specifies the width of the NumericTextBox |

---

## Events

> The official `Syncfusion.EJ2.Inputs.NumericTextBox` page documents events as tag-helper string properties. Use the property name as a tag helper attribute with a JavaScript function name as the value.

| Event | Tag Helper Attr | Description |
|-------|-----------------|-------------|
| `Blur` | `blur` | Triggers when the NumericTextBox loses focus |
| `Change` | `change` | Triggers when the value of the NumericTextBox changes (keyboard, spin buttons, programmatic) |
| `Created` | `created` | Triggers when the NumericTextBox component is created |
| `Destroyed` | `destroyed` | Triggers when the NumericTextBox component is destroyed |
| `Focus` | `focus` | Triggers when the NumericTextBox gets focus |

### Event Usage Example

```html
<ejs-numerictextbox id="numericTextBox" value="10"
                    change="onChange" focus="onFocus" blur="onBlur" created="onCreated">
</ejs-numerictextbox>

<script>
    function onChange(args) {
        console.log('New value:', args.value);
    }
    function onFocus(args) {
        console.log('NumericTextBox focused');
    }
    function onBlur(args) {
        console.log('NumericTextBox blurred, value:', args.value);
    }
    function onCreated() {
        console.log('NumericTextBox created');
    }
</script>
```

---

## Methods

> The official `Syncfusion.EJ2.Inputs.NumericTextBox` API page does not document a public Methods section. Component instance methods can be invoked via the underlying EJ2 widget reference (e.g. `document.getElementById('id').ej2_instances[0]`). For guaranteed behavior, prefer the documented properties and events above.

---

## Examples

### Currency
```html
<ejs-numerictextbox id="currency" value="99.99" format="c2" currency="USD">
</ejs-numerictextbox>
```

### Number with thousand separator
```html
<ejs-numerictextbox id="number" value="1234.56" format="n2">
</ejs-numerictextbox>
```

### Percentage
```html
<ejs-numerictextbox id="percentage" value="0.5" format="p">
</ejs-numerictextbox>
```

### Strict mode with range
```html
<ejs-numerictextbox id="strict" value="50" min="0" max="100" strictMode="true">
</ejs-numerictextbox>
```

### With spinner buttons
```html
<ejs-numerictextbox id="withSpinner" value="10" step="5" showSpinButton="true">
</ejs-numerictextbox>
```

---

## Related Topics
- [Getting Started](numeric-textbox-getting-started.md)
- [Formats & Validation](numeric-textbox-formats-and-validation.md)
- [Adornments & Styling](numeric-textbox-adornments-and-styling.md)
