# OLAP Data Source Configuration in Pivot View

## ⚠️ SECURITY NOTICE

**All OLAP connections MUST use authenticated, enterprise-managed OLAP servers.** Never connect to untrusted OLAP endpoints.

✅ **Required Security Controls:**
- Configuration-based URLs (environment variables or config files)
- Enterprise OLAP server authentication
- Role-based access control (RBAC)
- HTTPS/SSL encrypted connections
- Trusted SSAS servers only

## Overview

OLAP (Online Analytical Processing) enables multidimensional data analysis using cube structures from SSAS (SQL Server Analysis Services) or compatible providers. The Pivot View connects to OLAP cubes to organize hierarchies, members, and measures for advanced business intelligence operations.

## When to Use

Use OLAP when you need to:
- Connect to SQL Server Analysis Services (SSAS) cubes
- Analyze multidimensional business data
- Work with complex hierarchies and named sets
- Perform enterprise business intelligence queries
- Access predefined measures and calculated members
- Query time-based dimensions and hierarchies

## OLAP Architecture

**Key Components:**
- **Provider Type:** SSAS (SQL Server Analysis Services)
- **Catalog:** Database containing cubes
- **Cube:** Multidimensional data structure
- **Dimensions:** Data hierarchies (Products, Regions, Time)
- **Measures:** Numeric values to analyze (Revenue, Units Sold)
- **Members:** Individual items within dimensions
- **Hierarchies:** Organized levels (Year > Quarter > Month)

## Basic OLAP Setup

> **⚠️ SECURITY:** Use configuration-based URLs with authentication. See security notice at top of document.

**Step 1 — Create configuration file (config.ts):**
```typescript
export const appConfig = {
    olapUrl: process.env.OLAP_SERVER_URL || 'https://your-olap-server.com/olap/msmdpump.dll'
};
```

**Step 2 — Connect to SSAS cube with secure configuration:**

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';
import { appConfig } from './config';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        // OLAP connection settings
        catalog: 'Adventure Works DW 2008 SE',    // Database name
        cube: 'Adventure Works',                  // Cube name
        providerType: 'SSAS',                     // Provider type
        url: appConfig.olapUrl,                   // Configuration-based URL
        localeIdentifier: 1033,                   // Language/locale
        
        // Data organization
        rows: [
            { name: '[Customer].[Customer Geography]', caption: 'Customer Geography' }
        ],
        columns: [
            { name: '[Product].[Product Categories]', caption: 'Product Categories' },
            { name: '[Measures]', caption: 'Measures' }
        ],
        values: [
            { name: '[Measures].[Customer Count]', caption: 'Customer Count' },
            { name: '[Measures].[Internet Sales Amount]', caption: 'Internet Sales Amount' }
        ],
        filters: [],
        
        enableSorting: true
    },
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

## OLAP Cube Elements

### Dimensions and Hierarchies

Organize data by dimensions with hierarchies:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        catalog: 'Adventure Works DW 2008 SE',
        cube: 'Adventure Works',
        providerType: 'SSAS',
        url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
        localeIdentifier: 1033,
        
        rows: [
            // Time dimension with hierarchy
            { name: '[Date].[Calendar]', caption: 'Calendar Date' }
        ],
        columns: [
            // Geography dimension
            { name: '[Geography].[Country]', caption: 'Country' },
            { name: '[Product].[Line]', caption: 'Product Line' }
        ],
        values: [
            { name: '[Measures].[Sales Amount]', caption: 'Sales Amount' },
            { name: '[Measures].[Unit Count]', caption: 'Unit Count' }
        ]
    },
    height: 350
});
```

### Named Sets and Calculated Members

Use predefined calculations from the cube:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        catalog: 'Adventure Works DW 2008 SE',
        cube: 'Adventure Works',
        providerType: 'SSAS',
        url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
        localeIdentifier: 1033,
        
        rows: [
            // Named set from cube
            { name: '[Top Products]', caption: 'Top Products' }
        ],
        columns: [
            { name: '[Measures]', caption: 'Measures' }
        ],
        values: [
            // Calculated member
            { name: '[Measures].[Profit Margin %]', caption: 'Profit Margin %' }
        ]
    },
    height: 350
});
```

## Advanced OLAP Configuration

### Multi-Level Hierarchies

Organize rows or columns with multiple hierarchy levels:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        catalog: 'Adventure Works DW 2008 SE',
        cube: 'Adventure Works',
        providerType: 'SSAS',
        url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
        localeIdentifier: 1033,
        
        // Multi-level row hierarchy
        rows: [
            { name: '[Geography].[Country]', caption: 'Country' },
            { name: '[Geography].[State]', caption: 'State' },
            { name: '[Geography].[City]', caption: 'City' }
        ],
        
        // Multi-level column hierarchy
        columns: [
            { name: '[Date].[Year]', caption: 'Year' },
            { name: '[Date].[Quarter]', caption: 'Quarter' },
            { name: '[Date].[Month]', caption: 'Month' },
            { name: '[Measures]', caption: 'Measures' }
        ],
        
        values: [
            { name: '[Measures].[Internet Sales Amount]', caption: 'Sales Amount' },
            { name: '[Measures].[Internet Order Quantity]', caption: 'Order Quantity' }
        ]
    },
    height: 350
});
```

### Filtering OLAP Data

Apply member and value filters:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        catalog: 'Adventure Works DW 2008 SE',
        cube: 'Adventure Works',
        providerType: 'SSAS',
        url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
        localeIdentifier: 1033,
        
        rows: [{ name: '[Geography].[Country]', caption: 'Country' }],
        columns: [{ name: '[Date].[Year]', caption: 'Year' }],
        values: [{ name: '[Measures].[Sales Amount]', caption: 'Sales Amount' }],
        
        // Filter axis (shown above grid)
        filters: [
            { name: '[Product].[Category]', caption: 'Product Category' }
        ],
        
        // Member filtering
        filterSettings: [
            {
                name: '[Geography].[Country]',
                type: 'Include',
                items: ['Canada', 'United States', 'Mexico']  // Show only these
            },
            {
                name: '[Date].[Year]',
                type: 'Exclude',
                items: ['Year 2000']  // Exclude this year
            }
        ]
    },
    height: 350
});
```

## Number Formatting for OLAP

Format measure values with currency, percentage, or custom formats:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        catalog: 'Adventure Works DW 2008 SE',
        cube: 'Adventure Works',
        providerType: 'SSAS',
        url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
        localeIdentifier: 1033,
        
        rows: [{ name: '[Geography].[Country]', caption: 'Country' }],
        columns: [{ name: '[Date].[Year]', caption: 'Year' }],
        values: [
            { name: '[Measures].[Sales Amount]', caption: 'Sales Amount' },
            { name: '[Measures].[Profit]', caption: 'Profit' },
            { name: '[Measures].[Profit Margin %]', caption: 'Profit Margin %' }
        ],
        
        // Format settings
        formatSettings: [
            { name: '[Measures].[Sales Amount]', format: 'C0' },      // Currency
            { name: '[Measures].[Profit]', format: 'C2' },            // Currency 2 decimals
            { name: '[Measures].[Profit Margin %]', format: 'P2' }    // Percentage 2 decimals
        ]
    },
    height: 350
});
```

## Sorting OLAP Data

Configure sorting for hierarchies and members:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        catalog: 'Adventure Works DW 2008 SE',
        cube: 'Adventure Works',
        providerType: 'SSAS',
        url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
        localeIdentifier: 1033,
        
        rows: [{ name: '[Geography].[Country]', caption: 'Country' }],
        columns: [{ name: '[Date].[Year]', caption: 'Year' }],
        values: [{ name: '[Measures].[Sales Amount]', caption: 'Sales Amount' }],
        
        // Sort configuration
        sortSettings: [
            {
                name: '[Geography].[Country]',
                order: 'Ascending'  // or 'Descending'
            },
            {
                name: '[Measures].[Sales Amount]',
                order: 'Descending'  // Sort values descending
            }
        ],
        
        enableSorting: true
    },
    height: 350
});
```

## Expanding Members and Drilled State

Control initial hierarchy expansion:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        catalog: 'Adventure Works DW 2008 SE',
        cube: 'Adventure Works',
        providerType: 'SSAS',
        url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
        localeIdentifier: 1033,
        
        rows: [{ name: '[Geography].[Country]', caption: 'Country' }],
        columns: [{ name: '[Date].[Year]', caption: 'Year' }],
        values: [{ name: '[Measures].[Sales Amount]', caption: 'Sales Amount' }],
        
        // Expand all by default
        expandAll: true,
        
        // Specify drilled members (pre-expanded)
        drilledMembers: [
            { name: '[Geography]', items: ['United States', 'Canada'] }
        ]
    },
    height: 350
});
```

## Common OLAP Patterns

### Pattern 1: Simple SSAS Connection

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        catalog: 'Adventure Works DW 2008 SE',
        cube: 'Adventure Works',
        providerType: 'SSAS',
        url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
        localeIdentifier: 1033,
        rows: [{ name: '[Customer].[Geography]' }],
        columns: [{ name: '[Date].[Calendar]' }],
        values: [{ name: '[Measures].[Sales]' }]
    },
    height: 350
});
```

### Pattern 2: Filtered Hierarchy Analysis

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        catalog: 'Adventure Works DW 2008 SE',
        cube: 'Adventure Works',
        providerType: 'SSAS',
        url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
        localeIdentifier: 1033,
        rows: [{ name: '[Product].[Category]' }],
        columns: [{ name: '[Date].[Year]' }],
        values: [{ name: '[Measures].[Internet Sales Amount]' }],
        filters: [{ name: '[Geography].[Country]' }],
        expandAll: true
    },
    height: 350
});
```

### Pattern 3: Multi-Measure Analysis

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        catalog: 'Adventure Works DW 2008 SE',
        cube: 'Adventure Works',
        providerType: 'SSAS',
        url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
        localeIdentifier: 1033,
        rows: [{ name: '[Product].[Line]' }],
        columns: [{ name: '[Date].[Year]' }, { name: '[Measures]' }],
        values: [
            { name: '[Measures].[Sales Amount]', format: 'C0' },
            { name: '[Measures].[Order Quantity]' },
            { name: '[Measures].[Gross Profit]', format: 'C0' }
        ]
    },
    height: 350
});
```

## Debugging OLAP Connections

### Verify Connection

```typescript
// Test OLAP connectivity
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        catalog: 'Adventure Works DW 2008 SE',
        cube: 'Adventure Works',
        providerType: 'SSAS',
        url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
        localeIdentifier: 1033
    },
    
    enginePopulated: () => {
        console.log('OLAP engine populated - connection successful');
    },
    
    onBeforeServiceInvoke: (args) => {
        console.log('Service call:', args.request);
    },
    
    height: 350
});
```

## API Reference

### OLAP DataSourceSettings

| Property | Type | Example | Description |
|----------|------|---------|-------------|
| `providerType` | string | 'SSAS' | Data provider type |
| `url` | string | 'https://bi.syncfusion.com/olap/msmdpump.dll' | SSAS endpoint URL |
| `catalog` | string | 'Adventure Works DW 2008 SE' | Database/catalog name |
| `cube` | string | 'Adventure Works' | Cube name |
| `localeIdentifier` | number | 1033 | Language/region ID |
| `rows` | Array | [{ name: '[...]' }] | Row hierarchies |
| `columns` | Array | [{ name: '[...]' }] | Column hierarchies |
| `values` | Array | [{ name: '[Measures].[...]' }] | Measures |
| `filters` | Array | [{ name: '[...]' }] | Filter axis |

## Troubleshooting

### Connection Failed

**Problem:** Cannot connect to SSAS server
- Verify SSAS server is running and accessible
- Check URL is correct and reachable
- Verify network/firewall allows connection
- Check for authentication requirements

### No Data Displayed

**Problem:** Pivot loaded but shows no data
- Verify cube name is correct (case-sensitive)
- Check catalog name exists
- Validate hierarchy and measure names
- Check SSAS server logs for errors

### Members Not Showing

**Problem:** Expected members missing
- Verify member names match exactly
- Check spelling and capitalization
- Confirm member exists in cube
- Try expanding hierarchy nodes manually

## Best Practices

1. **Validate SSAS connectivity** - Test connection before deployment
2. **Use meaningful captions** - Make hierarchies user-friendly
3. **Optimize performance** - Limit initial data expansion
4. **Document member paths** - Record exact hierarchy names
5. **Test queries** - Verify in SSAS first then in Pivot
6. **Monitor network** - OLAP queries can be large
7. **Cache where possible** - Reduce server round-trips
8. **Plan hierarchy deeply** - Deep hierarchies improve analysis


