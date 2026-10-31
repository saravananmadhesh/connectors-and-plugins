# Popup and Display — Syncfusion TypeScript Mention

## Table of Contents
- [Target Element Binding](#target-element-binding)
- [Trigger Behavior](#trigger-behavior)
- [Popup Size](#popup-size)
- [Programmatic Popup Control](#programmatic-popup-control)
- [Z-Index](#z-index)
- [No Records Template](#no-records-template)
- [Spinner Template](#spinner-template)
- [Popup Lifecycle Events](#popup-lifecycle-events)

---

## Target Element Binding

The `target` property is required — it identifies which element the Mention component monitors for the trigger character. It accepts a CSS selector string or a direct `HTMLElement` reference.

### Binding to a textarea

```typescript
import { Mention } from '@syncfusion/ej2-dropdowns';

const mentionObj: Mention = new Mention({
  target: '#commentBox',    // CSS selector
  dataSource: ['Alice', 'Bob', 'Carol'],
});
mentionObj.appendTo('#mention-element');
```

### Binding to a contenteditable div

```html
<div id="editableContent" contenteditable="true"
  style="border: 1px solid #ccc; min-height: 80px; padding: 8px;">
  Type here...
</div>
<div id="mention-element"></div>
```

```typescript
const mentionObj: Mention = new Mention({
  target: '#editableContent',
  dataSource: userData,
  fields: { text: 'name', value: 'id' }
});
mentionObj.appendTo('#mention-element');
```

### Binding to a plain input

```typescript
const mentionObj: Mention = new Mention({
  target: '#singleLineInput',
  dataSource: ['Tag1', 'Tag2', 'Tag3']
});
mentionObj.appendTo('#mention-element');
```

---

## Trigger Behavior

### requireLeadingSpace

By default (`requireLeadingSpace: true`), the trigger character must be preceded by a space or be at the very start of the input. This prevents accidental triggers inside email addresses or URLs.

```typescript
// Default behavior: "@mention" triggers only if @ follows a space or is first char
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  requireLeadingSpace: true   // default
});
mentionObj.appendTo('#mention-element');
```

Set to `false` to trigger anywhere in the text:

```typescript
// "hello@alice" will also trigger the popup
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  requireLeadingSpace: false
});
mentionObj.appendTo('#mention-element');
```

### allowSpaces

By default (`allowSpaces: false`), typing a space ends the mention search and closes the popup. Set to `true` to allow spaces within the search string:

```typescript
const contacts: { [key: string]: Object }[] = [
  { name: 'Alice Smith',  id: '1' },
  { name: 'Bob Jones',    id: '2' }
];

// "@Alice Smith" will still search and match
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: contacts,
  fields: { text: 'name', value: 'id' },
  allowSpaces: true
});
mentionObj.appendTo('#mention-element');
```

---

## Popup Size

Control the popup dimensions with `popupWidth` and `popupHeight`. Both accept pixels (number or string), percentage strings, or `'auto'`.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  popupWidth: '250px',    // fixed width
  popupHeight: '200px'    // fixed height; default is '300px'
});
mentionObj.appendTo('#mention-element');
```

```typescript
// Percentage width — relative to the input element width
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  popupWidth: '100%'    // matches target element width
});
mentionObj.appendTo('#mention-element');
```

The default `popupWidth` is `'auto'` (sized to the widest content item). The default `popupHeight` is `'300px'`.

---

## Programmatic Popup Control

### showPopup()

Opens the suggestion popup manually, independent of user typing:

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' }
});
mentionObj.appendTo('#mention-element');

// Open the popup programmatically (e.g., from a button click)
document.getElementById('openBtn')!.addEventListener('click', () => {
  mentionObj.showPopup();
});
```

### hidePopup()

Closes the popup if it is open:

```typescript
document.getElementById('closeBtn')!.addEventListener('click', () => {
  mentionObj.hidePopup();
});
```

---

## Z-Index

Use `zIndex` to control the popup's stacking order, especially inside modal dialogs or fixed-position containers (default `1000`):

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  zIndex: 9999    // bring popup above a modal with z-index 1050
});
mentionObj.appendTo('#mention-element');
```

---

## No Records Template

Customize the message shown when filtering produces no matching results:

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  noRecordsTemplate: '<div class="no-match">No matching users found</div>'
});
mentionObj.appendTo('#mention-element');
```

The default is `'No records found'`. Accepts an HTML string.

---

## Spinner Template

Customize the loading indicator shown while remote data is being fetched:

```typescript
import { Mention } from '@syncfusion/ej2-dropdowns';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: new DataManager({ url: 'url', adaptor: new WebApiAdaptor() }),
  fields: { text: 'name', value: 'id' },
  spinnerTemplate: '<div class="custom-spinner">Loading team members...</div>'
});
mentionObj.appendTo('#mention-element');
```

The default behavior renders a circular spinner. Setting `spinnerTemplate` replaces it with your HTML.

---

## Popup Lifecycle Events

Use these events to react to popup open/close transitions:

```typescript
import { Mention, PopupEventArgs } from '@syncfusion/ej2-dropdowns';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },

  beforeOpen: (args: PopupEventArgs) => {
    // Cancel the popup if some condition is not met
    if (shouldBlockPopup) {
      args.cancel = true;
    }
  },

  opened: (args: PopupEventArgs) => {
    console.log('Popup opened', args.popup);
  },

  closed: (args: PopupEventArgs) => {
    console.log('Popup closed');
  }
});
mentionObj.appendTo('#mention-element');
```

**`PopupEventArgs` properties:**

| Property | Type | Description |
|---|---|---|
| `popup` | `Popup` | Reference to the Popup component instance |
| `cancel` | `boolean` | Set `true` in `beforeOpen` to prevent the popup from opening |
| `animation` | `AnimationModel` | Animation configuration (name, duration) |
| `event` | `MouseEvent \| KeyboardEventArgs \| null` | The event that triggered the open/close |
