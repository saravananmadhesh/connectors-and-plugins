# API Reference – Syncfusion TypeScript Signature

Source: https://ej2.syncfusion.com/documentation/api/signature/index-default

## Table of Contents
- [Import](#import)
- [Properties](#properties)
  - [Property Usage Examples](#property-usage-examples)
- [Methods](#methods)
  - [draw](#drawtextfontfamily-fontsize)
  - [load](#loadsignature-width-height)
  - [save](#savetype-filename)
  - [saveAsBlob](#saveasblob)
  - [getSignature](#getsignature)
  - [getBlob](#getbloburl)
  - [undo](#undo)
  - [redo](#redo)
  - [canUndo](#canundo)
  - [canRedo](#canredo)
  - [clear](#clear)
  - [isEmpty](#isempty)
  - [refresh](#refresh)
  - [destroy](#destroy)
  - [appendTo](#appendtoselector)
  - [dataBind](#databind)
  - [getRootElement](#getrootelement)
  - [addEventListener](#addeventlistenereventname-handler)
  - [removeEventListener](#removeeventlistenereventname-handler)
  - [Inject (static)](#injectmodulelist-static)
- [Events](#events)
  - [change](#change--emittypesignaturechangeeventargs)
  - [created](#created--emittypeevent)
  - [beforeSave](#beforesave--emittypesignaturebeforesaveeventargs)
- [Supporting Types](#supporting-types)

---

## Import

```ts
import { Signature, SignatureFileType, SignatureChangeEventArgs, SignatureBeforeSaveEventArgs } from '@syncfusion/ej2-inputs';
```

---

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `backgroundColor` | string | `''` | Background color of the canvas. Accepts hex (`#rrggbb`), RGB (`rgb(r,g,b)`), and named colors (e.g., `'red'`). |
| `backgroundImage` | string | `''` | Background image URL for the canvas. Use a hosted URL or local server URL. |
| `disabled` | boolean | `false` | When `true`, the component is disabled and the user cannot draw. The component renders with reduced opacity. |
| `enablePersistence` | boolean | `false` | When `true`, the component's state is persisted to browser local storage across page reloads. |
| `isReadOnly` | boolean | `false` | When `true`, the component is focusable but drawing is prevented. |
| `maxStrokeWidth` | number | `2` | Maximum stroke width in pixels. Used with `minStrokeWidth` and `velocity` to compute variable stroke thickness. |
| `minStrokeWidth` | number | `0.5` | Minimum stroke width in pixels. |
| `saveWithBackground` | boolean | `true` | When `true`, background color and background image are included in the saved output. |
| `signatureValue` | string | — | Gets or sets the last signature URL to maintain persist state (used internally for `enablePersistence`). |
| `strokeColor` | string | `'#000000'` | Ink color for strokes. Accepts hex, RGB, and named colors. |
| `velocity` | number | `0.7` | Controls how quickly the stroke width responds to drawing speed. Higher values produce sharper transitions. |

### Property Usage Examples

```ts
// Initialize with properties
let signature: Signature = new Signature({
  strokeColor: '#e91e63',
  backgroundColor: '#f5f5f5',
  maxStrokeWidth: 3,
  minStrokeWidth: 0.5,
  velocity: 0.7,
  saveWithBackground: true,
  disabled: false,
  isReadOnly: false,
  enablePersistence: false
});
signature.appendTo('#signature');

// Update properties dynamically
signature.strokeColor      = '#2196f3';
signature.backgroundColor  = '#ffffff';
signature.maxStrokeWidth   = 5;
signature.disabled         = true;
signature.isReadOnly       = false;
```

---

## Methods

### `draw(text, fontFamily?, fontSize?)`

Draws the specified text onto the canvas as a signature.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `text` | string | — | The text to draw as a signature |
| `fontFamily` | string | `'Arial'` | Font family (e.g., `'Arial'`, `'Serif'`, `'Georgia'`) |
| `fontSize` | number | `30` | Font size in pixels |

```ts
signature.draw('John Doe', 'Arial', 30);
signature.draw('Jane', 'Serif', 40);
```

Returns: `void`

---

### `load(signature, width?, height?)`

Loads a pre-drawn signature from a Base64 string or a hosted/online URL.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `signature` | string | Yes | Base64 string or hosted URL (PNG, JPEG, or SVG) |
| `width` | number | No | Width to scale the loaded image to |
| `height` | number | No | Height to scale the loaded image to |

```ts
signature.load(base64String);
signature.load('https://example.com/sig.png', 400, 200);
```

Returns: `void`

---

### `save(type?, fileName?)`

Saves the signature as a downloadable image file.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `type` | SignatureFileType | `'Png'` | Output file format: `'Png'`, `'Jpeg'`, or `'Svg'` |
| `fileName` | string | `'signature'` | Output file name (without extension) |

```ts
signature.save();                       // saves as signature.png
signature.save('Jpeg', 'my-sign');      // saves as my-sign.jpeg
signature.save('Svg', 'contract-sig'); // saves as contract-sig.svg
```

Returns: `void`

---

### `saveAsBlob()`

Saves the canvas content as a `Blob` object. Useful for server uploads via `FormData`.

```ts
const blob: Blob = signature.saveAsBlob();
const formData = new FormData();
formData.append('signature', blob, 'signature.png');
```

Returns: `Blob`

---

### `getSignature()`

Returns the current canvas content as a Base64-encoded PNG string. Use for server storage or to reload later with `load()`.

```ts
const base64: string = signature.getSignature();
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
```

Returns: `string`

---

### `getBlob(url)`

Converts a given URL or Base64 string into a `Blob` object.

| Parameter | Type | Description |
|---|---|---|
| `url` | string | A Base64 string or URL to convert to Blob |

```ts
const base64: string = signature.getSignature();
const blob: Blob = signature.getBlob(base64);
const objectUrl = URL.createObjectURL(blob);
```

Returns: `Blob`

---

### `undo()`

Reverts the last action by decrementing the internal snap index.

```ts
if (signature.canUndo()) {
  signature.undo();
}
```

Returns: `void`

---

### `redo()`

Re-applies the last undone action by incrementing the internal snap index.

```ts
if (signature.canRedo()) {
  signature.redo();
}
```

Returns: `void`

---

### `canUndo()`

Returns `true` if there are actions available to undo.

```ts
const undoAvailable: boolean = signature.canUndo();
```

Returns: `boolean`

---

### `canRedo()`

Returns `true` if there are actions available to redo.

```ts
const redoAvailable: boolean = signature.canRedo();
```

Returns: `boolean`

---

### `clear()`

Erases all strokes from the canvas. This action is tracked in undo/redo history.

```ts
signature.clear();
```

Returns: `void`

---

### `isEmpty()`

Returns `true` if the canvas has no strokes (is blank).

```ts
const blank: boolean = signature.isEmpty();
```

Returns: `boolean`

---

### `refresh()`

Refreshes the Signature component. Use after layout changes that affect canvas dimensions.

```ts
signature.refresh();
```

Returns: `void`

---

### `destroy()`

Removes the component from the DOM and detaches all event handlers. The original canvas element is restored.

```ts
signature.destroy();
```

Returns: `void`

---

### `appendTo(selector?)`

Appends the control to the given HTML element or CSS selector.

```ts
signature.appendTo('#signature');
signature.appendTo(document.getElementById('signature') as HTMLElement);
```

Returns: `void`

---

### `dataBind()`

Applies pending property changes immediately to the component.

```ts
signature.strokeColor = '#ff0000';
signature.dataBind();   // forces immediate re-render
```

Returns: `void`

---

### `getRootElement()`

Returns the root HTML element of the component.

```ts
const root: HTMLElement = signature.getRootElement();
```

Returns: `HTMLElement`

---

### `addEventListener(eventName, handler)`

Adds an event listener for the given event name.

| Parameter | Type | Description |
|---|---|---|
| `eventName` | string | Event name (e.g., `'change'`, `'created'`) |
| `handler` | Function | Callback to run when the event fires |

Returns: `void`

---

### `removeEventListener(eventName, handler)`

Removes a previously registered event listener.

| Parameter | Type | Description |
|---|---|---|
| `eventName` | string | Event name to remove |
| `handler` | Function | The specific handler function to remove |

Returns: `void`

---

### `Inject(moduleList)` *(static)*

Dynamically injects the required feature modules into the component. Call this static method before instantiating Signature when using optional modules.

| Parameter | Type | Description |
|---|---|---|
| `moduleList` | `Function[]` | Array of module constructors to inject |

```ts
import { Signature } from '@syncfusion/ej2-inputs';

// Inject required modules before instantiation (if any optional modules are needed)
Signature.Inject();
```

Returns: `void`

---

## Events

### `change` — `EmitType<SignatureChangeEventArgs>`

Fires after:
- A stroke is completed
- An undo or redo is performed
- A clear is performed

```ts
import { Signature, SignatureChangeEventArgs } from '@syncfusion/ej2-inputs';

let signature: Signature = new Signature({
  change: (args: SignatureChangeEventArgs) => {
    console.log('Signature changed');
    console.log('Can undo:', signature.canUndo());
    console.log('Is empty:', signature.isEmpty());
  }
});
signature.appendTo('#signature');
```

---

### `created` — `EmitType<Event>`

Fires once after the component is fully rendered. Use for post-initialization tasks.

```ts
let signature: Signature = new Signature({
  created: () => {
    console.log('Signature component ready');
  }
});
signature.appendTo('#signature');
```

---

### `beforeSave` — `EmitType<SignatureBeforeSaveEventArgs>`

Fires **only** when the user triggers save via keyboard shortcut (`Ctrl + S`). Allows customizing the file name and type before the download starts.

```ts
import { Signature, SignatureBeforeSaveEventArgs } from '@syncfusion/ej2-inputs';

let signature: Signature = new Signature({
  beforeSave: (args: SignatureBeforeSaveEventArgs) => {
    args.fileName = 'custom-name';   // Override the default file name
    // args.type is the current SignatureFileType value
  }
});
signature.appendTo('#signature');
```

---

## Supporting Types

### `SignatureFileType`

String union type for supported save formats:

| Value | Description |
|---|---|
| `'Png'` | PNG image (lossless, supports transparency) |
| `'Jpeg'` | JPEG image (lossy, no transparency) |
| `'Svg'` | SVG vector image (scalable) |

```ts
import { SignatureFileType } from '@syncfusion/ej2-inputs';

const fileType: SignatureFileType = 'Png';
signature.save(fileType, 'my-signature');
```

---

### `SignatureChangeEventArgs`

Event arguments for the `change` event. No additional properties beyond standard event info — use the `Signature` instance methods (`canUndo`, `canRedo`, `isEmpty`) to determine state.

---

### `SignatureBeforeSaveEventArgs`

Event arguments for the `beforeSave` event:

| Property | Type | Description |
|---|---|---|
| `fileName` | string | The file name for the save operation (can be overridden) |
| `type` | SignatureFileType | The file type for the save operation |
