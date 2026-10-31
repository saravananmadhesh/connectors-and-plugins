# Advanced Features — Syncfusion Angular MultiSelect Dropdown

## Table of Contents
- [Virtualization](#virtualization)
- [Popup Resize](#popup-resize)
- [Icons in List Items](#icons-in-list-items)
- [Localization](#localization)
- [Accessibility](#accessibility)
- [RTL Support](#rtl-support)

---

## Virtualization

Virtualization improves performance when working with large datasets (thousands of items) by rendering only the visible DOM elements and recycling them during scroll instead of creating new elements for each item.

> **Important:** You must import `VirtualScroll` from `@syncfusion/ej2-angular-dropdowns` and call `MultiSelectComponent.Inject(VirtualScroll)` **before** using `enableVirtualization`. Without this injection the virtual scroll will not function.

Enable with `enableVirtualization`:

```typescript
import { Component, OnInit } from '@angular/core';
import { MultiSelectModule, MultiSelectComponent, VirtualScroll } from '@syncfusion/ej2-angular-dropdowns';

MultiSelectComponent.Inject(VirtualScroll);

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="largeDataset"
      [fields]="fields"
      [enableVirtualization]="true"
      [allowFiltering]="false"
      popupHeight="200px"
      placeholder="Select from large list">
    </ejs-multiselect>
  `
})
export class AppComponent implements OnInit {
  public largeDataset: { id: number; text: string }[] = [];
  public fields = { text: 'text', value: 'id' };

  ngOnInit(): void {
    // Generate 10,000 items
    this.largeDataset = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      text: `Item ${i + 1}`
    }));
  }
}
```

### Virtualization with Remote Data

The component automatically fetches additional data as the user scrolls:

```typescript
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { MultiSelectModule, MultiSelectComponent, VirtualScroll } from '@syncfusion/ej2-angular-dropdowns';

MultiSelectComponent.Inject(VirtualScroll);

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="dataManager"
      [fields]="fields"
      [enableVirtualization]="true"
      popupHeight="250px"
      (actionBegin)="onActionBegin()"
      (actionComplete)="onActionComplete($event)"
      placeholder="Select records">
    </ejs-multiselect>
  `
})
export class AppComponent {
  public dataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  });
  public fields = { text: 'ContactName', value: 'CustomerID' };

  onActionBegin(): void {
    console.log('Fetching data chunk...');
  }

  onActionComplete(args: any): void {
    console.log('Data loaded:', args.result?.length, 'items');
  }
}
```

**When to use virtualization:**
- Data source has 500+ items
- Items are visually simple (no heavy templates)
- Performance is a priority over full DOM access

**Virtualization limitations:**
- Does not support `groupBy` or `itemTemplate` in all scenarios — test thoroughly
- `allowFiltering` works with virtualization but combines incremental search with virtual scroll

---

## Popup Resize

Allow users to drag-resize the popup to their preferred size:

```typescript
@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="items"
      [allowResize]="true"
      popupHeight="200px"
      (resizeStart)="onResizeStart($event)"
      (resizing)="onResizing($event)"
      (resizeStop)="onResizeStop($event)"
      placeholder="Resizable popup">
    </ejs-multiselect>
  `
})
export class AppComponent {
  public items: string[] = ['Option A', 'Option B', 'Option C', 'Option D', 'Option E'];

  onResizeStart(args: any): void {
    console.log('Resize started');
  }

  onResizing(args: any): void {
    // Fires continuously with live width/height updates
    console.log('Resizing:', args);
  }

  onResizeStop(args: any): void {
    console.log('Resize stopped');
  }
}
```

**Resize behavior:**
- Resize handles appear on popup borders when `allowResize="true"`
- The resized dimensions are automatically saved to browser localStorage and restored on next open
- Fires `resizeStart`, `resizing` (continuous), and `resizeStop` events
- Popup respects minimum/maximum size constraints automatically

---

## Icons in List Items

Render icons alongside item text using the `iconCss` field and custom CSS classes:

```typescript
@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="fileTypes"
      [fields]="fields"
      placeholder="Select file types">
    </ejs-multiselect>
  `,
  styles: [`
    /* Custom icon classes using pseudo-elements or icon fonts */
    .icon-pdf   { background: url('assets/icons/pdf.svg')  no-repeat center; width: 16px; height: 16px; display: inline-block; }
    .icon-word  { background: url('assets/icons/word.svg') no-repeat center; width: 16px; height: 16px; display: inline-block; }
    .icon-excel { background: url('assets/icons/excel.svg') no-repeat center; width: 16px; height: 16px; display: inline-block; }

    /* Or use font icons (e.g., Bootstrap Icons) */
    /* .bi-file-earmark-pdf — font icon from Bootstrap Icons */
  `]
})
export class AppComponent {
  public fileTypes = [
    { id: 1, name: 'PDF Document',  icon: 'icon-pdf'   },
    { id: 2, name: 'Word Document', icon: 'icon-word'  },
    { id: 3, name: 'Excel Sheet',   icon: 'icon-excel' },
  ];
  // iconCss maps to the property holding the CSS class name
  public fields = { text: 'name', value: 'id', iconCss: 'icon' };
}
```

The `iconCss` field causes the MultiSelect to render a `<span>` element with the specified CSS class before the item text. Style that span with your icon (CSS background image, icon font, SVG mask, etc.).

For richer icon layouts — e.g., colored icons with labels — use `itemTemplate` instead (see `references/templates.md`).

---

## Localization

Override static text strings (empty state messages, count templates) for multi-language support:

```typescript
import { Component, OnInit } from '@angular/core';
import { L10n } from '@syncfusion/ej2-base';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

// Register translations before component renders
L10n.load({
  'fr-BE': {
    'multi-select': {
      noRecordsTemplate:    'Aucun enregistrement trouvé',
      actionFailureTemplate: 'La requête a échoué',
      overflowCountTemplate: '+${count} plus..',
      totalCountTemplate:    '${count} sélectionné(s)'
    }
  }
});

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="items"
      locale="fr-BE"
      placeholder="Sélectionnez des éléments">
    </ejs-multiselect>
  `
})
export class AppComponent implements OnInit {
  public items: string[] = []; // empty triggers noRecordsTemplate

  ngOnInit(): void {
    // Leave empty to see the localized "no records" message
  }
}
```

**Locale keys for MultiSelect:**

| Key | Default (en-US) | Purpose |
|---|---|---|
| `noRecordsTemplate` | `No records found` | Empty list or no filter matches |
| `actionFailureTemplate` | `The request failed` | Remote data fetch error |
| `overflowCountTemplate` | `+${count} more..` | Overflow chip showing hidden count |
| `totalCountTemplate` | `${count} selected` | Total selected items indicator |

**Notes:**
- Call `L10n.load()` before the component is rendered (module-level or in `APP_INITIALIZER`)
- The `locale` property on the component must match the key registered in `L10n.load()`
- `${count}` is a template variable substituted by the component at runtime

---

## Accessibility

The MultiSelect is fully WCAG 2.2 compliant and implements WAI-ARIA specifications:

### ARIA Attributes

| Attribute | Applied To | Purpose |
|---|---|---|
| `role="listbox"` | Popup container | Identifies the popup as a listbox |
| `role="option"` | Each list item | Identifies individual options |
| `aria-haspopup` | Input element | Indicates a popup list is associated |
| `aria-expanded` | Input element | `true` when popup is open |
| `aria-selected` | List items | Marks selected options |
| `aria-disabled` | Input element | Reflects disabled state |
| `aria-readonly` | Input element | Reflects read-only state |
| `aria-activedescendant` | Input element | Points to the focused list item |
| `aria-owns` | Input element | Links input to popup ID |

### Keyboard Navigation

| Key | Action |
|---|---|
| `↓` / `↑` | Navigate list items |
| `Enter` | Select / deselect focused item |
| `Escape` | Close popup |
| `Tab` | Move focus out of the component |
| `Backspace` | Remove the last selected chip |
| `Home` / `End` | Jump to first / last item |
| `Page Up` / `Page Down` | Scroll popup by page |

No additional configuration is needed — keyboard navigation is built-in.

### Color Contrast and Focus Indicators

The default Material3 theme meets WCAG 2.2 AA color contrast requirements. Focus indicators are visible for keyboard users. If using a custom theme, verify contrast ratios with your brand colors.

---

## RTL Support

Enable right-to-left text direction with `enableRtl`:

```typescript
@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="arabicItems"
      [enableRtl]="true"
      placeholder="اختر العناصر">
    </ejs-multiselect>
  `
})
export class AppComponent {
  public arabicItems: string[] = ['القاهرة', 'الرياض', 'دبي', 'بيروت'];
}
```

RTL flips the layout direction: the popup opens right-aligned, chips appear right-to-left, and the filter input cursor starts from the right. All keyboard navigation still works correctly.
