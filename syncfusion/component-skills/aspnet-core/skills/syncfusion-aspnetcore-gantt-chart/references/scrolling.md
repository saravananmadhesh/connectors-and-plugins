````markdown
# Scrolling — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Set Width and Height](#set-width-and-height)
- [Responsive with Parent Container](#responsive-with-parent-container)
- [Scroll to a Specific Date](#scroll-to-a-specific-date)
- [Set Vertical Scroll Position](#set-vertical-scroll-position)

---

## Overview

The Gantt Chart displays scrollbars automatically when content exceeds the component's configured `width` or `height`.

| Scrollbar | When it appears |
|---|---|
| Vertical | Total row height exceeds the component height |
| Horizontal | Sum of column widths exceeds the grid pane width |

> **Note:** The default value for both `height` and `width` is `auto`.

---

## Set Width and Height

Use the `height` and `width` properties to define fixed pixel dimensions for the Gantt component. Setting explicit dimensions activates the scrollbars when content overflows.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" width="600px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

**Key properties:**

| Property | Type | Description |
|---|---|---|
| `height` | string/number | Height of the Gantt component (e.g., `"450px"`, `"100%"`) |
| `width` | string/number | Width of the Gantt component (e.g., `"600px"`, `"100%"`) |

---

## Responsive with Parent Container

Set `width` and `height` to `"100%"` to make the Gantt component fill its parent container. When using `height="100%"`, the parent element must have an explicit height defined.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="100%" width="100%">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true">
    </e-gantt-editsettings>
</ejs-gantt>
```

> Ensure the parent `<div>` has a CSS `height` set (e.g., `height: 600px`) so that `height="100%"` resolves correctly.

---

## Scroll to a Specific Date

Use the `scrollToDate` method to programmatically scroll the chart timeline (horizontal scroll) to a specific date. This is useful for navigating to a milestone or the current date after a user action.

**Syntax:**
```javascript
ganttObj.scrollToDate('MM/DD/YYYY');
```

**Example — Scroll to date on button click:**

```cshtml
<ejs-button id="scrollToDate" content="Change Scroll Position" cssClass="e-primary"></ejs-button>
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
          endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    document.getElementById('scrollToDate').addEventListener('click', function (args) {
        var ganttObj = document.getElementById('Gantt').ej2_instances[0];
        ganttObj.scrollToDate('05/20/2019');
    });
</script>
```

| Parameter | Type | Description |
|---|---|---|
| `date` | string | Target date in `MM/DD/YYYY` format to scroll the chart timeline to |

---

## Set Vertical Scroll Position

Use the `setScrollTop` method on the scroll object to set the vertical scroll position programmatically (in pixels). This is useful when you want to bring a specific row into view without selecting it.

**Syntax:**
```javascript
ganttObj.ganttChartModule.scrollObject.setScrollTop(pixels);
```

**Example — Set vertical scroll on button click:**

```cshtml
<ejs-button id="setScrollTop" content="Change Scroll Position" cssClass="e-primary"></ejs-button>
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
          endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    document.getElementById('setScrollTop').addEventListener('click', function (args) {
        var ganttObj = document.getElementById('Gantt').ej2_instances[0];
        ganttObj.ganttChartModule.scrollObject.setScrollTop(300);
    });
</script>
```

| Parameter | Type | Description |
|---|---|---|
| `pixels` | number | Number of pixels to scroll from the top of the chart area |

---
