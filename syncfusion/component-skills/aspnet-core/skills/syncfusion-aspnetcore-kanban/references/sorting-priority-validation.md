# Sorting, Priority, and Validation in Syncfusion ASP.NET Core Kanban

## Table of Contents
- [Card Sorting](#card-sorting)
- [Sort by Index (Default)](#sort-by-index-default)
- [Sort by DataSourceOrder](#sort-by-datasourceorder)
- [Sort by Custom Field](#sort-by-custom-field)
- [Priority-Based Card Ordering](#priority-based-card-ordering)
- [Column Card Count Validation](#column-card-count-validation)
- [Swimlane Constraint Type](#swimlane-constraint-type)

## Card Sorting

Control the order of cards within each column using `<e-kanban-sortsettings>`:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
    <e-kanban-sortsettings sortBy="Index" direction="Ascending"></e-kanban-sortsettings>
</ejs-kanban>
```

## Sort by Index (Default)

`sortBy="Index"` is the default behavior. There are two modes depending on whether `field` is specified:

**Without `field` — order by JSON array position:**

```html
<e-kanban-sortsettings sortBy="Index" direction="Ascending"></e-kanban-sortsettings>
```

Cards load in the order they appear in the data source. When a card is dropped, its new position in the column is preserved visually but the underlying data field is not updated.

**With `field` — order by a numeric rank field:**

```html
<e-kanban-sortsettings sortBy="Index" field="RankId" direction="Ascending">
</e-kanban-sortsettings>
```

Cards load sorted by `RankId` value. When a card is dropped to a new position, the `RankId` values of the dragged card and all following cards in the column are automatically updated to reflect the new order.

- `field` must map to a numeric integer field in the data model
- `direction` — `Ascending` (lower number = higher position) or `Descending`

## Sort by DataSourceOrder

Preserve the original order from the data source on both load and drop:

```html
<e-kanban-sortsettings sortBy="DataSourceOrder"></e-kanban-sortsettings>
```

Cards always render in the order they appear in the `dataSource` array, regardless of any drops. Drop position is reset to data source order after the operation. No `field` is needed.

## Sort by Custom Field

Sort cards alphabetically or numerically by a specific field value:

```html
<e-kanban-sortsettings sortBy="Custom" field="Priority" direction="Ascending">
</e-kanban-sortsettings>
```

Cards render sorted by the `Priority` field on load. When a card is dropped, it is reinserted at the sorted position for its field value — not at the visual drop location. Both load and drop honor the field order.

- `field` is required for `Custom` mode
- Works with string fields (alphabetical) and numeric fields

## Priority-Based Card Ordering

Enable exact-position drop ordering using a numeric rank field on `<e-kanban-cardsettings>`:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"
        priority="RankId">
    </e-kanban-cardsettings>
</ejs-kanban>
```

- `priority="RankId"` — tells the Kanban which field stores the position rank
- The field must be of type `int` in the C# data model
- When a card is dropped between two cards, the rank value is inserted between their rank values
- If the neighboring ranks are consecutive integers, the ranks of following cards are cascaded/shifted to accommodate the new position

**Data model requirement:**

```csharp
public class KanbanDataModels
{
    // ...
    public int RankId { get; set; }  // Must be int/numeric type
}
```

The `priority` field and `sortBy="Index"` with `field` can be used together. The `priority` field governs drop positioning while `sortBy` governs load ordering.

## Column Card Count Validation

Enforce minimum and maximum card counts per column:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"
            showItemCount="true"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"
            minCount="3" maxCount="6" showItemCount="true"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"
            showItemCount="true"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

- `minCount` — minimum number of cards the column should have
- `maxCount` — maximum number of cards allowed in the column
- When violated, the column header count badge changes color (red for max exceeded, yellow for below min)
- `showItemCount="true"` is required on the column to display the count badge; without it, no visual indicator appears
- Validation is visual only — it does not block the drag-and-drop operation itself

**Constraint behavior:**

| Situation | Visual indicator |
|---|---|
| Cards < `minCount` | Count badge turns color indicating under-constraint |
| Cards > `maxCount` | Count badge turns color indicating over-constraint |
| Cards within range | Count badge shown in normal style |

## Swimlane Constraint Type

Apply `minCount`/`maxCount` constraints per swimlane row instead of per column:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"
            constraintType="Swimlane" maxCount="5" showItemCount="true">
        </e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"
            constraintType="Swimlane" minCount="1" maxCount="3" showItemCount="true">
        </e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"
            showItemCount="true"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
    <e-kanban-swimlanesettings keyField="Assignee" textField="Assignee"></e-kanban-swimlanesettings>
</ejs-kanban>
```

- `constraintType="Column"` (default) — counts all cards in the column regardless of swimlane
- `constraintType="Swimlane"` — counts cards per swimlane row within the column independently
