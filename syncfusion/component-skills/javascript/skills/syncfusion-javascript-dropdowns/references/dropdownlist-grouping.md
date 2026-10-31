# Grouping — Syncfusion TypeScript DropDownList

## Overview

The DropDownList supports wrapping list items into groups by category. Map the `groupBy` field in the `fields` property to the category column in your data. Group headers are rendered both as inline headers within the list and as a fixed header that updates dynamically as the user scrolls.

---

## Basic Grouping

Map `groupBy` to the category column in your data source:

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let vegetableData: { [key: string]: Object }[] = [
    { Vegetable: 'Cabbage',    Category: 'Leafy and Salad', Id: 'item1' },
    { Vegetable: 'Spinach',    Category: 'Leafy and Salad', Id: 'item2' },
    { Vegetable: 'Wheat grass',Category: 'Leafy and Salad', Id: 'item3' },
    { Vegetable: 'Yarrow',     Category: 'Leafy and Salad', Id: 'item4' },
    { Vegetable: 'Chickpea',   Category: 'Beans',           Id: 'item6' },
    { Vegetable: 'Green bean', Category: 'Beans',           Id: 'item7' },
    { Vegetable: 'Garlic',     Category: 'Bulb and Stem',   Id: 'item9' },
    { Vegetable: 'Onion',      Category: 'Bulb and Stem',   Id: 'item11' }
];

let vegetables: DropDownList = new DropDownList({
    dataSource: vegetableData,
    fields: { groupBy: 'Category', text: 'Vegetable', value: 'Id' },
    placeholder: 'Select a vegetable',
    popupHeight: '200px'
});
vegetables.appendTo('#ddlelement');
```

---

## HTML `<select>` with `<optgroup>`

The DropDownList automatically creates groups when initialized on a `<select>` element with `<optgroup>` tags:

```html
<select id="selectElement">
    <optgroup label="Beans">
        <option value="1">Chickpea</option>
        <option value="2">Green bean</option>
        <option value="3">Horse gram</option>
    </optgroup>
    <optgroup label="Leafy and Salad">
        <option value="4">Spinach</option>
        <option value="5" selected="selected">Cabbage</option>
        <option value="6">Wheat grass</option>
    </optgroup>
</select>
```

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let dropDownListObject: DropDownList = new DropDownList({
    placeholder: 'Select a vegetable'
});
dropDownListObject.appendTo('#selectElement');
```

---

## Custom Group Header with `groupTemplate`

Use `groupTemplate` to customize the appearance of group headers. This applies to both the inline and fixed headers.

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, Predicate, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

let groupPredicate = new Predicate('City', 'equal', 'london').or('City', 'equal', 'seattle');

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: new DataManager({
        url: 'url',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    }),
    query: new Query().from('Employees').select(['FirstName', 'City', 'EmployeeID']).take(5)
        .where(groupPredicate),
    fields: { text: 'FirstName', value: 'EmployeeID', groupBy: 'City' },
    placeholder: 'Select an employee',
    sortOrder: 'Ascending',
    groupTemplate: '<strong>${City}</strong>'
});
dropDownListObject.appendTo('#ddlelement');
```

---

## Disabling the Fixed Group Header

To hide the sticky/fixed group header (while keeping the inline headers), use CSS to set `visibility: hidden` on the fixed group header element:

```css
.e-dropdownbase .e-fixed-head {
    visibility: hidden;
}
```

The inline group headers within the list items remain visible. This is useful when the fixed header overlaps content or causes visual issues.

---

## Grouping Limitations

- Grouping is **not supported** with `enableVirtualization: true`. Use standard rendering when grouping is required.
- The fixed group header content updates dynamically on scroll to always reflect the current visible category.
