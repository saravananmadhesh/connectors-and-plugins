# Columns in Angular MultiColumn ComboBox

## Table of Contents
- [Overview](#overview)
- [Basic Column Properties](#basic-column-properties)
- [Setting Text Alignment](#setting-text-alignment)
- [Column Template](#column-template)
- [Display as CheckBox](#display-as-checkbox)
- [Custom Attributes](#custom-attributes)
- [Header Template](#header-template)
- [Column Format](#column-format)

## Overview

The `<e-column>` selector defines the columns displayed in the popup. Each column maps to a field in the data source and supports customization of display, alignment, templates, and more.

## Basic Column Properties

Configure columns with `field`, `header`, and `width`:

- `field` — the data source field name to display in this column
- `header` — the column header text (defaults to `field` name if omitted)
- `width` — column width in pixels or percentage

```typescript
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
    { EmpID: 1003, Name: 'Michael', Designation: 'HR', Country: 'Russia' }
  ];
  public fields: Object = { text: 'Name', value: 'EmpID' };
  public waterMark: string = 'Select an employee';
}
```

## Setting Text Alignment

Use the `textAlign` property on `<e-column>` to align column content. Valid values: `Left`, `Right`, `Center`.

```html
<e-columns>
  <e-column field='EmpID' header='Employee ID' width='100'></e-column>
  <e-column field='Name' header='Name' width='90' textAlign='Right'></e-column>
  <e-column field='Designation' header='Designation' width='100'></e-column>
  <e-column field='Country' header='Country' width='90'></e-column>
</e-columns>
```

## Column Template

Use `template` to render custom HTML in each cell. In Angular, use the `ng-template` directive with `#template`:

```typescript
@Component({
  imports: [MultiColumnComboBoxModule],
  standalone: true,
  selector: 'app-root',
  templateUrl: 'template.html'
})
export class AppComponent {
  public data: Object[] = [
    { Name: 'Andrew Fuller', Eimg: 7, Designation: 'Team Lead', Country: 'England', DateofJoining: '12/10/2010' },
    { Name: 'Anne Dodsworth', Eimg: 1, Designation: 'Developer', Country: 'USA', DateofJoining: '10/05/2000' },
    { Name: 'Janet Leverling', Eimg: 3, Designation: 'HR', Country: 'Russia', DateofJoining: '23/02/2016' }
  ];
  public fields: Object = { text: 'Name', value: 'Eimg' };
  public waterMark: string = 'Select an employee';
  public gridSettings: Object = { rowHeight: 40 };
}
```

Template HTML (`template.html`):
```html
<ejs-multicolumncombobox
  id='multicolumn'
  [dataSource]='data'
  [fields]='fields'
  [placeholder]='waterMark'
  [gridSettings]='gridSettings'
  popupHeight='230px'>
  <e-columns>
    <e-column field='Eimg' header='Photos' width='100'>
      <ng-template #template let-data>
        <div>
          <img class="empImage"
            src="https://ej2.syncfusion.com/demos/src/multicolumn-combobox/Employees/{{data.Eimg}}.png"
            alt="employee" />
        </div>
      </ng-template>
    </e-column>
    <e-column field='Name' header='Employee Name' width='135'>
      <ng-template #template let-data>
        <div>
          <div class="ename">{{data.Name}}</div>
          <div class="job">{{data.Designation}}</div>
        </div>
      </ng-template>
    </e-column>
    <e-column field='DateofJoining' header='Date of Joining' width='135'>
      <ng-template #template let-data>
        <div class="dateOfJoining">{{data.DateofJoining}}</div>
      </ng-template>
    </e-column>
    <e-column field='Country' header='Country' width='95'>
      <ng-template #template let-data>
        <div class="country">{{data.Country}}</div>
      </ng-template>
    </e-column>
  </e-columns>
</ejs-multicolumncombobox>
```

## Display as CheckBox

Set `displayAsCheckBox='true'` on `<e-column>` to render boolean or numeric values as a checkbox. By default this is `false`.

```html
<e-columns>
  <e-column field='EmpID' header='Employee ID' width='100' displayAsCheckBox='true'></e-column>
  <e-column field='Name' header='Name' width='90'></e-column>
  <e-column field='Designation' header='Designation' width='100'></e-column>
  <e-column field='Country' header='Country' width='90'></e-column>
</e-columns>
```

## Custom Attributes

Use `[customAttributes]` to apply custom CSS classes or attributes to the column's content cells:

```typescript
export class AppComponent {
  public customAttributes: Object = { class: 'e-custom-multicolumn' };
}
```

```html
<e-columns>
  <e-column field='EmpID' header='Employee ID' width='100'></e-column>
  <e-column field='Name' header='Name' width='90' [customAttributes]='customAttributes'></e-column>
  <e-column field='Designation' header='Designation' width='100'></e-column>
  <e-column field='Country' header='Country' width='90'></e-column>
</e-columns>
```

Then add your CSS to target cells in that column:
```css
.e-custom-multicolumn {
  font-weight: bold;
  color: #0078d4;
}
```

## Header Template

Use `headerTemplate` with `ng-template` to render custom column headers:

```html
<ejs-multicolumncombobox
  id='multicolumn'
  [dataSource]='empData'
  [fields]='fields'
  [gridSettings]='gridSettings'
  popupHeight='230px'>
  <e-columns>
    <e-column field='EmpID' width='100'>
      <ng-template #headerTemplate let-data>
        <div><span>Employee ID</span></div>
      </ng-template>
    </e-column>
    <e-column field='Name' width='135'>
      <ng-template #headerTemplate let-data>
        <div><span>Employee Name</span></div>
      </ng-template>
    </e-column>
    <e-column field='Designation' width='135'>
      <ng-template #headerTemplate let-data>
        <div><span>Designation</span></div>
      </ng-template>
    </e-column>
    <e-column field='Country' width='95'>
      <ng-template #headerTemplate let-data>
        <div><span>Country</span></div>
      </ng-template>
    </e-column>
  </e-columns>
</ejs-multicolumncombobox>
```

## Column Format

Use the `format` property to format numeric or date values displayed in the column. Accepts standard or custom number/date format strings.

```html
<!-- Format a date column -->
<e-column field='OrderDate' header='Order Date' width='140' format='yMd'></e-column>

<!-- Format a number column -->
<e-column field='Freight' header='Freight' width='120' format='N2'></e-column>
```
