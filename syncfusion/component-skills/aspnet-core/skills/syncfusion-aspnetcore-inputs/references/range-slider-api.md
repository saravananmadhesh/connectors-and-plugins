# Slider API Reference — ASP.NET Core

> **Source:** [https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.inputs.slider.html#properties](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.inputs.slider.html#properties)  
> **Namespace:** `Syncfusion.EJ2.Inputs`  
> **Assembly:** `Syncfusion.AspNetCore.Inputs.dll`  
> **Tag Helper:** `<ejs-slider>`

> The official Syncfusion Slider component is a single component (`<ejs-slider>`) used for both single-value and range-value selection via the `Type` property. The file is named `range-slider-api.md` for compatibility with the existing skill folder structure.

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [Methods](#methods)
- [JavaScript Interop](#javascript-interop)

---

## Properties

| Property | Tag Helper Attr | Type | Default | Description |
|----------|-----------------|------|---------|-------------|
| `Change` | `change` | `string` (JS function) | `null` | We can trigger change event whenever Slider value is changed. This event will be triggered while dragging the slider thumb |
| `Changed` | `changed` | `string` (JS function) | `null` | Fires whenever the Slider value is changed. This event will be triggered when dragging the slider thumb is completed |
| `ColorRange` | `colorRange` | `object` | `null` | Specifies the color to the slider based on given value |
| `Created` | `created` | `string` (JS function) | `null` | Triggers when the Slider is successfully created |
| `CssClass` | `cssClass` | `string` | `""` | Specifies the custom classes to be added to the element used to customize the slider |
| `CustomValues` | `customValues` | `object` | `null` | Specifies an array of slider values in number or string type. The min and max step values are not considered |
| `EnableAnimation` | `enableAnimation` | `bool` | `true` | Enable or Disable the animation for slider movement |
| `Enabled` | `enabled` | `bool` | `true` | Enable or Disable the slider |
| `EnableHtmlSanitizer` | `enableHtmlSanitizer` | `bool` | `true` | Specifies whether to display or remove the untrusted HTML values in the Slider component |
| `EnablePersistence` | `enablePersistence` | `bool` | `false` | Enable or disable persisting component's state between page reloads |
| `EnableRtl` | `enableRtl` | `bool` | `false` | Enable or disable rendering component in right to left direction |
| `HtmlAttributes` | `htmlAttributes` | `object` | `null` | Allows additional HTML attributes such as title, name, etc. in key-value pair format |
| `Limits` | `limits` | `SliderLimitData` | `null` | Specifies the limit within which the slider is to be moved |
| `Locale` | `locale` | `string` | `""` | Overrides the global culture and localization value. Default global culture is `'en-US'` |
| `Max` | `max` | `double` | `100` | Gets/Sets the maximum value of the slider |
| `Min` | `min` | `double` | `0` | Gets/Sets the minimum value of the slider |
| `Orientation` | `orientation` | `SliderOrientation` | `SliderOrientation.Horizontal` | Specifies whether to render the slider in vertical or horizontal orientation |
| `Readonly` | `readonly` | `bool` | `false` | Specifies whether to render the slider in read-only mode to restrict any user interaction |
| `RenderedTicks` | `renderedTicks` | `string` (JS function) | `null` | Triggers when the ticks are rendered on the Slider |
| `RenderingTicks` | `renderingTicks` | `string` (JS function) | `null` | Triggers on rendering the ticks element in the Slider, which is used to customize the ticks labels dynamically |
| `ShowButtons` | `showButtons` | `bool` | `false` | Specifies whether to show or hide the increase/decrease buttons of Slider to change the slider value |
| `Step` | `step` | `double` | `1` | Specifies the step value for each value change when the increase / decrease button is clicked or on arrow keys press or on dragging the thumb |
| `Ticks` | `ticks` | `SliderTicksData` | `null` | Used to render the slider ticks options such as placement and step values |
| `Tooltip` | `tooltip` | `SliderTooltipData` | `null` | Specifies the visibility, position of the tooltip over the slider element |
| `TooltipChange` | `tooltipChange` | `string` (JS function) | `null` | Triggers when the Slider tooltip value is changed |
| `Type` | `type` | `SliderType` | `SliderType.Default` | Defines the type of the Slider. Possible values: `Default` - a single value, `MinRange` - single value with shadow, `Range` - a range of values |
| `Value` | `value` | `object` | `null` | Denotes the current value of the Slider. The value should be specified in array of number when render Slider type as range |
| `Width` | `width` | `string` | `null` | Specifies the width of the Slider |

### Notes on Range Slider

For range sliders, `Value` accepts an array of two numbers (e.g., `[30, 70]`) when `Type` is set to `Range`. The official API does **not** expose separate `startValue` and `endValue` properties — both bounds are passed via the `Value` array.

```html
<ejs-slider id="range" min="0" max="100" type="Range" value="@(new object[] { 30, 70 })">
</ejs-slider>
```

---

## Events

> The official `Syncfusion.EJ2.Inputs.Slider` page documents events as tag-helper string properties. Use the property name as a tag helper attribute with a JavaScript function name as the value.

| Event | Tag Helper Attr | Description |
|-------|-----------------|-------------|
| `Change` | `change` | Triggers whenever Slider value is changed while dragging the thumb |
| `Changed` | `changed` | Fires when the Slider value has changed (drag completed) |
| `Created` | `created` | Fires when the Slider is successfully created |
| `RenderedTicks` | `renderedTicks` | Triggers when the ticks are rendered on the Slider |
| `RenderingTicks` | `renderingTicks` | Triggers on rendering the ticks element in the Slider, which is used to customize the ticks labels dynamically |
| `TooltipChange` | `tooltipChange` | Triggers when the Slider tooltip value is changed |

### Event Usage Example

```html
<ejs-slider id="slider" min="0" max="100" value="50" type="Default"
            created="onCreated" change="onChange" changed="onChanged"
            tooltipChange="onTooltipChange">
</ejs-slider>

<script>
    function onCreated() {
        console.log('Slider created');
    }
    function onChange(args) {
        // Triggered while dragging
        console.log('Slider changing:', args.value);
    }
    function onChanged(args) {
        // Triggered when drag completes
        console.log('Slider changed:', args.value);
    }
    function onTooltipChange(args) {
        console.log('Tooltip value:', args.value);
    }
</script>
```

---

## Methods

> The official `Syncfusion.EJ2.Inputs.Slider` API page does not document a public Methods section. Component instance methods can be invoked via the underlying EJ2 widget reference (e.g. `document.getElementById('id').ej2_instances[0]`). For guaranteed behavior, prefer the documented properties and events above.

### Programmatic Usage

```javascript
const slider = document.getElementById('slider').ej2_instances[0];

// Read/Write current value
console.log(slider.value);
slider.value = 75;

// Read min/max
console.log(slider.min, slider.max);

// Set programmatic properties
slider.min = 10;
slider.max = 90;
```

---

## Examples

### Single-value Slider

```html
<ejs-slider id="single" min="0" max="100" value="50" type="Default" step="5">
</ejs-slider>
```

### Range Slider

```html
<ejs-slider id="range" min="0" max="100" type="Range" value="@(new object[] { 30, 70 })">
</ejs-slider>
```

### Vertical Orientation with Ticks

```html
<ejs-slider id="vertical" min="0" max="100" value="50"
            orientation="Vertical" showButtons="true" step="10">
</ejs-slider>
```

---

## See Also

- `range-slider-getting-started.md` — Quick start guide
- `range-slider-types-and-orientation.md` — Types and orientations
- `range-slider-events-and-methods.md` — Event handling
- `range-slider-styling.md` — Custom styling
- `range-slider-accessibility.md` — Accessibility features
