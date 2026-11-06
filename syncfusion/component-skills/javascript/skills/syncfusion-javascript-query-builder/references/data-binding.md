# Data Binding in QueryBuilder

## Table of Contents
- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
- [Remote Data with DataManager](#remote-data-with-datamanager)
- [Initial Rules](#initial-rules)
- [Dynamic Data Updates](#dynamic-data-updates)
- [DataManager Configuration](#datamanager-configuration)
- [Advanced Patterns](#advanced-patterns)

## Overview

QueryBuilder supports two data binding approaches:
1. **Local Data** - JavaScript arrays passed directly
2. **Remote Data** - DataManager handles HTTP requests

The bound data appears in filter dropdowns (for fields with `values` property) and helps with data type inference.

## Local Data Binding

### Basic Local Data Binding

```typescript
import { QueryBuilder, ColumnsModel } from '@syncfusion/ej2-querybuilder';

// Step 1: Define your data
const employeeData = [
  {
    EmployeeID: 1,
    FirstName: 'Nancy',
    Title: 'Sales Representative',
    HireDate: '22/07/2001',
    City: 'Seattle'
  },
  {
    EmployeeID: 2,
    FirstName: 'Andrew',
    Title: 'Vice President',
    HireDate: '21/04/2003',
    City: 'Tacoma'
  },
  {
    EmployeeID: 3,
    FirstName: 'Janet',
    Title: 'Sales Representative',
    HireDate: '22/07/2001',
    City: 'Kirkland'
  }
];

// Step 2: Define columns
const columns: ColumnsModel[] = [
  { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
  { field: 'FirstName', label: 'First Name', type: 'string' },
  { field: 'Title', label: 'Title', type: 'string' },
  { field: 'HireDate', label: 'Hire Date', type: 'date', format: 'dd/MM/yyyy' },
  { field: 'City', label: 'City', type: 'string' }
];

// Step 3: Create QueryBuilder with local data
const qb = new QueryBuilder({
  width: '100%',
  dataSource: employeeData,
  columns: columns
});

qb.appendTo('#querybuilder');
```

### With Predefined Rules

```typescript
import { QueryBuilder, ColumnsModel, RuleModel } from '@syncfusion/ej2-querybuilder';

const initialRules: RuleModel = {
  condition: 'and',
  rules: [
    {
      label: 'Employee ID',
      field: 'EmployeeID',
      type: 'number',
      operator: 'greaterthan',
      value: 1
    },
    {
      label: 'Title',
      field: 'Title',
      type: 'string',
      operator: 'contains',
      value: 'Sales'
    }
  ]
};

const qb = new QueryBuilder({
  width: '100%',
  dataSource: employeeData,
  columns: columns,
  rule: initialRules  // Loads with initial filter
});

qb.appendTo('#querybuilder');
```

### With Dropdown Suggestions

Add `values` property to show suggestions in dropdowns:

```typescript
const columns: ColumnsModel[] = [
  {
    field: 'FirstName',
    label: 'First Name',
    type: 'string',
    values: ['Nancy', 'Andrew', 'Janet', 'Maria']  // Suggestions
  },
  {
    field: 'City',
    label: 'City',
    type: 'string',
    values: ['Seattle', 'Tacoma', 'Kirkland', 'Redmond']  // Suggestions
  },
  {
    field: 'Title',
    label: 'Title',
    type: 'string',
    values: ['Sales Representative', 'Vice President', 'Manager']
  }
];
```

**User Experience:** When selecting a value, users see a dropdown with these suggestions instead of typing freely.

## Remote Data with DataManager

### Basic Remote Data Binding

```typescript
import { QueryBuilder, ColumnsModel } from '@syncfusion/ej2-querybuilder';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

// Create DataManager with remote URL
const dataManager = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});

const columns: ColumnsModel[] = [
  { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
  { field: 'FirstName', label: 'First Name', type: 'string' },
  { field: 'Title', label: 'Title', type: 'string' }
];

const qb = new QueryBuilder({
  width: '100%',
  dataSource: dataManager,  // Pass DataManager instead of array
  columns: columns
});

qb.appendTo('#querybuilder');
```

### Remote with OData Service

```typescript
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

// OData endpoint
const oDataManager = new DataManager({
  url: 'url',
  adaptor: new ODataAdaptor(),
  crossDomain: true
});

const qb = new QueryBuilder({
  width: '100%',
  dataSource: oDataManager,
  columns: columns
});

qb.appendTo('#querybuilder');
```

### Remote with OData V4

```typescript
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const odataV4Manager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});

const qb = new QueryBuilder({
  dataSource: odataV4Manager,
  columns: columns
});

qb.appendTo('#querybuilder');
```

## Initial Rules

### RuleModel Structure

```typescript
interface RuleModel {
  condition?: string;                             // 'and' | 'or' for groups
  rules?: RuleModel[];                            // Child rules or groups
  
  // For leaf rules:
  label?: string;                                 // Display label
  field?: string;                                 // Column field name
  type?: string;                                  // Data type
  operator?: string;                              // Comparison operator
  value?: string[] | number[] | string | number | boolean; // Filter value
  
  // Optional flags
  isLocked?: boolean;                             // Whether the rule is locked
  not?: boolean;                                  // Applies NOT to group condition
}
```

### Single Rule Example

```typescript
const singleRule: RuleModel = {
  condition: 'and',
  rules: [
    {
      field: 'FirstName',
      label: 'First Name',
      type: 'string',
      operator: 'startswith',
      value: 'A'
    }
  ]
};

const qb = new QueryBuilder({
  dataSource: employeeData,
  columns: columns,
  rule: singleRule
});

qb.appendTo('#querybuilder');
```

**Result:** QueryBuilder loads with one rule "FirstName starts with A"

### Complex Group Example

```typescript
const complexRule: RuleModel = {
  condition: 'and',
  rules: [
    // Simple rule
    {
      field: 'EmployeeID',
      operator: 'greaterthan',
      value: 1
    },
    // Nested group (OR conditions)
    {
      condition: 'or',
      rules: [
        {
          field: 'Title',
          operator: 'contains',
          value: 'Sales'
        },
        {
          field: 'Title',
          operator: 'contains',
          value: 'Manager'
        }
      ]
    },
    // Another simple rule
    {
      field: 'City',
      operator: 'equal',
      value: 'Seattle'
    }
  ]
};

// Translates to:
// (ID > 1) AND (Title contains "Sales" OR Title contains "Manager") AND City = "Seattle"
```

### Loading Rules from JSON

```typescript
// Fetch rules from server
async function loadRulesFromServer() {
  const response = await fetch('/api/saved-queries/query-1');
  const ruleData: RuleModel = await response.json();
  
  const qb = new QueryBuilder({
    dataSource: employeeData,
    columns: columns,
    rule: ruleData  // Load from server
  });
  
  qb.appendTo('#querybuilder');
}
```

## Dynamic Data Updates

### Update DataSource at Runtime

```typescript
const qb = new QueryBuilder({
  dataSource: initialData,
  columns: columns
});

qb.appendTo('#querybuilder');

// Later, change data source
const newData = [
  { EmployeeID: 10, FirstName: 'Tom', City: 'London' },
  { EmployeeID: 11, FirstName: 'Jane', City: 'Paris' }
];

qb.dataSource = newData;
qb.refresh(); // Re-render with new data source
```

### Add Rules Dynamically

```typescript
const newRule = [
  {
    field: 'City',
    operator: 'equal',
    value: 'Seattle'
  }
];

// Add to root group
qb.addRules(newRule, 'group0');

// Add to nested group
qb.addRules(newRule, 'group1');
```

### Remove Rules

```typescript
// Delete specific rule by ID
qb.deleteRules(['rule0']);

// Delete multiple rules
qb.deleteRules(['rule0', 'rule1']);
```

## DataManager Configuration

### DataManager Properties

```typescript
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  // Endpoint URL
  url: 'url',
  
  // Data adaptor (how to communicate)
  adaptor: new UrlAdaptor(),
  
  // Request settings
  offline: false,                   // false = remote, true = local
  crossDomain: true,               // For cross-origin requests
  
  // Caching
  cacheExpirationTime: 10,          // Cache duration in minutes
  enableLocalCache: true,           // Cache locally
  
  // HTTP headers
  headers: [
    { Authorization: 'Bearer token' }
  ]
});
```

### Authentication with DataManager

```typescript
const authenticatedManager = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor(),
  headers: [
    {
      'Authorization': `Bearer ${getAuthToken()}`,
      'X-Custom-Header': 'value'
    }
  ]
});

const qb = new QueryBuilder({
  dataSource: authenticatedManager,
  columns: columns
});

qb.appendTo('#querybuilder');
```

### Adaptor Types

```typescript
// URL Adaptor (RESTful API)
import { UrlAdaptor } from '@syncfusion/ej2-data';
dataManager: { adaptor: new UrlAdaptor() }

// OData Adaptor
import { ODataAdaptor } from '@syncfusion/ej2-data';
dataManager: { adaptor: new ODataAdaptor() }

// OData V4 Adaptor
import { ODataV4Adaptor } from '@syncfusion/ej2-data';
dataManager: { adaptor: new ODataV4Adaptor() }

// Custom Adaptor
class CustomAdaptor extends Adaptor {
  // Custom logic
}
dataManager: { adaptor: new CustomAdaptor() }
```

## Advanced Patterns

### Lazy Loading with Remote Data

```typescript
const remoteManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  offline: false  // Always remote
});

const qb = new QueryBuilder({
  width: '100%',
  dataSource: remoteManager,
  columns: columns,
  displayMode: 'Horizontal'
});

qb.appendTo('#querybuilder');
```

### Data with Change Detection

```typescript
class DataService {
  private data: any[] = [];
  private subscribers: Function[] = [];
  
  getData() {
    return this.data;
  }
  
  setData(newData: any[]) {
    this.data = newData;
    this.notifySubscribers();
  }
  
  subscribe(callback: Function) {
    this.subscribers.push(callback);
  }
  
  private notifySubscribers() {
    this.subscribers.forEach(cb => cb(this.data));
  }
}

const service = new DataService();
service.subscribe((newData: any[]) => {
  qb.dataSource = newData;
  qb.refresh();
});
```

### Cascading Data

Load different datasets based on filter selection:

```typescript
let currentFilter: RuleModel;

qb.change = (args: ChangeEventArgs) => {
  currentFilter = qb.getRules();
  
  // Based on filter, load related data
  if (currentFilter.rules.some(r => r.field === 'Department')) {
    const dept = currentFilter.rules
      .find(r => r.field === 'Department')?.value;
    
    // Load employees for that department
    loadEmployeesByDepartment(dept);
  }
};

function loadEmployeesByDepartment(deptId: string) {
  const newManager = new DataManager({
    url: 'url',
    adaptor: new ODataAdaptor()
  });
  
  qb.dataSource = newManager;
  qb.refresh();
}
```

### Combined Local and Remote

```typescript
// Use local data for small lookup tables
const staticValues = ['Active', 'Inactive', 'Pending'];

// Remote DataManager for main data
const remoteData = new DataManager({
  url: 'url',
  adaptor: new ODataAdaptor()
});

const columns: ColumnsModel[] = [
  {
    field: 'OrderID',
    type: 'number'
  },
  {
    field: 'Status',
    type: 'string',
    values: staticValues  // Local static values
  },
  {
    field: 'CustomerID',
    type: 'string'
  }
];

const qb = new QueryBuilder({
  dataSource: remoteData,  // Remote for main data
  columns: columns
});

qb.appendTo('#querybuilder');
```

---

**Need help?** Check [references/columns-definition.md](columns-definition.md) for column setup or [references/rules-and-groups.md](rules-and-groups.md) for managing complex rule structures.
