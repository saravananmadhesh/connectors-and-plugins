# Leaf Node Customization

This guide covers customizing the appearance and content of leaf nodes (the actual data rectangles) in TreeMap.

## LeafItemSettings Overview

The `LeafItemSettings` property provides options to customize leaf node borders and labels.

**Basic usage:**
```xaml
<syncfusion:SfTreeMap ItemsSource="{Binding Data}" 
                      WeightValuePath="Value">
    <syncfusion:SfTreeMap.LeafItemSettings>
        <syncfusion:LeafItemSettings BorderBrush="White" 
                                     BorderThickness="2"
                                     LabelPath="Name"/>
    </syncfusion:SfTreeMap.LeafItemSettings>
</syncfusion:SfTreeMap>
```

## BorderBrush

Sets the border color for all leaf nodes.

**Usage:**
```xaml
<syncfusion:LeafItemSettings BorderBrush="White"/>
```

**Example with Dark Background:**
```xaml
<Grid Background="Black">
    <syncfusion:SfTreeMap ItemsSource="{Binding PopulationDetails}"
                          WeightValuePath="Population">
        <syncfusion:SfTreeMap.LeafItemSettings>
            <syncfusion:LeafItemSettings BorderBrush="White" 
                                         BorderThickness="1"/>
        </syncfusion:SfTreeMap.LeafItemSettings>
    </syncfusion:SfTreeMap>
</Grid>
```

## BorderThickness

Sets the border width for leaf nodes.

**Values:**
- `0` - No border
- `1` - Thin border (most common)
- `2-3` - Medium border
- `4+` - Thick border (can consume significant space)

**Usage:**
```xaml
<syncfusion:LeafItemSettings BorderBrush="#CCCCCC" 
                             BorderThickness="2"/>
```

**Asymmetric borders:**
```xaml
<syncfusion:LeafItemSettings BorderBrush="Gray" 
                             BorderThickness="1,2,1,2"/>
<!-- Left, Top, Right, Bottom -->
```

## LabelPath

Specifies which property to display as text on leaf nodes.

**Requirements:**
- Property name (case-sensitive)
- Property should contain display-friendly text
- Labels automatically positioned in center of rectangle

**Example:**
```csharp
public class CountryData
{
    public string CountryName { get; set; }   // ← Use for LabelPath
    public double Population { get; set; }
}
```

```xaml
<syncfusion:SfTreeMap ItemsSource="{Binding Countries}"
                      WeightValuePath="Population">
    <syncfusion:SfTreeMap.LeafItemSettings>
        <syncfusion:LeafItemSettings LabelPath="CountryName"
                                     BorderBrush="White"
                                     BorderThickness="1"/>
    </syncfusion:SfTreeMap.LeafItemSettings>
</syncfusion:SfTreeMap>
```

## LabelTemplate

For advanced customization, use `LabelTemplate` to define custom UI for each leaf node.

### Basic LabelTemplate

```xaml
<syncfusion:SfTreeMap ItemsSource="{Binding Products}"
                      WeightValuePath="Sales">
    <syncfusion:SfTreeMap.LeafItemSettings>
        <syncfusion:LeafItemSettings>
            <syncfusion:LeafItemSettings.LabelTemplate>
                <DataTemplate>
                    <Border BorderBrush="White" 
                            BorderThickness="1" 
                            Background="Transparent">
                        <TextBlock Text="{Binding Name}" 
                                  Foreground="White"
                                  HorizontalAlignment="Center"
                                  VerticalAlignment="Center"/>
                    </Border>
                </DataTemplate>
            </syncfusion:LeafItemSettings.LabelTemplate>
        </syncfusion:LeafItemSettings>
    </syncfusion:SfTreeMap.LeafItemSettings>
</syncfusion:SfTreeMap>
```

### Advanced LabelTemplate with Multiple Elements

```xaml
<syncfusion:LeafItemSettings>
    <syncfusion:LeafItemSettings.LabelTemplate>
        <DataTemplate>
            <Grid>
                <Grid.RowDefinitions>
                    <RowDefinition Height="Auto"/>
                    <RowDefinition Height="*"/>
                    <RowDefinition Height="Auto"/>
                </Grid.RowDefinitions>
                
                <!-- Product Name -->
                <TextBlock Grid.Row="0" 
                          Text="{Binding ProductName}" 
                          FontWeight="Bold"
                          FontSize="14"
                          Foreground="White"
                          Margin="5"
                          HorizontalAlignment="Center"/>
                
                <!-- Icon or Image (optional) -->
                <Viewbox Grid.Row="1" 
                        Width="32" Height="32"
                        Margin="5">
                    <Path Data="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z" 
                          Fill="White" 
                          Opacity="0.5"/>
                </Viewbox>
                
                <!-- Sales Value -->
                <TextBlock Grid.Row="2" 
                          Text="{Binding Sales, StringFormat='${0:N0}'}" 
                          FontSize="12"
                          Foreground="White"
                          Margin="5"
                          HorizontalAlignment="Center"/>
            </Grid>
        </DataTemplate>
    </syncfusion:LeafItemSettings.LabelTemplate>
</syncfusion:LeafItemSettings>
```

### Conditional Formatting in LabelTemplate

```xaml
<syncfusion:LeafItemSettings>
    <syncfusion:LeafItemSettings.LabelTemplate>
        <DataTemplate>
            <Border BorderBrush="White" BorderThickness="1">
                <Grid>
                    <!-- Show name for larger rectangles -->
                    <TextBlock Text="{Binding Name}" 
                              Foreground="White"
                              FontSize="16"
                              Visibility="{Binding Sales, Converter={StaticResource SizeToVisibilityConverter}}"
                              HorizontalAlignment="Center"
                              VerticalAlignment="Center"/>
                    
                    <!-- Show initials for smaller rectangles -->
                    <TextBlock Text="{Binding Initials}" 
                              Foreground="White"
                              FontSize="12"
                              Visibility="{Binding Sales, Converter={StaticResource SizeToInitialsVisibilityConverter}}"
                              HorizontalAlignment="Center"
                              VerticalAlignment="Center"/>
                </Grid>
            </Border>
        </DataTemplate>
    </syncfusion:LeafItemSettings.LabelTemplate>
</syncfusion:LeafItemSettings>
```

## Complete Customization Example

```xaml
<Window.Resources>
    <local:ProductViewModel x:Key="viewModel"/>
</Window.Resources>

<syncfusion:SfTreeMap DataContext="{StaticResource viewModel}"
                      ItemsSource="{Binding Products}"
                      WeightValuePath="Revenue"
                      ColorValuePath="Profit">
    
    <!-- Color mapping -->
    <syncfusion:SfTreeMap.LeafColorMapping>
        <syncfusion:RangeBrushColorMapping>
            <syncfusion:RangeBrushColorMapping.Brushes>
                <syncfusion:RangeBrush From="0" To="1000" Color="#FF6B6B"/>
                <syncfusion:RangeBrush From="1000" To="5000" Color="#FFD93D"/>
                <syncfusion:RangeBrush From="5000" To="10000" Color="#6BCB77"/>
            </syncfusion:RangeBrushColorMapping.Brushes>
        </syncfusion:RangeBrushColorMapping>
    </syncfusion:SfTreeMap.LeafColorMapping>
    
    <!-- Leaf customization -->
    <syncfusion:SfTreeMap.LeafItemSettings>
        <syncfusion:LeafItemSettings BorderBrush="White" 
                                     BorderThickness="2">
            <syncfusion:LeafItemSettings.LabelTemplate>
                <DataTemplate>
                    <Border Background="Transparent">
                        <StackPanel HorizontalAlignment="Center" 
                                   VerticalAlignment="Center"
                                   Margin="5">
                            <TextBlock Text="{Binding ProductName}" 
                                      FontWeight="Bold"
                                      FontSize="14"
                                      Foreground="White"
                                      TextWrapping="Wrap"
                                      TextAlignment="Center"/>
                            <TextBlock Text="{Binding Revenue, StringFormat='${0:N0}'}" 
                                      FontSize="12"
                                      Foreground="White"
                                      Margin="0,5,0,0"
                                      TextAlignment="Center"/>
                        </StackPanel>
                    </Border>
                </DataTemplate>
            </syncfusion:LeafItemSettings.LabelTemplate>
        </syncfusion:LeafItemSettings>
    </syncfusion:SfTreeMap.LeafItemSettings>
</syncfusion:SfTreeMap>
```

## Common Patterns

### Pattern 1: Simple Bordered Leaves
```xaml
<syncfusion:LeafItemSettings BorderBrush="White" 
                             BorderThickness="1"
                             LabelPath="Name"/>
```

### Pattern 2: No Borders, Labels Only
```xaml
<syncfusion:LeafItemSettings BorderBrush="Transparent" 
                             BorderThickness="0"
                             LabelPath="Name"/>
```

### Pattern 3: Thick Borders for Emphasis
```xaml
<syncfusion:LeafItemSettings BorderBrush="Black" 
                             BorderThickness="3"
                             LabelPath="Name"/>
```

### Pattern 4: Custom Template with Icon
```xaml
<syncfusion:LeafItemSettings>
    <syncfusion:LeafItemSettings.LabelTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" 
                       HorizontalAlignment="Center" 
                       VerticalAlignment="Center">
                <Image Source="{Binding Icon}" Width="24" Height="24" Margin="0,0,5,0"/>
                <TextBlock Text="{Binding Name}" Foreground="White" VerticalAlignment="Center"/>
            </StackPanel>
        </DataTemplate>
    </syncfusion:LeafItemSettings.LabelTemplate>
</syncfusion:LeafItemSettings>
```

## Styling Considerations

**Label Visibility:**
- Labels may not fit in small rectangles
- Consider showing labels only for larger items
- Use smaller font sizes for dense data

**Border Impact:**
- Thick borders consume space and reduce data rectangle size
- Use thin borders (1-2px) for most cases
- No borders work well with color-coded data

**Template Performance:**
- Complex templates with many elements can impact performance
- Keep templates simple for large datasets (1000+ items)
- Test with realistic data volumes

## Code-Behind Configuration

```csharp
// Set leaf settings in code
var leafSettings = new LeafItemSettings
{
    BorderBrush = new SolidColorBrush(Colors.White),
    BorderThickness = new Thickness(2),
    LabelPath = "Name"
};
treeMap.LeafItemSettings = leafSettings;

// With template
var template = new DataTemplate();
// ... configure template
leafSettings.LabelTemplate = template;
```

## Troubleshooting

**Labels not showing:**
- Verify LabelPath property name is correct (case-sensitive)
- Ensure property contains non-empty string values
- Check if rectangles are large enough to display text

**Borders not visible:**
- Verify BorderThickness > 0
- Check BorderBrush is not transparent
- Ensure border color contrasts with leaf colors

**Template not rendering:**
- Check DataTemplate syntax is valid
- Verify bindings reference correct property names
- Test template in isolation first

**Labels cut off:**
- Reduce font size
- Use TextWrapping="Wrap" for multi-line
- Consider hiding labels on small rectangles
