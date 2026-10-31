# TreeGrid Searching

## When to Use This Reference

Read this reference when you need to:
- Enable text-based record search with toolbar search box (global search)
- Configure which columns are searchable (search-specific fields only)
- Apply different search operators (contains, startsWith, endsWith, exact match)
- Programmatically search via methods (search, setSearchValues)
- Set initial/default search at load time (searchSettings at initialization)
- Implement real-time search with custom operators (ignoreCase, custom logic)
- Search records by external button or custom UI
- Combine search with other features (filter, sort, paging)

---

## Table of Contents

- [Searching Basics](#searching-basics)
- [Initial Search](#initial-search)
- [Search Operators](#search-operators)
- [Search Configuration](#search-configuration)
- [Search by External Button](#search-by-external-button)
- [Search Specific Columns](#search-specific-columns)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Searching Basics

Enable search via toolbar and inject the `Filter` module. Users can type in search box to filter records in real-time.

```typescript
import { TreeGrid, Filter, Toolbar } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter, Toolbar);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    toolbar: ['Search'],  // Add search box to toolbar
    allowFiltering: true,
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
        { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**How It Works:**
- Type text in toolbar search box → Records filter in real-time (contains search)
- Search is case-insensitive by default
- Searches ALL visible columns by default
- Use searchSettings to customize behavior

---

## Initial Search

Apply search at initial render via `searchSettings` property. Specify search text, fields, operator, and matching behavior.

```typescript
import { TreeGrid, Filter, Toolbar } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter, Toolbar);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    toolbar: ['Search'],
    allowFiltering: true,
    searchSettings: {
        fields: ['taskName'],        // Search specific columns
        operator: 'contains',         // Search operator
        key: 'plan',                  // Initial search value
        ignoreCase: true              // Case-insensitive search
    },
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
        { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Search Settings:**
- `fields` - Array of column field names to search (empty = all columns)
- `operator` - How to match: 'contains', 'startswith', 'endswith', 'equal', 'notequal'
- `key` - Initial search text displayed in search box
- `ignoreCase` - true/false for case-sensitivity

---

## Search Operators

Available search operators determine how matches are found.

| Operator | Description | Example |
|----------|-------------|---------|
| `startswith` | Text begins with search value | Search "plan" → Matches "Planning" |
| `endswith` | Text ends with search value | Search "ing" → Matches "Planning", "Editing" |
| `contains` | Text contains search value anywhere | Search "nan" → Matches "Planning" |
| `equal` | Exact match for entire text | Search "Planning" → Matches "Planning" only |
| `notequal` | Text that does NOT equal search value | Search "Planning" → Matches everything except "Planning" |

**Default operator:** `contains`

### Use Different Operator

```typescript
import { TreeGrid, Filter, Toolbar } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter, Toolbar);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    toolbar: ['Search'],
    allowFiltering: true,
    searchSettings: {
        fields: ['taskName'],
        operator: 'startswith',  // Only match text starting with search value
        ignoreCase: true
    },
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
        { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

---

## Search Configuration

### Configure searchable columns and behavior

```typescript
import { TreeGrid, Filter, Toolbar } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter, Toolbar);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    toolbar: ['Search'],
    allowFiltering: true,
    searchSettings: {
        fields: ['taskName', 'duration'],  // Search only these columns
        operator: 'contains',
        key: '',
        ignoreCase: true
    },
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
        { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Configuration Details:**
- **fields (empty array or omitted)** = Search all visible columns
- **fields: ['taskName', 'progress']** = Search only these specific columns
- **ignoreCase: true** = "PLANNING" matches "planning" (default)
- **ignoreCase: false** = Case-sensitive search (exact case required)

---

## Search by External Button

Search from a button or input outside the TreeGrid.

```typescript
import { TreeGrid, Filter } from '@syncfusion/ej2-treegrid';
import { Button } from '@syncfusion/ej2-buttons';

TreeGrid.Inject(Filter);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowFiltering: true,
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
        { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');

// Create search button
let searchBtn = new Button();
searchBtn.appendTo('#search');

// Get search text from input and trigger search
document.getElementById('search').addEventListener('click', () => {
    let searchText = (document.getElementsByClassName('searchtext')[0] as HTMLInputElement).value;
    treeGridObj.search(searchText);
});
```

**HTML:**
```html
<input type="text" class="searchtext" placeholder="Enter search text"/>
<button id="search">Search</button>
<div id="TreeGrid"></div>
```

---

## Search Specific Columns

Configure search to look in only certain columns, not all columns.

```typescript
import { TreeGrid, Filter, Toolbar } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter, Toolbar);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    toolbar: ['Search'],
    allowFiltering: true,
    searchSettings: {
        fields: ['taskName', 'duration']  // Search ONLY taskName and duration columns
    },
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
        { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Result:** 
- Search text searched ONLY in taskName and duration columns
- taskID and progress columns are ignored during search
- Narrows search scope for better performance and UX

---

## Common Patterns

### Search + Sort Combination

Search to narrow data, then sort results:

```typescript
import { TreeGrid, Filter, Toolbar, Sort } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter, Toolbar, Sort);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    toolbar: ['Search'],
    allowFiltering: true,
    allowSorting: true,
    searchSettings: {
        fields: ['taskName'],
        operator: 'contains'
    },
    sortSettings: {
        columns: [{ field: 'taskName', direction: 'Ascending' }]
    },
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
        { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Search + Filter Combination

Search narrows to matching records, then apply additional filters:

```typescript
import { TreeGrid, Filter, Toolbar } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter, Toolbar);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    toolbar: ['Search'],
    allowFiltering: true,
    searchSettings: {
        fields: ['taskName'],
        operator: 'contains'
    },
    filterSettings: {
        columns: [{ field: 'progress', operator: 'equal', value: 80 }]
    },
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
        { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

---

## Troubleshooting

**Q: Search not returning any results?**  
A: Verify `allowFiltering: true` is set and `Filter` module is injected. Check that searchable fields (columns with that field name) exist in your data.

**Q: Search is case-sensitive but I want case-insensitive?**  
A: Set `searchSettings.ignoreCase: true` (it's default, but verify it's not set to false).

**Q: Toolbar search box not appearing?**  
A: Ensure `toolbar: ['Search']` is added to TreeGrid config and `Toolbar` module is injected via `TreeGrid.Inject(Filter, Toolbar)`.

**Q: Search is searching ALL columns but I want specific columns only?**  
A: Set `searchSettings.fields: ['fieldName1', 'fieldName2']` with array of column field names you want searched.

**Q: Search performance is slow with many records?**  
A: Use `searchSettings.fields` to limit search to fewer columns. The more columns searched, the slower the operation.
