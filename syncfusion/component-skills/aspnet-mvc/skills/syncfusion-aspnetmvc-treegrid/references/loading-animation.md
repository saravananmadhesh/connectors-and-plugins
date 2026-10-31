# Loading Animation in Tree Grid

## Table of Contents

- [When to Use This](#when-to-use-this)
- [Show Loading Indicator](#show-loading-indicator)
- [Spinner Customization](#spinner-customization)
- [Loading Delay](#loading-delay)
- [Data Loading States](#data-loading-states)
- [Refresh with Loading](#refresh-with-loading)
- [Initial Load Spinner](#initial-load-spinner)

## When to Use This

Use loading animations when you need to:
- Indicate data is being fetched from the server
- Show progress during long-running operations
- Prevent user interaction during processing
- Provide visual feedback for sorting, filtering, or paging
- Customize loading experience with branded spinners

## Show Loading Indicator

### Enable Loading Indicator

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .AllowSorting(true)
    .ChildMapping("Children")
    .ActionBegin("showLoadingIndicator")
    .ActionComplete("hideLoadingIndicator")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
    })
    .Render()

<script>
function showLoadingIndicator(args) {
    // Show loading indicator when action starts
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    if (args.requestType === 'sorting' || args.requestType === 'paging' || args.requestType === 'filtering') {
        grid.showSpinner();
    }
}

function hideLoadingIndicator(args) {
    // Hide loading indicator when action completes
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    if (args.requestType === 'sorting' || args.requestType === 'paging' || args.requestType === 'filtering') {
        grid.hideSpinner();
    }
}
</script>
```

## Spinner Customization

### Custom Spinner Icon

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .ActionBegin("onActionBegin")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function onActionBegin(args) {
    if (args.requestType === 'save' || args.requestType === 'delete') {
        var grid = document.getElementById('TreeGrid').ej2_instances[0];
        
        // Custom spinner HTML
        var customSpinner = '<div class="custom-spinner">' +
            '<i class="fas fa-spinner fa-spin"></i>' +
            '<p>Processing...</p>' +
            '</div>';
        
        grid.showSpinner();
    }
}
</script>

<style>
.custom-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #1f75c0;
}

.custom-spinner i {
    font-size: 32px;
    margin-bottom: 10px;
}

.custom-spinner p {
    margin: 0;
    font-weight: bold;
}
</style>
```

## Loading Delay

### Delay Loading Indicator

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .ActionBegin("onBeginAction")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
var loadingTimer;

function onBeginAction(args) {
    if (args.requestType === 'sorting') {
        var grid = document.getElementById('TreeGrid').ej2_instances[0];
        
        // Show spinner only if operation takes > 500ms
        loadingTimer = setTimeout(function() {
            grid.showSpinner();
        }, 500);
    }
}

var onCompleteAction = function(args) {
    if (args.requestType === 'sorting') {
        clearTimeout(loadingTimer);
        
        var grid = document.getElementById('TreeGrid').ej2_instances[0];
        grid.hideSpinner();
    }
};
</script>
```

## Data Loading States

### Show State During Data Fetch

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ds => ds
        .Url("/api/tasks")
        .Adaptor("UrlAdaptor")
    )
    .AllowPaging(true)
    .AllowSorting(true)
    .AllowFiltering(true)
    .ActionBegin("showLoading")
    .ActionComplete("hideLoading")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
        col.Field("Status").Width("120").Add();
    })
    .Render()

<script>
function showLoading(args) {
    if (args.requestType === 'sorting' || args.requestType === 'paging' || args.requestType === 'filtering') {
        // Add loading class
        document.getElementById('TreeGrid').classList.add('loading-state');
        
        var grid = document.getElementById('TreeGrid').ej2_instances[0];
        grid.showSpinner();
        
        console.log("Loading " + args.requestType);
    }
}

function hideLoading(args) {
    document.getElementById('TreeGrid').classList.remove('loading-state');
    
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.hideSpinner();
    
    console.log(args.requestType + " completed");
}
</script>

<style>
.loading-state {
    opacity: 0.6;
}

.loading-state .e-grid {
    pointer-events: none;
}
</style>
```

## Refresh with Loading

### Manual Data Refresh

```html
<button onclick="refreshData()">Refresh Data</button>

@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function refreshData() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    grid.showSpinner();
    
    // Simulate async data fetch
    setTimeout(function() {
        // Fetch new data from server
        fetch('/api/tasks')
            .then(r => r.json())
            .then(data => {
                grid.dataSource = data;
                grid.refresh();
                grid.hideSpinner();
                console.log("Data refreshed");
            })
            .catch(err => {
                grid.hideSpinner();
                alert("Error refreshing data: " + err);
            });
    }, 300);
}
</script>
```

## Initial Load Spinner

### Show Spinner While Grid Initializes

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Created("onGridCreated")
    .AllowPaging(true)
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
// Show spinner on page load
document.addEventListener('DOMContentLoaded', function() {
    // Simulate initial loading
    document.body.style.cursor = 'wait';
});

function onGridCreated(args) {
    document.body.style.cursor = 'default';
    console.log("Grid initialized");
}
</script>
```
