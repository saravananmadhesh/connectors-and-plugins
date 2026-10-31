# Virtual Scrolling

## Table of Contents
- [Overview](#overview)
- [Enable Virtual Scrolling](#enable-virtual-scrolling)
- [Configuration](#configuration)
- [Performance Optimization](#performance-optimization)
- [Virtual Scroll Modes](#virtual-scroll-modes)
- [With Other Features](#with-other-features)
- [Limitations](#limitations)
- [Troubleshooting](#troubleshooting)

## Overview

Virtual scrolling renders only visible items in the dropdown, dramatically improving performance with large datasets. Instead of rendering thousands of items, only 10-20 visible items are rendered at a time.

**When to use:**
- Datasets with 1000+ items
- Remote APIs returning large results
- Memory-constrained environments
- Need for smooth scrolling experience

## Enable Virtual Scrolling

### Basic Setup

```typescript
import { MultiSelect, VirtualScroll } from '@syncfusion/ej2-dropdowns';

// Inject the VirtualScroll module
MultiSelect.Inject(VirtualScroll);

const largeDataset = [];
// Generate 10,000 items
for (let i = 0; i < 10000; i++) {
  largeDataset.push({
    id: i,
    name: `Item ${i}`
  });
}

const multiSelect = new MultiSelect({
  dataSource: largeDataset,
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,  // Enable virtual scrolling
  placeholder: 'Select from 10,000 items'
});

multiSelect.appendTo('#multiselect');
```

**Benefits:**
- ✓ Initial load time: < 100ms (vs 2-3s without)
- ✓ Memory usage: ~2MB (vs 50+MB without)
- ✓ Smooth scrolling with large datasets
- ✓ Better mobile performance

## Configuration

### Virtual Scroll Properties

```typescript
import { MultiSelect, VirtualScroll } from '@syncfusion/ej2-dropdowns';

MultiSelect.Inject(VirtualScroll);

const multiSelect = new MultiSelect({
  dataSource: largeDataset,
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,
  placeholder: 'Select item'
});

multiSelect.appendTo('#multiselect');
```

## Performance Optimization

### Optimize for Speed

Combine virtual scrolling with filtering for best performance:

```typescript
import { MultiSelect, VirtualScroll, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

MultiSelect.Inject(VirtualScroll);

const multiSelect = new MultiSelect({
  dataSource: largeDataset,
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,
  allowFiltering: true,

  filtering: (e: FilteringEventArgs) => {
    // Filter reduces items before virtual scrolling
    if (e.text) {
      const filtered = largeDataset.filter(item =>
        item.name.toLowerCase().includes(e.text.toLowerCase())
      );
      e.updateData(filtered);
    } else {
      e.updateData(largeDataset);
    }
  },

  placeholder: 'Search and select'
});

multiSelect.appendTo('#multiselect');
```

### Memory Management

```typescript
import { MultiSelect, VirtualScroll } from '@syncfusion/ej2-dropdowns';

MultiSelect.Inject(VirtualScroll);

const multiSelect = new MultiSelect({
  dataSource: largeDataset,
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,

  // Remove optional templates if not needed
  headerTemplate: null,
  footerTemplate: null,

  // Use minimal item template for speed
  itemTemplate: '${name}',

  placeholder: 'Select item'
});
```

### Lazy Loading with Virtual Scroll

Load data on-demand via remote filtering:

```typescript
import { MultiSelect, VirtualScroll, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

MultiSelect.Inject(VirtualScroll);

const pageSize = 100;

const multiSelect = new MultiSelect({
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,
  allowFiltering: true,
  debounceDelay: 400,

  filtering: async (e: FilteringEventArgs) => {
    if (!e.text || e.text.length < 2) return;

    try {
      const response = await fetch(
        `/api/search?q=${e.text}&limit=${pageSize}`
      );
      const data = await response.json();
      e.updateData(data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  }
});

multiSelect.appendTo('#multiselect');
```

## With Other Features

### Virtual Scroll + Grouping

```typescript
import { MultiSelect, VirtualScroll } from '@syncfusion/ej2-dropdowns';

MultiSelect.Inject(VirtualScroll);

const multiSelect = new MultiSelect({
  dataSource: largeDataset,
  fields: {
    text: 'name',
    value: 'id',
    groupBy: 'category'  // Works with virtual scrolling
  },
  enableVirtualization: true,
  placeholder: 'Select item'
});

multiSelect.appendTo('#multiselect');
```

### Virtual Scroll + Filtering

```typescript
import { MultiSelect, VirtualScroll, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

MultiSelect.Inject(VirtualScroll);

const multiSelect = new MultiSelect({
  dataSource: largeDataset,
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,
  allowFiltering: true,  // Filtering reduces dataset first

  filtering: (e: FilteringEventArgs) => {
    const filtered = largeDataset.filter(item =>
      item.name.toLowerCase().startsWith(e.text.toLowerCase())
    );
    e.updateData(filtered);
  }
});

multiSelect.appendTo('#multiselect');
```

### Virtual Scroll + Sorting

```typescript
import { MultiSelect, VirtualScroll } from '@syncfusion/ej2-dropdowns';

MultiSelect.Inject(VirtualScroll);

const multiSelect = new MultiSelect({
  dataSource: largeDataset,
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,
  sortOrder: 'Ascending'
});

multiSelect.appendTo('#multiselect');
```

## Limitations

### When Virtual Scrolling Has Issues

1. **Custom Templates:** Complex templates may impact rendering
   
```typescript
// ✗ Avoid - heavy template with virtual scrolling
const ms = new MultiSelect({
  allowVirtualization: true,
  itemTemplate: `<div>
    <img src="${image}" />
    <div>${name}</div>
    <div>${email}</div>
    <div>${phone}</div>
    <div>${address}</div>
  </div>`  // Too much per item
});

// ✓ Better - minimal template
const ms = new MultiSelect({
  allowVirtualization: true,
  itemTemplate: '<div>${name}</div>'
});
```

2. **Exact Height Calculation:** Virtual scrolling needs consistent item heights
   
```typescript
// CSS must ensure consistent heights
.e-multiselect .e-list-item {
  height: 40px;  // Fixed height required
  line-height: 40px;
  padding: 0 12px;
}
```

3. **Dynamic Heights:** Items with variable heights may cause scroll issues

```typescript
// ✗ Problem - variable height items
.e-multiselect .e-list-item {
  padding: auto;  /* Avoid */
  min-height: 40px;
  max-height: 100px;
}

// ✓ Solution - fixed height
.e-multiselect .e-list-item {
  height: 40px;
}
```

## Troubleshooting

### Issue: Virtual Scrolling Not Working

**Problem:** `enableVirtualization: true` set but scrolling behaves normally  
**Causes:** Module not injected, or dataset too small

```typescript
import { MultiSelect, VirtualScroll } from '@syncfusion/ej2-dropdowns';

// ✓ Must inject VirtualScroll module first
MultiSelect.Inject(VirtualScroll);

// ✓ Virtual scrolling is most effective with 1000+ items
const multiSelect = new MultiSelect({
  dataSource: largeDataset,
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true
});

// Check if enabled
console.log('Virtual scroll enabled:', multiSelect.enableVirtualization);
```

### Issue: Flickering While Scrolling

**Problem:** Items flicker or jump while scrolling  
**Cause:** Item height inconsistency or heavy template

```typescript
// Ensure consistent item heights
.e-multiselect .e-list-item {
  height: 40px;  /* Fixed height */
  line-height: 40px;
  overflow: hidden;  /* Prevent text overflow */
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Simplify template
const ms = new MultiSelect({
  enableVirtualization: true,
  itemTemplate: '<span>${name}</span>'  // Minimal
});
```

### Issue: Scroll Position Lost

**Problem:** Scroll position resets unexpectedly  
**Cause:** Data refresh or incorrect configuration

```typescript
// Don't refresh unnecessarily
const multiSelect = new MultiSelect({
  dataSource: largeDataset,
  allowVirtualization: true
});

multiSelect.appendTo('#multiselect');

// ✗ Wrong - causes scroll reset
multiSelect.refresh();

// ✓ Correct - only refresh if data changes
if (dataChanged) {
  multiSelect.dataSource = newData;
  // Scroll position may reset, which is expected
}
```

### Issue: Selected Items Not Visible

**Problem:** Virtual scroll enabled but selections not showing  
**Cause:** Popup height or container sizing issue

```typescript
// Configure popup height via popupHeight property
const multiSelect = new MultiSelect({
  dataSource: largeDataset,
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true,
  popupHeight: '300px'  // Use popupHeight to control dropdown height
});
```

### Issue: Performance Still Slow

**Problem:** Virtual scrolling enabled but still slow  
**Causes:** Complex templates, filtering too slow, or large field values

**Solutions:**

```typescript
// 1. Reduce field data size
const trimmedData = largeDataset.map(item => ({
  id: item.id,
  name: item.name  // Only essential fields
  // Skip large fields like descriptions
}));

// 2. Pre-filter data
const filtered = largeDataset.filter(item => item.active);

// 3. Use server-side filtering
const multiSelect = new MultiSelect({
  enableVirtualization: true,
  allowFiltering: true,
  debounceDelay: 400,
  filtering: async (e) => {
    if (e.text.length < 3) return;  // Require 3 chars

    const response = await fetch(`/api/search?q=${e.text}`);
    e.updateData(await response.json());
  }
});

// 4. Lazy load data
// Load initial batch, then more on scroll
```

## Next Steps

- **Add Filtering:** See [filtering-search.md](filtering-search.md)
- **Customize Display:** See [customization-templates.md](customization-templates.md)
- **Ensure Accessibility:** See [accessibility.md](accessibility.md)
