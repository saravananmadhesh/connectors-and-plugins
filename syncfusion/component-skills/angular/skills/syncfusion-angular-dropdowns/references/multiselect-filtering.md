# Filtering — Syncfusion Angular MultiSelect Dropdown

## Table of Contents
- [Enabling Filtering](#enabling-filtering)
- [Filter Types](#filter-types)
- [The Filtering Event](#the-filtering-event)
- [Remote Filtering](#remote-filtering)
- [Minimum Character Threshold](#minimum-character-threshold)
- [Case Sensitivity](#case-sensitivity)
- [Performance Tips](#performance-tips)

---

## Enabling Filtering

Set `allowFiltering="true"` to add a search box inside the popup. As the user types, the list narrows to matching items.

```typescript
@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="countries"
      [allowFiltering]="true"
      filterType="contains"
      (filtering)="onFilter($event)"
      placeholder="Search and select countries">
    </ejs-multiselect>
  `
})
export class AppComponent {
  public countries: string[] = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia',
    'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Denmark'
  ];

  onFilter(args: FilteringEventArgs): void {
    let query = new Query();
    if (args.text) {
      query = query.where('', 'contains', args.text, true);
    }
    args.updateData(this.countries, query);
  }
}
```

---

## Filter Types

The `filterType` property controls how the search string is matched:

| Value | Behavior | Example |
|-------|----------|---------|
| `startsWith` | Matches items beginning with the typed text | `"Ang"` → Angular, Angular.js |
| `contains` | Matches items containing the typed text anywhere | `"scr"` → JavaScript, TypeScript |
| `endsWith` | Matches items ending with the typed text | `"Script"` → JavaScript, TypeScript |

```html
<!-- startsWith — fastest for alphabetical lists -->
<ejs-multiselect [dataSource]="items" [allowFiltering]="true" filterType="startsWith">

<!-- contains — most flexible for general search -->
<ejs-multiselect [dataSource]="items" [allowFiltering]="true" filterType="contains">
```

> `filterType` only sets the default behavior. Inside the `filtering` event handler, you can use any `Query.where()` operator regardless of `filterType`.

---

## The Filtering Event

The `filtering` event fires on every keystroke in the search input. Use it to apply a `Query` to your data and return filtered results via `args.updateData()`.

```typescript
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

interface Employee {
  id: number;
  name: string;
  department: string;
}

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="employees"
      [fields]="fields"
      [allowFiltering]="true"
      filterType="startsWith"
      (filtering)="onFilter($event)"
      placeholder="Search employees">
    </ejs-multiselect>
  `
})
export class AppComponent {
  public employees: Employee[] = [
    { id: 1, name: 'Alice Johnson', department: 'Engineering' },
    { id: 2, name: 'Bob Smith',     department: 'Marketing'   },
    { id: 3, name: 'Carol White',   department: 'Finance'     },
    { id: 4, name: 'David Brown',   department: 'Engineering' },
  ];
  public fields = { text: 'name', value: 'id' };

  onFilter(args: FilteringEventArgs): void {
    let query = new Query();
    if (args.text !== '') {
      // 4th argument `true` = case-insensitive
      query = query.where('name', 'startsWith', args.text, true);
    }
    args.updateData(this.employees, query);
  }
}
```

**Key points about the event:**
- `args.text` — the current search string typed by the user
- `args.updateData(dataSource, query)` — MUST be called to update the popup list
- If `args.text` is empty, pass the full data source with no query to restore all items
- The `Query` object comes from `@syncfusion/ej2-data`

---

## Remote Filtering

For server-side filtered data, build the query inside the `filtering` event and pass a `DataManager` to `updateData`:

```typescript
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="dataManager"
      [fields]="fields"
      [allowFiltering]="true"
      (filtering)="onFilter($event)"
      placeholder="Search customers">
    </ejs-multiselect>
  `
})
export class AppComponent {
  public dataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  });
  public fields = { text: 'ContactName', value: 'CustomerID' };

  onFilter(args: FilteringEventArgs): void {
    let query = new Query().from('Customers').select(['CustomerID', 'ContactName']);
    if (args.text) {
      query = query.where('ContactName', 'startsWith', args.text, true);
    }
    args.updateData(this.dataManager, query);
  }
}
```

The `DataManager` sends the query to the server, so only matching records are fetched — efficient for large datasets.

---

## Minimum Character Threshold

To avoid firing a remote request on every single keypress, validate the input length in the handler before calling `updateData`:

```typescript
onFilter(args: FilteringEventArgs): void {
  if (args.text.length < 3) {
    // Don't query until at least 3 characters are typed
    args.updateData([], new Query()); // show empty list or return early
    return;
  }
  const query = new Query().where('name', 'contains', args.text, true);
  args.updateData(this.remoteDataManager, query);
}
```

This pattern is especially important for remote filtering where each request has network cost.

---

## Case Sensitivity

The 4th argument to `Query.where()` controls case sensitivity:

```typescript
// Case-insensitive (recommended for user-facing search)
query = query.where('name', 'startsWith', args.text, true);

// Case-sensitive
query = query.where('name', 'startsWith', args.text, false);
// or simply omit the 4th argument (defaults to false = case-sensitive)
query = query.where('name', 'startsWith', args.text);
```

---

## Performance Tips

- **Use `startsWith` for alphabetical data** — it is faster than `contains` because it only checks the beginning of strings
- **Set a minimum character threshold** for remote sources (see above) — prevents a flood of requests
- **For large local data (1000+ items), combine filtering with `enableVirtualization`** — see `references/advanced-features.md`
- **Debounce is built-in:** The MultiSelect has a built-in debounce on the `filtering` event for remote scenarios; no manual debounce is needed
- **Avoid heavy computation in `onFilter`** — the handler runs on every keypress; keep it lean
