# Columns in WinUI TreeGrid

## Table of Contents
- [Column Types Overview](#column-types-overview)
- [Automatically Generating Columns](#automatically-generating-columns)
- [Manually Defining Columns](#manually-defining-columns)
- [Column Type Descriptions](#column-type-descriptions)
- [AutoGeneratingColumn Event](#autogeneratingcolumn-event)

## Column Types Overview

SfTreeGrid provides 8 built-in column types to handle different data types. Columns are added via the `SfTreeGrid.Columns` property.

| Column Type | Data Type | Description |
|------------|-----------|-------------|
| **TreeGridTextColumn** | string, object | Displays textual content |
| **TreeGridNumericColumn** | double, int, decimal | Displays numeric values with SfNumberBox editor |
| **TreeGridDateColumn** | DateTimeOffset | Displays dates with SfCalendarDatePicker editor |
| **TreeGridTimeColumn** | DateTimeOffset | Displays time values with SfTimePicker editor |
| **TreeGridCheckBoxColumn** | bool | Displays boolean values with CheckBox |
| **TreeGridComboBoxColumn** | IEnumerable | Displays dropdown selections with ComboBox |
| **TreeGridHyperlinkColumn** | Uri | Displays clickable hyperlinks |
| **TreeGridTemplateColumn** | Any | Displays custom template content |

## Automatically Generating Columns

### Enable/Disable Auto-Generation

Set `AutoGenerateColumns` property to control automatic column creation:

```xaml
<!-- Auto-generate columns (default) -->
<treeGrid:SfTreeGrid AutoGenerateColumns="True"
                    ItemsSource="{Binding Employees}" />

<!-- Define columns manually -->
<treeGrid:SfTreeGrid AutoGenerateColumns="False"
                    ItemsSource="{Binding Employees}">
    <treeGrid:SfTreeGrid.Columns>
        <!-- Manual column definitions -->
    </treeGrid:SfTreeGrid.Columns>
</treeGrid:SfTreeGrid>
```

```csharp
sfTreeGrid.AutoGenerateColumns = true;  // Default
sfTreeGrid.AutoGenerateColumns = false; // Manual control
```

### Auto-Generation Rules

When `AutoGenerateColumns = True`, columns are created based on property types:

| Property Type | Generated Column |
|--------------|------------------|
| string, object, dynamic | TreeGridTextColumn |
| double, double?, int, decimal | TreeGridNumericColumn |
| DateTimeOffset, DateTimeOffset? | TreeGridDateColumn |
| Uri, Uri? | TreeGridHyperlinkColumn |
| bool, bool? | TreeGridCheckBoxColumn |
| All other types | TreeGridTextColumn |

**Column Order:** Matches property order in the data class.

### AutoGenerateColumnsMode

Control behavior when `ItemsSource` changes:

```csharp
sfTreeGrid.AutoGenerateColumnsMode = AutoGenerateColumnsMode.Reset;
```

| Mode | Behavior | On ItemsSource Change |
|------|----------|----------------------|
| **Reset** | Generate columns from data properties | Keeps manual columns, clears auto-generated, creates new |
| **RetainOld** | Generate columns from data properties | Maintains existing columns and their settings (sorting, filtering) |
| **ResetAll** | Generate only auto columns | Clears all columns (manual + auto), regenerates |
| **None** | No column generation | No changes |

**When to use:**
- **Reset** (default): Standard scenarios where columns should refresh
- **RetainOld**: Preserve user settings across data source changes
- **ResetAll**: Complete refresh needed
- **None**: Full manual control

## Manually Defining Columns

Define columns explicitly when `AutoGenerateColumns = False`:

```xaml
<treeGrid:SfTreeGrid AutoGenerateColumns="False"
                    ChildPropertyName="ReportsTo"
                    ItemsSource="{Binding Employees}"
                    ParentPropertyName="ID"
                    SelfRelationRootValue="-1">
    <treeGrid:SfTreeGrid.Columns>
        <treeGrid:TreeGridTextColumn HeaderText="First Name" 
                                     MappingName="FirstName" />
        <treeGrid:TreeGridTextColumn HeaderText="Last Name" 
                                     MappingName="LastName" />
        <treeGrid:TreeGridNumericColumn HeaderText="Employee ID" 
                                        MappingName="ID" />
        <treeGrid:TreeGridTextColumn HeaderText="Title" 
                                     MappingName="Title" />
        <treeGrid:TreeGridNumericColumn HeaderText="Salary" 
                                        MappingName="Salary" 
                                        DisplayNumberFormat="C2" />
        <treeGrid:TreeGridNumericColumn HeaderText="Reports To" 
                                        MappingName="ReportsTo" />
    </treeGrid:SfTreeGrid.Columns>
</treeGrid:SfTreeGrid>
```

```csharp
sfTreeGrid.AutoGenerateColumns = false;
sfTreeGrid.Columns.Add(new TreeGridTextColumn 
{ 
    MappingName = "FirstName", 
    HeaderText = "First Name" 
});
sfTreeGrid.Columns.Add(new TreeGridNumericColumn 
{ 
    MappingName = "Salary", 
    HeaderText = "Salary", 
    DisplayNumberFormat = "C2" 
});
```

## Column Type Descriptions

### TreeGridTextColumn

Displays string and general text data.

```xaml
<treeGrid:TreeGridTextColumn MappingName="FirstName" 
                            HeaderText="First Name"
                            Width="120" />
```

**Common Properties:**
- `MappingName` - Property to bind
- `HeaderText` - Column header display text
- `Width` - Column width
- `TextAlignment` - Text alignment (Left, Center, Right)
- `AllowEditing` - Enable/disable editing

### TreeGridNumericColumn

Displays numeric data with SfNumberBox editor for editing.

```xaml
<treeGrid:TreeGridNumericColumn MappingName="Salary"
                               HeaderText="Salary"
                               DisplayNumberFormat="C2"
                               NumberDecimalDigits="2"
                               MinValue="0"
                               MaxValue="10000000" />
```

**Key Properties:**
- `DisplayNumberFormat` - Number format (C2 for currency, N2 for number, P2 for percent)
- `NumberDecimalDigits` - Decimal places
- `MinValue` / `MaxValue` - Value constraints
- `UpDownPlacementMode` -  Placement of up/down buttons used to increment or decrement the numeric value.


### TreeGridDateColumn

Displays dates with SfCalendarDatePicker editor.

```xaml
<treeGrid:TreeGridDateColumn MappingName="HireDate"
                            HeaderText="Hire Date"
                            DisplayDateFormat="MM/dd/yyyy"
                            MinDate="2000-01-01"
                            MaxDate="2030-12-31" />
```

**Key Properties:**
- `DisplayDateFormat` - Date display format
- `MinDate` / `MaxDate` - Date range constraints

### TreeGridTimeColumn

Displays time values with SfTimePicker editor.

```xaml
<treeGrid:TreeGridTimeColumn MappingName="StartTime"
                            HeaderText="Start Time"
                            DisplayTimeFormat="HH:mm:ss"
                            ShowClearButton="True" />
```

**Key Properties:**
- `DisplayTimeFormat` - Time display format
- `MaxTime` / `MinTime` - Time constraints
- `ShowClearButton` - Enable clear button to reset time value (default: False)

**ShowClearButton Usage:**

The `ShowClearButton` property displays a clear button in the TimeColumn editor, allowing users to easily clear the time value:

```xaml
<!-- Enable clear button for time picker -->
<treeGrid:TreeGridTimeColumn MappingName="EndTime"
                            HeaderText="End Time"
                            ShowClearButton="True" />
```

```csharp
// Programmatically set ShowClearButton
var timeColumn = new TreeGridTimeColumn 
{ 
    MappingName = "StartTime",
    ShowClearButton = true
};
```

**When to use ShowClearButton:**
- When time values are optional and can be cleared
- For start/end time ranges where users might want to reset
- Improves UX by providing explicit clear action instead of manual deletion

### TreeGridCheckBoxColumn

Displays boolean values as checkboxes.

```xaml
<treeGrid:TreeGridCheckBoxColumn MappingName="IsActive"
                                HeaderText="Active"
                                Width="80" />
```

**Behavior:**
- Displays checked/unchecked based on boolean value
- Editable by clicking checkbox (if editing enabled)
- Centered by default

### TreeGridComboBoxColumn

Displays dropdown selection with ComboBox.

```xaml
<treeGrid:TreeGridComboBoxColumn MappingName="Department"
                                HeaderText="Department"
                                ItemsSource="{Binding Departments}"
                                DisplayMemberPath="Name"
                                SelectedValuePath="ID" />
```

**Key Properties:**
- `ItemsSource` - Collection of dropdown items
- `DisplayMemberPath` - Property to display in dropdown
- `SelectedValuePath` - Property value to bind
- `IsEditable` - Allow typing in ComboBox

### TreeGridHyperlinkColumn

Displays clickable URI links.

```xaml
<treeGrid:TreeGridHyperlinkColumn MappingName="Website"
                                 HeaderText="Website"
                                 Width="200" />
```

**Events:**
- `CurrentCellRequestNavigate` - Fired when link is clicked

```csharp
hyperlinkColumn.CurrentCellRequestNavigate += (sender, e) =>
{
    // Open URL in browser
    Process.Start(new ProcessStartInfo(e.Uri.ToString()) 
    { 
        UseShellExecute = true 
    });
};
```

### TreeGridTemplateColumn

Displays custom template content for full flexibility.

```xaml
<treeGrid:TreeGridTemplateColumn MappingName="EmployeePhoto" 
                                HeaderText="Photo">
    <treeGrid:TreeGridTemplateColumn.CellTemplate>
        <DataTemplate>
            <Image Source="{Binding PhotoUrl}" 
                   Width="50" 
                   Height="50" />
        </DataTemplate>
    </treeGrid:TreeGridTemplateColumn.CellTemplate>
    <treeGrid:TreeGridTemplateColumn.EditTemplate>
        <DataTemplate>
            <TextBox Text="{Binding PhotoUrl, Mode=TwoWay}" />
        </DataTemplate>
    </treeGrid:TreeGridTemplateColumn.EditTemplate>
</treeGrid:TreeGridTemplateColumn>
```

**Key Properties:**
- `CellTemplate` - Template for display mode
- `EditTemplate` - Template for edit mode

## AutoGeneratingColumn Event

Customize or cancel columns before they are added to TreeGrid.

```csharp
sfTreeGrid.AutoGeneratingColumn += (sender, e) =>
{
    // Customize column properties
    if (e.Column.MappingName == "Salary")
    {
        e.Column.HeaderText = "Annual Salary";
        (e.Column as TreeGridNumericColumn).DisplayNumberFormat = "C2";
    }
    
    // Hide specific columns
    if (e.Column.MappingName == "InternalID")
    {
        e.Cancel = true;  // Don't add this column
    }
    
    // Change column type
    if (e.Column.MappingName == "Status")
    {
        e.Column = new TreeGridComboBoxColumn
        {
            MappingName = "Status",
            HeaderText = "Status",
            ItemsSource = new List<string> { "Active", "Inactive", "Pending" }
        };
    }
};
```

**Event Properties:**
- `e.Column` - The auto-generated column (can be modified or replaced)
- `e.Cancel` - Set to `true` to skip adding the column

### Common Customization Scenarios

**Format numeric columns:**
```csharp
if (e.Column.MappingName == "Price" || e.Column.MappingName == "Cost")
{
    (e.Column as TreeGridNumericColumn).DisplayNumberFormat = "C2";
}
```

**Set column widths:**
```csharp
if (e.Column.MappingName == "Description")
{
    e.Column.Width = 300;
}
else
{
    e.Column.Width = 120;
}
```

**Apply text alignment:**
```csharp
if (e.Column is TreeGridNumericColumn)
{
    e.Column.TextAlignment = TextAlignment.Right;
}
```

**Hide sensitive columns:**
```csharp
if (e.Column.MappingName == "SSN" || e.Column.MappingName == "Password")
{
    e.Cancel = true;
}
```

## Common Patterns

### Mix Auto and Manual Columns

```xaml
<treeGrid:SfTreeGrid AutoGenerateColumns="True" 
                    ItemsSource="{Binding Employees}">
    <treeGrid:SfTreeGrid.Columns>
        <!-- These manual columns are added first -->
        <treeGrid:TreeGridTextColumn MappingName="FullName" 
                                     HeaderText="Name" />
        <!-- Auto-generated columns follow -->
    </treeGrid:SfTreeGrid.Columns>
</treeGrid:SfTreeGrid>
```

### Programmatically Add Columns

```csharp
// Clear existing columns
sfTreeGrid.Columns.Clear();

// Add columns programmatically
sfTreeGrid.Columns.Add(new TreeGridTextColumn 
{ 
    MappingName = "FirstName", 
    HeaderText = "First Name",
    Width = 150
});

sfTreeGrid.Columns.Add(new TreeGridNumericColumn 
{ 
    MappingName = "Age",
    HeaderText = "Age",
    MinValue = 0,
    MaxValue = 120
});
```

### Reorder Columns

```csharp
// Move column to new position
var column = sfTreeGrid.Columns[2];
sfTreeGrid.Columns.RemoveAt(2);
sfTreeGrid.Columns.Insert(0, column);
```

## Troubleshooting

**Columns not appearing:**
- Ensure `ItemsSource` is bound
- Check `MappingName` matches property name exactly (case-sensitive)
- Verify `AutoGenerateColumns` setting

**Wrong column type generated:**
- Use `AutoGeneratingColumn` event to change column type
- Or set `AutoGenerateColumns = False` and define manually

**Column header not showing:**
- Set `HeaderText` property explicitly
- Check if header row is visible

**Data not displaying in column:**
- Verify `MappingName` property exists in data object
- Check property has public getter
- Ensure data source is properly bound
