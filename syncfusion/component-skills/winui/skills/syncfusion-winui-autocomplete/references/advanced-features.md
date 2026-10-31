# Advanced Features in AutoComplete

## Table of Contents
- [Grouping](#grouping)
- [Text Highlighting](#text-highlighting)
- [Keyboard Support](#keyboard-support)
- [Accessibility](#accessibility)

## Grouping

Display items organized by categories in the dropdown list.

### Enable Grouping

Use `CollectionViewSource` with `IsSourceGrouped` set to true:

```csharp
// Model
public class Vegetable
{
    public string Name { get; set; }
    public string Category { get; set; }
}

// ViewModel
public class VegetablesViewModel
{
    public object Vegetables { get; set; }

    public VegetablesViewModel()
    {
        var vegetables = new ObservableCollection<Vegetable>
        {
            new Vegetable { Name = "Cabbage", Category = "Leafy and Salad" },
            new Vegetable { Name = "Chickpea", Category = "Beans" },
            new Vegetable { Name = "Garlic", Category = "Bulb and Stem" },
            new Vegetable { Name = "Green bean", Category = "Beans" },
            new Vegetable { Name = "Horse gram", Category = "Beans" },
            new Vegetable { Name = "Nopal", Category = "Bulb and Stem" },
            new Vegetable { Name = "Onion", Category = "Bulb and Stem" },
            new Vegetable { Name = "Pumpkins", Category = "Leafy and Salad" },
            new Vegetable { Name = "Spinach", Category = "Leafy and Salad" }
        };

        // Group by Category
        this.Vegetables = vegetables.GroupBy(item => item.Category);
    }
}
```

### Custom Group Filter

Implement custom filtering to maintain grouping:

```csharp
public class CustomGroupFilter : IAutoCompleteFilterBehavior
{
    public async Task<object> GetMatchingItemsAsync(
        SfAutoComplete source, 
        AutoCompleteFilterInfo filterInfo)
    {
        List<Vegetable> list = new List<Vegetable>();
        IEnumerable itemsSource = source.ItemsSource as IEnumerable;

        // Filter items
        list.AddRange(
            from item in itemsSource.Cast<Vegetable>()
            let filteritem = GetStringFromMemberPath(item, "Name")
            where filteritem.Contains(
                filterInfo.Text, 
                StringComparison.CurrentCultureIgnoreCase)
            select item
        );

        // Re-group filtered results
        var collectionViewSource = new CollectionViewSource
        {
            Source = list.GroupBy(item => item.Category),
            IsSourceGrouped = true
        };

        return collectionViewSource.View;
    }

    private string GetStringFromMemberPath(object item, string path)
    {
        string value = item.ToString();
        if (!string.IsNullOrEmpty(path))
        {
            value = item.GetType()
                ?.GetRuntimeProperty(path)
                ?.GetValue(item)
                .ToString();
        }
        return value;
    }
}
```

### Apply Grouping with GroupStyle

```xaml
<editors:SfAutoComplete PlaceholderText="Select a Vegetable"
                        ItemsSource="{Binding Vegetables}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name">
    <editors:SfAutoComplete.FilterBehavior>
        <local:CustomGroupFilter/>
    </editors:SfAutoComplete.FilterBehavior>
    
    <editors:SfAutoComplete.GroupStyle>
        <GroupStyle>
            <GroupStyle.HeaderTemplate>
                <DataTemplate>
                    <Grid Background="#F5F5F5" Padding="8,4">
                        <TextBlock Text="{Binding Key}"
                                  FontWeight="SemiBold"
                                  FontSize="14"
                                  Foreground="#424242" />
                    </Grid>
                </DataTemplate>
            </GroupStyle.HeaderTemplate>
        </GroupStyle>
    </editors:SfAutoComplete.GroupStyle>
</editors:SfAutoComplete>
```

**Result:**
```
Leafy and Salad
  - Cabbage
  - Pumpkins
  - Spinach
Beans
  - Chickpea
  - Green bean
  - Horse gram
Bulb and Stem
  - Garlic
  - Nopal
  - Onion
```

## Text Highlighting

Highlight matching characters in suggestions for better visibility.

### Highlighting Modes

| Mode | Description |
|------|-------------|
| `None` | No highlighting |
| `Matched` | Highlight text that matches user input |
| `Unmatched` | Highlight text that doesn't match input |

### Highlight Matched Text (StartsWith)

```xaml
<editors:SfAutoComplete DisplayMemberPath="Name"                             
                        TextHighlightMode="Matched"
                        TextSearchMode="StartsWith"                           
                        HighlightedTextForeground="Red"
                        ItemsSource="{Binding Countries}" />
```

```csharp
autoComplete.TextHighlightMode = AutoCompleteTextHighlightMode.Matched;
autoComplete.TextSearchMode = AutoCompleteTextSearchMode.StartsWith;
autoComplete.HighlightedTextForeground = new SolidColorBrush(Colors.Red);
```

**Example:** User types "Ind" → Shows **Ind**ia, **Ind**onesia (matched text in red)

### Highlight Matched Text (Contains)

```xaml
<editors:SfAutoComplete DisplayMemberPath="Name"                              
                        TextHighlightMode="Matched"
                        TextSearchMode="Contains"                           
                        HighlightedTextForeground="Red"
                        ItemsSource="{Binding Wonders}" />
```

**Example:** User types "land" → Shows Eng**land**, Thai**land** (matched text in red)

### Highlight Unmatched Text (StartsWith)

```xaml
<editors:SfAutoComplete DisplayMemberPath="Name"                               
                        TextHighlightMode="Unmatched"
                        TextSearchMode="StartsWith"                              
                        HighlightedTextForeground="Red"
                        ItemsSource="{Binding OlympicGames}" />
```

**Example:** User types "Ind" → Shows Ind**ia**, Ind**onesia** (unmatched portion in red)

### Highlight Unmatched Text (Contains)

```xaml
<editors:SfAutoComplete DisplayMemberPath="Name"                               
                        TextHighlightMode="Unmatched"
                        TextSearchMode="Contains"                              
                        HighlightedTextForeground="Red"
                        ItemsSource="{Binding OlympicGames}" />
```

**Example:** User types "land" → Shows Eng**land**, Thai**land** (unmatched portions in red)

### Advanced Highlighting Properties

```xaml
<editors:SfAutoComplete DisplayMemberPath="Name"                       
                        TextHighlightMode="Matched"                                
                        TextSearchMode="StartsWith"                               
                        HighlightedTextFontSize="16"                               
                        HighlightedTextFontStyle="Italic"                               
                        HighlightedTextFontWeight="Bold"                                
                        HighlightedTextForeground="DarkBlue"                                
                        ItemsSource="{Binding SocialMedias}" />
```

```csharp
autoComplete.HighlightedTextFontSize = 16;
autoComplete.HighlightedTextFontStyle = FontStyle.Italic;
autoComplete.HighlightedTextFontWeight = FontWeights.Bold;
autoComplete.HighlightedTextForeground = new SolidColorBrush(Colors.DarkBlue);
```

### Highlighting Properties Summary

| Property | Type | Description |
|----------|------|-------------|
| `TextHighlightMode` | `AutoCompleteTextHighlightMode` | None, Matched, Unmatched |
| `HighlightedTextForeground` | `Brush` | Highlight color |
| `HighlightedTextFontSize` | `double` | Font size for highlighted text |
| `HighlightedTextFontStyle` | `FontStyle` | Normal or Italic |
| `HighlightedTextFontWeight` | `FontWeight` | Text weight |

## Keyboard Support

Comprehensive keyboard navigation for efficient interaction.

### Opening and Closing Dropdown

| Key | Behavior |
|-----|----------|
| `Esc` | Close dropdown and cancel selection |
| `Tab` | Accept selection and close dropdown |
| `Shift+Tab` | Accept selection and close dropdown |

### Navigating Items

#### Single Selection Mode

| Key | Behavior |
|-----|----------|
| `↑` | Move focus and selection to previous item |
| `Ctrl+↑` | Move focus and selection to previous item |
| `Shift+↑` | Move focus and selection to previous item |
| `↓` | Move focus and selection to next item |
| `Ctrl+↓` | Move focus and selection to next item |
| `Shift+↓` | Move focus and selection to next item |
| `Enter` | Select focused item and close dropdown |
| `Home` | Jump to first item |
| `End` | Jump to last item |

#### Multiple Selection Mode

| Key | Behavior |
|-----|----------|
| `↑` | Move focus to previous item (no selection) |
| `Ctrl+↑` | Move focus to previous item |
| `Shift+↑` | Move focus to previous item |
| `↓` | Move focus to next item (no selection) |
| `Ctrl+↓` | Move focus to next item |
| `Shift+↓` | Move focus to next item |
| `Enter` | Toggle selection of focused item |
| `PageUp`/`←` | Navigate selected tokens right-to-left |
| `PageDown`/`→` | Navigate selected tokens left-to-right |
| `Delete` | Remove focused token |
| `Backspace` | Remove last token |

### Keyboard Best Practices

**For accessibility:**
- Ensure Tab order is logical
- Test all keyboard shortcuts
- Provide visual focus indicators
- Support Escape for cancel/close

**For efficiency:**
- Use arrow keys for navigation
- Enter to select
- Esc to cancel
- Tab to move to next control

## Accessibility

Ensure the AutoComplete control is usable by everyone, including users with disabilities.

### Screen Reader Support

AutoComplete provides built-in ARIA (Accessible Rich Internet Applications) support:

**Automatic announcements:**
- Control role and purpose
- Number of available suggestions
- Currently focused item
- Selection changes
- No results found messages

### AutomationProperties

Set accessibility properties for better screen reader support:

```xaml
<editors:SfAutoComplete x:Name="autoComplete"
                        ItemsSource="{Binding Countries}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        PlaceholderText="Search country"
                        AutomationProperties.Name="Country Selector"
                        AutomationProperties.HelpText="Type to search and select a country">
</editors:SfAutoComplete>
```

```csharp
AutomationProperties.SetName(autoComplete, "Country Selector");
AutomationProperties.SetHelpText(autoComplete, "Type to search and select a country");
```

### Placeholder Text for Context

Always provide placeholder text to guide users:

```xaml
<editors:SfAutoComplete PlaceholderText="Search employee by name or ID"
                        ItemsSource="{Binding Employees}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name" />
```

### Color Contrast

Ensure text and highlights meet WCAG color contrast ratios:

**Minimum contrast ratios:**
- Normal text: 4.5:1
- Large text (18pt+): 3:1
- Interactive elements: 3:1

```xaml
<!-- Good contrast example -->
<editors:SfAutoComplete HighlightedTextForeground="#1976D2"
                        Background="White"
                        Foreground="Black" />
```

### Focus Indicators

Ensure visible focus indicators for keyboard navigation:

```xaml
<editors:SfAutoComplete>
    <editors:SfAutoComplete.Resources>
          <Style TargetType="ListViewItem">
              <Setter Property="UseSystemFocusVisuals" Value="True" />
              <Setter Property="FocusVisualPrimaryBrush" Value="#1976D2" />
              <Setter Property="FocusVisualPrimaryThickness" Value="2" />
          </Style>
    </editors:SfAutoComplete.Resources>
</editors:SfAutoComplete>
```

### High Contrast Theme Support

Test control in Windows high contrast modes:

**Steps:**
1. Enable High Contrast (Alt+Left Shift+Print Screen)
2. Verify all text is readable
3. Ensure focus indicators are visible
4. Check that interactive elements are distinguishable

## Common Advanced Patterns

### Pattern 1: Grouped Suggestions

```xaml
<editors:SfAutoComplete ItemsSource="{Binding GroupedContacts}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name">
    <editors:SfAutoComplete.FilterBehavior>
        <local:ContactGroupFilter/>
    </editors:SfAutoComplete.FilterBehavior>
    <editors:SfAutoComplete.GroupStyle>
        <GroupStyle>
            <GroupStyle.HeaderTemplate>
                <DataTemplate>
                    <TextBlock Text="{Binding Key}"
                              FontWeight="SemiBold"
                              Foreground="{ThemeResource SystemAccentColor}"/>
                </DataTemplate>
            </GroupStyle.HeaderTemplate>
        </GroupStyle>
    </editors:SfAutoComplete.GroupStyle>
</editors:SfAutoComplete>
```

### Pattern 2: Highlighted Search

```xaml
<editors:SfAutoComplete TextSearchMode="Contains"
                        TextHighlightMode="Matched"
                        HighlightedTextForeground="#1976D2"
                        HighlightedTextFontWeight="Bold"
                        ItemsSource="{Binding Products}"
                        DisplayMemberPath="Name"
                        PlaceholderText="Search products..." />
```

### Pattern 3: Accessible Multi-Select

```xaml
<editors:SfAutoComplete SelectionMode="Multiple"
                        PlaceholderText="Select team members (use Enter to select)"
                        AutomationProperties.Name="Team Member Selector"
                        AutomationProperties.HelpText="Type to search and press Enter to add members"
                        ItemsSource="{Binding Employees}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name" />
```

## Key Properties Summary

| Property | Type | Description |
|----------|------|-------------|
| `GroupMemberPath` | `string` | Property for grouping (deprecated - use CollectionViewSource) |
| `GroupStyle` | `GroupStyle` | Template for group headers |
| `TextHighlightMode` | `AutoCompleteTextHighlightMode` | None, Matched, Unmatched |
| `HighlightedTextForeground` | `Brush` | Highlight color |
| `HighlightedTextFontSize` | `double` | Highlight font size |
| `HighlightedTextFontStyle` | `FontStyle` | Highlight font style |
| `HighlightedTextFontWeight` | `FontWeight` | Highlight font weight |

## Next Steps

- **Getting Started:** Basic setup → [getting-started.md](getting-started.md)
- **Selection:** Configure selection modes → [selection.md](selection.md)
- **Filtering:** Set up search behavior → [searching-filtering.md](searching-filtering.md)
- **Customization:** Style and templates → [ui-customization.md](ui-customization.md)
