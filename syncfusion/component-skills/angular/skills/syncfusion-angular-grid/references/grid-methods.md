# Grid Component - Methods Reference

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Methods Overview](#methods-overview)
- [Data Manipulation Methods](#data-manipulation-methods)
- [Selection Methods](#selection-methods)
- [Column Management Methods](#column-management-methods)
- [Navigation & Paging Methods](#navigation--paging-methods)
- [Filtering Methods](#filtering-methods)
- [Export Methods](#export-methods)
- [Common Operator Values for Filtering](#common-operator-values-for-filtering)
- [Sort Direction Values](#sort-direction-values)

## When to Use This Skill

Use this skill when you need to:
- **Call grid methods** — Programmatically control grid behavior and data
- **Add/edit/delete records** — Manipulate data via addRecord, editCell, deleteRecord methods
- **Manage selection** — Select/deselect rows, cells, or columns programmatically
- **Control columns** — Show, hide, reorder, and format columns via methods
- **Navigate grid** — Go to specific pages, rows, or cells
- **Dynamic filtering** — Apply filters programmatically
- **Export data** — Trigger Excel/PDF exports via methods
- **Refresh data** — Update grid with new data sources

## Methods Overview

The Grid component provides 137+ methods organized by functionality. Here are the most commonly used ones.

---

## Data Manipulation Methods

### addRecord()
**Parameters:** `data?: Object, index?: number`  
**Return:** `void`  
**Description:** Adds new record(s) to grid (requires `editSettings.allowEditing: true`)

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent, GridModule, EditService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid-addrecord',
  standalone: true,
  imports: [GridModule],
  providers: [EditService],
  template: `
    <div>
      <button (click)="handleAddRecord()">Add Record</button>
      
      <ejs-grid #grid [dataSource]="data" [editSettings]="editSettings">
        <e-columns>
          <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        </e-columns>
      </ejs-grid>
    </div>
  `
})
export class GridAddRecordComponent {
  @ViewChild('grid') gridComponent!: GridComponent;
  data: any[] = [];
  editSettings = { allowAdding: true, allowEditing: true };

  handleAddRecord(): void {
    const newRecord = {
      OrderID: 10003,
      CustomerID: 'BLONP',
      Freight: 25.00
    };
    this.gridComponent.addRecord(newRecord);
  }
}
```

### setCellValue()
**Parameters:** `key: string | number, field: string, value: string | number | boolean | Date | null`  
**Return:** `void`  
**Description:** Updates single cell value by primary key

```typescript
@Component({
  selector: 'app-grid-setcellvalue',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridSetCellValueComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleUpdateCell(): void {
    this.gridComponent.setCellValue(10001, 'Freight', 50.00);
  }
}
```

### setRowData()
**Parameters:** `key: string | number, rowData?: Object`  
**Return:** `void`  
**Description:** Updates entire row by primary key

```typescript
@Component({
  selector: 'app-grid-setrowdata',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridSetRowDataComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleUpdateRow(): void {
    const updatedData = {
      OrderID: 10001,
      CustomerID: 'UPDATED',
      Freight: 100.00
    };
    this.gridComponent.setRowData(10001, updatedData);
  }
}
```

### deleteRecord()
**Parameters:** `fieldname?: string, data?: Object`  
**Return:** `void`  
**Description:** Deletes record (requires `editSettings.allowDeleting: true`)

```typescript
@Component({
  selector: 'app-grid-deleterecord',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridDeleteRecordComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleDeleteRecord(): void {
    this.gridComponent.deleteRecord('OrderID', { OrderID: 10001 });
  }
}
```

### getBatchChanges()
**Return:** `Object`  
**Description:** Gets added, edited, deleted data before bulk save

```typescript
@Component({
  selector: 'app-grid-batchchanges',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridBatchChangesComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  getBatchUpdates(): void {
    const changes = this.gridComponent.getBatchChanges();
    console.log('Added:', changes.addedRecords);
    console.log('Modified:', changes.changedRecords);
    console.log('Deleted:', changes.deletedRecords);
  }
}
```

### changeDataSource()
**Parameters:** `dataSource?: Object | DataManager | DataResult, columns?: Column[]`  
**Return:** `void`  
**Description:** Changes datasource and columns completely

```typescript
@Component({
  selector: 'app-grid-changedatasource',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridChangeDataSourceComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  changeData(): void {
    const newData = [
      { OrderID: 20001, CustomerID: 'NEWCUST', Freight: 50 }
    ];
    this.gridComponent.changeDataSource(newData);
  }
}
```

---

## Selection Methods

### selectRow()
**Parameters:** `index: number, isToggle?: boolean`  
**Return:** `void`  
**Description:** Selects row by index

```typescript
@Component({
  selector: 'app-grid-selectrow',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridSelectRowComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleSelectRow(): void {
    this.gridComponent.selectRow(0);  // Select first row
  }
}
```

### selectRows()
**Parameters:** `rowIndexes: number[]`  
**Return:** `void`  
**Description:** Selects multiple rows by indexes

```typescript
@Component({
  selector: 'app-grid-selectrows',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridSelectRowsComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleSelectMultipleRows(): void {
    this.gridComponent.selectRows([0, 2, 4]);  // Select rows at index 0, 2, 4
  }
}
```

### getSelectedRowIndexes()
**Return:** `number[]`  
**Description:** Gets selected row indexes

```typescript
@Component({
  selector: 'app-grid-getselectedindexes',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridGetSelectedIndexesComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  getSelectedIndexes(): void {
    const indexes = this.gridComponent.getSelectedRowIndexes();
    console.log('Selected rows:', indexes);
  }
}
```

### getSelectedRecords()
**Return:** `Object[]`  
**Description:** Gets selected row data

```typescript
@Component({
  selector: 'app-grid-getselecteddata',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridGetSelectedDataComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  getSelectedData(): void {
    const selectedRecords = this.gridComponent.getSelectedRecords();
    console.log('Selected data:', selectedRecords);
  }
}
```

### clearRowSelection()
**Return:** `void`  
**Description:** Deselects all rows

```typescript
@Component({
  selector: 'app-grid-clearselection',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridClearSelectionComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleClearSelection(): void {
    this.gridComponent.clearRowSelection();
  }
}
```

### selectCell()
**Parameters:** `cellIndex: IIndex, isToggle?: boolean`  
**Return:** `void`  
**Description:** Selects cell by row/column index

```typescript
@Component({
  selector: 'app-grid-selectcell',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridSelectCellComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleSelectCell(): void {
    this.gridComponent.selectCell({ rowIndex: 0, cellIndex: 1 });
  }
}
```

---

## Column Management Methods

### getColumns()
**Parameters:** `isRefresh?: boolean`  
**Return:** `Column[]`  
**Description:** Gets column definitions

```typescript
@Component({
  selector: 'app-grid-getcolumns',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridGetColumnsComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  getGridColumns(): void {
    const columns = this.gridComponent.getColumns();
    console.log('Grid columns:', columns);
  }
}
```

### getColumnByField()
**Parameters:** `field: string`  
**Return:** `Column`  
**Description:** Gets column by field name

```typescript
@Component({
  selector: 'app-grid-getcolumnbyfield',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridGetColumnByFieldComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  getColumn(): void {
    const column = this.gridComponent.getColumnByField('CustomerID');
    console.log('Column:', column);
  }
}
```

### getColumnFieldNames()
**Return:** `string[]`  
**Description:** Gets all column field names

```typescript
@Component({
  selector: 'app-grid-getfieldnames',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridGetFieldNamesComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  getFieldNames(): void {
    const fields = this.gridComponent.getColumnFieldNames();
    console.log('Field names:', fields);
  }
}
```

### hideColumns()
**Parameters:** `keys: string | string[], hideBy?: string`  
**Return:** `void`  
**Description:** Hides columns by name

```typescript
@Component({
  selector: 'app-grid-hidecolumns',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridHideColumnsComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleHideColumns(): void {
    this.gridComponent.hideColumns('Freight');  // Hide single column
    // Or multiple
    this.gridComponent.hideColumns(['Freight', 'ShipCity']);
  }
}
```

### showColumns()
**Parameters:** `keys: string | string[], showBy?: string`  
**Return:** `void`  
**Description:** Shows columns by name

```typescript
@Component({
  selector: 'app-grid-showcolumns',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridShowColumnsComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleShowColumns(): void {
    this.gridComponent.showColumns('Freight');
  }
}
```

### autoFitColumns()
**Parameters:** `fieldNames?: string | string[]`  
**Return:** `void`  
**Description:** Auto-fits columns to content

```typescript
@Component({
  selector: 'app-grid-autofitcolumns',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridAutoFitColumnsComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleAutoFit(): void {
    this.gridComponent.autoFitColumns();  // Auto-fit all columns
  }
}
```

### reorderColumns()
**Parameters:** `fromFName: string | string[], toFName: string`  
**Return:** `void`  
**Description:** Reorders columns by field names

```typescript
@Component({
  selector: 'app-grid-reordercolumns',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridReorderColumnsComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleReorderColumns(): void {
    this.gridComponent.reorderColumns('OrderID', 'Freight');
  }
}
```

---

## Navigation & Paging Methods

### goToPage()
**Parameters:** `pageNo: number`  
**Return:** `void`  
**Description:** Navigates to specified page

```typescript
@Component({
  selector: 'app-grid-gotopage',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridGoToPageComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleGoToPage(): void {
    this.gridComponent.goToPage(3);  // Go to page 3
  }
}
```

### search()
**Parameters:** `searchString: string`  
**Return:** `void`  
**Description:** Searches records with key

```typescript
@Component({
  selector: 'app-grid-search',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridSearchComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleSearch(searchValue: string): void {
    this.gridComponent.search(searchValue);
  }
}
```

### sortColumn()
**Parameters:** `columnName: string, direction: SortDirection, isMultiSort?: boolean`  
**Return:** `void`  
**Description:** Sorts column with direction (Ascending or Descending)

```typescript
@Component({
  selector: 'app-grid-sortcolumn',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridSortColumnComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleSortColumn(): void {
    this.gridComponent.sortColumn('Freight', 'Ascending');
  }
}
```

### clearSorting()
**Return:** `void`  
**Description:** Clears all sorting

```typescript
@Component({
  selector: 'app-grid-clearsorting',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridClearSortingComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleClearSorting(): void {
    this.gridComponent.clearSorting();
  }
}
```

---

## Filtering Methods

### filterByColumn()
**Parameters:** `fieldName: string, filterOperator: string, filterValue: string | number | Date | boolean`  
**Return:** `void`  
**Description:** Filters by column with operators

```typescript
@Component({
  selector: 'app-grid-filterbycolumn',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridFilterByColumnComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleFilterByColumn(): void {
    // Filter Freight > 100
    this.gridComponent.filterByColumn('Freight', 'greaterThan', 100);
  }
}
```

### clearFiltering()
**Parameters:** `fields?: string[]`  
**Return:** `void`  
**Description:** Clears all filters or specific fields

```typescript
@Component({
  selector: 'app-grid-clearfiltering',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridClearFilteringComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handleClearFilters(): void {
    this.gridComponent.clearFiltering();
  }
}
```

### getFilteredRecords()
**Return:** `Object[] | Promise`  
**Description:** Gets all filtered records

```typescript
@Component({
  selector: 'app-grid-getfiltered',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridGetFilteredComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  getFiltered(): void {
    const filtered = this.gridComponent.getFilteredRecords();
    console.log('Filtered records:', filtered);
  }
}
```

---

## Export Methods

### excelExport()
**Parameters:** `excelExportProperties?: ExcelExportProperties`  
**Return:** `Promise`  
**Description:** Exports grid to Excel file (.xlsx)

```typescript
@Component({
  selector: 'app-grid-excelexport-method',
  standalone: true,
  imports: [GridModule],
  providers: [ExcelExportService],
  template: ``
})
export class GridExcelExportMethodComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  async handleExcelExport(): Promise<void> {
    await this.gridComponent.excelExport();
  }
}
```

### csvExport()
**Parameters:** `excelExportProperties?: ExcelExportProperties`  
**Return:** `Promise`  
**Description:** Exports grid to CSV file

```typescript
@Component({
  selector: 'app-grid-csvexport',
  standalone: true,
  imports: [GridModule],
  providers: [ExcelExportService],
  template: ``
})
export class GridCsvExportComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  async handleCsvExport(): Promise<void> {
    await this.gridComponent.csvExport();
  }
}
```

### pdfExport()
**Parameters:** `pdfExportProperties?: PdfExportProperties`  
**Return:** `Promise`  
**Description:** Exports grid to PDF document

```typescript
@Component({
  selector: 'app-grid-pdfexport-method',
  standalone: true,
  imports: [GridModule],
  providers: [PdfExportService],
  template: ``
})
export class GridPdfExportMethodComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  async handlePdfExport(): Promise<void> {
    await this.gridComponent.pdfExport();
  }
}
```

### print()
**Return:** `void`  
**Description:** Prints all pages

```typescript
@Component({
  selector: 'app-grid-print',
  standalone: true,
  imports: [GridModule],
  template: ``
})
export class GridPrintComponent {
  @ViewChild('grid') gridComponent!: GridComponent;

  handlePrint(): void {
    this.gridComponent.print();
  }
}
```

---

## Common Operator Values for Filtering

| Operator | Description | Example |
|----------|-------------|---------|
| `equal` | Equals | `'equal'` |
| `notequal` | Not equals | `'notequal'` |
| `contains` | Contains | `'contains'` |
| `startswith` | Starts with | `'startswith'` |
| `endswith` | Ends with | `'endswith'` |
| `greaterthan` | Greater than | `'greaterthan'` |
| `lessthan` | Less than | `'lessthan'` |
| `greaterthanorequal` | Greater than or equal | `'greaterthanorequal'` |
| `lessthanorequal` | Less than or equal | `'lessthanorequal'` |

---

## Sort Direction Values

| Value | Description |
|-------|-------------|
| `Ascending` | Sort in ascending order |
| `Descending` | Sort in descending order |
