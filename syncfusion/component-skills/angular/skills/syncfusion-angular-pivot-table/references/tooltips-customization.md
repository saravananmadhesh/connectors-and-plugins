# Tooltips Customization

## Overview

Tooltips display contextual information when users hover over value cells in the pivot table. By default, tooltips show the cell value plus row and column headers. Customize the appearance and content using templates and event handlers.

**Key Features:**
- Enabled by default
- Shows row/column headers and values
- Customizable HTML templates
- Dynamic content placeholders
- Chart tooltip support

---

## Basic Tooltip Setup

### Enable/Disable Tooltips

```typescript
import { Component } from '@angular/core';
import { PivotViewModule } from '@syncfusion/ej2-angular-pivotview';

@Component({
  imports: [PivotViewModule],
  selector: 'app-pivot-grid',
  template: `
    <ejs-pivotview
      [dataSourceSettings]="dataSourceSettings"
      [showTooltip]="true"
      [height]="'500px'">
    </ejs-pivotview>
  `
})
export class PivotGridComponent {
  public dataSourceSettings: any = {
    dataSource: [
      { Country: 'USA', Amount: 1000, Units: 10 },
      { Country: 'Canada', Amount: 800, Units: 8 }
    ],
    rows: [{ name: 'Country' }],
    values: [{ name: 'Amount', type: 'Sum' }]
  };
}
```

### Toggle Tooltips at Runtime

```typescript
@Component({
  template: `
    <button (click)="toggleTooltip()">Toggle Tooltip</button>
    <ejs-pivotview
      [dataSourceSettings]="dataSourceSettings"
      [showTooltip]="showTooltip">
    </ejs-pivotview>
  `
})
export class PivotGridComponent {
  public showTooltip = true;

  toggleTooltip(): void {
    this.showTooltip = !this.showTooltip;
  }
}
```

---

## Tooltip Templates

### Default Tooltip Content

```
Row Headers: USA
Column Headers: (Subtotal)
Row Fields: Country
Column Fields: (Subtotal)
Value Field: Amount
Aggregate Type: Sum
Value: $1,000
```

### Custom Template Setup

```typescript
@Component({
  template: `
    <ejs-pivotview
      [dataSourceSettings]="dataSourceSettings"
      [tooltipTemplate]="'tooltipTemplate'"
      [height]="'500px'">
    </ejs-pivotview>
    
    <!-- Template definition -->
    <script id="tooltipTemplate" type="text/x-template">
      <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px;">
        <div><b>Country:</b> ${rowHeaders}</div>
        <div><b>Value:</b> ${value}</div>
      </div>
    </script>
  `
})
export class PivotGridComponent {
  public dataSourceSettings: any = {
    dataSource: [...],
    rows: [{ name: 'Country' }],
    values: [{ name: 'Amount', type: 'Sum' }]
  };
}
```

### Placeholder Reference

Available placeholders in tooltip templates:

| Placeholder | Content | Example |
|-------------|---------|---------|
| `${rowHeaders}` | Row dimension members | "USA" |
| `${columnHeaders}` | Column dimension members | "Q1 2023" |
| `${rowFields}` | Row field names | "Country" |
| `${columnFields}` | Column field names | "Quarter, Year" |
| `${valueField}` | Value field name | "Sales Amount" |
| `${aggregateType}` | Aggregation function | "Sum" |
| `${value}` | Formatted cell value | "$10,000" |

### Advanced Template Example

```typescript
@Component({
  template: `
    <ejs-pivotview
      [dataSourceSettings]="dataSourceSettings"
      [tooltipTemplate]="'advancedTooltip'">
    </ejs-pivotview>
    
    <script id="advancedTooltip" type="text/x-template">
      <div class='tooltip-wrapper'>
        <div class='tooltip-header'>
          <span class='field-label'>Region:</span>
          <span class='field-value'>${rowHeaders}</span>
        </div>
        <div class='tooltip-row'>
          <span class='field-label'>Period:</span>
          <span class='field-value'>${columnHeaders}</span>
        </div>
        <div class='tooltip-metrics'>
          <span class='field-label'>Metric:</span>
          <span class='field-value'>${valueField}</span>
          <span class='field-label'>(${aggregateType})</span>
        </div>
        <div class='tooltip-value' style='font-weight: bold; font-size: 14px;'>
          Value: ${value}
        </div>
      </div>
    </script>
    
    <style>
      .tooltip-wrapper {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 12px;
        border-radius: 6px;
        font-size: 12px;
        min-width: 200px;
      }
      .tooltip-row {
        margin: 8px 0;
      }
      .field-label {
        font-weight: bold;
        margin-right: 5px;
      }
    </style>
  `
})
export class PivotGridComponent {
  public dataSourceSettings: any = { /* ... */ };
}
```

---

## Pivot Chart Tooltips

### Default Chart Tooltip

```typescript
@Component({
  template: `
    <ejs-pivotview
      [dataSourceSettings]="dataSourceSettings"
      [displayOption]="displayOption"
      [chartSettings]="chartSettings">
    </ejs-pivotview>
  `
})
export class PivotGridComponent {
  public displayOption = { view: 'Both' };
  
  public chartSettings = {
    type: 'Column',
    tooltip: {
      enable: true,
      format: '<b>${point.x}</b> : ${point.y}'
    }
  };
}
```

### Custom Chart Tooltip

```typescript
public chartSettings = {
  type: 'Column',
  tooltip: {
    enable: true,
    template: '<div style="background: #e3f2fd; padding: 8px;">${point.x}: ${point.y}</div>'
  }
};
```

---

## Styling Tooltips

### CSS Styling

```typescript
@Component({
  template: `
    <ejs-pivotview
      [tooltipTemplate]="'styledTooltip'">
    </ejs-pivotview>
    
    <script id="styledTooltip" type="text/x-template">
      <div class='custom-tooltip'>
        <div>${rowHeaders}</div>
        <div>${value}</div>
      </div>
    </script>
    
    <style>
      .custom-tooltip {
        background-color: #fff;
        border: 2px solid #4CAF50;
        border-radius: 4px;
        padding: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        font-family: Arial, sans-serif;
        font-size: 13px;
      }
      .custom-tooltip > div {
        margin: 4px 0;
      }
    </style>
  `
})
export class PivotGridComponent { }
```

### Dark Mode Tooltip

```typescript
<script id="darkTooltip" type="text/x-template">
  <div class='dark-tooltip'>
    <table>
      <tr>
        <td class='label'>Row:</td>
        <td>${rowHeaders}</td>
      </tr>
      <tr>
        <td class='label'>Column:</td>
        <td>${columnHeaders}</td>
      </tr>
      <tr>
        <td class='label'>Value:</td>
        <td class='amount'>${value}</td>
      </tr>
    </table>
  </div>
</script>

<style>
  .dark-tooltip {
    background-color: #1e1e1e;
    color: #e0e0e0;
    padding: 12px;
    border-radius: 4px;
    border-left: 4px solid #4CAF50;
    min-width: 200px;
  }
  .dark-tooltip table {
    border-collapse: collapse;
    width: 100%;
  }
  .dark-tooltip td {
    padding: 4px 8px;
  }
  .dark-tooltip .label {
    font-weight: bold;
    color: #4CAF50;
    width: 70px;
  }
  .dark-tooltip .amount {
    font-weight: bold;
    color: #fff;
  }
</style>
```

---

## Dynamic Tooltips

### Conditional Content

```typescript
@Component({
  template: `
    <ejs-pivotview
      [dataSourceSettings]="dataSourceSettings"
      [tooltipTemplate]="'conditionalTooltip'"
      (tooltipRender)="onTooltipRender($event)">
    </ejs-pivotview>
    
    <script id="conditionalTooltip" type="text/x-template">
      <div class='tooltip'>
        <div>${rowHeaders} - ${columnHeaders}</div>
        <div style='color: #${getValueColor()}; font-weight: bold;'>
          ${value}
        </div>
      </div>
    </script>
  `
})
export class PivotGridComponent {
  onTooltipRender(args: any): void {
    const value = parseFloat(args.value);
    
    // Change tooltip style based on value
    if (value > 50000) {
      args.tooltip.content = 
        `<div style='background: #c8e6c9;'>${args.value}</div>`;
    } else if (value < 10000) {
      args.tooltip.content = 
        `<div style='background: #ffcccc;'>${args.value}</div>`;
    }
  }
}
```

### Location-Based Tooltips

```typescript
@Component({
  template: `
    <ejs-pivotview
      [tooltipTemplate]="'locationTooltip'"
      (cellClick)="onCellClick($event)">
    </ejs-pivotview>
  `
})
export class PivotGridComponent {
  onCellClick(args: any): void {
    // Show different tooltip based on cell location
    if (args.rowIndex === 0) {
      // Header row - show summary info
    } else if (args.columnIndex === 0) {
      // Label column - show dimension info
    } else {
      // Data cell - show value info
    }
  }
}
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tooltip not showing | Set `showTooltip: true` |
| Template not applied | Verify template element ID matches `tooltipTemplate` |
| Placeholders show raw text | Use backticks: `${rowHeaders}` |
| Style not applied | Check CSS class names match template |
| Chart tooltip conflict | Use separate `tooltip.template` in chartSettings |
| Tooltip appears off-screen | CSS may need `z-index` adjustment |

---

## Best Practices

1. **Keep tooltips concise** - Show essential info only
2. **Use consistent styling** - Match application theme
3. **Avoid clutter** - Don't show all available data
4. **Consider mobile** - Tooltips may not work well on touch devices
5. **Performance** - Complex templates may impact rendering
