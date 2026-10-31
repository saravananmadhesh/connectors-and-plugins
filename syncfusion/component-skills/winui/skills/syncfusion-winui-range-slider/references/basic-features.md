# Basic Features

Core configuration options for WinUI RangeSlider including minimum/maximum values, intervals, step frequency, orientation, and value change events.

## Table of Contents
- [Minimum and Maximum Values](#minimum-and-maximum-values)
- [Interval Configuration](#interval-configuration)
- [Step Frequency (Discrete Selection)](#step-frequency-discrete-selection)
- [Setting Range Values](#setting-range-values)
- [Dragging Active Range](#dragging-active-range)
- [Flow Direction (IsInversed)](#flow-direction-isinversed)
- [Vertical Orientation](#vertical-orientation)
- [Events](#events)

## Minimum and Maximum Values

The `Minimum` and `Maximum` properties define the value range of the RangeSlider.

**Default Values:**
- `Minimum`: 0
- `Maximum`: 100

### XAML Example

```xaml
<slider:SfRangeSlider 
    Minimum="-20"
    Maximum="20"
    RangeStart="-10"
    RangeEnd="10"
    ShowLabels="True" />
```

### C# Example

```csharp
SfRangeSlider rangeSlider = new SfRangeSlider();
rangeSlider.Minimum = -20;
rangeSlider.Maximum = 20;
rangeSlider.RangeStart = -10;
rangeSlider.RangeEnd = 10;
rangeSlider.ShowLabels = true;
this.Content = rangeSlider;
```

**Important**: `RangeStart` and `RangeEnd` must be within the `Minimum` and `Maximum` range.

### Use Cases
- **Temperature ranges**: -50°C to 50°C
- **Financial data**: Negative to positive values
- **Scientific data**: Custom numeric ranges

## Interval Configuration

The `Interval` property determines the spacing between labels, ticks, and dividers on the track.

**Default Value**: `double.NaN` (automatic calculation)

### How Interval Works

If `Minimum` = 0, `Maximum` = 10, and `Interval` = 2:
- Labels appear at: 0, 2, 4, 6, 8, 10
- Major ticks appear at: 0, 2, 4, 6, 8, 10
- Dividers appear at: 0, 2, 4, 6, 8, 10

### XAML Example

```xaml
<slider:SfRangeSlider 
    Minimum="0"
    Maximum="10"
    Interval="2"
    RangeStart="2"
    RangeEnd="8"
    ShowTicks="True"
    ShowLabels="True" />
```

### C# Example

```csharp
SfRangeSlider rangeSlider = new SfRangeSlider();
rangeSlider.Minimum = 0;
rangeSlider.Maximum = 10;
rangeSlider.Interval = 2;
rangeSlider.RangeStart = 2;
rangeSlider.RangeEnd = 8;
rangeSlider.ShowTicks = true;
rangeSlider.ShowLabels = true;
this.Content = rangeSlider;
```

### Auto-Interval

When `Interval` is not set (or `double.NaN`), the slider automatically calculates an appropriate interval based on the range and available space.

**Note**: Auto-interval adjusts dynamically as the slider resizes.

### Interval Best Practices

- **Small ranges (0-10)**: Use `Interval="1"` for every value
- **Medium ranges (0-100)**: Use `Interval="10"` or `Interval="20"`
- **Large ranges (0-1000)**: Use `Interval="100"` or `Interval="200"`
- **Custom ranges**: Choose intervals that create 5-15 labels for optimal readability

## Step Frequency (Discrete Selection)

The `StepFrequency` property controls how the thumb moves - in continuous or discrete steps.

**Default Value**: 0 (continuous movement)

### When to Use StepFrequency

- **Ratings**: Move in whole numbers (1, 2, 3, 4, 5)
- **Percentages**: Move in 5% or 10% increments
- **Quantity selectors**: Whole number selection only
- **Price filters**: Move in $10, $50, or $100 increments

### XAML Example

```xaml
<slider:SfRangeSlider 
    Minimum="0"
    Maximum="10"
    Interval="2"
    RangeStart="2"
    RangeEnd="8"
    StepFrequency="2"
    ShowTicks="True"
    ShowLabels="True" />
```

### C# Example

```csharp
SfRangeSlider rangeSlider = new SfRangeSlider();
rangeSlider.Minimum = 0;
rangeSlider.Maximum = 10;
rangeSlider.Interval = 2;
rangeSlider.StepFrequency = 2;  // Thumb snaps to 0, 2, 4, 6, 8, 10
rangeSlider.RangeStart = 2;
rangeSlider.RangeEnd = 8;
rangeSlider.ShowTicks = true;
rangeSlider.ShowLabels = true;
this.Content = rangeSlider;
```

**Result**: Thumbs snap to values: 0, 2, 4, 6, 8, 10

### StepFrequency vs Interval

| Property | Purpose | Effect |
|----------|---------|--------|
| `Interval` | Visual elements | Where labels/ticks appear |
| `StepFrequency` | Thumb movement | What values thumb can land on |

**Example**: `Interval="10"`, `StepFrequency="1"`
- Labels at: 0, 10, 20, 30...
- Thumb can select: 0, 1, 2, 3, 4...

## Setting Range Values

The `RangeStart` and `RangeEnd` properties set the selected range.

### XAML Example

```xaml
<slider:SfRangeSlider 
    RangeStart="30"
    RangeEnd="70"
    ShowLabels="True" />
```

### C# Example

```csharp
SfRangeSlider rangeSlider = new SfRangeSlider();
rangeSlider.RangeStart = 30;
rangeSlider.RangeEnd = 70;
rangeSlider.ShowLabels = true;
this.Content = rangeSlider;
```

### Programmatic Value Updates

```csharp
// Update range programmatically
rangeSlider.RangeStart = 25;
rangeSlider.RangeEnd = 75;

// Read current range
double currentStart = rangeSlider.RangeStart;
double currentEnd = rangeSlider.RangeEnd;
```

### Data Binding

```xaml
<slider:SfRangeSlider 
    RangeStart="{x:Bind ViewModel.MinPrice, Mode=TwoWay}"
    RangeEnd="{x:Bind ViewModel.MaxPrice, Mode=TwoWay}" />
```

## Dragging Active Range

The `CanDragActiveRange` property allows users to drag the entire selected range without changing its size.

**Default Value**: `false`

### When to Enable

- **Time window selection**: Move entire time window
- **Data range selection**: Shift range without resizing
- **Quick range adjustments**: Maintain range size while repositioning

### XAML Example

```xaml
<slider:SfRangeSlider 
    RangeStart="40"
    RangeEnd="60"
    CanDragActiveRange="True"
    ShowLabels="True"
    LabelOffset="10" />
```

### C# Example

```csharp
SfRangeSlider rangeSlider = new SfRangeSlider();
rangeSlider.RangeStart = 40;
rangeSlider.RangeEnd = 60;
rangeSlider.CanDragActiveRange = true;
rangeSlider.ShowLabels = true;
rangeSlider.LabelOffset = 10;
this.Content = rangeSlider;
```

**Behavior**: Click and drag anywhere in the active track segment to move the entire range.

### Use Case Example

```csharp
// Moving time window in a video player
rangeSlider.Minimum = 0;
rangeSlider.Maximum = 120;  // 2 minutes
rangeSlider.RangeStart = 30;  // Start at 30 seconds
rangeSlider.RangeEnd = 60;    // End at 60 seconds (30-second window)
rangeSlider.CanDragActiveRange = true;  // User can shift the 30-second window
```

## Flow Direction (IsInversed)

The `IsInversed` property reverses the direction of the slider.

**Default Value**: `false` (left-to-right or bottom-to-top)

### Horizontal Slider
- `IsInversed="False"`: Left (minimum) → Right (maximum)
- `IsInversed="True"`: Right (minimum) → Left (maximum)

### XAML Example

```xaml
<slider:SfRangeSlider 
    ShowTicks="True"
    ShowLabels="True"
    Interval="20"
    RangeStart="40"
    RangeEnd="60"
    IsInversed="True" />
```

### C# Example

```csharp
SfRangeSlider rangeSlider = new SfRangeSlider();
rangeSlider.ShowTicks = true;
rangeSlider.ShowLabels = true;
rangeSlider.Interval = 20;
rangeSlider.RangeStart = 40;
rangeSlider.RangeEnd = 60;
rangeSlider.IsInversed = true;
this.Content = rangeSlider;
```

### Use Cases
- **RTL (Right-to-Left) languages**: Hebrew, Arabic UI layouts
- **Countdown timers**: Higher values on left
- **Inverted scales**: Specific data visualization needs

## Vertical Orientation

The `Orientation` property changes the slider from horizontal to vertical.

**Values:**
- `Orientation.Horizontal` (default)
- `Orientation.Vertical`

### XAML Example

```xaml
<slider:SfRangeSlider 
    Orientation="Vertical"
    ShowTicks="True"
    ShowLabels="True"
    Interval="20"
    RangeStart="40"
    RangeEnd="60" />
```

### C# Example

```csharp
SfRangeSlider rangeSlider = new SfRangeSlider();
rangeSlider.Orientation = Orientation.Vertical;
rangeSlider.ShowTicks = true;
rangeSlider.ShowLabels = true;
rangeSlider.Interval = 20;
rangeSlider.RangeStart = 40;
rangeSlider.RangeEnd = 60;
this.Content = rangeSlider;
```

**Behavior**: Renders bottom-to-top (bottom = minimum, top = maximum)

### Use Cases
- **Volume controls**: Vertical volume sliders
- **Temperature displays**: Thermometer-style ranges
- **Audio equalizers**: Frequency band controls
- **Space-constrained UIs**: Vertical layouts

### Vertical + IsInversed

```xaml
<slider:SfRangeSlider 
    Orientation="Vertical"
    IsInversed="True"
    RangeStart="30"
    RangeEnd="70" />
```

**Result**: Top-to-bottom orientation (top = minimum, bottom = maximum)

## Events

### RangeValueChanged Event

Fires when `RangeStart` or `RangeEnd` values change.

#### Event Args Properties

- `RangeStartOldValue`: Previous RangeStart value
- `RangeStartNewValue`: New RangeStart value
- `RangeEndOldValue`: Previous RangeEnd value
- `RangeEndNewValue`: New RangeEnd value

#### XAML Example

```xaml
<slider:SfRangeSlider 
    RangeStart="30"
    RangeEnd="70"
    RangeValueChanged="SfRangeSlider_RangeValueChanged" />
```

#### C# Event Handler

```csharp
private void SfRangeSlider_RangeValueChanged(object sender, RangeValueChangedEventArgs e)
{
    double startOld = e.RangeStartOldValue;
    double startNew = e.RangeStartNewValue;
    double endOld = e.RangeEndOldValue;
    double endNew = e.RangeEndNewValue;
    
    Debug.WriteLine($"Range changed from ({startOld}, {endOld}) to ({startNew}, {endNew})");
}
```

#### Common Event Use Cases

**1. Update UI with Selected Range**
```csharp
private void OnRangeChanged(object sender, RangeValueChangedEventArgs e)
{
    selectedRangeText.Text = $"Selected: {e.RangeStartNewValue:F0} - {e.RangeEndNewValue:F0}";
}
```

**2. Filter Data Based on Range**
```csharp
private void OnRangeChanged(object sender, RangeValueChangedEventArgs e)
{
    var filteredData = allData.Where(item => 
        item.Value >= e.RangeStartNewValue && 
        item.Value <= e.RangeEndNewValue
    );
    
    dataGrid.ItemsSource = filteredData;
}
```

**3. Validate Range Selection**
```csharp
private void OnRangeChanged(object sender, RangeValueChangedEventArgs e)
{
    double rangeSize = e.RangeEndNewValue - e.RangeStartNewValue;
    
    if (rangeSize < 10)
    {
        // Minimum range requirement
        warningText.Text = "Please select a range of at least 10 units";
    }
    else
    {
        warningText.Text = string.Empty;
    }
}
```

**4. Synchronize Multiple Sliders**
```csharp
private void PrimarySlider_RangeValueChanged(object sender, RangeValueChangedEventArgs e)
{
    secondarySlider.RangeStart = e.RangeStartNewValue;
    secondarySlider.RangeEnd = e.RangeEndNewValue;
}
```

**5. Calculate Derived Values**
```csharp
private void OnRangeChanged(object sender, RangeValueChangedEventArgs e)
{
    double priceRangeStart = e.RangeStartNewValue;
    double priceRangeEnd = e.RangeEndNewValue;
    
    // Calculate affordability index
    double average = (priceRangeStart + priceRangeEnd) / 2;
    double range = priceRangeEnd - priceRangeStart;
    
    affordabilityText.Text = $"Avg: ${average:F2}, Range: ${range:F2}";
}
```

## Complete Configuration Example

```xaml
<StackPanel Spacing="20" Padding="20">
    <!-- Basic Range Slider -->
    <StackPanel>
        <TextBlock Text="Basic Range Slider" FontWeight="SemiBold" Margin="0,0,0,10" />
        <slider:SfRangeSlider 
            Minimum="0"
            Maximum="100"
            Interval="10"
            RangeStart="30"
            RangeEnd="70"
            ShowLabels="True"
            ShowTicks="True" />
    </StackPanel>

    <!-- Discrete Selection -->
    <StackPanel>
        <TextBlock Text="Discrete Selection (Step by 5)" FontWeight="SemiBold" Margin="0,0,0,10" />
        <slider:SfRangeSlider 
            Minimum="0"
            Maximum="100"
            Interval="10"
            StepFrequency="5"
            RangeStart="25"
            RangeEnd="75"
            ShowLabels="True"
            ShowTicks="True" />
    </StackPanel>

    <!-- Draggable Range -->
    <StackPanel>
        <TextBlock Text="Draggable Active Range" FontWeight="SemiBold" Margin="0,0,0,10" />
        <slider:SfRangeSlider 
            Minimum="0"
            Maximum="100"
            RangeStart="40"
            RangeEnd="60"
            CanDragActiveRange="True"
            ShowLabels="True" />
    </StackPanel>

    <!-- Vertical Slider -->
    <StackPanel>
        <TextBlock Text="Vertical Orientation" FontWeight="SemiBold" Margin="0,0,0,10" />
        <slider:SfRangeSlider 
            Orientation="Vertical"
            Height="200"
            Interval="20"
            RangeStart="40"
            RangeEnd="60"
            ShowLabels="True"
            ShowTicks="True" />
    </StackPanel>
</StackPanel>
```

## Troubleshooting

**Issue: Range values not respecting boundaries**
- **Solution**: Ensure `RangeStart` and `RangeEnd` are between `Minimum` and `Maximum`

**Issue: Thumb not snapping to expected values**
- **Solution**: Verify `StepFrequency` is set correctly; use 0 for continuous movement

**Issue: Too many/too few labels**
- **Solution**: Adjust `Interval` property or use auto-interval (set to `double.NaN`)

**Issue: Can't drag range as a unit**
- **Solution**: Set `CanDragActiveRange="True"`

**Issue: Events not firing**
- **Solution**: Ensure event handler is correctly wired in XAML or code-behind