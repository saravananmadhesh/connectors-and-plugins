# How-To Guides

## Overview

This guide provides solutions to common implementation scenarios and frequently asked questions when working with the Kanban board.

## Table of Contents
- [Dynamically Change Columns](#dynamically-change-columns)
- [Filter Cards](#filter-cards)
- [Search Cards](#search-cards)
- [Handle Header Double-Click](#handle-header-double-click)
- [Custom Card Rendering](#custom-card-rendering)
- [Dynamic Data Refresh](#dynamic-data-refresh)
- [Batch Operations](#batch-operations)
- [Export to Excel/PDF](#export-to-excelpdf)
- [Real-Time Collaboration](#real-time-collaboration)

## Dynamically Change Columns

Change Kanban columns and their properties at runtime based on user actions or business logic.

### Change Column Properties

**Scenario:** Enable `AllowToggle` for a specific column when a button is clicked.

```razor
@Html.EJS().Button("enableToggle").Content("Enable Toggle for Column 2").Render()

@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Created("onCreated")
    .Render()

<script>
    var kanbanObj;
    
    function onCreated() {
        kanbanObj = this;
    }
    
    document.getElementById('enableToggle').onclick = function() {
        // Enable AllowToggle for second column (index 1)
        kanbanObj.columns[1].allowToggle = true;
        kanbanObj.refreshHeader();
    };
</script>
```

### Replace Entire Column Configuration

**Scenario:** Change from 4-column workflow to simplified 2-column workflow.

```razor
@Html.EJS().Button("simplifyWorkflow").Content("Simplify Workflow").Render()

@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Created("onCreated")
    .Render()

<script>
    var kanbanObj;
    
    function onCreated() {
        kanbanObj = this;
    }
    
    document.getElementById('simplifyWorkflow').onclick = function() {
        // Replace with simplified columns
        kanbanObj.columns = [
            { headerText: 'To Do', keyField: 'Open,InProgress' },  // Multi-key
            { headerText: 'Done', keyField: 'Testing,Close' }
        ];
        kanbanObj.refresh();
    };
</script>
```

### Add Column Dynamically

**Scenario:** Add a "Code Review" column between "In Progress" and "Testing".

```razor
@Html.EJS().Button("addColumn").Content("Add Code Review Column").Render()

@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Created("onCreated")
    .Render()

<script>
    var kanbanObj;
    
    function onCreated() {
        kanbanObj = this;
    }
    
    document.getElementById('addColumn').onclick = function() {
        var newColumn = {
            headerText: 'Code Review',
            keyField: 'Review',
            allowToggle: true,
            maxCount: 3,
            showAddButton: true
        };
        
        // Add at index 2 (between InProgress and Testing)
        kanbanObj.addColumn(newColumn, 2);
    };
</script>
```

## Filter Cards

Filter cards based on specific criteria using the `query` property.

### Filter by Priority

**Scenario:** Show only high-priority cards.

```razor
@Html.EJS().DropDownList("priorityFilter")
    .Placeholder("Select Priority")
    .DataSource((IEnumerable<object>)ViewBag.PriorityData)
    .Fields(new Syncfusion.EJ2.DropDowns.DropDownListFieldSettings { Text = "Priority", Value = "Priority" })
    .Change("onPriorityChange")
    .Render()

@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Created("onCreated")
    .Render()

<script>
    var kanbanObj;
    
    function onCreated() {
        kanbanObj = this;
    }
    
    function onPriorityChange(args) {
        var filterQuery = new ej.data.Query();
        
        if (args.value && args.value !== 'All') {
            filterQuery = new ej.data.Query().where('Priority', 'equal', args.value);
        }
        
        kanbanObj.query = filterQuery;
    }
</script>
```

### Filter by Multiple Criteria

**Scenario:** Filter by both priority and assignee.

```razor
<table>
    <tr>
        <td>Priority:</td>
        <td>
            @Html.EJS().DropDownList("priorityFilter")
                .DataSource(new string[] { "All", "High", "Normal", "Low" })
                .Value("All")
                .Change("applyFilters")
                .Render()
        </td>
        <td>Assignee:</td>
        <td>
            @Html.EJS().DropDownList("assigneeFilter")
                .DataSource(new string[] { "All", "Nancy", "Andrew", "Janet" })
                .Value("All")
                .Change("applyFilters")
                .Render()
        </td>
        <td>
            @Html.EJS().Button("clearFilters").Content("Clear Filters").Render()
        </td>
    </tr>
</table>

@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Created("onCreated")
    .Render()

<script>
    var kanbanObj;
    
    function onCreated() {
        kanbanObj = this;
    }
    
    function applyFilters() {
        var priority = document.getElementById('priorityFilter').ej2_instances[0].value;
        var assignee = document.getElementById('assigneeFilter').ej2_instances[0].value;
        
        var query = new ej.data.Query();
        
        if (priority && priority !== 'All') {
            query = query.where('Priority', 'equal', priority);
        }
        
        if (assignee && assignee !== 'All') {
            query = query.where('Assignee', 'equal', assignee);
        }
        
        kanbanObj.query = query;
    }
    
    document.getElementById('clearFilters').onclick = function() {
        document.getElementById('priorityFilter').ej2_instances[0].value = 'All';
        document.getElementById('assigneeFilter').ej2_instances[0].value = 'All';
        kanbanObj.query = new ej.data.Query();
    };
</script>
```

## Search Cards

Implement search functionality to find cards by text content.

### Basic Search

**Scenario:** Search cards by ID and Summary fields.

```razor
<table>
    <tr>
        <td style="width: 300px">
            @Html.EJS().TextBox("searchBox")
                .Placeholder("Search by ID or Summary...")
                .ShowClearButton(true)
                .Input("onSearchInput")
                .Render()
        </td>
        <td>
            @Html.EJS().Button("resetSearch").Content("Reset").Render()
        </td>
    </tr>
</table>

@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Created("onCreated")
    .Render()

<script>
    var kanbanObj;
    
    function onCreated() {
        kanbanObj = this;
    }
    
    function onSearchInput(args) {
        var searchValue = args.value;
        var searchQuery = new ej.data.Query();
        
        if (searchValue && searchValue.trim() !== '') {
            // Search in Id and Summary fields
            searchQuery = new ej.data.Query()
                .search(searchValue, ['Id', 'Summary'], 'contains', true);
        }
        
        kanbanObj.query = searchQuery;
    }
    
    document.getElementById('resetSearch').onclick = function() {
        var searchBox = document.getElementById('searchBox').ej2_instances[0];
        searchBox.value = '';
        kanbanObj.query = new ej.data.Query();
    };
</script>
```

### Advanced Search with Highlighting

**Scenario:** Search and highlight matching text in cards.

```razor
@Html.EJS().TextBox("advancedSearch")
    .Placeholder("Search cards...")
    .Input("onAdvancedSearch")
    .Render()

@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Created("onCreated")
    .CardRendered("onCardRendered")
    .Render()

<script>
    var kanbanObj, currentSearchTerm = '';
    
    function onCreated() {
        kanbanObj = this;
    }
    
    function onAdvancedSearch(args) {
        currentSearchTerm = args.value;
        var searchQuery = new ej.data.Query();
        
        if (currentSearchTerm && currentSearchTerm.trim() !== '') {
            searchQuery = new ej.data.Query()
                .search(currentSearchTerm, ['Id', 'Summary', 'Description'], 'contains', true);
        }
        
        kanbanObj.query = searchQuery;
    }
    
    function onCardRendered(args) {
        if (currentSearchTerm) {
            // Highlight matching text
            var regex = new RegExp(`(${currentSearchTerm})`, 'gi');
            var cardContent = args.element.querySelector('.e-card-content');
            
            if (cardContent) {
                cardContent.innerHTML = cardContent.innerHTML.replace(regex, 
                    '<span style="background-color:yellow;font-weight:bold;">$1</span>');
            }
        }
    }
</script>
```

## Handle Header Double-Click

Execute custom logic when column headers are double-clicked.

**Scenario:** Show column statistics on header double-click.

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .DataBound("onDataBound")
    .Render()

<script>
    function onDataBound() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        var headerRow = document.querySelector('.e-header-row');
        
        headerRow.addEventListener('dblclick', function(e) {
            var headerCell = e.target.closest('.e-header-cells');
            
            if (headerCell) {
                var headerText = headerCell.querySelector('.e-header-text').innerText;
                var columnKey = headerCell.getAttribute('data-key');
                var columnData = kanbanObj.getColumnData(columnKey);
                
                // Calculate statistics
                var totalCards = columnData.length;
                var highPriority = columnData.filter(c => c.Priority === 'High').length;
                var totalEstimate = columnData.reduce((sum, c) => sum + (c.Estimate || 0), 0);
                
                // Show statistics dialog
                ej.popups.DialogUtility.alert({
                    title: `${headerText} Statistics`,
                    content: `
                        <div style="padding:10px;">
                            <p><strong>Total Cards:</strong> ${totalCards}</p>
                            <p><strong>High Priority:</strong> ${highPriority}</p>
                            <p><strong>Total Estimate:</strong> ${totalEstimate} hours</p>
                        </div>
                    `,
                    showCloseIcon: true,
                    closeOnEscape: true,
                    animationSettings: { effect: 'Zoom' }
                });
            }
        });
    }
</script>
```

## Custom Card Rendering

Customize card appearance based on data properties.

### Priority-Based Card Colors

**Scenario:** Apply different background colors based on priority.

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .CardRendered("onCardRendered")
    .Render()

<script>
    function onCardRendered(args) {
        var priority = args.data.Priority;
        var card = args.element;
        
        // Apply priority-based styling
        var colorConfig = {
            'Critical': { border: '#d32f2f', bg: '#ffebee' },
            'High': { border: '#ff9800', bg: '#fff3e0' },
            'Normal': { border: '#4caf50', bg: '#ffffff' },
            'Low': { border: '#2196f3', bg: '#e3f2fd' }
        };
        
        if (colorConfig[priority]) {
            card.style.borderLeft = `5px solid ${colorConfig[priority].border}`;
            card.style.backgroundColor = colorConfig[priority].bg;
        }
        
        // Add overdue indicator
        if (args.data.DueDate && new Date(args.data.DueDate) < new Date()) {
            var badge = document.createElement('span');
            badge.className = 'overdue-badge';
            badge.innerText = 'OVERDUE';
            badge.style.cssText = 'background:#d32f2f;color:white;padding:2px 6px;font-size:10px;border-radius:3px;margin-left:5px;';
            card.querySelector('.e-card-header').appendChild(badge);
        }
    }
</script>
```

## Dynamic Data Refresh

Refresh Kanban data dynamically from server or external sources.

### Auto-Refresh Every 30 Seconds

**Scenario:** Poll server for updates every 30 seconds.

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Created("onCreated")
    .Render()

<script>
    var kanbanObj, refreshInterval;
    
    function onCreated() {
        kanbanObj = this;
        startAutoRefresh();
    }
    
    function startAutoRefresh() {
        refreshInterval = setInterval(function() {
            refreshData();
        }, 30000); // 30 seconds
    }
    
    function refreshData() {
        kanbanObj.showSpinner();
        
        $.ajax({
            url: '/Kanban/GetLatestData',
            type: 'GET',
            success: function(data) {
                kanbanObj.dataSource = data;
                kanbanObj.dataBind();
                kanbanObj.hideSpinner();
                console.log('Data refreshed at', new Date().toLocaleTimeString());
            },
            error: function() {
                kanbanObj.hideSpinner();
                console.error('Failed to refresh data');
            }
        });
    }
    
    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        if (refreshInterval) {
            clearInterval(refreshInterval);
        }
    });
</script>
```

## Batch Operations

Perform operations on multiple cards simultaneously.

### Bulk Update Selected Cards

**Scenario:** Change priority for all selected cards.

```razor
@Html.EJS().Button("bulkUpdate").Content("Set Selected to High Priority").Render()

@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary")
            .HeaderField("Id")
            .SelectionType(SelectionType.Multiple);
    })
    .Created("onCreated")
    .Render()

<script>
    var kanbanObj;
    
    function onCreated() {
        kanbanObj = this;
    }
    
    document.getElementById('bulkUpdate').onclick = function() {
        var selectedCards = kanbanObj.getSelectedCards();
        
        if (selectedCards.length === 0) {
            alert('No cards selected');
            return;
        }
        
        if (confirm(`Update ${selectedCards.length} cards to High Priority?`)) {
            var updatedCards = selectedCards.map(function(cardElement) {
                var cardData = kanbanObj.getCardDetails(cardElement);
                cardData.Priority = 'High';
                return cardData;
            });
            
            kanbanObj.updateCard(updatedCards);
            alert('Cards updated successfully');
        }
    };
</script>
```

## Export to Excel/PDF

Export Kanban data to Excel or PDF format.

### Export to Excel

**Scenario:** Export all cards to Excel spreadsheet.

```razor
@Html.EJS().Button("exportExcel").Content("Export to Excel").Render()

@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Created("onCreated")
    .Render()

<script src="https://unpkg.com/xlsx@0.18.5/dist/xlsx.full.min.js"></script>

<script>
    var kanbanObj;
    
    function onCreated() {
        kanbanObj = this;
    }
    
    document.getElementById('exportExcel').onclick = function() {
        var data = kanbanObj.kanbanData;
        
        // Convert to Excel format
        var worksheet = XLSX.utils.json_to_sheet(data);
        var workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Kanban");
        
        // Download
        XLSX.writeFile(workbook, "kanban-export.xlsx");
    };
</script>
```

## Real-Time Collaboration

Implement real-time updates using SignalR.

**Scenario:** Sync board updates across multiple users.

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Created("onCreated")
    .DataSourceChanged("onDataSourceChanged")
    .Render()

<script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.1/signalr.min.js"></script>

<script>
    var kanbanObj, connection;
    
    function onCreated() {
        kanbanObj = this;
        setupSignalR();
    }
    
    function setupSignalR() {
        connection = new signalR.HubConnectionBuilder()
            .withUrl("/kanbanHub")
            .build();
        
        // Receive updates from other users
        connection.on("ReceiveUpdate", function(action, data) {
            console.log("Received update:", action, data);
            
            // Apply update without triggering another broadcast
            if (action === 'add') {
                kanbanObj.addCard(data);
            } else if (action === 'edit') {
                kanbanObj.updateCard(data);
            } else if (action === 'delete') {
                kanbanObj.deleteCard(data);
            }
        });
        
        connection.start();
    }
    
    function onDataSourceChanged(args) {
        // Broadcast changes to other users
        if (connection && connection.state === 'Connected') {
            connection.invoke("BroadcastUpdate", args.action, args.data);
        }
    }
</script>
```

## Best Practices

1. **Test extensively**: Test all custom implementations thoroughly
2. **Error handling**: Wrap operations in try-catch blocks
3. **User feedback**: Provide visual feedback for all operations
4. **Performance**: Minimize DOM manipulations in CardRendered
5. **Validation**: Validate data before bulk operations
6. **Clean up**: Remove event listeners and intervals on page unload
7. **Accessibility**: Ensure custom features are keyboard accessible
8. **Documentation**: Document custom implementations for maintenance
9. **Security**: Validate and sanitize user inputs
10. **Browser compatibility**: Test custom features across browsers
