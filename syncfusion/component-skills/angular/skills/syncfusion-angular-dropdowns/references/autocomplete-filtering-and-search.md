# Filtering & Search in Angular AutoComplete

## Table of Contents
- [Overview](#overview)
- [Change the Filter Type](#change-the-filter-type)
- [Limit Suggestion Count](#limit-suggestion-count)
- [Minimum Filter Character Length](#minimum-filter-character-length)
- [Case-Sensitive Filtering](#case-sensitive-filtering)
- [Diacritics (Accent-Insensitive) Filtering](#diacritics-accent-insensitive-filtering)
- [Debounce Delay](#debounce-delay)
- [Custom Filtering with the filtering Event](#custom-filtering-with-the-filtering-event)

---

## Overview

The AutoComplete filters the data source automatically as the user types. Filtering begins after the user types at least `minLength` characters (default: 1). The `filterType` determines how matches are found.

---

## Change the Filter Type

Use the `filterType` property to control the matching strategy:

| FilterType | Description | Supported Types |
|---|---|---|
| `StartsWith` | Checks whether a value begins with the typed text | String |
| `EndsWith` | Checks whether a value ends with the typed text | String |
| `Contains` | Checks whether a value contains the typed text | String |

Default is `'Contains'`.

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
      [dataSource]="sportsData"
      [fields]="fields"
      [query]="query"
      [filterType]="filterType"
      [sortOrder]="sorting"
      placeholder="Find a customer">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public sportsData: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public fields: Object = { value: 'ContactName' };
  public query: Query = new Query().select(['ContactName', 'CustomerID']).take(6);
  public filterType: string = 'StartsWith';
  public sorting: string = 'Ascending';
}
```

---

## Limit Suggestion Count

Use `suggestionCount` to limit the maximum number of items shown in the popup:

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
      [dataSource]="sportsData"
      [fields]="fields"
      [query]="query"
      [filterType]="filterType"
      [sortOrder]="sorting"
      [suggestionCount]="suggestionCount"
      placeholder="Find a customer">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public sportsData: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public fields: Object = { value: 'ContactName' };
  public query: Query = new Query().select(['ContactName', 'CustomerID']);
  public filterType: string = 'StartsWith';
  public sorting: string = 'Ascending';
  public suggestionCount: number = 5; // Show at most 5 suggestions
}
```

Default `suggestionCount` is `20`.

---

## Minimum Filter Character Length

Use `minLength` to set the minimum number of characters before filtering begins. Useful for remote data to avoid unnecessary API calls:

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
      [dataSource]="sportsData"
      [fields]="fields"
      [query]="query"
      [filterType]="filterType"
      [sortOrder]="sorting"
      [minLength]="minLength"
      placeholder="Find a customer">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public sportsData: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public fields: Object = { value: 'ContactName' };
  public query: Query = new Query().select(['ContactName', 'CustomerID']);
  public filterType: string = 'StartsWith';
  public sorting: string = 'Ascending';
  public minLength: number = 3; // Filter only after 3+ characters
}
```

Default `minLength` is `1`.

---

## Case-Sensitive Filtering

By default, filtering is case-insensitive (`ignoreCase: true`). Set `ignoreCase` to `false` to make search case-sensitive:

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
      [dataSource]="data"
      [filterType]="filterType"
      [sortOrder]="sorting"
      [ignoreCase]="ignoreCase"
      placeholder="Find a game e.g. FootBall">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public data: string[] = [
    'Badminton', 'Basketball', 'Cricket', 'Football',
    'Golf', 'Gymnastics', 'Hockey', 'Tennis'
  ];
  public filterType: string = 'StartsWith';
  public sorting: string = 'Ascending';
  public ignoreCase: boolean = false; // Case-sensitive: 'football' won't match 'Football'
}
```

---

## Diacritics (Accent-Insensitive) Filtering

Enable `ignoreAccent` to filter without being sensitive to accented/diacritic characters. Useful for international name lists:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="diacritics"
      [dataSource]="data"
      [ignoreAccent]="true"
      placeholder="e.g. aero">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public data: string[] = [
    'Aeróbics',
    'Aeróbics en Agua',
    'Aerografía',
    'Aeromodelaje',
    'Águilas',
    'Ajedrez',
    'Ala Delta',
    'Álbumes de Música',
    'Alusivos',
    'Análisis de Escritura a Mano'
  ];
}
```

With `ignoreAccent: true`, typing `aero` will match `Aeróbics`, `Aeróbics en Agua`, and `Aerografía`.

---

## Debounce Delay

Use `debounceDelay` to add a delay (in milliseconds) before the filter fires. This reduces the number of remote API requests while the user is still typing:

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
      [debounceDelay]="debounceDelay"
      placeholder="Find a game">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public sportsData: string[] = [
    'Badminton', 'Basketball', 'Cricket', 'Football',
    'Golf', 'Gymnastics', 'Hockey', 'Tennis'
  ];
  public debounceDelay: number = 300; // ms; set to 0 to disable
}
```

Default `debounceDelay` is `300` ms. Set to `0` to disable debouncing entirely.

---

## Custom Filtering with the filtering Event

For advanced filtering — such as filtering on multiple fields simultaneously — use the `filtering` event with `Predicate` and `updateData`:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="ddlelement"
      [dataSource]="searchData"
      [fields]="fields"
      [itemTemplate]="itemTemplate"
      [query]="query"
      (filtering)="onFiltering($event)"
      placeholder="Find a country">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public searchData: { [key: string]: Object }[] = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda', Code: 'BM' },
    { Name: 'Canada', Code: 'CA' },
    { Name: 'Cameroon', Code: 'CM' },
    { Name: 'Denmark', Code: 'DK' },
    { Name: 'France', Code: 'FR' },
    { Name: 'Finland', Code: 'FI' },
    { Name: 'Germany', Code: 'DE' },
    { Name: 'United Kingdom', Code: 'GB' },
    { Name: 'United States', Code: 'US' }
  ];
  public fields: Object = { value: 'Code', text: 'Name' };
  public itemTemplate: string = '<span><span class="name">${Name}</span> - <span class="code">${Code}</span></span>';
  public query: Query = new Query();

  public onFiltering(e: FilteringEventArgs): void {
    e.preventDefaultAction = true;
    // Build a predicate that matches on both Name and Code fields
    let predicate = new Predicate('Name', 'contains', e.text);
    predicate = predicate.or('Code', 'contains', e.text);
    let query = new Query();
    query = (e.text !== '') ? query.where(predicate) : query;
    // Pass filtered data back to the component
    e.updateData(this.searchData, query);
  }
}
```

**Key pattern:**
1. Set `e.preventDefaultAction = true` to bypass built-in filtering
2. Build a `Predicate` with your custom logic
3. Call `e.updateData(dataSource, query)` to apply the result
