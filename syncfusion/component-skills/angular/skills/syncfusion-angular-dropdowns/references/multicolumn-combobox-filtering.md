# Filtering in Angular MultiColumn ComboBox

## Overview

The MultiColumn ComboBox has built-in filtering support. As the user types characters in the input, items in the popup are filtered in real time. Filtering is enabled by default (`allowFiltering` is `true`).

## Enable / Disable Filtering

Control filtering with the `allowFiltering` property:

```html
<!-- Filtering enabled (default) -->
<ejs-multicolumncombobox [dataSource]='empData' [fields]='fields' allowFiltering='true'>

<!-- Filtering disabled — users can only scroll and select -->
<ejs-multicolumncombobox [dataSource]='empData' [fields]='fields' allowFiltering='false'>
```

## Change the Filter Type

Use `filterType` to control how typed text is matched against item text. Three options:

| FilterType | Behavior |
|------------|----------|
| `StartsWith` | Items whose text starts with the typed characters (default) |
| `EndsWith` | Items whose text ends with the typed characters |
| `Contains` | Items whose text contains the typed characters anywhere |

Example with `EndsWith` filter:

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
      allowFiltering='true'
      filterType='EndsWith'>
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

**Notes:**
- Filtering works on the field mapped to `fields.text`
- When no filtered items match, the `noRecordsTemplate` is shown in the popup
- For custom filtering logic, listen to the `filtering` event (see `events.md`)
