---
name: syncfusion-aspnetmvc-treegrid
description: "Implements Syncfusion EJ2 ASP.NET MVC TreeGrid component for hierarchical data with editable parent–child tables. Use for nested datasets with sorting, filtering, paging, or Excel/PDF export. Covers data binding, templates, virtual scrolling, editing, selection, aggregates, and state persistence to deliver high‑performance tabular operations."
license: "SEE LICENSE IN license"
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Grid Components"
---

# Syncfusion EJ2 ASP.NET Core Tree Grid

## Table of Contents
- [Getting Started](references/getting-started.md)
- [Data Binding & Hierarchy](references/data-binding.md)
- [Columns & Display](references/columns.md)
- [Column Reordering](references/column-reordering.md)
- [Cell](references/cell.md)
- [Row](references/row.md)
- [Selection & Interaction](references/selection.md)
- [Editing & CRUD](references/editing.md)
- [Sorting](references/sorting.md)
- [Filtering](references/filtering.md)
- [Searching](references/searching.md)
- [Aggregates & Summaries](references/aggregates.md)
- [Toolbar Configuration](references/toolbar.md)
- [Command Column](references/command-column.md)
- [Paging](references/paging.md)
- [Scrolling & Virtualization](references/scrolling.md)
- [Virtualization Scroll](references/virtualization-Scroll.md)
- [Infinite Scroll](references/infinite-scroll.md)
- [Frozen Rows and Columns](references/frozen-rows-and-columns.md)
- [Excel & PDF Export](references/exports.md)
- [State Persistence](references/state-persistence.md)
- [Globalization & Localization](references/globalization.md)
- [Adaptive View (Mobile & Responsive)](references/adaptive-view.md)
- [Context Menu](references/context-menu.md)
- [Loading Animation & States](references/loading-animation.md)
- [Accessibility](references/accessibility.md)
- [Clipboard Operations](references/clipboard.md)
- [Row Drag and Drop](references/row-drag-and-drop.md)
- [Print Functionality](references/print.md)
- [Immutable Mode](references/immutable-mode.md)
- [Performance Optimization](references/performance-features.md)
- [API Properties](references/properties.md)
- [API Methods](references/methods.md)
- [Events Reference](references/events.md)

The Tree Grid component displays hierarchical data in a tabular format with support for data binding, editing, filtering, sorting, grouping, exporting, and dynamic row operations. This guide covers all essential features from basic setup through advanced scenarios.

## ⚠️ Security & Trust Boundary
 
- The TreeGrid skill does not perform any remote data access.
- All external API interaction is handled by a separate DataManager skill outside this skill’s trust boundary.

## When to Use This Skill

Use this skill when you need to:
- Display hierarchical data structures (parent-child relationships)
- Create interactive data grids with editing capabilities
- Implement filtering, sorting, and searching
- Export data to Excel or PDF
- Handle large datasets with virtual scrolling
- Manage row selection and multi-select operations
- Customize cell appearance and row templates
- Create summary/aggregate views of hierarchical data
- Implement drag-and-drop or other user interactions

## Component Overview

**Core Capabilities**:
- **Hierarchical Data**: Display parent-child relationships with expand/collapse
- **Data Binding**: Local arrays or remote data sources
- **CRUD Operations**: Insert, update, delete rows with validation
- **Filtering & Search**: Multiple filter modes, advanced expressions
- **Sorting & Grouping**: Multi-column sorting, aggregates
- **Column Customization**: Templates, formatting, resizing, reordering
- **Export**: Excel (XLSX) and PDF with styling
- **Performance**: Virtual scrolling, infinite scroll, immutable mode
- **Selection**: Row, cell, checkbox selection with multiple modes
- **Responsive**: Mobile-friendly layout, adaptive columns

## Feature Overview Matrix

| Feature | Complexity | Common Use | Performance Impact |
|---|---|---|---|
| **Data Binding & Hierarchy** | Low | Essential | Low |
| **Columns & Formatting** | Low-Medium | Essential | Low |
| **Selection** | Low | Common | Low |
| **Filtering & Sorting** | Medium | Common | Medium (client-side) |
| **Editing** | Medium | Common | Medium |
| **Aggregates** | Medium | Common | Low |
| **Virtual Scrolling** | High | Large datasets | High (positive) |
| **Exporting** | Medium | Occasional | Medium |
| **Advanced Row Features** | Medium | Occasional | Medium |
| **Performance Optimization** | High | Large datasets | High (positive) |

## Navigation Guide

Choose the reference that matches your current need:

### 📄 **Getting Started**
📖 **Read:** [references/getting-started.md](references/getting-started.md)
- Prerequisites & system requirements
- NuGet package installation
- Tag helper setup
- Initial configuration
- First working example
- **Start here for:** New developers setting up Tree Grid

### 📄 **Data Binding & Hierarchy**
📖 **Read:** [references/data-binding.md](references/data-binding.md)
- Local vs remote data sources
- Parent-child mapping
- Hierarchical data structures
- Self-referential data
- Expand state management
- **Start here for:** Connecting your data

### 📄 **Columns & Display**
📖 **Read:** [references/columns.md](references/columns.md)
- Field mapping and types
- Column formatting (numbers, dates)
- Column templates
- Sizing and resizing
- Stacked headers
- **Start here for:** Customizing Grid appearance

### 📄 **Column Reordering**
📖 **Read:** [references/column-reordering.md](references/column-reordering.md)
- Enable column reordering
- Drag-drop column rearrangement
- Reordering events
- Column order persistence
- **Start here for:** User-driven column rearrangement

### 📄 **Cell**
📖 **Read:** [references/cell.md](references/cell.md)
- Cell styling with QueryCellInfo
- HTML content in cells
- Cell templates
- Conditional formatting
- Text wrapping and overflow
- **Start here for:** Cell-level customization

### 📄 **Row**
📖 **Read:** [references/row.md](references/row.md)
- Row templates & custom layouts
- Dynamic row height
- Row spanning & drag-drop
- Detail templates
- Indent customization
- **Start here for:** Row customization

### 📄 **Selection & Interaction**
📖 **Read:** [references/selection.md](references/selection.md)
- Row, cell, checkbox selection
- Multiple selection modes
- Selection events
- Programmatic selection
- Selection patterns & use cases
- **Start here for:** User selection handling

### 📄 **Editing & CRUD**
📖 **Read:** [references/editing.md](references/editing.md)
- Cell/row/dialog editing modes
- Edit templates & types
- Data validation
- Server-side persistence
- Toolbar edit actions
- **Start here for:** Adding edit capabilities

### 📄 **Sorting**
📖 **Read:** [references/sorting.md](references/sorting.md)
- Single & multi-column sorting
- Sort direction configuration
- User and programmatic sorting
- Sort events
- **Start here for:** Data sorting

### 📄 **Filtering**
📖 **Read:** [references/filtering.md](references/filtering.md)
- Filter bar configuration
- Filter menu with operators
- Excel-like filtering
- Advanced filter expressions
- Filter events
- **Start here for:** Data filtering

### 📄 **Searching**
📖 **Read:** [references/searching.md](references/searching.md)
- Enable search functionality
- Search toolbar setup
- Multiple search methods
- Case-sensitive options
- Real-time search
- **Start here for:** Text search

### 📄 **Aggregates & Summaries**
📖 **Read:** [references/aggregates.md](references/aggregates.md)
- Built-in aggregate functions (Sum, Avg, Min, Max, Count)
- Footer aggregates
- Custom aggregates
- Hierarchical summaries
- Format aggregates
- **Start here for:** Creating summary views

### 📄 **Toolbar Configuration**
📖 **Read:** [references/toolbar.md](references/toolbar.md)
- Enable toolbar with built-in items
- Export, Print, Edit, Delete buttons
- Custom toolbar buttons
- Toolbar click events
- Programmatic toolbar actions
- **Start here for:** Adding toolbar UI

### 📄 **Command Column**
📖 **Read:** [references/command-column.md](references/command-column.md)
- Command button column configuration
- Built-in commands (Edit, Delete, Save, Cancel)
- Custom command buttons
- Command click events
- Command column templates
- **Start here for:** Adding inline action buttons

### 📄 **Paging**
📖 **Read:** [references/paging.md](references/paging.md)
- Enable client-side paging
- Page size configuration
- Pager customization
- AllPages vs RootPages modes
- Server-side paging
- **Start here for:** Dividing large datasets

### 📄 **Scrolling & Virtualization**
📖 **Read:** [references/scrolling.md](references/scrolling.md)
- Horizontal and vertical scrolling
- Performance optimization
- Scroll events
- **Start here for:** Managing grid scroll behavior

### 📄 **Virtualization Scroll**
📖 **Read:** [references/virtualization-Scroll.md](references/virtualization-Scroll.md)
- Virtual scrolling for large datasets
- Row virtualization
- Column virtualization
- Performance optimization for 10,000+ rows
- **Start here for:** Handling massive datasets efficiently

### 📄 **Infinite Scroll**
📖 **Read:** [references/infinite-scroll.md](references/infinite-scroll.md)
- Enable infinite scroll loading
- Dynamic data loading
- Load more events
- Server-side infinite scroll
- **Start here for:** Continuous scrolling without paging

### 📄 **Frozen Rows and Columns**
📖 **Read:** [references/frozen-rows-and-columns.md](references/frozen-rows-and-columns.md)
- Freeze columns
- Freeze rows
- Fixed header rows
- Column freeze customization
- **Start here for:** Creating sticky columns/rows

### 📄 **Excel & PDF Export**
📖 **Read:** [references/exports.md](references/exports.md)
- Excel export configuration with styling
- PDF export configuration
- Cell styling & formatting
- Headers and footers
- Customization options
- Export events
- **Start here for:** Exporting to Excel and PDF files

### 📄 **State Persistence**
📖 **Read:** [references/state-persistence.md](references/state-persistence.md)
- Enable automatic state saving
- Persist sort, filter, selection
- Server-side storage
- Custom state handling
- Restore on page reload
- **Start here for:** Remembering user preferences

### 📄 **Globalization & Localization**
📖 **Read:** [references/globalization.md](references/globalization.md)
- Locale configuration
- 70+ built-in languages
- Custom translations
- RTL support (Arabic, Hebrew)
- Number & date formatting
- **Start here for:** Multi-language support

### 📄 **Adaptive View (Mobile & Responsive)**
📖 **Read:** [references/adaptive-view.md](references/adaptive-view.md)
- Responsive column hiding
- Mobile touch optimization
- Touch-friendly sizing
- Device detection
- Orientation change handling
- **Start here for:** Mobile-friendly grids

### 📄 **Context Menu**
📖 **Read:** [references/context-menu.md](references/context-menu.md)
- Right-click context menu
- Built-in menu items
- Custom menu items
- Context menu events
- Role-based menus
- **Start here for:** Quick-access actions

### 📄 **Loading Animation & States**
📖 **Read:** [references/loading-animation.md](references/loading-animation.md)
- Show/hide loading spinner
- Custom loader templates
- Skeleton loading
- Empty state handling
- Error states & retry logic
- **Start here for:** User feedback during async operations

### 📄 **Accessibility**
📖 **Read:** [references/accessibility.md](references/accessibility.md)
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Accessibility compliance (WCAG)
- Role and semantic HTML
- **Start here for:** Creating accessible grids

### 📄 **Clipboard Operations**
📖 **Read:** [references/clipboard.md](references/clipboard.md)
- Copy cell/row data
- Copy with headers
- Paste operations
- Clipboard events
- Format handling
- **Start here for:** Enabling copy-paste functionality

### 📄 **Row Drag and Drop**
📖 **Read:** [references/row-drag-and-drop.md](references/row-drag-and-drop.md)
- Enable row dragging
- Drop zones
- Drag-drop events
- Custom drop behavior
- Reordering rows
- **Start here for:** User-driven row rearrangement

### 📄 **Print Functionality**
📖 **Read:** [references/print.md](references/print.md)
- Print grid data
- Print styling & appearance
- Print headers and footers
- Page breaks
- Print events
- **Start here for:** Printing grid content

### 📄 **Immutable Mode**
📖 **Read:** [references/immutable-mode.md](references/immutable-mode.md)
- Enable immutable mode for performance
- Data comparison and update detection
- Batch updates
- Large dataset optimization
- **Start here for:** Optimizing updates with large datasets

### 📄 **Advanced Features & Styling**
📖 **Read:** [references/advanced-features.md](references/advanced-features.md)
- Built-in themes (Material, Fluent, Bootstrap)
- Custom CSS customization
- CSS variables
- Responsive styling
- Print styling
- Event handlers
- RTL support
- **Start here for:** Grid customization & branding

### 📄 **Performance Optimization**
📖 **Read:** [references/performance-features.md](references/performance-features.md)
- Virtual scrolling setup
- Immutable mode
- Infinite scroll
- Edit templates
- Validation
- Command columns
- Batch operations
- Server-side persistence
- Large dataset handling best practices
- **Start here for:** Maximizing performance

### 📄 **API Properties**
📖 **Read:** [references/properties.md](references/properties.md)
- Complete property reference
- Configuration options
- Bindable properties
- Default values
- Type definitions
- **Start here for:** Looking up component properties

### 📄 **API Methods**
📖 **Read:** [references/methods.md](references/methods.md)
- Public method reference
- Programmatic API
- Method signatures
- Return types
- Usage examples
- **Start here for:** Calling TreeGrid methods

### 📄 **Events Reference**
📖 **Read:** [references/events.md](references/events.md)
- Complete event listing
- Event signatures
- Event arguments
- Event handling patterns
- Custom event workflows
- **Start here for:** Subscribing to TreeGrid events

## Quick Start Example

**Step 1: Install Package**
```
Install-Package Syncfusion.EJ2.AspNet.Core
```

**Step 2: Add Tag Helper** (`_ViewImports.cshtml`)
```xml
@addTagHelper *, Syncfusion.EJ2
```

**Step 3: Add Resources** (`_Layout.cshtml`)
```xml
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.1.36/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/23.1.36/dist/ej2.min.js"></script>
```

**Step 4: Create Tree Grid**
```xml
<ejs-treegrid id="TreeGrid" 
    dataSource="ViewBag.DataSource" 
    childMapping="Children"
    treeColumnIndex="0">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskID" headerText="ID" width="100" type="number"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" type="date" format="yMd"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="100" type="number"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Step 5: Prepare Data** (Controller)
```csharp
public IActionResult Index()
{
    List<TaskData> data = new List<TaskData>()
    {
        new TaskData() { TaskID = 1, TaskName = "Project", StartDate = new DateTime(2024, 01, 01), Duration = 100,
            Children = new List<TaskData>()
            {
                new TaskData() { TaskID = 2, TaskName = "Planning", Duration = 20 },
                new TaskData() { TaskID = 3, TaskName = "Development", Duration = 50 }
            }
        }
    };
    ViewBag.DataSource = data;
    return View();
}
```

## Common Patterns

### Pattern 1: Formatted Currency Display
```xml
<e-treegrid-column field="Budget" headerText="Budget" type="number" format="C2" width="120"></e-treegrid-column>
```

### Pattern 2: Custom Row Selection
```xml
<e-treegrid-selectionsettings type="Multiple" mode="Row"></e-treegrid-selectionsettings>
```

### Pattern 3: Cell Styling
```javascript
function queryCellInfo(args) {
    if (args.data.Status === 'Complete') {
        args.cell.classList.add('complete-status');
    }
}
```

### Pattern 4: Quick Filters
```xml
<ejs-treegrid 
    allow-filtering="true"
    filter-settings="new { type = 'FilterBar' }">
</ejs-treegrid>
```

## Key Properties Quick Reference

| Property | Type | Purpose | Example |
|---|---|---|---|
| `dataSource` | array/DataManager | Data to display | `ViewBag.DataSource` |
| `childMapping` | string | Child hierarchy field | `"Children"` |
| `treeColumnIndex` | number | Column showing hierarchy | `0` |
| `allowSelection` | boolean | Enable selection | `true` |
| `allowFiltering` | boolean | Enable filtering | `true` |
| `allowSorting` | boolean | Enable sorting | `true` |
| `allowExcelExport` | boolean | Excel export | `true` |
| `allowPdfExport` | boolean | PDF export | `true` |
| `enableVirtualization` | boolean | Virtual scrolling | `true` (large data) |
| `editSettings` | object | CRUD configuration | Editing guide |
| `aggregateRows` | array | Summary rows | Aggregates guide |
| `columns` | array | Grid columns | Columns guide |

For a complete property listing, see [API Properties](references/properties.md).

## Next Steps

1. **Start Simple**: Begin with [Getting Started](references/getting-started.md) for setup
2. **Add Data**: Follow [Data Binding](references/data-binding.md) to connect your data
3. **Customize Display**: Use [Columns Guide](references/columns.md) for formatting
4. **Enable Features**: Add filtering, sorting, editing as needed
5. **Optimize**: Use [Performance Guide](references/performance-features.md) for large datasets
6. **Export**: Configure [Exports](references/exports.md) for reporting
7. **API Reference**: Check [Properties](references/properties.md), [Methods](references/methods.md), and [Events](references/events.md) for complete API documentation

---

**Master Reference**: All 12 comprehensive guides are organized by feature. Choose the topic matching your current task.
