# SplitButton API Reference

Authoritative API reference for the Syncfusion Angular SplitButton component, based on official documentation at:  
https://ej2.syncfusion.com/angular/documentation/api/split-button/index-default

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Interface: ItemModel](#interface-itemmodel)
- [Interface: BeforeOpenCloseMenuEventArgs](#interface-beforeopenclosemenueventargs)
- [Interface: OpenCloseMenuEventArgs](#interface-openclosemenueventargs)
- [Interface: MenuEventArgs](#interface-menueventargs)
- [Interface: ClickEventArgs](#interface-clickeventargs)
- [Enum: SplitButtonIconPosition](#enum-splitbuttoniconposition)
- [Complete Working Example](#complete-working-example)

---

## Properties

These are the **only** officially documented properties on `SplitButtonComponent`.

### animationSettings
**Type:** `DropDownMenuAnimationSettingsModel`  
**Default:** `{ effect: 'None' }`

Specifies the animation settings for opening the sub-menu in the DropDownMenu. Controls duration, easing, and effect of the animation when the sub-menu opens.

```typescript
import { Component } from '@angular/core';
import { ItemModel, SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [SplitButtonModule],
  selector: 'app-root',
  template: `<ejs-splitbutton content="Paste" [items]="items" [animationSettings]="animationSettings"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];
  public animationSettings = { effect: 'SlideDown', duration: 400 };
}
```

---

### closeActionEvents
**Type:** `string`  
**Default:** `""`

Specifies the event name(s) that close the DropDownButton popup.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items" closeActionEvents="mouseleave"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];
}
```

---

### content
**Type:** `string`  
**Default:** `""`

Defines the content of the SplitButton primary action button — can be text or HTML.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];
}
```

---

### createPopupOnClick
**Type:** `boolean`  
**Default:** `false`

Specifies whether the popup element is created on open (deferred creation).

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items" [createPopupOnClick]="true"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];
}
```

---

### cssClass
**Type:** `string`  
**Default:** `""`

Defines one or more CSS classes (space-separated) on the SplitButton element. Use this to control size and visual style.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" cssClass="e-primary" [items]="items"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];
}
```

Common `cssClass` values:
- `e-primary` — primary/accent button
- `e-small` — small size
- `e-vertical` — vertical layout (with `iconPosition="Top"`)
- Custom class names for bespoke styling

---

### disabled
**Type:** `boolean`  
**Default:** `false`

Disables the SplitButton when `true`. A disabled button is not interactive but remains visible.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items" [disabled]="isDisabled"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];
  public isDisabled = false;
}
```

---

### enableHtmlSanitizer
**Type:** `boolean`  
**Default:** `true`

When `true`, sanitizes untrusted HTML strings in item content before rendering them, preventing XSS attacks. Set to `false` only when you fully control the content and need raw HTML rendering.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items" [enableHtmlSanitizer]="true"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];
}
```

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Enables persistence of the component's state between page reloads (saved in browser storage).

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items" [enablePersistence]="true"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];
}
```

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Renders the component in right-to-left direction when `true`. Required for RTL/Arabic/Hebrew UI.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Autosum" [items]="items" [enableRtl]="true"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Average' },
    { text: 'Count numbers' },
    { text: 'Min' },
    { text: 'Max' }
  ];
}
```

---

### iconCss
**Type:** `string`  
**Default:** `""`

CSS class(es) for the icon displayed in the SplitButton primary button. Supports font icons and sprite images.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" iconCss="e-sb-icons e-paste" [items]="items"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];
}
```

---

### iconPosition
**Type:** `SplitButtonIconPosition`  
**Default:** `"Left"`

Controls where the icon appears relative to the button text.

| Value | Effect |
|-------|--------|
| `"Left"` | Icon to the left of text (default) |
| `"Top"` | Icon above the text |

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `
    <ejs-splitbutton content="Paste" iconCss="e-sb-icons e-paste" [items]="items" iconPosition="Top" cssClass="e-vertical"></ejs-splitbutton>
  `
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];
}
```

> **Tip:** Combine `iconPosition="Top"` with `cssClass="e-vertical"` to achieve a vertical button layout.

---

### itemTemplate
**Type:** `string | Function`  
**Default:** `null`

A template string or render function used to customize the rendering of each popup item.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `
    <ejs-splitbutton content="Paste" [items]="items" [itemTemplate]="template"></ejs-splitbutton>
    <ng-template #template let-data>
      <span class="custom-item">{{ data.text }}</span>
    </ng-template>
  `
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }];
  public template: any;
}
```

---

### items
**Type:** `ItemModel[]`  
**Default:** `[]`

Array of `ItemModel` objects rendered as the SplitButton secondary button popup items.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
}
```

---

### locale
**Type:** `string`  
**Default:** `'en-US'`

Overrides the global culture and localization value for this component.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items" locale="fr-FR"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];
}
```

---

### popupWidth
**Type:** `string | number`  
**Default:** `"auto"`

Defines the width of the dropdown popup.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items" popupWidth="200px"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];
}
```

---

### target
**Type:** `string | Element`  
**Default:** `""`

Points to an existing DOM element to use as the popup content (popup templating). The element identified by this selector/reference replaces the default items list in the popup.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `
    <div id="colorPicker">
      <div id="black"></div>
      <div id="red"></div>
      <div id="green"></div>
    </div>
    <ejs-splitbutton iconCss="e-sb-icons e-color" target="#colorPicker"></ejs-splitbutton>
  `
})
export class AppComponent {}
```

> **Note:** When `target` is set, the `items` array is ignored. Use `target` for fully custom popup content.

---

## Methods

These are the **only** officially documented methods on `SplitButtonComponent`.

### addItems

Adds new items to the popup menu. By default appends at the end; pass `text` to insert before that item.

```typescript
addItems(items: ItemModel[], text?: string): void
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `items` | `ItemModel[]` | Array of items to add |
| `text` *(optional)* | `string` | Text of the existing item to insert before |

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitButtonComponent, ItemModel, SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [SplitButtonModule],
  selector: 'app-root',
  template: `
    <ejs-splitbutton #btn content="Paste" [items]="items"></ejs-splitbutton>
    <button (click)="addNewItem()">Add Item</button>
    <button (click)="insertBeforeCopy()">Insert Before Copy</button>
  `
})
export class AppComponent {
  @ViewChild('btn') splitBtn!: SplitButtonComponent;

  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  addNewItem(): void {
    // Appends to end
    this.splitBtn.addItems([{ text: 'Select All' }]);
  }

  insertBeforeCopy(): void {
    // Insert before the item whose text is 'Copy'
    this.splitBtn.addItems([{ text: 'Special Cut' }], 'Copy');
  }
}
```

---

### removeItems

Removes items from the popup menu by text or unique ID.

```typescript
removeItems(items: string[], isUniqueId?: boolean): void
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `items` | `string[]` | Array of item texts (or IDs) to remove |
| `isUniqueId` *(optional)* | `boolean` | Set `true` to treat `items` values as item `id` fields |

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `
    <ejs-splitbutton #btn content="Edit" [items]="items"></ejs-splitbutton>
    <button (click)="removeByText()">Remove 'Copy'</button>
    <button (click)="removeById()">Remove by ID</button>
  `
})
export class AppComponent {
  @ViewChild('btn') splitBtn!: SplitButtonComponent;

  public items: ItemModel[] = [
    { id: 'cut-item', text: 'Cut' },
    { id: 'copy-item', text: 'Copy' },
    { id: 'paste-item', text: 'Paste' }
  ];

  removeByText(): void {
    this.splitBtn.removeItems(['Copy']);
  }

  removeById(): void {
    this.splitBtn.removeItems(['cut-item'], true); // isUniqueId = true
  }
}
```

---

### toggle

Opens the popup if closed, or closes it if open.

```typescript
toggle(): void
```

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `
    <ejs-splitbutton #btn content="Paste" [items]="items"></ejs-splitbutton>
    <button (click)="togglePopup()">Toggle Popup</button>
  `
})
export class AppComponent {
  @ViewChild('btn') splitBtn!: SplitButtonComponent;

  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];

  togglePopup(): void {
    this.splitBtn.toggle();
  }
}
```

---

### focusIn

Focuses the SplitButton element programmatically (native focus).

```typescript
focusIn(): void
```

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `
    <ejs-splitbutton #btn content="Paste" [items]="items"></ejs-splitbutton>
    <button (click)="focusButton()">Focus SplitButton</button>
  `
})
export class AppComponent {
  @ViewChild('btn') splitBtn!: SplitButtonComponent;

  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];

  focusButton(): void {
    this.splitBtn.focusIn();
  }
}
```

---

### getPersistData

Returns the component properties that are persisted to browser storage (used internally when `enablePersistence` is `true`).

```typescript
getPersistData(): string
```

```typescript
const persistedState = this.splitBtn.getPersistData();
console.log('Persisted state JSON:', persistedState);
```

---

### onPropertyChanged

Called internally by Angular's change detection when bound properties change. You normally do **not** call this yourself; it is invoked by the framework.

```typescript
onPropertyChanged(newProp: SplitButtonModel, oldProp: SplitButtonModel): void
```

---

## Events

Bind these events in the component template using Angular event binding syntax `(eventName)="handler($event)"`.

### beforeClose
**Arguments:** `BeforeOpenCloseMenuEventArgs`

Fires before the SplitButton popup closes. Cancel the close by handling this event.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items" (beforeClose)="onBeforeClose($event)"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];

  onBeforeClose(args: any): void {
    console.log('Popup about to close, event name:', args.name);
    // To cancel the close: args.cancel = true;
  }
}
```

---

### beforeItemRender
**Arguments:** `MenuEventArgs`

Fires while rendering each popup action item. Use this to customise individual items (add CSS classes, append elements, etc.).

```typescript
import { createElement } from '@syncfusion/ej2-base';
import { MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton iconCss="e-sb-icons e-paste" [items]="items" (beforeItemRender)="addShortcut($event)"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  addShortcut(args: MenuEventArgs): void {
    const shortcut = createElement('span');
    shortcut.setAttribute('class', 'shortcut');
    const clsName = args.item.text === 'Copy' ? 'e-icons e-copy' : 'e-sb-icons';
    shortcut.classList.add(clsName);
    args.element.appendChild(shortcut);
  }
}
```

---

### beforeOpen
**Arguments:** `BeforeOpenCloseMenuEventArgs`

Fires before the SplitButton popup opens.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items" (beforeOpen)="onBeforeOpen($event)"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];

  onBeforeOpen(args: any): void {
    console.log('Popup about to open, event name:', args.name);
    // To cancel the open: args.cancel = true;
  }
}
```

---

### click
**Arguments:** `ClickEventArgs`

Fires when the primary button (left side) of the SplitButton is clicked.

```typescript
import { ClickEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items" (click)="onPrimaryClick($event)"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];

  onPrimaryClick(args: ClickEventArgs): void {
    console.log('Primary clicked, event name:', args.name);
  }
}
```

---

### close
**Arguments:** `OpenCloseMenuEventArgs`

Fires when the SplitButton popup closes.

```typescript
import { OpenCloseMenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items" (close)="onClose($event)"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];

  onClose(args: OpenCloseMenuEventArgs): void {
    console.log('Popup closed, event name:', args.name);
  }
}
```

---

### created
**Arguments:** `Event`

Fires once, after the component has fully rendered.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items" (created)="onCreated()"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];

  onCreated(): void {
    console.log('SplitButton component is ready');
  }
}
```

---

### open
**Arguments:** `OpenCloseMenuEventArgs`

Fires when the SplitButton popup opens.

```typescript
import { OpenCloseMenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items" (open)="onOpen($event)"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];

  onOpen(args: OpenCloseMenuEventArgs): void {
    console.log('Popup opened, event name:', args.name);
  }
}
```

---

### select
**Arguments:** `MenuEventArgs`

Fires when a popup action item is selected.

```typescript
import { MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `<ejs-splitbutton content="Paste" [items]="items" (select)="onSelect($event)"></ejs-splitbutton>`
})
export class AppComponent {
  public items: ItemModel[] = [
    { id: 'cut', text: 'Cut' },
    { id: 'copy', text: 'Copy' },
    { id: 'paste', text: 'Paste' }
  ];

  onSelect(args: MenuEventArgs): void {
    console.log('Item selected:', args.item.text, '| id:', args.item.id);
    console.log('Event name:', args.name);
  }
}
```

---

## Interface: ItemModel

Properties on each object in the `items` array.

| Property | Type | Description |
|----------|------|-------------|
| `text` | `string` | Display text for the item |
| `id` | `string` | Unique identifier for the item |
| `iconCss` | `string` | CSS class(es) for the item icon |
| `url` | `string` | URL — renders the item as an `<a>` tag |
| `separator` | `boolean` | Renders a horizontal divider instead of a clickable item |
| `disabled` | `boolean` | Disables the item |

```typescript
// Full ItemModel example
public items: ItemModel[] = [
  { id: 'cut',   text: 'Cut',  iconCss: 'e-sb-icons e-cut' },
  { id: 'copy',  text: 'Copy', iconCss: 'e-icons e-copy' },
  { id: 'paste', text: 'Paste', iconCss: 'e-sb-icons e-paste' },
  { separator: true },
  { id: 'font',  text: 'Font',      iconCss: 'e-sb-icons e-font' },
  { id: 'para',  text: 'Paragraph', iconCss: 'e-sb-icons e-paragraph', disabled: true },
  { id: 'link',  text: 'Learn More', url: 'https://syncfusion.com', iconCss: 'e-icons e-hyperlink' }
];
```

> **Note:** `title`, `target`, `cssClass`, and `htmlAttributes` are **not** part of the official `ItemModel` interface. Avoid using them.

---

## Interface: BeforeOpenCloseMenuEventArgs

Argument object for `beforeOpen` and `beforeClose` events.

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Name of the event (`"beforeOpen"` or `"beforeClose"`) |

> **Tip:** To cancel the open/close action set `args.cancel = true` inside the handler (inherited from the base popup behaviour).

---

## Interface: OpenCloseMenuEventArgs

Argument object for `open` and `close` events.

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Name of the event (`"open"` or `"close"`) |

---

## Interface: MenuEventArgs

Argument object for `beforeItemRender` and `select` events.

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Name of the event |
| `item` | `ItemModel` | The `ItemModel` object being rendered or selected |
| `element` | `HTMLElement` | The DOM element of the item |

---

## Interface: ClickEventArgs

Argument object for the `click` event (primary button click).

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Name of the event (`"click"`) |

---

## Enum: SplitButtonIconPosition

Valid string values for the `iconPosition` property:

| Value | Description |
|-------|-------------|
| `"Left"` | Icon to the left of text (default) |
| `"Top"` | Icon above text; combine with `cssClass="e-vertical"` |

---

## Complete Working Example

A concise reference showing all commonly used properties and events together:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitButtonComponent, ItemModel, MenuEventArgs, SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  standalone: true,
  imports: [SplitButtonModule],
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <!-- Basic with icons, disabled item and separator -->
      <ejs-splitbutton
        #splitBtn
        content="Paste"
        iconCss="e-sb-icons e-paste"
        cssClass="e-primary"
        [items]="items"
        [disabled]="isDisabled"
        [enableRtl]="false"
        (click)="onPrimaryClick($event)"
        (select)="onSelect($event)"
        (beforeOpen)="onBeforeOpen($event)"
        (open)="onOpen($event)"
        (close)="onClose($event)"
        (beforeItemRender)="onBeforeItemRender($event)"
        (created)="onCreated()">
      </ejs-splitbutton>

      <br><br>
      <button (click)="splitBtn.toggle()">Toggle Popup</button>
      <button (click)="splitBtn.focusIn()">Focus</button>
      <button (click)="addItem()">Add Item</button>
      <button (click)="removeItem()">Remove Cut</button>
    </div>
  `
})
export class AppComponent {
  @ViewChild('splitBtn') splitBtn!: SplitButtonComponent;

  public isDisabled = false;

  public items: ItemModel[] = [
    { id: 'cut',   text: 'Cut',   iconCss: 'e-sb-icons e-cut' },
    { id: 'copy',  text: 'Copy',  iconCss: 'e-icons e-copy' },
    { id: 'paste', text: 'Paste', iconCss: 'e-sb-icons e-paste' },
    { separator: true },
    { id: 'font',  text: 'Font',  iconCss: 'e-sb-icons e-font' }
  ];

  onPrimaryClick(args: any): void {
    console.log('Primary button clicked');
  }

  onSelect(args: MenuEventArgs): void {
    console.log('Selected:', args.item.text);
  }

  onBeforeOpen(args: any): void {
    console.log('Before open:', args.name);
  }

  onOpen(args: any): void {
    console.log('Opened:', args.name);
  }

  onClose(args: any): void {
    console.log('Closed:', args.name);
  }

  onBeforeItemRender(args: MenuEventArgs): void {
    // Optionally customise item DOM here
  }

  onCreated(): void {
    console.log('Component ready');
  }

  addItem(): void {
    this.splitBtn.addItems([{ text: 'Select All' }]);
  }

  removeItem(): void {
    this.splitBtn.removeItems(['Cut']);
  }
}
```

---

> **⚠️ Important:** Only use the properties, methods, and events documented above. Do not reference `position`, `title` (on the component), `open()`, or `close()` methods — these are **not** part of the official SplitButton API.
