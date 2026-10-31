# PDF Export in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Basic Setup](#basic-setup)
- [Export with Properties](#export-with-properties)
- [File Name, Page Orientation, Page Size](#file-name-page-orientation-page-size)
- [Export Current View Data](#export-current-view-data)
- [Export Hidden Columns](#export-hidden-columns)
- [Export Predecessor Lines](#export-predecessor-lines)
- [Show or Hide Columns on Export](#show-or-hide-columns-on-export)
- [Export to Blob](#export-to-blob)
- [Multiple Gantt Export (Single PDF)](#multiple-gantt-export-single-pdf)
- [Indicators in PDF Export](#indicators-in-pdf-export)
- [Header and Footer](#header-and-footer)
- [Export Events](#export-events)
- [Methods and PdfExportProperties](#methods-and-pdfexportproperties)
- [Conditional Cell Formatting](#conditional-cell-formatting)
- [Timeline Cell Formatting](#timeline-cell-formatting)
- [Taskbar Formatting](#taskbar-formatting)
- [Split Taskbar Segment Colors](#split-taskbar-segment-colors)
- [Customize Gantt Appearance with ganttStyle](#customize-gantt-appearance-with-ganttstyle)
- [Export with Column Template](#export-with-column-template)
- [Export with Taskbar Template](#export-with-taskbar-template)
- [Export with Task Label Template](#export-with-task-label-template)
- [Export with Header Template](#export-with-header-template)

---

## Overview

Gantt supports exporting the chart and grid to a PDF document. Requires the `PdfExport` module.

## Basic Setup

```typescript
import { Gantt, Toolbar, PdfExport, Selection } from '@syncfusion/ej2-gantt';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

Gantt.Inject(Toolbar, PdfExport, Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    allowPdfExport: true,
    toolbar: ['PdfExport'],
    taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        progress: 'Progress',
        parentID: 'ParentID'
    },
    toolbarClick: function(args: ClickEventArgs) {
        if (args.item.id === 'Gantt_pdfexport') {
            gantt.pdfExport();
        }
    }
});
gantt.appendTo('#Gantt');
```

> **Toolbar item ID**: `'{ganttId}_pdfexport'` (e.g., `'Gantt_pdfexport'` for `#Gantt`).

---

## Export with Properties

Use `PdfExportProperties` to customize the exported PDF:

```typescript
import { PdfExportProperties } from '@syncfusion/ej2-gantt';

// Apply a theme
gantt.pdfExport({
    theme: 'Fabric'   // 'Material' | 'Fabric' | 'Bootstrap' | 'Bootstrap 4'
});

// Fit all rows to page width
gantt.pdfExport({
    fitToWidthSettings: {
        isFitToWidth: true,
        chartWidth: '60%',    // percentage of page width for chart pane
        gridWidth: '40%'      // percentage of page width for grid pane
    }
});
```

---

## Export to Blob

```typescript
let gantt: Gantt = new Gantt({
    allowPdfExport: true,
    pdfExportComplete: function(args: any) {
        args.promise.then((e: { blobData: Blob }) => {
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(e.blobData);
            a.download = 'GanttChart.pdf';
            a.click();
            window.URL.revokeObjectURL(a.href);
        });
    },
    toolbarClick: function(args: any) {
        if (args.item.id === 'Gantt_pdfexport') {
            gantt.pdfExport(null, null, null, true);   // 4th arg = return as blob
        }
    }
});
```

---

## Multiple Gantt Export (Single PDF)

Export multiple Gantt instances into a single PDF file — each Gantt goes on a new page:

```typescript
let firstGantt: Gantt = new Gantt({ /* ... */ allowPdfExport: true, toolbar: ['PdfExport'] });
firstGantt.appendTo('#Gantt1');

let secondGantt: Gantt = new Gantt({ /* ... */ allowPdfExport: true });
secondGantt.appendTo('#Gantt2');

firstGantt.toolbarClick = function(args: any) {
    if (args.item.id === 'Gantt1_pdfexport') {
        // 2nd arg = isMultipleExport (true = don't download yet)
        let firstPdfExport: Promise<object> = firstGantt.pdfExport({}, true);
        firstPdfExport.then(function(pdfData: object) {
            // Pass accumulated pdfData to second Gantt
            secondGantt.pdfExport({}, false, pdfData);
        });
    }
};
```

---

## Indicators in PDF Export

Indicators with base64 images are supported in PDF export. Map the `base64` field through `taskFields.indicators`:

```typescript
// Data item format
{ TaskID: 1, Indicators: [{ date: new Date(), iconClass: 'e-warning', name: 'Alert', base64: 'data:image/png;base64,...' }] }

// taskFields mapping
taskFields: {
    id: 'TaskID',
    indicators: 'Indicators'
}
```

---

## File Name, Page Orientation, Page Size

```typescript
let exportProperties: PdfExportProperties = {
    fileName: 'ProjectPlan.pdf',        // custom file name
    pageOrientation: 'Portrait',        // 'Landscape' (default) | 'Portrait'
    pageSize: 'A3'                      // 'Letter' | 'A0'–'A9' | 'B0'–'B5' | 'Legal' | 'Ledger' | etc.
};
gantt.pdfExport(exportProperties);
```

---

## Export Current View Data

Export only the currently visible (filtered) rows instead of all data:

```typescript
let exportProperties: PdfExportProperties = {
    exportType: 'CurrentViewData'   // 'AllPages' (default) | 'CurrentViewData'
};
gantt.pdfExport(exportProperties);
```

Requires `Filter` module injected and `allowFiltering: true`.

---

## Export Hidden Columns

Include columns that are hidden in the Gantt UI in the exported PDF:

```typescript
let exportProperties: PdfExportProperties = {
    includeHiddenColumn: true
};
gantt.pdfExport(exportProperties);
```

---

## Export Predecessor Lines

Control visibility of dependency lines in the exported PDF:

```typescript
let exportProperties: PdfExportProperties = {
    showPredecessorLines: true   // true = show | false = hide
};
gantt.pdfExport(exportProperties);
```

---

## Show or Hide Columns on Export

Toggle column visibility specifically for the exported PDF using `beforePdfExport`:

```typescript
let gantt: Gantt = new Gantt({
    columns: [
        { field: 'TaskID' },
        { field: 'TaskName' },
        { field: 'StartDate' },
        { field: 'Duration', visible: false },   // hidden in UI
        { field: 'Progress' }
    ],
    beforePdfExport: function(args: any) {
        // Hide StartDate (index 2), show Duration (index 3) in exported PDF
        (gantt.treeGrid.columns[2] as any).visible = false;
        (gantt.treeGrid.columns[3] as any).visible = true;
    },
    toolbarClick: function(args: any) {
        if (args.item.id === 'Gantt_pdfexport') {
            gantt.pdfExport();
        }
    }
});
```

> Columns are reset after export completes. Use `pdfExportComplete` to restore if needed.

---

## Header and Footer

Customize header and footer using `pdfExportProperties.header` / `.footer`:

```typescript
let exportProperties: PdfExportProperties = {
    header: {
        fromTop: 0,
        height: 150,
        contents: [
            {
                type: 'Text',
                value: 'Project Report',
                position: { x: 380, y: 0 },
                style: { textBrushColor: '#C25050', fontSize: 25 }
            },
            {
                type: 'Image',
                src: base64ImageString,        // Base64-encoded image
                position: { x: 40, y: 10 },
                size: { height: 100, width: 250 }
            },
            {
                type: 'Line',
                style: { penColor: '#000080', penSize: 2, dashStyle: 'Solid' },
                points: { x1: 0, y1: 4, x2: 685, y2: 4 }
            }
        ]
    },
    footer: {
        fromBottom: 160,
        height: 100,
        contents: [
            {
                type: 'PageNumber',
                pageNumberType: 'Arabic',
                format: 'Page {$current} of {$total}',
                position: { x: 0, y: 25 },
                style: { textBrushColor: '#000000', hAlign: 'Center', vAlign: 'Bottom' }
            },
            {
                type: 'Text',
                value: 'Confidential',
                position: { x: 350, y: 40 },
                style: { textBrushColor: '#C67878', fontSize: 14 }
            }
        ]
    },
    enableFooter: false   // set true (default) to include built-in Syncfusion footer
};
gantt.pdfExport(exportProperties);
```

**Content types:** `'Text'` | `'Image'` | `'Line'` | `'PageNumber'`

**pageNumberType values:** `'Arabic'` | `'LowerLatin'` | `'UpperLatin'` | `'LowerRoman'` | `'UpperRoman'`

**Line dashStyle values:** `'Solid'` | `'Dash'` | `'Dot'` | `'DashDot'` | `'DashDotDot'`

---

## Export Events

### beforePdfExport

```typescript
let gantt: Gantt = new Gantt({
    beforePdfExport: function(args: any) {
        console.log('About to export PDF');
        // args.cancel = true to abort
    }
});
```

### pdfExportComplete

```typescript
let gantt: Gantt = new Gantt({
    pdfExportComplete: function(args: any) {
        console.log('PDF export complete');
    }
});
```

---

## Methods and PdfExportProperties

| Method | Description |
|--------|-------------|
| `gantt.pdfExport(props?, isMultiple?, pdfDoc?, isBlob?)` | Export to PDF |

| PdfExportProperties | Type | Description |
|---------------------|------|-------------|
| `fileName` | string | Custom output file name |
| `theme` | string | `'Material'` \| `'Fabric'` \| `'Bootstrap'` \| `'Bootstrap 4'` |
| `pageOrientation` | string | `'Landscape'` (default) \| `'Portrait'` |
| `pageSize` | string | `'A0'`–`'A9'`, `'B0'`–`'B5'`, `'Letter'`, `'Legal'`, `'Ledger'`, etc. |
| `exportType` | string | `'AllPages'` (default) \| `'CurrentViewData'` |
| `includeHiddenColumn` | boolean | Include hidden columns in export |
| `showPredecessorLines` | boolean | Show dependency lines in exported PDF |
| `enableFooter` | boolean | Include built-in Syncfusion footer (default: `true`) |
| `fitToWidthSettings.isFitToWidth` | boolean | Auto-fit all rows to page width |
| `fitToWidthSettings.chartWidth` | string | Chart pane width as percentage (e.g., `'60%'`) |
| `fitToWidthSettings.gridWidth` | string | Grid pane width as percentage (e.g., `'40%'`) |
| `ganttStyle` | object | Full appearance override — see [Customize Gantt Appearance with ganttStyle](#customize-gantt-appearance-with-ganttstyle) |

---

## Conditional Cell Formatting

Use `pdfQueryCellInfo` to format grid cells in the exported PDF based on cell value:

```typescript
import { PdfColor } from '@syncfusion/ej2-pdf-export';

let gantt: Gantt = new Gantt({
    allowPdfExport: true,
    pdfQueryCellInfo: function(args: any) {
        if (args.column.field === 'Progress') {
            if (args.value < 50) {
                args.style.backgroundColor = new PdfColor(240, 128, 128);  // light red
            } else {
                args.style.backgroundColor = new PdfColor(165, 105, 189);  // purple
            }
        }
    }
});
```

---

## Timeline Cell Formatting

Use `pdfQueryTimelineCellInfo` to customize timeline header cells in the exported PDF:

```typescript
import { PdfColor } from '@syncfusion/ej2-pdf-export';

let gantt: Gantt = new Gantt({
    allowPdfExport: true,
    pdfQueryTimelineCellInfo: function(args: any) {
        args.timelineCell.backgroundColor = new PdfColor(240, 248, 255);  // Alice Blue
    }
});
```

---

## Taskbar Formatting

Use `pdfQueryTaskbarInfo` to customize taskbar colors in the exported PDF:

```typescript
import { PdfColor } from '@syncfusion/ej2-pdf-export';

let gantt: Gantt = new Gantt({
    allowPdfExport: true,
    pdfQueryTaskbarInfo: function(args: any) {
        if (args.data.Progress < 50 && !args.data.hasChildRecords) {
            args.taskbar.progressColor = new PdfColor(205, 92, 92);
            args.taskbar.taskColor = new PdfColor(240, 128, 128);
            args.taskbar.taskBorderColor = new PdfColor(240, 128, 128);
        }
    }
});
```

---

## Split Taskbar Segment Colors

Customize individual segment colors of a split taskbar via `taskSegmentStyles` in `pdfQueryTaskbarInfo`:

```typescript
import { PdfColor } from '@syncfusion/ej2-pdf-export';

let gantt: Gantt = new Gantt({
    allowPdfExport: true,
    taskFields: {
        segments: 'Segments'
    },
    pdfQueryTaskbarInfo: function(args: any) {
        if (args.taskbar.taskSegmentStyles) {
            args.taskbar.taskSegmentStyles[1].taskColor = new PdfColor(255, 0, 0);
            args.taskbar.taskSegmentStyles[1].progressColor = new PdfColor(0, 128, 0);
            args.taskbar.taskSegmentStyles[1].taskBorderColor = new PdfColor(0, 0, 0);
        }
    }
});
```

---

## Customize Gantt Appearance with ganttStyle

Use `ganttStyle` inside `PdfExportProperties` to override the full visual appearance of the exported PDF:

```typescript
import { PdfColor, PdfFontStyle, PdfPen } from '@syncfusion/ej2-pdf-export';

let exportProperties: PdfExportProperties = {
    ganttStyle: {
        fontFamily: 1,                                            // 0=Helvetica, 1=Courier, 2=TimesRoman, 3=Symbol
        columnHeader: {
            backgroundColor: new PdfColor(179, 219, 255)
        },
        cell: {
            backgroundColor: new PdfColor(240, 248, 255),
            fontColor: new PdfColor(0, 0, 0),
            borderColor: new PdfColor(179, 219, 255)
        },
        taskbar: {
            taskColor: new PdfColor(240, 128, 128),
            taskBorderColor: new PdfColor(240, 128, 128),
            progressColor: new PdfColor(205, 92, 92)
        },
        timeline: {
            backgroundColor: new PdfColor(179, 219, 255),
            fontStyle: 1                                          // PdfFontStyle.Bold
        },
        label: {
            fontColor: new PdfColor(128, 0, 0)
        },
        connectorLineColor: new PdfColor(128, 0, 0),
        footer: {
            backgroundColor: new PdfColor(205, 92, 92)
        },
        eventMarker: {
            label: {
                backgroundColor: new PdfColor(255, 239, 213),
                fontColor: new PdfColor(139, 69, 19),
                fontSize: 9,
                fontStyle: PdfFontStyle.Bold,
                borderColor: new PdfColor(160, 82, 45)
            },
            lineStyle: new PdfPen(new PdfColor(105, 105, 105), 1)
        },
        holiday: {
            fontSize: 10,
            fontStyle: PdfFontStyle.Bold,
            backgroundColor: new PdfColor(255, 248, 220),
            fontColor: new PdfColor(105, 105, 105),
            borderColor: new PdfColor(211, 211, 211)
        }
    }
};
gantt.pdfExport(exportProperties);
```

**Customizable elements:** `columnHeader`, `fontFamily`, `cell`, `taskbar`, `label`, `timeline`, `chartGridLineColor`, `connectorLineColor`, `criticalConnectorLineColor`, `footer`, `font`, `eventMarker`, `holiday`

---

## Export with Column Template

Export grid columns containing images or hyperlinks using `pdfQueryCellInfo`:

```typescript
import { PdfQueryCellInfoEventArgs } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    columns: [
        { field: 'TaskName', width: 250 },
        { field: 'Resources', width: 175, template: '#resColumnTemplate' },
        { field: 'EmailID', template: '#emailTemplate', width: 180 }
    ],
    pdfQueryCellInfo: function(args: PdfQueryCellInfoEventArgs) {
        if (args.column.headerText === 'Resources') {
            args.image = {
                height: 40, width: 40,
                base64: (args as any).data.taskData.ResourcesImage
            };
        }
        if (args.column.headerText === 'Email ID') {
            args.hyperLink = {
                target: 'mailto:' + (args as any).data.taskData.EmailID,
                displayText: (args as any).data.taskData.EmailID
            };
        }
    }
});
```

> PDF Export only supports **base64** strings for images — not URL references.

---

## Export with Taskbar Template

Export custom taskbar templates (including images and text) using `pdfQueryTaskbarInfo`:

```typescript
let gantt: Gantt = new Gantt({
    taskbarTemplate: '#TaskbarTemplate',
    parentTaskbarTemplate: '#ParentTaskbarTemplate',
    milestoneTemplate: '#MilestoneTemplate',
    pdfQueryTaskbarInfo: function(args: any) {
        if (!args.data.hasChildRecords && args.data.ganttProperties.duration !== 0) {
            if (args.data.ganttProperties.resourceNames) {
                args.taskbarTemplate.image = [{
                    width: 20, height: 20,
                    base64: (args as any).data.taskData.ResourcesImage
                }];
            }
            args.taskbarTemplate.value = args.data.TaskName;
        }
        if (args.data.hasChildRecords) {
            args.taskbarTemplate.value = args.data.TaskName;
        }
        if (args.data.ganttProperties.duration === 0) {
            args.taskbarTemplate.value = args.data.TaskName;
        }
    }
});
```

---

## Export with Task Label Template

Export `labelSettings` templates via `pdfQueryTaskbarInfo`:

```typescript
let gantt: Gantt = new Gantt({
    labelSettings: {
        leftLabel: '#leftLabel',
        rightLabel: '#rightLabel',
        taskLabel: '${Progress}%'
    },
    pdfQueryTaskbarInfo: function(args: any) {
        args.labelSettings.leftLabel.value =
            args.data.ganttProperties.taskName + ' [' + args.data.ganttProperties.progress + ']';
        if (args.data.ganttProperties.resourceNames) {
            args.labelSettings.rightLabel.value = args.data.ganttProperties.resourceNames;
            args.labelSettings.rightLabel.image = [{
                base64: (args as any).data.taskData.ResourcesImage,
                width: 20, height: 20
            }];
        }
        args.labelSettings.taskLabel.value = args.data.ganttProperties.progress + '%';
    }
});
```

---

## Export with Header Template

Export column header templates using `pdfColumnHeaderQueryCellInfo`:

```typescript
import { PdfColumnHeaderQueryCellInfoEventArgs } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    columns: [
        { field: 'TaskName', headerTemplate: '#projectName', width: 250 },
        { field: 'StartDate', headerTemplate: '#dateTemplate' }
    ],
    pdfColumnHeaderQueryCellInfo: function(args: PdfColumnHeaderQueryCellInfoEventArgs) {
        const imageMap: { [key: string]: string } = {
            'TaskName': 'data:image/png;base64,...',
            'StartDate': 'data:image/png;base64,...'
        };
        const base64 = imageMap[args.column.field];
        if (base64) {
            args.headerTemplate.image = [{ base64, width: 20, height: 20 }];
            args.headerTemplate.value = args.column.field;
        }
    }
});
```
