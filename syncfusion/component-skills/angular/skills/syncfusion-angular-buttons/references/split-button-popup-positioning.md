# Popup Behavior & Target Customization

## Table of Contents
- [Default Popup Behavior](#default-popup-behavior)
- [Custom Popup Width](#custom-popup-width)
- [Custom Popup Content via target](#custom-popup-content-via-target)
- [Deferred Popup Creation](#deferred-popup-creation)
- [Popup Close Event Triggers](#popup-close-event-triggers)
- [Grouped Items with ListView](#grouped-items-with-listview)
- [Edge Cases & Considerations](#edge-cases--considerations)

---

> **âš ï¸ Important:** The Syncfusion Angular SplitButton component does **not** have a `position` property. The popup always opens below the button by default. The only way to influence the popup area is through `target` (custom content), `popupWidth`, `createPopupOnClick`, and `closeActionEvents`.

---

## Default Popup Behavior

The SplitButton popup opens directly below the button when the dropdown arrow is clicked. Position is handled automatically by the internal popup engine and adjusts for viewport edges (collision detection is built-in and not configurable via a public property).

```typescript
import { Component } from '@angular/core';
import { ItemModel, SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [SplitButtonModule],
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-splitbutton content="Paste" [items]="items"></ejs-splitbutton>
    </div>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
}
```

**What happens:** The popup opens below the split arrow button. If there is not enough space below the viewport, the popup engine automatically flips it above the button.

---

## Custom Popup Width

Use the `popupWidth` property (`string | number`) to set a fixed width for the popup. The default is `"auto"`.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `
    <ejs-splitbutton content="Paste" [items]="items" popupWidth="250px"></ejs-splitbutton>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut',   iconCss: 'e-sb-icons e-cut' },
    { text: 'Copy',  iconCss: 'e-icons e-copy' },
    { text: 'Paste', iconCss: 'e-sb-icons e-paste' }
  ];
}
```

Pass a number to set width in pixels:

```html
<ejs-splitbutton content="Actions" [items]="items" [popupWidth]="300"></ejs-splitbutton>
```

---

## Custom Popup Content via target

The `target` property (`string | Element`) replaces the default popup items list with any existing DOM element. This is the only way to completely customise popup layout (e.g., colour pickers, ListViews, grids).

### Color Picker Example

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `
    <div class="e-section-control">
      <div id="colorPicker">
        <div id="black"  style="width:20px;height:20px;background:#000;display:inline-block;margin:2px;"></div>
        <div id="red"    style="width:20px;height:20px;background:red;display:inline-block;margin:2px;"></div>
        <div id="green"  style="width:20px;height:20px;background:green;display:inline-block;margin:2px;"></div>
        <div id="blue"   style="width:20px;height:20px;background:blue;display:inline-block;margin:2px;"></div>
        <div id="violet" style="width:20px;height:20px;background:violet;display:inline-block;margin:2px;"></div>
      </div>
      <ejs-splitbutton iconCss="e-sb-icons e-color" target="#colorPicker"></ejs-splitbutton>
    </div>
  `
})
export class AppComponent {}
```

### ListView as Popup Content

Use `target` with a `ListViewComponent` for grouped or advanced item layouts.

```typescript
import { Component } from '@angular/core';
import { SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';

@Component({
  standalone: true,
  imports: [SplitButtonModule, ListViewModule],
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-listview id="listview"
        [dataSource]="listItems"
        [fields]="field"
        sortOrder="Descending">
      </ejs-listview>
      <ejs-splitbutton content="ClipBoard" target="#listview"></ejs-splitbutton>
    </div>
  `
})
export class AppComponent {
  public listItems: { [key: string]: Object }[] = [
    { text: 'Cut',                category: 'Basic' },
    { text: 'Copy',               category: 'Basic' },
    { text: 'Paste',              category: 'Basic' },
    { text: 'Paste as Formula',   category: 'Advanced' },
    { text: 'Paste as Hyperlink', category: 'Advanced' }
  ];
  public field: Object = { groupBy: 'category' };
}
```

> **When to use `target`:** When the default `items` list is not sufficient and you need grouped items, nested menus, custom HTML layouts, or other Angular components inside the popup.

---

## Deferred Popup Creation

Setting `[createPopupOnClick]="true"` defers popup DOM creation until the first open, improving initial render performance for pages with many SplitButtons.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `
    <ejs-splitbutton content="Paste" [items]="items" [createPopupOnClick]="true"></ejs-splitbutton>
  `
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }];
}
```

---

## Popup Close Event Triggers

The `closeActionEvents` property (`string`) specifies a DOM event name that should dismiss the popup. Default is empty string (closes on outside click or Escape).

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `
    <ejs-splitbutton content="Paste" [items]="items" closeActionEvents="mouseleave"></ejs-splitbutton>
  `
})
export class AppComponent {
  public items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }];
}
```

---

## Grouped Items with ListView

See [Custom Popup Content via target](#custom-popup-content-via-target) above. The recommended approach for grouping items is to set the `target` property to a `<ejs-listview>` element with `groupBy` configured on the fields.

---

## Edge Cases & Considerations

### Popup in a Fixed Toolbar

The built-in collision detection opens the popup **above** the button automatically when there is insufficient space below â€” no configuration needed.

### Popup Inside a Modal Dialog

The popup works inside Syncfusion Dialog or native `<dialog>` elements. Ensure the modal has a sufficient `z-index`; the popup inherits the stacking context.

### Popup Width vs Content

If `popupWidth` is narrower than the longest item text, items may truncate. Set `popupWidth` generously or leave at `"auto"` to size to content.

### Scrollable Containers

The popup renders outside the scroll container (appended to `<body>`), so it is never clipped by `overflow: hidden` on a parent.

### RTL Direction

Set `[enableRtl]="true"` on the component; the popup aligns to the right edge of the button automatically.

```typescript
@Component({
  standalone: true,
  imports: [SplitButtonModule],
  template: `
    <ejs-splitbutton content="Autosum" [items]="items" [enableRtl]="true" iconCss="e-sb e-sigma"></ejs-splitbutton>
  `
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

For accessibility considerations related to the popup (keyboard navigation, ARIA `aria-haspopup`, `aria-expanded`), see [accessibility-and-globalization.md](accessibility-and-globalization.md).
