# Field List in Pivot View

## Overview

The Field List provides a user-friendly interface similar to Microsoft Excel that allows you to interactively add or remove fields and move them between different axes (rows, columns, values, and filters). This component is essential for allowing end-users to dynamically create their own pivot table reports without requiring code changes.

The Field List can be displayed in two different ways:
- **In-built Field List (Popup)** - Shows a field list icon in the Pivot Table interface
- **Stand-alone Field List (Fixed)** - Displays the field list in a fixed position alongside the Pivot Table

## When to Use

Use the Field List when you need to:
- Allow users to dynamically configure pivot table layout
- Enable drag-and-drop field operations
- Provide interactive report creation interface
- Give end-users control over data analysis without code knowledge
- Create adaptive dashboards that respond to user preferences
- Offer both quick-access (popup) and persistent (fixed) field management

## In-Built Field List (Popup)

### Basic Setup

The built-in field list provides quick access to modify your Pivot Table report settings. It appears as an icon that opens in a dialog box when clicked.

To enable the in-built field list:

```typescript
import { PivotView, IDataSet, FieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        allowLabelFilter: true,
        allowValueFilter: true,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showFieldList: true,  // Enable field list popup
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

**Key Properties:**
- `showFieldList` - Set to `true` to display the field list icon
- The field list icon appears in the top-left corner of the Pivot Table (top-right if grouping bar is enabled)

## Stand-Alone Field List (Fixed)

### Basic Setup

The stand-alone Field List allows users to keep the Field List visible permanently on the page:

```typescript
import { PivotView, IDataSet, PivotFieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

// Initialize Pivot Table
let pivotTableObj: PivotView = new PivotView({
    enginePopulated: () => {
        if (fieldlistObj) {
            fieldlistObj.update(pivotTableObj);
        }
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');

// Initialize Stand-Alone Field List
let fieldlistObj: PivotFieldList = new PivotFieldList({
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
    renderMode: 'Fixed',  // Display in fixed position
    enginePopulated: (): void => {
        fieldlistObj.updateView(pivotTableObj);
    }
});
fieldlistObj.appendTo('#Static_FieldList');
```

**Key Properties:**
- `renderMode: 'Fixed'` - Displays field list at a fixed position
- `updateView()` - Synchronizes field list with pivot table view
- `update()` - Synchronizes pivot table with field list data source changes

## Popup Field List with External Button

### Dynamic Field List Opening

You can open the Field List dialog independently using an external button:

```typescript
import { PivotView, IDataSet, PivotFieldList } from '@syncfusion/ej2-pivotview';
import { Button } from '@syncfusion/ej2-buttons';
import { pivotData } from './datasource.ts';

// Initialize Pivot Table
let pivotTableObj: PivotView = new PivotView({
    enginePopulated: () => {
        if (fieldlistObj) {
            fieldlistObj.update(pivotTableObj);
        }
    },
    height: 320
});
pivotTableObj.appendTo('#PivotTable');

// Initialize Customized Popup Field List
let fieldlistObj: PivotFieldList = new PivotFieldList({
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
    renderMode: 'Popup',  // Display as popup dialog
    target: '#PivotFieldList',
    enginePopulated: (): void => {
        fieldlistObj.updateView(pivotTableObj);
    }
});
fieldlistObj.appendTo('#PivotFieldList');

// Create button to open field list
let fieldListBtn: Button = new Button({ isPrimary: true });
fieldListBtn.appendTo('#fieldlistbtn');

// Handle button click to show field list dialog
document.getElementById('fieldlistbtn').onclick = function () {
    fieldlistObj.dialogRenderer.fieldListDialog.show();
};
```

**HTML Structure:**
```html
<button id="fieldlistbtn">Show Field List</button>
<div id="PivotTable"></div>
<div id="PivotFieldList"></div>
```

## Field Search Functionality

### Enabling Field Search

Enable the field search option to help users quickly locate specific fields:

```typescript
import { PivotView, IDataSet, PivotFieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    enginePopulated: () => {
        if (fieldlistObj) {
            fieldlistObj.update(pivotTableObj);
        }
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');

let fieldlistObj: PivotFieldList = new PivotFieldList({
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
    renderMode: 'Fixed',
    enableFieldSearching: true,  // Enable field search
    enginePopulated: (): void => {
        fieldlistObj.updateView(pivotTableObj);
    }
});
fieldlistObj.appendTo('#Static_FieldList');
```

## Advanced Example: Synchronized Multiple Pivot Tables

Manage multiple pivot tables with a single field list:

```typescript
import { PivotView, IDataSet, PivotFieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

// First Pivot Table
let pivotTable1: PivotView = new PivotView({
    enginePopulated: () => {
        if (fieldlistObj) {
            fieldlistObj.update(pivotTable1);
        }
    },
    height: 300
});
pivotTable1.appendTo('#PivotTable1');

// Second Pivot Table
let pivotTable2: PivotView = new PivotView({
    enginePopulated: () => {
        if (fieldlistObj) {
            fieldlistObj.update(pivotTable2);
        }
    },
    height: 300
});
pivotTable2.appendTo('#PivotTable2');

// Shared Field List
let fieldlistObj: PivotFieldList = new PivotFieldList({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year', caption: 'Production Year' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }],
        rows: [{ name: 'Country' }],
        filters: []
    },
    renderMode: 'Fixed',
    enginePopulated: (): void => {
        // Update the last active pivot table
        if (lastActivePivot) {
            fieldlistObj.updateView(lastActivePivot);
        }
    }
});
fieldlistObj.appendTo('#SharedFieldList');

let lastActivePivot: PivotView;

// Track which table is active
pivotTable1.pivotItemsUpdated = () => {
    lastActivePivot = pivotTable1;
};

pivotTable2.pivotItemsUpdated = () => {
    lastActivePivot = pivotTable2;
};
```

## Field List Operations

### Programmatic Field Manipulation

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView;

// Add a field to rows
function addFieldToRows(fieldName: string) {
    const settings = pivotTableObj.dataSourceSettings;
    settings.rows = settings.rows.concat([{ name: fieldName }]);
    pivotTableObj.dataSourceSettings = settings;
}

// Remove a field from columns
function removeFieldFromColumns(fieldName: string) {
    const settings = pivotTableObj.dataSourceSettings;
    settings.columns = settings.columns.filter(field => field.name !== fieldName);
    pivotTableObj.dataSourceSettings = settings;
}

// Move field from rows to columns
function moveFieldToColumns(fieldName: string) {
    const settings = pivotTableObj.dataSourceSettings;
    settings.rows = settings.rows.filter(field => field.name !== fieldName);
    settings.columns = settings.columns.concat([{ name: fieldName }]);
    pivotTableObj.dataSourceSettings = settings;
}

// Clear all fields
function clearAllFields() {
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

### Pattern 1: Responsive Field List

```typescript
import { PivotView, PivotFieldList } from '@syncfusion/ej2-pivotview';

let fieldlistObj: PivotFieldList = new PivotFieldList({
    dataSourceSettings: { /* ... */ },
    renderMode: 'Adaptive',  // Automatically switches between fixed and popup based on screen size
    enableFieldSearching: true,
    height: 'auto'
});
```

### Pattern 2: Field List with Custom Filtering

```typescript
let fieldlistObj: PivotFieldList = new PivotFieldList({
    dataSourceSettings: {
        // ... dataSource settings ...,
        allowLabelFilter: true,
        allowValueFilter: true,
        allowMemberFilter: true
    },
    // ... other settings ...
});
```

### Pattern 3: Restrict Field Movements

```typescript
// Create field list with specific fields locked to axes
let fieldlistObj: PivotFieldList = new PivotFieldList({
    dataSourceSettings: {
        columns: [{ name: 'Year', caption: 'Production Year', allowDragAndDrop: false }],
        rows: [{ name: 'Country', allowDragAndDrop: false }],
        values: [{ name: 'Sold', caption: 'Units Sold' }],
        // ... other settings ...
    }
});
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showFieldList` | boolean | false | Shows/hides field list popup icon in pivot table |
| `renderMode` | string | 'Popup' | Display mode: 'Popup', 'Fixed', or 'Adaptive' |
| `enableFieldSearching` | boolean | false | Enables field search in field list |
| `target` | string | null | Target element for popup field list |

### Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `update(pivotView)` | PivotView | void | Synchronizes field list with pivot table |
| `updateView(pivotView)` | PivotView | void | Updates field list view based on pivot table |

## Common Issues & Solutions

### Field List Not Showing

**Problem:** Field list popup or fixed area doesn't appear
- Ensure `FieldList` module is injected: `PivotView.Inject(FieldList)`
- Verify `showFieldList` is set to `true` for popup mode
- Check that `appendTo()` is called with correct element ID

### Synchronization Issues

**Problem:** Changes in field list don't reflect in pivot table
- Call `updateView()` and `update()` methods in `enginePopulated` event
- Ensure both components have the same data source settings
- Check browser console for JavaScript errors

### Field Search Not Working

**Problem:** Field search box doesn't appear or isn't filtering
- Set `enableFieldSearching: true` in field list configuration
- Verify field list has sufficient width to display search box
- Check that field names match field member names

## Best Practices

1. **Inject FieldList module** - Always inject the FieldList module before using
2. **Synchronize properly** - Use `updateView()` and `update()` in enginePopulated event
3. **Choose appropriate render mode** - Use Popup for space-constrained layouts, Fixed for dashboards
4. **Enable field search** - For large datasets with many fields, enable search functionality
5. **Test drag-and-drop** - Verify field drag-and-drop works smoothly on target browsers
6. **Handle responsive design** - Use Adaptive mode for apps supporting multiple screen sizes
7. **Validate field operations** - Check data integrity when fields are moved or removed


