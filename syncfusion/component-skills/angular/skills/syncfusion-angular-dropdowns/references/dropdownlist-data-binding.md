# Data Binding in Angular DropDownList

## Table of Contents
- [Overview](#overview)
- [Fields Mapping](#fields-mapping)
- [Local Data Binding](#local-data-binding)
  - [Primitive Arrays](#primitive-arrays)
  - [Object Arrays](#object-arrays)
  - [Complex/Nested Objects](#complexnested-objects)
- [Remote Data Binding](#remote-data-binding)
  - [OData / OData V4](#odata--odata-v4)
  - [Web API](#web-api)
  - [Custom Adaptor](#custom-adaptor)
- [Async Pipe with Observable](#async-pipe-with-observable)
- [Value Binding](#value-binding)
  - [Primitive Value Binding](#primitive-value-binding)
  - [Object Value Binding](#object-value-binding)
- [Common Gotchas](#common-gotchas)

---

## Overview

The DropDownList accepts data through the `[dataSource]` property. It supports:
- **Local data:** JavaScript arrays (primitives or objects)
- **Remote data:** `DataManager` connecting to REST APIs, OData services, GraphQL, etc.
- **Observable streams:** Angular async pipe

---

## Fields Mapping

When binding objects, map your data columns to DropDownList fields using `[fields]`:

| Field | Type | Purpose |
|---|---|---|
| `text` | `string` | Display text in list and selected input |
| `value` | `string \| number` | Unique identifier stored as the selected value |
| `groupBy` | `string` | Groups items under a category header |
| `iconCss` | `string` | CSS class for an icon beside the item |
| `disabled` | `string` | Boolean field — items where this is `true` are non-selectable |
| `htmlAttributes` | `string` | Additional HTML attributes on items |

```typescript
public fields = {
  text: 'displayName',
  value: 'id',
  groupBy: 'category',
  disabled: 'isDisabled'
};
```

> When binding complex data, always ensure `fields` is correctly mapped — an undefined `text` field will render blank items.

---

## Local Data Binding

### Primitive Arrays

Strings and numbers work directly without `fields` mapping:

```typescript
import { Component, OnInit } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="data"
      placeholder="Select a sport">
    </ejs-dropdownlist>
  `
})
export class AppComponent implements OnInit {
  public data: string[] = [];

  ngOnInit(): void {
    this.data = ['Badminton', 'Cricket', 'Football', 'Tennis', 'Golf'];
  }
}
```

For number arrays, `value` and `text` both map to the number itself.

### Object Arrays

Map object properties using `[fields]`:

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="sports"
      [fields]="fields"
      placeholder="Select a sport">
    </ejs-dropdownlist>
  `
})
export class AppComponent implements OnInit {
  public sports: { Id: number; Game: string }[] = [];
  public fields = { text: 'Game', value: 'Id' };

  ngOnInit(): void {
    this.sports = [
      { Id: 1, Game: 'Badminton' },
      { Id: 2, Game: 'Cricket' },
      { Id: 3, Game: 'Football' },
      { Id: 4, Game: 'Golf' },
      { Id: 5, Game: 'Tennis' }
    ];
  }
}
```

### Complex/Nested Objects

For deeply nested data, use dot notation in `fields`:

```typescript
public countries = [
  { Code: { Id: 'AU' }, Country: { Name: 'Australia' } },
  { Code: { Id: 'DE' }, Country: { Name: 'Germany' } },
  { Code: { Id: 'US' }, Country: { Name: 'United States' } }
];

// Map nested fields with dot notation
public fields = { text: 'Country.Name', value: 'Code.Id' };
```

---

## Remote Data Binding

Use `DataManager` to connect to server-side data. The DropDownList automatically handles paging and fetching.

### OData / OData V4

```typescript
import { Component } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="remoteData"
      [query]="query"
      [fields]="fields"
      placeholder="Select a customer">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public remoteData: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  });

  // Fetch only first 6 records, select specific columns
  public query = new Query().select(['CustomerID', 'ContactName']).take(6);
  public fields = { text: 'ContactName', value: 'CustomerID' };
}
```

### Web API

```typescript
import { WebApiAdaptor } from '@syncfusion/ej2-data';

public remoteData = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});
public fields = { text: 'ProductName', value: 'ProductID' };
```

### Custom Adaptor

For non-standard APIs, extend `UrlAdaptor` or `CustomDataAdaptor` to transform request/response formats.

---

## Async Pipe with Observable

Bind Angular `Observable` streams directly using the async pipe:

```typescript
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [DropDownListModule, AsyncPipe],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="data$ | async"
      [fields]="fields"
      placeholder="Select a customer">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public data$: Observable<any[]>;
  public fields = { value: 'CustomerID', text: 'ContactName' };

  constructor(private http: HttpClient) {
    this.data$ = this.http
      .get<{ value: any[] }>('https://services.odata.org/V4/Northwind/Northwind.svc/Customers')
      .pipe(map(result => result.value));
  }
}
```

> Remember to import `HttpClientModule` (or `provideHttpClient()` in Angular 15+) in your app config.

---

## Value Binding

### Primitive Value Binding

Pre-select a value by setting the `value` property to a matching primitive:

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="sports"
      [(value)]="selectedSport"
      placeholder="Select a sport">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public sports = ['Cricket', 'Football', 'Tennis'];
  public selectedSport = 'Football'; // pre-selects Football
}
```

Supported primitive types: `string`, `number`, `boolean`, `null`

### Object Value Binding

When you need the selected value to be the full object (not just an ID), enable `[allowObjectBinding]="true"`:

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="countries"
      [fields]="fields"
      [allowObjectBinding]="true"
      [(value)]="selectedCountry"
      placeholder="Select a country">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public countries = [
    { id: 'AU', name: 'Australia' },
    { id: 'DE', name: 'Germany' },
    { id: 'US', name: 'United States' }
  ];
  public fields = { text: 'name', value: 'id' };

  // selectedCountry will be the entire object: { id: 'DE', name: 'Germany' }
  public selectedCountry = { id: 'DE', name: 'Germany' };
}
```

---

## Common Gotchas

- **Blank items:** Always verify `fields.text` matches the actual property name (case-sensitive).
- **Value not pre-selected:** The `value` must exactly match the `fields.value` of one item.
- **Remote data not loading:** Check CORS headers on the server. Use `crossDomain: true` in `DataManager` for cross-origin OData.
- **Observable not updating:** Ensure the component template uses `async` pipe and `AsyncPipe` is imported.
- **Object binding cleared on rerender:** With `allowObjectBinding`, the bound object reference must match an item in the data source.

---

## See Also

- [Filtering](filtering.md) — search within data source
- [Grouping & Virtualization](grouping-and-virtualization.md) — organize and efficiently render large datasets
- [Templates](templates.md) — custom item rendering
