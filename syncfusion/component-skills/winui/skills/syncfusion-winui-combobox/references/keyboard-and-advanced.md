# Keyboard Support and Advanced Features

> **Important:** Update the `Syncfusion.Editors.WinUI` NuGet package to the latest version to ensure all keyboard navigation and advanced features work properly.

## Table of Contents
- [Keyboard Navigation](#keyboard-navigation)
- [Opening and Closing Dropdown](#opening-and-closing-dropdown)
- [Item Navigation](#item-navigation)
- [Accessibility](#accessibility)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Keyboard Navigation

The WinUI ComboBox provides comprehensive keyboard support for efficient navigation without mouse interaction.

## Opening and Closing Dropdown

### Keyboard Shortcuts for Dropdown Control

| Key | Non-Editable Mode | Editable Mode |
|-----|-------------------|---------------|
| **F4** | Open/close dropdown | Open/close dropdown |
| **Alt+Down** | Open/close dropdown | No effect |
| **Enter** | Open/close dropdown; If open, selects item and closes | If open, selects item and closes |
| **Up/Down** | No effect | Opens dropdown when closed |
| **Escape** | Cancel selection and close dropdown | Cancel selection and close dropdown |
| **Tab/Shift+Tab** | Select item and close dropdown | Select item and close dropdown |

### Examples

**F4 Key:**
```csharp
// User presses F4
// → Dropdown opens if closed
// → Dropdown closes if open
```

**Enter Key (Single Selection):**
```csharp
// Non-editable mode:
// → Press Enter → Opens dropdown
// → Navigate with arrows
// → Press Enter again → Selects highlighted item and closes

// Editable mode:
// → Type text
// → Press Enter → Selects matched item and closes
```

**Escape Key:**
```csharp
// Dropdown is open with changes
// → Press Escape
// → Cancels changes
// → Reverts to previous selection
// → Closes dropdown
```

## Item Navigation

### Single Selection Mode

| Key | Behavior |
|-----|----------|
| **Up** | Move focus and selection to previous item |
| **Down** | Move focus and selection to next item |
| **Ctrl+Up** | Move focus and selection to previous item |
| **Ctrl+Down** | Move focus and selection to next item |
| **Shift+Up** | Move focus and selection to previous item |
| **Shift+Down** | Move focus and selection to next item |
| **Home** | Move focus and selection to first item |
| **End** | Move focus and selection to last item |
| **PageUp** | Move to first visible item on current page, then previous page |
| **PageDown** | Move to last visible item on current page, then next page |

**Example:**
```xaml
<editors:SfComboBox x:Name="comboBox"
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```
User Actions:
1. Press F4 → Dropdown opens, first item highlighted
2. Press Down × 3 → 4th item highlighted and selected
3. Press Home → First item highlighted and selected
4. Press End → Last item highlighted and selected
5. Press Enter → Dropdown closes with last item selected
```

### Multiple Selection Mode

| Key | Behavior |
|-----|----------|
| **Up** | Move focus to previous item (doesn't change selection) |
| **Down** | Move focus to next item (doesn't change selection) |
| **Space** | Toggle selection of focused item |
| **Ctrl+Up** | Move focus to previous item |
| **Ctrl+Down** | Move focus to next item |
| **Shift+Up** | Move focus to previous item |
| **Shift+Down** | Move focus to next item |
| **Home** | Move focus to first item |
| **End** | Move focus to last item |
| **PageUp** | Move focus to first visible item on page |
| **PageDown** | Move focus to last visible item on page |

**Example:**
```xaml
<editors:SfComboBox SelectionMode="Multiple"
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```
User Actions:
1. Press F4 → Dropdown opens
2. Press Down × 2 → Focus on 3rd item
3. Press Space → 3rd item selected (checkbox checked)
4. Press Down × 2 → Focus on 5th item
5. Press Space → 5th item selected (checkbox checked)
6. Press Enter → Dropdown closes with 3rd and 5th items selected
```

### PageUp/PageDown Behavior

**Single Selection:**
```
Items visible: 1-10 (out of 50)
Current selection: Item 5

Press PageDown:
→ Moves selection to Item 10 (last visible)

Press PageDown again:
→ Scrolls down, moves selection to Item 20 (last visible on new page)
```

**Multiple Selection:**
```
Items visible: 1-10 (out of 50)
Current focus: Item 5

Press PageDown:
→ Moves focus to Item 10 (doesn't change selection)

Press Space:
→ Toggles selection of Item 10
```

## Accessibility

### Screen Reader Support

The ComboBox automatically provides ARIA attributes for screen readers:

```xaml
<editors:SfComboBox x:Name="comboBox"
                    AutomationProperties.Name="Country Selector"
                    AutomationProperties.HelpText="Select your country from the list"
                    ItemsSource="{Binding Countries}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

**Screen reader announces:**
- "Country Selector, ComboBox"
- "Select your country from the list"
- Current selection state
- Number of items
- Focused item text

### Keyboard-Only Operation

Ensure full functionality without mouse:

```xaml
<!-- Fully keyboard accessible -->
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    PlaceholderText="Search..."
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

**Keyboard workflow:**
1. Tab to ComboBox → Focus indicator appears
2. F4 or Enter → Open dropdown
3. Type to filter (editable mode) OR use arrows to navigate
4. Enter → Select and close
5. Tab → Move to next control

### Focus Indicators

Ensure visible focus indicators for accessibility:

```xaml
<editors:SfComboBox ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name">
    <editors:SfComboBox.Resources>
        <!-- Custom focus indicator -->
        <SolidColorBrush x:Key="ComboBoxFocusBorderBrush" Color="Blue" />
    </editors:SfComboBox.Resources>
</editors:SfComboBox>
```

## Performance Optimization

### Large Datasets

**For 1000+ items:**

1. **Use Virtualization (Automatic)**
```xaml
<!-- ComboBox automatically virtualizes dropdown items -->
<editors:SfComboBox ItemsSource="{Binding LargeCollection}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

2. **Enable Filtering**
```xaml
<!-- Helps users find items quickly -->
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    TextSearchMode="StartsWith"
                    ItemsSource="{Binding LargeCollection}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

3. **Limit MaxDropDownHeight**
```xaml
<editors:SfComboBox MaxDropDownHeight="300"
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

### Template Optimization

```xaml
<!-- ✅ DO: Simple, efficient templates -->
<editors:SfComboBox.ItemTemplate>
    <DataTemplate>
        <TextBlock Text="{Binding Name}" />
    </DataTemplate>
</editors:SfComboBox.ItemTemplate>

<!-- ❌ DON'T: Heavy, complex templates -->
<editors:SfComboBox.ItemTemplate>
    <DataTemplate>
        <Grid>
            <Grid.Effects>
                <BlurEffect />
            </Grid.Effects>
            <!-- Multiple nested controls, animations -->
        </Grid>
    </DataTemplate>
</editors:SfComboBox.ItemTemplate>
```

### ObservableCollection Usage

```csharp
// ✅ DO: Use ObservableCollection for dynamic data
public ObservableCollection<Item> Items { get; set; }

// Collection changes automatically update UI
Items.Add(newItem);  // UI updates
Items.Remove(item);  // UI updates

// ❌ DON'T: Use List and reassign
public List<Item> Items { get; set; }
Items.Add(newItem);
Items = new List<Item>(Items); // Forces full rebuild!
```

## Troubleshooting

### Issue: Keyboard Navigation Not Working

**Problem:** Arrow keys don't navigate items.

**Solutions:**
```csharp
// 1. Ensure dropdown is open
comboBox.IsDropDownOpen = true;

// 2. Check if control has focus
comboBox.Focus(FocusState.Keyboard);

// 3. Verify items exist
if (comboBox.Items.Count == 0)
{
    // No items to navigate!
}
```

### Issue: Enter Key Not Selecting Item

**Problem:** Pressing Enter doesn't select the highlighted item.

**Solutions:**
```xaml
<!-- 1. Check SelectionChangeTrigger -->
<editors:SfComboBox SelectionChangeTrigger="Committed" />
<!-- Committed = Updates on Enter (correct) -->

<!-- 2. Ensure item is actually highlighted -->
<!-- Navigate with arrows first, then press Enter -->

<!-- 3. In editable mode, ensure text matches item -->
<editors:SfComboBox IsEditable="True"
                    IsTextSearchEnabled="True" />
```

### Issue: Tab Key Not Working as Expected

**Problem:** Tab doesn't move focus to next control.

**Solutions:**
```xaml
<!-- 1. Ensure TabIndex is set -->
<editors:SfComboBox TabIndex="1" />

<!-- 2. Check IsTabStop -->
<editors:SfComboBox IsTabStop="True" />

<!-- 3. Verify not trapped in dropdown -->
<!-- Press Escape to close dropdown first, then Tab -->
```

### Issue: F4 Key Not Opening Dropdown

**Problem:** F4 key press has no effect.

**Solutions:**
```csharp
// 1. Check if control is enabled
comboBox.IsEnabled = true;

// 2. Verify control has focus
comboBox.Focus(FocusState.Keyboard);

// 3. Check for conflicting key bindings in app
// Remove any global F4 key handlers
```

### Issue: Poor Performance with Large Lists

**Problem:** Dropdown sluggish with 10,000+ items.

**Solutions:**
```xaml
<!-- 1. Enable filtering -->
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    TextSearchMode="StartsWith" />

<!-- 2. Use simple ItemTemplate -->
<editors:SfComboBox.ItemTemplate>
    <DataTemplate>
        <TextBlock Text="{Binding Name}" />
    </DataTemplate>
</editors:SfComboBox.ItemTemplate>

<!-- 3. Limit dropdown height -->
<editors:SfComboBox MaxDropDownHeight="400" />

<!-- 4. Consider paging/lazy loading for extreme cases -->
```

### Issue: Items Not Displaying

**Problem:** Dropdown is empty even though ItemsSource is set.

**Solutions:**
```csharp
// 1. Set DisplayMemberPath
comboBox.DisplayMemberPath = "Name";

// 2. Verify ItemsSource is not null
if (comboBox.ItemsSource == null)
{
    comboBox.ItemsSource = viewModel.Items;
}

// 3. Check DataContext
comboBox.DataContext = viewModel;

// 4. Verify collection has items
Debug.WriteLine($"Item count: {comboBox.Items.Count}");
```

## Best Practices

### 1. Support Full Keyboard Navigation

```xaml
<!-- ✅ DO: Enable all keyboard features -->
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    IsTextSearchEnabled="True" />
```

### 2. Provide Clear Focus Indicators

```xaml
<!-- ✅ DO: Visible focus states -->
<editors:SfComboBox x:Name="comboBox">
    <editors:SfComboBox.Resources>
        <SolidColorBrush x:Key="ComboBoxFocusBorderBrush" 
                        Color="{ThemeResource SystemAccentColor}" />
    </editors:SfComboBox.Resources>
</editors:SfComboBox>
```

### 3. Add Automation Properties

```xaml
<!-- ✅ DO: Support screen readers -->
<editors:SfComboBox AutomationProperties.Name="Country"
                    AutomationProperties.HelpText="Select your country"
                    ItemsSource="{Binding Countries}" />
```

### 4. Optimize for Performance

```csharp
// ✅ DO: Use filtering for large lists
if (Items.Count > 100)
{
    comboBox.IsFilteringEnabled = true;
    comboBox.IsEditable = true;
}

// ✅ DO: Limit dropdown height
comboBox.MaxDropDownHeight = 400;
```

### 5. Handle Edge Cases

```csharp
// ✅ DO: Handle empty collections
if (comboBox.Items.Count == 0)
{
    comboBox.PlaceholderText = "No items available";
    comboBox.IsEnabled = false;
}

// ✅ DO: Handle null selections
if (comboBox.SelectedItem == null)
{
    // Provide default or show message
}
```

## Summary

**Key Takeaways:**
- **F4** opens/closes dropdown in both modes
- **Enter** selects item in single selection, **Space** toggles in multiple selection
- **Arrow keys** navigate items; Home/End for first/last items
- **Escape** cancels changes and closes dropdown
- **Tab/Shift+Tab** moves between controls
- Enable filtering for large datasets
- Use `AutomationProperties` for screen reader support
- Keep ItemTemplates simple for performance
- Test full keyboard workflow for accessibility
- Use ObservableCollection for dynamic data
