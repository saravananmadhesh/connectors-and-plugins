# Editing in WinUI TreeGrid

## Table of Contents
- [Enable Editing](#enable-editing)
- [Edit Modes](#edit-modes)
- [Edit Events](#edit-events)
- [Column-Level Editing](#column-level-editing)
- [Programmatic Editing](#programmatic-editing)
- [Validation](#validation)
- [Editor Types](#editor-types)

## Enable Editing

Enable editing for the entire TreeGrid:

```xaml
<treeGrid:SfTreeGrid AllowEditing="True" 
                    ItemsSource="{Binding Employees}" />
```

```csharp
sfTreeGrid.AllowEditing = true;
```

When enabled, users can double-click cells or press F2 to enter edit mode.

## Edit Modes

Control when cells enter edit mode:

```csharp
sfTreeGrid.EditTrigger = EditTrigger.OnTap;
```

| EditTrigger | Behavior |
|------------|----------|
| **OnTap** | Single click enters edit mode |
| **OnDoubleTap** (default) | Double-click enters edit mode |

**Example:**
```xaml
<treeGrid:SfTreeGrid AllowEditing="True"
                    EditTrigger="OnTap" />
```

## Edit Events

### CurrentCellBeginEdit

Raised before a cell enters edit mode. Cancel editing or customize behavior.

```csharp
sfTreeGrid.CurrentCellBeginEdit += (sender, e) =>
{
    // Cancel editing for specific column
    if (e.Column.MappingName == "ID")
    {
        e.Cancel = true;
        return;
    }
    
    // Cancel editing for specific rows
    int rowIndex = e.RowColumnIndex.RowIndex;
    if (rowIndex == 1)
    {
        e.Cancel = true;
    }
};
```

**Event Args Properties:**
- `e.Column` - Column being edited
- `e.RowColumnIndex` - Gets the row and column index of the current cell
- `e.Cancel` - Set to true to prevent editing

### CurrentCellEndEdit

Raised before changes are committed. Validate or cancel the edit.

```csharp
sfTreeGrid.CurrentCellEndEdit += (sender, e) =>
{
    int rowIndex = e.RowColumnIndex.RowIndex;
    int columnIndex = e.RowColumnIndex.ColumnIndex;

    var column = sfTreeGrid.Columns[columnIndex];

    if (column.MappingName == "Salary")
    {
        if (double.TryParse(e.NewValue?.ToString(), out double salary))
        {
            if (salary < 0)
            {
                e.Cancel = true;
            }
        }
    }
};
```

**Event Args Properties:**
- `e.RowColumnIndex` : Gets row and column index
- `e.Cancel` - Set to true to reject changes

### CurrentCellValueChanged

Raised after the cell value changes:

```csharp
sfTreeGrid.CurrentCellValueChanged += (sender, e) =>
{
    var column = e.Column.MappingName;
    var record = e.Record;
    var rowIndex = e.RowColumnIndex.RowIndex;

    Logger.Log($"Value changed in {column} at row {rowIndex}");
};
```
### CurrentCellDropDownSelectionChanged

Raised when the selected item changes in a dropdown cell.

```csharp
sfTreeGrid.CurrentCellDropDownSelectionChanged += (sender, e) =>
{
    int rowIndex = e.RowColumnIndex.RowIndex;
    var selectedIndex = e.SelectedIndex;
    var selectedItem = e.SelectedItem;

    Logger.Log($"Row {rowIndex} selected index {selectedIndex}");
};
``

## Column-Level Editing

Control editing for individual columns:

```xaml
<!-- Allow editing this column -->
<treeGrid:TreeGridTextColumn MappingName="FirstName" 
                            AllowEditing="True" />

<!-- Disable editing this column -->
<treeGrid:TreeGridNumericColumn MappingName="ID" 
                               AllowEditing="False" />
```

```csharp
column.AllowEditing = false;  // Make column read-only
```

**Common pattern - Allow grid editing but protect key columns:**
```xaml
<treeGrid:SfTreeGrid AllowEditing="True">
    <treeGrid:SfTreeGrid.Columns>
        <treeGrid:TreeGridNumericColumn MappingName="ID" 
                                       AllowEditing="False" />
        <treeGrid:TreeGridTextColumn MappingName="FirstName" />
        <treeGrid:TreeGridTextColumn MappingName="LastName" />
        <treeGrid:TreeGridNumericColumn MappingName="Salary" />
    </treeGrid:SfTreeGrid.Columns>
</treeGrid:SfTreeGrid>
```

## Programmatic Editing

### Begin Edit Programmatically

```csharp
// Begin edit at specified row and column index
var rowColumnIndex = new RowColumnIndex(2, 1);
sfTreeGrid.SelectionController.MoveCurrentCell(rowColumnIndex);
sfTreeGrid.SelectionController.CurrentCellManager.BeginEdit();

// Or get current cell and begin edit
var currentCellManager = sfTreeGrid.SelectionController.CurrentCellManager;

if (currentCellManager != null)
{
    currentCellManager.BeginEdit();
}
```

### End Edit and Commit

```csharp
// Commit current edit
sfTreeGrid.EndEdit();

// Commit with validation check
if (sfTreeGrid.CurrentCell != null)
{
    bool committed = sfTreeGrid.EndEdit();
    if (!committed)
    {
        // Edit was cancelled or validation failed
    }
}
```

### Cancel Edit

```csharp
sfTreeGrid.CurrentCellBeginEdit += (sender, e) =>
{
    // Cancel editing for specific cell
    if (e.RowColumnIndex.RowIndex == 2 && e.RowColumnIndex.ColumnIndex == 2)
    {
        e.Cancel = true;
    }
};
```


### Check if Cell is in Edit Mode

```csharp
```csharp
var currentCellManager = this.treeGrid.SelectionController.CurrentCellManager;
if (currentCellManager != null && currentCellManager.CurrentCell.IsEditing)
{   
     // Cell is currently being edited
}
```

## Validation

### Data Annotation Validation

Use data annotations in your model:

```csharp
using System.ComponentModel.DataAnnotations;

public class Employee
{
    [Required(ErrorMessage = "First name is required")]
    [StringLength(50, ErrorMessage = "Maximum 50 characters")]
    public string FirstName { get; set; }
    
    [Range(0, double.MaxValue, ErrorMessage = "Salary must be positive")]
    public double Salary { get; set; }
    
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }
}
```

### Custom Validation in Events

#### Cell Validation
```csharp
sfTreeGrid.CurrentCellValidating += (s, e) =>
{
    // Email validation
    if (e.RowColumnIndex.ColumnIndex == 2 && !IsValidEmail(e.NewValue?.ToString()))
    {
        e.IsValid = false;
        e.ErrorMessage = "Invalid email";
    }

    // Salary validation
    if (e.RowColumnIndex.ColumnIndex == 3)
    {
        var node = sfTreeGrid.View.GetNodeAt(e.RowColumnIndex.RowIndex);
        var data = node?.Item as Employee;

        if (data != null && data.Title == "Manager" && Convert.ToDouble(e.NewValue) <= 50000)
        {
            e.IsValid = false;
            e.ErrorMessage = "Salary must be > 50,000";
        }
    }
};
// Email helper
private bool IsValidEmail(string email)
{
    if (string.IsNullOrWhiteSpace(email))
        return false;

    try
    {
        var addr = new System.Net.Mail.MailAddress(email);
        return addr.Address == email;
    }
    catch
    {
        return false;
    }
}
```


#### Row Validation

```csharp

sfTreeGrid.RowValidating += (s, e) =>
{
    var data = e.RowData as Employee;

    if (data != null && data.Title == "Manager" && data.Salary <= 50000)
    {
        e.IsValid = false;
        e.ErrorMessages.Add("Salary", "Salary must be > 50,000");
    }
};

```


### Built-in Validation using Interfaces

Implement `INotifyDataErrorInfo` in your model:


```csharp
using System.ComponentModel;

public class Employee : INotifyDataErrorInfo
{
    public string Title { get; set; }

    public IEnumerable GetErrors(string propertyName)
    {
        if (propertyName == "Title" && Title == "Invalid")
            return new List<string> { "Invalid title" };

        return null;
    }

    public bool HasErrors => false;

    public event EventHandler<DataErrorsChangedEventArgs> ErrorsChanged;
}
```

## Editor Types

Each column type has its own editor:

### TreeGridTextColumn - TextBox

Default text editor:

```xaml
<treeGrid:TreeGridTextColumn MappingName="FirstName" 
                            MaxLength="50" />
```

### TreeGridNumericColumn - SfNumberBox

Numeric editor with constraints:

```xaml
<treeGrid:TreeGridNumericColumn MappingName="Salary"
                               MinValue="0"
                               MaxValue="10000000" />
```

### TreeGridDateColumn - SfCalendarDatePicker

Date picker editor:

```xaml
<treeGrid:TreeGridDateColumn MappingName="HireDate"
                            MinDate="2000-01-01"
                            MaxDate="2030-12-31" />
```

### TreeGridTimeColumn - SfTimePicker

Time picker editor:

```xaml
<treeGrid:TreeGridTimeColumn MappingName="ShiftStartTime" />
```

### TreeGridCheckBoxColumn - CheckBox

Boolean editor (toggles on click):

```xaml
<treeGrid:TreeGridCheckBoxColumn MappingName="IsActive" />
```

### TreeGridComboBoxColumn - ComboBox

Dropdown selection:

```xaml
<treeGrid:TreeGridComboBoxColumn MappingName="Department"
                                ItemsSource="{Binding Departments}"
                                DisplayMemberPath="Name"
                                SelectedValuePath="ID"
                                IsEditable="True" />
```

### TreeGridTemplateColumn - Custom Editor

Provide custom edit template:

```xaml
<treeGrid:TreeGridTemplateColumn MappingName="Priority">
    <treeGrid:TreeGridTemplateColumn.CellTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Priority}" />
        </DataTemplate>
    </treeGrid:TreeGridTemplateColumn.CellTemplate>
    <treeGrid:TreeGridTemplateColumn.EditTemplate>
        <DataTemplate>
            <ComboBox ItemsSource="{Binding PriorityLevels}"
                     SelectedItem="{Binding Priority, Mode=TwoWay}" />
        </DataTemplate>
    </treeGrid:TreeGridTemplateColumn.EditTemplate>
</treeGrid:TreeGridTemplateColumn>
```

## Common Patterns

### Read-Only Rows

Make certain rows read-only based on data:

```csharp
sfTreeGrid.CurrentCellBeginEdit += (s, e) =>
{
    var node = sfTreeGrid.View.GetNodeAt(e.RowColumnIndex.RowIndex);
    var data = node?.Item as Employee;

    if (data == null) return;

    // Disable editing for archived records
    if (data.Status == "Archived")
    {
        e.Cancel = true;
    }
};

```

### Conditional Column Editing

Allow editing only when conditions are met:

```csharp
sfTreeGrid.CurrentCellBeginEdit += (sender, e) =>
{
    var node = sfTreeGrid.View.GetNodeAt(e.RowColumnIndex.RowIndex);
    var data = node?.Item as Employee;

    if (data == null) return;

    // Only managers can edit Salary column
    if (e.Column.MappingName == "Salary" && !CurrentUser.IsManager)
    {
        e.Cancel = true;
        ShowMessage("Only managers can edit salary");
    }
};

```

### Auto-Save on Edit

Automatically save changes to database:

```csharp
sfTreeGrid.CurrentCellEndEdit += async (s, e) =>
{
    var node = sfTreeGrid.View.GetNodeAt(e.RowColumnIndex.RowIndex);
    var employee = node?.Item as Employee;

    if (employee == null) return;

    await SaveToDatabase(employee);
};
```

### Track Changes

Monitor which cells have been edited:

```csharp
private HashSet<string> modifiedRows = new HashSet<string>();

sfTreeGrid.CurrentCellValueChanged += (s, e) =>
{
    var employee = e.Record as Employee;

    if (employee == null) return;

    modifiedRows.Add(employee.ID.ToString());

    // Mark row as modified (visual indicator)
    employee.IsModified = true;
};
```

## Keyboard Navigation

Default keyboard shortcuts for editing:

| Key | Action |
|-----|--------|
| **F2** | Begin edit current cell |
| **Enter** | Commit edit and move down |
| **Tab** | Commit edit and move right |
| **Shift+Tab** | Commit edit and move left |
| **Escape** | Cancel edit |

## Troubleshooting

**Editing not working:**
- Ensure `AllowEditing = True` on TreeGrid
- Check column's `AllowEditing` property
- Verify data model properties have public setters
- Check if `CurrentCellBeginEdit` event cancels editing

**Changes not persisting:**
- Implement `INotifyPropertyChanged` in data model
- Ensure two-way binding in templates
- Check `CurrentCellEndEdit` doesn't cancel

**Validation not showing:**
- Implement `IDataErrorInfo` or use data annotations
- Check validation logic in `CurrentCellEndEdit` event
- Ensure error messages are displayed

**Wrong editor appearing:**
- Verify column type matches data type
- Check if custom edit template is correctly defined
- Use `TreeGridTemplateColumn` for custom editors
