# Clipboard Actions in ASP.NET Core Scheduler

## Table of Contents
- [Overview](#overview)
- [Clipboard Methods](#clipboard-methods)
- [Clipboard Scenarios](#clipboard-scenarios)

---

## Overview

The Syncfusion ASP.NET Core Scheduler provides built-in clipboard support that allows users to **cut**, **copy**, and **paste** appointments between time slots, dates, or even different Scheduler instances. When the `allowClipboard` is set to `true`, the Scheduler exposes the `cut`, `copy`, and `paste` methods on its instance.

### Configure Clipboard Actions

```cshtml
<ejs-schedule id="Schedule" 
              width="100%" 
              height="550px" 
              currentView="Week" 
              selectedDate="new DateTime(DateTime.Today.Year, 1, 10)" 
              allowClipboard="true" 
              showQuickInfo="false">
    <e-schedule-views>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
        <e-schedule-view option="TimelineWeek"></e-schedule-view>
        <e-schedule-view option="TimelineWorkWeek"></e-schedule-view>
        <e-schedule-view option="TimelineMonth"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="@appointments"></e-schedule-eventsettings>
</ejs-schedule>

```

---

## Clipboard Methods

The Scheduler exposes three public methods for clipboard operations. These can be called from JavaScript on the Scheduler's client-side instance.

| Method | Signature | Description |
|--------|-----------|-------------|
| `cut` | `cut(elements)` | Cuts the selected appointment(s) into the clipboard. Removes the original event after a successful paste. |
| `copy` | `copy(elements)` | Copies the selected appointment(s) into the clipboard without removing the original. |
| `paste` | `paste(targetElement)` | Pastes the clipboard content into the target cell/date passed as argument. |

### Method Parameters

- `elements` (cut, copy): An array of DOM elements representing the appointments to cut or copy. Typically the appointment wrapper elements retrieved using `ej.base.closest`.
- `targetElement` (paste): The DOM element representing the destination cell (work cell, all-day cell, or date header) where the clipboard content should be pasted.

### Clipboard Method Examples

```javascript
var scheduleObj = document.getElementById('Schedule').ej2_instances[0];
var appointmentElement = document.querySelector('.e-appointment');
var targetElement = document.querySelector('.e-work-cells');

// Cut appointment into clipboard
scheduleObj.cut([appointmentElement]);

// Copy appointment into clipboard
scheduleObj.copy([appointmentElement]);

// Paste clipboard content at target cell
scheduleObj.paste(targetElement);
```

---

## Clipboard Scenarios

| Use Case | Recommended Method(s) | Description |
|----------|----------------------|-------------|
| Move an appointment | `cut()` + `paste()` | Move an event from one slot to another without recreating it |
| Duplicate an appointment | `copy()` + `paste()` | Create a duplicate event at a new location |
| Replicate across dates | `copy()` + `paste()` repeatedly | Copy once and paste multiple times to different dates |
| Move across views | `cut()` + `paste()` | Cut from a Week view and paste into a Timeline view |
| Move between Schedulers | `cut()` / `copy()` + `paste()` | Use clipboard actions between separate Scheduler instances on the same page |
