# Getting Started — Syncfusion ASP.NET Core Image Editor

This guide walks through adding the Syncfusion EJ2 Image Editor to an ASP.NET Core application using Razor Pages.

---

## Prerequisites

- .NET 6 / .NET 7 / .NET 8 ASP.NET Core web application
- Visual Studio 2022 or later

---

## Step 1: Install NuGet Package

Open **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**, search for `Syncfusion.EJ2.AspNet.Core`, and install it.

Or use the Package Manager Console:

```bash
Install-Package Syncfusion.EJ2.AspNet.Core
```

The package includes dependencies:
- `Newtonsoft.Json` — JSON serialization
- `Syncfusion.Licensing` — License key validation

---

## Step 2: Register the Syncfusion Tag Helper

Open `~/Pages/_ViewImports.cshtml` and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

This makes all `<ejs-*>` tag helpers available across Razor Pages.

---

## Step 3: Add Stylesheet and Script References

### Option A — Locally served assets (recommended for production)

Install the EJ2 assets via **LibMan** or **npm** and serve them from your own origin so no external network call is required at runtime:

```bash
# npm (place output under wwwroot/lib/ej2)
npm install @syncfusion/ej2
```

Then reference the local copies in `~/Pages/Shared/_Layout.cshtml`:

```html
<head>
    ...
    <!-- Syncfusion EJ2 theme - HOST LOCALLY (required for security compliance) -->
    <!-- Download from https://www.syncfusion.com/downloads/aspnetcore and place in wwwroot/lib/ej2/ -->
    <link rel="stylesheet" href="/lib/ej2/fluent2.css" />
</head>
<body>
    ...
    <!-- Syncfusion EJ2 scripts - HOST LOCALLY (required for security compliance) -->
    <!-- Do NOT load from external CDN -->
    <script src="/lib/ej2/ej2.min.js"></script>
    <ejs-scripts></ejs-scripts>
</body>
```

> **Available themes:** `fluent.css`, `bootstrap5.css`, `material.css`, `material3.css`, `tailwind.css`, `highcontrast.css` (all must be hosted locally)

---

## Step 4: Add the Image Editor Control

In `~/Pages/Index.cshtml`, render the Image Editor tag helper:

```cshtml
<div class="e-img-editor-sample">
    <ejs-imageeditor id="image-editor"></ejs-imageeditor>
</div>

<style>
    .e-img-editor-sample {
        height: 80vh;
        width: 100%;
    }

    @@media only screen and (max-width: 700px) {
        .e-img-editor-sample {
            height: 75vh;
            width: 100%;
        }
    }
</style>
```

> **Important:** The container div must have an explicit `height` for the Image Editor to render correctly. Using `height: 100%` without a defined parent height will produce a zero-height canvas.

---

## Step 5: Open an Image on Load

Use the `created` event to load an image as soon as the editor initializes:

```cshtml
<ejs-imageeditor id="image-editor" created="onCreated"></ejs-imageeditor>

<script>
    function onCreated() {
        var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
        var imgUrl = ej.base.Browser.isDevice
            ? '/images/flower.png'
            : '/images/bridge.png';
        imageEditorObj.open(imgUrl);
    }
</script>
```

The `open` method accepts:
- A **local file path/name** (relative to served files)
- A **base64 string** (data URL format)
- A **Blob URL**
- A **hosted/online URL**

---

## Basic Tag Helper Attributes

```cshtml
<ejs-imageeditor id="image-editor"
                 height="500px"
                 width="100%"
                 allowUndoRedo="true"
                 disabled="false"
                 created="onCreated">
</ejs-imageeditor>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | string | required | Unique element ID |
| `height` | string | "100%" | Editor height (px or %) |
| `width` | string | "100%" | Editor width (px or %) |
| `allowUndoRedo` | bool | true | Enable undo/redo history |
| `disabled` | bool | false | Disable editor interaction |
| `created` | string | null | JS function called after render |

---

## Registering a Syncfusion License Key

For production applications, register your license key before rendering any Syncfusion component:

```javascript
// In _Layout.cshtml or a site-wide JS file, before ejs-scripts
Syncfusion.EJ2.base.registerLicense('YOUR_LICENSE_KEY');
```

---

## See Also

- Refer to official Syncfusion documentation for component API details
- Download Syncfusion releases from: https://www.syncfusion.com/downloads/aspnetcore
- All assets must be hosted locally in `wwwroot/lib/ej2/` per security policy
- Available themes: fluent, bootstrap5, material, material3, tailwind, highcontrast


