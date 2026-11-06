# Cards Management

## Table of Contents
- [Overview](#overview)
- [Card Structure](#card-structure)
- [Header Configuration](#header-configuration)
- [Content Configuration](#content-configuration)
- [Drag and Drop](#drag-and-drop)
- [Card Templates](#card-templates)
- [Card Selection](#card-selection)
- [Multiple Selection](#multiple-selection)

## Overview

Cards are the main elements in a Kanban board, representing individual tasks or work items. Each card displays task information through a header and content area, which are mapped from the data source. Cards support drag-and-drop, custom templates, and single or multiple selection modes.

**Essential CardSettings Properties:**
- `HeaderField`: Unique identifier field (mandatory, acts as primary key)
- `ContentField`: Main content text field
- `ShowHeader`: Show/hide card header
- `Template`: Custom HTML template for card layout
- `SelectionType`: None, Single, or Multiple selection
- `GrabberField`: Field for card color/category
- `TagsField`: Field for card labels/tags
- `FooterCssField`: Field for footer icons/classes

## Card Structure

A Kanban card consists of two main parts:

1. **Header**: Displays the unique identifier (typically ID or task number)
2. **Content**: Displays the main information (summary, description, or custom content)

**Basic Configuration:**

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
        card.HeaderField("Id")          // Required: unique identifier
            .ContentField("Summary");    // Main content text
    })
    .Render()
```

## Header Configuration

The card header is mapped using the `HeaderField` property and displays at the top of each card.

### HeaderField (Mandatory)

**Critical:** `HeaderField` is required and serves as the unique identifier for cards. It prevents card duplication and enables CRUD operations.

**Important Notes:**
- Must be unique across all cards
- Cannot be changed using `UpdateCard` method or server-side updates
- Acts as the primary key for the card

**Example:**

```csharp
// Data Model
public class KanbanDataModel
{
    public int Id { get; set; }            // Used as HeaderField
    public string Status { get; set; }
    public string Summary { get; set; }
}
```

```razor
.CardSettings(card =>
{
    card.HeaderField("Id")  // Maps to Id property
        .ContentField("Summary");
})
```

### Show or Hide Header

Control header visibility using the `ShowHeader` property.

**Example - Hide Headers:**

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
        card.ContentField("Summary")
            .HeaderField("Id")
            .ShowHeader(false);  // Hide card headers
    })
    .Render()
```

**Default:** `ShowHeader` is `true` by default.

**Use Cases:**
- Creating minimalist card layouts
- When card header information is redundant
- Displaying only essential content

## Content Configuration

The card content is mapped using the `ContentField` property, which pulls text from the data source.

**Example:**

```razor
.CardSettings(card =>
{
    card.HeaderField("Id")
        .ContentField("Summary");  // Displays Summary field as card content
})
```

**If ContentField is not defined:** Cards render with empty content area, showing only headers.

**Data Example:**

```csharp
new KanbanDataModel
{
    Id = 1,
    Status = "Open",
    Summary = "Analyze customer requirements for new feature",  // This becomes card content
    Assignee = "Nancy Davloio"
}
```

## Drag and Drop

Cards support drag-and-drop operations by default, allowing users to move tasks between columns or within a column.

### Default Behavior

The `AllowDragAndDrop` property is enabled by default on the Kanban board, allowing cards to be dragged and dropped:
- **Column to column**: Move cards between different workflow stages
- **Within column**: Reorder cards within the same column

**Visual Feedback:**
- Dotted borders appear on valid drop targets during drag operations
- Dragged card follows cursor with reduced opacity
- Drop zones highlight when hovering

### Disabling Drag and Drop

**Example - Disable Globally:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .AllowDragAndDrop(false)  // Disable all drag-and-drop
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

**Per-Column Control:**

For fine-grained control, use `AllowDrag` and `AllowDrop` on individual columns. See the [columns.md](columns.md) reference for details.

## Card Templates

Customize card layout and appearance with HTML templates using the `Template` property.

**⚠️ CRITICAL: Template Placement in ASP.NET MVC**

For templates to work correctly in ASP.NET MVC Razor views, the `<script>` template **MUST be defined BEFORE the Kanban component**, not after `.Render()`. If the template appears after the component, it may display as literal text (e.g., "#cardTemplate") instead of rendering.

**Recommended Placement Order:**
1. Define `<script id="cardTemplate" type="text/x-jsrender">` template first
2. Then render the Kanban component with `.Template("#cardTemplate")`

**Template Variables Available:**
- All fields from your data source (e.g., `${Id}`, `${Summary}`, `${Assignee}`)
- Conditional logic using jsRender syntax

**Example - Custom Card with Image and Tags:**

```razor
@* Define template BEFORE the Kanban component *@
<script id="cardTemplate" type="text/x-jsrender">
    <div class='card-template'>
        <div class='card-template-wrap'>
            <table class='card-template-wrap'>
                <colgroup>
                    <col style="width:35px">
                    <col style="width:calc(100% - 45px)">
                </colgroup>
                <tbody>
                    <tr>
                        <td class='e-image'>
                            <img src="../Content/images/Kanban/${ImageURL}.png" alt="">
                        </td>
                        <td class='e-title'>
                            <div class="e-card-stacked">
                                <div class='e-card-header'>
                                    <div class='e-card-header-caption'>
                                        <div class='e-card-header-title'>${Title}</div>
                                    </div>
                                </div>
                                <div class="e-card-content" style="line-height:2.75em">
                                    <table class='card-template-wrap'>
                                        <tbody>
                                            <tr>
                                                ${if(Category =="Menu" || Category=="Order" || Category=="Ready to Serve")}
                                                <td colspan="2">
                                                    <div class='e-description'>
                                                        ${if(Category =="Menu")}
                                                        ${Description}
                                                        ${else}
                                                        ${OrderID}
                                                        ${/if}
                                                    </div>
                                                </td>
                                                ${else}
                                                <td><div class='e-description'>${OrderID}</div></td>
                                                <td><span class='e-icons e-done'></span></td>
                                                ${/if}
                                            </tr>
                                            <tr>
                                                ${if(Category !="Menu")}
                                                ${if(Category =="Order")}
                                                <td><div class='e-preparingText'>Preparing</div></td>
                                                <td class='e-prepare'>
                                                    <div class='e-time'>
                                                        <div class='e-icons e-clock'></div>
                                                        <div class='e-mins'>15 mins</div>
                                                    </div>
                                                </td>
                                                ${/if}
                                                ${if(Category =="Ready to Serve")}
                                                <td><div class='e-readyText'>Ready to Serve</div></td>
                                                <td class='e-prepare'>
                                                    <div class='e-time'>
                                                        <div class='e-icons e-clock'></div>
                                                        <div class='e-mins'>5 mins</div>
                                                    </div>
                                                </td>
                                                ${/if}
                                                ${if(Category =="Delivered" || Category=="Served")}
                                                <td><div class='e-deliveredText'>Delivered</div></td>
                                                ${/if}
                                                ${else}
                                                <td><div class='e-size'>${Size}</div></td>
                                                <td><div class='e-price'>${Price}</div></td>
                                                ${/if}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</script>

@* Now render the Kanban component AFTER the template *@
@Html.EJS().Kanban("kanban")
    .KeyField("Category")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("Menu").KeyField("Menu").Add();
        col.HeaderText("Order").KeyField("Order").Add();
        col.HeaderText("Ready to Serve").KeyField("Ready to Serve").Add();
        col.HeaderText("Delivered").KeyField("Delivered,Served").Add();
    })
    .CardSettings(card =>
    {
        card.HeaderField("Id").Template("#cardTemplate");
    })
    .Render()
```

**Template Features:**
- Use jsRender conditional syntax: `${if()}`, `${else}`, `${/if}`
- Access all data fields: `${FieldName}`
- Include images, icons, and custom HTML
- Apply CSS classes for styling

**Use Cases:**
- Adding avatars or profile images
- Displaying priority indicators with colors
- Showing tags, labels, or categories
- Including action buttons or links
- Rich formatting with badges and icons

## Card Selection

Control user card selection behavior using the `SelectionType` property.

**Selection Types:**
1. **None**: No cards can be selected
2. **Single**: Only one card can be selected at a time (default)
3. **Multiple**: Multiple cards can be selected simultaneously

### Single Selection (Default)

**Example:**

```razor
.CardSettings(card =>
{
    card.ContentField("Summary")
        .HeaderField("Id")
        .SelectionType(SelectionType.Single);
})
```

**Behavior:**
- Click a card to select it
- Clicking another card deselects the previous one
- Selected card gets highlighted with a different background

### No Selection

**Example:**

```razor
.CardSettings(card =>
{
    card.ContentField("Summary")
        .HeaderField("Id")
        .SelectionType(SelectionType.None);
})
```

**Use Cases:**
- Read-only boards
- When selection interferes with drag-and-drop
- Display-only dashboards

## Multiple Selection

Enable users to select multiple cards for batch operations.

**Example:**

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
        card.ContentField("Summary")
            .HeaderField("Id")
            .SelectionType(SelectionType.Multiple);
    })
    .Render()
```

### Selection Techniques

**Random Selection (Ctrl + Click):**
- Hold **Ctrl** key
- Click individual cards to select/deselect
- Each click toggles selection state

**Continuous Selection (Shift + Click):**
- Click the first card
- Hold **Shift** key
- Click the last card in the range
- All cards between first and last are selected

**Programmatic Selection:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];
var selectedCards = kanbanObj.getSelectedCards();  // Returns array of selected card elements
```

**Use Cases:**
- Bulk card operations (delete, move, update)
- Batch assignment to team members
- Mass status updates
- Reporting on selected items

## Additional Card Properties

### Tags Field

Display tags or labels on cards using the `TagsField` property.

```razor
.CardSettings(card =>
{
    card.HeaderField("Id")
        .ContentField("Summary")
        .TagsField("Tags");  // Maps to Tags field in data
})
```

**Data Example:**

```csharp
new KanbanDataModel
{
    Id = 1,
    Summary = "Fix login bug",
    Tags = "Bug,High Priority,Frontend"  // Comma-separated tags
}
```

### Footer CSS Field

Apply custom CSS classes or icons to card footers.

```razor
.CardSettings(card =>
{
    card.HeaderField("Id")
        .ContentField("Summary")
        .FooterCssField("FooterClass");
})
```

### Grabber Field

Set card background color or visual indicator based on a data field.

```razor
.CardSettings(card =>
{
    card.HeaderField("Id")
        .ContentField("Summary")
        .GrabberField("Priority");  // Color-code by priority
})
```

## Card Events

Cards trigger events for user interactions:

- **CardClick**: Single-click on a card
- **CardDoubleClick**: Double-click on a card (opens dialog by default)
- **CardRendered**: Before each card renders (customize per card)

See [events.md](events.md) for detailed event documentation.

## Best Practices

1. **Always set HeaderField**: It's mandatory and must be unique
2. **Use ContentField for quick setup**: Define templates only when needed
3. **Enable multiple selection**: For boards with frequent batch operations
4. **Test templates thoroughly**: Ensure conditional logic handles all data states
5. **Consider card height**: Use consistent content to maintain visual alignment
6. **Optimize template complexity**: Heavy templates can impact rendering performance
7. **Use meaningful field mappings**: Map fields that provide clear task information
