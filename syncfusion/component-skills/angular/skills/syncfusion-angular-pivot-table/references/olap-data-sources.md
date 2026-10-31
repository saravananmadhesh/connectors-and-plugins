# OLAP Data Sources

## ⚠️ SECURITY NOTICE

**All OLAP connections MUST use authenticated, enterprise-managed OLAP servers.** Never connect to untrusted OLAP endpoints. See [core-concepts.md Security Best Practices](./core-concepts.md#security-best-practices) for comprehensive security guidelines.

✅ **Required Security Controls:**
- Enterprise OLAP server authentication
- Role-based access control (RBAC)
- Encrypted connections (HTTPS/SSL)
- Configuration-based endpoints (never hardcoded)

## Table of Contents
- [Overview](#overview)
- [Getting Started with OLAP](#getting-started-with-olap)
- [Data Binding Configuration](#data-binding-configuration)
- [OLAP Cube Elements](#olap-cube-elements)
- [Authentication & Security](#authentication--security)
- [Working with Measures & Dimensions](#working-with-measures--dimensions)
- [Named Sets & Calculated Fields](#named-sets--calculated-fields)
- [Advanced Features](#advanced-features)

---

## Overview

OLAP (Online Analytical Processing) data sources provide multidimensional data analysis capabilities for the Syncfusion Angular Pivot Table. Unlike relational data sources that use flat tables, OLAP cubes organize data into hierarchies with dimensions (row/column structures) and measures (numeric values). This guide covers OLAP-specific configuration, connection setup, and feature usage.

**Key Differences from Relational Data:**
- Dimensional hierarchies instead of normalized tables
- Pre-aggregated data for faster performance
- MDX (Multidimensional Expressions) for queries
- Cube metadata with roles and security
- Named sets for predefined member groups

---

## Getting Started with OLAP

### Package Setup

Ensure all dependencies are installed for OLAP support:

```bash
npm install @syncfusion/ej2-angular-pivotview --save
```

### Module Registration

Register the PivotView module in your Angular component:

```typescript
import { Component } from '@angular/core';
import { PivotViewModule, GroupingBarService, FieldListService } from '@syncfusion/ej2-angular-pivotview';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';

@Component({
  imports: [PivotViewModule],
  providers: [GroupingBarService, FieldListService],
  selector: 'app-pivot-grid',
  template: `
    <ejs-pivotview 
      #pivotview 
      id='PivotView'
      [dataSourceSettings]="dataSourceSettings"
      [height]="'500px'"
      [width]="'100%'"
      [showGroupingBar]="true"
      [showFieldList]="true">
    </ejs-pivotview>
  `
})
export class PivotGridComponent implements OnInit {
  public dataSourceSettings: DataSourceSettingsModel;

  ngOnInit(): void {
    this.dataSourceSettings = {
      catalog: 'Adventure Works DW 2008 SE',
      cube: 'Adventure Works',
      providerType: 'SSAS',
      url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
      localeIdentifier: 1033,
      rows: [
        { name: '[Customer].[Customer Geography]', caption: 'Customer Geography' }
      ],
      columns: [
        { name: '[Product].[Product Categories]', caption: 'Product Categories' }
      ],
      values: [
        { name: '[Measures].[Internet Sales Amount]', caption: 'Sales Amount' }
      ]
    };
  }
}
```

---

## Data Binding Configuration

### Essential OLAP Connection Properties

| Property | Type | Purpose |
|----------|------|---------|
| `url` | string | URL of the OLAP server (e.g., `https://bi.syncfusion.com/olap/msmdpump.dll`) |
| `providerType` | string | `SSAS` (SQL Server Analysis Services) or other provider |
| `catalog` | string | Database/catalog name (e.g., `Adventure Works DW 2008 SE`) |
| `cube` | string | OLAP cube name (e.g., `Adventure Works`) |
| `localeIdentifier` | number | Language locale (e.g., `1033` for English) |

### Basic OLAP Configuration Example

```typescript
ngOnInit(): void {
  this.dataSourceSettings = {
    // Connection settings
    url: 'https://your-olap-server.com/olap/msmdpump.dll',
    providerType: 'SSAS',
    catalog: 'Your_Database',
    cube: 'Your_Cube_Name',
    localeIdentifier: 1033,  // English

    // Report configuration
    rows: [
      { name: '[Dimension].[Hierarchy]', caption: 'Display Name' }
    ],
    columns: [
      { name: '[Another_Dimension].[Hierarchy]', caption: 'Column Title' }
    ],
    values: [
      { name: '[Measures].[Measure_Name]', caption: 'Value Title' }
    ],
    filters: [
      { name: '[Date].[Fiscal]', caption: 'Date Fiscal' }
    ]
  };
}
```

### Multiple Server Configurations

Switch between OLAP servers at runtime:

```typescript
// Store multiple server configs
private olapServers = {
  production: {
    url: 'https://prod-olap.company.com/olap/msmdpump.dll',
    catalog: 'Production_DB',
    cube: 'Sales_Cube'
  },
  staging: {
    url: 'https://staging-olap.company.com/olap/msmdpump.dll',
    catalog: 'Staging_DB',
    cube: 'Sales_Cube'
  }
};

switchServer(environment: 'production' | 'staging'): void {
  const config = this.olapServers[environment];
  this.dataSourceSettings = {
    ...this.dataSourceSettings,
    url: config.url,
    catalog: config.catalog,
    cube: config.cube
  };
}
```

---

## OLAP Cube Elements

### Field List Components

OLAP cubes contain several types of elements displayed in the Field List:

| Element Type | Icon | Draggable? | Purpose |
|--------------|------|-----------|---------|
| Display Folder | 📁 | No | Groups similar elements |
| Measure | 📊 | No | Numeric values for analysis |
| Dimension | 🏷️ | No | Categorical data grouping |
| Hierarchy | 📈 | Yes | Parent-child relationships |
| Level | 📍 | Yes | Specific positions in hierarchy |
| Named Set | ⭐ | Yes | Predefined member groups |

### Organizing Cube Elements

#### Measures
Measures are numeric values from the cube's fact table. Always add measures to the `values` array:

```typescript
values: [
  { name: '[Measures].[Internet Sales Amount]', caption: 'Sales Amount' },
  { name: '[Measures].[Customer Count]', caption: 'Unique Customers' },
  { name: '[Measures].[Order Quantity]', caption: 'Quantity Sold' }
]
```

#### Dimensions & Hierarchies
Dimensions contain hierarchies that structure data:

```typescript
rows: [
  { name: '[Customer].[Customer Geography]', caption: 'Customer Geography' },
  { name: '[Product].[Product Categories]', caption: 'Product Category' }
],
columns: [
  { name: '[Date].[Calendar]', caption: 'Calendar Date' }
]
```

#### Placing Measures at Different Positions
Configure where measures appear in rows vs columns:

```typescript
// Measures on columns (default)
columns: [
  { name: '[Measures]' }
],

// Measures on rows instead
rows: [
  { name: '[Measures]' },
  { name: '[Product].[Product Categories]' }
]
```

---

## Authentication & Security

### Basic Authentication

For OLAP servers requiring credentials:

```typescript
ngOnInit(): void {
  this.dataSourceSettings = {
    url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
    catalog: 'Adventure Works DW 2008 SE',
    cube: 'Adventure Works',
    
    // Authentication
    authentication: {
      userName: 'domain\\username',
      password: 'secure_password'
    }
  };
}
```

**Security Best Practices:**
- Never hardcode passwords in source code
- Use environment variables or secure config services
- Implement token-based authentication when available
- Ensure HTTPS connections to OLAP servers

### Role-Based Access Control

SQL Server Analysis Services (SSAS) supports roles to control data access:

```typescript
ngOnInit(): void {
  this.dataSourceSettings = {
    url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
    catalog: 'Adventure Works DW 2008 SE',
    cube: 'Adventure Works',
    
    // Single role
    roles: 'SalesManager',
    
    // Multiple roles (comma-separated)
    // roles: 'SalesManager,Regional Director'
    
    rows: [
      { name: '[Customer].[Customer Geography]', caption: 'Customer Geography' }
    ],
    columns: [
      { name: '[Product].[Product Categories]', caption: 'Product Categories' }
    ],
    values: [
      { name: '[Measures].[Internet Sales Amount]', caption: 'Sales Amount' }
    ]
  };
}
```

---

## Working with Measures & Dimensions

### Hierarchies in Detail

A hierarchy organizes dimension members into levels with parent-child relationships:

```
Geography Hierarchy
├── Country (Level 1)
│   ├── USA
│   ├── Canada
│   └── Mexico
├── State/Province (Level 2)
│   ├── California
│   ├── Ontario
│   └── Jalisco
└── City (Level 3)
    ├── Los Angeles
    ├── Toronto
    └── Mexico City
```

Configure hierarchies in pivot table:

```typescript
rows: [
  { name: '[Customer].[Customer Geography].[Country]' },
  { name: '[Customer].[Customer Geography].[State-Province]' }
],
columns: [
  { name: '[Product].[Product Categories]' }
]
```

### Attribute Hierarchies

Single-level hierarchies created for individual dimension attributes:

```typescript
rows: [
  { name: '[Product].[Color]' },  // Attribute hierarchy
  { name: '[Product].[Size]' }    // Attribute hierarchy
]
```

### Named Sets

Predefined groups of members stored in the cube:

```typescript
columns: [
  { name: 'Core Product Group', isNamedSet: true, caption: 'Core Products' }
],
rows: [
  { name: '[Customer].[Customer Geography]' }
],
values: [
  { name: '[Measures].[Internet Sales Amount]' }
]
```

### Multiple Measures Configuration

Display multiple measures for comparison:

```typescript
values: [
  { name: '[Measures].[Internet Sales Amount]', caption: 'Sales Revenue' },
  { name: '[Measures].[Order Quantity]', caption: 'Units Sold' },
  { name: '[Measures].[Customer Count]', caption: 'Unique Customers' }
]
```

Apply formatting to each measure:

```typescript
formatSettings: [
  { name: '[Measures].[Internet Sales Amount]', format: 'C2' },  // Currency
  { name: '[Measures].[Order Quantity]', format: 'N0' },          // Number
  { name: '[Measures].[Customer Count]', format: 'N0' }           // Number
]
```

---

## Named Sets & Calculated Fields

### Using Named Sets

Named sets are pre-built MDX expressions for member groups:

```typescript
rows: [
  { name: '[Customer].[Customer Geography]' }
],
columns: [
  { name: 'Top 10 Products', isNamedSet: true, caption: 'Top 10 Products' }
],
values: [
  { name: '[Measures].[Internet Sales Amount]' }
]
```

### Calculated Fields (Calculated Members)

Create new members using MDX expressions:

```typescript
calculatedFieldsSettings: [
  {
    name: 'Internet Profit Margin',
    formula: '([Measures].[Internet Profit] / [Measures].[Internet Sales Amount]) * 100',
    hierarchyUniqueName: '[Measures]',
    formatString: 'Percent'
  }
]
```

**Important:** For OLAP, calculated measures must be added to values with `isCalculatedField: true`:

```typescript
values: [
  { name: '[Measures].[Internet Sales Amount]' },
  { name: 'Internet Profit Margin', isCalculatedField: true }
],
calculatedFieldsSettings: [
  {
    name: 'Internet Profit Margin',
    formula: '([Measures].[Internet Profit] / [Measures].[Internet Sales Amount]) * 100',
    hierarchyUniqueName: '[Measures]',
    formatString: 'Percent'
  }
]
```

### Common Calculated Field Operators

| Operator | Usage | Example |
|----------|-------|---------|
| `+` | Addition | `[Measures].[A] + [Measures].[B]` |
| `-` | Subtraction | `[Measures].[Total] - [Measures].[Used]` |
| `*` | Multiplication | `[Measures].[Price] * [Measures].[Quantity]` |
| `/` | Division | `[Measures].[Profit] / [Measures].[Revenue]` |
| `()` | Grouping | `([A] + [B]) * [C]` |
| `IIF()` | Conditional | `IIF([Measures].[Sales] > 100000, 'High', 'Low')` |

---

## Advanced Features

### Virtual Scrolling with OLAP

Large OLAP cubes benefit from virtual scrolling:

```typescript
import { VirtualScrollService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  imports: [PivotViewModule],
  providers: [GroupingBarService, FieldListService, VirtualScrollService],
  template: `
    <ejs-pivotview 
      #pivotview
      [dataSourceSettings]="dataSourceSettings"
      [enableVirtualization]="true"
      [height]="'500px'">
    </ejs-pivotview>
  `
})
export class PivotGridComponent implements OnInit {
  // Configuration with virtual scrolling enabled
}
```

### Drill-Down Operations

Enable drilling into OLAP hierarchies:

```typescript
ngOnInit(): void {
  this.dataSourceSettings = {
    // OLAP connection
    url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
    catalog: 'Adventure Works DW 2008 SE',
    cube: 'Adventure Works',
    
    rows: [
      { name: '[Customer].[Customer Geography].[Country]' },
      { name: '[Customer].[Customer Geography].[State-Province]' }
    ],
    enableSorting: true,
    expandAll: false  // Start collapsed, allow user drilling
  };
}
```

### Filter Axis Configuration

Use the filter axis to apply master filters:

```typescript
filters: [
  { name: '[Date].[Fiscal]', caption: 'Date Fiscal' },
  { name: '[Product].[Product Categories]', caption: 'Product Category' }
],
filterSettings: [
  {
    name: '[Date].[Fiscal]',
    items: [
      '[Date].[Fiscal].[Fiscal Year].&[2022]',
      '[Date].[Fiscal].[Fiscal Year].&[2023]'
    ],
    levelCount: 3
  }
]
```

### Connection Events

Monitor OLAP server interactions:

```typescript
@Component({
  template: `
    <ejs-pivotview
      [dataSourceSettings]="dataSourceSettings"
      (beforeServiceInvoke)="onBeforeServiceInvoke($event)"
      (afterServiceInvoke)="onAfterServiceInvoke($event)">
    </ejs-pivotview>
  `
})
export class PivotGridComponent {
  onBeforeServiceInvoke(args: any): void {
    // Add custom parameters before server request
    args.customProperties = {
      userId: 'current_user_id',
      sessionToken: 'auth_token'
    };
  }

  onAfterServiceInvoke(args: any): void {
    // Handle server response
    console.log('Server returned:', args.data);
  }
}
```

---

## Common Issues & Solutions

### Connection Failures
- Verify OLAP server URL is accessible
- Check firewall/network rules
- Confirm authentication credentials
- Validate localeIdentifier matches server settings

### Empty Cube/Field List
- Ensure cube name matches exactly (case-sensitive)
- Verify user has access to catalog and cube
- Check role permissions if using role-based access
- Confirm OLAP service is running and responsive

### Slow Performance
- Enable virtual scrolling for large dimensions
- Use filters to reduce data scope
- Limit hierarchies shown in Field List
- Implement server-side filtering where possible

---

## Next Steps

- **Filtering & Sorting**: Learn to filter OLAP members and sort by values
- **Visualization**: Create pivot charts with OLAP data
- **Performance**: Optimize OLAP queries and implement caching
- **Security**: Implement advanced role-based security controls
