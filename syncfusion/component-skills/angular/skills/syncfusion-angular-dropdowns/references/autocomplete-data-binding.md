# Data Binding in Angular AutoComplete

## Table of Contents
- [Overview](#overview)
- [Fields Mapping](#fields-mapping)
- [Local Data: Array of Strings](#local-data-array-of-strings)
- [Local Data: Array of Objects](#local-data-array-of-objects)
- [Local Data: Array of Complex Objects](#local-data-array-of-complex-objects)
- [Remote Data with DataManager](#remote-data-with-datamanager)
- [Async Pipe with Observable](#async-pipe-with-observable)
- [Primitive Value Binding](#primitive-value-binding)
- [Object Value Binding (allowObjectBinding)](#object-value-binding-allowobjectbinding)

---

## Overview

The AutoComplete binds data through the `dataSource` property. It accepts:

- `string[]` / `number[]` / `boolean[]` — arrays of primitives
- `{ [key: string]: Object }[]` — arrays of plain objects
- `DataManager` — for remote/OData data services

The `fields` property maps which columns from your data object to use for the suggestion value, icon, or grouping.

---

## Fields Mapping

| Field | Type | Description |
|-------|------|-------------|
| `value` | string | Column used as the suggestion text and selected value |
| `groupBy` | string | Column used to group list items under category headers |
| `iconCss` | string | Column containing CSS class names for icons |
| `disabled` | string | Column indicating whether an item is disabled |

**Example — mapping a `Game` column as the value:**

```typescript
public fields: Object = { value: 'Game' };
public sportsData: { [key: string]: Object }[] = [
  { Id: 'Game1', Game: 'Badminton' },
  { Id: 'Game2', Game: 'Basketball' },
  { Id: 'Game3', Game: 'Cricket' }
];
```

> If `fields` is not mapped correctly for complex data, the selected item remains undefined.

---

## Local Data: Array of Strings

The simplest form — no `fields` mapping needed:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="sportsData"
      placeholder="Find a game">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public sportsData: string[] = [
    'Badminton', 'Basketball', 'Cricket', 'Football',
    'Golf', 'Gymnastics', 'Hockey', 'Tennis'
  ];
}
```

---

## Local Data: Array of Objects

When your data has object structure, map the `value` field:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="sportsData"
      [fields]="fields"
      placeholder="Find a game">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public sportsData: { [key: string]: Object }[] = [
    { Id: 'Game1', Game: 'Badminton' },
    { Id: 'Game2', Game: 'Basketball' },
    { Id: 'Game3', Game: 'Cricket' },
    { Id: 'Game4', Game: 'Football' },
    { Id: 'Game5', Game: 'Golf' },
    { Id: 'Game6', Game: 'Hockey' },
    { Id: 'Game7', Game: 'Rugby' },
    { Id: 'Game8', Game: 'Snooker' }
  ];
  // Map the 'Game' column as the suggestion value
  public fields: Object = { value: 'Game' };
}
```

---

## Local Data: Array of Complex Objects

For nested object properties, use dot notation in the `value` field:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="countriesData"
      [fields]="fields"
      placeholder="Find a country">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public countriesData: { [key: string]: Object }[] = [
    { Country: { Name: 'Australia' }, Code: { Id: 'AU' } },
    { Country: { Name: 'Bermuda' }, Code: { Id: 'BM' } },
    { Country: { Name: 'Canada' }, Code: { Id: 'CA' } },
    { Country: { Name: 'Denmark' }, Code: { Id: 'DK' } },
    { Country: { Name: 'France' }, Code: { Id: 'FR' } },
    { Country: { Name: 'Germany' }, Code: { Id: 'DE' } },
    { Country: { Name: 'India' }, Code: { Id: 'IN' } },
    { Country: { Name: 'Japan' }, Code: { Id: 'JP' } }
  ];
  // Dot notation for nested property
  public fields: Object = { value: 'Country.Name' };
}
```

---

## Remote Data with DataManager

Use `DataManager` to fetch data from a remote service. The `query` property controls what data is fetched:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="data"
      [fields]="fields"
      [query]="query"
      [sortOrder]="sorting"
      placeholder="Find a customer">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public data: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public fields: Object = { value: 'ContactName' };
  public query: Query = new Query().select(['ContactName']).take(6);
  public sorting: string = 'Ascending';
}
```

**Supported DataManager adaptors:** ODataAdaptor, ODataV4Adaptor, WebApiAdaptor, UrlAdaptor, JsonAdaptor

---


Bind data from an RxJS Observable using Angular's `async` pipe:

```typescript
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule, AsyncPipe],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="customers"
      [dataSource]="data | async"
      [fields]="remoteFields"
      placeholder="Select a customer">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public data: Observable<any>;
  public remoteFields: Object = { value: 'CustomerID' };

  constructor(private http: HttpClient) {
    this.data = this.http
      .get<{ [key: string]: object }[]>(
        ''
      )
      .pipe(map((results: { [key: string]: any }) => results['value']));
  }
}
```

> Requires `HttpClientModule` to be provided in the application.

---

## Primitive Value Binding

Use the `value` property to pre-select an item at initialization:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      [dataSource]="records"
      [fields]="fields"
      [value]="value"
      placeholder="e.g. Item 1">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public records: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  public fields: object = { value: 'text' };
  public value: string = 'Item 1'; // Pre-selected primitive value
}
```

---

## Object Value Binding (allowObjectBinding)

When `allowObjectBinding` is `true`, the `value` property holds the entire matched data object rather than just its value string:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      [dataSource]="records"
      [fields]="fields"
      [allowObjectBinding]="true"
      [value]="value"
      placeholder="e.g. Item 1">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public records: { [key: string]: Object }[] = [];

  constructor() {
    for (let i: number = 1; i <= 150; i++) {
      this.records.push({ id: 'id' + i, text: `Item ${i}` });
    }
  }

  public fields: object = { value: 'text' };
  // Pre-select by full object when allowObjectBinding is true
  public value: object = { id: 'id11', text: 'Item 11' };
}
```

**When to use `allowObjectBinding`:** When you need to track the full selected object (not just its display string) — for example, to pass the selected item's `id` field to a backend service.
