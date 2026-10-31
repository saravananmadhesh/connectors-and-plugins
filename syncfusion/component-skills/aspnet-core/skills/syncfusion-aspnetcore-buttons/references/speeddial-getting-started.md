# Getting Started – ASP.NET Core Speed Dial

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

In `~/Pages/Shared/_Layout.cshtml`:

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

## Basic Speed Dial

```cshtml
<div id="container" style="position: relative; height: 400px;">
    Content area...
    
    <ejs-speeddial 
        id="speeddial"
        content="Edit"
        target="#container"
        position="BottomRight">
    </ejs-speeddial>
</div>
```

---

## Speed Dial with Items

```cshtml
@{
    List<SpeedDialItem> items = new List<SpeedDialItem>();
    items.Add(new SpeedDialItem
    {
        Text = "Cut"
    });
    items.Add(new SpeedDialItem
    {
        Text = "Copy"
    });
    items.Add(new SpeedDialItem
    {
        Text = "Paste"
    });
}

<div id="container" style="position: relative; height: 400px;">
    <ejs-speeddial 
        id="speeddial"
        content="Edit"
        items="items"
        target="#container">
    </ejs-speeddial>
</div>
```

---

## See Also

- [Speed Dial Items](speeddial-items.md)
- [Speed Dial Display Modes](speeddial-display-modes.md)
- [Speed Dial Positions](speeddial-positions.md)
- [Speed Dial API](speeddial-api.md)
