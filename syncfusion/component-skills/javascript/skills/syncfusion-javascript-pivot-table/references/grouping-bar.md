# Grouping Bar in Pivot View

## Overview

The Grouping Bar is an interactive component that displays fields from your data source and allows users to drag and drop fields between different axes (rows, columns, values, and filters) to create and modify pivot table reports at runtime. It provides intuitive interactions similar to Microsoft Excel, making report creation accessible to users without coding knowledge.

## When to Use

Use the Grouping Bar when you need to:
- Allow users to dynamically rearrange pivot table fields
- Enable drag-and-drop field operations without requiring a separate field list
- Provide quick access to field manipulation directly above the pivot table
- Support interactive filtering and sorting through the UI
- Create user-friendly dashboards where users can customize their view
- Minimize screen space while maintaining field management capabilities

## Basic Setup

To enable the Grouping Bar, set the `showGroupingBar` property to `true` and inject the `GroupingBar` module:

```typescript
import { PivotView, IDataSet, GroupingBar } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(GroupingBar);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        allowLabelFilter: true,
        allowValueFilter: true,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showGroupingBar: true,
    height: 340
});

pivotTableObj.appendTo('#PivotTable');
```

## Grouping Bar Interactions

The grouping bar provides these key features:

- **Drag-and-Drop**: Reorder fields between row, column, value, and filter axes
- **Remove Fields**: Click the remove icon to remove fields from the report
- **Filter Members**: Click filter icon to select/deselect members
- **Sort Members**: Click sort icon to change sort order
- **Add Fields**: Use the fields panel to add new fields to the report

## Showing or Hiding the Fields Panel

The fields panel displays all available fields from your data source that aren't currently used in the pivot table. Users can drag these fields to any axis.

```typescript
import { PivotView, IDataSet, GroupingBar } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(GroupingBar);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        columns: [{ name: 'Year', caption: 'Production Year' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }],
        rows: [{ name: 'Country' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showGroupingBar: true,
    groupingBarSettings: {
        showFieldsPanel: true  // Display available fields panel
    },
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

## Controlling Filter Icons

### Hide All Filter Icons

Hide the filter icon for all fields in the grouping bar:

```typescript
import { PivotView, IDataSet, GroupingBar } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(GroupingBar);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showGroupingBar: true,
    groupingBarSettings: {
        showFilterIcon: false  // Hide all filter icons
    },
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

### Hide Filter Icon for Specific Fields

Hide the filter icon for individual fields:

```typescript
import { PivotView, IDataSet, GroupingBar } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(GroupingBar);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter', showFilterIcon: false }  // Hide filter for Quarter
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [
            { name: 'Country' },
            { name: 'Products', showFilterIcon: false }  // Hide filter for Products
        ],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showGroupingBar: true,
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

## Controlling Sort Icons

### Hide All Sort Icons

```typescript
import { PivotView, IDataSet, GroupingBar } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(GroupingBar);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showGroupingBar: true,
    groupingBarSettings: {
        showSortIcon: false  // Hide all sort icons
    },
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

### Hide Sort Icon for Specific Fields

```typescript
import { PivotView, IDataSet, GroupingBar } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(GroupingBar);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter', showSortIcon: false }  // No sort icon
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [
            { name: 'Country', showSortIcon: false },  // No sort icon
            { name: 'Products' }
        ],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showGroupingBar: true,
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

## Advanced Example: Customized Grouping Bar

```typescript
import { PivotView, IDataSet, GroupingBar } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(GroupingBar);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        allowLabelFilter: true,
        allowValueFilter: true,
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter', showFilterIcon: true, showSortIcon: true }
        ],
        values: [{ name: 'Sold', caption: 'Units Sold' }],
        rows: [
            { name: 'Country', showFilterIcon: true, showSortIcon: false },
            { name: 'Products', showFilterIcon: false, showSortIcon: true }
        ],
        filters: []
    },
    showGroupingBar: true,
    groupingBarSettings: {
        showFieldsPanel: true,           // Show available fields
        showFilterIcon: true,             // Show filter icons by default
        showSortIcon: true,               // Show sort icons by default
        allowDragAndDrop: true            // Enable drag-and-drop
    },
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

## Programmatic Field Manipulation

### Add/Remove Fields Dynamically

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView;

// Add a field to rows
function addToRows(fieldName: string) {
    const settings = pivotTableObj.dataSourceSettings;
    settings.rows.push({ name: fieldName });
    pivotTableObj.dataSourceSettings = settings;
}

// Remove a field from columns
function removeFromColumns(fieldName: string) {
    const settings = pivotTableObj.dataSourceSettings;
    settings.columns = settings.columns.filter(f => f.name !== fieldName);
    pivotTableObj.dataSourceSettings = settings;
}

// Move field from rows to values
function moveToValues(fieldName: string) {
    const settings = pivotTableObj.dataSourceSettings;
    settings.rows = settings.rows.filter(f => f.name !== fieldName);
    settings.values.push({ name: fieldName });
    pivotTableObj.dataSourceSettings = settings;
}

// Clear grouping bar
function clearGroupingBar() {
    pivotTableObj.dataSourceSettings = {
        dataSource: pivotTableObj.dataSourceSettings.dataSource,
        rows: [],
        columns: [],
        values: [],
        filters: []
    };
}
```

## Common Patterns

### Pattern 1: Grouping Bar with Field List

Combine grouping bar with field list for maximum flexibility:

```typescript
import { PivotView, GroupingBar, FieldList } from '@syncfusion/ej2-pivotview';

PivotView.Inject(GroupingBar, FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    showGroupingBar: true,
    showFieldList: true,  // Show both
    height: 350
});
```

### Pattern 2: Read-Only Grouping Bar (Display Only)

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    showGroupingBar: true,
    groupingBarSettings: {
        allowDragAndDrop: false        // Disable drag-and-drop
    },
    height: 350
});
```

### Pattern 3: Minimal Grouping Bar

Show grouping bar with limited options:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    showGroupingBar: true,
    groupingBarSettings: {
        showFieldsPanel: false,        // Hide fields panel
        showFilterIcon: false,         // Hide filter icons
        showSortIcon: false            // Hide sort icons
    },
    height: 350
});
```

## Grouping Bar Events

### Responding to Grouping Changes

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    showGroupingBar: true,
    
    // Triggered when pivot configuration changes
    pivotItemsUpdated: (args) => {
        console.log('Fields updated:', {
            rows: args.dataSourceSettings.rows,
            columns: args.dataSourceSettings.columns,
            values: args.dataSourceSettings.values
        });
    },
    
    // Triggered when field is dragged
    fieldDragStart: (args) => {
        console.log('Field drag started:', args.fieldItem);
    },
    
    // Triggered after field is dropped
    fieldDrop: (args) => {
        console.log('Field dropped into:', args.dropAxis);
    }
});
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showGroupingBar` | boolean | false | Shows/hides the grouping bar |
| `groupingBarSettings` | GroupingBarSettings | — | Configuration object for grouping bar |

### GroupingBarSettings Object

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showFieldsPanel` | boolean | true | Shows/hides available fields panel |
| `showFilterIcon` | boolean | true | Shows/hides filter icons |
| `showSortIcon` | boolean | true | Shows/hides sort icons |
| `allowDragAndDrop` | boolean | true | Enables/disables drag-and-drop |

### Field Level Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showFilterIcon` | boolean | true | Shows/hides filter icon for specific field |
| `showSortIcon` | boolean | true | Shows/hides sort icon for specific field |
| `allowDragAndDrop` | boolean | true | Enables/disables drag-and-drop for field |

## Troubleshooting

### Grouping Bar Not Appearing

**Problem:** Grouping bar doesn't show up
- Ensure `GroupingBar` module is injected: `PivotView.Inject(GroupingBar)`
- Verify `showGroupingBar` is set to `true`
- Check that pivot table container has sufficient height

### Drag-and-Drop Not Working

**Problem:** Fields can't be dragged or dropped
- Check `allowDragAndDrop` is not set to `false` in grouping bar settings
- Verify browser supports drag-and-drop (most modern browsers do)
- Check for JavaScript errors in console

### Icons Not Showing

**Problem:** Filter/sort icons don't appear
- Verify `showFilterIcon` and `showSortIcon` are set to `true`
- Check that fields have those icons enabled individually
- Ensure browser zoom level is 100%

## Best Practices

1. **Inject GroupingBar module** - Always inject before using
2. **Choose fields carefully** - Only make necessary fields filterable and sortable
3. **Use fields panel** - Enable it for dashboards where users add custom fields
4. **Prevent drag when needed** - Disable drag-and-drop for fixed fields
5. **Test on target devices** - Verify drag-and-drop on mobile/tablet if needed
6. **Handle field limits** - Monitor pivot configuration to ensure it doesn't become too complex
7. **Combine with field list** - Use both for maximum user flexibility


