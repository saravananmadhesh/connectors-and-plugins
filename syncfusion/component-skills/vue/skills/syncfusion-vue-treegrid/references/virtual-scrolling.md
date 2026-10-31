# Virtual Scrolling

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Enable Virtual Scrolling](#enable-virtual-scrolling)
- [Row Height Configuration](#row-height-configuration)
- [Column Virtualization](#column-virtualization)
- [Limitations](#limitations)

## When to Use

| Scenario | When to Use | Example |
|----------|------------|----------|
| **Massive datasets** | 10,000+ rows efficiently | Financial reports, logs |
| **Smooth performance** | Only visible rows rendered | Large data tables |
| **Memory optimization** | Minimize browser memory | Desktop applications |
| **Fast navigation** | Instant scrolling speed | Large data grids |
| **Avoid pagination** | Continuous scroll UX | Infinite-like experience |
| **Real-time data** | Grid updates smoothly | Live data feeds |

---

## Mandatory Rules

Before implementing virtual scrolling:
- ✓ **VirtualScroll Module**: Inject from '@syncfusion/ej2-vue-treegrid'
- ✓ **enableVirtualization**: Set `:enableVirtualization="true"`
- ✓ **Height Property**: Grid MUST have fixed height (px or %)
- ✓ **rowHeight**: Configure `:rowHeight="36"`
- ✓ **childMapping**: Required for hierarchical data

---

## Enable Virtual Scrolling

Row virtualization renders only visible rows, dramatically improving performance:

```vue
<template>
  <ejs-treegrid 
    :dataSource="virtualData" 
    :enableVirtualization="true"
    :treeColumnIndex="1"
    childMapping="Crew"
    height="317px">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, VirtualScroll, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';
import { dataSource, virtualData } from './datasource';

provide('treegrid', [VirtualScroll]);
</script>
```

**Behavior:**
- Only visible rows in viewport are in DOM
- Expand/collapse state of child records persists
- Buffer records maintained in addition to visible rows
- Number of rendered rows determined by height and row height

---

## Row Height Configuration

Specify exact pixel height for virtual calculations:

```vue
<template>
  <ejs-treegrid 
    :dataSource="largeData" 
    :enableVirtualization="true"
    :treeColumnIndex="1"
    childMapping="subtasks"
    height="600px"
    :rowHeight="36">
  </ejs-treegrid>
</template>
```

**rowHeight Options:**
- `36px` (default) - Standard grid row
- `48px` - For more content
- Custom: `rowHeight={height}` - Set your value
- Must be numeric pixel value

**Calculation:** With height=600px and rowHeight=36px, approximately 16-17 rows visible at once + buffer rows.

---

## Column Virtualization

Virtualize columns for very wide grids with many columns:

```vue
<template>
  <ejs-treegrid 
    :dataSource="virtualData" 
    :enableVirtualization="true"
    :enableColumnVirtualization="true"
    :treeColumnIndex="1"
    childMapping="Crew"
    height="317px">
    <e-columns>
      <!-- More columns... -->
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, VirtualScroll, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';
import { dataSource, virtualData } from './datasource';

provide('treegrid', [VirtualScroll]);
</script>
```

**Column Virtualization Behavior:**
- Only visible columns in viewport are in DOM
- Other columns rendered on demand during horizontal scroll
- Reduces initial load time for wide grids
- Requires both `enableVirtualization` and `enableColumnVirtualization`

**Column Width Requirements:**
- Column widths MUST be in pixels (not percentages)
- If width undefined, grid defaults to 200px per column
- All widths required for accurate calculations

---

## limitations

### Row Virtualization Limitations

Row virtualization has the following incompatibilities:

| Feature | Compatible | Reason |
|---------|-----------|--------|
| **Batch Editing** | ❌ No | Edit mode conflicts with virtual rendering |
| **Detail Template** | ❌ No | Expanded rows break height calculations |
| **Row Template** | ❌ No | Custom HTML breaks row height uniformity |
| **Rowspan** | ❌ No | Merged cells incompatible with virtual layout |
| **Autofill** | ❌ No | AutofillModule not supported |
| **Text Wrapping** | ❌ No | Changes row height dynamically |
| **Mixed Row Heights** | ❌ No | All rows must be same height |
| **Copy-Paste** | ⚠️ Limited | Only visible viewport rows can be copied |
| **Cell Selection** | ❌ No | Only row selection supported |

**Additional Constraints:**
- Must set static height on grid or parent container
- 100% height only works if parent has static height
- Browser element limitation affects max records (typically 1M for modern browsers)
- Text wrapping not supported (row height must be consistent)
- Using different row heights with template column not supported

---

### Column Virtualization Limitations

Column virtualization has these incompatibilities:

| Feature | Compatible | Reason |
|---------|-----------|--------|
| **Colspan** | ❌ No | Column merging breaks virtual layout |
| **Batch Editing** | ❌ No | Edit mode incompatible |
| **Stacked Header** | ❌ No | Grouped columns break virtualization |
| **Row Template** | ❌ No | Custom row HTML not supported |
| **Detail Template** | ❌ No | Expandable rows not supported |
| **Autofill** | ❌ No | Not compatible |
| **Cell Selection** | ❌ No | Not supported |
| **Ctrl+Home/End** | ❌ No | Keyboard shortcuts not supported |

---
