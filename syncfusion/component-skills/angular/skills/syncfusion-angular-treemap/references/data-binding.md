# Data Binding in Angular TreeMap

## Table  of Contents

- [Overview](#overview)
- [Flat Collection Binding](#flat-collection-binding)
  - [Basic Flat Collection](#basic-flat-collection)
  - [Weighted Collection](#weighted-collection)
- [Hierarchical Collection Binding](#hierarchical-collection-binding)
  - [Two-Level Hierarchy](#two-level-hierarchy)
  - [Multi-Level Hierarchy (3+ Levels)](#multi-level-hierarchy-3-levels)
- [Data Source Properties Mapping](#data-source-properties-mapping)
- [Dynamic Data Updates](#dynamic-data-updates)
  - [Recommended Angular Update Pattern](#recommended-angular-update-pattern)
- [Structured Hierarchical Objects](#structured-hierarchical-objects)
  - [Nested Source Example](#nested-source-example)
  - [Flatten Before Binding](#flatten-before-binding)
- [Data Format Best Practices](#data-format-best-practices)
  - [DO: Clear Field Names](#do-clear-field-names)
  - [DON'T: Ambiguous Field Names](#dont-ambiguous-field-names)
  - [DO: Consistent Data Types](#do-consistent-data-types)
  - [DON'T: Mixed Data Types](#dont-mixed-data-types)
- [Troubleshooting](#troubleshooting)

## Overview

The Syncfusion Angular TreeMap binds data through the `dataSource` property. In practice, TreeMap rendering is driven by a collection of items plus one required numeric field mapped through `weightValuePath`. You can bind simple flat collections directly, and you can visualize grouped or hierarchical relationships by configuring `levels` with `groupPath` fields over the bound data.


## Flat Collection Binding

Use a flat collection when your dataset is a single list of items and each rectangle is represented directly by one data object.

### Basic Flat Collection

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Size"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  data = signal([
    { Item: 'Laptop', Size: 150 },
    { Item: 'Phone', Size: 200 },
    { Item: 'Tablet', Size: 100 },
    { Item: 'Watch', Size: 50 }
  ]);

  leafItemSettings = {
    labelPath: 'Item',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

### Weighted Collection

Use `weightValuePath` to specify the numeric field that determines the area of each leaf item.

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Sales">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
    data = signal([
        { Product: 'A', Sales: 15000, Category: 'Electronics' },
        { Product: 'B', Sales: 12000, Category: 'Electronics' },
        { Product: 'C', Sales: 8000, Category: 'Furniture' }
      ]);

}
```

**Key Point:** Items with larger numeric values in the `weightValuePath` field render as larger rectangles.

## Hierarchical Collection Binding

For TreeMap, hierarchy is commonly represented by grouping fields in the data source and then mapping those fields with `levels` and `groupPath`. This means the data is often still a flat array, but TreeMap renders it as grouped hierarchy.

### Two-Level Hierarchy

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Value"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  data = signal([
    { Region: 'North America', Country: 'United States', Value: 25460 },
    { Region: 'North America', Country: 'Mexico', Value: 1286 },
    { Region: 'Europe', Country: 'Germany', Value: 3846 },
    { Region: 'Europe', Country: 'France', Value: 2781 }
  ]);

  levels = [
    { groupPath: 'Region' },
    { groupPath: 'Country' }
  ];

  leafItemSettings = {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

### Multi-Level Hierarchy (3+ Levels)

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Value"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  data = signal([
    { Continent: 'North America', Region: 'Canada', Country: 'Toronto', Value: 500 },
    { Continent: 'North America', Region: 'USA', Country: 'California', Value: 800 },
    { Continent: 'Europe', Region: 'Western', Country: 'France', Value: 600 }
  ]);

  levels = [
    { groupPath: 'Continent', headerFormat: '${Continent}' },
    { groupPath: 'Region', headerFormat: '${Region}' },
    { groupPath: 'Country', headerFormat: '${Country}' }
  ];

  leafItemSettings = {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

**Clarified Definition:** In TreeMap, this is still typically a grouped data-source approach. The hierarchy is rendered from field mappings, not from a TreeView-style recursive UI binding pattern.

## Data Source Properties Mapping

Map your data fields carefully to the TreeMap properties that control size, grouping, labels, and optional color behavior.

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      colorValuePath="Color"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  data = signal([
    { Department: 'Electronics', Product: 'Laptop', Sales: 15000, Color: '#2563eb' },
    { Department: 'Electronics', Product: 'Phone', Sales: 12000, Color: '#16a34a' },
    { Department: 'Furniture', Product: 'Chair', Sales: 8000, Color: '#ea580c' }
  ]);

  levels = [
    { groupPath: 'Department' }
  ];

  leafItemSettings = {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

**Common mappings:**

- `dataSource`: The collection bound to the TreeMap.
- `weightValuePath`: The numeric field that controls leaf size.
- `labelPath` in `leafItemSettings`: The field displayed as the leaf label.
- `groupPath` in `levels`: The field used to form grouped hierarchy.
- `colorValuePath`: Optional direct color field from the data source.
- `equalColorValuePath`: Optional field used for exact-match color mapping.
- `rangeColorValuePath`: Optional field used for numeric range color mapping.

**Important:** Do not treat `colorValuePath`, `equalColorValuePath`, and `rangeColorValuePath` as if they all need to be enabled together. They represent different coloring strategies and should be used intentionally.

## Dynamic Data Updates

TreeMap data can be updated after initialization. In Angular, the cleanest approach is to replace the bound collection reference. This works well with Signals and keeps the update flow declarative.

### Recommended Angular Update Pattern

```typescript
import { Component, signal, ViewChild } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <button type="button" (click)="updateData()">Update Data</button>

    <ejs-treemap
      #treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Value"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  treemap = ViewChild('treemap');

  data = signal([
    { Item: 'A', Value: 100 },
    { Item: 'B', Value: 200 }
  ]);

  leafItemSettings = {
    labelPath: 'Item',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };

  updateData(): void {
    this.data.set([
      { Item: 'A', Value: 150 },
      { Item: 'B', Value: 250 },
      { Item: 'C', Value: 180 }
    ]);

    const instance = this.treemap();
    if (instance) {
      instance.refresh();
    }
  }
}
```

**Updated Definition:** If your Angular wrapper already reacts properly to a new array reference, a manual `refresh()` may not always be necessary. It is still reasonable to keep it when you want to force immediate redraw behavior after imperative changes.

## Structured Hierarchical Objects

If your source data is deeply nested with `children` arrays, that structure is not the most TreeMap-friendly binding format for grouped `levels` rendering. Instead of binding the nested structure directly as-is, preprocess it into a flattened collection that contains the grouping fields TreeMap expects.

### Nested Source Example

```typescript
nestedData = [
  {
    id: '1',
    name: 'Electronics',
    children: [
      { id: '1a', name: 'Laptops', value: 150 },
      { id: '1b', name: 'Phones', value: 200 }
    ]
  },
  {
    id: '2',
    name: 'Furniture',
    children: [
      { id: '2a', name: 'Chairs', value: 100 },
      { id: '2b', name: 'Tables', value: 120 }
    ]
  }
];
```

### Flatten Before Binding

```typescript
import { Component, computed, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

interface ChildItem {
  id: string;
  name: string;
  value: number;
}

interface CategoryItem {
  id: string;
  name: string;
  children: ChildItem[];
}

interface FlattenedItem {
  CategoryId: string;
  Category: string;
  ItemId: string;
  Item: string;
  Value: number;
}

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      id="treemap-container"
      [dataSource]="flattenedData()"
      weightValuePath="Value"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `,
  styles: [`
    :host {
      display: block;
      padding: 12px;
      box-sizing: border-box;
    }

    #treemap-container {
      display: block;
      width: 100%;
      height: 500px;
    }
  `]
})
export class TreeMapComponent {
  public nestedData = signal<CategoryItem[]>([
    {
      id: '1',
      name: 'Electronics',
      children: [
        { id: '1a', name: 'Laptops', value: 150 },
        { id: '1b', name: 'Phones', value: 200 }
      ]
    },
    {
      id: '2',
      name: 'Furniture',
      children: [
        { id: '2a', name: 'Chairs', value: 100 },
        { id: '2b', name: 'Tables', value: 120 }
      ]
    }
  ]);

  public flattenedData = computed<FlattenedItem[]>(() => {
    const result: FlattenedItem[] = [];
    const categories = this.nestedData();

    for (const category of categories) {
      for (const child of category.children) {
        result.push({
          CategoryId: category.id,
          Category: category.name,
          ItemId: child.id,
          Item: child.name,
          Value: child.value
        });
      }
    }

    return result;
  });

  public levels = [
    {
      groupPath: 'Category',
      headerFormat: '${Category}',
      fill: '#dbeafe',
      border: { color: '#93c5fd', width: 1 }
    }
  ];

  public leafItemSettings = {
    labelPath: 'Item',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

**Updated Definition:** Keep the nested source if that is how your application stores data, but transform it into a flat TreeMap input model before binding.

## Data Format Best Practices

### DO: Clear Field Names

```typescript
{ Department: 'Sales', Employee: 'John', Revenue: 5000 }
```

Use descriptive property names so that `weightValuePath`, `groupPath`, `labelPath`, and optional color mappings are easy to understand and maintain.

### DON'T: Ambiguous Field Names

```typescript
{ d: 'Sales', e: 'John', r: 5000 }
```

Short unclear field names make configuration harder to read and easier to misconfigure.

### DO: Consistent Data Types

```typescript
{ Item: 'Product A', Sales: 15000 }
{ Item: 'Product B', Sales: 12000 }
```

The field mapped to `weightValuePath` should remain numeric for all items.

### DON'T: Mixed Data Types

```typescript
{ Item: 'Product A', Sales: 15000 }
{ Item: 'Product B', Sales: '12000' }
```

Avoid mixing numbers and strings in the same mapped field. TreeMap size calculations should use a consistent numeric type.

## Troubleshooting

**Issue:** TreeMap not rendering with data

**Solution:** Ensure `weightValuePath` points to an existing numeric field.

```typescript
<ejs-treemap
  [dataSource]="data()"
  weightValuePath="Sales">
</ejs-treemap>
```

**Issue:** Hierarchy not displaying correctly

**Solution:** Verify that every configured `groupPath` exists in the bound data items and that the field names are consistent.

```typescript
levels = [
  { groupPath: 'Region' },
  { groupPath: 'Country' }
];
```

**Issue:** Labels are empty

**Solution:** Check that `leafItemSettings.labelPath` matches a valid field from the data source.

```typescript
leafItemSettings = {
  labelPath: 'Item'
};
```

**Issue:** Data changes not reflecting in TreeMap

**Solution:** Replace the bound array reference, and if needed, call `refresh()` after imperative updates.

```typescript
this.data.set(newData);
this.treemap()?.refresh();
```
