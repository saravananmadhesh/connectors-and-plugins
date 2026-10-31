# Getting Started – ASP.NET Core RadioButton

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

## Basic RadioButton

```cshtml
<ejs-radiobutton id="radio1" label="Option 1"></ejs-radiobutton>
```

---

## Grouping Radio Buttons

Use the same `name` attribute to create mutually exclusive groups:

```cshtml
<ul>
    <li><ejs-radiobutton id="option1" name="group1" label="Option 1"></ejs-radiobutton></li>
    <li><ejs-radiobutton id="option2" name="group1" label="Option 2"></ejs-radiobutton></li>
    <li><ejs-radiobutton id="option3" name="group1" label="Option 3"></ejs-radiobutton></li>
</ul>
```

---

## Selected State

```cshtml
<ejs-radiobutton id="selected" name="group1" label="Selected" checked="true"></ejs-radiobutton>
<ejs-radiobutton id="unselected" name="group1" label="Unselected" checked="false"></ejs-radiobutton>
```

---

## See Also

- [RadioButton Features and State](radiobutton-features-and-state.md)
- [RadioButton Label and Size](radiobutton-label-and-size.md)
- [RadioButton API](radiobutton-api.md)
