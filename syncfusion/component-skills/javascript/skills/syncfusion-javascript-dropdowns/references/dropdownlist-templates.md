# Templates — Syncfusion TypeScript DropDownList

## Table of Contents
- [Item Template](#item-template)
- [Value Template](#value-template)
- [Group Template](#group-template)
- [Header Template](#header-template)
- [Footer Template](#footer-template)
- [No Records Template](#no-records-template)
- [Action Failure Template](#action-failure-template)

---

## Overview

The DropDownList supports template customization using the EJ2 template engine. Templates use ES6-style string literal syntax: `${fieldName}` to bind data fields.

Templates are string or Function values assigned to the corresponding property.

---

## Item Template

Use `itemTemplate` to customize how each item is rendered in the popup list.

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: new DataManager({
        url: 'url',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    }),
    query: new Query().from('Employees').select(['FirstName', 'City', 'EmployeeID']).take(6),
    fields: { text: 'FirstName', value: 'EmployeeID' },
    placeholder: 'Select an employee',
    sortOrder: 'Ascending',
    itemTemplate: '<span><span class="name">${FirstName}</span><span class="city">${City}</span></span>'
});
dropDownListObject.appendTo('#ddlelement');
```

Use CSS to style the template columns:

```css
.name { display: inline-block; width: 50%; }
.city { display: inline-block; width: 50%; text-align: right; }
```

---

## Value Template

Use `valueTemplate` to customize how the selected value is displayed in the input element. This lets you show a combination of fields.

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: new DataManager({
        url: 'url',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    }),
    query: new Query().from('Employees').select(['FirstName', 'City', 'EmployeeID']).take(6),
    fields: { text: 'FirstName', value: 'EmployeeID' },
    placeholder: 'Select an employee',
    sortOrder: 'Ascending',
    itemTemplate: '<span><span>${FirstName}</span><span class="city">${City}</span></span>',
    valueTemplate: '<span>${FirstName} - ${City}</span>'
});
dropDownListObject.appendTo('#ddlelement');
```

---

## Group Template

Use `groupTemplate` to customize group category headers. Applies to both the inline group headers and the fixed (sticky) group header. See also: [grouping.md](grouping.md).

```ts
let dropDownListObject: DropDownList = new DropDownList({
    dataSource: employeeData,
    fields: { text: 'FirstName', value: 'EmployeeID', groupBy: 'City' },
    placeholder: 'Select an employee',
    groupTemplate: '<strong>${City}</strong>'
});
```

---

## Header Template

Use `headerTemplate` to add a static header element at the top of the popup list. Useful for column titles when `itemTemplate` renders multi-column items.

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: new DataManager({
        url: 'url',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    }),
    query: new Query().from('Employees').select(['FirstName', 'City', 'EmployeeID']).take(6),
    fields: { text: 'FirstName', value: 'EmployeeID' },
    placeholder: 'Select an employee',
    sortOrder: 'Ascending',
    headerTemplate: '<span class="head"><span class="name">Name</span><span class="city">City</span></span>',
    itemTemplate: '<span class="item"><span class="name">${FirstName}</span><span class="city">${City}</span></span>'
});
dropDownListObject.appendTo('#ddlelement');
```

---

## Footer Template

Use `footerTemplate` to add a static element at the bottom of the popup list. Useful for showing summary information like item count.

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let sportsData = ['Basketball', 'Cricket', 'Football', 'Golf'];

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: sportsData,
    placeholder: 'Select a game',
    footerTemplate: '<span class="foot">Total list items: ' + sportsData.length + '</span>'
});
dropDownListObject.appendTo('#ddlelement');
```

---

## No Records Template

Use `noRecordsTemplate` to customize the message shown when the data source is empty or no filter matches are found.

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: [],
    placeholder: 'Select an item',
    noRecordsTemplate: '<span class="norecord">NO DATA AVAILABLE</span>'
});
dropDownListObject.appendTo('#ddlelement');
```

Default text: `'No records found'`

---

## Action Failure Template

Use `actionFailureTemplate` to display a custom message when a remote data fetch fails (e.g., network error, wrong URL).

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: new DataManager({
        url: 'url',  // intentionally wrong URL
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    }),
    query: new Query().from('Employees').select(['FirstName']).take(6),
    fields: { text: 'FirstName', value: 'EmployeeID' },
    placeholder: 'Select an employee',
    actionFailureTemplate: '<span class="action-failure">Data fetch failed</span>'
});
dropDownListObject.appendTo('#ddlelement');
```

Default text: `'Request failed'`
