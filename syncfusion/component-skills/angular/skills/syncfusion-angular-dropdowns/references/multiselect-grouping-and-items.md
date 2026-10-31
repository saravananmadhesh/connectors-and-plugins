# Grouping & Cascading — Syncfusion Angular MultiSelect Dropdown

## Table of Contents
- [Grouping Items](#grouping-items)
- [Fixed vs Inline Group Headers](#fixed-vs-inline-group-headers)
- [Group CheckBox Selection](#group-checkbox-selection)
- [Cascading MultiSelect](#cascading-multiselect)
- [Three-Level Cascade Example](#three-level-cascade-example)
- [Cascade Edge Cases](#cascade-edge-cases)

---

## Grouping Items

Organize list items into labelled categories by mapping a `groupBy` field:

```typescript
import { Component, OnInit } from '@angular/core';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

interface Vegetable {
  id: number;
  name: string;
  type: string; // the grouping field
}

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="vegetables"
      [fields]="fields"
      placeholder="Select vegetables">
    </ejs-multiselect>
  `
})
export class AppComponent implements OnInit {
  public vegetables: Vegetable[] = [];
  // groupBy: 'type' → items grouped under 'Root Vegetable', 'Leafy Green', etc.
  public fields = { text: 'name', value: 'id', groupBy: 'type' };

  ngOnInit(): void {
    this.vegetables = [
      { id: 1, name: 'Carrot',   type: 'Root Vegetable' },
      { id: 2, name: 'Turnip',   type: 'Root Vegetable' },
      { id: 3, name: 'Spinach',  type: 'Leafy Green'    },
      { id: 4, name: 'Kale',     type: 'Leafy Green'    },
      { id: 5, name: 'Broccoli', type: 'Cruciferous'    },
      { id: 6, name: 'Cauliflower', type: 'Cruciferous' },
    ];
  }
}
```

---

## Fixed vs Inline Group Headers

The MultiSelect supports two group header styles:

- **Inline headers** — group label appears within the list flow between items
- **Fixed headers** — group label stays pinned at the top of the popup while scrolling; updates dynamically to show the current group

Both styles are built-in — no extra configuration is required. The fixed header activates automatically when the popup has a constrained height and the user scrolls.

---

## Group CheckBox Selection

Enable checkbox-per-group to let users select all items in a group with one click:

```typescript
import { Component } from '@angular/core';
import {
  MultiSelectModule,
  CheckBoxSelectionService
} from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  providers: [CheckBoxSelectionService],
  template: `
    <ejs-multiselect
      [dataSource]="products"
      [fields]="fields"
      mode="CheckBox"
      [showSelectAll]="true"
      [enableGroupCheckBox]="true"
      [enableSelectionOrder]="false"
      placeholder="Select products by category">
    </ejs-multiselect>
  `
})
export class AppComponent {
  public products = [
    { id: 1, name: 'Laptop',    category: 'Electronics' },
    { id: 2, name: 'Phone',     category: 'Electronics' },
    { id: 3, name: 'Desk',      category: 'Furniture'   },
    { id: 4, name: 'Chair',     category: 'Furniture'   },
    { id: 5, name: 'Notebook',  category: 'Stationery'  },
    { id: 6, name: 'Pen',       category: 'Stationery'  },
  ];
  public fields = { text: 'name', value: 'id', groupBy: 'category' };
}
```

**Important property: `enableSelectionOrder`**

When `mode="CheckBox"` and grouping is enabled, by default selected items move out of their group headers in the popup (`enableSelectionOrder: true`). To keep selected items under their respective group headers, set:

```html
[enableSelectionOrder]="false"
```

This is the recommended setting when using `enableGroupCheckBox` for a coherent grouped UX.

---

## Cascading MultiSelect

A cascading setup links two or more MultiSelect components so the selection in the parent determines the available options in the child.

**How it works:**
1. Listen to the parent's `(change)` event
2. In the handler, clear the child's value and disable it
3. Filter the child's data source based on the parent's new selection
4. Re-enable the child

```typescript
import { Component, ViewChild } from '@angular/core';
import { MultiSelectModule, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <h3>Category</h3>
    <ejs-multiselect
      #categoryMs
      [dataSource]="categories"
      [fields]="catFields"
      [changeOnBlur]="false"
      (change)="onCategoryChange($event)"
      placeholder="Select categories">
    </ejs-multiselect>

    <h3>Products (filtered by category)</h3>
    <ejs-multiselect
      #productMs
      [dataSource]="filteredProducts"
      [fields]="prodFields"
      [enabled]="productEnabled"
      placeholder="Select products">
    </ejs-multiselect>
  `
})
export class AppComponent {
  @ViewChild('categoryMs') categoryMs!: MultiSelectComponent;
  @ViewChild('productMs')  productMs!: MultiSelectComponent;

  public categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Furniture'   },
    { id: 3, name: 'Stationery'  },
  ];
  public catFields = { text: 'name', value: 'id' };

  public allProducts = [
    { id: 101, name: 'Laptop',   categoryId: 1 },
    { id: 102, name: 'Phone',    categoryId: 1 },
    { id: 201, name: 'Desk',     categoryId: 2 },
    { id: 202, name: 'Chair',    categoryId: 2 },
    { id: 301, name: 'Notebook', categoryId: 3 },
    { id: 302, name: 'Pen',      categoryId: 3 },
  ];
  public prodFields = { text: 'name', value: 'id' };
  public filteredProducts: typeof this.allProducts = [];
  public productEnabled = false;

  onCategoryChange(args: any): void {
    const selectedCategoryIds: number[] = args.value as number[] || [];

    // Step 1: Reset and disable child
    this.productMs.value = [];
    this.productEnabled = false;

    if (selectedCategoryIds.length === 0) return;

    // Step 2: Filter child data
    this.filteredProducts = this.allProducts.filter(p =>
      selectedCategoryIds.includes(p.categoryId)
    );

    // Step 3: Re-enable child
    this.productEnabled = true;
  }
}
```

**Why `[changeOnBlur]="false"` on the parent?**  
By default the `change` event fires on blur. Setting `changeOnBlur="false"` makes it fire immediately on each selection, so the child updates in real time without the user having to click away first.

---

## Three-Level Cascade Example

Country → State → City pattern:

```typescript
// In your component class:
onCountryChange(args: any): void {
  const selected = args.value as string[];

  // Reset state and city
  this.stateMs.value = [];
  this.cityMs.value = [];
  this.stateEnabled = false;
  this.cityEnabled = false;
  this.filteredStates = [];
  this.filteredCities = [];

  if (!selected?.length) return;

  this.filteredStates = this.allStates.filter(s => selected.includes(s.countryId));
  this.stateEnabled = true;
}

onStateChange(args: any): void {
  const selected = args.value as string[];

  this.cityMs.value = [];
  this.cityEnabled = false;
  this.filteredCities = [];

  if (!selected?.length) return;

  this.filteredCities = this.allCities.filter(c => selected.includes(c.stateId));
  this.cityEnabled = true;
}
```

---

## Cascade Edge Cases

**Multiple parent selections:**
- When the parent is a MultiSelect (not just single-select), the child filter must handle an **array** of selected parent IDs — use `Array.includes()` or a `Set` for the filter

**Clearing parent resets chain:**
- Always reset all downstream children when the parent is cleared (value becomes `[]` or `null`)

**Initial disabled state:**
- Set `[enabled]="false"` on child components at initialization; only enable them after parent selection

**Reading selection from event args:**
- Use `args.value` from the `(change)` event to read the current selection rather than accessing the component instance directly, to ensure you have the latest committed value
