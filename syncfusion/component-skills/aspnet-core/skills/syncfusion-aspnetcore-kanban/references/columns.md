# Columns in Syncfusion ASP.NET Core Kanban

## Table of Contents
- [Basic Column Configuration](#basic-column-configuration)
- [Multi-Key Columns](#multi-key-columns)
- [Column Header Template](#column-header-template)
- [Collapsible Columns](#collapsible-columns)
- [Stacked Headers](#stacked-headers)
- [Column-Level Drag Control](#column-level-drag-control)
- [Card Count Badge](#card-count-badge)

## Basic Column Configuration

Each `<e-kanban-column>` maps one or more data field values to a visible column:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Review" keyField="Review"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

- `keyField` on `<ejs-kanban>` — the data model property used to route cards to columns
- `keyField` on `<e-kanban-column>` — the value(s) of that property that belong in this column
- `headerText` — the column title displayed in the board header

## Multi-Key Columns

Assign multiple status values to a single column using a comma-separated `keyField`:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress or Review"
            keyField="InProgress,Review"></e-kanban-column>
        <e-kanban-column headerText="Close" keyField="Close,Validate"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

Cards with any of the comma-separated values appear in that column. When dragging into a multi-key column, the card's status is set to the first value in the list.

## Column Header Template

Replace the default header text with a custom HTML template:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"
            template="#headerTemplate">
        </e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>

<script id="headerTemplate" type="text/x-template">
    <div class="header-template-wrap">
        <div class="header-icon e-icons ${keyField}"></div>
        <div class="header-text">${headerText}</div>
    </div>
</script>
```

The template context provides `keyField` and `headerText` values from the column definition.

## Collapsible Columns

Allow users to collapse a column to save screen space:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"
            allowToggle="true"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"
            allowToggle="true" isExpanded="false"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"
            allowToggle="true"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

- `allowToggle="true"` — shows a collapse/expand toggle icon in the column header
- `isExpanded="false"` — renders the column collapsed on initial load (default is `true`)

## Stacked Headers

Group columns under a shared parent header for multi-level column headings:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-stackedheaders>
        <e-kanban-stackedheader text="To Do" keyFields="Open"></e-kanban-stackedheader>
        <e-kanban-stackedheader text="Development" keyFields="InProgress,Review,Testing"></e-kanban-stackedheader>
        <e-kanban-stackedheader text="Done" keyFields="Close"></e-kanban-stackedheader>
    </e-kanban-stackedheaders>
    <e-kanban-columns>
        <e-kanban-column headerText="Open" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Review" keyField="Review"></e-kanban-column>
        <e-kanban-column headerText="Testing" keyField="Testing"></e-kanban-column>
        <e-kanban-column headerText="Close" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

- `<e-kanban-stackedheaders>` wraps one or more `<e-kanban-stackedheader>` entries
- `text` — the stacked (parent) header display label
- `keyFields` — comma-separated list of child column `keyField` values covered by this stacked header

## Column-Level Drag Control

Restrict which columns cards can be dragged from or dropped into:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"
            allowDrag="true" allowDrop="false"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"
            allowDrag="true" allowDrop="true"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"
            allowDrag="false" allowDrop="true"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

- `allowDrag="false"` — cards in this column cannot be dragged out
- `allowDrop="false"` — cards cannot be dropped into this column
- Both default to `true` when `allowDragAndDrop` is enabled on `<ejs-kanban>`

To restrict column drag-and-drop (reordering columns themselves), use `allowColumnDragAndDrop` on `<ejs-kanban>`:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    allowColumnDragAndDrop="true">
```

## Card Count Badge

Show the number of cards in each column header:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"
            showItemCount="true"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"
            showItemCount="true" minCount="3" maxCount="6"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"
            showItemCount="true"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

`showItemCount="true"` displays a badge in the column header showing the current card count. This badge also reflects min/max constraint violations visually when `minCount`/`maxCount` are set.
