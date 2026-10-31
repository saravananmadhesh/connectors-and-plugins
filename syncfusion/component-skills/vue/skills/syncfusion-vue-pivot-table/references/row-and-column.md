# Row and Column Configuration

## Table of Contents
- [Overview](#overview)
- [Setting Width and Height](#setting-width-and-height)
- [Column Width Settings](#column-width-settings)
- [Row Height Settings](#row-height-settings)
- [Responsive Sizing](#responsive-sizing)
- [Grid Settings](#grid-settings)

## Overview

Row and column configuration controls the physical dimensions and layout of the PivotView component. These settings affect user experience and data readability. Properties: [`height`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#height), [`width`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#width), [`gridSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#gridsettings)

## Setting Width and Height

### Supported Formats
| Format | Example | Browser Behavior |
|--------|---------|------------------|
| Pixel | `'100'`, `'200px'` | Exact size |
| Percentage | `'50%'`, `'100%'` | Relative to parent |
| Auto | `'auto'` (height only) | Expand naturally |

### Height Configuration
```vue
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};

// Fixed height in pixels
const height = '450px';

// Or percentage
// const height = '100vh';  // Full viewport height

// Or auto
// const height = 'auto';
</script>

<template>
  <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height"></ejs-pivotview>
</template>
```

### Width Configuration
```vue
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";

const dataSourceSettings = { /* ... */ };

// Fixed width
const width = '800px';

// Or full container width
// const width = '100%';

// Or responsive
// const width = 500;  // in pixels
</script>
```

### Complete Dimension Setup
```vue
<template>
  <div id="app">
    <ejs-pivotview 
      :dataSourceSettings="dataSourceSettings" 
      :height="height" 
      :width="width">
    </ejs-pivotview>
  </div>
</template>

<script setup>
const dataSourceSettings = { /* ...config... */ };
const height = '450px';      // Fixed height
const width = '100%';        // Full parent width
</script>
```

### Height Options

**Fixed Height:**
```vue
<script setup>
const height = '450px';  // Always 450px
</script>
```

**Auto Height (expands beyond parent):**
```vue
<script setup>
const height = 'auto';   // Expands naturally, parent shows scrollbar
</script>
```

**Percentage Height:**
```vue
<script setup>
const height = '100%';   // Fill parent container
</script>
```

**Viewport Height:**
```vue
<script setup>
const height = '100vh';  // Fill entire viewport
</script>
```

## Column Width Settings

### Default Column Width
```vue
<script setup>
const gridSettings = {
  columnWidth: 120  // Default: 120 pixels per column
};

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  gridSettings: gridSettings  // Apply settings
};
</script>
```

### Reduced Column Width
```vue
<script setup>
const gridSettings = {
  columnWidth: 80  // More columns visible, less space per column
};
</script>
```

### Increased Column Width
```vue
<script setup>
const gridSettings = {
  columnWidth: 180  // Fewer columns visible, more readable
};
</script>
```

### Complete Example
```vue
<template>
  <ejs-pivotview :dataSourceSettings="dataSourceSettings" :gridSettings="gridSettings"></ejs-pivotview>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  rows: [{ name: 'Product_Categories', caption: 'Product Categories' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  values: [
    { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }
  ],
  filters: []
};

const gridSettings = {
  columnWidth: 120  // Control column width
};
</script>
```

## Row Height Settings

### Default Row Height
| Device | Default | Purpose |
|--------|---------|---------|
| Desktop | 36px | Standard row height |
| Mobile | 48px | Touch-friendly height |

### Custom Row Height
```vue
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";

const gridSettings = {
  rowHeight: 60  // Increase row height to 60 pixels
};

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  gridSettings: gridSettings
};
</script>

<template>
  <ejs-pivotview :dataSourceSettings="dataSourceSettings"></ejs-pivotview>
</template>
```

### Row Height Scenarios

**Compact Layout:**
```vue
<script setup>
const gridSettings = {
  rowHeight: 30  // Save vertical space
};
</script>
```

**Readable Layout:**
```vue
<script setup>
const gridSettings = {
  rowHeight: 50  // More space for content
};
</script>
```

**Mobile-Friendly:**
```vue
<script setup>
const gridSettings = {
  rowHeight: 48  // Easier to tap/click
};
</script>
```

## Responsive Sizing

### Mobile Responsive Configuration
```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :height="mobileHeight" 
    :width="mobileWidth"
    :gridSettings="mobileGridSettings">
  </ejs-pivotview>
</template>

<script setup>
import { ref, computed } from 'vue';

const isMobile = computed(() => window.innerWidth < 768);

// Dynamic sizing based on device
const mobileHeight = computed(() => isMobile.value ? '100vh' : '450px');
const mobileWidth = computed(() => isMobile.value ? '100%' : '800px');

const mobileGridSettings = computed(() => ({
  columnWidth: isMobile.value ? 60 : 120,  // Narrower on mobile
  rowHeight: isMobile.value ? 48 : 36       // Taller on mobile
}));
</script>
```

### Container-Relative Sizing
```vue
<template>
  <div class="pivot-container">
    <ejs-pivotview 
      :dataSourceSettings="dataSourceSettings" 
      :height="containerHeight" 
      :width="containerWidth">
    </ejs-pivotview>
  </div>
</template>

<style>
.pivot-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>

<script setup>
const containerHeight = '450px';
const containerWidth = '100%';
</script>
```

## Grid Settings

Grid settings control the appearance, layout, and behavior of the pivot table grid. Use the [`gridSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#gridsettings) property to configure these options.

### Complete Grid Settings Configuration
```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :gridSettings="gridSettings"
    :height="height"
    :width="width">
  </ejs-pivotview>
</template>

<script setup>
import { reactive } from 'vue';
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }, { name: 'Region' }],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sales' }, { name: 'Profit' }],
  filters: [{ name: 'Product' }]
};

// Comprehensive grid settings
const gridSettings = reactive({
  columnWidth: 140,              // Width of each column (in pixels)
  rowHeight: 36,                 // Height of each row (in pixels)
  layout: 'Compact',             // Layout type: 'Compact' or 'Tabular'
  allowResizing: true,           // Enable column resizing by user
  allowTextWrap: true,           // Enable text wrapping in cells
  clipMode: 'Clip'               // Content clipping: 'Clip' or 'Ellipsis'
});

const height = '600px';
const width = '100%';
</script>
```

### Grid Settings Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columnWidth` | Number | 140 | Width of each column in pixels |
| `rowHeight` | Number | 36 | Height of each row in pixels |
| `layout` | String | 'Compact' | Layout type: 'Compact' (merged headers) or 'Tabular' (traditional) |
| `allowResizing` | Boolean | true | Allow users to resize columns |
| `allowTextWrap` | Boolean | true | Wrap text that exceeds column width |
| `clipMode` | String | 'Clip' | Content truncation mode: 'Clip' or 'Ellipsis' |

### Layout Types

**Compact Layout (Default):**
```vue
<script setup>
const gridSettings = {
  layout: 'Compact'  // Headers merge, saves vertical space
};
</script>
```

## Events

### CellSelected

The `cellSelected` event triggers after a user finishes selecting cells in the pivot table. Use it to capture selected cell data and perform actions.

**When to use:**
- Get details of selected cells
- Export or copy selected data
- Update related components based on selection

```vue
<template>
  <div id="app">
    <div v-if="selectedData" class="selected-info">
      <h4>Selected Cells: {{ selectedData }}</h4>
    </div>
    <ejs-pivotview 
      :dataSourceSettings="dataSourceSettings"
      :gridSettings="gridSettings"
      :cellSelected="cellSelectedHandler"
      :height="height">
    </ejs-pivotview>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};

const height = 350;
const selectedData = ref('');

const gridSettings = {
  allowSelection: true,
  selectionSettings: { mode: 'Both', type: 'Multiple' }
};

const cellSelectedHandler = (args) => {
  // args.selectedCellsInfo - array of selected cell details
  // args.pivotValues - pivot table values
  
  const cellCount = args.selectedCellsInfo?.length || 0;
  selectedData.value = `${cellCount} cell(s) selected`;
  
  if (args.selectedCellsInfo && args.selectedCellsInfo.length > 0) {
    console.log('Selected cells:', args.selectedCellsInfo);
  }
};
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
.selected-info {
  background-color: #e3f2fd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}
</style>
```

### CellSelecting

The `cellSelecting` event triggers before a cell selection is completed. Use it to validate or cancel cell selections based on conditions.

**When to use:**
- Prevent selection of certain cells
- Validate selection based on business rules
- Log selection attempts

```vue
<template>
  <div id="app">
    <ejs-pivotview 
      :dataSourceSettings="dataSourceSettings"
      :gridSettings="gridSettings"
      :cellSelecting="cellSelectingHandler"
      :height="height">
    </ejs-pivotview>
  </div>
</template>
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};

const height = 350;

const gridSettings = {
  allowSelection: true,
  selectionSettings: { mode: 'Cell', type: 'Multiple' }
};

const cellSelectingHandler = (args) => {
  // args.currentCell - cell about to be selected
  // args.data - cell data and headers
  // args.cancel - set to true to prevent selection
  
  const cell = args;
  
  // Example: Allow selection only from specific columns
  if (cell.currentCell && cell.currentCell.getAttribute('data-column') === 'restricted') {
    args.cancel = true;
    alert('Cannot select cells from this column');
  }
  
  console.log('Cell selecting:', cell);
};
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### CellClick

The `cellClick` event triggers when a user clicks on any cell in the pivot table. Use it to handle cell interactions, apply custom styling, or perform cell operations.

**When to use:**
- Apply custom styles to clicked cells
- Navigate based on cell data
- Collect analytics on cell interactions

**Event Parameters:**
- `currentCell` - The clicked cell HTML element
- `data.rowHeader` - Row header name
- `data.columnHeader` - Column header name
- `data.value` - Cell value

```vue
<template>
  <div id="app">
    <ejs-pivotview
      :dataSourceSettings="dataSourceSettings"
      :gridSettings="gridSettings"
      :cellClick="cellClickHandler"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};

const height = 350;
const gridSettings = { columnWidth: 140, rowHeight: 36 };

const cellClickHandler = (args) => {
  // Highlight clicked cell
  args.currentCell.setAttribute('style', 'background-color: #FFC107; font-weight: bold;');
  
  // Log clicked cell information
  const cellInfo = args.data;
  console.log(`Cell clicked:`, {
    rowHeader: cellInfo.rowHeader,
    columnHeader: cellInfo.columnHeader,
    value: cellInfo.value
  });
};
</script>

<style scoped>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Column Resizing Configuration
```vue
<script setup>
const gridSettings = {
  columnWidth: 140,
  allowResizing: true,      // Enable column resizing
  allowTextWrap: true       // Wrap text instead of truncating
};
</script>
```

### Performance Optimization with Virtual Scrolling
```vue
<script setup>
const gridSettings = {
  columnWidth: 140,
  rowHeight: 36
};

const dataSourceSettings = {
  dataSource: largeDataset,  // Works well with 100k+ rows
  // ... other settings
};

// Enable on component level:
// <ejs-pivotview :enableVirtualization="true" ...
</script>
```

### Text Wrapping and Clipping
```vue
<script setup>
// Option 1: Text Wrapping
const gridSettings = {
  allowTextWrap: true,
  rowHeight: 50  // Increase row height for wrapped text
};

// Option 2: Ellipsis
const gridSettings = {
  clipMode: 'Ellipsis',  // Show ... at end of truncated text
  rowHeight: 36
};
</script>
```
};
```

### Minimum Width Requirement
```
⚠️ Note: PivotView maintains minimum width of 400px
Even if width: '300px' is set, 400px will be used
```

### Best Practices
1. **Desktop**: Use fixed dimensions for consistent layout
2. **Mobile**: Use percentages for responsive behavior  
3. **Readability**: Increase row height for dense data
4. **Performance**: Keep dimensions reasonable for rendering
5. **Testing**: Test on various screen sizes

