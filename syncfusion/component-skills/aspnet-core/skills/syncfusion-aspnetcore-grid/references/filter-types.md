# Filter Types: FilterBar, Menu, and Excel in ASP.NET Core Grid

## Table of Contents
- [1. FilterBar Filter](#1-filterbar-filter)
- [2. Menu Filter](#2-menu-filter)
- [3. Excel Filter](#3-excel-filter)
- [Comparison Table](#comparison-table)

---

## Filter Type Comparison

| Type | UI | Best For | Key Feature |
|------|-----|----------|------------|
| **FilterBar** | Inline text inputs in header | Quick text search, simple queries, small datasets | Fast, minimal UI |
| **Menu** | Dropdown with operators | Complex conditions, typed data, power users | Operators, multi-condition |
| **Excel** | Checkbox list | Large categorical data, ENUM values | Multi-select, visual |

---

## 1. FilterBar Filter

Inline filter input box in each column header. Filters as you type (Immediate mode) or on Enter (OnEnter mode).

### When to Use?
- Users need quick text-based search with instant feedback
- Dataset < 10k rows (no performance issues with Immediate mode)
- Simple string matching or basic operators
- Mobile-friendly, minimal UI footprint

### Setup

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-filterSettings type="FilterBar" mode="Immediate"></e-grid-filterSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="120"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### FilterBar Operators

| Expression | Meaning | Example |
|-----------|---------|---------|
| `=value` | Equals | `=VINET` |
| `!=value` | Not equals | `!=USA` |
| `>value` | Greater than | `>100` |
| `<value` | Less than | `<100` |
| `*value` | Starts with | `*VIN` |
| `%value` | Ends with | `%ET` |

### Immediate vs OnEnter Mode

```cshtml
<!-- Immediate mode: Filter as you type (default) -->
<e-grid-filterSettings type="FilterBar" mode="Immediate"></e-grid-filterSettings>

<!-- OnEnter mode: Filter on Enter key only (better for performance) -->
<e-grid-filterSettings type="FilterBar" mode="OnEnter"></e-grid-filterSettings>
```

### Custom FilterBar Template

Replace default text input with custom components:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="OrderDate" headerText="Order Date" type="date" 
                       filterTemplate="dateFilterTemplate" width="130"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
var dateFilterTemplate = {
    create: function(args) {
        var input = document.createElement('input');
        args.target.appendChild(input);
        new ej.calendars.DatePicker({
            placeholder: 'Select Date'
        }).appendTo(input);
    },
    
    write: function(args) {
        var datePicker = args.target.querySelector('.e-datepicker').ej2_instances[0];
        datePicker.value = args.filteredValue;
    },
    
    read: function(args) {
        var datePicker = args.target.querySelector('.e-datepicker').ej2_instances[0];
        var grid = document.getElementById('Grid').ej2_instances[0];
        grid.filterByColumn(args.column.field, 'equal', datePicker.value);
    }
};
</script>
```

---

## 2. Menu Filter

Dropdown dialog with specific operators for typed data (dates, numbers, strings).

### When to Use?
- Need specific operators for typed data (dates: before/after; numbers: >, <, between)
- Power users want complex boolean filtering
- Different data types need different comparison logic
- User needs to see/select from predefined operators

### Setup

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-filterSettings type="Menu"></e-grid-filterSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" type="number" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" type="string" width="120"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" type="number" width="100"></e-grid-column>
        <e-grid-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Menu Operators by Data Type

**String columns:**
- startswith, endswith, contains, equal, notequal
- doesnotstartwith, doesnotendwith, doesnotcontain

**Number columns:**
- equal, notequal, lessthan, lessthanorequal
- greaterthan, greaterthanorequal, between, notbetween

**Date columns:**
- equal, notequal, lessthan, lessthanorequal
- greaterthan, greaterthanorequal, between, notbetween

### Custom Filter Components via filterTemplate

Replace filter dialog inputs with custom UI:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-filterSettings type="Menu"></e-grid-filterSettings>
    <e-grid-columns>
        <e-grid-column field="Status" headerText="Status" 
                       filterTemplate="statusFilterTemplate" width="120"></e-grid-column>
        <e-grid-column field="Region" headerText="Region" 
                       filterTemplate="regionFilterTemplate" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
// Dropdown list template for Status
var statusFilterTemplate = {
    create: function(args) {
        var dropdowns = document.createElement('input');
        args.target.appendChild(dropdowns);
        new ej.dropdowns.DropDownList({
            dataSource: ['Pending', 'Processing', 'Completed', 'Cancelled'],
            placeholder: 'Select Status'
        }).appendTo(dropdowns);
    },
    
    read: function(args) {
        var ddl = args.target.querySelector('.e-ddl').ej2_instances[0];
        var grid = document.getElementById('Grid').ej2_instances[0];
        grid.filterByColumn(args.column.field, args.operator, ddl.value);
    },
    
    write: function(args) {
        var ddl = args.target.querySelector('.e-ddl').ej2_instances[0];
        ddl.value = args.filteredValue;
    }
};

// MultiSelect template for Region
var regionFilterTemplate = {
    create: function(args) {
        var multiselect = document.createElement('input');
        args.target.appendChild(multiselect);
        new ej.dropdowns.MultiSelect({
            dataSource: ['North', 'South', 'East', 'West'],
            placeholder: 'Select Regions'
        }).appendTo(multiselect);
    },
    
    read: function(args) {
        var ms = args.target.querySelector('.e-multiselect').ej2_instances[0];
        var grid = document.getElementById('Grid').ej2_instances[0];
        grid.filterByColumn(args.column.field, args.operator, ms.value);
    }
};
</script>
```

---

## 3. Excel Filter

Checkbox list for multi-select filtering, similar to Excel's filter dropdown.

### When to Use?
- Large categorical data (Status, Region, Country)
- Users need to select multiple values at once
- Visual indication of available values
- ENUM or dropdown-type columns
- Data with limited unique values (< 100 options)

### Setup

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-filterSettings type="Excel"></e-grid-filterSettings>
    <e-grid-columns>
        <e-grid-column field="Status" headerText="Status" width="100"></e-grid-column>
        <e-grid-column field="Region" headerText="Region" width="100"></e-grid-column>
        <e-grid-column field="Country" headerText="Country" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Excel Filter with Remote Data

For large datasets, load filter values from server:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-filterSettings type="Excel"></e-grid-filterSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="Region" headerText="Region" 
                       filterTemplate="excelRegionTemplate" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
var excelRegionTemplate = {
    create: function(args) {
        var multiselect = document.createElement('input');
        args.target.appendChild(multiselect);
        
        // Load from server
        fetch('/api/regions')
            .then(response => response.json())
            .then(data => {
                new ej.dropdowns.MultiSelect({
                    dataSource: data,
                    fields: { text: 'RegionName', value: 'RegionID' },
                    placeholder: 'Select Regions'
                }).appendTo(multiselect);
            });
    },
    
    read: function(args) {
        var ms = args.target.querySelector('.e-multiselect').ej2_instances[0];
        var grid = document.getElementById('Grid').ej2_instances[0];
        grid.filterByColumn(args.column.field, 'in', ms.value);
    }
};
</script>
```

---

## Comparison Table

| Feature | FilterBar | Menu | Excel |
|---------|-----------|------|-------|
| **Operator selection** | Symbols in text | Dropdown list | `in` / `notin` |
| **Multiple values** | No | No | Yes (multi-select) |
| **Best for** | Text search | Complex conditions | Categorical data |
| **Performance** | Fast | Medium | Good |
| **Mobile friendly** | Yes | Partial | No |
| **Custom UI support** | Yes | Yes | Yes |
| **Default operator** | Contains | Type-specific | In list |

---

## Best Practices

1. **Choose based on data type**: FilterBar for text, Menu for typed queries, Excel for categorical
2. **Plan for dataset size**: FilterBar for small/medium, Menu for complex, Excel for categorical
3. **Optimize performance**: Use OnEnter mode for large datasets; consider server-side filtering
4. **Provide clear UX**: Label filters descriptively, use appropriate input types
5. **Combine types**: Use different filter types for different columns if needed
6. **Custom templates**: Leverage custom templates for specialized filtering UI
7. **Test on mobile**: Ensure filter UI is usable on small screens
