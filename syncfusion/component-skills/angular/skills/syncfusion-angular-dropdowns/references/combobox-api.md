# ComboBoxComponent API Reference

> **Official Documentation:** [Syncfusion Angular ComboBox API](https://ej2.syncfusion.com/angular/documentation/api/combo-box/index-default)

This document provides a comprehensive reference for the Syncfusion Angular ComboBox component API, including all properties, methods, and events.

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)

---

## Properties

### actionFailureTemplate
**Type:** `any`  
**Default:** `'Request failed'`

Accepts the template and assigns it to the popup list content of the component when the data fetch request from the remote server fails.

```html
<ejs-combobox actionFailureTemplate="<span>Failed to load data</span>"></ejs-combobox>
```

---

### allowCustom
**Type:** `boolean`  
**Default:** `true`

Specifies whether the component allows user-defined values that do not exist in the data source.

```html
<ejs-combobox [allowCustom]="false"></ejs-combobox>
```

---

### allowFiltering
**Type:** `boolean`  
**Default:** `false`

When set to `true`, shows the filter bar (search box) of the component. The filter action retrieves matched items through the `filtering` event based on characters typed in the search TextBox. If no match is found, the value of the `noRecordsTemplate` property is displayed.

```html
<ejs-combobox [allowFiltering]="true" (filtering)="onFilter($event)"></ejs-combobox>
```

---

### allowObjectBinding
**Type:** `boolean`  
**Default:** `false`

Defines whether object binding is allowed in the component. When enabled, full objects are used as values instead of primitives.

```html
<ejs-combobox [allowObjectBinding]="true"></ejs-combobox>
```

---

### allowResize
**Type:** `boolean`  
**Default:** `false`

Gets or sets a value that indicates whether the ComboBox popup can be resized. When set to `true`, a resize handle appears in the bottom-right corner of the popup, allowing the user to resize the width and height of the popup.

```html
<ejs-combobox [allowResize]="true"></ejs-combobox>
```

---

### autofill
**Type:** `boolean`  
**Default:** `false`

Specifies whether to suggest the first matched item in the input when searching. No action occurs when no matches are found.

```html
<ejs-combobox [autofill]="true" [allowFiltering]="true"></ejs-combobox>
```

---

### cssClass
**Type:** `string`  
**Default:** `null`

Sets CSS classes to the root element of the component that allows customization of appearance.

```html
<ejs-combobox cssClass="custom-combobox dark-theme"></ejs-combobox>
```

---

### dataSource
**Type:** `{ [key: string]: Object }[] | DataManager | string[] | number[] | boolean[]`  
**Default:** `[]`

Accepts the list items either through local or remote service and binds them to the component. It can be an array of JSON Objects or an instance of `DataManager`.

```typescript
// Local array
dataSource = [
  { id: 1, text: 'Angular' },
  { id: 2, text: 'React' }
];

// Remote DataManager
dataSource = new DataManager({ url: 'url' });
```

```html
<ejs-combobox [dataSource]="dataSource" [fields]="fields"></ejs-combobox>
```

---

### debounceDelay
**Type:** `number`  
**Default:** `300`

Specifies the delay time in milliseconds for filtering operations.

```html
<ejs-combobox [debounceDelay]="500" [allowFiltering]="true"></ejs-combobox>
```

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Enables or disables persisting the component's `value` state between page reloads.

```html
<ejs-combobox [enablePersistence]="true"></ejs-combobox>
```

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Enables or disables rendering the component in right-to-left direction.

```html
<ejs-combobox [enableRtl]="true"></ejs-combobox>
```

---

### enableVirtualization
**Type:** `boolean`  
**Default:** `false`

Defines whether to enable virtual scrolling in the component for improved performance with large datasets.

```html
<ejs-combobox [enableVirtualization]="true" [dataSource]="largeDataSet"></ejs-combobox>
```

---

### enabled
**Type:** `boolean`  
**Default:** `true`

Specifies a value that indicates whether the component is enabled or not.

```html
<ejs-combobox [enabled]="false"></ejs-combobox>
```

---

### fields
**Type:** `FieldSettingsModel`  
**Default:** `{ text: null, value: null, iconCss: null, groupBy: null, disabled: null }`

The `fields` property maps the columns of the data table and binds the data to the component. Key sub-properties:
- `text` — Maps the text column from data table for each list item.
- `value` — Maps the value column from data table for each list item.
- `iconCss` — Maps the icon class column from data table for each list item.
- `groupBy` — Groups the list items with related items by mapping the `groupBy` field.
- `disabled` — Maps the column for disabling specific items.

```typescript
fields = { text: 'ContactName', value: 'CustomerID', groupBy: 'Country' };
```

```html
<ejs-combobox [fields]="fields" [dataSource]="dataSource"></ejs-combobox>
```

---

### filterType
**Type:** `FilterType`  
**Default:** `'StartsWith'`

Determines the filter type used when performing a search. Options:

| FilterType | Description | Supported Types |
|---|---|---|
| `StartsWith` | Checks whether a value begins with the specified value. | String |
| `EndsWith` | Checks whether a value ends with the specified value. | String |
| `Contains` | Checks whether a value contains the specified value. | String |

```html
<ejs-combobox filterType="Contains" [allowFiltering]="true"></ejs-combobox>
```

---

### floatLabelType
**Type:** `FloatLabelType`  
**Default:** `Never`

Specifies whether to display the floating label above the input element. Options:
- `Never` — The label will never float when a placeholder is available.
- `Always` — The floating label will always float above the input.
- `Auto` — The floating label will float above the input after focusing or entering a value.

```html
<ejs-combobox floatLabelType="Auto" placeholder="Select a language"></ejs-combobox>
```

---

### footerTemplate
**Type:** `any`  
**Default:** `null`

Accepts the template design and assigns it to the footer container of the popup list.

```html
<ejs-combobox [footerTemplate]="footerTemplate"></ejs-combobox>
```

---

### groupTemplate
**Type:** `any`  
**Default:** `null`

Accepts the template design and assigns it to the group headers present in the popup list.

```html
<ejs-combobox [groupTemplate]="groupTemplate"></ejs-combobox>
```

---

### headerTemplate
**Type:** `any`  
**Default:** `null`

Accepts the template design and assigns it to the header container of the popup list.

```html
<ejs-combobox [headerTemplate]="headerTemplate"></ejs-combobox>
```

---

### htmlAttributes
**Type:** `{ [key: string]: string }`  
**Default:** `{}`

Allows additional HTML attributes such as `title`, `name`, etc., and accepts any number of attributes in a key-value pair format.

```typescript
htmlAttributes = { name: 'games', readonly: 'readonly', title: 'ComboBox' };
```

```html
<ejs-combobox [htmlAttributes]="htmlAttributes"></ejs-combobox>
```

---

### ignoreAccent
**Type:** `boolean`  
**Default:** `false`

When set to `true`, ignores diacritic characters or accents when filtering.

```html
<ejs-combobox [ignoreAccent]="true" [allowFiltering]="true"></ejs-combobox>
```

---

### ignoreCase
**Type:** `boolean`  
**Default:** `true`

When set to `false`, considers case-sensitivity when performing search to find suggestions. By default, filtering is case-insensitive.

```html
<ejs-combobox [ignoreCase]="false" [allowFiltering]="true"></ejs-combobox>
```

---

### index
**Type:** `number | null`  
**Default:** `null`

Gets or sets the index of the selected item in the component.

```html
<ejs-combobox [index]="0"></ejs-combobox>
```

---

### isDeviceFullScreen
**Type:** `boolean`  
**Default:** `true`

Defines whether the popup opens in fullscreen mode on mobile devices when filtering is enabled. When set to `false`, the popup displays similarly on both mobile and desktop devices.

```html
<ejs-combobox [isDeviceFullScreen]="false"></ejs-combobox>
```

---

### itemTemplate
**Type:** `any`  
**Default:** `null`

Accepts the template design and assigns it to each list item present in the popup.

```html
<ejs-combobox [itemTemplate]="itemTemplate"></ejs-combobox>
```

---

### locale
**Type:** `string`  
**Default:** `'en-US'`

Overrides the global culture and localization value for this component.

```html
<ejs-combobox locale="de"></ejs-combobox>
```

---

### noRecordsTemplate
**Type:** `any`  
**Default:** `'No records found'`

Accepts the template design and assigns it to the popup list when no data is available on the component.

```html
<ejs-combobox noRecordsTemplate="<span>No items found</span>"></ejs-combobox>
```

---

### placeholder
**Type:** `string`  
**Default:** `null`

Specifies a short hint that describes the expected value of the ComboBox component.

```html
<ejs-combobox placeholder="Select a language"></ejs-combobox>
```

---

### popupHeight
**Type:** `string | number`  
**Default:** `'300px'`

Specifies the height of the popup list.

```html
<ejs-combobox popupHeight="400px"></ejs-combobox>
```

---

### popupWidth
**Type:** `string | number`  
**Default:** `'100%'`

Specifies the width of the popup list. By default, the popup width is set based on the width of the component.

```html
<ejs-combobox popupWidth="300px"></ejs-combobox>
```

---

### query
**Type:** `Query`  
**Default:** `null`

Accepts the external `Query` object that executes along with data processing.

```typescript
query = new Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount();
```

```html
<ejs-combobox [query]="query" [dataSource]="dataManager" [fields]="fields"></ejs-combobox>
```

---

### readonly
**Type:** `boolean`  
**Default:** `false`

When set to `true`, the user interactions on the component are disabled.

```html
<ejs-combobox [readonly]="true"></ejs-combobox>
```

---

### showClearButton
**Type:** `boolean`  
**Default:** `true`

Specifies whether to show or hide the clear button. When the clear button is clicked, `value`, `text`, and `index` properties are reset to `null`.

```html
<ejs-combobox [showClearButton]="false"></ejs-combobox>
```

---

### sortOrder
**Type:** `SortOrder`  
**Default:** `null`

Specifies the `sortOrder` to sort the data source. Options:
- `None` — The data source is not sorted.
- `Ascending` — The data source is sorted in ascending order.
- `Descending` — The data source is sorted in descending order.

```html
<ejs-combobox sortOrder="Ascending"></ejs-combobox>
```

---

### text
**Type:** `string | null`  
**Default:** `null`

Gets or sets the display text of the selected item in the component.

```html
<ejs-combobox text="Angular"></ejs-combobox>
```

---

### value
**Type:** `number | string | boolean | object | null`  
**Default:** `null`

Gets or sets the value of the selected item in the component.

```typescript
selectedValue = 'Game3';
```

```html
<ejs-combobox [(value)]="selectedValue" [dataSource]="dataSource" [fields]="fields"></ejs-combobox>
```

---

### width
**Type:** `string | number`  
**Default:** `'100%'`

Specifies the width of the component. By default, the component width is set based on the width of its parent container.

```html
<ejs-combobox width="400px"></ejs-combobox>
```

---

### zIndex
**Type:** `number`  
**Default:** `1000`

Specifies the z-index value of the component popup element.

```html
<ejs-combobox [zIndex]="2000"></ejs-combobox>
```

---

## Methods

### addItem
Adds a new item to the ComboBox popup list. By default, new items are appended to the list as the last item, but you can insert at a specific index.

**Signature:**
```typescript
addItem(items: { [key: string]: Object }[] | { [key: string]: Object } | string | boolean | number | string[] | boolean[] | number[], itemIndex?: number): void
```

**Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `items` | `{ [key: string]: Object }[] \| string \| boolean \| number \| string[] \| boolean[] \| number[]` | Specifies an array of JSON data or a JSON data object. |
| `itemIndex` | `number` (optional) | Specifies the index to place the newly added item in the popup list. |

**Example:**
```typescript
// Append to end
this.combobox.addItem({ id: 5, text: 'Vue' });

// Insert at specific index
this.combobox.addItem({ id: 6, text: 'Svelte' }, 0);
```

---

### clear
Allows you to clear the selected value from the component.

**Signature:**
```typescript
clear(): void
```

**Example:**
```typescript
this.combobox.clear();
```

---

### destroy
Removes the component from the DOM and detaches all its related event handlers, attributes, and classes.

**Signature:**
```typescript
destroy(): void
```

**Example:**
```typescript
ngOnDestroy() {
  this.combobox.destroy();
}
```

---

### disableItem
Disables a specific item in the popup list.

**Signature:**
```typescript
disableItem(item: string | number | object | HTMLLIElement): void
```

**Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `item` | `string \| number \| object \| HTMLLIElement` | Specifies the item to be disabled. |

**Example:**
```typescript
// Disable by value
this.combobox.disableItem('Game3');

// Disable by object
this.combobox.disableItem({ id: 'Game3', text: 'Basketball' });
```

---

### filter
Filters the data from a given data source by using a query.

**Signature:**
```typescript
filter(dataSource: { [key: string]: Object }[] | DataManager | string[] | number[] | boolean[], query?: Query, fields?: FieldSettingsModel): void
```

**Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `dataSource` | `{ [key: string]: Object }[] \| DataManager \| string[] \| number[] \| boolean[]` | Set the data source to filter. |
| `query` | `Query` (optional) | Specify the query to filter the data. |
| `fields` | `FieldSettingsModel` (optional) | Specify the fields to map the column in the data table. |

**Example:**
```typescript
onFilter(args: FilteringEventArgs): void {
  const query = new Query().where('text', 'contains', args.text, true);
  this.combobox.filter(this.dataSource, query, this.fields);
}
```

---

### focusIn
Sets the focus to the component for interaction.

**Signature:**
```typescript
focusIn(): void
```

**Example:**
```typescript
this.combobox.focusIn();
```

---

### focusOut
Moves the focus from the component if the component is already focused.

**Signature:**
```typescript
focusOut(): void
```

**Example:**
```typescript
this.combobox.focusOut();
```

---

### getDataByValue
Gets the data Object that matches the given value.

**Signature:**
```typescript
getDataByValue(value: string | number | boolean): { [key: string]: Object } | string | number | boolean
```

**Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `value` | `string \| number \| boolean` | Specifies the value of the list item. |

**Returns:** `{ [key: string]: Object } | string | number | boolean`

**Example:**
```typescript
const data = this.combobox.getDataByValue('Game3');
console.log(data); // { id: 'Game3', text: 'Basketball' }
```

---

### getItems
Gets all the list items bound on this component.

**Signature:**
```typescript
getItems(): Element[]
```

**Returns:** `Element[]`

**Example:**
```typescript
const items = this.combobox.getItems();
console.log('Total items:', items.length);
```

---

### hidePopup
Hides the popup if it is in an open state.

**Signature:**
```typescript
hidePopup(): void
```

**Example:**
```typescript
this.combobox.hidePopup();
```

---

### hideSpinner
Hides the spinner loader.

**Signature:**
```typescript
hideSpinner(): void
```

**Example:**
```typescript
this.combobox.hideSpinner();
```

---

### showPopup
Opens the popup that displays the list of items.

**Signature:**
```typescript
showPopup(): void
```

**Example:**
```typescript
this.combobox.showPopup();
```

---

### showSpinner
Shows the spinner loader.

**Signature:**
```typescript
showSpinner(): void
```

**Example:**
```typescript
this.combobox.showSpinner();
```

---

## Events

### actionBegin
**Type:** `EmitType<Object>`

Triggers before fetching data from the remote server.

```html
<ejs-combobox (actionBegin)="onActionBegin($event)"></ejs-combobox>
```

```typescript
onActionBegin(args: any): void {
  console.log('Data fetch started');
}
```

---

### actionComplete
**Type:** `EmitType<Object>`

Triggers after data is fetched successfully from the remote server.

```html
<ejs-combobox (actionComplete)="onActionComplete($event)"></ejs-combobox>
```

```typescript
onActionComplete(args: any): void {
  console.log('Data fetch completed');
}
```

---

### actionFailure
**Type:** `EmitType<Object>`

Triggers when the data fetch request from the remote server fails.

```html
<ejs-combobox (actionFailure)="onActionFailure($event)"></ejs-combobox>
```

```typescript
onActionFailure(args: any): void {
  console.error('Data fetch failed:', args);
}
```

---

### beforeOpen
**Type:** `EmitType<Object>`

Triggers when the popup is about to open (before animation begins).

```html
<ejs-combobox (beforeOpen)="onBeforeOpen($event)"></ejs-combobox>
```

```typescript
onBeforeOpen(args: any): void {
  console.log('Popup about to open');
}
```

---

### blur
**Type:** `EmitType<Object>`

Triggers when focus moves out from the component.

```html
<ejs-combobox (blur)="onBlur($event)"></ejs-combobox>
```

```typescript
onBlur(args: any): void {
  console.log('ComboBox lost focus');
}
```

---

### change
**Type:** `EmitType<ChangeEventArgs>`

Triggers when an item in the popup is selected or when the model value is changed by the user.

```html
<ejs-combobox (change)="onChange($event)"></ejs-combobox>
```

```typescript
onChange(args: ChangeEventArgs): void {
  console.log('Selected value:', args.value);
  console.log('Selected text:', args.itemData);
}
```

---

### close
**Type:** `EmitType<PopupEventArgs>`

Triggers when the popup is closed.

```html
<ejs-combobox (close)="onClose($event)"></ejs-combobox>
```

```typescript
onClose(args: PopupEventArgs): void {
  console.log('Popup closed');
}
```

---

### created
**Type:** `EmitType<Object>`

Triggers when the component is created.

```html
<ejs-combobox (created)="onCreated($event)"></ejs-combobox>
```

```typescript
onCreated(args: any): void {
  console.log('ComboBox component created');
}
```

---

### customValueSpecifier
**Type:** `EmitType<CustomValueSpecifierEventArgs>`

Triggers when a custom value (not present in the data source) is set on the component. Use this event to assign proper `value` and `text` for the custom entry.

```html
<ejs-combobox [allowCustom]="true" (customValueSpecifier)="onCustomValue($event)"></ejs-combobox>
```

```typescript
onCustomValue(args: CustomValueSpecifierEventArgs): void {
  console.log('Custom value entered:', args.text);
  // Assign value for the custom entry
  args.item = { id: args.text, text: args.text };
}
```

---

### dataBound
**Type:** `EmitType<Object>`

Triggers when the data source is populated in the popup list.

```html
<ejs-combobox (dataBound)="onDataBound($event)"></ejs-combobox>
```

```typescript
onDataBound(args: any): void {
  console.log('Data bound to ComboBox');
}
```

---

### destroyed
**Type:** `EmitType<Object>`

Triggers when the component is destroyed.

```html
<ejs-combobox (destroyed)="onDestroyed($event)"></ejs-combobox>
```

```typescript
onDestroyed(args: any): void {
  console.log('ComboBox component destroyed');
}
```

---

### filtering
**Type:** `EmitType<FilteringEventArgs>`

Triggers on typing a character in the component. Use this event to apply custom filtering logic, especially for remote data.

```html
<ejs-combobox [allowFiltering]="true" (filtering)="onFilter($event)"></ejs-combobox>
```

```typescript
onFilter(args: FilteringEventArgs): void {
  const query = new Query().where('text', 'contains', args.text, true);
  args.updateData(this.dataSource, query);
}
```

---

### focus
**Type:** `EmitType<Object>`

Triggers when the component is focused.

```html
<ejs-combobox (focus)="onFocus($event)"></ejs-combobox>
```

```typescript
onFocus(args: any): void {
  console.log('ComboBox focused');
}
```

---

### open
**Type:** `EmitType<PopupEventArgs>`

Triggers when the popup opens.

```html
<ejs-combobox (open)="onOpen($event)"></ejs-combobox>
```

```typescript
onOpen(args: PopupEventArgs): void {
  console.log('Popup opened');
}
```

---

### resizeStart
**Type:** `EmitType<Object>`

Triggers when the user starts resizing the ComboBox popup (requires `allowResize: true`).

```html
<ejs-combobox [allowResize]="true" (resizeStart)="onResizeStart($event)"></ejs-combobox>
```

```typescript
onResizeStart(args: any): void {
  console.log('Popup resize started');
}
```

---

### resizeStop
**Type:** `EmitType<Object>`

Triggers when the user finishes resizing the ComboBox popup.

```html
<ejs-combobox [allowResize]="true" (resizeStop)="onResizeStop($event)"></ejs-combobox>
```

```typescript
onResizeStop(args: any): void {
  console.log('Popup resize stopped');
}
```

---

### resizing
**Type:** `EmitType<Object>`

Triggers continuously while the ComboBox popup is being resized by the user. This event provides live updates on the width and height of the popup.

```html
<ejs-combobox [allowResize]="true" (resizing)="onResizing($event)"></ejs-combobox>
```

```typescript
onResizing(args: any): void {
  console.log('Resizing popup - current size:', args);
}
```

---

### select
**Type:** `EmitType<SelectEventArgs>`

Triggers when an item in the popup is selected by the user either with mouse/tap or with keyboard navigation.

```html
<ejs-combobox (select)="onSelect($event)"></ejs-combobox>
```

```typescript
onSelect(args: SelectEventArgs): void {
  console.log('Item selected:', args.itemData);
  // Cancel selection: args.cancel = true;
}
```

---

## Notes

- **Template syntax:** Angular uses `ng-template` with `#templateRef` for all template properties. Bind them using `[itemTemplate]="templateRef"` syntax.
- **Two-way binding:** Use `[(value)]="selectedValue"` for two-way data binding of the selected value.
- **Custom values:** When `allowCustom` is `true` (default), users can type values not present in the data source. Use the `customValueSpecifier` event to handle and assign metadata to these custom entries.
- **Virtual scrolling:** Enabled via the `enableVirtualization` property. **Requires** importing `VirtualScroll` from `@syncfusion/ej2-angular-dropdowns` and calling `ComboBoxComponent.Inject(VirtualScroll)` before the component class definition. Use `ComboBoxModule` in the component's `imports` array.
- **Event argument types** such as `ChangeEventArgs`, `SelectEventArgs`, `FilteringEventArgs`, `PopupEventArgs`, and `CustomValueSpecifierEventArgs` are available from `@syncfusion/ej2-angular-dropdowns`.
- **ViewChild access:** Use `@ViewChild('combobox') combobox: ComboBoxComponent` to call methods programmatically.

---

## Official References

- **Syncfusion Angular ComboBox API:** https://ej2.syncfusion.com/angular/documentation/api/combo-box/index-default
- **ComboBox Overview:** https://ej2.syncfusion.com/angular/documentation/combo-box/getting-started
- **GitHub Repository:** https://github.com/syncfusion/ej2-angular-ui-components
- **NPM Package:** https://www.npmjs.com/package/@syncfusion/ej2-angular-dropdowns
