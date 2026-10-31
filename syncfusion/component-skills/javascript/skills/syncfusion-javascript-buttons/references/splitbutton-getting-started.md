# Getting Started — Syncfusion JavaScript SplitButton

## Table of Contents
- [Dependencies](#dependencies)
- [Setup: Local Script and Style](#setup-local-script-and-style)
- [Setup: CDN References](#setup-cdn-references)
- [Initialize the SplitButton](#initialize-the-splitbutton)
- [Configure Items](#configure-items)
- [Minimal Working Example](#minimal-working-example)

---

## Dependencies

The SplitButton requires the following packages:

```
@syncfusion/ej2-splitbuttons
  └── @syncfusion/ej2-base
  └── @syncfusion/ej2-buttons
  └── @syncfusion/ej2-popups
      └── @syncfusion/ej2-base
```

---

## Setup: Local Script and Style

**Step 1:** Create a project folder (e.g., `my-app`) and a `resources/` subfolder to hold local scripts and styles.

**Step 2:** Copy the following package scripts and styles from your Syncfusion installation into `resources/`:

```html

<!-- Dependency Styles -->
<link href="resources/base/material.css" rel="stylesheet" />
<link href="resources/buttons/material.css" rel="stylesheet" />
<link href="resources/popups/material.css" rel="stylesheet" />
<!-- SplitButton Style -->
<link href="resources/splitbuttons/material.css" rel="stylesheet" />

<!-- Dependency Scripts -->
<script src="resources/base/ej2-base.min.js"></script>
<script src="resources/buttons/ej2-buttons.min.js"></script>
<script src="resources/popups/ej2-popups.min.js"></script>
<!-- SplitButton Script -->
<script src="resources/splitbuttons/ej2-splitbuttons.min.js"></script>
```

**Step 3:** Create `index.html` and `index.js` in the project root and add the element and initialization script (see below).

---

## Setup: CDN References

For rapid prototyping without a local install, use CDN:

```html
<!DOCTYPE html>
<html>
<head>
    <title>SplitButton - CDN</title>
  <link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-popups/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/material.css" rel="stylesheet" />
  <script src="https://cdn.syncfusion.com/ej2/ej2-base/dist/global/ej2-base.min.js"></script>
  <script src="https://cdn.syncfusion.com/ej2/ej2-buttons/dist/global/ej2-buttons.min.js"></script>
  <script src="https://cdn.syncfusion.com/ej2/ej2-popups/dist/global/ej2-popups.min.js"></script>
  <script src="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/dist/global/ej2-splitbuttons.min.js"></script>
</head>
<body>
  <!-- SplitButton target element must be a <button> -->
  <button id="element">Paste</button>
  <script>
    import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
    import { enableRipple } from '@syncfusion/ej2-base';

    enableRipple(true);
    const items: ItemModel[] = [
      { text: 'Cut' },
      { text: 'Copy' },
      { text: 'Paste' }
    ];
    const splitBtn: SplitButton = new SplitButton({ items: items });
    splitBtn.appendTo('#element');
  </script>
</body>
</html>
```

---

## Initialize the SplitButton

The SplitButton **must target a `<button>` HTML element**. Instantiate via the `SplitButton` constructor and call `appendTo()`:

```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';
import { ItemModel } from '@syncfusion/ej2-buttons';

const options: any = { items: [] };
let splitBtn: SplitButton = new SplitButton(options);
splitBtn.appendTo('#element');
// OR pass the selector as the second constructor argument:
let splitBtn2: SplitButton = new SplitButton(options, '#element');
```

- `appendTo()` mounts and renders the component.
- Call `destroy()` to clean up when removing the component.

---

## Configure Items

Use the `items` property (array of `ItemModel`) to define popup action items:

```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';
import { ItemModel } from '@syncfusion/ej2-buttons';

const items: ItemModel[] = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' }
];

let splitBtn: SplitButton = new SplitButton({ items: items });
splitBtn.appendTo('#element');
```

Each `ItemModel` supports:
| Property   | Type    | Description                                      |
|------------|---------|--------------------------------------------------|
| `text`     | string  | Label for the item                               |
| `iconCss`  | string  | CSS class(es) for an icon                        |
| `id`       | string  | Unique identifier for the item                   |
| `separator`| boolean | Set `true` to render a horizontal divider line   |
| `disabled` | boolean | Set `true` to disable a specific item            |
| `url`      | string  | Navigation URL for the item                      |

---

## Minimal Working Example

Full standalone HTML page with CDN, a `<button>` element, and three action items:

```html
<!DOCTYPE html>
<html>
<head>
  <title>SplitButton - CDN</title>
  <link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-popups/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/material.css" rel="stylesheet" />
  <script src="https://cdn.syncfusion.com/ej2/ej2-base/dist/global/ej2-base.min.js"></script>
  <script src="https://cdn.syncfusion.com/ej2/ej2-buttons/dist/global/ej2-buttons.min.js"></script>
  <script src="https://cdn.syncfusion.com/ej2/ej2-popups/dist/global/ej2-popups.min.js"></script>
  <script src="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/dist/global/ej2-splitbuttons.min.js"></script>
</head>
<body>
  <button id="element">Paste</button>
  <script type="module">
    import { enableRipple } from '@syncfusion/ej2-base';
    import { SplitButton } from '@syncfusion/ej2-splitbuttons';
    import { ItemModel } from '@syncfusion/ej2-buttons';

    enableRipple(true);

    const items: ItemModel[] = [
      { text: 'Cut' },
      { text: 'Copy' },
      { text: 'Paste' }
    ];

    const splitBtn: SplitButton = new SplitButton({ items: items });
    splitBtn.appendTo('#element');
  </script>
</body>
</html>
```

> **Tip:** The text shown in the primary button comes from the `<button>` element's inner text, or from the `content` property if set programmatically.
