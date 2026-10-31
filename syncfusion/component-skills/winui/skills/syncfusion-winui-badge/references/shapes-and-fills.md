# Badge Shapes and Fill Styles

This guide covers the different visual styles available for WinUI Badge controls, including predefined shapes and color fills.

## Badge Shapes

The `Shape` property determines the Badge's visual form. The default shape is `Oval`.

### Available Shape Values

| Shape | Description | Best For |
|-------|-------------|----------|
| **Oval** | Rounded rectangle (default) | General counts, text badges |
| **Rectangle** | Sharp corners | Status labels, tags |
| **Ellipse** | Perfect circle | Single digits, dots |
| **None** | No background shape | Custom content (icons, images) |
| **Custom** | User-defined geometry | Special badge designs |

## Using Predefined Shapes

### Oval Shape (Default)

Best for text and double-digit numbers:

```xaml
<notification:SfBadge Content="99+" 
                     Shape="Oval"/>
```

**Result:** Rounded rectangle that adapts to content width

### Rectangle Shape

For status labels and tags:

```xaml
<notification:SfBadge Content="NEW" 
                     Shape="Rectangle" 
                     Fill="Success"/>
```

**Result:** Badge with sharp, 90-degree corners

### Ellipse Shape

Perfect for single digits and circular indicators:

```xaml
<notification:SfBadge Content="5" 
                     Shape="Ellipse" 
                     Width="30" 
                     Height="30"/>
```

**Result:** Perfect circle badge (ensure Width equals Height)

**Important:** For true circles, set equal Width and Height values.

### None Shape

For completely custom badge content without default background:

```xaml
<notification:SfBadge Shape="None">
    <Ellipse Width="16" Height="16" Fill="LimeGreen"/>
</notification:SfBadge>
```

**Use Cases:**
- Custom icons or images as badges
- Status dots without text
- Badges with complex visual designs

## Custom Shapes

Create completely custom badge shapes using the `CustomShape` property with geometry data.

### Using CustomShape

```xaml
<notification:SfBadge Shape="Custom"
                     CustomShape="M16,0C17.3,0.5 18.4,1.6 19.2,3.3 19.3,3.3 19.5,3.2 19.6,3.2..."
                     Content="10"
                     Width="50"
                     Height="30"/>
```

**Setting Custom Shape in C#:**
```csharp
badge.Shape = BadgeShape.Custom;
badge.CustomShape = Geometry.Parse("M16,0C17.3,0.5...");
badge.Content = "10";
```

### Creating Custom Geometry

Use design tools like:
- **Microsoft Expression Design** (legacy)
- **Adobe Illustrator** (export as XAML)
- **Inkscape** (SVG to XAML converters)
- **Online path editors**

**Star Shape Example:**
```xaml
<notification:SfBadge Shape="Custom"
                     CustomShape="M10,0 L12,7 L20,7 L14,12 L16,20 L10,15 L4,20 L6,12 L0,7 L8,7 Z"
                     Content="5"
                     Width="40"
                     Height="40"/>
```

## Fill Colors (Predefined States)

The `Fill` property applies predefined, semantic colors to badges. The default is `Accent`.

### Available Fill Values

| Fill Value | Color | Use Case |
|------------|-------|----------|
| **Accent** | Royal Blue | Default, neutral notifications |
| **Success** | Green | Positive states, confirmations, online status |
| **Warning** | Orange | Alerts, pending actions, caution |
| **Error** | Orange Red | Critical issues, errors, urgent notifications |
| **Information** | Light Sea Green | Info messages, tips, neutral alerts |
| **Alt** | Dark Slate Gray | Alternative styling, secondary badges |
| **Default** | Lavender | Subtle notifications, low priority |

### Accent Fill (Default)

```xaml
<notification:SfBadge Content="12" 
                     Fill="Accent"/>
```

**Color:** Royal Blue  
**When to use:** General notifications, default state

### Success Fill

```xaml
<notification:SfBadge Content="Done" 
                     Fill="Success" 
                     Shape="Rectangle"/>
```

**Color:** Green  
**When to use:** 
- Successful operations
- Online/active status
- Positive confirmations
- Completed tasks

**Example: Online Status Badge**
```xaml
<notification:BadgeContainer>
    <notification:BadgeContainer.Content>
        <PersonPicture Width="60" Height="60" ProfilePicture="/Assets/user.png"/>
    </notification:BadgeContainer.Content>
    <notification:BadgeContainer.Badge>
        <notification:SfBadge Content="Online" 
                             Fill="Success"
                             HorizontalPosition="0.9"
                             VerticalPosition="0.9"/>
    </notification:BadgeContainer.Badge>
</notification:BadgeContainer>
```

### Warning Fill

```xaml
<notification:SfBadge Content="!" 
                     Fill="Warning" 
                     Shape="Ellipse"/>
```

**Color:** Orange  
**When to use:**
- Warnings that need attention
- Pending actions
- Items requiring review
- Non-critical alerts

### Error Fill

```xaml
<notification:SfBadge Content="99+" 
                     Fill="Error"/>
```

**Color:** Orange Red  
**When to use:**
- Critical notifications
- Error counts
- Urgent messages
- Failed operations

**Example: Unread Error Notifications**
```xaml
<notification:BadgeContainer>
    <notification:BadgeContainer.Content>
        <Button Content="Errors" Width="100"/>
    </notification:BadgeContainer.Content>
    <notification:BadgeContainer.Badge>
        <notification:SfBadge Content="{x:Bind ErrorCount, Mode=OneWay}"
                             Fill="Error"
                             Shape="Ellipse"/>
    </notification:BadgeContainer.Badge>
</notification:BadgeContainer>
```

### Information Fill

```xaml
<notification:SfBadge Content="Info" 
                     Fill="Information" 
                     Shape="Rectangle"/>
```

**Color:** Light Sea Green  
**When to use:**
- Informational messages
- Tips and hints
- Neutral notifications

### Alt Fill

```xaml
<notification:SfBadge Content="2" 
                     Fill="Alt"/>
```

**Color:** Dark Slate Gray  
**When to use:**
- Alternative styling
- Secondary badges
- Muted notifications

### Default Fill

```xaml
<notification:SfBadge Content="5" 
                     Fill="Default"/>
```

**Color:** Lavender  
**When to use:**
- Low priority items
- Subtle indicators
- Background notifications

## Combining Shapes and Fills

Create meaningful visual badges by combining shapes and fills:

### Example 1: Critical Error Counter

```xaml
<notification:SfBadge Content="3"
                     Shape="Ellipse"
                     Fill="Error"
                     Width="28"
                     Height="28"/>
```

### Example 2: Success Label

```xaml
<notification:SfBadge Content="Verified"
                     Shape="Rectangle"
                     Fill="Success"/>
```

### Example 3: Warning Indicator

```xaml
<notification:SfBadge Content="!"
                     Shape="Ellipse"
                     Fill="Warning"
                     Width="24"
                     Height="24"/>
```

### Example 4: Info Tag

```xaml
<notification:SfBadge Content="Beta"
                     Shape="Oval"
                     Fill="Information"/>
```

## Practical Examples

### Multi-State Notification Button

```xaml
<StackPanel Orientation="Horizontal" Spacing="10">
    <!-- Normal notifications -->
    <notification:BadgeContainer>
        <notification:BadgeContainer.Content>
            <Button Content="Notifications" Width="120"/>
        </notification:BadgeContainer.Content>
        <notification:BadgeContainer.Badge>
            <notification:SfBadge Content="5" Fill="Accent"/>
        </notification:BadgeContainer.Badge>
    </notification:BadgeContainer>
    
    <!-- Warnings -->
    <notification:BadgeContainer>
        <notification:BadgeContainer.Content>
            <Button Content="Warnings" Width="120"/>
        </notification:BadgeContainer.Content>
        <notification:BadgeContainer.Badge>
            <notification:SfBadge Content="2" Fill="Warning"/>
        </notification:BadgeContainer.Badge>
    </notification:BadgeContainer>
    
    <!-- Errors -->
    <notification:BadgeContainer>
        <notification:BadgeContainer.Content>
            <Button Content="Errors" Width="120"/>
        </notification:BadgeContainer.Content>
        <notification:BadgeContainer.Badge>
            <notification:SfBadge Content="1" Fill="Error"/>
        </notification:BadgeContainer.Badge>
    </notification:BadgeContainer>
</StackPanel>
```

### Dynamic Badge Based on Value

```csharp
private void UpdateBadge(int count)
{
    badge.Content = count;
    
    // Change fill color based on severity
    if (count == 0)
    {
        badge.Visibility = Visibility.Collapsed;
    }
    else if (count < 5)
    {
        badge.Fill = BadgeFill.Information;
        badge.Visibility = Visibility.Visible;
    }
    else if (count < 10)
    {
        badge.Fill = BadgeFill.Warning;
        badge.Visibility = Visibility.Visible;
    }
    else
    {
        badge.Fill = BadgeFill.Error;
        badge.Visibility = Visibility.Visible;
    }
}
```

## Best Practices

1. **Use semantic fills** - Match fill colors to their intended meaning (Error = red, Success = green)
2. **Shape for context** - Use Ellipse for numbers, Rectangle for labels, Oval for mixed content
3. **Consistency** - Use the same shape/fill combinations throughout your app for the same notification types
4. **Ellipse dimensions** - Always set equal Width and Height for true circular badges
5. **Custom shapes sparingly** - Reserve custom shapes for special branding or unique requirements
6. **Test visibility** - Ensure badge shapes and colors are visible on all backgrounds and themes

## Common Shape/Fill Combinations

| Use Case | Shape | Fill | Example |
|----------|-------|------|---------|
| Unread count | Ellipse | Error | `<SfBadge Content="5" Shape="Ellipse" Fill="Error"/>` |
| Status label | Rectangle | Success | `<SfBadge Content="New" Shape="Rectangle" Fill="Success"/>` |
| Warning count | Oval | Warning | `<SfBadge Content="3" Shape="Oval" Fill="Warning"/>` |
| Online indicator | None | - | `<SfBadge Shape="None"><Ellipse Fill="Green"/></SfBadge>` |
| Info badge | Oval | Information | `<SfBadge Content="i" Shape="Oval" Fill="Information"/>` |

## When to Use Custom Colors vs. Fill

- **Use Fill** when badge represents a standard state (success, warning, error, info)
- **Use custom colors** (Background/Foreground) for branding or non-standard states
- See the [Customization guide](customization.md) for custom color implementation

## Summary

- **Shape property**: Controls badge geometry (Oval, Rectangle, Ellipse, None, Custom)
- **Fill property**: Applies semantic colors (Accent, Success, Warning, Error, Information, Alt, Default)
- **Default shape**: Oval
- **Default fill**: Accent
- **Combine wisely**: Match shapes and fills to create clear, meaningful badges
