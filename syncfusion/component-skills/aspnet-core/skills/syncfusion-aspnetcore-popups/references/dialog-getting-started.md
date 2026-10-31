# Getting Started with Dialog — ASP.NET Core

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Basic Dialog](#basic-dialog)
- [Modal Dialog](#modal-dialog)
- [With Buttons](#with-buttons)
- [Displaying Content](#displaying-content)

## Prerequisites

Ensure your ASP.NET Core project meets the system requirements:
- ASP.NET Core 5.0 or later
- Visual Studio 2019 or later (or VS Code)
- .NET SDK compatible with your project

## Installation

### Step 1: Install NuGet Package

Open the NuGet Package Manager Console and run:

```bash
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.ej2version }}
```

Or use the .NET CLI:

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core --version {{ site.ej2version }}
```

### Step 2: Add Tag Helper Reference

Open `~/Pages/_ViewImports.cshtml` (or your Razor view folder's _ViewImports.cshtml) and add:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

### Step 3: Reference Styles and Scripts

In your `~/Pages/Shared/_Layout.cshtml` file, add the Syncfusion CSS and JavaScript in the `<head>` and `<body>` tags:

```html
<head>
    ...
    <!-- Syncfusion CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
</head>
<body>
    ...
    <!-- Syncfusion JavaScript -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
    <!-- Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

## Setup

### Configure Syncfusion License (if needed)

In `Program.cs`, you can register the Syncfusion license:

```csharp
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);

// Register Syncfusion License
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");

builder.Services.AddRazorPages();
var app = builder.Build();

app.UseRouting();
app.MapRazorPages();
app.Run();
```

## Basic Dialog

### Simple Non-Modal Dialog

Create a basic dialog without modal behavior:

```csharp
<ejs-dialog id="basicDialog" header="Hello Dialog">
    <e-content-template>
        <p>This is a simple dialog without modal overlay.</p>
    </e-content-template>
</ejs-dialog>

<button class="e-btn" onclick="openDialog()">Open Dialog</button>

<script>
    function openDialog() {
        var dialogObj = document.getElementById('basicDialog').ej2_instances[0];
        dialogObj.show();
    }
</script>
```

**Expected behavior:** Clicking "Open Dialog" displays the dialog. Users can still interact with page elements behind it.

### Minimal Example

```csharp
<ejs-dialog id="minimalDialog">
    <e-content-template>
        <p>Minimal dialog with no header.</p>
    </e-content-template>
</ejs-dialog>
```

## Modal Dialog

### Modal with Overlay

Enable modal mode to prevent interaction with page background:

```csharp
<ejs-dialog id="modalDialog" 
    header="Important" 
    isModal="true" 
    width="500px">
    <e-content-template>
        <p>This is a modal dialog. You must interact with it before continuing.</p>
    </e-content-template>
</ejs-dialog>

<button class="e-btn" onclick="showModalDialog()">Show Modal</button>

<script>
    function showModalDialog() {
        var dialog = document.getElementById('modalDialog').ej2_instances[0];
        dialog.show();
    }
</script>
```

**Key behavior:** Modal overlay appears behind dialog, disabling clicks on page content.

## With Buttons

### Dialog with Action Buttons

Add footer buttons for user actions:

```csharp
<ejs-dialog id="buttonDialog" 
    header="Confirm Delete" 
    isModal="true" 
    width="400px">
    <e-dialog-buttons>
        <e-dialog-dialogbutton content="Delete" 
            isPrimary="true" 
            click="handleDelete"></e-dialog-dialogbutton>
        <e-dialog-dialogbutton content="Cancel" 
            click="handleCancel"></e-dialog-dialogbutton>
    </e-dialog-buttons>
    <e-content-template>
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
    </e-content-template>
</ejs-dialog>

<button class="e-btn" onclick="openDeleteDialog()">Delete Item</button>

<script>
    function openDeleteDialog() {
        var dialog = document.getElementById('buttonDialog').ej2_instances[0];
        dialog.show();
    }

    function handleDelete() {
        console.log('Item deleted');
        var dialog = document.getElementById('buttonDialog').ej2_instances[0];
        dialog.hide();
    }

    function handleCancel() {
        var dialog = document.getElementById('buttonDialog').ej2_instances[0];
        dialog.hide();
    }
</script>
```

### Multiple Primary Buttons

When multiple primary buttons exist, the first one receives focus on dialog open:

```csharp
<e-dialog-buttons>
    <e-dialog-dialogbutton content="Save" isPrimary="true" click="onSave"></e-dialog-dialogbutton>
    <e-dialog-dialogbutton content="Save & Close" isPrimary="true" click="onSaveClose"></e-dialog-dialogbutton>
    <e-dialog-dialogbutton content="Cancel" click="onCancel"></e-dialog-dialogbutton>
</e-dialog-buttons>
```

## Displaying Content

### Content Template

Use `<e-content-template>` to add rich HTML content:

```csharp
<ejs-dialog id="contentDialog" header="User Profile">
    <e-content-template>
        <div style="padding: 20px;">
            <h4>John Doe</h4>
            <p><strong>Email:</strong> john@example.com</p>
            <p><strong>Phone:</strong> +1-234-567-8900</p>
            <p><strong>Role:</strong> Administrator</p>
        </div>
    </e-content-template>
</ejs-dialog>
```

### Dynamic Content from Model

Pass data from your page model to the dialog:

```csharp
@model MyPageModel

<ejs-dialog id="userDialog" header="Edit User">
    <e-content-template>
        <form>
            <div class="form-group">
                <label>Name:</label>
                <input type="text" value="@Model.UserName" class="form-control" />
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" value="@Model.UserEmail" class="form-control" />
            </div>
        </form>
    </e-content-template>
</ejs-dialog>
```

### Close Button

Enable the close (X) icon in the header:

```csharp
<ejs-dialog id="closeableDialog" 
    header="Information" 
    showCloseIcon="true"
    visible="false">
    <e-content-template>
        <p>Click the X button to close.</p>
    </e-content-template>
</ejs-dialog>
```

## Common Issues

### Dialog Not Appearing
- **Cause:** Scripts or styles not loaded. Verify `<ejs-scripts></ejs-scripts>` and CSS link are in layout.
- **Solution:** Check browser console for 404 errors; ensure CDN links are correct.

### Dialog Overflow
- **Cause:** Content larger than dialog size.
- **Solution:** Set explicit `height` and apply CSS scrolling to content.

### Modal Not Working
- **Cause:** `isModal="false"` or missing overlay CSS.
- **Solution:** Ensure `isModal="true"` and CSS is loaded.

