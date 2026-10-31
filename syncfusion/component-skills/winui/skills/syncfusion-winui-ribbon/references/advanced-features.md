# Advanced Features

## Table of Contents
- [Overview](#overview)
- [RibbonGallery](#ribbongallery)
- [KeyTip (Keyboard Navigation)](#keytip-keyboard-navigation)
- [ScreenTip (Enhanced Tooltips)](#screentip-enhanced-tooltips)
- [Ribbon Resizing](#ribbon-resizing)
- [Ribbon Compact Sizing](#ribbon-compact-sizing)
- [Responsive Ribbon Design](#responsive-ribbon-design)
- [Troubleshooting](#troubleshooting)

## Overview

Advanced ribbon features provide enhanced functionality for power users and complex applications:

- **RibbonGallery** - Display collections of styles, templates, or options
- **KeyTip** - Keyboard shortcuts for ribbon commands
- **ScreenTip** - Rich tooltips with images and descriptions
- **Resizing** - Automatic command prioritization on window resize
- **Compact Sizing** - Space-efficient layout strategies

## RibbonGallery

RibbonGallery displays a scrollable collection of items, typically used for styles, templates, colors, or shapes (like the Styles gallery in Microsoft Word).

### Basic RibbonGallery

```xaml
<ribbon:SfRibbon x:Name="sfRibbon">
    <ribbon:SfRibbon.Tabs>
        <ribbon:RibbonTab Header="Home">
            <ribbon:RibbonGroup Header="Styles">
                <ribbon:RibbonGallery x:Name="stylesGallery"
                                     ItemsSource="{Binding DocumentStyles}"
                                     SelectedItem="{Binding CurrentStyle, Mode=TwoWay}">
                    <ribbon:RibbonGallery.ItemTemplate>
                        <DataTemplate>
                            <Border BorderBrush="Gray"
                                   BorderThickness="1"
                                   Padding="10,5"
                                   Margin="2">
                                <TextBlock Text="{Binding StyleName}"
                                         FontFamily="{Binding FontFamily}"
                                         FontSize="{Binding FontSize}" />
                            </Border>
                        </DataTemplate>
                    </ribbon:RibbonGallery.ItemTemplate>
                </ribbon:RibbonGallery>
            </ribbon:RibbonGroup>
        </ribbon:RibbonTab>
    </ribbon:SfRibbon.Tabs>
</ribbon:SfRibbon>
```

### Gallery with Categories

```xaml
<ribbon:RibbonGallery x:Name="shapesGallery">
    <ribbon:RibbonGallery.ItemsSource>
        <x:String>Rectangle</x:String>
        <x:String>Circle</x:String>
        <x:String>Triangle</x:String>
        <x:String>Arrow</x:String>
        <x:String>Star</x:String>
    </ribbon:RibbonGallery.ItemsSource>
    <ribbon:RibbonGallery.ItemTemplate>
        <DataTemplate>
            <Border Width="60"
                   Height="60"
                   BorderBrush="Gray"
                   BorderThickness="1"
                   Margin="5">
                <TextBlock Text="{Binding}"
                         HorizontalAlignment="Center"
                         VerticalAlignment="Center" />
            </Border>
        </DataTemplate>
    </ribbon:RibbonGallery.ItemTemplate>
</ribbon:RibbonGallery>
```

### Gallery Selection Handling

```csharp
public class DocumentStyle
{
    public string StyleName { get; set; }
    public string FontFamily { get; set; }
    public double FontSize { get; set; }
    public Color ForegroundColor { get; set; }
}

public ObservableCollection<DocumentStyle> DocumentStyles { get; set; }
public DocumentStyle CurrentStyle { get; set; }

public MainViewModel()
{
    DocumentStyles = new ObservableCollection<DocumentStyle>
    {
        new DocumentStyle { StyleName = "Normal", FontFamily = "Calibri", FontSize = 11 },
        new DocumentStyle { StyleName = "Heading 1", FontFamily = "Calibri", FontSize = 16 },
        new DocumentStyle { StyleName = "Heading 2", FontFamily = "Calibri", FontSize = 13 },
        new DocumentStyle { StyleName = "Title", FontFamily = "Calibri", FontSize = 26 },
    };
}
```

### Gallery with Preview

```xaml
<ribbon:RibbonGallery x:Name="colorGallery"
                     SelectionChanged="OnColorSelectionChanged">
    <ribbon:RibbonGallery.ItemTemplate>
        <DataTemplate>
            <Rectangle Width="30"
                      Height="30"
                      Fill="{Binding Converter={StaticResource ColorToBrushConverter}}"
                      Margin="2"
                      ToolTipService.ToolTip="{Binding ColorName}" />
        </DataTemplate>
    </ribbon:RibbonGallery.ItemTemplate>
</ribbon:RibbonGallery>
```

## KeyTip (Keyboard Navigation)

The ribbon KeyTip service can be activated through the keyboard by pressing the Alt or F10 keys, without using the mouse and the KeyTip for the ribbon elements will be displayed.

### Enabling KeyTip

**Note:** KeyTip implementation may vary based on Syncfusion version. Check documentation for your specific version.

### KeyTip Pattern

```xaml
<!-- Typical KeyTip usage (if supported) -->
<ribbon:RibbonButton Content="Save"
                   Icon="Save"
                   ribbon:KeyTipService.AccessText="S"
                   Click="OnSaveClick" />

<ribbon:RibbonButton Content="Undo"
                   Icon="Undo"
                   ribbon:KeyTipService.AccessText="U"
                   Click="OnUndoClick" />
```

### Custom KeyTip Implementation

If native KeyTip is not available, implement with keyboard accelerators:

```xaml
<ribbon:RibbonButton Content="Save"
                   Icon="Save"
                   Click="OnSaveClick">
    <ribbon:RibbonButton.KeyboardAccelerators>
        <KeyboardAccelerator Modifiers="Control" Key="S" />
    </ribbon:RibbonButton.KeyboardAccelerators>
</ribbon:RibbonButton>

<ribbon:RibbonButton Content="Undo"
                   Icon="Undo"
                   Click="OnUndoClick">
    <ribbon:RibbonButton.KeyboardAccelerators>
        <KeyboardAccelerator Modifiers="Control" Key="Z" />
    </ribbon:RibbonButton.KeyboardAccelerators>
</ribbon:RibbonButton>
```

### KeyTip Best Practices

**Do:**
- Use single letters for primary commands (S for Save, P for Print)
- Use memorable combinations (Ctrl+S, Ctrl+P)
- Document shortcuts in tooltips
- Avoid conflicts with system shortcuts

**Don't:**
- Reuse the same KeyTip in one tab
- Use obscure letter combinations
- Forget to test keyboard navigation

## ScreenTip (Enhanced Tooltips)

ScreenTip provides rich tooltips with images, titles, descriptions, and help links.

### Basic Tooltip Enhancement

```xaml
<ribbon:RibbonButton Content="Paste"
                   Icon="Paste"
                   Click="OnPasteClick">
                   <ribbon:RibbonButton.ScreenTip>
                      <ribbon:ScreenTip Title="Cut" Content="Cut the selection and put it on the clipboard." >
                          <ribbon:ScreenTip.ContentTemplate>
                              <DataTemplate>
                                  <StackPanel MaxWidth="300">
                                      <TextBlock Text="Paste (Ctrl+V)"
                                                 FontWeight="SemiBold"
                                                 Margin="0,0,0,5" />
                                      <TextBlock Text="Insert content from the clipboard into your document."
                                                 TextWrapping="Wrap"
                                                 Margin="0,0,0,5" />
                                      <HyperlinkButton Content="Learn more about paste options"
                                                 NavigateUri="https://help.example.com/paste" />
                                  </StackPanel>
                              </DataTemplate>
                          </ribbon:ScreenTip.ContentTemplate>
                      </ribbon:ScreenTip>
                   </ribbon:RibbonButton.ScreenTip>
</ribbon:RibbonButton>
```

### ScreenTip with Image

```xaml
<ribbon:RibbonButton Content="Chart"
                   Icon="Chart"
                   Click="OnChartClick">
    <ToolTipService.ToolTip>
        <ToolTip>
            <Grid MaxWidth="350">
                <Grid.RowDefinitions>
                    <RowDefinition Height="Auto" />
                    <RowDefinition Height="Auto" />
                    <RowDefinition Height="Auto" />
                </Grid.RowDefinitions>
                
                <TextBlock Grid.Row="0"
                         Text="Insert Chart"
                         FontSize="14"
                         FontWeight="SemiBold"
                         Margin="0,0,0,8" />
                
                <Image Grid.Row="1"
                      Source="ms-appx:///Assets/ChartPreview.png"
                      Height="100"
                      Stretch="Uniform"
                      Margin="0,0,0,8" />
                
                <TextBlock Grid.Row="2"
                         Text="Create a chart to visualize your data. Choose from column, line, pie, and more."
                         TextWrapping="Wrap" />
            </Grid>
        </ToolTip>
    </ToolTipService.ToolTip>
</ribbon:RibbonButton>
```

### Reusable ScreenTip Template

```xaml
<Page.Resources>
    <DataTemplate x:Key="ScreenTipTemplate">
        <StackPanel MaxWidth="300" Padding="5">
            <TextBlock Text="{Binding Title}"
                     FontSize="14"
                     FontWeight="SemiBold"
                     Margin="0,0,0,5" />
            
            <Image Source="{Binding ImageSource}"
                  Height="80"
                  Stretch="Uniform"
                  Margin="0,0,0,8"
                  Visibility="{Binding ImageSource, Converter={StaticResource NullToVisibilityConverter}}" />
            
            <TextBlock Text="{Binding Description}"
                     TextWrapping="Wrap"
                     Margin="0,0,0,5" />
            
            <TextBlock Text="{Binding Shortcut}"
                     FontSize="12"
                     Foreground="{ThemeResource SystemBaseMediumColor}"
                     Visibility="{Binding Shortcut, Converter={StaticResource NullToVisibilityConverter}}" />
        </StackPanel>
    </DataTemplate>
</Page.Resources>
```

## Ribbon Resizing

Ribbon automatically adjusts item sizes and layout when window width changes.

### Size Priority Configuration

Items with `AllowedSizeModes` automatically resize based on available space:

```xaml
<ribbon:RibbonGroup Header="Clipboard">
    <!-- Can be Large or Normal -->
    <ribbon:RibbonButton Content="Paste"
                       Icon="Paste"
                       AllowedSizeModes="Large,Normal" />
    
    <!-- Can be Normal or Small -->
    <ribbon:RibbonButton Content="Cut"
                       Icon="Cut"
                       AllowedSizeModes="Normal,Small" />
    
    <!-- Can be any size -->
    <ribbon:RibbonButton Content="Copy"
                       Icon="Copy"
                       AllowedSizeModes="Large,Normal,Small" />
</ribbon:RibbonGroup>
```

**Resize Behavior:**
1. **Wide window:** Paste=Large, Cut=Normal, Copy=Large
2. **Medium window:** Paste=Normal, Cut=Normal, Copy=Normal
3. **Narrow window:** Paste=Normal, Cut=Small, Copy=Small

### Group Collapse Priority

Groups can collapse into dropdown menus on narrow windows. Specify collapse priority:

```xaml
<!-- Not directly supported in current documentation,
     but concept for future reference -->
<ribbon:RibbonGroup Header="Font" CollapsePriority="1" />
<ribbon:RibbonGroup Header="Paragraph" CollapsePriority="2" />
<ribbon:RibbonGroup Header="Styles" CollapsePriority="3" />
```

Higher priority collapses first.

## Ribbon Compact Sizing

Optimize ribbon for space efficiency.

### Compact Item Sizing

```xaml
<ribbon:RibbonGroup Header="Editing">
    <!-- Always small (most compact) -->
    <ribbon:RibbonButton Icon="Find"
                       AllowedSizeModes="Small"
                       ToolTipService.ToolTip="Find" />
    
    <ribbon:RibbonButton Icon="Replace"
                       AllowedSizeModes="Small"
                       ToolTipService.ToolTip="Replace" />
    
    <!-- Small or Normal (responsive) -->
    <ribbon:RibbonButton Content="Select"
                       Icon="SelectAll"
                       AllowedSizeModes="Small,Normal" />
</ribbon:RibbonGroup>
```

### Compact Group Layout

```xaml
<ribbon:RibbonGroup Header="Quick Actions">
    <StackPanel Orientation="Horizontal">
        <ribbon:RibbonButton Icon="Save" AllowedSizeModes="Small" />
        <ribbon:RibbonButton Icon="Undo" AllowedSizeModes="Small" />
        <ribbon:RibbonButton Icon="Redo" AllowedSizeModes="Small" />
        <Rectangle Width="1" Fill="Gray" Margin="5,0" />
        <ribbon:RibbonButton Icon="Cut" AllowedSizeModes="Small" />
        <ribbon:RibbonButton Icon="Copy" AllowedSizeModes="Small" />
        <ribbon:RibbonButton Icon="Paste" AllowedSizeModes="Small" />
    </StackPanel>
</ribbon:RibbonGroup>
```

## Responsive Ribbon Design

### Window Size Detection

```csharp
public MainPage()
{
    this.InitializeComponent();
    this.SizeChanged += OnWindowSizeChanged;
    ApplyResponsiveLayout(this.ActualWidth);
}

private void OnWindowSizeChanged(object sender, SizeChangedEventArgs e)
{
    ApplyResponsiveLayout(e.NewSize.Width);
}

private void ApplyResponsiveLayout(double width)
{
    if (width < 800)
    {
        // Very narrow: Simplified mode
        sfRibbon.ActiveLayoutMode = LayoutMode.Simplified;
    }
    else if (width < 1200)
    {
        // Medium: Normal mode with compact groups
        sfRibbon.ActiveLayoutMode = LayoutMode.Normal;
        UseCompactGroups();
    }
    else
    {
        // Wide: Full layout
        sfRibbon.ActiveLayoutMode = LayoutMode.Normal;
        UseFullGroups();
    }
}
```

### Adaptive Item Display

```xaml
<!-- Show based on window width -->
<ribbon:RibbonButton x:Name="detailButton"
                   Content="Details"
                   Icon="More"
                   DisplayOptions="Normal"
                   Visibility="{Binding WindowWidth, Converter={StaticResource WidthToVisibilityConverter}}" />
```

### Priority-Based Layout

```csharp
public class RibbonLayoutManager
{
    public void AdjustLayoutForWidth(double width)
    {
        if (width < 600)
        {
            ShowOnlyEssentialCommands();
        }
        else if (width < 900)
        {
            ShowStandardCommands();
        }
        else
        {
            ShowAllCommands();
        }
    }
    
    private void ShowOnlyEssentialCommands()
    {
        // Show Save, Undo, Redo only
        foreach (var group in sfRibbon.Tabs.SelectMany(t => t.Items))
        {
            foreach (var item in group.Items)
            {
                if (item is RibbonButton button)
                {
                    button.Visibility = IsEssential(button) 
                        ? Visibility.Visible 
                        : Visibility.Collapsed;
                }
            }
        }
    }
    
    private bool IsEssential(RibbonButton button)
    {
        var essentialCommands = new[] { "Save", "Undo", "Redo" };
        return essentialCommands.Contains(button.Content?.ToString());
    }
}
```

## Troubleshooting

### Gallery Items Not Displaying

**Problem:** RibbonGallery is empty

**Solution:**
```xaml
<!-- Ensure ItemsSource is bound correctly -->
<ribbon:RibbonGallery ItemsSource="{Binding Styles}">
    <!-- Ensure ItemTemplate is defined -->
    <ribbon:RibbonGallery.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding}" />
        </DataTemplate>
    </ribbon:RibbonGallery.ItemTemplate>
</ribbon:RibbonGallery>
```

### Tooltips Not Showing

**Problem:** ScreenTip content not visible

**Solution:**
```xaml
<!-- Use ToolTipService.ToolTip, not just ToolTip property -->
<ribbon:RibbonButton Content="Save">
    <ToolTipService.ToolTip>
        <ToolTip>
            <TextBlock Text="Save document" />
        </ToolTip>
    </ToolTipService.ToolTip>
</ribbon:RibbonButton>
```

### Resizing Not Working

**Problem:** Buttons don't resize with window

**Solution:**
```xaml
<!-- Include multiple size modes in AllowedSizeModes -->
<ribbon:RibbonButton Content="Paste"
                   AllowedSizeModes="Large,Normal,Small" />
<!-- Not: AllowedSizeModes="Large" only -->
```

### KeyboardAccelerator Not Firing

**Problem:** Ctrl+S doesn't trigger Save

**Solution:**
```csharp
// Ensure page has focus
this.Focus(FocusState.Programmatic);

// Or handle at application level
protected override void OnKeyDown(KeyRoutedEventArgs e)
{
    if (e.Key == VirtualKey.S && 
        Window.Current.CoreWindow.GetKeyState(VirtualKey.Control).HasFlag(CoreVirtualKeyStates.Down))
    {
        OnSaveClick(this, null);
        e.Handled = true;
    }
    base.OnKeyDown(e);
}
```

## Related Topics

- **Ribbon Items** - Button types and sizing → [ribbon-items.md](ribbon-items.md)
- **Simplified Layout** - Compact mode details → [simplified-layout.md](simplified-layout.md)
- **UI Customization** - Styling galleries and tooltips → [ui-customization.md](ui-customization.md)
