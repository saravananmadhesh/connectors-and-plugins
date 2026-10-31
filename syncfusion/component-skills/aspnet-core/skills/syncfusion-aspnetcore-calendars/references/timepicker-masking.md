# Time Masking – ASP.NET Core TimePicker

## Table of Contents
- [Overview](#overview)
- [Enable Masked Input](#enable-masked-input)
- [Masked Input with Custom Format](#masked-input-with-custom-format)
- [Keyboard Navigation in Masked Mode](#keyboard-navigation-in-masked-mode)
- [Configure Mask Placeholder](#configure-mask-placeholder)
- [Localized Mask Placeholder](#localized-mask-placeholder)

---

## Overview

The TimePicker `EnableMask` property provides a built-in masked input mode. When enabled, the input displays a formatted mask pattern that guides the user to enter time values segment by segment (hour, minute, second). The mask pattern is automatically derived from the `Format` property (or the default culture format if no format is specified).

---

## Enable Masked Input

Set `EnableMask="true"` to activate masked input mode:

```cshtml
<ejs-timepicker id="timepicker" enableMask="true"></ejs-timepicker>
```

The mask will display based on the default culture format. For `en-US`, this renders as `hh:mm tt`.

---

## Masked Input with Custom Format

Provide a `Format` value alongside `EnableMask` to control the mask pattern:

```cshtml
<div class="control-section">
    <div class="control_wrapper">
        <div class="pane">
            <!-- Masked TimePicker without explicit format (uses culture default) -->
            <ejs-timepicker id="datepicker" enableMask="true"></ejs-timepicker>

            <!-- Masked TimePicker with explicit format -->
            <ejs-timepicker id="format" enableMask="true" format="HH:mm"></ejs-timepicker>
        </div>
    </div>
</div>
```

> The `format` value drives the structure of the mask. `HH:mm` produces a 24-hour mask; `hh:mm tt` produces a 12-hour mask with AM/PM.

---

## Keyboard Navigation in Masked Mode

When masked input is active, users can navigate between segments using the keyboard:

| Key | Action |
|-----|--------|
| `Up Arrow` | Increments the currently selected segment value |
| `Down Arrow` | Decrements the currently selected segment value |
| `Left Arrow` / `Right Arrow` | Moves selection between segments |
| `Tab` | Moves selection to the next segment |

---

## Configure Mask Placeholder

By default, the mask placeholder shows the full names of segments: `hour`, `minute`, `second`. Use the `MaskPlaceholder` property to customize these labels.

`MaskPlaceholder` accepts a `TimePickerMaskPlaceholder` object with `Hour`, `Minute`, and `Second` properties.

```cshtml
@{
    var maskPlaceholderValue = new Syncfusion.EJ2.Calendars.TimePickerMaskPlaceholder
    {
        Hour   = "h",
        Minute = "m",
        Second = "s"
    };
}
<div class="control-section">
    <div class="control_wrapper">
        <div class="pane">
            <!-- Default mask placeholder -->
            <ejs-timepicker id="timepicker" enableMask="true"></ejs-timepicker>

            <!-- Custom mask placeholder -->
            <ejs-timepicker id="format"
                enableMask="true"
                maskPlaceholder="@maskPlaceholderValue">
            </ejs-timepicker>
        </div>
    </div>
</div>
```

---

## Localized Mask Placeholder

When switching to a culture other than English, load locale text for mask placeholder labels using `L10n.load`:

```typescript
L10n.load({
    'de': {
        'timepicker': {
            hour:   'Stunde',
            minute: 'Minute',
            second: 'Sekunde'
        }
    }
});
```

This ensures the mask segment labels appear in the correct language when using a non-English locale.
