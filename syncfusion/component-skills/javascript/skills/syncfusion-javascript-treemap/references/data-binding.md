# TreeMap Data Binding (TypeScript and JavaScript)

## Table of Contents

- [Overview](#overview)
- [Flat Collection Binding](#flat-collection-binding)
  - [Basic Flat Collection](#basic-flat-collection)
  - [Weighted Collection](#weighted-collection)
- [Hierarchical Collection Binding](#hierarchical-collection-binding)
  - [Two-Level Hierarchy](#two-level-hierarchy)
  - [Multi-Level Hierarchy](#multi-level-hierarchy)
- [Data Source Properties Mapping](#data-source-properties-mapping)
- [Dynamic Data Updates](#dynamic-data-updates)
  - [Framework-Specific Update Pattern](#framework-specific-update-pattern)
- [Structured Hierarchical Objects](#structured-hierarchical-objects)
  - [Nested Source Example](#nested-source-example)
  - [Flatten Before Binding](#flatten-before-binding)
- [Data Format Best Practices](#data-format-best-practices)
  - [Clear Field Names](#clear-field-names)
  - [Ambiguous Field Names](#ambiguous-field-names)
  - [Consistent Data Types](#consistent-data-types)
  - [Mixed Data Types](#mixed-data-types)
- [Troubleshooting](#troubleshooting)
- [See Also](#see-also)

## Overview

This guide covers both TypeScript and JavaScript implementations of Syncfusion TreeMap data binding. TreeMap rendering is driven by a collection of items plus one required numeric field mapped through `weightValuePath`. You can bind simple flat collections directly, and you can visualize grouped or hierarchical relationships by configuring `levels` with `groupPath` fields over the bound data.


## Flat Collection Binding

Use a flat collection when your dataset is a single list of items and each rectangle is represented directly by one data object.

### Basic Flat Collection

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const treeMapContainer = document.getElementById('treemap-container');

const treeMap = new TreeMap({
  dataSource: [
    { Item: 'Laptop', Size: 150 },
    { Item: 'Phone', Size: 200 },
    { Item: 'Tablet', Size: 100 },
    { Item: 'Watch', Size: 50 }
  ],
  weightValuePath: 'Size',
  leafItemSettings: {
    labelPath: 'Item',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var treeMap = new ej.treemap.TreeMap({
  dataSource: [
    { Item: 'Laptop', Size: 150 },
    { Item: 'Phone', Size: 200 },
    { Item: 'Tablet', Size: 100 },
    { Item: 'Watch', Size: 50 }
  ],
  weightValuePath: 'Size',
  leafItemSettings: {
    labelPath: 'Item',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 400px;"></div>
```

### Weighted Collection

Use `weightValuePath` to specify the numeric field that determines the area of each leaf item.

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const treeMap = new TreeMap({
  dataSource: [
    { Product: 'A', Sales: 15000, Category: 'Electronics' },
    { Product: 'B', Sales: 12000, Category: 'Electronics' },
    { Product: 'C', Sales: 8000, Category: 'Furniture' }
  ],
  weightValuePath: 'Sales'
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var treeMap = new ej.treemap.TreeMap({
  dataSource: [
    { Product: 'A', Sales: 15000, Category: 'Electronics' },
    { Product: 'B', Sales: 12000, Category: 'Electronics' },
    { Product: 'C', Sales: 8000, Category: 'Furniture' }
  ],
  weightValuePath: 'Sales'
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 400px;"></div>
```

**Key Point:** Items with larger numeric values in the `weightValuePath` field render as larger rectangles.

## Hierarchical Collection Binding

For TreeMap, hierarchy is commonly represented by grouping fields in the data source and then mapping those fields with `levels` and `groupPath`. This means the data is often still a flat array, but TreeMap renders it as grouped hierarchy.

### Two-Level Hierarchy

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const treeMap = new TreeMap({
  dataSource: [
    { Region: 'North America', Country: 'United States', Value: 25460 },
    { Region: 'North America', Country: 'Mexico', Value: 1286 },
    { Region: 'Europe', Country: 'Germany', Value: 3846 },
    { Region: 'Europe', Country: 'France', Value: 2781 }
  ],
  weightValuePath: 'Value',
  levels: [
    { groupPath: 'Region' },
    { groupPath: 'Country' }
  ],
  leafItemSettings: {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var treeMap = new ej.treemap.TreeMap({
  dataSource: [
    { Region: 'North America', Country: 'United States', Value: 25460 },
    { Region: 'North America', Country: 'Mexico', Value: 1286 },
    { Region: 'Europe', Country: 'Germany', Value: 3846 },
    { Region: 'Europe', Country: 'France', Value: 2781 }
  ],
  weightValuePath: 'Value',
  levels: [
    { groupPath: 'Region' },
    { groupPath: 'Country' }
  ],
  leafItemSettings: {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 400px;"></div>
```

### Multi-Level Hierarchy (3+ Levels)

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const treeMap = new TreeMap({
  dataSource: [
    { Continent: 'North America', Region: 'Canada', Country: 'Toronto', Value: 500 },
    { Continent: 'North America', Region: 'USA', Country: 'California', Value: 800 },
    { Continent: 'Europe', Region: 'Western', Country: 'France', Value: 600 }
  ],
  weightValuePath: 'Value',
  levels: [
    { groupPath: 'Continent', headerFormat: '${Continent}' },
    { groupPath: 'Region', headerFormat: '${Region}' },
    { groupPath: 'Country', headerFormat: '${Country}' }
  ],
  leafItemSettings: {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var treeMap = new ej.treemap.TreeMap({
  dataSource: [
    { Continent: 'North America', Region: 'Canada', Country: 'Toronto', Value: 500 },
    { Continent: 'North America', Region: 'USA', Country: 'California', Value: 800 },
    { Continent: 'Europe', Region: 'Western', Country: 'France', Value: 600 }
  ],
  weightValuePath: 'Value',
  levels: [
    { groupPath: 'Continent', headerFormat: '${Continent}' },
    { groupPath: 'Region', headerFormat: '${Region}' },
    { groupPath: 'Country', headerFormat: '${Country}' }
  ],
  leafItemSettings: {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 400px;"></div>
```

**Key Point:** In TreeMap, hierarchy is rendered from field mappings and grouping levels, not from a recursive UI binding pattern.

## Data Source Properties Mapping

Map your data fields carefully to the TreeMap properties that control size, grouping, labels, and optional color behavior.

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const treeMap = new TreeMap({
  dataSource: [
    { Department: 'Electronics', Product: 'Laptop', Sales: 15000, Color: '#2563eb' },
    { Department: 'Electronics', Product: 'Phone', Sales: 12000, Color: '#16a34a' },
    { Department: 'Furniture', Product: 'Chair', Sales: 8000, Color: '#ea580c' }
  ],
  weightValuePath: 'Sales',
  colorValuePath: 'Color',
  levels: [
    { groupPath: 'Department' }
  ],
  leafItemSettings: {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var treeMap = new ej.treemap.TreeMap({
  dataSource: [
    { Department: 'Electronics', Product: 'Laptop', Sales: 15000, Color: '#2563eb' },
    { Department: 'Electronics', Product: 'Phone', Sales: 12000, Color: '#16a34a' },
    { Department: 'Furniture', Product: 'Chair', Sales: 8000, Color: '#ea580c' }
  ],
  weightValuePath: 'Sales',
  colorValuePath: 'Color',
  levels: [
    { groupPath: 'Department' }
  ],
  leafItemSettings: {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 400px;"></div>
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

TreeMap data can be updated after initialization by assigning a new data array and calling the `refresh()` method to redraw the component.

### Framework-Specific Update Pattern

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

let treeMap: TreeMap;

function initializeTreeMap(): void {
  treeMap = new TreeMap({
    dataSource: [
      { Item: 'A', Value: 100 },
      { Item: 'B', Value: 200 }
    ],
    weightValuePath: 'Value',
    leafItemSettings: {
      labelPath: 'Item',
      gap: 4,
      border: { color: '#ffffff', width: 1 }
    }
  });

  treeMap.appendTo('#treemap-container');
}

function updateData(): void {
  treeMap.dataSource = [
    { Item: 'A', Value: 150 },
    { Item: 'B', Value: 250 },
    { Item: 'C', Value: 180 }
  ];
  treeMap.refresh();
}

// Call initializeTreeMap() after DOM is ready
initializeTreeMap();
```

#### JavaScript Implementation

```javascript
var treeMap;

function initializeTreeMap() {
  treeMap = new ej.treemap.TreeMap({
    dataSource: [
      { Item: 'A', Value: 100 },
      { Item: 'B', Value: 200 }
    ],
    weightValuePath: 'Value',
    leafItemSettings: {
      labelPath: 'Item',
      gap: 4,
      border: { color: '#ffffff', width: 1 }
    }
  });

  treeMap.appendTo('#treemap-container');
}

function updateData() {
  treeMap.dataSource = [
    { Item: 'A', Value: 150 },
    { Item: 'B', Value: 250 },
    { Item: 'C', Value: 180 }
  ];
  treeMap.refresh();
}

// Call initializeTreeMap() after DOM is ready
initializeTreeMap();
```

#### HTML Container

```html
<button type="button" onclick="updateData()">Update Data</button>
<div id="treemap-container" style="width: 100%; height: 400px;"></div>
```

**Key Point:** Always call `refresh()` after updating the `dataSource` property to ensure the TreeMap redraws with the new data.

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

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

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

function flattenData(nestedData: CategoryItem[]): FlattenedItem[] {
  const result: FlattenedItem[] = [];

  for (const category of nestedData) {
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
}

const nestedData: CategoryItem[] = [
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

const flattenedData = flattenData(nestedData);

const treeMap = new TreeMap({
  dataSource: flattenedData,
  weightValuePath: 'Value',
  levels: [
    {
      groupPath: 'Category',
      headerFormat: '${Category}',
      fill: '#dbeafe',
      border: { color: '#93c5fd', width: 1 }
    }
  ],
  leafItemSettings: {
    labelPath: 'Item',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
function flattenData(nestedData) {
  var result = [];

  for (var i = 0; i < nestedData.length; i++) {
    var category = nestedData[i];
    for (var j = 0; j < category.children.length; j++) {
      var child = category.children[j];
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
}

var nestedData = [
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

var flattenedData = flattenData(nestedData);

var treeMap = new ej.treemap.TreeMap({
  dataSource: flattenedData,
  weightValuePath: 'Value',
  levels: [
    {
      groupPath: 'Category',
      headerFormat: '${Category}',
      fill: '#dbeafe',
      border: { color: '#93c5fd', width: 1 }
    }
  ],
  leafItemSettings: {
    labelPath: 'Item',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 500px;"></div>
```

**Key Point:** Keep the nested source if that is how your application stores data, but transform it into a flat TreeMap input model before binding.

## Data Format Best Practices

### Clear Field Names

Use descriptive property names so that `weightValuePath`, `groupPath`, `labelPath`, and optional color mappings are easy to understand and maintain.

**Example:**

```typescript
{ Department: 'Sales', Employee: 'John', Revenue: 5000 }
```

### Ambiguous Field Names

Short unclear field names make configuration harder to read and easier to misconfigure. Avoid abbreviated or cryptic names.

**Example to avoid:**

```typescript
{ d: 'Sales', e: 'John', r: 5000 }
```

### Consistent Data Types

The field mapped to `weightValuePath` should remain numeric for all items.

**Example:**

```typescript
{ Item: 'Product A', Sales: 15000 }
{ Item: 'Product B', Sales: 12000 }
```

### Mixed Data Types

Avoid mixing numbers and strings in the same mapped field. TreeMap size calculations should use a consistent numeric type.

**Example to avoid:**

```typescript
{ Item: 'Product A', Sales: 15000 }
{ Item: 'Product B', Sales: '12000' }
```

## Troubleshooting

**Issue:** TreeMap not rendering with data

**Solution:** Ensure `weightValuePath` points to an existing numeric field in your data source.

```typescript
const treeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales'  // Verify 'Sales' exists in all data items
});
```

**Issue:** Hierarchy not displaying correctly

**Solution:** Verify that every configured `groupPath` exists in the bound data items and that the field names are consistent across all records.

```typescript
levels: [
  { groupPath: 'Region' },    // Ensure 'Region' exists in all items
  { groupPath: 'Country' }    // Ensure 'Country' exists in all items
]
```

**Issue:** Labels are empty

**Solution:** Check that `leafItemSettings.labelPath` matches a valid field from the data source. Ensure the field contains non-empty values.

```typescript
leafItemSettings: {
  labelPath: 'Item'  // Verify 'Item' field exists and has values
}
```

**Issue:** Data changes not reflecting in TreeMap

**Solution:** After updating the `dataSource` property, always call the `refresh()` method to redraw the component.

```typescript
treeMap.dataSource = newData;
treeMap.refresh();  // Force redraw
```

## See Also

- [Getting Started with TreeMap](./getting-started.md)
- [Labels, Tooltips, and Legend Configuration](./labels-tooltips-legend.md)
- [Levels and Layout Customization](./levels-and-layout.md)
- [Selection and Interactivity](./selection-interactivity.md)
- [TreeMap Appearance and Styling](./style-appearance.md)
