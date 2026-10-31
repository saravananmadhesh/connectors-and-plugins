# Column Configuration in WinUI TreeGrid

## Table of Contents
- [Column Sizing](#column-sizing)
- [Header Customization](#header-customization)
- [Column Visibility](#column-visibility)
- [Column Ordering](#column-ordering)
- [Frozen Columns](#frozen-columns)
- [Cell and Edit Templates](#cell-and-edit-templates)

## Column Sizing

### ColumnWidthMode

Control how columns calculate their widths using the `ColumnWidthMode` property:

```xaml
<treeGrid:SfTreeGrid ColumnWidthMode="Auto" 
                    ItemsSource="{Binding Employees}" />
```

| Mode | Description | Use When |
|------|-------------|----------|
| **None** | No sizing applied | Setting explicit widths per column |
| **Auto** | Fits column width to content and header | Content varies, need tight fit |
| **Star** | Divides available space proportionally | Equal or weighted distribution |
| **SizeToCells** | Fits to cell content only | Header shorter than content |
| **SizeToHeader** | Fits to header text only | Header longer than content |
| **AutoLastColumnFill** | Content header fill column | Remove empty space |
| **AutoWithLastColumnFill** | Content header default fill | Automatic fill layout |

**Example - Star sizing:**
```xaml
<treeGrid:SfTreeGrid ColumnWidthMode="Star">
    <treeGrid:SfTreeGrid.Columns>
        <treeGrid:TreeGridTextColumn MappingName="FirstName" 
                                     Width="2*" />  <!-- 2x weight -->
        <treeGrid:TreeGridTextColumn MappingName="LastName" 
                                     Width="2*" />
        <treeGrid:TreeGridNumericColumn MappingName="ID" 
                                        Width="*" />  <!-- 1x weight -->
    </treeGrid:SfTreeGrid.Columns>
</treeGrid:SfTreeGrid>
```

### Individual Column Width

Set explicit widths per column:

```xaml
<treeGrid:TreeGridTextColumn MappingName="FirstName" 
                            Width="150" />
<treeGrid:TreeGridTextColumn MappingName="Description" 
                            Width="300" />
```

```csharp
column.Width = 200;
column.MinWidth = 100;
column.MaxWidth = 400;
```

### Column Width Constraints

```csharp
column.MinWidth = 80;    // Minimum width
column.MaxWidth = 500;   // Maximum width
column.Width = 150;      // Initial/default width
```

### User Resizing

Control whether users can resize columns:

```xaml
<!-- Enable resizing for all columns -->
<treeGrid:SfTreeGrid AllowResizingColumns="True" />

<!-- Disable for specific column -->
<treeGrid:TreeGridTextColumn MappingName="ID" 
                            AllowResizing="False" />
```

```csharp
sfTreeGrid.AllowResizingColumns = true;
column.AllowResizing = false;
```

## Header Customization

### HeaderText

Set custom header text:

```xaml
<treeGrid:TreeGridTextColumn MappingName="FirstName" 
                            HeaderText="First Name" />
```

```csharp
column.HeaderText = "Employee Name";
```

### Header Template

Customize header appearance with templates:

```xaml
<treeGrid:TreeGridTextColumn MappingName="FirstName">
    <treeGrid:TreeGridTextColumn.HeaderTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <TextBlock Text="👤" Margin="0,0,5,0" />
                <TextBlock Text="Name" FontWeight="Bold" />
            </StackPanel>
        </DataTemplate>
    </treeGrid:TreeGridTextColumn.HeaderTemplate>
</treeGrid:TreeGridTextColumn>
```

### Header Style

Apply styles to headers:

```xaml
<treeGrid:TreeGridTextColumn MappingName="FirstName">
    <treeGrid:TreeGridTextColumn.HeaderStyle>
        <Style TargetType="treeGrid:TreeGridHeaderCell">
            <Setter Property="Background" Value="LightBlue" />
            <Setter Property="Foreground" Value="DarkBlue" />
            <Setter Property="FontWeight" Value="Bold" />
        </Style>
    </treeGrid:TreeGridTextColumn.HeaderStyle>
</treeGrid:TreeGridTextColumn>
```

### Hide Column Header

```csharp
sfTreeGrid.HeaderRowHeight = 0;  // Hide all headers
```

## MappingName Property

The `MappingName` binds a column to a data property.

### Simple Property Binding

```csharp
public class Employee
{
    public string FirstName { get; set; }
    public double Salary { get; set; }
}
```

```xaml
<treeGrid:TreeGridTextColumn MappingName="FirstName" />
<treeGrid:TreeGridNumericColumn MappingName="Salary" />
```

### Complex Property Binding

Bind to nested properties using dot notation:

```csharp
public class Employee
{
    public Address Location { get; set; }
}

public class Address
{
    public string City { get; set; }
    public string State { get; set; }
}
```

```xaml
<treeGrid:TreeGridTextColumn MappingName="Location.City" 
                            HeaderText="City" />
<treeGrid:TreeGridTextColumn MappingName="Location.State" 
                            HeaderText="State" />
```

### Indexer Property Binding

Bind to collection indexers:

```csharp
public class Employee
{
    public List<Address> Addresses { get; set; }
}
```

```xaml
<treeGrid:TreeGridTextColumn MappingName="Addresses[0].City" 
                            HeaderText="Primary City" />
```

## Column Visibility

### Show/Hide Columns

```csharp
column.IsHidden = true;   // Hide column
column.IsHidden = false;  // Show column
```

```xaml
<treeGrid:TreeGridTextColumn MappingName="InternalID" 
                            IsHidden="True" />
```

### Toggle Visibility at Runtime

```csharp
private void ToggleColumnVisibility()
{
    var column = sfTreeGrid.Columns["FirstName"];
    column.IsHidden = !column.IsHidden;
}
```

### Column Chooser

Allow users to show/hide columns (if implemented with UI):

```csharp
// Get list of columns for chooser UI
var columnNames = sfTreeGrid.Columns.Select(c => c.HeaderText).ToList();
```

## Column Ordering

### Set Column Index

```csharp
// Get column
var column = sfTreeGrid.Columns["Salary"];

// Move to new position
sfTreeGrid.Columns.Remove(column);
sfTreeGrid.Columns.Insert(0, column);  // Move to first position
```

### Allow User Reordering

```xaml
<treeGrid:SfTreeGrid AllowDraggingColumns="True" />
```

```csharp
sfTreeGrid.AllowDraggingColumns = true;
```

**Disable for specific column:**
```csharp
column.AllowDragging = false;
```

### ColumnDragging Events

```csharp
sfTreeGrid.ColumnDragging += (sender, e) =>
{
    // Before drag starts
    if (e.From == "ID")
        e.Cancel = true;  // Prevent ID column from moving
};

sfTreeGrid.ColumnDropping += (sender, e) =>
{
    // Before drop completes
    if (e.To == 0)
        e.Cancel = true;  // Prevent dropping at first position
};
```

## Frozen Columns

Lock columns to the left side so they remain visible during horizontal scrolling.

### Freeze Columns

```csharp
sfTreeGrid.FrozenColumnCount = 2;  // Freeze first 2 columns
```

```xaml
<treeGrid:SfTreeGrid FrozenColumnCount="2" 
                    ItemsSource="{Binding Employees}" />
```

### Use Cases

- **Navigation columns** - Keep ID or name visible
- **Action columns** - Keep edit/delete buttons accessible
- **Key identifiers** - Maintain context while scrolling

### Example with Frozen Columns

```xaml
<treeGrid:SfTreeGrid FrozenColumnCount="2">
    <treeGrid:SfTreeGrid.Columns>
        <!-- These 2 columns will be frozen -->
        <treeGrid:TreeGridNumericColumn MappingName="ID" 
                                        HeaderText="ID" 
                                        Width="80" />
        <treeGrid:TreeGridTextColumn MappingName="FirstName" 
                                     HeaderText="Name" 
                                     Width="150" />
        
        <!-- These columns will scroll -->
        <treeGrid:TreeGridTextColumn MappingName="Department" />
        <treeGrid:TreeGridNumericColumn MappingName="Salary" />
        <treeGrid:TreeGridTextColumn MappingName="Email" />
    </treeGrid:SfTreeGrid.Columns>
</treeGrid:SfTreeGrid>
```

## Cell and Edit Templates

### Cell Template

Customize cell display appearance:

```xaml
<treeGrid:TreeGridTemplateColumn MappingName="Priority" 
                                HeaderText="Priority">
    <treeGrid:TreeGridTemplateColumn.CellTemplate>
        <DataTemplate>
            <Border Background="{Binding Priority, Converter={StaticResource PriorityToBrushConverter}}"
                    CornerRadius="3"
                    Padding="5">
                <TextBlock Text="{Binding Priority}" 
                          Foreground="White" />
            </Border>
        </DataTemplate>
    </treeGrid:TreeGridTemplateColumn.CellTemplate>
</treeGrid:TreeGridTemplateColumn>
```

### Edit Template

Customize cell editing experience:

```xaml
<treeGrid:TreeGridTemplateColumn MappingName="Rating" 
                                HeaderText="Rating">
    <treeGrid:TreeGridTemplateColumn.CellTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Rating}" />
        </DataTemplate>
    </treeGrid:TreeGridTemplateColumn.CellTemplate>
    <treeGrid:TreeGridTemplateColumn.EditTemplate>
        <DataTemplate>
            <Slider Minimum="1" 
                   Maximum="5" 
                   Value="{Binding Rating, Mode=TwoWay}" 
                   StepFrequency="1" />
        </DataTemplate>
    </treeGrid:TreeGridTemplateColumn.EditTemplate>
</treeGrid:TreeGridTemplateColumn>
```

### Common Template Scenarios

**Image Display:**
```xaml
<treeGrid:TreeGridTemplateColumn MappingName="Photo">
    <treeGrid:TreeGridTemplateColumn.CellTemplate>
        <DataTemplate>
            <Image Source="{Binding PhotoUrl}" 
                   Width="40" 
                   Height="40" 
                   Stretch="UniformToFill" />
        </DataTemplate>
    </treeGrid:TreeGridTemplateColumn.CellTemplate>
</treeGrid:TreeGridTemplateColumn>
```

**Progress Bar:**
```xaml
<treeGrid:TreeGridTemplateColumn MappingName="Progress">
    <treeGrid:TreeGridTemplateColumn.CellTemplate>
        <DataTemplate>
            <ProgressBar Value="{Binding Progress}" 
                        Minimum="0" 
                        Maximum="100" />
        </DataTemplate>
    </treeGrid:TreeGridTemplateColumn.CellTemplate>
</treeGrid:TreeGridTemplateColumn>
```

**Button Actions:**
```xaml
<treeGrid:TreeGridTemplateColumn HeaderText="Actions">
    <treeGrid:TreeGridTemplateColumn.CellTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <Button Content="Edit" 
                       Command="{Binding EditCommand}" 
                       CommandParameter="{Binding}" />
                <Button Content="Delete" 
                       Command="{Binding DeleteCommand}" 
                       CommandParameter="{Binding}" 
                       Margin="5,0,0,0" />
            </StackPanel>
        </DataTemplate>
    </treeGrid:TreeGridTemplateColumn.CellTemplate>
</treeGrid:TreeGridTemplateColumn>
```

## Text Alignment

Align text within cells:

```xaml
<treeGrid:TreeGridNumericColumn MappingName="Salary" 
                               TextAlignment="Right" />
<treeGrid:TreeGridTextColumn MappingName="Description" 
                            TextAlignment="Left" />
```

```csharp
column.TextAlignment = TextAlignment.Left;   // Default for text
column.TextAlignment = TextAlignment.Right;  // Common for numbers
column.TextAlignment = TextAlignment.Center; // Center alignment
```

## Common Patterns

### Responsive Column Width

```csharp
sfTreeGrid.SizeChanged += (sender, e) =>
{
    var availableWidth = e.NewSize.Width;
    // Adjust column widths based on available space
};
```

### Conditional Column Display

```csharp
private void UpdateColumnVisibility(bool isDetailedView)
{
    sfTreeGrid.Columns["InternalNotes"].IsHidden = !isDetailedView;
    sfTreeGrid.Columns["CreatedDate"].IsHidden = !isDetailedView;
}
```

## Troubleshooting

**Column width not changing:**
- Check if `ColumnWidthMode` is overriding individual widths
- Ensure `MinWidth` and `MaxWidth` allow the desired width

**Header not displaying:**
- Set `HeaderText` property
- Check `HeaderRowHeight` is not 0

**Template not appearing:**
- Verify DataTemplate XAML syntax
- Check data binding paths in template
- Ensure template column type is `TreeGridTemplateColumn`

**Frozen columns not working:**
- Set `FrozenColumnCount` to positive number
- Ensure enough columns exist
- Check horizontal scrolling is enabled
