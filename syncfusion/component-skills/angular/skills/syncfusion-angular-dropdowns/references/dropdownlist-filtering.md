# Filtering in Angular DropDownList

## Table of Contents
- [Overview](#overview)
- [Basic Filtering Setup](#basic-filtering-setup)
- [Filtering Event and updateData](#filtering-event-and-updatedata)
- [Preventing Default Filtering](#preventing-default-filtering)
- [Filtering by Multiple Fields](#filtering-by-multiple-fields)
- [Minimum Filter Character Limit](#minimum-filter-character-limit)
- [Filter Type](#filter-type)
- [Case-Sensitive Filtering](#case-sensitive-filtering)
- [Diacritics Filtering](#diacritics-filtering)
- [Debounce Delay](#debounce-delay)
- [Remote Data Filtering](#remote-data-filtering)
- [Common Patterns](#common-patterns)

---

## Overview

Filtering lets users type in the DropDownList input to narrow down the list. The filtering operation starts as soon as characters are typed. Use `[allowFiltering]="true"` to enable it.

---

## Basic Filtering Setup

```typescript
import { Component, OnInit } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="sports"
      [allowFiltering]="true"
      (filtering)="onFilter($event)"
      placeholder="Search sports">
    </ejs-dropdownlist>
  `
})
export class AppComponent implements OnInit {
  public sports: string[] = [];

  ngOnInit(): void {
    this.sports = ['Badminton', 'Basketball', 'Cricket', 'Football', 'Golf', 'Tennis'];
  }

  onFilter(args: FilteringEventArgs): void {
    let query = new Query();
    query = args.text !== '' 
      ? query.where('', 'contains', args.text, true) 
      : query;
    args.updateData(this.sports, query);
  }
}
```

For object arrays, specify the field name in `where()`:
```typescript
onFilter(args: FilteringEventArgs): void {
  let query = new Query();
  if (args.text !== '') {
    query = query.where('Game', 'contains', args.text, true);
  }
  args.updateData(this.sports, query);
}
```

---

## Filtering Event and updateData

The `filtering` event fires on every keystroke. Use `args.updateData()` to pass filtered results back to the component:

```typescript
// FilteringEventArgs properties:
// args.text     — current search text typed by user
// args.event    — the original DOM event
// args.updateData(dataSource, query?) — update the popup list
```

`updateData` accepts:
1. **Filtered array** — pre-filter your array and pass the result
2. **DataManager + Query** — let the DataManager handle the filtering query

---

## Preventing Default Filtering

> **CRITICAL:** When you provide a custom `filtering` event handler, the component's built-in filtering logic still runs **unless you stop it**. This causes double-filtering, resulting in incorrect or empty results.

**Always call `args.updateData()` inside your custom handler.** This tells the component you've handled filtering yourself and prevents the internal filter from running on top of your custom logic.

```typescript
onFilter(args: FilteringEventArgs): void {
  // ✅ CORRECT: Always call updateData() to prevent default filtering
  let query = new Query();
  query = args.text !== '' 
    ? query.where('Game', 'contains', args.text, true) 
    : query;
  args.updateData(this.sports, query);
}

// ❌ INCORRECT: Omitting updateData() lets internal filtering run, causing double-filtering
onFilterWrong(args: FilteringEventArgs): void {
  // Do something with args.text but don't call updateData()
  console.log('User typed:', args.text);
  // Internal filter runs on top → wrong results
}
```

| Scenario | Behavior |
|---|---|
| No `filtering` handler | ✅ Built-in filter only |
| Custom handler with `updateData()` | ✅ Custom filter runs, internal filter suppressed |
| Custom handler without `updateData()` | ❌ Custom logic runs **and** internal filter runs = double-filtering |

**Pattern for conditional filtering (e.g., minimum characters):**

```typescript
onFilter(args: FilteringEventArgs): void {
  let query = new Query();
  
  // Show all results if text is empty
  if (args.text === '') {
    args.updateData(this.sports, query);
    return;
  }
  
  // Only filter after 2+ characters to prevent unnecessary calls
  if (args.text.length < 2) {
    args.updateData(this.sports, query);  // Show all, don't filter yet
    return;
  }
  
  // Apply custom filter
  query = query.where('Game', 'startswith', args.text, true);
  args.updateData(this.sports, query);
}
```

---

## Filtering by Multiple Fields

By default, the DropDownList filters only the mapped `text` field. To search across **multiple fields** (e.g., both `name` and `code`), use the `Predicate` class from `@syncfusion/ej2-data` with `.or()` to combine conditions:

### Filter Text and Value Fields

```typescript
import { Component, ViewChild } from '@angular/core';
import { DropDownListModule, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="countryData"
      [fields]="fields"
      [allowFiltering]="true"
      (filtering)="onFilter($event)"
      placeholder="Search by name or code (e.g. 'CA' or 'Canada')">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public countryData = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda',   Code: 'BM' },
    { Name: 'Canada',    Code: 'CA' },
    { Name: 'Cameroon',  Code: 'CM' },
    { Name: 'Denmark',   Code: 'DK' },
  ];
  public fields = { text: 'Name', value: 'Code' };

  onFilter(args: FilteringEventArgs): void {
    // ✅ Prevent default filtering
    if (args.text === '') {
      args.updateData(this.countryData);
      return;
    }

    // Build a Predicate that matches BOTH Name and Code fields
    const predicate = new Predicate('Name', 'contains', args.text, true)
      .or('Code', 'contains', args.text, true);
    
    const query = new Query().where(predicate);
    args.updateData(this.countryData, query);
  }
}
```

**How it works:**
- `new Predicate('Name', 'contains', args.text, true)` matches items where `Name` contains the typed text (case-insensitive).
- `.or('Code', 'contains', args.text, true)` extends the predicate to **also** match items where `Code` contains the typed text.
- Typing `"ca"` returns `Canada` (name match) AND `CA` (code match).

### Filter Across Three or More Fields

Chain multiple `.or()` calls for each additional field:

```typescript
onFilter(args: FilteringEventArgs): void {
  if (args.text === '') {
    args.updateData(this.employeeData);
    return;
  }

  const predicate = new Predicate('FirstName', 'contains', args.text, true)
    .or('LastName',  'contains', args.text, true)
    .or('EmployeeID', 'contains', args.text, true);
  
  args.updateData(this.employeeData, new Query().where(predicate));
}
```

### Using Different Filter Operators

Replace `'contains'` with `'startswith'` or `'endsWith'` to change the matching strategy:

```typescript
// Match items that START with the typed text (across multiple fields)
const predicate = new Predicate('Name', 'startswith', args.text, true)
  .or('Code', 'startswith', args.text, true);
```

### Remote Data with Multi-Field Predicates

The same `Predicate` approach works with remote `DataManager` sources. The predicate is encoded into the outgoing OData query:

```typescript
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="remoteData"
      [fields]="fields"
      [allowFiltering]="true"
      [debounceDelay]="300"
      (filtering)="onFilter($event)"
      placeholder="Search by name or ID">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public remoteData = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  });
  public fields = { text: 'ContactName', value: 'CustomerID' };

  onFilter(args: FilteringEventArgs): void {
    if (args.text === '') {
      args.updateData(this.remoteData);
      return;
    }

    const predicate = new Predicate('ContactName', 'startswith', args.text, true)
      .or('CustomerID', 'startswith', args.text, true);
    
    const query = new Query()
      .select(['ContactName', 'CustomerID'])
      .where(predicate)
      .take(10);
    
    args.updateData(this.remoteData, query);
  }
}
```

> **Note:** When filtering remote data across multiple fields, ensure the server supports OData `$filter` expressions with `or` conditions. Some APIs may need custom adaptors or server-side filtering logic.

---

## Minimum Filter Character Limit

Prevent filtering until a minimum number of characters are typed. Validate inside the `filtering` event:

```typescript
onFilter(args: FilteringEventArgs): void {
  // Only filter after at least 3 characters
  if (args.text.length < 3) {
    args.updateData(this.sports);
    return;
  }

  const query = new Query().where('Game', 'startsWith', args.text, true);
  args.updateData(this.sports, query);
}
```

This pattern reduces unnecessary API calls when using remote data.

---

## Filter Type

Change the match strategy using the `filterType` property or the `where()` operator in your query.

| FilterType | Description |
|---|---|
| `contains` | Matches items that contain the search text anywhere |
| `startsWith` | Matches items that begin with the search text |
| `endsWith` | Matches items that end with the search text |

**Set a default filter type via property:**

```html
<ejs-dropdownlist
  [dataSource]="sports"
  [allowFiltering]="true"
  filterType="startsWith"
  placeholder="Search">
</ejs-dropdownlist>
```

**Override in filtering event:**

```typescript
onFilter(args: FilteringEventArgs): void {
  // Use 'endsWith' regardless of filterType property
  const query = new Query().where('Game', 'endsWith', args.text, true);
  args.updateData(this.sports, query);
}
```

---

## Case-Sensitive Filtering

By default, filtering is case-insensitive (`ignoreCase: true`). To make filtering case-sensitive, pass `false` as the fourth parameter to `where()`:

```typescript
onFilter(args: FilteringEventArgs): void {
  if (args.text === '') {
    args.updateData(this.sports);
    return;
  }

  // Fourth parameter = false → case-sensitive match
  const query = new Query().where('Game', 'contains', args.text, false);
  args.updateData(this.sports, query);
}
```

You can also use the `[ignoreCase]` property on the component directly.

---

## Diacritics Filtering

Diacritics filtering allows matching regardless of accent marks (e.g., "cafe" matches "café"). Enable with `[ignoreAccent]="true"`:

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="countries"
      [allowFiltering]="true"
      [ignoreAccent]="true"
      placeholder="Search (accent-insensitive)">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public countries = ['Åland', 'España', 'Österreich', 'Ångermanland', 'Île-de-France'];
}
```

With `ignoreAccent`, typing "a" matches "Åland", and "e" matches "España".

---

## Debounce Delay

`debounceDelay` sets a delay (milliseconds) before the filtering action fires after the user stops typing. This reduces rapid successive requests — especially useful with remote data.

```html
<ejs-dropdownlist
  [dataSource]="remoteData"
  [fields]="fields"
  [allowFiltering]="true"
  [debounceDelay]="300"
  (filtering)="onFilter($event)"
  placeholder="Search with debounce">
</ejs-dropdownlist>
```

- Default value: `0` (debounce disabled)
- Recommended for remote data: `300`–`500` ms

---

## Remote Data Filtering

When filtering remote data, construct a `DataManager` query in the `filtering` event. The DataManager sends the filtered query to the server:

```typescript
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="remoteData"
      [fields]="fields"
      [allowFiltering]="true"
      [debounceDelay]="300"
      (filtering)="onFilter($event)"
      placeholder="Search customers">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public remoteData = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  });
  public fields = { text: 'ContactName', value: 'CustomerID' };

  onFilter(args: FilteringEventArgs): void {
    let query = new Query();
    if (args.text !== '') {
      query = query.where('ContactName', 'startsWith', args.text, true);
    }
    args.updateData(this.remoteData, query);
  }
}
```

---

## Common Patterns

### Search with Highlight
To highlight matching characters in results, use a custom `itemTemplate`. See [templates.md](templates.md) for how-to.

Alternatively, refer to the [how-to guide](how-to.md#highlight-filtered-characters) for a complete highlight implementation.

### Combining with Virtualization
When `[enableVirtualization]="true"` is also set, filtering still works — the DropDownList sends a server request for the full dataset and applies the filter on virtual scroll. See [grouping-and-virtualization.md](grouping-and-virtualization.md#filtering-with-virtualization).

### Prevent Filtering on Short Input
```typescript
onFilter(args: FilteringEventArgs): void {
  if (args.text.length < 2) return; // do nothing, keep current list
  const query = new Query().where('name', 'contains', args.text, true);
  args.updateData(this.data, query);
}
```

---

## See Also

- [Data Binding](data-binding.md) — remote data setup
- [Grouping & Virtualization](grouping-and-virtualization.md) — filtering with virtual scroll
- [How-To](how-to.md) — highlight filtering, search-on-filtering recipes
