# Sorting in Angular MultiColumn ComboBox

## Overview

The MultiColumn ComboBox supports column sorting in the popup. Clicking a column header toggles sort order. Sorting is enabled by default (`allowSorting` is `true`).

## Enable / Disable Sorting

```html
<!-- Sorting enabled (default) -->
<ejs-multicolumncombobox [dataSource]='empData' [fields]='fields' allowSorting='true'>

<!-- Sorting disabled -->
<ejs-multicolumncombobox [dataSource]='empData' [fields]='fields' allowSorting='false'>
```

## Setting the Initial Sort Order

Use `sortOrder` to set the default sort direction on component load:

| Value | Behavior |
|-------|----------|
| `None` | No sorting applied (default) |
| `Ascending` | Data sorted A→Z / 0→9 |
| `Descending` | Data sorted Z→A / 9→0 |

Clicking a column header cycles: Ascending → Descending → Clear (None).

```typescript
import { Component } from '@angular/core';
import { MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';

@Component({
  imports: [MultiColumnComboBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-multicolumncombobox
      id='multicolumn'
      [dataSource]='empData'
      [fields]='fields'
      [placeholder]='waterMark'
      allowSorting='true'
      sortOrder='Descending'>
      <e-columns>
        <e-column field='EmpID' header='Employee ID' width='100'></e-column>
        <e-column field='Name' header='Name' width='90'></e-column>
        <e-column field='Designation' header='Designation' width='100'></e-column>
        <e-column field='Country' header='Country' width='90'></e-column>
      </e-columns>
    </ejs-multicolumncombobox>`
})
export class AppComponent {
  public empData: Object[] = [
    { EmpID: 1001, Name: 'Andrew Fuller', Designation: 'Team Lead', Country: 'England' },
    { EmpID: 1002, Name: 'Robert', Designation: 'Developer', Country: 'USA' },
    { EmpID: 1003, Name: 'Michael', Designation: 'HR', Country: 'Russia' },
    { EmpID: 1004, Name: 'Steven Buchanan', Designation: 'Product Manager', Country: 'Ukraine' },
    { EmpID: 1005, Name: 'Margaret Peacock', Designation: 'Developer', Country: 'Egypt' }
  ];
  public fields: Object = { text: 'Name', value: 'EmpID' };
  public waterMark: string = 'Select an employee';
}
```

## Sort Type (Single vs. Multiple Columns)

Use `sortType` to control whether one or multiple columns can be sorted simultaneously:

| Value | Behavior |
|-------|----------|
| `OneColumn` | Only one column sorted at a time (default) |
| `MultipleColumns` | Hold Ctrl and click headers to sort multiple columns |

```html
<ejs-multicolumncombobox
  [dataSource]='empData'
  [fields]='fields'
  [placeholder]='waterMark'
  allowSorting='true'
  sortOrder='Descending'
  sortType='MultipleColumns'>
  <e-columns>
    <e-column field='EmpID' header='Employee ID' width='100'></e-column>
    <e-column field='Name' header='Name' width='90'></e-column>
    <e-column field='Designation' header='Designation' width='100'></e-column>
    <e-column field='Country' header='Country' width='90'></e-column>
  </e-columns>
</ejs-multicolumncombobox>
```

To sort multiple columns with `MultipleColumns`: hold **Ctrl** and click each column header.
