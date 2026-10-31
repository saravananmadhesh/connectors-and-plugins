---
name: Cell
description: 'Cells in Syncfusion Angular TreeGrid - cell styling, custom templates, formatting, tooltips, HTML content rendering, and cell customization.'
---

# Cells

Cells are individual data elements within rows that can be customized with templates, styles, and formats.

## When to Use

Use cell features when you need to:
- **Apply cell-specific styling** — Color-code cells based on values or conditions
- **Custom cell templates** — Render custom HTML or components in cells
- **Cell formatting** — Format numbers, dates, currency in cells
- **Cell tooltips** — Show informative tooltips on hover
- **Cell validation** — Validate cell values before editing
- **Conditional rendering** — Show/hide content based on cell values
- **Cell events** — Handle click, double-click, and edit events

## Table of Contents
- [Cell Styling](#cell-styling)
- [Cell Templates](#cell-templates)
- [Formatting](#formatting)
- [Tooltips and HTML](#tooltips-and-html)

## Cell Styling

### queryCellInfo Event

```typescript
import { Component } from '@angular/core';
import { QueryCellInfoEventArgs, Column } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      (queryCellInfo)='onQueryCellInfo($event)'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='Status' headerText='Status' width='100'></e-column>
      </e-columns>
    </ejs-treegrid>
  `
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';

  onQueryCellInfo(args: any) {
    if (args.column.field === 'Status') {
      if (args.data.Status === 'Completed') {
        args.cell.classList.add('status-completed');
      }
    }
  }
}
```

### CSS Classes

```css
.status-completed {
  background-color: #C8E6C9;
  color: #2E7D32;
  font-weight: bold;
}

.status-pending {
  background-color: #FFF9C4;
  color: #F57F17;
}
```

## Formatting

### Number Format

```typescript
<e-column field='Amount' headerText='Amount' type='number' format='C2' width='100'></e-column>
```

### Date Format

```typescript
<e-column field='StartDate' headerText='Start Date' type='date' format='yMd' width='130'></e-column>
```