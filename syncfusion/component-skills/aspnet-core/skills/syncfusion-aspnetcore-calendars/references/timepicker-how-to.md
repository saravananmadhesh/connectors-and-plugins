# How-To Guides – ASP.NET Core TimePicker

## Table of Contents
- [Client-Side Validation Using FormValidator](#client-side-validation-using-formvalidator)
- [CSS Customization with Custom Class](#css-customization-with-custom-class)
- [Render TimePickerFor with Model Binding](#render-timepickerfor-with-model-binding)

---

## Client-Side Validation Using FormValidator

Use the [EJ2 FormValidator](https://ej2.syncfusion.com/documentation/form-validator) to perform client-side validation on a TimePicker field. This shows validation feedback when the field is empty on form submission or when focus is lost.

The key is to map the `name` attribute (auto-set by the TimePicker's `id`) to a validation rule in FormValidator's `rules` object.

**View:**
```cshtml
<form id="form-element" class="form-vertical">
    <div class="form-group">
        <div class="col-sm-6">
            <ejs-timepicker id="formTest"
                value="@ViewBag.value"
                cssClass="form-control">
            </ejs-timepicker>
        </div>
    </div>
</form>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var options = {
            rules: {
                // The name attribute value of the TimePicker input ('formTest') maps to the rule
                'formTest': { required: true }
            },
            customPlacement: function (inputElement, errorElement) {
                // Place error message after the input's grandparent element
                inputElement.parentElement.parentElement.appendChild(errorElement);
            }
        };
        var formObject = new ej.inputs.FormValidator('#form-element', options);
    });
</script>
```

**Behavior:**
- Empty submission triggers a required validation message
- Focus-out from an empty field also triggers the message
- The `customPlacement` callback controls where the error text renders in the DOM

---

## CSS Customization with Custom Class

Apply targeted CSS overrides using the `CssClass` property to style a specific TimePicker instance without affecting others on the page.

**View:**
```cshtml
<ejs-timepicker id="timepicker"
    placeholder="Select a time"
    cssClass="e-custom-style">
</ejs-timepicker>

<style>
    /* Customize input text color */
    .e-time-wrapper.e-custom-style #element {
        display: block;
        color: blue;
    }

    /* Customize floating label and icon color */
    .e-time-wrapper.e-custom-style .e-float-text.e-label-bottom,
    .e-time-wrapper.e-custom-style .e-input-group-icon.e-time-icon.e-icons {
        color: blue;
    }

    /* Customize input text selection highlight */
    .e-time-wrapper.e-custom-style.e-input-group::before,
    .e-time-wrapper.e-custom-style.e-input-group::after,
    .e-time-wrapper.e-custom-style.e-input-group .e-timepicker::selection {
        background: blue;
    }

    /* Customize popup list background */
    .e-timepicker.e-popup.e-custom-style .e-list-parent.e-ul,
    .e-timepicker.e-popup.e-custom-style .e-list-parent.e-ul .e-list-item {
        background-color: #c0ebff;
    }

    /* Hover state */
    .e-timepicker.e-popup.e-custom-style .e-list-parent.e-ul .e-list-item.e-hover,
    .e-timepicker.e-popup.e-custom-style .e-list-parent.e-ul .e-list-item.e-active.e-hover {
        background-color: blue;
        color: #fff;
    }

    /* Active selected item */
    .e-timepicker.e-popup.e-custom-style .e-list-parent.e-ul .e-list-item.e-active {
        color: #333;
        background-color: #fff;
    }
</style>
```

This pattern scopes all style changes to the component instance with `cssClass="e-custom-style"`.

---

## Render TimePickerFor with Model Binding

`ejs-timepicker` supports strongly-typed model binding using `ejs-for`. This renders a TimePicker bound to a model property and allows the selected value to be retrieved on form POST.

**Model (`TimePicker.cs`):**
```csharp
namespace EJ2CoreSampleBrowser.Controllers
{
    public class TimePicker
    {
        public DateTime? value { get; set; }
    }
}
```

**Controller:**
```csharp
// GET
public ActionResult Index()
{
    return View(new TimePicker());
}

// POST
[HttpPost]
public ActionResult Index(TimePicker model)
{
    // model.value contains the submitted time value
    return View(model);
}
```

**View:**
```cshtml
@model EJ2CoreSampleBrowser.Controllers.TimePicker

<form method="post">
    <ejs-timepicker id="timepickerFor" ejs-for="@Model.value"></ejs-timepicker>
    <div id="errorMessage">
        <span asp-validation-for="value"></span>
    </div>
    <div id="submitbutton">
        <ejs-button id="submitButton" content="Submit"></ejs-button>
    </div>
</form>
```

**Key points:**
- `ejs-for="@Model.value"` binds the TimePicker to the `value` property of the model
- `asp-validation-for="value"` displays server-side validation messages
- On POST, `model.value` holds the selected `DateTime?` value
- Combine with `[Required]` data annotation on the model property for server-side required validation
