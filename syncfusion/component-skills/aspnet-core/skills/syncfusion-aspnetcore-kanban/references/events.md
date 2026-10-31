```markdown
# Events in Syncfusion ASP.NET Core Kanban

## Table of Contents
- [ActionBegin](#actionbegin)
- [ActionComplete](#actioncomplete)
- [ActionFailure](#actionfailure)
- [CardClick](#cardclick)
- [CardDoubleClick](#carddoubleclick)
- [CardRendered](#cardrendered)
- [ColumnDrag](#columndrag)
- [ColumnDragStart](#columndragstart)
- [ColumnDrop](#columndrop)
- [Created](#created)
- [DataBinding](#databinding)
- [DataBound](#databound)
- [DataSourceChanged](#datasourcechanged)
- [DialogClose](#dialogclose)
- [DialogOpen](#dialogopen)
- [Drag](#drag)
- [DragStart](#dragstart)
- [DragStop](#dragstop)
- [QueryCellInfo](#querycellinfo)

## ActionBegin

**Type:** `System.String`  
**Description:** Triggers on beginning of every Kanban action.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    actionBegin="onActionBegin">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onActionBegin(args) {
        // args contains action details
        console.log(args.requestType);
    }
</script>
```

## ActionComplete

**Type:** `System.String`  
**Description:** Triggers on successful completion of the Kanban actions.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    actionComplete="onActionComplete">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onActionComplete(args) {
        console.log('Action completed:', args.requestType);
    }
</script>
```

## ActionFailure

**Type:** `System.String`  
**Description:** Triggers when a Kanban action gets failed or interrupted; error information is returned in the event arguments.

```html
<ejs-kanban id="Kanban" keyField="Status"
    actionFailure="onActionFailure">
    <e-data-manager url="/api/tasks" adaptor="UrlAdaptor"></e-data-manager>
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onActionFailure(args) {
        console.error('Action failed:', args.error);
    }
</script>
```

## CardClick

**Type:** `System.String`  
**Description:** Triggers on single-clicking the Kanban cards.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    cardClick="onCardClick">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onCardClick(args) {
        console.log('Card clicked:', args.data);
    }
</script>
```

## CardDoubleClick

**Type:** `System.String`  
**Description:** Triggers on double-clicking the Kanban cards.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    cardDoubleClick="onCardDoubleClick">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onCardDoubleClick(args) {
        args.cancel = true; // prevent default dialog from opening
        console.log('Card double-clicked:', args.data);
    }
</script>
```

## CardRendered

**Type:** `System.String`  
**Description:** Triggers before each card of the Kanban renders on the page.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    cardRendered="onCardRendered">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onCardRendered(args) {
        // Customize card element before it appears
        if (args.data.Priority === 'High') {
            args.element.classList.add('high-priority');
        }
    }
</script>
```

## ColumnDrag

**Type:** `System.String`  
**Description:** Triggers during the column drag operation.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    allowColumnDragAndDrop="true" columnDrag="onColumnDrag">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onColumnDrag(args) {
        console.log('Column dragging');
    }
</script>
```

## ColumnDragStart

**Type:** `System.String`  
**Description:** Triggers when a column drag operation starts.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    allowColumnDragAndDrop="true" columnDragStart="onColumnDragStart">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onColumnDragStart(args) {
        console.log('Column drag started:', args.column);
    }
</script>
```

## ColumnDrop

**Type:** `System.String`  
**Description:** Triggers when a column is dropped after a drag operation.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    allowColumnDragAndDrop="true" columnDrop="onColumnDrop">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onColumnDrop(args) {
        console.log('Column dropped');
    }
</script>
```

## Created

**Type:** `System.String`  
**Description:** Triggers after the Kanban board is created and fully rendered.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    created="onCreated">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onCreated() {
        console.log('Kanban board is ready');
    }
</script>
```

## DataBinding

**Type:** `System.String`  
**Description:** Triggers before the data binds to the Kanban.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    dataBinding="onDataBinding">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onDataBinding(args) {
        console.log('Data binding about to occur');
    }
</script>
```

## DataBound

**Type:** `System.String`  
**Description:** Triggers once the event data is bound to the Kanban.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    dataBound="onDataBound">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onDataBound(args) {
        console.log('Data bound to Kanban');
    }
</script>
```

## DataSourceChanged

**Type:** `System.String`  
**Description:** Triggers when the Kanban data is added, deleted, or updated.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    dataSourceChanged="onDataSourceChanged">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onDataSourceChanged(args) {
        console.log('Data source changed:', args.requestType);
    }
</script>
```

## DialogClose

**Type:** `System.String`  
**Description:** Triggers before the card edit dialog closes.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    dialogClose="onDialogClose">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onDialogClose(args) {
        console.log('Dialog closing');
    }
</script>
```

## DialogOpen

**Type:** `System.String`  
**Description:** Triggers before the card edit dialog opens. Set `args.cancel = true` to prevent the dialog from opening.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    dialogOpen="onDialogOpen">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onDialogOpen(args) {
        // Prevent dialog from opening on double-click
        args.cancel = true;
    }
</script>
```

## Drag

**Type:** `System.String`  
**Description:** Triggers when a card is being dragged to another column or swimlane.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    drag="onDrag">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onDrag(args) {
        console.log('Card dragging:', args.data);
    }
</script>
```

## DragStart

**Type:** `System.String`  
**Description:** Triggers when a card drag action starts.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    dragStart="onDragStart">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onDragStart(args) {
        console.log('Drag started for card:', args.data);
    }
</script>
```

## DragStop

**Type:** `System.String`  
**Description:** Triggers when a card drag action stops (on drop). Use this event for cross-Kanban drag-and-drop scenarios.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    dragStop="onDragStop">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onDragStop(args) {
        // Cross-Kanban drag: delete card from source and add to target
        if (args.name === 'dragStop') {
            var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
            kanbanObj.deleteCard(args.data);
        }
    }
</script>
```

## QueryCellInfo

**Type:** `System.String`  
**Description:** Triggers before each column of the Kanban renders on the page. Use it to customize column elements.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    queryCellInfo="onQueryCellInfo">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onQueryCellInfo(args) {
        // Customize column cell element
        console.log('Column rendering:', args.data);
    }
</script>
```
```
