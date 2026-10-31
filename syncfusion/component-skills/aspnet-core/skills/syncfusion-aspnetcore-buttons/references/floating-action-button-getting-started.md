# Getting Started – ASP.NET Core Floating Action Button (FAB)

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

## Basic FAB

```cshtml
<ejs-fab id="fab" content="Add" cssClass="e-primary"></ejs-fab>
```

---

## FAB with Icon

```cshtml
<ejs-fab 
    id="fab" 
    iconCss="e-icons e-plus"
    cssClass="e-primary">
</ejs-fab>
```

---

## FAB Positioned to Container

```cshtml
<div id="container" style="position: relative; height: 400px; border: 1px solid #ccc;">
    Content goes here...
    
    <ejs-fab 
        id="fab" 
        content="Add"
        target="#container"
        position="BottomRight"
        cssClass="e-primary">
    </ejs-fab>
</div>
```

---

## Click Event

```cshtml
<ejs-fab id="fab" content="Edit"></ejs-fab>

<script>
    document.getElementById('fab').addEventListener('click', function() {
        console.log('FAB clicked');
        alert('Edit action triggered');
    });
</script>
```

---

## See Also

- [FAB Positions](floating-action-button-positions.md)
- [FAB Icons](floating-action-button-icons.md)
- [FAB Styles](floating-action-button-styles.md)
- [FAB API](floating-action-button-api.md)
