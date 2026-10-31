# Position in ASP.NET Core Predefined Dialogs

## Table of Contents
- [Overview](#overview)
- [Alert Position](#alert-position)
- [Confirm Position](#confirm-position)
- [Prompt Position](#prompt-position)

---

## Overview

The `position` property accepts a `PositionDataModel` with `X` and `Y` values:

| Key | Values |
|-----|--------|
| `X` | `'left'`, `'center'`, `'right'`, or a numeric pixel offset |
| `Y` | `'top'`, `'center'`, `'bottom'`, or a numeric pixel offset |

Default: `{ X: 'center', Y: 'center' }`.

---

## Alert Position

```csharp
@* Alert Button *@
<button class="e-btn e-danger" onclick="showAlert()">Alert</button>

<script>
    function showAlert() {
        ej.popups.DialogUtility.alert({
            title: 'Low Battery',
            width: '250px',
            content: '10% of battery remaining',
            position: { X: 'center', Y: 'center' }
        });
    }
</script>
```

---

## Confirm Position

```csharp
@* Confirm Button *@
<button class="e-btn e-success" onclick="showConfirm()">Confirm</button>

<script>
    function showConfirm() {
        ej.popups.DialogUtility.confirm({
            title: 'Delete Multiple Items',
            content: 'Are you sure you want to permanently delete these items?',
            width: '300px',
            position: { X: 'center', Y: 'center' }
        });
    }
</script>
```

---

## Prompt Position

```csharp
@* Prompt Button *@
<button class="e-btn e-primary" onclick="showPrompt()">Prompt</button>

<script>
    function showPrompt() {
        ej.popups.DialogUtility.confirm({
            title: 'Join Chat Group',
            width: '300px',
            content: '<p>Enter your name:</p><input type="text" class="e-input" placeholder="Type here.." />',
            position: { X: 'center', Y: 'center' }
        });
    }
</script>
```
