# Data Binding — Syncfusion Angular Mention

## Table of Contents
- [Overview](#overview)
- [Field Mapping](#field-mapping)
- [Array of Simple Data](#array-of-simple-data)
- [Array of JSON Objects](#array-of-json-objects)
- [Array of Complex Data](#array-of-complex-data)
- [Remote Data — OData V4](#remote-data--odata-v4)
- [Remote Data — Web API](#remote-data--web-api)

---

## Overview

The Mention loads data via the `dataSource` property. It supports:
- `string[]`, `number[]`, or `boolean[]` arrays
- `{ [key: string]: Object }[]` — arrays of JSON objects
- `DataManager` — remote data via OData, Web API, etc.

Use the `fields` property to map data columns when working with objects.

| Field | Type | Description |
|-------|------|-------------|
| `text` | `string` | Column used as the display text in the suggestion list |
| `value` | `string` | Column used as the hidden unique value |
| `groupBy` | `string` | Column used to group list items by category |
| `iconCss` | `string` | Column used to apply an icon CSS class to each item |
| `disabled` | `string` | Column used to mark items as non-selectable |

> When binding complex data, `fields` must be mapped correctly. Without proper mapping, the selected item remains undefined.

---

## Array of Simple Data

Pass an array of primitive values. Both the display text and the value use the same entry.

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention [dataSource]="userData" [target]="mentionTarget"></ejs-mention>
  `
})
export class AppComponent {
  public userData: string[] = ['Selma Rose', 'Garth', 'Robert', 'William', 'Joseph'];
  public mentionTarget: string = '#mentionElement';
}
```

---

## Array of JSON Objects

Map the appropriate columns via the `fields` property. In the example below, `Game` is used as display text and `ID` as the value.

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag sport"></div>
    <ejs-mention [dataSource]="sportsData" [target]="mentionTarget" [fields]="fields"></ejs-mention>
  `
})
export class AppComponent {
  public sportsData: { [key: string]: Object }[] = [
    { ID: 'game1', Game: 'Badminton' },
    { ID: 'game2', Game: 'Football' },
    { ID: 'game3', Game: 'Tennis' },
    { ID: 'game4', Game: 'Hockey' },
    { ID: 'game5', Game: 'Basketball' }
  ];
  public mentionTarget: string = '#mentionElement';
  public fields: Object = { text: 'Game', value: 'ID' };
}
```

---

## Array of Complex Data

For deeply nested objects, use dot notation in `fields` to reach nested properties.

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag country"></div>
    <ejs-mention [dataSource]="countriesData" [target]="mentionTarget" [fields]="fields"></ejs-mention>
  `
})
export class AppComponent {
  public countriesData: { [key: string]: Object }[] = [
    { Country: { Name: 'Australia' }, Code: { ID: 'AU' } },
    { Country: { Name: 'Bermuda' }, Code: { ID: 'BM' } },
    { Country: { Name: 'Canada' }, Code: { ID: 'CA' } },
    { Country: { Name: 'Cameroon' }, Code: { ID: 'CM' } },
    { Country: { Name: 'Denmark' }, Code: { ID: 'DK' } },
    { Country: { Name: 'France' }, Code: { ID: 'FR' } }
  ];
  public mentionTarget: string = '#mentionElement';
  // Dot notation for nested fields
  public fields: Object = { text: 'Country.Name', value: 'Code.ID' };
}
```

---

## Remote Data — OData V4

Use `DataManager` with `ODataV4Adaptor` for OData services. The `query` property scopes the request.

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention
      [dataSource]="searchData"
      [query]="query"
      [fields]="fields"
      [popupWidth]="popupWidth"
      [target]="mentionTarget">
    </ejs-mention>
  `
})
export class AppComponent {
  public searchData: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public mentionTarget: string = '#mentionElement';
  // Select ContactName and CustomerID, return first 6 records
  public query: Query = new Query().from('Customers').select(['ContactName', 'CustomerID']).take(6);
  public fields: Object = { text: 'ContactName', value: 'CustomerID' };
  public popupWidth: string = '250px';
}
```

---

## Remote Data — Web API

Use `WebApiAdaptor` for ASP.NET or REST APIs following OData conventions.

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention
      [dataSource]="searchData"
      [query]="query"
      [fields]="fields"
      [popupWidth]="popupWidth"
      [target]="mentionTarget">
    </ejs-mention>
  `
})
export class AppComponent {
  public searchData: DataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });
  public mentionTarget: string = '#mentionElement';
  public query: Query = new Query().select(['FirstName', 'EmployeeID']).take(7).requiresCount();
  public fields: Object = { text: 'FirstName', value: 'EmployeeID' };
  public popupWidth: string = '250px';
}
```

> **Tip:** For remote sources, set `minLength` to reduce unnecessary API calls while the user is still typing.
