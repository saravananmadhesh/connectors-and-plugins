# Switch API Reference

**Namespace:** `Syncfusion.EJ2.Buttons`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Official Docs:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Buttons.Switch.html

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [Tag Helper vs MVC HTML Helper Syntax](#tag-helper-vs-mvc-html-helper-syntax)

---

## Properties

### BeforeChange
**Type:** `string` | **Default:** `null`

This event is triggered before the state of the switch is changed. Assign a JavaScript function name. Inside the handler, set `args.cancel = true` to prevent the state change.

```cshtml
<ejs-switch id="switch1" BeforeChange="onBeforeChange"></ejs-switch>
```

---

### Change
**Type:** `string` | **Default:** `null`

Triggers when the Switch state has been changed by user interaction. Assign a JavaScript function name.

```cshtml
<ejs-switch id="switch1" Change="onChange"></ejs-switch>
```

---

### Checked
**Type:** `bool` | **Default:** `false`

Specifies whether the Switch is in the checked (ON) state. When set to `true`, the switch renders in the ON position.

```cshtml
<ejs-switch id="switch1" checked="true"></ejs-switch>
```

MVC:
```cshtml
@Html.EJS().Switch("switch1").Checked(true).Render()
```

---

### Created
**Type:** `string` | **Default:** `null`

Triggers once the component rendering is completed. Assign a JavaScript function name.

```cshtml
<ejs-switch id="switch1" Created="onCreated"></ejs-switch>
```

---

### CssClass
**Type:** `string` | **Default:** `""`

Adds one or more custom CSS class names to the Switch wrapper element. Use this to apply custom styles or size variants (e.g., `e-small`).

```cshtml
<ejs-switch id="switch1" cssClass="e-small"></ejs-switch>
```

MVC:
```cshtml
@Html.EJS().Switch("switch1").CssClass("e-small").Render()
```

**Built-in supported value:**
- `e-small` — Renders a smaller switch

---

### Disabled
**Type:** `bool` | **Default:** `false`

Specifies whether the Switch is in the disabled state. When `true`, the switch cannot be interacted with and its value is excluded from form submissions.

```cshtml
<ejs-switch id="switch1" disabled="true"></ejs-switch>
```

MVC:
```cshtml
@Html.EJS().Switch("switch1").Disabled(true).Render()
```

---

### EnablePersistence
**Type:** `bool` | **Default:** `false`

Enables or disables persisting the component's state between page reloads using browser `localStorage`. When `true`, the switch remembers its last checked state after a page reload.

```cshtml
<ejs-switch id="switch1" enablePersistence="true"></ejs-switch>
```

MVC:
```cshtml
@Html.EJS().Switch("switch1").EnablePersistence(true).Render()
```

---

### EnableRtl
**Type:** `bool` | **Default:** `false`

Enables right-to-left (RTL) rendering for the component. Useful for locales that read right-to-left (e.g., Arabic, Hebrew).

```cshtml
<ejs-switch id="switch1" enableRtl="true"></ejs-switch>
```

MVC:
```cshtml
@Html.EJS().Switch("switch1").EnableRtl(true).Render()
```

---

### HtmlAttributes
**Type:** `object` | **Default:** `null`

Allows adding additional HTML attributes (e.g., `title`, `data-*`, `aria-*`) to the underlying input element. If you configure both a property and its equivalent HTML attribute, the property value takes precedence.

```cshtml
<ejs-switch id="switch1" htmlAttributes='new { title = "Toggle Setting" }'></ejs-switch>
```

---

### Locale
**Type:** `string` | **Default:** `""`

Overrides the global culture and localization value for this component. The default global culture is `en-US`.

```cshtml
<ejs-switch id="switch1" locale="ar"></ejs-switch>
```

MVC:
```cshtml
@Html.EJS().Switch("switch1").Locale("ar").Render()
```

---

### Name
**Type:** `string` | **Default:** `""`

Defines the `name` attribute of the Switch input element. Used to reference form data (the switch value) after the form is submitted. Groups switches in a form.

```cshtml
<ejs-switch id="switch1" name="notifications"></ejs-switch>
```

MVC:
```cshtml
@Html.EJS().Switch("switch1").Name("notifications").Render()
```

---

### OffLabel
**Type:** `string` | **Default:** `""`

Specifies the text displayed on the Switch bar when it is in the **unchecked (OFF)** state.

```cshtml
<ejs-switch id="switch1" offLabel="OFF"></ejs-switch>
```

MVC:
```cshtml
@Html.EJS().Switch("switch1").OffLabel("OFF").Render()
```

> **Note:** Text labels are not supported in Material themes and long custom text is not supported.

---

### OnLabel
**Type:** `string` | **Default:** `""`

Specifies the text displayed on the Switch bar when it is in the **checked (ON)** state.

```cshtml
<ejs-switch id="switch1" onLabel="ON"></ejs-switch>
```

MVC:
```cshtml
@Html.EJS().Switch("switch1").OnLabel("ON").Render()
```

> **Note:** Text labels are not supported in Material themes and long custom text is not supported.

---

### Value
**Type:** `string` | **Default:** `""`

Defines the `value` attribute of the Switch. This is the form data posted to the server when the form is submitted and the switch is in the checked state.

```cshtml
<ejs-switch id="switch1" name="wifi" value="enabled" checked="true"></ejs-switch>
```

MVC:
```cshtml
@Html.EJS().Switch("switch1").Name("wifi").Value("enabled").Checked(true).Render()
```

---

## Events

| Event | Trigger | `args` properties |
|---|---|---|
| `BeforeChange` | Before the switch state changes | `args.cancel` (set `true` to prevent), `args.checked` (new state) |
| `Change` | After the switch state changes | `args.checked` (current state: `true`/`false`) |
| `Created` | Once the component renders | — |

---

## Tag Helper vs MVC HTML Helper Syntax

| Property | Tag Helper Attribute | MVC HTML Helper Method |
|---|---|---|
| `Checked` | `checked="true"` | `.Checked(true)` |
| `CssClass` | `cssClass="e-small"` | `.CssClass("e-small")` |
| `Disabled` | `disabled="true"` | `.Disabled(true)` |
| `EnablePersistence` | `enablePersistence="true"` | `.EnablePersistence(true)` |
| `EnableRtl` | `enableRtl="true"` | `.EnableRtl(true)` |
| `Locale` | `locale="ar"` | `.Locale("ar")` |
| `Name` | `name="fieldName"` | `.Name("fieldName")` |
| `OffLabel` | `offLabel="OFF"` | `.OffLabel("OFF")` |
| `OnLabel` | `onLabel="ON"` | `.OnLabel("ON")` |
| `Value` | `value="on"` | `.Value("on")` |
| `HtmlAttributes` | `htmlAttributes='new { ... }'` | `.HtmlAttributes(new { ... })` |
| `BeforeChange` | `BeforeChange="fnName"` | `.BeforeChange("fnName")` |
| `Change` | `Change="fnName"` | `.Change("fnName")` |
| `Created` | `Created="fnName"` | `.Created("fnName")` |
