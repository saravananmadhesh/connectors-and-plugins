# JavaScript ListBox API Reference

Complete API reference for the `ListBox` class from `@syncfusion/ej2-dropdowns`.

Official documentation: https://ej2.syncfusion.com/documentation/api/list-box/

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Sub-Interfaces](#sub-interfaces)

---

## Properties

- **`allowDragAndDrop`** `boolean`
  When `true`, enables drag-and-drop reordering of list items. ListBoxes sharing the same `scope` value can exchange items via drag-and-drop. Default: `false`.

- **`allowFiltering`** `boolean`
  Enables the filter/search bar. The `filtering` event fires when text is typed. If no items match, `noRecordsTemplate` is shown. Default: `false`.

- **`cssClass`** `string`
  Adds CSS classes to the root element for custom styling. Default: `''`.

- **`dataSource`** `{ [key: string]: Object }[] | DataManager | string[] | number[] | boolean[]`
  Accepts list data as a local array of JSON objects, primitive arrays, or a `DataManager` instance. Default: `[]`.

- **`enablePersistence`** `boolean`
  Persists the component's `value` state across page reloads using browser local storage. Default: `false`.

- **`enableRtl`** `boolean`
  Enables right-to-left rendering. Default: `false`.

- **`enabled`** `boolean`
  Specifies whether the component is enabled or disabled. Default: `true`.

- **`fields`** `FieldSettingsModel`
  Maps data source columns to component properties. Default: `{ text: null, value: null, iconCss: null, groupBy: null, disabled: null }`.

- **`filterBarPlaceholder`** `string`
  Watermark text shown in the filter search bar. Default: `null`.

- **`filterType`** `FilterType`
  Filter strategy for the search bar. Options: `'StartsWith'` | `'EndsWith'` | `'Contains'`. Default: `'StartsWith'`.

- **`height`** `number | string`
  Sets the height of the ListBox. A fixed height activates a vertical scrollbar. Default: `''`.

- **`htmlAttributes`** `{ [key: string]: string }`
  Adds custom HTML attributes (e.g. `aria-label`, `data-*`) to the root element. Default: `{}`.

- **`itemTemplate`** `string | Function`
  Template string or function for rendering each list item. Use `${property}` syntax in string templates. Default: `null`.

- **`locale`** `string`
  Overrides the global locale for this component. Default: `'en-US'`.

- **`maximumSelectionLength`** `number`
  Limits the number of selectable items. Selection is prevented once the limit is reached. Default: `1000`.

- **`noRecordsTemplate`** `string | Function`
  Template displayed when no data is available or no items match the filter. Default: `'No records found'`.

- **`query`** `Query`
  External `Query` object executed with data processing. Default: `null`.

- **`scope`** `string`
  Groups ListBox instances for drag-and-drop or toolbar-based transfer. Use the CSS selector `'#id'` of the target ListBox. Default: `''`.

- **`selectionSettings`** `SelectionSettingsModel`
  Configures selection mode and checkboxes. Default: `{ mode: 'Multiple', type: 'Default' }`.

- **`sortOrder`** `SortOrder`
  Sort order applied to the data source. Options: `'None'` | `'Ascending'` | `'Descending'`. Default: `null`.

- **`toolbarSettings`** `ToolbarSettingsModel`
  Configures toolbar items and position for dual ListBox operations. Default: `{ items: [], position: 'Right' }`.

- **`value`** `string[] | number[] | boolean[]`
  Pre-selects items or retrieves the currently selected item values. Default: `[]`.

---

## Methods

### `addItems(items, itemIndex?)`
Adds a new item or array of items to the list.

| Parameter | Type | Description |
|---|---|---|
| `items` | `obj[] \| obj` | JSON data object(s) to add |
| `itemIndex` | `number` (optional) | Index at which to insert the new item(s) |

Returns: `void`

```ts
listBox.addItems([{ text: 'Vue', id: '3' }]);
listBox.addItems([{ text: 'Angular', id: '4' }], 1); // Insert at index 1
```

---

### `enableItems(items, enable?, isValue?)`
Enables or disables items by their text or value.

| Parameter | Type | Description |
|---|---|---|
| `items` | `string[]` | Texts (or values) of the items |
| `enable` | `boolean` (optional) | `true` to enable, `false` to disable. Default: `true` |
| `isValue` | `boolean` (optional) | `true` if `items` contains value strings instead of text |

Returns: `void`

```ts
listBox.enableItems(['Ember', 'Svelte'], false); // Disable
listBox.enableItems(['Ember', 'Svelte'], true);  // Re-enable
```

---

### `filter(dataSource, query?, fields?)`
Filters data from the provided data source using an optional query.

| Parameter | Type | Description |
|---|---|---|
| `dataSource` | `object[] \| DataManager \| ...` | Data source to filter |
| `query` | `Query` (optional) | Query to apply |
| `fields` | `FieldSettingsModel` (optional) | Field mappings |

Returns: `void`

```ts
import { Query } from '@syncfusion/ej2-data';
listBox.filter(data, new Query().where('text', 'contains', 'script', true), { text: 'text', value: 'id' });
```

---

### `getDataByValue(value)`
Gets the data object matching the given value.

| Parameter | Type | Description |
|---|---|---|
| `value` | `string \| number \| boolean \| object` | The value to search for |

Returns: `{ [key: string]: Object } | string | number | boolean`

---

### `getDataByValues(value)`
Gets an array of data objects matching the given values.

| Parameter | Type | Description |
|---|---|---|
| `value` | `string[] \| number[] \| boolean[]` | Array of values to look up |

Returns: `{ [key: string]: Object }[]`

---

### `getDataList()`
Gets the current data source bound to the ListBox (reflects any transfers or additions).

Returns: `{ [key: string]: Object }[] | string[] | boolean[] | number[]`

```ts
const current = listBox.getDataList();
```

---

### `getItems()`
Gets all rendered list item DOM elements.

Returns: `Element[]`

---

### `getSortedList()`
Returns the sorted data currently in the ListBox.

Returns: `{ [key: string]: Object }[] | string[] | boolean[] | number[]`

---

### `moveAllTo(targetId?, index?)`
Moves all items from this ListBox to the scoped target ListBox.

| Parameter | Type | Description |
|---|---|---|
| `targetId` | `string` (optional) | CSS selector ID of the target ListBox |
| `index` | `number` (optional) | Index in the target at which to insert |

Returns: `void`

---

### `moveBottom(value?)`
Moves the given or selected values to the bottom of the list.

| Parameter | Type | Description |
|---|---|---|
| `value` | `string[] \| number[] \| boolean[]` (optional) | Values to move |

Returns: `void`

---

### `moveDown(value?)`
Moves the given or selected values one position downwards.

| Parameter | Type | Description |
|---|---|---|
| `value` | `string[] \| number[] \| boolean[]` (optional) | Values to move |

Returns: `void`

---

### `moveTo(value?, index?, targetId?)`
Moves the given or selected values to the target ListBox.

| Parameter | Type | Description |
|---|---|---|
| `value` | `string[] \| number[] \| boolean[]` (optional) | Values to move |
| `index` | `number` (optional) | Target index at which to insert |
| `targetId` | `string` (optional) | CSS selector ID of the target ListBox |

Returns: `void`

```ts
listBox.moveTo(['1', '3'], 0, '#listbox-2');
```

---

### `moveTop(value?)`
Moves the given or selected values to the top of the list.

| Parameter | Type | Description |
|---|---|---|
| `value` | `string[] \| number[] \| boolean[]` (optional) | Values to move |

Returns: `void`

---

### `moveUp(value?)`
Moves the given or selected values one position upwards.

| Parameter | Type | Description |
|---|---|---|
| `value` | `string[] \| number[] \| boolean[]` (optional) | Values to move |

Returns: `void`

---

### `removeItem(items?, itemIndex?)`
Removes a single item from the list.

| Parameter | Type | Description |
|---|---|---|
| `items` | `object \| string \| number \| ...` (optional) | Item reference or primitive value to remove |
| `itemIndex` | `number` (optional) | Index of the item to remove |

Returns: `void`

---

### `removeItems(items?, itemIndex?)`
Removes one or more items from the list.

| Parameter | Type | Description |
|---|---|---|
| `items` | `obj[] \| obj` (optional) | JSON data object(s) to remove |
| `itemIndex` | `number` (optional) | Index of the item to remove |

Returns: `void`

---

### `selectAll(state?)`
Selects or deselects all items.

| Parameter | Type | Description |
|---|---|---|
| `state` | `boolean` (optional) | `true` to select all, `false` to deselect all |

Returns: `void`

```ts
listBox.selectAll(true);   // Select all
listBox.selectAll(false);  // Deselect all
```

---

### `selectItems(items, state?, isValue?)`
Selects or deselects specific items by their text or value.

| Parameter | Type | Description |
|---|---|---|
| `items` | `string[]` | Texts (or values) of the items to select/deselect |
| `state` | `boolean` (optional) | `true` to select, `false` to deselect |
| `isValue` | `boolean` (optional) | `true` if `items` contains value strings instead of text |

Returns: `void`

```ts
listBox.selectItems(['JavaScript', 'React']);
listBox.selectItems(['JavaScript'], false); // Deselect
```

---

## Events

### `actionBegin`
Triggered before fetching data from a remote server.

### `actionComplete`
Triggered after data is fetched from the remote server.

### `actionFailure`
Triggered when the remote data fetch fails.

### `beforeDrop` `(DropEventArgs)`
Triggered before dropping a dragged item. Set `args.cancel = true` to prevent the drop.

| Arg | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set `true` to cancel the drop |
| `currentIndex` | `number` | Current index of the selected item |
| `droppedElement` | `Element` | Selected element being dropped |
| `items` | `Object[]` | Selected items being dropped |
| `previousIndex` | `number` | Previous index of the selected item |
| `target` | `Element` | Target element |

### `beforeItemRender` `(BeforeItemRenderEventArgs)`
Triggered while rendering each list item.

| Arg | Type | Description |
|---|---|---|
| `element` | `Element` | List element before rendering |
| `item` | `{ [key: string]: Object }` | List item data |

### `change` `(ListBoxChangeEventArgs)`
Triggered when a list item is selected or unselected.

| Arg | Type | Description |
|---|---|---|
| `elements` | `Element[]` | Selected list elements |
| `event` | `Event` | Native browser event |
| `items` | `Object[]` | Selected list items |
| `value` | `number[] \| string[] \| boolean[]` | Selected item values |

```ts
const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  change: (args) => {
    console.log('Selected values:', args.value);
    console.log('Selected items:', args.items);
  }
});
```

### `created`
Triggered when the component finishes initializing.

### `dataBound`
Triggered after the data source is populated in the list.

### `destroyed`
Triggered when the component is destroyed.

### `drag` `(DragEventArgs)`
Triggered continuously while dragging a list item.

### `dragStart` `(DragEventArgs)`
Triggered when dragging starts.

### `drop` `(DragEventArgs)`
Triggered when a dragged item is dropped.

### `filtering` `(FilteringEventArgs)`
Triggered when text is typed in the filter bar.

| Arg | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set `true` to cancel filtering |
| `preventDefaultAction` | `boolean` | Set `true` to skip built-in filtering |
| `text` | `string` | Current text in the filter bar |
| `updateData(ds, query?, fields?)` | `method` | Apply custom filter and update the list |

```ts
filtering: (args: FilteringEventArgs) => {
  args.updateData(myData, new Query().where('text', 'startsWith', args.text, true));
}
```

---

## Sub-Interfaces

### `FieldSettingsModel`

| Property | Type | Description |
|---|---|---|
| `text` | `string` | Column for display text |
| `value` | `string` | Column for item value |
| `iconCss` | `string` | Column for icon CSS class |
| `groupBy` | `string` | Column for item grouping |
| `disabled` | `string` | Column to mark items as disabled |
| `htmlAttributes` | `string` | Column for additional HTML attributes |

### `SelectionSettingsModel`

| Property | Type | Description |
|---|---|---|
| `mode` | `'Single' \| 'Multiple'` | Selection mode. Default: `'Multiple'` |
| `showCheckbox` | `boolean` | Render checkbox beside each item. Requires `ListBox.Inject(CheckBoxSelection)` |
| `showSelectAll` | `boolean` | Show "Select All" option |
| `checkboxPosition` | `CheckBoxPosition` | Position of the checkbox |

### `ToolbarSettingsModel`

| Property | Type | Description |
|---|---|---|
| `items` | `string[]` | Toolbar tools: `'moveUp'`, `'moveDown'`, `'moveTo'`, `'moveFrom'`, `'moveAllTo'`, `'moveAllFrom'` |
| `position` | `'Left' \| 'Right'` | Toolbar position relative to the ListBox |
