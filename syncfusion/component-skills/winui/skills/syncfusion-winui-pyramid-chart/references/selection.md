# Selection

## Table of Contents
- [Overview](#overview)
- [Enabling Selection](#enabling-selection)
- [Selection Properties](#selection-properties)
- [Selection Types](#selection-types)
- [Programmatic Selection](#programmatic-selection)
- [Selection Events](#selection-events)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

---

## Overview

The pyramid chart supports segment selection, allowing users to interactively select one or more segments. This feature is useful for highlighting specific data points, filtering, or triggering actions based on user interaction.

**Key Features:**
- Single and multiple selection modes
- Customizable selection brush (highlight color)
- Programmatic selection support
- Selection events for custom logic
- Initial selection on rendering

---

## Enabling Selection

Create a `DataPointSelectionBehavior` instance and assign it to the `SelectionBehavior` property.

### XAML

```xml
<chart:SfPyramidChart x:Name="chart"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value">
    
    <chart:SfPyramidChart.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectionBrush="Red"/>
    </chart:SfPyramidChart.SelectionBehavior>
    
</chart:SfPyramidChart>
```

### C#

```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";

DataPointSelectionBehavior selection = new DataPointSelectionBehavior
{
    SelectionBrush = new SolidColorBrush(Colors.Red)
};
chart.SelectionBehavior = selection;

this.Content = chart;
```

**Behavior:**
- Click/tap a segment to select it
- Selected segment displays with the SelectionBrush color
- Click again to deselect (depends on selection type)

---

## Selection Properties

Configure selection behavior using these properties:

| Property | Type | Description |
|----------|------|-------------|
| **Type** | ChartSelectionType | Single, SingleDeselect, Multiple, or None |
| **SelectionBrush** | Brush | Color used for selected segments |
| **SelectedIndex** | int | Index of initially selected segment |
| **SelectedIndexes** | List<int> | List of initially selected segment indexes |

---

## Selection Types

The `Type` property controls how selection behaves.

### Available Types

| Type | Behavior |
|------|----------|
| **Single** | Select one segment; clicking another replaces selection |
| **SingleDeselect** | Select one segment; clicking it again deselects |
| **Multiple** | Select multiple segments; click to toggle each |
| **None** | Disables selection |

### Single Selection

Only one segment can be selected at a time. Selecting another segment deselects the previous one.

**XAML:**
```xml
<chart:SfPyramidChart.SelectionBehavior>
    <chart:DataPointSelectionBehavior Type="Single"
                                      SelectionBrush="Blue"/>
</chart:SfPyramidChart.SelectionBehavior>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior
{
    Type = ChartSelectionType.Single,
    SelectionBrush = new SolidColorBrush(Colors.Blue)
};
chart.SelectionBehavior = selection;
```

**Use case:** Radio button-style selection where only one option can be active.

### Single Deselect

Like Single, but allows deselecting by clicking the selected segment again.

**XAML:**
```xml
<chart:DataPointSelectionBehavior Type="SingleDeselect"
                                  SelectionBrush="Green"/>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior
{
    Type = ChartSelectionType.SingleDeselect,
    SelectionBrush = new SolidColorBrush(Colors.Green)
};
```

**Use case:** Toggle selection where user can clear the selection.

### Multiple Selection

Multiple segments can be selected simultaneously.

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value">
    
    <chart:SfPyramidChart.SelectionBehavior>
        <chart:DataPointSelectionBehavior Type="Multiple"
                                          SelectionBrush="Orange"/>
    </chart:SfPyramidChart.SelectionBehavior>
    
</chart:SfPyramidChart>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior
{
    Type = ChartSelectionType.Multiple,
    SelectionBrush = new SolidColorBrush(Colors.Orange)
};
chart.SelectionBehavior = selection;
```

**Behavior:**
- Click a segment to select it
- Click again to deselect it
- Multiple segments can be selected simultaneously
- Each click toggles the segment's selection state

**Use case:** Checkbox-style selection for filtering or comparing multiple data points.

### None (Disable Selection)

Completely disables segment selection.

```xml
<chart:DataPointSelectionBehavior Type="None"/>
```

---

## Programmatic Selection

Select segments programmatically on chart initialization or in response to events.

### SelectedIndex (Single Segment)

Select a specific segment by its zero-based index.

**XAML:**
```xml
<chart:SfPyramidChart.SelectionBehavior>
    <chart:DataPointSelectionBehavior SelectionBrush="Purple"
                                      SelectedIndex="2"/>
</chart:SfPyramidChart.SelectionBehavior>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior
{
    SelectionBrush = new SolidColorBrush(Colors.Purple),
    SelectedIndex = 2  // Select third segment (0-based index)
};
chart.SelectionBehavior = selection;
```

**Index mapping:**
```
Data Points:    ["Apples", "Oranges", "Bananas", "Grapes"]
Indexes:        [   0    ,    1     ,    2     ,   3    ]
SelectedIndex=2 → "Bananas" is selected
```

### SelectedIndexes (Multiple Segments)

Select multiple segments by providing a list of indexes. Requires `Type="Multiple"`.

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value">
    
    <chart:SfPyramidChart.SelectionBehavior>
        <chart:DataPointSelectionBehavior Type="Multiple"
                                          SelectionBrush="Teal"
                                          SelectedIndexes="{Binding SelectedIndexes}"/>
    </chart:SfPyramidChart.SelectionBehavior>
    
</chart:SfPyramidChart>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior
{
    Type = ChartSelectionType.Multiple,
    SelectionBrush = new SolidColorBrush(Colors.Teal),
    SelectedIndexes = new List<int> { 0, 2, 4 }  // Select 1st, 3rd, and 5th segments
};
chart.SelectionBehavior = selection;
```

**ViewModel binding:**
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
        SelectedIndexes = new List<int> { 1, 3 };  // Initially select segments 1 and 3
    }
    
    // INotifyPropertyChanged implementation
}
```

---

## Selection Events

Handle selection changes with the `SelectionChanging` and `SelectionChanged` events.

### SelectionChanging Event

Fires **before** selection changes. Can be canceled.

**Event Arguments (`ChartSelectionChangingEventArgs`):**
- `NewIndexes` - Collection of indexes being selected
- `OldIndexes` - Collection of previously selected indexes
- `Cancel` - Set to `true` to prevent the selection change

**Example:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior();
selection.SelectionChanging += Selection_SelectionChanging;

private void Selection_SelectionChanging(object sender, ChartSelectionChangingEventArgs e)
{
    // Get the index being selected
    int newIndex = e.NewIndexes[0];
    
    // Get the previously selected index
    if (e.OldIndexes.Count > 0)
    {
        int oldIndex = e.OldIndexes[0];
    }
    
    // Cancel selection if condition not met
    if (newIndex == 2)  // Don't allow selecting segment at index 2
    {
        e.Cancel = true;
    }
}
```

**Use cases:**
- Validate selection before it happens
- Prevent selection of certain segments
- Show confirmation dialogs
- Implement custom selection logic

### SelectionChanged Event

Fires **after** selection has changed.

**Event Arguments (`ChartSelectionChangedEventArgs`):**
- `NewIndexes` - Collection of newly selected indexes
- `OldIndexes` - Collection of previously selected indexes

**Example:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior();
selection.SelectionChanged += Selection_SelectionChanged;

private void Selection_SelectionChanged(object sender, ChartSelectionChangedEventArgs e)
{
    // Get the newly selected index
    int newIndex = e.NewIndexes[0];
    
    // Get the previously selected index
    if (e.OldIndexes.Count > 0)
    {
        int oldIndex = e.OldIndexes[0];
    }
    
    // Perform actions based on selection
    Debug.WriteLine($"Segment {newIndex} selected");
    
    // Update UI, filter data, etc.
    UpdateDetailsPanel(newIndex);
}

private void UpdateDetailsPanel(int index)
{
    // Show details for the selected segment
    var selectedData = DataSource[index];
    DetailsTextBlock.Text = $"{selectedData.Category}: {selectedData.Value}";
}
```

**Use cases:**
- Update detail panels or info boxes
- Trigger data filtering
- Update related charts
- Log analytics events
- Synchronize with other UI elements

---

## Complete Examples

### Example 1: Single Selection with Custom Brush

```xml
<chart:SfPyramidChart Header="Product Sales"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Product"
                      YBindingPath="Sales">
    
    <chart:SfPyramidChart.SelectionBehavior>
        <chart:DataPointSelectionBehavior Type="SingleDeselect"
                                          SelectionBrush="#FF6B6B"/>
    </chart:SfPyramidChart.SelectionBehavior>
    
</chart:SfPyramidChart>
```

### Example 2: Multiple Selection with Initial Selection

```xml
<chart:SfPyramidChart ItemsSource="{Binding Data}"
                      XBindingPath="Region"
                      YBindingPath="Revenue">
    
    <chart:SfPyramidChart.SelectionBehavior>
        <chart:DataPointSelectionBehavior Type="Multiple"
                                          SelectionBrush="Gold"
                                          SelectedIndexes="{Binding PreselectedIndexes}"/>
    </chart:SfPyramidChart.SelectionBehavior>
    
</chart:SfPyramidChart>
```

### Example 3: Selection with Event Handling (C#)

```csharp
public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        SetupChart();
    }
    
    private void SetupChart()
    {
        SfPyramidChart chart = new SfPyramidChart();
        
        // Configure selection
        DataPointSelectionBehavior selection = new DataPointSelectionBehavior
        {
            Type = ChartSelectionType.Single,
            SelectionBrush = new SolidColorBrush(Color.FromArgb(255, 255, 107, 107)),
            SelectedIndex = 0  // Initially select first segment
        };
        
        // Attach event handlers
        selection.SelectionChanging += OnSelectionChanging;
        selection.SelectionChanged += OnSelectionChanged;
        
        chart.SelectionBehavior = selection;
        
        // Data binding
        chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
            new Binding() { Path = new PropertyPath("Data") });
        chart.XBindingPath = "Category";
        chart.YBindingPath = "Value";
        
        this.Content = chart;
    }
    
    private void OnSelectionChanging(object sender, ChartSelectionChangingEventArgs e)
    {
        int newIndex = e.NewIndexes[0];
        
        // Example: Prevent selection of first segment
        if (newIndex == 0)
        {
            e.Cancel = true;
            ShowMessage("Cannot select this segment");
        }
    }
    
    private void OnSelectionChanged(object sender, ChartSelectionChangedEventArgs e)
    {
        if (e.NewIndexes.Count > 0)
        {
            int selectedIndex = e.NewIndexes[0];
            ShowMessage($"Segment {selectedIndex} selected");
            
            // Update UI or trigger actions
            LoadSegmentDetails(selectedIndex);
        }
    }
    
    private void LoadSegmentDetails(int index)
    {
        // Implementation to show segment details
    }
    
    private void ShowMessage(string message)
    {
        // Show message to user
        Debug.WriteLine(message);
    }
}
```

### Example 4: Multiple Selection with Gradient Brush

```xml
<Grid>
    <Grid.Resources>
        <LinearGradientBrush x:Key="selectionGradient" StartPoint="0,0" EndPoint="1,1">
            <GradientStop Color="#FF6B6B" Offset="0"/>
            <GradientStop Color="#FFD93D" Offset="1"/>
        </LinearGradientBrush>
    </Grid.Resources>
    
    <chart:SfPyramidChart ItemsSource="{Binding Data}"
                          XBindingPath="Month"
                          YBindingPath="Value">
        
        <chart:SfPyramidChart.SelectionBehavior>
            <chart:DataPointSelectionBehavior Type="Multiple"
                                              SelectionBrush="{StaticResource selectionGradient}"/>
        </chart:SfPyramidChart.SelectionBehavior>
        
    </chart:SfPyramidChart>
</Grid>
```

### Example 5: Dynamic Selection Binding

**ViewModel:**
```csharp
public class ChartViewModel : INotifyPropertyChanged
{
    private List<int> _selectedIndexes;
    
    public List<Model> Data { get; set; }
    
    public List<int> SelectedIndexes
    {
        get => _selectedIndexes;
        set
        {
            _selectedIndexes = value;
            OnPropertyChanged(nameof(SelectedIndexes));
            UpdateSelectedData();
        }
    }
    
    public ChartViewModel()
    {
        Data = LoadData();
        SelectedIndexes = new List<int> { 0, 2 };  // Pre-select first and third
    }
    
    private void UpdateSelectedData()
    {
        // React to selection changes
        var selectedItems = SelectedIndexes.Select(i => Data[i]).ToList();
        // Process selected items...
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

**XAML:**
```xml
<chart:SfPyramidChart>
    <chart:SfPyramidChart.DataContext>
        <local:ChartViewModel/>
    </chart:SfPyramidChart.DataContext>
    
    <chart:SfPyramidChart.SelectionBehavior>
        <chart:DataPointSelectionBehavior Type="Multiple"
                                          SelectionBrush="Cyan"
                                          SelectedIndexes="{Binding SelectedIndexes, Mode=TwoWay}"/>
    </chart:SfPyramidChart.SelectionBehavior>
</chart:SfPyramidChart>
```

---

## Best Practices

### Selection Type Guidelines

| Scenario | Recommended Type |
|----------|------------------|
| Filter to one category | Single |
| Compare specific items | Multiple |
| Toggle highlight on/off | SingleDeselect |
| No user interaction needed | None |

### Selection Brush Tips

1. **High contrast:** Choose colors that stand out from regular segment colors
2. **Consistency:** Use the same selection color across your application
3. **Accessibility:** Ensure adequate contrast for color-blind users
4. **Gradients:** Can add visual interest but keep them subtle

**Good selection colors:**
```xml
<!-- High contrast solid colors -->
<SolidColorBrush Color="#FF6B6B"/>  <!-- Coral Red -->
<SolidColorBrush Color="#4ECDC4"/>  <!-- Turquoise -->
<SolidColorBrush Color="#FFD93D"/>  <!-- Yellow -->
<SolidColorBrush Color="#6C5CE7"/>  <!-- Purple -->
```

### Event Handler Best Practices

1. **Keep handlers lightweight:** Avoid heavy processing in selection events
2. **Use async for long operations:** Don't block UI thread
3. **Handle edge cases:** Check collection counts before accessing indexes
4. **Provide user feedback:** Show visual confirmation of selection
5. **Clean up:** Unsubscribe from events when disposing

---

## Troubleshooting

**Selection not working:**
- Verify `SelectionBehavior` is set
- Check that `Type` is not set to `None`
- Ensure segments are clickable (not covered by other elements)

**Wrong segment selected:**
- Verify `SelectedIndex` or `SelectedIndexes` values
- Check data source order and indexing
- Remember: Indexes are zero-based

**Multiple selection not working:**
- Confirm `Type="Multiple"` is set
- Check that `SelectedIndexes` is a valid collection

**Events not firing:**
- Verify event handlers are attached
- Check for exceptions in event handler code
- Ensure chart is fully loaded before testing

**Selection brush not visible:**
- Choose a contrasting color from segment colors
- Verify brush is not transparent
- Check Z-order of chart elements
