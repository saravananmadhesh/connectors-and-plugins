# Selection Modes, Chips & Item Control — Syncfusion Angular MultiSelect

## Table of Contents
- [Display Modes](#display-modes)
- [CheckBox Mode](#checkbox-mode)
- [Selection Limits](#selection-limits)
- [Chip Customization](#chip-customization)
- [Custom Values](#custom-values)
- [Disabling Items](#disabling-items)
- [Tag and Change Behavior](#tag-and-change-behavior)

---

## Display Modes

The `mode` property controls how selected values are displayed in the input element:

| Mode | Display | Best For |
|------|---------|----------|
| `Default` | Selected items as removable chips (tags) | Standard multi-value input |
| `Box` | Same as Default with explicit box styling | Visual differentiation from single-select |
| `Delimiter` | Selected items as delimited text (e.g., `A, B, C`) | Compact/read-only display |
| `CheckBox` | Checkboxes in popup list | Bulk selection with Select All |

```typescript
// Box mode — chips with clear box outline
template: `<ejs-multiselect [dataSource]="items" mode="Box">`

// Delimiter mode — shows as "Cricket, Football, Hockey"
template: `<ejs-multiselect [dataSource]="items" mode="Delimiter" delimiterChar=" | ">`

// CheckBox mode — requires CheckBoxSelectionService
template: `<ejs-multiselect [dataSource]="items" mode="CheckBox" [showSelectAll]="true">`
```

---

## CheckBox Mode

CheckBox mode renders a checkbox next to every item in the popup. Requires injecting `CheckBoxSelectionService`.

```typescript
import { Component } from '@angular/core';
import {
  MultiSelectModule,
  CheckBoxSelectionService
} from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  providers: [CheckBoxSelectionService],   // ← required for CheckBox mode
  template: `
    <ejs-multiselect
      [dataSource]="vegetables"
      [fields]="fields"
      mode="CheckBox"
      [showSelectAll]="true"
      selectAllText="Select All Vegetables"
      unSelectAllText="Deselect All"
      placeholder="Select vegetables">
    </ejs-multiselect>
  `
})
export class AppComponent {
  public vegetables = [
    { id: 1, name: 'Carrot'  },
    { id: 2, name: 'Broccoli'},
    { id: 3, name: 'Spinach' },
    { id: 4, name: 'Tomato'  },
  ];
  public fields = { text: 'name', value: 'id' };
}
```

**Key CheckBox mode properties:**

| Property | Type | Description |
|---|---|---|
| `showSelectAll` | `boolean` | Shows "Select All" option in popup header |
| `selectAllText` | `string` | Label for the Select All option (default: `"Select All"`) |
| `unSelectAllText` | `string` | Label for the Unselect All option (default: `"Unselect All"`) |
| `enableGroupCheckBox` | `boolean` | Adds checkboxes to group headers for group-level selection |

> **Note:** `CheckBoxSelectionService` must be listed in the component's `providers` array (standalone) or in the NgModule `providers`. Without it, checkboxes won't render.

---

## Selection Limits

Cap the maximum number of items a user can select with `maximumSelectionLength`:

```typescript
@Component({
  standalone: true,
  imports: [MultiSelectModule],
  providers: [CheckBoxSelectionService],
  template: `
    <ejs-multiselect
      [dataSource]="roles"
      mode="CheckBox"
      [maximumSelectionLength]="3"
      placeholder="Select up to 3 roles">
    </ejs-multiselect>
  `
})
export class AppComponent {
  public roles: string[] = ['Admin', 'Editor', 'Viewer', 'Moderator', 'Contributor'];
}
```

Once the limit is reached, remaining items in the popup become non-selectable until a selection is removed.

---

## Chip Customization

Customize the appearance of individual selected-value chips using the `tagging` event. The event argument provides a `setClass()` method to apply CSS classes to each chip:

```typescript
import { TaggingEventArgs, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="priorities"
      [fields]="fields"
      (tagging)="onTag($event)"
      placeholder="Select priorities">
    </ejs-multiselect>
  `,
  styles: [`
    .high-priority   { background-color: #e53935 !important; color: #fff !important; }
    .medium-priority { background-color: #fb8c00 !important; color: #fff !important; }
    .low-priority    { background-color: #43a047 !important; color: #fff !important; }
  `]
})
export class AppComponent {
  public priorities = [
    { id: 1, label: 'High',   level: 'high'   },
    { id: 2, label: 'Medium', level: 'medium' },
    { id: 3, label: 'Low',    level: 'low'    },
  ];
  public fields = { text: 'label', value: 'id' };

  onTag(args: TaggingEventArgs): void {
    const level = (args.itemData as any).level;
    args.setClass(`${level}-priority`);  // applies the CSS class to the chip element
  }
}
```

The `tagging` event fires once per item as chips are rendered. Use `args.itemData` to access the full data object and conditionally apply CSS classes.

---

## Custom Values

Allow users to type and add values that don't exist in the data source:

```typescript
import { CustomValueEventArgs } from '@syncfusion/ej2-dropdowns';

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="tags"
      [allowCustomValue]="true"
      (customValueSelection)="onCustomValue($event)"
      placeholder="Add tags (type to create new)">
    </ejs-multiselect>
  `
})
export class AppComponent {
  public tags: string[] = ['Angular', 'React', 'Vue', 'Svelte'];

  onCustomValue(args: CustomValueEventArgs): void {
    // args.newData contains the newly typed value object
    console.log('New custom value added:', args.newData);
    // Optionally push to the data source to persist it
    this.tags.push(args.newData.value as string);
  }
}
```

- `allowCustomValue: true` — enables typing new values not in the list
- `customValueSelection` event — fires when a custom value is committed (Enter key or blur)
- The custom value is added to the selection immediately; it does NOT persist to `dataSource` automatically

**Combined with `addTagOnBlur`:** If `addTagOnBlur` is `true`, the typed text converts to a chip as soon as focus leaves the input, without requiring the Enter key.

---

## Disabling Items

### Via Data Source Field

Mark items as non-selectable by setting a `disabled` boolean field, then map it in `fields`:

```typescript
public permissions = [
  { id: 1, name: 'Read',    canAssign: true  },
  { id: 2, name: 'Write',   canAssign: true  },
  { id: 3, name: 'Delete',  canAssign: false }, // grayed out, non-selectable
  { id: 4, name: 'Admin',   canAssign: false }, // grayed out, non-selectable
];
public fields = { text: 'name', value: 'id', disabled: 'canAssign' };
// Wait — disabled: true means the item IS disabled
// So set canAssign: false → the item is disabled
```

> The `disabled` field should be `true` when the item should be non-selectable (i.e., disabled).

### Via `disableItem()` Method

Dynamically disable a specific item after the component is initialized using a `@ViewChild` reference:

```typescript
import { ViewChild } from '@angular/core';
import { MultiSelectComponent, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `<ejs-multiselect #ms [dataSource]="items" (created)="onCreated()"></ejs-multiselect>`
})
export class AppComponent {
  @ViewChild('ms') public msObj!: MultiSelectComponent;
  public items: string[] = ['Option A', 'Option B', 'Option C', 'Option D'];

  onCreated(): void {
    // Disable by value (string)
    this.msObj.disableItem('Option C');
    // Disable by object reference
    this.msObj.disableItem({ text: 'Option D' });
  }
}
```

- Accepts a `string`, `number`, `object`, or `HTMLLIElement` — one item per call; iterate to disable multiple
- If a currently selected item is dynamically disabled, its selection is cleared automatically

---

## Tag and Change Behavior

### `addTagOnBlur`

By default, typed text converts to a chip when Enter is pressed or an item is selected from the popup. Set `addTagOnBlur="true"` to also convert on focus-out:

```html
<ejs-multiselect [dataSource]="tags" [addTagOnBlur]="true" [allowCustomValue]="true">
</ejs-multiselect>
```

### `changeOnBlur`

By default, the `change` event fires when the component loses focus (on blur). To receive `change` events immediately on every selection/removal:

```html
<ejs-multiselect [dataSource]="items" [changeOnBlur]="false" (change)="onChange($event)">
</ejs-multiselect>
```

Use `changeOnBlur="false"` when you need real-time updates — e.g., live filter panels or dependent UI that must react immediately to each selection change.
