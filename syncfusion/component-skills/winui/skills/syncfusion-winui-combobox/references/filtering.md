# Filtering in WinUI ComboBox

> **Important:** Ensure the `Syncfusion.Editors.WinUI` NuGet package is updated to the latest version for full filtering functionality.

## Table of Contents
- [Overview](#overview)
- [Enable Filtering](#enable-filtering)
- [Filter Modes](#filter-modes)
- [Custom Filtering](#custom-filtering)
- [Best Practices](#best-practices)

## Overview

The WinUI ComboBox provides built-in filtering functionality that dynamically filters items as the user types. Filtering starts immediately when text is entered in the editable text box.

**Key Filtering Properties:**
- **IsFilteringEnabled:** Enable/disable filtering (default: `false`)
- **IsEditable:** Must be `true` for filtering to work
- **TextSearchMode:** Filter algorithm (`StartsWith` or `Contains`)
- **FilterBehavior:** Custom filtering logic

## ⚠️ Security Notice: Third-Party Content Exposure

When implementing custom filtering or data binding in ComboBox, be aware of security risks related to external content:

**Critical Security Practices:**
- ✅ **Only use trusted internal data sources** for ItemsSource
- ✅ **Validate all external data** before displaying in the ComboBox
- ✅ **Use embedded resources or local files** for images (`ms-appx:///` or `file:///`)
- ✅ **Never bind directly to external URLs** without validation (e.g., PhotoUrl, IconUrl from untrusted sources)
- ✅ **Implement custom FilterBehavior carefully** - ensure filtering logic doesn't enable injection attacks
- ✅ **Sanitize user input** in custom filter implementations
- ✅ **Use whitelisting** for allowed data sources if external APIs must be used

**What NOT to Do:**
- ❌ Don't bind `Image.Source="{Binding IconUrl}"` to untrusted external URLs
- ❌ Don't fetch data from arbitrary APIs without validation
- ❌ Don't pass unsanitized user input directly to external services
- ❌ Don't display unvalidated third-party content in filtered results

## Enable Filtering

Filtering requires both `IsFilteringEnabled` and `IsEditable` set to `true`.

### Basic Filtering Setup

```xaml
<editors:SfComboBox x:Name="comboBox"
                    IsEditable="True"
                    IsFilteringEnabled="True"
                    ItemsSource="{Binding Cities}"
                    DisplayMemberPath="CityName"
                    TextMemberPath="CityName"
                    PlaceholderText="Type to filter..." />
```

```csharp
comboBox.IsFilteringEnabled = true;
comboBox.IsEditable = true;
```

**Behavior:**
- Dropdown opens automatically as you type
- Items are filtered based on entered text
- First match is highlighted
- Press Enter or click to select

### Complete Example with ViewModel

**Model:**
```csharp
public class CityInfo
{
    public string CityName { get; set; }
    public string CountryName { get; set; }
    public bool IsCapital { get; set; }
}
```

**ViewModel:**
```csharp
public class CityViewModel
{
    public ObservableCollection<CityInfo> Cities { get; set; }
    
    public CityViewModel()
    {
        Cities = new ObservableCollection<CityInfo>
        {
            new CityInfo { CityName = "Chicago", CountryName = "USA" },
            new CityInfo { CityName = "Los Angeles", CountryName = "USA" },
            new CityInfo { CityName = "Houston", CountryName = "USA" },
            new CityInfo { CityName = "New York", CountryName = "USA" },
            new CityInfo { CityName = "Washington", CountryName = "USA", IsCapital = true },
            new CityInfo { CityName = "Chennai", CountryName = "India" },
            new CityInfo { CityName = "Delhi", CountryName = "India", IsCapital = true },
            new CityInfo { CityName = "Mumbai", CountryName = "India" },
            new CityInfo { CityName = "London", CountryName = "England", IsCapital = true },
            new CityInfo { CityName = "Berlin", CountryName = "Germany", IsCapital = true },
            new CityInfo { CityName = "Paris", CountryName = "France", IsCapital = true },
            new CityInfo { CityName = "Tokyo", CountryName = "Japan", IsCapital = true }
        };
    }
}
```

**XAML:**
```xaml
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    ItemsSource="{Binding Cities}"
                    DisplayMemberPath="CityName"
                    TextMemberPath="CityName"
                    PlaceholderText="Search cities...">
    <editors:SfComboBox.DataContext>
        <local:CityViewModel />
    </editors:SfComboBox.DataContext>
</editors:SfComboBox>
```

## Filter Modes

The `TextSearchMode` property controls the filtering algorithm.

### StartsWith Mode (Default)

Filters items that start with the entered text. First match is auto-appended.

```xaml
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    TextSearchMode="StartsWith"
                    ItemsSource="{Binding Cities}"
                    DisplayMemberPath="CityName"
                    TextMemberPath="CityName" />
```

```csharp
comboBox.TextSearchMode = ComboBoxTextSearchMode.StartsWith;
```

**Example:**
- Type "Chi" → Matches: "Chicago", "Chennai" (not "Munich")
- First match "Chicago" is highlighted and auto-appended
- Case-insensitive and accent-insensitive by default

**When to use:**
- Predictable datasets (cities, countries, categories)
- When users know the beginning of item names
- Better performance with large datasets

### Contains Mode

Filters items that contain the entered text anywhere. First match is highlighted but NOT auto-appended.

```xaml
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    TextSearchMode="Contains"
                    ItemsSource="{Binding Cities}"
                    DisplayMemberPath="CityName"
                    TextMemberPath="CityName" />
```

```csharp
comboBox.TextSearchMode = ComboBoxTextSearchMode.Contains;
```

**Example:**
- Type "on" → Matches: "London", "Washington", "Boston"
- Type "new" → Matches: "New York", "New Delhi"
- No auto-append (would be ambiguous)

**When to use:**
- Flexible searching required
- Users don't know exact beginnings
- Searching within longer descriptive text

### Disable Auto-Append

Even in StartsWith mode, you can disable auto-completion:

```xaml
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    IsTextSearchEnabled="False"
                    TextSearchMode="StartsWith"
                    ItemsSource="{Binding Cities}"
                    DisplayMemberPath="CityName"
                    TextMemberPath="CityName" />
```

```csharp
comboBox.IsTextSearchEnabled = false;
```

**Effect:**
- Filtering still works
- Items are filtered in dropdown
- No auto-appended or highlighted text

## Custom Filtering

Implement custom filtering logic for complex scenarios like:
- Searching across multiple properties
- Fuzzy matching
- Special sorting of results
- Filtering based on complex criteria

**⚠️ Security Warning:** When implementing custom filtering with external data sources (APIs, databases), always validate and sanitize data before returning filtered results. Never trust untrusted third-party data.

### Step 1: Create Custom Filter Behavior Class

Implement `IComboBoxFilterBehavior` interface:

```csharp
using Syncfusion.UI.Xaml.Editors;
using System.Collections.Generic;
using System.Linq;

/// <summary>
/// Custom filtering that searches both city and country names
/// </summary>
public class CityFilteringBehavior : IComboBoxFilterBehavior
{
    /// <summary>
    /// Returns indices of filtered items based on custom logic
    /// </summary>
    public List<int> GetMatchingIndexes(SfComboBox source, ComboBoxFilterInfo filterInfo)
    {
        var filteredList = new List<int>();
        var cityItems = source.Items.OfType<CityInfo>().ToList();
        
        // Filter by city name OR country name
        filteredList.AddRange(
            from CityInfo item in cityItems
            where item.CityName.StartsWith(filterInfo.Text, StringComparison.OrdinalIgnoreCase) ||
                  item.CountryName.StartsWith(filterInfo.Text, StringComparison.OrdinalIgnoreCase)
            select cityItems.IndexOf(item)
        );
        
        return filteredList;
    }
}
```

**Method Parameters:**
- **source:** The ComboBox control (access ItemsSource, Items, etc.)
- **filterInfo:** Contains `Text` property with user's input

**Return Value:**
- List of integers representing indices of items to show in filtered dropdown
- Empty list = no matches

### Step 2: Apply Custom Filter Behavior

```xaml
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    ItemsSource="{Binding Cities}"
                    DisplayMemberPath="CityName"
                    TextMemberPath="CityName">
    <editors:SfComboBox.FilterBehavior>
        <local:CityFilteringBehavior />
    </editors:SfComboBox.FilterBehavior>
</editors:SfComboBox>
```

**Example Behavior:**
- Type "USA" → Shows all US cities (filtered by country)
- Type "London" → Shows London (filtered by city)
- Type "ind" → Shows Chennai, Delhi, Mumbai (filtered by country "India")

### Advanced Custom Filtering Examples

#### Example 1: Priority Sorting (Capitals First)

```csharp
public class CapitalPriorityFilterBehavior : IComboBoxFilterBehavior
{
    public List<int> GetMatchingIndexes(SfComboBox source, ComboBoxFilterInfo filterInfo)
    {
        var cityItems = source.Items.OfType<CityInfo>().ToList();
        
        // Filter matching cities
        var matchingCities = cityItems
            .Where(c => c.CityName.Contains(filterInfo.Text, StringComparison.OrdinalIgnoreCase))
            .OrderByDescending(c => c.IsCapital) // Capitals first
            .ThenBy(c => c.CityName);
        
        // Return indices in original collection
        return matchingCities.Select(city => cityItems.IndexOf(city)).ToList();
    }
}
```

#### Example 2: Fuzzy Matching with Levenshtein Distance

```csharp
public class FuzzyFilterBehavior : IComboBoxFilterBehavior
{
    public List<int> GetMatchingIndexes(SfComboBox source, ComboBoxFilterInfo filterInfo)
    {
        var cityItems = source.Items.OfType<CityInfo>().ToList();
        var filtered = new List<int>();
        
        foreach (var city in cityItems)
        {
            // Calculate similarity score
            int distance = LevenshteinDistance(
                filterInfo.Text.ToLower(), 
                city.CityName.ToLower()
            );
            
            // Include if distance is small (similar enough)
            if (distance <= 3)
            {
                filtered.Add(cityItems.IndexOf(city));
            }
        }
        
        return filtered;
    }
    
    private int LevenshteinDistance(string s, string t)
    {
        // Implementation of Levenshtein algorithm
        // ... (standard algorithm code)
    }
}
```

#### Example 3: Multi-Property Search with Highlighting

```csharp
public class MultiPropertyFilterBehavior : IComboBoxFilterBehavior
{
    public List<int> GetMatchingIndexes(SfComboBox source, ComboBoxFilterInfo filterInfo)
    {
        var filteredList = new List<int>();
        var items = source.Items.OfType<Employee>().ToList();
        
        // Search in multiple properties
        filteredList.AddRange(
            from Employee item in items
            where item.FirstName.Contains(filterInfo.Text, StringComparison.OrdinalIgnoreCase) ||
                  item.LastName.Contains(filterInfo.Text, StringComparison.OrdinalIgnoreCase) ||
                  item.Email.Contains(filterInfo.Text, StringComparison.OrdinalIgnoreCase) ||
                  item.Department.Contains(filterInfo.Text, StringComparison.OrdinalIgnoreCase)
            select items.IndexOf(item)
        );
        
        return filteredList;
    }
}
```

### Custom Filtering Pattern

```csharp
public class YourCustomFilterBehavior : IComboBoxFilterBehavior
{
    public List<int> GetMatchingIndexes(SfComboBox source, ComboBoxFilterInfo filterInfo)
    {
        // 1. Get items as typed collection
        var items = source.Items.OfType<YourModel>().ToList();
        
        // 2. Apply your custom filter logic
        var matchingItems = items.Where(item => 
        {
            // Your custom filter criteria here
            return /* boolean condition */;
        });
        
        // 3. Return indices of matching items
        return matchingItems.Select(item => items.IndexOf(item)).ToList();
    }
}
```

## Filtering with Multiple Selection

Filtering works in multiple selection mode:

```xaml
<editors:SfComboBox SelectionMode="Multiple"
                    MultiSelectionDisplayMode="Token"
                    IsEditable="True"
                    IsFilteringEnabled="True"
                    TextSearchMode="Contains"
                    ItemsSource="{Binding Tags}"
                    DisplayMemberPath="TagName"
                    TextMemberPath="TagName" />
```

**Behavior:**
- Type in token input area
- Dropdown shows filtered items
- Select multiple filtered items
- Each selection becomes a token
- Clear filter, type again for more

## Best Practices

### 1. Choose Appropriate Filter Mode

```csharp
// Predictable, structured data
comboBox.TextSearchMode = ComboBoxTextSearchMode.StartsWith;

// Flexible search, descriptive items
comboBox.TextSearchMode = ComboBoxTextSearchMode.Contains;
```

### 2. Always Enable IsEditable with Filtering

```csharp
// ❌ DON'T: Filtering without editing
comboBox.IsFilteringEnabled = true;
comboBox.IsEditable = false; // Filtering won't work!

// ✅ DO: Enable both
comboBox.IsFilteringEnabled = true;
comboBox.IsEditable = true;
```

### 3. Use PlaceholderText for Guidance

```xaml
<editors:SfComboBox PlaceholderText="Type to filter cities..."
                    IsEditable="True"
                    IsFilteringEnabled="True" />
```

### 4. Optimize Custom Filtering for Large Datasets

```csharp
public class OptimizedFilterBehavior : IComboBoxFilterBehavior
{
    public List<int> GetMatchingIndexes(SfComboBox source, ComboBoxFilterInfo filterInfo)
    {
        // ❌ DON'T: Iterate multiple times
        var items = source.Items.OfType<CityInfo>().ToList();
        var list1 = items.Where(x => x.CityName.Contains(filterInfo.Text)).ToList();
        var list2 = items.Where(x => x.CountryName.Contains(filterInfo.Text)).ToList();
        
        // ✅ DO: Single pass with combined condition
        return source.Items.OfType<CityInfo>()
            .Select((item, index) => new { item, index })
            .Where(x => x.item.CityName.Contains(filterInfo.Text, StringComparison.OrdinalIgnoreCase) ||
                       x.item.CountryName.Contains(filterInfo.Text, StringComparison.OrdinalIgnoreCase))
            .Select(x => x.index)
            .ToList();
    }
}
```

### 5. Handle Empty Filter Results

The ComboBox automatically shows "No results found" when filter returns empty list. Optionally customize:

```csharp
public List<int> GetMatchingIndexes(SfComboBox source, ComboBoxFilterInfo filterInfo)
{
    var filtered = /* your filter logic */;
    
    // Optionally: show all items if no matches
    if (filtered.Count == 0 && showAllOnNoMatch)
    {
        return Enumerable.Range(0, source.Items.Count).ToList();
    }
    
    return filtered;
}
```

### 6. Case and Accent Sensitivity

```csharp
// Case-insensitive (recommended)
item.Name.Contains(filterInfo.Text, StringComparison.OrdinalIgnoreCase)

// Case-sensitive
item.Name.Contains(filterInfo.Text, StringComparison.Ordinal)

// Culture-aware
item.Name.Contains(filterInfo.Text, StringComparison.CurrentCultureIgnoreCase)
```

### 7. Debounce Filtering for Better Performance

For very large datasets, consider debouncing:

```csharp
public class DebouncedFilterBehavior : IComboBoxFilterBehavior
{
    private DateTime lastFilterTime = DateTime.MinValue;
    private const int DebounceMilliseconds = 300;
    
    public List<int> GetMatchingIndexes(SfComboBox source, ComboBoxFilterInfo filterInfo)
    {
        // Only filter if enough time has passed
        var now = DateTime.Now;
        if ((now - lastFilterTime).TotalMilliseconds < DebounceMilliseconds)
        {
            return new List<int>(); // Return current results
        }
        
        lastFilterTime = now;
        
        // Perform actual filtering
        return /* your filter logic */;
    }
}
```

## Common Scenarios

### Scenario 1: Filter with Minimum Characters

Only start filtering after user types N characters:

```csharp
public class MinLengthFilterBehavior : IComboBoxFilterBehavior
{
    private const int MinLength = 3;
    
    public List<int> GetMatchingIndexes(SfComboBox source, ComboBoxFilterInfo filterInfo)
    {
        // Show all items if input too short
        if (filterInfo.Text.Length < MinLength)
        {
            return Enumerable.Range(0, source.Items.Count).ToList();
        }
        
        // Normal filtering
        var items = source.Items.OfType<CityInfo>().ToList();
        return items
            .Where(item => item.CityName.Contains(filterInfo.Text, StringComparison.OrdinalIgnoreCase))
            .Select(item => items.IndexOf(item))
            .ToList();
    }
}
```

### Scenario 2: Searchable Dropdown with Icons

⚠️ **Security Notice:** When binding images to external URLs, always validate and load only from trusted internal sources. Binding to untrusted external URLs (IconUrl, PhotoUrl, etc.) can expose the application to third-party content injection risks.

**Secure Pattern:**
```xaml
<editors:SfComboBox IsEditable="True"
                    IsFilteringEnabled="True"
                    ItemsSource="{Binding Apps}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name">
    <editors:SfComboBox.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <!-- IMPORTANT: Only load images from trusted internal sources -->
                <Image Source="{Binding IconUrl}" 
                       Width="24" Height="24"
                       Margin="0,0,8,0" />
                <TextBlock Text="{Binding Name}" 
                          VerticalAlignment="Center" />
            </StackPanel>
        </DataTemplate>
    </editors:SfComboBox.ItemTemplate>
</editors:SfComboBox>
```

**Recommended Implementation:**
```csharp
// ✅ SECURE: Use embedded resources or local files
public class App
{
    public string Name { get; set; }
    
    // Use relative paths to embedded images
    public string IconUrl { get; set; } // e.g., "ms-appx:///Assets/Icons/app.png"
}

// ✅ SECURE: Validate URLs if loading from data
public class SecureAppLoader
{
    private static readonly Uri[] AllowedImageDomains = new[]
    {
        new Uri("ms-appx:///"), // Embedded resources
        new Uri("file:///"),    // Local files
    };
    
    public static bool IsImageUrlAllowed(string urlString)
    {
        if (!Uri.TryCreate(urlString, UriKind.Absolute, out var uri))
            return false;
        
        return AllowedImageDomains.Any(domain => uri.AbsoluteUri.StartsWith(domain.AbsoluteUri));
    }
}
```

## Troubleshooting

**Issue: Filtering Not Working**
- Verify `IsEditable="True"` and `IsFilteringEnabled="True"`
- Check `DisplayMemberPath` and `TextMemberPath` are set
- Ensure ItemsSource contains data

**Issue: Auto-Append Not Working**
- Only works with `TextSearchMode="StartsWith"`
- Verify `IsTextSearchEnabled="True"` (default)
- Doesn't work with `Contains` mode

**Issue: Poor Performance**
- Use `StartsWith` instead of `Contains` for large datasets
- Implement efficient custom filtering
- Consider virtualization for 1000+ items

## Summary

**Key Takeaways:**
- Enable filtering with `IsFilteringEnabled="True"` and `IsEditable="True"`
- Use `StartsWith` for predictable data, `Contains` for flexible searching
- Implement `IComboBoxFilterBehavior` for custom filtering logic
- Return list of indices from `GetMatchingIndexes` method
- Optimize custom filters for large datasets
- Set appropriate `PlaceholderText` for user guidance
