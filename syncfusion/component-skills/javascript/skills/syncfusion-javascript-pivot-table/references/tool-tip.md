# Tool Tips in Pivot View

## Overview

Tool tips display contextual information when users hover over cells in the pivot table. They show the cell value along with row and column header details, helping users understand the data context without taking up permanent UI space. Tool tips can be customized with HTML templates for rich formatting and dynamic content.

## When to Use

Use tool tips when you need to:
- Display additional information on hover without permanent UI elements
- Provide context about cell values and aggregations
- Show row and column header information in a compact way
- Create rich, interactive user interfaces
- Customize tooltip appearance with HTML templates
- Improve user experience with informative feedback

## Basic Setup - Disabling Tooltips

By default, tooltips are enabled. To disable them:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showTooltip: false,  // Disable tooltips
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

**How It Works:**
- `showTooltip: true` (default) - Shows tooltips on hover
- `showTooltip: false` - Hides tooltips completely

## Default Tooltip Information

The default tooltip displays:
- Row header values
- Column header values  
- Value field name and aggregation type
- Formatted cell value
- Field information

**Default Display Example:**
```
France | FY 2015 | Q1
Units Sold: Sum
500
```

## Custom Tooltip Templates

Enhance tooltips with HTML templates using the `tooltipTemplate` property. Available template placeholders:

| Placeholder | Description |
|------------|-------------|
| `${rowHeaders}` | Row header values |
| `${columnHeaders}` | Column header values |
| `${rowFields}` | Row field names |
| `${columnFields}` | Column field names |
| `${valueField}` | Value field name |
| `${aggregateType}` | Aggregation type (Sum, Count, etc.) |
| `${value}` | Formatted cell value |

### Simple Custom Template

Create a custom template with placeholders:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    tooltipTemplate: '#TooltipTemplate',  // Reference template by ID
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

```html
<div id="TooltipTemplate">
    <div style="padding: 10px; background: #f0f0f0; border-radius: 5px;">
        <strong style="color: #0066cc;">${rowHeaders} - ${columnHeaders}</strong><br/>
        <span style="color: #666;">${aggregateType} of ${valueField}</span><br/>
        <span style="font-size: 16px; font-weight: bold; color: #000;">${value}</span>
    </div>
</div>
```

### Advanced Template with HTML

Create rich tooltips with custom styling:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    tooltipTemplate: '#AdvancedTemplate',
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

```html
<div id="AdvancedTemplate">
    <table style="border-collapse: collapse; width: 100%;">
        <tr>
            <td style="padding: 5px; font-weight: bold; color: #0066cc;">Location:</td>
            <td style="padding: 5px;">${rowHeaders}</td>
        </tr>
        <tr>
            <td style="padding: 5px; font-weight: bold; color: #0066cc;">Period:</td>
            <td style="padding: 5px;">${columnHeaders}</td>
        </tr>
        <tr style="background: #e8f4f8;">
            <td style="padding: 5px; font-weight: bold; color: #0066cc;">Metric:</td>
            <td style="padding: 5px;">${aggregateType} of ${valueField}</td>
        </tr>
        <tr style="background: #fff3cd;">
            <td style="padding: 5px; font-weight: bold; color: #d39e00;">Value:</td>
            <td style="padding: 5px; font-weight: bold; color: #d39e00;">${value}</td>
        </tr>
    </table>
</div>
```

## Tooltip for Grid and Chart

When displaying both grid and chart, configure tooltips for each:

```typescript
import { PivotView, IDataSet, PivotChart } from '@syncfusion/ej2-pivotview';

PivotView.Inject(PivotChart);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    displayOption: { view: 'Both', primary: 'Table' },
    
    // Pivot table tooltip
    tooltipTemplate: '#GridTooltip',
    
    // Pivot chart tooltip
    chartSettings: {
        value: 'Amount',
        chartSeries: { type: 'Column' },
        tooltip: { 
            template: '<span class="wrap">${aggregateType} of ${valueField}: ${value}</span>'
        }
    },
    
    showToolbar: true,
    toolbar: ['Grid', 'Chart'],
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

```html
<div id="GridTooltip">
    <div style="padding: 8px; background: rgba(0, 102, 204, 0.9); color: white; border-radius: 4px; font-size: 12px;">
        <div><strong>${rowHeaders}</strong></div>
        <div style="margin-top: 4px;">${columnHeaders}</div>
        <div style="margin-top: 6px; font-size: 14px; font-weight: bold;">${value}</div>
    </div>
</div>
```

## Programmatic Tooltip Control

Access and modify tooltip settings at runtime:

```typescript
// Check if tooltip is enabled
let isTooltipEnabled = pivotTableObj.showTooltip;

// Disable tooltip
pivotTableObj.showTooltip = false;

// Enable tooltip
pivotTableObj.showTooltip = true;

// Update tooltip template dynamically
pivotTableObj.tooltipTemplate = '#NewTemplate';

// Refresh to apply changes
pivotTableObj.refresh();
```

## Tooltip with Drill Operations

Combine tooltips with drill-down functionality:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    tooltipTemplate: '#DrillTooltip',
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

```html
<div id="DrillTooltip">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px; border-radius: 6px;">
        <div style="margin-bottom: 8px;">
            <strong style="font-size: 14px;">${rowHeaders}</strong> | ${columnHeaders}
        </div>
        <div style="background: rgba(255, 255, 255, 0.1); padding: 8px; border-radius: 4px; margin-top: 8px;">
            <div style="font-size: 11px; opacity: 0.9;">${aggregateType} of ${valueField}</div>
            <div style="font-size: 16px; font-weight: bold; margin-top: 4px;">${value}</div>
        </div>
        <div style="font-size: 10px; margin-top: 8px; opacity: 0.8;">Click to drill down</div>
    </div>
</div>
```

## Conditional Tooltip Templates

Display different templates based on values:

```typescript
// HTML with conditional styling
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    tooltipTemplate: '#ConditionalTemplate',
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

```html
<div id="ConditionalTemplate" style="padding: 10px; border-radius: 5px;">
    <!-- Green for high values -->
    <div style="background: #c8e6c9; color: #2e7d32; padding: 10px; border-radius: 4px;">
        <strong>${rowHeaders} - ${columnHeaders}</strong><br/>
        <span>${aggregateType}: ${value}</span>
    </div>
</div>
```

## Performance Considerations

### Large Datasets

With virtual scrolling or paging, tooltips are optimized for performance:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    enableVirtualization: true,  // Virtual scrolling
    enablePaging: true,          // Paging
    pageSettings: { pageSize: 50 },
    
    // Tooltips only show for visible cells
    showTooltip: true,
    tooltipTemplate: '#OptimizedTemplate',
    height: 350
});
```

### Template Complexity

Keep templates simple for better performance:

```html
<!-- Good: Simple template -->
<div id="SimpleTemplate">
    <strong>${value}</strong> - ${rowHeaders}
</div>

<!-- Avoid: Complex nested structures -->
<div id="ComplexTemplate">
    <!-- Too many nested divs and styles -->
</div>
```

## Common Patterns

### Pattern 1: Basic Tooltip

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    showTooltip: true,  // Enable (default)
    height: 350
});
```

### Pattern 2: Custom Template

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    tooltipTemplate: '#CustomTemplate',
    height: 350
});
```

### Pattern 3: Grid + Chart Tooltips

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    displayOption: { view: 'Both' },
    tooltipTemplate: '#GridTooltip',
    chartSettings: {
        tooltip: { template: '<span>${value}</span>' }
    }
});
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showTooltip` | boolean | true | Enable/disable tooltips |
| `tooltipTemplate` | string | undefined | HTML template ID for custom tooltips |

### Template Placeholders

| Placeholder | Type | Description |
|------------|------|-------------|
| `${rowHeaders}` | string | Row header value |
| `${columnHeaders}` | string | Column header value |
| `${rowFields}` | string | Row field names |
| `${columnFields}` | string | Column field names |
| `${valueField}` | string | Value field name |
| `${aggregateType}` | string | Aggregation type |
| `${value}` | string | Formatted cell value |

## Troubleshooting

### Tooltip Not Showing

**Problem:** Hovering over cells doesn't show tooltips
- Verify `showTooltip` is not set to `false`
- Check that template ID is correct if using custom template
- Ensure template element exists in HTML
- Look for JavaScript errors in console

### Template Not Rendering

**Problem:** Custom template shows placeholder text instead of values
- Verify all placeholders use correct syntax: `${placeholder}`
- Check that template element has correct ID
- Ensure tooltipTemplate references correct ID: `'#TemplateId'`
- Validate HTML syntax in template

### Tooltip Positioning Issues

**Problem:** Tooltip appears in wrong location
- Tooltips auto-position; ensure container has proper CSS
- Check z-index if tooltip is hidden behind other elements
- Verify no CSS overflow hidden on parent containers

## Best Practices

1. **Keep templates concise** - Faster rendering and better UX
2. **Use meaningful placeholders** - Show context, not just values
3. **Consistent styling** - Match your application theme
4. **Test on mobile** - Ensure tooltips work with touch interfaces
5. **Provide alternatives** - Don't rely on tooltips alone for critical info
6. **Optimize for performance** - Avoid complex template logic
7. **Validate template HTML** - Ensure proper syntax and tag closure
8. **Consider accessibility** - Add title attributes as fallback


