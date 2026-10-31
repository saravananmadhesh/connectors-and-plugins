# Filtering & Search

## Table of Contents
- [Basic Filtering](#basic-filtering)
- [Filter Types](#filter-types)
- [Advanced Filter Configuration](#advanced-filter-configuration)
- [Custom Filtering](#custom-filtering)
- [Remote Filtering](#remote-filtering)
- [Performance Optimization](#performance-optimization)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)


---

## Basic Filtering

### Enable Filtering

**Use when:** You want users to search/filter items as they type

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ComboBoxModule],
  template: `
    <ejs-combobox
      [dataSource]="items"
      [allowFiltering]="true"
      placeholder="Type to search...">
    </ejs-combobox>
  `
})
export class SearchComponent {
  items = [
    'JavaScript',
    'TypeScript',
    'Java',
    'Python',
    'C#',
    'C++',
    'Go',
    'Rust'
  ];
}
```

**What happens:**
1. User starts typing in the ComboBox
2. List filters to show only matching items
3. Matched items highlight the search term
4. Dropdown stays open showing results

---

### How Filtering Works

**Default behavior:**
- Filter type: **StartsWith** (matches beginning of text)
- Case-insensitive: Ignores uppercase/lowercase
- Real-time: Filters as user types each character

**Example:**
```
User types: "java"
Matches: "JavaScript", "Java" 
Doesn't match: "Python" (doesn't start with 'java')
```

---

## Filter Types

### StartsWith (Default)

**Matches:** Items that start with typed text

```typescript
template: `
  <ejs-combobox
    [dataSource]="languages"
    [allowFiltering]="true"
    filterType="StartsWith"
    placeholder="Type first letters...">
  </ejs-combobox>
`

// User types "py" → matches "Python" (starts with 'py')
// Doesn't match "TypeScript" (doesn't start with 'py')
```

---

### Contains

**Matches:** Items that contain typed text anywhere

```typescript
template: `
  <ejs-combobox
    [dataSource]="items"
    [allowFiltering]="true"
    filterType="Contains"
    placeholder="Find anywhere...">
  </ejs-combobox>
`

// User types "Script" → matches "JavaScript", "TypeScript"
// Also matches "Python" if it contains "Script"
```

**Best for:** Word searches in middle of text

---

### EndsWith

**Matches:** Items that end with typed text

```typescript
filterType="EndsWith"

// User types "Script" → matches "JavaScript", "TypeScript"
// Doesn't match "Script" (ends with 'Script')
```

---

## Advanced Filter Configuration

### Case-Sensitive Filtering

**Use when:** You need exact case matching (e.g., API keys, codes)

```typescript
template: `
  <ejs-combobox
    [dataSource]="codes"
    [allowFiltering]="true"
    filterType="StartsWith"
    [ignoreCase]="false"
    placeholder="Search (case-sensitive)">
  </ejs-combobox>
`

// User types "API" → matches "API_KEY" only (not "api_key")
// Default ignoreCase="true" ignores case
```

---

### Diacritics Filtering

**Use when:** Ignoring accent marks (á, é, ñ, etc.)

```typescript
template: `
  <ejs-combobox
    [dataSource]="names"
    [allowFiltering]="true"
    [ignoreAccent]="true"
    placeholder="Search names...">
  </ejs-combobox>
`

names = [
  'Café',
  'Naïve',
  'Piñata',
  'Résumé'
];

// User types "cafe" → matches "Café"
// User types "pinata" → matches "Piñata"
```

---

### Debounce Delay

**Use when:** Making remote API calls and want to reduce requests

```typescript
template: `
  <ejs-combobox
    [dataSource]="dataManager"
    [allowFiltering]="true"
    [debounceDelay]="800"
    placeholder="Searching...">
  </ejs-combobox>
`

// User types quickly: "database" character by character
// Without debounce: Makes 8 API calls
// With 800ms debounce: Waits for typing to stop, makes 1 API call
```

**Typical debounce values:**
- 300ms: Feels responsive
- 500-800ms: Good balance of performance
- 1000ms+: Noticeable delay to user

---

## Custom Filtering

### Filter with Custom Logic

**Use when:** You need filtering beyond built-in types

```typescript
import { Component, ViewChild } from '@angular/core';
import { ComboBoxComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  template: `
    <ejs-combobox
      #combo
      [dataSource]="products"
      fields="{ text: 'name', value: 'id' }"
      (filtering)="onFiltering($event)"
      [allowFiltering]="true"
      placeholder="Filter products...">
    </ejs-combobox>
  `
})
export class CustomFilterComponent {
  @ViewChild('combo') comboBox!: ComboBoxComponent;

  products = [
    { id: 1, name: 'Laptop', price: 1200, inStock: true },
    { id: 2, name: 'Mouse', price: 25, inStock: false },
    { id: 3, name: 'Monitor', price: 300, inStock: true },
    { id: 4, name: 'Keyboard', price: 80, inStock: true }
  ];

  onFiltering(args: FilteringEventArgs) {
    // Get user input
    const searchText = args.text.toLowerCase();

    // Custom filter: Show only in-stock items that match
    const filtered = this.products.filter(item =>
      item.inStock && item.name.toLowerCase().includes(searchText)
    );

    // Update ComboBox with filtered results
    args.updateData(filtered);
  }
}
```

**How it works:**
1. `(filtering)` event fires when user types
2. Extract search text from `args.text`
3. Apply custom filter logic (here: in-stock + contains text)
4. Call `args.updateData()` to update list

---

### Filter with Numeric/Boolean Fields

```typescript
onFiltering(args: FilteringEventArgs) {
  const searchText = args.text;

  // Parse as number if user types numbers
  const numSearch = parseFloat(searchText);

  const filtered = this.products.filter(item => {
    // Filter by price if number entered
    if (!isNaN(numSearch)) {
      return item.price >= numSearch;
    }
    // Filter by name if text entered
    return item.name.toLowerCase().includes(searchText.toLowerCase());
  });

  args.updateData(filtered);
}

// User types "100" → shows items costing $100+
// User types "key" → shows "Keyboard"
```

---

## Remote Filtering

**Use when:** Filtering large datasets on the server

### Filter with Web API

```typescript
import { Component } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  template: `
    <ejs-combobox
      [dataSource]="dataManager"
      [allowFiltering]="true"
      [debounceDelay]="500"
      placeholder="Search users...">
    </ejs-combobox>
  `
})
export class RemoteFilterComponent {
  dataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  });
}
```

**Server-side (Node.js/Express example):**

```javascript
app.get('/users/search', (req, res) => {
  const query = req.query.text; // Get filter text from ComboBox
  
  // Query database with the filter
  const results = db.users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );
  
  res.json(results);
});
```

---

### Server-Side Query Building

```typescript
import { DataManager, WebApiAdaptor, Query } from '@syncfusion/ej2-data';

export class AdvancedRemoteFilterComponent {
  dataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  });

  // DataManager automatically adds query parameters
  // ?$filter=contains(name,'text')&$top=10
}
```

---

## Performance Optimization

### Virtual Scrolling with Filtering

**Use when:** Combining filtering with large datasets (10,000+ items)

```typescript
template: `
  <ejs-combobox
    [dataSource]="largeDataSet"
    [allowFiltering]="true"
    [enableVirtualization]="true"
    [debounceDelay]="300"
    placeholder="Filter 10000 items...">
  </ejs-combobox>
`

// Virtual scrolling: Only renders visible items (~50)
// Other items loaded on scroll
// Result: Smooth filtering even with huge datasets
```

---

## Common Patterns

### Pattern 1: Search with Recent Items

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="displayItems"
      (filtering)="onFiltering($event)"
      [allowFiltering]="true"
      placeholder="Search...">
    </ejs-combobox>
  `
})
export class RecentSearchComponent {
  allItems = ['Item A', 'Item B', 'Item C', 'Item D'];
  recentItems = ['Item A', 'Item B'];
  displayItems = this.recentItems;

  onFiltering(args: any) {
    if (!args.text) {
      // Show recent items when empty
      this.displayItems = this.recentItems;
    } else {
      // Show filtered items
      this.displayItems = this.allItems.filter(item =>
        item.toLowerCase().includes(args.text.toLowerCase())
      );
    }
    args.updateData(this.displayItems);
  }
}
```

---

### Pattern 2: Filter with Highlighting

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="filteredItems"
      itemTemplate="itemTemplate"
      [allowFiltering]="true"
      (filtering)="onFiltering($event)"
      placeholder="Search...">
      
      <ng-template #itemTemplate let-data>
        <span [innerHTML]="highlightText(data)"></span>
      </ng-template>
    </ejs-combobox>
  `
})
export class HighlightSearchComponent {
  filteredItems: any[] = [];
  searchText = '';
  allItems = ['JavaScript', 'TypeScript', 'Java', 'Python'];

  onFiltering(args: any) {
    this.searchText = args.text;
    this.filteredItems = this.allItems.filter(item =>
      item.toLowerCase().includes(this.searchText.toLowerCase())
    );
    args.updateData(this.filteredItems);
  }

  highlightText(item: string): string {
    if (!this.searchText) return item;
    
    const regex = new RegExp(this.searchText, 'gi');
    return item.replace(regex, match => `<strong>${match}</strong>`);
  }
}
```

---

### Pattern 3: Multi-Field Filtering

```typescript
onFiltering(args: FilteringEventArgs) {
  const searchText = args.text.toLowerCase();

  const filtered = this.employees.filter(emp =>
    emp.name.toLowerCase().includes(searchText) ||
    emp.email.toLowerCase().includes(searchText) ||
    emp.department.toLowerCase().includes(searchText)
  );

  args.updateData(filtered);
}

// User types "eng" → matches "Engineer" in department
// User types "john" → matches "John" in name
// User types "@company" → matches email domain
```

---

## Troubleshooting

### Issue: Filtering not working / no matches

**Cause:** Wrong filter type or data structure

**Debug:**
```typescript
onFiltering(args: FilteringEventArgs) {
  console.log('Search text:', args.text);
  console.log('Data:', this.items);
  
  // Check if filtering logic is correct
  const test = this.items.filter(item =>
    item.name.toLowerCase().includes(args.text.toLowerCase())
  );
  console.log('Filtered results:', test);
  
  args.updateData(test);
}
```

---

### Issue: Remote filtering very slow

**Cause:** Too many API requests from each keystroke

**Fix:**
```typescript
[debounceDelay]="800"          // Wait 800ms before requesting
[enableVirtualization]="true"  // Reduce rendered items
```

---

### Issue: Highlighted text broken / XSS risk

**Cause:** Using `innerHTML` without sanitization

**Fix:**
```typescript
import { DomSanitizer } from '@angular/platform-browser';

constructor(private sanitizer: DomSanitizer) {}

highlightText(item: string): any {
  const regex = new RegExp(this.searchText, 'gi');
  const highlighted = item.replace(regex, match => `<strong>${match}</strong>`);
  return this.sanitizer.bypassSecurityTrustHtml(highlighted);
}
```

---

Your search is now working! Move to [Grouping & Templates](../grouping-and-templates.md) to customize the display.
