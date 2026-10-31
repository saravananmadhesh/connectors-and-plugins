# Customization in WinUI Shadow

The WinUI Shadow control provides extensive customization options to create various shadow effects. This guide covers all available properties and techniques for customizing shadow appearance.

## Table of Contents
- [Shadow Color](#shadow-color)
- [Blur Radius](#blur-radius)
- [Corner Radius](#corner-radius)
- [Shadow Position](#shadow-position)
- [Enable/Disable Shadow](#enabledisable-shadow)
- [Combining Properties](#combining-properties)
- [Advanced Techniques](#advanced-techniques)

## Shadow Color

Customize the shadow color using the `Color` property to match your design theme or create specific visual effects.

**Property:** `Color`  
**Type:** `Windows.UI.Color`  
**Default:** Black with 25% alpha (`#40000000`)

### Basic Color Customization

**XAML:**
```xml
<syncfusion:SfShadow Color="Red">
    <Button Height="50" Width="100" Content="Button"/>
</syncfusion:SfShadow>
```

**C#:**
```csharp
using Windows.UI;

SfShadow shadow = new SfShadow();
shadow.Color = Color.FromArgb(255, 255, 0, 0); // Red

Button button = new Button();
button.Height = 50;
button.Width = 100;
button.Content = "Button";
shadow.Content = button;
```

### Using Color with Transparency

For realistic shadows, always use semi-transparent colors:

**XAML:**
```xml
<!-- Blue shadow with 40% opacity -->
<syncfusion:SfShadow Color="#660000FF">
    <Button Content="Blue Shadow"/>
</syncfusion:SfShadow>

<!-- Dark gray shadow with 30% opacity -->
<syncfusion:SfShadow Color="#4D333333">
    <Button Content="Gray Shadow"/>
</syncfusion:SfShadow>
```

**C#:**
```csharp
// Blue shadow with 40% opacity (0.4 * 255 = 102)
shadow.Color = Color.FromArgb(102, 0, 0, 255);

// Dark gray with 30% opacity (0.3 * 255 = 77)
shadow.Color = Color.FromArgb(77, 51, 51, 51);
```

### Color Best Practices

**Light Backgrounds:**
- Use dark shadows: `#40000000` (black, 25% opacity)
- For colored shadows: `#66<color>` (40% opacity)

**Dark Backgrounds:**
- Use lighter shadows or reduce opacity: `#1A000000` (black, 10% opacity)
- Consider subtle colored shadows: `#33FFFFFF` (white, 20% opacity)

**Themed Shadows:**
```xml
<!-- Adapts to theme automatically -->
<syncfusion:SfShadow Color="{ThemeResource SystemAccentColor}">
    <Button Content="Themed Shadow"/>
</syncfusion:SfShadow>
```

## Blur Radius

Control the blur intensity to create soft or sharp shadow effects.

**Property:** `BlurRadius`  
**Type:** `double`  
**Default:** `8`  
**Range:** `0` to any positive value

### Setting Blur Radius

**XAML:**
```xml
<syncfusion:SfShadow 
    BlurRadius="10" 
    OffsetX="10" 
    OffsetY="10">
    <Button Height="50" Width="100" Content="Button"/>
</syncfusion:SfShadow>
```

**C#:**
```csharp
SfShadow shadow = new SfShadow();
shadow.BlurRadius = 10;
shadow.OffsetX = 10;
shadow.OffsetY = 10;

Button button = new Button();
button.Height = 50;
button.Width = 100;
button.Content = "Button";
shadow.Content = button;
```

### Blur Radius Guidelines

**Sharp Shadows (0-4):**
```xml
<syncfusion:SfShadow BlurRadius="2" OffsetX="2" OffsetY="2">
    <Button Content="Sharp Shadow"/>
</syncfusion:SfShadow>
```
- Use for: Low elevation, precise effects
- Visual: Clear, defined edges

**Standard Shadows (5-12):**
```xml
<syncfusion:SfShadow BlurRadius="8" OffsetX="4" OffsetY="4">
    <Button Content="Standard Shadow"/>
</syncfusion:SfShadow>
```
- Use for: Normal elevation, general purpose
- Visual: Balanced soft edges

**Soft Shadows (13+):**
```xml
<syncfusion:SfShadow BlurRadius="20" OffsetX="0" OffsetY="10">
    <Button Content="Soft Shadow"/>
</syncfusion:SfShadow>
```
- Use for: High elevation, dramatic effects
- Visual: Very soft, diffused edges

### Material Design Elevation

Implement Material Design elevation levels using blur radius:

```xml
<!-- Level 1: Resting (2dp) -->
<syncfusion:SfShadow BlurRadius="4" OffsetY="2">
    <Button Content="Level 1"/>
</syncfusion:SfShadow>

<!-- Level 2: Raised (4dp) -->
<syncfusion:SfShadow BlurRadius="8" OffsetY="4">
    <Button Content="Level 2"/>
</syncfusion:SfShadow>

<!-- Level 3: Elevated (8dp) -->
<syncfusion:SfShadow BlurRadius="16" OffsetY="8">
    <Button Content="Level 3"/>
</syncfusion:SfShadow>

<!-- Level 4: Floating (16dp) -->
<syncfusion:SfShadow BlurRadius="32" OffsetY="16">
    <Button Content="Level 4"/>
</syncfusion:SfShadow>
```

## Corner Radius

Match the shadow's corner radius to your content for seamless visual integration.

**Property:** `ShadowCornerRadius`  
**Type:** `double`  
**Default:** `0`

### Basic Corner Radius

**XAML:**
```xml
<syncfusion:SfShadow 
    ShadowCornerRadius="10" 
    OffsetX="10" 
    OffsetY="10">
    <Button Height="50" Width="100" Content="Button" CornerRadius="10"/>
</syncfusion:SfShadow>
```

**C#:**
```csharp
SfShadow shadow = new SfShadow();
shadow.ShadowCornerRadius = 10;
shadow.OffsetX = 10;
shadow.OffsetY = 10;

Button button = new Button();
button.Height = 50;
button.Width = 100;
button.Content = "Button";
button.CornerRadius = new CornerRadius(10);
shadow.Content = button;
```

### Matching Content Corner Radius

**Critical:** Always match `ShadowCornerRadius` to the content's `CornerRadius` for a natural appearance.

**Rounded Button:**
```xml
<syncfusion:SfShadow ShadowCornerRadius="8">
    <Button Content="Rounded" CornerRadius="8"/>
</syncfusion:SfShadow>
```

**Circular Button:**
```xml
<syncfusion:SfShadow ShadowCornerRadius="25">
    <Button Height="50" Width="50" Content="+" CornerRadius="25"/>
</syncfusion:SfShadow>
```

**Card with Rounded Corners:**
```xml
<syncfusion:SfShadow ShadowCornerRadius="12">
    <Border CornerRadius="12" Background="White" Padding="20">
        <TextBlock Text="Card Content"/>
    </Border>
</syncfusion:SfShadow>
```

### Different Corner Radius Styles

**Pill-shaped:**
```xml
<syncfusion:SfShadow ShadowCornerRadius="25">
    <Button Height="50" Width="150" Content="Pill Button" CornerRadius="25"/>
</syncfusion:SfShadow>
```

**Subtle Rounding:**
```xml
<syncfusion:SfShadow ShadowCornerRadius="4">
    <Button Content="Subtle Rounded" CornerRadius="4"/>
</syncfusion:SfShadow>
```

## Shadow Position

Control shadow direction and distance using `OffsetX` and `OffsetY` properties.

**Properties:** `OffsetX`, `OffsetY`  
**Type:** `double`  
**Default:** `4` for both

### Basic Positioning

**XAML:**
```xml
<syncfusion:SfShadow OffsetX="10" OffsetY="10">
    <Button Height="50" Width="100" Content="Button"/>
</syncfusion:SfShadow>
```

**C#:**
```csharp
SfShadow shadow = new SfShadow();
shadow.OffsetX = 10;
shadow.OffsetY = 10;

Button button = new Button();
button.Height = 50;
button.Width = 100;
button.Content = "Button";
shadow.Content = button;
```

### Shadow Direction Patterns

**Drop Shadow (Bottom):**
```xml
<syncfusion:SfShadow OffsetX="0" OffsetY="8" BlurRadius="12">
    <Button Content="Drop Shadow"/>
</syncfusion:SfShadow>
```
- Use for: Standard elevation effect
- Light source: Top

**Bottom-Right Shadow:**
```xml
<syncfusion:SfShadow OffsetX="6" OffsetY="6" BlurRadius="10">
    <Button Content="Bottom-Right"/>
</syncfusion:SfShadow>
```
- Use for: Natural, balanced depth
- Light source: Top-left (most common)

**Bottom-Left Shadow:**
```xml
<syncfusion:SfShadow OffsetX="-6" OffsetY="6" BlurRadius="10">
    <Button Content="Bottom-Left"/>
</syncfusion:SfShadow>
```
- Use for: Unusual lighting scenarios
- Light source: Top-right

**Inner Glow Effect:**
```xml
<syncfusion:SfShadow OffsetX="0" OffsetY="0" BlurRadius="15" Color="#4400FF00">
    <Border Background="White" CornerRadius="8" Padding="20">
        <TextBlock Text="Glowing Card"/>
    </Border>
</syncfusion:SfShadow>
```
- Use for: Highlighting, emphasis
- Creates halo effect

**Long Shadow:**
```xml
<syncfusion:SfShadow OffsetX="20" OffsetY="20" BlurRadius="5">
    <Button Content="Long Shadow"/>
</syncfusion:SfShadow>
```
- Use for: Dramatic depth
- Strong directional effect

### Distance and Elevation

Match offset values to perceived elevation:

**Low Elevation:**
```xml
<syncfusion:SfShadow OffsetX="2" OffsetY="2" BlurRadius="4">
    <Button Content="Low"/>
</syncfusion:SfShadow>
```

**Medium Elevation:**
```xml
<syncfusion:SfShadow OffsetX="4" OffsetY="4" BlurRadius="8">
    <Button Content="Medium"/>
</syncfusion:SfShadow>
```

**High Elevation:**
```xml
<syncfusion:SfShadow OffsetX="8" OffsetY="8" BlurRadius="16">
    <Button Content="High"/>
</syncfusion:SfShadow>
```

## Enable/Disable Shadow

Dynamically control shadow visibility using the `EnableShadow` property.

**Property:** `EnableShadow`  
**Type:** `bool`  
**Default:** `true`

### Basic Usage

**XAML:**
```xml
<syncfusion:SfShadow EnableShadow="False">
    <Button Height="50" Width="100" Content="No Shadow"/>
</syncfusion:SfShadow>
```

**C#:**
```csharp
SfShadow shadow = new SfShadow();
shadow.EnableShadow = false; // Shadow hidden

Button button = new Button();
button.Height = 50;
button.Width = 100;
button.Content = "No Shadow";
shadow.Content = button;
```

### Conditional Shadow Display

**Data Binding:**
```xml
<syncfusion:SfShadow EnableShadow="{Binding IsElevated}">
    <Button Content="Conditional Shadow"/>
</syncfusion:SfShadow>
```

**Toggle Shadow on Click:**
```csharp
private void ToggleButton_Click(object sender, RoutedEventArgs e)
{
    shadow.EnableShadow = !shadow.EnableShadow;
}
```

### Use Cases for EnableShadow

**Performance Optimization:**
```csharp
// Disable shadows during animations for better performance
void StartAnimation()
{
    shadow.EnableShadow = false;
    // Run animation
}

void EndAnimation()
{
    shadow.EnableShadow = true;
}
```

**State-Based Shadows:**
```xml
<!-- Show shadow only when button is enabled -->
<syncfusion:SfShadow EnableShadow="{Binding ElementName=ActionButton, Path=IsEnabled}">
    <Button x:Name="ActionButton" Content="Action"/>
</syncfusion:SfShadow>
```

**Theme-Based Display:**
```csharp
// Show shadows only in light theme
void UpdateShadowForTheme(ElementTheme theme)
{
    shadow.EnableShadow = (theme == ElementTheme.Light);
}
```

## Combining Properties

Create sophisticated shadow effects by combining multiple properties.

### Professional Card Shadow

```xml
<syncfusion:SfShadow 
    Color="#33000000"
    BlurRadius="16"
    OffsetX="0"
    OffsetY="4"
    ShadowCornerRadius="8">
    <Border 
        Background="White"
        CornerRadius="8"
        Padding="20"
        Width="300"
        Height="200">
        <StackPanel>
            <TextBlock Text="Card Title" FontSize="20" FontWeight="Bold"/>
            <TextBlock Text="Card content..." Margin="0,10,0,0"/>
        </StackPanel>
    </Border>
</syncfusion:SfShadow>
```

### Floating Action Button

```xml
<syncfusion:SfShadow
    Color="#66000000"
    BlurRadius="20"
    OffsetX="0"
    OffsetY="8"
    ShadowCornerRadius="28">
    <Button
        Height="56"
        Width="56"
        CornerRadius="28"
        Background="{ThemeResource SystemAccentColor}">
        <SymbolIcon Symbol="Add"/>
    </Button>
</syncfusion:SfShadow>
```

### Dramatic Hero Element

```xml
<syncfusion:SfShadow
    Color="#80000000"
    BlurRadius="40"
    OffsetX="0"
    OffsetY="20"
    ShadowCornerRadius="0">
    <Image Source="/Assets/hero.png" Height="300" Width="500"/>
</syncfusion:SfShadow>
```

### Subtle List Item Elevation

```xml
<syncfusion:SfShadow
    Color="#1A000000"
    BlurRadius="6"
    OffsetX="0"
    OffsetY="2"
    ShadowCornerRadius="4">
    <Border CornerRadius="4" Background="White" Padding="15">
        <TextBlock Text="List Item"/>
    </Border>
</syncfusion:SfShadow>
```

## Advanced Techniques

### Layered Shadows

Create depth with multiple shadow layers:

```xml
<Grid>
    <!-- Outer soft shadow -->
    <syncfusion:SfShadow 
        Color="#20000000" 
        BlurRadius="30" 
        OffsetY="15">
        <Grid/>
    </syncfusion:SfShadow>
    
    <!-- Inner defined shadow -->
    <syncfusion:SfShadow 
        Color="#40000000" 
        BlurRadius="8" 
        OffsetY="4"
        ShadowCornerRadius="8">
        <Border CornerRadius="8" Background="White" Padding="20">
            <TextBlock Text="Layered Shadow Card"/>
        </Border>
    </syncfusion:SfShadow>
</Grid>
```

### Animated Shadow Transitions

```xml
<syncfusion:SfShadow x:Name="AnimatedShadow" OffsetY="4" BlurRadius="8">
    <Button Content="Hover Me" PointerEntered="Button_PointerEntered" PointerExited="Button_PointerExited"/>
</syncfusion:SfShadow>
```

```csharp
private void Button_PointerEntered(object sender, PointerRoutedEventArgs e)
{
    AnimatedShadow.OffsetY = 12;
    AnimatedShadow.BlurRadius = 24;
}

private void Button_PointerExited(object sender, PointerRoutedEventArgs e)
{
    AnimatedShadow.OffsetY = 4;
    AnimatedShadow.BlurRadius = 8;
}
```

### Theme-Adaptive Shadows

```xml
<syncfusion:SfShadow x:Name="AdaptiveShadow">
    <Button Content="Adaptive Shadow"/>
</syncfusion:SfShadow>
```

```csharp
private void UpdateShadowForTheme()
{
    var theme = ActualTheme;
    
    if (theme == ElementTheme.Light)
    {
        AdaptiveShadow.Color = Color.FromArgb(64, 0, 0, 0); // Darker shadow
        AdaptiveShadow.BlurRadius = 12;
    }
    else // Dark theme
    {
        AdaptiveShadow.Color = Color.FromArgb(32, 0, 0, 0); // Lighter shadow
        AdaptiveShadow.BlurRadius = 8;
    }
}
```

## Best Practices

### Visual Design
- **Consistency:** Use the same shadow settings for elements at the same elevation
- **Natural light:** Position shadows as if light comes from top-left (most natural)
- **Transparency:** Always use semi-transparent colors for realistic shadows
- **Matching corners:** Ensure `ShadowCornerRadius` matches content's `CornerRadius`

### Performance
- Use `EnableShadow="False"` during animations if performance is impacted
- Reduce blur radius in lists with many shadowed items
- Consider disabling shadows on low-end devices

### Accessibility
- Don't rely on shadows alone to convey information
- Ensure adequate color contrast regardless of shadow
- Provide alternative visual cues

## Troubleshooting

**Shadow looks too harsh:**
- Increase `BlurRadius` (try 12-20)
- Reduce color alpha (try 30-40% opacity)
- Reduce `OffsetX` and `OffsetY`

**Shadow appears clipped:**
- Add `Margin` or `Padding` to parent container
- Ensure parent doesn't have `ClipToBounds="True"`
- Increase container size

**Shadow corners don't match content:**
- Set `ShadowCornerRadius` to match content's `CornerRadius`
- Verify both values are identical

**Performance issues:**
- Reduce number of shadows in view
- Decrease `BlurRadius`
- Use `EnableShadow` to conditionally show shadows
- Avoid shadows on frequently updated elements

## Summary

The WinUI Shadow control offers five main customization properties:

1. **Color** - Shadow tint and transparency
2. **BlurRadius** - Softness/sharpness of edges
3. **ShadowCornerRadius** - Match content rounding
4. **OffsetX/OffsetY** - Direction and distance
5. **EnableShadow** - Show/hide toggle

Combine these properties thoughtfully to create professional, visually appealing shadow effects that enhance your WinUI 3 application's user experience.
