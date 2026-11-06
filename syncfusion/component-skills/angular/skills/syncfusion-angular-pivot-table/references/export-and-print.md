# Export & Printing

## Table of Contents
- [Excel Export](#excel-export)
- [CSV Export](#csv-export)
- [PDF Export](#pdf-export)
- [Print Options](#print-options)
- [Common Scenarios](#common-scenarios)

## Excel Export

### Enable Excel Export

To enable Excel export:

1. Inject `ExcelExportService` into the Pivot Table
2. Set `allowExcelExport` to **true**
3. Call `excelExport()` method

```typescript
import { ExcelExportService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  selector: 'app-excel-export',
  providers: [ExcelExportService],
  template: `
    <button (click)="exportToExcel()">Export to Excel</button>
    <ejs-pivotview 
      #pivotGrid
      [dataSourceSettings]="dataSourceSettings"
      [allowExcelExport]="true">
    </ejs-pivotview>
  `
})
export class AppComponent {
  @ViewChild('pivotGrid') pivotGrid: PivotViewComponent;

  exportToExcel() {
    const excelExportProperties = {
      fileName: 'SalesReport.xlsx'
    };
    this.pivotGrid.excelExport(excelExportProperties);
  }

  dataSourceSettings: IDataOptions = {
    dataSource: data,
    rows: [{ name: 'Region' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
  };
}
```

### Custom File Name & Theme

```typescript
exportToExcel() {
  const excelExportProperties = {
    fileName: `Report_${new Date().toISOString().split('T')[0]}.xlsx`,
    theme: {
      header: { fontName: 'Calibri', fontSize: 14, bold: true },
      record: { fontName: 'Calibri', fontSize: 12 }
    }
  };
  this.pivotGrid.excelExport(excelExportProperties);
}
```

### Export Multiple Tables

Export to same worksheet or separate worksheets:

```typescript
// Same worksheet with separation
exportToSameSheet() {
  const excelExportProperties = {
    fileName: 'CombinedReport.xlsx',
    pivotTableIds: ['PivotGrid1', 'PivotGrid2'],
    multipleExport: {
      type: 'AppendToSheet',
      blankRows: 5
    }
  };
  this.pivotGrid1.excelExport(excelExportProperties, true);
}

// Separate worksheets
exportToDifferentSheets() {
  const excelExportProperties = {
    fileName: 'SeparateSheets.xlsx',
    pivotTableIds: ['PivotGrid1', 'PivotGrid2'],
    multipleExport: { type: 'NewSheet' }
  };
  this.pivotGrid1.excelExport(excelExportProperties, true);
}
```

### Customize Cell Styling

Use export events to style cells via the `gridSettings` object (events belong to `gridSettings` in the PivotView API):

```typescript
@Component({
  template: `<ejs-pivotview [gridSettings]="gridSettings"></ejs-pivotview>`
})
export class AppComponent implements OnInit {
  public gridSettings: any;

  ngOnInit(): void {
    this.gridSettings = {
      excelHeaderQueryCellInfo: this.onExcelHeaderCell.bind(this),
      excelQueryCellInfo: this.onExcelQueryCell.bind(this)
    };
  }

  onExcelHeaderCell(args: any) {
    args.style = {
      bold: true,
      backColor: '#2E75B6',
      fontColor: '#FFFFFF'
    };
  }

  onExcelQueryCell(args: any) {
    if (args.value > 100000) {
      args.style = { backColor: '#E2EFDA', fontColor: '#376D34' };
    }
  }
}
```

## CSV Export

Export to CSV format (supports 1M+ rows):

```typescript
import { ExcelExportService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  providers: [ExcelExportService],
  template: `
    <button (click)="exportToCSV()">Export to CSV</button>
    <ejs-pivotview 
      #pivotGrid
      [allowExcelExport]="true">
    </ejs-pivotview>
  `
})
export class AppComponent {
  @ViewChild('pivotGrid') pivotGrid: PivotViewComponent;

  exportToCSV() {
    const csvExportProperties = {
      fileName: `Report_${new Date().toISOString().split('T')[0]}.csv`
    };
    this.pivotGrid.csvExport(csvExportProperties);
  }
}
```

**Note:** Use CSV for datasets exceeding 1,048,576 rows (Excel's row limit).

## PDF Export

### Enable PDF Export

```typescript
import { PDFExportService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  providers: [PDFExportService],
  template: `
    <button (click)="exportToPDF()">Export to PDF</button>
    <ejs-pivotview 
      #pivotGrid
      [allowPdfExport]="true">
    </ejs-pivotview>
  `
})
export class AppComponent {
  exportToPDF() {
    const pdfExportProperties = {
      fileName: 'SalesReport.pdf'
    };
    this.pivotGrid.pdfExport(pdfExportProperties);
  }
}
```

### Page Orientation & Size

```typescript
exportToPDF() {
  const pdfExportProperties = {
    fileName: 'Report.pdf',
    pageOrientation: 'Landscape',  // or 'Portrait'
    pageSize: 'A4'                 // Letter, Legal, A3, A4, etc.
  };
  this.pivotGrid.pdfExport(pdfExportProperties);
}
```

### Add Headers & Footers

```typescript
exportToPDF() {
  const pdfExportProperties = {
    fileName: 'ReportWithHeader.pdf',
    header: {
      fromTop: 0,
      height: 60,
      contents: [
        {
          type: 'Text',
          value: 'Quarterly Sales Report',
          position: { x: 200, y: 25 },
          style: { textBrushColor: '#000000', fontSize: 14 }
        }
      ]
    }
  };
  this.pivotGrid.pdfExport(pdfExportProperties);
}
```

### Footer with Page Numbers

```typescript
footer: {
  fromBottom: 150,
  height: 60,
  contents: [
    {
      type: 'PageNumber',
      pageNumberType: 'Arabic',
      format: 'Page {$current} of {$total}',
      position: { x: 300, y: 50 },
      style: { fontSize: 10 }
    }
  ]
}
```

### Export Table and Chart Together

```typescript
@Component({
  template: `<ejs-pivotview 
    [displayOption]="{ view: 'Both' }"
    [chartSettings]="chartSettings"
    [allowPdfExport]="true">
  </ejs-pivotview>`
})
export class AppComponent {
  chartSettings = { value: 'Sales', chartSeries: { type: 'Column' } };

  exportBoth() {
    const pdfExportProperties = { fileName: 'TableAndChart.pdf' };
    this.pivotGrid.pdfExport(pdfExportProperties, false, false, true);
  }
}
```

### Multiple Tables to PDF

```typescript
exportMultipleTables() {
  const pdfProperties = { fileName: 'Report.pdf' };
  
  this.grid1.pdfExport(pdfProperties, true).then((pdfDoc: any) => {
    this.grid2.pdfExport(pdfProperties, false, pdfDoc);
  });
}
```

### Customize Column Width

```typescript
@Component({
  template: `<ejs-pivotview 
    (onPdfCellRender)="onPdfCellRender($event)">
  </ejs-pivotview>`
})
export class AppComponent {
  onPdfCellRender(args: any) {
    if (args.column.headerText === 'Sales') {
      args.column.width = 80;
    }
  }
}
```

### Apply Theme

```typescript
exportToPDF() {
  const pdfExportProperties = {
    fileName: 'ThemedReport.pdf',
    theme: {
      header: { fontName: 'Helvetica', fontSize: 13, bold: true },
      record: { fontName: 'Helvetica', fontSize: 10 }
    }
  };
  this.pivotGrid.pdfExport(pdfExportProperties);
}
```

## Print Options

### Print Pivot Table

```typescript
@Component({
  template: `
    <button (click)="printTable()">Print</button>
    <ejs-pivotview #pivotGrid [dataSourceSettings]="dataSourceSettings">
    </ejs-pivotview>
  `
})
export class AppComponent {
  @ViewChild('pivotGrid') pivotGrid: PivotViewComponent;

  printTable() {
    this.pivotGrid.print();
  }
}
```

### Print Chart

```typescript
import { PivotChartService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  providers: [PivotChartService],
  template: `
    <button (click)="printChart()">Print Chart</button>
    <ejs-pivotview 
      #pivotGrid
      [chartSettings]="chartSettings"
      [displayOption]="{ view: 'Chart' }">
    </ejs-pivotview>
  `
})
export class AppComponent {
  chartSettings = { value: 'Sales', chartSeries: { type: 'Column' } };

  printChart() {
    this.pivotGrid.print();
  }
}
```

### Print Grid and Chart Together

```typescript
import { PivotChartService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  providers: [PivotChartService],
  template: `
    <button (click)="printBoth()">Print Both</button>
    <ejs-pivotview 
      #pivotGrid
      [displayOption]="{ view: 'Both' }"
      [chartSettings]="chartSettings">
    </ejs-pivotview>
  `
})
export class AppComponent {
  chartSettings = { value: 'Sales', chartSeries: { type: 'Column' } };

  printBoth() {
    this.pivotGrid.print();
  }
}
```

## Common Scenarios

### Monthly Report Export

```typescript
exportMonthlyReport() {
  const month = new Date().toLocaleDateString('en-US', { month: 'long' });
  const year = new Date().getFullYear();
  
  const excelExportProperties = {
    fileName: `Sales_${month}_${year}.xlsx`
  };
  this.pivotGrid.excelExport(excelExportProperties);
}
```

### Multi-Format Export

```typescript
onExportClick(format: string) {
  const fileName = `Report_${new Date().toISOString().split('T')[0]}`;
  
  if (format === 'excel') {
    this.pivotGrid.excelExport({ fileName: `${fileName}.xlsx` });
  } else if (format === 'csv') {
    this.pivotGrid.csvExport({ fileName: `${fileName}.csv` });
  } else if (format === 'pdf') {
    this.pivotGrid.pdfExport({ fileName: `${fileName}.pdf` });
  }
}
```
    <ejs-pivotview 
      #pivotGrid
      [dataSourceSettings]="dataSourceSettings">
    </ejs-pivotview>
  `
})
---

## Best Practices

**For Excel Export:**
1. Use meaningful file names with dates for tracking
2. Apply themes for consistent branding
3. Use conditional formatting for data insights
4. Exclude hidden columns for cleaner exports
5. Test export with large datasets to ensure performance

**For PDF Export:**
1. Choose appropriate orientation (Portrait/Landscape) based on data width
2. Add headers/footers for professional appearance
3. Include page numbers for multi-page documents
4. Use virtual scrolling for large datasets
5. Apply custom fonts for non-English content

**For Printing:**
1. Test print layout before enabling printing features
2. Provide clear print button with visual indication
3. Consider print-friendly styling (no hover states)
4. Maintain data readability in printed output
5. Inform users about page orientation and size
