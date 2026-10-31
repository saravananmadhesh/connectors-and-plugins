# Selection Properties and Events in WinUI Segmented Control

## Table of Contents
- [Overview](#overview)
- [SelectedIndex Property](#selectedindex-property)
- [SelectedItem Property](#selecteditem-property)
- [SelectionChanged Event](#selectionchanged-event)
- [Programmatic Selection](#programmatic-selection)

> **See also:** [selection-styling.md](selection-styling.md) for Selection Style Customization, Shadow Effects, Animations, Keyboard Navigation, and Best Practices.

## Overview

The Segmented Control provides comprehensive selection features including programmatic selection, custom styling, shadow effects, animations, and keyboard navigation. Selection is mutually exclusive—only one segment can be selected at a time.

## SelectedIndex Property

The `SelectedIndex` property controls which segment is currently selected based on its zero-based index.

### Basic Usage

```xaml
<syncfusion:SfSegmentedControl SelectedIndex="2">
    <x:String>Day</x:String>      <!-- Index 0 -->
    <x:String>Week</x:String>     <!-- Index 1 -->
    <x:String>Month</x:String>    <!-- Index 2 - Selected -->
    <x:String>Year</x:String>     <!-- Index 3 -->
</syncfusion:SfSegmentedControl>
```

### With Data Binding

```xaml
<syncfusion:SfSegmentedControl 
    ItemsSource="{Binding Periods}"
    DisplayMemberPath="Name"
    SelectedIndex="{Binding SelectedPeriodIndex, Mode=TwoWay}"/>
```

```csharp
public class ViewModel : INotifyPropertyChanged
{
    private int selectedPeriodIndex = 1;
    
    public int SelectedPeriodIndex
    {
        get { return selectedPeriodIndex; }
        set
        {
            selectedPeriodIndex = value;
            OnPropertyChanged(nameof(SelectedPeriodIndex));
        }
    }
    
    // INotifyPropertyChanged implementation
}
```

### Setting in Code

```csharp
// Set selection by index
segmentedControl.SelectedIndex = 2;

// Validate before setting
if (newIndex >= 0 && newIndex < segmentedControl.Items.Count)
{
    segmentedControl.SelectedIndex = newIndex;
}
```

## SelectedItem Property

Access the selected item object directly through the `SelectedItem` property.

### Reading Selected Item

```csharp
private void ProcessSelection()
{
    // For string collections
    string selectedPeriod = segmentedControl.SelectedItem as string;
    
    // For business objects
    var selectedModel = segmentedControl.SelectedItem as PeriodModel;
    if (selectedModel != null)
    {
        string name = selectedModel.Name;
        // Process the selected item
    }
}
```

### Binding SelectedItem

```xaml
<syncfusion:SfSegmentedControl 
    ItemsSource="{Binding Periods}"
    DisplayMemberPath="Name"
    SelectedItem="{Binding SelectedPeriod, Mode=TwoWay}"/>
```

```csharp
public class ViewModel : INotifyPropertyChanged
{
    private PeriodModel selectedPeriod;
    
    public ObservableCollection<PeriodModel> Periods { get; set; }
    
    public PeriodModel SelectedPeriod
    {
        get { return selectedPeriod; }
        set
        {
            selectedPeriod = value;
            OnPropertyChanged(nameof(SelectedPeriod));
            OnSelectionChanged();
        }
    }
    
    private void OnSelectionChanged()
    {
        // React to selection change
    }
}
```

## SelectionChanged Event

The `SelectionChanged` event fires when the selected segment changes, providing both old and new values.

### Event Signature

```csharp
public event EventHandler<SegmentSelectionChangedEventArgs> SelectionChanged;
```

### SegmentSelectionChangedEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `NewValue` | object | The newly selected item |
| `OldValue` | object | The previously selected item |

### Basic Event Handler

```xaml
<syncfusion:SfSegmentedControl 
    SelectionChanged="SegmentedControl_SelectionChanged"
    DisplayMemberPath="Name"
    ItemsSource="{Binding Periods}"/>
```

```csharp
private void SegmentedControl_SelectionChanged(object sender, SegmentSelectionChangedEventArgs e)
{
    // For string items
    string newSelection = e.NewValue as string;
    string previousSelection = e.OldValue as string;
    
    Debug.WriteLine($"Changed from '{previousSelection}' to '{newSelection}'");
}
```

### With Business Objects

```csharp
private void SegmentedControl_SelectionChanged(object sender, SegmentSelectionChangedEventArgs e)
{
    var newItem = e.NewValue as PeriodModel;
    var oldItem = e.OldValue as PeriodModel;
    
    if (newItem != null)
    {
        LoadDataForPeriod(newItem.Name);
    }
    
    // Log the change
    if (oldItem != null && newItem != null)
    {
        Analytics.TrackEvent("PeriodChanged", new Dictionary<string, string>
        {
            ["From"] = oldItem.Name,
            ["To"] = newItem.Name
        });
    }
}
```

### Prevent Recursive Calls

```csharp
private bool isUpdatingSelection = false;

private void SegmentedControl_SelectionChanged(object sender, SegmentSelectionChangedEventArgs e)
{
    if (isUpdatingSelection) return;
    
    try
    {
        isUpdatingSelection = true;
        
        // Your selection logic here
        ProcessSelectionChange(e.NewValue);
    }
    finally
    {
        isUpdatingSelection = false;
    }
}
```

## Programmatic Selection

Change selection from code in various scenarios.

### Select by Index

```csharp
// Direct index assignment
segmentedControl.SelectedIndex = 2;

// With validation
private void SelectSegment(int index)
{
    if (index >= 0 && index < segmentedControl.Items.Count)
    {
        segmentedControl.SelectedIndex = index;
    }
}
```

### Select by Item

```csharp
// Find and select specific item
var targetPeriod = periods.FirstOrDefault(p => p.Name == "Month");
if (targetPeriod != null)
{
    segmentedControl.SelectedItem = targetPeriod;
}
```

### Cycle Through Options

```csharp
private void NextSegment()
{
    int currentIndex = segmentedControl.SelectedIndex;
    int nextIndex = (currentIndex + 1) % segmentedControl.Items.Count;
    segmentedControl.SelectedIndex = nextIndex;
}

private void PreviousSegment()
{
    int currentIndex = segmentedControl.SelectedIndex;
    int itemCount = segmentedControl.Items.Count;
    int previousIndex = (currentIndex - 1 + itemCount) % itemCount;
    segmentedControl.SelectedIndex = previousIndex;
}
```

### Conditional Selection

```csharp
private void UpdateSelectionBasedOnData(DataType dataType)
{
    switch (dataType)
    {
        case DataType.Daily:
            segmentedControl.SelectedIndex = 0;
            break;
        case DataType.Weekly:
            segmentedControl.SelectedIndex = 1;
            break;
        case DataType.Monthly:
            segmentedControl.SelectedIndex = 2;
            break;
        case DataType.Yearly:
            segmentedControl.SelectedIndex = 3;
            break;
    }
}
```


