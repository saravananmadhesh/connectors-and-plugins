# DatePicker — Date Masking

## Table of Contents
- [Overview](#overview)
- [Enable Masked Input](#enable-masked-input)
- [Mask Pattern and Format](#mask-pattern-and-format)
- [Keyboard Navigation in Masked Segments](#keyboard-navigation-in-masked-segments)
- [Custom Mask Placeholder](#custom-mask-placeholder)
- [Localized Mask Placeholder](#localized-mask-placeholder)

---

## Overview

The DatePicker supports a built-in masked input mode via the `enableMask` property. When enabled, the input renders a segment-based date mask derived from the `format` property, guiding users to enter date parts individually.

---

## Enable Masked Input

```cshtml
<ejs-datepicker id="datepicker" enableMask="true"></ejs-datepicker>
```

With the default culture format (`M/d/yyyy`), the mask renders as `MM/DD/YYYY` with placeholder segments.

---

## Mask Pattern and Format

The mask pattern is automatically derived from the `format` value. If no `format` is set, the mask is based on the current culture's default format.

**Masked input with custom format:**

```cshtml
<ejs-datepicker id="datepicker"
    enableMask="true"
    format="dd/MM/yyyy">
</ejs-datepicker>
```

The mask becomes `DD/MM/YYYY`, with each segment independently editable.

---

## Keyboard Navigation in Masked Segments

| Key | Action |
|---|---|
| `Up Arrow` | Increment the selected date segment |
| `Down Arrow` | Decrement the selected date segment |
| `Left Arrow` | Move focus to the previous segment |
| `Right Arrow` | Move focus to the next segment |
| `Tab` | Move focus to the next segment |

---

## Custom Mask Placeholder

Use the `maskPlaceholder` property (via `<e-datepicker-maskplaceholder>`) to change the default placeholder characters shown for each date segment.

```cshtml
<ejs-datepicker id="datepicker" enableMask="true">
    <e-datepicker-maskplaceholder day="D" month="M" year="Y"></e-datepicker-maskplaceholder>
</ejs-datepicker>
```

Default placeholder labels are: `day`, `month`, `year` (full words in English).

---

## Localized Mask Placeholder

When using a culture other than English, load the locale translations for the mask placeholder via `L10n.load` in JavaScript before initializing the component.

```html
<script>
    var L10n = ej.base.L10n;
    L10n.load({
        'de': {
            'datepicker': {
                day: 'Tag',
                month: 'Monat',
                year: 'Jahr'
            }
        }
    });
</script>
```

```cshtml
<ejs-datepicker id="datepicker"
    enableMask="true"
    locale="de">
</ejs-datepicker>
```

The mask placeholder now shows `Tag`, `Monat`, `Jahr` for German culture.
