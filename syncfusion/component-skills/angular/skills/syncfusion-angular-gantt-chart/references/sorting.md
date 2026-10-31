# Sorting in Angular Gantt Chart

## Enable Sorting

Set `allowSorting: true` and inject `SortService`:

```typescript
@Component({
  providers: [SortService],
  template: `<ejs-gantt [allowSorting]="true"></ejs-gantt>`
})
```

Users click column headers to sort. Columns toggle between ascending → descending → no sort on repeated clicks.

Disable sorting for a specific column:
```typescript
{ field: 'TaskID', allowSorting: false }
```

---

## Initial Sorting on Load

Pre-sort columns when the Gantt first renders:

```typescript
public sortSettings: object = {
  columns: [
    { field: 'StartDate', direction: 'Ascending' },
    { field: 'TaskName', direction: 'Descending' }
  ]
};
```

```html
<ejs-gantt [sortSettings]="sortSettings"></ejs-gantt>
```

---

## Multi-Column Sorting

Users can sort by multiple columns simultaneously:
- Hold **CTRL** + click additional column headers to add sort columns
- Hold **SHIFT** + click a sorted column to remove it from multi-sort

---

## Programmatic Sorting

```typescript
// Sort a single column
this.ganttObj.sortColumn('TaskName', 'Ascending', false);

// Sort adding to existing multi-sort (third param = true)
this.ganttObj.sortColumn('StartDate', 'Descending', true);

// Remove sort from specific column
this.ganttObj.removeSortColumn('TaskName');

// Clear all sorting
this.ganttObj.clearSorting();
```

Access the Gantt instance via `@ViewChild('gantt') ganttObj: GanttComponent`.
