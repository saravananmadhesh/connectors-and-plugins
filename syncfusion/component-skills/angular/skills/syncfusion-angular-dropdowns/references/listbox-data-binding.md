# Data Binding in Syncfusion Angular ListBox

## Table of Contents
- [Overview](#overview)
- [Array of Strings](#array-of-strings)
- [Array of Objects](#array-of-objects)
- [Complex Nested Objects](#complex-nested-objects)
- [Remote Data with DataManager](#remote-data-with-datamanager)
- [Field Mapping Configuration](#field-mapping-configuration)
- [Troubleshooting Data Binding](#troubleshooting-data-binding)

---

## Overview

The ListBox component loads data from two sources:
1. **Local Data**: Arrays or DataManager objects bound via the `dataSource` property
2. **Remote Data**: Services fetched using DataManager with Query

## Array of Strings

The simplest data format: an array of primitive strings or numbers. Both value and text field act as the same:

```typescript
import { Component, OnInit } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-string-data',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <ejs-listbox [dataSource]="items"></ejs-listbox>
  `
})
export class StringDataComponent implements OnInit {
  public items: string[] = [];

  ngOnInit(): void {
    this.items = [
      'JavaScript',
      'TypeScript',
      'Angular',
      'React',
      'Vue'
    ];
  }
}
```

**Output**: Simple text list with each string as an item
**Use When**: Simple list of single-value items

---

## Array of Objects

Bind structured data by mapping object properties to ListBox fields (text, value, id, etc.):

### Basic Object Format

```typescript
public items: any[] = [
  { text: 'JavaScript', id: 'js' },
  { text: 'TypeScript', id: 'ts' },
  { text: 'Angular', id: 'ang' },
  { text: 'React', id: 'react' },
  { text: 'Vue', id: 'vue' }
];
```

Template:
```html
<ejs-listbox [dataSource]="items"></ejs-listbox>
```

### With Field Mapping

Explicitly map properties when field names differ:

```typescript
export class ObjectDataComponent implements OnInit {
  public items: any[] = [];
  
  public fields = { 
    text: 'name',  // Maps to item.name instead of item.text
    value: 'code'  // Maps to item.code instead of item.id
  };

  ngOnInit(): void {
    this.items = [
      { name: 'JavaScript', code: 'JS' },
      { name: 'TypeScript', code: 'TS' },
      { name: 'Angular', code: 'ANG' }
    ];
  }
}
```

Template:
```html
<ejs-listbox 
  [dataSource]="items"
  [fields]="fields">
</ejs-listbox>
```

### Complete Example: Object Data

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-object-data',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  template: `
    <div style="padding: 20px;">
      <h3>Programming Languages</h3>
      <ejs-listbox 
        [dataSource]="languages"
        [fields]="fields"
        (change)="onSelect($event)">
      </ejs-listbox>
      
      <div *ngIf="selected" style="margin-top: 20px;">
        <p><strong>Selected Value:</strong> {{ selected }}</p>
      </div>
    </div>
  `
})
export class ObjectDataComponent implements OnInit {
  public languages: any[] = [];
  public fields = { text: 'language', value: 'code' };
  public selected: string = '';

  ngOnInit(): void {
    this.languages = [
      { language: 'JavaScript', code: 'JS', year: 1995 },
      { language: 'Python', code: 'PY', year: 1989 },
      { language: 'Java', code: 'JAVA', year: 1995 },
      { language: 'C#', code: 'CS', year: 2000 }
    ];
  }

  onSelect(event: any): void {
    this.selected = event.value;
  }
}
```

---

## Complex Nested Objects

For deeply nested data, use dot notation in field mapping:

### Nested Data Structure

```typescript
public employees: any[] = [
  {
    id: 1,
    name: 'John Doe',
    department: {
      name: 'Engineering',
      code: 'ENG'
    },
    contact: {
      email: 'john@example.com'
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    department: {
      name: 'Design',
      code: 'DES'
    },
    contact: {
      email: 'jane@example.com'
    }
  }
];
```

### Field Mapping with Nested Properties

```typescript
public fields = {
  text: 'name',              // Top-level property
  value: 'id',
  iconCss: 'icon',
  groupBy: 'department.code' // Nested property with dot notation
};
```

### Complete Nested Example

```typescript
import { Component, OnInit } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-nested-data',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <ejs-listbox 
      [dataSource]="employees"
      [fields]="fields"
      height="250px">
    </ejs-listbox>
  `
})
export class NestedDataComponent implements OnInit {
  public employees: any[] = [];
  public fields = {
    text: 'name',
    value: 'id',
    groupBy: 'department.name'
  };

  ngOnInit(): void {
    this.employees = [
      {
        id: 1,
        name: 'Alice Johnson',
        department: { name: 'Engineering' },
        skills: { primary: 'Angular' }
      },
      {
        id: 2,
        name: 'Bob Wilson',
        department: { name: 'Engineering' },
        skills: { primary: 'React' }
      },
      {
        id: 3,
        name: 'Carol Davis',
        department: { name: 'Design' },
        skills: { primary: 'UI/UX' }
      }
    ];
  }
}
```

---

## Remote Data with DataManager

Fetch data from a remote service using DataManager and Query:

### Setup DataManager

```typescript
import { Component, OnInit } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-remote-data',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <ejs-listbox 
      [dataSource]="dataManager"
      [fields]="fields"
      [query]="query"
      height="300px">
    </ejs-listbox>
  `
})
export class RemoteDataComponent implements OnInit {
  public dataManager: DataManager | null = null;
  public query: Query = new Query();
  public fields = { text: 'ProductName', value: 'ProductID' };

  ngOnInit(): void {
    // Create DataManager pointing to remote service
    this.dataManager = new DataManager({
      url: 'url',
      adaptor: new UrlAdaptor()
    });

    // Create Query to fetch first 10 items
    this.query = new Query().take(10);
  }
}
```

### Example: Fetch from Custom API

```typescript
import { Component, OnInit } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, HttpClient, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-custom-api',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <ejs-listbox 
      [dataSource]="dataManager"
      [fields]="fields"
      placeholder="Loading...">
    </ejs-listbox>
  `
})
export class CustomApiComponent implements OnInit {
  public dataManager: DataManager | null = null;
  public fields = { text: 'username', value: 'id' };

  ngOnInit(): void {
    this.dataManager = new DataManager({
      url: 'url',
      adaptor: new HttpClient()
    });
  }
}
```

---

## Field Mapping Configuration

### Available Field Properties

| Field | Type | Description |
|-------|------|-------------|
| **`text`** | string | Display text for the item |
| **`value`** | string | Hidden value associated with item |
| **`groupBy`** | string | Property to group items by category |
| **`iconCss`** | string | CSS class for item icon |
| **`disabled`** | string | Property that defines whether a list item is disabled |
| **`htmlAttributes`** | string | Additional HTML attributes (e.g., `title`) for item elements |

### Field Configuration Object

```typescript
public fields = {
  text: 'displayName',
  value: 'uniqueId',
  groupBy: 'category',
  iconCss: 'icon',
  disabled: 'isUnavailable'
};
```

### Complete Example: All Field Types

```typescript
public products = [
  {
    productName: 'Laptop',
    code: 'PROD-001',
    category: 'Electronics',
    isUnavailable: false,
    icon: 'e-icons e-laptop'
  },
  {
    productName: 'Mouse (Disabled)',
    code: 'PROD-002',
    category: 'Electronics',
    isUnavailable: true,
    icon: 'e-icons e-mouse'
  }
];

public fields = {
  text: 'productName',
  value: 'code',
  groupBy: 'category',
  iconCss: 'icon',
  disabled: 'isUnavailable'
};
```

---

## Troubleshooting Data Binding

### Issue: Selected Item is Undefined

**Cause**: Field mapping is incorrect or incomplete

**Solution**: Ensure field names match your data structure:

```typescript
// ❌ WRONG
this.items = [
  { label: 'Item 1', key: '1' }
];
// Fields still default to 'text' and 'id'

// ✅ CORRECT
this.fields = { text: 'label', value: 'key' };
this.items = [
  { label: 'Item 1', key: '1' }
];
```

### Issue: ListBox Shows Empty

**Cause**: DataSource is null, undefined, or not populated

**Solution**: Check data initialization:

```typescript
ngOnInit(): void {
  // Ensure data is populated before component renders
  this.items = this.getItems();
}

getItems(): any[] {
  return [
    { text: 'Item 1', id: '1' },
    { text: 'Item 2', id: '2' }
  ];
}
```

### Issue: Remote Data Not Showing

**Cause**: DataManager URL is incorrect or service unavailable

**Solution**: Verify service and test with browser console:

```typescript
// Test DataManager in component
this.dataManager?.executeQuery(new Query()).then(
  result => console.log('Data loaded:', result)
);
```

### Issue: Text Shows but Value Doesn't Update

**Cause**: Value field mapping is missing or wrong

**Solution**: Always map both text and value:

```typescript
public fields = {
  text: 'name',      // What user sees
  value: 'id'        // What gets submitted
};
```

---

## Performance Tips

### For Large Datasets

1. **Restrict Height to Enable Scrolling**:
```typescript
// Setting a fixed height enables a scrollbar for large lists
<ejs-listbox 
  [dataSource]="largeDataset"
  height="300px">
</ejs-listbox>
```

2. **Load Data Progressively**:
```typescript
// Load first 50 items
this.query = new Query().take(50).skip(0);
```

3. **Filter Before Binding**:
```typescript
// Only bind items that match criteria
this.items = this.items.filter(item => item.active);
```

---

## Next Steps

- Explore [selection-modes.md](selection-modes.md) to handle user selections
- See [customization.md](customization.md) to display complex item templates
- Review [practical-examples.md](practical-examples.md) for filtering examples
