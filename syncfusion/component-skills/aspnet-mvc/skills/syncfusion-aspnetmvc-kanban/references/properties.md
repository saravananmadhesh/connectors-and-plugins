# Kanban Properties Reference

## Overview

This reference documents all configurable properties of the Kanban component, organized by functional area.

## Core Properties

### KeyField

Maps the data source field that categorizes cards into columns.

**Type:** `System.String`  
**Default:** `null`  
**Required:** Yes

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")  // Maps to Status field in data
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
    .Render()
```

### DataSource

Binds data to the Kanban board.

**Type:** `System.Object`  
**Default:** `null`

**Supported Types:**
- `IEnumerable<object>` — Local data collection
- `DataManager` — Remote data with adaptors

**Example - Local Data:**

```razor
.DataSource((IEnumerable<object>)ViewBag.data)
```

**Example - Remote Data:**

```razor
.DataSource(dataManger => 
{ 
    dataManger.Url("/Kanban/GetData").Adaptor("UrlAdaptor"); 
})
```

See [data-binding.md](./data-binding.md) for detailed examples.

### Query

Defines external query for filtering or sorting data.

**Type:** `System.String`  
**Default:** `null`

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];
var filterQuery = new ej.data.Query().where('Priority', 'equal', 'High');
kanbanObj.query = filterQuery;
```

See [sorting-filtering-validation.md](./sorting-filtering-validation.md) for more examples.

## Dimension Properties

### Width

Sets the width of the Kanban board.

**Type:** `System.String`  
**Default:** `"auto"`

**Values:**
- `"auto"` — Auto-adjust to container
- Pixels — `"1200px"`
- Percentage — `"100%"`

**Example:**

```razor
.Width("100%")
```

### Height

Sets the height of the Kanban board.

**Type:** `System.String`  
**Default:** `"auto"`

**Values:**
- `"auto"` — Auto-adjust to content
- Pixels — `"600px"`
- Percentage — `"80%"`

**Example:**

```razor
.Height("600px")
```

**Note:** Height must be explicitly set for virtual scrolling.

See [customization-styling.md](./customization-styling.md) for more examples.

## Column Configuration

### Columns

Defines the Kanban board columns and their properties.

**Type:** `System.Collections.Generic.List<Syncfusion.EJ2.Kanban.KanbanColumn>`  
**Default:** `null`

**Column Properties:**
- `HeaderText` — Column header title
- `KeyField` — Column key (string supports multiple keys, number does not)
- `AllowToggle` — Enable collapse/expand (default: false)
- `IsExpanded` — Initial expand state (default: true)
- `AllowDrag` — Enable dragging cards from this column (default: true)
- `AllowDrop` — Enable dropping cards into this column (default: true)
- `MinCount` — Minimum card requirement
- `MaxCount` — Maximum card limit
- `ShowItemCount` — Display card count (default: true)
- `ShowAddButton` — Show add card button (default: false)
- `Template` — Custom column header template
- `TransitionColumns` — Define valid target columns for drag-and-drop

**Example:**

```razor
.Columns(col =>
{
    col.HeaderText("To Do")
        .KeyField("Open")
        .AllowToggle(true)
        .ShowAddButton(true)
        .Add();
        
    col.HeaderText("In Progress")
        .KeyField("InProgress")
        .MinCount(2)
        .MaxCount(5)
        .Add();
        
    col.HeaderText("Done")
        .KeyField("Close")
        .AllowDrag(false)  // Prevent dragging from Done
        .Add();
})
```

See [columns.md](./columns.md) for detailed examples.

### StackedHeaders

Defines stacked headers for grouping columns.

**Type:** `System.Collections.Generic.List<Syncfusion.EJ2.Kanban.KanbanStackedHeader>`  
**Default:** `null`

**Properties:**
- `Text` — Header group text
- `KeyFields` — Comma-separated column keys

**Example:**

```razor
.StackedHeaders(stack =>
{
    stack.Text("In Development").KeyFields("Open,InProgress").Add();
    stack.Text("Done").KeyFields("Testing,Close").Add();
})
```

See [columns.md](./columns.md#stacked-headers) for examples.

### ShowEmptyColumn

Display columns even when they contain no cards.

**Type:** `System.Boolean`  
**Default:** `false`

**Example:**

```razor
.ShowEmptyColumn(true)
```

## Card Configuration

### CardSettings

Defines card appearance and behavior.

**Type:** `Syncfusion.EJ2.Kanban.KanbanCardSettings`  
**Default:** `null`

**CardSettings Properties:**
- `HeaderField` — Data field for card header (required)
- `ContentField` — Data field for card content
- `ShowHeader` — Display card header (default: true)
- `Template` — Custom card template
- `SelectionType` — Card selection mode: None, Single, Multiple (default: Single)
- `TagsField` — Data field for tags
- `GrabberField` — Data field for drag handle color
- `FooterCssField` — Data field for footer CSS
- `Priority` — Data field for priority indicator

**Example:**

```razor
.CardSettings(card =>
{
    card.HeaderField("Id")
        .ContentField("Summary")
        .ShowHeader(true)
        .SelectionType(SelectionType.Multiple)
        .TagsField("Tags")
        .Priority("Priority");
})
```

See [cards.md](./cards.md) for detailed examples.

### CardHeight

Sets fixed height for all cards.

**Type:** `System.String`  
**Default:** `"auto"`

**Example:**

```razor
.CardSettings(card =>
{
    card.HeaderField("Id")
        .ContentField("Summary")
        .CardHeight("100px");
})
```

## Swimlane Configuration

### SwimlaneSettings

Defines swimlane row settings.

**Type:** `Syncfusion.EJ2.Kanban.KanbanSwimlaneSettings`  
**Default:** `null`

**SwimlaneSettings Properties:**
- `KeyField` — Data field for grouping (required)
- `TextField` — Data field for display text
- `Template` — Custom swimlane header template
- `AllowDragAndDrop` — Enable cross-swimlane drag (default: false)
- `SortDirection` — Ascending or Descending (default: Ascending)
- `SortComparer` — Custom sort function
- `ShowEmptyRow` — Display empty swimlanes (default: false)
- `ShowItemCount` — Display card count (default: true)
- `ShowUnassignedRow` — Display unassigned row (default: true)
- `EnableFrozenRows` — Freeze swimlane headers on scroll (default: false)

**Example:**

```razor
.SwimlaneSettings(swim =>
{
    swim.KeyField("Assignee")
        .TextField("AssigneeName")
        .AllowDragAndDrop(true)
        .SortDirection(SortDirection.Ascending)
        .ShowEmptyRow(true)
        .ShowItemCount(true)
        .EnableFrozenRows(true);
})
```

See [swimlane.md](./swimlane.md) for detailed examples.

## Dialog Configuration

### DialogSettings

Defines dialog settings for adding/editing cards.

**Type:** `Syncfusion.EJ2.Kanban.KanbanDialogSettings`  
**Default:** `null`

**DialogSettings Properties:**
- `Fields` — Array of dialog field configurations
- `Template` — Custom dialog template
- `Model` — Dialog model properties (width, height, etc.)

**Example:**

```razor
.DialogSettings(dialog =>
{
    dialog.Fields(field =>
    {
        field.Text("ID").Key("Id").Type("TextBox").Add();
        field.Text("Summary").Key("Summary").Type("TextArea")
            .ValidationRules(new { required = true }).Add();
        field.Text("Status").Key("Status").Type("DropDown").Add();
    })
    .Model(new { width = "600px", isModal = true });
})
```

See [dialog.md](./dialog.md) for detailed examples.

## Sorting and Constraints

### SortSettings

Defines card sorting within columns.

**Type:** `Syncfusion.EJ2.Kanban.KanbanSortSettings`  
**Default:** `null`

**SortSettings Properties:**
- `SortBy` — Index, DataSourceOrder, or Custom (default: Index)
- `Field` — Field name for custom sorting
- `Direction` — Ascending or Descending (default: Ascending)

**Example:**

```razor
.SortSettings(sort =>
{
    sort.SortBy(SortOrderBy.Custom)
        .Field("Priority")
        .Direction(SortDirection.Descending);
})
```

See [sorting-filtering-validation.md](./sorting-filtering-validation.md) for examples.

### ConstraintType

Defines constraint application scope (column or swimlane).

**Type:** `Syncfusion.EJ2.Kanban.ConstraintType`  
**Default:** `ConstraintType.Column`

**Values:**
- `ConstraintType.Column` — Apply limits per column
- `ConstraintType.Swimlane` — Apply limits per swimlane

**Example:**

```razor
.ConstraintType(ConstraintType.Swimlane)
```

See [sorting-filtering-validation.md](./sorting-filtering-validation.md#constraints) for examples.

## Drag and Drop

### AllowDragAndDrop

Enable/disable card drag-and-drop.

**Type:** `System.Boolean`  
**Default:** `true`

**Example:**

```razor
.AllowDragAndDrop(true)
```

### AllowColumnDragAndDrop

Enable/disable column reordering.

**Type:** `System.Boolean`  
**Default:** `false`

**Example:**

```razor
.AllowColumnDragAndDrop(true)
```

### ExternalDropId

Define external Kanban boards for card transfer.

**Type:** `System.String[]`  
**Default:** `null`

**Example:**

```razor
.ExternalDropId(new string[] { "#kanban2", "#kanban3" })
```

See [drag-and-drop.md](./drag-and-drop.md) for detailed examples.

## Advanced Features

### EnableVirtualization

Enable virtual scrolling for large datasets.

**Type:** `System.Boolean`  
**Default:** `false`

**Requirements:**
- Height must be explicitly set
- CardHeight recommended for optimal performance

**Example:**

```razor
.EnableVirtualization(true)
.Height("600px")
.CardSettings(card =>
{
    card.HeaderField("Id")
        .ContentField("Summary")
        .CardHeight("80px");
})
```

See [advanced-features.md](./advanced-features.md) for detailed examples.

### AllowKeyboard

Enable/disable keyboard navigation.

**Type:** `System.Boolean`  
**Default:** `true`

**Example:**

```razor
.AllowKeyboard(true)
```

See [advanced-features.md](./advanced-features.md#keyboard-navigation) for keyboard shortcuts.

### EnableTooltip

Enable/disable card tooltips.

**Type:** `System.Boolean`  
**Default:** `false`

**Example:**

```razor
.EnableTooltip(true)
```

### TooltipTemplate

Custom tooltip template.

**Type:** `System.String`  
**Default:** `null`

**Example:**

```razor
.EnableTooltip(true)
.TooltipTemplate("#tooltipTemplate")
```

See [customization-styling.md](./customization-styling.md#tooltip-configuration) for examples.

## Localization and Persistence

### Locale

Sets the locale for the Kanban board.

**Type:** `System.String`  
**Default:** `""`

**Example:**

```razor
.Locale("es-ES")
```

### EnableRtl

Enable right-to-left layout.

**Type:** `System.Boolean`  
**Default:** `false`

**Example:**

```razor
.EnableRtl(true)
.Locale("ar-AE")
```

### EnablePersistence

Enable state persistence across sessions.

**Type:** `System.Boolean`  
**Default:** `false`

**Example:**

```razor
.EnablePersistence(true)
```

See [localization-persistence.md](./localization-persistence.md) for detailed examples.

## Styling

### CssClass

Apply custom CSS class to the Kanban board.

**Type:** `System.String`  
**Default:** `null`

**Example:**

```razor
.CssClass("custom-kanban")
```

### HtmlAttributes

Add HTML attributes to the Kanban element.

**Type:** `System.Object`  
**Default:** `null`

**Example:**

```razor
.HtmlAttributes(new { 
    aria_label = "Task Management Board",
    data_testid = "kanban-board"
})
```

See [customization-styling.md](./customization-styling.md) for styling examples.

## Security

### EnableHtmlSanitizer

Prevent cross-site scripting (XSS) in data entry fields.

**Type:** `System.Boolean`  
**Default:** `true`

**Example:**

```razor
.EnableHtmlSanitizer(true)
```

**Note:** Keep enabled for security unless you have custom sanitization.

## Property Reference Table

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| KeyField | string | null | Column categorization field (required) |
| DataSource | object | null | Data source (local or remote) |
| Width | string | "auto" | Board width |
| Height | string | "auto" | Board height |
| Columns | List<KanbanColumn> | null | Column definitions |
| CardSettings | KanbanCardSettings | null | Card configuration |
| SwimlaneSettings | KanbanSwimlaneSettings | null | Swimlane configuration |
| DialogSettings | KanbanDialogSettings | null | Dialog configuration |
| SortSettings | KanbanSortSettings | null | Sorting configuration |
| ConstraintType | ConstraintType | Column | Constraint scope |
| AllowDragAndDrop | bool | true | Enable card drag-and-drop |
| AllowColumnDragAndDrop | bool | false | Enable column reordering |
| AllowKeyboard | bool | true | Enable keyboard navigation |
| EnableVirtualization | bool | false | Enable virtual scrolling |
| EnableTooltip | bool | false | Enable card tooltips |
| EnablePersistence | bool | false | Enable state persistence |
| EnableRtl | bool | false | Enable RTL layout |
| Locale | string | "" | Locale setting |
| CssClass | string | null | Custom CSS class |
| EnableHtmlSanitizer | bool | true | XSS protection |

## Best Practices

1. **Always set KeyField**: Required for Kanban to function
2. **Set explicit Height**: For virtual scrolling and scrollable content
3. **Use CardHeight**: With virtual scrolling for best performance
4. **Enable persistence**: For user preference retention
5. **Sanitize inputs**: Keep EnableHtmlSanitizer true
6. **Test accessibility**: With AllowKeyboard enabled
7. **Validate constraints**: Set realistic MinCount/MaxCount values
8. **Document custom templates**: Comment template variable usage
9. **Version compatibility**: Check property availability in your Syncfusion version
10. **Performance**: Enable virtualization for 1000+ cards
