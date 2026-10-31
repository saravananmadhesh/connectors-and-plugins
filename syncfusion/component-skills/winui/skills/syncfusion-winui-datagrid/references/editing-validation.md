# Editing and Data Validation in WinUI DataGrid

Complete guide to editing modes, data validation, and CRUD operations in Syncfusion WinUI DataGrid.

## Table of Contents
- [Enable Editing](#enable-editing)
- [Edit Triggers](#edit-triggers)
- [Edit Modes](#edit-modes)
- [Navigation and CurrentCell](#navigation-and-currentcell)
- [CRUD Operations](#crud-operations)
- [Data Validation](#data-validation)
- [Editing Events](#editing-events)
- [Common Scenarios](#common-scenarios)

## Enable Editing

**Grid-Level:**
```xml
<dataGrid:SfDataGrid AllowEditing="True"
                     NavigationMode="Cell"
                     ItemsSource="{Binding Orders}" />
```

**Column-Level (takes priority):**
```xml
<dataGrid:GridTextColumn MappingName="OrderID" AllowEditing="False" />
<dataGrid:GridTextColumn MappingName="CustomerName" AllowEditing="True" />
```

**Important:** Set `NavigationMode="Cell"` to enable CurrentCell navigation required for editing.

## Edit Triggers

Control when cells enter edit mode:

```xml
<dataGrid:SfDataGrid AllowEditing="True"
                     EditTrigger="OnDoubleTap"
                     ItemsSource="{Binding Orders}" />
```

**Options:**
- `OnTap` - Single click enters edit mode
- `OnDoubleTap` - Double click enters edit mode (default)

**Keyboard:** Press **F2** key to enter edit mode.

## Edit Modes

### Cell Editing

Default mode - edit one cell at a time:

```csharp
sfDataGrid.AllowEditing = true;
sfDataGrid.NavigationMode = NavigationMode.Cell;
```

**Workflow:**
1. Click/double-click cell to enter edit mode
2. Modify value
3. Press Enter or Tab to commit
4. Press Escape to cancel

###Batch Editing

Edit multiple cells before committing:

```csharp
// Not directly supported; use standard cell editing with manual commit
```

## Navigation and CurrentCell

### Current Cell Management

```csharp
// Get current cell
var currentCell = sfDataGrid.SelectionController.CurrentCellManager.CurrentCell;
var rowIndex = currentCell.RowIndex;
var columnIndex = currentCell.ColumnIndex;

// Move current cell
sfDataGrid.SelectionController.MoveCurrentCell(new RowColumnIndex(5, 2));

// Check if in edit mode
bool isEditing = sfDataGrid.SelectionController.CurrentCellManager.HasCurrentCell &&
                 sfDataGrid.SelectionController.CurrentCellManager.CurrentCell.IsEditing;
```

### Cursor Placement in Edit Mode

```xml
<dataGrid:SfDataGrid EditorSelectionBehavior="MoveLast"
                     ItemsSource="{Binding Orders}" />
```

**Options:**
- `SelectAll` - Selects all text in editor
- `MoveLast` - Places cursor at end of text

## CRUD Operations

### Add New Row

```csharp
// Add to underlying collection (with ObservableCollection)
var viewModel = (OrderViewModel)this.DataContext;
viewModel.Orders.Add(new OrderInfo
{
    OrderID = 1010,
    CustomerName = "New Customer",
    Country = "USA"
});

// Or add directly
var orders = sfDataGrid.ItemsSource as ObservableCollection<OrderInfo>;
orders?.Add(new OrderInfo { OrderID = 1011, CustomerName = "Another Customer" });
```

### Update Row

Edit cells directly or programmatically:

```csharp
var orders = sfDataGrid.ItemsSource as ObservableCollection<OrderInfo>;
var orderToUpdate = orders.FirstOrDefault(o => o.OrderID == 1001);
if (orderToUpdate != null)
{
    orderToUpdate.CustomerName = "Updated Name";
    orderToUpdate.Country = "Updated Country";
}
```

### Delete Row

```csharp
// Delete selected row
var selectedItem = sfDataGrid.SelectedItem as OrderInfo;
if (selectedItem != null)
{
    var orders = sfDataGrid.ItemsSource as ObservableCollection<OrderInfo>;
    orders?.Remove(selectedItem);
}

// Delete multiple selected rows
var selectedItems = sfDataGrid.SelectedItems.Cast<OrderInfo>().ToList();
var orders = sfDataGrid.ItemsSource as ObservableCollection<OrderInfo>;
foreach (var item in selectedItems)
{
    orders?.Remove(item);
}
```

### Commit/Cancel Edits

```csharp
// Commit current cell edit
sfDataGrid.SelectionController.CurrentCellManager.EndEdit();
```

## Data Validation

### INotifyDataErrorInfo Validation

Implement `INotifyDataErrorInfo` in your model:

```csharp
using System.Collections;
using System.ComponentModel;

public class OrderInfo : INotifyDataErrorInfo, INotifyPropertyChanged
{
    private int orderID;
    private string customerName;
    private Dictionary<string, List<string>> errors = new Dictionary<string, List<string>>();
    
    public int OrderID
    {
        get => orderID;
        set
        {
            orderID = value;
            ValidateOrderID();
            OnPropertyChanged(nameof(OrderID));
        }
    }
    
    public string CustomerName
    {
        get => customerName;
        set
        {
            customerName = value;
            ValidateCustomerName();
            OnPropertyChanged(nameof(CustomerName));
        }
    }
    
    private void ValidateOrderID()
    {
        ClearErrors(nameof(OrderID));
        
        if (OrderID <= 0)
            AddError(nameof(OrderID), "OrderID must be greater than zero");
    }
    
    private void ValidateCustomerName()
    {
        ClearErrors(nameof(CustomerName));
        
        if (string.IsNullOrWhiteSpace(CustomerName))
            AddError(nameof(CustomerName), "Customer name is required");
        else if (CustomerName.Length < 3)
            AddError(nameof(CustomerName), "Customer name must be at least 3 characters");
    }
    
    // INotifyDataErrorInfo Implementation
    public bool HasErrors => errors.Count > 0;
    
    public event EventHandler<DataErrorsChangedEventArgs> ErrorsChanged;
    
    public IEnumerable GetErrors(string propertyName)
    {
        if (string.IsNullOrEmpty(propertyName))
            return errors.Values.SelectMany(e => e);
        
        return errors.ContainsKey(propertyName) ? errors[propertyName] : null;
    }
    
    private void AddError(string propertyName, string error)
    {
        if (!errors.ContainsKey(propertyName))
            errors[propertyName] = new List<string>();
        
        if (!errors[propertyName].Contains(error))
        {
            errors[propertyName].Add(error);
            OnErrorsChanged(propertyName);
        }
    }
    
    private void ClearErrors(string propertyName)
    {
        if (errors.ContainsKey(propertyName))
        {
            errors.Remove(propertyName);
            OnErrorsChanged(propertyName);
        }
    }
    
    private void OnErrorsChanged(string propertyName)
    {
        ErrorsChanged?.Invoke(this, new DataErrorsChangedEventArgs(propertyName));
    }
    
    // INotifyPropertyChanged Implementation
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

### Data Annotation Validation

Use data annotations for validation:

```csharp
using System.ComponentModel.DataAnnotations;

public class OrderInfo : INotifyPropertyChanged
{
    [Required(ErrorMessage = "OrderID is required")]
    [Range(1, int.MaxValue, ErrorMessage = "OrderID must be greater than 0")]
    public int OrderID { get; set; }
    
    [Required(ErrorMessage = "Customer name is required")]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "Name must be 3-50 characters")]
    public string CustomerName { get; set; }
    
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string Email { get; set; }
    
    [Range(1, 1000, ErrorMessage = "Quantity must be between 1 and 1000")]
    public int Quantity { get; set; }
}
```

### Custom Validation

Implement custom validation logic:

```csharp
sfDataGrid.CurrentCellValidating += SfDataGrid_CurrentCellValidating;

private void SfDataGrid_CurrentCellValidating(object sender, CurrentCellValidatingEventArgs e)
{
    var columnName = e.Column.MappingName;
    var newValue = e.NewValue;
    
    // Custom validation for OrderID
    if (columnName == "OrderID")
    {
        if (!int.TryParse(newValue?.ToString(), out int orderId) || orderId <= 0)
        {
            e.IsValid = false;
            e.ErrorMessage = "OrderID must be a positive number";
        }
    }
    
    // Custom validation for CustomerName
    if (columnName == "CustomerName")
    {
        if (string.IsNullOrWhiteSpace(newValue?.ToString()))
        {
            e.IsValid = false;
            e.ErrorMessage = "Customer name cannot be empty";
        }
    }
}
```

### Display Error Messages

```csharp
// Error messages are displayed automatically in tooltips
// Customize error template if needed
```

## Editing Events

### CurrentCellBeginEdit

Fired before entering edit mode:

```csharp
sfDataGrid.CurrentCellBeginEdit += SfDataGrid_CurrentCellBeginEdit;

private void SfDataGrid_CurrentCellBeginEdit(object sender, CurrentCellBeginEditEventArgs e)
{
    // e.Column - column being edited
    // e.RowColumnIndex - cell position
    
    // Prevent editing based on condition
    var rowData = sfDataGrid.GetRecordAtRowIndex(e.RowColumnIndex.RowIndex) as OrderInfo;
    if (rowData?.IsShipped == true)
    {
        e.Cancel = true; // Don't allow editing shipped orders
    }
}
```

### CurrentCellValidating

Fired during validation:

```csharp
private void SfDataGrid_CurrentCellValidating(object sender, CurrentCellValidatingEventArgs e)
{
    // Custom validation logic
    if (e.Column.MappingName == "UnitPrice")
    {
        if (decimal.TryParse(e.NewValue?.ToString(), out decimal price))
        {
            if (price < 0)
            {
                e.IsValid = false;
                e.ErrorMessage = "Price cannot be negative";
            }
        }
    }
}
```

### CurrentCellValidated

Fired after validation succeeds:

```csharp
sfDataGrid.CurrentCellValidated += SfDataGrid_CurrentCellValidated;

private void SfDataGrid_CurrentCellValidated(object sender, CurrentCellValidatedEventArgs e)
{
    var rowData = e.RowData as OrderInfo;
    Debug.WriteLine($"Row: {rowData?.OrderID}, Column: {e.Column.MappingName} validated");
}

```

### CurrentCellValueChanged

Fired when cell value changes:

```csharp
sfDataGrid.CurrentCellValueChanged += SfDataGrid_CurrentCellValueChanged;

private void SfDataGrid_CurrentCellValueChanged(object sender, CurrentCellValueChangedEventArgs e)
{
    // e.Column - edited column
    // e.RowColumnIndex - cell position
    
    var rowData = sfDataGrid.GetRecordAtRowIndex(e.RowColumnIndex.RowIndex);
    Debug.WriteLine($"Value changed in {e.Column.MappingName}");
}
```

### CurrentCellEndEdit

Fired when editing ends (committed):

```csharp
sfDataGrid.CurrentCellEndEdit += SfDataGrid_CurrentCellEndEdit;

private void SfDataGrid_CurrentCellEndEdit(object sender, CurrentCellEndEditEventArgs e)
{
    Debug.WriteLine("Edit completed");
}
```

## Common Scenarios

### Scenario 1: Read-Only Columns with Conditional Editing

```csharp
// Make OrderID always read-only
sfDataGrid.Columns["OrderID"].AllowEditing = false;

// Allow editing other columns only if not shipped
sfDataGrid.CurrentCellBeginEdit += (s, e) =>
{
    var rowData = sfDataGrid.GetRecordAtRowIndex(e.RowColumnIndex.RowIndex) as OrderInfo;
    if (rowData?.IsShipped == true)
        e.Cancel = true;
};
```

### Scenario 2: Validate on Multiple Conditions

```csharp
sfDataGrid.CurrentCellValidating += (s, e) =>
{    
    if (e.Column.MappingName == "Quantity")
    {
        if (int.TryParse(e.NewValue?.ToString(), out int qty))
        {
            // Check inventory
            if (qty > e.RowData.AvailableStock)
            {
                e.IsValid = false;
                e.ErrorMessage = $"Only {e.RowData.AvailableStock} units available";
            }
        }
    }
};
```

### Scenario 3: Auto-Calculate Dependent Fields

```csharp
sfDataGrid.CurrentCellValueChanged += (s, e) =>
{
    var rowData = sfDataGrid.GetRecordAtRowIndex(e.RowColumnIndex.RowIndex) as OrderInfo;
    
    // Recalculate total when quantity or price changes
    if (e.Column.MappingName == "Quantity" || e.Column.MappingName == "UnitPrice")
    {
        rowData.Total = rowData.Quantity * rowData.UnitPrice;
    }
};
```

### Scenario 4: Prevent Duplicate Values

```csharp
sfDataGrid.CurrentCellValidating += (s, e) =>
{
    if (e.Column.MappingName == "OrderID")
    {
        var newOrderID = e.NewValue?.ToString();
        var orders = sfDataGrid.ItemsSource as ObservableCollection<OrderInfo>;
        
        // Check if OrderID already exists (excluding current row)
        if (orders.Any(o => o.OrderID.ToString() == newOrderID && o != e.RowData))
        {
            e.IsValid = false;
            e.ErrorMessage = "OrderID already exists";
        }
    }
};
```

## Best Practices

1. **Always set NavigationMode="Cell"** when enabling editing
2. **Implement INotifyDataErrorInfo** in models for comprehensive validation
3. **Use ObservableCollection** for automatic UI updates on CRUD operations
4. **Validate in CurrentCellValidating** for immediate user feedback
5. **Make primary key columns read-only** (AllowEditing="False")
6. **Use EditTrigger="OnDoubleTap"** to prevent accidental edits
7. **Handle CurrentCellBeginEdit** for conditional editing scenarios
8. **Implement INotifyPropertyChanged** in models for property change notifications
9. **Clear validation errors** when values are corrected
10. **Test CRUD operations** with both mouse and keyboard navigation
