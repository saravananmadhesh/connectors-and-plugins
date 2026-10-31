# Theme Support in WinUI Segmented Control

## Table of Contents
- [Overview](#overview)
- [Setting Application Theme](#setting-application-theme)
- [Built-in Themes](#built-in-themes)
- [Theme Resource Keys](#theme-resource-keys)
- [Customizing Theme Colors](#customizing-theme-colors)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

## Overview

The Segmented Control fully supports WinUI's theme system with automatic adaptation to Light and Dark themes. You can customize appearance using predefined theme resource keys while maintaining consistency with the system theme.

## Setting Application Theme

Set the application theme in `App.xaml` using the `RequestedTheme` property.

### Dark Theme

```xaml
<Application
    x:Class="SegmentedApp.App"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    RequestedTheme="Dark">
</Application>
```

### Light Theme

```xaml
<Application
    x:Class="SegmentedApp.App"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    RequestedTheme="Light">
</Application>
```

### Default Theme (System)

```xaml
<Application
    x:Class="SegmentedApp.App"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    RequestedTheme="Default">
</Application>
```

**Default** follows the system theme setting, automatically switching between Light and Dark based on Windows settings.

## Built-in Themes

The Segmented Control has built-in appearance for both Light and Dark themes.

### Dark Theme Appearance

- **Background:** Dark gray (#414141)
- **Item Background:** Dark gray (#414141)
- **Selected Background:** Accent color
- **Foreground:** White
- **Border:** Dark border (#5F5E5E)

### Light Theme Appearance

- **Background:** Light gray (#F2F2F2)
- **Item Background:** Light gray (#F2F2F2)
- **Selected Background:** Accent color
- **Foreground:** Black
- **Border:** Light border (#D9D9D9)

## Theme Resource Keys

The Segmented Control provides 12 theme resource keys for complete customization while maintaining theme awareness.

### Available Theme Keys

| Key | Description | Affects |
|-----|-------------|---------|
| `SyncfusionSegmentedControlBackground` | Background of the entire control | Control background |
| `SyncfusionSegmentedItemBackground` | Background of each segment item | Item default state |
| `SyncfusionSegmentedItemHoverBackground` | Background when hovering over item | Item hover state |
| `SyncfusionSegmentedItemSelectedBackground` | Background of selected item | Item selected state |
| `SyncfusionSegmentedItemSelectedHoverBackground` | Background when hovering over selected item | Selected item hover |
| `SyncfusionSegmentedItemForeground` | Text color of items | Item text default |
| `SyncfusionSegmentedItemHoverForeground` | Text color when hovering | Item text hover |
| `SyncfusionSegmentedItemSelectedForeground` | Text color of selected item | Selected item text |
| `SyncfusionSegmentedItemSelectedHoverForeground` | Text color when hovering over selected | Selected item text hover |
| `SyncfusionSegmentedControlBorderBrush` | Border color of the control | Control border |
| `SyncfusionSegmentedItemDisabledBackground` | Background of disabled items | Disabled item background |
| `SyncfusionSegmentedItemDisabledForeground` | Text color of disabled items | Disabled item text |

## Customizing Theme Colors

Override theme keys in the control's Resources to customize colors for specific themes.

### Basic Customization

```xaml
<syncfusion:SfSegmentedControl 
    DisplayMemberPath="Name"
    ItemsSource="{Binding Items}">
    
    <syncfusion:SfSegmentedControl.Resources>
        <ResourceDictionary>
            <ResourceDictionary.ThemeDictionaries>
                <ResourceDictionary x:Key="Light">
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="#6C58EA"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedForeground" Color="White"/>
                </ResourceDictionary>
                <ResourceDictionary x:Key="Dark">
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="#9B8AFF"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedForeground" Color="White"/>
                </ResourceDictionary>
            </ResourceDictionary.ThemeDictionaries>
        </ResourceDictionary>
    </syncfusion:SfSegmentedControl.Resources>
</syncfusion:SfSegmentedControl>
```

### Comprehensive Theme Customization

```xaml
<syncfusion:SfSegmentedControl 
    x:Name="segmentedControl"
    SelectedIndex="2"
    DisplayMemberPath="Name"
    ItemsSource="{Binding Items}">
    
    <syncfusion:SfSegmentedControl.Resources>
        <ResourceDictionary>
            <ResourceDictionary.ThemeDictionaries>
                <!-- Light Theme Colors -->
                <ResourceDictionary x:Key="Light">
                    <SolidColorBrush x:Key="SyncfusionSegmentedControlBackground" Color="#F2F2F2"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemBackground" Color="#F2F2F2"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="#6C58EA"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemHoverBackground" Color="#E8E4FF"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedHoverBackground" Color="#7B6AED"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemForeground" Color="Black"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemHoverForeground" Color="Black"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedForeground" Color="White"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedHoverForeground" Color="White"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedControlBorderBrush" Color="#D9D9D9"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemDisabledBackground" Color="#E0E0E0"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemDisabledForeground" Color="#9E9E9E"/>
                </ResourceDictionary>
                
                <!-- Dark Theme Colors -->
                <ResourceDictionary x:Key="Dark">
                    <SolidColorBrush x:Key="SyncfusionSegmentedControlBackground" Color="#2C2C2C"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemBackground" Color="#2C2C2C"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="#9B8AFF"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemHoverBackground" Color="#3E3E3E"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedHoverBackground" Color="#AB9CFF"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemForeground" Color="White"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemHoverForeground" Color="White"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedForeground" Color="White"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedHoverForeground" Color="White"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedControlBorderBrush" Color="#4A4A4A"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemDisabledBackground" Color="#3A3A3A"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemDisabledForeground" Color="#707070"/>
                </ResourceDictionary>
            </ResourceDictionary.ThemeDictionaries>
        </ResourceDictionary>
    </syncfusion:SfSegmentedControl.Resources>
</syncfusion:SfSegmentedControl>
```

## Complete Examples

### Example 1: Teal Theme

```xaml
<syncfusion:SfSegmentedControl 
    SelectedIndex="1"
    DisplayMemberPath="Name"
    ItemsSource="{Binding Views}">
    
    <syncfusion:SfSegmentedControl.Resources>
        <ResourceDictionary>
            <ResourceDictionary.ThemeDictionaries>
                <ResourceDictionary x:Key="Light">
                    <SolidColorBrush x:Key="SyncfusionSegmentedControlBackground" Color="#E0F2F1"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemBackground" Color="#E0F2F1"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="#00897B"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemHoverBackground" Color="#B2DFDB"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedHoverBackground" Color="#00796B"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemForeground" Color="#004D40"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedForeground" Color="White"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedControlBorderBrush" Color="#80CBC4"/>
                </ResourceDictionary>
                
                <ResourceDictionary x:Key="Dark">
                    <SolidColorBrush x:Key="SyncfusionSegmentedControlBackground" Color="#1E4D47"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemBackground" Color="#1E4D47"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="#00BFA5"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemHoverBackground" Color="#2A635C"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedHoverBackground" Color="#00C9B1"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemForeground" Color="#A7FFEB"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedForeground" Color="White"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedControlBorderBrush" Color="#3D7B71"/>
                </ResourceDictionary>
            </ResourceDictionary.ThemeDictionaries>
        </ResourceDictionary>
    </syncfusion:SfSegmentedControl.Resources>
</syncfusion:SfSegmentedControl>
```

### Example 2: Orange/Blue Theme

```xaml
<syncfusion:SfSegmentedControl 
    SelectedIndex="0"
    ItemsSource="{Binding Priorities}">
    
    <syncfusion:SfSegmentedControl.Resources>
        <ResourceDictionary>
            <ResourceDictionary.ThemeDictionaries>
                <ResourceDictionary x:Key="Light">
                    <SolidColorBrush x:Key="SyncfusionSegmentedControlBackground" Color="#FFF3E0"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemBackground" Color="#FFF3E0"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="#FF6F00"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemHoverBackground" Color="#FFE0B2"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedHoverBackground" Color="#F57C00"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemForeground" Color="#E65100"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedForeground" Color="White"/>
                </ResourceDictionary>
                
                <ResourceDictionary x:Key="Dark">
                    <SolidColorBrush x:Key="SyncfusionSegmentedControlBackground" Color="#1A237E"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemBackground" Color="#1A237E"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="#2196F3"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemHoverBackground" Color="#283593"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedHoverBackground" Color="#42A5F5"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemForeground" Color="#90CAF9"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedForeground" Color="White"/>
                </ResourceDictionary>
            </ResourceDictionary.ThemeDictionaries>
        </ResourceDictionary>
    </syncfusion:SfSegmentedControl.Resources>
</syncfusion:SfSegmentedControl>
```

### Example 3: Minimal Flat Theme

```xaml
<syncfusion:SfSegmentedControl 
    BorderThickness="0"
    ItemBorderThickness="0"
    SelectedIndex="1"
    ItemsSource="{Binding Options}">
    
    <syncfusion:SfSegmentedControl.Resources>
        <ResourceDictionary>
            <ResourceDictionary.ThemeDictionaries>
                <ResourceDictionary x:Key="Light">
                    <SolidColorBrush x:Key="SyncfusionSegmentedControlBackground" Color="Transparent"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemBackground" Color="Transparent"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="#F0F0F0"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemHoverBackground" Color="#FAFAFA"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemForeground" Color="#616161"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedForeground" Color="Black"/>
                </ResourceDictionary>
                
                <ResourceDictionary x:Key="Dark">
                    <SolidColorBrush x:Key="SyncfusionSegmentedControlBackground" Color="Transparent"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemBackground" Color="Transparent"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="#2A2A2A"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemHoverBackground" Color="#1E1E1E"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemForeground" Color="#B0B0B0"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedForeground" Color="White"/>
                </ResourceDictionary>
            </ResourceDictionary.ThemeDictionaries>
        </ResourceDictionary>
    </syncfusion:SfSegmentedControl.Resources>
    
    <syncfusion:SfSegmentedControl.ItemContainerStyle>
        <Style TargetType="syncfusion:SfSegmentedItem">
            <Setter Property="Padding" Value="16,8"/>
            <Setter Property="Margin" Value="4,0"/>
            <Setter Property="CornerRadius" Value="6"/>
        </Style>
    </syncfusion:SfSegmentedControl.ItemContainerStyle>
</syncfusion:SfSegmentedControl>
```

## Best Practices

### 1. Define Both Light and Dark Themes

```xaml
<ResourceDictionary.ThemeDictionaries>
    <!-- Always provide both -->
    <ResourceDictionary x:Key="Light">
        <!-- Light theme resources -->
    </ResourceDictionary>
    <ResourceDictionary x:Key="Dark">
        <!-- Dark theme resources -->
    </ResourceDictionary>
</ResourceDictionary.ThemeDictionaries>
```

**Why:** Ensures good appearance regardless of user's theme preference.

### 2. Test in Both Themes

During development, switch between themes to verify appearance:

```csharp
// For testing purposes
((FrameworkElement)this.Content).RequestedTheme = ElementTheme.Dark;
((FrameworkElement)this.Content).RequestedTheme = ElementTheme.Light;
```

**Why:** Catches color contrast and visibility issues.

### 3. Use Consistent Color Schemes

```xaml
<!-- Pick complementary colors for related states -->
<SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="#6C58EA"/>
<SolidColorBrush x:Key="SyncfusionSegmentedItemHoverBackground" Color="#E8E4FF"/> <!-- Lighter variant -->
<SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedHoverBackground" Color="#7B6AED"/> <!-- Slightly lighter -->
```

**Why:** Creates visual harmony and predictable interaction feedback.

### 4. Maintain Sufficient Contrast

```xaml
<!-- Ensure text is readable against backgrounds -->
<!-- WCAG AA requires 4.5:1 contrast ratio for normal text -->
<SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="#6C58EA"/>
<SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedForeground" Color="White"/> <!-- High contrast -->
```

**Why:** Accessibility and readability for all users.

### 5. Don't Override Everything

```xaml
<!-- Good: Override only what's needed -->
<SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="#6C58EA"/>

<!-- Avoid: Overriding all keys unnecessarily -->
<!-- This breaks theme consistency -->
```

**Why:** Maintains consistency with system UI and other controls.

### 6. Use Semantic Color Names

```xaml
<!-- Create semantic brush resources -->
<ResourceDictionary x:Key="Light">
    <SolidColorBrush x:Key="PrimaryBrand" Color="#6C58EA"/>
    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="{StaticResource PrimaryBrand}"/>
</ResourceDictionary>
```

**Why:** Makes theme changes easier and maintains brand consistency.

### 7. Consider System Accent Color

```xaml
<!-- Use system accent color for selection -->
<SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="{ThemeResource SystemAccentColor}"/>
```

**Why:** Respects user's system-wide color preferences.

### 8. Test Hover States

```xaml
<!-- Ensure hover provides clear feedback -->
<SolidColorBrush x:Key="SyncfusionSegmentedItemHoverBackground" Color="#E8E4FF"/>
<SolidColorBrush x:Key="SyncfusionSegmentedItemHoverForeground" Color="Black"/>
```

**Why:** Users need clear visual feedback for interactive elements.
