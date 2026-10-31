# Syncfusion Angular ListBox — API Reference

Complete API reference for the `ListBoxComponent` (`<ejs-listbox>`).

**Official documentation:** https://ej2.syncfusion.com/angular/documentation/api/list-box/

---

## ListBoxComponent

The ListBox allows the user to select values from a predefined list of values.

```html
<ejs-listbox [dataSource]="data"></ejs-listbox>
```

---

## Properties

### allowDragAndDrop
**Type:** `boolean`  
**Default:** `false`

If set to `true`, enables drag-and-drop of list items. Use the `scope` property to allow drag-and-drop between multiple ListBox instances.

```html
<ejs-listbox [dataSource]="data" [allowDragAndDrop]="true" scope="shared"></ejs-listbox>
```

---

### allowFiltering
**Type:** `boolean`  
**Default:** `false`

Enables a filter search box on the component. Filtering is performed when the user types in the search box, collecting matched items via the `filtering` event. If no match is found, the `noRecordsTemplate` value is displayed.

```html
<ejs-listbox [dataSource]="data" [allowFiltering]="true" filterBarPlaceholder="Search items..."></ejs-listbox>
```

---

### cssClass
**Type:** `string`  
**Default:** `''`

Sets CSS class(es) on the root element of the component, enabling full style customization.

```html
<ejs-listbox [dataSource]="data" cssClass="custom-listbox"></ejs-listbox>
```

---

### dataSource
**Type:** `{ [key: string]: Object }[] | DataManager | string[] | number[] | boolean[]`  
**Default:** `[]`

Accepts list items from a local or remote service and binds them to the component. Supports arrays of strings, numbers, booleans, JSON objects, or a `DataManager` instance.

```typescript
// String array
items: string[] = ['Apple', 'Banana', 'Cherry'];

// Object array
items: { [key: string]: Object }[] = [
  { text: 'Apple', id: '1' },
  { text: 'Banana', id: '2' }
];

// Remote DataManager
dataSource: DataManager = new DataManager({ url: 'url' });
```

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Enables or disables persisting the component's state between page reloads. When enabled, the persisted state is `value` (selected values).

```html
<ejs-listbox [dataSource]="data" [enablePersistence]="true"></ejs-listbox>
```

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Enables rendering the component in right-to-left (RTL) direction.

```html
<ejs-listbox [dataSource]="data" [enableRtl]="true"></ejs-listbox>
```

---

### enabled
**Type:** `boolean`  
**Default:** `true`

Specifies whether the component is enabled or disabled.

```html
<ejs-listbox [dataSource]="data" [enabled]="false"></ejs-listbox>
```

---

### fields
**Type:** [`FieldSettingsModel`](#fieldsettingsmodel)  
**Default:** `{ text: null, value: null, iconCss: null, groupBy: null, disabled: null }`

Maps columns from the data table to the component. Supports mapping display text, value, icon CSS class, group key, disabled state, and HTML attributes.

```typescript
fields: FieldSettingsModel = {
  text: 'contactName',
  value: 'customerId',
  groupBy: 'country',
  iconCss: 'icon',
  disabled: 'isDisabled'
};
```

```html
<ejs-listbox [dataSource]="data" [fields]="fields"></ejs-listbox>
```

---

### filterBarPlaceholder
**Type:** `string`  
**Default:** `null`

Sets the watermark/placeholder text displayed inside the filter search bar. Requires `allowFiltering` to be `true`.

```html
<ejs-listbox [dataSource]="data" [allowFiltering]="true" filterBarPlaceholder="Search..."></ejs-listbox>
```

---

### filterType
**Type:** `FilterType`  
**Default:** `'StartsWith'`

Determines the filter type used during search. Supported types:

| FilterType | Description | Supported Data Types |
|---|---|---|
| `StartsWith` | Checks whether a value begins with the specified value | `string` |
| `EndsWith` | Checks whether a value ends with the specified value | `string` |
| `Contains` | Checks whether a value contains the specified value | `string` |

```html
<ejs-listbox [dataSource]="data" [allowFiltering]="true" filterType="Contains"></ejs-listbox>
```

---

### height
**Type:** `number | string`  
**Default:** `''`

Sets the height of the ListBox component. Accepts a number (pixels) or a CSS string (e.g., `'300px'`, `'50%'`).

```html
<ejs-listbox [dataSource]="data" height="300px"></ejs-listbox>
```

---

### itemTemplate
**Type:** `any`  
**Default:** `null`

Accepts a template string or template reference and assigns it to each list item. Supports the built-in template engine with ES6-style expression string literals.

```html
<ejs-listbox [dataSource]="data" [itemTemplate]="itemTemp">
  <ng-template #itemTemp let-data>
    <span class="item-icon {{ data.iconCss }}"></span>
    <span class="item-text">{{ data.text }}</span>
  </ng-template>
</ejs-listbox>
```

---

### locale
**Type:** `string`  
**Default:** `'en-US'`

Overrides the global culture and localization value for this component.

```html
<ejs-listbox [dataSource]="data" locale="fr-FR"></ejs-listbox>
```

---

### maximumSelectionLength
**Type:** `number`  
**Default:** `1000`

Sets a limit on how many items can be selected. When this limit is reached, further selections are prevented.

```html
<ejs-listbox [dataSource]="data" [maximumSelectionLength]="3"></ejs-listbox>
```

---

### noRecordsTemplate
**Type:** `any`  
**Default:** `'No records found'`

Accepts a template string or template reference displayed when no data matches the filter or the data source is empty.

```html
<ejs-listbox [dataSource]="data" [allowFiltering]="true" noRecordsTemplate="<span>No results found</span>">
</ejs-listbox>
```

---

### query
**Type:** `Query`  
**Default:** `null`

Accepts an external `Query` instance that is executed along with data processing, typically used with `DataManager`.

```typescript
import { Query } from '@syncfusion/ej2-data';

query: Query = new Query().from('Customers').select(['ContactName', 'CustomerID']).take(10);
```

```html
<ejs-listbox [dataSource]="dataManager" [query]="query" [fields]="fields"></ejs-listbox>
```

---

### scope
**Type:** `string`  
**Default:** `''`

Defines a scope value to group sets of draggable and droppable ListBox instances. A draggable ListBox with the same scope value will be accepted by the droppable ListBox. Requires `allowDragAndDrop` to be `true`.

```html
<ejs-listbox [dataSource]="source" [allowDragAndDrop]="true" scope="transfer"></ejs-listbox>
<ejs-listbox [dataSource]="target" [allowDragAndDrop]="true" scope="transfer"></ejs-listbox>
```

---

### selectionSettings
**Type:** [`SelectionSettingsModel`](#selectionsettingsmodel)  
**Default:** `{ mode: 'Multiple', type: 'Default' }`

Specifies the selection mode and type. Configure single or multiple selection, checkbox visibility, and whether to show a "select all" option.

```typescript
selectionSettings: SelectionSettingsModel = {
  mode: 'Multiple',
  showCheckbox: true,
  showSelectAll: true,
  checkboxPosition: 'Left'
};
```

```html
<ejs-listbox [dataSource]="data" [selectionSettings]="selectionSettings"></ejs-listbox>
```

---

### sortOrder
**Type:** `SortOrder`  
**Default:** `null`

Specifies the sort order for the data source. Available options:

| Value | Description |
|---|---|
| `None` | Data source is not sorted |
| `Ascending` | Data source is sorted in ascending order |
| `Descending` | Data source is sorted in descending order |

```html
<ejs-listbox [dataSource]="data" sortOrder="Ascending"></ejs-listbox>
```

---

### toolbarSettings
**Type:** [`ToolbarSettingsModel`](#toolbarsettingsmodel)  
**Default:** `{ items: [], position: 'Right' }`

Specifies the toolbar buttons and their position relative to the ListBox. Used in dual-ListBox scenarios for programmatic item transfer.

```typescript
toolbarSettings: ToolbarSettingsModel = {
  items: ['moveUp', 'moveDown', 'moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom'],
  position: 'Right'
};
```

```html
<ejs-listbox [dataSource]="data" [toolbarSettings]="toolbarSettings"></ejs-listbox>
```

---

### value
**Type:** `string[] | number[] | boolean[]`  
**Default:** `[]`

Sets the specified item(s) to the selected state, or retrieves the currently selected item(s) in the ListBox.

```typescript
// Pre-select items by value
selectedValues: string[] = ['item1', 'item3'];
```

```html
<ejs-listbox [dataSource]="data" [value]="selectedValues"></ejs-listbox>
```

---

## Methods

### addItems
Adds one or more new items to the list. By default, the new item is appended to the end of the list. Use the optional `itemIndex` parameter to insert at a specific position.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `items` | `obj[] \| obj` | Specifies an array of JSON data or a single JSON data object to add. |
| `itemIndex` *(optional)* | `number` | Specifies the index position at which to insert the new item(s). |

**Returns:** `void`

```typescript
// Append to the end
this.listBoxObj.addItems([{ text: 'New Item', id: '99' }]);

// Insert at index 2
this.listBoxObj.addItems([{ text: 'Inserted Item', id: '100' }], 2);
```

---

### enableItems
Enables or disables specific items in the ListBox based on the provided text or value array and the `enable` boolean flag.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `items` | `string[]` | Text items that need to be enabled or disabled. |
| `enable` *(optional)* | `boolean` | Set `true` to enable, `false` to disable. Defaults to `true`. |
| `isValue` *(optional)* | `boolean` | Set `true` if the `items` parameter is an array of unique values instead of text labels. |

**Returns:** `void`

```typescript
// Disable items by text
this.listBoxObj.enableItems(['Apple', 'Banana'], false);

// Enable items by value
this.listBoxObj.enableItems(['1', '2'], true, true);
```

---

### filter
Filters the data from the given data source using a query.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `dataSource` | `{ [key: string]: Object }[] \| DataManager \| string[] \| number[] \| boolean[]` | The data source to filter. |
| `query` *(optional)* | `Query` | The query to apply for filtering. |
| `fields` *(optional)* | `FieldSettingsModel` | The field mappings for the data table columns. |

**Returns:** `void`

```typescript
import { Query } from '@syncfusion/ej2-data';

const query = new Query().where('text', 'startswith', 'A', true);
this.listBoxObj.filter(this.dataSource, query, { text: 'text', value: 'id' });
```

---

### getDataByValue
Gets the data object that matches the given value.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `value` | `string \| number \| boolean \| object` | Specifies the value of the list item. |

**Returns:** `{ [key: string]: Object } | string | number | boolean`

```typescript
const item = this.listBoxObj.getDataByValue('item1');
console.log(item); // { text: 'Item 1', id: 'item1' }
```

---

### getDataByValues
Gets an array of data objects that match the given array of values.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `value` | `string[] \| number[] \| boolean[]` | Specifies an array of values to look up. |

**Returns:** `{ [key: string]: Object }[]`

```typescript
const items = this.listBoxObj.getDataByValues(['item1', 'item3']);
console.log(items); // [{ text: 'Item 1', ... }, { text: 'Item 3', ... }]
```

---

### getDataList
Gets the updated (current) data source of the ListBox, reflecting any drag-and-drop reordering or programmatic changes.

**Parameters:** None

**Returns:** `{ [key: string]: Object }[] | string[] | boolean[] | number[]`

```typescript
const currentData = this.listBoxObj.getDataList();
console.log(currentData);
```

---

### getItems
Gets all the list item DOM elements currently bound to this component.

**Parameters:** None

**Returns:** `Element[]`

```typescript
const elements: Element[] = this.listBoxObj.getItems();
console.log(elements.length); // Total number of list items
```

---

### getSortedList
Returns the data in the ListBox in its current sorted order.

**Parameters:** None

**Returns:** `{ [key: string]: Object }[] | string[] | boolean[] | number[]`

```typescript
const sorted = this.listBoxObj.getSortedList();
console.log(sorted);
```

---

### moveAllTo
Moves all values from the current ListBox to the scoped (target) ListBox.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `targetId` *(optional)* | `string` | The element ID of the target scoped ListBox. |
| `index` *(optional)* | `number` | Specifies the index position in the target list where the items will be moved. |

**Returns:** `void`

```typescript
// Move all items to another ListBox with id="targetList"
this.listBoxObj.moveAllTo('targetList');

// Move all items to index 0 in the target list
this.listBoxObj.moveAllTo('targetList', 0);
```

---

### moveBottom
Moves the given value(s) or currently selected item(s) to the bottom of the list.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `value` *(optional)* | `string[] \| number[] \| boolean[]` | Specifies the value(s) to move. Uses the current selection if not provided. |

**Returns:** `void`

```typescript
this.listBoxObj.moveBottom(['item2', 'item3']);
// Or move currently selected items
this.listBoxObj.moveBottom();
```

---

### moveDown
Moves the given value(s) or currently selected item(s) one position downward in the list.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `value` *(optional)* | `string[] \| number[] \| boolean[]` | Specifies the value(s) to move. Uses the current selection if not provided. |

**Returns:** `void`

```typescript
this.listBoxObj.moveDown(['item1']);
```

---

### moveTo
Moves the given value(s) or currently selected item(s) to the specified scoped ListBox.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `value` *(optional)* | `string[] \| number[] \| boolean[]` | Specifies the value(s) to move. Uses the current selection if not provided. |
| `index` *(optional)* | `number` | Specifies the index position in the target list where the items will be inserted. |
| `targetId` *(optional)* | `string` | Specifies the element ID of the target ListBox. |

**Returns:** `void`

```typescript
// Move specific items to a target ListBox at a given index
this.listBoxObj.moveTo(['item1', 'item2'], 0, 'targetList');

// Move currently selected items using default scope target
this.listBoxObj.moveTo();
```

---

### moveTop
Moves the given value(s) or currently selected item(s) to the top of the list.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `value` *(optional)* | `string[] \| number[] \| boolean[]` | Specifies the value(s) to move. Uses the current selection if not provided. |

**Returns:** `void`

```typescript
this.listBoxObj.moveTop(['item3']);
```

---

### moveUp
Moves the given value(s) or currently selected item(s) one position upward in the list.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `value` *(optional)* | `string[] \| number[] \| boolean[]` | Specifies the value(s) to move. Uses the current selection if not provided. |

**Returns:** `void`

```typescript
this.listBoxObj.moveUp(['item2']);
```

---

### removeItem
Removes an item from the list. By default removes the last item, or the item at the specified `itemIndex`.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `items` *(optional)* | `{ [key: string]: Object }[] \| { [key: string]: Object } \| string \| boolean \| number \| string[] \| boolean[] \| number[]` | Specifies an array of JSON data or a single JSON data item to remove. |
| `itemIndex` *(optional)* | `number` | Specifies the index of the item to remove. |

**Returns:** `void`

```typescript
// Remove item by object reference
this.listBoxObj.removeItem({ text: 'Apple', id: '1' });

// Remove by index
this.listBoxObj.removeItem(null, 2);
```

---

### removeItems
Removes one or more items from the list. By default removes the last item, or items at the specified `itemIndex`.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `items` *(optional)* | `obj[] \| obj` | Specifies an array of JSON data or a single JSON data object to remove. |
| `itemIndex` *(optional)* | `number` | Specifies the index to remove the item from the list. |

**Returns:** `void`

```typescript
this.listBoxObj.removeItems([{ text: 'Apple', id: '1' }, { text: 'Banana', id: '2' }]);
```

---

### selectAll
Selects or deselects all list items based on the `state` parameter.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `state` *(optional)* | `boolean` | Set `true` to select all items, `false` to deselect all. |

**Returns:** `void`

```typescript
// Select all
this.listBoxObj.selectAll(true);

// Deselect all
this.listBoxObj.selectAll(false);
```

---

### selectItems
Selects or deselects specified list items based on text values and the `state` parameter.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `items` | `string[]` | Array of text values (or unique values if `isValue` is `true`) identifying the items to select/deselect. |
| `state` *(optional)* | `boolean` | Set `true` to select, `false` to deselect. Defaults to `true`. |
| `isValue` *(optional)* | `boolean` | Set `true` if the `items` parameter contains unique values instead of text labels. |

**Returns:** `void`

```typescript
// Select by text
this.listBoxObj.selectItems(['Apple', 'Banana'], true);

// Deselect by value
this.listBoxObj.selectItems(['1', '2'], false, true);
```

---

## Events

### actionBegin
**Type:** `EmitType<Object>`

Triggers before fetching data from a remote server.

```html
<ejs-listbox [dataSource]="remoteData" (actionBegin)="onActionBegin($event)"></ejs-listbox>
```

```typescript
onActionBegin(args: Object): void {
  console.log('Remote data fetch started', args);
}
```

---

### actionComplete
**Type:** `EmitType<Object>`

Triggers after data is fetched successfully from a remote server.

```html
<ejs-listbox [dataSource]="remoteData" (actionComplete)="onActionComplete($event)"></ejs-listbox>
```

```typescript
onActionComplete(args: Object): void {
  console.log('Remote data fetch completed', args);
}
```

---

### actionFailure
**Type:** `EmitType<Object>`

Triggers when a data fetch request from the remote server fails.

```html
<ejs-listbox [dataSource]="remoteData" (actionFailure)="onActionFailure($event)"></ejs-listbox>
```

```typescript
onActionFailure(args: Object): void {
  console.error('Remote data fetch failed', args);
}
```

---

### beforeDrop
**Type:** `EmitType<DropEventArgs>`

Triggers before a list item is dropped onto another list item. Can be used to prevent the drop action by setting `args.cancel = true`.

```html
<ejs-listbox [dataSource]="data" [allowDragAndDrop]="true" (beforeDrop)="onBeforeDrop($event)"></ejs-listbox>
```

```typescript
import { DropEventArgs } from '@syncfusion/ej2-dropdowns';

onBeforeDrop(args: DropEventArgs): void {
  // Prevent drop based on custom logic
  if (args.items[0]['category'] === 'locked') {
    args.cancel = true;
  }
}
```

---

### beforeItemRender
**Type:** `EmitType<BeforeItemRenderEventArgs>`

Triggers while each list item is being rendered. Use it to customize item elements before they are added to the DOM.

```html
<ejs-listbox [dataSource]="data" (beforeItemRender)="onBeforeItemRender($event)"></ejs-listbox>
```

```typescript
import { BeforeItemRenderEventArgs } from '@syncfusion/ej2-dropdowns';

onBeforeItemRender(args: BeforeItemRenderEventArgs): void {
  console.log('Rendering item:', args.item);
  // Customize the element
  if (args.item['disabled']) {
    args.element.classList.add('disabled-item');
  }
}
```

---

### change
**Type:** `EmitType<ListBoxChangeEventArgs>`

Triggers when a list item is selected or unselected. Provides the updated selection state.

```html
<ejs-listbox [dataSource]="data" (change)="onChange($event)"></ejs-listbox>
```

```typescript
import { ListBoxChangeEventArgs } from '@syncfusion/ej2-dropdowns';

onChange(args: ListBoxChangeEventArgs): void {
  console.log('Selected values:', args.value);
  console.log('Selected items:', args.items);
  console.log('Selected elements:', args.elements);
}
```

---

### created
**Type:** `EmitType<Object>`

Triggers when the component is created and fully initialized.

```html
<ejs-listbox [dataSource]="data" (created)="onCreated($event)"></ejs-listbox>
```

```typescript
onCreated(args: Object): void {
  console.log('ListBox component created');
}
```

---

### dataBound
**Type:** `EmitType<Object>`

Triggers when the data source is populated in the list and the component is ready to interact.

```html
<ejs-listbox [dataSource]="data" (dataBound)="onDataBound($event)"></ejs-listbox>
```

```typescript
onDataBound(args: Object): void {
  console.log('Data bound and list populated');
}
```

---

### destroyed
**Type:** `EmitType<Object>`

Triggers when the component is destroyed.

```html
<ejs-listbox [dataSource]="data" (destroyed)="onDestroyed($event)"></ejs-listbox>
```

```typescript
onDestroyed(args: Object): void {
  console.log('ListBox component destroyed');
}
```

---

### drag
**Type:** `EmitType<DragEventArgs>`

Triggers continuously while a list item is being dragged.

```html
<ejs-listbox [dataSource]="data" [allowDragAndDrop]="true" (drag)="onDrag($event)"></ejs-listbox>
```

```typescript
import { DragEventArgs } from '@syncfusion/ej2-dropdowns';

onDrag(args: DragEventArgs): void {
  console.log('Dragging item at index:', args.currentIndex);
  console.log('Dragged elements:', args.elements);
}
```

---

### dragStart
**Type:** `EmitType<DragEventArgs>`

Triggers when dragging of a list item begins.

```html
<ejs-listbox [dataSource]="data" [allowDragAndDrop]="true" (dragStart)="onDragStart($event)"></ejs-listbox>
```

```typescript
import { DragEventArgs } from '@syncfusion/ej2-dropdowns';

onDragStart(args: DragEventArgs): void {
  console.log('Drag started from index:', args.previousIndex);
  // Optionally cancel the drag
  // args.cancel = true;
}
```

---

### drop
**Type:** `EmitType<DragEventArgs>`

Triggers before a dragged list item is dropped. Use `args.cancel = true` to prevent the drop.

```html
<ejs-listbox [dataSource]="data" [allowDragAndDrop]="true" (drop)="onDrop($event)"></ejs-listbox>
```

```typescript
import { DragEventArgs } from '@syncfusion/ej2-dropdowns';

onDrop(args: DragEventArgs): void {
  console.log('Dropped at index:', args.currentIndex);
  console.log('Source list data:', args.source);
  console.log('Destination list data:', args.destination);
}
```

---

### filtering
**Type:** `EmitType<FilteringEventArgs>`

Triggers on every character typed in the filter search box. Use this event to implement custom filtering logic by calling `args.updateData()`.

```html
<ejs-listbox [dataSource]="data" [allowFiltering]="true" (filtering)="onFiltering($event)"></ejs-listbox>
```

```typescript
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

onFiltering(args: FilteringEventArgs): void {
  args.preventDefaultAction = true;
  const query = new Query().where('text', 'contains', args.text, true);
  args.updateData(this.fullDataSource, query, { text: 'text', value: 'id' });
}
```

---

## Interface Definitions

### FieldSettingsModel
Maps data source columns to the ListBox fields.

| Property | Type | Description |
|---|---|---|
| `text` | `string` | Maps the display text column from the data table. |
| `value` | `string` | Maps the value column from the data table. |
| `iconCss` | `string` | Maps the CSS icon class column from the data table. |
| `groupBy` | `string` | Maps the column used to group related list items. |
| `disabled` | `string` | Maps the column that defines whether a list item is disabled. |
| `htmlAttributes` | `string` | Maps additional HTML attributes (e.g., `title`, `disabled`) for list item elements. |

```typescript
fields: FieldSettingsModel = {
  text: 'name',
  value: 'id',
  groupBy: 'category',
  iconCss: 'iconClass',
  disabled: 'isDisabled'
};
```

---

### SelectionSettingsModel
Configures the selection behavior of the ListBox.

| Property | Type | Description |
|---|---|---|
| `mode` | `SelectionMode` | Selection mode: `'Single'` or `'Multiple'`. |
| `showCheckbox` | `boolean` | If `true`, checkboxes are shown alongside list items. |
| `showSelectAll` | `boolean` | If `true`, a "Select All" checkbox is displayed at the top of the list. |
| `checkboxPosition` | `CheckBoxPosition` | Position of the checkbox: `'Left'` or `'Right'`. |

```typescript
selectionSettings: SelectionSettingsModel = {
  mode: 'Multiple',
  showCheckbox: true,
  showSelectAll: true,
  checkboxPosition: 'Left'
};
```

---

### ToolbarSettingsModel
Configures the toolbar for dual-ListBox item transfer operations.

| Property | Type | Description |
|---|---|---|
| `items` | `string[]` | List of toolbar action buttons. Predefined values: `'moveUp'`, `'moveDown'`, `'moveTo'`, `'moveFrom'`, `'moveAllTo'`, `'moveAllFrom'`. |
| `position` | `ToolBarPosition` | Position of the toolbar relative to the ListBox: `'Left'` or `'Right'`. |

```typescript
toolbarSettings: ToolbarSettingsModel = {
  items: ['moveUp', 'moveDown', 'moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom'],
  position: 'Right'
};
```

---

### ListBoxChangeEventArgs
Event arguments for the `change` event.

| Property | Type | Description |
|---|---|---|
| `value` | `number[] \| string[] \| boolean[]` | Returns the selected values or selected list items in the ListBox. |
| `items` | `Object[]` | Returns the selected list item data objects. |
| `elements` | `Element[]` | Returns the selected list item DOM elements. |
| `event` | `Event` | The original browser event that triggered the change. |
| `name` | `string` | The name of the event (`'change'`). |

---

### DragEventArgs
Event arguments for the `dragStart`, `drag`, and `drop` events.

| Property | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set to `true` to prevent the current drag/drop action. |
| `currentIndex` | `number` | The current index of the selected list item during/after drag. |
| `previousIndex` | `number` | The previous index of the selected list item before drag. |
| `elements` | `Element[]` | The selected list item DOM elements being dragged. |
| `items` | `Object[]` | The selected list item data objects being dragged. |
| `previousItem` | `object[]` | The previous list item data before the drag operation. |
| `target` | `Element` | The target list element where the dragged item will be dropped. |
| `dragSelected` | `boolean` | Returns `true` if the element is dragged from a ListBox. |
| `event` | `Event` | The original browser event. |
| `source` | [`SourceDestinationModel`](#sourcedestinationmodel) | Returns the previous and current list items of the source ListBox. |
| `destination` | [`SourceDestinationModel`](#sourcedestinationmodel) | Returns the previous and current list items of the destination ListBox. |

---

### DropEventArgs
Event arguments for the `beforeDrop` event.

| Property | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set to `true` to prevent the drop action. |
| `currentIndex` | `number` | The current index of the selected list item. |
| `previousIndex` | `number` | The previous index of the selected list item. |
| `items` | `Object[]` | The selected list item data objects to be dropped. |
| `droppedElement` | `Element` | The selected list element being dropped. |
| `helper` | `Element` | The dragged list element (clone/helper element). |
| `target` | `Element` | The target list element where the item will be dropped. |

---

### BeforeItemRenderEventArgs
Event arguments for the `beforeItemRender` event.

| Property | Type | Description |
|---|---|---|
| `element` | `Element` | The list item DOM element being rendered. |
| `item` | `{ [key: string]: Object }` | The list item data object being rendered. |
| `name` | `string` | The name of the event (`'beforeItemRender'`). |

---

### FilteringEventArgs
Event arguments for the `filtering` event.

| Property | Type | Description |
|---|---|---|
| `text` | `string` | The current search text entered in the filter bar. |
| `cancel` | `boolean` | Set to `true` to prevent the default filtering action. |
| `preventDefaultAction` | `boolean` | Set to `true` to prevent the internal (built-in) filtering action and handle filtering manually. |
| `baseEventArgs` | `Object` | The original `keyup` event arguments. |
| `updateData(dataSource, query?, fields?)` | `void` | Call this method with a data source and optional query/fields to apply custom filtered results. |

---

### SourceDestinationModel
Represents the data state of a ListBox before and after a drag-and-drop operation. Used in `DragEventArgs` for the `source` and `destination` properties.

| Property | Type | Description |
|---|---|---|
| `previousData` | `string[] \| boolean[] \| number[] \| { [key: string]: Object }[] \| DataManager` | The list items in the ListBox **before** the drag or drop. |
| `currentData` | `string[] \| boolean[] \| number[] \| { [key: string]: Object }[] \| DataManager` | The list items in the ListBox **after** the drag or drop. |

---

## Enum Definitions

### SelectionMode
| Value | Description |
|---|---|
| `Single` | Allows selecting only one item at a time. |
| `Multiple` | Allows selecting more than one item using CTRL/SHIFT or checkbox mode. |

### SortOrder
| Value | Description |
|---|---|
| `None` | Data source is not sorted. |
| `Ascending` | Data source is sorted in ascending order. |
| `Descending` | Data source is sorted in descending order. |

### FilterType
| Value | Description |
|---|---|
| `StartsWith` | Filters items that begin with the typed value. |
| `EndsWith` | Filters items that end with the typed value. |
| `Contains` | Filters items that contain the typed value. |

### ToolBarPosition
| Value | Description |
|---|---|
| `Left` | Toolbar is positioned to the left of the ListBox. |
| `Right` | Toolbar is positioned to the right of the ListBox. |

### CheckBoxPosition
| Value | Description |
|---|---|
| `Left` | Checkbox is positioned to the left of the list item text. |
| `Right` | Checkbox is positioned to the right of the list item text. |
