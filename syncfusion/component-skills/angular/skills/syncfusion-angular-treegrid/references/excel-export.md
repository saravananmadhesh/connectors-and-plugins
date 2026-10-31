---
name: Excel-export
description: 'Excel export in Syncfusion Angular TreeGrid - excel export configuration, cell styling, merged cells, formatting, and export options.'
---

# Excel Export

Export TreeGrid data to Excel with advanced formatting, merged cells, and conditional styling.

## When to Use

Use Excel export when you need to:
- **Generate reports** — Export TreeGrid data as Excel files
- **Apply styles** — Maintain formatting in exported data
- **Hierarchical export** — Preserve parent-child relationships in Excel
- **Custom headers** — Add custom headers and footers to export
- **Download files** — Enable users to download data for offline use

## Table of Contents
- [Enable Excel Export](#enable-excel-export)
- [Excel Export Options](#excel-export-options)
- [Styling and Formatting](#styling-and-formatting)

## Enable Excel Export

### Basic Excel Export

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { ExcelExportService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [childMapping]='childMapping'
      [allowExcelExport]='true'
      [toolbar]='["ExcelExport"]'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [ExcelExportService, ToolbarService]
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  public data: Object[] = [];
  public childMapping: string = 'subtasks';

  public toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case this.treegrid.grid.element.id + '_excelexport':
        let excelExportProperties: TreeGridExcelExportProperties = {
          isCollapsedStatePersist: this.collapseStatePersist
        };
        this.treegrid.excelExport(excelExportProperties);
        break;
    }
  }
}
```

## Excel Export Options

### Custom Filename

```typescript
let excelExportProperties = {
  fileName: 'TaskData.xlsx'
};
this.treegrid.excelExport(this.excelExportProperties);
```

### Export Current Page

```typescript
public excelExportProperties = {
  exportType: 'CurrentPage',
};
```

## Styling and Formatting

### Column Width

```typescript
public excelExportProperties = {
  columns: [
    { field: 'TaskID', width: 100 },
    { field: 'TaskName', width: 250 }
  ]
};
```

### Cell Styling

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent, TreeGridModule, ExcelExportService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import { ToolbarItems } from '@syncfusion/ej2-treegrid';
import { ExcelQueryCellInfoEventArgs, RowDataBoundEventArgs } from '@syncfusion/ej2-grids';


@Component({
  standalone: true,
  selector: 'app-container',
  imports: [CommonModule, TreeGridModule],
  providers: [PageService, ExcelExportService, ToolbarService],
  template: `
    <ejs-treegrid
      #treegrid
      [dataSource]="data"
      [allowExcelExport]="true"
      [toolbar]="toolbarOptions"
      [treeColumnIndex]="1"
      childMapping="subtasks"
      (queryCellInfo)="onQueryCellInfo($event)"
      (excelQueryCellInfo)="onExcelQueryCellInfo($event)"
      (toolbarClick)="onToolbarClick($event)"
      height="300">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" textAlign="Right" width="90"></e-column>
        <e-column field="taskName" headerText="Task Name" width="180"></e-column>
        <e-column field="startDate" headerText="Start Date" format="yMd" textAlign="Right" width="120"></e-column>
        <e-column field="duration" headerText="Duration" textAlign="Right" width="110"></e-column>
      </e-columns>
    </ejs-treegrid>
  `
})
export class AppComponent {
  @ViewChild('treegrid', { static: true }) treeGridObj!: TreeGridComponent;

  public data = sampleData;
  public toolbarOptions: ToolbarItems[] = ['ExcelExport'];

  onToolbarClick(args: any): void {
    if (args.item.id.includes('excelexport')) {
      this.treeGridObj.excelExport();
    }
  }

  onQueryCellInfo(args: RowDataBoundEventArgs & { column: any; cell: HTMLElement; data: any }): void {
    if (args.column.field === 'duration') {
      const value = args.data?.duration;
      if (value === 0 || value === '') {
        args.cell.style.background = '#336c12';
        args.cell.style.color = '#ffffff';
      } else if (value < 3) {
        args.cell.style.background = '#7b2b1d';
        args.cell.style.color = '#ffffff';
      }
    }
  }

  onExcelQueryCellInfo(args: ExcelQueryCellInfoEventArgs & { value: any }): void {
    if (args.column?.field === 'duration') {
      const value = args.value;
      if (value === 0 || value === '') {
        args.style = { backColor: '#336c12', fontColor: '#ffffff' };
      } else if (value < 3) {
        args.style = { backColor: '#7b2b1d', fontColor: '#ffffff' };
      }
    }
  }
}
```

### Excel Export Events
```typescript
<ejs-treegrid 
  (beforeExcelExport)='onBeforeExcelExport($event)'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
onBeforeExcelExport(args: any) {
  if (args.data) {
    // Customize export data
    console.log('Preparing Excel export');
  }
}
```
