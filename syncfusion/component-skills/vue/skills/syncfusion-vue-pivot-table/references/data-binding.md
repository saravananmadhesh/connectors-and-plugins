# Data Binding

## ⚠️ SECURITY NOTICE

**CRITICAL**: This documentation contains examples for connecting to remote data sources. **Always use trusted, authenticated data sources only.** Never bind to untrusted URLs, user-provided endpoints, or public APIs without proper validation and security controls. See the [Security Best Practices](#security-best-practices) section below.

## Table of Contents
- [Security Best Practices](#security-best-practices)
- [JSON Binding](#json-binding)
- [CSV Binding](#csv-binding)
- [Remote Data Loading](#remote-data-loading)
- [File Upload](#file-upload)
- [DataManager](#datamanager)

## Security Best Practices

### Critical Security Guidelines

When implementing data binding for pivot tables, follow these essential security practices:

#### 1. **Use Trusted Data Sources Only**

✅ **RECOMMENDED**: Local in-memory data
```vue
// Safe: Local data array
const dataSourceSettings = {
    dataSource: localDataArray,
    rows: [{ name: 'Country' }],
    values: [{ name: 'Amount', type: 'Sum' }]
};
```

❌ **AVOID**: Untrusted remote endpoints
```vue
// UNSAFE: Never use arbitrary or user-provided URLs
const dataSourceSettings = {
    url: userProvidedUrl  // Security risk!
};
```

#### 2. **Implement Authentication for Remote Sources**

If you must use remote data, always use authenticated endpoints:

```vue
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { environment } from '../environment.js';

// Use authenticated endpoints with proper headers
const remoteData = new DataManager({
    url: environment.apiEndpoint,  // Use environment config
    adaptor: new WebApiAdaptor(),
    headers: [
        { 'Authorization': `Bearer ${authToken}` },
        { 'X-API-Key': environment.apiKey }
    ]
});

const dataSourceSettings = {
    dataSource: remoteData,
    // ... configuration
};
</script>
```

#### 3. **Validate and Sanitize Data**

Always validate data received from external sources:

```vue
<script setup>
const isValidDataStructure = (data) => {
    // Validate that data matches expected structure
    return Array.isArray(data) && data.length > 0 && 
           data.every(item => typeof item === 'object');
};

const sanitizeData = (data) => {
    // Remove or escape potentially harmful content
    return data.map(item => ({
        ...item,
        // Sanitize string fields
        name: String(item.name || '').trim()
    }));
};

const loadRemoteData = async (trustedEndpoint) => {
    try {
        const response = await fetch(trustedEndpoint);
        const data = await response.json();
        
        // Validate data structure
        if (!isValidDataStructure(data)) {
            console.error('Invalid data structure received');
            return;
        }
        
        // Sanitize data before binding
        const sanitizedData = sanitizeData(data);
        const dataSourceSettings = { dataSource: sanitizedData };
    } catch (error) {
        console.error('Error loading remote data:', error);
    }
};
</script>
```

#### 4. **Use Environment Configuration**

Store API endpoints in environment files, never hardcode:

```javascript
// environment.js
export const environment = {
    production: false,
    apiEndpoint: 'https://your-trusted-api.com/data',
    allowedOrigins: ['https://your-domain.com']
};
```

```vue
<script setup>
import { environment } from '../environment.js';

const dataSourceSettings = {
    url: environment.apiEndpoint  // Controlled endpoint
};
</script>
```

#### 5. **Implement Server-Side Validation**

Process and validate data on your backend before sending to client:

```javascript
// Backend API should:
// - Authenticate requests
// - Validate data sources
// - Sanitize output
// - Implement rate limiting
// - Log access attempts
```

### Security Risks to Avoid

| Risk | Description | Mitigation |
|------|-------------|------------|
| **Indirect Prompt Injection** | Malicious data manipulating AI behavior | Validate and sanitize all external data |
| **Data Exfiltration** | Unauthorized access to sensitive data | Use authentication and authorization |
| **SSRF Attacks** | Server-side request forgery via URLs | Whitelist allowed endpoints |
| **XSS via Data** | Malicious scripts in data fields | Sanitize and escape all data |
| **Credential Exposure** | API keys or tokens in code | Use environment variables |

## JSON Binding

JSON is the default data format for PivotView and offers flexible data structure support.

### Local JSON Binding
Bind data stored locally in your Vue component:

```vue
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  drilledMembers: [{ name: 'Country', items: ['France'] }],
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};
const height = 350;
</script>
```

### Using DataManager with JsonAdaptor
For advanced scenarios, use DataManager to manage data operations:

```vue
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';
import { DataManager, JsonAdaptor } from '@syncfusion/ej2-data';

let remoteData = new DataManager({
  json: pivotData,
  adaptor: new JsonAdaptor()
});

const dataSourceSettings = {
  dataSource: remoteData,
  expandAll: false,
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  filters: []
};
const height = 350;
</script>
```

### Remote JSON Binding

⚠️ **SECURITY WARNING**: Only bind to trusted, authenticated endpoints. Never use arbitrary or user-provided URLs.

Bind JSON data from a remote URL:

```vue
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { environment } from '../environment.js';

// ✓ SECURE: Use environment-configured trusted endpoint
const dataSourceSettings = {
  url: environment.apiEndpoint,  // Use configuration, not hardcoded URLs
  expandAll: false,
  rows: [{ name: 'EnerType', caption: 'Energy Type' }],
  columns: [{ name: 'EneSource', caption: 'Energy Source' }],
  values: [
    { name: 'PowUnits', caption: 'Units (GWh)' },
    { name: 'ProCost', caption: 'Cost (MM)' }
  ],
  filters: []
};
const height = 350;
</script>
```

❌ **DO NOT** do this:
```vue
// Unsafe: Accepts arbitrary URLs
const url = getUserInputUrl();  // Security risk!
const dataSourceSettings = { url };
```

### JSON Data Structure
```vue
<script setup>
export const pivotData = [
  {
    // Fields must match exactly with configuration
    "Country": "France",
    "Region": "IDF",
    "Year": 2015,
    "Quarter": "Q1",
    "Products": "Accessories",
    "Sold": 100,
    "Amount": 5000
  },
  // ... more records
];
</script>
```

### JSON Data Structure Guidelines

Ensure your JSON data follows proper structure for optimal PivotView functionality:

#### Data Type Consistency
- **Numeric fields**: Use actual numbers, NOT strings
  - ✅ `Sales: 5000` 
  - ❌ `Sales: "5000"`
- **Date fields**: Use ISO format strings (YYYY-MM-DD) or Date objects
  - ✅ `Date: '2020-01-15'` or `Date: new Date(2020, 0, 15)`
  - ❌ `Date: '01/15/2020'`
- **Category fields**: Consistency in casing and spacing
  - ✅ Use exact same format: `"France"`, not `"france"` or `"FRANCE"`
  - ❌ `France` in one record, `france` in another breaks grouping

#### Flat Object Structure
```vue
<script setup>
// ✅ Correct: Flat structure
const correctData = [
  {
    Country: 'USA',
    Year: 2020,
    Sales: 5000
  }
];

// ❌ Avoid: Nested objects - won't work
const incorrectData = [
  {
    Location: { Country: 'USA' },  // ← Nested objects don't work
    Year: 2020,
    Sales: 5000
  }
];
</script>
```

#### Field Name Matching
- Names in configuration MUST match data source exactly
- Names ARE case-sensitive
- Remove leading/trailing whitespace from field values

```vue
<script setup>
// Configuration
const dataSourceSettings = {
  rows: [{ name: 'Country' }],    // ← Exactly 'Country'
  columns: [{ name: 'Year' }],    // ← Exactly 'Year'
  values: [{ name: 'Sales' }]     // ← Exactly 'Sales'
};

// Data - must have matching fields
export const pivotData = [
  { Country: 'USA', Year: 2020, Sales: 5000 }  // ✅ Perfect match
];
</script>
```

#### Required Fields Declaration
Include all fields referenced in pivot configuration:

```vue
<script setup>
// This configuration requires these fields
const dataSourceSettings = {
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: [{ name: 'Region' }]
};

// Data MUST include all 4 fields
export const pivotData = [
  {
    Country: 'USA',      // required by rows
    Year: 2020,          // required by columns
    Sales: 5000,         // required by values
    Region: 'North'      // required by filters
  }
];
</script>
```

#### Handling Missing or Null Values
```vue
<script setup>
// Best practice: Provide all fields, even if some are optional
export const pivotData = [
  {
    Country: 'USA',
    Year: 2020,
    Sales: 5000,
    Profit: null,        // ← Explicitly null for missing data
    Region: 'North'
  }
];
</script>
```

## CSV Binding

CSV binding is compact (~50% smaller than JSON) and bandwidth-efficient:

### Local CSV Binding
```vue
<script setup>
// csvdata.js
export const csvdata = `Country,Product,Year,Quarter,Sold,Amount
France,Accessories,2015,Q1,100,5000
France,Accessories,2015,Q2,150,7500
...`;
</script>
```

```vue
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { csvdata } from './csvdata.js';
import { isNullOrUndefined } from "@syncfusion/ej2-base";

const getCSVData = () => {
  let dataSource = [];
  let jsonObject = csvdata.split(/\r?\n|\r/);
  for (let i = 0; i < jsonObject.length; i++) {
    if (!isNullOrUndefined(jsonObject[i]) && jsonObject[i] !== "") {
      dataSource.push(jsonObject[i].split(","));
    }
  }
  return dataSource;
};

const dataSourceSettings = {
  dataSource: getCSVData(),
  type: 'CSV',
  expandAll: false,
  formatSettings: [
    { name: 'Amount', format: 'C0' }
  ],
  rows: [{ name: 'Country' }, { name: 'Region' }],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold' }, { name: 'Amount' }],
  filters: []
};
const height = 350;
</script>
```

### Remote CSV Binding

⚠️ **SECURITY WARNING**: Only bind to trusted, authenticated endpoints. Never use arbitrary or user-provided URLs.

```vue
<script setup>
import { environment } from '../environment.js';

// ✓ SECURE: Use environment-configured endpoint
const dataSourceSettings = {
  url: environment.csvEndpoint,  // Use configuration, not hardcoded URLs
  type: 'CSV',
  // ... field configuration
};
</script>
```

## Remote Data Loading

⚠️ **SECURITY WARNING**: Only bind to trusted, authenticated endpoints. Never use arbitrary or user-provided URLs.

Load data from URLs or web services without storing in the client:

```vue
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { environment } from '../environment.js';

// ✓ SECURE: Use authenticated endpoint from trusted configuration
const dataSourceSettings = {
  url: environment.apiEndpoint,  // Configured trusted endpoint
  expandAll: false,
  rows: [{ name: 'Country' }, { name: 'Product' }],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sales' }, { name: 'Profit' }],
  filters: []
};
const height = 350;
</script>
```

❌ **NEVER** do this:
```vue
// Unsafe: Accepts user input
const userUrl = req.query.dataSource;  // Security risk!
const dataSourceSettings = { url: userUrl };
```

### Characteristics of Remote Data
- **Lazy Loading**: Data loads only when needed
- **Reduced Bundle**: No embedded data in application
- **Real-time Data**: Always fetch latest data from trusted sources
- **Scalability**: Independent of client-side storage
- **Security**: Validate all data from remote sources

## File Upload

Load data from uploaded JSON/CSV files:

```vue
<template>
  <div id="app">
    <input type="file" id="fileupload" accept=".json,.csv" @change="onFileUpload" />
    <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height"></ejs-pivotview>
  </div>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { ref } from 'vue';

const dataSourceSettings = ref({});
const height = 350;

const onFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      // Parse as JSON
      const data = JSON.parse(e.target.result);
      dataSourceSettings.value = {
        dataSource: data,
        // ... field configuration
      };
    } catch (error) {
      console.log('Invalid JSON file. Trying CSV...', error);
    }
  };
  
  reader.readAsText(file);
};
</script>
```

## DataManager

DataManager provides advanced data handling with adaptors:

### Built-in Adaptors
```vue
<script setup>
// JsonAdaptor - for JSON data
import { DataManager, JsonAdaptor } from '@syncfusion/ej2-data';
const dm = new DataManager({ json: data, adaptor: new JsonAdaptor() });

// UrlAdaptor - for remote URLs
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
const dm = new DataManager({ url: 'api/data', adaptor: new UrlAdaptor() });
</script>
```

### Example with DataManager
```vue
<script setup>
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { environment } from '../environment.js';

// ✓ SECURE: Use environment-configured endpoint
const dataManager = new DataManager({
  url: environment.apiEndpoint,  // Use environment config: e.g., 'https://your-server/api/pivot-data'
  adaptor: new UrlAdaptor(),
  crossDomain: true  // Enable CORS if needed
});

const dataSourceSettings = {
  dataSource: dataManager,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>
```

### Advantages of DataManager
- Consistent API for different data sources
- Built-in filtering and sorting
- Error handling and retries
- CORS support
- Request batching

## Server-Side Pivot Processing

For very large datasets (millions of records), use the official Syncfusion Server-Side Pivot Engine. This requires the [`Syncfusion.Pivot.Engine`](https://www.nuget.org/packages/Syncfusion.Pivot.Engine) NuGet package on the server.

### Official Server-Side Engine Setup

```vue
<template>
  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { environment } from '../environment.js';

// ✓ SECURE: Use environment-configured server-side engine endpoint
const dataSourceSettings = {
  url: environment.apiEndpoint,  // Use environment config: e.g., 'https://your-server/api/pivot'
  mode: 'Server',  // CRITICAL: Must use Server mode
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales', type: 'Sum' }],
  filters: []
};

const height = 600;
</script>
```

### How It Works

1. **Client**: Sends report definition (rows, columns, values) to server
2. **Server**: Uses Syncfusion.Pivot.Engine to:
   - Connect to database directly
   - Perform aggregation/filtering/sorting server-side
   - Return only aggregated results
3. **Client**: Displays aggregated data (~1,000 rows vs 1M raw rows)

### Server-Side Advantages

| Aspect | Built-in Engine | Server-Side Engine |
|--------|---|---|
| **Data Transfer** | 1M+ rows | ~1,000 aggregated rows |
| **Memory (Client)** | 200-300MB | 5-10MB |
| **Initial Load** | 15-20s | 2-3s |
| **Best For** | <500k records | 100M+ records |

### Required Setup

1. **Download** server-side app from [GitHub](https://github.com/SyncfusionExamples/server-side-pivot-engine-for-pivot-table)
2. **Install** `Syncfusion.Pivot.Engine` NuGet package
3. **Run** PivotController application
4. **Connect** Vue client to server URL

> **Note**: Server-side pivot engine requires ASP.NET Core and is only for relational data sources.

