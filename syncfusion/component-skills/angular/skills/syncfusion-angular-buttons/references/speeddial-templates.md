# Speed Dial Templates

## Table of Contents
- [Overview](#overview)
- [Item Template](#item-template)
- [Popup Template](#popup-template)

---

## Overview

The Speed Dial component supports two template customization points:

| Template | Property | Description |
|---|---|---|
| Item template | `itemTemplate` | Customize the layout/content of each action item |
| Popup template | `popupTemplate` | Replace the entire popup with custom content |

Templates use Angular's `<ng-template>` syntax within the `<button ejs-speeddial>` element.

---

## Item Template

Use `itemTemplate` to define a custom layout for each speed dial action item. The template context exposes the `SpeedDialItemModel` data for each item.

### Template binding

Bind the template reference to `[itemTemplate]` on the component. The `let-items=""` context variable gives access to each item's properties (`iconCss`, `text`, `title`, `id`, `disabled`).

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule, SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Edit"
      openIconCss="e-icons e-edit"
      target="#targetElement"
      [items]="items"
      [itemTemplate]="itemTemplate">
      <ng-template #itemTemplate let-items="">
        <div class="itemlist">
          <span class="icon {{items.iconCss}}" style="padding:3px"></span>
          <span class="text">{{items.text}}</span>
        </div>
      </ng-template>
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { text: 'Cut',   iconCss: 'e-icons e-cut' },
    { text: 'Copy',  iconCss: 'e-icons e-copy' },
    { text: 'Paste', iconCss: 'e-icons e-paste' }
  ];
}
```

### Accessing item properties in template

The template context variable (declared with `let-items=""`) exposes all `SpeedDialItemModel` fields:

```html
<ng-template #itemTemplate let-items="">
  <!-- items.text, items.iconCss, items.title, items.id, items.disabled -->
  <div class="custom-item">
    <span class="{{ items.iconCss }}"></span>
    <span>{{ items.text }}</span>
  </div>
</ng-template>
```

---

## Popup Template

Use `popupTemplate` to replace the entire Speed Dial popup with a custom content block. This is useful for embedding forms, menus, or any custom UI inside the popup.

When `popupTemplate` is set, the `items` array is not used.

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Edit"
      openIconCss="e-icons e-edit"
      target="#targetElement"
      [popupTemplate]="popupTemplate">
      <ng-template #popupTemplate>
        <div>
          <div class="speeddial-form">
            <p>Here you can customize your code.</p>
          </div>
        </div>
      </ng-template>
    </button>
  `
})
export class AppComponent { }
```

### Use case: Inline form in popup

```html
<button ejs-speeddial
  id="speeddial"
  openIconCss="e-icons e-edit"
  target="#targetElement"
  [popupTemplate]="popupTemplate">
  <ng-template #popupTemplate>
    <div style="padding: 16px; background: white; border-radius: 4px;">
      <label>Quick note:</label>
      <input type="text" placeholder="Enter text..." />
      <button type="button">Save</button>
    </div>
  </ng-template>
</button>
```

---

## Key Differences

| | `itemTemplate` | `popupTemplate` |
|---|---|---|
| Replaces | Each individual action item's content | The entire popup container |
| Works with `items` | Yes — iterates over `items` array | No — `items` array is not rendered |
| Context variable | `let-items=""` → item data | None (full popup content) |
| When to use | Custom item layout with icons/text | Embed forms, menus, or arbitrary UI |
