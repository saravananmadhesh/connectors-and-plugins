# Advanced Features in WinUI TreeGrid

## Table of Contents
- [Context Flyout Menus](#context-flyout-menus)
- [Tooltips](#tooltips)
- [MVVM Support](#mvvm-support)
- [Helper Methods](#helper-methods)
- [Performance Optimization](#performance-optimization)

## Context Flyout Menus

Display context menus on right-click for row/cell operations.

### Enable Context Menu

```xaml
<treeGrid:SfTreeGrid RightTapped="TreeGrid_RightTapped">
    <treeGrid:SfTreeGrid.Resources>
        <MenuFlyout x:Key="RowContextMenu">
            <MenuFlyoutItem Text="Edit" Click="EditRow_Click" />
            <MenuFlyoutItem Text="Delete" Click="DeleteRow_Click" />
            <MenuFlyoutSeparator />
            <MenuFlyoutItem Text="Copy" Click="CopyRow_Click" />
        </MenuFlyout>
    </treeGrid:SfTreeGrid.Resources>
</treeGrid:SfTreeGrid>
```

```csharp
private void TreeGrid_RightTapped(object sender, RightTappedRoutedEventArgs e)
{
    var position = e.GetPosition(sfTreeGrid);

    var elements = VisualTreeHelper.FindElementsInHostCoordinates(position, sfTreeGrid);

    foreach (var element in elements)
    {
        if (element is TreeGridRowControl rowControl)
        {
            var node = rowControl.DataContext as TreeNode;
            if (node != null)
            {
                sfTreeGrid.SelectedItem = node.Item;

                var menu = sfTreeGrid.Resources["RowContextMenu"] as MenuFlyout;
                menu?.ShowAt(sfTreeGrid, position);
                break;
            }
        }
    }
}
```

### Context Menu Actions

```csharp
private void EditRow_Click(object sender, RoutedEventArgs e)
{
    var employee = sfTreeGrid.SelectedItem as Employee;
    if (employee != null)
    {
        // Open edit dialog
        ShowEditDialog(employee);
    }
}

private async void DeleteRow_Click(object sender, RoutedEventArgs e)
{
    var employee = sfTreeGrid.SelectedItem as Employee;
    if (employee != null)
    {
        var result = await ShowConfirmDialog($"Delete {employee.FirstName}?");
        if (result == ContentDialogResult.Primary)
        {
            viewModel.Employees.Remove(employee);
        }
    }
}

private void CopyRow_Click(object sender, RoutedEventArgs e)
{
    sfTreeGrid.ClipboardController.Copy();
}
```

### Dynamic Context Menu

Show different menu items based on context:

```csharp
private void TreeGrid_RightTapped(object sender, RightTappedRoutedEventArgs e)
{
    var position = e.GetPosition(sfTreeGrid);

    var elements = VisualTreeHelper.FindElementsInHostCoordinates(position, sfTreeGrid);

    foreach (var element in elements)
    {
        if (element is TreeGridRowControl rowControl)
        {
            var node = rowControl.DataContext as TreeNode;
            var employee = node?.Item as Employee;

            if (employee != null)
            {
                // Select row
                sfTreeGrid.SelectedItem = employee;

                // Create dynamic menu
                var menu = new MenuFlyout();

                menu.Items.Add(new MenuFlyoutItem
                {
                    Text = "Edit",
                    Icon = new SymbolIcon(Symbol.Edit)
                });

                // Conditional menu
                if (employee.Status == "Active")
                {
                    menu.Items.Add(new MenuFlyoutItem
                    {
                        Text = "Deactivate",
                        Icon = new SymbolIcon(Symbol.Cancel)
                    });
                }
                else
                {
                    menu.Items.Add(new MenuFlyoutItem
                    {
                        Text = "Activate",
                        Icon = new SymbolIcon(Symbol.Accept)
                    });
                }

                menu.Items.Add(new MenuFlyoutSeparator());

                menu.Items.Add(new MenuFlyoutItem
                {
                    Text = "Delete",
                    Icon = new SymbolIcon(Symbol.Delete)
                });

                // Show menu
                menu.ShowAt(sfTreeGrid, position);

                break; 
            }
        }
    }
}
```
## Tooltips

Display tooltips on cell hover.

### Enable Cell Tooltips

```xaml
<treeGrid:SfTreeGrid ShowToolTip="True" 
                    ItemsSource="{Binding Employees}" />
```

```csharp
sfTreeGrid.ShowToolTip = true;
```

**Default behavior:** Shows cell content in tooltip on hover.

### Custom Tooltip Template

```xaml
<treeGrid:TreeGridTextColumn MappingName="FirstName"
                             ShowToolTip="True"
                             ToolTipTemplate="{StaticResource EmployeeToolTipTemplate}" />

<treeGrid:SfTreeGrid.Resources>
    <DataTemplate x:Key="EmployeeToolTipTemplate">
        <Border Background="LightYellow"
                BorderBrush="Gray"
                BorderThickness="1"
                Padding="8">
            <StackPanel>
                <TextBlock Text="{Binding FirstName}" FontWeight="Bold" />
                <TextBlock Text="{Binding Title}" FontSize="12" />
                <TextBlock Text="{Binding Salary, StringFormat='Salary: {0:C}'}" FontSize="12" />
            </StackPanel>
        </Border>
    </DataTemplate>
</treeGrid:SfTreeGrid.Resources>
```

### Conditional Tooltips

Show tooltips only for specific columns:

```csharp
sfTreeGrid.CellToolTipOpening += (sender, e) =>
{
    var employee = e.Record as Employee;
    if (employee == null) return;

    // Show tooltip only for long text
    if (e.Column.MappingName == "Description" && employee.Description.Length > 50)
    {
        e.ToolTip.Content = employee.Description;
    }

    // Custom tooltip for salary
    if (e.Column.MappingName == "Salary")
    {
        e.ToolTip.Content = $"Annual: {employee.Salary:C}\nMonthly: {employee.Salary / 12:C}";
    }
};
```

### Rich Tooltip Content

```csharp
sfTreeGrid.CellToolTipOpening += (sender, e) =>
{
    var employee = e.Record as Employee;
    if (employee == null) return;

    var tooltipContent = new StackPanel();

    tooltipContent.Children.Add(new TextBlock
    {
        Text = $"{employee.FirstName} {employee.LastName}",
        FontWeight = FontWeights.Bold,
        FontSize = 14
    });

    tooltipContent.Children.Add(new TextBlock
    {
        Text = employee.Title,
        Margin = new Thickness(0, 4, 0, 0)
    });

    tooltipContent.Children.Add(new TextBlock
    {
        Text = $"Department: {employee.Department}",
        Margin = new Thickness(0, 2, 0, 0)
    });

    e.ToolTip.Content = tooltipContent;
};
```

## MVVM Support

TreeGrid fully supports the MVVM pattern.

### ViewModel Implementation

```csharp
public class EmployeeViewModel : INotifyPropertyChanged
{
    private ObservableCollection<Employee> _employees;
    private Employee _selectedEmployee;
    private string _statusMessage;
    
    public ObservableCollection<Employee> Employees
    {
        get => _employees;
        set
        {
            _employees = value;
            OnPropertyChanged();
        }
    }
    
    public Employee SelectedEmployee
    {
        get => _selectedEmployee;
        set
        {
            _selectedEmployee = value;
            OnPropertyChanged();
            DeleteCommand?.RaiseCanExecuteChanged();
        }
    }
    
    public string StatusMessage
    {
        get => _statusMessage;
        set
        {
            _statusMessage = value;
            OnPropertyChanged();
        }
    }
    
    // Commands
    public ICommand AddEmployeeCommand { get; }
    public ICommand DeleteEmployeeCommand { get; }
    public ICommand RefreshCommand { get; }
    
    public EmployeeViewModel()
    {
        Employees = new ObservableCollection<Employee>();
        AddEmployeeCommand = new RelayCommand(AddEmployee);
        DeleteEmployeeCommand = new RelayCommand(DeleteEmployee, CanDeleteEmployee);
        RefreshCommand = new RelayCommand(RefreshData);
        
        LoadData();
    }
    
    private void AddEmployee()
    {
        var newEmployee = new Employee
        {
            ID = Employees.Count + 1,
            FirstName = "New",
            LastName = "Employee",
            Status = "Active"
        };
        Employees.Add(newEmployee);
        StatusMessage = "Employee added";
    }
    
    private void DeleteEmployee()
    {
        if (SelectedEmployee != null)
        {
            Employees.Remove(SelectedEmployee);
            StatusMessage = $"Deleted {SelectedEmployee.FirstName}";
            SelectedEmployee = null;
        }
    }
    
    private bool CanDeleteEmployee()
    {
        return SelectedEmployee != null;
    }
    
    private void RefreshData()
    {
        LoadData();
        StatusMessage = "Data refreshed";
    }
    
    private void LoadData()
    {
        // Load from database/service
        Employees = _employeeService.GetAllEmployees();
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged([CallerMemberName] string name = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
    }
}
```

### XAML Bindings

```xaml
<Page>
    <Page.DataContext>
        <local:EmployeeViewModel />
    </Page.DataContext>
    
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto" />
            <RowDefinition Height="*" />
            <RowDefinition Height="Auto" />
        </Grid.RowDefinitions>
        
        <!-- Toolbar -->
        <StackPanel Grid.Row="0" Orientation="Horizontal" Margin="10">
            <Button Content="Add" Command="{Binding AddEmployeeCommand}" />
            <Button Content="Delete" Command="{Binding DeleteEmployeeCommand}" 
                    Margin="5,0,0,0" />
            <Button Content="Refresh" Command="{Binding RefreshCommand}" 
                    Margin="5,0,0,0" />
        </StackPanel>
        
        <!-- TreeGrid -->
        <treeGrid:SfTreeGrid Grid.Row="1"
                            ItemsSource="{Binding Employees}"
                            SelectedItem="{Binding SelectedEmployee, Mode=TwoWay}"
                            ParentPropertyName="ID"
                            ChildPropertyName="ReportsTo"
                            SelfRelationRootValue="-1" />
        
        <!-- Status Bar -->
        <TextBlock Grid.Row="2" 
                  Text="{Binding StatusMessage}"
                  Margin="10"
                  FontSize="12" />
    </Grid>
</Page>
```

### LoadOnDemandCommand with MVVM

```csharp
public class EmployeeViewModel
{
    public ICommand LoadChildItemsCommand { get; }
    
    public EmployeeViewModel()
    {
        LoadChildItemsCommand = new RelayCommand<LoadOnDemandEventArgs>(LoadChildItems);
    }
    
    private void LoadChildItems(LoadOnDemandEventArgs args)
    {
        if (!args.HasChildNodes)
        {
            var parent = args.ParentItem as Employee;
            if (parent != null)
            {
                args.ChildItems = _employeeService.GetEmployeesByManager(parent.ID);
            }
        }
    }
}
```

## Helper Methods

### Get Node at Row Index

```csharp
var node = sfTreeGrid.GetNodeAtRowIndex(rowIndex);
var employee = node?.Item as Employee;
```

## Performance Optimization

### Virtualization

TreeGrid uses UI virtualization by default - cells are created only for visible rows.

**Benefits:**
- Fast rendering with large datasets
- Low memory footprint
- Smooth scrolling

### Defer Refresh

Batch multiple operations:

```csharp
using (sfTreeGrid.View.DeferRefresh(TreeViewRefreshMode.NodeRefresh))
{
    sfTreeGrid.SortColumnDescriptions.Add(...);
    sfTreeGrid.Columns["FirstName"].FilterPredicates.Add(...);  
    viewModel.Employees.Add(...);
}

// Single refresh after using block
```

### On-Demand Loading

For very large hierarchical data, use load-on-demand:

```csharp
sfTreeGrid.RequestTreeItems += (sender, e) =>
{
    // Load children only when node expands
    var parent = e.ParentItem as Employee;
    e.ChildItems = LoadChildEmployees(parent?.ID ?? -1);
};
```

### Disable Features When Not Needed

```csharp
// Disable if not using
sfTreeGrid.AllowEditing = false;
sfTreeGrid.AllowFiltering = false;
sfTreeGrid.AllowSorting = false;
sfTreeGrid.ShowCheckBox = false;
```

### Optimize Styling Events

### Async Data Loading

```csharp
private async void LoadDataAsync()
{
    ShowLoadingIndicator(true);
    
    try
    {
        var employees = await _employeeService.GetEmployeesAsync();
        sfTreeGrid.ItemsSource = employees;
    }
    finally
    {
        ShowLoadingIndicator(false);
    }
}
```

## Troubleshooting

**Context menu not appearing:**
- Verify `RightTapped` event is subscribed
- Check menu resource key is correct
- Ensure position calculation is accurate

**Tooltips not showing:**
- Set `ShowToolTip = True`
- Check `CellToolTipOpening` event doesn't return null
- Verify tooltip content is set

**MVVM bindings not updating:**
- Implement `INotifyPropertyChanged` in ViewModel
- Use `ObservableCollection<T>` for collections
- Ensure binding `Mode=TwoWay` for two-way properties

**Performance issues:**
- Use `DeferRefresh` for batch operations
- Implement on-demand loading for large datasets
- Cache objects in styling events
- Profile with large data to identify bottlenecks
