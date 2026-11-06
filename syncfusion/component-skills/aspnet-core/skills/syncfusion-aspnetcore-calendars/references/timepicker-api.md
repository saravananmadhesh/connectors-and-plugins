# API Reference – ASP.NET Core TimePicker

> **Source:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Calendars.TimePicker.html  
> **Namespace:** `Syncfusion.EJ2.Calendars`  
> **Assembly:** `Syncfusion.EJ2.dll`  
> **Tag Helper:** `<ejs-timepicker>`

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [CSS Classes](#css-classes)
- [MaskPlaceholder Sub-properties](#maskplaceholder-sub-properties)
- [Tag Helper Syntax Reference](#tag-helper-syntax-reference)

---

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `AllowEdit` | `bool` | `true` | Allows editing the time value directly in the input. When `false`, only popup selection is permitted. |
| `CssClass` | `string` | `null` | Root CSS class for appearance customization by overriding styles. |
| `Enabled` | `bool` | `true` | Specifies whether the component is enabled or disabled. |
| `EnableMask` | `bool` | `false` | Enables built-in masked input. When `true`, renders as a masked time input field. |
| `EnablePersistence` | `bool` | `false` | Persists the `Value` state across page reloads. |
| `EnableRtl` | `bool` | `false` | Enables right-to-left rendering for RTL languages (Arabic, Hebrew). |
| `FloatLabelType` | `FloatLabelType` | `Never` | Floating label behavior: `Never`, `Always`, or `Auto`. |
| `Format` | `string` | `null` | Time display format string. Defaults to culture format when `null`. |
| `FullScreenMode` | `bool` | `false` | Popup opens in full-screen on mobile/tablet devices. |
| `HtmlAttributes` | `object` | `null` | Additional HTML attributes to add to the underlying element. |
| `KeyConfigs` | `object` | `null` | Customizes keyboard shortcuts for the component. |
| `Locale` | `string` | `""` | Culture locale override (e.g., `"de"`, `"ar"`). Defaults to `en-US`. |
| `MaskPlaceholder` | `TimePickerMaskPlaceholder` | `null` | Custom placeholder text for each mask segment (hour, minute, second). |
| `Max` | `object` | `null` | Maximum selectable time. Must be greater than `Min`. |
| `Min` | `object` | `null` | Minimum selectable time. Must be less than `Max`. |
| `OpenOnFocus` | `bool` | `false` | Opens the popup when the input receives focus (not just on icon click). |
| `Placeholder` | `string` | `null` | Placeholder text shown in the empty input. |
| `Readonly` | `bool` | `false` | Puts the component in read-only mode; user cannot change the value. |
| `ScrollTo` | `object` | `null` | Sets the popup scroll position when no value is selected or value is not in the list. |
| `ServerTimezoneOffset` | `double` | `Double.NaN` | Server timezone offset (in hours) for processing the initial time value. |
| `ShowClearButton` | `bool` | `true` | Shows or hides the clear (×) icon. |
| `Step` | `double` | `30` | Time interval in minutes between popup list items. Default is 30. |
| `StrictMode` | `bool` | `false` | Enforces valid time within min/max range. Out-of-range values clamp to boundaries; invalid values revert. |
| `Value` | `object` | `null` | The current selected time value. Parsed using the culture-specific format. |
| `Width` | `string` | `null` | Width of the TimePicker component (also controls popup width). |
| `ZIndex` | `int` | `1000` | Z-index of the popup element. |

---

## Events

| Event | Signature | Trigger |
|-------|-----------|---------|
| `Blur` | `string` | Fires when the component loses focus. |
| `Change` | `string` | Fires when the selected value changes. |
| `Cleared` | `string` | Fires when the value is cleared via the clear button. |
| `Close` | `string` | Fires when the popup closes. |
| `Created` | `string` | Fires when the component finishes rendering. |
| `Destroyed` | `string` | Fires when the component is destroyed. |
| `Focus` | `string` | Fires when the component gains focus. |
| `ItemRender` | `string` | Fires for each popup list item during rendering. Use for custom item templates. |
| `Open` | `string` | Fires when the popup opens. |

**Event handler example:**
```cshtml
<ejs-timepicker id="timepicker"
    change="onTimeChange"
    open="onPopupOpen"
    close="onPopupClose">
</ejs-timepicker>

<script>
    function onTimeChange(args) {
        console.log('Selected time:', args.value);
    }
    function onPopupOpen(args) {
        console.log('Popup opened');
    }
    function onPopupClose(args) {
        console.log('Popup closed');
    }
</script>
```

---

## CSS Classes

| Class | Applied To |
|-------|-----------|
| `.e-time-wrapper` | TimePicker wrapper element |
| `.e-timepicker` | Input element and popup element |
| `.e-time-wrapper.e-timepicker` | Input element only |
| `.e-input-group-icon.e-time-icon` | Popup open button icon |
| `.e-float-text` | Floating label text element |
| `.e-popup` | Popup container |
| `.e-timepicker.e-popup` | TimePicker popup only |
| `.e-list-parent` | Popup `<ul>` element |
| `.e-timepicker.e-list-parent` | TimePicker popup `<ul>` only |
| `.e-list-item` | Popup list items (`<li>`) |
| `.e-hover` | Hovered list item |
| `.e-active` | Selected/active list item |

---

## MaskPlaceholder Sub-properties

Use `TimePickerMaskPlaceholder` when `EnableMask="true"` to customize segment labels:

| Sub-property | Type | Default | Description |
|-------------|------|---------|-------------|
| `Hour` | `string` | `"hour"` | Label for the hour segment |
| `Minute` | `string` | `"minute"` | Label for the minute segment |
| `Second` | `string` | `"second"` | Label for the second segment |

```cshtml
@{
    var maskPlaceholderValue = new Syncfusion.EJ2.Calendars.TimePickerMaskPlaceholder
    {
        Hour   = "h",
        Minute = "m",
        Second = "s"
    };
}
<ejs-timepicker id="timepicker"
    enableMask="true"
    maskPlaceholder="@maskPlaceholderValue">
</ejs-timepicker>
```

---

## Tag Helper Syntax Reference

Complete attribute list for the `<ejs-timepicker>` tag helper:

```cshtml
<ejs-timepicker id="timepicker"
    value="@Model.Value"
    min="@minTime"
    max="@maxTime"
    format="HH:mm"
    step="30"
    placeholder="Select a time"
    enabled="true"
    readonly="false"
    strictMode="false"
    enableMask="false"
    enableRtl="false"
    showClearButton="true"
    allowEdit="true"
    openOnFocus="false"
    fullScreenMode="false"
    enablePersistence="false"
    floatLabelType="Auto"
    cssClass="my-custom-class"
    locale="en-US"
    width="250px"
    zIndex="1000"
    created="onCreated"
    change="onChange"
    open="onOpen"
    close="onClose"
    focus="onFocus"
    blur="onBlur"
    cleared="onCleared"
    itemRender="onItemRender">
</ejs-timepicker>
```
