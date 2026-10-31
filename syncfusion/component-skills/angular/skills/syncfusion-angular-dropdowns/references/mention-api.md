# API Reference — Syncfusion Angular Mention

> **Source:** [https://ej2.syncfusion.com/angular/documentation/api/mention/index-default](https://ej2.syncfusion.com/angular/documentation/api/mention/index-default)

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)

---

## Properties

### actionFailureTemplate
**Type:** `string | Function`  
**Default:** `'Request failed'`

Accepts a template and assigns it to the popup list content when the remote data fetch request fails.

```html
<ejs-mention [actionFailureTemplate]="'<span>⚠️ Failed to load data</span>'" ...></ejs-mention>
```

---

### allowSpaces
**Type:** `boolean`  
**Default:** `false`

Defines whether a space is allowed in the middle of a mention while searching. When `false`, pressing Space ends the mention search.

```html
<ejs-mention [allowSpaces]="true" ...></ejs-mention>
```

---

### cssClass
**Type:** `string`  
**Default:** `null`

Defines one or more CSS classes (space-separated) to apply to the Mention component for custom styling.

```html
<ejs-mention cssClass="custom-mention" ...></ejs-mention>
```

---

### dataSource
**Type:** `{ [key: string]: Object }[] | DataManager | string[] | number[] | boolean[]`  
**Default:** `[]`

Accepts the list items either from local data or a remote service, and binds them to the component. Supports arrays of JSON objects or a `DataManager` instance.

```typescript
public userData: string[] = ['Alice', 'Bob', 'Carol'];
```
```html
<ejs-mention [dataSource]="userData" ...></ejs-mention>
```

---

### debounceDelay
**Type:** `number`  
**Default:** `300`

Specifies the delay time in milliseconds between a keystroke and the start of the filtering operation. Useful for throttling remote API calls.

```html
<ejs-mention [debounceDelay]="500" ...></ejs-mention>
```

---

### displayTemplate
**Type:** `any`  
**Default:** `null`

Specifies the template for the text inserted into the target element after a suggestion is selected. Use `ng-template #displayTemplate let-data` in the component template.

```html
<ejs-mention ...>
  <ng-template #displayTemplate let-data>
    <span>{{ data.FirstName }} ({{ data.City }})</span>
  </ng-template>
</ejs-mention>
```

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Enable or disable persisting the component's state between page reloads.

```html
<ejs-mention [enablePersistence]="true" ...></ejs-mention>
```

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Enable or disable rendering the component in right-to-left direction.

```html
<ejs-mention [enableRtl]="true" ...></ejs-mention>
```

---

### fields
**Type:** `FieldSettingsModel`  
**Default:** `{ text: null, value: null, iconCss: null, groupBy: null }`

Defines the column mappings for the data source:
- `text` — Display text for each list item
- `value` — Hidden unique value for each list item
- `iconCss` — CSS class for an icon on each item
- `groupBy` — Field used to group list items
- `disabled` — Boolean field marking items as non-selectable

```typescript
public fields: Object = { text: 'Name', value: 'ID', groupBy: 'Category', disabled: 'IsDisabled' };
```

---

### filterType
**Type:** `FilterType`  
**Default:** `'Contains'`

Determines which filter strategy is used when the user types after the trigger character.

| Value | Description |
|-------|-------------|
| `'StartsWith'` | Items beginning with the typed text |
| `'EndsWith'` | Items ending with the typed text |
| `'Contains'` | Items containing the typed text (default) |

```html
<ejs-mention filterType="StartsWith" ...></ejs-mention>
```

---

### groupTemplate
**Type:** `string | Function`  
**Default:** `null`

Accepts a template for the group headers displayed in the popup list when `fields.groupBy` is set.

```html
<ejs-mention ...>
  <ng-template #groupTemplate let-data>
    <strong>{{ data.groupBy }}</strong>
  </ng-template>
</ejs-mention>
```

---

### highlight
**Type:** `boolean`  
**Default:** `false`

Specifies whether matched characters are visually highlighted in the suggestion list items.

```html
<ejs-mention [highlight]="true" ...></ejs-mention>
```

---

### ignoreAccent
**Type:** `boolean`

When `true`, ignores diacritic characters (accents) during filtering, so `é` matches `e`.

```html
<ejs-mention [ignoreAccent]="true" ...></ejs-mention>
```

---

### ignoreCase
**Type:** `boolean`  
**Default:** `true`

Specifies whether searches are case-insensitive. Set to `false` for strict case-sensitive matching.

```html
<ejs-mention [ignoreCase]="false" ...></ejs-mention>
```

---

### itemTemplate
**Type:** `any`  
**Default:** `null`

Specifies the template for rendering each suggestion list item. Use `ng-template #itemTemplate let-data`.

```html
<ejs-mention ...>
  <ng-template #itemTemplate let-data>
    <span>{{ data.Name }} — {{ data.EmailId }}</span>
  </ng-template>
</ejs-mention>
```

---

### locale
**Type:** `string`  
**Default:** `'en-US'`

Overrides the global culture for this component. Use with `L10n.load()` to localize static text.

```html
<ejs-mention locale="fr-BE" ...></ejs-mention>
```

---

### mentionChar
**Type:** `string`  
**Default:** `'@'`

Specifies the single character that triggers the suggestion popup.

```html
<ejs-mention mentionChar="#" ...></ejs-mention>
```

---

### minLength
**Type:** `number`  
**Default:** `0`

Specifies the minimum number of characters the user must type after the trigger character before the suggestion popup opens. Default `0` opens immediately.

```html
<ejs-mention [minLength]="3" ...></ejs-mention>
```

---

### noRecordsTemplate
**Type:** `any`  
**Default:** `'No records found'`

Specifies the template shown when no suggestions match the typed text or the data source is empty.

```typescript
public noRecordsTemplate: string = '<span>No users found</span>';
```
```html
<ejs-mention [noRecordsTemplate]="noRecordsTemplate" ...></ejs-mention>
```

---

### popupHeight
**Type:** `string | number`  
**Default:** `'300px'`

Specifies the height of the suggestion popup. Accepts pixel strings (`'200px'`), numbers (treated as pixels), or percentages.

```html
<ejs-mention popupHeight="200px" ...></ejs-mention>
```

---

### popupWidth
**Type:** `string | number`  
**Default:** `'auto'`

Specifies the width of the suggestion popup. Default `'auto'` adjusts to the content width.

```html
<ejs-mention popupWidth="300px" ...></ejs-mention>
```

---

### query
**Type:** `Query`  
**Default:** `null`

Specifies an external `Query` object for customizing and filtering remote data requests.

```typescript
import { Query } from '@syncfusion/ej2-data';
public query: Query = new Query().from('Employees').select(['FirstName', 'EmployeeID']).take(10);
```
```html
<ejs-mention [query]="query" ...></ejs-mention>
```

---

### requireLeadingSpace
**Type:** `boolean`  
**Default:** `true`

Specifies whether a space is required immediately before the trigger character to open the suggestion popup. Set to `false` to allow triggering without a preceding space.

```html
<ejs-mention [requireLeadingSpace]="false" ...></ejs-mention>
```

---

### showMentionChar
**Type:** `boolean`  
**Default:** `false`

Specifies whether the trigger character is included as a prefix when the selected suggestion is inserted into the target element.

```html
<ejs-mention [showMentionChar]="true" ...></ejs-mention>
```

---

### sortOrder
**Type:** `SortOrder`  
**Default:** `'None'`

Specifies the order in which suggestions are displayed.

| Value | Description |
|-------|-------------|
| `'None'` | Original data source order |
| `'Ascending'` | A → Z |
| `'Descending'` | Z → A |

```html
<ejs-mention sortOrder="Ascending" ...></ejs-mention>
```

---

### spinnerTemplate
**Type:** `any`  
**Default:** `null`

Specifies the template shown while data is being fetched from a remote source.

```html
<ejs-mention ...>
  <ng-template #spinnerTemplate>
    <div class="spinner_loader"></div>
  </ng-template>
</ejs-mention>
```

---

### suffixText
**Type:** `string`  
**Default:** `null`

Specifies text appended immediately after the inserted mention value. Use `'&nbsp;'` for a space or `'\n'` for a new line.

```html
<ejs-mention suffixText="&nbsp;" ...></ejs-mention>
```

---

### suggestionCount
**Type:** `number`  
**Default:** `25`

Specifies the maximum number of items shown in the suggestion list at one time.

```html
<ejs-mention [suggestionCount]="10" ...></ejs-mention>
```

---

### target
**Type:** `HTMLElement | string`

Specifies the target element (by CSS selector or `HTMLElement` reference) where the Mention component listens for user input and displays suggestions. **This property is required.**

```typescript
public mentionTarget: string = '#mentionElement';
```
```html
<ejs-mention [target]="mentionTarget" ...></ejs-mention>
```

---

### zIndex
**Type:** `number`  
**Default:** `1000`

Specifies the z-index value of the suggestion popup element.

```html
<ejs-mention [zIndex]="1500" ...></ejs-mention>
```

---

## Methods

### addItem
Adds a new item to the popup list. By default, the item is appended at the end; use `itemIndex` to insert at a specific position.

| Parameter | Type | Description |
|-----------|------|-------------|
| `items` | `{ [key: string]: Object }[] \| string \| boolean \| number \| string[] \| boolean[] \| number[]` | Item(s) to add |
| `itemIndex` *(optional)* | `number` | Index at which to insert the new item |

**Returns:** `void`

```typescript
// Add a new user to the suggestion list
this.mentionObj.addItem({ Name: 'New User', ID: '99' });

// Insert at index 2
this.mentionObj.addItem({ Name: 'Second User', ID: '98' }, 2);
```

---

### destroy
Removes the Mention component from the DOM, detaches all event handlers, and removes all attributes and classes added by the component.

**Returns:** `void`

```typescript
this.mentionObj.destroy();
```

---

### disableItem
Disables a specific item in the popup list so it cannot be selected. The `disabled` field state is updated in the `dataSource`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `item` | `string \| number \| object \| HTMLLIElement` | The item to disable (by value, object, or DOM element) |

**Returns:** `void`

```typescript
// Disable by value
this.mentionObj.disableItem('3');

// Disable multiple items by iterating
['2', '4'].forEach(id => this.mentionObj.disableItem(id));
```

---

### getDataByValue
Returns the data object that matches the provided value.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `string \| number \| boolean \| object` | The value to look up |

**Returns:** `{ [key: string]: Object } | string | number | boolean`

```typescript
const item = this.mentionObj.getDataByValue('3');
console.log(item); // { Name: 'Robert', ID: '3' }
```

---

### getItems
Gets all rendered list item elements currently in the popup.

**Returns:** `Element[]`

```typescript
const items: Element[] = this.mentionObj.getItems();
console.log(items.length);
```

---

### hidePopup
Hides the suggestion popup if it is currently open.

**Returns:** `void`

```typescript
this.mentionObj.hidePopup();
```

---

### search
Triggers a search action and shows matching items in the suggestion popup.

**Returns:** `void`

```typescript
this.mentionObj.search();
```

---

### showPopup
Opens the suggestion popup and displays the list of items.

**Returns:** `void`

```typescript
this.mentionObj.showPopup();
```

---

## Events

### actionBegin
**Type:** `EmitType<Object>`

Triggers before fetching data from the remote server.

```html
<ejs-mention [dataSource]="remoteData" [target]="mentionTarget" (actionBegin)="onActionBegin($event)">
</ejs-mention>
```
```typescript
onActionBegin(args: Object): void {
  console.log('Remote fetch starting', args);
}
```

---

### actionComplete
**Type:** `EmitType<Object>`

Triggers after data is fetched successfully from the remote server.

```html
<ejs-mention [dataSource]="remoteData" [target]="mentionTarget" (actionComplete)="onActionComplete($event)">
</ejs-mention>
```
```typescript
onActionComplete(args: Object): void {
  console.log('Remote fetch succeeded', args);
}
```

---

### actionFailure
**Type:** `EmitType<Object>`

Triggers when the data fetch request from the remote server fails.

```html
<ejs-mention [dataSource]="remoteData" [target]="mentionTarget" (actionFailure)="onActionFailure($event)">
</ejs-mention>
```
```typescript
onActionFailure(args: Object): void {
  console.error('Remote fetch failed', args);
}
```

---

### beforeOpen
**Type:** `EmitType<PopupEventArgs>`

Triggers before the suggestion popup is opened. Set `args.cancel = true` to prevent the popup from opening.

**`PopupEventArgs` properties:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to `true` to prevent the popup from opening |
| `popup` | `Popup` | The popup object instance |
| `animation` | `AnimationModel` | The animation configuration object |
| `event` | `MouseEvent \| KeyboardEventArgs \| TouchEvent \| Object` | The original browser event |

```html
<ejs-mention [dataSource]="userData" [target]="mentionTarget" (beforeOpen)="onBeforeOpen($event)">
</ejs-mention>
```
```typescript
import { PopupEventArgs } from '@syncfusion/ej2-dropdowns';

onBeforeOpen(args: PopupEventArgs): void {
  // Prevent the popup from opening conditionally
  // args.cancel = true;
  console.log('Popup about to open', args.popup);
}
```

---

### change
**Type:** `EmitType<MentionChangeEventArgs>`

Triggers when an item in the popup is selected and the selected value is updated in the editor.

**`MentionChangeEventArgs` properties:**

| Property | Type | Description |
|----------|------|-------------|
| `value` | `number \| string \| boolean` | The selected value |
| `itemData` | `FieldSettingsModel` | The selected item as a JSON object from the data source |
| `item` | `HTMLLIElement` | The selected list item DOM element |
| `previousItemData` | `FieldSettingsModel` | The previously selected item as a JSON object |
| `previousItem` | `HTMLLIElement` | The previously selected list item DOM element |
| `element` | `HTMLElement` | The component root element |
| `isInteracted` | `boolean` | `true` if triggered by user interaction; `false` if programmatic |
| `e` | `MouseEvent \| KeyboardEvent \| TouchEvent` | The original event arguments |
| `cancel` | `boolean` | Set to `true` to prevent the default action |

```html
<ejs-mention [dataSource]="userData" [fields]="fields" [target]="mentionTarget" (change)="onChange($event)">
</ejs-mention>
```
```typescript
import { MentionChangeEventArgs } from '@syncfusion/ej2-dropdowns';

onChange(args: MentionChangeEventArgs): void {
  console.log('Selected value:', args.value);
  console.log('Selected item data:', args.itemData);
  console.log('Previous item data:', args.previousItemData);
}
```

---

### closed
**Type:** `EmitType<PopupEventArgs>`

Triggers after the suggestion popup is closed.

**`PopupEventArgs` properties:** See [beforeOpen](#beforeopen) for the full property list.

```html
<ejs-mention [dataSource]="userData" [target]="mentionTarget" (closed)="onClosed($event)">
</ejs-mention>
```
```typescript
import { PopupEventArgs } from '@syncfusion/ej2-dropdowns';

onClosed(args: PopupEventArgs): void {
  console.log('Popup closed', args);
}
```

---

### created
**Type:** `EmitType<Object>`

Triggers when the Mention component is created and fully initialized.

```html
<ejs-mention [dataSource]="userData" [target]="mentionTarget" (created)="onCreated($event)">
</ejs-mention>
```
```typescript
onCreated(args: Object): void {
  console.log('Mention component created', args);
}
```

---

### dataBound
**Type:** `EmitType<Object>`

Triggers when the data source is populated in the popup list.

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="mentionElement"></div>
    <ejs-mention
      [dataSource]="userData"
      [target]="mentionTarget"
      (dataBound)="onDataBound($event)">
    </ejs-mention>
  `
})
export class AppComponent {
  public userData: string[] = ['Alice', 'Bob', 'Carol'];
  public mentionTarget: string = '#mentionElement';

  onDataBound(args: Object): void {
    console.log('Data loaded into the popup list', args);
  }
}
```

---

### destroyed
**Type:** `EmitType<Object>`

Triggers when the Mention component is destroyed.

```html
<ejs-mention [dataSource]="userData" [target]="mentionTarget" (destroyed)="onDestroyed($event)">
</ejs-mention>
```
```typescript
onDestroyed(args: Object): void {
  console.log('Mention component destroyed', args);
}
```

---

### filtering
**Type:** `EmitType<FilteringEventArgs>`

Triggers on every character typed in the component. Use this event to implement custom filtering logic by calling `args.updateData()`.

**`FilteringEventArgs` properties:**

| Property | Type | Description |
|----------|------|-------------|
| `text` | `string` | The current search text typed by the user |
| `cancel` | `boolean` | Set to `true` to prevent the default filtering action |
| `preventDefaultAction` | `boolean` | Set to `true` to suppress the internal filtering operation |
| `baseEventArgs` | `Object` | The underlying `keyup` event arguments |

**`FilteringEventArgs` methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `updateData` | `(dataSource, query?, fields?) => void` | Filters the given data source and updates the popup list |

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention
      [dataSource]="userData"
      [fields]="fields"
      [target]="mentionTarget"
      (filtering)="onFiltering($event)">
    </ejs-mention>
  `
})
export class AppComponent {
  public userData: { [key: string]: Object }[] = [
    { Name: 'Andrew Fuller', ID: '1' },
    { Name: 'Anne Dodsworth', ID: '2' },
    { Name: 'Janet Leverling', ID: '3' },
    { Name: 'Laura Callahan', ID: '4' },
    { Name: 'Margaret Peacock', ID: '5' }
  ];
  public fields: Object = { text: 'Name', value: 'ID' };
  public mentionTarget: string = '#mentionElement';

  onFiltering(args: FilteringEventArgs): void {
    // Custom filter: match Name or ID
    let query: Query = new Query();
    query = args.text !== '' ? query.where('Name', 'startswith', args.text, true) : query;
    args.updateData(this.userData, query, this.fields as any);
  }
}
```

---

### opened
**Type:** `EmitType<PopupEventArgs>`

Triggers after the suggestion popup opens.

**`PopupEventArgs` properties:** See [beforeOpen](#beforeopen) for the full property list.

```html
<ejs-mention [dataSource]="userData" [target]="mentionTarget" (opened)="onOpened($event)">
</ejs-mention>
```
```typescript
import { PopupEventArgs } from '@syncfusion/ej2-dropdowns';

onOpened(args: PopupEventArgs): void {
  console.log('Popup opened', args.popup);
}
```

---

### select
**Type:** `EmitType<SelectEventArgs>`

Triggers when the user selects an item from the popup list (via mouse click, tap, or keyboard navigation). Set `args.cancel = true` to prevent the item from being inserted.

**`SelectEventArgs` properties:**

| Property | Type | Description |
|----------|------|-------------|
| `itemData` | `FieldSettingsModel` | The selected item as a JSON object from the data source |
| `item` | `HTMLLIElement` | The selected list item DOM element |
| `isInteracted` | `boolean` | `true` if triggered by user interaction; `false` if programmatic |
| `e` | `MouseEvent \| KeyboardEvent \| TouchEvent` | The original event arguments |
| `cancel` | `boolean` | Set to `true` to cancel insertion of the selected item |

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { SelectEventArgs } from '@syncfusion/ej2-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention
      [dataSource]="userData"
      [fields]="fields"
      [target]="mentionTarget"
      (select)="onSelect($event)">
    </ejs-mention>
  `
})
export class AppComponent {
  public userData: { [key: string]: Object }[] = [
    { Name: 'Selma Rose', ID: '1' },
    { Name: 'Maria', ID: '2' },
    { Name: 'Robert', ID: '3' }
  ];
  public fields: Object = { text: 'Name', value: 'ID' };
  public mentionTarget: string = '#mentionElement';

  onSelect(args: SelectEventArgs): void {
    console.log('Selected item:', args.itemData);
    console.log('Is user interaction:', args.isInteracted);
    // Prevent selection conditionally:
    // args.cancel = true;
  }
}
```
