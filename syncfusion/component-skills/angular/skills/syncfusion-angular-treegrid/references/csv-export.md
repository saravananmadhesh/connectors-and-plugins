---
name: CSV-export
description: 'CSV Export in Syncfusion Angular TreeGrid - export configuration, formatting, file naming, download options, and custom data mapping.'
---

# CSV Export

Export TreeGrid data to CSV format with customization options.

## When to Use

Use CSV export when you need to:
- **Create data files** — Export TreeGrid data as CSV
- **Lightweight format** — Use CSV for simplicity and compatibility
- **Exclude columns** — Skip certain columns in export

## Table of Contents
- [Basic CSV Export](#basic-csv-export)
- [Export Configuration](#export-configuration)
- [File Naming](#file-naming)
- [Export Events](#export-events)

## Basic CSV Export

### Simple CSV Export

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { ToolbarService, ExcelExportService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <button (click)='exportCSV()'>Export as CSV</button>
    
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [childMapping]='childMapping'
      [toolbar]='["CsvExport"]'
      (toolbarClick)='onToolbarClick($event)'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='100'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
        <e-column field='Duration' headerText='Duration' width='100'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [ToolbarService, ExcelExportService]
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;

  public data: Object[] = [];
  public childMapping: string = 'subtasks';

  exportCSV() {
    this.treegrid.csvExport();
  }

  onToolbarClick(args: any) {
    if (args.item.id === this.treegrid.grid.element.id + '_csvexport') {
      this.treegrid.csvExport();
    }
  }
}
```

---

## Export Configuration

### Customized CSV Export

```typescript
@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [childMapping]='childMapping'
      [toolbar]='["CsvExport"]'
      (toolbarClick)='onToolbarClick($event)'>
      <!-- columns -->
    </ejs-treegrid>
  `
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;

  public data: Object[] = [];
  public childMapping: string = 'subtasks';

  onToolbarClick(args: any) {
    if (args.item.id === this.treegrid.grid.element.id + '_csvexport') {
      const csvExportProperties = {
        fileName: 'tasks.csv',
        dataSource: this.data,
        columns: [
          { field: 'TaskID', headerText: 'ID' },
          { field: 'TaskName', headerText: 'Task' },
          { field: 'Duration', headerText: 'Duration (days)' },
          { field: 'Progress', headerText: 'Progress (%)' }
        ],
        hierarchyExportMode: 'All',  // Export all levels
        isCollapsedStatePersist: false,
        theme: {
          header: { fontColor: '#ffffff', borders: { color: '#000000' } },
          record: { fontColor: '#000000' }
        }
      };

      this.treegrid.csvExport(csvExportProperties);
    }
  }
}
```

### Export Current Page Only

```typescript
  const csvExportProperties = {
    fileName: 'tasks-page.csv',
    exportType: 'CurrentPage'  // Only current page
  };

  this.treegrid.csvExport(csvExportProperties);
```

### Export Selected Records

```typescript
  const selectedRecords = this.treegrid.getSelectedRecords();
  
  if (selectedRecords.length === 0) {
    alert('Please select records to export');
    return;
  }

  const csvExportProperties = {
    fileName: 'selected-tasks.csv',
    dataSource: selectedRecords
  };

  this.treegrid.csvExport(csvExportProperties);
```

---

## File Naming

### Dynamic File Naming

```typescript

  const timestamp = new Date().toISOString().split('T')[0];
  const fileName = `tasks-export-${timestamp}.csv`;

  const csvExportProperties = {
    fileName: fileName,
    dataSource: this.data
  };

  this.treegrid.csvExport(csvExportProperties);

```

---

## Export Events

### Handle Export Events

```typescript
@Component({
  template: `
    <ejs-treegrid 
      (beforeCsvExport)='onBeforeCsvExport($event)'
      (csvExportComplete)='onCsvExportComplete($event)'>
      <!-- columns -->
    </ejs-treegrid>
  `
})
export class AppComponent {

  onBeforeCsvExport(args: any) {
    console.log('CSV export starting');
  }

  onCsvExportComplete(args: any) {
    console.log('CSV export completed');
  }

  public data: Object[] = [];
}
```

---
