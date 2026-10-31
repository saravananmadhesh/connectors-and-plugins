# Card Edit Dialog in Syncfusion ASP.NET Core Kanban

## Table of Contents
- [Default Dialog](#default-dialog)
- [Custom Dialog Fields](#custom-dialog-fields)
- [Field Types and Validation](#field-types-and-validation)
- [Custom Dialog Template](#custom-dialog-template)
- [Preventing the Dialog](#preventing-the-dialog)
- [Programmatic Dialog Open](#programmatic-dialog-open)
- [CRUD Persistence via UrlAdaptor](#crud-persistence-via-urladaptor)

## Default Dialog

Double-clicking any card opens the built-in edit dialog automatically. The dialog auto-generates fields for the fields configured in `cardSettings` and `swimlaneSettings`:

- `headerField` (from `<e-kanban-cardsettings>`)
- `keyField` (from `<ejs-kanban>` — the status field)
- `contentField` (from `<e-kanban-cardsettings>`)
- `priority` field (if configured)
- `keyField` from swimlane settings (if swimlanes are configured)

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

No additional configuration needed — double-click any card to see the default dialog.

## Custom Dialog Fields

Control which fields appear in the dialog and in what order using `<e-kanban-dialogsettings>`:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
    <e-kanban-dialogsettings fields="@ViewBag.dialogFields"></e-kanban-dialogsettings>
</ejs-kanban>
```

**Controller — build dialog field definitions:**

```csharp
public IActionResult Index()
{
    ViewBag.data = new KanbanDataModels().KanbanTasks();

    List<KanbanDialogModels> dialogFields = new List<KanbanDialogModels>
    {
        new KanbanDialogModels { key = "Title", text = "ID", type = "TextBox" },
        new KanbanDialogModels { key = "Status", text = "Status", type = "DropDown" },
        new KanbanDialogModels { key = "Assignee", text = "Assignee", type = "DropDown" },
        new KanbanDialogModels { key = "RankId", text = "Rank", type = "Numeric" },
        new KanbanDialogModels { key = "Summary", text = "Summary", type = "TextArea" }
    };
    ViewBag.dialogFields = dialogFields;
    return View();
}

public class KanbanDialogModels
{
    public string key { get; set; }       // Data model property name
    public string text { get; set; }      // Label shown in dialog
    public string type { get; set; }      // Field type (see table below)
    public object validationRules { get; set; }
}
```

## Field Types and Validation

Available `type` values for dialog fields:

| Type | Renders As |
|---|---|
| `TextBox` | Single-line text input |
| `String` | Single-line text input (alias for TextBox) |
| `Input` | Raw HTML input element |
| `Numeric` | Numeric input (EJ2 NumericTextBox) |
| `TextArea` | Multi-line text area |
| `DropDown` | Dropdown list (EJ2 DropDownList) |

Add validation rules to enforce input:

```csharp
new KanbanDialogModels {
    key = "Title",
    text = "Title",
    type = "TextBox",
    validationRules = new { required = true }
},
new KanbanDialogModels {
    key = "RankId",
    text = "Rank",
    type = "Numeric",
    validationRules = new { range = new int[] { 0, 1000 } }
}
```

The `validationRules` object is passed directly to the EJ2 form validation engine.

## Custom Dialog Template

Replace the entire dialog UI with a fully custom template:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    dialogOpen="onDialogOpen">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
    <e-kanban-dialogsettings template="#dialogTemplate"></e-kanban-dialogsettings>
</ejs-kanban>

<script id="dialogTemplate" type="text/x-template">
    <table>
        <tbody>
            <tr>
                <td class="e-label">Title</td>
                <td>
                    <input id="Title" name="Title" type="text" class="e-field"
                        value="${Title}" style="width:100%" />
                </td>
            </tr>
            <tr>
                <td class="e-label">Status</td>
                <td>
                    <input id="Status" name="Status" type="text" class="e-field"
                        value="${Status}" />
                </td>
            </tr>
            <tr>
                <td class="e-label">Summary</td>
                <td>
                    <textarea id="Summary" name="Summary" class="e-field"
                        rows="4">${Summary}</textarea>
                </td>
            </tr>
        </tbody>
    </table>
</script>

<script>
    function onDialogOpen(args) {
        // Initialize EJ2 components inside the dialog template
        var statusDropDown = new ej.dropdowns.DropDownList({
            dataSource: ['Open', 'InProgress', 'Review', 'Close'],
            value: args.data.Status
        });
        statusDropDown.appendTo(args.element.querySelector('#Status'));
    }
</script>
```

**Key rules for custom dialog templates:**
- Add `class="e-field"` to every input element so the Kanban can read values on save
- Use `${fieldName}` to pre-populate fields with the current card's data
- The `dialogOpen` event receives `args.element` (the dialog DOM) and `args.data` (card data)
- Initialize EJ2 components (DropDownList, NumericTextBox, etc.) inside `dialogOpen`

## Preventing the Dialog

Cancel the dialog opening for specific conditions using the `dialogOpen` event:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    dialogOpen="onDialogOpen">
    ...
</ejs-kanban>

<script>
    function onDialogOpen(args) {
        // Prevent dialog from opening (e.g., for read-only cards)
        if (args.data.Type === 'ReadOnly') {
            args.cancel = true;
        }
    }
</script>
```

Setting `args.cancel = true` stops the dialog from rendering. Use this to implement conditional read-only cards or to open a custom modal instead.

## Programmatic Dialog Open

Open the dialog for adding a new card from JavaScript without user interaction:

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];

// Open Add dialog with pre-filled data
var newCardData = { Status: 'Open', Assignee: 'Nancy Davloio' };
kanbanObj.openDialog('Add', newCardData);
```

The first argument `'Add'` opens the dialog in add mode. The second argument pre-populates the dialog fields with the provided data object.

## CRUD Persistence via UrlAdaptor

When using `<e-data-manager>` with `UrlAdaptor` and a `crudUrl`, the Kanban automatically sends card changes to the server:

```html
<ejs-kanban id="Kanban" keyField="Status">
    <e-data-manager url="/Home/LoadData" adaptor="UrlAdaptor"
        crudUrl="/Home/UpdateData"></e-data-manager>
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
    <e-kanban-dialogsettings fields="@ViewBag.dialogFields"></e-kanban-dialogsettings>
</ejs-kanban>
```

**Server-side handler:**

```csharp
public class EditParams
{
    public string key { get; set; }
    public string action { get; set; }
    public List<KanbanDataModels> added { get; set; }
    public List<KanbanDataModels> changed { get; set; }
    public List<KanbanDataModels> deleted { get; set; }
    public KanbanDataModels value { get; set; }
}

public IActionResult UpdateData([FromBody] EditParams param)
{
    if (param.action == "insert")
    {
        // param.value contains the new card
        db.KanbanCards.Add(param.value);
    }
    else if (param.action == "update")
    {
        // param.value contains the updated card
        var existing = db.KanbanCards.Find(param.value.Id);
        if (existing != null)
        {
            db.Entry(existing).CurrentValues.SetValues(param.value);
        }
    }
    else if (param.action == "remove")
    {
        // param.key contains the card's headerField value
        var card = db.KanbanCards.Find(param.key);
        if (card != null) db.KanbanCards.Remove(card);
    }
    else if (param.action == "batch")
    {
        if (param.added != null) db.KanbanCards.AddRange(param.added);
        if (param.changed != null) {
            foreach (var c in param.changed) {
                var existing = db.KanbanCards.Find(c.Id);
                if (existing != null) db.Entry(existing).CurrentValues.SetValues(c);
            }
        }
        if (param.deleted != null) db.KanbanCards.RemoveRange(param.deleted);
    }
    db.SaveChanges();
    return Json(param.value ?? (object)param.added);
}
```

Drag-and-drop between columns also triggers the CRUD URL with `action == "update"` — you do not need to handle drag and save separately.
