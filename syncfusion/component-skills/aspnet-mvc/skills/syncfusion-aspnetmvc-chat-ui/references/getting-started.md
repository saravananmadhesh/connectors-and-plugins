# Getting Started — Syncfusion ASP.NET MVC Chat UI

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Install NuGet Package](#install-nuget-package)
3. [Add Namespace](#add-namespace)
4. [Add Stylesheet and Script References](#add-stylesheet-and-script-references)
5. [Register Script Manager](#register-script-manager)
6. [Render the Chat UI Control](#render-the-chat-ui-control)
7. [Configure Messages and User](#configure-messages-and-user)
8. [Common Gotchas](#common-gotchas)

---

## Prerequisites

- ASP.NET MVC 5 application (Visual Studio recommended)
- .NET Framework 4.5 or higher
- System requirements: [https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements](https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements)

**Create a new project using:**
- Microsoft Templates: Visual Studio → New Project → ASP.NET Web Application (.NET Framework) → MVC
- Syncfusion MVC Extension: provides pre-configured projects with Syncfusion references

---

## Install NuGet Package

Open **Tools → NuGet Package Manager → Manage NuGet Packages for Solution** and install:

```
Syncfusion.EJ2.MVC5
```

Or via Package Manager Console:
```bash
Install-Package Syncfusion.EJ2.MVC5 -Version {{ site.ej2version }}
```

> **Note:** For MVC4 applications, install `Syncfusion.EJ2.MVC4` instead.
> The package has dependencies on `Newtonsoft.Json` (JSON serialization) and `Syncfusion.Licensing` (license validation).

---

## Add Namespace

Add the `Syncfusion.EJ2` namespace to `Views/Web.config` so Razor views can resolve HTML helpers:

```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

---

## Add Stylesheet and Script References

In `~/Views/Shared/_Layout.cshtml`, add CDN references inside `<head>`:

```html
<head>
    ...
    <!-- Syncfusion ASP.NET MVC controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET MVC controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

> **Tip:** Replace `fluent.css` with another theme if needed (e.g., `bootstrap5.css`, `material.css`, `tailwind.css`). Refer to the Themes topic for CDN, NPM, and CRG approaches.

---

## Register Script Manager

Add the Syncfusion Script Manager at the end of `<body>` in `_Layout.cshtml`:

```html
<body>
    ...
    @Html.EJS().ScriptManager()
</body>
```

> **Why:** The Script Manager collects and renders all EJ2 component scripts in the correct order. Omitting it prevents components from initializing.

---

## Render the Chat UI Control

**Controller (`HomeController.cs`):**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public ActionResult Index()
{
    var currentUser = new ChatUIUser { Id = "user1", User = "Albert" };
    ViewBag.CurrentUser = currentUser;
    return View();
}
```

**View (`Index.cshtml`):**
```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="chatui-container" style="height:400px; width:400px;">
    @Html.EJS().ChatUI("chatUI").User(ViewBag.CurrentUser).Render()
</div>
```

Press `Ctrl+F5` (Windows) or `⌘+F5` (macOS) to run. The Chat UI renders in the browser with an empty message area and a text input footer.

---

## Configure Messages and User

Use the `Messages` property to pre-populate the chat with a `List<ChatUIMessage>`, and the `User` property to identify the current user (so sent messages are right-aligned).

**Controller:**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public ActionResult Index()
{
    var currentUser = new ChatUIUser { Id = "user1", User = "Albert" };
    var otherUser   = new ChatUIUser { Id = "user2", User = "Michale Suyama" };

    var messages = new List<ChatUIMessage>
    {
        new ChatUIMessage
        {
            Text   = "Hi Michale, are we on track for the deadline?",
            Author = currentUser
        },
        new ChatUIMessage
        {
            Text   = "Yes, the design phase is complete.",
            Author = otherUser
        },
        new ChatUIMessage
        {
            Text   = "I'll review it and send feedback by today.",
            Author = currentUser
        }
    };

    ViewBag.CurrentUser = currentUser;
    ViewBag.Messages    = messages;
    return View();
}
```

**View:**
```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="chatui-container" style="height:380px; width:450px;">
    @Html.EJS().ChatUI("chatUI")
        .User(ViewBag.CurrentUser)
        .Messages(ViewBag.Messages)
        .Render()
</div>
```

**How alignment works:**
- Messages whose `Author.Id` matches the `User.Id` appear on the **right** (sent by current user).
- All other messages appear on the **left** (received messages).

---

## Common Gotchas

| Issue | Cause | Fix |
|-------|-------|-----|
| Component does not render | Script Manager missing | Add `@Html.EJS().ScriptManager()` before `</body>` |
| Namespace not found in view | Web.config namespace missing | Add `Syncfusion.EJ2` to `Views/Web.config` |
| All messages align left | `User` property not set | Set `.User(ViewBag.CurrentUser)` with matching `Id` |
| NuGet package missing | Wrong package for MVC version | Use `Syncfusion.EJ2.MVC5` for MVC5, `MVC4` for MVC4 |
| Styles not applied | CDN link missing or wrong theme | Verify `<link>` tag in `_Layout.cshtml` `<head>` |
