# Data Binding & Sources

## Table of Contents
- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [Field Mapping](#field-mapping)
- [Async Pipe with Observables](#async-pipe-with-observables)
- [Dynamic Data Updates](#dynamic-data-updates)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Overview

The ComboBox `dataSource` property accepts data in multiple formats:
- **Local arrays** - Strings, numbers, or objects in memory
- **Remote API** - Fetch data from backend services
- **DataManager** - Advanced data management with OData, Web API adaptors
- **RxJS Observables** - Async data streams with the async pipe

**Choose based on your needs:**
- Local array: Simple static lists (countries, categories)
- Remote API: Real-time, large, or frequently updated data
- DataManager: Complex filtering, sorting, pagination on server
- Observable: Async data with change detection

---

## Local Data Binding

### Simple Array of Strings

**Use when:** You have a flat list of values

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ComboBoxModule],
  template: `
    <ejs-combobox
      [dataSource]="skills"
      placeholder="Select a skill">
    </ejs-combobox>
  `
})
export class SkillsComponent {
  skills = ['JavaScript', 'TypeScript', 'Angular', 'React', 'Vue'];
}
```

**Output:** Each string displays as both text and value

---

### Array of Objects with Field Mapping

**Use when:** Your data has multiple properties, and you need to distinguish between display text and internal value

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="countries"
      fields="{ text: 'name', value: 'code' }"
      placeholder="Select country">
    </ejs-combobox>
  `
})
export class CountriesComponent {
  countries = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'IN', name: 'India' },
    { code: 'DE', name: 'Germany' }
  ];
}
```

**Breaking down fields mapping:**
- `text: 'name'` - Display "United States" in the dropdown
- `value: 'code'` - Store "US" when selected
- Selected value: `'US'` (the code), not the full object

---

### Complex Objects with Nested Properties

**Use when:** Data has nested structure (e.g., user.profile.name)

```typescript
employees = [
  {
    id: 1,
    profile: { name: 'Alice Johnson', title: 'Engineer' },
    department: 'Engineering'
  },
  {
    id: 2,
    profile: { name: 'Bob Smith', title: 'Manager' },
    department: 'Management'
  }
];

template: `
  <ejs-combobox
    [dataSource]="employees"
    fields="{ text: 'profile.name', value: 'id' }"
    placeholder="Select employee">
  </ejs-combobox>
`
```

**Note:** Use dot notation for nested paths: `'profile.name'`

---

## Remote Data Binding

### Web API with DataManager

**Use when:** Data comes from your backend API endpoint

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ComboBoxModule],
  template: `
    <ejs-combobox
      [dataSource]="dataManager"
      fields="{ text: 'productName', value: 'productId' }"
      placeholder="Select product">
    </ejs-combobox>
  `
})
export class ProductsComponent {
  // DataManager handles HTTP requests automatically
  dataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  });
}
```

**What DataManager does:**
1. Makes HTTP GET request to the URL
2. Parses JSON response
3. Updates ComboBox with items
4. Handles errors gracefully

---

### OData Service

**Use when:** Your backend implements OData protocol

```typescript
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

export class OrdersComponent {
  dataManager = new DataManager({
    url: 'url',
    adaptor: new ODataAdaptor(),
    crossDomain: true
  });

  // OData service provides advanced query support
  // Automatically handles filtering, sorting, etc.
}
```

**OData benefits:**
- Standardized query syntax
- Built-in filtering, sorting, paging
- Version support (OData v1-v4)

---

### OData V4 Service

**Use when:** Using modern OData V4 endpoints

```typescript
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

export class CategoriesComponent {
  dataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor()
  });
}
```

---

## Field Mapping

### Basic Field Mapping

```typescript
fields = {
  text: 'productName',    // Display in dropdown
  value: 'productId',     // Store as selected value
  disabled: 'isDisabled'  // Disable items conditionally
}
```

### Extended Field Mapping

```typescript
fields = {
  text: 'name',
  value: 'id',
  groupBy: 'category',    // Group items by this field
  iconCss: 'icon',        // Icon class for each item
  disabled: 'isDisabled'  // Boolean: disable if true
}
```

**Example with all fields:**

```typescript
products = [
  {
    id: 1,
    name: 'Laptop',
    category: 'Electronics',
    icon: 'e-icon e-laptop',
    isDisabled: false
  },
  {
    id: 2,
    name: 'Desk Chair',
    category: 'Furniture',
    icon: 'e-icon e-chair',
    isDisabled: true    // This item will be disabled
  }
];

template: `
  <ejs-combobox
    [dataSource]="products"
    [fields]="{ 
      text: 'name', 
      value: 'id', 
      groupBy: 'category',
      iconCss: 'icon',
      disabled: 'isDisabled'
    }"
    placeholder="Select product">
  </ejs-combobox>
`
```

---

## Async Pipe with Observables

**Use when:** Data changes over time or comes from RxJS sources

### Basic Observable Binding

```typescript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  template: `
    <ejs-combobox
      [dataSource]="users$ | async"
      fields="{ text: 'name', value: 'id' }"
      placeholder="Select user">
    </ejs-combobox>
  `
})
export class UsersComponent {
  users$: Observable<any[]>;

  constructor(private http: HttpClient) {
    // Fetch data once component loads
    this.users$ = this.http.get<any[]>('https://api.example.com/users');
  }
}
```

**How it works:**
1. `users$` is an Observable that emits an array
2. `| async` pipe subscribes to the Observable
3. ComboBox updates whenever new data arrives
4. Pipe automatically unsubscribes on component destroy

---

### Observable with Change Detection

```typescript
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  template: `
    <ejs-combobox
      [dataSource]="items$ | async"
      placeholder="Select item">
    </ejs-combobox>
    
    <button (click)="refreshData()">Refresh</button>
  `
})
export class ItemsComponent implements OnInit {
  private itemsSubject = new BehaviorSubject<string[]>([]);
  items$ = this.itemsSubject.asObservable();

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    // Fetch new data and push to subscribers
    const newItems = ['Item 1', 'Item 2', 'Item 3'];
    this.itemsSubject.next(newItems);
  }
}
```

**BehaviorSubject benefits:**
- Always emits latest value to new subscribers
- Easy to trigger manual updates
- Perfect for reactive data flows

---

## Dynamic Data Updates

### Update Data Programmatically

```typescript
@Component({
  template: `
    <ejs-combobox
      #combo
      [dataSource]="items"
      placeholder="Select item">
    </ejs-combobox>
    
    <button (click)="addItem()">Add Item</button>
  `
})
export class DynamicItemsComponent {
  @ViewChild('combo') comboBox: ComboBoxComponent | undefined;
  
  items = ['Red', 'Blue', 'Green'];

  addItem() {
    const newItem = 'Yellow';
    this.items.push(newItem);
    
    // Refresh ComboBox to show new item
    if (this.comboBox) {
      this.comboBox.dataSource = [...this.items];
    }
  }
}
```

**Important:** Create new array reference to trigger change detection

```typescript
// ❌ This won't work (modifying original array)
this.items.push('Yellow');
this.comboBox.dataSource = this.items;

// ✅ This works (new array reference)
this.comboBox.dataSource = [...this.items, 'Yellow'];
```

---

### Reload Remote Data

```typescript
@Component({
  template: `
    <ejs-combobox
      #combo
      [dataSource]="dataManager"
      placeholder="Select product">
    </ejs-combobox>
    
    <button (click)="reload()">Reload Data</button>
  `
})
export class RemoteDataComponent {
  @ViewChild('combo') comboBox: ComboBoxComponent | undefined;

  dataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  });

  reload() {
    // Refresh data from server
    if (this.comboBox) {
      this.comboBox.dataSource = this.dataManager;
    }
  }
}
```

---

## Common Patterns

### Pattern 1: Filter by User Input (Client-Side)

```typescript
searchText = '';

get filteredItems() {
  return this.allItems.filter(item =>
    item.name.toLowerCase().includes(this.searchText.toLowerCase())
  );
}

template: `
  <input 
    [(ngModel)]="searchText" 
    placeholder="Type to filter">
  
  <ejs-combobox
    [dataSource]="filteredItems"
    fields="{ text: 'name', value: 'id' }"
    placeholder="Select item">
  </ejs-combobox>
`
```

---

### Pattern 2: Cascade ComboBoxes (Dependent Lists)

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="countries"
      fields="{ text: 'name', value: 'code' }"
      (change)="onCountryChange($event)"
      placeholder="Select country">
    </ejs-combobox>

    <ejs-combobox
      [dataSource]="cities"
      fields="{ text: 'name', value: 'id' }"
      placeholder="Select city"
      [enabled]="cities.length > 0">
    </ejs-combobox>
  `
})
export class CascadeComponent {
  countries = [
    { code: 'US', name: 'United States' },
    { code: 'IN', name: 'India' }
  ];

  cities: any[] = [];

  onCountryChange(event: any) {
    const countryCode = event.itemData.code;
    
    // Load cities for selected country
    if (countryCode === 'US') {
      this.cities = [
        { id: 1, name: 'New York' },
        { id: 2, name: 'Los Angeles' }
      ];
    } else if (countryCode === 'IN') {
      this.cities = [
        { id: 3, name: 'Delhi' },
        { id: 4, name: 'Mumbai' }
      ];
    }
  }
}
```

---

### Pattern 3: Lazy Load Data (Virtual Scrolling)

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="largeDataSet"
      [enableVirtualization]="true"
      placeholder="Select from 10000 items">
    </ejs-combobox>
  `
})
export class VirtualScrollComponent implements OnInit {
  largeDataSet: any[] = [];

  ngOnInit() {
    // Generate 10,000 items
    for (let i = 1; i <= 10000; i++) {
      this.largeDataSet.push({
        id: i,
        text: `Item ${i}`
      });
    }
  }
}
```

---

## Troubleshooting

### Issue: "Cannot read property of undefined" in field mapping

**Cause:** Field name doesn't exist in data object

**Fix:**
```typescript
// ❌ Wrong - field doesn't exist
fields = { text: 'fullName', value: 'userId' }
// Data: { name: 'John', id: 1 } ← no 'fullName' or 'userId'

// ✅ Correct - use actual field names
fields = { text: 'name', value: 'id' }
```

---

### Issue: Remote data not loading / HTTP errors

**Cause:** Incorrect API URL or CORS issues

**Debug:**
```typescript
dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  crossDomain: true  // Enable CORS support
});

// Also check Network tab in browser DevTools
// Verify API returns JSON array format: [{ id: 1, name: 'Item' }]
```

---

### Issue: Data updates but ComboBox doesn't refresh

**Cause:** Array reference didn't change, change detection not triggered

**Fix:**
```typescript
// ❌ Won't trigger refresh
this.items.push(newItem);

// ✅ Triggers refresh (new reference)
this.items = [...this.items, newItem];

// Or explicitly update ComboBox
this.comboBox.dataSource = [...this.items];
```

---

### Issue: Async pipe shows "[object Object]"

**Cause:** Data structure incorrect or pipe timing issue

**Debug:**
```typescript
// Add debugging
template: `
  <p>Debug: {{ (users$ | async) | json }}</p>
  
  <ejs-combobox
    [dataSource]="users$ | async"
    fields="{ text: 'name', value: 'id' }">
  </ejs-combobox>
`
```

Verify API response returns array: `[{ id: 1, name: 'User 1' }]`

---

Your data is now properly bound! Move to [Filtering & Search](../filtering-and-search.md) to add search capabilities.
