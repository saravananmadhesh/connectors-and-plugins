# Paging in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Enable Paging](#enable-paging)
- [Page Size Modes](#page-size-modes)
- [Paging Configuration](#paging-configuration)
- [Paging Events](#paging-events)
- [Programmatic Paging](#programmatic-paging)

## When to Use This

Use paging features when you need to:
- Display large datasets in manageable chunks
- Improve initial page load performance
- Provide navigation controls for users
- Control how many records appear per page
- Implement server-side paging for better scalability

## Enable Paging

### Basic Paging

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .PageSettings(ps =>
    {
        ps.PageSize(12)                          // Records per page
          .PageSizeMode(PageSizeMode.All);       // All or Root
    })
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
        col.Field("Duration").HeaderText("Duration").Width("100").Add();
    })
    .Render()
```

## Page Size Modes

### All Mode (Default)

Counting all records including children:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .PageSettings(ps =>
    {
        ps.PageSize(12)
          .PageSizeMode(PageSizeMode.All);  // Count all records
    })
    .Render()
```

**Example:**
- Parent 1 (1 record) + 5 children (5 records) = 6 total on page
- Parent 2 (1 record) + 7 children (7 records) = 8 total on page
- Page size 12 fits both parent records and all their children

### Root Mode

Counting only root-level (parent) records:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .PageSettings(ps =>
    {
        ps.PageSize(5)
          .PageSizeMode(PageSizeMode.Root);  // Count parent records only
    })
    .Render()
```

**Example:**
- Page 1: Parent 1, Parent 2, Parent 3, Parent 4, Parent 5
- All children of each parent shown expanded

## Paging Configuration

### Page Size Dropdown

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .PageSettings(ps =>
    {
        ps.PageSize(10)
          .PageSizeMode(PageSizeMode.All)
          .PageSizes(new int[] { 5, 10, 20, 50 });  // Dropdown options
    })
    .Toolbar(new List<string> { "PageSizes" })
    .Render()
```

### Initial Page

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .PageSettings(ps =>
    {
        ps.PageSize(10)
          .CurrentPage(2);  // Start on page 2
    })
    .Render()
```

## Paging Events

### ActionBegin - Before Paging

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .ActionBegin("beforePaging")
    .Render()

<script>
function beforePaging(args) {
    if (args.requestType === 'paging') {
        console.log("Moving to page: " + args.currentPage);
        
        // Load page data if needed
        // args.cancel = true; // Prevent paging
    }
}
</script>
```

### ActionComplete - After Paging

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .ActionComplete("afterPaging")
    .Render()

<script>
function afterPaging(args) {
    if (args.requestType === 'paging') {
        var grid = document.getElementById('TreeGrid').ej2_instances[0];
        console.log("Page " + grid.pageSettings.currentPage + " loaded");
        console.log("Records on page: " + grid.getCurrentViewRecords().length);
    }
}
</script>
```

## Programmatic Paging

### Navigate Pages

```html
<button onclick="goToPage(1)">First</button>
<button onclick="goToPreviousPage()">Previous</button>
<button onclick="goToNextPage()">Next</button>
<button onclick="goToLastPage()">Last</button>

<script>
function goToPage(pageNumber) {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.goToPage(pageNumber);
    console.log("Navigated to page: " + pageNumber);
}

function goToPreviousPage() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var currentPage = grid.pageSettings.currentPage;
    if (currentPage > 1) {
        grid.goToPage(currentPage - 1);
    }
}

function goToNextPage() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var pageCount = Math.ceil(grid.pageSettings.totalRecordsCount / grid.pageSettings.pageSize);
    var currentPage = grid.pageSettings.currentPage;
    if (currentPage < pageCount) {
        grid.goToPage(currentPage + 1);
    }
}

function goToLastPage() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var pageCount = Math.ceil(grid.pageSettings.totalRecordsCount / grid.pageSettings.pageSize);
    grid.goToPage(pageCount);
}
</script>
```

### Get Current Page Info

```html
<button onclick="showPageInfo()">Show Info</button>

<script>
function showPageInfo() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var pageSettings = grid.pageSettings;
    
    console.log("Current Page: " + pageSettings.currentPage);
    console.log("Page Size: " + pageSettings.pageSize);
    console.log("Total Records: " + pageSettings.totalRecordsCount);
    console.log("Total Pages: " + Math.ceil(pageSettings.totalRecordsCount / pageSettings.pageSize));
    console.log("Records on this page: " + grid.getCurrentViewRecords().length);
}
</script>
```
