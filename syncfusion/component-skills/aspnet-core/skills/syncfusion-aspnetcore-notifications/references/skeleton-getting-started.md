# Getting Started with Syncfusion ASP.NET Core Skeleton

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#install-nuget-package)
- [Register Tag Helper](#register-tag-helper)
- [Add Stylesheet and Script](#add-stylesheet-and-script)
- [Register Script Manager](#register-script-manager)
- [Add Skeleton to a Page](#add-skeleton-to-a-page)
- [Skeleton Types](#skeleton-types)
- [Dimension Rules](#dimension-rules)

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

## Register Script Manager

In `~/Pages/Shared/_Layout.cshtml`, add before `</body>`:

```cshtml
<ejs-scripts></ejs-scripts>
```

---

## Add Skeleton to a Page

In `~/Pages/Index.cshtml`, add the skeleton tag helper. At minimum, provide a `height` for text-style skeletons:

```cshtml
@* ~/Pages/Index.cshtml *@
<ejs-skeleton id="skeletonText" height="15px"></ejs-skeleton>
```

For circle or square shapes, provide `width` (used as the dimension):

```cshtml
<ejs-skeleton id="skeletonCircle" shape="Circle" width="48px"></ejs-skeleton>
```

Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS) to run the app. The Syncfusion ASP.NET Core Skeleton control will be rendered in the default web browser with the default Wave shimmer animation.

---

## Skeleton Types

The Skeleton control supports the following shape values:

- `Circle`
- `Square`
- `Text`
- `Rectangle`

```cshtml
@* ~/Pages/Index.cshtml *@
<div class="row skeleton-default">
    <div class="col-sm-6">
        <h5>Circle</h5>
        <ejs-skeleton id="skeletonCircleSmall"   shape="Circle" width="3rem"></ejs-skeleton>
        <ejs-skeleton id="skeletonCircleMedium"  shape="Circle" width="48px"></ejs-skeleton>
        <ejs-skeleton id="skeletonCircleLarge"   shape="Circle" width="64px"></ejs-skeleton>
        <ejs-skeleton id="skeletonCircleLarger"  shape="Circle" width="80px"></ejs-skeleton>
    </div>
    <div class="col-sm-6">
        <h5>Square</h5>
        <ejs-skeleton id="skeletonSquareSmall"   shape="Square" width="3rem"></ejs-skeleton>
        <ejs-skeleton id="skeletonSquareMedium"  shape="Square" width="48px"></ejs-skeleton>
        <ejs-skeleton id="skeletonSquareLarge"   shape="Square" width="64px"></ejs-skeleton>
        <ejs-skeleton id="skeletonSquareLarger"  shape="Square" width="80px"></ejs-skeleton>
    </div>
</div>
<div class="row skeleton-default">
    <div class="col-sm-6">
        <h5>Text</h5>
        <ejs-skeleton id="skeletonText"        shape="Text" width="100%" height="15px"></ejs-skeleton>
        <ejs-skeleton id="skeletonTextMedium"              width="30%"  height="15px"></ejs-skeleton>
        <br />
        <ejs-skeleton id="skeletonTextSmall"               width="15%"  height="15px"></ejs-skeleton>
        <br />
        <ejs-skeleton id="skeletonTextMedium1"             width="60%"  height="15px"></ejs-skeleton>
        <br />
        <ejs-skeleton id="skeletonTextSmall1"              width="15%"  height="15px"></ejs-skeleton>
    </div>
    <div class="col-sm-6">
        <h5>Rectangle</h5>
        <ejs-skeleton id="skeletonRectangle"        shape="Rectangle" width="100%" height="100px"></ejs-skeleton>
        <ejs-skeleton id="skeletonRectangleMedium"  shape="Rectangle" width="20%"  height="35px"></ejs-skeleton>
        <ejs-skeleton id="skeletonRectangleMediumRight" style="float:right" shape="Rectangle" width="20%" height="35px"></ejs-skeleton>
    </div>
</div>
```

---

## Dimension Rules

| Shape | Width | Height |
|-------|-------|--------|
| `Text` (default) | Optional | Required |
| `Rectangle` | Required | Required |
| `Circle` | Required (used as diameter) | Not needed |
| `Square` | Required (used as side length) | Not needed |

> For `Circle` and `Square`, `width` is used as the single dimension. Height is ignored.

---

## Minimal Examples

### Text line placeholder (default)
```cshtml
<ejs-skeleton id="sk_line" height="15px" width="80%"></ejs-skeleton>
```

### Avatar placeholder
```cshtml
<ejs-skeleton id="sk_avatar" shape="Circle" width="48px"></ejs-skeleton>
```

### Image placeholder
```cshtml
<ejs-skeleton id="sk_image" shape="Rectangle" width="100%" height="200px"></ejs-skeleton>
```

### Small icon placeholder
```cshtml
<ejs-skeleton id="sk_icon" shape="Square" width="32px"></ejs-skeleton>
```

---

## Gotchas

- **Missing styles**: If the skeleton appears unstyled, ensure the Syncfusion theme stylesheet and `ej2.min.js` are referenced before the component renders.
- **Tag helper not recognized**: Verify `@addTagHelper *, Syncfusion.EJ2` is present in `~/Pages/_ViewImports.cshtml`.
- **Height ignored**: Height is not applied for `Circle` or `Square` shapes — only `width` controls their dimension.
