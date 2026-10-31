# Filtering & Search

## Table of Contents
- [Enable Filtering](#enable-filtering)
- [Filter Types](#filter-types)
- [Custom Filtering Logic](#custom-filtering-logic)
- [Remote Search](#remote-search)
- [Search Optimization](#search-optimization)
- [Filtering with Events](#filtering-with-events)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Enable Filtering

### Basic Filtering

Enable client-side filtering with a single property:

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

const cities = [
  { id: '1', name: 'New York' },
  { id: '2', name: 'Los Angeles' },
  { id: '3', name: 'Chicago' },
  { id: '4', name: 'Houston' }
];

const multiSelect = new MultiSelect({
  dataSource: cities,
  fields: { text: 'name', value: 'id' },
  allowFiltering: true,
  placeholder: 'Search cities'
});

multiSelect.appendTo('#multiselect');
```

**How it works:**
1. User types in input field
2. Dropdown automatically filters items matching typed text
3. Only matching items display in list
4. User selects from filtered results

### Case Sensitivity

Control case sensitivity in filter:

```typescript
const multiSelect = new MultiSelect({
  dataSource: cities,
  fields: { text: 'name', value: 'id' },
  allowFiltering: true,
  ignoreCase: true,  // Case-insensitive (default)
  placeholder: 'Search cities'
});

// ignoreCase: true  → "new", "NEW", "New" all match "New York"
// ignoreCase: false → Only "New" matches "New York"
```

## Filter Types

### StartsWith (Default)

```typescript
const multiSelect = new MultiSelect({
  dataSource: cities,
  allowFiltering: true,
  filterType: 'StartsWith'  // Default
});

// "New" matches → "New York"
// "York" does NOT match → "New York"
// "new" matches → "New York" (case-insensitive by default)
```

### Contains

```typescript
const multiSelect = new MultiSelect({
  dataSource: cities,
  allowFiltering: true,
  filterType: 'Contains'
});

// "New" matches → "New York"
// "York" matches → "New York"
// "or" matches → "New York"
```

### EndsWith

```typescript
const multiSelect = new MultiSelect({
  dataSource: cities,
  allowFiltering: true,
  filterType: 'EndsWith'
});

// "York" matches → "New York"
// "New" does NOT match → "New York"
```

## Custom Filtering Logic

### Manual Filter with Query

Implement custom filtering logic via filtering event:

```typescript
import { MultiSelect, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

const employees = [
  { id: '1', name: 'Alice', dept: 'Engineering', salary: 95000 },
  { id: '2', name: 'Bob', dept: 'Sales', salary: 75000 },
  { id: '3', name: 'Charlie', dept: 'Engineering', salary: 88000 }
];

const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  allowFiltering: true,
  filtering: (e: FilteringEventArgs) => {
    const query = new Query();
    
    // Custom: Filter by name starting with search text
    if (e.text !== '') {
      query.where('name', 'startswith', e.text, true);
    }
    
    // Apply filtered data
    e.updateData(employees, query);
  },
  placeholder: 'Search employees'
});

multiSelect.appendTo('#multiselect');
```

### Complex Filtering

Filter by multiple fields:

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  allowFiltering: true,
  filtering: (e: FilteringEventArgs) => {
    let filtered = employees;
    
    if (e.text) {
      filtered = employees.filter(emp =>
        emp.name.toLowerCase().includes(e.text.toLowerCase()) ||
        emp.dept.toLowerCase().includes(e.text.toLowerCase())
      );
    }
    
    e.updateData(filtered);
  }
});
```

### Minimum Character Filter

Require minimum characters before filtering:

```typescript
const multiSelect = new MultiSelect({
  dataSource: largeDataset,
  allowFiltering: true,
  filtering: (e: FilteringEventArgs) => {
    let filtered = largeDataset;
    
    // Require at least 3 characters
    if (e.text && e.text.length >= 3) {
      filtered = largeDataset.filter(item =>
        item.name.toLowerCase().includes(e.text.toLowerCase())
      );
    } else if (e.text && e.text.length > 0) {
      // Show "Too few characters" message
      filtered = [];
    } else {
      // Show all when empty
      filtered = largeDataset;
    }
    
    e.updateData(filtered);
  }
});

multiSelect.appendTo('#multiselect');
```

### Filter with Debounce

The built-in `debounceDelay` property (default: `300` ms) controls the delay between keystrokes and filter execution. Set it directly without any custom timeout logic:

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  allowFiltering: true,
  debounceDelay: 500,  // Wait 500ms after last keystroke before filtering
  filtering: (e: FilteringEventArgs) => {
    const filtered = employees.filter(emp =>
      emp.name.toLowerCase().includes(e.text.toLowerCase())
    );
    e.updateData(filtered);
  }
});
```

## Remote Search

### Server-Side Filtering

Send search query to server:

```typescript
import { MultiSelect, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

const multiSelect = new MultiSelect({
  allowFiltering: true,
  filtering: async (e: FilteringEventArgs) => {
    const response = await fetch(
      `/api/search?q=${encodeURIComponent(e.text)}`
    );
    const data = await response.json();
    
    e.updateData(data);
  },
  placeholder: 'Search...'
});

multiSelect.appendTo('#multiselect');
```

### API Endpoint Example

```typescript
// Backend endpoint
GET /api/search?q=alice

// Returns JSON array
[
  { id: '1', name: 'Alice' },
  { id: '5', name: 'Alicia' }
]
```

### With DataManager

Using Syncfusion DataManager for remote filtering:

```typescript
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { MultiSelect, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});

const multiSelect = new MultiSelect({
  dataSource: dataManager,
  fields: { text: 'ContactName', value: 'CustomerID' },
  allowFiltering: true,
  filtering: (e: FilteringEventArgs) => {
    const query = new Query().select(['CustomerID', 'ContactName']).take(10);
    
    if (e.text !== '') {
      query.where('ContactName', 'contains', e.text, true);
    }
    
    e.updateData(dataManager, query);
  },
  placeholder: 'Search customer'
});

multiSelect.appendTo('#multiselect');
```

## Search Optimization

### Debounce Search Requests

For remote search, use the built-in `debounceDelay` property to reduce unnecessary server requests:

```typescript
let lastQuery = '';

const multiSelect = new MultiSelect({
  allowFiltering: true,
  debounceDelay: 500,  // Built-in delay between keystrokes and filtering
  filtering: async (e: FilteringEventArgs) => {
    // Skip if same query
    if (lastQuery === e.text) return;
    lastQuery = e.text;

    const response = await fetch(`/api/search?q=${e.text}`);
    const data = await response.json();
    e.updateData(data);
  }
});
```

### Local Cache

Cache results to avoid repeated API calls:

```typescript
const searchCache = new Map<string, any[]>();

const multiSelect = new MultiSelect({
  allowFiltering: true,
  filtering: async (e: FilteringEventArgs) => {
    // Check cache first
    if (searchCache.has(e.text)) {
      e.updateData(searchCache.get(e.text));
      return;
    }
    
    // Fetch from API
    const response = await fetch(`/api/search?q=${e.text}`);
    const data = await response.json();
    
    // Cache result
    searchCache.set(e.text, data);
    
    e.updateData(data);
  }
});
```

## Filtering with Events

### Filter Event

```typescript
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

const multiSelect = new MultiSelect({
  dataSource: employees,
  allowFiltering: true,
  filtering: (e: FilteringEventArgs) => {
    console.log('Filter text:', e.text);
    console.log('Base data:', e.baseEventArgs);
    
    // Process filtering...
    const filtered = employees.filter(emp =>
      emp.name.toLowerCase().startsWith(e.text.toLowerCase())
    );
    
    e.updateData(filtered);
  }
});
```

### BeforeOpen Event

Execute logic before dropdown opens during filter:

```typescript
const multiSelect = new MultiSelect({
  allowFiltering: true,
  beforeOpen: () => {
    console.log('Dropdown about to open');
  }
});
```

## Common Patterns

### Pattern 1: Search with Placeholder Text

```typescript
const multiSelect = new MultiSelect({
  dataSource: cities,
  allowFiltering: true,
  placeholder: 'Type city name...',
  filtering: (e: FilteringEventArgs) => {
    const filtered = cities.filter(c =>
      c.name.toLowerCase().includes(e.text.toLowerCase())
    );
    e.updateData(filtered);
  }
});

multiSelect.appendTo('#multiselect');
```

### Pattern 2: Show No Match Message

```typescript
const multiSelect = new MultiSelect({
  dataSource: items,
  allowFiltering: true,
  filtering: (e: FilteringEventArgs) => {
    const filtered = items.filter(i =>
      i.name.toLowerCase().includes(e.text.toLowerCase())
    );
    
    // Show message if no results
    if (filtered.length === 0 && e.text) {
      e.updateData([{ id: 'no-match', name: 'No matches found' }]);
    } else {
      e.updateData(filtered);
    }
  }
});
```

### Pattern 3: Highlight Matching Text

```typescript
const multiSelect = new MultiSelect({
  dataSource: items,
  allowFiltering: true,
  itemTemplate: '<div>${name}</div>',
  filtering: (e: FilteringEventArgs) => {
    const filtered = items.filter(i =>
      i.name.toLowerCase().includes(e.text.toLowerCase())
    );
    e.updateData(filtered);
  }
});

// Highlight in CSS
document.addEventListener('change', () => {
  const searchText = multiSelect.inputElement?.value;
  if (searchText) {
    const items = document.querySelectorAll('.e-list-item');
    items.forEach(item => {
      const html = item.textContent || '';
      const regex = new RegExp(`(${searchText})`, 'gi');
      item.innerHTML = html.replace(regex, '<mark>$1</mark>');
    });
  }
});
```

## Troubleshooting

### Issue: Filtering Not Working

**Problem:** allowFiltering=true but typing doesn't filter  
**Cause:** Field mapping missing or incorrect

```typescript
// ✗ Wrong - fields not mapped for objects
const ms = new MultiSelect({
  dataSource: employees,  // Array of objects
  allowFiltering: true    // But no field mapping!
});

// ✓ Correct - map the text field to search
const ms = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  allowFiltering: true
});
```

### Issue: Custom Filter Not Updating

**Problem:** Filtering event fires but list doesn't update  
**Solution:** Call e.updateData() with filtered data

```typescript
// ✗ Wrong - forgot updateData
const ms = new MultiSelect({
  filtering: (e) => {
    const filtered = data.filter(...);
    console.log(filtered);  // Filtering happens but display doesn't update
  }
});

// ✓ Correct - update dropdown with filtered data
const ms = new MultiSelect({
  filtering: (e) => {
    const filtered = data.filter(...);
    e.updateData(filtered);  // Required!
  }
});
```

### Issue: Remote Search Timeout

**Problem:** Search hangs or is slow  
**Solution:** Add timeout and debounce

```typescript
const multiSelect = new MultiSelect({
  filtering: async (e: FilteringEventArgs) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);  // 5s timeout
    
    try {
      const response = await fetch(`/api/search?q=${e.text}`, {
        signal: controller.signal
      });
      const data = await response.json();
      e.updateData(data);
    } catch (err) {
      console.error('Search timeout:', err);
      e.updateData([]);
    } finally {
      clearTimeout(timeout);
    }
  }
});
```

## Next Steps

- **Add Checkboxes:** See [checkbox-multiselect.md](checkbox-multiselect.md)
- **Group Results:** See [grouping-sorting.md](grouping-sorting.md)
- **Customize Display:** See [customization-templates.md](customization-templates.md)
