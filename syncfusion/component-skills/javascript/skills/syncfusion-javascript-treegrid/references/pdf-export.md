# PDF Export

## When to Use This Reference

**Read this file when you need to:**
- Export TreeGrid data to PDF document with hierarchical layout preserved
- Configure page size, orientation, margins, and page breaks
- Add headers and footers with text, images, page numbers, and positioning
- Apply conditional cell styling based on data values
- Customize fonts (standard and custom) for printed output
- Implement server-side PDF export for large datasets
- Rotate headers or apply special formatting (server-side only)

## Table of Contents
- [Basic PDF Export](#basic-pdf-export)
- [Export Options](#export-options)
- [Cell Styling & Themes](#cell-styling--themes)
- [Headers & Footers](#headers--footers)
- [Server-Side Export](#server-side-export)
- [Troubleshooting](#troubleshooting)

## Basic PDF Export

Export TreeGrid to PDF file using PdfExport module:

```typescript
import { TreeGrid, Page, Toolbar, PdfExport, PdfExportProperties } from '@syncfusion/ej2-treegrid';
import { sampleData } from './datasource.ts';

TreeGrid.Inject(Page, Toolbar, PdfExport);

let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: sampleData,
  childMapping: 'subtasks',
  allowPdfExport: true,
  allowPaging: true,
  height: 220,
  pageSettings: { pageSize: 7 },
  toolbar: ['PdfExport'],
  treeColumnIndex: 1,
  columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
    { field: 'taskName', headerText: 'Task Name', width: 180, textAlign: 'Left' },
    { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
    { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
  ]
});

treeGridObj.appendTo('#TreeGrid');
treeGridObj.toolbarClick = (args: Object) => {
  if (args['item'].text === 'PDF Export') {
    treeGridObj.pdfExport();
  }
};
```

**Built-in Features:**
- Hierarchical layout preserved
- Column auto-fit
- Professional formatting
- Page breaks for long content

## Export Options

### Export Hidden Columns

Include hidden columns in PDF export:

```typescript
treeGridObj.toolbarClick = (args: Object) => {
  if (args['item'].text === 'PDF Export') {
    let exportProperties: PdfExportProperties = {
      includeHiddenColumn: true
    };
    treeGridObj.pdfExport(exportProperties);
  }
};
```

### Show/Hide Columns During Export

Dynamically toggle column visibility during export using `toolbarClick` and `pdfExportComplete` events:

```typescript
import { Column } from '@syncfusion/ej2-grids';

treeGridObj.toolbarClick = (args: Object) => {
  if (args['item'].text === 'PDF Export') {
    let cols: Column[] = treeGridObj.grid.columns;
    cols[2].visible = false;  // Hide Start Date
    cols[3].visible = true;   // Show Duration
    treeGridObj.pdfExport();
  }
};

treeGridObj.pdfExportComplete = () => {
  let cols: Column[] = treeGridObj.grid.columns;
  cols[3].visible = false;   // Restore original state
  cols[2].visible = true;
};
```

### Page Orientation

Change page layout to Landscape:

```typescript
let exportProperties: PdfExportProperties = {
  pageOrientation: 'Landscape'  // Default: 'Portrait'
};
treeGridObj.pdfExport(exportProperties);
```

### Page Size Configuration

Supported page sizes: Letter, Note, Legal, A0-A9, B0-B5, Archa-Arche, Flsa, HalfLetter, Letter11x17, Ledger

```typescript
let exportProperties: PdfExportProperties = {
  pageSize: 'Letter'  // or A4, A3, Landscape, etc.
};
treeGridObj.pdfExport(exportProperties);
```

### File Name Customization

Assign custom file name:

```typescript
let exportProperties: PdfExportProperties = {
  fileName: 'ProjectTasks_2026.pdf'
};
treeGridObj.pdfExport(exportProperties);
```

### Font Customization

Default fonts: Helvetica, TimesRoman, Courier, Symbol, ZapfDingbats

```typescript
import { PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';

let exportProperties: PdfExportProperties = {
  theme: {
    header: { font: new PdfStandardFont(PdfFontFamily.TimesRoman, 11, PdfFontStyle.Bold) },
    record: { font: new PdfStandardFont(PdfFontFamily.TimesRoman, 10) }
  }
};
```

## Cell Styling & Themes

### Conditional Cell Formatting

Format cells based on values using `pdfQueryCellInfo` event:

```typescript
treeGridObj.pdfQueryCellInfo = (args: PdfQueryCellInfoEventArgs) => {
  if (args.column.field === 'duration') {
    if (args.value === 0 || args.value === '') {
      args.style = { backgroundColor: '#336c12' };  // Green
    } else if (args.value < 3) {
      args.style = { backgroundColor: '#7b2b1d' };  // Red
    }
  }
};
```

### Apply Theme

Customize header, record, and caption styles:

```typescript
let exportProperties: PdfExportProperties = {
  theme: {
    header: {
      fontColor: '#64FA50',
      fontName: 'Calibri',
      fontSize: 17,
      bold: true,
      border: { color: '#64FA50', lineStyle: 'Thin' }
    },
    record: {
      fontColor: '#64FA50',
      fontName: 'Calibri',
      fontSize: 17,
      bold: true
    }
  }
};
treeGridObj.pdfExport(exportProperties);
```

## Headers & Footers

### Add Text in Header/Footer

```typescript
let exportProperties: PdfExportProperties = {
  header: {
    fromTop: 0,
    height: 130,
    contents: [
      {
        type: 'Text',
        value: 'Task Details',
        position: { x: 0, y: 50 },
        style: { textBrushColor: '#000000', fontSize: 13 }
      }
    ]
  }
};
```

### Add Lines and Shapes

Supported line styles: dash, dot, dashdot, dashdotdot, solid

```typescript
let exportProperties: PdfExportProperties = {
  header: {
    fromTop: 0,
    height: 130,
    contents: [
      {
        type: 'Line',
        style: { penColor: '#000080', penSize: 2, dashStyle: 'Solid' },
        points: { x1: 0, y1: 4, x2: 685, y2: 4 }
      }
    ]
  }
};
```

### Add Page Numbers

Supported formats: Arabic (1,2,3), LowerLatin (a,b,c), UpperLatin (A,B,C), LowerRoman (i,ii,iii), UpperRoman (I,II,III)

```typescript
let exportProperties: PdfExportProperties = {
  footer: {
    fromBottom: 160,
    height: 150,
    contents: [
      {
        type: 'PageNumber',
        pageNumberType: 'Arabic',
        format: 'Page {$current} of {$total}',
        position: { x: 0, y: 25 },
        style: { textBrushColor: '#ffff80', fontSize: 15 }
      }
    ]
  }
};
```

### Add Image in Header/Footer

```typescript
let exportProperties: PdfExportProperties = {
  header: {
    fromTop: 0,
    height: 130,
    contents: [
      {
        type: 'Image',
        src: base64ImageString,  // Base64 format
        position: { x: 40, y: 10 },
        size: { height: 100, width: 250 }
      }
    ]
  }
};
```

### Complete Header/Footer Example

```typescript
let exportProperties: PdfExportProperties = {
  header: {
    fromTop: 0,
    height: 130,
    contents: [
      {
        type: 'Image',
        src: companyLogo,
        position: { x: 40, y: 10 },
        size: { height: 100, width: 250 }
      }
    ]
  },
  footer: {
    fromBottom: 160,
    height: 150,
    contents: [
      {
        type: 'PageNumber',
        pageNumberType: 'Arabic',
        format: 'Page {$current} of {$total}',
        position: { x: 0, y: 25 },
        style: { textBrushColor: '#ffff80', fontSize: 15 }
      }
    ]
  }
};
treeGridObj.pdfExport(exportProperties);
```

## Server-Side Export

### ASP.NET MVC Server Configuration

**Dependencies:** Syncfusion.EJ2, Syncfusion.EJ2.TreeGridExport

Controller implementation:

```csharp
public IActionResult ServerSideExporting() {
  var order = TreeData.GetDefaultData();
  ViewBag.dataSource = order;
  return View();
}

public IActionResult PdfExport(string treeGridModel) {
  if (treeGridModel == null) return View();
  TreeGridExcelExport exp = new TreeGridExcelExport();
  Syncfusion.EJ2.TreeGrid.TreeGrid gridProperty = ConvertTreeGridObject(treeGridModel);
  return exp.ExportToPdf<TreeData>(gridProperty, TreeData.GetDefaultData());
}

private Syncfusion.EJ2.TreeGrid.TreeGrid ConvertTreeGridObject(string gridProperty) {
  Syncfusion.EJ2.TreeGrid.TreeGrid TreeGridModel = (Syncfusion.EJ2.TreeGrid.TreeGrid)Newtonsoft.Json.JsonConvert.DeserializeObject(gridProperty, typeof(Syncfusion.EJ2.TreeGrid.TreeGrid));
  TreeGridColumnModel cols = (TreeGridColumnModel)Newtonsoft.Json.JsonConvert.DeserializeObject(gridProperty, typeof(TreeGridColumnModel));
  TreeGridModel.Columns = cols.columns;
  return TreeGridModel;
}
```

Client call using `serverPdfExport`:

```typescript
treeGridObj.toolbarClick = (args: Object) => {
  if (args['item'].id === 'TreeGrid_gridcontrol_pdfexport') {
    treeGridObj.serverPdfExport('Home/PdfExport');
  }
};
```

### Rotate Header Text (Server-Side)

Customize header rotation in BeginCellLayout event:

```csharp
public void BeginCellEvent(object sender, PdfGridBeginCellLayoutEventArgs args) {
  PdfGrid grid = (PdfGrid)sender;
  var brush = new PdfSolidBrush(new PdfColor(Color.DimGray));
  args.Graphics.Save();
  args.Graphics.TranslateTransform(args.Bounds.X + 50, args.Bounds.Height + 40);
  args.Graphics.RotateTransform(-60);  // Rotation angle
  args.Graphics.DrawString(headerValues[args.CellIndex], new PdfStandardFont(PdfFontFamily.Helvetica, 10), brush, new PointF(0, 0));
  if (args.IsHeaderRow) {
    grid.Headers[0].Cells[args.CellIndex].Value = string.Empty;
  }
  args.Graphics.Restore();
}
```

## Troubleshooting

**Q: PDF export not working?**
A: Ensure `TreeGrid.Inject(PdfExport)` is called and `allowPdfExport: true` is set.

**Q: Hidden columns not showing in export?**
A: Use `includeHiddenColumn: true` in export properties.

**Q: Custom fonts not applied?**
A: Provide font in base64 format or use standard fonts: Helvetica, TimesRoman, Courier, Symbol.
