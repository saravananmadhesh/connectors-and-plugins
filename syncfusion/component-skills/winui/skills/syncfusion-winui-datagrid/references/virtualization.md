# Data Virtualization in WinUI DataGrid

Guide to handling large datasets efficiently using UI and data virtualization in Syncfusion WinUI DataGrid.

## UI Virtualization

**Enabled by default** - Only visible rows are rendered.

UI virtualization creates and recycles row elements as you scroll, dramatically improving performance with large datasets.

**Features:**
- Renders only visible rows (~20-30 rows)
- Recycles row elements during scrolling
- Handles 100,000+ rows efficiently
- No configuration needed (automatic)

## Data Virtualization

For extremely large datasets (millions of rows), use data virtualization to load data on-demand.

### Requirements

1. Data source must implement `IList` and support indexer access
2. Use `VirtualizingCollectionView` or custom implementation
3. Set up incremental loading

### Implementation

```csharp
public class VirtualDataSource : IList, INotifyCollectionChanged
{
    private List<OrderInfo> _cache = new List<OrderInfo>();
    private int _totalRecords = 1000000; // Total record count
    
    public object this[int index]
    {
        get
        {
            // Load data on demand
            if (!_cache.Any(x => x.OrderID == index))
            {
                _cache.Add(LoadRecord(index));
            }
            return _cache.First(x => x.OrderID == index);
        }
        set { /* Implementation */ }
    }
    
    public int Count => _totalRecords;
    
    private OrderInfo LoadRecord(int index)
    {
        // Load from database or service
        return new OrderInfo
        {
            OrderID = index,
            CustomerName = $"Customer {index}",
            // ... other properties
        };
    }
    
    // Implement other IList members...
}
```

```csharp
// Use virtual data source
sfDataGrid.ItemsSource = new VirtualDataSource();
```

## Performance Tips

### Large Datasets (10K - 100K rows)

1. **Use UI Virtualization** (enabled by default)
2. **Disable unnecessary features:**
   ```csharp
   sfDataGrid.AllowGrouping = false;
   sfDataGrid.ShowRowHeader = false;
   ```
3. **Use simple column types** (avoid templates when possible)
4. **Set fixed column widths:**
   ```csharp
   sfDataGrid.ColumnWidthMode = ColumnWidthMode.None;
   ```

### Very Large Datasets (100K+ rows)

1. **Implement data virtualization**
2. **Disable summaries** (expensive with large data)
3. **Limit sorting/filtering** or use server-side operations
4. **Use on-demand loading** for details views

### Optimal Settings

```xml
<dataGrid:SfDataGrid AllowSorting="True"
                     AllowFiltering="False"
                     AllowGrouping="False"
                     ShowRowHeader="False"
                     ColumnWidthMode="None"
                     ItemsSource="{Binding LargeDataset}" />
```

## Measuring Performance

```csharp
// Test scrolling performance
var stopwatch = Stopwatch.StartNew();
for (int i = 0; i < 100; i++)
{
    sfDataGrid.ScrollInView(new RowColumnIndex(i * 100, 0));
}
stopwatch.Stop();
Debug.WriteLine($"Scroll time: {stopwatch.ElapsedMilliseconds}ms");
```

## Best Practices

1. **UI virtualization** handles most scenarios (automatic)
2. **Data virtualization** for 500K+ rows
3. **Disable grouping** for large datasets (expensive operation)
4. **Use pagination** as alternative to virtualization
5. **Profile performance** before optimizing
6. **Load data asynchronously** to keep UI responsive
7. **Consider server-side operations** for filtering/sorting large data
