# Dropdown Customization in WinUI TimePicker

Comprehensive guide for customizing the dropdown behavior and appearance in the Syncfusion WinUI TimePicker control, including button templates, placement, height, and visibility options.

## Table of Contents
- [Overview](#overview)
- [Customizing Dropdown Button](#customizing-dropdown-button)
- [Hiding Dropdown Button](#hiding-dropdown-button)
- [Dropdown Placement](#dropdown-placement)
- [Programmatic Dropdown Control](#programmatic-dropdown-control)
- [Dropdown Height](#dropdown-height)
- [Visible Items Count](#visible-items-count)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The TimePicker dropdown provides various customization options to adapt the control to your application's design and user experience requirements.

**Customizable Elements:**
- Dropdown button appearance and template
- Dropdown button visibility
- Dropdown placement and alignment
- Dropdown open/close state
- Dropdown height
- Number of visible items

## Customizing Dropdown Button

Replace the default dropdown button with custom UI using `DropDownButtonTemplate`.

### Basic Custom Button

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    Width="250" Height="40">
    <editors:SfTimePicker.DropDownButtonTemplate>
        <DataTemplate>
            <Grid>
                <FontIcon 
                    FontFamily="Segoe MDL2 Assets" 
                    Glyph="&#xE121;" 
                    FontSize="16" />
            </Grid>
        </DataTemplate>
    </editors:SfTimePicker.DropDownButtonTemplate>
</editors:SfTimePicker>
```

### Custom Button with Icon

**Flight Icon Example:**
```xml
<Grid>
    <Grid.Resources>
        <x:String x:Key="flight">M11.294993,2L15.378997,14 15.277995,14 13.188995,14 9.1429941,14 7.6250149,14 6.9399958,14 6.0199964,11.5 3.2099977,11.5 4.725997,16.014 3.2099977,20.5 6.0199964,20.5 6.8039956,18 7.6250201,18 8.8379947,18 15.288014,18 15.365021,18.000015 11.436984,30.000015 14.368989,30.000015 20.100004,18.000015 20.273989,18.000015 27.989002,18C29.084003,18 29.975004,17.121 29.975004,15.96 29.975004,14.879 29.084003,14 27.989002,14L22.309006,14 20.211995,14 20.096004,14 14.368996,2z M8.6259891,0L15.719998,0 21.367719,12 27.989002,12C30.205004,12,32.001007,13.773,32.001007,15.96L32.001007,16.04C32.001007,18.227,30.205004,20,27.989002,20L21.366735,20 15.719025,32.000015 8.6260106,32.000015 12.536309,20 8.2531061,20 7.5219953,22.5 0,22.5 2.5709982,16.013 0,9.5 7.4539952,9.5 8.3923279,12 12.537137,12z</x:String>
    </Grid.Resources>
    
    <editors:SfTimePicker
        x:Name="sfTimePicker"
        VerticalAlignment="Top"
        Width="250"
        Height="40"
        PlaceholderText="Pick a travel time">
        <editors:SfTimePicker.DropDownButtonTemplate>
            <DataTemplate>
                <Grid>
                    <Path
                        Width="20"
                        Height="20"
                        Data="{StaticResource flight}"
                        Fill="{Binding Foreground, RelativeSource={RelativeSource Mode=TemplatedParent}}"
                        RenderTransformOrigin="0.5,0.5"
                        Stretch="Uniform" />
                </Grid>
            </DataTemplate>
        </editors:SfTimePicker.DropDownButtonTemplate>
    </editors:SfTimePicker>
</Grid>
```

### Clock Icon Button

```xml
<editors:SfTimePicker Width="250" Height="40">
    <editors:SfTimePicker.DropDownButtonTemplate>
        <DataTemplate>
            <Grid Width="32" Height="32">
                <FontIcon 
                    FontFamily="Segoe MDL2 Assets" 
                    Glyph="&#xE121;"
                    FontSize="18"
                    Foreground="{ThemeResource SystemAccentColor}" />
            </Grid>
        </DataTemplate>
    </editors:SfTimePicker.DropDownButtonTemplate>
</editors:SfTimePicker>
```

### Button with Text and Icon

```xml
<editors:SfTimePicker Width="280" Height="40">
    <editors:SfTimePicker.DropDownButtonTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="4">
                <FontIcon 
                    FontFamily="Segoe MDL2 Assets" 
                    Glyph="&#xE121;"
                    FontSize="14" />
                <TextBlock 
                    Text="Select" 
                    FontSize="12"
                    VerticalAlignment="Center" />
            </StackPanel>
        </DataTemplate>
    </editors:SfTimePicker.DropDownButtonTemplate>
</editors:SfTimePicker>
```

### Styled Button

```xml
<editors:SfTimePicker Width="250" Height="40">
    <editors:SfTimePicker.DropDownButtonTemplate>
        <DataTemplate>
            <Border 
                Background="{ThemeResource SystemAccentColor}"
                CornerRadius="4"
                Padding="8,4">
                <FontIcon 
                    FontFamily="Segoe MDL2 Assets" 
                    Glyph="&#xE121;"
                    Foreground="White"
                    FontSize="14" />
            </Border>
        </DataTemplate>
    </editors:SfTimePicker.DropDownButtonTemplate>
</editors:SfTimePicker>
```

### Calendar Glyph Button

```xml
<editors:SfTimePicker Width="250" Height="40">
    <editors:SfTimePicker.DropDownButtonTemplate>
        <DataTemplate>
            <Viewbox Width="20" Height="20">
                <FontIcon 
                    FontFamily="Segoe MDL2 Assets" 
                    Glyph="&#xE787;" />
            </Viewbox>
        </DataTemplate>
    </editors:SfTimePicker.DropDownButtonTemplate>
</editors:SfTimePicker>
```

### Template DataContext

The `DataContext` of `DropDownButtonTemplate` is the `SfTimePicker` instance itself.

```xml
<editors:SfTimePicker Width="250" Height="40">
    <editors:SfTimePicker.DropDownButtonTemplate>
        <DataTemplate>
            <Grid>
                <!-- Access TimePicker properties -->
                <TextBlock 
                    Text="{Binding SelectedTime, Converter={StaticResource TimeConverter}}"
                    FontSize="10" />
                <FontIcon 
                    FontFamily="Segoe MDL2 Assets" 
                    Glyph="&#xE121;" 
                    Margin="0,10,0,0" />
            </Grid>
        </DataTemplate>
    </editors:SfTimePicker.DropDownButtonTemplate>
</editors:SfTimePicker>
```

## Hiding Dropdown Button

Hide the dropdown button while keeping keyboard access.

### Basic Usage

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    ShowDropDownButton="False" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.ShowDropDownButton = false;
```

### Visual Comparison

**ShowDropDownButton="True" (Default):**
```
┌─────────────────────────────────────┐
│  02:30 PM                    [▼]    │
└─────────────────────────────────────┘
```

**ShowDropDownButton="False":**
```
┌─────────────────────────────────────┐
│  02:30 PM                           │
└─────────────────────────────────────┘
```

### Opening Dropdown Without Button

**Keyboard Shortcut:**
- Press `Alt + Down Arrow` to open dropdown
- Press `Alt + Up Arrow` to close dropdown

**Programmatic Control:**
```csharp
// Open dropdown
timePicker.IsOpen = true;

// Close dropdown
timePicker.IsOpen = false;
```

### Use Cases for Hidden Button

**Hide dropdown button when:**
- Keyboard-only data entry is preferred
- Cleaner, minimal UI is desired
- Custom trigger button is used
- Mobile/touch interface with custom gestures

### Custom Trigger Button

```xml
<StackPanel Orientation="Horizontal" Spacing="8">
    <editors:SfTimePicker 
        x:Name="sfTimePicker"
        ShowDropDownButton="False"
        Width="200" />
    
    <Button 
        Content="Select Time"
        Click="CustomButton_Click" />
</StackPanel>
```

```csharp
private void CustomButton_Click(object sender, RoutedEventArgs e)
{
    sfTimePicker.IsOpen = true;
}
```

## Dropdown Placement

Control where the dropdown appears relative to the TimePicker.

### Setting Placement

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    DropDownPlacement="BottomEdgeAlignedLeft" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.DropDownPlacement = FlyoutPlacementMode.BottomEdgeAlignedLeft;
```

### Placement Options

| Value | Description |
|-------|-------------|
| `Auto` | Smart positioning based on available space (default) |
| `Bottom` | Below control, centered |
| `Top` | Above control, centered |
| `Left` | Left of control, centered vertically |
| `Right` | Right of control, centered vertically |
| `BottomEdgeAlignedLeft` | Below control, aligned to left edge |
| `BottomEdgeAlignedRight` | Below control, aligned to right edge |
| `TopEdgeAlignedLeft` | Above control, aligned to left edge |
| `TopEdgeAlignedRight` | Above control, aligned to right edge |
| `LeftEdgeAlignedTop` | Left of control, aligned to top edge |
| `LeftEdgeAlignedBottom` | Left of control, aligned to bottom edge |
| `RightEdgeAlignedTop` | Right of control, aligned to top edge |
| `RightEdgeAlignedBottom` | Right of control, aligned to bottom edge |
| `Full` | Full screen flyout |

### Visual Examples

**BottomEdgeAlignedLeft:**
```
┌─────────────────────────────────────┐
│  TimePicker                   [▼]   │
└─────────────────────────────────────┘
  ↓
  ┌─────────────────────────────────┐
  │ Dropdown Spinner                │
  └─────────────────────────────────┘
```

**BottomEdgeAlignedRight:**
```
┌─────────────────────────────────────┐
│  TimePicker                   [▼]   │
└─────────────────────────────────────┘
                                    ↓
            ┌─────────────────────────────────┐
            │ Dropdown Spinner                │
            └─────────────────────────────────┘
```

**Top:**
```
            ┌─────────────────────────────────┐
            │ Dropdown Spinner                │
            └─────────────────────────────────┘
                          ↑
┌─────────────────────────────────────┐
│  TimePicker                   [▼]   │
└─────────────────────────────────────┘
```

### Smart Positioning

With `Auto` placement, the control automatically adjusts position based on available space:

```csharp
timePicker.DropDownPlacement = FlyoutPlacementMode.Auto;

// Behavior:
// - If enough space below: opens below
// - If not enough space below but above: opens above
// - If not enough space either side: opens where it fits best
```

### Placement Examples

```xml
<!-- Bottom left aligned (good for forms) -->
<editors:SfTimePicker 
    DropDownPlacement="BottomEdgeAlignedLeft"
    Width="250" />

<!-- Top aligned (when control is near bottom) -->
<editors:SfTimePicker 
    DropDownPlacement="Top"
    VerticalAlignment="Bottom"
    Width="250" />

<!-- Right aligned (in RTL layouts) -->
<editors:SfTimePicker 
    DropDownPlacement="BottomEdgeAlignedRight"
    FlowDirection="RightToLeft"
    Width="250" />
```

## Programmatic Dropdown Control

Open or close the dropdown programmatically using the `IsOpen` property.

### Opening Dropdown

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    IsOpen="True" />
```

**C#:**
```csharp
// Open dropdown
sfTimePicker.IsOpen = true;
```

### Closing Dropdown

```csharp
// Close dropdown
sfTimePicker.IsOpen = false;
```

### Toggle Dropdown

```csharp
// Toggle dropdown state
sfTimePicker.IsOpen = !sfTimePicker.IsOpen;
```

### Event-Driven Opening

```csharp
// Open on button click
private void OpenTimePickerButton_Click(object sender, RoutedEventArgs e)
{
    sfTimePicker.IsOpen = true;
}

// Open on focus
private void SfTimePicker_GotFocus(object sender, RoutedEventArgs e)
{
    sfTimePicker.IsOpen = true;
}

// Open on mouse hover (with delay)
private DispatcherTimer hoverTimer;

private void SfTimePicker_PointerEntered(object sender, PointerRoutedEventArgs e)
{
    hoverTimer = new DispatcherTimer { Interval = TimeSpan.FromMilliseconds(500) };
    hoverTimer.Tick += (s, args) =>
    {
        sfTimePicker.IsOpen = true;
        hoverTimer.Stop();
    };
    hoverTimer.Start();
}

private void SfTimePicker_PointerExited(object sender, PointerRoutedEventArgs e)
{
    hoverTimer?.Stop();
}
```

### Conditional Opening

```csharp
// Open dropdown only if no time is selected
private void OpenIfEmpty()
{
    if (!sfTimePicker.SelectedTime.HasValue)
    {
        sfTimePicker.IsOpen = true;
    }
}

// Open dropdown based on user role
private void ConditionalOpen(UserRole role)
{
    if (role == UserRole.Administrator)
    {
        sfTimePicker.IsOpen = true;
    }
}
```

## Dropdown Height

Set a fixed height for the dropdown container.

### Setting Dropdown Height

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    DropDownHeight="250" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.DropDownHeight = 250;
```

### Default Value

**Default:** `NaN` (auto-sized based on content)

### Height Impact

The dropdown height affects how many time items are visible:

```csharp
// Small dropdown (shows ~3-4 items)
timePicker.DropDownHeight = 150;

// Medium dropdown (shows ~5-6 items)
timePicker.DropDownHeight = 250;

// Large dropdown (shows ~8-10 items)
timePicker.DropDownHeight = 400;
```

### Relationship with ItemHeight

```csharp
// Each item is 40 pixels tall (default ItemHeight)
// DropDownHeight = 200 → shows 5 items (200 / 40 = 5)

timePicker.ItemHeight = 40;
timePicker.DropDownHeight = 200; // Shows 5 items

// Larger items
timePicker.ItemHeight = 60;
timePicker.DropDownHeight = 240; // Shows 4 items (240 / 60 = 4)
```

### Responsive Height

```csharp
// Adjust dropdown height based on window size
private void AdaptDropdownHeight()
{
    double windowHeight = Window.Current.Bounds.Height;
    
    if (windowHeight < 600)
    {
        sfTimePicker.DropDownHeight = 150; // Small
    }
    else if (windowHeight < 900)
    {
        sfTimePicker.DropDownHeight = 250; // Medium
    }
    else
    {
        sfTimePicker.DropDownHeight = 400; // Large
    }
}
```

## Visible Items Count

Control the number of visible items without setting explicit height.

### Setting Visible Items

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    VisibleItemsCount="5" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.VisibleItemsCount = 5;
```

### Default Value

**Default:** `-1` (auto-calculated based on DropDownHeight)

### Count Examples

```csharp
// Show 3 items
timePicker.VisibleItemsCount = 3;

// Show 5 items (recommended for mobile)
timePicker.VisibleItemsCount = 5;

// Show 7 items (recommended for desktop)
timePicker.VisibleItemsCount = 7;

// Show 9 items (large display)
timePicker.VisibleItemsCount = 9;
```

### Visual Impact

**VisibleItemsCount = 3:**
```
┌───────────┬───────────┬─────────────┐
│     10    │    25     │     AM      │
│  → 11 ←   │  → 30 ←   │  → PM ←     │
│     12    │    35     │     AM      │
└───────────┴───────────┴─────────────┘
```

**VisibleItemsCount = 7:**
```
┌───────────┬───────────┬─────────────┐
│     08    │    15     │     AM      │
│     09    │    20     │     PM      │
│     10    │    25     │     AM      │
│  → 11 ←   │  → 30 ←   │  → PM ←     │
│     12    │    35     │     AM      │
│     01    │    40     │     PM      │
│     02    │    45     │     AM      │
└───────────┴───────────┴─────────────┘
```

### Precedence

**When both properties are set:**
```csharp
timePicker.DropDownHeight = 300;
timePicker.VisibleItemsCount = 5;

// VisibleItemsCount takes precedence
// Dropdown height is calculated as: VisibleItemsCount × ItemHeight
```

### Calculated Height

```csharp
// With VisibleItemsCount
timePicker.VisibleItemsCount = 5;
timePicker.ItemHeight = 50;
// Effective dropdown height = 5 × 50 = 250 pixels
```

## Keyboard Shortcuts

Built-in keyboard shortcuts for dropdown control.

### Available Shortcuts

| Key Combination | Action |
|----------------|--------|
| `Alt + Down Arrow` | Open dropdown |
| `Alt + Up Arrow` | Close dropdown |
| `Escape` | Close dropdown (cancel changes if submit buttons shown) |
| `Enter` | Confirm selection and close (if submit buttons shown) |
| `Tab` | Move to next control (closes dropdown) |
| `Shift + Tab` | Move to previous control (closes dropdown) |

### Navigation in Dropdown

| Key | Action |
|-----|--------|
| `Up Arrow` | Move selection up in current column |
| `Down Arrow` | Move selection down in current column |
| `Left Arrow` | Move to previous column |
| `Right Arrow` | Move to next column |
| `Home` | Jump to first item in column |
| `End` | Jump to last item in column |
| `Page Up` | Move up multiple items |
| `Page Down` | Move down multiple items |

### Custom Keyboard Handler

```csharp
sfTimePicker.KeyDown += SfTimePicker_KeyDown;

private void SfTimePicker_KeyDown(object sender, KeyRoutedEventArgs e)
{
    // Custom F2 shortcut to open dropdown
    if (e.Key == Windows.System.VirtualKey.F2)
    {
        sfTimePicker.IsOpen = true;
        e.Handled = true;
    }
    
    // Custom Ctrl+T shortcut to set current time
    if (e.Key == Windows.System.VirtualKey.T && 
        Window.Current.CoreWindow.GetKeyState(Windows.System.VirtualKey.Control)
        .HasFlag(CoreVirtualKeyStates.Down))
    {
        sfTimePicker.SelectedTime = DateTimeOffset.Now;
        e.Handled = true;
    }
}
```

## Best Practices

### Dropdown Button Customization

✅ **Do:**
- Use recognizable icons (clock, calendar, dropdown arrow)
- Maintain consistent sizing with button area
- Use theme-aware colors for better contrast
- Test button in both light and dark themes

❌ **Don't:**
- Use overly complex button templates
- Make button too small to click/tap easily
- Use colors that don't meet WCAG contrast ratios
- Forget about touch targets (minimum 32x32 pixels)

### Dropdown Placement

✅ **Do:**
- Use `Auto` placement for most scenarios
- Test placement in different screen positions
- Consider form layout when choosing alignment
- Account for RTL layouts

❌ **Don't:**
- Force placement that causes clipping
- Ignore screen edges in placement logic
- Use fixed placement in responsive designs

### Height and Visibility

✅ **Do:**
- Show 5-7 items for optimal UX
- Use `VisibleItemsCount` instead of fixed height
- Adapt to screen size in responsive layouts
- Consider touch targets on mobile (larger items)

❌ **Don't:**
- Make dropdown too small (<3 items)
- Make dropdown unnecessarily large (>10 items)
- Set both DropDownHeight and VisibleItemsCount

### Performance

✅ **Do:**
- Keep dropdown button templates simple
- Cache custom icons and resources
- Use vector icons for scalability

❌ **Don't:**
- Load large images in button template
- Create complex animations in dropdown
- Perform heavy operations on dropdown open

## Troubleshooting

### Issue: Custom Button Not Showing

**Problem:** DropDownButtonTemplate doesn't display

**Solutions:**
1. **Verify template structure:**
   ```xml
   <editors:SfTimePicker.DropDownButtonTemplate>
       <DataTemplate>
           <Grid Width="32" Height="32">
               <!-- Content -->
           </Grid>
       </DataTemplate>
   </editors:SfTimePicker.DropDownButtonTemplate>
   ```

2. **Check button visibility:**
   ```xml
   ShowDropDownButton="True"
   ```

3. **Set explicit size:**
   ```xml
   <Grid Width="32" Height="32">
       <FontIcon FontSize="16" />
   </Grid>
   ```

### Issue: Dropdown Opens in Wrong Position

**Problem:** Dropdown appears off-screen or clipped

**Solutions:**
1. **Use Auto placement:**
   ```csharp
   timePicker.DropDownPlacement = FlyoutPlacementMode.Auto;
   ```

2. **Check parent container:**
   ```xml
   <!-- Ensure parent has enough space -->
   <Grid Margin="50"> <!-- Add margin -->
       <editors:SfTimePicker />
   </Grid>
   ```

3. **Adjust window margins:**
   ```csharp
   // Ensure control isn't too close to window edges
   ```

### Issue: Dropdown Height Not Applied

**Problem:** DropDownHeight setting ignored

**Solutions:**
1. **Check for VisibleItemsCount:**
   ```csharp
   // Remove VisibleItemsCount if setting DropDownHeight
   timePicker.VisibleItemsCount = -1;
   timePicker.DropDownHeight = 250;
   ```

2. **Set valid height:**
   ```csharp
   timePicker.DropDownHeight = 200; // Must be > 0
   ```

### Issue: Keyboard Shortcuts Not Working

**Problem:** Alt+Down doesn't open dropdown

**Solutions:**
1. **Ensure control has focus:**
   ```csharp
   sfTimePicker.Focus(FocusState.Keyboard);
   ```

2. **Check ShowDropDownButton:**
   ```csharp
   // Even if false, keyboard should work
   timePicker.ShowDropDownButton = false;
   ```

3. **Verify no conflicting handlers:**
   ```csharp
   // Remove custom KeyDown handlers that might prevent default behavior
   ```

## See Also

- [Dropdown Header Customization](dropdown-header-customization.md) - Customize dropdown header
- [Dropdown Spinner Customization](dropdown-spinner-customization.md) - Customize spinner cells
- [Getting Started](getting-started.md) - Basic TimePicker setup
