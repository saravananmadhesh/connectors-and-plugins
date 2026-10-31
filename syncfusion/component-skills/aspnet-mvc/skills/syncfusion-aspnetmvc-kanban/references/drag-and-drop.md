# Drag and Drop Configuration

## Table of Contents
- [Overview](#overview)
- [Internal Drag and Drop](#internal-drag-and-drop)
- [Column Drag and Drop](#column-drag-and-drop)
- [Swimlane Drag and Drop](#swimlane-drag-and-drop)
- [External Drag and Drop](#external-drag-and-drop)
- [Kanban to Kanban](#kanban-to-kanban)
- [External Controls to Kanban](#external-controls-to-kanban)
- [Drag Events](#drag-events)
- [Card Cloning](#card-cloning)
- [Drag Constraints](#drag-constraints)

## Overview

Drag and drop functionality enables users to move cards between columns, swimlanes, and even between different Kanban boards or external controls. This feature is essential for workflow management and task organization.

**Drag and Drop Types:**
1. **Internal Card Drag**: Move cards within the same Kanban board
2. **Column Reordering**: Rearrange column positions
3. **Swimlane Transfer**: Move cards across swimlane rows
4. **External Drag**: Transfer cards between Kanban boards or from external controls

**Key Properties:**
- `AllowDragAndDrop`: Enable/disable card dragging (default: true)
- `AllowColumnDragAndDrop`: Enable column reordering
- `SwimlaneSettings.AllowDragAndDrop`: Enable cross-swimlane transfer
- `ExternalDropId`: Link external Kanban boards for card transfer

## Internal Drag and Drop

By default, cards can be dragged between columns within the same Kanban board. This behavior is controlled by the `AllowDragAndDrop` property.

**Default Behavior:**
- Drag cards horizontally across columns
- Restricted to the same swimlane row (if swimlanes are enabled)
- Card data automatically updates to reflect new column status

**Example - Enable/Disable Card Dragging:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .AllowDragAndDrop(true)  // Enable card drag-and-drop (default)
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
    .Render()
```

**Disable Dragging:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .AllowDragAndDrop(false)  // Disable all card dragging
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

**Use Cases:**
- Standard workflow management
- Moving tasks through stages
- Quick status updates
- Manual workflow progression

## Column Drag and Drop

Enable users to reorder columns by dragging column headers to new positions using `AllowColumnDragAndDrop`.

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .AllowColumnDragAndDrop(true)  // Enable column reordering
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
    .Render()
```

**Behavior:**
- Drag column headers horizontally to reorder
- All cards in the column move with it
- Column order persists when `EnablePersistence` is set to true
- Visual indicators show valid drop positions

**Use Cases:**
- Customizing workflow stages order
- User-specific board layouts
- Temporary workflow adjustments
- A/B testing different column arrangements

## Swimlane Drag and Drop

Enable cards to be moved across different swimlane rows using the `AllowDragAndDrop` property in `SwimlaneSettings`.

**Default Behavior:**
- Cards confined to their original swimlane row
- Can only move horizontally across columns

**Enable Cross-Swimlane Drag:**

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
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee")
            .AllowDragAndDrop(true);  // Enable cross-swimlane drag
    })
    .Render()
```

**Result:** 
- Cards can be dragged vertically between swimlane rows
- The swimlane KeyField value automatically updates to match the target row
- Enables reassignment of tasks between team members

**Example with Event Handling:**

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
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee")
            .AllowDragAndDrop(true);
    })
    .DragStop("onDragStop")
    .Render()

<script>
    function onDragStop(args) {
        console.log("Card moved from swimlane: " + args.data[0].Assignee);
        console.log("Card moved to column: " + args.data[0].Status);
        
        // Custom validation or business logic
        if (args.data[0].Status === 'Done' && args.data[0].Assignee === 'Unassigned') {
            args.cancel = true;
            alert('Cannot move unassigned tasks to Done status');
        }
    }
</script>
```

**Use Cases:**
- Reassigning tasks between team members
- Moving work between priority levels
- Transferring items between teams or departments
- Workload balancing

## External Drag and Drop

Enable card transfer between multiple Kanban boards or from external controls using the `ExternalDropId` property.

**Supported Scenarios:**
1. Kanban to Kanban
2. TreeView to Kanban
3. Schedule to Kanban
4. Custom controls to Kanban

## Kanban to Kanban

Transfer cards between two or more Kanban boards by linking them with `ExternalDropId`.

**Example - Two Kanban Boards:**

```csharp
// Controller
public ActionResult Index()
{
    ViewBag.KanbanData = GetKanbanData();
    ViewBag.PlanningData = GetPlanningData();
    return View();
}

private List<KanbanDataModel> GetKanbanData()
{
    return new List<KanbanDataModel>
    {
        new KanbanDataModel { Id = 1, Status = "Open", Summary = "Task 1", Assignee = "Nancy" },
        new KanbanDataModel { Id = 2, Status = "InProgress", Summary = "Task 2", Assignee = "Andrew" }
    };
}

private List<KanbanDataModel> GetPlanningData()
{
    return new List<KanbanDataModel>
    {
        new KanbanDataModel { Id = 3, Status = "Validate", Summary = "Planned Task 1", Assignee = "Janet" }
    };
}
```

```razor
@* Main Kanban Board *@
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.KanbanData)
    .ExternalDropId(new string[] { "#planningKanban" })  // Link to planning board
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
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee");
    })
    .DragStop("onKanbanDragStop")
    .Render()

@* Planning Kanban Board *@
<div style="margin-top: 20px;">
    @Html.EJS().Kanban("planningKanban")
        .KeyField("Status")
        .DataSource((IEnumerable<object>)ViewBag.PlanningData)
        .ExternalDropId(new string[] { "#kanban" })  // Link to main board
        .Columns(col =>
        {
            col.HeaderText("Backlog").KeyField("Backlog").Add();
            col.HeaderText("To Validate").KeyField("Validate").Add();
            col.HeaderText("Approved").KeyField("Approved").Add();
        })
        .CardSettings(card =>
        {
            card.ContentField("Summary").HeaderField("Id");
        })
        .SwimlaneSettings(swim =>
        {
            swim.KeyField("Assignee");
        })
        .DragStop("onPlanningDragStop")
        .Render()
</div>

<script>
    function onKanbanDragStop(args) {
        // Card dropped from main Kanban to planning Kanban
        if (args.dropTarget && args.dropTarget.closest('#planningKanban')) {
            console.log('Card moved to planning board');
            // Update card status for planning workflow
            args.data[0].Status = 'Backlog';
        }
    }
    
    function onPlanningDragStop(args) {
        // Card dropped from planning Kanban to main Kanban
        if (args.dropTarget && args.dropTarget.closest('#kanban')) {
            console.log('Card moved to main board');
            // Update card status for main workflow
            args.data[0].Status = 'Open';
        }
    }
</script>
```

**Key Points:**
- `ExternalDropId` accepts an array of CSS selectors (e.g., `#boardId`, `.boardClass`)
- Cards automatically transfer between boards
- Both boards must have matching KeyField
- Use DragStop event to handle status mapping between different workflows

**Use Cases:**
- Separating planning/backlog from active work
- Different teams with separate boards but shared cards
- Epic-level board feeding feature-level boards
- Review/approval workflow with separate boards

## External Controls to Kanban

Drag cards from external controls like TreeView, ListView, or Schedule into Kanban boards.

**Example - TreeView to Kanban:**

```razor
@* TreeView with draggable nodes *@
@Html.EJS().TreeView("treeview")
    .Fields(new Syncfusion.EJ2.Navigations.TreeViewFieldSettings
    {
        DataSource = (IEnumerable<object>)ViewBag.TreeData,
        Id = "Id",
        Text = "Name"
    })
    .AllowDragAndDrop(true)
    .NodeDragStop("onTreeDragStop")
    .Render()

@* Kanban Board *@
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.KanbanData)
    .ExternalDropId(new string[] { "#treeview" })
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()

<script>
    function onTreeDragStop(args) {
        // Check if dropped on Kanban board
        if (args.dropTarget && args.dropTarget.closest('.e-kanban')) {
            var kanbanObj = document.getElementById('kanban').ej2_instances[0];
            var droppedColumn = args.dropTarget.closest('.e-content-cells');
            
            if (droppedColumn) {
                // Get the column key
                var columnKey = droppedColumn.getAttribute('data-key');
                
                // Create new card from TreeView node
                var newCard = {
                    Id: Math.floor(Math.random() * 1000),
                    Status: columnKey,
                    Summary: args.draggedNodeData.text,
                    Assignee: 'Unassigned'
                };
                
                // Add card to Kanban
                kanbanObj.addCard(newCard);
                
                // Remove node from TreeView
                args.cancel = false;
            }
        }
    }
</script>
```

**Example - Schedule to Kanban:**

```razor
@* Schedule control *@
@Html.EJS().Schedule("schedule")
    .Height("550px")
    .EventSettings(e => e.DataSource((IEnumerable<object>)ViewBag.ScheduleData))
    .AllowDragAndDrop(true)
    .DragStop("onScheduleDragStop")
    .Render()

@* Kanban Board *@
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.KanbanData)
    .ExternalDropId(new string[] { "#schedule" })
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .DragStop("onKanbanDragStop")
    .Render()

<script>
    function onScheduleDragStop(args) {
        if (args.dropTarget && args.dropTarget.closest('.e-kanban')) {
            // Convert schedule event to Kanban card
            var kanbanObj = document.getElementById('kanban').ej2_instances[0];
            var droppedColumn = args.dropTarget.closest('.e-content-cells');
            
            if (droppedColumn) {
                var columnKey = droppedColumn.getAttribute('data-key');
                var newCard = {
                    Id: args.data.Id,
                    Status: columnKey,
                    Summary: args.data.Subject,
                    Assignee: 'Unassigned'
                };
                kanbanObj.addCard(newCard);
            }
        }
    }
    
    function onKanbanDragStop(args) {
        if (args.dropTarget && args.dropTarget.closest('.e-schedule')) {
            // Convert Kanban card to schedule event
            var scheduleObj = document.getElementById('schedule').ej2_instances[0];
            var newEvent = {
                Id: args.data[0].Id,
                Subject: args.data[0].Summary,
                StartTime: new Date(),
                EndTime: new Date(new Date().getTime() + 60 * 60 * 1000)
            };
            scheduleObj.addEvent(newEvent);
            
            // Remove card from Kanban
            var kanbanObj = document.getElementById('kanban').ej2_instances[0];
            kanbanObj.deleteCard(args.data);
        }
    }
</script>
```

## Drag Events

Kanban provides several events to customize drag-and-drop behavior and implement business logic.

**Available Drag Events:**
- **DragStart**: Triggered when drag begins
- **Drag**: Triggered while dragging
- **DragStop**: Triggered when drag ends

**DragStart Event:**

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
    .DragStart("onDragStart")
    .Render()

<script>
    function onDragStart(args) {
        console.log('Drag started for card:', args.data[0].Id);
        
        // Cancel drag for specific cards
        if (args.data[0].Priority === 'Critical') {
            args.cancel = true;
            alert('Critical priority cards cannot be moved');
        }
        
        // Change drag element appearance
        args.element.style.opacity = '0.5';
    }
</script>
```

**Drag Event (While Dragging):**

```razor
.Drag("onDrag")

<script>
    function onDrag(args) {
        // Highlight valid drop zones
        var dropZones = document.querySelectorAll('.e-content-cells');
        dropZones.forEach(function(zone) {
            if (zone.getAttribute('data-key') !== 'Close') {
                zone.style.backgroundColor = '#e0f7fa';
            }
        });
    }
</script>
```

**DragStop Event (Most Important):**

```razor
.DragStop("onDragStop")

<script>
    function onDragStop(args) {
        console.log('Dropped card:', args.data[0]);
        console.log('Target column:', args.data[0].Status);
        
        // Prevent drop to specific columns
        if (args.data[0].Status === 'Close' && args.data[0].Assignee === 'Unassigned') {
            args.cancel = true;
            alert('Cannot close unassigned tasks');
            return;
        }
        
        // Custom data transformation
        if (args.data[0].Status === 'InProgress') {
            args.data[0].StartDate = new Date();
        }
        
        // Server-side notification
        $.ajax({
            url: '/Kanban/UpdateCard',
            type: 'POST',
            data: JSON.stringify(args.data[0]),
            contentType: 'application/json',
            success: function(response) {
                console.log('Card updated on server');
            }
        });
        
        // Reset visual changes
        document.querySelectorAll('.e-content-cells').forEach(function(zone) {
            zone.style.backgroundColor = '';
        });
    }
</script>
```

**Event Arguments:**

```typescript
// DragStart and Drag event args
{
    data: Object[],        // Array of dragged cards
    element: HTMLElement,  // Drag element
    event: MouseEvent,     // Native event
    cancel: boolean        // Set to true to cancel
}

// DragStop event args
{
    data: Object[],           // Array of dropped cards
    element: HTMLElement,     // Drag element
    dropTarget: HTMLElement,  // Target element
    event: MouseEvent,        // Native event
    cancel: boolean,          // Set to true to cancel
    requestType: string       // 'card' or 'column'
}
```

## Card Cloning

Create a copy of the card instead of moving it during drag-and-drop.

**Example:**

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
    .DragStop("onDragStopClone")
    .Render()

<script>
    function onDragStopClone(args) {
        // Check if Ctrl key is pressed for cloning
        if (args.event.ctrlKey) {
            var kanbanObj = document.getElementById('kanban').ej2_instances[0];
            
            // Create a clone with new ID
            var clonedCard = Object.assign({}, args.data[0]);
            clonedCard.Id = Math.floor(Math.random() * 10000);
            
            // Add the clone
            kanbanObj.addCard(clonedCard);
            
            // Keep original card in place
            args.cancel = true;
        }
    }
</script>
```

**Use Cases:**
- Duplicating tasks across projects
- Creating similar tasks quickly
- Maintaining task history while progressing

## Drag Constraints

Control which cards can be dragged and where they can be dropped.

**Example - Restrict Dragging by Priority:**

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
    .DragStart("onDragStartConstraint")
    .DragStop("onDragStopConstraint")
    .Render()

<script>
    function onDragStartConstraint(args) {
        // Prevent dragging high priority items
        if (args.data[0].Priority === 'High') {
            args.cancel = true;
            alert('High priority items are locked');
        }
    }
    
    function onDragStopConstraint(args) {
        // Prevent dropping in certain columns
        if (args.data[0].Status === 'Close' && !args.data[0].TestingCompleted) {
            args.cancel = true;
            alert('Cannot close tasks without testing');
        }
        
        // Enforce workflow sequence
        var currentStatus = args.data[0].PreviousStatus || 'Open';
        var newStatus = args.data[0].Status;
        var validTransitions = {
            'Open': ['InProgress'],
            'InProgress': ['Testing', 'Open'],
            'Testing': ['Close', 'InProgress'],
            'Close': []
        };
        
        if (!validTransitions[currentStatus].includes(newStatus)) {
            args.cancel = true;
            alert('Invalid workflow transition');
        }
    }
</script>
```

## Best Practices

1. **Always handle DragStop**: Implement business logic and validation
2. **Provide visual feedback**: Show valid drop zones during drag
3. **Use cancel flag**: Prevent invalid moves with proper user messaging
4. **Server synchronization**: Update server data after successful drops
5. **Swimlane considerations**: Enable cross-swimlane drag when needed for task reassignment
6. **External drag setup**: Ensure matching data structures between controls
7. **Performance**: Limit external board connections to 2-3 boards maximum
8. **User permissions**: Check authorization before allowing drag operations
9. **Data consistency**: Validate data integrity after external drops
10. **Error handling**: Provide fallback for failed server updates

## Common Patterns

**Pattern 1: Workflow Validation**
```javascript
function onDragStop(args) {
    // Only allow forward movement
    var statusOrder = ['Open', 'InProgress', 'Testing', 'Close'];
    var oldIndex = statusOrder.indexOf(args.data[0].OldStatus);
    var newIndex = statusOrder.indexOf(args.data[0].Status);
    
    if (newIndex < oldIndex) {
        args.cancel = true;
        alert('Cannot move tasks backward in workflow');
    }
}
```

**Pattern 2: Capacity Limits**
```javascript
function onDragStop(args) {
    var kanbanObj = document.getElementById('kanban').ej2_instances[0];
    var targetColumn = args.data[0].Status;
    var columnData = kanbanObj.getColumnData(targetColumn);
    
    if (columnData.length >= 5) {
        args.cancel = true;
        alert('Column has reached maximum capacity of 5 cards');
    }
}
```

**Pattern 3: Auto-Assignment**
```javascript
function onDragStop(args) {
    // Auto-assign when moving to 'InProgress'
    if (args.data[0].Status === 'InProgress' && !args.data[0].Assignee) {
        args.data[0].Assignee = getCurrentUser();
        args.data[0].StartDate = new Date();
    }
}
```
