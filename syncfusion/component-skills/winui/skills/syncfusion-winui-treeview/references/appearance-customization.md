# Appearance Customization

## Table of Contents
- [Overview](#overview)
- [ItemTemplate](#itemtemplate)
- [ExpanderTemplate](#expandertemplate)
- [Item Height Customization](#item-height-customization)
- [TreeLines](#treelines)
- [Styling](#styling)
- [Theming](#theming)
- [Common Scenarios](#common-scenarios)

## Overview

TreeView provides extensive customization options including item templates, expander templates, item height configuration, tree lines, custom styling, and theme integration.

## ItemTemplate

Define the visual appearance of each node's content.

### Basic Template

```xml
<treeView:SfTreeView.ItemTemplate>
    <DataTemplate>
        <TextBlock Text="{Binding Name}" 
                   FontSize="14"
                   Margin="5" />
    </DataTemplate>
</treeView:SfTreeView.ItemTemplate>
```

### Template with Icon

```xml
<treeView:SfTreeView.ItemTemplate>
    <DataTemplate>
        <StackPanel Orientation="Horizontal" Spacing="8">
            <FontIcon Glyph="&#xE8B7;" FontSize="16" />
            <TextBlock Text="{Binding Name}" VerticalAlignment="Center" />
        </StackPanel>
    </DataTemplate>
</treeView:SfTreeView.ItemTemplate>
```

### Multi-Line Template

```xml
<treeView:SfTreeView.ItemTemplate>
    <DataTemplate>
        <StackPanel Margin="5">
            <TextBlock Text="{Binding Name}" 
                       FontWeight="SemiBold"
                       FontSize="14" />
            <TextBlock Text="{Binding Description}" 
                       FontSize="12"
                       Opacity="0.7"
                       TextWrapping="Wrap" />
        </StackPanel>
    </DataTemplate>
</treeView:SfTreeView.ItemTemplate>
```

### Conditional Icon Based on Type

```xml
<treeView:SfTreeView.ItemTemplate>
    <DataTemplate>
        <StackPanel Orientation="Horizontal" Spacing="8">
            <!-- Folder icon -->
            <FontIcon Glyph="&#xE8B7;" 
                      FontSize="16"
                      Visibility="{Binding IsFolder, Converter={StaticResource BoolToVisibility}}" />
            
            <!-- File icon -->
            <FontIcon Glyph="&#xE8A5;" 
                      FontSize="16"
                      Visibility="{Binding IsFolder, Converter={StaticResource InverseBoolToVisibility}}" />
            
            <TextBlock Text="{Binding Name}" VerticalAlignment="Center" />
        </StackPanel>
    </DataTemplate>
</treeView:SfTreeView.ItemTemplate>
```

### ItemTemplateSelector

Use different templates for different node types:

```csharp
public class FileNodeTemplateSelector : DataTemplateSelector
{
    public DataTemplate FolderTemplate { get; set; }
    public DataTemplate FileTemplate { get; set; }
    
    protected override DataTemplate SelectTemplateCore(object item)
    {
        var fileNode = item as FileNode;
        return fileNode?.IsFolder == true ? FolderTemplate : FileTemplate;
    }
}
```

```xml
<Page.Resources>
    <DataTemplate x:Key="FolderTemplate">
        <StackPanel Orientation="Horizontal">
            <FontIcon Glyph="&#xE8B7;" Foreground="#FFD700" />
            <TextBlock Text="{Binding Name}" FontWeight="Bold" />
        </StackPanel>
    </DataTemplate>
    
    <DataTemplate x:Key="FileTemplate">
        <StackPanel Orientation="Horizontal">
            <FontIcon Glyph="&#xE8A5;" />
            <TextBlock Text="{Binding Name}" />
        </StackPanel>
    </DataTemplate>
    
    <local:FileNodeTemplateSelector x:Key="TemplateSelector"
                                     FolderTemplate="{StaticResource FolderTemplate}"
                                     FileTemplate="{StaticResource FileTemplate}" />
</Page.Resources>

<treeView:SfTreeView ItemTemplateSelector="{StaticResource TemplateSelector}" />
```

### ItemTemplateDataContextType

Control the binding context for ItemTemplate:

```xml
<!-- Item: Data Model -->
<treeView:SfTreeView ItemTemplateDataContextType="Item">
    <treeView:SfTreeView.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Name}" />  <!-- Binds to FileNode.Name -->
        </DataTemplate>
    </treeView:SfTreeView.ItemTemplate>
</treeView:SfTreeView>

<!-- Node: TreeViewNode -->
<treeView:SfTreeView ItemTemplateDataContextType="Node">
    <treeView:SfTreeView.ItemTemplate>
        <DataTemplate>
            <StackPanel>
                <TextBlock Text="{Binding Content.Name}" />  <!-- Access data via Content -->
                <TextBlock Text="{Binding Level}" />  <!-- Access TreeViewNode properties -->
            </StackPanel>
        </DataTemplate>
    </treeView:SfTreeView.ItemTemplate>
</treeView:SfTreeView>
```

## ExpanderTemplate

Customize the expand/collapse indicator.

### Custom Expander Icons

```xml
<treeView:SfTreeView.ExpanderTemplate>
    <DataTemplate>
        <Grid>
            <!-- Collapsed state -->
            <FontIcon Glyph="&#xE76C;" 
                      FontSize="12"
                      Visibility="{Binding IsExpanded, Converter={StaticResource InverseBoolToVisibility}}" />
            
            <!-- Expanded state -->
            <FontIcon Glyph="&#xE70D;" 
                      FontSize="12"
                      Visibility="{Binding IsExpanded, Converter={StaticResource BoolToVisibility}}" />
        </Grid>
    </DataTemplate>
</treeView:SfTreeView.ExpanderTemplate>
```

### Animated Expander

```xml
<treeView:SfTreeView.ExpanderTemplate>
    <DataTemplate>
        <Grid>
            <FontIcon x:Name="ExpanderIcon" 
                      Glyph="&#xE76C;"
                      FontSize="12"
                      RenderTransformOrigin="0.5,0.5">
                <FontIcon.RenderTransform>
                    <RotateTransform x:Name="RotateTransform" Angle="0" />
                </FontIcon.RenderTransform>
            </FontIcon>
            
            <VisualStateManager.VisualStateGroups>
                <VisualStateGroup x:Name="ExpansionStates">
                    <VisualState x:Name="Expanded">
                        <Storyboard>
                            <DoubleAnimation Storyboard.TargetName="RotateTransform"
                                           Storyboard.TargetProperty="Angle"
                                           To="90"
                                           Duration="0:0:0.2" />
                        </Storyboard>
                    </VisualState>
                    <VisualState x:Name="Collapsed">
                        <Storyboard>
                            <DoubleAnimation Storyboard.TargetName="RotateTransform"
                                           Storyboard.TargetProperty="Angle"
                                           To="0"
                                           Duration="0:0:0.2" />
                        </Storyboard>
                    </VisualState>
                </VisualStateGroup>
            </VisualStateManager.VisualStateGroups>
        </Grid>
    </DataTemplate>
</treeView:SfTreeView.ExpanderTemplate>
```

## Item Height Customization

### Fixed Item Height

```xml
<treeView:SfTreeView ItemHeight="40" />
```

```csharp
treeView.ItemHeight = 40;
```

### Dynamic Item Height with QueryNodeSize

```csharp
treeView.QueryNodeSize += OnQueryNodeSize;

private void OnQueryNodeSize(object sender, QueryNodeSizeEventArgs e)
{
    var node = e.Node;
    var item = node.Content as FileNode;
    
    // Different heights based on node type
    if (item.IsFolder)
    {
        e.Height = 48;  // Taller for folders
    }
    else if (item.HasDescription)
    {
        e.Height = 64;  // Taller for items with descriptions
    }
    else
    {
        e.Height = 32;  // Normal height
    }
    
    e.Handled = true;
}
```

### Auto-Size Based on Content

```csharp
treeView.QueryNodeSize += OnQueryNodeSize;

private void OnQueryNodeSize(object sender, QueryNodeSizeEventArgs e)
{
    var node = e.Node;
    var item = node.Content as FileNode;
    
    // Calculate height based on text length
    var textLength = item.Description?.Length ?? 0;
    var lines = Math.Ceiling(textLength / 50.0);  // ~50 chars per line
    
    e.Height = 20 + (lines * 16);  // Base height + line height
    e.Handled = true;
}
```

## TreeLines

Show visual lines connecting parent and child nodes.

### Enable Tree Lines

```xml
<treeView:SfTreeView ShowLines="True" 
                      LineStroke="LightGray"
                      LineStrokeThickness="1" />
```

```csharp
treeView.ShowLines = true;
treeView.LineStroke = new SolidColorBrush(Colors.LightGray);
treeView.LineStrokeThickness = 1;
```

### Custom Line Style

```xml
<treeView:SfTreeView ShowLines="True" 
                      LineStroke="#CCCCCC"
                      LineStrokeThickness="2" />
```

## Styling

### Indentation

```xml
<treeView:SfTreeView Indentation="24" />
```

```csharp
treeView.Indentation = 24;
```

### Expander Width

```xml
<treeView:SfTreeView ExpanderWidth="32" />
```

### Full Row Select

```xml
<treeView:SfTreeView FullRowSelect="True" />
```

When `true`, entire row is clickable for selection. When `false`, only content area is clickable.

### Selection Colors

```xml
<treeView:SfTreeView SelectionBackgroundColor="#2196F3"
                      SelectionForegroundColor="White" />
```

### Focus Border

```xml
<treeView:SfTreeView FocusBorderColor="Orange"
                      FocusBorderThickness="2" />
```

### Background and Borders

```xml
<treeView:SfTreeView Background="White"
                      BorderBrush="LightGray"
                      BorderThickness="1" />
```

## Theming

### System Theme Integration

TreeView automatically adapts to system Light/Dark themes.

```csharp
// Request specific theme
this.RequestedTheme = ElementTheme.Dark;
```

### Custom Theme Colors

```xml
<treeView:SfTreeView>
    <treeView:SfTreeView.Resources>
        <SolidColorBrush x:Key="TreeViewItemBackground" Color="White" />
        <SolidColorBrush x:Key="TreeViewItemBackgroundPointerOver" Color="#F0F0F0" />
        <SolidColorBrush x:Key="TreeViewItemBackgroundPressed" Color="#E0E0E0" />
        <SolidColorBrush x:Key="TreeViewItemBackgroundSelected" Color="#2196F3" />
        <SolidColorBrush x:Key="TreeViewItemForeground" Color="Black" />
        <SolidColorBrush x:Key="TreeViewItemForegroundSelected" Color="White" />
    </treeView:SfTreeView.Resources>
</treeView:SfTreeView>
```

## Common Scenarios

### Scenario 1: File Explorer Style

```xml
<treeView:SfTreeView ShowLines="False"
                      Indentation="20"
                      FullRowSelect="True"
                      SelectionBackgroundColor="#E5F3FF">
    <treeView:SfTreeView.ItemTemplate>
        <DataTemplate>
            <Grid Height="32">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="Auto" />
                    <ColumnDefinition Width="*" />
                    <ColumnDefinition Width="Auto" />
                </Grid.ColumnDefinitions>
                
                <!-- Icon -->
                <Image Grid.Column="0" 
                       Source="{Binding Icon}"
                       Width="16"
                       Height="16"
                       Margin="0,0,8,0" />
                
                <!-- Name -->
                <TextBlock Grid.Column="1"
                           Text="{Binding Name}"
                           VerticalAlignment="Center" />
                
                <!-- Size/Count -->
                <TextBlock Grid.Column="2"
                           Text="{Binding SizeOrCount}"
                           Opacity="0.6"
                           FontSize="12"
                           VerticalAlignment="Center" />
            </Grid>
        </DataTemplate>
    </treeView:SfTreeView.ItemTemplate>
</treeView:SfTreeView>
```

### Scenario 2: Modern Card Style

```xml
<treeView:SfTreeView Indentation="32" 
                      ItemHeight="72">
    <treeView:SfTreeView.ItemTemplate>
        <DataTemplate>
            <Grid Background="White"
                  BorderBrush="LightGray"
                  BorderThickness="1"
                  CornerRadius="4"
                  Margin="4"
                  Padding="12">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="48" />
                    <ColumnDefinition Width="*" />
                </Grid.ColumnDefinitions>
                
                <!-- Avatar/Icon -->
                <Ellipse Grid.Column="0"
                         Width="48"
                         Height="48"
                         Fill="#2196F3" />
                
                <!-- Content -->
                <StackPanel Grid.Column="1" 
                            Margin="12,0,0,0"
                            VerticalAlignment="Center">
                    <TextBlock Text="{Binding Name}" 
                               FontWeight="SemiBold"
                               FontSize="14" />
                    <TextBlock Text="{Binding Description}"
                               FontSize="12"
                               Opacity="0.7"
                               TextTrimming="CharacterEllipsis" />
                </StackPanel>
            </Grid>
        </DataTemplate>
    </treeView:SfTreeView.ItemTemplate>
</treeView:SfTreeView>
```

### Scenario 3: Compact List

```xml
<treeView:SfTreeView ItemHeight="24"
                      Indentation="16"
                      ExpanderWidth="16">
    <treeView:SfTreeView.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Name}"
                       FontSize="12"
                       VerticalAlignment="Center" />
        </DataTemplate>
    </treeView:SfTreeView.ItemTemplate>
</treeView:SfTreeView>
```

### Scenario 4: Rich Visual Nodes

```xml
<treeView:SfTreeView.ItemTemplate>
    <DataTemplate>
        <Grid Margin="4" Padding="8">
            <Grid.RowDefinitions>
                <RowDefinition Height="Auto" />
                <RowDefinition Height="Auto" />
            </Grid.RowDefinitions>
            
            <!-- Title row with badge -->
            <StackPanel Grid.Row="0" 
                        Orientation="Horizontal" 
                        Spacing="8">
                <TextBlock Text="{Binding Name}"
                           FontWeight="SemiBold" />
                
                <Border Background="#FF4081"
                        CornerRadius="4"
                        Padding="4,2"
                        Visibility="{Binding IsNew, Converter={StaticResource BoolToVisibility}}">
                    <TextBlock Text="NEW" 
                               Foreground="White"
                               FontSize="10" />
                </Border>
            </StackPanel>
            
            <!-- Details row -->
            <StackPanel Grid.Row="1" 
                        Orientation="Horizontal"
                        Spacing="12"
                        Margin="0,4,0,0">
                <TextBlock Text="{Binding Modified, StringFormat='Modified: {0:d}'}"
                           FontSize="10"
                           Opacity="0.6" />
                <TextBlock Text="{Binding Size, StringFormat='{0} KB'}"
                           FontSize="10"
                           Opacity="0.6" />
            </StackPanel>
        </Grid>
    </DataTemplate>
</treeView:SfTreeView.ItemTemplate>
```

## Best Practices

1. **Keep ItemTemplate simple** for better performance
2. **Use ItemTemplateSelector** for varying node types
3. **Set appropriate ItemHeight** for content
4. **Use QueryNodeSize** for dynamic heights
5. **Enable TreeLines** for clarity in deep hierarchies
6. **Match system theme** for consistency
7. **Test both Light and Dark themes**
8. **Provide adequate spacing** (Indentation)
9. **Use icons** to differentiate node types
10. **Ensure touch targets** are at least 44x44px

## Next Steps

- **Interactivity** - Add event handlers
- **MVVM** - Bind templates to ViewModel properties
- **Performance** - Optimize templates for large trees
