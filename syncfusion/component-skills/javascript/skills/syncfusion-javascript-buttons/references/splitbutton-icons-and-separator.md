# Icons and Separator — Syncfusion JavaScript SplitButton

## Table of Contents
- [SplitButton Icons](#splitbutton-icons)
- [Icon Position](#icon-position)
- [Vertical SplitButton](#vertical-splitbutton)
- [Separator in Popup](#separator-in-popup)

---

## SplitButton Icons

Use the `iconCss` property to add an icon to the primary SplitButton. Set it to one or more CSS class names (space-separated) that apply the icon. Syncfusion provides built-in icons via the `e-icons` class.

```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';
import { ItemModel } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' }
];

// Icon on the left (default position)
const splitBtn: SplitButton = new SplitButton({
  iconCss: 'e-icons e-paste',
  items: items
});
splitBtn.appendTo('#element');
```

> Third-party icon libraries (e.g., Font Awesome) can be used by supplying the appropriate CSS class string to `iconCss`.

---

## Icon Position

By default, the icon appears to the **left** of the button text. Use the `iconPosition` property to move it to the **top**:

| Value   | Description                                  |
|---------|----------------------------------------------|
| `"Left"` | Icon is left of text (default)              |
| `"Top"`  | Icon is above text (stacked layout)         |

```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';
import { ItemModel } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' }
];

// Default: icon on the left
const splitBtnLeft: SplitButton = new SplitButton({
  iconCss: 'e-icons e-paste',
  items: items
});
splitBtnLeft.appendTo('#iconbutton');

// Icon on the top
const splitBtnTop: SplitButton = new SplitButton({
  iconCss: 'e-icons e-paste',
  iconPosition: 'Top',
  items: items
});
splitBtnTop.appendTo('#iconpstn');
```

---

## Vertical SplitButton

A vertical layout stacks the icon above the label text. Achieve this by combining `iconPosition: 'Top'` with the `e-vertical` CSS class via the `cssClass` property:

```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';
import { ItemModel } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' }
];

const splitBtn: SplitButton = new SplitButton({
  iconCss: 'e-icons e-paste',
  items: items,
  cssClass: 'e-vertical',
  iconPosition: 'Top'
});
splitBtn.appendTo('#element');
```

The `e-vertical` class applies the vertical flex layout. Both `iconPosition: 'Top'` and `cssClass: 'e-vertical'` are needed for the correct visual output.

---

## Separator in Popup

Separators are horizontal dividing lines between popup action items. They visually group related items. Add a separator by including an item object with `separator: true` in the `items` array.

> Separators cannot be selected — they are purely visual.

```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';
import { ItemModel } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut',   iconCss: 'e-icons e-cut' },
  { text: 'Copy',  iconCss: 'e-icons e-copy' },
  { text: 'Paste', iconCss: 'e-icons e-paste' },
  { separator: true },                           // ← horizontal divider
  { text: 'Font',      iconCss: 'e-icons e-font' },
  { text: 'Paragraph', iconCss: 'e-icons e-paragraph' }
];

const splitBtn: SplitButton = new SplitButton({
  iconCss: 'e-icons e-paste',
  items: items
});
splitBtn.appendTo('#element');
```

Separators work alongside icons and text items. Place them between any two items that need visual separation.
