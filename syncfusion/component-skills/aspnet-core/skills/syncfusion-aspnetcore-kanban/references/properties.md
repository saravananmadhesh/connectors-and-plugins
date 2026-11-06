```markdown
# Properties in Syncfusion ASP.NET Core Kanban

## Table of Contents
- [AllowColumnDragAndDrop](#allowcolumndraganddrop)
- [AllowDragAndDrop](#allowdraganddrop)
- [AllowKeyboard](#allowkeyboard)
- [CardHeight](#cardheight)
- [CardSettings](#cardsettings)
- [Columns](#columns)
- [ConstraintType](#constrainttype)
- [CssClass](#cssclass)
- [DataSource](#datasource)
- [DialogSettings](#dialogsettings)
- [EnableHtmlSanitizer](#enablehtmlsanitizer)
- [EnablePersistence](#enablepersistence)
- [EnableRtl](#enablertl)
- [EnableTooltip](#enabletooltip)
- [EnableVirtualization](#enablevirtualization)
- [ExternalDropId](#externaldropid)
- [Height](#height)
- [HtmlAttributes](#htmlattributes)
- [KeyField](#keyfield)
- [Locale](#locale)
- [Query](#query)
- [ShowEmptyColumn](#showemptycolumn)
- [SortSettings](#sortsettings)
- [StackedHeaders](#stackedheaders)
- [SwimlaneSettings](#swimlanesettings)
- [TooltipTemplate](#tooltiptemplate)
- [Width](#width)

---

## AllowColumnDragAndDrop

**Type:** `System.Boolean` | **Default:** `false`  
**Description:** Enables or disables column drag-and-drop reordering in Kanban.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    allowColumnDragAndDrop="true">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>
```

---

## AllowDragAndDrop

**Type:** `System.Boolean` | **Default:** `true`  
**Description:** Enables or disables card drag-and-drop across columns globally. Set to `false` to make the board read-only.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    allowDragAndDrop="false">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>
```

---

## AllowKeyboard

**Type:** `System.Boolean` | **Default:** `true`  
**Description:** Enables or disables keyboard interaction (navigation, selection, drag) in Kanban.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    allowKeyboard="false">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>
```

---

## CardHeight

**Type:** `System.String` | **Default:** `"auto"`  
**Description:** Sets the height of each card. Accepts pixel values (e.g., `"100px"`) or `"auto"`. When `enableVirtualization` is `true`, a fixed pixel value is required.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    enableVirtualization="true" cardHeight="100px">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>
```

---

## CardSettings

**Type:** `KanbanCardSettings` | **Default:** `null`  
**Description:** Configures card display options: header field, content field, template, header visibility, and selection mode. Defined via `<e-kanban-cardsettings>`.

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `HeaderField` | `System.String` | `null` | **Mandatory.** Unique card ID field |
| `ContentField` | `System.String` | `null` | Card body text field |
| `ShowHeader` | `System.Boolean` | `true` | Show or hide the card header row |
| `Template` | `System.String` | `null` | Custom card HTML template ID |
| `ContentTemplate` | `MvcTemplate` | — | Razor template for card content |
| `SelectionType` | `SelectionType` | `Single` | Card selection mode: `None`, `Single`, `Multiple` |
| `GrabberField` | `System.String` | `null` | Field used for card color grabber indicator |
| `FooterCssField` | `System.String` | `null` | Field used for card footer icon CSS classes |
| `TagsField` | `System.String` | `null` | Field used for card content label tags |

```html
<e-kanban-cardsettings
    headerField="Title"
    contentField="Summary"
    showHeader="true"
    selectionType="Multiple">
</e-kanban-cardsettings>
```

→ For full card configuration details, see [references/cards.md](cards.md)

---

## Columns

**Type:** `System.Collections.Generic.List<KanbanColumn>` | **Default:** `null`  
**Description:** Defines the board columns and their display/behavior options. Defined via `<e-kanban-columns>` and `<e-kanban-column>`.

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `KeyField` | `string` | `null` | Column card filter value(s); comma-separated for multi-key |
| `HeaderText` | `string` | `null` | Column title displayed in the header |
| `AllowToggle` | `bool` | `false` | Enable collapsible column toggle |
| `IsExpanded` | `bool` | `true` | Initial expand/collapse state |
| `AllowDrag` | `bool` | `true` | Allow cards to be dragged from this column |
| `AllowDrop` | `bool` | `true` | Allow cards to be dropped into this column |
| `MinCount` | `int` | `null` | Minimum card count constraint |
| `MaxCount` | `int` | `null` | Maximum card count constraint |
| `ShowItemCount` | `bool` | `true` | Show card count badge in column header |
| `ShowAddButton` | `bool` | `false` | Show add-card button in column header |
| `Template` | `string` | `null` | Custom column header template ID |
| `TransitionColumns` | `string[]` | `null` | Restrict allowed target columns for card drops |

```html
<e-kanban-columns>
    <e-kanban-column headerText="To Do" keyField="Open"
        allowToggle="true" showItemCount="true"></e-kanban-column>
    <e-kanban-column headerText="In Progress" keyField="InProgress"
        minCount="1" maxCount="5"></e-kanban-column>
    <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
</e-kanban-columns>
```

→ For full column configuration, see [references/columns.md](columns.md)

---

## ConstraintType

**Type:** `ConstraintType` | **Default:** `ConstraintType.Column`  
**Description:** Defines the scope for `MinCount`/`MaxCount` validation — either per column or per swimlane cell.

| Value | Description |
|---|---|
| `Column` | Constraints apply to entire column card count |
| `Swimlane` | Constraints apply per swimlane row within each column |

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    constraintType="Swimlane">
    <e-kanban-columns>
        <e-kanban-column headerText="In Progress" keyField="InProgress"
            maxCount="3"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
    <e-kanban-swimlanesettings keyField="Assignee"></e-kanban-swimlanesettings>
</ejs-kanban>
```

---

## CssClass

**Type:** `System.String` | **Default:** `null`  
**Description:** Adds one or more custom CSS class names to the root Kanban element for user-defined styling.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    cssClass="my-custom-kanban">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>
```

---

## DataSource

**Type:** `System.Object` | **Default:** `null`  
**Description:** Binds card data to the Kanban board. Accepts a local data array or a `DataManager` instance for remote data.

```html
<!-- Local data -->
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    ...
</ejs-kanban>

<!-- Remote data via DataManager -->
<ejs-kanban id="Kanban" keyField="Status">
    <e-data-manager url="/api/tasks" adaptor="ODataV4Adaptor"></e-data-manager>
    ...
</ejs-kanban>
```

→ See [references/data-binding.md](data-binding.md) for all data binding patterns.

---

## DialogSettings

**Type:** `KanbanDialogSettings` | **Default:** `null`  
**Description:** Configures the card edit dialog — custom fields, templates, and dialog model options.

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Fields` | `System.Object` | `null` | Array of dialog field definitions |
| `Template` | `System.String` | `null` | Custom dialog HTML template ID |
| `ContentTemplate` | `MvcTemplate` | — | Razor template for dialog content |
| `Model` | `System.Object` | `null` | Dialog model configuration object |

```html
<e-kanban-dialogsettings fields="@ViewBag.dialogFields"></e-kanban-dialogsettings>
```

→ See [references/dialog.md](dialog.md) for full dialog configuration.

---

## EnableHtmlSanitizer

**Type:** `System.Boolean` | **Default:** `true`  
**Description:** When `true`, prevents cross-site scripting (XSS) by sanitizing HTML in Kanban data entry fields.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    enableHtmlSanitizer="false">
    ...
</ejs-kanban>
```

---

## EnablePersistence

**Type:** `System.Boolean` | **Default:** `false`  
**Description:** Persists the Kanban board state (columns, dataSource) to `localStorage` across page reloads.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    enablePersistence="true">
    ...
</ejs-kanban>
```

→ See [references/persistence-localization-responsive.md](persistence-localization-responsive.md)

---

## EnableRtl

**Type:** `System.Boolean` | **Default:** `false`  
**Description:** Renders the Kanban board in right-to-left layout direction.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    enableRtl="true">
    ...
</ejs-kanban>
```

---

## EnableTooltip

**Type:** `System.Boolean` | **Default:** `false`  
**Description:** Shows a tooltip when hovering over cards. Use with `TooltipTemplate` for custom tooltip content.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    enableTooltip="true" tooltipTemplate="#tooltipTemplate">
    ...
</ejs-kanban>

<script id="tooltipTemplate" type="text/x-template">
    <div class="e-tooltip-wrap">
        <p>ID: ${Id}</p>
        <p>Summary: ${Summary}</p>
    </div>
</script>
```

---

## EnableVirtualization

**Type:** `System.Boolean` | **Default:** `false`  
**Description:** Enables virtual scrolling — only renders cards visible in the viewport and loads more on scroll. Requires a fixed `CardHeight` value.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    enableVirtualization="true" cardHeight="100px">
    ...
</ejs-kanban>
```

→ See [references/virtual-scrolling-accessibility.md](virtual-scrolling-accessibility.md)

---

## ExternalDropId

**Type:** `System.String[]` | **Default:** `null`  
**Description:** Specifies the IDs of external elements (e.g., Treeview, Schedule, or another Kanban) that can receive dropped cards.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    externalDropId="@(new string[] { "TreeView", "Schedule" })">
    ...
</ejs-kanban>
```

→ See [references/drag-and-drop.md](drag-and-drop.md) for external drag patterns.

---

## Height

**Type:** `System.String` | **Default:** `"auto"`  
**Description:** Sets the height of the Kanban board. Accepts pixel values (`"500px"`), percentages (`"100%"`), or `"auto"`.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    height="500px">
    ...
</ejs-kanban>
```

---

## HtmlAttributes

**Type:** `System.Object` | **Default:** `(empty)`  
**Description:** Passes additional HTML attributes (e.g., `title`, `aria-*`) as key-value pairs to the root Kanban element.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    htmlAttributes="@(new Dictionary<string, object> { { "title", "Task Board" } })">
    ...
</ejs-kanban>
```

---

## KeyField

**Type:** `System.String` | **Default:** `null`  
**Description:** **Required.** The data field name used to map cards to board columns. Each card's value for this field determines which column it appears in.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Title" contentField="Summary"></e-kanban-cardsettings>
</ejs-kanban>
```

---

## Locale

**Type:** `System.String` | **Default:** `""`  
**Description:** Overrides the global culture/locale for this component. Defaults to `"en-US"` when empty.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    locale="de">
    ...
</ejs-kanban>
```

→ See [references/persistence-localization-responsive.md](persistence-localization-responsive.md) for locale key names.

---

## Query

**Type:** `System.String` | **Default:** `null`  
**Description:** Applies an external query to filter the displayed cards from the data source.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    query="new ej.data.Query().where('Priority', 'equal', 'High')">
    ...
</ejs-kanban>
```

→ See [references/how-to.md](how-to.md#filter-cards) for filter card patterns.

---

## ShowEmptyColumn

**Type:** `System.Boolean` | **Default:** `false`  
**Description:** When `true`, columns with no matching cards are still rendered (visible but empty). When `false`, empty columns are hidden.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    showEmptyColumn="true">
    ...
</ejs-kanban>
```

---

## SortSettings

**Type:** `KanbanSortSettings` | **Default:** `null`  
**Description:** Configures card sort order within columns.

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `SortBy` | `SortOrderBy` | `Index` | Sort strategy: `Index`, `DataSourceOrder`, `Custom` |
| `Field` | `System.String` | `null` | Data field to sort by (used with `Custom`) |
| `Direction` | `SortDirection` | `Ascending` | `Ascending` or `Descending` |

```html
<e-kanban-sortsettings sortBy="Custom" field="RankId" direction="Ascending">
</e-kanban-sortsettings>
```

→ See [references/sorting-priority-validation.md](sorting-priority-validation.md)

---

## StackedHeaders

**Type:** `System.Collections.Generic.List<KanbanStackedHeader>` | **Default:** `null`  
**Description:** Defines grouped stacked headers that span multiple columns.

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Text` | `System.String` | `null` | Stacked header display text |
| `KeyFields` | `System.String` | `null` | Comma-separated column key fields to span |

```html
<e-kanban-stackedheaders>
    <e-kanban-stackedheader text="Development" keyFields="Open,InProgress,Testing">
    </e-kanban-stackedheader>
</e-kanban-stackedheaders>
```

→ See [references/columns.md](columns.md) for stacked header usage.

---

## SwimlaneSettings

**Type:** `KanbanSwimlaneSettings` | **Default:** `null`  
**Description:** Configures swimlane (row grouping) behavior in the Kanban board.

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `KeyField` | `System.String` | `null` | Data field to group cards into swimlane rows |
| `TextField` | `System.String` | `null` | Field to display as the swimlane row label |
| `Template` | `System.String` | `null` | Custom swimlane header template ID |
| `AllowDragAndDrop` | `System.Boolean` | `false` | Enable cross-swimlane card drag |
| `ShowEmptyRow` | `System.Boolean` | `false` | Show swimlane rows with no cards |
| `ShowItemCount` | `System.Boolean` | `true` | Show card count badge in swimlane header |
| `ShowUnassignedRow` | `System.Boolean` | `true` | Show a row for cards with no swimlane key value |
| `EnableFrozenRows` | `System.Boolean` | `false` | Freeze swimlane headers when scrolling |
| `SortDirection` | `SortDirection` | `Ascending` | Sort swimlane rows ascending or descending |
| `SortComparer` | `System.Object` | `null` | Custom sort comparer function |

```html
<e-kanban-swimlanesettings
    keyField="Assignee"
    textField="Assignee"
    showItemCount="true"
    allowDragAndDrop="true"
    enableFrozenRows="true">
</e-kanban-swimlanesettings>
```

→ See [references/swimlane.md](swimlane.md) for full swimlane configuration.

---

## TooltipTemplate

**Type:** `System.String` | **Default:** `null`  
**Description:** Defines a custom HTML template ID for card tooltips. Requires `EnableTooltip="true"`.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    enableTooltip="true" tooltipTemplate="#tooltipTemplate">
    ...
</ejs-kanban>

<script id="tooltipTemplate" type="text/x-template">
    <div class="e-tooltip-wrap">
        <p><b>${Title}</b></p>
        <p>Assignee: ${Assignee}</p>
        <p>Priority: ${Priority}</p>
    </div>
</script>
```

→ See [references/tooltip-style-dimensions.md](tooltip-style-dimensions.md)

---

## Width

**Type:** `System.String` | **Default:** `"auto"`  
**Description:** Sets the width of the Kanban board. Accepts pixel values (`"800px"`), percentages (`"100%"`), or `"auto"`.

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    width="100%" height="500px">
    ...
</ejs-kanban>
```
```
