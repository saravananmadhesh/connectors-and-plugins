# Dropdown Customization

> **Note:** Update the `Syncfusion.Editors.WinUI` NuGet package to the latest version to ensure all dropdown customization features are available.

## Table of Contents
- [Change Dropdown Alignment](#change-dropdown-alignment)
- [Split Mode vs Dropdown Mode](#split-mode-vs-dropdown-mode)
- [Custom UI Templates](#custom-ui-templates)
- [Dropdown Events](#dropdown-events)

## Change Dropdown Alignment

The dropdown palette can appear in different positions relative to the control button. Use the `DropDownPlacement` property to control where the palette opens.

### DropDownPlacement Property

```xaml
<editors:SfDropDownColorPalette DropDownPlacement="BottomEdgeAlignedRight" />
```

```csharp
sfDropDownColorPalette.DropDownPlacement = FlyoutPlacementMode.BottomEdgeAlignedRight;
```

### Available Placement Modes

| Mode | Position | Best For |
|------|----------|----------|
| `Auto` | Best available | Default; let system choose |
| `Top` | Above button | Space available above |
| `Bottom` | Below button | Space available below |
| `Left` | Left of button | Space on left side |
| `Right` | Right of button | Space on right side |
| `TopEdgeAlignedLeft` | Above, left-aligned | Top-left positioning |
| `TopEdgeAlignedRight` | Above, right-aligned | Top-right positioning |
| `BottomEdgeAlignedLeft` | Below, left-aligned | Bottom-left positioning |
| `BottomEdgeAlignedRight` | Below, right-aligned | **Most common** |
| `LeftEdgeAlignedTop` | Left, top-aligned | Left-side layout |
| `LeftEdgeAlignedBottom` | Left, bottom-aligned | Left-side layout |
| `RightEdgeAlignedTop` | Right, top-aligned | Right-side layout |
| `RightEdgeAlignedBottom` | Right, bottom-aligned | Right-side layout |

### Automatic Repositioning

If there isn't enough space for the requested position, the palette automatically repositions itself to an available location.

```xaml
<!-- Request bottom-right, but if no space, system chooses best fit -->
<editors:SfDropDownColorPalette DropDownPlacement="BottomEdgeAlignedRight" />
```

**Example:** If palette is at bottom-right of screen and clicked, it might shift to `TopEdgeAlignedLeft` to stay visible.

### Placement Examples

**Bottom-Right (most common):**
```xaml
<editors:SfDropDownColorPalette DropDownPlacement="BottomEdgeAlignedRight" />
```

**Top-Left (near top of window):**
```xaml
<editors:SfDropDownColorPalette DropDownPlacement="TopEdgeAlignedLeft" />
```

**Automatic (let system decide):**
```xaml
<editors:SfDropDownColorPalette DropDownPlacement="Auto" />
```

## Split Mode vs Dropdown Mode

By default, clicking anywhere on the control opens the palette. Split mode separates this into two distinct areas: a button and a dropdown arrow.

### Dropdown Mode (Default)

**Behavior:** Click anywhere → Opens palette

```xaml
<editors:SfDropDownColorPalette 
    DropDownMode="Dropdown"
    x:Name="colorPalette" />
```

**Use Cases:**
- Simple color selection
- Limited space
- Only need color picker

**Example:**
```
User clicks selected color button → Palette opens
User clicks anywhere on button → Palette opens
```

### Split Mode

**Behavior:** 
- Click button → Execute command
- Click dropdown arrow → Open palette

```xaml
<editors:SfDropDownColorPalette 
    DropDownMode="Split"
    Command="{x:Bind ApplyColorCommand}"
    x:Name="colorPalette" />
```

**Use Cases:**
- Apply last-selected color immediately
- Separate palette selection from action
- Rich Text Editor scenarios (color + apply)
- Toolbar buttons

**Visual Layout:**
```
┌──────────────────┬─────┐
│   Selected Color │ ▼   │
│    (Button)      │Arrow│
└──────────────────┴─────┘
     Click applies     Click opens
     color directly    palette
```

### Example: Split Mode with Command

**XAML:**
```xaml
<StackPanel Orientation="Vertical">
    <RichEditBox x:Name="richTextBox" Margin="20" Height="200" />
    
    <editors:SfDropDownColorPalette 
        DropDownMode="Split"
        Command="{x:Bind ApplyColorCommand}"
        x:Name="colorPalette" />
</StackPanel>
```

**C# Code-Behind:**
```csharp
using Syncfusion.UI.Xaml.Editors;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Input;
using System.Windows.Input;

public sealed partial class MainPage : Page
{
    private ICommand applyColorCommand;
    
    public ICommand ApplyColorCommand
    {
        get => applyColorCommand;
    }
    
    public MainPage()
    {
        this.InitializeComponent();
        
        // Create command for button click
        applyColorCommand = new DelegateCommand(ApplyColorToText);
    }
    
    private void ApplyColorToText(object param)
    {
        // When button clicked, apply currently selected color
        var selectedBrush = colorPalette.SelectedBrush as SolidColorBrush;
        
        if (selectedBrush != null && richTextBox.Document.Selection != null)
        {
            // Apply color to selected text
            richTextBox.Document.Selection.CharacterFormat.BackgroundColor = 
                selectedBrush.Color;
        }
    }
}

// Simple ICommand implementation
public class DelegateCommand : ICommand
{
    private readonly Action<object> execute;
    
    public DelegateCommand(Action<object> execute)
    {
        this.execute = execute;
    }
    
    public event EventHandler CanExecuteChanged;
    
    public bool CanExecute(object parameter) => true;
    
    public void Execute(object parameter) => execute?.Invoke(parameter);
}
```

## Custom UI Templates

Customize the appearance of the selected color button and dropdown arrow using templates.

### ContentTemplate: Customize Selected Color Button

**Purpose:** Customize how the selected color is displayed

**Default:** Simple rectangle showing the color

**Custom:** Add icons, text labels, or complex layouts

### DropDownButtonTemplate: Customize Dropdown Arrow

**Purpose:** Customize the dropdown arrow button appearance

**Only active in Split mode** (`DropDownMode="Split"`)

### Complete Template Example

```xaml
<editors:SfDropDownColorPalette 
    DropDownMode="Split"
    x:Name="colorPalette">
    
    <!-- Customize selected color button -->
    <editors:SfDropDownColorPalette.ContentTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Padding="10">
                <!-- Icon -->
                <Path Data="M22.078048,10.524087..." 
                      Fill="Black" 
                      Width="20" Height="20" />
                
                <!-- Color swatch -->
                <Border Margin="10,0,0,0" 
                        Background="{Binding}"
                        Width="30" Height="30" />
            </StackPanel>
        </DataTemplate>
    </editors:SfDropDownColorPalette.ContentTemplate>
    
    <!-- Customize dropdown arrow button -->
    <editors:SfDropDownColorPalette.DropDownButtonTemplate>
        <DataTemplate>
            <Grid>
                <Path Fill="Black" 
                      Data="M 0 0 L 5 5 L 10 0 Z"
                      Width="10" Height="10" />
            </Grid>
        </DataTemplate>
    </editors:SfDropDownColorPalette.DropDownButtonTemplate>
</editors:SfDropDownColorPalette>
```

### Template Binding

The DataContext of both templates is the `SfDropDownColorPalette` control itself.

**Accessing the selected color in template:**
```xaml
<!-- In ContentTemplate, {Binding} refers to SelectedBrush -->
<Border Background="{Binding SelectedBrush, RelativeSource={RelativeSource TemplatedParent}}" />
```

### Simple Template Example

**Minimal customization:**
```xaml
<editors:SfDropDownColorPalette x:Name="colorPalette">
    <editors:SfDropDownColorPalette.ContentTemplate>
        <DataTemplate>
            <TextBlock Text="Select Color" 
                       Foreground="Black"
                       VerticalAlignment="Center" />
        </DataTemplate>
    </editors:SfDropDownColorPalette.ContentTemplate>
</editors:SfDropDownColorPalette>
```

## Dropdown Events

Handle palette open/close events to execute logic before or after the palette displays.

### DropDownOpened Event

Fires when the palette dropdown is opened.

**XAML:**
```xaml
<editors:SfDropDownColorPalette 
    DropDownOpened="ColorPalette_DropDownOpened"
    x:Name="colorPalette" />
```

**C# Handler:**
```csharp
private void ColorPalette_DropDownOpened(object sender, EventArgs e)
{
    // Palette is now open
    System.Diagnostics.Debug.WriteLine("Palette opened");
}
```

### DropDownClosed Event

Fires when the palette dropdown is closed.

**XAML:**
```xaml
<editors:SfDropDownColorPalette 
    DropDownClosed="ColorPalette_DropDownClosed"
    x:Name="colorPalette" />
```

**C# Handler:**
```csharp
private void ColorPalette_DropDownClosed(object sender, EventArgs e)
{
    // Palette is now closed
    System.Diagnostics.Debug.WriteLine("Palette closed");
}
```

### Both Events Together

```xaml
<editors:SfDropDownColorPalette 
    DropDownOpened="ColorPalette_DropDownOpened"
    DropDownClosed="ColorPalette_DropDownClosed"
    x:Name="colorPalette" />
```

```csharp
private void ColorPalette_DropDownOpened(object sender, EventArgs e)
{
    // Prepare for color selection
    statusText.Text = "Select a color...";
}

private void ColorPalette_DropDownClosed(object sender, EventArgs e)
{
    // Color selection complete
    var selectedColor = colorPalette.SelectedBrush as SolidColorBrush;
    statusText.Text = $"Color selected: {selectedColor?.Color}";
}
```

### Common Event Use Cases

**Track palette state:**
```csharp
private bool isPaletteOpen = false;

private void ColorPalette_DropDownOpened(object sender, EventArgs e)
{
    isPaletteOpen = true;
}

private void ColorPalette_DropDownClosed(object sender, EventArgs e)
{
    isPaletteOpen = false;
}
```

**Prevent closing in certain conditions:**
```csharp
private void ColorPalette_DropDownClosed(object sender, EventArgs e)
{
    // Validate color before closing
    var selectedColor = colorPalette.SelectedBrush as SolidColorBrush;
    
    if (!IsValidColor(selectedColor))
    {
        // Note: Event has already fired; can log or show warning
        statusText.Text = "Warning: Color may not meet contrast requirements";
    }
}
```

**Animate on open/close:**
```csharp
private void ColorPalette_DropDownOpened(object sender, EventArgs e)
{
    // Optional: Add animation or visual feedback
    // Could fade in overlay, highlight palette, etc.
}

private void ColorPalette_DropDownClosed(object sender, EventArgs e)
{
    // Optional: Clean up resources, save state
}
```

---

**Next:** Customize the palette colors in `color-palette-customization.md`, or explore the More Colors dialog in `more-colors-dialog.md`.
