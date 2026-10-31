# Precision in WinUI Rating

The Rating control provides flexible precision modes to handle different rating accuracies. The `Precision` property allows you to control how users can interact with and select rating values.

## Overview

**Property:** `Precision`  
**Type:** `RatingPrecision` enum  
**Default:** `Full`  
**Options:** `Full`, `Half`, `Exact`

The precision mode determines:
- How rating values are rounded during user interaction
- What incremental values users can select
- Visual feedback during hover and selection

## Full Precision Mode

Full precision allows only whole number ratings (1, 2, 3, 4, 5). This is the most common and user-friendly mode.

### When to Use Full Precision
- Simple rating systems (like/satisfied scales)
- Quick feedback collection
- When exact precision isn't needed
- General product reviews
- Movie ratings
- Service satisfaction surveys

### Setting Full Precision

**XAML:**
```xml
<syncfusion:SfRating 
    Value="3" 
    ItemsCount="5"
    Precision="Full"/>
```

**C#:**
```csharp
SfRating rating = new SfRating();
rating.Value = 3;
rating.ItemsCount = 5;
rating.Precision = RatingPrecision.Full;
```

### User Interaction Behavior

**Mouse Click:**
- Clicking on any part of a star fills that star and all previous stars
- Clicking the first filled star clears the rating (if `IsClearEnabled="True"`)

**Example Interaction:**
- Click on star 1 → Value = 1
- Click on star 3 → Value = 3
- Click on star 5 → Value = 5

**Visual:**
```
Before click:  ☆ ☆ ☆ ☆ ☆  (Value = 0)
Click star 3:  ★ ★ ★ ☆ ☆  (Value = 3)
Click star 5:  ★ ★ ★ ★ ★  (Value = 5)
```

### Complete Example

```xml
<StackPanel Spacing="15">
    <TextBlock Text="How satisfied are you?" FontWeight="Bold"/>
    <syncfusion:SfRating 
        x:Name="SatisfactionRating"
        Value="0" 
        ItemsCount="5"
        Precision="Full"
        ItemSize="40"
        ValueChanged="Rating_ValueChanged"/>
    <TextBlock x:Name="ResultText" FontStyle="Italic"/>
</StackPanel>
```

```csharp
private void Rating_ValueChanged(object sender, ValueChangedEventArgs e)
{
    string[] labels = { "Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied" };
    
    if (e.NewValue > 0 && e.NewValue <= labels.Length)
    {
        ResultText.Text = labels[(int)e.NewValue - 1];
    }
    else
    {
        ResultText.Text = "Not rated";
    }
}
```

## Half Precision Mode

Half precision allows ratings in 0.5 increments (1.0, 1.5, 2.0, 2.5, 3.0, etc.). Perfect for more granular feedback.

### When to Use Half Precision
- Product ratings (Amazon-style)
- Restaurant reviews
- App store ratings
- When users need more granularity than whole numbers
- Displaying average ratings with half-star accuracy

### Setting Half Precision

**XAML:**
```xml
<syncfusion:SfRating 
    Value="3.5" 
    ItemsCount="5"
    Precision="Half"/>
```

**C#:**
```csharp
SfRating rating = new SfRating();
rating.Value = 3.5;
rating.ItemsCount = 5;
rating.Precision = RatingPrecision.Half;
```

### User Interaction Behavior

**Mouse Click:**
- Clicking the left half of a star fills half
- Clicking the right half of a star fills completely
- Progressive filling as you move across stars

**Example Interaction:**
- Click left half of star 2 → Value = 1.5
- Click right half of star 2 → Value = 2.0
- Click left half of star 4 → Value = 3.5

**Visual:**
```
Before click:   ☆ ☆ ☆ ☆ ☆  (Value = 0)
Click left #3:  ★ ★ ◐ ☆ ☆  (Value = 2.5)
Click right #4: ★ ★ ★ ★ ☆  (Value = 4.0)
```

### Complete Example

```xml
<StackPanel Spacing="15">
    <TextBlock Text="Rate this product:" FontWeight="Bold"/>
    <syncfusion:SfRating 
        x:Name="ProductRating"
        Value="0" 
        ItemsCount="5"
        Precision="Half"
        EnableToolTip="True"
        ToolTipFormat="0.0"
        ValueChanged="ProductRating_ValueChanged"/>
    <TextBlock 
        x:Name="ProductRatingText" 
        Foreground="{ThemeResource SystemAccentColor}"/>
</StackPanel>
```

```csharp
private void ProductRating_ValueChanged(object sender, ValueChangedEventArgs e)
{
    ProductRatingText.Text = $"Your rating: {e.NewValue:0.0} stars";
}
```

### Display-Only Half Stars

Show average ratings with half-star precision:

```xml
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="Auto"/>
        <ColumnDefinition Width="Auto"/>
    </Grid.ColumnDefinitions>
    
    <syncfusion:SfRating 
        Grid.Column="0"
        Value="4.5" 
        ItemsCount="5"
        Precision="Half"
        IsReadOnly="True"
        ItemSize="20"/>
    
    <TextBlock 
        Grid.Column="1"
        Text="4.5 out of 5"
        VerticalAlignment="Center"
        Margin="10,0,0,0"/>
</Grid>
```

## Exact Precision Mode

Exact precision allows any decimal value (1.0, 2.3, 3.7, 4.2, etc.). Best for displaying calculated averages or analytics.

### When to Use Exact Precision
- **Display-only** ratings (averages, aggregates)
- Analytics dashboards
- Showing precise calculated values
- NOT recommended for user input (difficult to control)

**⚠️ Important:** Exact precision is primarily for **read-only display**, not user input. It's hard for users to select precise decimal values.

### Setting Exact Precision

**XAML:**
```xml
<syncfusion:SfRating 
    Value="3.7" 
    ItemsCount="5"
    Precision="Exact"
    IsReadOnly="True"/>
```

**C#:**
```csharp
SfRating rating = new SfRating();
rating.Value = 3.7;
rating.ItemsCount = 5;
rating.Precision = RatingPrecision.Exact;
rating.IsReadOnly = true;
```

### User Interaction Behavior (Not Recommended)

If used for input (not recommended):
- Mouse position determines exact decimal value
- Very difficult for users to select precise values
- Requires pixel-perfect positioning

**Better approach:** Use Exact for display, Half or Full for input.

### Display Average Ratings

The primary use case for Exact precision:

```xml
<StackPanel Spacing="10">
    <TextBlock Text="Customer Reviews" FontSize="20" FontWeight="Bold"/>
    
    <Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="Auto"/>
            <ColumnDefinition Width="Auto"/>
            <ColumnDefinition Width="Auto"/>
        </Grid.ColumnDefinitions>
        
        <syncfusion:SfRating 
            Grid.Column="0"
            Value="{Binding AverageRating}" 
            ItemsCount="5"
            Precision="Exact"
            IsReadOnly="True"
            ItemSize="24"/>
        
        <TextBlock 
            Grid.Column="1"
            Text="{Binding AverageRating, StringFormat='{}{0:0.00}'}"
            VerticalAlignment="Center"
            FontSize="18"
            FontWeight="SemiBold"
            Margin="10,0,0,0"/>
        
        <TextBlock 
            Grid.Column="2"
            Text="{Binding TotalReviews, StringFormat='({0} reviews)'}"
            VerticalAlignment="Center"
            Foreground="Gray"
            Margin="5,0,0,0"/>
    </Grid>
</StackPanel>
```

### Complete Display Example

```csharp
public class ProductViewModel : INotifyPropertyChanged
{
    private double _averageRating = 4.23;
    public double AverageRating
    {
        get => _averageRating;
        set
        {
            _averageRating = value;
            OnPropertyChanged(nameof(AverageRating));
        }
    }

    private int _totalReviews = 1547;
    public int TotalReviews
    {
        get => _totalReviews;
        set
        {
            _totalReviews = value;
            OnPropertyChanged(nameof(TotalReviews));
        }
    }

    // INotifyPropertyChanged implementation...
}
```

## Precision Comparison

| Precision | User Input | Display | Values | Best For |
|-----------|------------|---------|--------|----------|
| **Full** | ✓ Easy | ✓ Clear | 1, 2, 3, 4, 5 | Simple ratings, surveys |
| **Half** | ✓ Good | ✓ Clear | 1.0, 1.5, 2.0, 2.5, 3.0 | Products, detailed reviews |
| **Exact** | ✗ Difficult | ✓ Precise | Any decimal | Averages, analytics (read-only) |

## Best Practices

### Choosing Precision Mode

**Use Full when:**
- Rating experience/satisfaction (1-5 scale)
- Quick feedback needed
- Simplicity is priority
- Target audience prefers simple choices

**Use Half when:**
- Product or service ratings
- Need more granularity than whole numbers
- User base expects half-star options
- Showing averages that include half increments

**Use Exact when:**
- Displaying calculated averages (ALWAYS set `IsReadOnly="True"`)
- Analytics and reporting
- Showing precise metrics
- NEVER for direct user input

### Combining with Other Features

**With Tooltip (Recommended for Half and Exact):**
```xml
<syncfusion:SfRating 
    Value="3.5" 
    ItemsCount="5"
    Precision="Half"
    EnableToolTip="True"
    ToolTipFormat="0.0"/>
```

**With PlaceholderValue (Show average before rating):**
```xml
<syncfusion:SfRating 
    Value="0"
    PlaceholderValue="4.2"
    ItemsCount="5"
    Precision="Half"/>
```

## Common Scenarios

### Scenario 1: User Rates, Display Shows Average

```xml
<!-- User input: Half precision -->
<TextBlock Text="Rate this product:"/>
<syncfusion:SfRating 
    Value="{Binding UserRating, Mode=TwoWay}" 
    ItemsCount="5"
    Precision="Half"/>

<!-- Display average: Exact precision, read-only -->
<TextBlock Text="Average rating:" Margin="0,20,0,0"/>
<syncfusion:SfRating 
    Value="{Binding AverageRating}" 
    ItemsCount="5"
    Precision="Exact"
    IsReadOnly="True"/>
```

### Scenario 2: Quick Satisfaction Survey

```xml
<syncfusion:SfRating 
    Value="0" 
    ItemsCount="5"
    Precision="Full"
    ItemSize="50"/>
```

### Scenario 3: Product Review System

```xml
<syncfusion:SfRating 
    Value="0" 
    ItemsCount="5"
    Precision="Half"
    EnableToolTip="True"
    ToolTipFormat="0.0 stars"/>
```

## Troubleshooting

**Half stars not showing:**
- Verify `Precision="Half"` is set
- Ensure Value uses .5 increments (e.g., 3.5, not 3.6)
- Check if custom template supports partial fill

**Exact precision showing wrong values:**
- For display, set `IsReadOnly="True"`
- Bind to calculated average, not user input
- Use proper string formatting in display text

**User can't select precise values:**
- This is expected behavior with Exact precision
- Switch to Half or Full for user input
- Use Exact only for display

## Summary

Choose your precision mode based on use case:
- **Full:** Simple, user-friendly ratings ← Most common
- **Half:** Granular product/service ratings ← Good balance
- **Exact:** Display-only averages and analytics ← Read-only only

For best user experience, use **Half precision** for collecting ratings and **Exact precision with IsReadOnly** for displaying averages.
