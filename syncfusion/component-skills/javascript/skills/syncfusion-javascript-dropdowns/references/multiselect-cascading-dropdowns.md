# Cascading Dropdowns

## Table of Contents
- [Overview](#overview)
- [Two-Level Cascading](#two-level-cascading)
- [Multi-Level Cascading](#multi-level-cascading)
- [Remote Data Cascading](#remote-data-cascading)
- [Handling Parent Changes](#handling-parent-changes)
- [Data Synchronization](#data-synchronization)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

Cascading dropdowns create dependent relationships where child dropdown options depend on parent selection. Common use cases:
- Country → State → City
- Category → Subcategory → Product
- Department → Team → Employee

## Two-Level Cascading

### Basic Two-Level Setup

Parent and child dropdown with filtering:

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

// Sample data with hierarchy
const countries = [
  { id: 'us', name: 'United States' },
  { id: 'ca', name: 'Canada' }
];

const states = [
  { id: 'ca-ny', name: 'New York', countryId: 'us' },
  { id: 'ca-ca', name: 'California', countryId: 'us' },
  { id: 'ca-on', name: 'Ontario', countryId: 'ca' },
  { id: 'ca-bc', name: 'British Columbia', countryId: 'ca' }
];

// Parent: Country dropdown
const countrySelect = new MultiSelect({
  dataSource: countries,
  fields: { text: 'name', value: 'id' },
  placeholder: 'Select country',
  change: () => {
    // Update child dropdown when parent changes
    const selectedCountry = countrySelect.value;
    const childStates = states.filter(s => s.countryId === selectedCountry);
    
    stateSelect.dataSource = childStates;
    stateSelect.clear();  // Clear previous selections
  }
});

countrySelect.appendTo('#country');

// Child: State dropdown (initially empty or all states)
const stateSelect = new MultiSelect({
  dataSource: states,
  fields: { text: 'name', value: 'id' },
  placeholder: 'Select state'
});

stateSelect.appendTo('#state');
```

**HTML:**
```html
<input id="country" type="text" />
<input id="state" type="text" />
```

## Multi-Level Cascading

### Three-Level Cascade

Country → State → City:

```typescript
const countries = [
  { id: 'us', name: 'United States' }
];

const states = [
  { id: 'ny', name: 'New York', countryId: 'us' },
  { id: 'ca', name: 'California', countryId: 'us' }
];

const cities = [
  { id: 'nyc', name: 'New York City', stateId: 'ny' },
  { id: 'buf', name: 'Buffalo', stateId: 'ny' },
  { id: 'la', name: 'Los Angeles', stateId: 'ca' },
  { id: 'sf', name: 'San Francisco', stateId: 'ca' }
];

// Level 1: Country
const countrySelect = new MultiSelect({
  dataSource: countries,
  fields: { text: 'name', value: 'id' },
  placeholder: 'Select country',
  change: () => {
    const selectedCountry = countrySelect.value;
    const childStates = states.filter(s => s.countryId === selectedCountry);
    
    stateSelect.dataSource = childStates;
    stateSelect.clear();

    // Reset city level
    citySelect.dataSource = [];
    citySelect.clear();
  }
});

countrySelect.appendTo('#country');

// Level 2: State
const stateSelect = new MultiSelect({
  dataSource: [],
  fields: { text: 'name', value: 'id' },
  placeholder: 'Select state',
  change: () => {
    const selectedState = stateSelect.value;
    const childCities = cities.filter(c => c.stateId === selectedState);
    
    citySelect.dataSource = childCities;
    citySelect.clear();
  }
});

stateSelect.appendTo('#state');

// Level 3: City
const citySelect = new MultiSelect({
  dataSource: [],
  fields: { text: 'name', value: 'id' },
  placeholder: 'Select city'
});

citySelect.appendTo('#city');
```

## Remote Data Cascading

### Fetch Child Data from Server

Use API calls for dependent data:

```typescript
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

// Parent: Category
const categorySelect = new MultiSelect({
  dataSource: new DataManager({
    url: 'url'
  }),
  fields: { text: 'name', value: 'id' },
  placeholder: 'Select category',
  change: async () => {
    const selectedCategory = categorySelect.value;
    
    // Fetch child products for selected category
    const response = await fetch(`/api/products?categoryId=${selectedCategory}`);
    const products = await response.json();
    
    productSelect.dataSource = products;
    productSelect.clear();
  }
});

categorySelect.appendTo('#category');

// Child: Product (depends on category)
const productSelect = new MultiSelect({
  dataSource: [],
  fields: { text: 'name', value: 'id' },
  placeholder: 'Select product'
});

productSelect.appendTo('#product');
```

### API Endpoints

```
GET /api/categories
[
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Clothing' }
]

GET /api/products?categoryId=1
[
  { id: '101', name: 'Laptop', categoryId: '1' },
  { id: '102', name: 'Phone', categoryId: '1' }
]
```

## Handling Parent Changes

### Clear Child on Parent Change

Reset child selections when parent changes:

```typescript
const parentSelect = new MultiSelect({
  dataSource: parentData,
  change: () => {
    // Clear child selections
    childSelect.clear();
    
    // Update child data
    const selectedParent = parentSelect.value;
    const childData = fullChildData.filter(c => c.parentId === selectedParent);
    
    childSelect.dataSource = childData;
    childSelect.refresh();
  }
});
```

### Disable Child Until Parent Selected

```typescript
const parentSelect = new MultiSelect({
  dataSource: parentData,
  change: () => {
    if (parentSelect.value) {
      // Parent selected - enable child
      childSelect.enabled = true;
      
      // Update child data
      const selectedParent = parentSelect.value;
      const childData = fullChildData.filter(c => c.parentId === selectedParent);
      childSelect.dataSource = childData;
    } else {
      // No parent - disable child
      childSelect.enabled = false;
      childSelect.clear();
    }
    childSelect.refresh();
  }
});

const childSelect = new MultiSelect({
  dataSource: [],
  enabled: false  // Initially disabled
});
```

### Prevent Invalid Child Selection

```typescript
const parentSelect = new MultiSelect({
  dataSource: parentData,
  change: () => {
    const selectedParent = parentSelect.value;
    const validChildren = fullChildData
      .filter(c => c.parentId === selectedParent)
      .map(c => c.id);
    
    // Keep only valid selections
    const currentSelections = (childSelect.value as string[]) || [];
    const validSelections = currentSelections.filter(v => validChildren.includes(v));
    
    childSelect.dataSource = fullChildData.filter(c => c.parentId === selectedParent);
    childSelect.value = validSelections;
    childSelect.refresh();
  }
});
```

## Data Synchronization

### Sync Selection State

Keep parent and child in sync:

```typescript
class CascadingDropdowns {
  private parentSelect: MultiSelect;
  private childSelect: MultiSelect;
  
  constructor() {
    this.setupParent();
    this.setupChild();
  }
  
  private setupParent() {
    this.parentSelect = new MultiSelect({
      dataSource: parentData,
      change: () => this.syncChild()
    });
    this.parentSelect.appendTo('#parent');
  }
  
  private setupChild() {
    this.childSelect = new MultiSelect({
      dataSource: []
    });
    this.childSelect.appendTo('#child');
  }
  
  private syncChild() {
    const selectedParent = this.parentSelect.value;
    
    if (!selectedParent) {
      this.childSelect.dataSource = [];
      this.childSelect.clear();
    } else {
      const childData = fullChildData.filter(c => c.parentId === selectedParent);
      this.childSelect.dataSource = childData;
      // Preserve valid selections
      const validIds = childData.map(d => d.id);
      const currentValues = (this.childSelect.value as string[]) || [];
      this.childSelect.value = currentValues.filter(v => validIds.includes(v));
    }
    
    this.childSelect.refresh();
  }
  
  getValues() {
    return {
      parent: this.parentSelect.value,
      children: this.childSelect.value
    };
  }
}
```

## Common Patterns

### Pattern 1: Department → Team → Employee

```typescript
const departments = [
  { id: 'd1', name: 'Engineering' },
  { id: 'd2', name: 'Sales' }
];

const teams = [
  { id: 't1', name: 'Backend', deptId: 'd1' },
  { id: 't2', name: 'Frontend', deptId: 'd1' },
  { id: 't3', name: 'Enterprise', deptId: 'd2' }
];

const employees = [
  { id: 'e1', name: 'Alice', teamId: 't1' },
  { id: 'e2', name: 'Bob', teamId: 't1' },
  { id: 'e3', name: 'Charlie', teamId: 't2' }
];

// Implementation follows two-level/three-level patterns above
```

### Pattern 2: Async Cascading with Loading State

```typescript
const parentSelect = new MultiSelect({
  dataSource: parentData,
  change: async () => {
    // Show loading
    childSelect.enabled = false;
    childSelect.placeholder = 'Loading...';
    
    try {
      const selectedParent = parentSelect.value;
      const response = await fetch(`/api/child?parentId=${selectedParent}`);
      const childData = await response.json();
      
      childSelect.dataSource = childData;
      childSelect.placeholder = 'Select child';
    } catch (err) {
      console.error('Failed to load child data:', err);
      childSelect.placeholder = 'Error loading data';
    } finally {
      childSelect.enabled = true;
      childSelect.refresh();
    }
  }
});
```

### Pattern 3: Form Pre-Population

```typescript
// Pre-fill cascading dropdowns with saved data
const savedData = { parentId: 'us', childId: 'ny' };

const parentSelect = new MultiSelect({
  dataSource: parentData,
  value: savedData.parentId,
  change: () => {
    const selectedParent = parentSelect.value;
    const childData = fullChildData.filter(c => c.parentId === selectedParent);
    
    childSelect.dataSource = childData;
    childSelect.value = savedData.childId;  // Pre-populate
    childSelect.refresh();
  }
});

const childSelect = new MultiSelect({
  dataSource: [],
  value: savedData.childId
});
```

## Troubleshooting

### Issue: Child Not Updating When Parent Changes

**Problem:** Parent selection changes but child dropdown doesn't update  
**Cause:** Change event not hooked up or refresh() not called

```typescript
// ✗ Wrong - no change event
const parentSelect = new MultiSelect({
  dataSource: parentData
});

// ✓ Correct - include change event with refresh
const parentSelect = new MultiSelect({
  dataSource: parentData,
  change: () => {
    const childData = getChildData(parentSelect.value);
    childSelect.dataSource = childData;
    childSelect.refresh();  // Required!
  }
});
```

### Issue: Child Data Shows Wrong Items

**Problem:** Child dropdown shows items from wrong parent  
**Cause:** Incorrect filter logic or stale data

```typescript
// ✗ Wrong - might not filter correctly
const childData = fullChildData.filter(c => c.parentId == parentSelect.value);

// ✓ Correct - strict comparison and ensure value exists
const parentValue = parentSelect.value;
const childData = parentValue 
  ? fullChildData.filter(c => c.parentId === parentValue)
  : [];
```

### Issue: Selections Lost After Data Refresh

**Problem:** Child selections cleared unexpectedly  
**Cause:** Overwriting dataSource without preserving selections

```typescript
// ✗ Wrong - loses selections
childSelect.dataSource = newData;

// ✓ Correct - preserve valid selections
const validIds = newData.map(d => d.id);
const currentSelections = ((childSelect.value as string[]) || []).filter(v => validIds.includes(v));
childSelect.dataSource = newData;
childSelect.value = currentSelections;
childSelect.refresh();
```

### Issue: Async Data Never Loads

**Problem:** Child dropdown shows "Loading" forever  
**Cause:** Async call failed or response format wrong

```typescript
// Debug: Check network request
const parentSelect = new MultiSelect({
  change: async () => {
    try {
      const response = await fetch(`/api/child?id=${parentSelect.value}`);
      console.log('Response:', response);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      console.log('Parsed data:', data);
      
      childSelect.dataSource = data;
      childSelect.refresh();
    } catch (err) {
      console.error('Request failed:', err);
    }
  }
});
```

## Next Steps

- **Add Filtering:** See [filtering-search.md](filtering-search.md)
- **Customize Display:** See [customization-templates.md](customization-templates.md)
- **Performance:** See [virtual-scrolling.md](virtual-scrolling.md)
