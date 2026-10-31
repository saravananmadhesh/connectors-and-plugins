# Selection

## Table of Contents
- [Overview](#overview)
- [Enabling Selection](#enabling-selection)
- [Selection Properties](#selection-properties)
- [Selection Types](#selection-types)
- [Programmatic Selection](#programmatic-selection)
- [Selection Events](#selection-events)
- [Best Practices](#best-practices)

## Overview

The funnel chart supports segment selection, allowing users to interactively highlight and work with specific data points. Selection provides visual feedback and enables event-driven interactions.

## Enabling Selection

Create a `DataPointSelectionBehavior` instance and assign it to the chart's `SelectionBehavior` property:

### XAML
```xml
<chart:SfFunnelChart x:Name="chart"
                     Height="388" Width="500"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectionBrush="Red"/>
    </chart:SfFunnelChart.SelectionBehavior>
</chart:SfFunnelChart>
```

### C#
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";

DataPointSelectionBehavior selection = new DataPointSelectionBehavior()
{
    SelectionBrush = new SolidColorBrush(Colors.Red)
};
chart.SelectionBehavior = selection;

this.Content = chart;
```

**Result:** Clicking a segment highlights it with the specified `SelectionBrush` color.

## Selection Properties

The `DataPointSelectionBehavior` provides these key properties:

### Type
Defines the selection mode:
- `Single` - Select one segment at a time (default)
- `SingleDeselect` - Select one segment; click again to deselect
- `Multiple` - Select multiple segments simultaneously
- `None` - Disable selection

### SelectionBrush
Color applied to selected segments:
```xml
<chart:DataPointSelectionBehavior SelectionBrush="Orange"/>
```

### SelectedIndex
Index of the segment to select initially (single selection):
```xml
<chart:DataPointSelectionBehavior SelectedIndex="2"/>
```

### SelectedIndexes
List of segment indexes to select initially (multi-selection):
```xml
<chart:DataPointSelectionBehavior SelectedIndexes="{Binding SelectedIndexes}"/>
```

## Selection Types

### Single Selection (Default)

Allows selecting one segment at a time. Clicking another segment deselects the previous one:

```xml
<chart:SfFunnelChart.SelectionBehavior>
    <chart:DataPointSelectionBehavior SelectionBrush="Red"
                                     Type="Single"/>
</chart:SfFunnelChart.SelectionBehavior>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior()
{
    SelectionBrush = new SolidColorBrush(Colors.Red),
    Type = ChartSelectionType.Single
};
chart.SelectionBehavior = selection;
```

**Behavior:**
- Click segment → Segment highlights
- Click different segment → Previous deselects, new one highlights
- Most common for basic interactions

### Single Deselect

Like Single mode, but clicking the selected segment deselects it:

```xml
<chart:DataPointSelectionBehavior SelectionBrush="Blue"
                                 Type="SingleDeselect"/>
```

**Behavior:**
- Click segment → Segment highlights
- Click same segment again → Segment deselects
- Click different segment → Previous deselects, new one highlights
- Good for toggle-style interactions

### Multiple Selection

Allows selecting multiple segments simultaneously:

```xml
<chart:SfFunnelChart x:Name="chart"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectionBrush="Red"
                                         Type="Multiple"/>
    </chart:SfFunnelChart.SelectionBehavior>
</chart:SfFunnelChart>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior()
{
    SelectionBrush = new SolidColorBrush(Colors.Red),
    Type = ChartSelectionType.Multiple
};
chart.SelectionBehavior = selection;
```

**Behavior:**
- Click segment → Segment highlights
- Click another segment → Both remain highlighted
- Click selected segment → That segment deselects
- Ideal for comparison scenarios

### Disable Selection

Prevent any segment selection:

```xml
<chart:DataPointSelectionBehavior Type="None"/>
```

**Use case:** When selection interferes with other interactions or isn't needed.

**Note:** `Series` and `MultiSeries` selection types are **not supported** for funnel charts.

## Programmatic Selection

### Select by Index (Single Selection)

Set the `SelectedIndex` property to select a specific segment on load:

```xml
<chart:SfFunnelChart x:Name="chart"
                     Height="388" Width="500"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectionBrush="Red"
                                         SelectedIndex="2"/>
    </chart:SfFunnelChart.SelectionBehavior>
</chart:SfFunnelChart>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior()
{
    SelectionBrush = new SolidColorBrush(Colors.Red),
    SelectedIndex = 2
};
chart.SelectionBehavior = selection;
```

**Result:** The segment at index 2 (third segment, zero-based) is pre-selected.

### Dynamic Selection Change
```csharp
// Change selected segment at runtime
((DataPointSelectionBehavior)chart.SelectionBehavior).SelectedIndex = 4;
```

### Select Multiple Segments

Use `SelectedIndexes` with a collection of indexes:

```xml
<chart:SfFunnelChart x:Name="chart"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectionBrush="Red"
                                         Type="Multiple"
                                         SelectedIndexes="{Binding SelectedIndexes}"/>
    </chart:SfFunnelChart.SelectionBehavior>
</chart:SfFunnelChart>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior()
{
    SelectionBrush = new SolidColorBrush(Colors.Red),
    Type = ChartSelectionType.Multiple,
    SelectedIndexes = new List<int>() { 2, 3, 4 }
};
chart.SelectionBehavior = selection;
```

**Result:** Segments at indexes 2, 3, and 4 are pre-selected.

### ViewModel Binding Example
```csharp
public class ChartViewModel : INotifyPropertyChanged
{
    private List<int> _selectedIndexes;
    
    public List<int> SelectedIndexes
    {
        get => _selectedIndexes;
        set
        {
            _selectedIndexes = value;
            OnPropertyChanged(nameof(SelectedIndexes));
        }
    }
    
    public ChartViewModel()
    {
        SelectedIndexes = new List<int>() { 1, 3 };
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

## Selection Events

Handle selection changes with two events:

### SelectionChanging (Cancelable)

Fires **before** a segment is selected. Can be canceled:

```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior();
selection.SelectionChanging += OnSelectionChanging;

private void OnSelectionChanging(object sender, ChartSelectionChangingEventArgs e)
{
    // Get the index being selected
    int newIndex = e.NewIndexes[0];
    
    // Get the previously selected index
    if (e.OldIndexes.Count > 0)
    {
        int oldIndex = e.OldIndexes[0];
    }
    
    // Cancel selection based on condition
    if (newIndex == 0)
    {
        e.Cancel = true; // Prevent selecting the first segment
    }
}
```

**Event Arguments:**
- `NewIndexes` - Collection of indexes being selected (NewIndexes[0] = current index)
- `OldIndexes` - Collection of previously selected indexes (OldIndexes[0] = previous index)
- `Cancel` - Set to `true` to prevent the selection

**Use cases:**
- Validate selection before applying
- Prevent selection of specific segments
- Show confirmation dialogs
- Implement custom selection logic

### SelectionChanged

Fires **after** a segment has been selected:

```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior();
selection.SelectionChanged += OnSelectionChanged;

private void OnSelectionChanged(object sender, ChartSelectionChangedEventArgs e)
{
    // Get the newly selected index
    int newIndex = e.NewIndexes[0];
    
    // Get the previously selected index
    if (e.OldIndexes.Count > 0)
    {
        int oldIndex = e.OldIndexes[0];
    }
    
    // Perform actions based on selection
    LoadDetailedData(newIndex);
}
```

**Event Arguments:**
- `NewIndexes` - Collection of selected indexes
- `OldIndexes` - Collection of previously selected indexes

**Use cases:**
- Update other UI elements based on selection
- Load detailed data for selected segment
- Trigger navigation
- Update summary displays

### Complete Event Handling Example

```csharp
public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        
        SfFunnelChart chart = new SfFunnelChart();
        // ... chart configuration ...
        
        DataPointSelectionBehavior selection = new DataPointSelectionBehavior()
        {
            SelectionBrush = new SolidColorBrush(Colors.Orange),
            Type = ChartSelectionType.Single
        };
        
        selection.SelectionChanging += OnSelectionChanging;
        selection.SelectionChanged += OnSelectionChanged;
        
        chart.SelectionBehavior = selection;
        this.Content = chart;
    }
    
    private void OnSelectionChanging(object sender, ChartSelectionChangingEventArgs e)
    {
        // Validate before selection
        if (e.NewIndexes.Count > 0)
        {
            int index = e.NewIndexes[0];
            
            // Example: Prevent selecting segments with low values
            if (GetSegmentValue(index) < 50)
            {
                e.Cancel = true;
                ShowMessage("Cannot select segments with values below 50");
            }
        }
    }
    
    private void OnSelectionChanged(object sender, ChartSelectionChangedEventArgs e)
    {
        // React to selection
        if (e.NewIndexes.Count > 0)
        {
            int index = e.NewIndexes[0];
            UpdateDetailsPanel(index);
            LogSelection(index);
        }
    }
}
```

### Multiple Selection Event Handling

```csharp
private void OnMultipleSelectionChanged(object sender, ChartSelectionChangedEventArgs e)
{
    // Get all currently selected indexes
    List<int> selectedIndexes = e.NewIndexes.ToList();
    
    // Update UI based on multiple selections
    txtSelectedCount.Text = $"{selectedIndexes.Count} segments selected";
    
    // Calculate total value of selected segments
    double totalValue = selectedIndexes.Sum(index => GetSegmentValue(index));
    txtTotalValue.Text = $"Total: {totalValue:N0}";
}
```

## Best Practices

### 1. Choose Appropriate Selection Type
- **Single** - Most common, for focus on one item
- **SingleDeselect** - When users need to toggle selection
- **Multiple** - For comparison or batch operations
- **None** - When selection isn't needed or interferes with other features

### 2. Selection Brush Colors
- Use high contrast colors for visibility
- Consider accessibility (color blindness)
- Match your application's color scheme
- Avoid colors too similar to segment colors

```csharp
// Good contrast examples
SelectionBrush = new SolidColorBrush(Colors.Gold);        // Bright, visible
SelectionBrush = new SolidColorBrush(Colors.DarkOrange);  // Strong contrast
SelectionBrush = new SolidColorBrush(Colors.DeepSkyBlue); // Clear highlight
```

### 3. Event Handling
- Use `SelectionChanging` for validation and cancellation
- Use `SelectionChanged` for updates and actions
- Avoid heavy operations in event handlers
- Handle empty `OldIndexes` collection gracefully

### 4. Programmatic Selection
- Validate index ranges before setting `SelectedIndex`
- Clear selection by setting `SelectedIndex = -1`
- For multiple selection, ensure `Type = Multiple` is set
- Bind to ViewModel for MVVM pattern

### 5. User Experience
- Provide visual feedback beyond just color (consider patterns/textures)
- Show selection count for multiple selection mode
- Allow easy deselection mechanism
- Communicate selection purpose to users

## Common Patterns

### Basic Interactive Selection
```xml
<chart:DataPointSelectionBehavior SelectionBrush="Orange"
                                 Type="Single"/>
```

### Comparison Mode
```xml
<chart:DataPointSelectionBehavior SelectionBrush="DeepSkyBlue"
                                 Type="Multiple"/>
```

### Pre-selected Highlight
```xml
<chart:DataPointSelectionBehavior SelectionBrush="Gold"
                                 Type="SingleDeselect"
                                 SelectedIndex="0"/>
```

### Event-Driven Selection
```csharp
var selection = new DataPointSelectionBehavior()
{
    SelectionBrush = new SolidColorBrush(Colors.Red),
    Type = ChartSelectionType.Single
};
selection.SelectionChanged += (s, e) =>
{
    var index = e.NewIndexes[0];
    NavigateToDetails(index);
};
chart.SelectionBehavior = selection;
```

## Troubleshooting

### Selection Not Working
- Ensure `SelectionBehavior` is set on the chart
- Verify `SelectionBrush` is visible against segment colors
- Check that selection `Type` is not `None`
- Confirm mouse events are reaching the chart

### Wrong Segment Selected
- Index is zero-based (first segment = 0)
- Verify data binding is correct
- Check for dynamic data updates

### Events Not Firing
- Ensure event handlers are attached before user interaction
- Verify sender is `DataPointSelectionBehavior`
- Check for exceptions in event handler code

### Multiple Selection Not Working
- Confirm `Type="Multiple"` is set
- For `SelectedIndexes`, ensure list is not null
- Check ViewModel binding for multiple selection

### Selection Color Not Visible
- Choose high contrast `SelectionBrush`
- Test with different segment palette colors
- Consider using gradients or patterns for better visibility
