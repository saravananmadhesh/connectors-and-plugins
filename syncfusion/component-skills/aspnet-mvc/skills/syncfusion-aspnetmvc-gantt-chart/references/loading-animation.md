# Loading Animation — Syncfusion ASP.NET MVC Gantt Chart

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

Use the `LoadingIndicator` property with `IndicatorType` to configure the loading animation style:

```cshtml
@* Shimmer indicator — recommended with virtual scrolling *@
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .EnableVirtualization(true)
    .LoadingIndicator(li => li.IndicatorType(Syncfusion.EJ2.Gantt.IndicatorType.Shimmer))
    .Height("600px")
    .Render()
```

```cshtml
@* Explicit Spinner indicator (also the default) *@
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .LoadingIndicator(li => li.IndicatorType(Syncfusion.EJ2.Gantt.IndicatorType.Spinner))
    .Height("450px")
    .Render()
```

---

## Programmatic Spinner Control

Show and hide the spinner manually — useful when triggering async operations (e.g., custom data refresh) outside of built-in Gantt actions:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Height("450px")
    .Render()

<button onclick="refreshData()">Refresh Data</button>

<script>
function refreshData() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];

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

> `showSpinner()` and `hideSpinner()` are instance methods on the Gantt object. The spinner displayed is the same type as configured by `LoadingIndicator.IndicatorType`.
