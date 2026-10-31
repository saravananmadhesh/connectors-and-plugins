# Excel Export in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Basic Setup](#basic-setup)
- [Custom Data Source](#custom-data-source)
- [File Name](#file-name)
- [Export Hidden Columns](#export-hidden-columns)
- [Show or Hide Columns on Export](#show-or-hide-columns-on-export)
- [Cell Formatting on Export](#cell-formatting-on-export)
- [Theme](#theme)
- [Header and Footer](#header-and-footer)
- [Multiple Gantt Export](#multiple-gantt-export)
- [Export to Blob](#export-to-blob)
- [Export Events](#export-events)
- [Methods](#methods)

---

## Overview

Gantt supports client-side export to Excel (.xlsx) and CSV formats. Requires the `ExcelExport` module.

## Basic Setup

```typescript
import { Gantt, Toolbar, ExcelExport, Selection } from '@syncfusion/ej2-gantt';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

Gantt.Inject(Toolbar, ExcelExport, Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    allowExcelExport: true,
    toolbar: ['ExcelExport', 'CsvExport'],
    taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        progress: 'Progress',
        parentID: 'ParentID'
    },
    toolbarClick: function(args: ClickEventArgs) {
        if (args.item.id === 'Gantt_excelexport') {
            gantt.excelExport();
        } else if (args.item.id === 'Gantt_csvexport') {
            gantt.csvExport();
        }
    }
});
gantt.appendTo('#Gantt');
```

> **Toolbar item IDs**: `'{ganttId}_excelexport'` and `'{ganttId}_csvexport'` where `{ganttId}` is the element ID (e.g., `'Gantt_excelexport'` for `#Gantt`).

---

## Custom Data Source

Override the data source dynamically at export time via `dataSource` in `ExcelExportProperties`:

```typescript
import { ExcelExportProperties } from '@syncfusion/ej2-grids';

gantt.toolbarClick = function(args: any) {
    if (args.item.id === 'Gantt_excelexport') {
        let exportProperties: ExcelExportProperties = {
            dataSource: [GanttData[4]]   // export only a specific subset
        };
        gantt.excelExport(exportProperties);
    }
};
```

---

## File Name

Set a custom file name for the exported Excel or CSV document:

```typescript
import { ExcelExportProperties } from '@syncfusion/ej2-grids';

gantt.toolbarClick = function(args: any) {
    if (args.item.id === 'Gantt_excelexport') {
        gantt.excelExport({ fileName: 'ProjectPlan.xlsx' } as ExcelExportProperties);
    } else if (args.item.id === 'Gantt_csvexport') {
        gantt.csvExport({ fileName: 'ProjectPlan.csv' } as ExcelExportProperties);
    }
};
```

---

## Export Hidden Columns

Include columns that are hidden in the Gantt UI in the exported file:

```typescript
gantt.toolbarClick = function(args: any) {
    let exportProperties: ExcelExportProperties = { includeHiddenColumn: true };
    if (args.item.id === 'Gantt_excelexport') {
        gantt.excelExport(exportProperties);
    } else if (args.item.id === 'Gantt_csvexport') {
        gantt.csvExport(exportProperties);
    }
};
```

---

## Show or Hide Columns on Export

Toggle column visibility specifically for the exported file using `toolbarClick` and restore with `excelExportComplete`:

```typescript
let gantt: Gantt = new Gantt({
    columns: [
        { field: 'TaskID', visible: false },   // hidden in UI
        { field: 'TaskName' },
        { field: 'StartDate' },
        { field: 'Duration' },
        { field: 'Progress' }
    ],
    toolbarClick: function(args: any) {
        let columns = gantt.treeGrid.grid.columns;
        if (args.item.id === 'Gantt_excelexport') {
            columns[0].visible = true;    // show TaskID in export
            columns[3].visible = false;   // hide Duration in export
            gantt.excelExport();
        } else if (args.item.id === 'Gantt_csvexport') {
            columns[0].visible = true;
            columns[3].visible = false;
            gantt.csvExport();
        }
    },
    excelExportComplete: function(args: any) {
        // Restore original column visibility after export
        let columns = gantt.treeGrid.grid.columns;
        columns[0].visible = false;
        columns[3].visible = true;
    }
});
```

---

## Cell Formatting on Export

Use `excelQueryCellInfo` to conditionally format grid cells in the exported Excel/CSV:

```typescript
let gantt: Gantt = new Gantt({
    allowExcelExport: true,
    excelQueryCellInfo: function(args: any) {
        if (args.column.field === 'Progress') {
            if (args.value > 80) {
                args.style = { backColor: '#A569BD' };   // purple for high progress
            } else if (args.value < 20) {
                args.style = { backColor: '#F08080' };   // light red for low progress
            }
        }
    }
});
```

> `args.style.backColor` accepts CSS hex color strings. Use alongside `queryCellInfo` and `queryTaskbarInfo` to keep UI and export colors in sync.

---

## Theme

Apply a custom font theme to the exported Excel document:

```typescript
import { ExcelExportProperties } from '@syncfusion/ej2-grids';

let exportProperties: ExcelExportProperties = {
    theme: {
        header: { fontName: 'Segoe UI', fontColor: '#666666' },
        record: { fontName: 'Segoe UI', fontColor: '#666666' }
    }
};
gantt.excelExport(exportProperties);
```

> By default, the **tailwind3** theme is applied to exported Excel documents.

---

## Header and Footer

Add header rows (with text, hyperlinks, and styles) and footer rows to the exported Excel:

```typescript
import { ExcelExportProperties } from '@syncfusion/ej2-grids';

let exportProperties: ExcelExportProperties = {
    header: {
        headerRows: 7,
        rows: [
            {
                cells: [{
                    colSpan: 4, value: 'Northwind Traders',
                    style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true }
                }]
            },
            {
                cells: [{
                    colSpan: 4, value: '2501 Aerial Center Parkway',
                    style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true }
                }]
            },
            {
                cells: [{
                    colSpan: 4,
                    hyperlink: { target: '/api/GanttData', displayText: 'GanttData' },
                    style: { hAlign: 'Center' }
                }]
            },
            {
                cells: [{
                    colSpan: 4,
                    hyperlink: { target: 'mailto:support@northwind.com' },
                    style: { hAlign: 'Center' }
                }]
            }
        ]
    },
    footer: {
        footerRows: 4,
        rows: [
            { cells: [{ colSpan: 4, value: 'Thank you for your business!', style: { hAlign: 'Center', bold: true } }] },
            { cells: [{ colSpan: 4, value: '!Visit Again!', style: { hAlign: 'Center', bold: true } }] }
        ]
    }
};
gantt.excelExport(exportProperties);
```

---

## Multiple Gantt Export

Export multiple Gantt instances into a single Excel file — either on the **same sheet** or on **separate sheets**.

### Same Sheet (`AppendToSheet`)

```typescript
import { ExcelExportProperties } from '@syncfusion/ej2-grids';

firstGantt.toolbarClick = function(args: any) {
    if (args.item.id === 'GanttExport1_excelexport') {
        let exportProperties: ExcelExportProperties = {
            multipleExport: {
                type: 'AppendToSheet',
                blankRows: 2        // blank rows between each Gantt (default: 5)
            }
        };
        // 2nd arg = isMultipleExport (true = do not download yet, return workbook)
        let firstExport: Promise<any> = firstGantt.excelExport(exportProperties, true);
        firstExport.then(function(workbook: any) {
            secondGantt.excelExport(exportProperties, false, workbook);
        });
    }
};
```

### New Sheet (`NewSheet`)

```typescript
let exportProperties: ExcelExportProperties = {
    multipleExport: { type: 'NewSheet' }
};
let firstExport: Promise<any> = firstGantt.excelExport(exportProperties, true);
firstExport.then(function(workbook: any) {
    secondGantt.excelExport(exportProperties, false, workbook);
});
```

---

## Export to Blob

Export as a blob for custom download handling or previewing before saving:

```typescript
let gantt: Gantt = new Gantt({
    allowExcelExport: true,
    allowPdfExport: true,
    excelExportComplete: function(args: any) {
        args.promise.then((e: { blobData: Blob }) => {
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(e.blobData);
            a.download = 'GanttExport.xlsx';
            a.click();
            window.URL.revokeObjectURL(a.href);
        });
    },
    toolbarClick: function(args: any) {
        if (args.item.id === 'Gantt_excelexport') {
            gantt.excelExport(null, null, null, true);  // 4th arg = return as blob
        }
    }
});
```

---

## Export Events

### beforeExcelExport

Fires before export begins. Can be cancelled.

```typescript
let gantt: Gantt = new Gantt({
    beforeExcelExport: function(args: any) {
        if (args.isCsv) {
            console.log('Exporting to CSV');
        } else {
            console.log('Exporting to Excel');
        }
        // args.cancel = true to abort export
    }
});
```

### excelExportComplete

Fires after export completes.

```typescript
let gantt: Gantt = new Gantt({
    excelExportComplete: function(args: any) {
        console.log('Excel export complete');
    }
});
```

---

## Methods

| Method | Description |
|--------|-------------|
| `gantt.excelExport(props?, isMultipleExport?, workbook?, isBlob?)` | Export to Excel |
| `gantt.csvExport(props?, isMultipleExport?, workbook?, isBlob?)` | Export to CSV |

## ExcelExportProperties

| Property | Type | Description |
|----------|------|-------------|
| `fileName` | string | Custom output file name |
| `dataSource` | object[] | Override data source for the export |
| `includeHiddenColumn` | boolean | Include hidden columns in export |
| `exportType` | string | `'AllPages'` (default) \| `'CurrentViewData'` |
| `theme.header` | object | Font name and color for header row |
| `theme.record` | object | Font name and color for data rows |
| `header.headerRows` | number | Number of header rows to reserve |
| `header.rows` | array | Array of row objects with `cells[]` |
| `footer.footerRows` | number | Number of footer rows to reserve |
| `footer.rows` | array | Array of row objects with `cells[]` |
| `multipleExport.type` | string | `'AppendToSheet'` \| `'NewSheet'` |
| `multipleExport.blankRows` | number | Blank rows between Gantt exports in `AppendToSheet` mode (default: 5) |
