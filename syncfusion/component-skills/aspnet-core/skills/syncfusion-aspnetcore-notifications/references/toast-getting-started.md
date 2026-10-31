# Getting Started — Syncfusion ASP.NET Core Toast

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#install-nuget-package)
- [Register Tag Helper](#register-tag-helper)
- [Add Stylesheet and Script](#add-stylesheet-and-script)
- [Register Script Manager](#register-script-manager)
- [Add Toast to a Page](#add-toast-to-a-page)
- [Trigger the Toast](#trigger-the-toast)
- [Complete Working Example](#complete-working-example)

---

## Prerequisites

- ASP.NET Core application (Razor Pages or MVC)
- Visual Studio with .NET SDK installed

System requirements: [https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements)

---

## Install NuGet Package

Open **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**, search for `Syncfusion.EJ2.AspNet.Core` and install it.

Or use the Package Manager Console:

```
Install-Package Syncfusion.EJ2.AspNet.Core
```

---

## Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## Add Stylesheet and Script

In `~/Pages/Shared/_Layout.cshtml`, add inside `<head>`:

```cshtml
<!-- Syncfusion EJ2 Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
<!-- Syncfusion EJ2 Scripts -->
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
```

> Replace `{{ site.ej2version }}` with the actual EJ2 version (e.g., `26.1.35`). Other available themes: `bootstrap5.css`, `material.css`, `tailwind.css`.

---

## Register Script Manager

In `~/Pages/Shared/_Layout.cshtml`, add before `</body>`:

```cshtml
<ejs-scripts></ejs-scripts>
```

---

## Add Toast to a Page

In `~/Pages/Index.cshtml`, add the toast tag helper:

```cshtml
<ejs-toast id="element"
           title="Matt sent you a friend request"
           content="You have a new friend request yet to accept">
</ejs-toast>
```

---

## Trigger the Toast

The toast is not shown automatically. Call `show()` via JavaScript:

```cshtml
<ejs-toast id="element"
           title="Matt sent you a friend request"
           content="You have a new friend request yet to accept">
</ejs-toast>

<script type="text/javascript">
    setTimeout(function () {
        var toastObj = document.getElementById('element').ej2_instances[0];
        toastObj.target = document.body;
        toastObj.show();
    }, 1000);
</script>
```

> `toastObj.target = document.body` sets the container before showing. It is recommended to set this before calling `show()`.

---

## Complete Working Example

```cshtml
@* ~/Pages/Index.cshtml *@

<ejs-toast id="element"
           title="Matt sent you a friend request"
           content="You have a new friend request yet to accept">
</ejs-toast>

<ejs-button id="showBtn" content="Show Toast" cssClass="e-btn"></ejs-button>

<script type="text/javascript">
    // Show once on page load
    setTimeout(function () {
        var toastObj = document.getElementById('element').ej2_instances[0];
        toastObj.target = document.body;
        toastObj.show();
    }, 1000);

    // Show on button click
    document.getElementById('showBtn').addEventListener('click', function () {
        var toastObj = document.getElementById('element').ej2_instances[0];
        toastObj.show();
    });
</script>
```

```csharp
// ~/Controllers/HomeController.cs (MVC) or Pages/Index.cshtml.cs (Razor Pages)
public IActionResult Index()
{
    return View();
}
```

---

## Key Points

- The `id` attribute on `<ejs-toast>` is required to reference the instance via `ej2_instances[0]`.
- `target` determines the DOM container the toast is appended to (defaults to `document.body`).
- `show()` can accept a model object to override properties per-call (e.g., different title/content each time).
- Multiple calls to `show()` queue multiple toasts in the same container.
