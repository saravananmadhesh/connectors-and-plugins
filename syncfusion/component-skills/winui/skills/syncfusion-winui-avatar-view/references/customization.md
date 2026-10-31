# Customization Options

## Table of Contents
- [Border Customization](#border-customization)
- [Background Customization](#background-customization)
- [Font Customization](#font-customization)
- [Theme Integration](#theme-integration)
- [Advanced Customizations](#advanced-customizations)

## Border Customization

Add borders to avatars using `BorderBrush` and `BorderThickness` properties.

### Basic Border

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="John Doe"
    InitialsType="DoubleCharacter"
    AvatarSize="Large"
    Background="White"
    Foreground="CornflowerBlue"
    BorderBrush="CornflowerBlue"
    BorderThickness="2"/>
```

```csharp
SfAvatarView avatarView = new SfAvatarView
{
    ContentType = AvatarContentType.Initials,
    AvatarName = "John Doe",
    InitialsType = AvatarInitialsType.DoubleCharacter,
    AvatarSize = AvatarSize.Large,
    Background = new SolidColorBrush(Colors.White),
    Foreground = new SolidColorBrush(Colors.CornflowerBlue),
    BorderBrush = new SolidColorBrush(Colors.CornflowerBlue),
    BorderThickness = new Thickness(2)
};
```

### Thick Border for Emphasis

```xaml
<syncfusion:SfAvatarView 
    ContentType="CustomImage"
    ImageSource="profile.jpg"
    AvatarSize="ExtraLarge"
    BorderBrush="Gold"
    BorderThickness="4"/>
```

**Use case:** VIP users, premium members, highlighted profiles.

### Asymmetric Border

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="VIP"
    AvatarSize="Large"
    Background="Black"
    Foreground="Gold"
    BorderBrush="Gold"
    BorderThickness="0,0,0,4"/>
```

**BorderThickness format:** Left, Top, Right, Bottom

### Status Indicator with Border

```xaml
<Grid>
    <syncfusion:SfAvatarView 
        ContentType="CustomImage"
        ImageSource="user.jpg"
        AvatarSize="Large"
        BorderBrush="#FF4CAF50"
        BorderThickness="3"/>
    
    <!-- Online status indicator -->
    <Ellipse 
        Width="16" 
        Height="16" 
        Fill="#FF4CAF50"
        Stroke="White"
        StrokeThickness="2"
        HorizontalAlignment="Right"
        VerticalAlignment="Bottom"/>
</Grid>
```

**Border colors for status:**
- Green (`#FF4CAF50`): Online
- Yellow (`#FFFFC107`): Away
- Red (`#FFF44336`): Busy
- Gray (`#FF9E9E9E`): Offline

## Background Customization

### Solid Color Background

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="Sarah Johnson"
    InitialsType="DoubleCharacter"
    AvatarSize="Large"
    Background="CornflowerBlue"
    Foreground="White"/>
```

**Common background colors:**
```xaml
<!-- Blue -->
Background="CornflowerBlue"

<!-- Material Design colors -->
Background="#FF2196F3"    <!-- Blue -->
Background="#FF4CAF50"    <!-- Green -->
Background="#FFF44336"    <!-- Red -->
Background="#FFFFC107"    <!-- Amber -->
Background="#FF9C27B0"    <!-- Purple -->
Background="#FFFF5722"    <!-- Deep Orange -->
```

### System Accent Color

Use the system accent color for theme consistency:

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="User"
    Background="{ThemeResource SystemAccentColor}"
    Foreground="White"/>
```

### Theme-Aware Background

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="Theme User"
    Background="{ThemeResource CardBackgroundFillColorDefaultBrush}"
    Foreground="{ThemeResource TextFillColorPrimaryBrush}"
    BorderBrush="{ThemeResource CardStrokeColorDefaultBrush}"
    BorderThickness="1"/>
```

**Theme resources adapt to light/dark mode automatically.**

### Linear Gradient Background

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="Emma Watson"
    InitialsType="DoubleCharacter"
    AvatarSize="Large"
    Foreground="White">
    <syncfusion:SfAvatarView.Background>
        <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
            <GradientStop Color="#FF6A5ACD" Offset="0"/>
            <GradientStop Color="#FF4169E1" Offset="1"/>
        </LinearGradientBrush>
    </syncfusion:SfAvatarView.Background>
</syncfusion:SfAvatarView>
```

**StartPoint and EndPoint options:**
- `"0,0"` to `"1,1"`: Top-left to bottom-right (diagonal)
- `"0,0"` to `"1,0"`: Left to right (horizontal)
- `"0,0"` to `"0,1"`: Top to bottom (vertical)
- `"1,0"` to `"0,1"`: Top-right to bottom-left

### Multi-Stop Gradient

```xaml
<syncfusion:SfAvatarView.Background>
    <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
        <GradientStop Color="#FFFF6B6B" Offset="0"/>
        <GradientStop Color="#FFEE5A6F" Offset="0.5"/>
        <GradientStop Color="#FFC44569" Offset="1"/>
    </LinearGradientBrush>
</syncfusion:SfAvatarView.Background>
```

### Radial Gradient Background

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="Gradient"
    AvatarSize="Large"
    Foreground="White">
    <syncfusion:SfAvatarView.Background>
        <RadialGradientBrush>
            <GradientStop Color="#FF4FC3F7" Offset="0"/>
            <GradientStop Color="#FF2196F3" Offset="1"/>
        </RadialGradientBrush>
    </syncfusion:SfAvatarView.Background>
</syncfusion:SfAvatarView>
```

### Gradient Gallery

```xaml
<StackPanel Orientation="Horizontal" Spacing="15">
    <!-- Gradient 1: Blue to Purple -->
    <syncfusion:SfAvatarView 
        ContentType="Initials"
        AvatarName="BP"
        AvatarSize="Large"
        Foreground="White">
        <syncfusion:SfAvatarView.Background>
            <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
                <GradientStop Color="#FF2196F3" Offset="0"/>
                <GradientStop Color="#FF9C27B0" Offset="1"/>
            </LinearGradientBrush>
        </syncfusion:SfAvatarView.Background>
    </syncfusion:SfAvatarView>
    
    <!-- Gradient 2: Green to Teal -->
    <syncfusion:SfAvatarView 
        ContentType="Initials"
        AvatarName="GT"
        AvatarSize="Large"
        Foreground="White">
        <syncfusion:SfAvatarView.Background>
            <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
                <GradientStop Color="#FF4CAF50" Offset="0"/>
                <GradientStop Color="#FF009688" Offset="1"/>
            </LinearGradientBrush>
        </syncfusion:SfAvatarView.Background>
    </syncfusion:SfAvatarView>
    
    <!-- Gradient 3: Orange to Pink -->
    <syncfusion:SfAvatarView 
        ContentType="Initials"
        AvatarName="OP"
        AvatarSize="Large"
        Foreground="White">
        <syncfusion:SfAvatarView.Background>
            <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
                <GradientStop Color="#FFFF9800" Offset="0"/>
                <GradientStop Color="#FFE91E63" Offset="1"/>
            </LinearGradientBrush>
        </syncfusion:SfAvatarView.Background>
    </syncfusion:SfAvatarView>
</StackPanel>
```

### Code-Based Gradient

```csharp
private void ApplyGradientBackground()
{
    LinearGradientBrush gradient = new LinearGradientBrush();
    gradient.StartPoint = new Point(0, 0);
    gradient.EndPoint = new Point(1, 1);
    gradient.GradientStops.Add(new GradientStop 
    { 
        Color = ColorHelper.FromArgb(255, 106, 90, 205), 
        Offset = 0 
    });
    gradient.GradientStops.Add(new GradientStop 
    { 
        Color = ColorHelper.FromArgb(255, 65, 105, 225), 
        Offset = 1 
    });
    
    avatarView.Background = gradient;
}
```

## Font Customization

Customize font appearance for initials using `FontFamily`, `FontSize`, and `Foreground` properties.

### Font Family

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="John Doe"
    InitialsType="DoubleCharacter"
    AvatarSize="Large"
    FontFamily="Segoe UI Variable Static Display"
    Background="Navy"
    Foreground="White"/>
```

**Popular Windows font families:**
- `Segoe UI` (default)
- `Segoe UI Variable Static Display` (modern)
- `Arial`
- `Calibri`
- `Consolas` (monospace)
- `Georgia` (serif)

```csharp
avatarView.FontFamily = new FontFamily("Segoe UI Variable Static Display");
```

### Font Size

Override the auto-calculated font size:

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="XL"
    AvatarSize="ExtraLarge"
    FontSize="48"
    FontWeight="Bold"
    Background="CornflowerBlue"
    Foreground="White"/>
```

**Font size guidelines by AvatarSize:**
- ExtraSmall: 14-18
- Small: 18-22
- Medium: 24-30
- Large: 32-40
- ExtraLarge: 44-56

### Font Weight

```xaml
<StackPanel Orientation="Horizontal" Spacing="15">
    <syncfusion:SfAvatarView 
        ContentType="Initials"
        AvatarName="Light"
        FontWeight="Light"
        AvatarSize="Large"/>
    
    <syncfusion:SfAvatarView 
        ContentType="Initials"
        AvatarName="Normal"
        FontWeight="Normal"
        AvatarSize="Large"/>
    
    <syncfusion:SfAvatarView 
        ContentType="Initials"
        AvatarName="Bold"
        FontWeight="Bold"
        AvatarSize="Large"/>
</StackPanel>
```

**Available weights:** Light, Normal, SemiBold, Bold, ExtraBold

### Foreground (Text Color)

```xaml
<!-- Dark background, light text -->
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="User"
    Background="Black"
    Foreground="White"/>

<!-- Light background, dark text -->
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="User"
    Background="LightGray"
    Foreground="Black"/>

<!-- Colored text -->
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="User"
    Background="White"
    Foreground="CornflowerBlue"
    BorderBrush="CornflowerBlue"
    BorderThickness="2"/>
```

### Gradient Foreground

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="Gradient Text"
    AvatarSize="ExtraLarge"
    Background="White">
    <syncfusion:SfAvatarView.Foreground>
        <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
            <GradientStop Color="#FFFF6B6B" Offset="0"/>
            <GradientStop Color="#FF4ECDC4" Offset="1"/>
        </LinearGradientBrush>
    </syncfusion:SfAvatarView.Foreground>
</syncfusion:SfAvatarView>
```

## Theme Integration

### Adapting to Light/Dark Theme

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="Theme User"
    AvatarSize="Large"
    Background="{ThemeResource CardBackgroundFillColorDefaultBrush}"
    Foreground="{ThemeResource TextFillColorPrimaryBrush}"
    BorderBrush="{ThemeResource CardStrokeColorDefaultBrush}"
    BorderThickness="1"/>
```

**Common theme resources:**
- `SystemAccentColor` - User's chosen accent color
- `SystemAccentColorLight1`, `SystemAccentColorLight2`, `SystemAccentColorLight3`
- `SystemAccentColorDark1`, `SystemAccentColorDark2`, `SystemAccentColorDark3`
- `CardBackgroundFillColorDefaultBrush` - Card background (light/dark aware)
- `TextFillColorPrimaryBrush` - Primary text color
- `CardStrokeColorDefaultBrush` - Border color

### Detecting Theme Changes

```csharp
private void ApplyThemeAwareColors()
{
    var uiSettings = new Windows.UI.ViewManagement.UISettings();
    var foreground = uiSettings.GetColorValue(Windows.UI.ViewManagement.UIColorType.Foreground);
    
    // Check if dark theme (foreground is light)
    bool isDarkTheme = (foreground.R + foreground.G + foreground.B) > 382;
    
    if (isDarkTheme)
    {
        avatarView.Background = new SolidColorBrush(Colors.DarkSlateGray);
        avatarView.Foreground = new SolidColorBrush(Colors.White);
    }
    else
    {
        avatarView.Background = new SolidColorBrush(Colors.LightGray);
        avatarView.Foreground = new SolidColorBrush(Colors.Black);
    }
}
```

## Advanced Customizations

### Drop Shadow Effect

```xaml
<syncfusion:SfAvatarView 
    ContentType="CustomImage"
    ImageSource="profile.jpg"
    AvatarSize="Large">
    <syncfusion:SfAvatarView.Shadow>
        <ThemeShadow />
    </syncfusion:SfAvatarView.Shadow>
    <syncfusion:SfAvatarView.Translation>
        <Vector3 X="0" Y="0" Z="32" />
    </syncfusion:SfAvatarView.Translation>
</syncfusion:SfAvatarView>
```

### Opacity for Inactive Users

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="Inactive User"
    Opacity="0.5"/>
```

```csharp
// Set opacity based on user status
avatarView.Opacity = user.IsActive ? 1.0 : 0.5;
```

### Scale Transform for Hover Effect

```xaml
<syncfusion:SfAvatarView 
    x:Name="hoverAvatar"
    ContentType="CustomImage"
    ImageSource="profile.jpg"
    AvatarSize="Large"
    PointerEntered="HoverAvatar_PointerEntered"
    PointerExited="HoverAvatar_PointerExited">
    <syncfusion:SfAvatarView.RenderTransform>
        <ScaleTransform x:Name="scaleTransform" ScaleX="1" ScaleY="1"/>
    </syncfusion:SfAvatarView.RenderTransform>
</syncfusion:SfAvatarView>
```

```csharp
private void HoverAvatar_PointerEntered(object sender, PointerRoutedEventArgs e)
{
    scaleTransform.ScaleX = 1.1;
    scaleTransform.ScaleY = 1.1;
}

private void HoverAvatar_PointerExited(object sender, PointerRoutedEventArgs e)
{
    scaleTransform.ScaleX = 1.0;
    scaleTransform.ScaleY = 1.0;
}
```

### Rotation Animation

```xaml
<syncfusion:SfAvatarView x:Name="rotatingAvatar">
    <syncfusion:SfAvatarView.RenderTransform>
        <RotateTransform x:Name="rotateTransform" Angle="0"/>
    </syncfusion:SfAvatarView.RenderTransform>
</syncfusion:SfAvatarView>
```

```csharp
private void StartRotationAnimation()
{
    var storyboard = new Storyboard();
    var animation = new DoubleAnimation
    {
        From = 0,
        To = 360,
        Duration = new Duration(TimeSpan.FromSeconds(2)),
        RepeatBehavior = RepeatBehavior.Forever
    };
    
    Storyboard.SetTarget(animation, rotateTransform);
    Storyboard.SetTargetProperty(animation, "Angle");
    
    storyboard.Children.Add(animation);
    storyboard.Begin();
}
```

### Combined Customizations

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="Premium User"
    InitialsType="DoubleCharacter"
    AvatarSize="ExtraLarge"
    AvatarShape="Circle"
    FontFamily="Segoe UI Variable Static Display"
    FontWeight="Bold"
    FontSize="52"
    BorderBrush="Gold"
    BorderThickness="4"
    Foreground="White">
    <syncfusion:SfAvatarView.Background>
        <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
            <GradientStop Color="#FF6A5ACD" Offset="0"/>
            <GradientStop Color="#FF4169E1" Offset="1"/>
        </LinearGradientBrush>
    </syncfusion:SfAvatarView.Background>
    <syncfusion:SfAvatarView.Shadow>
        <ThemeShadow />
    </syncfusion:SfAvatarView.Shadow>
    <syncfusion:SfAvatarView.Translation>
        <Vector3 X="0" Y="0" Z="32" />
    </syncfusion:SfAvatarView.Translation>
</syncfusion:SfAvatarView>
```

**Result:** Premium-looking avatar with gradient background, gold border, drop shadow, and bold text.

## Accessibility Considerations

### High Contrast Mode

Ensure avatars are visible in high contrast mode:

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="User"
    Background="{ThemeResource SystemAccentColor}"
    Foreground="{ThemeResource SystemColorButtonTextColor}"
    BorderBrush="{ThemeResource SystemColorButtonTextColor}"
    BorderThickness="1"/>
```

### Sufficient Color Contrast

Ensure text (initials) has sufficient contrast with background:

**WCAG AA Standard:** Contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text.

**Good contrast examples:**
- White text on dark blue (#FF2196F3)
- Black text on light gray (#FFEEEEEE)
- White text on navy (#FF000080)

**Poor contrast (avoid):**
- Light gray text on white
- Yellow text on white
- Light colors on light backgrounds

### AutomationProperties

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="John Doe"
    AutomationProperties.Name="John Doe profile picture"/>
```

Helps screen readers identify the avatar's purpose.

## Performance Tips

1. **Use solid colors over gradients** for better performance in long lists.
2. **Cache gradient brushes** if reusing the same gradient:
   ```csharp
   private static LinearGradientBrush _cachedGradient;
   ```
3. **Avoid complex animations** in scrollable lists.
4. **Use initials instead of images** for faster rendering in large datasets.
