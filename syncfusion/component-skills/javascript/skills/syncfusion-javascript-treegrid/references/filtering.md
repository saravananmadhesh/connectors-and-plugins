# TreeGrid Filtering

## When to Use This Reference

Read this reference when you need to:
- Enable users to filter records by specific column values or criteria
- Implement multiple filter types (Filter Bar for quick entry, Menu for operators, Excel-style for checkboxes)
- Support hierarchical filtering with parent/child record relationships (display parents, children, both, or filtered records only)
- Add custom filter components (dropdowns, date pickers) or change default filter operators
- Handle special cases like diacritics and accent characters, case-sensitive matching, or initial filters at load time
- Combine filtering with other features (sorting, searching, paging)

---

## Table of Contents

- [Filtering Basics](#filtering-basics)
- [Filter Hierarchy Modes](#filter-hierarchy-modes)
- [Initial Filters](#initial-filters)
- [Filter Operators](#filter-operators)
- [Filter Bar](#filter-bar)
- [Filter Menu](#filter-menu)
- [Excel-Like Filter](#excel-like-filter)
- [Diacritics & Special Characters](#diacritics--special-characters)
- [Common Patterns](#common-patterns)

---

## Filtering Basics

Filtering allows viewing specific records based on filter criteria. Enable filtering with `allowFiltering: true` and configure via `filterSettings`.

**Important:** Inject the `Filter` module to enable filtering.

```typescript
import { TreeGrid, Filter } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    filterSettings: {
        type: 'FilterBar',
        mode: 'Immediate',
        hierarchyMode: 'Parent'
    },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', width: 90, type: 'date', format: 'yMd' },
        { field: 'duration', headerText: 'Duration', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Key Points:**
- `allowFiltering: true` - Enable filter bar row next to header
- `filterSettings.type` - 'FilterBar' (default), 'Menu', or 'Excel'
- `filterSettings.mode` - 'Immediate' (real-time) or 'OnEnter' (on Enter key)
- Disable filtering for specific column: `column.allowFiltering = false`

---

## Filter Hierarchy Modes

Filter hierarchy mode determines how filtered records display relative to parent/child records.

### Mode: Parent (Default)

Display filtered records with parent records. If no parent exists, show only filtered records.

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    filterSettings: {
        type: 'FilterBar',
        hierarchyMode: 'Parent'  // Default - show parents of filtered records
    },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Result:** Filter "Plan" → Shows "Planning" + its parent (if any)

### Mode: Child

Display filtered records with child records. If no children exist, show only filtered records.

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    filterSettings: {
        type: 'FilterBar',
        hierarchyMode: 'Child'  // Show children of filtered records
    },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Result:** Filter "Planning" → Shows "Planning" + all its child tasks

### Mode: Both

Display filtered records with both parent and child records.

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    filterSettings: {
        type: 'FilterBar',
        hierarchyMode: 'Both'  // Show both parents and children
    },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Result:** Filter "Design" → Shows "Design", its parents, AND all its children

### Mode: None

Display only filtered records (no parent/child hierarchy).

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    filterSettings: {
        type: 'FilterBar',
        hierarchyMode: 'None'  // Show only filtered records
    },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Result:** Filter "Design" → Shows ONLY "Design" record

### Mode Switcher Example

```typescript
import { TreeGrid, Filter } from '@syncfusion/ej2-treegrid';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

TreeGrid.Inject(Filter);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    filterSettings: { type: 'FilterBar', hierarchyMode: 'Parent' },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', width: 90, type: 'date', format: 'yMd' },
        { field: 'duration', headerText: 'Duration', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');

let dropDownMode = new DropDownList({
    dataSource: [
        { id: 'Parent', mode: 'Parent' },
        { id: 'Child', mode: 'Child' },
        { id: 'Both', mode: 'Both' },
        { id: 'None', mode: 'None' }
    ],
    fields: { text: 'mode', value: 'id' },
    value: 'Parent',
    change: (e: ChangeEventArgs) => {
        let mode: any = e.value;
        treeGridObj.filterSettings.hierarchyMode = mode;
        treeGridObj.clearFiltering();
    }
});

dropDownMode.appendTo('#mode');
```

---

## Initial Filters

Apply filters at initial render via `filterSettings.columns` property.

```typescript
import { TreeGrid, Filter } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    filterSettings: {
        // Apply initial filters
        columns: [
            { 
                field: 'taskName',        // Column to filter
                matchCase: false,         // Case-insensitive
                operator: 'startswith',   // Filter operator
                predicate: 'and',         // Logic with next filter (and/or)
                value: 'plan'             // Filter value
            },
            {
                field: 'duration',
                matchCase: false,
                operator: 'equal',
                predicate: 'and',
                value: 5
            }
        ]
    },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', width: 90, type: 'date', format: 'yMd' },
        { field: 'duration', headerText: 'Duration', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Initial Filter Logic:** Shows records where taskName starts with "plan" AND duration equals 5

---

## Filter Operators

Available filter operators by data type.

| Operator | Description | Supported Types |
|----------|-------------|-----------------|
| `startswith` | Checks whether value begins with specified value | String |
| `endswith` | Checks whether value ends with specified value | String |
| `contains` | Checks whether value contains specified value | String |
| `equal` | Checks whether value equals specified value | String, Number, Boolean, Date |
| `notequal` | Checks whether value is not equal to specified value | String, Number, Boolean, Date |
| `greaterthan` | Checks whether value is greater than specified value | Number, Date |
| `greaterthanorequal` | Checks whether value is ≥ specified value | Number, Date |
| `lessthan` | Checks whether value is less than specified value | Number, Date |
| `lessthanorequal` | Checks whether value is ≤ specified value | Number, Date |

**Default operator:** `equal`

---

## Filter Bar

Filter bar displays input fields in header row. Users type/select values to filter.

### Basic Filter Bar

```typescript
import { TreeGrid, Filter } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    filterSettings: {
        type: 'FilterBar',
        mode: 'Immediate'  // Filter as you type
    },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', width: 90, type: 'date', format: 'yMd' },
        { field: 'duration', headerText: 'Duration', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Filter Bar Expressions

Users can enter expressions manually in filter bar:

| Expression | Example | Operator | Supported Type |
|------------|---------|----------|-----------------|
| `=` | `=value` | equal | Number |
| `!=` | `!=value` | notequal | Number |
| `>` | `>value` | greaterthan | Number |
| `<` | `<value` | lessthan | Number |
| `>=` | `>=value` | greaterthanorequal | Number |
| `<=` | `<=value` | lessthanorequal | Number |
| `*` | `*value` | startswith | String |
| `%` | `%value` | endswith | String |
| (date input) | 02/03/2024 | equal | Date |
| (checkbox) | (checked/unchecked) | equal | Boolean |

**Example:** Type `*design` in name filter = "starts with design"

### Custom Filter Bar Template

Add custom components (dropdowns, date pickers) in filter bar:

```typescript
import { TreeGrid, Filter, Column } from '@syncfusion/ej2-treegrid';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

TreeGrid.Inject(Filter);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    filterSettings: { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate' },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', width: 90, type: 'date', format: 'yMd' },
        {
            field: 'duration',
            headerText: 'Duration',
            width: 80,
            filterBarTemplate: {
                // Create custom component
                create: (args: { element: Element, column: Column }) => {
                    let dd: HTMLInputElement = document.createElement('input');
                    dd.id = 'duration';
                    return dd;
                },
                // Wire events for custom component
                write: (args: { element: Element, column: Column }) => {
                    let dataSource: string[] = ['All', '1', '3', '4', '5', '6', '8', '9'];
                    this.dropDownFilter = new DropDownList({
                        dataSource: dataSource,
                        value: 'All',
                        change: (e: ChangeEventArgs) => {
                            let valuenum: any = +e.value;
                            let id: any = this.dropDownFilter.element.id;
                            let value: any = e.value;
                            if (value !== 'All') {
                                treeGridObj.filterByColumn(id, 'equal', valuenum);
                            } else {
                                treeGridObj.removeFilteredColsByField(id);
                            }
                        }
                    });
                    this.dropDownFilter.appendTo('#duration');
                }
            }
        }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Change Default Filter Bar Operator

Modify default operator on `dataBound` event:

```typescript
import { TreeGrid, Filter } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    dataBound: dataBound,
    allowFiltering: true,
    filterSettings: { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate' },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', width: 90, type: 'date', format: 'yMd' },
        { field: 'duration', headerText: 'Duration', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');

function dataBound(): void {
    // Change default string operator from 'startswith' to 'contains'
    Object.assign(treeGridObj.grid.filterModule.filterOperators, { startsWith: 'contains' });
}
```

---

## Filter Menu

Filter menu provides dropdown interface in column headers.

### Basic Filter Menu

```typescript
import { TreeGrid, Filter } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    filterSettings: { type: 'Menu' },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', width: 90, type: 'date', format: 'yMd' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Menu Features:**
- Filter by specific value
- Filter conditions (starts with, ends with, etc.)
- Sort ascending/descending
- Clear filter

### Custom Component in Filter Menu

Add dropdown or custom UI in filter menu:

```typescript
import { TreeGrid, Filter } from '@syncfusion/ej2-treegrid';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement } from '@syncfusion/ej2-base';

TreeGrid.Inject(Filter);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    filterSettings: { type: 'Menu' },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        {
            field: 'duration',
            headerText: 'Duration',
            width: 80,
            filter: {
                ui: {
                    // Create custom filter component
                    create: (args: { target: Element, column: Object }) => {
                        let flValInput: HTMLElement = createElement('input', { className: 'flm-input' });
                        args.target.appendChild(flValInput);
                        let dataSource: string[] = ['All', '1', '3', '4', '5', '6', '8', '9'];
                        this.dropDownFilter = new DropDownList({
                            dataSource: dataSource,
                            value: 'All',
                            popupHeight: '200px'
                        });
                        this.dropDownFilter.appendTo(flValInput);
                    },
                    // Wire events and show current value
                    write: (args: {
                        column: Object, target: Element, parent: any,
                        filteredValue: number | string
                    }) => {
                        this.dropDownFilter.value = args.filteredValue;
                    },
                    // Read filter value and apply filter
                    read: (args: { target: Element, column: any, operator: string, fltrObj: Filter }) => {
                        args.fltrObj.filterByColumn(
                            args.column.field,
                            args.operator,
                            parseInt(this.dropDownFilter.value)
                        );
                    }
                }
            }
        }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Use Different Filter Type Per Column

Mix 'Menu' and 'Excel' filters in same grid:

```typescript
import { TreeGrid, Filter } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    filterSettings: { type: 'Menu' },  // Default filter type
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        {
            field: 'taskName',
            headerText: 'Task Name',
            width: 180,
            filter: { type: 'Excel' }  // Override to Excel filter for this column
        },
        { field: 'duration', headerText: 'Duration', width: 90 },
        { field: 'progress', headerText: 'Progress', width: 90 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

---

## Excel-Like Filter

Excel-style filtering with checkboxes and sorting options.

### Basic Excel Filter

```typescript
import { TreeGrid, Filter } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    filterSettings: { type: 'Excel' },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'duration', headerText: 'Duration', width: 90 },
        { field: 'progress', headerText: 'Progress', width: 90 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Excel Filter Features:**
- Checkbox list of all unique values
- Search box to filter values
- Sort ascending/descending
- Advanced filter with operators (equals, contains, etc.)
- Clear filter option

### Change Default Excel Filter Operator

Modify operator on `actionBegin` event:

```typescript
import { TreeGrid, Filter, Column } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    actionBegin: actionBegin,
    allowFiltering: true,
    filterSettings: { type: 'Excel' },
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'startDate', headerText: 'Start Date', width: 90, type: 'date', format: 'yMd' },
        { field: 'duration', headerText: 'Duration', width: 80 }
    ]
});

treeGridObj.appendTo('#TreeGrid');

function actionBegin(e): void {
    // Change default string operator from 'startswith' to 'contains'
    if (e.requestType === 'filtersearchbegin' && e.column.type === 'string') {
        e.operator = 'contains';
    }
}
```

---

## Diacritics & Special Characters

By default, TreeGrid ignores diacritic characters (é, ñ, ü, etc.) during filtering. Enable diacritic filtering:

```typescript
import { TreeGrid, Filter } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter);

let treeGridObj = new TreeGrid({
    dataSource: diacriticsData,
    childMapping: 'Children',
    allowFiltering: true,
    filterSettings: {
        ignoreAccent: true  // Include diacritics in filter matching
    },
    columns: [
        { field: 'EmpID', headerText: 'Employee ID', width: 95 },
        { field: 'Name', headerText: 'Name', width: 110 },
        { field: 'DOB', headerText: 'DOB', width: 90, type: 'date', format: 'yMd' },
        { field: 'Country', width: 65 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Example:** 
- With `ignoreAccent: true`: Filter "aero" matches "Aéronautique"
- With `ignoreAccent: false` (default): Filter "aero" does NOT match "Aéronautique"

---

## Common Patterns

### Programmatic Filtering

```typescript
// Apply filter programmatically
treeGridObj.filterByColumn('taskName', 'startswith', 'plan');

// Apply filter with multiple conditions
treeGridObj.filterByColumn('duration', 'greaterthan', 5);

// Remove filter from specific column
treeGridObj.removeFilteredColsByField('taskName');

// Clear all filters
treeGridObj.clearFiltering();

// Get filtered records
let filteredRecords = treeGridObj.getCurrentViewRecords();
```

### Combining Multiple Filters

```typescript
// Filter records matching multiple criteria
treeGridObj.filterByColumn('duration', 'greaterthan', 3);
treeGridObj.filterByColumn('status', 'equal', 'In Progress');
```

### Disable Filter for Specific Column

```typescript
{
    field: 'internalNotes',
    headerText: 'Internal Notes',
    allowFiltering: false  // This column won't show filter
}
```

### Filter After Data Loads

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    dataBound: onDataBound,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 75 },
        { field: 'taskName', headerText: 'Task Name', width: 180 }
    ]
});

treeGridObj.appendTo('#TreeGrid');

function onDataBound(): void {
    // Apply filter after data loads
    treeGridObj.filterByColumn('status', 'equal', 'In Progress');
}
```