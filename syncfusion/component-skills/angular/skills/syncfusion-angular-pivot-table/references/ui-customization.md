# UI Customization

## Table of Contents
- [Toolbar Overview](#toolbar-overview)
- [Built-in Toolbar Options](#built-in-toolbar-options)
- [Report Management](#report-management)
- [Chart Integration](#chart-integration)
- [Export Options](#export-options)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Grand Totals](#grand-totals)
- [Sub-Totals](#sub-totals)
- [Totals Positioning](#totals-positioning)
- [Configuration Examples](#configuration-examples)

---

## Toolbar Overview

The toolbar provides quick access to frequently used operations including report management, chart switching, data export, and summary customization.

### Enable Toolbar

```typescript
@Component({
    template: `<ejs-pivotview 
      [dataSourceSettings]=dataSourceSettings
      [showToolbar]="true"
      [toolbar]="toolbarOptions">
    </ejs-pivotview>`
})
export class AppComponent {
    toolbarOptions = ['New', 'Save', 'Grid', 'Chart', 'Export'];
}
```

---

## Built-in Toolbar Options

| Option | Action |
|--------|--------|
| **New** | Creates new report |
| **Save** | Saves current report |
| **SaveAs** | Saves with new name |
| **Rename** | Changes report name |
| **Delete** | Removes report |
| **Load** | Opens saved report |
| **Grid** | Display pivot table |
| **Chart** | Display pivot chart |
| **Export** | Export to Excel/PDF/CSV |
| **SubTotal** | Toggle subtotals visibility |
| **GrandTotal** | Toggle grand totals visibility |
| **ConditionalFormatting** | Apply conditional rules |
| **NumberFormatting** | Format numbers |
| **FieldList** | Open field list dialog |
| **MDX** | Show MDX query (OLAP) |

---

## Report Management

Enable save, load, rename, and delete operations:

```typescript
toolbarOptions: ['New', 'Save', 'SaveAs', 'Rename', 'Delete', 'Load']
```

### Save/Load Reports

```typescript
// Get report as JSON
const reportData = this.pivotGrid.getPersistData();

// Load report
this.pivotGrid.dataSourceSettings = JSON.parse(reportData);
this.pivotGrid.refresh();
```

Use localStorage, database, or server for persistence.

---

## Chart Integration

### Switch Between Grid and Chart

```typescript
toolbarOptions: ['Grid', 'Chart']
```

### Customize Chart Types

```typescript
chartTypes: [
    'Column',
    'Bar',
    'Line',
    'Area',
    'Pie',
    'Doughnut'
]
```

### Legend and Axes Control

- Show/hide legend in dropdown
- Toggle between single and multiple axes
- Available modes: Stacked, Single, Combined

---

## Export Options

### Enable Exports

```typescript
toolbarOptions: ['Export']
```

Supported formats:
- **Excel (.xlsx)** - Full pivot table export
- **PDF** - Formatted pivot table or chart
- **CSV** - Comma-separated values
- **Image** - PNG/JPEG for charts

### Programmatic Export

```typescript
this.pivotGrid.excelExport();
this.pivotGrid.pdfExport();
this.pivotGrid.csvExport();
```

---

## Custom Toolbar Items

Add custom buttons using toolbarRender event:

```typescript
@Component({
    template: `<ejs-pivotview 
      [showToolbar]="true"
      [toolbar]="toolbarOptions"
      (toolbarRender)="onToolbarRender($event)">
    </ejs-pivotview>`
})
export class AppComponent {
    toolbarOptions = ['Grid', 'Chart'];

    onToolbarRender(args: ToolbarRenderEventArgs) {
        args.toolbar.splice(1, 0, {
            prefixIcon: 'e-icon-custom',
            text: 'Refresh',
            click: () => this.refreshData()
        });
    }

    refreshData() {
        this.pivotView.refresh();
    }
}
```

### Custom Toolbar Template

```typescript
<div id="customToolbar">
    <button (click)="expandAll()">Expand All</button>
    <button (click)="collapseAll()">Collapse All</button>
</div>

<ejs-pivotview 
  [toolbarTemplate]="'customToolbar'">
</ejs-pivotview>
```

---

## Grand Totals

Display overall aggregates across all data.

### Show/Hide Grand Totals

```typescript
dataSourceSettings: {
    showGrandTotals: true,           // All grand totals
    showRowGrandTotals: true,        // Row totals
    showColumnGrandTotals: true      // Column totals
}
```

### Position Grand Totals

```typescript
dataSourceSettings: {
    grandTotalsPosition: 'Bottom'    // 'Top' or 'Bottom' (default)
}
```

### Enable Toolbar Control

Include toolbar option:

```typescript
toolbarOptions: ['GrandTotal']  // User-clickable toggle
```

---

## Sub-Totals

Display intermediate summaries for each group.

### Show/Hide Sub-Totals

```typescript
dataSourceSettings: {
    showSubTotals: true,            // All sub-totals
    showRowSubTotals: true,         // Row totals
    showColumnSubTotals: true       // Column totals
}
```

### Per-Field Control

```typescript
dataSourceSettings: {
    rows: [
        { name: 'Country', showSubTotals: true },
        { name: 'Region', showSubTotals: false }
    ]
}
```

### Enable Toolbar Control

```typescript
toolbarOptions: ['SubTotal']  // User-clickable toggle
```

---

## Totals Positioning

### Sub-Totals Position

```typescript
dataSourceSettings: {
    subTotalsPosition: 'Auto'  // 'Top', 'Bottom', or 'Auto' (default)
}
```

| Position | Behavior |
|----------|----------|
| **Auto** | Intelligent placement (rows top, columns bottom) |
| **Top** | Above/left of group data |
| **Bottom** | Below/right of group data |

---

## Configuration Examples

### Complete Feature Set

```typescript
showToolbar: true,
toolbar: [
    'New', 'Save', 'SaveAs', 'Rename', 'Delete', 'Load',
    'Grid', 'Chart',
    'Export',
    'SubTotal', 'GrandTotal',
    'ConditionalFormatting', 'NumberFormatting',
    'FieldList'
],
dataSourceSettings: {
    showGrandTotals: true,
    showSubTotals: true,
    grandTotalsPosition: 'Bottom',
    subTotalsPosition: 'Auto'
}
```

### Minimal Configuration

```typescript
showToolbar: true,
toolbar: ['Grid', 'Chart', 'Export'],
dataSourceSettings: {
    showGrandTotals: true,
    showSubTotals: true
}
```

### Report Management Only

```typescript
showToolbar: true,
toolbar: ['New', 'Save', 'Load', 'Delete'],
dataSourceSettings: {
    showGrandTotals: true,
    showSubTotals: true
}
```

### Analysis Focused

```typescript
showToolbar: true,
toolbar: [
    'ConditionalFormatting',
    'NumberFormatting',
    'FieldList',
    'GrandTotal',
    'SubTotal'
],
dataSourceSettings: {
    showGrandTotals: true,
    showSubTotals: true,
    grandTotalsPosition: 'Top',
    subTotalsPosition: 'Top'
}
```

---

## Best Practices

1. **Show Only Needed Options** - Reduce toolbar clutter
2. **Organize Logically** - Group related items
3. **Enable Report Management** - For user flexibility
4. **Support Both Views** - Offer grid and chart modes
5. **Control Total Visibility** - Let users adjust displays
6. **Use Consistent Positioning** - Same position throughout
7. **Test Export Quality** - Verify formatted output
8. **Provide Toolbar Feedback** - Show current state
