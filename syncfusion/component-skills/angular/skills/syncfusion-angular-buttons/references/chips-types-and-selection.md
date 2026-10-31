# Chip Types and Selection

## Table of Contents
- [Chip Types Overview](#chip-types-overview)
- [Input Chip](#input-chip)
- [Choice Chip (Single Selection)](#choice-chip-single-selection)
- [Filter Chip (Multiple Selection)](#filter-chip-multiple-selection)
- [Action Chip](#action-chip)
- [Deletable Chip](#deletable-chip)
- [Pre-selecting Chips](#pre-selecting-chips)
- [Handling Click Events](#handling-click-events)
- [Handling Delete Events](#handling-delete-events)
- [Disabled Chips](#disabled-chips)

---

## Chip Types Overview

The `selection` property on `ejs-chiplist` controls the chip type behavior:

| Type | `selection` value | Purpose |
|------|-------------------|---------|
| Input Chip | `"None"` (default) + `[enableDelete]="true"` | User-generated tags that can be removed |
| Choice Chip | `"Single"` | Select one option (radio-like) |
| Filter Chip | `"Multiple"` | Select multiple options (checkbox-like) |
| Action Chip | `"None"` (default) | Triggers an action on click |

---

## Input Chip

Input chips represent user-provided values (e.g., email tags, search filters). They are typically deletable.

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-input-chip',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist id="input-chip" [enableDelete]="true" selection="Single">
      <e-chips>
        <e-chip text="Andrew"></e-chip>
        <e-chip text="Janet"></e-chip>
        <e-chip text="Laura"></e-chip>
        <e-chip text="Margaret"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class InputChipComponent {}
```

- `[enableDelete]="true"` — shows the delete (×) icon on each chip.
- `selection="Single"` — only one chip is selected at a time in this input scenario.

---

## Choice Chip (Single Selection)

Choice chips allow selecting exactly one option from a group — similar to radio buttons.

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-choice-chip',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist id="choice-chip" selection="Single">
      <e-chips>
        <e-chip text="Small"></e-chip>
        <e-chip text="Medium"></e-chip>
        <e-chip text="Large"></e-chip>
        <e-chip text="Extra Large"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class ChoiceChipComponent {}
```

- Set `selection="Single"` to enable single-choice behavior.
- Clicking a chip selects it and deselects the previously selected chip.
- Common use cases: view toggle, size selector, sort preference.

---

## Filter Chip (Multiple Selection)

Filter chips allow selecting multiple options simultaneously — similar to checkboxes.

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-filter-chip',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist id="filter-chip" selection="Multiple">
      <e-chips>
        <e-chip text="Chai"></e-chip>
        <e-chip text="Chung"></e-chip>
        <e-chip text="Aniseed Syrup"></e-chip>
        <e-chip text="Ikura"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class FilterChipComponent {}
```

- Set `selection="Multiple"` to allow multi-selection.
- Selected chips receive the `e-active` CSS class.
- Common use cases: category filters, skill selection, preference toggles.

---

## Action Chip

Action chips trigger operations when clicked. They do not have selection state — they simply fire the `(click)` event.

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-action-chip',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist id="action-chip" (click)="handleChipClick($event)">
      <e-chips>
        <e-chip text="Send a text"></e-chip>
        <e-chip text="Set a reminder"></e-chip>
        <e-chip text="Read my emails"></e-chip>
        <e-chip text="Set alarm"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class ActionChipComponent {
  handleChipClick(event: any) {
    alert('You clicked: ' + event.text);
  }
}
```

- No `selection` prop needed; defaults to `"None"`.
- Use `(click)` to respond to interactions.
- Common use cases: shortcut buttons, suggested actions, command chips.

---

## Deletable Chip

Show a delete icon on each chip to allow users to remove them from the list.

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-deletable-chip',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist id="deletable-chip" [enableDelete]="true">
      <e-chips>
        <e-chip text="Send a text"></e-chip>
        <e-chip text="Set a reminder"></e-chip>
        <e-chip text="Read my emails"></e-chip>
        <e-chip text="Set alarm"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class DeletableChipComponent {}
```

- `[enableDelete]="true"` renders a delete button (×) on each chip.
- Works alongside any selection mode.
- Use the `(delete)` event to intercept before removal, and `(deleted)` event for post-removal logic.

---

## Pre-selecting Chips

Use `selectedChips` to pre-select chips on initial render. Accepts index(es) or chip text value(s).

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-preselect-chip',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist
      id="filter-chip"
      selection="Multiple"
      [selectedChips]="preSelected"
    >
      <e-chips>
        <e-chip text="Extra small"></e-chip>
        <e-chip text="Small"></e-chip>
        <e-chip text="Medium"></e-chip>
        <e-chip text="Large"></e-chip>
        <e-chip text="Extra large"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class PreselectChipComponent {
  preSelected = [1, 3];
}
```

- `selectedChips` accepts `string[]`, `number[]`, or a single `number`.
- Must be used with `selection="Single"` or `selection="Multiple"` to have visible effect.

---

## Handling Click Events

Use `(click)` for action chips, or `(beforeClick)` to intercept and potentially cancel a click:

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-click-events-chip',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist
      id="chip-events"
      selection="Single"
      (beforeClick)="handleBeforeClick($event)"
      (click)="handleClick($event)"
    >
      <e-chips>
        <e-chip text="Option A"></e-chip>
        <e-chip text="Option B"></e-chip>
        <e-chip text="Option C"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class ClickEventsChipComponent {
  handleBeforeClick(e: any) {
    // e.cancel = true; // Uncomment to prevent click
    console.log('Before click:', e.text);
  }

  handleClick(e: any) {
    console.log('Chip clicked:', e.text);
  }
}
```

- `(beforeClick)` — fires before click is processed; set `e.cancel = true` to prevent.
- `(click)` — fires after the click event.

---

## Handling Delete Events

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-delete-events-chip',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist
      id="chip-delete-events"
      [enableDelete]="true"
      (delete)="handleDelete($event)"
      (deleted)="handleDeleted($event)"
    >
      <e-chips>
        <e-chip text="Tag One"></e-chip>
        <e-chip text="Tag Two"></e-chip>
        <e-chip text="Tag Three"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class DeleteEventsChipComponent {
  handleDelete(e: any) {
    // e.cancel = true; // Uncomment to prevent deletion
    console.log('About to delete:', e.text);
  }

  handleDeleted(e: any) {
    console.log('Chip deleted:', e.text);
  }
}
```

- `(delete)` — fires before the chip is removed (can cancel).
- `(deleted)` — fires after the chip has been removed.

---

## Disabled Chips

Disable the entire chip list using the `enabled` property:

```html
<ejs-chiplist id="chip-disabled" [enabled]="false">
  <e-chips>
    <e-chip text="Disabled Chip 1"></e-chip>
    <e-chip text="Disabled Chip 2"></e-chip>
  </e-chips>
</ejs-chiplist>
```

- `[enabled]="false"` — disables all chips; they are visible but not interactive.
- ARIA: `aria-disabled="true"` is automatically applied.
