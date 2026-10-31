# Virtualization — Syncfusion TypeScript AutoComplete

## Table of Contents
- [Overview](#overview)
- [Module Injection](#module-injection)
- [enableVirtualization](#enablevirtualization)
- [Local Data Virtualization](#local-data-virtualization)
- [Remote Data Virtualization](#remote-data-virtualization)
- [Controlling Batch Size with query.take()](#controlling-batch-size-with-querytake)
- [Grouping with Virtualization](#grouping-with-virtualization)
- [Limitations](#limitations)

---

## Overview

Virtual scrolling renders only the DOM nodes currently visible in the popup viewport, regardless of how many total items exist in the data source. This dramatically reduces DOM size and improves rendering performance when working with large datasets (thousands of items).

Without virtualization: all matching items are rendered into the DOM at once.  
With virtualization: only the visible items are in the DOM; the rest are rendered on demand as the user scrolls.

---

## Module Injection

Virtual scrolling is a separate optional module. You **must** inject it before creating an AutoComplete instance that uses `enableVirtualization`:

```typescript
import { AutoComplete, VirtualScroll } from '@syncfusion/ej2-dropdowns';

// Inject the VirtualScroll module into AutoComplete
AutoComplete.Inject(VirtualScroll);
```

> Forgetting `AutoComplete.Inject(VirtualScroll)` will result in virtual scrolling silently falling back to standard rendering.

---

## enableVirtualization

Set `enableVirtualization: true` after injecting the module:

```typescript
import { AutoComplete, VirtualScroll } from '@syncfusion/ej2-dropdowns';

AutoComplete.Inject(VirtualScroll);

const atcObj: AutoComplete = new AutoComplete({
  dataSource: largeArray,         // thousands of items
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,
  placeholder: 'Search'
});
atcObj.appendTo('#atc');
```

---

## Local Data Virtualization

Generate a large local dataset and render it with virtualization:

```typescript
import { AutoComplete, VirtualScroll } from '@syncfusion/ej2-dropdowns';

AutoComplete.Inject(VirtualScroll);

// Generate 5000 items
const largeData: { [key: string]: Object }[] = [];
for (let i = 1; i <= 5000; i++) {
  largeData.push({ id: `item${i}`, name: `Item ${i}` });
}

const atcObj: AutoComplete = new AutoComplete({
  dataSource: largeData,
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,
  popupHeight: '300px',
  placeholder: 'Search from 5000 items'
});
atcObj.appendTo('#atc');
```

**Performance tip:** Use `suggestionCount` to limit the number of items in the popup even with virtualization:

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: largeData,
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,
  suggestionCount: 100,   // render at most 100 matching items
  popupHeight: '300px',
  placeholder: 'Search'
});
atcObj.appendTo('#atc');
```

---

## Remote Data Virtualization

Combine `DataManager` with `enableVirtualization` to fetch and render large server-side datasets efficiently. The component fetches items in batches as the user scrolls:

```typescript
import { AutoComplete, VirtualScroll } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

AutoComplete.Inject(VirtualScroll);

const atcObj: AutoComplete = new AutoComplete({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  }),
  fields: { text: 'ContactName', value: 'CustomerID' },
  enableVirtualization: true,
  popupHeight: '300px',
  minLength: 0,
  placeholder: 'Search customers (virtual)'
});
atcObj.appendTo('#atc');
```

**How remote virtualization works:**
1. On first open, a batch of items is fetched based on `query.take()` (or a default batch size)
2. As the user scrolls toward the bottom of the popup, the next batch is fetched automatically
3. The total item count is retrieved via `requiresCount()` on the server response to calculate scroll height

---

## Controlling Batch Size with query.take()

Use `query.take(n)` to set the number of items fetched per batch. A larger batch reduces the number of server round-trips; a smaller batch reduces initial load time.

```typescript
import { AutoComplete, VirtualScroll } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

AutoComplete.Inject(VirtualScroll);

const atcObj: AutoComplete = new AutoComplete({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  }),
  fields: { text: 'ContactName', value: 'CustomerID' },
  enableVirtualization: true,
  query: new Query().take(40),   // fetch 40 items per scroll batch
  popupHeight: '300px',
  placeholder: 'Search'
});
atcObj.appendTo('#atc');
```

---

## Grouping with Virtualization

Grouping is supported alongside virtual scrolling. Set `fields.groupBy` as normal:

```typescript
import { AutoComplete, VirtualScroll } from '@syncfusion/ej2-dropdowns';

AutoComplete.Inject(VirtualScroll);

// Generate grouped data
const groupedData: { [key: string]: Object }[] = [];
const categories: string[] = ['Electronics', 'Clothing', 'Sports', 'Books'];
for (let i = 1; i <= 2000; i++) {
  groupedData.push({
    id: i,
    name: `Product ${i}`,
    category: categories[i % categories.length]
  });
}

const atcObj: AutoComplete = new AutoComplete({
  dataSource: groupedData,
  fields: { text: 'name', value: 'id', groupBy: 'category' },
  enableVirtualization: true,
  popupHeight: '350px',
  placeholder: 'Search products'
});
atcObj.appendTo('#atc');
```

---

## Limitations

- `enableVirtualization` requires the `VirtualScroll` module to be injected via `AutoComplete.Inject(VirtualScroll)`
- When `enableVirtualization` is `true`, the `itemTemplate` property can be used, but complex templates that dynamically change item heights may affect scroll position accuracy
- The `autofill` property (auto-fills the first suggestion into the input) does not work with virtualization when a custom `filtering` event handler overrides the filter query
- Virtual scrolling works best with a fixed `popupHeight`; avoid `'auto'` height with large datasets
