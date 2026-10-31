# Backstage

## Table of Contents
- [Overview](#overview)
- [RibbonBackstage Basics](#ribbonbackstage-basics)
- [BackstageView Control](#backstageview-control)
- [Custom Backstage Layouts](#custom-backstage-layouts)
- [Backstage Menu Button](#backstage-menu-button)
- [Navigation Patterns](#navigation-patterns)
- [Common Use Cases](#common-use-cases)
- [Troubleshooting](#troubleshooting)

## Overview

The RibbonBackstage provides a separate full-screen view for application-level commands and settings, similar to the "File" menu in Microsoft Office applications.

**Use backstage for:**
- Application settings and options
- File operations (New, Open, Save As, Print)
- User account management
- Application information (About, Help)
- Recent documents/files

**Key Features:**
- Full-screen overlay view
- Customizable layout
- Integration with BackstageView control
- Left navigation panel
- Content display area

## RibbonBackstage Basics

### Creating Backstage

```xaml
<ribbon:SfRibbon x:Name="sfRibbon">
    <!-- Backstage -->
    <ribbon:SfRibbon.Backstage>
        <ribbon:RibbonBackstage>
            <Grid>
                <TextBlock Text="Backstage Content"
                         FontSize="24"
                         HorizontalAlignment="Center"
                         VerticalAlignment="Center" />
            </Grid>
        </ribbon:RibbonBackstage>
    </ribbon:SfRibbon.Backstage>
    
    <!-- Regular Tabs -->
    <ribbon:SfRibbon.Tabs>
        <ribbon:RibbonTab Header="Home">
            <!-- Tab content -->
        </ribbon:RibbonTab>
    </ribbon:SfRibbon.Tabs>
</ribbon:SfRibbon>
```

### Opening Backstage

Users open backstage by clicking the backstage menu button (default label: "File") in the top-left corner of the ribbon.

### Programmatic Backstage Control

```csharp
// Check if backstage is open
bool isOpen = sfRibbon.IsBackstageOpen;

// Open backstage programmatically
sfRibbon.IsBackstageOpen = true;

// Close backstage programmatically
sfRibbon.IsBackstageOpen = false;
```

## BackstageView Control

The BackstageView provides a structured navigation pattern with left panel navigation and content area.

### Basic BackstageView

```xaml
<ribbon:SfRibbon.Backstage>
    <ribbon:RibbonBackstage>
        <ribbon:BackstageView>
            <ribbon:BackstageView.Items>
                <!-- Navigation Items -->
                <ribbon:BackstageViewItemHeader Header="New" />
                <ribbon:BackstageViewItemHeader Header="Open" />
                <ribbon:BackstageViewItemHeader Header="Save" />
                <ribbon:BackstageViewItemSeparator />
                
                <!-- Tab with Content -->
                <ribbon:BackstageViewTabItem Header="Settings">
                    <Grid Margin="20">
                        <TextBlock Text="Settings Content" FontSize="20" />
                    </Grid>
                </ribbon:BackstageViewTabItem>
                
                <ribbon:BackstageViewTabItem Header="About">
                    <Grid Margin="20">
                        <TextBlock Text="About Application" FontSize="20" />
                    </Grid>
                </ribbon:BackstageViewTabItem>
            </ribbon:BackstageView.Items>
        </ribbon:BackstageView>
    </ribbon:RibbonBackstage>
</ribbon:SfRibbon.Backstage>
```

### BackstageViewItemHeader (Button Items)

Header items act as buttons that execute commands when clicked:

```xaml
<ribbon:BackstageViewItemHeader Header="New"
                               Command="{Binding NewFileCommand}">
    <ribbon:BackstageViewItemHeader.Icon>
        <SymbolIcon Symbol="NewWindow" />
    </ribbon:BackstageViewItemHeader.Icon>
</ribbon:BackstageViewItemHeader>

<ribbon:BackstageViewItemHeader Header="Open"
                               Command="{Binding OpenFileCommand}">
    <ribbon:BackstageViewItemHeader.Icon>
        <SymbolIcon Symbol="OpenFile" />
    </ribbon:BackstageViewItemHeader.Icon>
</ribbon:BackstageViewItemHeader>
```

### BackstageViewTabItem (Content Panels)

Tab items display content in the main area when selected:

```xaml
<ribbon:BackstageViewTabItem Header="Settings">
    <ribbon:BackstageViewTabItem.Icon>
        <SymbolIcon Symbol="Setting" />
    </ribbon:BackstageViewTabItem.Icon>
    
    <Grid Margin="20">
        <StackPanel Spacing="15">
            <TextBlock Text="Application Settings"
                     FontSize="24"
                     FontWeight="SemiBold" />
            <CheckBox Content="Enable auto-save" />
            <CheckBox Content="Check for updates" />
            <ComboBox Header="Theme" PlaceholderText="Select theme">
                <ComboBoxItem Content="Light" />
                <ComboBoxItem Content="Dark" />
                <ComboBoxItem Content="System" />
            </ComboBox>
        </StackPanel>
    </Grid>
</ribbon:BackstageViewTabItem>
```

## Custom Backstage Layouts

### Office-Style Backstage

Complete example mimicking Microsoft Office backstage:

```xaml
<ribbon:SfRibbon.Backstage>
    <ribbon:RibbonBackstage>
        <Grid>
            <Grid.RowDefinitions>
                <RowDefinition Height="*" />
                <RowDefinition Height="Auto" />
            </Grid.RowDefinitions>
            
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="250" />
                <ColumnDefinition Width="*" />
            </Grid.ColumnDefinitions>
            
            <!-- Left Navigation Panel -->
            <StackPanel Grid.Row="0" Grid.Column="0"
                       Background="{ThemeResource SystemChromeMediumColor}"
                       Padding="10">
                <Button Content="New" 
                       HorizontalAlignment="Stretch"
                       Click="OnNewClick"
                       Margin="0,5">
                    <Button.Template>
                        <ControlTemplate TargetType="Button">
                            <Grid Background="{TemplateBinding Background}"
                                 Padding="15,10">
                                <TextBlock Text="{TemplateBinding Content}"
                                         FontSize="14" />
                            </Grid>
                        </ControlTemplate>
                    </Button.Template>
                </Button>
                
                <Button Content="Open" 
                       HorizontalAlignment="Stretch"
                       Click="OnOpenClick"
                       Margin="0,5" />
                
                <Button Content="Save" 
                       HorizontalAlignment="Stretch"
                       Click="OnSaveClick"
                       Margin="0,5" />
                
                <Button Content="Save As" 
                       HorizontalAlignment="Stretch"
                       Click="OnSaveAsClick"
                       Margin="0,5" />
                
                <Rectangle Height="1" 
                          Fill="{ThemeResource SystemBaseLowColor}"
                          Margin="0,10" />
                
                <Button Content="Settings" 
                       HorizontalAlignment="Stretch"
                       Click="OnSettingsClick"
                       Margin="0,5" />
                
                <Button Content="About" 
                       HorizontalAlignment="Stretch"
                       Click="OnAboutClick"
                       Margin="0,5" />
            </StackPanel>
            
            <!-- Content Area -->
            <Grid Grid.Row="0" Grid.Column="1" Padding="30">
                <TextBlock Text="Select an option from the left"
                         FontSize="18"
                         Foreground="{ThemeResource SystemBaseMediumColor}"
                         VerticalAlignment="Center"
                         HorizontalAlignment="Center" />
            </Grid>
            
            <!-- Bottom Bar -->
            <Grid Grid.Row="1" Grid.ColumnSpan="2"
                 Background="{ThemeResource SystemChromeLowColor}"
                 Padding="20,10"
                 BorderBrush="{ThemeResource SystemBaseLowColor}"
                 BorderThickness="0,1,0,0">
                <StackPanel Orientation="Horizontal" 
                           HorizontalAlignment="Right"
                           Spacing="10">
                    <Button Content="Options" MinWidth="100" />
                    <Button Content="Exit Backstage" 
                           MinWidth="120"
                           Click="OnExitBackstageClick" />
                </StackPanel>
            </Grid>
        </Grid>
    </ribbon:RibbonBackstage>
</ribbon:SfRibbon.Backstage>
```

### Settings Panel Layout

```xaml
<ribbon:SfRibbon.Backstage>
    <ribbon:RibbonBackstage>
        <Grid>
            <Grid.RowDefinitions>
                <RowDefinition Height="Auto" />
                <RowDefinition Height="*" />
            </Grid.RowDefinitions>
            
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="300" />
                <ColumnDefinition Width="*" />
            </Grid.ColumnDefinitions>
            
            <!-- Header -->
            <TextBlock Grid.Row="0" Grid.ColumnSpan="2"
                     Text="Settings"
                     FontSize="28"
                     FontWeight="SemiBold"
                     Margin="20"
                     Padding="0,0,0,20"
                     BorderBrush="{ThemeResource SystemBaseLowColor}"
                     BorderThickness="0,0,0,1" />
            
            <!-- Left Panel: User Info -->
            <StackPanel Grid.Row="1" Grid.Column="0"
                       Margin="20,15,20,0"
                       Spacing="10">
                <TextBlock Text="User Information"
                         FontSize="16"
                         FontWeight="SemiBold"
                         Margin="0,0,0,10" />
                
                <PersonPicture DisplayName="John Doe"
                             Width="80"
                             Height="80" />
                
                <TextBlock Text="Name: John Doe" FontSize="14" />
                <TextBlock Text="Email: john.doe@example.com" FontSize="14" />
                
                <HyperlinkButton Content="Change photo" />
                <HyperlinkButton Content="Sign Out" />
                <HyperlinkButton Content="Switch Account" />
                
                <TextBlock Text="Theme Mode"
                         FontSize="14"
                         FontWeight="SemiBold"
                         Margin="0,20,0,5" />
                <RadioButton Content="Light" GroupName="Theme" />
                <RadioButton Content="Dark" GroupName="Theme" />
                <RadioButton Content="Use system setting" 
                           GroupName="Theme"
                           IsChecked="True" />
            </StackPanel>
            
            <!-- Right Panel: Product Info -->
            <StackPanel Grid.Row="1" Grid.Column="1"
                       Margin="20,15,20,0"
                       Padding="20,0,0,0"
                       BorderBrush="{ThemeResource SystemBaseLowColor}"
                       BorderThickness="1,0,0,0"
                       Spacing="10">
                <TextBlock Text="Product Information"
                         FontSize="16"
                         FontWeight="SemiBold"
                         Margin="0,0,0,10" />
                
                <HyperlinkButton Content="About product" />
                <HyperlinkButton Content="Help" />
                <HyperlinkButton Content="Updates" />
                <HyperlinkButton Content="Privacy Policy" />
            </StackPanel>
        </Grid>
    </ribbon:RibbonBackstage>
</ribbon:SfRibbon.Backstage>
```

## Backstage Menu Button

### Customizing Button Label

Change the default "File" label:

```xaml
<ribbon:SfRibbon x:Name="sfRibbon"
                BackstageMenuButtonContent="Menu">
    <!-- Backstage content -->
</ribbon:SfRibbon>
```

### Hiding Backstage Button

```csharp
// Hide backstage button (not recommended for standard applications)
sfRibbon.BackstageMenuButtonContent = null;
```

### Custom Button Template

```xaml
<ribbon:SfRibbon x:Name="sfRibbon">
    <ribbon:SfRibbon.BackstageMenuButtonContent>
        <StackPanel Orientation="Horizontal" Spacing="5">
            <SymbolIcon Symbol="Home" />
            <TextBlock Text="Menu" />
        </StackPanel>
    </ribbon:SfRibbon.BackstageMenuButtonContent>
</ribbon:SfRibbon>
```

## Navigation Patterns

### Exit Backstage Button

```csharp
private void OnExitBackstageClick(object sender, RoutedEventArgs e)
{
    sfRibbon.IsBackstageOpen = false;
}
```

```xaml
<Button Content="Exit Backstage"
       Click="OnExitBackstageClick"
       HorizontalAlignment="Right"
       Margin="20" />
```

### Command Navigation

```xaml
<ribbon:BackstageViewButtonItem Header="New"
                               Command="{Binding NewFileCommand}">
    <!-- Command closes backstage automatically -->
</ribbon:BackstageViewButtonItem>
```

```csharp
public ICommand NewFileCommand { get; }

public MainViewModel()
{
    NewFileCommand = new RelayCommand(ExecuteNewFile);
}

private void ExecuteNewFile()
{
    // Create new file
    CreateNewFile();
    
    // Close backstage
    // (BackstageViewItemHeader closes it automatically)
}
```

## Common Use Cases

### Use Case 1: File Operations

```xaml
<ribbon:BackstageView>
    <ribbon:BackstageView.Items>
        <ribbon:BackstageViewButtonItem Header="New"
                                       Command="{Binding NewCommand}">
            <ribbon:BackstageViewButtonItem.Icon>
                <SymbolIcon Symbol="NewWindow" />
            </ribbon:BackstageViewButtonItem.Icon>
        </ribbon:BackstageViewButtonItem>
        
        <ribbon:BackstageViewButtonItem Header="Open"
                                       Command="{Binding OpenCommand}">
            <ribbon:BackstageViewButtonItem.Icon>
                <SymbolIcon Symbol="OpenFile" />
            </ribbon:BackstageViewButtonItem.Icon>
        </ribbon:BackstageViewButtonItem>
        
        <ribbon:BackstageViewItemSeparator />
        
        <ribbon:BackstageViewTabItem Header="Recent">
            <ListView ItemsSource="{Binding RecentFiles}"
                     Margin="20">
                <!-- Recent files list -->
            </ListView>
        </ribbon:BackstageViewTabItem>
    </ribbon:BackstageView.Items>
</ribbon:BackstageView>
```

### Use Case 2: Application Settings

```xaml
<ribbon:BackstageViewTabItem Header="Settings">
    <ScrollViewer Margin="20">
        <StackPanel Spacing="20">
            <TextBlock Text="General Settings"
                     FontSize="24"
                     FontWeight="SemiBold" />
            
            <ToggleSwitch Header="Auto-save"
                         IsOn="{Binding IsAutoSaveEnabled, Mode=TwoWay}" />
            
            <ToggleSwitch Header="Check for updates"
                         IsOn="{Binding CheckUpdates, Mode=TwoWay}" />
            
            <ComboBox Header="Language"
                     ItemsSource="{Binding Languages}"
                     SelectedItem="{Binding SelectedLanguage, Mode=TwoWay}"
                     MinWidth="200" />
            
            <Button Content="Reset to Defaults"
                   Command="{Binding ResetSettingsCommand}" />
        </StackPanel>
    </ScrollViewer>
</ribbon:BackstageViewTabItem>
```

### Use Case 3: Account Management

```xaml
<ribbon:BackstageViewTabItem Header="Account">
    <Grid Margin="20">
        <StackPanel Spacing="15">
            <TextBlock Text="Account Information"
                     FontSize="24"
                     FontWeight="SemiBold" />
            
            <PersonPicture DisplayName="{Binding UserName}"
                         Width="100"
                         Height="100" />
            
            <TextBlock Text="{Binding UserName}" FontSize="18" />
            <TextBlock Text="{Binding UserEmail}" FontSize="14" />
            
            <Button Content="Manage Account"
                   Command="{Binding ManageAccountCommand}"
                   HorizontalAlignment="Left" />
            
            <Button Content="Sign Out"
                   Command="{Binding SignOutCommand}"
                   HorizontalAlignment="Left" />
        </StackPanel>
    </Grid>
</ribbon:BackstageViewTabItem>
```

## Troubleshooting

### Backstage Not Opening

**Problem:** Clicking menu button doesn't open backstage

**Solution:**
```xaml
<!-- Ensure Backstage property is set -->
<ribbon:SfRibbon.Backstage>
    <ribbon:RibbonBackstage>
        <!-- Content must exist -->
        <Grid>
            <TextBlock Text="Content" />
        </Grid>
    </ribbon:RibbonBackstage>
</ribbon:SfRibbon.Backstage>
```

### Content Not Displaying

**Problem:** Backstage opens but shows blank

**Solution:**
- Verify content is not collapsed or hidden
- Check that Grid or container has proper size
- Ensure RowDefinitions/ColumnDefinitions are set correctly

### Can't Close Backstage Programmatically

**Problem:** Setting IsBackstageOpen = false doesn't work

**Solution:**
```csharp
// Access backstage through ribbon instance
sfRibbon.Backstage.IsBackstageOpen = false;

// Not: backstage.IsBackstageOpen = false (if backstage is separate variable)
```

### BackstageView Items Not Clickable

**Problem:** Navigation items don't respond to clicks

**Solution:**
```xaml
<!-- Ensure proper item type -->
<ribbon:BackstageViewItemHeader Header="New" 
                               Command="{Binding NewCommand}" />
<!-- Not: <ribbon:BackstageViewTabItem> for button items -->
```

## Related Topics

- **Tabs and Groups** - Regular ribbon organization → [tabs-and-groups.md](tabs-and-groups.md)
- **UI Customization** - Theme backstage appearance → [ui-customization.md](ui-customization.md)
