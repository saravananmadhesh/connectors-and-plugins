# API Reference — Syncfusion JavaScript SplitButton

> Source: https://ej2.syncfusion.com/documentation/api/split-button/index-default

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
  - [appendTo](#appendtoselector)
  - [toggle](#toggle)
  - [addItems](#additemsitems-text)
  - [removeItems](#removeitemsitems-isuniqueid)
  - [dataBind](#databind)
  - [refresh](#refresh)
  - [destroy](#destroy)
  - [focusIn](#focusin)
  - [getRootElement](#getrootelement)
  - [getPersistData](#getpersistdata)
  - [onPropertyChanged](#onpropertychangednewprop-oldprop)
  - [addEventListener](#addeventlistenereventname-handler)
  - [removeEventListener](#removeeventlistenereventname-handler)
  - [Inject](#injectmodulelist)
- [Events](#events)
- [ItemModel Interface](#itemmodel-interface)
- [Usage Notes](#usage-notes)

---

## Properties

### animationSettings `DropDownMenuAnimationSettingsModel`
Specifies the animation settings for opening the popup. Controls duration, easing, and effect.

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[],
  animationSettings: { effect: 'None' }
});
splitBtn.appendTo('#element');
```

**Defaults to:** `{ effect: 'None' }`

---

### closeActionEvents `string`
Specifies the event that closes the SplitButton popup.

**Defaults to:** `""`

---

### content `string`
Defines the text or HTML content of the primary action button.

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[]
});
splitBtn.appendTo('#element');
```

**Defaults to:** `""`

---

### createPopupOnClick `boolean`
When `true`, creates the popup element only when the dropdown arrow is first clicked (lazy creation).

**Defaults to:** `false`

---

### cssClass `string`
Defines one or more CSS classes (space-separated) applied to the SplitButton element. Used to customise size, style, and layout.

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

// Small size
const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  cssClass: 'e-small',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[]
});
splitBtn.appendTo('#element');

// Vertical layout
const splitBtnV: SplitButton = new SplitButton({
  iconCss: 'e-icons e-paste',
  cssClass: 'e-vertical',
  iconPosition: 'Top',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[]
});
splitBtnV.appendTo('#vertical');
```

**Defaults to:** `""`

---

### disabled `boolean`
When `true`, disables the entire SplitButton — both the primary button and the popup arrow are non-interactive.

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[],
  disabled: true
});
splitBtn.appendTo('#element');
```

**Defaults to:** `false`

---

### enableHtmlSanitizer `boolean`
When `true`, sanitizes any untrusted HTML strings before rendering them in the component to prevent XSS.

**Defaults to:** `true`

---

### enablePersistence `boolean`
When `true`, persists the component's state between page reloads using browser `localStorage`.

**Defaults to:** `false`

---

### enableRtl `boolean`
When `true`, renders the component in right-to-left direction.

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[],
  enableRtl: true
});
splitBtn.appendTo('#element');
```

**Defaults to:** `false`

---

### iconCss `string`
Defines CSS class(es) for the icon displayed on the primary SplitButton. Supports Syncfusion `e-icons` and third-party icon classes.

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  iconCss: 'e-icons e-paste',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[]
});
splitBtn.appendTo('#element');
```

**Defaults to:** `""`

---

### iconPosition `SplitButtonIconPosition`
Positions the icon relative to the button text.

| Value    | Description                          |
|----------|--------------------------------------|
| `"Left"` | Icon appears to the left of text (default) |
| `"Top"`  | Icon appears above text               |

**Example:**

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  iconCss: 'e-icons e-paste',
  iconPosition: 'Top',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[]
});
splitBtn.appendTo('#element');
```

**Defaults to:** `"Left"`

---

### itemTemplate `string | Function`
Specifies a template string or function to render custom content for each popup item.

**Defaults to:** `null`

---

### items `ItemModel[]`
Array of popup menu items.

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const items: ItemModel[] = [
  { text: 'Cut',   iconCss: 'e-icons e-cut' },
  { text: 'Copy',  iconCss: 'e-icons e-copy' },
  { text: 'Paste', iconCss: 'e-icons e-paste' },
  { separator: true },
  { text: 'Select All' }
];

const splitBtn: SplitButton = new SplitButton({ items: items });
splitBtn.appendTo('#element');
```

**Defaults to:** `[]`

---

### locale `string`
Overrides the global culture and localization value for this component instance.

**Defaults to:** `''` (uses global culture, which defaults to `'en-US'`)

---

### popupWidth `string | number`
Defines the width of the popup dropdown. Accepts CSS values (`'200px'`, `'50%'`) or numeric pixel values.

**Defaults to:** `"auto"`

---

### target `string | HTMLElement`
Specifies a custom element to use as the popup content instead of the standard `items` menu. Accepts a CSS selector string or a DOM element reference.

```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  iconCss: 'e-icons e-color',
  target: '#dropdowntarget'
});
splitBtn.appendTo('#element');
```

**Defaults to:** `""`

---

## Methods

### appendTo(selector?)
Mounts the SplitButton component into a target DOM element.

| Parameter  | Type                        | Description                                    |
|------------|-----------------------------|-------------------------------------------------|
| `selector` | `string \| HTMLElement`     | Target element selector or DOM element         |

**Returns:** `void`

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({ items: [{ text: 'Cut' }] as ItemModel[] });
splitBtn.appendTo('#element');
splitBtn.appendTo(document.getElementById('element')!);
```

---
### toggle()
Opens the popup if it is closed, or closes it if it is open.

**Returns:** `void`

```typescript
splitBtn.toggle(); // open
splitBtn.toggle(); // close
```

---

### addItems(items, text?)
Appends new items to the popup menu. If `text` is specified, inserts before the item with that text.

| Parameter  | Type          | Description                                        |
|------------|---------------|----------------------------------------------------|
| `items`    | `ItemModel[]` | Array of new items to add                          |
| `text`     | `string`      | Insert before the item with this text (optional)   |

**Returns:** `void`

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({ content: 'Paste' });
splitBtn.appendTo('#element');

splitBtn.addItems([{ text: 'New Item' }] as ItemModel[]);
splitBtn.addItems([{ text: 'Before Copy' }] as ItemModel[], 'Copy');
```

---

### removeItems(items, isUniqueId?)
Removes specified items from the popup menu.

| Parameter              | Type       | Description                                              |
|------------------------|------------|----------------------------------------------------------|
| `items`                | `string[]` | Array of item text labels (or IDs) to remove             |
| `isUniqueId` (optional)| `boolean`  | Set `true` if `items` contains unique IDs instead of text|

**Returns:** `void`

```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({ content: 'Paste' });
splitBtn.appendTo('#element');

// Remove by text
splitBtn.removeItems(['Cut', 'Paste']);

// Remove by unique id
splitBtn.removeItems(['item-id-1'], true);
```

---

### dataBind()
Applies all pending property changes to the component immediately without a full re-render.

**Returns:** `void`

```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({ content: 'Paste' });
splitBtn.appendTo('#element');

splitBtn.disabled = true;
splitBtn.dataBind(); // applies the disabled change
```

---

### refresh()
Applies all pending property changes and re-renders the component from scratch.

**Returns:** `void`

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({ content: 'Paste' });
splitBtn.appendTo('#element');

splitBtn.items = [{ text: 'New Action' }] as ItemModel[];
splitBtn.refresh();
```

Use `dataBind()` for lightweight property updates; use `refresh()` when structural changes require a full re-render.

---

### destroy()
Destroys the SplitButton — removes event listeners, clears internal state, and cleans up the DOM.

**Returns:** `void`

```typescript
splitBtn.destroy();
```

Call `destroy()` when removing the component to prevent memory leaks.

---

### focusIn()
Programmatically sets focus to the SplitButton's native element.

**Returns:** `void`

```typescript
splitBtn.focusIn();
```

---

### getRootElement()
Returns the root HTML element of the SplitButton component.

**Returns:** `HTMLElement`

```typescript
const rootEl: HTMLElement = splitBtn.getRootElement();
console.log(rootEl);
```

---

### addEventListener(eventName, handler)
Registers an event listener on the component.

| Parameter   | Type       | Description                     |
|-------------|------------|---------------------------------|
| `eventName` | `string`   | Name of the event to listen for |
| `handler`   | `Function` | Callback function               |

**Returns:** `void`

```typescript
splitBtn.addEventListener('created', (): void => {
  console.log('SplitButton created');
});
```

---

### removeEventListener(eventName, handler)
Removes a previously registered event listener.

| Parameter   | Type       | Description                              |
|-------------|------------|------------------------------------------|
| `eventName` | `string`   | Name of the event to remove              |
| `handler`   | `Function` | The exact handler function to remove     |

**Returns:** `void`

```typescript
const onCreate = (): void => { console.log('created'); };
splitBtn.addEventListener('created', onCreate);
splitBtn.removeEventListener('created', onCreate);
```

---

### getPersistData()
Returns a JSON string of the properties that should be persisted in browser `localStorage` when `enablePersistence` is `true`.

**Returns:** `string`

```typescript
const persistedState: string = splitBtn.getPersistData();
console.log(persistedState); // JSON string of persisted properties
```

---

### onPropertyChanged(newProp, oldProp)
Called internally by the framework when any property value changes. Handles re-rendering or partial updates based on which property changed.

| Parameter  | Type               | Description               |
|------------|--------------------|---------------------------|
| `newProp`  | `SplitButtonModel` | Specifies new properties  |
| `oldProp`  | `SplitButtonModel` | Specifies old properties  |

**Returns:** `void`

> This method is called internally by the framework. You do not need to call it manually — use `dataBind()` or `refresh()` to apply property changes.

---

### Inject(moduleList)
Dynamically injects required feature modules into the component. Used for tree-shaking optional modules.

| Parameter    | Type         | Description              |
|--------------|--------------|--------------------------|
| `moduleList` | `Function[]` | Array of module classes  |

**Returns:** `void`

> The SplitButton component has no optional feature modules — this method is inherited from the base class and is generally not required for SplitButton usage.

---

## Events

### click `EmitType<ClickEventArgs>`
Triggers when the **primary button** is clicked.

```typescript
import { SplitButton, ItemModel, ClickEventArgs } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[],
  click: (args: ClickEventArgs): void => {
    console.log('Primary button clicked');
  }
});
splitBtn.appendTo('#element');
```

---

### select `EmitType<MenuEventArgs>`
Triggers when a popup item is selected.

```typescript
import { SplitButton, ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[],
  select: (args: MenuEventArgs): void => {
    console.log('Selected: ' + args.item.text);
  }
});
splitBtn.appendTo('#element');
```

`args.item` — the selected `ItemModel`  
`args.element` — the clicked `<li>` DOM element

---

### beforeOpen `EmitType<BeforeOpenCloseMenuEventArgs>`
Triggers **before** the popup opens. Set `args.cancel = true` to prevent opening.

```typescript
import { SplitButton, ItemModel, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[],
  beforeOpen: (args: BeforeOpenCloseMenuEventArgs): void => {
    // args.cancel = true; // prevent popup from opening
    console.log('Popup about to open');
  }
});
splitBtn.appendTo('#element');
```

---

### open `EmitType<OpenCloseMenuEventArgs>`
Triggers when the popup **opens**.

```typescript
import { SplitButton, ItemModel, OpenCloseMenuEventArgs } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[],
  open: (args: OpenCloseMenuEventArgs): void => {
    console.log('Popup opened');
  }
});
splitBtn.appendTo('#element');
```

---

### beforeClose `EmitType<BeforeOpenCloseMenuEventArgs>`
Triggers **before** the popup closes. Call `args.cancel = true` to keep the popup open.

```typescript
import { SplitButton, ItemModel, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[],
  beforeClose: (args: BeforeOpenCloseMenuEventArgs): void => {
    console.log('Popup about to close');
  }
});
splitBtn.appendTo('#element');
```

---

### close `EmitType<OpenCloseMenuEventArgs>`
Triggers when the popup **closes**.

```typescript
import { SplitButton, ItemModel, OpenCloseMenuEventArgs } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[],
  close: (args: OpenCloseMenuEventArgs): void => {
    console.log('Popup closed');
  }
});
splitBtn.appendTo('#element');
```

---

### beforeItemRender `EmitType<MenuEventArgs>`
Triggers while **rendering each popup item**. Use to customize item DOM.

```typescript
import { SplitButton, ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[],
  beforeItemRender: (args: MenuEventArgs): void => {
    if (args.item.text === 'Copy') {
      args.element.innerHTML = '<u>C</u>opy';
    }
  }
});
splitBtn.appendTo('#element');
```

`args.item` — the `ItemModel` for the current item  
`args.element` — the `<li>` DOM element being rendered

---

### created `EmitType<Event>`
Triggers once the component has finished rendering.

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[],
  created: (): void => {
    console.log('SplitButton is ready');
  }
});
splitBtn.appendTo('#element');
```

---

## ItemModel Interface

Each item in the `items` array supports these fields:

| Property    | Type      | Description                                                   |
|-------------|-----------|---------------------------------------------------------------|
| `text`      | `string`  | Display label for the item                                    |
| `iconCss`   | `string`  | CSS class(es) for the item icon                               |
| `id`        | `string`  | Unique identifier (used with `removeItems(ids, true)`)        |
| `separator` | `boolean` | Set `true` to render a horizontal dividing line               |
| `disabled`  | `boolean` | Set `true` to disable this specific item                      |
| `url`       | `string`  | Navigation URL for anchor-based menu items                    |

---

## Usage Notes

- Always call `appendTo()` after creating the instance — the component is not rendered until mounted.
- The primary button's text comes from the `<button>` element's inner text or the `content` property (property takes precedence).
- `target` and `items` are mutually exclusive — when `target` is set, `items` is ignored.
- Use `dataBind()` for single/lightweight property updates; use `refresh()` when multiple structural properties change.
- Call `destroy()` when removing the component to clean up event listeners and avoid memory leaks.
- `beforeOpen` and `beforeClose` support cancellation via `args.cancel = true`.
- All string property values are case-sensitive — use the exact casing shown in this reference.
