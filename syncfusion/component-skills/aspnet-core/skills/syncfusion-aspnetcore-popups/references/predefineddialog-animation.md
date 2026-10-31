# Animation in ASP.NET Core Predefined Dialogs

## Table of Contents
- [Overview](#overview)
- [Alert Animation](#alert-animation)
- [Confirm Animation](#confirm-animation)
- [Prompt Animation](#prompt-animation)

---

## Overview

Predefined dialogs support open/close animations via the `animationSettings` property.
The `animationSettings` object accepts:
- `effect` — animation effect name (e.g. `'Zoom'`, `'Fade'`, `'FlipXDown'`, etc.)
- `duration` — duration in milliseconds (optional)
- `delay` — delay before animation starts in milliseconds (optional)

Pass `animationSettings` inside the options object of `DialogUtility.alert()` or `DialogUtility.confirm()`.

---

## Alert Animation

```csharp
@* Alert Button *@
<button class="e-btn e-danger" onclick="showAlert()">Alert</button>

<script>
    function showAlert() {
        ej.popups.DialogUtility.alert({
            title: 'Low Battery',
            width: '250px',
            content: '10% of battery remaining',
            animationSettings: { effect: 'Zoom' }
        });
    }
</script>
```

---

## Confirm Animation

```csharp
@* Confirm Button *@
<button class="e-btn e-success" onclick="showConfirm()">Confirm</button>

<script>
    function showConfirm() {
        ej.popups.DialogUtility.confirm({
            title: 'Delete Multiple Items',
            content: 'Are you sure you want to permanently delete these items?',
            width: '300px',
            animationSettings: { effect: 'Zoom' }
        });
    }
</script>
```

---

## Prompt Animation

```csharp
@* Prompt Button *@
<button class="e-btn e-primary" onclick="showPrompt()">Prompt</button>

<script>
    function showPrompt() {
        ej.popups.DialogUtility.confirm({
            title: 'Join Chat Group',
            width: '300px',
            content: '<p>Enter your name:</p><input type="text" class="e-input" placeholder="Type here.." />',
            animationSettings: { effect: 'Zoom' }
        });
    }
</script>
```
