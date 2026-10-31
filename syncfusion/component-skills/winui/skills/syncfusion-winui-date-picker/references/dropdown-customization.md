# Dropdown Customization in WinUI DatePicker

Complete guide for customizing the dropdown button, placement, height, and behavior of the Syncfusion WinUI DatePicker control.

## Table of Contents
- [Dropdown Button Customization](#dropdown-button-customization)
- [Hiding Dropdown Button](#hiding-dropdown-button)
- [Dropdown Alignment](#dropdown-alignment)
- [Programmatic Control](#programmatic-control)
- [Dropdown Height](#dropdown-height)
- [Visible Items Count](#visible-items-count)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Dropdown Button Customization

### Using DropDownButtonTemplate

Customize the dropdown button appearance with a custom template:

```xml
<editors:SfDatePicker
    x:Name="datePicker"
    PlaceholderText="Pick a travel date">
    <editors:SfDatePicker.DropDownButtonTemplate>
        <DataTemplate>
            <Grid>
                <FontIcon 
                    FontFamily="Segoe MDL2 Assets"
                    Glyph="&#xE787;"
                    Width="20"
                    Height="20"
                    Foreground="{Binding Foreground, RelativeSource={RelativeSource Mode=TemplatedParent}}" />
            </Grid>
        </DataTemplate>
    </editors:SfDatePicker.DropDownButtonTemplate>
</editors:SfDatePicker>
```

**DataContext:** The `DataContext` of `DropDownButtonTemplate` is the `SfDatePicker` control itself.

### Custom Icon Examples

**Calendar Icon:**
```xml
<editors:SfDatePicker.DropDownButtonTemplate>
    <DataTemplate>
        <FontIcon 
            FontFamily="Segoe MDL2 Assets"
            Glyph="&#xE787;"
            Foreground="Blue" />
    </DataTemplate>
</editors:SfDatePicker.DropDownButtonTemplate>
```

**Custom SVG Path:**
```xml
<editors:SfDatePicker.DropDownButtonTemplate>
    <DataTemplate>
        <Grid>
            <Grid.Resources>
                <x:String x:Key="flightIcon">M11.294993,2L15.378997,14...</x:String>
            </Grid.Resources>
            <Path
                Width="20"
                Height="20"
                Data="{StaticResource flightIcon}"
                Fill="{Binding Foreground, RelativeSource={RelativeSource Mode=TemplatedParent}}"
                Stretch="Uniform" />
        </Grid>
    </DataTemplate>
</editors:SfDatePicker.DropDownButtonTemplate>
```

**Image Icon:**
```xml
<editors:SfDatePicker.DropDownButtonTemplate>
    <DataTemplate>
        <Image 
            Source="/Assets/calendar-icon.png"
            Width="20"
            Height="20"
            Stretch="Uniform" />
    </DataTemplate>
</editors:SfDatePicker.DropDownButtonTemplate>
```

### Styled Button

```xml
<editors:SfDatePicker.DropDownButtonTemplate>
    <DataTemplate>
        <Border 
            Background="LightBlue"
            CornerRadius="4"
            Padding="8">
            <StackPanel Orientation="Horizontal" Spacing="4">
                <FontIcon 
                    FontFamily="Segoe MDL2 Assets"
                    Glyph="&#xE787;"
                    FontSize="14" />
                <TextBlock Text="Pick" FontSize="12" />
            </StackPanel>
        </Border>
    </DataTemplate>
</editors:SfDatePicker.DropDownButtonTemplate>
```

### Common Icon Glyphs

| Icon | Glyph | Unicode |
|------|-------|---------|
| Calendar | 📅 | `&#xE787;` |
| Date | 📆 | `&#xE163;` |
| Clock | 🕐 | `&#xE121;` |
| Down Arrow | ⬇ | `&#xE70D;` |
| ChevronDown | ⌄ | `&#xE0E5;` |

## Hiding Dropdown Button

### ShowDropDownButton Property

Hide the dropdown button entirely:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    ShowDropDownButton="False" />
```

```csharp
datePicker.ShowDropDownButton = false;
```

**Default:** `true` (button visible)

### Opening Dropdown Without Button

When the button is hidden, users can still open dropdown using keyboard:
- Press `Alt + Down Arrow` to open
- Press `Alt + Up Arrow` to close

### Use Cases

**Hide button when:**
- Minimal UI design required
- Keyboard-only input preferred
- Custom trigger button implemented
- Space-constrained layouts

**Example: Custom Trigger Button**
```xml
<StackPanel Orientation="Horizontal">
    <editors:SfDatePicker 
        x:Name="datePicker"
        ShowDropDownButton="False"
        Width="200" />
    <Button 
        Content="📅"
        Click="OpenDropdown_Click"
        Margin="5,0,0,0" />
</StackPanel>
```

```csharp
private void OpenDropdown_Click(object sender, RoutedEventArgs e)
{
    datePicker.IsOpen = true;
}
```

## Dropdown Alignment

### DropDownPlacement Property

Control where the dropdown appears relative to the control:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    DropDownPlacement="BottomEdgeAlignedLeft" />
```

```csharp
datePicker.DropDownPlacement = FlyoutPlacementMode.BottomEdgeAlignedLeft;
```

**Default:** `Auto` (automatic positioning)

### Placement Options

| Value | Description | Visual Position |
|-------|-------------|-----------------|
| `Auto` | Automatic (default) | System decides best fit |
| `Top` | Above control, centered | ↑ |
| `Bottom` | Below control, centered | ↓ |
| `Left` | Left of control, centered | ← |
| `Right` | Right of control, centered | → |
| `TopEdgeAlignedLeft` | Top, left-aligned | ↖ |
| `TopEdgeAlignedRight` | Top, right-aligned | ↗ |
| `BottomEdgeAlignedLeft` | Bottom, left-aligned | ↙ |
| `BottomEdgeAlignedRight` | Bottom, right-aligned | ↘ |
| `LeftEdgeAlignedTop` | Left, top-aligned | ⬅ |
| `LeftEdgeAlignedBottom` | Left, bottom-aligned | ⬅ |
| `RightEdgeAlignedTop` | Right, top-aligned | ➡ |
| `RightEdgeAlignedBottom` | Right, bottom-aligned | ➡ |
| `Full` | Full screen overlay | ⬜ |

### Placement Examples

**Bottom Left Aligned:**
```xml
<editors:SfDatePicker 
    DropDownPlacement="BottomEdgeAlignedLeft" />
```

**Bottom Right Aligned:**
```xml
<editors:SfDatePicker 
    DropDownPlacement="BottomEdgeAlignedRight" />
```

**Right Side:**
```xml
<editors:SfDatePicker 
    DropDownPlacement="Right" />
```

**Smart Positioning:** If the specified placement doesn't have enough space, DatePicker automatically adjusts the position.

### RTL Considerations

Alignment automatically mirrors in RTL mode:
- `BottomEdgeAlignedLeft` becomes right-aligned in RTL
- `BottomEdgeAlignedRight` becomes left-aligned in RTL

## Programmatic Control

### IsOpen Property

Open or close the dropdown programmatically:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    IsOpen="True" />
```

```csharp
// Open dropdown
datePicker.IsOpen = true;

// Close dropdown
datePicker.IsOpen = false;

// Toggle dropdown
datePicker.IsOpen = !datePicker.IsOpen;
```

**Default:** `false` (closed)

### Opening on Load

```csharp
public MainWindow()
{
    InitializeComponent();
    
    // Open dropdown when window loads
    this.Loaded += (s, e) =>
    {
        datePicker.IsOpen = true;
    };
}
```

### Conditional Opening

```csharp
private void OpenDropdownIfEmpty()
{
    if (!datePicker.SelectedDate.HasValue)
    {
        datePicker.IsOpen = true;
    }
}
```

### Opening with Custom Button

```xml
<StackPanel>
    <Button 
        Content="Select Date"
        Click="SelectDate_Click" />
    <editors:SfDatePicker 
        x:Name="datePicker"
        ShowDropDownButton="False"
        Margin="0,10,0,0" />
</StackPanel>
```

```csharp
private void SelectDate_Click(object sender, RoutedEventArgs e)
{
    datePicker.IsOpen = true;
}
```

### Closing on Selection

Automatically close after selection (with `ShowSubmitButtons="False"`):

```xml
<editors:SfDatePicker 
    ShowSubmitButtons="False"
    SelectedDateChanged="DatePicker_SelectedDateChanged" />
```

```csharp
private void DatePicker_SelectedDateChanged(DependencyObject d, 
    DependencyPropertyChangedEventArgs e)
{
    // Dropdown closes automatically with ShowSubmitButtons=False
    Console.WriteLine($"Selected: {e.NewDateTime}");
}
```

## Dropdown Height

### DropDownHeight Property

Control the height of the dropdown spinner:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    DropDownHeight="200" />
```

```csharp
datePicker.DropDownHeight = 200;
```

**Default:** `NaN` (auto-sized)

### Height Considerations

The effective visible items depend on:
- `DropDownHeight` value
- `ItemHeight` property (cell height)
- Header height (if shown)
- Submit button height (if shown)

**Formula:**
```
Visible Items ≈ (DropDownHeight - HeaderHeight - ButtonsHeight) / ItemHeight
```

### Height Examples

**Compact View:**
```xml
<editors:SfDatePicker 
    DropDownHeight="150"
    ItemHeight="30" />
<!-- Shows ~5 items per column -->
```

**Expanded View:**
```xml
<editors:SfDatePicker 
    DropDownHeight="400"
    ItemHeight="40" />
<!-- Shows ~10 items per column -->
```

**Auto Height:**
```xml
<editors:SfDatePicker 
    DropDownHeight="NaN" />
<!-- Auto-sizes based on content -->
```

## Visible Items Count

### VisibleItemsCount Property

Specify exact number of visible items in spinner:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    VisibleItemsCount="5" />
```

```csharp
datePicker.VisibleItemsCount = 5;
```

**Default:** `-1` (auto-calculated)

### Count Examples

**Show 3 Items:**
```xml
<editors:SfDatePicker VisibleItemsCount="3" />
```

**Show 7 Items:**
```xml
<editors:SfDatePicker VisibleItemsCount="7" />
```

**Show 10 Items:**
```xml
<editors:SfDatePicker VisibleItemsCount="10" />
```

### Precedence

When both `DropDownHeight` and `VisibleItemsCount` are set:
- `VisibleItemsCount` has **higher precedence**
- `DropDownHeight` is calculated based on `VisibleItemsCount`

```xml
<!-- VisibleItemsCount wins -->
<editors:SfDatePicker 
    DropDownHeight="300"
    VisibleItemsCount="5" />
<!-- Shows exactly 5 items, height adjusts accordingly -->
```

## Common Patterns

### Pattern 1: Compact DatePicker
```xml
<editors:SfDatePicker 
    Width="150"
    DropDownHeight="150"
    VisibleItemsCount="3"
    ItemHeight="30"
    ShowColumnHeaders="False" />
```

### Pattern 2: Full-Featured Picker
```xml
<editors:SfDatePicker 
    Width="250"
    DropDownHeight="350"
    VisibleItemsCount="7"
    DropDownHeader="Select Date"
    ShowDropDownHeader="True"
    ShowColumnHeaders="True" />
```

### Pattern 3: Minimal UI
```xml
<editors:SfDatePicker 
    ShowDropDownButton="False"
    ShowSubmitButtons="False"
    ShowClearButton="False"
    DropDownPlacement="BottomEdgeAlignedLeft" />
```

### Pattern 4: Custom Branded Picker
```xml
<editors:SfDatePicker>
    <editors:SfDatePicker.DropDownButtonTemplate>
        <DataTemplate>
            <Border 
                Background="{ThemeResource AccentFillColorDefaultBrush}"
                CornerRadius="4"
                Padding="8,4">
                <FontIcon 
                    Glyph="&#xE787;"
                    Foreground="White"
                    FontSize="16" />
            </Border>
        </DataTemplate>
    </editors:SfDatePicker.DropDownButtonTemplate>
</editors:SfDatePicker>
```

### Pattern 5: Touch-Friendly Picker
```xml
<editors:SfDatePicker 
    DropDownHeight="400"
    VisibleItemsCount="5"
    ItemHeight="50"
    ItemWidth="80"
    ShowSubmitButtons="True" />
```

## Troubleshooting

### Issue: Dropdown Opens Off-Screen
**Cause:** Fixed placement without enough space  
**Solution:** Use `Auto` placement or adjust manually:
```xml
<editors:SfDatePicker DropDownPlacement="Auto" />
```

### Issue: DropDownHeight Not Working
**Cause:** `VisibleItemsCount` is overriding height  
**Solution:** Remove `VisibleItemsCount` or set to `-1`:
```xml
<editors:SfDatePicker 
    DropDownHeight="200"
    VisibleItemsCount="-1" />
```

### Issue: Custom Button Icon Not Showing
**Cause:** Missing resources or incorrect glyph  
**Solution:** Verify font family and glyph:
```xml
<FontIcon 
    FontFamily="Segoe MDL2 Assets"
    Glyph="&#xE787;" />
<!-- Note: Must include '&#x' prefix and ';' suffix -->
```

### Issue: IsOpen Not Opening Dropdown
**Cause:** Property set before control is loaded  
**Solution:** Wait for Loaded event:
```csharp
datePicker.Loaded += (s, e) =>
{
    datePicker.IsOpen = true;
};
```

### Issue: Dropdown Too Small on Touch Devices
**Cause:** Default sizes too small for touch  
**Solution:** Increase item sizes:
```xml
<editors:SfDatePicker 
    ItemHeight="50"
    ItemWidth="80"
    VisibleItemsCount="5" />
```

## Next Steps

- **Dropdown Header:** Customize header and column headers
- **Spinner Customization:** Customize cell appearance and behavior
- **Getting Started:** Basic DatePicker setup

## Related Resources

- [GitHub Examples - Dropdown](https://github.com/SyncfusionExamples/syncfusion-winui-tools-datepicker-examples/tree/main/Samples/ViewAndItemCustomization)
- [Dropdown Header Guide](dropdown-header-customization.md)
- [Spinner Customization](spinner-customization.md)
