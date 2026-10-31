# MultiSelectComponent API Reference

> **Official Documentation:** [Syncfusion Angular MultiSelect API](https://ej2.syncfusion.com/angular/documentation/api/multi-select/index-default)

This document provides a comprehensive reference for the Syncfusion Angular MultiSelect component API, including all properties, methods, and events.

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)

---

## Properties

### actionFailureTemplate
**Type:** `any`  
**Default:** `'Request failed'`

Accepts the template and assigns it to the popup list content of the MultiSelect component when the data fetch request from the remote server fails.

```html
<ejs-multiselect actionFailureTemplate="<span>Failed to load data</span>"></ejs-multiselect>
```

---

### addTagOnBlur
**Type:** `boolean`  
**Default:** `false`

By default, the typed value is converted into a chip or updated as the component value when the Enter key is pressed or an item is selected from the popup. When enabled, the typed value is converted into a chip or updated as the component value on focus-out. If `allowCustomValue` is enabled, both custom values and list values are converted into tags on blur.

```html
<ejs-multiselect [addTagOnBlur]="true"></ejs-multiselect>
```

---

### allowCustomValue
**Type:** `boolean`  
**Default:** `false`

Allows users to add a custom value — a value not present in the suggestion list.

```html
<ejs-multiselect [allowCustomValue]="true"></ejs-multiselect>
```

---

### allowFiltering
**Type:** `boolean`  
**Default:** `null`

Enables the filtering option in the component. Filter action performs when the user types in the search box and collects matched items through the `filtering` event. If the search character does not match, the `noRecordsTemplate` value is shown.

```html
<ejs-multiselect [allowFiltering]="true" (filtering)="onFilter($event)"></ejs-multiselect>
```

---

### allowObjectBinding
**Type:** `boolean`  
**Default:** `false`

Defines whether object binding is allowed in the component. When enabled, full objects are used as values instead of primitives.

```html
<ejs-multiselect [allowObjectBinding]="true"></ejs-multiselect>
```

---

### allowResize
**Type:** `boolean`  
**Default:** `false`

Gets or sets a value that indicates whether the MultiSelect popup can be resized. When set to `true`, a resize handle appears in the bottom-right corner of the popup, allowing the user to resize the width and height of the popup.

```html
<ejs-multiselect [allowResize]="true"></ejs-multiselect>
```

---

### changeOnBlur
**Type:** `boolean`  
**Default:** `true`

By default, the MultiSelect component fires the `change` event on focus-out. If you want to fire the `change` event on every value selection and removal, disable this property.

```html
<ejs-multiselect [changeOnBlur]="false"></ejs-multiselect>
```

---

### closePopupOnSelect
**Type:** `boolean`  
**Default:** `true`

Controls popup visibility state when an item is selected.

```html
<ejs-multiselect [closePopupOnSelect]="false"></ejs-multiselect>
```

---

### cssClass
**Type:** `string`  
**Default:** `null`

Sets custom CSS classes on the root element to help customize the complete styles.

```html
<ejs-multiselect cssClass="custom-multiselect dark-theme"></ejs-multiselect>
```

---

### dataSource
**Type:** `{ [key: string]: Object }[] | DataManager | string[] | number[] | boolean[]`  
**Default:** `[]`

Accepts list items either through local array or remote `DataManager` service and binds them to the MultiSelect component.

```typescript
// Local array
dataSource = [
  { id: 1, name: 'Angular' },
  { id: 2, name: 'React' }
];

// Remote DataManager
dataSource = new DataManager({ url: 'url' });
```

---

### debounceDelay
**Type:** `number`  
**Default:** `300`

Specifies the delay time in milliseconds for filtering operations.

```html
<ejs-multiselect [debounceDelay]="500"></ejs-multiselect>
```

---

### delimiterChar
**Type:** `string`  
**Default:** `','`

Sets the delimiter character for `Default` and `Delimiter` visibility modes.

```html
<ejs-multiselect delimiterChar=";"></ejs-multiselect>
```

---

### enableGroupCheckBox
**Type:** `boolean`  
**Default:** `false`

Specifies whether grouped list items are allowed to be checked by checking the group header in checkbox mode. When enabled, renders a checkbox for group headers to select/deselect all grouped items at once.

```html
<ejs-multiselect mode="CheckBox" [enableGroupCheckBox]="true"></ejs-multiselect>
```

---

### enableHtmlSanitizer
**Type:** `boolean`  
**Default:** `true`

Defines whether to allow cross-site scripting or not (HTML sanitization).

```html
<ejs-multiselect [enableHtmlSanitizer]="false"></ejs-multiselect>
```

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Enables or disables persisting the MultiSelect component's `value` state between page reloads.

```html
<ejs-multiselect [enablePersistence]="true"></ejs-multiselect>
```

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Enables or disables rendering the component in right-to-left direction.

```html
<ejs-multiselect [enableRtl]="true"></ejs-multiselect>
```

---

### enableSelectionOrder
**Type:** `boolean`  
**Default:** `true`

Reorders the selected items in the popup visibility state.

```html
<ejs-multiselect [enableSelectionOrder]="false"></ejs-multiselect>
```

---

### enableVirtualization
**Type:** `boolean`  
**Default:** `false`

Defines whether to enable virtual scrolling in the component for improved performance with large datasets.

```html
<ejs-multiselect [enableVirtualization]="true"></ejs-multiselect>
```

---

### enabled
**Type:** `boolean`  
**Default:** `true`

Specifies a value that indicates whether the MultiSelect component is enabled or not.

```html
<ejs-multiselect [enabled]="false"></ejs-multiselect>
```

---

### fields
**Type:** `FieldSettingsModel`  
**Default:** `{ text: null, value: null, iconCss: null, groupBy: null }`

The `fields` property maps the columns of the data table and binds the data to the component. Key sub-properties:
- `text` — Maps the text column for display.
- `value` — Maps the value column for each list item.
- `iconCss` — Maps the icon class column.
- `groupBy` — Groups list items with related items.
- `disabled` — Maps the column for disabling specific items.

```typescript
fields = { text: 'ContactName', value: 'CustomerID', groupBy: 'Country' };
```

```html
<ejs-multiselect [fields]="fields" [dataSource]="dataSource"></ejs-multiselect>
```

---

### filterBarPlaceholder
**Type:** `string`  
**Default:** `null`

Accepts the value to be displayed as watermark text on the filter bar.

```html
<ejs-multiselect filterBarPlaceholder="Search items..."></ejs-multiselect>
```

---

### filterType
**Type:** `FilterType`  
**Default:** `'StartsWith'`

Determines the filter type for the MultiSelect component during search. Options:

| FilterType | Description | Supported Types |
|---|---|---|
| `StartsWith` | Checks whether a value begins with the specified value. | String |
| `EndsWith` | Checks whether a value ends with the specified value. | String |
| `Contains` | Checks whether a value contains the specified value. | String |

```html
<ejs-multiselect filterType="Contains" [allowFiltering]="true"></ejs-multiselect>
```

---

### floatLabelType
**Type:** `FloatLabelType`  
**Default:** `Never`

Specifies whether to display the floating label above the input element. Options:
- `Never` — The label will never float when placeholder is available.
- `Always` — The floating label will always float above the input.
- `Auto` — The floating label will float above the input after focusing or entering a value.

```html
<ejs-multiselect floatLabelType="Auto" placeholder="Select items"></ejs-multiselect>
```

---

### footerTemplate
**Type:** `any`  
**Default:** `null`

Accepts the template design and assigns it to the footer container of the popup list.

```html
<ejs-multiselect [footerTemplate]="footerTemplate"></ejs-multiselect>
```

---

### groupTemplate
**Type:** `any`  
**Default:** `null`

Accepts the template design and assigns it to the group headers present in the MultiSelect popup list.

```html
<ejs-multiselect [groupTemplate]="groupTemplate"></ejs-multiselect>
```

---

### headerTemplate
**Type:** `any`  
**Default:** `null`

Accepts the template design and assigns it to the header container of the popup list.

```html
<ejs-multiselect [headerTemplate]="headerTemplate"></ejs-multiselect>
```

---

### hideSelectedItem
**Type:** `boolean`  
**Default:** `true`

When `true`, hides the selected item from the list in the popup.

```html
<ejs-multiselect [hideSelectedItem]="false"></ejs-multiselect>
```

---

### htmlAttributes
**Type:** `{ [key: string]: string }`  
**Default:** `{}`

Gets or sets additional HTML attributes (e.g., `name`, `title`) on the MultiSelect input element as key-value pairs.

```typescript
htmlAttributes = { name: 'country', title: 'MultiSelect DropDown' };
```

```html
<ejs-multiselect [htmlAttributes]="htmlAttributes"></ejs-multiselect>
```

---

### ignoreAccent
**Type:** `boolean`  
**Default:** `false`

When `true`, ignores diacritic characters or accents during filtering.

```html
<ejs-multiselect [ignoreAccent]="true"></ejs-multiselect>
```

---

### ignoreCase
**Type:** `boolean`  
**Default:** `true`

Sets case-sensitive option for the filter operation. When `true`, filtering is case-insensitive.

```html
<ejs-multiselect [ignoreCase]="false"></ejs-multiselect>
```

---

### isDeviceFullScreen
**Type:** `boolean`  
**Default:** `true`

Defines whether the popup opens in fullscreen mode on mobile devices when filtering is enabled. When set to `false`, the popup displays similarly on both mobile and desktop.

```html
<ejs-multiselect [isDeviceFullScreen]="false"></ejs-multiselect>
```

---

### itemTemplate
**Type:** `any`  
**Default:** `null`

Accepts the template design and assigns it to each list item present in the popup.

```html
<ejs-multiselect [itemTemplate]="itemTemplate"></ejs-multiselect>
```

---

### locale
**Type:** `string`  
**Default:** `'en-US'`

Overrides the global culture and localization value for this component.

```html
<ejs-multiselect locale="de"></ejs-multiselect>
```

---

### maximumSelectionLength
**Type:** `number`  
**Default:** `1000`

Sets a limit on the number of items that can be selected. List selection is prevented once the limit is reached.

```html
<ejs-multiselect [maximumSelectionLength]="5"></ejs-multiselect>
```

---

### mode
**Type:** `visualMode`  
**Default:** `'Default'`

Configures the visibility mode for component interaction. Options:
- `Box` — Selected items are visualized as chips.
- `Delimiter` — Selected items are visualized as delimited text.
- `Default` — On focus-in acts in `Box` mode; on blur acts in `Delimiter` mode.
- `CheckBox` — Checkboxes are visualized in list items.

```html
<ejs-multiselect mode="CheckBox"></ejs-multiselect>
```

---

### noRecordsTemplate
**Type:** `any`  
**Default:** `'No records found'`

Accepts the template design and assigns it to the popup list when no data is available.

```html
<ejs-multiselect noRecordsTemplate="<span>No items found</span>"></ejs-multiselect>
```

---

### openOnClick
**Type:** `boolean`  
**Default:** `true`

Whether to automatically open the popup when the control is clicked.

```html
<ejs-multiselect [openOnClick]="false"></ejs-multiselect>
```

---

### placeholder
**Type:** `string`  
**Default:** `null`

Gets or sets the placeholder in the component to display the given information in the input when no item is selected.

```html
<ejs-multiselect placeholder="Select items..."></ejs-multiselect>
```

---

### popupHeight
**Type:** `string | number`  
**Default:** `'300px'`

Gets or sets the height of the popup list. By default it renders based on its list items.

```html
<ejs-multiselect popupHeight="400px"></ejs-multiselect>
```

---

### popupWidth
**Type:** `string | number`  
**Default:** `'100%'`

Gets or sets the width of the popup list. Percentage values are calculated based on input width.

```html
<ejs-multiselect popupWidth="300px"></ejs-multiselect>
```

---

### query
**Type:** `Query`  
**Default:** `null`

Accepts an external `Query` object that executes along with data processing in the MultiSelect.

```typescript
query = new Query().from('Customers').select(['ContactName', 'CustomerID']).take(10);
```

```html
<ejs-multiselect [query]="query" [dataSource]="dataManager"></ejs-multiselect>
```

---

### readonly
**Type:** `boolean`  
**Default:** `false`

Gets or sets the `readonly` state of the input. When enabled, you can only copy or highlight text; Tab key action will perform.

```html
<ejs-multiselect [readonly]="true"></ejs-multiselect>
```

---

### selectAllText
**Type:** `string`  
**Default:** `'select All'`

Specifies the text to be displayed for the "Select All" option on the component.

```html
<ejs-multiselect selectAllText="Select All Items"></ejs-multiselect>
```

---

### showClearButton
**Type:** `boolean`  
**Default:** `true`

Enables a close/remove icon on each selected chip item.

```html
<ejs-multiselect [showClearButton]="false"></ejs-multiselect>
```

---

### showDropDownIcon
**Type:** `boolean`  
**Default:** `false`

Allows you to either show or hide the dropdown arrow button on the component.

```html
<ejs-multiselect [showDropDownIcon]="true"></ejs-multiselect>
```

---

### showSelectAll
**Type:** `boolean`  
**Default:** `false`

Allows you to either show or hide the "Select All" option on the component.

```html
<ejs-multiselect [showSelectAll]="true" mode="CheckBox"></ejs-multiselect>
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
<ejs-multiselect sortOrder="Ascending"></ejs-multiselect>
```

---

### text
**Type:** `string | null`  
**Default:** `null`

Selects the list item which maps the data `text` field in the component.

```html
<ejs-multiselect text="Angular"></ejs-multiselect>
```

---

### unSelectAllText
**Type:** `string`  
**Default:** `'select All'`

Specifies the text to be displayed for the "Unselect All" option on the component.

```html
<ejs-multiselect unSelectAllText="Unselect All Items"></ejs-multiselect>
```

---

### value
**Type:** `number[] | string[] | boolean[] | object[] | null`  
**Default:** `null`

Selects the list items which map the data `value` field in the component.

```typescript
value = ['CM', 'AU'];
```

```html
<ejs-multiselect [(value)]="value" [fields]="fields" [dataSource]="dataSource"></ejs-multiselect>
```

---

### valueTemplate
**Type:** `any`  
**Default:** `null`

Accepts the template design and assigns it to the selected list item chip displayed in the input element.

```html
<ejs-multiselect [valueTemplate]="valueTemplate"></ejs-multiselect>
```

---

### width
**Type:** `string | number`  
**Default:** `'100%'`

Gets or sets the width of the component. By default, it sizes based on its parent container dimension.

```html
<ejs-multiselect width="400px"></ejs-multiselect>
```

---

### zIndex
**Type:** `number`  
**Default:** `1000`

Specifies the z-index value of the component popup element.

```html
<ejs-multiselect [zIndex]="2000"></ejs-multiselect>
```

---

## Methods

### addItem
Adds a new item to the MultiSelect popup list. By default, the new item is appended to the list as the last item, but you can insert it at a specific index.

**Signature:**
```typescript
addItem(items: { [key: string]: Object }[] | { [key: string]: Object } | string | boolean | number | string[] | boolean[] | number[], itemIndex?: number): void
```

**Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `items` | `{ [key: string]: Object }[] \| string \| boolean \| number \| string[] \| boolean[] \| number[]` | JSON data or array to add. |
| `itemIndex` | `number` (optional) | Index at which to insert the new item in the popup list. |

**Example:**
```typescript
// Append to end
this.multiselect.addItem({ id: 5, name: 'Vue' });

// Insert at specific index
this.multiselect.addItem({ id: 6, name: 'Svelte' }, 0);
```

---

### clear
Allows you to clear all selected values from the MultiSelect component.

**Signature:**
```typescript
clear(): void
```

**Example:**
```typescript
this.multiselect.clear();
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
  this.multiselect.destroy();
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
| `item` | `string \| number \| object \| HTMLLIElement` | The item to disable. |

**Example:**
```typescript
// Disable by value
this.multiselect.disableItem('AU');

// Disable by object
this.multiselect.disableItem({ id: 2, name: 'React' });
```

---

### filter
Filters the MultiSelect data from a given data source by using a query.

**Signature:**
```typescript
filter(dataSource: { [key: string]: Object }[] | DataManager | string[] | number[] | boolean[], query?: Query, fields?: FieldSettingsModel): void
```

**Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `dataSource` | `{ [key: string]: Object }[] \| DataManager \| string[] \| number[] \| boolean[]` | Data source to filter. |
| `query` | `Query` (optional) | Query to filter the data. |
| `fields` | `FieldSettingsModel` (optional) | Field mappings for the data table. |

**Example:**
```typescript
onFilter(args: FilteringEventArgs): void {
  const query = new Query().where('name', 'contains', args.text, true);
  this.multiselect.filter(this.dataSource, query, this.fields);
}
```

---

### focusIn
Sets the focus to the widget for interaction.

**Signature:**
```typescript
focusIn(): void
```

**Example:**
```typescript
this.multiselect.focusIn();
```

---

### focusOut
Removes focus from the widget if it is currently in focus state.

**Signature:**
```typescript
focusOut(): void
```

**Example:**
```typescript
this.multiselect.focusOut();
```

---

### getDataByValue
Gets the data object that matches the given value.

**Signature:**
```typescript
getDataByValue(value: string | number | boolean | object): { [key: string]: Object } | string | number | boolean
```

**Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `value` | `string \| number \| boolean \| object` | Value of the list item. |

**Returns:** `{ [key: string]: Object } | string | number | boolean`

**Example:**
```typescript
const data = this.multiselect.getDataByValue('AU');
console.log(data); // { id: 1, name: 'Australia', code: 'AU' }
```

---

### hidePopup
Hides the popup if it is currently in an open state.

**Signature:**
```typescript
hidePopup(e?: MouseEvent | KeyboardEventArgs): void
```

**Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `e` | `MouseEvent \| KeyboardEventArgs` (optional) | Mouse or keyboard event. |

**Example:**
```typescript
this.multiselect.hidePopup();
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
this.multiselect.hideSpinner();
```

---

### selectAll
Selects or deselects all list items based on the `state` parameter.

**Signature:**
```typescript
selectAll(state: boolean): void
```

**Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `state` | `boolean` | `true` to select all items; `false` to deselect all items. |

**Example:**
```typescript
// Select all
this.multiselect.selectAll(true);

// Deselect all
this.multiselect.selectAll(false);
```

---

### showPopup
Shows the popup if it is currently in a closed state.

**Signature:**
```typescript
showPopup(e?: MouseEvent | KeyboardEventArgs | TouchEvent): void
```

**Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `e` | `MouseEvent \| KeyboardEventArgs \| TouchEvent` (optional) | Mouse, keyboard, or touch event. |

**Example:**
```typescript
this.multiselect.showPopup();
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
this.multiselect.showSpinner();
```

---

## Events

### actionBegin
**Type:** `EmitType<Object>`

Triggers before fetching data from the remote server.

```html
<ejs-multiselect (actionBegin)="onActionBegin($event)"></ejs-multiselect>
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
<ejs-multiselect (actionComplete)="onActionComplete($event)"></ejs-multiselect>
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
<ejs-multiselect (actionFailure)="onActionFailure($event)"></ejs-multiselect>
```

```typescript
onActionFailure(args: any): void {
  console.error('Data fetch failed:', args);
}
```

---

### beforeOpen
**Type:** `EmitType<Object>`

Fires when the popup opens before animation begins.

```html
<ejs-multiselect (beforeOpen)="onBeforeOpen($event)"></ejs-multiselect>
```

```typescript
onBeforeOpen(args: any): void {
  console.log('Popup about to open');
}
```

---

### beforeSelectAll
**Type:** `EmitType<ISelectAllEventArgs>`

Fires before the select-all process executes.

```html
<ejs-multiselect (beforeSelectAll)="onBeforeSelectAll($event)"></ejs-multiselect>
```

```typescript
onBeforeSelectAll(args: ISelectAllEventArgs): void {
  console.log('Before select all, isChecked:', args.isChecked);
}
```

---

### blur
**Type:** `EmitType<Object>`

Event triggered when the input loses focus.

```html
<ejs-multiselect (blur)="onBlur($event)"></ejs-multiselect>
```

```typescript
onBlur(args: any): void {
  console.log('MultiSelect lost focus');
}
```

---

### change
**Type:** `EmitType<MultiSelectChangeEventArgs>`

Fires each time selection changes in list items after the model and input value are updated.

```html
<ejs-multiselect (change)="onChange($event)"></ejs-multiselect>
```

```typescript
onChange(args: MultiSelectChangeEventArgs): void {
  console.log('Selected values:', args.value);
  console.log('Old value:', args.oldValue);
}
```

---

### chipSelection
**Type:** `EmitType<Object>`

Event triggered when a chip (selected item tag) is selected.

```html
<ejs-multiselect (chipSelection)="onChipSelection($event)"></ejs-multiselect>
```

```typescript
onChipSelection(args: any): void {
  console.log('Chip selected');
}
```

---

### close
**Type:** `EmitType<PopupEventArgs>`

Fires when the popup closes after animation completion.

```html
<ejs-multiselect (close)="onClose($event)"></ejs-multiselect>
```

```typescript
onClose(args: PopupEventArgs): void {
  console.log('Popup closed');
}
```

---

### created
**Type:** `EmitType<Object>`

Triggered when the component is created.

```html
<ejs-multiselect (created)="onCreated($event)"></ejs-multiselect>
```

```typescript
onCreated(args: any): void {
  console.log('MultiSelect component created');
}
```

---

### customValueSelection
**Type:** `EmitType<CustomValueEventArgs>`

Triggered when a custom value (not present in the list) is selected via `allowCustomValue`.

```html
<ejs-multiselect [allowCustomValue]="true" (customValueSelection)="onCustomValue($event)"></ejs-multiselect>
```

```typescript
onCustomValue(args: CustomValueEventArgs): void {
  console.log('Custom value selected:', args.text);
}
```

---

### dataBound
**Type:** `EmitType<Object>`

Triggered when the data source is populated in the popup list.

```html
<ejs-multiselect (dataBound)="onDataBound($event)"></ejs-multiselect>
```

```typescript
onDataBound(args: any): void {
  console.log('Data bound to MultiSelect');
}
```

---

### destroyed
**Type:** `EmitType<Object>`

Triggered when the component is destroyed.

```html
<ejs-multiselect (destroyed)="onDestroyed($event)"></ejs-multiselect>
```

```typescript
onDestroyed(args: any): void {
  console.log('MultiSelect component destroyed');
}
```

---

### filtering
**Type:** `EmitType<FilteringEventArgs>`

Triggered when the user types in the search box. Use this event to apply custom filtering logic, especially for remote data.

```html
<ejs-multiselect [allowFiltering]="true" (filtering)="onFilter($event)"></ejs-multiselect>
```

```typescript
onFilter(args: FilteringEventArgs): void {
  const query = new Query().where('name', 'contains', args.text, true);
  args.updateData(this.dataSource, query);
}
```

---

### focus
**Type:** `EmitType<Object>`

Event triggered when the input receives focus.

```html
<ejs-multiselect (focus)="onFocus($event)"></ejs-multiselect>
```

```typescript
onFocus(args: any): void {
  console.log('MultiSelect focused');
}
```

---

### open
**Type:** `EmitType<PopupEventArgs>`

Fires when the popup opens after animation completion.

```html
<ejs-multiselect (open)="onOpen($event)"></ejs-multiselect>
```

```typescript
onOpen(args: PopupEventArgs): void {
  console.log('Popup opened');
}
```

---

### removed
**Type:** `EmitType<RemoveEventArgs>`

Fires after a selected item is removed from the widget.

```html
<ejs-multiselect (removed)="onRemoved($event)"></ejs-multiselect>
```

```typescript
onRemoved(args: RemoveEventArgs): void {
  console.log('Item removed:', args.itemData);
}
```

---

### removing
**Type:** `EmitType<RemoveEventArgs>`

Fires before a selected item is removed from the widget.

```html
<ejs-multiselect (removing)="onRemoving($event)"></ejs-multiselect>
```

```typescript
onRemoving(args: RemoveEventArgs): void {
  console.log('About to remove item:', args.itemData);
  // Cancel removal: args.cancel = true;
}
```

---

### resizeStart
**Type:** `EmitType<Object>`

Triggered when the user starts resizing the MultiSelect popup (requires `allowResize: true`).

```html
<ejs-multiselect [allowResize]="true" (resizeStart)="onResizeStart($event)"></ejs-multiselect>
```

```typescript
onResizeStart(args: any): void {
  console.log('Popup resize started');
}
```

---

### resizeStop
**Type:** `EmitType<Object>`

Triggered when the user finishes resizing the MultiSelect popup.

```html
<ejs-multiselect [allowResize]="true" (resizeStop)="onResizeStop($event)"></ejs-multiselect>
```

```typescript
onResizeStop(args: any): void {
  console.log('Popup resize stopped');
}
```

---

### resizing
**Type:** `EmitType<Object>`

Triggered continuously while the MultiSelect popup is being resized, providing live width/height updates.

```html
<ejs-multiselect [allowResize]="true" (resizing)="onResizing($event)"></ejs-multiselect>
```

```typescript
onResizing(args: any): void {
  console.log('Resizing popup - current size:', args);
}
```

---

### select
**Type:** `EmitType<SelectEventArgs>`

Triggered when an item in the popup is selected by the user via mouse/tap or keyboard navigation.

```html
<ejs-multiselect (select)="onSelect($event)"></ejs-multiselect>
```

```typescript
onSelect(args: SelectEventArgs): void {
  console.log('Item selected:', args.itemData);
  // Cancel selection: args.cancel = true;
}
```

---

### selectedAll
**Type:** `EmitType<ISelectAllEventArgs>`

Fires after the select-all process completes.

```html
<ejs-multiselect (selectedAll)="onSelectedAll($event)"></ejs-multiselect>
```

```typescript
onSelectedAll(args: ISelectAllEventArgs): void {
  console.log('Select all completed, isChecked:', args.isChecked);
}
```

---

### tagging
**Type:** `EmitType<TaggingEventArgs>`

Fires before a selected item is set as a chip in the component. Use this to customize chip content or prevent chip creation.

```html
<ejs-multiselect (tagging)="onTagging($event)"></ejs-multiselect>
```

```typescript
onTagging(args: TaggingEventArgs): void {
  // Customize chip text
  args.setClass('custom-chip-class');
}
```

---

## Notes

- **CheckBoxSelection module:** Must be injected via `providers: [CheckBoxSelectionService]` in the component to use `mode="CheckBox"` and `enableGroupCheckBox`.
- **Virtualization:** Requires importing `VirtualScroll` from `@syncfusion/ej2-angular-dropdowns` and calling `MultiSelectComponent.Inject(VirtualScroll)` at module level before the component renders. Then enable it via the `[enableVirtualization]="true"` property on `<ejs-multiselect>`.

  ```typescript
  import { MultiSelectComponent, VirtualScroll } from '@syncfusion/ej2-angular-dropdowns';
  MultiSelectComponent.Inject(VirtualScroll);
  ```
- **Event argument types** such as `MultiSelectChangeEventArgs`, `SelectEventArgs`, `RemoveEventArgs`, `TaggingEventArgs`, `FilteringEventArgs`, `PopupEventArgs`, `CustomValueEventArgs`, and `ISelectAllEventArgs` are available from `@syncfusion/ej2-angular-dropdowns`.
- **Template syntax:** Angular uses `ng-template` with `#templateRef` for all template properties. Bind them using `[itemTemplate]="templateRef"` syntax.
- **Two-way binding:** Use `[(value)]="selectedValues"` for two-way data binding of the selected values array.

---

## Official References

- **Syncfusion Angular MultiSelect API:** https://ej2.syncfusion.com/angular/documentation/api/multi-select/index-default
- **MultiSelect Overview:** https://ej2.syncfusion.com/angular/documentation/multi-select/getting-started
- **GitHub Repository:** https://github.com/syncfusion/ej2-angular-ui-components
- **NPM Package:** https://www.npmjs.com/package/@syncfusion/ej2-angular-dropdowns
