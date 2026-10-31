# API Reference — Syncfusion TypeScript DropDownList

Source: https://ej2.syncfusion.com/documentation/api/drop-down-list/index-default

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [FieldSettingsModel](#fieldsettingsmodel)

---

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `actionFailureTemplate` | `string \| Function` | `'Request failed'` | Template shown in popup when remote data fetch fails |
| `allowFiltering` | `boolean` | `false` | When `true`, shows a filter/search bar in the popup |
| `allowObjectBinding` | `boolean` | `false` | When `true`, the `value` property holds the full selected object |
| `allowResize` | `boolean` | `false` | When `true`, shows a resize handle on the popup corner |
| `cssClass` | `string` | `null` | Additional CSS class(es) added to the root element |
| `dataSource` | `{ [key: string]: Object }[] \| DataManager \| string[] \| number[] \| boolean[]` | `[]` | Data source for the list items |
| `debounceDelay` | `number` | `300` | Delay in milliseconds between keystrokes and filter execution |
| `enablePersistence` | `boolean` | `false` | When `true`, persists `value` between page reloads |
| `enableRtl` | `boolean` | `false` | Renders component in right-to-left direction |
| `enableVirtualization` | `boolean` | `false` | Enables virtual scrolling for large datasets |
| `enabled` | `boolean` | `true` | When `false`, disables all user interactions |
| `fields` | `FieldSettingsModel` | `{text: null, value: null, iconCss: null, groupBy: null, disabled: null}` | Maps data columns to DropDownList roles |
| `filterBarPlaceholder` | `string` | `null` | Placeholder text for the filter search box |
| `filterType` | `FilterType` | `'StartsWith'` | Default filter match type: `'StartsWith'`, `'EndsWith'`, or `'Contains'` |
| `floatLabelType` | `FloatLabelType` | `'Never'` | Float label behavior: `'Never'`, `'Always'`, `'Auto'` |
| `footerTemplate` | `string \| Function` | `null` | Template for the popup footer |
| `groupTemplate` | `string \| Function` | `null` | Template for group header items |
| `headerTemplate` | `string \| Function` | `null` | Template for the popup header |
| `htmlAttributes` | `{ [key: string]: string }` | `{}` | Additional HTML attributes applied to the input element |
| `ignoreAccent` | `boolean` | `false` | When `true`, ignores diacritics/accents during filtering |
| `ignoreCase` | `boolean` | `true` | When `false`, filtering is case-sensitive |
| `index` | `number \| null` | `null` | Gets/sets the selected item by its zero-based index |
| `isDeviceFullScreen` | `boolean` | `true` | When `false`, popup opens the same on mobile and desktop |
| `itemTemplate` | `string \| Function` | `null` | Template for each popup list item |
| `locale` | `string` | `'en-US'` | Culture/locale override for localization |
| `noRecordsTemplate` | `string \| Function` | `'No records found'` | Template shown when no data or filter matches exist |
| `placeholder` | `string` | `null` | Placeholder text shown in the input |
| `popupHeight` | `string \| number` | `'300px'` | Height of the popup list |
| `popupWidth` | `string \| number` | `'100%'` | Width of the popup list |
| `query` | `Query` | `null` | Query object applied to the data source (useful for remote data) |
| `readonly` | `boolean` | `false` | When `true`, user cannot interact; current value is displayed |
| `showClearButton` | `boolean` | `false` | When `true`, shows a clear (×) button to reset the selection |
| `sortOrder` | `SortOrder` | `null` | Sort order for the list: `'None'`, `'Ascending'`, `'Descending'` |
| `text` | `string \| null` | `null` | Gets/sets the display text of the selected item |
| `value` | `number \| string \| boolean \| object \| null` | `null` | Gets/sets the value of the selected item |
| `valueTemplate` | `string \| Function` | `null` | Template for the selected value shown in the input |
| `width` | `string \| number` | `'100%'` | Width of the component |
| `zIndex` | `number` | `1000` | z-index of the popup element |

---

## Methods

### `addItem(items, itemIndex?)`
Adds one or more items to the popup list. Appends to the end by default; use `itemIndex` to insert at a specific position.

| Parameter | Type | Description |
|---|---|---|
| `items` | `{ [key: string]: Object }[] \| string \| boolean \| number \| string[] \| boolean[] \| number[]` | Item(s) to add |
| `itemIndex` *(optional)* | `number` | Zero-based index at which to insert |

Returns: `void`

---

### `appendTo(selector?)`
Appends the component to the specified HTML element.

| Parameter | Type | Description |
|---|---|---|
| `selector` *(optional)* | `string \| HTMLElement` | CSS selector or element to mount the component on |

Returns: `void`

---

### `clear()`
Clears the selected value, resetting `value`, `text`, and `index` to `null`.

Returns: `void`

---

### `dataBind()`
Applies all pending property changes immediately to the component. Use this after setting properties programmatically (e.g., in cascading).

Returns: `void`

---

### `destroy()`
Removes the component from the DOM and detaches all event listeners. Restores the original element.

Returns: `void`

---

### `disableItem(item)`
Disables a specific item in the popup list. If the currently selected item is disabled, the selection is cleared.

| Parameter | Type | Description |
|---|---|---|
| `item` | `string \| number \| object \| HTMLLIElement` | The item to disable, identified by value, index, or element |

Returns: `void`

---

### `filter(dataSource, query?, fields?)`
Filters the data from a given source using an optional query and field settings.

| Parameter | Type | Description |
|---|---|---|
| `dataSource` | `{ [key: string]: Object }[] \| DataManager \| string[] \| number[] \| boolean[]` | Data source to filter |
| `query` *(optional)* | `Query` | Query to apply |
| `fields` *(optional)* | `FieldSettingsModel` | Field mappings |

Returns: `void`

---

### `focusIn()`
Programmatically sets focus on the component.

Returns: `void`

---

### `focusOut()`
Programmatically removes focus from the component.

Returns: `void`

---

### `getDataByValue(value)`
Returns the data object that matches the given value.

| Parameter | Type | Description |
|---|---|---|
| `value` | `string \| number \| boolean` | The value to look up |

Returns: `{ [key: string]: Object } | string | number | boolean`

---

### `getItems()`
Returns all rendered `<li>` elements in the popup list.

Returns: `Element[]`

---

### `getRootElement()`
Returns the root HTML element of the component.

Returns: `HTMLElement`

---

### `hidePopup()`
Closes the popup if it is open.

Returns: `void`

---

### `hideSpinner()`
Hides the loading spinner.

Returns: `void`

---

### `refresh()`
Applies all pending property changes and re-renders the component.

Returns: `void`

---

### `showPopup()`
Opens the popup to display the list of items.

Returns: `void`

---

### `showSpinner()`
Displays the loading spinner.

Returns: `void`

---

### `addEventListener(eventName, handler)`
Registers an event listener.

| Parameter | Type | Description |
|---|---|---|
| `eventName` | `string` | Name of the event |
| `handler` | `Function` | Callback to invoke |

Returns: `void`

---

### `removeEventListener(eventName, handler)`
Removes a previously registered event listener.

| Parameter | Type | Description |
|---|---|---|
| `eventName` | `string` | Name of the event to remove |
| `handler` | `Function` | The handler to remove |

Returns: `void`

---

### `DropDownList.Inject(...modules)`
Statically injects required feature modules. Required for `VirtualScroll`.

```ts
import { DropDownList, VirtualScroll } from '@syncfusion/ej2-dropdowns';
DropDownList.Inject(VirtualScroll);
```

---

## Events

| Event | Type | Description |
|---|---|---|
| `actionBegin` | `EmitType<Object>` | Fires before a remote data fetch request is initiated |
| `actionComplete` | `EmitType<Object>` | Fires after remote data is fetched; `e.result` has the data |
| `actionFailure` | `EmitType<Object>` | Fires when the remote data fetch request fails |
| `beforeOpen` | `EmitType<Object>` | Fires before the popup opens |
| `blur` | `EmitType<Object>` | Fires when focus leaves the component |
| `change` | `EmitType<ChangeEventArgs>` | Fires when the selected value changes (user or programmatic) |
| `close` | `EmitType<PopupEventArgs>` | Fires when the popup is closed |
| `created` | `EmitType<Object>` | Fires after the component is created |
| `dataBound` | `EmitType<Object>` | Fires after the data source is populated into the popup |
| `destroyed` | `EmitType<Object>` | Fires after the component is destroyed |
| `filtering` | `EmitType<FilteringEventArgs>` | Fires when the user types in the filter bar |
| `focus` | `EmitType<Object>` | Fires when the component receives focus |
| `open` | `EmitType<PopupEventArgs>` | Fires when the popup opens |
| `resizeStart` | `EmitType<Object>` | Fires when the user starts resizing the popup |
| `resizeStop` | `EmitType<Object>` | Fires when the user finishes resizing the popup |
| `resizing` | `EmitType<Object>` | Fires continuously while the popup is being resized |
| `select` | `EmitType<SelectEventArgs>` | Fires when an item is selected via mouse, touch, or keyboard |

---

## FieldSettingsModel

The `fields` property accepts a `FieldSettingsModel` object:

| Field | Type | Description |
|---|---|---|
| `text` | `string` | Data column to display as the list item label |
| `value` | `string` | Data column to use as the hidden item identifier |
| `iconCss` | `string` | Data column containing CSS icon class name |
| `groupBy` | `string` | Data column to use for grouping items |
| `disabled` | `string` | Boolean data column to disable specific items |

Example:

```ts
fields: {
    text: 'CountryName',
    value: 'CountryCode',
    groupBy: 'Continent',
    iconCss: 'FlagClass',
    disabled: 'IsRestricted'
}
```

---

## ChangeEventArgs

The `change` event provides a `ChangeEventArgs` object:

| Property | Type | Description |
|---|---|---|
| `value` | `string \| number \| boolean \| object` | The newly selected value |
| `itemData` | `object` | The full data object of the selected item |
| `isInteracted` | `boolean` | `true` if triggered by user interaction; `false` if programmatic |
| `item` | `HTMLLIElement` | The selected `<li>` element |
| `e` | `MouseEvent \| KeyboardEvent` | The original DOM event |

## FilteringEventArgs

| Property | Type | Description |
|---|---|---|
| `text` | `string` | Current text typed in the filter bar |
| `updateData` | `Function` | Call with `(dataSource, query?)` to supply filtered results |
| `preventDefaultAction` | `boolean` | Set to `true` to prevent the default filtering behavior |
