# PDF Export in Pivot View

## Overview

PDF export allows users to generate and download pivot table data as PDF documents. The export preserves formatting, supports both table and chart visualization, and provides options for headers, footers, and custom styling.

## When to Use

Use PDF export when you need to:
- Generate professional pivot table reports
- Create shareable PDF documents
- Print-friendly format for distribution
- Archive pivot analysis as PDFs
- Embed pivot tables in presentations
- Export both table and chart visualizations

## Basic Setup

Enable PDF export by injecting the `PDFExport` module and setting `allowPdfExport`:

```typescript
import { PivotView, IDataSet, PDFExport } from '@syncfusion/ej2-pivotview';
import { Button } from '@syncfusion/ej2-buttons';
import { pivotData } from './datasource.ts';

PivotView.Inject(PDFExport);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    allowPdfExport: true,
    height: 320
});

pivotTableObj.appendTo('#PivotTable');

// Add export button
let exportBtn: Button = new Button({ isPrimary: true });
exportBtn.appendTo('#pdf');

document.getElementById('pdf').onclick = function () {
    pivotTableObj.pdfExport();
};
```

## Exporting Multiple Pivot Tables

Combine multiple pivot tables into a single PDF file with each table on a separate page:

```typescript
import { PivotView, IDataSet, PDFExport } from '@syncfusion/ej2-pivotview';
import { Button } from '@syncfusion/ej2-buttons';

PivotView.Inject(PDFExport);

// First pivot table
let pivotTable1: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    allowPdfExport: true,
    height: 320
});
pivotTable1.appendTo('#PivotTable1');

// Second pivot table
let pivotTable2: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    allowPdfExport: true,
    height: 280
});
pivotTable2.appendTo('#PivotTable2');

// Export button
let exportBtn: Button = new Button({ isPrimary: true });
exportBtn.appendTo('#exportPdf');

document.getElementById('exportPdf').onclick = function () {
    // First export
    let firstExport: Promise<Object> = pivotTable1.pdfExport({}, true);
    
    // Chain second export
    firstExport.then((pdfData: Object) => {
        pivotTable2.pdfExport({}, false, pdfData);
    });
};
```

## Exporting Table and Chart Together

Export both pivot table grid and chart visualization in one PDF:

```typescript
import { PivotView, IDataSet, PDFExport, PivotChart } from '@syncfusion/ej2-pivotview';

PivotView.Inject(PDFExport, PivotChart);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    height: 320,
    allowPdfExport: true,
    
    // Display both table and chart
    displayOption: { view: 'Both', primary: 'Table' },
    chartSettings: {
        value: 'Amount',
        enableExport: true,
        chartSeries: { type: 'Column' }
    }
});

pivotTableObj.appendTo('#PivotTable');

// Export with both table and chart
document.getElementById('exportBtn').onclick = () => {
    // Parameters: properties, isMultipleExport, pdfDoc, isBlob, exportBothTableAndChart
    pivotTableObj.pdfExport(null, false, null, false, true);
};
```

## Adding Headers and Footers

Customize PDF with headers and footers:

```typescript
import { PivotView, PdfExportProperties } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView;

document.getElementById('exportBtn').onclick = () => {
    let pdfProperties: PdfExportProperties = {
        header: {
            fromTop: 0,
            height: 130,
            contents: [
                {
                    type: 'Text',
                    value: 'Sales Analysis Report',
                    position: { x: 0, y: 50 },
                    style: { 
                        textBrushColor: '#000000',
                        fontSize: 20,
                        bold: true
                    }
                },
                {
                    type: 'Line',
                    style: { penColor: '#0000FF', penSize: 2 }
                }
            ]
        },
        
        footer: {
            fromBottom: 160,
            height: 60,
            contents: [
                {
                    type: 'Text',
                    value: 'Page',
                    position: { x: 250, y: 20 },
                    style: { fontSize: 12 }
                },
                {
                    type: 'PageNumber',
                    position: { x: 300, y: 20 },
                    style: { fontSize: 12 }
                }
            ]
        }
    };
    
    pivotTableObj.pdfExport(pdfProperties);
};
```

## Header/Footer Content Types

### Text Content

```typescript
{
    type: 'Text',
    value: 'Your text here',
    position: { x: 0, y: 0 },
    style: { 
        fontSize: 14,
        bold: true,
        textBrushColor: '#000000'
    }
}
```

### Line Content

```typescript
{
    type: 'Line',
    points: { x1: 0, y1: 50, x2: 400, y2: 50 },
    style: {
        penColor: '#0000FF',
        penSize: 2,
        dashStyle: 'Solid'  // or 'Dash', 'Dot', 'DashDot', 'DashDotDot'
    }
}
```

### Image Content

```typescript
{
    type: 'Image',
    src: 'path/to/image.png',
    position: { x: 0, y: 0 },
    size: { height: 60, width: 60 }
}
```

### Page Number (Footer only)

```typescript
{
    type: 'PageNumber',
    position: { x: 250, y: 20 },
    style: { fontSize: 10 }
}
```

## Custom Page Setup

Configure PDF page settings:

```typescript
import { PivotView, PdfExportProperties } from '@syncfusion/ej2-pivotview';

let pdfProperties: PdfExportProperties = {
    pageOrientation: 'Portrait',  // or 'Landscape'
    pageSize: 'A4',               // A4, A3, Letter, etc.
    fileName: 'pivot-report.pdf'
};

pivotTableObj.pdfExport(pdfProperties);
```

## Advanced Example: Professional Report

Create a complete PDF report with formatting:

```typescript
import { PivotView, PdfExportProperties } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    allowPdfExport: true
});

document.getElementById('generateReport').onclick = () => {
    let reportDate = new Date().toLocaleDateString();
    
    let pdfProperties: PdfExportProperties = {
        fileName: `Sales-Report-${new Date().getTime()}.pdf`,
        pageOrientation: 'Landscape',
        pageSize: 'A4',
        
        header: {
            fromTop: 0,
            height: 100,
            contents: [
                {
                    type: 'Text',
                    value: 'SALES ANALYSIS REPORT',
                    position: { x: 150, y: 10 },
                    style: {
                        fontSize: 24,
                        bold: true,
                        textBrushColor: '#0066CC'
                    }
                },
                {
                    type: 'Text',
                    value: 'Generated: ' + reportDate,
                    position: { x: 150, y: 40 },
                    style: {
                        fontSize: 12,
                        italic: true
                    }
                },
                {
                    type: 'Line',
                    points: { x1: 0, y1: 80, x2: 800, y2: 80 },
                    style: {
                        penColor: '#0066CC',
                        penSize: 2
                    }
                }
            ]
        },
        
        footer: {
            fromBottom: 160,
            height: 80,
            contents: [
                {
                    type: 'Line',
                    points: { x1: 0, y1: 10, x2: 800, y2: 10 },
                    style: { penColor: '#999999', penSize: 1 }
                },
                {
                    type: 'Text',
                    value: 'Confidential - Internal Use Only',
                    position: { x: 200, y: 30 },
                    style: {
                        fontSize: 10,
                        italic: true,
                        textBrushColor: '#666666'
                    }
                },
                {
                    type: 'Text',
                    value: 'Page ',
                    position: { x: 350, y: 30 },
                    style: { fontSize: 10 }
                },
                {
                    type: 'PageNumber',
                    position: { x: 390, y: 30 },
                    style: { fontSize: 10 }
                }
            ]
        }
    };
    
    pivotTableObj.pdfExport(pdfProperties);
};
```

## Handling Export Events

Monitor export progress and handle completion:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    allowPdfExport: true,
    
    exportComplete: () => {
        console.log('PDF export completed');
        hideLoadingIndicator();
    },
    
    beforeExport: (args) => {
        console.log('Starting PDF export');
        showLoadingIndicator();
    }
});
```

## API Reference

### Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `pdfExport()` | properties?, isMultipleExport?, pdfDoc?, isBlob?, exportBothTableAndChart? | void/Promise | Export to PDF |

### Events

| Event | Trigger | Description |
|-------|---------|-------------|
| `beforeExport` | Before export begins | Can customize export settings |
| `exportComplete` | After export finishes | Triggered when export completes |

### PdfExportProperties

| Property | Type | Options | Description |
|----------|------|---------|-------------|
| `fileName` | string | Any | PDF filename |
| `pageOrientation` | string | 'Portrait', 'Landscape' | Page orientation |
| `pageSize` | string | 'A4', 'A3', 'Letter' | Page size |
| `header` | PdfHeader | — | Header content |
| `footer` | PdfFooter | — | Footer content |

## Common Patterns

### Pattern 1: Simple PDF Export

```typescript
document.getElementById('exportBtn').onclick = () => {
    pivotTableObj.pdfExport();
};
```

### Pattern 2: Professional Report with Headers/Footers

```typescript
document.getElementById('exportBtn').onclick = () => {
    let properties: PdfExportProperties = {
        fileName: 'report.pdf',
        header: { height: 60, contents: [/* header items */] },
        footer: { height: 60, contents: [/* footer items */] }
    };
    pivotTableObj.pdfExport(properties);
};
```

### Pattern 3: Multi-Page Export

```typescript
function exportMultipleTables() {
    let firstExport: Promise<Object> = pivot1.pdfExport({}, true);
    firstExport.then((pdfData) => {
        pivot2.pdfExport({}, false, pdfData);
    });
}
```

### Pattern 4: Table and Chart Export

```typescript
document.getElementById('exportBtn').onclick = () => {
    // Export with both table and chart (last parameter = true)
    pivotTableObj.pdfExport(null, false, null, false, true);
};
```

## Troubleshooting

### PDF Export Not Working

**Problem:** Nothing happens when clicking export
- Verify `allowPdfExport` is set to `true`
- Check that `PDFExport` module is injected
- Look for errors in browser console
- Ensure pivot table has data

### Multiple Pages Not Working

**Problem:** Second table doesn't appear on new page
- Ensure first export returns Promise
- Use `.then()` to chain second export
- Check parameter `isMultipleExport` is `true` for first table
- Verify `isMultipleExport` is `false` for subsequent tables

### Headers/Footers Not Appearing

**Problem:** Custom headers and footers don't show in PDF
- Verify header/footer height is set with `fromTop`/`fromBottom`
- Check content positioning with `position` object
- Ensure content arrays are populated
- Test individual content types

### File Not Downloading

**Problem:** Export runs but PDF doesn't download
- Check browser download settings
- Verify popup blockers aren't interfering
- Try different browser
- Check for JavaScript errors

## Best Practices

1. **Use meaningful filenames** - Include date and context
2. **Add headers** - Include title and date generated
3. **Add footers** - Include page numbers and confidentiality notes
4. **Use landscape** - Better for wide pivot tables
5. **Include both views** - Export table and chart when available
6. **Show loading feedback** - Provide visual feedback during export
7. **Test output** - Verify PDF appearance matches expectations
8. **Combine pages logically** - Group related reports together


