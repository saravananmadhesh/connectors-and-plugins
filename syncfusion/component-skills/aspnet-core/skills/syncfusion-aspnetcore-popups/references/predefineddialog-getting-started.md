# Getting Started with ASP.NET Core Predefined Dialogs

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Setup](#setup)
- [Alert Dialog](#alert-dialog)
- [Confirm Dialog](#confirm-dialog)
- [Prompt Dialog](#prompt-dialog)

---

## Overview

Syncfusion Predefined Dialogs in ASP.NET Core are opened using the **`DialogUtility`** JavaScript utility class. There is no Razor Tag Helper component — all three dialog types (alert, confirm, prompt) are invoked imperatively via JavaScript.

---

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

Open `~/Pages/_ViewImports.cshtml` and add:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

---

## Setup

### Reference Styles and Scripts

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

---

## Alert Dialog

An alert dialog displays a message with an **OK** button. Use `DialogUtility.alert()` in a Razor view:

```csharp
@* Alert Button *@
<button class="e-btn e-danger" onclick="showAlert()">Alert</button>

<div id="statusText"></div>

<script>
    function showAlert() {
        document.getElementById('statusText').style.display = 'none';
        
        var dialogObj = ej.popups.DialogUtility.alert({
            title: 'Low Battery',
            width: '250px',
            content: '10% of battery remaining',
            okButton: { 
                click: function () {
                    dialogObj.hide();
                    document.getElementById('statusText').innerHTML = 'The user closed the Alert dialog.';
                    document.getElementById('statusText').style.display = 'block';
                }
            }
        });
    }
</script>
```

---

## Confirm Dialog

A confirm dialog displays a message with **OK** and **Cancel** buttons. Use `DialogUtility.confirm()`:

```csharp
@* Confirm Button *@
<button class="e-btn e-success" onclick="showConfirm()">Confirm</button>

<div id="statusText"></div>

<script>
    function showConfirm() {
        document.getElementById('statusText').style.display = 'none';
        
        var dialogObj = ej.popups.DialogUtility.confirm({
            title: 'Delete Multiple Items',
            content: 'Are you sure you want to permanently delete these items?',
            width: '300px',
            okButton: { 
                click: function () {
                    dialogObj.hide();
                    document.getElementById('statusText').innerHTML = 'The user confirmed the dialog box.';
                    document.getElementById('statusText').style.display = 'block';
                }
            },
            cancelButton: { 
                click: function () {
                    dialogObj.hide();
                    document.getElementById('statusText').innerHTML = 'The user canceled the dialog box.';
                    document.getElementById('statusText').style.display = 'block';
                }
            }
        });
    }
</script>
```

---

## Prompt Dialog

A prompt dialog collects input from the user. Use `DialogUtility.confirm()` with an `<input>` element in `content`:

```csharp
@* Prompt Button *@
<button class="e-btn e-primary" onclick="showPrompt()">Prompt</button>

<div id="statusText"></div>

<script>
    function showPrompt() {
        document.getElementById('statusText').style.display = 'none';
        
        var dialogObj = ej.popups.DialogUtility.confirm({
            title: 'Join Chat Group',
            width: '300px',
            content: '<p>Enter your name:</p><input id="inputEle" type="text" class="e-input" placeholder="Type here.." />',
            okButton: { 
                click: function () {
                    var value = document.getElementById('inputEle').value;
                    dialogObj.hide();
                    document.getElementById('statusText').innerHTML = 'You entered: ' + value;
                    document.getElementById('statusText').style.display = 'block';
                }
            },
            cancelButton: { 
                click: function () {
                    dialogObj.hide();
                    document.getElementById('statusText').innerHTML = 'The user canceled the dialog box.';
                    document.getElementById('statusText').style.display = 'block';
                }
            }
        });
    }
</script>
```

---

## Next Steps

Explore the [API Reference](predefineddialog-api.md) for all available options, or learn about specific features:
- [Position](predefineddialog-position.md)
- [Animation](predefineddialog-animation.md)
- [Customization](predefineddialog-customization.md)
