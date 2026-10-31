# Time Range – ASP.NET Core TimePicker

## Table of Contents
- [Overview](#overview)
- [Setting Min and Max](#setting-min-and-max)
- [Out-of-Range Behavior](#out-of-range-behavior)
- [Two-TimePicker Range Selection](#two-timepicker-range-selection)
- [Business Hours Pattern](#business-hours-pattern)

---

## Overview

The TimePicker allows restricting user selection to a specific time window using the `Min` and `Max` properties. This is useful for appointment scheduling, business hour inputs, or any scenario where only a certain time window is valid.

---

## Setting Min and Max

Use `Min` and `Max` to define the allowable time range. The `Min` value must always be less than `Max`.

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.value  = new DateTime(2022, 05, 07, 10, 00, 00);
    ViewBag.minVal = new DateTime(2022, 05, 07, 9, 00, 00);
    ViewBag.maxVal = new DateTime(2022, 05, 07, 11, 30, 00);
    return View();
}
```

**View:**
```cshtml
<ejs-timepicker id="timepicker"
    value="@ViewBag.value"
    min="@ViewBag.minVal"
    max="@ViewBag.maxVal">
</ejs-timepicker>
```

This allows selecting any time between 9:00 AM and 11:30 AM.

> **Note:** If `Min` or `Max` is changed via code-behind after initialization, update `Value` as well to ensure it stays within the new range.

---

## Out-of-Range Behavior

When an entered time falls outside the min/max range or is invalid:

- **StrictMode = false (default):** The value is accepted and shown in the input, but an `error` CSS class is applied to the wrapper to indicate the problem. Out-of-range values are stored as-is; invalid (unparseable) values result in `null`.
- **StrictMode = true:** Out-of-range values are automatically clamped to the `Min` or `Max` boundary. Invalid values revert to the previous valid value.

See `strict-mode.md` for details on StrictMode behavior.

---

## Two-TimePicker Range Selection

For start/end time scenarios (e.g., appointment booking), use two TimePicker components where:

1. The end TimePicker is initially **disabled**
2. Selecting a start time **enables** the end TimePicker and sets its `Min` to just after the start time
3. Optionally, a checkbox allows selecting a preset range (e.g., business hours)

```cshtml
<div class="control-section">
    <div class="timepicker-section">
        <div id="wrapper">
            <div class="tabs-wrap">
                <div class="wrap">
                    <ejs-timepicker id="start"
                        created="onStartCreate"
                        placeholder="Start Time"
                        change="onEnableEndTime">
                    </ejs-timepicker>
                </div>
            </div>
            <div class="tabs-wrap">
                <div class="wrap">
                    <ejs-timepicker id="end"
                        created="onEndCreate"
                        placeholder="End Time"
                        enabled="false">
                    </ejs-timepicker>
                </div>
            </div>
            <div class="tabs-wrap">
                <div class="wrap">
                    <ejs-checkbox id="dayRange"
                        label="Business Hours"
                        change="changeTime">
                    </ejs-checkbox>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        isStartTimeChange = true;
        endInput = document.getElementById('end');
    });

    function onEnableEndTime(args) {
        // Enables end time picker after start time is selected
        if (isStartTimeChange) {
            endTime.enabled = true;
            endTime.value = null;
            endInput.value = '';
            var value = new Date(+args.value);
            value.setMinutes(value.getMinutes() + endTime.step);
            endTime.min = value;
        } else {
            isStartTimeChange = true;
        }
    }

    function changeTime() {
        var element = document.getElementById('dayRange');
        isStartTimeChange = false;
        if (element.checked) {
            // Set business hours: 9:00 AM to 6:00 PM
            startTime.value = new Date('9/6/2017 9:00');
            endTime.enabled = true;
            endTime.value = new Date('9/6/2017 18:00');
            startTime.readonly = true;
            endTime.readonly = true;
        } else {
            endTime.value = null;
            startTime.value = null;
            endInput.value = '';
            startTime.readonly = false;
            endTime.readonly = false;
            endTime.enabled = false;
        }
    }

    function onStartCreate() {
        startTime = document.getElementById('start').ej2_instances[0];
    }

    function onEndCreate() {
        endTime = document.getElementById('end').ej2_instances[0];
    }
</script>
```

---

## Business Hours Pattern

The business hours pattern demonstrates a common scenario combining two TimePickers with a checkbox:

- **Unchecked state:** User manually selects start and end times; end is disabled until start is chosen
- **Checked state:** Both pickers are set to fixed business hours and become read-only
- **Unchecking:** Clears both values and resets the end picker to disabled

Key APIs used in this pattern:

| Property/Event | Component | Purpose |
|----------------|-----------|---------|
| `enabled` | End TimePicker | Disable until start is selected |
| `readonly` | Both | Lock values in business hours mode |
| `min` | End TimePicker | Restrict to times after start |
| `value` | Both | Set/clear the selected time |
| `step` | End TimePicker | Offset end min by one step |
| `change` | Start TimePicker | Detect start time selection |
| `created` | Both | Get component instances |
