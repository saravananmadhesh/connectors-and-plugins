# Badge Customization

## Table of Contents
- [Overview](#overview)
- [Custom Colors](#custom-colors)
- [Custom Shapes](#custom-shapes)
- [Custom UI with ContentTemplate](#custom-ui-with-contenttemplate)
- [Stroke Customization](#stroke-customization)
- [Text Formatting](#text-formatting)
- [Size Control](#size-control)
- [Rotation](#rotation)
- [Opacity](#opacity)
- [Visibility Control](#visibility-control)
- [Complete Custom Examples](#complete-custom-examples)
- [Best Practices](#best-practices)

## Overview

Beyond the predefined shapes and fill colors, the Badge control offers extensive customization options for complete control over appearance. Use custom styling when:
- Brand colors are required
- Predefined fills don't match your design
- You need unique badge shapes
- Complex content requires custom templates
- Specific visual effects are needed

## Custom Colors

Replace predefined `Fill` colors with custom background and foreground colors.

### Background Property

Set any custom color for badge background:

```xaml
<notification:SfBadge Content="10"
                     Background="Black"/>
```

**Using color hex values:**
```xaml
<notification:SfBadge Content="10"
                     Background="#FF6B35"/>
```

**Using system colors:**
```xaml
<notification:SfBadge Content="10"
                     Background="{ThemeResource SystemAccentColor}"/>
```

**In C#:**
```csharp
badge.Background = new SolidColorBrush(Colors.Black);
badge.Background = new SolidColorBrush(Color.FromArgb(255, 255, 107, 53));
```

### Foreground Property

Control text/content color:

```xaml
<notification:SfBadge Content="10"
                     Background="Black"
                     Foreground="Yellow"/>
```

**In C#:**
```csharp
badge.Background = new SolidColorBrush(Colors.Black);
badge.Foreground = new SolidColorBrush(Colors.Yellow);
```

### Auto-Contrasting Foreground

When you set only `Background`, the Badge automatically assigns a contrasting foreground color for readability:

```xaml
<!-- Badge will automatically choose white or black text -->
<notification:SfBadge Content="10"
                     Background="#2E86DE"/>
```

### Background vs Fill

**Important:** Setting `Background` overrides the `Fill` property.

```xaml
<!-- Fill is ignored when Background is set -->
<notification:SfBadge Content="10"
                     Fill="Success"
                     Background="Purple"/>
<!-- Result: Purple background, not green -->
```

**Rule:** Use either `Fill` (predefined colors) OR `Background` (custom colors), not both.

### Custom Color Examples

**Brand Colors:**
```xaml
<notification:SfBadge Content="Pro"
                     Background="#6C5CE7"
                     Foreground="White"
                     Shape="Rectangle"/>
```

**Gradient Background (with SolidColorBrush alternative):**
```csharp
// For gradient, use custom template (see ContentTemplate section)
var brush = new LinearGradientBrush();
brush.GradientStops.Add(new GradientStop { Color = Colors.Orange, Offset = 0 });
brush.GradientStops.Add(new GradientStop { Color = Colors.Red, Offset = 1 });
badge.Background = brush;
```

**Theme-Aware Colors:**
```xaml
<notification:SfBadge Content="5"
                     Background="{ThemeResource SystemAccentColorLight1}"
                     Foreground="{ThemeResource SystemAccentColorDark3}"/>
```

## Custom Shapes

Create completely custom badge shapes beyond the predefined options.

### Using CustomShape Property

Define custom geometry using path data:

```xaml
<notification:SfBadge Shape="Custom"
                     CustomShape="M16,0C17.3,0.5 18.4,1.6 19.2,3.3 19.3,3.3..."
                     Content="10"
                     Width="50"
                     Height="30"/>
```

### Star Shape Example

```xaml
<notification:SfBadge Shape="Custom"
                     CustomShape="M10,0 L12,7 L20,7 L14,12 L16,20 L10,15 L4,20 L6,12 L0,7 L8,7 Z"
                     Content="5"
                     Width="40"
                     Height="40"
                     Fill="Warning"/>
```

### Heart Shape Example

```xaml
<notification:SfBadge Shape="Custom"
                     CustomShape="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                     Content="♥"
                     Width="45"
                     Height="45"
                     Background="Red"
                     Foreground="White"/>
```

### Shield/Badge Shape

```xaml
<notification:SfBadge Shape="Custom"
                     CustomShape="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z"
                     Content="✓"
                     Width="40"
                     Height="48"
                     Fill="Success"/>
```

### Creating Custom Geometries

**Methods to create path data:**

1. **Design tools** - Export from Adobe Illustrator, Inkscape
2. **Online converters** - SVG to XAML converters
3. **Expression Design** (legacy Microsoft tool)
4. **Manual paths** - Write path data directly (advanced)

**In C#:**
```csharp
badge.Shape = BadgeShape.Custom;
badge.CustomShape = Geometry.Parse("M10,0 L12,7 L20,7 L14,12 L16,20 L10,15 L4,20 L6,12 L0,7 L8,7 Z");
```

## Custom UI with ContentTemplate

Override the entire badge content with a custom template.

### Basic ContentTemplate

```xaml
<notification:SfBadge Content="10">
    <notification:SfBadge.ContentTemplate>
        <DataTemplate>
            <Grid Background="Yellow">
                <TextBlock Text="{Binding}" 
                          Foreground="Red"
                          FontWeight="Bold"/>
            </Grid>
        </DataTemplate>
    </notification:SfBadge.ContentTemplate>
</notification:SfBadge>
```

**DataContext:** The `{Binding}` in ContentTemplate binds to the `Content` property value.

### Icon + Text Template

```xaml
<notification:SfBadge Content="New">
    <notification:SfBadge.ContentTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="4">
                <FontIcon Glyph="&#xE735;" FontSize="12"/>
                <TextBlock Text="{Binding}" FontSize="12"/>
            </StackPanel>
        </DataTemplate>
    </notification:SfBadge.ContentTemplate>
</notification:SfBadge>
```

### Gradient Background Template

```xaml
<notification:SfBadge Content="VIP">
    <notification:SfBadge.ContentTemplate>
        <DataTemplate>
            <Grid>
                <Grid.Background>
                    <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
                        <GradientStop Color="#FFD700" Offset="0"/>
                        <GradientStop Color="#FFA500" Offset="1"/>
                    </LinearGradientBrush>
                </Grid.Background>
                <TextBlock Text="{Binding}" 
                          Foreground="White"
                          FontWeight="Bold"
                          HorizontalAlignment="Center"
                          VerticalAlignment="Center"/>
            </Grid>
        </DataTemplate>
    </notification:SfBadge.ContentTemplate>
</notification:SfBadge>
```

### Animated Content Template

```xaml
<notification:SfBadge Content="!">
    <notification:SfBadge.ContentTemplate>
        <DataTemplate>
            <Viewbox>
                <TextBlock Text="{Binding}" 
                          Foreground="White">
                    <TextBlock.RenderTransform>
                        <RotateTransform Angle="0" CenterX="10" CenterY="10"/>
                    </TextBlock.RenderTransform>
                    <TextBlock.Resources>
                        <Storyboard x:Name="pulseAnimation" RepeatBehavior="Forever">
                            <DoubleAnimation Storyboard.TargetProperty="(UIElement.RenderTransform).(RotateTransform.Angle)"
                                           From="0" To="360" Duration="0:0:2"/>
                        </Storyboard>
                    </TextBlock.Resources>
                </TextBlock>
            </Viewbox>
        </DataTemplate>
    </notification:SfBadge.ContentTemplate>
</notification:SfBadge>
```

### Image Content Template

```xaml
<notification:SfBadge Content="/Assets/icon.png">
    <notification:SfBadge.ContentTemplate>
        <DataTemplate>
            <Image Source="{Binding}" 
                   Stretch="UniformToFill"/>
        </DataTemplate>
    </notification:SfBadge.ContentTemplate>
</notification:SfBadge>
```

## Stroke Customization

Add borders to badges with the stroke properties.

### Stroke Property

**Default:** null (no stroke)

```xaml
<notification:SfBadge Content="10"
                     Stroke="Red"
                     StrokeThickness="3"
                     Background="White"
                     Foreground="Red"/>
```

### StrokeThickness Property

**Default:** 0

```xaml
<!-- Thin border -->
<notification:SfBadge Content="10"
                     Stroke="Black"
                     StrokeThickness="1"
                     Background="White"/>

<!-- Thick border -->
<notification:SfBadge Content="10"
                     Stroke="Gold"
                     StrokeThickness="4"
                     Background="DarkRed"
                     Foreground="Gold"/>
```

**In C#:**
```csharp
badge.Stroke = new SolidColorBrush(Colors.Red);
badge.StrokeThickness = 3;
```

### Stroke Examples

**Outlined Badge:**
```xaml
<notification:SfBadge Content="Pro"
                     Background="Transparent"
                     Foreground="Blue"
                     Stroke="Blue"
                     StrokeThickness="2"
                     Shape="Rectangle"/>
```

**Double Border Effect:**
```xaml
<Border BorderBrush="Gold" 
        BorderThickness="3" 
        CornerRadius="15">
    <notification:SfBadge Content="Premium"
                         Background="Black"
                         Foreground="Gold"
                         Stroke="Gold"
                         StrokeThickness="1"
                         Padding="10,5"/>
</Border>
```

## Text Formatting

Customize badge text appearance with font properties.

### FontFamily

Change the font:

```xaml
<notification:SfBadge Content="10"
                     FontFamily="Arial"/>

<notification:SfBadge Content="10"
                     FontFamily="Consolas"/>

<notification:SfBadge Content="Elegant"
                     FontFamily="Segoe Script"/>
```

**In C#:**
```csharp
badge.FontFamily = new FontFamily("Arial");
badge.FontFamily = new FontFamily("Consolas");
```

### FontSize

**Default:** 14

```xaml
<!-- Small badge -->
<notification:SfBadge Content="5"
                     FontSize="10"/>

<!-- Large badge -->
<notification:SfBadge Content="99+"
                     FontSize="20"/>
```

**In C#:**
```csharp
badge.FontSize = 20;
```

### FontStyle

**Values:** Normal (default), Italic, Oblique

```xaml
<notification:SfBadge Content="NEW"
                     FontStyle="Italic"/>

<notification:SfBadge Content="BETA"
                     FontStyle="Oblique"/>
```

**In C#:**
```csharp
badge.FontStyle = Windows.UI.Text.FontStyle.Italic;
```

### FontWeight

```xaml
<!-- Light text -->
<notification:SfBadge Content="10"
                     FontWeight="Light"/>

<!-- Bold text -->
<notification:SfBadge Content="10"
                     FontWeight="Bold"/>

<!-- Extra bold text -->
<notification:SfBadge Content="10"
                     FontWeight="ExtraBold"/>
```

**In C#:**
```csharp
badge.FontWeight = FontWeights.Bold;
```

### Combined Text Formatting

```xaml
<notification:SfBadge Content="PREMIUM"
                     FontFamily="Segoe UI"
                     FontSize="16"
                     FontWeight="Bold"
                     FontStyle="Normal"
                     Background="Gold"
                     Foreground="Black"/>
```

## Size Control

Control badge dimensions explicitly.

### Width and Height

**Defaults:** Width=40, Height=30

```xaml
<!-- Small badge -->
<notification:SfBadge Content="5"
                     Width="24"
                     Height="24"
                     Shape="Ellipse"/>

<!-- Large badge -->
<notification:SfBadge Content="Alert"
                     Width="80"
                     Height="40"/>

<!-- Custom rectangular badge -->
<notification:SfBadge Content="SALE"
                     Width="100"
                     Height="30"
                     Shape="Rectangle"/>
```

**In C#:**
```csharp
badge.Width = 60;
badge.Height = 60;
```

### Auto-Sizing

Leave Width/Height unset for automatic sizing based on content:

```xaml
<!-- Badge automatically sizes to fit content -->
<notification:SfBadge Content="This is a longer text"
                     Padding="10,5"/>
```

### MinWidth and MaxWidth

Constrain auto-sizing:

```xaml
<notification:SfBadge Content="{x:Bind DynamicText, Mode=OneWay}"
                     MinWidth="30"
                     MaxWidth="100"
                     Padding="8,4"/>
```

## Rotation

Rotate badge by any angle.

### Rotation Property

**Default:** 0 (no rotation)  
**Unit:** Degrees

```xaml
<!-- 30-degree rotation -->
<notification:SfBadge Content="SALE"
                     Rotation="30"
                     Fill="Error"
                     Shape="Rectangle"/>

<!-- 45-degree rotation -->
<notification:SfBadge Content="NEW"
                     Rotation="45"/>

<!-- Negative rotation -->
<notification:SfBadge Content="HOT"
                     Rotation="-15"
                     Fill="Warning"/>
```

**In C#:**
```csharp
badge.Rotation = 30;
badge.Rotation = -15;
```

### Rotation Examples

**Diagonal "New" Badge:**
```xaml
<notification:BadgeContainer>
    <notification:BadgeContainer.Content>
        <Image Source="/Assets/product.png" Width="150" Height="150"/>
    </notification:BadgeContainer.Content>
    <notification:BadgeContainer.Badge>
        <notification:SfBadge Content="NEW"
                             Rotation="45"
                             Fill="Success"
                             Shape="Rectangle"
                             HorizontalAlignment="Right"
                             VerticalAlignment="Top"/>
    </notification:BadgeContainer.Badge>
</notification:BadgeContainer>
```

**Ribbon-Style Badge:**
```xaml
<notification:SfBadge Content="FEATURED"
                     Rotation="-25"
                     Background="#E74C3C"
                     Foreground="White"
                     FontWeight="Bold"
                     Padding="15,3"
                     HorizontalAlignment="Left"
                     VerticalAlignment="Top"/>
```

## Opacity

Control badge transparency.

### Opacity Property

**Default:** 1 (fully opaque)  
**Range:** 0 (invisible) to 1 (fully visible)

```xaml
<!-- Semi-transparent badge -->
<notification:SfBadge Content="10"
                     Opacity="0.6"/>

<!-- Very transparent -->
<notification:SfBadge Content="5"
                     Opacity="0.3"/>

<!-- Fully opaque (default) -->
<notification:SfBadge Content="99"
                     Opacity="1"/>
```

**In C#:**
```csharp
badge.Opacity = 0.6;
```

### Opacity Use Cases

**Watermark Effect:**
```xaml
<notification:SfBadge Content="DRAFT"
                     Opacity="0.4"
                     FontSize="24"
                     Foreground="Gray"/>
```

**Fade-In Animation:**
```csharp
// Animate opacity from 0 to 1
var animation = new DoubleAnimation
{
    From = 0,
    To = 1,
    Duration = TimeSpan.FromSeconds(0.5)
};
Storyboard.SetTarget(animation, badge);
Storyboard.SetTargetProperty(animation, "Opacity");
var storyboard = new Storyboard();
storyboard.Children.Add(animation);
storyboard.Begin();
```

## Visibility Control

Show or hide badges.

### Visibility Property

**Values:** Visible, Collapsed

```xaml
<!-- Visible badge -->
<notification:SfBadge Content="10"
                     Visibility="Visible"/>

<!-- Hidden badge -->
<notification:SfBadge Content="10"
                     Visibility="Collapsed"/>
```

**Conditional visibility:**
```xaml
<notification:SfBadge Content="{x:Bind UnreadCount, Mode=OneWay}"
                     Visibility="{x:Bind HasUnreadMessages, Mode=OneWay}"/>
```

**In C#:**
```csharp
// Show badge
badge.Visibility = Visibility.Visible;

// Hide badge
badge.Visibility = Visibility.Collapsed;

// Conditional
badge.Visibility = (count > 0) ? Visibility.Visible : Visibility.Collapsed;
```

### Auto-Hide with Null Content

Badge automatically hides when Content is null:

```csharp
// Hide badge
badge.Content = null;

// Show badge
badge.Content = "10";
```

## Complete Custom Examples

### Example 1: Brand Badge

```xaml
<notification:SfBadge Content="PREMIUM"
                     Background="#6C5CE7"
                     Foreground="White"
                     FontFamily="Segoe UI"
                     FontSize="14"
                     FontWeight="Bold"
                     Shape="Rectangle"
                     Padding="12,4"
                     Stroke="White"
                     StrokeThickness="2"/>
```

### Example 2: Notification Counter with Custom Style

```xaml
<notification:BadgeContainer>
    <notification:BadgeContainer.Content>
        <Button Width="100" Height="40">
            <StackPanel Orientation="Horizontal" Spacing="8">
                <SymbolIcon Symbol="Mail"/>
                <TextBlock Text="Inbox"/>
            </StackPanel>
        </Button>
    </notification:BadgeContainer.Content>
    <notification:BadgeContainer.Badge>
        <notification:SfBadge Content="{x:Bind UnreadCount, Mode=OneWay}"
                             Background="#E74C3C"
                             Foreground="White"
                             FontSize="12"
                             FontWeight="Bold"
                             Shape="Ellipse"
                             Width="24"
                             Height="24"
                             HorizontalAlignment="Right"
                             VerticalAlignment="Top"
                             HorizontalAnchor="Outside"
                             VerticalAnchor="Center"/>
    </notification:BadgeContainer.Badge>
</notification:BadgeContainer>
```

### Example 3: Status Badge with Pulse Effect

```xaml
<notification:SfBadge Content="LIVE"
                     Background="Red"
                     Foreground="White"
                     FontWeight="Bold"
                     FontSize="11"
                     Shape="Rectangle"
                     Padding="8,3"
                     x:Name="liveBadge">
    <!-- Add pulse animation in code-behind -->
</notification:SfBadge>
```

```csharp
// Pulse animation
var pulseAnimation = new DoubleAnimationUsingKeyFrames();
pulseAnimation.KeyFrames.Add(new EasingDoubleKeyFrame { KeyTime = KeyTime.FromTimeSpan(TimeSpan.FromSeconds(0)), Value = 1 });
pulseAnimation.KeyFrames.Add(new EasingDoubleKeyFrame { KeyTime = KeyTime.FromTimeSpan(TimeSpan.FromSeconds(0.5)), Value = 0.6 });
pulseAnimation.KeyFrames.Add(new EasingDoubleKeyFrame { KeyTime = KeyTime.FromTimeSpan(TimeSpan.FromSeconds(1)), Value = 1 });
pulseAnimation.RepeatBehavior = RepeatBehavior.Forever;

Storyboard.SetTarget(pulseAnimation, liveBadge);
Storyboard.SetTargetProperty(pulseAnimation, "Opacity");

var storyboard = new Storyboard();
storyboard.Children.Add(pulseAnimation);
storyboard.Begin();
```

### Example 4: Rotated "Sale" Banner

```xaml
<notification:BadgeContainer>
    <notification:BadgeContainer.Content>
        <Image Source="/Assets/product.png" Width="200" Height="200"/>
    </notification:BadgeContainer.Content>
    <notification:BadgeContainer.Badge>
        <notification:SfBadge Content="50% OFF"
                             Rotation="-25"
                             Background="#FF6B35"
                             Foreground="White"
                             FontSize="16"
                             FontWeight="Bold"
                             Shape="Rectangle"
                             Padding="20,6"
                             Stroke="White"
                             StrokeThickness="2"
                             HorizontalAlignment="Left"
                             VerticalAlignment="Top"
                             HorizontalPosition="0.1"
                             VerticalPosition="0.15"/>
    </notification:BadgeContainer.Badge>
</notification:BadgeContainer>
```

## Best Practices

1. **Choose Background OR Fill** - Don't use both; Background overrides Fill
2. **Maintain contrast** - Ensure text is readable against background
3. **Consistent sizing** - Use similar sizes for badges with the same purpose
4. **Limit custom shapes** - Use sparingly for brand consistency
5. **Test with themes** - Verify custom colors work in Light and Dark modes
6. **Use theme resources** - Consider `{ThemeResource}` for dynamic theming
7. **Keep strokes subtle** - Thick strokes can make text hard to read
8. **Font readability** - Not all fonts work well at small sizes
9. **Auto-size when possible** - Let badges size to content unless specific dimensions required
10. **Rotation for emphasis** - Use rotation sparingly for "New" or "Sale" badges
11. **Opacity for hierarchy** - Lower opacity for less important badges
12. **ContentTemplate for complex UI** - Use templates for icons, images, or multi-element badges

## Summary

| Customization | Properties | Use Cases |
|--------------|-----------|-----------|
| **Colors** | Background, Foreground | Brand colors, custom themes |
| **Shapes** | CustomShape (with Shape="Custom") | Unique designs, brand identity |
| **Templates** | ContentTemplate | Complex content, icons, images |
| **Borders** | Stroke, StrokeThickness | Outlined badges, emphasis |
| **Text** | FontFamily, FontSize, FontStyle, FontWeight | Typography, readability |
| **Size** | Width, Height, MinWidth, MaxWidth | Fixed or constrained dimensions |
| **Transform** | Rotation | Diagonal badges, visual interest |
| **Visibility** | Opacity, Visibility | Show/hide, fade effects |
