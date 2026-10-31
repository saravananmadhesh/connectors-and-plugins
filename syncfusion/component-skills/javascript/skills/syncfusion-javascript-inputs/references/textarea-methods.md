# Methods in TextArea

## Table of Contents
- [focusIn](#focusin)
- [focusOut](#focusout)
- [getPersistData](#getpersistdata)
- [addAttributes](#addattributes)
- [removeAttributes](#removeattributes)
- [dataBind](#databind)
- [refresh](#refresh)
- [destroy](#destroy)
- [getRootElement](#getrootelement)

---

## focusIn

Sets focus to the TextArea element programmatically. Use when you want to direct user attention to the TextArea without a click.

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments'
});
textareaObj.appendTo('#default');

document.getElementById('focusBtn').onclick = function () {
    textareaObj.focusIn();
};
```

Returns: `void`

---

## focusOut

Removes focus from the TextArea element programmatically.

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments'
});
textareaObj.appendTo('#default');

document.getElementById('blurBtn').onclick = function () {
    textareaObj.focusOut();
};
```

Returns: `void`

---

## getPersistData

Retrieves the properties maintained in the persisted state (when `enablePersistence: true`). Returns a JSON string of the persisted property values.

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    enablePersistence: true
});
textareaObj.appendTo('#default');

document.getElementById('persistBtn').onclick = function () {
    let persistedData: string = textareaObj.getPersistData();
    console.log('Persisted state:', persistedData);
};
```

Returns: `string`

---

## addAttributes

Adds multiple HTML attributes as key-value pairs to the TextArea element.

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments'
});
textareaObj.appendTo('#default');

// Add aria-label and data-id attributes
textareaObj.addAttributes({ 'aria-label': 'Comments field', 'data-id': 'comment-1' });
```

Parameters:
- `attributes`: `{ [key: string]: string }` — key-value pairs of attributes to add

Returns: `void`

---

## removeAttributes

Removes multiple attributes by name from the TextArea element.

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments'
});
textareaObj.appendTo('#default');

// Remove specific attributes
textareaObj.removeAttributes(['aria-label', 'data-id']);
```

Parameters:
- `attributes`: `string[]` — array of attribute names to remove

Returns: `void`

---

## dataBind

Applies all pending property changes immediately to the component. Use this after programmatically updating properties to ensure they are reflected in the DOM right away.

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments'
});
textareaObj.appendTo('#default');

// Update a property and apply immediately
textareaObj.cssClass = 'e-outline';
textareaObj.dataBind();
```

Returns: `void`

---

## refresh

Applies all pending property changes and re-renders the component from scratch. More thorough than `dataBind()` — use when layout or template changes require a full re-render.

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments'
});
textareaObj.appendTo('#default');

// Force full re-render
textareaObj.refresh();
```

Returns: `void`

---

## destroy

Removes the TextArea component from the DOM and detaches all related event handlers. The original `<textarea>` element is restored.

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments'
});
textareaObj.appendTo('#default');

document.getElementById('destroyBtn').onclick = function () {
    textareaObj.destroy();
};
```

Returns: `void`

---

## getRootElement

Returns the root HTML element of the TextArea component.

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments'
});
textareaObj.appendTo('#default');

let rootEl: HTMLElement = textareaObj.getRootElement();
console.log(rootEl); // The wrapper element
```

Returns: `HTMLElement`

---

## Method Summary

| Method | Purpose | Returns |
|---|---|---|
| `focusIn()` | Set focus to the TextArea | `void` |
| `focusOut()` | Remove focus from the TextArea | `void` |
| `getPersistData()` | Get persisted state as JSON string | `string` |
| `addAttributes(attrs)` | Add HTML attributes to element | `void` |
| `removeAttributes(names)` | Remove HTML attributes from element | `void` |
| `dataBind()` | Apply pending property changes | `void` |
| `refresh()` | Re-render component entirely | `void` |
| `destroy()` | Remove component from DOM | `void` |
| `getRootElement()` | Get root DOM element | `HTMLElement` |
