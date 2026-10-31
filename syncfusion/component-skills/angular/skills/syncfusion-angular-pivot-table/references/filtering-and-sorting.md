````markdown
# Filtering & Sorting

## Table of Contents
- [Member Filtering](#member-filtering)
  - [Enable Member Filtering](#enable-member-filtering)
  - [Append Current Selection to Existing Filters](#append-current-selection-to-existing-filters)
  - [Select and Unselect All Members](#select-and-unselect-all-members)
  - [Search Specific Member(s)](#search-specific-members)
  - [Sort Members in Member Editor](#sort-members-in-member-editor)
  - [Limit Members Displayed (maxNodeLimitInMemberEditor)](#limit-members-displayed)
  - [Load Members On-Demand (OLAP)](#load-members-on-demand-olap)
  - [Load Members by Level Number (OLAP)](#load-members-by-level-number-olap)
- [Label Filtering](#label-filtering)
  - [Filtering String Data](#filtering-string-data)
  - [Filtering Number Data](#filtering-number-data)
  - [Filtering Date Data](#filtering-date-data)
  - [Clearing Label Filter](#clearing-label-filter)
- [Value Filtering](#value-filtering)
  - [Top and Bottom N Filtering](#top-and-bottom-n-filtering)
  - [Clearing Value Filter](#clearing-value-filter)
- [Filtering Events](#filtering-events)
  - [memberFiltering Event](#memberfiltering-event)
  - [memberEditorOpen Event](#membereditoropen-event)
  - [actionBegin / actionComplete / actionFailure](#actionbegin--actioncomplete--actionfailure)
- [Member Sorting](#member-sorting)
- [Value Sorting](#value-sorting)
- [Sorting Events](#sorting-events)
- [Best Practices](#best-practices)

---

## Member Filtering

Include or exclude specific field members from the pivot table. Member filtering is enabled by default through `allowMemberFilter` in `dataSourceSettings`.

### Enable Member Filtering

```typescript
import { Component, OnInit } from '@angular/core';
import { IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { Pivot_Data } from './datasource';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';

@Component({
  imports: [PivotViewAllModule, PivotFieldListAllModule],
  standalone: true,
  selector: 'app-container',
  template: `<ejs-pivotview #pivotview id='PivotView' height='350' [dataSourceSettings]=dataSourceSettings [width]=width></ejs-pivotview>`
})
export class AppComponent implements OnInit {
  public width?: string;
  public dataSourceSettings?: DataSourceSettingsModel;

  ngOnInit(): void {
    this.width = '100%';
    this.dataSourceSettings = {
      dataSource: Pivot_Data as IDataSet[],
      expandAll: false,
      allowMemberFilter: true,
      drilledMembers: [{ name: 'Country', items: ['France'] }],
      filterSettings: [{ name: 'Country', type: 'Exclude', items: ['United States'] }],
      columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
      values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
      rows: [{ name: 'Country' }, { name: 'Products' }],
      formatSettings: [{ name: 'Amount', format: 'C0' }],
      filters: []
    };
  }
}
```

**Key properties on `filterSettings` for member filtering:**

- `name`: Field name to filter.
- `type`: `"Include"` or `"Exclude"`.
- `items`: Members to include/exclude.
- `levelCount`: Number of hierarchy levels to fetch from the cube (OLAP only).

> Members that don't exist in the data are silently ignored.

### Append Current Selection to Existing Filters

By default, applying a new member selection **replaces** the previous filter. Enable the **Add current selection to filter** option in the Filter dialog to accumulate selections instead of replacing them — useful for building up multi-select filters incrementally.

Workflow:
1. Open the Filter dialog.
2. Search/select a member.
3. Enable **Add current selection to filter**.
4. Click **OK**.
5. Repeat to add more members without losing earlier selections.

This is a UI-only behavior. Code-based `filterSettings` already accept `items: [...]` arrays containing all members you want.

### Select and Unselect All Members

The Member Editor dialog has an **All** checkbox at the top:

- **Check** it → select every available member.
- **Uncheck** it → deselect every member (the **OK** button becomes disabled in this case).
- **Partially checked** → indicates a mixed selection (some members selected, some not).

### Search Specific Member(s)

Type the leading characters of a member name in the **search box** at the top of the Member Editor. The list filters down to matching members in real time — useful for large hierarchies.

### Sort Members in Member Editor

Use the ascending/descending sort icons in the Member Editor toolbar to arrange members A→Z / Z→A (or numeric low→high / high→low). With neither selected, members appear in their original data-source order.

### Limit Members Displayed

By default, the Member Editor shows up to **1000** members. Control this with `maxNodeLimitInMemberEditor`:

```typescript
@Component({
  template: `<ejs-pivotview [dataSourceSettings]="dataSourceSettings" [maxNodeLimitInMemberEditor]="100" showGroupingBar="true" showFieldList="true"></ejs-pivotview>`
})
export class AppComponent {
  dataSourceSettings = {
    dataSource: this.data(1000),
    expandAll: true,
    allowMemberFilter: true,
    rows: [{ name: 'ProductID' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Price' }, { name: 'Sold' }]
  };
}
```

When the member count exceeds the limit, a message is shown (e.g. *"4500 more items. Search to refine further."*). Use the search box to find members beyond the displayed window.

### Load Members On-Demand (OLAP)

> **OLAP only.** Improves performance by loading only the first level of members on dialog open. Set `loadOnDemandInMemberEditor: true` (default).

```typescript
@Component({
  providers: [FieldListService, CalculatedFieldService],
  template: `<ejs-pivotview [dataSourceSettings]="dataSourceSettings" [allowCalculatedField]="true" [loadOnDemandInMemberEditor]="true" showFieldList="true"></ejs-pivotview>`
})
export class AppComponent {
  dataSourceSettings = {
    catalog: 'Adventure Works DW 2008 SE',
    cube: 'Adventure Works',
    providerType: 'SSAS',
    url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
    localeIdentifier: 1033,
    rows: [{ name: '[Customer].[Customer Geography]', caption: 'Customer Geography' }],
    columns: [{ name: '[Product].[Product Categories]', caption: 'Product Categories' }, { name: '[Measures]' }],
    values: [{ name: '[Measures].[Customer Count]' }, { name: '[Measures].[Internet Sales Amount]' }],
    filters: [{ name: '[Date].[Fiscal]' }]
  };
}
```

**How it works:**
- Initial load: only the first level members (e.g. Country) are fetched.
- Search only matches the currently loaded level.
- Load deeper levels by:
  - **Expanding** a member (loads only its children), or
  - **Selecting a level** from the level dropdown (loads all members at that level across the hierarchy).
- Once loaded, members stay cached for the session.

If you set `loadOnDemandInMemberEditor: false`, all levels load up-front (slower dialog open, but faster expand/search).

### Load Members by Level Number (OLAP)

> **OLAP only.** Use `levelCount` in `filterSettings` to control how many levels are loaded.

```typescript
dataSourceSettings = {
  // ...other OLAP settings
  filterSettings: [
    {
      name: '[Customer].[Customer Geography]',
      items: ['[Customer].[Customer Geography].[State-Province].&[NSW]&[AU]'],
      type: 'Exclude',
      levelCount: 2  // load Country and State-Province
    }
  ]
};
```

`levelCount` defaults to **1** (top level only). Increase it to pre-load additional levels; search and filter only apply to loaded levels.

---

## Label Filtering

Filter row/column field headers by text, number, or date. Enable with `allowLabelFilter: true`.

### Filtering String Data

```typescript
filterSettings: [{
  name: 'Country',
  type: 'Label',
  condition: 'Contains',
  value1: 'United'
}]
```

**Available string operators:**

| Operator | Description |
|---|---|
| Equals | Exact match. |
| DoesNotEquals | Not an exact match. |
| BeginWith | Starts with the value. |
| DoesNotBeginWith | Does not start with the value. |
| EndsWith | Ends with the value. |
| DoesNotEndsWith | Does not end with the value. |
| Contains | Contains the value anywhere. |
| DoesNotContains | Does not contain the value. |
| GreaterThan | Alphabetically greater. |
| GreaterThanOrEqualTo | Alphabetically greater or equal. |
| LessThan | Alphabetically less. |
| LessThanOrEqualTo | Alphabetically less or equal. |
| Between | Between two values (requires `value2`). |
| NotBetween | Not between two values (requires `value2`). |

### Filtering Number Data

Set `type: 'Number'` to filter numeric fields:

```typescript
filterSettings: [{
  name: 'Amount',
  type: 'Number',
  condition: 'LessThan',
  value1: '40000'
}]
```

**Number operators:** Equals, DoesNotEquals, GreaterThan, GreaterThanOrEqualTo, LessThan, LessThanOrEqualTo, Between, NotBetween. Only available on numeric fields.

### Filtering Date Data

Set `type: 'Date'` and configure a `formatSettings` entry with a date format:

```typescript
dataSourceSettings = {
  formatSettings: [{ name: 'Year', format: 'dd/MM/yyyy-hh:mm', type: 'date' }],
  filterSettings: [{
    name: 'Year',
    type: 'Date',
    condition: 'Before',
    value1: new Date('2016')
  }]
};
```

**Date operators:** Equals, DoesNotEquals, Before, BeforeOrEqualTo, After, AfterOrEqualTo, Between, NotBetween.

### Clearing Label Filter

Click the **Clear** option at the bottom of the Filter dialog (under the **Label** or **Date** tab) to remove the existing label filter.

---

## Value Filtering

Filter based on aggregated values from measure fields. Enable with `allowValueFilter: true`.

```typescript
dataSourceSettings = {
  allowValueFilter: true,
  filterSettings: [{
    name: 'Country',
    measure: 'Sold',
    type: 'Value',
    condition: 'GreaterThan',
    value1: '2000'
  }]
};
```

**Key properties:**

- `name`: Row/column field to filter.
- `type`: `"Value"`.
- `measure`: Measure (value field) used for comparison.
- `condition`: Comparison operator.
- `value1`: Primary comparison value.
- `value2`: End value (for `Between` / `NotBetween` only).
- `selectedField`: Dimension level name (OLAP only).

**Value operators:**

| Operator | Description |
|---|---|
| Equals | Matches the value. |
| DoesNotEquals | Does not match the value. |
| GreaterThan | Value is greater. |
| GreaterThanOrEqualTo | Value is greater or equal. |
| LessThan | Value is less. |
| LessThanOrEqualTo | Value is less or equal. |
| Between | Value is between `value1` and `value2`. |
| NotBetween | Value is outside `value1`..`value2`. |
| Top | Top N members by highest values. |
| Bottom | Bottom N members by lowest values. |

### Top and Bottom N Filtering

The `Top` and `Bottom` operators keep only the **N members with the highest or lowest aggregated values** for a measure. This is a **client-side-only** operation — useful for "Top 5 countries by sales" style reports.

```typescript
dataSourceSettings = {
  allowValueFilter: true,
  filterSettings: [{
    name: 'Country',
    measure: 'Sold',
    type: 'Value',
    condition: 'Top',
    value1: '5'   // keep top 5 countries by Sum(Sold)
  }]
};
```

**To get the Bottom 3 countries:**

```typescript
filterSettings: [{
  name: 'Country',
  measure: 'Sold',
  type: 'Value',
  condition: 'Bottom',
  value1: '3'
}]
```

> `value1` specifies the count `N` (as a string). The pivot engine keeps the N members with the highest (Top) or lowest (Bottom) aggregated value of the chosen `measure`.

### Clearing Value Filter

Click **Clear** at the bottom of the Filter dialog's **Value** tab to remove the value filter.

---

## Filtering Events

### memberFiltering Event

Fires when the user clicks **OK** in the filter dialog — before the filter is applied. Use it to inspect/modify the filter or cancel it:

```typescript
import { MemberFilteringEventArgs } from '@syncfusion/ej2-angular-pivotview';

@Component({
  template: `<ejs-pivotview [dataSourceSettings]="dataSourceSettings" (memberFiltering)="memberFiltering($event)"></ejs-pivotview>`
})
export class AppComponent {
  memberFiltering(args: MemberFilteringEventArgs): void {
    // Block the filter from being applied
    args.cancel = true;
  }
}
```

**Event parameters:**

- `cancel` — `true` stops the filter.
- `filterSettings` — the current filter collection being applied.
- `dataSourceSettings` — the updated `dataSourceSettings` after applying.

### memberEditorOpen Event

Fires when the Member Editor dialog opens. Lets you adjust which members appear:

```typescript
import { MemberEditorOpenEventArgs } from '@syncfusion/ej2-angular-pivotview';

@Component({
  template: `<ejs-pivotview [dataSourceSettings]="dataSourceSettings" (memberEditorOpen)="memberEditorOpen($event)" showGroupingBar="true"></ejs-pivotview>`
})
export class AppComponent {
  memberEditorOpen(args: MemberEditorOpenEventArgs | any): void {
    if (args.fieldName === 'Country') {
      // Show only France and Germany in the editor
      args.fieldMembers = args.fieldMembers.filter((key: any) =>
        key.actualText === 'France' || key.actualText === 'Germany'
      );
    }
  }
}
```

**Event parameters:**

- `fieldName` — field whose editor is opening.
- `fieldMembers` — list of members to display.
- `cancel` — `true` prevents the dialog from opening.
- `filterSettings` — current filter settings.

### actionBegin / actionComplete / actionFailure

| Event | When | `actionName` for filter |
|---|---|---|
| `actionBegin` | User clicks the filter icon. | `"Filter field"` |
| `actionComplete` | Filter has been applied. | `"Field filtered"` |
| `actionFailure` | Filter action failed. | `"Filter field"` |

```typescript
import { PivotActionBeginEventArgs } from '@syncfusion/ej2-angular-pivotview';

actionBegin(args: PivotActionBeginEventArgs): void {
  if (args.actionName === 'Filter field') {
    args.cancel = true; // prevent filter action
  }
}
```

`actionBegin` / `actionComplete` also expose `fieldInfo` (the field the action targets) and `dataSourceSettings` (current data source state).

---

## Member Sorting

Arrange field members in ascending or descending order. Enabled by default.

### Basic Member Sorting

```typescript
sortSettings: [{
  name: 'Year',
  order: 'Ascending'  // or 'Descending'
}]
```

### Alphanumeric Sorting

Sort members numerically by their numeric prefix instead of alphabetically:

```typescript
rows: [{
  name: 'ProductCode',
  dataType: 'number'  // Sorts '36-SW', '71-AJ', '209-FB' instead of '209-FB', '36-SW', '71-AJ'
}]
```

### Custom Member Sorting

Sort field members in user-defined order:

```typescript
sortSettings: [{
  name: 'Country',
  membersOrder: ['USA', 'Canada', 'France', 'Germany'],
  order: 'Ascending'
}]
```

**Key properties:**

- `name`: Field to sort
- `membersOrder`: Array of members in desired order
- `order`: Direction (`Ascending` / `Descending` / `None`)

---

## Value Sorting

Sort pivot table values and aggregated data in ascending or descending order.

### Enable Value Sorting

```typescript
@Component({
  template: `<ejs-pivotview
    [dataSourceSettings]="dataSourceSettings"
    [enableValueSorting]="true">
  </ejs-pivotview>`
})
export class AppComponent {
  dataSourceSettings = {
    dataSource: data,
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
  };
}
```

### Programmatic Value Sorting

```typescript
valueSortSettings = {
  headerText: 'FY 2020##Q1',    // Column hierarchy path
  headerDelimiter: '##',         // Delimiter between levels
  sortOrder: 'Descending'        // Sort direction
};
```

### Multiple Axis Value Sorting

Sort values simultaneously in row and column axes:

```typescript
valueSortSettings = {
  columnHeaderText: 'FY 2020##Q1',
  rowHeaderText: 'USA',
  headerDelimiter: '##',
  columnSortOrder: 'Descending',
  rowSortOrder: 'Ascending'
};
```

---

## Sorting Events

### onHeadersSort Event

Triggered when headers are sorted. Allows customization of member order:

```typescript
onHeadersSort(args: HeadersSortEventArgs) {
  if (args.fieldName === 'Country') {
    args.members = args.members.reverse();
    args.isOrderChanged = true;
  }
}
```

### actionBegin Event

Triggered when sort action starts:

```typescript
actionBegin(args: PivotActionBeginEventArgs) {
  if (args.actionName === 'Sort field' || args.actionName === 'Sort value') {
    args.cancel = true; // prevent sort action
  }
}
```

### actionComplete Event

Triggered when sort action completes:

```typescript
actionComplete(args: PivotActionCompleteEventArgs) {
  if (args.actionName === 'Sort field') {
    console.log('Sorting completed', args.dataSourceSettings);
  }
}
```

---

## Best Practices

1. **Enable Value Sorting** for financial/analytical reports
2. **Use Custom Sorting** for business category orders
3. **Combine with Filtering** for focused analysis
4. **Use Events** to prevent unwanted sort/filter operations
5. **Limit Sort Levels** for performance with large datasets
6. **Use Top/Bottom N filtering** (client-side) for "Top N" style reports
7. **Use `maxNodeLimitInMemberEditor`** to keep the Member Editor responsive on huge hierarchies
8. **Use `loadOnDemandInMemberEditor`** (default `true`) for OLAP sources with deep hierarchies
9. **Use `levelCount`** to scope OLAP member loading to a specific depth
10. **Use the "Add current selection to filter"** option in the Member Editor when you need to build up multi-select filters incrementally

### Filtering Events Summary

```typescript
// Cancel a filter action
(memberFiltering)="onMemberFiltering($event)"
onMemberFiltering(args: MemberFilteringEventArgs) {
  args.cancel = true;
}

// Customize Member Editor contents
(memberEditorOpen)="onMemberEditorOpen($event)"
onMemberEditorOpen(args: MemberEditorOpenEventArgs | any) {
  if (args.fieldName === 'Country') {
    args.fieldMembers = args.fieldMembers.filter((m: any) => m.actualText === 'France');
  }
}
```

### Sorting Events Summary

```typescript
(onHeadersSort)="onHeadersSort($event)"
onHeadersSort(args: HeadersSortEventArgs) {
  args.members = ['Custom', 'Order'];
  args.isOrderChanged = true;
}
```
````
