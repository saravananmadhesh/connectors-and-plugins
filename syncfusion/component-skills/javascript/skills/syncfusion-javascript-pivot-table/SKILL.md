---
name: syncfusion-javascript-pivot-table
description: "Use this skill whenever the user wants to implement Syncfusion PivotView in TypeScript applications. Triggers include: pivot table, pivot grid, data analysis, OLAP, aggregation in TypeScript context. Covers data binding (JSON, CSV, remote), drill-down/drill-through, grouping, filtering, conditional formatting, exports (Excel/PDF/CSV), and pivot charts. Use for interactive reports and dashboards. Do NOT use for React, Vue, or Angular."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Grids"
---

# Implementing Syncfusion TypeScript Pivot View

A comprehensive skill for implementing the Syncfusion Pivot View (Pivot Table) component in TypeScript applications. The Pivot View is a powerful data analysis tool that enables users to organize, summarize, and analyze large datasets through interactive drag-and-drop operations, multiple aggregation types, drill-down capabilities, and visual chart representations.

## ⚠️ Security Warning: Data Source Validation

**CRITICAL SECURITY NOTICE:** When implementing pivot tables, always use trusted data sources. **Never** fetch or bind data from untrusted or user-provided URLs without proper validation and sanitization.

### Security Best Practices:

1. **Use Local Data**: Prefer local, in-memory data sources for maximum security
2. **Validate Remote Sources**: Only connect to authenticated and authorized API endpoints under your control
3. **Sanitize User Input**: Never allow users to specify arbitrary URLs or data sources
4. **Use Configuration**: Store API URLs in environment variables or configuration files
5. **Implement Authentication**: Require authentication for all database and API connections
6. **Apply CORS Properly**: Configure CORS to allow only trusted origins

### Security Risks:

- **Indirect Prompt Injection**: Untrusted third-party data can contain malicious content that manipulates AI agent behavior
- **Data Exposure**: Unvalidated remote connections may expose sensitive information
- **SQL Injection**: Unsanitized database queries can lead to data breaches
- **XSS Attacks**: Unescaped data rendered in the UI can execute malicious scripts

✅ **Safe:** Local data, authenticated APIs under your control, parameterized SQL queries
❌ **Unsafe:** User-provided URLs, unauthenticated endpoints, hardcoded connection strings

## When to Use This Skill

Use this skill when the user needs to:

- **Create pivot tables** or pivot grids for data analysis and reporting
- **Analyze large datasets** with dynamic row/column grouping and aggregations
- **Build business intelligence dashboards** with cross-tabulation and OLAP analysis
- **Implement interactive data summarization** with drill-down/drill-through operations
- **Visualize aggregated data** using pivot charts with multiple chart types
- **Connect to various data sources** including JSON, CSV, remote APIs, and databases (SQL Server, MongoDB, MySQL, PostgreSQL, Oracle, Snowflake, Elasticsearch)
- **Enable field manipulation** through drag-and-drop field lists and grouping bars
- **Apply advanced filtering** (member, label, value filtering) to focus on specific data
- **Create calculated fields** with custom formulas for derived metrics
- **Export pivot analysis** to Excel or PDF formats
- **Optimize performance** for large datasets using virtual scrolling, paging, or compression
- **Perform OLAP analysis** with multidimensional cube data

**Trigger Keywords:** pivot table, pivot view, pivot grid, cross-tabulation, OLAP, data pivoting, field list, grouping bar, drill-down, drill-through, aggregation, data summarization, business intelligence, multidimensional analysis

## Overview

The Syncfusion Pivot View component provides:

- **Flexible Data Binding** - JSON, CSV, remote data sources, SQL databases, MongoDB, OLAP cubes
- **Interactive Field Management** - Drag-and-drop field list and grouping bar for runtime configuration
- **Multiple Aggregation Types** - Sum, Count, Average, Min, Max, Product, DistinctCount, and more
- **Advanced Filtering** - Member filtering (include/exclude), label filtering, value filtering with Top/Bottom operators, sort members, append selection to existing filters, and OLAP load-on-demand
- **Sorting & Grouping** - Sort by rows/columns, group by date intervals (quarters, months, years)
- **Calculated Fields** - Create custom fields using formulas and expressions
- **Drill Operations** - Drill down to expand hierarchies, drill through to view raw data
- **Inline Editing** - Edit aggregated values directly in the pivot table
- **Pivot Charts** - Visualize data with 21 chart types including Column, Line, Pie, Bar, Area, and more
- **Export Capabilities** - Export to Excel and PDF with formatting preservation
- **Performance Features** - Virtual scrolling, paging, data compression, defer update
- **Rich Formatting** - Number formatting, conditional formatting with color scales and data bars
- **Accessibility** - WCAG compliant with keyboard navigation and screen reader support

## Documentation and Navigation Guide

### Getting Started & Setup

📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Prerequisites and dependencies
- Installation methods (npm, quickstart template)
- Setting up development environment
- Importing Syncfusion CSS styles and themes
- Browser compatibility and polyfills
- Initializing Pivot View component
- Assigning sample data for first render
- Troubleshooting initial setup issues

### Data Integration & Binding

📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Binding JSON data (local, DataManager, JSON files)
- Binding CSV data (local and remote)
- Remote data binding (WebApiAdaptor, ODataAdaptor)
- Custom adaptors for specialized data sources
- Data type configuration
- Refreshing and updating data dynamically
- Common binding patterns and edge cases

📄 **Database Connections:**
- [references/microsoft-sql-server.md](references/microsoft-sql-server.md) - SQL Server connection and queries
- [references/mongodb.md](references/mongodb.md) - MongoDB collection queries and authentication
- [references/mysql.md](references/mysql.md) - MySQL database configuration
- [references/oracle.md](references/oracle.md) - Oracle database setup and drivers
- [references/postgresql.md](references/postgresql.md) - PostgreSQL connection configuration
- [references/snowflake.md](references/snowflake.md) - Snowflake authentication and query setup
- [references/elasticsearch.md](references/elasticsearch.md) - Elasticsearch connection and queries

### Field Management & Configuration

📄 **Read:** [references/field-list.md](references/field-list.md)
- Enabling field list UI (popup and fixed)
- Stand-alone field list configuration
- Customizing field list appearance
- Adaptive field list for mobile devices
- Field selection and management
- Field hierarchies
- Dynamic field management at runtime

📄 **Read:** [references/grouping-bar.md](references/grouping-bar.md)
- Enabling grouping bar for drag-and-drop
- Grouping bar UI customization
- Adding/removing fields via grouping bar
- Context menu operations
- Field icon customization
- Responsive grouping bar behavior

### Data Manipulation

📄 **Read:** [references/filtering.md](references/filtering.md)
- Member filtering (include/exclude specific items)
- Label filtering with operators (Equals, Contains, Between, etc.)
- Value filtering based on aggregated values including Top and Bottom operators
- Sort members in the member filter dialog
- Append current selection to existing filters
- Loading members on-demand (OLAP) and by level number
- Programmatic filter configuration with `levelCount` and `selectedField`
- Filter events (memberFiltering, memberEditorOpen, actionBegin, actionComplete, actionFailure)
- Disabling filters selectively
- Filter UI customization

📄 **Read:** [references/sorting.md](references/sorting.md)
- Row and column sorting
- Ascending/descending order configuration
- Custom sorting logic
- Programmatic sorting operations
- Sort order for multiple fields
- Sort settings API
- Sorting with aggregates

📄 **Read:** [references/grouping.md](references/grouping.md)
- Enabling grouping feature
- Number grouping with custom ranges
- Date grouping by intervals (Year, Quarter, Month, Week, Day)
- Custom grouping logic
- Programmatic grouping configuration
- Grouping events and customization
- Group settings API
- Ungroup operations

### Calculations & Analytics

📄 **Read:** [references/aggregation.md](references/aggregation.md)
- Built-in aggregation types (Sum, Count, Average, Min, Max, Product, DistinctCount, Median, etc.)
- Setting aggregation type for value fields
- Creating custom aggregation functions
- Applying multiple aggregations to the same field
- Summary customization options
- Aggregation settings API
- Dynamic aggregation changes

📄 **Read:** [references/calculated-field.md](references/calculated-field.md)
- Creating calculated fields with formulas
- Formula syntax and operators
- Available functions for calculations
- Adding calculated fields via UI or programmatically
- Editing and removing calculated fields
- Common formula examples (Profit %, Growth Rate, Variance)
- Calculated field formatting

### Data Exploration & Analysis

📄 **Read:** [references/drill-down.md](references/drill-down.md)
- Drill down to expand hierarchies
- Configuring drilled members
- Expand all vs selective expand
- Expand specific fields
- Programmtic drill operations
- Drill position feature
- Common drill patterns

📄 **Read:** [references/drill-through.md](references/drill-through.md)
- Drill through to view raw data
- Enabling drill through feature
- DrillThrough module injection
- Customizing drill through dialog
- Drill through with pivot charts
- Maximum rows configuration (OLAP)
- Drill through events

### Data Editing

📄 **Read:** [references/editing.md](references/editing.md)
- Enabling inline cell editing
- Edit settings and configuration
- Validation rules for edits
- Edit events (beforeCellEdit, cellEdit, cellSaved)
- Programmatic cell updates
- Batch editing operations
- Save and cancel edit operations

### Visualization & Charts

📄 **Read:** [references/pivot-chart.md](references/pivot-chart.md)
- Enabling pivot chart with display options
- 21 chart types (Line, Column, Area, Bar, Pie, Doughnut, Pyramid, Funnel, etc.)
- Chart configuration (series, axis, legend settings)
- Customizing colors, markers, and tooltips
- Drill operations in charts
- Multiple chart support
- Exporting charts to image/PDF formats
- Chart events and interactions

### Export & Output

📄 **Read:** [references/excel-export.md](references/excel-export.md)
- Excel export (.xlsx format) with formatting
- CSV export functionality
- Export from current view or complete data
- Export formatting and styling options
- Programmatic export operations
- Export events and handlers
- Exporting with filters and sorting applied

📄 **Read:** [references/pdf-export.md](references/pdf-export.md)
- PDF export with customization
- Page setup and orientation
- Image quality and compression
- PDF export programmatically
- Export events
- Virtual scrolling with PDF export

### UI Components & Interactions

📄 **Read:** [references/tool-bar.md](references/tool-bar.md)
- Enabling toolbar with built-in items
- Built-in items (New, Load, Save, Grid, Chart, Export, Field List, Calculations)
- Adding custom toolbar items
- Toolbar events and customization
- Conditional toolbar visibility
- Toolbar item configuration
- Toolbar appearance customization

### Formatting & Styling

📄 **Read:** [references/number-formatting.md](references/number-formatting.md)
- Number formatting (currency, percentage, decimal, custom formats)
- Format codes (C0, N2, P2, etc.)
- Applying formatting to value fields
- Creating custom number formats
- Format configuration API
- Programmatic formatting

📄 **Read:** [references/summary-customization.md](references/summary-customization.md)
- Configuring summary calculation display
- Grand totals and sub-totals
- Showing/hiding totals
- Total layout options
- Custom summary text
- Summary settings API

📄 **Read:** [references/row-and-column.md](references/row-and-column.md)
- Row height and column width customization
- Auto-sizing columns
- Resizing rows and columns
- Column spanning
- Frozen rows/columns configuration
- Row/column appearance customization
- Responsive sizing

📄 **Read:** [references/classic-layout.md](references/classic-layout.md)
- Classic layout configuration
- Classic compact layout
- Layout switching
- Field list placement in classic layout
- Toolbar positioning
- Customization options for layouts

### Advanced Formatting

📄 **Read:** [references/tool-tip.md](references/tool-tip.md)
- Enabling custom tooltips
- Tooltip templates
- Tooltip content customization
- Tooltip events
- Position and behavior configuration
- Accessibility in tooltips

📄 **Read:** [references/hyper-link.md](references/hyper-link.md)
- Enabling hyperlinks in cells
- Hyperlink settings
- Custom hyperlink templates
- Hyperlink events
- URL patterns and dynamic links
- Hyperlink styling

### Performance & Optimization

📄 **Read:** [references/virtual-scrolling.md](references/virtual-scrolling.md)
- Virtual scrolling for large datasets
- Enabling virtualization
- Configuration options
- Performance impact and benefits
- Virtual scrolling with exports
- Best practices

📄 **Read:** [references/paging.md](references/paging.md)
- Paging with customizable page size
- Pager UI configuration
- Pager position and visibility
- Row and column paging
- Programmatic page navigation
- Paging events

📄 **Read:** [references/data-compression.md](references/data-compression.md)
- Data compression to reduce payload
- Compression algorithm options
- Configuration settings
- Performance improvements
- When to use compression
- Limitations and considerations

📄 **Read:** [references/defer-update.md](references/defer-update.md)
- Defer update for bulk operations
- Disabling auto-refresh
- Manual update triggering
- Performance optimization for multiple changes
- Use cases and patterns

📄 **Read:** [references/performance-best-practices.md](references/performance-best-practices.md)
- Best practices for large datasets
- Memory optimization techniques
- Network optimization
- Rendering optimization
- Database query optimization
- Common performance pitfalls
- Troubleshooting slow performance

### Advanced Features

📄 **Read:** [references/olap.md](references/olap.md)
- OLAP data source connections
- MDX query execution
- OLAP cube configuration
- Server-side operations
- OLAP-specific features
- Performance considerations

📄 **Read:** [references/server-side-pivot-engine.md](references/server-side-pivot-engine.md)
- Server-side pivot engine
- Benefits of server-side processing
- Configuration setup
- Large-scale dataset handling
- Server endpoints and APIs
- Performance tuning

## Quick Start Example

Here's a minimal example to create a basic Pivot View:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

// Sample data
let pivotData: IDataSet[] = [
    { 'Sold': 31, 'Amount': 52824, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
    { 'Sold': 51, 'Amount': 86904, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
];

// Initialize Pivot View
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData,
        rows: [{ name: 'Country' }, { name: 'Products' }],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        filters: []
    },
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="./src/styles/styles.css" />
</head>
<body>
    <div id="PivotTable"></div>
</body>
</html>
```

For the new theme import pattern, install the `Tailwind 3` theme package and import the component-specific styles:

```bash
npm install @syncfusion/ej2-tailwind3-theme --save
```

```css
/* In src/styles/styles.css */
@import '../../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css';
```

**Available theme packages:**
- `@syncfusion/ej2-tailwind3-theme` (Tailwind 3 - default)
- `@syncfusion/ej2-material-theme` (Material)
- `@syncfusion/ej2-bootstrap5-theme` (Bootstrap 5)
- `@syncfusion/ej2-fluent-theme` (Fluent)
- `@syncfusion/ej2-fabric-theme` (Fabric)
- `@syncfusion/ej2-high-contrast-theme` (High Contrast)

## Common Patterns

### Pattern 1: Pivot Table with Field List

Enable field list for runtime field manipulation:

```typescript
import { PivotView, FieldList } from '@syncfusion/ej2-pivotview';

PivotView.Inject(FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    },
    showFieldList: true,
    height: 350
});
```

### Pattern 2: Pivot Table with Grouping Bar

Enable drag-and-drop grouping bar:

```typescript
import { PivotView, GroupingBar } from '@syncfusion/ej2-pivotview';

PivotView.Inject(GroupingBar);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    },
    showGroupingBar: true,
    height: 350
});
```

### Pattern 3: Pivot Table with Chart

Display both grid and chart:

```typescript
import { PivotView, PivotChart } from '@syncfusion/ej2-pivotview';

PivotView.Inject(PivotChart);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    },
    displayOption: { view: 'Both', primary: 'Table' },
    chartSettings: { chartSeries: { type: 'Column' } },
    height: 350
});
```

### Pattern 4: Pivot Table with Filtering

Apply member filtering programmatically:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }],
        filterSettings: [
            { name: 'Country', type: 'Include', items: ['France', 'Germany'] }
        ]
    },
    height: 350
});
```

### Pattern 5: Pivot Table with Excel Export

Enable toolbar with export options:

```typescript
import { PivotView, Toolbar, ExcelExport, PDFExport } from '@syncfusion/ej2-pivotview';

PivotView.Inject(Toolbar, ExcelExport, PDFExport);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    },
    toolbar: ['Grid', 'Chart', 'Export'],
    allowExcelExport: true,
    allowPdfExport: true,
    height: 350
});
```

## Key Configuration Properties

**dataSourceSettings:** `dataSource`, `rows`, `columns`, `values`, `filters`, `filterSettings`, `sortSettings`, `formatSettings`, `calculatedFieldSettings`

**Display Options:** `height`, `width`, `showFieldList`, `showGroupingBar`, `showToolbar`, `displayOption`

**Feature Modules:** FieldList, GroupingBar, PivotChart, Toolbar, ExcelExport, PDFExport, ConditionalFormatting, NumberFormatting
