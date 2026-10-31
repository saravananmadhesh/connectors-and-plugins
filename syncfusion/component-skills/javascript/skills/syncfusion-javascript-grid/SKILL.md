---
name: syncfusion-javascript-grid
description: 'Implements Syncfusion JavaScript Grid component for feature-rich data tables and grids. Use this when working with data display, sorting, filtering, grouping, aggregates, editing, or exporting. This skill covers grid configuration, CRUD operations, virtual scrolling, hierarchy grids, state persistence, and advanced data management features for data-intensive applications.'
metadata:
  author: "Syncfusion"
  version: "34.1.29"
  category: "Grids"
---

# Syncfusion JavaScript Grid Component Skill

## ⚠️ Security & Trust Boundary
 
- The Grid skill does not perform any remote data access.
- All external API interaction is handled by a separate DataManager skill outside this skill’s trust boundary.

## Table of Contents

- [When to Use This Skill](#when-to-use-this-skill)
- [Grid Overview](#grid-overview)
- [Mandatory Rules for Inbuilt API](#mandatory-rules-for-inbuilt-api)
- [Documentation and Navigation Guide](#documentation-and-navigation-guide)
- [Quick Start Example](#quick-start-example)
- [Common Patterns](#common-patterns)
- [Key Props and Configuration](#key-props-and-configuration)

## When to Use This Skill

Use this skill when you need to:
- **Build interactive data grids** with multiple columns and rows
- **Perform CRUD operations** (create, read, update, delete)
- **Filter, sort, and search** large datasets
- **Group and aggregate** data with summaries
- **Export data** to Excel or PDF formats
- **Implement row selection or multi-select** scenarios
- **Create responsive data tables** with virtual scrolling
- **Customize grid styling** and appearance
- **Handle editing modes** (inline, dialog, batch)
- **Persist grid state** across sessions
- **Work with TypeScript** and modern module systems

## Grid Overview

The Syncfusion EJ2 Grid is a powerful, high-performance data grid component for TypeScript that provides:
- **Flexible data binding** (local, remote, OData)
- **Rich column features** (templates, spanning, foreign keys, frozen)
- **Advanced editing** (inline, dialog, batch, command columns)
- **Powerful filtering** (menu, bar, excel-like)
- **Multi-level grouping** with custom aggregates
- **6+ selection modes** (row, cell, column, checkbox)
- **Export capabilities** (Excel, PDF with templates)
- **Performance optimization** (virtual/infinite scrolling)
- **Complete customization** (themes, styling, events)

## Mandatory Rules for Inbuilt API

**CRITICAL**: Follow these rules when using Grid's inbuilt API (137+ methods, 65+ events, 95+ properties):

### Rule 1: Module Injection Required for Feature Methods
Methods only work if their module is injected. No error thrown if module missing.

| Method | Required Module | Example |
|--------|----------------|---------|
| `goToPage()` | `Page` | `Grid.Inject(Page)` or `Inject(Page)` |
| `sortColumn()` | `Sort` | `Grid.Inject(Sort)` or `Inject(Sort)` |
| `filterByColumn()` | `Filter` | `Grid.Inject(Filter)` or `Inject(Filter)` |
| `addRecord()`, `deleteRecord()` | `Edit` | `Grid.Inject(Edit)` or `Inject(Edit)` |

---

📄 **Full Properties API Reference:** [references/api-reference.md](references/api-reference.md) 
📄 **Full Methods API Reference:** [references/programmatic-api.md](references/programmatic-api.md)
📄 **Full Events API Reference:** [references/events-catalog.md](references/events-catalog.md)
📄 **Backend Integration:** [references/adaptors.md](references/adaptors.md)

---

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and npm package setup
- TypeScript module imports and configuration
- CSS imports and theme selection
- Basic grid initialization with sample data
- Injecting required modules

### Column Features
📄 **Read:** [references/columns.md](references/columns.md)
- Column types (string, number, date, boolean)
- Column binding and properties
- Data type formatting
- Column width and basic configuration
- Foreign-key columns
- Frozen columns
- Column templates and custom rendering
- Column spanning
- Column width management
- Column chooser (show/hide columns)
- Column headers and customization
- Column menu
- Column reordering
- Column resizing

📄 **Read:** [references/command-column.md](references/command-column.md)
- Command column basics
- Built-in command types (edit, delete, save, cancel)
- Custom command buttons
- Command templates
- Command event handling
- Row-level actions

### Data Binding
📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Local data binding with arrays
- Remote data binding (URL, OData, WebAPI)
- Query and URL adapters
- Dynamic data source changes
- **Immutable mode** for optimized rendering performance with large datasets
- Loading indicators (Spinner, Shimmer)
- Data refresh and source switching

### Editing
📄 **Read:** [references/editing.md](references/editing.md)
- All CRUD operations configuration
- Edit settings and modes
- Validation and error handling
- Server-side data persistence
- Edit event handling

### Data Validation
📄 **Read:** [references/validation.md](references/validation.md)
- Built-in validators (required, min, max, pattern)
- Validation rules by column data type (number, string, date)
- Custom validation functions
- Dependent validation (validate based on other column values)
- Dynamic rules (add/remove at runtime)
- Error positioning and display
- CRUD error handling (client + server validation)
- Duplicate detection for unique fields
- Async validation with server checks
- Integration with edit modes, events, and filtering

### Filtering Operations
📄 **Read:** [references/filter-setup.md](references/filter-setup.md)
- Setup filtering module
- Enable filtering feature
- Filter types overview
- Disable filtering for columns
- Quick reference

📄 **Read:** [references/filter-operators.md](references/filter-operators.md)
- Filter operators (21+ types)
- Initial filters (OR and AND logic)
- Wildcard and LIKE filters
- Case sensitivity
- Diacritics filter

📄 **Read:** [references/filter-types.md](references/filter-types.md)
- FilterBar filter with template lifecycle
- Menu filter with custom operators
- Excel/CheckBox filter with multi-select
- Custom filter UI components
- Infinite scrolling for large data
- Comparison of filter types

### Sorting
📄 **Read:** [references/sorting.md](references/sorting.md)
- Enable sorting on columns
- Sort multiple columns
- Custom sort comparison
- Sort direction (ascending/descending)
- Sorting with field mapping

### Grouping and Aggregates
📄 **Read:** [references/grouping.md](references/grouping.md)
- Enable grouping feature
- Group by single/multiple columns
- Group caption templates
- Multi-level grouping
- Lazy-load grouping for performance
- Collapse/expand groups

📄 **Read:** [references/aggregates.md](references/aggregates.md)
- Built-in aggregates (Sum, Avg, Min, Max, Count)
- Custom aggregate functions
- Footer aggregates
- Group-level aggregates
- Reactive aggregate updates

### Selection Modes
📄 **Read:** [references/selection.md](references/selection.md)
- Row selection modes
- Cell selection mode
- Column selection mode
- Checkbox selection
- Multi-select configurations
- Selection events and methods

### Row Operations
📄 **Read:** [references/row.md](references/row.md)
- Detail row templates (master-detail)
- Row drag and drop
- Row pinning (freeze top/bottom rows)
- Row spanning
- Custom row templates
- Row height management

### Freezing & Pinning
📄 **Read:** [references/frozen.md](references/frozen.md)
- Freeze columns
- Freeze rows
- Freeze headers
- Row pinning
- Frozen column behavior
- Performance optimization with frozen columns
- Combining frozen columns with virtual scrolling

### Hierarchy & Nested Data
📄 **Read:** [references/hierarchy-grid.md](references/hierarchy-grid.md)
- Parent-child data structures
- Child grid configuration with queryString
- Expand and collapse behavior
- Nested grid templates
- Detail row templates
- Hierarchical data configuration
- Multi-level hierarchy (3-4 levels)
- Dynamic data binding for child grids
- Programmatic expand/collapse control
- Performance considerations for nested data

### Scrolling and Performance
📄 **Read:** [references/scrolling.md](references/scrolling.md)
- Virtual scrolling for large datasets
- Infinite scrolling
- Scroll performance optimization
- Scroll events
- Scroll behavior settings

### Pagination
📄 **Read:** [references/paging.md](references/paging.md)
- Page size configuration
- Pagination types (numeric, combo, custom)
- Page size options
- Current page navigation
- Total records handling

### Searching
📄 **Read:** [references/searching.md](references/searching.md)
- Enable search functionality
- Multi-column search
- Search operators
- Clear search method
- Search performance

### Toolbar
📄 **Read:** [references/toolbar.md](references/toolbar.md)
- Built-in toolbar items (add, edit, delete, save, cancel)
- Custom toolbar templates
- Toolbar item configuration
- Custom buttons and functions
- Toolbar events

### Context Menu
📄 **Read:** [references/context-menu.md](references/context-menu.md)
- Built-in context menu items
- Custom context menus
- Context menu configuration
- Context menu events
- Right-click menu handling
- Submenu items and grouping
- Selection-based menu display

### Event Communication
📄 **Read:** [references/events-catalog.md](references/events-catalog.md)
- Mandatory rules for event handling
- Event binding patterns (configuration, addEventListener, property assignment)
- 85+ grid events by category (lifecycle, action, row, cell, edit, column, etc.)
- requestType catalog for action events
- Cancellation patterns for actionBegin and before-events
- Event timing and firing sequences
- Events for data changes, user interactions, and operations

### Export Features
📄 **Read:** [references/excel-export.md](references/excel-export.md)
- Export to Excel basics
- Export options and customization
- Template rendering in export
- Server-side export
- Exporting filtered/grouped data

📄 **Read:** [references/pdf-export.md](references/pdf-export.md)
- Export to PDF basics
- Export options and customization
- Headers and footers
- Template rendering in export
- Server-side PDF export
- Page orientation and sizing

📄 **Read:** [references/print.md](references/print.md)
- Print grid functionality
- Print settings and options
- Print templates
- Print formatting
- Print preview

### Configuration Management
📄 **Read:** [references/global-local.md](references/global-local.md)
- Global grid settings
- Local column configuration
- Configuration precedence
- Configuration merging
- Dynamic configuration patterns
- Best practices and templates

📄 **Read:** [references/state-management.md](references/state-management.md)
- Save grid state to storage
- Restore grid state
- Persist state across sessions
- State methods (save, restore, clear)
- Local storage integration

⚠️ **Rule**: `enablePersistence: true` must be enable when use state management in grid. 

### Localization & Internationalization
📄 **Read:** [references/localization.md](references/localization.md)
- Multi-language support (60+ languages)
- Locale setup and culture configuration
- Number, date, and currency formatting
- RTL support (Arabic, Hebrew, Farsi)
- Custom localization and translation
- Language switcher implementation

### Styling and Appearance
📄 **Read:** [references/styling-appearance.md](references/styling-appearance.md)
- Available themes (Fluent, Bootstrap, Tailwind)
- CSS customization
- Custom CSS classes
- Row/cell styling
- Appearance methods
- Dark mode support

### Cell
📄 **Read:** [references/cell.md](references/cell.md)
- Cell selection and manipulation
- Get/set cell values
- Cell formatting and styling
- Cell templates
- Cell events and interactions
- Bulk cell operations

### Clipboard
📄 **Read:** [references/clipboard.md](references/clipboard.md)
- Copy/paste functionality
- Clipboard operations
- Copy selected cells
- Paste data
- Clipboard formatting

### Accessibility
📄 **Read:** [references/accessibility.md](references/accessibility.md)
- WCAG 2.2 & Section 508 compliance
- Keyboard navigation (Tab, Enter, Escape, Arrows)
- WAI-ARIA 1.2 implementation
- Screen reader support (NVDA, JAWS)
- Color contrast ratios (4.5:1, 3:1)
- Focus management and restoration
- ARIA live regions for dynamic updates
- Accessibility testing with axe and screen readers

### Responsive Design
📄 **Read:** [references/responsive-adaptive.md](references/responsive-adaptive.md)
- Responsive grid layouts
- Mobile and tablet design
- Touch interactions and gestures
- Responsive columns (show/hide)
- Stack mode for mobile
- Media queries for different screen sizes
- Orientation change handling

### Performance Optimization
📄 **Read:** [references/performance-optimization.md](references/performance-optimization.md)
- Virtual scrolling for large datasets
- Lazy loading groups and details
- Data aggregation and caching
- Memory management
- Performance benchmarking
- Best practices for 10k+ rows
- Remote data optimization

### Module System
📄 **Read:** [references/modules.md](references/modules.md)
- Module injection pattern
- Available modules and feature mapping
- Module dependencies
- Bundle optimization strategies
- Common feature combinations
- Dynamic module loading

### Data Adaptors

📄 **Read:** [references/adaptors.md](references/adaptors.md)
- URL/HTTP adaptor for RESTful APIs
- ODataV4 adaptor for standard OData services
- WebAPI adaptor for ASP.NET WebAPI
- WebMethod adaptor for legacy ASMX Web Services
- RemoteSave adaptor for separate read/write endpoints
- Custom adaptor for proprietary APIs
- GraphQL adaptor for GraphQL endpoints
- Adaptor selection guide and comparison
- Implementation patterns and error handling

### Chart Integration
📄 **Read:** [references/chart-integration.md](references/chart-integration.md)
- Embed charts in detail templates
- Multi-chart dashboards
- Grid and chart data synchronization
- Interactive drill-down charts
- Real-time updating charts
- KPI visualization

### API Reference
📄 **Read:** [references/api-reference.md](references/api-reference.md)
- Grid properties reference
- Methods and function signatures
- Events reference
- Settings objects (PageSettings, FilterSettings, etc.)
- Common configuration patterns
- Quick code examples

### Programmatic Control (Methods)
📄 **Read:** [references/programmatic-api.md](references/programmatic-api.md)
- Grid instance reference and method access
- Mandatory usage rules for methods
- Data and module methods (refresh, dataBind, destroy)
- Row access and manipulation methods (add, update, delete)
- Row selection methods (selectRow, selectRows, getSelectedRecords)
- Column access and manipulation methods (show, hide, reorder)
- Sorting, grouping, filtering methods
- Editing and batch operation methods
- Export and print methods (Excel, PDF, CSV)
- Toolbar and hierarchy methods
- DOM element access methods
- Utility methods (event listeners, templates, spinners)
- Quick usage examples for common scenarios

---

## Quick Start Example

```typescript
import { Grid } from '@syncfusion/ej2-grids';

// Sample data
const data = [
  { OrderID: 10248, CustomerName: 'VINET', TotalAmount: 32.38 },
  { OrderID: 10249, CustomerName: 'TOMSP', TotalAmount: 11.61 }
];

// Create grid
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 120, type: 'number' },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'TotalAmount', headerText: 'Total Amount', width: 120, type: 'number', format: 'C2' }
  ],
  allowPaging: true,
  pageSettings: { pageSize: 10 },
  allowSorting: true,
  allowFiltering: true,
  selectionSettings: { type: 'Multiple', mode: 'Row' }
});

// Render grid
grid.appendTo('#grid');
```

---

## Common Patterns

### Pattern 1: Read-Only Grid with Search
Use when displaying data without editing. Enable sorting, filtering, and searching.
**Read:** [references/getting-started.md](references/getting-started.md) → [references/sorting.md](references/sorting.md) → [references/filter-setup.md](references/filter-setup.md) → [references/searching.md](references/searching.md)

### Pattern 2: Editable Grid with Validation
Use when users need to modify data. Setup editing modes, validation, and toolbar.
**Read:** [references/editing.md](references/editing.md) → [references/validation.md](references/validation.md) → [references/toolbar.md](references/toolbar.md)

### Pattern 3: Grouped Data with Summaries
Use when analyzing aggregated data by groups. Setup grouping and custom aggregates.
**Read:** [references/grouping.md](references/grouping.md) → [references/aggregates.md](references/aggregates.md)

### Pattern 4: Large Dataset with Virtual Scrolling
Use for performance with 10k+ rows. Enable virtual scrolling.
**Read:** [references/scrolling.md](references/scrolling.md) → [references/paging.md](references/paging.md)

### Pattern 5: Master-Detail Hierarchy
Use when displaying nested/related data. Setup detail templates.
**Read:** [references/row.md](references/row.md)

### Pattern 6: Data Export
Use when users need to export to Excel or PDF.
**Read:** [references/excel-export.md](references/excel-export.md) → [references/pdf-export.md](references/pdf-export.md)

---

## Key Props and Configuration

| Property | Type | Use Case |
|----------|------|----------|
| `dataSource` | Array/URL | Bind grid data from local array or remote URL |
| `columns` | ColumnModel[] | Define column structure, types, templates |
| `allowEditing` | Boolean | Enable inline/dialog row editing |
| `allowFiltering` | Boolean | Enable filter bar for columns |
| `allowSorting` | Boolean | Enable sort on column headers |
| `allowGrouping` | Boolean | Enable group by columns |
| `allowPaging` | Boolean | Enable pagination |
| `allowSelection` | Boolean | Enable row/cell selection |
| `editSettings` | EditSettings | Configure edit mode (inline/dialog/batch) |
| `filterSettings` | FilterSettings | Configure filter type (menu/bar/excel) |
| `groupSettings` | GroupSettings | Configure grouping behavior |
| `pageSettings` | PageSettings | Configure page size and type |
| `selectionSettings` | SelectionSettings | Configure selection mode (row/cell/checkbox) |
| `toolbar` | string[] | Add toolbar for CRUD operations |

---
