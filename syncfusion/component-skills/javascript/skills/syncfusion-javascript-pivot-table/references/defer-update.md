# Defer Update in Pivot View

## Overview

Defer layout update delays pivot table recalculation until the user explicitly applies changes. When enabled, users can perform multiple operations (drag fields, add filters, change aggregations, sort) without the pivot table updating after each action. The table updates only when the "Apply" button is clicked. This dramatically improves performance when making multiple simultaneous changes.

## When to Use

Use defer update when you need to:
- Allow users to make multiple field changes at once
- Improve performance during bulk configuration changes  
- Reduce unnecessary intermediate calculations
- Provide explicit confirmation before applying changes
- Combine multiple operations into single update
- Create focused interactive workflows

## Basic Setup with In-Built Field List

Enable defer layout update and show the field list:

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
    allowDeferLayoutUpdate: true,  // Enable defer update
    showFieldList: true,           // Show field list popup
    height: 350
});

pivotTableObj.appendTo('#PivotTable');
```

**How It Works:**
- Field list shows an "Apply" button instead of immediate updates
- Users can drag fields, modify filters, change aggregations
- Pivot table remains unchanged until "Apply" is clicked
- All changes apply in a single batch operation

## Setup with Stand-Alone Field List

Use defer update with a fixed field list component:

```typescript
import { PivotView, IDataSet, PivotFieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    allowDeferLayoutUpdate: true,  // Enable defer update
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
        allowLabelFilter: true,
        allowValueFilter: true,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    allowDeferLayoutUpdate: true,  // Enable defer update
    renderMode: 'Fixed',           // Fixed position field list
    enginePopulated: (): void => {
        if (fieldlistObj.isRequiredUpdate) {
            fieldlistObj.updateView(pivotTableObj);
        }
        pivotTableObj.notify('ui-update', pivotTableObj);
        fieldlistObj.notify('tree-view-update', fieldlistObj);
    }
});
fieldlistObj.appendTo('#Static_FieldList');
```

## Operations Deferred

When defer update is enabled, the following operations don't immediately update the pivot:

| Operation | Normal Behavior | With Defer |
|-----------|-----------------|-----------|
| Add field | Pivot updates | Field added, await Apply |
| Remove field | Pivot updates | Field removed, await Apply |
| Drag field between axes | Pivot updates | Field moved, await Apply |
| Change aggregation | Pivot updates | Type changed, await Apply |
| Apply filter | Pivot updates | Filter applied, await Apply |
| Sort field | Pivot updates | Sort applied, await Apply |
| Expand/collapse | Pivot updates | State changed, await Apply |

## Advanced Example: Complex Multi-Step Analysis

Create a workflow where users perform multiple changes before applying:

```typescript
import { PivotView, IDataSet, PivotFieldList, FieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    allowDeferLayoutUpdate: true,
    enginePopulated: () => {
        if (fieldlistObj) {
            fieldlistObj.update(pivotTableObj);
        }
    },
    height: 400
});
pivotTableObj.appendTo('#PivotTable');

let fieldlistObj: PivotFieldList = new PivotFieldList({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        allowLabelFilter: true,
        allowValueFilter: true,
        columns: [{ name: 'Year', caption: 'Production Year' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }],
        rows: [{ name: 'Country' }],
        filters: []
    },
    allowDeferLayoutUpdate: true,
    renderMode: 'Fixed',
    enginePopulated: (): void => {
        if (fieldlistObj.isRequiredUpdate) {
            fieldlistObj.updateView(pivotTableObj);
        }
    }
});
fieldlistObj.appendTo('#Static_FieldList');

// Track changes enabled by defer update
class AnalysisWorkflow {
    private changesMade: string[] = [];
    
    // Log when user makes changes (before Apply)
    logChange(action: string) {
        this.changesMade.push(action);
        this.updateChangesList();
    }
    
    updateChangesList() {
        const summary = document.getElementById('changeSummary');
        if (summary) {
            summary.innerHTML = `
                <h4>Pending Changes (${this.changesMade.length}):</h4>
                <ul>
                    ${this.changesMade.map(c => `<li>${c}</li>`).join('')}
                </ul>
            `;
        }
    }
    
    // Apply all changes at once
    applyAll() {
        console.log('Applying all deferred changes:', this.changesMade);
        this.changesMade = [];
        this.updateChangesList();
    }
    
    // Cancel pending changes
    reset() {
        this.changesMade = [];
        this.updateChangesList();
    }
}

const workflow = new AnalysisWorkflow();

// Example: Trigger when Apply is clicked
document.getElementById('applyBtn').onclick = () => {
    workflow.applyAll();
};

document.getElementById('resetBtn').onclick = () => {
    workflow.reset();
    // Reset field list to original state
    fieldlistObj = new PivotFieldList({
        /* ... original config ... */
    });
};
```

## Performance Benefits

### Scenario: Changing 5 Fields from Rows to Columns

**Without Defer Update:**
- Change field 1 → Pivot recalculates (2s)
- Change field 2 → Pivot recalculates (2s)
- Change field 3 → Pivot recalculates (2s)
- Change field 4 → Pivot recalculates (2s)
- Change field 5 → Pivot recalculates (2s)
- **Total: 10 seconds** with 5 intermediate renders

**With Defer Update:**
- Change field 1 → No update
- Change field 2 → No update
- Change field 3 → No update
- Change field 4 → No update
- Change field 5 → No update
- Click Apply → Pivot recalculates once (2s)
- **Total: 2 seconds** with 1 final render

**Improvement: 5x faster** ✅

## Programmatic Control

Manage defer update through code:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView;

// Manually apply deferred changes
function applyChanges() {
    // Force update with current field configuration
    pivotTableObj.dataSourceSettings = pivotTableObj.dataSourceSettings;
}

// Monitor if changes are pending
function changesPending(): boolean {
    // Check if field list has pending modifications
    return fieldlistObj?.isRequiredUpdate || false;
}

// Query current field configuration (without updating pivot)
function getCurrentConfig() {
    return {
        rows: pivotTableObj.dataSourceSettings.rows,
        columns: pivotTableObj.dataSourceSettings.columns,
        values: pivotTableObj.dataSourceSettings.values,
        filters: pivotTableObj.dataSourceSettings.filters
    };
}

// Clear pending changes without applying
function discardChanges() {
    if (fieldlistObj) {
        // Reset field list to last applied state
        fieldlistObj.dataSourceSettings = pivotTableObj.dataSourceSettings;
        fieldlistObj.updateView(pivotTableObj);
    }
}
```

## Combining with Other Features

### Defer Update + Grouping Bar

Works with grouping bar for drag-and-drop:

```typescript
import { PivotView, GroupingBar, FieldList } from '@syncfusion/ej2-pivotview';

PivotView.Inject(GroupingBar, FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    allowDeferLayoutUpdate: true,
    showGroupingBar: true,     // Also show grouping bar
    showFieldList: true,       // And field list
    height: 350
});
```

### Defer Update + Custom UI State

Track and display pending changes:

```typescript
let pivotTableObj: PivotView = new PivotView({
    allowDeferLayoutUpdate: true,
    showFieldList: true,
    
    // Notify when changes occur
    pivotItemsUpdated: (args) => {
        updateUIToShowPendingChanges();
    }
});

function updateUIToShowPendingChanges() {
    const hasPending = fieldlistObj?.isRequiredUpdate;
    document.getElementById('applyBtn').disabled = !hasPending;
    document.getElementById('applyBtn').innerText = 
        hasPending ? 'Apply Changes (' + getChangeCount() + ')' : 'No Changes';
}

function getChangeCount(): number {
    // Could count actual changes if tracking
    return 1; // Simplified
}
```

## Common Patterns

### Pattern 1: Simple Deferred Analysis

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    allowDeferLayoutUpdate: true,
    showFieldList: true,
    height: 350
});
```

### Pattern 2: Fixed Field List + Defer

```typescript
let pivotTableObj: PivotView = new PivotView({
    allowDeferLayoutUpdate: true,
    enginePopulated: () => fieldlistObj?.update(pivotTableObj),
    height: 350
});

let fieldlistObj: PivotFieldList = new PivotFieldList({
    dataSourceSettings: { /* ... */ },
    allowDeferLayoutUpdate: true,
    renderMode: 'Fixed',
    enginePopulated: () => fieldlistObj?.updateView(pivotTableObj)
});
```

### Pattern 3: Grouping Bar + Defer

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    allowDeferLayoutUpdate: true,
    showGroupingBar: true,
    showFieldList: true,
    height: 350
});
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowDeferLayoutUpdate` | boolean | false | Enables/disables defer layout update |

### Related Properties

| Property | Type | Description |
|----------|------|-------------|
| `isRequiredUpdate` | boolean | (FieldList) Indicates if updates are pending |

## Troubleshooting

### Defer Update Not Working

**Problem:** Changes update immediately even with defer enabled
- Verify `allowDeferLayoutUpdate` is set to `true`
- Check that field list or grouping bar is visible
- Ensure FieldList or GroupingBar module is injected
- Look for JavaScript errors in console

### Apply Button Not Appearing

**Problem:** No Apply button visible in field list
- Verify `allowDeferLayoutUpdate` is enabled
- Check that field list is properly rendered
- Ensure field list components are visible on page

### Performance Not Improved

**Problem:** Still slow even with defer update enabled
- Check if users are actually using defer (clicking Apply)
- Verify multiple operations are being deferred
- Consider combining with compression or paging
- Profile to confirm defer is actually active

## Best Practices

1. **Always show Apply button clearly** - Users must know changes are deferred
2. **Provide change summary** - Let users see pending modifications
3. **Offer Cancel option** - Allow discarding changes without applying
4. **Combine with other optimizations** - Use with compression for very large data
5. **Test user workflow** - Verify defer improves your specific use case
6. **Document feature** - Explain defer update behavior to end users
7. **Monitor performance** - Measure actual improvement in your application
8. **Use with grouping bar** - Natural fit for drag-and-drop operations

## See Also

- [Syncfusion Defer Update Documentation](https://ej2.syncfusion.com/javascript/documentation/pivotview/field-list/#defer-layout-update)
