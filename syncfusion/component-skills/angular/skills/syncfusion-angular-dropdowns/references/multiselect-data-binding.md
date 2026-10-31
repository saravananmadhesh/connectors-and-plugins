# Data Binding — Syncfusion Angular MultiSelect Dropdown

## Table of Contents
- [Overview](#overview)
- [Fields Mapping](#fields-mapping)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [Value Binding](#value-binding)
- [Object Binding](#object-binding)
- [Edge Cases](#edge-cases)

---

## Overview

The MultiSelect loads data via its `dataSource` property, which accepts:
- Plain arrays: `string[]`, `number[]`, `object[]`
- A `DataManager` instance for remote or OData sources

Use the `fields` property to tell MultiSelect which properties in your data objects map to display text, stored values, grouping, icons, and disabled state.

---

## Fields Mapping

The `fields` object connects your data shape to MultiSelect internals:

| Field | Type | Purpose |
|---|---|---|
| `text` | `string` | Property to display in the list and chip |
| `value` | `string` | Property stored as the selected value |
| `groupBy` | `string` | Property used to group items under headers |
| `iconCss` | `string` | CSS class name for a leading icon |
| `disabled` | `string` | Boolean property that disables the item |

```typescript
public fields = {
  text: 'categoryName',   // shown in dropdown list
  value: 'categoryId',    // stored in component value
  groupBy: 'type',        // groups items by this property
  iconCss: 'icon',        // renders icon span with this CSS class
  disabled: 'isDisabled'  // items where isDisabled=true are non-selectable
};
```

> When `fields` is not set, the component expects a plain array of strings/numbers and uses each item as both text and value.

---

## Local Data Binding

### Array of Strings (simplest case)

No `fields` needed — each string is both display text and stored value:

```typescript
@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `<ejs-multiselect [dataSource]="colors" placeholder="Pick colors"></ejs-multiselect>`
})
export class AppComponent {
  public colors: string[] = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];
}
```

### Array of Numbers

```typescript
public scores: number[] = [10, 20, 30, 40, 50];
// template: <ejs-multiselect [dataSource]="scores" placeholder="Select scores">
```

### Array of Objects (most common)

Map properties via `fields`:

```typescript
import { Component, OnInit } from '@angular/core';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

interface Country {
  code: string;
  name: string;
  continent: string;
}

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="countries"
      [fields]="fields"
      placeholder="Select countries"
      [(value)]="selected">
    </ejs-multiselect>
  `
})
export class AppComponent implements OnInit {
  public countries: Country[] = [];
  public fields = { text: 'name', value: 'code' };
  public selected: string[] = ['US', 'CA']; // pre-select USA and Canada

  ngOnInit(): void {
    this.countries = [
      { code: 'US', name: 'United States', continent: 'Americas' },
      { code: 'CA', name: 'Canada',        continent: 'Americas' },
      { code: 'DE', name: 'Germany',       continent: 'Europe'   },
      { code: 'JP', name: 'Japan',         continent: 'Asia'     },
    ];
  }
}
```

---

## Remote Data Binding

Use `DataManager` for server-side data. The MultiSelect handles paging and queries automatically.

### OData V4

```typescript
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="dataManager"
      [fields]="fields"
      [query]="query"
      placeholder="Select customers">
    </ejs-multiselect>
  `
})
export class AppComponent {
  public dataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  });
  public fields = { text: 'CustomerID', value: 'CustomerID' };
  public query = new Query().from('Customers').select(['CustomerID']).take(10);
}
```

### Web API

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

public dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});
public fields = { text: 'productName', value: 'productId' };
```

---

## Value Binding

The `value` property holds the currently selected values as an array. Use two-way binding `[(value)]` to keep it in sync:

### Primitive Pre-selection

```typescript
// Pre-select by value (must match the 'value' field in your data)
public selectedIds: number[] = [1, 3, 5];

// Template:
// <ejs-multiselect [dataSource]="items" [fields]="fields" [(value)]="selectedIds">
```

### Reading Selected Values

```typescript
onChange(args: MultiSelectChangeEventArgs): void {
  console.log('Selected values:', args.value);       // array of value-field values
  console.log('Selected items:', args.itemData);     // not available on MultiSelect change
}

// Or read directly: this.multiSelectInstance.value
```

---

## Object Binding

When `allowObjectBinding` is `true`, the `value` property contains full objects instead of scalar values. This is useful when the downstream code needs the entire selected record, not just its ID.

```typescript
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

interface Product { id: number; name: string; price: number; }

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="products"
      [fields]="fields"
      [allowObjectBinding]="true"
      [(value)]="selectedProducts">
    </ejs-multiselect>
    <p>Selected: {{ selectedProducts | json }}</p>
  `
})
export class AppComponent {
  public products: Product[] = [
    { id: 1, name: 'Laptop',  price: 999  },
    { id: 2, name: 'Monitor', price: 299  },
    { id: 3, name: 'Keyboard', price: 79  },
  ];
  public fields = { text: 'name', value: 'id' };
  // When allowObjectBinding=true, value holds Product[] not number[]
  public selectedProducts: Product[] = [this.products[0]];
}
```

> **Note:** When `allowObjectBinding` is `false` (default), `value` holds an array of the mapped `fields.value` scalars (e.g., `number[]` or `string[]`). With `allowObjectBinding: true`, it holds objects of the same type as data source entries.

---

## Edge Cases

**Complex nested objects:**
- Use dot-notation in `fields.text` is NOT supported — flatten your data or use `itemTemplate` to display nested properties

**Fields not mapped / undefined values:**
- If `fields.value` points to a non-existent property, selected values will be `undefined`
- Always verify `fields.text` and `fields.value` match your actual object property names (case-sensitive)

**Pre-selecting with mismatched types:**
- If `fields.value` maps to a `number` field but you pre-populate `value` with `string[]`, nothing will be selected
- Ensure the type of `value[]` elements matches the type of the `fields.value` property

**Empty data source:**
- The `noRecordsTemplate` is displayed when `dataSource` is empty or the filter matches nothing
- See `references/advanced-features.md` for localization of this template
