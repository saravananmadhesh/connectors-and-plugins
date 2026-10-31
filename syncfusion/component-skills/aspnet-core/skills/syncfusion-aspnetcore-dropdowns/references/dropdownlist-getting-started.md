# Getting Started — DropDownList (ASP.NET Core)

> **Official Docs:** https://ej2.syncfusion.com/aspnetcore/documentation/drop-down-list/getting-started

---

## Prerequisites

- .NET 6 / 7 / 8 or later ASP.NET Core project
- Visual Studio 2022 or later

---

## Step 1 — Install NuGet Package

```
Install-Package Syncfusion.EJ2.AspNet.Core
```

Or via .NET CLI:

```
dotnet add package Syncfusion.EJ2.AspNet.Core
```

---

## Step 2 — Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## Step 3 — Add Stylesheet and Script (Local Hosting Recommended)

**⚠️ SECURITY:** For production, host vendor scripts locally from the NuGet package instead of using CDN to mitigate supply chain risks (W012).

### Option A: Local Hosting (RECOMMENDED) ✅

In `~/Pages/Shared/_Layout.cshtml`, inside `<head>`:

```html
<head>
    <!-- ✅ Serve from local NuGet package (safest) -->
    <link rel="stylesheet" href="~/lib/ej2/material.css" />
</head>
```

At the end of `<body>`:

```html
<body>
    ...
    <!-- ✅ Local script, no external CDN dependency -->
    <script src="~/lib/ej2/ej2.min.js"></script>
    <ejs-scripts></ejs-scripts>
</body>
```

### Option B: CDN with Subresource Integrity (SRI) ⚠️

If CDN is mandatory, use SRI hashes + HTTPS:

```html
<head>
    <!-- ⚠️ Pin version and add SRI hash for integrity verification -->
    <link rel="stylesheet" 
          href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/material.css"
          integrity="sha384-[GET_ACTUAL_HASH_FROM_CDN]"
          crossorigin="anonymous" />
</head>
```

```html
<body>
    ...
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/ej2.min.js"
            integrity="sha384-[GET_ACTUAL_HASH_FROM_CDN]"
            crossorigin="anonymous"></script>
    <ejs-scripts></ejs-scripts>
</body>
```

**Get SRI hashes from:** https://www.srihash.org/ or Syncfusion CDN documentation.

---

## Step 4 — Add the DropDownList Control

In `~/Pages/Index.cshtml`:

```cshtml
@{
    var data = new string[] { "Badminton", "Basketball", "Cricket", "Football", "Golf", "Gymnastics", "Hockey", "Tennis" };
}

<ejs-dropdownlist id="games" dataSource="data" placeholder="Select a game" popupHeight="220px">
</ejs-dropdownlist>
```

---

## Configure Popup Size

The popup height and width can be customized using `popupHeight` and `popupWidth` properties:

```cshtml
<ejs-dropdownlist id="games"
    dataSource="data"
    popupWidth="300px"
    popupHeight="220px"
    placeholder="Select a game">
</ejs-dropdownlist>
```

---

## Binding Data from Controller (ViewBag)

**Controller (`HomeController.cs`):**

```csharp
public IActionResult Index()
{
    ViewBag.data = new string[] { "Badminton", "Basketball", "Cricket", "Football", "Golf" };
    return View();
}
```

**View (`Index.cshtml`):**

```cshtml
<ejs-dropdownlist id="games"
    dataSource="@ViewBag.data"
    placeholder="Select a game"
    popupHeight="220px">
</ejs-dropdownlist>
```

---

## Handling Change Event

```cshtml
<ejs-dropdownlist id="games"
    dataSource="@ViewBag.data"
    placeholder="Select a game"
    change="onGameChange">
</ejs-dropdownlist>

<script>
    function onGameChange(args) {
        console.log('Selected value:', args.value);
        console.log('Selected text:', args.itemData);
    }
</script>
```

---

## Key Properties Used in Getting Started

| Property | Tag Helper Attribute | Description |
|----------|---------------------|-------------|
| `DataSource` | `dataSource` | Data array or DataManager |
| `Placeholder` | `placeholder` | Hint text shown in the input |
| `PopupHeight` | `popupHeight` | Height of the popup list (default `"300px"`) |
| `PopupWidth` | `popupWidth` | Width of the popup list (default `"100%"`) |
| `Value` | `value` | Pre-selected value |
| `Enabled` | `enabled` | Enable or disable the control |
| `Readonly` | `readonly` | Set control to read-only |
| `CssClass` | `cssClass` | Additional CSS class for customization |
| `Width` | `width` | Width of the component |

---

## Valid Events Used in Getting Started

| Event | Attribute | Description |
|-------|-----------|-------------|
| `Change` | `change` | Fires when value changes |
| `Created` | `created` | Fires when component is created |
| `Open` | `open` | Fires when popup opens |
| `Close` | `close` | Fires when popup closes |
| `Focus` | `focus` | Fires when component receives focus |
| `Blur` | `blur` | Fires when component loses focus |
