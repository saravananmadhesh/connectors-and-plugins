# Grouping and Virtualization in Angular DropDownList

## Table of Contents
- [Grouping Overview](#grouping-overview)
- [Basic Grouping Setup](#basic-grouping-setup)
- [Group Header Behavior](#group-header-behavior)
- [Custom Group Template](#custom-group-template)
- [Virtualization Overview](#virtualization-overview)
- [Virtual Scrolling with Local Data](#virtual-scrolling-with-local-data)
- [Virtual Scrolling with Remote Data](#virtual-scrolling-with-remote-data)
- [Filtering with Virtualization](#filtering-with-virtualization)
- [Grouping with Virtualization](#grouping-with-virtualization)
- [Customizing Item Count in Virtual Mode](#customizing-item-count-in-virtual-mode)
- [When to Use Virtualization](#when-to-use-virtualization)

---

## Grouping Overview

Grouping organizes DropDownList items into labeled categories. Items are grouped based on a shared field value. The group header appears both inline (between items) and as a fixed floating header at the top of the visible popup area while scrolling.

---

## Basic Grouping Setup

Map a field to `groupBy` in the `[fields]` configuration:

```typescript
import { Component, OnInit } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="vegetables"
      [fields]="fields"
      placeholder="Select a vegetable">
    </ejs-dropdownlist>
  `
})
export class AppComponent implements OnInit {
  public vegetables: { Vegetable: string; Category: string; Id: string }[] = [];
  public fields = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };

  ngOnInit(): void {
    this.vegetables = [
      { Vegetable: 'Cabbage', Category: 'Leafy and Salad', Id: 'item1' },
      { Vegetable: 'Chickpea', Category: 'Beans', Id: 'item2' },
      { Vegetable: 'Garlic', Category: 'Bulb and Stem', Id: 'item3' },
      { Vegetable: 'Green bean', Category: 'Beans', Id: 'item4' },
      { Vegetable: 'Horse gram', Category: 'Beans', Id: 'item5' },
      { Vegetable: 'Spinach', Category: 'Leafy and Salad', Id: 'item6' },
      { Vegetable: 'Onion', Category: 'Bulb and Stem', Id: 'item7' }
    ];
  }
}
```

Items are automatically sorted and grouped by `Category`. Group headers display the category name.

---

## Group Header Behavior

- **Inline headers:** Appear as dividers between groups within the list
- **Fixed floating header:** Sticks at the top of the popup as you scroll — updates dynamically to show the current group
- The fixed header is updated automatically; no extra configuration needed

---

## Custom Group Template

Customize the group header appearance using `groupTemplate`:

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  styles: [`
    .group-label { font-style: italic; color: #0078d4; padding: 2px 0; }
  `],
  template: `
    <ejs-dropdownlist
      [dataSource]="vegetables"
      [fields]="fields"
      placeholder="Select a vegetable">
      <ng-template #groupTemplate let-data>
        <strong class="group-label">🥦 {{ data.Category }}</strong>
      </ng-template>
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public vegetables = [/* same data as above */];
  public fields = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
}
```

> The `groupTemplate` context variable (`data`) holds the group key object. Access the grouped field by its name (e.g., `data.Category`).

---

## Virtualization Overview

Virtualization efficiently renders large lists by reusing a fixed number of DOM elements. Instead of creating a DOM node for every item, only the visible items are rendered and reused as the user scrolls.

**Benefits:**
- Dramatically reduces memory usage for 1,000+ item lists
- Maintains smooth scroll performance
- Supports both local and remote data

**Enable with:** `[enableVirtualization]="true"`

When virtualization is active:
- The `actionBegin` event fires before data is fetched
- The `actionComplete` event fires after data is loaded
- The `skip` and `take` query parameters from user-supplied `Query` objects are overridden internally (the component calculates them based on popup height)

---

## Virtual Scrolling with Local Data

```typescript
import { Component, OnInit } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="records"
      [fields]="fields"
      [enableVirtualization]="true"
      [allowFiltering]="false"
      popupHeight="200px"
      placeholder="Select a record">
    </ejs-dropdownlist>
  `
})
export class AppComponent implements OnInit {
  public records: { id: number; text: string }[] = [];
  public fields = { text: 'text', value: 'id' };

  ngOnInit(): void {
    // Generate 10,000 records
    this.records = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      text: `Item ${i + 1}`
    }));
  }
}
```

---

## Virtual Scrolling with Remote Data

For remote data, the DropDownList fetches pages as the user scrolls:

```typescript
import { Component } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="customerData"
      [fields]="fields"
      [enableVirtualization]="true"
      [allowFiltering]="true"
      popupHeight="200px"
      placeholder="Select a customer">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public customerData = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  });
  public fields = { text: 'ShipName', value: 'OrderID' };
}
```

When scrolling nears the end of the loaded items, the component automatically fetches the next batch, triggering `actionBegin` → `actionComplete`.

---

## Filtering with Virtualization

Filtering and virtualization can be used together. When filtering is active, the component sends a server request using the full dataset to filter results, then applies virtualization to the filtered list:

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="records"
      [fields]="fields"
      [enableVirtualization]="true"
      [allowFiltering]="true"
      popupHeight="200px"
      placeholder="Search items">
    </ejs-dropdownlist>
  `
})
export class AppComponent implements OnInit {
  public records: { id: number; text: string }[] = [];
  public fields = { text: 'text', value: 'id' };

  ngOnInit(): void {
    this.records = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      text: `Item ${i + 1}`
    }));
  }
}
```

> When both `enableVirtualization` and `allowFiltering` are enabled, the filter input is shown in the popup. The popup closes when a filtered item is selected (even if the filter list had a selection).

---

## Grouping with Virtualization

Grouping and virtualization can be combined. For remote data, all data is initially fetched to support grouping, then virtualization manages rendering:

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="records"
      [fields]="fields"
      [enableVirtualization]="true"
      [allowFiltering]="true"
      popupHeight="200px"
      placeholder="Search grouped items">
    </ejs-dropdownlist>
  `
})
export class AppComponent implements OnInit {
  public records: { id: number; text: string; group: string }[] = [];
  public fields = { text: 'text', value: 'id', groupBy: 'group' };

  ngOnInit(): void {
    const groups = ['GroupA', 'GroupB', 'GroupC', 'GroupD'];
    this.records = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      text: `Item ${i + 1}`,
      group: groups[i % groups.length]
    }));
  }
}
```

---

## Customizing Item Count in Virtual Mode

When `enableVirtualization` is enabled, you can provide a `take` value in the initial `Query` to control the batch size. The component uses the larger of: your `take` value or the minimum items needed to fill the popup (typically 2× popup height / item height):

```typescript
import { Query } from '@syncfusion/ej2-data';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="records"
      [fields]="fields"
      [enableVirtualization]="true"
      [query]="query"
      (actionBegin)="onActionBegin($event)"
      popupHeight="200px"
      placeholder="Custom batch size">
    </ejs-dropdownlist>
  `
})
export class AppComponent implements OnInit {
  public records: { id: number; text: string }[] = [];
  public fields = { text: 'text', value: 'id' };
  public query = new Query().take(40); // request 40 items per batch

  ngOnInit(): void {
    this.records = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      text: `Item ${i + 1}`
    }));
  }

  onActionBegin(args: any): void {
    console.log('Fetching data...', args);
  }
}
```

---

## When to Use Virtualization

| Scenario | Recommendation |
|---|---|
| < 200 items | No virtualization needed |
| 200–1,000 items | Virtualization optional, beneficial for mobile |
| 1,000–10,000 items | Strongly recommended |
| 10,000+ items with filtering | Use virtualization + remote data + debounce |

---

## See Also

- [Data Binding](data-binding.md) — remote DataManager setup
- [Filtering](filtering.md) — filtering event and debounce
- [Templates](templates.md) — custom group header with `groupTemplate`
