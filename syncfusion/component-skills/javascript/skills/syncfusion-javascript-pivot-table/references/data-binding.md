# Data Binding

## ⚠️ SECURITY NOTICE

**All remote data connections MUST use authenticated, configuration-based endpoints.** Never hardcode URLs or use untrusted data sources.

✅ **Required Security Controls:**
- Configuration-based URLs (environment variables or config files)
- Authentication headers for API requests
- HTTPS/SSL for all remote connections
- Input validation and sanitization
- CORS configuration for trusted origins only

## Table of Contents
- [Overview](#overview)
- [JSON Data Binding](#json-data-binding)
  - [Local JSON Data](#local-json-data)
  - [JSON with DataManager](#json-with-datamanager)
  - [Loading from JSON Files](#loading-from-json-files)
  - [Remote JSON Data](#remote-json-data)
- [CSV Data Binding](#csv-data-binding)
  - [Local CSV Data](#local-csv-data)
  - [Loading from CSV Files](#loading-from-csv-files)
  - [Remote CSV Data](#remote-csv-data)
- [Remote Data Binding](#remote-data-binding)
  - [OData Services](#odata-services)
  - [OData V4 Services](#odata-v4-services)
  - [Web API](#web-api)
  - [Custom Queries](#custom-queries)
- [Field Mapping](#field-mapping)
- [Values in Row Axis](#values-in-row-axis)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

The Pivot View supports multiple data binding options to accommodate various data sources and scenarios. You can bind data from local arrays, remote services, CSV files, or external APIs using different adaptors.

**Supported data source types:**
- JSON (local arrays, remote endpoints)
- CSV (string arrays, remote endpoints)
- OData and OData V4 services
- Web API (RESTful services)
- Custom adaptors

## JSON Data Binding

JSON is the default data type for Pivot View. You can bind JSON data without explicitly setting the `type` property.

### Local JSON Data

Bind a local JavaScript array directly to the Pivot View:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Sample data structure (datasource.ts):**

```typescript
export let pivotData: Object[] = [
    { Sold: 31, Amount: 52824, Country: 'France', Products: 'Mountain Bikes', Year: 'FY 2015', Quarter: 'Q1' },
    { Sold: 51, Amount: 86904, Country: 'France', Products: 'Mountain Bikes', Year: 'FY 2015', Quarter: 'Q2' },
    { Sold: 90, Amount: 153360, Country: 'France', Products: 'Mountain Bikes', Year: 'FY 2015', Quarter: 'Q3' },
    { Sold: 25, Amount: 42600, Country: 'France', Products: 'Mountain Bikes', Year: 'FY 2015', Quarter: 'Q4' },
    { Sold: 27, Amount: 46008, Country: 'France', Products: 'Mountain Bikes', Year: 'FY 2016', Quarter: 'Q1' }
];
```

### JSON with DataManager

Use DataManager with JsonAdaptor for advanced data operations (optional for local data):

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { DataManager, JsonAdaptor } from '@syncfusion/ej2-data';
import { pivotData } from './datasource';

let dataManager: DataManager = new DataManager({ 
    json: pivotData, 
    adaptor: new JsonAdaptor 
});

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: dataManager,
        rows: [{ name: 'Country' }, { name: 'Products' }],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Loading from JSON Files

Load JSON data from a local .json file using file uploader:

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';
import { Uploader } from '@syncfusion/ej2-inputs';

// Initialize file uploader
let uploadObj: Uploader = new Uploader();
uploadObj.appendTo('#fileupload');

let input = document.querySelector('input[type="file"]');

input.addEventListener('change', function (e: Event) {
    let reader: FileReader = new FileReader();
    
    reader.onload = function () {
        // Parse JSON string
        let result: any = JSON.parse(reader.result as string);
        
        // Bind to Pivot View
        let pivotTableObj: PivotView = new PivotView({
            dataSourceSettings: {
                dataSource: result,
                rows: [{ name: 'Country' }],
                columns: [{ name: 'Year' }],
                values: [{ name: 'Sold' }]
            },
            height: 350
        });
        pivotTableObj.appendTo('#PivotTable');
    };
    
    reader.readAsText((input as any).files[0]);
});
```

### Remote JSON Data

Bind JSON data from a remote URL:

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        url: 'https://cdn.syncfusion.com/data/sales-analysis.json',
        expandAll: false,
        rows: [{ name: 'EnerType', caption: 'Energy Type' }],
        columns: [{ name: 'EneSource', caption: 'Energy Source' }],
        values: [
            { name: 'PowUnits', caption: 'Units (GWh)' },
            { name: 'ProCost', caption: 'Cost (MM)' }
        ],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Note:** The `url` property accepts both direct JSON file URLs and web service endpoints returning JSON.

## CSV Data Binding

CSV format is more compact than JSON (approximately 50% smaller), reducing bandwidth usage.

### Local CSV Data

Convert CSV string to string array and bind:

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';
import { csvdata } from './datasource';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: getCSVData(),
        type: 'CSV',  // Required for CSV data
        expandAll: false,
        rows: [{ name: 'Region' }, { name: 'Country' }],
        columns: [{ name: 'Item Type' }, { name: 'Sales Channel' }],
        values: [
            { name: 'Total Cost' },
            { name: 'Total Revenue' },
            { name: 'Total Profit' }
        ],
        formatSettings: [
            { name: 'Total Cost', format: 'C0' },
            { name: 'Total Revenue', format: 'C0' },
            { name: 'Total Profit', format: 'C0' }
        ],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');

// Convert CSV string to string[][]
function getCSVData(): string[][] {
    let dataSource: string[][] = [];
    let jsonObject: string[] = csvdata.split(/\r?\n|\r/);
    
    for (let i: number = 0; i < jsonObject.length; i++) {
        if (!isNullOrUndefined(jsonObject[i]) && jsonObject[i] !== '') {
            dataSource.push(jsonObject[i].split(','));
        }
    }
    return dataSource;
}
```

**Sample CSV data (datasource.ts):**

```typescript
export let csvdata: string = 
`Region,Country,Item Type,Sales Channel,Order Priority,Order Date,Order ID,Ship Date,Units Sold,Unit Price,Unit Cost,Total Revenue,Total Cost,Total Profit
Sub-Saharan Africa,South Africa,Fruits,Offline,M,7/27/2012,443368995,7/28/2012,1593,9.33,6.92,14862.69,11023.56,3839.13
Europe,France,Vegetables,Online,M,3/29/2012,961950877,4/4/2012,1426,154.06,90.93,219748.56,129686.18,90062.38`;
```

### Loading from CSV Files

Load CSV data from a local .csv file:

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';
import { Uploader } from '@syncfusion/ej2-inputs';

let uploadObj: Uploader = new Uploader();
uploadObj.appendTo('#fileupload');

let input = document.querySelector('input[type="file"]');

input.addEventListener('change', function (e: Event) {
    let reader: FileReader = new FileReader();
    
    reader.onload = function () {
        // Convert CSV string to string[][]
        let result: string[][] = (reader.result as string)
            .split('\n')
            .map(line => line.split(','));
        
        // Bind to Pivot View
        let pivotTableObj: PivotView = new PivotView({
            dataSourceSettings: {
                dataSource: result,
                type: 'CSV',
                rows: [{ name: 'Region' }],
                columns: [{ name: 'Item Type' }],
                values: [{ name: 'Total Revenue' }]
            },
            height: 350
        });
        pivotTableObj.appendTo('#PivotTable');
    };
    
    reader.readAsText((input as any).files[0]);
});
```

### Remote CSV Data

Bind CSV data from a remote URL:

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        url: 'https://bi.syncfusion.com/productservice/api/sales',
        type: 'CSV',
        expandAll: false,
        rows: [{ name: 'Region' }, { name: 'Country' }],
        columns: [{ name: 'Item Type' }, { name: 'Sales Channel' }],
        values: [
            { name: 'Total Cost' },
            { name: 'Total Revenue' },
            { name: 'Total Profit' }
        ],
        formatSettings: [
            { name: 'Total Cost', format: 'C0' },
            { name: 'Total Revenue', format: 'C0' },
            { name: 'Total Profit', format: 'C0' }
        ],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## Remote Data Binding

Connect to remote data sources using DataManager with appropriate adaptors.

### OData Services

Bind to OData services using ODataAdaptor:

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

let data: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/js/production/api/Orders',
    adaptor: new ODataAdaptor,
    crossDomain: true
});

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: data,
        expandAll: true,
        rows: [
            { name: 'OrderID', caption: 'Order ID' },
            { name: 'OrderDate', caption: 'Order Date' }
        ],
        columns: [{ name: 'CustomerID', caption: 'Customer Name' }],
        values: [{ name: 'Freight' }],
        filters: []
    },
    height: 350,
    gridSettings: { columnWidth: 120 }
});
pivotTableObj.appendTo('#PivotTable');
```

### OData V4 Services

Bind to OData V4 services using ODataV4Adaptor:

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

let data: DataManager = new DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
});

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: data,
        expandAll: true,
        rows: [
            { name: 'OrderID', caption: 'Order ID' },
            { name: 'OrderDate', caption: 'Order Date' }
        ],
        columns: [{ name: 'CustomerID', caption: 'Customer Name' }],
        values: [{ name: 'Freight' }],
        filters: []
    },
    height: 350,
    gridSettings: { columnWidth: 120 }
});
pivotTableObj.appendTo('#PivotTable');
```

### Web API

Bind to RESTful Web API using WebApiAdaptor:

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

let data: DataManager = new DataManager({
    url: 'https://bi.syncfusion.com/northwindservice/api/orders',
    adaptor: new WebApiAdaptor,
    crossDomain: true
});

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: data,
        expandAll: true,
        rows: [
            { name: 'ShipCountry', caption: 'Ship Country' },
            { name: 'ShipCity', caption: 'Ship City' }
        ],
        columns: [{ name: 'ProductName', caption: 'Product Name' }],
        values: [
            { name: 'Quantity' },
            { name: 'UnitPrice', caption: 'Unit Price' }
        ],
        formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Custom Queries

Apply custom queries to DataManager to filter, sort, or limit data:

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

let remoteData: DataManager = new DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
});

// Apply custom query to limit records
remoteData.defaultQuery = new Query().take(100).skip(0);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: remoteData,
        expandAll: false,
        rows: [
            { name: 'ShipCountry', caption: 'Ship Country' },
            { name: 'ShipCity', caption: 'Ship City' }
        ],
        columns: [{ name: 'CustomerID', caption: 'Customer ID' }],
        values: [{ name: 'Freight' }]
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Common Query operations:**
- `take(n)` - Limit number of records
- `skip(n)` - Skip first n records (for paging)
- `where('field', 'operator', value)` - Filter records
- `sortBy('field', 'ascending|descending')` - Sort records

## Field Mapping

Customize field properties without modifying initial report configuration:

```typescript
import { PivotView, IDataSet, GroupingBar, FieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

PivotView.Inject(GroupingBar, FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year', caption: 'Production Year' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }],
        filters: [],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        
        // Field mapping for fields not in initial report
        fieldMapping: [
            { name: 'Quarter', showSortIcon: false },
            { name: 'Products', showFilterIcon: false, showRemoveIcon: false },
            { name: 'Amount', showValueTypeIcon: false, caption: 'Sold Amount' }
        ]
    },
    showGroupingBar: true,
    showFieldList: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Common field mapping properties:**
- `name` - Field name from data source
- `caption` - Display name
- `dataType` - 'string', 'number', 'datetime', 'date', 'boolean'
- `type` - Aggregation type (Sum, Count, Avg, Min, Max, etc.)
- `showFilterIcon` - Show/hide filter icon
- `showSortIcon` - Show/hide sort icon
- `showRemoveIcon` - Show/hide remove icon
- `showValueTypeIcon` - Show/hide aggregation type icon
- `allowDragAndDrop` - Enable/disable drag-and-drop

## Values in Row Axis

Display value fields in row axis instead of column axis:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        valueAxis: 'row',  // Place values in row axis
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Default:** `valueAxis: 'column'`

## Common Patterns

### Pattern 1: Load Data Dynamically

Update data source at runtime:

```typescript
// Change data source
pivotTableObj.dataSourceSettings.dataSource = newPivotData;
pivotTableObj.refresh();
```

### Pattern 2: Handle Large Datasets

Use paging or virtual scrolling for large datasets:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeDataset,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    },
    enableVirtualization: true,  // Enable virtual scrolling
    height: 350
});
```

### Pattern 3: Remote Data with Custom Headers

Add authentication headers for secure APIs:

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

let data: DataManager = new DataManager({
    url: 'https://api.example.com/data',
    adaptor: new WebApiAdaptor,
    headers: [
        { 'Authorization': 'Bearer YOUR_TOKEN' },
        { 'Content-Type': 'application/json' }
    ]
});
```

## Troubleshooting

### Data Not Displaying

**Issue:** Pivot table shows no data

**Solutions:**
1. Verify data source is not empty
2. Check field names match data source exactly (case-sensitive)
3. Ensure at least one field in rows, columns, and values
4. For CSV: verify `type: 'CSV'` is set
5. Check browser console for errors

### Remote Data Loading Errors

**Issue:** CORS errors or data not loading from remote source

**Solutions:**
1. Set `crossDomain: true` in DataManager
2. Verify server supports CORS
3. Check URL is accessible and returns expected format
4. Test URL in browser or Postman first
5. Verify adaptor type matches service (OData, ODataV4, WebApi)

### CSV Parsing Issues

**Issue:** CSV data displays incorrectly

**Solutions:**
1. Verify CSV format (comma-separated, no missing commas)
2. Handle line endings correctly (`\r?\n|\r`)
3. Check for empty rows in CSV data
4. Ensure first row contains field names
5. Quote fields containing commas

### Field Mapping Not Applied

**Issue:** fieldMapping properties not working

**Solutions:**
1. Verify field names match data source exactly
2. Field mapping applies only to fields NOT in initial report
3. Initial report configuration takes priority over field mapping
4. Check if GroupingBar or FieldList modules are injected

### DataManager Query Not Working

**Issue:** Custom query not filtering/limiting data

**Solutions:**
1. Verify query syntax: `new Query().take(10)`
2. Apply query to `defaultQuery` property before assigning to Pivot View
3. Check if adaptor supports the query operation
4. Test query with simple operations first (take, skip)

---

**Next Steps:**
- Explore database connections (SQL Server, MongoDB, MySQL, etc.)
- Configure field settings (captions, aggregation types)
- Apply filtering and sorting
- Enable performance features (virtual scrolling, paging)
