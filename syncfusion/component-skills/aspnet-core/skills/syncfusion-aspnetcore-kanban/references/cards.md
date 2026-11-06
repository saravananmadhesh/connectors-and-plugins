# Cards in Syncfusion ASP.NET Core Kanban

## Table of Contents
- [Card Settings Overview](#card-settings-overview)
- [Header Field](#header-field)
- [Content Field](#content-field)
- [Show or Hide Card Header](#show-or-hide-card-header)
- [Card Template](#card-template)
- [Card Selection](#card-selection)
- [Card Color](#card-color)

## Card Settings Overview

All card configuration lives inside `<e-kanban-cardsettings>`:

```html
<e-kanban-cardsettings
    headerField="Title"
    contentField="Summary"
    showHeader="true"
    selectionType="Single">
</e-kanban-cardsettings>
```

## Header Field

`headerField` is **mandatory**. It must map to a unique identifier field in the data (not necessarily displayed text — it serves as the card's unique ID for CRUD operations):

```html
<e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
```

- Used internally as the card's unique key for drag-and-drop, dialog, and CRUD
- Should map to a field with unique values across all records (e.g., `Title`, `Id`)
- Displayed as the card header text when `showHeader="true"`

## Content Field

`contentField` maps to the field shown as the card body text:

```html
<e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
```

Cards display the value of this field as their main content beneath the header.

## Show or Hide Card Header

Control visibility of the card header row with `showHeader`:

```html
<!-- Hide header (default is true) -->
<e-kanban-cardsettings headerField="Title" contentField="Summary" showHeader="false">
</e-kanban-cardsettings>
```

When `showHeader="false"`, only the `contentField` text is shown on each card — useful for compact boards where the title is not needed.

## Card Template

Replace the default card layout with a fully custom HTML template using jsrender syntax:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"
        template="#cardTemplate">
    </e-kanban-cardsettings>
</ejs-kanban>

<script id="cardTemplate" type="text/x-template">
    <table class="card-template-wrap">
        <tbody>
            <tr>
                <td class="CardHeader">${Title}</td>
            </tr>
            <tr>
                <td>${Summary}</td>
            </tr>
            <tr>
                <td class="e-badge e-badge-success">${Type}</td>
                <td class="e-badge e-badge-primary">${Priority}</td>
            </tr>
        </tbody>
    </table>
</script>
```

- `template` value must be the `id` of a `<script type="text/x-template">` block
- Use `${fieldName}` syntax to render data field values
- The template receives the entire card data object as its context
- Add CSS classes from the Syncfusion theme (e.g., `e-badge`) or custom classes

## Card Selection

Control how users select cards with `selectionType`:

```html
<!-- No selection -->
<e-kanban-cardsettings headerField="Title" contentField="Summary"
    selectionType="None">
</e-kanban-cardsettings>

<!-- Single card selection (default) -->
<e-kanban-cardsettings headerField="Title" contentField="Summary"
    selectionType="Single">
</e-kanban-cardsettings>

<!-- Multiple card selection -->
<e-kanban-cardsettings headerField="Title" contentField="Summary"
    selectionType="Multiple">
</e-kanban-cardsettings>
```

| Value | Behavior |
|---|---|
| `None` | Cards cannot be selected |
| `Single` | One card selected at a time; click another to switch |
| `Multiple` | Multiple cards selectable; on mobile shows a count popup |

On mobile with `Multiple`, users see a popup showing the number of selected cards.

## Card Color

Apply color coding to cards using a color field in the data model:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"
        colorField="Color">
    </e-kanban-cardsettings>
</ejs-kanban>
```

Set a hex color string in the data model's `Color` field:

```csharp
TaskDetails.Add(new KanbanDataModels {
    Title = "Task - 29001", Status = "Open",
    Summary = "Analyze requirements.", Color = "#8b447a"
});
```

The color appears as a left-border accent on each card.
