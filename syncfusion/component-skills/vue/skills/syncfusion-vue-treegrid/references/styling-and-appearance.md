# Styling and Appearance

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [CSS Class Structure Reference](#css-class-structure-reference)
- [Header Styling](#header-styling)
- [Row Styling](#row-styling)
- [Cell Styling](#cell-styling)
- [Responsive Styling](#responsive-styling)

## When to Use

Use styling and appearance customization when you need to:
- **Brand alignment** - Match corporate colors and fonts
- **Theme support** - Switch between light/dark modes
- **Conditional formatting** - Color cells/rows by status or value
- **Professional appearance** - Custom spacing, borders, shadows
- **Visual hierarchy** - Emphasize important rows or totals
- **Data visualization** - Color-code metrics and KPIs
- **Mobile responsive** - Adapt styles to screen sizes
- **Accessibility compliance** - High contrast ratios, readable fonts
- **Print optimization** - Custom print-friendly styling

## Mandatory Rules

Before implementing custom styling:
- ✓ **CSS Classes Understood** - Know which CSS class affects which element
- ✓ **Override Syntax**: Use `:deep()` for scoped style overrides
- ✓ **Color Contrast**: Ensure WCAG AA compliance (4.5:1 for text)
- ✓ **Don't Use !important**: Only when absolutely necessary

## CSS Class Structure Reference

The TreeGrid uses a hierarchy of CSS classes for styling:

| Section | Parent Class | Child Classes | Purpose |
|---------|--------------|---------------|---------|
| **Root** | `e-treegrid` | - | Main container for entire grid |
| **Header** | `e-gridheader` | `e-table`, `e-columnheader`, `e-headercell`, `e-headercelldiv` | Column header section |
| **Body** | `e-gridcontent` | `e-table`, `e-rowcell`, `e-altrow`, `e-hover`, `e-groupcaption`, `e-selectionbackground` | Row data content |
| **Pager** | `e-pager` | `e-pagercontainer`, `e-parentmsgbar` | Pagination controls |
| **Summary** | `e-gridfooter` | `e-summaryrow`, `e-summarycell` | Summary row footer |

### Detailed CSS Classes

Complete list of CSS classes for styling:

```
Root Element
├── .e-treegrid                          // Main grid container
│
├── Header Section (.e-gridheader)
│   ├── .e-table                         // Header table (100% width)
│   ├── .e-columnheader                  // <tr> in header
│   ├── .e-headercell                    // <th> elements (override color, border)
│   ├── .e-headercelldiv                 // <div> inside <th> (override skeleton)
│   └── .e-sort-icon                     // Sort indicator icon
│
├── Body Section (.e-gridcontent)
│   ├── .e-table                         // Body table (100% width)
│   ├── .e-row                           // Data rows
│   ├── .e-altrow                        // Alternate rows (zebra striping)
│   ├── .e-rowcell                       // All cells in rows
│   ├── .e-groupcaption                  // Group caption cells
│   ├── .e-selectionbackground           // Selected row background
│   ├── .e-hover                         // Row hover state
│   ├── .e-detailrow                     // Detail/expanded row
│   └── .e-summaryrow                    // Summary row in details
│
├── Pager Section (.e-pager)
│   ├── .e-pagercontainer                // Numeric page items
│   ├── .e-parentmsgbar                  // Page info message
│   ├── .e-prevpagebtn                   // Previous button
│   └── .e-nextpagebtn                   // Next button
│
└── Summary Section (.e-gridfooter)
    ├── .e-summaryrow                    // Summary row
    └── .e-summarycell                   // Summary cells
```

## Header Styling

Override column header appearance:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    class="styled-headers">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';

const data = ref([...]);

provide('treegrid', []);
</script>

<style scoped>
.styled-headers :deep(.e-gridheader) {
  background: linear-gradient(to right, #0078d4, #0063b1);
  border-bottom: 2px solid #0050a0;
}

/* Sort indicator styling */
.styled-headers :deep(.e-sort-icon) {
  color: #fff;
  font-weight: bold;
}
</style>
```

## Row Styling

Color rows based on data values:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :rowDataBound="onRowDataBound"
    class="status-colored-grid">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';

const data = ref([
  { taskID: 1, taskName: 'Planning', status: 'Complete', progress: 100 },
]);

const onRowDataBound = (args) => {
  const status = args.data.status;
  
  if (status === 'Complete') {
    args.row.style.backgroundColor = '#d4edda';
    args.row.style.color = '#155724';
    args.row.style.borderLeft = '4px solid #28a745';
  } else if (status === 'In Progress') {
    args.row.style.backgroundColor = '#fff3cd';
    args.row.style.color = '#856404';
    args.row.style.borderLeft = '4px solid #ffc107';
  } else if (status === 'Pending') {
    args.row.style.backgroundColor = '#f8d7da';
    args.row.style.color = '#721c24';
    args.row.style.borderLeft = '4px solid #dc3545';
  }
};

provide('treegrid', []);
</script>

<style scoped>
.status-colored-grid :deep(.e-rowcell) {
  padding: 12px 10px;
}
</style>
```

## Cell Styling

Style individual cells based on values:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :queryCellInfo="onQueryCellInfo"
    class="cell-colored-grid">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';

const data = ref([
  { taskID: 1, taskName: 'Phase 1', budget: 5000, spent: 4500, remaining: 500 },
  { taskID: 2, taskName: 'Phase 2', budget: 3000, spent: 3100, remaining: -100 },
  { taskID: 3, taskName: 'Phase 3', budget: 2000, spent: 1800, remaining: 200 }
]);

const onQueryCellInfo = (args) => {
  // Highlight budget overruns
  if (args.column.field === 'remaining' && args.data.remaining < 0) {
    args.cell.style.backgroundColor = '#ffcccc';
    args.cell.style.color = '#cc0000';
    args.cell.style.fontWeight = 'bold';
  }
};

provide('treegrid', []);
</script>

<style scoped>
.cell-colored-grid :deep(.e-rowcell) {
  padding: 10px;
  transition: background-color 0.2s ease;
}
</style>
```

### Font and Typography

Custom fonts and text styling:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    class="custom-typography">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';

const data = ref([...]);

provide('treegrid', []);
</script>

<style scoped>
.custom-typography {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  line-height: 1.6;
}

.custom-typography :deep(.e-gridheader) {
  background-color: #2c3e50;
}

</style>
```

## Responsive Styling

Adapt appearance for different screen sizes:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    class="responsive-grid">
    <e-columns>
      <e-column field="taskID" headerText="ID" width=80></e-column>
      <e-column field="taskName" headerText="Task" width=200></e-column>
      <e-column field="duration" headerText="Duration" width=100></e-column>
      <e-column field="status" headerText="Status" width=100></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';

const data = ref([...]);

provide('treegrid', []);
</script>

<style scoped>
.responsive-grid {
  width: 100%;
}

/* Desktop (1024px and above) */
@media (min-width: 1024px) {
  .responsive-grid :deep(.e-headercell) {
    padding: 12px 10px;
    font-size: 13px;
  }

  .responsive-grid :deep(.e-rowcell) {
    padding: 10px;
    font-size: 13px;
  }
}
```


Light and dark theme toggle:

```vue
<template>
  <div>
    <button 
      @click="isDarkMode = !isDarkMode"
      style="margin-bottom: 10px; padding: 8px 16px; border-radius: 4px; border: 1px solid #ddd; cursor: pointer;">
      {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
    </button>

    <ejs-treegrid 
      :dataSource="data" 
      :treeColumnIndex="1"
      :class="{ 'dark-mode-grid': isDarkMode, 'light-mode-grid': !isDarkMode }">
      <e-columns>
        <e-column field="taskID" headerText="ID" width=80></e-column>
        <e-column field="taskName" headerText="Task" width=250></e-column>
        <e-column field="status" headerText="Status" width=100></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const isDarkMode = ref(false);
const data = ref([...]);

provide('treegrid', []);
</script>

<style scoped>
/* Light Mode */
.light-mode-grid {
  background-color: white;
  color: #333;
}

.light-mode-grid :deep(.e-gridheader) {
  background-color: #f5f5f5;
  border-bottom: 2px solid #e0e0e0;
}

.light-mode-grid :deep(.e-headercell) {
  background-color: #f5f5f5;
  color: #333;
  border-right: 1px solid #e0e0e0;
}

.light-mode-grid :deep(.e-rowcell) {
  background-color: white;
  color: #333;
  border-bottom: 1px solid #f5f5f5;
}

.light-mode-grid :deep(.e-row:hover) {
  background-color: #f9f9f9;
}

/* Dark Mode */
.dark-mode-grid {
  background-color: #1e1e1e;
  color: #e8e8e8;
}

.dark-mode-grid :deep(.e-gridheader) {
  background-color: #2d2d2d;
  border-bottom: 2px solid #444;
}

.dark-mode-grid :deep(.e-headercell) {
  background-color: #2d2d2d;
  color: #e8e8e8;
  border-right: 1px solid #444;
  font-weight: 600;
}

.dark-mode-grid :deep(.e-rowcell) {
  background-color: #1e1e1e;
  color: #e8e8e8;
  border-bottom: 1px solid #2d2d2d;
}

.dark-mode-grid :deep(.e-row:hover) {
  background-color: #3a3a3a;
}

.dark-mode-grid :deep(.e-row:nth-child(even)) {
  background-color: #252525;
}

.dark-mode-grid :deep(.e-selectionbackground) {
  background-color: #0078d4 !important;
  color: white !important;
}
</style>
```

Customize appearance when printing:

```vue
<template>
  <button @click="print" style="margin-bottom: 10px;">
    🖨️ Print Grid
  </button>

  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="1"
    class="printable-grid">
    <e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Print } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([...]);

const print = () => {
  gridInstance.value.print();
};

provide('treegrid', [Print]);
</script>

<style scoped>
@media print {
  /* Hide non-essential UI */
  button {
    display: none;
  }

  /* Optimize for printing */
  .printable-grid :deep(.e-treegrid) {
    width: 100%;
    overflow: visible;
  }

  .printable-grid :deep(.e-gridheader) {
    background-color: #0078d4;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}

/* Screen styles */
@media screen {
  /* Screen-only styling */
}
</style>
```