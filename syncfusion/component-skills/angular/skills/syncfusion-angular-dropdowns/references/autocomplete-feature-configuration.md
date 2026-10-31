# Feature Configuration in Angular AutoComplete

## Table of Contents
- [Autofill](#autofill)
- [Highlight Matched Characters](#highlight-matched-characters)
- [Disable Individual Items](#disable-individual-items)
- [Disable Item Dynamically](#disable-item-dynamically)
- [Disable Entire Component](#disable-entire-component)
- [Read-Only Mode](#read-only-mode)
- [Resizable Popup](#resizable-popup)
- [Virtual Scrolling](#virtual-scrolling)
- [Virtual Scrolling with Grouping](#virtual-scrolling-with-grouping)
- [Customizing Items Count in Virtualization](#customizing-items-count-in-virtualization)
- [Show Popup Button](#show-popup-button)
- [Show/Hide Clear Button](#showhide-clear-button)
- [RTL Support](#rtl-support)
- [Sort Order](#sort-order)
- [Popup Button Visibility](#popup-button-visibility)
- [CSS Customization](#css-customization)

---

## Autofill

When `autofill` is `true`, the AutoComplete automatically completes the input with the first matching suggestion as the user types. If no match is found, nothing happens.

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="searchData"
      [fields]="fields"
      [autofill]="true"
      placeholder="Find a country">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public searchData: { [key: string]: Object }[] = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda', Code: 'BM' },
    { Name: 'Canada', Code: 'CA' },
    { Name: 'Denmark', Code: 'DK' },
    { Name: 'France', Code: 'FR' },
    { Name: 'Germany', Code: 'DE' }
  ];
  public fields: Object = { value: 'Name' };
}
```

Works best when combined with `filterType="StartsWith"`.

---

## Highlight Matched Characters

When `highlight` is `true`, typed characters are highlighted in the suggestion list using the `.e-highlight` CSS class:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="searchData"
      [fields]="fields"
      [highlight]="true"
      placeholder="Find a country">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public searchData: { [key: string]: Object }[] = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda', Code: 'BM' },
    { Name: 'Canada', Code: 'CA' },
    { Name: 'Denmark', Code: 'DK' }
  ];
  public fields: Object = { value: 'Name' };
}
```

Customize highlighted text styling:

```css
.e-highlight {
  font-weight: bold;
  color: #007bff;
}
```

---

## Disable Individual Items

Map a `disabled` field in `fields` to disable specific items so they appear in the list but cannot be selected:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule, AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';
import { HostListener, ViewChild } from '@angular/core';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      #samples
      [dataSource]="statusData"
      [fields]="fields"
      placeholder="Select Status">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  @ViewChild('samples') public status!: AutoCompleteComponent;

  public statusData: { [key: string]: Object }[] = [
    { Status: 'Open',                State: false },
    { Status: 'Waiting for Customer',State: false },
    { Status: 'On Hold',             State: true  }, // disabled
    { Status: 'Follow-up',           State: false },
    { Status: 'Closed',              State: true  }, // disabled
    { Status: 'Solved',              State: false },
    { Status: 'Feature Request',     State: false }
  ];
  // Map 'State' column as the disabled field
  public fields: Object = { value: 'Status', disabled: 'State' };

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.altKey && event.keyCode === 84) {
      this.status.focusIn(); // Focus with Alt+T
    }
  }
}
```

---

## Disable Item Dynamically

Use the `disableItem` method to disable a specific item programmatically at runtime:

| Parameter | Type | Description |
|---|---|---|
| `item` | `HTMLLIElement` | The list element to disable |
| `item` | `string \| number \| boolean \| object` | Value of the item to disable |
| `itemIndex` | `number` | Index of the item to disable |

```typescript
// Disable by value
this.autoCompleteObj.disableItem('On Hold');

// Disable by index
this.autoCompleteObj.disableItem(2);
```

- The `disabled` state is updated in the `dataSource`
- If the currently selected item is disabled, the selection is cleared

---

## Disable Entire Component

Set `enabled` to `false` to make the entire component non-interactive:

```html
<ejs-autocomplete
  [dataSource]="data"
  [enabled]="false"
  placeholder="Disabled">
</ejs-autocomplete>
```

---

## Read-Only Mode

Use `readonly` to prevent the user from typing but still display the current value:

```html
<ejs-autocomplete
  [dataSource]="data"
  [readonly]="true"
  value="Cricket">
</ejs-autocomplete>
```

---

## Resizable Popup

Set `allowResize` to `true` to show a resize handle in the bottom-right corner of the popup, allowing users to resize it:

```typescript
import { Component, HostListener, ViewChild } from '@angular/core';
import { AutoCompleteModule, AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      #samples
      [dataSource]="statusData"
      [fields]="fields"
      [allowResize]="true"
      placeholder="Select Status">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  @ViewChild('samples') public status!: AutoCompleteComponent;

  public statusData: { [key: string]: Object }[] = [
    { Status: 'Open',           State: false },
    { Status: 'On Hold',        State: true },
    { Status: 'Follow-up',      State: false },
    { Status: 'Closed',         State: true },
    { Status: 'Solved',         State: false },
    { Status: 'In Progress',    State: false },
    { Status: 'Pending',        State: true }
  ];
  public fields: Object = { value: 'Status' };
}
```

Resized dimensions are retained across sessions. Related events: `resizeStart`, `resizing`, `resizeStop`.

---

## Virtual Scrolling

Enable `enableVirtualization` for large datasets. This creates a fixed pool of DOM elements and recycles them as the user scrolls, significantly reducing memory and rendering overhead:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule, AutoCompleteComponent, VirtualScroll } from '@syncfusion/ej2-angular-dropdowns';

// Inject the VirtualScroll module
AutoCompleteComponent.Inject(VirtualScroll);

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="records"
      [fields]="fields"
      [enableVirtualization]="true"
      popupHeight="200px"
      placeholder="e.g. Item 1">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public records: { [key: string]: Object }[] = [];
  public fields: object = { value: 'text' };

  constructor() {
    for (let i = 1; i <= 150; i++) {
      this.records.push({ id: 'id' + i, text: `Item ${i}` });
    }
  }
}
```

> When `enableVirtualization` is enabled, `skip` and `take` from a user-provided `Query` are ignored at initial state — they are internally calculated based on popup height.

---

## Virtual Scrolling with Grouping

Virtual scrolling also supports grouping. For remote data, all data is fetched once for grouping, then virtualization works like local data:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule, AutoCompleteComponent, VirtualScroll } from '@syncfusion/ej2-angular-dropdowns';

AutoCompleteComponent.Inject(VirtualScroll);

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="records"
      [fields]="fields"
      [enableVirtualization]="true"
      popupHeight="200px"
      placeholder="e.g. Item 1">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public records: { [key: string]: Object }[] = [];
  public fields: object = { groupBy: 'group', text: 'text', value: 'id' };

  constructor() {
    const groups = ['Group A', 'Group B', 'Group C', 'Group D'];
    for (let i = 1; i <= 150; i++) {
      const group = groups[Math.floor(Math.random() * 4)];
      this.records.push({ id: 'id' + i, text: `Item ${i}`, group });
    }
  }
}
```

---

## Customizing Items Count in Virtualization

Use `query.take()` or the `actionBegin` event to control how many items are fetched per batch during virtual scroll:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule, AutoCompleteComponent, VirtualScroll } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';

AutoCompleteComponent.Inject(VirtualScroll);

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="autocomplete-virtualization"
      [dataSource]="records"
      [fields]="fields"
      [query]="query"
      [enableVirtualization]="true"
      popupHeight="200px"
      (actionBegin)="onBegin($event)"
      placeholder="e.g. Item 1">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public records: { [key: string]: Object }[] = [];
  public fields: object = { text: 'text', value: 'id' };
  public query: Query = new Query().take(40);

  constructor() {
    for (let i = 1; i <= 150; i++) {
      this.records.push({ id: 'id' + i, text: `Item ${i}` });
    }
  }

  public onBegin(e: any): void {
    e.query = new Query().take(45);
  }
}
```

> If the user-provided `take` value is less than what's needed to fill the popup, it is ignored.

---

## Show Popup Button

Show a toggle button to open/close the suggestion list (similar to a dropdown):

```html
<ejs-autocomplete [dataSource]="data" [showPopupButton]="true">
</ejs-autocomplete>
```

Default: `false`

---

## Show/Hide Clear Button

The clear button (✕) is shown by default and resets `value`, `text`, and `index` to null when clicked:

```html
<!-- Hide the clear button -->
<ejs-autocomplete [dataSource]="data" [showClearButton]="false">
</ejs-autocomplete>
```

Default: `true`

---

## RTL Support

Enable right-to-left rendering for Arabic, Hebrew, and other RTL languages:

```html
<ejs-autocomplete [dataSource]="data" [enableRtl]="true">
</ejs-autocomplete>
```

---

## Sort Order

Sort the displayed suggestions:

```html
<!-- Ascending -->
<ejs-autocomplete [dataSource]="data" sortOrder="Ascending">
</ejs-autocomplete>

<!-- Descending -->
<ejs-autocomplete [dataSource]="data" sortOrder="Descending">
</ejs-autocomplete>
```

Values: `'None'` (default), `'Ascending'`, `'Descending'`

---

## CSS Customization

Override CSS variables or class selectors to adjust the visual appearance:

```css
/* Input text */
.e-ddl.e-input-group.e-control-wrapper .e-input {
  font-size: 16px;
  color: #333;
  background: #f9f9f9;
}

/* Placeholder text color */
.e-ddl.e-input-group input.e-input::placeholder {
  color: #aaa;
}

/* Focus underline color */
.e-ddl.e-input-group.e-control-wrapper.e-input-focus::before,
.e-ddl.e-input-group.e-control-wrapper.e-input-focus::after {
  background: #1976d2;
}

/* Hover / active list item background */
.e-dropdownbase .e-list-item.e-item-focus,
.e-dropdownbase .e-list-item.e-hover {
  background-color: #e3f2fd;
  color: #0d47a1;
}

/* Popup item appearance */
.e-dropdownbase .e-list-item {
  min-height: 32px;
}
```

Use the `cssClass` property to scope customizations to a specific component instance:

```html
<ejs-autocomplete [dataSource]="data" cssClass="custom-autocomplete">
</ejs-autocomplete>
```

```css
.custom-autocomplete.e-ddl.e-input-group .e-input {
  border-color: #4caf50;
}
```
