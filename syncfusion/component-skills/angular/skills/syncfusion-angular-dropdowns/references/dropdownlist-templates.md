# Templates in Angular DropDownList

## Table of Contents
- [Overview](#overview)
- [Item Template](#item-template)
- [Value Template](#value-template)
- [Group Template](#group-template)
- [Header Template](#header-template)
- [Footer Template](#footer-template)
- [No Records Template](#no-records-template)
- [Action Failure Template](#action-failure-template)
- [Combining Templates](#combining-templates)

---

## Overview

Templates let you fully control the visual rendering of the DropDownList at several points:

| Template | Property | Where it renders |
|---|---|---|
| Item | `itemTemplate` | Each item in the dropdown list |
| Value | `valueTemplate` | The selected value shown in the input |
| Group | `groupTemplate` | Group header titles (when using `groupBy`) |
| Header | `headerTemplate` | Static element at the top of the popup |
| Footer | `footerTemplate` | Static element at the bottom of the popup |
| No Records | `noRecordsTemplate` | When the list is empty or filter returns no results |
| Action Failure | `actionFailureTemplate` | When a remote data request fails |

All templates use Angular's `ng-template` with the `let-data` context variable to access item properties.

---

## Item Template

Customize how each list item renders. Access item properties via `data`:

```typescript
import { Component } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  styles: [`
    .item { display: flex; justify-content: space-between; }
    .name { font-weight: bold; }
    .city { color: #888; font-size: 12px; }
  `],
  template: `
    <ejs-dropdownlist
      [dataSource]="employees"
      [fields]="fields"
      [popupHeight]="'250px'"
      placeholder="Select an employee">
      <ng-template #itemTemplate let-data>
        <span class="item">
          <span class="name">{{ data.FirstName }} {{ data.LastName }}</span>
          <span class="city">{{ data.City }}</span>
        </span>
      </ng-template>
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public employees = [
    { FirstName: 'Andrew', LastName: 'Fuller', City: 'Tacoma', EmployeeID: 2 },
    { FirstName: 'Anne', LastName: 'Dodsworth', City: 'London', EmployeeID: 9 },
    { FirstName: 'Janet', LastName: 'Leverling', City: 'Kirkland', EmployeeID: 3 }
  ];
  public fields = { text: 'FirstName', value: 'EmployeeID' };
}
```

---

## Value Template

Customize the display of the selected value in the input field (distinct from the list item rendering):

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  styles: [`
    .selected-value { color: #0078d4; font-weight: 500; }
  `],
  template: `
    <ejs-dropdownlist
      [dataSource]="employees"
      [fields]="fields"
      placeholder="Select an employee">
      <!-- itemTemplate for the popup list -->
      <ng-template #itemTemplate let-data>
        <span>{{ data.FirstName }} — {{ data.City }}</span>
      </ng-template>

      <!-- valueTemplate for the selected input display -->
      <ng-template #valueTemplate let-data>
        <span class="selected-value">
          {{ data.FirstName }} {{ data.LastName }} ({{ data.City }})
        </span>
      </ng-template>
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public employees = [
    { FirstName: 'Andrew', LastName: 'Fuller', City: 'Tacoma', EmployeeID: 2 },
    { FirstName: 'Anne', LastName: 'Dodsworth', City: 'London', EmployeeID: 9 }
  ];
  public fields = { text: 'FirstName', value: 'EmployeeID' };
}
```

> The `valueTemplate` only renders when an item is selected. Before selection, `placeholder` is shown.

---

## Group Template

Customize the group header that appears above grouped items. Works alongside `fields.groupBy`:

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  styles: [`
    .group-header { color: #0078d4; font-size: 13px; font-weight: bold; }
  `],
  template: `
    <ejs-dropdownlist
      [dataSource]="employees"
      [fields]="fields"
      placeholder="Select an employee">
      <ng-template #groupTemplate let-data>
        <strong class="group-header">📍 {{ data.City }}</strong>
      </ng-template>
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public employees = [
    { name: 'Andrew', City: 'Tacoma' },
    { name: 'Janet', City: 'Kirkland' },
    { name: 'Anne', City: 'London' },
    { name: 'Robert', City: 'London' }
  ];
  public fields = { text: 'name', value: 'name', groupBy: 'City' };
}
```

The group template receives the group's key value (e.g., `data.City`). Group headers appear both inline between items and as fixed floating headers while scrolling.

---

## Header Template

Add a static custom element at the top of the popup. Useful for column labels in multi-column layouts:

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  styles: [`
    .header { display: flex; background: #f0f0f0; padding: 4px 8px; font-weight: bold; }
    .col-name { flex: 1; }
    .col-city { width: 100px; text-align: right; }
    .item-row { display: flex; padding: 4px 8px; }
  `],
  template: `
    <ejs-dropdownlist
      [dataSource]="employees"
      [fields]="fields"
      placeholder="Select">
      <!-- Column header row -->
      <ng-template #headerTemplate>
        <span class="header">
          <span class="col-name">Name</span>
          <span class="col-city">City</span>
        </span>
      </ng-template>
      <!-- Each item row -->
      <ng-template #itemTemplate let-data>
        <span class="item-row">
          <span class="col-name">{{ data.FirstName }}</span>
          <span class="col-city">{{ data.City }}</span>
        </span>
      </ng-template>
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public employees = [
    { FirstName: 'Andrew', City: 'Tacoma', EmployeeID: 2 },
    { FirstName: 'Anne', City: 'London', EmployeeID: 9 }
  ];
  public fields = { text: 'FirstName', value: 'EmployeeID' };
}
```

> The `headerTemplate` receives no data context — it is static markup.

---

## Footer Template

Add a static element at the bottom of the popup — useful for item counts, action links, or "Add new" buttons:

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  styles: [`
    .footer { background: #f5f5f5; padding: 6px 10px; font-size: 12px; color: #555; }
  `],
  template: `
    <ejs-dropdownlist
      [dataSource]="sports"
      placeholder="Select a sport">
      <ng-template #footerTemplate>
        <span class="footer">Total: {{ sports.length }} sports available</span>
      </ng-template>
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public sports = ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'];
}
```

> Like `headerTemplate`, the footer is static and does not receive item data.

---

## No Records Template

Shown when the list is empty (no data source items, or filtering returns zero results):

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="emptyData"
      [allowFiltering]="true"
      placeholder="Search">
      <ng-template #noRecordsTemplate>
        <span>😕 No matching records found</span>
      </ng-template>
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public emptyData: string[] = [];
}
```

The default message is `"No records found"`. Customize this template or use [localization](customization-and-styling.md#localization) to translate it.

---

## Action Failure Template

Shown when a remote data fetch request fails (network error, server error, etc.):

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="remoteData"
      [fields]="fields"
      placeholder="Select">
      <ng-template #actionFailureTemplate>
        <span style="color: red;">⚠️ Failed to load data. Please retry.</span>
      </ng-template>
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  // DataManager pointing to a failing endpoint
  public remoteData = /* ... */;
  public fields = { text: 'Name', value: 'ID' };
}
```

---

## Combining Templates

You can use multiple templates together:

```html
<ejs-dropdownlist
  [dataSource]="employees"
  [fields]="fields"
  [allowFiltering]="true"
  placeholder="Search employees">

  <!-- Custom header with column labels -->
  <ng-template #headerTemplate>
    <span class="header-row">
      <span>Name</span><span>Department</span>
    </span>
  </ng-template>

  <!-- Two-column item layout -->
  <ng-template #itemTemplate let-data>
    <span class="item-row">
      <span>{{ data.name }}</span>
      <span>{{ data.dept }}</span>
    </span>
  </ng-template>

  <!-- Show full name in selected input -->
  <ng-template #valueTemplate let-data>
    <span>{{ data.name }} · {{ data.dept }}</span>
  </ng-template>

  <!-- Empty state -->
  <ng-template #noRecordsTemplate>
    <span>No employees match your search</span>
  </ng-template>

</ejs-dropdownlist>
```

---

## See Also

- [Grouping & Virtualization](grouping-and-virtualization.md) — `groupBy` field for group headers
- [Filtering](filtering.md) — filtering with `noRecordsTemplate` empty state
- [How-To](how-to.md) — icons in list items, tooltip on items
