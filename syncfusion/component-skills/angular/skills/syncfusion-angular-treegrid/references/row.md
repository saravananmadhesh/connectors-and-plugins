---
name: Row
description: 'Rows in Syncfusion Angular TreeGrid - row templates, detail row expansion, row drag-and-drop, row spanning, and row customization.'
---

# Rows

Rows display data records with support for templates, detail expansion, and drag-drop functionality.

## When to Use

Use row features when you need to:
- **Custom row templates** — Render entire rows with custom HTML layouts
- **Detail rows** — Show expandable detail information for each row
- **Row styling** — Apply custom styles based on data conditions
- **Row hover effects** — Highlight rows on user interaction
- **Row spanning** — Merge cells across columns in a row
- **Programmatic row manipulation** — Add, remove, or update rows dynamically

## Table of Contents
- [Row Templates](#row-templates)
- [Detail Rows](#detail-rows)
- [Row Customization](#row-customization)

## Row Templates

### Custom Row Template

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
      <ng-template #rowTemplate let-data>
        <tr>
          <td>{{ data.TaskID }}</td>
          <td><strong>{{ data.TaskName }}</strong></td>
        </tr>
      </ng-template>
    </ejs-treegrid>
  `
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
}
```

## Detail Rows

### Detail Template

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'>
  <ng-template #detailTemplate let-data>
    <div style="padding: 20px;">
      <h3>Task Details: {{ data.TaskName }}</h3>
      <p><strong>Duration:</strong> {{ data.Duration }} days</p>
      <p><strong>Progress:</strong> {{ data.Progress }}%</p>
    </div>
  </ng-template>
</ejs-treegrid>
```

## Row Customization

### Row Height

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  [rowHeight]='36'>
  <!-- columns -->
</ejs-treegrid>
```

### Row Selection

```typescript
<ejs-treegrid 
  [selectionSettings]='{ type: "Multiple", mode: "Row" }'>
  <!-- columns -->
</ejs-treegrid>
```

### Row Styling

```typescript
<ejs-treegrid 
  (rowDataBound)='onRowDataBound($event)'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
onRowDataBound(args: any) {
  if (args.data.Status === 'Completed') {
    args.row.classList.add('completed-row');
  }
}
```

```css
.completed-row {
  background-color: #E8F5E9;
  opacity: 0.7;
}
```
