# DateRangePicker — How-To Guides

## Table of Contents
- [DateRangePickerFor — Model Binding and Form POST](#daterangepickerfor--model-binding-and-form-post)
- [Set a Placeholder](#set-a-placeholder)
- [Disable the DateRangePicker](#disable-the-daterangepicker)
- [Customize the Day Header Format](#customize-the-day-header-format)
- [Customize Appearance with cssClass](#customize-appearance-with-cssclass)

---

## DateRangePickerFor — Model Binding and Form POST

Use `ejs-for` on `<ejs-daterangepicker>` to bind a `DateTime?[]` model property. Index 0 = start date, index 1 = end date.

**Model:**

```csharp
using System.ComponentModel.DataAnnotations;

public class DateRangeModel
{
    [Required(ErrorMessage = "Please select a date range")]
    public DateTime?[] value { get; set; }
}
```

**Controller:**

```csharp
// GET
public ActionResult Index()
{
    var model = new DateRangeModel
    {
        value = new DateTime?[]
        {
            new DateTime(2020, 03, 03),
            new DateTime(2021, 09, 03)
        }
    };
    return View(model);
}

// POST
[HttpPost]
public ActionResult Index(DateRangeModel model)
{
    var startDate = model.value[0];  // Start date
    var endDate   = model.value[1];  // End date
    // process...
    return View(model);
}
```

**View:**

```cshtml
@model DateRangeModel

<form method="post">
    <ejs-daterangepicker id="daterangepickerFor" ejs-for="@Model.value">
    </ejs-daterangepicker>
    <div>
        <span asp-validation-for="value"></span>
    </div>
    <ejs-button id="submitButton" content="Submit"></ejs-button>
</form>
```

---

## Set a Placeholder

Use the `placeholder` property to display a short hint in the input field before any range is selected.

```cshtml
<ejs-daterangepicker id="daterangepicker"
    placeholder="Select a date range">
</ejs-daterangepicker>
```

With a floating label that floats on focus:

```cshtml
<ejs-daterangepicker id="daterangepicker"
    placeholder="Select a date range"
    floatLabelType="Auto">
</ejs-daterangepicker>
```

---

## Disable the DateRangePicker

Set `enabled="false"` to completely inactivate the DateRangePicker. This prevents all user interactions and excludes the component's value from form POST.

```cshtml
<ejs-daterangepicker id="daterangepicker"
    enabled="false"
    placeholder="Select a date range">
</ejs-daterangepicker>
```

**Disable from the controller (conditional):**

```csharp
public ActionResult Index()
{
    ViewBag.IsEnabled = false;
    return View();
}
```

```cshtml
<ejs-daterangepicker id="daterangepicker"
    enabled="@ViewBag.IsEnabled"
    placeholder="Select a date range">
</ejs-daterangepicker>
```

---

## Customize the Day Header Format

Use the `dayHeaderFormat` property to change how day names appear in the calendar header columns.

| Value | Display Example | Description |
|---|---|---|
| `Short` (default) | Su | Short 2-character name |
| `Narrow` | S | Single character |
| `Abbreviated` | Sun | 3-character abbreviation |
| `Wide` | Sunday | Full day name |

```cshtml
<!-- Narrow format: single character per day -->
<ejs-daterangepicker id="daterangepicker"
    dayHeaderFormat="Narrow"
    placeholder="Select a Range">
</ejs-daterangepicker>
```

```cshtml
<!-- Abbreviated format: 3-character day names -->
<ejs-daterangepicker id="daterangepicker"
    dayHeaderFormat="Abbreviated"
    placeholder="Select a Range">
</ejs-daterangepicker>
```

```cshtml
<!-- Wide format: full day names -->
<ejs-daterangepicker id="daterangepicker"
    dayHeaderFormat="Wide"
    placeholder="Select a Range">
</ejs-daterangepicker>
```

---

## Customize Appearance with cssClass

Use `cssClass` to apply a root-level CSS class that scopes style overrides to this instance. This prevents styles from affecting other components on the page.

**Available CSS classes for targeting:**

| Class Name | Description |
|---|---|
| `e-date-range-wrapper` | Applied to the DateRangePicker wrapper |
| `e-range-icon` | Applied to the DateRangePicker icon |
| `e-popup` | Applied to the popup wrapper |
| `e-calendar` | Applied to both calendar elements |
| `e-right-calendar` | Applied to the right calendar element |
| `e-left-calendar` | Applied to the left calendar element |
| `e-start-label` | Applied to the start label in the popup |
| `e-end-calendar` | Applied to the end label in the popup |
| `e-day-span` | Applied to the day span label in the popup |
| `e-footer` | Applied to footer elements in the popup |
| `e-apply` | Applied to the Apply button in the footer |
| `e-cancel` | Applied to the Cancel button in the footer |
| `e-header` | Applied to the calendar header |
| `e-title` | Applied to the calendar title |
| `e-icon-container` | Applied to the previous/next icon container |
| `e-prev` | Applied to the previous icon |
| `e-next` | Applied to the next icon |
| `e-weekend` | Applied to weekend date cells |
| `e-other-month` | Applied to other month date cells |
| `e-day` | Applied to each day cell |
| `e-selected` | Applied to selected date cells |
| `e-disabled` | Applied to disabled date cells |

**Example — Custom accent color:**

```cshtml
<ejs-daterangepicker id="daterangepicker"
    cssClass="e-custom-range"
    placeholder="Select a Range">
</ejs-daterangepicker>

<style>
    /* Custom wrapper border */
    .e-custom-range.e-date-range-wrapper {
        border-color: #6200ea;
    }
    /* Custom icon color */
    .e-custom-range .e-range-icon {
        color: #6200ea;
    }
    /* Custom selected cell background */
    .e-custom-range .e-calendar .e-content td.e-selected span.e-day {
        background-color: #6200ea;
    }
</style>
```
