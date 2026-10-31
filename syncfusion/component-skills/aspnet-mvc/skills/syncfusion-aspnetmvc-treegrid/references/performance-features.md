# Performance Features in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Virtual Scrolling](#virtual-scrolling)
- [Lazy Loading](#lazy-loading)
- [Infinite Scrolling](#infinite-scrolling)
- [Fixed Row Height](#fixed-row-height)
- [Caching Strategies](#caching-strategies)
- [Batch Operations](#batch-operations)
- [Immutable Mode](#immutable-mode)
- [Performance Monitoring](#performance-monitoring)

## When to Use This

Use performance features when you need to:
- Handle large hierarchical datasets (10,000+ records)
- Improve initial load time and rendering speed
- Reduce memory consumption for deep tree structures
- Load child data on-demand as users expand nodes
- Optimize batch editing operations
- Monitor and measure grid performance

## Virtual Scrolling

### Enable Virtual Rendering

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EnableVirtualization(true)          // Enable virtual rendering
    .Height("500px")
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
        col.Field("Duration").HeaderText("Duration").Width("100").Add();
    })
    .Render()
```

**Benefits:**
- Renders only visible rows (~30-50 rows at a time)
- Handles 100,000+ rows smoothly
- Reduces DOM elements drastically
- Memory efficient

## Lazy Loading

### Load Child Data On Demand

When expanding a parent row, load child data from server:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .ChildMapping("Children")
    .ExpandStateMapping("IsExpanded")
    .Expanding("onExpanding")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function onExpanding(args) {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    // Only fetch if children not already loaded
    if (!args.data.Children || args.data.Children.length === 0) {
        grid.showSpinner();
        
        fetch('/api/tasks/' + args.data.TaskID + '/children')
            .then(response => response.json())
            .then(data => {
                args.data.Children = data;
                grid.refresh();
                grid.hideSpinner();
            })
            .catch(error => {
                grid.hideSpinner();
                console.log('Error loading children:', error);
            });
    }
}
</script>
```

## Infinite Scrolling

### Append Rows as User Scrolls

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .PageSettings(ps => ps.PageSize(50))
    .Height("500px")
    .ActionComplete("onPageLoad")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
var isLoading = false;

window.addEventListener('scroll', function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        if (!isLoading) {
            loadNextPage();
        }
    }
});

function loadNextPage() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var currentPage = grid.pageSettings.currentPage;
    var totalPages = Math.ceil(grid.pageSettings.totalRecordsCount / grid.pageSettings.pageSize);
    
    if (currentPage < totalPages) {
        isLoading = true;
        grid.goToPage(currentPage + 1);
    }
}

function onPageLoad(args) {
    isLoading = false;
}
</script>
```

## Fixed Row Height

### Set Fixed Row Height for Performance

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EnableVirtualization(true)
    .Height("500px")
    .RowHeight(32)                  // Fixed row height improves performance
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()
```

**Benefits of Fixed Height:**
- Virtual scroll calculates visible rows precisely
- No layout recalculation
- Better performance
- Predictable scrolling

## Caching Strategies

### Cache Server Data

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ds => ds
        .Url("/api/tasks")
        .Adaptor("UrlAdaptor")
    )
    .AllowPaging(true)
    .PageSettings(ps => ps.PageSize(50))
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
var dataCache = {};

// Cache pages in memory
function cachePageData(pageNumber, data) {
    dataCache['page_' + pageNumber] = data;
}

function getFromCache(pageNumber) {
    return dataCache['page_' + pageNumber];
}

function clearCache() {
    dataCache = {};
}
</script>
```

**Server-side Caching (C#):**
```csharp
public IActionResult GetTasks(int skip = 0, int take = 50)
{
    var cacheKey = $"tasks_page_{skip}_{take}";
    
    if (!_cache.TryGetValue(cacheKey, out List<Task> tasks))
    {
        tasks = _context.Tasks
            .Skip(skip)
            .Take(take)
            .ToList();
        
        _cache.Set(cacheKey, tasks, TimeSpan.FromMinutes(30));
    }
    
    return Ok(tasks);
}
```

## Batch Operations

### Batch Edit Performance

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .AllowSorting(true)
    .AllowFiltering(true)
    .EditSettings(edit =>
    {
        edit.AllowEditing(true)
           .Mode(EditMode.Batch);       // Batch mode = updated in memory
    })
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
        col.Field("Status").Width("120").Add();
    })
    .Render()
```

**Benefits:**
- Multiple changes stored in memory
- Single save to server
- Better performance than inline editing
- Group related changes

## Immutable Mode

### Enable Immutable Rendering

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EnableImmutableMode(true)       // Immutable rendering
    .Height("500px")
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()
```

**Immutable Mode Benefits:**
- Data changes don't trigger full grid re-render
- Only changed rows re-render
- Preserves scroll position
- Faster updates to specific records

## Performance Monitoring

### Monitor Grid Performance

```html
<button onclick="showPerformanceMetrics()">Performance Metrics</button>

<script>
var metrics = {
    renderStart: 0,
    renderEnd: 0
};

function showPerformanceMetrics() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    var recordCount = grid.getCurrentViewRecords().length;
    var startTime = performance.now();
    
    grid.refresh();
    
    var endTime = performance.now();
    var renderTime = endTime - startTime;
    
    console.log("Records rendered: " + recordCount);
    console.log("Render time: " + renderTime.toFixed(2) + "ms");
    console.log("Records per ms: " + (recordCount / renderTime).toFixed(2));
    
    alert("Performance Metrics:\n" +
          "Records: " + recordCount + "\n" +
          "Render time: " + renderTime.toFixed(2) + "ms\n" +
          "Performance: " + (recordCount / renderTime).toFixed(2) + " records/ms");
}
</script>
```
