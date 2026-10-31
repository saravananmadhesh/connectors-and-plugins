# API Reference for Angular Signature Component

## Table of Contents
- [Overview](#overview)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Quick Reference Table](#quick-reference-table)

## Overview

Complete API reference for the Syncfusion Angular Signature component. All properties, methods, and events are documented with descriptions, types, defaults, and usage examples.

## Properties

### backgroundColor

Gets or sets the background color of the component.

```typescript
backgroundColor: string
```

**Type:** `string`  
**Default:** `''` (empty - renders as white)  
**Description:** The background color that accepts hex value (#fff), rgb (rgb(255,255,255)), and text ('red').

**Example:**
```typescript
<canvas ejs-signature [backgroundColor]="'#f5f5f5'"></canvas>
```

---

### backgroundImage

Gets or sets the background image for the component.

```typescript
backgroundImage: string
```

**Type:** `string`  
**Default:** `''` (empty - no background image)  
**Description:** An image URL or base64-encoded string used to fill the background of the component. The image can be hosted locally or from an online source.

**Example:**
```typescript
<canvas ejs-signature [backgroundImage]="'https://example.com/watermark.png'"></canvas>
```

---

### disabled

Gets or sets whether to disable the signature component where the opacity is set to show disabled state.

```typescript
disabled: boolean
```

**Type:** `boolean`  
**Default:** `false`  
**Description:** When set to `true`, the signature component is disabled for user interaction. Component cannot receive focus and users cannot draw.

**Example:**
```typescript
<canvas ejs-signature [disabled]="isDisabled"></canvas>
```

---

### enablePersistence

Gets or sets whether to persist component's state between page reloads.

```typescript
enablePersistence: boolean
```

**Type:** `boolean`  
**Default:** `false`  
**Description:** When set to `true`, the component's state and property values are stored in browser local storage and restored when the page reloads.

**Example:**
```typescript
<canvas ejs-signature [enablePersistence]="true"></canvas>
```

---

### isReadOnly

Gets or sets whether to prevent the interaction in signature component.

```typescript
isReadOnly: boolean
```

**Type:** `boolean`  
**Default:** `false`  
**Description:** When set to `true`, the signature component is in read-only state. Component remains focusable but prevents any drawing operations.

**Example:**
```typescript
<canvas ejs-signature [isReadOnly]="true"></canvas>
```

---

### maxStrokeWidth

Gets or sets the maximum stroke width for signature.

```typescript
maxStrokeWidth: number
```

**Type:** `number`  
**Default:** `2`  
**Description:** The maximum width of stroke. The signature component calculates stroke width based on Velocity, MinStrokeWidth, and MaxStrokeWidth.

**Example:**
```typescript
<canvas ejs-signature [maxStrokeWidth]="3"></canvas>
```

---

### minStrokeWidth

Gets or sets the minimum stroke width for signature.

```typescript
minStrokeWidth: number
```

**Type:** `number`  
**Default:** `0.5`  
**Description:** The minimum width of stroke. The signature component calculates stroke width based on Velocity, MinStrokeWidth, and MaxStrokeWidth.

**Example:**
```typescript
<canvas ejs-signature [minStrokeWidth]="0.5"></canvas>
```

---

### saveWithBackground

Gets or sets whether to save the signature along with Background Color and background Image while saving.

```typescript
saveWithBackground: boolean
```

**Type:** `boolean`  
**Default:** `true`  
**Description:** When set to `true`, signature component saves with background. When `false`, only the signature strokes are saved.

**Example:**
```typescript
<canvas ejs-signature [saveWithBackground]="false"></canvas>
```

---

### signatureValue

Gets or sets the last signature URL to maintain the persist state.

```typescript
signatureValue: string
```

**Type:** `string`  
**Default:** (empty)  
**Description:** Internal property that stores the last signature value for persistence across page reloads.

---

### strokeColor

Gets or sets the stroke color of the signature.

```typescript
strokeColor: string
```

**Type:** `string`  
**Default:** `'#000000'` (black)  
**Description:** The color of the signature stroke that accepts hex value (#ff0000), rgb (rgb(255,0,0)), and text ('red').

**Example:**
```typescript
<canvas ejs-signature [strokeColor]="'#2196F3'"></canvas>
```

---

### velocity

Gets or sets the velocity to calculate the stroke thickness based on the pressure of the contact on the digitizer surface.

```typescript
velocity: number
```

**Type:** `number`  
**Default:** `0.7`  
**Description:** The velocity value affects stroke thickness calculation. Higher values mean faster strokes produce thicker lines. The Signature component calculates stroke thickness based on Velocity, MinStrokeWidth, and MaxStrokeWidth.

**Example:**
```typescript
<canvas ejs-signature [velocity]="0.7"></canvas>
```

---

## Methods

### canRedo

To check whether the redo collection is empty or not.

```typescript
canRedo(): boolean
```

**Returns:** `boolean` - `true` if redo history exists, `false` otherwise

**Use Case:** Enable/disable redo button before allowing redo operation

**Example:**
```typescript
if (this.signature?.canRedo()) {
  this.signature.redo();
}
```

---

### canUndo

To check whether the undo collection is empty or not.

```typescript
canUndo(): boolean
```

**Returns:** `boolean` - `true` if undo history exists, `false` otherwise

**Use Case:** Enable/disable undo button before allowing undo operation

**Example:**
```typescript
if (this.signature?.canUndo()) {
  this.signature.undo();
}
```

---

### clear

Erases all the signature strokes signed by user.

```typescript
clear(): void
```

**Returns:** `void`

**Description:** Resets the signature canvas and clears all drawn strokes. This action is tracked in undo/redo history.

**Example:**
```typescript
this.signature?.clear();
```

---

### destroy

Removes the component from the DOM and detaches all its related event handlers. Also it maintains the initial input element from the DOM.

```typescript
destroy(): void
```

**Returns:** `void`

**Description:** Performs cleanup operations and removes the component from the DOM.

**Example:**
```typescript
this.signature?.destroy();
```

---

### draw

To draw the signature based on the given text, with the font family and font size.

```typescript
draw(text: string, fontFamily?: string, fontSize?: number): void
```

**Parameters:**

| Parameter | Type | Optional | Default | Description |
|-----------|------|----------|---------|-------------|
| `text` | string | No | - | The text to render as signature |
| `fontFamily` | string | Yes | "Arial" | Font family (Arial, Serif, Sans-serif, Cursive, Fantasy) |
| `fontSize` | number | Yes | 30 | Font size in pixels |

**Returns:** `void`

**Example:**
```typescript
this.signature?.draw('John Doe', 'Cursive', 32);
```

---

### getBlob

To get the signature as Blob.

```typescript
getBlob(url?: string): Blob
```

**Parameters:**

| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | Specify the url/base64 string to get blob of the signature |

**Returns:** `Blob` - Binary blob data of the signature

**Use Case:** Upload to server or store in database

**Example:**
```typescript
const blob = this.signature?.getBlob();
```

---

### getSignature

Gets the signature as a Base 64 string.

```typescript
getSignature(): string
```

**Parameters:** None

**Returns:** `string` - Base64-encoded image string in PNG format

**Description:** This method is used to retrieve the current signature on the canvas as a Base64-encoded string, in PNG format.

**Use Case:** Store in database, transfer via API, or reload with `load()` method

**Example:**
```typescript
const base64 = this.signature?.getSignature();
console.log(base64); // data:image/png;base64,iVBORw0KGgo...
```

---

### isEmpty

To check whether the signature is empty or not.

```typescript
isEmpty(): boolean
```

**Returns:** `boolean` - `true` if signature canvas is empty, `false` if it contains strokes

**Use Case:** Validate signature before saving or validate form submission

**Example:**
```typescript
if (!this.signature?.isEmpty()) {
  this.saveSignature();
}
```

---

### load

To load the signature with the given base64 string, height and width.

```typescript
load(signature: string, width?: number, height?: number): void
```

**Parameters:**

| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `signature` | string | No | Specify the url/base64 string to be drawn as signature |
| `width` | number | Yes | Specify the width of the loaded signature image |
| `height` | number | Yes | Specify the height of the loaded signature image |

**Returns:** `void`

**Supported Formats:** PNG Base64, JPEG Base64, SVG Base64, Hosted URLs

**Example:**
```typescript
const base64String = 'data:image/png;base64,iVBORw0KGgo...';
this.signature?.load(base64String);
```

---

### redo

Redo the last user action.

```typescript
redo(): void
```

**Returns:** `void`

**Description:** Moves to the next snapshot in the redo history.

**Example:**
```typescript
if (this.signature?.canRedo()) {
  this.signature.redo();
}
```

---

### refresh

To refresh the signature.

```typescript
refresh(): void
```

**Returns:** `void`

**Description:** Refreshes the signature component, redraws the canvas, and resets internal state.

**Example:**
```typescript
this.signature?.refresh();
```

---

### save

To save the signature with the given file type and file name.

```typescript
save(type?: SignatureFileType, fileName?: string): void
```

**Parameters:**

| Parameter | Type | Optional | Default | Description |
|-----------|------|----------|---------|-------------|
| `type` | SignatureFileType | Yes | "Png" | Specify type of the file to be saved (Png, Jpeg, Svg) |
| `fileName` | string | Yes | "Signature" | Specify name of the file to be saved |

**Returns:** `void`

**File Types:**
- `"Png"` - PNG format (lossless, recommended)
- `"Jpeg"` - JPEG format (lossy, smaller file size)
- `"Svg"` - SVG format (vector, scalable)

**Example:**
```typescript
this.signature?.save('Png', 'MySignature');
```

---

### saveAsBlob

To save the signature as Blob.

```typescript
saveAsBlob(): Blob
```

**Returns:** `Blob` - Binary blob data of the signature

**Use Case:** Direct database storage, file uploads, or API transmission

**Example:**
```typescript
const blob = this.signature?.saveAsBlob();
const formData = new FormData();
formData.append('signature', blob, 'signature.png');
```

---

### undo

Undo the last user action.

```typescript
undo(): void
```

**Returns:** `void`

**Description:** Moves to the previous snapshot in the undo history.

**Example:**
```typescript
if (this.signature?.canUndo()) {
  this.signature.undo();
}
```

---

## Events

### beforeSave

Gets or sets an event callback that is raised while saving the signature.

```typescript
beforeSave: EmitType<SignatureBeforeSaveEventArgs>
```

**Event Arguments:** `SignatureBeforeSaveEventArgs`

| Property | Type | Description |
|----------|------|-------------|
| `fileName` | string | The name of the file to be saved |
| `fileType` | SignatureFileType | The type of the file (Png, Jpeg, Svg) |

**Description:** The file name and file type can be changed using the event arguments. The event callback is raised only for the keyboard action (Ctrl + S).

**Example:**
```typescript
<canvas ejs-signature (beforeSave)="onBeforeSave($event)"></canvas>
```

```typescript
onBeforeSave(args: SignatureBeforeSaveEventArgs): void {
  console.log('Saving file:', args.fileName, args.fileType);
}
```

---

### change

Gets or sets an event callback that is raised for the actions like undo, redo, clear and while user complete signing on signature component.

```typescript
change: EmitType<SignatureChangeEventArgs>
```

**Event Arguments:** `SignatureChangeEventArgs`

**Description:** This event is triggered when:
- User completes a stroke
- Undo operation is performed
- Redo operation is performed
- Clear operation is performed
- Any signature modification occurs

**Use Case:** Update button states, track modifications, validate input

**Example:**
```typescript
<canvas ejs-signature (change)="onChange()"></canvas>
```

```typescript
onChange(): void {
  // Update button states
  this.undoButton.disabled = !this.signature?.canUndo();
  this.redoButton.disabled = !this.signature?.canRedo();
  this.clearButton.disabled = this.signature?.isEmpty() || false;
}
```

---

### created

Triggers once the component rendering is completed.

```typescript
created: EmitType<Event>
```

**Event Arguments:** `Event`

**Description:** This event fires after the component has been fully initialized and rendered in the DOM. All DOM elements and child components are ready.

**Use Case:** Initialize related components, set initial values, attach additional event listeners

**Example:**
```typescript
<canvas ejs-signature (created)="onCreated()"></canvas>
```

```typescript
onCreated(): void {
  console.log('Signature component initialized');
  this.initializeToolbar();
}
```

---

## Quick Reference Table

### Properties Quick Reference

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `backgroundColor` | string | '' | Background color (hex/rgb/name) |
| `backgroundImage` | string | '' | Background image URL or base64 |
| `disabled` | boolean | false | Disable user input |
| `enablePersistence` | boolean | false | Persist state across reloads |
| `isReadOnly` | boolean | false | View-only mode |
| `maxStrokeWidth` | number | 2 | Maximum stroke thickness |
| `minStrokeWidth` | number | 0.5 | Minimum stroke thickness |
| `saveWithBackground` | boolean | true | Include background in save |
| `signatureValue` | string | '' | Current signature value |
| `strokeColor` | string | '#000000' | Stroke color (hex/rgb/name) |
| `velocity` | number | 0.7 | Stroke velocity factor |

### Methods Quick Reference

| Method | Returns | Purpose |
|--------|---------|---------|
| `canRedo()` | boolean | Check if redo available |
| `canUndo()` | boolean | Check if undo available |
| `clear()` | void | Erase signature |
| `destroy()` | void | Cleanup component |
| `draw()` | void | Draw text as signature |
| `getBlob()` | Blob | Export as Blob |
| `getSignature()` | string | Export as Base64 |
| `isEmpty()` | boolean | Check if empty |
| `load()` | void | Load signature |
| `redo()` | void | Redo action |
| `refresh()` | void | Refresh component |
| `save()` | void | Save as file |
| `saveAsBlob()` | Blob | Save as Blob |
| `undo()` | void | Undo action |

### Events Quick Reference

| Event | Args Type | Purpose |
|-------|-----------|---------|
| `beforeSave` | SignatureBeforeSaveEventArgs | Before file save |
| `change` | SignatureChangeEventArgs | On modification |
| `created` | Event | After initialization |

---

## Complete API Usage Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SignatureModule, ButtonModule],
  standalone: true,
  selector: 'app-api-demo',
  template: `
    <div>
      <!-- Properties -->
      <canvas 
        ejs-signature 
        #signature
        [backgroundColor]="'#f5f5f5'"
        [strokeColor]="'#1a73e8'"
        [minStrokeWidth]="0.5"
        [maxStrokeWidth]="3"
        [velocity]="0.7"
        [disabled]="false"
        [isReadOnly]="false"
        [saveWithBackground]="true"
        (change)="onChange()"
        (created)="onCreated()"
        (beforeSave)="onBeforeSave($event)">
      </canvas>

      <!-- Methods -->
      <div>
        <button ejs-button (click)="undo()">Undo</button>
        <button ejs-button (click)="redo()">Redo</button>
        <button ejs-button (click)="clear()">Clear</button>
        <button ejs-button (click)="save()">Save</button>
      </div>
    </div>
  `
})
export class ApiDemoComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  // Properties
  onClick(): void {
    this.signature!.backgroundColor = '#ffffff';
    this.signature!.strokeColor = '#000000';
  }

  // Methods
  undo(): void {
    if (this.signature?.canUndo()) {
      this.signature.undo();
    }
  }

  redo(): void {
    if (this.signature?.canRedo()) {
      this.signature.redo();
    }
  }

  clear(): void {
    this.signature?.clear();
  }

  save(): void {
    this.signature?.save('Png', 'Signature');
  }

  // Events
  onChange(): void {
    console.log('Signature changed');
  }

  onCreated(): void {
    console.log('Component created');
  }

  onBeforeSave(args: any): void {
    console.log('Before save:', args);
  }
}
```

---

## TypeScript Imports

```typescript
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureFileType } from '@syncfusion/ej2-inputs';
import { SignatureBeforeSaveEventArgs, SignatureChangeEventArgs } from '@syncfusion/ej2-inputs';
```

---

## Related Documentation

- [Getting Started Guide](./getting-started.md)
- [Drawing Signatures](./drawing-signatures.md)
- [User Interactions](./user-interactions.md)
- [Customization](./customization.md)
- [Open and Save](./open-save.md)
- [Toolbar Integration](./toolbar-integration.md)
- [Accessibility](./accessibility.md)
