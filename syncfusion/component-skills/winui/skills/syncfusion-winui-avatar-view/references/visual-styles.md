# Visual Styles and Shapes

## Table of Contents
- [Avatar Shapes](#avatar-shapes)
- [Avatar Sizes](#avatar-sizes)
- [Custom Shape Configuration](#custom-shape-configuration)
- [Shape Selection Guide](#shape-selection-guide)

## Avatar Shapes

The `AvatarShape` property controls the visual shape of the avatar. Three options are available:

| Shape | Description | Best For |
|-------|-------------|----------|
| `Circle` | Circular avatar (default) | Profile pictures, user avatars, social apps |
| `Square` | Square avatar with sharp corners | App icons, logos, formal displays |
| `Custom` | Custom shape with configurable CornerRadius | Rounded squares, unique designs |

### Circle Shape

The default and most common shape for user avatars.

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="John Doe"
    InitialsType="DoubleCharacter"
    AvatarShape="Circle"
    AvatarSize="Large"
    Background="CornflowerBlue"
    Foreground="White"/>
```

```csharp
SfAvatarView avatarView = new SfAvatarView
{
    ContentType = AvatarContentType.Initials,
    AvatarName = "John Doe",
    InitialsType = AvatarInitialsType.DoubleCharacter,
    AvatarShape = AvatarShape.Circle,
    AvatarSize = AvatarSize.Large,
    Background = new SolidColorBrush(Colors.CornflowerBlue),
    Foreground = new SolidColorBrush(Colors.White)
};
```

**Circle Shape Characteristics:**
- Perfectly round appearance
- Works best with `AvatarSize` property (ExtraSmall to ExtraLarge)
- Most common for user profiles and social apps
- Friendly, approachable appearance

**When to use Circle:**
- User profiles and avatars
- Social media-style interfaces
- Contact lists
- Chat applications
- Friendly, casual applications

### Square Shape

Sharp-cornered square avatar, useful for app icons or formal displays.

```xaml
<syncfusion:SfAvatarView 
    ContentType="CustomImage"
    ImageSource="ms-appx:///Assets/app-icon.png"
    AvatarShape="Square"
    AvatarSize="Large"/>
```

```csharp
SfAvatarView avatarView = new SfAvatarView
{
    ContentType = AvatarContentType.CustomImage,
    ImageSource = new BitmapImage(new Uri("ms-appx:///Assets/app-icon.png")),
    AvatarShape = AvatarShape.Square,
    AvatarSize = AvatarSize.Large
};
```

**Square Shape Characteristics:**
- Sharp 90-degree corners
- Professional, formal appearance
- Good for logos, app icons, organization badges
- Works with `AvatarSize` property

**When to use Square:**
- App icons and service logos
- Organization or company badges
- Formal business applications
- Grid layouts requiring uniform shapes
- Logos that are designed as squares

### Custom Shape

Allows custom configuration with `CornerRadius` for rounded corners.

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="Emma Watson"
    InitialsType="DoubleCharacter"
    AvatarShape="Custom"
    Width="80"
    Height="80"
    CornerRadius="12"
    Background="#FFE91E63"
    Foreground="White"/>
```

```csharp
SfAvatarView avatarView = new SfAvatarView
{
    ContentType = AvatarContentType.Initials,
    AvatarName = "Emma Watson",
    InitialsType = AvatarInitialsType.DoubleCharacter,
    AvatarShape = AvatarShape.Custom,
    Width = 80,
    Height = 80,
    CornerRadius = new CornerRadius(12),
    Background = new SolidColorBrush(ColorHelper.FromArgb(255, 233, 30, 99)),
    Foreground = new SolidColorBrush(Colors.White)
};
```

**Custom Shape Characteristics:**
- Set custom `Width` and `Height` (not restricted to AvatarSize presets)
- Configure `CornerRadius` for rounded corners
- More flexible for unique design requirements

**CornerRadius Options:**
- **Uniform:** `CornerRadius="12"` (all corners same)
- **Individual:** `CornerRadius="12,8,12,8"` (top-left, top-right, bottom-right, bottom-left)

```xaml
<!-- Rounded square (slightly rounded corners) -->
<syncfusion:SfAvatarView 
    AvatarShape="Custom"
    Width="64"
    Height="64"
    CornerRadius="8"/>

<!-- Pill shape (fully rounded on sides) -->
<syncfusion:SfAvatarView 
    AvatarShape="Custom"
    Width="80"
    Height="40"
    CornerRadius="20"/>

<!-- Asymmetric corners -->
<syncfusion:SfAvatarView 
    AvatarShape="Custom"
    Width="70"
    Height="70"
    CornerRadius="20,5,20,5"/>
```

**When to use Custom:**
- Unique design requirements
- Rounded rectangles
- Non-square dimensions (e.g., pill shapes)
- When AvatarSize presets don't match design
- Need precise control over dimensions

## Avatar Sizes

The `AvatarSize` property provides 5 pre-defined size options for Circle and Square shapes.

| Size | Dimensions | Use Case |
|------|------------|----------|
| `ExtraSmall` | 32 x 32 | Navigation bars, dense lists, compact UI |
| `Small` | 48 x 48 | Chat messages, secondary lists, tags |
| `Medium` | 64 x 64 | Standard lists, cards, default size |
| `Large` | 96 x 96 | Profile pages, prominent displays, headers |
| `ExtraLarge` | 128 x 128 | Large profile headers, focus areas, detail views |

### Size Comparison

```xaml
<StackPanel Orientation="Horizontal" Spacing="20" VerticalAlignment="Center">
    <!-- ExtraSmall -->
    <StackPanel HorizontalAlignment="Center" Spacing="5">
        <syncfusion:SfAvatarView 
            ContentType="Initials"
            AvatarName="EX"
            AvatarSize="ExtraSmall"
            Background="CornflowerBlue"
            Foreground="White"/>
        <TextBlock Text="ExtraSmall" FontSize="10"/>
        <TextBlock Text="32x32" FontSize="10" Foreground="Gray"/>
    </StackPanel>
    
    <!-- Small -->
    <StackPanel HorizontalAlignment="Center" Spacing="5">
        <syncfusion:SfAvatarView 
            ContentType="Initials"
            AvatarName="SM"
            AvatarSize="Small"
            Background="CornflowerBlue"
            Foreground="White"/>
        <TextBlock Text="Small" FontSize="10"/>
        <TextBlock Text="48x48" FontSize="10" Foreground="Gray"/>
    </StackPanel>
    
    <!-- Medium (default) -->
    <StackPanel HorizontalAlignment="Center" Spacing="5">
        <syncfusion:SfAvatarView 
            ContentType="Initials"
            AvatarName="MD"
            AvatarSize="Medium"
            Background="CornflowerBlue"
            Foreground="White"/>
        <TextBlock Text="Medium" FontSize="10"/>
        <TextBlock Text="64x64" FontSize="10" Foreground="Gray"/>
    </StackPanel>
    
    <!-- Large -->
    <StackPanel HorizontalAlignment="Center" Spacing="5">
        <syncfusion:SfAvatarView 
            ContentType="Initials"
            AvatarName="LG"
            AvatarSize="Large"
            Background="CornflowerBlue"
            Foreground="White"/>
        <TextBlock Text="Large" FontSize="10"/>
        <TextBlock Text="96x96" FontSize="10" Foreground="Gray"/>
    </StackPanel>
    
    <!-- ExtraLarge -->
    <StackPanel HorizontalAlignment="Center" Spacing="5">
        <syncfusion:SfAvatarView 
            ContentType="Initials"
            AvatarName="XL"
            AvatarSize="ExtraLarge"
            Background="CornflowerBlue"
            Foreground="White"/>
        <TextBlock Text="ExtraLarge" FontSize="10"/>
        <TextBlock Text="128x128" FontSize="10" Foreground="Gray"/>
    </StackPanel>
</StackPanel>
```

### Size Usage Guidelines

#### ExtraSmall (32x32)
```xaml
<syncfusion:SfAvatarView 
    AvatarSize="ExtraSmall"
    ContentType="Initials"
    AvatarName="User"
    InitialsType="SingleCharacter"/>
```

**Best for:**
- App navigation bars
- Compact lists with many items
- Tags and chips
- Small UI spaces
- Mobile interfaces

#### Small (48x48) - Default
```xaml
<syncfusion:SfAvatarView 
    AvatarSize="Small"
    ContentType="Initials"
    AvatarName="John Doe"/>
```

**Best for:**
- Chat message senders
- Secondary lists
- Inline mentions
- Comment avatars
- Default size when not specified

#### Medium (64x64)
```xaml
<syncfusion:SfAvatarView 
    AvatarSize="Medium"
    ContentType="CustomImage"
    ImageSource="user.jpg"/>
```

**Best for:**
- Standard contact lists
- Card components
- List views with details
- Most common UI scenarios

#### Large (96x96)
```xaml
<syncfusion:SfAvatarView 
    AvatarSize="Large"
    ContentType="CustomImage"
    ImageSource="profile.jpg"/>
```

**Best for:**
- Profile pages
- User detail views
- Headers and banners
- Prominent user displays
- Focus areas

#### ExtraLarge (128x128)
```xaml
<syncfusion:SfAvatarView 
    AvatarSize="ExtraLarge"
    ContentType="Initials"
    AvatarName="John Doe"
    InitialsType="DoubleCharacter"/>
```

**Best for:**
- Large profile headers
- Account settings pages
- Hero sections
- Modal dialogs with user focus
- Desktop applications with space

### Font Size Auto-Adjustment

Font size for initials automatically adjusts based on `AvatarSize`:

| AvatarSize | Approximate Font Size |
|------------|----------------------|
| ExtraSmall | 14-16 |
| Small | 18-20 |
| Medium | 24-26 |
| Large | 36-40 |
| ExtraLarge | 48-52 |

You can override with `FontSize` property if needed:

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="JD"
    AvatarSize="Large"
    FontSize="32"/>
```

## Custom Shape Configuration

When using `AvatarShape="Custom"`, you have full control over dimensions and corners.

### Rounded Square

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="John Doe"
    InitialsType="DoubleCharacter"
    AvatarShape="Custom"
    Width="80"
    Height="80"
    CornerRadius="12"
    Background="CornflowerBlue"
    Foreground="White"/>
```

### Rectangle Avatar

```xaml
<syncfusion:SfAvatarView 
    ContentType="CustomImage"
    ImageSource="banner.jpg"
    AvatarShape="Custom"
    Width="120"
    Height="60"
    CornerRadius="8"/>
```

### Pill-Shaped Avatar

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="New"
    InitialsType="SingleCharacter"
    AvatarShape="Custom"
    Width="60"
    Height="30"
    CornerRadius="15"
    Background="#FF4CAF50"
    Foreground="White"/>
```

### Asymmetric Corners

```xaml
<!-- Rounded on top, sharp on bottom -->
<syncfusion:SfAvatarView 
    AvatarShape="Custom"
    Width="70"
    Height="70"
    CornerRadius="20,20,0,0"
    Background="LightBlue"/>
```

## Shape Selection Guide

### Decision Flow

```
User avatars or profile pictures? ──Yes──> Circle
        │
        No
        │
App icons or logos? ──Yes──> Square
        │
        No
        │
Need rounded corners? ──Yes──> Custom with CornerRadius
        │
        No
        │
Non-standard dimensions? ──Yes──> Custom with Width/Height
        │
        No
        │
Circle (default)
```

### Comparison Table

| Requirement | Recommended Shape | Configuration |
|-------------|-------------------|---------------|
| User profile picture | Circle | `AvatarShape="Circle"` with AvatarSize |
| Contact list | Circle | `AvatarShape="Circle"` with Small/Medium |
| App icon/logo | Square | `AvatarShape="Square"` with appropriate AvatarSize |
| Rounded corners | Custom | `AvatarShape="Custom"` with CornerRadius |
| Non-square ratio | Custom | `AvatarShape="Custom"` with Width/Height |
| Chat messages | Circle | `AvatarShape="Circle" AvatarSize="Small"` |
| Profile header | Circle | `AvatarShape="Circle" AvatarSize="ExtraLarge"` |
| Tags/badges | Custom pill | `AvatarShape="Custom"` Width > Height, large CornerRadius |

### Combining Shape and Size

```xaml
<!-- Profile page: Large circle -->
<syncfusion:SfAvatarView 
    AvatarShape="Circle"
    AvatarSize="Large"/>

<!-- App icon: Medium square -->
<syncfusion:SfAvatarView 
    AvatarShape="Square"
    AvatarSize="Medium"/>

<!-- Badge: Custom pill -->
<syncfusion:SfAvatarView 
    AvatarShape="Custom"
    Width="80"
    Height="40"
    CornerRadius="20"/>

<!-- Card: Custom rounded square -->
<syncfusion:SfAvatarView 
    AvatarShape="Custom"
    Width="64"
    Height="64"
    CornerRadius="8"/>
```

## Responsive Sizing

Adjust size based on window width:

```xaml
<syncfusion:SfAvatarView x:Name="responsiveAvatar"/>
```

```csharp
private void Window_SizeChanged(object sender, WindowSizeChangedEventArgs e)
{
    if (e.Size.Width < 600)
    {
        responsiveAvatar.AvatarSize = AvatarSize.Small;
    }
    else if (e.Size.Width < 900)
    {
        responsiveAvatar.AvatarSize = AvatarSize.Medium;
    }
    else
    {
        responsiveAvatar.AvatarSize = AvatarSize.Large;
    }
}
```

Or use Adaptive Triggers:

```xaml
<Grid>
    <syncfusion:SfAvatarView x:Name="adaptiveAvatar" AvatarSize="Small"/>
    
    <VisualStateManager.VisualStateGroups>
        <VisualStateGroup>
            <VisualState x:Name="WideState">
                <VisualState.StateTriggers>
                    <AdaptiveTrigger MinWindowWidth="900"/>
                </VisualState.StateTriggers>
                <VisualState.Setters>
                    <Setter Target="adaptiveAvatar.AvatarSize" Value="Large"/>
                </VisualState.Setters>
            </VisualState>
            <VisualState x:Name="MediumState">
                <VisualState.StateTriggers>
                    <AdaptiveTrigger MinWindowWidth="600"/>
                </VisualState.StateTriggers>
                <VisualState.Setters>
                    <Setter Target="adaptiveAvatar.AvatarSize" Value="Medium"/>
                </VisualState.Setters>
            </VisualState>
        </VisualStateGroup>
    </VisualStateManager.VisualStateGroups>
</Grid>
```
