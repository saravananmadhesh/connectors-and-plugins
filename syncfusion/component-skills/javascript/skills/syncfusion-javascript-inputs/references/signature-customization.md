# Customization – Syncfusion TypeScript Signature

## Table of Contents
- [Stroke Width](#stroke-width)
- [Stroke Color](#stroke-color)
- [Background Color](#background-color)
- [Background Image](#background-image)
- [Save With Background](#save-with-background)

---

## Stroke Width

The Signature component calculates a **variable stroke width** based on three properties working together:

| Property | Type | Default | Purpose |
|---|---|---|---|
| `minStrokeWidth` | number | 0.5 | Minimum stroke thickness in pixels |
| `maxStrokeWidth` | number | 2.0 | Maximum stroke thickness in pixels |
| `velocity` | number | 0.7 | Controls how quickly width responds to speed |

Higher `velocity` produces sharper transitions between thin and thick strokes, giving a more natural look. Increase `maxStrokeWidth` for bolder signatures.

```ts
import { Signature } from '@syncfusion/ej2-inputs';

let signature: Signature = new Signature({
  minStrokeWidth: 0.5,
  maxStrokeWidth: 3,
  velocity: 0.7
});
signature.appendTo('#signature');
```

You can update these properties dynamically after rendering:

```ts
signature.maxStrokeWidth = 5;   // immediately takes effect for new strokes
```

---

## Stroke Color

The `strokeColor` property sets the ink color. It accepts:
- **Hex** values: `'#e91e63'`
- **RGB** values: `'rgb(233, 30, 99)'`
- **Named colors**: `'red'`, `'blue'`, `'navy'`

Default: `'#000000'` (black).

```ts
import { Signature } from '@syncfusion/ej2-inputs';

let signature: Signature = new Signature({
  strokeColor: '#e91e63'
});
signature.appendTo('#signature');
```

Update dynamically (e.g., from a color picker input):

```ts
import { Signature } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

let signature: Signature = new Signature({});
signature.appendTo('#signature');

let button: Button = new Button({ cssClass: 'e-primary' }, '#set');
button.element.onclick = () => {
  const color: string = (document.getElementById('colorInput') as HTMLInputElement).value;
  signature.strokeColor = color;
};
```

---

## Background Color

The `backgroundColor` property fills the canvas background. It accepts the same color formats as `strokeColor`.

Default: `''` (transparent / white when saved).

```ts
import { Signature } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

let signature: Signature = new Signature({});
signature.appendTo('#signature');

let button: Button = new Button({ cssClass: 'e-primary' }, '#set');
button.element.onclick = () => {
  const bgColor: string = (document.getElementById('colorInput') as HTMLInputElement).value;
  signature.backgroundColor = bgColor;
};
```

Set at initialization:

```ts
let signature: Signature = new Signature({
  backgroundColor: 'rgb(103, 58, 183)'   // deep purple background
});
signature.appendTo('#signature');
```

---

## Background Image

The `backgroundImage` property sets an image as the canvas background. Provide either a **hosted/online URL** or a **local server URL**.

Default: `''` (no background image).

```ts
import { Signature } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

let signature: Signature = new Signature({});
signature.appendTo('#signature');

let button: Button = new Button({ cssClass: 'e-primary' }, '#set');
button.element.onclick = () => {
  const url: string = (document.getElementById('urlInput') as HTMLInputElement).value;
  signature.backgroundImage = url;
};
```

Set at initialization:

```ts
let signature: Signature = new Signature({
  backgroundImage: 'https://example.com/signature-bg.png'
});
signature.appendTo('#signature');
```

---

## Save With Background

The `saveWithBackground` property controls whether the background (color and image) is included when saving the signature.

Default: `true` — background is always saved.

```ts
import { Signature, SignatureFileType } from '@syncfusion/ej2-inputs';
import { SplitButton, ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';

let signature: Signature = new Signature({
  saveWithBackground: true,
  backgroundColor: 'rgb(103, 58, 183)'
});
signature.appendTo('#signature');

const items: ItemModel[] = [
  { text: 'Png' },
  { text: 'Jpeg' },
  { text: 'Svg' }
];

let splitBtn: SplitButton = new SplitButton(
  {
    iconCss: 'e-sign-icons e-save',
    items: items,
    content: 'Save',
    select: (args: MenuEventArgs) => {
      signature.save(args.item.text as SignatureFileType, 'Signature');
    }
  },
  '#save'
);

document.getElementById('save')!.onclick = () => { signature.save(); };
```

Set `saveWithBackground: false` to save only the strokes (transparent background):

```ts
let signature: Signature = new Signature({
  saveWithBackground: false,
  backgroundColor: '#f5f5f5'    // visible in canvas but excluded from saved file
});
signature.appendTo('#signature');
```
