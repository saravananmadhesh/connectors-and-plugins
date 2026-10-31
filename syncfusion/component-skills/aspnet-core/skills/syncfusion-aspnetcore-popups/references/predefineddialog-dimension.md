# Dimension in ASP.NET Core Predefined Dialogs

## Table of Contents
- [Overview](#overview)
- [Alert Dimensions](#alert-dimensions)
- [Confirm Dimensions](#confirm-dimensions)
- [Prompt Dimensions](#prompt-dimensions)
- [Custom CSS for Size Constraints](#custom-css-for-size-constraints)

---

## Overview

The `width` and `height` properties control dialog dimensions:
- `width` — dialog width (e.g. `'300px'`, `'50%'`, `'auto'`)
- `height` — dialog height (e.g. `'200px'`, `'50%'`, `'auto'`)

For advanced size constraints (min-width, max-width, etc.), use `cssClass` with custom CSS rules.

---

## Alert Dimensions

```csharp
@* Alert Button *@
<button class="e-btn e-danger" onclick="showAlert()">Alert</button>

<script>
    function showAlert() {
        ej.popups.DialogUtility.alert({
            title: 'Low Battery',
            width: '350px',
            height: '200px',
            content: '10% of battery remaining'
        });
    }
</script>
```

---

## Confirm Dimensions

```csharp
@* Confirm Button *@
<button class="e-btn e-success" onclick="showConfirm()">Confirm</button>

<script>
    function showConfirm() {
        ej.popups.DialogUtility.confirm({
            title: 'Delete Multiple Items',
            content: 'Are you sure you want to permanently delete these items?',
            width: '400px',
            height: '250px'
        });
    }
</script>
```

---

## Prompt Dimensions

```csharp
@* Prompt Button *@
<button class="e-btn e-primary" onclick="showPrompt()">Prompt</button>

<script>
    function showPrompt() {
        ej.popups.DialogUtility.confirm({
            title: 'Join Chat Group',
            content: '<p>Enter your name:</p><input type="text" class="e-input" placeholder="Type here.." />',
            width: '400px',
            height: '250px'
        });
    }
</script>
```

---

## Custom CSS for Size Constraints

Use `cssClass` with custom CSS to apply min-width, max-width, min-height, or max-height constraints:

```csharp
@* Style section in your view or _Layout.cshtml *@
<style>
    .dialog-large {
        max-width: 600px !important;
        min-width: 300px !important;
    }
</style>

@* Prompt Button with cssClass *@
<button class="e-btn e-primary" onclick="showPrompt()">Prompt</button>

<script>
    function showPrompt() {
        ej.popups.DialogUtility.confirm({
            title: 'Join Chat Group',
            content: '<p>Enter your name:</p><input type="text" class="e-input" placeholder="Type here.." />',
            cssClass: 'dialog-large'
        });
    }
</script>
```
