# DateRangePicker — Customization

## Table of Contents
- [Day Cell Customization](#day-cell-customization)
- [First Day of Week](#first-day-of-week)
- [Day Header Format](#day-header-format)
- [Calendar View Configuration](#calendar-view-configuration)
- [Week Number Display](#week-number-display)
- [Presets Configuration](#presets-configuration)
- [Open on Focus](#open-on-focus)
- [Readonly Mode](#readonly-mode)
- [Show Clear Button](#show-clear-button)
- [Allow Edit](#allow-edit)
- [Enable Persistence](#enable-persistence)

---

## Day Cell Customization

Use the `renderDayCell` event to customize individual calendar day cells. Set `args.isDisabled = true` to disable a cell, or modify `args.element` for DOM-level changes.

**Disable weekends (Saturday and Sunday):**

```cshtml
<ejs-daterangepicker id="daterangepicker"
    renderDayCell="onRenderCell"
    cssClass="e-custom-style"
    placeholder="Select a Range">
</ejs-daterangepicker>

<script>
    function onRenderCell(args) {
        // args.date.getDay(): 0 = Sunday, 6 = Saturday
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }
</script>
```

**Add a custom CSS class to specific dates:**

```cshtml
<ejs-daterangepicker id="daterangepicker"
    renderDayCell="onRenderCell"
    placeholder="Select a Range">
</ejs-daterangepicker>

<script>
    function onRenderCell(args) {
        if (args.date.getDate() === 15) {
            args.element.classList.add('e-highlight');
        }
    }
</script>
```

---

## First Day of Week

By default, the first day of the week in `en-US` is Sunday (0). Use `firstDayOfWeek` to change this.

| Value | Day |
|---|---|
| 0 | Sunday |
| 1 | Monday |
| 2 | Tuesday |
| 3 | Wednesday |
| 4 | Thursday |
| 5 | Friday |
| 6 | Saturday |

```cshtml
<!-- Start week on Monday -->
<ejs-daterangepicker id="daterangepicker"
    firstDayOfWeek="1"
    placeholder="Select a Range">
</ejs-daterangepicker>
```

---

## Day Header Format

Use `dayHeaderFormat` to change how day names appear in the calendar column headers.

| Value | Example | Description |
|---|---|---|
| `Short` (default) | Su | Short 2-character day name |
| `Narrow` | S | Single character |
| `Abbreviated` | Sun | 3-character abbreviation |
| `Wide` | Sunday | Full day name |

```cshtml
<ejs-daterangepicker id="daterangepicker"
    dayHeaderFormat="Abbreviated"
    placeholder="Select a Range">
</ejs-daterangepicker>
```

---

## Calendar View Configuration

Control the initial view and the deepest navigation level using `start` and `depth`.

- `start` — The view shown when the calendar popup first opens (`Month`, `Year`, `Decade`).
- `depth` — The deepest view the user can navigate to. Must be ≤ `start`.

```cshtml
<!-- Open at Year view, restrict navigation to Year (no month drill-down) -->
<ejs-daterangepicker id="daterangepicker"
    start="Year"
    depth="Year"
    placeholder="Select a year range">
</ejs-daterangepicker>
```

```cshtml
<!-- Open at Decade view, allow drill-down to Year only -->
<ejs-daterangepicker id="daterangepicker"
    start="Decade"
    depth="Year"
    placeholder="Select a range">
</ejs-daterangepicker>
```

---

## Week Number Display

Show ISO week numbers in the calendar month view:

```cshtml
<ejs-daterangepicker id="daterangepicker"
    weekNumber="true"
    placeholder="Select a Range">
</ejs-daterangepicker>
```

Control the week numbering rule with `weekRule`:

| Value | Description |
|---|---|
| `FirstDay` (default) | Week containing the first day of the year |
| `FirstFullWeek` | First full 7-day week of the year |
| `FirstFourDayWeek` | First week with at least 4 days (ISO 8601) |

```cshtml
<ejs-daterangepicker id="daterangepicker"
    weekNumber="true"
    weekRule="FirstFourDayWeek"
    placeholder="Select a Range">
</ejs-daterangepicker>
```

---

## Presets Configuration

Use `e-daterangepicker-presets` to define preset date ranges shown in the popup for quick selection.

```cshtml
<ejs-daterangepicker id="daterangepicker" placeholder="Select a Range">
    <e-daterangepicker-presets>
        <e-daterangepicker-preset label="Last 7 Days"
            start="@DateTime.Today.AddDays(-6)"
            end="@DateTime.Today">
        </e-daterangepicker-preset>
        <e-daterangepicker-preset label="Last 30 Days"
            start="@DateTime.Today.AddDays(-29)"
            end="@DateTime.Today">
        </e-daterangepicker-preset>
        <e-daterangepicker-preset label="This Month"
            start="@new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1)"
            end="@DateTime.Today">
        </e-daterangepicker-preset>
        <e-daterangepicker-preset label="Last Month"
            start="@new DateTime(DateTime.Today.Year, DateTime.Today.Month - 1, 1)"
            end="@new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1).AddDays(-1)">
        </e-daterangepicker-preset>
    </e-daterangepicker-presets>
</ejs-daterangepicker>
```

Each preset has:
- `label` — Display text for the preset button.
- `start` — Preset start date (`DateTime`).
- `end` — Preset end date (`DateTime`).

---

## Open on Focus

By default, the popup opens when the user clicks the calendar icon. Set `openOnFocus="true"` to open the popup when the input field receives focus.

```cshtml
<ejs-daterangepicker id="daterangepicker"
    openOnFocus="true"
    placeholder="Select a Range">
</ejs-daterangepicker>
```

---

## Readonly Mode

Set `readonly="true"` to display the selected range without allowing the user to edit it.

```cshtml
<ejs-daterangepicker id="daterangepicker"
    startDate="@ViewBag.startDate"
    endDate="@ViewBag.endDate"
    readonly="true">
</ejs-daterangepicker>
```

---

## Show Clear Button

The clear button (✕) is shown by default. Hide it with `showClearButton="false"`.

```cshtml
<ejs-daterangepicker id="daterangepicker"
    showClearButton="false"
    placeholder="Select a Range">
</ejs-daterangepicker>
```

---

## Allow Edit

By default, the user can type directly in the input field. Set `allowEdit="false"` to restrict selection to popup-only — the input becomes read-only while still allowing popup-based selection.

```cshtml
<ejs-daterangepicker id="daterangepicker"
    allowEdit="false"
    placeholder="Select a Range">
</ejs-daterangepicker>
```

---

## Enable Persistence

When `enablePersistence="true"`, the selected `startDate`, `endDate`, and `value` persist across page reloads using browser local storage.

```cshtml
<ejs-daterangepicker id="daterangepicker"
    enablePersistence="true"
    placeholder="Select a Range">
</ejs-daterangepicker>
```
