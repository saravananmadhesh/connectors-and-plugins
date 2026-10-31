# Events & Lifecycle — Syncfusion ASP.NET Core TreeGrid

## Table of Contents
- [Lifecycle Events](#lifecycle-events)
- [Action Events](#action-events)
- [Data Events](#data-events)
- [Expand/Collapse Events](#expandcollapse-events)
- [Edit Events](#edit-events)
- [Selection Events](#selection-events)
- [Drag & Drop Events](#drag--drop-events)
- [Column/UI Events](#columnui-events)
- [Export Events](#export-events)
- [Custom Rendering Events](#custom-rendering-events)

> **When to Use:** Hook into TreeGrid lifecycle, respond to user actions, customize rendering, handle errors, or trigger side effects.

---

## Lifecycle Events

| Event | Triggers | Args Available | Use Case |
|-------|----------|-----------------|----------|
| `created` | After component renders | None | Initialize custom logic, load external data |
| `load` | Before initial render | None | Customize TreeGrid during creation |
| `dataBound` | After data populates | `dataSource`, `data` | Finalize UI after data load |
| `beforeDataBound` | Before data populates | `data` | Filter/transform data before binding |
| `dataSourceChanged` | Data added/deleted/updated | `data`, `action` | React to data mutations |
| `dataStateChange` | Paging/sorting/filtering complete | `requestType`, `action` | Handle state transitions |

**Example:**
```cshtml
<ejs-treegrid created="onCreate" load="onLoad" dataBound="onDataBound" dataSourceChanged="onDataChange">
</ejs-treegrid>

<script>
    function onCreate() { console.log('TreeGrid created'); }
    function onLoad() { document.getElementById('TreeGrid').ej2_instances[0].pageSettings.pageSize = 20; }
    function onDataBound() { console.log('Data loaded: ' + document.getElementById('TreeGrid').ej2_instances[0].currentViewRecords.length + ' rows'); }
    function onDataChange(args) { console.log('Data changed: ' + args.action); }
</script>
```

---

## Action Events

| Event | Triggers | Args | Typical Use |
|-------|----------|------|-------------|
| `actionBegin` | Any action starts (sort, filter, page, edit, export) | `requestType` | Show loading spinner, track operations |
| `actionComplete` | Any action completes | `requestType`, `result` | Hide spinner, refresh related UI |
| `actionFailure` | Action fails (CRUD, binding, export) | `error`, `error[0]` | Display error message to user |

**Example:**
```cshtml
<ejs-treegrid actionBegin="onBegin" actionComplete="onComplete" actionFailure="onError">
</ejs-treegrid>

<script>
    function onBegin(args) {
        if (args.requestType === 'save') { document.getElementById('spinner').style.display = 'block'; }
    }
    function onComplete(args) {
        document.getElementById('spinner').style.display = 'none';
        console.log('Action complete: ' + args.requestType);
    }
    function onError(args) {
        console.error('Failed: ' + args.error[0]);
    }
</script>
```

---

## Data Events

| Event | Triggers | Args | Purpose |
|-------|----------|------|---------|
| `detailDataBound` | Detail row expands | `data`, `row` | Populate detail template with data |
| `headerCellInfo` | Header cell accessed | `cell`, `column` | Customize header appearance |
| `queryDataBound` | Before data binding | `data` | Pre-process data |

---

## Expand/Collapse Events

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

| Event | Triggers | Args | Use Case |
|-------|----------|------|----------|
| `expanding` | Parent row expanding | `data`, `row` | Validate/prevent expand |
| `expanded` | Parent row expanded | `data`, `row` | Load child data, update UI |
| `collapsing` | Parent row collapsing | `data`, `row` | Save expand state |
| `collapsed` | Parent row collapsed | `data`, `row` | Cleanup, unload data |

**Example:**
```cshtml
<ejs-treegrid expanding="onExpanding" expanded="onExpanded">
</ejs-treegrid>

<script>
    function onExpanding(args) {
        console.log('Expanding: ' + args.data.TaskName);
        // args.cancel = true; // Prevent expand
    }
    function onExpanded(args) {
        localStorage.setItem('lastExpandedId', args.data.TaskId);
    }
</script>
```

---

## Edit Events

| Event | Triggers | Args | Purpose |
|-------|----------|------|---------|
| `beginEdit` | Edit mode starts | `data`, `rowData`, `requestType` | Validate before edit, setup validators |
| `cellEdit` | Cell editing begins | `data`, `cell`, `value` | Custom cell validation |
| `cellSave` | Cell value changes | `data`, `newValue`, `oldValue` | Update on each cell save |
| `cellSaved` | Cell saved successfully | `data`, `newValue` | Sync to external system |
| `batchAdd` | Row added in batch | `data`, `index` | Track additions |
| `batchDelete` | Row deleted in batch | `data`, `index` | Track deletions |
| `beforeBatchAdd` | Before batch add | `data` | Validate new row |
| `beforeBatchDelete` | Before batch delete | `data` | Confirm delete |
| `beforeBatchSave` | Before batch save | `batchChanges` | Validate all changes |

**Example:**
```cshtml
<ejs-treegrid beginEdit="onBeginEdit" cellSaving="onCellSave" actionFailure="onError">
    <e-treegrid-editsettings allowAdding="true" allowEditing="true" mode="Cell">
    </e-treegrid-editsettings>
</ejs-treegrid>

<script>
    function onBeginEdit(args) {
        if (args.requestType === 'save') {
            if (args.data.TaskName === '') { args.cancel = true; alert('Task name required'); }
        }
    }
    function onCellSave(args) {
        console.log('Changing: ' + args.data.TaskName + ' to ' + args.newValue);
    }
</script>
```

---

## Selection Events

| Event | Triggers | Args | Use Case |
|-------|----------|------|----------|
| `rowSelected` | Row selected | `data`, `rowIndex` | Highlight related items |
| `rowSelecting` | Before row select | `data`, `rowIndex` | Validate/prevent selection |
| `rowDeselected` | Row deselected | `data`, `rowIndex` | Update related UI |
| `rowDeselecting` | Before deselect | `data`, `rowIndex` | Confirm deselection |
| `cellSelected` | Cell selected | `cell`, `value` | Show cell details |
| `cellSelecting` | Before cell select | `cell` | Prevent if needed |
| `cellDeselected` | Cell deselected | `cell` | Cleanup |
| `cellDeselecting` | Before deselect | `cell` | Validate |
| `checkboxChange` | Checkbox toggled | `data`, `isChecked` | Track selection state |

**Example:**
```cshtml
<ejs-treegrid rowSelected="onRowSelect" checkboxChange="onCheckboxChange">
    <e-treegrid-selectionsettings type="Multiple" mode="Row">
    </e-treegrid-selectionsettings>
</ejs-treegrid>

<script>
    var selectedRows = [];
    function onRowSelect(args) {
        selectedRows.push(args.data.TaskId);
        console.log('Selected: ' + selectedRows.length + ' rows');
    }
    function onCheckboxChange(args) {
        if (args.isChecked) { 
            console.log('Checked: ' + args.data.TaskName); 
        } else { 
            console.log('Unchecked: ' + args.data.TaskName); 
        }
    }
</script>
```

---

## Drag & Drop Events

| Event | Triggers | Args | Purpose |
|-------|----------|------|---------|
| `rowDragStartHelper` | Before row drag | `data`, `row` | Show drag helper/preview |
| `rowDragStart` | Row drag begins | `data`, `row` | Track drag start |
| `rowDrag` | During drag (continuous) | `data`, `row`, `position` | Update position indicator |
| `rowDrop` | Row dropped | `data`, `dropPosition` | Save reordered data to server |
| `columnDragStart` | Column header drag starts | `column` | Setup column reorder |
| `columnDrag` | During column drag | `column`, `position` | Show drop zone |
| `columnDrop` | Column dropped | `column`, `newIndex` | Persist new column order |

**Example:**
```cshtml
<ejs-treegrid allowRowDragAndDrop="true" rowDrop="onRowDrop">
    <e-treegrid-rowdropsettings dropTarget="TreeGrid"></e-treegrid-rowdropsettings>
</ejs-treegrid>

<script>
    function onRowDrop(args) {
        console.log('Dropped: ' + args.data.TaskName + ' at position ' + args.dropIndex);
        // Persist to server
    }
</script>
```

---

## Column/UI Events

| Event | Triggers | Args | Use Case |
|-------|----------|------|----------|
| `columnMenuClick` | Column menu item clicked | `column`, `item` | Handle column menu actions |
| `columnMenuOpen` | Column menu opens | `column` | Dynamically enable/disable items |
| `contextMenuClick` | Row context menu item clicked | `item`, `rowData` | Handle row actions |
| `contextMenuOpen` | Context menu opens | Does | Show/hide custom items |
| `columnDragStart` | Column header drag starts | `column` | Track reorder |
| `columnDrop` | Column dropped | `column`, `newIndex` | Save new order |
| `resizeStart` | Column resize starts | `column` | Track resize |
| `resizing` | During resize | `column`, `newWidth` | Show width preview |
| `resizeStop` | Resize completes | `column`, `newWidth` | Persist width |
| `toolbarClick` | Toolbar button clicked | `item`, `name` | Handle toolbar actions (Add, Edit, Delete, Export) |
| `recordDoubleClick` | Row double-clicked | `data`, `row` | Open edit dialog, toggle expand |

**Example:**
```cshtml
<ejs-treegrid toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel", "ExcelExport", "PdfExport" })"
              toolbarClick="onToolbarClick" recordDoubleClick="onRecordDoubleClick">
</ejs-treegrid>

<script>
    function onToolbarClick(args) {
        if (args.item.id.indexOf('excelexport') > -1) {
            console.log('Exporting to Excel...');
        }
    }
    function onRecordDoubleClick(args) {
        console.log('Toggling expand for: ' + args.data.TaskName);
    }
</script>
```

---

## Export Events

| Event | Triggers | Args | Purpose |
|-------|----------|------|---------|
| `beforeExcelExport` | Before Excel export | `type`, `cancel` | Customize export headers/styles |
| `excelExportComplete` | Excel export done | `type` | Show success message |
| `beforePdfExport` | Before PDF export | `type`, `cancel` | Setup PDF themes |
| `pdfExportComplete` | PDF export done | `type` | Trigger download, log event |
| `beforePrint` | Before print | `printModule` | Setup print styles |
| `printComplete` | Print done | None | Log completion |
| `excelQueryCellInfo` | Before each Excel cell export | `cell`, `data` | Customize cell formatting |
| `excelHeaderQueryCellInfo` | Before each header Excel cell | `cell`, `column` | Style headers |
| `excelAggregateQueryCellInfo` | Before aggregate cell export | `cell` | Format footer aggregates |
| `pdfQueryCellInfo` | Before each PDF cell export | `cell`, `data` | PDF cell styling |
| `pdfHeaderQueryCellInfo` | Before header PDF cell | `cell`, `column` | PDF header styling |
| `pdfAggregateQueryCellInfo` | Before PDF aggregate export | `cell` | PDF footer styling |

**Example:**
```cshtml
<ejs-treegrid allowExcelExport="true" allowPdfExport="true"
              beforeExcelExport="onBeforeExcelExport" excelExportComplete="onExcelComplete">
</ejs-treegrid>

<script>
    function onBeforeExcelExport(args) {
        console.log('Exporting to Excel...');
    }
    function onExcelComplete(args) {
        alert('Export completed successfully!');
    }
</script>
```

---

## Custom Rendering Events

| Event | Triggers | Args | Purpose |
|-------|----------|------|---------|
| `queryCellInfo` | Before each cell renders | `cell`, `data`, `column` | Apply custom styling, add attributes |
| `rowDataBound` | Before each row renders | `data`, `row` | Alternate colors, conditional styling |
| `detailDataBound` | Detail row data bound | `data`, `detailRow` | Populate detail template |
| `excelCellRendering` | Each Excel cell export | `cell`, `data` | Custom Excel cell format |
| `excelHeaderCellRendering` | Each Excel header | `cell`, `column` | Header styling in export |
| `excelAggregateCellRendering` | Aggregate cells export | `cell` | Footer styling |
| `pdfCellRendering` | Each PDF cell export | `cell`, `data` | PDF cell styling |
| `pdfHeaderCellRendering` | PDF header cells | `cell`, `column` | Header styling |
| `pdfAggregateCellRendering` | PDF footer cells | `cell` | Footer styling |

**Example:**
```cshtml
<ejs-treegrid queryCellInfo="onQueryCellInfo" rowDataBound="onRowDataBound">
</ejs-treegrid>

<script>
    function onQueryCellInfo(args) {
        if (args.cell.textContent === 'Critical') {
            args.cell.style.backgroundColor = '#FF0000';
            args.cell.style.color = '#FFFFFF';
        }
    }
    function onRowDataBound(args) {
        if (args.data.Priority === 'High') {
            args.row.style.backgroundColor = '#FFF3CD';
        }
    }
</script>
```

