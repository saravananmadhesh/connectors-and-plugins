# Data Binding

Bind local or remote data to the Spreadsheet component in Angular. Load data into sheets and ranges using arrays, objects, or remote data sources via DataManager.

## Table of Contents

- [Setup](#setup)
- [Minimal Code](#minimal-code)
- [Data Binding Options](#data-binding-options)
  - [Option 1: Local Data (Array of Objects)](#option-1-local-data-array-of-objects)
  - [Option 2: Remote Data (DataManager with REST/OData)](#option-2-remote-data-datamanager-with-restodata)
  - [Option 3: Custom Column Order with fieldsOrder](#option-3-custom-column-order-with-fieldsorder)
  - [Option 4: Custom Cell Content with Template](#option-4-custom-cell-content-with-template)
- [Loading Data from External Files](#loading-data-from-external-files)
  - [From JSON File](#from-json-file)
  - [From TypeScript/JavaScript File](#from-typescriptjavascript-file)
  - [From CSV File (Fetch & Parse)](#from-csv-file-fetch--parse)
  - [Dynamic File Selection & Loading](#dynamic-file-selection--loading)
- [Configuration Properties](#configuration-properties)
- [Placeholders](#placeholders)
- [Best Practices](#best-practices)
- [Common Scenarios](#common-scenarios)
  - [Bind Data at Initialization](#bind-data-at-initialization)
  - [Dynamic Data Update](#dynamic-data-update)
  - [Pagination with Remote Data](#pagination-with-remote-data)

---

## Setup

Install the Syncfusion Spreadsheet package:

```bash
npm install @syncfusion/ej2-angular-spreadsheet
```
---

## Minimal Code

```typescript
import { Component } from '@angular/core';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range [dataSource]="data" startCell="A1"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  data = [
    { Name: 'John', Age: 30, Salary: 50000 },
    { Name: 'Jane', Age: 28, Salary: 55000 },
    { Name: 'Bob',  Age: 35, Salary: 60000 }
  ];
}
```

---

## Data Binding Options

### Option 1: Local Data (Array of Objects)

```typescript
import { Component } from '@angular/core';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range
            [dataSource]="localData"
            startCell="A1"
            [showFieldAsHeader]="true">
          </e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  localData = [
    { Product: 'Laptop',   Price: 1200, Quantity: 5  },
    { Product: 'Mouse',    Price: 25,   Quantity: 20 },
    { Product: 'Keyboard', Price: 80,   Quantity: 10 }
  ];
}
```

---

### Option 2: Remote Data (DataManager with REST/OData)

```typescript
import { Component } from '@angular/core';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range
            [dataSource]="dataManager"
            [query]="query"
            startCell="A1"
            [showFieldAsHeader]="true">
          </e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  dataManager = new DataManager({
    // SECURITY: Validate URL against allowlist of trusted domains before use
    url: 'url',                 // Replace with actual endpoint
    adaptor: new WebApiAdaptor()      // Options: WebApiAdaptor, ODataV4Adaptor, JsonAdaptor
  });

  query = new Query()
    .take([ROW_COUNT])                // Limit number of rows
    .skip([SKIP_COUNT])               // Skip rows (pagination)
    .select(['[FIELD_1]', '[FIELD_2]']); // Select specific fields
}
```

---

### Option 3: Custom Column Order with fieldsOrder

```typescript
import { Component } from '@angular/core';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range
            [dataSource]="productData"
            startCell="[START_CELL]"
            [showFieldAsHeader]="true"
            [fieldsOrder]="fieldsOrder">
          </e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  productData = [
    { ProductId: 1, ProductName: 'Laptop', Category: 'Electronics', Price: 1200, Stock: 5  },
    { ProductId: 2, ProductName: 'Mouse',  Category: 'Accessories', Price: 25,   Stock: 20 }
  ];

  // Custom column order — ProductId hidden
  fieldsOrder = ['ProductName', 'Category', 'Price', 'Stock'];
}
```

---

### Option 4: Custom Cell Content with Template

```typescript
import { Component } from '@angular/core';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range
            [dataSource]="salesData"
            startCell="[START_CELL]"
            [showFieldAsHeader]="true"
            [template]="cellTemplate">
          </e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  salesData = [
    { Product: 'Laptop', Amount: 1200, Status: 'Active'   },
    { Product: 'Mouse',  Amount: 25,   Status: 'Inactive' }
  ];

  cellTemplate = '<span style="color: ${Status === \'Active\' ? \'green\' : \'red\'}">${Product}</span>';
}
```

---

## Loading Data from External Files

### From JSON File

**File: `src/assets/data/products.json`**
```json
[
  { "Product": "Laptop",   "Price": 1200, "Quantity": 5  },
  { "Product": "Mouse",    "Price": 25,   "Quantity": 20 },
  { "Product": "Keyboard", "Price": 80,   "Quantity": 10 }
]
```

```typescript
import { Component } from '@angular/core';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import productData from './assets/data/products.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
  <ejs-spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range [dataSource]="data" startCell="A1"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
`
})
export class AppComponent {
  data = [DATA_VARIABLE];
}
```

> **Tip:** Add `"resolveJsonModule": true` to `tsconfig.json` to enable JSON imports.

---

### From TypeScript/JavaScript File

**File: `src/app/data/sales-data.ts`**
```typescript
export const salesData = [
  { Name: 'Product A', Sales: 1000, Quarter: 'Q1' },
  { Name: 'Product B', Sales: 1500, Quarter: 'Q1' },
  { Name: 'Product C', Sales: 2000, Quarter: 'Q2' }
];

export const employeeData = [
  { Employee: 'John', Department: 'Sales', Salary: 50000 },
  { Employee: 'Jane', Department: 'HR',    Salary: 55000 }
];
```

```typescript
import { Component } from '@angular/core';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import { salesData } from './data/sales-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
  <ejs-spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range [dataSource]="data" startCell="A1"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
`
})
export class AppComponent {
  data = salesData;
}
```

---

### From CSV File (Fetch & Parse)

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule, HttpClientModule],
  template: `
  <ejs-spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range [dataSource]="data" startCell="A1"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
`
})
export class AppComponent implements OnInit {
  data: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCSVData('[CSV_FILE_PATH]');
  }

  loadCSVData(csvFilePath: string): void {
    this.http.get(csvFilePath, { responseType: 'text' }).subscribe(csvText => {
      const lines = csvText.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim());

      this.data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header] = values[index];
        });
        return obj;
      });
    });
  }
}
```

> **Note:** For standalone components, add `HttpClientModule` to the component's `imports` array, or configure `provideHttpClient()` in `app.config.ts` and inject `HttpClient` via constructor.

---

### Dynamic File Selection & Loading

```typescript
import { Component } from '@angular/core';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<button (click)="loadDataByType('sales')">Load Sales</button>
  <button (click)="loadDataByType('employees')">Load Employees</button>
  <button (click)="loadDataByType('inventory')">Load Inventory</button>

  <ejs-spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range [dataSource]="data" startCell="A1" [showFieldAsHeader]="true"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  data: any[] = [];

  private dataFiles: Record<string, string> = {
    sales:     '[SALES_DATA_PATH]',
    employees: '[EMPLOYEE_DATA_PATH]',
    inventory: '[INVENTORY_DATA_PATH]'
  };

  constructor(private http: HttpClient) {}

  loadDataByType(type: string): void {
    const filePath = this.dataFiles[type];
    this.http.get<any[]>(filePath).subscribe(result => {
      this.data = result;
    });
  }
}
```

---

## Configuration Properties

| Property | Type | Default | Description | Example |
|---|---|---|---|---|
| `dataSource` | `Object[] \| DataManager` | `null` | Data source to bind (array of objects or DataManager instance) | `[{id: 1, name: 'John'}]` |
| `startCell` | `string` | `'A1'` | Starting cell reference for data binding | `'A1'`, `'B2'`, `'C5'` |
| `showFieldAsHeader` | `boolean` | `true` | Show/hide field names as header row | `true`, `false` |
| `query` | `Query` | `null` | External Query for data filtering and processing | `new Query().take(50).skip(0)` |
| `fieldsOrder` | `string[]` | `null` | Customize column order by specifying field names | `['Product', 'Price', 'Quantity']` |
| `template` | `string \| Function` | `''` | Template for custom cell content (HTML string or function) | `'<span>${ProductName}</span>'` |
| `address` | `string` | `'A1'` | Cell range address (alternative to startCell) | `'A1:D100'`, `'Sheet1!A1:D100'` |

---

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[DATA_SOURCE]` | Array of objects or DataManager instance | `[{id: 1, name: 'John', age: 30}]` |
| `[DATA_VARIABLE]` | Imported variable name from file | `salesData`, `productList`, `employeeData` |
| `[JSON_FILE_PATH]` | Relative path to JSON file | `'./data/products.json'`, `'../assets/sales.json'` |
| `[DATA_FILE_PATH]` | Relative path to TypeScript/JS file | `'./data/salesData'`, `'../services/dataProvider'` |
| `[CSV_FILE_PATH]` | Relative path to CSV file | `'./assets/data/products.csv'` |
| `[API_URL]` | REST API or OData endpoint URL | `'https://example.com'` |
| `[ROW_COUNT]` | Number of rows to retrieve | `100`, `500`, `1000` |
| `[SKIP_COUNT]` | Number of rows to skip (pagination) | `0`, `50`, `100` |
| `[FIELD_1]`, `[FIELD_2]` | Field names to include in query | `'Product'`, `'Price'`, `'Category'` |
| `[START_CELL]` | Cell reference where data begins | `'A1'`, `'A2'`, `'C5'` |
| `[SALES_DATA_PATH]` | Path to sales data file | `'./assets/data/sales.json'` |
| `[EMPLOYEE_DATA_PATH]` | Path to employee data file | `'./assets/data/employees.json'` |
| `[INVENTORY_DATA_PATH]` | Path to inventory data file | `'./assets/data/inventory.json'` |

---

## Best Practices

- **Use `[dataSource]` binding** — Bind via Angular template property binding for reactivity
- **Use object arrays** — Most flexible and maintainable format for local data
- **Include headers** — Set `[showFieldAsHeader]="true"` for automatic header generation
- **Custom column order** — Use `[fieldsOrder]` to control which fields display and in what order
- **Optimize large datasets** — Use DataManager with pagination (`take`/`skip`) for performance
- **Use `HttpClient` for CSV/JSON** — Prefer Angular's `HttpClient` over `fetch` for consistency
- **Handle null values** — Null/undefined values display as empty cells (expected behavior)
- **Use Query for filtering** — Apply Query methods (`take`, `skip`, `select`, `where`) for remote data
- **Place assets in `/assets`** — Store static data files under `src/assets/` for Angular CLI compatibility
- **Use `@ViewChild` for dynamic updates** — Access `SpreadsheetComponent` instance to update data after initialization

---

## Common Scenarios

### Bind Data at Initialization

```typescript
import { Component } from '@angular/core';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
    <ejs-spreadsheet>
      <e-sheets>
        <e-sheet name="Sales">
          <e-ranges>
            <e-range [dataSource]="data" startCell="[START_CELL]"></e-range>
          </e-ranges>
        </e-sheet>
      </e-sheets>
    </ejs-spreadsheet>
  `
})
export class AppComponent {
  data = [DATA_SOURCE];
}
```

---

### Dynamic Data Update

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
  <ejs-spreadsheet #spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range [dataSource]="data" startCell="A1"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
`
})
export class AppComponent {
  @ViewChild('spreadsheet')
  spreadsheet!: SpreadsheetComponent;

  updateData(newData: any[]): void {
    this.spreadsheet.sheets[0].ranges = [{
      dataSource: newData,
      startCell: '[START_CELL]'
    }];
    this.spreadsheet.refresh();
  }
}
```

---

### Pagination with Remote Data

```typescript
import { Component } from '@angular/core';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
  <ejs-spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range [dataSource]="data" startCell="A1"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
`
})
export class AppComponent {
  dataManager = new DataManager({
    // SECURITY: Validate URL against allowlist of trusted domains before use
    url: 'url', // Replace with actual endpoint
    adaptor: new WebApiAdaptor()
  });

  query = new Query()
    .take([ROW_COUNT])
    .skip([SKIP_COUNT])
    .select(['[FIELD_1]', '[FIELD_2]']);
}
```