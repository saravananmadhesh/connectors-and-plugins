# Data Binding — Syncfusion Angular Query Builder

The Query Builder uses `DataManager` under the hood to support both local and remote data sources. The `dataSource` drives auto-column generation and powers the `getPredicate()` method for in-memory filtering.

---

## Local Data Binding

Bind a plain JavaScript object array directly to `dataSource`:

```typescript
import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { Component } from '@angular/core';

@Component({
  imports: [QueryBuilderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-querybuilder width="70%" [dataSource]="data" [rule]="importRules">
      <e-columns>
        <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
        <e-column field="FirstName"  label="First Name"  type="string"></e-column>
        <e-column field="Country"    label="Country"     type="string"></e-column>
      </e-columns>
    </ejs-querybuilder>
  `
})
export class App {
  public data = [
    { EmployeeID: 1, FirstName: 'Nancy', Country: 'USA' },
    { EmployeeID: 2, FirstName: 'Andrew', Country: 'UK' },
    { EmployeeID: 3, FirstName: 'Janet', Country: 'USA' }
  ];

  public importRules = {
    condition: 'and',
    rules: [{ field: 'Country', operator: 'equal', value: 'USA' }]
  };
}
```

> By default, `DataManager` uses **JsonAdaptor** for local data binding.

### Using DataManager for Local Data

```typescript
import { DataManager } from '@syncfusion/ej2-data';

export class App {
  public data: DataManager = new DataManager(employeeData);
}
```

---

## Remote Data Binding

Bind remote data by assigning a `DataManager` instance with a service URL.

### OData Service (v3)

```typescript
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';
import { Component } from '@angular/core';
import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';

@Component({
  imports: [QueryBuilderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-querybuilder width="70%" [dataSource]="data" [rule]="importRules">
      <e-columns>
        <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
        <e-column field="FirstName"  label="First Name"  type="string"></e-column>
        <e-column field="Title"      label="Title"       type="string"></e-column>
        <e-column field="Country"    label="Country"     type="string"></e-column>
      </e-columns>
    </ejs-querybuilder>
  `
})
export class App {
  public data: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataAdaptor()
  });

  public importRules = {
    condition: 'and',
    rules: [{ field: 'EmployeeID', operator: 'equal', value: 1 }]
  };
}
```

> By default, `DataManager` uses **ODataAdaptor** for remote data binding.

### OData v4 Service

```typescript
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

public data: DataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor()
});
```

### WebAPI Adaptor

Use `WebApiAdaptor` for custom REST APIs built with OData conventions:

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ejs-querybuilder width="70%" [dataSource]="data" [rule]="importRules">
      <e-columns>
        <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
        <e-column field="FirstName"  label="First Name"  type="string"></e-column>
        <e-column field="Title"      label="Title"       type="string"></e-column>
        <e-column field="Country"    label="Country"     type="string"></e-column>
        <e-column field="City"       label="City"        type="string"></e-column>
      </e-columns>
    </ejs-querybuilder>
  `
})
export class AppComponent implements OnInit {
  public data!: DataManager;
  public importRules: any;

  ngOnInit(): void {
    this.data = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });
    this.importRules = {
      condition: 'and',
      rules: [
        { label: 'Employee ID', field: 'EmployeeID', type: 'number', operator: 'equal', value: 1 },
        { label: 'Title', field: 'Title', type: 'string', operator: 'equal', value: 'Sales Manager' }
      ]
    };
  }
}
```

---

## Using DataManager with getPredicate()

After the user builds a query, use `getPredicate()` to filter local data in-memory:

```typescript
import { QueryBuilderComponent } from '@syncfusion/ej2-angular-querybuilder';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { ViewChild, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ejs-querybuilder #qb width="70%" [dataSource]="employeeData">
      <e-columns>
        <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
        <e-column field="FirstName"  label="First Name"  type="string"></e-column>
        <e-column field="Country"    label="Country"     type="string"></e-column>
      </e-columns>
    </ejs-querybuilder>
    <button (click)="filterData()">Filter</button>
    <p>Matched: {{ filteredCount }}</p>
  `
})
export class App {
  @ViewChild('qb') qb!: QueryBuilderComponent;

  public employeeData = [
    { EmployeeID: 1, FirstName: 'Nancy', Country: 'USA' },
    { EmployeeID: 2, FirstName: 'Andrew', Country: 'UK' },
    { EmployeeID: 3, FirstName: 'Janet', Country: 'USA' }
  ];
  public filteredCount = 0;

  filterData(): void {
    const rules = this.qb.getRules();
    const predicate = this.qb.getPredicate(rules);
    const dm = new DataManager(this.employeeData);
    const result = dm.executeLocal(new Query().where(predicate));
    this.filteredCount = result.length;
  }
}
```

---

## Complex Data Binding (Nested Columns)

Complex data binding lets you query nested object properties using a separator (default: `.`).

```typescript
// Data with nested objects
public complexData = [
  {
    Employee: { ID: 1, Name: 'Nancy' },
    Address:  { City: 'Seattle', Country: 'USA' }
  }
];
```

```html
<ejs-querybuilder [dataSource]="complexData" separator=".">
  <e-columns>
    <!-- Top-level wrapper column -->
    <e-column field="Employee" label="Employee">
      <e-columns>
        <e-column field="ID"   label="ID"   type="number"></e-column>
        <e-column field="Name" label="Name" type="string"></e-column>
      </e-columns>
    </e-column>
    <e-column field="Address" label="Address">
      <e-columns>
        <e-column field="City"    label="City"    type="string"></e-column>
        <e-column field="Country" label="Country" type="string"></e-column>
      </e-columns>
    </e-column>
  </e-columns>
</ejs-querybuilder>
```

The resulting rule field will be `"Employee.ID"`, `"Address.City"`, etc., matching the nested property path.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Remote data not loading | Verify URL is reachable and adaptor type matches service format |
| OData v4 errors | Use `ODataV4Adaptor` instead of `ODataAdaptor` |
| `getPredicate` returns no results | Ensure rule values match the exact casing/type in your data |
| Nested fields not available | Confirm `separator` matches the path separator in your data keys |
| Auto-column types wrong on remote data | Specify columns explicitly instead of relying on auto-generation |
