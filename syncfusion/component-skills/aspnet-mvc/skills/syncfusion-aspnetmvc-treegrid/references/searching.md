# Searching in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Enable Search](#enable-search)
- [Search Behavior](#search-behavior)
- [Search Hierarchy Modes](#search-hierarchy-modes)
- [Search Options](#search-options)
- [Search Events](#search-events)
- [Search with Other Features](#search-with-other-features)

## When to Use This

Use search features when you need to:
- Provide quick text-based search across all columns
- Enable users to find records without complex filters
- Search within hierarchical data structures
- Implement real-time search with debouncing
- Highlight matching records in the grid

## Enable Search

### Add Search Box

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSearching(true)
    .Toolbar(new List<string> { "Search" })
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").AllowSearching(true).Add();
        col.Field("Description").HeaderText("Description").Width("300").AllowSearching(true).Add();
        col.Field("StartDate").HeaderText("Start").Type("date").Format("yMd").Width("120").Add();
    })
    .Render()
```

## Search Behavior

### Default Search

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSearching(true)
    .SearchSettings(search =>
    {
        search.HierarchyMode(SearchHierarchyMode.Parent)  // Parent, Child, Both
              .IgnoreCase(true)                           // Case-insensitive
              .Key("project");                            // Initial search value
    })
    .Toolbar(new List<string> { "Search" })
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").AllowSearching(true).Add();
        col.Field("Category").Width("150").AllowSearching(true).Add();
    })
    .Render()
```

### Programmatic Search

```html
<input type="text" id="searchBox" placeholder="Search...">
<button onclick="performSearch()">Search</button>

@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSearching(true)
    .ActionBegin("onSearch")
    .Render()

<script>
function performSearch() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var searchValue = document.getElementById('searchBox').value;
    
    grid.search(searchValue);
    console.log("Searching for: " + searchValue);
}

function onSearch(args) {
    if (args.requestType === 'searching') {
        console.log("Search started for: " + args.searchString);
    }
}
</script>
```

## Search Hierarchy Modes

### Parent Mode

Shows parent rows whose descendants match search:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSearching(true)
    .SearchSettings(search =>
    {
        search.HierarchyMode(SearchHierarchyMode.Parent);
    })
    .Toolbar(new List<string> { "Search" })
    .Render()
```

**Example Result:**
```
Parent Task (matches) - Shown
├─ Child 1 (matches) - Shown
├─ Child 2 (no match) - Shown with parent
└─ Child 3 (no match) - Shown with parent
```

### Child Mode

Shows only child rows that match:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSearching(true)
    .SearchSettings(search =>
    {
        search.HierarchyMode(SearchHierarchyMode.Child);
    })
    .Toolbar(new List<string> { "Search" })
    .Render()
```

### Both Mode

Shows parent and child rows that match:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSearching(true)
    .SearchSettings(search =>
    {
        search.HierarchyMode(SearchHierarchyMode.Both);
    })
    .Toolbar(new List<string> { "Search" })
    .Render()
```

## Search Options

### Custom Search Columns

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSearching(true)
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").AllowSearching(false).Width("80").Add();
        col.Field("TaskName").HeaderText("Task").AllowSearching(true).Width("200").Add();
        col.Field("Description").HeaderText("Desc").AllowSearching(true).Width("300").Add();
        col.Field("InternalNotes").HeaderText("Notes").AllowSearching(false).Width("200").Add();
    })
    .Toolbar(new List<string> { "Search" })
    .Render()
```

### Real-time Search

```html
<input type="text" id="realtimeSearch" placeholder="Type to search..."
       oninput="performRealtimeSearch(this.value)">

@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSearching(true)
    .ActionComplete("onSearchComplete")
    .Render()

<script>
var searchTimeout;

function performRealtimeSearch(value) {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(function() {
        var grid = document.getElementById('TreeGrid').ej2_instances[0];
        grid.search(value);
    }, 300);  // Debounce 300ms
}

function onSearchComplete(args) {
    if (args.requestType === 'searching') {
        console.log("Search results updated");
        var grid = document.getElementById('TreeGrid').ej2_instances[0];
        var records = grid.getCurrentViewRecords();
        console.log("Found " + records.length + " matches");
    }
}
</script>
```

## Search Events

### ActionBegin Event

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSearching(true)
    .ActionBegin("beforeSearch")
    .Toolbar(new List<string> { "Search" })
    .Render()

<script>
function beforeSearch(args) {
    if (args.requestType === 'searching') {
        var searchText = args.searchString;
        
        // Validate search
        if (searchText.length < 3) {
            args.cancel = true;
            alert('Search must be at least 3 characters');
        }
        
        console.log("Searching for: " + searchText);
    }
}
</script>
```

### ActionComplete Event

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSearching(true)
    .ActionComplete("afterSearch")
    .Render()

<script>
function afterSearch(args) {
    if (args.requestType === 'searching') {
        var grid = document.getElementById('TreeGrid').ej2_instances[0];
        var resultCount = grid.getCurrentViewRecords().length;
        
        console.log("Search complete. Results: " + resultCount);
        
        // Update UI with result count
        document.getElementById('resultInfo').innerText = 
            "Found " + resultCount + " results";
    }
}
</script>
```

## Search with Other Features

### Search + Filter

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSearching(true)
    .AllowFiltering(true)
    .FilterSettings(filter => filter.Type(FilterType.FilterBar))
    .Toolbar(new List<string> { "Search" })
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").AllowSearching(true).AllowFiltering(true).Add();
        col.Field("Priority").Width("100").AllowFiltering(true).Add();
        col.Field("StartDate").Type("date").Format("yMd").Width("120").Add();
    })
    .Render()
```

**Behavior:**
- Search: Searches all searchable columns
- Filter: Filters specific column by condition
- Combined: First filtered, then searched

### Search + Paging

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSearching(true)
    .AllowPaging(true)
    .PageSettings(ps => ps.PageSize(10))
    .Toolbar(new List<string> { "Search" })
    .Render()
```

**Behavior:**
- Search results paginated
- Pager shows filtered record count
