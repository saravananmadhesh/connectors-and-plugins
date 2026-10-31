# Excel Export in Pivot View

## Overview

Excel export allows users to download pivot table data in Excel (.xlsx) or CSV formats. The exported file preserves formatting, formulas, and structure, making it easy to share and analyze pivot data in spreadsheet applications.

## When to Use

Use Excel export when you need to:
- Allow users to download pivot data for offline analysis
- Share pivot reports in Excel format
- Perform advanced Excel calculations on pivot data
- Create Excel files with multiple pivot tables
- Export with custom formatting and styling
- Archive pivot table snapshots

## Basic Setup

Enable Excel export by injecting the `ExcelExport` module and setting `allowExcelExport`:

```typescript
import { PivotView, IDataSet, ExcelExport, Toolbar } from '@syncfusion/ej2-pivotview';
import { Button } from '@syncfusion/ej2-buttons';
import { pivotData } from './datasource.ts';

PivotView.Inject(ExcelExport, Toolbar);

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
    allowExcelExport: true,
    height: 320
});

pivotTableObj.appendTo('#PivotTable');

// Add export button
let exportBtn: Button = new Button({ isPrimary: true });
exportBtn.appendTo('#excel');

document.getElementById('excel').onclick = function () {
    pivotTableObj.excelExport();
};
```

## Export to CSV

Export pivot data as comma-separated values:

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView;

// CSV export
document.getElementById('csv').onclick = function () {
    pivotTableObj.csvExport();
};
```

## Exporting Multiple Pivot Tables

Combine multiple pivot tables into a single Excel file:

```typescript
import { PivotView, IDataSet, ExcelExport } from '@syncfusion/ej2-pivotview';
import { Button } from '@syncfusion/ej2-buttons';

PivotView.Inject(ExcelExport);

// First pivot table
let pivotTableObj1: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    allowExcelExport: true,
    height: 320
});
pivotTableObj1.appendTo('#PivotTable1');

// Second pivot table
let pivotTableObj2: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    allowExcelExport: true,
    height: 320
});
pivotTableObj2.appendTo('#PivotTable2');

// Export button
let exportBtn: Button = new Button({ isPrimary: true });
exportBtn.appendTo('#exportMultiple');

document.getElementById('exportMultiple').onclick = function () {
    let excelProperties: ExcelExportProperties = {
        pivotTableIds: ['PivotTable1', 'PivotTable2'],
        multipleExport: {
            type: 'AppendToSheet',   // Same sheet
            blankRows: 5             // Blank rows between tables
        }
    };
    pivotTableObj1.excelExport(excelProperties, true);
};
```

### Export to Separate Worksheets

Put each pivot table on its own worksheet:

```typescript
let excelProperties: ExcelExportProperties = {
    pivotTableIds: ['PivotTable1', 'PivotTable2'],
    multipleExport: {
        type: 'NewSheet'  // Each table gets new worksheet
    }
};

document.getElementById('exportBtn').onclick = () => {
    pivotTableObj1.excelExport(excelProperties, true);
};
```

## Custom Export Properties

Customize the exported Excel file:

```typescript
import { PivotView, ExcelExportProperties } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView;

document.getElementById('exportBtn').onclick = () => {
    let excelProperties: ExcelExportProperties = {
        fileName: 'my-pivot-report.xlsx',  // Custom filename
        
        // Add header and footer
        header: {
            fromTop: 0,
            height: 60,
            contents: [
                {
                    type: 'Text',
                    value: 'Sales Analysis Report',
                    position: { x: 0, y: 20 },
                    style: { fontSize: 20, bold: true }
                }
            ]
        },
        
        footer: {
            fromBottom: 160,
            height: 60,
            contents: [
                {
                    type: 'Text',
                    value: 'Generated on: ' + new Date().toLocaleDateString(),
                    position: { x: 0, y: 0 },
                    style: { fontSize: 10, italic: true }
                }
            ]
        },
        
        // Apply theme
        theme: {
            header: { fontName: 'Calibri', fontSize: 14, bold: true },
            record: { fontName: 'Calibri', fontSize: 12 }
        }
    };
    
    pivotTableObj.excelExport(excelProperties);
};
```

## Customizing Export During Process

Modify the export using the `beforeExport` event:

```typescript
import { PivotView, BeforeExportEventArgs } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    allowExcelExport: true,
    
    beforeExport: (args: BeforeExportEventArgs) => {
        // Expand all headers before export
        let settings = args.dataSourceSettings;
        settings.expandAll = true;
        
        // Generate updated pivot values
        pivotTableObj.generateGridData(settings);
        
        // Update export data
        args.dataCollections = pivotTableObj.pivotValues;
        
        // Restore original state
        settings.expandAll = false;
    }
});
```

## Conditional Styling During Export

Apply styles based on cell values:

```typescript
import { PivotView, GridSettingsModel, ExcelQueryCellInfoEventArgs } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    allowExcelExport: true,
    
    gridSettings: {
        excelQueryCellInfo: (args: ExcelQueryCellInfoEventArgs) => {
            // Apply conditional formatting
            if (args.cell.value >= 500) {
                args.cell.style.backColor = '#92D050';  // Green
            } else if (args.cell.value < 100) {
                args.cell.style.backColor = '#FF0000';  // Red
            }
        },
        
        excelHeaderQueryCellInfo: (args: ExcelQueryCellInfoEventArgs) => {
            // Style headers
            args.cell.style.fontName = 'Calibri';
            args.cell.style.fontSize = 12;
            args.cell.style.bold = true;
        }
    }
});
```

## Text Rotation in Export

Rotate text in exported cells:

```typescript
gridSettings: {
    excelHeaderQueryCellInfo: (args: ExcelQueryCellInfoEventArgs) => {
        args.cell.style.rotation = 90;  // Rotate 90 degrees
    }
}
```

## Export Current Page Only

Export only visible data (with virtual scrolling or paging):

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    allowExcelExport: true,
    enableVirtualization: true,
    enablePaging: true,
    
    exportAllPages: false  // Export only current page
});
```

## Custom Export with Aggregates

Export with custom calculated aggregations:

```typescript
import { PivotView, BeforeExportEventArgs } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    allowExcelExport: true,
    
    aggregateCellInfo: (args) => {
        // Calculate custom aggregates
        if (args.aggregateType === 'CustomSum') {
            args.value = customSumCalculation(args.fieldValue);
        }
    },
    
    beforeExport: (args: BeforeExportEventArgs) => {
        // Ensure custom values are included
        args.dataCollections = pivotTableObj.pivotValues;
    }
});
```

## Show Loading Indicator

Display spinner during export:

```typescript
document.getElementById('exportBtn').onclick = () => {
    // Show loading indicator
    pivotTableObj.showWaitingPopup();
    
    // Export data
    pivotTableObj.excelExport();
    
    // Hide when complete (triggered by exportComplete event)
};

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    allowExcelExport: true,
    
    exportComplete: () => {
        pivotTableObj.hideWaitingPopup();
    }
});
```

## Using Toolbar for Export

Add export options to toolbar automatically:

```typescript
import { PivotView, Toolbar, ExcelExport } from '@syncfusion/ej2-pivotview';

PivotView.Inject(Toolbar, ExcelExport);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    showToolbar: true,
    toolbar: [
        'Grid', 'Chart', 'Export',  // Include Export button
        'ExcelExport', 'CsvExport', 'Pdf'
    ],
    allowExcelExport: true,
    height: 350
});
```

## API Reference

### Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `excelExport()` | excelExportProperties?, isMultipleExport?, pdfDoc?, isBlob? | void/Promise | Export to Excel |
| `csvExport()` | None | void | Export to CSV |

### Events

| Event | Arguments | Description |
|-------|-----------|-------------|
| `beforeExport` | BeforeExportEventArgs | Triggered before export; can customize data |
| `exportComplete` | void | Triggered after export completes |

### ExcelExportProperties

| Property | Type | Description |
|----------|------|-------------|
| `fileName` | string | Custom filename for exported file |
| `header` | PdfHeader | Header content and styling |
| `footer` | PdfFooter | Footer content and styling |
| `theme` | ExcelTheme | Color theme for export |

## Common Patterns

### Pattern 1: Simple Export Button

```typescript
document.getElementById('exportBtn').onclick = () => {
    pivotTableObj.excelExport();
};
```

### Pattern 2: Export with Custom Filename and Styling

```typescript
document.getElementById('exportBtn').onclick = () => {
    let properties: ExcelExportProperties = {
        fileName: `Sales-Report-${new Date().getTime()}.xlsx`,
        theme: {
            header: { fontSize: 14, bold: true },
            record: { fontSize: 12 }
        }
    };
    pivotTableObj.excelExport(properties);
};
```

### Pattern 3: Multi-Table Export

```typescript
function exportAllTables() {
    let properties: ExcelExportProperties = {
        fileName: 'all-reports.xlsx',
        pivotTableIds: ['Table1', 'Table2', 'Table3'],
        multipleExport: { type: 'NewSheet' }
    };
    pivot1.excelExport(properties, true);
}
```

## Troubleshooting

### Export Button Not Working

**Problem:** Clicking export does nothing
- Verify `allowExcelExport` is set to `true`
- Confirm `ExcelExport` module is injected
- Check for JavaScript errors in console
- Ensure pivot table has data to export

### File Not Downloading

**Problem:** Export runs but file doesn't download
- Check browser download settings
- Verify browser allows downloads
- Check if popup blockers are interfering
- Try different browser

### Formatting Lost in Export

**Problem:** Formatting doesn't appear in exported file
- Use `beforeExport` event to apply formatting
- Check browser console for errors
- Verify theme settings are applied
- Use `excelQueryCellInfo` for conditional styling

## Best Practices

1. **Include meaningful headers** - Add context to exported files
2. **Use custom filenames** - Include date/context in filename
3. **Style headers prominently** - Make headers visually distinct
4. **Apply color coding** - Use conditional formatting for values
5. **Include footers** - Add generation date, author, version
6. **Test export output** - Verify in Excel what users will see
7. **Show loading indicator** - Provide feedback during long exports
8. **Handle errors gracefully** - Catch and display export errors


