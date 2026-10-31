# Print

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Basic Print Setup](#basic-print-setup)
- [Print Options](#print-options)

## When to Use

Use printing feature when you need to:
- **Print entire grid** - Output all data to paper
- **Print current page** - Print only visible page (pagination)
- **Show/hide columns for print** - Different layout for print vs display
- **Custom print layouts** - Adjust scale and margins for large content
- **Print with toolbar** - Quick print from UI button
- **Print programmatically** - Trigger print from JavaScript
- **Export as document** - Print to PDF/Excel instead of paper
- **Generate reports** - Create printable tree grid reports

## Mandatory Rules

Before implementing printing:
- ✓ **Toolbar Module**: Provide `Toolbar` module for toolbar print button
- ✓ **Print Method**: Call `.print()` on ref instance for external button
- ✓ **printMode Property**: Set `:printMode="'CurrentPage'"` or `:printMode="'AllPages'"`
- ✓ **Print Toolbar Item**: Add `'print'` to toolbar options array
- ✓ **Column Visibility**: Use `:visible` property to hide columns from view
- ✓ **Browser Print Dialog**: Users configure scale/margins through browser dialog

## Basic Print Setup

### Print with Toolbar Button

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    height="300px"
    :toolbar="toolbarOptions">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=160></e-column>
      <e-column field="startDate" headerText="Start Date" width=90 format="yMd" textAlign="Right"></e-column>
      <e-column field="duration" headerText="Duration" width=80 textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, Toolbar, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

// Add 'print' to toolbar to show print button
const toolbarOptions = ref(['print']);

provide('treegrid', [Toolbar]);
</script>
```

### Print with External Button

```vue
<template>
  <div>
    <button @click="handlePrint">Print Grid</button>
    
    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      childMapping="subtasks"
      :treeColumnIndex="1"
      height="300px">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const data = ref([...]);
const gridInstance = ref(null);

const handlePrint = () => {
  // Trigger print from JavaScript
  gridInstance.value.print();
};

provide('treegrid', []);
</script>
```

## Print Options

### Print Current Page

Print only the visible page instead of all data:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    height="300px"
    :toolbar="['print']"
    :printMode="'CurrentPage'"
    :allowPaging="true"
    :pageSettings="pageSettings">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Toolbar, Page } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

const pageSettings = ref({ pageSize: 10 });

// Only print current page, not all data
const printMode = 'CurrentPage';  // Default is 'AllPages'

provide('treegrid', [Toolbar, Page]);
</script>
```

### Print Mode Options

| Mode | Behavior | Use Case |
|------|----------|----------|
| `AllPages` | Prints all pages of data (default) | Small datasets, print everything |
| `CurrentPage` | Prints only visible page | Large datasets, avoid performance issues |



### Print Large Number of Columns

For grids with many columns, adjust scale in browser print preview:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :toolbar="['print']">
    <!-- Many columns here -->
    <e-columns>
      <e-column field="col1" headerText="Column 1" width=80></e-column>
      <e-column field="col2" headerText="Column 2" width=80></e-column>
      <!-- ... many more columns ... -->
      <e-column field="col50" headerText="Column 50" width=80></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
// Tips for printing many columns:
// 1. Use 'CurrentPage' printMode to avoid huge print jobs
// 2. In print preview: Set Scale to 60-70% to fit more columns
// 3. Use landscape orientation in page setup
// 4. Adjust margins to minimum
// 5. Consider exporting to Excel/PDF instead
</script>
```

### Show or Hide Columns in Print

Display different columns when printing vs normal view:

```vue
<template>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :toolbar="['print']"
    @toolbarClick="onToolbarClick"
    @printComplete="onPrintComplete">
    <e-columns>
      <!-- Task ID - always visible -->
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      
      <!-- Task Name - always visible -->
      <e-column field="taskName" headerText="Task Name" width=160></e-column>
      
      <!-- Start Date - hidden normally, shown in print -->
      <e-column 
        field="startDate" 
        headerText="Start Date" 
        format="yMd"
        width=90 
        :visible="false"
        textAlign="Right">
      </e-column>
      
      <!-- Duration - visible normally, hidden in print -->
      <e-column field="duration" headerText="Duration" width=80 textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Toolbar } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([...]);

// When print is clicked, show hidden columns and hide visible ones
const onToolbarClick = (args) => {
  if (args.item.text === 'Print' || args.item.id === 'grid_print') {
    const columns = gridInstance.value.getColumns();
    
    // Show Start Date for print
    columns.forEach(col => {
      if (col.field === 'startDate') {
        col.visible = true;
      }
      // Hide Duration for print
      if (col.field === 'duration') {
        col.visible = false;
      }
    });
  }
};

// After print, revert to original state
const onPrintComplete = () => {
  const columns = gridInstance.value.getColumns();
  
  // Revert Start Date to hidden
  columns.forEach(col => {
    if (col.field === 'startDate') {
      col.visible = false;
    }
    // Revert Duration to visible
    if (col.field === 'duration') {
      col.visible = true;
    }
  });
};

provide('treegrid', [Toolbar]);
</script>
```

### Print with Custom Header/Footer

Add custom header and footer text:

```vue
<script setup>
// Method: Listen to print events and modify DOM before print
const handleBeforePrint = () => {
  // Add custom header/footer via JavaScript
  // Note: Browser's built-in header/footer options are limited in Vue
  // Recommend using printComplete event for post-print cleanup
};

const handlePrintComplete = () => {
  // Cleanup after print
  console.log('Print completed');
};

// For advanced print customization, consider:
// 1. Using printMode='CurrentPage' with specific pages
// 2. Creating separate print-view component
// 3. Exporting to PDF/Excel for more control
</script>
```
