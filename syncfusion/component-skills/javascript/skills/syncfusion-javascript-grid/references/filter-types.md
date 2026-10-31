---
name: filter-types
description: 'Filter types in Syncfusion Grid: FilterBar, Menu, Excel filters with templates and operators.'
---

# Filter Types: Bar, Menu, and Excel

## Table of Contents
- [1. FilterBar Filter](#1-filterbar-filter)
- [2. Menu Filter](#2-menu-filter)
- [3. Excel Filter](#3-excel-filter)

## When to Use This Reference

- Choose appropriate filter type for each column
- Implement menu filters, text filters, and checkboxes
- Configure filter UI appearance and behavior
- Support different data type filtering
- Create custom filter templates and interactions

---

## 1. FilterBar Filter

### When to Use?
- Users need quick text-based search with instant feedback
- Dataset < 10k rows (no performance issues)
- Simple string matching, not complex boolean logic
- Mobile-friendly, minimal UI footprint

### Setup
```ts
import { Grid, Filter } from '@syncfusion/ej2-grids';

Grid.Inject(Filter);

const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'FilterBar' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 }
  ]
});

grid.appendTo('#grid');
```

### Filter Expressions (Built-in Operators)
| Expression | Meaning | Example |
|-----------|---------|---------|
| `=value` | Equals | `=VINET` |
| `!=value` | Not equals | `!=USA` |
| `>value` / `<value` | Greater/Less than | `>100` |
| `*value` | Starts with | `*VIN` |
| `%value` | Ends with | `%ET` |

### Modes: Immediate vs OnEnter
```ts
// Immediate (default) - Filter as you type
const filterSettings = { mode: 'Immediate', type: 'FilterBar' };

// OnEnter - Filter on Enter key press (better for large datasets)
const filterSettings = { mode: 'OnEnter', type: 'FilterBar' };

const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: filterSettings,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### Template Lifecycle (create/read/write/destroy)

Replace default text input with custom components:

```ts
import { Grid, Filter } from '@syncfusion/ej2-grids';
import { DatePicker } from '@syncfusion/ej2-calendars';

Grid.Inject(Filter);

let datePickerInstance: DatePicker;

const dateFilterTemplate = {
  create: (args: any) => {
    // Step 1: Initialize component once
    const input = document.createElement('input');
    args.target.appendChild(input);
    datePickerInstance = new DatePicker({ value: null });
    datePickerInstance.appendTo(input);
  },
  
  write: (args: any) => {
    // Step 2: Display existing filter value (if any)
    if (datePickerInstance) {
      datePickerInstance.value = args.filteredValue || null;
    }
  },
  
  read: (args: any) => {
    // Step 3: Called when user applies filter - extract value
    if (datePickerInstance) {
      args.fltrObj.filterByColumn(args.column.field, 'equal', datePickerInstance.value);
    }
  },
  
  destroy: () => {
    // Step 4: Optional cleanup
    if (datePickerInstance) {
      datePickerInstance.destroy();
    }
  }
};

const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'FilterBar' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'OrderDate', headerText: 'Order Date', width: 100, filterBarTemplate: dateFilterTemplate }
  ]
});

grid.appendTo('#grid');
```

**Lifecycle Flow:** `create()` runs once → `write()` syncs previous filter (if exists) → `read()` extracts new value → `destroy()` cleans up.

---

## 2. Menu Filter

### When to Use?
- Need specific operators for typed data (dates: before/after; numbers: >, <, between)
- Power users want complex boolean filtering
- Different data types need different comparison logic

### Setup
```ts
import { Grid, Filter } from '@syncfusion/ej2-grids';

Grid.Inject(Filter);

const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'Menu' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 100 }
  ]
});

grid.appendTo('#grid');
```

### Custom Components via filter.ui

Replace default input (AutoComplete, DatePicker) with custom UI:

```ts
import { Grid, Filter } from '@syncfusion/ej2-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

Grid.Inject(Filter);

let dropdownInstance: DropDownList;

const customDropDown = {
  ui: {
    create: (args: any) => {
      // Initialize custom component
      const input = document.createElement('input');
      args.target.appendChild(input);
      dropdownInstance = new DropDownList({
        dataSource: ['USA', 'UK', 'Canada', 'Germany'],
        value: null,
        change: () => {
          args.fltrObj.filterByColumn(args.column.field, args.operator, dropdownInstance.value);
        }
      });
      dropdownInstance.appendTo(input);
    },
    
    read: (args: any) => {
      // Called on Apply - extract value and filter
      if (dropdownInstance) {
        args.fltrObj.filterByColumn(args.column.field, args.operator, dropdownInstance.value);
      }
    },
    
    write: (args: any) => {
      // Sync existing filter to component
      if (dropdownInstance) {
        dropdownInstance.value = args.filteredValue;
      }
    }
  }
};

const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'Menu' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'ShipCountry', headerText: 'Ship Country', width: 120, filter: customDropDown }
  ]
});

grid.appendTo('#grid');
```

### Customize Operators per Data Type

Limit available operators for specific column types:

```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: {
    type: 'Menu',
    operators: {
      stringOperator: [
        { value: 'startswith', text: 'Starts With' },
        { value: 'contains', text: 'Contains' },
        { value: 'equal', text: 'Equals' }
      ],
      numberOperator: [
        { value: 'equal', text: 'Equal' },
        { value: 'greaterthan', text: '>' },
        { value: 'lessthan', text: '<' }
      ],
      dateOperator: [
        { value: 'equal', text: '=' },
        { value: 'greaterthan', text: 'After' }
      ]
    }
  },
  columns: [
    { field: 'CustomerID', headerText: 'Customer ID', width: 100 },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 100 }
  ]
});

grid.appendTo('#grid');
```

### Multiple Values Filter (MultiSelect)

Filter with multiple selected values simultaneously:

```ts
import { Grid, Filter } from '@syncfusion/ej2-grids';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

Grid.Inject(Filter);

let multiSelectInstance: MultiSelect;

const multiSelectFilter = {
  ui: {
    create: (args: any) => {
      const input = document.createElement('input');
      args.target.appendChild(input);
      multiSelectInstance = new MultiSelect({
        dataSource: ['VINET', 'TOMSP', 'HANAR', 'GOURL'],
        fields: { text: 'text', value: 'text' },
        placeholder: 'Select values',
        change: () => {
          args.fltrObj.filterByColumn(args.column.field, 'equal', multiSelectInstance.value);
        }
      });
      multiSelectInstance.appendTo(input);
    },
    read: (args: any) => {
      if (multiSelectInstance) {
        args.fltrObj.filterByColumn(args.column.field, args.operator, multiSelectInstance.value);
      }
    }
  }
};

const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'Menu' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120, filter: multiSelectFilter }
  ]
});

grid.appendTo('#grid');
```

### Custom Inputs via filter.params

Modify default component behavior:

```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'Menu' },
  columns: [
    { 
      field: 'CustomerID', 
      headerText: 'Customer ID', 
      filter: { params: { autofill: false } }
    },
    { 
      field: 'Freight', 
      headerText: 'Freight',
      filter: { params: { showSpinButton: false } }
    },
    { 
      field: 'OrderDate', 
      headerText: 'Order Date',
      filter: { params: { weekNumber: true } }
    }
  ]
});

grid.appendTo('#grid');
```

---

## 3. Excel/CheckBox Filter

### When to Use?
- Select from predefined values (categorical, ENUM types)
- Large datasets with Status, Category, Priority columns
- Multi-select common (filter "Shipped" OR "Pending")
- Dataset > 10k unique values per column (use infinite scrolling)

### Excel Filter Setup
```ts
import { Grid, Filter } from '@syncfusion/ej2-grids';

Grid.Inject(Filter);

const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'Excel' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'Status', headerText: 'Status', width: 100 }
  ]
});

grid.appendTo('#grid');
```

### CheckBox Filter Setup
```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'CheckBox' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'Status', headerText: 'Status', width: 100 }
  ]
});

grid.appendTo('#grid');
```

### Custom Remote Datasource Binding

Use different data for filter options vs grid display:

```ts
import { Grid, Filter } from '@syncfusion/ej2-grids';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Filter);

const grid = new Grid({
  dataSource: [
    { ProductID: 1, ProductName: 'Product A', CategoryID: 1 },
    { ProductID: 2, ProductName: 'Product B', CategoryID: 2 }
  ],
  allowFiltering: true,
  filterSettings: { type: 'Excel' },
  actionBegin: (args: any) => {
    if (args.requestType === 'filterBeforeOpen') {
      // Override filter datasource with remote API
      args.filterModel.options.dataSource = new DataManager({
        url: 'url',
        adaptor: new WebApiAdaptor()
      });
    }
  },
  columns: [
    { field: 'ProductID', headerText: 'Product ID', width: 100 },
    { field: 'ProductName', headerText: 'Product Name', width: 120 },
    { field: 'CategoryID', headerText: 'Category', width: 100 }
  ]
});

grid.appendTo('#grid');
```

### ENUM Column Filtering

Filter columns with fixed enum values (Status, Priority) with custom rendering:

```ts
const statusColors: any = {
  'Pending': '#FFC107', 
  'Shipped': '#2196F3',
  'Delivered': '#4CAF50', 
  'Cancelled': '#F44336'
};

const enumTemplate = (props: any) => {
  return `<span style="display: inline-block; background-color: ${statusColors[props.Status] || '#999'}; 
          height: 20px; width: 20px; margin-right: 8px; border-radius: 2px;"></span>${props.Status}`;
};

const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'Excel' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'Status', headerText: 'Status', width: 100 }
  ]
});

grid.appendTo('#grid');
```

### Infinite Scrolling for Large Data

Load checkbox values on-demand as user scrolls:

```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: {
    type: 'Excel',
    enableInfiniteScrolling: true,
    itemsCount: 50  // Load 50 values at a time
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'Status', headerText: 'Status', width: 100 }
  ]
});

grid.appendTo('#grid');
```

### Customize Checkbox Count (Default: 1000)

```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'Excel' },
  actionBegin: (args: any) => {
    if (args.requestType === 'filterchoicerequest' || args.requestType === 'filtersearchbegin') {
      args.filterChoiceCount = 3000;  // Show 3000 instead of default 1000
    }
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'Status', headerText: 'Status', width: 100 }
  ]
});

grid.appendTo('#grid');
```

### Custom Item Templates for Checkboxes

Display formatted text/icons in checkbox list:

```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'Excel' },
  columns: [
    { 
      field: 'Status', 
      headerText: 'Status', 
      width: 100,
      filterTemplate: '<div>${Delivered ? "✓ Delivered" : "✗ Not Delivered"}</div>'
    },
    { 
      field: 'Category', 
      headerText: 'Category', 
      width: 100,
      filterTemplate: '<div><span>${Category === "Beverages" ? "🍹" : "📦"}</span> ${Category}</div>'
    }
  ]
});

grid.appendTo('#grid');
```

### Hide Search or Sort

```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: { type: 'Excel' },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { 
      field: 'Status', 
      headerText: 'Status', 
      width: 100,
      filter: { hideSearchbox: true }  // Hide search box
    }
  ]
});

grid.appendTo('#grid');

// Hide sort options (CSS)
// .e-excel-ascending, .e-excel-descending { display: none; }
```

---

## Initial Filters (All Types)

Set default filters programmatically:

```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: {
    type: 'Menu',
    columns: [
      { field: 'CustomerID', operator: 'startswith', value: 'A' },
      { field: 'Freight', operator: 'greaterthan', value: 50 }
    ]
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100 }
  ]
});

grid.appendTo('#grid');
```

---

## Programmatic Filter Methods

```ts
import { Grid, Filter } from '@syncfusion/ej2-grids';

Grid.Inject(Filter);

const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120 }
  ]
});

grid.appendTo('#grid');

// Apply filter programmatically
grid.filterByColumn('CustomerID', 'startswith', 'A');

// Clear single column
grid.removeFilteredColsByField('CustomerID');

// Clear all
grid.clearFiltering();

// Get current filters
const current = grid.filterSettings.columns;
console.log(current);
```

---

## Comparison: FilterBar vs Menu vs Excel

| Feature | FilterBar | Menu | Excel |
|---------|-----------|------|-------|
| UI | Inline cells | Dialog | Checkbox list |
| Operators | Limited (=,!=,>,<,*,%) | Full set | All unique values |
| Custom templates | Yes (create/read/write) | Yes (filter.ui) | Yes (filterTemplate) |
| Large data | Slow | Good | Excellent (+ scrolling) |
| Learning curve | Low | Medium | Low |
| Mobile friendly | Yes | Moderate | Good |
