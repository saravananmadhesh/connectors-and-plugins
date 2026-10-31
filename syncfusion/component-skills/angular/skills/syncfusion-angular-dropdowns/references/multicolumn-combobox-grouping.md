# Grouping in Angular MultiColumn ComboBox

## Overview

The MultiColumn ComboBox supports grouping items in the popup based on a category field. Group headers are displayed as fixed, sticky headers that update dynamically as you scroll.

## Enabling Grouping

Set the `groupBy` property in the `fields` object to the field that defines group categories:

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
      text='Michael'>
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
    { EmpID: 1005, Name: 'Margaret Peacock', Designation: 'Developer', Country: 'Egypt' },
    { EmpID: 1006, Name: 'Janet Leverling', Designation: 'Team Lead', Country: 'England' }
  ];
  // Group items by Country — all employees from the same country appear together
  public fields: Object = { text: 'Name', value: 'EmpID', groupBy: 'Country' };
  public waterMark: string = 'Select an employee';
}
```

**How it works:**
- Items with the same `groupBy` field value are placed under a shared group header
- Group headers are sticky — they remain visible while scrolling through that group
- The group header text updates to reflect the currently visible group as you scroll

## Customizing Group Headers

Use `groupTemplate` to render custom HTML in group headers (see `templates.md`):

```typescript
public groupTemplate: string = '<div class="e-group-temp">Region: ${key} (${count} items)</div>';
```

```html
<ejs-multicolumncombobox
  [dataSource]='empData'
  [fields]='fields'
  [groupTemplate]='groupTemplate'>
  ...
</ejs-multicolumncombobox>
```

The `groupTemplate` context provides: `key` (group value), `field` (field name), `count` (items in group).
