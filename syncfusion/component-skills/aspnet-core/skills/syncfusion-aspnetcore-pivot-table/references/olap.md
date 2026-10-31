# OLAP in ASP.NET Core Pivot Table

## ⚠️ SECURITY NOTICE

**All OLAP connections MUST use authenticated, enterprise-managed OLAP servers.** Never connect to untrusted OLAP endpoints.

✅ **Required Security Controls:**
- Configuration-based URLs (IConfiguration, appsettings.json)
- Enterprise OLAP server authentication
- Role-based access control (RBAC)
- HTTPS/SSL encrypted connections
- Trusted SSAS/Mondrian servers only

## Table of Contents
- [Overview](#overview)
- [OLAP Conceptual Model](#olap-conceptual-model)
- [Prerequisites & Setup](#prerequisites--setup)
- [Connecting to OLAP Cube](#connecting-to-olap-cube)
- [OLAP Cube Elements](#olap-cube-elements)
- [Configuring OLAP Fields](#configuring-olap-fields)
- [Formatting OLAP Measures](#formatting-olap-measures)
- [Hierarchical Drilling & Navigation](#hierarchical-drilling--navigation)
- [Grouping Bar with OLAP](#grouping-bar-with-olap)
- [Field List with OLAP](#field-list-with-olap)
- [Filter Axis Usage](#filter-axis-usage)
- [Calculated Fields](#calculated-fields)
- [Common Use Cases](#common-use-cases)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

OLAP (Online Analytical Processing) enables multi-dimensional analysis of large datasets through hierarchical dimensions, pre-aggregated measures, and fast query performance. The Syncfusion Pivot Table supports connections to OLAP data sources (Microsoft Analysis Services, Mondrian) for enterprise data warehouse analysis.

**Why OLAP:** OLAP cubes provide pre-aggregated data, supporting rapid analysis across multiple dimensions. Ideal for financial reporting, sales analysis, and complex business intelligence scenarios.

**When to Use OLAP:**
- Large enterprise datasets (100M+ rows)
- Pre-aggregated data already exists in SSAS/Mondrian
- Multi-dimensional analysis requirements
- Real-time query performance critical
- Complex hierarchical data structures

## OLAP Conceptual Model

OLAP data is organized into multi-dimensional cubes with the following hierarchy:

```
Cube
  ├── Dimensions
  │   ├── Geography
  │   │   ├── Country
  │   │   │   ├── Region
  │   │   │   └── City
  │   │   └── Customer
  │   ├── Time
  │   │   ├── Year
  │   │   ├── Quarter
  │   │   └── Month
  │   └── Product
  │       ├── Category
  │       ├── Subcategory
  │       └── Product
  └── Measures
      ├── Sales Amount
      ├── Quantity Sold
      └── Profit
```

### Key Components

- **Dimensions**: Categorical attributes organizing data hierarchically
- **Hierarchies**: Organized levels within dimensions
- **Levels**: Individual steps in a hierarchy
- **Members**: Individual values at each level
- **Measures**: Numerical values to aggregate
- **Named Sets**: Pre-defined collections of members
- **Calculated Members**: Custom dimension members based on expressions
- **Calculated Measures**: Custom measures based on existing measures

## Prerequisites & Setup

### Required NuGet Packages

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
dotnet add package Syncfusion.EJ2.PivotView.AspNet.Core
```

### Supported OLAP Providers

- **Microsoft Analysis Services (SSAS)**: SQL Server OLAP engine with XMLA protocol
- **Mondrian**: Open-source OLAP server compatible with XMLA
- **Other XMLA-compatible providers**: With proper endpoint configuration

## Connecting to OLAP Cube

### Basic OLAP Connection Pattern (ASP.NET Core Tag Helper)

```html
<ejs-pivotview id="pivotview" height="600" width="100%">
    <e-datasourcesettings url="https://bi.syncfusion.com/olap/msmdpump.dll"
        catalog="Adventure Works DW 2008 SE"
        cube="Adventure Works"
        providerType="SSAS">
        <e-rows>
            <e-field name="[Customer].[Customer Geography]" caption="Customer Geography"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="[Product].[Product Categories]" caption="Product Categories"></e-field>
            <e-field name="[Measures]" caption="Measures"></e-field>
        </e-columns>
        <e-values>
            <e-field name="[Measures].[Customer Count]" caption="Customer Count"></e-field>
            <e-field name="[Measures].[Internet Sales Amount]" caption="Internet Sales Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-displayOption view="Table"></e-displayOption>
</ejs-pivotview>
```

### Connection Parameters & Requirements

| Parameter | Description | Example | Required |
|-----------|-------------|---------|----------|
| **url** | OLAP server endpoint (XMLA protocol) | `https://bi.syncfusion.com/olap/msmdpump.dll` | Yes |
| **catalog** | Database/catalog name on the server | `Adventure Works DW 2008 SE` | Yes |
| **cube** | Cube name within the catalog | `Adventure Works` | Yes |
| **providerType** | OLAP provider (SSAS/Mondrian) | `SSAS` | ✅ CRITICAL |

### Advanced Connection Example with All Axes

```html
<ejs-pivotview id="pivotview" height="600" width="100%" showFieldList="true" showGroupingBar="true">
    <e-datasourcesettings url="https://bi.syncfusion.com/olap/msmdpump.dll"
        catalog="Adventure Works DW 2008 SE"
        cube="Adventure Works"
        providerType="SSAS"
        enableSorting="true">
        <e-rows>
            <e-field name="[Customer].[Customer Geography]" caption="Customer Geography"></e-field>
            <e-field name="[Product].[Product]" caption="Product"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="[Product].[Product Categories]" caption="Product Categories"></e-field>
            <e-field name="[Measures]" caption="Measures"></e-field>
        </e-columns>
        <e-values>
            <e-field name="[Measures].[Customer Count]" caption="Customer Count"></e-field>
            <e-field name="[Measures].[Internet Sales Amount]" caption="Internet Sales Amount"></e-field>
            <e-field name="[Measures].[Profit]" caption="Profit"></e-field>
        </e-values>
        <e-filters>
            <e-field name="[Date].[Fiscal]" caption="Date Fiscal"></e-field>
        </e-filters>
    </e-datasourcesettings>
</ejs-pivotview>
```

## OLAP Cube Elements

### Hierarchies

Hierarchies organize dimension members in levels:

```html
<e-rows>
    <e-field name="[Geography].[Geography]" caption="Geography Hierarchy"></e-field>
    <e-field name="[Date].[Fiscal]" caption="Fiscal Year Hierarchy"></e-field>
</e-rows>
```

### Named Sets

Pre-defined collections of members:

```html
<e-rows>
    <e-field name="[Product].[Top 10 Products]" caption="Top 10 Products"></e-field>
</e-rows>
```

### Calculated Members & Measures

Custom members and measures based on expressions:

```html
<e-values>
    <e-field name="[Measures].[Profit Margin]" caption="Profit Margin"></e-field>
    <e-field name="[Measures].[Sales Amount]" caption="Sales Amount"></e-field>
</e-values>
```

### Measures Container

The `[Measures]` field must appear in columns to display multiple measures:

```html
<e-columns>
    <e-field name="[Product].[Category]" caption="Product Category"></e-field>
    <e-field name="[Measures]" caption="Measures"></e-field>
</e-columns>

<e-values>
    <e-field name="[Measures].[Internet Sales Amount]" caption="Sales Amount"></e-field>
    <e-field name="[Measures].[Customer Count]" caption="Customer Count"></e-field>
</e-values>
```

## Configuring OLAP Fields

### Name Property - Critical for OLAP Fields

The `name` attribute MUST contain the unique name from the OLAP cube using bracket notation:

```html
<!-- ✅ CORRECT: Bracket notation with dimension/hierarchy names -->
<e-field name="[Customer].[Customer Geography]" caption="Customer Geography"></e-field>

<!-- ❌ INCORRECT: Literal values without bracket notation -->
<!-- <e-field name="Customer Geography" caption="Customer Geography"></e-field> -->
```

### Field Binding Best Practices

| Element | Format | Example |
|---------|--------|---------|
| Dimension | `[Dimension]` | `[Customer]` |
| Hierarchy | `[Dimension].[Hierarchy]` | `[Customer].[Customer Geography]` |
| Measure | `[Measures].[MeasureName]` | `[Measures].[Internet Sales Amount]` |
| Measures Container | `[Measures]` | `[Measures]` |
| Named Set | `[Dimension].[NamedSetName]` | `[Product].[Top 10 Products]` |

### Placing Fields on All Axes

**Complete Configuration Pattern:**

```html
<ejs-pivotview id="pivotview" height="600" width="100%">
    <e-datasourcesettings url="https://bi.syncfusion.com/olap/msmdpump.dll"
        catalog="Adventure Works DW 2008 SE"
        cube="Adventure Works"
        providerType="SSAS">
        
        <e-rows>
            <e-field name="[Customer].[Customer Geography]" caption="Customer Geography"></e-field>
            <e-field name="[Product].[Product]" caption="Product"></e-field>
        </e-rows>
        
        <e-columns>
            <e-field name="[Date].[Fiscal]" caption="Date Fiscal"></e-field>
            <e-field name="[Measures]" caption="Measures"></e-field>
        </e-columns>
        
        <e-values>
            <e-field name="[Measures].[Customer Count]" caption="Customer Count"></e-field>
            <e-field name="[Measures].[Internet Sales Amount]" caption="Internet Sales Amount"></e-field>
        </e-values>
        
        <e-filters>
            <e-field name="[Organization].[Department]" caption="Department"></e-field>
        </e-filters>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Formatting OLAP Measures

### Apply Display Formatting to Measures

```html
<ejs-pivotview id="pivotview" height="600" width="100%">
    <e-datasourcesettings url="https://bi.syncfusion.com/olap/msmdpump.dll"
        catalog="Adventure Works DW 2008 SE"
        cube="Adventure Works"
        providerType="SSAS">
        
        <e-rows>
            <e-field name="[Customer].[Customer Geography]" caption="Customer Geography"></e-field>
        </e-rows>
        
        <e-columns>
            <e-field name="[Product].[Product Categories]" caption="Product Categories"></e-field>
            <e-field name="[Measures]" caption="Measures"></e-field>
        </e-columns>
        
        <e-values>
            <e-field name="[Measures].[Internet Sales Amount]" caption="Internet Sales Amount"></e-field>
            <e-field name="[Measures].[Customer Count]" caption="Customer Count"></e-field>
        </e-values>
        
        <e-formatsettings>
            <e-field name="[Measures].[Internet Sales Amount]" format="C0"></e-field>
            <e-field name="[Measures].[Customer Count]" format="0,0"></e-field>
        </e-formatsettings>
    </e-datasourcesettings>
</ejs-pivotview>
```

### Common Format Strings for OLAP Measures

| Format | Output | Use Case |
|--------|--------|----------|
| `C` or `C0` | $1,234 | Currency (whole numbers) |
| `C2` | $1,234.56 | Currency (2 decimal places) |
| `N` or `N0` | 1,234 | Number (whole) |
| `N2` | 1,234.57 | Number (2 decimals) |
| `0,0` | 1,234 | Number with thousand separator |
| `P` or `P0` | 50% | Percentage |
| `P2` | 50.12% | Percentage (2 decimals) |
| `E` | 1.23E+03 | Scientific notation |

## Hierarchical Drilling & Navigation

OLAP hierarchies support drill-down and drill-up operations for navigating hierarchical data:

```html
<ejs-pivotview id="pivotview" height="600" width="100%">
    <e-datasourcesettings url="https://bi.syncfusion.com/olap/msmdpump.dll"
        catalog="Adventure Works DW 2008 SE"
        cube="Adventure Works"
        providerType="SSAS">
        
        <e-rows>
            <e-field name="[Geography].[Geography]" caption="Geography"></e-field>
        </e-rows>
        
        <e-columns>
            <e-field name="[Date].[Fiscal]" caption="Fiscal Year"></e-field>
            <e-field name="[Measures]" caption="Measures"></e-field>
        </e-columns>
        
        <e-values>
            <e-field name="[Measures].[Internet Sales Amount]" caption="Sales Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Drill Operations:**
- **Expand (+)**: Drill down one level in hierarchy
- **Collapse (−)**: Roll up to parent level
- **Navigation**: Year → Quarter → Month detail hierarchy

## Grouping Bar with OLAP

Enable the grouping bar for field rearrangement and real-time pivoting:

```html
<ejs-pivotview id="pivotview" height="600" width="100%" showGroupingBar="true">
    <e-datasourcesettings url="https://bi.syncfusion.com/olap/msmdpump.dll"
        catalog="Adventure Works DW 2008 SE"
        cube="Adventure Works"
        providerType="SSAS">
        
        <e-rows>
            <e-field name="[Customer].[Customer Geography]" caption="Customer Geography"></e-field>
        </e-rows>
        
        <e-columns>
            <e-field name="[Product].[Product Categories]" caption="Product Categories"></e-field>
            <e-field name="[Measures]" caption="Measures"></e-field>
        </e-columns>
        
        <e-values>
            <e-field name="[Measures].[Customer Count]" caption="Customer Count"></e-field>
            <e-field name="[Measures].[Internet Sales Amount]" caption="Internet Sales Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Grouping Bar Features:**
- Drag fields between rows, columns, values, and filters
- Remove fields by dragging out
- Reorder fields for different analysis perspectives
- Real-time pivot updates

## Field List with OLAP

Enable dynamic field management with the field list panel:

```html
<ejs-pivotview id="pivotview" height="600" width="100%" showFieldList="true">
    <e-datasourcesettings url="https://bi.syncfusion.com/olap/msmdpump.dll"
        catalog="Adventure Works DW 2008 SE"
        cube="Adventure Works"
        providerType="SSAS">
        
        <e-rows>
            <e-field name="[Customer].[Customer Geography]" caption="Customer Geography"></e-field>
        </e-rows>
        
        <e-columns>
            <e-field name="[Product].[Product Categories]" caption="Product Categories"></e-field>
            <e-field name="[Measures]" caption="Measures"></e-field>
        </e-columns>
        
        <e-values>
            <e-field name="[Measures].[Customer Count]" caption="Customer Count"></e-field>
            <e-field name="[Measures].[Internet Sales Amount]" caption="Internet Sales Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Filter Axis Usage

Master filters to refine displayed data by placing dimensions in the filters axis:

```html
<ejs-pivotview id="pivotview" height="600" width="100%">
    <e-datasourcesettings url="https://bi.syncfusion.com/olap/msmdpump.dll"
        catalog="Adventure Works DW 2008 SE"
        cube="Adventure Works"
        providerType="SSAS">
        
        <e-rows>
            <e-field name="[Customer].[Customer Geography]" caption="Customer Geography"></e-field>
        </e-rows>
        
        <e-columns>
            <e-field name="[Product].[Product Categories]" caption="Product Categories"></e-field>
            <e-field name="[Measures]" caption="Measures"></e-field>
        </e-columns>
        
        <e-values>
            <e-field name="[Measures].[Internet Sales Amount]" caption="Internet Sales Amount"></e-field>
        </e-values>
        
        <e-filters>
            <e-field name="[Date].[Fiscal]" caption="Date Fiscal"></e-field>
            <e-field name="[Organization].[Department]" caption="Department"></e-field>
        </e-filters>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Calculated Fields

Create custom calculated fields for analysis based on existing measures:

```html
<ejs-pivotview id="pivotview" height="600" width="100%" allowCalculatedField="true" showFieldList="true">
    <e-datasourcesettings url="https://bi.syncfusion.com/olap/msmdpump.dll"
        catalog="Adventure Works DW 2008 SE"
        cube="Adventure Works"
        providerType="SSAS">
        
        <e-rows>
            <e-field name="[Customer].[Customer Geography]" caption="Customer Geography"></e-field>
        </e-rows>
        
        <e-columns>
            <e-field name="[Product].[Product Categories]" caption="Product Categories"></e-field>
            <e-field name="[Measures]" caption="Measures"></e-field>
        </e-columns>
        
        <e-values>
            <e-field name="[Measures].[Internet Sales Amount]" caption="Internet Sales Amount"></e-field>
            <e-field name="[Measures].[Profit]" caption="Profit"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

### Important Notes for Calculated Fields

- **Calculation on Server**: OLAP calculated fields use MDX expressions on the analysis server
- **Real-time Updates**: Changes to source measures automatically update calculated fields
- **Performance**: Server-side calculation is efficient even with large datasets
- **Formula Syntax**: Supported MDX operators and functions (reference Microsoft SSAS documentation)

## Common Use Cases

### Executive Sales Dashboard

```html
<ejs-pivotview id="pivotview" height="600" width="100%" showFieldList="true" showGroupingBar="true">
    <e-datasourcesettings url="https://bi.syncfusion.com/olap/msmdpump.dll"
        catalog="Adventure Works DW 2008 SE"
        cube="Adventure Works"
        providerType="SSAS">
        
        <e-rows>
            <e-field name="[Customer].[Customer Geography]" caption="Geography"></e-field>
        </e-rows>
        
        <e-columns>
            <e-field name="[Date].[Fiscal]" caption="Year"></e-field>
            <e-field name="[Measures]" caption="Measures"></e-field>
        </e-columns>
        
        <e-values>
            <e-field name="[Measures].[Internet Sales Amount]" caption="Sales Amount"></e-field>
            <e-field name="[Measures].[Profit]" caption="Profit"></e-field>
        </e-values>
        
        <e-filters>
            <e-field name="[Product].[Product Categories]" caption="Product Category"></e-field>
        </e-filters>
    </e-datasourcesettings>
</ejs-pivotview>
```

### Product Performance Analysis

```html
<ejs-pivotview id="pivotview" height="600" width="100%" showFieldList="true">
    <e-datasourcesettings url="https://bi.syncfusion.com/olap/msmdpump.dll"
        catalog="Adventure Works DW 2008 SE"
        cube="Adventure Works"
        providerType="SSAS">
        
        <e-rows>
            <e-field name="[Product].[Product Categories]" caption="Category"></e-field>
            <e-field name="[Product].[Product]" caption="Product"></e-field>
        </e-rows>
        
        <e-columns>
            <e-field name="[Date].[Calendar].[Year]" caption="Year"></e-field>
            <e-field name="[Measures]" caption="Measures"></e-field>
        </e-columns>
        
        <e-values>
            <e-field name="[Measures].[Internet Sales Amount]" caption="Revenue"></e-field>
            <e-field name="[Measures].[Profit]" caption="Profit"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Best Practices

✓ **Use Bracket Notation**: Always use `[Dimension].[Hierarchy]` format for field names
✓ **Include [Measures]**: Always place `[Measures]` in columns to display multiple measures
✓ **Optimize Performance**: Use filters on large dimensions to reduce data transfer
✓ **Provide Captions**: Use `caption` attribute for user-friendly field names
✓ **Server Caching**: OLAP servers cache queries; leverage this for repeated operations
✓ **Hierarchy Levels**: Use appropriate hierarchy levels to balance detail vs. performance
✓ **Member Sets**: Use named sets when analyzing specific member combinations

## Troubleshooting

### Common Issues

**Issue: "Invalid field name [Dimension].[Hierarchy]"**
- Verify field names match exactly what's in the OLAP cube
- Use SSAS/Mondrian management tools to discover cube structure
- Check bracket notation is properly formatted

**Issue: Slow Performance**
- Place slow dimensions in filters instead of rows/columns
- Use more granular hierarchy levels
- Enable server-side filtering with large member sets
- Consider paging for large result sets

**Issue: Measures Not Appearing**
- Ensure `[Measures]` is placed in columns
- Verify measure names use `[Measures].[MeasureName]` syntax
- Check that at least one measure is in values axis

## Important Notes

- OLAP **requires specialized server** (not standard SQL)
- **Expensive upfront** (data warehouse costs)
- **Excellent ROI** for large organizations
- **Pre-aggregated data** is read-only
- **MDX syntax** different from SQL
