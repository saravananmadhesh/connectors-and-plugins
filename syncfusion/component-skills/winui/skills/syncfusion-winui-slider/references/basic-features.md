# Basic Features

## Table of Contents
- [Setting Minimum and Maximum Values](#setting-minimum-and-maximum-values)
- [Interval Configuration](#interval-configuration)
- [Discrete Value Selection (StepFrequency)](#discrete-value-selection-stepfrequency)
- [Setting the Current Value](#setting-the-current-value)
- [Orientation (Horizontal/Vertical)](#orientation-horizontalvertical)
- [Flow Direction (IsInversed)](#flow-direction-isinversed)
- [Events](#events)
- [Custom Range Implementation](#custom-range-implementation)

This guide covers the core features and properties that control the slider's behavior and appearance.

## Setting Minimum and Maximum Values

The `Minimum` and `Maximum` properties define the range of values the slider can represent.

### Properties

- **Minimum** (double): Start value of the range (default: 0)
- **Maximum** (double): End value of the range (default: 100)

### Basic Example

```xml
<slider:SfSlider Minimum="0"
                 Maximum="100"
                 Value="50"
                 ShowLabels="True" />
```

```csharp
SfSlider slider = new SfSlider();
slider.Minimum = 0;
slider.Maximum = 100;
slider.Value = 50;
slider.ShowLabels = true;
```

### Negative Range Example

```xml
<slider:SfSlider Minimum="-20"
                 Maximum="20"
                 Value="0"
                 ShowLabels="True" />
```

```csharp
slider.Minimum = -20;
slider.Maximum = 20;
slider.Value = 0;
```

### Common Use Cases

**Temperature Control (-50°C to 50°C):**
```xml
<slider:SfSlider Minimum="-50"
                 Maximum="50"
                 Value="20"
                 ShowLabels="True"
                 ShowTicks="True" />
```

**Percentage (0% to 100%):**
```xml
<slider:SfSlider Minimum="0"
                 Maximum="100"
                 Value="75"
                 ShowLabels="True" />
```

**Price Range ($0 to $1000):**
```xml
<slider:SfSlider Minimum="0"
                 Maximum="1000"
                 Value="500"
                 Interval="100"
                 ShowLabels="True" />
```

## Interval Configuration

The `Interval` property determines the spacing between labels, ticks, and dividers.

### Property

- **Interval** (double): Gap between rendered elements (default: auto-calculated)

### How It Works

If `Minimum` = 0, `Maximum` = 10, and `Interval` = 2:
- Labels appear at: 0, 2, 4, 6, 8, 10
- Major ticks appear at: 0, 2, 4, 6, 8, 10
- Dividers appear at: 0, 2, 4, 6, 8, 10

### Basic Interval Example

```xml
<slider:SfSlider Minimum="0"
                 Maximum="10"
                 Interval="2"
                 Value="4"
                 ShowTicks="True"
                 ShowLabels="True" />
```

```csharp
slider.Minimum = 0;
slider.Maximum = 10;
slider.Interval = 2;
slider.Value = 4;
slider.ShowTicks = true;
slider.ShowLabels = true;
```

### Auto-Interval

When `Interval` is not specified (or set to `double.NaN`), the slider automatically calculates an appropriate interval:

```xml
<slider:SfSlider Minimum="0"
                 Maximum="100"
                 ShowLabels="True"
                 ShowTicks="True" />
```

The slider will intelligently choose intervals like 10, 20, or 25 depending on the range.

### Common Interval Patterns

**Every 10 units:**
```xml
<slider:SfSlider Minimum="0" Maximum="100" Interval="10" ShowLabels="True" />
```

**Every 25 units:**
```xml
<slider:SfSlider Minimum="0" Maximum="100" Interval="25" ShowLabels="True" />
```

**Every 5 units:**
```xml
<slider:SfSlider Minimum="0" Maximum="50" Interval="5" ShowLabels="True" />
```

## Discrete Value Selection (StepFrequency)

The `StepFrequency` property controls how the thumb moves in discrete steps rather than continuously.

### Property

- **StepFrequency** (double): The interval at which the thumb can be positioned (default: 0)

### Basic Example

```xml
<slider:SfSlider Minimum="0"
                 Maximum="10"
                 Interval="2"
                 Value="4"
                 StepFrequency="2"
                 ShowTicks="True"
                 ShowLabels="True" />
```

```csharp
slider.Minimum = 0;
slider.Maximum = 10;
slider.Interval = 2;
slider.StepFrequency = 2;
slider.ShowTicks = true;
slider.ShowLabels = true;
```

With `StepFrequency="2"`, the thumb can only land on values: 0, 2, 4, 6, 8, 10

### Use Cases

**Volume Control (steps of 5):**
```xml
<slider:SfSlider Minimum="0"
                 Maximum="100"
                 StepFrequency="5"
                 Value="50" />
```

**Rating System (integer steps):**
```xml
<slider:SfSlider Minimum="1"
                 Maximum="5"
                 StepFrequency="1"
                 Value="3"
                 ShowLabels="True" />
```

**Zoom Levels (25% increments):**
```xml
<slider:SfSlider Minimum="50"
                 Maximum="200"
                 StepFrequency="25"
                 Value="100"
                 ShowLabels="True" />
```

### Difference Between Interval and StepFrequency

- **Interval**: Controls where labels, ticks, and dividers are rendered (visual only)
- **StepFrequency**: Controls where the thumb can actually land (affects value selection)

Example showing the difference:
```xml
<slider:SfSlider Minimum="0"
                 Maximum="100"
                 Interval="20"          <!-- Labels at 0, 20, 40, 60, 80, 100 -->
                 StepFrequency="5"      <!-- Thumb can land on 0, 5, 10, 15... -->
                 ShowLabels="True"
                 ShowTicks="True" />
```

## Setting the Current Value

The `Value` property represents the current position of the slider thumb.

### Property

- **Value** (double): The selected value (must be between Minimum and Maximum)

### Basic Example

```xml
<slider:SfSlider Value="50"
                 ShowLabels="True" />
```

```csharp
slider.Value = 50;
slider.ShowLabels = true;
```

### Data Binding

```xml
<slider:SfSlider Value="{Binding VolumeLevel, Mode=TwoWay}"
                 Minimum="0"
                 Maximum="100" />
```

### Programmatic Value Updates

```csharp
// Set value
slider.Value = 75;

// Get value
double currentValue = slider.Value;

// Animate value change
public void AnimateToValue(double targetValue)
{
    // Use Storyboard or DoubleAnimation for smooth transitions
    DoubleAnimation animation = new DoubleAnimation
    {
        To = targetValue,
        Duration = TimeSpan.FromMilliseconds(300)
    };
    
    Storyboard.SetTarget(animation, slider);
    Storyboard.SetTargetProperty(animation, "Value");
    
    Storyboard storyboard = new Storyboard();
    storyboard.Children.Add(animation);
    storyboard.Begin();
}
```

### Validation

Ensure value is within range:

```csharp
public void SetSliderValue(double value)
{
    if (value < slider.Minimum)
        slider.Value = slider.Minimum;
    else if (value > slider.Maximum)
        slider.Value = slider.Maximum;
    else
        slider.Value = value;
}
```

## Orientation (Horizontal/Vertical)

The `Orientation` property controls the slider's layout direction.

### Property

- **Orientation** (Orientation): Horizontal or Vertical (default: Horizontal)

### Horizontal Slider (Default)

```xml
<slider:SfSlider Orientation="Horizontal"
                 ShowTicks="True"
                 ShowLabels="True"
                 Value="50"
                 Width="400" />
```

### Vertical Slider

```xml
<slider:SfSlider Orientation="Vertical"
                 ShowTicks="True"
                 ShowLabels="True"
                 Interval="20"
                 Value="40"
                 Height="300" />
```

```csharp
slider.Orientation = Orientation.Vertical;
slider.ShowTicks = true;
slider.ShowLabels = true;
slider.Interval = 20;
slider.Value = 40;
slider.Height = 300;
```

### Use Cases

**Vertical Volume Control:**
```xml
<StackPanel>
    <TextBlock Text="Volume" HorizontalAlignment="Center" />
    <slider:SfSlider Orientation="Vertical"
                     Value="75"
                     Minimum="0"
                     Maximum="100"
                     ShowTicks="True"
                     Height="200"
                     HorizontalAlignment="Center" />
</StackPanel>
```

**Vertical Temperature:**
```xml
<slider:SfSlider Orientation="Vertical"
                 Minimum="-20"
                 Maximum="40"
                 Interval="10"
                 Value="22"
                 ShowLabels="True"
                 ShowTicks="True"
                 Height="300" />
```

### Layout Considerations

- **Horizontal:** Set `Width` for proper sizing
- **Vertical:** Set `Height` for proper sizing
- Vertical sliders render from bottom (minimum) to top (maximum)

## Flow Direction (IsInversed)

The `IsInversed` property reverses the direction of the slider.

### Property

- **IsInversed** (bool): Reverse the slider direction (default: false)

### Horizontal Slider

- **IsInversed = false** (default): Left to Right (0 → 100)
- **IsInversed = true**: Right to Left (100 ← 0)

```xml
<slider:SfSlider ShowTicks="True"
                 ShowLabels="True"
                 Interval="20"
                 Value="40"
                 IsInversed="True"
                 Width="400" />
```

```csharp
slider.IsInversed = true;
slider.ShowTicks = true;
slider.ShowLabels = true;
slider.Interval = 20;
slider.Value = 40;
```

### Vertical Slider

- **IsInversed = false** (default): Bottom to Top (0 → 100)
- **IsInversed = true**: Top to Bottom (100 ← 0)

```xml
<slider:SfSlider Orientation="Vertical"
                 IsInversed="True"
                 ShowLabels="True"
                 Value="60"
                 Height="300" />
```

### Use Cases

**RTL (Right-to-Left) Languages:**
```xml
<slider:SfSlider IsInversed="True"
                 FlowDirection="RightToLeft"
                 ShowLabels="True" />
```

**Countdown Timer:**
```xml
<slider:SfSlider Minimum="0"
                 Maximum="60"
                 Value="45"
                 IsInversed="True"
                 ShowLabels="True" />
```

## Events

### ValueChanged Event

Fired when the `Value` property changes.

#### Event Args Properties

- **OldValue** (double): Previous value
- **NewValue** (double): Current value

#### XAML

```xml
<slider:SfSlider Value="50"
                 ValueChanged="SfSlider_ValueChanged" />
```

#### Code-Behind

```csharp
private void SfSlider_ValueChanged(object sender, SliderValueChangedEventArgs e)
{
    double oldValue = e.OldValue;
    double newValue = e.NewValue;
    
    System.Diagnostics.Debug.WriteLine($"Value changed from {oldValue} to {newValue}");
    
    // Update UI or perform actions
    UpdateVolumeDisplay(newValue);
}
```

### Common Patterns

**Debouncing Rapid Changes:**
```csharp
private DispatcherTimer debounceTimer;

private void SfSlider_ValueChanged(object sender, SliderValueChangedEventArgs e)
{
    // Cancel previous timer
    debounceTimer?.Stop();
    
    // Start new timer
    debounceTimer = new DispatcherTimer { Interval = TimeSpan.FromMilliseconds(300) };
    debounceTimer.Tick += (s, args) =>
    {
        debounceTimer.Stop();
        ApplyExpensiveOperation(e.NewValue);
    };
    debounceTimer.Start();
}
```

**Validation:**
```csharp
private void SfSlider_ValueChanged(object sender, SliderValueChangedEventArgs e)
{
    if (e.NewValue < 10)
    {
        warningText.Visibility = Visibility.Visible;
        warningText.Text = "Value is below minimum recommended level";
    }
    else
    {
        warningText.Visibility = Visibility.Collapsed;
    }
}
```

**Synchronizing Multiple Sliders:**
```csharp
private void MasterSlider_ValueChanged(object sender, SliderValueChangedEventArgs e)
{
    slaveSlider1.Value = e.NewValue;
    slaveSlider2.Value = e.NewValue * 0.5;
}
```

## Custom Range Implementation

Create custom scale ranges by extending the `SfSlider` class.

### Logarithmic Slider Example

```xml
<local:LogarithmicSlider Minimum="1"
                         Maximum="10000"
                         Value="100"
                         ShowLabels="True"
                         Width="400" />
```

```csharp
public class LogarithmicSlider : SfSlider
{
    int labelsCount;

    public override List<SliderLabelInfo> GenerateVisibleLabels()
    {
        List<SliderLabelInfo> labelInfos = new List<SliderLabelInfo>();
        int minimum = (int)LogBase(this.Minimum, 10);
        int maximum = (int)LogBase(this.Maximum, 10);
        
        for (int i = minimum; i <= maximum; i++)
        {
            double value = Math.Floor(Math.Pow(10, i));
            SliderLabelInfo label = new SliderLabelInfo()
            {
                Value = value,
                Text = value.ToString()
            };
            labelInfos.Add(label);
        }

        labelsCount = labelInfos.Count;
        return labelInfos;
    }

    private double LogBase(double value, int baseValue)
    {
        return Math.Log(value) / Math.Log(baseValue);
    }

    public override double ValueToFactor(double value)
    {
        return LogBase(value, 10) / (labelsCount - 1);
    }

    public override double FactorToValue(double factor)
    {
        return Math.Pow(Math.E, factor * (labelsCount - 1) * Math.Log(10));
    }
}
```

### Custom Date Range Slider

```csharp
public class DateSlider : SfSlider
{
    public DateTime StartDate { get; set; } = DateTime.Today;
    public DateTime EndDate { get; set; } = DateTime.Today.AddDays(30);

    public override List<SliderLabelInfo> GenerateVisibleLabels()
    {
        List<SliderLabelInfo> labelInfos = new List<SliderLabelInfo>();
        TimeSpan span = EndDate - StartDate;
        int days = span.Days;
        
        for (int i = 0; i <= days; i += 7)
        {
            DateTime date = StartDate.AddDays(i);
            SliderLabelInfo label = new SliderLabelInfo()
            {
                Value = i,
                Text = date.ToString("MMM dd")
            };
            labelInfos.Add(label);
        }
        
        return labelInfos;
    }
}
```

## Edge Cases and Validation

### Handling Invalid Ranges

```csharp
// Ensure Minimum < Maximum
if (slider.Minimum >= slider.Maximum)
{
    throw new InvalidOperationException("Minimum must be less than Maximum");
}

// Ensure Value is within range
if (slider.Value < slider.Minimum || slider.Value > slider.Maximum)
{
    slider.Value = Math.Max(slider.Minimum, Math.Min(slider.Maximum, slider.Value));
}
```

### Very Large Ranges

```xml
<!-- Use appropriate intervals for large ranges -->
<slider:SfSlider Minimum="0"
                 Maximum="1000000"
                 Interval="100000"
                 ShowLabels="True" />
```

### Very Small Ranges (Decimals)

```xml
<slider:SfSlider Minimum="0.0"
                 Maximum="1.0"
                 Interval="0.1"
                 StepFrequency="0.01"
                 Value="0.5"
                 ShowLabels="True" />
```

## Best Practices

1. **Set Explicit Ranges:** Always define meaningful Minimum and Maximum values
2. **Choose Appropriate Intervals:** Match intervals to your use case (10, 20, 25, etc.)
3. **Use StepFrequency for Discrete Values:** When you need specific value increments
4. **Handle ValueChanged Wisely:** Avoid expensive operations in the event handler
5. **Validate Values:** Ensure values stay within acceptable ranges
6. **Consider Orientation:** Use vertical sliders for space-constrained layouts
7. **Test IsInversed:** Verify behavior matches user expectations

## Troubleshooting

**Value Not Updating:**
- Check if `IsEnabled` is true
- Verify data binding mode is TwoWay
- Ensure value is within Minimum/Maximum range

**Labels Not Appearing at Expected Intervals:**
- Set `Interval` property explicitly
- Ensure `ShowLabels="True"`
- Check that range is large enough for intervals

**Thumb Jumping Unexpectedly:**
- Review `StepFrequency` setting
- Check for conflicting animations
- Verify Value property isn't being set elsewhere

## Next Steps

- [labels.md](labels.md) - Customize label formatting and styles
- [ticks.md](ticks.md) - Configure major and minor ticks
- [track-customization.md](track-customization.md) - Style the slider track