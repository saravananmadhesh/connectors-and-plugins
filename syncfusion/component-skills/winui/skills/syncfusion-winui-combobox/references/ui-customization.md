# UI Customization in WinUI ComboBox

> **Prerequisite:** Ensure the `Syncfusion.Editors.WinUI` NuGet package is updated to the latest version for all customization features.

## Table of Contents
- [Overview](#overview)
- [Header and Description](#header-and-description)
- [Placeholder Text](#placeholder-text)
- [Item Templates](#item-templates)
- [Selection Box Template](#selection-box-template)
- [Token Styling](#token-styling)
- [Dropdown Header and Footer](#dropdown-header-and-footer)
- [Text Highlighting](#text-highlighting)
- [Best Practices](#best-practices)

## Overview

The WinUI ComboBox provides extensive customization options for appearance, including templates, styles, headers, and highlighting.

## Header and Description

### Basic Header

```xaml
<editors:SfComboBox Header="Favourite Social Media"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

### Custom Header Template

```xaml
<editors:SfComboBox ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name">
    <editors:SfComboBox.HeaderTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <FontIcon Glyph="&#xE8FA;" 
                         FontSize="16"
                         Margin="0,0,8,0" />
                <TextBlock Text="Select Social Media"
                          FontWeight="SemiBold"
                          FontSize="16"
                          Foreground="DarkBlue" />
            </StackPanel>
        </DataTemplate>
    </editors:SfComboBox.HeaderTemplate>
</editors:SfComboBox>
```

### Description Text

Add helper text below the ComboBox:

```xaml
<editors:SfComboBox Header="Favourite Social Media"
                    Description="Choose your preferred platform"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

## Placeholder Text

### Basic Placeholder

```xaml
<editors:SfComboBox PlaceholderText="Select a social media"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
comboBox.PlaceholderText = "Select a social media";
```

### Styled Placeholder

```xaml
<editors:SfComboBox PlaceholderText="Type to search..."
                    PlaceholderForeground="Gray"
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

## Item Templates

### Custom Dropdown Items

```xaml
<editors:SfComboBox ItemsSource="{Binding Employees}"
                    DisplayMemberPath="FullName"
                    TextMemberPath="FullName">
    <editors:SfComboBox.ItemTemplate>
        <DataTemplate>
            <Grid Padding="8">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="Auto" />
                    <ColumnDefinition Width="*" />
                </Grid.ColumnDefinitions>
                
                <Ellipse Width="40" Height="40" Margin="0,0,12,0">
                    <Ellipse.Fill>
                        <ImageBrush ImageSource="{Binding PhotoUrl}" />
                    </Ellipse.Fill>
                </Ellipse>
                
                <StackPanel Grid.Column="1" VerticalAlignment="Center">
                    <TextBlock Text="{Binding FullName}"
                              FontWeight="SemiBold"
                              FontSize="14" />
                    <TextBlock Text="{Binding Department}"
                              FontSize="12"
                              Foreground="Gray" />
                    <TextBlock Text="{Binding Email}"
                              FontSize="11"
                              Foreground="LightGray" />
                </StackPanel>
            </Grid>
        </DataTemplate>
    </editors:SfComboBox.ItemTemplate>
</editors:SfComboBox>
```

### ItemTemplate with Icons

```xaml
<editors:SfComboBox ItemsSource="{Binding Files}"
                    DisplayMemberPath="FileName"
                    TextMemberPath="FileName">
    <editors:SfComboBox.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Padding="8,4">
                <FontIcon Glyph="{Binding FileIcon}"
                         FontSize="20"
                         Margin="0,0,12,0" />
                <StackPanel>
                    <TextBlock Text="{Binding FileName}" 
                              FontWeight="Medium" />
                    <TextBlock Text="{Binding FileSize}"
                              FontSize="11"
                              Foreground="Gray" />
                </StackPanel>
            </StackPanel>
        </DataTemplate>
    </editors:SfComboBox.ItemTemplate>
</editors:SfComboBox>
```

## Selection Box Template

Customize the appearance of the selected item in the selection box (non-editable mode only).

### Display Selected Count (Multiple Selection)

```xaml
<editors:SfComboBox SelectionMode="Multiple"
                    MultiSelectionDisplayMode="Delimiter"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name">
    <editors:SfComboBox.SelectionBoxItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <TextBlock Text="Selected: " />
                <TextBlock Text="{Binding ElementName=comboBox, Path=SelectedItems.Count}"
                          FontWeight="Bold"
                          Foreground="Blue" />
                <TextBlock Text=" items" Margin="4,0,0,0" />
            </StackPanel>
        </DataTemplate>
    </editors:SfComboBox.SelectionBoxItemTemplate>
</editors:SfComboBox>
```

### Custom Selection Display

```xaml
<editors:SfComboBox ItemsSource="{Binding Users}"
                    DisplayMemberPath="FullName"
                    TextMemberPath="FullName">
    <editors:SfComboBox.SelectionBoxItemTemplate>
        <DataTemplate>
            <Grid>
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="Auto" />
                    <ColumnDefinition Width="*" />
                </Grid.ColumnDefinitions>
                
                <Ellipse Width="24" Height="24" Margin="0,0,8,0">
                    <Ellipse.Fill>
                        <ImageBrush ImageSource="{Binding AvatarUrl}" />
                    </Ellipse.Fill>
                </Ellipse>
                
                <TextBlock Grid.Column="1"
                          Text="{Binding FullName}"
                          VerticalAlignment="Center" />
            </Grid>
        </DataTemplate>
    </editors:SfComboBox.SelectionBoxItemTemplate>
</editors:SfComboBox>
```

**Important:** `SelectionBoxItemTemplate` has no effect when `IsEditable="True"`.

## Token Styling

Customize token appearance in multiple selection token mode.

### Basic Token Template

```xaml
<editors:SfComboBox SelectionMode="Multiple"
                    MultiSelectionDisplayMode="Token"
                    ItemsSource="{Binding Tags}"
                    DisplayMemberPath="TagName"
                    TextMemberPath="TagName">
    <editors:SfComboBox.TokenItemTemplate>
        <DataTemplate>
            <Grid Background="LightBlue"
                  Padding="8,4"
                  CornerRadius="12">
                <TextBlock Text="{Binding TagName}"
                          Foreground="DarkBlue"
                          FontWeight="Medium" />
            </Grid>
        </DataTemplate>
    </editors:SfComboBox.TokenItemTemplate>
</editors:SfComboBox>
```

### Styled Tokens with Close Button

```xaml
<editors:SfComboBox SelectionMode="Multiple"
                    MultiSelectionDisplayMode="Token"
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name">
    <editors:SfComboBox.TokenItemTemplate>
        <DataTemplate>
            <Border Background="{ThemeResource AccentFillColorDefaultBrush}"
                   BorderBrush="{ThemeResource AccentControlElevationBorderBrush}"
                   BorderThickness="1"
                   CornerRadius="4"
                   Padding="6,2">
                <TextBlock Text="{Binding Name}"
                          Foreground="White"
                          FontSize="12" />
            </Border>
        </DataTemplate>
    </editors:SfComboBox.TokenItemTemplate>
</editors:SfComboBox>
```

### Category-Colored Tokens

```xaml
<editors:SfComboBox.TokenItemTemplate>
    <DataTemplate>
        <Grid Background="{Binding CategoryColor}"
             Padding="10,4"
             CornerRadius="8">
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="Auto" />
                <ColumnDefinition Width="*" />
            </Grid.ColumnDefinitions>
            
            <FontIcon Glyph="{Binding CategoryIcon}"
                     FontSize="14"
                     Foreground="White"
                     Margin="0,0,6,0" />
            
            <TextBlock Grid.Column="1"
                      Text="{Binding Name}"
                      Foreground="White"
                      FontWeight="SemiBold" />
        </Grid>
    </DataTemplate>
</editors:SfComboBox.TokenItemTemplate>
```

## Text Highlighting

Highlight matching text in dropdown items during filtering/searching.

### Enable Highlighting

```xaml
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    TextHighlightMode="Matched"
                    TextSearchMode="StartsWith"
                    HighlightedTextForeground="Red"
                    HighlightedTextFontWeight="Bold"
                    ItemsSource="{Binding Countries}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

### Highlight Modes

**Matched:** Highlight text that matches user input
```xaml
<editors:SfComboBox TextHighlightMode="Matched"
                    TextSearchMode="StartsWith"
                    HighlightedTextForeground="Blue" />
```

**Unmatched:** Highlight text that doesn't match
```xaml
<editors:SfComboBox TextHighlightMode="Unmatched"
                    TextSearchMode="Contains"
                    HighlightedTextForeground="Gray" />
```

**None:** No highlighting
```xaml
<editors:SfComboBox TextHighlightMode="None" />
```

### Highlight Styling

```xaml
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    TextHighlightMode="Matched"
                    TextSearchMode="Contains"
                    HighlightedTextFontSize="15"
                    HighlightedTextFontStyle="Italic"
                    HighlightedTextFontWeight="Medium"
                    HighlightedTextForeground="Red"
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
comboBox.HighlightedTextFontSize = 15;
comboBox.HighlightedTextFontStyle = FontStyle.Italic;
comboBox.HighlightedTextFontWeight = FontWeights.Medium;
comboBox.HighlightedTextForeground = new SolidColorBrush(Colors.Red);
```

## Leading and Trailing Views

Add content before (leading) or after (trailing) the ComboBox input area.

### Leading View (Icon)

```xaml
<editors:SfComboBox PlaceholderText="Search a country">
    <editors:SfComboBox.LeadingView>
        <Viewbox Height="16" Width="16" Margin="4,0,0,0">
            <SymbolIcon Symbol="Find" />
        </Viewbox>
    </editors:SfComboBox.LeadingView>
</editors:SfComboBox>
```

### Trailing View (Button)

```xaml
<editors:SfComboBox PlaceholderText="Search a country">
    <editors:SfComboBox.TrailingView>
        <Button BorderThickness="0" Height="25" Click="OnClearClick">
            <Viewbox Height="16" Width="16">
                <FontIcon Glyph="&#xE894;" />
            </Viewbox>
        </Button>
    </editors:SfComboBox.TrailingView>
</editors:SfComboBox>
```

### Both Leading and Trailing

```xaml
<editors:SfComboBox PlaceholderText="Search a country">
    <editors:SfComboBox.LeadingView>
        <editors:SfComboBox Margin="0,4,0,4" Width="120">
            <editors:SfComboBoxItem Content="All Countries" IsSelected="True" />
            <editors:SfComboBoxItem Content="Asia" />
            <editors:SfComboBoxItem Content="Africa" />
            <editors:SfComboBoxItem Content="Europe" />
        </editors:SfComboBox>
    </editors:SfComboBox.LeadingView>
    
    <editors:SfComboBox.TrailingView>
        <Viewbox Height="16" Width="16" Margin="0,0,8,0">
            <SymbolIcon Symbol="Find" />
        </Viewbox>
    </editors:SfComboBox.TrailingView>
</editors:SfComboBox>
```

## Best Practices

### 1. Keep ItemTemplate Performant

```xaml
<!-- ✅ DO: Simple, efficient templates -->
<DataTemplate>
    <StackPanel Orientation="Horizontal">
        <Image Source="{Binding Icon}" Width="24" Height="24" />
        <TextBlock Text="{Binding Name}" Margin="8,0,0,0" />
    </StackPanel>
</DataTemplate>

<!-- ❌ DON'T: Complex nested controls -->
<DataTemplate>
    <Grid>
        <Grid.Effects>
            <BlurEffect />
        </Grid.Effects>
        <!-- Heavy animations, multiple layers -->
    </Grid>
</DataTemplate>
```

### 2. Use SelectionBoxItemTemplate Correctly

```xaml
<!-- ✅ DO: Only in non-editable mode -->
<editors:SfComboBox IsEditable="False"
                    SelectionBoxItemTemplate="{StaticResource Template}" />

<!-- ❌ DON'T: With editable mode (ignored) -->
<editors:SfComboBox IsEditable="True"
                    SelectionBoxItemTemplate="{StaticResource Template}" />
```

### 3. Consistent Token Sizing

```xaml
<!-- ✅ DO: Uniform token heights -->
<DataTemplate>
    <Border Height="28" Padding="8,4" CornerRadius="4">
        <TextBlock Text="{Binding Name}" />
    </Border>
</DataTemplate>

<!-- ❌ DON'T: Variable heights -->
<DataTemplate>
    <StackPanel>
        <TextBlock Text="{Binding Name}" />
        <TextBlock Text="{Binding Description}" /> <!-- Makes tokens different heights -->
    </StackPanel>
</DataTemplate>
```

### 4. Accessible Color Contrast

```xaml
<!-- ✅ DO: High contrast -->
<editors:SfComboBox HighlightedTextForeground="Blue"
                    Background="White" />

<!-- ❌ DON'T: Low contrast -->
<editors:SfComboBox HighlightedTextForeground="LightGray"
                    Background="White" />
```

### 5. Placeholder Guidance

```xaml
<!-- ✅ DO: Descriptive, actionable -->
<editors:SfComboBox PlaceholderText="Type to search employees..." />

<!-- ❌ DON'T: Vague or redundant -->
<editors:SfComboBox PlaceholderText="ComboBox" />
```

## Complete Examples

### Example 1: Product Search with Custom Template

```xaml
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    PlaceholderText="Search products..."
                    ItemsSource="{Binding Products}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name"
                    TextHighlightMode="Matched"
                    HighlightedTextForeground="Blue">
    <editors:SfComboBox.LeadingView>
        <FontIcon Glyph="&#xE721;" Margin="8,0,0,0" />
    </editors:SfComboBox.LeadingView>
    
    <editors:SfComboBox.ItemTemplate>
        <DataTemplate>
            <Grid Padding="8">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="Auto" />
                    <ColumnDefinition Width="*" />
                    <ColumnDefinition Width="Auto" />
                </Grid.ColumnDefinitions>
                
                <Image Source="{Binding ImageUrl}"
                      Width="40" Height="40"
                      Stretch="UniformToFill" />
                
                <StackPanel Grid.Column="1" Margin="12,0" VerticalAlignment="Center">
                    <TextBlock Text="{Binding Name}" FontWeight="SemiBold" />
                    <TextBlock Text="{Binding Category}" FontSize="12" Foreground="Gray" />
                </StackPanel>
                
                <TextBlock Grid.Column="2"
                          Text="{Binding Price, StringFormat='\${0:F2}'}"
                          FontWeight="Bold"
                          Foreground="Green"
                          VerticalAlignment="Center" />
            </Grid>
        </DataTemplate>
    </editors:SfComboBox.ItemTemplate>
</editors:SfComboBox>
```

### Example 2: Tag Selector with Custom Tokens

```xaml
<editors:SfComboBox SelectionMode="Multiple"
                    MultiSelectionDisplayMode="Token"
                    IsEditable="True"
                    PlaceholderText="Add tags..."
                    ItemsSource="{Binding AvailableTags}"
                    DisplayMemberPath="TagName"
                    TextMemberPath="TagName">
    <editors:SfComboBox.TokenItemTemplate>
        <DataTemplate>
            <Border Background="{Binding TagColor}"
                   BorderBrush="{Binding TagColor}"
                   BorderThickness="2"
                   CornerRadius="12"
                   Padding="10,4">
                <TextBlock Text="{Binding TagName}"
                          Foreground="White"
                          FontSize="12"
                          FontWeight="SemiBold" />
            </Border>
        </DataTemplate>
    </editors:SfComboBox.TokenItemTemplate>
</editors:SfComboBox>
```

## Summary

**Key Takeaways:**
- Use `Header` and `Description` for context
- Set `PlaceholderText` for user guidance
- Customize dropdown items with `ItemTemplate`
- Use `SelectionBoxItemTemplate` for selected item display (non-editable only)
- Style tokens with `TokenItemTemplate` in token mode
- Add `LeadingView` and `TrailingView` for icons/controls
- Enable text highlighting with `TextHighlightMode` and styling properties
- Keep templates performant for large lists
- Ensure color contrast for accessibility
