````markdown
# State Persistence and Immutable Mode in Angular Gantt Chart

## Table of Contents
- [State Persistence](#state-persistence)
- [What Gets Persisted](#what-gets-persisted)
- [Resetting Persisted State](#resetting-persisted-state)
- [Immutable Mode](#immutable-mode)
- [Immutable Mode Limitations](#immutable-mode-limitations)
- [Loading Animation](#loading-animation)
- [Manual Spinner Control](#manual-spinner-control)

---

## State Persistence

Set `enablePersistence: true` to save component state to `localStorage` across page reloads:

```typescript
@Component({
  template: `
    <ejs-gantt
      id="gantt1"
      [enablePersistence]="true"
      [dataSource]="data"
      [taskFields]="taskFields"
      height="450px">
    </ejs-gantt>
  `
})
export class AppComponent { }
```

> The `id` attribute is **required** for persistence — it serves as the `localStorage` key prefix. Without `id`, persistence will not work.

---

## What Gets Persisted

| State | Persisted |
|---|---|
| Column widths | ✅ |
| Column order | ✅ |
| Sort state | ✅ |
| Filter state | ✅ |
| Search query | ✅ |
| Splitter position | ✅ |
| Column visibility | ✅ |
| Expand/collapse state | ❌ (not persisted) |
| Selected rows | ❌ (not persisted) |

The localStorage key format is: `{id}gantt` — e.g., `gantt1gantt`.

---

## Resetting Persisted State

**Option 1 — Change the component ID** (forces fresh initialization):

```typescript
// In component — change the id to reset all persisted state
public ganttId: string = 'gantt_' + Date.now();
```

```html
<ejs-gantt [id]="ganttId"></ejs-gantt>
```

**Option 2 — Clear localStorage programmatically:**

```typescript
public clearState(): void {
  localStorage.removeItem('gantt1gantt');  // Key = id + 'gantt'
  window.location.reload();
}
```

**Option 3 — Using the Gantt's built-in reset:**

```typescript
import { ViewChild } from '@angular/core';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';

@ViewChild('gantt') public ganttObj?: GanttComponent;

public resetPersistence(): void {
  // Destroy and re-initialize or use localStorage.clear
  localStorage.removeItem('gantt1gantt');
  this.ganttObj?.refresh();
}
```

---

## Immutable Mode

Immutable mode optimizes rendering by re-rendering **only changed rows** instead of the entire grid. Ideal for large datasets with frequent programmatic updates.

```typescript
@Component({
  template: `
    <ejs-gantt
      [enableImmutableMode]="true"
      [columns]="columns"
      [taskFields]="taskFields"
      height="450px">
    </ejs-gantt>
  `
})
export class AppComponent {
  public columns: object[] = [
    { field: 'TaskID', isPrimaryKey: true },  // isPrimaryKey required
    { field: 'TaskName' },
    { field: 'StartDate' },
    { field: 'Duration' },
    { field: 'Progress' }
  ];
}
```

### Requirements

- A column must have `isPrimaryKey: true` — Gantt uses this to match rows after updates
- Updates must replace data objects (not mutate existing ones)
- `taskFields.id` must be mapped

### Usage Pattern

```typescript
public updateTask(): void {
  // Create a new object — do NOT mutate the existing one
  const updated = { ...this.data[2], Progress: 75 };
  this.ganttObj?.updateRecordByID(updated);
}
```

---

## Immutable Mode Limitations

| Limitation | Details |
|---|---|
| Virtual scroll incompatible | `enableImmutableMode` conflicts with `enableVirtualization` |
| Batch edit not supported | Batch mode requires full re-render |
| Row templates | May not re-render for unchanged rows |
| Undo/Redo | Limited support in immutable mode |

---

## Loading Animation

Configure the loading indicator shown during data-intensive operations:

```typescript
@Component({
  template: `
    <ejs-gantt [loadingIndicator]="loadingIndicator" ...></ejs-gantt>
  `
})
export class AppComponent {
  public loadingIndicator: object = { indicatorType: 'Shimmer' };
  // 'Spinner' (default) — circular animation, lightweight
  // 'Shimmer' — animated placeholder rows, better for large datasets
}
```

| Type | Best For |
|---|---|
| `'Spinner'` | Quick operations, simple filter/sort |
| `'Shimmer'` | Large datasets, virtual scroll, initial data bind |

---

## Manual Spinner Control

Show or hide the loading spinner programmatically:

```typescript
import { ViewChild } from '@angular/core';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';

@ViewChild('gantt') public ganttObj?: GanttComponent;

public fetchData(): void {
  this.ganttObj?.showSpinner();
  this.dataService.getData().subscribe(data => {
    this.data = data;
    this.ganttObj?.hideSpinner();
  });
}
```

```html
<ejs-gantt #gantt [dataSource]="data"></ejs-gantt>
```
````
