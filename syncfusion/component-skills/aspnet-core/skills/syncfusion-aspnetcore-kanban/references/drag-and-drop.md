# Drag and Drop in Syncfusion ASP.NET Core Kanban

## Table of Contents
- [Internal Column Drag](#internal-column-drag)
- [Disable Drag and Drop](#disable-drag-and-drop)
- [Per-Column Drag Control](#per-column-drag-control)
- [Transition Column Restrictions](#transition-column-restrictions)
- [Cross-Swimlane Drag](#cross-swimlane-drag)
- [External Drag (Kanban to Kanban)](#external-drag-kanban-to-kanban)
- [Kanban to Treeview](#kanban-to-treeview)
- [Kanban to Schedule](#kanban-to-schedule)

## Internal Column Drag

Drag and drop between columns is enabled by default. Cards can be moved to any column on the board.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

On mobile, tap-hold a card to initiate drag. The board auto-adapts to touch events.

## Disable Drag and Drop

Turn off all drag-and-drop interactions globally:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    allowDragAndDrop="false">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

## Per-Column Drag Control

Allow drag from some columns but not others, or block drops to specific columns:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <!-- Cards can be dragged out but not dropped in (source-only column) -->
        <e-kanban-column headerText="Backlog" keyField="Open"
            allowDrag="true" allowDrop="false"></e-kanban-column>
        <!-- Normal bidirectional drag -->
        <e-kanban-column headerText="In Progress" keyField="InProgress"
            allowDrag="true" allowDrop="true"></e-kanban-column>
        <!-- Cards can be dropped in but not dragged out (sink column) -->
        <e-kanban-column headerText="Done" keyField="Close"
            allowDrag="false" allowDrop="true"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

## Transition Column Restrictions

Define allowed next-columns for each column to enforce workflow order:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"
            transitionColumns="InProgress"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"
            transitionColumns="Review,Open"></e-kanban-column>
        <e-kanban-column headerText="Review" keyField="Review"
            transitionColumns="Close,InProgress"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

`transitionColumns` accepts a comma-separated list of `keyField` values for columns that are valid drop targets. Dragging to any column not in the list is blocked.

## Cross-Swimlane Drag

Enable cards to be moved between swimlane rows:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
    <e-kanban-swimlanesettings keyField="Assignee" textField="Assignee"
        allowDragAndDrop="true">
    </e-kanban-swimlanesettings>
</ejs-kanban>
```

Cross-swimlane drag updates both the column status field and the swimlane grouping field when a card is dropped in a different row.

## External Drag (Kanban to Kanban)

Move cards between two separate Kanban boards using the `dragStop` event and public API methods:

```html
<!-- Source Kanban -->
<ejs-kanban id="Kanban1" keyField="Status" dataSource="@ViewBag.data1"
    externalDropId='["#Kanban2"]' dragStop="onDragStop1">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>

<!-- Target Kanban -->
<ejs-kanban id="Kanban2" keyField="Status" dataSource="@ViewBag.data2"
    externalDropId='["#Kanban1"]' dragStop="onDragStop2">
    <e-kanban-columns>
        <e-kanban-column headerText="Review" keyField="Review"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    var kanbanObj1 = document.getElementById('Kanban1').ej2_instances[0];
    var kanbanObj2 = document.getElementById('Kanban2').ej2_instances[0];

    function onDragStop1(args) {
        // If dropped onto Kanban2, remove from Kanban1 and add to Kanban2
        var kanban2Element = ej.base.closest(args.event.target, '#Kanban2');
        if (kanban2Element) {
            kanbanObj1.deleteCard(args.data);
            // Resolve duplicate headerField values before adding
            args.data.forEach(function(card) {
                card.Title = 'Card-' + Math.random().toString(36).substr(2, 5);
            });
            kanbanObj2.addCard(args.data, args.dropIndex);
            args.cancel = true;
        }
    }

    function onDragStop2(args) {
        var kanban1Element = ej.base.closest(args.event.target, '#Kanban1');
        if (kanban1Element) {
            kanbanObj2.deleteCard(args.data);
            kanbanObj1.addCard(args.data, args.dropIndex);
            args.cancel = true;
        }
    }
</script>
```

- `externalDropId` — array of element IDs that are valid drop targets for external drag
- `dragStop` event fires when a card is dropped (on both the source and target boards)
- `deleteCard(data)` — removes cards from a Kanban programmatically
- `addCard(data, index)` — inserts cards at a specific position in a Kanban
- Set `args.cancel = true` to prevent the default drop behavior after handling manually
- If both boards use the same `headerField`, generate new unique values to avoid duplicates

## Kanban to Treeview

Drag cards from a Kanban into an EJ2 TreeView (and back):

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.kanbanData"
    externalDropId='["#TreeView"]' dragStop="onKanbanDragStop">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>

<ejs-treeview id="TreeView" created="onTreeCreated"></ejs-treeview>

<script>
    var kanbanObj, treeObj;
    function onTreeCreated() { treeObj = this; }

    function onKanbanDragStop(args) {
        var treeElement = ej.base.closest(args.event.target, '#TreeView');
        if (treeElement) {
            kanbanObj.deleteCard(args.data);
            // Convert Kanban card data to TreeView node format
            var treeData = args.data.map(function(d) {
                return { id: d.Id, name: d.Title };
            });
            treeObj.addNodes(treeData);
            args.cancel = true;
        }
    }
</script>
```

To drag from TreeView back to Kanban, handle the TreeView `nodeDragStop` event:

```javascript
function onTreeDragStop(args) {
    var kanbanElement = ej.base.closest(args.event.target, '#Kanban');
    if (kanbanElement) {
        treeObj.removeNodes([args.draggedNodeData.id.toString()]);
        var cardData = { Id: args.draggedNodeData.id, Title: args.draggedNodeData.text, Status: 'Open' };
        kanbanObj.openDialog('Add', cardData);
    }
}
```

## Kanban to Schedule

Move cards from Kanban into an EJ2 Schedule and back:

```javascript
// Kanban dragStop → open Schedule editor with card data
function onKanbanDragStop(args) {
    var scheduleElement = ej.base.closest(args.event.target, '#Schedule');
    if (scheduleElement) {
        kanbanObj.deleteCard(args.data);
        // Map Kanban card fields to Schedule event fields
        var eventData = {
            Id: args.data[0].Id,
            Subject: args.data[0].Title,
            StartTime: new Date(),
            EndTime: new Date(new Date().setHours(new Date().getHours() + 1))
        };
        scheduleObj.openEditor(eventData, 'Add', true);
        args.cancel = true;
    }
}

// Schedule → Kanban: on Schedule event delete, add back to Kanban
function onScheduleEventDelete(args) {
    var cardData = { Title: args.data.Subject, Status: 'Open', Summary: args.data.Subject };
    kanbanObj.openDialog('Add', cardData);
}
```
