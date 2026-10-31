# Searching

## Table of Contents

- [Enable Search Toolbar](#enable-search-toolbar)
- [Search Operators](#search-operators)
- [Programmatic Search](#programmatic-search)
- [Search Specific Columns](#search-specific-columns)
- [Initial Search on Render](#initial-search-on-render)

## When to Use This Skill

Use this reference when you need to:
- Enable full-text search across TreeGrid data
- Allow users to filter by typing in search box
- Search specific columns only (not all columns)
- Apply different search operators (contains, startsWith, endsWith, equal)
- Pre-populate search filters on page load
- Trigger search programmatically via JavaScript
- Configure search case sensitivity
- Show search results in real-time as user types

---

## Enable Search Toolbar

Add `"Search"` to the toolbar for full-text search across all columns.

**Basic search with toolbar:**
```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" height="270"
              toolbar="@(new List<string>() { "Search" })"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" textAlign="Right" width="100"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" textAlign="Right" format="yMd" type="date" width="120"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Controller:**
```csharp
public IActionResult SearchingExample()
{
    ViewBag.datasource = TreeData.GetDefaultData();
    return View();
}
```

**Result:** A search textbox appears in the toolbar. User types to filter rows in real-time.

---

## Search Operators

Control how search terms are matched with operators.

| Operator | Description | Example |
|----------|-------------|---------|
| `contains` (default) | Value contains the key anywhere | Search "plan" → matches "Task Plan", "Planning" |
| `startsWith` | Value begins with the key | Search "Task" → matches "Task Name", "Task ID" |
| `endsWith` | Value ends with the key | Search "ing" → matches "Planning", "Meeting" |
| `equal` | Value equals the key exactly | Search "Planning" → matches only "Planning" |
| `notEqual` | Value does not equal the key | Search "Done" → matches all except "Done" |

**Set search operator:**
```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" height="270"
              toolbar="@(new List<string>() { "Search" })"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-searchSettings operator="startsWith"></e-treegrid-searchSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Programmatic Search

Trigger search via JavaScript method.

**Basic programmatic search:**
```javascript
var treegrid = document.getElementById("TreeGrid").ej2_instances[0];
treegrid.search("plan");  // Searches all columns for "plan"
```

**With specific operator:**
```javascript
var treegrid = document.getElementById("TreeGrid").ej2_instances[0];
treegrid.searchSettings.operator = "startsWith";
treegrid.search("Task");
```

**Clear search:**
```javascript
var treegrid = document.getElementById("TreeGrid").ej2_instances[0];
treegrid.search("");  // Shows all rows
```

---

## Search Specific Columns

Limit search to particular columns instead of all columns.

**Search only TaskName and Priority:**
```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" height="270"
              toolbar="@(new List<string>() { "Search" })"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-searchSettings fields="@(new string[] { "TaskName", "Priority" })" 
                               operator="contains">
    </e-treegrid-searchSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" textAlign="Right" width="100"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Priority" headerText="Priority" width="110"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Result:** Search only looks in TaskName and Priority columns, ignoring TaskId and Duration.

---

## Initial Search on Render

Pre-populate search filter when grid first loads.

**Initial search for "plan" with case-insensitive matching:**
```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" height="270"
              toolbar="@(new List<string>() { "Search" })"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-searchSettings fields="@(new string[] { "TaskName" })"
                               operator="contains" 
                               key="plan" 
                               ignoreCase="true">
    </e-treegrid-searchSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" textAlign="Right" width="100"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Result:** Grid loads filtered to show only rows containing "plan" (case-insensitive).

**Use case:** Deep-link URLs with search parameters: `?search=plan` → pre-filter grid on page load.
