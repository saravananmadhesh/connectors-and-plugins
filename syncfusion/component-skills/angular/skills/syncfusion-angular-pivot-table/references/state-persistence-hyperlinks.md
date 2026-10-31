# State Persistence & Report Management

## Table of Contents
- [What is State Persistence](#what-is-state-persistence)
- [Enable Automatic Persistence](#enable-automatic-persistence)
- [Save and Load Pivot Layout](#save-and-load-pivot-layout)
- [Hyperlinks in Pivot Cells](#hyperlinks-in-pivot-cells)
- [Hyperlink Settings](#hyperlink-settings)
- [Enable Hyperlinks](#enable-hyperlinks)

---

## What is State Persistence

State persistence enables users to automatically retain the entire configuration of the Pivot Grid component in the browser's local storage. This includes:

- Current layout and field arrangements
- Sorting and filter configurations
- Expanded or collapsed states of fields
- Chart view settings (if applicable)
- Custom aggregations and calculated fields

When `enablePersistence` is enabled, all these settings are saved automatically when users refresh the browser or navigate away, providing a seamless data analysis experience.

---

## Enable Automatic Persistence

Enable persistence to automatically save all pivot grid configurations to browser localStorage:

```typescript
import { Component } from '@angular/core';
import { IDataOptions } from '@syncfusion/ej2-pivotview';

@Component({
  selector: 'app-persistence',
  template: `
    <ejs-pivotview 
      #pivotView
      [dataSourceSettings]="dataSourceSettings"
      [enablePersistence]="true"
      height="450">
    </ejs-pivotview>
  `
})
export class AppComponent {
  dataSourceSettings: IDataOptions = {
    dataSource: [
      { Country: 'USA', Year: 2020, Sales: 15000 },
      { Country: 'USA', Year: 2021, Sales: 18000 },
      { Country: 'UK', Year: 2020, Sales: 12000 },
      { Country: 'UK', Year: 2021, Sales: 14000 }
    ],
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
  };
}
```

**What Gets Persisted:**
- Row, column, and filter field configurations
- Aggregation type selections
- Sorting and filtering states
- Grouped field arrangements
- Drill state (expanded/collapsed members)
- Chart view selection (if enabled)
- Field visibility and order

---

## Save and Load Pivot Layout

Programmatically save and restore pivot grid configurations using `getPersistData()` and `loadPersistData()` methods:

```typescript
import { Component, ViewChild } from '@angular/core';
import { PivotViewComponent } from '@syncfusion/ej2-angular-pivotview';

@Component({
  selector: 'app-persist-manual',
  template: `
    <div class="controls">
      <button (click)="saveReport()">Save Report</button>
      <button (click)="loadReport()">Load Report</button>
    </div>
    <ejs-pivotview 
      #pivotView
      [dataSourceSettings]="dataSourceSettings"
      [enablePersistence]="true"
      height="450">
    </ejs-pivotview>
  `
})
export class AppComponent {
  @ViewChild('pivotView') pivotView: PivotViewComponent;

  dataSourceSettings: IDataOptions = {
    dataSource: [
      { Country: 'USA', Year: 2020, Sales: 15000 },
      { Country: 'USA', Year: 2021, Sales: 18000 },
      { Country: 'UK', Year: 2020, Sales: 12000 },
      { Country: 'UK', Year: 2021, Sales: 14000 }
    ],
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
  };

  saveReport() {
    // Get complete state as serialized string
    const persistData = this.pivotView.getPersistData();
    
    // Store in localStorage
    localStorage.setItem('myPivotReport', persistData);
    console.log('Report saved successfully');
  }

  loadReport() {
    // Retrieve persisted configuration
    const savedData = localStorage.getItem('myPivotReport');
    
    if (savedData) {
      // Restore configuration
      this.pivotView.loadPersistData(savedData);
      console.log('Report loaded successfully');
    } else {
      console.warn('No saved report found');
    }
  }
}
```

**Key Methods:**
- `getPersistData()`: Returns complete pivot state as JSON string
- `loadPersistData(persistData)`: Applies saved configuration to pivot grid

---

## Hyperlinks in Pivot Cells

The Pivot Grid provides built-in support for displaying hyperlinks within individual cells. This feature allows users to link data in specific cells, enhancing interactivity and navigation.

Hyperlinks can be enabled for various cell types:
- Row headers
- Column headers
- Value cells
- Summary cells

---

## Hyperlink Settings

Control hyperlink behavior using the `hyperlinkSettings` property:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hyperlink',
  template: `
    <ejs-pivotview 
      [dataSourceSettings]="dataSourceSettings"
      [hyperlinkSettings]="hyperlinkSettings"
      height="450">
    </ejs-pivotview>
  `
})
export class AppComponent {
  dataSourceSettings: IDataOptions = {
    dataSource: [
      { Country: 'USA', Year: 2020, Sales: 15000 },
      { Country: 'USA', Year: 2021, Sales: 18000 }
    ],
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
  };

  // Hyperlink settings configuration
  hyperlinkSettings: any = {
    showHyperlink: true,
    cssClass: 'e-custom-hyperlink'
  };
}
```

**Available Properties:**
- `showHyperlink`: Enable/disable hyperlinks in all cells
- `showRowHeaderHyperlink`: Enable/disable for row headers
- `showColumnHeaderHyperlink`: Enable/disable for column headers
- `showValueCellHyperlink`: Enable/disable for value cells
- `showSummaryCellHyperlink`: Enable/disable for summary cells
- `cssClass`: Apply custom CSS styling to hyperlinks

---

## Enable Hyperlinks

### Hyperlinks for All Cells

Enable hyperlinks across all visible cells:

```typescript
hyperlinkSettings: {
  showHyperlink: true,
  cssClass: 'e-custom-class'
}
```

### Selective Hyperlinks by Cell Type

Enable hyperlinks for specific cell types only:

```typescript
hyperlinkSettings: {
  showRowHeaderHyperlink: true,      // Enable for row headers
  showColumnHeaderHyperlink: true,   // Enable for column headers
  showValueCellHyperlink: false,     // Disable for value cells
  showSummaryCellHyperlink: false    // Disable for summary cells
}
```

### Hyperlinks with Custom Styling

Apply custom CSS styling to hyperlinks:

```typescript
hyperlinkSettings: {
  showHyperlink: true,
  cssClass: 'custom-hyperlink-style'
}
```

```css
/* Custom hyperlink styling */
.custom-hyperlink-style {
  color: #0078d4;
  text-decoration: underline;
  cursor: pointer;
}

.custom-hyperlink-style:hover {
  color: #005a9e;
  text-decoration: none;
}
```

### Conditional Hyperlinks

Show hyperlinks based on specific conditions:

```typescript
hyperlinkSettings: {
  showHyperlink: true,
  headerText: 'Country',  // Show hyperlinks only for specific header
  conditionalSettings: [
    {
      measure: 'Sales',
      conditions: 'GreaterThan',
      value1: 10000
    }
  ]
}
```

---

## Best Practices

1. **Enable State Persistence** - Activate for frequently-used reports to preserve user configurations
2. **Test Persistence Across Sessions** - Verify localStorage persistence works after browser refresh
3. **Use Meaningful Report Names** - When saving multiple reports, use descriptive names for easy identification
4. **Clear Old Reports** - Periodically clean up old saved reports from localStorage to manage storage
5. **Hyperlink Consistency** - Apply consistent styling for hyperlinks across all cells
6. **Mobile Considerations** - Test persistence on mobile devices (localStorage may be limited)
7. **Security** - Don't persist sensitive filter conditions in localStorage
