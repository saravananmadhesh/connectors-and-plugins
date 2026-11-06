# Syncfusion Angular DropDownList – API Reference

> **Source:** https://ej2.syncfusion.com/angular/documentation/api/drop-down-list/index-default  
> **Package:** `@syncfusion/ej2-angular-dropdowns`  
> **Selector / Import:** `<ejs-dropdownlist>` from `@syncfusion/ej2-angular-dropdowns`

---

## Table of Contents

- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Interface: FieldSettingsModel](#interface-fieldsettingsmodel)
- [Interface: ChangeEventArgs](#interface-changeeventargs)
- [Interface: SelectEventArgs](#interface-selecteventargs)
- [Interface: PopupEventArgs](#interface-popupeventargs)
- [Interface: FilteringEventArgs](#interface-filteringeventargs)

---

## Properties

### `actionFailureTemplate`
| Detail | Value |
|---|---|
| **Type** | `any` (string or TemplateRef) |
| **Default** | `'Request failed'` |

Accepts the template and assigns it to the popup list content of the component when the data fetch request from the remote server fails.

```html
<ejs-dropdownlist
  [dataSource]="remoteData"
  [actionFailureTemplate]="failureTemplate">
</ejs-dropdownlist>

<ng-template #failureTemplate>
  <div class="error-msg">Failed to load data. Please try again.</div>
</ng-template>
```

---

### `allowFiltering`
| Detail | Value |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

When set to `true`, shows the filter bar (search box) in the popup. The filter action retrieves matched items through the `filtering` event based on the characters typed in the search TextBox. If no match is found, the value of the `noRecordsTemplate` property is displayed.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [allowFiltering]="true"
  (filtering)="onFilter($event)">
</ejs-dropdownlist>
```

---

### `allowObjectBinding`
| Detail | Value |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

Defines whether the object binding is allowed or not in the component. When set to `true`, the entire object can be bound as the value instead of just a primitive property.

---

### `allowResize`
| Detail | Value |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

When set to `true`, a resize handle appears in the bottom-right corner of the popup, allowing the user to resize the width and height of the popup.

```html
<ejs-dropdownlist [dataSource]="data" [allowResize]="true"></ejs-dropdownlist>
```

---

### `cssClass`
| Detail | Value |
|---|---|
| **Type** | `string` |
| **Default** | `null` |

Sets CSS classes to the root element of the component that allows customization of appearance. Multiple CSS classes can be added separated by space.

```html
<ejs-dropdownlist [dataSource]="data" cssClass="e-custom-style e-highlight"></ejs-dropdownlist>
```

---

### `dataSource`
| Detail | Value |
|---|---|
| **Type** | `{ [key: string]: Object }[] \| DataManager \| string[] \| number[] \| boolean[]` |
| **Default** | `[]` |

Accepts the list items either through local or remote service and binds it to the component. It can be an array of JSON Objects or an instance of `DataManager`.

```typescript
// Local string array
[dataSource]="['Badminton', 'Cricket', 'Football', 'Tennis']"

// JSON object array
[dataSource]="[
  { id: 1, name: 'Badminton' },
  { id: 2, name: 'Cricket' },
  { id: 3, name: 'Football' }
]"
[fields]="{ text: 'name', value: 'id' }"

// Remote DataManager
public dataSource: DataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});
[dataSource]="dataSource"
[fields]="{ text: 'ContactName', value: 'CustomerID' }"
```

---

### `debounceDelay`
| Detail | Value |
|---|---|
| **Type** | `number` |
| **Default** | `300` |

Specifies the delay time in milliseconds for filtering operations. This prevents excessive filtering while the user is typing.

```html
<ejs-dropdownlist [dataSource]="data" [allowFiltering]="true" [debounceDelay]="500"></ejs-dropdownlist>
```

---

### `enablePersistence`
| Detail | Value |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

Enable or disable persisting component's state between page reloads. When enabled, the `value` property is persisted.

```html
<ejs-dropdownlist [dataSource]="data" [enablePersistence]="true"></ejs-dropdownlist>
```

---

### `enableRtl`
| Detail | Value |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

Enable or disable rendering component in right to left direction. Useful for RTL languages like Arabic and Hebrew.

```html
<ejs-dropdownlist [dataSource]="data" [enableRtl]="true"></ejs-dropdownlist>
```

---

### `enableVirtualization`
| Detail | Value |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

Defines whether to enable virtual scrolling in the component. Virtual scrolling improves performance when working with large datasets (10,000+ items) by rendering only visible items.

```html
<ejs-dropdownlist
  [dataSource]="largeData"
  [enableVirtualization]="true">
</ejs-dropdownlist>
```

---

### `enabled`
| Detail | Value |
|---|---|
| **Type** | `boolean` |
| **Default** | `true` |

Specifies a value that indicates whether the component is enabled or not. When set to `false`, the component is disabled and user interactions are blocked.

```html
<ejs-dropdownlist [dataSource]="data" [enabled]="false"></ejs-dropdownlist>
```

---

### `fields`
| Detail | Value |
|---|---|
| **Type** | `FieldSettingsModel` |
| **Default** | `{text: null, value: null, iconCss: null, groupBy: null, disabled: null}` |

The `fields` property maps the columns of the data table and binds the data to the component:
- **text** - Maps the text column from data table for each list item
- **value** - Maps the value column from data table for each list item
- **iconCss** - Maps the icon CSS class column from data table for each list item
- **groupBy** - Group the list items with related items by mapping groupBy field
- **disabled** - Maps the field that determines if an item is disabled

```typescript
public fields = { text: 'ContactName', value: 'CustomerID', iconCss: 'FlagIcon', groupBy: 'Country', disabled: 'IsDisabled' };

// In template:
// [fields]="fields"
```

---

### `filterBarPlaceholder`
| Detail | Value |
|---|---|
| **Type** | `string` |
| **Default** | `null` |

Accepts the value to be displayed as a watermark text on the filter bar when `allowFiltering` is enabled.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [allowFiltering]="true"
  filterBarPlaceholder="Search countries...">
</ejs-dropdownlist>
```

---

### `filterType`
| Detail | Value |
|---|---|
| **Type** | `FilterType` (enum) |
| **Default** | `'StartsWith'` |

Determines on which filter type, the component needs to be considered on search action. Available filter types:

| FilterType | Description | Supported Types |
|---|---|---|
| `StartsWith` | Checks whether a value begins with the specified value | String |
| `EndsWith` | Checks whether a value ends with specified value | String |
| `Contains` | Checks whether a value contains with specified value | String |

```html
<ejs-dropdownlist
  [dataSource]="data"
  [allowFiltering]="true"
  filterType="Contains">
</ejs-dropdownlist>
```

---

### `floatLabelType`
| Detail | Value |
|---|---|
| **Type** | `FloatLabelType` (enum) |
| **Default** | `'Never'` |

Specifies whether to display the floating label above the input element. Possible values:
- **Never** - The label will never float in the input when the placeholder is available
- **Always** - The floating label will always float above the input
- **Auto** - The floating label will float above the input after focusing or entering a value

```html
<ejs-dropdownlist [dataSource]="data" floatLabelType="Auto"></ejs-dropdownlist>
```

---

### `footerTemplate`
| Detail | Value |
|---|---|
| **Type** | `any` (string or TemplateRef) |
| **Default** | `null` |

Accepts the template design and assigns it to the footer container of the popup list.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [footerTemplate]="footerTemplate">
</ejs-dropdownlist>

<ng-template #footerTemplate>
  <div class="footer">Total Items: {{ data.length }}</div>
</ng-template>
```

---

### `groupTemplate`
| Detail | Value |
|---|---|
| **Type** | `any` (string or TemplateRef) |
| **Default** | `null` |

Accepts the template design and assigns it to the group headers present in the popup list.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [fields]="{ text: 'Name', groupBy: 'Country' }"
  [groupTemplate]="groupTemplate">
</ejs-dropdownlist>

<ng-template #groupTemplate let-data>
  <strong>{{ data.Country }}</strong>
</ng-template>
```

---

### `headerTemplate`
| Detail | Value |
|---|---|
| **Type** | `any` (string or TemplateRef) |
| **Default** | `null` |

Accepts the template design and assigns it to the header container of the popup list.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [headerTemplate]="headerTemplate">
</ejs-dropdownlist>

<ng-template #headerTemplate>
  <div class="header"><b>Available Countries</b></div>
</ng-template>
```

---

### `htmlAttributes`
| Detail | Value |
|---|---|
| **Type** | `{ [key: string]: string }` |
| **Default** | `{}` |

Allows additional HTML attributes such as title, name, etc., and accepts n number of attributes in a key-value pair format.

```typescript
public htmlAttributes = {
  name: 'country',
  placeholder: 'Select a country',
  title: 'DropDownList',
  'data-testid': 'my-dropdown'
};

// In template:
// [htmlAttributes]="htmlAttributes"
```

---

### `ignoreAccent`
| Detail | Value |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

When set to `true`, diacritic characters or accents are ignored when filtering. This enables accent-insensitive search.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [allowFiltering]="true"
  [ignoreAccent]="true">
</ejs-dropdownlist>
```

---

### `ignoreCase`
| Detail | Value |
|---|---|
| **Type** | `boolean` |
| **Default** | `true` |

When set to `false`, the filter is case-sensitive. By default, the filter is case-insensitive.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [allowFiltering]="true"
  [ignoreCase]="false">
</ejs-dropdownlist>
```

---

### `index`
| Detail | Value |
|---|---|
| **Type** | `number \| null` |
| **Default** | `null` |

Gets or sets the index of the selected item in the component. Zero-based indexing.

```html
<!-- Preselect the item at index 1 -->
<ejs-dropdownlist [dataSource]="data" [index]="1"></ejs-dropdownlist>
```

---

### `isDeviceFullScreen`
| Detail | Value |
|---|---|
| **Type** | `boolean` |
| **Default** | `true` |

Defines whether the popup opens in fullscreen mode on mobile devices when filtering is enabled. When set to `false`, the popup will display similarly on both mobile and desktop devices.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [allowFiltering]="true"
  [isDeviceFullScreen]="false">
</ejs-dropdownlist>
```

---

### `itemTemplate`
| Detail | Value |
|---|---|
| **Type** | `any` (string or TemplateRef) |
| **Default** | `null` |

Accepts the template design and assigns it to each list item present in the popup. This allows custom rendering of list items.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [itemTemplate]="itemTemplate">
</ejs-dropdownlist>

<ng-template #itemTemplate let-data>
  <div class="item-wrapper">
    <span class="item-icon" [ngClass]="data.icon"></span>
    <span class="item-text">{{ data.name }}</span>
  </div>
</ng-template>
```

---

### `locale`
| Detail | Value |
|---|---|
| **Type** | `string` |
| **Default** | `'en-US'` |

Overrides the global culture and localization value for this component. Supports various locale codes like 'ar', 'de', 'fr', 'ja', etc.

```html
<ejs-dropdownlist [dataSource]="data" locale="de"></ejs-dropdownlist>
```

---

### `noRecordsTemplate`
| Detail | Value |
|---|---|
| **Type** | `any` (string or TemplateRef) |
| **Default** | `'No records found'` |

Accepts the template design and assigns it to popup list of component when no data is available on the component.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [noRecordsTemplate]="noRecordsTemplate">
</ejs-dropdownlist>

<ng-template #noRecordsTemplate>
  <div class="no-records">No matching records found</div>
</ng-template>
```

---

### `placeholder`
| Detail | Value |
|---|---|
| **Type** | `string` |
| **Default** | `null` |

Specifies a short hint that describes the expected value of the DropDownList component.

```html
<ejs-dropdownlist [dataSource]="data" placeholder="Select a country"></ejs-dropdownlist>
```

---

### `popupHeight`
| Detail | Value |
|---|---|
| **Type** | `string \| number` |
| **Default** | `'300px'` |

Specifies the height of the popup list.

```html
<ejs-dropdownlist [dataSource]="data" popupHeight="250px"></ejs-dropdownlist>
<!-- or numeric value (pixels) -->
<ejs-dropdownlist [dataSource]="data" [popupHeight]="250"></ejs-dropdownlist>
```

---

### `popupWidth`
| Detail | Value |
|---|---|
| **Type** | `string \| number` |
| **Default** | `'100%'` |

Specifies the width of the popup list. By default, the popup width sets based on the width of the component.

```html
<ejs-dropdownlist [dataSource]="data" popupWidth="300px"></ejs-dropdownlist>
```

---

### `query`
| Detail | Value |
|---|---|
| **Type** | `Query` |
| **Default** | `null` |

Accepts the external `Query` that executes along with data processing. Useful for filtering, sorting, and selecting specific columns from remote data.

```typescript
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

public dataSource: DataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});
public query: Query = new Query().select(['FirstName', 'EmployeeID']).take(10);

// In template:
// [dataSource]="dataSource"
// [query]="query"
```

---

### `readonly`
| Detail | Value |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

When set to `true`, the user interactions on the component are disabled. The dropdown displays the current value but cannot be changed.

```html
<ejs-dropdownlist [dataSource]="data" [readonly]="true"></ejs-dropdownlist>
```

---

### `showClearButton`
| Detail | Value |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

Specifies whether to show or hide the clear button. When the clear button is clicked, `value`, `text`, and `index` properties are reset to `null`.

```html
<ejs-dropdownlist [dataSource]="data" [showClearButton]="true"></ejs-dropdownlist>
```

---

### `sortOrder`
| Detail | Value |
|---|---|
| **Type** | `SortOrder` (enum) |
| **Default** | `null` |

Specifies the `sortOrder` to sort the data source. Available sort orders:
- **None** - The data source is not sorted
- **Ascending** - The data source is sorted with ascending order
- **Descending** - The data source is sorted with descending order

```html
<ejs-dropdownlist [dataSource]="data" sortOrder="Ascending"></ejs-dropdownlist>
```

---

### `text`
| Detail | Value |
|---|---|
| **Type** | `string \| null` |
| **Default** | `null` |

Gets or sets the display text of the selected item in the component. This is read-only property.

```typescript
// Get the text
selectedText: string = this.ddl.text;
```

---

### `value`
| Detail | Value |
|---|---|
| **Type** | `number \| string \| boolean \| object \| null` |
| **Default** | `null` |

Gets or sets the value of the selected item in the component. Supports two-way binding with `[(value)]`.

```html
<!-- Two-way binding -->
<ejs-dropdownlist [dataSource]="data" [(value)]="selectedValue"></ejs-dropdownlist>

<!-- Or one-way binding -->
<ejs-dropdownlist [dataSource]="data" [value]="preselectedValue"></ejs-dropdownlist>
```

---

### `valueTemplate`
| Detail | Value |
|---|---|
| **Type** | `any` (string or TemplateRef) |
| **Default** | `null` |

Accepts the template design and assigns it to the selected list item displayed in the input element of the component.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [valueTemplate]="valueTemplate">
</ejs-dropdownlist>

<ng-template #valueTemplate let-data>
  <span class="value-item">
    <img [src]="data.flag" class="flag" />
    {{ data.name }}
  </span>
</ng-template>
```

---

### `width`
| Detail | Value |
|---|---|
| **Type** | `string \| number` |
| **Default** | `'100%'` |

Specifies the width of the component. By default, the component width sets based on the width of its parent container. Can be set in pixel values.

```html
<ejs-dropdownlist [dataSource]="data" width="250px"></ejs-dropdownlist>
```

---

### `zIndex`
| Detail | Value |
|---|---|
| **Type** | `number` |
| **Default** | `1000` |

Specifies the z-index value of the component popup element. Useful when the popup needs to appear above other modal elements.

```html
<ejs-dropdownlist [dataSource]="data" [zIndex]="9999"></ejs-dropdownlist>
```

---

## Methods

### `addItem`

Adds a new item to the popup list. By default, new item appends to the list as the last item, but you can insert based on the index parameter.

**Signature:**
```typescript
addItem(
  items: { [key: string]: Object }[] | { [key: string]: Object } | string | boolean | number | string[] | boolean[] | number[],
  itemIndex?: number
): void
```

| Parameter | Type | Description |
|---|---|---|
| `items` | `Object[] \| string \| boolean \| number \| ...` | Specifies an array of JSON data or a JSON data item. |
| `itemIndex` (optional) | `number` | Specifies the index to place the newly added item in the popup list. |

**Returns:** `void`

```typescript
// Append to end
this.ddl.addItem({ Name: 'New Country', Code: 'NC' });

// Insert at specific index
this.ddl.addItem({ Name: 'New Country', Code: 'NC' }, 1);

// Add multiple items
this.ddl.addItem([
  { Name: 'Country1', Code: 'C1' },
  { Name: 'Country2', Code: 'C2' }
]);
```

---

### `clear`

Allows you to clear the selected values from the component. Resets `value`, `text`, and `index` to `null`.

**Signature:**
```typescript
clear(): void
```

**Returns:** `void`

```typescript
this.ddl.clear();
```

---

### `destroy`

Removes the component from the DOM and detaches all its related event handlers. Also removes the attributes and classes.

**Signature:**
```typescript
destroy(): void
```

**Returns:** `void`

```typescript
this.ddl.destroy();
```

---

### `disableItem`

Method to disable specific item in the popup.

**Signature:**
```typescript
disableItem(item: string | number | object | HTMLLIElement): void
```

| Parameter | Type | Description |
|---|---|---|
| `item` | `string \| number \| object \| HTMLLIElement` | Specifies the item to be disabled. Can be the value, object, or DOM element. |

**Returns:** `void`

```typescript
// Disable by value
this.ddl.disableItem('au');

// Disable by index/value
this.ddl.disableItem(1);

// Disable by object
this.ddl.disableItem({ Name: 'Australia', Code: 'AU' });
```

---

### `filter`

To filter the data from given data source by using query.

**Signature:**
```typescript
filter(
  dataSource: { [key: string]: Object }[] | DataManager | string[] | number[] | boolean[],
  query?: Query,
  fields?: FieldSettingsModel
): void
```

| Parameter | Type | Description |
|---|---|---|
| `dataSource` | `Object[] \| DataManager \| string[] \| ...` | Set the data source to filter. |
| `query` (optional) | `Query` | Specify the query to filter the data. |
| `fields` (optional) | `FieldSettingsModel` | Specify the fields to map the column in the data table. |

**Returns:** `void`

```typescript
import { Query } from '@syncfusion/ej2-data';

const query = new Query().where('Name', 'startswith', 'A', true);
this.ddl.filter(this.countriesData, query, { text: 'Name', value: 'Code' });
```

---

### `focusIn`

Sets the focus on the component for interaction.

**Signature:**
```typescript
focusIn(): void
```

**Returns:** `void`

```typescript
this.ddl.focusIn();
```

---

### `focusOut`

Moves the focus from the component if the component is already focused.

**Signature:**
```typescript
focusOut(): void
```

**Returns:** `void`

```typescript
this.ddl.focusOut();
```

---

### `getDataByValue`

Gets the data Object that matches the given value.

**Signature:**
```typescript
getDataByValue(value: string | number | boolean): { [key: string]: Object } | string | number | boolean
```

| Parameter | Type | Description |
|---|---|---|
| `value` | `string \| number \| boolean` | Specifies the value of the list item. |

**Returns:** `{ [key: string]: Object } | string | number | boolean`

```typescript
// Get data by value
const itemData = this.ddl.getDataByValue('au');
console.log(itemData); // { Name: 'Australia', Code: 'au' }
```

---

### `getItems`

Gets all the list items bound on this component.

**Signature:**
```typescript
getItems(): Element[]
```

**Returns:** `Element[]` - Array of DOM elements representing list items

```typescript
const items = this.ddl.getItems();
console.log(items.length); // Total number of items
```

---

### `hidePopup`

Hides the popup if it is in an open state.

**Signature:**
```typescript
hidePopup(): void
```

**Returns:** `void`

```typescript
this.ddl.hidePopup();
```

---

### `hideSpinner`

Hides the spinner loader.

**Signature:**
```typescript
hideSpinner(): void
```

**Returns:** `void`

```typescript
this.ddl.hideSpinner();
```

---

### `showPopup`

Opens the popup that displays the list of items.

**Signature:**
```typescript
showPopup(): void
```

**Returns:** `void`

```typescript
this.ddl.showPopup();
```

---

### `showSpinner`

Shows the spinner loader.

**Signature:**
```typescript
showSpinner(): void
```

**Returns:** `void`

```typescript
this.ddl.showSpinner();
```

---

## Events

### `actionBegin`
| Detail | Value |
|---|---|
| **Type** | `EmitType<Object>` |

Triggers before fetching data from the remote server.

```html
<ejs-dropdownlist
  [dataSource]="remoteData"
  (actionBegin)="onActionBegin($event)">
</ejs-dropdownlist>
```

```typescript
onActionBegin(args: any) {
  console.log('Data fetch initiated...', args);
}
```

---

### `actionComplete`
| Detail | Value |
|---|---|
| **Type** | `EmitType<Object>` |

Triggers after data is fetched successfully from the remote server.

```html
<ejs-dropdownlist
  [dataSource]="remoteData"
  (actionComplete)="onActionComplete($event)">
</ejs-dropdownlist>
```

```typescript
onActionComplete(args: any) {
  console.log('Data fetched successfully', args);
}
```

---

### `actionFailure`
| Detail | Value |
|---|---|
| **Type** | `EmitType<Object>` |

Triggers when the data fetch request from the remote server fails.

```html
<ejs-dropdownlist
  [dataSource]="remoteData"
  (actionFailure)="onActionFailure($event)">
</ejs-dropdownlist>
```

```typescript
onActionFailure(args: any) {
  console.error('Data fetch failed', args);
}
```

---

### `beforeOpen`
| Detail | Value |
|---|---|
| **Type** | `EmitType<Object>` |

Triggers when the popup before opens.

```html
<ejs-dropdownlist [dataSource]="data" (beforeOpen)="onBeforeOpen($event)"></ejs-dropdownlist>
```

```typescript
onBeforeOpen(args: any) {
  console.log('Popup about to open', args);
}
```

---

### `blur`
| Detail | Value |
|---|---|
| **Type** | `EmitType<Object>` |

Triggers when focus moves out from the component.

```html
<ejs-dropdownlist [dataSource]="data" (blur)="onBlur($event)"></ejs-dropdownlist>
```

```typescript
onBlur(args: any) {
  console.log('Component lost focus', args);
}
```

---

### `change`
| Detail | Value |
|---|---|
| **Type** | `EmitType<ChangeEventArgs>` |

Triggers when an item in a popup is selected or when the model value is changed by user. Use this event to configure cascading DropDownLists.

```html
<ejs-dropdownlist
  [dataSource]="data"
  (change)="onChange($event)">
</ejs-dropdownlist>
```

```typescript
import { ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';

onChange(args: ChangeEventArgs) {
  console.log('Selected value:', args.value);
  console.log('Item data:', args.itemData);
  console.log('Previous value:', args.previousValue);
  console.log('Is user interaction:', args.isInteracted);
}
```

---

### `close`
| Detail | Value |
|---|---|
| **Type** | `EmitType<PopupEventArgs>` |

Triggers when the popup is closed.

```html
<ejs-dropdownlist [dataSource]="data" (close)="onClose($event)"></ejs-dropdownlist>
```

```typescript
import { PopupEventArgs } from '@syncfusion/ej2-angular-dropdowns';

onClose(args: PopupEventArgs) {
  console.log('Popup closed', args);
}
```

---

### `created`
| Detail | Value |
|---|---|
| **Type** | `EmitType<Object>` |

Triggers when the component is created.

```html
<ejs-dropdownlist [dataSource]="data" (created)="onCreated($event)"></ejs-dropdownlist>
```

```typescript
onCreated(args: any) {
  console.log('DropDownList created', args);
}
```

---

### `dataBound`
| Detail | Value |
|---|---|
| **Type** | `EmitType<Object>` |

Triggers when data source is populated in the popup list.

```html
<ejs-dropdownlist
  [dataSource]="remoteData"
  (dataBound)="onDataBound($event)">
</ejs-dropdownlist>
```

```typescript
onDataBound(args: any) {
  console.log('Data bound to popup', args);
}
```

---

### `destroyed`
| Detail | Value |
|---|---|
| **Type** | `EmitType<Object>` |

Triggers when the component is destroyed.

```html
<ejs-dropdownlist [dataSource]="data" (destroyed)="onDestroyed($event)"></ejs-dropdownlist>
```

---

### `filtering`
| Detail | Value |
|---|---|
| **Type** | `EmitType<FilteringEventArgs>` |

Triggers on typing a character in the filter bar when the `allowFiltering` is enabled.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [allowFiltering]="true"
  (filtering)="onFiltering($event)">
</ejs-dropdownlist>
```

```typescript
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';

onFiltering(args: FilteringEventArgs) {
  // Custom filtering logic
  let query = new Query();
  query = args.text !== '' 
    ? query.where('Name', 'contains', args.text, true) 
    : query;
  args.updateData(this.countries, query);
}
```

---

### `focus`
| Detail | Value |
|---|---|
| **Type** | `EmitType<Object>` |

Triggers when the component is focused.

```html
<ejs-dropdownlist [dataSource]="data" (focus)="onFocus($event)"></ejs-dropdownlist>
```

```typescript
onFocus(args: any) {
  console.log('Component focused', args);
}
```

---

### `open`
| Detail | Value |
|---|---|
| **Type** | `EmitType<PopupEventArgs>` |

Triggers when the popup opens.

```html
<ejs-dropdownlist [dataSource]="data" (open)="onOpen($event)"></ejs-dropdownlist>
```

```typescript
import { PopupEventArgs } from '@syncfusion/ej2-angular-dropdowns';

onOpen(args: PopupEventArgs) {
  console.log('Popup opened', args);
}
```

---

### `resizeStart`
| Detail | Value |
|---|---|
| **Type** | `EmitType<Object>` |

Triggers when the user starts resizing the DropDown popup. Requires `allowResize="true"`.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [allowResize]="true"
  (resizeStart)="onResizeStart($event)">
</ejs-dropdownlist>
```

```typescript
onResizeStart(args: any) {
  console.log('Resize started', args);
}
```

---

### `resizeStop`
| Detail | Value |
|---|---|
| **Type** | `EmitType<Object>` |

Triggers when the user finishes resizing the DropDown popup.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [allowResize]="true"
  (resizeStop)="onResizeStop($event)">
</ejs-dropdownlist>
```

```typescript
onResizeStop(args: any) {
  console.log('Resize finished', args);
}
```

---

### `resizing`
| Detail | Value |
|---|---|
| **Type** | `EmitType<Object>` |

Triggers continuously while the DropDown popup is being resized by the user. This event provides live updates on the width and height of the popup.

```html
<ejs-dropdownlist
  [dataSource]="data"
  [allowResize]="true"
  (resizing)="onResizing($event)">
</ejs-dropdownlist>
```

```typescript
onResizing(args: any) {
  console.log('Currently resizing', args);
}
```

---

### `select`
| Detail | Value |
|---|---|
| **Type** | `EmitType<SelectEventArgs>` |

Triggers when an item in the popup is selected by the user either with mouse/tap or with keyboard navigation.

```html
<ejs-dropdownlist [dataSource]="data" (select)="onSelect($event)"></ejs-dropdownlist>
```

```typescript
import { SelectEventArgs } from '@syncfusion/ej2-angular-dropdowns';

onSelect(args: SelectEventArgs) {
  console.log('Item selected:', args.itemData);
  console.log('Selected item element:', args.item);
}
```

---

## Interface: FieldSettingsModel

Maps the columns of the data source to the DropDownList component.

> **API Ref:** https://ej2.syncfusion.com/angular/documentation/api/drop-down-list/fieldSettingsModel

| Property | Type | Description |
|---|---|---|
| `text` | `string` | Maps the text column from data table for each list item (display label). |
| `value` | `string` | Maps the value column from data table for each list item. |
| `iconCss` | `string` | Maps the icon CSS class column from data table for each list item. |
| `groupBy` | `string` | Groups list items with related items by mapping the groupBy field. |
| `disabled` | `string` | Maps the field that determines whether a particular item is disabled. |
| `htmlAttributes` | `string` | Maps additional HTML attributes for list elements. |

```typescript
public fields: FieldSettingsModel = {
  text: 'CountryName',
  value: 'CountryCode',
  iconCss: 'FlagIcon',
  groupBy: 'Continent',
  disabled: 'IsDisabled'
};

// In template:
// [fields]="fields"
```

---

## Interface: ChangeEventArgs

Emitted by the `change` event.

> **API Ref:** https://ej2.syncfusion.com/angular/documentation/api/drop-down-list/changeEventArgs

| Property | Type | Description |
|---|---|---|
| `value` | `number \| string \| boolean \| object` | Returns the selected value. |
| `item` | `HTMLLIElement` | Returns the selected list item DOM element. |
| `itemData` | `Object` | Returns the selected item as a JSON object from the data source. |
| `previousItem` | `HTMLLIElement` | Returns the previously selected list item DOM element. |
| `previousItemData` | `Object` | Returns the previously selected item as a JSON object. |
| `element` | `HTMLElement` | Returns the root element of the component. |
| `event` | `MouseEvent \| KeyboardEvent \| TouchEvent` | Specifies the original event arguments. |
| `e` | `MouseEvent \| KeyboardEvent \| TouchEvent` | Specifies the original event arguments (alias). |
| `isInteracted` | `boolean` | Returns `true` if the event was triggered by user interaction, `false` if programmatic. |
| `cancel` | `boolean` | Set to `true` to prevent the default change action. |

```typescript
onChange(args: ChangeEventArgs) {
  console.log('New value:', args.value);
  console.log('New item data:', args.itemData);
  console.log('Previous item data:', args.previousItemData);
  console.log('User interaction:', args.isInteracted);
}
```

---

## Interface: SelectEventArgs

Emitted by the `select` event.

> **API Ref:** https://ej2.syncfusion.com/angular/documentation/api/drop-down-list/selectEventArgs

| Property | Type | Description |
|---|---|---|
| `item` | `HTMLLIElement` | Returns the selected list item DOM element. |
| `itemData` | `Object` | Returns the selected item as a JSON object from the data source. |
| `e` | `MouseEvent \| KeyboardEvent \| TouchEvent` | Specifies the original event arguments. |
| `isInteracted` | `boolean` | Returns `true` if triggered by user interaction, `false` if programmatic. |
| `cancel` | `boolean` | Set to `true` to cancel the selection action. |

```typescript
onSelect(args: SelectEventArgs) {
  if (someCondition) {
    args.cancel = true; // Prevent selection
  }
  console.log('Selected item:', args.itemData);
}
```

---

## Interface: PopupEventArgs

Emitted by the `open`, `close`, and `beforeOpen` events.

> **API Ref:** https://ej2.syncfusion.com/angular/documentation/api/drop-down-list/popupEventArgs

| Property | Type | Description |
|---|---|---|
| `popup` | `Popup` | Specifies the popup component object. |
| `animation` | `AnimationModel` | Specifies the animation object used for the popup open/close transition. |
| `event` | `MouseEvent \| KeyboardEventArgs \| TouchEvent \| Object` | Specifies the event that triggered the popup action. |
| `cancel` | `boolean` | Set to `true` to cancel the popup open or close action. |

```typescript
onBeforeOpen(args: PopupEventArgs) {
  args.cancel = true; // Prevent popup from opening
}

onOpen(args: PopupEventArgs) {
  // Customize animation
  args.animation = { open: { effect: 'FadeIn', duration: 300 } };
}
```

---

## Interface: FilteringEventArgs

Emitted by the `filtering` event.

> **API Ref:** https://ej2.syncfusion.com/angular/documentation/api/drop-down-list/filteringEventArgs

| Property | Type | Description |
|---|---|---|
| `text` | `string` | The search text typed in the filter bar. |
| `cancel` | `boolean` | Set to `true` to prevent the default filtering action. |
| `baseEventArgs` | `Object` | Gets the underlying event arguments. |

### Methods on `FilteringEventArgs`

#### `updateData`
Applies filtered data to the popup list.

```typescript
updateData(
  dataSource: { [key: string]: Object }[] | DataManager | string[] | number[] | boolean[],
  query?: Query,
  fields?: FieldSettingsModel
): void
```

| Parameter | Type | Description |
|---|---|---|
| `dataSource` | `Object[] \| DataManager \| string[] \| ...` | The data source to display after filtering. |
| `query` (optional) | `Query` | A query to apply on the data source. |
| `fields` (optional) | `FieldSettingsModel` | Field mappings for the data table. |

```typescript
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';

onFiltering(args: FilteringEventArgs) {
  // Custom filtering logic
  const query = new Query().where('Name', 'contains', args.text, true);
  args.updateData(this.countries, query, { text: 'Name', value: 'Code' });
}
```

---

## Quick Reference Summary

### Properties at a Glance

| Property | Type | Default | Purpose |
|---|---|---|---|
| `dataSource` | `any[] \| DataManager` | `[]` | Data for the list |
| `fields` | `FieldSettingsModel` | `{}` | Column mapping |
| `value` | `string \| number \| boolean \| object \| null` | `null` | Selected value |
| `text` | `string \| null` | `null` | Selected display text |
| `index` | `number \| null` | `null` | Selected item index |
| `placeholder` | `string` | `null` | Input placeholder |
| `allowFiltering` | `boolean` | `false` | Enable search filter bar |
| `filterType` | `FilterType` | `'StartsWith'` | Filter matching type |
| `filterBarPlaceholder` | `string` | `null` | Filter bar watermark |
| `debounceDelay` | `number` | `300` | Filter debounce (ms) |
| `ignoreCase` | `boolean` | `true` | Case-insensitive filter |
| `ignoreAccent` | `boolean` | `false` | Accent-insensitive filter |
| `sortOrder` | `SortOrder` | `null` | Sort order |
| `enabled` | `boolean` | `true` | Enable/disable component |
| `readonly` | `boolean` | `false` | Read-only mode |
| `showClearButton` | `boolean` | `false` | Show clear button |
| `enableVirtualization` | `boolean` | `false` | Virtual scrolling |
| `allowResize` | `boolean` | `false` | Resizable popup |
| `popupHeight` | `string \| number` | `'300px'` | Popup list height |
| `popupWidth` | `string \| number` | `'100%'` | Popup list width |
| `cssClass` | `string` | `null` | Custom CSS class |
| `htmlAttributes` | `object` | `{}` | Extra HTML attributes |
| `width` | `string \| number` | `'100%'` | Component width |
| `zIndex` | `number` | `1000` | Popup z-index |
| `floatLabelType` | `FloatLabelType` | `'Never'` | Floating label behavior |
| `itemTemplate` | `any` | `null` | Item render template |
| `valueTemplate` | `any` | `null` | Selected value template |
| `headerTemplate` | `any` | `null` | Popup header template |
| `footerTemplate` | `any` | `null` | Popup footer template |
| `groupTemplate` | `any` | `null` | Group header template |
| `noRecordsTemplate` | `any` | `'No records found'` | Empty state template |
| `actionFailureTemplate` | `any` | `'Request failed'` | Remote failure template |
| `query` | `Query` | `null` | External data query |
| `allowObjectBinding` | `boolean` | `false` | Allow object value binding |
| `enablePersistence` | `boolean` | `false` | Persist state on reload |
| `enableRtl` | `boolean` | `false` | Right-to-left layout |
| `locale` | `string` | `'en-US'` | Locale/culture override |
| `isDeviceFullScreen` | `boolean` | `true` | Full-screen popup on mobile |

### Methods at a Glance

| Method | Returns | Purpose |
|---|---|---|
| `addItem(items, itemIndex?)` | `void` | Add item(s) to the popup list |
| `clear()` | `void` | Clear the selected value |
| `destroy()` | `void` | Remove component from DOM |
| `disableItem(item)` | `void` | Disable a specific list item |
| `filter(dataSource, query?, fields?)` | `void` | Programmatically filter the data |
| `focusIn()` | `void` | Set focus on the component |
| `focusOut()` | `void` | Remove focus from the component |
| `getDataByValue(value)` | `Object \| string \| ...` | Get data object by value |
| `getItems()` | `Element[]` | Get all list item elements |
| `hidePopup()` | `void` | Close the popup |
| `hideSpinner()` | `void` | Hide the loading spinner |
| `showPopup()` | `void` | Open the popup |
| `showSpinner()` | `void` | Show the loading spinner |

### Events at a Glance

| Event | Args Type | Trigger |
|---|---|---|
| `actionBegin` | `Object` | Before remote data fetch starts |
| `actionComplete` | `Object` | After remote data fetch succeeds |
| `actionFailure` | `Object` | When remote data fetch fails |
| `beforeOpen` | `Object` | Before the popup opens |
| `open` | `PopupEventArgs` | When the popup opens |
| `close` | `PopupEventArgs` | When the popup closes |
| `change` | `ChangeEventArgs` | When the selected value changes |
| `select` | `SelectEventArgs` | When an item is selected in the popup |
| `filtering` | `FilteringEventArgs` | On typing in the filter bar |
| `focus` | `Object` | When the component gains focus |
| `blur` | `Object` | When the component loses focus |
| `created` | `Object` | When the component is created |
| `destroyed` | `Object` | When the component is destroyed |
| `dataBound` | `Object` | When data source is bound to popup |
| `resizeStart` | `Object` | When popup resize starts |
| `resizing` | `Object` | While popup is being resized |
| `resizeStop` | `Object` | When popup resize ends |

---

## Related Resources

- **Official Documentation:** https://ej2.syncfusion.com/angular/documentation/drop-down-list/index
- **Demo Examples:** https://ej2.syncfusion.com/angular/demos
- **Getting Started Guide:** [references/getting-started.md](getting-started.md)
- **Data Binding Guide:** [references/data-binding.md](data-binding.md)
- **Filtering Guide:** [references/filtering.md](filtering.md)
- **Templates Guide:** [references/templates.md](templates.md)
- **How-To Recipes:** [references/how-to.md](how-to.md)
