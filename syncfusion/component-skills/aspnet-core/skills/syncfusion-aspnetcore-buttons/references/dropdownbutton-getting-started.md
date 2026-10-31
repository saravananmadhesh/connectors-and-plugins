# Getting Started – ASP.NET Core DropDownButton

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#install-nuget-package)
- [Register Tag Helper](#register-tag-helper)
- [Add Stylesheet and Script](#add-stylesheet-and-script)
- [Register Script Manager](#register-script-manager)
- [Render Basic DropDownButton](#render-basic-dropdownbutton)
- [Binding Items](#binding-items)
- [Running the Application](#running-the-application)

---

## Prerequisites

- ASP.NET Core web application
- Visual Studio 2022 or later

---

## Install NuGet Package

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

---

## Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` or `~/Views/_ViewImports.cshtml`:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## Add Stylesheet and Script

In `~/Pages/Shared/_Layout.cshtml`, add inside `<head>`:

```cshtml
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
```

---

## Register Script Manager

At the end of `<body>`:

```cshtml
<ejs-scripts></ejs-scripts>
```

---

## Render Basic DropDownButton

**View:**
```cshtml
<ejs-dropdownbutton id="ddb1" content="Dropdown"></ejs-dropdownbutton>
```

---

## Binding Items

**Razor Pages Handler (`~/Pages/Index.cshtml.cs`):**
```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

public class IndexModel : PageModel
{
    public List<object> Items { get; set; }

    public void OnGet()
    {
        Items = new List<object>
        {
            new { text = "Cut" },
            new { text = "Copy" },
            new { text = "Paste" }
        };
    }
}
```

**View (`~/Pages/Index.cshtml`):**
```cshtml
@{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut", iconCss = "e-icons e-cut" });
    items.Add(new { text = "Copy", iconCss = "e-icons e-copy" });
    items.Add(new { text = "Paste", iconCss = "e-icons e-paste" });
}

<ejs-dropdownbutton id="clipboardBtn" content="Clipboard" items="items"></ejs-dropdownbutton>
```

---

## Running the Application

Press **F5** or run `dotnet run`.

---

## See Also

- [DropDownButton Popup Items](dropdownbutton-popup-items.md)
- [DropDownButton Events](dropdownbutton-events-and-interactivity.md)
- [DropDownButton API](dropdownbutton-api.md)
