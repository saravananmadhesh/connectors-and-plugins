# Immutable Mode — Syncfusion ASP.NET Core TreeGrid

## Table of Contents

- [Enabling Immutable Mode](#enabling-immutable-mode)
- [How It Works](#how-it-works)
- [Primary Key Requirement](#primary-key-requirement)
- [Performance Benefits](#performance-benefits)
- [Limitations](#limitations)

---

## When to Use This Skill

Use this reference when you need to:
- Optimize TreeGrid re-rendering performance with large datasets
- Render large TreeGrid datasets with frequent updates
- Perform bulk CRUD operations efficiently
- Improve UI responsiveness during data mutations
- Handle real-time data with partial updates
- Reduce DOM re-renders for unchanged rows
- Maintain performance during batch editing operations

---

## Overview

Immutable mode optimizes TreeGrid re-rendering performance by using object reference comparisons and deep equality checks. When TreeGrid actions occur, only modified or newly added rows are re-rendered, while unchanged rows are skipped.

---

## Enabling Immutable Mode

Enable immutable mode by setting the `enableImmutableMode` property to **true**:

```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              childMapping="Children"
              enableImmutableMode="true"
              allowSorting="true"
              allowFiltering="true"
              allowPaging="true">
    <e-treegrid-editSettings allowEditing="true" 
                             allowAdding="true" 
                             allowDeleting="true" 
                             mode="Batch">
    </e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" 
                          width="90" isPrimaryKey="true"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="100"></e-treegrid-column>
        <e-treegrid-column field="Progress" headerText="Progress" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## How It Works

Immutable mode follows these steps:

1. **Object Reference Comparison**: Compares object references of rows before and after updates
2. **Deep Equality Check**: Uses deep comparison for actual data changes
3. **Selective Re-render**: Only rows with changed data trigger DOM updates
4. **Unchanged Row Skip**: Rows without changes maintain their DOM state

**Performance Impact:**
- Large datasets (1000+ rows) see significant performance improvement
- Frequent updates benefit most from this optimization
- Reduced browser reflow/repaint cycles

---

## Primary Key Requirement

Immutable mode **requires** a primary key column to compare data correctly. Always define a column with `isPrimaryKey="true"`:

```cshtml
<!-- REQUIRED: Mark one column as primary key -->
<e-treegrid-column field="TaskId" headerText="Task ID" 
                  width="90" isPrimaryKey="true">
</e-treegrid-column>
```

**Why Primary Key is Critical:**
- Uniquely identifies each row for comparison
- Enables accurate before/after data matching
- Prevents duplicate updates or missed changes

---

## Performance Benefits

**Scenarios where immutable mode shines:**

| Scenario | Benefit |
|----------|---------|
| Batch editing 100+ rows | 50-70% faster UI update |
| Real-time data polling | Reduced CPU usage, smoother UX |
| Large dataset sorting | Minimal flicker on data change |
| Bulk delete operations | Only deleted rows re-rendered |
| Cell edit with large data | Fast cell value updates |

**Example: Batch Update Performance**
```javascript
// Without immutable mode: Entire grid re-renders (slow)
// With immutable mode: Only 5 updated rows re-render (fast)
var treeGridInstance = document.getElementById('TreeGrid').ej2_instances[0];
treeGridInstance.openEditModule.saveCell(rowData, 'TaskName', 'New Value');
```

---

## Limitations

The following features are **NOT supported** with immutable mode enabled:

- ❌ Frozen rows and columns (`frozenRows`, `frozenColumns`)
- ❌ Row templates (`rowTemplate`)
- ❌ Detail templates (`detailTemplate`)
- ❌ Column reorder (`allowReordering`)
- ❌ Virtualization (`enableVirtualization`)

**Workaround:** If you need these features, disable immutable mode:
```cshtml
<ejs-treegrid enableImmutableMode="false">
    <!-- Use frozen rows, templates, etc. without immutable mode -->
</ejs-treegrid>
```

---

## Best Practices

1. **Always set a primary key** — Without it, immutable mode won't function correctly
2. **Use with batch editing** — Most effective with `mode="Batch"`
3. **Test large datasets** — Verify performance gains match your use case
4. **Monitor browser DevTools** — Use Performance tab to confirm reduced re-renders
5. **Avoid with row templates** — Not compatible; choose one or the other

---

## Related Topics

- **Data Binding** — Understand parent-child data structures for immutable updates
- **Editing** — Batch editing works optimally with immutable mode
- **Virtualization** — Cannot combine; choose immutable mode or virtualization
