# Form Actions in ASP.NET MVC Form Renderer component

This section explains the form actions that can be performed in the Form Renderer control.

Forms typically include buttons to perform common actions. A submit button submits the form, a reset button restores the form to its initial state, and a plain button can be used to execute custom logic. This page explains how to define each button as a field in `properties` and describes the events raised when users click them.

A button is a regular field in `properties` with `type: "button"`. The kind of button is decided by `buttonType`:

| `buttonType` | What it does | Event raised |
| --- | --- | --- |
| `"submit"` | Validates the form. Raises `submit` if validation passes. | `submit` |
| `"reset"` | Resets every field. | — (native form reset, no event) |
| `"button"` | Plain click button. | `buttonClick` |

## Submitting the form

The form created with the Form Renderer control can be submitted when a submit button is defined in the form schema. To enable form submission, declare a button field in `properties` with `buttonType: "submit"` and include it in the `layout` array.

```csharp
new SubmitButtonProperty
{
    Id         = "submit_button_initial",
    Name       = "defaultFormsubmit",
    Type       = "button",
    Label      = "Submit",
    ButtonType = "submit",
    Widget     = "button",
    Size       = "Bigger"
}
```

When the user clicks the submit button, the renderer validates the form. If validation passes, the `submit` event fires with the current form data and an `isValid` flag.

### MVC example

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.FormRenderer

@Html.EJS().FormRenderer("form-renderer-submit")
    .Schema((ViewData["formSchema"]))
    .Submit("onSubmit")
    .Render()

<script>
    function onSubmit(args) {
        console.log(args.data, args.isValid);
    }
</script>
```

The corresponding schema is built on the server and passed through `ViewData["formSchema"]` as in the getting-started topic. The `submit` event receives the current form data and the validation result.

## Resetting the form

A reset button restores the form to its initial state. To enable form reset, declare a button field in `properties` with `buttonType: "reset"` and include it in the `layout` array.

```csharp
new ButtonProperty
{
    Id         = "reset_button_initial",
    Name       = "defaultFormreset",
    Type       = "button",
    Label      = "Reset",
    ButtonType = "reset",
    Widget     = "button",
    Size       = "Bigger"
}
```

The `reset` button does not raise an event. Clicking it triggers the browser's native form-reset behavior, which restores every field to its initial value.

## Adding custom click actions

A plain click button is a field in `properties` with `buttonType: "button"`. Use it for any custom logic that should run when the button is clicked.

```csharp
new ButtonProperty
{
    Id         = "cancel_button_initial",
    Name       = "defaultFormcancel",
    Type       = "button",
    Label      = "Cancel",
    ButtonType = "button",
    Widget     = "button",
    Size       = "Bigger"
}
```

When the user clicks a `buttonType: "button"` button, the renderer raises the `buttonClick` event.

```cshtml
@Html.EJS().FormRenderer("form-renderer-button-click")
    .Schema((ViewData["formSchema"]))
    .ButtonClick("onButtonClick")
    .Render()

<script>
    function onButtonClick(args) {
        console.log(args.fieldName, args.label, args.event);
    }
</script>
```

## Detecting the field change

When the value of any field changes, the renderer raises the `change` event. Typing into a field, picking a date, toggling a switch, and program-driven changes from expression evaluation can all raise it.

The event argument includes the changed field name, label, value, and the current data model. In MVC, wire the event through the HTML helper method such as `.Change("onChange")`.

```cshtml
@Html.EJS().FormRenderer("form-renderer-change")
    .Schema((ViewData["formSchema"]))
    .Change("onChange")
    .Render()

<script>
    function onChange(args) {
        console.log(args.fieldName, args.label, args.value, args.dataModel);
    }
</script>
```

`change` does not fire for layout-only nodes (`panel`, `table`, `tabs`, `card`), presentation-only widgets (`staticHtml`, `message`), or buttons. Buttons instead raise `submit` or `buttonClick` according to their action type; reset does not raise an event.

## Key guidance

Use individual button fields for standalone actions or `buttonsGroups` when related actions should be presented together. Use `submit` for final validation, `reset` for clearing user input, and `button` for custom behavior such as navigation or API requests. Keep action fields in the `layout` array so they render in the form.
