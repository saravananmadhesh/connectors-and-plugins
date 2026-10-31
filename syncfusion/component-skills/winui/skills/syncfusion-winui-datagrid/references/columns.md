# Columns in WinUI DataGrid

Complete guide to column types, configuration, auto-generation, sizing, resizing, freezing, and manipulation in Syncfusion WinUI DataGrid.

## Table of Contents
1. [Column Basics](#column-basics)
2. [Column Types Overview](#column-types-overview)
3. [GridTextColumn](#gridtextcolumn)
4. [GridNumericColumn](#gridnumericcolumn)
5. [GridCheckBoxColumn](#gridcheckboxcolumn)
6. [GridDateColumn](#griddatecolumn)
7. [GridComboBoxColumn](#gridcomboboxcolumn)
8. [GridImageColumn](#gridimagecolumn)
9. [GridHyperlinkColumn](#gridhyperlinkcolumn)
10. [GridTimeColumn](#gridtimecolumn)
11. [Auto-Generating Columns](#auto-generating-columns)
11. [Manually Defining Columns](#manually-defining-columns)
12. [Column Manipulation](#column-manipulation)
13. [Column Width and Sizing](#column-width-and-sizing)
14. [Auto-Sizing Columns](#auto-sizing-columns)
15. [Resizing Columns](#resizing-columns)
16. [Drag and Drop Columns](#drag-and-drop-columns)
17. [Freezing Columns](#freezing-columns)
18. [Binding Column Properties](#binding-column-properties)
19. [Best Practices](#best-practices)
20. [Common Scenarios](#common-scenarios)

---

## Column Basics

SfDataGrid uses a column-based architecture where each column represents a data property. The DataGrid's `Columns` collection contains all column definitions that control how data is displayed and interacted with.

**Key Column Concepts:**
- **MappingName:** Property name from your data object that maps to this column
- **HeaderText:** Display name for the column header
- **Width:** Column width (fixed or automatic)
- **AllowSorting:** Whether users can sort this column
- **AllowFiltering:** Whether filtering is available for this column

---

## Column Types Overview

Each Syncfusion WinUI DataGrid column type corresponds to a specific data type and includes a matching renderer for display and editing:

| Column Type | Renderer | Use For | Data Type |
|---|---|---|---|
| GridTextColumn | GridCellTextBoxRenderer | String and text data | string, object, dynamic |
| GridNumericColumn | GridCellNumericRenderer | Numbers (int, decimal, double, float, long) | double, int, decimal |
| GridCheckBoxColumn | GridCellCheckBoxRenderer | Boolean values (true/false) | bool |
| GridDateColumn | GridCellDateRenderer | DateTime values | DateTimeOffset, DateTime |
| GridComboBoxColumn | GridCellComboBoxRenderer | Dropdown selection from a list | IEnumerable |
| GridImageColumn | GridCellImageRenderer | Image data (byte arrays, URIs) | ImageSource, string (URI) |
| GridHyperlinkColumn | GridCellHyperlinkRenderer | Clickable links | Uri |
| GridToggleSwitchColumn | - | Boolean as toggle switch | bool |
| GridTimeColumn | - | Time values | DateTimeOffset |
| GridCheckBoxSelectorColumn | - | Row selection checkbox (not data-bound) | - |
| GridTemplateColumn | - | Custom template for any content | any |
| GridUnboundColumn | - | Computed/unbound data | calculated |

---

## GridTextColumn

Displays and edits string data as text boxes.

### Basic Usage

```xaml
<dataGrid:GridTextColumn 
    MappingName="CustomerName" 
    HeaderText="Customer Name" 
    Width="200"/>
```

### Common Properties

```xaml
<dataGrid:GridTextColumn 
    MappingName="CustomerName"
    HeaderText="Customer Name"
    Width="200"
    TextAlignment="Left"                    <!-- Text alignment: Left, Center, Right -->
    AllowTextWrapping="False"               <!-- Enable text wrapping in cells -->
    MaximumLength="50"                      <!-- Maximum characters allowed -->
    IsReadOnly="False"                      <!-- Allow editing -->
/>
```

### Example: Customer Information

```xaml
<dataGrid:SfDataGrid AutoGenerateColumns="False" ItemsSource="{Binding Customers}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="CustomerID" HeaderText="ID" Width="80"/>
        <dataGrid:GridTextColumn MappingName="CustomerName" HeaderText="Full Name" Width="180"/>
        <dataGrid:GridTextColumn MappingName="Email" HeaderText="Email Address" Width="200"/>
        <dataGrid:GridTextColumn MappingName="City" HeaderText="City" Width="120"/>
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### Best Practices

- Use appropriate width based on typical content length
- Enable text wrapping for long content: `AllowTextWrapping="True"`
- Use `MaximumLength` to enforce input limits
- Set `IsReadOnly="True"` for display-only columns (IDs, computed values)

---

## GridNumericColumn

Displays and edits numeric data with formatting and validation.

### Basic Usage

```xaml
<dataGrid:GridNumericColumn 
    MappingName="OrderAmount" 
    HeaderText="Amount" 
    Width="120"/>
```

### Common Properties

```xaml
<dataGrid:GridNumericColumn 
    MappingName="OrderAmount"
    HeaderText="Amount"
    Width="120"
    NumberDecimalDigits="2"                 <!-- Decimal places -->
    NumberFormat="C"                        <!-- Format: C (currency), N (number), P (percent) -->
    TextAlignment="Right"                   <!-- Usually right-aligned -->
    MinimumValue="0"                        <!-- Minimum allowed value -->
    MaximumValue="999999"                   <!-- Maximum allowed value -->
    IsReadOnly="False"                      <!-- Allow editing -->
/>
```

### Format Options

```xaml
<!-- Currency Format -->
<dataGrid:GridNumericColumn MappingName="Price" NumberFormat="C" NumberDecimalDigits="2"/>
<!-- Result: $1,234.56 -->

<!-- Percentage Format -->
<dataGrid:GridNumericColumn MappingName="DiscountPercent" NumberFormat="P" NumberDecimalDigits="1"/>
<!-- Result: 25.0% -->

<!-- Number Format -->
<dataGrid:GridNumericColumn MappingName="Quantity" NumberFormat="N" NumberDecimalDigits="0"/>
<!-- Result: 1,234 -->
```

### Example: Financial Data

```xaml
<dataGrid:SfDataGrid AutoGenerateColumns="False" ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID" HeaderText="Order #"/>
        <dataGrid:GridNumericColumn MappingName="Quantity" HeaderText="Qty" NumberDecimalDigits="0"/>
        <dataGrid:GridNumericColumn MappingName="UnitPrice" HeaderText="Unit Price" NumberFormat="C" NumberDecimalDigits="2"/>
        <dataGrid:GridNumericColumn MappingName="TotalAmount" HeaderText="Total" NumberFormat="C" NumberDecimalDigits="2"/>
        <dataGrid:GridNumericColumn MappingName="DiscountPercent" HeaderText="Discount" NumberFormat="P" NumberDecimalDigits="1"/>
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### Best Practices

- Always format currency columns as "C" (currency)
- Right-align numeric columns for better readability
- Set appropriate `MinimumValue` and `MaximumValue` for validation
- Use `NumberDecimalDigits` to control precision

---

## GridCheckBoxColumn

Displays and edits boolean (true/false) values as checkboxes.

### Basic Usage

```xaml
<dataGrid:GridCheckBoxColumn 
    MappingName="IsShipped" 
    HeaderText="Shipped" 
    Width="100"/>
```

### Common Properties

```xaml
<dataGrid:GridCheckBoxColumn 
    MappingName="IsShipped"
    HeaderText="Shipped"
    Width="100"
    IsReadOnly="False"                      <!-- Allow checking/unchecking -->
    HorizontalHeaderContentAlignment="Center"
/>
```

### Example: Order Status

```xaml
<dataGrid:SfDataGrid AutoGenerateColumns="False" ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID" HeaderText="Order #"/>
        <dataGrid:GridTextColumn MappingName="CustomerName" HeaderText="Customer"/>
        <dataGrid:GridCheckBoxColumn MappingName="IsShipped" HeaderText="Shipped"/>
        <dataGrid:GridCheckBoxColumn MappingName="IsDelivered" HeaderText="Delivered"/>
        <dataGrid:GridCheckBoxColumn MappingName="IsPaid" HeaderText="Payment Received"/>
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### Data Model

```csharp
public class OrderInfo
{
    public int OrderID { get; set; }
    public string CustomerName { get; set; }
    public bool IsShipped { get; set; }      // Property must be boolean
    public bool IsDelivered { get; set; }
    public bool IsPaid { get; set; }
}
```

### Best Practices

- Name boolean properties with "Is" prefix (IsShipped, IsActive, etc.)
- Center-align checkbox headers and cells
- Use for simple true/false states only
- For multi-state options (not shipped, shipped, delivered), use ComboBox instead

---

## GridDateColumn

Displays and edits DateTime values with date formatting.

### Basic Usage

```xaml
<dataGrid:GridDateColumn 
    MappingName="OrderDate" 
    HeaderText="Order Date" 
    Width="130"/>
```

### Common Properties

```xaml
<dataGrid:GridDateColumn 
    MappingName="OrderDate"
    HeaderText="Order Date"
    Width="130"
    DisplayDateFormat="MM/dd/yyyy"          <!-- Date format for display -->
    AllowEditing="True"                     <!-- Allow date editing -->
/>
```

### Date Format Examples

```xaml
<!-- US Format: MM/dd/yyyy -->
<dataGrid:GridDateColumn MappingName="OrderDate" DisplayDateFormat="MM/dd/yyyy" HeaderText="Date (US)"/>
<!-- Result: 01/15/2024 -->

<!-- European Format: dd/MM/yyyy -->
<dataGrid:GridDateColumn MappingName="OrderDate" DisplayDateFormat="dd/MM/yyyy" HeaderText="Date (EU)"/>
<!-- Result: 15/01/2024 -->

<!-- Full format with time -->
<dataGrid:GridDateColumn MappingName="CreatedDate" DisplayDateFormat="MM/dd/yyyy HH:mm:ss" HeaderText="Created"/>
<!-- Result: 01/15/2024 14:30:00 -->

<!-- Short format -->
<dataGrid:GridDateColumn MappingName="OrderDate" DisplayDateFormat="M/d/yyyy" HeaderText="Date"/>
<!-- Result: 1/15/2024 -->
```

### Example: Date-Based Data

```xaml
<dataGrid:SfDataGrid AutoGenerateColumns="False" ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID" HeaderText="Order #"/>
        <dataGrid:GridDateColumn MappingName="OrderDate" DisplayDateFormat="MM/dd/yyyy" HeaderText="Order Date"/>
        <dataGrid:GridDateColumn MappingName="ShippedDate" DisplayDateFormat="MM/dd/yyyy" HeaderText="Shipped"/>
        <dataGrid:GridDateColumn MappingName="DeliveredDate" DisplayDateFormat="MM/dd/yyyy" HeaderText="Delivered"/>
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### Best Practices

- Use consistent date formats across the application
- Store dates as DateTime (not strings)
- Handle null dates for optional date fields
- Consider user locale for date format selection

---

## GridComboBoxColumn

Displays a dropdown list of predefined values for selection.

### Basic Usage

```xaml
<dataGrid:GridComboBoxColumn 
    MappingName="Status" 
    HeaderText="Order Status"
    ItemsSource="{Binding StatusList}"
    Width="150"/>
```

### Common Properties

```xaml
<dataGrid:GridComboBoxColumn 
    MappingName="Status"
    HeaderText="Order Status"
    ItemsSource="{Binding StatusList}"      <!-- Source of dropdown items -->
    DisplayMemberPath="StatusName"          <!-- Property to display -->
    SelectedValuePath="StatusID"            <!-- Property to store -->
    Width="150"
    AllowEditing="True"                     <!-- Allow typing custom values -->
    IsReadOnly="False"                      <!-- Allow selection -->
/>
```

### Example: Status Selection

```csharp
// ViewModel
public class OrderViewModel
{
    public ObservableCollection<OrderInfo> Orders { get; set; }
    public ObservableCollection<OrderStatus> StatusList { get; set; }
    
    public OrderViewModel()
    {
        StatusList = new ObservableCollection<OrderStatus>
        {
            new OrderStatus { StatusID = 1, StatusName = "Pending" },
            new OrderStatus { StatusID = 2, StatusName = "Confirmed" },
            new OrderStatus { StatusID = 3, StatusName = "Shipped" },
            new OrderStatus { StatusID = 4, StatusName = "Delivered" },
            new OrderStatus { StatusID = 5, StatusName = "Cancelled" }
        };
        
        Orders = new ObservableCollection<OrderInfo> { ... };
    }
}

// Data Model
public class OrderStatus
{
    public int StatusID { get; set; }
    public string StatusName { get; set; }
}

public class OrderInfo
{
    public int OrderID { get; set; }
    public string CustomerName { get; set; }
    public int Status { get; set; }         // Stores StatusID
}
```

```xaml
<dataGrid:SfDataGrid AutoGenerateColumns="False" ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID" HeaderText="Order #"/>
        <dataGrid:GridTextColumn MappingName="CustomerName" HeaderText="Customer"/>
        <dataGrid:GridComboBoxColumn 
            MappingName="Status" 
            HeaderText="Status"
            ItemsSource="{Binding StatusList}"
            DisplayMemberPath="StatusName"
            SelectedValuePath="StatusID"
            Width="150"/>
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### Best Practices

- Use for fixed lists of valid options
- Define dropdown items in ViewModel/code, not hardcoded
- Use DisplayMemberPath for user-friendly display
- Use SelectedValuePath for storing actual values
- For dynamic lists that change at runtime, update StatusList collection

---

## GridImageColumn

Displays image data as thumbnails in cells.

### Basic Usage

```xaml
<dataGrid:GridImageColumn 
    MappingName="ProductImage" 
    HeaderText="Image" 
    Width="120"/>
```

### Common Properties

```xaml
<dataGrid:GridImageColumn 
    MappingName="ProductImage"
    HeaderText="Image"
    Width="120"
    Height="100"                            <!-- Image height in cells -->
    Stretch="Uniform"                       <!-- Stretch mode -->
/>
```

### Supported Image Formats

- **URI/String:** Image URL path
- **Byte Array:** Binary image data (often from database)
- **BitmapImage:** Direct BitmapImage object

### Example: Product Images

```xaml
<dataGrid:SfDataGrid AutoGenerateColumns="False" ItemsSource="{Binding Products}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridImageColumn MappingName="ProductImage" HeaderText="Product" Width="150" Height="120"/>
        <dataGrid:GridTextColumn MappingName="ProductName" HeaderText="Name" Width="200"/>
        <dataGrid:GridNumericColumn MappingName="Price" HeaderText="Price" NumberFormat="C"/>
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### Data Model

```csharp
public class ProductInfo
{
    public int ProductID { get; set; }
    public string ProductName { get; set; }
    public string ProductImage { get; set; }  // Image URI as string
    public decimal Price { get; set; }
}
```

### Best Practices

- Keep images reasonably sized (don't load massive images)
- Use thumbnails for better performance
- Provide fallback image for missing image URIs
- Set appropriate width/height for cells
- Cache images when loading from network

---

## GridHyperlinkColumn

Displays clickable hyperlinks that trigger navigation or commands.

### Basic Usage

```xaml
<dataGrid:GridHyperlinkColumn 
    MappingName="Website" 
    HeaderText="Visit Website" 
    Width="150"/>
```

### Common Properties

```xaml
<dataGrid:GridHyperlinkColumn 
    MappingName="Website"
    HeaderText="Visit Website"
    Width="150"
    AllowEditing="True"
    IsReadOnly="False"
/>
```

### Example: Links

```xaml
<dataGrid:SfDataGrid AutoGenerateColumns="False" ItemsSource="{Binding Companies}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="CompanyName" HeaderText="Company"/>
        <dataGrid:GridHyperlinkColumn MappingName="Website" HeaderText="Website"/>
        <dataGrid:GridHyperlinkColumn MappingName="ContactEmail" HeaderText="Email"/>
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### Data Model

```csharp
public class CompanyInfo
{
    public string CompanyName { get; set; }
    public string Website { get; set; }      // URL: "https://example.com"
    public string ContactEmail { get; set; }  // Email: "contact@example.com"
}
```

### Best Practices

- Ensure data contains valid URLs or email addresses
- Use for external navigation links
- Validate URLs before displaying
- Handle missing/null links gracefully

---

## GridTimeColumn

Displays and edits time values using the SfTimePicker control in edit mode.

### Basic Usage

```xaml
<dataGrid:GridTimeColumn 
    MappingName="DeliveredTime" 
    HeaderText="Delivered Time" 
    Width="130"/>
```

### Common Properties

```xaml
<dataGrid:GridTimeColumn 
    MappingName="DeliveredTime"
    HeaderText="Delivered Time"
    Width="130"
    DisplayTimeFormat="HH:mm tt"            <!-- Time format for display: hh:mm tt (default), HH:mm tt, etc. -->
    AllowNull="True"                        <!-- Allow null values -->
    PlaceholderText="Select a time"         <!-- Hint text when null -->
    EditMode="Mask"                         <!-- Edit mode: Normal, Mask (default), or None -->
    ShowSubmitButtons="True"                <!-- Show Ok/Cancel buttons in dropdown -->
    ShowClearButton="True"                  <!-- Show clear button in editor -->
    MinTime="08:00"                         <!-- Minimum allowed time -->
    MaxTime="18:00"                         <!-- Maximum allowed time -->
/>
```

### Time Format Examples

```xaml
<!-- 12-Hour Format (default) -->
<dataGrid:GridTimeColumn MappingName="DeliveredTime" DisplayTimeFormat="hh:mm tt" HeaderText="Time (12-hr)"/>
<!-- Result: 02:30 PM -->

<!-- 24-Hour Format -->
<dataGrid:GridTimeColumn MappingName="DeliveredTime" DisplayTimeFormat="HH:mm tt" HeaderText="Time (24-hr)"/>
<!-- Result: 14:30 -->

<!-- Without Meridiem -->
<dataGrid:GridTimeColumn MappingName="DeliveredTime" DisplayTimeFormat="HH:mm" HeaderText="Time"/>
<!-- Result: 14:30 -->
```

### Example: Time-Based Data

```xaml
<dataGrid:SfDataGrid AutoGenerateColumns="False" ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID" HeaderText="Order #"/>
        <dataGrid:GridTimeColumn MappingName="OrderTime" DisplayTimeFormat="hh:mm tt" HeaderText="Order Time"/>
        <dataGrid:GridTimeColumn MappingName="DeliveredTime" DisplayTimeFormat="hh:mm tt" HeaderText="Delivered Time"/>
        <dataGrid:GridTimeColumn MappingName="PickupTime" DisplayTimeFormat="HH:mm" HeaderText="Pickup Time"/>
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### Null Value Support

Control how null values are handled using the `AllowNull` and `PlaceholderText` properties:

```xaml
<dataGrid:GridTimeColumn 
    MappingName="DeliveredTime"
    HeaderText="Delivered Time"
    AllowNull="True"
    PlaceholderText="Change the Time"/>
```

When `AllowNull` is `True`, the placeholder text "Change the Time" is displayed when no time is selected.

### Time Range Validation

Restrict time input within a specific range using `MinTime` and `MaxTime`:

```xaml
<dataGrid:GridTimeColumn 
    MappingName="OrderTime"
    HeaderText="Order Time"
    MinTime="08:00"
    MaxTime="18:00"/>
```

This ensures users can only select times between 8:00 AM and 6:00 PM.

### Edit Modes

GridTimeColumn supports three editing modes:

**Normal Mode:**
```xaml
<dataGrid:GridTimeColumn 
    MappingName="DeliveredTime"
    HeaderText="Delivered Time"
    EditMode="Normal"/>
```
Validates input only after editing is completed. Users can freely type time values.

**Mask Mode (default):**
```xaml
<dataGrid:GridTimeColumn 
    MappingName="DeliveredTime"
    HeaderText="Delivered Time"
    EditMode="Mask"/>
```
Validates input as the user edits. Enforces time format through input mask.

**None Mode:**
```xaml
<dataGrid:GridTimeColumn 
    MappingName="DeliveredTime"
    HeaderText="Delivered Time"
    EditMode="None"/>
```
Disables editing in the edit part. Users can only select from dropdown picker.

### Submit Buttons Control

Hide the Ok/Cancel buttons to select time directly from dropdown spinner:

```xaml
<dataGrid:GridTimeColumn 
    MappingName="DeliveredTime"
    HeaderText="Delivered Time"
    ShowSubmitButtons="False"/>
```

When `ShowSubmitButtons` is `False`, users can directly click on a time in the spinner to select it without clicking Ok.

### Show Clear Button

The `ShowClearButton` property enables users to clear the cell value during editing. When enabled, a clear button appears within the editor.

```xaml
<dataGrid:GridTimeColumn 
    MappingName="DeliveredTime"
    HeaderText="Delivered Time"
    ShowClearButton="True"
    AllowNull="True"/>
```

**Behavior Based on AllowNull:**

- **When AllowNull is True:** Clicking the clear button sets the cell value to `null`
- **When AllowNull is False:** Clicking the clear button keeps the cell value unchanged

### Examples with Clear Button

**Allow null values with clear button:**
```xaml
<dataGrid:GridTimeColumn 
    MappingName="DeliveredTime"
    HeaderText="Delivered Time"
    ShowClearButton="True"
    AllowNull="True"
    PlaceholderText="Select a time"/>
```
Users can click the clear button to set the time to null.

**Prevent null values but show clear button:**
```xaml
<dataGrid:GridTimeColumn 
    MappingName="DeliveredTime"
    HeaderText="Delivered Time"
    ShowClearButton="True"
    AllowNull="False"/>
```
The clear button is visible but clicking it doesn't change the value (since AllowNull is False).

### Best Practices

- Use consistent time formats across your application
- Set appropriate `MinTime` and `MaxTime` ranges for business logic
- Combine `ShowClearButton="True"` with `AllowNull="True"` for better UX
- Use `EditMode="Mask"` for real-time validation of time input
- Use `ShowSubmitButtons="False"` for faster time selection in mobile/touch scenarios
- Display meaningful placeholder text when `AllowNull="True"`

---

## Auto-Generating Columns

### What is Auto-Generation?

When `AutoGenerateColumns="True"`, the DataGrid automatically creates a column for each public property of your data object. This is useful for rapid prototyping and simple displays.

```xaml
<dataGrid:SfDataGrid x:Name="sfDataGrid"
                     AutoGenerateColumns="True"
                     ItemsSource="{Binding Orders}" />
```

### Auto-Generation Rules

Columns are generated based on property types:

| Property Type | Generated Column |
|---------------|------------------|
| string, object, dynamic | GridTextColumn |
| double, double? | GridNumericColumn |
| DateTimeOffset, DateTimeOffset? | GridDateColumn |
| Uri, Uri? | GridHyperlinkColumn |
| bool, bool? | GridCheckBoxColumn |
| Other types | GridTextColumn |

### AutoGenerateColumns Modes

Control auto-generation behavior with `AutoGenerateColumnsMode`:

| Mode | Behavior | When ItemsSource Changes |
|------|----------|--------------------------|
| **Reset** (default) | Generate columns from data object properties | Keeps manual columns, regenerates auto columns |
| **RetainOld** | Generate if not explicitly defined | Maintains existing columns and settings |
| **ResetAll** | Generate all columns fresh | Clears all columns including manual ones |
| **SmartReset** | Generate and retain data operations | Retains valid columns with their settings |
| **None** | No auto-generation | Keeps old columns |

```xml
<dataGrid:SfDataGrid AutoGenerateColumns="True"
                     AutoGenerateColumnsMode="RetainOld"
                     ItemsSource="{Binding Orders}" />
```

### Auto-Generate Custom Type Properties

Enable column generation for custom type properties:

```xml
<dataGrid:SfDataGrid AutoGenerateColumnsForCustomType="True"
                     AutoGenerateColumnsModeForCustomType="Both"
                     ItemsSource="{Binding Source}" />
```

**AutoGenerateColumnsModeForCustomType Options:**
- **Both** - Generates columns for custom type and its inner properties
- **Parent** - Only custom type column
- **Child** - Only inner properties of custom type

### Customize Auto-Generated Columns

Use `AutoGeneratingColumn` event to customize or cancel column generation:

```csharp
sfDataGrid.AutoGeneratingColumn += SfDataGrid_AutoGeneratingColumn;

private void SfDataGrid_AutoGeneratingColumn(object sender, AutoGeneratingColumnArgs e)
{
    // Cancel column generation for specific property
    if (e.Column.MappingName == "OrderID")
    {
        e.Cancel = true;
        return;
    }
    
    // Change column type
    if (e.Column.MappingName == "IsShipped" && e.Column is GridCheckBoxColumn)
    {
        e.Column = new GridTextColumn 
        { 
            MappingName = "IsShipped", 
            HeaderText = "Shipped Status" 
        };
    }
    
    // Customize column properties
    if (e.Column.MappingName == "CustomerID")
    {
        e.Column.AllowEditing = false;
        e.Column.AllowSorting = true;
        e.Column.AllowFiltering = true;
        e.Column.ColumnWidthMode = ColumnWidthMode.Auto;
        e.Column.Width = 150;
    }
    
    // Set custom templates
    if (e.Column.MappingName == "OrderID")
    {
        e.Column.HeaderTemplate = Resources["customHeaderTemplate"] as DataTemplate;
        e.Column.CellTemplate = Resources["customCellTemplate"] as DataTemplate;
    }
}
```

### Data Annotations for Auto-Generation

Use data annotations to control auto-generation:

**Exclude Column:**
```csharp
using System.ComponentModel.DataAnnotations;

[Display(AutoGenerateField = false)]
public int OrderID { get; set; }
```

**Set as Editable:**
```csharp
[Editable(true)]
public decimal UnitPrice { get; set; }
```

**Customize Header Text:**
```csharp
[Display(Name = "Customer Name")]
public string CustomerName { get; set; }
```

**Change Column Order:**
```csharp
[Display(Order = 0)]
public string ShipCity { get; set; }

[Display(Order = 1)]
public int OrderID { get; set; }
```

### Excluding Properties from Auto-Generation

To exclude specific properties, set `AutoGenerateColumns="False"` and define only the columns you want:

```xaml
<dataGrid:SfDataGrid AutoGenerateColumns="False"
                     ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID" />
        <dataGrid:GridTextColumn MappingName="CustomerName" />
        <!-- InternalID and Timestamp properties are hidden -->
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

---

## Manually Defining Columns

### Why Use Manual Columns?

Manual column definition gives you complete control:
- ✅ Exact column ordering
- ✅ Hide properties you don't want displayed
- ✅ Customize column headers and types
- ✅ Set column widths precisely
- ✅ Performance optimization for large models
- ✅ Production-ready applications

### Basic Manual Column Definition

```xaml
<dataGrid:SfDataGrid x:Name="sfDataGrid"
                     AutoGenerateColumns="False"
                     ItemsSource="{Binding Orders}">
    
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID" HeaderText="Order ID" Width="100"/>
        <dataGrid:GridTextColumn MappingName="CustomerName" HeaderText="Customer" Width="200"/>
        <dataGrid:GridNumericColumn MappingName="OrderAmount" HeaderText="Amount" Width="120"/>
        <dataGrid:GridDateColumn MappingName="OrderDate" HeaderText="Order Date" Width="130"/>
    </dataGrid:SfDataGrid.Columns>
    
</dataGrid:SfDataGrid>
```

### Inline XAML Definition

Define columns directly in the XAML page without binding:

```xaml
<dataGrid:SfDataGrid AutoGenerateColumns="False">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID" HeaderText="ID"/>
        <dataGrid:GridTextColumn MappingName="CustomerName" HeaderText="Customer Name"/>
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

Then set ItemsSource in code-behind:

```csharp
sfDataGrid.ItemsSource = orders;
```

### Code-Behind Column Definition

Define columns entirely in C#:

```csharp
public sealed partial class MainPage : Page
{
    public MainPage()
    {
        this.InitializeComponent();
        
        // Configure DataGrid
        sfDataGrid.AutoGenerateColumns = false;
        
        // Add columns programmatically
        sfDataGrid.Columns.Add(new GridTextColumn { MappingName = "OrderID", HeaderText = "ID", Width = 100 });
        sfDataGrid.Columns.Add(new GridTextColumn { MappingName = "CustomerName", HeaderText = "Customer", Width = 200 });
        sfDataGrid.Columns.Add(new GridNumericColumn { MappingName = "OrderAmount", HeaderText = "Amount", Width = 120 });
        sfDataGrid.Columns.Add(new GridDateColumn { MappingName = "OrderDate", HeaderText = "Date", Width = 130 });
        
        // Bind data
        sfDataGrid.ItemsSource = GetOrders();
    }
}
```

### Column Properties

Every column type supports these key properties:

```xaml
<dataGrid:GridTextColumn 
    MappingName="CustomerName"           <!-- Required: property name -->
    HeaderText="Customer Name"           <!-- Display header -->
    Width="200"                          <!-- Fixed width in pixels -->
    AllowSorting="True"                  <!-- Enable sorting on this column -->
    AllowFiltering="True"                <!-- Enable filtering (if enabled on grid) -->
    IsReadOnly="False"                   <!-- Allow/disallow editing -->
    TextAlignment="Left"                 <!-- Text alignment in cells -->
    HorizontalHeaderContentAlignment="Left" <!-- Header alignment -->
/>
```

### Setting Column Width

**Fixed Width:**
```xaml
<dataGrid:GridTextColumn MappingName="OrderID" Width="100"/>
```

**Automatic Width** (recommended):
```xaml
<dataGrid:GridTextColumn MappingName="CustomerName" Width="Auto"/>
```

**Star Width** (proportional):
```xaml
<dataGrid:GridTextColumn MappingName="Description" Width="*"/>
```

### Sorting Control

Enable/disable sorting at DataGrid level:

```xaml
<dataGrid:SfDataGrid AllowSorting="True">
    <!-- All columns can be sorted -->
</dataGrid:SfDataGrid>
```

Control per-column:

```xaml
<dataGrid:SfDataGrid AllowSorting="False">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID" AllowSorting="True"/>
        <dataGrid:GridTextColumn MappingName="InternalNotes" AllowSorting="False"/>
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

**Priority:** Column-level `AllowSorting` overrides DataGrid-level setting.

### Read-Only Columns

Make a column non-editable:

```xaml
<dataGrid:GridTextColumn MappingName="OrderID" IsReadOnly="True" HeaderText="ID"/>
```

Useful for:
- Identity/primary key columns
- Computed/read-only properties
- Display-only columns

---

## Column Manipulation

### Adding Columns at Runtime

```csharp
// Add to end
sfDataGrid.Columns.Add(new GridTextColumn 
{ 
    MappingName = "ShipAddress", 
    HeaderText = "Address" 
});

// Insert at specific position
sfDataGrid.Columns.Insert(0, new GridTextColumn 
{ 
    MappingName = "OrderID", 
    HeaderText = "ID" 
});
```

### Accessing Columns

```csharp
// By index
GridColumn column = sfDataGrid.Columns[1];

// By MappingName
GridColumn column = sfDataGrid.Columns["OrderID"];

// Check if exists
if (sfDataGrid.Columns.Contains("CustomerID"))
{
    var column = sfDataGrid.Columns["CustomerID"];
}
```

### Removing Columns

```csharp
// Remove all columns
sfDataGrid.Columns.Clear();

// Remove specific column
var column = sfDataGrid.Columns["OrderID"];
sfDataGrid.Columns.Remove(column);

// Remove by index
sfDataGrid.Columns.RemoveAt(0);

// Remove by MappingName
sfDataGrid.Columns.Remove(sfDataGrid.Columns["OrderID"]);
```

### Reordering Columns

```csharp
// Get the column
var orderIDColumn = sfDataGrid.Columns.FirstOrDefault(c => c.MappingName == "OrderID");

// Remove from current position
sfDataGrid.Columns.Remove(orderIDColumn);

// Insert at new position (index 0 = first)
sfDataGrid.Columns.Insert(0, orderIDColumn);
```

### Accessing Columns by Name

```csharp
// Access by MappingName via indexer
GridTextColumn customerColumn = sfDataGrid.Columns["CustomerName"] as GridTextColumn;

// Access by index
var firstColumn = sfDataGrid.Columns[0];

// Find with LINQ
var numericColumns = sfDataGrid.Columns.OfType<GridNumericColumn>();
```

### Modifying Column Properties

```csharp
// Update column header
sfDataGrid.Columns["OrderID"].HeaderText = "Order Number";

// Change width
sfDataGrid.Columns["CustomerName"].Width = 300;

// Toggle sorting
sfDataGrid.Columns["OrderAmount"].AllowSorting = false;

// Make read-only
sfDataGrid.Columns["OrderID"].IsReadOnly = true;
```

---

## Column Collection Operations

### Checking Column Count

```csharp
int totalColumns = sfDataGrid.Columns.Count;

if (sfDataGrid.Columns.Count == 0)
{
    MessageBox.Show("No columns defined");
}
```

### Iterating Through Columns

```csharp
// Loop through all columns
foreach (var column in sfDataGrid.Columns)
{
    Debug.WriteLine($"Column: {column.MappingName}, Width: {column.Width}");
}

// Find specific columns
var textColumns = sfDataGrid.Columns.OfType<GridTextColumn>().ToList();
var numericColumns = sfDataGrid.Columns.OfType<GridNumericColumn>().ToList();
```

### Getting Visible vs Hidden Columns

```csharp
// All defined columns
var allColumns = sfDataGrid.Columns;

// Columns with Width > 0 are typically visible
var visibleColumns = sfDataGrid.Columns.Where(c => c.Width > 0).ToList();
```

### Conditional Column Definition

```csharp
sfDataGrid.AutoGenerateColumns = false;

// Add columns based on user role
if (user.IsAdmin)
{
    sfDataGrid.Columns.Add(new GridTextColumn { MappingName = "InternalID", HeaderText = "ID" });
}

sfDataGrid.Columns.Add(new GridTextColumn { MappingName = "CustomerName", HeaderText = "Customer" });
sfDataGrid.Columns.Add(new GridNumericColumn { MappingName = "OrderAmount", HeaderText = "Amount" });
```

## Column Width and Sizing

### Setting Fixed Width

```xml
<dataGrid:GridTextColumn MappingName="OrderID" Width="150" />
```

### Column Width Mode

Use `ColumnWidthMode` to control how column widths are calculated:

| Mode | Description |
|------|-------------|
| **None** | Uses defined Width or default width |
| **Star** | Divides available width equally |
| **Auto** | Fits header and cell content (no truncation) |
| **AutoWithLastColumnFill** | Auto width + last column gets remaining width |
| **AutoLastColumnFill** | Auto width + last column gets max(auto width, remaining width) |
| **SizeToCells** | Fits cell content only |
| **SizeToHeader** | Fits header content only |

**Grid-Level:**
```xml
<dataGrid:SfDataGrid ColumnWidthMode="Auto"
                     ItemsSource="{Binding Orders}" />
```

**Column-Level (takes priority):**
```xml
<dataGrid:GridTextColumn MappingName="OrderID" 
                         ColumnWidthMode="SizeToHeader" />
```

### Star Width Example

```xml
<dataGrid:SfDataGrid ColumnWidthMode="Star"
                     ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <!-- Each column gets equal width -->
        <dataGrid:GridTextColumn MappingName="OrderID" />
        <dataGrid:GridTextColumn MappingName="Customer" />
        <dataGrid:GridTextColumn MappingName="Country" />
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### Fill Remaining Width in Specific Column

```xml
<dataGrid:SfDataGrid ColumnWidthMode="Auto"
                     ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID" />
        <dataGrid:GridTextColumn MappingName="Customer" 
                                 ColumnWidthMode="AutoLastColumnFill" />
        <dataGrid:GridTextColumn MappingName="Country" />
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### Min/Max Width

```xml
<dataGrid:GridTextColumn MappingName="CustomerName"
                         MinWidth="100"
                         MaxWidth="400"
                         ColumnWidthMode="Auto" />
```

## Auto-Sizing Columns

### Auto-Fit Based on Visible Rows

Improve performance by calculating column width only for visible rows:

```xml
<dataGrid:SfDataGrid ColumnWidthMode="Auto"
                     AutoFitRange="VisibleRows"
                     ItemsSource="{Binding Orders}" />
```

**AutoFitRange Options:**
- **AllRows** (default) - Calculate width for all rows
- **VisibleRows** - Calculate width only for visible rows (better performance)

### Refresh Auto-Size at Runtime

```csharp
// Refresh all columns
sfDataGrid.ColumnSizer.ResetAutoCalculationforAllColumns();
sfDataGrid.ColumnSizer.Refresh();

// Refresh specific column
var column = sfDataGrid.Columns["OrderID"];
sfDataGrid.ColumnSizer.ResetAutoCalculation(column);
sfDataGrid.ColumnSizer.Refresh();
```

### Reset Column Width for Auto-Sizing

```csharp
// Reset all column widths to allow auto-sizing
foreach (var column in sfDataGrid.Columns)
{
    if (!double.IsNaN(column.Width))
        column.Width = double.NaN;
}
sfDataGrid.ColumnSizer.Refresh();
```

### Customize Auto-Sizing Logic

```csharp
sfDataGrid.ColumnSizer = new CustomColumnSizer(sfDataGrid);

public class CustomColumnSizer : DataGridColumnSizer
{
    public CustomColumnSizer(SfDataGrid dataGrid) : base(dataGrid) { }
    
    protected override double CalculateCellWidth(GridColumn column, bool setWidth = true)
    {
        // Custom width calculation for GridComboBoxColumn
        if (column is GridComboBoxColumn comboColumn)
        {
            var source = comboColumn.ItemsSource;
            string maxText = string.Empty;
            
            foreach (var item in source)
            {
                string text = item.ToString();
                if (maxText.Length < text.Length)
                    maxText = text;
            }
            
            var size = MeasureText(new Size(column.Width, DataGrid.RowHeight), 
                                  maxText, column, null, GridQueryBounds.Width);
            return size.Width;
        }
        
        return base.CalculateCellWidth(column, setWidth);
    }
    
    protected override double CalculateHeaderWidth(GridColumn column, bool setWidth = true)
    {
        // Custom header width calculation
        return base.CalculateHeaderWidth(column, setWidth);
    }
}
```

### Font Settings for Auto-Sizing

**Grid-Level Font Settings:**
```csharp
sfDataGrid.ColumnSizer.FontSize = 12.0;
sfDataGrid.ColumnSizer.FontFamily = new FontFamily("Segoe UI");
sfDataGrid.ColumnSizer.Margin = new Thickness(9, 3, 1, 3);
sfDataGrid.ColumnSizer.SortIconWidth = 20;
sfDataGrid.ColumnSizer.FilterIconWidth = 20;
```

**Column-Level Font Settings:**
```csharp
var column = sfDataGrid.Columns["OrderID"];
DataGridColumnSizer.SetFontFamily(column, new FontFamily("Arial"));
DataGridColumnSizer.SetFontSize(column, 11.0);
DataGridColumnSizer.SetMargin(column, new Thickness(8, 2, 2, 2));
```

## Resizing Columns

Enable column resizing by dragging column header borders:

```xml
<dataGrid:SfDataGrid AllowResizingColumns="True"
                     ItemsSource="{Binding Orders}" />
```

### Disable Resizing for Specific Column

```xml
<dataGrid:GridTextColumn MappingName="OrderID" 
                         AllowResizing="False" />
```

### Hidden Column Resizing

Show and allow resizing of hidden columns:

```xml
<dataGrid:SfDataGrid AllowResizingHiddenColumns="True"
                     ItemsSource="{Binding Orders}" />
```

### ResizingColumns Event

```csharp
sfDataGrid.ResizingColumns += SfDataGrid_ResizingColumns;

private void SfDataGrid_ResizingColumns(object sender, ResizingColumnsEventArgs e)
{
    // Cancel resizing for specific column
    if (e.ColumnIndex == 0)
    {
        e.Cancel = true;
        return;
    }
    
    // Detect when resizing completes
    if (e.Reason == ColumnResizingReason.Resized)
    {
        var finalWidth = e.Width;
        Debug.WriteLine($"Column resized to {finalWidth}");
    }
}
```

## Drag and Drop Columns

Enable column reordering via drag-and-drop:

```xml
<dataGrid:SfDataGrid AllowDraggingColumns="True"
                     ItemsSource="{Binding Orders}" />
```

### Disable Dragging for Specific Column

```xml
<dataGrid:GridTextColumn MappingName="OrderID" 
                         AllowDragging="False" />
```

### ColumnDragging Event

```csharp
sfDataGrid.ColumnDragging += SfDataGrid_ColumnDragging;

private void SfDataGrid_ColumnDragging(object sender, QueryColumnDraggingEventArgs e)
{
    // e.From = source column index
    // e.To = target column index
    // e.Reason = QueryColumnDraggingReason (Dropping, DragStart, etc.)
    
    // Cancel dragging specific column
    if (sfDataGrid.Columns[e.From].MappingName == "OrderID" && 
        e.Reason == QueryColumnDraggingReason.Dropping)
    {
        e.Cancel = true;
    }
}
```

### Prevent Drag Between Frozen and Non-Frozen

```csharp
private void SfDataGrid_ColumnDragging(object sender, QueryColumnDraggingEventArgs e)
{
    if (e.Reason == QueryColumnDraggingReason.Dropping)
    {
        var frozenIndex = sfDataGrid.FrozenColumnsCount + 
                         sfDataGrid.ResolveToStartColumnIndex();
        
        // Prevent dragging from frozen to non-frozen
        if (e.From < frozenIndex && e.To >= frozenIndex)
            e.Cancel = true;
        
        // Prevent dragging from non-frozen to frozen
        if (e.From >= frozenIndex && e.To < frozenIndex)
            e.Cancel = true;
    }
}
```

### Custom Drag-Drop Controller

```csharp
sfDataGrid.ColumnDragDropController = new CustomDragDropController(sfDataGrid);

public class CustomDragDropController : DataGridColumnDragDropController
{
    public CustomDragDropController(SfDataGrid dataGrid) : base(dataGrid) { }
    
    protected override void PopupContentDroppedOnHeaderRow(int oldIndex, int newIndex)
    {
        // Custom drop logic
        base.PopupContentDroppedOnHeaderRow(oldIndex, newIndex);
    }
    
    protected override UIElement CreatePopupContent(GridColumn column)
    {
        // Custom popup appearance
        return base.CreatePopupContent(column);
    }
}
```

## Freezing Columns

Freeze columns at left or right side (like Excel):

```xml
<!-- Freeze first 2 columns from left -->
<dataGrid:SfDataGrid FrozenColumnsCount="2"
                     ItemsSource="{Binding Orders}" />

<!-- Freeze last 1 column from right -->
<dataGrid:SfDataGrid FrozenFooterColumnsCount="1"
                     ItemsSource="{Binding Orders}" />

<!-- Freeze both sides -->
<dataGrid:SfDataGrid FrozenColumnsCount="2"
                     FrozenFooterColumnsCount="1"
                     ItemsSource="{Binding Orders}" />
```

**Important:** Frozen column count must be less than the number of visible columns.

---

## Binding Column Properties

Bind column properties to ViewModel for MVVM:

```csharp
public class ViewModel : INotifyPropertyChanged
{
    private bool allowFiltering = true;
    
    public bool AllowFiltering
    {
        get => allowFiltering;
        set
        {
            allowFiltering = value;
            OnPropertyChanged(nameof(AllowFiltering));
        }
    }
}
```

```xml
<Page.Resources>
    <local:ViewModel x:Key="viewModel" />
</Page.Resources>

<dataGrid:SfDataGrid ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID"
                                 AllowFiltering="{Binding AllowFiltering, 
                                                 Source={StaticResource viewModel}}"
                                 AllowSorting="{Binding AllowSorting,
                                               Source={StaticResource viewModel}}" />
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

---

## Best Practices

### 1. Choose Auto-Generated vs Manual
- **Auto-generated:** Quick prototyping, simple displays, when property order doesn't matter
- **Manual:** Production applications, specific ordering needs, hiding internal properties

### 2. Use Meaningful HeaderText
```xaml
<!-- ❌ Poor: Property name used -->
<dataGrid:GridTextColumn MappingName="Cust_Name" HeaderText="Cust_Name"/>

<!-- ✅ Good: User-friendly header -->
<dataGrid:GridTextColumn MappingName="Cust_Name" HeaderText="Customer Name"/>
```

### 3. Set Appropriate Column Widths
```xaml
<!-- ❌ Too small - text truncated -->
<dataGrid:GridTextColumn MappingName="CustomerName" Width="50"/>

<!-- ✅ Appropriate width -->
<dataGrid:GridTextColumn MappingName="CustomerName" Width="200"/>

<!-- ✅ Or use Auto -->
<dataGrid:GridTextColumn MappingName="CustomerName" Width="Auto"/>
```

### 4. Use Correct Column Types
```xaml
<!-- ❌ Wrong type - looks like text -->
<dataGrid:GridTextColumn MappingName="OrderAmount" HeaderText="Amount"/>

<!-- ✅ Correct type with formatting -->
<dataGrid:GridNumericColumn MappingName="OrderAmount" HeaderText="Amount" NumberDecimalDigits="2"/>
```

### 5. Hide Sensitive/Internal Columns
```xaml
<!-- Hide internal columns -->
<dataGrid:SfDataGrid AutoGenerateColumns="False">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID"/>
        <dataGrid:GridTextColumn MappingName="CustomerName"/>
        <!-- InternalSensitiveData property not included -->
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### 6. Performance: Use Manual Columns for Large Models
```csharp
// ❌ Inefficient: Auto-generates columns for all 50 properties
sfDataGrid.AutoGenerateColumns = true;

// ✅ Efficient: Define only needed columns
sfDataGrid.AutoGenerateColumns = false;
sfDataGrid.Columns.Add(new GridTextColumn { MappingName = "ID" });
sfDataGrid.Columns.Add(new GridTextColumn { MappingName = "Name" });
```

### 7. Maintain Logical Column Order
Arrange columns in a logical sequence for users:

```xaml
<!-- Good order: ID → Name → Contact → Amount → Date -->
<dataGrid:SfDataGrid.Columns>
    <dataGrid:GridTextColumn MappingName="OrderID"/>
    <dataGrid:GridTextColumn MappingName="CustomerName"/>
    <dataGrid:GridTextColumn MappingName="Email"/>
    <dataGrid:GridNumericColumn MappingName="OrderAmount"/>
    <dataGrid:GridDateColumn MappingName="OrderDate"/>
</dataGrid:SfDataGrid.Columns>
```

---

## Common Scenarios

### Scenario 1: Read-Only Grid with Custom Widths

```xml
<dataGrid:SfDataGrid AutoGenerateColumns="False"
                     AllowEditing="False"
                     ColumnWidthMode="None"
                     ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID" Width="100" />
        <dataGrid:GridTextColumn MappingName="Customer" Width="200" />
        <dataGrid:GridNumericColumn MappingName="Total" Width="150" />
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### Scenario 2: Editable Grid with Auto-Sizing

```xml
<dataGrid:SfDataGrid AutoGenerateColumns="False"
                     AllowEditing="True"
                     ColumnWidthMode="Auto"
                     ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID" AllowEditing="False" />
        <dataGrid:GridTextColumn MappingName="Customer" />
        <dataGrid:GridNumericColumn MappingName="Quantity" />
        <dataGrid:GridDateColumn MappingName="OrderDate" />
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### Scenario 3: Freeze Important Columns with Resizing

```xml
<dataGrid:SfDataGrid FrozenColumnsCount="2"
                     AllowResizingColumns="True"
                     AllowDraggingColumns="True"
                     ItemsSource="{Binding Orders}" />
```

### Scenario 4: Responsive Column Layout

```xml
<dataGrid:SfDataGrid ColumnWidthMode="Star"
                     ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <!-- Equal distribution -->
        <dataGrid:GridTextColumn MappingName="OrderID" />
        <dataGrid:GridTextColumn MappingName="Customer" />
        <dataGrid:GridTextColumn MappingName="Country" />
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

### Scenario 5: Multi-Type Column Selection Example

```xaml
<dataGrid:SfDataGrid AutoGenerateColumns="False" ItemsSource="{Binding Employees}">
    <dataGrid:SfDataGrid.Columns>
        <!-- Employee ID (text, read-only) -->
        <dataGrid:GridTextColumn MappingName="EmployeeID" HeaderText="ID" IsReadOnly="True" Width="80"/>
        
        <!-- Name (text) -->
        <dataGrid:GridTextColumn MappingName="FullName" HeaderText="Full Name" Width="180"/>
        
        <!-- Salary (numeric, currency) -->
        <dataGrid:GridNumericColumn MappingName="Salary" HeaderText="Salary" NumberFormat="C" NumberDecimalDigits="2" Width="120"/>
        
        <!-- Join Date (date) -->
        <dataGrid:GridDateColumn MappingName="JoinDate" HeaderText="Joined" DisplayDateFormat="MM/dd/yyyy" Width="120"/>
        
        <!-- Department (dropdown) -->
        <dataGrid:GridComboBoxColumn MappingName="DepartmentID" HeaderText="Department" ItemsSource="{Binding Departments}" DisplayMemberPath="Name" Width="130"/>
        
        <!-- Is Manager (checkbox) -->
        <dataGrid:GridCheckBoxColumn MappingName="IsManager" HeaderText="Manager" Width="80"/>
        
        <!-- Profile Photo (image) -->
        <dataGrid:GridImageColumn MappingName="PhotoPath" HeaderText="Photo" Width="100" Height="80"/>
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

---

## Summary

Columns are the foundation of DataGrid functionality. Choose the right approach (auto-generated vs manual) based on your use case, always use appropriate column types for your data, and organize columns logically for the best user experience.
