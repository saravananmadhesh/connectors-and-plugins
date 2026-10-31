# Dropdown Modes and Placement in WinUI DropDown Color Picker

> **Note:** Update the `Syncfusion.Editors.WinUI` NuGet package to the latest version to ensure all dropdown modes and placement options work correctly.

## Table of Contents
- [Dropdown Modes](#dropdown-modes)
- [Dropdown Placement](#dropdown-placement)
- [Placement Mode Reference](#placement-mode-reference)
- [Responsive Placement](#responsive-placement)
- [Split Button Implementation](#split-button-implementation)
- [Button Click Command Pattern](#button-click-command-pattern)

## Dropdown Modes

The `DropDownMode` property controls how the control behaves when clicked:

### Mode 1: Dropdown (Default)

**Behavior:** Clicking anywhere on the header opens the color picker.

```xaml
<editors:SfDropDownColorPicker DropDownMode="Dropdown"
                               x:Name="colorPicker" />
```

**Use Cases:**
- General color selection
- When you want a single action (open dropdown)
- Simpler UX for basic color pickers

**Visual Behavior:**
```
+-------------------+
| [Blue Color Block] |  ← Entire area clickable
+-------------------+
```

### Mode 2: Split

**Behavior:** Header is split into two areas:
- **Left side**: Shows selected color (button area)
- **Right side**: Small dropdown arrow button

Clicking the left side triggers a command (apply action).
Clicking the right arrow opens the color picker dropdown.

```xaml
<editors:SfDropDownColorPicker DropDownMode="Split"
                               x:Name="colorPicker"
                               Command="{x:Bind ApplyColorCommand}" />
```

**Use Cases:**
- Apply last selected color with button click
- Quick access to apply color without opening dropdown
- Advanced workflows where user frequently applies same color
- Rich text editing (change text color without opening picker)

**Visual Behavior:**
```
+-------------------+---+
| [Blue Color Block] | ▼ |  ← Left: Apply command, Right: Open dropdown
+-------------------+---+
```

### Comparison

| Aspect | Dropdown | Split |
|--------|----------|-------|
| Single Click Area | Yes | No |
| Quick Apply | No | Yes |
| Command Support | No | Yes |
| Visual Feedback | Simple | Richer |
| User Intent | Select new color | Select or apply |

## Dropdown Placement

The `DropDownPlacement` property controls where the color picker flyout appears relative to the control:

```xaml
<editors:SfDropDownColorPicker DropDownPlacement="BottomEdgeAlignedRight"
                               x:Name="colorPicker" />
```

### Available Placement Values

These are from the `FlyoutPlacementMode` enumeration:

- `Auto` - Automatically choose best position (default)
- `Top` - Above the control, left-aligned
- `TopEdgeAlignedLeft` - Above, left edge aligned
- `TopEdgeAlignedRight` - Above, right edge aligned
- `Bottom` - Below the control, left-aligned
- `BottomEdgeAlignedLeft` - Below, left edge aligned
- `BottomEdgeAlignedRight` - Below, right edge aligned
- `Left` - To the left, top-aligned
- `LeftEdgeAlignedTop` - Left, top edge aligned
- `LeftEdgeAlignedBottom` - Left, bottom edge aligned
- `Right` - To the right, top-aligned
- `RightEdgeAlignedTop` - Right, top edge aligned
- `RightEdgeAlignedBottom` - Right, bottom edge aligned
- `Full` - Expands to fill available space

## Placement Mode Reference

### Positioning Examples

**Bottom Positions (Most Common)**

```xaml
<!-- Default below, left-aligned -->
<editors:SfDropDownColorPicker DropDownPlacement="Bottom" />

<!-- Below, aligned to right edge of control -->
<editors:SfDropDownColorPicker DropDownPlacement="BottomEdgeAlignedRight" />

<!-- Below, aligned to left edge of control -->
<editors:SfDropDownColorPicker DropDownPlacement="BottomEdgeAlignedLeft" />
```

**Top Positions (When below is crowded)**

```xaml
<!-- Above, left-aligned -->
<editors:SfDropDownColorPicker DropDownPlacement="Top" />

<!-- Above, right edge aligned -->
<editors:SfDropDownColorPicker DropDownPlacement="TopEdgeAlignedRight" />
```

**Right Positions (For left sidebars)**

```xaml
<!-- To the right, top-aligned -->
<editors:SfDropDownColorPicker DropDownPlacement="Right" />

<!-- To the right, bottom edge aligned -->
<editors:SfDropDownColorPicker DropDownPlacement="RightEdgeAlignedBottom" />
```

**Left Positions (For right sidebars)**

```xaml
<!-- To the left, top-aligned -->
<editors:SfDropDownColorPicker DropDownPlacement="Left" />
```

**Full Screen**

```xaml
<!-- Expands to fill available space (mobile-like behavior) -->
<editors:SfDropDownColorPicker DropDownPlacement="Full" />
```

### Visual Reference

```
         Top
       ┌─────┐
  Left │ Ctrl│ Right
       └─────┘
       Bottom

TopEdgeAlignedLeft:         TopEdgeAlignedRight:
[Dropdown]                            [Dropdown]
[Control]                             [Control]

BottomEdgeAlignedLeft:       BottomEdgeAlignedRight:
[Control]                    [Control]
[Dropdown]                   [Dropdown]
```

## Responsive Placement

### Automatic Placement (Recommended)

WinUI automatically selects the best position if there's insufficient space in the requested direction:

```xaml
<!-- Try bottom, but auto-switch if space unavailable -->
<editors:SfDropDownColorPicker DropDownPlacement="Bottom" />
```

### Dynamic Placement Based on Position

Choose placement based on control location:

**XAML ViewModel Pattern**

```csharp
public class ColorPickerViewModel : INotifyPropertyChanged
{
    private FlyoutPlacementMode _placement = FlyoutPlacementMode.Bottom;
    
    public FlyoutPlacementMode DropdownPlacement
    {
        get => _placement;
        set { _placement = value; OnPropertyChanged(); }
    }
    
    public void AdjustPlacementForPosition(int controlY, int windowHeight)
    {
        // If control is in lower half, open upward
        if (controlY > windowHeight / 2)
        {
            DropdownPlacement = FlyoutPlacementMode.TopEdgeAlignedRight;
        }
        else
        {
            DropdownPlacement = FlyoutPlacementMode.BottomEdgeAlignedRight;
        }
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged([CallerMemberName] string name = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
    }
}
```

```xaml
<editors:SfDropDownColorPicker DropDownPlacement="{x:Bind ViewModel.DropdownPlacement, Mode=OneWay}" />
```

## Split Button Implementation

### Basic Split Mode

```xaml
<editors:SfDropDownColorPicker DropDownMode="Split"
                               x:Name="colorPicker"
                               SelectedBrush="Blue" />
```

### Split Mode with Command

```xaml
<editors:SfDropDownColorPicker DropDownMode="Split"
                               x:Name="colorPicker"
                               SelectedBrush="Blue"
                               Command="{x:Bind ApplyColorCommand}" />
```

### Code-Behind Implementation

```csharp
public sealed partial class SplitModePage : Page
{
    private ICommand _applyColorCommand;
    
    public ICommand ApplyColorCommand => _applyColorCommand ??= new RelayCommand(() =>
    {
        var brush = colorPicker.SelectedBrush as SolidColorBrush;
        if (brush != null)
        {
            ApplySelectedColorToTarget(brush);
        }
    });
    
    private void ApplySelectedColorToTarget(SolidColorBrush brush)
    {
        // Apply the currently selected color
        targetRectangle.Fill = brush;
        statusText.Text = $"Applied: {brush.Color}";
    }
    
    public SplitModePage()
    {
        this.InitializeComponent();
    }
}
```

### Split Mode Use Case: Rich Text Editor

Apply text color without reopening color picker:

```csharp
public class RichTextColorPickerViewModel
{
    private SfDropDownColorPicker _colorPicker;
    private RichEditBox _editor;
    
    public ICommand ApplyTextColorCommand => new RelayCommand(() =>
    {
        if (_editor?.Document.Selection != null)
        {
            var brush = _colorPicker.SelectedBrush as SolidColorBrush;
            if (brush != null)
            {
                _editor.Document.Selection.CharacterFormat.ForegroundColor = brush.Color;
            }
        }
    });
}
```

## Button Click Command Pattern

### Command Pattern Overview

The `Command` property on `SfDropDownColorPicker` is triggered when the button area is clicked (in Split mode).

### Creating Custom Command

```csharp
// Simple RelayCommand (requires using MVVM Toolkit or equivalent)
public ICommand ApplyColorCommand => new RelayCommand(() =>
{
    var selectedColor = colorPicker.SelectedBrush as SolidColorBrush;
    if (selectedColor != null)
    {
        PerformColorApplication(selectedColor);
    }
});

private void PerformColorApplication(SolidColorBrush color)
{
    // Apply color to UI element, save to settings, etc.
}
```

### Command with Parameter

```csharp
public ICommand ApplyColorCommand => new RelayCommand<object>((parameter) =>
{
    if (parameter is string targetName)
    {
        ApplyColorToElement(targetName);
    }
});

private void ApplyColorToElement(string elementName)
{
    var brush = colorPicker.SelectedBrush as SolidColorBrush;
    // Apply based on element name
}
```

### Split Mode Complete Example

```xaml
<Page xmlns:editors="using:Syncfusion.UI.Xaml.Editors">
    <StackPanel Padding="20" Spacing="15">
        <TextBlock Text="Text Editor Color Toolbar" FontSize="18" FontWeight="Bold" />
        
        <StackPanel Orientation="Horizontal" Spacing="10">
            <TextBlock Text="Text Color:" VerticalAlignment="Center" />
            
            <editors:SfDropDownColorPicker DropDownMode="Split"
                                           x:Name="textColorPicker"
                                           SelectedBrush="Black"
                                           Width="120"
                                           Command="{x:Bind ApplyTextColorCommand}" />
        </StackPanel>
        
        <!-- Text preview -->
        <RichEditBox x:Name="editor" 
                     Height="200"
                     Background="White"
                     BorderThickness="1"
                     BorderBrush="Gray" />
        
        <TextBlock Text="Click the button (left) to apply, click arrow to change" 
                   FontStyle="Italic" 
                   Foreground="Gray" />
    </StackPanel>
</Page>
```

```csharp
public sealed partial class TextEditorPage : Page
{
    public ICommand ApplyTextColorCommand { get; }
    
    public TextEditorPage()
    {
        this.InitializeComponent();
        
        ApplyTextColorCommand = new RelayCommand(() =>
        {
            if (editor.Document?.Selection != null)
            {
                var brush = textColorPicker.SelectedBrush as SolidColorBrush;
                if (brush != null)
                {
                    editor.Document.Selection.CharacterFormat.ForegroundColor = brush.Color;
                }
            }
        });
    }
}
```

### Tips for Command Implementation

1. **Check Selection**: Always validate that selection exists before applying
2. **Provide Feedback**: Show visual feedback when color is applied
3. **Handle Null Cases**: Brush might not be immediately available
4. **Use MVVM**: Leverage MVVM patterns for clean separation
5. **Combine with Events**: Can also listen to `SelectedBrushChanged` for automatic updates
