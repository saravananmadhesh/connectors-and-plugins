# ChipListComponent API Reference

## Table of Contents
- [Import](#import)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [ChipModel Interface](#chipmodel-interface)
- [Event Argument Types](#event-argument-types)

---

## Import

```typescript
import { ChipListModule, ChipListComponent } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
```

---

## Properties

### `text` — `string`
Specifies the text content for a single chip.

- **Default:** `''`
- **Use when:** Rendering a single `ejs-chiplist` without `e-chips`.

```html
<ejs-chiplist text="Janet Leverling"></ejs-chiplist>
```

---

### `chips` — `string[] | number[] | ChipModel[]`
Provides chip data programmatically as an array. Alternative to using `e-chips`.

- **Default:** `[]`

```typescript
const chipsData = [
  { text: 'Angular', cssClass: 'e-primary' },
  { text: 'Vue', cssClass: 'e-success' }
];

<ejs-chiplist [chips]="chipsData"></ejs-chiplist>
```

---

### `selection` — `'None' | 'Single' | 'Multiple'`
Defines the selection behavior of the chip list.

- **Default:** `'None'`
- `'None'` — No selection (use for action chips)
- `'Single'` — One chip selected at a time (choice chips)
- `'Multiple'` — Multiple chips can be selected (filter chips)

```html
<ejs-chiplist selection="Multiple">...</ejs-chiplist>
```

---

### `selectedChips` — `string[] | number[] | number`
Pre-selects chips by index or text value.

- **Default:** `[]`
- Requires `selection` to be `'Single'` or `'Multiple'` to be visible.

```html
<ejs-chiplist selection="Multiple" [selectedChips]="[0, 2]">...</ejs-chiplist>
```

---

### `enableDelete` — `boolean`
Shows a delete (×) icon on each chip, allowing removal.

- **Default:** `false`

```html
<ejs-chiplist [enableDelete]="true">...</ejs-chiplist>
```

---

### `cssClass` — `string`
Applies custom CSS class(es) to the chip list or individual chip elements.

- **Default:** `''`
- Common values: `'e-outline'`, `'e-primary'`, `'e-success'`, `'e-info'`, `'e-warning'`, `'e-danger'`

```html
<ejs-chiplist cssClass="e-outline">...</ejs-chiplist>
```

---

### `enabled` — `boolean`
Enables or disables the entire chip list.

- **Default:** `true`
- When `false`, chips are visible but not interactive; `aria-disabled="true"` is applied.

```html
<ejs-chiplist [enabled]="false">...</ejs-chiplist>
```

---

### `allowDragAndDrop` — `boolean`
Enables drag-and-drop reordering of chips within or across containers.

- **Default:** `false`

```html
<ejs-chiplist [allowDragAndDrop]="true">...</ejs-chiplist>
```

---

### `dragArea` — `HTMLElement | string`
Restricts the draggable chip's movement to a specific container. Accepts a CSS selector string or an `HTMLElement`.

- **Default:** `null` (no restriction — full page)

```html
<ejs-chiplist [allowDragAndDrop]="true" dragArea="#my-container">...</ejs-chiplist>
```

---

### `leadingIconCss` — `string`
Specifies the CSS class for the leading (left) icon on a single chip.

- **Default:** `''`

```html
<e-chip text="Janet" leadingIconCss="janet-icon"></e-chip>
```

---

### `leadingIconUrl` — `string`
Specifies a direct image URL for the leading icon.

- **Default:** `''`

```html
<e-chip text="Profile" leadingIconUrl="https://example.com/avatar.png"></e-chip>
```

---

### `avatarIconCss` — `string`
Specifies the CSS class for the avatar image in the chip.

- **Default:** `''`

```html
<e-chip text="Andrew" avatarIconCss="andrew-avatar"></e-chip>
```

---

### `avatarText` — `string`
Specifies text displayed inside the chip's circular avatar area (e.g., initials).

- **Default:** `''`

```html
<e-chip text="Andrew" avatarText="A"></e-chip>
```

---

### `trailingIconCss` — `string`
Specifies the CSS class for the trailing (right) icon on a chip.

- **Default:** `''`

```html
<e-chip text="Remove" trailingIconCss="e-dlt-btn"></e-chip>
```

---

### `trailingIconUrl` — `string`
Specifies a direct image URL for the trailing icon.

- **Default:** `''`

```html
<e-chip text="Download" trailingIconUrl="https://example.com/icons/download.svg"></e-chip>
```

---

### `htmlAttributes` — `{ [key: string]: string }`
Passes additional HTML attributes (aria, data-*, title, etc.) to the chip element.

- **Default:** `{}`

```html
<ejs-chiplist [htmlAttributes]="{ 'aria-label': 'Tag list', 'data-testid': 'chip-list' }">
  ...
</ejs-chiplist>
```

---

### `enableRtl` — `boolean`
Renders the component in right-to-left direction.

- **Default:** `false`

```html
<ejs-chiplist [enableRtl]="true">...</ejs-chiplist>
```

---

### `enablePersistence` — `boolean`
Persists the component's state (e.g., selection) across page reloads using browser local storage.

- **Default:** `false`

```html
<ejs-chiplist [enablePersistence]="true" selection="Multiple">...</ejs-chiplist>
```

---

### `locale` — `string`
Overrides the global culture/localization for this component.

- **Default:** `''` (uses global `'en-US'`)

---

## Methods

Access methods via `@ViewChild`:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ChipListComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-chip-methods',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist #chipList>
      <e-chips>
        <e-chip text="Angular"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class ChipMethodsComponent {
  @ViewChild('chipList') chipList?: ChipListComponent;
}
```

---

### `add(chipsData)` → `void`
Adds chip(s) to the list programmatically.

- **Parameter:** `string | number | ChipModel | string[] | number[] | ChipModel[]`

```typescript
// Add a single chip by text
this.chipList?.add('New Tag');

// Add multiple chips
this.chipList?.add(['Tag A', 'Tag B']);

// Add with model
this.chipList?.add({ text: 'Angular', cssClass: 'e-primary' });
```

---

### `remove(fields)` → `void`
Removes chip(s) by index or DOM element reference.

- **Parameter:** `number | number[] | HTMLElement | HTMLElement[]`

```typescript
// Remove chip at index 0
this.chipList?.remove([0]);

// Remove by DOM element
const el = document.querySelector('.my-chip') as HTMLElement;
this.chipList?.remove(el);
```

---

### `find(fields)` → `ChipDataArgs`
Finds a chip by index or DOM element and returns its data.

- **Parameter:** `number | HTMLElement`
- **Returns:** `ChipDataArgs` — contains chip data (`text`, `element`, etc.)

```typescript
const chipData = this.chipList?.find(2);
console.log(chipData?.text); // logs text of chip at index 2
```

---

### `getSelectedChips()` → `SelectedItem | SelectedItems | undefined`
Returns the currently selected chip(s) data.

- Returns `SelectedItem` for single selection, `SelectedItems` for multiple.

```typescript
const selected = this.chipList?.getSelectedChips();
console.log(selected);
```

---

### `select(fields)` → `void`
Programmatically selects chip(s) by index, text, or DOM element.

```typescript
// Select chip at index 1
this.chipList?.select(1);
```

---

### `destroy()` → `void`
Removes the component from the DOM and detaches all event handlers.

```typescript
this.chipList?.destroy();
```

---

## Events

### `click` — `EmitType<ClickEventArgs>`
Fires when a chip is clicked.

```html
<ejs-chiplist (click)="onChipClick($event)"></ejs-chiplist>
```

---

### `beforeClick` — `EmitType<ClickEventArgs>`
Fires before the click event is processed. Set `e.cancel = true` to prevent the click.

```html
<ejs-chiplist (beforeClick)="onBeforeClick($event)"></ejs-chiplist>
```

---

### `created` — `EmitType<Event>`
Fires when the component is created and rendered successfully.

```html
<ejs-chiplist (created)="onCreated()"></ejs-chiplist>
```

---

### `delete` — `EmitType<DeleteEventArgs>`
Fires before a chip is removed. Set `e.cancel = true` to prevent deletion.

```html
<ejs-chiplist [enableDelete]="true" (delete)="onDelete($event)"></ejs-chiplist>
```

---

### `deleted` — `EmitType<ChipDeletedEventArgs>`
Fires after a chip has been removed.

```html
<ejs-chiplist [enableDelete]="true" (deleted)="onDeleted($event)"></ejs-chiplist>
```

---

### `dragStart` — `EmitType<DragAndDropEventArgs>`
Fires when a chip starts being dragged. Set `args.cancel = true` to prevent dragging.

```html
<ejs-chiplist [allowDragAndDrop]="true" (dragStart)="onDragStart($event)"></ejs-chiplist>
```

---

### `dragging` — `EmitType<DragAndDropEventArgs>`
Fires continuously while a chip is being dragged. Use to customize the drag clone.

```html
<ejs-chiplist [allowDragAndDrop]="true" (dragging)="onDragging($event)"></ejs-chiplist>
```

---

### `dragStop` — `EmitType<DragAndDropEventArgs>`
Fires when a drag operation ends. Set `args.cancel = true` to prevent the drop.

```html
<ejs-chiplist [allowDragAndDrop]="true" (dragStop)="onDragStop($event)"></ejs-chiplist>
```

---

## ChipModel Interface

When using the `chips` property or `add()` method with object data, each item follows the `ChipModel` shape:

| Property | Type | Description |
|----------|------|-------------|
| `text` | `string` | Chip label text |
| `cssClass` | `string` | CSS class(es) for the chip |
| `avatarText` | `string` | Avatar initials text |
| `avatarIconCss` | `string` | CSS class for avatar image |
| `leadingIconCss` | `string` | CSS class for leading icon |
| `leadingIconUrl` | `string` | URL for leading icon image |
| `trailingIconCss` | `string` | CSS class for trailing icon |
| `trailingIconUrl` | `string` | URL for trailing icon image |
| `enabled` | `boolean` | Whether the chip is enabled |
| `htmlAttributes` | `object` | Additional HTML attributes |

```typescript
const chips: ChipModel[] = [
  { text: 'Angular', cssClass: 'e-primary', avatarText: 'A', enabled: true },
  { text: 'Vue', cssClass: 'e-success', avatarText: 'V', enabled: true },
  { text: 'Svelte', cssClass: 'e-info', avatarText: 'S', enabled: false }
];

<ejs-chiplist [chips]="chips"></ejs-chiplist>
```

---

## Event Argument Types

| Event | Argument Type | Key Fields |
|-------|--------------|------------|
| `click` / `beforeClick` | `ClickEventArgs` | `text`, `element`, `cancel` |
| `delete` | `DeleteEventArgs` | `text`, `element`, `cancel` |
| `deleted` | `ChipDeletedEventArgs` | `text`, `element` |
| `dragStart` / `dragStop` / `dragging` | `DragAndDropEventArgs` | `element`, `clonedElement`, `cancel` |
| `created` | `Event` | Standard DOM Event |
