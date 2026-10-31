# Grouping & Templates in Angular AutoComplete

## Table of Contents
- [Grouping Items](#grouping-items)
- [Item Template](#item-template)
- [Group Template](#group-template)
- [Header Template](#header-template)
- [Footer Template](#footer-template)
- [No Records Template](#no-records-template)
- [Action Failure Template](#action-failure-template)

---

## Grouping Items

Use the `groupBy` field in the `fields` property to categorize suggestion list items under group headers.
Group headers appear both inline within the list and as a fixed header at the top of the visible area when scrolling.

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
      [dataSource]="vegetableData"
      [fields]="fields"
      placeholder="Find a vegetable">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public vegetableData: { [key: string]: Object }[] = [
    { Vegetable: 'Cabbage',    Category: 'Leafy and Salad', Id: 'item1' },
    { Vegetable: 'Spinach',    Category: 'Leafy and Salad', Id: 'item2' },
    { Vegetable: 'Wheat grass',Category: 'Leafy and Salad', Id: 'item3' },
    { Vegetable: 'Chickpea',   Category: 'Beans',           Id: 'item4' },
    { Vegetable: 'Green bean', Category: 'Beans',           Id: 'item5' },
    { Vegetable: 'Horse gram', Category: 'Beans',           Id: 'item6' },
    { Vegetable: 'Garlic',     Category: 'Bulb and Stem',   Id: 'item7' },
    { Vegetable: 'Onion',      Category: 'Bulb and Stem',   Id: 'item8' }
  ];
  // 'groupBy' organizes items by category, 'value' maps the display text
  public fields: Object = { groupBy: 'Category', value: 'Vegetable' };
}
```

**Customizing the group header:** Use `groupTemplate` (see [Group Template](#group-template) below).

---

## Item Template

Use `itemTemplate` to control how each suggestion item is rendered in the popup list.
The template has access to all data fields from the data source.

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  // Use ng-template inside ejs-autocomplete for item template
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="data"
      [sortOrder]="sorting"
      [fields]="fields"
      [query]="query"
      placeholder="Find an employee">
      <ng-template #itemTemplate let-data>
        <span>
          <span class="name">{{ data.FirstName }}</span>
          <span class="city">{{ data.City }}</span>
        </span>
      </ng-template>
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public data: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public fields: Object = { value: 'FirstName' };
  public query: Query = new Query().from('Employees').select(['FirstName', 'City', 'EmployeeID']).take(6);
  public sorting: string = 'Ascending';
}
```

---

## Group Template

Use `groupTemplate` to customize the group category header that appears above each group of suggestions.
This template applies to both inline and fixed (sticky) group headers.

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { Query, Predicate, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="data"
      [fields]="fields"
      [sortOrder]="sorting"
      [query]="query"
      placeholder="Find an employee">
      <ng-template #groupTemplate let-data>
        <strong>{{ data.City }}</strong>
      </ng-template>
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public data: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public groupPredicate = new Predicate('City', 'equal', 'london').or('City', 'equal', 'seattle');
  public fields: Object = { value: 'FirstName', groupBy: 'City' };
  public query: Query = new Query()
    .from('Employees')
    .select(['FirstName', 'City', 'EmployeeID'])
    .take(6)
    .where(this.groupPredicate);
  public sorting: string = 'Ascending';
}
```

---

## Header Template

Use `headerTemplate` to add static content at the top of the popup list — such as column labels when items display multiple fields:

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
      [sortOrder]="sorting"
      [query]="query"
      placeholder="Find an employee">
      <ng-template #itemTemplate let-data>
        <span class="item">
          <span class="name">{{ data.FirstName }}</span>
          <span class="city">{{ data.City }}</span>
        </span>
      </ng-template>
      <ng-template #headerTemplate>
        <span class="head">
          <span class="name">Name</span>
          <span class="city">City</span>
        </span>
      </ng-template>
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public data: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public fields: Object = { value: 'FirstName' };
  public query: Query = new Query().from('Employees').select(['FirstName', 'City', 'EmployeeID']).take(6);
  public sorting: string = 'Ascending';
}
```

---

## Footer Template

Use `footerTemplate` to add content at the bottom of the popup list — for example, displaying the total count of suggestions:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AutoCompleteModule, AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      #sample
      [dataSource]="data"
      placeholder="Find a game"
      (open)="onOpen($event)">
      <ng-template #footerTemplate>
        <span class="foot"></span>
      </ng-template>
    </ejs-autocomplete>
  `
})
export class AppComponent {
  @ViewChild('sample')
  public autoCompleteObj!: AutoCompleteComponent;

  public data: string[] = [
    'Badminton', 'Basketball', 'Cricket', 'Football', 'Golf', 'Gymnastics', 'Hockey'
  ];

  public onOpen(): void {
    const count = this.autoCompleteObj.getItems().length;
    const ele = document.getElementsByClassName('foot')[0] as HTMLElement;
    ele.innerHTML = 'Total list item: ' + count;
  }
}
```

---

## No Records Template

Use `noRecordsTemplate` to customize the message displayed when no suggestions are found:

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
      placeholder="Find an item">
      <ng-template #noRecordsTemplate>
        <span class="norecord">NO DATA AVAILABLE</span>
      </ng-template>
    </ejs-autocomplete>
  `
})
export class AppComponent {
  // Empty data source to trigger no-records template
  public data: string[] = [];
}
```

Default message: `'No records found'`

---

## Action Failure Template

Use `actionFailureTemplate` to show a custom error message when a remote data fetch request fails:

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
      [query]="query"
      [fields]="fields"
      placeholder="Find an employee">
      <ng-template #actionFailureTemplate>
        <span class="action-failure">Data fetch failed</span>
      </ng-template>
    </ejs-autocomplete>
  `
})
export class AppComponent {
  // Intentionally wrong URL to demonstrate action failure template
  public data: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public query: Query = new Query().from('Employees').select(['FirstName']).take(6);
  public fields: Object = { value: 'FirstName' };
}
```

Default message: `'Request failed'`

---

## Template Summary

| Template Property | Purpose | Trigger |
|---|---|---|
| `itemTemplate` | Customize each list item | Always, for all items |
| `groupTemplate` | Customize group category headers | When `fields.groupBy` is set |
| `headerTemplate` | Static content above the list | Always when popup opens |
| `footerTemplate` | Content below the list | Always when popup opens |
| `noRecordsTemplate` | Message when no items match | When filter returns 0 results |
| `actionFailureTemplate` | Error message for remote failures | When DataManager request fails |
