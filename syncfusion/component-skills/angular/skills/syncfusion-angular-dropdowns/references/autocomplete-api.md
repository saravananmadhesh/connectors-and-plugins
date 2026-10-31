# AutoComplete API Reference

Source: https://ej2.syncfusion.com/angular/documentation/api/auto-complete/index-default

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)

---

## Properties

### actionFailureTemplate
**Type:** `any`  
**Default:** `'Request failed'`

Accepts a template string and assigns it to the popup list content when a remote data fetch request fails.

---

### allowCustom
**Type:** `boolean`  
**Default:** `true`

Specifies whether the component allows user-defined values that do not exist in the data source.

---

### allowObjectBinding
**Type:** `boolean`  
**Default:** `false`

When `true`, the `value` property holds the complete matched data object instead of just the value string.

```typescript
// allowObjectBinding = true → value is the full object
public value = { id: 'id11', text: 'Item 11' };
```

---

### allowResize
**Type:** `boolean`  
**Default:** `false`

When `true`, a resize handle appears in the bottom-right corner of the popup, allowing users to resize its width and height. Resized dimensions are retained across sessions.

---

### autofill
**Type:** `boolean`  
**Default:** `false`

When `true`, the first matched item is suggested inline in the input as the user types. If no match is found, nothing happens.

---

### cssClass
**Type:** `string`  
**Default:** `null`

Sets CSS class(es) on the root element of the component for visual customization.

```html
<ejs-autocomplete cssClass="my-custom-class"></ejs-autocomplete>
```

---

### dataSource
**Type:** `{ [key: string]: Object }[] | DataManager | string[] | number[] | boolean[]`  
**Default:** `[]`

Accepts list items via a local array or a remote `DataManager` instance.

---

### debounceDelay
**Type:** `number`  
**Default:** `300`

Delay in milliseconds applied before the filtering operation fires. Reduces remote API request frequency while the user is typing. Set to `0` to disable.

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

When `true`, persists the component's `value` state across page reloads using browser storage.

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

When `true`, renders the component in right-to-left direction.

---

### enableVirtualization
**Type:** `boolean`  
**Default:** `false`

When `true`, enables virtual scrolling for large datasets. Only a fixed number of DOM elements are created and recycled as the user scrolls. Requires injecting the `VirtualScroll` module.

```typescript
import { AutoCompleteComponent, VirtualScroll } from '@syncfusion/ej2-angular-dropdowns';
AutoCompleteComponent.Inject(VirtualScroll);
```

---

### enabled
**Type:** `boolean`  
**Default:** `true`

When `false`, the component is disabled and user interactions are prevented.

---

### fields
**Type:** `FieldSettingsModel`  
**Default:** `{ value: null, iconCss: null, groupBy: null }`

Maps data source columns to the component:

| Sub-field | Description |
|-----------|-------------|
| `value` | Column used as suggestion text and selected value |
| `text` | Column used as display text (alternative to `value`) |
| `iconCss` | Column containing CSS class names for icons |
| `groupBy` | Column used to group items under category headers |
| `disabled` | Column indicating item disabled state |

```typescript
public fields = { value: 'Name', iconCss: 'Icon', groupBy: 'Category' };
```

---

### filterType
**Type:** `FilterType`  
**Default:** `'Contains'`

Determines the matching strategy used when filtering:

| Value | Behavior |
|-------|----------|
| `'StartsWith'` | Matches items beginning with typed text |
| `'EndsWith'` | Matches items ending with typed text |
| `'Contains'` | Matches items containing typed text |

---

### floatLabelType
**Type:** `FloatLabelType`  
**Default:** `'Never'`

Controls floating label behavior:

| Value | Behavior |
|-------|----------|
| `'Never'` | Label never floats (stays as placeholder) |
| `'Always'` | Label always floats above input |
| `'Auto'` | Label floats after focusing or entering a value |

---

### footerTemplate
**Type:** `any`  
**Default:** `null`

Template for custom content at the bottom of the popup list.

---

### groupTemplate
**Type:** `any`  
**Default:** `null`

Template for customizing group header content. Applies to both inline and fixed group headers.

---

### headerTemplate
**Type:** `any`  
**Default:** `null`

Template for custom static content at the top of the popup list.

---

### highlight
**Type:** `boolean`  
**Default:** `false`

When `true`, matched characters in suggestion items are wrapped with the `.e-highlight` CSS class.

---

### htmlAttributes
**Type:** `{ [key: string]: string }`  
**Default:** `{}`

Allows additional HTML attributes (e.g., `title`, `name`, `maxlength`) to be set on the input element.

```typescript
public htmlAttributes = { name: 'country', maxlength: '50', title: 'AutoComplete' };
```

---

### ignoreAccent
**Type:** `boolean`  
**Default:** —

When `true`, filtering ignores diacritic characters (accents). For example, `aero` matches `Aeróbics`.

---

### ignoreCase
**Type:** `boolean`  
**Default:** `true`

When `false`, filtering is case-sensitive. By default (`true`), filtering is case-insensitive.

---

### isDeviceFullScreen
**Type:** `boolean`  
**Default:** `true`

When `true`, the popup opens in full-screen mode on mobile devices. Set to `false` for consistent popup behavior across desktop and mobile.

---

### itemTemplate
**Type:** `any`  
**Default:** `null`

Template for customizing each suggestion item's rendered content.

---

### locale
**Type:** `string`  
**Default:** `'en-US'`

Sets the culture/language for localizable strings (`noRecordsTemplate`, `actionFailureTemplate`). Use with `L10n.load()` from `@syncfusion/ej2-base`.

---

### minLength
**Type:** `number`  
**Default:** `1`

Minimum number of characters the user must type before filtering begins.

---

### noRecordsTemplate
**Type:** `any`  
**Default:** `'No records found'`

Template displayed in the popup when no suggestions match the typed text.

---

### placeholder
**Type:** `string`  
**Default:** `null`

Short hint text displayed inside the input when no value is entered.

---

### popupHeight
**Type:** `string | number`  
**Default:** `'300px'`

Controls the height of the suggestion popup list.

---

### popupWidth
**Type:** `string | number`  
**Default:** `'100%'`

Controls the width of the suggestion popup list. Defaults to match the input width.

---

### query
**Type:** `Query`  
**Default:** `null`

Accepts an external `Query` instance for filtering and shaping remote data requests.

---

### readonly
**Type:** `boolean`  
**Default:** `false`

When `true`, user interaction (typing) is prevented, but the current value is still displayed.

---

### showClearButton
**Type:** `boolean`  
**Default:** `true`

When `true`, shows a clear (✕) button. Clicking it resets `value`, `text`, and `index` to `null`.

---

### showPopupButton
**Type:** `boolean`  
**Default:** `false`

When `true`, shows a button to toggle the popup open/closed (like a dropdown).

---

### sortOrder
**Type:** `SortOrder`  
**Default:** `null`

Sorts the suggestion list:

| Value | Behavior |
|-------|----------|
| `'None'` | No sorting (default) |
| `'Ascending'` | A → Z |
| `'Descending'` | Z → A |

---

### suggestionCount
**Type:** `number`  
**Default:** `20`

Maximum number of items shown in the suggestion popup.

---

### value
**Type:** `number | string | boolean | object | null`  
**Default:** `null`

Gets or sets the currently selected/typed value. Supports two-way binding with `[(value)]`.

---

### width
**Type:** `string | number`  
**Default:** `'100%'`

Sets the width of the component input element.

---

### zIndex
**Type:** `number`  
**Default:** `1000`

Sets the z-index of the popup element (controls stacking order).

---

## Methods

### addItem
Adds a new item to the suggestion list. Appends to the end by default, or inserts at the specified index.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `items` | `{ [key: string]: Object }[] \| string \| boolean \| number \| string[] \| boolean[] \| number[]` | Item(s) to add |
| `itemIndex` (optional) | `number` | Index at which to insert the new item |

**Returns:** `void`

```typescript
this.autoObj.addItem('Volleyball' as any);
this.autoObj.addItem({ Id: 'G10', Game: 'Volleyball' } as any, 2);
```

---

### clear
Clears the currently selected value from the component.

**Returns:** `void`

```typescript
this.autoObj.clear();
```

---

### destroy
Removes the component from the DOM and detaches all event handlers, attributes, and classes.

**Returns:** `void`

---

### disableItem
Disables a specific item in the popup list. Only one item at a time; iterate to disable multiple.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `item` | `string \| number \| object \| HTMLLIElement` | Item to disable (value, index, or element) |

**Returns:** `void`

```typescript
this.autoObj.disableItem('On Hold');  // Disable by value
this.autoObj.disableItem(2);          // Disable by index
```

---

### filter
Filters data from a given data source using a query.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `dataSource` | `{ [key: string]: Object }[] \| DataManager \| string[] \| number[] \| boolean[]` | Data source to filter |
| `query` (optional) | `Query` | Filter query |
| `fields` (optional) | `FieldSettingsModel` | Fields mapping |

**Returns:** `void`

---

### focusIn
Sets focus to the component.

**Returns:** `void`

```typescript
this.autoObj.focusIn();
```

---

### focusOut
Moves focus away from the component.

**Returns:** `void`

---

### getDataByValue
Returns the data object that matches the given value.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `string \| number \| boolean` | Value to search for |

**Returns:** `{ [key: string]: Object } | string | number | boolean`

```typescript
const item = this.autoObj.getDataByValue('Cricket');
```

---

### getItems
Returns all currently rendered list item elements in the popup.

**Returns:** `Element[]`

```typescript
const count = this.autoObj.getItems().length;
```

---

### hidePopup
Closes the popup if it is open.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `e` (optional) | `MouseEvent \| KeyboardEvent \| TouchEvent` | The triggering event |

**Returns:** `void`

---

### hideSpinner
Hides the loading spinner.

**Returns:** `void`

---

### showPopup
Opens the popup and shows suggestions matching the current input text.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `e` (optional) | `MouseEvent \| KeyboardEvent \| TouchEvent` | The triggering event |

**Returns:** `void`

---

### showSpinner
Shows the loading spinner.

**Returns:** `void`

---

## Events

### actionBegin
**Type:** `EmitType<Object>`

Fires before data is fetched from a remote server (before the request is sent).

```html
<ejs-autocomplete (actionBegin)="onActionBegin($event)"></ejs-autocomplete>
```

---

### actionComplete
**Type:** `EmitType<Object>`

Fires after data is successfully fetched from a remote server.

---

### actionFailure
**Type:** `EmitType<Object>`

Fires when the remote data fetch request fails.

---

### beforeOpen
**Type:** `EmitType<Object>`

Fires before the popup opens (can be used to cancel the open or modify the popup).

---

### blur
**Type:** `EmitType<Object>`

Fires when focus moves out of the component.

```html
<ejs-autocomplete (blur)="onBlur($event)"></ejs-autocomplete>
```

---

### change
**Type:** `EmitType<ChangeEventArgs>`

Fires when the selected item changes or when the model value is modified by the user.

```html
<ejs-autocomplete (change)="onChange($event)"></ejs-autocomplete>
```

```typescript
onChange(e: ChangeEventArgs): void {
  console.log('New value:', e.value);
  console.log('Previous value:', e.previousValue);
}
```

---

### close
**Type:** `EmitType<PopupEventArgs>`

Fires when the popup closes.

---

### created
**Type:** `EmitType<Object>`

Fires when the component has been created and rendered.

---

### customValueSpecifier
**Type:** `EmitType<CustomValueSpecifierEventArgs>`

Fires when a custom value (not in the data source) is entered and `allowCustom` is `true`.

---

### dataBound
**Type:** `EmitType<Object>`

Fires after the data source is populated in the popup list.

---

### destroyed
**Type:** `EmitType<Object>`

Fires when the component is destroyed.

---

### filtering
**Type:** `EmitType<FilteringEventArgs>`

Fires each time the user types a character. Use this event to implement custom filtering logic.

```html
<ejs-autocomplete (filtering)="onFiltering($event)"></ejs-autocomplete>
```

```typescript
onFiltering(e: FilteringEventArgs): void {
  e.preventDefaultAction = true;
  // Apply custom filter and call e.updateData(dataSource, query)
}
```

---

### focus
**Type:** `EmitType<Object>`

Fires when the component receives focus.

---

### open
**Type:** `EmitType<PopupEventArgs>`

Fires when the popup opens.

---

### resizeStart
**Type:** `EmitType<Object>`

Fires when the user starts resizing the popup (requires `allowResize: true`).

---

### resizeStop
**Type:** `EmitType<Object>`

Fires when the user finishes resizing the popup.

---

### resizing
**Type:** `EmitType<Object>`

Fires continuously while the popup is being resized. Provides live width/height updates.

---

### select
**Type:** `EmitType<SelectEventArgs>`

Fires when a suggestion item is selected from the popup (via mouse, touch, or keyboard).

```html
<ejs-autocomplete (select)="onSelect($event)"></ejs-autocomplete>
```

```typescript
onSelect(e: SelectEventArgs): void {
  console.log('Selected item:', e.item);
  console.log('Selected data:', e.itemData);
}
```
