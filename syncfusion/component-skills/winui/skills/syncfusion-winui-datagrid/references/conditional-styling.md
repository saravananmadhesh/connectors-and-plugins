# Conditional Styling in WinUI DataGrid

Guide to applying conditional formatting, row styling, cell styling, and visual customization in Syncfusion WinUI DataGrid.

## Row Styling

Apply styles to entire rows based on data conditions.

### Using Style Selectors

```csharp
public class RowStyleSelector : StyleSelector
{
    public Style HighPriorityStyle { get; set; }
    public Style NormalStyle { get; set; }
    
    protected override Style SelectStyleCore(object item, DependencyObject container)
    {
        var order = item as OrderInfo;
        if (order != null && order.UnitPrice > 100)
            return HighPriorityStyle;
        
        return NormalStyle;
    }
}
```

```xml
<Page.Resources>
    <Style x:Key="HighPriorityRowStyle" TargetType="dataGrid:DataGridRowControl">
        <Setter Property="Background" Value="LightCoral" />
    </Style>
    
    <Style x:Key="NormalRowStyle" TargetType="dataGrid:DataGridRowControl">
        <Setter Property="Background" Value="Transparent" />
    </Style>
    
    <local:RowStyleSelector x:Key="rowStyleSelector"
                           HighPriorityStyle="{StaticResource HighPriorityRowStyle}"
                           NormalStyle="{StaticResource NormalRowStyle}" />
</Page.Resources>

<dataGrid:SfDataGrid RowStyleSelector="{StaticResource rowStyleSelector}"
                     ItemsSource="{Binding Orders}" />
```

## Cell Styling

Style individual cells based on conditions.

### Using CellStyle

```xml
<dataGrid:GridTextColumn MappingName="UnitPrice">
    <dataGrid:GridTextColumn.CellStyle>
        <Style TargetType="dataGrid:GridCell">
            <Setter Property="Foreground" Value="Green" />
        </Style>
    </dataGrid:GridTextColumn.CellStyle>
</dataGrid:GridTextColumn>
```

### Using CellStyleSelector

```csharp
public class CellStyleSelector : StyleSelector
{
    public Style HighValueStyle { get; set; }
    public Style LowValueStyle { get; set; }
    
    protected override Style SelectStyleCore(object item, DependencyObject container)
    {
        var cell = container as GridCell;
        if (cell != null)
        {
            var order = cell.DataContext as OrderInfo;
            if (order != null && order.UnitPrice > 50)
                return HighValueStyle;
        }
        
        return LowValueStyle;
    }
}
```

## Custom Cell Templates

```xml
<dataGrid:GridTemplateColumn MappingName="Status">
    <dataGrid:GridTemplateColumn.CellTemplate>
        <DataTemplate>
            <Border Background="{Binding Status, Converter={StaticResource StatusToColorConverter}}"
                    Padding="5" CornerRadius="3">
                <TextBlock Text="{Binding Status}" Foreground="White" />
            </Border>
        </DataTemplate>
    </dataGrid:GridTemplateColumn.CellTemplate>
</dataGrid:GridTemplateColumn>
```

## Best Practices

1. Use style selectors for complex conditional logic
2. Define styles in resources for reusability
3. Use alternating row colors for better readability
4. Apply cell templates for rich visual indicators
5. Consider performance with large datasets - minimize complex styling
