# Getting Started – ASP.NET Core Button

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#install-nuget-package)
- [Register Tag Helper](#register-tag-helper)
- [Add Stylesheet and Script](#add-stylesheet-and-script)
- [Register Script Manager](#register-script-manager)
- [Render a Basic Button](#render-a-basic-button)
- [Enabling Ripple Effects](#enabling-ripple-effects)
- [Click Handling](#click-handling)
- [Using the Button in Forms](#using-the-button-in-forms)

---

## Prerequisites

- ASP.NET Core web application (Razor Pages or MVC)
- Visual Studio 2022 or later
- [System requirements for ASP.NET Core controls](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements)

---

## Install NuGet Package

Open the NuGet Package Manager in Visual Studio (**Tools → NuGet Package Manager → Manage NuGet Packages for Solution**), search for **Syncfusion.EJ2.AspNet.Core**, and install it.

Or use the Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

> The package depends on **Newtonsoft.Json** (JSON serialization) and **Syncfusion.Licensing** (license key validation).

---

## Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` (Razor Pages) or `~/Views/_ViewImports.cshtml` (MVC) and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

This allows all Syncfusion tag helpers (e.g., `<ejs-button>`, `<ejs-scripts>`) to be recognized throughout your project.

---

## Add Stylesheet and Script

In `~/Pages/Shared/_Layout.cshtml` (or `~/Views/Shared/_Layout.cshtml`), add inside `<head>`:

```cshtml
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

> Replace `{{ site.ej2version }}` with the actual EJ2 version number (e.g., `26.2.4`).
>
> **Available themes:** `fluent.css`, `bootstrap5.css`, `material.css`, `material3.css`, `tailwind.css`, `highcontrast.css`

---

## Register Script Manager

At the end of `<body>` in the layout file, register the Syncfusion Script Manager:

```cshtml
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

---

## Render a Basic Button

**Tag Helper** (`~/Pages/Index.cshtml`):
```cshtml
<ejs-button id="button" content="Default Button"></ejs-button>
```

This renders a minimal button with default styling.

---

## Enabling Ripple Effects

Ripple effects (Material Design style animations on click) are enabled globally through configuration. Create a JavaScript initialization script in your layout or view:

**In `_Layout.cshtml` or your view:**
```cshtml
<script>
    // Enable ripple effect for all Syncfusion components
    Syncfusion.enableRipple(true);
</script>
```

Place this script after the `<ejs-scripts></ejs-scripts>` tag.

Alternatively, you can enable ripple on individual buttons using the `enableRipple` property (available in newer versions):

```cshtml
<ejs-button id="button" enableRipple="true" content="Ripple Button"></ejs-button>
```

---

## Click Handling

Handle button clicks using the `onclick` attribute pointing to a JavaScript function:

**View (`~/Pages/Index.cshtml`):**
```cshtml
<ejs-button id="submitBtn" onclick="handleClick()" content="Submit"></ejs-button>

<script>
    function handleClick() {
        alert('Button clicked!');
        // Add your custom logic here
    }
</script>
```

For server-side form submissions, use a standard HTML form:

```cshtml
<form method="post">
    <ejs-button id="submitBtn" type="submit" content="Submit"></ejs-button>
</form>
```

**Razor Pages Handler (`~/Pages/Index.cshtml.cs`):**
```csharp
public async Task<IActionResult> OnPostAsync()
{
    // Handle the button click (form submission)
    return Page();
}
```

---

## Using the Button in Forms

**Complete Form Example:**

**View (`~/Pages/Index.cshtml`):**
```cshtml
<form method="post">
    <div class="e-form">
        <div class="e-form-group">
            <label for="username">Username</label>
            <input id="username" type="text" name="username" required />
        </div>
        <div class="e-form-group">
            <label for="password">Password</label>
            <input id="password" type="password" name="password" required />
        </div>
        <div class="e-form-group">
            <ejs-button id="submitBtn" type="submit" content="Login"></ejs-button>
            <ejs-button id="resetBtn" type="reset" content="Reset"></ejs-button>
        </div>
    </div>
</form>
```

---

## See Also

- [Button Types and Styles](button-types-and-styles.md)
- [Button How-To Patterns](button-how-to.md)
- [Button API Reference](button-api.md)
- [Button Accessibility](button-accessibility.md)
