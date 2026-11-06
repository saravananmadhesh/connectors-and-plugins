---
name: Scrolling
description: 'Scrolling in Syncfusion Angular TreeGrid - virtual scrolling for large datasets, infinite scroll, height and width management, and scroll positioning.'
---

# Scrolling

## When to Use

Use scrolling features when you need to:
- **Virtual scrolling** — Handle 1000+ rows efficiently without loading all at once
- **Infinite scrolling** — Load more data as users scroll to the bottom
- **Horizontal scrolling** — Handle TreeGrid wider than viewport
- **Smooth scrolling** — Optimize scroll performance and responsiveness
- **Combined with paging** — Choose between paging vs. scrolling strategies
- **Large datasets** — Efficiently render large amounts of data

## Table of Contents
- [Scrolling Rules](#scrolling--paging-rules)
- [Virtual Scrolling](#virtual-scrolling)
- [Infinite Scrolling](#infinite-scrolling)
- [Height and Width](#height-and-width)
- [Horizontal Scrolling](#horizontal-scrolling)

## Scrolling Rules

### Rule 1: Virtual Scrolling, Infinite Scrolling, and Paging are MUTUALLY EXCLUSIVE
**Severity**: 🔴 CRITICAL - Cannot use together; will cause conflicts

**Allowed Combinations**:
```typescript
// ✅ OPTION 1: enableVirtualization ONLY
<ejs-treegrid 
  [enableVirtualization]='true'
  [allowPaging]='false'
  [enableInfiniteScrolling]='false'>
</ejs-treegrid>

// ✅ OPTION 2: allowPaging ONLY
<ejs-treegrid 
  [allowPaging]='true'
  [enableVirtualization]='false'
  [enableInfiniteScrolling]='false'>
</ejs-treegrid>

// ✅ OPTION 3: enableInfiniteScrolling ONLY
<ejs-treegrid 
  [enableInfiniteScrolling]='true'
  [allowPaging]='false'
  [enableVirtualization]='false'>
</ejs-treegrid>

// ✅ OPTION 4: No scrolling (small datasets)
<ejs-treegrid 
  [allowPaging]='false'
  [enableVirtualization]='false'
  [enableInfiniteScrolling]='false'>
</ejs-treegrid>

// ❌ CONFLICT - Do NOT combine these
<ejs-treegrid 
  [enableVirtualization]='true'
  [allowPaging]='true'>  <!-- ERROR: Conflicting settings -->
</ejs-treegrid>

// ❌ CONFLICT - Do NOT combine
<ejs-treegrid 
  [enableInfiniteScrolling]='true'
  [allowPaging]='true'>  <!-- ERROR: Conflicting settings -->
</ejs-treegrid>
```

**When to Use Each**:
| Mode | Use Case | Dataset Size | Performance |
|------|----------|--------------|-------------|
| **Virtual Scrolling** | All rows visible in viewport, smooth scrolling | 1,000 - 100,000+ rows | Excellent |
| **Pagination** | Server-side data fetch per page | Any size | Good |
| **Infinite Scroll** | Progressive loading as user scrolls | 10,000+ rows | Good |
| **None** | Complete data in memory | < 1,000 rows | Fast |

---

### Rule 2: Virtual Scrolling Requires Fixed Height
**Severity**: 🔴 CRITICAL - Virtual scrolling won't work with auto height

**Requirement**:
```typescript
// ✅ REQUIRED - Must set explicit height
<ejs-treegrid 
  [enableVirtualization]='true'
  height='600px'>  <!-- MANDATORY: Fixed pixel height -->
</ejs-treegrid>

// ❌ WRONG - Auto height breaks virtual scrolling
<ejs-treegrid 
  [enableVirtualization]='true'
  height='auto'>  <!-- Will not virtualize properly -->
</ejs-treegrid>

// ❌ WRONG - No height breaks virtual scrolling
<ejs-treegrid 
  [enableVirtualization]='true'>  <!-- Will not virtualize -->
</ejs-treegrid>
```

**Height Requirements**:
```typescript
// Virtual scrolling height settings
height='400px'      // ✅ Small grids
height='600px'      // ✅ Medium grids
height='800px'      // ✅ Large datasets
height='100vh'      // ✅ Full viewport (with margins)

// Also set pageSize appropriately
[pageSettings]='{ pageSize: 100 }'  // Match visible row count
```

---

## Virtual Scrolling

Load large datasets efficiently with virtual scrolling for optimal performance:

```typescript
import { Component } from '@angular/core';
import { VirtualScrollService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='largeData'
      [childMapping]='childMapping'
      [enableVirtualization]='true'
      height='400px'
      width='100%'
      [pageSettings]='{ pageSize: 100 }'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='100'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
        <e-column field='StartDate' headerText='Start Date' type='date' format='yMd' width='150'></e-column>
        <e-column field='Duration' headerText='Duration' width='100'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [VirtualScrollService]
})
export class AppComponent {
  public largeData: Object[] = [];
  public childMapping: string = 'subtasks';

  constructor() {
    this.generateLargeDataset(10000);
  }

  generateLargeDataset(count: number) {
    for (let i = 1; i <= count; i++) {
      this.largeData.push({
        TaskID: i,
        TaskName: `Task ${i}`,
        StartDate: new Date(2024, 0, 1),
        Duration: Math.floor(Math.random() * 10) + 1,
        subtasks: []
      });
    }
  }
}
```

### Virtual Scrolling Benefits
- Supports 100,000+ rows efficiently
- Only renders visible rows in viewport
- Smooth scrolling with minimal lag
- Reduces memory footprint significantly
- Essential for enterprise-scale datasets

### Configuration Tips
- Always set fixed `height` (required for virtual scrolling)
- Match `pageSize` with rendering chunk size (typically 50-200 rows)
- Set explicit `rowHeight` for uniform performance
- Combine with server-side paging for API-driven data

---

## Infinite Scrolling

Automatically load more data as user scrolls to bottom:

```typescript
import { Component } from '@angular/core';
import { InfiniteScrollService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='largeData'
      [childMapping]='childMapping'
      [enableInfiniteScrolling]='true'
      height='400px'
      width='100%'
      [pageSettings]='{ pageSize: 100 }'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='100'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
        <e-column field='StartDate' headerText='Start Date' type='date' format='yMd' width='150'></e-column>
        <e-column field='Duration' headerText='Duration' width='100'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [InfiniteScrollService]
})
export class AppComponent {
  public largeData: Object[] = [];
  public childMapping: string = 'subtasks';

  constructor() {
    this.generateLargeDataset(10000);
  }

  generateLargeDataset(count: number) {
    for (let i = 1; i <= count; i++) {
      this.largeData.push({
        TaskID: i,
        TaskName: `Task ${i}`,
        StartDate: new Date(2024, 0, 1),
        Duration: Math.floor(Math.random() * 10) + 1,
        subtasks: []
      });
    }
  }
}
```

### Best Practices for Infinite Scroll
- Load data in chunks (20-50 items per request)
- Implement loading indicator during data fetch
- Cache loaded data to prevent re-fetching
- Combine with virtual scrolling for optimal performance
- Implement debounce to prevent excessive API calls

---

## Height and Width Configuration

### Fixed Height (with Vertical Scrolling)

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  height='500px'
  width='100%'>
  <e-columns>
    <e-column field='TaskID' headerText='Task ID' width='100'></e-column>
    <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
  </e-columns>
</ejs-treegrid>
```

### Percentage Height

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  height='100%'
  width='100%'>
  <!-- columns -->
</ejs-treegrid>
```

### Auto Height (Content-Based)

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  height='auto'
  width='100%'>
  <!-- Grid grows with content, no vertical scroll -->
</ejs-treegrid>
```

## Horizontal Scrolling

### Enable Horizontal Scrolling

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  height='400px'
  width='100%'>
  <e-columns>
    <e-column field='TaskID' headerText='Task ID' width='100'></e-column>
    <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
    <e-column field='StartDate' headerText='Start Date' width='150'></e-column>
    <e-column field='EndDate' headerText='End Date' width='150'></e-column>
    <e-column field='Duration' headerText='Duration' width='100'></e-column>
    <e-column field='Progress' headerText='Progress' width='100'></e-column>
    <e-column field='Status' headerText='Status' width='120'></e-column>
  </e-columns>
</ejs-treegrid>
```

**Note:** Horizontal scrolling activates when total column width exceeds container width.

### Frozen Columns with Horizontal Scroll

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  height='400px'
  width='600'
  [frozenColumns]='2'>
  <e-columns>
    <e-column field='TaskID' headerText='Task ID' width='100' isFrozen='true'></e-column>
    <e-column field='TaskName' headerText='Task Name' width='200' isFrozen='true'></e-column>
    <e-column field='StartDate' headerText='Start Date' width='150'></e-column>
    <e-column field='EndDate' headerText='End Date' width='150'></e-column>
    <e-column field='Duration' headerText='Duration' width='100'></e-column>
  </e-columns>
</ejs-treegrid>
```

**Result:** First 2 columns stay frozen while others scroll horizontally.

---

## Performance Best Practices

1. **Virtual Scrolling**: Use for 1000+ rows
2. **Fixed Height**: Always set explicit height, not 'auto'
3. **Explicit Widths**: Set column widths to enable horizontal scroll
4. **Server-Side Ops**: Offload paging/filtering to server
5. **Pageing vs Virtual**: Virtual for better UX, paging for older browsers
6. **Row Height**: Set consistent row height for accurate virtual scrolling
7. **Minimize Templates**: Complex cell templates reduce scroll performance
8. **Freeze Judiciously**: Frozen columns create separate scroll areas (impacts performance)

---

## Common Scenarios

| Scenario | Solution |
|---|---|
| Large dataset (10K+ rows) | Virtual scrolling + server-side paging |
| Real-time data | Virtual scrolling + infinite scroll |
| Mobile responsive | Percentage height + horizontal scroll |
| Sticky headers | Frozen rows (combine with virtual scroll) |
| Performance critical | Minimize column count, templates, frozen columns |

---

## Key APIs Reference

| Property/Method | Type | Description |
|---|---|---|
| `height` | string/number | Container height (px, %, or 'auto') |
| `width` | string/number | Container width |
| `enableVirtualization` | boolean | Enable virtual scrolling |
| `frozenRows` | number | Rows frozen from top |
| `frozenColumns` | number | Columns frozen from left |
| `rowHeight` | number | Row height in pixels |
| `getContent()` | method | Get scrollable content element |
| `getRowByIndex()` | method | Get row element by index |


### Custom Scrollbar Style

```css
.e-treegrid ::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

.e-treegrid ::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.e-treegrid ::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 6px;
}

.e-treegrid ::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```
