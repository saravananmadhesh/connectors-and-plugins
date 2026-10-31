# Simplified Layout

## Table of Contents
- [Overview](#overview)
- [Enabling Simplified Layout](#enabling-simplified-layout)
- [Layout Mode Options](#layout-mode-options)
- [Switching Between Layouts](#switching-between-layouts)
- [Display Options Per Item](#display-options-per-item)
- [Overflow Menu](#overflow-menu)
- [Best Practices](#best-practices)
- [Responsive Design](#responsive-design)
- [Troubleshooting](#troubleshooting)

## Overview

Simplified layout provides a compact, single-line ribbon interface that occupies minimal screen space. It's ideal for:
- Small windows or screens
- Maximizing content area
- Touch-optimized interfaces
- Modern, streamlined UI

**Key Features:**
- Single-line command layout
- Overflow menu for additional commands
- Toggle between normal and simplified modes
- Per-item display control

## Enabling Simplified Layout

### Layout Mode Configuration

Use `LayoutModeOptions` to specify available modes and `ActiveLayoutMode` to set the startup mode.

**Available Modes:**
- `Normal` - Standard multi-row ribbon
- `Simplified` - Compact single-line ribbon
- `Normal,Simplified` - Both modes with toggle button

```xaml
<!-- Load in simplified mode only -->
<ribbon:SfRibbon x:Name="sfRibbon"
                LayoutModeOptions="Simplified"
                ActiveLayoutMode="Simplified">
    <ribbon:SfRibbon.Tabs>
        <ribbon:RibbonTab Header="Home">
            <ribbon:RibbonGroup Header="Clipboard">
                <ribbon:RibbonButton Content="Cut" Icon="Cut" />
                <ribbon:RibbonButton Content="Copy" Icon="Copy" />
            </ribbon:RibbonGroup>
        </ribbon:RibbonTab>
    </ribbon:SfRibbon.Tabs>
</ribbon:SfRibbon>
```

### Programmatic Configuration

```csharp
public sealed partial class MainPage : Page
{
    public MainPage()
    {
        this.InitializeComponent();
        
        // Enable only simplified layout
        sfRibbon.LayoutModeOptions = LayoutModeOptions.Simplified;
        sfRibbon.ActiveLayoutMode = LayoutMode.Simplified;
    }
}
```

## Layout Mode Options

### Normal Only

Standard ribbon without simplified option:

```xaml
<ribbon:SfRibbon LayoutModeOptions="Normal"
                ActiveLayoutMode="Normal">
    <!-- Users cannot switch to simplified -->
</ribbon:SfRibbon>
```

### Simplified Only

Compact ribbon without normal option:

```xaml
<ribbon:SfRibbon LayoutModeOptions="Simplified"
                ActiveLayoutMode="Simplified">
    <!-- Users cannot switch to normal -->
</ribbon:SfRibbon>
```

### Both Modes (Recommended)

Allow users to choose their preference:

```xaml
<ribbon:SfRibbon LayoutModeOptions="Normal,Simplified"
                ActiveLayoutMode="Normal">
    <!-- Toggle button appears in bottom-right corner -->
</ribbon:SfRibbon>
```

## Switching Between Layouts

### Runtime Toggle

When `LayoutModeOptions="Normal,Simplified"`, a toggle button appears in the lower-right corner of the ribbon, allowing users to switch modes at runtime.

```xaml
<ribbon:SfRibbon x:Name="sfRibbon"
                LayoutModeOptions="Normal,Simplified"
                ActiveLayoutMode="Normal">
    <ribbon:SfRibbon.Tabs>
        <ribbon:RibbonTab Header="Home">
            <ribbon:RibbonGroup Header="Clipboard">
                <ribbon:RibbonButton Content="Cut" 
                                   Icon="Cut"
                                   DisplayOptions="Normal,Simplified" />
                <ribbon:RibbonButton Content="Copy" 
                                   Icon="Copy"
                                   DisplayOptions="Normal,Simplified" />
                <ribbon:RibbonButton Content="Paste" 
                                   Icon="Paste"
                                   DisplayOptions="Normal,Simplified" />
            </ribbon:RibbonGroup>
        </ribbon:RibbonTab>
    </ribbon:SfRibbon.Tabs>
</ribbon:SfRibbon>
```

### Programmatic Switching

```csharp
// Switch to simplified mode
sfRibbon.ActiveLayoutMode = LayoutMode.Simplified;

// Switch to normal mode
sfRibbon.ActiveLayoutMode = LayoutMode.Normal;

// Toggle between modes
sfRibbon.ActiveLayoutMode = sfRibbon.ActiveLayoutMode == LayoutMode.Normal
    ? LayoutMode.Simplified
    : LayoutMode.Normal;
```

### Detecting Layout Changes

```csharp
public MainPage()
{
    this.InitializeComponent();
    
    // Monitor layout changes
    sfRibbon.PropertyChanged += OnRibbonPropertyChanged;
}

private void OnRibbonPropertyChanged(object sender, PropertyChangedEventArgs e)
{
    if (e.PropertyName == nameof(SfRibbon.ActiveLayoutMode))
    {
        var currentMode = sfRibbon.ActiveLayoutMode;
        System.Diagnostics.Debug.WriteLine($"Layout changed to: {currentMode}");
        
        // Adjust UI based on layout
        if (currentMode == LayoutMode.Simplified)
        {
            // Increase content area, adjust other UI elements
        }
    }
}
```

## Display Options Per Item

Control visibility of individual ribbon items across layouts using the `DisplayOptions` property.

### DisplayOptions Values

**Flag Enumeration:**
- `Normal` - Show only in normal layout
- `Simplified` - Show only in simplified layout
- `Overflow` - Show only in overflow (simplified mode)
- `Normal,Simplified` - Show in both layouts (default)
- `Normal,Overflow` - Normal layout + overflow

### Examples

```xaml
<ribbon:RibbonGroup Header="Clipboard">
    <!-- Always visible in both layouts -->
    <ribbon:RibbonButton Content="Cut"
                       Icon="Cut"
                       DisplayOptions="Normal,Simplified" />
    
    <!-- Visible in normal, moves to overflow in simplified -->
    <ribbon:RibbonButton Content="Format Painter"
                       Icon="FontColor"
                       DisplayOptions="Normal,Overflow" />
    
    <!-- Only in normal layout, hidden in simplified -->
    <ribbon:RibbonButton Content="Advanced Paste"
                       Icon="Paste"
                       DisplayOptions="Normal" />
    
    <!-- Only in simplified layout -->
    <ribbon:RibbonButton Content="Quick Action"
                       Icon="Favorite"
                       DisplayOptions="Simplified" />
</ribbon:RibbonGroup>
```

### Strategic Display Options

**High-Priority Commands** (always visible):
```xaml
<ribbon:RibbonButton Content="Save"
                   Icon="Save"
                   DisplayOptions="Normal,Simplified" />
```

**Medium-Priority Commands** (overflow in simplified):
```xaml
<ribbon:RibbonButton Content="Export"
                   Icon="Export"
                   DisplayOptions="Normal,Overflow" />
```

**Low-Priority Commands** (normal only):
```xaml
<ribbon:RibbonButton Content="Advanced Settings"
                   Icon="Setting"
                   DisplayOptions="Normal" />
```

## Overflow Menu

In simplified mode, items with `DisplayOptions="Overflow"` appear in a dropdown menu.

### Overflow Menu Behavior

```xaml
<ribbon:RibbonGroup Header="Font">
    <!-- Visible in simplified -->
    <ribbon:RibbonToggleButton Content="Bold"
                             Icon="Bold"
                             DisplayOptions="Normal,Simplified" />
    
    <!-- In overflow menu when simplified -->
    <ribbon:RibbonButton Content="Strikethrough"
                       Icon="Strikethrough"
                       DisplayOptions="Normal,Overflow" />
    
    <ribbon:RibbonButton Content="Subscript"
                       Icon="Subscript"
                       DisplayOptions="Normal,Overflow" />
    
    <ribbon:RibbonButton Content="Superscript"
                       Icon="Superscript"
                       DisplayOptions="Normal,Overflow" />
</ribbon:RibbonGroup>
```

**In Simplified Mode:**
- Bold button appears in the single-line ribbon
- Overflow button (⋮) appears for the group
- Clicking overflow shows Strikethrough, Subscript, Superscript

### RibbonComboBox in Overflow

```xaml
<ribbon:RibbonComboBox Header="Font Family"
                     Width="200"
                     DisplayOptions="Normal,Simplified,Overflow">
    <ribbon:RibbonComboBoxItem Content="Calibri" />
    <ribbon:RibbonComboBoxItem Content="Arial" />
    <ribbon:RibbonComboBoxItem Content="Segoe UI" />
</ribbon:RibbonComboBox>
```

**Note:** When a RibbonComboBox is in the overflow menu, it appears as a dropdown button. Clicking it opens a flyout displaying the combobox items.

## Best Practices

### Prioritizing Commands

**Do:**
1. **Most-used commands** - Always visible (`Normal,Simplified`)
2. **Frequently-used commands** - Overflow in simplified (`Normal,Overflow`)
3. **Rarely-used commands** - Normal only (`Normal`)

**Example Priority Scheme:**

```xaml
<ribbon:RibbonGroup Header="File">
    <!-- Critical: Always visible -->
    <ribbon:RibbonButton Content="Save"
                       Icon="Save"
                       DisplayOptions="Normal,Simplified"
                       AllowedSizeModes="Large" />
    
    <!-- Important: Overflow when simplified -->
    <ribbon:RibbonButton Content="Save As"
                       Icon="SaveLocal"
                       DisplayOptions="Normal,Overflow"
                       AllowedSizeModes="Normal" />
    
    <!-- Less important: Normal only -->
    <ribbon:RibbonButton Content="Export"
                       Icon="Export"
                       DisplayOptions="Normal"
                       AllowedSizeModes="Normal" />
</ribbon:RibbonGroup>
```

### Layout Guidelines

**Simplified Layout:**
- Show 3-7 most important buttons per group
- Use overflow for secondary commands
- Prefer icon-only buttons in simplified mode
- Keep groups balanced (don't overload one group)

**Don't:**
- Put too many items in simplified view (defeats purpose)
- Hide critical commands in overflow
- Use DisplayOptions="Simplified" alone (creates confusion when switching)

### Testing Layout Transitions

Always test both layouts:

```csharp
// Development testing helper
private void TestLayoutModes()
{
    // Test simplified
    sfRibbon.ActiveLayoutMode = LayoutMode.Simplified;
    VerifyCommandAccess(); // Ensure all critical commands accessible
    
    // Test normal
    sfRibbon.ActiveLayoutMode = LayoutMode.Normal;
    VerifyLayoutIntegrity(); // Ensure proper rendering
}
```

## Responsive Design

### Window Size Adaptation

```csharp
public MainPage()
{
    this.InitializeComponent();
    
    // Auto-switch to simplified on narrow windows
    this.SizeChanged += OnWindowSizeChanged;
}

private void OnWindowSizeChanged(object sender, SizeChangedEventArgs e)
{
    const double NARROW_THRESHOLD = 800;
    
    if (e.NewSize.Width < NARROW_THRESHOLD)
    {
        // Switch to simplified for narrow windows
        if (sfRibbon.ActiveLayoutMode != LayoutMode.Simplified)
        {
            sfRibbon.ActiveLayoutMode = LayoutMode.Simplified;
        }
    }
    else
    {
        // Switch back to normal for wider windows
        if (sfRibbon.ActiveLayoutMode != LayoutMode.Normal)
        {
            sfRibbon.ActiveLayoutMode = LayoutMode.Normal;
        }
    }
}
```

### Saving User Preference

```csharp
public class RibbonSettings
{
    public void SaveLayoutPreference(LayoutMode mode)
    {
        ApplicationData.Current.LocalSettings.Values["RibbonLayoutMode"] = mode.ToString();
    }
    
    public LayoutMode LoadLayoutPreference()
    {
        if (ApplicationData.Current.LocalSettings.Values.TryGetValue("RibbonLayoutMode", out object value))
        {
            if (Enum.TryParse<LayoutMode>(value.ToString(), out LayoutMode mode))
            {
                return mode;
            }
        }
        return LayoutMode.Normal; // Default
    }
}

// Usage
public MainPage()
{
    this.InitializeComponent();
    
    var settings = new RibbonSettings();
    sfRibbon.ActiveLayoutMode = settings.LoadLayoutPreference();
    
    // Save preference on change
    sfRibbon.PropertyChanged += (s, e) =>
    {
        if (e.PropertyName == nameof(SfRibbon.ActiveLayoutMode))
        {
            settings.SaveLayoutPreference(sfRibbon.ActiveLayoutMode);
        }
    };
}
```

## Troubleshooting

### Toggle Button Not Appearing

**Problem:** Can't switch between layouts

**Solution:**
```xaml
<!-- Must include both modes in LayoutModeOptions -->
<ribbon:SfRibbon LayoutModeOptions="Normal,Simplified">
    <!-- Toggle button appears automatically -->
</ribbon:SfRibbon>
```

### Items Disappearing in Simplified Mode

**Problem:** Commands vanish when switching to simplified

**Solution:**
```xaml
<!-- Ensure DisplayOptions includes Simplified or Overflow -->
<ribbon:RibbonButton Content="Important"
                   Icon="Save"
                   DisplayOptions="Normal,Simplified" />
<!-- Not: DisplayOptions="Normal" alone -->
```

### Overflow Menu Empty

**Problem:** Overflow button appears but menu is empty

**Solution:**
```xaml
<!-- Ensure items have DisplayOptions="Overflow" -->
<ribbon:RibbonButton Content="Command"
                   DisplayOptions="Normal,Overflow" />
<!-- This will appear in overflow when simplified -->
```

### RibbonComboBox Not Working in Overflow

**Problem:** ComboBox in overflow doesn't open properly

**Solution:**
```xaml
<!-- Ensure all three display options are included -->
<ribbon:RibbonComboBox Header="Font"
                     DisplayOptions="Normal,Simplified,Overflow" />
```

## Related Topics

- **Ribbon Items** - Understanding item types and sizing → [ribbon-items.md](ribbon-items.md)
- **Advanced Features** - Ribbon resizing and responsive design → [advanced-features.md](advanced-features.md)
- **UI Customization** - Styling simplified layout → [ui-customization.md](ui-customization.md)
