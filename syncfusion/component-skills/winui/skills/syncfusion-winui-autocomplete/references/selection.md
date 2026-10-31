# Selection in AutoComplete

This guide covers how to configure and handle selection in the Syncfusion WinUI AutoComplete control, including single and multiple selection modes.

## Selection Modes

The AutoComplete supports two selection modes configured via the `SelectionMode` property:
- **Single** - Select one item at a time
- **Multiple** - Select multiple items displayed as tokens

## Single Selection

### Configuration

```xaml
<editors:SfAutoComplete x:Name="autoComplete"
                        SelectionMode="Single"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        Width="250" />
```

```csharp
autoComplete.SelectionMode = AutoCompleteSelectionMode.Single;
```

### How It Works

**User interaction:**
1. User types in the text box
2. Dropdown shows filtered suggestions
3. User navigates and selects an item (Enter/Tab/Click)
4. Selected text appears in the selection box
5. Dropdown closes

**Retrieving selected item:**

```csharp
// Get the selected item object
var selected = autoComplete.SelectedItem;

if (selected is SocialMedia media)
{
    string name = media.Name;
    int id = media.ID;
}
```

## Multiple Selection

### Configuration

```xaml
<editors:SfAutoComplete x:Name="autoComplete"
                        SelectionMode="Multiple"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        Width="250" />
```

```csharp
autoComplete.SelectionMode = AutoCompleteSelectionMode.Multiple;
```

### Token Display

Selected items appear as **tokens** (chips) with:
- Item text
- Close button (X) to remove individual items
- Customizable appearance

**Example:**
```
[Facebook X] [Twitter X] [Instagram X] |_____
```

### Retrieving Multiple Selections

```csharp
// Get collection of selected items
var selectedItems = autoComplete.SelectedItems;

foreach (var item in selectedItems)
{
    if (item is SocialMedia media)
    {
        Console.WriteLine(media.Name);
    }
}
```

## Auto-Append UI

The auto-append feature suggests completion as you type, with two display modes:

### TextWithSelection Mode

Appended text appears highlighted/selected:

```xaml
<editors:SfAutoComplete AppendType="TextWithSelection"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name" />
```

**Behavior:** Type "Fac" → Shows "Fac**ebook**" (selected portion can be overwritten)

### Text Mode

Appended text appears with faded foreground (Windows 11 style):

```xaml
<editors:SfAutoComplete AppendType="Text"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name" />
```

**Behavior:** Type "Fac" → Shows "Fac" with faded "ebook"

## Selection Events

### SelectionChanged Event

Triggered when selection changes:

```xaml
<editors:SfAutoComplete x:Name="autoComplete"
                        SelectionChanged="OnSelectionChanged"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name" />
```

```csharp
private async void OnSelectionChanged(object sender, AutoCompleteSelectionChangedEventArgs e)
{
    // Get newly selected items
    foreach (var item in e.AddedItems)
    {
        Console.WriteLine($"Added: {(item as SocialMedia)?.Name}");
    }

    // Get removed items
    foreach (var item in e.RemovedItems)
    {
        Console.WriteLine($"Removed: {(item as SocialMedia)?.Name}");
    }

    // Show dialog
    var cd = new ContentDialog
    {
        Content = "Selection changed.",
        CloseButtonText = "Close"
    };
    cd.XamlRoot = this.Content.XamlRoot;
    await cd.ShowAsync();
}
```

**Event Args Properties:**
- `AddedItems` - Items that were just selected
- `RemovedItems` - Items that were deselected

## SelectedValue and SelectedValuePath

Extract specific property values from selected objects:

### Configuration

```xaml
<editors:SfAutoComplete x:Name="autoComplete"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        SelectedValuePath="ID"
                        SelectionChanged="OnSelectionChanged" />

<TextBlock Text="Selected ID:"/>
<TextBlock x:Name="selectedValueText"/>
```

```csharp
private void OnSelectionChanged(object sender, AutoCompleteSelectionChangedEventArgs e)
{
    // SelectedItem is the full SocialMedia object
    // SelectedValue is just the ID property value
    if (autoComplete.SelectedValue != null)
    {
        selectedValueText.Text = autoComplete.SelectedValue.ToString();
    }
}
```

**Example:** If user selects "Facebook" (ID=0), `SelectedValue` returns `0`, not the full `SocialMedia` object.

## Handling Invalid Input

### InputSubmitted Event

Triggered when user enters text that doesn't match any item and presses Enter:

```xaml
<editors:SfAutoComplete x:Name="autoComplete"
                        InputSubmitted="OnInputSubmitted"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name" />
```

```csharp
private async void OnInputSubmitted(object sender, AutoCompleteInputSubmittedEventArgs e)
{
    // e.Text - The text user entered
    // e.Item - Can be set to add custom item
    // e.Handled - Set true to prevent default behavior

    var cd = new ContentDialog
    {
        Content = $"'{e.Text}' is not in the list. Please select from the suggestions.",
        CloseButtonText = "OK"
    };
    cd.XamlRoot = this.Content.XamlRoot;
    await cd.ShowAsync();

    // Prevent adding invalid item
    e.Handled = true;
}
```

**Use cases:**
- Show validation message for invalid entries
- Dynamically add new items to collection
- Suggest alternatives

## Hide Clear Button

Remove the "X" clear button from the editor:

```xaml
<editors:SfAutoComplete ShowClearButton="False"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name" />
```

```csharp
autoComplete.ShowClearButton = false;
```

**Default:** `ShowClearButton="True"`

## Common Patterns

### Pattern 1: Required Single Selection

```xaml
<editors:SfAutoComplete SelectionMode="Single"
                        InputSubmitted="ValidateSelection"
                        ItemsSource="{Binding Countries}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        PlaceholderText="Select a country (required)" />
```

```csharp
private async void ValidateSelection(object sender, AutoCompleteInputSubmittedEventArgs e)
{
    // Reject invalid input
    var cd = new ContentDialog
    {
        Content = "Please select a valid country from the list.",
        CloseButtonText = "OK"
    };
    cd.XamlRoot = this.Content.XamlRoot;
    await cd.ShowAsync();
    
    e.Handled = true;
}
```

### Pattern 2: Multi-Select Tags

```xaml
<editors:SfAutoComplete SelectionMode="Multiple"
                        ItemsSource="{Binding AvailableTags}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        PlaceholderText="Add tags..." />
```

### Pattern 3: Track Selection Changes

```csharp
private void OnSelectionChanged(object sender, AutoCompleteSelectionChangedEventArgs e)
{
    // Update ViewModel or perform action
    foreach (var added in e.AddedItems)
    {
        viewModel.AddSelection(added as SocialMedia);
    }
    
    foreach (var removed in e.RemovedItems)
    {
        viewModel.RemoveSelection(removed as SocialMedia);
    }
}
```

## Key Properties Summary

| Property | Type | Description |
|----------|------|-------------|
| `SelectionMode` | `AutoCompleteSelectionMode` | `Single` or `Multiple` |
| `SelectedItem` | `object` | Selected item in single mode |
| `SelectedItems` | `ObservableCollection<object>` | Selected items in multiple mode |
| `SelectedValue` | `object` | Value of `SelectedValuePath` property |
| `SelectedValuePath` | `string` | Property path for value extraction |
| `AppendType` | `AutoCompleteAppendType` | Auto-append UI style |
| `ShowClearButton` | `bool` | Show/hide clear button |

## Next Steps

- **Searching:** Configure filtering behavior → [searching-filtering.md](searching-filtering.md)
- **Customization:** Style tokens and templates → [ui-customization.md](ui-customization.md)
