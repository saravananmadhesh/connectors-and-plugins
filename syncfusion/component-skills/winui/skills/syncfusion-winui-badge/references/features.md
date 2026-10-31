# Badge Features and Configuration

This guide covers additional Badge features including animations, content formatting, and standalone badge usage.

## Animation Types

The Badge control supports animations that trigger when the `Content` property changes, drawing attention to updates.

### AnimationType Property

**Values:** `None`, `Scale`, `Opacity` (Default: `None`)

### None (No Animation)

Content changes instantly without animation:

```xaml
<notification:SfBadge Content="{x:Bind Count, Mode=OneWay}"
                     AnimationType="None"/>
```

### Scale Animation

Badge scales up briefly when content changes:

```xaml
<notification:SfBadge Content="{x:Bind MessageCount, Mode=OneWay}"
                     AnimationType="Scale"
                     Fill="Error"/>
```

**Behavior:** When `MessageCount` changes from 5 to 6, the badge briefly scales up then returns to normal size.

### Opacity Animation

Badge fades out and in when content changes:

```xaml
<notification:SfBadge Content="{x:Bind NotificationCount, Mode=OneWay}"
                     AnimationType="Opacity"
                     Background="Red"
                     Foreground="White"/>
```

**Behavior:** When content changes, badge opacity animates from 1 → 0 → 1.

### When Animation Triggers

**Animations only occur when:**
- The `Content` property value changes
- Badge is visible
- AnimationType is set to Scale or Opacity

**No animation when:**
- Badge is first displayed
- Other properties change (Background, Shape, etc.)
- Content remains the same

### Example: Animated Message Counter

**XAML:**
```xaml
<StackPanel Spacing="20">
    <notification:BadgeContainer>
        <notification:BadgeContainer.Content>
            <Button Content="Messages" Width="120" Height="40"/>
        </notification:BadgeContainer.Content>
        <notification:BadgeContainer.Badge>
            <notification:SfBadge x:Name="messageBadge"
                                 Content="{x:Bind MessageCount, Mode=OneWay}"
                                 AnimationType="Scale"
                                 Fill="Error"/>
        </notification:BadgeContainer.Badge>
    </notification:BadgeContainer>
    
    <Button Content="Add Message" Click="AddMessage_Click"/>
</StackPanel>
```

**Code-Behind:**
```csharp
private int _messageCount = 5;
public int MessageCount
{
    get => _messageCount;
    set
    {
        _messageCount = value;
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(MessageCount)));
    }
}

private void AddMessage_Click(object sender, RoutedEventArgs e)
{
    MessageCount++; // Scale animation triggers
}
```

### Choosing Animation Type

| Animation | Best For | Visual Effect |
|-----------|----------|---------------|
| **None** | Subtle updates, frequently changing values | Instant update |
| **Scale** | Notifications, message counts | Attention-grabbing pop |
| **Opacity** | Status changes, non-urgent updates | Smooth fade transition |

## Custom Content Formatting

Format badge content dynamically using value converters, especially useful for large numbers.

### Number Formatting Converter

Display large numbers in compact format (e.g., "99+", "5K", "2.5M"):

**Create Converter:**
```csharp
public class CustomNumberConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, string language)
    {
        if (int.TryParse(value?.ToString(), out int number))
        {
            if (number <= 99)
            {
                return value;
            }
            else if (number <= 999)
            {
                return "99+";
            }
            else if (number < 99999)
            {
                return (number / 1000).ToString("0.#") + "K";
            }
            else if (number < 999999)
            {
                return (number / 1000).ToString("#,0K");
            }
            else if (number < 9999999)
            {
                return (number / 1000000).ToString("0.#") + "M";
            }
            else
            {
                return (number / 1000000).ToString("#,0M");
            }
        }
        return value;
    }

    public object ConvertBack(object value, Type targetType, object parameter, string language)
    {
        throw new NotImplementedException();
    }
}
```

**Use in XAML:**
```xaml
<Page.Resources>
    <local:CustomNumberConverter x:Key="customNumberConverter"/>
</Page.Resources>

<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition/>
        <ColumnDefinition/>
    </Grid.ColumnDefinitions>
    
    <notification:BadgeContainer>
        <notification:BadgeContainer.Content>
            <Button Content="Notifications" Width="120"/>
        </notification:BadgeContainer.Content>
        <notification:BadgeContainer.Badge>
            <notification:SfBadge Background="Red"
                                 Foreground="White"
                                 Content="{x:Bind badgeContent.Value, 
                                               Mode=OneWay, 
                                               Converter={StaticResource customNumberConverter}}"/>
        </notification:BadgeContainer.Badge>
    </notification:BadgeContainer>
    
    <NumberBox x:Name="badgeContent"
               Grid.Column="1"
               Header="Badge Content"
               Value="99"
               SpinButtonPlacementMode="Compact"
               Minimum="0"
               Maximum="100000000"/>
</Grid>
```

### Formatting Examples

| Input Value | Formatted Output |
|-------------|------------------|
| 5 | "5" |
| 99 | "99" |
| 100 | "99+" |
| 500 | "99+" |
| 1,500 | "1.5K" |
| 25,000 | "25K" |
| 150,000 | "150K" |
| 1,200,000 | "1.2M" |
| 5,500,000 | "5.5M" |

### Other Formatting Converters

**Status Text Converter:**
```csharp
public class StatusTextConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, string language)
    {
        if (value is int count)
        {
            return count > 0 ? $"{count} new" : "Up to date";
        }
        return value;
    }

    public object ConvertBack(object value, Type targetType, object parameter, string language)
    {
        throw new NotImplementedException();
    }
}
```

**Timestamp Converter:**
```csharp
public class TimeAgoConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, string language)
    {
        if (value is DateTime timestamp)
        {
            var span = DateTime.Now - timestamp;
            if (span.TotalMinutes < 60)
                return $"{(int)span.TotalMinutes}m";
            else if (span.TotalHours < 24)
                return $"{(int)span.TotalHours}h";
            else
                return $"{(int)span.TotalDays}d";
        }
        return value;
    }

    public object ConvertBack(object value, Type targetType, object parameter, string language)
    {
        throw new NotImplementedException();
    }
}
```

## Badge Without BadgeContainer

Use Badge as a standalone element within layouts without the BadgeContainer wrapper.

### When to Use Standalone Badge

**Use BadgeContainer when:**
- Badge needs to overlay another control
- You want automatic positioning relative to content
- Badge should follow content during resizing

**Use standalone Badge when:**
- Badge is part of a Grid, StackPanel, or other layout
- You control positioning with layout properties
- Using Badge in ListView or other ItemTemplates
- Badge is an independent UI element, not an overlay

### Standalone Badge in Grid

```xaml
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="*"/>
        <ColumnDefinition Width="Auto"/>
    </Grid.ColumnDefinitions>
    
    <TextBlock Text="Notifications" 
               VerticalAlignment="Center"
               Grid.Column="0"/>
    
    <notification:SfBadge Content="5"
                         Fill="Error"
                         Shape="Ellipse"
                         Grid.Column="1"
                         VerticalAlignment="Center"/>
</Grid>
```

### Standalone Badge in StackPanel

```xaml
<StackPanel Orientation="Horizontal" Spacing="8">
    <FontIcon Glyph="&#xE910;" FontSize="20"/>
    <TextBlock Text="Messages" VerticalAlignment="Center"/>
    <notification:SfBadge Content="12" 
                         Fill="Warning"
                         Height="20"
                         VerticalAlignment="Center"/>
</StackPanel>
```

### Badge in ListView ItemTemplate

Display badges for each list item:

**ViewModel:**
```csharp
public class MailItem
{
    public string FolderName { get; set; }
    public int? UnreadCount { get; set; }
    public bool HasUnread => UnreadCount.HasValue && UnreadCount > 0;
    public Visibility BadgeVisibility => HasUnread ? Visibility.Visible : Visibility.Collapsed;
}

public class ViewModel
{
    public List<MailItem> MailItems { get; set; }
    
    public ViewModel()
    {
        MailItems = new List<MailItem>
        {
            new MailItem { FolderName = "Inbox", UnreadCount = 20 },
            new MailItem { FolderName = "Drafts", UnreadCount = null },
            new MailItem { FolderName = "Sent Items", UnreadCount = 5 },
            new MailItem { FolderName = "Deleted Items", UnreadCount = null },
            new MailItem { FolderName = "Junk Email", UnreadCount = 3 }
        };
    }
}
```

**XAML:**
```xaml
<Page.DataContext>
    <local:ViewModel/>
</Page.DataContext>

<ListView BorderThickness="1"
          BorderBrush="LightGray"
          ItemsSource="{Binding MailItems}"
          SelectedIndex="0">
    <ListView.ItemTemplate>
        <DataTemplate x:DataType="local:MailItem">
            <Grid Padding="12,8">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="*"/>
                    <ColumnDefinition Width="Auto"/>
                </Grid.ColumnDefinitions>
                
                <TextBlock Text="{x:Bind FolderName}" 
                          VerticalAlignment="Center"
                          FontSize="14"/>
                
                <notification:SfBadge Grid.Column="1"
                                     Content="{x:Bind UnreadCount}"
                                     Fill="Warning"
                                     Shape="Oval"
                                     Height="20"
                                     MinWidth="30"
                                     Visibility="{x:Bind BadgeVisibility}"
                                     VerticalAlignment="Center"/>
            </Grid>
        </DataTemplate>
    </ListView.ItemTemplate>
</ListView>
```

### Standalone Badge Limitations

When using Badge without BadgeContainer:

**Not available:**
- Automatic overlay positioning
- HorizontalAnchor/VerticalAnchor properties
- HorizontalPosition/VerticalPosition properties (0-1 range)
- Automatic repositioning relative to content

**Still available:**
- All visual properties (Background, Foreground, Shape, Fill)
- Content and ContentTemplate
- Standard layout properties (Width, Height, Margin)
- Animations
- Text formatting

**Position with layout properties:**
```xaml
<Grid>
    <!-- Use Grid positioning instead of anchor properties -->
    <Button Content="Button" HorizontalAlignment="Center"/>
    <notification:SfBadge Content="5"
                         Fill="Error"
                         HorizontalAlignment="Right"
                         VerticalAlignment="Top"
                         Margin="0,0,10,0"/>
</Grid>
```

## Practical Feature Examples

### Example 1: Animated Shopping Cart Badge

```xaml
<Page>
    <Page.Resources>
        <local:CustomNumberConverter x:Key="numberFormatter"/>
    </Page.Resources>
    
    <notification:BadgeContainer>
        <notification:BadgeContainer.Content>
            <Button Width="50" Height="50">
                <FontIcon Glyph="&#xE7BF;" FontSize="24"/>
            </Button>
        </notification:BadgeContainer.Content>
        <notification:BadgeContainer.Badge>
            <notification:SfBadge Content="{x:Bind CartItemCount, Mode=OneWay, Converter={StaticResource numberFormatter}}"
                                 AnimationType="Scale"
                                 Fill="Success"
                                 Shape="Ellipse"
                                 FontSize="12"
                                 Width="24"
                                 Height="24"/>
        </notification:BadgeContainer.Badge>
    </notification:BadgeContainer>
</Page>
```

### Example 2: Status List with Badges

```xaml
<ListView ItemsSource="{x:Bind StatusItems}">
    <ListView.ItemTemplate>
        <DataTemplate x:DataType="local:StatusItem">
            <Grid Padding="10">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="Auto"/>
                    <ColumnDefinition Width="*"/>
                    <ColumnDefinition Width="Auto"/>
                </Grid.ColumnDefinitions>
                
                <FontIcon Glyph="{x:Bind Icon}" 
                         FontSize="20"
                         Margin="0,0,12,0"/>
                
                <StackPanel Grid.Column="1" VerticalAlignment="Center">
                    <TextBlock Text="{x:Bind Title}" FontWeight="SemiBold"/>
                    <TextBlock Text="{x:Bind Description}" 
                              FontSize="12" 
                              Foreground="Gray"/>
                </StackPanel>
                
                <notification:SfBadge Grid.Column="2"
                                     Content="{x:Bind Count}"
                                     Fill="{x:Bind BadgeFill}"
                                     Shape="Oval"
                                     Height="24"
                                     MinWidth="24"
                                     VerticalAlignment="Center"
                                     Visibility="{x:Bind HasCount}"/>
            </Grid>
        </DataTemplate>
    </ListView.ItemTemplate>
</ListView>
```

### Example 3: Multi-State Notification Badge

```csharp
private void UpdateNotificationBadge(int count, NotificationType type)
{
    badge.Content = count > 99 ? "99+" : count.ToString();
    badge.AnimationType = BadgeAnimationType.Scale;
    
    switch (type)
    {
        case NotificationType.Info:
            badge.Fill = BadgeFill.Information;
            break;
        case NotificationType.Warning:
            badge.Fill = BadgeFill.Warning;
            break;
        case NotificationType.Error:
            badge.Fill = BadgeFill.Error;
            break;
        default:
            badge.Fill = BadgeFill.Accent;
            break;
    }
    
    badge.Visibility = count > 0 ? Visibility.Visible : Visibility.Collapsed;
}
```

## Best Practices

### Animation Guidelines

1. **Use Scale for emphasis** - Best for notifications that need immediate attention
2. **Use Opacity for subtle changes** - Better for frequently updating values
3. **Avoid animation for rapid updates** - If content changes multiple times per second, disable animation
4. **Test performance** - Animations on many badges simultaneously can impact performance

### Content Formatting Guidelines

1. **Format large numbers** - Always use "99+" or "K/M" notation for readability
2. **Consistent formatting** - Use the same format throughout your app
3. **Consider width** - Formatted content should fit badge width
4. **Null handling** - Converters should handle null values gracefully

### Standalone Badge Guidelines

1. **Use in templates** - Ideal for ListView, GridView, or DataTemplate scenarios
2. **Manual positioning** - Take responsibility for layout and spacing
3. **Visibility management** - Explicitly handle show/hide logic
4. **Test in layout** - Verify badge appearance in various container sizes

## Feature Combination Examples

### Animated + Formatted + Standalone

```xaml
<ListView ItemsSource="{x:Bind Channels}">
    <ListView.ItemTemplate>
        <DataTemplate x:DataType="local:Channel">
            <Grid>
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="*"/>
                    <ColumnDefinition Width="Auto"/>
                </Grid.ColumnDefinitions>
                
                <TextBlock Text="{x:Bind Name}" VerticalAlignment="Center"/>
                
                <notification:SfBadge Grid.Column="1"
                                     Content="{x:Bind UnreadMessages, Mode=OneWay, Converter={StaticResource numberFormatter}}"
                                     AnimationType="Scale"
                                     Fill="Error"
                                     Shape="Ellipse"
                                     Visibility="{x:Bind HasUnread, Mode=OneWay}"
                                     VerticalAlignment="Center"/>
            </Grid>
        </DataTemplate>
    </ListView.ItemTemplate>
</ListView>
```

## Summary

| Feature | Property | Use Case |
|---------|----------|----------|
| **Scale Animation** | AnimationType="Scale" | Attention-grabbing updates |
| **Fade Animation** | AnimationType="Opacity" | Subtle content changes |
| **Number Formatting** | Custom Converter | Display large counts compactly |
| **Standalone Badge** | Without BadgeContainer | ListView items, layouts |
| **Content Converter** | IValueConverter | Format any badge content |

### Key Takeaways

1. **Animations** trigger only on Content changes
2. **Custom formatters** make large numbers readable
3. **Standalone badges** work in templates and layouts without overlay behavior
4. **Combine features** for rich, dynamic badge experiences
5. **Test thoroughly** especially animations and converters with edge cases
