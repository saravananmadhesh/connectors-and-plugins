# Loading Animation — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Indicator Types](#indicator-types)
- [Configure Loading Indicator](#configure-loading-indicator)
- [Programmatic Spinner Control](#programmatic-spinner-control)

---

## Overview

The loading indicator provides visual feedback while the Gantt chart is fetching data or performing actions such as sorting and filtering. The default spinner displays automatically during remote data operations.

---

## Indicator Types

| Type | Description |
|------|-------------|
| `Spinner` | Default circular spinner shown during data load (default) |
| `Shimmer` | Skeleton shimmer effect — shows placeholder rows matching the layout |

The Shimmer indicator is recommended when using virtual scrolling, as it provides a better visual experience during scroll-triggered data fetches.

---

## Configure Loading Indicator

Use the `loadingIndicator` property with `indicatorType` set to `"Shimmer"` or `"Spinner"`:

```cshtml
@* Shimmer indicator — recommended with virtual scrolling *@
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource"
           enableVirtualization="true"
           height="600px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-loadingindicator indicatorType="Shimmer">
    </e-gantt-loadingindicator>
</ejs-gantt>
```

```cshtml
@* Explicit Spinner indicator (also the default) *@
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        duration="Duration" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-loadingindicator indicatorType="Spinner">
    </e-gantt-loadingindicator>
</ejs-gantt>
```

---

## Programmatic Spinner Control

Show and hide the spinner manually — useful when triggering async operations (e.g., custom data refresh) outside of built-in Gantt actions:

```cshtml
<button onclick="refreshData()">Refresh Data</button>

<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    ...
</ejs-gantt>

<script>
function refreshData() {
    var ganttObj = document.getElementById('Gantt').ej2_instances[0];

    ganttObj.showSpinner();

    // Simulate async operation (e.g., fetch updated data)
    setTimeout(function () {
        // Update data source or perform action
        ganttObj.dataSource = newData;
        ganttObj.hideSpinner();
    }, 2000);
}
</script>
```

> `showSpinner()` and `hideSpinner()` are instance methods on the Gantt object. The spinner displayed is the same type as configured by `loadingIndicator.indicatorType`.
