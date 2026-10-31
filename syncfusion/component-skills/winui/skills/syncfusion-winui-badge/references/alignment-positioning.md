# Badge Alignment and Positioning

## Table of Contents
- [Overview](#overview)
- [Alignment Properties](#alignment-properties)
- [Positioning with Anchors](#positioning-with-anchors)
- [Custom Positioning](#custom-positioning)
- [Content Alignment](#content-alignment)
- [Padding](#padding)
- [Auto Re-positioning](#auto-re-positioning)
- [Practical Examples](#practical-examples)
- [Best Practices](#best-practices)

## Overview

Badge positioning works through a layered system when using `BadgeContainer`:

1. **Alignment** - Which edge/corner (HorizontalAlignment, VerticalAlignment)
2. **Anchor** - Relative to the edge (Inside, Center, Outside)
3. **Position** - Fine-tuning with 0-1 range (HorizontalPosition, VerticalPosition)
4. **Custom Anchor** - Precise control with decimal values

**Important:** Positioning properties only work when Badge is used with `BadgeContainer`. Standalone badges in layouts use standard layout properties.

## Alignment Properties

These properties determine which edge or corner of the container the badge aligns to.

### HorizontalAlignment

Controls horizontal placement relative to container.

**Values:** `Left`, `Center`, `Right` (Default: `Right`)

```xaml
<!-- Align badge to right edge -->
<notification:SfBadge HorizontalAlignment="Right" 
                     Content="5"/>

<!-- Align badge to left edge -->
<notification:SfBadge HorizontalAlignment="Left" 
                     Content="5"/>

<!-- Center badge horizontally -->
<notification:SfBadge HorizontalAlignment="Center" 
                     Content="5"/>
```

### VerticalAlignment

Controls vertical placement relative to container.

**Values:** `Top`, `Center`, `Bottom` (Default: `Top`)

```xaml
<!-- Align badge to top edge -->
<notification:SfBadge VerticalAlignment="Top" 
                     Content="5"/>

<!-- Align badge to bottom edge -->
<notification:SfBadge VerticalAlignment="Bottom" 
                     Content="5"/>

<!-- Center badge vertically -->
<notification:SfBadge VerticalAlignment="Center" 
                     Content="5"/>
```

### Common Alignment Combinations

```xaml
<!-- Top-Right (Default) -->
<notification:SfBadge HorizontalAlignment="Right"
                     VerticalAlignment="Top"
                     Content="10"/>

<!-- Bottom-Right -->
<notification:SfBadge HorizontalAlignment="Right"
                     VerticalAlignment="Bottom"
                     Content="10"/>

<!-- Top-Left -->
<notification:SfBadge HorizontalAlignment="Left"
                     VerticalAlignment="Top"
                     Content="10"/>

<!-- Center-Center -->
<notification:SfBadge HorizontalAlignment="Center"
                     VerticalAlignment="Center"
                     Content="10"/>
```

### Example: Different Corner Positions

```xaml
<StackPanel Orientation="Horizontal" Spacing="20">
    <!-- Top-Right -->
    <notification:BadgeContainer>
        <notification:BadgeContainer.Content>
            <Button Content="Top-Right" Width="100" Height="60"/>
        </notification:BadgeContainer.Content>
        <notification:BadgeContainer.Badge>
            <notification:SfBadge HorizontalAlignment="Right"
                                 VerticalAlignment="Top"
                                 Content="TR"/>
        </notification:BadgeContainer.Badge>
    </notification:BadgeContainer>
    
    <!-- Bottom-Left -->
    <notification:BadgeContainer>
        <notification:BadgeContainer.Content>
            <Button Content="Bottom-Left" Width="100" Height="60"/>
        </notification:BadgeContainer.Content>
        <notification:BadgeContainer.Badge>
            <notification:SfBadge HorizontalAlignment="Left"
                                 VerticalAlignment="Bottom"
                                 Content="BL"/>
        </notification:BadgeContainer.Badge>
    </notification:BadgeContainer>
</StackPanel>
```

## Positioning with Anchors

Anchors determine whether the badge is inside, outside, or centered on the container edge.

### HorizontalAnchor

**Values:** `Inside`, `Center`, `Outside` (Default: `Center`)

```xaml
<!-- Badge positioned outside right edge -->
<notification:SfBadge HorizontalAlignment="Right"
                     HorizontalAnchor="Outside"
                     Content="5"/>

<!-- Badge centered on right edge -->
<notification:SfBadge HorizontalAlignment="Right"
                     HorizontalAnchor="Center"
                     Content="5"/>

<!-- Badge inside right edge -->
<notification:SfBadge HorizontalAlignment="Right"
                     HorizontalAnchor="Inside"
                     Content="5"/>
```

### VerticalAnchor

**Values:** `Inside`, `Center`, `Outside` (Default: `Center`)

```xaml
<!-- Badge positioned outside top edge -->
<notification:SfBadge VerticalAlignment="Top"
                     VerticalAnchor="Outside"
                     Content="5"/>

<!-- Badge centered on top edge -->
<notification:SfBadge VerticalAlignment="Top"
                     VerticalAnchor="Center"
                     Content="5"/>

<!-- Badge inside top edge -->
<notification:SfBadge VerticalAlignment="Top"
                     VerticalAnchor="Inside"
                     Content="5"/>
```

### Understanding Anchor Behavior

The anchor works relative to the alignment:

**When HorizontalAlignment="Right":**
- `Outside` → Badge extends beyond right edge
- `Center` → Badge sits half inside, half outside
- `Inside` → Badge stays fully within right edge

**When VerticalAlignment="Top":**
- `Outside` → Badge extends above top edge
- `Center` → Badge sits half above, half below
- `Inside` → Badge stays fully within top area

### Example: Anchor Combinations

```xaml
<notification:BadgeContainer>
    <notification:BadgeContainer.Content>
        <Button Content="Messages" Width="120" Height="50"/>
    </notification:BadgeContainer.Content>
    <notification:BadgeContainer.Badge>
        <!-- Badge outside top-right corner -->
        <notification:SfBadge HorizontalAlignment="Right"
                             VerticalAlignment="Top"
                             HorizontalAnchor="Outside"
                             VerticalAnchor="Outside"
                             Content="99+"/>
    </notification:BadgeContainer.Badge>
</notification:BadgeContainer>
```

## Custom Positioning

For precise badge placement, use position properties with 0-1 range values.

### HorizontalPosition

Places badge at specific horizontal position where:
- **0** = Left edge
- **0.5** = Center
- **1** = Right edge (Default)

```xaml
<!-- Position at 90% from left (near right edge) -->
<notification:SfBadge HorizontalPosition="0.9" 
                     Content="5"/>

<!-- Position at 25% from left -->
<notification:SfBadge HorizontalPosition="0.25" 
                     Content="5"/>
```

### VerticalPosition

Places badge at specific vertical position where:
- **0** = Top edge (Default)
- **0.5** = Center
- **1** = Bottom edge

```xaml
<!-- Position at 80% from top (near bottom) -->
<notification:SfBadge VerticalPosition="0.8" 
                     Content="5"/>

<!-- Position at 10% from top -->
<notification:SfBadge VerticalPosition="0.1" 
                     Content="5"/>
```

### Example: Status Indicator on Avatar

```xaml
<notification:BadgeContainer>
    <notification:BadgeContainer.Content>
        <PersonPicture Width="100" 
                      Height="100" 
                      ProfilePicture="/Assets/avatar.png"/>
    </notification:BadgeContainer.Content>
    <notification:BadgeContainer.Badge>
        <!-- Position online indicator at bottom-right -->
        <notification:SfBadge Shape="None"
                             HorizontalPosition="0.9"
                             VerticalPosition="0.8">
            <Ellipse Width="20" Height="20" Fill="LimeGreen"/>
        </notification:SfBadge>
    </notification:BadgeContainer.Badge>
</notification:BadgeContainer>
```

## Advanced: Custom Anchor Positioning

For ultimate control, use `HorizontalAnchorPosition` and `VerticalAnchorPosition` with anchor set to `Custom`.

### HorizontalAnchorPosition & VerticalAnchorPosition

**Values:** 0 to 1 (Default: 0)  
**Required:** Set `HorizontalAnchor="Custom"` or `VerticalAnchor="Custom"`

These properties control the anchor point of the badge itself (not just position on container).

```xaml
<notification:SfBadge HorizontalAlignment="Right"
                     VerticalAlignment="Top"
                     HorizontalAnchor="Custom"
                     VerticalAnchor="Custom"
                     HorizontalAnchorPosition="0.2"
                     VerticalAnchorPosition="0"
                     HorizontalPosition="0"
                     VerticalPosition="0"
                     Content="99+"/>
```

### Understanding Custom Anchors

- **HorizontalAnchorPosition="0"** → Anchor badge by left edge
- **HorizontalAnchorPosition="0.5"** → Anchor badge by center
- **HorizontalAnchorPosition="1"** → Anchor badge by right edge

Combined with `HorizontalPosition` and `VerticalPosition`, this gives pixel-perfect control.

### Example Matrix

| HorizontalPosition | HorizontalAnchorPosition | Result |
|-------------------|-------------------------|--------|
| 0 | 0 | Badge left edge at container left |
| 0 | 0.5 | Badge center at container left |
| 1 | 1 | Badge right edge at container right |
| 0.5 | 0.5 | Badge center at container center |

## Content Alignment

Control how badge content aligns within the badge itself.

### HorizontalContentAlignment

**Values:** `Left`, `Center`, `Right` (Default: `Center`)

```xaml
<notification:SfBadge Content="99+"
                     HorizontalContentAlignment="Right"
                     Width="60"/>
```

### VerticalContentAlignment

**Values:** `Top`, `Center`, `Bottom` (Default: `Center`)

```xaml
<notification:SfBadge Content="NEW"
                     VerticalContentAlignment="Top"
                     Height="40"/>
```

### Example: Right-Aligned Multi-Digit Count

```xaml
<notification:SfBadge Content="127"
                     Width="50"
                     HorizontalContentAlignment="Right"
                     VerticalContentAlignment="Center"/>
```

## Padding

Control spacing between badge edges and content.

**Property:** `Padding`  
**Type:** Thickness (Left, Top, Right, Bottom)  
**Default:** 0,0,0,0

```xaml
<!-- Uniform padding -->
<notification:SfBadge Content="10" 
                     Padding="10"/>

<!-- Horizontal and vertical padding -->
<notification:SfBadge Content="10" 
                     Padding="15,5"/>

<!-- Individual side padding -->
<notification:SfBadge Content="10" 
                     Padding="10,5,10,5"/>
```

**In C#:**
```csharp
badge.Padding = new Thickness(10); // Uniform
badge.Padding = new Thickness(15, 5, 15, 5); // Left, Top, Right, Bottom
```

### Example: Roomy Badge

```xaml
<notification:SfBadge Content="NEW"
                     Padding="12,4,12,4"
                     Shape="Rectangle"
                     Fill="Success"/>
```

Result: Badge with extra horizontal space around text.

## Auto Re-positioning

Badges automatically reposition when container size changes.

```xaml
<notification:BadgeContainer>
    <notification:BadgeContainer.Content>
        <!-- Button that changes size -->
        <Button Content="Inbox" 
                Width="{x:Bind ButtonWidth, Mode=OneWay}"
                Height="50"/>
    </notification:BadgeContainer.Content>
    <notification:BadgeContainer.Badge>
        <!-- Badge maintains position relative to button -->
        <notification:SfBadge Content="5" 
                             HorizontalAlignment="Right"
                             VerticalAlignment="Top"/>
    </notification:BadgeContainer.Badge>
</notification:BadgeContainer>
```

**In C#:**
```csharp
// Changing button width automatically repositions badge
ButtonWidth = 150; // Badge moves to maintain top-right position
```

This ensures badges stay properly positioned during:
- Window resizing
- Layout changes
- Dynamic content updates
- Responsive design adjustments

## Practical Examples

### Example 1: Notification Button (Classic)

```xaml
<notification:BadgeContainer>
    <notification:BadgeContainer.Content>
        <Button Width="100" Height="40">
            <StackPanel Orientation="Horizontal" Spacing="8">
                <FontIcon Glyph="&#xE91C;" FontSize="16"/>
                <TextBlock Text="Notifications"/>
            </StackPanel>
        </Button>
    </notification:BadgeContainer.Content>
    <notification:BadgeContainer.Badge>
        <notification:SfBadge Content="5"
                             Fill="Error"
                             Shape="Ellipse"
                             HorizontalAlignment="Right"
                             VerticalAlignment="Top"
                             HorizontalAnchor="Outside"
                             VerticalAnchor="Center"/>
    </notification:BadgeContainer.Badge>
</notification:BadgeContainer>
```

### Example 2: Bottom-Right Status Badge

```xaml
<notification:BadgeContainer>
    <notification:BadgeContainer.Content>
        <PersonPicture Width="64" Height="64"/>
    </notification:BadgeContainer.Content>
    <notification:BadgeContainer.Badge>
        <notification:SfBadge Content="Away"
                             Fill="Warning"
                             Shape="Oval"
                             HorizontalAlignment="Right"
                             VerticalAlignment="Bottom"
                             HorizontalPosition="0.85"
                             VerticalPosition="0.85"/>
    </notification:BadgeContainer.Badge>
</notification:BadgeContainer>
```

### Example 3: Centered Overlay Badge

```xaml
<notification:BadgeContainer>
    <notification:BadgeContainer.Content>
        <Image Source="/Assets/product.png" 
               Width="120" 
               Height="120"/>
    </notification:BadgeContainer.Content>
    <notification:BadgeContainer.Badge>
        <notification:SfBadge Content="SALE"
                             Fill="Error"
                             Shape="Rectangle"
                             HorizontalAlignment="Center"
                             VerticalAlignment="Center"
                             Rotation="-15"/>
    </notification:BadgeContainer.Badge>
</notification:BadgeContainer>
```

### Example 4: Four-Corner Badges

```xaml
<notification:BadgeContainer Width="150" Height="150">
    <notification:BadgeContainer.Content>
        <Border Background="LightGray" 
                CornerRadius="8"/>
    </notification:BadgeContainer.Content>
    <notification:BadgeContainer.Badge>
        <!-- Top-Right -->
        <notification:SfBadge Content="TR" 
                             HorizontalAlignment="Right" 
                             VerticalAlignment="Top"/>
        <!-- Note: Multiple badges require separate BadgeContainers -->
    </notification:BadgeContainer.Badge>
</notification:BadgeContainer>
```

## Best Practices

1. **Use default positioning first** - Start with HorizontalAlignment and VerticalAlignment before using custom positions
2. **Outside anchors for counts** - Use `Outside` anchors for notification counts so they don't obscure content
3. **Center anchors for overlap** - Use `Center` anchors for partially overlapping badges
4. **Inside for contained badges** - Use `Inside` anchors when badge must stay within control bounds
5. **Position values for avatars** - Use 0-1 position values for circular elements like profile pictures
6. **Test responsiveness** - Verify badge positions work at different container sizes
7. **Consistent positioning** - Use same alignment pattern for similar badges throughout your app
8. **Padding for readability** - Add padding when content feels cramped
9. **Custom anchors sparingly** - Reserve custom anchor positioning for unique layouts

## Summary

| Property | Purpose | Default | Values |
|----------|---------|---------|--------|
| HorizontalAlignment | Which edge/corner | Right | Left, Center, Right |
| VerticalAlignment | Which edge/corner | Top | Top, Center, Bottom |
| HorizontalAnchor | Position relative to edge | Center | Inside, Center, Outside, Custom |
| VerticalAnchor | Position relative to edge | Center | Inside, Center, Outside, Custom |
| HorizontalPosition | Fine-tune placement | 1 | 0 to 1 |
| VerticalPosition | Fine-tune placement | 0 | 0 to 1 |
| HorizontalAnchorPosition | Badge anchor point | 0 | 0 to 1 (requires Custom) |
| VerticalAnchorPosition | Badge anchor point | 0 | 0 to 1 (requires Custom) |
| HorizontalContentAlignment | Content within badge | Center | Left, Center, Right |
| VerticalContentAlignment | Content within badge | Center | Top, Center, Bottom |
| Padding | Content spacing | 0 | Thickness value |
