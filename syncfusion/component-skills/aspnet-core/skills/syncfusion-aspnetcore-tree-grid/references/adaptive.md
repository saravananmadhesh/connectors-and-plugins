# Adaptive Layout — Syncfusion ASP.NET Core TreeGrid

## Table of Contents
- [Enable Adaptive UI](#enable-adaptive-ui)
- [Adaptive Dialog Mode](#adaptive-dialog-mode)
- [Expansion Behavior in Adaptive Mode](#expansion-behavior-in-adaptive-mode)
- [Pager Position](#pager-position)
- [Column Chooser in Adaptive Mode](#column-chooser-in-adaptive-mode)

## When to Use This

- Create responsive TreeGrids for mobile, tablet, and desktop devices
- Automatically adapt layout and interactions based on screen size
- Optimize user experience for touch-friendly interfaces on mobile devices
- Enable hierarchical data exploration on small screens
- Improve accessibility on various device types

---

## Enable Adaptive UI

Enable adaptive/responsive rendering for mobile and small screens with `enableAdaptiveUI="true"`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.DataSource"
              childMapping="Children" treeColumnIndex="1"
              allowSorting="true" allowFiltering="true" allowPaging="true"
              enableAdaptiveUI="true">
    <e-treegrid-pagesettings pageSize="5"></e-treegrid-pagesettings>
    <e-treegrid-filtersettings type="Excel"></e-treegrid-filtersettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" isPrimaryKey="true" width="120"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="150"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

When adaptive UI is active:
- Columns not visible in the viewport are hidden automatically
- A filter icon appears in the header to open filter dialogs
- Sorting is handled via column header tap/click
- Expand/collapse icons remain touch-friendly
- Editing opens in a full-screen dialog
- Paging controls adapt to the smaller screen size

---

## Adaptive Dialog Mode

In adaptive mode, filtering and editing open as dialog popups (full screen on mobile):

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.DataSource"
              childMapping="Children" treeColumnIndex="1"
              enableAdaptiveUI="true" allowFiltering="true">
    <e-treegrid-filtersettings type="Excel"></e-treegrid-filtersettings>
    <e-treegrid-editSettings allowEditing="true" allowAdding="true" 
                             allowDeleting="true" mode="Dialog"></e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" isPrimaryKey="true" width="120"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="150"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

> Excel-like filter type (`type="Excel"`) is recommended for adaptive mode as it renders better on small screens and supports hierarchical filtering (`filterHierarchyMode`).

---

## Expansion Behavior in Adaptive Mode

Expand and collapse actions remain fully functional in adaptive mode but are optimized for touch interaction:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.DataSource"
              childMapping="Children" treeColumnIndex="1"
              enableAdaptiveUI="true"
              allowPaging="true">
    <e-treegrid-pagesettings pageSize="5"></e-treegrid-pagesettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" isPrimaryKey="true" width="100"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="150"></e-treegrid-column>
        <e-treegrid-column field="Progress" headerText="Progress" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Expand/Collapse Features in Adaptive Mode:**
- Expand/collapse icons are larger and easier to tap on mobile devices
- Child rows display in a stacked/card-like format on very small screens
- Parent-child relationships remain intact with proper visual hierarchy
- Expand state is preserved when filtering or searching
- Use `expandCtrlClick` to control whether Ctrl+Click expands rows (useful on desktop)

---

## Pager Position

In adaptive mode, the pager can be repositioned and the row display can be optimized with `rowRenderingMode`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.DataSource"
              childMapping="Children" treeColumnIndex="1"
              enableAdaptiveUI="true" allowPaging="true"
              rowRenderingMode="Vertical">
    <e-treegrid-pagesettings pageSize="5"></e-treegrid-pagesettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" isPrimaryKey="true" width="100"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="150"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

`rowRenderingMode` options:
- `Horizontal` (default) — normal row layout with expand/collapse arrows on the left
- `Vertical` — each row renders as a card-style vertical list, ideal for mobile viewing

> When using `rowRenderingMode="Vertical"`, the TreeGrid displays each record as a card with field names and values stacked vertically, making hierarchical data more readable on small screens.

---

## Column Chooser in Adaptive Mode

The Column Chooser also adapts to a dialog in adaptive mode, making it easy to show/hide columns on mobile:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.DataSource"
              childMapping="Children" treeColumnIndex="1"
              enableAdaptiveUI="true"
              showColumnChooser="true"
              toolbar="@(new List<string>() { "ColumnChooser" })">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" isPrimaryKey="true" width="100"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="150"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" width="120"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Column Chooser Features in Adaptive Mode:**
- Opens as a full-screen dialog on mobile
- Checkbox list of all columns for easy selection/deselection
- Search/filter within column choices
- Apply changes with a single tap
- Responsive design adapts to available space

---

## Best Practices for Adaptive TreeGrid

1. **Always set `childMapping`**: Ensure the property name exactly matches your data structure
2. **Use `treeColumnIndex`**: Specify which column displays the expand/collapse arrows
3. **Optimize column widths**: Set reasonable default widths; adaptive UI will hide columns as needed
4. **Excel filter type recommended**: Use `type="Excel"` for better mobile filter experience
5. **Test on multiple devices**: Use browser DevTools to test various screen sizes
6. **Consider touch targets**: Ensure expand/collapse buttons are large enough for touch interaction
7. **Responsive layout**: Embed the TreeGrid in a responsive container (e.g., Bootstrap grid)

---

## Example: Fully Responsive TreeGrid

```cshtml
<div class="container-fluid">
    <ejs-treegrid id="TreeGrid" dataSource="@ViewBag.TreeData"
                  childMapping="Children" treeColumnIndex="1"
                  allowSorting="true" allowFiltering="true" allowPaging="true"
                  enableAdaptiveUI="true"
                  showColumnChooser="true"
                  toolbar="@(new List<string>() { "ColumnChooser", "ExcelExport", "PdfExport" })">
        <e-treegrid-pagesettings pageSize="5" pageSizeMode="Root"></e-treegrid-pagesettings>
        <e-treegrid-filtersettings type="Excel" 
                                   hierarchyMode="Parent"></e-treegrid-filtersettings>
        <e-treegrid-editSettings allowAdding="true" allowEditing="true" 
                                 allowDeleting="true" mode="Dialog"></e-treegrid-editSettings>
        <e-treegrid-columns>
            <e-treegrid-column field="TaskId" headerText="ID" 
                               isPrimaryKey="true" width="80"></e-treegrid-column>
            <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
            <e-treegrid-column field="StartDate" headerText="Start Date" 
                               type="date" format="yMd" width="120"></e-treegrid-column>
            <e-treegrid-column field="Duration" headerText="Duration" width="100"></e-treegrid-column>
            <e-treegrid-column field="Progress" headerText="Progress" width="120"></e-treegrid-column>
        </e-treegrid-columns>
    </ejs-treegrid>
</div>
```

> Use adaptive UI when the TreeGrid is embedded in a responsive layout or displayed on mobile devices. It automatically adjusts interactions (filtering, editing, sorting, expanding/collapsing) to be touch-friendly and mobile-optimized.
