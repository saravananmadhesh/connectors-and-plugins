# Excel Export

The excel export feature allows TreeGrid data to be exported to Excel documents. To enable Excel export, set `allowExcelExport` to true and provide the `ExcelExport` module.

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Module Requirements](#module-requirements)
- [Basic Excel Export](#basic-excel-export)
- [Export Options](#export-options)
- [Export Events](#export-events)
- [CSV Export](#csv-export)

## When to Use

Use Excel export when you need to:
- **Generate reports** - Download hierarchical data for analysis and review
- **Archive data** - Save historical snapshots for compliance
- **Share with others** - Excel is universal format (works everywhere)
- **Aggregate presentations** - Add custom header/footer with company info
- **Styling & formatting** - Apply theme colors, conditional formatting
- **Server-side processing** - Large datasets handled by backend
- **End-of-period reports** - Month-end, quarter-end snapshots with preserve state
- **Compliance & audit** - Keep timestamped records with all original data

## Mandatory Rules

Before implementing Excel export:
- ✓ **ExcelExport Module**: Import and provide `ExcelExport` from '@syncfusion/ej2-vue-treegrid'
- ✓ **allowExcelExport**: Set to true OR provide ExcelExport module (enables feature)
- ✓ **Export Button**: Add 'ExcelExport' to toolbar OR use excelExport() method manually
- ✓ **Toolbar Click**: Export triggered via toolbar click event or method call
- ✓ **Data Binding**: Works with local, remote, or custom DataManager sources
- ✓ **treeColumnIndex**: Must specify which column shows hierarchy (treeColumnIndex)
- ✓ **Hierarchical Mapping**: Use childMapping or idMapping/parentIdMapping for parent-child relationships


## Module Requirements

```vue
<script setup>
import { Toolbar, ExcelExport } from '@syncfusion/ej2-vue-treegrid';

// Provide required modules
provide('treegrid', [
  Toolbar,      // For toolbar with ExcelExport button
  ExcelExport   // Essential for Excel export functionality
]);
</script>
```

## Basic Excel Export

```vue
<template>
  <div>
    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      :treeColumnIndex="1"
      childMapping="subtasks"
      :allowExcelExport="true"
      :toolbar="['ExcelExport']"
      :toolbarClick="toolbarClick">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width="100" textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width="200"></e-column>
        <e-column field="duration" headerText="Duration" width="100" textAlign="Right"></e-column>
        <e-column field="startDate" headerText="Start Date" type="date" format="yMd" width="120"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Toolbar, ExcelExport } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);

const data = ref([
  { taskID: 1, taskName: 'Planning', duration: 10, startDate: new Date('02/03/2017'), subtasks: [
    { taskID: 2, taskName: 'Analysis', duration: 3, startDate: new Date('02/05/2017') }
  ] },
  { taskID: 3, taskName: 'Development', duration: 20, startDate: new Date('02/10/2017'), subtasks: [] }
]);

const toolbarClick = (args) => {
  if (args.item.text === 'Excel Export') {
    const fileName = `TreeGridExport_${Date.now()}.xlsx`;
    gridInstance.value.excelExport({ fileName });
  }
};

provide('treegrid', [Toolbar, ExcelExport]);
</script>
```

**How It Works:**
1. User clicks 'ExcelExport' button in toolbar
2. TreeGrid data exports to Excel file automatically
3. File downloads with grid structure preserved
4. Hierarchical (parent-child) relationships maintained

## Export Options

### Export with Custom File Name

Customize the exported Excel file name:

```vue  
  const excelExportProperties = {
    fileName: fileName
  };
  gridInstance.value.excelExport(excelExportProperties);
```

**File Naming Tips:**
- Use descriptive names: `Tasks_2024_Q1_Report.xlsx`
- Include date: `Export_${new Date().toISOString().split('T')[0]}.xlsx`
- Avoid special characters: Replace with underscore
- Length: Keep under 255 characters (Windows limitation)

### Export Hidden Columns

Include hidden columns in the exported Excel by setting `includeHiddenColumn`:

```vue
  const excelExportProperties = {
    includeHiddenColumn: true,  // Include hidden columns in export
    fileName: 'Tasks_Complete.xlsx'
  };
  gridInstance.value.excelExport(excelExportProperties);
```

**Key Points:**
- `includeHiddenColumn: true` - Exports columns with `:visible="false"`
- Useful for export-only data (internal IDs, audit info)
- Columns remain hidden in UI but appear in Excel
- Opposite: Set to false to exclude hidden columns (default)

### Show/Hide Columns for Export Only

Change column visibility during export without affecting display:

```vue
<template>
  <div>
    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      :treeColumnIndex="1"
      :toolbar="['ExcelExport']"
      :toolbarClick="toolbarClick"
      :excelExportComplete="onExportComplete">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width="100" textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width="200"></e-column>
        <!-- Hidden normally, shown in export -->
        <e-column field="startDate" headerText="Start Date" type="date" format="yMd" :visible="false" width="120"></e-column>
        <!-- Shown normally, hidden in export -->
        <e-column field="duration" headerText="Duration" width="100" textAlign="Right"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { ExcelExport, Toolbar } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([...]);

const toolbarClick = (args) => {
  if (args.item.text === 'Excel Export') {
    // Show startDate, hide duration for export
    gridInstance.value.ej2Instances.grid.getColumns()[2].visible = true;   // Show startDate
    gridInstance.value.ej2Instances.grid.getColumns()[3].visible = false;  // Hide duration
    gridInstance.value.excelExport();
  }
};

const onExportComplete = () => {
  // Restore original visibility after export
  gridInstance.value.ej2Instances.grid.getColumns()[2].visible = false;  // Hide startDate again
  gridInstance.value.ej2Instances.grid.getColumns()[3].visible = true;   // Show duration again
};

provide('treegrid', [Toolbar, ExcelExport]);
</script>
```

**Use Cases:**
- Export summary columns (hide details)
- Export details (hide summary)
- Different layouts for display vs export
- Sensitive data hidden in display, shown in export

### Persist Collapsed/Expanded State

Preserve hierarchy expansion state in exported Excel:

```vue
const exportWithState = () => {
  const excelExportProperties = {
    isCollapsedStatePersist: true,  // Preserve expand/collapse state
    fileName: 'Tasks_Hierarchy.xlsx'
  };
  gridInstance.value.excelExport(excelExportProperties);
```

**Behavior:**
- If a parent is collapsed in grid: exports as collapsed in Excel
- If a parent is expanded in grid: exports as expanded in Excel
- Maintains exact state from display
- Useful for filtering/hiding workflow

### Custom Data Source Export

Export different data than displayed in grid:

```vue
  // Export different data than grid.dataSource
  const excelExportProperties = {
    dataSource: data,
    fileName: 'CustomReport.xlsx'
  };
  gridInstance.value.excelExport(excelExportProperties);
```

**Use Cases:**
- Export filtered/processed data
- Export aggregated summary instead of detail
- Export combined data from multiple grids
- Export computed/calculated data

### Excel Theme Customization

Apply theme colors and font styling to exported Excel:

```vue
  const excelExportProperties = {
    theme: {
      header: {
        fontName: 'Calibri',
        fontColor: '#FFFFFF',
        fontSize: 14,
        bold: true,
        backColor: '#4472C4'  // Blue header
      },
      record: {
        fontName: 'Calibri',
        fontColor: '#000000',
        fontSize: 12
      },
      caption: {
        fontName: 'Calibri',
        fontColor: '#ffffff',
        fontSize: 16,
        bold: true,
        backColor: '#203864'  // Dark blue caption
      }
    },
    fileName: 'Themed_Report.xlsx'
  };
  gridInstance.value.excelExport(excelExportProperties);
```

**Default Theme:** Material theme applied by default

**Theme Properties:**
- `header` - Header row styling
- `record` - Data row styling
- `caption` - Caption/title styling
- Properties: fontName, fontColor, fontSize, bold, italic, backColor

### Header and Footer in Export

Add company information and metadata to exported Excel:

```vue
  const excelExportProperties = {
    header: {
      headerRows: 7,
      rows: [
        // Company name
        { cells: [{ colSpan: 4, value: 'Acme Corporation', style: { fontColor: '#4472C4', fontSize: 20, bold: true, hAlign: 'Center' } }] },
        // Address line 1
        { cells: [{ colSpan: 4, value: '123 Business Street', style: { fontColor: '#4472C4', fontSize: 14, hAlign: 'Center' } }] },
        // Address line 2
        { cells: [{ colSpan: 4, value: 'Suite 100 New York, NY 10001 USA', style: { fontColor: '#4472C4', fontSize: 14, hAlign: 'Center' } }] },
        // Phone and Fax
        { cells: [{ colSpan: 4, value: 'Tel +1 212.555.1234  Fax +1 212.555.4321', style: { fontColor: '#4472C4', fontSize: 12, hAlign: 'Center' } }] },
        // Website
        { cells: [{ colSpan: 4, hyperlink: { target: 'www.acmecorp.com/', displayText: 'www.acmecorp.com' }, style: { hAlign: 'Center' } }] },
        // Email
        { cells: [{ colSpan: 4, hyperlink: { target: 'mailto:support@acmecorp.com', displayText: 'support@acmecorp.com' }, style: { hAlign: 'Center' } }] },
        // Blank row before data
        { cells: [{ colSpan: 4, value: '' }] }
      ]
    },
    footer: {
      footerRows: 4,
      rows: [
        // Blank row before footer
        { cells: [{ colSpan: 4, value: '' }] },
        // Thank you message
        { cells: [{ colSpan: 4, value: 'Thank you for your business!', style: { hAlign: 'Center', bold: true, fontSize: 12 } }] },
        // Date generated
        { cells: [{ colSpan: 4, value: `Report Generated: ${new Date().toLocaleDateString()}`, style: { hAlign: 'Center', fontSize: 11 } }] },
        // Footer note
        { cells: [{ colSpan: 4, value: 'This is a confidential document', style: { hAlign: 'Center', fontColor: '#ff0000', fontSize: 10 } }] }
      ]
    },
    fileName: `Tasks_Report_${Date.now()}.xlsx`
  };
  gridInstance.value.excelExport(excelExportProperties);
</script>
```

**Header/Footer Options:**
- `headerRows` - Number of rows for header
- `footerRows` - Number of rows for footer
- `cells[].value` - Cell text content
- `cells[].colSpan` - Merge columns
- `cells[].hyperlink` - Add clickable links
- `style` - Font, color, alignment properties

## Export Events

Handle export lifecycle with events:

```vue
<template>
  <div>
    <p>Status: {{ exportStatus }}</p>
    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      :treeColumnIndex="1"
      :toolbar="['ExcelExport']"
      :toolbarClick="toolbarClick"
      @beforeExcelExport="onBeforeExport"
      @excelExportComplete="onExportComplete">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width="100" textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width="200"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { ExcelExport, Toolbar } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const exportStatus = ref('Ready');
const data = ref([...]);

const toolbarClick = (args) => {
  if (args.item.text === 'Excel Export') {
    exportStatus.value = 'Exporting...';
  }
};

const onBeforeExport = (args) => {
  console.log('Export starting...', args);
};

const onExportComplete = (args) => {
  console.log('Export completed!', args);
};

provide('treegrid', [Toolbar, ExcelExport]);
</script>
```

**Export Events:**
- `beforeExcelExport` - Before export starts, modify properties
- `excelExportComplete` - After file generated, for cleanup/logging


### Conditional Cell Formatting

Apply styles to cells in exported Excel based on values using `excelQueryCellInfo` event:

```vue
<template>
  <div>
    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      :treeColumnIndex="1"
      :toolbar="['ExcelExport']"
      :toolbarClick="toolbarClick"
      @excelQueryCellInfo="onExcelQueryCell">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width="100" textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width="200"></e-column>
        <e-column field="duration" headerText="Duration" width="100" textAlign="Right"></e-column>
        <e-column field="status" headerText="Status" width="100"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { ExcelExport, Toolbar } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);

const data = ref([
  { taskID: 1, taskName: 'Planning', duration: 10, status: 'Completed' },
  { taskID: 2, taskName: 'Design', duration: 0, status: 'Not Started' },
  { taskID: 3, taskName: 'Development', duration: 2, status: 'In Progress' }
]);

const toolbarClick = (args) => {
  if (args.item.text === 'Excel Export') {
    gridInstance.value.excelExport();
  }
};

const onExcelQueryCell = (args) => {
  // Format Duration column based on value
  if (args.column.field === 'duration') {
    if (args.value === 0 || args.value === '') {
      args.style = { backColor: '#ff0000' };  // Red for zero
    } else if (args.value < 3) {
      args.style = { backColor: '#ffff00' };  // Yellow for < 3
    } else {
      args.style = { backColor: '#00ff00' };  // Green for >= 3
    }
  }
};

provide('treegrid', [Toolbar, ExcelExport]);
</script>
```

**Style Properties Available:**
- `backColor` - Cell background color (hex: #RRGGBB)
- `fontColor` - Text color
- `fontSize` - Font size (in points)
- `bold` - Bold text
- `italic` - Italic text
- `borders` - Cell borders


## CSV Export

```vue
<template>
  <div>
    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      :treeColumnIndex="1"
      :toolbar="['CsvExport']"
      :toolbarClick="toolbarClick">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Toolbar, ExcelExport } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([...]);

const toolbarClick = (args) => {
  if (args.item.text === 'Csv Export') {
    gridInstance.value.csvExport();
  }
};

provide('treegrid', [Toolbar, ExcelExport]);
</script>
```
