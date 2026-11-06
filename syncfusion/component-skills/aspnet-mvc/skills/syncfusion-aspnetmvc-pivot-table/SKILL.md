---
name: syncfusion-aspnetmvc-pivot-table
description: Use this skill when users ask how to add or configure Syncfusion PivotView/pivot tables in ASP.NET MVC apps. Trigger for MVC integration, data binding, OLAP/cube setup, aggregation, drill-down/drill-through, grouping, filtering, conditional formatting, exporting, or pivot charts. MVC-only, not Core/Blazor/JS.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Grids"
---

# Implementing Pivot Table (ASP.NET MVC)

Syncfusion ASP.NET MVC Pivot Table (PivotView) enables multi-dimensional data visualization and analysis with interactive row/column/value axes, real-time aggregation, flexible filtering, and comprehensive export options.

> ⚠️ **Important:** Always verify API class names, properties, and method signatures by consulting the **reference files in this skill** (`references/*.md`). These are maintained with verified, working examples. Do not assume API details from other sources.

## ⚠️ Security Warning: Data Source Validation

**CRITICAL SECURITY NOTICE:** When implementing pivot tables, always use trusted data sources. **Never** fetch or bind data from untrusted or user-provided URLs without proper validation and sanitization.

### Security Best Practices:

1. **Use Local Data**: Prefer local, in-memory data sources for maximum security
2. **Validate Remote Sources**: Only connect to authenticated and authorized API endpoints under your control
3. **Sanitize User Input**: Never allow users to specify arbitrary URLs or data sources
4. **Use Configuration**: Store connection strings and API URLs in secure configuration (appsettings.json with IConfiguration)
5. **Implement Authentication**: Require authentication for all database and API connections
6. **Apply Authorization**: Use [Authorize] attributes and role-based access control

### Security Risks:

- **Indirect Prompt Injection**: Untrusted third-party data can contain malicious content that manipulates AI agent behavior
- **Data Exposure**: Unvalidated remote connections may expose sensitive information
- **SQL Injection**: Unsanitized database queries can lead to data breaches
- **XSS Attacks**: Unescaped data rendered in the UI can execute malicious scripts

✅ **Safe:** Local data, authenticated APIs under your control, parameterized SQL queries
❌ **Unsafe:** User-provided URLs, unauthenticated endpoints, hardcoded connection strings

## When to Use This Skill

Use this skill when building an ASP.NET MVC application and the user needs:

- **Pivot reporting** with row, column, value, and filter axes
- **Data aggregation** with 20+ summary types (Sum, Avg, Count, Percentage, RunningTotals, etc.)
- **Interactive report building** via field list and grouping bar UI
- **Data source binding** (local JSON/CSV, SQL Server, OLAP, relational databases)
- **Filtering** (member, label, value filtering with search/sort)
- **Sorting** (field sorting, custom order, value sorting)
- **Advanced features** (drill-down/up, drill-through, calculated fields, pivot chart)
- **Formatting** (conditional formatting, number formatting, custom styling)
- **Export** (Excel, PDF, CSV, print)
- **Performance optimization** (virtual scrolling, paging, data compression)

**Trigger keywords:** pivot table, pivotview, PivotView, field list, grouping bar, OLAP, pivot aggregation, pivot export, pivot drill-down, pivot report, ASP.NET MVC pivot

## Quick Start Example

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview")
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => rows.Name("Country").Add())
        .Columns(columns => columns.Name("Year").Add())
        .Values(values => values.Name("Sales").Caption("Total Sales").Add())
        .Filters(filters => filters.Name("Region").Add()))
    .ShowFieldList(true)
    .ShowGroupingBar(true)
    .Width("100%")
    .Height("450")
    .Render();
```

## Navigation Guide

### Getting started and setup
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and NuGet package setup
- Project configuration and namespace registration
- Basic PivotView initialization
- Themes and styling setup

### Pivoting and data binding
📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Local/remote data binding patterns
- CSV and JSON data sources
- DataManager configuration
- Field mapping and setup

### Data source connections
📄 **Read:** [references/mysql.md](references/mysql.md)
- MySQL database setup, connection configuration, Web API implementation
- DataAdapter pattern, JSON serialization, connection pooling

📄 **Read:** [references/mssql.md](references/mssql.md)
- SQL Server setup, authentication methods, Azure SQL Database integration
- T-SQL queries, stored procedures, performance optimization

📄 **Read:** [references/postgresql.md](references/postgresql.md)
- PostgreSQL connection strings, SSL/TLS configuration, authentication methods
- Query patterns, connection pooling, JSONB data support

📄 **Read:** [references/oracle.md](references/oracle.md)
- Oracle database setup, TNS configuration, authentication
- SQL and PL/SQL queries, performance tuning

📄 **Read:** [references/mongodb.md](references/mongodb.md)
- MongoDB document database, BSON document handling, aggregation pipeline
- POCO model mapping, bulk operations

📄 **Read:** [references/elasticsearch.md](references/elasticsearch.md)
- Elasticsearch search engine, NEST client library, aggregations
- Query DSL patterns, index management

📄 **Read:** [references/snowflake.md](references/snowflake.md)
- Snowflake cloud warehouse, virtual warehouse configuration, warehouse sizing
- Cost optimization, semi-structured data, role-based access

### Advanced data sources
📄 **Read:** [references/olap.md](references/olap.md)
- OLAP cube setup and hierarchical data binding
- Dimension and measure configuration
- Pivot engine integration

📄 **Read:** [references/server-side-pivot-engine.md](references/server-side-pivot-engine.md)
- Server-side processing and aggregation
- Large dataset optimization for backend
- Batch processing workflows

### Data shaping and analysis
📄 **Read:** [references/aggregation.md](references/aggregation.md)
- Summary types: Sum, Avg, Count, Min, Max, Product, Median, StDev, Variance
- Percentage calculations and running totals (including PercentageOfRunningTotals)
- Custom aggregation at runtime

📄 **Read:** [references/calculated-field.md](references/calculated-field.md)
- Define and use calculated fields in formulas
- Runtime field creation and updates
- Performance considerations

📄 **Read:** [references/grouping.md](references/grouping.md)
- Field-level grouping by date, value ranges
- Axis grouping for dimension hierarchies

📄 **Read:** [references/filtering.md](references/filtering.md)
- Member filtering with include/exclude
- Append current selection to existing filters (incremental multi-member selection)
- Label filtering (string, date, numeric)
- Value filtering on aggregated data (Equals, Between, GreaterThan, LessThan, etc.)
- Top and Bottom operators for value filtering (client-side ranking)

📄 **Read:** [references/sorting.md](references/sorting.md)
- Member field sorting (ascending/descending)
- Custom member order configuration
- Value sorting on computed cells

📄 **Read:** [references/drill-through.md](references/drill-through.md)
- Access underlying data behind pivot cells
- Drill-through event handling

### Visualization and layout
📄 **Read:** [references/pivot-chart.md](references/pivot-chart.md)
- Bind pivot chart to pivot table data
- Chart type selection and configuration

📄 **Read:** [references/classic-layout.md](references/classic-layout.md)
- Classic (Compact) layout rendering
- Compact vs Outline vs Tree layout options

📄 **Read:** [references/drill-down.md](references/drill-down.md)
- Drill-down into dimension members
- Drill-up navigation between hierarchy levels

📄 **Read:** [references/row-and-column.md](references/row-and-column.md)
- Row and column axis configuration
- Value field positioning

### Formatting and display
📄 **Read:** [references/number-formatting.md](references/number-formatting.md)
- Format value cells with currency, decimals, percentage
- Custom number format providers

📄 **Read:** [references/conditional-formatting.md](references/conditional-formatting.md)
- Apply style rules based on values or conditions
- Color scales and data bars

📄 **Read:** [references/summary-customization.md](references/summary-customization.md)
- Show/hide grand totals and subtotals
- Custom total labels and captions

📄 **Read:** [references/hyper-link.md](references/hyper-link.md)
- Hyperlink columns for navigation
- Custom URL generation and click handling

### User interface controls
📄 **Read:** [references/grouping-bar.md](references/grouping-bar.md)
- Enable/disable grouping bar
- Drag-drop field configuration
- Grouping bar event handling

📄 **Read:** [references/field-list.md](references/field-list.md)
- Field list popup and fixed modes
- Field search and sorting
- Field grouping by folders

📄 **Read:** [references/defer-update.md](references/defer-update.md)
- Batch changes without intermediate updates
- Improve performance with large field changes

📄 **Read:** [references/tool-bar.md](references/tool-bar.md)
- Toolbar button configuration
- Built-in and custom commands
- Export and action buttons

📄 **Read:** [references/tool-tip.md](references/tool-tip.md)
- Cell and header tooltips
- Custom tooltip content

### Editing and data manipulation
📄 **Read:** [references/editing.md](references/editing.md)
- In-place cell editing workflows
- Update underlying data from pivot
- Cell edit event handling

### Performance and optimization
📄 **Read:** [references/virtual-scrolling.md](references/virtual-scrolling.md)
- Virtual scrolling for large pivot tables
- Memory-efficient rendering

📄 **Read:** [references/paging.md](references/paging.md)
- Pagination configuration
- Page size and navigation

📄 **Read:** [references/data-compression.md](references/data-compression.md)
- Payload compression for data transfer
- Bandwidth optimization

📄 **Read:** [references/performance-best-practices.md](references/performance-best-practices.md)
- Tuning guidelines for large datasets
- Server-side vs client-side rendering decisions
- Common performance bottlenecks and fixes

### State and persistence
📄 **Read:** [references/state-persistence.md](references/state-persistence.md)
- Save pivot report state
- Load saved configurations
- State storage options

### Export and printing
📄 **Read:** [references/print.md](references/print.md)
- Print pivot table with custom settings
- Print preview and page layout

📄 **Read:** [references/excel-export.md](references/excel-export.md)
- Export to Excel workbook
- Formatting and multi-sheet export

📄 **Read:** [references/pdf-export.md](references/pdf-export.md)
- Export to PDF document
- Page orientation and sizing

## Common Patterns

**Pattern 1: Complete pivot with all UI:**
- Enable `ShowFieldList`, `ShowGroupingBar`, and toolbar buttons
- User can build and refine reports interactively

**Pattern 2: Server-side aggregation for large datasets:**
- Use server-side pivot engine with `Syncfusion.EJ2.PivotView.RenderMode.Server` to process on backend
- Enable paging and virtual scrolling (`EnableVirtualization`) for responsive UX
- Requires `Syncfusion.Pivot.Engine` package

**Pattern 3: Read-only analytical view:**
- Disable field list and grouping bar
- Set fixed row/column/value configuration
- Use drill-down only for exploration

## Key Properties Overview

### PivotView (Root Class)
- `DataSourceSettings` - Data source and field configuration  
- `ShowFieldList` - Toggle field list UI (popup mode)
- `ShowGroupingBar` - Toggle grouping bar UI
- `ShowToolbar` - Display toolbar buttons
- `AllowExcelExport` - Enable Excel export capability
- `AllowPdfExport` - Enable PDF export capability
- `EnableValueSorting` - Allow value cell sorting
- `EnableVirtualization` - Enable virtual scrolling for large datasets
- `Height`, `Width` - Component dimensions

### DataSourceSettings (Configuration)
- `Rows`, `Columns`, `Values`, `Filters` - Axis field arrays
- `AllowMemberFilter` - Enable member filtering UI
- `AllowLabelFilter` - Enable label filtering UI
- `AllowValueFilter` - Enable value filtering UI
- `EnableSorting` - Enable member sorting (default: true)
- `FormatSettings` - Number formatting for value fields

## Related Skills

- `implementing-syncfusion-aspnetmvc-components` - Parent library skill
