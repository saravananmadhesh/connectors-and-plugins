# Custom Range in WinUI RangeSlider

## Overview

Custom range implementation allows you to extend the WinUI RangeSlider control to support non-linear scales, such as logarithmic, exponential, or other custom mathematical scales. This is useful when your data doesn't map linearly to the visual representation of the slider. This reference guide covers creating custom scale ranges and implementing advanced slider behaviors.

**Key Features:**
- Non-linear scale support (logarithmic, exponential, etc.)
- Custom value-to-position mapping
- Custom label generation
- Flexible mathematical transformations
- Extend `SfRangeSlider` base class

**Common Use Cases:**
- Logarithmic scales for scientific data
- Exponential curves for financial calculations
- Custom intervals for specialized domains
- Non-uniform distributions

## Implementation Fundamentals

### Core Concepts

To implement a custom range, you need to:
1. **Inherit from `SfRangeSlider`**: Create a derived class
2. **Override `GenerateVisibleLabels()`**: Define custom label positions and text
3. **Override `ValueToFactor()`**: Convert value to position (0.0 to 1.0)
4. **Override `FactorToValue()`**: Convert position back to value

### Basic Structure

```csharp
public class CustomRangeSlider : SfRangeSlider
{
    public override List<SliderLabelInfo> GenerateVisibleLabels()
    {
        // Generate custom labels
        List<SliderLabelInfo> labelInfos = new List<SliderLabelInfo>();
        // Add label generation logic
        return labelInfos;
    }

    public override double ValueToFactor(double value)
    {
        // Convert value to normalized position (0.0 to 1.0)
        return normalizedPosition;
    }

    public override double FactorToValue(double factor)
    {
        // Convert normalized position back to value
        return calculatedValue;
    }
}
```

## Logarithmic Range Slider

### Complete Implementation

This example creates a logarithmic scale slider, useful for representing data that spans multiple orders of magnitude.

**XAML Implementation:**
```xml
<local:LogarithmicRangeSlider Minimum="1"
                              Maximum="10000"
                              RangeStart="100"
                              RangeEnd="1000"
                              ShowLabels="True" />
```

**C# Implementation:**
```csharp
public class LogarithmicRangeSlider : SfRangeSlider
{
    int labelsCount;

    public override List<SliderLabelInfo> GenerateVisibleLabels()
    {
        List<SliderLabelInfo> labelInfos = new List<SliderLabelInfo>();
        int minimum = (int)LogBase(this.Minimum, 10);
        int maximum = (int)LogBase(this.Maximum, 10);
        
        for (int i = minimum; i <= maximum; i++)
        {
            double value = Math.Floor(Math.Pow(10, i)); // logBase value is 10
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

**How It Works:**
- **GenerateVisibleLabels()**: Creates labels at powers of 10 (1, 10, 100, 1000, 10000)
- **ValueToFactor()**: Maps value to logarithmic position on track
- **FactorToValue()**: Converts track position back to logarithmic value
- Result: Even spacing visually represents exponential value changes

## Custom Scale Examples

### Example 1: Exponential Range Slider

For values that grow exponentially (e.g., compound interest, population growth).

```csharp
public class ExponentialRangeSlider : SfRangeSlider
{
    private double exponent = 2.0; // Square by default
    private int labelsCount;

    public double Exponent
    {
        get => exponent;
        set
        {
            exponent = value;
            InvalidateLabels(); // Refresh labels when exponent changes
        }
    }

    public override List<SliderLabelInfo> GenerateVisibleLabels()
    {
        List<SliderLabelInfo> labelInfos = new List<SliderLabelInfo>();
        double range = this.Maximum - this.Minimum;
        int labelCount = 5; // Number of labels to show
        
        for (int i = 0; i <= labelCount; i++)
        {
            double factor = i / (double)labelCount;
            double value = this.Minimum + (Math.Pow(factor, exponent) * range);
            
            SliderLabelInfo label = new SliderLabelInfo()
            {
                Value = value,
                Text = value.ToString("N0")
            };
            labelInfos.Add(label);
        }

        labelsCount = labelInfos.Count;
        return labelInfos;
    }

    public override double ValueToFactor(double value)
    {
        double normalizedValue = (value - this.Minimum) / (this.Maximum - this.Minimum);
        return Math.Pow(normalizedValue, 1.0 / exponent);
    }

    public override double FactorToValue(double factor)
    {
        double exponentialFactor = Math.Pow(factor, exponent);
        return this.Minimum + (exponentialFactor * (this.Maximum - this.Minimum));
    }
}
```

**Usage:**
```xml
<local:ExponentialRangeSlider Minimum="0"
                              Maximum="10000"
                              Exponent="2"
                              RangeStart="100"
                              RangeEnd="5000"
                              ShowLabels="True" />
```

### Example 2: Custom Interval Range Slider

For custom, non-uniform intervals (e.g., T-shirt sizes, risk levels).

```csharp
public class CustomIntervalRangeSlider : SfRangeSlider
{
    private double[] customIntervals = { 0, 10, 25, 50, 100, 250, 500, 1000 };
    
    public double[] CustomIntervals
    {
        get => customIntervals;
        set
        {
            customIntervals = value;
            this.Minimum = customIntervals[0];
            this.Maximum = customIntervals[customIntervals.Length - 1];
            InvalidateLabels();
        }
    }

    public override List<SliderLabelInfo> GenerateVisibleLabels()
    {
        List<SliderLabelInfo> labelInfos = new List<SliderLabelInfo>();
        
        foreach (double interval in customIntervals)
        {
            SliderLabelInfo label = new SliderLabelInfo()
            {
                Value = interval,
                Text = interval.ToString("N0")
            };
            labelInfos.Add(label);
        }

        return labelInfos;
    }

    public override double ValueToFactor(double value)
    {
        // Find position in intervals array
        for (int i = 0; i < customIntervals.Length - 1; i++)
        {
            if (value >= customIntervals[i] && value <= customIntervals[i + 1])
            {
                double segmentStart = customIntervals[i];
                double segmentEnd = customIntervals[i + 1];
                double segmentFactor = (value - segmentStart) / (segmentEnd - segmentStart);
                
                // Calculate overall factor
                double segmentSize = 1.0 / (customIntervals.Length - 1);
                return (i * segmentSize) + (segmentFactor * segmentSize);
            }
        }
        
        return 1.0; // Default to maximum
    }

    public override double FactorToValue(double factor)
    {
        // Calculate which segment we're in
        int segmentCount = customIntervals.Length - 1;
        double segmentSize = 1.0 / segmentCount;
        int segmentIndex = (int)(factor / segmentSize);
        
        if (segmentIndex >= segmentCount)
            return customIntervals[customIntervals.Length - 1];
        
        double segmentStart = customIntervals[segmentIndex];
        double segmentEnd = customIntervals[segmentIndex + 1];
        double segmentFactor = (factor - (segmentIndex * segmentSize)) / segmentSize;
        
        return segmentStart + (segmentFactor * (segmentEnd - segmentStart));
    }
}
```

**Usage:**
```xml
<local:CustomIntervalRangeSlider ShowLabels="True"
                                 ShowTicks="True"
                                 RangeStart="25"
                                 RangeEnd="250" />
```

### Example 3: Percentage-Based Range Slider

For percentage values with custom scaling.

```csharp
public class PercentageRangeSlider : SfRangeSlider
{
    public PercentageRangeSlider()
    {
        this.Minimum = 0;
        this.Maximum = 100;
    }

    public override List<SliderLabelInfo> GenerateVisibleLabels()
    {
        List<SliderLabelInfo> labelInfos = new List<SliderLabelInfo>();
        
        for (int i = 0; i <= 100; i += 20)
        {
            SliderLabelInfo label = new SliderLabelInfo()
            {
                Value = i,
                Text = $"{i}%"
            };
            labelInfos.Add(label);
        }

        return labelInfos;
    }

    public override double ValueToFactor(double value)
    {
        // Standard linear mapping for percentages
        return value / 100.0;
    }

    public override double FactorToValue(double factor)
    {
        // Standard linear mapping for percentages
        return factor * 100.0;
    }
}
```

**Usage:**
```xml
<local:PercentageRangeSlider RangeStart="20"
                             RangeEnd="80"
                             ShowLabels="True"
                             Interval="20" />
```

### Example 4: Temperature Scale Range Slider

Convert between Celsius and Fahrenheit with custom display.

```csharp
public class TemperatureRangeSlider : SfRangeSlider
{
    private bool useCelsius = true;

    public bool UseCelsius
    {
        get => useCelsius;
        set
        {
            useCelsius = value;
            InvalidateLabels();
        }
    }

    public TemperatureRangeSlider()
    {
        this.Minimum = -40; // Same in both scales
        this.Maximum = 100; // Celsius
    }

    public override List<SliderLabelInfo> GenerateVisibleLabels()
    {
        List<SliderLabelInfo> labelInfos = new List<SliderLabelInfo>();
        double step = (this.Maximum - this.Minimum) / 5;
        
        for (double temp = this.Minimum; temp <= this.Maximum; temp += step)
        {
            double displayValue = useCelsius ? temp : CelsiusToFahrenheit(temp);
            string unit = useCelsius ? "°C" : "°F";
            
            SliderLabelInfo label = new SliderLabelInfo()
            {
                Value = temp,
                Text = $"{displayValue:N0}{unit}"
            };
            labelInfos.Add(label);
        }

        return labelInfos;
    }

    private double CelsiusToFahrenheit(double celsius)
    {
        return (celsius * 9.0 / 5.0) + 32;
    }

    public override double ValueToFactor(double value)
    {
        return (value - this.Minimum) / (this.Maximum - this.Minimum);
    }

    public override double FactorToValue(double factor)
    {
        return this.Minimum + (factor * (this.Maximum - this.Minimum));
    }
}
```

**Usage:**
```xml
<local:TemperatureRangeSlider RangeStart="0"
                              RangeEnd="40"
                              UseCelsius="True"
                              ShowLabels="True" />
```

## Advanced Techniques

### Dynamic Label Formatting

Add custom formatting based on value magnitude.

```csharp
public override List<SliderLabelInfo> GenerateVisibleLabels()
{
    List<SliderLabelInfo> labelInfos = new List<SliderLabelInfo>();
    
    // Generate labels with intelligent formatting
    for (double value = this.Minimum; value <= this.Maximum; value += CalculateInterval())
    {
        string formattedText = FormatValue(value);
        
        SliderLabelInfo label = new SliderLabelInfo()
        {
            Value = value,
            Text = formattedText
        };
        labelInfos.Add(label);
    }

    return labelInfos;
}

private string FormatValue(double value)
{
    if (value >= 1000000)
        return $"{value / 1000000:N1}M";
    else if (value >= 1000)
        return $"{value / 1000:N1}K";
    else
        return value.ToString("N0");
}
```

### Snapping to Custom Values

Implement value snapping for discrete selections.

```csharp
private double[] snapValues = { 0, 25, 50, 75, 100 };

public override double FactorToValue(double factor)
{
    double rawValue = base.FactorToValue(factor);
    
    // Find closest snap value
    double closestValue = snapValues[0];
    double minDistance = Math.Abs(rawValue - closestValue);
    
    foreach (double snapValue in snapValues)
    {
        double distance = Math.Abs(rawValue - snapValue);
        if (distance < minDistance)
        {
            minDistance = distance;
            closestValue = snapValue;
        }
    }
    
    return closestValue;
}
```

## Code Examples

### Example 1: Scientific Data Slider

```csharp
public class ScientificRangeSlider : SfRangeSlider
{
    public override List<SliderLabelInfo> GenerateVisibleLabels()
    {
        List<SliderLabelInfo> labelInfos = new List<SliderLabelInfo>();
        
        // Generate labels from 10^-6 to 10^6
        for (int exponent = -6; exponent <= 6; exponent += 2)
        {
            double value = Math.Pow(10, exponent);
            string text = exponent >= 0 ? 
                $"10^{exponent}" : 
                $"10^{{{exponent}}}";
            
            labelInfos.Add(new SliderLabelInfo()
            {
                Value = value,
                Text = text
            });
        }

        return labelInfos;
    }

    public override double ValueToFactor(double value)
    {
        double logValue = Math.Log10(value);
        return (logValue + 6) / 12; // Map -6 to 6 → 0 to 1
    }

    public override double FactorToValue(double factor)
    {
        double exponent = (factor * 12) - 6; // Map 0 to 1 → -6 to 6
        return Math.Pow(10, exponent);
    }
}
```

### Example 2: Audio Frequency Slider

```csharp
public class FrequencyRangeSlider : SfRangeSlider
{
    public FrequencyRangeSlider()
    {
        this.Minimum = 20;     // 20 Hz
        this.Maximum = 20000;  // 20 kHz
    }

    public override List<SliderLabelInfo> GenerateVisibleLabels()
    {
        List<SliderLabelInfo> labelInfos = new List<SliderLabelInfo>();
        double[] frequencies = { 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000 };
        
        foreach (double freq in frequencies)
        {
            string text = freq >= 1000 ? 
                $"{freq / 1000:N1}kHz" : 
                $"{freq:N0}Hz";
            
            labelInfos.Add(new SliderLabelInfo()
            {
                Value = freq,
                Text = text
            });
        }

        return labelInfos;
    }

    public override double ValueToFactor(double value)
    {
        // Logarithmic mapping for audio frequencies
        double logMin = Math.Log10(this.Minimum);
        double logMax = Math.Log10(this.Maximum);
        double logValue = Math.Log10(value);
        return (logValue - logMin) / (logMax - logMin);
    }

    public override double FactorToValue(double factor)
    {
        double logMin = Math.Log10(this.Minimum);
        double logMax = Math.Log10(this.Maximum);
        double logValue = logMin + (factor * (logMax - logMin));
        return Math.Pow(10, logValue);
    }
}
```

## Common Use Cases

### Use Case 1: Financial Investment Calculator

```xml
<local:LogarithmicRangeSlider Minimum="100"
                              Maximum="1000000"
                              RangeStart="1000"
                              RangeEnd="100000"
                              ShowLabels="True"
                              ShowTicks="True" />
```

### Use Case 2: Data Size Selector

```xml
<local:CustomIntervalRangeSlider ShowLabels="True"
                                 ShowTicks="True"
                                 CustomIntervals="1,10,100,1024,10240,102400,1048576" />
```

### Use Case 3: Scientific Measurement Tool

```xml
<local:ScientificRangeSlider RangeStart="0.001"
                             RangeEnd="1000"
                             ShowLabels="True" />
```

## Troubleshooting

### Issue: Labels Not Displaying

**Problem:** Custom labels don't appear.

**Solutions:**
1. Ensure `GenerateVisibleLabels()` returns non-empty list
2. Verify `ShowLabels="True"` is set
3. Check if label values are within `Minimum` and `Maximum`

### Issue: Thumb Position Incorrect

**Problem:** Thumb doesn't align with values properly.

**Solutions:**
1. Verify `ValueToFactor()` returns values between 0.0 and 1.0
2. Ensure `FactorToValue()` inverse correctly maps back
3. Test with simple linear case first
4. Check mathematical transformations for errors

```csharp
// Test mapping accuracy
private void TestMapping()
{
    for (double testValue = Minimum; testValue <= Maximum; testValue += 10)
    {
        double factor = ValueToFactor(testValue);
        double backValue = FactorToValue(factor);
        Debug.WriteLine($"Value: {testValue}, Factor: {factor}, Back: {backValue}");
    }
}
```

### Issue: Performance Problems

**Problem:** Slider is slow or laggy.

**Solutions:**
1. Optimize `ValueToFactor()` and `FactorToValue()` calculations
2. Cache computed values where possible
3. Reduce number of labels generated
4. Avoid heavy computations in label text formatting

```csharp
// Cache expensive calculations
private double[] cachedLogValues;

private void PrecomputeValues()
{
    cachedLogValues = new double[(int)(Maximum - Minimum) + 1];
    for (int i = 0; i < cachedLogValues.Length; i++)
    {
        cachedLogValues[i] = Math.Log10(Minimum + i);
    }
}
```

### Issue: Snapping Behavior Unexpected

**Problem:** Values don't snap to expected positions.

**Solutions:**
1. Verify snap value array is sorted
2. Check snapping logic in `FactorToValue()`
3. Test edge cases (minimum, maximum values)
4. Consider adding tolerance range

```csharp
public override double FactorToValue(double factor)
{
    double rawValue = base.FactorToValue(factor);
    
    // Snap with tolerance
    const double tolerance = 5.0;
    foreach (double snapValue in snapValues)
    {
        if (Math.Abs(rawValue - snapValue) <= tolerance)
            return snapValue;
    }
    
    return rawValue;
}
```

## Best Practices

1. **Test Inverse Functions**: Ensure `ValueToFactor(FactorToValue(x)) ≈ x`
2. **Handle Edge Cases**: Test with `Minimum`, `Maximum`, and values outside range
3. **Optimize Calculations**: Cache expensive computations
4. **Document Behavior**: Comment complex mathematical transformations
5. **Validate Input**: Ensure `Minimum` < `Maximum` and valid ranges
6. **Consider Performance**: Profile with realistic data sets
7. **Provide Clear Labels**: Make value representations user-friendly

## Summary

Custom range implementation enables non-linear scales in the RangeSlider. Key points to remember:

- Inherit from `SfRangeSlider` for custom implementations
- Override `GenerateVisibleLabels()` for custom label generation
- Override `ValueToFactor()` to map values to positions (0.0 to 1.0)
- Override `FactorToValue()` to map positions back to values
- Test inverse functions thoroughly for mathematical accuracy
- Optimize calculations for smooth interaction
- Common applications include logarithmic, exponential, and custom interval scales
- Cache expensive computations for better performance
- Validate edge cases and out-of-range values
- Document mathematical transformations clearly

For more information, refer to the Syncfusion WinUI RangeSlider documentation.