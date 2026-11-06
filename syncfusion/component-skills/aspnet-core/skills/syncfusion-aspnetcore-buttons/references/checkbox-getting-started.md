# Getting Started – ASP.NET Core Checkbox

Set up an ASP.NET Core project and render a basic Syncfusion Checkbox component.

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#install-nuget-package)
- [Register Tag Helper](#register-tag-helper)
- [Add Stylesheet and Script](#add-stylesheet-and-script)
- [Register Script Manager](#register-script-manager)
- [Render a Basic Checkbox](#render-a-basic-checkbox)
- [Enable Ripple Effect](#enable-ripple-effect)
- [Running the Application](#running-the-application)

---

## Prerequisites

- ASP.NET Core 6.0 or later
- Visual Studio 2022 or later
- Basic knowledge of Razor Pages or MVC

---

## Install NuGet Package

Open Package Manager Console and run:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

---

## Register Tag Helper

Add the tag helper directive to `~/Pages/_ViewImports.cshtml` (Razor Pages) or `~/Views/_ViewImports.cshtml` (MVC):

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## Add Stylesheet and Script References

In `~/Pages/Shared/_Layout.cshtml` (or `~/Views/Shared/_Layout.cshtml`), add CDN references:

**Inside `<head>` tag:**
```cshtml
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
</head>
```

**At the end of `<body>` tag:**
```cshtml
<body>
    <!-- Page content -->
    
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
    <ejs-scripts></ejs-scripts>
</body>
```

---

## Register Script Manager

Add `<ejs-scripts>` at the end of the body in `_Layout.cshtml` (shown above).

---

## Render a Basic Checkbox

In your Razor page or view, render a checkbox using the `<ejs-checkbox>` tag helper:

**Razor Page (.cshtml):**
```cshtml
<ejs-checkbox id="default" label="Default Checkbox"></ejs-checkbox>
```

**Checkbox with Initial Checked State:**
```cshtml
<ejs-checkbox id="checked" label="Checked by Default" checked="true"></ejs-checkbox>
```

**Multiple Checkboxes:**
```cshtml
<ul>
    <li><ejs-checkbox id="option1" label="Option 1"></ejs-checkbox></li>
    <li><ejs-checkbox id="option2" label="Option 2"></ejs-checkbox></li>
    <li><ejs-checkbox id="option3" label="Option 3"></ejs-checkbox></li>
</ul>
```

---

## Enable Ripple Effect

To add Material-style ripple effect on checkbox interaction, add the following script to your page:

```cshtml
<ejs-checkbox id="rippleCheckbox" label="Ripple Effect Checkbox"></ejs-checkbox>

<script>
    // Enable ripple effect globally
    Syncfusion.enableRipple(true);
</script>
```

---

## Running the Application

1. Build the solution: `Ctrl+Shift+B`
2. Run the application: `Ctrl+F5`
3. Navigate to your page to see the checkbox component rendered

---

## See Also

- [Checkbox States and Features](checkbox-features-and-state.md)
- [Checkbox Label and Size](checkbox-label-and-size.md)
- [Checkbox Customization](checkbox-customization.md)
- [Checkbox API Reference](checkbox-api.md)
- [Checkbox Accessibility](checkbox-accessibility.md)

## Register Script Manager

At the end of `<body>`:

```cshtml
<ejs-scripts></ejs-scripts>
```

---

## Render a Basic Checkbox

**View:**
```cshtml
<ejs-checkbox id="default"></ejs-checkbox>
```

---

## Checkbox with Label

```cshtml
<ejs-checkbox id="labeled" label="I agree to the terms"></ejs-checkbox>
```

---

## Running the Application

Press **F5** or run `dotnet run`. The checkbox renders and is interactive.

---

## See Also

- [Checkbox Features and State](checkbox-features-and-state.md)
- [Checkbox Customization](checkbox-customization.md)
- [Checkbox API](checkbox-api.md)
