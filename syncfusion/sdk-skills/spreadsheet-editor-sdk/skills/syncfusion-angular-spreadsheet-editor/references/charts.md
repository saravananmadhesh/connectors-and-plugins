# Charts

Insert, delete, select and deselect charts in the Syncfusion Angular Spreadsheet.

---

## Minimal Angular Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: 
  `<ejs-spreadsheet
    #spreadsheet
    [allowChart]="true"
    (created)="created()">
    <e-sheets>
      <e-sheet>
        <e-ranges>
          <e-range [dataSource]="chartData"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  public chartData: object[] = [
    { Month: 'Jan', Sales: 35 },
    { Month: 'Feb', Sales: 40 },
    { Month: 'Mar', Sales: 50 }
  ];

  created(): void {
    this.spreadsheet.insertChart([{
      type: 'Column',
      range: 'A1:B4',
      id: 'chart1',
      theme: 'Material',
      isSeriesInRows: false
    }]);
  }
}
```

---

## Chart Operations

### Insert Chart
```typescript
created(): void {
  this.spreadsheet.insertChart([{
    type: 'Column',       // Chart type: 'Column' | 'Line' | 'Pie' | 'Bar' | 'Area' | 'Doughnut'
    range: 'A1:B4',       // Data range
    id: 'chart1',         // Unique chart ID
    theme: 'Material',    // Optional theme
    isSeriesInRows: false // Series orientation
  }]);
}
```

### Delete Chart
```typescript
deleteChart(): void {
  this.spreadsheet.deleteChart('chart1');
}
```

### Select Chart
```typescript
// Select the chart in the active cell
selectActiveChart(): void {
  this.spreadsheet.selectChart();
}

// Select a specific chart by ID
selectById(): void {
  this.spreadsheet.selectChart('chart1');
}
```

### Deselect Chart
```typescript
deselectActiveChart(): void {
  this.spreadsheet.deselectChart();
}
```

---

## Template Button Binding Example

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
    <ejs-spreadsheet
    #spreadsheet
    [allowChart]="true"
    (created)="created()">
    <e-sheets>
      <e-sheet>
        <e-ranges>
          <e-range [dataSource]="chartData"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
  <button (click)="insertChart()">Insert Chart</button>
  <button (click)="deleteChart()">Delete Chart</button>
  <button (click)="selectChart()">Select Chart</button>
  <button (click)="deselectChart()">Deselect Chart</button>
  `
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  public chartData: object[] = [
    { Month: 'Jan', Sales: 35 },
    { Month: 'Feb', Sales: 40 },
    { Month: 'Mar', Sales: 50 }
  ];

  created(): void {
    // Initial chart on load
    this.insertChart();
  }

  insertChart(): void {
    this.spreadsheet.insertChart([{
      type: 'Column',
      range: 'A1:B4',
      id: 'chart1',
      theme: 'Material',
      isSeriesInRows: false
    }]);
  }

  deleteChart(): void {
    this.spreadsheet.deleteChart('chart1');
  }

  selectChart(): void {
    this.spreadsheet.selectChart('chart1');
  }

  deselectChart(): void {
    this.spreadsheet.deselectChart();
  }
}
```

---

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[CHART_TYPE]` | Chart type | `'Column'`, `'Line'`, `'Pie'`, `'Area'`, `'Scatter'` |
| `[DATA_RANGE]` | Data source for chart | `'A1:D20'` |
| `[SERIES_NAME]` | Series name field | `'B1'` (header cell) |
| `[CATEGORY_FIELD]` | Category/X-axis field | `'A:A'` (column) |
| `[VALUE_FIELD]` | Value/Y-axis field | `'B:B'` (column) |
| `[CHART_TITLE]` | Chart title | `'Sales by Quarter'` |
| `[LEGEND_POSITION]` | Legend placement | `'Top'`, `'Bottom'`, `'Left'`, `'Right'` |

---

## Notes

- Always access `SpreadsheetComponent` via `@ViewChild` — never use `new Spreadsheet()` in Angular.
- All chart operations must be placed inside the `created()` event to ensure the component is fully initialized.
- Use `#spreadsheet` template reference variable on `<ejs-spreadsheet>` to match `@ViewChild('spreadsheet')`.
- Bind `[allowChart]="true"` on the template to enable chart support.
- Bind the `dataSource` as a typed `object[]` array in the component class — avoid inline template data.
- **Best Practice:** Include headers in the data range (first row = series names).
- **Chart Types:** `Column` (default), `Line`, `Pie`, `Doughnut`, `Area`, `Scatter`, `Bubble`, `Stock`.
- **Pie charts** support single series only.
- **Scatter charts** require numeric X and Y values — text categories are not supported.
- Large data ranges (100k+ points) may render slowly.
- Import `SpreadsheetAllModule` in the `imports` array of the standalone component.