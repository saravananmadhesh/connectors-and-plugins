# Clipboard — Syncfusion ASP.NET Core TreeGrid

## Table of Contents

- [Copy to Clipboard](#copy-to-clipboard)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Copy with External Buttons](#copy-with-external-buttons)
- [Copy Hierarchy Modes](#copy-hierarchy-modes)
- [AutoFill Feature](#autofill-feature)
- [Paste Functionality](#paste-functionality)
- [Limitations](#limitations)

---

## When to Use This Skill

Use this reference when you need to:
- Users need to copy TreeGrid data for external use
- Copy selected rows/cells to spreadsheets
- Implement autofill for repeated data
- Enable paste functionality in batch editing
- Copy with or without header information
- Control which rows are copied (parent, child, both, or none)
- Enable drag-to-fill for cell values

---

## Overview

Clipboard functionality enables users to copy selected rows or cells from TreeGrid into clipboard, optionally with headers. Supports hierarchical copy modes, autofill, and paste operations.

---

## Copy to Clipboard

Enable clipboard by allowing selection first. TreeGrid automatically supports copy operations:

```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              childMapping="Children">
    <e-treegrid-selectionsettings type="Multiple" mode="Cell"></e-treegrid-selectionsettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Keyboard Shortcuts

Use these shortcuts to copy data:

| Shortcut | Action |
|----------|--------|
| **Ctrl + C** | Copy selected rows or cells to clipboard |
| **Ctrl + Shift + H** | Copy selected rows or cells **with headers** |

**Example workflow:**
1. Select cells/rows in TreeGrid
2. Press **Ctrl + C** to copy
3. Paste in Excel, Word, or text editor

---

## Copy with External Buttons

Trigger copy programmatically using external buttons with the `copy()` method:

```cshtml
<!-- Copy Button -->
<button onclick="copyToClipboard()">Copy Selected</button>
<button onclick="copyWithHeader()">Copy with Header</button>

<!-- TreeGrid -->
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              childMapping="Children">
    <e-treegrid-selectionsettings type="Multiple" mode="Cell"></e-treegrid-selectionsettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function copyToClipboard() {
        const treeGridInstance = document.getElementById('TreeGrid').ej2_instances[0];
        treeGridInstance.copy();  // Copy without header
    }

    function copyWithHeader() {
        const treeGridInstance = document.getElementById('TreeGrid').ej2_instances[0];
        treeGridInstance.copy('WithHeader');  // Copy with header row
    }
</script>
```

---

## Copy Hierarchy Modes

Control how parent/child rows are copied using `copyHierarchyMode` property:

```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              childMapping="Children"
              copyHierarchyMode="Parent">
    <e-treegrid-selectionsettings type="Multiple" mode="Row"></e-treegrid-selectionsettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

### Hierarchy Modes:

| Mode | Behavior | Example |
|------|----------|---------|
| **Parent** | Copy selected rows + parent rows | Selected: Child rows → Includes parents |
| **Child** | Copy selected rows + child rows | Selected: Parent row → Includes all children |
| **Both** | Copy selected rows + parents + children | Selected: Middle row → Full hierarchy |
| **None** | Copy **only** selected rows | Selected: Any row → Only that row |

**Example: Parent Mode**
```
Hierarchy:
  ├─ Task 1 (parent)
  │  ├─ Subtask 1.1 (child) ← SELECTED
  │  └─ Subtask 1.2
  └─ Task 2

Result copied to clipboard:
  Task 1
  Subtask 1.1
```

---

## AutoFill Feature

AutoFill allows copying cell values and dragging to auto-fill adjacent cells. Enable with `enableAutoFill="true"`:

```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              childMapping="Children"
              enableAutoFill="true">
    <e-treegrid-editSettings allowEditing="true" 
                             mode="Batch">
    </e-treegrid-editSettings>
    <e-treegrid-selectionsettings type="Multiple" 
                                  mode="Cell" 
                                  cellSelectionMode="Box">
    </e-treegrid-selectionsettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Progress" headerText="Progress" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

### Requirements for AutoFill:

- [ ] `enableAutoFill="true"`
- [ ] `selectionMode="Cell"` with `cellSelectionMode="Box"`
- [ ] Batch editing enabled
- [ ] Primary key defined

### How to Use AutoFill:

1. Select cells to copy
2. Drag the **autofill icon** (small square at bottom-right of selection)
3. Drag up/down to auto-fill adjacent cells

---

## Paste Functionality

Paste previously copied cell data using **Ctrl + V**. Requires batch editing enabled:

```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              childMapping="Children">
    <e-treegrid-editSettings allowEditing="true" 
                             mode="Batch">
    </e-treegrid-editSettings>
    <e-treegrid-selectionsettings type="Multiple" 
                                  mode="Cell" 
                                  cellSelectionMode="Box">
    </e-treegrid-selectionsettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

### Paste Workflow:

1. Copy cells (**Ctrl + C**)
2. Select target cells
3. Paste (**Ctrl + V**)
4. Save batch changes

### Type Conversion Limitations:

| Source Type | Target Type | Result |
|------------|------------|--------|
| String | Number | Displays **NaN** |
| String | Date | Displays **empty cell** |
| Number | String | Converts correctly |
| Date | String | Converts correctly |

---

## Limitations

- ❌ **AutoFill:** Linear series and sequential data generation **not supported**
- ❌ **Paste:** String → Number converts to **NaN**
- ❌ **Paste:** String → Date displays as **empty cell**
- ❌ **Paste:** Requires batch editing, cell selection mode, and box selection
- ❌ **Copy:** Does not work with read-only cells or protected columns

---

## Best Practices

1. **Always enable batch editing** — Required for paste functionality
2. **Test type conversions** — Avoid pasting incompatible data types
3. **Validate copied data** — Ensure proper values before pasting
4. **Provide user feedback** — Toast or messages on copy/paste success
5. **Use copy with header** — Include column names for clarity
6. **Define cellSelectionMode** — Use `"Box"` for contiguous cell selection

---

## Common Use Cases

### Copy Selected Tasks to Excel
```javascript
// User selects rows and presses Ctrl+C
// Pastes into Excel spreadsheet
// Works seamlessly with hierarchy modes
```

### AutoFill Progress Values
```javascript
// User selects Progress cell with value "50%"
// Drags autofill icon down to fill multiple rows
// All rows get "50%" (no sequential generation)
```

### Batch Update via Paste
```javascript
// Copy data from external source (Excel, JSON)
// Paste into TreeGrid cells
// Click Save to commit all changes at once
```

---

## Related Topics

- **Selection** — Row, cell, and checkbox selection modes
- **Editing** — Batch editing for multi-cell paste operations
- **Export** — Export to Excel/PDF for external data handling
