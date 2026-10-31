# Events and Error Handling

## Table of Contents
- [Event Overview](#event-overview)
- [Select Event](#select-event)
- [Scroll Event](#scroll-event)
- [Action Events](#action-events)
- [Error Handling Strategies](#error-handling-strategies)
- [Remote Data Failure](#remote-data-failure)
- [Event Binding Patterns](#event-binding-patterns)

## Event Overview

ListView exposes five core events for interaction monitoring:

| Event | When Fired | Common Use |
|-------|-----------|-----------|
| select | Item clicked or checkbox toggled | Handle selection |
| scroll | User scrolls within ListView | Dynamic loading |
| actionBegin | Before any action starts | Log/track actions |
| actionComplete | After action completes | Show success feedback |
| actionFailure | Remote data load fails | Handle errors |

## Select Event

The `select` event fires when user clicks an item or checkbox:

### Basic Select Event

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" 
    select="OnSelect">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function OnSelect(args) {
    console.log("Item selected:", args.text);
    console.log("Item data:", args.data);
    console.log("Index:", args.index);
}
</script>
```

### SelectEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| data | object | Full data object of item |
| index | number | Index of item in list |
| isChecked | boolean | Checkbox state (if applicable) |
| name | string | Event name ("select") |
| text | string | Item display text |

### Select with Checkbox State

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" showCheckBox="true"
    select="HandleSelect">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function HandleSelect(args) {
    if (args.isChecked) {
        console.log("Checked:", args.text);
    } else {
        console.log("Unchecked:", args.text);
    }
}
</script>
```

### Select with Item Context

```cshtml
<ejs-listview id="products" dataSource="@ViewBag.Products" 
    select="ProcessSelection">
    <e-listview-fieldsettings id="ProductId" text="ProductName"></e-listview-fieldsettings>
</ejs-listview>

<script>
function ProcessSelection(args) {
    let product = args.data;
    console.log("Product ID:", product.ProductId);
    console.log("Price:", product.Price);
    console.log("Category:", product.Category);
    
    // Update UI based on selection
    UpdateProductDetails(product);
}
</script>
```

## Scroll Event

The `scroll` event fires when user scrolls within the ListView:

### Basic Scroll Event

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" height="400"
    scroll="OnScroll">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function OnScroll(args) {
    console.log("Scroll distance (Y):", args.distanceY);
    console.log("Direction:", args.direction); // "up" or "down"
}
</script>
```

### ScrolledEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| distanceY | number | Vertical scroll distance in pixels |
| direction | string | Scroll direction ("up" or "down") |

### Dynamic Loading on Scroll

```csharp
public class Item
{
    public int Id { get; set; }
    public string Name { get; set; }
}

// Initial load: 50 items
var initialItems = Enumerable.Range(1, 50)
    .Select(i => new Item { Id = i, Name = $"Item {i}" })
    .ToList();
```

```cshtml
<ejs-listview id="infinite" dataSource="@ViewBag.Items" height="500"
    enableVirtualization="true"
    scroll="LoadMoreItems">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
let currentPage = 1;
let itemsPerPage = 50;
let totalItems = 1000;

function LoadMoreItems(args) {
    // Check if user scrolled near bottom
    if (args.direction === 'down' && args.distanceY > -100) {
        console.log("Loading more items...");
        LoadNextBatch();
    }
}

function LoadNextBatch() {
    if (currentPage * itemsPerPage < totalItems) {
        currentPage++;
        fetch(`/api/items?page=${currentPage}&limit=${itemsPerPage}`)
            .then(response => response.json())
            .then(data => {
                let listView = document.getElementById('infinite').ej2_instances[0];
                listView.dataSource = [...listView.dataSource, ...data];
            });
    }
}
</script>
```

## Action Events

### ActionBegin Event

Fires before any ListView action starts:

```cshtml
<ejs-listview id="list" actionBegin="OnActionBegin">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function OnActionBegin(args) {
    console.log("Action starting:", args.name);
    console.log("Action type:", args.requestType); // e.g., "read"
    
    // Show loading indicator
    document.getElementById('loader').style.display = 'block';
}
</script>
```

### ActionComplete Event

Fires after ListView action completes successfully:

```cshtml
<ejs-listview id="list" actionComplete="OnActionComplete">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function OnActionComplete(args) {
    console.log("Action completed:", args.name);
    console.log("Result count:", args.result.length);
    
    // Hide loading indicator
    document.getElementById('loader').style.display = 'none';
    
    // Show success message
    ShowNotification("Data loaded successfully");
}
</script>
```

### ActionFailure Event

Fires when action fails (typically remote data load):

```cshtml
<ejs-listview id="list" actionFailure="OnActionFailure">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function OnActionFailure(args) {
    console.error("Action failed:", args.error);
    console.error("Error details:", args.errorThrown);
    
    // Hide loading indicator
    document.getElementById('loader').style.display = 'none';
    
    // Show error message
    ShowNotification("Error loading data. Please try again.", "error");
}
</script>
```

## Error Handling Strategies

### Strategy 1: Try-Catch for Synchronous Operations

```cshtml
<script>
function SafeSelection(args) {
    try {
        if (!args.data) {
            throw new Error("No data in selection");
        }
        
        ProcessItem(args.data);
    } catch (error) {
        console.error("Selection error:", error.message);
        ShowErrorMessage("Failed to process selection");
    }
}
</script>
```

### Strategy 2: Promise-Based Error Handling

```cshtml
<script>
function LoadDataWithErrorHandling() {
    fetch('/api/items')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let listView = document.getElementById('list').ej2_instances[0];
            listView.dataSource = data;
        })
        .catch(error => {
            console.error("Fetch error:", error);
            ShowErrorMessage("Failed to load data from server");
        });
}
</script>
```

### Strategy 3: Validation Before Processing

```cshtml
<script>
function ValidatedSelect(args) {
    // Validate required properties
    if (!args.data || !args.data.Id) {
        console.warn("Invalid selection: missing ID");
        return;
    }
    
    // Validate data types
    if (typeof args.index !== 'number') {
        console.warn("Invalid selection: index is not a number");
        return;
    }
    
    // Safe to process
    ProcessValidItem(args.data);
}

function ProcessValidItem(item) {
    console.log("Processing valid item:", item.Id);
}
</script>
```

## Remote Data Failure

### Common Failure Scenarios

#### Scenario 1: Network Timeout

```cshtml
<ejs-listview id="list" 
    actionFailure="HandleNetworkError">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function HandleNetworkError(args) {
    if (args.error instanceof TimeoutError) {
        ShowErrorMessage("Request timeout. Please check your connection.");
    } else {
        ShowErrorMessage("Network error occurred.");
    }
}
</script>
```

#### Scenario 2: Server Error (500)

```cshtml
<script>
function HandleServerError(args) {
    let errorResponse = args.errorThrown;
    
    if (errorResponse && errorResponse.status === 500) {
        ShowErrorMessage("Server error. Please try again later.");
        // Log error for debugging
        ReportError(errorResponse);
    } else if (errorResponse && errorResponse.status === 404) {
        ShowErrorMessage("Resource not found.");
    }
}
</script>
```

#### Scenario 3: Invalid Data Format

```cshtml
<script>
function ValidateRemoteData(args) {
    try {
        if (!Array.isArray(args.result)) {
            throw new Error("Invalid response: expected array");
        }
        
        args.result.forEach(item => {
            if (!item.Id || !item.Name) {
                throw new Error("Invalid item structure: missing Id or Name");
            }
        });
    } catch (error) {
        console.error("Data validation error:", error);
        args.cancel = true; // Cancel data binding
        ShowErrorMessage("Invalid server response format");
    }
}
</script>
```

## Event Binding Patterns

### Pattern 1: Single Event Handler

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items"
    e-select="OnItemSelect">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function OnItemSelect(args) {
    console.log("Selected:", args.text);
}
</script>
```

### Pattern 2: Multiple Event Handlers

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items"
    select="OnSelect"
    scroll="OnScroll"
    actionBegin="OnBegin"
    actionComplete="OnComplete"
    actionFailure="OnFailure">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function OnSelect(args) { console.log("Select event"); }
function OnScroll(args) { console.log("Scroll event"); }
function OnBegin(args) { console.log("Begin event"); }
function OnComplete(args) { console.log("Complete event"); }
function OnFailure(args) { console.log("Failure event"); }
</script>
```

### Pattern 3: Event Delegation with Object

```cshtml
<script>
const ListViewHandler = {
    onSelect: function(args) {
        console.log("Selection handled");
        this.updateUI(args.data);
    },
    
    onScroll: function(args) {
        console.log("Scroll handled");
        if (args.direction === 'down') {
            this.loadMore();
        }
    },
    
    updateUI: function(data) {
        console.log("Updating UI with:", data);
    },
    
    loadMore: function() {
        console.log("Loading more data...");
    }
};
</script>

<ejs-listview id="list" dataSource="@ViewBag.Items"
    select="ListViewHandler.onSelect"
    scroll="ListViewHandler.onScroll">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Pattern 4: Chained Operations

```cshtml
<script>
function OnSelectChained(args) {
    ValidateSelection(args)
        .then(validated => LogSelection(validated))
        .then(logged => UpdateUI(logged))
        .then(updated => SendToServer(updated))
        .catch(error => HandleError(error));
}

function ValidateSelection(args) {
    return new Promise((resolve, reject) => {
        if (!args.data) reject("No data selected");
        resolve(args.data);
    });
}

function LogSelection(data) {
    console.log("Selected:", data);
    return data;
}

function UpdateUI(data) {
    console.log("Updating UI");
    return data;
}

function SendToServer(data) {
    return fetch('/api/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(r => r.json());
}

function HandleError(error) {
    console.error("Chain error:", error);
    ShowErrorMessage(error);
}
</script>
```

## Complete Event Example

```cshtml
<div id="status" style="margin-bottom: 10px; padding: 10px; background-color: #f5f5f5; display: none;"></div>

<ejs-listview id="list" height="500"
    select="OnSelect"
    scroll="OnScroll"
    actionBegin="OnActionBegin"
    actionComplete="OnActionComplete"
    actionFailure="OnActionFailure">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function ShowStatus(message, type = 'info') {
    let status = document.getElementById('status');
    status.textContent = message;
    status.style.backgroundColor = type === 'error' ? '#ffebee' : '#f5f5f5';
    status.style.color = type === 'error' ? '#c62828' : '#333';
    status.style.display = 'block';
}

function OnSelect(args) {
    ShowStatus(`Selected: ${args.text}`);
}

function OnScroll(args) {
    if (args.distanceY > 0) {
        console.log("Scrolled down by", args.distanceY, "px");
    }
}

function OnActionBegin(args) {
    ShowStatus("Loading data...");
}

function OnActionComplete(args) {
    ShowStatus(`Loaded ${args.result.length} items`, 'success');
}

function OnActionFailure(args) {
    ShowStatus(`Error: ${args.error}`, 'error');
}
</script>
```

---

**Related Topics:**
- [Checkboxes, Selection & Events](checkboxes-selection-events.md)
- [Sorting, Filtering & Scrolling](sorting-filtering-scrolling.md)
