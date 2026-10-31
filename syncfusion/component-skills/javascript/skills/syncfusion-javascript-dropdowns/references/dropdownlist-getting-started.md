# Getting Started — Syncfusion TypeScript DropDownList

## Dependencies

Install the required packages:

```bash
npm install @syncfusion/ej2-dropdowns
```

Full dependency tree:

```
@syncfusion/ej2-dropdowns
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
├── @syncfusion/ej2-inputs
├── @syncfusion/ej2-lists
├── @syncfusion/ej2-navigations
├── @syncfusion/ej2-notifications
└── @syncfusion/ej2-popups
    └── @syncfusion/ej2-buttons
```

## HTML Setup

Create a target element in your HTML. The DropDownList can be initialized on an `<input>`, `<select>`, or `<ul>` element.

```html
<!-- index.html -->
<input type="text" tabindex="1" id="ddlelement" />
```

Import the theme CSS in your styles file:

```css
/* styles.css */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/drop-down-list/index.css";
```

## Basic Initialization

### Minimal DropDownList

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'],
    placeholder: 'Select a game'
});
dropDownListObject.appendTo('#ddlelement');
```

### With JSON Data and Field Mapping

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let sportsData: { [key: string]: Object }[] = [
    { Id: 'game1', Game: 'Badminton' },
    { Id: 'game2', Game: 'Football' },
    { Id: 'game3', Game: 'Tennis' }
];

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    placeholder: 'Select a game'
});
dropDownListObject.appendTo('#ddlelement');
```

## Initializing on Different HTML Tags

### On `<select>` Element (with `<option>` and `<optgroup>`)

List items come directly from the HTML option tags. Groups come from `<optgroup>`.

```html
<select id="selectElement">
    <optgroup label="Beans">
        <option value="1">Chickpea</option>
        <option value="2">Green bean</option>
    </optgroup>
    <optgroup label="Leafy and Salad">
        <option value="4">Spinach</option>
        <option value="5" selected="selected">Cabbage</option>
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

### On `<ul>` Element

The `<li>` text is used as both text and value for each item.

```html
<ul id="ulElement">
    <li>Cabbage</li>
    <li>Spinach</li>
    <li>Wheat grass</li>
</ul>
```

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let dropDownListObject: DropDownList = new DropDownList({
    placeholder: 'Select a vegetable'
});
dropDownListObject.appendTo('#ulElement');
```

## Configuring the Popup

Control popup dimensions with `popupHeight` and `popupWidth`. By default, height is `300px` and width matches the input element.

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: ['Badminton', 'Cricket', 'Football', 'Golf', 'Hockey', 'Rugby', 'Snooker', 'Tennis'],
    popupHeight: '200px',
    popupWidth: '250px',
    placeholder: 'Select a game'
});
dropDownListObject.appendTo('#ddlelement');
```

## Setting a Default Value

Pre-select an item by setting the `value`, `text`, or `index` property:

```ts
let dropDownListObject: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    value: 'game2',          // by value
    // text: 'Football',     // or by text
    // index: 1,             // or by index
    placeholder: 'Select a game'
});
```
