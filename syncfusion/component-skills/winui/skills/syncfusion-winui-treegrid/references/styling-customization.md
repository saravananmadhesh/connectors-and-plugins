# Styling and Customization in WinUI TreeGrid

## Table of Contents
- [Conditional Styling](#conditional-styling)
- [GridLines Customization](#gridlines-customization)
- [UI Customization](#ui-customization)
- [Theme Integration](#theme-integration)

## Conditional Styling

Apply styles dynamically based on data values.

### Cell Styling using StyleSelector

You can customize cell appearance by using `SfTreeGrid.CellStyleSelector`.

```xaml
<Application.Resources>
    <local:CustomCellStyleSelector x:Key="cellStyleSelector"/>

    <Style x:Key="HighStyle" TargetType="treeGrid:TreeGridCell">
        <Setter Property="Background" Value="LightGreen"/>
    </Style>

    <Style x:Key="LowStyle" TargetType="treeGrid:TreeGridCell">
        <Setter Property="Background" Value="LightGray"/>
    </Style>
</Application.Resources>

<treeGrid:SfTreeGrid
    CellStyleSelector="{StaticResource cellStyleSelector}" />
```

```csharp
public class CustomCellStyleSelector : StyleSelector
{
    public override Style SelectStyle(object item, DependencyObject container)
    {
        var cell = container as TreeGridCell;
        var node = cell?.DataContext as TreeNode;
        var data = node?.Item as Employee;

        if (data == null) return null;

        if (data.Salary > 100000)
            return Application.Current.Resources["HighStyle"] as Style;

        return Application.Current.Resources["LowStyle"] as Style;
    }
}
```


## GridLines Customization

Control the visibility and appearance of grid lines.

### GridLinesVisibility Property

```csharp
sfTreeGrid.GridLinesVisibility = GridLinesVisibility.Both;
```

| Option | Description |
|--------|-------------|
| **None** | No grid lines |
| **Horizontal** | Only horizontal lines |
| **Vertical** | Only vertical lines |
| **Both** (default) | Both horizontal and vertical |

```xaml
<!-- No grid lines -->
<treeGrid:SfTreeGrid GridLinesVisibility="None" />

<!-- Only horizontal lines -->
<treeGrid:SfTreeGrid GridLinesVisibility="Horizontal" />

<!-- Only vertical lines -->
<treeGrid:SfTreeGrid GridLinesVisibility="Vertical" />

<!-- Both (default) -->
<treeGrid:SfTreeGrid GridLinesVisibility="Both" />
```

### Header Lines Visibility

```csharp
sfTreeGrid.HeaderLinesVisibility = GridLinesVisibility.Both;
```

### Customize Grid Line Color

```xaml
<treeGrid:SfTreeGrid>
    <treeGrid:SfTreeGrid.Resources>
        <SolidColorBrush x:Key="SyncfusionTreeGridGridLineBrush" 
                        Color="LightGray" />
    </treeGrid:SfTreeGrid.Resources>
</treeGrid:SfTreeGrid>
```

### Grid Line Thickness

```xaml
<treeGrid:SfTreeGrid GridLineStrokeThickness="2" />
```

## UI Customization

### Row Header

Show/hide row headers:

```xaml
<treeGrid:SfTreeGrid ShowRowHeader="True" 
                    RowHeaderWidth="30" />
```

```csharp
sfTreeGrid.ShowRowHeader = true;
sfTreeGrid.RowHeaderWidth = 30;
```

### Customize Expander Icon

```xaml
<treeGrid:SfTreeGrid>
    <treeGrid:SfTreeGrid.Resources>
        <!-- Expanded icon -->
        <DataTemplate x:Key="ExpandedTemplate">
            <Path Data="M0,0 L4,4 L8,0 Z" 
                  Fill="Black" />
        </DataTemplate>
        
        <!-- Collapsed icon -->
        <DataTemplate x:Key="CollapsedTemplate">
            <Path Data="M0,0 L4,4 L0,8 Z" 
                  Fill="Black" />
        </DataTemplate>
    </treeGrid:SfTreeGrid.Resources>
</treeGrid:SfTreeGrid>
```

### Cell Padding

```xaml
<treeGrid:TreeGridTextColumn MappingName="FirstName">
    <treeGrid:TreeGridTextColumn.CellStyle>
        <Style TargetType="treeGrid:TreeGridCell">
            <Setter Property="Padding" Value="10,5" />
        </Style>
    </treeGrid:TreeGridTextColumn.CellStyle>
</treeGrid:TreeGridTextColumn>
```

### Selection Background

```xaml
<treeGrid:SfTreeGrid>
    <treeGrid:SfTreeGrid.Resources>
        <SolidColorBrush x:Key="SyncfusionTreeGridSelectionBackgroundBrush" 
                        Color="#FF4A90E2" />
        <SolidColorBrush x:Key="SyncfusionTreeGridSelectionForegroundBrush" 
                        Color="White" />
    </treeGrid:SfTreeGrid.Resources>
</treeGrid:SfTreeGrid>
```

### Current Cell Border

```xaml
<treeGrid:SfTreeGrid>
    <treeGrid:SfTreeGrid.Resources>
        <SolidColorBrush x:Key="SyncfusionTreeGridCurrentCellBorderBrush" 
                        Color="Blue" />
    </treeGrid:SfTreeGrid.Resources>
</treeGrid:SfTreeGrid>
```

### Custom Cell Template

Apply custom templates to entire columns:

```xaml
<treeGrid:TreeGridTemplateColumn MappingName="Status" 
                                HeaderText="Status">
    <treeGrid:TreeGridTemplateColumn.CellTemplate>
        <DataTemplate>
            <Border Background="{Binding Status, Converter={StaticResource StatusToBrushConverter}}"
                    CornerRadius="12"
                    Padding="8,4"
                    HorizontalAlignment="Center">
                <TextBlock Text="{Binding Status}" 
                          Foreground="White"
                          FontSize="12" />
            </Border>
        </DataTemplate>
    </treeGrid:TreeGridTemplateColumn.CellTemplate>
</treeGrid:TreeGridTemplateColumn>
```

### Header Template Customization

```xaml
<treeGrid:TreeGridTextColumn MappingName="Salary" 
                            HeaderText="Annual Salary">
    <treeGrid:TreeGridTextColumn.HeaderTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <SymbolIcon Symbol="Money" Margin="0,0,5,0" />
                <TextBlock Text="Annual Salary" 
                          FontWeight="Bold" 
                          VerticalAlignment="Center" />
            </StackPanel>
        </DataTemplate>
    </treeGrid:TreeGridTextColumn.HeaderTemplate>
</treeGrid:TreeGridTextColumn>
```

## Theme Integration

### Light and Dark Theme Support

TreeGrid automatically adapts to Windows theme:

```csharp
// TreeGrid respects system theme by default
// No additional code needed for basic theme support
```

### Custom Theme Resources

Override theme brushes:

```xaml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.ThemeDictionaries>
            <!-- Light Theme -->
            <ResourceDictionary x:Key="Light">
                <SolidColorBrush x:Key="TreeGridBackground" Color="White" />
                <SolidColorBrush x:Key="TreeGridForeground" Color="Black" />
                <SolidColorBrush x:Key="TreeGridHeaderBackground" Color="#F0F0F0" />
            </ResourceDictionary>
            
            <!-- Dark Theme -->
            <ResourceDictionary x:Key="Dark">
                <SolidColorBrush x:Key="TreeGridBackground" Color="#1E1E1E" />
                <SolidColorBrush x:Key="TreeGridForeground" Color="White" />
                <SolidColorBrush x:Key="TreeGridHeaderBackground" Color="#2D2D2D" />
            </ResourceDictionary>
        </ResourceDictionary.ThemeDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

### Syncfusion Theme Studio

Use Syncfusion Theme Studio for advanced customization:

1. Download Theme Studio from Syncfusion website
2. Customize colors and styles visually
3. Export generated XAML resource dictionary
4. Include in your application

```xaml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <ResourceDictionary Source="/Themes/CustomTheme.xaml" />
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

## Troubleshooting

**Styles not applying:**
- Set `e.Handled = true` in style events
- Check event is subscribed correctly
- Verify style properties are valid

**Grid lines not visible:**
- Check `GridLinesVisibility` property
- Verify grid line brush color contrasts with background
- Ensure `GridLineStrokeThickness` is > 0

**Theme not switching:**
- Verify theme resources are defined in `ThemeDictionaries`
- Check resource keys match Syncfusion theme keys
- Restart application after theme change

**Performance issues with styling:**
- Cache brushes instead of creating new ones
- Use `InvalidateCells()` sparingly
