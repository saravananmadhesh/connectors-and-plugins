# PDF Export

## Table of Contents
- [Mandatory Rules](#mandatory-rules)
- [When to Use](#when-to-use)
- [Module Requirements](#module-requirements)
- [Basic PDF Export](#basic-pdf-export)
- [PDF Export Options](#pdf-export-options)

## Mandatory Rules

Before implementing PDF export:
- ✓ **PdfExport Module**: Must inject `PdfExport` in provide statement
- ✓ **allowPdfExport**: Set `:allowPdfExport="true"` on TreeGrid
- ✓ **Toolbar or Button**: Add 'PdfExport' to toolbar or create custom button
- ✓ **toolbarClick Event**: Implement for custom button click handling

## Basic PDF Export

Export TreeGrid to PDF with toolbar button:

```vue
<template>
  <div>
    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      childMapping="subtasks"
      :treeColumnIndex="1"
      :allowPdfExport="true"
      :toolbar="['PdfExport']"
      @toolbarClick="onToolbarClick"
      height="270px">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import { TreeGridComponent as EjsTreegrid, Toolbar, PdfExport, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([...]);

const onToolbarClick = (args) => {
  if (args.item.text === 'PDF Export') {
    gridInstance.value.pdfExport();
  }
};

provide('treegrid', [Toolbar, PdfExport]);
</script>
```

### PDF Export Methods

### pdfExport(pdfExportProperties?)
Triggers PDF export with optional configuration:

```javascript
// Export with default settings
gridInstance.value.pdfExport();

// Export with custom properties
const pdfExportProperties = {
  fileName: 'Tasks_Report.pdf',
  pageOrientation: 'Landscape',
  pageSize: 'A4'
};
gridInstance.value.pdfExport(pdfExportProperties);
```

## PDF Export Options
### Custom File Name

Specify export file name via toolbar button:

```vue
  gridInstance.value.pdfExport({
    fileName: `Tasks_${new Date().getFullYear()}.pdf`
  });
```

### Page Orientation

Change page layout (Portrait or Landscape):

```javascript
// Portrait (default) - taller than wide
gridInstance.value.pdfExport({
  pageOrientation: 'Portrait'
});

// Landscape - wider than tall (better for many columns)
gridInstance.value.pdfExport({
  pageOrientation: 'Landscape'
});
```

### Page Size Options

Choose from 22 standard page sizes:

| Size | Dimensions | Best For |
|------|-----------|----------|
| **A3** | 297 × 420 mm | Wide layouts |
| **A4** | 210 × 297 mm | Standard (DEFAULT) |
| **A5** | 148 × 210 mm | Compact |
| **Letter** | 8.5 × 11 in | North America |
| **Legal** | 8.5 × 14 in | Legal documents |
| **Ledger** | 17 × 11 in | Very wide data |
| **Tabloid** | 11 × 17 in | Large layouts |

```javascript
const pageOptions = {
  'A0': 'Largest technical drawings',
  'A1': 'Large posters',
  'A2': 'Large documents',
  'A3': 'Wide layouts',
  'A4': 'Standard documents',
  'A5': 'Small documents',
  'A6': 'Very small',
  'Letter': 'US standard',
  'Legal': 'US legal',
  'Ledger': 'Very wide',
  'Note': 'Small note',
  'HalfLetter': 'US half size'
};

// Set page size
gridInstance.value.pdfExport({
  pageSize: 'A4'
});
```

**Full Available Sizes:** A0, A1, A2, A3, A5, A6, A7, A8, A9, B0, B1, B2, B3, B4, B5, Archa, Archb, Archc, Archd, Arche, Flsa, HalfLetter, Letter11x17, Ledger

### Export Hidden Columns

Include hidden columns in exported PDF via toolbar:

```vue
  gridInstance.value.pdfExport({
    includeHiddenColumn: true,
    fileName: 'Tasks_Full.pdf'
  });
```

### Show/Hide Columns on Export

Modify column visibility for export only:

```vue
<template>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="1"
    :toolbar="['PdfExport']"
    @toolbarClick="onToolbarClick"
    @pdfExportComplete="onPdfExportComplete">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width="90" textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width="160"></e-column>
      <e-column field="startDate" headerText="Start Date" width="90" format="yMd" textAlign="Right"></e-column>
      <e-column field="duration" headerText="Duration" width="80" :visible="false" textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, Toolbar, PdfExport, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([...]);

const onToolbarClick = (args) => {
  if (args.item.text === 'PDF Export') {
    // Make Duration visible, hide StartDate
    gridInstance.value.ej2Instances.grid.getColumns()[2].visible = false;  // StartDate
    gridInstance.value.ej2Instances.grid.getColumns()[3].visible = true;   // Duration
    gridInstance.value.pdfExport();
  }
};

const onPdfExportComplete = () => {
  // Restore original visibility after export
  gridInstance.value.ej2Instances.grid.getColumns()[2].visible = true;   // StartDate
  gridInstance.value.ej2Instances.grid.getColumns()[3].visible = false;  // Duration
};

provide('treegrid', [Toolbar, PdfExport]);
</script>
```

### Custom Data Source

Export different data than displayed via toolbar:

```vue
  const filtered = data.value.filter(d => d.priority === 'High');
  gridInstance.value.pdfExport({
    dataSource: filtered,
    fileName: 'HighPriority_Tasks.pdf'
  });
```

### Cell Style Customization

Format cells conditionally in exported PDF via toolbar:

```vue
<template>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="1"
    :toolbar="['PdfExport']"
    @toolbarClick="onToolbarClick"
    @pdfQueryCellInfo="onPdfQueryCellInfo"
    height="270px">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width="90" textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width="160"></e-column>
      <e-column field="duration" headerText="Duration" width="100" textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, Toolbar, PdfExport, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([
  { taskID: 1, taskName: 'Task 1', duration: 0, subtasks: [] },
  { taskID: 2, taskName: 'Task 2', duration: 2, subtasks: [] },
  { taskID: 3, taskName: 'Task 3', duration: 5, subtasks: [] }
]);

const onToolbarClick = (args) => {
  if (args.item.text === 'PDF Export') {
    gridInstance.value.pdfExport({
      fileName: 'Formatted_Tasks.pdf'
    });
  }
};

const onPdfQueryCellInfo = (args) => {
  // Color Duration cells based on value
  if (args.column.field === 'duration') {
    if (+args.value === 0 || args.value === '') {
      // Green for zero
      args.style = { backgroundColor: '#336c12', fontColor: '#ffffff' };
    } else if (args.value < 3) {
      // Red for short duration
      args.style = { backgroundColor: '#7b2b1d', fontColor: '#ffffff' };
    } else {
      // Blue for normal
      args.style = { backgroundColor: '#1f497d', fontColor: '#ffffff' };
    }
  }
};

provide('treegrid', [Toolbar, PdfExport]);
</script>
```

### PDF Theme Customization

Apply custom colors and fonts to entire PDF via toolbar:

```vue
  const themeConfig = selectedTheme.value === 'green' 
    ? {
        header: {
          fontColor: '#ffffff',
          fontName: 'Calibri',
          fontSize: 14,
          bold: true,
          backgroundColor: '#336c12',
          borders: { color: '#000000', lineStyle: 'Thin' }
        },
        record: { fontColor: '#000000', fontName: 'Calibri', fontSize: 11 }
      }
    : {
        header: {
          fontColor: '#ffffff',
          fontName: 'Calibri',
          fontSize: 14,
          bold: true,
          backgroundColor: '#0070c0',
          borders: { color: '#000000', lineStyle: 'Thin' }
        },
        record: { fontColor: '#000000', fontName: 'Calibri', fontSize: 11 }
      };
  
  gridInstance.value.pdfExport({
    theme: themeConfig,
    fileName: `Tasks_${selectedTheme.value}Theme.pdf`
  });
```

### Font Customization

Change default PDF fonts:

```vue
<script setup>
import { PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';

const exportCustomFont = () => {
  gridInstance.value.pdfExport({
    theme: {
      header: {
        font: new PdfStandardFont(PdfFontFamily.TimesRoman, 14, PdfFontStyle.Bold)
      },
      record: {
        font: new PdfStandardFont(PdfFontFamily.TimesRoman, 11)
      }
    },
    fileName: 'Tasks_TimesRoman.pdf'
  });
};
</script>
```

**Available Standard Fonts:** Helvetica, TimesRoman, Courier, Symbol, ZapfDingbats

### PDF Header and Footer

Add header/footer to exported PDF:

### Header/Footer with Text

```javascript
gridInstance.value.pdfExport({
  header: {
    fromTop: 0,
    height: 80,
    contents: [
      {
        type: 'Text',
        value: 'Project Tasks Report',
        position: { x: 0, y: 20 },
        style: { 
          textBrushColor: '#000000',
          fontSize: 18,
          bold: true
        }
      },
      {
        type: 'Text',
        value: `Generated on: ${new Date().toLocaleDateString()}`,
        position: { x: 0, y: 50 },
        style: {
          textBrushColor: '#666666',
          fontSize: 10
        }
      }
    ]
  },
  fileName: 'Tasks_WithHeader.pdf'
});
```

### Header/Footer with Lines

```javascript
gridInstance.value.pdfExport({
  header: {
    fromTop: 0,
    height: 50,
    contents: [
      {
        type: 'Line',
        style: { 
          penColor: '#0070c0',      // Line color
          penSize: 2,               // Line thickness
          dashStyle: 'Solid'        // Solid, Dash, Dot, Dashdot, Dashdotdot
        },
        points: { x1: 0, y1: 40, x2: 700, y2: 40 }
      }
    ]
  }
});
```

### Header/Footer with Page Numbers

```javascript
gridInstance.value.pdfExport({
  footer: {
    fromBottom: 0,
    height: 50,
    contents: [
      {
        type: 'PageNumber',
        pageNumberType: 'Arabic',              // Number format
        format: 'Page {$current} of {$total}', // Custom format
        position: { x: 0, y: 20 },
        style: {
          textBrushColor: '#333333',
          fontSize: 12,
          hAlign: 'Center'  // Center, Left, Right
        }
      }
    ]
  }
});
```

**Page Number Types:** LowerLatin (a,b,c), UpperLatin (A,B,C), LowerRoman (i,ii,iii), UpperRoman (I,II,III), Number (1,2,3)

### Header/Footer with Image

```vue
<script setup>
import { ref } from 'vue';

const logoImage = ref('data:image/png;base64,...');  // Base64 encoded image

const exportWithLogo = () => {
  gridInstance.value.pdfExport({
    header: {
      fromTop: 0,
      height: 100,
      contents: [
        {
          type: 'Image',
          src: logoImage.value,          // Base64 image string
          position: { x: 20, y: 10 },
          size: { height: 80, width: 150 }
        },
        {
          type: 'Text',
          value: 'Company Tasks Report',
          position: { x: 180, y: 40 },
          style: { fontSize: 16, bold: true }
        }
      ]
    },
    fileName: 'Tasks_WithLogo.pdf'
  });
};
</script>
```
