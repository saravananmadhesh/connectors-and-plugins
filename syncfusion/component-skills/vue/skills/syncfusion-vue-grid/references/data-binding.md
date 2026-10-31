# Data Binding

## Table of Contents
- [Overview](#overview)
- [When to Use](#when-to-use)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [DataManager Adaptors](#datamanager-adaptors)
- [CRUD Operations](#crud-operations)
- [Loading Indicators](#loading-indicators)
- [Real-Time Updates](#real-time-updates)
- [Refreshing and Updating Data](#refreshing-and-updating-data)
- [Offline Mode](#offline-mode)
- [Immutable Mode](#immutable-mode)
- [Timezone Handling](#timezone-handling)
- [Export Operations](#export-operations)

## Overview

Data binding connects the Grid to data sources through the `dataSource` property. Vue Grid supports:

**Local Data**: JavaScript arrays or DataManager with offline mode
**Remote Data**: REST APIs via DataManager with various adaptors
**Real-Time**: SignalR, WebSockets, or custom event-based updates

The DataManager handles paging, sorting, filtering, grouping server-side, reducing client memory usage for large datasets.

## When to Use

Use this reference when you need to:
- Bind local arrays directly to Grid
- Connect to REST APIs (OData, Web API, custom endpoints)
- Handle real-time data with SignalR
- Import and bind Excel file data
- Perform CRUD operations (add, edit, delete)
- Implement server-side paging/filtering for performance
- Display loading indicators during data fetch
- Work with custom data adaptors
- Manage timezone conversions for dates

## Local Data Binding

### Basic Array Binding & Local DataManager

Bind data directly or use DataManager:

```vue
<!-- Direct binding -->
<ejs-grid :dataSource="gridData"></ejs-grid>

<!-- With DataManager -->
const gridData = new DataManager(data);
```

### Importing Excel Files

```javascript
import * as XLSX from 'xlsx';

const parseExcel = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const workbook = XLSX.read(e.target.result, { type: 'array' });
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    grid.value.ej2Instances.dataSource = jsonData;
  };
  reader.readAsArrayBuffer(file.rawFile);
};
```

## Remote Data Binding

### Using DataManager with OData/REST

```javascript
// OData v2 or v4
const data = new DataManager({
  url: 'url',
  adaptor: new ODataAdaptor(), // or ODataV4Adaptor
  offline: false
});

// Or with Fetch
const gridData = ref([]);
onMounted(async () => {
  const response = await fetch('url');
  gridData.value = await response.json();
});
```



## DataManager Adaptors

**ODataAdaptor** - OData v2 | **ODataV4Adaptor** - OData v4 | **WebApiAdaptor** - ASP.NET Web API | **UrlAdaptor** - Custom REST | **GraphQLAdaptor** - GraphQL

```javascript
// ODataV4
const data = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor()
});

// WebApiAdaptor with CRUD URLs
const data = new DataManager({
  url: 'url',
  insertUrl: 'url',
  updateUrl: 'url',
  removeUrl: 'url',
  adaptor: new WebApiAdaptor()
});

// Custom adaptor with headers
class CustomAdaptor extends WebApiAdaptor {
  beforeSend(dm, request) {
    request.headers.set('Authorization', 'send_token');
    super.beforeSend(dm, request);
  }
}
```

## CRUD Operations

```vue
<!-- Enable editing with toolbar -->
:editSettings="{ allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' }"
:toolbar="['Add', 'Edit', 'Delete', 'Update', 'Cancel']"
```

DataManager with CRUD URLs handles insert/update/delete automatically when primary key is set.

For manual CRUD, use `actionBegin` event:

```javascript
const actionBegin = (args) => {
  if (args.requestType === 'save') addRecord(args.data);
  else if (args.requestType === 'delete') deleteRecord(args.data[0]?.OrderID);
};
```

## Loading Indicators

```javascript
// Show/hide spinner
grid.value.showSpinner();  // Shows during data load
grid.value.hideSpinner();  // Hide after load completes

// Types: Spinner (default) or Shimmer
loadingIndicator = { indicatorType: 'Shimmer' };
```

## Real-Time Updates (SignalR)

Automatic grid refresh when server data updates:

```javascript
const connection = new signalR.HubConnectionBuilder()
  .withUrl("url").build();

const created = () => {
  connection.on("ReceiveMessage", () => grid.value?.refresh());
  connection.start();
};

const actionComplete = (args) => {
  if (args.requestType === 'save' || args.requestType === 'delete')
    connection.invoke('SendMessage', "refreshPages");
};
```

## Refreshing and Updating Data

```javascript
// Add new record and refresh
grid.value.dataSource.unshift(newRecord);
grid.value.setProperties({ dataSource: grid.value.dataSource });

// Change datasource and columns
grid.value.changeDataSource(newData, newColumns);

// Change only datasource (keep columns)
grid.value.changeDataSource(newData);

// Change only columns (keep datasource)
grid.value.changeDataSource(null, newColumns);

// Execute query with DataManager
const query = new Query();
dataManager.executeQuery(query).then(response => {
  grid.value.dataSource = response.result;
});
```

## Offline Mode

Process all data client-side (no server calls for paging/filter/sort):

```javascript
const data = new DataManager({
  url: "url",
  adaptor: new ODataAdaptor(),
  offline: true  // Enable offline mode
});
```

**Use for:** <1000 records, all visible at once, no real-time updates needed

## Immutable Mode

Optimize re-rendering by only updating changed rows:

```vue
:enableImmutableMode="true"
```

**When to use:** Large datasets with frequent updates, performance-critical apps

**Limitations:** No frozen rows/columns, grouping, row templates, virtual scroll

## Timezone Handling

Prevent timezone conversion for dates:

```javascript
import { DataUtil } from "@syncfusion/ej2-data";

// Set offset to 0 to prevent conversion
DataUtil.serverTimezoneOffset = 0;
```

Or use custom timezone offset (e.g., 5 for UTC+5)

## Export Operations

Export entire dataset (not just current page):

```javascript
const toolbarClick = (args) => {
  grid.value.showSpinner();
  
  // Get all records
  const state = { skip: 0, take: grid.value.ej2Instances.pageSettings.totalRecordsCount };
  
  if (args.item.text === 'Excel Export') {
    grid.value.excelExport({ dataSource: allRecords });
  } else if (args.item.text === 'PDF Export') {
    grid.value.pdfExport({ dataSource: allRecords });
  }
  
  grid.value.hideSpinner();
};
```

Enable with `:toolbar="['ExcelExport', 'PdfExport']"` and `:allowExcelExport="true"` `:allowPdfExport="true"`
