# Core Concepts & Data Binding

## ⚠️ SECURITY NOTICE

**CRITICAL**: This documentation contains examples for connecting to remote data sources. **Always use trusted, authenticated data sources only.** Never bind to untrusted URLs, user-provided endpoints, or public APIs without proper validation and security controls. See the [Security Best Practices](#security-best-practices) section below.

## Table of Contents
- [Security Best Practices](#security-best-practices)
- [Data Binding Types](#data-binding-types)
- [JSON Data Binding](#json-data-binding)
- [CSV Data Binding](#csv-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [OLAP Data Binding](#olap-data-binding)
- [Choosing the Right Data Source](#choosing-the-right-data-source)

## Security Best Practices

### Critical Security Guidelines

When implementing data binding for pivot tables, follow these essential security practices:

#### 1. **Use Trusted Data Sources Only**

✅ **RECOMMENDED**: Local in-memory data
```typescript
// Safe: Local data array
this.dataSourceSettings = {
    dataSource: this.localDataArray,
    rows: [{ name: 'Country' }],
    values: [{ name: 'Amount', type: 'Sum' }]
};
```

❌ **AVOID**: Untrusted remote endpoints
```typescript
// UNSAFE: Never use arbitrary or user-provided URLs
url: userProvidedUrl  // Security risk!
```

#### 2. **Implement Authentication for Remote Sources**

If you must use remote data, always use authenticated endpoints:

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

// Use authenticated endpoints with proper headers
this.dataSourceSettings = {
    dataSource: new DataManager({
        url: environment.apiEndpoint,  // Use environment config
        adaptor: new WebApiAdaptor(),
        headers: [
            { 'Authorization': `Bearer ${this.authToken}` },
            { 'X-API-Key': environment.apiKey }
        ]
    }),
    // ... configuration
};
```

#### 3. **Validate and Sanitize Data**

Always validate data received from external sources:

```typescript
this.http.get(trustedEndpoint).subscribe((data: any) => {
    // Validate data structure
    if (!this.isValidDataStructure(data)) {
        console.error('Invalid data structure received');
        return;
    }
    
    // Sanitize data before binding
    const sanitizedData = this.sanitizeData(data);
    this.dataSourceSettings = { dataSource: sanitizedData };
});
```

#### 4. **Use Environment Configuration**

Store API endpoints in environment files, never hardcode:

```typescript
// environment.ts
export const environment = {
    production: false,
    apiEndpoint: 'https://your-trusted-api.com/data',
    allowedOrigins: ['https://your-domain.com']
};

// component
import { environment } from '../environments/environment';

this.dataSourceSettings = {
    url: environment.apiEndpoint  // Controlled endpoint
};
```

#### 5. **Implement Server-Side Validation**

Process and validate data on your backend before sending to client:

```typescript
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

## Data Binding Types

The Pivot Table supports four primary data binding approaches, each optimized for different scenarios and data volumes:

### 1. **JSON (Local & Remote)**
- Best for small to medium datasets (up to 100K rows)
- Works with in-memory arrays or remote JSON endpoints
- Client-side processing using the built-in Pivot Engine
- Fastest setup and deployment

### 2. **CSV (Local & Remote)**
- Compact format (approximately half the size of JSON)
- Good for relational data and spreadsheet-style datasets
- Requires conversion to string arrays for local data
- Reduced bandwidth usage for remote sources

### 3. **OLAP (Cube-Based)**
- Designed for pre-aggregated, multi-dimensional data
- Connects to SQL Server Analysis Services (SSAS), Mondrian, or other OLAP servers
- Ideal for enterprise BI scenarios
- Supports complex hierarchies and calculated members

### 4. **Server-Side Pivot Engine**
- Processes data on the ASP.NET Core server instead of the client
- Essential for large datasets (100K+ rows)
- Reduces network traffic by sending only viewport data
- Best performance for complex operations

---

## JSON Data Binding

JSON is the default data type for the Pivot Table. Binding JSON data provides flexible options for both local in-memory data and remote sources.

### Binding Local JSON Array

The simplest approach is to assign a local variable containing JSON data to the [`dataSource`](https://ej2.syncfusion.com/angular/documentation/api/pivotview/dataSourceSettings/#datasource) property:

```typescript
import { Component, OnInit } from '@angular/core';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';

@Component({
    selector: 'app-container',
    template: `<ejs-pivotview [dataSourceSettings]=dataSourceSettings></ejs-pivotview>`
})
export class AppComponent implements OnInit {
    public dataSourceSettings: DataSourceSettingsModel;

    ngOnInit(): void {
        this.dataSourceSettings = {
            dataSource: [
                { 'Sold': 31, 'Amount': 52824, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' }
            ],
            rows: [{ name: 'Country' }],
            columns: [{ name: 'Year' }],
            values: [{ name: 'Amount', type: 'Sum' }]
        };
    }
}
```

### Using DataManager with JsonAdaptor

For more flexible data management, use the [`DataManager`](https://ej2.syncfusion.com/angular/documentation/api/pivotview/dataSourceSettings/#datasource) with `JsonAdaptor`:

```typescript
import { Component, OnInit } from '@angular/core';
import { DataManager, JsonAdaptor } from '@syncfusion/ej2-data';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';

@Component({
    selector: 'app-container',
    template: `<ejs-pivotview [dataSourceSettings]=dataSourceSettings></ejs-pivotview>`
})
export class AppComponent implements OnInit {
    public dataSourceSettings: DataSourceSettingsModel;

    ngOnInit(): void {
        let data = [
            { 'Month': 'Jan', 'Company': 'Jet Airways', 'Profit': 21, 'Loss': -1 }
        ];

        this.dataSourceSettings = {
            dataSource: new DataManager({
                data: data,
                adaptor: new JsonAdaptor
            }),
            rows: [{ name: 'Month' }],
            columns: [{ name: 'Company' }],
            values: [
                { name: 'Profit', type: 'Sum' },
                { name: 'Loss', type: 'Sum' }
            ]
        };
    }
}
```

### Loading JSON from File Upload

To load JSON data from a local *.json file using the file uploader:

```typescript
import { Component, OnInit } from '@angular/core';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';
import { Uploader } from '@syncfusion/ej2-inputs';

@Component({
    selector: 'app-container',
    template: `
        <input type="file" id="fileupload">
        <ejs-pivotview [dataSourceSettings]=dataSourceSettings></ejs-pivotview>
    `
})
export class AppComponent implements OnInit {
    public dataSourceSettings: DataSourceSettingsModel;
    public uploadObj: Uploader;

    ngOnInit(): void {
        // Initialize the file uploader
        this.uploadObj = new Uploader({});
        this.uploadObj.appendTo('#fileupload');

        let input = document.querySelector('input[type="file"]');
        // Listen for file upload
        input.addEventListener('change', (e: Event) => {
            let reader = new FileReader();
            reader.onload = () => {
                // Parse the JSON string and bind to Pivot Table
                let result = JSON.parse(reader.result as string);
                this.dataSourceSettings = {
                    dataSource: result,
                    rows: [{ name: 'Country' }],
                    columns: [{ name: 'Product' }],
                    values: [{ name: 'Sales', type: 'Sum' }]
                };
            };
            reader.readAsText((input as any).files[0]);
        });
    }
}
```

### Binding Remote JSON Data

⚠️ **SECURITY WARNING**: Only use trusted, authenticated endpoints. Never bind to user-provided or untrusted URLs.

To connect to a **trusted and authenticated** remote JSON endpoint, set the [`url`](https://ej2.syncfusion.com/angular/documentation/api/pivotview/dataSourceSettings/#url) property:

```typescript
import { Component, OnInit } from '@angular/core';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-container',
    template: `<ejs-pivotview [dataSourceSettings]=dataSourceSettings></ejs-pivotview>`
})
export class AppComponent implements OnInit {
    public dataSourceSettings: DataSourceSettingsModel;

    ngOnInit(): void {
        // ⚠️ SECURITY: Only use controlled, trusted endpoints
        // Store API URLs in environment configuration
        this.dataSourceSettings = {
            url: environment.trustedApiEndpoint,  // Use environment config
            rows: [{ name: 'Country' }],
            columns: [{ name: 'Product' }],
            values: [{ name: 'Sales', type: 'Sum' }]
        };
    }
}
```

**Security Checklist for Remote JSON:**
- ✅ Use HTTPS only
- ✅ Implement authentication (API keys, tokens)
- ✅ Store endpoints in environment config
- ✅ Validate data structure after fetching
- ✅ Implement CORS policies
- ❌ Never use user-provided URLs
- ❌ Never use untrusted public endpoints

---

## CSV Data Binding

CSV (Comma-Separated Values) format provides a compact alternative to JSON, using approximately half the bandwidth. Set the [`type`](https://ej2.syncfusion.com/angular/documentation/api/pivotview/dataSourceSettings/#type) property to `CSV`.

### Binding Local CSV Data

To bind local CSV data, convert it to a string array:

```typescript
import { Component, OnInit } from '@angular/core';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';

@Component({
    selector: 'app-container',
    template: `<ejs-pivotview [dataSourceSettings]=dataSourceSettings></ejs-pivotview>`
})
export class AppComponent implements OnInit {
    public dataSourceSettings: DataSourceSettingsModel;

    ngOnInit(): void {
        // CSV data as string array
        let csvData = [
            ['Country', 'Product', 'Sales', 'Year'],
            ['USA', 'Laptop', '5000', '2023']
        ];

        this.dataSourceSettings = {
            dataSource: csvData,
            type: 'CSV',
            rows: [{ name: 'Country' }],
            columns: [{ name: 'Product' }],
            values: [{ name: 'Sales', type: 'Sum' }]
        };
    }
}
```

### Loading CSV from File Upload

To load CSV data from a local *.csv file:

```typescript
import { Component, OnInit } from '@angular/core';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';
import { Uploader } from '@syncfusion/ej2-inputs';

@Component({
    selector: 'app-container',
    template: `
        <input type="file" id="fileupload">
        <ejs-pivotview [dataSourceSettings]=dataSourceSettings></ejs-pivotview>
    `
})
export class AppComponent implements OnInit {
    public dataSourceSettings: DataSourceSettingsModel;

    ngOnInit(): void {
        const input = document.querySelector('input[type="file"]');
        input.addEventListener('change', (e: Event) => {
            let reader = new FileReader();
            reader.onload = () => {
                // Convert CSV string to string array
                let csvArray = (reader.result as string).split('\n').map(line => line.split(','));
                this.dataSourceSettings = {
                    dataSource: csvArray,
                    type: 'CSV',
                    rows: [{ name: 'Country' }],
                    columns: [{ name: 'Product' }],
                    values: [{ name: 'Sales', type: 'Sum' }]
                };
            };
            reader.readAsText((input as any).files[0]);
        });
    }
}
```

### Binding Remote CSV Data

⚠️ **SECURITY WARNING**: Only use trusted, authenticated CSV endpoints under your control.

To connect to a **trusted and authenticated** remote CSV file or endpoint:

```typescript
import { environment } from '../environments/environment';

// ⚠️ SECURITY: Only use controlled, trusted endpoints
this.dataSourceSettings = {
    url: environment.trustedCsvEndpoint,  // Use environment config, not arbitrary URLs
    type: 'CSV',
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Product' }],
    values: [{ name: 'Sales', type: 'Sum' }]
};
```

**Security Requirements for Remote CSV:**
- ✅ Use authenticated backend endpoints
- ✅ Validate CSV content on server-side
- ✅ Implement rate limiting
- ✅ Use HTTPS only
- ❌ Never accept user-uploaded CSV URLs directly
- ❌ Never use public, unverified CSV sources

---

## Remote Data Binding

⚠️ **SECURITY CRITICAL**: Remote data binding should only be used with trusted, authenticated services under your control. All examples below assume you are connecting to **your own authenticated backend services**.

Remote data binding connects to web services and external data sources through various adaptor types.

### OData Service Binding

⚠️ **Use only with trusted OData services that you control and authenticate.**

Connect to **authenticated** OData (Open Data Protocol) services using the default [`ODataAdaptor`](https://ej2.syncfusion.com/angular/documentation/data/adaptors#odata-adaptor):

```typescript
import { Component, OnInit } from '@angular/core';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-container',
    template: `<ejs-pivotview [dataSourceSettings]=dataSourceSettings></ejs-pivotview>`
})
export class AppComponent implements OnInit {
    public dataSourceSettings: DataSourceSettingsModel;

    ngOnInit(): void {
        // ⚠️ SECURITY: Only connect to your own authenticated OData services
        // The URL below is for demonstration only - replace with your secured endpoint
        this.dataSourceSettings = {
            dataSource: new DataManager({
                url: environment.odataEndpoint,  // Use your authenticated OData service
                adaptor: new ODataAdaptor(),
                headers: [
                    { 'Authorization': `Bearer ${this.getAuthToken()}` }
                ]
            }),
            rows: [{ name: 'CustomerID' }],
            columns: [{ name: 'OrderDate' }],
            values: [{ name: 'Freight', type: 'Sum' }]
        };
    }

    private getAuthToken(): string {
        return localStorage.getItem('authToken') || '';
    }
}
```

### OData V4 Service Binding

⚠️ **Use only with your own authenticated OData V4 services.**

For OData V4 services, use the [`ODataV4Adaptor`](https://ej2.syncfusion.com/angular/documentation/data/adaptors#odatav4-adaptor):

```typescript
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { environment } from '../environments/environment';

// ⚠️ SECURITY: Only use your own authenticated OData V4 endpoint
this.dataSourceSettings = {
    dataSource: new DataManager({
        url: environment.odataV4Endpoint,  // Your authenticated service
        adaptor: new ODataV4Adaptor(),
        headers: [
            { 'Authorization': `Bearer ${this.getAuthToken()}` }
        ]
    }),
    rows: [{ name: 'CustomerID' }],
    columns: [{ name: 'OrderDate' }],
    values: [{ name: 'Freight', type: 'Sum' }]
};
```

### Web API Binding

⚠️ **Use only with your own authenticated RESTful Web APIs.**

Connect to **authenticated** RESTful Web APIs using the [`WebApiAdaptor`](https://ej2.syncfusion.com/angular/documentation/data/adaptors#web-api-adaptor):

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { environment } from '../environments/environment';

// ⚠️ SECURITY: Only use your own authenticated Web API endpoint
this.dataSourceSettings = {
    dataSource: new DataManager({
        url: environment.webApiEndpoint,  // Your authenticated Web API
        adaptor: new WebApiAdaptor(),
        headers: [
            { 'Authorization': `Bearer ${this.getAuthToken()}` },
            { 'X-API-Key': environment.apiKey }
        ]
    }),
    rows: [{ name: 'Region' }],
    columns: [{ name: 'Product' }],
    values: [{ name: 'Sales', type: 'Sum' }]
};
```

### Dynamic Data Loading with HttpClient

⚠️ **SECURITY WARNING**: Always validate and sanitize data from remote sources.

For more control over data fetching with proper security measures, use Angular's HttpClient:

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-container',
    template: `<ejs-pivotview [dataSourceSettings]=dataSourceSettings></ejs-pivotview>`
})
export class AppComponent implements OnInit {
    public dataSourceSettings: DataSourceSettingsModel = {};

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        // ⚠️ SECURITY: Use authenticated endpoints with validation
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getAuthToken()}`,
            'Content-Type': 'application/json'
        });

        // Use environment-configured endpoint
        this.http.get(environment.trustedApiEndpoint, { headers }).subscribe({
            next: (data: any) => {
                // Validate data structure before binding
                if (this.validateDataStructure(data)) {
                    // Sanitize data before use
                    const sanitizedData = this.sanitizeData(data.records);
                    this.dataSourceSettings = {
                        dataSource: sanitizedData,
                        rows: [{ name: 'Region' }],
                        columns: [{ name: 'Product' }],
                        values: [{ name: 'Sales', type: 'Sum' }]
                    };
                } else {
                    console.error('Invalid data structure received');
                }
            },
            error: (error) => {
                console.error('Failed to fetch data:', error);
                // Handle error appropriately
            }
        });
    }

    private getAuthToken(): string {
        // Retrieve token from secure storage
        return localStorage.getItem('authToken') || '';
    }

    private validateDataStructure(data: any): boolean {
        // Implement validation logic
        return data && Array.isArray(data.records);
    }

    private sanitizeData(data: any[]): any[] {
        // Implement data sanitization
        // Remove or escape potentially harmful content
        return data.map(record => ({
            ...record,
            // Sanitize string fields to prevent XSS
        }));
    }
}
```

**Security Best Practices with HttpClient:**
1. ✅ Use authentication headers (Bearer tokens, API keys)
2. ✅ Store endpoints in environment configuration
3. ✅ Validate data structure before binding
4. ✅ Sanitize all data fields
5. ✅ Implement proper error handling
6. ✅ Use HTTPS only
7. ❌ Never use user-provided URLs
8. ❌ Never skip data validation

## OLAP Data Binding

OLAP (Online Analytical Processing) connects to cube-based data sources like SQL Server Analysis Services (SSAS) or Mondrian. OLAP data is pre-aggregated and organized in multi-dimensional hierarchies.

### OLAP Data Source Configuration

Configure the Pivot Table to connect to an OLAP cube:

```typescript
import { Component, OnInit } from '@angular/core';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';

@Component({
    selector: 'app-container',
    template: `<ejs-pivotview [dataSourceSettings]=dataSourceSettings></ejs-pivotview>`
})
export class AppComponent implements OnInit {
    public dataSourceSettings: DataSourceSettingsModel;

    ngOnInit(): void {
        this.dataSourceSettings = {
            catalog: 'Adventure Works DW 2008 SE',
            cube: 'Adventure Works',
            providerType: 'SSAS',
            enableSorting: true,
            url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
            localeIdentifier: 1033
        };
    }
}
```

### Adding OLAP Cube Elements

Define rows, columns, values, and filters using OLAP hierarchies and measures:

```typescript
this.dataSourceSettings = {
    catalog: 'Adventure Works DW 2008 SE',
    cube: 'Adventure Works',
    providerType: 'SSAS',
    url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
    rows: [
        { name: '[Customer].[Customer Geography].[Country]', caption: 'Country' }
    ],
    columns: [
        { name: '[Product].[Product Categories].[Category]', caption: 'Product Category' }
    ],
    values: [
        { name: '[Measures].[Customer Count]', caption: 'Customer Count' },
        { name: '[Measures].[Internet Sales Amount]', caption: 'Internet Sales Amount' }
    ],
    filters: []
};
```

### When to Use OLAP

**Best for:**
- Multi-dimensional analysis
- Pre-aggregated enterprise data
- Complex hierarchies (Year → Quarter → Month)
- Large data volumes with fast query performance
- Organizations using SSAS or other OLAP servers

**Not ideal for:**
- Small datasets (overhead of cube infrastructure)
- Real-time transaction data
- Simple relational data analysis

## Server-Side Pivot Engine

For very large datasets (100K+ rows), the server-side Pivot Engine processes data on an ASP.NET Core server, reducing client-side load and improving performance.

### Prerequisites

1. Download and install the [Server-side Pivot Engine](https://github.com/SyncfusionExamples/server-side-pivot-engine-for-pivot-table) from GitHub
2. Ensure the application includes:
   - **PivotController.cs**: Handles client-server communication
   - **DataSource.cs**: Defines data source models
   - **Syncfusion.Pivot.Engine** NuGet package

### Connecting to Server-Side Engine

Configure the Pivot Table to use server-side mode:

```typescript
import { Component, OnInit } from '@angular/core';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';

@Component({
    selector: 'app-container',
    template: `<ejs-pivotview [dataSourceSettings]=dataSourceSettings></ejs-pivotview>`
})
export class AppComponent implements OnInit {
    public dataSourceSettings: DataSourceSettingsModel;

    ngOnInit(): void {
        this.dataSourceSettings = {
            url: 'https://localhost:44350/api/pivot/post',
            mode: 'Server',
            rows: [{ name: 'ProductID', caption: 'Product ID' }],
            columns: [{ name: 'Year', caption: 'Production Year' }],
            values: [
                { name: 'Sold', caption: 'Units Sold' },
                { name: 'Price', caption: 'Sold Amount' }
            ],
            formatSettings: [
                { name: 'Price', format: 'C' }
            ]
        };
    }
}
```

### Server-Side Data Configuration

Define your data source in the server-side application's **DataSource.cs**:

```csharp
public class PivotViewData
{
    public string ProductID { get; set; }
    public string Country { get; set; }
    public string Product { get; set; }
    public double Sold { get; set; }
    public double Price { get; set; }
    public string Year { get; set; }

    public List<PivotViewData> GetData()
    {
        // Return data from database, CSV, JSON, or collection
    }
}
```

In **PivotController.cs**:

```csharp
private PivotEngine<PivotViewData> pivotEngine = new PivotEngine<PivotViewData>();

[HttpPost]
public async Task<object> GetData(FetchData param)
{
    return await _cache.GetOrCreateAsync("dataSource" + param.Hash, async (cacheEntry) =>
    {
        cacheEntry.SetSize(1);
        cacheEntry.AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(60);
        return new DataSource.PivotViewData().GetData();
    });
}
```

### Supported Server-Side Data Sources

- **Collection**: List<T> or IEnumerable
- **JSON**: From *.json files or API endpoints
- **CSV**: From *.csv files or web services
- **DataTable**: From SQL Server or other databases
- **Dynamic**: From any custom data source

---

## Choosing the Right Data Source

⚠️ **SECURITY NOTE**: Always prioritize security when choosing data sources. Use local data when possible, and implement proper authentication and validation for remote sources.

| Scenario | Recommended | Reason | Security Consideration |
|----------|-------------|--------|------------------------|
| **Small dataset (<50K rows)** | Local JSON or CSV | Fast, simple setup, client-side processing | ✅ Most secure - no external dependencies |
| **Medium dataset (50K-100K)** | Local JSON + DataManager | Flexible, optimized data loading | ✅ Secure with local data |
| **Large dataset (>100K)** | Server-Side Engine | Reduces client load, optimal performance | ⚠️ Requires authenticated backend |
| **Multi-dimensional analysis** | OLAP | Pre-aggregated, hierarchical data | ⚠️ Must use authenticated OLAP server |
| **Real-time transactions** | Authenticated API | Direct database connection via API | ⚠️ Requires authentication, validation |
| **File uploads** | Validated JSON/CSV upload | Flexible user data import | ⚠️ Validate and sanitize uploaded files |
| **Enterprise BI** | OLAP or Server-Side | Integrated with enterprise infrastructure | ⚠️ Enterprise authentication required |
| **Bandwidth-limited** | Local CSV | Compact format, ~50% size of JSON | ✅ Secure with local data |

### Performance Considerations

**Client-Side (JSON/CSV):**
- ✓ Instant local filtering/sorting
- ✓ Works offline
- ✗ Limited to ~100K rows
- ✗ Full dataset in memory

**Server-Side Engine:**
- ✓ Handles millions of rows
- ✓ Server performs heavy lifting
- ✓ Only viewport data sent to client
- ✗ Requires ASP.NET Core backend
- ✗ Network latency for operations

**OLAP:**
- ✓ Lightning-fast pre-aggregated queries
- ✓ Complex hierarchies
- ✗ Setup overhead
- ✗ Not for real-time data

---

## Security Summary

### ✅ Recommended Secure Practices

1. **Default to Local Data**: Use in-memory arrays whenever possible
2. **Authenticate Remote Sources**: Always use authentication headers for remote data
3. **Environment Configuration**: Store all endpoints in environment files
4. **Data Validation**: Validate all external data before binding
5. **HTTPS Only**: Never use HTTP for remote connections
6. **Error Handling**: Implement proper error handling for failed requests
7. **Rate Limiting**: Implement rate limiting on backend APIs
8. **Audit Logging**: Log all data access attempts

### ❌ Security Anti-Patterns to Avoid

1. **Never accept user-provided URLs** for data sources
2. **Never bind to untrusted public APIs** without validation
3. **Never skip authentication** on remote endpoints
4. **Never hardcode API keys** or tokens in source code
5. **Never trust external data** without validation
6. **Never use HTTP** for sensitive data transmission
7. **Never expose internal API endpoints** publicly without authentication
8. **Never ignore CORS policies** - they exist for security

### 🔒 Implementation Checklist

Before implementing remote data binding:

- [ ] Is the data source trusted and under my control?
- [ ] Have I implemented authentication (tokens, API keys)?
- [ ] Are endpoints stored in environment configuration?
- [ ] Have I implemented data validation and sanitization?
- [ ] Am I using HTTPS for all remote connections?
- [ ] Have I implemented proper error handling?
- [ ] Have I added rate limiting to backend APIs?
- [ ] Have I tested with malicious data inputs?

**If you answered "No" to any of these, use local data instead or implement the missing security measures before proceeding.**
