# Getting Started – ASP.NET Core ProgressButton

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

## Basic ProgressButton

```cshtml
<ejs-progressbutton id="progressBtn" content="Download"></ejs-progressbutton>
```

---

## ProgressButton with Animation

```cshtml
<ejs-progressbutton 
    id="progressBtn" 
    content="Submit"
    cssClass="e-primary">
</ejs-progressbutton>

<script>
    document.getElementById('progressBtn').addEventListener('click', function() {
        const btn = ej2_instances['progressBtn'][0];
        
        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            btn.progress = progress;
            btn.progressText = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                btn.content = 'Completed';
            }
        }, 200);
    });
</script>
```

---

## See Also

- [ProgressButton Spinner and Progress](progressbutton-spinner-and-progress.md)
- [ProgressButton Style and Appearance](progressbutton-style-and-appearance.md)
- [ProgressButton API](progressbutton-api.md)
