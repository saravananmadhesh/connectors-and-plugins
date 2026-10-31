````markdown
# Advanced Customization for WinUI Rating

This file continues `references/customization.md` with advanced options: Read-Only Mode, Clear Rating, Placeholder Value, Combining Customizations, and examples.

## Read-Only Mode

Restrict user interaction and display ratings without allowing changes using the `IsReadOnly` property.

**Property:** `IsReadOnly`  
**Type:** `bool`  
**Default:** `false`

### Setting Read-Only Mode

**XAML:**
```xaml
<syncfusion:SfRating 
    Value="3"
    ItemsCount="5" 
    IsReadOnly="True"/>
```

**C#:**
```csharp
SfRating rating = new SfRating();
rating.Value = 3;
rating.ItemsCount = 5;
rating.IsReadOnly = true;
```

### When to Use Read-Only

**Display Average Ratings:**
```xaml
<StackPanel Orientation="Horizontal" Spacing="10">
    <TextBlock Text="Average:" VerticalAlignment="Center"/>
    <syncfusion:SfRating 
        Value="4.3" 
        ItemsCount="5"
        Precision="Exact"
        IsReadOnly="True"
        ItemSize="20"/>
    <TextBlock 
        Text="(1,234 reviews)" 
        VerticalAlignment="Center"
        Foreground="Gray"/>
</StackPanel>
```

**Product Listing Cards:**
```xaml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="Auto"/>
    </Grid.RowDefinitions>
    
    <Image Grid.Row="0" Source="{Binding ProductImage}" Height="200"/>
    <TextBlock Grid.Row="1" Text="{Binding ProductName}" FontSize="16" Margin="0,10,0,5"/>
    <syncfusion:SfRating 
        Grid.Row="2"
        Value="{Binding Rating}" 
        ItemsCount="5"
        IsReadOnly="True"
        ItemSize="16"/>
</Grid>
```

**Dynamic Read-Only Based on Condition:**
```xaml
<syncfusion:SfRating 
    Value="{Binding UserRating}"
    ItemsCount="5"
    IsReadOnly="{Binding HasUserAlreadyRated}"/>
```

## Clear Rating

Allow or prevent users from clearing their rating selection using the `IsClearEnabled` property.

**Property:** `IsClearEnabled`  
**Type:** `bool`  
**Default:** `true`  
**Note:** Only works with `Precision="Full"`

### Enabling Clear Functionality

**XAML:**
```xaml
<syncfusion:SfRating 
    Value="3"
    ItemsCount="5" 
    IsClearEnabled="True"/>
```

**C#:**
```csharp
SfRating rating = new SfRating();
rating.Value = 3;
rating.ItemsCount = 5;
rating.IsClearEnabled = true;
```

### Behavior

When `IsClearEnabled="True"`:
- User can click the first filled star to clear the entire rating
- Rating value returns to 0
- Useful for optional feedback

When `IsClearEnabled="False"`:
- User must choose a rating (cannot clear)
- Once set, rating can only be changed, not removed
- Useful for mandatory feedback

### Use Cases

**Optional Rating (Clear Enabled):**
```xaml
<StackPanel>
    <TextBlock Text="Rate this item (optional):"/>
    <syncfusion:SfRating 
        x:Name="OptionalRating"
        Value="0"
        ItemsCount="5"
        IsClearEnabled="True"
        ValueChanged="OptionalRating_ValueChanged"/>
    <TextBlock 
        x:Name="OptionalRatingText"
        Text="Not rated"
        FontStyle="Italic"
        Margin="0,10,0,0"/>
</StackPanel>
```

```csharp
private void OptionalRating_ValueChanged(object sender, ValueChangedEventArgs e)
{
    if (e.NewValue == 0)
    {
        OptionalRatingText.Text = "Not rated";
    }
    else
    {
        OptionalRatingText.Text = $"Rating: {e.NewValue} stars";
    }
}
```

**Mandatory Rating (Clear Disabled):**
```xaml
<StackPanel>
    <TextBlock Text="Rate this item (required):"/>
    <syncfusion:SfRating 
        Value="0"
        ItemsCount="5"
        IsClearEnabled="False"/>
    <TextBlock 
        Text="* Required field"
        Foreground="Red"
        FontSize="12"
        Margin="0,5,0,0"/>
</StackPanel>
```

## Placeholder Value

Display an initial value (like an average rating) before the user provides their own rating using the `PlaceholderValue` property.

**Property:** `PlaceholderValue`  
**Type:** `double`  
**Default:** `0`

### Setting Placeholder Value

**XAML:**
```xaml
<syncfusion:SfRating 
    ItemsCount="5" 
    PlaceholderValue="3.5"
    Precision="Half"/>
```

**C#:**
```csharp
SfRating rating = new SfRating();
rating.ItemsCount = 5;
rating.PlaceholderValue = 3.5;
rating.Precision = RatingPrecision.Half;
```

### How It Works

- **Before user interaction:** Shows `PlaceholderValue` (typically average rating)
- **After user interaction:** Shows user's selected `Value`
- **Visual difference:** Placeholder appears lighter/different from actual rating

### Use Cases

**Show Average Before User Rates:**
```xaml
<StackPanel Spacing="10">
    <TextBlock Text="Community average: 4.2 stars"/>
    <TextBlock Text="Your rating:"/>
    <syncfusion:SfRating 
        x:Name="UserRating"
        Value="0"
        PlaceholderValue="4.2"
        ItemsCount="5"
        Precision="Exact"
        ValueChanged="UserRating_ValueChanged"/>
</StackPanel>
```

```csharp
private void UserRating_ValueChanged(object sender, ValueChangedEventArgs e)
{
    if (e.NewValue > 0)
    {
        // User has provided their rating
        SaveUserRating(e.NewValue);
    }
}
```

**Product Page with Average:**
```xaml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="Auto"/>
    </Grid.RowDefinitions>
    
    <TextBlock 
        Grid.Row="0"
        Text="{Binding ProductName}" 
        FontSize="20" 
        FontWeight="Bold"/>
    
    <TextBlock 
        Grid.Row="1"
        Text="{Binding AverageRating, StringFormat='Average rating: {0:0.0} ({1} reviews)', TargetNullValue='No reviews yet'}"
        Margin="0,5,0,10"/>
    
    <StackPanel Grid.Row="2">
        <TextBlock Text="Rate this product:"/>
        <syncfusion:SfRating 
            Value="{Binding UserRating, Mode=TwoWay}"
            PlaceholderValue="{Binding AverageRating}"
            ItemsCount="5"
            Precision="Half"/>
    </StackPanel>
</Grid>
```

## Combining Customizations

Create sophisticated rating controls by combining multiple customization options.

### Premium Product Rating

```xaml
<Page.Resources>
    <Style TargetType="Path" x:Key="goldRatedStyle">
        <Setter Property="Fill" Value="#FFD700"/>
        <Setter Property="Stroke" Value="#FFA500"/>
        <Setter Property="StrokeThickness" Value="2"/>
    </Style>
    <Style TargetType="Path" x:Key="transparentUnratedStyle">
        <Setter Property="Fill" Value="Transparent"/>
        <Setter Property="Stroke" Value="#CCCCCC"/>
        <Setter Property="StrokeThickness" Value="2"/>
    </Style>
</Page.Resources>

<StackPanel Spacing="15">
    <TextBlock 
        Text="Premium Product Rating" 
        FontSize="18" 
        FontWeight="Bold"/>
    
    <syncfusion:SfRating 
        Value="0"
        PlaceholderValue="4.5"
        ItemsCount="5"
        Precision="Half"
        ItemSize="45"
        RatedItemStyle="{StaticResource goldRatedStyle}"
        UnratedItemStyle="{StaticResource transparentUnratedStyle}"
        EnableToolTip="True"
        ToolTipFormat="0.0"
        IsClearEnabled="True"/>
</StackPanel>
```

### Compact List Item Rating

```xaml
<syncfusion:SfRating 
    Value="{Binding Rating}"
    ItemsCount="5"
    Precision="Half"
    ItemSize="16"
    IsReadOnly="True"
    RatedItemStyle="{StaticResource compactRatedStyle}"
    UnratedItemStyle="{StaticResource compactUnratedStyle}"/>
```

### Large Touch-Friendly Rating

```xaml
<syncfusion:SfRating 
    Value="0"
    ItemsCount="5"
    Precision="Full"
    ItemSize="70"
    IsClearEnabled="False"
    EnableToolTip="True"/>
```

## Best Practices

### Styling
- Keep rated items visually distinct from unrated items
- Use appropriate color contrast for accessibility
- Test styles in both light and dark themes
- Consider using theme resources for automatic adaptation

### Sizing
- Use consistent sizes across similar contexts
- Scale appropriately for touch vs mouse interfaces
- Ensure adequate spacing between items at all sizes

### Orientation
- Use horizontal for most cases (more familiar)
- Use vertical only when space is constrained horizontally
- Maintain consistent orientation within a view

### Read-Only
- Always set `IsReadOnly="True"` for display-only ratings
- Provide visual differentiation between editable and read-only
- Consider reduced opacity or size for read-only ratings

### Clear Functionality
- Enable clearing for optional ratings
- Disable clearing for required ratings
- Provide clear indication of rating requirement

### Placeholder Values
- Show community averages to guide expectations
- Update placeholder dynamically as averages change
- Ensure placeholder is visually distinct from user rating

## Summary

Key customization properties:
- **RatedItemStyle/UnratedItemStyle** - Visual appearance
- **ItemSize** - Control size (16-70px typical)
- **Orientation** - Layout direction
- **IsReadOnly** - Display vs input mode
- **IsClearEnabled** - Allow clearing ratings
- **PlaceholderValue** - Show initial/average value

Combine these properties to create rating controls perfectly suited to your application's needs.

````
