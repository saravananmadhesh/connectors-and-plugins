# Header and UI Customization in WinUI DropDown Color Picker

> **Important:** Ensure the `Syncfusion.Editors.WinUI` NuGet package is updated to the latest version for full template customization support.

## Table of Contents
- [Overview](#overview)
- [ContentTemplate](#contenttemplate)
- [DropDownButtonTemplate](#dropdownbuttontemplate)
- [Split Mode Custom UI](#split-mode-custom-ui)
- [DataContext in Templates](#datacontext-in-templates)
- [Complete Examples](#complete-examples)

## Overview

The appearance of the DropDown Color Picker header can be fully customized using templates:

- **ContentTemplate**: Customizes the selected color button display
- **DropDownButtonTemplate**: Customizes the dropdown arrow button (split mode only)

These templates allow you to create custom visual representations of the color picker's header area.

## ContentTemplate

### Purpose

The `ContentTemplate` defines the visual representation of the selected color button. It displays whatever UI you want instead of the default colored square.

### Basic Example

```xaml
<editors:SfDropDownColorPicker x:Name="colorPicker"
                               SelectedBrush="Blue">
    <editors:SfDropDownColorPicker.ContentTemplate>
        <DataTemplate>
            <Border Background="{Binding}"
                    Width="40"
                    Height="40"
                    CornerRadius="4" />
        </DataTemplate>
    </editors:SfDropDownColorPicker.ContentTemplate>
</editors:SfDropDownColorPicker>
```

### What is "{Binding}"?

The `{Binding}` in the template refers to the `SelectedBrush` property of the `SfDropDownColorPicker`.

**Data Flow:**
```
SfDropDownColorPicker.SelectedBrush 
  ↓ (DataContext of template)
{Binding}
  ↓ (binds to)
Background property
```

### Common ContentTemplate Patterns

**Pattern 1: Simple Colored Rectangle**

```xaml
<editors:SfDropDownColorPicker.ContentTemplate>
    <DataTemplate>
        <Rectangle Width="50" 
                   Height="30"
                   Fill="{Binding}"
                   Stroke="Black"
                   StrokeThickness="1"
                   RadiusX="2"
                   RadiusY="2" />
    </DataTemplate>
</editors:SfDropDownColorPicker.ContentTemplate>
```

**Pattern 2: Colored Circle with Text**

```xaml
<editors:SfDropDownColorPicker.ContentTemplate>
    <DataTemplate>
        <StackPanel Orientation="Horizontal" Spacing="8">
            <Ellipse Fill="{Binding}"
                     Width="30"
                     Height="30" />
            <TextBlock Text="Color"
                       VerticalAlignment="Center"
                       Foreground="Gray" />
        </StackPanel>
    </DataTemplate>
</editors:SfDropDownColorPicker.ContentTemplate>
```

**Pattern 3: Complex Custom UI**

```xaml
<editors:SfDropDownColorPicker.ContentTemplate>
    <DataTemplate>
        <Grid Width="100" Height="40" Background="White">
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="40" />
                <ColumnDefinition Width="*" />
            </Grid.ColumnDefinitions>
            
            <!-- Color swatch -->
            <Border Background="{Binding}"
                    BorderThickness="1"
                    BorderBrush="Gray"
                    Margin="2" />
            
            <!-- Color info -->
            <StackPanel Grid.Column="1" 
                       VerticalAlignment="Center"
                       Padding="8,0">
                <TextBlock Text="Selected" FontSize="10" Foreground="Gray" />
                <TextBlock x:Name="colorCode" 
                          FontSize="10"
                          FontWeight="Bold" />
            </StackPanel>
        </Grid>
    </DataTemplate>
</editors:SfDropDownColorPicker.ContentTemplate>
```

## DropDownButtonTemplate

### Purpose

The `DropDownButtonTemplate` customizes the dropdown arrow button appearance. This is only visible when `DropDownMode="Split"`.

### Important Note

The `DropDownButtonTemplate` is **only effective in Split mode**:

```xaml
<editors:SfDropDownColorPicker DropDownMode="Split"
                               x:Name="colorPicker">
    <editors:SfDropDownColorPicker.DropDownButtonTemplate>
        <!-- Template here -->
    </editors:SfDropDownColorPicker.DropDownButtonTemplate>
</editors:SfDropDownColorPicker>
```

### Basic Example

```xaml
<editors:SfDropDownColorPicker DropDownMode="Split"
                               x:Name="colorPicker">
    <editors:SfDropDownColorPicker.DropDownButtonTemplate>
        <DataTemplate>
            <Grid Width="30" Height="40" Background="LightGray">
                <Path Fill="Black" 
                      Data="M 0 0 L 5 5 L 10 0 Z"
                      Stretch="Uniform"
                      Width="8"
                      Height="6"
                      HorizontalAlignment="Center"
                      VerticalAlignment="Center" />
            </Grid>
        </DataTemplate>
    </editors:SfDropDownColorPicker.DropDownButtonTemplate>
</editors:SfDropDownColorPicker>
```

### DropDownButtonTemplate Patterns

**Pattern 1: Stylized Dropdown Arrow**

```xaml
<editors:SfDropDownColorPicker.DropDownButtonTemplate>
    <DataTemplate>
        <Grid Background="Transparent">
            <Path Data="M 0 0 L 5 5 L 10 0 Z"
                  Fill="DarkGray"
                  Stretch="Uniform"
                  Width="12"
                  Height="8" />
        </Grid>
    </DataTemplate>
</editors:SfDropDownColorPicker.DropDownButtonTemplate>
```

**Pattern 2: Custom Icon**

```xaml
<editors:SfDropDownColorPicker.DropDownButtonTemplate>
    <DataTemplate>
        <Grid Background="White" BorderThickness="1" BorderBrush="LightGray">
            <!-- Palette icon SVG path -->
            <Path Data="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M13,17H11V15H13V17M13,13H11V7H13V13Z"
                  Stretch="Uniform"
                  Fill="Black"
                  Width="18"
                  Height="18" />
        </Grid>
    </DataTemplate>
</editors:SfDropDownColorPicker.DropDownButtonTemplate>
```

**Pattern 3: Interactive Hover Effect**

```xaml
<editors:SfDropDownColorPicker.DropDownButtonTemplate>
    <DataTemplate>
        <Grid Background="Transparent"
              PointerEntered="OnButtonHover">
            <VisualStateManager.VisualStateGroups>
                <VisualStateGroup x:Name="CommonStates">
                    <VisualState x:Name="Normal" />
                    <VisualState x:Name="PointerOver">
                        <Storyboard>
                            <ColorAnimation Storyboard.TargetName="bg"
                                          Storyboard.TargetProperty="Background.Color"
                                          To="LightBlue"
                                          Duration="0:0:0.2" />
                        </Storyboard>
                    </VisualState>
                </VisualStateGroup>
            </VisualStateManager.VisualStateGroups>
            
            <Border x:Name="bg" Background="White">
                <TextBlock Text="▼" FontSize="14" HorizontalAlignment="Center" VerticalAlignment="Center" />
            </Border>
        </Grid>
    </DataTemplate>
</editors:SfDropDownColorPicker.DropDownButtonTemplate>
```

## Split Mode Custom UI

### Full Split Mode Example

In split mode, you customize both the button and dropdown button:

```xaml
<editors:SfDropDownColorPicker DropDownMode="Split"
                               x:Name="colorPicker"
                               SelectedBrush="Blue"
                               Command="{x:Bind ApplyColorCommand}">
    
    <!-- Custom selected color display -->
    <editors:SfDropDownColorPicker.ContentTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="8" Padding="8">
                <Border Background="{Binding}"
                        Width="28"
                        Height="28"
                        BorderThickness="2"
                        BorderBrush="DarkGray"
                        CornerRadius="4" />
                <TextBlock Text="Apply Color"
                          VerticalAlignment="Center"
                          FontSize="12" />
            </StackPanel>
        </DataTemplate>
    </editors:SfDropDownColorPicker.ContentTemplate>
    
    <!-- Custom dropdown arrow button -->
    <editors:SfDropDownColorPicker.DropDownButtonTemplate>
        <DataTemplate>
            <Grid Background="White" BorderThickness="0,0,1,0" BorderBrush="LightGray">
                <Path Data="M 0 0 L 4 4 L 8 0 Z"
                      Fill="DarkGray"
                      Stretch="Uniform"
                      Width="10"
                      Height="8" />
            </Grid>
        </DataTemplate>
    </editors:SfDropDownColorPicker.DropDownButtonTemplate>
    
</editors:SfDropDownColorPicker>
```

### Visual Layout in Split Mode

```
+------ Button (ContentTemplate) ------+---- Dropdown Button (DropDownButtonTemplate) ----+
|  [Color Swatch]  Apply Color        |              ▼                                   |
+--------------------------------------+---------------------------------------------+
         Triggers Command                        Opens Dropdown
```

## DataContext in Templates

### Understanding DataContext

Both templates have a special `DataContext`:

- **ContentTemplate DataContext**: The `SelectedBrush` property
- **DropDownButtonTemplate DataContext**: The entire `SfDropDownColorPicker` control

### Binding to SelectedBrush

In `ContentTemplate`, use `{Binding}` directly since `DataContext` is the brush:

```xaml
<editors:SfDropDownColorPicker.ContentTemplate>
    <DataTemplate>
        <!-- {Binding} = SelectedBrush -->
        <Border Background="{Binding}" />
    </DataTemplate>
</editors:SfDropDownColorPicker.ContentTemplate>
```

### Accessing Control Properties

In `DropDownButtonTemplate`, bind to control properties:

```xaml
<editors:SfDropDownColorPicker.DropDownButtonTemplate>
    <DataTemplate>
        <!-- {Binding} = the entire SfDropDownColorPicker -->
        <TextBlock Text="{Binding Name}" />
    </DataTemplate>
</editors:SfDropDownColorPicker.DropDownButtonTemplate>
```

## Complete Examples

### Example 1: Theme Color Picker with Visual Feedback

```xaml
<Page xmlns:editors="using:Syncfusion.UI.Xaml.Editors">
    <StackPanel Padding="20" Spacing="15">
        <TextBlock Text="Theme Color Selector" FontSize="20" FontWeight="Bold" />
        
        <editors:SfDropDownColorPicker x:Name="themeColorPicker"
                                       SelectedBrush="CornflowerBlue"
                                       Width="200"
                                       Height="50">
            
            <!-- Visual color swatch with icon -->
            <editors:SfDropDownColorPicker.ContentTemplate>
                <DataTemplate>
                    <Grid Background="White" BorderThickness="1" BorderBrush="DarkGray">
                        <StackPanel Orientation="Horizontal" Spacing="10" Padding="8">
                            <!-- Color preview -->
                            <Ellipse Fill="{Binding}"
                                    Width="32"
                                    Height="32"
                                    Stroke="Black"
                                    StrokeThickness="2" />
                            
                            <!-- Label -->
                            <TextBlock Text="Theme Color"
                                      VerticalAlignment="Center"
                                      FontWeight="SemiBold" />
                        </StackPanel>
                    </Grid>
                </DataTemplate>
            </editors:SfDropDownColorPicker.ContentTemplate>
            
        </editors:SfDropDownColorPicker>
        
        <!-- Color preview area -->
        <Border x:Name="previewArea"
                Background="{x:Bind themeColorPicker.SelectedBrush, Mode=OneWay}"
                Width="300"
                Height="150"
                CornerRadius="8" />
    </StackPanel>
</Page>
```

### Example 2: Rich Text Editor with Custom Color Button

```xaml
<Page xmlns:editors="using:Syncfusion.UI.Xaml.Editors">
    <Grid>
        <StackPanel>
            <!-- Toolbar -->
            <StackPanel Orientation="Horizontal" Padding="10" Spacing="8" Background="LightGray">
                <TextBlock Text="Text Color:" VerticalAlignment="Center" />
                
                <editors:SfDropDownColorPicker DropDownMode="Split"
                                               x:Name="textColorPicker"
                                               SelectedBrush="Black"
                                               Command="{x:Bind ApplyTextColorCommand}">
                    
                    <!-- Button shows current color -->
                    <editors:SfDropDownColorPicker.ContentTemplate>
                        <DataTemplate>
                            <StackPanel Orientation="Horizontal" Spacing="4" Padding="6">
                                <Border Background="{Binding}"
                                       Width="24"
                                       Height="24"
                                       BorderThickness="1"
                                       BorderBrush="Black"
                                       CornerRadius="2" />
                                <TextBlock Text="Apply"
                                          VerticalAlignment="Center"
                                          FontSize="12" />
                            </StackPanel>
                        </DataTemplate>
                    </editors:SfDropDownColorPicker.ContentTemplate>
                    
                    <!-- Dropdown arrow -->
                    <editors:SfDropDownColorPicker.DropDownButtonTemplate>
                        <DataTemplate>
                            <Grid Background="Transparent" Padding="4">
                                <TextBlock Text="▼"
                                          FontSize="10"
                                          Foreground="Black" />
                            </Grid>
                        </DataTemplate>
                    </editors:SfDropDownColorPicker.DropDownButtonTemplate>
                    
                </editors:SfDropDownColorPicker>
            </StackPanel>
            
            <!-- Text editor -->
            <RichEditBox x:Name="editor" 
                        Height="400"
                        Padding="10"
                        FontSize="14" />
        </StackPanel>
    </Grid>
</Page>
```

```csharp
public sealed partial class RichTextEditorPage : Page
{
    public ICommand ApplyTextColorCommand { get; }
    
    public RichTextEditorPage()
    {
        this.InitializeComponent();
        
        ApplyTextColorCommand = new RelayCommand(() =>
        {
            if (editor.Document?.Selection != null)
            {
                var brush = textColorPicker.SelectedBrush as SolidColorBrush;
                if (brush != null)
                {
                    editor.Document.Selection.CharacterFormat.ForegroundColor = brush.Color;
                }
            }
        });
    }
}
```

### Example 3: Paint Application Color Picker

```xaml
<Page xmlns:editors="using:Syncfusion.UI.Xaml.Editors">
    <Grid Background="White">
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="100" />
            <ColumnDefinition Width="*" />
        </Grid.ColumnDefinitions>
        
        <!-- Toolbar -->
        <StackPanel Grid.Column="0" Padding="10" Spacing="15" Background="#F0F0F0">
            
            <!-- Brush Color -->
            <StackPanel Spacing="5">
                <TextBlock Text="Brush Color" FontSize="12" FontWeight="Bold" />
                <editors:SfDropDownColorPicker x:Name="brushColorPicker"
                                               SelectedBrush="Black"
                                               Width="80"
                                               Height="60">
                    <editors:SfDropDownColorPicker.ContentTemplate>
                        <DataTemplate>
                            <Border Background="{Binding}"
                                   BorderThickness="2"
                                   BorderBrush="Black" />
                        </DataTemplate>
                    </editors:SfDropDownColorPicker.ContentTemplate>
                </editors:SfDropDownColorPicker>
            </StackPanel>
            
            <!-- Background Color -->
            <StackPanel Spacing="5">
                <TextBlock Text="BG Color" FontSize="12" FontWeight="Bold" />
                <editors:SfDropDownColorPicker x:Name="bgColorPicker"
                                               SelectedBrush="White"
                                               Width="80"
                                               Height="60">
                    <editors:SfDropDownColorPicker.ContentTemplate>
                        <DataTemplate>
                            <Border Background="{Binding}"
                                   BorderThickness="2"
                                   BorderBrush="Black" />
                        </DataTemplate>
                    </editors:SfDropDownColorPicker.ContentTemplate>
                </editors:SfDropDownColorPicker>
            </StackPanel>
            
        </StackPanel>
        
        <!-- Canvas -->
        <Canvas Grid.Column="1"
               Background="{x:Bind bgColorPicker.SelectedBrush, Mode=OneWay}"
               x:Name="drawingCanvas" />
        
    </Grid>
</Page>
```

### Example 4: Gradient Swatch Display

```xaml
<editors:SfDropDownColorPicker x:Name="colorPicker" SelectedBrush="Blue">
    <editors:SfDropDownColorPicker.ContentTemplate>
        <DataTemplate>
            <Border Width="60" Height="40" CornerRadius="4" Padding="1">
                <Grid>
                    <!-- Gradient background showing selected color -->
                    <Rectangle>
                        <Rectangle.Fill>
                            <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
                                <GradientStop Color="White" Offset="0" />
                                <GradientStop Color="{Binding Color, 
                                    Converter={StaticResource BrushToColorConverter}}"
                                            Offset="0.5" />
                                <GradientStop Color="Black" Offset="1" />
                            </LinearGradientBrush>
                        </Rectangle.Fill>
                    </Rectangle>
                    
                    <!-- Border effect -->
                    <Border BorderThickness="1" BorderBrush="DarkGray" />
                </Grid>
            </Border>
        </DataTemplate>
    </editors:SfDropDownColorPicker.ContentTemplate>
</editors:SfDropDownColorPicker>
```

## Tips for Custom Templates

1. **Keep it Simple**: Complex templates can impact performance
2. **Test Binding**: Ensure `{Binding}` references correct property
3. **Size Consistently**: Match template size to control layout
4. **Accessibility**: Include text alternatives to visual elements
5. **Responsive Design**: Consider different screen sizes
6. **Touch Friendly**: Make buttons large enough (minimum 40x40)
