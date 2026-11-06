# Getting Started with WinUI DataGrid

Complete guide to data binding and initial setup for the Syncfusion WinUI DataGrid (SfDataGrid). This covers installation, basic configuration, and various data source binding options.

## Table of Contents
- [Installation](#installation)
- [Basic Setup](#basic-setup)
- [Data Binding Fundamentals](#data-binding-fundamentals)
- [Binding with IEnumerable](#binding-with-ienumerable)
- [Binding with ObservableCollection](#binding-with-observablecollection)
- [Binding Dynamic Data Objects](#binding-dynamic-data-objects)
- [Binding Complex Properties](#binding-complex-properties)
- [Binding Indexer Properties](#binding-indexer-properties)
- [Defining Source Data Type](#defining-source-data-type)
- [ItemsSource Events](#itemssource-events)
- [Working with View](#working-with-view)
- [Maintaining Scroll Position](#maintaining-scroll-position)
- [Common Issues](#common-issues)

## Installation

**NuGet Package Manager Console:**
```powershell
Install-Package Syncfusion.Grid.WinUI
```

**Package Reference (.csproj):**
```xml
<ItemGroup>
  <PackageReference Include="Syncfusion.Grid.WinUI" Version="24.1.41" />
</ItemGroup>
```

**Register License (App.xaml.cs):**
```csharp
public App()
{
    // Must be called before any Syncfusion component is instantiated
    Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    this.InitializeComponent();
}
```

## Basic Setup

### Add Namespace to XAML

```xml
<Page xmlns:dataGrid="using:Syncfusion.UI.Xaml.DataGrid">
```

### Create Data Model

```csharp
public class OrderInfo
{
    public int OrderID { get; set; }
    public string CustomerID { get; set; }
    public string CustomerName { get; set; }
    public string ShipCity { get; set; }
    public string Country { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal UnitPrice { get; set; }
}
```

### Add DataGrid to Page

```xml
<dataGrid:SfDataGrid x:Name="sfDataGrid"
                     AutoGenerateColumns="True"
                     ItemsSource="{Binding Orders}" />
```

## Data Binding Fundamentals

The DataGrid displays bounded data in tabular format by assigning data sources to the `ItemsSource` property.

**XAML Binding:**
```xml
<dataGrid:SfDataGrid x:Name="dataGrid"
                     AutoGenerateColumns="True"
                     ItemsSource="{Binding Orders}" />
```

**Code-Behind:**
```csharp
sfDataGrid.ItemsSource = ordersCollection;
```

### INotifyCollectionChanged Support

If the data source implements `INotifyCollectionChanged`, the DataGrid automatically refreshes the UI when:
- Items are added
- Items are removed
- The collection is cleared

**✅ Auto-Refresh (ObservableCollection):**
```csharp
public ObservableCollection<OrderInfo> Orders { get; set; }

// UI updates automatically
Orders.Add(new OrderInfo { OrderID = 1001 });
Orders.Remove(Orders[0]);
```

**❌ No Auto-Refresh (List<T>):**
```csharp
public List<OrderInfo> Orders { get; set; }

// UI does NOT update automatically
Orders.Add(new OrderInfo { OrderID = 1001 });
// Must manually refresh the DataGrid
```

## Binding with IEnumerable

The DataGrid supports any collection implementing `IEnumerable`. All data operations (sorting, grouping, filtering, summaries) work with IEnumerable collections.

```csharp
// Works with any IEnumerable
public IEnumerable<OrderInfo> Orders { get; set; }
public List<OrderInfo> OrderList { get; set; }
public ObservableCollection<OrderInfo> ObservableOrders { get; set; }
public OrderInfo[] OrderArray { get; set; }
```

```xml
<dataGrid:SfDataGrid ItemsSource="{Binding Orders}" 
                     AutoGenerateColumns="True" />
```

## Binding with ObservableCollection

**Recommended** for dynamic data that changes at runtime. Provides automatic UI updates.

```csharp
using System.Collections.ObjectModel;

public class OrderViewModel : INotifyPropertyChanged
{
    public ObservableCollection<OrderInfo> Orders { get; set; }
    
    public OrderViewModel()
    {
        Orders = new ObservableCollection<OrderInfo>
        {
            new OrderInfo { OrderID = 1001, CustomerName = "Maria Anders", Country = "Germany" },
            new OrderInfo { OrderID = 1002, CustomerName = "Ana Trujillo", Country = "Mexico" },
            new OrderInfo { OrderID = 1003, CustomerName = "Antonio Moreno", Country = "Mexico" }
        };
    }
    
    public void AddOrder()
    {
        // UI updates automatically
        Orders.Add(new OrderInfo { OrderID = 1004, CustomerName = "Thomas Hardy", Country = "UK" });
    }
    
    public void RemoveFirstOrder()
    {
        // UI updates automatically
        if (Orders.Count > 0)
            Orders.Remove(Orders[0]);
    }
}
```

## Binding Dynamic Data Objects

The DataGrid supports binding to dynamic data objects (ExpandoObject, DynamicObject).

```csharp
using System.Dynamic;

public ObservableCollection<dynamic> DynamicOrders { get; set; }

public void CreateDynamicData()
{
    DynamicOrders = new ObservableCollection<dynamic>();
    
    dynamic order1 = new ExpandoObject();
    order1.OrderID = 1001;
    order1.CustomerName = "Maria Anders";
    order1.Country = "Germany";
    DynamicOrders.Add(order1);
    
    dynamic order2 = new ExpandoObject();
    order2.OrderID = 1002;
    order2.CustomerName = "Ana Trujillo";
    order2.Country = "Mexico";
    DynamicOrders.Add(order2);
}
```

```xml
<dataGrid:SfDataGrid ItemsSource="{Binding DynamicOrders}"
                     AutoGenerateColumns="True" />
```

### Limitations with Dynamic Data

1. **LiveDataUpdateMode not supported:** `AllowDataShaping` and `AllowSummaryUpdate` modes don't work
2. **WinRT property change limitation:** UI doesn't refresh when property values change in WinRT

### Troubleshooting Dynamic Data

If data operations (sorting, filtering, grouping) don't work as expected with dynamic data:

```csharp
sfDataGrid.IsDynamicItemsSource = true;
```

## Binding Complex Properties

Bind nested object properties using dot notation in `MappingName`.

**Data Model with Complex Property:**
```csharp
public class OrderInfo
{
    public int OrderID { get; set; }
    public Customer Customer { get; set; }  // Complex property
    public string ShipCity { get; set; }
}

public class Customer
{
    public string CustomerID { get; set; }
    public string CustomerName { get; set; }
    public string Email { get; set; }
}
```

**XAML Binding:**
```xml
<dataGrid:SfDataGrid AutoGenerateColumns="False" 
                     ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="OrderID" HeaderText="Order ID" />
        <dataGrid:GridTextColumn MappingName="Customer.CustomerID" HeaderText="Customer ID" />
        <dataGrid:GridTextColumn MappingName="Customer.CustomerName" HeaderText="Customer Name" />
        <dataGrid:GridTextColumn MappingName="ShipCity" HeaderText="City" />
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

**Code-Behind:**
```csharp
sfDataGrid.Columns.Add(new GridTextColumn 
{ 
    MappingName = "Customer.CustomerID", 
    HeaderText = "Customer ID" 
});
```

### Troubleshooting Complex Properties

If data operations don't work as expected:

```csharp
sfDataGrid.Columns["Customer.CustomerID"].UseBindingValue = true;
```

### Limitations with Complex Properties

- **LiveDataUpdateMode not supported:** `AllowDataShaping` and `AllowSummaryUpdate` don't work

## Binding Indexer Properties

Bind to indexer properties using bracket notation.

**Data Model with Indexer:**
```csharp
public class Student
{
    public int RollNo { get; set; }
    public string Name { get; set; }
    
    private Dictionary<int, int> marks = new Dictionary<int, int>();
    
    // Indexer property
    public int this[int index]
    {
        get { return marks.ContainsKey(index) ? marks[index] : 0; }
        set { marks[index] = value; }
    }
}
```

**XAML Binding:**
```xml
<dataGrid:SfDataGrid x:Name="dataGrid" 
                     ItemsSource="{Binding Students}" 
                     AutoGenerateColumns="False">
    <dataGrid:SfDataGrid.Columns>
        <dataGrid:GridTextColumn MappingName="RollNo" HeaderText="Roll No" />
        <dataGrid:GridTextColumn MappingName="Name" HeaderText="Name" />
        <dataGrid:GridTextColumn MappingName="Marks[0]" HeaderText="Subject 1" />
        <dataGrid:GridTextColumn MappingName="Marks[1]" HeaderText="Subject 2" />
        <dataGrid:GridTextColumn MappingName="Marks[2]" HeaderText="Subject 3" />
    </dataGrid:SfDataGrid.Columns>
</dataGrid:SfDataGrid>
```

**Code-Behind:**
```csharp
this.dataGrid.Columns.Add(new GridTextColumn 
{ 
    MappingName = "Marks[0]", 
    HeaderText = "Subject 1" 
});
```

### Troubleshooting Indexer Properties

If data operations don't work:

```csharp
sfDataGrid.Columns["Marks[0]"].UseBindingValue = true;
```

### Limitations with Indexer Properties

- **LiveDataUpdateMode not supported:** `AllowDataShaping` and `AllowSummaryUpdate` don't work

## Defining Source Data Type

Specify the underlying data type explicitly using `SourceType` property. Useful when:
- ItemsSource contains objects of different derived types
- Want to auto-generate columns based on a specific type

```xml
<dataGrid:SfDataGrid x:Name="dataGrid" 
                     ItemsSource="{Binding Orders}" 
                     SourceType="local:OrderInfo" />
```

```csharp
dataGrid.SourceType = typeof(OrderInfo);
```

**Use Case:** When ItemsSource contains derived types but you want columns based on the base type.

## ItemsSource Events

### ItemsSourceChanged Event

Fires when the `ItemsSource` property is changed.

```csharp
sfDataGrid.ItemsSourceChanged += SfDataGrid_ItemsSourceChanged;

private void SfDataGrid_ItemsSourceChanged(object sender, GridItemsSourceChangedEventArgs e)
{
    var oldSource = e.OldItemsSource;
    var newSource = e.NewItemsSource;
    
    Debug.WriteLine($"ItemsSource changed from {oldSource} to {newSource}");
}
```

## Working with View

The DataGrid has a `View` property (type `ICollectionViewAdv`) that maintains and manipulates data operations like sorting, grouping, filtering, summaries.

### Key View Properties

| Property | Type | Description |
|----------|------|-------------|
| `Records` | `IRecordsList` | Records displayed when not grouped |
| `TopLevelGroup` | `TopLevelGroup` | Group information when grouped |
| `Filter` | `Predicate<object>` | Determines which data is displayed |
| `FilterPredicates` | `ObservableCollection` | Filter definitions from UI |
| `Groups` | `ReadOnlyObservableCollection` | Top-level group information |
| `GroupDescriptions` | `ObservableCollection` | How items are grouped |
| `SortDescriptions` | `SortDescriptionCollection` | How items are sorted |
| `SourceCollection` | `IEnumerable` | Underlying source collection |
| `TableSummaryRows` | `ObservableCollection` | Table summary rows |
| `SummaryRows` | `ObservableCollection` | Summary rows |
| `CaptionSummaryRow` | `ISummaryRow` | Caption summary row |

### View Events

**RecordPropertyChanged:**
```csharp
sfDataGrid.View.RecordPropertyChanged += (sender, e) =>
{
    var dataModel = sender;  // Changed data model
    var propertyName = e.PropertyName;  // Changed property name
    
    Debug.WriteLine($"{propertyName} changed in record");
};
```

**SourceCollectionChanged:**
```csharp
sfDataGrid.View.SourceCollectionChanged += (sender, e) =>
{
    Debug.WriteLine("Source collection modified");
};
```

### Defer Refresh for Batch Updates

Use `DeferRefresh` or `BeginInit/EndInit` to batch multiple data operations:

```csharp
// Method 1: DeferRefresh
using (sfDataGrid.View.DeferRefresh())
{
    sfDataGrid.View.SortDescriptions.Add(new SortDescription { ColumnName = "OrderID" });
    sfDataGrid.View.GroupDescriptions.Add(new GroupDescription { ColumnName = "Country" });
    sfDataGrid.View.Filter = FilterPredicate;
}
// View updates once when DeferRefresh is disposed

// Method 2: BeginInit/EndInit
sfDataGrid.View.BeginInit();
sfDataGrid.View.SortDescriptions.Add(new SortDescription { ColumnName = "OrderID" });
sfDataGrid.View.GroupDescriptions.Add(new GroupDescription { ColumnName = "Country" });
sfDataGrid.View.EndInit();
// View updates when EndInit is called
```

## Maintaining Scroll Position

By default, scrollbar position resets when ItemsSource changes. Maintain scroll position:

```xml
<dataGrid:SfDataGrid x:Name="dataGrid"
                     CanMaintainScrollPosition="True"
                     ItemsSource="{Binding Orders}" />
```

```csharp
dataGrid.CanMaintainScrollPosition = true;
```

## Common Issues

### Data Not Displaying

**Problem:** Grid is empty even though ItemsSource is set.

**Solutions:**
1. Verify `ItemsSource` is not null
2. Check `DataContext` is properly set
3. Ensure properties have public getters
4. Try setting `AutoGenerateColumns="True"`
5. Check for binding errors in Output window

### UI Not Updating When Data Changes

**Problem:** Adding/removing items doesn't update the grid.

**Solution:** Use `ObservableCollection<T>` instead of `List<T>`:

```csharp
// ❌ Won't auto-update
public List<OrderInfo> Orders { get; set; }

// ✅ Auto-updates
public ObservableCollection<OrderInfo> Orders { get; set; }
```

### Complex Property Sorting Not Working

**Problem:** Sorting on complex properties (e.g., `Customer.CustomerID`) doesn't work.

**Solution:**
```csharp
sfDataGrid.Columns["Customer.CustomerID"].UseBindingValue = true;
```

### Dynamic Data Operations Not Working

**Problem:** Sorting, filtering, grouping don't work with dynamic objects.

**Solution:**
```csharp
sfDataGrid.IsDynamicItemsSource = true;
```

### License Error on Startup

**Problem:** "License key not registered" error when running application.

**Solution:** Register license in App constructor before `InitializeComponent()`:
```csharp
public App()
{
    Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    this.InitializeComponent();
}
```

## Best Practices

1. **Use ObservableCollection** for dynamic data that changes at runtime
2. **Set AutoGenerateColumns="False"** and define columns manually for better control
3. **Use View.DeferRefresh()** when performing multiple data operations
4. **Dispose the DataGrid** in Page.Unloaded event for proper cleanup
5. **Implement INotifyPropertyChanged** in data models for property-level updates
6. **Use CanMaintainScrollPosition** when frequently changing ItemsSource
7. **Set SourceType** when working with derived types or interfaces
