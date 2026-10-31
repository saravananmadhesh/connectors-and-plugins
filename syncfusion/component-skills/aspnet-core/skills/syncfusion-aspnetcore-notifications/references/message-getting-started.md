# Getting Started with Syncfusion ASP.NET Core Message

This guide walks through installing, configuring, and rendering your first `Message` tag helper in an ASP.NET Core (Razor Pages / MVC) application.

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
<!-- Syncfusion ASP.NET Core Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
<!-- Syncfusion ASP.NET Core Scripts -->
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
```

And before `</body>`:

```cshtml
<ejs-scripts></ejs-scripts>
```

> Replace `{{ site.ej2version }}` with the actual EJ2 version (e.g., `26.1.35`). Other available themes: `bootstrap5.css`, `material.css`, `tailwind.css`.

---

## Add the Message to a Page

In `~/Pages/Index.cshtml`, add the message tag helper:

```cshtml
@* ~/Pages/Index.cshtml *@
<ejs-message id="msg_default" content="Please read the comments carefully"></ejs-message>
```

Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS) to run the app. The Syncfusion ASP.NET Core Message control will be rendered in the default web browser.

---

## Content: Attribute vs Inner Content

The `content` attribute and inner content are both supported for message text:

```cshtml
@* Using the content attribute *@
<ejs-message id="msg_attr" content="Your message has been sent successfully"></ejs-message>

@* Using inner content *@
<ejs-message id="msg_inner">Your message has been sent successfully</ejs-message>
```

For rich/templated content, use the `<e-content-template>` tag — see `message-customization.md` for details.

---

## Complete Working Example

```cshtml
@* ~/Pages/Index.cshtml *@
<ejs-message id="msg_default" content="Please read the comments carefully"></ejs-message>
```

```csharp
// ~/Controllers/HomeController.cs (MVC) or Pages/Index.cshtml.cs (Razor Pages)
public IActionResult Index()
{
    return View();
}
```

---

## Gotchas

- **Missing styles**: If the message appears unstyled, ensure the Syncfusion theme stylesheet and `ej2.min.js` are referenced before the component renders.
- **Tag helper not recognized**: Verify `@addTagHelper *, Syncfusion.EJ2` is present in `~/Pages/_ViewImports.cshtml`.
- **Message not visible**: Confirm `<ejs-scripts>` is registered before `</body>` and `visible` (default `true`) has not been set to `false`.
