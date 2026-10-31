# Quick Access Toolbar (QAT)

The Quick Access Toolbar (QAT) provides quick access to frequently-used commands, typically displayed above or below the ribbon tabs. This document covers QAT implementation and customization.

## Overview

The Quick Access Toolbar is a customizable toolbar that contains commonly-used commands like Save, Undo, and Redo. It remains visible regardless of which ribbon tab is selected.

**Typical QAT Commands:**
- Save
- Undo
- Redo
- Print
- Quick Print
- Print Preview

**Key Features:**
- Always visible (not tab-dependent)
- User-customizable
- Minimal screen space usage
- Quick keyboard access

## Implementation Note

**Important:** As of the current Syncfusion WinUI Ribbon documentation reviewed, the Quick Access Toolbar (QAT) implementation details are not explicitly documented in the provided materials. The QAT feature may be:

1. **In development** for future releases
2. **Available** but not yet documented
3. **Implemented differently** in WinUI compared to WPF/WinForms versions

## Alternative: RightPane for Quick Access

While native QAT may not be fully documented, you can achieve similar functionality using the `RightPane` property of the ribbon to create a quick-access area.

### Using RightPane as QAT

```xaml
<ribbon:SfRibbon x:Name="sfRibbon">
    <!-- Quick Access Area in Right Pane -->
    <ribbon:SfRibbon.RightPane>
        <StackPanel Orientation="Horizontal" Spacing="5">
            <Button ToolTipService.ToolTip="Save"
                   Click="OnSaveClick"
                   Background="Transparent"
                   BorderThickness="0"
                   Padding="5">
                <SymbolIcon Symbol="Save" />
            </Button>
            <Button ToolTipService.ToolTip="Undo"
                   Click="OnUndoClick"
                   Background="Transparent"
                   BorderThickness="0"
                   Padding="5">
                <SymbolIcon Symbol="Undo" />
            </Button>
            <Button ToolTipService.ToolTip="Redo"
                   Click="OnRedoClick"
                   Background="Transparent"
                   BorderThickness="0"
                   Padding="5">
                <SymbolIcon Symbol="Redo" />
            </Button>
            <Rectangle Width="1"
                      Fill="{ThemeResource SystemBaseLowColor}"
                      Margin="5,0" />
            <Button ToolTipService.ToolTip="Print"
                   Click="OnPrintClick"
                   Background="Transparent"
                   BorderThickness="0"
                   Padding="5">
                <SymbolIcon Symbol="Print" />
            </Button>
        </StackPanel>
    </ribbon:SfRibbon.RightPane>
    
    <!-- Regular Tabs -->
    <ribbon:SfRibbon.Tabs>
        <ribbon:RibbonTab Header="Home">
            <!-- Tab content -->
        </ribbon:RibbonTab>
    </ribbon:SfRibbon.Tabs>
</ribbon:SfRibbon>
```

### Styled RightPane Buttons

```xaml
<Page.Resources>
    <Style x:Key="QATButtonStyle" TargetType="Button">
        <Setter Property="Background" Value="Transparent" />
        <Setter Property="BorderThickness" Value="0" />
        <Setter Property="Padding" Value="8,4" />
        <Setter Property="Margin" Value="2,0" />
        <Setter Property="CornerRadius" Value="3" />
    </Style>
</Page.Resources>

<ribbon:SfRibbon.RightPane>
    <StackPanel Orientation="Horizontal">
        <Button Style="{StaticResource QATButtonStyle}"
               ToolTipService.ToolTip="Save (Ctrl+S)"
               Command="{Binding SaveCommand}">
            <SymbolIcon Symbol="Save" />
        </Button>
        <Button Style="{StaticResource QATButtonStyle}"
               ToolTipService.ToolTip="Undo (Ctrl+Z)"
               Command="{Binding UndoCommand}">
            <SymbolIcon Symbol="Undo" />
        </Button>
        <Button Style="{StaticResource QATButtonStyle}"
               ToolTipService.ToolTip="Redo (Ctrl+Y)"
               Command="{Binding RedoCommand}">
            <SymbolIcon Symbol="Redo" />
        </Button>
    </StackPanel>
</ribbon:SfRibbon.RightPane>
```

## Common QAT Patterns

### Pattern 1: Document Editor QAT

```xaml
<ribbon:SfRibbon.RightPane>
    <CommandBar DefaultLabelPosition="Collapsed"
               Background="Transparent"
               IsOpen="False"
               IsSticky="False">
        <AppBarButton Icon="Save" Label="Save" Command="{Binding SaveCommand}" />
        <AppBarButton Icon="Undo" Label="Undo" Command="{Binding UndoCommand}" />
        <AppBarButton Icon="Redo" Label="Redo" Command="{Binding RedoCommand}" />
        <AppBarButton Icon="Print" Label="Print" Command="{Binding PrintCommand}" />
    </CommandBar>
</ribbon:SfRibbon.RightPane>
```

### Pattern 2: Data Application QAT

```xaml
<ribbon:SfRibbon.RightPane>
    <StackPanel Orientation="Horizontal">
        <Button ToolTipService.ToolTip="Refresh Data">
            <SymbolIcon Symbol="Refresh" />
        </Button>
        <Button ToolTipService.ToolTip="Export">
            <SymbolIcon Symbol="Export" />
        </Button>
        <Button ToolTipService.ToolTip="Filter">
            <SymbolIcon Symbol="Filter" />
        </Button>
    </StackPanel>
</ribbon:SfRibbon.RightPane>
```

### Pattern 3: Media Application QAT

```xaml
<ribbon:SfRibbon.RightPane>
    <StackPanel Orientation="Horizontal" Spacing="3">
        <Button ToolTipService.ToolTip="Play/Pause">
            <SymbolIcon Symbol="Play" />
        </Button>
        <Button ToolTipService.ToolTip="Stop">
            <SymbolIcon Symbol="Stop" />
        </Button>
        <Button ToolTipService.ToolTip="Previous">
            <SymbolIcon Symbol="Previous" />
        </Button>
        <Button ToolTipService.ToolTip="Next">
            <SymbolIcon Symbol="Next" />
        </Button>
    </StackPanel>
</ribbon:SfRibbon.RightPane>
```

## Programmatic QAT Management

### Adding Buttons Dynamically

```csharp
public void AddQATButton(string tooltip, Symbol icon, ICommand command)
{
    var stackPanel = sfRibbon.RightPane as StackPanel;
    if (stackPanel != null)
    {
        var button = new Button
        {
            Command = command,
            Background = new SolidColorBrush(Colors.Transparent),
            BorderThickness = new Thickness(0),
            Padding = new Thickness(5)
        };
        
        button.Content = new SymbolIcon(icon);
        ToolTipService.SetToolTip(button, tooltip);
        
        stackPanel.Children.Add(button);
    }
}

// Usage
AddQATButton("Save", Symbol.Save, SaveCommand);
AddQATButton("Undo", Symbol.Undo, UndoCommand);
```

### Removing QAT Buttons

```csharp
public void RemoveQATButton(int index)
{
    var stackPanel = sfRibbon.RightPane as StackPanel;
    if (stackPanel != null && index >= 0 && index < stackPanel.Children.Count)
    {
        stackPanel.Children.RemoveAt(index);
    }
}
```

### Clearing QAT

```csharp
public void ClearQAT()
{
    var stackPanel = sfRibbon.RightPane as StackPanel;
    if (stackPanel != null)
    {
        stackPanel.Children.Clear();
    }
}
```

## User-Customizable QAT

Allow users to customize their QAT:

```csharp
public class QATCustomization
{
    public ObservableCollection<QATButtonConfig> AvailableCommands { get; set; }
    public ObservableCollection<QATButtonConfig> ActiveCommands { get; set; }
    
    public void ShowCustomizationDialog()
    {
        // Show dialog to add/remove/reorder QAT buttons
        var dialog = new QATCustomizationDialog
        {
            AvailableCommands = this.AvailableCommands,
            ActiveCommands = this.ActiveCommands,
            XamlRoot = this.XamlRoot
        };
        
        await dialog.ShowAsync();
    }
    
    public void ApplyQATConfiguration()
    {
        ClearQAT();
        foreach (var command in ActiveCommands)
        {
            AddQATButton(command.Tooltip, command.Icon, command.Command);
        }
    }
}

public class QATButtonConfig
{
    public string Tooltip { get; set; }
    public Symbol Icon { get; set; }
    public ICommand Command { get; set; }
}
```

## Keyboard Shortcuts with QAT

Enhance QAT with keyboard accelerators:

```xaml
<ribbon:SfRibbon.RightPane>
    <StackPanel Orientation="Horizontal">
        <Button ToolTipService.ToolTip="Save (Ctrl+S)"
               Command="{Binding SaveCommand}">
            <Button.KeyboardAccelerators>
                <KeyboardAccelerator Modifiers="Control" Key="S" />
            </Button.KeyboardAccelerators>
            <SymbolIcon Symbol="Save" />
        </Button>
        <Button ToolTipService.ToolTip="Undo (Ctrl+Z)"
               Command="{Binding UndoCommand}">
            <Button.KeyboardAccelerators>
                <KeyboardAccelerator Modifiers="Control" Key="Z" />
            </Button.KeyboardAccelerators>
            <SymbolIcon Symbol="Undo" />
        </Button>
    </StackPanel>
</ribbon:SfRibbon.RightPane>
```

## Best Practices

**Do:**
- Keep QAT button count minimal (3-7 buttons ideal)
- Use clear, universally-understood icons
- Provide tooltips for all buttons
- Include keyboard shortcuts in tooltips
- Place most frequently-used commands in QAT

**Don't:**
- Overcrowd the QAT (reduces usability)
- Use text labels (icons only for space efficiency)
- Add commands that are rarely used
- Forget to handle command state (IsEnabled)

## Persistence

Save and restore user QAT customization:

```csharp
public class QATSettings
{
    public List<string> ButtonIds { get; set; }
    
    public void SaveSettings()
    {
        var json = JsonSerializer.Serialize(this);
        ApplicationData.Current.LocalSettings.Values["QATSettings"] = json;
    }
    
    public static QATSettings LoadSettings()
    {
        if (ApplicationData.Current.LocalSettings.Values.TryGetValue("QATSettings", out object value))
        {
            return JsonSerializer.Deserialize<QATSettings>(value.ToString());
        }
        return GetDefaultSettings();
    }
    
    private static QATSettings GetDefaultSettings()
    {
        return new QATSettings
        {
            ButtonIds = new List<string> { "Save", "Undo", "Redo" }
        };
    }
}
```

## Future Considerations

If Syncfusion releases native QAT support, look for:
- `SfRibbon.QuickAccessToolbar` property
- `RibbonQuickAccessToolbar` control
- Built-in customization UI
- Automatic command state synchronization

Until then, the RightPane approach provides equivalent functionality.

## Related Topics

- **Ribbon Items** - Understanding ribbon buttons → [ribbon-items.md](ribbon-items.md)
- **UI Customization** - Styling the right pane → [ui-customization.md](ui-customization.md)
