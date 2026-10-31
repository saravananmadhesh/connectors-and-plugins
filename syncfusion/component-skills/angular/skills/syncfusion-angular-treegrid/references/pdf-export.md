---
name: Pdf-export
description: 'PDF export in Syncfusion Angular TreeGrid - PDF export configuration, custom styling, headers and footers, watermarks, and export options.'
---

# PDF Export

Export TreeGrid data to PDF with customization options for headers, footers, and styling.

## When to Use

Use PDF export when you need to:
- **Create reports** — Generate professional PDF reports from TreeGrid
- **Print-ready format** — Create optimized printable documents
- **Preserve formatting** — Include colors and styles in export
- **Headers and footers** — Add document titles, page numbers, dates
- **Multi-page support** — Automatically paginate long documents

## Table of Contents
- [Enable PDF Export](#enable-pdf-export)
- [PDF Export Options](#pdf-export-options)
- [Headers and Footers](#headers-and-footers)

## Enable PDF Export

### Basic PDF Export

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { PdfExportService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [childMapping]='childMapping'
      [allowPdfExport]='true'
      [toolbar]='["PdfExport"]'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [PdfExportService, ToolbarService]
}
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  public data: Object[] = [];
  public childMapping: string = 'subtasks';

  public toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case this.treegrid.grid.element.id + '_pdfexport':
        let pdfExportProperties: TreeGridPdfExportProperties = {
          isCollapsedStatePersist: this.collapseStatePersist
        };
        this.treegrid.pdfExport(pdfExportProperties);
        break;
    }
  }
}
```

## PDF Export Options

### Export with Theme

```typescript
public pdfExportProperties = {
  theme: {
    header: {
      font: new PdfStandardFont(
          PdfFontFamily.TimesRoman,
          11,
          PdfFontStyle.Bold
        ),
        fontColor: '#000080',
        bold: true,
        border: { color: '#5A5A5A', dashStyle: 'Solid' },
      },
    record: {
      font: new PdfStandardFont(PdfFontFamily.TimesRoman, 10),
      fontColor: '#B22222',
      bold: true,
    },
  }
};

this.treegrid.pdfExport(this.pdfExportProperties);
```

### Custom Filename

```typescript
public pdfExportProperties = {
  fileName: 'TreeGridData.pdf'
};
```

## Headers and Footers

### Custom Header

```typescript
public pdfExportProperties = {
  header: {
    fromTop: 0,
    height: 60,
    contents: [
      { type: 'Text', value: 'Task Report', margin: { left: 250, top: 20 } }
    ]
  }
};
```

### Custom Footer

```typescript
public pdfExportProperties = {
  footer: {
    fromBottom: 160,
    height: 60,
    contents: [
      { type: 'PageNumber', format: 'Page {$current} of {$total}', margin: { left: 250 } }
    ]
  }
};
```
