# API Reference — Syncfusion Angular DropDownButton

**Source:** https://ej2.syncfusion.com/angular/documentation/api/drop-down-button/index-default

## Table of Contents
- [Component Selector](#component-selector)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [ItemModel Interface](#itemmodel-interface)
- [DropDownMenuAnimationSettingsModel Interface](#dropdownmenuanimationsettingsmodel-interface)
- [Event Argument Interfaces](#event-argument-interfaces)

---

## Component Selector

```html
<button ejs-dropdownbutton>DropDownButton</button>
```

Import: `DropDownButtonModule` from `@syncfusion/ej2-angular-splitbuttons`

---

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `animationSettings` | `DropDownMenuAnimationSettingsModel` | `{ effect: 'None' }` | Controls the popup open animation (effect, duration, easing) |
| `closeActionEvents` | `string` | `""` | DOM event name that triggers popup close |
| `content` | `string` | `""` | Button label text or HTML |
| `createPopupOnClick` | `boolean` | `false` | When `true`, defers popup DOM creation until first click |
| `cssClass` | `string` | `""` | One or more CSS classes to apply to the button element |
| `disabled` | `boolean` | `false` | Disables the button and popup when `true` |
| `enableHtmlSanitizer` | `boolean` | `true` | Sanitizes untrusted HTML in `content` and item `text` before rendering |
| `enablePersistence` | `boolean` | `false` | Persists component state in `localStorage` across page reloads |
| `enableRtl` | `boolean` | `false` | Enables right-to-left layout |
| `iconCss` | `string` | `""` | CSS class(es) for the button's icon |
| `iconPosition` | `SplitButtonIconPosition` | `"Left"` | Position of the icon relative to text. Values: `"Left"`, `"Top"` |
| `itemTemplate` | `string \| Function` | `null` | Angular `TemplateRef` or string template for custom item rendering |
| `items` | `ItemModel[]` | `[]` | Array of popup action item definitions |
| `locale` | `string` | `''` | Overrides the global culture/localization value |
| `popupWidth` | `string \| number` | `"auto"` | Width of the dropdown popup (CSS string or pixel number) |
| `target` | `string \| Element` | `""` | CSS selector or element reference to use as the popup content |

### cssClass Utility Classes

| Class | Effect |
|---|---|
| `e-caret-hide` | Hides the dropdown arrow |
| `e-caret-up` | Rotates the dropdown arrow upward |
| `e-vertical` | Stacks icon above text (vertical layout) |
| `e-round-corner` | Custom class for rounded corners (must define CSS) |

---

## Methods

### addItems

Adds one or more items to the popup menu.

```typescript
ddb.addItems(items: ItemModel[], text?: string): void
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `items` | `ItemModel[]` | Yes | Items to add |
| `text` | `string` | No | Text of the existing item to insert before. Omit to append at the end. |

**Example:**
```typescript
// Append new item at end
this.ddb.addItems([{ text: 'Paste' }]);

// Insert before 'Copy'
this.ddb.addItems([{ text: 'Undo' }], 'Copy');
```

---

### removeItems

Removes items from the popup menu by text or unique ID.

```typescript
ddb.removeItems(items: string[], isUniqueId?: boolean): void
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `items` | `string[]` | Yes | Array of item text values (or IDs if `isUniqueId` is `true`) |
| `isUniqueId` | `boolean` | No | Set `true` to match by item `id` instead of `text` |

**Example:**
```typescript
// Remove by text
this.ddb.removeItems(['Cut', 'Copy']);

// Remove by id
this.ddb.removeItems(['item-1'], true);
```

---

### toggle

Opens the popup if closed, closes it if open.

```typescript
ddb.toggle(): void
```

---

### focusIn

Sets focus to the DropDownButton element (native `focus()`).

```typescript
ddb.focusIn(): void
```

---

### destroy

Destroys the component and releases all resources.

```typescript
ddb.destroy(): void
```

---

### getPersistData

Returns the properties included in persisted state as a JSON string.

```typescript
ddb.getPersistData(): string
```

---

## Events

| Event | Output Type | Description |
|---|---|---|
| `beforeClose` | `EmitType<BeforeOpenCloseMenuEventArgs>` | Fires before the popup closes |
| `beforeItemRender` | `EmitType<MenuEventArgs>` | Fires while rendering each popup item |
| `beforeOpen` | `EmitType<BeforeOpenCloseMenuEventArgs>` | Fires before the popup opens |
| `close` | `EmitType<OpenCloseMenuEventArgs>` | Fires after the popup closes |
| `created` | `EmitType<Event>` | Fires once after initial render |
| `open` | `EmitType<OpenCloseMenuEventArgs>` | Fires after the popup opens |
| `select` | `EmitType<MenuEventArgs>` | Fires when a popup action item is selected |

### Template Binding Syntax

```html
<button ejs-dropdownbutton
  [items]="items"
  content="Menu"
  (beforeClose)="onBeforeClose($event)"
  (beforeItemRender)="onBeforeItemRender($event)"
  (beforeOpen)="onBeforeOpen($event)"
  (close)="onClose($event)"
  (created)="onCreated()"
  (open)="onOpen($event)"
  (select)="onSelect($event)">
</button>
```

---

## ItemModel Interface

Defines a single popup action item.

| Property | Type | Required | Description |
|---|---|---|---|
| `text` | `string` | No | Display text of the item |
| `id` | `string` | No | Unique identifier for the item |
| `iconCss` | `string` | No | CSS class(es) for the item's icon |
| `url` | `string` | No | URL for navigation — renders item as an `<a>` anchor tag |
| `separator` | `boolean` | No | When `true`, renders a horizontal divider (non-selectable) |
| `disabled` | `boolean` | No | When `true`, disables the individual item |

**Example:**
```typescript
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

const items: ItemModel[] = [
  { id: 'item-1', text: 'Cut',   iconCss: 'e-icons e-cut' },
  { id: 'item-2', text: 'Copy',  iconCss: 'e-icons e-copy' },
  { id: 'item-3', text: 'Paste', iconCss: 'e-icons e-paste', disabled: true },
  { separator: true },
  { id: 'item-4', text: 'Syncfusion', url: 'https://www.syncfusion.com' }
];
```

---

## DropDownMenuAnimationSettingsModel Interface

Controls the animation when the popup opens.

| Property | Type | Default | Description |
|---|---|---|---|
| `effect` | `DropDownAnimationEffect` | `'None'` | Animation effect. Values: `'None'`, `'SlideDown'`, `'ZoomIn'`, `'FadeIn'` |
| `duration` | `number` | `400` | Animation duration in milliseconds |
| `easing` | `string` | `'ease'` | CSS easing function (e.g., `'ease'`, `'linear'`, `'ease-in-out'`) |

**Example:**
```typescript
import { DropDownMenuAnimationSettingsModel } from '@syncfusion/ej2-angular-splitbuttons';

public animation: DropDownMenuAnimationSettingsModel = {
  effect: 'SlideDown',
  duration: 400,
  easing: 'ease'
};
```

---

## Event Argument Interfaces

### MenuEventArgs

Used by `select` and `beforeItemRender` events.

| Property | Type | Description |
|---|---|---|
| `item` | `ItemModel` | The `ItemModel` of the item being rendered or selected |
| `element` | `HTMLElement` | The `<li>` DOM element for the item |
| `name` | `string` | Name of the event (`'select'` or `'beforeItemRender'`) |

### BeforeOpenCloseMenuEventArgs

Used by `beforeOpen` and `beforeClose` events.

| Property | Type | Description |
|---|---|---|
| `element` | `HTMLElement` | The popup's root DOM element |
| `items` | `ItemModel[]` | The current array of popup items |
| `cancel` | `boolean` | Set to `true` to cancel the open/close action |
| `name` | `string` | Name of the event (`'beforeOpen'` or `'beforeClose'`) |

### OpenCloseMenuEventArgs

Used by `open` and `close` events.

| Property | Type | Description |
|---|---|---|
| `element` | `HTMLElement` | The popup's root DOM element |
| `items` | `ItemModel[]` | The current array of popup items |
| `name` | `string` | Name of the event (`'open'` or `'close'`) |

---

## Import Reference

```typescript
import {
  DropDownButtonModule,
  DropDownButtonComponent,
  ItemModel,
  MenuEventArgs,
  BeforeOpenCloseMenuEventArgs,
  OpenCloseMenuEventArgs,
  DropDownMenuAnimationSettingsModel
} from '@syncfusion/ej2-angular-splitbuttons';
```
