# Excel and PDF Export in Syncfusion Angular Gantt Chart

## Table of Contents
- [Excel export setup](#excel-export-setup)
- [Triggering Excel export](#triggering-excel-export)
- [Excel export options](#excel-export-options)
- [CSV export](#csv-export)
- [PDF export setup](#pdf-export-setup)
- [Triggering PDF export](#triggering-pdf-export)
- [PDF export options](#pdf-export-options)
- [PDF header and footer](#pdf-header-and-footer)
- [Single-page PDF export](#single-page-pdf-export)
- [Export blob object](#export-blob-object)
- [Multiple Gantt export to one PDF](#multiple-gantt-export-to-one-pdf)
- [Export events](#export-events)

---

## Excel export setup

Set `allowExcelExport` to `true` and inject `ExcelExportService`:

```typescript
import { GanttModule, ExcelExportService } from '@syncfusion/ej2-angular-gantt';

@Component({
  imports: [GanttModule],
  providers: [ExcelExportService],
  standalone: true,
  template: `
    <ejs-gantt #gantt
      [dataSource]="data"
      [taskFields]="taskSettings"
      [allowExcelExport]="true"
      [toolbar]="['ExcelExport', 'CsvExport']"
      (toolbarClick)="toolbarClick($event)">
    </ejs-gantt>
  `
})
export class AppComponent {
  @ViewChild('gantt') public ganttObj?: GanttComponent;

  public toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === 'gantt_excelexport') {
      this.ganttObj?.excelExport();
    }
    if (args.item.id === 'gantt_csvexport') {
      this.ganttObj?.csvExport();
    }
  }
}
```

---

## Triggering Excel export

| Method | Description |
|---|---|
| `excelExport()` | Export to `.xlsx` format |
| `excelExport(properties)` | Export with `ExcelExportProperties` options |
| `csvExport()` | Export to `.csv` format |
| `csvExport(properties)` | Export with `ExcelExportProperties` options |

---

## Excel export options

Pass an `ExcelExportProperties` object to customize the export:

```typescript
import { ExcelExportProperties } from '@syncfusion/ej2-angular-grids';

public toolbarClick(args: ClickEventArgs): void {
  if (args.item.id === 'gantt_excelexport') {
    const exportProperties: ExcelExportProperties = {
      fileName: 'ProjectPlan.xlsx',
      // Export only selected records
      dataSource: this.ganttObj?.getSelectedRecords() as object[],
      // Include hidden columns
      includeHiddenColumn: true
    };
    this.ganttObj?.excelExport(exportProperties);
  }
}
```

### ExcelExportProperties key options

| Property | Type | Description |
|---|---|---|
| `fileName` | string | Export file name (e.g., `'ProjectPlan.xlsx'`) |
| `dataSource` | object[] | Custom data source for export (overrides grid data) |
| `includeHiddenColumn` | boolean | Whether to include hidden columns |
| `columns` | ExcelColumn[] | Override column definitions for export |
| `header` | ExcelHeader | Custom header rows above the data |
| `footer` | ExcelFooter | Custom footer rows below the data |

### Show/hide columns during export

```typescript
public toolbarClick(args: ClickEventArgs): void {
  if (args.item.id === 'gantt_excelexport') {
    // Show StartDate column, hide Duration for this export
    this.ganttObj?.showColumn(['StartDate']);
    this.ganttObj?.hideColumn(['Duration']);
    this.ganttObj?.excelExport();
  }
}

public excelExportComplete(): void {
  // Restore original visibility
  this.ganttObj?.showColumn(['Duration']);
}
```

---

## CSV export

CSV export works identically to Excel export but outputs a `.csv` file:

```typescript
this.ganttObj?.csvExport();
// Or with custom data:
this.ganttObj?.csvExport({ dataSource: customData, fileName: 'tasks.csv' });
```

---

## PDF export setup

Set `allowPdfExport` to `true` and inject `PdfExportService`:

```typescript
import { GanttModule, PdfExportService } from '@syncfusion/ej2-angular-gantt';

@Component({
  imports: [GanttModule],
  providers: [PdfExportService],
  standalone: true,
  template: `
    <ejs-gantt #gantt
      [allowPdfExport]="true"
      [toolbar]="['PdfExport']"
      (toolbarClick)="toolbarClick($event)">
    </ejs-gantt>
  `
})
export class AppComponent {
  @ViewChild('gantt') public ganttObj?: GanttComponent;

  public toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === 'gantt_pdfexport') {
      this.ganttObj?.pdfExport();
    }
  }
}
```

> **Note:** PDF export supports only **auto-scheduled** tasks. Manual scheduling is not currently supported.

---

## Triggering PDF export

| Method | Description |
|---|---|
| `pdfExport()` | Export with default settings |
| `pdfExport(properties)` | Export with `PdfExportProperties` |
| `pdfExport(properties, isBlob)` | When `isBlob=true`, returns a Blob in `pdfExportComplete` |

---

## PDF export options

```typescript
import { PdfExportProperties } from '@syncfusion/ej2-angular-gantt';

public toolbarClick(args: ClickEventArgs): void {
  if (args.item.id === 'gantt_pdfexport') {
    const pdfProperties: PdfExportProperties = {
      fileName: 'GanttReport.pdf',
      pageOrientation: 'Landscape',  // 'Portrait' | 'Landscape'
      pageSize: 'A3'                  // 'A0'–'A9', 'Letter', 'Legal', 'Note'
    };
    this.ganttObj?.pdfExport(pdfProperties);
  }
}
```

### PdfExportProperties key options

| Property | Type | Description |
|---|---|---|
| `fileName` | string | PDF file name |
| `pageOrientation` | string | `'Portrait'` \| `'Landscape'` (default: Landscape) |
| `pageSize` | string | `'A0'`–`'A9'`, `'Letter'`, `'Legal'`, `'Note'` |
| `fitToWidthSettings` | FitToWidthSettings | Single-page export settings |
| `header` | PdfHeader | Header content configuration |
| `footer` | PdfFooter | Footer content configuration |
| `enableFooter` | boolean | Set `false` to disable footer |
| `theme` | string | Export theme: `'Tailwind3'`, `'Bootstrap'`, etc. |
| `ganttStyle` | object | Custom taskbar colors, connector styles |

---

## PDF header and footer

```typescript
import { PdfExportProperties } from '@syncfusion/ej2-angular-gantt';

const pdfProperties: PdfExportProperties = {
  header: {
    fromTop: 0,
    height: 130,
    contents: [
      {
        type: 'Text',
        value: 'PROJECT SCHEDULE',
        position: { x: 380, y: 0 },
        style: { textBrushColor: '#C25050', fontSize: 25 }
      },
      {
        type: 'Line',
        points: { x1: 0, y1: 4, x2: 685, y2: 4 },
        style: { penColor: '#000000', penSize: 2 }
      }
    ]
  },
  footer: {
    fromBottom: 160,
    height: 100,
    contents: [
      {
        type: 'Text',
        value: 'Confidential — Page {$current} of {$total}',
        position: { x: 250, y: 0 },
        style: { textBrushColor: '#888888', fontSize: 10 }
      }
    ]
  }
};
```

### Header/footer content types

| `type` | Required props | Description |
|---|---|---|
| `Text` | `value`, `position`, `style` | Plain text content |
| `Line` | `points`, `style` | Horizontal or diagonal line |
| `PageNumber` | `pageNumberType`, `position`, `style` | Auto page number |
| `Image` | `src` (base64), `position`, `size` | Embedded image |

---

## Single-page PDF export

Export all rows to a single PDF page using `fitToWidthSettings`:

```typescript
import { PdfExportProperties } from '@syncfusion/ej2-angular-gantt';

const pdfProperties: PdfExportProperties = {
  fitToWidthSettings: {
    isFitToWidth: true,
    chartWidth: '60%',   // Chart pane width percentage
    gridWidth: '40%'     // Grid pane width percentage
  }
};
this.ganttObj?.pdfExport(pdfProperties);
```

---

## Export blob object

Get a Blob for preview or further processing by passing `true` as the second argument:

```typescript
public toolbarClick(args: ClickEventArgs): void {
  if (args.item.id === 'gantt_pdfexport') {
    this.ganttObj?.pdfExport({}, true);  // isBlob = true
  }
}

public pdfExportComplete(args: any): void {
  if (args.blobData) {
    // Open in a new window for preview
    const url = URL.createObjectURL(args.blobData);
    window.open(url);
  }
}
```

---

## Multiple Gantt export to one PDF

Export multiple Gantt instances into a single PDF file. Each Gantt occupies a new page:

```typescript
@Component({
  template: `
    <button (click)="exportAll()">Export All</button>
    <ejs-gantt #gantt1 [allowPdfExport]="true" [dataSource]="data1" [taskFields]="taskSettings"></ejs-gantt>
    <ejs-gantt #gantt2 [allowPdfExport]="true" [dataSource]="data2" [taskFields]="taskSettings"></ejs-gantt>
  `
})
export class AppComponent {
  @ViewChild('gantt1') public gantt1?: GanttComponent;
  @ViewChild('gantt2') public gantt2?: GanttComponent;

  public exportAll(): void {
    const firstExportProps: PdfExportProperties = { multipleExport: { type: 'AppendToPage', blankRows: 2 } };
    const secondExportProps: PdfExportProperties = {};

    this.gantt1?.pdfExport(firstExportProps, true).then((pdfDoc: any) => {
      this.gantt2?.pdfExport(secondExportProps, false, pdfDoc);
    });
  }
}
```

---

## Export events

| Event | Trigger | Use case |
|---|---|---|
| `beforeExcelExport` | Before Excel export starts | Modify data or cancel |
| `excelExportComplete` | After Excel export | Restore column visibility |
| `beforePdfExport` | Before PDF export starts | Modify properties |
| `pdfExportComplete` | After PDF export | Handle blob, cleanup |
| `pdfQueryTaskbarInfo` | Per-taskbar during PDF render | Apply custom colors in PDF |

```typescript
@Component({
  template: `
    <ejs-gantt
      (beforePdfExport)="beforePdfExport($event)"
      (pdfExportComplete)="pdfExportComplete($event)"
      (pdfQueryTaskbarInfo)="pdfQueryTaskbarInfo($event)">
    </ejs-gantt>
  `
})
export class AppComponent {
  public beforePdfExport(args: any): void {
    console.log('About to export PDF');
  }

  public pdfExportComplete(args: any): void {
    console.log('PDF export done');
  }

  public pdfQueryTaskbarInfo(args: any): void {
    // Customize taskbar colors in the exported PDF
    if ((args.data.taskData as any).Priority === 'High') {
      args.taskbarBgColor = new PdfColor(231, 76, 60);
    }
  }
}
```
