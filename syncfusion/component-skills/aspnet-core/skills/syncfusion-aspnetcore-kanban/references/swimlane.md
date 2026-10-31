# Swimlanes in Syncfusion ASP.NET Core Kanban

## Table of Contents
- [Basic Swimlane Setup](#basic-swimlane-setup)
- [Swimlane Header Template](#swimlane-header-template)
- [Swimlane Sorting](#swimlane-sorting)
- [Cross-Swimlane Drag and Drop](#cross-swimlane-drag-and-drop)
- [Empty Row and Item Count](#empty-row-and-item-count)
- [Frozen Swimlane Rows](#frozen-swimlane-rows)

## Basic Swimlane Setup

Add `<e-kanban-swimlanesettings>` to group cards into horizontal rows by a data field:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
    <e-kanban-swimlanesettings keyField="Assignee" textField="Assignee">
    </e-kanban-swimlanesettings>
</ejs-kanban>
```

- `keyField` — the data model field to group cards by (e.g., `Assignee`, `Type`, `Priority`)
- `textField` — the field whose value is displayed in the swimlane row header label
- When `keyField` and `textField` are the same field, both attributes can point to the same value

The board renders one horizontal row per unique value of `keyField` found in the dataset.

## Swimlane Header Template

Customize the swimlane row header with an HTML template:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
    <e-kanban-swimlanesettings keyField="Assignee" textField="Assignee"
        template="#swimlaneTemplate">
    </e-kanban-swimlanesettings>
</ejs-kanban>

<script id="swimlaneTemplate" type="text/x-template">
    <div class="swimlane-template e-avatar-content">
        <div class="e-avatar e-avatar-small e-avatar-circle">
            ${Assignee.charAt(0)}
        </div>
        <span>${Assignee}</span>
    </div>
</script>
```

The template context receives the swimlane row's data object. Use `${fieldName}` to render values.

## Swimlane Sorting

Control how swimlane rows are ordered with `sortBy`:

```html
<!-- Sort rows ascending by assignee name (default behavior) -->
<e-kanban-swimlanesettings keyField="Assignee" textField="Assignee"
    sortBy="Ascending">
</e-kanban-swimlanesettings>

<!-- Sort rows descending -->
<e-kanban-swimlanesettings keyField="Assignee" textField="Assignee"
    sortBy="Descending">
</e-kanban-swimlanesettings>
```

| `sortBy` | Behavior |
|---|---|
| `Ascending` | Rows ordered A→Z by `keyField` value |
| `Descending` | Rows ordered Z→A by `keyField` value |

## Cross-Swimlane Drag and Drop

By default, cards cannot be dragged to a different swimlane row. Enable cross-swimlane drag:

```html
<e-kanban-swimlanesettings keyField="Assignee" textField="Assignee"
    allowDragAndDrop="true">
</e-kanban-swimlanesettings>
```

When enabled, dragging a card to a column in a different swimlane row updates both the card's `keyField` (column status) and the swimlane field value (`keyField` of swimlane settings).

## Empty Row and Item Count

Control display of empty swimlane rows and show card counts:

```html
<e-kanban-swimlanesettings keyField="Assignee" textField="Assignee"
    showEmptyRow="true"
    showItemCount="true">
</e-kanban-swimlanesettings>
```

- `showEmptyRow="true"` — renders rows for swimlane values that have zero cards (hidden by default)
- `showItemCount="true"` — shows the total card count for each swimlane row in the row header

## Frozen Swimlane Rows

Keep swimlane row headers visible while scrolling card content horizontally:

```html
<e-kanban-swimlanesettings keyField="Assignee" textField="Assignee"
    enableFrozenRows="true">
</e-kanban-swimlanesettings>
```

When `enableFrozenRows="true"`, the swimlane row header label remains sticky/fixed in view as the user scrolls the board content to the right. This is useful for boards with many columns.
