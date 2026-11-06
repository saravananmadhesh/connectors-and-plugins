# Selection in WinUI ComboBox

> **Note:** Update the `Syncfusion.Editors.WinUI` NuGet package to the latest version to ensure all selection modes and features work correctly.

## Table of Contents
- [Overview](#overview)
- [Single Selection](#single-selection)
- [Multiple Selection](#multiple-selection)
- [Selection Events](#selection-events)
- [Auto-Append UI](#auto-append-ui)
- [Best Practices](#best-practices)

## Overview

The Syncfusion WinUI ComboBox supports both single and multiple item selection modes. Selection can be performed through UI interaction or programmatically through properties and methods.

**Key Selection Properties:**
- **SelectionMode:** `Single` or `Multiple`
- **SelectedItem:** Currently selected item (single selection)
- **SelectedIndex:** Index of selected item (single selection)
- **SelectedItems:** Collection of selected items (multiple selection)
- **SelectionChangeTrigger:** When to update selection (`Committed` or `Always`)

## Single Selection

Single selection allows users to select one item at a time from the dropdown.

###UI Selection

Select items interactively by:
- Clicking an item in the dropdown
- Typing in editable mode and pressing Enter
- Using keyboard navigation and pressing Enter

```xaml
<editors:SfComboBox IsEditable="True"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

**Retrieve selected item:**
```csharp
// Using SelectedItem
var selected = comboBox.SelectedItem as SocialMedia;

// Using SelectedIndex
int index = comboBox.SelectedIndex;
```

### Programmatic Selection

**Using SelectedItem:**
```xaml
<editors:SfComboBox x:Name="comboBox"
                    ItemsSource="{Binding SocialMedias}"
                    SelectedItem="{Binding SelectedSocialMedia}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
// Set by object reference
comboBox.SelectedItem = specificSocialMediaObject;
```

**Using SelectedIndex:**
```xaml
<editors:SfComboBox x:Name="comboBox"
                    ItemsSource="{Binding SocialMedias}"
                    SelectedIndex="2"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
// Set by index (0-based)
comboBox.SelectedIndex = 2;

// Clear selection
comboBox.SelectedIndex = -1;
```

### SelectionChangeTrigger

Controls when the selected item is updated:

**Committed (Default):** Updates when user commits selection
- Pressing Enter
- Clicking an item
- Losing focus

```xaml
<editors:SfComboBox IsEditable="True"
                    SelectionChangeTrigger="Committed"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

**Always:** Updates immediately during navigation
```xaml
<editors:SfComboBox IsEditable="True"
                    SelectionChangeTrigger="Always"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name"
                    SelectionChanged="OnSelectionChanged" />
```

```csharp
private async void OnSelectionChanged(object sender, ComboBoxSelectionChangedEventArgs e)
{
    // Fires as user navigates through items with arrow keys
    var dialog = new ContentDialog
    {
        Content = "Selection changed in real-time!",
        CloseButtonText = "Close"
    };
    dialog.XamlRoot = this.Content.XamlRoot;
    await dialog.ShowAsync();
}
```

**When to use:**
- **Committed:** Better performance, standard behavior for most scenarios
- **Always:** Real-time updates needed (live preview, instant filtering)

## Multiple Selection

Multiple selection allows users to select several items simultaneously.

### Enable Multiple Selection

```xaml
<editors:SfComboBox x:Name="comboBox"
                    SelectionMode="Multiple"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

### Programmatic Multiple Selection

```csharp
// Get ViewModel items
var viewModel = comboBox.DataContext as SocialMediaViewModel;
var items = viewModel.SocialMedias;

// Add items to selection
comboBox.SelectedItems.Add(items[0]);
comboBox.SelectedItems.Add(items[2]);
comboBox.SelectedItems.Add(items[3]);

// Clear all selections
comboBox.SelectedItems.Clear();

// Remove specific item
comboBox.SelectedItems.Remove(items[0]);

// Check if item is selected
bool isSelected = comboBox.SelectedItems.Contains(specificItem);
```

### Checkbox Display

Show/hide checkboxes in multiple selection mode:

```xaml
<!-- With checkboxes (default) -->
<editors:SfComboBox SelectionMode="Multiple"
                    IsMultiSelectCheckBoxEnabled="True"
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />

<!-- Without checkboxes -->
<editors:SfComboBox SelectionMode="Multiple"
                    IsMultiSelectCheckBoxEnabled="False"
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
comboBox.IsMultiSelectCheckBoxEnabled = false;
```

**When to hide checkboxes:**
- Custom item templates that indicate selection differently
- Minimalist UI design
- Touch-optimized interfaces with large clickable areas

### Multiple Selection Display Modes

Two display modes for multiple selections:

#### 1. Delimiter Mode

Selected items separated by a delimiter character.

```xaml
<editors:SfComboBox SelectionMode="Multiple"
                    MultiSelectionDisplayMode="Delimiter"
                    DelimiterText=", "
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

**Custom delimiters:**
```xaml
<!-- Pipe delimiter -->
<editors:SfComboBox DelimiterText=" | " ... />

<!-- Semicolon delimiter -->
<editors:SfComboBox DelimiterText="; " ... />

<!-- Arrow delimiter -->
<editors:SfComboBox DelimiterText=" → " ... />
```

```csharp
comboBox.DelimiterText = " | ";
```

**Characteristics:**
- Compact display
- Read-only (cannot remove individual items by clicking)
- `IsEditable` property has no effect
- Good for space-constrained UIs

**Example output:** `Facebook, Twitter, Instagram, LinkedIn`

#### 2. Token Mode

Selected items displayed as removable tokens (chips).

```xaml
<editors:SfComboBox SelectionMode="Multiple"
                    MultiSelectionDisplayMode="Token"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

**With editing enabled:**
```xaml
<editors:SfComboBox SelectionMode="Multiple"
                    MultiSelectionDisplayMode="Token"
                    IsEditable="True"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

**Characteristics:**
- Visual, interactive display
- Click X button to remove individual tokens
- Supports editable and non-editable modes
- Better for user interaction
- Requires more vertical space

**Token customization** - See [ui-customization.md](ui-customization.md#token-styling)

#### Delimiter vs Token Comparison

| Feature | Delimiter | Token |
|---------|-----------|-------|
| **Visual** | Text string | Individual chips |
| **Remove item** | Must reopen dropdown | Click X on token |
| **Space usage** | Compact | Requires more space |
| **Editing** | Not supported | Supported |
| **Best for** | Read-only display, limited space | Interactive UI, item management |

## Auto-Append UI

Controls how auto-completed text appears in editable mode.

### TextWithSelection (Default)

Appended text appears with selection (highlighted).

```xaml
<editors:SfComboBox IsEditable="True"
                    AutoAppendType="TextWithSelection"
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

**Behavior:** Type "Fac" → "**Fac**<span style="background:blue;color:white">ebook</span>" (selected text)

### Text

Appended text appears with faded foreground (Windows 11 style).

```xaml
<editors:SfComboBox IsEditable="True"
                    AutoAppendType="Text"
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

**Behavior:** Type "Fac" → "**Fac**<span style="opacity:0.5">ebook</span>" (faded text)

**When to use:**
- **TextWithSelection:** Traditional behavior, works across Windows versions
- **Text:** Modern Windows 11 look, matches OS experience

## Selection Events

### SelectionChanged Event

Fires when selection changes (items added or removed).

```xaml
<editors:SfComboBox SelectionChanged="OnComboBoxSelectionChanged"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
private async void OnComboBoxSelectionChanged(object sender, ComboBoxSelectionChangedEventArgs e)
{
    // Items newly selected
    foreach (var item in e.AddedItems)
    {
        var socialMedia = item as SocialMedia;
        Debug.WriteLine($"Added: {socialMedia.Name}");
    }
    
    // Items deselected
    foreach (var item in e.RemovedItems)
    {
        var socialMedia = item as SocialMedia;
        Debug.WriteLine($"Removed: {socialMedia.Name}");
    }
    
    // Show dialog
    var dialog = new ContentDialog
    {
        Content = $"Selected {e.AddedItems.Count} items",
        CloseButtonText = "Close"
    };
    dialog.XamlRoot = this.Content.XamlRoot;
    await dialog.ShowAsync();
}
```

**Event Arguments:**
- **AddedItems:** Collection of newly selected items
- **RemovedItems:** Collection of newly deselected items

### SelectionChanging Event

Fires BEFORE selection changes. Can cancel the change.

```xaml
<editors:SfComboBox SelectionChanging="OnComboBoxSelectionChanging"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
private void OnComboBoxSelectionChanging(object sender, ComboBoxSelectionChangingEventArgs e)
{
    // Prevent selection of specific items
    foreach (var item in e.AddedItems)
    {
        var socialMedia = item as SocialMedia;
        if (socialMedia.Name == "Facebook")
        {
            e.Cancel = true;
            ShowMessage("Facebook cannot be selected");
            return;
        }
    }
    
    // Allow detached selection (items not in list)
    e.AllowDetachedSelection = true;
}
```

**Event Arguments:**
- **AddedItems:** Items being selected
- **RemovedItems:** Items being deselected
- **Cancel:** Set to `true` to prevent selection
- **AllowDetachedSelection:** Allow selection of items not in ItemsSource

**Use cases:**
- Validate selection rules
- Prevent selection of disabled items
- Implement maximum selection count
- Show confirmation before changing selection

### Event Execution Order

1. **SelectionChanging** (can cancel)
2. Selection is updated
3. **SelectionChanged** (after update)

## Best Practices

### 1. Choose Appropriate Selection Mode

```csharp
// Single selection for: primary choice, configuration settings
comboBox.SelectionMode = ComboBoxSelectionMode.Single;

// Multiple selection for: tags, filters, multi-option settings
comboBox.SelectionMode = ComboBoxSelectionMode.Multiple;
```

### 2. Use SelectedItems for Multiple Selection

```csharp
// ❌ DON'T: Use SelectedItem in multiple selection
var item = comboBox.SelectedItem; // Unreliable

// ✅ DO: Use SelectedItems collection
foreach (var item in comboBox.SelectedItems)
{
    ProcessSelection(item);
}
```

### 3. Handle Null Selection

```csharp
private void OnSelectionChanged(object sender, ComboBoxSelectionChangedEventArgs e)
{
    // ❌ DON'T: Assume selection exists
    var item = comboBox.SelectedItem;
    ProcessItem(item.Property); // NullReferenceException!
    
    // ✅ DO: Check for null
    if (comboBox.SelectedItem != null)
    {
        var item = comboBox.SelectedItem as YourModel;
        ProcessItem(item.Property);
    }
}
```

### 4. Choose Display Mode by Use Case

```csharp
// Compact, read-only display
comboBox.MultiSelectionDisplayMode = ComboBoxMultiSelectionDisplayMode.Delimiter;

// Interactive, editable display
comboBox.MultiSelectionDisplayMode = ComboBoxMultiSelectionDisplayMode.Token;
comboBox.IsEditable = true;
```

### 5. Use SelectionChangeTrigger Appropriately

```csharp
// Default: Better performance
comboBox.SelectionChangeTrigger = ComboBoxSelectionChangeTrigger.Committed;

// Real-time updates needed
comboBox.SelectionChangeTrigger = ComboBoxSelectionChangeTrigger.Always;
```

### 6. Initialize Selection After Data Binding

```csharp
// ❌ DON'T: Set selection before ItemsSource
comboBox.SelectedIndex = 2;
comboBox.ItemsSource = items; // Selection lost!

// ✅ DO: Set selection after ItemsSource
comboBox.ItemsSource = items;
comboBox.SelectedIndex = 2; // Reliable
```

### 7. Use ObservableCollection for Dynamic Selection

```csharp
// ViewModel
public ObservableCollection<SocialMedia> SelectedSocialMedias { get; set; }

// Bind to SelectedItems
// Note: Direct binding not supported, use SelectionChanged event
private void OnSelectionChanged(object sender, ComboBoxSelectionChangedEventArgs e)
{
    // Sync with ViewModel
    foreach (var item in e.AddedItems)
        ViewModel.SelectedSocialMedias.Add(item as SocialMedia);
        
    foreach (var item in e.RemovedItems)
        ViewModel.SelectedSocialMedias.Remove(item as SocialMedia);
}
```

## Common Scenarios

### Scenario 1: Pre-Select First Item

```csharp
comboBox.ItemsSource = items;
if (items.Count > 0)
{
    comboBox.SelectedIndex = 0;
}
```

### Scenario 2: Select Multiple Items Programmatically

```csharp
var itemsToSelect = items.Where(x => x.IsDefault).ToList();
foreach (var item in itemsToSelect)
{
    comboBox.SelectedItems.Add(item);
}
```

### Scenario 3: Maximum Selection Limit

```csharp
private void OnSelectionChanging(object sender, ComboBoxSelectionChangingEventArgs e)
{
    const int MaxSelection = 5;
    
    if (comboBox.SelectedItems.Count + e.AddedItems.Count > MaxSelection)
    {
        e.Cancel = true;
        ShowMessage($"Maximum {MaxSelection} items can be selected");
    }
}
```

### Scenario 4: Conditional Selection

```csharp
private void OnSelectionChanging(object sender, ComboBoxSelectionChangingEventArgs e)
{
    // Prevent selection of premium items without subscription
    foreach (var item in e.AddedItems)
    {
        var feature = item as Feature;
        if (feature.IsPremium && !User.HasSubscription)
        {
            e.Cancel = true;
            ShowUpgradeMessage();
            return;
        }
    }
}
```

## Summary

**Key Takeaways:**
- Use `SelectionMode` to enable single or multiple selection
- Access selection via `SelectedItem`/`SelectedIndex` (single) or `SelectedItems` (multiple)
- Choose `Delimiter` for compact display, `Token` for interactive UI
- Handle `SelectionChanged` for post-change logic
- Use `SelectionChanging` to validate or cancel selection
- Set `SelectionChangeTrigger` based on performance needs
- Configure `AutoAppendType` for desired auto-complete appearance
