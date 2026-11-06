# DateTimePicker – Date Time Masking

## Table of Contents
- [Enable Masked Input](#1-enable-masked-input)
- [Mask Based on Format](#2-mask-based-on-format)
- [Configure Mask Placeholder](#3-configure-mask-placeholder)
- [Localized Mask Placeholder](#4-localized-mask-placeholder)
- [Keyboard Navigation in Masked Input](#5-keyboard-navigation-in-masked-input)

---

## 1. Enable Masked Input

Use the `enableMask` property to activate the built-in date-time masking feature. When enabled, the input displays a structured placeholder that guides users through entering date and time segments:

```cshtml
<ejs-datetimepicker id="datetimepicker" enableMask="true"></ejs-datetimepicker>
```

By default, the mask pattern is derived from the component's current culture format (e.g., `MM/dd/yyyy hh:mm a` for `en-US`).

---

## 2. Mask Based on Format

When `format` is specified, the mask pattern is generated from that format string:

```cshtml
<ejs-datetimepicker id="datetimepicker"
    enableMask="true"
    format="yyyy-MM-dd HH:mm">
</ejs-datetimepicker>
```

The masked input will display segments like `year-month-day hour:minute` with navigable placeholders.

---

## 3. Configure Mask Placeholder

Use the `maskPlaceholder` complex property to customize the placeholder text for each date/time segment. By default, full English words are used (`day`, `month`, `year`, `hour`, `minute`, `second`):

```cshtml
<ejs-datetimepicker id="datetimepicker" enableMask="true">
    <e-datetimepicker-maskplaceholder
        day="D"
        month="M"
        year="Y"
        hour="H"
        minute="Min"
        second="S">
    </e-datetimepicker-maskplaceholder>
</ejs-datetimepicker>
```

---

## 4. Localized Mask Placeholder

For non-English cultures, load the locale translation for mask placeholders using `L10n.load()` in JavaScript:

```javascript
var L10n = ej.base.L10n;
L10n.load({
    'de': {
        'datetimepicker': {
            day: 'Tag',
            month: 'Monat',
            year: 'Jahr',
            hour: 'Stunde',
            minute: 'Minute',
            second: 'Sekunden'
        }
    }
});
```

```cshtml
<ejs-datetimepicker id="datetimepicker"
    enableMask="true"
    locale="de">
</ejs-datetimepicker>
```

---

## 5. Keyboard Navigation in Masked Input

| Key | Action |
|---|---|
| `Up / Down Arrow` | Increment or decrement the selected segment value |
| `Left / Right Arrow` | Move focus between date/time segments |
| `Tab` | Move to the next segment |

---

## API Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `enableMask` | `bool` | `false` | Enable masked date-time input |
| `maskPlaceholder` | `DateTimePickerMaskPlaceholder` | `null` | Custom placeholder per segment |

### MaskPlaceholder Sub-Properties

| Sub-Property | Type | Default | Description |
|---|---|---|---|
| `day` | `string` | `"day"` | Placeholder for day segment |
| `month` | `string` | `"month"` | Placeholder for month segment |
| `year` | `string` | `"year"` | Placeholder for year segment |
| `hour` | `string` | `"hour"` | Placeholder for hour segment |
| `minute` | `string` | `"minute"` | Placeholder for minute segment |
| `second` | `string` | `"second"` | Placeholder for second segment |
