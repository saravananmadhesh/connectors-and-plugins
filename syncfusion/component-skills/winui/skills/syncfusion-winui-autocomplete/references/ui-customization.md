# UI Customization in AutoComplete

## Table of Contents
- [Header and Description](#header-and-description)
- [Placeholder Text](#placeholder-text)
- [TextBox Styling](#textbox-styling)
- [Dropdown Item Templates](#dropdown-item-templates)
- [Token Item Customization](#token-item-customization)
- [Leading and Trailing Views](#leading-and-trailing-views)
- [No Results Found](#no-results-found)
- [Dropdown Height](#dropdown-height)

## Header and Description

### Header

Add a label above the AutoComplete control:

```xaml
<editors:SfAutoComplete Header="Favourite Social Media"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        Width="250" />
```

```csharp
autoComplete.Header = "Favourite Social Media";
```

### HeaderTemplate

Customize header appearance with a template:

```xaml
<editors:SfAutoComplete Header="Favourite Social Media"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        Width="250">
    <editors:SfAutoComplete.HeaderTemplate>
        <DataTemplate>
            <TextBlock Foreground="Red"
                      FontWeight="SemiBold"
                      FontSize="16"
                      Text="{Binding}" />
        </DataTemplate>
    </editors:SfAutoComplete.HeaderTemplate>
</editors:SfAutoComplete>
```

### Description

Add helper text below the control:

```xaml
<editors:SfAutoComplete Header="Favourite Social Media"
                        Description="This will be added to your profile."
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        Width="250" />
```

```csharp
autoComplete.Description = "This will be added to your profile.";
autoComplete.Header = "Favourite Social Media";
```

## Placeholder Text

### Basic Placeholder

Display hint text when control is empty:

```xaml
<editors:SfAutoComplete PlaceholderText="Select a social media"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        Width="250" />
```

```csharp
autoComplete.PlaceholderText = "Select a social media";
```

### Customize Placeholder Color

```xaml
<editors:SfAutoComplete PlaceholderText="Select a social media"
                        PlaceholderForeground="Red"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        Width="250" />
```

```csharp
autoComplete.PlaceholderForeground = new SolidColorBrush(Colors.Red);
```

## TextBox Styling

Customize the editing textbox appearance (single selection mode only):

```xaml
<editors:SfAutoComplete SelectionMode="Single"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        ShowClearButton="False"    
                        Width="250">
    <editors:SfAutoComplete.TextBoxStyle>
        <Style TargetType="TextBox">                   
            <Style.Setters>              
                <Setter Property="SelectionHighlightColor" Value="Green"/>  
                <Setter Property="BorderThickness" Value="0"/> 
                <Setter Property="FontSize" Value="14"/>
                <Setter Property="FontWeight" Value="SemiBold"/>
            </Style.Setters>
        </Style>
    </editors:SfAutoComplete.TextBoxStyle>
</editors:SfAutoComplete>
```

**Note:** `TextBoxStyle` only applies in single selection mode.

## Dropdown Item Templates

### Basic ItemTemplate

Customize how items appear in the dropdown:

```csharp
// Model
public class Employee
{
    public string Name { get; set; }
    public BitmapImage ProfilePicture { get; set; }
    public string Designation { get; set; }
    public string ID { get; set; }
    public string Country { get; set; }
}
```

```xaml
<editors:SfAutoComplete TextMemberPath="Name"
                        DisplayMemberPath="Name"
                        ItemsSource="{Binding Employees}"
                        Width="300">
    <editors:SfAutoComplete.ItemTemplate>
        <DataTemplate>
            <Grid Margin="0,5">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="48"/>
                    <ColumnDefinition Width="*"/>
                </Grid.ColumnDefinitions>
                
                <Image Grid.Column="0"
                      HorizontalAlignment="Center"
                      VerticalAlignment="Center" 
                      Source="{Binding ProfilePicture}" 
                      Stretch="Uniform"/>
                
                <StackPanel Grid.Column="1"
                           Margin="15,0,0,0"
                           VerticalAlignment="Center">
                    <TextBlock Opacity="0.87"
                              FontSize="14"
                              Text="{Binding Name}"/>
                    <TextBlock Opacity="0.54"
                              FontSize="12"
                              Text="{Binding Designation}"/>
                </StackPanel>
            </Grid>
        </DataTemplate>
    </editors:SfAutoComplete.ItemTemplate>
</editors:SfAutoComplete>
```

### Conditional ItemTemplateSelector

Apply different templates based on item content:

```csharp
public class EmployeeTemplateSelector : DataTemplateSelector
{
    public DataTemplate EmployeeTemplate1 { get; set; }
    public DataTemplate EmployeeTemplate2 { get; set; }
    
    protected override DataTemplate SelectTemplateCore(
        object item, 
        DependencyObject container)
    {
        var employeeName = (item as Employee).Name;
        
        if (employeeName == "Anne Dodsworth" || 
            employeeName == "Emilia Alvaro" ||
            employeeName == "Laura Callahan")
        {
            return EmployeeTemplate1;
        }
        else
        {
            return EmployeeTemplate2;
        }
    }
}
```

```xaml
<Grid>
    <Grid.Resources>
        <DataTemplate x:Key="employeeTemplate1">
            <Grid Margin="0,5">
                <!-- Blue theme -->
                <TextBlock Foreground="Blue" 
                          FontSize="14"
                          Text="{Binding Name}"/>
            </Grid>
        </DataTemplate>
        
        <DataTemplate x:Key="employeeTemplate2">
            <Grid Margin="0,5">
                <!-- Red theme -->
                <TextBlock Foreground="Red"
                          FontSize="14"
                          Text="{Binding Name}"/>
            </Grid>
        </DataTemplate>

        <local:EmployeeTemplateSelector x:Key="selector"
            EmployeeTemplate1="{StaticResource employeeTemplate1}"
            EmployeeTemplate2="{StaticResource employeeTemplate2}"/>
    </Grid.Resources>
    
    <editors:SfAutoComplete 
        TextMemberPath="Name"
        ItemsSource="{Binding Employees}"
        ItemTemplateSelector="{StaticResource selector}"        
        Width="250" />
</Grid>
```

## Token Item Customization

Customize the appearance of selected items in multiple selection mode:

### TokenItemStyle

```xaml
<editors:SfAutoComplete SelectionMode="Multiple"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name">
    <editors:SfAutoComplete.TokenItemStyle>
        <Style TargetType="editors:AutoCompleteTokenItem">
            <Setter Property="Foreground" Value="Red"/>
            <Setter Property="Background" Value="LightCyan"/>
            <Setter Property="FontWeight" Value="SemiBold"/>
            <Setter Property="Margin" Value="2"/>
        </Style>
    </editors:SfAutoComplete.TokenItemStyle>
</editors:SfAutoComplete>
```

### Conditional TokenItemStyleSelector

```csharp
public class SocialMediaStyleSelector : StyleSelector
{
    public Style MediaStyle1 { get; set; }
    public Style MediaStyle2 { get; set; }
    
    protected override Style SelectStyleCore(
        object item, 
        DependencyObject container)
    {
        if (item is SocialMedia media)
        {
            if (media.Name == "Facebook" || 
                media.Name == "Instagram" ||
                media.Name == "Twitter")
            {
                return MediaStyle1;
            }
            else
            {
                return MediaStyle2;
            }
        }
        return null;
    }
}
```

```xaml
<Grid>
    <Grid.Resources>
        <Style x:Key="MediaStyle1" TargetType="editors:AutoCompleteTokenItem">
            <Setter Property="Foreground" Value="Blue"/>
            <Setter Property="Background" Value="LightCyan"/>
        </Style>
        
        <Style x:Key="MediaStyle2" TargetType="editors:AutoCompleteTokenItem">
            <Setter Property="Foreground" Value="Red"/>
            <Setter Property="Background" Value="LightPink"/>
        </Style>
        
        <local:SocialMediaStyleSelector x:Key="styleSelector" 
            MediaStyle1="{StaticResource MediaStyle1}"
            MediaStyle2="{StaticResource MediaStyle2}"/>
    </Grid.Resources>
    
    <editors:SfAutoComplete SelectionMode="Multiple"
        ItemsSource="{Binding SocialMedias}"
        TokenItemStyleSelector="{StaticResource styleSelector}"
        DisplayMemberPath="Name"
        TextMemberPath="Name" />
</Grid>
```

### TokenItemTemplate

Add images or custom content to tokens:

```csharp
// Model
public class CountryInfo
{
    public string CountryName { get; set; }
    public BitmapImage FlagImage { get; set; }
}
```

```xaml
<editors:SfAutoComplete SelectionMode="Multiple"
                        PlaceholderText="Select countries"
                        DisplayMemberPath="CountryName"
                        ItemsSource="{Binding Countries}">
    <editors:SfAutoComplete.TokenItemTemplate>
        <DataTemplate>
            <Grid>
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="Auto"/>
                    <ColumnDefinition Width="*"/>
                </Grid.ColumnDefinitions>
                
                <Image Grid.Column="0"    
                      Source="{Binding FlagImage}" 
                      Width="24" 
                      Height="16"
                      Margin="0,0,4,0"/>

                <TextBlock Grid.Column="1" 
                          Text="{Binding CountryName}"
                          VerticalAlignment="Center"/>
            </Grid>
        </DataTemplate>
    </editors:SfAutoComplete.TokenItemTemplate>
</editors:SfAutoComplete>
```

### Conditional TokenItemTemplateSelector

```csharp
public class CountryTemplateSelector : DataTemplateSelector
{
    public DataTemplate CountryTemplate1 { get; set; }
    public DataTemplate CountryTemplate2 { get; set; }
    
    protected override DataTemplate SelectTemplateCore(
        object item, 
        DependencyObject container)
    {
        var countryName = (item as CountryInfo).CountryName;
        
        if (countryName == "United States" || 
            countryName == "India" ||
            countryName == "United Kingdom")
        {
            return CountryTemplate1;
        }
        return CountryTemplate2;
    }
}
```

## Leading and Trailing Views

### Leading View

Display content before the input area (e.g., search icon):

```xaml
<editors:SfAutoComplete PlaceholderText="Search a country"
                        ItemsSource="{Binding Countries}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name">
    <editors:SfAutoComplete.LeadingView>
        <Viewbox Height="16" Width="16" Margin="8,0,4,0">
            <SymbolIcon Symbol="Find" />
        </Viewbox>
    </editors:SfAutoComplete.LeadingView>
</editors:SfAutoComplete>
```

### Trailing View

Display content after the input area (e.g., action button):

```xaml
<editors:SfAutoComplete PlaceholderText="Search a country"
                        ItemsSource="{Binding Countries}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name">
    <editors:SfAutoComplete.TrailingView>
        <Button Style="{ThemeResource AlternateCloseButtonStyle}"
               Height="30"
               AllowFocusOnInteraction="False">
            <Viewbox Height="16" Width="16">
                <FontIcon Glyph="&#xEBE7;" />
            </Viewbox>
        </Button>
    </editors:SfAutoComplete.TrailingView>
</editors:SfAutoComplete>
```

### Both Leading and Trailing

```xaml
<editors:SfAutoComplete PlaceholderText="Search a country">
    <editors:SfAutoComplete.LeadingView>
        <editors:SfComboBox Margin="4" Width="120">
            <editors:SfComboBoxItem Content="Asia" />
            <editors:SfComboBoxItem Content="Africa" />
            <editors:SfComboBoxItem Content="Europe" />
            <editors:SfComboBoxItem Content="All" IsSelected="True"/>
        </editors:SfComboBox>
    </editors:SfAutoComplete.LeadingView>
    
    <editors:SfAutoComplete.TrailingView>
        <Viewbox Height="16" Width="16" Margin="0,0,8,0">
            <SymbolIcon Symbol="Find" />
        </Viewbox>
    </editors:SfAutoComplete.TrailingView>
</editors:SfAutoComplete>
```

## No Results Found

### NoResultsFoundContent

Display simple text when no matches found:

```xaml
<editors:SfAutoComplete ItemsSource="{Binding Products}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        NoResultsFoundContent="No products found. Try a different search."
                        Width="300" />
```

```csharp
autoComplete.NoResultsFoundContent = "No products found. Try a different search.";
```

### NoResultsFoundTemplate

Custom template for no results state:

```xaml
<editors:SfAutoComplete ItemsSource="{Binding Products}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        Width="300">
    <editors:SfAutoComplete.NoResultsFoundTemplate>
        <DataTemplate>
            <StackPanel Padding="20" HorizontalAlignment="Center">
                <TextBlock Text="&#xE8D3;" 
                          FontFamily="Segoe MDL2 Assets"
                          FontSize="48"
                          Foreground="Gray"
                          HorizontalAlignment="Center"/>
                <TextBlock Text="No results found" 
                          Foreground="Red" 
                          FontStyle="Italic" 
                          FontSize="16"
                          Margin="0,8,0,0"
                          HorizontalAlignment="Center"/>
                <TextBlock Text="Try adjusting your search"
                          Foreground="Gray"
                          FontSize="12"
                          Margin="0,4,0,0"
                          HorizontalAlignment="Center"/>
            </StackPanel>
        </DataTemplate>
    </editors:SfAutoComplete.NoResultsFoundTemplate>
</editors:SfAutoComplete>
```

**Priority:** `NoResultsFoundTemplate` takes precedence over `NoResultsFoundContent`.

## Dropdown Height

Control maximum dropdown height:

```xaml
<editors:SfAutoComplete MaxDropDownHeight="400"
                        ItemsSource="{Binding Employees}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        Width="250" />
```

```csharp
autoComplete.MaxDropDownHeight = 400;
```

**Default:** 288 pixels

**Note:** If height is too small, scroll viewer appears automatically.

## Common Customization Patterns

### Pattern 1: Search Box with Icon

```xaml
<editors:SfAutoComplete PlaceholderText="Search..."
                        TextSearchMode="Contains">
    <editors:SfAutoComplete.LeadingView>
        <Viewbox Height="16" Width="16" Margin="8,0,4,0">
            <Path Data="M15.5 14h-.79l-.28-.27C15.41 12.59..." 
                  Fill="{ThemeResource SystemAccentColor}"/>
        </Viewbox>
    </editors:SfAutoComplete.LeadingView>
</editors:SfAutoComplete>
```

### Pattern 2: Multi-Select with Custom Tokens

```xaml
<editors:SfAutoComplete SelectionMode="Multiple"
                        ItemsSource="{Binding Tags}">
    <editors:SfAutoComplete.TokenItemStyle>
        <Style TargetType="editors:AutoCompleteTokenItem">
            <Setter Property="Background" Value="#E3F2FD"/>
            <Setter Property="Foreground" Value="#1976D2"/>
            <Setter Property="BorderBrush" Value="#1976D2"/>
            <Setter Property="BorderThickness" Value="1"/>
            <Setter Property="CornerRadius" Value="12"/>
            <Setter Property="Padding" Value="8,4"/>
            <Setter Property="Margin" Value="2"/>
        </Style>
    </editors:SfAutoComplete.TokenItemStyle>
</editors:SfAutoComplete>
```

### Pattern 3: Rich Dropdown Items

```xaml
<editors:SfAutoComplete ItemsSource="{Binding Contacts}">
    <editors:SfAutoComplete.ItemTemplate>
        <DataTemplate>
            <Grid Padding="8">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="40"/>
                    <ColumnDefinition Width="*"/>
                    <ColumnDefinition Width="Auto"/>
                </Grid.ColumnDefinitions>
                
                <Ellipse Grid.Column="0" 
                        Width="32" Height="32"
                        Fill="{Binding AvatarColor}"/>
                
                <StackPanel Grid.Column="1" Margin="12,0,0,0">
                    <TextBlock Text="{Binding Name}" 
                              FontWeight="SemiBold"/>
                    <TextBlock Text="{Binding Email}" 
                              FontSize="12"
                              Opacity="0.7"/>
                </StackPanel>
                
                <TextBlock Grid.Column="2"
                          Text="{Binding Status}"
                          FontSize="11"
                          VerticalAlignment="Center"/>
            </Grid>
        </DataTemplate>
    </editors:SfAutoComplete.ItemTemplate>
</editors:SfAutoComplete>
```

## Key Properties Summary

| Property | Type | Description |
|----------|------|-------------|
| `Header` | `object` | Label above control |
| `HeaderTemplate` | `DataTemplate` | Custom header template |
| `Description` | `object` | Helper text below control |
| `PlaceholderText` | `string` | Watermark text |
| `PlaceholderForeground` | `Brush` | Placeholder color |
| `TextBoxStyle` | `Style` | TextBox styling (single mode) |
| `ItemTemplate` | `DataTemplate` | Dropdown item template |
| `ItemTemplateSelector` | `DataTemplateSelector` | Conditional item template |
| `TokenItemStyle` | `Style` | Token styling (multiple mode) |
| `TokenItemStyleSelector` | `StyleSelector` | Conditional token style |
| `TokenItemTemplate` | `DataTemplate` | Token template |
| `TokenItemTemplateSelector` | `DataTemplateSelector` | Conditional token template |
| `LeadingView` | `object` | Content before input |
| `TrailingView` | `object` | Content after input |
| `NoResultsFoundContent` | `object` | No results text |
| `NoResultsFoundTemplate` | `DataTemplate` | No results template |
| `MaxDropDownHeight` | `double` | Maximum dropdown height |

## Next Steps

- **Advanced Features:** Grouping, highlighting, keyboard support → [advanced-features.md](advanced-features.md)
