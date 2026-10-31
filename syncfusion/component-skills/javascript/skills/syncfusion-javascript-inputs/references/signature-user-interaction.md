# User Interaction – Syncfusion TypeScript Signature

## Table of Contents
- [Undo and Redo](#undo-and-redo)
- [Clear](#clear)
- [Disabled](#disabled)
- [ReadOnly](#readonly)
- [Change Event](#change-event)
- [Created Event](#created-event)
- [BeforeSave Event](#beforesave-event)
- [Draw Text as Signature](#draw-text-as-signature)
- [Full Example with All Interactions](#full-example-with-all-interactions)

---

## Undo and Redo

Every stroke is stored as a **snap** in an internal history stack. Undo and redo navigate this stack.

| Method | Description |
|---|---|
| `undo()` | Reverts the last action (decrements snap index) |
| `redo()` | Re-applies the last undone action (increments snap index) |
| `canUndo()` | Returns `true` if there are actions to undo |
| `canRedo()` | Returns `true` if there are actions to redo |

Always guard with `canUndo()`/`canRedo()` before calling to avoid errors on empty history:

```ts
import { Signature } from '@syncfusion/ej2-inputs';

let signature: Signature = new Signature({});
signature.appendTo('#signature');

document.getElementById('undoBtn')!.onclick = () => {
  if (signature.canUndo()) {
    signature.undo();
  }
};

document.getElementById('redoBtn')!.onclick = () => {
  if (signature.canRedo()) {
    signature.redo();
  }
};
```

---

## Clear

The `clear()` method erases all strokes from the canvas and is tracked in the undo/redo history (so it can itself be undone). Use `isEmpty()` to check if the canvas is currently blank.

| Method | Description |
|---|---|
| `clear()` | Erases all signature strokes |
| `isEmpty()` | Returns `true` if the canvas has no strokes |

```ts
document.getElementById('clearBtn')!.onclick = () => {
  if (!signature.isEmpty()) {
    signature.clear();
  }
};
```

---

## Disabled

Set `disabled: true` to prevent the user from interacting with the Signature. The component renders with a reduced opacity to indicate the disabled state. A disabled component cannot receive focus.

```ts
import { Signature } from '@syncfusion/ej2-inputs';

let signature: Signature = new Signature({
  disabled: true
});
signature.appendTo('#signature');
```

Toggle dynamically:

```ts
signature.disabled = false;  // re-enable
signature.disabled = true;   // disable again
```

When disabled, always skip programmatic draw/undo/redo/clear to match the visual state:

```ts
if (!signature.disabled) {
  signature.undo();
}
```

---

## ReadOnly

Set `isReadOnly: true` to allow focusing the Signature but prevent the user from drawing. Unlike `disabled`, the component does not change its opacity.

```ts
import { Signature } from '@syncfusion/ej2-inputs';

let signature: Signature = new Signature({
  isReadOnly: true
});
signature.appendTo('#signature');
```

Toggle dynamically:

```ts
signature.isReadOnly = false;  // allow drawing
signature.isReadOnly = true;   // prevent drawing (but keep focusable)
```

---

## Change Event

The `change` event fires after:
- A stroke is completed
- An undo or redo is performed
- A clear is performed

Use it to keep UI controls (buttons, toolbar items) synchronized with the signature state.

```ts
import { Signature, SignatureChangeEventArgs } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

let undoButton: Button = new Button({ cssClass: 'e-primary', disabled: true }, '#undo');
let redoButton: Button = new Button({ cssClass: 'e-primary', disabled: true }, '#redo');
let clearButton: Button = new Button({ cssClass: 'e-primary', disabled: true }, '#clear');

let signature: Signature = new Signature({
  change: (args: SignatureChangeEventArgs) => {
    if (!signature.disabled && !signature.isReadOnly) {
      undoButton.disabled  = !signature.canUndo();
      redoButton.disabled  = !signature.canRedo();
      clearButton.disabled = signature.isEmpty();
    }
  }
});
signature.appendTo('#signature');

undoButton.element.onclick  = () => { if (signature.canUndo()) { signature.undo(); } };
redoButton.element.onclick  = () => { if (signature.canRedo()) { signature.redo(); } };
clearButton.element.onclick = () => { signature.clear(); };
```

---

## Created Event

The `created` event fires once after the component is fully rendered. Use it for post-initialization tasks such as loading a default signature.

```ts
import { Signature } from '@syncfusion/ej2-inputs';

let signature: Signature = new Signature({
  created: () => {
    console.log('Signature component ready');
  }
});
signature.appendTo('#signature');
```

---

## BeforeSave Event

The `beforeSave` event fires **only for keyboard save (Ctrl+S)**. It receives `SignatureBeforeSaveEventArgs`, allowing you to change the file name or file type before saving.

```ts
import { Signature, SignatureBeforeSaveEventArgs } from '@syncfusion/ej2-inputs';

let signature: Signature = new Signature({
  beforeSave: (args: SignatureBeforeSaveEventArgs) => {
    args.fileName = 'custom-signature';   // override default file name
    // args.type is the SignatureFileType (e.g., 'Png')
  }
});
signature.appendTo('#signature');
```

---

## Draw Text as Signature

The `draw(text, fontFamily?, fontSize?)` method renders text directly onto the canvas as a signature stroke.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `text` | string | — | The text to draw |
| `fontFamily` | string | `'Arial'` | Font family for the text |
| `fontSize` | number | `30` | Font size in pixels |

```ts
import { Signature } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';

let signature: Signature = new Signature({});
signature.appendTo('#signature');

let fontDdl: DropDownList = new DropDownList({ value: 'Arial', popupHeight: '200px' });
fontDdl.appendTo('#fontFamily');

let sizeDdl: DropDownList = new DropDownList({ value: '30', popupHeight: '200px' });
sizeDdl.appendTo('#fontSize');

let drawButton: Button = new Button({ cssClass: 'e-primary' }, '#draw');
drawButton.element.onclick = () => {
  const text: string   = (document.getElementById('signText') as HTMLInputElement).value;
  const font: string   = fontDdl.value as string;
  const size: number   = Number(sizeDdl.value);
  signature.draw(text, font, size);
};
```

---

## Full Example with All Interactions

```ts
import { Signature, SignatureChangeEventArgs } from '@syncfusion/ej2-inputs';
import { CheckBox, ChangeEventArgs, Button } from '@syncfusion/ej2-buttons';

let signature: Signature = new Signature({ change: syncButtons });
signature.appendTo('#signature');

let undoBtn:  Button = new Button({ cssClass: 'e-primary', disabled: true }, '#undo');
let redoBtn:  Button = new Button({ cssClass: 'e-primary', disabled: true }, '#redo');
let clearBtn: Button = new Button({ cssClass: 'e-primary', disabled: true }, '#clear');

undoBtn.element.onclick  = () => { if (!signature.disabled && !signature.isReadOnly && signature.canUndo())  { signature.undo();  } };
redoBtn.element.onclick  = () => { if (!signature.disabled && !signature.isReadOnly && signature.canRedo())  { signature.redo();  } };
clearBtn.element.onclick = () => { if (!signature.disabled && !signature.isReadOnly)                        { signature.clear(); } };

new CheckBox({ label: 'Disabled', change: (a: ChangeEventArgs) => { signature.disabled   = a.checked!; } }, '#disable');
new CheckBox({ label: 'ReadOnly', change: (a: ChangeEventArgs) => { signature.isReadOnly = a.checked!; } }, '#readonly');

function syncButtons(): void {
  if (!signature.disabled && !signature.isReadOnly) {
    undoBtn.disabled  = !signature.canUndo();
    redoBtn.disabled  = !signature.canRedo();
    clearBtn.disabled = signature.isEmpty();
  }
}
```
