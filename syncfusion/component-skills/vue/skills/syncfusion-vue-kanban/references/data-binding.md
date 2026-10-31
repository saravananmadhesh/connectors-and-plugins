# Data Binding for Syncfusion Vue Kanban

## Table of Contents
- [Overview](#overview)
- [Local Data](#local-data)
- [Remote Data](#remote-data)
  - [OData](#odata)
  - [OData v4](#odata-v4)
  - [Web API](#web-api)
  - [URL Adaptor (CRUD)](#url-adaptor-crud)
  - [Custom Adaptor](#custom-adaptor)
- [Extra Query Parameters](#extra-query-parameters)
- [Loading Data via Ajax](#loading-data-via-ajax)
- [Handling HTTP Errors](#handling-http-errors)

## Overview

The Kanban `dataSource` property accepts either a plain JavaScript array or a `DataManager` instance.
`DataManager` defaults to `JsonAdaptor` for local arrays and `ODataAdaptor` for remote URLs.

Decision guide:
- **Static / pre-fetched data?** → Use a local array.
- **REST / OData endpoint?** → Use `DataManager` with the matching adaptor.
- **Need CRUD (create/update/delete)?** → Use `UrlAdaptor` with separate CRUD URLs.

## Local Data

Pass a deep-cloned array to `dataSource`. The board mutates card order during drag-and-drop, so always clone the source:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData" :cardSettings="cardSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns }
  from '@syncfusion/ej2-vue-kanban';
import { extend } from '@syncfusion/ej2-base';
import { kanbanData as source } from './datasource.js';

const kanbanData  = extend([], source, null, true); // deep clone
const cardSettings = { contentField: 'Summary', headerField: 'Id' };
</script>
```

> By default `DataManager` uses `JsonAdaptor` when the `dataSource` is a plain array.

## Remote Data

### OData

```vue
<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns }
  from '@syncfusion/ej2-vue-kanban';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

const kanbanData = new DataManager({
  url: 'https://services.syncfusion.com/vue/production/api/Kanban',
  adaptor: new ODataAdaptor(),
  crossDomain: true
});
const cardSettings = { contentField: 'Summary', headerField: 'Id' };

// Disable drag-and-drop when remote data can't be mutated client-side
const dialogOpen = (args) => { args.cancel = true; };
</script>
```

> Set `allowDragAndDrop="false"` when the remote source does not support server-side update.

### OData v4

Use `ODataV4Adaptor` for v4 endpoints (e.g. Northwind OData):

```vue
<script setup>
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const kanbanData = new DataManager({
  url: 'https://services.odata.org/v4/northwind/northwind.svc/Suppliers',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});
// Map keyField and cardSettings to match the OData entity fields
const cardSettings = { contentField: 'ContactName', headerField: 'SupplierID' };
</script>
```

### Web API

Use `WebApiAdaptor` for ASP.NET Web API endpoints:

```vue
<script setup>
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const kanbanData = new DataManager({
  url: '/api/Tasks',
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});
</script>
```

Server-side controller (C#):
```csharp
[HttpGet]
public object Get()
{
    var data = OrdersDetails.GetAllRecords().ToList();
    return data;
}
```

### URL Adaptor (CRUD)

`UrlAdaptor` supports individual CRUD operations via separate endpoints:

```vue
<script setup>
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const kanbanData = new DataManager({
  url: 'Home/DataSource',
  updateUrl: 'Home/Update',
  insertUrl: 'Home/Insert',
  removeUrl: 'Home/Delete',
  adaptor: new UrlAdaptor(),
  crossDomain: true
});
</script>
```

- `insertUrl` — single card creation
- `updateUrl` — single card update
- `removeUrl` — single card delete
- `crudUrl` — bulk operations (used with multi-select + sort by Index)

### Custom Adaptor

Extend a built-in adaptor and override `processResponse` to transform server data before the board renders it:

```vue
<script setup>
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

class TaskIdAdaptor extends ODataAdaptor {
  processResponse() {
    let i = 0;
    const original = super.processResponse.apply(this, arguments);
    // Prepend a human-readable prefix to each card ID
    original.forEach(item => { item['Id'] = 'Task - ' + ++i; });
    return original;
  }
}

const kanbanData = new DataManager({
  url: 'https://services.syncfusion.com/vue/production/api/Kanban',
  adaptor: new TaskIdAdaptor()
});
</script>
```

## Extra Query Parameters

Add custom parameters to every request using `Query.addParams`, then bind the query to the Kanban `query` prop:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :query="query">
    ...
  </ejs-kanban>
</template>

<script setup>
import { DataManager, ODataAdaptor, Query } from '@syncfusion/ej2-data';

const kanbanData = new DataManager({ url: 'https://...', adaptor: new ODataAdaptor(), crossDomain: true });
const cardSettings = { contentField: 'Summary', headerField: 'Id' };
const query = new Query().addParams('ej2kanban', 'true');
</script>
```

The added parameter travels with every board request (initial load, drag-and-drop saves, etc.).

## Loading Data via Ajax

Fetch data yourself with the Syncfusion `Ajax` helper and assign it to `dataSource` at runtime:

```vue
<template>
  <button @click="loadData">Load Data</button>
  <ejs-kanban ref="kanbanRef" keyField="ShipCountry" :cardSettings="cardSettings">
    <e-columns>
      <e-column headerText="Denmark"     keyField="Denmark"></e-column>
      <e-column headerText="Brazil"      keyField="Brazil"></e-column>
      <e-column headerText="Switzerland" keyField="Switzerland"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns }
  from '@syncfusion/ej2-vue-kanban';
import { Ajax } from '@syncfusion/ej2-base';
import { ref } from 'vue';

const kanbanRef = ref(null);
const cardSettings = { contentField: 'ShippedDate', headerField: 'OrderID' };

const loadData = () => {
  const ajax = new Ajax('https://services.syncfusion.com/vue/production/api/Orders', 'GET');
  ajax.send();
  ajax.onSuccess = (result) => {
    kanbanRef.value.ej2Instances.dataSource = JSON.parse(result);
  };
};
</script>
```

> After loading via Ajax the data acts as local — server-side CRUD is not available.

## Handling HTTP Errors

Catch errors from the remote service using the `actionFailure` event:

```vue
<template>
  <ejs-kanban ref="kanbanRef" keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :actionFailure="onActionFailure">
    ...
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns }
  from '@syncfusion/ej2-vue-kanban';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';
import { ref } from 'vue';

const kanbanRef = ref(null);
const kanbanData = new DataManager({ url: 'http://invalid-url.com', adaptor: new ODataAdaptor() });
const cardSettings = { contentField: 'Summary', headerField: 'Id' };

const onActionFailure = () => {
  const span = document.createElement('span');
  span.style.color = '#FF0000';
  span.innerHTML = 'Server error: could not load data';
  kanbanRef.value.ej2Instances.element.parentNode.insertBefore(
    span, kanbanRef.value.ej2Instances.element
  );
};
</script>
```

`actionFailure` fires for HTTP errors **and** for any exception during board actions (drag, CRUD).
