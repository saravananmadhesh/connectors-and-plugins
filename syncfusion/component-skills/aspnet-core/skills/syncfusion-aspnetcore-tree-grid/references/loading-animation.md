# Loading Animation — Syncfusion ASP.NET Core TreeGrid

## Table of Contents
- [Overview](#overview)
- [Loading Indicator Types](#loading-indicator-types)
- [Spinner Indicator](#spinner-indicator)
- [Shimmer Indicator](#shimmer-indicator)
- [When Loading Animation Displays](#when-loading-animation-displays)
- [Remote Data Binding with Loading Animation](#remote-data-binding-with-loading-animation)
- [Customizing Loading Indicator](#customizing-loading-indicator)

## Overview

The TreeGrid displays a loading indicator while data is being fetched and bound during initial rendering, refreshing, and after performing TreeGrid actions like sorting, filtering, paging, and searching. This provides visual feedback to users that data is being loaded.

The TreeGrid supports two indicator types that can be enabled by setting the `loadingIndicator.indicatorType` property:
- **Spinner** (default) — Rotating spinner animation
- **Shimmer** — Skeleton loading animation that simulates content loading

---

## Loading Indicator Types

### Spinner Indicator (Default)

The Spinner indicator type displays a rotating spinner, ideal for short loading times. This is the default behavior.

**TagHelper:**
```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.DataSource"
              childMapping="Children" treeColumnIndex="1"
              height="400" allowPaging="true" allowSorting="true" allowFiltering="true">
    <e-treegrid-loadingIndicator indicatorType="Spinner"></e-treegrid-loadingIndicator>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" 
                           textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="240"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" 
                           format="yMd" type="date" width="140"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" 
                           textAlign="Right" width="130"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**C# Controller:**
```csharp
public IActionResult SpinnerLoading()
{
    var data = TreeData.GetTreeData();
    ViewBag.DataSource = data;
    return View();
}
```

---

## Shimmer Indicator

The Shimmer indicator type displays a skeleton loading animation that mimics the layout of content being loaded. This provides better UX perception for longer loading times and is especially effective with remote data.

**TagHelper:**
```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.DataSource"
              childMapping="Children" treeColumnIndex="1"
              height="400" allowPaging="true" allowSorting="true" allowFiltering="true">
    <e-treegrid-loadingIndicator indicatorType="Shimmer"></e-treegrid-loadingIndicator>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" 
                           textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="240"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" 
                           format="yMd" type="date" width="140"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" 
                           textAlign="Right" width="130"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

> The Shimmer indicator is most noticeable when using remote data binding with throttled/slow connections. It renders fake rows with placeholder animations to improve perceived performance.

---

## When Loading Animation Displays

The loading indicator is automatically displayed during these TreeGrid operations:

| Scenario | Description |
|---|---|
| **Initial Rendering** | When TreeGrid first loads data on page load |
| **Data Refresh** | When explicitly refreshing the TreeGrid via `refresh()` |
| **Paging** | When navigating to a different page |
| **Sorting** | When sorting columns (especially with remote data) |
| **Filtering** | When applying or clearing filters |
| **Searching** | When performing search operations |
| **Column Operations** | When resizing, reordering, or hiding columns with remote data |

---

## Remote Data Binding with Loading Animation

Loading animation is particularly useful when binding remote data via `DataManager`. The indicator shows while data is being fetched from the server.

**TagHelper with WebAPI DataManager:**
```cshtml
<ejs-treegrid id="TreeGrid" 
              idMapping="TaskID" 
              parentIdMapping="ParentItem" 
              hasChildMapping="isParent"
              treeColumnIndex="1"
              height="400" 
              allowPaging="true" 
              allowSorting="true"
              allowFiltering="true">
    <e-treegrid-pagesettings pageSize="10"></e-treegrid-pagesettings>
    <e-treegrid-loadingIndicator indicatorType="Shimmer"></e-treegrid-loadingIndicator>
    <e-data-manager url="url" 
                    adaptor="WebApiAdaptor" 
                    crossDomain="true">
    </e-data-manager>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskID" headerText="Task ID" 
                           textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="240"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" 
                           format="yMd" type="date" width="140"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" 
                           textAlign="Right" width="130"></e-treegrid-column>
        <e-treegrid-column field="Progress" headerText="Progress" width="130"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**C# Controller:**
```csharp
public IActionResult RemoteDataLoading()
{
    // No need to pass data for remote binding
    return View();
}
```

---

## Customizing Loading Indicator

### Show/Hide Loading Indicator Programmatically

```javascript
var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];

// Show loading indicator
treeGrid.showSpinner();

// Hide loading indicator
treeGrid.hideSpinner();
```

### Custom Loading Behavior on Events

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.DataSource"
              childMapping="Children" treeColumnIndex="1"
              actionBegin="onActionBegin"
              actionComplete="onActionComplete">
    <e-treegrid-loadingIndicator indicatorType="Shimmer"></e-treegrid-loadingIndicator>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="120"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="240"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
function onActionBegin(args) {
    // Show loading indicator before action
    if (args.requestType === 'sorting' || args.requestType === 'filtering') {
        console.log('Action starting:', args.requestType);
    }
}

function onActionComplete(args) {
    // Hide loading indicator after action
    if (args.requestType === 'sorting' || args.requestType === 'filtering') {
        console.log('Action completed:', args.requestType);
    }
}
</script>
```

### Disable Loading Indicator for Specific Actions

```javascript
var treeGrid = document.getElementById('TreeGrid').ej2_instances[0];

// Disable loading indicator
treeGrid.hideSpinner();

// Perform TreeGrid operation
treeGrid.sortColumn('TaskName', 'Ascending');
```

---

## Best Practices

1. **Shimmer for Slow Networks**: Use Shimmer indicator when expecting longer load times (e.g., remote API calls)
2. **Spinner for Fast Local Data**: Use Spinner (default) for local data or cached data
3. **Test User Experience**: Verify indicator visibility and responsiveness on target devices
4. **Accessibility**: Ensure loading states don't block keyboard navigation
5. **Hierarchy Awareness**: Loading animation displays for both root and child data loading
6. **Mobile Optimization**: Shimmer animation works well on mobile devices with poor connectivity

---

