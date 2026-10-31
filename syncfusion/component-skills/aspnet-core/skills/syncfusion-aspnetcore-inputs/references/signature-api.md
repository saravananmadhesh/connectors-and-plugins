# Signature API Reference — ASP.NET Core

Complete API reference for Syncfusion ASP.NET Core Signature component properties, methods, and events.

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Examples](#examples)

---

## Properties

### `backgroundColor`
- **Type:** `string`
- **Default:** `''`
- Gets or sets the background color of the canvas. Accepts hex codes (`#ffffff`), RGB (`rgb(255,255,255)`), or CSS color names (`white`).

```html
<ejs-signature id="signature" backgroundColor="#f0f0f0"></ejs-signature>
```

### `backgroundImage`
- **Type:** `string`
- **Default:** `''`
- Gets or sets the background image for the canvas. Accepts a hosted URL or a base64-encoded image string.

```html
<ejs-signature id="signature" backgroundImage="path/to/image.png"></ejs-signature>
```

### `disabled`
- **Type:** `boolean`
- **Default:** `false`
- Gets or sets whether the component is disabled. When `true`, the component is non-interactive and cannot receive focus.

```html
<ejs-signature id="signature" disabled="true"></ejs-signature>
```

### `enablePersistence`
- **Type:** `boolean`
- **Default:** `false`
- Gets or sets whether to persist the component state between page reloads. Component's property will be stored in browser local storage to persist component's state when page reloads.

```html
<ejs-signature id="signature" enablePersistence="true"></ejs-signature>
```

### `htmlAttributes`
- **Type:** `object`
- **Default:** `null`
- Allows additional HTML attributes such as `title`, `name`, etc., and accepts n number of attributes in a key-value pair format.

```html
<ejs-signature id="signature" html-attributes="@(new { title = "Signature pad", name = "signature" })"></ejs-signature>
```

### `isReadOnly`
- **Type:** `boolean`
- **Default:** `false`
- Gets or sets whether the component is in read-only mode. When `true`, the component can receive focus but no new strokes can be drawn.

```html
<ejs-signature id="signature" isReadOnly="true"></ejs-signature>
```

### `maxStrokeWidth`
- **Type:** `number`
- **Default:** `2`
- Gets or sets the maximum stroke width.

```html
<ejs-signature id="signature" maxStrokeWidth="3"></ejs-signature>
```

### `minStrokeWidth`
- **Type:** `number`
- **Default:** `0.5`
- Gets or sets the minimum stroke width.

```html
<ejs-signature id="signature" minStrokeWidth="0.5"></ejs-signature>
```

### `saveWithBackground`
- **Type:** `boolean`
- **Default:** `true`
- Gets or sets whether to save the signature including its background color and image.

```html
<ejs-signature id="signature" saveWithBackground="false"></ejs-signature>
```

### `strokeColor`
- **Type:** `string`
- **Default:** `'#000000'`
- Gets or sets the color of the signature strokes. Accepts hex codes, RGB values, or CSS color names.

```html
<ejs-signature id="signature" strokeColor="#e91e63"></ejs-signature>
```

### `velocity`
- **Type:** `number`
- **Default:** `0.7`
- Gets or sets the velocity factor used to calculate stroke width variation based on drawing speed. Values between 0 and 1.

```html
<ejs-signature id="signature" velocity="0.5"></ejs-signature>
```

---

## Methods

### `canRedo()`
- **Returns:** `boolean`
- Returns `true` if the redo history contains actions that can be reapplied.

```javascript
const signature = document.getElementById('signature').ej2_instances[0];
if (signature.canRedo()) {
    signature.redo();
}
```

### `canUndo()`
- **Returns:** `boolean`
- Returns `true` if the undo history contains actions that can be reverted.

```javascript
const signature = document.getElementById('signature').ej2_instances[0];
if (signature.canUndo()) {
    signature.undo();
}
```

### `clear()`
- **Returns:** `void`
- Erases all signature strokes from the canvas. This action is added to the undo history.

```javascript
const signature = document.getElementById('signature').ej2_instances[0];
signature.clear();
```

### `destroy()`
- **Returns:** `void`
- Removes the component from the DOM and detaches all related event handlers.

```javascript
const signature = document.getElementById('signature').ej2_instances[0];
signature.destroy();
```

### `draw(text, fontFamily?, fontSize?)`
- **Returns:** `void`
- Renders a text string onto the canvas as a typed signature.

```javascript
const signature = document.getElementById('signature').ej2_instances[0];
signature.draw('John Doe', 'Arial', 32);
```

### `getBlob(url)`
- **Returns:** `Blob`
- Converts the given base64 string or URL to a `Blob` object.

```javascript
const signature = document.getElementById('signature').ej2_instances[0];
const blob = signature.getBlob(base64String);
```

### `getSignature(type?)`
- **Returns:** `string` (base64)
- Returns the current canvas content as a base64-encoded string. Supports `'Png'`, `'Jpeg'`, and `'Svg'` formats.

```javascript
const signature = document.getElementById('signature').ej2_instances[0];
const base64 = signature.getSignature();          // PNG (default)
const jpeg = signature.getSignature('Jpeg');
const svg = signature.getSignature('Svg');
```

### `isEmpty()`
- **Returns:** `boolean`
- Returns `true` if the signature canvas is empty.

```javascript
const signature = document.getElementById('signature').ej2_instances[0];
if (!signature.isEmpty()) {
    console.log('Signature has strokes');
}
```

### `load(signature, width?, height?)`
- **Returns:** `void`
- Loads a previously saved signature onto the canvas. Accepts a base64 string or hosted image URL.

```javascript
const signature = document.getElementById('signature').ej2_instances[0];
signature.load(base64String);
```

### `redo()`
- **Returns:** `void`
- Re-applies the last undone action.

```javascript
const signature = document.getElementById('signature').ej2_instances[0];
signature.redo();
```

### `save(type?, fileName?)`
- **Returns:** `void`
- Saves the signature as a downloadable file. Triggers `beforeSave` event.

```javascript
const signature = document.getElementById('signature').ej2_instances[0];
signature.save('Png', 'MySignature');
```

### `saveAsBlob()`
- **Returns:** `Blob`
- Returns the current canvas content as a `Blob` object.

```javascript
const signature = document.getElementById('signature').ej2_instances[0];
const blob = signature.saveAsBlob();
```

### `undo()`
- **Returns:** `void`
- Reverts the last stroke/action.

```javascript
const signature = document.getElementById('signature').ej2_instances[0];
signature.undo();
```

---

## Events

### `beforeSave`
Fires before the signature is saved. Allows customizing file name and type.

```html
<ejs-signature id="signature" beforeSave="onBeforeSave"></ejs-signature>

<script>
    function onBeforeSave(args) {
        args.fileName = 'Custom_' + args.fileName;
    }
</script>
```

### `change`
Fires when the signature changes (stroke added, undone, redone, or cleared).

```html
<ejs-signature id="signature" change="onChange"></ejs-signature>

<script>
    function onChange(args) {
        const signature = document.getElementById('signature').ej2_instances[0];
        console.log('Can undo:', signature.canUndo());
        console.log('Can redo:', signature.canRedo());
        console.log('Is empty:', signature.isEmpty());
    }
</script>
```

### `created`
Fires when the component is initialized.

```html
<ejs-signature id="signature" created="onCreated"></ejs-signature>

<script>
    function onCreated() {
        console.log('Signature component ready');
    }
</script>
```

---

## Complete Example

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs

<ejs-signature id="signature" 
               strokeColor="#000000"
               maxStrokeWidth="2"
               minStrokeWidth="0.5"
               velocity="0.7"
               saveWithBackground="true"
               change="onChange">
</ejs-signature>

<script>
    function onChange() {
        const signature = document.getElementById('signature').ej2_instances[0];
        console.log('Signature state:', {
            canUndo: signature.canUndo(),
            canRedo: signature.canRedo(),
            isEmpty: signature.isEmpty()
        });
    }
</script>
```

---

## Events

### `beforeSave`
- **Type:** `string` (event callback name)
- **Default:** `null`
- Event callback that is raised while saving the signature. The file name and the file type can be changed using `SignatureBeforeSaveEventArgs` and `SignatureFileType`. The event callback is raised only for the keyboard action (Ctrl + S).

```html
<ejs-signature id="signature" beforeSave="onBeforeSave"></ejs-signature>

<script>
    function onBeforeSave(args) {
        args.fileName = 'Custom_' + args.fileName;
    }
</script>
```

### `change`
- **Type:** `string` (event callback name)
- **Default:** `null`
- Event callback that is raised for the actions like undo, redo, clear and when the user completes signing on the signature component.

```html
<ejs-signature id="signature" change="onChange"></ejs-signature>

<script>
    function onChange(args) {
        const signature = document.getElementById('signature').ej2_instances[0];
        console.log('Can undo:', signature.canUndo());
        console.log('Can redo:', signature.canRedo());
        console.log('Is empty:', signature.isEmpty());
    }
</script>
```

### `created`
- **Type:** `string` (event callback name)
- **Default:** `null`
- Triggers once the component rendering is completed.

```html
<ejs-signature id="signature" created="onCreated"></ejs-signature>

<script>
    function onCreated() {
        console.log('Signature component ready');
    }
</script>
```

---

## See Also

- `signature-getting-started.md` — Quick start guide
- `signature-customization.md` — Customization options
- `signature-user-interaction.md` — User interaction patterns
- `signature-open-save.md` — Open/Save operations
