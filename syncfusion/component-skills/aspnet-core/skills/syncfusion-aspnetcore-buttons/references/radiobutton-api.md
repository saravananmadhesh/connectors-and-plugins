# API Reference – ASP.NET Core RadioButton

> **Source:** [https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.buttons.radiobutton.html#properties](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.buttons.radiobutton.html#properties)  
> **Namespace:** `Syncfusion.EJ2.Buttons`  
> **Assembly:** `Syncfusion.AspNetCore.Buttons.dll`  
> **Tag Helper:** `<ejs-radiobutton>`

## Properties

| Property | Tag Helper Attr | Type | Default | Description |
|----------|-----------------|------|---------|-------------|
| `Change` | `change` | `string` (JS function) | `null` | Event triggered when the RadioButton state has been changed by user interaction |
| `Checked` | `checked` | `bool` | `false` | Specifies a value that indicates whether the RadioButton is `checked` or not |
| `Created` | `created` | `string` (JS function) | `null` | Triggers once the component rendering is completed |
| `CssClass` | `cssClass` | `string` | `""` | Defines class/multiple classes separated by a space in the RadioButton element to add custom styles |
| `Disabled` | `disabled` | `bool` | `false` | Specifies a value that indicates whether the RadioButton is `disabled` or not |
| `EnableHtmlSanitizer` | `enableHtmlSanitizer` | `bool` | `true` | Specifies whether to enable rendering of untrusted HTML values; sanitizes suspected untrusted strings and scripts |
| `EnablePersistence` | `enablePersistence` | `bool` | `false` | Enable or disable persisting component's state between page reloads |
| `EnableRtl` | `enableRtl` | `bool` | `false` | Enable or disable rendering component in right to left direction |
| `For` | `for` | `ModelExpression` | — | Overrides `Syncfusion.EJ2.EJTagHelper.For` |
| `HtmlAttributes` | `htmlAttributes` | `object` | `null` | Add additional HTML attributes (e.g., disabled, value). If both property and equivalent HTML attribute are configured, the component considers the property value |
| `Label` | `label` | `string` | `""` | Defines the caption for the RadioButton that describes its purpose |
| `LabelPosition` | `labelPosition` | `RadioLabelPosition` | `RadioLabelPosition.After` | Positions label `before`/`after` the RadioButton. Possible values: `Before`, `After` |
| `Locale` | `locale` | `string` | `""` | Overrides the global culture and localization value. Default global culture is `'en-US'` |
| `Name` | `name` | `string` | `""` | Defines `name` attribute for the RadioButton. Used to reference form data (RadioButton value) after form submission |
| `Value` | `value` | `string` | `""` | Defines `value` attribute for the RadioButton. Form data passed to the server when submitting the form |

---

## Events

> The official `Syncfusion.EJ2.Buttons.RadioButton` page documents events as tag-helper string properties. Use the property name as a tag helper attribute with a JavaScript function name as the value.

| Event | Tag Helper Attr | Description |
|-------|-----------------|-------------|
| `Change` | `change` | Triggers when the RadioButton state has been changed by user interaction |
| `Created` | `created` | Triggers once the component rendering is completed |

### Event Usage Example

```cshtml
<ejs-radiobutton id="r1" name="options" value="opt1" label="Option 1"
                 change="onChange" created="onCreated">
</ejs-radiobutton>

<script>
    function onChange(args) {
        // args.value - the RadioButton's value
        // args.checked - the new checked state
        console.log('RadioButton changed: ' + args.value + ', checked: ' + args.checked);
    }
    function onCreated() {
        console.log('RadioButton created');
    }
</script>
```

---

## Methods

> The official `Syncfusion.EJ2.Buttons.RadioButton` API page does not document a public Methods section. Component instance methods can be invoked via the underlying EJ2 widget reference (e.g. `document.getElementById('id').ej2_instances[0]`). For guaranteed behavior, prefer the documented properties and events above.

---

## Example

```cshtml
<fieldset>
    <legend>Select Option</legend>
    <ul>
        <li>
            <ejs-radiobutton 
                id="r1" 
                name="options"
                value="opt1"
                label="Option 1"
                checked="true">
            </ejs-radiobutton>
        </li>
        <li>
            <ejs-radiobutton 
                id="r2" 
                name="options"
                value="opt2"
                label="Option 2">
            </ejs-radiobutton>
        </li>
    </ul>
</fieldset>
```

---

## See Also

- [RadioButton Getting Started](radiobutton-getting-started.md)
- [RadioButton Features and State](radiobutton-features-and-state.md)
- [RadioButton Label and Size](radiobutton-label-and-size.md)
