````markdown
# Field List

## Table of Contents
- [Field List Overview](#field-list-overview)
- [Field List Modes](#field-list-modes)
- [Field Management](#field-management)
- [Field Organization](#field-organization)
- [Deferred Updates](#deferred-updates)
- [Best Practices](#best-practices)

---

## Field List Overview

The Field List provides a user-friendly interface to organize and analyze data. You can add/remove fields, move them between different axes (rows, columns, values, filters), apply sorting, and manage field visibility. Similar to Microsoft Excel's field list, it supports both popup and fixed display modes.

---

## Field List Modes

### In-built Field List (Popup)

Opens as a dialog when clicking the field list icon:

```typescript
@Component({
    template: `<ejs-pivotview 
      [dataSourceSettings]=dataSourceSettings
      [showFieldList]="true">
    </ejs-pivotview>`
})
export class AppComponent {
    dataSourceSettings = {
        dataSource: data,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sales', type: 'Sum' }]
    };
}
```

**Features:**
- Field list icon appears in top-left (or top-right with grouping bar)
- Opens in dialog overlay
- Requires `FieldListService`

### Stand-alone Field List (Fixed)

Displays permanently alongside the pivot table:

```typescript
import { PivotViewAllModule, PivotFieldListModule } from '@syncfusion/ej2-angular-pivotview';

@Component({
  imports: [PivotViewModule, PivotFieldListModule],
  standalone: true,
  selector: 'app-root',
  template: `<div>
    <ejs-pivotfieldlist 
    [dataSourceSettings]=dataSourceSettings
    renderMode="Fixed"
    (enginePopulated)="onEnginePopulated($event)">
    </ejs-pivotfieldlist>
    <ejs-pivotview 
    [dataSourceSettings]=dataSourceSettings
    (enginePopulated)="onEnginePopulated($event)">
    </ejs-pivotview></div>`
})
```

**Synchronization:**
- `enginePopulated`: Fires when the pivot engine is populated and rendered
- Both field list and pivot view can listen to this event to stay synchronized

---

## Field Management

### Field Searching

Locate fields quickly by typing field name:

```typescript
<ejs-pivotfieldlist 
  [enableFieldSearching]="true">
</ejs-pivotfieldlist>
```

Works in both popup and fixed modes.

### Adding/Removing Fields

Users check/uncheck field checkboxes to include/exclude from current analysis:

```typescript
// Programmatic field modification
this.pivotView.dataSourceSettings.values.push({
    name: 'NewField',
    type: 'Sum'
});
this.pivotView.refresh();
```

### Excluding Fields

Hide specific fields from field list entirely:

```typescript
dataSourceSettings: {
    excludeFields: ['InternalID', 'SystemKey'],
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
}
```

### Field Rearrangement

Drag fields between axes (rows, columns, values, filters):

```typescript
// Programmatic reordering
this.pivotView.dataSourceSettings.rows = [
    { name: 'Country' },
    { name: 'Region' },
    { name: 'City' }
];
this.pivotView.refresh();

// Move field from rows to columns
const field = this.pivotView.dataSourceSettings.rows
  .find(f => f.name === 'Year');
if (field) {
    this.pivotView.dataSourceSettings.rows = 
      this.pivotView.dataSourceSettings.rows.filter(f => f.name !== 'Year');
    this.pivotView.dataSourceSettings.columns.push(field);
    this.pivotView.refresh();
}
```

---

## Field Organization

### Sort Fields

Control field display order in field list:

```typescript
load(args: LoadEventArgs) {
    args.defaultFieldListOrder = 'Descending';  // Ascending, Descending, or Default
}
```

### Group Fields Under Folders

Organize related fields in folders:

```typescript
dataSourceSettings: {
    fieldMapping: [
        { name: 'ProductID', groupName: 'Products' },
        { name: 'ProductName', groupName: 'Products' },
        { name: 'Quantity', groupName: 'Sales' },
        { name: 'Amount', groupName: 'Sales' }
    ],
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
}
```

**For grouping bar UI operations, see [grouping-bar-ui-operations.md](grouping-bar-ui-operations.md)** - Drag-drop field management, icon controls, responsive design.

---

## Deferred Updates

Deferred layout update allows you to batch multiple field operations and apply them all at once, significantly improving performance with large datasets or complex configurations.

### How Deferred Updates Work

When enabled, users can:
- Drag fields between axes without immediate refresh
- Apply sorting and filtering in field list without rendering changes
- Make multiple configuration changes
- Click "Apply" button to update the pivot table once with all changes

This reduces unnecessary renders and improves performance, especially with 100K+ rows.

### Enable in Popup Field List

Set `allowDeferLayoutUpdate` to true:

```typescript
@Component({
    template: `<ejs-pivotview 
      [dataSourceSettings]=dataSourceSettings
      [showFieldList]="true"
      [allowDeferLayoutUpdate]="true">
    </ejs-pivotview>`
})
export class AppComponent {
    dataSourceSettings: IDataOptions = {
        dataSource: data,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sales', type: 'Sum' }]
    };
}
```

### Enable in Stand-alone Field List

```typescript
<ejs-pivotfieldlist 
  [dataSourceSettings]=dataSourceSettings
  renderMode="Fixed"
  [allowDeferLayoutUpdate]="true"
  (enginePopulated)="onUpdateView($event)"
  #fieldList>
</ejs-pivotfieldlist>

<ejs-pivotview 
  [dataSourceSettings]=dataSourceSettings
  (enginePopulated)="onUpdate($event)"
  #pivotView>
</ejs-pivotview>
```

### Synchronize Field List and Pivot Table

When using deferred updates with stand-alone field list:

```typescript
onEnginePopulated(args: any) {
    // Handle engine population event for both field list and pivot view
    // This ensures both components stay in sync when data is populated
}
```

### When to Use Deferred Updates

- **Large Datasets**: 100K+ rows benefit significantly
- **Multiple Field Operations**: Users making several changes at once
- **Complex Reports**: Many fields, dimensions, and calculations
- **Performance Critical**: Applications with strict performance requirements

---

## Best Practices

1. **Offer Both Modes** - Let users choose popup or fixed field list
2. **Enable Search** - Helpful with many fields
3. **Group Related Fields** - Organize for clarity
4. **Protect Critical Fields** - Hide remove icons for essential fields
5. **Exclude Irrelevant Fields** - Reduce UI clutter
6. **Use Deferred Updates** - For large datasets and complex operations
7. **Synchronize Properly** - Update views when fields change
8. **Document Field Usage** - Help users understand what each field does

````
