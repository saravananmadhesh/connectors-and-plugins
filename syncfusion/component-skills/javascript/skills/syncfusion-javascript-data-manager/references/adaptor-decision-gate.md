# Adaptor Decision Gate — Human Approval Required

## ⚠️ MANDATORY HUMAN GATE: Adaptor Selection

**This gate is NON-NEGOTIABLE and MUST be triggered whenever a user provides a service URL without explicitly naming the adaptor type.**

If the agent cannot determine with 100% certainty which adaptor to use from the user's request, it **MUST STOP**, present this gate, and **wait for explicit user confirmation** before generating any `DataManager` code.

---

## Trigger Conditions

Trigger this gate when the user prompt matches ANY of the following:

| Condition | Example Prompt |
|-----------|---------------|
| Provides a URL with no adaptor keyword | `"Use this service URL: http://myapi.company.com/employees"` |
| Says "REST API" without specifying format | `"Connect to my REST API at http://myapi.company.com"` |
| Uses generic terms: "service", "endpoint", "backend" | `"Build an employee app using this service (http://myurl)"` |
| URL path is ambiguous (`/api/`, `/data/`, `/svc/`) | `"http://myserver/api/employees"` |
| User says "I have a service URL" | `"Can you create a simple employee DB using this service URL (http://customurl)"` |
| No mention of OData, GraphQL, Web API protocol | Any URL without protocol context |
| Ambiguous about data source type | `"Build a grid that handles filtering and sorting"` (without specifying HTTP endpoint or local data) |
| Mentions "full control over data operations" | `"I need to manage paging, sorting, and filtering in my component"` |
| Mentions `dataStateChange` or `dataSourceChanged` without context | `"Handle dataStateChange event for my grid"` |
| User provides a **local data file URL** (JSON file, not API endpoint) | `"Use this data: https://example.com/data.json"` (static file, not dynamic endpoint) |

---

## Gate Presentation Template

When this gate is triggered, respond with **exactly** this format before generating any code:

---

### 🛑 Adaptor Selection — Human Approval Required

I need your confirmation before I can configure `DataManager` for your service URL.

**Service URL provided:** `{USER_PROVIDED_URL}`

To generate the correct data binding code, I need to know which adaptor matches your backend service. Please select one:

| Option | Adaptor | When to Choose |
|--------|---------|----------------|
| **A** | `ODataV4Adaptor` | Your service is an **OData v4** endpoint (URL contains `/odata/`, uses `$filter`, `$top`, `$skip`, `[EnableQuery]` on controller, returns `@odata.count`) |
| **B** | `ODataAdaptor` | Your service is an **OData v3** endpoint (older OData protocol, URL may reference `/Northwind.svc/` style paths) |
| **C** | `WebApiAdaptor` | Your service is an **ASP.NET Web API** that returns `{ Items: [...], Count: N }` and accepts OData-style query strings (`$filter`, `$orderby`, `$top`, `$skip`) via GET |
| **D** | `UrlAdaptor` | Your service is a **custom REST API** (POST-based) that returns `{ result: [...], count: N }` lowercase format, with full control over filtering/sorting/paging server-side |
| **E** | `GraphQLAdaptor` | Your service is a **GraphQL** endpoint (uses queries/mutations, not REST) |
| **F** | `CustomAdaptor` | Your service is **non-HTTP** (in-memory, gRPC, SignalR, Entity Framework direct) or has unique logic that none of the above handle |
| **G** | `Custom Binding` | When you need the grid to fetch data on demand from any backend API, use the custom binding option — the dataStateChange event helps trigger and handle those requests |

> 💡 **Not sure?** Describe your backend: Is it an ASP.NET Core controller? Does it use `[enableQuery]`? What does the response JSON look like? I'll identify the right adaptor for you.

---

## Decision Outcome → Code Generation

After the user confirms, proceed with the selected adaptor. Use the reference files below for exact code patterns.

### Outcome Mapping

| User Choice | Adaptor Enum | Reference File | Response Format | Request Method |
|-------------|-------------|----------------|-----------------|----------------|
| A — OData v4 | `ODataV4Adaptor` | `odatav4-adaptor.md` | `@odata.count` + `value[]` | GET + OData query params |
| B — OData v3 | `ODataAdaptor` | `adaptors.md#odataadaptor` | `{ result, count }` | GET + OData query params |
| C — Web API | `WebApiAdaptor` | `web-api-adaptor.md` | `{ Items, Count }` | GET + QueryString |
| D — URL / Custom REST | `UrlAdaptor` | `url-adaptor.md` | `{ result, count }` | POST + DataManagerRequest body |
| E — GraphQL | `GraphQLAdaptor` | `graphql-adaptor.md` | GraphQL JSON response | POST + GraphQL query |
| F — Custom / In-Memory | `CustomAdaptor` | `custom-adaptor.md` | N/A (fully custom) | N/A |
| G — Custom Binding | **Custom Binding** | `custom-binding.md` | `{ result: [...], count: N }` | Event-driven (dataStateChange, dataSourceChanged) |

---

## Adaptor Quick-Reference Cheat Sheet

### ODataV4Adaptor
```html
<div id="Grid"></div>
```
```ts
import { Grid, Page } from '@syncfusion/ej2-grids';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

Grid.Inject(Page);

const data: DataManager = new DataManager({
    url: 'url', // Replace with actual service URL
    adaptor: new ODataV4Adaptor()
});

const grid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    // columns
})
grid.appendTo('#Grid');
```
- **Server requirement:** `[enableQuery]` attribute on controller action
- **NuGet (server):** `Microsoft.AspNetCore.OData`
- **Auto-translates:** `$filter`, `$orderby`, `$skip`, `$top`, `$count=true`
- **CRUD HTTP verbs:** POST (insert), PATCH (update), DELETE (delete)

---

### ODataAdaptor (v3)
```html
<div id="Grid"></div>
```
```ts
import { Grid, Page } from '@syncfusion/ej2-grids';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Page);

const data: DataManager = new DataManager({
    url: 'url', // Replace with actual service URL
    adaptor: new ODataAdaptor()
});

const grid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    // columns
})
grid.appendTo('#Grid');
```
- **Server requirement:** OData v3 service (e.g., WCF Data Services or older ASP.NET OData)
- **NuGet (server):** `Microsoft.Data.OData`

---

### WebApiAdaptor
```html
<div id="Grid"></div>
```
```ts
import { Grid, Page } from '@syncfusion/ej2-grids';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Page);

const data: DataManager = new DataManager({
    url: 'url', // Replace with actual service URL
    adaptor: new WebApiAdaptor()
});

const grid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    // columns
})
grid.appendTo('#Grid');
```
- **Server requirement:** Returns `{ Items: [...], Count: N }` (case-sensitive keys)
- **Request method:** GET with `$skip`, `$top`, `$filter`, `$orderby` in QueryString
- **CRUD HTTP verbs:** POST (insert), PUT (update), DELETE (delete)

---

### UrlAdaptor
```html
<div id="Grid"></div>
```
```ts
import { Grid, Page } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Page);

const data: DataManager = new DataManager({
    url: 'url', // Replace with actual service URL
    adaptor: new UrlAdaptor()
});

const grid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    // columns
})
grid.appendTo('#Grid');
```
- **Server requirement:** POST endpoint accepting `DataManagerRequest` JSON body; returns `{ result: [...], count: N }` lowercase
- **Full manual control:** Apply `DataOperations.PerformFiltering/Sorting/Paging` server-side

---

### GraphQLAdaptor
```html
<div id="Grid"></div>
```
```ts
import { Grid, Page } from '@syncfusion/ej2-grids';
import { DataManager, GraphQLAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Page);

const data: DataManager = new DataManager({
    url: 'url',
    adaptor: new GraphQLAdaptor({
        response: {
            result: 'getProducts.result',
            count: 'getProducts.count'
        },
        query: `
            query getProducts($datamanager: DataManagerInput) {
                getProducts(datamanager: $datamanager) {
                    count
                    result {
                        productId
                        productName
                    }
                }
            }
        `
    })
});

const grid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    columns: [
        { field: 'productId', headerText: 'Product ID', width: 120 },
        { field: 'productName', headerText: 'Product Name', width: 180 }
    ]
})
grid.appendTo('#Grid');
```
- **Server requirement:** GraphQL schema with `DataManagerInput` type
- **Mutations required for CRUD:** `InsertMutation`, `UpdateMutation`, `DeleteMutation`

---

### CustomAdaptor
```html
<div id="Grid"></div>
```
```ts
import { Grid, Page } from '@syncfusion/ej2-grids';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { setValue } from '@syncfusion/ej2-base';

Grid.Inject(Page);
class CustomAdaptor extends ODataV4Adaptor {
    public processResponse(): Object {
        let i: number = 0;
        const original: any = super.processResponse.apply(this, arguments as any);
        // Adding serial number
        if (original.result) {
            original.result.forEach((item: any) => setValue('SNo', ++i, item));
        }
        return original;
    }
    public processQuery(dm: DataManager, query: Query): Object {
        dm.dataSource.url = 'url';
        query.addParams('Syncfusion in TypeScript Grid', 'true');
        return super.processQuery.apply(this, arguments as any);
    }
    public beforeSend(dm: DataManager, request: any, settings?: any): void {
        request.headers.set('Authorization', `Bearer ${(window as any).token}`);
        super.beforeSend(dm, request, settings);
    }
}

const data: DataManager = new DataManager({
    url: 'url', // Replace with actual service URL
    adaptor: new CustomAdaptor()
});
const grid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    columns: [
        { field: 'SNo', headerText: 'S.No', width: 80 },
        { field: 'OrderID', headerText: 'Order ID', width: 120 },
        { field: 'CustomerName', headerText: 'Customer Name', width: 180 }
    ]
})
grid.appendTo('#Grid');
```
- **Use when:** Non-HTTP source, Entity Framework, SignalR, gRPC, or unique business rules

---

### Custom Binding

```ts
// Custom Binding pattern for full control over data operations
import { Grid, Page, Sort, Filter, Group, Edit, Toolbar, DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-grids';
import { DataManager } from '@syncfusion/ej2-data';
Grid.Inject(Page, Sort, Filter, Group, Edit, Toolbar);
const allData = [
    { OrderID: 10248, CustomerName: 'Maria', ShipCity: 'Berlin' },
    { OrderID: 10249, CustomerName: 'Thomas', ShipCity: 'London' }
];
const grid = new Grid({
    dataSource: { result: allData, count: allData.length },
    allowPaging: true,
    allowSorting: true,
    allowFiltering: true,
    allowGrouping: true,
    pageSettings: {pageSize: 12 },
    editSettings: {
        allowAdding: true,
        allowDeleting: true,
        allowEditing: true
    },
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
    // Step 2: Handle Grid State Changes
    dataStateChange: async (args: DataStateChangeEventArgs) => {
        const query = grid.getDataModule().generateQuery();
        // Option A: Server-side
        /*
        const response = await fetch('/api/getData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                skip: args.skip,
                take: args.take,
                sorted: args.sorted,
                where: args.where,
                group: args.group
            })
        });
        const data = await response.json();
        grid.dataSource = {
            result: data.result,
            count: data.count
        };
        */

        // Option B: Local Data
        const result = new DataManager([...allData]).executeLocal(query);
        grid.dataSource = { result, count: allData.length };
    },
    // Step 3: Handle CRUD Operations
    dataSourceChanged: (args: DataSourceChangedEventArgs) => {
        if (args.requestType === 'save') {
            if ((args as any).action === 'add') {
                console.log('Adding:', args.data);
            }
            if ((args as any).action === 'edit') {
                console.log('Editing:', args.data);
            }
        }
        if (args.requestType === 'delete') {
            console.log('Deleting:', args.data);
        }
        grid.endEdit();
    },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', width: 120, isPrimaryKey: true },
        { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
    ]
});

grid.appendTo('#Grid');
```

**How It Works:**
1. **`dataStateChange` event** — Triggered on paging, sorting, filtering, grouping
   - Generate query from grid state via `grid.getDataModule().generateQuery()`
   - Fetch new data from server OR process local data with `Query.executeLocal()`
   - Return `{ result: [...], count: N }` to grid
   
2. **`dataSourceChanged` event** — Triggered on CRUD actions
   - Handle add, edit, delete operations
   - Send to server or process locally
   - Call `grid.endEdit()` after operation completes

3. **Response Format** — Always return `{ result: [...], count: N }`
   - `result`: Array of records to display
   - `count`: Total number of records in dataset

**Use when:**
- ✅ You need **full control over data operations** (filtering, sorting, paging, grouping, CRUD)
- ✅ Data source is **mixed** (local + remote, in-memory, external API, fetch)
- ✅ Custom **business logic** must be applied before binding data to Grid
- ✅ **Server-side operations** (filtering, sorting, paging) handled via fetch
- ✅ **Client-side operations** (in-memory data with Query.executeLocal())
- ✅ **Hybrid approach** combining server and client processing

**Key Features:**
- ✅ Full control over grid operations (paging, sorting, filtering, grouping)
- ✅ Complete CRUD operation handling via `dataSourceChanged` event
- ✅ Grid state management via `dataStateChange` event  
- ✅ Works with fetch, local data
- ✅ Returns `{ result: [...], count: N }` format (required by Grid)
- ✅ Supports lazy loading for grouped data with `enableLazyLoading`
- ✅ Server-side or client-side processing (your choice)

**Limitations:**
- ❌ Manual implementation of all data operations
- ❌ Requires handling both `dataStateChange` and `dataSourceChanged` events
- ❌ For large datasets: consider server-side paging/filtering to reduce memory usage

**Common Data Source Options:**

**Option A: Server-side processing**
```ts
dataStateChange: (args: any) => {
    fetch('/api/grid-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({skip: args.skip, take: args.take})
    })
    .then(response => response.json())
    .then(data => {
        grid.dataSource = data; // { result, count }
    });
}
```

**Option B: Client-side processing (local array)**
```ts
dataStateChange: (args: any) => {
    const query = grid.getDataModule().generateQuery();
    const result = new DataManager(localData).executeLocal(query);
    grid.dataSource = { result, count: localData.length };
}

```

---

## Security Rules (Mandatory — Apply After Gate Confirmation)

After the user confirms the adaptor, **these security rules apply to ALL URL-based adaptors**:

1. **Store URLs in `appsettings.json` or environment config** — never hardcode user-supplied URLs in markup
2. **Validate URL against a whitelist** in `OnInitialized()` before assigning to `DataManager`
3. **Use HTTPS only** — reject any `http://` endpoint in production
4. **Use string variables** for all URL properties on `DataManager` (not inline literals)
5. **Log all remote calls** with timestamps and endpoint metadata

```csharp
// ✅ Correct — whitelist + config-backed URL
private static readonly HashSet<string> AllowedEndpoints = new()
{
    "https://myapi.company.com/api/"
};

private string ServiceUrl { get; set; } = string.Empty;

protected override void OnInitialized()
{
    const string endpoint = "https://myapi.company.com/api/employees";
    if (!AllowedEndpoints.Any(allowed => endpoint.StartsWith(allowed, StringComparison.OrdinalIgnoreCase)))
        throw new InvalidOperationException($"Untrusted endpoint blocked: {endpoint}");
    ServiceUrl = endpoint;
}
```

> ⚠️ Never assign a URL from user input, query parameters, or any untrusted source directly to `DataManager.Url`.

---

## Disambiguation Questions

If the user's answer is still ambiguous after the gate, ask these targeted follow-up questions:

| Situation | Follow-up Question |
|-----------|--------------------|
| User says "it's a REST API" | "Does your controller action have `[EnableQuery]` or return `{ Items, Count }` (Web API) vs `{ result, count }` (URL Adaptor)?" |
| User says "it's OData" | "Is it OData v3 or OData v4? Does the URL include `/V4/` or does the controller use `Microsoft.AspNetCore.OData`?" |
| User is unsure | "What does the server response JSON look like? Paste a sample response and I'll identify the adaptor." |
| User says "custom backend" | "Do you need to call the data from an HTTP endpoint, or is it in-memory / a local service? If HTTP, what format does it return?" |
| User says "in-memory data" with "filtering/sorting" | "Use **Custom Binding** if you need client-side filtering, sorting, and paging. Use `Query.executeLocal()` and `DataManager.executeLocal()` to process operations." |

---

## Integration with Stage 3 (Component Mapping)

During **Stage 3 — Layout & Component Mapping**, if `Grid`, `DropDownList`, `ComboBox`, `ListView`, or any data-bound component is mapped **AND** the user provides a service URL **without specifying the adaptor**, the agent MUST:

1. **Flag the data binding decision** as "requires human gate approval" in the Component Mapping JSON
2. **Note in the Stage 3 output:** `⚠️ DataManager Adaptor: PENDING — Human gate approval required before Stage 5`
3. **Insert the gate presentation** (from the template above) at the end of Stage 3 output
4. **Block advancement to Stage 4** until the user selects an adaptor

```json
// Component Mapping JSON — example flag
{
  "components": ["Grid", "TextBox", "Button"],
  "dataBinding": {
    "status": "PENDING_HUMAN_GATE",
    "serviceUrl": "http://customurl/api/employees",
    "adaptorDecision": null,
    "gateRequired": true,
    "reason": "Service URL provided without adaptor type — cannot determine ODataV4, WebAPI, URL, GraphQL, or Custom without user confirmation"
  }
}
```

---

## Integration with Stage 1 (Intent Analysis)

During **Stage 1 — Intent Analysis**, if the user's prompt contains a URL (detected via regex `https?://[^\s]+`), the agent MUST:

1. **Extract and record the URL** in the intent analysis output
2. **Mark data binding strategy as "ambiguous"** if no adaptor keyword is present
3. **Note:** `⚠️ Service URL detected: {URL} — Adaptor type unknown. Human gate will be triggered at Stage 3.`

**Adaptor keywords that resolve the gate automatically (no gate needed):**

| Keyword in prompt | Resolved Adaptor |
|-------------------|-----------------|
| "OData v4", "ODataV4", "odata/v4" | `ODataV4Adaptor` ✅ |
| "OData v3", "OData service", "ODataAdaptor" | `ODataAdaptor` ✅ |
| "Web API", "WebAPI", "ASP.NET API", "Items and Count" | `WebApiAdaptor` ✅ |
| "URL adaptor", "UrlAdaptor", "result and count" | `UrlAdaptor` ✅ |
| "GraphQL", "GraphQL endpoint", "mutations" | `GraphQLAdaptor` ✅ |
| "custom adaptor", "in-memory", "Entity Framework direct" | `CustomAdaptor` ✅ |
| "custom binding", "state management", "dataStateChange", "dataSourceChanged", "full control" | `Custom Binding` ✅ |

If **none** of these keywords are present → **trigger the gate**.
