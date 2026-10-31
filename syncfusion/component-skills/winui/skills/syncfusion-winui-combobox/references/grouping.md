# Grouping in WinUI ComboBox

> **Note:** Ensure the `Syncfusion.Editors.WinUI` NuGet package is updated to the latest version for full grouping support.

This guide covers organizing ComboBox items into groups for better organization and navigation.

## Overview

The WinUI ComboBox supports grouping items by categories, making it easier to navigate large lists of organized data.

## Enable Grouping

Use `CollectionViewSource` with `IsSourceGrouped="True"` to enable grouping:

### Step 1: Create Model with Group Property

```csharp
// Model.cs
public class Vegetable
{
    public string Name { get; set; }
    public string Category { get; set; } // Group property
}
```

### Step 2: Create Grouped Collection in ViewModel

```csharp
// ViewModel.cs
using System.Collections.ObjectModel;
using System.Linq;

public class VegetablesViewModel
{
    public object Vegetables { get; set; }
    
    public VegetablesViewModel()
    {
        var vegetables = new ObservableCollection<Vegetable>
        {
            new Vegetable { Name = "Cabbage", Category = "Leafy and Salad" },
            new Vegetable { Name = "Spinach", Category = "Leafy and Salad" },
            new Vegetable { Name = "Pumpkins", Category = "Leafy and Salad" },
            
            new Vegetable { Name = "Chickpea", Category = "Beans" },
            new Vegetable { Name = "Green bean", Category = "Beans" },
            new Vegetable { Name = "Horse gram", Category = "Beans" },
            
            new Vegetable { Name = "Garlic", Category = "Bulb and Stem" },
            new Vegetable { Name = "Nopal", Category = "Bulb and Stem" },
            new Vegetable { Name = "Onion", Category = "Bulb and Stem" }
        };
        
        // Group by Category property
        this.Vegetables = vegetables.GroupBy(item => item.Category);
    }
}
```

### Step 3: Configure XAML with CollectionViewSource

```xaml
<Grid>
    <Grid.DataContext>
        <local:VegetablesViewModel />
    </Grid.DataContext>
    
    <Grid.Resources>
        <CollectionViewSource x:Name="VegetablesCollection"
                              Source="{Binding Vegetables}"
                              IsSourceGrouped="True" />
    </Grid.Resources>
    
    <editors:SfComboBox x:Name="comboBox"
                        Width="250"
                        IsEditable="True"
                        PlaceholderText="Select a vegetable"
                        TextMemberPath="Name"
                        DisplayMemberPath="Name"
                        ItemsSource="{x:Bind VegetablesCollection.View, Mode=OneWay}">
        <editors:SfComboBox.GroupStyle>
            <GroupStyle>
                <GroupStyle.HeaderTemplate>
                    <DataTemplate>
                        <Grid>
                            <TextBlock Text="{Binding Key}"
                                      FontWeight="SemiBold"
                                      FontSize="14"
                                      Foreground="DarkBlue"
                                      Margin="8,4" />
                        </Grid>
                    </DataTemplate>
                </GroupStyle.HeaderTemplate>
            </GroupStyle>
        </editors:SfComboBox.GroupStyle>
    </editors:SfComboBox>
</Grid>
```

## Customizing Group Headers

### Basic Group Header

```xaml
<editors:SfComboBox.GroupStyle>
    <GroupStyle>
        <GroupStyle.HeaderTemplate>
            <DataTemplate>
                <TextBlock Text="{Binding Key}" 
                          FontWeight="Bold" />
            </DataTemplate>
        </GroupStyle.HeaderTemplate>
    </GroupStyle>
</editors:SfComboBox.GroupStyle>
```

### Styled Group Header

```xaml
<editors:SfComboBox.GroupStyle>
    <GroupStyle>
        <GroupStyle.HeaderTemplate>
            <DataTemplate>
                <Grid Background="LightGray" Padding="8,4">
                    <Grid.ColumnDefinitions>
                        <ColumnDefinition Width="Auto" />
                        <ColumnDefinition Width="*" />
                    </Grid.ColumnDefinitions>
                    
                    <FontIcon Glyph="&#xE8FD;" 
                             FontSize="16"
                             Margin="0,0,8,0" />
                    
                    <TextBlock Grid.Column="1"
                              Text="{Binding Key}"
                              FontWeight="SemiBold"
                              FontSize="14"
                              Foreground="DarkBlue"
                              VerticalAlignment="Center" />
                </Grid>
            </DataTemplate>
        </GroupStyle.HeaderTemplate>
    </GroupStyle>
</editors:SfComboBox.GroupStyle>
```

### Group Header with Count

```xaml
<editors:SfComboBox.GroupStyle>
    <GroupStyle>
        <GroupStyle.HeaderTemplate>
            <DataTemplate>
                <StackPanel Orientation="Horizontal" Padding="8,4">
                    <TextBlock Text="{Binding Key}"
                              FontWeight="SemiBold"
                              FontSize="14" />
                    <TextBlock Text=" (" 
                              Foreground="Gray"
                              Margin="4,0,0,0" />
                    <TextBlock Text="{Binding ItemCount}"
                              Foreground="Gray" />
                    <TextBlock Text=")" 
                              Foreground="Gray" />
                </StackPanel>
            </DataTemplate>
        </GroupStyle.HeaderTemplate>
    </GroupStyle>
</editors:SfComboBox.GroupStyle>
```

## Complete Examples

### Example 1: Product Categories

**Model:**
```csharp
public class Product
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; }
}
```

**ViewModel:**
```csharp
public class ProductViewModel
{
    public object Products { get; set; }
    
    public ProductViewModel()
    {
        var products = new ObservableCollection<Product>
        {
            new Product { Name = "Laptop", Price = 999.99m, Category = "Electronics" },
            new Product { Name = "Mouse", Price = 29.99m, Category = "Electronics" },
            new Product { Name = "Desk", Price = 299.99m, Category = "Furniture" },
            new Product { Name = "Chair", Price = 199.99m, Category = "Furniture" },
            new Product { Name = "Pen", Price = 1.99m, Category = "Stationery" },
            new Product { Name = "Notebook", Price = 4.99m, Category = "Stationery" }
        };
        
        this.Products = products.GroupBy(p => p.Category);
    }
}
```

**XAML:**
```xaml
<Grid.Resources>
    <CollectionViewSource x:Name="ProductsCollection"
                          Source="{Binding Products}"
                          IsSourceGrouped="True" />
</Grid.Resources>

<editors:SfComboBox ItemsSource="{x:Bind ProductsCollection.View, Mode=OneWay}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name"
                    PlaceholderText="Select a product">
    <editors:SfComboBox.ItemTemplate>
        <DataTemplate>
            <StackPanel>
                <TextBlock Text="{Binding Name}" FontWeight="SemiBold" />
                <TextBlock Text="{Binding Price, StringFormat='${0:F2}'}" 
                          FontSize="12" 
                          Foreground="Gray" />
            </StackPanel>
        </DataTemplate>
    </editors:SfComboBox.ItemTemplate>
    
    <editors:SfComboBox.GroupStyle>
        <GroupStyle>
            <GroupStyle.HeaderTemplate>
                <DataTemplate>
                    <Border Background="#F0F0F0" 
                           Padding="12,6"
                           BorderBrush="#D0D0D0"
                           BorderThickness="0,1,0,1">
                        <TextBlock Text="{Binding Key}"
                                  FontWeight="Bold"
                                  FontSize="13"
                                  Foreground="#333333" />
                    </Border>
                </DataTemplate>
            </GroupStyle.HeaderTemplate>
        </GroupStyle>
    </editors:SfComboBox.GroupStyle>
</editors:SfComboBox>
```

### Example 2: Employee by Department

**Model:**
```csharp
public class Employee
{
    public string FullName { get; set; }
    public string Department { get; set; }
    public string Title { get; set; }
}
```

**ViewModel:**
```csharp
public class EmployeeViewModel
{
    public object Employees { get; set; }
    
    public EmployeeViewModel()
    {
        var employees = new ObservableCollection<Employee>
        {
            new Employee { FullName = "John Doe", Department = "Engineering", Title = "Developer" },
            new Employee { FullName = "Jane Smith", Department = "Engineering", Title = "Manager" },
            new Employee { FullName = "Bob Johnson", Department = "Sales", Title = "Representative" },
            new Employee { FullName = "Alice Williams", Department = "Sales", Title = "Director" },
            new Employee { FullName = "Charlie Brown", Department = "HR", Title = "Specialist" }
        };
        
        this.Employees = employees.GroupBy(e => e.Department);
    }
}
```

## Best Practices

### 1. Use Meaningful Group Names

```csharp
// ✅ DO: Clear, descriptive category names
vegetables.GroupBy(v => v.Category); // "Beans", "Leafy and Salad"

// ❌ DON'T: Cryptic codes without context
vegetables.GroupBy(v => v.CategoryCode); // "CAT01", "CAT02"
```

### 2. Sort Groups Logically

```csharp
// Sort groups alphabetically
this.Products = products
    .GroupBy(p => p.Category)
    .OrderBy(g => g.Key);

// Custom sort order
var categoryOrder = new[] { "Essential", "Recommended", "Optional" };
this.Products = products
    .GroupBy(p => p.Category)
    .OrderBy(g => Array.IndexOf(categoryOrder, g.Key));
```

### 3. Keep Group Headers Concise

```xaml
<!-- ✅ DO: Short, scannable headers -->
<TextBlock Text="{Binding Key}" FontWeight="SemiBold" />

<!-- ❌ DON'T: Verbose, cluttered headers -->
<TextBlock Text="{Binding Key, StringFormat='Category: {0} - Please select an item from this group'}" />
```

### 4. Use Visual Separation

```xaml
<GroupStyle.HeaderTemplate>
    <DataTemplate>
        <Border Background="LightGray"
               Padding="8,4"
               Margin="0,4,0,0">
            <TextBlock Text="{Binding Key}" FontWeight="SemiBold" />
        </Border>
    </DataTemplate>
</GroupStyle.HeaderTemplate>
```

### 5. Consider Performance with Many Groups

```csharp
// For 100+ groups, consider virtualization
// WinUI ComboBox handles this automatically for most scenarios

// For complex group headers, keep templates simple
// Avoid heavy computations in group header bindings
```

## Common Scenarios

### Scenario 1: Settings Grouped by Category

```csharp
var settings = new[]
{
    new Setting { Name = "Theme", Value = "Dark", Category = "Appearance" },
    new Setting { Name = "Font Size", Value = "12", Category = "Appearance" },
    new Setting { Name = "Language", Value = "English", Category = "General" },
    new Setting { Name = "Auto-save", Value = "On", Category = "General" }
};

this.Settings = settings.GroupBy(s => s.Category);
```

### Scenario 2: Countries Grouped by Continent

```csharp
var countries = GetCountries();
this.Countries = countries
    .GroupBy(c => c.Continent)
    .OrderBy(g => g.Key);
```

### Scenario 3: Files Grouped by Type

```csharp
var files = GetFiles();
this.Files = files
    .GroupBy(f => f.Extension.ToUpper())
    .OrderBy(g => g.Key);
```

## Summary

**Key Takeaways:**
- Use `CollectionViewSource` with `IsSourceGrouped="True"` for grouping
- Group data in ViewModel using LINQ `.GroupBy()`
- Customize group headers with `GroupStyle.HeaderTemplate`
- Access group name via `{Binding Key}`
- Access item count via `{Binding ItemCount}`
- Sort groups before displaying for better UX
- Keep group headers visually distinct but concise
