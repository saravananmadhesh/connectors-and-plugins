# Templates — Syncfusion Angular Mention

## Table of Contents
- [Overview](#overview)
- [Item Template](#item-template)
- [Display Template](#display-template)
- [No Records Template](#no-records-template)
- [Spinner Template](#spinner-template)
- [Group Template](#group-template)
- [Action Failure Template](#action-failure-template)

---

## Overview

The Mention uses the Syncfusion Template Engine to customize its rendered elements. Templates are defined via Angular `ng-template` directives inside the `<ejs-mention>` tag, or as inline string/function values on the component properties.

| Template | Property | Purpose |
|----------|----------|---------|
| Item template | `itemTemplate` | Customize each suggestion list item |
| Display template | `displayTemplate` | Customize the inserted text after selection |
| No records template | `noRecordsTemplate` | Content shown when no suggestions match |
| Spinner template | `spinnerTemplate` | Loading indicator during remote data fetch |
| Group template | `groupTemplate` | Header rendered for each group in the list |
| Action failure template | `actionFailureTemplate` | Content shown when a remote request fails |

---

## Item Template

Use `itemTemplate` to customize the layout of each suggestion item. Access data fields using the `let-data` directive.

The example below splits each item into two columns (name and city):

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  styles: [`
    .name { font-weight: bold; margin-right: 8px; }
    .city { color: #666; font-size: 12px; }
  `],
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention
      [dataSource]="dataSource"
      [query]="query"
      [fields]="fields"
      [target]="mentionTarget"
      [sortOrder]="sortOrder"
      popupWidth="250px">
      <ng-template #itemTemplate let-data>
        <span>
          <span class="name">{{ data.FirstName }}</span>
          <span class="city">{{ data.City }}</span>
        </span>
      </ng-template>
    </ejs-mention>
  `
})
export class AppComponent {
  public dataSource: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public mentionTarget: string = '#mentionElement';
  public query: Query = new Query().from('Employees').select(['FirstName', 'City', 'EmployeeID']).take(6);
  public fields: Object = { text: 'FirstName', value: 'EmployeeID' };
  public sortOrder: string = 'Ascending';
}
```

---

## Display Template

Use `displayTemplate` to control what text is inserted into the target element after the user selects an item. Without this, only the `text` field value is inserted.

The example below inserts `FirstName - City`:

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  styles: [`
    .city { color: #666; margin-left: 8px; }
  `],
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention
      [dataSource]="dataSource"
      [query]="query"
      [fields]="fields"
      [target]="mentionTarget"
      [sortOrder]="sortOrder"
      popupWidth="250px">
      <ng-template #itemTemplate let-data>
        <span>
          <span>{{ data.FirstName }}</span>
          <span class="city">{{ data.City }}</span>
        </span>
      </ng-template>
      <ng-template #displayTemplate let-data>
        <!-- This is what gets inserted into the target element -->
        <span>{{ data.FirstName }} - {{ data.City }}</span>
      </ng-template>
    </ejs-mention>
  `
})
export class AppComponent {
  public dataSource: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public mentionTarget: string = '#mentionElement';
  public query: Query = new Query().from('Employees').select(['FirstName', 'City', 'EmployeeID']).take(6);
  public fields: Object = { text: 'FirstName', value: 'EmployeeID' };
  public sortOrder: string = 'Ascending';
}
```

---

## No Records Template

Use `noRecordsTemplate` to customize the content shown when no items match the user's search or the data source is empty.

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
    <ejs-mention
      [dataSource]="userData"
      [target]="mentionTarget"
      [noRecordsTemplate]="noRecordsTemplate">
    </ejs-mention>
  `
})
export class AppComponent {
  // Empty data to trigger no-records state
  public userData: string[] = [];
  public mentionTarget: string = '#mentionElement';
  public noRecordsTemplate: string = '<span class="norecord"> NO DATA AVAILABLE</span>';
}
```

> You can also use an `ng-template` for richer markup in `noRecordsTemplate`.

---

## Spinner Template

Use `spinnerTemplate` to customize the loading indicator shown while remote data is being fetched.

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  styles: [`
    .spinner_loader {
      width: 30px; height: 30px;
      border: 4px solid #ccc;
      border-top-color: #1890ff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 10px auto;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `],
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention
      [dataSource]="searchData"
      [query]="query"
      [fields]="fields"
      [target]="mentionTarget"
      popupWidth="250px">
      <ng-template #spinnerTemplate>
        <div class="spinner_loader"></div>
      </ng-template>
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
  public query: Query = new Query().from('Employees').select(['FirstName', 'City', 'EmployeeID']).take(26);
  public fields: Object = { text: 'FirstName', value: 'EmployeeID' };
}
```

---

## Group Template

Use `groupTemplate` to customize the header rendered for each item group when `fields.groupBy` is set.

```typescript
// In your component class
public fields: Object = { text: 'Name', groupBy: 'Category' };
```

```html
<ejs-mention [dataSource]="userData" [fields]="fields" [target]="mentionTarget">
  <ng-template #groupTemplate let-data>
    <strong>{{ data.Category }}</strong>
  </ng-template>
</ejs-mention>
```

---

## Action Failure Template

Use `actionFailureTemplate` to specify content shown when a remote data request fails. The default message is `'Request failed'`.

```typescript
public actionFailureTemplate: string = '<span class="action-failure">⚠️ Failed to load suggestions</span>';
```

```html
<ejs-mention
  [dataSource]="remoteData"
  [actionFailureTemplate]="actionFailureTemplate"
  [target]="mentionTarget">
</ejs-mention>
```
