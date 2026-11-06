# Full API Reference — Syncfusion TypeScript AutoComplete

## Table of Contents
- [Properties](#properties)
  - [actionFailureTemplate](#actionfailuretemplate)
  - [allowCustom](#allowcustom)
  - [allowObjectBinding](#allowobjectbinding)
  - [allowResize](#allowresize)
  - [autofill](#autofill)
  - [cssClass](#cssclass)
  - [dataSource](#datasource)
  - [debounceDelay](#debouncedelay)
  - [enablePersistence](#enablepersistence)
  - [enableRtl](#enablertl)
  - [enableVirtualization](#enablevirtualization)
  - [enabled](#enabled)
  - [fields](#fields)
  - [filterType](#filtertype)
  - [floatLabelType](#floatlabeltype)
  - [footerTemplate](#footertemplate)
  - [groupTemplate](#grouptemplate)
  - [headerTemplate](#headertemplate)
  - [highlight](#highlight)
  - [htmlAttributes](#htmlattributes)
  - [ignoreAccent](#ignoreaccent)
  - [ignoreCase](#ignorecase)
  - [isDeviceFullScreen](#isdevicefullscreen)
  - [itemTemplate](#itemtemplate)
  - [locale](#locale)
  - [minLength](#minlength)
  - [noRecordsTemplate](#norecordstemplate)
  - [placeholder](#placeholder)
  - [popupHeight](#popupheight)
  - [popupWidth](#popupwidth)
  - [query](#query)
  - [readonly](#readonly)
  - [showClearButton](#showclearbutton)
  - [showPopupButton](#showpopupbutton)
  - [sortOrder](#sortorder)
  - [suggestionCount](#suggestioncount)
  - [value](#value)
  - [width](#width)
  - [zIndex](#zindex)
- [Methods](#methods)
  - [addEventListener](#addeventlistener)
  - [addItem](#additem)
  - [appendTo](#appendto)
  - [clear](#clear)
  - [dataBind](#databind)
  - [destroy](#destroy)
  - [disableItem](#disableitem)
  - [filter](#filter)
  - [focusIn](#focusin)
  - [focusOut](#focusout)
  - [getDataByValue](#getdatabyvalue)
  - [getItems](#getitems)
  - [getRootElement](#getrootelement)
  - [hidePopup](#hidepopup)
  - [hideSpinner](#hidespinner)
  - [refresh](#refresh)
  - [removeEventListener](#removeeventlistener)
  - [showPopup](#showpopup)
  - [showSpinner](#showspinner)
  - [Inject](#inject)
- [Events](#events)
  - [actionBegin](#actionbegin)
  - [actionComplete](#actioncomplete)
  - [actionFailure](#actionfailure)
  - [beforeOpen](#beforeopen)
  - [blur](#blur)
  - [change](#change)
  - [close](#close)
  - [created](#created)
  - [customValueSpecifier](#customvaluespecifier)
  - [dataBound](#databound)
  - [destroyed](#destroyed)
  - [filtering](#filtering)
  - [focus](#focus)
  - [open](#open)
  - [resizeStart](#resizestart)
  - [resizeStop](#resizestop)
  - [resizing](#resizing)
  - [select](#select)

---

## Properties

### actionFailureTemplate
**Type:** `string | Function` | **Default:** `'Request failed'`

Template content shown in the popup when a remote data fetch request fails.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: remoteData,
  fields: { value: 'ContactName' },
  actionFailureTemplate: '<div class="error">Failed to load data. Please retry.</div>'
});
atcObj.appendTo('#atc');
```

---

### allowCustom
**Type:** `boolean` | **Default:** `true`

Specifies whether the component allows user-defined values that do not exist in the data source. When `true`, the user can type any value; when `false`, only items from the suggestion list can be accepted.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  allowCustom: false    // rejects values not in the list
});
atcObj.appendTo('#atc');
```

---

### allowObjectBinding
**Type:** `boolean` | **Default:** `false`

When `true`, `atcObj.value` returns the full selected data object rather than just the primitive value field.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: [{ id: 1, name: 'Engineering' }, { id: 2, name: 'Design' }],
  fields: { value: 'name' },
  allowObjectBinding: true
});
atcObj.appendTo('#atc');
// atcObj.value === { id: 1, name: 'Engineering' }
```

---

### allowResize
**Type:** `boolean` | **Default:** `false`

When `true`, a resize handle appears in the bottom-right corner of the popup, allowing the user to resize the popup width and height.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  allowResize: true
});
atcObj.appendTo('#atc');
```

---

### autofill
**Type:** `boolean` | **Default:** `false`

When `true`, the AutoComplete suggests the first matching item inline in the input as the user types, auto-completing the remaining text. No action happens when no matches are found.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Badminton', 'Basketball', 'Cricket'],
  autofill: true
});
atcObj.appendTo('#atc');
```

---

### cssClass
**Type:** `string` | **Default:** `null`

Adds CSS class(es) to the root element of the component for custom styling.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  cssClass: 'custom-atc e-outline'
});
atcObj.appendTo('#atc');
```

---

### dataSource
**Type:** `{ [key: string]: Object }[] | DataManager | string[] | number[] | boolean[]` | **Default:** `[]`

The data source for the suggestion list. Accepts local arrays or a remote `DataManager` instance.

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

// Local string array
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis']
});
atcObj.appendTo('#atc');

// Local object array
const atcObj2: AutoComplete = new AutoComplete({
  dataSource: [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda',   Code: 'BM' },
    { Name: 'Canada',    Code: 'CA' }
  ],
  fields: { value: 'Name' },
  placeholder: 'e.g. Australia'
});
atcObj2.appendTo('#atc2');

// Remote DataManager
const atcObj3: AutoComplete = new AutoComplete({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  }),
  fields: { value: 'ContactName' },
  placeholder: 'Find a customer'
});
atcObj3.appendTo('#atc3');
```

---

### debounceDelay
**Type:** `number` | **Default:** `300`

Specifies the delay in milliseconds between the user's last keystroke and the execution of the filter operation. Increase to reduce server request frequency for remote filtering.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: remoteData,
  fields: { value: 'ContactName' },
  debounceDelay: 500    // wait 500 ms after last keystroke before filtering
});
atcObj.appendTo('#atc');
```

---

### enablePersistence
**Type:** `boolean` | **Default:** `false`

When `true`, persists the component's `value` state across page reloads using browser storage.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  enablePersistence: true
});
atcObj.appendTo('#atc');
```

---

### enableRtl
**Type:** `boolean` | **Default:** `false`

When `true`, renders the component in right-to-left direction for RTL language support.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  enableRtl: true
});
atcObj.appendTo('#atc');
```

---

### enableVirtualization
**Type:** `boolean` | **Default:** `false`

> ⚠️ **Requires:** `AutoComplete.Inject(VirtualScroll)` before instantiation.

Enables virtual scrolling for large datasets. Only the visible items are rendered in the DOM at any time.

```typescript
import { AutoComplete, VirtualScroll } from '@syncfusion/ej2-dropdowns';

AutoComplete.Inject(VirtualScroll);

const atcObj: AutoComplete = new AutoComplete({
  dataSource: largeDataArray,
  enableVirtualization: true
});
atcObj.appendTo('#atc');
```

---

### enabled
**Type:** `boolean` | **Default:** `true`

Specifies whether the component is enabled. When `false`, the component is visually dimmed and all interactions are disabled.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  enabled: false    // renders as disabled
});
atcObj.appendTo('#atc');

// Toggle at runtime
atcObj.setProperties({ enabled: true });
```

---

### fields
**Type:** `FieldSettingsModel` | **Default:** `{ value: null, iconCss: null, groupBy: null }`

Maps object keys in the data source to the AutoComplete's internal roles.

| Key | Purpose |
|---|---|
| `text` | Display label shown in the suggestion list |
| `value` | Internal value stored on selection |
| `groupBy` | Category grouping header |
| `iconCss` | CSS class for item icon |

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

const countries: { [key: string]: Object }[] = [
  { Name: 'Australia', Code: 'AU' },
  { Name: 'Bermuda',   Code: 'BM' },
  { Name: 'Canada',    Code: 'CA' },
  { Name: 'Cameroon',  Code: 'CM' },
  { Name: 'Denmark',   Code: 'DK' }
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: countries,
  fields: { value: 'Name' },
  placeholder: 'e.g. Australia'
});
atcObj.appendTo('#atc');
```

---

### filterType
**Type:** `FilterType` | **Default:** `'Contains'`

Determines the filter matching strategy when the user types into the input.

| Value | Description | Supported Types |
|---|---|---|
| `'StartsWith'` | Matches items beginning with the typed text | String |
| `'EndsWith'` | Matches items ending with the typed text | String |
| `'Contains'` | Matches items containing the typed text anywhere (default) | String |

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  filterType: 'StartsWith'    // only items starting with typed text
});
atcObj.appendTo('#atc');
```

---

### floatLabelType
**Type:** `FloatLabelType` | **Default:** `'Never'`

Controls the floating label behavior above the input element.

| Value | Description |
|---|---|
| `'Never'` | Label never floats; stays as a placeholder |
| `'Always'` | Label always floats above the input |
| `'Auto'` | Label floats after focusing or entering a value |

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  floatLabelType: 'Auto',
  placeholder: 'Select a sport'
});
atcObj.appendTo('#atc');
```

---

### footerTemplate
**Type:** `string | Function` | **Default:** `null`

Template for the popup footer. Accepts an HTML string or a template function.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: sportsData,
  footerTemplate: '<div class="footer">Showing top results</div>'
});
atcObj.appendTo('#atc');
```

---

### groupTemplate
**Type:** `string | Function` | **Default:** `null`

Template for group header items in the popup list. Use when `fields.groupBy` is set.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: employeeData,
  fields: { value: 'name', groupBy: 'department' },
  groupTemplate: '<strong>${department}</strong>'
});
atcObj.appendTo('#atc');
```

---

### headerTemplate
**Type:** `string | Function` | **Default:** `null`

Template for the popup header. Accepts an HTML string or a template function.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: sportsData,
  headerTemplate: '<div class="header"><b>Suggestions</b></div>'
});
atcObj.appendTo('#atc');
```

---

### highlight
**Type:** `boolean` | **Default:** `false`

When `true`, highlights the matched characters in the suggestion list items.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  highlight: true
});
atcObj.appendTo('#atc');
```

---

### htmlAttributes
**Type:** `{ [key: string]: string }` | **Default:** `{}`

Adds extra HTML attributes to the underlying `<input>` element, such as `name`, `title`, `tabindex`, etc.

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

const countries: { [key: string]: Object }[] = [
  { Name: 'Australia', Code: 'AU' },
  { Name: 'Bermuda',   Code: 'BM' }
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: countries,
  fields: { value: 'Name' },
  placeholder: 'e.g. Australia',
  htmlAttributes: { name: 'country', maxlength: '20', title: 'AutoComplete' }
});
atcObj.appendTo('#atc');
```

---

### ignoreAccent
**Type:** `boolean` | **Default:** `false`

When `true`, ignores diacritic characters (accents) during filtering. For example, typing `"cafe"` matches `"café"`.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['café', 'naïve', 'résumé'],
  ignoreAccent: true
});
atcObj.appendTo('#atc');
```

---

### ignoreCase
**Type:** `boolean` | **Default:** `true`

When `true` (default), filtering is case-insensitive. Set to `false` to require exact case matching.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  ignoreCase: false    // 'cricket' will NOT match 'Cricket'
});
atcObj.appendTo('#atc');
```

---

### isDeviceFullScreen
**Type:** `boolean` | **Default:** `true`

When `true`, the popup opens in fullscreen mode on mobile devices when filtering is enabled. Set to `false` for consistent popup behavior across both mobile and desktop.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  isDeviceFullScreen: false    // same popup on mobile and desktop
});
atcObj.appendTo('#atc');
```

---

### itemTemplate
**Type:** `string | Function` | **Default:** `null`

Template for each list item rendered in the suggestion popup. Use to customize how suggestions are displayed.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: sportsData,
  fields: { value: 'sport' },
  itemTemplate: '<span class="sport-item"><i class="e-icons"></i> ${sport}</span>'
});
atcObj.appendTo('#atc');
```

---

### locale
**Type:** `string` | **Default:** `'en-US'`

Overrides the global culture and localization value for this component. Affects built-in strings such as `noRecordsTemplate` and `actionFailureTemplate`.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: sportsData,
  locale: 'fr-FR'
});
atcObj.appendTo('#atc');
```

---

### minLength
**Type:** `number` | **Default:** `1`

Sets the minimum number of characters the user must type before the filter action and suggestion popup are triggered.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  minLength: 3    // suggestion popup appears only after 3 characters are typed
});
atcObj.appendTo('#atc');
```

---

### noRecordsTemplate
**Type:** `string | Function` | **Default:** `'No records found'`

Template content shown in the popup when no items match the typed input or the data source is empty.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  noRecordsTemplate: '<span class="no-data">No matching sport found</span>'
});
atcObj.appendTo('#atc');
```

---

### placeholder
**Type:** `string` | **Default:** `null`

Hint text shown in the input when no value has been typed or selected.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  placeholder: 'Find a sport'
});
atcObj.appendTo('#atc');
```

---

### popupHeight
**Type:** `string | number` | **Default:** `'300px'`

Height of the suggestion popup list. Accepts a CSS string (e.g. `'200px'`) or a number treated as pixels.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: sportsData,
  popupHeight: '200px'
});
atcObj.appendTo('#atc');
```

---

### popupWidth
**Type:** `string | number` | **Default:** `'100%'`

Width of the suggestion popup. Defaults to the component's width.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: sportsData,
  popupWidth: '400px'
});
atcObj.appendTo('#atc');
```

---

### query
**Type:** `Query` | **Default:** `null`

A `Query` object executed along with data processing. Use to filter, sort, or limit remote data fetches.

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const atcObj: AutoComplete = new AutoComplete({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  }),
  query: new Query().from('Customers').select(['ContactName', 'CustomerID']).take(6),
  fields: { value: 'ContactName' },
  placeholder: 'Find a customer'
});
atcObj.appendTo('#atc');
```

---

### readonly
**Type:** `boolean` | **Default:** `false`

When `true`, the user cannot interact with the component. The current value is displayed but cannot be changed.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  value: 'Cricket',
  readonly: true
});
atcObj.appendTo('#atc');
```

---

### showClearButton
**Type:** `boolean` | **Default:** `true`

Shows a ✕ button to clear the current selection. Clicking it resets `value`, `text`, and `index` to `null`.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: sportsData,
  showClearButton: true    // default — shown by default
});
atcObj.appendTo('#atc');
```

---

### showPopupButton
**Type:** `boolean` | **Default:** `false`

When `true`, displays a dropdown arrow button on the component. Clicking it opens the suggestion popup (similar to a ComboBox).

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  showPopupButton: true
});
atcObj.appendTo('#atc');
```

---

### sortOrder
**Type:** `SortOrder` | **Default:** `null`

Specifies the sort order applied to the data source in the suggestion popup.

| Value | Description |
|---|---|
| `'None'` | No sorting applied |
| `'Ascending'` | Items sorted A → Z |
| `'Descending'` | Items sorted Z → A |

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Tennis', 'Cricket', 'Football', 'Badminton'],
  sortOrder: 'Ascending'    // renders alphabetically
});
atcObj.appendTo('#atc');
```

---

### suggestionCount
**Type:** `number` | **Default:** `20`

Limits the number of items displayed in the suggestion popup. Items beyond this count are not rendered.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: largeDataArray,
  suggestionCount: 5    // show only the first 5 matching suggestions
});
atcObj.appendTo('#atc');
```

---

### value
**Type:** `number | string | boolean | object | null` | **Default:** `null`

Gets or sets the value of the selected item in the component.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  value: 'Cricket'    // pre-selects 'Cricket'
});
atcObj.appendTo('#atc');

// Read current value
console.log(atcObj.value);

// Set programmatically
atcObj.setProperties({ value: 'Football' });
```

---

### width
**Type:** `string | number` | **Default:** `'100%'`

Width of the AutoComplete input. Defaults to the parent container width.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: sportsData,
  width: '300px'
});
atcObj.appendTo('#atc');
```

---

### zIndex
**Type:** `number` | **Default:** `1000`

Specifies the z-index of the popup element. Increase to stack the popup above other overlapping elements.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: sportsData,
  zIndex: 2000
});
atcObj.appendTo('#atc');
```

---

## Methods

### addEventListener
**Signature:** `addEventListener(eventName: string, handler: Function): void`

Adds a handler to the specified event listener.

```typescript
atcObj.addEventListener('change', (args: ChangeEventArgs) => {
  console.log('Value:', args.value);
});
```

---

### addItem
**Signature:** `addItem(items: Object[] | Object | string | boolean | number | string[] | boolean[] | number[], itemIndex?: number): void`

Adds one or more items to the suggestion popup list. By default appends to the end; use `itemIndex` to insert at a specific position.

```typescript
// Append a single item
atcObj.addItem('Hockey');

// Insert at index 1
atcObj.addItem('Rugby', 1);

// Append multiple items
atcObj.addItem(['Volleyball', 'Swimming']);

// Add object items
atcObj.addItem({ Name: 'Denmark', Code: 'DK' });
```

---

### appendTo
**Signature:** `appendTo(selector?: string | HTMLElement): void`

Appends the component to the target HTML element.

```typescript
atcObj.appendTo('#atc');

// Or pass an element reference directly
const el = document.getElementById('atc')!;
atcObj.appendTo(el);
```

---

### clear
**Signature:** `clear(): void`

Clears the current value from the input. Sets `value` to `null`.

```typescript
atcObj.clear();
// atcObj.value === null
```

---

### dataBind
**Signature:** `dataBind(): void`

Applies all pending property changes immediately to the component.

```typescript
atcObj.dataSource = newData;
atcObj.dataBind();    // force immediate update
```

---

### destroy
**Signature:** `destroy(): void`

Removes the component from the DOM and detaches all related event handlers. Restores the original element.

```typescript
atcObj.destroy();
```

---

### disableItem
**Signature:** `disableItem(item: string | number | object | HTMLLIElement): void`

Programmatically disables a specific item in the suggestion popup so it cannot be selected.

```typescript
// Disable by value/text
atcObj.disableItem('Cricket');

// Disable by data object
atcObj.disableItem({ Name: 'Cricket', Code: 'CR' });
```

---

### filter
**Signature:** `filter(dataSource: Object[] | DataManager | string[] | number[] | boolean[], query?: Query, fields?: FieldSettingsModel): void`

Programmatically filters the data source with an optional query and field mapping. Useful for custom filtering logic outside of the `filtering` event.

```typescript
import { Query } from '@syncfusion/ej2-data';

const query: Query = new Query().where('Name', 'startswith', 'C', true);
atcObj.filter(countryData, query, { value: 'Name' });
```

---

### focusIn
**Signature:** `focusIn(): void`

Moves keyboard focus to the component.

```typescript
atcObj.focusIn();
```

---

### focusOut
**Signature:** `focusOut(): void`

Removes keyboard focus from the component.

```typescript
atcObj.focusOut();
```

---

### getDataByValue
**Signature:** `getDataByValue(value: string | number | boolean): { [key: string]: Object } | string | number | boolean`

Returns the data object from the data source that matches the given value.

```typescript
const item = atcObj.getDataByValue('Australia');
// Returns: { Name: 'Australia', Code: 'AU' }

const selectedData = atcObj.getDataByValue(atcObj.value as string);
```

---

### getItems
**Signature:** `getItems(): Element[]`

Returns all rendered `<li>` elements in the suggestion popup. Requires the popup to have been opened at least once.

```typescript
const allItems: Element[] = atcObj.getItems();
console.log('Total rendered items:', allItems.length);
```

---

### getRootElement
**Signature:** `getRootElement(): HTMLElement`

Returns the root HTML element of the component.

```typescript
const root: HTMLElement = atcObj.getRootElement();
root.style.border = '1px solid blue';
```

---

### hidePopup
**Signature:** `hidePopup(e?: MouseEvent | KeyboardEventArgs | TouchEvent): void`

Closes the suggestion popup if it is open.

```typescript
atcObj.hidePopup();
```

---

### hideSpinner
**Signature:** `hideSpinner(): void`

Hides the loading spinner and restores the normal input state.

```typescript
atcObj.hideSpinner();
```

---

### refresh
**Signature:** `refresh(): void`

Applies all pending property changes and re-renders the component.

```typescript
atcObj.dataSource = updatedData;
atcObj.refresh();
```

---

### removeEventListener
**Signature:** `removeEventListener(eventName: string, handler: Function): void`

Removes a previously added event handler.

```typescript
const handler = (args: ChangeEventArgs) => { console.log(args.value); };
atcObj.addEventListener('change', handler);
// Later, remove it
atcObj.removeEventListener('change', handler);
```

---

### showPopup
**Signature:** `showPopup(e?: MouseEvent | KeyboardEventArgs | TouchEvent): void`

Searches the entered text and shows matching items in the suggestion popup. If the input is empty, opens the full list (subject to `minLength` and `suggestionCount`).

```typescript
atcObj.showPopup();
```

---

### showSpinner
**Signature:** `showSpinner(): void`

Displays a loading spinner inside the component. Call `hideSpinner()` when the async operation completes.

```typescript
atcObj.showSpinner();
// ... async operation ...
atcObj.hideSpinner();
```

---

### Inject
**Signature:** `AutoComplete.Inject(...moduleList: Function[]): void`

Dynamically injects required feature modules into the component. Must be called before instantiation.

```typescript
import { AutoComplete, VirtualScroll } from '@syncfusion/ej2-dropdowns';

// Inject VirtualScroll module before using enableVirtualization
AutoComplete.Inject(VirtualScroll);

const atcObj: AutoComplete = new AutoComplete({
  dataSource: largeDataArray,
  enableVirtualization: true
});
atcObj.appendTo('#atc');
```

---

## Events

### actionBegin
**Type:** `EmitType<Object>`

Fires before data is fetched from a remote server.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: remoteData,
  fields: { value: 'ContactName' },
  actionBegin: () => { console.log('Remote fetch started'); }
});
atcObj.appendTo('#atc');
```

---

### actionComplete
**Type:** `EmitType<Object>`

Fires after data is successfully fetched from the remote server.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: remoteData,
  fields: { value: 'ContactName' },
  actionComplete: (args: Object) => { console.log('Data loaded:', args); }
});
atcObj.appendTo('#atc');
```

---

### actionFailure
**Type:** `EmitType<Object>`

Fires when the remote data fetch request fails.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: remoteData,
  fields: { value: 'ContactName' },
  actionFailure: (args: Object) => { console.error('Data fetch failed:', args); }
});
atcObj.appendTo('#atc');
```

---

### beforeOpen
**Type:** `EmitType<Object>`

Fires before the suggestion popup opens.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  beforeOpen: () => { console.log('Popup about to open'); }
});
atcObj.appendTo('#atc');
```

---

### blur
**Type:** `EmitType<Object>`

Fires when focus moves out of the component.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  blur: () => { console.log('AutoComplete lost focus'); }
});
atcObj.appendTo('#atc');
```

---

### change
**Type:** `EmitType<ChangeEventArgs>`

Fires when an item in the popup is selected or when the model value is changed by the user.

```typescript
import { AutoComplete, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

const atcObj: AutoComplete = new AutoComplete({
  dataSource: sportsData,
  fields: { value: 'sport' },
  change: (args: ChangeEventArgs) => {
    console.log('Value:',          args.value);
    console.log('Item data:',      args.itemData);
    console.log('Previous value:', args.previousValue);
  }
});
atcObj.appendTo('#atc');
```

---

### close
**Type:** `EmitType<PopupEventArgs>`

Fires when the suggestion popup closes.

```typescript
import { AutoComplete, PopupEventArgs } from '@syncfusion/ej2-dropdowns';

const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  close: (args: PopupEventArgs) => { console.log('Popup closed'); }
});
atcObj.appendTo('#atc');
```

---

### created
**Type:** `EmitType<Object>`

Fires once when the component is created and rendered.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  created: () => { console.log('AutoComplete is ready'); }
});
atcObj.appendTo('#atc');
```

---

### customValueSpecifier
**Type:** `EmitType<CustomValueSpecifierEventArgs>`

Fires when the user commits a value that does not exist in the data source (requires `allowCustom: true`). Use this event to format or enrich the custom value before it is stored.

```typescript
import { AutoComplete, CustomValueSpecifierEventArgs } from '@syncfusion/ej2-dropdowns';

const atcObj: AutoComplete = new AutoComplete({
  dataSource: [{ Name: 'Australia', Code: 'AU' }],
  fields: { value: 'Name' },
  allowCustom: true,
  customValueSpecifier: (args: CustomValueSpecifierEventArgs) => {
    args.item = {
      Name: args.text,
      Code: args.text.toUpperCase().slice(0, 2)
    };
  }
});
atcObj.appendTo('#atc');
```

---

### dataBound
**Type:** `EmitType<Object>`

Fires when the data source is populated in the suggestion popup list.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: remoteData,
  fields: { value: 'ContactName' },
  dataBound: () => { console.log('Popup data ready'); }
});
atcObj.appendTo('#atc');
```

---

### destroyed
**Type:** `EmitType<Object>`

Fires when the component is destroyed via `destroy()`.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  destroyed: () => { console.log('AutoComplete destroyed'); }
});
atcObj.appendTo('#atc');
```

---

### filtering
**Type:** `EmitType<FilteringEventArgs>`

Fires on each keystroke as the user types into the input. Use to implement custom filter logic or remote queries.

```typescript
import { AutoComplete, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

const sports: string[] = ['Badminton', 'Basketball', 'Cricket', 'Football'];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: sports,
  filtering: (args: FilteringEventArgs) => {
    let query: Query = new Query();
    if (args.text !== '') {
      query = query.where('', 'startswith', args.text, true);
    }
    args.updateData(sports, query);
  }
});
atcObj.appendTo('#atc');
```

**`FilteringEventArgs` properties:**

| Property | Type | Description |
|---|---|---|
| `text` | `string` | The typed text in the input |
| `updateData` | `Function` | Call with `(dataSource, query?, fields?)` to update popup |
| `cancel` | `boolean` | Set to `true` to abort the filter operation |

---

### focus
**Type:** `EmitType<Object>`

Fires when the component receives focus.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  focus: () => { console.log('AutoComplete focused'); }
});
atcObj.appendTo('#atc');
```

---

### open
**Type:** `EmitType<PopupEventArgs>`

Fires when the suggestion popup opens.

```typescript
import { AutoComplete, PopupEventArgs } from '@syncfusion/ej2-dropdowns';

const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  open: (args: PopupEventArgs) => { console.log('Popup opened'); }
});
atcObj.appendTo('#atc');
```

---

### resizeStart
**Type:** `EmitType<Object>`

Fires when the user starts resizing the popup. Requires `allowResize: true`.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: sportsData,
  allowResize: true,
  resizeStart: () => { console.log('Popup resize started'); }
});
atcObj.appendTo('#atc');
```

---

### resizeStop
**Type:** `EmitType<Object>`

Fires when the user finishes resizing the popup. Requires `allowResize: true`.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: sportsData,
  allowResize: true,
  resizeStop: () => { console.log('Popup resize complete'); }
});
atcObj.appendTo('#atc');
```

---

### resizing
**Type:** `EmitType<Object>`

Fires continuously while the popup is being resized. Provides live width and height updates. Requires `allowResize: true`.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: sportsData,
  allowResize: true,
  resizing: (args: Object) => { console.log('Resizing:', args); }
});
atcObj.appendTo('#atc');
```

---

### select
**Type:** `EmitType<SelectEventArgs>`

Fires when an item in the suggestion popup is selected by the user via mouse, tap, or keyboard navigation.

```typescript
import { AutoComplete, SelectEventArgs } from '@syncfusion/ej2-dropdowns';

const atcObj: AutoComplete = new AutoComplete({
  dataSource: sportsData,
  fields: { value: 'sport' },
  select: (args: SelectEventArgs) => {
    console.log('Item selected:', args.itemData);
  }
});
atcObj.appendTo('#atc');
```
