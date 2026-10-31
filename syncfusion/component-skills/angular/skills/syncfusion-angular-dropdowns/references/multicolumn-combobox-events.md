# Events in Angular MultiColumn ComboBox

## Table of Contents
- [Overview](#overview)
- [created](#created)
- [open](#open)
- [close](#close)
- [select](#select)
- [change](#change)
- [filtering](#filtering)
- [actionBegin](#actionbegin)
- [actionComplete](#actioncomplete)
- [actionFailure](#actionfailure)

## Overview

Import event argument types from `@syncfusion/ej2-multicolumn-combobox`:

```typescript
import {
  SelectEventArgs,
  ChangeEventArgs,
  FilteringEventArgs,
  PopupEventArgs
} from '@syncfusion/ej2-multicolumn-combobox';
```

All event bindings use Angular's `(eventName)` syntax.

---

## created

Fires after the component has been fully initialized and rendered. No event arguments.

```typescript
@Component({
  imports: [MultiColumnComboBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-multicolumncombobox
      [dataSource]='empData'
      [fields]='fields'
      (created)='onCreated()'>
      <e-columns>
        <e-column field='EmpID' header='Employee ID' width='100'></e-column>
        <e-column field='Name' header='Name' width='90'></e-column>
      </e-columns>
    </ejs-multicolumncombobox>`
})
export class AppComponent {
  public empData: Object[] = [
    { EmpID: 1001, Name: 'Andrew Fuller', Designation: 'Team Lead' }
  ];
  public fields: Object = { text: 'Name', value: 'EmpID' };

  public onCreated(): void {
    console.log('MultiColumn ComboBox component created');
  }
}
```

---

## open

Fires when the popup is opened. Event argument type: `PopupEventArgs`.

```typescript
import { PopupEventArgs } from '@syncfusion/ej2-multicolumn-combobox';

public onOpen(args: PopupEventArgs): void {
  console.log('Popup opened');
  // args.popup — the popup element
}
```

```html
<ejs-multicolumncombobox (open)='onOpen($event)' ...>
```

---

## close

Fires when the popup is closed. Event argument type: `PopupEventArgs`.

```typescript
import { PopupEventArgs } from '@syncfusion/ej2-multicolumn-combobox';

public onClose(args: PopupEventArgs): void {
  console.log('Popup closed');
}
```

```html
<ejs-multicolumncombobox (close)='onClose($event)' ...>
```

---

## select

Fires when a value is selected from the dropdown. Event argument type: `SelectEventArgs`.

```typescript
import { SelectEventArgs } from '@syncfusion/ej2-multicolumn-combobox';

export class AppComponent {
  public empData: Object[] = [
    { EmpID: 1001, Name: 'Andrew Fuller', Designation: 'Team Lead' },
    { EmpID: 1002, Name: 'Robert', Designation: 'Developer' }
  ];
  public fields: Object = { text: 'Name', value: 'EmpID' };
  public waterMark: string = 'Select an employee';

  public onSelect(args: SelectEventArgs): void {
    console.log('Selected item:', args.item);
    console.log('Selected data:', args.itemData);
  }
}
```

```html
<ejs-multicolumncombobox
  [dataSource]='empData'
  [fields]='fields'
  [placeholder]='waterMark'
  (select)='onSelect($event)'>
  <e-columns>
    <e-column field='EmpID' header='Employee ID' width='100'></e-column>
    <e-column field='Name' header='Name' width='90'></e-column>
  </e-columns>
</ejs-multicolumncombobox>
```

---

## change

Fires when the value changes (after selection is committed). Event argument type: `ChangeEventArgs`.

```typescript
import { ChangeEventArgs } from '@syncfusion/ej2-multicolumn-combobox';

public onChange(args: ChangeEventArgs): void {
  console.log('Changed value:', args.value);
  console.log('Previous value:', args.previousValue);
  console.log('Item data:', args.itemData);
}
```

```html
<ejs-multicolumncombobox (change)='onChange($event)' ...>
```

---

## filtering

Fires when the user types in the input to filter items. Event argument type: `FilteringEventArgs`.

```typescript
import { FilteringEventArgs } from '@syncfusion/ej2-multicolumn-combobox';
import { Query } from '@syncfusion/ej2-data';

export class AppComponent {
  public empData: Object[] = [
    { EmpID: 1001, Name: 'Andrew Fuller', Designation: 'Team Lead' },
    { EmpID: 1002, Name: 'Robert', Designation: 'Developer' },
    { EmpID: 1003, Name: 'Michael', Designation: 'HR' }
  ];
  public fields: Object = { text: 'Name', value: 'EmpID' };

  public onFiltering(args: FilteringEventArgs): void {
    let query = new Query();
    // Optionally apply custom filtering logic here
    query = (args.text !== '') ? query.where('Name', 'startswith', args.text, true) : query;
    args.updateData(this.empData, query);
  }
}
```

```html
<ejs-multicolumncombobox
  [dataSource]='empData'
  [fields]='fields'
  [allowFiltering]='true'
  (filtering)='onFiltering($event)'>
  <e-columns>
    <e-column field='EmpID' header='Employee ID' width='100'></e-column>
    <e-column field='Name' header='Name' width='90'></e-column>
  </e-columns>
</ejs-multicolumncombobox>
```

---

## actionBegin

Fires before a data action (filtering, sorting, grouping) begins. Useful for adding loading indicators.

```typescript
public onActionBegin(args: Object): void {
  console.log('Data action started', args);
}
```

```html
<ejs-multicolumncombobox (actionBegin)='onActionBegin($event)' ...>
```

---

## actionComplete

Fires after a data action (filtering, sorting, grouping) completes successfully.

```typescript
public onActionComplete(args: Object): void {
  console.log('Data action completed', args);
}
```

```html
<ejs-multicolumncombobox (actionComplete)='onActionComplete($event)' ...>
```

---

## actionFailure

Fires when a remote data fetch operation fails. Use this to handle errors gracefully.

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

export class AppComponent {
  public dataSource = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });
  public fields: Object = { text: 'ShipCountry', value: 'CustomerID' };
  public gridSettings: Object = { rowHeight: 40 };

  public onActionFailure(args: Object): void {
    console.error('Remote data fetch failed:', args);
    // Handle error: show message, retry, etc.
  }
}
```

```html
<ejs-multicolumncombobox
  [dataSource]='dataSource'
  [fields]='fields'
  [gridSettings]='gridSettings'
  (actionFailure)='onActionFailure($event)'>
  <e-columns>
    <e-column field='OrderID' header='Order ID' width='90'></e-column>
    <e-column field='CustomerID' header='Customer ID' width='90'></e-column>
    <e-column field='ShipCountry' header='Ship Country' width='90'></e-column>
  </e-columns>
</ejs-multicolumncombobox>
```

---

## All Events Combined Example

```typescript
import { Component } from '@angular/core';
import { MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
import {
  SelectEventArgs,
  ChangeEventArgs,
  FilteringEventArgs,
  PopupEventArgs
} from '@syncfusion/ej2-multicolumn-combobox';

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
      [allowFiltering]='true'
      (created)='onCreated()'
      (open)='onOpen($event)'
      (close)='onClose($event)'
      (select)='onSelect($event)'
      (change)='onChange($event)'
      (filtering)='onFiltering($event)'
      (actionBegin)='onActionBegin($event)'
      (actionComplete)='onActionComplete($event)'>
      <e-columns>
        <e-column field='EmpID' header='Employee ID' width='100'></e-column>
        <e-column field='Name' header='Name' width='90'></e-column>
        <e-column field='Designation' header='Designation' width='100'></e-column>
      </e-columns>
    </ejs-multicolumncombobox>`
})
export class AppComponent {
  public empData: Object[] = [
    { EmpID: 1001, Name: 'Andrew Fuller', Designation: 'Team Lead', Country: 'England' },
    { EmpID: 1002, Name: 'Robert', Designation: 'Developer', Country: 'USA' },
    { EmpID: 1003, Name: 'Michael', Designation: 'HR', Country: 'Russia' }
  ];
  public fields: Object = { text: 'Name', value: 'EmpID' };
  public waterMark: string = 'Select an employee';

  public onCreated(): void { console.log('created'); }
  public onOpen(args: PopupEventArgs): void { console.log('open', args); }
  public onClose(args: PopupEventArgs): void { console.log('close', args); }
  public onSelect(args: SelectEventArgs): void { console.log('select', args.itemData); }
  public onChange(args: ChangeEventArgs): void { console.log('change', args.value); }
  public onFiltering(args: FilteringEventArgs): void { console.log('filtering', args.text); }
  public onActionBegin(args: Object): void { console.log('actionBegin', args); }
  public onActionComplete(args: Object): void { console.log('actionComplete', args); }
}
```
