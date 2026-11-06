# Export Functionality

## Table of Contents
- [Overview](#overview)
- [Excel Export](#excel-export)
- [CSV Export](#csv-export)
- [PDF Export](#pdf-export)
- [Export Options](#export-options)

## Overview

Export features allow users to save or download pivot data in various formats. Supported formats: Excel (.xlsx), CSV (.csv), PDF (.pdf). Modules: `ExcelExport`, `PDFExport`

**Configuration:**
- Set `allowExcelExport: true` for Excel/CSV
- Set `allowPdfExport: true` for PDF
- Inject corresponding modules
- Call export methods or use toolbar

## Excel Export

### Enable Excel Export
```vue
<template>
  <div id="app">
    <button @click="exportToExcel">Export to Excel</button>
    <ejs-pivotview 
      :dataSourceSettings="dataSourceSettings" 
      :allowExcelExport="allowExcelExport"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, ExcelExport } from "@syncfusion/ej2-vue-pivotview";
import { ButtonComponent as EjsButton } from "@syncfusion/ej2-vue-buttons";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  drilledMembers: [{ name: 'Country', items: ['France'] }],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  values: [
    { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }
  ],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};

const allowExcelExport = true;
const height = 350;

const exportToExcel = () => {
  const pivotObj = document.getElementById('pivotview').ej2_instances[0];
  pivotObj.excelExport();
};

provide('pivotview', [ExcelExport]);
</script>
```

### Export with Filename
```vue
<script setup>
const exportToExcel = () => {
  const pivotObj = document.getElementById('pivotview').ej2_instances[0];
  pivotObj.excelExport('PivotReport.xlsx');  // Specify filename
};
</script>
```

### Excel Export Characteristics
- Format: .xlsx (Microsoft Excel 2007+)
- **Preserves:**
  - Formatting (colors, fonts)
  - Field hierarchy
  - All data values
  - Grand totals & subtotals
- Compatible with Microsoft Excel, Google Sheets, LibreOffice

## CSV Export

### Enable CSV Export
```vue
<template>
  <button @click="exportToCSV">Export to CSV</button>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :allowExcelExport="allowExcelExport"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview, ExcelExport } from "@syncfusion/ej2-vue-pivotview";

const allowExcelExport = true;

const exportToCSV = () => {
  const pivotObj = document.getElementById('pivotview').ej2_instances[0];
  pivotObj.csvExport();  // Export as CSV
};

provide('pivotview', [ExcelExport]);
</script>
```

### CSV Export Characteristics
- Format: .csv (plain text, comma-separated)
- **Size:** ~50% smaller than Excel
- **Compatibility:** All spreadsheet applications
- **Data:** Values only (limited formatting)
- **Perfect for:** Data interchange, import/export

### CSV Example
```csv
Country,Year,Quarter,Sold,Amount
USA,2015,Q1,1234,"$61,700"
USA,2015,Q2,1500,"$75,000"
France,2015,Q1,890,"$44,500"
```

## PDF Export

### Enable PDF Export
```vue
<template>
  <button @click="exportToPDF">Export to PDF</button>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :allowPdfExport="allowPdfExport"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, PDFExport } from "@syncfusion/ej2-vue-pivotview";

const dataSourceSettings = { /* ...config... */ };
const allowPdfExport = true;
const height = 350;

const exportToPDF = () => {
  const pivotObj = document.getElementById('pivotview').ej2_instances[0];
  pivotObj.pdfExport();
};

provide('pivotview', [PDFExport]);
</script>
```

### PDF Export with Options
```vue
<script setup>
const exportToPDFWithOptions = () => {
  const pivotObj = document.getElementById('pivotview').ej2_instances[0];
  
  const pdfExportProperties = {
    fileName: 'SalesReport.pdf'
  };
  
  pivotObj.pdfExport(pdfExportProperties);
};
</script>
```

### PDF Export Characteristics
- Format: .pdf (portable document format)
- **Preserves:** Formatting, layout, fonts
- **Perfect for:** Reports, sharing, archival
- **Distribution:** Universal compatibility
- **Print-ready:** Professional appearance

## Export Options

### Complete Export Setup with All Formats
```vue
<template>
  <div id="app">
    <div class="export-buttons">
      <button @click="exportToExcel" class="btn">
        📊 Export to Excel
      </button>
      <button @click="exportToCSV" class="btn">
        📝 Export to CSV
      </button>
      <button @click="exportToPDF" class="btn">
        📄 Export to PDF
      </button>
    </div>
    
    <ejs-pivotview 
      ref="pivot"
      :dataSourceSettings="dataSourceSettings" 
      :allowExcelExport="allowExcelExport"
      :allowPdfExport="allowPdfExport"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import { PivotViewComponent as EjsPivotview, ExcelExport, PDFExport } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const pivot = ref(null);

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  rows: [
    { name: 'Product_Categories', caption: 'Product Categories' },
    { name: 'Products' }
  ],
  values: [
    { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }
  ],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};

const allowExcelExport = true;
const allowPdfExport = true;
const height = 400;

const exportToExcel = () => {
  const pivotObj = pivot.value.ej2_instances[0];
  pivotObj.excelExport('SalesReport.xlsx');
};

const exportToCSV = () => {
  const pivotObj = pivot.value.ej2_instances[0];
  pivotObj.csvExport('SalesReport.csv');
};

const exportToPDF = () => {
  const pivotObj = pivot.value.ej2_instances[0];
  const pdfExportProperties = {
    fileName: 'SalesReport.pdf',
    pageOrientation: 'Landscape'
  };
  pivotObj.pdfExport(pdfExportProperties);
};

provide('pivotview', [ExcelExport, PDFExport]);
</script>

<style scoped>
.export-buttons {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

## GridSettings Events for Export Customization

Export events are configured within the `gridSettings` property to customize cell appearance during Excel and PDF export operations.

### ExcelQueryCellInfo

The `excelQueryCellInfo` event triggers for each row and value cell during Excel export. Use it to customize cell formatting, values, or styling in the exported Excel file.

**When to use:**
- Apply custom cell background colors
- Format cell values (currency, dates, etc.)
- Add bold or italic formatting to specific cells
- Highlight cells based on conditions

```vue
<template>
  <div id="app">
    <button @click="exportToExcel">Export to Excel</button>
    <ejs-pivotview 
      id="pivotview"
      :dataSourceSettings="dataSourceSettings"
      :gridSettings="gridSettings"
      :allowExcelExport="true"
      height="400">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview, ExcelExport } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';
import { provide } from 'vue';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sold' }],
  rows: [{ name: 'Country' }]
};

const gridSettings = {
  excelQueryCellInfo: function (args) {
    // Customize data cells during Excel export
    // args.value - cell value
    // args.style - cell style object
    
    // Highlight cells with high values (> 50000)
    if (args.value && parseFloat(args.value) > 50000) {
      args.style = {
        backColor: 'FFFF00',  // Yellow background
        bold: true,
        fontColor: '000000'   // Black text
      };
    }
    
    // Add currency formatting to numeric cells
    if (!isNaN(args.value) && args.value) {
      args.value = '$' + parseFloat(args.value).toFixed(2);
    }
  }
};

const exportToExcel = () => {
  const pivotObj = document.getElementById('pivotview').ej2_instances[0];
  pivotObj.excelExport();
};

provide('pivotview', [ExcelExport]);
</script>
```

### ExcelHeaderQueryCellInfo

The `excelHeaderQueryCellInfo` event triggers for each header cell during Excel export. Use it to customize header row and column styling.

**When to use:**
- Style column and row headers
- Apply bold or custom colors to headers
- Set header text formatting

```vue
<script setup>
const gridSettings = {
  excelHeaderQueryCellInfo: function (args) {
    // Customize header cells during Excel export
    // args.style - header cell style object
    
    args.style = {
      bold: true,
      fontSize: 12,
      backColor: '0070C0',  // Blue background
      fontColor: 'FFFFFF',  // White text
      borders: {
        left: { lineStyle: 'Thin', lineColor: '000000' },
        right: { lineStyle: 'Thin', lineColor: '000000' },
        top: { lineStyle: 'Thin', lineColor: '000000' },
        bottom: { lineStyle: 'Thin', lineColor: '000000' }
      }
    };
  }
};
</script>
```

### PdfQueryCellInfo

The `pdfQueryCellInfo` event triggers for each cell during PDF export. Use it to apply custom formatting and styling to PDF cells.

**When to use:**
- Apply custom cell colors in PDF
- Format numeric values for PDF
- Highlight important cells

```vue
<script setup>
const gridSettings = {
  pdfQueryCellInfo: function (args) {
    // Customize data cells during PDF export
    const value = args.value;
    
    // Highlight high-value cells
    if (value && parseFloat(value) > 100000) {
      args.style = {
        backgroundColor: new PdfColor(255, 107, 107),  // Red
        textBrush: new PdfBrush(new PdfColor(255, 255, 255))  // White text
      };
    }
    
    // Alternate row colors for readability
    if (args.rowIndex % 2 === 0) {
      args.style = {
        backgroundColor: new PdfColor(240, 240, 240)  // Light gray
      };
    }
  }
};
</script>
```

### PdfHeaderQueryCellInfo

The `pdfHeaderQueryCellInfo` event triggers for each header cell during PDF export. Use it to customize header styling in the PDF document.

**When to use:**
- Style column and row headers in PDF
- Apply colors and formatting to headers
- Ensure headers stand out in the exported PDF

```vue
<script setup>
const gridSettings = {
  pdfHeaderQueryCellInfo: function (args) {
    // Customize header cells during PDF export
    args.style = {
      backgroundColor: new PdfColor(0, 112, 192),  // Dark blue
      textBrush: new PdfBrush(new PdfColor(255, 255, 255)),  // White text
      bold: true
    };
  }
};
</script>
```
```

### PdfHeaderQueryCellInfo

The `pdfHeaderQueryCellInfo` event triggers for each header cell during PDF export. Use it to style headers distinctly in the PDF.

**When to use:**
- Make headers stand out in PDF
- Apply consistent header styling
- Add background colors to headers

```vue
<script setup>
const pdfHeaderQueryCellInfo = (args) => {
  // args.style - header cell style
  
  // Make headers bold with dark background
  args.style.backgroundColor = '#1F4E78';  // Dark blue
  args.style.textBrush = 'white';
  args.style.bold = true;
  args.style.fontSize = 11;
};
</script>
```
  font-size: 14px;
}

.btn:hover {
  background: #0056b3;
}
</style>
```

### Export via Toolbar
When using toolbar, export buttons appear automatically:
- Excel icon: Exports to Excel
- CSV icon: Exports to CSV  
- PDF icon: Exports to PDF

```vue
<script setup>
const showToolbar = true;  // Toolbar appears with export buttons

const toolbarClick = (args) => {
  if (args.item.id === 'grid_excelexport') {
    // Excel export button clicked
  } else if (args.item.id === 'grid_csvexport') {
    // CSV export button clicked
  } else if (args.item.id === 'grid_pdfexport') {
    // PDF export button clicked
  }
};
</script>
```

### Export Filename Conventions
```vue
<script setup>
// Format: [name].[extension]
exportToExcel('SalesReport.xlsx');
exportToCSV('SalesData.csv');
exportToPDF('report_2024.pdf');
</script>
```

### Use Cases

| Format | Best For |
|--------|----------|
| **Excel** | Data analysis, editing, sharing in business |
| **CSV** | Data interchange, import to other systems, lightweight |
| **PDF** | Reports, archival, distribution, printing |

