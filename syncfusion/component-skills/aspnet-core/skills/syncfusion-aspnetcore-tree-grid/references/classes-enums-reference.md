# Classes & Enums Reference — Syncfusion ASP.NET Core TreeGrid

## Table of Contents
- [Enums](#enums)
- [Settings Classes](#settings-classes)
- [Column Configuration Classes](#column-configuration-classes)
- [Builder Pattern](#builder-pattern)

> **When to Use:** Configure TreeGrid using settings objects, understand enum values for dropdowns, explore builder pattern for fluent configuration.

---

## Enums

### CopyHierarchyType
Controls how hierarchy is copied in export operations.

```csharp
public enum CopyHierarchyType
{
    All,        // Copy all rows including parents and children
    Parent,     // Copy only parent rows
    Child       // Copy only child rows
}

// Usage in export:
<ejs-treegrid allowExcelExport="true">
    <e-treegrid-excelExportProperties dataSource="@ViewBag.data" 
                                       isCollapsedStatePersist="true">
    </e-treegrid-excelExportProperties>
</ejs-treegrid>
```

### EditMode
Specifies editing mode for TreeGrid.

```csharp
public enum EditMode
{
    Cell,       // Edit individual cells
    Row,        // Edit entire row
    Dialog,     // Edit in modal dialog
    Batch       // Batch edit multiple rows, submit once
}

// Usage:
<e-treegrid-editsettings mode="EditMode.Row" allowEditing="true" allowAdding="true">
</e-treegrid-editsettings>
```

### FilterHierarchyMode
Specifies how filtering applies to parent-child relationships.

```csharp
public enum FilterHierarchyMode
{
    Parent,     // Filter parents only; show all children
    Child,      // Filter children only; show matching parents
    Both,       // Show rows matching filter in any level
    None        // Default: no hierarchy-aware filtering
}

// Usage:
<e-treegrid-filtersettings hierarchyMode="FilterHierarchyMode.Parent">
</e-treegrid-filtersettings>
```

### FilterType
Specifies filter UI type.

```csharp
public enum FilterType
{
    FilterBar,  // Default: single-row filter input
    Menu,       // Excel-style filter menu per column
    Excel       // Full Excel filter experience
}

// Usage:
<e-treegrid-filtersettings type="FilterType.Menu" mode="FilterMode.Immediate">
</e-treegrid-filtersettings>
```

### PageSizeMode
Specifies page size behavior for hierarchical data.

```csharp
public enum PageSizeMode
{
    All,        // pageSize applies to all records (expanded + collapsed)
    Root        // pageSize applies to root level only
}

// Usage:
<e-treegrid-pagesettings pageSize="20" pageSizeMode="PageSizeMode.Root">
</e-treegrid-pagesettings>
```

### RowPosition
Position where new row is inserted in hierarchy.

```csharp
public enum RowPosition
{
    Top,        // Add as first row
    Bottom,     // Add as last row
    Above,      // Above current row
    Below,      // Below current row
    Child       // Add as child of current row
}

// Usage: Set via editSettings.newRowPosition
```

### WrapMode
Text wrapping behavior for columns.

```csharp
public enum WrapMode
{
    Both,       // Wrap both header and content
    Content,    // Wrap only cell content
    Header      // Wrap only header text
}

// Usage:
<e-treegrid-textWrapsettings wrapMode="WrapMode.Both">
</e-treegrid-textWrapsettings>
```

---

## Settings Classes

Settings classes configure TreeGrid behavior. Use `<e-treegrid-{setting}s>` tags in CSHTML.

### EditSettings / e-treegrid-editsettings
Controls edit mode, validation, and behavior.

```csharp
public class EditSettings
{
    public EditMode mode { get; set; }              // Cell, Row, Dialog, Batch
    public bool allowAdding { get; set; }           // Enable row insertion
    public bool allowEditing { get; set; }          // Enable cell/row editing
    public bool allowDeleting { get; set; }         // Enable row deletion
    public RowPosition newRowPosition { get; set; } // Top, Bottom, Above, Below, Child
    public bool allowNextRowEdit { get; set; }      // Move to next row after save
    public DialogEditSettings dialogEditsettings { get; set; }  // Dialog properties
    public BatchSettings batchSettings { get; set; }            // Batch edit props
}

// Usage:
<e-treegrid-editsettings mode="EditMode.Row" allowAdding="true" 
                         allowEditing="true" newRowPosition="RowPosition.Child">
</e-treegrid-editsettings>
```

### PageSettings / e-treegrid-pagesettings
Controls pagination of hierarchical data.

```csharp
public class PageSettings
{
    public int pageSize { get; set; }                   // Rows per page (default: 12)
    public PageSizeMode pageSizeMode { get; set; }     // All or Root
    public int pageCount { get; set; }                  // Read-only: current page count
    public int currentPage { get; set; }                // Read-only: current page number
}

// Usage:
<e-treegrid-pagesettings pageSize="20" pageSizeMode="PageSizeMode.Root">
</e-treegrid-pagesettings>
```

### SortSettings / e-treegrid-sortsettings
Controls sorting behavior.

```csharp
public class SortSettings
{
    public List<SortDescriptor> columns { get; set; }  // Sort columns
    public bool allowUnsort { get; set; }              // Click to remove sort
}

public class SortDescriptor
{
    public string field { get; set; }           // Column field to sort
    public string direction { get; set; }       // Ascending, Descending
    public int priority { get; set; }           // Multi-column sort order
}

// Usage:
<e-treegrid-sortsettings allowUnsort="true">
    <e-sort-descriptors>
        <e-sort-descriptor field="TaskName" direction="Ascending"></e-sort-descriptor>
    </e-sort-descriptors>
</e-treegrid-sortsettings>
```

### FilterSettings / e-treegrid-filtersettings
Controls filtering behavior and UI.

```csharp
public class FilterSettings
{
    public FilterType type { get; set; }              // FilterBar, Menu, Excel
    public FilterMode mode { get; set; }              // Immediate, OnEnter
    public FilterHierarchyMode hierarchyMode { get; set; }  // Parent, Child, Both, None
    public bool showFilterBar { get; set; }           // Show/hide filter row (default: true)
    public bool immediateExcelSearch { get; set; }    // Search as you type in Excel filter
}

public enum FilterMode { Immediate, OnEnter }

// Usage:
<e-treegrid-filtersettings type="FilterType.Menu" mode="FilterMode.OnEnter" 
                            hierarchyMode="FilterHierarchyMode.Both">
</e-treegrid-filtersettings>
```

### SelectionSettings / e-treegrid-selectionsettings
Controls row/cell selection behavior.

```csharp
public class SelectionSettings
{
    public SelectionType type { get; set; }       // Single, Multiple
    public SelectionMode mode { get; set; }       // Row, Cell, Both
    public bool checkboxOnly { get; set; }        // Select via checkbox only
    public CheckBoxPosition checkboxPosition { get; set; }  // Left, Right
    public bool enableSimpleMultiRowSelection { get; set; } // Ctrl not required
}

public enum SelectionType { Single, Multiple }
public enum SelectionMode { Row, Cell, Both }
public enum CheckBoxPosition { Left, Right }

// Usage:
<e-treegrid-selectionsettings type="SelectionType.Multiple" mode="SelectionMode.Row" 
                              checkboxOnly="true">
</e-treegrid-selectionsettings>
```

### RowDropSettings / e-treegrid-rowdropsettings
Controls row drag-drop behavior.

```csharp
public class RowDropSettings
{
    public string dropTarget { get; set; }  // Target element selector (e.g., "TreeGrid")
}

// Usage:
<ejs-treegrid allowRowDragAndDrop="true">
    <e-treegrid-rowdropsettings dropTarget="TreeGrid">
    </e-treegrid-rowdropsettings>
</ejs-treegrid>
```

### InfiniteScrollSettings / e-treegrid-infiniteScrollsettings
Controls infinite scroll behavior.

```csharp
public class InfiniteScrollSettings
{
    public int initialBlocks { get; set; }    // Data blocks to fetch initially (default: 5)
    public bool enableCache { get; set; }     // Cache fetched data (default: false)
}

// Usage:
<ejs-treegrid enableInfiniteScrolling="true">
    <e-treegrid-infiniteScrollsettings initialBlocks="3" enableCache="true">
    </e-treegrid-infiniteScrollsettings>
</ejs-treegrid>
```

### ColumnMenuSettings / e-treegrid-columnmenusettings
Controls column menu options.

```csharp
public class ColumnMenuSettings
{
    public List<string> items { get; set; }  // Menu items: Filter, SortAscending, etc.
    public string target { get; set; }       // Menu target element
}

// Usage:
<e-treegrid-columnmenusettings>
    <e-menu-items>
        <e-menu-item>Filter</e-menu-item>
        <e-menu-item>SortAscending</e-menu-item>
        <e-menu-item>SortDescending</e-menu-item>
    </e-menu-items>
</e-treegrid-columnmenusettings>
```

### ColumnChooserSettings / e-treegrid-columnchoosersettings
Configures column visibility dialog.

```csharp
public class ColumnChooserSettings
{
    public string[] columns { get; set; }    // Columns to show in chooser
    public string mode { get; set; }         // Popup, Dialog (default: Dialog)
    public string target { get; set; }       // Dialog target element
    public bool hideCheckAll { get; set; }   // Hide "Check All" option
}

// Usage:
<e-treegrid-columnchoosersettings mode="Dialog">
</e-treegrid-columnchoosersettings>
```

### TextWrapSettings / e-treegrid-textWrapsettings
Configures text wrapping.

```csharp
public class TextWrapSettings
{
    public WrapMode wrapMode { get; set; }  // Both, Content, Header
    public List<string> wrapColumns { get; set; }  // Columns to apply wrap
}

// Usage:
<e-treegrid-textWrapsettings wrapMode="WrapMode.Both">
</e-treegrid-textWrapsettings>
```

---

## Column Configuration Classes

### TreeGridColumn / e-treegrid-column
Defines individual columns with full property support.

```csharp
public class TreeGridColumn
{
    // Data & Display
    public string field { get; set; }                      // Bind to data property
    public string headerText { get; set; }                 // Column header title
    public string type { get; set; }                       // Column data type
    public string format { get; set; }                     // Date/number format (yMd, C2, etc.)
    public string template { get; set; }                   // Custom cell template
    public string editTemplate { get; set; }               // Edit cell template
    public string headerTemplate { get; set; }             // Custom header template
    public object valueAccessor { get; set; }              // Custom value accessor function
    public object formatter { get; set; }                  // Custom formatter function
    public string defaultValue { get; set; }               // Default value for new rows
    
    // Width & Layout
    public string width { get; set; }                      // Column width (pixels or %)
    public string minWidth { get; set; }                   // Minimum width
    public string maxWidth { get; set; }                   // Maximum width
    public string textAlign { get; set; }                  // Alignment: Left, Right, Center
    public TextAlign headerTextAlign { get; set; }         // Header alignment
    public string hideAtMedia { get; set; }                // CSS media query for hiding
    
    // Behavioral
    public bool allowSorting { get; set; }                 // Enable sorting (default: true)
    public bool allowFiltering { get; set; }               // Enable filtering (default: true)
    public bool allowEditing { get; set; }                 // Enable editing (default: true)
    public bool allowReordering { get; set; }              // Enable drag reorder (default: true)
    public bool allowResizing { get; set; }                // Enable resize (default: true)
    public bool isFrozen { get; set; }                     // Freeze column position (default: false)
    public bool lockColumn { get; set; }                   // Prevent reordering (default: false)
    public bool visible { get; set; }                      // Column visibility (default: true)
    public bool showColumnMenu { get; set; }               // Show menu icon (default: true)
    public bool showInColumnChooser { get; set; }          // Show in chooser (default: true)
    public bool showCheckbox { get; set; }                 // Show selection checkbox (default: false)
    public bool displayAsCheckBox { get; set; }            // Display boolean as checkbox (default: false)
    
    // Spanning
    public bool enableColumnSpan { get; set; }             // Allow column spanning (default: true)
    public bool enableRowSpan { get; set; }                // Allow row spanning (default: true)
    
    // Validation & Formatting
    public object validationRules { get; set; }            // Validation rules object
    public ClipMode clipMode { get; set; }                 // Overflow handling: Clip, Ellipsis, EllipsisWithTooltip
    
    // Type Info
    public bool isPrimaryKey { get; set; }                 // Primary key flag (default: false)
    public bool isIdentity { get; set; }                   // Identity column flag (default: false)
    public string uid { get; set; }                        // Unique identifier (read-only)
    
    // Advanced
    public string editType { get; set; }                   // Edit component type (default: "stringedit")
    public object edit { get; set; }                       // Custom edit cell config
    public object filter { get; set; }                     // Custom filter config
    public object filterBarTemplate { get; set; }          // Filter bar template
    public object commands { get; set; }                   // Action button commands
    public object customAttributes { get; set; }           // CSS attributes object
    public object sortComparer { get; set; }               // Custom sort comparer
    public FreezeDirection freeze { get; set; }            // Freeze side: Left, Right, None
    public object columns { get; set; }                    // Nested columns for stacking
}

// Usage:
<e-treegrid-columns>
    <e-treegrid-column field="TaskId" headerText="ID" width="100" isPrimaryKey="true" 
                       isFrozen="true" type="number">
    </e-treegrid-column>
    
    <e-treegrid-column field="TaskName" headerText="Task Name" width="150" type="string" 
                       allowEditing="true" allowSorting="true">
    </e-treegrid-column>
    
    <e-treegrid-column field="StartDate" headerText="Start Date" type="DateTime" 
                       format="yMd" width="120">
    </e-treegrid-column>
    
    <e-treegrid-column field="Duration" headerText="Days" type="number" textAlign="Right" 
                       format="N0" width="100">
    </e-treegrid-column>
    
    <e-treegrid-column field="IsActive" headerText="Active" type="boolean" 
                       displayAsCheckBox="true" width="80">
    </e-treegrid-column>
</e-treegrid-columns>
```

**Common Property Combinations:**

| Use Case | Properties |
|----------|-----------|
| **Read-only column** | `allowEditing="false"` |
| **Frozen (non-scrolling)** | `isFrozen="true"` + `lockColumn="true"` |
| **Hidden on mobile** | `hideAtMedia="(min-width: 700px)"` |
| **Primary key** | `isPrimaryKey="true"` + type matching |
| **Custom display** | `template="..."` + `formatter="..."` |
| **Validation** | `validationRules="..."` + valid edit type |
| **Selection checkbox** | `showCheckbox="true"` (selects row) |
| **Boolean display** | `type="boolean"` + `displayAsCheckBox="true"` |

### TreeGridStackedColumn / e-treegrid-stacked-column
Defines stacked columns (same properties as TreeGridColumn but used for column grouping).

```csharp
public class TreeGridStackedColumn
{
    // Same properties as TreeGridColumn:
    // Data & Display
    public string field { get; set; }                      // Bind to data property
    public string headerText { get; set; }                 // Column header title
    public string type { get; set; }                       // Column data type
    public string format { get; set; }                     // Date/number format
    public string template { get; set; }                   // Custom cell template
    . . .
}

// Usage - for stacked header grouping:
<e-treegrid-stacked-column>
    <e-treegrid-column field="EmployeeName" headerText="Name" width="120">
    </e-treegrid-column>
    <e-treegrid-column field="EmployeeId" headerText="ID" width="100">
</e-treegrid-stacked-column>

// Actual columns under stacking:
<e-treegrid-columns>
    <e-treegrid-column field="EmployeeName" headerText="Name" width="120">
    </e-treegrid-column>
    <e-treegrid-column field="EmployeeId" headerText="ID" width="100">
    </e-treegrid-column>
    <e-treegrid-column field="Department" headerText="Dept" width="100">
    </e-treegrid-column>
    
    <e-treegrid-column field="ProjectName" headerText="Project" width="120">
    </e-treegrid-column>
    <e-treegrid-column field="Budget" headerText="Budget" type="number" format="C2" width="100">
    </e-treegrid-column>
</e-treegrid-columns>
```

---

## Builder Pattern

Fluent API for progressive configuration in code-behind scenarios:

```javascript
// Not typically used in TagHelper approach, but available for JavaScript initialization:

var treeGridObj = new ej.treegrid.TreeGrid({
    dataSource: data,
    childMapping: 'subtasks',
    treeColumnIndex: 1,
    columns: [
        { field: 'taskId', headerText: 'ID', width: 100 },
        { field: 'taskName', headerText: 'Task Name', width: 150 }
    ],
    editSettings: {
        allowEditing: true,
        allowAdding: true,
        mode: 'Row'
    },
    pageSettings: {
        pageSize: 20,
        pageSizeMode: 'Root'
    },
    sortSettings: {
        columns: [{ field: 'taskName', direction: 'Ascending' }]
    },
    filterSettings: {
        type: 'Menu',
        hierarchyMode: 'Both'
    },
    selectionSettings: {
        type: 'Multiple',
        mode: 'Row'
    }
});

treeGridObj.appendTo('#TreeGrid');
```

The builder pattern allows chaining configuration methods. In TagHelper approach (CSHTML), use nested child tags:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.data" childMapping="subtasks" treeColumnIndex="1">
    <e-treegrid-columns>
        <e-treegrid-column field="taskId" headerText="ID" width="100"></e-treegrid-column>
        <e-treegrid-column field="taskName" headerText="Task Name" width="150"></e-treegrid-column>
    </e-treegrid-columns>
    
    <e-treegrid-editsettings mode="EditMode.Row" allowEditing="true" allowAdding="true">
    </e-treegrid-editsettings>
    
    <e-treegrid-pagesettings pageSize="20" pageSizeMode="PageSizeMode.Root">
    </e-treegrid-pagesettings>
    
    <e-treegrid-sortsettings>
        <e-sort-descriptors>
            <e-sort-descriptor field="taskName" direction="Ascending"></e-sort-descriptor>
        </e-sort-descriptors>
    </e-treegrid-sortsettings>
    
    <e-treegrid-filtersettings type="FilterType.Menu" hierarchyMode="FilterHierarchyMode.Both">
    </e-treegrid-filtersettings>
    
    <e-treegrid-selectionsettings type="SelectionType.Multiple" mode="SelectionMode.Row">
    </e-treegrid-selectionsettings>
</ejs-treegrid>
```

This approach is the ASP.NET Core TagHelper equivalent of the builder pattern.
