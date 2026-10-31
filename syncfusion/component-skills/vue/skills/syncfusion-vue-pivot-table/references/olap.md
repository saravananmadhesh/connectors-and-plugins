# OLAP (Online Analytical Processing) Binding

## ⚠️ CRITICAL SECURITY NOTICE

**OLAP connections require special security considerations.** Never expose SSAS credentials to client code. Always authentit through secure backend services with proper token-based authentication. Untrusted OLAP data sources pose a significant indirect prompt injection risk if used with AI agents.

## Table of Contents
- [Overview](#overview)
- [SSAS Configuration](#ssas-configuration)
- [OLAP Field Naming](#olap-field-naming)
- [Complete Working Example](#complete-working-example)
- [Common OLAP Tasks](#common-olap-tasks)
- [Troubleshooting](#troubleshooting)

## Overview

PivotView supports OLAP (Online Analytical Processing) data sources, enabling analysis of massive multi-dimensional datasets directly from SSAS (SQL Server Analysis Services) servers. OLAP offloads aggregation to the server, making it ideal for:

- **Large datasets** (millions of rows)
- **Real-time analytics** dashboards
- **Complex hierarchies** with drill-down capabilities
- **Pre-aggregated measures** from data warehouses

### When to Use OLAP vs JSON

| Aspect | JSON | OLAP |
|--------|------|------|
| **Dataset Size** | Up to ~100K rows | Unlimited (millions) |
| **Aggregation** | Client-side (slower) | Server-side (faster) |
| **Configuration** | Direct dataSource array | Server URL + catalog/cube |
| **Field Names** | Plain strings: `'Country'` | OLAP notation: `'[Country]'` |
| **Performance** | Limited by client memory | Optimized for big data |
| **Real-time** | Full reload required | Efficient incremental updates |
| **Security** | No credentials needed | Requires backend authentication |

---

## SSAS Configuration

### Required Properties

```vue
<script setup>

// ✓ SECURE: Use OLAP server endpoint
const dataSourceSettings = {
  // Connection Details
  catalog: 'Adventure Works DW 2008 SE',  // Database/catalog name
  cube: 'Adventure Works',                // Cube name within catalog
  url: 'https://your-ssas-server/olap/msmdpump.dll',
  providerType: 'SSAS',                   // Provider (SQL Server Analysis Services)
  localeIdentifier: 1033,                 // Language (1033 = English US)
  
  // ... rest of configuration
};
</script>
```

### Property Details

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `catalog` | string | ✓ | Database/catalog name from SSAS server |
| `cube` | string | ✓ | Cube name within the catalog |
| `url` | string | ✓ | XMLA endpoint (e.g., `https://server/olap/msmdpump.dll`) |
| `providerType` | string | ✓ | Set to `'SSAS'` for SQL Server Analysis Services |
| `localeIdentifier` | number | ✓ | Language ID (1033 = English US) |
| `enableSorting` | boolean | ✗ | Allow sorting on dimensions (default: true) |

### Authentication

```vue
<script setup>

// ✓ SECURE: Use OLAP server endpoint
// If required by your SSAS server
const dataSourceSettings = {
  catalog: 'MyCatalog',
  cube: 'MyCube',
  url: 'https://your-server/olap/msmdpump.dll',
  providerType: 'SSAS',
  localeIdentifier: 1033,
  
  // Authentication must be handled server-side with secure tokens
  // Never include credentials in client-side code
  // Instead, authenticate on backend and provide token to client:
  // token: await fetchSecureTokenFromBackend()
  
  // For production OLAP connections:
  // 1. Use Azure Key Vault for SSAS credentials
  // 2. Implement server-side authentication with JWT tokens
  // 3. Use Windows Integrated Authentication (Kerberos/NTLM) for AD users
  // 4. Store credentials in secure environment variables
};
</script>
```

---

## Security Best Practices for OLAP Connections

⚠️ **CRITICAL: Never Store Credentials in Client Code**

OLAP connections require authentication, but credentials must ALWAYS be handled server-side:

### ❌ INSECURE Approach (Never Do This):
```javascript
// NEVER include passwords in Vue components!
const dataSourceSettings = {
  url: 'https://your-server/olap/msmdpump.dll',
  authentication: {
    userName: 'domain\\username',  // ❌ BAD: Exposed to inspection
    password: 'secret123'           // ❌ CRITICAL: Visible in source code
  }
};
```

### ✅ SECURE Approach (Always Use This):

**Step 1: Backend Authentication Service**
```csharp
[ApiController]
[Route("api/[controller]")]
public class OlapAuthController : ControllerBase
{
    [HttpGet("token")]
    [Authorize]  // Only authenticated users
    public IActionResult GetOlapToken()
    {
        // Retrieve credentials securely from Azure Key Vault
        var username = _secretManager.GetSecret("OlapUsername");
        var password = _secretManager.GetSecret("OlapPassword");
        
        // Authenticate with SSAS using backend credentials
        var ssasClient = new SsasClient(username, password);
        var token = ssasClient.GenerateToken();
        
        return Ok(new { token });
    }
}
```

**Step 2: Vue Component (Uses Token Only)**
```vue
<script setup>

// ✓ SECURE: Use OLAP server endpoint
const dataSourceSettings = {
  url: 'https://your-server/olap/msmdpump.dll',
  // NO credentials here - get token from backend instead
  token: null  // Will be set after authentication
};

const initializeOlap = async () => {
  // Only authenticated users can get token
  const response = await fetch('/api/olapaauth/token');
  const { token } = await response.json();
  dataSourceSettings.token = token;
};

import { onMounted } from "vue";

onMounted(() => initializeOlap());
</script>
```

### Security Checklist
- ☑️ **Azure Key Vault**: Store SSAS credentials in vault, not code
- ☑️ **Environment Variables**: Use `process.env` for non-sensitive settings only
- ☑️ **Service Accounts**: Use dedicated SSAS service account with minimal permissions
- ☑️ **Tokens**: Implement JWT or similar for client-server authentication
- ☑️ **HTTPS Only**: All OLAP connections over TLS/SSL
- ☑️ **Access Control**: Verify user permissions before generating tokens
- ☑️ **Audit Logging**: Log all OLAP connection attempts
- ☑️ **Data Validation**: Validate and sanitize all OLAP response data
- ☑️ **Prompt Injection Prevention**: Verify OLAP data cannot manipulate AI agent behavior

---

## OLAP Field Naming

### Critical: OLAP Bracket Notation

OLAP fields MUST use bracket notation `[ ]`. This is different from JSON field naming.

### Dimension Fields

Format: `[DimensionName].[HierarchyName]`

```vue
<script setup>
rows: [
  { name: '[Customer].[Customer Geography]', caption: 'Customer Geography' },
  { name: '[Product].[Product Categories]', caption: 'Product Category' }
],

columns: [
  { name: '[Date].[Fiscal]', caption: 'Fiscal Date' },
  { name: '[Date].[Calendar]', caption: 'Calendar Date' }
]
</script>
```

### Measure Fields

Format: `[Measures].[MeasureName]`

```vue
<script setup>
values: [
  { name: '[Measures].[Internet Sales Amount]', caption: 'Online Sales' },
  { name: '[Measures].[Customer Count]', caption: 'Customers' },
  { name: '[Measures].[Reseller Sales Amount]', caption: 'Reseller Sales' }
]
</script>
```

### Hierarchy Levels for Filtering

Format: `[Dimension].[Hierarchy].[Level].&[MemberValue]`

```vue
<script setup>
filterSettings: [
  {
    name: '[Date].[Fiscal]',
    items: [
      '[Date].[Fiscal].[Fiscal Year].&[2008]',
      '[Date].[Fiscal].[Fiscal Year].&[2009]'
    ],
    levelName: 'Fiscal Year'
  },
  {
    name: '[Customer].[Customer Geography]',
    items: [
      '[Customer].[Customer Geography].[Country].&[United States]',
      '[Customer].[Customer Geography].[Country].&[Canada]'
    ],
    levelName: 'Country'
  }
]
</script>
```

---

## Complete Working Example

### Full Vue 3 Component

```vue
<template>
  <div id="app">
    <h1>Sales Dashboard - OLAP Analysis</h1>
    <ejs-pivotview
      :dataSourceSettings="dataSourceSettings"
      :gridSettings="gridSettings"
      :showFieldList="showFieldList"
      :showGroupingBar="showGroupingBar"
      height="600px">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { 
  PivotViewComponent as EjsPivotview, 
  FieldList, 
  GroupingBar 
} from "@syncfusion/ej2-vue-pivotview";

// ✓ CORRECT OLAP Configuration
const dataSourceSettings = {
  // SSAS Server Connection
  catalog: 'Adventure Works DW 2008 SE',
  cube: 'Adventure Works',
  url: 'https://your-ssas-server/olap/msmdpump.dll',
  providerType: 'SSAS',
  localeIdentifier: 1033,
  
  // Row Axis - Customer Geography Dimension
  rows: [
    { 
      name: '[Customer].[Customer Geography]',
      caption: 'Customer Geography',
      expandAll: false  // Don't load all hierarchy levels initially
    }
  ],
  
  // Column Axis - Product Categories + Measures
  columns: [
    { 
      name: '[Product].[Product Categories]',
      caption: 'Product Categories' 
    },
    { 
      name: '[Measures]',
      caption: 'Measures' 
    }
  ],
  
  // Value Axis - Measures from Cube
  values: [
    { 
      name: '[Measures].[Customer Count]',
      caption: 'Customer Count',
      type: 'Count'
    },
    { 
      name: '[Measures].[Internet Sales Amount]',
      caption: 'Internet Sales ($)',
      format: 'C2'
    }
  ],
  
  // Filter Axis - Master Filters
  filters: [
    { 
      name: '[Date].[Fiscal]',
      caption: 'Fiscal Year',
      expandAll: false
    }
  ],
  
  // Pre-applied Filters
  filterSettings: [
    {
      name: '[Date].[Fiscal]',
      items: ['[Date].[Fiscal].[Fiscal Year].&[2008]'],
      levelName: 'Fiscal Year'
    }
  ],
  
  enableSorting: true
};

// Grid appearance settings
const gridSettings = {
  columnWidth: 130,
  rowHeight: 36,
  layout: 'Compact'
};

// UI Feature Toggles
const showFieldList = true;   // Allow field manipulation
const showGroupingBar = true; // Allow axis manipulation

// Register modules
provide('pivotview', [FieldList, GroupingBar]);
</script>

<style>
@import "@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Using Your Own SSAS Server

```vue
<script setup>

// ✓ SECURE: Use OLAP server endpoint
const dataSourceSettings = {
  // Replace with your SSAS server details
  catalog: 'YourCatalogName',
  cube: 'YourCubeName',
  url: 'https://your-server.example.com:8084/olap/msmdpump.dll',
  providerType: 'SSAS',
  localeIdentifier: 1033,
  
  // ... rest of configuration
};
</script>
```

---

## Common OLAP Tasks

### Task 1: Show Sales by Product and Time

```vue
<script setup>

// ✓ SECURE: Use OLAP server endpoint
const dataSourceSettings = {
  catalog: 'Adventure Works DW 2008 SE',
  cube: 'Adventure Works',
  url: 'https://your-ssas-server/olap/msmdpump.dll',
  providerType: 'SSAS',
  localeIdentifier: 1033,
  
  rows: [
    { name: '[Product].[Product Categories]', caption: 'Product' }
  ],
  columns: [
    { name: '[Date].[Calendar].[Calendar Year]', caption: 'Year' },
    { name: '[Measures]', caption: 'Measures' }
  ],
  values: [
    { name: '[Measures].[Internet Sales Amount]', caption: 'Sales' }
  ],
  filters: [],
  enableSorting: true
};
</script>
```

### Task 2: Multi-Level Filters

```vue
<script setup>
const dataSourceSettings = {
  // ... basic settings ...
  
  filters: [
    { name: '[Date].[Fiscal]', caption: 'Fiscal Period' },
    { name: '[Customer].[Customer Geography]', caption: 'Region' }
  ],
  
  filterSettings: [
    // Filter to 2008-2009 fiscal years
    {
      name: '[Date].[Fiscal]',
      items: [
        '[Date].[Fiscal].[Fiscal Year].&[2008]',
        '[Date].[Fiscal].[Fiscal Year].&[2009]'
      ],
      levelName: 'Fiscal Year'
    },
    // Filter to US and Canada only
    {
      name: '[Customer].[Customer Geography]',
      items: [
        '[Customer].[Customer Geography].[Country].&[United States]',
        '[Customer].[Customer Geography].[Country].&[Canada]'
      ],
      levelName: 'Country'
    }
  ]
};
</script>
```

### Task 3: Drill-Down Hierarchy

```vue
<script setup>
const dataSourceSettings = {
  // ... basic settings ...
  
  // Multiple hierarchy levels for drill-down
  rows: [
    { 
      name: '[Customer].[Customer Geography].[Country]', 
      caption: 'Country',
      expandAll: false 
    },
    { 
      name: '[Customer].[Customer Geography].[State-Province]', 
      caption: 'State',
      expandAll: false 
    },
    { 
      name: '[Customer].[Customer Geography].[City]', 
      caption: 'City',
      expandAll: false 
    }
  ]
};
</script>
```

Users can click expand (►) icons to drill down through the hierarchy levels.

### Task 4: Pivot Chart with OLAP

```vue
<script setup>
import { PivotViewComponent as EjsPivotview, FieldList, PivotChart } from "@syncfusion/ej2-vue-pivotview";

const dataSourceSettings = {
  // ... OLAP settings ...
};

const chartSettings = {
  value: '[Measures].[Internet Sales Amount]',
  type: 'Column',
  title: 'Sales Trend',
  legendSettings: { position: 'Right' }
};

const displayOption = {
  view: 'Both'  // Show both grid and chart
};

provide('pivotview', [FieldList, PivotChart]);
</script>
```

---

## Troubleshooting

### Issue: "Field not found" or Empty Pivot Table

**Cause:** Incorrect field names or mismatched dimensions/measures

**Solution:**
```vue
<script setup>
// ❌ WRONG (no brackets, wrong format)
{ name: 'Product Categories', caption: 'Products' }

// ✅ CORRECT (OLAP bracket notation)
{ name: '[Product].[Product Categories]', caption: 'Products' }
</script>
```

### Issue: "Access denied" or Authentication Error

**Cause:** SSAS server requires authentication

**Solution:**
```vue
<script setup>
const dataSourceSettings = {
  // ... other settings ...
  authentication: {
    userName: 'domain\\username',
    password: 'password'
  }
};
</script>
```

### Issue: Slow Performance with Large Cubes

**Solution:**
```vue
<script setup>
const dataSourceSettings = {
  // ... settings ...
  
  // Apply filters to reduce initial data
  filterSettings: [
    {
      name: '[Date].[Fiscal]',
      items: ['[Date].[Fiscal].[Fiscal Year].&[2008]'],
      levelName: 'Fiscal Year'
    }
  ],
  
  // Don't expand all levels on initial load
  rows: [
    { name: '[Geography].[Country]', expandAll: false }
  ]
};
</script>
```

### Issue: "Connection timeout"

**Cause:** XMLA endpoint unreachable or SSAS service down

**Solution:**
1. Verify SSAS server is running
2. Check XMLA endpoint URL is correct
3. Verify network connectivity
4. Check msmdpump.dll is enabled in IIS (for HTTP/HTTPS access)
5. Use OLAP server endpoint:
```vue
<script setup>

const dataSourceSettings = {
   url: 'https://your-ssas-server/olap/msmdpump.dll',
};
</script>
```

### Issue: No Measures Appearing

**Cause:** Measures not included in columns or wrong field name

**Solution:**
```vue
<script setup>
// ✓ Include [Measures] as a column field
columns: [
  { name: '[Date].[Calendar]', caption: 'Date' },
  { name: '[Measures]', caption: 'Measures' }  // ← Required
]
</script>
```

---

## Adventure Works Cube Reference

### Available Dimensions
- `[Customer].[Customer Geography]` - Countries, states, cities
- `[Product].[Product Categories]` - Bikes, components, clothing, accessories
- `[Date].[Fiscal]` - Fiscal years, quarters, months
- `[Date].[Calendar]` - Calendar years, quarters, months
- `[Employee].[Employees]` - Sales person hierarchy
- `[Sales Territory].[Sales Territory]` - Regional territories

### Available Measures
- `[Measures].[Customer Count]` - Number of customers
- `[Measures].[Internet Sales Amount]` - Online sales revenue
- `[Measures].[Reseller Sales Amount]` - Reseller channel revenue
- `[Measures].[Internet Order Quantity]` - Online units sold
- `[Measures].[Reseller Order Quantity]` - Reseller units sold

---

## Best Practices

1. ✅ **Always use OLAP bracket notation** `[Dimension].[Hierarchy]`
2. ✅ **Set `expandAll: false`** to avoid loading all hierarchy levels on startup
3. ✅ **Include `localeIdentifier`** for consistent language support
4. ✅ **Test with Syncfusion demo server first** before connecting to production SSAS
5. ✅ **Use `filterSettings`** to pre-filter data and reduce initial load
6. ✅ **Enable Field List and Grouping Bar** for maximum user flexibility
7. ✅ **Apply filters at the lowest needed level** to optimize performance
8. ✅ **Use meaningful captions** for user-friendly field names

