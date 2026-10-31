# DatePicker — How-To Guides

## Table of Contents
- [Client-Side Validation with FormValidator](#client-side-validation-with-formvalidator)
- [DatePickerFor with Model Binding and Form POST](#datepickerfor-with-model-binding-and-form-post)
- [Set Placeholder](#set-placeholder)
- [Set Readonly](#set-readonly)
- [Disable the DatePicker](#disable-the-datepicker)
- [Open Popup on Input Focus](#open-popup-on-input-focus)
- [Prevent Popup from Closing](#prevent-popup-from-closing)
- [Customize the Day Header Format](#customize-the-day-header-format)

---

## Client-Side Validation with FormValidator

Use the EJ2 `FormValidator` to add required-field validation to a DatePicker.

```cshtml
<form id="form-element">
    <ejs-datepicker id="datepicker" name="date" placeholder="Select a date"></ejs-datepicker>
    <div id="error"></div>
    <button type="submit">Submit</button>
</form>
```

```javascript
var options = {
    rules: {
        date: { required: true }
    },
    customPlacement: function (inputElement, errorElement) {
        document.getElementById('error').appendChild(errorElement);
    }
};
var formObject = new ej.inputs.FormValidator('#form-element', options);
```

When the form is submitted or the DatePicker loses focus without a value, the validation message is shown in the `#error` element.

---

## DatePickerFor with Model Binding and Form POST

Use `<ejs-datepickerfor>` for strongly-typed model binding. The value is posted to the server via the model property name.

**Model:**

```csharp
public class BookingModel
{
    public DateTime? BookingDate { get; set; }
}
```

**Razor Page:**

```cshtml
@model BookingModel

<form method="post">
    <ejs-datepickerfor id="bookingDate"
        for="@Model.BookingDate"
        placeholder="Select booking date">
    </ejs-datepickerfor>
    <button type="submit">Book</button>
</form>
```

**Page Handler:**

```csharp
public IActionResult OnPost(BookingModel model)
{
    // model.BookingDate contains the selected date
    return Page();
}
```

---

## Set Placeholder

Use the `placeholder` property to display a short hint in the input:

```cshtml
<ejs-datepicker id="datepicker" placeholder="Enter date of birth"></ejs-datepicker>
```

---

## Set Readonly

Use `readonly="true"` to prevent user editing. The value is still visible and copyable, but the popup cannot be opened.

```cshtml
@{
    var value = new DateTime(2025, 6, 15);
}
<ejs-datepicker id="datepicker"
    value="@value"
    readonly="true">
</ejs-datepicker>
```

---

## Disable the DatePicker

Use `enabled="false"` to fully disable the DatePicker (non-interactive, visually greyed out):

```cshtml
<ejs-datepicker id="datepicker" enabled="false"></ejs-datepicker>
```

**Difference from readonly:**
- `readonly="true"` — shows value, prevents editing, still focusable.
- `enabled="false"` — fully disabled, not focusable, value not posted in a form.

---

## Open Popup on Input Focus

By default the popup opens only when the calendar icon is clicked. To open the popup whenever the input field receives focus, use the `openOnFocus` property:

```cshtml
<ejs-datepicker id="datepicker"
    openOnFocus="true"
    placeholder="Click to select date">
</ejs-datepicker>
```

Alternatively, call the `show()` method via JavaScript in the `focus` event handler:

```cshtml
<ejs-datepicker id="datepicker"
    focus="onFocus"
    placeholder="Select a date">
</ejs-datepicker>
```

```javascript
function onFocus(args) {
    var datepickerObj = document.getElementById('datepicker').ej2_instances[0];
    datepickerObj.show();
}
```

---

## Prevent Popup from Closing

To keep the calendar popup open after a date is selected (e.g., for multi-step selection logic), call `args.preventDefault()` in the `close` event:

```cshtml
<ejs-datepicker id="datepicker"
    close="onClose"
    placeholder="Select a date">
</ejs-datepicker>
```

```javascript
function onClose(args) {
    args.preventDefault(); // Popup remains open
}
```

---

## Customize the Day Header Format

Use the `dayHeaderFormat` property to control the format of day names in the calendar header row:

| Value | Display | Example |
|---|---|---|
| `Short` (default) | 2-char abbreviation | Su, Mo, Tu |
| `Narrow` | Single character | S, M, T |
| `Abbreviated` | 3-char abbreviation | Sun, Mon, Tue |
| `Wide` | Full day name | Sunday, Monday |

```cshtml
<ejs-datepicker id="datepicker" dayHeaderFormat="Narrow"></ejs-datepicker>
```

```cshtml
<ejs-datepicker id="datepicker" dayHeaderFormat="Wide"></ejs-datepicker>
```
