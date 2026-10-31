# Getting Started – Syncfusion ASP.NET Core Mention

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#install-nuget-package)
- [Register Tag Helper](#register-tag-helper)
- [Add Stylesheet and Script References](#add-stylesheet-and-script-references)
- [Register Script Manager](#register-script-manager)
- [Add Mention Target Element](#add-mention-target-element)
- [Basic Mention Rendering](#basic-mention-rendering)
- [Binding Data Source](#binding-data-source)
- [Display Mention Character](#display-mention-character)

---

## Prerequisites

- ASP.NET Core web application (Razor Pages or MVC)
- Visual Studio with .NET SDK

---

## Install NuGet Package

Install `Syncfusion.EJ2.AspNet.Core` via NuGet Package Manager or Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core
```

> The package has dependencies on `Newtonsoft.Json` (for JSON serialization) and `Syncfusion.Licensing` (for license validation).

---

## Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## Add Stylesheet and Script References

In `~/Pages/Shared/_Layout.cshtml`, add inside `<head>`:

```cshtml
<head>
    <!-- Syncfusion ASP.NET Core styles (Fluent theme) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
    <!-- Syncfusion ASP.NET Core scripts -->
    <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
</head>
```

---

## Register Script Manager

At the end of `<body>` in `_Layout.cshtml`:

```cshtml
<body>
    ...
    <ejs-scripts></ejs-scripts>
</body>
```

---

## Add Mention Target Element

The Mention component requires a **target** element — a `contenteditable` div or a `<textarea>` — where the user types. The Mention listens to the target's input and displays suggestions when the trigger character is typed.

```cshtml
<!-- Target element: a rich-text style editable area -->
<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>
```

---

## Basic Mention Rendering

Attach the Mention to the target using the `target` property:

```cshtml
<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>

<ejs-mention id="mentionElement" target="#mentionTarget">
</ejs-mention>
```

> The `target` property accepts a CSS selector string identifying the editable element.

---

## Binding Data Source

Populate the Mention with data using the `dataSource` property. Pass an array of strings or objects:

**Array of strings (view-level):**

```cshtml
@{
    var users = new string[] { "Adeline MacAdams", "Alba Torres", "Amy Fernandez", "Andrew Jack" };
}

<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>

<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@users">
</ejs-mention>
```

**Array of objects (via ViewBag from controller):**

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new List<EmailData>
    {
        new EmailData { Name = "Adeline MacAdams", EmailId = "adeline@example.com" },
        new EmailData { Name = "Alba Torres", EmailId = "alba@example.com" },
        new EmailData { Name = "Amy Fernandez", EmailId = "amy@example.com" }
    };
    return View();
}

public class EmailData
{
    public string Name { get; set; }
    public string EmailId { get; set; }
}
```

**View:**
```cshtml
<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>

<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@ViewBag.data">
    <e-mention-fields text="Name" value="EmailId"></e-mention-fields>
</ejs-mention>
```

> When binding complex objects, use `<e-mention-fields>` to map the `text` (display) and `value` columns.

---

## Display Mention Character

By default, the selected item is inserted **without** the trigger character prefix. Use `showMentionChar="true"` to include the trigger character in the inserted text.

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    showMentionChar="true"
    mentionChar="#">
    <e-mention-fields text="Name"></e-mention-fields>
</ejs-mention>
```

- `mentionChar` — the character that triggers the suggestion popup (default: `@`)
- `showMentionChar` — when `true`, the trigger character is prepended to the selected value in the editor

**Example result:** Selecting "Amy Fernandez" inserts `#Amy Fernandez` into the editor.

---

## Notes

- The tag helper element name is `<ejs-mention>` (lowercase with `ejs-` prefix).
- Use `<e-mention-fields>` child tag to map object data source properties.
- Use `<e-data-manager>` child tag for remote data binding.
- The `target` property is required — without it, the Mention cannot listen for input.
