# UI Customization

## Table of Contents
- [Overview](#overview)
- [RightPane Configuration](#rightpane-configuration)
- [Theme Customization](#theme-customization)
- [Control Templates](#control-templates)
- [Custom Styling](#custom-styling)
- [Icon Customization](#icon-customization)
- [Accessibility](#accessibility)
- [Best Practices](#best-practices)

## Overview

Customize the ribbon's appearance to match your application's branding and user experience requirements. Options include:

- **RightPane** - Add controls to the right side of the ribbon
- **Themes** - Apply color schemes and visual styles
- **Templates** - Override default control appearances
- **Styles** - Customize individual elements
- **Icons** - Use custom images and fonts
- **Accessibility** - Ensure usability for all users

## RightPane Configuration

The RightPane property allows you to add custom content to the right side of the ribbon, typically used for quick access commands or user information.

### Basic RightPane

```xaml
<ribbon:SfRibbon x:Name="sfRibbon">
    <ribbon:SfRibbon.RightPane>
        <StackPanel Orientation="Horizontal" Spacing="10">
            <Button ToolTipService.ToolTip="Undo">
                <SymbolIcon Symbol="Undo" />
            </Button>
            <Button ToolTipService.ToolTip="Redo">
                <SymbolIcon Symbol="Redo" />
            </Button>
        </StackPanel>
    </ribbon:SfRibbon.RightPane>
    
    <!-- Tabs -->
</ribbon:SfRibbon>
```

### User Info in RightPane

```xaml
<ribbon:SfRibbon.RightPane>
    <StackPanel Orientation="Horizontal" Spacing="15" Margin="0,0,20,0">
        <PersonPicture DisplayName="{Binding CurrentUser.Name}"
                      Width="32"
                      Height="32" />
        <StackPanel VerticalAlignment="Center">
            <TextBlock Text="{Binding CurrentUser.Name}"
                     FontSize="12"
                     FontWeight="SemiBold" />
            <TextBlock Text="{Binding CurrentUser.Email}"
                     FontSize="10"
                     Foreground="{ThemeResource SystemBaseMediumColor}" />
        </StackPanel>
        <Button Content="Sign Out"
               Command="{Binding SignOutCommand}"
               Style="{StaticResource AccentButtonStyle}" />
    </StackPanel>
</ribbon:SfRibbon.RightPane>
```

### Quick Actions in RightPane

```xaml
<ribbon:SfRibbon.RightPane>
    <CommandBar DefaultLabelPosition="Collapsed"
               Background="Transparent"
               IsOpen="False">
        <AppBarButton Icon="Save" 
                     Label="Save" 
                     Command="{Binding SaveCommand}" />
        <AppBarButton Icon="Undo" 
                     Label="Undo" 
                     Command="{Binding UndoCommand}" />
        <AppBarButton Icon="Redo" 
                     Label="Redo" 
                     Command="{Binding RedoCommand}" />
        <AppBarSeparator />
        <AppBarButton Icon="Help" 
                     Label="Help" 
                     Command="{Binding ShowHelpCommand}" />
    </CommandBar>
</ribbon:SfRibbon.RightPane>
```

### Search Box in RightPane

```xaml
<ribbon:SfRibbon.RightPane>
    <AutoSuggestBox PlaceholderText="Search commands"
                   Width="200"
                   Margin="0,0,20,0"
                   QuerySubmitted="OnSearchQuerySubmitted">
        <AutoSuggestBox.QueryIcon>
            <SymbolIcon Symbol="Find" />
        </AutoSuggestBox.QueryIcon>
    </AutoSuggestBox>
</ribbon:SfRibbon.RightPane>
```

## Theme Customization

### Applying System Themes

WinUI automatically respects system theme (Light/Dark). You can override or customize:

```xaml
<!-- Force Light Theme -->
<ribbon:SfRibbon RequestedTheme="Light">
    <!-- Content -->
</ribbon:SfRibbon>

<!-- Force Dark Theme -->
<ribbon:SfRibbon RequestedTheme="Dark">
    <!-- Content -->
</ribbon:SfRibbon>
```

### Custom Theme Colors

```xaml
<Page.Resources>
    <ResourceDictionary>
        <!-- Override ribbon colors -->
        <SolidColorBrush x:Key="RibbonBackgroundBrush" Color="#F3F3F3" />
        <SolidColorBrush x:Key="RibbonTabSelectedBrush" Color="#0078D4" />
        <SolidColorBrush x:Key="RibbonTabHoverBrush" Color="#E1E1E1" />
        <SolidColorBrush x:Key="RibbonGroupHeaderBrush" Color="#666666" />
    </ResourceDictionary>
</Page.Resources>

<ribbon:SfRibbon Background="{StaticResource RibbonBackgroundBrush}">
    <!-- Content -->
</ribbon:SfRibbon>
```

### Branded Ribbon

```xaml
<ribbon:SfRibbon Background="#0078D4">
    <ribbon:SfRibbon.Tabs>
        <ribbon:RibbonTab Header="Home">
            <ribbon:RibbonTab.Foreground>
                <SolidColorBrush Color="White" />
            </ribbon:RibbonTab.Foreground>
            <!-- Tab content -->
        </ribbon:RibbonTab>
    </ribbon:SfRibbon.Tabs>
</ribbon:SfRibbon>
```

## Control Templates

### Custom Button Template

```xaml
<Page.Resources>
    <ControlTemplate x:Key="CustomRibbonButtonTemplate" TargetType="ribbon:RibbonButton">
        <Grid Background="{TemplateBinding Background}"
             Padding="10,5"
             CornerRadius="4">
            <Grid.RowDefinitions>
                <RowDefinition Height="Auto" />
                <RowDefinition Height="Auto" />
            </Grid.RowDefinitions>
            
            <ContentPresenter Grid.Row="0"
                            Content="{TemplateBinding Icon}"
                            HorizontalAlignment="Center" />
            <TextBlock Grid.Row="1"
                      Text="{TemplateBinding Content}"
                      HorizontalAlignment="Center"
                      Margin="0,4,0,0"
                      FontSize="11" />
        </Grid>
    </ControlTemplate>
</Page.Resources>

<ribbon:RibbonButton Content="Custom"
                   Icon="Save"
                   Template="{StaticResource CustomRibbonButtonTemplate}" />
```

### Custom Tab Header Style

```xaml
<Style x:Key="CustomRibbonTabStyle" TargetType="ribbon:RibbonTab">
    <Setter Property="FontSize" Value="14" />
    <Setter Property="FontWeight" Value="SemiBold" />
    <Setter Property="Foreground" Value="#0078D4" />
    <Setter Property="Padding" Value="15,8" />
</Style>

<ribbon:RibbonTab Header="Home" Style="{StaticResource CustomRibbonTabStyle}">
    <!-- Content -->
</ribbon:RibbonTab>
```

## Custom Styling

### Ribbon Group Styling

```xaml
<Page.Resources>
    <Style x:Key="HighlightGroupStyle" TargetType="ribbon:RibbonGroup">
        <Setter Property="BorderBrush" Value="#0078D4" />
        <Setter Property="BorderThickness" Value="2" />
        <Setter Property="CornerRadius" Value="4" />
        <Setter Property="Padding" Value="10" />
        <Setter Property="Background">
            <Setter.Value>
                <LinearGradientBrush StartPoint="0,0" EndPoint="0,1">
                    <GradientStop Color="#F9F9F9" Offset="0" />
                    <GradientStop Color="#EFEFEF" Offset="1" />
                </LinearGradientBrush>
            </Setter.Value>
        </Setter>
    </Style>
</Page.Resources>

<ribbon:RibbonGroup Header="Important" Style="{StaticResource HighlightGroupStyle}">
    <!-- Content -->
</ribbon:RibbonGroup>
```

### Button Hover Effects

```xaml
<Style x:Key="AnimatedButtonStyle" TargetType="ribbon:RibbonButton">
    <Setter Property="Background" Value="Transparent" />
    <Setter Property="Transitions">
        <Setter.Value>
            <TransitionCollection>
                <RepositionThemeTransition />
            </TransitionCollection>
        </Setter.Value>
    </Setter>
</Style>

<ribbon:RibbonButton Content="Hover Me"
                   Style="{StaticResource AnimatedButtonStyle}">
    <ribbon:RibbonButton.Resources>
        <Storyboard x:Name="HoverStoryboard">
            <DoubleAnimation Storyboard.TargetName="ScaleTransform"
                           Storyboard.TargetProperty="ScaleX"
                           To="1.1"
                           Duration="0:0:0.2" />
            <DoubleAnimation Storyboard.TargetName="ScaleTransform"
                           Storyboard.TargetProperty="ScaleY"
                           To="1.1"
                           Duration="0:0:0.2" />
        </Storyboard>
    </ribbon:RibbonButton.Resources>
</ribbon:RibbonButton>
```

### Contextual Tab Group Colors

```xaml
<!-- Define color schemes for different contexts -->
<ribbon:RibbonContextualTabGroup x:Name="ImageTools"
                                Background="#E3F2FD"
                                Foreground="#0D47A1">
    <!-- Image editing tools -->
</ribbon:RibbonContextualTabGroup>

<ribbon:RibbonContextualTabGroup x:Name="TableTools"
                                Background="#E8F5E9"
                                Foreground="#1B5E20">
    <!-- Table editing tools -->
</ribbon:RibbonContextualTabGroup>

<ribbon:RibbonContextualTabGroup x:Name="ChartTools"
                                Background="#FFF3E0"
                                Foreground="#E65100">
    <!-- Chart editing tools -->
</ribbon:RibbonContextualTabGroup>
```

## Icon Customization

### Using FontIcon with Custom Fonts

```xaml
<ribbon:RibbonButton Content="Custom Icon">
    <ribbon:RibbonButton.Icon>
        <FontIcon FontFamily="ms-appx:///Assets/Fonts/CustomIcons.ttf#CustomIcons"
                 Glyph="&#xE001;"
                 FontSize="20" />
    </ribbon:RibbonButton.Icon>
</ribbon:RibbonButton>
```

### Using BitmapIcon

```xaml
<ribbon:RibbonButton Content="Logo">
    <ribbon:RibbonButton.Icon>
        <BitmapIcon UriSource="ms-appx:///Assets/Icons/company-logo.png"
                   ShowAsMonochrome="False" />
    </ribbon:RibbonButton.Icon>
</ribbon:RibbonButton>
```

### Using PathIcon (SVG)

```xaml
<ribbon:RibbonButton Content="Vector">
    <ribbon:RibbonButton.Icon>
        <PathIcon Data="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                 Foreground="#0078D4" />
    </ribbon:RibbonButton.Icon>
</ribbon:RibbonButton>
```

### Animated Icons

```xaml
<ribbon:RibbonButton Content="Loading">
    <ribbon:RibbonButton.Icon>
        <AnimatedIcon>
            <AnimatedIcon.Source>
                <muxc:AnimatedProgressRingIconSource />
            </AnimatedIcon.Source>
        </AnimatedIcon>
    </ribbon:RibbonButton.Icon>
</ribbon:RibbonButton>
```

## Accessibility

### Keyboard Navigation

```xaml
<!-- TabIndex for custom navigation order -->
<ribbon:RibbonButton Content="First"
                   TabIndex="1"
                   IsTabStop="True" />
<ribbon:RibbonButton Content="Second"
                   TabIndex="2"
                   IsTabStop="True" />
```

### Screen Reader Support

```xaml
<ribbon:RibbonButton Content="Save"
                   Icon="Save"
                   AutomationProperties.Name="Save Document"
                   AutomationProperties.HelpText="Saves the current document to disk"
                   ToolTipService.ToolTip="Save (Ctrl+S)" />
```

### High Contrast Support

```xaml
<Page.Resources>
    <ResourceDictionary>
        <!-- Define high contrast resources -->
        <SolidColorBrush x:Key="RibbonButtonForegroundHighContrast" 
                        Color="{ThemeResource SystemColorButtonTextColor}" />
        <SolidColorBrush x:Key="RibbonButtonBackgroundHighContrast" 
                        Color="{ThemeResource SystemColorButtonFaceColor}" />
    </ResourceDictionary>
</Page.Resources>
```

### Focus Indicators

```xaml
<Style x:Key="AccessibleButtonStyle" TargetType="ribbon:RibbonButton">
    <Setter Property="FocusVisualMargin" Value="-3" />
    <Setter Property="UseSystemFocusVisuals" Value="True" />
</Style>

<ribbon:RibbonButton Content="Accessible"
                   Style="{StaticResource AccessibleButtonStyle}" />
```

### Minimum Touch Target Size

```xaml
<!-- Ensure 44x44 minimum for touch targets -->
<ribbon:RibbonButton Content="Touch Friendly"
                   MinWidth="44"
                   MinHeight="44"
                   Padding="10" />
```

## Best Practices

### Color Guidelines

**Do:**
- Use system theme colors when possible
- Maintain sufficient color contrast (WCAG AA: 4.5:1 minimum)
- Test with both Light and Dark themes
- Use semantic colors (error=red, success=green)

**Don't:**
- Hard-code colors that clash with theme
- Use color as only indicator (also use icons/text)
- Forget about color-blind users

### Performance Considerations

```csharp
// Lazy-load RightPane content
<ribbon:SfRibbon.RightPane>
    <ContentControl x:Name="rightPaneContent" />
</ribbon:SfRibbon.RightPane>

// In code-behind
private void LoadRightPaneContent()
{
    if (rightPaneContent.Content == null)
    {
        rightPaneContent.Content = new UserProfileControl();
    }
}
```

### Responsive Icons

```xaml
<!-- Different icons for different sizes -->
<ribbon:RibbonButton x:Name="saveButton"
                   Content="Save"
                   AllowedSizeModes="Large,Normal,Small">
    <!-- Code-behind changes icon based on actual size -->
</ribbon:RibbonButton>
```

```csharp
private void UpdateIconForSize(RibbonButton button, RibbonElementSizeModes size)
{
    switch (size)
    {
        case RibbonElementSizeModes.Large:
            button.Icon = new BitmapIcon { UriSource = new Uri("ms-appx:///Assets/Save_Large.png") };
            break;
        case RibbonElementSizeModes.Normal:
            button.Icon = new SymbolIcon(Symbol.Save);
            break;
        case RibbonElementSizeModes.Small:
            button.Icon = new FontIcon { Glyph = "\uE74E", FontSize = 12 };
            break;
    }
}
```

### Branding Consistency

```xaml
<Page.Resources>
    <!-- Define brand colors -->
    <Color x:Key="BrandPrimaryColor">#0078D4</Color>
    <Color x:Key="BrandSecondaryColor">#106EBE</Color>
    <Color x:Key="BrandAccentColor">#FF6B35</Color>
    
    <SolidColorBrush x:Key="BrandPrimaryBrush" Color="{StaticResource BrandPrimaryColor}" />
    <SolidColorBrush x:Key="BrandSecondaryBrush" Color="{StaticResource BrandSecondaryColor}" />
    <SolidColorBrush x:Key="BrandAccentBrush" Color="{StaticResource BrandAccentColor}" />
</Page.Resources>

<ribbon:SfRibbon Background="{StaticResource BrandPrimaryBrush}">
    <!-- Use consistent branding throughout -->
</ribbon:SfRibbon>
```

## Troubleshooting

### RightPane Content Not Visible

**Problem:** Content added to RightPane doesn't appear

**Solution:**
```xaml
<!-- Ensure content has proper size and alignment -->
<ribbon:SfRibbon.RightPane>
    <StackPanel Orientation="Horizontal"
               VerticalAlignment="Center"
               Margin="10,0">
        <!-- Content -->
    </StackPanel>
</ribbon:SfRibbon.RightPane>
```

### Custom Styles Not Applied

**Problem:** Style changes don't take effect

**Solution:**
```xaml
<!-- Ensure Style is in proper scope -->
<Page.Resources>
    <Style TargetType="ribbon:RibbonButton" x:Key="MyButtonStyle">
        <!-- Style setters -->
    </Style>
</Page.Resources>

<!-- Apply explicitly -->
<ribbon:RibbonButton Style="{StaticResource MyButtonStyle}" />
```

### Icons Pixelated

**Problem:** Custom icons look blurry or pixelated

**Solution:**
- Use vector formats (FontIcon, PathIcon) when possible
- Provide multiple resolution images (Assets at @1x, @1.5x, @2x scales)
- Set `ShowAsMonochrome="False"` for BitmapIcon if colors matter

### Theme Not Switching

**Problem:** Dark/Light theme doesn't update ribbon

**Solution:**
```csharp
// Listen for theme changes
private void OnThemeChanged()
{
    // Reload resources or force refresh
    this.RequestedTheme = Application.Current.RequestedTheme;
}
```

## Related Topics

- **Ribbon Items** - Customizing button appearance → [ribbon-items.md](ribbon-items.md)
- **Tabs and Groups** - Styling tabs and groups → [tabs-and-groups.md](tabs-and-groups.md)
- **Advanced Features** - ScreenTip customization → [advanced-features.md](advanced-features.md)
