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

The selection feature allows users to interact with chart segments by clicking or tapping them. Selected segments are highlighted with a custom color, making them stand out from the rest of the chart.

**Use Cases:**
- Drill-down interactions
- Filtering data based on selection
- Highlighting specific segments
- Interactive dashboards
- Data exploration

## Enabling Selection

Enable selection by adding **DataPointSelectionBehavior** to the series:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate">
            <chart:PieSeries.SelectionBehavior>
                <chart:DataPointSelectionBehavior SelectionBrush="Orange"/>
            </chart:PieSeries.SelectionBehavior>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();

PieSeries series = new PieSeries();
DataPointSelectionBehavior selection = new DataPointSelectionBehavior()
{
    SelectionBrush = new SolidColorBrush(Colors.Orange)
};

series.SelectionBehavior = selection;
chart.Series.Add(series);
```

**Behavior:** Click any segment to highlight it with the SelectionBrush color.

## Selection Properties

### SelectionBrush

Defines the color to apply to selected segments:

**XAML:**
```xml
<chart:DataPointSelectionBehavior SelectionBrush="BlueViolet"/>
```

**C#:**
```csharp
selection.SelectionBrush = new SolidColorBrush(Colors.BlueViolet);
```

**Color Options:**
```xml
<!-- Solid color -->
<chart:DataPointSelectionBehavior SelectionBrush="Red"/>

<!-- Hex color -->
<chart:DataPointSelectionBehavior SelectionBrush="#FF5722"/>

<!-- Using brush resource -->
<chart:DataPointSelectionBehavior SelectionBrush="{StaticResource AccentBrush}"/>
```

### Type

Controls the selection behavior mode:

**Options:**
- **Single** - Select one segment at a time (default)
- **SingleDeselect** - Select/deselect one segment
- **Multiple** - Select multiple segments
- **None** - Disable selection

### SelectedIndex

The index of the currently selected segment (for programmatic selection):

**Values:** 0-based index or -1 for no selection

### SelectedIndexes

Collection of indexes for multiple selected segments:

**Type:** List<int> or ObservableCollection<int>

## Selection Types

### Single Selection

Select one segment at a time. Selecting a new segment deselects the previous one.

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}">
            <chart:PieSeries.SelectionBehavior>
                <chart:DataPointSelectionBehavior SelectionBrush="Orange"
                                                Type="Single"/>
            </chart:PieSeries.SelectionBehavior>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior()
{
    SelectionBrush = new SolidColorBrush(Colors.Orange),
    Type = ChartSelectionType.Single
};
```

**Behavior:**
- Click segment A → A is selected
- Click segment B → B is selected, A is deselected

### Single Deselect

Select one segment, click again to deselect:

**XAML:**
```xml
<chart:DataPointSelectionBehavior SelectionBrush="Green"
                                Type="SingleDeselect"/>
```

**C#:**
```csharp
selection.Type = ChartSelectionType.SingleDeselect;
```

**Behavior:**
- Click segment A → A is selected
- Click segment A again → A is deselected
- Click segment B → B is selected, A is deselected (only one selected at a time)

### Multiple Selection

Select multiple segments simultaneously:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}">
            <chart:PieSeries.SelectionBehavior>
                <chart:DataPointSelectionBehavior SelectionBrush="BlueViolet"
                                                Type="Multiple"/>
            </chart:PieSeries.SelectionBehavior>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior()
{
    SelectionBrush = new SolidColorBrush(Colors.BlueViolet),
    Type = ChartSelectionType.Multiple
};
```

**Behavior:**
- Click segment A → A is selected
- Click segment B → Both A and B are selected
- Click segment A again → A is deselected, B remains selected

### No Selection

Disable selection completely:

**XAML:**
```xml
<chart:DataPointSelectionBehavior Type="None"/>
```

**C#:**
```csharp
selection.Type = ChartSelectionType.None;
```

## Programmatic Selection

Select segments programmatically using SelectedIndex or SelectedIndexes:

### Select Single Segment

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}">
            <chart:PieSeries.SelectionBehavior>
                <chart:DataPointSelectionBehavior SelectionBrush="Orange"
                                                SelectedIndex="2"/>
            </chart:PieSeries.SelectionBehavior>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior()
{
    SelectionBrush = new SolidColorBrush(Colors.Orange),
    SelectedIndex = 2  // Select third segment (0-based index)
};
```

**Result:** The segment at index 2 is selected when the chart loads.

### Select Multiple Segments

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}">
            <chart:PieSeries.SelectionBehavior>
                <chart:DataPointSelectionBehavior SelectionBrush="BlueViolet"
                                                Type="Multiple"
                                                SelectedIndexes="{Binding SelectedIndexes}"/>
            </chart:PieSeries.SelectionBehavior>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C# ViewModel:**
```csharp
public class ChartViewModel
{
    public List<int> SelectedIndexes { get; set; }
    
    public ChartViewModel()
    {
        // Select segments at indexes 1, 3, and 4
        SelectedIndexes = new List<int>() { 1, 3, 4 };
    }
}
```

**C# Code-behind:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior()
{
    SelectionBrush = new SolidColorBrush(Colors.BlueViolet),
    Type = ChartSelectionType.Multiple,
    SelectedIndexes = new List<int>() { 2, 3, 4 }
};
```

### Dynamic Selection

Change selection programmatically at runtime:

```csharp
// Access the selection behavior
var selectionBehavior = series.SelectionBehavior as DataPointSelectionBehavior;

// Select a different segment
selectionBehavior.SelectedIndex = 4;

// Select multiple segments
selectionBehavior.SelectedIndexes = new List<int>() { 0, 2, 5 };

// Clear selection
selectionBehavior.SelectedIndex = -1;
selectionBehavior.SelectedIndexes.Clear();
```

## Selection Events

Handle selection changes using events:

### SelectionChanging Event

Occurs before selection changes. Can be canceled.

**XAML:**
```xml
<chart:DataPointSelectionBehavior SelectionBrush="Orange"
                                SelectionChanging="OnSelectionChanging"/>
```

**C#:**
```csharp
private void OnSelectionChanging(object sender, ChartSelectionChangingEventArgs e)
{
    // Get new selection
    int newIndex = e.NewIndexes[0];
    
    // Get old selection
    if (e.OldIndexes.Count > 0)
    {
        int oldIndex = e.OldIndexes[0];
    }
    
    // Cancel selection change if needed
    if (newIndex == 2)
    {
        e.Cancel = true;  // Prevent selecting index 2
    }
}
```

**Event Args Properties:**
- **NewIndexes** - Indexes being selected
- **OldIndexes** - Previously selected indexes
- **Cancel** - Set to true to prevent selection

### SelectionChanged Event

Occurs after selection has changed:

**XAML:**
```xml
<chart:DataPointSelectionBehavior SelectionBrush="Orange"
                                SelectionChanged="OnSelectionChanged"/>
```

**C#:**
```csharp
private void OnSelectionChanged(object sender, ChartSelectionChangedEventArgs e)
{
    // Get newly selected indexes
    if (e.NewIndexes.Count > 0)
    {
        int selectedIndex = e.NewIndexes[0];
        
        // Access the data item
        var dataItem = viewModel.Data[selectedIndex];
        
        // Perform action based on selection
        UpdateDetailsPanel(dataItem);
    }
    
    // Get deselected indexes
    if (e.OldIndexes.Count > 0)
    {
        int deselectedIndex = e.OldIndexes[0];
    }
}
```

**Event Args Properties:**
- **NewIndexes** - Newly selected indexes
- **OldIndexes** - Previously selected indexes (now deselected)

### Event Usage Patterns

**Conditional selection:**
```csharp
private void OnSelectionChanging(object sender, ChartSelectionChangingEventArgs e)
{
    // Only allow selection of segments with values > 10
    int index = e.NewIndexes[0];
    var item = viewModel.Data[index];
    
    if (item.Value <= 10)
    {
        e.Cancel = true;
        ShowMessage("Only segments with value > 10 can be selected");
    }
}
```

**Trigger navigation:**
```csharp
private void OnSelectionChanged(object sender, ChartSelectionChangedEventArgs e)
{
    if (e.NewIndexes.Count > 0)
    {
        int index = e.NewIndexes[0];
        var product = viewModel.Data[index];
        
        // Navigate to details page
        NavigateToProductDetails(product);
    }
}
```

**Update UI:**
```csharp
private void OnSelectionChanged(object sender, ChartSelectionChangedEventArgs e)
{
    if (e.NewIndexes.Count > 0)
    {
        // Update summary panel
        var selectedItems = e.NewIndexes.Select(i => viewModel.Data[i]).ToList();
        UpdateSummary(selectedItems);
    }
}
```

## Best Practices

### Selection Design

1. **Clear visual feedback** - Use contrasting SelectionBrush color
2. **Appropriate selection type** - Choose type based on use case
3. **Consistent behavior** - Match selection with user expectations
4. **Visual cues** - Consider cursor changes on hover

### User Experience

1. **Single for simple interaction** - Most common use case
2. **Multiple for comparison** - When users need to compare segments
3. **SingleDeselect for toggles** - When selection is optional action
4. **Provide feedback** - Update UI to show selection impact

### Performance

1. **Avoid heavy event handlers** - Keep SelectionChanged handlers light
2. **Batch updates** - If multiple selections trigger updates
3. **Cancel wisely** - Use SelectionChanging sparingly

## Common Scenarios

### Scenario 1: Basic Single Selection

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales">
            <chart:PieSeries.SelectionBehavior>
                <chart:DataPointSelectionBehavior SelectionBrush="#FF5722"
                                                Type="Single"/>
            </chart:PieSeries.SelectionBehavior>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 2: Multiple Selection with Events

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Category"
                       YBindingPath="Amount">
            <chart:PieSeries.SelectionBehavior>
                <chart:DataPointSelectionBehavior SelectionBrush="DeepSkyBlue"
                                                Type="Multiple"
                                                SelectionChanged="OnSelectionChanged"/>
            </chart:PieSeries.SelectionBehavior>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

```csharp
private void OnSelectionChanged(object sender, ChartSelectionChangedEventArgs e)
{
    var selectedItems = e.NewIndexes.Select(i => viewModel.Data[i]).ToList();
    TotalTextBlock.Text = $"Total: ${selectedItems.Sum(item => item.Amount)}";
}
```

### Scenario 3: Pre-selected Segment

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="Value">
            <chart:PieSeries.SelectionBehavior>
                <chart:DataPointSelectionBehavior SelectionBrush="Gold"
                                                Type="Single"
                                                SelectedIndex="0"/>
            </chart:PieSeries.SelectionBehavior>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 4: Toggle Selection

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Status"
                       YBindingPath="Count">
            <chart:PieSeries.SelectionBehavior>
                <chart:DataPointSelectionBehavior SelectionBrush="LimeGreen"
                                                Type="SingleDeselect"/>
            </chart:PieSeries.SelectionBehavior>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 5: Filtered Selection with Validation

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}">
            <chart:PieSeries.SelectionBehavior>
                <chart:DataPointSelectionBehavior SelectionBrush="Purple"
                                                SelectionChanging="ValidateSelection"/>
            </chart:PieSeries.SelectionBehavior>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

```csharp
private void ValidateSelection(object sender, ChartSelectionChangingEventArgs e)
{
    int index = e.NewIndexes[0];
    var item = viewModel.Data[index];
    
    // Only allow selection of active products
    if (!item.IsActive)
    {
        e.Cancel = true;
    }
}
```