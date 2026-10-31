# Searching in WinUI ComboBox

> **Prerequisites:** Ensure the `Syncfusion.Editors.WinUI` NuGet package is installed and updated to the latest version for optimal search performance.

This guide covers text searching functionality in the WinUI ComboBox control, including auto-completion, search modes, and custom search behaviors.

## Overview

The ComboBox provides rich text searching that highlights matching items as users type. Search behavior is configured through `TextSearchMode` and `IsTextSearchEnabled` properties.

## Search Based on Member Path

### TextMemberPath vs DisplayMemberPath

- **TextMemberPath:** Property used for searching in editable mode (selection box)
- **DisplayMemberPath:** Property used for searching in non-editable mode (dropdown)

```xaml
<editors:SfComboBox ItemsSource="{Binding SocialMedias}"
                    TextMemberPath="Name"
                    DisplayMemberPath="Name" />
```

**When both are empty:** Searches based on class name with namespace

### Editable Mode Searching

Searches based on `TextMemberPath`:

```xaml
<editors:SfComboBox IsEditable="True"
                    IsTextSearchEnabled="True"
                    ItemsSource="{Binding SocialMedias}"
                    TextMemberPath="ID"
                    DisplayMemberPath="Name" />
```

Type "4" → Searches by ID property

### Non-Editable Mode Searching

Searches based on `DisplayMemberPath`:

```xaml
<editors:SfComboBox IsEditable="False"
                    IsTextSearchEnabled="True"
                    ItemsSource="{Binding SocialMedias}"
                    TextMemberPath="Name"
                    DisplayMemberPath="ID" />
```

Type "4" in dropdown → Searches by ID property

## Auto-Appending Text

Automatically append matching text as user types (editable mode only):

```xaml
<editors:SfComboBox IsEditable="True"
                    ItemsSource="{Binding SocialMedias}"
                    TextMemberPath="Name"
                    DisplayMemberPath="Name" />
```

**Behavior:**
- Type "Fac" → Auto-appends "**Fac**<span style="background:blue;color:white">ebook</span>"
- Continue typing or press Enter to accept

**Requirements:**
- Only works in editable mode (`IsEditable="True"`)
- Only with `TextSearchMode="StartsWith"`
- `IsTextSearchEnabled` must be `true` (default)

## Search Modes

### StartsWith Mode (Default)

Highlights first item starting with entered text:

```xaml
<editors:SfComboBox TextSearchMode="StartsWith"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
comboBox.TextSearchMode = ComboBoxTextSearchMode.StartsWith;
```

**Single Selection:**
- Type "Tw" → Highlights "Twitter"
- Auto-appends in editable mode

**Multiple Selection:**
```xaml
<editors:SfComboBox SelectionMode="Multiple"
                    TextSearchMode="StartsWith"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

### Contains Mode

Highlights first item containing entered text:

```xaml
<editors:SfComboBox IsEditable="True"
                    TextSearchMode="Contains"
                    ItemsSource="{Binding SocialMedias}"
                    TextMemberPath="Name"
                    DisplayMemberPath="Name" />
```

```csharp
comboBox.TextSearchMode = ComboBoxTextSearchMode.Contains;
```

**Behavior:**
- Type "book" → Highlights "Facebook"
- No auto-append (ambiguous)

## Diacritic Sensitivity

Control whether accents/diacritics are considered in search:

```xaml
<editors:SfComboBox IsEditable="True"
                    IgnoreDiacritic="False"
                    ItemsSource="{Binding SocialMedias}"
                    TextMemberPath="Name"
                    DisplayMemberPath="Name" />
```

```csharp
comboBox.IgnoreDiacritic = false;
```

**Default:** `true` (ignores diacritics)
- "cafe" matches "café"
- "naïve" matches "naive"

**Set to false:**
- "cafe" does NOT match "café"
- Exact character matching required

## Custom Search Behavior

Implement custom search logic using `IComboBoxSearchBehavior`.

### Step 1: Create Custom Search Class

```csharp
using Syncfusion.UI.Xaml.Editors;

/// <summary>
/// Custom search that highlights items matching entered length
/// </summary>
public class StringLengthSearchingBehavior : IComboBoxSearchBehavior
{
    private int charLength;
    
    /// <summary>
    /// Return the index to highlight based on custom logic
    /// </summary>
    public int GetHighlightIndex(SfComboBox source, ComboBoxSearchInfo searchInfo)
    {
        // Try to parse entered text as length
        if (int.TryParse(searchInfo.Text, out this.charLength))
        {
            // Find first item with matching name length
            var fullMatch = searchInfo.FilteredItems
                .OfType<SocialMedia>()
                .FirstOrDefault(i => i.Name.Length == charLength);
            
            if (fullMatch != null)
            {
                return searchInfo.FilteredItems.IndexOf(fullMatch);
            }
        }
        
        return -1; // No match
    }
}
```

### Step 2: Apply Custom Search

```xaml
<editors:SfComboBox IsEditable="True"
                    ItemsSource="{Binding SocialMedias}"
                    TextMemberPath="Name"
                    DisplayMemberPath="Name">
    <editors:SfComboBox.SearchBehavior>
        <local:StringLengthSearchingBehavior />
    </editors:SfComboBox.SearchBehavior>
</editors:SfComboBox>
```

### Custom Search Examples

#### Example 1: Priority Search (Capitals First)

```csharp
public class PrioritySearchBehavior : IComboBoxSearchBehavior
{
    public int GetHighlightIndex(SfComboBox source, ComboBoxSearchInfo searchInfo)
    {
        var cities = searchInfo.FilteredItems.OfType<CityInfo>().ToList();
        
        // First, try to find matching capital
        var capital = cities.FirstOrDefault(c => 
            c.IsCapital && 
            c.CityName.StartsWith(searchInfo.Text, StringComparison.OrdinalIgnoreCase));
        
        if (capital != null)
            return searchInfo.FilteredItems.IndexOf(capital);
        
        // Otherwise, return first match
        var match = cities.FirstOrDefault(c => 
            c.CityName.StartsWith(searchInfo.Text, StringComparison.OrdinalIgnoreCase));
        
        return match != null ? searchInfo.FilteredItems.IndexOf(match) : -1;
    }
}
```

#### Example 2: Multi-Property Search

```csharp
public class MultiPropertySearchBehavior : IComboBoxSearchBehavior
{
    public int GetHighlightIndex(SfComboBox source, ComboBoxSearchInfo searchInfo)
    {
        var employees = searchInfo.FilteredItems.OfType<Employee>().ToList();
        
        // Search across multiple properties
        var match = employees.FirstOrDefault(e =>
            e.FirstName.Contains(searchInfo.Text, StringComparison.OrdinalIgnoreCase) ||
            e.LastName.Contains(searchInfo.Text, StringComparison.OrdinalIgnoreCase) ||
            e.Email.Contains(searchInfo.Text, StringComparison.OrdinalIgnoreCase) ||
            e.EmployeeID.ToString().Contains(searchInfo.Text));
        
        return match != null ? searchInfo.FilteredItems.IndexOf(match) : -1;
    }
}
```

### IComboBoxSearchBehavior Interface

**Method:** `GetHighlightIndex`

**Parameters:**
- **source:** The ComboBox control (access ItemsSource, Items)
- **searchInfo:** Contains:
  - `Text`: User's input
  - `FilteredItems`: Current filtered items list

**Return:**
- Index of item to highlight in `FilteredItems` collection
- Return `-1` for no match

## Disable Searching

Disable both searching and auto-append:

```xaml
<editors:SfComboBox IsTextSearchEnabled="False"
                    IsEditable="True"
                    ItemsSource="{Binding SocialMedias}"
                    TextMemberPath="Name"
                    DisplayMemberPath="Name" />
```

```csharp
comboBox.IsTextSearchEnabled = false;
```

**Effect:**
- No highlighting as user types
- No auto-append text
- Dropdown doesn't auto-open
- User must manually navigate dropdown

## Best Practices

### 1. Choose Appropriate Search Mode

```csharp
// Predictable data (cities, names, codes)
comboBox.TextSearchMode = ComboBoxTextSearchMode.StartsWith;

// Flexible search (descriptions, long text)
comboBox.TextSearchMode = ComboBoxTextSearchMode.Contains;
```

### 2. Set Both Member Paths

```xaml
<!-- ✅ DO: Set both for complex objects -->
<editors:SfComboBox TextMemberPath="Name"
                    DisplayMemberPath="Name" />

<!-- ❌ DON'T: Leave empty for non-string objects -->
<editors:SfComboBox ItemsSource="{Binding People}" />
<!-- Searches by class name! -->
```

### 3. Consider Diacritic Settings by Locale

```csharp
// English-only app
comboBox.IgnoreDiacritic = true; // Simpler

// International app with European languages
comboBox.IgnoreDiacritic = true; // User-friendly

// App requiring exact matches
comboBox.IgnoreDiacritic = false; // Precise
```

### 4. Optimize Custom Search

```csharp
// ❌ DON'T: Iterate multiple times
public int GetHighlightIndex(SfComboBox source, ComboBoxSearchInfo searchInfo)
{
    var list = searchInfo.FilteredItems.OfType<Item>().ToList();
    var match1 = list.FirstOrDefault(x => x.Prop1.Contains(searchInfo.Text));
    if (match1 == null)
        match1 = list.FirstOrDefault(x => x.Prop2.Contains(searchInfo.Text));
    // ...
}

// ✅ DO: Single pass with combined condition
public int GetHighlightIndex(SfComboBox source, ComboBoxSearchInfo searchInfo)
{
    var match = searchInfo.FilteredItems
        .OfType<Item>()
        .FirstOrDefault(x => 
            x.Prop1.Contains(searchInfo.Text) || 
            x.Prop2.Contains(searchInfo.Text));
    
    return match != null ? searchInfo.FilteredItems.IndexOf(match) : -1;
}
```

## Common Scenarios

### Scenario 1: Employee Search by Name or ID

```csharp
public class EmployeeSearchBehavior : IComboBoxSearchBehavior
{
    public int GetHighlightIndex(SfComboBox source, ComboBoxSearchInfo searchInfo)
    {
        var employees = searchInfo.FilteredItems.OfType<Employee>().ToList();
        
        // Search by name or employee ID
        var match = employees.FirstOrDefault(e =>
            e.FullName.Contains(searchInfo.Text, StringComparison.OrdinalIgnoreCase) ||
            e.EmployeeID.ToString().StartsWith(searchInfo.Text));
        
        return match != null ? searchInfo.FilteredItems.IndexOf(match) : -1;
    }
}
```

### Scenario 2: Case-Sensitive Search

```csharp
public class CaseSensitiveSearchBehavior : IComboBoxSearchBehavior
{
    public int GetHighlightIndex(SfComboBox source, ComboBoxSearchInfo searchInfo)
    {
        var match = searchInfo.FilteredItems
            .OfType<YourModel>()
            .FirstOrDefault(item => 
                item.Name.StartsWith(searchInfo.Text, StringComparison.Ordinal)); // Case-sensitive
        
        return match != null ? searchInfo.FilteredItems.IndexOf(match) : -1;
    }
}
```

### Scenario 3: Numeric Range Search

```csharp
public class NumericRangeSearchBehavior : IComboBoxSearchBehavior
{
    public int GetHighlightIndex(SfComboBox source, ComboBoxSearchInfo searchInfo)
    {
        if (int.TryParse(searchInfo.Text, out int value))
        {
            var match = searchInfo.FilteredItems
                .OfType<Product>()
                .FirstOrDefault(p => p.Price <= value);
            
            return match != null ? searchInfo.FilteredItems.IndexOf(match) : -1;
        }
        
        return -1;
    }
}
```

## Summary

**Key Takeaways:**
- Use `TextMemberPath` for editable mode search, `DisplayMemberPath` for non-editable
- `StartsWith` mode enables auto-append, `Contains` mode does not
- Implement `IComboBoxSearchBehavior` for custom search logic
- Return item index from `GetHighlightIndex` method
- Set `IsTextSearchEnabled="False"` to disable all search functionality
- Control diacritic sensitivity with `IgnoreDiacritic` property
- Auto-append only works with editable mode and StartsWith search
