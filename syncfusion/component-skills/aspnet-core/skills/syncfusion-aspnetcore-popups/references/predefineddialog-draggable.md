# Draggable ASP.NET Core Predefined Dialogs

## Table of Contents
- [Overview](#overview)
- [Alert Dragging](#alert-dragging)
- [Confirm Dragging](#confirm-dragging)
- [Prompt Dragging](#prompt-dragging)

---

## Overview

Set `isDraggable: true` in the options object passed to `DialogUtility.alert()` or
`DialogUtility.confirm()` to allow users to drag the dialog by its header.

---

## Alert Dragging

```csharp
@* Alert Button *@
<button class="e-btn e-danger" onclick="showAlert()">Alert</button>

<script>
    function showAlert() {
        ej.popups.DialogUtility.alert({
            title: 'Low Battery',
            width: '250px',
            content: '10% of battery remaining',
            isDraggable: true
        });
    }
</script>
```

---

## Confirm Dragging

```csharp
@* Confirm Button *@
<button class="e-btn e-success" onclick="showConfirm()">Confirm</button>

<script>
    function showConfirm() {
        ej.popups.DialogUtility.confirm({
            title: 'Delete Multiple Items',
            content: 'Are you sure you want to permanently delete these items?',
            width: '300px',
            isDraggable: true
        });
    }
</script>
```

---

## Prompt Dragging

```csharp
@* Prompt Button *@
<button class="e-btn e-primary" onclick="showPrompt()">Prompt</button>

<script>
    function showPrompt() {
        ej.popups.DialogUtility.confirm({
            title: 'Join Chat Group',
            width: '300px',
            content: '<p>Enter your name:</p><input type="text" class="e-input" placeholder="Type here.." />',
            isDraggable: true
        });
    }
</script>
```
