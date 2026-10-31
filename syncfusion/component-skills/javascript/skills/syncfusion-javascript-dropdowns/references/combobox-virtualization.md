# Virtualization — Syncfusion TypeScript ComboBox

## Table of Contents
- [Overview](#overview)
- [Required Module Injection](#required-module-injection)
- [Enabling Virtualization](#enabling-virtualization)
- [Local Data Virtualization](#local-data-virtualization)
- [Remote Data Virtualization](#remote-data-virtualization)
- [Virtualization with allowCustom](#virtualization-with-allowcustom)
- [Virtualization with allowFiltering](#virtualization-with-allowfiltering)
- [Edge Cases and Gotchas](#edge-cases-and-gotchas)

---

## Overview

Virtual scrolling renders only the visible subset of items in the DOM regardless of total dataset size. For ComboBox components with thousands of items, this significantly reduces memory usage and improves rendering performance.

When `enableVirtualization: true`, the ComboBox renders a small window of items and dynamically replaces them as the user scrolls through the popup list.

---

## Required Module Injection

⚠️ **Critical:** Virtualization requires the `VirtualScroll` module to be injected before instantiation. Without this, setting `enableVirtualization: true` has no effect.

```typescript
import { ComboBox, VirtualScroll } from '@syncfusion/ej2-dropdowns';

// MUST be called before creating any ComboBox instance with virtualization
ComboBox.Inject(VirtualScroll);
```

Omitting `ComboBox.Inject(VirtualScroll)` is the most common cause of virtualization silently not working.

---

## Enabling Virtualization

```typescript
import { ComboBox, VirtualScroll } from '@syncfusion/ej2-dropdowns';

ComboBox.Inject(VirtualScroll);

const comboBox: ComboBox = new ComboBox({
  dataSource: largeDataArray,        // thousands of items
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,
  placeholder: 'Select an item'
});
comboBox.appendTo('#combo-element');
```

---

## Local Data Virtualization

Generate a large local dataset and enable virtualization:

```typescript
import { ComboBox, VirtualScroll } from '@syncfusion/ej2-dropdowns';

ComboBox.Inject(VirtualScroll);

// Generate 10,000 items
const largeData: { [key: string]: Object }[] = Array.from({ length: 10000 }, (_, i) => ({
  id: `item-${i + 1}`,
  name: `Item ${i + 1}`
}));

const comboBox: ComboBox = new ComboBox({
  dataSource: largeData,
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,
  popupHeight: '300px',
  placeholder: 'Select an item'
});
comboBox.appendTo('#combo-element');
```

The ComboBox renders only the items visible in the `popupHeight` viewport, regardless of total count.

---

## Remote Data Virtualization

Use `DataManager` with `enableVirtualization` for large server-side datasets:

```typescript
import { ComboBox, VirtualScroll } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

ComboBox.Inject(VirtualScroll);

const remoteData: DataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});

const comboBox: ComboBox = new ComboBox({
  dataSource: remoteData,
  fields: { text: 'ShipName', value: 'OrderID' },
  enableVirtualization: true,
  query: new Query().select(['ShipName', 'OrderID']),
  popupHeight: '300px',
  placeholder: 'Select an order'
});
comboBox.appendTo('#combo-element');
```

With remote virtualization, the ComboBox fetches data in batches as the user scrolls. The server must support skip/take (pagination) queries.

---

## Virtualization with allowCustom

When both `enableVirtualization` and `allowCustom` are `true`, users can still type custom values not present in the virtualized list:

```typescript
import { ComboBox, VirtualScroll } from '@syncfusion/ej2-dropdowns';

ComboBox.Inject(VirtualScroll);

const comboBox: ComboBox = new ComboBox({
  dataSource: largeData,
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,
  allowCustom: true,           // user can still enter custom text
  placeholder: 'Select or type'
});
comboBox.appendTo('#combo-element');
```

For remote `DataManager` sources, custom value resolution uses an exact-match query against the server to confirm whether the typed text exists before accepting it as custom.

---

## Virtualization with allowFiltering

`enableVirtualization` and `allowFiltering` can be combined. The ComboBox filters the virtualized list as the user types:

```typescript
import { ComboBox, VirtualScroll, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { DataManager, Query } from '@syncfusion/ej2-data';

ComboBox.Inject(VirtualScroll);

const comboBox: ComboBox = new ComboBox({
  dataSource: largeData,
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,
  allowFiltering: true,
  filtering: (args: FilteringEventArgs) => {
    const query: Query = new Query();
    if (args.text !== '') {
      query.where('name', 'startswith', args.text, true);
    }
    args.updateData(largeData, query);
  },
  placeholder: 'Search and select'
});
comboBox.appendTo('#combo-element');
```

The virtual scroll resets to the top of the filtered results on each keystroke.

---

## Edge Cases and Gotchas

**1. Module injection must come before instantiation:**
```typescript
// ✅ Correct order
ComboBox.Inject(VirtualScroll);
const comboBox = new ComboBox({ enableVirtualization: true, ... });

// ❌ Wrong — injection after creation has no effect
const comboBox = new ComboBox({ enableVirtualization: true, ... });
ComboBox.Inject(VirtualScroll); // too late
```

**2. Initial value with remote virtualization:**
When `value` is set on a remote virtualized ComboBox, the component performs a server query to resolve the initial value's display text. Ensure the server supports single-record lookup by value.

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: remoteData,
  fields: { text: 'ShipName', value: 'OrderID' },
  enableVirtualization: true,
  value: 10248    // component will query server to resolve 'ShipName' for OrderID 10248
});
comboBox.appendTo('#combo-element');
```

**3. `popupHeight` affects the virtual window size:**
The number of items rendered in the DOM is derived from `popupHeight` and item height. Setting a very small `popupHeight` reduces the virtual window, potentially causing more frequent fetches on scroll.

**4. Grouping with virtualization:**
Grouped data (`fields.groupBy`) is supported with virtualization. Group headers are counted in the virtual DOM window.

**5. Incremental search behavior:**
When `enableVirtualization: true` and `allowFiltering: false`, incremental search (typing without a filter popup) scans through batches of the virtualized list to find the first match. For very large datasets, this may trigger multiple batch loads.
