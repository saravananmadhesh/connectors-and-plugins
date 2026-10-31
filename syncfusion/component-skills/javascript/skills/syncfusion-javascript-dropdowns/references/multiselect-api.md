# API Reference — Syncfusion TypeScript MultiSelect

Source: https://ej2.syncfusion.com/documentation/api/multi-select/index-default

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [FieldSettingsModel](#fieldsettingsmodel)
- [Event Argument Types](#event-argument-types)

---

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `actionFailureTemplate` | `string \| Function` | `'Request failed'` | Template shown in the popup when a remote data fetch request fails |
| `addTagOnBlur` | `boolean` | `false` | When `true`, typed text is converted to a chip/value on focus-out rather than on Enter key press |
| `allowCustomValue` | `boolean` | `false` | Allows users to add a custom value not present in the suggestion list |
| `allowFiltering` | `boolean` | `null` | Enables the filter/search bar in the popup; fires the `filtering` event on each keystroke |
| `allowObjectBinding` | `boolean` | `false` | When `true`, full objects are stored as values instead of primitives |
| `allowResize` | `boolean` | `false` | When `true`, a resize handle appears in the bottom-right corner of the popup |
| `changeOnBlur` | `boolean` | `true` | When `true`, the `change` event fires on focus-out; when `false`, it fires on every selection or removal |
| `closePopupOnSelect` | `boolean` | `true` | Controls whether the popup closes when an item is selected |
| `cssClass` | `string` | `null` | Additional CSS class(es) applied to the root element for style customization |
| `dataSource` | `{ [key: string]: Object }[] \| DataManager \| string[] \| number[] \| boolean[]` | `[]` | Accepts list items via a local array or remote `DataManager` instance |
| `debounceDelay` | `number` | `300` | Delay in milliseconds between keystrokes and filter execution |
| `delimiterChar` | `string` | `','` | Character used to separate values in `Default` and `Delimiter` visibility modes |
| `enableGroupCheckBox` | `boolean` | `false` | When `true`, renders a checkbox for group headers in `CheckBox` mode to select/deselect all group items at once |
| `enableHtmlSanitizer` | `boolean` | `true` | When `true`, sanitizes HTML to prevent cross-site scripting (XSS) |
| `enablePersistence` | `boolean` | `false` | When `true`, persists the component's `value` state between page reloads |
| `enableRtl` | `boolean` | `false` | Enables right-to-left rendering of the component |
| `enableSelectionOrder` | `boolean` | `true` | Reorders the selected items in popup visibility state |
| `enableVirtualization` | `boolean` | `false` | Enables virtual scrolling for improved performance with large datasets |
| `enabled` | `boolean` | `true` | When `false`, disables all user interactions |
| `fields` | `FieldSettingsModel` | `{text: null, value: null, iconCss: null, groupBy: null}` | Maps data columns to MultiSelect roles (text, value, icon, group) |
| `filterBarPlaceholder` | `string` | `null` | Watermark/placeholder text shown in the filter search box |
| `filterType` | `FilterType` | `'StartsWith'` | Filter strategy applied during search: `'StartsWith'`, `'EndsWith'`, or `'Contains'` |
| `floatLabelType` | `FloatLabelType` | `'Never'` | Float label behavior: `'Never'`, `'Always'`, or `'Auto'` |
| `footerTemplate` | `string \| Function` | `null` | Template for the popup footer |
| `groupTemplate` | `string \| Function` | `null` | Template for group header items in the popup list |
| `headerTemplate` | `string \| Function` | `null` | Template for the popup header |
| `hideSelectedItem` | `boolean` | `true` | When `true`, hides already-selected items from the dropdown list |
| `htmlAttributes` | `{ [key: string]: string }` | `{}` | Additional HTML attributes (e.g., `name`, `title`) applied to the input element as key-value pairs |
| `ignoreAccent` | `boolean` | `false` | When `true`, ignores diacritic characters/accents during filtering |
| `ignoreCase` | `boolean` | `true` | When `false`, filtering is case-sensitive |
| `isDeviceFullScreen` | `boolean` | `true` | When `false`, the popup opens the same way on both mobile and desktop (no fullscreen on mobile) |
| `itemTemplate` | `string \| Function` | `null` | Template for each list item in the popup |
| `locale` | `string` | `'en-US'` | Overrides the global culture/locale for this component |
| `maximumSelectionLength` | `number` | `1000` | Limits the number of items that can be selected; prevents further selection once reached |
| `mode` | `visualMode` | `'Default'` | Controls how selected items are displayed: `'Box'` (chips), `'Delimiter'` (text), `'Default'` (Box on focus, Delimiter on blur), or `'CheckBox'` |
| `noRecordsTemplate` | `string \| Function` | `'No records found'` | Template shown when no data or filter matches exist |
| `openOnClick` | `boolean` | `true` | When `true`, the popup automatically opens when the component is clicked |
| `placeholder` | `string` | `null` | Placeholder text shown in the input when no item is selected |
| `popupHeight` | `string \| number` | `'300px'` | Height of the popup list |
| `popupWidth` | `string \| number` | `'100%'` | Width of the popup list; percentage values are relative to input width |
| `query` | `Query` | `null` | External `Query` object executed along with data processing (useful for remote data) |
| `readonly` | `boolean` | `false` | When `true`, the input is read-only (allows copy/highlight but not editing or selection changes) |
| `selectAllText` | `string` | `'select All'` | Label text displayed for the "Select All" option |
| `showClearButton` | `boolean` | `true` | When `true`, shows a close/remove icon on each selected chip |
| `showDropDownIcon` | `boolean` | `false` | When `true`, shows the dropdown arrow button on the component |
| `showSelectAll` | `boolean` | `false` | When `true`, shows the "Select All" option in the dropdown |
| `sortOrder` | `SortOrder` | `null` | Sort order for the data source: `'None'`, `'Ascending'`, or `'Descending'` |
| `text` | `string \| null` | `null` | Selects the list item matching the given display text |
| `unSelectAllText` | `string` | `'select All'` | Label text displayed for the "Unselect All" option |
| `value` | `number[] \| string[] \| boolean[] \| object[] \| null` | `null` | Pre-selects list items matching the given value(s) |
| `valueTemplate` | `string \| Function` | `null` | Template for the selected item chip shown inside the input element |
| `width` | `string \| number` | `'100%'` | Width of the component |
| `zIndex` | `number` | `1000` | z-index value of the popup element |

---

## Methods

### `addItem(items, itemIndex?)`
Adds one or more new items to the multiselect popup list. Appends to the end by default; use `itemIndex` to insert at a specific position.

| Parameter | Type | Description |
|---|---|---|
| `items` | `{ [key: string]: Object }[] \| string \| boolean \| number \| string[] \| boolean[] \| number[]` | JSON data or array to add |
| `itemIndex` *(optional)* | `number` | Zero-based index at which to insert the new item |

Returns: `void`

---

### `addEventListener(eventName, handler)`
Registers an event listener on the component.

| Parameter | Type | Description |
|---|---|---|
| `eventName` | `string` | Name of the event to listen to |
| `handler` | `Function` | Callback function to invoke when the event fires |

Returns: `void`

---

### `appendTo(selector?)`
Appends the component to the specified HTML element.

| Parameter | Type | Description |
|---|---|---|
| `selector` *(optional)* | `string \| HTMLElement` | CSS selector string or HTMLElement to mount the component on |

Returns: `void`

---

### `clear()`
Clears all currently selected values from the MultiSelect component.

Returns: `void`

---

### `dataBind()`
Applies all pending property changes immediately to the component. Use this after setting properties programmatically (e.g., in cascading scenarios).

Returns: `void`

---

### `destroy()`
Removes the component from the DOM, detaches all event handlers, and restores the original element.

Returns: `void`

---

### `disableItem(item)`
Disables a specific item in the popup list.

| Parameter | Type | Description |
|---|---|---|
| `item` | `string \| number \| object \| HTMLLIElement` | The item to disable, identified by value, index, data object, or element |

Returns: `void`

---

### `filter(dataSource, query?, fields?)`
Filters the multiselect data from a given data source using an optional query and field settings.

| Parameter | Type | Description |
|---|---|---|
| `dataSource` | `{ [key: string]: Object }[] \| DataManager \| string[] \| number[] \| boolean[]` | Data source to filter |
| `query` *(optional)* | `Query` | Query to apply during filtering |
| `fields` *(optional)* | `FieldSettingsModel` | Field mappings to use for the filtered data |

Returns: `void`

---

### `focusIn()`
Programmatically sets focus on the component for user interaction.

Returns: `void`

---

### `focusOut()`
Programmatically removes focus from the component if it is currently focused.

Returns: `void`

---

### `getDataByValue(value)`
Returns the data object that matches the given value.

| Parameter | Type | Description |
|---|---|---|
| `value` | `string \| number \| boolean \| object` | The value of the list item to look up |

Returns: `{ [key: string]: Object } | string | number | boolean`

---

### `getRootElement()`
Returns the root HTML element of the component.

Returns: `HTMLElement`

---

### `hidePopup(e?)`
Closes the popup if it is currently open.

| Parameter | Type | Description |
|---|---|---|
| `e` *(optional)* | `MouseEvent \| KeyboardEventArgs` | Mouse or keyboard event that triggers the close |

Returns: `void`

---

### `hideSpinner()`
Hides the loading spinner overlay.

Returns: `void`

---

### `refresh()`
Applies all pending property changes and re-renders the component.

Returns: `void`

---

### `removeEventListener(eventName, handler)`
Removes a previously registered event listener from the component.

| Parameter | Type | Description |
|---|---|---|
| `eventName` | `string` | Name of the event to remove the listener from |
| `handler` | `Function` | The specific handler function to remove |

Returns: `void`

---

### `selectAll(state)`
Selects or deselects all list items based on the `state` parameter.

| Parameter | Type | Description |
|---|---|---|
| `state` | `boolean` | `true` to select all items; `false` to deselect all items |

Returns: `void`

---

### `showPopup(e?)`
Opens the popup to display the list of items.

| Parameter | Type | Description |
|---|---|---|
| `e` *(optional)* | `MouseEvent \| KeyboardEventArgs \| TouchEvent` | Mouse, keyboard, or touch event that triggers the open |

Returns: `void`

---

### `showSpinner()`
Displays the loading spinner overlay.

Returns: `void`

---

### `MultiSelect.Inject(...modules)`
Statically injects required feature modules into the component. Must be called before using features like `CheckBoxSelection` or `VirtualScroll`.

| Parameter | Type | Description |
|---|---|---|
| `moduleList` | `Function[]` | Array of module constructors to inject |

```typescript
import { MultiSelect, CheckBoxSelection, VirtualScroll } from '@syncfusion/ej2-dropdowns';

// Inject before using CheckBox mode
MultiSelect.Inject(CheckBoxSelection);

// Inject before using virtual scrolling
MultiSelect.Inject(VirtualScroll);
```

Returns: `void`

---

## Events

| Event | Type | Description |
|---|---|---|
| `actionBegin` | `EmitType<Object>` | Fires before a remote data fetch request is initiated |
| `actionComplete` | `EmitType<Object>` | Fires after remote data is fetched successfully from the server |
| `actionFailure` | `EmitType<Object>` | Fires when the remote data fetch request fails |
| `beforeOpen` | `EmitType<Object>` | Fires before the popup opens (before animation starts) |
| `beforeSelectAll` | `EmitType<ISelectAllEventArgs>` | Fires before the select-all process executes |
| `blur` | `EmitType<Object>` | Fires when the component loses focus |
| `change` | `EmitType<MultiSelectChangeEventArgs>` | Fires when selection changes after the model and input value are updated |
| `chipSelection` | `EmitType<Object>` | Fires when a chip (selected item tag) is clicked/selected |
| `close` | `EmitType<PopupEventArgs>` | Fires when the popup closes after animation completion |
| `created` | `EmitType<Object>` | Fires after the component is successfully created |
| `customValueSelection` | `EmitType<CustomValueEventArgs>` | Fires when a custom value (not in the list) is selected via `allowCustomValue` |
| `dataBound` | `EmitType<Object>` | Fires after the data source is populated into the popup list |
| `destroyed` | `EmitType<Object>` | Fires after the component is destroyed |
| `filtering` | `EmitType<FilteringEventArgs>` | Fires when the user types in the search box; use `e.updateData()` to supply custom filtered results |
| `focus` | `EmitType<Object>` | Fires when the component receives focus |
| `open` | `EmitType<PopupEventArgs>` | Fires when the popup opens after animation completion |
| `removed` | `EmitType<RemoveEventArgs>` | Fires after a selected item is removed from the component |
| `removing` | `EmitType<RemoveEventArgs>` | Fires before a selected item is removed from the component |
| `resizeStart` | `EmitType<Object>` | Fires when the user starts resizing the popup (requires `allowResize: true`) |
| `resizeStop` | `EmitType<Object>` | Fires when the user finishes resizing the popup |
| `resizing` | `EmitType<Object>` | Fires continuously while the popup is being resized, providing live width/height updates |
| `select` | `EmitType<SelectEventArgs>` | Fires when an item in the popup is selected via mouse, touch, or keyboard |
| `selectedAll` | `EmitType<ISelectAllEventArgs>` | Fires after the select-all process completes |
| `tagging` | `EmitType<TaggingEventArgs>` | Fires before a selected item is set as a chip; use this to customize chip content or cancel chip creation |

---

## FieldSettingsModel

The `fields` property accepts a `FieldSettingsModel` object to map data columns to component roles:

| Field | Type | Description |
|---|---|---|
| `text` | `string` | Data column mapped to the display label of each list item |
| `value` | `string` | Data column mapped to the stored value of each list item |
| `iconCss` | `string` | Data column containing a CSS class name for the item icon |
| `groupBy` | `string` | Data column used to group list items under a shared header |

Example:

```typescript
const multiSelect = new MultiSelect({
  dataSource: countries,
  fields: {
    text: 'CountryName',
    value: 'CountryCode',
    groupBy: 'Continent',
    iconCss: 'FlagClass'
  },
  placeholder: 'Select a country'
});

multiSelect.appendTo('#multiselect');
```

---

## Event Argument Types

### `MultiSelectChangeEventArgs`
Provided by the `change` event:

| Property | Type | Description |
|---|---|---|
| `value` | `number[] \| string[] \| boolean[] \| object[]` | The currently selected value(s) after the change |
| `oldValue` | `number[] \| string[] \| boolean[] \| object[]` | The previously selected value(s) before the change |
| `isInteracted` | `boolean` | `true` if the change was triggered by user interaction; `false` if programmatic |
| `e` | `MouseEvent \| KeyboardEvent` | The original DOM event |

---

### `SelectEventArgs`
Provided by the `select` event:

| Property | Type | Description |
|---|---|---|
| `item` | `HTMLLIElement` | The selected `<li>` element in the popup |
| `itemData` | `{ [key: string]: Object } \| string \| number \| boolean` | The full data object or primitive of the selected item |
| `isInteracted` | `boolean` | `true` if triggered by user interaction |
| `cancel` | `boolean` | Set to `true` to cancel the selection |
| `e` | `MouseEvent \| KeyboardEvent` | The original DOM event |

---

### `RemoveEventArgs`
Provided by the `removing` and `removed` events:

| Property | Type | Description |
|---|---|---|
| `item` | `HTMLLIElement` | The `<li>` element corresponding to the removed item |
| `itemData` | `{ [key: string]: Object } \| string \| number \| boolean` | The data object or primitive of the removed item |
| `isInteracted` | `boolean` | `true` if triggered by user interaction |
| `cancel` | `boolean` | Set to `true` in `removing` event to prevent removal |
| `e` | `MouseEvent \| KeyboardEvent` | The original DOM event |

---

### `TaggingEventArgs`
Provided by the `tagging` event:

| Property | Type | Description |
|---|---|---|
| `itemData` | `{ [key: string]: Object }` | The data object for the item being converted to a chip |
| `setClass` | `string` | CSS class to apply to the chip element |
| `cancel` | `boolean` | Set to `true` to prevent the chip from being created |

---

### `FilteringEventArgs`
Provided by the `filtering` event:

| Property | Type | Description |
|---|---|---|
| `text` | `string` | The current text typed in the filter bar |
| `updateData` | `Function` | Call with `(dataSource, query?, fields?)` to supply custom filtered results |
| `preventDefaultAction` | `boolean` | Set to `true` to skip the default built-in filtering |

---

### `PopupEventArgs`
Provided by `open`, `close`, and `beforeOpen` events:

| Property | Type | Description |
|---|---|---|
| `popup` | `Popup` | The Popup component instance |
| `cancel` | `boolean` | Set to `true` in `beforeOpen` to prevent the popup from opening |

---

### `ISelectAllEventArgs`
Provided by `beforeSelectAll` and `selectedAll` events:

| Property | Type | Description |
|---|---|---|
| `isChecked` | `boolean` | `true` if select-all is being/was checked; `false` if unchecked |
| `cancel` | `boolean` | Set to `true` in `beforeSelectAll` to cancel the operation |

---

### `CustomValueEventArgs`
Provided by the `customValueSelection` event:

| Property | Type | Description |
|---|---|---|
| `text` | `string` | The custom text entered by the user |
| `newData` | `{ [key: string]: Object }` | The newly created data object for the custom value |
| `cancel` | `boolean` | Set to `true` to prevent the custom value from being added |

---

## Module Injection

The following optional modules must be injected before use:

| Module | Required For | Import |
|---|---|---|
| `CheckBoxSelection` | `mode: 'CheckBox'`, `enableGroupCheckBox` | `import { CheckBoxSelection } from '@syncfusion/ej2-dropdowns'` |
| `VirtualScroll` | `enableVirtualization: true` | `import { VirtualScroll } from '@syncfusion/ej2-dropdowns'` |

```typescript
import { MultiSelect, CheckBoxSelection, VirtualScroll } from '@syncfusion/ej2-dropdowns';

MultiSelect.Inject(CheckBoxSelection, VirtualScroll);

const multiSelect = new MultiSelect({
  dataSource: largeDataset,
  fields: { text: 'name', value: 'id' },
  mode: 'CheckBox',
  showSelectAll: true,
  enableVirtualization: true,
  placeholder: 'Select items'
});

multiSelect.appendTo('#multiselect');
```
