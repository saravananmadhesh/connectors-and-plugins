## Format Patterns

### Custom Numeric Format Strings

Use custom numeric format strings for precise control.

**Reference:** [Custom Numeric Format Strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-numeric-format-strings)

#### Common Custom Formats

**One Decimal Place:**
```xml
<syncfusion:SfRating 
    Value="3.5"
    Precision="Half"
    EnableToolTip="True"
    ToolTipFormat="0.0"/>
<!-- Tooltip: "3.5" -->
```

**Two Decimal Places:**
```xml
<syncfusion:SfRating 
    Value="4.23"
    Precision="Exact"
    EnableToolTip="True"
    ToolTipFormat="0.00"/>
<!-- Tooltip: "4.23" -->
```

**Three Decimal Places:**
```xml
<syncfusion:SfRating 
    Value="3.876"
    Precision="Exact"
    EnableToolTip="True"
    ToolTipFormat="0.000"/>
<!-- Tooltip: "3.876" -->
```

**With Text:**
```xml
<syncfusion:SfRating 
    Value="4"
    ItemsCount="5"
    EnableToolTip="True"
    ToolTipFormat="0.0 stars"/>
<!-- Tooltip: "4.0 stars" -->
```

**Leading Zeros:**
```xml
<syncfusion:SfRating 
    Value="3"
    EnableToolTip="True"
    ToolTipFormat="00.00"/>
<!-- Tooltip: "03.00" -->
```

### Standard Numeric Format Strings

Use standard .NET numeric format specifiers.

**Reference:** [Standard Numeric Format Strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings)

#### Common Standard Formats

**Fixed-Point (F):**
```xml
<syncfusion:SfRating 
    Value="3.5"
    EnableToolTip="True"
    ToolTipFormat="F2"/>
<!-- Tooltip: "3.50" -->
```

**Number (N):**
```xml
<syncfusion:SfRating 
    Value="3.5"
    EnableToolTip="True"
    ToolTipFormat="N1"/>
<!-- Tooltip: "3.5" (with thousand separators if applicable) -->
```

**General (G):**
```xml
<syncfusion:SfRating 
    Value="3.5"
    EnableToolTip="True"
    ToolTipFormat="G"/>
<!-- Tooltip: "3.5" (most compact representation) -->
```

**Percent (P):**
```xml
<syncfusion:SfRating 
    Value="0.85"
    ItemsCount="1"
    EnableToolTip="True"
    ToolTipFormat="P0"/>
<!-- Tooltip: "85%" -->
```

### Format Comparison Table

| Format | Value=3 | Value=3.5 | Value=3.75 | Value=3.123 |
|--------|---------|-----------|------------|-------------|
| `null` (none) | "3" | "3.5" | "3.75" | "3.123" |
| `"0"` | "3" | "4" | "4" | "3" |
| `"0.0"` | "3.0" | "3.5" | "3.8" | "3.1" |
| `"0.00"` | "3.00" | "3.50" | "3.75" | "3.12" |
| `"0.000"` | "3.000" | "3.500" | "3.750" | "3.123" |
| `"F1"` | "3.0" | "3.5" | "3.8" | "3.1" |
| `"F2"` | "3.00" | "3.50" | "3.75" | "3.12" |
| `"N1"` | "3.0" | "3.5" | "3.8" | "3.1" |

## Use Cases

### Case 1: Precise Average Display

Show exact average ratings with tooltips:

```xml
<StackPanel>
    <TextBlock Text="Product Rating" FontWeight="Bold"/>
    <syncfusion:SfRating 
        Value="4.23"
        ItemsCount="5"
        Precision="Exact"
        IsReadOnly="True"
        EnableToolTip="True"
        ToolTipFormat="0.00 out of 5.00"/>
</StackPanel>
<!-- Tooltip: "4.23 out of 5.00" -->
```

### Case 2: Half-Star Ratings with Tooltip

Help users understand half-star selections:

```xml
<StackPanel>
    <TextBlock Text="Rate this product:"/>
    <syncfusion:SfRating 
        Value="0"
        ItemsCount="5"
        Precision="Half"
        EnableToolTip="True"
        ToolTipFormat="0.0 stars"/>
</StackPanel>
<!-- Hovering shows "3.5 stars" for example -->
```

### Case 3: Percentage-Based Rating

Show rating as percentage:

```xml
<syncfusion:SfRating 
    Value="4.2"
    ItemsCount="5"
    Precision="Exact"
    IsReadOnly="True"
    EnableToolTip="True"
    ToolTipFormat="0.0"/>
```

```csharp
// Calculate percentage in code or converter
double percentage = (rating.Value / rating.ItemsCount) * 100;
// Display: "84.0%"
```

### Case 4: User Feedback During Rating

Provide immediate feedback as user hovers:

```xml
<StackPanel Spacing="15">
    <TextBlock Text="How satisfied are you?" FontSize="18"/>
    <syncfusion:SfRating 
        x:Name="SatisfactionRating"
        Value="0"
        ItemsCount="5"
        Precision="Full"
        EnableToolTip="True"
        ToolTipFormat="0 out of 5"
        ItemSize="45"/>
</StackPanel>
<!-- User sees "3 out of 5" when hovering over third star -->
```

### Case 5: Multi-Language Formatting

Use localized format strings:

```xml
<!-- English -->
<syncfusion:SfRating 
    EnableToolTip="True"
    ToolTipFormat="0.0 stars"/>

<!-- Spanish -->
<syncfusion:SfRating 
    EnableToolTip="True"
    ToolTipFormat="0.0 estrellas"/>

<!-- French -->
<syncfusion:SfRating 
    EnableToolTip="True"
    ToolTipFormat="0.0 étoiles"/>
```

### Case 6: Detailed Analytics Display

```xml
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="Auto"/>
        <ColumnDefinition Width="Auto"/>
    </Grid.ColumnDefinitions>
    
    <syncfusion:SfRating 
        Grid.Column="0"
        Value="4.387"
        ItemsCount="5"
        Precision="Exact"
        IsReadOnly="True"
        ItemSize="20"
        EnableToolTip="True"
        ToolTipFormat="Exact: 0.000"/>
    
    <TextBlock 
        Grid.Column="1"
        Text="{Binding ReviewCount, StringFormat='({0} reviews)'}"
        VerticalAlignment="Center"
        Margin="10,0,0,0"/>
</Grid>
<!-- Tooltip: "Exact: 4.387" -->
```

## Best Practices

### When to Enable Tooltips

**✓ Always enable for:**
- Half precision ratings (helps users understand .5 values)
- Exact precision ratings (shows precise decimal values)
- Read-only display of averages
- Any rating where exact value matters

**? Consider enabling for:**
- Full precision ratings in forms (optional, provides confirmation)
- Large-scale ratings (10+ items)

**✗ Usually not needed for:**
- Very simple 1-3 item ratings
- When exact value is displayed adjacent to rating
- Icon/emoji-based ratings where value is obvious

### Formatting Guidelines

**Match Precision to Format:**
```xml
<!-- Full precision: No decimal needed -->
<syncfusion:SfRating 
    Precision="Full"
    EnableToolTip="True"
    ToolTipFormat="0"/>

<!-- Half precision: One decimal -->
<syncfusion:SfRating 
    Precision="Half"
    EnableToolTip="True"
    ToolTipFormat="0.0"/>

<!-- Exact precision: Two+ decimals -->
<syncfusion:SfRating 
    Precision="Exact"
    EnableToolTip="True"
    ToolTipFormat="0.00"/>
```

**Add Context:**
```xml
<!-- Good: Provides context -->
<syncfusion:SfRating 
    EnableToolTip="True"
    ToolTipFormat="0.0 stars"/>

<!-- Better: Even more context -->
<syncfusion:SfRating 
    EnableToolTip="True"
    ToolTipFormat="Rating: 0.0 / 5.0"/>
```

**Keep It Concise:**
```xml
<!-- Too verbose -->
<syncfusion:SfRating 
    EnableToolTip="True"
    ToolTipFormat="The current rating value is 0.00 stars out of a maximum of 5.00 stars"/>

<!-- Just right -->
<syncfusion:SfRating 
    EnableToolTip="True"
    ToolTipFormat="0.00 / 5.00"/>
```

### Accessibility Considerations

**Tooltips Enhance Accessibility:**
- Screen readers can announce tooltip content
- Provides clear numeric values for visual ratings
- Helps users with color vision deficiencies

**Complement, Don't Replace:**
- Don't rely solely on tooltips for critical information
- Provide alternative text or labels
- Ensure tooltip content is descriptive

### Performance

**Tooltip Overhead:**
- Minimal performance impact
- No rendering cost when not hovering
- Format string evaluated only on hover

### Theme Adaptation

Tooltips automatically adapt to system theme:
- Uses system tooltip styling
- Respects high contrast modes
- No additional styling needed

## Combining with Other Features

### Tooltip + Placeholder

```xml
<syncfusion:SfRating 
    Value="0"
    PlaceholderValue="4.2"
    ItemsCount="5"
    Precision="Half"
    EnableToolTip="True"
    ToolTipFormat="0.0 (avg: 4.2)"/>
```

### Tooltip + Custom Style

```xml
<syncfusion:SfRating 
    Value="3.5"
    ItemsCount="5"
    Precision="Half"
    RatedItemStyle="{StaticResource goldStyle}"
    UnratedItemStyle="{StaticResource grayStyle}"
    EnableToolTip="True"
    ToolTipFormat="★ 0.0"/>
```

### Tooltip + Read-Only

```xml
<syncfusion:SfRating 
    Value="{Binding AverageRating}"
    ItemsCount="5"
    Precision="Exact"
    IsReadOnly="True"
    EnableToolTip="True"
    ToolTipFormat="Average: 0.00"/>
```

## Troubleshooting

**Tooltip not appearing:**
- Verify `EnableToolTip="True"` is set
- Check if mouse hover is being detected
- Ensure control is not disabled
- Try without format string first (set `ToolTipFormat` to null)

**Wrong format displayed:**
- Verify format string syntax (check documentation links above)
- Test with simple format like "0.0" first
- Check for typos in format string
- Ensure format matches value type (numeric formats for numbers)

**Tooltip appears too quickly/slowly:**
- Tooltip timing is controlled by system settings
- Not customizable per control in WinUI
- Users can adjust in Windows Settings

**Format not updating:**
- Ensure ToolTipFormat property is set after EnableToolTip
- Try setting both properties in code behind
- Verify binding is working if using data binding

## Examples Summary

**Basic Tooltip:**
```xml
<syncfusion:SfRating EnableToolTip="True"/>
```

**One Decimal:**
```xml
<syncfusion:SfRating EnableToolTip="True" ToolTipFormat="0.0"/>
```

**Two Decimals:**
```xml
<syncfusion:SfRating EnableToolTip="True" ToolTipFormat="0.00"/>
```

**With Text:**
```xml
<syncfusion:SfRating EnableToolTip="True" ToolTipFormat="0.0 stars"/>
```

**Contextual:**
```xml
<syncfusion:SfRating EnableToolTip="True" ToolTipFormat="Rating: 0.0 / 5.0"/>
```

## Summary

Tooltip features enhance the rating experience:
- **EnableToolTip** - Show/hide tooltips on hover
- **ToolTipFormat** - Customize numeric display
- **Format strings** - Standard or custom .NET formats
- **Accessibility** - Improved user understanding
- **Context** - Add descriptive text to values

Use tooltips whenever precision matters or users need confirmation of their selection. Format appropriately for your precision mode and provide helpful context.
