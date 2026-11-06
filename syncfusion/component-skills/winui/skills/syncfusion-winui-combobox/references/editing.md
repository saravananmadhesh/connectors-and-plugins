# Editing in WinUI ComboBox

> **Requirement:** Update the `Syncfusion.Editors.WinUI` NuGet package to the latest version for full editing capabilities.

## Table of Contents
- [Overview](#overview)
- [Editable Mode](#editable-mode)
- [Non-Editable Mode](#non-editable-mode)
- [Null Value Support](#null-value-support)
- [Opening Dropdown Programmatically](#opening-dropdown-programmatically)
- [Input Validation](#input-validation)
- [Best Practices](#best-practices)

## Overview

The WinUI ComboBox supports both editable and non-editable modes, controlled by the `IsEditable` property.

**Key Editing Properties:**
- **IsEditable:** Enable/disable text editing (default: `false`)
- **AllowNull:** Allow null selection when cleared (default: `false`)
- **IsDropDownOpen:** Programmatically control dropdown state
- **IsTextSearchEnabled:** Enable/disable auto-completion (default: `true`)

## Editable Mode

Editable mode allows users to type directly into the ComboBox text box.

### Enable Editable Mode

```xaml
<editors:SfComboBox x:Name="comboBox"
                    Width="250"
                    IsEditable="True"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
comboBox.IsEditable = true;
```

### Editable Mode Behavior

**Auto-Completion:**
- Type text → Automatically suggests matching items
- First match is appended and highlighted
- Press Enter or Tab to accept suggestion
- Continue typing to refine

**Example:**
- Type "Fac" → Auto-completes to "**Fac**<span style="background:blue;color:white">ebook</span>"
- Press Enter → Selects "Facebook"

**Selection Update:**
- `SelectedItem` updates when:
  - User presses Enter
  - User presses Tab
  - Control loses focus
  - `SelectionChangeTrigger` is `Always` (updates during navigation)

```xaml
<!-- Update on commit (default) -->
<editors:SfComboBox IsEditable="True"
                    SelectionChangeTrigger="Committed"
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />

<!-- Update immediately during typing -->
<editors:SfComboBox IsEditable="True"
                    SelectionChangeTrigger="Always"
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

### Disable Auto-Completion

```xaml
<editors:SfComboBox IsEditable="True"
                    IsTextSearchEnabled="False"
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
comboBox.IsTextSearchEnabled = false;
```

**Effect:**
- No auto-appended text
- No auto-suggestions
- Dropdown doesn't auto-open
- User must manually open dropdown to select

## Non-Editable Mode

Non-editable mode prevents typing; users must select from dropdown.

### Enable Non-Editable Mode

```xaml
<editors:SfComboBox x:Name="comboBox"
                    Width="250"
                    IsEditable="False"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
comboBox.IsEditable = false; // Default
```

### Non-Editable Mode Behavior

**User Interaction:**
- Click to open dropdown
- Use arrow keys to navigate
- Type to search (highlights matching item)
- Press Enter to select highlighted item

**When to use:**
- Fixed list of options
- Prevent free-form input
- Ensure only valid selections
- Simpler UX for small lists

## Null Value Support

Allow users to clear the selection by pressing Delete or Backspace.

### Enable Null Values

```xaml
<editors:SfComboBox IsEditable="True"
                    AllowNull="True"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
comboBox.AllowNull = true;
```

### Behavior with AllowNull

```csharp
// Select an item
comboBox.SelectedItem = items[2];
Debug.WriteLine(comboBox.SelectedItem); // Output: SocialMedia object

// User presses Delete or Backspace
// → Text is cleared
// → SelectedItem becomes null

Debug.WriteLine(comboBox.SelectedItem); // Output: null
```

**Important Notes:**
- Only works when `IsEditable="True"`
- Default: `AllowNull="False"` (pressing Delete keeps previous selection)
- Useful for optional selections

### Handle Null Selection

```csharp
private void ProcessSelection()
{
    if (comboBox.SelectedItem == null)
    {
        // Handle no selection case
        ShowMessage("Please select an item");
        return;
    }
    
    var item = comboBox.SelectedItem as SocialMedia;
    // Process selected item
}
```

## Opening Dropdown Programmatically

Control dropdown visibility through code.

### IsDropDownOpen Property

```xaml
<editors:SfComboBox x:Name="comboBox"
                    IsEditable="True"
                    IsDropDownOpen="{Binding IsOpen, Mode=TwoWay}"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
// Open dropdown
comboBox.IsDropDownOpen = true;

// Close dropdown
comboBox.IsDropDownOpen = false;

// Toggle dropdown
comboBox.IsDropDownOpen = !comboBox.IsDropDownOpen;
```

### Open Dropdown on Key Press

Example: Open dropdown when pressing any alphabet key

```xaml
<editors:SfComboBox x:Name="comboBox"
                    IsEditable="True"
                    PreviewKeyDown="OnEditingComboBoxPreviewKeyDown"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
private void OnEditingComboBoxPreviewKeyDown(object sender, KeyRoutedEventArgs e)
{
    // Open dropdown when pressing alphabet keys (A-Z)
    if (!comboBox.IsDropDownOpen && (int)e.Key >= 65 && (int)e.Key <= 90)
    {
        comboBox.IsDropDownOpen = true;
    }
}
```

### Open Dropdown on Focus

```csharp
private void OnComboBoxGotFocus(object sender, RoutedEventArgs e)
{
    comboBox.IsDropDownOpen = true;
}
```

```xaml
<editors:SfComboBox GotFocus="OnComboBoxGotFocus" ... />
```

## Input Validation

Handle invalid user input with the `InputSubmitted` event.

### InputSubmitted Event

Fires when user enters text that doesn't match any item and:
- Presses Enter
- Tab key pressed
- Control loses focus

```xaml
<editors:SfComboBox x:Name="comboBox"
                    IsEditable="True"
                    InputSubmitted="OnInputSubmitted"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

### Event Arguments

```csharp
private void OnInputSubmitted(object sender, ComboBoxInputSubmittedEventArgs e)
{
    // e.Text: The text entered by user
    // e.Item: Set this to add/select the item
    // e.Handled: Set true to prevent default behavior
}
```

### Example 1: Show Validation Error

```csharp
private async void OnInputSubmitted(object sender, ComboBoxInputSubmittedEventArgs e)
{
    var dialog = new ContentDialog
    {
        Title = "Invalid Selection",
        Content = $"'{e.Text}' is not valid. Please select from the list.",
        CloseButtonText = "OK"
    };
    
    dialog.XamlRoot = this.Content.XamlRoot;
    await dialog.ShowAsync();
    
    // Clear invalid input
    comboBox.Text = string.Empty;
}
```

### Example 2: Add New Item Dynamically (Multiple Selection)

```xaml
<editors:SfComboBox IsEditable="True"
                    SelectionMode="Multiple"
                    MultiSelectionDisplayMode="Token"
                    InputSubmitted="OnInputSubmitted"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
private void OnInputSubmitted(object sender, ComboBoxInputSubmittedEventArgs e)
{
    // Create new item and add to selection
    e.Item = new SocialMedia 
    { 
        Name = e.Text, 
        ID = comboBox.Items.Count 
    };
    
    // Item will be automatically added to SelectedItems
}
```

### Example 3: Suggest Closest Match

```csharp
private async void OnInputSubmitted(object sender, ComboBoxInputSubmittedEventArgs e)
{
    var items = comboBox.ItemsSource as ObservableCollection<SocialMedia>;
    
    // Find closest match using Levenshtein distance
    var closest = items
        .OrderBy(item => LevenshteinDistance(e.Text, item.Name))
        .FirstOrDefault();
    
    if (closest != null)
    {
        var dialog = new ContentDialog
        {
            Title = "Did you mean?",
            Content = $"'{e.Text}' not found. Did you mean '{closest.Name}'?",
            PrimaryButtonText = "Yes",
            CloseButtonText = "No"
        };
        
        dialog.XamlRoot = this.Content.XamlRoot;
        var result = await dialog.ShowAsync();
        
        if (result == ContentDialogResult.Primary)
        {
            comboBox.SelectedItem = closest;
        }
    }
}
```

### Example 4: Prevent Invalid Input

```csharp
private void OnInputSubmitted(object sender, ComboBoxInputSubmittedEventArgs e)
{
    // Mark as handled to prevent any default behavior
    e.Handled = true;
    
    // Show error
    ShowErrorMessage($"'{e.Text}' is not a valid option");
    
    // Keep previous selection (don't change anything)
}
```

## Best Practices

### 1. Choose Mode Based on Use Case

```csharp
// ✅ Editable: Large list, filtering needed
comboBox.IsEditable = true;
comboBox.IsFilteringEnabled = true;

// ✅ Non-editable: Small list, prevent free-form input
comboBox.IsEditable = false;
```

### 2. Enable AllowNull for Optional Fields

```csharp
// Optional field
comboBox.AllowNull = true;

// Required field
comboBox.AllowNull = false;
```

### 3. Always Handle InputSubmitted in Editable Mode

```csharp
// ❌ DON'T: Leave InputSubmitted unhandled
<editors:SfComboBox IsEditable="True" />

// ✅ DO: Validate user input
<editors:SfComboBox IsEditable="True"
                    InputSubmitted="OnInputSubmitted" />
```

### 4. Use SelectionChangeTrigger Appropriately

```csharp
// Default: Better UX for most cases
comboBox.SelectionChangeTrigger = ComboBoxSelectionChangeTrigger.Committed;

// Real-time: For dependent dropdowns, live preview
comboBox.SelectionChangeTrigger = ComboBoxSelectionChangeTrigger.Always;
```

### 5. Combine with Filtering for Better UX

```xaml
<!-- Good editable ComboBox setup -->
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    AllowNull="True"
                    PlaceholderText="Type to search..."
                    InputSubmitted="OnInputSubmitted"
                    ItemsSource="{Binding Items}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

### 6. Preserve Selection State

```csharp
// ❌ DON'T: Clear selection on invalid input without user confirmation
private void OnInputSubmitted(object sender, ComboBoxInputSubmittedEventArgs e)
{
    comboBox.SelectedItem = null; // Loses user's previous choice!
}

// ✅ DO: Keep previous selection or ask user
private void OnInputSubmitted(object sender, ComboBoxInputSubmittedEventArgs e)
{
    e.Handled = true; // Keeps previous selection
    ShowError($"'{e.Text}' is invalid");
}
```

### 7. Consider SelectionBoxItemTemplate Limitation

```xaml
<!-- ❌ DOESN'T WORK: Custom template in editable mode -->
<editors:SfComboBox IsEditable="True"
                    SelectionBoxItemTemplate="{StaticResource CustomTemplate}" />
<!-- Template is ignored in editable mode (text input replaces selection box) -->

<!-- ✅ DO: Use ItemTemplate for dropdown customization -->
<editors:SfComboBox IsEditable="True"
                    ItemTemplate="{StaticResource CustomTemplate}" />
```

## Common Scenarios

### Scenario 1: Auto-Complete Search Box

```xaml
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    TextSearchMode="Contains"
                    PlaceholderText="Search..."
                    ItemsSource="{Binding SearchResults}"
                    DisplayMemberPath="Title"
                    TextMemberPath="Title"
                    InputSubmitted="OnSearchInputSubmitted" />
```

### Scenario 2: Category Selection (Non-Editable)

```xaml
<editors:SfComboBox IsEditable="False"
                    PlaceholderText="Select category"
                    ItemsSource="{Binding Categories}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name"
                    SelectedIndex="0" />
```

### Scenario 3: Tag Input with Free-Form Entry

```xaml
<editors:SfComboBox IsEditable="True"
                    SelectionMode="Multiple"
                    MultiSelectionDisplayMode="Token"
                    PlaceholderText="Add tags..."
                    ItemsSource="{Binding AvailableTags}"
                    InputSubmitted="OnTagInputSubmitted"
                    DisplayMemberPath="TagName"
                    TextMemberPath="TagName" />
```

```csharp
private void OnTagInputSubmitted(object sender, ComboBoxInputSubmittedEventArgs e)
{
    // Allow creating new tags
    e.Item = new Tag { TagName = e.Text, ID = Guid.NewGuid() };
}
```

### Scenario 4: Dependent Dropdowns

```xaml
<editors:SfComboBox x:Name="countryComboBox"
                    IsEditable="False"
                    SelectionChangeTrigger="Always"
                    SelectionChanged="OnCountryChanged"
                    ItemsSource="{Binding Countries}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />

<editors:SfComboBox x:Name="cityComboBox"
                    IsEditable="True"
                    IsFilteringEnabled="True"
                    ItemsSource="{Binding Cities}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
private void OnCountryChanged(object sender, ComboBoxSelectionChangedEventArgs e)
{
    if (e.AddedItems.Count > 0)
    {
        var country = e.AddedItems[0] as Country;
        viewModel.LoadCities(country.ID);
    }
}
```

## Summary

**Key Takeaways:**
- Set `IsEditable="True"` to allow text input and auto-completion
- Use `AllowNull="True"` for optional selections in editable mode
- Handle `InputSubmitted` event to validate user input
- Control dropdown with `IsDropDownOpen` property
- Use `SelectionChangeTrigger` to control when selection updates
- Disable auto-completion with `IsTextSearchEnabled="False"` if needed
- Choose editable for large lists with filtering, non-editable for strict selection
