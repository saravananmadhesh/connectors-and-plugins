# Dialog Configuration

## Overview

The Kanban dialog enables users to add new cards or edit existing cards through a built-in editing interface. The dialog provides a form with input fields mapped to card properties, offering a convenient way to manage card data without custom UI development.

**Dialog Features:**
- Add new cards to any column
- Edit existing card details
- Built-in validation
- Custom field configuration
- Template support for complete customization
- Server-side data persistence

**Key Properties:**
- **DialogSettings.Fields**: Define dialog input fields
- **DialogSettings.Template**: Custom dialog layout
- **DialogSettings.Model**: Dialog properties (width, height, etc.)
- **DialogOpen**: Event triggered when dialog opens
- **DialogClose**: Event triggered when dialog closes

## Default Dialog

By default, double-clicking a card opens the edit dialog with all card properties as editable fields.

**Example - Basic Dialog:**

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
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

**Default Behavior:**
- Double-click any card to open edit dialog
- Click column header "+" button to add new card
- All data fields appear as form inputs
- Changes automatically update the data source

## Custom Dialog Fields

Configure which fields appear in the dialog using the `DialogSettings.Fields` property.

**Example - Custom Fields:**

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
        card.ContentField("Summary").HeaderField("Id");
    })
    .DialogSettings(dialog =>
    {
        dialog.Fields(field =>
        {
            field.Text("ID").Key("Id").Type("TextBox").Add();
            field.Text("Summary").Key("Summary").Type("TextArea").Add();
            field.Text("Status").Key("Status").Type("DropDown").Add();
            field.Text("Assignee").Key("Assignee").Type("DropDown").Add();
            field.Text("Priority").Key("Priority").Type("DropDown").Add();
            field.Text("Description").Key("Description").Type("TextArea").Add();
        })
    })
    .Render()
```

**Field Properties:**
- **Key**: Data field name (required)
- **Text**: Label text displayed in dialog
- **Type**: Input control type
- **ValidationRules**: Field validation

**Supported Field Types:**
- **TextBox**: Single-line text input
- **TextArea**: Multi-line text input
- **DropDown**: Dropdown selection
- **Numeric**: Number input
- **CheckBox**: Boolean checkbox

## Field Validation

Add validation rules to dialog fields using `ValidationRules`.

**Example - Validation Rules:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
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
    .DialogSettings(dialog =>
    {
        dialog.Fields(field =>
        {
            field.Text("ID").Key("Id").Type("TextBox")
                .ValidationRules(new { required = true }).Add();
                
            field.Text("Summary").Key("Summary").Type("TextArea")
                .ValidationRules(new { required = true, minLength = 5 }).Add();
                
            field.Text("Status").Key("Status").Type("DropDown")
                .ValidationRules(new { required = true }).Add();
                
            field.Text("Assignee").Key("Assignee").Type("DropDown").Add();
            
            field.Text("Estimate").Key("Estimate").Type("Numeric")
                .ValidationRules(new { min = 0, max = 100 }).Add();
        })
    })
    .Render()
```

**Common Validation Rules:**
- `required: true` - Field must have a value
- `minLength: n` - Minimum character length
- `maxLength: n` - Maximum character length
- `min: n` - Minimum numeric value
- `max: n` - Maximum numeric value
- `email: true` - Valid email format
- `regex: pattern` - Custom regex pattern

**Validation Messages:**

```razor
field.Text("Summary").Key("Summary").Type("TextArea")
    .ValidationRules(new 
    { 
        required = true,
        minLength = 5,
        messages = new { 
            required = "Summary is required",
            minLength = "Summary must be at least 5 characters"
        }
    }).Add();
```

## Dialog Template

Completely customize the dialog layout using a custom template.

**Example - Custom Dialog Template:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
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
    .DialogSettings(dialog =>
    {
        dialog.Template("#dialogTemplate");
    })
    .Render()

<script id="dialogTemplate" type="text/x-jsrender">
    <div class="custom-dialog">
        <table>
            <tr>
                <td class="e-label">ID</td>
                <td>
                    <input id="Id" name="Id" type="text" class="e-field" value="${Id}" disabled />
                </td>
            </tr>
            <tr>
                <td class="e-label">Summary</td>
                <td>
                    <textarea id="Summary" name="Summary" class="e-field" required>${Summary}</textarea>
                </td>
            </tr>
            <tr>
                <td class="e-label">Status</td>
                <td>
                    <select id="Status" name="Status" class="e-field" required>
                        <option value="Open">To Do</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Testing">Testing</option>
                        <option value="Close">Done</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="e-label">Assignee</td>
                <td>
                    <select id="Assignee" name="Assignee" class="e-field">
                        <option value="">Select Assignee</option>
                        <option value="Nancy Davloio">Nancy Davloio</option>
                        <option value="Andrew Fuller">Andrew Fuller</option>
                        <option value="Janet Leverling">Janet Leverling</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="e-label">Priority</td>
                <td>
                    <select id="Priority" name="Priority" class="e-field">
                        <option value="Low">Low</option>
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </td>
            </tr>
        </table>
    </div>
</script>

<style>
    .custom-dialog table {
        width: 100%;
    }
    
    .custom-dialog td {
        padding: 10px;
    }
    
    .custom-dialog .e-label {
        width: 30%;
        font-weight: 600;
    }
    
    .custom-dialog .e-field {
        width: 100%;
        padding: 5px;
    }
</style>
```

**Important Template Requirements:**
- Input elements must have `name` attribute matching data field names
- Add `class="e-field"` to all input elements
- Use `required` attribute for mandatory fields
- Template receives card data as variables: `${FieldName}`

## Dialog Events

Handle dialog lifecycle with `DialogOpen` and `DialogClose` events.

**DialogOpen Event:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
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
    .DialogOpen("onDialogOpen")
    .DialogClose("onDialogClose")
    .Render()

<script>
    function onDialogOpen(args) {
        console.log('Dialog opened:', args.requestType);
        
        // args.requestType: 'Add' or 'Edit'
        if (args.requestType === 'Add') {
            // Set default values for new cards
            args.data.Priority = 'Normal';
            args.data.Estimate = 0;
            args.data.CreatedDate = new Date();
        }
        
        // Modify dialog title
        if (args.requestType === 'Edit') {
            args.element.querySelector('.e-dlg-header-content').innerText = 'Edit Card #' + args.data.Id;
        }
        
        // Cancel dialog opening
        if (!hasPermission()) {
            args.cancel = true;
            alert('You do not have permission to edit cards');
        }
    }
    
    function onDialogClose(args) {
        console.log('Dialog closed:', args.requestType);
        
        // args.data contains the updated card data
        if (args.requestType === 'Add' || args.requestType === 'Edit') {
            console.log('Card saved:', args.data);
            
            // Validate before saving
            if (args.data.Estimate > 100) {
                args.cancel = true;
                alert('Estimate cannot exceed 100 hours');
                return;
            }
            
            // Send to server
            saveCardToServer(args.data);
        }
    }
    
    function saveCardToServer(cardData) {
        $.ajax({
            url: '/Kanban/SaveCard',
            type: 'POST',
            data: JSON.stringify(cardData),
            contentType: 'application/json',
            success: function(response) {
                console.log('Card saved successfully');
            }
        });
    }
    
    function hasPermission() {
        // Check user permissions
        return true;
    }
</script>
```

**Event Arguments:**
```typescript
{
    cancel: boolean,        // Set to true to prevent action
    data: Object,          // Card data
    element: HTMLElement,  // Dialog element
    requestType: string    // 'Add', 'Edit', or 'Delete'
}
```

## Dialog Model Configuration

Customize dialog appearance using the `Model` property.

**Example - Dialog Size and Behavior:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
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
    .DialogSettings(dialog =>
    {
        dialog.Fields(field =>
        {
            field.Text("ID").Key("Id").Type("TextBox").Add();
            field.Text("Summary").Key("Summary").Type("TextArea").Add();
        })
        .Model(new { 
            width = "600px",
            height = "auto",
            isModal = true,
            showCloseIcon = true,
            closeOnEscape = true
        });
    })
    .Render()
```

**Model Properties:**
- `width`: Dialog width (px, %, or auto)
- `height`: Dialog height (px, %, or auto)
- `isModal`: Show dialog as modal overlay
- `showCloseIcon`: Display close button
- `closeOnEscape`: Close dialog on Escape key
- `position`: Dialog position { X: 'center', Y: 'center' }
- `animationSettings`: Open/close animations

## Server-Side Data Persistence

Persist card changes to the server using CRUD operations.

**Controller:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Syncfusion.EJ2.Kanban;
using Newtonsoft.Json;

namespace YourApp.Controllers
{
    public class KanbanController : Controller
    {
        // Static data store (use database in production)
        private static List<KanbanDataModel> kanbanData = new List<KanbanDataModel>();

        public ActionResult Index()
        {
            if (kanbanData.Count == 0)
            {
                InitializeData();
            }
            ViewBag.data = kanbanData;
            return View();
        }

        // Add new card
        [HttpPost]
        public ActionResult Insert([FromBody] KanbanDataModel value)
        {
            // Generate new ID
            value.Id = kanbanData.Count > 0 ? kanbanData.Max(x => x.Id) + 1 : 1;
            value.CreatedDate = DateTime.Now;
            
            kanbanData.Add(value);
            return Json(value);
        }

        // Update existing card
        [HttpPost]
        public ActionResult Update([FromBody] KanbanDataModel value)
        {
            var card = kanbanData.FirstOrDefault(x => x.Id == value.Id);
            if (card != null)
            {
                card.Summary = value.Summary;
                card.Status = value.Status;
                card.Assignee = value.Assignee;
                card.Priority = value.Priority;
                card.Description = value.Description;
                card.UpdatedDate = DateTime.Now;
            }
            return Json(card);
        }

        // Delete card
        [HttpPost]
        public ActionResult Delete([FromBody] KanbanDataModel value)
        {
            var card = kanbanData.FirstOrDefault(x => x.Id == value.Id);
            if (card != null)
            {
                kanbanData.Remove(card);
            }
            return Json(card);
        }

        private void InitializeData()
        {
            kanbanData = new List<KanbanDataModel>
            {
                new KanbanDataModel { Id = 1, Status = "Open", Summary = "Task 1", Assignee = "Nancy" },
                new KanbanDataModel { Id = 2, Status = "InProgress", Summary = "Task 2", Assignee = "Andrew" }
            };
        }
    }

    public class KanbanDataModel
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public string Summary { get; set; }
        public string Assignee { get; set; }
        public string Priority { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
```

**View with DataManager:**

```razor
@(Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource(dataManger => 
    { 
        dataManger.Url("/Kanban/Index").InsertUrl("/Kanban/Insert")
            .UpdateUrl("/Kanban/Update").RemoveUrl("/Kanban/Delete").Adaptor("UrlAdaptor"); 
    })
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .DialogSettings(dialog =>
    {
        dialog.Fields(field =>
        {
            field.Text("ID").Key("Id").Type("TextBox").Add();
            field.Text("Summary").Key("Summary").Type("TextArea")
                .ValidationRules(new { required = true }).Add();
            field.Text("Status").Key("Status").Type("DropDown").Add();
            field.Text("Assignee").Key("Assignee").Type("DropDown").Add();
            field.Text("Priority").Key("Priority").Type("DropDown").Add();
        })
    })
    .Render()
)
```

## Programmatically Open Dialog

Open the dialog programmatically using the `OpenDialog` method.

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
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

<button onclick="openAddDialog()">Add New Task</button>
<button onclick="openEditDialog()">Edit First Task</button>

<script>
    function openAddDialog() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        kanbanObj.openDialog('Add');
    }
    
    function openEditDialog() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        var firstCard = kanbanObj.kanbanData[0];
        kanbanObj.openDialog('Edit', firstCard);
    }
</script>
```

## Disable Dialog

Disable the built-in dialog to implement custom editing UI.

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
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
    .DialogOpen("onDialogOpen")
    .Render()

<script>
    function onDialogOpen(args) {
        // Cancel built-in dialog
        args.cancel = true;
        
        // Show custom editing UI
        showCustomEditForm(args.data);
    }
    
    function showCustomEditForm(cardData) {
        // Your custom form implementation
        console.log('Show custom form for:', cardData);
    }
</script>
```

## Best Practices

1. **Define explicit fields**: Use DialogSettings.Fields for better control
2. **Validate inputs**: Add validation rules to prevent invalid data
3. **Handle events**: Use DialogOpen/DialogClose for business logic
4. **Server persistence**: Implement CRUD operations for data durability
5. **Meaningful labels**: Use clear, descriptive field labels
6. **Default values**: Set sensible defaults in DialogOpen for new cards
7. **Permission checks**: Validate user permissions before allowing edits
8. **Error handling**: Implement proper error handling for failed saves
9. **Template carefully**: Only use custom templates when necessary
10. **Responsive design**: Ensure dialog is usable on mobile devices
