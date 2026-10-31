# Searching and Filtering in AutoComplete

## Table of Contents
- [Overview](#overview)
- [Member Path Based Searching](#member-path-based-searching)
- [Filtering Modes](#filtering-modes)
- [Custom Filtering](#custom-filtering)
- [Async Data Loading](#async-data-loading)
- [Common Patterns](#common-patterns)

## Overview

The AutoComplete control provides powerful searching and filtering capabilities to help users find items quickly from large datasets. Filtering happens in real-time as users type, with customizable matching algorithms and async support for dynamic data loading.

## Member Path Based Searching

When binding complex objects, the control needs to know which property to search against.

### TextMemberPath

Primary property for searching. When user types, AutoComplete searches against this property:

```xaml
<editors:SfAutoComplete ItemsSource="{Binding SocialMedias}"
                        TextMemberPath="Name"
                        DisplayMemberPath="Name"
                        Width="250" />
```

**Behavior:**
- User types "Fac" → Searches `Name` property
- If `TextMemberPath` is empty → Falls back to `DisplayMemberPath`
- If both empty → Searches using class name with namespace

### DisplayMemberPath

Used for dropdown display. If `TextMemberPath` is not set, searching uses this property:

```xaml
<editors:SfAutoComplete ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        Width="250" />
```

**Note:** Cannot use `DisplayMemberPath` when `ItemTemplate` is specified.

### Search Example with Different Paths

```csharp
// Model
public class SocialMedia
{
    public string Name { get; set; }
    public int ID { get; set; }
}
```

**Search by ID:**
```xaml
<editors:SfAutoComplete ItemsSource="{Binding SocialMedias}"
                        TextMemberPath="ID"
                        DisplayMemberPath="Name" />
```

User types "5" → Searches ID field → Shows items with ID matching "5"

**Search by Name:**
```xaml
<editors:SfAutoComplete ItemsSource="{Binding SocialMedias}"
                        TextMemberPath="Name"
                        DisplayMemberPath="Name" />
```

User types "T" → Searches Name field → Shows "Twitter", "Telegram", etc.

## Filtering Modes

### TextSearchMode Property

Controls how filtering matches user input:

| Mode | Description | Use Case |
|------|-------------|----------|
| `StartsWith` | Matches items starting with input | Quick prefix search, sorted lists |
| `Contains` | Matches items containing input | Flexible search, unsorted data |

### StartsWith Mode (Default)

Filters items that begin with the typed characters:

```xaml
<editors:SfAutoComplete x:Name="autoComplete"
                        TextSearchMode="StartsWith"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        Width="250" />
```

```csharp
autoComplete.TextSearchMode = AutoCompleteTextSearchMode.StartsWith;
```

**Example:**
- User types "T" → Shows: Twitter, Telegram, TikTok
- Doesn't show: WhatsApp (doesn't start with T)

**Features:**
- Case-insensitive
- Ignores accent marks
- First matching item auto-highlighted

### Contains Mode

Filters items containing the typed characters anywhere:

```xaml
<editors:SfAutoComplete x:Name="autoComplete"
                        TextSearchMode="Contains"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        Width="250" />
```

```csharp
autoComplete.TextSearchMode = AutoCompleteTextSearchMode.Contains;
```

**Example:**
- User types "book" → Shows: Facebook (contains "book")
- User types "gram" → Shows: Instagram, Telegram (both contain "gram")

**Features:**
- Case-insensitive
- Ignores accent marks
- First matching item auto-highlighted

## Custom Filtering

Implement advanced filtering logic beyond StartsWith/Contains:

### Step 1: Create Filter Behavior Class

```csharp
public class CityFilteringBehavior : IAutoCompleteFilterBehavior
{
    public async Task<object> GetMatchingItemsAsync(
        SfAutoComplete source, 
        AutoCompleteFilterInfo filterInfo)
    {
        IEnumerable itemssource = source.ItemsSource as IEnumerable;
        
        // Custom filtering logic
        var filteredItems = from CityInfo item in itemssource
                           where item.CountryName.StartsWith(
                               filterInfo.Text, 
                               StringComparison.CurrentCultureIgnoreCase) ||
                                 item.CityName.StartsWith(
                               filterInfo.Text, 
                               StringComparison.CurrentCultureIgnoreCase)
                           select item;
        
        return await Task.FromResult(filteredItems);  
    }
}
```

**Parameters:**
- `source` - AutoComplete instance (access ItemsSource, Items, etc.)
- `filterInfo` - Contains `Text` property (user's typed input)

### Step 2: Apply Custom Filter

```xaml
<editors:SfAutoComplete TextMemberPath="CityName"
                        DisplayMemberPath="CityName"
                        ItemsSource="{Binding Cities}">
    <editors:SfAutoComplete.FilterBehavior>
        <local:CityFilteringBehavior/>
    </editors:SfAutoComplete.FilterBehavior>
</editors:SfAutoComplete>
```

### Use Case: Country-City Search

User can type either country or city name:
- Type "Ind" → Shows cities in India
- Type "Mum" → Shows Mumbai (city name match)

## Custom Search Behavior

Control which filtered item is initially highlighted:

### Step 1: Create Search Behavior Class

```csharp
public class CapitalCitySearchingBehavior : IAutoCompleteSearchBehavior
{
    public int GetHighlightIndex(
        SfAutoComplete source, 
        AutoCompleteSearchInfo searchInfo)
    {
        // Select first capital city from filtered results
        var filteredCapitals = from CityInfo cityInfo in searchInfo.FilteredItems
                               where cityInfo.IsCapital
                               select searchInfo.FilteredItems.IndexOf(cityInfo);
        
        if (filteredCapitals.Count() > 0)
            return filteredCapitals.FirstOrDefault();

        return 0; // Default to first item
    }
}
```

**Parameters:**
- `source` - AutoComplete instance
- `searchInfo` - Contains `FilteredItems` (list of items matching filter)

### Step 2: Apply Custom Search

```xaml
<editors:SfAutoComplete TextMemberPath="CityName"
                        DisplayMemberPath="CityName"
                        ItemsSource="{Binding Cities}">    
    <editors:SfAutoComplete.SearchBehavior>
        <local:CapitalCitySearchingBehavior/>
    </editors:SfAutoComplete.SearchBehavior>
    <editors:SfAutoComplete.FilterBehavior>
        <local:CityFilteringBehavior/>
    </editors:SfAutoComplete.FilterBehavior>
</editors:SfAutoComplete>
```

**Behavior:** When user types country name, capital city is auto-selected instead of first match.

## Async Data Loading

Load data dynamically based on user input for better performance with large or remote datasets:

### Implementation

```csharp
public class CustomAsyncFilter : IAutoCompleteFilterBehavior
{
    private CancellationTokenSource cancellationTokenSource;

    public async Task<object> GetMatchingItemsAsync(
        SfAutoComplete source, 
        AutoCompleteFilterInfo filterInfo)
    {
        // Cancel previous operation if still running
        if (this.cancellationTokenSource != null)
        {
            this.cancellationTokenSource.Cancel();
            this.cancellationTokenSource.Dispose();
        }

        this.cancellationTokenSource = new CancellationTokenSource();
        CancellationToken token = this.cancellationTokenSource.Token;

        return await Task.Run(() =>
        {
            // Simulate loading large dataset or API call
            List<string> list = new List<string>();
            for (int i = 0; i < 100000; i++)
            {
                list.Add(filterInfo.Text + i);
            }

            return list;
        }, token);
    }
}
```

### Apply Async Filter

```xaml
<editors:SfAutoComplete TextSearchMode="Contains"
                        SelectionMode="Multiple"
                        x:Name="autoComplete">
    <editors:SfAutoComplete.FilterBehavior>
        <local:CustomAsyncFilter/>
    </editors:SfAutoComplete.FilterBehavior>
</editors:SfAutoComplete>
```

**Benefits:**
- Non-blocking UI
- Cancellation support for rapid typing
- Suitable for API calls or database queries
- Handles 100k+ items efficiently

## Common Patterns

### Pattern 1: Quick Prefix Search

```xaml
<editors:SfAutoComplete TextSearchMode="StartsWith"
                        ItemsSource="{Binding Countries}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        PlaceholderText="Select country..." />
```

**Use for:** Sorted lists, alphabetically organized data

### Pattern 2: Flexible Search

```xaml
<editors:SfAutoComplete TextSearchMode="Contains"
                        ItemsSource="{Binding Products}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        PlaceholderText="Search products..." />
```

**Use for:** Unsorted data, partial keyword matching

### Pattern 3: Multi-Field Search

```csharp
public class MultiFieldFilter : IAutoCompleteFilterBehavior
{
    public async Task<object> GetMatchingItemsAsync(
        SfAutoComplete source, 
        AutoCompleteFilterInfo filterInfo)
    {
        IEnumerable itemssource = source.ItemsSource as IEnumerable;
        
        var filteredItems = from Employee item in itemssource
                           where item.Name.Contains(
                               filterInfo.Text, 
                               StringComparison.CurrentCultureIgnoreCase) ||
                                 item.Department.Contains(
                               filterInfo.Text, 
                               StringComparison.CurrentCultureIgnoreCase) ||
                                 item.ID.Contains(
                               filterInfo.Text, 
                               StringComparison.CurrentCultureIgnoreCase)
                           select item;
        
        return await Task.FromResult(filteredItems);
    }
}
```

**Use for:** Search across multiple properties (name, ID, department, etc.)

## Performance Tips

**For large datasets (1000+ items):**
- Use `TextSearchMode="StartsWith"` (faster than Contains)
- Implement async filtering
- Consider pagination or lazy loading

**For remote data:**
- Add debouncing (delay filter trigger)
- Cancel previous requests
- Show loading indicator

**For complex filtering:**
- Cache filtered results
- Use indexes on searched properties
- Implement virtual scrolling

## Key Properties Summary

| Property | Type | Description |
|----------|------|-------------|
| `TextSearchMode` | `AutoCompleteTextSearchMode` | `StartsWith` or `Contains` |
| `TextMemberPath` | `string` | Property for searching |
| `DisplayMemberPath` | `string` | Property for display (fallback search) |
| `FilterBehavior` | `IAutoCompleteFilterBehavior` | Custom filtering logic |
| `SearchBehavior` | `IAutoCompleteSearchBehavior` | Custom highlight selection |

## Next Steps

- **UI Customization:** Style items and templates → [ui-customization.md](ui-customization.md)
- **Advanced Features:** Grouping and highlighting → [advanced-features.md](advanced-features.md)
