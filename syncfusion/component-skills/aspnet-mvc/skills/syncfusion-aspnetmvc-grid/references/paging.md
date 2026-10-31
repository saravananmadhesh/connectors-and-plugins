# Paging in ASP.NET MVC Grid

Display grid data in pages to manage large datasets efficiently.

## When to Use This

Use this reference when you need to:
- Divide grid data into pages
- Configure page size and paging options
- Navigate between pages programmatically
- Enable page size dropdown
- Customize pager templates

## Table of Contents
- [Enable Paging](#enable-paging)
- [PageSettings Properties](#pagesettings-properties)
- [Page Size Dropdown](#page-size-dropdown)
- [Go to Page Programmatically](#go-to-page-programmatically)
- [Change Page Size Dynamically](#change-page-size-dynamically)
- [URL Query String](#url-query-string)
- [Custom Pager Template](#custom-pager-template)
- [Paging Events](#paging-events)
- [Full Example with Common Settings](#full-example-with-common-settings)

## Enable Paging

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowPaging(true)
    .PageSettings(page => page.PageSize(10))
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
    })
    .Render()
```

## PageSettings Properties

| Property | Default | Description |
|----------|---------|-------------|
| `PageSize(n)` | 12 | Number of records per page |
| `PageCount(n)` | 8 | Number of page links shown in pager |
| `CurrentPage(n)` | 1 | Initial active page |
| `PageSizes(bool/array)` | false | Show page size dropdown |
| `EnableQueryString(bool)` | false | Include page number in URL query string |
| `TotalRecordsCount(n)` | — | For server-side: total records in dataset |

## Page Size Dropdown

Show a dropdown to let users change the page size:

```cshtml
.PageSettings(page => page
    .PageSize(10)
    .PageSizes(true)   // shows ["All", "5", "10", "15", "20"]
)
```

Custom page size options:

```cshtml
.PageSettings(page => page
    .PageSize(10)
    .PageSizes(new string[] { "5", "10", "20", "50", "100" })
)
```

## Go to Page Programmatically

Use the `goToPage()` method to navigate to a specific page:

```javascript
function goToPage(pageNumber) {
    var grid = document.getElementById("Grid").ej2_instances[0];
    grid.goToPage(pageNumber);
}
```

## Change Page Size Dynamically

```javascript
function changePageSize(newSize) {
    var grid = document.getElementById("Grid").ej2_instances[0];
    grid.pageSettings.pageSize = newSize;
}
```

## URL Query String

Include the current page in the URL for bookmarking/sharing:

```cshtml
.PageSettings(page => page.PageSize(10).EnableQueryString(true))
```

URL becomes: `url/Index?page=3`

## Custom Pager Template

Replace the default pager with a custom UI:

```cshtml
@Html.EJS().Grid("Grid").AllowPaging(true)
    .PagerTemplate("#pagerTemplate")
    .PageSettings(page => page.PageSize(5))
    .Columns(col => { /* ... */ })
    .Render()

<script id="pagerTemplate" type="text/x-template">
    <div class="custom-pager">
        <button onclick="prevPage()">Previous</button>
        <span>${currentPage} of ${totalPage}</span>
        <button onclick="nextPage()">Next</button>
    </div>
</script>

<script>
function prevPage() {
    var grid = document.getElementById("Grid").ej2_instances[0];
    if (grid.pageSettings.currentPage > 1)
        grid.goToPage(grid.pageSettings.currentPage - 1);
}
function nextPage() {
    var grid = document.getElementById("Grid").ej2_instances[0];
    if (grid.pageSettings.currentPage < Math.ceil(grid.pageSettings.totalRecordsCount / grid.pageSettings.pageSize))
        grid.goToPage(grid.pageSettings.currentPage + 1);
}
</script>
```

## Paging Events

| Event | Description |
|-------|-------------|
| `ActionBegin` | Fires before page navigation (requestType: "paging") |
| `ActionComplete` | Fires after page navigation |

```javascript
function actionBegin(args) {
    if (args.requestType === 'paging') {
        console.log('Navigating to page:', args.currentPage);
    }
}
```

## Full Example with Common Settings

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowPaging(true)
    .AllowSorting(true)
    .PageSettings(page => page
        .PageSize(10)
        .PageCount(5)
        .CurrentPage(1)
        .PageSizes(new string[] { "5", "10", "20", "50" })
    )
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true).Width("120").Add();
        col.Field("CustomerID").HeaderText("Customer Name").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
        col.Field("OrderDate").HeaderText("Order Date").Format("yMd").Width("130").Add();
    })
    .Render()
```
