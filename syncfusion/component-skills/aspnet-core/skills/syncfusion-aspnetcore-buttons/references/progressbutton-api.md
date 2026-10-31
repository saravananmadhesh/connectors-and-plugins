# API Reference – ASP.NET Core ProgressButton

> **Source:** [https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.splitbuttons.progressbutton.html#properties](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.splitbuttons.progressbutton.html#properties)  
> **Namespace:** `Syncfusion.EJ2.SplitButtons`  
> **Assembly:** `Syncfusion.AspNetCore.SplitButtons.dll`  
> **Tag Helper:** `<ejs-progressbutton>`

## Properties

| Property | Tag Helper Attr | Type | Default | Description |
|----------|-----------------|------|---------|-------------|
| `AnimationSettings` | `animationSettings` | `ProgressButtonAnimationSettings` | `null` | Specifies the animation settings |
| `Begin` | `begin` | `string` (JS function) | `null` | Triggers when the progress starts |
| `Content` | `content` | `string` | `""` | Defines the text content of the progress button element |
| `ContentTemplate` | `contentTemplate` | `MvcTemplate<object>` | — | Tag template for content |
| `Created` | `created` | `string` (JS function) | `null` | Triggers once the component rendering is completed |
| `CssClass` | `cssClass` | `string` | `""` | Specifies the root CSS class of the progress button that allows customization of the component's appearance (types, styles, size) |
| `Disabled` | `disabled` | `bool` | `false` | Enables or disables the progress button |
| `Duration` | `duration` | `double` | `2000` | Specifies the duration of progression in the progress button (in milliseconds) |
| `EnableHtmlSanitizer` | `enableHtmlSanitizer` | `bool` | `true` | Specifies whether to enable rendering of untrusted HTML values; sanitizes suspected untrusted strings and scripts |
| `EnableProgress` | `enableProgress` | `bool` | `false` | Enables or disables the background filler UI in the progress button |
| `End` | `end` | `string` (JS function) | `null` | Triggers when the progress is completed |
| `Fail` | `fail` | `string` (JS function) | `null` | Triggers when the progress is incomplete |
| `HtmlAttributes` | `htmlAttributes` | `object` | `null` | Allows additional HTML attributes such as title, name, etc. in key-value pair format |
| `IconCss` | `iconCss` | `string` | `""` | Defines class/multiple classes separated by a space for the progress button to include an icon (font icon or sprite image) |
| `IconPosition` | `iconPosition` | `IconPosition` | `Syncfusion.EJ2.Buttons.IconPosition.Left` | Positions an icon in the progress button. Possible values: `Left`, `Right`, `Top`, `Bottom` |
| `IsPrimary` | `isPrimary` | `bool` | `false` | Allows the appearance of the progress button to be enhanced and visually appealing when set to `true` |
| `IsToggle` | `isToggle` | `bool` | `false` | Makes the progress button toggle; when clicked, the state changes from normal to active |
| `Progress` | `progress` | `string` (JS function) | `null` | Triggers in specified intervals |
| `SpinSettings` | `spinSettings` | `ProgressButtonSpinSettings` | `null` | Specifies a spinner and its related properties |

---

## Events

> The official `Syncfusion.EJ2.SplitButtons.ProgressButton` page documents events as tag-helper string properties. Use the property name as a tag helper attribute with a JavaScript function name as the value.

| Event | Tag Helper Attr | Description |
|-------|-----------------|-------------|
| `Begin` | `begin` | Triggers when the progress starts |
| `Created` | `created` | Triggers once the component rendering is completed |
| `End` | `end` | Triggers when the progress is completed |
| `Fail` | `fail` | Triggers when the progress is incomplete |
| `Progress` | `progress` | Triggers in specified intervals |

### Event Usage Example

```cshtml
<ejs-progressbutton id="progressBtn" content="Upload"
                    enableProgress="true" cssClass="e-primary"
                    begin="onBegin" progress="onProgress" end="onEnd" fail="onFail">
</ejs-progressbutton>

<script>
    function onBegin(args) {
        console.log('Progress started');
    }
    function onProgress(args) {
        // args.percent - the current progress percentage
        console.log('Progress: ' + args.percent + '%');
    }
    function onEnd(args) {
        console.log('Progress completed');
    }
    function onFail(args) {
        console.log('Progress failed');
    }
</script>
```

---

## Methods

> The official `Syncfusion.EJ2.SplitButtons.ProgressButton` API page does not document a public Methods section. Component instance methods can be invoked via the underlying EJ2 widget reference (e.g. `document.getElementById('id').ej2_instances[0]`). For guaranteed behavior, prefer the documented properties and events above.

### Typical programmatic usage

```cshtml
<ejs-progressbutton id="progressBtn" content="Upload"
                    enableProgress="true" cssClass="e-primary"
                    begin="onBegin" end="onEnd">
</ejs-progressbutton>

<script>
    function onBegin(args) {
        // Use the underlying instance to start/stop progress
        var btn = document.getElementById('progressBtn').ej2_instances[0];

        // Simulate progress
        var interval = setInterval(function () {
            if (btn.currentState === 'Progress') {
                // progress is event-driven; advance by triggering Success/Fail via stop()
            } else {
                clearInterval(interval);
            }
        }, 500);
    }
</script>
```

---

## Example

```cshtml
<ejs-progressbutton 
    id="progressBtn" 
    content="Upload"
    enableProgress="true"
    duration="2000"
    cssClass="e-primary">
</ejs-progressbutton>
```

---

## See Also

- [ProgressButton Getting Started](progressbutton-getting-started.md)
- [ProgressButton Spinner and Progress](progressbutton-spinner-and-progress.md)
- [ProgressButton Style and Appearance](progressbutton-style-and-appearance.md)
