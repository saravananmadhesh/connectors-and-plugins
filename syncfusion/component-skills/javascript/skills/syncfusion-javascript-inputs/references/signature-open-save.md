# Open & Save – Syncfusion TypeScript Signature

## Table of Contents
- [Open Signature](#open-signature)
- [Save as Image (PNG/JPEG/SVG)](#save-as-image-pngjpegseg)
- [Save as Base64](#save-as-base64)
- [Save as Blob](#save-as-blob)
- [Get Blob from URL](#get-blob-from-url)
- [Save with Background](#save-with-background)
- [Supported File Types](#supported-file-types)

---

## Open Signature

Use the `load(signature, width?, height?)` method to display a pre-drawn signature. It accepts:
- A **Base64-encoded** string (PNG, JPEG, or SVG)
- A **hosted/online URL**

```ts
import { Signature } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

let signature: Signature = new Signature({});
signature.appendTo('#signature');

let button: Button = new Button({ cssClass: 'e-primary' }, '#open');
button.element.onclick = () => {
  const signData: string = (document.getElementById('signInput') as HTMLInputElement).value;
  signature.load(signData);
};
```

Load with explicit dimensions (useful when the saved image has different proportions):

```ts
signature.load(base64String, 400, 200);  // load at 400px wide, 200px tall
```

---

## Save as Image (PNG/JPEG/SVG)

The `save(type?, fileName?)` method downloads the signature as an image file directly to the user's browser.

```ts
import { Signature, SignatureFileType } from '@syncfusion/ej2-inputs';
import { SplitButton, ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';

let signature: Signature = new Signature({});
signature.appendTo('#signature');

const items: ItemModel[] = [
  { text: 'Png' },
  { text: 'Jpeg' },
  { text: 'Svg' }
];

let splitBtn: SplitButton = new SplitButton(
  {
    iconCss: 'e-sign-icons e-save',
    content: 'Save',
    items: items,
    select: (args: MenuEventArgs) => {
      // Save with the selected type and a custom file name
      signature.save(args.item.text as SignatureFileType, 'Signature');
    }
  },
  '#save'
);

// Default save (PNG) on main button click
document.getElementById('save')!.onclick = () => { signature.save(); };
```

**Parameter details:**
- `type` – `'Png'` | `'Jpeg'` | `'Svg'` (default: `'Png'`)
- `fileName` – string without extension (default: `'signature'`)

---

## Save as Base64

The `getSignature()` method returns the current canvas content as a **Base64-encoded PNG string**. Use this when you need to:
- Send the signature to a server
- Store it in a database
- Reload it later with `load()`

```ts
import { Signature } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

let signature: Signature = new Signature({});
signature.appendTo('#signature');

let saveButton: Button = new Button({ cssClass: 'e-primary', content: 'Save As Base64' }, '#save');

document.getElementById('save')!.onclick = () => {
  const base64: string = signature.getSignature();
  console.log(base64);   // "data:image/png;base64,iVBORw0..."
  // send to server or store in DB
};
```

Reload the saved Base64 later:

```ts
signature.load(base64);
```

---

## Save as Blob

The `saveAsBlob()` method saves the canvas as a **Blob** object, which is useful for uploading via `FormData` or creating object URLs.

```ts
import { Signature } from '@syncfusion/ej2-inputs';

let signature: Signature = new Signature({});
signature.appendTo('#signature');

document.getElementById('upload')!.onclick = async () => {
  const blob: Blob = signature.saveAsBlob();

  // Example: upload to server
  const formData = new FormData();
  formData.append('signature', blob, 'signature.png');
  await fetch('/api/upload', { method: 'POST', body: formData });
};
```

---

## Get Blob from URL

The `getBlob(url)` method converts a given URL or Base64 string to a **Blob** object.

```ts
import { Signature } from '@syncfusion/ej2-inputs';

let signature: Signature = new Signature({});
signature.appendTo('#signature');

const base64: string = signature.getSignature();
const blob: Blob = signature.getBlob(base64);

// Use blob as needed (e.g., Object URL for preview)
const objectUrl = URL.createObjectURL(blob);
```

---

## Save with Background

By default (`saveWithBackground: true`), the saved file includes the background color and background image. Set it to `false` to save only the signature strokes on a transparent background.

```ts
import { Signature } from '@syncfusion/ej2-inputs';

// Save signature strokes only (transparent background in PNG/SVG)
let signature: Signature = new Signature({
  saveWithBackground: false,
  backgroundColor: '#f0f0f0'   // visible in canvas but not in saved file
});
signature.appendTo('#signature');
```

---

## Supported File Types

The `SignatureFileType` enum defines the supported output formats:

| Value | Format | Notes |
|---|---|---|
| `'Png'` | PNG | Lossless; supports transparency when `saveWithBackground: false` |
| `'Jpeg'` | JPEG | Lossy; no transparency support |
| `'Svg'` | SVG | Vector format; scalable without quality loss |
