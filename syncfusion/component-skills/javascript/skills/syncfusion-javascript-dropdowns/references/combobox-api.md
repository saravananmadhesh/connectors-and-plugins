# Full API Reference — Syncfusion TypeScript ComboBox

## Table of Contents
- [Properties](#properties)
  - [actionFailureTemplate](#actionfailuretemplate)
  - [allowCustom](#allowcustom)
  - [allowFiltering](#allowfiltering)
  - [allowObjectBinding](#allowobjectbinding)
  - [allowResize](#allowresize)
  - [autofill](#autofill)
  - [cssClass](#cssclass)
  - [dataSource](#datasource)
  - [debounceDelay](#debouncedelay)
  - [enablePersistence](#enablepersistence)
  - [enableRtl](#enablertl)
  - [enabled](#enabled)
  - [enableVirtualization](#enablevirtualization)
  - [fields](#fields)
  - [filterType](#filtertype)
  - [floatLabelType](#floatlabeltype)
  - [footerTemplate](#footertemplate)
  - [groupTemplate](#grouptemplate)
  - [headerTemplate](#headertemplate)
  - [htmlAttributes](#htmlattributes)
  - [ignoreAccent](#ignoreaccent)
  - [ignoreCase](#ignorecase)
  - [index](#index)
  - [isDeviceFullScreen](#isdevicefullscreen)
  - [itemTemplate](#itemtemplate)
  - [locale](#locale)
  - [noRecordsTemplate](#norecordstemplate)
  - [placeholder](#placeholder)
  - [popupHeight](#popupheight)
  - [popupWidth](#popupwidth)
  - [query](#query)
  - [readonly](#readonly)
  - [showClearButton](#showclearbutton)
  - [sortOrder](#sortorder)
  - [text](#text)
  - [value](#value)
  - [width](#width)
  - [zIndex](#zindex)
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
- [Interfaces](#interfaces)
  - [CustomValueSpecifierEventArgs](#customvaluespecifiereventargs-interface)

---

## Properties

### actionFailureTemplate
**Type:** `string | Function` | **Default:** `'Request failed'`

Template content shown in the popup when a remote data fetch request fails.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: remoteData,
  fields: { text: 'ContactName', value: 'CustomerID' },
  actionFailureTemplate: '<div class="error">Failed to load data. Please retry.</div>'
});
comboBox.appendTo('#combo-element');
```

---

### allowCustom
**Type:** `boolean` | **Default:** `true`

Specifies whether the component allows user-defined values which do not exist in the data source. When `true`, the user can type any value; when `false`, only items from the list can be selected.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  allowCustom: false    // rejects values not in the list
});
comboBox.appendTo('#combo-element');
```

---

### allowFiltering
**Type:** `boolean` | **Default:** `false`

When `true`, the user can type in the input to filter the dropdown list. The `filtering` event fires on each keystroke for custom filter logic.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  allowFiltering: true,
  placeholder: 'Search a sport'
});
comboBox.appendTo('#combo-element');
```

---

### allowObjectBinding
**Type:** `boolean` | **Default:** `false`

When `true`, `comboBox.value` returns the full selected data object rather than just the primitive value field.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: [{ id: 1, name: 'Engineering' }, { id: 2, name: 'Design' }],
  fields: { text: 'name', value: 'id' },
  allowObjectBinding: true
});
comboBox.appendTo('#combo-element');
// comboBox.value === { id: 1, name: 'Engineering' }
```

---

### allowResize
**Type:** `boolean` | **Default:** `false`

When `true`, a resize handle appears in the bottom-right corner of the popup, allowing the user to resize the popup width and height.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  allowResize: true
});
comboBox.appendTo('#combo-element');
```

---

### autofill
**Type:** `boolean` | **Default:** `false`

When `true`, the ComboBox suggests the first matching item inline in the input as the user types, auto-selecting the completion portion. No action happens when no matches are found.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: ['Badminton', 'Basketball', 'Cricket'],
  autofill: true
});
comboBox.appendTo('#combo-element');
```

---

### cssClass
**Type:** `string` | **Default:** `null`

Adds CSS class(es) to the root element for custom styling.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  cssClass: 'custom-combo e-outline'
});
comboBox.appendTo('#combo-element');
```

---

### dataSource
**Type:** `Object[] | DataManager | string[] | number[] | boolean[]` | **Default:** `[]`

The data source for the dropdown list. Accepts local arrays or a remote `DataManager` instance.

```typescript
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

// Local array
const comboBox: ComboBox = new ComboBox({
  dataSource: ['Cricket', 'Football', 'Tennis']
});

// Remote DataManager
const comboBox2: ComboBox = new ComboBox({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor()
  }),
  fields: { text: 'ContactName', value: 'CustomerID' }
});
```

---

### debounceDelay
**Type:** `number` | **Default:** `300`

Specifies the delay in milliseconds between the user's last keystroke and the execution of the filter operation. Increase to reduce server request frequency for remote filtering.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: remoteData,
  allowFiltering: true,
  debounceDelay: 500    // wait 500ms after last keystroke before filtering
});
comboBox.appendTo('#combo-element');
```

---

### enablePersistence
**Type:** `boolean` | **Default:** `false`

When `true`, the component persists its `value` state across page reloads using browser storage.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  enablePersistence: true
});
comboBox.appendTo('#combo-element');
```

---

### enableRtl
**Type:** `boolean` | **Default:** `false`

When `true`, renders the component in right-to-left direction for RTL language support.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  enableRtl: true
});
comboBox.appendTo('#combo-element');
```

---

### enabled
**Type:** `boolean` | **Default:** `true`

Specifies whether the component is enabled. When `false`, the component is visually dimmed and all interactions are disabled.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  enabled: false    // renders as disabled
});
comboBox.appendTo('#combo-element');

// Toggle at runtime
comboBox.setProperties({ enabled: true });
```

---

### enableVirtualization
**Type:** `boolean` | **Default:** `false`

⚠️ **Requires:** `ComboBox.Inject(VirtualScroll)` before instantiation.

Enables virtual scrolling for large datasets. Only visible items are rendered in the DOM.

```typescript
import { ComboBox, VirtualScroll } from '@syncfusion/ej2-dropdowns';

ComboBox.Inject(VirtualScroll);

const comboBox: ComboBox = new ComboBox({
  dataSource: largeDataArray,
  enableVirtualization: true
});
comboBox.appendTo('#combo-element');
```

---

### fields
**Type:** `FieldSettingsModel` | **Default:** `{ text: null, value: null, iconCss: null, groupBy: null, disabled: null }`

Maps object keys in the data source to the ComboBox's internal roles.

| Key | Purpose |
|---|---|
| `text` | Display label shown in input and dropdown |
| `value` | Internal value stored on selection |
| `groupBy` | Category grouping header |
| `disabled` | Marks item as non-selectable |
| `iconCss` | CSS class for item icon |

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: [{ id: '1', sport: 'Cricket', type: 'Outdoor' }],
  fields: { text: 'sport', value: 'id', groupBy: 'type' }
});
comboBox.appendTo('#combo-element');
```

---

### filterType
**Type:** `FilterType` | **Default:** `'StartsWith'`

Determines the filter matching strategy when `allowFiltering` is `true`.

| Value | Description |
|---|---|
| `'StartsWith'` | Matches items beginning with the typed text (default) |
| `'EndsWith'` | Matches items ending with the typed text |
| `'Contains'` | Matches items containing the typed text anywhere |

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  allowFiltering: true,
  filterType: 'Contains'    // match anywhere in the item text
});
comboBox.appendTo('#combo-element');
```

---

### floatLabelType
**Type:** `FloatLabelType` | **Default:** `'Never'`

Controls the floating label behavior. Values: `'Never'` | `'Always'` | `'Auto'`.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  floatLabelType: 'Auto',
  placeholder: 'Select a sport'
});
comboBox.appendTo('#combo-element');
```

---

### footerTemplate
**Type:** `string | Function` | **Default:** `null`

Template for the popup footer. Accepts an HTML string or a template function.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  footerTemplate: '<div class="footer">Total: ' + sportsData.length + ' items</div>'
});
comboBox.appendTo('#combo-element');
```

---

### groupTemplate
**Type:** `string | Function` | **Default:** `null`

Template for group header items in the popup list. Use when `fields.groupBy` is set.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: vegData,
  fields: { text: 'vegetable', value: 'vegetable', groupBy: 'category' },
  groupTemplate: '<strong>${category}</strong>'
});
comboBox.appendTo('#combo-element');
```

---

### headerTemplate
**Type:** `string | Function` | **Default:** `null`

Template for the popup header. Accepts an HTML string or a template function.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  headerTemplate: '<div class="header"><b>Available Sports</b></div>'
});
comboBox.appendTo('#combo-element');
```

---

### htmlAttributes
**Type:** `{ [key: string]: string }` | **Default:** `{}`

Adds extra HTML attributes to the underlying `<input>` element.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  htmlAttributes: { title: 'Sport selector', name: 'sport', tabindex: '2' }
});
comboBox.appendTo('#combo-element');
```

---

### ignoreAccent
**Type:** `boolean` | **Default:** `false`

When `true`, ignores diacritic characters (accents) during filtering. For example, typing `"cafe"` matches `"café"`.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: ['café', 'naïve', 'résumé'],
  allowFiltering: true,
  ignoreAccent: true
});
comboBox.appendTo('#combo-element');
```

---

### ignoreCase
**Type:** `boolean` | **Default:** `true`

When `true` (default), filtering is case-insensitive. Set to `false` to require exact case matching.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  allowFiltering: true,
  ignoreCase: false    // 'cricket' will NOT match 'Cricket'
});
comboBox.appendTo('#combo-element');
```

---

### index
**Type:** `number | null` | **Default:** `null`

Gets or sets the zero-based index of the selected item.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  index: 2               // selects the third item
});
comboBox.appendTo('#combo-element');

// Read
console.log(comboBox.index);

// Set programmatically
comboBox.setProperties({ index: 0 });
```

---

### isDeviceFullScreen
**Type:** `boolean` | **Default:** `true`

When `true`, the popup opens fullscreen on mobile devices when `allowFiltering` is enabled. Set to `false` for consistent popup behavior across devices.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  allowFiltering: true,
  isDeviceFullScreen: false    // same popup on mobile and desktop
});
comboBox.appendTo('#combo-element');
```

---

### itemTemplate
**Type:** `string | Function` | **Default:** `null`

Template for each list item in the popup. Use to customize how items are rendered.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  fields: { text: 'sport', value: 'id' },
  itemTemplate: '<span class="sport-item"><i class="e-icons"></i> ${sport}</span>'
});
comboBox.appendTo('#combo-element');
```

---

### locale
**Type:** `string` | **Default:** `'en-US'`

Overrides the global culture and localization value for this component. Affects built-in strings such as `noRecordsTemplate` and `actionFailureTemplate`.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  locale: 'fr-FR'
});
comboBox.appendTo('#combo-element');
```

---

### noRecordsTemplate
**Type:** `string | Function` | **Default:** `'No records found'`

Template content shown in the popup when no items match the filter or the data source is empty.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  allowFiltering: true,
  noRecordsTemplate: '<span class="no-data">No matching sport found</span>'
});
comboBox.appendTo('#combo-element');
```

---

### placeholder
**Type:** `string` | **Default:** `null`

Hint text shown in the input when no value is selected.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  placeholder: 'Select or type a sport'
});
comboBox.appendTo('#combo-element');
```

---

### popupHeight
**Type:** `string | number` | **Default:** `'300px'`

Height of the dropdown popup list. Accepts a CSS string or a number (treated as px).

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  popupHeight: '200px'
});
comboBox.appendTo('#combo-element');
```

---

### popupWidth
**Type:** `string | number` | **Default:** `'100%'`

Width of the dropdown popup. Defaults to the component's width.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  popupWidth: '400px'
});
comboBox.appendTo('#combo-element');
```

---

### query
**Type:** `Query` | **Default:** `null`

A `Query` object that executes along with data processing. Use to filter, sort, or limit remote data fetches.

```typescript
import { Query } from '@syncfusion/ej2-data';

const comboBox: ComboBox = new ComboBox({
  dataSource: remoteData,
  fields: { text: 'FirstName', value: 'EmployeeID' },
  query: new Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount()
});
comboBox.appendTo('#combo-element');
```

---

### readonly
**Type:** `boolean` | **Default:** `false`

When `true`, the user cannot interact with the component. The current value is displayed but cannot be changed.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  value: 'Cricket',
  readonly: true
});
comboBox.appendTo('#combo-element');
```

---

### showClearButton
**Type:** `boolean` | **Default:** `true`

Shows a ✕ button to clear the current selection. Clicking it resets `value`, `text`, and `index` to `null`.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  showClearButton: true    // default
});
comboBox.appendTo('#combo-element');
```

---

### sortOrder
**Type:** `SortOrder` | **Default:** `null`

Specifies the sort order for the data source in the popup.

| Value | Description |
|---|---|
| `'None'` | No sorting applied |
| `'Ascending'` | Items sorted A → Z |
| `'Descending'` | Items sorted Z → A |

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: ['Tennis', 'Cricket', 'Football', 'Badminton'],
  sortOrder: 'Ascending'    // renders alphabetically
});
comboBox.appendTo('#combo-element');
```

---

### text
**Type:** `string | null` | **Default:** `null`

Gets or sets the display text of the selected item.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  fields: { text: 'sport', value: 'id' },
  text: 'Cricket'    // selects item where sport === 'Cricket'
});
comboBox.appendTo('#combo-element');

// Read
console.log(comboBox.text);

// Set programmatically
comboBox.setProperties({ text: 'Football' });
```

---

### value
**Type:** `number | string | boolean | object | null` | **Default:** `null`

Gets or sets the value of the selected item.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  fields: { text: 'sport', value: 'id' },
  value: '3'    // selects item where id === '3'
});
comboBox.appendTo('#combo-element');

// Read
console.log(comboBox.value);

// Set programmatically
comboBox.setProperties({ value: '1' });
```

---

### width
**Type:** `string | number` | **Default:** `'100%'`

Width of the ComboBox input. Defaults to the parent container width.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  width: '300px'
});
comboBox.appendTo('#combo-element');
```

---

### zIndex
**Type:** `number` | **Default:** `1000`

Specifies the z-index of the popup element. Increase to stack the popup above other overlapping elements.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  zIndex: 2000
});
comboBox.appendTo('#combo-element');
```

---

## Events

### actionBegin
**Type:** `EmitType<Object>`

Fires before data is fetched from a remote server.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: remoteData,
  fields: { text: 'ContactName', value: 'CustomerID' },
  actionBegin: () => { console.log('Remote fetch started'); }
});
comboBox.appendTo('#combo-element');
```

---

### actionComplete
**Type:** `EmitType<Object>`

Fires after data is successfully fetched from the remote server.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: remoteData,
  fields: { text: 'ContactName', value: 'CustomerID' },
  actionComplete: (args: Object) => { console.log('Data loaded:', args); }
});
comboBox.appendTo('#combo-element');
```

---

### actionFailure
**Type:** `EmitType<Object>`

Fires when the remote data fetch request fails.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: remoteData,
  fields: { text: 'ContactName', value: 'CustomerID' },
  actionFailure: (args: Object) => { console.error('Data fetch failed:', args); }
});
comboBox.appendTo('#combo-element');
```

---

### beforeOpen
**Type:** `EmitType<Object>`

Fires before the popup opens.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  beforeOpen: () => { console.log('Popup about to open'); }
});
comboBox.appendTo('#combo-element');
```

---

### blur
**Type:** `EmitType<Object>`

Fires when focus moves out of the component.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  blur: () => { console.log('ComboBox lost focus'); }
});
comboBox.appendTo('#combo-element');
```

---

### change
**Type:** `EmitType<ChangeEventArgs>`

Fires when an item in the popup is selected or when the model value changes.

```typescript
import { ComboBox, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  fields: { text: 'sport', value: 'id' },
  change: (args: ChangeEventArgs) => {
    console.log('Value:', args.value);
    console.log('Item data:', args.itemData);
    console.log('Previous value:', args.previousValue);
  }
});
comboBox.appendTo('#combo-element');
```

---

### close
**Type:** `EmitType<PopupEventArgs>`

Fires when the popup closes.

```typescript
import { ComboBox, PopupEventArgs } from '@syncfusion/ej2-dropdowns';

const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  close: (args: PopupEventArgs) => { console.log('Popup closed'); }
});
comboBox.appendTo('#combo-element');
```

---

### created
**Type:** `EmitType<Object>`

Fires once when the component is created and rendered.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  created: () => { console.log('ComboBox is ready'); }
});
comboBox.appendTo('#combo-element');
```

---

### customValueSpecifier
**Type:** `EmitType<CustomValueSpecifierEventArgs>`

Fires when the user types a value that does not exist in the data source (requires `allowCustom: true`). Use to format or enrich the custom value before it is stored.

```typescript
import { ComboBox, CustomValueSpecifierEventArgs } from '@syncfusion/ej2-dropdowns';

const comboBox: ComboBox = new ComboBox({
  dataSource: [{ name: 'Cricket', id: '1' }],
  fields: { text: 'name', value: 'id' },
  allowCustom: true,
  customValueSpecifier: (args: CustomValueSpecifierEventArgs) => {
    args.item = {
      name: args.text,
      id: args.text.toLowerCase().replace(/\s+/g, '-')
    };
  }
});
comboBox.appendTo('#combo-element');
```

---

### dataBound
**Type:** `EmitType<Object>`

Fires when the data source is populated in the popup list.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: remoteData,
  fields: { text: 'ContactName', value: 'CustomerID' },
  dataBound: () => { console.log('Popup data ready'); }
});
comboBox.appendTo('#combo-element');
```

---

### destroyed
**Type:** `EmitType<Object>`

Fires when the component is destroyed via `destroy()`.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  destroyed: () => { console.log('ComboBox destroyed'); }
});
comboBox.appendTo('#combo-element');
```

---

### filtering
**Type:** `EmitType<FilteringEventArgs>`

Fires on each keystroke when `allowFiltering` is `true`. Use to implement custom filter logic or remote queries.

```typescript
import { ComboBox, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

const comboBox: ComboBox = new ComboBox({
  dataSource: countryData,
  fields: { text: 'name', value: 'code' },
  allowFiltering: true,
  filtering: (args: FilteringEventArgs) => {
    const query: Query = new Query();
    if (args.text !== '') {
      query.where('name', 'startswith', args.text, true);
    }
    args.updateData(countryData, query);
  }
});
comboBox.appendTo('#combo-element');
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
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  focus: () => { console.log('ComboBox focused'); }
});
comboBox.appendTo('#combo-element');
```

---

### open
**Type:** `EmitType<PopupEventArgs>`

Fires when the popup opens.

```typescript
import { ComboBox, PopupEventArgs } from '@syncfusion/ej2-dropdowns';

const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  open: (args: PopupEventArgs) => { console.log('Popup opened'); }
});
comboBox.appendTo('#combo-element');
```

---

### resizeStart
**Type:** `EmitType<Object>`

Fires when the user starts resizing the popup (requires `allowResize: true`).

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  allowResize: true,
  resizeStart: () => { console.log('Popup resize started'); }
});
comboBox.appendTo('#combo-element');
```

---

### resizeStop
**Type:** `EmitType<Object>`

Fires when the user finishes resizing the popup (requires `allowResize: true`).

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  allowResize: true,
  resizeStop: () => { console.log('Popup resize complete'); }
});
comboBox.appendTo('#combo-element');
```

---

### resizing
**Type:** `EmitType<Object>`

Fires continuously while the popup is being resized. Provides live width/height updates (requires `allowResize: true`).

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  allowResize: true,
  resizing: (args: Object) => { console.log('Resizing:', args); }
});
comboBox.appendTo('#combo-element');
```

---

### select
**Type:** `EmitType<SelectEventArgs>`

Fires when an item in the popup is selected by the user via mouse, tap, or keyboard navigation.

```typescript
import { ComboBox, SelectEventArgs } from '@syncfusion/ej2-dropdowns';

const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  fields: { text: 'sport', value: 'id' },
  select: (args: SelectEventArgs) => {
    console.log('Item selected:', args.itemData);
  }
});
comboBox.appendTo('#combo-element');
```

---

## Methods

### addEventListener
**Signature:** `addEventListener(eventName: string, handler: Function): void`

Adds a handler to the specified event listener.

```typescript
comboBox.addEventListener('change', (args: ChangeEventArgs) => {
  console.log('Value:', args.value);
});
```

---

### addItem
**Signature:** `addItem(items: Object[] | Object | string | boolean | number | string[] | boolean[] | number[], itemIndex?: number): void`

Adds one or more items to the popup list. By default appends to the end; use `itemIndex` to insert at a specific position.

```typescript
// Append single item
comboBox.addItem({ sport: 'Hockey', id: '6' });

// Insert at index 1
comboBox.addItem({ sport: 'Rugby', id: '7' }, 1);

// Append multiple items
comboBox.addItem([
  { sport: 'Volleyball', id: '8' },
  { sport: 'Swimming',   id: '9' }
]);
```

---

### appendTo
**Signature:** `appendTo(selector?: string | HTMLElement): void`

Appends the component to the target HTML element.

```typescript
comboBox.appendTo('#combo-element');

// Or pass an element reference directly
const el = document.getElementById('combo-element')!;
comboBox.appendTo(el);
```

---

### clear
**Signature:** `clear(): void`

Clears the current selection. Sets `value` to `null`.

```typescript
comboBox.clear();
// comboBox.value === null
// comboBox.text  === null
```

---

### dataBind
**Signature:** `dataBind(): void`

Applies all pending property changes immediately to the component.

```typescript
comboBox.dataSource = newData;
comboBox.dataBind();    // force immediate update
```

---

### destroy
**Signature:** `destroy(): void`

Removes the component from the DOM and detaches all related event handlers. Restores the original element.

```typescript
comboBox.destroy();
```

---

### disableItem
**Signature:** `disableItem(item: string | number | object | HTMLLIElement): void`

Programmatically disables a specific item in the popup list so it cannot be selected.

```typescript
// Disable by display text
comboBox.disableItem('Cricket');

// Disable by data object
comboBox.disableItem({ sport: 'Cricket', id: '3' });
```

---

### filter
**Signature:** `filter(dataSource: Object[] | DataManager | string[] | number[] | boolean[], query?: Query, fields?: FieldSettingsModel): void`

Programmatically filters the data source with an optional query and field mapping.

```typescript
import { Query } from '@syncfusion/ej2-data';

const query: Query = new Query().where('sport', 'startswith', 'C', true);
comboBox.filter(sportsData, query, { text: 'sport', value: 'id' });
```

---

### focusIn
**Signature:** `focusIn(): void`

Moves keyboard focus to the component.

```typescript
comboBox.focusIn();
```

---

### focusOut
**Signature:** `focusOut(): void`

Removes keyboard focus from the component.

```typescript
comboBox.focusOut();
```

---

### getDataByValue
**Signature:** `getDataByValue(value: string | number | boolean): { [key: string]: Object } | string | number | boolean`

Returns the data object that matches the given value.

```typescript
const item = comboBox.getDataByValue('3');
// Returns: { sport: 'Cricket', id: '3' }

const selectedData = comboBox.getDataByValue(comboBox.value as string);
```

---

### getItems
**Signature:** `getItems(): Element[]`

Returns all rendered `<li>` elements in the popup list. Requires the popup to have been opened at least once.

```typescript
const allItems: Element[] = comboBox.getItems();
console.log('Total rendered items:', allItems.length);
```

---

### getRootElement
**Signature:** `getRootElement(): HTMLElement`

Returns the root HTML element of the component.

```typescript
const root: HTMLElement = comboBox.getRootElement();
root.style.border = '1px solid red';
```

---

### hidePopup
**Signature:** `hidePopup(): void`

Closes the popup if it is open. Any unmatched typed value triggers custom value logic if `allowCustom` is `true`.

```typescript
comboBox.hidePopup();
```

---

### hideSpinner
**Signature:** `hideSpinner(): void`

Hides the loading spinner and restores the dropdown button.

```typescript
comboBox.hideSpinner();
```

---

### refresh
**Signature:** `refresh(): void`

Applies all pending property changes and re-renders the component.

```typescript
comboBox.dataSource = updatedData;
comboBox.refresh();
```

---

### removeEventListener
**Signature:** `removeEventListener(eventName: string, handler: Function): void`

Removes a previously added event handler.

```typescript
const handler = (args: ChangeEventArgs) => { console.log(args.value); };
comboBox.addEventListener('change', handler);
// Later, remove it
comboBox.removeEventListener('change', handler);
```

---

### showPopup
**Signature:** `showPopup(): void`

Opens the dropdown popup programmatically.

```typescript
comboBox.showPopup();
```

---

### showSpinner
**Signature:** `showSpinner(): void`

Displays a loading spinner inside the component button area. Call `hideSpinner()` when the operation completes.

```typescript
comboBox.showSpinner();
// ... async operation ...
comboBox.hideSpinner();
```

---

## Interfaces

### CustomValueSpecifierEventArgs Interface

Passed to the `customValueSpecifier` event handler when the user types a value not in the data source.

```typescript
interface CustomValueSpecifierEventArgs {
  /**
   * The typed custom text entered by the user.
   */
  text: string;

  /**
   * Set this to define the display text and stored value for the custom entry.
   * Keys must match your fields.text and fields.value mappings.
   */
  item: { [key: string]: string | Object };
}
```

**Usage:**
```typescript
customValueSpecifier: (args: CustomValueSpecifierEventArgs) => {
  // args.text = typed string (e.g., 'Rugby')
  args.item = {
    name: args.text,             // maps to fields.text = 'name'
    id: args.text.toLowerCase()  // maps to fields.value = 'id'
  };
}
```

If `item` is left as `{}`, the ComboBox stores the raw typed string for both `text` and `value`.
