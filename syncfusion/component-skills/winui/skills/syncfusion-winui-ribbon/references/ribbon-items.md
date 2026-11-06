# Ribbon Items

## Table of Contents
- [Overview](#overview)
- [RibbonButton](#ribbonbutton)
- [RibbonDropDownButton](#ribbondropdownbutton)
- [RibbonSplitButton](#ribbonsplitbutton)
- [RibbonToggleButton](#ribbontogglebutton)
- [Item Sizing](#item-sizing)
- [Icon Types](#icon-types)
- [RibbonComboBox](#ribboncombobox)
- [RibbonItemHost](#ribbonitemhost)
- [Group Launcher Button](#group-launcher-button)
- [Commands and Events](#commands-and-events)
- [Troubleshooting](#troubleshooting)

## Overview

Ribbon items are the interactive controls within ribbon groups. Syncfusion provides built-in ribbon items and the ability to host custom controls.

**Built-in Items:**
- **RibbonButton** - Standard clickable button
- **RibbonDropDownButton** - Button with dropdown menu
- **RibbonSplitButton** - Combined button + dropdown
- **RibbonToggleButton** - Toggle (on/off) button
- **RibbonComboBox** - Dropdown selection list
- **RibbonItemHost** - Host any custom WinUI control

## RibbonButton

Standard button for executing commands.

### Basic Button

```xaml
<ribbon:RibbonGroup Header="File">
    <ribbon:RibbonButton Content="Save"
                       Icon="Save"
                       AllowedSizeModes="Large"
                       Click="OnSaveClick" />
    <ribbon:RibbonButton Content="Open"
                       Icon="OpenFile"
                       AllowedSizeModes="Normal"
                       Click="OnOpenClick" />
    <ribbon:RibbonButton Content="Print"
                       Icon="Print"
                       AllowedSizeModes="Small" />
</ribbon:RibbonGroup>
```

### Button with Command Binding

```xaml
<ribbon:RibbonButton Content="Save"
                   Icon="Save"
                   AllowedSizeModes="Large"
                   Command="{Binding SaveCommand}"
                   CommandParameter="{Binding CurrentDocument}" />
```

### Programmatic Button Creation

```csharp
RibbonButton saveButton = new RibbonButton
{
    Content = "Save",
    Icon = new SymbolIcon(Symbol.Save),
    AllowedSizeModes = RibbonElementSizeModes.Large
};
saveButton.Click += OnSaveClick;

ribbonGroup.Items.Add(saveButton);
```

## RibbonDropDownButton

Button that displays a dropdown menu when clicked.

### Basic DropDown

```xaml
<ribbon:RibbonGroup Header="File">
    <ribbon:RibbonDropDownButton Content="New File"
                               AllowedSizeModes="Large">
        <ribbon:RibbonDropDownButton.Icon>
            <FontIcon FontFamily="Segoe MDL2 Assets" Glyph="&#xE7C3;" />
        </ribbon:RibbonDropDownButton.Icon>
        <ribbon:RibbonDropDownButton.Flyout>
            <MenuFlyout>
                <MenuFlyoutItem Text="Empty File" Click="OnNewEmpty" />
                <MenuFlyoutItem Text="Template File" Click="OnNewTemplate" />
                <MenuFlyoutSeparator />
                <MenuFlyoutItem Text="From Existing..." Click="OnNewFromExisting" />
            </MenuFlyout>
        </ribbon:RibbonDropDownButton.Flyout>
    </ribbon:RibbonDropDownButton>
</ribbon:RibbonGroup>
```

### DropDown with Icons

```xaml
<ribbon:RibbonDropDownButton Content="Export"
                           Icon="Export"
                           AllowedSizeModes="Normal">
    <ribbon:RibbonDropDownButton.Flyout>
        <MenuFlyout>
            <MenuFlyoutItem Text="Export as PDF">
                <MenuFlyoutItem.Icon>
                    <FontIcon Glyph="&#xE8A5;" />
                </MenuFlyoutItem.Icon>
            </MenuFlyoutItem>
            <MenuFlyoutItem Text="Export as Word">
                <MenuFlyoutItem.Icon>
                    <FontIcon Glyph="&#xE8A4;" />
                </MenuFlyoutItem.Icon>
            </MenuFlyoutItem>
            <MenuFlyoutItem Text="Export as Excel">
                <MenuFlyoutItem.Icon>
                    <FontIcon Glyph="&#xE8A6;" />
                </MenuFlyoutItem.Icon>
            </MenuFlyoutItem>
        </MenuFlyout>
    </ribbon:RibbonDropDownButton.Flyout>
</ribbon:RibbonDropDownButton>
```

### Programmatic DropDown

```csharp
RibbonDropDownButton newFileButton = new RibbonDropDownButton
{
    Content = "New File",
    AllowedSizeModes = RibbonElementSizeModes.Large,
    Icon = new FontIcon 
    { 
        Glyph = "\xE7C3", 
        FontFamily = new FontFamily("Segoe MDL2 Assets") 
    }
};

MenuFlyout flyout = new MenuFlyout();
MenuFlyoutItem emptyItem = new MenuFlyoutItem { Text = "Empty File" };
MenuFlyoutItem templateItem = new MenuFlyoutItem { Text = "Template File" };
emptyItem.Click += OnNewEmpty;
templateItem.Click += OnNewTemplate;

flyout.Items.Add(emptyItem);
flyout.Items.Add(templateItem);
newFileButton.Flyout = flyout;

ribbonGroup.Items.Add(newFileButton);
```

## RibbonSplitButton

Combined control with a primary button (Click event) and secondary dropdown menu.

### Basic Split Button

```xaml
<ribbon:RibbonGroup Header="Voice">
    <ribbon:RibbonSplitButton Icon="Microphone"
                            Content="Dictate"
                            AllowedSizeModes="Large"
                            Click="OnDictateClick">
        <ribbon:RibbonSplitButton.Flyout>
            <MenuFlyout>
                <MenuFlyoutItem Text="Chinese" Click="OnLanguageChanged" />
                <MenuFlyoutItem Text="English" Click="OnLanguageChanged" />
                <MenuFlyoutItem Text="French" Click="OnLanguageChanged" />
                <MenuFlyoutItem Text="German" Click="OnLanguageChanged" />
            </MenuFlyout>
        </ribbon:RibbonSplitButton.Flyout>
    </ribbon:RibbonSplitButton>
</ribbon:RibbonGroup>
```

**Behavior:**
- Click main button → Executes primary action (OnDictateClick)
- Click dropdown arrow → Shows menu options

### Split Button Usage Pattern

```csharp
// Primary action (click main button)
private void OnDictateClick(object sender, RoutedEventArgs e)
{
    // Start dictation with current language
    StartDictation(currentLanguage);
}

// Menu item selection (dropdown)
private void OnLanguageChanged(object sender, RoutedEventArgs e)
{
    if (sender is MenuFlyoutItem item)
    {
        currentLanguage = item.Text;
        // Update UI or settings
    }
}
```

### Programmatic Split Button

```csharp
RibbonSplitButton dictateButton = new RibbonSplitButton
{
    Content = "Dictate",
    AllowedSizeModes = RibbonElementSizeModes.Large,
    Icon = new SymbolIcon(Symbol.Microphone)
};
dictateButton.Click += OnDictateClick;

MenuFlyout languageFlyout = new MenuFlyout();
foreach (string language in new[] { "Chinese", "English", "French", "German" })
{
    MenuFlyoutItem item = new MenuFlyoutItem { Text = language };
    item.Click += OnLanguageChanged;
    languageFlyout.Items.Add(item);
}
dictateButton.Flyout = languageFlyout;

ribbonGroup.Items.Add(dictateButton);
```

## RibbonToggleButton

Toggle button for on/off states (Bold, Italic, etc.).

### Basic Toggle Button

```xaml
<ribbon:RibbonGroup Header="Font">
    <ribbon:RibbonToggleButton Content="Bold"
                             AllowedSizeModes="Large"
                             IsChecked="{Binding IsBold, Mode=TwoWay}">
        <ribbon:RibbonToggleButton.Icon>
            <SymbolIcon Symbol="Bold" />
        </ribbon:RibbonToggleButton.Icon>
    </ribbon:RibbonToggleButton>
    
    <ribbon:RibbonToggleButton Content="Italic"
                             AllowedSizeModes="Normal"
                             IsChecked="{Binding IsItalic, Mode=TwoWay}">
        <ribbon:RibbonToggleButton.Icon>
            <SymbolIcon Symbol="Italic" />
        </ribbon:RibbonToggleButton.Icon>
    </ribbon:RibbonToggleButton>
    
    <ribbon:RibbonToggleButton Content="Underline"
                             AllowedSizeModes="Small"
                             Icon="Underline"
                             IsChecked="{Binding IsUnderline, Mode=TwoWay}" />
</ribbon:RibbonGroup>
```

### Toggle Button Events

```xaml
<ribbon:RibbonToggleButton Content="Bold"
                         AllowedSizeModes="Normal"
                         Checked="OnBoldChecked"
                         Unchecked="OnBoldUnchecked">
    <ribbon:RibbonToggleButton.Icon>
        <SymbolIcon Symbol="Bold" />
    </ribbon:RibbonToggleButton.Icon>
</ribbon:RibbonToggleButton>
```

```csharp
private void OnBoldChecked(object sender, RoutedEventArgs e)
{
    // Apply bold formatting
    text.FontWeight = FontWeights.Bold;
}

private void OnBoldUnchecked(object sender, RoutedEventArgs e)
{
    // Remove bold formatting
    text.FontWeight = FontWeights.Normal;
}
```

### Toggle Button with Command

```xaml
<ribbon:RibbonToggleButton Content="Bold"
                         AllowedSizeModes="Normal"
                         Command="{Binding ToggleBoldCommand}"
                         CommandParameter="Bold"
                         IsChecked="{Binding IsBoldEnabled}">
    <ribbon:RibbonToggleButton.Icon>
        <SymbolIcon Symbol="Bold" />
    </ribbon:RibbonToggleButton.Icon>
</ribbon:RibbonToggleButton>
```

## Item Sizing

The `AllowedSizeModes` property controls button size within a ribbon group.

### Size Modes

**Small:**
- Icon only, no text
- ~24x24 pixels
- Use for less important commands

**Normal:**
- Icon + text horizontal layout
- ~32x32 icon
- Use for standard commands

**Large:**
- Icon above text vertical layout
- ~48x48 icon
- Use for primary commands

### Size Mode Examples

```xaml
<ribbon:RibbonGroup Header="Sizes">
    <!-- Large: Icon above text -->
    <ribbon:RibbonButton Content="Save"
                       Icon="Save"
                       AllowedSizeModes="Large" />
    
    <!-- Normal: Icon beside text -->
    <ribbon:RibbonButton Content="Open"
                       Icon="OpenFile"
                       AllowedSizeModes="Normal" />
    
    <!-- Small: Icon only -->
    <ribbon:RibbonButton Icon="Print"
                       AllowedSizeModes="Small"
                       ToolTipService.ToolTip="Print" />
</ribbon:RibbonGroup>
```

### Combining Size Modes

Allow ribbon to choose size based on available space:

```xaml
<!-- Can be Large or Normal depending on space -->
<ribbon:RibbonButton Content="Paste"
                   Icon="Paste"
                   AllowedSizeModes="Large,Normal" />

<!-- Can be any size -->
<ribbon:RibbonButton Content="Cut"
                   Icon="Cut"
                   AllowedSizeModes="Large,Normal,Small" />
```

## Icon Types

### SymbolIcon (Built-in Icons)

```xaml
<ribbon:RibbonButton Content="Bold">
    <ribbon:RibbonButton.Icon>
        <SymbolIcon Symbol="Bold" />
    </ribbon:RibbonButton.Icon>
</ribbon:RibbonButton>

<!-- Shorthand for SymbolIcon -->
<ribbon:RibbonButton Content="Save" Icon="Save" />
```

### FontIcon (Font Glyphs)

```xaml
<ribbon:RibbonButton Content="Custom">
    <ribbon:RibbonButton.Icon>
        <FontIcon FontFamily="Segoe MDL2 Assets" Glyph="&#xE7C3;" />
    </ribbon:RibbonButton.Icon>
</ribbon:RibbonButton>
```

### BitmapIcon (Image Files)

```xaml
<ribbon:RibbonButton Content="Logo">
    <ribbon:RibbonButton.Icon>
        <BitmapIcon UriSource="ms-appx:///Assets/Icons/logo.png" />
    </ribbon:RibbonButton.Icon>
</ribbon:RibbonButton>
```

### PathIcon (Vector Paths)

```xaml
<ribbon:RibbonButton Content="Custom Shape">
    <ribbon:RibbonButton.Icon>
        <PathIcon Data="M10,0 L20,20 L0,20 Z" />
    </ribbon:RibbonButton.Icon>
</ribbon:RibbonButton>
```

## RibbonComboBox

ComboBox control within ribbon for dropdown selections.

### Basic RibbonComboBox

```xaml
<ribbon:RibbonGroup Header="Font">
    <ribbon:RibbonComboBox Header="Font Family"
                         Width="200"
                         DisplayOptions="Normal,Simplified"
                         SelectedIndex="0">
        <ribbon:RibbonComboBoxItem Content="Calibri" />
        <ribbon:RibbonComboBoxItem Content="Arial" />
        <ribbon:RibbonComboBoxItem Content="Segoe UI" />
        <ribbon:RibbonComboBoxItem Content="Times New Roman" />
    </ribbon:RibbonComboBox>
    
    <ribbon:RibbonComboBox Header="Font Size"
                         Width="97"
                         DisplayOptions="Normal,Overflow"
                         SelectedIndex="0">
        <ribbon:RibbonComboBoxItem Content="12" />
        <ribbon:RibbonComboBoxItem Content="14" />
        <ribbon:RibbonComboBoxItem Content="18" />
        <ribbon:RibbonComboBoxItem Content="24" />
    </ribbon:RibbonComboBox>
</ribbon:RibbonGroup>
```

**DisplayOptions:**
- `Normal` - Show in normal ribbon layout
- `Simplified` - Show in simplified layout
- `Overflow` - Show in overflow menu when simplified

### Data-Bound RibbonComboBox

```xaml
<ribbon:RibbonComboBox Header="Font Family"
                     Width="200"
                     ItemsSource="{Binding AvailableFonts}"
                     SelectedItem="{Binding CurrentFont, Mode=TwoWay}"
                     DisplayMemberPath="Name" />
```

## RibbonItemHost

Host custom WinUI controls in ribbon groups.

### Hosting ComboBox

```xaml
<ribbon:RibbonGroup Header="Font">
    <ribbon:RibbonItemHost Margin="0,12,0,0">
        <ribbon:RibbonItemHost.ItemTemplate>
            <ComboBox x:Name="FontComboBox"
                      Width="150"
                      PlaceholderText="Select Font"
                      SelectionChanged="OnFontChanged">
                <ComboBoxItem Content="Calibri" IsSelected="True" />
                <ComboBoxItem Content="Arial" />
                <ComboBoxItem Content="Segoe UI" />
            </ComboBox>
        </ribbon:RibbonItemHost.ItemTemplate>
    </ribbon:RibbonItemHost>
</ribbon:RibbonGroup>
```

### Hosting Multiple Controls

```xaml
<ribbon:RibbonGroup Header="Font">
    <ribbon:RibbonItemHost Margin="0,12,0,0">
        <ribbon:RibbonItemHost.ItemTemplate>
            <StackPanel Orientation="Horizontal" Spacing="5">
                <ComboBox Width="120" PlaceholderText="Font">
                    <ComboBoxItem Content="Calibri" IsSelected="True" />
                    <ComboBoxItem Content="Arial" />
                </ComboBox>
                <ComboBox Width="80" PlaceholderText="Size">
                    <ComboBoxItem Content="11" IsSelected="True" />
                    <ComboBoxItem Content="12" />
                    <ComboBoxItem Content="14" />
                </ComboBox>
            </StackPanel>
        </ribbon:RibbonItemHost.ItemTemplate>
    </ribbon:RibbonItemHost>
</ribbon:RibbonGroup>
```

### Hosting Toggle Buttons

```xaml
<ribbon:RibbonGroup Header="Formatting">
    <ribbon:RibbonItemHost Margin="0,12,0,0">
        <ribbon:RibbonItemHost.ItemTemplate>
            <StackPanel Orientation="Horizontal">
                <ToggleButton x:Name="Bold"
                            Background="{ThemeResource SystemChromeLowColor}"
                            IsChecked="{Binding IsBold, Mode=TwoWay}">
                    <SymbolIcon Symbol="Bold" />
                </ToggleButton>
                <ToggleButton x:Name="Italic"
                            Background="{ThemeResource SystemChromeLowColor}"
                            IsChecked="{Binding IsItalic, Mode=TwoWay}">
                    <SymbolIcon Symbol="Italic" />
                </ToggleButton>
            </StackPanel>
        </ribbon:RibbonItemHost.ItemTemplate>
    </ribbon:RibbonItemHost>
</ribbon:RibbonGroup>
```

## Group Launcher Button

Small button in bottom-right of group header for additional options.

### Launcher Button with Click Event

```xaml
<ribbon:RibbonGroup Header="Clipboard"
                  ShowLauncherButton="True"
                  LauncherButtonClick="OnClipboardLauncherClick">
    <ribbon:RibbonButton Content="Cut" Icon="Cut" />
    <ribbon:RibbonButton Content="Copy" Icon="Copy" />
    <ribbon:RibbonButton Content="Paste" Icon="Paste" />
</ribbon:RibbonGroup>
```

```csharp
private async void OnClipboardLauncherClick(RibbonGroup sender, object args)
{
    // Open advanced clipboard options dialog
    ContentDialog dialog = new ContentDialog
    {
        Title = "Clipboard Options",
        Content = "Advanced clipboard settings...",
        CloseButtonText = "Close",
        XamlRoot = this.XamlRoot
    };
    await dialog.ShowAsync();
}
```

### Launcher Button with Command

```xaml
<ribbon:RibbonGroup Header="Font"
                  ShowLauncherButton="True"
                  LauncherButtonCommand="{Binding ShowFontDialogCommand}">
    <ribbon:RibbonButton Content="Bold" Icon="Bold" />
    <ribbon:RibbonButton Content="Italic" Icon="Italic" />
</ribbon:RibbonGroup>
```

### Hiding Launcher Button

```xaml
<ribbon:RibbonGroup Header="Simple Group"
                  ShowLauncherButton="False">
    <!-- No launcher button will appear -->
</ribbon:RibbonGroup>
```

## Commands and Events

### Click Events

```xaml
<ribbon:RibbonButton Content="Save"
                   Icon="Save"
                   Click="OnSaveClick" />
```

```csharp
private void OnSaveClick(object sender, RoutedEventArgs e)
{
    // Handle save
}
```

### Command Binding

```xaml
<ribbon:RibbonButton Content="Save"
                   Icon="Save"
                   Command="{Binding SaveCommand}"
                   CommandParameter="{Binding CurrentDocument}" />
```

### IsEnabled Binding

```xaml
<ribbon:RibbonButton Content="Save"
                   Icon="Save"
                   Command="{Binding SaveCommand}"
                   IsEnabled="{Binding CanSave}" />
```

## Troubleshooting

### Icons Not Displaying

**Problem:** Button shows text but no icon

**Solution:**
```xaml
<!-- Incorrect: Invalid Symbol -->
<ribbon:RibbonButton Icon="InvalidSymbolName" />

<!-- Correct: Valid Symbol -->
<ribbon:RibbonButton Icon="Save" />

<!-- Or use full IconElement syntax -->
<ribbon:RibbonButton Content="Save">
    <ribbon:RibbonButton.Icon>
        <SymbolIcon Symbol="Save" />
    </ribbon:RibbonButton.Icon>
</ribbon:RibbonButton>
```

### Button Not Responding to Clicks

**Problem:** Click event not firing

**Solution:**
```csharp
// Ensure event handler signature is correct
private void OnSaveClick(object sender, RoutedEventArgs e)  // Correct
{
    // Handle click
}

// Ensure button is not disabled
<ribbon:RibbonButton IsEnabled="True" Click="OnSaveClick" />
```

### Items Overlapping in Group

**Problem:** Ribbon items overlap or render incorrectly

**Solution:**
- Use appropriate `AllowedSizeModes`
- Don't add too many items to one group
- Test responsive behavior at different window sizes
- Consider using simplified layout for narrow windows

### ComboBox Not Showing in Overflow

**Problem:** RibbonComboBox disappears in simplified mode

**Solution:**
```xaml
<!-- Include OverflowMenu in DisplayOptions -->
<ribbon:RibbonComboBox Header="Font Size"
                     DisplayOptions="Normal,Simplified,OverflowMenu" />
```

## Related Topics

- **Simplified Layout** - Control item visibility in compact mode → [simplified-layout.md](simplified-layout.md)
- **UI Customization** - Style and theme ribbon items → [ui-customization.md](ui-customization.md)
