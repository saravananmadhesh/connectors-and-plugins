# Toolbar in Pivot View

## Overview

The toolbar in the Pivot View component provides easy access to commonly used features such as switching between pivot table and chart, changing chart types, applying conditional formatting, exporting data, and managing reports. The toolbar streamlines user interactions and enhances productivity at runtime.

**Key Features:**
- Built-in toolbar items for common operations
- Report management (Save, Load, Delete, Rename)
- View switching (Grid, Chart)
- Export capabilities (Excel, CSV, PDF)
- Formatting options (Conditional, Number)
- Field list access
- MDX query display (OLAP only)

## Enabling Toolbar

To enable the toolbar, set the `showToolbar` property to `true` and inject the `Toolbar` module. Configure the `toolbar` property with an array of built-in toolbar items:

```typescript
import { PivotView, IDataSet, Toolbar, FieldList, ConditionalFormatting, NumberFormatting } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

PivotView.Inject(Toolbar, FieldList, ConditionalFormatting, NumberFormatting);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filters: []
    },
    height: 350,
    showToolbar: true,
    toolbar: [
        'New', 'Save', 'SaveAs', 'Rename', 'Delete', 'Load',
        'Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal',
        'ConditionalFormatting', 'NumberFormatting', 'FieldList'
    ]
});
pivotTableObj.appendTo('#PivotTable');
```

## Built-in Toolbar Items

### Report Management Items

| Item | Description | Action |
|------|-------------|--------|
| New | Creates a new report | Clears current configuration and creates blank report |
| Save | Saves the current report | Persists current report configuration |
| SaveAs | Saves with a new name | Creates a copy with different name |
| Rename | Changes report name | Renames the current report |
| Delete | Removes current report | Deletes selected report from storage |
| Load | Opens saved report | Displays report list to load |

### View Items

| Item | Description | Action |
|------|-------------|--------|
| Grid | Displays pivot table | Switches to table view |
| Chart | Shows pivot chart | Switches to chart view with type options |

### Export Items

| Item | Description | Options |
|------|-------------|---------|
| Export | Export data | Excel, CSV, PDF for table; PDF, PNG for chart |

### Data Display Items

| Item | Description | Action |
|------|-------------|--------|
| SubTotal | Toggle subtotals | Shows/hides row and column subtotals |
| GrandTotal | Toggle grand totals | Shows/hides grand totals |

### Formatting Items

| Item | Description | Action |
|------|-------------|--------|
| ConditionalFormatting | Apply conditional formatting | Opens formatting dialog |
| NumberFormatting | Apply number formatting | Opens number format dialog |

### Configuration Items

| Item | Description | Action |
|------|-------------|--------|
| FieldList | Open field list | Displays field list popup |
| MDX | Display MDX query | Shows MDX query (OLAP only) |

## Report Management Events

Implement report management by handling these events:

### Save Report Event

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }],
        rows: [{ name: 'Country' }]
    },
    showToolbar: true,
    toolbar: ['Save', 'SaveAs', 'Load'],
    saveReport: function (args: SaveReportArgs): void {
        let reports: SaveReportArgs[] = [];
        let isSaved: boolean = false;
        
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reports = JSON.parse(localStorage.pivotviewReports);
        }
        
        if (args.report && args.reportName && args.reportName !== '') {
            reports.map(function (item: any): any {
                if (args.reportName === item.reportName) {
                    item.report = args.report;
                    isSaved = true;
                }
            });
            
            if (!isSaved) {
                reports.push(args);
            }
            
            localStorage.pivotviewReports = JSON.stringify(reports);
        }
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Load Report Event

```typescript
loadReport: function (args: LoadReportArgs): void {
    let reportCollection: string[] = [];
    
    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
        reportCollection = JSON.parse(localStorage.pivotviewReports);
    }
    
    reportCollection.map(function (item: any): void {
        if (args.reportName === item.reportName) {
            args.report = item.report;
        }
    });
    
    if (args.report) {
        pivotTableObj.dataSourceSettings = JSON.parse(args.report).dataSourceSettings;
    }
}
```

### Fetch Report Event

```typescript
fetchReport: function (args: FetchReportArgs): void {
    let reportCollection: string[] = [];
    let reportList: string[] = [];
    
    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
        reportCollection = JSON.parse(localStorage.pivotviewReports);
    }
    
    reportCollection.map(function (item: any): void {
        reportList.push(item.reportName);
    });
    
    args.reportName = reportList;
}
```

### Remove Report Event

```typescript
removeReport: function (args: RemoveReportArgs): void {
    let reportCollection: any[] = [];
    
    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
        reportCollection = JSON.parse(localStorage.pivotviewReports);
    }
    
    for (let i: number = 0; i < reportCollection.length; i++) {
        if (reportCollection[i].reportName === args.reportName) {
            reportCollection.splice(i, 1);
        }
    }
    
    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
        localStorage.pivotviewReports = JSON.stringify(reportCollection);
    }
}
```

### Rename Report Event

```typescript
renameReport: function (args: RenameReportArgs): void {
    let reportCollection: string[] = [];
    
    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
        reportCollection = JSON.parse(localStorage.pivotviewReports);
    }
    
    reportCollection.map(function (item: any): any {
        if (args.reportName === item.reportName) {
            item.reportName = args.rename;
        }
    });
    
    if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
        localStorage.pivotviewReports = JSON.stringify(reportCollection);
    }
}
```

## Common Patterns

### Pattern 1: Complete Report Management System

```typescript
// Full report management with all events
import { PivotView, Toolbar, SaveReportArgs, LoadReportArgs, FetchReportArgs, RemoveReportArgs, RenameReportArgs } from '@syncfusion/ej2-pivotview';

PivotView.Inject(Toolbar);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Country' }]
    },
    showToolbar: true,
    toolbar: ['New', 'Save', 'SaveAs', 'Rename', 'Delete', 'Load'],
    saveReport: handleSaveReport,
    loadReport: handleLoadReport,
    fetchReport: handleFetchReport,
    removeReport: handleRemoveReport,
    renameReport: handleRenameReport,
    height: 400
});
pivotTableObj.appendTo('#PivotTable');
```

### Pattern 2: View Switching Toolbar

```typescript
// Simple toolbar for view switching and export
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }],
        rows: [{ name: 'Country' }]
    },
    showToolbar: true,
    toolbar: ['Grid', 'Chart', 'Export'],
    displayOption: { view: 'Both', primary: 'Table' },
    chartSettings: { chartSeries: { type: 'Column' } },
    allowExcelExport: true,
    allowPdfExport: true,
    height: 400
});
```

### Pattern 3: Formatting-Focused Toolbar

```typescript
// Toolbar with formatting options
import { PivotView, Toolbar, ConditionalFormatting, NumberFormatting } from '@syncfusion/ej2-pivotview';

PivotView.Inject(Toolbar, ConditionalFormatting, NumberFormatting);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Country' }]
    },
    showToolbar: true,
    toolbar: ['ConditionalFormatting', 'NumberFormatting', 'SubTotal', 'GrandTotal'],
    allowConditionalFormatting: true,
    allowNumberFormatting: true,
    height: 400
});
```

### Pattern 4: Custom Toolbar Order

```typescript
// Reorder toolbar items for specific workflow
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }],
        rows: [{ name: 'Country' }]
    },
    showToolbar: true,
    toolbar: [
        'FieldList',          // Field list first
        'Grid', 'Chart',      // View options
        'Export',             // Export
        'ConditionalFormatting', 'NumberFormatting', // Formatting
        'Load', 'Save'        // Report management last
    ],
    height: 400
});
```

## Troubleshooting

### Toolbar Not Visible

**Issue:** Toolbar doesn't appear in pivot table.

**Solution:**
- Set `showToolbar: true`
- Inject Toolbar module: `PivotView.Inject(Toolbar)`
- Configure `toolbar` array with desired items
- Check that pivot table has sufficient height

### Report Save Not Working

**Issue:** Reports don't persist after saving.

**Solution:**
- Implement `saveReport` event handler
- Use localStorage or server-side storage
- Verify event handler is properly attached
- Check browser console for errors

### Export Options Not Appearing

**Issue:** Export toolbar item doesn't show options.

**Solution:**
- Set `allowExcelExport: true` for Excel/CSV export
- Set `allowPdfExport: true` for PDF export
- Inject ExcelExport module for Excel/CSV
- Inject PDFExport module for PDF

### Conditional Formatting Button Disabled

**Issue:** Conditional formatting toolbar item is grayed out.

**Solution:**
- Set `allowConditionalFormatting: true`
- Inject ConditionalFormatting module
- Ensure value fields exist in pivot table
- Check that dataSourceSettings is properly configured

### MDX Toolbar Item Not Showing

**Issue:** MDX toolbar option doesn't appear.

**Solution:**
- MDX option only works with OLAP data sources
- Verify data source type is SSAS/OLAP
- Check that OLAP connection is active
- MDX is not applicable for relational data sources
